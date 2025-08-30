---
title: "ERDDAP™ - Changes"
---
# ERDDAP™Wijzigingen

ERDDAP™is een groot voorbeeld van[Gebruikersgestuurde innovatie](https://en.wikipedia.org/wiki/User_innovation), waar productinnovatie vaak afkomstig is van consumenten (ERDDAP™gebruikers) , niet alleen de producenten (ERDDAP™ontwikkelaars) . Door de jaren heen, de meeste ideeën voor nieuwe functies en veranderingen inERDDAP™zijn afkomstig van gebruikers. Die gebruikers worden hieronder bijgeschreven voor hun geweldige ideeën. Dank je&#33; Alsjeblieft, hou die grote suggesties komen&#33;

Hier zijn de veranderingen in verband met elkERDDAP™Laat los.

## Versie 2.28.0{#version-2280} 
 (uitgebracht 2025-08-29) 

*    **Nieuwe functies en wijzigingen (voor gebruikers) :** 
    *   [Croissant schema](https://docs.mlcommons.org/croissant/docs/croissant-spec.html)is nu beschikbaar. Beheerders kunnen controleren of de standaard metadata Croissant gebruikt, maar vanaf 2.28.0 kunt u de Croissant definitie voor met de nieuwe export bestand type ".croissant" vragen (die een jsonld-bestand levert) .

*    **DingenERDDAP™Beheerders moeten weten en doen:** 
    * Nieuwe Docker Afbeelding aangemaakt op elke samengevoegde pull verzoek. Dit zijn alpha builds, ze zijn niet versioned releases. Ze hebben een tag zoals "20250814T034025," die aangeeft wanneer het werd gebouwd. Als u de nieuwste functies wilt uitproberen kunt u deze gebruiken. Als u iets stabieler wilt gebruiken onze releases met een semantische versie tag (bv. 2.28,0) . We streven er altijd naar om de alpha releases bruikbaar te hebben, maar er is minder testen voor hen dan onze versies. We raden je altijd aan iets zo nieuw te gebruiken als onze "laatste" release die de meest recente semantische versie zal zijn.

    * Docker Afbeeldingen nu beschikbaar op[GitHub](https://github.com/ERDDAP/erddap/pkgs/container/erddap)naast[DockerHub](https://hub.docker.com/r/erddap/erddap).

Dankzij[@ocefpaf](https://github.com/ocefpaf),[@abkfenris](https://github.com/abkfenris),[@srstsavage](https://github.com/srstsavage)en[MathewBiddle](https://github.com/MathewBiddle)hun bijdragen rond de Docker Images. Dit omvatte de eerste bijdragen van alle van hen behalve @ststsavage&#33;
    
    * Er is nu ondersteuning voor het genereren[Croissant schema](https://docs.mlcommons.org/croissant/docs/croissant-spec.html)dossiers. Het staat standaard aan. U kunt de Croissant schema uitschakelen in uw setup.xml met (NIET AANVAARD- Gelieve contact op te nemen met of een probleem op GitHub als u dit moet doen) :
    ```
        <generateCroissantSchema>false</generateCroissantSchema>
    ```

    * Sommige instellingen hebben hun standaardwaarden gewijzigd. gebruik HeadersForUrl en gebruikEddReflection nu allebei standaard naar true. Als ze een probleem veroorzaken en je moet ze op valse, maak dan een probleem. De bedoeling is om ze te verwijderen in een toekomstige release.

    * Sommige instellingen zijn verwijderd. gebruikSharedWatchService en redirectDocumentatie ToGitHubio was standaard op ware voor meerdere releases en vrij goed getest op dit punt. Verwijderen van deze toegestaan voor een aantal code opruimen.

    * Enkele kleine veranderingen, bugfixes, en optimalisaties.

*    **VoorERDDAP™Ontwikkelaars:** 
    * Veel dode codes verwijderd. Veel waarschuwingen zijn verholpen.

## Versie 2.27.0{#version-2270} 
 (vrijgegeven 2025-06-11) 

*    **Nieuwe functies en wijzigingen (voor gebruikers) :** 
    * Nieuwe gegevens voor kleurbalkconverter op servers op /erddap/convert/color.html

*    **DingenERDDAP™Beheerders moeten weten en doen:** 
    * Standaard behavoir is dat de cache nu wordt gewist onafhankelijk van de belangrijkste taak van de datasets. Dit zal zorgen voor meer betrouwbare en regelmatige opruiming van oude cache bestanden. Er is extra werk om servergedrag te verbeteren als er weinig schijfruimte is (returning a error for requests to make the server out of space, and clearing the cache more frequenter in low disk conditions to try to prevent fouten) . Indatasets.xml  (of setup.xml) kunt u de nieuwe cache toevoegen/instellen ClearMinutes parameter om te bepalen hoe vaak de server controleert om de cache te wissen. Opmerking, de bestaande cacheMinutes parameter controleert de leeftijd van bestanden die moeten worden bewaard, de nieuwe cache ClearMinutes is voor hoe vaak een chache duidelijk te maken.
    ```
        <cacheClearMinutes>15</cacheClearMinutes>
    ```
U kunt de nieuwe cache clear controles uitschakelen door taakCacheClear in setup.xml op false te zetten, hoewel dat niet wordt aanbevolen.
cache ClearMinutes is ook in de[documentatie over datasets](/docs/server-admin/datasets#cacheclearminutes).
    
    * Gelokaliseerde dataset metadata ondersteuning. Het ondersteunt lokalisatie voor waarden in eenaddAttributesSection. Voeg gewoon een attribuut toe met de extra xml:lang tag. Bijvoorbeeld om een Franse titel toe te voegen aan een dataset uwaddAttributesDe afdeling omvat:
    ```
        <att name="title">Data from a local source.</att>
        <att name="title" xml:lang="fr">Donn&#xE9;es provenant d'une source locale.</att>
    ```
Aanvullende gegevens beschikbaar in de[gelokaliseerde metagegevensdocumentatie](/docs/server-admin/localized-metadata).

    * Nieuwe Docker Stel bestand samen met opties voor SSL en een barebones Prometheus server. Dankzij Shane St. Savage voor de SSL en Jiahui Hu voor de Prometheus.

    * Ondersteuning voor het gebruik van informatie in de headers om de server-URL te bepalen in plaats van te vertrouwen op het configuratiebestand. Hierdoor kan een server door meerdere namen worden benaderd en kunnen bepaalde configuraties worden vereenvoudigd. Schakel het in en stuur feedback.
    ```
        <useHeadersForUrl>true</useHeadersForUrl>
    ```

    * Enkele kleine veranderingen, bugfixes, en optimalisaties.

*    **VoorERDDAP™Ontwikkelaars:** 
    * Refactor voor hoe uitvoer bestandstypen worden gedefinieerd in code. Dit moet ervoor zorgen dat bestandstypen kunnen worden toegevoegd zonder dat veel code plaatsen aan te raken.

## Versie 2.26{#version-226} 
 (vrijgegeven 2025-03-31) 

*    **Voor iedereen:** 
    * Grote update naar onze documentatie site: https://erddap.github.io/
 
Naast de bijgewerkte verschijning is er verbeterde navigatie, zoeken, vertaling, en het moet gemakkelijker te onderhouden vooruit&#33;

*    **Nieuwe functies en wijzigingen (voor gebruikers) :** 
    * Abonnementen enRSSupdates moeten meer betrouwbaar gebeuren voor datasets die regelmatig worden bijgewerkt uit bestandswijzigingen.

*    **DingenERDDAP™Beheerders moeten weten en doen:** 
    * De standaard versie vereist/ondersteuntJavaversie 21. Terug in deze release is in staat om gemakkelijk eenJava17 compatibel binair.

    * Nieuwe functie om de informatie over datasets in de UI aan te passen. We verwachten dat dit bijzonder nuttig is om dingen als dataset citaten toe te voegen. Voor meer details kunt u de[nieuwe documentatie](/docs/server-admin/display-info). Met dank aan Ayush Singh voor de bijdrage&#33;

    * Aanvullende Prometheus statistieken. De grootste is...http_request_dure_seconden
Dit machineleesbare formaat zal een betere verzameling metrics mogelijk maken om te begrijpen hoe gebruikers de server gebruiken.

    * Nieuwe manier om ISO19115 XML bestanden te genereren. Het maakt gebruik van Apache SIS en is een nieuwe optie in deze release. Schakel het in en stuur feedback.
    ```
        <useSisISO19115>true</useSisISO19115>
    ```

    * De UI zal nu individuele links voor elke url in velden zoals deinfoUrlen samenvatting.

    * Abonnementen enRSSupdates moeten meer betrouwbaar gebeuren voor datasets die regelmatig worden bijgewerkt uit bestandswijzigingen. Als dit problemen veroorzaakt, kunt u contact opnemen met GitHub en de functionaliteit uitschakelen door de onderstaande vlag toe te voegen aan uw setup.xml.
NIET AANVAARD
    ```
        <updateSubsRssOnFileChanges>false</updateSubsRssOnFileChanges>
    ```

    * Subsetvariabelen worden niet langer automatisch gegenereerd voor datasettype EDDTableFromNcCFFiles. Als je afhankelijk was van het gedrag, kan je ofwel (Geprefereerde oplossing) voeg hetsubsetVariablesnaar de dataset definitie in uwdatasets.xml, of voeg de onderstaande vlag aan uw setup.xml. Als u de noodzaak voelt om dit aan te zetten, neem dan contact op met GitHub zodat we uw use case beter kunnen ondersteunen.
NIET AANVAARD
    ```
    <includeNcCFSubsetVariables>true</includeNcCFSubsetVariables>
    ```

    * De server zal nu documentatieverzoeken omleiden (onder downloads / dat is de documentatie die is gemigreerd) naar de nieuwe documentatiesite. Indien nodig kunt u dit uitschakelen met een vlag in setup.xml:
NIET AANVAARD
    ```
        <redirectDocumentationToGitHubIo>false</redirectDocumentationToGitHubIo>
    ```

    * Een paar kleine wijzigingen en fouten.

*    **VoorERDDAP™Ontwikkelaars:** 
    * Meer verbeteringen van codekwaliteit en dode code opruimen. Dit omvat kleine optimalisaties, een betere omgang met afsluitbare hulpbronnen en het migreren van lange verouderde datatypes. (zoals Vector) .

    * Grote refactoring naar EDStatic om het grootste deel van de configuratie, bericht en metrieke code eruit te halen. Het is ook beter ingekapseld initialisatie en behandeling van directory paden (Deze laatste 2 hebben nog meer te doen.) 

    * Veel vooruitgang in de richting van een officieel ondersteunde Docker Image. Het plan is om te voltooien en los te laten na deERDDAP™2.26 release is beschikbaar.

## Versie 2.25{#version-225} 
 (vrijgegeven 2024-10-31) 

*    **Nieuwe functies en wijzigingen (voor gebruikers) :** 
    * EDDTableFromFiles kan nu vragen ondersteunen met alleen afgeleide outputs (globals, jexl script, of variabelen) .
         
*    **DingenERDDAP™Beheerders moeten weten en doen:** 
    * Versie 2.25 vereistJava21 of nieuwer. Dit is de LTS versie en is al meer dan een jaar beschikbaar.
         
    * De SharedWatchService is nu de standaard. Als je het wilt uitschakelen, neem dan contact op met Chris. John bij Noaa.gov om me te laten weten, zodat ik kan verbeteren in toekomstige versies en toevoegen:
        &lt;useSharedWatchService&gt;false&lt;/useSharedWatchService&gt; naar uw setup.xml.
         
    * DeERDDAP™servlet zal nu starten bij het opstarten van de server. Wat betekent dat datasets direct beginnen te laden in plaats van te wachten tot een verzoek is gedaan.
         
    * De removeMVRows parameter in EDDTableFromMultidimNcFiles zal nu een effect hebben. Het op false zetten kan een aantal vragen aanzienlijk versnellen, maar dit is misschien niet geschikt voor alle datasets. Voor meer informatie zie de[beschrijving van de parameter](/docs/server-admin/datasets#removemvrows).
         
    * Datasets (EDDtabelVanNcFiles enEDDGridVanNcFiles) het gebruik van zarr-bestanden wordt nu ondersteund. Ze moeten "zarr" opnemen in het bestandNameRegex of pathRegex. Zie[Zarr secion in de datasets documentatie](/docs/server-admin/datasets#zarr)voor meer details.
         
    * Nieuw datasettype, EDDTableFromParquetFiles wordt nu ondersteund. Zie[EDDTableFromParquetFiles secion in the datasets documentation](/docs/server-admin/datasets#eddtablefromparquetfiles)voor meer details.
         
    *   [Prometheus metrics](https://prometheus.io/)nu beschikbaar zijn op /erddap/metrics.
         
    * Een nieuwe XML parser implementatie is beschikbaar. Deze nieuwe parser maakt het gebruik van XInclude indatasets.xml. Met dank aan Ayush Singh voor de functie.
         
    * Nieuwe parameter indatasets.xmlom ongewone activiteiten e-mails te controleren. ongewoonActiviteit FailProcent defaults tot de oude waarde van 25%. Met dank aan Ayush Singh voor de functie.
         
    * Nieuwe parameter in setup.xml die bepaalt of dataset laden fouten worden getoond op de status.html pagina. Het is standaard waar, om datasetfouten op de statuspagina uit te schakelen, stel showLoadErrorsOnStatusPage in op false:&lt;showLoadErrorsOnStatusPage&gt;false&lt;/showLoadErrorsOnStatusPage&gt;
         
    * Een paar kleine wijzigingen en fouten.
         
*    **VoorERDDAP™Ontwikkelaars:** 
    * Testen gescheiden naar eenheid en integratie (langzaam) tests. Ook meer tests en tests zijn minder schilferig gemaakt.
         
    * Foutmelding (sommige controles nog steeds uitgeschakeld) en Spot Bugs geïntegreerd door Maven.
         
    * Volledige code basis geformatteerd op de Google Style Guide.
         

## Versie 2.24{#version-224} 
 (uitgebracht 2024-06-07) 

*    **Nieuwe functies en wijzigingen (voor gebruikers) :** 
    * Nieuw kleurenpalet EK80 voor akoestische datasets beschikbaar. Met dank aan Rob Cermak hiervoor.
         
    * Repareer een probleem waar EDDTableAggregateRows niet de juiste bereiken van alle kinderen. Met dank aan Marco Alba voor de fix en bug report.
         
*    **DingenERDDAP™Beheerders moeten weten en doen:** 
    * BEVEILIGINGSVERANDERING: Google Authentication kan wijzigingen in uw CSP vereisen.
        
Meer specifiek, kunt u ook nodig om toe te voegen https://accounts.google.com/gsi/style naar stlye-src en https://accounts.google.com/gsi/ om-src te verbinden. Voor de script-src kunt u nu gebruiken https://accounts.google.com/gsi/client.
 
        
Voor meer informatie kunt u naar de[Google-pagina](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#content_security_policy)over CSP configuratie.
         
        
    * Nieuwe Shared Watch Service. Dit is een nieuwe optie voor het bekijken van mappen voor updates. Het heeft één thread voor elk bestandssysteem in plaats van één thread per dataset. Waarschijnlijk zal dit het aantal threads dat gebruikt wordt om naar wijzigingen te kijken drastisch verminderen. Het betekent wel dat alle datasets samen worden bijgewerkt in plaats van elke dataset met een eigen updatefrequentie. Waarschijnlijk betekent dit meer frequente updates voor de meeste datasets.
        
Deze toevoeging inschakelen&lt;useSharedWatchService&gt;true&lt;/useSharedWatchService&gt; naar uw setup.xml.
        
          
Probeer dit alsjeblieft en rapporteer hoe het werkt voor Chris. John bij Noaa.gov.
         
    * Fix voor onjuiste var namen in logs. Met dank aan Ayush Singh voor de oplossing.
         
    * Een paar kleine wijzigingen en fouten.
         
*    **Verbeteringen voorERDDAP™ontwikkelaars:** 
    * Ondersteuning voor lokale ontwikkeling met behulp van Docker. Bedankt Matt Hopson en Roje.
         
    * Ondersteuning voor lokale ontwikkeling met behulp van Jetty en documentatieverbeteringen. Bedankt Micah Wengren.
         
    * Wijzigingen in tests om problemen te verminderen cross platform. Bedankt. Shane St. Savage.
         

## Versie 2.23{#version-223} 
 (vrijgegeven 2023-02-27) 

Merk op dat deze release werd gedaan door Bob Simons, waardoor hij laat zien dat hij nog steeds actief is tijdens de overgang naar Chris John, zijn opvolger. Alle codewijzigingen worden uitgevoerd door Chis John, tenzij anders aangegeven.

*    **Nieuwe functies en wijzigingen (voor gebruikers) :** 
    *    (Geen)   
         
*    **DingenERDDAP™Beheerders moeten weten en doen:** 
    * BEVEILIGINGSVERANDERING: Google Authentication wordt nu bereikt via de nieuwe Google Identity Services-bibliotheek die deel uitmaakt van "Aanmelden bij Google." De ondersteuning van Google voor het oude "Google Sign In" systeem wordt stopgezet 2023-03-31. Dus als u Google Authentication in uwERDDAP™installatie, moet u bijwerken naarERDDAP™v2.23+ daarvoor. (Bob heeft spijt van de korte termijn. Het is Bob's schuld.)   
         
    * NCCSV is nu v1.2 De verandering is dat de bestanden nu UTF-8-gecodeerde bestanden zijn (het waren ASCII) en dus kan nu elk Unicode teken zoals is, zonder codering als \\u_hhhh_, hoewel dat nog steeds toegestaan is.
Bij het schrijven van NCCSV-bestanden,ERDDAP™schrijft nu v1.2 bestanden.
        ERDDAP™zal nog steeds NCCSV-bestanden lezen die de V1.0 en v1.1 specificatie volgen.
Dankzij Pauline-Chauvet, n-a-t-e, en thogar-computer voor het suggereren van dit en het doen van de tests om ervoor te zorgen dat verschillende spreadsheet programma's kunnen importeren UTF-8 bestanden. Met dank aan Bob Simons voor deze codewijziging.
         
    * NIEUW: De status.html webpagina heeft nu een regel aan de bovenkant die aangeeft welke dataset loadDatasets momenteel aan het laden is en gerelateerde statistieken, of geen als er geen dataset wordt geladen. Dit kan zeer nuttig zijn omERDDAP™beheerders proberen te achterhalen waarom laden Datasets duurt zo lang. Ook de nGridDatasets, nTableDatasets en nTotalDatasets tellen hieronder die nu direct (eerder waren ze vanaf het einde van de laatste grote lading Datasets) .
Deze verandering is voor Roy Mendelssohn. Met dank aan Bob Simons voor deze codewijziging.
         
    * VERBETERD: GenererenDatasets Xml verandert nu in CF-1.10 (was CF-1.6) in de eigenschappen "Conventies."
Met dank aan Bob Simons voor deze codewijziging.
         
    * Een paar kleine wijzigingen en fouten.
         

## Versie 2.22{#version-222} 
 (vrijgegeven 2022-12-08) 

Merk op dat deze release werd gedaan door Bob Simons, waardoor blijkt dat hij nog steeds actief is tijdens de overgang naar zijn opvolger.

*    **Nieuwe functies en wijzigingen (voor gebruikers) :** 
    *    (Geen)   
         
*    **DingenERDDAP™Beheerders moeten weten en doen:** 
    * Niets.
         
    * SECURITY BUG FIX: Er was een Cross Site Scripting-gerelateerde bug in de code voor de taal selectie drop-down. DankzijNOAABeveiligingsscans om dit te vangen. Dit toont aan datNOAAveiligheid actief en routinematig op zoek naar veiligheidsgebreken inERDDAP.
         
    * VEILIGHEIDSFIX: De vele bibliotheken die doorERDDAP™werden bijgewerkt, zoals gebruikelijk, als onderdeel van deze release. Deze keer was het updaten van de PostgreSQL driver inbegrepen (die een beveiligingsbug had) tot 42,5.1.
         
    * VERBETERD: Kleinere wijzigingen inERDDAP's geheugenbeheersysteem moet de kans op een gegeven verzoek te verminderen falen als gevolg van gebrek aan beschikbaar geheugen.
         
    * Een paar kleine wijzigingen en fouten.
         

## Versie 2.21{#version-221} 
 (vrijgegeven 2022-10-09) 

*    **Nieuwe functies en wijzigingen (voor gebruikers) :** 
    *    (Geen)   
         
*    **DingenERDDAP™Beheerders moeten weten en doen:** 
    * DOEN: VoorJava17, je moet geen \\-d64 gebruiken in JAVA\\_OPTS in setenv.bat of setenv.sh. Dus als het er is, verwijder het dan. Ik denk dat 64 bit mode is nu geselecteerd wanneer u een 64 bit versie vanJava. Dankzij Sam Woodman.
         
    * BUG FIX: Soms probeerde het nieuwe e-mailsysteem te vaak in te loggen, waardoor Google E-mailservers alle toekomstige loginpogingen afwees. Het e-mailsysteem vermijdt dit en gerelateerde problemen.
         

## Versie 2.20{#version-220} 
 (vrijgegeven 2022-09-30) 

*    **Gebruik geen v2.20. Het is gebrekkig.** Maar beheerders moeten nog steeds de onderstaande TODO-items doen bij het upgraden naar v2.21+.
     
*    **Nieuwe functies en wijzigingen (voor gebruikers) :** 
    *    (Geen)   
         
*    **DingenERDDAP™Beheerders moeten weten en doen:** 
    * VERBETERD: We hebben het oude geheugenbeheersysteem opnieuw ingeschakeld (Wiskunde2.ZorgGeheugenBeschikbaar) en het nieuwe geheugenbeheersysteem gewijzigd (EDStatic.shedThisRequest) om er beter mee te werken. Zie[Geheugenstatus](/docs/server-admin/additional-information#memory-status)voor details.
         
    * VERANDERD: De standaard voor&lt;ipAdresMaxverzoeken&gt; indatasets.xmlwerd verhoogd van 7 naar 15. Het is duidelijk dat sommige legitiemeWMSklanten kunnen meer dan 7 gelijktijdige verzoeken genereren.
         

## Versie 2.19{#version-219} 
 (vrijgegeven 2022-09-01) 

*    **Gebruik geen v2.19. Het is gebrekkig.** Maar beheerders moeten nog steeds de onderstaande TODO-items doen bij het upgraden naar v2.20+.
     
*    **Nieuwe functies en wijzigingen (voor gebruikers) :** 
    * NIEUW: Er is een nieuwe server-kant functie,orderByAflopend, wat werkt alsorderBy, maar soorten in dalende volgorde. Dankzij Adam Leadbetter.
         
    * VERBETERD: Nu, grafieken (maar geen kaarten) zal uitbreiden om de beschikbare ruimte op het doek te vullen, d.w.z. ruimte die niet door de legende wordt gebruikt. U kunt hoge grafieken, vierkante grafieken, of brede grafieken door het toevoegen en manipuleren van de &.size=_width_|_Hoogte_parameter (waar breedte en hoogte de grootte van het canvas specificeren, in pixels) op de aanvraag-URL. (Dit is geen optie op de .graph web pagina. U moet het handmatig toevoegen aan de URL.) Als u de &.size parameter niet specificeert, hebben verzoeken voor .smallPng, .png, .largePng, .smallPdf, .pdf en .large.pdf een vooraf gedefinieerde canvasgrootte, zodat uw grafiek zal uitbreiden om de beschikbare ruimte te vullen, maar meestal ruwweg vierkant. Dankzij Bob Fleming.
         
*    **DingenERDDAP™Beheerders moeten weten en doen:** 
    * DOEN:ERDDAP™nu vereistJava17 en de bijbehorende Tomcat 10. U moet deERDDAP™installatie-instructies (of het equivalent, bijvoorbeeld voor Docker) te installerenJava17 en Tomcat 10 en kopieer uw\\[kat\\]/content directory van uw Tomcat 8 installatie in de nieuwe\\[kat\\]directory. Er zijn geen andere wijzigingen die u aan uwERDDAPinstallatie in verband met deze verandering. Met andere woorden,ERDDAP™Werkt zoals vroeger.
        
Vergeet niet om deERDDAP-gerelateerde wijzigingen aan Tomcat's server.xml en context.xml wanneer u Tomcat upgrade. ZieERDDAP's[Tomcat installatie-instructies](/docs/server-admin/deploy-install#tomcat).
        
Mijn indruk vanJava17 is dat het de voorkeur geeft aan meer verwerkingskracht en geheugen voor langdurige, grotere toepassingen zoalsERDDAP™, dus het werkt iets langzamer danJava8 met lage vermogen computers (b.v. 2 kernen en minimale RAM) en werkt iets sneller danJava8 met hogere vermogenscomputers (b.v. 4+ cores en overvloedige RAM) . Dus als je slechte prestaties ziet, gebruik programma's zoals Linux's[boven](https://www.howtogeek.com/668986/how-to-use-the-linux-top-command-and-understand-its-output/)om het gebruik van hulpbronnen te controleren en geven te overwegenERDDAP™meer middelen, met name meer geheugen. Geheugen is goedkoop&#33; De meeste telefoons hebben meer processors en geheugen dan de servers die sommigen van u gebruiken om uit te voerenERDDAP&#33;
Dankzij Erin Turnbull.
         
        
    * DOEN: Als uERDDAP™om toegang te krijgen tot Cassandra, voor Cassandra, moet je de versie vanJavaDat je gebruikte voor het leiden van de Cassandra. Overschakelen naarJava17 voor het draaien van Tomcat+ERDDAP.
         
    * Aanbevolen: Als de CPU van uw server 4+ cores heeft en 8+ GB RAM, overweeg dan om deze instellingen in uwdatasets.xmlbestand:
```
          <nGridThreads>3</nGridThreads>  
          <nTableThreads>3</nTableThreads>  
```

Als uw server minder middelen heeft, blijf dan bij "1" voor beide instellingen.
De nThreads systemen voorEDDGridFromFiles en EDDTable FromFiles werd aanzienlijk verbeterd. Deze veranderingen leidden tot een enorme snelheidsverbetering (b.v. 2X-snelheid wanneer nThreads is ingesteld op 2 of meer) voor de meest uitdagende verzoeken (wanneer een groot aantal bestanden moet worden verwerkt om de resultaten te verzamelen) . Sommige gerelateerde veranderingen van Chris John zal ook leiden tot een algemene snelheid gedurendeERDDAP. De code voor deze wijzigingen werd bijgedragen door Chris John. Dank je. Chris&#33;
         
    * WAARSCHUWING: koppeltekens indatasetID's worden verouderd en niet meer ondersteund (Hoewel technisch nog steeds toegestaan) . Waarschijnlijk worden ze in de volgende release niet toegelaten. Als je koppeltekens gebruikt, schakel dan nu over op onderstrepingen om problemen te voorkomen. Als je het nu verandert, is het op je eigen snelheid. Als je wacht tot de volgende release, ben je in paniek en moet je het die dag afhandelen.
         
    * NIEUW: Nu, voor.htmlTablegegevensresponsen, indien de gegevens in een stringcel gegevens bevatten:image/png;base64, gevolgd door een base64 gecodeerde .png-afbeelding,ERDDAP™zal een pictogram tonen (zodat de gebruiker de afbeelding kan zien als ze erover zweven) en knoppen om de tekst of de afbeelding op te slaan op het klembord. Met dank aan Marco Alba (die de code heeft bijgedragen) en Bob Simons (die het licht heeft aangepast) .
         
    * NIEUW: -NotAddStandardNames
Als u \\-doNotAddStandardNames als een commandoregel parameter wanneer u genereren uitvoeren Datasets Xml genereren Datasets Xml zal niet toevoegenstandard\\_nameaan deaddAttributesvoor andere variabelen dan de met naam genoemde variabelen: breedtegraad, lengtegraad, hoogte, diepte of tijd (die duidelijk zijnstandard\\_names) . Dit kan handig zijn als u de uitvoer van genereren Datasets Xml direct inERDDAP™zonder de uitvoer te bewerken, omdat genereren Datasets Xml gok vaakstandard\\_nameNiet juist. (Merk op dat we altijd aanraden dat u de uitvoer bewerkt voordat u deze gebruikt inERDDAP.) Het gebruik van deze parameter zal andere kleine gerelateerde effecten hebben omdat de geradenstandard\\_namewordt vaak gebruikt voor andere doeleinden, bijvoorbeeld om een nieuwelong\\_name, en om de kleurenbalk instellingen te maken. Dankzij Kevin O'Brien.
         
    * NIEUW: U kunt nu zetten&lt;updateMaxEvents&gt;10&lt;/updateMaxEvents&gt; indatasets.xml  (in met de andere instellingen aan de bovenkant) het maximum aantal bestandswijzigingen wijzigen (standaard=10) dat zal worden verwerkt door het updateEveryNMillis systeem. Een groter getal (100?) kan nuttig zijn wanneer het zeer belangrijk is dat de dataset altijd up-to-date wordt gehouden. Zie[updateMaxEvents documentatie](/docs/server-admin/datasets#updatemaxevents). Dankzij John Maurer.
         
    * NIEUW: Toegevoegde steun voor wereldwijde "real\\_time= waar|False" String attribuut.
Als dit niet waar is (de standaard) en als de dataset geen update gebruikt EveryNMillis,ERDDAP™zal cache antwoorden op verzoeken voor bestandstypen waar het hele bestand moet worden gemaakt voorERDDAP™kan beginnen met het sturen van de reactie naar de gebruiker en hergebruik ze voor ongeveer 15 minuten (bv..nc, .png) .
Als dit is ingesteld op true of als de dataset een update gebruikt EveryNMillis,ERDDAP™zal nooit cache de response bestanden en zal altijd terugkeren nieuw aangemaakte bestanden.
Dankzij John Maurer.
         
    * NIEUW: E-mails worden nu verzonden in een aparte e-mailThread. Dit maakt het laden van datasets en andere acties die e-mails genereren sneller omdat loadDatasets hoeft niet te wachten op de e-mail te worden verzonden, wat soms een lange tijd duurt. Het nieuwe systeem kan meerdere e-mails per e-mailsessie versturen, waardoor het aantal e-mailserverlogins wordt verminderd en het risico van falende e-mails wordt verminderd omdat ze te frequent zijn. Er zijn statistieken voor de e-mailThread op de status.html pagina en kenmerkende berichten in log.txt -- zoek naar "emailThread." Merk op dat een tally van nEmailsPerSession=0, geeft problemen, d.w.z. een e-mailsessie kon geen e-mails versturen.
Dankzij Bob Simons.
         
    * VERANDERD: E-mails worden nu verzonden met iets andere code (vanwegeJava17 en de wijziging naar e-mailThread) . Als u problemen heeft met het verzenden van e-mails, stuur dan een e-mailerd.data at noaa.gov.
         
    * NIEUW: Abonnementsacties die een externe URL "aanraken" worden nu in een aparte touchThread behandeld. Dit maakt het laden van datasets en andere acties die URL's aanraken sneller omdat loadDatasets niet hoeft te wachten tot de touch wordt voltooid, wat soms een lange tijd duurt. Er zijn statistieken voor de touchThread op de status.html pagina en kenmerkende berichten in log.txt -- zoek naar "touchThread."
Dankzij Bob Simons.
         
    * NIEUW: Op de status.html pagina, in de "Major LoadDatasets Time Series," is er een nieuwe "shed" kolom die het aantal verzoeken aangeeft die zijn weggeworpen omdat de huidigeERDDAP™Het geheugengebruik was te hoog. Verzoeken die worden afgewezen zullen HTTP statuscode 503 "Service Beschikbaar" teruggeven. Die verzoeken waren niet per se een probleem. Ze zijn net op een drukke tijd aangekomen. Dit was onderdeel van een vernieuwing van hoeERDDAP™behandelt hoog geheugengebruik.
         
    * NIEUW: Op Unix/Linux computers is er nu een "OS Info" regel op de status.html webpagina met actuele besturingssysteeminformatie inclusief CPU-belasting en geheugengebruik.
         
    * VERBETERD: Nu, wanneerERDDAP™wordt herstart en quickRestart=true, EDDTableFromFiles datasets zullen de subset hergebruiken.ncen onderscheiden.nc. Voor sommige datasets vermindert dit sterk de tijd om de dataset te laden (bv. van 60 seconden tot 0,3s) . Samen met de nieuwe e-mailThread en taakThread (zie boven) , dit moet sterk versnellen herstartERDDAP™voor velenERDDAP™installaties. Dankzij Ben Adams en John Kerfoot.
         
    * VERANDERD: Eerder, weesdatasets (datasets die in leven zijnERDDAP™maar zijn niet binnendatasets.xml) werden gewoon genoteerd op status. html en in log.txt na elke grote loadDatasets. Nu worden ze automatisch verwijderd vanERDDAP™en genoteerd op status.html en in log.txt, en gemaild naar e-mail Alles aan. Dus als je een dataset wilt verwijderen uitERDDAP™, nu alles wat je hoeft te doen is het verwijderen van de brok xml indatasets.xmlen het zal worden verwijderd in de volgende grote ladingDatasets. Dankzij Bob Simons.
         
    * KENNEN BUG in netcdf-java v5.5.2 en v5.53: DeEDDGridVan Thredds Catalogus optie in GenererenDatasets Xml gebruikt om te werken voor THREDDS catalogi die verwijzingen naar datasets in remote THREDDS catalogi bevatten. Nu niet meer. Ik heb het probleem gemeld aan de netcdf-java ontwikkelaars.
         
    * BUG FIX: Voor Docker gebruikers het instellen van setup.xml parameters viaERDDAP\\__paramName_: voor int- en booleaanse parameters (bv. e-mail SmtpPort) ,ERDDAP™was onjuist op zoek naar _paramName_. Nu zoekt het naar _ERDDAP\\_paramName_. Dankzij Alessandro De Donno.
         
    * VERANDERING: deERDDAP™testsysteem gebruikt nu een geautomatiseerd systeem om te controleren of nieuw gemaakte testbeelden precies zijn zoals verwacht. Dankzij Chris. John voor de suggestie en Bob Simons voor de implementatie.
         

## Versie 2.18{#version-218} 
 (vrijgegeven 2022-02-23) 

*    **Nieuwe functies en wijzigingen (voor gebruikers) :** 
    * Geen
*    **DingenERDDAP™Beheerders moeten weten en doen:** 
    * BUG FIX:.ncDe dossiers waren onder bepaalde omstandigheden niet gesloten. Nu wel. Dankzij Marco Alba, Roland Schweitzer, John Maurer en anderen.
         

## Versie 2.17{#version-217} 
 (vrijgegeven 2022-02-16) 

*    **Nieuwe functies en wijzigingen (voor gebruikers) :** 
    * BUG FIX: Na wijzigingen in deorderBysysteem een paar jaar geleden, Tabledap's Make A Graph niet goed behandeld veel vragen die gebruiktorderByXxx_. Nu wel. Dankzij Maurice Libes.
         
    * Wat voorafging:ERDDAP™afgewezen verzoeken om . transparant Png's wanneer de breedte- en/of lengtewaarden geheel of gedeeltelijk buiten bereik waren. (ERDDAP™GitHub problemen #19, gepost door Rob Fuller -- bedankt voor het posten van die Rob) Nu geeft het transparante pixels terug voor alle buiten bereik gebieden van de afbeelding. Dit is nuttig voor veel client toepassingen. De code wijzigingen om deze verandering te maken werden volledig gedaan door Chris John. Dank je wel, Chris.
         
    * Wat voorafging:ERDDAP™afgewezen griddap-verzoeken indien de indexwaarden voor een bepaalde dimensie\\[hoog: laag\\]. Nu maakt het die verzoeken geldig door de lage en hoge waarden te ruilen. Dit lost een al lang bestaand probleem op voor gebruikers en voor externe programma's zoals xtracto die de weinige datasets moesten bijhouden die breedtegraadwaarden hebben die variëren van hoog tot laag om een verzoek te doen zoals\\[ (50) : (20) \\]zodat het verzoek in de indexruimte\\[laag:hoog\\]. Zie https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplAquariusSSS3MonthV5.html Nu, een verzoek zoals\\[ (20) : (50) \\]voor een van deze datasets wordt automatisch geïnterpreteerd als\\[ (50) : (20) \\].
         
    * VERANDERD: .esriAscii-verzoeken activeren nu een "Bestand: Opslaan als" dialoogvenster in de browser van de gebruiker. Dankzij Joel Van Noord.
         
    * BUG FIX: Nu, als de lengte variabele van een kind dataset van eenEDDGridLonPM180 ofEDDGridLon0360 dataset heeft eenvalid\\_minen/ofvalid\\_maxattribuut, worden ze verwijderd in deEDDGridLonPM180 ofEDDGridLon0360 dataset. Dankzij Roy Mendelssohn.
         
*    **DingenERDDAP™Beheerders moeten weten en doen:** 
    * Als je had ingesteld&lt;dataProviderFormActive&gt; to false om tijdelijk om te gaan met de XSS kwetsbaarheid, stel het terug naar waar.
         
    * SECURITY BUG FIX: Vaste XSS kwetsbaarheid in Data Provider Form. Dankzij Genaro Contreras Gutiérrez.
         
    * BUG FIX: Toen een AWS S3 dirctory meer dan 10000 bestanden had,ERDDAP™gooide een "interne fout." Dit is nu opgelost. Dankzij Andy Ziegler.
         
    * BUG FIX:EDDGridSideBySide heeft geen variabele toegestaansourceNames in verschillende kinddatasets hetzelfde zijn. Nu wel. Dankzij Joshua Stanford.
         

## Versie 2.16{#version-216} 
 (vrijgegeven 2021-12-17) 

*    **Nieuwe functies en wijzigingen (voor gebruikers) :** 
    * VERANDERINGEN/OPDRACHTEN: Talrijke kleine wijzigingen in het vertaalsysteem dankzij suggesties van taalspecifieke redacteuren. Dankzij Melanie Abecassis, Marco Alba, Jessy Barrette, Filipe Fernandes, Etienne Godin, Jennifer Sevadjian en Mike Smit.
         
    * ADDED een goede disclaimer en toeschrijving voor Google Translate, zoals vereist door de voorwaarden van Google Translate. Ook de&lt;html&gt; tag in de HTML voor elke webpagina nu goed identificeert niet-Engelse webpagina's als zijn machine vertaald. Dankzij Mike Smit.
         
    * BUG FIX: De login webpagina's werken nu goed met verschillende taalinstellingen. Dankzij Mike Smit.
         
    * NIEUWorderBySomfilter. En nieuwe Alles controleren en alle knoppen verwijderenEDDGridData Access Formulier webpagina. Dankzij de code bijdrage van Marco Alba.
         
*    **DingenERDDAP™Beheerders moeten weten en doen:** 
    * Als u
        &lt;vraagMarkImageFile&gt;VraagMark.jpg&lt;/vraagMarkImageFile&gt;
in uw setup.xml bestand, moet u ofwel de hele tag verwijderen (aanbevolen, dus het standaard bestand wordt gebruikt) of verander het in:
        &lt;vraagMarkImageFile&gt;VraagMark.png&lt;/vraagMarkImageFile&gt;
         
    * Het is maar dat je het weet.[Adoptie](https://adoptium.net/?variant=openjdk8)heeft AdoptOpenJDK vervangen als de belangrijkste/aanbevolen bron vanJava  (OpenJDK) .
         
    * VERANDERING: De logbestanden vanERDDAP™, GenererenDatasets Xml, en DasDds zijn nu UTF-8, niet de standaard tekenset van de computer. Ik heb veel gecontroleerd en een paar wijzigingen aangebracht om ervoor te zorgen datERDDAP™geeft altijd de juiste tekenset aan bij het lezen of schrijven van allerlei bestanden, en niet langer (in meerdere gevallen) vertrouwt op de standaard tekenset van de computer. Dit corrigeerde enkele fouten en bewoog zo dicht mogelijk bij het doel van het gebruik van UTF-8 voor zoveel mogelijk bestandstypen (bv., .log, .xml, .html,.json,.jsonl..ncKop) . Merk op dat veel oudere bestandstypen nodig zijn om ISO-8859-1 te gebruiken (bv.OPeNDAP.das, .dds, .csv,.tsv,.nc3,.nccsv, .cpt) . Ik heb eerder geprobeerd om te werken met de CF groep en metUnidataondersteuning voor UTF-8 toevoegen aan.nc3 bestanden; beide waren resistent.
         
    * NIEUW: Bij het downloaden van bestanden van AWS S3,ERDDAP's cache FromUrl-systeem inEDDGridFromFiles en EDDTable FromFiles gebruikt nu de nieuwe AWS Transfer Manager om bestanden te downloaden via parallelle brokken (dus zeer snel) . De doel doorvoer is ingesteld op 20 Gbps, per bestand, dus dit werkt goed met alle AWS instantie types, maar vooral degenen die uitstekende "Networking Performance" hebben. Met deze veranderingERDDAP's cache FromUrl systeem biedt nu vergelijkbare snelheden aan xarray's aanpak van parallelle downloads van pre-chunked bestanden, maar zonder de noodzaak om de bronbestanden te converteren van.ncen.hdfin gebarsten xarray bestanden. In feite,ERDDAP's systeem is beter als er een later verzoek om te lezen uit hetzelfde bestand, omdatERDDAP™heeft nu een lokale kopie van het bestand. Onze gemeenschap heeft jarenlang gestandaardiseerd op.ncen.hdfdossiers. Nu hoeven we dat allemaal niet weg te gooien om goede prestaties te krijgen bij het opslaan van gegevens in AWS S3. Dankzij Rich Signell.
         
    * VERANDERING: zoekenEngine=Luceen is, voorlopig, verouderd. Het is een complex systeem dat vaak resultaten oplevert die iets afwijken van het meer wenselijke gedrag van zoekenEngine=origineel. Voor bijna alleERDDAP™installaties, de tijdsbesparing van Lucene compenseren de verschillen in resultaten niet. Gebruik in plaats daarvan searchEngine=origineel indien mogelijk. Als dat problemen veroorzaakt, mail dan Bob.
         
    * VERANDERING: De zoekopdracht LucenEngine gedraagt zich nu meer als de oorspronkelijke zoekopdrachtEngine. Er zijn geen gevallen meer waarin lucene denkt dat een dataset overeenkomt en origineel niet. Ook, lucene's rankings nu gelijk aan originele rankings (want origineel wordt nu altijd gebruikt om de rankings te berekenen) .
         
    * BUG FIX: Vanaf een recente release,ERDDAP™niet meer zien dan de eerste 1000 objecten in een gegeven AWS S3-emmer. Nu,ERDDAP™weer ziet alle objecten. Dankzij Andy Ziegler.
         
    * BUG FIX: Nu EDDTableAggregate Rijen verwijdert deactual\\_rangeattribuut wanneer een of meer van de kinddatasets de variabelen nooit kent 'actual\\_range  (b.v. EDDTableFromDatabase) . Dankzij Erik Geletti.
         

## versie 2.15{#version-215} 
 (vrijgegeven 2021-11-19) 

*    **Nieuwe functies en wijzigingen (voor gebruikers) :** 
    *   ERDDAP™heeft een nieuw systeem om de gebruiker de taal te laten specificeren die gebruikt moet worden voor alle webpagina's. IndienERDDAP™installatie is ingesteld om het te gebruiken, de lijst van talen zal verschijnen in de rechterbovenhoek van elke webpagina.ERDDAP™URL's van voor deze versie blijven werken en altijd terug Engelse inhoud, zoals voorheen.
        
Niet alle tekst of alle webpagina's werden vertaald. Er waren tijdslimieten op dit project die ervoor zorgden dat Qi en Bob niet tot 100% konden komen.
        
De voor de hand liggende vraag is: waarom hebben we hier zoveel moeite in gedaan als Chrome webpagina's on-the-fly zal vertalen? Het antwoord is: op deze manier krijgen we veel meer controle over hoe de vertaling wordt gedaan. Met name zijn er veel woorden die niet op de webpagina's moeten worden vertaald, bijvoorbeeld de titels en samenvattingen van datasets, de namen van variabelen, parameters, eenheden en organisaties. Veel van de vertaling inspanning was het identificeren van woorden en zinnen die niet moeten worden vertaald. Ook, de machine vertalingen de neiging om bepaalde types van HTML markup mangle. Door de vertaling te beheren konden we dit probleem minimaliseren.
        
Het vertaalproject werd uitgevoerd door Qi Zeng (a Google Summer of Code stagiair) en Bob Simons gebruiken Google's Vertaling webservice. Het was een groot project. Bedankt. Qi&#33;
        
    * BUG FIX:ERDDAP™nu staat ORCID ID's toe om X als laatste cijfer te hebben. Dankzij Maurice Libes.
         
*    **DingenERDDAP™Beheerders moeten weten en doen:** 
    * DOEN:
        
        * Je moet een paar wijzigingen aanbrengen in verband metERDDAP's nieuwe systeem om gebruikers de taal voor webpagina's te laten specificeren.
            * Op de eerste regel van uw setup.xml endatasets.xmlbestanden, verander naar: codering="UTF-8" en verander de codering van het document in uw teksteditor zodat het wordt opgeslagen als een UTF-8 bestand. GenererenDatasets Xml neemt nu aan dat dedatasets.xmlis een UTF-8 bestand.
            * Programmeurs die compilerenERDDAP: AlleERDDAP™.java bestanden moeten standaard worden behandeld als UTF-8 bestanden. Het kan nodig zijn om "-codering UTF-8" toe te voegen aan de javac commandoregel. (Ja.) 
            * Dit systeem inschakelen (sterk aanbevolen) In de&lt;startBodyHtml5&gt;-tag die u aangeeft indatasets.xml, verander "&amp&#33;loginInfo;" in "&amp&#33;loginInfo;|&amp; language;" zodat de lijst van talen verschijnt in de rechterbovenhoek van elkeERDDAP™webpagina.
            *   ERDDAP™gebruikt alleen de&lt;startBodyHtml5&gt;-tag die u aangeeft indatasets.xmlom de HTML-inhoud voor de banner bovenaan elkeERDDAP™webpagina, ongeacht welke taal de gebruiker selecteert. Als je die tag verandert om te gebruiken
"&EasierAccessToScientificData;"in plaats van "Gemakkelijker toegang tot wetenschappelijke gegevens" en
"&BroughtToYouBy;"In plaats van "naar jou gebracht door,"ERDDAP™gebruikt vertaalde versies van die zinnen in de banner.
            * Ook de nieuwe standaard&lt;de korte beschrijvingHtml&gt; indatasets.xmlis
                
```
                <theShortDescriptionHtml><!\\[CDATA\\[ 
                <h1>ERDDAP</h1>
                &erddapIs;
                &thisParticularErddap;
                \\[standardShortDescriptionHtml\\]
                \\]\\]></theShortDescriptionHtml>
```
De laatste 3 regels van de inhoud zijn dingen die zullen worden vervangen door vertaalde tekst. Als je een van hen bekeert (met name dit BijzondereErdap;) of alle van hen naar expliciete tekst indatasets.xml  (die voorrang heeft, indien aanwezig) of messages.xml, die tekst zal verschijnen ongeacht welke taal de gebruiker selecteert. Dit is niet perfect, maar ik dacht dat weinig beheerders zouden willen bewerken&lt;de korte beschrijvingHtml&gt; in 35 verschillende bestanden om 35 verschillende vertaalde versies van die tag te bieden.
        
          
         
    * VERANDERD: Sommige fouten worden nu iets anders behandeld en dus kan worden toegevoegd aan de lijst van "Failed Requests" op status.html en in het Dagelijks Verslag E-mail. Dus die getallen kunnen iets groter zijn dan voorheen.
         
    * BUG FIX: GenererenDatasets Xml voorEDDGridLon0360 enEDDGridLonPM180 sluit nu brondatasets uit metdatasetID=~"."\\*LonPM180" endatasetID=~"."\\*\\_Lon0360" respectievelijk.
         

## Versie 2.14{#version-214} 
 (vrijgegeven 2021-07-02) 

*    **Nieuwe functies en wijzigingen (voor gebruikers) :** 
    *    (geen)   
         
*    **DingenERDDAP™Beheerders moeten weten en doen:** 
    * NIEUW:EDDGridLon0360 die een gerasterde dataset maakt met lengtewaarden &gt;=0 en&lt;=360 uit een gerasterde dataset met lengtewaarden &gt;=-180 en&lt;= 180. Zie[EDDGridLon0360 documentatie](/docs/server-admin/datasets#eddgridlon0360). Dankzij Dale Robinson.
         
    * NIEUW:ERDDAP™beheerders kunnen nu elke waarde in setup.xml overschrijven via een omgevingsvariabele genaamdERDDAP\\__valueName_ voordat u startERDDAP. Bijvoorbeeld, gebruikERDDAP\\_baseUrl overschrijft de&lt;baseUrl&gt; waarde. Dit kan handig zijn bij het implementerenERDDAP™met een container, zoals u standaardinstellingen kunt plaatsen in setup.xml en dan speciale instellingen kunt leveren via omgevingsvariabelen. Als u geheime informatie aanERDDAP™Controleer via deze methode of de informatie geheim blijft.ERDDAP™leest alleen de omgevingsvariabelen eenmaal per opstarten, in de eerste seconde van opstarten, dus een manier om dit te gebruiken is: stel de omgevingsvariabelen in, startERDDAP™, wacht totERDDAP™wordt gestart en de omgevingsvariabelen worden uitgeschakeld. Dankzij Marc Portier.
         
    * VERBETERD: Nu, als sommige bestanden in een EDDTableVan... Bestanden dataset met veel bestanden hebben een aantal zeer lange String waarden, de dataset zal veel sneller laden en veel sneller reageren op verzoeken. Wat voorafging:ERDDAP™zou veel ruimte toewijzen voor de min en max String waarden in de bestanden die zijn opgeslagen met bestandsinformatie voor dergelijke datasets. Het resulterende bestand was enorm, waardoor het werd geschreven en langzaam gelezen. Dankzij OBIS.
         
    * Nu,ERDDAP™doet een betere taak van het interpreteren van ongebruikelijke en ongeldige karakterreeksen in CSV-bestanden. Dankzij OBIS.
         
    * Na een jaar van problemen met Cassandra, heb ik eindelijk Cassandra geïnstalleerd. (v2) opnieuw en zo was in staat om de tests opnieuw te doen met Cassandra v2. Dus nu kan ik meer vertrouwen stellen datERDDAP™werkt samen met Cassandra v2 en v3. Dankzij ONC.
         

## Versie 2.12{#version-212} 
 (vrijgegeven 2021-05-14) 

*    **Nieuwe functies en wijzigingen (voor gebruikers) :** 
    * BUG FIX: Als je op de zwarte lijst staat, kun je nu geen lijst van je abonnementen aanvragen.
         
*    **DingenERDDAP™Beheerders moeten weten en doen:** 
    * DOEN: NIEUW: systeem om automatisch het vermogen van kwaadaardige gebruikers en te agressieve legitieme gebruikers te beperken om een groot aantal gelijktijdige verzoeken die de prestaties van het systeem voor andere gebruikers zou degraderen. Er zijn 3 nieuwe optionele tags indatasets.xmldie u direct na kunt/moet toevoegen&lt;diagramAchtergrondkleur&gt;:
```
        <ipAddressMaxRequests></ipAddressMaxRequests>  <!-- current default=7 -->
        <ipAddressMaxRequestsActive></ipAddressMaxRequestsActive>  <!-- current default=2 -->
        <ipAddressUnlimited></ipAddressUnlimited>  <!-- default=empty -->  
```

Voor nadere informatie, zie[ipAddressMaxverzoeken](/docs/server-admin/datasets#ipaddressmaxrequests).ERDDAP™ook nu drukt het "Aantal unieke gebruikers (sinds opstarten) " op de status.html pagina.
Dankzij de persoon in China die mijnERDDAP™installatie.
         
    * VERANDERING aan postgresql driver gedrag: Toen ik de Postgresql driver bijgewerkt, de kolom namen in de tabel lijst gegenereerd door Postgresql en GenerateDatasetsXml kwam terug alle hoofdletters, in plaats van alle kleine letters, zoals voorheen. Ik weet niet of dat invloed heeft op andere dingen omdat databases die namen vaak als ongevoelig beschouwen. Mijn testset werkt nog steeds correct. Maar als je dataset hiermee stopt...ERDDAP™update, dit is de mogelijke reden om eerst na te streven.
         
    * BUG FIX:ERDDAP™nu ook behandelt privé AWS S3 bestanden correct. Er waren andere gerelateerde verbeteringen aan de behandeling van AWS S3-bestanden. Dankzij Michael Gangl en Dylan Pugh.
         
    * NIEUW:EDDGridVanNcFiles enEDDGridVanNcFiles Uitgepakt kan nu gegevens lezen van "structuren" in.nc4 en.hdfVier dossiers. Om een variabele te identificeren die afkomstig is van een structuur, de&lt;sourceName&gt; moet het formaat gebruiken: _fullStructureName_|_memberName_, bijvoorbeeld groep1/myStruct|mijn Lid . Dankzij NRL.
         
    * VERANDERD: Nu, als het huidige geheugengebruik plus dit verzoek is zelfs iets hoog, griddap sets nThreads voor dit verzoek tot 1. Dus,ERDDAP™Bespaart geheugen wanneer geheugen schaars is. Dankzij de persoon in China die mijnERDDAP™installatie.
         
    * NIEUW systeem om het aantal geopende bestanden te controleren (die sockets en sommige andere dingen bevat, niet alleen bestanden) in Tomcat op Linux computers. Als sommige bestanden per ongeluk nooit worden gesloten, kan het aantal geopende bestanden toenemen totdat het de maximaal toegestane en tal van echt slechte dingen gebeuren. Dus nu, op Linux computers (de informatie is niet beschikbaar voor Windows) :
        
        * Er is een nieuwe kolom "Open Bestanden" aan de extreem-rechts van de status.html webpagina met het percentage van de max bestanden geopend. Op Windows, het toont gewoon "?"
        * WanneerERDDAP™genereert die informatie aan het einde van elke belangrijke dataset herladen, het zal afdrukken naar het logboek. txt-bestand:
openFileCount=_current_ of max=_max_ %=_percent_
        * Indien het percentage &gt;50% bedraagt, wordt een e-mail naar deERDDAP™beheerder en e-mail Alles Naar e-mailadressen.
        
Om meer te weten te komen, of als u dit probleem op uwERDDAP™, zie[Te veel geopende bestanden](/docs/server-admin/additional-information#too-many-open-files).
Dankzij de persoon in China die mijnERDDAP™installatie.
         
    * NIEUW: Ik heb veel controle toegevoegd voor en behandeling van "Te veel geopende bestanden," dus de taak stopt gewoon en de gebruiker ziet de foutmelding. Gegevensbestanden zullen niet langer worden gemarkeerd als slecht als het lezen ervan resulteert in een "Te veel geopende bestanden" fout.
         
    * NIEUW\\[bigParentDirectory\\]/badFilesVlag-map:
Als je een bestand in deze map plaatst met eendatasetIDals bestandsnaam (de inhoud van het bestand doet er niet toe) ,ERDDAP™zal de badFiles verwijderen.ncbestand voor die dataset (indien) en herlaad de dataset zo snel mogelijk. Dit veroorzaaktERDDAP™om opnieuw te proberen om te werken met de bestanden eerder (Fout?) gemarkeerd als slecht. Dankzij Marco Alba.
         
    * VERANDERD: bij het opstarten, indien eenEDDGridVan...Bestanden of EDDtableVan... Bestanden dataset heeft aanvankelijk 0 bestanden in de lijst met bekende geldige bestanden (bijvoorbeeld, het is een nieuwe dataset) , danERDDAP™stelt het laden uit en stelt een vlag in zodat het zo snel mogelijk geladen wordt nadat de hoofdbelastingDatasets voltooid is. Dit versnelt de initiële opstart wanneer er nieuwe datasets zijn.
         
    * VERANDERD: FileVisitorDNLS.testAWSS3 () en FileVisitorSubdir.testAWSS3 () ; gebruik nu de AWS v2 (niet v1) SDK. Dus nu de GitERDDAP™distributie bevat nu alle benodigde bestanden en je hoeft niet langer handmatig toe te voegen de enorme v1 AWS SDK jar bestand.
         
    * VERANDERD: Ik heb Maven gebruikt om afhankelijkheden te detecteren/verzamelen (de .jar bestanden in /lib) . De verandering in v2 van de AWS SDK vereiste dit. Het zal nodig zijn voor andere geïmporteerde code in de toekomst. Een enorme dank aan Kyle Wilcox die de pom.xml die hij creëerde en gebruikt, die verschillende problemen voor mij opgelost.
         
    * VERANDERD: De klassepadparameter (-cp) gebruikt in GenerateDatasetXml, DasDds en andere kleine programma's die komen metERDDAP™, en in het advies aan programmeurs is nu veel eenvoudiger en mag nooit meer veranderen omdat het verwijst naar de directory, niet de individuele bestanden:
\\-cp klassen;C:\\programma's\\\_tomcat\\lib\\servlet-api.jar;lib\\\*
         (of ':' in plaats van ';' voor Linux en Macs) .
         (Ik had dit jaren geleden moeten doen toen het een optie werd.)   
         
    * NIEUW: GenererenDatasets Xml heeft een nieuwe utility optie: vindDuplicateTime die zal zoeken via een verzameling van gridded.nc  (en verwant) bestanden om bestanden met dubbele tijdwaarden te vinden. Zie[findDuplicate Tijd](/docs/server-admin/datasets#findduplicatetime)  
         
    * NIEUW:datasets.xmlkan nu een&lt;paletten&gt; tag die de&lt;paletten&gt; tag waarde van messages.xml (of keert terug naar de berichtwaarde.xml als deze leeg is) . Hiermee kunt u de lijst met beschikbare paletten wijzigen terwijlERDDAP™is aan het rennen. Ook, als je een cptfiles subdirectory in deERDDAP™inhoudsmap;ERDDAP™zal alle \\*.cpt bestanden in die map kopiëren naar de\\[kat\\]/webapps/erddap/WEB-INF/cptfiles directory elke keerERDDAP™begint. Door deze wijzigingen kunt u paletten toevoegen en blijven de wijzigingen bestaan wanneer u een nieuwe versie vanERDDAP. Zie[documentatie paletten](/docs/server-admin/datasets#palettes)  
Dankzij Jennifer Sevadjian, Melanie Abecassis en misschien andere kustwachtmensen.
         
    * VERANDERD: [&lt;trageDownTroubleMillis&gt;] (/docs/server-admin/datasets#slowdowntroublemillis) wordt nu gebruikt voor alle mislukte verzoeken, niet slechts een paar soorten.
         
    * VERANDERD: De RunLoadDatasets-thread onderbreekt nu de LoadDatasets-thread bij 3/4 LoadDatasets MaxMinutes dus er is meer tijd voor LoadDatasets om de onderbreking en exit sierlijk op te merken. Ook zijn er meer en betere kenmerkende berichten voor dit.
         
    * Veranderd van de oude versie van Lucene naar v87.0.
         
    * VERANDERING: e-mails verzonden doorERDDAP™nu verschijnt met een vaste breedte lettertype.
         
    * Wijziging:EDDGridFromFiles krijgt nu aswaarden en attributen van FIRST|LAST-bestand, zoals gespecificeerd in&lt;MetadataVan&gt;. Bedankt. (niet) Aan Ken Casey, et al.
         
    * ADDED ondersteuning voor de ongeldige eenheden "grade\\_North" en "grade\\_East" die ten onrechte worden gebruikt door de recente bestanden (sinds 2020-10-01) in de AVHRR Pathfinder versie 5.3 L3-verzameld (L3C) SST-datasets (nceiPH53sstd1day en nceiPH53sstn1day) .ERDDAP™kan ze nu standaardiseren tot geldige eenheden. Bedankt. (niet) Aan Ken Casey, et al.
         

## Versie 2.11{#version-211} 
 (vrijgegeven 2020-12-04) 

*    **Nieuwe functies en wijzigingen (voor gebruikers) :** 
    * BUG FIX: OrderByMean gooide een NullPointerUitzondering als een variabele slechts een van \\_FillValue of ontbrekende\\_ Waarde gedefinieerd. Nu behandelt het de situatie correct. Dankzij Marco Alba.
         
    * BUG FIX: Er waren problemen met de ODV-tekstbestanden aangemaakt doorERDDAP™in v2.10. Die problemen zijn opgelost. Dankzij Shaun Bell.
         
    * BUG FIX: Net binnen.ERDDAP™v2.10: Als de lat lon grenzen in de URL zijn opgegeven, dan is het ingebonden vakje niet getekend op de wereldkaart. Nu weer. Dankzij John Maurer.
         
*    **DingenERDDAP™Beheerders moeten weten en doen:** 
    * BUG FIX: Net binnen.ERDDAP™v2.10: De scriptbestanden voor ArchiveADataset, GenererenDatasets Xml en DasDds werkten niet omdat ze niet de veranderingen in het klassepad die werden toegevoegd metERDDAP™v2.10. Nu wel. Dankzij Marco Alba.
         
    * NIEUW: Indatasets.xml, je mag nu het label hebben:
```
        <emailDiagnosticsToErdData></emailDiagnosticsToErdData> <!-- true (the default) or false -->  
```

Momenteel, indien waar (of als de tag leeg is, of als de tag niet in het bestand staat) , wanneer het verzoek van een gebruiker leidt tot een NullPointerException,ERDDAP™zal de stack trace e-mailen naarerd.data at noaa.gov  (deERDDAP™ontwikkelingsteam) . Dit moet veilig en veilig zijn omdat er geen vertrouwelijke informatie is (b.v. het verzoekUrl) is opgenomen in de e-mail. Dit moet het mogelijk maken om elke obscure, totaal onverwachte bugs die leiden tot NullPointerExceptions te vangen. Anders ziet de gebruiker de uitzonderingen, maar deERDDAP™ontwikkelaars niet, dus we weten niet of er een probleem is dat opgelost moet worden.
        
Het is mogelijk dat deze tag zal leiden tot andere, soortgelijke kenmerkende informatie wordt gemaild naarerd.data at noaa.govin de toekomst. De inhoud van de e-mail zal altijd minimaal zijn en gerelateerd aan bugs, en niet, bijvoorbeeld, gebruiksinformatie. Dankzij Marco Alba.
         
        
    * VERANDERD: Nu gemeenschappelijke gecomprimeerde bestandstypen (.bz2,.gz,.gzip,.tar,.tgz,.z,.zip) zijn ook verboden voor byte range verzoeken. Dit wordt gespecificeerd via&lt;extensiesNoRangeRequests&gt; in messages.xml.
         
    * KENNISPROBLEEM: Zoals bijERDDAP™2.10,.ncml bestanden die proberen om een attribuut te wijzigen, veranderen het attribuut niet. Dit is een bekende bug in netcdf-java die ik heb gemeld en ze zeggen dat zal worden opgelost in de volgende release van netcdf-java.
         

## Versie 2.10{#version-210} 
 (vrijgegeven 2020-11-05) 

*    **Nieuwe functies en wijzigingen (voor gebruikers) :** 
    * NIEUW: De nieuwe[Interpolaat](https://coastwatch.pfeg.noaa.gov/erddap/convert/interpolate.html)converter interpoleert efficiënt waarden uit de waarden van een gerasterde dataset. Als zodanig is het bijzonder nuttig voor onderzoekers die werken met dierspoorgegevens. Deze converter neemt een tabel met breedte, lengte en tijd kolommen (en misschien andere kolommen) en geeft een tabel terug met extra kolommen met geïnterpoleerde waarden. Dus, dit is vergelijkbaar met de populaire[Xtractomatisch](https://coastwatch.pfeg.noaa.gov/xtracto)script oorspronkelijk gemaakt door Dave Foley, maar biedt het voordeel van verwerking tot 100 punten per aanvraag. Dankzij Dave Foley en Jordan Watson (NMFS) .
         
    * VERBETERD: Geavanceerd zoeken is nu streng voor niet-.html verzoeken. Het zal nu uitzonderingen maken voor verzoeken met permanente fouten (b.v. verzoeken waarbij minLat &gt; maxLat) of tijdelijke fouten (b.v. verzoeken om eenstandard\\_namedie niet bestaat) . Voor .html verzoeken, Geavanceerd zoeken is onveranderd: zoals met Google zoekopdrachten, het doet zijn beste en stilletjes herstelt of negeert fouten. Dankzij Rich Signell.
         
    * VERBETERD: De kaart op de pagina Geavanceerd zoeken is nu groter (Je moet nog knijpen, maar minder) en aanzienlijk nauwkeuriger (maar nog steeds niet perfect) . Dankzij John Maurer.
         
    * VERBETERD: De "Draw land mask" instelling op Make A Graph webpagina's en de &.land=... instelling in URL's die een kaart aanvragen ondersteunt nu nog twee opties:
"outline" trekt gewoon de landmaskers, politieke grenzen, meren en rivieren.
"Uit" tekent niets.
Zie[&.land=... documentatie](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands).
Dankzij John Maurer.
         
    * VERBETERD: grafieken en kaarten aangemaakt doorERDDAP™kan nu drie nieuwe merkers gebruiken: Grensloze Gevulde Vierkant, Grensloze Gevulde Cirkel, Grensloze Gevulde Driehoek. De code hiervoor werd bijgedragen door Marco Alba van ETT / EMODnet Natuurkunde. Dankzij Marco Alba.
         
    * NIEUW:"files"systeem ondersteunt nu gewoon Bestandstypeantwoorden (.csv,.htmlTable,.itx,.json,.jsonlCSV1,.jsonlCSV,.jsonlKVP,.mat,.nc,.nccsv,.tsv, of.xhtml.) , bijvoorbeeld,[ https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv ](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv).
Dankzij Kyle Wilcox.
         
    * VERBETERD: De gegenereerde URL's wanneer een gebruiker een Data Access Form gebruikt (.html) of een make-a-graph (.graph) web pagina nu goed procent-coderen de tekens\\[en\\]. Dit maakt de URL's een beetje moeilijker voor mensen om te lezen, maar is beter vanuit een web-security standpunt. Beheerders hebben nu de mogelijkheid om ontspannenQueryChars= '\\[\\]|' in het Tomcat server.xml bestand (minder veilig) of niet (veiliger) .
Dankzij Antoine Queric, Dominic Fuller-Rowell en anderen.
         
    * NIEUW: Als een verzoek aan een EDDTable datasets bevat &add Variabelen waarbij (_Attribuut Naam, kenmerk Waarde) ,ERDDAP™zal alle variabelen toevoegen die een _attribuut hebben Naam=attribuut Waarde_ naar de lijst van gevraagde variabelen.
Zie[& Toevoegen Variabelen Waar documentatie](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#addVariablesWhere). Dankzij Aurelie Briand, et al.
         
    * VERANDERD:ERDDAP™weigert nu bytebereikverzoeken naar /files/.ncof.hdfdossiers. Geen verbinding maken met remote.ncof.hdfbestanden alsof het lokale bestanden waren. Het is verschrikkelijk inefficiënt en veroorzaakt vaak andere problemen. In plaats daarvan:
        * Gebruik(OPeN)DAPclient software om verbinding mee te makenERDDAP'sDAPdiensten voor deze dataset (die /griddap/ of /tabledap/ in de URL) . Dat is watDAPIs voor.
        * Gebruik het Data Access Form van de dataset om een subset van gegevens aan te vragen.
        * Als u het hele bestand of herhaalde toegang over een lange periode nodig hebt, gebruikcurl,wget, of uw browser om het hele bestand te downloaden, dan toegang tot de gegevens van uw lokale kopie van het bestand.
             
    * VERBETERD: de Txt uitvoer optie is herschreven om de nieuwe versie vanODV .txtbestanden en ter ondersteuning van de juiste weergave van baan-, tijd- en profielgegevens.
         
    * VERBETERD: Nu, zoektermen in dubbele citaten worden geïnterpreteerd als een json string, zodat ze kunnen hebben \\ gecodeerde tekens. Zo kunt u onder andere zoeken naar een exacte match voor een attribuut, bijvoorbeeld "instelling=NOAA\\n" zal niet overeenkomen met een dataset met instelling=NOAA NMFS. Dankzij Dan Nowacki.
         
    * VERBETERD: Op extra plaatsen, zwevende puntnummers (vooral praalwagens omgezet naar dubbels) Nu verschijnt als een iets meer afgeronde versie van het aantal op extra plaatsen, bijvoorbeeld een float die eerder als een dubbel zoals 32.27998779296875 werd getoond, zou nu kunnen verschijnen als 32.28. Dankzij Kyle Wilcox.
         
    * BUG FIX: ongesigneerde integer audiobestanden werden iets verkeerd gelezen. Nu worden ze correct gelezen.
         
*    **DingenERDDAP™Beheerders moeten weten en doen:** 
    * WAARSCHUWING: De eerste keer dat u draaitERDDAP™v2.10, sommige datasets op basis van lokale gegevensbestanden zullen laden **zeer** langzaam omdatERDDAP™moet opnieuw zijn database van bestandsinformatie. Na de langzame eerste herlading, zullen ze snel laden, zoals voorheen. Wees geduldig.
         
    * Dingen die je moet doen:
        * Wanneer u voor het eerst v2.10, sommige datasets niet laden omdatERDDAP™is nu strenger over sommige metadata. Zoals voorheen,ERDDAP™zal u een Dagelijks Verslag e-mailen wanneer het voor het eerst wordt geladen. Dat zal de foutmeldingen voor elk van de datasets die niet geladen. Lees de foutmeldingen om de problemen te achterhalen. In de meeste gevallen hoef je alleen maar een kleine verandering te maken in de metadata van de dataset om het probleem op te lossen.
             
        * Indatasets.xml, zoeken&lt;sourceName&gt;= (de'='teken, dat een[vaste waardesourceName](/docs/server-admin/datasets#fixed-value-sourcenames)) . Voor de meesteERDDAP™Deze zijn zeldzaam. Als een van de waarden na'='zijn tekenreeksen (geen nummers) , je moet nu omsluiten de string in dubbele citaten. Bijvoorbeeld,
Vóór:&lt;sourceName&gt;=KZ401&lt;'sourceName&gt;
Na:&lt;sourceName&gt;="KZ401"&lt;'sourceName&gt;
             
        * NIEUW: Er is een nieuwe optionele instelling in setup.xml,&lt;standaardAccessibleViaFiles&gt;, waarmee de standaardinstelling wordt ingesteld&lt;toegankelijkViaFiles&gt; voor elk van de datasets. De standaard voor deze nieuwe tag is onjuist, die de vorige nabootstERDDAP™Gedrag. Deze instelling op lager niveau kan worden overschreven door een gegeven dataset&lt;toegankelijkViaFiles&gt; instelling.
            
AANVAARD (omdat er gebruikers zijn die dit willen) :
Als je alle EDD wilt maken... FromFiles datasets toegankelijk via het bestandssysteem, dan
            
            1. Voeg deze tag toe aan uw setup.xml bestand:
```
                <defaultAccessibleViaFiles>true</defaultAccessibleViaFiles>
```
            2.   (Optioneel) Verwijder alle
```
                <accessibleViaFiles>true</accessibleViaFiles>
```
indatasets.xmlomdat de standaard is nu waar.
                 
        * \\_FillValue-attributen toevoegen:
            ERDDAP™gebruikt om een standaard \\_FillValue voor alle integer variabelen te hebben: de maximale waarde van het gegevenstype (bv. 127 voor bytevariabelen) . Nu niet meer. Om te voorkomen dat deze waarden als gegevenswaarden worden getoond (ontbrekende waarden niet) , je moet deze expliciet vermelden via \\_FillValue attributen. Vanaf nu, elke keer als je begintERDDAP™, het zal de beheerder een e-mail met een .csv tabel met een lijst van integer bron variabelen die niet hebben \\_FillValue ofmissing\\_valueattributen, en de voorgestelde nieuwe \\_FillValue attributen. Zie[_Vullen toevoegen Waardeattributen](/docs/server-admin/datasets#add-_fillvalue-attributes)voor meer informatie en instructies.
             
        * Als u compileertERDDAP™, moet je de klassepath parameter op de javac commando regels aanpassen om een verwijzing naar deze nieuwe pot's toe te voegen: lib/commons-jexl.jar;lib/aws-java-sdk.jar;lib/jackson-annotations.jar;lib/jackson-core.jar;lib/jackson-databind.jar .
             
    * VERANDERD: Tomcat 9 is nu de aanbevolen versie van Tomcat voorERDDAP. De nieuwste versie van Tomcat 8.5+ is voorlopig ook prima. We hebben opgeruimd.ERDDAP's[Tomcat installatie-instructies](/docs/server-admin/deploy-install#tomcat).
        
De laatste versie vanJava8 (nietJava9, 10, 11, ...) van[GoedkeuringOpenJDK](https://adoptopenjdk.net/)blijft de aanbevolen versie vanJavavoorERDDAP.Java8 heeft langdurige ondersteuning van AdoptOpenJDK zodat het veilig te gebruiken blijft, maar vergeet niet om de nieuwste versie van het periodiek om veiligheidsredenen.
        
    * NIEUW: Script Bronnamen / Afgeleide Variabelen in Tabulaire Datasets
EDDTableFromFiles, EDDTableFromDatabase en EDDTableFromFileNames datasets kunnen nu expressies en scripts in desourceName. Hiermee kun je nieuwe variabelen maken op basis van bestaande variabelen in de bronbestanden. De berekening voor een gegeven nieuwe variabele gebeurt binnen één rij van de resultaten, herhaaldelijk voor alle rijen. Om bijvoorbeeld een lengtegraadsvariabele te maken met waarden in het bereik -180 - 180° van een variabele met waarden in het bereik 0 - 360°:
        &lt;sourceName&gt;=Math2.anglePM180 (rij.kolomDubbel ("lon") ) &lt;'sourceName&gt;
Voor nadere bijzonderheden, zie[Script-bronnamen](/docs/server-admin/datasets#script-sourcenamesderived-variables)  
Met dank aan Bob Simons (Wie heeft dit eerder gepland?ERDDAP™v1.0 en uiteindelijk een manier gevonden om het uit te voeren) , Kevin O'Brien, Roland Schweitzer, John Maurer, en de Apache JEXL bibliotheek voor het doen van het echt moeilijke deel (en het goed doen) .
         
    * NIEUW: Niet-gesigneerde gehele gegevenstypes (ubyte, ushort, uint, ulong) Nu worden ze gesteund. Merk op dat veel bestandstypen (bv., .das, .dds,.nc3) niet al deze nieuwe data types ondersteunen. Zie[Gegevens Typedocumentatie](/docs/server-admin/datasets#data-types)voor details over hoeERDDAP™behandelt deze verschillen. Met name omdat(OPeN)DAP, met name de .dds reactie, ondersteunt niet ondertekend bytes, longs, of lang, u wilt misschien gebruikenERDDAPDe tabel geeft een overzicht van .das en .das zoals te zien in dehttp.../erdap/ **info** /_datasetID_.html webpagina (bijvoorbeeld,[ https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html) ) die u ook kunt krijgen in andere bestandstypen of de.nccsvMetadatarespons (bijvoorbeeld,[ https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata) ) , beide ondersteunen alle datatypes in alle situaties.
        
WAARSCHUWING: Voor datasets die door deze wijziging worden beïnvloed, is het mogelijk dat u problemen met de dataset ziet omdat de gegevens dieERDDAP™leest van de bron kan anders zijn (Bijvoorbeeld, variabelen die eerder als ondertekende gehele getallen werden gelezen, kunnen nu worden gelezen als niet-getekende gehele getallen) . De resulterende problemen zijn onder andere: nieuwe bestanden worden niet toegevoegd aan de dataset, en/of fouten wanneer u probeert om toegang te krijgen tot de gegevens. Als een dataset problemen heeft, is het eerste ding om te proberen om[zet een harde Vlag](/docs/server-admin/additional-information#hard-flag)voor de dataset. Als dat het probleem niet oplost, moet je naar log kijken. txt om de foutmeldingen te zien, duik in dedatasets.xmlvoor de dataset, en/of misschien rerun generateDatasets.xml voor de dataset.
Dankzij netcdf-java 5.x (die de kwestie dwong) en de komende CF 1.9.
        
    * VERBETERD: Er is nu[betere documentatie/advies](/docs/server-admin/datasets#s3-buckets)voor het maken van een dataset van bestanden in AWS S3 emmers. Dankzij Micah Wengren.
         
    * VERANDERD: Er zijn verschillende veranderingen in verband met de"files"systeem.
        * De code om dit te verwerken werd herschreven om bruikbaar te zijn voor meer klassen.
             
        * NIEUW: User requests for directory listings can now request that the response be one of the standard plain table types by addending the deviceed file extension: .csv,.htmlTable,.itx,.json,.jsonlCSV1,.jsonlCSV,.jsonlKVP,.mat,.nc,.nccsv,.tsv, of.xhtml). Bijvoorbeeld,
            [ https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv ](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv)  
Dankzij Kyle Wilcox en Shane St Savage.
             
        * VERBETERD: Nu, Genereren Datasets Xml bevat geen&lt;toegankelijkViaFiles&gt;-tag in de uitvoer. De veronderstelling is dat de dataset zal afhangen van de waarde van de nieuwe&lt;standaardToebehorenViaFiles&gt; tag in setup.xml. Zie[toegankelijk ViaFiles](/docs/server-admin/datasets#accessibleviafiles).
             
        * VERBETERD: Extra datasettypes ondersteunen nu toegankelijk ViaFiles:EDDGridSideBySide,EDDGridAggregatedExistingDimensionEDDGridFromErdap, EDDTableFromErdap,EDDGridFromEDTable, EDDTableVanEDDGridenEDDGridVan Etopo. Hiervoor zijn de bestanden van een gegeven remote/child dataset alleen toegankelijk als zowel de ouder als de remote/child dataset toegankelijk zijn ViaFiles ingeschakeld (misschien via&lt;standaardAccessibleViaFiles&gt;). Dankzij Damian Smyth en Rob Fuller.
             
        * DOEN / AANBEVELING: Wij raden aan om alle relevante datasets toegankelijk te maken via het bestandssysteem door het instellen&lt;defaultAccessibleViaFiles&gt; te true in setup.xml omdat er een groep gebruikers is voor wie dit de voorkeur is om de gegevens te krijgen. De Commissie is van mening dat de"files"systeem maakt het gemakkelijk voor gebruikers om te zien welke bestanden beschikbaar zijn en wanneer ze voor het laatst gewijzigd, waardoor het gemakkelijk voor een gebruiker om hun eigen kopie van de hele dataset te behouden. Als u over het algemeen geen datasets toegankelijk wilt maken via het bestandssysteem, stel&lt;defaultAccessibleViaFiles&gt; to false. In beide gevallen, gewoon gebruiken&lt;toegankelijkViaFiles&gt; voor de weinige datasets die uitzonderingen zijn op het algemene beleid dat door&lt;standaardToebehorenViaFiles&gt; (bijvoorbeeld, wanneer de dataset gebruikt.ncml bestanden, die niet echt nuttig zijn voor gebruikers) .
             
    * VERBETERD: Nu, als een brondataset heeft CF raster\\_mapping informatie, genereren Datasets Xml voor gerasterde datasets voegt de informatie toe aan global&lt;addAtts&gt;, en de informatie wordt toegevoegd aan global&lt;bronAtts&gt; elke keer dat gegevens uit het bestand worden gelezen. De informatie zal in de globale attributen van de dataset verschijnen als een verzameling attributen met het prefix raster\\_mapping\\_ .
         
    * VERBETERD: Ondersteuning voor groepen bij het lezen.nc4 (en tot op zekere hoogte.hdf5) dossiers. In het algemeenERDDAP™dataset zal worden opgebouwd uit de variabelen in een van de bestandsgroepen. Ook, GenererenDatasets Xml voorEDDGridVanNcFiles enEDDGridVanNcFiles Uitgepakt vraagt nu om een "groep" (b.v., "" voor elke/alle groepen, "sommigegroep," "sommigegroep/een enkelesubgroep," of "\\[root\\]" voor alleen de wortelgroep) . Dankzij Charles Carleton en Jessica Hausman.
         
    * VERBETERD: GenererenDatasets Xml voorEDDGridVanNcFiles enEDDGridVanNcFiles Uitgepakt ondersteunt nu een optionele "DimensionsCSV" parameter waarmee u de bronnamen kunt opgeven van de afmetingen die u wilt dat deze dataset gebruikt. Gebruik "" om de variabelen te krijgen die de meeste dimensies gebruiken, zoals voorheen. Ook is een verwante kleine bug die zich heeft voorgedaan met dit type bestand nu opgelost. Dankzij Sujal Manandhar.
         
    * BUG FIX: GenererenDatasets Xml bevat nu "EDDTableFromJsonlCSVFiles" (niet "EDDTableFromJsonlCSV") als een van de EDDType opties. Dankzij Andy Ziegler.
         
    * VERBETERD:EDDGridVanNcFiles Uitgepakt standaardiseert "units" attributen naar standaard/"canonical" udunits (dezelfde methode als de convertereenheden) . Bijvoorbeeld,"meter per second","meters/second","m.s^-1"en"m s-1"alle"m s-1". Dankzij Andy Ziegler.
        
WAARSCHUWING: Het is mogelijk dat dit problemen veroorzaakt voor sommige bestaande datasets (bijv. nieuwe bestanden "slecht" laten labelen) . Zo ja,[zet een harde Vlag](/docs/server-admin/additional-information#hard-flag)voor de dataset zodat alle bronbestanden opnieuw worden gelezen met het nieuwe systeem.
        
    * VERBETERD: Nu, een variabele&lt;sourceName&gt; kan een vaste waarde van =NaN specificeren en de variabele kan eenactual\\_rangeattribuut dat een eindig bereik specificeert. Dit is soms nuttig zodat een dataset (met name een EDDTableFromFileNames dataset) kan dummy variabele hebben (s)   (bv. breedtegraad, lengtegraad, tijd) met vaste waarden van NaN, maar met een geldigactual\\_range  (zoals ingesteld door het kenmerk) . Dan, in Geavanceerd zoeken een gebruiker kan zoeken naar datasets die gegevens hebben in een specifieke breedtegraad, lengtegraad, tijdsbereik en deze dataset zal kunnen zeggen dat het wel relevante gegevens heeft (Hoewel alle werkelijke rijen van gegevens NaN tonen) . Zie[documentatie met vaste waarde](/docs/server-admin/datasets#fixed-value-sourcenames).
Dankzij Mathew Biddle.
         
    * NIEUW: Nu, dedatasets.xmlbrok voor een EDDTableFromAsciiFiles of EDDTableFromColumbnarAsciiFiles dataset kan een tag die verteltERDDAP™alle regels bovenaan het bestand negeren tot en met de regel die overeenkomt met de opgegeven reguliere expressie. Bijvoorbeeld,
        &lt;skipheaderToRegex&gt;\\\*\\\*\\\*Einde kop.\\*&lt;/skipHeaderToRegex&gt;
zal negeren alle lijnen tot en met een lijn die begint met "\\*\\*Het einde van de header. Zie [&lt;skipheaderToRegex&gt; documentatie] (/docs/server-admin/datasets#skipheadertoregex) .
Dankzij Eli Hunter.
         
    * NIEUW: Nu, dedatasets.xmlbrok voor een EDDTableFromAsciiFiles of EDDTableFromColumbnarAsciiFilesdataset kan een tag die verteltERDDAP™alle regels in het bestand die overeenkomen met de opgegeven reguliere expressie negeren. Bijvoorbeeld,
```
        <skipLinesRegex>#.\\*</skipLinesRegex>  
```

zal alle regels die beginnen met "#" overslaan. Zie [&lt;skipLinesRegex&gt; documentatie] (/docs/server-admin/datasets#skiplinesredex) .
Dankzij Eli Hunter.
         
    * NIEUW:datasets.xmlbrok voor elke EDDTable-dataset kan nu &add Variabelen waarbij (_attribuutNamesCSV_) . Als dat zo is,ERDDAP™zal een widget toevoegen voor elk van de opgegeven attribuut Naam van het Data Access Form van de dataset (.html web pagina) om het gebruikers gemakkelijk te maken om &add toe te voegen Variabelen waarbij (_Attribuut Naam, kenmerk Waarde) op het verzoek.
Zie[& Toevoegen Variabelen Waar documentatie](/docs/server-admin/datasets#addvariableswhere).
Dankzij Aurelie Briand, et al.
         
    * NIEUW Hulpmiddel voor derde partijen:ERDDAP- Lint
        ERDDAP-lint is een programma van Rob Fuller en Adam Leadbetter van het Irish Marine Institute dat u kunt gebruiken om de metadata van uwERDDAP™datasets.ERDDAP-lint "bevat regels en een eenvoudige statische webapplicatie voor het uitvoeren van sommige verificatie testen tegen uwERDDAP™server. Alle tests worden uitgevoerd in de webbrowser." Zoals de[Unix/Linux-pijlgereedschap](https://en.wikipedia.org/wiki/Lint_(software)), kunt u de bestaande regels bewerken of nieuwe regels toevoegen. Zie[ERDDAP- Lint](https://github.com/IrishMarineInstitute/erddap-lint)voor meer informatie.
        
Deze tool is vooral nuttig voor datasets die je enige tijd geleden hebt gemaakt en wil nu up-to-date brengen met je huidige metadata voorkeuren. Bijvoorbeeld, vroege versies van GenerateDatasets Xml heeft geen moeite gedaan om wereldwijd te creërencreator\\_name,creator\\_email, maker\\_type, ofcreator\\_urlMetadata. Je zou kunnen gebruikenERDDAP-lint om de datasets te identificeren die die metadata kenmerken missen.
        
Met dank aan Rob en Adam voor het creëren van deze tool en het ter beschikking stellen van deERDDAP™Gemeenschap.
        
    * NIEUW: Nu is het goed als sommige bestanden in eenEDDGridFromFiles dataset heeft niet alle variabelen van de dataset. De bestanden worden opgenomen alsof ze de variabelen hadden (met alle ontbrekende waarden) .
Dankzij Dale Robinson en Doug Latornell.
         
    * NIEUW: Er zijn nieuwe gebruiksstatistieken in het logbestand en het Daily Report om beheerders te helpen de gebruikers te identificeren die geheugenproblemen veroorzaken. De statistieken worden genoemd "OutOfMemory (Array-grootte) ", "OutOfMemory (Te groot) " en "OutOfMemory (Veel te groot) " Ze tonen de IP-adressen van de gebruikers die verzoeken in deze categorieën hebben ingediend en het aantal verzoeken dat zij hebben gedaan. Als er geen lastige verzoeken waren, zullen deze statistieken niet verschijnen. "OutOfMemory (Array-grootte) " en "OutOfMemory (Veel te groot) " verzoeken zijn meestal geen probleem omdat de verzoeken waren zo groot datERDDAP™Snel gepakt en een foutmelding teruggestuurd. De "OutOfMemory (Te groot) " verzoeken zijn gevaarlijker omdatERDDAP™deed wat moeite voordat het besefte dat er niet genoeg geheugen beschikbaar was om het verzoek te behandelen (Hoewel het probleem kan zijn andere verzoeken vlak voor deze verzoeken) .
        
Er zijn ook nieuwe statistieken genaamd "Groot verzoek, IP-adres" die de IP-adressen van de gebruikers die grote verzoeken hebben gedaan tonen (momenteel, gerasterd.ncbestanden &gt; 1GB) .
        
Ook de tijdreekstabel op de status.html pagina bevat nu een kolom "memFail" met het aantal verzoeken dat mislukt is met "OutOfMemory (Te groot) " fouten sinds de laatste grote Load Datasets. Een ander nummer dan 0 is in ieder geval reden tot bezorgdheid.
Dankzij Bob Simons.
        
    * NIEUW: De nieuwe versie vanHyraxtoont map lijsten anders dan voorheen.ERDDAP™kan nu de oude en nieuwe directory lijsten lezen.
         
    * NIEUW: Dataset herlaadt en gebruikers reacties die &gt; 10 seconden duren om te voltooien (succesvol of niet succesvol) zijn gemarkeerd met " (&gt;10s&#33;) " Zo kunt u het log.txt bestand doorzoeken naar deze zin om de datasets te vinden die traag waren om te herladen of het verzoeknummer van de verzoeken die langzaam af waren. U kunt dan hoger kijken in het log.txt bestand om te zien wat de dataset probleem was of wat de gebruiker aanvraag was en van wie het was. Deze trage dataset ladingen en gebruikers verzoeken zijn soms belastend opERDDAP. Dus meer weten over deze verzoeken kan u helpen bij het identificeren en oplossen van problemen.
    * VERBETERD: bij het valideren van een CF DSG-dataset,ERDDAP™zorgt er nu voor dat variabelen met cf\\_role-attributen in de overeenkomstige cdm\\_...\\_variabele lijst staan en niet in andere cdm\\_...\\_variabele lijsten staan. Bijvoorbeeld, als een tijdreeksProfile dataset een "station\\_id" variabele heeft die de cf\\_role=timeserie\\_id attribuut heeft, dan moet "station\\_id" in de cf\\_timeseries\\_variabelen lijst staan, maar niet in de cf\\_profile\\_variabelen lijst.
Dankzij Micah Wengren.
         
    * VERBETERD: 'Simplify' is nu sneller, gebruikt minder geheugen en kan LongArray teruggeven. DankzijUnidata.
         
    * VERBETERD: quickRestart is nu aanzienlijk sneller voor EDDTableVan (nc-gerelateerd) Bestanden (behalve EDDTableFromNcCFFiles en EDDTableFromInvalidCRAFiles) omdat make Verwacht (en een andere plaats) Nu leest u de metadata van het monsterbestand in plaats van alle gegevens te lezen. Dankzij Jessica Austin.
         
    * VERBETERD: Er is nu ondersteuning voor tijdstrings met precisie groter dan to-the-millisecond als de extra cijfers zijn alle 0's, bijvoorbeeld, "2020-05-22T01:02:03.456000000Z." Dankzij Yibo Jiang.
         
    * VERBETERD: GenererenDatasetsXml's EDD.suggerestDestinationName gebruikt om '(' en alles erna te verwijderen. Nu verwijdert het (.\\*) alleen indien dit het einde is van desourceName. Nu verwijdert het ook\\[.\\*\\]Alleen als dat het einde van desourceName. Dankzij Julien Paul.
         
    * VERBETERD: GenererenDatasets Xml maakt nu de variabeledestinationNames uniek door toegevoegd \\_2, \\_3, ..., indien nodig. Dankzij Julien Paul.
         
    * VERBETERD: Wanneer Kalender2.parseDateTime parses dd, hh, of HH, kan de eerste 'cijfer' nu een spatie zijn.
    * KENNISPROBLEEM: Beginnen metERDDAP™2.10,.ncml bestanden die proberen om een attribuut te wijzigen, veranderen het attribuut niet. Dit is een bekende bug in netcdf-java die ik heb gemeld en ze zeggen dat zal worden opgelost in de volgende release van netcdf-java.
         
    * BROKEN LINKS FIX: Ik maakte een goed systeem voor het testen van gebroken links inERDDAP™webpagina's, dus er zouden nu heel weinig verbroken links moeten zijn (ten minste vanaf elke releasedatum -- er ontstaan vaak nieuwe verbroken links) .
         
    * BUG FIX: EDDTableFromHttpGet mislukt met bepaalde soorten verzoeken. Nu niet meer. Dankzij Emma van BODC.
         
    * BUG FIX: Om sommige verzoeken te behandelen, maakte EDDTable een tijdelijk bestand voor elke gevraagde variabele, met een bestandsnaam die eindigt op de naam van de variabele. Als de naam van de variabele ook een soort compressie was (bv., .Z) ,ERDDAPzou proberen (en falen) het tijdelijke bestand decomprimeren. Nu eindigen de tijdelijke bestandsnamen in ".temp." Dankzij Mathew Biddle.
         
    * BUG FIX: GenererenDatasetsXml en Kalender2.convertToJavaDatumtijd Format zijn nu veel minder kans om een onjuiste wijziging te maken bij het proberen om een mogelijk ongeldige datum tijdformaat te herstellen. Opvallend is dat er geen automatisch opgeslokte datumTijdformaat zal worden gewijzigd. Dankzij Mathew Biddle.
         
    * BUG FIX: Als er een fout is opgetreden tijdens het verkrijgen van inhoud van een externe URL, en als de foutStream-inhoud gecomprimeerd is,ERDDAP™nu correct decomprimeert de foutmelding. Dankzij Bob Simons.
         
    * BUG FIX:&lt;abonnerenToRemoteErdapDataset&gt; werd niet toegepast toen de EDD... Van Erddap dataset was een kind dataset. Nu wel. Dankzij Chris Romsos.
         
    * BUG FIX: GenererenDatasets Xml denkt niet langer dat een bron variabele naam die begint met "latin" breedtegraad is. Dankzij Vincent Luzzo.
         
    * BUG FIX: Nu, een OutOfMemoryError tijdens het lezen van een gegevensbestand tijdens het verwerken van een verzoek van een gebruiker is geen reden om een bestand toe te voegen aan de BadFiles lijst. Dankzij Bob Simons.
         

## Versie 2.02{#version-202} 
 (uitgebracht 2019-08-21) 

*    **Nieuwe functies en wijzigingen (voor gebruikers) :** 
    * NIEUW: Er zijn nu twee manieren om te zoeken naar datasets op meerdereERDDAPs. Ze werken iets anders en hebben verschillende interfaces en opties.
        
        *   [Meerdere zoekopdrachtenERDDAPs.html](/SearchMultipleERDDAPs.html)van Bob Simons/NOAA NMFS SWFSC ERD.
        *   [ http://erddap.com ](http://erddap.com)van Rob Fuller/The Marine Institute of Ireland.
        
Dankzij Tylar Murray voor het oorspronkelijke verzoek.
         
    * VERBETERD: een verzoek aan de"files"systeem om een bestand te downloaden dat eigenlijk op een externe site is (bv. AWS S3) nu leidt tot een redirect, zodat de gebruiker daadwerkelijk de gegevens downloaden van de bron, in plaats van het gebruikERDDAP™als tussenpersoon. Dankzij Andy Ziegler enNOAA.
         
    * NIEUW: Als voorbeeld van de nieuwe AWS S3-gerelateerde functies, en om het gemakkelijker te maken voor iedereen om te bladeren en downloaden bestanden van openbare AWS S3 emmers, hebben we gemaakt
        [~110 sample datasets](https://registry.opendata.aws/)die iedereen toestaan om de inhoud van bijna alle van de
        [AWS S3 Open Data emmers](https://registry.opendata.aws/). Als u op de"files"link voor een van deze sample datasets, kunt u bladeren door de directory boom en bestanden in die S3 emmer. Vanwege de manier waarop deze datasets werken, zijn deze directory lijsten altijd perfect up-to-date omdatERDDAP™Hij krijgt ze op de vlucht. Als je de mapboom naar een echte bestandsnaam klikt en op de bestandsnaam klikt,ERDDAP™zal uw verzoek omleiden naar AWS S3 zodat u het bestand rechtstreeks van AWS kunt downloaden.ERDDAP™beheerders kunnen
        [lees aanwijzingen voor hoe dit te doen voor andere S3-emmers](/docs/server-admin/datasets#working-with-aws-s3-files). Dankzij Andy Ziegler enNOAA.
         
*    **DingenERDDAP™Beheerders moeten weten en doen:** 
    * Dingen die je moet doen: geen
         
    * VERBETERD:ERDDAP's methode voor het opslaan van arrays van strings (Tekenreeks) is nu veel efficiënter geheugen. Tekenreeks Arrays worden gebruikt in alleERDDAP™, met name bij het lezen van tabel ASCII-gegevensbestanden. Ook andere wijzigingen maken het lezen van CSV/TSV/SSV ASCII, kolomar ASCII, en jsonlCSV tabelgegevensbestanden sneller en veel meer geheugen-efficiënt. Het resultaat is: voor een 764 MB ASCII data test bestand (maar gecomprimeerd tot een 52MB.gzbestand) met 3,503,266 rijen en 33 kolommen ging het maximale geheugengebruik van 10GB naar 0,6GB (bij piek) . De tijd om het te lezen ging van ~7 minuten (maar varieert sterk met hoeveel fysiek geheugen is in de computer) tot ~36 seconden (inclusief 10 voor vereenvoudiging () die alleen door GenerateDatasets wordt gebruikt Xml) . Veel andere plaatsen inERDDAP™zal profiteren van deze verhoogde geheugenefficiëntie. Dankzij Tylar Murray en Mathew Biddle.
        
Ik heb een andere oplossing onderzocht. (strings in StringArray opslaan als UTF-8-gecodeerde byte arrays) . Dat vermindert geheugengebruik een andere ~33%, maar ten koste van ~33% vertraging. Vergeleken met het systeem dat nu wordt gebruikt, leek dat een slechte ruil. Het is makkelijker om een computer meer geheugen te geven (koop meer geheugen voor ~ $200) dan om het sneller te maken (koop een hele nieuwe computer) .
        
Als het handig is, is het nog steeds altijd een goed idee om enorme tabelgegevensbestanden te splitsen in verschillende kleinere bestanden op basis van sommige criteria zoalsstationIDen/of tijd.ERDDAP™zal vaak slechts een van de kleine bestanden te openen in antwoord op het verzoek van een gebruiker, en dus in staat zijn om veel sneller te reageren.
        
    * VERBETERD: Er is nu[ERDDAP™AWS S3-documentatie](/docs/server-admin/datasets#working-with-aws-s3-files), die beschrijft hoe te krijgenERDDAP™om te werken met gegevensbestanden in AWS S3 emmers.
Ook,ERDDAP™nu maakt gebruik van nieuwe functies in de AWS S3JavaAPI.
Ook,ERDDAP™nu staat AWS S3 URL's toe om extra karakters (periode, koppelteken, onderstreping) in emmernamen.
Ook,ERDDAP™nu vereist dat AWS S3 emmer URL's op een specifieke manier worden geïdentificeerd:
           https://_bucketName_.s3._aws-region._amazonaws.com/_prefix_/   
indien het voorvoegsel facultatief is.
Dankzij Andy Ziegler enNOAA.
         
    * VERBETERD: GenererenDatasets Xml behandelt nu extra vaakmissing\\_values stand-ins als ontbrekende waarden en dus is het waarschijnlijker om een kolom om te zetten naar een numeriek gegevenstype. Ook PrimitiveArray.simplify () nu logt welke specifieke datawaarde ervoor zorgde dat het een gegeven kolom behandelde als een kolom van strings. Dankzij Mathew Biddle.
         
    * VERBETERD:&lt;verzoekBlacklist&gt; ondersteunt nu .\\*.\\*  (of:\\*:\\*voor IPv6) aan het einde van de IP-adressen zodat je een groter stuk IP-adressen kunt blacklisten, bijvoorbeeld 110,52.\\*.\\*  (China Unicom Tianjin) . Zie de documentatie voor [&lt;verzoekBlacklist&gt;] (/docs/server-admin/datasets#verzoekblacklist) Dankzij China Unicom en China Telecom.
         
    * VERBETERD: Als de bron van een dataset geen een"institution"attribuut, GenererenDatasets Xml en loadDataset krijgen het nu van een "creator\\_institution" attribuut (indien beschikbaar) . Dankzij Micah Wengren.
         
    * BUG FIX: standaardiseren Wat niet altijd werd toegepast op ASCII-gegevensbestanden.
Ook EDDTable niet goed omgaan met beperkingen op tijd waarden wanneer de bron had String tijd waarden en standaardiseren Wat gebruikt werd.
Dankzij Paloma de la Vallee.
        
Ik heb eerder niet duidelijk gezegd: je moet gewoon standaardiseren Welke functies wanneer je ze echt nodig hebt (bv. wanneer verschillende bronbestanden tijdwaarden op verschillende manieren opslaan) , omdat sommige verzoeken om datasets die gebruik standaardiseren Wat zal worden verwerkt een beetje langzamer.
        
    * BUG FIX: Een fout in code gebruikt doorEDDGridFromNcFiles veroorzaakte het falen met.nc4 en.hdf5 bestanden met "lang" (int64) variabelen. Dit is nu opgelost. Dankzij Friedemann Wobus.
         
    * BUG FIX: Kleine wijzigingen aan ISO 19115 bestanden om een andere validator blij te maken. Dankzij Chris MacDermaid en Anna Milan.
         

## Versie 2.01.{#version-201} 
 (uitgebracht 2019-07-02) 

*    **Nieuwe functies en wijzigingen (voor gebruikers) :** 
    * Geen.
*    **DingenERDDAP™Beheerders moeten weten en doen:** 
    * BUG FIX: Een fout in de code die het Data Access Formulier voortabledapdatasets zorgden ervoor dat die webpagina leeg was voor sommige datasets. Ook, Ik verbeterde de behandeling van onverwachte fouten op alle HTML pagina's, zodat ze (meestal) een foutmelding weergeven. Dankzij Marco Alba.
    * VERBETERD: GenererenDatasets Xml drukt geen lange waarschuwing meer af aan de bovenkant van de uitgang. In plaats daarvan, zie[Genereren van bewerken Datasets Xml-uitvoer](/docs/server-admin/datasets#you-need-to-edit-the-output-from-generatedatasetsxml-to-make-it-better). Dankzij Steven Baum.
    * VERBETERD: GenererenDatasets Xml doet nu iets verschillende aanbevelingen in verschillende situaties voor&lt;updateEveryNMillis&gt; voor EDD...van...bestanden datasets. Ook, GenererenDatasets Xml ontmoedigt nu het originele "extract" systeem voor EDDTableFromFiles datasets.

## Versie 2.00{#version-200} 
 (vrijgegeven 2019-06-26) 

*    **ERDDAP™V2.00 is eindelijk hier&#33; Ja&#33;**   
     
    * We verontschuldigen ons voor de lange vertraging die nodig is om deze versie af te maken.
Bedankt voor je geduld.
         
    * Het goede nieuws is dat de extra tijd werd gebruikt om meer van de functies die gebruikers hadden gevraagd toe te voegen. Het slechte nieuws is dat zelfs met de vertraging, niet alle gevraagde functies werden toegevoegd. Het spijt ons, maar het leek belangrijker om deze release vrij te krijgen dan om meer te vertragen (Voor altijd?) voortdurend nieuwe functies toevoegen. We beloven terug te keren naar meer frequente releases in de toekomst.
         
    * "Versie 2?&#33; Zijn er grote veranderingen en onverenigbaarheden?"
Grote nieuwe functies? Ja.
Grote onverenigbaarheden of wijzigingen voor beheerders of gebruikers? Nee.
We sprongen van v1.82 naar v2.00:
        * deels om 10 jaar te vieren (nu 11) sinds de eerste openbare bekendmaking vanERDDAP™  (v1.00 op 2008-05-06, die naar buiten opvallend leek op v2.00) . In die tijd,ERDDAP™van één installatie naar bijna 100 installaties in ten minste 12 landen (Australië, België, Canada, Frankrijk, India, Ierland, Italië, Zuid-Afrika, Spanje, Thailand, Verenigd Koninkrijk, Verenigde Staten) .
        * gedeeltelijk om een belangrijke toevoeging in een geheel nieuwe richting te markeren:ERDDAP™nu heeft een data-inname systeem te gaan met de bestaande data server diensten (zie[EDDTableFromHttpGet](#eddtablefromhttpget)) ,
        * en deels omdat het geen grote sprong was van 1,82 naar 2,00 numeriek, dus dit leek de juiste tijd.
             
    * Het andere goede nieuws is dat er nu twee andere groepen zijn die code bijdragen aanERDDAP™  (in deze versie en met aanwijzingen zullen ze doorgaan) : Rob Fuller en Adam Leadbetter van het Ierse Marine Institute, en Roland Schweitzer van PMEL en Weathertop Consulting. Heel erg bedankt. Het is waar dat ze werken aan projecten van hun eigen keuze, maar dat is het klassieke open-source ontwikkelingsmodel - groepen dragen code bij voor de functies die ze het liefst zouden willen toegevoegd zien. Het toegevoegde voordeel voor de medewerkers: ze mogen de nieuwe functies gebruiken zodra ze klaar zijn; ze hoeven niet te wachten op de volgende release vanERDDAP. Uw fractie is ook welkom&#33; Zie[ERDDAP™Programmagids](/docs/contributing/programmer-guide).
         
    * We hopen dat je het leuk vindt.ERDDAP™v2.00. We kijken uit naar de volgende 10 jaarERDDAP™ontwikkeling en steeds meer gebruik over de hele wereld.
         
*    **Nieuwe functies en wijzigingen (voor gebruikers) :**   
     
    * NIEUW:orderByMeanfilter
voortabledapdatasets berekenen de middelen voor de gespecificeerde groepen. Ook alle van deorderByopties ondersteunen nu een extra manier om groepen te definiëren: _numeriekVariabel\\[/nummer\\[tijdEenheden\\]\\[:offset\\]\\]_, bijvoorbeeld, tijd/1/dag of diepte/10:5. Bijvoorbeeld,stationID,time,waterTemp&orderByMean ("stationID,tijd/1/dag") zou de resultaten sorteren opstationIDen tijd, dan berekenen en retourneren het gemiddelde van waterTemp voor elkestationIDvoor elke dag. Dit zijn opmerkelijk nuttige en krachtige nieuwe functies. De nieuwe code voor deze functies en de wijzigingen in de oude code werden door Rob Fuller en Adam Leadbetter van het Ierse Instituut voor de Zee ingediend en via Git ingediend. Dank je. Rob en Adam&#33;
         
    * NIEUW: type uitvoerbestand voor tabeldatasets:[.data Tabel](https://developers.google.com/chart/interactive/docs/reference#dataparam),
een JSON-bestand geformatteerd voor gebruik met deGoogle Visualizationclientbibliotheek (Google Charts) . De code hiervoor werd door Roland Schweitzer bijgeschreven en via Git ingediend. Dank je. Roland&#33;
         
    * NIEUW: type uitvoerbestand voor tabeldatasets:[.jsonlCSV1](https://jsonlines.org/examples/),
die als de bestaande.jsonlCSVoptie, maar met kolomnamen op de eerste regel. Dankzij Eugene Burger.
         
    * NIEUW: Als de beheerder het toelaat, kunnen gebruikers nu inloggen met hun[ORCID](https://orcid.org)rekening.
Het is een OAuth 2.0-authenticatiesysteem, net als Google-authenticatie. ORCID wordt veel gebruikt door onderzoekers om zich uniek te identificeren. ORCID-accounts zijn gratis en hebben niet de privacyproblemen die Google-accounts hebben. ZieERDDAP's[Orcid authenticatie-instructies](/docs/server-admin/additional-information#orcid). Met dank aan BCO-DOMO (Adam Shepard, Danie Kinkade, enz.) .
         
    * NIEUW: Een nieuwe URL-converter converteert verouderde URL's naar up-to-date URL's.
Zie .../erddap/convert/urls.html op alleERDDAP™installatie, bijvoorbeeld,
        [de link naar de converter in deERD ERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/convert/urls.html). Dit moet nuttig zijn voor gegevensbeheerders. Dit wordt ook intern gebruikt door GenerateDatasetsXml. Met dank aan Bob Simons en Sharon Mesick.
         
    * VERBETERD:[Tijdomvormer](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)nu heeft opties om een gemeenschappelijke string tijd om te zetten in een ISO8601 string tijd, of converteren van eenUDUNITS-zoals tijd eenheden string in een juisteUDUNITStijd eenheden string. Dit zou ook nuttig moeten zijn omERDDAP™beheerders die moeten weten welk formaat moet worden opgegeven voor het "units" attribuut voor stringtijdvariabelen. Dit wordt ook intern gebruikt door GenerateDatasetsXml en de standardizeWelke functie van EDDTableFromFiles. Dankzij Bob Simons.
         
    * NIEUW:[Units Converter](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)heeft een nieuwe "Standaard UDunits" optie.
Bijvoorbeeld, "deg\\_C/m" en "graden\\_C meters-1" worden beide omgezet in
"grade\\_C m-1." Deze functie wordt ook gebruikt door de standaardizeWelke functie van EDDTableFromFiles. Dankzij Bob Simons.
         
    * NIEUW: Voor grafieken (andere dan oppervlaktegrafieken) op griddap's entabledap's Make A Graph web pages, when the x as isn't a time as, when only a subset of the x as variable's range is visible, there are now knoppen beyond the graph to shift the X Axis leftwards or rightwards. Dankzij Carrie Wall Bell / het Hydrophone project.
         
    * NIEUW: Voor grafieken kan de X- en/of Y-as nu een logschaal gebruiken.
Gebruikers kunnen de Y-asschaal bedienen via een nieuwe drop-down widget op de griddap entabledapMaak een grafiek webpagina's. Zie[.xRange en . yRange documentatie](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#xRange). Dankzij Carrie Wall Bell / het Hydrophone project.
         
    * VERBETERD:ERDDAP™maakt nu beter gebruik van verschillende HTTP foutcodes en geeft nu een(OPeN)DAPv2.0-geformatteerde foutmelding lading. Zie[de details](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#Errors). Dankzij Antoine Queric en Aurelie Briand.
         
    * VERBETERD: Gebruik geen Netcdf-java/c of andere software tools om verbinding te maken met.ncof.hdfdoorERDDAP's /files/systeem alsof het lokale bestanden zijn.ERDDAP™Weigert nu deze verzoeken. Het is verschrikkelijk inefficiënt en veroorzaakt vaak andere problemen. In plaats daarvan:
        
        * Gebruik(OPeN)DAPclient software om verbinding mee te makenERDDAP'sDAPdiensten voor de dataset (die /griddap/ of /tabledap/ in de URL) . Dat is watDAPis voor en doet het zo goed.
        * Of gebruik het Data Access Form van de dataset om een subset van gegevens aan te vragen.
        * Of, als je het hele bestand nodig hebt of herhaalde toegang over een lange periode van tijd, gebruikcurl,wget, of uw browser om het hele bestand te downloaden, dan toegang tot de gegevens van uw lokale kopie van het bestand.
        
          
         
    * VERBETERD:ERDDAP™homepage, Full Text Search is nu boven "Bekijk een lijst van alle Datasets" omdat het het beste startpunt is voor de meeste gebruikers. Dankzij Didier Mallarino en Maurice Libes.
         
    * VERBETERD: Op DataProviderForm3.html er zijn nu dropdown lijsten van gemeenschappelijkestandard\\_names. Dankzij iemand op de IOOS DMAC vergadering.
         
    * VERBETERD: Op de /files/webpagina's is er nu een link naar de nieuwe "Wat kan ik doen met deze bestanden?" sectie van de /files/documentatie. Die sectie beschrijft verschillende bestandstypen en geeft suggesties voor hoe met hen te werken. Dankzij Maurice Libes.
         
    * VERBETERD: Bijna elk verzoek omERDDAP™zou op zijn minst een beetje sneller moeten zijn, en soms veel sneller.
         
    * BUG FIX: Onder bepaalde omstandigheden, wanneer een EDDTable dataset opgeslagen gegevens in sommige soorten van.ncbestanden, de globale "id" attribuut werd ingesteld op de voorgestelde naam van het bestand, die een hash bevat om het uniek te maken voor dat verzoek. Nu blijft "id" correct ongewijzigd (indien gespecificeerd) of ingesteld op de datasetdatasetID  (indien niet gespecificeerd) . Dankzij John Maurer.
         
*    **DingenERDDAP™Beheerders moeten weten en doen:**   
     
    * Deze release zal enige tijd duren en werken van u. Wees geduldig en plan op het nemen van een paar uur om de vereiste veranderingen te doen en een paar uur meer om te experimenteren met nieuwe functies.
         
    * DOEN: Maak voor de veiligheid een back-up van uw huidige setup.xml endatasets.xmlbestanden zodat u kunt terugkeren naar hen in het onwaarschijnlijke geval waar u moet terugkeren naarERDDAP™v1.82.
         
    * DOEN: De aanbevolenJavais nu AdoptOpenJDK's OpenJDK 8 (LTS) + HotSpot.
Dit is een open source variant vanJavazonder beperkingen voor het gebruik ervan (in tegenstelling totOracle'sJavadistributie) . Het is afgeleid vanOracle'sJavaop een continue manier, metOracleZijn zegen. Om veiligheidsredenen is het belangrijk om uwJavaversie up-to-date. ZieERDDAP's[Javainstallatie-instructies](/docs/server-admin/deploy-install#java).
         
    * TO DO: AdopteerOpenJDK'sJavaheeft een kleine toevoeging aan uw Tomcat installatie nodig: zie de[Resources Cache instructies](/docs/server-admin/deploy-install#contentxml). Ik denk dat dit een vervanging is voor de -XX:MaxPermSize instelling, die (Goedkeuring) OpenJDK ondersteunt niet meer.
         
    * DOEN: De nieuwe standaard en aan te bevelen&lt;lettertypeFamily&gt; instellen in setup.xml is
DejaVu Sans die zijn ingebouwd in AdoptOpenJDK'sJava. Zie
        [herziene installatie-instructies voor lettertype](/docs/server-admin/deploy-install#fonts).
         
    * TO DO: Veel tags bewegen van setup.xml naardatasets.xml. Het voordeel is dat je hun waarden kunt veranderen terwijlERDDAP™draait, zonder herstartERDDAP. Met name kunt u gemakkelijk veranderen&lt;startBodyHtml5&gt; om een tijdelijk bericht op deERDDAP™startpagina (Bijvoorbeeld: "Bekijk de nieuwe JPL MUR SST v4.1 dataset ..." of "ThisERDDAP™is offline voor onderhoud 2019-05-08T17:00:00 PDT tot 2019-05-08T20:00:00 PDT.") . Als/wanneer u deze tags wijzigt indatasets.xml, de veranderingen zullen de volgende keer van kracht wordenERDDAP™leestdatasets.xml.
         
        
        1. Kopieer deze inhoud naar uwdatasets.xmlbestand (in de buurt van het begin van het bestand, na&lt;erddapDatasets&gt;):
```
            <!-- The tags below are described in setupDatasetsXml.html.
                 The defaults listed below are as of ERDDAP™ v2.00. -->
            <cacheMinutes></cacheMinutes>                                     <!-- default=60 --> 
            <decompressedCacheMaxGB></decompressedCacheMaxGB>                 <!-- default=10 --> 
            <decompressedCacheMaxMinutesOld></decompressedCacheMaxMinutesOld> <!-- default=15 --> 
            <drawLandMask></drawLandMask>                                     <!-- "over" or "under" (default) -->
            <graphBackgroundColor></graphBackgroundColor>                     <!-- 0xAARRGGBB, default is 0xffccccff -->
            <loadDatasetsMinMinutes></loadDatasetsMinMinutes>                 <!-- usually=default=15 -->
            <loadDatasetsMaxMinutes></loadDatasetsMaxMinutes>                 <!-- default=60 -->
            <logLevel></logLevel> <!-- "warning" (fewest messages), "info" (default), or "all" (most messages) -->
            <nGridThreads></nGridThreads>                                     <!-- default=1 -->
            <nTableThreads></nTableThreads>                                   <!-- default=1 -->
            <partialRequestMaxBytes></partialRequestMaxBytes>                 <!-- default=490000000 -->
            <partialRequestMaxCells></partialRequestMaxCells>                 <!-- default=10000000 -->
            <slowDownTroubleMillis></slowDownTroubleMillis>                   <!-- default=1000 -->
            <unusualActivity></unusualActivity>                               <!-- default=10000 -->
            <!-- The defaults for the following tags are in messages.xml. -->
            <startHeadHtml5></startHeadHtml5>                                
            <startBodyHtml5></startBodyHtml5>                                 <!-- This is often customized. -->
            <theShortDescriptionHtml></theShortDescriptionHtml>               <!-- This is often customized. -->
            <endBodyHtml5></endBodyHtml5>
            <standardLicense></standardLicense>
            <standardContact></standardContact>
            <standardDataLicenses></standardDataLicenses>
            <standardDisclaimerOfEndorsement></standardDisclaimerOfEndorsement>
            <standardDisclaimerOfExternalLinks></standardDisclaimerOfExternalLinks>
            <standardGeneralDisclaimer></standardGeneralDisclaimer>
            <standardPrivacyPolicy></standardPrivacyPolicy>
```

        2. Eén voor één, kopieer de waarde (indien) voor elk van die tags van uw setup.xml bestand in de nieuwe tag die je net geplakt (boven) indatasets.xml. Bijvoorbeeld, als u had gebruikt een waarde van 30 voor&lt;cacheMinuten&gt; in setup.xml, moet u deze waarde kopiëren in de nieuwe&lt;cacheMinuten&gt; tag indatasets.xml  (Hoewel als de waarde hetzelfde is als de nieuwe standaard waarde, is het het beste om de tag indatasets.xmlleeg) .
            
Als uw waarde verschilt van de nieuwe voorgestelde standaard (behalve voor&lt;startBodyHtml5&gt; en&lt;de korte beschrijvingHtml&gt;, die nuttig zijn voor het aanpassen van uwERDDAP™installatie), overwegen om te schakelen naar de nieuwe standaard waarden. Dit geldt met name voor:&lt;gedeeltelijke aanvraagMaxBytes&gt; en&lt;partialRequestMaxCells&gt;, waar de standaard/aangehaalde waarde in de loop der jaren aanzienlijk is veranderd.
            
Nadat u elke waarde hebt gekopieerd, verwijdert u de tag en de beschrijving van setup.xml. Het is beter om deze tags indatasets.xml. En er zijn nu betere beschrijvingen in[setupDatasetsXml.html](/docs/server-admin/datasets#the-basic-structure-of-the-datasetsxml-file).
            
        
Een eigenaardigheid van het nieuwe systeem is dat de allereerste webpagina bij het opstartenERDDAPzal de standaard zijnERDDAP™webpagina. Elke volgende webpagina zal de ...Html inhoud die u specificeert indatasets.xml.
        
    * WAARSCHUWING: De eerste keer dat u draaitERDDAP™v2.0, datasets op basis van lokale gegevensbestanden laden **zeer** langzaam omdatERDDAP™moet zijn database van bestanden opnieuw in een iets ander formaat. Na de langzame eerste herlading, zullen ze snel laden, zoals voorheen. Wees geduldig.
         
#### EDDTableFromHttpGet{#eddtablefromhttpget} 
    *   [Grote NIEUWE KENMERKEN: EDDTableFromHttpGet](#eddtablefromhttpget)  
Tot nu toe,ERDDAP™lees gewoon gegevens en maakte het beschikbaar voor gebruikers. Nu,ERDDAP™beschikt over een eenvoudig, efficiënt systeem om real-time gegevens van sensoren in te nemen. Onder andere deze dataset biedt fijnkorrelige versiering: het herinnert zich elke wijziging in de dataset, toen het werd gemaakt, en door wie. Meestal willen gebruikers alleen de nieuwste versie van de dataset, met alle wijzigingen toegepast. Maar er is de optie voor gebruikers om gegevens op te vragen uit de dataset zoals het op elk moment was. Dit vergemakkelijkt reproduceerbaare wetenschap. In tegenstelling tot de meeste andere bijna-real-time datasets komen deze datasets dus in aanmerking voor[DOIs](https://en.wikipedia.org/wiki/Digital_object_identifier). omdat ze deDOIvereiste dat de gegevensverzameling ongewijzigd blijft, behalve door aggregatie. Zie[EDDTableFromHttpGet](/docs/server-admin/datasets#eddtablefromhttpget). Dankzij OOI (van lang geleden en nu) om te praten over de noodzaak van dit en Eugene Burger voor de herinnering aan het werken aan wat belangrijk is.
         
    * Grote NIEUWE KENMERKEN:ERDDAP™kan nu gegevens rechtstreeks uit extern gecomprimeerde gegevensbestanden, waaronder.tgz,.tar.gz,.tar.gzip,.gz,.gzip,.zip,.bz2, of .Z. Datasets kunnen een mix van extern gecomprimeerde bestanden bevatten (Misschien de oudere gegevensbestanden?) en niet-extern gecomprimeerde bestanden, en u kunt comprimeren / decomprimeren een bestand op elk moment.
        
Dit werkt geweldig&#33;
In de meeste gevallen is de vertraging in verband met het decomprimeren van de bestanden klein. We raden u sterk aan dit te proberen, met name voor datasets en/of gegevensbestanden die zelden worden gebruikt.
        
Dit kan je 30.000 dollar of meer besparen&#33;
Dit is een van de weinigeERDDAP™functies die u veel geld kunnen besparen -- als u veel gegevensbestanden comprimeert, hebt u veel minder RAID's/harde schijven nodig om de gegevens op te slaan, of omgekeerd kunt u veel meer gegevens serveren (tot 10x) Met de RAID's die je al hebt. Als deze functie bespaart u van het kopen van een andere RAID, dan heeft het u ongeveer $30.000.
        
Zie[Documentatie van extern gecomprimeerde bestanden](/docs/server-admin/datasets#externally-compressed-files). Dankzij Benoit Perrimond en Paloma de la Vallee.
        
    * Grote NIEUWE KENMERKEN: AllesEDDGridFromFiles en alle EDDTableFromFiles datasets ondersteunen een&lt;cacheFromUrl&gt;-tag en a&lt;cacheSizeGB&gt;-tag. Als cacheSizeGB niet is opgegeven, zal dit een volledige kopie van de bestanden van een dataset op afstand downloaden en onderhouden. Als cacheSizeGB is opgegeven en &gt;0, zal dit bestanden downloaden van de externe dataset, indien nodig, in een lokale cache met een beperkte grootte, wat nuttig is bij het werken met cloud-gebaseerde (bv. S3) gegevensbestanden. Zie[cache FromUrl documentatie](/docs/server-admin/datasets#cachefromurl)voor details. Dankzij Bob Simons en Roy Mendelssohn (die al jaren scripts schrijven om lokale kopieën van datasetbestanden op afstand te maken) , Lloyd Cotten, Eugene Burger, Conor Delaney (toen hij bij Amazon Web Services was) , en het Google Cloud Platform.
         
    * NIEUW: De nieuwe EDDTableFromJsonlCSV klasse kan tabelgegevens lezen van
        [JSON Lijnen CSV-bestanden](https://jsonlines.org/examples/)  ("Beter dan CSV") . Dankzij de mensen van het Instituut voor de Zee van Ierland voor het vertellen van mij over dit formaat en aan Eugene Burger en PMEL voor het verzoek om steun als een input type.
         
    * NIEUW: AlleEDDGriden alle EDDTableFromFiles datasets ondersteunen een&lt;nThreads&gt; instelling, die verteltERDDAP™hoeveel threads te gebruiken bij het beantwoorden van een verzoek. Zie[nThreads-documentatie](/docs/server-admin/datasets#nthreads)voor details. Met dank aan Rob Bochenek van Axiom Data Science, Eugene Burger, Conor Delaney (toen hij bij Amazon Web Services was) En Google Cloud Platform.
         
    * NIEUW standaardiseren Wat voor alle EDDTableFromFiles subklassen -
Voorheen, indien voor een gegeven variabele, de waarden van de belangrijke attributen (bv.scale\\_factor,add\\_offset,missing\\_value, \\_FillValue, eenheden) waren niet consistent, EDDtableFromFiles zou één waarde kiezen voor elk attribuut om "geldig" te zijn en bestanden te markeren met andere attribuutwaarden als "Bad Files." Nu is er een systeem om de bestanden te standaardiseren zodra EDDTableFromFiles de bestanden leest. Zie[EDDtableFromFile standaardiseren Wat?](/docs/server-admin/datasets#standardizewhat). Een van deERDDAP's belangrijkste doelen is om gegevensbestanden en datasets toegankelijk te maken op een consistente manier. standaardiseren Wat is een belangrijk nieuw instrument om dat te realiseren? Met dank aan Marco Alba, Margaret O'Brien (en andere EML-gebruikers) , BCO-DMO, en InPort gebruikers.
         
    * NIEUWE EDDTableFromInvalidCRAFiles kunt u een dataset van een verzameling vanNetCDF  (v3 of v4)  .ncbestanden die een specifieke, ongeldige variant van de CF DSG Contiguous Ragged Array gebruiken (CRA) dossiers. Voorbeeldbestanden voor dit datasettype zijn te vinden op https://data.nodc.noaa.gov/thredds/catalog/ncei/wod/  \\[2020-10-21 Deze server is nu niet meer betrouwbaar beschikbaar\\]. HoewelERDDAP™ondersteunt dit bestandstype, het is een ongeldig bestandstype dat niemand zou moeten gebruiken. Groepen die momenteel dit bestandstype gebruiken worden sterk aangemoedigd om te gebruikenERDDAP™om geldige CF DSG CRA bestanden te genereren en te stoppen met het gebruik van deze bestanden. Dankzij Ajay Krishnan en Tim Boyer.
         
    * EDDTableVanafthreddsFiles en EDDTableVanHyraxBestanden zijn nu verouderd. Ga naar EDDtableVanNcFiles (of een variant) plus&lt;cacheFromUrl&gt;. Als dat niet werkt om een of andere reden, e-mailerd.data at noaa.gov. Indien vóór 2020 geen klachten zijn ingediend, kunnen deze gegevenssets worden verwijderd.
         
    * VERBETERD Het systeem voor het automatisch omzetten van niet-ISO 8601 keer in ISO 8601 keer (geïntroduceerd in v1.82) is sterk uitgebreid om te gaan met een groot aantal extra formaten. Dit beïnvloedt GenerateDatasetsXml enERDDAPde verwerking van bronmetadata.
         
    * VERBETERD Met de derde grote herziening van het tijdleksysteem (en hopelijk de laatste) ,ERDDAP™niet meer gebruiktJava's DateTimeFormatter vanwege bugs die soms invloed hebben op extreme tijden (jaren&lt;=0000).ERDDAP™gebruikt nu zijn eigen systeem voor het ontleden van tijdreeksen.
         
    * WAARSCHUWING: Het nieuwe snarentijdontledingssysteem is wat strenger. Als een van uw datasets plotseling alleen waarden voor tijdwaarden mist, is de oorzaak vrijwel zeker dat de tijdformaat string iets fout is. Er moeten foutmeldingen in log zijn. txt gerelateerd aan tijdwaarden die niet overeenkomen met het tijdformaat -- dat zou je moeten helpen de tijdindeling voor die dataset te repareren. Als u hulp nodig hebt, gebruik dan de optie inERDDAP's Time Converter die "Convert\\[s\\]elke gewone tekenreekstijd in een ISO 8601 tekenreekstijd" -- het geeft het formaat aan dat de converter gebruikte om de brontekenreeks te verwerken.
         
    * AANBEVELING: De snelste, makkelijkste en goedkoopste manier om te versnellenERDDAP's toegang tot tabelgegevens is om de gegevensbestanden op een Solid State Drive (SSD) . De meeste tabeldatasets zijn relatief klein, dus een 1 of 2 TB SSD is waarschijnlijk voldoende om alle gegevensbestanden voor al uw tabeldatasets te bewaren. SSD is uiteindelijk uitgeput als je gegevens naar een cel schrijft, verwijdert en te vaak nieuwe gegevens naar die cel schrijft. In plaats daarvan raad ik aan dat (zoveel mogelijk) je gebruikt gewoon je SSD om de gegevens één keer te schrijven en vaak te lezen. Dan, zelfs een consument-grade SSD moet een zeer lange tijd duren, waarschijnlijk veel langer dan elke harde schijf Drive (HDD) . Consumentenklasse SSD's zijn nu goedkoop (in 2018, ~ $200 voor 1 TB of ~ $400 voor 2 TB) en de prijzen dalen nog steeds snel. WanneerERDDAP™toegang tot een gegevensbestand, een SSD biedt beide
        
        * kortere latentie (~0.1ms, versus ~3ms voor een HDD, versus ~10 (?) ms voor een RAID, versus ~55ms voor Amazon S3) en
        * hogere doorvoer (~500 MB/S, versus 75 MB/s voor een HDD versus 500 MB/s voor een RAID) .
        
Zodat je tot een ~10X prestatie boost (vs. HDD) Voor $200&#33; Vergeleken met de meeste andere mogelijke wijzigingen in uw systeem (Een nieuwe server voor $10.000? Een nieuwe RAID voor $35.000? Een nieuwe netwerkschakelaar voor $5000? enz.) , dit is veruit het beste rendement op investeringen (ROI) . Als uw server niet is geladen met geheugen, extra geheugen voor uw server is ook een geweldige en relatief goedkope manier om alle aspecten vanERDDAP.
        \\[SSD's zouden ook geweldig zijn voor gerasterde data, maar de meeste gerasterde datasets zijn veel groter, waardoor de SSD erg duur is.\\]  
         
    * NIEUW: Iedereen die ingelogd is krijgt een rol=\\[iedereenlogged In\\], zelfs als er geen&lt;gebruiker&gt; tag voor hen indatasets.xml. Als u dataset instellen&lt;toegankelijktot&gt;tot\\[iedereenlogged In\\], dan iedereen die is ingelogd bijERDDAP™  (bijvoorbeeld via hun Gmail- of Orcid-account) zal geautoriseerd zijn om toegang te krijgen tot de dataset, zelfs als u geen&lt;gebruiker&gt; tag voor hen indatasets.xml. Dankzij Maurice Libes.
         
    * VERBETERD:UDUNITS/UCUM units converter was uitgebreid verbeterd.
Het behandelt ongeldige eenheden strings beter (beginnend met de nadruk op het bewaren van informatie, in plaats van het handhaven van geldigheid) . Ook hebben de resultaten nu een gestandaardiseerde syntax.
         
    * NIEUW:UDUNITS/UCUM units converter heeft een nieuwe optie om eenUDUNITSkoord.
Dit werkt goed voor geldigUDUNITSstrings en redelijk goed voor niet-standaard / ongeldigUDUNITSsnaren. Bijvoorbeeld:UDUNITS="meters per seconde," "meter/seconde,""m.s^-1"en"m s-1"zal alle terug "m.s-1". Dit was nodig voor de nieuwe normalisatie Welk systeem hierboven beschreven. Met dank aan Marco Alba, Margaret O'Brien (en andere EML-gebruikers) , BCO-DMO, en InPort gebruikers.
         
    * NIEUW: EDDTableVanMultidimNcFiles heeft nu een[behandelde afmetingenAs](/docs/server-admin/datasets#treatdimensionsas)optie, dat verteltERDDAP™om bepaalde afmetingen te behandelen (b.v. LAT en LON) alsof het andere dimensies zijn (Bijvoorbeeld, TIME) . Dit is nuttig voor sommige onjuiste bestanden die verschillende dimensies gebruiken voor verschillende variabelen wanneer ze slechts één dimensie hadden moeten gebruiken (Bijvoorbeeld, TIME) . Dankzij Marco Alba en Maurice Libes.
         
    * NIEUW: Nu, allesEDDGridVan...Bestanden datasets ondersteunen een nieuwe speciale assourceNamewaarin staatERDDAP™om informatie uit het bestandsnaam te halen (gewoon bestandsnaam.ext) en gebruik de waarde om **vervangen** de bestaande waarde van de linkeras. Het formaat is
        \\*\\*\\*replaceFromFileName,_dataType_,_extractRegex_,_captureGroupNumber_
Zie[deze documentatie](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata). Met dank aan deNOAAPathfinder Dagelijkse aggregatie dataset.
         
    * NIEUW: Nu, allesEDDGridVan...Bestanden datasets ondersteunen een nieuwe speciale assourceNamewaarin staatERDDAP™om informatie uit het padnaam van het bestand te halen (mappen + bestandsnaam.ext)   
        \\*\\*\\*pathNaam,_dataType_,_extractRegex_,_captureGroupNumber_
Hiervoor gebruikt de padnaam altijd'/'als het map scheidingsteken, nooit '\\'.
Zie[deze documentatie](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata). Dankzij Paloma de la Vallee.
         
    * NIEUW: Nu, alle EDDTableVan... Bestanden datasets ondersteunen extra pseudo variabelesourceNames die informatie uit het bestandsnaam van het bestand halen (gewoon bestandsnaam.ext)   (zie[\\*\\*\\*bestandsnaam](/docs/server-admin/datasets#filename-sourcenames)) of van het volledige padnaam van het bestand (/dir1/dir2/filename.ext)   (zie[\\*\\*\\*pathNaam](/docs/server-admin/datasets#pathname-sourcenames)) . Dankzij Paloma de la Vallee.
         
    * NIEUW:EDDGriddataset heeft een of meer zeer grote afmetingen (b.v. miljoenen waarden) die nemen veel geheugen, kunt u de nieuwe [&lt;dimensiewaardenInGeheugen&gt;] (/docs/server-admin/datasets#dimensionvaluesinmemory) instellen op onwaar (de standaard is waar) , waardoor de dataset de waarden op schijf opslaat en ophaalt wanneer nodig. Dankzij David Rodriguez en Rich Signell (re:EDDGridVanAudioFiles) .
         
    * VOORBETERD: Eerder, als je dedataVariables voor een EDDTableFromFiles dataset en herlaadde de dataset, EDDTableFromFiles zou alle gegevensbestanden opnieuw lezen. Nu kan het omgaan met de herordening zonder alle gegevensbestanden opnieuw te lezen. Dankzij Roland Schweitzer.
         
    * VERBETERD: Nu, wanneerERDDAP™leest ASCII, NCCSV, en JSON Lines CSV tabelgegevensbestanden, als het vindt een fout op een bepaalde regel (bv. onjuist aantal items) , het logt een waarschuwingsbericht ("WARNING: Skipping line #..." "onverwacht aantal items...") aan de[log.txt-bestand](/docs/server-admin/additional-information#log)en dan de rest van het gegevensbestand blijft lezen. Dus, het is uw verantwoordelijkheid om regelmatig te kijken (of schrijf een script om dit te doen) voor dat bericht in het logboek. txt zodat u de problemen in de gegevensbestanden kunt oplossen.ERDDAP™is ingesteld op deze manier zodat gebruikers kunnen blijven lezen van alle beschikbare geldige gegevens, hoewel sommige regels van het bestand gebreken hebben. Wat voorafging:ERDDAP™gemarkeerd als "slecht" en verwijderd uit de dataset.
         
    * VERBETERD: Wanneer precieze tijden (bv. naar de dichtstbijzijnde seconde of milliseconde) worden opgeslagen bij de bron als "minuten sinds ..." (of grotere eenheden) ,ERDDAP™rond ze nu tot de dichtstbijzijnde milliseconde bij het lezen van de waarden inERDDAP. Anders worden de zwevende puntnummers gekneusd en verzoeken om gegevens op specifieke tijdstippen (Bijvoorbeeld, &time=2018-06-15T01:30:00) zal falen. Voorheen heeft het ze zo nauwkeurig mogelijk berekend. (en nog steeds doet als de eenheden b.v., "seconden sinds ..." of "milliseconden sinds ...") . Het is het beste om dit probleem te voorkomen door het niet gebruiken van grote eenheden (bv. minuten of uren) om precieze tijdwaarden op te slaan (bv. microseconden) -- computers werken slecht met decimale cijfers. Dankzij Marco Alba.
         
    * VERANDERINGEN IN EDDTabel VANEDDGridWat het veel beter maakt. EDDTabelVanEDDGridlaat gebruikers gerasterde datasets opvragen alsof het tabeldatasets zijn ("query by value") .
        
        * Het steunt nu een&lt;maxAxis0&gt;-tag (standaard=10) waarin het maximale aantal assen wordt gespecificeerd\\[0\\]  (meestal"time") waarden die onmiddellijk kunnen worden gevraagd. Dit voorkomt dat naïeve verzoeken EDDTableVanEDDGridom door een hele gerasterde dataset te zoeken (wat zou falen met een timeout-fout) .
        * GenererenDatasets Xml heeft nu een optie om EDDTableFrom te genererenEDDGriddatasets voor alle gerasterde datasets in een gegevenERDDAP™die overeenkomen met een opgegeven regex (.\\* gebruiken om alle datasets te vergelijken) . De datasets die het creëert hebben aanvullende informatie in de samenvatting attribuut waaruit blijkt dat dit een tabel versie van een gerasterde dataset. En hundatasetIDis dedatasetIDvan de gerasterde dataset, plus "\\_AsAtable."
        * Er is een grote snelheid voor de meest voorkomende setup: wanneer de gridded dataset is eenEDDGridFromErdap dataset die in dezelfde staatERDDAP.
        
Dankzij James Gallagher en Ed Armstrong.
         
    * NIEUW: genereren Datasets Xml voor alle soorten datasets is nu veel meer kans om een \\_FillValue ofmissing\\_valueattribuut aan een numerieke variabeleaddAttributes. Bijvoorbeeld, dit gebeurt wanneer string ontbrekende waarde markers (Bijvoorbeeld, "," "," "?", "NA," "nd," "NAN") voor die variabele in het steekproefbestand wordt omgezet naarERDDAP's inheemse ontbrekende waarden (127 in byte kolommen, 32767 in korte kolommen, 2147483647 in de kolommen, 9223372036854775807 in lange kolommen en NaN in zwevende en dubbele variabelen) . Het treedt ook op voor NaN-waarden in zwevende en dubbele variabelen. Ook werd "nd" toegevoegd aan de lijst van gemeenschappelijke ontbrekende waardemarkeringen in numerieke gegevens kolommen dieERDDAP™Moet zoeken. Dankzij Matt Biddle van BCO-DMO.
         
    * VERBETERD: de nudump optie in generation Datasets Xml lijkt nu meer op nudump (maar gebruikt nog steeds de netcdf-java versie van nudump) . Het drukt een nieuwe lijst met opties af. Nu, voor.ncml bestanden, het drukt de nudump uitvoer voor het resultaat van de.ncml bestandswijzigingen toegepast op de onderliggende.ncof.hdfbestand.
         
    * BUG FIX: Er was een file handle lek (uiteindelijkERDDAP™te bevriezen) veroorzaakt bij het aanmaken van bepaalde soorten uitvoerbestanden, bijvoorbeeld .geotif, met name wanneer er fouten zijn opgetreden tijdens het aanmaken. Ik denk/hoop dat dit nu opgelost is. Als je nog steeds problemen ziet, vertel me dan het type dataset (raster of tabel) en het type bestand dat het probleem veroorzaakt. Dankzij Steven Beale, Lynn DeWitt, Jibei Zhao en anderen.
         
    * BUG FIX: DeWMS Leafletdemo heeft de "diepte" as niet volledig/juist omgezet in "hoogte." Nu wel, en de gebroken legendeverzoeken zijn opgelost. Ook alle asopties in de drop-down lijsten zijn altijd in oplopende gesorteerde volgorde. Dankzij Antoine Queric en Aurelie Briand.
         
    * BUG FIX: EDDTableFromFiles ondersteunt nu correct beperkingen op String variabelen die zijn gemaakt uit char variabelen in de gegevensbestanden. Dankzij Antoine Queric en Aurelie Briand.
         
    * BUG FIX: Nu, wanneer een dataset niet beschikbaar is, probeert de dataset (met het bericht "Deze dataset is momenteel niet beschikbaar.") haar abonnees, beursgenoteerde acties, rss, en lonPM180 datasets die erop vertrouwen. Dankzij Roy Mendelssohn en Bob Simons.
         
    * BUG FIX: Twee bugs gerelateerd aan EDDTableCopy. Dankzij Sam McClatchie.
         
    * VERBETERD: Het aantal mislukte verzoeken weergegeven op de status.html pagina zal toenemen omdat meer dingen worden geteld als mislukkingen dan voorheen.
         
    * VERBETERD:ERDDAP's status.html toont nu "Requests (mediane tijden in ms) " in de tijdreeks. Voorheen toonde het mediane maal afgekapt tot integer seconden.
         
    * VERBETERD: In de jsonld uitvoer komt de jsonld "name" nu uit de dataset"title"inERDDAP, en de jsonld "headline" komt nu van de dataset "datasetID" inERDDAP. Eerder was het omgekeerd. Dit lijkt mij verkeerd want in normaal Engels gebruik, "naam" is meestal een korte, (ideaal) unieke identificatiecode die zelden/nooit verandert (bv. Robert Middlename Simons) , geen beschrijving die niet uniek is en die gemakkelijk en vaak kan veranderen ("Een man die software schrijft voorNOAA" vs. "Een lange man die software schrijft voorNOAA") . Goh, het zou geweldig zijn als de schema.org definitie van[Naam](https://schema.org/name), in het kader van een Dataset, waren specifieker. Software-ontwikkelaars moeten een implementatie van een specificatie kunnen schrijven op basis van de specificatie alleen, zonder begeleiding van deskundigen. Maar ik ga naar Google (met name Natasha Noy) , NCII (met name John Relph) En Rob Fuller.
         
    * VERBETERD: In de jsonld uitgang zijn de vier "spatialCoverage GeoShape box" waarden nu minLat minLon maxLat maxLon. Voorheen werden de posities van lat en lon omgekeerd. Goh, het zou geweldig zijn als de schema.org definitie van[GeoShape](https://schema.org/GeoShape)geeft de juiste volgorde aan. Software-ontwikkelaars moeten een implementatie van een specificatie kunnen schrijven op basis van de specificatie alleen, zonder begeleiding van deskundigen. Dankzij Natasha Noy en Rob Fuller.

## Versie 1.82{#version-182} 
 (vrijgegeven 2018-01-26) 

*    **Nieuwe functies (voor gebruikers) :**   
     
    * Talrijke subtiele veranderingen in het uiterlijk en gevoel vanERDDAP™Webpagina's.
        * VERBETERD:ERDDAP™maakt nu gebruik van HTML 5 en maakt beter gebruik van CSS.
        * VERBETERD: De webpagina's zijn enigszins aangepast om ze schoner en minder "druk" te maken. (Ze zijn nog steeds dicht en er zijn nog steeds dingen waar je over kunt klagen, maar hopelijk veel minder dan voorheen.) Met dank aan John Kerfoot voor enkele opmerkingen.
        * VERBETERD: De webpagina's zien er nu veel beter uit op mobiele telefoons en andere kleine apparaten, vooral als je ze gebruikt in landschapsoriëntatie. Ze zien er ook beter uit in zeer kleine en zeer grote vensters in desktop browsers.
        * VERBETERD: Om de veiligheid en andere redenen te verbeteren, het gebruik van een verouderde Openlayers versie voor deWMSDe demonstratiepagina's zijn vervangen doorLeaflet.
        * NIEUW: ondersteuning voor previews van afbeeldingen, audio en videobestanden in de"files"systeem (bijvoorbeeld,[deze testgegevensset](https://coastwatch.pfeg.noaa.gov/erddap/files/testMediaFiles/ShouldWork/)) en in.htmlTablereacties wanneer een cel de URL van een afbeelding, audio of videobestand heeft (bijvoorbeeld,[dit verzoek](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/testMediaFiles.htmlTable?url%2Cname%2ClastModified%2Csize%2CfileType%26url=~%22.*ShouldWork.*%22)) . Als je zweeft over een '?' pictogram, moet je een afbeelding, audio, of videobestand preview zien. U kunt ook klikken op de bestandslink om het volledige scherm van het bestand in uw browser te bekijken. Zie[Documentatie van mediabestanden](/docs/server-admin/datasets#media-files). Merk op dat verschillende browsers verschillende bestandstypen ondersteunen, zodat de voorbeelden misschien niet werken in uw browser.
Dankzij deze mensen/links voor ideeën en voorbeeldcode voor CSS-only image tooltips (was op https://codepen.io/electricalbah/pen/eJRLVd ) en uitgesteld laden van afbeelding (was op https://varvy.com/pagespeed/defer-images.html )   (Hoewel de code werd gewijzigd voor gebruik inERDDAP) .
Dankzij Cara Wilson, Matthew Austin en Adam Shepherd/BCO-DOMO voor verzoeken om beeldondersteuning.
Dankzij Jim Potemra, Rich Signell, OOI, en Carrie Wall Bell voor verzoeken voor audio/hydrophone bestand ondersteuning.
Dankzij OOI voor het tonen van de behoefte aan video-ondersteuning.
        * NIEUW: Een deelverzameling van gegevens van alleERDDAP™dataset (maar meestal een dataset van audiobestanden) kan nu opgeslagen worden in een .wav audiobestand. ([documentatie](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#wav)) Dankzij Jim Potemra, Rich Signell, OOI, en Carrie Wall Bell voor verzoeken voor audio/hydrophone bestand ondersteuning.
        * VERBETERD: Het formaat voor de Web Toegankelijke Mappen (WAF)   (bv. de /files/mappen) is bijgewerkt om een HTML-tabel te gebruiken. Het nieuwe formaat bootst de meer recente versie na van de map met webpagina's die zijn gemaakt door recentere versies van Apache. Mensen zullen merken dat de veranderingen de informatie gemakkelijker maken om te lezen. Software die deze documenten ontleedt (b.v. software die ISO 19115 documenten oogst vanERDDAP) zal moeten worden herzien, maar het nieuwe formaat zal gemakkelijker te verwerken zijn dan het vorige formaat. (Attentie, Anna Milan.) 
        * NIEUWoutOfDateDatasets.htmlblz. ([voorbeeld](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html)) Deze webpagina toont een tabel met alle bijna-real-time datasets die een&lt;testOutOfDate&gt; tag (zie hieronder) , gerangschikt naar hoe verouderd de datasets zijn. Dit dashboard moet nuttig zijn voorERDDAP™beheerders en eindgebruikers wanneer ze willen weten welke datasets verouderd zijn. Voor verouderde datasets is er waarschijnlijk een probleem met de gegevensbron, zodatERDDAP™kan geen gegevens van recentere tijdpunten zien/verkrijgen.
Administrators: Als u geen Out-Of-Date Datasets webpagina wilt, voeg dit dan toe aan uw setup.xml:
            &lt;outOfDateDatasetsActive&gt;false&lt;/outOfDateDatasetsActive&gt;
Nu wel.testOutOfDateen uit VanDatum kolommen in deallDatasetsdataset.
Dankzij Bob Simons, die dit al jaren wil, en de slimme mensen van het Ierse Instituut voor de Marine, die mij de inspiratie gaven via hun toegewijde Raspberry Pi en monitor die altijd een scherm als dit in hun kantoor laat zien.
        * VERBETERD:.htmlTableen.xhtmlDe respons is nu beter geformatteerd, compacter en dus sneller geladen. Dankzij HTML5 en CSS.
    * NIEUWE uitvoer bestandstype voor griddap datasets: .timeGaps. Het toont een lijst van lacunes in de tijdwaarden die groter zijn dan de mediane kloof. ([voorbeeld](https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMHchla8day.timeGaps)) Dit is nuttig voorERDDAP™beheerders en eindgebruikers wanneer ze willen weten of er onverwachte gaten zijn in de tijdwaarden voor een dataset die naar verwachting regelmatig tijdswaarden zullen hebben. Dankzij Bob Simons en Roy Mendelssohn die deze functie nodig had.
    * VERBETERD: De standaard grafiek voor deallDatasetsdataset is nu een kaart met x=maxLon en y=maxLat. Dankzij John Kerfoot, Rich Signell en OOI-CI.
    * NIEUW:[erddapy](https://github.com/ioos/erddapy)-- is geenERDDAP™functie, maar zal van belang zijn voor velenERDDAP™gebruikers. Erddapy (ERDDAP™+Python) is aPythonbibliotheek gemaakt door Filipe Fernandes die "het voordeel vanERDDAP'sRESTfulwebdiensten en creëert deERDDAP™URL voor elk verzoek zoals zoeken naar datasets, het verwerven van metagegevens, het downloaden van gegevens, enz." Dankzij Filipe Fernandes.
    * Ik had eerder moeten vermelden: Er is een derde partij R pakket ontworpen om het gemakkelijker te maken om te werken metERDDAP™van binnen R:[rerdap](https://github.com/ropensci/rerddap#rerddap). Dankzij[OpenSci](https://ropensci.org/)En Roy Mendelssohn.
         
*    **DingenERDDAP™Beheerders moeten weten en doen:**   
     
    * TO DO: In setup.xml, rechtsonder&lt;adminInstitution&gt;, voeg een&lt;adminInstitutionUrl&gt;-tag die een URL voor uw instelling specificeert (of groep) .
    * TO DO: Deze 3 tags in setup.xml worden niet meer gebruikt:
        &lt;start HeadHtml&gt;,&lt;startBodyHtml&gt; en&lt;endBodyHtml&gt;. Zij worden vervangen door:
        &lt;startHeadHtml5&gt;,&lt;startBodyHtml5&gt; en&lt;endBodyHtml5&gt;, met standaardwaarden gespecificeerd in messages.xml (en hieronder getoond) .
        
Wij raden het gebruik van de standaard&lt;startHeadHtml5&gt; en&lt;endBodyHtml5&gt;.
Wij raden aan: Als u wijzigingen heeft aangebracht in het origineel&lt;startBodyHtml&gt; en/of wil uwERDDAP™Nu, kopieer de nieuwe&lt;startBodyHtml5&gt;-tag (van onder) in uw setup.xml en wijzigen om uwERDDAP™zodatERDDAP's Webpagina's weerspiegelen uw organisatie, nietNOAA ERD. Met name, verander de "Bried to you by" in uw organisatie (s) . Als je hulp nodig hebt, mail danerd.data at noaa.gov. (Als u niet wilt aanpassen uwERDDAP™nu, gebruik de standaard&lt;startBodyHtml5&gt;.)
        
Verwijder vervolgens de 3 oude tags in uw setup.xml die niet meer worden gebruikt.

```
        <startBodyHtml5><!\\[CDATA\\[ 
        <body>
        <table class="compact nowrap" style="width:100%; background-color:#128CB5;"> 
          <tr> 
            <td style="text-align:center; width:80px;"><a rel="bookmark"
              href="https://www.noaa.gov/"><img 
              title="National Oceanic and Atmospheric Administration" 
              src="&erddapUrl;/images/noaab.png" alt="NOAA"
              style="vertical-align:middle;"></a></td> 
            <td style="text-align:left; font-size:x-large; color:#FFFFFF; ">
              <strong>ERDDAP</strong>
              <br><small><small><small>Easier access to scientific data</small></small></small>
              </td> 
            <td style="text-align:right; font-size:small;"> 
              &loginInfo; &nbsp; &nbsp;
              <br>Brought to you by 
              <a title="National Oceanic and Atmospheric Administration" rel="bookmark"
              href="https://www.noaa.gov">NOAA</a>  
              <a title="National Marine Fisheries Service" rel="bookmark"
              href="https://www.fisheries.noaa.gov">NMFS</a>  
              <a title="Southwest Fisheries Science Center" rel="bookmark"
              href="https://www.fisheries.noaa.gov/about/southwest-fisheries-science-center">SWFSC</a> 
              <a title="Environmental Research Division" rel="bookmark"
              href="https://www.fisheries.noaa.gov/about/environmental-research-division-southwest-fisheries-science-center">ERD</a>  
              &nbsp; &nbsp;
              </td> 
          </tr> 
        </table>
        \\]\\]></startBodyHtml5>
```

Er zijn extra manieren waarop je[aanpassenERDDAP™](/docs/server-admin/deploy-install#customize)dusERDDAP's webpagina's weerspiegelen uw organisatie in plaats vanNOAA ERD.
        
    * TO DO: De&lt;EDDGrid...Voorbeeld&gt; tags (beginnen met&lt;EDDGridIdExample&gt;) en de&lt;EDDtabel... Voorbeeld&gt; tags (beginnen met&lt;EDDTableIdExample&gt;) in uw setup.xml bestand worden gebruikt om voorbeelden te maken in de griddap entabledapdocumentatie. html webpagina's in uwERDDAP.
        
Als u deze tags niet hebt aangepast, verwijder ze dan uit uw setup.xml bestand. Nu hebben ze allemaal standaards in messages.xml die verwijzen naar datasets in Bob'sERDDAP™op https://coastwatch.pfeg.noaa.gov/erddap/index.html . U hoeft dus geen specifieke datasets meer in uwERDDAP. Als u de standaardinstellingen wilt overschrijven, kopieer dan enkele of al die tags in uw setup.xml en wijzig hun waarden.
Als u wilt dat de voorbeelden naar uwERDDAP™De eenvoudigste methode is:
        
        1. Neem deze twee datasets in uwERDDAP™door dit toe te voegen aan uwdatasets.xml:
```
            <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>
            </dataset>
            <dataset type="EDDTableFromErddap" datasetID="pmelTaoDySst" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst</sourceUrl>
            </dataset>
```

        2. Voeg deze tag toe aan je setup.xml, maar wijzig de URL naar jeERDDAP's (https?) URL:
```
            <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
            <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```
        
Als u deze tags hebt aangepast, laat ze dan zoals ze zijn en voeg deze 2 nieuwe tags toe aan uw setup.xml om deERDDAP™URL voor deze datasets, maar wijzig de URL naar uwERDDAP's (https?) URL:
```
        <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
        <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```

    * DOEN:ERDDAP™gebruikt nu een css bestand genaamd erddap2.css. Als u wijzigingen heeft aangebracht in\\[kat\\]/webapps/erddap/images/erddap.css, overwegen om soortgelijke wijzigingen aan erddap2.css (in dezelfde map) .
    * NIEUW:ERDDAP's webpagina's hebben nu een groot aantal bijna onzichtbare interne links (de tekst is zwart en niet onderstreept) . Als je over een van deze links zweeft (gewoonlijk de eerste paar woorden van rubrieken en paragrafen) , de cursor wordt een hand. Als u op de link klikt, is de URL de interne link naar die sectie van het document. Dit maakt het gemakkelijk om naar specifieke delen van de documentatie te verwijzen. Dankzij Bob Simons, die dit al jaren wil.
    * NIEUW:ERDDAP™nu ondersteunt[Bytebereik / Aanvaarden-Ranges](https://en.wikipedia.org/wiki/Byte_serving)verzoeken om delen van /files/bestanden. Dit was nodig om de audio- en video-viewers in browsers te ondersteunen.
    * DOEN: Nu, om de beveiliging te verbeteren, als u opgegeven&lt;baseHttpsUrl&gt; in setup.xml (en dus steunhttps) , de aanbevolen vlag Url is eenhttpsURL met een veiligere vlagKey. Als dat zo is, zal een vorige vlagUrls/flagKeys ongeldig worden. Beheerders: Als deze wijzigingen van toepassing zijn op uwERDDAP™en als uwERDDAP™heeftEDDGridFromErdap and EDDTable FromErdap's die zich abonneren op remoteERDDAPs, dan, nadat je bijgewerktERDDAP,ERDDAP™zal automatisch proberen te abonneren op de nieuwe vlagUrl, dus u moet de oude abonnementen verwijderen en de nieuwe abonnementen valideren wanneer u de nieuwe abonnement validatie e-mails.
    * Te doen: als uwERDDAP™heeftEDDGridFromErdap datasets voor erdVH3-datasets op Bob's kustwachtERDDAP™, verander ze om te verwijzen naar de nieuwe erdVH2018 datasets.
    * DOEN: Als u een van de jplAquariusSSS sample datasets in uwERDDAP™, gelieve "V4" in dedatasetIDV5.
    * DOEN:actual\\_rangeis nu een CF standaard attribuut (vanaf CF-1.7) en zegt duidelijk dat als de variabele gebruiktadd\\_offseten/ofscale\\_factorom de gegevenswaarden te verpakken, dan deactual\\_rangewaarden moeten het uitgepakte gegevenstype gebruiken en uitgepakte waarden zijn. Helaas botst dit met ons eerdere advies. GenererenDatasets Xml pakt nu uitactual\\_rangewaarden, maar dat zal niet repareren bestaande datasets in uwdatasets.xmlbestand.
        
Controleer dus uw datasets: als de waarden van een variabele zijn verpakt en alsactual\\_rangeis gespecificeerd als verpakte gegevens waarden, voeg een&lt;addAttributes&gt;actual\\_rangewaarde om de uitgepakte waarden te specificeren. Anders wordt de dataset niet geladen inERDDAP. Een eenvoudige en bijna perfecte manier om dit te doen is om uwdatasets.xmlvoor bron Attributen die
```
        <att name="actual\\_range" type="shortList">  
        or <att name="actual\\_range" type="intList">  
```
en ascale\\_factorandere dan 1,0. Dat zijn deactual\\_rangeAttributen die je misschien moet repareren.
        
Voor asvariabelen inEDDGriddatasets,ERDDAP™zet altijd deactual\\_rangeattribuut om het werkelijke bereik van de waarden te zijn aangezien het deze waarden kent.
        
Voor asvariabelen met dalende waarden (b.v. enkele breedtegraden) ,ERDDAP™aangemaaktactual\\_rangemet de\\[0\\]...\\[laatste\\]waarden, die hoog waren... laag. Nu gebruikt het altijd lage ... hoge waarden om de nieuwe CF definitie te maken.
        
De juistheid van deactual\\_rangewaarden is vooral belangrijk voor EDDTable datasets, omdatERDDAP™zal snel weigeren gebruikers verzoeken voor gegevens waarden die lager zijn dan deactual\\_rangeminimumwaarde of die groter zijn dan deactual\\_rangemaximumwaarde.
        
Gerelateerd: de werkelijke\\_min, werkelijke\\_max,data\\_minendata\\_maxattributen zijn nu verouderd. Zet uw datasets te gebruikenactual\\_rangeIn plaats daarvan.
        
    * DOEN (facultatief, maar aanbevolen) : Voor elke bijna-real-time en voorspelling dataset in uwERDDAP™, voeg een [&lt;testOutOfDate&gt;] (/docs/server-admin/datasets#testoutofdate) tag met een waarde in het formuliernow-_nUnits_, bv.now-2 dagen. Als de maximale tijdswaarde voor de dataset ouder is dan die waarde, wordt de dataset als verouderd beschouwd en als zodanig gemarkeerd op de dataset.[outOfDateDatasets.html](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html)webpagina. Dit biedt een gemakkelijke manier om te zien wanneer er iets mis is met de bron van een dataset.
    *   [NIEUW: Semantische markering van Datasets met json-ld (JSON Gekoppelde gegevens) ](/docs/server-admin/additional-information#json-ld)  
        ERDDAP™nu gebruikt[json-ld (JSON Gekoppelde gegevens) ](https://json-ld.org)om uw data catalogus en datasets deel te maken van de[semantisch web](https://en.wikipedia.org/wiki/Semantic_Web), dat is Tim Berners-Lee's idee om web inhoud meer machineleesbaar en machine "begrijpelijk" te maken. Zoekmachines ([Google in het bijzonder](https://developers.google.com/search/docs/data-types/datasets)) en andere semantische tools kunnen deze gestructureerde markup gebruiken om ontdekking en indexering te vergemakkelijken. De json-ld gestructureerde markering lijkt onzichtbaar voor mensen.&lt;script&gt; code op de http://.../erddap/info/index.html webpagina (wat een semantisch web is[DataCatalog](https://schema.org/DataCatalog)) en op elk http://.../erddap/info/_datasetID_/index.html webpagina (wat een semantisch web is[Dataset](https://schema.org/Dataset)) . (Speciale dank aan Adam Leadbetter en Rob Fuller van het Instituut voor de Zee in Ierland voor het doen van de harde delen van het werk om dit deel vanERDDAP.) 
    * NIEUW: Er zijn nieuwe datasets die gegevens van audiobestanden kunnen lezen:
        [EDDGridVanAudioFiles](/docs/server-admin/datasets#eddfromaudiofiles), die audio data behandelt als gerasterde data.
        [EDDtableFromAudioFiles](/docs/server-admin/datasets#eddfromaudiofiles), die audiogegevens behandelt als tabelgegevens. Dankzij Jim Potemra, Rich Signell, OOI, en Carrie Wall Bell voor verzoeken voor audio/hydrophone bestand ondersteuning.
    * Wijzigingen in GenererenDatasets Xml (en daarmee verband houdende wijzigingen) :
        * NIEUW:ERDDAP™heeft nu een systeem om automatisch[verouderde URL's bijwerken](/docs/server-admin/additional-information#out-of-date-urls)beide in GenerateDatasets Xml en bij het laden van datasets. Als u suggesties voor extra URL's die moeten worden gevangen en bijgewerkt, of als u denkt dat dit moet worden omgezet in een dienst (zoals de converters) , e-mailerd.data at noaa.gov.
        * NIEUW: Nu, als GenererenDatasets Xml ziet een CFstandard\\_name  (wat alle kleine letters moet zijn) met een hoofdletter, voegt het alle kleine letters versie aan&lt;addAttributes&gt;. Ook wanneer een dataset laadt, alsERDDAP™ziet een CFstandard\\_namemet een hoofdletter, verandert het stil naar destandard\\_name. Dankzij Rich Signell.
        * NIEUW: Nu, als GenererenDatasets Xml ziet een attribuut met een tijd die niet in ISO 8601 formaat, het voegt de ISO 8601 geformatteerde tijd aan&lt;addAttributes&gt;. AlsERDDAP™herkent het formaat niet, het laat de tijdswaarde ongewijzigd. Als je een formaat ziet datERDDAP™herkent en herstelt niet, e-mail het naarerd.data at noaa.gov.
        * VERBETERD: de code van het lage niveau voor deEDDGridVan Thredds Catalogus optie in GenererenDatasets Xml is nu afhankelijk van deUnidatanetcdf-java catalogus crawler code (Thredds. catalogusklassen) zodat het alle THREDDS-catalogi kan verwerken (wat verrassend complex kan zijn) . Met dank aan Roland Schweitzer voor het voorstellen van deze verandering en dank aanUnidatavoor de code.
        * NIEUW: GenererenDatasets Xml voorEDDGridFromDap voegt nu ", startYear-EndYear" toe aan het einde van de titel op basis van werkelijke tijdaswaarden. EndYear="present" als er gegevens bestaan in de laatste 150 dagen.
        * NIEUW: GenererenDatasets Xml voorEDDGridFromDap voegt nu ",\\[resolutie\\]°" naar de titel als de dataset gelijkmatig verdeeld is en hetzelfde voor lat en lon.
        * VERBETERD: De tijd converter heeft nu extra functies, met name de mogelijkheid om string times in een breed scala van gemeenschappelijke formaten om te zetten in ISO 8601 strings of in een UDUnits-compatibel nummer. Alle eerder ondersteunde functies blijven werken, ongewijzigd.
        * BUG FIX: GenererenDatasets Xml en de Keywords converter bevatten nu "Earth Science &gt; " aan het begin van GCMD Science Keywords. Wanneer een dataset geladen isERDDAP™,ERDDAP™repareert nu alle GCMD trefwoorden in de trefwoorden attribuut die niet beginnen met "Earth Science &gt; " of die iets anders dan titel geval gebruiken (waarbij de eerste letter van elk woord wordt gekapitaliseerd) .
        * VERBETERD: Wanneer voorstellen&lt;destinationName&gt;'s, GenererenDatasets Xml voor EDDTableFromAsciiFiles heeft net het staarteinde vansourceNames met'/'  (sommige waren bestandsnaam-achtig) . Nu gebruikt het de helesourceName(bv. "blahblahblah (m/s) ." Deze verandering zal goed zijn voor sommige datasets en niet voor anderen, maar het is veiliger gedrag. Dankzij Maurice Libes.
        * BUG FIX: GenererenDatasets Xml en de dataset constructors zorgen er nu voor dat er geen dubbele kolomnamen zijn. Dankzij Maurice Libes.
        * BUG FIX: GenererenDatasets Xml voor EDDTableFromAsciiFiles schreef niet&lt;kolomSeparator&gt; naar de uitvoer. Nu wel. Dankzij Maurice Libes.
    * NIEUW: De tool DasDds print nu tijd gap informatie (de[.timeGaps-informatie](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#timeGaps)) als de dataset een gerasterde dataset is.
    * NIEUW: Geavanceerd zoeken accepteert nu "nu_\\-nUnits_" tijdwaarden. Dankzij Rich Signell.
    * VERBETERD: Om de beveiliging te verbeteren, wanneer een e-mailadres in de metagegevens of gegevens van een dataset wordt geschreven naar een html-webpagina, wordt het "@" vervangen door " op ". Dit vangt alleen e-mailadressen die de volledige metadata of gegevenswaarde zijn, niet e-mailadressen die zijn ingebed in langere waarden.
    * VERBETERD: Om de veiligheid te verhogen,RSSinformatie voor private datasets is nu alleen beschikbaar voor gebruikers (enRSSlezers) die zijn ingelogd en gemachtigd om die dataset te gebruiken.
    * NIEUW: Nu, wanneer een dataset geladen is, alsdate\\_created,date\\_issued,date\\_modified, of date\\_metadata\\_modified attribuut heeft een tijdswaarde die niet in ISO 8601 formaat is,ERDDAP™wijzigt het naar de ISO 8601 geformatteerde tijd. AlsERDDAP™herkent het formaat niet, het laat de tijdswaarde ongewijzigd. Als je een formaat ziet datERDDAP™herkent en herstelt niet, e-mail het naarerd.data at noaa.gov.
    * VERBETERD:EDDGriddatasets zouden nu aanzienlijk sneller moeten zijn. Dankzij Rich Signell.
    * Wijzigingen in verband metERDDAP's creatie van ISO 19115 documenten:
        * BUG FIX: bij het maken van ISO 19115-documenten,dataVariableeenheden waren niet HTML Attribuut gecodeerd en procent gecodeerd. Nu wel. Dankzij de ISO 19115 validator van NGDC.
        * BUG FIX: bij het maken van ISO 19115-documenten,date\\_createdwerd gebruikt zoals is, zo vaak was het verkeerde formaat. Nu wordt het omgezet naar ISO 8601 Z string. Dankzij de ISO 19115 validator van NGDC.
        * BUG FIX: bij het maken van ISO 19115-documenten,ERDDAP™nu langere schrijft data met jaar=0000 (zoals met klimatologie datasets) , omdat het ISO 19115 schema geen data toestaat met jaar=0000. Dankzij de ISO 19115 validator van NGDC.
    * NIEUW: Zoals voor een verzoek omhttp.../erddap/versie geeft alleen het versienummer terug (als tekst) "ERDDAP\\_versie=1.82"
Nu, een verzoek omhttp.../erdap/version\\_string geeft een getal en een optioneel achtervoegsel van '\\_' plus ASCII tekst terug (geen spaties of controletekens) "ERDDAP\\_version\\_string=1.82\\_JohnsFork" De mensen die de vork doen zullen dit specificeren door EDStatic.erddapVersion te veranderen. Deze manier van doen veroorzaakt geen problemen voor eerdere versies vanERDDAP. Dankzij Axiom (met name Kyle Wilcox) en het Ierse Instituut voor de Zee (met name Rob Fuller) .
    * BUG FIX: Voor wms versie=1.3.0, verzoek=GetMap, crs=EPSG:4326 (geen CRS:84) verzoeken: de bbox-order moet minLat,minLon,maxLat,maxLon zijn. Voor CRS:84 verzoeken, zoals eerder, bbox orde moet minLon,minLat,maxLon,maxLat zijn. Dit kan oplossen met behulp vanERDDAP'sWMS1.3.0 dienst inArcGIS  (dankzij Paola Arce) . Bedankt. (niet) totOGCom dit zo ingewikkeld te maken. DankzijLeafletvoor het correct behandelen van dit en voor het geven van een manier om dit te testen.
    * VERBETERD: VorigeRSSen e-mail abonnementen heeft dehttpURL voor uwERDDAP. Nu is het dehttpsURL, als dat actief is.
    * NIEUW:EDDGridKopiëren ondersteunt nu een optionele tag&lt;alleenSinds&gt;_someValue_&lt;/onlySinds&gt;, waarbij de waarde een specifieke ISO-8601-geformatteerde tijd is of eennow-nEenheden (bv.now-2 jaar) Tijd. Zie[alleen Aangezien documentatie](/docs/server-admin/datasets#onlysince). Dankzij Drew P.
    * VERBETERD: indien beschikbaar,ERDDAP™zal dehttpsURL (van&lt;baseHttpsUrl&gt;, indien beschikbaar) in plaats van dehttpURL-adres wanneer het gebruikers de URL vertelt om een abonnement toe te voegen/validate/remove/list.
    * BUG FIX:ERDDAP™nu kunt een abonnement actie te beginnen met " https://" . (Bob slaat zijn voorhoofd.) Dankzij Jennifer Sevadjian.
    * BUG FIX:.jsonlKVPgebruikt nu ':' tussen elke sleutel en waarde, in plaats van'='. (Bob slaat zijn voorhoofd.) Dankzij Alexander Barth.
    * BUG FIX: Eerder, als je herstartERDDAP™met quickRestart=true, en als, voordat de dataset normaal werd herladen, je een oproep deed naar een EDDTableFromFromFiles dataset die update gebruikteEveryNMillis, en als een gegevensbestand net was gewijzigd, zou het verzoek mislukken met een nul pointer fout. Nu zal het verzoek slagen. Dankzij John Kerfoot.
    * NIEUW: Wanneer een dataset geladen isERDDAP™, de trefwoorden worden nu herschikt in gesorteerde volgorde en elke nieuwe regel tekens worden verwijderd.
    * Nu, als een GeoJson,.jsonof.ncoJson verzoek heeft.jsonp parameter, het antwoord mime type is toepassing/javascript. Merk op dat.jsonp wordt niet ondersteund voor.jsonlCSVof.jsonlKVPOmdat het niet zou werken. Dankzij Rob Fuller.
    * VERBETERD: Het mimetype voor json lines fileType opties is nu "applicatie/x-jsonlines." Het was toepassing/jsonl. Momenteel is er geen definitieve juiste keuze.
    * VERBETERD: Het aantal mislukte verzoeken op de status.html pagina zal toenemen omdat er meer dingen worden geteld als mislukkingen dan voorheen, bijvoorbeeld, ClientAbortException.
    * VERBETERD: Nu, als een reactie vanERDDAP™wordt niet gecomprimeerd, dan zal de header van het antwoord "Content-Encoding"="identity" bevatten.
    * Het "licentie" attribuut was niet vereist. Nu, als het niet is gespecificeerd, de standaardLicentie van messages.xml (of van setup.xml indien aanwezig) wordt gebruikt als standaard.
    * NIEUW: Er is nu een optie[bestandAccessSuffix-attribuut](/docs/server-admin/datasets#fileaccessbaseurl). die kunnen worden gebruikt met de bestaande[bestandAccessBaseUrl-attribuut](/docs/server-admin/datasets#fileaccessbaseurl).
    * VERBETERD: Om de beveiliging te verhogen werd deze versie gecompileerd met de nieuwsteJavaJDK v8u162.
    * NIEUW: Om de veiligheid te verhogen, verschillende gemeenschappelijke domeinen die tijdelijke e-mailadressen bieden (bv., @mailinator.com) zijn nu op een permanente e-mail zwarte lijst voor het abonnementen systeem.
    * NIEUW: Om de beveiliging te verhogen, de tallies in het Dagelijks Verslag nu omvatten:
SetDataset IP-adres markeren mislukt (sinds het laatste dagelijkse verslag)   
SetDataset IP-adres markeren mislukt (sinds opstarten)   
SetDataset IP-adres gemarkeerd (sinds het laatste dagelijkse verslag)   
SetDataset IP-adres gemarkeerd (sinds opstarten)   
De "Failed" tallies laat je zien wie (Een hacker?) probeert een vlag te zetten, maar faalt.
    * VERBETERD: Om de veiligheid te verhogen, e-mailadressen in de&lt;abonnementE-mailBlacklist&gt; in uwdatasets.xmlworden nu beschouwd als hoofdletterongevoelig.
         

## Versie 1.80{#version-180} 
 (vrijgegeven 2017-08-04) 

*    **Nieuwe functies (voor gebruikers) :**   
     
    * NIEUWorderByCount () filter kunt u aangeven hoe de resultatentabel zal worden gesorteerd (of niet) en geeft gewoon één rij terug voor elke sorteergroep, met de telling van het aantal niet-ontbrekende waarden voor elke variabele.
Bijvoorbeeld,orderByCount ("stationID") zal sorteren opstationIDen keer één rij terug voor elkestationID, met een telling van het aantal niet-ontbrekende waarden voor elke variabele.
Als je gewoon opgeeftorderByCount ("") , het antwoord zal slechts één rij zijn met het aantal niet-ontbrekende waarden voor elke gegevensvariabele.
Zie[orderBy... documentatie](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#orderBy)Dankzij Ben Adams.
    * NIEUW.ncoJson-bestand Type optie voor gerasterde en tabeldatasets. Deze optie maakt eenNCOlvl=2 "pedantische" JSON-bestand met alle informatie die normaal in een.ncbestand. Zie[ http://nco.sourceforge.net/nco.html#json ](https://nco.sourceforge.net/nco.html#json)Dankzij Charlie Zender.
    * BUG FIX: DeorderBy... () opties op de Make A Graph web pagina worden nu correct behandeld.
    * BUG FIX: .geoJson-uitvoer drukt nu geen rijen af waar de lat- of lon-waarden ontbreken. Ook hoogtewaarden (indien beschikbaar) zijn nu opgenomen in de coördinaten, niet als data waarden. Dankzij Jonathan Wilkins.
         
*    **DingenERDDAP™Beheerders moeten weten en doen:**   
     
    * VEILIGHEIDSISSUE: De protocollen.js bibliotheek gebruikt voor deOpenLayersdemo op deWMSinERDDAP™is verouderd en heeft een bug die mogelijk kan worden misbruikt. (Helaas, bijwerkenOpenLayersen protocollen. Js is niet makkelijk.) Dat opent de mogelijkheid dat de bibliotheek kan worden opgezet om een cross-site kwetsbaarheid mogelijk te maken. AangezienERDDAP™alleen toepassingenOpenLayersop een specifieke vooraf ingestelde manier en alleen met specifiekeERDDAP-based gegevensbronnen, wij geloven dat er geen cross-site kwetsbaarheid inERDDAPGebruik vanOpenLayersen protocollen.js. Echter, als je dit niet gelooft, kunt u nu uitschakelen het gebruik van deOpenLayersdemo op deWMSpagina's van uwERDDAP™door toevoeging
```
        <openLayersActive>false</openLayersActive>  
```
naar uw setup.xml bestand. De standaard is "waar." Dankzij Charles Carleton en NCII.
    * BEVEILIGINGSVERANDERINGEN: Niet gebruikte .jar bestanden en dupliceren .jar bestanden (omdat ze ook in netcdfAll.jar) zijn verwijderd uit deERDDAP™distributie. Verouderde .jar bestanden zijn bijgewerkt. Dankzij Charles Carleton en NCII.
    * VEILIGHEIDSVERANDERINGEN: Het netcdfAll.jar bestand metERDDAP™is de nieuwste versie (momenteel 4.6.10) , maar het bevat nog steeds interne jackson .jar bestanden die bekend staan als verouderd en hebben beveiligingskwetsbaarheden, met name de Jackson bibliotheken die alleen worden gebruikt bij toegang tot Amazon S3 gegevensbronnen. Als u geen toegang tot gegevens via Amazon S3 (Je zou het weten als je) Deze kwetsbaarheden zijn niet relevant.
        
De netcdf-java ontwikkelaars beweren dat deze kwetsbaarheden niet relevant zijn vanwege de manier waarop netcdf code deze bibliotheken gebruikt en in ieder geval alleen relevant zou zijn bij toegang tot Amazon S3. Zie[ https://github.com/Unidata/thredds/issues/866 ](https://github.com/Unidata/thredds/issues/866). Ik geloof ze. Als u zich hierover nog zorgen maakt, neem dan contact op met de netcdf-java ontwikkelaars. (Merk op dat als u niet gelooft de netcdf-java ontwikkelaars en overwegen niet te gebruikenERDDAP™Daarom zou je THREDDS ook niet moeten gebruiken, want THREDDS gebruikt netcdf-java meer fundamenteel en uitgebreider danERDDAP.) 
        
Bijzonderheden: De lastige code en de kwetsbaarheid waarschuwingen zijn:
netcdfAlle-laatste.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-databind/pom.xml
Zie https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Hoog
netcdfAll- lastest.jar/META-INF/maven/com.fasterxml.jackson.dataformat/jackson-dataformat-cbor/pom.xml
Zie https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Hoog
netcdfAll- lastest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-annotations/pom.xml
Zie https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Hoog
Zie https://nvd.nist.gov/vuln/detail/CVE-2016-3720 -- Kritiek
netcdfAll- lastest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-core/pom.xml
Zie https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Hoog
Zie https://nvd.nist.gov/vuln/detail/CVE-2016-3720 -- Kritiek
"Voor versie 4.6.10 haalt aws-java-sdk-core versie 2.6.6 van jackson-\\* artefacten." (e-mail van netcdf-java mensen) .
Dankzij Charles Carleton en NCII.
        
    * COMPILER VERANDERINGEN: Als u opnieuw compileertERDDAP™Merk op dat de -cp classpath parameter die nodig is voor de opdrachtregel nu veel korter is dan voorheen. Zie de nieuwe -cp instelling in[deze documentatie](/docs/contributing/programmer-guide#development-environment). Dankzij Charles Carleton en NCII.
    * NIEUWE OPTIE in GenerateDatasets Xml: EDDTableFromBcodmo, dat is gewoon voor intern gebruik bij BCO-DMO.
Dankzij Adam Shepherd en BCODMO.
    * NIEUWE BESCHIKBAARHEID EN KENMERKEN: Als een EDDTable kolom bestandsnamen heeft van web toegankelijke bestanden (b.v. beeld-, video- of audiobestanden) , kunt u toevoegen
```
        <att name="fileAccessBaseUrl">_someBaseURL_</a>  
```
om de basis-URL te specificeren (eindigend op /) nodig om van de bestandsnamen volledige URL's te maken. Dan voor.htmlTableantwoorden;ERDDAP™zal de bestandsnaam tonen als een link naar de gecombineerde URL (de basis Url plus de bestandsnaam) .
Als je wiltERDDAP™om de gerelateerde bestanden te dienen, maak een aparte EDDTableFromFileNames dataset voor die bestanden (het kan een particuliere dataset zijn) .
Dankzij Adam Shepherd en BCODMO.
    * NIEUWE ATTRIBUTE AANBEVELING: Als een EDDTable kolom bestandsnamen heeft van web toegankelijke bestanden (b.v. beeld-, video- of audiobestanden) die toegankelijk zijn via een archief (bv..zipbestand) toegankelijk via een URL, gebruik
```
        <att name="fileAccessArchiveUrl">_theURL_</att>  
```
om de URL voor het archief te specificeren.
Als je wiltERDDAP™om het archiefbestand te dienen, maak een aparte EDDTableFromFileNames dataset voor dat bestand (het kan een particuliere dataset zijn) .
Dankzij Adam Shepherd en BCODMO.
    * Verbeteringen om datasets te genereren Xml om de oorzaken van ongeldig/slecht te verwijderen&lt;subsetVariables&gt; suggesties en dupliceren/slecht voorgestelde variabele namen, enz. Dankzij Rich Signell, Adam Shepherd en BCO-DMO.
    * NIEUWE OPTIE: De politieke grens informatie verspreid metERDDAPis van een derde partij en enigszins verouderd. Ook zijn er omstreden grenzen op verschillende plaatsen in de wereld, waar verschillende mensen verschillende ideeën hebben over wat juist is. Wij maken geen aanspraak op de samenhang van de politieke grensgegevens die metERDDAP. Als je niet van de politieke grens informatie die komt metERDDAP™, kun je nu vertellenERDDAP™om nooit politieke grenzen te trekken door toevoeging
```
        <politicalBoundariesActive>false</politicalBoundariesActive>  
```
naar uw setup.xml bestand. De standaard is "waar." Dankzij Raju Devender.
    * NIEUWE METADATA TAG: In dedatasets.xmlvoor een dataset kunt u nu het standaard aantal kleuren opgeven Balkdelen voor eendataVariableop grafieken en kaarten met
```
        <att name="colorBarNSections">_anInteger_</att>  
```
         (standaard=-1, waarin staat te latenERDDAP™besluit) . Zie[kleur Balkinstellingen](/docs/server-admin/datasets#color-bar-attributes).
    * VERBETERD: de staatgrenskleur op kaarten was paars (Diep paars voor jou Baby Boomers) . Nu is het grijs (tussen de nationale grens grijs en het land grijs) .
    * BUG FIX:&lt;iso19115Bestand&gt; en&lt;fgdcBestand&gt; indatasets.xmlwerden niet altijd correct behandeld. Nu wel. Dankzij BCO-DMO.

## Versie 1.78{#version-178} 
 (vrijgegeven 2017-05-27) 

*    **Nieuwe functies (voor gebruikers) :**   
     
    *    (geen)   
         
*    **DingenERDDAP™Beheerders moeten weten en doen:**   
     
    * VERBETERD: De volgorde van de regels in "Major LoadDatasets Time Series" op de status.html pagina is nu nieuwste aan de bovenkant naar oudste onderaan.
    * BUG FIX:ERDDAP™nu schrijft.nccsvbestanden met de tijdvariabeleactual\\_rangeals ISO-8601 tekenreekstijd. Dat lost de bug met EDDTableFromErdap ontleden info uit een externe dataset en uit het quickRestart bestand voor alle EDDTableFrom...Files datasets. (De tijdactual\\_rangezal fout zijn de eerste keer dat de dataset laadt in v1.78 maar correct nadat het is herladen, bijvoorbeeld, als u markeert de dataset.) 

## Versie 1.76{#version-176} 
 (vrijgegeven 2017-05-12) 

*    **Nieuwe functies (voor gebruikers) :**   
     
    * VERANDERING in Tomcat: Voor verzoeken omERDDAP™afkomstig van andere software dan webbrowsers (bv.curl, R,Matlab,Python,Java) :
Net als bij eerdere wijzigingen in versies van Tomcat (de lagere software die draaitERDDAP) sinds begin 2016, meer en meer van de tekens in de query deel van de aanvraag URL moet zijn[ **Procent gecodeerd** ](/docs/server-admin/datasets#infourl)om veiligheidsredenen. Browsers zorgen voor een percentage codering voor u. dus gebruikenERDDAP™in een browser wordt niet beïnvloed tenzij het verzoek wordt doorgestuurd naar een andereERDDAP.
    * Eerder,ERDDAP™behandeld **tekenvariabelen** eerder ongetekende korte gehele getallen dan tekens. Nu behandelt het ze meer als 1 karakter lang UCS-2 (Unicode) Strings. Zie[char documentatie](/docs/server-admin/datasets#char). Dankzij Aurelie Briand en het Argo project.
    * Eerder,ERDDAP™biedt weinig steun voor **Unicode-tekens** boven teken #255 in tekenreeksen. Nu, intern,ERDDAP™ondersteunt volledig 2-byte UCS-2 tekens (tekens genummerd 0 tot en met 65535) in Strings. Wanneer String gegevens worden geschreven naar verschillende bestandstypen,ERDDAP™doet het beste wat het kan om 2-byte tekens te ondersteunen. Een ander voorbeeld is .csv bestanden dieERDDAP™schrijft met de ISO-8859-1 tekenset (een 1-byte tekenset) , dusERDDAP™schrijft tekens boven teken #255 met de JSON-achtige \\u_hhhh_ syntax. Zie[Tekenreeksgegevens](/docs/server-admin/datasets#string).
    * VERBETERD:.ncbestanden geschreven doorERDDAP™, tekens variabelen die geïnterpreteerd moeten worden als tekenreeksen hebben de eigenschap
         **\\_Coding=ISO-8859-1**   
In.ncbestanden gelezen doorERDDAP™, tekensetvariabelen met "\\_Encoding" worden geïnterpreteerd als tekenreeksen met de opgegeven tekenset.
    * HERINNEREN:ERDDAP™ondersteuning **JSON-achtige backslash-codering** van speciale tekens wanneer u beperkingen van tekens en tekenreeksvariabelen specificeert. Zo kunt u vragen iets als &myString="\\u20ac" wanneer u rijen van gegevens waar myString=€ sinds 20ac is de hexadecimale versie van het codepunt voor het Euro symbool. Verschillende bronnen op het web tonen de codepuntnummers voor Unicode symbolen, bijvoorbeeld,[ https://en.wikipedia.org/wiki/Unicode ](https://en.wikipedia.org/wiki/Unicode).
    * Eerder,ERDDAP™beperkte steun voor **lang geheel getal** variabelen. NuERDDAP™volledig ondersteunt lang intern en doet zijn best bij het schrijven van lange gegevens naar verschillende bestandstypen. . Zie[lange documentatie](/docs/server-admin/datasets#long). Dankzij het Ierse Instituut voor de Zee, Craig Risien, Rich Signell, Christopher Wingard en OOI.
    * NIEUW: uitvoer bestandstype voor griddap entabledap: **.nccsv** , waardoor eenNetCDF-zoals, ASCII, CSV-bestand dat ook alle metadata bevat die in een vergelijkbare.ncbestand. Zie[NCCSV Specificatie](/docs/user/nccsv-1.00). Dankzij Steve Hankin.
    * NIEUW: **orderByClosestfilter** kunt u aangeven hoe de resultatentabel zal worden gesorteerd en een interval (bv. 2 uur) . Binnen elke sorteergroep worden alleen de rijen die het dichtst bij het interval liggen bewaard. Bijvoorbeeld,orderByClosest ("stationID, tijd, 2 uur") zal sorteren opstationIDen tijd, maar geef alleen de rijen voor elkestationIDwaar de laatsteorderByKolom (tijd) is het dichtst bij een interval van 2 uur. Dit is het dichtstbijzijnde ding intabledapwaarden in een griddap verzoek te halen. Deze optie kan worden gespecificeerd via elketabledapdataset's .html web pagina, .graph web pagina, en door elke URL die u zelf genereert. Dankzij het Ierse Marine Institute and Ocean Networks Canada.
    * NIEUW: **orderByLimitfilter** kunt u aangeven hoe de resultatentabel zal worden gesorteerd en een limietnummer (bv. 100) . Binnen elke sorteergroep worden alleen de eerste 'limit' rijen bewaard. Bijvoorbeeld,orderByMax ("stationID, 100") zal sorteren opstationID, maar geef alleen de eerste 100 rijen voor elkestationID. Dit is vergelijkbaar met de beperkingsclausule van SQL. Deze optie kan worden gespecificeerd via elketabledapdataset's .html web pagina, .graph web pagina, en door elke URL die u zelf genereert. Dankzij het Ierse Marine Institute and Ocean Networks Canada.
    * NIEUW: Twee nieuwe bestandstypen, **.jsonlCSVen.jsonlKVP** zijn beschikbaar voor verzoeken om gerasterde datasets, tabeldatasets en vele andere plaatsen inERDDAP  (b.v. verzoeken om informatie over datasets) . De bestanden zijn JSON Lines bestanden ([ https://jsonlines.org/ ](https://jsonlines.org/)) waarbij elke regel een apart JSON-object heeft..jsonlCSVheeft alleen de waarden in een CSV-formaat..jsonlKVPheeft sleutel: Waardeparen. Elke lijn staat er alleen voor. De lijnen zijn niet ingesloten in een grotere JSON array of object. Bijvoorbeeld, zie[dit verzoek om een steekproef](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst.jsonlKVP?longitude%2Clatitude%2Ctime%2Cstation%2Cwmo_platform_code%2CT_25%26time%3E=2015-05-23T12:00:00Z%26time%3C=2015-05-31T12:00:00Z). Dankzij Damian Smyth, Rob Fuller, Adam Leadbetter en het Ierse Marine Instituut.
    * NIEUW: Er is nieuwe documentatie die beschrijft[ **Hoe toegang te krijgen tot private datasets inERDDAP™via Scripts** ](/docs/user/AccessToPrivateDatasets). Dankzij Lynn DeWitt.
    * VERBETERD: de minimale omvang van de **OpenLayers** kaart was 2 graden en is nu 4 data pixels. Dankzij Rusty Holleman.
    * VERBETERD: In sommige gemeenschappelijke gevallen **reguliere expressie** beperking zal veel sneller worden verwerkt.
         
*    **DingenERDDAP™Beheerders moeten weten en doen:**   
     
    *    **SLOW FIRST STARTUP:** De eerste keer dat je deze nieuwe versie opstart, zal het lang duren voorERDDAP™om alle datasets te laden omdat het alle brongegevensbestanden opnieuw moet lezen (Hoewel alleen de header voor gerasterde gegevensbestanden) . Als je kijkt naar de logs zie je misschien foutmeldingen waarin staat "oude/niet-ondersteunde verbeterde versie" van sommige interne bestanden -- dat is oké --ERDDAP™zal de nieuwe versies van de interne bestanden. Wees geduldig.
    * ACTIE:ERDDAP™nu gebruikt de nieuwe **java.time** klassen (ook bekend als JSR 310) in plaats van Joda om String tijden te ontleden in numerieke tijden. Opmerkingen:
        * AlsERDDAP™plotseling heeft problemen met het ontleden van de tekenreeks tijden voor een bepaalde dataset en dus zet gewoon de meeste of alle keren naar NaN's (ontbrekende waarden) , het probleem is bijna altijd met de datum Time format string die u hebt opgegeven als de "units" van de variabele. Het nieuwe systeem heeft soms een iets andere datumTijd formaat string nodig.
        * Als numeriek maanden en dagen in de datumTijd strings zijn niet 0-padded (bv. "3/7/2016") , zorg ervoor dat het formaat slechts een enkele M en d (bijvoorbeeld "M/d/jjjj," niet "MM/dd/jjjj") .
        * Verander elke fractionele seconden specificatie die kleine letters s gebruikt (b.v. de .sss inyyyy-MM-dd'T'HH:mm:ss.sss) , in het kapitaal S's, (bv.yyyy-MM-dd'T'HH:mm:ss.SSS) .
        *   ERDDAP™ondersteunt tekenreeksdatum niet langer Tijdsformaten met tweecijferige jaren (yy) met een impliciete eeuw (bv. 1900 of 2000) . Bedrijven besteedden miljarden dollars aan het oplossen van dit probleem in de late jaren 1990. Wetenschappers mogen geen twee cijferjaren gebruiken. Repareer het bronbestand (s) door om te zetten naar 4-cijferige jaren, gebruik dan jjjj in de datum Tijdformaat.
        * U kunt jjjj of JJJJ gebruiken (dieERDDAP™converteren naar uuuu) te verwerken 4 cijferjaren, inclusief negatieve jaren, bv. -4712 (dat is 4713 V.CHR.) . Dankzij SeaDataNet, Thomas Gardner en BDC.
        * Ga door met het gebruik van Z binnen een datumTijd formaat om te krijgenERDDAPom een tijdsverschuiving te verwerken (bv. Z, +0200, -08, -080, -08:30) .
        *    **Zorg ervoor dat uJavaversie 1.8.0\\_21 of hoger.** 
        * Programmeurs -- Als je schrijftJavaprogramma's die draaienERDDAP™code, je moet de verwijzing naar joda-tijd verwijderen. pot in de klasse pad parameter.
    * NIEUW:ERDDAP's[ArchiefA Datasethulpmiddel](/docs/server-admin/additional-information#archiveadataset)kan nu aanmaken[ **BagIt bestanden** ](https://en.wikipedia.org/wiki/BagIt). NCII kan standaardiseren op dit formaat. Dankzij Scott Cross en John Relph.
    * VERBETERD: De links om de erddap te downloaden. De Voorzitter. - Het debat is gesloten.ERDDAP™Webpagina's verwijzen nu naar **GitHub** . (Het zijn publieke links, dus je hoeft niet bij GitHub.) Dit betekent veel snellere downloads (tot 12Mb/s versus 1Mb/s) en weinig problemen met downloads. Dankzij Damian Smyth, Rob Fuller, Adam Leadbetter, Conor Delaney en het Ierse Marine Institute.
    * VERBETERD: **status.html pagina en de dagelijkse status rapport e-mail** nu een "Major LoadDatasets Time Series" sectie die statistieken toont overERDDAP™vanaf het einde van elke grote belastingDatasets voor de laatste 100 grote belastingDatasets. Dankzij onze lastige RAID.
    * NIEUW: een nieuwe, facultatieve (maar aanbevolen) parameter voor EDDTableFromCassandra datasets: [ ** &lt;partitieKeyCSV&gt; ** ] (/docs/server-admin/datasets#partitionkeycsv) . Dankzij Ocean Networks Canada.
    * NIEUW: EDDTableFromAsciiFiles ondersteunt nu ** &lt;kolomSeparator&gt; ** parameter. Als nul of "", zal de klasse raden, zoals eerder, Anders zal het eerste teken worden gebruikt als de kolom scheidingsteken bij het lezen van de bestanden. Dankzij Sky Bristol en Abigail Benson.
    * Nieuw: het nieuwe datasettype,[ **EDDtabelVanNccsvFiles** ](/docs/server-admin/datasets#eddtablefromnccsvfiles), kan een dataset maken door samen te voegen[NCCSV .csv bestanden](/docs/user/nccsv-1.00). Dankzij Steve Hankin.
    * VERBETERD: **EDDtabelVanErdap** nu gebruikt.nccsvinformatie op afstand ophalenERDDAPs en voor lokaal archief van die metagegevens-informatie. Dit maakt volledige ondersteuning mogelijk voor de char en lange data types, en voor Unicode (UCS-2) Charset voor tekens en Strings. Dankzij Rob Fuller en het Ierse Marine Instituut.
    * VERBETERD: EDDTableVanErdap enEDDGridFromErdap ondersteunt nu ** &lt;omleiding&gt;vals&lt;/redirect&gt; ** waarin staatERDDAP™nooit omleiden van het verzoek naar de remoteERDDAP. De standaard is waar. Dit is handig wanneer de remoteERDDAP™is een privéERDDAP. Dankzij Damian Smyth, Rob Fuller en het Ierse Marine Instituut.
    * VERBETERD:ERDDAP™nu vangsten **geannuleerde gebruikersverzoeken** Eerder. EnERDDAP™schakelt nu sneller uit omdat de laag niveau draden sneller afsluiten. Dankzij onze lastige RAID.
    *    **GenererenDatasets Xml:** 
        * NIEUW: De nieuwe speciale EDDType "ncdump" drukt een[nudump](https://linux.die.net/man/1/ncdump)\\-achtige afdruk van de koptekst van een.ncbestand. U kunt ook de gegevenswaarden voor gespecificeerde variabelen afdrukken (of "niets" invoeren om geen gegevenswaarden af te drukken) . Dit is handig omdat, zonder nudump is het moeilijk om te weten wat er in een bestand zit en dus welke EDDType je moet opgeven voor GenerateDatasetsXml. Dankzij Craig Risien, Rich Signell, Christopher Wingard en OOI.
        * NIEUW: Voor SeaData Nettogegevens:
Indien van toepassing, GenereerDatasets Xml doet nu een specifieke semantische conversie met behulp van een externe SPARQL query: als de bronmetadata van een variabele een sdn\\_parameter\\_urn bevat, bijvoorbeeld sdn\\_parameter\\_urn = "SDN:P01::PSLTZZ01," GenerateDatasets Xml zal het bijbehorende P02-attribuut toevoegen, bijvoorbeeld sdn\\_P02\\_urn = "SDN:P02::PSAL." Als je datasets hebt die deze attributen gebruiken, en als jeERDDAP's&lt;categoryAttributes&gt; in setup.xml bevat sdn\\_parameter\\_urn en sdn\\_P02\\_urn, gebruikers zullen kunnen gebruikenERDDAP™Category search system to search for datasets with specific values of these attributen. Dankzij BODC en Alexandra Kokkinaki.
        * VERBETERD: GenererenDatasets Xml verandert nu veelhttp://verwijzingen naarhttps://in voorkomend geval.
        * VERBETERD: GenererenDatasets Xml probeert nu maker\\_type en uitgever\\_type te raden.
        * VERBETERD: De gegevens van de variabeleSoorten voorgesteld door GenerateDatasets Xml zal nu een beetje beter zijn. Dankzij Margaret O'Brien, LTER en EML.
        * VERBETERD: GenererenDatasets Xml is beter in het specificeren van de&lt;cdm\\_data\\_type&gt;, en het toevoegen van de gerelateerde, vereiste attributen (bijv.,&lt;cdm\\_timeserie\\_variabelen&gt;), zodat u die informatie kunt leveren. Dankzij Rich Signell.
        * VERBETERD: In GenerateDatasets Xml, voor EDDTable datasets, de suggestie voor&lt;subsetVariables&gt; is nu veel conservatiever. Dankzij John Kerfoot.
        * VERBETERD:datasets.xmlvoor een datasets specificeertfeatureTypemaar geen cdm\\_data\\_type, defeatureTypezal gebruikt worden als het cdm\\_data\\_type. Dankzij Rich Signell.
        * BUG FIX: genereren Datasets Xml suggereert nu de juiste&lt;dataType&gt; voor gegevensvariabelen diescale\\_factor,add\\_offseten/of \\_Ongetekende attributen.
    * VERBETERD: WanneerERDDAP™opent een.ncbestand dat is **korter** dan het zou moeten zijn (b.v., het is niet volledig gekopieerd) ,ERDDAP™Behandelt het dossier nu als slecht. Wat voorafging:ERDDAP™geretourneerde ontbrekende waarden voor elk ontbrekend deel van het bestand omdat dat het standaardgedrag is voor netcdf-java.ERDDAP™nu gebruikt ucar.nc2.iosp.netcdf3.N3header.disallowFileTruncation = true; Dankzij onze lastige RAID en Christian Ward-Garrison.
    * VERBETERD: de ISO 19115 schrijver maakt nu gebruik van **maker\\_type** , indien aanwezig.
    * VERBETERD:ERDDAP™nu maakt gebruik van de nieuwste netcdf-java v4.69 die kan lezen extra soorten van **netcdf-4 bestanden** . Dankzij Craig Risien, Rich Signell, Christopher Wingard en OOI.
    * BUG FIX: vermijd problemen als verschillende bronbestanden verschillende datatypes voor een bepaalde variabele hebben. Dankzij Roy Mendelssohn en Eugene Burger.
    * BUG FIX: **Conversies op tijdformaat** worden nu beter beschermd tegen slechte tijd waarden. Dankzij NDBC.
    * BUG FIX:EDDGridVanNcFiles Uitgepakt verwerkt nu tijdwaarden met **"maanden sinds ..." en "jaren sinds ..."** correct (door de maand of het jaar te verhogen, niet door er bijvoorbeeld meer dan 30 dagen bij te voegen) . Dankzij Soda3.3.1.
    * Net in v1.74. **abonnementen** vereiste actie (bv.http://...) , dat was en moet facultatief zijn.
    * BUG FIX:EDDGridVanMergeIRFiles.lowGetSourceMetadata () geen globale attributen toegevoegd. Nu wel.
         

## Versie 1.74{#version-174} 
 (uitgebracht 2016-10-07) 

*    **Nieuwe functies (voor gebruikers) :**   
     
    * Nu, wanneer een lijst van Datasets (Alle, of van een zoekopdracht) wordt weergegeven op een webpagina, lange titels worden weergegeven op meerdere lijnen. Eerder werd het midden van een lange titel vervangen door " ... " . Dankzij Margaret O'Brien, LTER en EML.
         
*    **DingenERDDAP™Beheerders moeten weten en doen:**   
     
    * TO DO: Verander op Linux computers de Apache timeout-instellingen zodat tijdrovende gebruikersverzoeken geen timeout krijgen (met wat vaak verschijnt als een "Proxy" of "Bad Gateway" fout) . Als root gebruiker:
        
        1. De Apache wijzigenhttpd.conf-bestand (meestal in /etc/httpd/conf/) :
Het bestaande&lt;Timeout&gt; instellen (of voeg er een toe aan het einde van het bestand) tot 3600 (seconden) , in plaats van de standaard 60 of 120 seconden.
Het bestaande&lt;ProxyTimeout&gt; instelling (of voeg er een toe aan het einde van het bestand) tot 3600 (seconden) , in plaats van de standaard 60 of 120 seconden.
        2. Apache herstarten: /usr/sbin/apachectl -k sierlijk (maar soms is het in een andere map) .
        
Dankzij Thomas Oliver.
         
    * NIEUW:\\[bigParentDirectory/hard Vlagmap
Dit werkt als de vlag directory, maar de hardFlag versie verwijdert ook alle gecachede dataset informatie. Er zijn geen URL's om een harde vlag in te stellen. Dit kan alleen worden gebruikt door een bestand in die map te plaatsen.
hard Vlaggen zijn erg nuttig als je iets doet dat een verandering veroorzaakt in hoeERDDAP™leest en interpreteert de brongegevens, bijvoorbeeld wanneer u een nieuwe versie vanERDDAP™of wanneer u bepaalde soorten wijzigingen hebt aangebracht in de definitie van een dataset indatasets.xml. Zie[deze documentatie](/docs/server-admin/additional-information#hard-flag). Dankzij John Kerfoot en alle Argo groepen.
         
    * NIEUW: GenererenDatasets Xml heeft nu een EDDTableFromEML optie
waarin een gegevenssetbeschrijving staat in een Ecologische Metadata-taal (EML) bestand, downloadt het bijbehorende gegevensbestand, en genereert een brok vandatasets.xmlzodat de dataset kan worden toegevoegd aanERDDAP. Er is ook een EDDTableFromEMLBatch die hetzelfde doet voor alle EML-bestanden in een directory. Dit werkt heel goed omdat EML uitstekend werk verricht bij het beschrijven van de dataset en omdat KNB en LTER de werkelijke gegevensbestanden beschikbaar stellen.
EML plusERDDAP™zou een geweldige combinatie, aangezienERDDAP™kan gebruikers meer directe toegang tot de rijkdom van KNB en LTER gegevens en helpen die projecten te voldoen aan de Amerikaanse overheid[Toegang van het publiek tot onderzoeksresultaten (PARR) vereisten](https://nosc.noaa.gov/EDMC/PD.DSP.php)door de gegevens beschikbaar te stellen via een webservice.
Zie[deze documentatie](/docs/server-admin/EDDTableFromEML). Dankzij Margaret O'Brien, LTER en EML.
         
    * NIEUW: GenererenDatasets Xml heeft nu een EDDTableFromInPort optie
die een datasetbeschrijving leest in een InPort XML bestand en probeert een brok vandatasets.xmlzodat de dataset kan worden toegevoegd aanERDDAP. Dit maakt zelden een kant-en-klare brok XML voordatasets.xml, maar het zal een goede ruwe ontwerp dat is een goed uitgangspunt voor het bewerken door een mens.
Het zou geweldig zijn als mensen die InPort gebruiken om hun datasets te documenteren ook zouden gebruikenERDDAP™de feitelijke gegevens beschikbaar te stellen viaERDDAP"s web services en daardoor voldoen aan de Amerikaanse overheid enNOAA's[Toegang van het publiek tot onderzoeksresultaten (PARR) vereisten](https://www.whitehouse.gov/blog/2013/02/22/expanding-public-access-results-federally-funded-research)door de gegevens beschikbaar te stellen via een webservice. Dit is een oplossing die we nu kunnen gebruiken. (erd.data at noaa.govGraag gedaan.)   
Zie[deze documentatie](/docs/server-admin/datasets#eddtablefrominport). Dankzij Evan Howell en Melanie Abecassis.
         
    * VERBETERD:ERDDAP™gebruikt nu netcdf-java 4.6.6.
Met eerdere versies, netcdf-java lees enkele vulwaarden (misschien gewoon in netcdf-4 bestanden) als 0's. Nu leest het sommige ervan als de netcdf standaard vulwaarde: -127 voor bytes, -32767 voor shorts, -2147483647 voor ints.Unidatazegt dat het nieuwe gedrag het juiste gedrag is. Als een variabele in een dataset begint met het tonen van een van deze waarden waar ze gebruikt worden om 0's te tonen, kunt u toevoegen, bijvoorbeeld,
```
        <att name="\\_FillValue" type="short">-32767</att>  
```
naar de variabeleaddAttributesom te vertellenERDDAP™om deze waarde te behandelen als amissing\\_value_Vullen Waarde. In veel gevallen zal dat echter niet het gewenste resultaat opleveren: 0's. Zo ja, overweeg dan de bestanden te wijzigen metNCOof de bestanden herschrijven. Klachten? Neem contact op metUnidata;-)
         
    * TO DO: Nieuwe topografieDepth palet
Ik moedig je aan om alle datasets die het OceanDepth palet gebruiken om het nieuwe TopographyDepth palet te gebruiken, dat is als Topografie behalve met de kleuren omgedraaid, zodat het geschikt is voor dieptewaarden (positief=down) , in plaats van hoogtewaarden (positief=boven) . De aanbevolen instellingen voor dit palet zijn:
```
            <att name="colorBarMaximum" type="double">8000.0</att>
            <att name="colorBarMinimum" type="double">-8000.0</att>
            <att name="colorBarPalette">TopographyDepth</att> 
```

    * NIEUWE KENMERKEN: Tekenreeksmissing\\_valueen/of \\_FillValue
Als een tekenreeks variabele eenmissing\\_valueen/of \\_FillValue,ERDDAP™zal nu verwijderen die waarden uit de gegevens en ze vervangen door een lege tekenreeks, zodat ontbrekende waarden verschijnen als lege tekenreeksen, zoals met andere datasets inERDDAP. Dankzij Margaret O'Brien, LTER en EML.
         
    * NIEUWE KENMERKEN: Ondersteuning voor lokale tijden
tijdstempelvariabelen met brongegevens van tekenreeksen kunnen nu een tijdzone specificeren via een "time\\_zone" attribuut dat leidtERDDAP™om de lokale-tijd-zone brontijden te converteren (sommige in Standaard tijd, sommige in Daglicht Besparen tijd) inZulutijden. De lijst met geldige tijdzonenamen is waarschijnlijk identiek aan de lijst in de TZ kolom in[deze tabel](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). De standaard is "Zulu" Gemeenschappelijke Amerikaanse tijdzones zijn: US/Hawaii, US/Alaska, US/Pacific, US/Mountain, US/Arizona, US/Central, US/East. Voor tijdstempelvariabelen met numerieke brongegevens kunt u de "time\\_zone" attribuut, maar de waarde moet "Zulu"of "UTC." Dankzij Margaret O'Brien, LTER en EML.
         
    * NIEUWE KENMERKEN: EDDTableFromAsciiFiles ondersteunt nu semicolon-gescheiden bestanden
en is slimmer over het uitzoeken van de scheiding. Dankzij Margaret O'Brien, LTER en EML.
         
    * NIEUWE KENMERKEN: Als er een significante fout is in loadDatasets (groot of klein, bijvoorbeeld een ontbrekend of ongeldigdatasets.xmldocument) ,ERDDAP™zal het nu aangeven in status.html, direct onder "n Datasets Fout bij laden" als FOUT: tijdens het verwerkendatasets.xml: zie log.txt voor details.
         
    * NIEUWE KENMERKEN:ERDDAP™Zoek naar wezen.
WanneerERDDAP™doet een grote belasting Datasets, het zoekt nu naar weesdatasets (datasets die inERDDAP™maar niet indatasets.xml) . Indien gevonden worden ze vermeld in status.html, rechts onder "n Datasets Fout bij het laden" als foutmelding: n Weesgegevenssets (datasets inERDDAP™maar niet indatasets.xml) = ....
Als u wilt verwijderen (uitladen) een wees vanERDDAP™, u moet toevoegen
        &lt;dataset type="_anyValidType_"datasetID="_theDatasetID_" active="false" /&gt;
totdatasets.xmltotdat de dataset wordt gelost tijdens de volgende grote ladingDatasets.
         
    * BUG FIX: Als een dataset een numerieke tijdstempelvariabele had met andere eenheden dan"seconds since 1970-01-01T00:00:00Z"en met de&lt;updateEveryNMillis&gt; systeem actief, het bereik van de tijdstempelvariabele is onjuist ingesteld toen de dataset werd bijgewerkt. Dankzij John Kerfoot.
         
    * BUG FIX: Als&lt;quickRestart&gt; was waar in setup.xml en u vroeg gegevens van een EDDTableFrom... Bestandenset die gebruikt wordt&lt;updateEveryNMillis&gt;, het eerste verzoek naar de dataset zou mislukken, maar volgende verzoeken zouden slagen. Het eerste verzoek zal niet mislukken. Dankzij John Kerfoot.
         
    * BUG FIX: De GenerateDatasetsXml.sh en .bat werkten niet met &gt;9 parameters op de opdrachtregel. Nu wel. Dankzij John Kerfoot.
         
    * BUG FIX: De nieuwe EDDTableFromMultidimNcFiles heeft niet consequent trailing spaties uit strings verwijderd. Nu wel. Met name, dit beïnvloed ARGO bestanden. Dankzij Kevin O'Brien en Roland Schweitzer.
         
    * BUG FIX: Alle toegang van remoteDAPDiensten worden nu gestart door modernere code. Dit lost de "connectie gesloten" fout bij het openen van een aantal EDDTableFromErdap datasets. Dankzij Kevin O'Brien.
         
    * BUG FIX: De behandeling vanorderBy... () en onderscheiden () zijn nu terug naar de manier waarop ze waren voor de recente wijzigingen: een gegeven verzoek kan meerdereorderBy... () en/of een aparte () filter;ERDDAP™zal ze behandelen in de volgorde die ze zijn gespecificeerd. Dankzij David Karuga.
         
    * BUG FIX: Als de dataset EDDTableFromDatabase is en een query heeft[bronCanOrderBy](/docs/server-admin/datasets#sourcecanorderby)en/of[bronCanDoDistinct](/docs/server-admin/datasets#sourcecandodistinct), dan kan de database (afhankelijk van de instellingen indatasets.xml) geheel of gedeeltelijk handvat **alleen de eerste**  orderBy.. () of verschillend () . Dankzij David Karuga.
         
    * BUG FIX: De recente extra procent-codering veroorzaakte problemen met enkele vragen voor.ncCF-bestanden, bijvoorbeeld "HTTP-status 500 - Query error: variable=station staat twee keer vermeld in de lijst met resultatenvariabelen." Dankzij Kevin O'Brien.
         
    * BUG FIX: EDDTableFromFiles had moeite met het herladen van een dataset toen een van de kolommen een ware char kolom was. Dankzij Roland Schweitzer.
         
    * BUG FIX:EDDGridVanNcFiles Uitgepakt nu ook converteertmissing\\_valueen \\_FillValue naar standaardwaarden zodat bestanden met verschillende waarden kunnen worden samengevoegd. Door deze wijziging, nadat u deze nieuwe versie vanERDDAP™, stel een[hard Vlag](/docs/server-admin/additional-information#hard-flag)voor elkEDDGridVanNcFiles Uitgepakte dataset in uwERDDAP.
         
    * VERBETERD: EDDTableVanuitNcCFFiles kunnen nu bestanden met meerdere sample\\_dimensies verwerken. Een gegeven dataset mag alleen variabelen gebruiken die één van de sample\\_dimensies gebruiken. Dankzij Ajay Krishnan.
         
    * VERBETERD: Voor EDDTableVan...Bestanden,&lt;SorteerFilesBySourceNames&gt; nu komma-afzonderlijk toestaan (aanbevolen) of spatie gescheiden lijsten van variabele bronnamen. In beide gevallen kunnen individuele variabele namen worden omgeven door dubbele aanhalingstekens, bijvoorbeeld als de naam een interne ruimte heeft.

## Versie 1.72{#version-172} 
 (uitgebracht 2016-05-12) 

*    **Nieuwe functies (voor gebruikers) :** Geen.
     
*    **DingenERDDAP™Beheerders moeten weten en doen:** 
    * NIEUWE EDDTableVanMultidimNcFiles[EDDtabelVanMultidimNcFiles](/docs/server-admin/datasets#eddtablefrommultidimncfiles)is een nieuw alternatief voor EDDTableFromNcFiles. Het is ontworpen voor groepen bestanden met verschillende variabelen met gedeelde dimensies, bijvoorbeeld var1\\[a\\]\\[b\\], var2\\[a\\], var3\\[b\\], scalarVar. Dankzij het Argo Project, Aurélie Briand en Roland Schweitzer.
    * BUG FIX:ERDDAP™  (via de FileVisitorDNLS en FileVistorSubdir klassen) volgt nu symbolische links op Linux.ERDDAP™Volgt nog steeds geen .lnk's op Windows.
    * BUG FIX van bug geïntroduceerd in 1.70: onderscheiden +orderBywaren niet toegestaan samen in een verzoek. Nu zijn ze het weer. Zij sluiten elkaar niet uit. Dankzij David Karuga.
    * VERANDERINGdatasets.xmlzwarte lijst van IP adressen:
IP v4 adressen lijken te zijnERDDAP™als 4 periode gescheiden hex nummers.
Ik denk dat IP v6 adressen verschijnen als 8 dubbele punt gescheiden hex nummers.
Dus.ERDDAP™ondersteunt nu dubbele punten in de IP-adressen in die lijst en \\* aan het einde van de lijst om een reeks adressen te blokkeren.
    * VERBETERD:ERDDAP™nu gebruikt NetcdfFileWriter om te schrijven.ncbestanden in plaats van de verouderde NetcdfFileWriteable. Er mag geen duidelijke verandering in de resulterende bestanden zijn. Dit opent de mogelijkheid om groot te maken.ncbestanden die de.nc3 64bit uitbreidingen. Als u dat nodig heeft, stuur dan een verzoek naarerd.data at noaa.gov.
    * VERBETERD: Veel van de links naar externe websites waren verouderd. Nu zijn ze up-to-date en gebruikenhttps:in plaats vanhttp: waar mogelijk.
    * Veel kleine veranderingen.

## Versie 1.70{#version-170} 
 (uitgebracht 2016-04-15) 

*    **Nieuwe functies (voor gebruikers) :** Geen.
     
*    **DingenERDDAP™Beheerders moeten weten en doen:** Hieronder vindt u een aantal aanbevolen wijzigingen in de documentatie in uw setup.xml bestand.
Alstublieft, maak deze wijzigingen nu.
Dertig minuten werk kan u in de toekomst uren van verwarring besparen.
    * Bugfix: Het probleem was dat verzoeken die werden doorgestuurd naar een remoteERDDAPmislukt met een ongeldig teken '|' foutmelding. Dit gebeurde alleen met recente versies van Tomcat. Dankzij Rusty Holleman, Conor Delaney en Roy Mendelssohn.
    * Bugfix:ERDDAP™gebruikt nu een up-to-date versie van netcdf-java (Het is een lang verhaal.) die bevat up-to-date ondersteuning voor NcML, die het probleem met NcML LogicalReduce niet werken zoals verwacht. Er kunnen een paar kleine veranderingen in de metadata dieERDDAP™leest via netcdf-java van.nc,.hdf, .grib, en .bufr bestanden. Dankzij Favio Medrano.
    * Het nieuwe[EDDTableAggregateRows](/docs/server-admin/datasets#eddtableaggregaterows)kunt u een samengevoegde EDDTable-dataset maken van twee of meer EDDTable-datasets met dezelfde gegevensvariabelen met dezelfde eenheden. Dankzij Kevin O'Brien.
    * Nieuwe opties voor EDDTableFromDatabase ([bronCanOrderBy](/docs/server-admin/datasets#sourcecanorderby)en[bronCanDoDistinct](/docs/server-admin/datasets#sourcecandodistinct)) laat u specificeren ofERDDAP™, de database, of beide, behandelen onderscheiden enorderBy  (en alle varianten) beperkingen. Dankzij David Karuga.
    * Je kunt nu de grafieken en metadata van een private dataset beschikbaar maken voor het publiek via de nieuwe [&lt;grafiekenToebehorenTo&gt;openbaar&lt;/graphsAccessibleTo&gt;] (/docs/server-admin/datasets#graphsaccessableto) Tag. Dankzij Emanuele Lombardi.
    * Nu, als een string doorgegeven aan GenerateDatasets Xml of DasDds wordt omgeven door dubbele citaten, het is niet vermeld (alsof het een JSON tekenreeks is) . Dankzij John Kerfoot en Melanie Abecassis.
    * GenererenDatasets Xml ondersteunt nu "standaard" om de standaard en "niets" te krijgen om een lege tekenreeks te krijgen (ze werken met of zonder citaten) . Dit lost enkele problemen op in verband met het doorgeven van lege strings.
    * Nu, in GenerateDatasets Xml, voor iedereenEDDGridFromFiles en EDDTable Datasets van FromFiles, indien het monster Bestandsnaam die u opgeeft is "" (de lege tekenreeks) , het zal het laatste overeenkomende bestandName uit de directory + regex + recursive=true gebruiken.
    * Bijgewerkt: De displayInBrowser code die wordt gebruikt om de resultaten van GenerateDatasetsXml en DasDds op Linux computers weer te geven was verouderd en gaf een vreemde boodschap over Netscape. Dit maakt gebruik van een moderne Linux tool: xdg-open. Dankzij Melanie Abecassis.
    * DeallDatasetsdataset heeft nu een"files"kolom, die de basis-URL van de /files-link aangeeft (als er één is) voor de dataset.
    * Verhoog de algemene beveiliging van uwERDDAP™door het wijzigen van de toegangsrechten in verband met de Tomcat directory en de bigParentDirectory:
         (De eigenlijke commando's hieronder zijn voor Linux. Voor andere besturingssystemen, maak analoge veranderingen.) 
        * Wijzig de "groep" naar Tomcat, uw gebruikersnaam of de naam van een kleine groep die Tomcat en alle beheerders van Tomcat omvat/ERDDAP, bijvoorbeeld,
chgrp -R _yourUserName_ apache-tomcat-_8.02.23_
chgrp -R _jouw Gebruikersnaam bigParentDirectory_
        * Verander toegangsrechten zodat Tomcat en de groep hebben gelezen, schrijven, uitvoeren privileges, bijvoorbeeld,.
chmod -R ug+rwx apache-tomcat-_8.02.23_
chmod -R ug+rwx _bigParentDirectory_
        * Verwijder "andere" gebruikersrechten om te lezen, te schrijven of uit te voeren:
chmod -R o-rwx apache-tomcat-_8.02.23_
chmod -R o-rwx _bigParentDirectory_
Dit is belangrijk, omdat het voorkomt dat andere gebruikers mogelijk gevoelige informatie inERDDAP™instellen van bestanden, logbestanden en bestanden met informatie over private datasets.
    * Het authenticatie/login systeem werd vernieuwd. Dankzij Thomas Gardner, Emanuele Lombardi en de nieuwe regering van de VS[HTTPS-alleen standaard](https://home.dotgov.gov/management/preloading/dotgovhttps/).
        * De authenticatie=openische optie werd verwijderd. Het was verouderd.
        * De nieuwe, aanbevolen,[authenticatie=google](/docs/server-admin/additional-information#google)optie gebruikt Google Aanmelden (gebaseerd op OAuth 2.0) om iedereen met een Google-e-mailaccount toe te staan (inclusief Google beheerde accounts zoals@noaa.gov) om in te loggen.
        * De nieuwe,[authenticatie=email](/docs/server-admin/additional-information#email)optie is een back-up voor authenticatie=google. Het staat gebruikers met een&lt;gebruiker&gt; tag indatasets.xmlom in te loggen door ze een e-mail te sturen met een speciale link.
        * In uw setup.xml, wijzig de beschrijving voor&lt;authenticatie&gt; te zijn
```
            <!-- If you want to restrict access to some datasets, 
            you need to specify the method used for logging on (authentication).
            See the info at 
            https://erddap.github.io/setup.html#security
            Currently, the options are: "" (logins not supported, the default), 
            "custom", "email", and "google" (recommended).  
            \\[No longer supported: "basic", "openid"\\]
            -->
```

        * In uw setup.xml, voeg dit recht onder de&lt;authenticatie&gt; label
```
            <!-- If authentication=google, you must supply your Google Client ID. 
            See
            https://developers.google.com/identity/sign-in/web/devconsole-project
            When setting this up, for Authorized JavaScript origins, 
            for testing on your computer, use the domain "localhost" 
            (e.g., origin=https://localhost:8443), 
            not "127.0.0.1" (because Google Sign-In doesn't work with anything 
            at that domain).
            This will be a string of about 75 characters, probably starting with
            several digits and ending with .apps.googleusercontent.com .
            -->
            <googleClientID></googleClientID>
```

        * Nu kunnen gebruikers die niet zijn ingelogd gebruikenhttpofhttpsURL's (als u dit hebt ingesteld&lt;baseHttpsUrl&gt; in uw setup.xml). Dankzij de nieuwe regering van de VS[HTTPS-alleen standaard](https://https.cio.gov/).
        * Nu kunt u alle gebruikers aanmoedigen om te gebruikenhttps  (niethttp) door het instellen&lt;baseUrl&gt; om eenhttpsURL. Gebruikers dwingen alleen te gebruikenhttps, u moet ook wijzigingen aanbrengen in uw Apache/Tomcat setup om niet-httpsToegang. Dankzij de nieuwe regering van de VS[HTTPS-alleen standaard](https://https.cio.gov/).
            
In uw setup.xml, wijzig de beschrijving voor&lt;baseUrl&gt; te zijn
```
            <!-- baseUrl is the start of the public URL, to which "/erddap" 
            is appended. For example:
            For running/testing on your personal computer:
              <baseUrl>http://localhost:8080</baseUrl>     
              (127.0.0.1 doesn't work with authentication=google).
            If you want to encourage all users to use https (not http), 
              make the baseUrl the same as the baseHttpsUrl (see below).
            For ERD releases, we used to use
              <baseUrl>http://coastwatch.pfeg.noaa.gov</baseUrl>    
            For ERD releases, we now use
              <baseUrl>https://coastwatch.pfeg.noaa.gov</baseUrl>    
            -->
```

        * De opties&lt;wachtwoordcodering&gt; veranderd. In uw setup.xml, wijzig de beschrijving voor&lt;wachtwoordCoding&gt; te zijn
```
            <!-- For "custom" authentication, this specifies how you have 
            stored passwords in the roles tags in datasets.xml.
            If you aren't storing any passwords, this is irrelevant.
            The options (in order of increasing security) are: 
            "MD5", "UEPMD5" (MD5(UserName:ERDDAP:Password)), 
            "SHA256", "UEPSHA256" (SHA256(UserName:ERDDAP:Password), 
            the default).
            You should only use "MD5" or "SHA256" if you need to match 
            values stored that way in an external password database.
            See the info at 
            https://erddap.github.io/setup.html#security
            --> 
```

        * In uw setup.xml, wijzig de beschrijving voor&lt;baseHttpsUrl&gt; te zijn
```
            <!-- This is a variant of <baseUrl> which is used when 
            authentication is active and the user is logged in.
            In general, you take the <baseUrl>, change "http" to "https", 
            and change/add ":8443". This must begin with "https://".
            If you make a proxy so that ":8443" isn't needed, 
            then don't use ":8443" here.
            This is relevant even if <authentication> is "".
            See the instructions at 
            https://erddap.github.io/setup.html#security
            For example:
            For running/testing on your personal computer:
              <baseHttpsUrl>https://localhost:8443</baseHttpsUrl>                  
            For releases at ERD, we use:
              <baseHttpsUrl>https://coastwatch.pfeg.noaa.gov</baseHttpsUrl>  
            If you want to encourage all users to use https (not http), 
              make the baseUrl (see above) the same as the baseHttpsUrl.
            --> 
```

        * Nu, als lijstPrivateDatasets=true in setup.xml, zal nog minder informatie worden getoond over datasets waar een gebruiker geen toegang tot heeft.
    * Nu, vooral voor wanneer u in eerste instantie het opzetten van uwERDDAP, kun je nu vertellenERDDAP™niet proberen te abonneren op remoteERDDAP™datasets. Dankzij Filipe Rocha Freire.
In uw setup.xml, vlak voor&lt;lettertypeFamily&gt;, toe te voegen
```
        <!-- Normally, if you have a EDDGridFromErddap or EDDTableFromErddap 
        dataset in your datasets.xml, it will try to subscribe to the remote 
        ERDDAP™ dataset so that the local dataset is kept perfectly up-to-date.
        If this ERDDAP™ is not publicly accessible (http://localhost), or its
        IP address will change soon, or you have some other reason, 
        you can tell this ERDDAP™ to not try to subscribe to the remote 
        ERDDAP™ datasets by setting this to false. (default=true) 
        This is the overall setting for this ERDDAP. It can be overridden by
        the same tag (with a different value) in the datasets.xml chunk for 
        a given EDD...FromErddap dataset. 
        For each fromErddap dataset that doesn't subscribe to the remote 
        ERDDAP™ dataset, you should set <reloadEveryNMinutes> to a smaller 
        number so that the local dataset stays reasonably up-to-date. -->
        <subscribeToRemoteErddapDataset>true</subscribeToRemoteErddapDataset>
```

    * In uw setup.xml, in de instructies hierboven&lt;e-mailFromAddress&gt;, voeg toe:
Stel dit zo mogelijk in om een beveiligde verbinding te gebruiken (SSL / TLS) naar de e-mailserver.
Als uw installatie geen beveiligde verbinding met de e-mailserver gebruikt, dan kunt u de wijzigingen aanbrengen.
    * In uwdatasets.xml, voeg deze regel toe aan de beschrijving van&lt;abonnementE-mailBlacklist&gt; in uwdatasets.xml:
U kunt de naam gebruiken "\\*" om een heel domein op de zwarte lijst te zetten, bijvoorbeeld,\\*@example.com .
    * Sinds de wijziging in het logsysteem in v1.66 is het logbestand nooit up-to-date. Er zijn altijd berichten of delen van berichten die wachten om naar het logbestand te worden geschreven. Je kunt het up-to-date maken. (voor een moment) door uwERDDAP's status webpagina op http://_your.domain.org_/erddap/status.html .
    * HashDigest ......
    * Een kleine verandering (naar String2.canonisch) dat moet helpen om dingen snel te laten gaan wanneerERDDAP™is zeer druk en ook beter omgaan met een zeer groot aantal datasets.
    * Sterk Aanbevolen: stoppen met gebruik&lt;converteren naarPublicSourceUrl&gt; indatasets.xmlom een IP-nummer te converteren naar een dataset&lt;sourceUrl&gt; (bv. http://192.168.#.#/ ) in een domeinnaam (bv.http:my.domein.org/) . Vanaf nu, nieuwe abonnementen op http://localhost , http://127.0.0.1 en http://192.168.#.# URL's zijn om veiligheidsredenen niet toegestaan. Dus gebruik altijd de publieke domeinnaam in de&lt;sourceUrl&gt; tag (indien nodig vanwege DNS problemen) , u kunt de[/etc/hosts-tabel op uw server](https://linux.die.net/man/5/hosts)om het probleem op te lossen door lokale domeinnamen te converteren naar IP-nummers zonder gebruik te maken van een DNS-server. U kunt testen of een bepaalde domeinnaam goed wordt opgelost met behulp van
_some.domain.name_
    * In generateDatasets.xml, voor remote datasets (b.v. van een THredDS-server) , de automatisch gegenereerddatasetIDs zijn voor de meeste domeinen ongewijzigd. Voor een paar domeinen, het eerste deel (d.w.z. de naam) van de automatisch gegenereerdedatasetIDzal een beetje anders zijn. Met name namen die één deel hadden hebben nu meer kans op twee delen. Bijvoorbeeld datasets van http://oos.soest.hawaii.edu eerder leidde totdatasetIDs die begon met hawaii\\_, maar nu leiden totdatasetIDs dat begint met hawaii\\_soest\\_ . Als dit problemen voor u veroorzaakt, mail me dan. Er kan een oplossing zijn.
    * De Cassandra driver werd bijgewerkt naar cassandra-driver-core-3.0.0.jar en dus voor Cassandra v3. EDDtableVanCassandra maakt geen gebruik van nieuwe functies in Cassandra v3. Indexen in Cassandra kunnen nu complexer zijn, maarERDDAP™nog steeds gebruik maakt van het Cassandra v2 index model, die ervan uitgaat dat een geïndexeerde kolom direct kan worden gevraagd met'='beperkingen. GenererenDatasets Xml voor EDDTableFromCassandra detecteert geen kolommen meer met indexen; als een index eenvoudig is, moet u deze specificeren indatasets.xmlMet de hand. Als je ondersteuning nodig hebt voor complexere indexen of andere nieuwe functies, e-mail danerd.data at noaa.gov.
&#33;&#33; Als u Cassandra 2.x nog steeds gebruikt, ga dan door met het gebruikERDDAP™v1.68 tot je upgrade naar Cassandra 3.x.
    * Jars en de Classpath -- Bijna alle bestanden van derden werden bijgewerkt naar hun nieuwste versies.
        * slf4j.jar werd toegevoegd aan /lib en het klassepad.
        * Joid. pot en tsik. pot werden verwijderd van /lib en het klassepad.
        * Als u foutmeldingen over klassen niet gevonden wanneer u compileert of uitvoertERDDAP™of een van de tools, vergelijk het klassepad van de commandoregel metERDDAP's[huidige klassepad](/docs/contributing/programmer-guide#development-environment)om uit te zoeken welke .jars ontbreken in je klaspad.

## Versie 1.68{#version-168} 
 (uitgebracht 2016-02-08) 

*    **Nieuwe functies (voor gebruikers) :** Geen.
     
*    **DingenERDDAP™Beheerders moeten weten en doen:** 
    *   [EDDGridFromFiles Aggregation via bestandsnamen of globale metadata](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata)--
Alle variaties vanEDDGridFromFiles kan nu een groep bestanden samenvoegen door een nieuwe linkse dimensie toe te voegen, meestal tijd, gebaseerd op een waarde afgeleid van elke bestandsnaam of van de waarde van een globaal attribuut dat in elk bestand zit.
    * VERBETERD: We eerder suggereerden dat u misschien wilt eenEDDGridFromErdap dataset in uwdatasets.xmldie de jplMU genoemd en serveerdeRSST dataset in onzeERDDAP. Aangezien er nu een nieuwere versie van die dataset is, is die dataset nu verouderd. Dus als je die dataset in jeERDDAP™, voeg deze nieuwe dataset toe
```
        <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">  
          <!-- Multi-scale Ultra-high Resolution (MUR) SST analysis fv04.1, Global, 0.011 Degree, Daily -->  
          <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>  
        </dataset>  
```
Als u de oude jplMU wilt verwijderenRSST dataset van uwERDDAP™  (Het is jouw keuze.) , verander de actieve instelling van "true" in "false."
    * Bugfix: Controleer de bigParentDirectory die u hebt opgegeven in uw setup.xml. Als je geen slash op het einde van de&lt;bigParentDirectory&gt; naam, danERDDAP™zal meerdere mappen hebben aangemaakt door woorden direct toe te voegen aan de naam die u hebt opgegeven, in plaats van submappen te maken. Te beginnen met versie 1.68,ERDDAP™voegt een slash toe aan het einde van de mapnaam als je er geen hebt opgegeven. Dus als je eerder geen slash hebt opgegeven aan het einde, dan wanneer je installeertERDDAP™v1.68 u moet verplaatsen en hernoemen die mappen **na** je sluit de oudeERDDAP™en **voor** je start de nieuweERDDAP. Bijvoorbeeld, als je bigParentDirectory per ongeluk hebt opgegeven als /home/erdapBPD (geen achterwaartse slash) enERDDAP™heeft ten onrechte mappen als
/home/erdapBPDcache
/home/erdapBPDCopy
/home/erdapBPDdataset
/home/erddapBPDflag
/home/erdapBPDlogs
thuis/erdapBPDluceen
en een bestand met de naam /home/erddapBPDabonnementenV1.txt,
dan moet je ze verplaatsen en hernoemen om
/home/erdapBPD/cache
/home/erdapBPD/copy
/home/erdapBPD/dataset
/home/erdapBPD/vlag
/home/erdapBPD/logs
/home/erdapBPD/luceen
en /home/erddapBPD/abonnementenV1.txt
    * Bugfix: Er zaten insecten in.EDDGridLonPM180 inERDDAP™v1.66 dat zich voordeed wanneer de kindset eenEDDGridVan Erddap.
    * Bugfix: Er was een insect inEDDGridFromFiles en EDDTable FromFiles inERDDAP™v1.66 veroorzaakt&lt;UpdateEveryNMillis&gt; te negeren de eerste keer dat de dataset werd geladen na een herstart.
    * Bugfix/Nieuwe functie: Als een dochterset binnenEDDGridAggregatedExistingDimensionEDDGridBegrepen.EDDGridFromEDDTable,EDDGridLonPM180,EDDGridSideBySide, EDDtableCopy, of EDDtableVanEDDGridis een ...FromErdap dataset, die ouder dataset nu abonneert op de onderliggendeERDDAP™dataset. Indien de onderliggende waardeERDDAP™dataset is in hetzelfdeERDDAP™, het abonnement en de validatie ervan worden direct gedaan; u krijgt geen e-mail waarin u wordt gevraagd om het abonnement te valideren. Anders, als het abonnementssysteem voor uwERDDAP™is uitgeschakeld, zet de&lt;herladenEveryNMinutes&gt; instelling voor de ouderset naar een klein getal (60?) zodat het up-to-date blijft.
    * Bugfix/Nieuwe functie: Als een dochterset binnenEDDGridAggregatedExistingDimensionEDDGridBegrepen.EDDGridFromEDDTable,EDDGridLonPM180,EDDGridSideBySide, EDDtableCopy, of EDDtableVanEDDGridheeft actief="valse," dat kind dataset is nu overgeslagen.

## Versie 1.66{#version-166} 
 (uitgebracht 2016-01-19) 

*    **Nieuwe functies (voor gebruikers) :** 
    * Grafieken (geen kaarten) kan nu dalende waarden op de assen. Om dit te krijgen bij het gebruik van een Make A Graph webpagina, verander nieuwe Y As: oplopende instelling (de standaard) om af te dalen. Of, in een URL die een grafiek vraagt, gebruik de nieuwe optionele 3e '|" parameter voor de[&.x Bereik en/of &. yRange schakelaars](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands), wat niets kan zijn (de standaard) , waar, of t om oplopende waarden te krijgen, of gebruik valse of f om dalende waarden te krijgen. Het ware|valse waarden zijn hoofdletterongevoelig. Dankzij Chris Fullilove, John Kerfoot, Luke Campbell en Cara Wilson.
    * Gebruikers kunnen nu de achtergrondkleur voor grafieken opgeven door een &.bgColor=0x_ toe te voegen AARRGGBB_ schakel naar de URL die de grafiek vraagt. Zie .bgColor in de Grafische Commando's sectie van de[griddap](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands)en[tabledap](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#GraphicsCommands)documentatie. Dankzij John Kerfoot en Luke Campbell.
    * Voor tabeldatasets kunnen beperkingen nu verwijzen naar min (_Een of andere variabelenaam_) max. (_Een of andere variabelenaam_) . Zie[min () en max () ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#min). Dankzij John Kerfoot.
    * Voor tabeldatasets, tijdsbeperkingen die gebruiken[nu](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now)kan nu tijd eenheden van milliseconden of millis specificeren.
    * Een verzoek om een afbeelding van een tabelset maakt nu een kaart (geen grafiek) als de x- en y-variabelen lengte- en breedtegraad-achtige variabelen zijn (compatibele eenheden) . Dankzij Rich Signell.
    * Bug fix: Time as labels en teken hadden soms onregelmatigheden bij het gelijktijdig aanvragen van meerdere grafieken (bijvoorbeeld op een webpagina) . Het probleem was een bug in de SGT grafische bibliotheek dieERDDAP™toepassingen (één variabele was "statisch" dat niet had mogen zijn) . Dankzij Bradford Butman.
         
*    **DingenERDDAP™Beheerders moeten weten en doen:** 
    * Het is een veiligheidsrisico om uw e-mail wachtwoord in een platte tekst bestand zoals setup.xml. Om dat probleem te verzachten, raden wij u ten zeerste aan:
        1. Een e-mailaccount instellen voorERDDAP's use, b.v., erddap@yourInstitution.org . Dat heeft ook andere voordelen, met name meer dan éénERDDAP™De beheerder kan dan toegang krijgen tot dat e-mailaccount.
        2. Maak de toegangsrechten van het setup.xml bestand rw (read+write) voor de gebruiker die Tomcat enERDDAP™  (gebruiker=tomcat?) en geen machtigingen (niet lezen of schrijven) voor de groep en andere gebruikers. Dankzij Filipe Rocha Freire.
    * Het nieuwe[ArchiefADataset](/docs/server-admin/additional-information#archiveadataset)hulpmiddel vereenvoudigt het maken van een.tar.gzarchief met een deelverzameling van een dataset in een formaat dat geschikt is voor archivering (met name:NOAA's NCII) . Dit zou voor velen nuttig moeten zijn.ERDDAP™beheerders in veel situaties, maar vooral voor groepen binnenNOAA.
    * Het nieuwe datasettype[EDDGridUitNcFilesUitgepakt](/docs/server-admin/datasets#eddgridfromncfilesunpacked)is een variant vanEDDGridVan NcFiles. Het verschil is dat deze klasse elk gegevensbestand uitpaktEDDGridFromFiles bekijkt de bestanden:
        
        * Het uitpakt verpakte variabelen die gebruikenscale\\_factoren/ofadd\\_offset.
        * Het bevordert integer variabelen die \\_Unsigned=true attributen hebben aan een groter integer datatype zodat de waarden verschijnen als de niet-signed waarden. Bijvoorbeeld, een \\_Unsigned=true byte (8 bit) variabele wordt een korte ondertekening (16 bit) variabele.
        * Het zet \\_FillValue enmissing\\_valuewaarden te zijn NaN's (of MAX\\_VALUE voor gehele gegevenstypen) .
        
Het grote voordeel van deze klasse is dat het biedt een manier om te gaan met verschillende waarden vanscale\\_factor,add\\_offset, \\_FillValue, ofmissing\\_valuein verschillende bestanden in een verzameling. Anders zou je een tool als[NcML](/docs/server-admin/datasets#ncml-files)of[NCO](/docs/server-admin/datasets#netcdf-operators-nco)om elk bestand te wijzigen om de verschillen te verwijderen, zodat de bestanden kunnen worden behandeld doorEDDGridVan NcFiles. Om deze klasse goed te laten werken, moeten de bestanden de CF-standaarden voor de bijbehorende attributen volgen. Dankzij Philippe Makowski.
    * Het nieuwe datasettype[EDDGridLonPM180](/docs/server-admin/datasets#eddgridlonpm180)laat je datasets wijzigen die een lengtegraad hebben van meer dan 180 (bv. het bereik van 0 tot 360) in datasets met lengtegraden binnen het bereik -180 tot 180 (Lengtegraad plus of min 180, vandaar de naam) . Het grote voordeel van het aanbieden van datasets met lengtegraden in het bereik -180 tot 180 is datOGCdiensten (bv.WMS) de lengtegraadwaarden in dit bereik. Dankzij Lynne Tablewski, Fabien Guichard, Philippe Makowski en Martin Spel.
2016-01-26 Update: Eeek&#33; Dit heeft een fout die optreedt wanneer het kind dataset is eenEDDGridUitErdap dat verwijst naar een dataset in hetzelfdeERDDAP. Deze bug is gerepareerd inERDDAP™v1.68.
    * In[GenererenDatasetsXml](/docs/server-admin/datasets#generatedatasetsxml), een nieuw speciaal datasettype,EDDGridLonPM180Van ErddapCatalog, kunt u de genererendatasets.xmlvoorEDDGridLonPM180 datasets van alleEDDGriddatasets in eenERDDAPmet een lengtegraad van meer dan 180.
    * Voor iedereenEDDGriddatasets, indatasets.xmlu kunt nu gebruik maken van de optie
[&lt;toegankelijk ViaWMS&gt;true|onwaar&lt;/toegankelijk ViaWMS&gt;] (/docs/server-admin/datasets#accessibleviawms)   (default=true) . Het instellen van dit op valse met geweld uitschakelen van deWMSservice voor deze dataset. Indien waar, kan de dataset nog steeds niet toegankelijk zijn viaWMSom andere redenen (b.v. geen lat- of lonassen) . Dit is vooral nuttig voor datasets die op hun eigen en verpakt doorEDDGridLonPM180, zodat alleen de LonPM180 versie toegankelijk is viaWMS.
    * In setup.xml kunt u een andere standaardkleur opgeven voor de achtergrond van grafieken. De kleur is gespecificeerd als een achtcijferige hexadecimale waarde in de vorm 0x_AARRGGBB_, waarbij AA, RR, GG en BB respectievelijk de ondoorzichtigheid, rood, groen en blauw componenten zijn, gespecificeerd als 2-cijferige hexadecimale getallen. Merk op dat het canvas altijd ondoorzichtig wit is, dus een (semi -) transparante grafiek achtergrond kleur past in het witte canvas. De standaard is lichtblauw:
```
        <graphBackgroundColor>0xffccccff</graphBackgroundColor>  
```
Dankzij John Kerfoot en Luke Campbell.
    * In setup.xml kunt u nu de maximale grootte voor de[logbestand](/docs/server-admin/additional-information#log)  (wanneer het omgedoopt wordt tot loggen. txt. vorige en een nieuw logboek. txt is aangemaakt) In MegaBytes. Het minimum is 1. Het maximum is 2000. Standaard is 20 (MB) . Bijvoorbeeld:
```
        <logMaxSizeMB>20</logMaxSizeMB>
```
    * Indatasets.xml, [&lt;fgdcBestand&gt;] (/docs/server-admin/datasets#fgdcfile) of [&lt;iso19115Bestand&gt;] (/docs/server-admin/datasets#iso19115file) kan nu een lokaal bestand zijn (zoals voorheen) of een URL (die zal worden gedownload, zodat er een lokale kopie is) . AlsERDDAP™kan het bestand niet downloaden, het laden van de dataset zal doorgaan, maar de dataset zal geen fgdc of iso19115 bestand hebben.
    *   EDDGridFromFiles en EDDTable FromFiles datasets kunnen nu een quickRestart doen (het systeem datERDDAP™probeert te gebruiken wanneer datasets voor het eerst worden geladen wanneerERDDAP™wordt herstart) . Dit versnelt herstartenERDDAP.
2016-01-26 Update: Eeek&#33; Dit heeft een bug die&lt;updateEveryNMillis&gt; wordt genegeerd de eerste keer dat de dataset wordt geladen na een herstart. Deze bug is gerepareerd inERDDAP™v1.68.
    * Een algemene verbetering van het quickRestart systeem maakt het mogelijkERDDAP™datasets sneller laden wanneerERDDAP™opnieuw gestart.
    * AllesEDDGridFromFiles en EDDTable FromFiles-subklassen accepteren nu een nieuwe&lt;padRegex&gt;-tag, meestal hieronder aangegeven&lt;recursief&gt;. Als recursief "waar" is, zijn alleen volledige subdirectory paden die overeenkomen met het padRegex (standaard=".\\*") zal worden aanvaard. Ook een&lt;sourceUrls&gt; tag in eenEDDGridAggregatedExistingDimension kan nu een padRegex attribuut bevatten (standaard=".\\*") .
    * De standaard voor&lt;partialRequestMaxBytes&gt; in setup.xml is nu 490000000 (~490 MB) . Dit voorkomt dat sommige problemen/timeouts met betrekking tot het verkrijgen van gegevens van THREDDS data servers. Dankzij Leslie Thorne.
    * Een kleine wijziging van het logsysteem moet toelatenERDDAP™om meer responsief te zijn als het erg druk is. Informatie wordt nu geschreven naar het logbestand op de disk drive in vrij grote brokken. Het voordeel is dat dit zeer efficiënt is --ERDDAP™zal nooit blokkeren wachten tot informatie naar het logbestand wordt geschreven. Het nadeel is dat het logboek bijna altijd eindigt met een gedeeltelijk bericht, dat pas wordt ingevuld als het volgende stuk is geschreven.
    * Bug fix met betrekking tot inotify en de [&lt;updateEveryNMillis&gt;] (/docs/server-admin/datasets#updateeveryonmillis) systeem voorEDDGridFromFiles en EDDTable Datasets van FromFiles: Het is niet langer nodig om een groot aantal fs.innotify.max\\_user\\_watches of fs.innotify.max\\_user\\_instances te specificeren. Er zit een bug inJavadat veroorzaakt sommige delen vanJava's inotify / WatchDirectory systeem niet vuilnis verzameld wanneer ze zijn voltooid; uiteindelijk, het aantal zombie inotify horloges of instanties zou het maximum aantal opgegeven overschrijden.ERDDAP™nu werkt rond ditJavaInsect.
Ook is het aantal inotify threads vermeld op de status.html webpagina, zodat u een oogje kunt houden op het gebruik ervan. Typisch is er 1 inotify thread perEDDGridFromFiles en EDDTable FromFiles dataset.
    * Bug fix: op veel plaatsen, in plaats van een fout wordt gerethrown, een nieuwe fout werd gegenereerd die alleen een korte versie van de oorspronkelijke foutmelding en zonder de stack trace bevatte. Nu, wanneer een nieuwe fout wordt gegenereerd, bevat het de volledige originele uitzondering, bijvoorbeeld, gooi nieuwe Exception ("een nieuw bericht," e) ;
Dankzij Susan Perkins.
    * Bugfix: tot voor kort (V1.64?) , indien een .../datasetIDURL werd gevraagd,ERDDAP™zou .html toevoegen aan de URL. In v1.64 is dit mislukt (een onjuist geformatteerde URL is aangemaakt en vervolgens mislukt) . Dit werkt weer. Dankzij Chris Fullilove.

## Versie 1.64{#version-164} 
 (uitgebracht 2015-08-19) 

*    **Nieuwe functies (voor gebruikers) :** 
    * Er is nu begeleiding voor toegang tot het wachtwoord beveiligde privéERDDAP™datasets (https://) viacurlenPython. Zie[curl](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#curl)en[Python](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#Python)instructies.
Dankzij Emilio Mayorga van NANOOS en Paul Janecek van Spyglass Technologies.
         
*    **DingenERDDAP™Beheerders moeten weten en doen:** 
    *   ERDDAP™nu vereistJava1,8+.
        Java1.7 bereikte zijn[einde van het leven](https://www.oracle.com/technetwork/java/eol-135779.html)  (geen beveiligingsupdates meer) in april 2015. Deze versie vanERDDAP™zal niet werken met versies vanJavaminder dan 1,8. Als u update vanJava1,7x (of eerder) Je moet Tomcat ook updaten. Zie[ERDDAP™Instructies instellen](/docs/server-admin/deploy-install)voor het downloaden van links en advies.
    * Nieuw Data Provider Form.
Wanneer een data provider komt naar u in de hoop om sommige gegevens toe te voegen aan uwERDDAP™, het kan moeilijk en tijdrovend zijn om alle metadata te verzamelen die nodig zijn om de dataset inERDDAP. Veel gegevensbronnen (bijvoorbeeld .csv-bestanden, Excel-bestanden, databases) geen interne metadata hebben, dusERDDAP™beschikt over een nieuw Data Provider Form dat metadata verzamelt van de dataprovider en de dataprovider enige andere begeleiding geeft, waaronder uitgebreide begeleiding voor Data In Databases. De ingediende informatie wordt omgezet in dedatasets.xmlformaat en vervolgens gemaild naar deERDDAP™beheerder (u) en geschreven (bijlage) naar bigParentDirectory/logs/dataProviderForm.log . Dus, de vorm semi-automatiseert het proces van het krijgen van een dataset inERDDAP™, maar deERDDAP™De beheerder moet dedatasets.xmlbrok en omgaan met het verkrijgen van het gegevensbestand (s) van de aanbieder of verbinding met de database. Voor meer informatie, zie de[Gegevensaanbieder Formulierbeschrijving](/docs/server-admin/datasets#data-provider-form).
    * Nieuw&lt;MatchAxisNDigits&gt;
kan worden gebruikt doorEDDGridFromFiles (en dus vanNcFiles en vanMergeIRFiles) ,EDDGridAggregatedExistingDimensionEDDGridBegrepen, enEDDGridSideBySide-datasets om aan te geven hoe precies de aswaarden in verschillende bestanden moeten zijn (hoeveel cijfers) : 0=geen controle (Gebruik dit niet&#33;) , 1-18 voor verhoogde precisie, of 20 (de standaard) voor exacte gelijkheid. Voor n=1-18,ERDDAP™zorgt ervoor dat de eerste n cijfers van dubbele waarden (of (n+1) div 2 voor variabele waarden) Zijn gelijk.
        &lt;matchAxisNDigits&gt; vervangt&lt;Zorg ervoor datAxisValuesAreEqual&gt;, die nu verouderd is. Een waarde van 'true' wordt omgezet naar matchAxisNDigits=20. Een waarde van 'vals' (Doe dit niet&#33;) zal worden omgezet naar match AsNDigits=0.
    *   EDDGridFromFiles en EDDTable FromFiles zal de eerste keer dat u deze versie vanERDDAP.
        ERDDAP™slaat nu de interne bestandsinformatie een beetje anders op, zodat de interne bestandstabel voor elk van deze datasets moet worden herbouwd. Dus maak je geen zorgen. Er is niets mis. Het is eenmalig.
    * Bronbestanden op afstand
        EDDGridFromNcFiles, EDDTableFromNcFiles, EDDTableFromNcCFFiles staan nu toe dat de bestanden bestanden op afstand zijn in een directory toegankelijk doorhttp://  (en waarschijnlijkhttps://en ftp://, maar ze zijn niet getest) als de externe server ondersteunt[Bereikverzoeken](https://en.wikipedia.org/wiki/Byte_serving)in de verzoekkop. THREDDS en Amazon S3-ondersteuningsbereikverzoeken,HyraxNee. Met dit systeem kunt u toegang krijgen tot gegevens in bestanden op afstand zonder de bestanden te downloaden (wat nuttig is als de remote bestanden te volumineuze zijn) , maar toegang tot deze bestanden zal veel langzamer zijn dan toegang tot lokale bestanden of zelfs tot een remoteOPeNDAPbron.
Dit omvat"files"in een Amazon S3-emmer aangezien ze viahttp://. Als de S3-objectnamen als bestandsnamen zijn (met interne /'s als een Linux directory boom) ,ERDDAP™kan de bestanden ook toegankelijk maken viaERDDAP's"files"systeem. Om dit te laten werken, moeten uw S3-gegevens in ~/.aws/intelligences staan (op Linux, OS X of Unix) , of C:\\Users\\USERNAME\\.aws\\credenties (op Windows) op de server metERDDAP. Zie[Amazon SDK-documentatie](https://docs.aws.amazon.com/sdk-for-java/?id=docs_gateway#aws-sdk-for-java,-version-1).
    * GenererenDatasets Xml heeft een nieuwe, ongebruikelijke optie: EDDsFromFiles.
Dit gaat via een bestandssysteem (zelfs een remote systeem als een Amazon S3 als de objecten bestandsachtige namen hebben) en creëer dedatasets.xmlbrokken voor een reeks datasets. Je kilometers kunnen variëren. Dit werkt goed als de bestanden zijn georganiseerd, zodat alle gegevensbestanden in een bepaalde map (en haar submappen) geschikt zijn voor één dataset (b.v. alle SST 1-daagse composieten) . Anders (Bijvoorbeeld, als een directory enkele SST-bestanden bevat en enkele Chlorofyl-a bestanden) , dit werkt slecht maar kan nog steeds nuttig zijn.
    * Programmeurs: nieuwe /lib .jar bestanden.
Als u compileertERDDAP™, let op de nieuwe .jar bestanden in de classpath -cp parameter in deERDDAP™ [Programmagids](/docs/contributing/programmer-guide).
    * zee\\_water\\_praktisch\\_zilverschap
Als je de CF standaard naam zee\\_water\\_zaligheid voor elke variabele, Ik moedig je aan om over te schakelen naar zee\\_water\\_praktisch\\_zaligheid die beschikbaar is in[versie 29 van de standaardnaamtabel CF](https://cfconventions.org/Data/cf-standard-names/29/build/cf-standard-name-table.html)  (en sommige eerdere versies -- ik wist niet dat) . Deze naam geeft aan dat dit inderdaad een praktische Salinity waarde met behulp vanPractical Salinity Units  (PSU) , in tegenstelling tot een oudere g/kg waarde. De canonieke eenheden zijn anders, maar nog steeds ongelooflijk onhandig: 1 (vermoedelijk impliceertPSUPSS-78) , in tegenstelling tot 1e-3 (vermoedelijk g/kg) voor zee\\_water\\_zaligheid.\\[Hey,Unidataen CF: We identificeren waarden die andere schalen gebruiken, bijvoorbeeld Fahrenheit of Celsius, via een eenheid string die de naam van de schaal of enige variatie is. Waarom kunnen we geen saliniteitseenheden identificeren via hun schaal, bijvoorbeeld, PSS-78? Ik weet het: PSS-78 waarden zijn "unitless," maar er is een impliciete schaal, is het niet? Als ik een nieuwe praktische saliniteitsschaal verzin waar de waarden 0,875 keer de PSS-78 waarden zijn, moeten de canonieke eenheden dan nog "1" zijn? Hoe kan een gebruiker ze uit elkaar houden? Eenheden van 1e-3 en 1 zijn noch beschrijvend noch nuttig voor gebruikers die proberen te achterhalen wat de getallen aangeven.\\]

## Versie 1.62{#version-162} 
 (vrijgegeven 2015-06-08) 

*    **Nieuwe functies (voor gebruikers) :** 
    * VoorEDDGriddatasets, gebruikers kunnen nu Graph Type maken: Oppervlakte grafieken met elke combinatie van numerieke assen, niet alleen lengte versus breedtegraad. Dit laat je x versus y maken (voorzien) grafieken en diversen[Hovmöller-diagrammen](https://en.wikipedia.org/wiki/Hovm%C3%B6ller_diagram), bijvoorbeeld, plotten lengte versus diepte, of tijd versus diepte.\\[Opmerking: als de diepte op de Y-as ligt, zal het waarschijnlijk worden omgedraaid van wat je wilt. Sorry, het is nog geen optie.\\]Dankzij Cara Wilson en Lynn DeWitt.
    * Er is een nieuwe[Oceanic/Atmospheric Acronym Converter](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericAcronyms.html)waarmee je een gemeenschappelijk oceanisch/atmosferisch acroniem kunt omzetten naar/van een volledige naam.
    * Er is een nieuwe[Oceanisch/Atmosferisch Variabele namen Converter](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericVariableNames.html)waarmee je een gewone oceanische/atmosferische variabele naam kunt omzetten naar/van een volledige naam.
*    **DingenERDDAP™Beheerders moeten weten en doen:** 
    *   Java7/8
        Oracleniet langer ondersteunt (biedt beveiliging bug fixes voor)  Java7.ERDDAP™nog steeds ondersteuntJava7, maar ga naarJava8. De volgende release vanERDDAP™zal waarschijnlijk nodigJava8.
    *   valid\\_min/max/bereik
Wat voorafging:dataVariablehadscale\\_factorenadd\\_offsetmetagegevens;ERDDAP™Uitpakt de gegevenswaarden en verwijdert die metagegevens. Wat voorafging:ERDDAP™geen wijzigingen/uitpakkenvalid\\_range,valid\\_min,valid\\_maxmetagegevens (die gewoonlijk/moeten verpakte waarden bevatten) doorscale\\_factorenadd\\_offset. Nu wel. Zoek uwERDDAP™voor "valid\\_" en zorg ervoor dat alle variabelen dievalid\\_range,valid\\_min, ofvalid\\_maxhebben de juiste waarden wanneer de datasets verschijnen in de nieuwe versie vanERDDAP. Zie[valid\\_range/min/max documentatie](/docs/server-admin/datasets#valid_range).
    * ACDD-1.3
Wat voorafging:ERDDAP™  (met name GenererenDatasets Xml) gebruikt/aanbevolen het origineel (1,0) versie van de[NetCDFAttribuutverdrag voor gegevensverzamelingsontdekking](https://wiki.esipfed.org/ArchivalCopyOfVersion1)die werd aangeduid als "UnidataDataset Discovery v1.0" in de wereldwijde verdragen enMetadata\\_Conventionsattributen. Nu, raden we aan[ACDD versie 1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)die begin 2015 is geratificeerd en wordt aangeduid als "ACDD-1.3." Gelukkig is ACDD-1.3 zeer achterwaarts compatibel met versie 1.0. We BEVEELLEN AAN dat u[wissel naar ACDD-1.3](/docs/server-admin/datasets#switch-to-acdd-13). Het is niet moeilijk.
    * GenererenDatasets Xml-attributen
Er is een groot aantal wijzigingen aangebracht om de&lt;addAttributes&gt; waarden voorgesteld door GenerateDatasets Xml voor de mondiale verdragen,creator\\_name/email/url, trefwoorden, samenvatting en titelattributen en voor de variabelelong\\_namekenmerk. Sommige veranderingen houden verband met het nieuwe gebruik van ACDD-1.3.
    * EDDTabelVanSOSdatasets
Met de incidentele toevoeging van nieuwe soorten vanSOSservers en wijzigingen aan de oude servers, het wordt steeds moeilijker voorERDDAP™om automatisch het servertype op te sporen van de antwoorden van de server. Gebruik van [&lt;sosServerType&gt;] (/docs/server-admin/datasets#eddtablefromsos-skeleton-xml)   (met een waarde van IOOS\\_NDBC, IOOS\\_NOS,OOSTethys, of WHI) is nu sterk aanbevolen. Als een van uw datasets van dit type problemen heeft in de nieuwe versie vanERDDAP, probeer opnieuw draaien GenererenDatasets Xml voor deSOSserver om een nieuw brokje van te genererendatasets.xmlvoor die dataset. GenererenDatasets Xml laat je de verschillende testen&lt;sosServerType&gt; opties totdat u de juiste voor een bepaalde server vindt. Als je nog steeds problemen hebt, laat me dan het probleem weten dat je ziet en de URL van de server en ik zal proberen te helpen.
    * EDDtableFromFileNames datasets
Enkele attributen die werden aanbevolenaddAttributeszijn nu bronKenmerken. U hoeft waarschijnlijk niets te veranderen voor bestaande datasets in uwdatasets.xml.
    * Bugfix gerelateerd aan bepaalde verzoeken naar EDDTableFromNcCFFiles datasets.
Ik heb ook een groot aantal eenheidstests toegevoegd aan het bestaande grote aantal eenheidstests van de onderliggende methoden. (er zijn 100's van scenario's) . Dankzij Eli Hunter.
    * Bugfix/kleine wijzigingen inEDDGridVan Mergeir.
Dankzij Jonathan Lafite en Philippe Makowski
    * Bugfix:EDDGridFromErdap werkt nu zelfs als een externe dataset niet heeftioos\\_categoryvariabele kenmerken.
Dankzij Kevin O'Brien.
    * Bug fix in .graph web pagina voorEDDGriddatasets wanneer er slechts één asvariabele is met meer dan één waarde.
Dankzij Charles Carleton.
    * Er waren andere kleine verbeteringen, wijzigingen, en bug fixes.

## Versie 1.60{#version-160} 
 (vrijgegeven 2015-03-12) 

*    **Nieuwe functies (voor gebruikers) :** geen
*    **DingenERDDAP™Beheerders moeten weten en doen:** 
    * STRONGLY AANVAARD: Update uw server's[robots.txt](/docs/server-admin/additional-information#robotstxt)bestand om op te nemen:
Niet toestaan: /erddap/files
    * IMeld probleem en oplossing:
Op Linux computers, als u&lt;updateEveryNMillis&gt; met datasets met type=EDDGridFromFiles, EDDTableFromFiles,EDDGridKopiëren, EDDTableCopy, of hun subklassen, kunt u een probleem zien waar een dataset niet laden (soms of consequent) met de foutmelding: "IOException: Gebruikerslimiet van inotify instanties bereikt of te veel geopende bestanden." Zo ja, kunt u dit probleem oplossen door te bellen (als root) :
echo fs.innotify.max\\_user\\_horloges=65536|tee -a /etc/sysctl.conf
echo fs.innotify.max\\_user\\_instances=1024|tee -a /etc/sysctl.conf
sysctl -p
Of gebruik hogere getallen als het probleem aanhoudt. De standaard voor horloges is 8192. De standaard voor instanties is 128.\\[Er zit een bug inJavawat ervoor zorgt dat gevallen niet worden verzameld. Dit probleem wordt vermeden inERDDAP™v1.66 en hoger. Dus de betere oplossing is om over te schakelen naar de nieuwste versie vanERDDAP.\\]
    * NoSuchFileException Bug Fix:
Er was een bug die datasets van type kon veroorzaken=EDDGridFromFiles, EDDTableFromFiles,EDDGridKopiëren, EDDtableCopy, of hun subklassen om niet af en toe te laden met de fout "NoSuchFileException: _someFileName_." De bug is gerelateerd aan het gebruik van FileVisitor en werd geïntroduceerd inERDDAP™v1.56. Het probleem is zeldzaam en is waarschijnlijk van invloed op datasets met een groot aantal vaak veranderende gegevensbestanden.
    * Er waren enkele kleine verbeteringen, wijzigingen, en bug fixes.

## Versie 1.58{#version-158} 
 (vrijgegeven 2015-02-25) 

*    **Nieuwe functies (voor gebruikers) :** 
    * Het nieuwe["files"](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)systeem kunt u bladeren door een virtueel bestandssysteem en downloaden brongegevens bestanden van veleERDDAP™datasets. De"files"systeem is standaard actief, maarERDDAP™beheerders kunnen het uitschakelen door het plaatsen
```
        <filesActive>false</filesActive>  
```
in deERDDAP™setup.xml bestand. Speciale dank aan Philippe Makowski, die volhardde toen ik langzaam de schoonheid van dit idee waardeerde.
    * tijdsbestemming Max -- Voorheen had de tijdvariabele van EDDTable datasets met bijna real time data een bestemmingMax van NaN, wat impliceert dat de maximale tijdswaarde voor de dataset recent is, maar niet precies bekend en vaak verandert. Nu, de bestemmingMax heeft een echte waarde, wat aangeeft dat de huidige bekende laatste keer. Veel datasets hebben voortdurend gegevens bijgewerkt.ERDDAP™ondersteunt de toegang tot de nieuwste gegevens, zelfs als het na de momenteel bekende laatste keer. Merk op dat de nieuwe [&lt;updateEveryNMillis&gt;] (/docs/server-admin/datasets#updateeveryonmillis) steun inEDDGridFromFiles en EDDTable FromFiles datasets updates de tijd variabele bestemmingMax. Een ander gevolg van deze verandering is dat dedatasetID=allDatasetsdataset bevat nu de momenteel bekende laatste keer in de maxTime kolommen. Dankzij John Kerfoot.
*    **DingenERDDAP™Beheerders moeten weten en doen:** 
    * STRONGLY AANVAARD: Update uw server's[robots.txt](/docs/server-admin/additional-information#robotstxt)bestand om op te nemen:
Niet toestaan: /files/
Niet toestaan: /erddap/files
    * Monsterdatasets.xml-- Vorig jaar hebben we een aantal uitstekende datasets aanbevolen in de kustwachtERDDAP™dat u aan uwERDDAP™gewoon door het toevoegen van een paar regels aan uwdatasets.xml. Als je de erdVH datasets hebt toegevoegd, ga dan naar de nieuwere erdVH2 datasets:
        * Maak een kopie van alle erdVH datasets en verander de gekopieerdedatasetID's van erdVH... naar erdVH2... en verander de referentiesourceUrlVan ErdVH... tot ErdVH2...
        * Stel de erdVH... datasets in op active="valse."
    * AllesEDDGridFromFiles en EDDTable FromFiles-subklassen ondersteunen nu [&lt;toegankelijkViaFiles&gt;] (/docs/server-admin/datasets#accessibleviafiles) de brongegevensbestanden toegankelijk te maken via de"files"systemen. Standaard is dit systeem uitgeschakeld voor elke dataset. Je moet de tag toevoegen om het in te schakelen. Dankzij Philippe Makowski.
    * AllesEDDGridFromFiles en EDDTable FromFiles-subklassen ondersteunen nu [&lt;updateEveryNMillis&gt;] (/docs/server-admin/datasets#updateeveryonmillis) . Standaard is dit systeem uitgeschakeld voor elke dataset. Je moet de tag toevoegen om het in te schakelen. Dankzij Dominic Fuller-Rowell en NGDC.
    * Het nieuwe[EDDtableFromFileNames](/docs/server-admin/datasets#eddtablefromfilenames)maakt een dataset aan van informatie over een groep bestanden in het bestandssysteem van de server, maar het dient geen gegevens uit de bestanden. Dit is bijvoorbeeld handig voor het verspreiden van collecties van beeldbestanden, audiobestanden, videobestanden, tekstverwerkingsbestanden en spreadsheetbestanden. Dit werkt hand-in-hand met de nieuwe["files"](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)systeem, zodat gebruikers de bestanden kunnen downloaden. Speciale dank aan Philippe Makowski, die volhardde toen ik langzaam de schoonheid van dit idee waardeerde.
    * Het nieuwe[EDDGridFromEDTable](/docs/server-admin/datasets#eddgridfromeddtable)laat je een tabelset omzetten naar een gerasterde dataset. Dankzij Ocean Networks Canada.
    * Het nieuwe[EDDGridVanMergeIRFiles](/docs/server-admin/datasets#eddgridfrommergeirfiles)geaggregeerde gegevens van een groep lokale MergeIR.gzdossiers.EDDGridVanuitMergeIRFiles heeft het onderscheid van het zijn van de eerste brok code bijgedragen aanERDDAP. Het is helemaal gedaan zonder onze hulp. Drie hoera's en speciale dank aan Jonathan Lafite en Philippe Makowski van R.Tech Engineering.
    * Er is een nieuwe, optionele setup.xml tag,&lt;unitTestDataDir&gt;, die de directory specificeert met de unit testgegevensbestanden die beschikbaar zijn via een nieuwe GitHub repository:[ https://github.com/ERDDAP/erddapTest ](https://github.com/ERDDAP/erddapTest). Bijvoorbeeld:
```
        <unitTestDataDir>/erddapTest/</unitTestDataDir>  
```
Dit is nog niet nuttig, maar maakt deel uit van de stap naar het maken van zoveel mogelijk van de unit testen die door andere mensen mogelijk worden uitgevoerd. Dankzij Terry Rankine.
    * Er waren veel kleine verbeteringen, wijzigingen, en bug fixes.

## Versie 1.56{#version-156} 
 (uitgebracht 2014-12-16) 

*    **Nieuwe functies (voor gebruikers) :**   (Geen) 
*    **DingenERDDAP™Beheerders moeten weten en doen:** 
    * Je weet waarschijnlijk al over[EDDGridVanErdap](/docs/server-admin/datasets#eddfromerddap)en[EDDtabelVanErdap](/docs/server-admin/datasets#eddfromerddap)die u laten linken naar datasets in andereERDDAPen laat ze verschijnen in uwERDDAP. Gebruikersverzoeken voor actuele gegevens uit deze datasets worden onzichtbaar naar de bron geleidERDDAP™, zodat de gegevens niet door uw systeem stromen of uw bandbreedte gebruiken. Er is nu een grote lijst van aanbevolen datasets in het monsterdatasets.xmlin erddapContent.zip. Om ze op te nemen in uwERDDAP™, alles wat je hoeft te doen is kopiëren en plakken die je wilt in uwdatasets.xml. Dankzij Conor Delaney.
    * Als u compileertERDDAP™, moet je wat nieuwe . potje bestanden naar uw[classpath -cp switch](/docs/contributing/programmer-guide#development-environment)Voor Javac en Java.
    * Het nieuwe[EDDtabelVanCassandra](/docs/server-admin/datasets#eddtablefromcassandra)behandelt het verkrijgen van gegevens van[Cassandra](https://cassandra.apache.org/). Dankzij Ocean Networks Canada.
    * Het nieuwe[EDDTabelVan ColumbarAsciiFiles](/docs/server-admin/datasets#eddtablefromcolumnarasciifiles)verwerkt het verkrijgen van gegevens van ASCII-gegevensbestanden met vaste breedte kolommen. Dankzij Philippe Makowski.
    * AllesEDDGridFromFiles en EDDTable FromFiles subklassen gebruiken nu een nieuwe methode, FileVisitor (toegevoegd aanJava1,7) om informatie over de bestanden te verzamelen. Dit kan geen voordeel hebben voor de eerste verzameling van bestandsinformatie voor een bepaalde dataset, maar lijkt een enorm voordeel te hebben voor latere bijeenkomsten als dat binnenkort gebeurt, terwijl het besturingssysteem nog steeds de informatie gecached. Dankzij NGDC.
        
We raden nog steeds aan: Als een dataset een groot aantal bestanden heeft (bv. &gt; 1.000) , het besturingssysteem (en dusEDDGridFromFiles en EDDtableFromFiles) zal werken veel efficiënter als u de bestanden op te slaan in een reeks van submappen (één per jaar, of één per maand voor datasets met zeer frequente bestanden) , zodat er nooit een groot aantal bestanden in een bepaalde directory.
        
    * Verschillende kleine verbeteringen aan EDDTableFromAsciiFiles.
    * Enkele verbeteringen aan EDDTableFromAsciiServiceNOS, met name om een aantal extra kolommen van informatie uit de bron te krijgen. Dankzij Lynn DeWitt.
    * Enkele kleine foutjes in verband met de ISO 19115 dieERDDAP™genereert. Dankzij Anna Milan.

## Versie 1.54{#version-154} 
 (vrijgegeven 2014-10-24) 

*    **Nieuwe functies (voor gebruikers) :** 
    * Sommige variabelen werken nu met de precisie van de milliseconden, bijvoorbeeld 2014-10-24T16:41:22.485Z. Dankzij Dominic Fuller-Rowell.
*    **Kleine wijzigingen/Bugfixes:** 
    * Bugfix: met een bepaalde combinatie van omstandigheden,EDDGridFromNcFile datasets gaven gegevens met verminderde precisie terug (bv. drijft in plaats van dubbel) . Dit kan alleen van invloed zijn op gegevenswaarden met &gt; 8 significante cijfers. Mijn excuses. (En het was een klassiek computerprogramma bug: één verkeerd karakter.) Dankzij Dominic Fuller-Rowell.
    * Veel kleine veranderingen.
*    **DingenERDDAP™Beheerders moeten weten en doen:** 
    * Raddap-datasets ondersteunen nu tijdstempel-asvariabelen en gegevensvariabelen (d.w.z. variabelen met tijdwaarden, maar adestinationNameandere dan"time") . Dankzij Dominic Fuller-Rowell.
    *   ERDDAP™nu correct ondersteunt millisecondentime\\_precision"1970-01-01T00:00:00.000Z." Een bewuste grill: bij het schrijven van tijden naar mensgerichte bestanden (bv., .csv,.tsv,.json,.xhtml) ,ERDDAP™gebruikt de opgegeventime\\_precisionindien het seconden en/of decimalen bevat; anders gebruikt het secondentime\\_precision"1970-01-01T00:00:00Z" (voor consistentie en achterwaartse compatibiliteit) . Dankzij Dominic Fuller-Rowell.
    *   EDDGridFromNcFiles ondersteunt nu het lezen van tekenreeksdataVariables.
    *   .ncbestanden geschreven door griddap kunnen nu String hebbendataVariables.
    * GenererenDatasets Xml bevat nu meer flush () oproepen om te voorkomen dat informatie niet naar de bestanden wordt geschreven. Dankzij Thierry Valero.
    * De documentatie voor GenerateDatasetsXml is verbeterd, met name om erop te wijzen dat de -i switch alleen werkt als u alle antwoorden op de opdrachtregel specificeert (b.v. scriptmodus) . En de scriptmodus wordt uitgelegd. Dankzij Thierry Valero.
    *   ERDDAP™staat niet langer toe dat twee variabelen in een dataset hetzelfde hebbensourceName. (Als iemand het eerder deed, leidde het waarschijnlijk tot foutmeldingen.) Zoals voorheen,ERDDAP™staat niet toe dat twee variabelen in een dataset hetzelfde hebbendestinationName.

## Versie 1.52{#version-152} 
 (uitgebracht 2014-10-03) 

*    **Nieuwe functies:**   (geen) 
*    **Kleine wijzigingen/Bugfixes:** 
    * Nog een (kleiner) wijzigenERDDAP™Sneller.
    * Verbetering van ISO 19115 bestanden gegenereerd doorERDDAP: nieuw aanbevolen toegevoegd&lt;gmd:protocol&gt; waarden (informatie, opsporing,OPeNDAP:OPeNDAP,ERDDAP:raddap, enERDDAP:tabledap) binnen&lt;gmd:CI\\_OnlineResource&gt;. Dankzij Derrick Snowden en John Maurer.
    * Veel kleine veranderingen.
*    **DingenERDDAP™Beheerders moeten weten en doen:** 
    * Bug fix: GenererenDatasetsXml.sh en DasDds.sh waren niet in erddap.war voor 1.48 en 1.50. Nu wel. Dankzij Thierry Valero.
    * Kleine veranderingen in een aantal snelheidstests in TestAll om ze minder gevoelig te maken voor toeval. Dankzij Terry Rankine.

## Versie 1.50{#version-150} 
 (uitgebracht 2014-09-06) 

*    **Nieuwe functies:**   (geen) 
*    **Kleine wijzigingen/Bugfixes:** 
    * DitERDDAP™zou veel sneller moeten zijn dan recente versies.
*    **DingenERDDAP™Beheerders moeten weten en doen:**   (niets) 

## Versie 1.48{#version-148} 
 (uitgebracht 2014-09-04) 

*    **Nieuwe functies:** 
    *   ERDDAP™maakt nu altijd een tabelset,datasetID=allDatasets, waarin een tabel met informatie over alle datasets in dezeERDDAP. Het kan worden gevraagd zoals elke andere tabel dataset. Dit is een nuttig alternatief voor het huidige systeem voor het verkrijgen van informatie over datasets programmatisch.
    * Er zijn twee nieuwe uitvoer bestandstypen voor EDDTable enEDDGrid, .csv0 en.tsv0. Het zijn komma- en tab-gescheiden-waarde bestanden die geen regels hebben met kolomnamen of eenheden. De data begint op de eerste regel. Ze zijn vooral nuttig voor scripts die slechts één stukje informatie vanERDDAP.
*    **Kleine wijzigingen/Bugfixes:** 
    * Kaarten kunnen nu worden gemaakt tot lengtegraden in het bereik -720 tot 720.
    * Het nieuwe.ncml respons Bestandstype is beschikbaar voor alleEDDGriddatasets. Het geeft de[NCML](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/ncml_overview.html)\\-geformatteerde beschrijving van de dataset (vergelijkbaar met een gecombineerde .dds + .das) .
    * Bug fix: Het opslaan van tabelgegevens naar een.ncbestand was beperkt tot 100.000 waarden per variabele. Nu is het beperkt tot 2 GB totale bestandsgrootte. Dankzij Kevin O'Brien.
    * Bugfix: de saveAsMatlabDe Voorzitter. - Het debat is gesloten.datasetIDs worden omgezet in veiligMatlabvariabele namen. Maar ik raad je nog steeds aan omdatasetIDs die geldige variabele namen zijn: beginnend met een letter en dan gewoon A-Z, a-z, 0-9, en \\_ gebruikend. Zie[datasetID](/docs/server-admin/datasets#datasetid). Dankzij Luke Campbell.
    * Bugfix in EDDTableFromDatabase: Met sommige soorten databases, een NO\\_ Het antwoord van de database leidde tot een nutteloze 30 seconden vertraging inERDDAP. Dankzij Greg Williams.
    * Bugfix:EDDGridMaak een grafiek met grafiektype = regels (of markers of markers en lijnen) geforceerde x-as variabele tijd. Nu kan het elke as zijn. Dankzij Lynn DeWitt.
*    **DingenERDDAP™Beheerders moeten weten en doen:** 
    * AANVAARDING VAN STRONGLY: bijwerkenJava  
Deze versie vanERDDAP™vereistJava7 of hoger, maarJava7 zal in april 2015 het einde van zijn leven bereiken (Binnenkort&#33;) , dus nu is een goed moment om over te schakelen naarJava8.Java8 is sterk aanbevolen. Ik test metJava8. Merk op datJava6 bereikte zijn einde van zijn leven in februari 2013 (Geen beveiligingsfouten meer.) .
    * STRONGLY HERHAALD: Update Tomcat
Als je Tomcat gebruikt, schakel dan over naar de nieuwste versie van Tomcat. Tomcat 8 is ontworpen om te werken metJava8.
    * "ERDDAP" is geen acroniem meer. Nu is het gewoon een naam. Ik wil de naam niet benadrukken.ERD. Ik wilERDDAP™om uw instelling en uw gegevens te benadrukken.
    * Alstublieft.[pas het uiterlijk van uwERDDAP™installatie om uw instelling en uw gegevens te markeren](/docs/server-admin/deploy-install#customize). Met een uur werk kun je mooie verbeteringen maken die eeuwig duren.
    * In setup.xml, de&lt;displayDiagnosticInfo&gt; optie wordt nu altijd genegeerd en behandeld alsof de waarde onjuist was.
AANVAARD: Verwijder de&lt;displayDiagnosticInfo&gt; tag en gerelateerde informatie van uw setup.xml.
    * In setup.xml, de standaard voor&lt;drawLandMask&gt; was "over," maar nu is het "onder," wat een betere algemene standaard is (werkt goed met alle datasets) .
    * De GenerateDatasetsXml.sh en DadDds.sh Linux scripts gebruiken nu bash in plaats van csh, en hebben de extensie .sh. Dankzij Emilio Mayorga
    * GenererenDatasets Xml en DasDds maken nu hun eigen logbestanden (GenererenDatasetsXml.log en DasDds.log) en uitvoerbestanden (GenererenDatasetsXml.out en DadDds.out) in _bigParentDirectory_/logs/, en zet nooit hun resultaten op het klembord.
    * GenererenDatasets Xml ondersteunt nu een -i commandoregelparameter die de uitvoer op een bepaalde plaats in het opgegeven bestand invoegt. Zie[documentatie](/docs/server-admin/datasets#generatedatasetsxml). Dankzij Terry Rankine.
    * EDDtableVanDatabase ondersteunt nu&lt;kolomNaamCitaten&gt;&lt;/columnNameCiterates&gt;, met geldige waarden " (de standaard) Of niets. Dit teken (indien) zal worden gebruikt voor en na kolomnamen in SQL queries. Verschillende soorten databases, opgezet op verschillende manieren, zullen verschillende kolomnaam aanhalingstekens nodig hebben.
    * Tabulaire breedte- en lengtevariabelen kunnen nu aangepast zijnlong\\_name's, bijvoorbeeld, Profiel Breedte. Eerder konden ze alleen maar breedte en lengtegraad zijn.
    * Geef voortaan "defaultDataQuery" en "defaultGraphQuery" op als attributen in de globale metadata van de dataset (d.w.z.,&lt;addAtts&gt;), niet als apart&lt;standaardDataQuery&gt; en&lt;standaardGraphQuery&gt;-tags. (Hoewel, als je ze nog steeds opgeeft via de tags,ERDDAP™zal automatisch globale attributen aanmaken met de informatie.) 

## Versie 1.46{#version-146} 
 (vrijgegeven 2013-07-09) 

*    **Nieuwe functies:** 
    *    (Geen) 
*    **Kleine wijzigingen/Bugfixes:** 
    * Bug fix: In EDDTableFromDatabase, alleen in versie 1.44,ERDDAP™de tabelnaam van de database onjuist geciteerd in SQL-verklaringen. Dat is nu opgelost. Dankzij Kevin O'Brien.
*    **DingenERDDAP™Beheerders moeten weten en doen:** 
    *    ** Als u de standaardberichten in messages.xml niet wijzigt,
verwijderen\\[kat\\]/content/erdap/messages.xml . **   
Het standaard messages.xml bestand zit nu in de erddap. war file, not erddapContent.zip. Je hoeft dus geen berichten meer handmatig bij te werken.xml .
    * Als je de berichten in messages.xml wijzigt, vanaf nu, elke keer als je updateERDDAP™, ofwel:
        * Maak dezelfde wijzigingen die u voor de nieuwe
            \\[kat\\]/webapps/erdap/WEB-INF/classes/gov/noaa/pfel/erdap/util/messages.xml.
En deze ene keer: verwijderen\\[kat\\]/content/erdap/messages.xml .
        * Of, zoek uit wat er is veranderd in de nieuwe berichten.xml (via diff) , en uw
            \\[kat\\]/content/erddap/messages.xml bestand dienovereenkomstig.

## Versie 1.44{#version-144} 
 (vrijgegeven 2013-05-30) 

*    **Nieuwe functies:** 
    * Vragen naar EDDTable datasets ondersteunen nu &orderByMin (...) en &orderByMinMax (...)   (die twee rijen teruggeeft in elke groep, met het minimum en maximum van de laatsteorderBywaarde) . Dankzij Lynn DeWitt.
    * Er zijn twee nieuwetabledapbestandstypen:.ncCFHeader en.ncCFMAHeader (die de ncdump-achtige kop van de overeenkomstige.ncCF en.ncCFMA bestandstypen) . Dankzij Steve Hankin.
*    **Kleine wijzigingen/Bugfixes:** 
    * Bug fix: het laden van de .graph en .html webpagina's voor datasets met veel tijd waarden was traag omdatERDDAP™was traag bij het genereren van de tijd schuifopties. Nu is het altijd snel. Dankzij Michael Barry, OOICI en Kristian Sebastian Blalid.
    * Bugfix: In sommige EDDTable datasettypes werden de tijdslimieten niet altijd correct behandeld. Nu wel. Dankzij John Maurer en Kevin O'Brien.
    * Bug fix: datasets zou niet laden wanneer alle van desubsetVariableswaren variabelen met vaste waarde. Nu wel. Dankzij Lynn DeWitt en John Peterson.
    * VERBETERD: nu doen alle query's voor subsetvariabelen alsof &duidelijk () maakt deel uit van de zoekopdracht.
    * VERBETERD: nu, voor vragen die &.jsonp=_functionName_, _function Naam_ MOET nu een serie van 1 of meer zijn (periode gescheiden) Woorden. Elk woord moet beginnen met een ISO 8859 letter of "\\_" en gevolgd worden door 0 of meer ISO 8859 letters, cijfers of "\\_." Ja, dit is restrictiever danJavaDe vereisten van Script voor functienamen.
    * De tijdas op grafieken werkt nu goed voor langere tijdbereiken (80 - 10000 jaar) en kortere termijnen (0,003 - 180 seconden) .
    *   ERDDAP™is nu meer vergevingsgezind wanneer het ontleden van variaties van ISO-8601-formaat tijdgegevens.
    * Er waren veel andere kleine veranderingen en fouten.
*    **DingenERDDAP™Beheerders moeten weten en doen:** 
    *    **U MOET de nieuwste versie updaten om veilig te zijn.**   
        ERDDAP™onderging een beveiligingsaudit. Er waren wat insecten en zwakheden. Versie 1.44 bevat een aantal belangrijke security bug fixes en verschillende wijzigingen om de beveiliging en toegankelijkheid te verhogen (b.v. voor slechtziende gebruikers) . Versie 1.44 is geslaagd voor de vervolg beveiligingsaudit. Dankzij alle goede mensen bij USGS en Acunetix die dit mogelijk hebben gemaakt. (Zou niet moeten.NOAADit doen?) 
    * Het nieuwe[EDDTabelVanWFSBestanden](/docs/server-admin/datasets#eddtablefromwfsfiles)maakt een lokale kopie van alle gegevens van eenArcGISKaartserverWFSserver en zo kunnen de gegevens dan snel worden opgeslagen aanERDDAP™gebruikers. Dankzij Christy Caudill.
    * Het nieuwe[EDDTabelVanEDDGrid](/docs/server-admin/datasets#eddtablefromeddgrid)kunt u een EDDTable dataset van eenEDDGriddataset. Enkele gemeenschappelijke redenen hiervoor zijn:
        * Dit maakt het mogelijk om de dataset te vragen metOPeNDAPselectiebeperkingen (die een gebruiker kan hebben aangevraagd) .
        * De dataset is inherent een tabelset. Dankzij OOICI, Jim Potemra, Roy Mendelssohn.
    * De variabele naam "diepte" is nu een speciaal alternatief voor "hoogte." De eenheden moeten een variant zijn van "meters." De datawaarden moeten positief zijn=down.ERDDAP™is zich nu volledig bewust van de betekenis van "diepte" en ondersteunt het wanneer hoogte wordt ondersteund (b.v. als onderdeel van een CF DSG cdm\\_data\\_type=profile dataset) . Een dataset mag niet zowel "diepte" als "hoogte" variabelen hebben.
    * In uwdatasets.xml, verwijder elk gebruik van&lt;att name="cdm\\_hoogte\\_proxy"&gt;diepte&lt;/att&gt; omdat diepte nu een speciaal alternatief is voor hoogte en dus niet speciaal hoeft te worden geïdentificeerd.
    * In uwdatasets.xml, verwijder elk gebruik van&lt;hoogteMetersPerSourceUnit&gt;, behalve voor EDDTable VanSOS.
Als de waarde 1 is, verwijder het gewoon.
Wanneer de waarde -1 is, overweeg dan om de variabele naam naar diepte te veranderen.
Voor andere waarden:&lt;addAttributes&gt;, bijvoorbeeld:
```
        <att name="scale\\_factor" type="float">-1</att>
```

    * Alle datasets ondersteunen nu
        
        *   &lt;standaardDataQuery&gt; die wordt gebruikt als .html wordt gevraagd zonder query.
            * Je zult dit waarschijnlijk zelden nodig hebben.
            * Voor griddap-datasets is een algemeen gebruik van dit om een andere standaarddiepte of hoogtedimensiewaarde op te geven. (bv.\\[0\\]in plaats van\\[laatste\\]) .
In ieder geval moet je altijd alle variabelen opsommen, altijd dezelfde dimensiewaarden gebruiken voor alle variabelen, en bijna altijd gebruiken\\[0\\],\\[laatste\\], of\\[0:last\\]voor de dimensiewaarden.
Bijvoorbeeld:
```
                <defaultDataQuery>u\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\],v\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]</defaultDataQuery>
```

            * Voortabledapdatasets, het meest voorkomende gebruik hiervan is het specificeren van een ander standaard tijdbereik (relatief tot nu, bijvoorbeeld, &time&gt;=now-1 dag) .
Vergeet niet dat het vragen van geen gegevens variabelen is hetzelfde als het specificeren van alle gegevens variabelen, dus meestal kunt u gewoon de nieuwe tijd beperking.
Bijvoorbeeld:
```
                <defaultDataQuery>&amp;time&gt;=now-1day</defaultDataQuery>
```

        *   &lt;standaardGraphQuery&gt; die wordt gebruikt als .graph wordt gevraagd zonder query.
            * Je zult dit waarschijnlijk zelden nodig hebben.
            * Voor griddap datasets is het meest voorkomende gebruik van dit om een andere standaarddiepte- of hoogtedimensiewaarde op te geven (bv.\\[0\\]in plaats van\\[laatste\\]) en/of om aan te geven dat een specifieke variabele wordt weergegeven.
In ieder geval, zult u bijna altijd gebruiken\\[0\\],\\[laatste\\], of\\[0:last\\]voor de dimensiewaarden.
Bijvoorbeeld:
```
                <defaultGraphQuery>temp\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]&amp;.draw=surface&amp;.vars=longitude|latitude|temp</defaultGraphQuery>
```

            * Voortabledapdatasets, de meest voorkomende toepassingen hiervan zijn het specificeren van verschillende variabelen die moeten worden gegrapheerd, een ander standaard tijdbereik (relatief tot nu, bijvoorbeeld, &time&gt;=now-1 dag) en/of verschillende standaard grafische instellingen (bv. merkertype) .
Bijvoorbeeld:
```
                <defaultGraphQuery>longitude,latitude,seaTemperature&amp;time&gt;=now-1day&amp;.marker=1|5</defaultGraphQuery>
```

Vergeet niet dat je XML-encode of procent-encode nodig hebt (ofwel, maar niet beide) de standaardqueries omdat ze in een XML-document zitten. Bijvoorbeeld, & wordt &amp; amp; ,&lt;wordt &amp;lt; , en &gt; wordt &amp;gt; .
En kijk alsjeblieft naar je werk. Het is gemakkelijk om een fout te maken en niet te krijgen wat je wilt.
Dankzij Charles Carleton, Kevin O'Brien, Luke Campbell en anderen.
    *   EDDGridVan Dap,EDDGridFromErdap, and EDDtableFromEDDGridhebben een nieuw systeem om te gaan met datasets die vaak veranderen (zo vaak als ruwweg elke 0,5 s) . In tegenstelling totERDDAP's reguliere, proactieve systeem voor het volledig herladen van elke dataset, dit optionele extra systeem is reactief (geactiveerd door een gebruikersverzoek) en incrementele (alleen het bijwerken van de informatie die moet worden bijgewerkt) . Bijvoorbeeld, als een verzoek om eenEDDGridFromDap dataset treedt meer op dan het opgegeven aantal milliseconden sinds de laatste update,ERDDAP™zal zien of er nieuwe waarden zijn voor de meest linkse (meestal"time") dimensie en, zo ja, gewoon downloaden van die nieuwe waarden voordat de gebruiker het verzoek behandelt. Dit systeem is zeer goed in het bijhouden van een snel veranderende dataset up-to-date met minimale eisen aan de gegevensbron, maar ten koste van een lichte vertraging van de verwerking van sommige gebruikersverzoeken. Zie [&lt;updateEveryNMillis&gt;] (/docs/server-admin/datasets#updateeveryonmillis)   
Dankzij Michael Barry en OOICI.
    *   EDDGridVanNcFiles, EDDTableVanNcFiles, en EDDTableVanNcCFFiles nu ondersteunen[NcML.ncml](/docs/server-admin/datasets#ncml-files)bronbestanden in plaats van.ncdossiers. Dankzij Jose B Rodriguez Rueda.
    * VoorEDDGridAggregatedExistingDimensionERDDAP™ondersteunt een nieuwe serverType="dsindex" optie voor de serverType attribuut van de&lt;sourceUrls&gt; tag. Dit werkt met webpagina's die lijsten van bestanden binnen&lt;pre&gt;&lt;/pre&gt; en vaak onder eenOPeNDAPlogo. Een voorbeeld is[ https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html ](https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html).
    * Voor EDDtabelVanSOSondersteunt nu een optionele tag
```  
        <sosServerType>_serverType_</sosServerType>  
```
zodat u het type vanSOSserver (dusERDDAP™hoeft het niet uit te zoeken) . Geldige waarden van&lt;_serverType_\\&gt; IOOS\\_NDBC, IOOS\\_NOS,OOSTethys, en WHI (een nieuw ondersteunde server Type) . Zie[EDDTabelVanSOS](/docs/server-admin/datasets#eddtablefromsos). Dankzij Derrick Snowden en Janet Fredericks.
    * AllesEDDGridVan...Bestanden, EDDtableVan...Bestanden,EDDGridKopiëren en EDDtabel Kopiëren ondersteunt nu een optionele tag
```
        <fileTableInMemory>true</fileTableInMemory> (The default is false.)  
```
die kan zeggenERDDAP™om het bestand te bewaren Tabel (met informatie over elk brongegevensbestand) in het geheugen in plaats van alleen op de schijf (de standaard) . Het bestand bewarenTable in geheugen versnelt verzoeken om gegevens (vooral als er &gt;1000 brongegevensbestanden zijn) , maar gebruikt meer geheugen. Als je dit op true zet voor een dataset, houd dan een oogje op het Geheugen: momenteel gebruik je een regel op _yourDomain_/erddap/status.htmlom ervoor te zorgen datERDDAP™Heeft nog genoeg gratis geheugen. Dankzij Fredrik Stray.
    * EDDTableFromASCIIFiles ondersteunt nu&lt;tekenset&gt;. De twee meest voorkomende tekensets (Hoofdlettergevoelig&#33;) ISO-8859-1 (de standaard) en UTF-8.
    * Aanbevolen: in setup.xml, binnen&lt;startHeadHtml&gt;, wijzig aub&lt;html&gt; in
        &lt;html lang="en-US"&gt; (of een andere[taalcode](https://www.w3schools.com/tags/ref_language_codes.asp)als u berichten hebt vertaald.xml) .
    * setup.xml heeft nieuwe optionele tags om delen vanERDDAP:
        *   &lt;convertersActive&gt;false&lt;/convertersActive&gt;&lt;&#33;-- de standaard is waar --&gt;
        *   &lt;slideSorterActive&gt;false&lt;/slideSorterActive&gt;&lt;&#33;-- de standaard is waar --&gt;
        *   &lt;wmsActive&gt;false&lt;/wmsActive&gt;&lt;&#33;-- de standaard is waar --&gt;In het algemeen raden we aan om een van deze niet op vals te zetten.
    * GenererenDatasets Xml schrijft nu resultaten naar _bigParentDirectory_/logs/generateDatasetsXmlLog.txt, niet log.txt. Dankzij Kristian Sebastian Blalid.
    * GenererenDatasets Xml doet nu een goede suggestie voor de&lt;herladen EveryNminutes&gt;. Met dank aan deNOAAUAF-project.
    * Veel kleine verbeteringen aan GenererenDatasetsXml. Met dank aan deNOAAUAF-project.

## Versie 1.42{#version-142} 
 (uitgebracht 2012-11-26) 

*    **Nieuwe functies:** 
    *    (Geen belangrijke nieuwe functies.) 
*    **DingenERDDAP™Beheerders moeten weten en doen:** 
    * Als u upgraden vanERDDAP™1.38 of 1.40, er waren geen wijzigingen die vereisen dat u wijzigingen aan uw configuratiebestanden aan te brengen (maar u moet het nieuwe messages.xml bestand gebruiken) .
    *   ERDDAP™opnieuw kan draaien metJava1.6. (ERDDAP™v1.40 vereistJava1.7.) We raden het gebruik van de nieuwste versie vanJava1.7.
    * Een nieuw datasettype,[EDDTabelVan AwsXmlFiles](/docs/server-admin/datasets#eddtablefromawsxmlfiles), kan gegevens van een set van automatische weerstation lezen (AWS) XML-gegevensbestanden. Dankzij Lynn Dewitt en het Exploratorium.
*    **Kleine wijzigingen/Bugfixes:** 
    * Aangepast aan wijzigingen in de NDBCSOSbrondataservers.
    * Aangepast aan wijzigingen in de NOS COOPS ASCII diensten.
    * Maakte een aantal kleine wijzigingen en bug fixes.

## Versie 1.40{#version-140} 
 (uitgebracht 2012-10-25) 

*    **Nieuwe functies:** 
    * Er is een nieuw uitvoerbestandsformaat voortabledapdatasets:.ncCFMA, die de gevraagde gegevens in een.ncbestand dat overeenkomt met het CF[Discrete bemonsteringsgeometrie](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Multidimensionale Array-opties, die daarom conform zijn met de NODC-templates\\[2021: nu[NCEI-templates](https://www.ncei.noaa.gov/netcdf-templates)\\]voor het opslaan van dit type gegevens. Dankzij NODC.
    *   tabledapverzoeken kunnen nu tijdslimieten zoals & tijd&gt; bevattennow-Vijf dagen. Zie[documentatie](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now). Dankzij James Gosling.
*    **DingenERDDAP™Beheerders moeten weten en doen:** 
    * Als u upgraden vanERDDAP™1.38, er waren geen wijzigingen die vereisen dat u wijzigingen aan uw configuratiebestanden aan te brengen (maar u moet het nieuwe messages.xml bestand gebruiken) .
    *   ERDDAP™publieke releases en interne mijlpalen zijn beschikbaar via[ERDDAP™op GitHub](https://github.com/ERDDAP). Voor meer informatie, zie de[Wiki](https://github.com/ERDDAP/erddap/wiki)voor deERDDAP™project en de meer algemene[ERDDAP™Programmagids](/docs/contributing/programmer-guide). (Dit werd een paar weken na deERDDAP™1.38 vrij.) 
    * GenererenDatasets Xml is verbeterd.
        * Het script werd herzien, dus het moet correct werken op alle Linux computers (niet slechts een paar) .
        * Het voegt nucreator\\_name,creator\\_emailencreator\\_urlWaar mogelijk.
        * Vele andere kleine verbeteringen.
    * Geraffineerd hoeERDDAP™Deals met de tijd.
        * Intern,ERDDAP™nu behandelt tijden bij milliseconde precisie (geen seconden) .
        * U kunt nu optioneel de tijd precisie voor een bepaalde dataset opgeven, zie[time\\_precision](/docs/server-admin/datasets#time_precision). U kunt bijvoorbeeld een dataset instellen om tijdwaarden weer te geven met datumprecisie (bv. 1970-01-01) .
        * Uw huidige datasets zullen de standaardinstellingen gebruiken, zodat ze niet beïnvloed worden door deze wijzigingen en de tijd met seconden precisie blijven weergeven. Dankzij Servet Cizmeli en Philip Goldstein.
    *   [EDDtabelVanNcCFFiles](/docs/server-admin/datasets#eddtablefromnccffiles)is een nieuw dataset type dat u kunt gebruiken in uwdatasets.xmlbestand. Het kan gegevens lezen van een van de vele bestandsformaten gedefinieerd door de[CF Discrete bemonsteringsgeometrie](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)conventies. Dankzij NODC en speciale dank aan Kyle Wilcox voor het maken van steekproefbestanden voor het enorme aantal geldige DSG-bestandsformaten en voor het openbaar maken ervan.
*    **Kleine wijzigingen/Bugfixes:** 
    * Uitgebreid[quickRestart](#quick-restart)systeem voor alle relevanteEDDGriden EDDTable subklassen.
    * Verbeterde documentatie, vooral met betrekking tot hoe te gebruiken[griddap](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType)en[tabledap](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#fileType)van verschillende client software.
    * Veranderde geavanceerde zoekopdracht ter ondersteuning van minTime en/of maxTime uitgedrukt als epochSeconds. Dankzij Lynn Dewitt.
    * Gewijzigd.htmlTableuitvoer om urls en e-mailadressen weer te geven als links.
    * Toegevoegd "rel=" en "rev=" aan relevant&lt;a href&gt; tags. Dankzij Pat Cappelaere van deOGC RESTproject.
    * Betere bescherming tegen onrealistisch grote verzoeken om gegevens, met name binnentabledap, waar het een moeilijker probleem is.
    * Meer berichten verplaatst naar messages.xml.
    * Verbeterde snelheid.
    * VastEDDGridFromFiles om afdalende gesorteerde assen toe te staan. Dankzij Maricel Etchegaray.
    * Verwijderde verwijzingen naar iGoogle omdat het zal worden stopgezet.
    * Maakte een aantal kleine wijzigingen en bug fixes.

## Versie 1.38{#version-138} 
 (uitgebracht 2012-04-21) 

*    **Nieuwe functies:** 
    * ISO 19115 en FGDC --ERDDAP™kan automatisch ISO 19115 en FGDC XML metadata bestanden genereren voor elke dataset. Links naar de bestanden zijn zichtbaar op elke lijst van datasets (b.v. van volledige tekst zoeken) en ook in Web Toegankelijke Mappen (WAF)   (zie[FGDC WAF](https://coastwatch.pfeg.noaa.gov/erddap/metadata/fgdc/xml/)en[ISO 19115 WAF](https://coastwatch.pfeg.noaa.gov/erddap/metadata/iso19115/xml/)) . Dankzij Ted Habermann, Dave Neufeld en vele anderen.
    * Volledige tekst zoeken naar datasets ondersteunt nu \\-_excludedWord_ en \\-__uitgesloten zin_" . Dankzij Rich Signell.
    * Zoeken naar datasets geeft nu een pagina tegelijk terug. De standaard gebruikt de parameter string: pagina=1&itemsPerPage=1000, maar u kunt de waarden in de URL van uw verzoek wijzigen. Dankzij Steve Hankin en het UAF project.
    *   OpenSearch--ERDDAP™Nu steunt de[OpenSearch1,1](https://coastwatch.pfeg.noaa.gov/erddap/opensearch1.1/index.html)standaard voor het zoeken naar datasets. Dit maakt het onder andere mogelijk catalogisering websites te doen gedistribueerde zoekopdrachten (het doorgeven van een zoekopdracht aan elke catalogus die het kent) .
    * Comma gescheiden Waarde (CSV) Bestanden --ERDDAP™nu CSV-bestanden aanmaken met slechts een komma tussen waarden (welke Excel verkiest) , in plaats van komma+ruimte. Dankzij Jeff deLaBeaujardiere.
    * Miljoen Datasets... Er werden verschillende wijzigingen aangebracht ter ondersteuning vanERDDAPs hebben een enorm aantal datasets, misschien zelfs een miljoen. Dankzij Steve Hankin en het UAF project.
*    **DingenERDDAP™Beheerders moeten weten en doen:** 
#### Snel opnieuw opstarten{#quick-restart} 
*   [A](#quick-restart)snel herstartsysteem laat toeERDDAP™om veel sneller te herstarten.
     **Voeg dit toe aan uw setup.xml bestand** direct na&lt;/datasetsRegex&gt;:
```
              <!-- If true, when you start up ERDDAP™, some types of datasets (e.g., 
              EDDGridFromDap) will used cached information (.dds, .das, etc.) to reload
              very quickly, without contacting the remote server.  The dataset's age 
              will be based on when the dataset was reloaded last.  Normally this 
              should be true (the default), but set it to false if you want to bypass 
              the cached information.
              <quickRestart>true</quickRestart>
```

    * Volledige tekst zoeken naar datasets kan nu gedaan worden met de Lucene zoekmachine (Hoewel wij raden de oorspronkelijke zoekmachine als u minder dan 10.000 datasets) of het oorspronkelijke zoeksysteem.
         **Voeg dit toe aan uw setup.xml bestand** direct na&lt;/displayDiagnosticInfo&gt;:
```
              <!-- ERDDAP™ lets you choose between two search engines for full text searches:
              \\* original (the default) -- is the best choice if your ERDDAP™ has fewer 
                than about 10,000 datasets.  It is very robust and trouble free. 
              \\* lucene -- is the best choice for more than about 10,000 datasets.
                The advantages are that with any number of datasets it works fast 
                and uses very little memory.
                But there are many things that might go wrong with individual 
                queries and with the whole system. 
                And although its behaviour (the datasets it finds and the order that
                it ranks them) is almost identical to the original search engine,
                it has a few quirky, subtle, small differences.
              -->
              <searchEngine>original</searchEngine>
```

    * In setup.xml kun/moet je nu twee nieuwe categorieën toevoegen aan de door komma's gescheiden lijst van&lt;categoryAttributes&gt;:
        * wereldwijd:keywords (voeg het meteen toe na global:institution) -- een nieuw speciaal geval dat een door komma's gescheiden lijst van trefwoorden ontleedt van de wereldwijde trefwoordenattribuut om een aparte ingang te maken voor elk trefwoord.
        * variabele Naam (toevoegen aan het einde) -- een nieuw speciaal geval dat elk van dedataVariable destinationNames.
    * In setup.xml, kunt u (Maar waarom?) vertelERDDAP™geen FGDC en/of ISO 19115 metagegevens aan te bieden voor een dataset door
```
        <fgdcActive>false</fgdcActive>  
        <iso19115Active>false</iso19115Active>
```

De standaardwaarden voor deze instellingen zijn waar.
    * Indatasets.xml, kunt u overwegen de metadata voor uw datasets te verbeteren.ERDDAP™nu genereert automatisch ISO 19115 en FGDC XML-metadatabestanden voor elke dataset op basis van de metagegevens van de dataset.
Dus, **goede datasetmetadata leidt tot goedeERDDAP- gegenereerde ISO 19115 en FGDC metadata.**   
         **Zie de nieuwe documentatie voor de vele nieuwe HERHALING[Algemene kenmerken](/docs/server-admin/datasets#global-attributes).** 
    * Indatasets.xml, als je wilt vertellenERDDAP™om een pre-made FGDC en/of ISO 19115 bestand te gebruiken dat ergens op het bestandssysteem van de server staat in plaats vanERDDAP™genereren van deze bestanden, gebruik:
```
        <fgdcFile>_fullFileName_</fgdcFile>  
        <iso19115File>_fullFileName_</iso19115File>
```
Als _fullFileName_\\="" of het bestand niet wordt gevonden, zal de dataset geen FGDC en/of ISO 19115 metadata hebben. Dit is dus ook handig als je de FGDC en/of ISO 19115 metadata voor een specifieke dataset wilt onderdrukken.
    * Indatasets.xml, voor iedereenEDDGridSideBySide enEDDGridAlglobalExistingDimension datasets, zorg ervoor dat kind datasets hebben verschillendedatasetIDs dan hun ouderdatasets en dan de andere kinderen. (Bijvoorbeeld, je zou George Foreman's eenvoudige maar effectieve systeem kunnen volgen voor het benoemen van zijn kinderen.) Als namen in een familie precies hetzelfde zijn, zal de dataset niet laden (met het foutbericht dat de waarden van de geaggregeerde as niet in gesorteerde volgorde zijn) .
    * Indatasets.xml, waren er enkele wijzigingen in de lijst van geldigeioos\\_categoryMetadatawaarden:
        * "pCO2" werd veranderd in "CO2."
        * "Physical Oceanografie" werd toegevoegd.
        * "Soils" werd toegevoegd.
    * Indatasets.xml,ERDDAP™staat niet langer '.' toe in eendatasetID. Het was toegestaan maar ontmoedigd. (Sorry.) 
    * Indatasets.xml, de setup voor EDDTableFromTreddsFiles en EDDTableVanHyraxBestanden zijn iets veranderd omdat beide klassen net zijn herschreven om efficiënter te zijn (beide klassen maken nu altijd een lokale kopie van alle externe gegevensbestanden) . Zie de documentatie voor het opzetten van deze klassen:[EDDTabelVanHyraxBestanden](/docs/server-admin/datasets#eddtablefromhyraxfiles)en[EDDtableFromDreddsFiles](/docs/server-admin/datasets#eddtablefromthreddsfiles). Zie met name de herziene opmerkingen over&lt;fileDir&gt; (nu irrelevant) en&lt;sourceUrl&gt; (nu essentieel) . Ook moet je nooit wrap deze klasse in EDDtableCopy voor efficiëntie.
    * Indatasets.xml, als u EDDTableFromDatabase met eenOracledatabase, moet u een verbinding Eigendom zoals
```
        <connectionProperty name="defaultRowPrefetch">4096</connectionProperty>  
```
om aan te geven hoeveel rijen gegevens tegelijk op te halen omdat de standaard 10 is, wat verschrikkelijk inefficiënt is. Zie[Oracledocumentatie](https://docs.oracle.com/cd/B10501_01/java.920/a96654/basic.htm). MySql en PostgreSQL lijken betere standaardinstellingen te hebben voor deze instelling. Dankzij Kevin O'Brien.
    * Als u EDDTableFromDatabase gebruikt, zie de verbeterde["Speed"-documentatie](/docs/server-admin/datasets#eddtablefromdatabase)voor aanvullende suggesties om de prestaties te verbeteren. Dankzij Kevin O'Brien.
    * Indatasets.xml, voor alle EDDTable... datasets, in de verdragen enMetadata\\_Conventionsglobale attributen, zie CF-1.6 (niet CF-1,0, 1.1, 1.2, 1.3, 1.4 of 1.5) , aangezien CF-1.6 de eerste versie is die de veranderingen met betrekking tot de Discrete Sampling Geometrie omvat.
    * Programmeurs die deERDDAP™code moet lib/lucene-core.jar toevoegen aan de lijst met jar bestanden in hun javac en java commandoregel paden.
    *   ERDDAP™heeft een[nieuwe dienst](https://coastwatch.pfeg.noaa.gov/erddap/convert/keywords.html)om een CF Standaard Naam te converteren naar/van een GCMD Science Trefwoord. U kunt dit nuttig vinden bij het genereren van globale zoekwoorden metadata voor de datasets in uwERDDAP.
    * Omgaan met Bots... Lees dit advies aan[voorkomen dat bots kruipen uwERDDAP™op een stomme manier](/docs/server-admin/additional-information#robotstxt).
    * Vertaling - De tekst opERDDAP's webpagina's is nu meestal in messages.xml en dus geschikt voor vertaling naar verschillende talen (bv. Duits, Frans) . De berichten gebruiken nu vaak MessageFormat voor het formatteren, ook om vertalingen te maken. Als u geïnteresseerd bent in het doen van een vertaling, e-mailerd dot data at noaa dot gov.
    * Monsterdatasets.xml-- Er waren verschillende kleine maar significante fouten in de steekproefdatasets.xml. Als je die datasets gebruikt, haal dan de nieuwere versies uit de nieuwe sampledatasets.xmlin de nieuwe erddapContent.zipbestand. Dankzij James Wilkinson.
    * Git -- Ik zal mijn best doen omERDDAP™een GitHub project ASAP na deze release.
*    **Kleine wijzigingen/Bugfixes:** 
    * Een nieuw palet, OceanDepth, is nuttig voor dieptewaarden (positief is gedaald) , bv. 0 (ondiep) tot 8000 (diep) .
    * De.kmluitvoer vantabledapgebruikt een betere marker pictogram (Het is niet wazig.) . En zwevend over een markering maakt het nu groter.
    * EDDtableFromFiles -- Bij de laatste upgrade had de nieuwe netcdf-java bibliotheek strengere beperkingen voor variabele namen in.ncdossiers. Dat veroorzaakte problemen voor EDDTableFromFiles als een variabelesourceNamehad bepaalde leestekens. EDDTableFromFiles is nu aangepast om dat probleem te voorkomen. Dankzij Thomas Holcomb.
    * De .subset pagina ondersteunt nu 0/10/100/100/10000/100000 in plaats van een selectievakje voor gerelateerde gegevens. De tooltip waarschuwt dat 100000 uw browser kan laten crashen. Met dank aan Annette DesRochers, Richard (Abe) Coughlin en het Biologisch Project IOOS.
    * .../erdap/info/_datasetID_/index.html webpagina's tonen nu urls en e-mailadressen als klikbare links. Dankzij Richard. (Abe) Coughlin en het Biologisch Project IOOS.
    * Bugfix: Intabledap, voor datasets met hoogte MetersPerSourceUnit&lt;0, vragen met hoogte beperkingen werden verkeerd behandeld. Dankzij Kyle Wilcox.
    * Bugfix:EDDGridAggregateFromExistingDimension ondersteunt nu meer diverse TDS-URL's. Dankzij?

## Versie 1.36{#version-136} 
 (uitgebracht 2011-08-01) 

*    **Nieuwe functies:** 
    * Geen significante wijzigingen vanuit het standpunt van een gebruiker.
*    **DingenERDDAP™Beheerders moeten weten en doen:** 
    * De pmelTao dataset die vaak werd gebruikt als sample dataset voor detabledap  
documentatie is niet meer beschikbaar.ERDDAP™De beheerders MOETEN de volgende wijzigingen aanbrengen:
        * In uwdatasets.xml, als u eendatasetID="pmelTao" dataset, toevoegen
actief="valse" vlak voor de "&gt;" aan het einde van die regel.
        * In uw setup.xml, als uw&lt;EDDTableIdVoorbeeld&gt; is pmelTao, dan:
            * Als udatasets.xmlheeft geen dataset metdatasetID="erdGlobecBottle," toevoegen
```
                <dataset type="EDDTableFromErddap" datasetID="erdGlobecBottle" active="true">  
                  <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGlobecBottle</sourceUrl>  
                </dataset>
```
            * Vervang in uw setup.xml alle tags van&lt;EDDTableIdVoorbeeld&gt; door
                &lt;EDDTabelMatlabPlotExample&gt; met
```
                <!-- Tabledap Examples
                This group of settings is used to make examples for the tabledap documentation 
                that appears at \\[baseUrl\\]/erddap/tabledap/documentation.html and elsewhere.
                If you include the erdGlobecBottle dataset in your datasets.xml (recommended), 
                you don't need to change these.
                If you don't, you MUST change these before you make your ERDDAP™ public; 
                otherwise, none of the examples will work!
                The new settings should be very similar to the defaults.
                If your ERDDAP™ won't serve any tabular datasets, use "NOT\\_APPLICABLE" for all of the entities.
                In .xml files like this, ampersand, lessThan, and greaterThan have to be 
                HTML encoded as "&amp;", "&lt;", "&gt;".
                -->
                <!-- This is the datasetID for an EDDTable dataset that is served by your ERDDAP.
                     This dataset is used as the basis for all of the EDDGrid examples below. 
                     Ideally, it is a dataset that has longitude, latitude, and time variables (among others). 
                     ('time' allows for making a time series graph. 'latitude' and 'longitude' allow for making a map.)
                     The dataset can have longitude values -180 to 180, or 0 to 360. -->
                <EDDTableIdExample>erdGlobecBottle</EDDTableIdExample>
                <!-- This is a comma-separated list of variables from the dataset.
                     It is useful if it is "longitude,latitude,time," plus a data variable name. -->
                <EDDTableVariablesExample>longitude,latitude,time,bottle\\_posn,temperature1</EDDTableVariablesExample>
                <!-- This is the constraints example which is appended to EDDTableVariablesExample. -->
                <EDDTableConstraintsExample>&amp;time&gt;=2002-08-17T00:00:00Z&amp;time&lt;=2002-08-19T20:18:00Z</EDDTableConstraintsExample>
                <!-- This is an example data query using an ISO-formatted time. 
                     You could generate your example via your dataset's Data Access Form in ERDDAP.  -->
                <EDDTableDataTimeExample>longitude,latitude,time,bottle\\_posn,temperature1&amp;time&gt;=2002-08-17T00:00:00Z&amp;time&lt;=2002-08-19T20:18:00Z</EDDTableDataTimeExample>
                <!-- This is an equivalent example data query, but which specifies time as seconds-since-1970-01-01. 
                     If you need to convert a date/time to "seconds since 1970-01-01", use
                     https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html -->
                <EDDTableDataValueExample>longitude,latitude,time,bottle\\_posn,temperature1&amp;time&gt;=1029542400&amp;time&lt;=1029788280</EDDTableDataValueExample>
                <!-- This is an example query which generates a graph. 
                     You could generate your example via your dataset's Make A Graph form in ERDDAP.  -->
                <EDDTableGraphExample>bottle\\_posn,temperature1&amp;time=2002-08-19T10:06:00Z&amp;.draw=lines</EDDTableGraphExample>
                <!-- This is an example query which generates a map. 
                     In the default mapExample, temperature1, time, bottle\\_posn are useful 
                     because they appear in GoogleEarth with the .kml example 
                     and are ignored by the other image file types. -->
                <EDDTableMapExample>longitude,latitude,temperature1,time,bottle\\_posn&amp;time&gt;=2002-08-13T00:00:00Z&amp;time&lt;=2002-08-20T00:00:00Z&amp;bottle\\_posn=1&amp;.draw=markers&amp;.marker=5|5</EDDTableMapExample>
                <!-- This is a Matlab example which uses data from the EDDTableGraphExample.
                     Note the Matlab notation datasetName.variableName.  -->
                <EDDTableMatlabPlotExample>plot(erdGlobecBottle.bottle\\_posn, erdGlobecBottle.temperature1)</EDDTableMatlabPlotExample>
```
                
    * Voor datasets waarbij het type een subklasse is van EDDTableFromFiles, kunt u nu gegevens maken van metagegevens.
Je kunt nu een variabele maken van de waarden van een attribuut van een van de oorspronkelijke variabelen.
Bijvoorbeeld indatasets.xml, binnen een&lt;dataVariable&gt; tag, als u
```
        <sourceName>variable:cruise:PI</sourceName>  
```
        ERDDAP™zal een variabele maken met de waarden van de PI attribuut van de cruise variabele.
Dankzij WOD.
*    **Wijzigingen:** 
    * Kleine wijzigingen

## Versie 1.34{#version-134} 
 (vrijgegeven 2011-06-15) 

*    **Wijzigingen:** 
    * Bugfix: Een geheugenlek op 64-bit gerepareerdJavainstallaties.
    * Bugfix:ERDDAP™nu correct deze globale attributen instelt wanneer de waarden van de breedtegraadsdimensie variëren van hoog tot laag: geospatial\\_lat\\_min, geospatial\\_lat\\_max, Southernmost\\_Noorden, Northernmost\\_Noorden.
        
Merk op datactual\\_rangeis ongewijzigd: het kan lage, hoge of hoge, lage waarden hebben, aangezien het de bedoeling is het bereik en de volgorde van opslag aan te geven.
        
    * Kleine veranderingen.
    *   ERDDAP™beheerders hoeven geen wijzigingen aan te brengen in hun setup.xml ofdatasets.xml.

## Versie 1.32{#version-132} 
 (uitgebracht 2011-05-20) 

*    **Wijzigingen:** 
    * Steun voor de onlangs geratificeerde, CF Discrete Sampling Geometries (die helaas nog niet online beschikbaar is) , dat de voorgestelde CF Point Observation Conventions vervangt.
        ERDDAP™gebruikers zullen zien dat cdm\\_feature\\_type=Station wordt vervangen door TimeSeries en er zijn kleine wijzigingen in de bestanden gemaakt voor de.ncCF-bestandstype (platte\\_dimensie wordt nu sample\\_dimensie genoemd) .
        ERDDAP™Beheerders zullen deze wijzigingen moeten aanbrengen indatasets.xml:
        * cdm\\_data\\_type=Station moet worden gewijzigd in cdm\\_data\\_type=Tijdreeks.
        * cdm\\_data\\_type=StationProfile moet worden gewijzigd in cdm\\_data\\_type=TimeSeriesProfile.
        * cdm\\_station\\_variabelen moeten worden gewijzigd in cdm\\_tijdreeks\\_variabelen.
        * cf\\_role=station\\_id moet worden gewijzigd in cf\\_role=timeserie\\_id.
    * Nieuwioos\\_categoryopties: "Colored Soluated Organic Matter," "pCO2," "Stream Flow," "Total Suspended Matter."
    * Mogelijke oplossing voor een mogelijk geheugenlek op 64-bitJava.\\[Het werkte niet.\\]
    * Kleine veranderingen.

## Versie 1.30{#version-130} 
 (vrijgegeven 2011-04-29) 

*    **Nieuwe functies:** 
    * Ondersteuning voor 64-bitJava. Bij gebruik met 64 bitJava,ERDDAP™kan nu veel meer hoop geheugen gebruiken en omgaan met veel meer gelijktijdige verzoeken.
    * Steun voor.ncbestandsverzoeken tot 2GB (zelfs zonder 64-bitJava) via een beter gebruik vanERDDAPDe verwerking van data in stukken.
    * Veel 2X snelheid verbeteringen in de code en 2X snelheid ups vanJava1,6 merkERDDAP™2X tot 4X sneller dan voorheen.
    * Verbeteringen voor geheugenbesparing aanzienlijk lagerERDDAPHet basisgeheugengebruik.
    * Voor tabelgegevenssets,ERDDAP™is nu volledig op de hoogte van het cdm\\_data\\_type van een dataset en hoe de gegevens naar het CDM-type in kaart worden gebracht. Zie[CF Specificatie discrete bemonsteringsgeometrie](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries). Misschien binnenkort, dat Word-bestand zal worden omgezet naar .html en vervangen de huidige "OBSOLETE" informatie op die webpagina. Met dank aan deNOAAUAF-project.
    * Voor de meeste EDDTable datasets, een nieuwe uitvoer bestandstype optie,.ncCF, creëert Ondoordringbare Ragged Array.ncbestanden die overeenkomen met de nieuwste versie van de[CF Discrete steekproefgeometrieconventies](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries). Deze bestanden zijn gestructureerd om het CDM-gegevenstype van de dataset weer te geven. Aangezien de voorgestelde conventies net veranderd, vanaf dit schrijven, de netcdf-java bibliotheek nog niet het lezen van de bestandsformaten die doorERDDAPen ze te interpreteren als CDM-gegevensbestanden. Dat zal waarschijnlijk snel gebeuren. Met dank aan deNOAAUAF-project.
    * De View : Onderscheidende Data optie op de .subset webpagina is nu een drop-down lijst waarmee gebruikers het maximum aantal rijen van verschillende gegevens te bekijken (standaard = 1000) . Deze verandering, en anderen, toestaanERDDAP™om te werken met datasets met zeer grote aantallen rijen verschillende gegevens. (Het aantal unieke waarden voor elke variabele is nog steeds een probleem, maar het kan vrij hoog zijn (20.000?) voordat de .subset en andere webpagina's heel langzaam laden.) Met dank aan deNOAAUAF-project.
    * .subset webpagina's hebben een nieuwe optie: Bekijk onderscheidende gegevenstellingen. Dankzij het GTOPP project.
    * Om de gebruikers te helpen, de verschillende waarden (b.v. stationsnamen) worden nu getoond op de Make-A-Graph en Data Access Forms. Met dank aan deNOAAUAF-project.
    * Transparant Png-verzoeken ondersteunen nu alle soorten grafieken en gegevensrepresentaties. Het tekent alleen de gegevens - geen bijlen, legendes, landmasker, of iets anders. Dit maakt het mogelijk om afbeeldingen als lagen van transparantePngs te maken. Als &.size=_width_|_Hoogte_ is gespecificeerd in de zoekopdracht (aanbevolen) Het is een eer. De standaard is 360x360 pixels. De enige uitzondering isEDDGrid&.draw=surface, waar de standaard (zoals voorheen) is een afbeelding met ~1/pixel per datapunt (tot 3000 x en y pixels) . Dankzij Fred Hochstaedter.
    * DeWMSwebpagina's tonen nu de kleurbalk voor de variabele van de dataset (s) . Dankzij Emilio Mayorga en anderen.
*    **DingenERDDAP™Beheerders moeten weten en doen:** 
    * Deze release brengt veel veranderingen met zich mee. Ze zijn allemaal belangrijk. Wees geduldig en werk door alle onderstaande wijzigingen.
    * Deze versie wordt geduwd eerder dan bedoeld om te gaan met sommigeJavaBeveiligers. Helaas, verschillende functies/fixes bedoeld voor dezeERDDAP™versie zijn niet in deze versie. Sorry. Hopelijk zal de volgende versie relatief binnenkort (en veel gemakkelijker te upgraden naar) .
    * Om meerdere beveiligingsfouten in te voorkomenJava6 update 23 en hieronder, download en installeer de nieuwste versie vanJava  (Java6 update 24 of hoger) . Als u een 64-bits besturingssysteem, gelieve een 64-bit versie vanJava.
    * Als u Tomcat 5 gebruikt, moet u upgraden naar Tomcat 6 of 7 (voorkeur) . Als u Tomcat 6 gebruikt, overweeg dan om te upgraden naar Tomcat versie 7.
    * Volg alle instructies voor[opzetten van een nieuweERDDAP™](/docs/server-admin/deploy-install), maar waar relevant, zult u het kopiëren van bestanden van uw oude installatie naar de nieuwe installatie, met name de\\[kat\\]/content/erddap directory en bestanden. Als onderdeel daarvan, let op de[nieuwe Tomcat-opzetaanbevelingen](/docs/server-admin/deploy-install#tomcat).
    * De standaard erddap.css is nu opgenomen in het erddap.war bestand.
        * Om de standaard erddap.css te gebruiken, **verwijderen** je oude\\[kat\\]/content/erddap/images/erddap.css .
        * Als u zich heeft aangepast\\[kat\\]/content/erddap/images/erddap.css, en wil het blijven gebruiken: laat het gewoon op zijn plaats en vervang het&lt;invoer&gt; sectie met:
```
            /\\* Small input items let more be shown on one screen  
            (esp. Chrome and Safari). Google Chrome and Safari have  
            default margin 2px, while others are 0. This sets all to 0.  
            .skinny is used e.g., for the buttons above the image on  
            a Make A Graph page. \\*/  
            input\\[type=button\\], input\\[type=submit\\], button {  
              margin:0px; padding:0px 3px; }  
            input\\[type=checkbox\\], input\\[type=password\\],  
              input\\[type=text\\], select, textarea {  
              margin:0px; padding:0px; }  
            input\\[type=radio\\] {margin:0px 2px; padding:0px; }  
            input.skinny {padding:0px 1px; }
```

    * In uw\\[kat\\]/content/erddap/setup.xml:
        * Vervang de opmerkingen en tags met betrekking tot&lt;gedeeltelijke aanvraagMaxBytes&gt; en&lt;partialRequestMaxCells&gt; met
```
            <!-- When possible (and it isn't always possible),  
            ERDDAP™ breaks source data requests into chunks to  
            conserve memory. See the description of these tags in  
            messages.xml. You can override the default chunk sizes  
            here with  
            For grids:  
             <partialRequestMaxBytes>100000000</partialRequestMaxBytes>  
            For tables:  
             <partialRequestMaxCells>100000</partialRequestMaxCells>  
            \\-->
```
        * De opmerkingen in verband met&lt;categoryAttributes&gt; en overwegen de waarde van het label te wijzigen:
```
            <!-- This is the comma-separated list (recommended:  
            in alphabetical order) of the global attribute and  
            variable attribute names which will be used to  
            categorize the datasets and shown to clients at urls  
            like .../erddap/categorize/ioos\\_category/index.html  
            (ioos\\_category is unusual, but is used at ERD).  
            If an attribute is a global attribute, identify it by  
            prefixing it with "global:".  
            \\-->  
            <categoryAttributes>global:institution, ioos\\_category,  
            long\\_name, standard\\_name</categoryAttributes>  
```

Persoon&lt;categoryAttributes&gt; die nu globale kenmerken zijn MOET worden geïdentificeerd via het voorvoegsel globaal: (b.v. wereldwijd:instelling) . Andere attributen worden verondersteld variabele attributen te zijn (bv.standard\\_name) . Instellingen (de enige) werden achtergelaten in de oorspronkelijke zaak. Nu worden alle categoriewaarden omgezet in kleine letters.
    * In uw\\[kat\\]/content/erdap/datasets.xml:
        * Grote verbetering:ERDDAP™heeft nieuwe eisen met betrekking tot een tabelset van cdm\\_data\\_type. Opvallend is dat elke dataset de juiste metadata en variabelen moet hebben met betrekking tot het cdm\\_data\\_type. Zo niet, dan zal de dataset niet laden en een fout maken. Zie de documentatie voor[cdm\\_data\\_type](/docs/server-admin/datasets#cdm_data_type).
        * FYI: Er is een nieuw datasettype: EDDTableFromAsciiServiceNOS.
        * FYI: Er zijn drie nieuw toegelatenioos\\_categoryopties: Hydrologie, Kwaliteit (bv. voor kwaliteitsvlaggen) , en statistieken (b.v. gemiddelde) .
        * Voor EDDTableVan... Bestanden datasets, verwijder alle&lt;nDimensions&gt; tags. Ze zijn niet langer nodig of gebruikt.
        * Voor variabelen metdestinationName= hoogte,ERDDAP™dwingt niet langer delong\\_nameOm hoogte te zijn. Ga door uwdatasets.xmlen herhaaldelijk zoeken naar&lt;destinationName&gt;hoogte en voeg aan die variabele toe&lt;addAttributes&gt;:
```
              <att name="long\\_name">Altitude</att>  
```
             (of een iets anderelong\\_namein bijzondere gevallen) .
        * Optioneel: Alle EDDTableFromFiles subclasses support variabele[sourceName= global: ...](/docs/server-admin/datasets#global-sourcenames)om globale metadata van elk bestand om te zetten in een gegevensvariabele. Dankzij Lynn DeWitt.
    * EDDTableVanDatabase gebruikers --ERDDAP™wordt geleverd met een nieuwe JDBC 4 driver voor Postgres. Voor andere databases, controleer het web voor het nieuwste JDBC .jar bestand voor uw database. SindsERDDAP™nu gebruiktJava1,6+, JDBC 4 (niet 3) wordt waarschijnlijk aanbevolen.
    * FYI
        *   EDDGridVan...Bestanden en EDDtabel Van... Bestandsdatasets slaan nu het bestandTable informatie op in
            \\[bigParentDirectory\\]/dataset Informatie/\\[datasetID\\]/\\*.ncdossiers.
Ook EDDTable datasets slaan nu de subset informatie op in
            \\[bigParentDirectory\\]/dataset Informatie/\\[datasetID\\]/\\*.ncdossiers. Deze bestanden waren vroeger
            \\[bigParentDirectory\\]/dataset Informatie/\\[datasetID\\]*.jsondossiers.
De oude bestanden worden automatisch verwijderd wanneerERDDAP™begint. Of u kunt alle bestanden verwijderen (maar laat de lege submappen achter) in\\[bigParentDirectory\\]/datasetInfo/.
        * Ik werkte aan een nieuwe EDDTableFromNcCFFiles die gegevens van lokale en externe bestanden zou lezen met behulp van de voorgestelde, nieuwe CF Point Observation Conventions. Maar het staat niet in deze release. Er zijn problemen in de netcdf-java bibliotheken met betrekking tot sommige methoden voor het lezen van deze bestanden. En er waren enkele zeer recente wijzigingen in de voorgestelde CF Point Observation Conventions. Wanneer de netcdf-java-bibliotheek is gerepareerd en bijgewerkt naar het laatste voorstel, zal ik de werkzaamheden hierop hervatten.
        * UitvoerenERDDAP™op Windows kunnen problemen hebben: met name, kunt u zien in de\\[bigParentDirectory/logs/log.txt bestand datERDDAP™kan soms bestanden niet snel verwijderen en/of hernoemen. Dit is te wijten aan antivirus software (bijvoorbeeld van McAfee en Norton) die de bestanden op virussen controleert. Als u dit probleem tegenkomt (die kunnen worden gezien door foutmeldingen in het log.txt bestand zoals "Niet in staat om te verwijderen ...") , het veranderen van de instellingen van de antivirussoftware kan gedeeltelijk verlichten het probleem.
Indien deERDDAP™in Windows is gewoon een test uitgevoerd op uw bureaublad, dit is gewoon een ergernis.
Indien deERDDAP™in Windows is uw publiekERDDAP™, overwegen om te schakelen naar een Linux server.
    * Langzame eerste start -- De eerste keer dat je vluchtERDDAP™na verbetering,ERDDAP™kan traag zijn om de datasets te laden. De wegERDDAP™slaat informatie over geaggregeerde bestanden is veranderd, dusERDDAP™zal wat info van al die bestanden opnieuw moeten lezen. Dat kost tijd.
    * Fouten bij opstarten -- Gezien de wijzigingen in verband met cdm\\_data\\_type, is het waarschijnlijk dat sommige van uw datasets niet zullen laden en fouten zullen gooien. Lees zorgvuldig de Daily Report e-mail dieERDDAP™stuurt u wanneerERDDAP™is klaar met starten. Het zal een lijst hebben van datasets die niet geladen zijn (bovenaan) en de reden waarom ze niet geladen (nabij de onderkant) .
    * Als je vastzit of andere vragen hebt, stuur me dan de details:erd.data at noaa.gov.
    * Programmeurs -- Als je schrijftJavaprogramma's die draaienERDDAP™code, je moet een aantal van de commandoregel parameter referenties wijzigen:
        * Verander joda-tijd 1,6.2.jar in joda-tijd. pot
        * Wijzig de verwijzing naar Postgres JDBC .jar naar postgresql.jdbc.jar
*    **Kleine wijzigingen en foutenfixes:** 
    
    * Verbeterde verbinding handling om opgehangen draden te voorkomen.
    * Verbeterde concurrency praktijken om bijna gelijktijdige identieke verzoeken efficiënter te behandelen.
    *   ERDDAP™nu gebruikt netcdfAll-4.2.jar (hernoemd naar netcdfAltijd-laatste. pot) . Deze switch vereiste verschillende interne wijzigingen en veroorzaakte een paar kleine externe veranderingen, bijvoorbeeld, veranderingen in hoe grib bestanden worden gelezen en kleine wijzigingen in de.ncKopuitgang.
    * Nieuwe functie:\\[erddap\\]/convert/fipscounty.html convertsFIPSprovinciecodes naar/van provincienamen.
    * Op kaarten zijn staatsgrenzen nu donker violet, dus ze vallen beter op op alle achtergrondkleuren.
    * Tabel.kmluitvoer gebruikt opnieuw een rond pictogram om punten te markeren (niet het vliegtuig pictogram Google onlangs overgeschakeld op) .
    * De erdCalcofi datasets werden herschikt en worden nu geserveerd vanuit lokale bestanden (sneller) .
    * GenererenDatasets Xml van Droes Catalogus maakt nu een resultaatbestand aan:
        \\[kat\\]/webapps/erdap/WEB-INF/temp/EDDGridVan ThreddsCatalog.xml . Dankzij Kevin O'Brien.
    * GenererenDatasets Xml van Droes Catalogus probeert nu onnodige poortnummers te verwijderen uit de bron-URL's (b.v.: 8080 en 8081 kunnen soms worden verwijderd) . DankzijNOAAHet beveiligingsteam van de centrale.
    * Voor .subset webpagina's heeft de Map of Distinct Data nu een variabele lat lon range.
    * Verschillende lijsten inERDDAP™  (b.v. de tabel met alle datasets) werden gesorteerd zodat A..Z gesorteerd voor a..z. Nu sorteren ze op een ongevoelige manier.
    * Kleine wijzigingen in de .subset webpagina's, inclusief: eenheden worden nu aangegeven.
    * GenererenDatasets Xml en DasDds gooien geen uitzondering meer als de resultaten niet op het systeem klembord of displayInBrowser kunnen worden geplaatst. Dankzij Eric Bridger en Greg Williams.
    * Bugfix: Wanneer datasets worden geladen,ERDDAP™nu verwijdert of past de geospatial globale eigenschappen. Dankzij Charles Carleton.
    * Bug fix: String2.getClassPath () nu correct procent-decodeert de klasse Pad (met name op Windows verschenen spaties in de bestandsnaam als %20) . Dit beïnvloeddeERDDAP™EDStatic aanroepen SSR.getContextDirectory () en het vinden van inhoud/erdap. Dankzij Abe Coughlin.
    * Bug fix: in EDDTableFromFiles gerelateerd aan krijgenDataForDapQuery behandeling van onderscheiden () verzoeken. Dankzij Eric Bridger.
    * Bugfix:tabledapverzoeken niet goed omgaan hoogte beperkingen wanneer de dataset hoogte MetersPerSourceUnit was -1. Dankzij Eric Bridger.
    * Bugfix: EDDTableVanaf... Bestanden datasets behandelen nu correct verzoeken die =NaN en &#33;=NaN omvatten.
    
## Versie 1.28{#version-128} 
 (uitgebracht 2010-08-27) 

*    **Nieuwe functies:** Geen.
*    **DingenERDDAP™Beheerders moeten weten en doen:** Geen.
*    **Bug Fix:** Een programmeerfout herstellen (alleen in vers 1.26) Dat maakteERDDAP™Heel langzaam.
     

## Versie 1.26{#version-126} 
 (uitgebracht 2010-08-25) 

*    **Nieuwe functies:** Geen.
*    **DingenERDDAP™Beheerders moeten weten en doen:** 
    * Vanuit uw\\[kat\\]/content/erddap/setup.xml,
        * In&lt;legaal&gt;, op een nieuwe regel hieronder\\[standaard DataLicenses\\], invoegen\\[standaardContact\\].\\[standaardContact\\]verwijst naar de&lt;adminEmail&gt; opgegeven hoger in setup.xml.
        * Verwijderen&lt;tabelCommonBGColor&gt; en&lt;tabelHighlightBGColor&gt;.
        * Aanbevolen: Verschil&lt;endBodyHtml&gt; to
```
            <endBodyHtml><!\\[CDATA\\[  
            <br>&nbsp;  
            <hr>  
            ERDDAP, Version &erddapVersion;  
            <br><a href="&erddapUrl;/legal.html">Disclaimers</a> |  
            <a href="&erddapUrl;/legal.html#privacyPolicy">Privacy Policy</a> |  
            <a href="&erddapUrl;/legal.html#contact">Contact</a>  
            </body>  
            \\]\\]></endBodyHtml>
```

    * Vereist: Op uw\\[kat\\]/content/erddap/images/erddap.css en erddapAlt.css, onderaan toevoegen:
```
        /\\* This is used on the /info/\\[datasetID\\]/index.html pages to highlight a row or cell. \\*/  
        tr.highlightBGColor {background-color:#cceecc; }  
        td.highlightBGColor {background-color:#cceecc; }
```
*    **Bugfixes en kleine wijzigingen:** 
    
    * Bugfix: in sommige situaties werkten formulieren niet in sommige versies van Internet Explorer. Hartelijk dank aan Greg Williams.
    * Bugfix: De Make A Graph knoppen werkten niet als de dataset van een remote wasERDDAP.
    * Bugfix:WMSSoms werkte het niet als de dataset van een remote wasERDDAP.
    * Veel kleine wijzigingen en fouten herstellen.
    

## Versie 1.24{#version-124} 
 (uitgebracht 2010-08-06) 

*    **Nieuwe functies:** 
    * Nieuw[Subset webpagina's](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/index.html)gebruik facet search om subgroepen van tabeldatasets te selecteren. Dankzij POST.
    * Nieuw[Geavanceerd zoeken](https://coastwatch.pfeg.noaa.gov/erddap/search/advanced.html)combineert alle andere zoekopties en voegt lengte, breedtegraad en tijdgebonden vakken. Dankzij Ellyn Montgomery. (Sorry voor de vertraging.) 
    * Nieuw[Tijd omzetten](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)Web pagina en service kunt u numerieke tijden converteren naar / van ISO string times.
    * Nieuw[Eenheden omzetten](https://coastwatch.pfeg.noaa.gov/erddap/convert/units.html)webpagina en service kunt u converterenUDUNITSvan/naar UCUM-eenheden. DankzijNOAAIOOSSOS.
    * Indien eentabledapverzoek bevat & eenheden ("UCUM") , de eenheden namen zullen worden omgezet van originele namen (meestalUDUNITS) tot[UCUM](https://unitsofmeasure.org/ucum.html)namen van eenheden. Dit heeft alleen effect op eenheden\\*namen\\*, geen gegevenswaarden. DankzijNOAAIOOSSOS.
    * Verbeteringen om een grafiek te maken webpagina's en grafieken en kaarten:
        * Als de grafiek een kaart is, zijn er nieuwe Make A Graph knoppen om in/uit te zoomen en een nieuwe optie om te klikken om het middelpunt van de kaart te wijzigen. Dankzij POST.
        * Filterinstellingen toegevoegd aan de onderkant. Dankzij Greg Williams.
        * De ingebouwde kustgegevens werden bijgewerkt naar GSHHS v2.0. Dankzij POST.
        * Kaarten omvatten nu meren en rivieren. Dankzij POST. (Sorry, de Sacramento River Delta ontbreekt omdat noch de kustlijn gegevens, noch het meer / rivier dataset behandelt.) 
        * De ingebouwde van pscoast afgeleide natie/staat bestanden werden bijgewerkt. Dankzij POST.
        * Topografie.cpt werd licht gewijzigd. (Sorry als dit nadelig voor je is.) Dankzij POST.
        * In griddap's Make A Graph, als een gebruiker een variabele verandert, wordt het formulier automatisch opnieuw ingediend zodat deaxisVariables' showStartAndStop weerspiegelt altijd de grafiekvariabelen. Dankzij Joaquin Trinanes.
        * Voor png en pdf image URL's:
            * Nieuw &.land=_value_, waar _value_ "onder" kan zijn (topografie tonen) of "over" (gewoon bathymetrie tonen) . Indien niet opgegeven, wordt de standaard ingesteld door[drawLandMask](/docs/server-admin/datasets#global-drawlandmask)indatasets.xmlof setup.xml. Dankzij POST.
            * Nieuw: regels in de legende die te lang zijn, worden automatisch in meerdere regels gebroken. Dankzij POST.
        * Voor png afbeeldingsURL's:
            * Nieuwe &.legend=_value_, waar _value_ "onder" kan zijn (standaard) "Off" of "Only." Hiermee kun je de legende opnemen, de legende uitsluiten, of alleen de legende krijgen. Dankzij Cara Wilson.
            * Nieuw &.trim=_n Beeldpunten_ laat een rand van nPixels achter (bv. 10) onderaan de afbeelding. Het wordt toegepast na .legend=off. Dankzij Cara Wilson.
            * Nieuwe &.size=_width_|_Hoogte_ kunt u de breedte en hoogte van de afbeelding, in pixels.
    * Nieuwe uitvoerbestandsformaten:
        * .csvp en.tsvp -- zoals .csv en.tsv" (_Eenheden_) " toegevoegd aan kolomnamen op de eerste regel.
        * .odvTxt -- maakt een .txt bestand dat het vereenvoudigt om gegevens te krijgen in[Gegevens over de oceaan Beeld (ODV) ](https://odv.awi.de/).
        * .esriCsv -- maakt een .csv bestand geschikt voor import in ESRI'sArcGIS. (Alleen tabeldatasets) Dankzij Jan Mason, Jeff de La Beaujardiere, enNOAAIOOSSOSproject.
    * GUI verbeteringen aan de[Categorieën](https://coastwatch.pfeg.noaa.gov/erddap/categorize/index.html)Webpagina's. Ook de categoriseren waarden (andere dan instellingen) zijn nu allemaal kleine letters. Niet-lagere caseverzoeken worden geaccepteerd (omgeleid) voor achterwaartse compatibiliteit. Dankzij Roy Mendelssohn.
    * Foutmeldingen zijn nu nog korter en meer gericht op gebruikers. Dankzij Greg Williams.
    * Een interne verandering die sterk vermindertERDDAPHet basisgeheugengebruik.
    * Veel nieuwe functies die alleen relevant zijn voor het POST-project.
*    **DingenERDDAP™Beheerders moeten weten en doen:** Er zijn veel veranderingen. Sorry. Maar elk brengt een aantal mooie voordelen.
    * Grote veranderingen in GenerateDatasetXml -- het stelt nu vaak meer vragen (zie het relevante[dataset Typen](/docs/server-admin/datasets#detailed-descriptions-of-dataset-types)informatie) en genereert nu altijd in essentie kant-en-klare inhoud voordatasets.xml. U bent nog steeds verantwoordelijk voor de setup, dus je moet nog steeds dedatasets.xmlinhoud alvorens het te gebruiken. Een menselijke inzet in het project zal altijd beter doen dan een computerprogramma. Dankzij het UAF project.
    * VERPLICHT: In setup.xml moet u deWMSSection. Het moet nu deze tags bevatten (maar voel je vrij om de waarden te veranderen) :
```
        <!-- These default accessConstraints, fees, and keywords are used 
        by the SOS, WCS, and WMS services.
        They can be overridden by "accessConstraints", "fees", "keywords" 
        attributes in a dataset's global metadata.
        If a dataset that has an "accessibleTo" tag doesn't override 
        "accessConstraints", then the default for "accessConstraints" is the
        "accessRequiresAuthorization" value.  
        -->
        <accessConstraints>NONE</accessConstraints>
        <accessRequiresAuthorization>only accessible to authorized
        users</accessRequiresAuthorization>
        <fees>NONE</fees>
        <keywords>Earth science, oceans</keywords> 
        
        <!-- This appears on the erddap/legal.html web page after the 
        General Disclaimer. 
        You can replace any of the \\[standardParts\\] with your own HTML. -->
        <legal><!\\[CDATA\\[
        \\[standardDisclaimerOfEndorsement\\]
        \\[standardDisclaimerOfExternalLinks\\]
        \\[standardPrivacyPolicy\\]
        \\[standardDataLicenses\\]
        \\]\\]></legal>
        
        <!-- Specify the default units standard (e.g., "UDUNITS" 
        (the default) or "UCUM") that you (the ERDDAP™ admin) are using to 
        specify units.  The value is case-sensitive.
        This is used by ERDDAP's SOS server to determine if the units need to
        be converted to UCUM units for WMS and SOS GetCapabilities responses. 
        -->
        <units\\_standard>UDUNITS</units\\_standard>
        
        <!-- For the wms examples, pick one of your grid datasets that has
        longitude and latitude axes.
        The sample variable must be a variable in the sample grid dataset.
        The bounding box values are minx,miny,maxx,maxy.
        -->
        <wmsSampleDatasetID>erdBAssta5day</wmsSampleDatasetID>
        <wmsSampleVariable>sst</wmsSampleVariable>
        <!-- The bounding box values are 
           minLongitude,minLatitude,maxLongitude,maxLatitude.
           Longitude values within -180 to 180, or 0 to 360, are now okay. -->
        <wmsSampleBBox>0,-75,360,75</wmsSampleBBox>
```

    * VEREIST: Kopieer en plak in setup.xml dit nieuwe voorstel&lt;startHeadHtml&gt; om uw oude versie te vervangen. Maar voel je vrij om wijzigingen aan te brengen voor je voorkeuren.
```
        <!-- startHeadHtml has the start of the HTML document and the 
        'head' tags (starting at "<!DOCTYPE>", but not including 
        "</head>") for all HTML web pages. 
        This may include &erddapUrl;, which is expanded to be 
          \\[baseUrl\\]/erddap (or \\[baseUttpsUrl\\]/erddap if the user is logged in).
        If your ERDDAP™ allows users to log in, all referenced image files, 
          css files, etc. must be in \\[tomcat\\]/content/erddap/images or a 
          subdirectory and must be referenced here with 
          &erddapUrl;/images/\\[fileName\\].
        
        favicon.ico is the image that browsers associate with your website.
        For more information, see https://en.wikipedia.org/wiki/Favicon .
        You can use your own favicon.ico file by putting it in 
          \\[tomcat\\]/content/erddap/images. 
        
        \\*\\*\\* Optional: you can change the appearance of all of your 
        ERDDAP's HTML pages by changing the CSS <style> settings below.
        
        For an example of a very different style, change the import reference
        to <tomcat>/content/erddap/images/erddapAlt.css
        
        \\*\\*\\* If your CSS style includes links to files (e.g., images), that 
        style information must be inline in the style tag below, after the
        'import' line, not in the .css file.  
        Put all of the (e.g., image) files in the 
        \\[tomcat\\]/content/erddap/images directory (or a subdirectory) and 
        reference them below starting with &erddapUrl;.
        Why? On ERDDAP™ https: web pages, \\*all\\* links should use "https:" 
        (not "http:"); otherwise, most browsers consider the web page not 
        fully secure.  Because ERDDAP™ would use the same .css file for 
        http: and https: web pages, the links within the .css file wouldn't 
        switch between http: and https:.  There doesn't seem to be a way 
        around this other than using inline style information.
        -->
        <startHeadHtml><!\\[CDATA\\[ 
        <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
          "http://www.w3.org/TR/html4/loose.dtd">
        <html>
        <head>
        <title>ERDDAP</title>
        <link rel="shortcut icon" href="&erddapUrl;/images/favicon.ico">
        <style type="text/css">
        <!--
          @import "&erddapUrl;/images/erddap.css";
        -->
        </style>
        \\]\\]></startHeadHtml>
        
        <!-- The tableCommonBGColor MUST be the same color as the 
           table.commonBGColor in erddap.css above. Suggested is #f1ecd8. 
           But if you use erddapAlt.css, change this to #e7dec5. -->
        <tableCommonBGColor>#f1ecd8</tableCommonBGColor>
        
        <!-- This is used, e.g., for the type=variable rows on the metadata
          info tables. -->
        <tableHighlightBGColor>#cceecc</tableHighlightBGColor>
```

Dankzij POST, Hans Vedo en Rick Blair.
    * VERPLICHT: in setup.xml, in&lt;startBodyHtml&gt;, wijzig de&lt;body&gt;-tag om gewoon te zijn&lt;body&gt;, omdat de stijl nu is ingesteld door erddap.css.
    * VEREIST: In setup.xml, verander naar deze&lt;endBodyHtml&gt; (maar verander het e-mailadres in uw e-mailadres en voel je vrij om andere wijzigingen aan te brengen) :
```
        <!-- The end of the body of the HTML code for all HTML web pages
          (with "</body>" at the end). 
        This may include &erddapUrl;, which is expanded to be 
          \\[baseUrl\\]/erddap (or \\[baseUttpsUrl\\]/erddap if the user is logged in).
        If your ERDDAP™ allows users to log in, all referenced image files, etc. 
          must be in \\[tomcat\\]/content/erddap/images or a subdirectory
          and must be referenced here with &erddapUrl;/images/\\[fileName\\].
        
        You can change this, but please keep "ERDDAP, Version &erddapVersion;"
        and these references to the Disclaimers and Privacy Policy. -->
        <endBodyHtml><!\\[CDATA\\[ 
        <br>&nbsp;
        <hr>
        ERDDAP, Version &erddapVersion;
        <br><font class="subduedColor">Questions, comments, 
          suggestions?  Please send an email to 
          <tt>erd dot data at noaa dot gov</tt>
        <br>and include the ERDDAP™ URL directly related to your question
          or comment.
        <br>
          <a href="&erddapUrl;/legal.html">Disclaimers</a> | 
          <a href="&erddapUrl;/legal.html#privacyPolicy">Privacy 
            Policy</a>
        </font>
        </body>
        \\]\\]></endBodyHtml>
```

    * HOGE AANVAARD: In setup.xml, de aanbevolen&lt;de korte beschrijvingHtml&gt; is nu
```
        <theShortDescriptionHtml><!\\[CDATA\\[ 
        <h1>ERDDAP</h1>
        This website (the Environmental Research Division's Data Access 
        Program) aggregates scientific data from diverse local and remote 
        sources and offers you a simple, consistent way to download subsets 
        of the data in common file formats and make graphs and maps.
        This particular ERDDAP™ installation has oceanographic data
        (for example, data from satellites and buoys).
        
        \\[standardShortDescriptionHtml\\]
        \\]\\]></theShortDescriptionHtml>
```

Voel je vrij om dit te veranderen, vooral de laatste zin in de eerste alinea.
    * In setup.xml, e-mailAllesnaar en e-mailDailyReport Om nu komma-gescheiden lijsten van e-mailadressen. De eerste e-mailAlles Aan is speciaal, bijvoorbeeld, abonnementen op EDDXxxxFromErdap datasets gebruiken dat e-mailadres. Dankzij John Maurer.
    * E-mailfouten worden nu aangemeld bij de\\[bigParentDirectory\\]/logs/emailLog JJJJ-MM-DD.txt bestand.
    * In setup.xml is er een nieuwe, optionele parameter om e-mailaccount eigenschappen in te stellen (meestal direct na&lt;e-mailWachtwoord&gt;):
```
          <emailProperties>_propertyName1_|_propertyValue1_|_propertyName2_| _propertyValue2_|...</emailProperties>  
        For example, gmail accounts need  
          <emailProperties>mail.smtp.starttls.enable|true</emailProperties>  
```

De standaard is niets. Dankzij Rich Signell.
    * VERPLICHT: als u EDDTableCopy ofEDDGridBegrepen, jullie moeten delete allemaal\\[bigParentDirectory\\]/copy/mappen en bestanden die "xh" bevatten in de map of bestandsnamen na het stoppen van de oudeERDDAP™en voor het starten van de nieuweERDDAP™Dus die bestanden worden opnieuw gekopieerd. Het spijt me, maar het was belangrijk om de verandering te maken en hopelijk beïnvloedt het weinig beheerders en weinig bestanden.
In Linux kun je deze bestanden vinden met, cd\\[bigParentDirectory\\]/kopie
vinden.\\*xh\\*  
In Windows kunt u deze bestanden vinden met, Start|Zoeken
Waar wilt u naar zoeken: Documenten
Alle of een deel van de bestandsnaam: xh
Kijk in: Bladeren -&gt;\\[bigParentDirectory\\]/kopie
Klik op 'Zoeken'
^A om ze allemaal te selecteren
Del om ze allemaal te verwijderen
    * VERPLICHT:datasets.xml, voor EDDTableFromDatabase datasets, voor datum- en tijdstempelvariabelen, de gegevens wijzigen Type te verdubbelen en de eenheden naar seconden sinds 1970-01-01T00:00:00Z. We eisen dat u tijdstempelgegevens opslaat in de database\\*met\\*een tijdzone. Zonder tijdzone informatie, de vragen dieERDDAP™stuurt naar de database en de resultaten dieERDDAP™krijgt uit de database via JDBC zijn dubbelzinnig en zijn waarschijnlijk verkeerd. We hebben het geprobeerd, maar vonden geen betrouwbare manier om om te gaan met "timestamp zonder tijdzone" gegevens. Wij vinden dit toch een goede praktijk. Immers, "timestamp zonder tijdzone" data heeft een impliciete tijdzone. Hoewel het geweldig is dat de tijdzone duidelijk is voor de database admin, is het zinvol om het expliciet te specificeren zodat andere software goed kan communiceren met uw database. Bedankt/sorry Michael Urzen.
    * HOOG AANVAARD:datasets.xml, om .subset webpagina's in te schakelen voor gefacetteerde zoektocht naar uw tabeldatasets, moet u [ toevoegen&lt;subsetVariables&gt;] (/docs/server-admin/datasets#subsetvariabelen) naar de globale eigenschappen van de dataset.
    * AANVAARD:datasets.xml, als u de dataset metdatasetID="pmelGtsppp," verander het alsjeblieft
```
          <dataset type="EDDTableFromDapSequence" datasetID="pmelGtsppp" active="false">  
        Whether or not you had that dataset, feel free to add this new GTSPP dataset:  
          <dataset type="EDDTableFromErddap" datasetID="erdGtsppBest">  
            <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGtsppBest</sourceUrl>  
          </dataset>
```
    * AANVAARD:datasets.xml, zijn er nieuwe geldige opties voor de [&lt;cdm\\_data\\_type&gt;] (/docs/server-admin/datasets#cdm_data_type) global attribuut, dus je moet de waarde voor je datasets bekijken/wijzigen.
    * Indatasets.xml, de nieuwe [&lt;sourceNeedsExpandedFP\\_EQ&gt;] (/docs/server-admin/datasets#sourceneedsexpandedfp_eq) is nuttig als de bronserver &_variable_\\=_value_test niet consequent correct behandelt (vanwege de[algemene moeilijkheid bij het testen van de gelijkwaardigheid van zwevende puntnummers](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/)) . sourceNeedsExpandedFP\\_EQ standaard ingesteld op waar (de veiligste instelling) Dus je hoeft niets te veranderen.
    * Nieuw[EDDtabelVanAsciiFiles](/docs/server-admin/datasets#eddtablefromasciifiles). Dankzij Jerry Yun Pan.
    * Nieuw[EDDtableFromDreddsFiles](/docs/server-admin/datasets#eddtablefromthreddsfiles). Dankzij Roy Mendelssohn.
    * Wijzigingen in[EDDtabelVanNcFiles](/docs/server-admin/datasets#eddtablefromncfiles)laat het worden gebruikt met een breder scala aan bestanden.
    * EDDTableFromBMDE is uitgeschakeld. Er zijn geen actieve, geschikte gegevensbronnen meer.
    * In GenerateDatasetXml, de nieuweEDDGridVan Thredds Catalogus oogst een hele THREDDS catalogus (of een deelverzameling) en genereertdatasets.xmlinhoud. Dankzij het UAF project.
    * GenererenDatasets Xml en DasDds zetten nu ook hun resultaten in\\[bigParentDirectory\\]/logs/log.txt Dankzij Rich Signell en Charles Carleton.
    * Veel verbeteringen aan het inlogsysteem. Dankzij POST.
*    **DingenERDDAP™Programmeurs Noodzaak om te weten en te doen:** 
    * Er zijn wijzigingen opgetreden in de /WEB-INF/lib/ directory. Wijzig uw javac en java classpath instellingen dienovereenkomstig.
    * Er is een nieuwe\\[uw Url\\]/erddap/versiedienst om de versie van eenERDDAP. Het antwoord is tekst, bijvoorbeeld:ERDDAP\\_versie=1.24 Als u een HTTP 404 Not-Found foutmelding, behandelen deERDDAP™als versie 1.22 of lager. Dankzij POST.
*    **Kleine wijzigingen en foutenfixes:** 
    
    * EDDTabelVan Wijzigingen in de sos:
        * Vervallen ondersteuning voor het lezen van IOOSSOSXML antwoorden.
        * Ondersteuning toegevoegd voor het lezen van IOOSSOStekst/csv. (Dus NOSSOSservers worden momenteel niet ondersteund.) 
        * Maakte veel veranderingen in verband met IOOSSOSserverdetails.
        * Toegevoegd ondersteuning voor BBOX queries voor IOOSSOSenOOSTethys SOSservers. Deze veranderingen leiden tot een grote snelheid voor relevante dataverzoeken. Dankzij IOOSSOS.
    * Tekst in.matTabelgegevensbestanden worden nu correct opgeslagen. Dankzij Roy Mendelssohn.
    *   WMS
        *   OpenLayersis nu gebundeld metERDDAP™voor gebruik op deWMSWebpagina's. Dit lost het probleem veroorzaakt wanneerOpenLayerseen paar maanden geleden gewijzigd en toekomstige problemen voorkomen.
        * In deWMS GetCapabilitiesreactie, de&lt;OnlineResource&gt; waarde is nu de URL van deWMSservice. Dankzij Charlton Galvarino.
        * Een legende wordt weergegeven op deWMSwebpagina om de kleurbalk te tonen. Dankzij Emilio Mayorga.
    *   EDDGridAggregatedExistingDimension constructor had problemen als een as bron Waarden waren niet gelijk aan hun bestemming Waarden, bijvoorbeeld als brontijd iets anders was dan"seconds since 1970-01-01". DankzijToddSpindler.
    * In TableWriterGeoJson, de overmaat ',' na bbox\\[...\\]is verwijderd. Dankzij Greg Williams.
    * Veel kleine wijzigingen en fouten herstellen.
    
## Versie 1.22{#version-122} 
 (uitgebracht 2009-07-05) 

* De in 1.20 geïntroduceerde SlideSorter bug is vast.
* De OBIS bug geïntroduceerd in 1.20 is vast.
* De verwijzingen naar Jason datasets op de afbeeldingen/gadgets/GoogleGadgets pagina werden verwijderd.
     
## Versie 1.20{#version-120} 
 (uitgebracht 2009-07-02) 

*   ERDDAP™administrators, voeg dit toe aan uw setup.xml bestand:
```
    <!-- If you want to restrict access to some datasets, you need to 
    specify the method used for logging on (authentication). See the info 
    at https://erddap.github.io/setup.html#security
    Currently, the options are: "" (logins not supported, the default),
    "custom", "openid". Note that openid login doesn't work when testing 
    with localhost (https://127.0.0.1:8443).
    -->
    <authentication></authentication>
    
    <!-- This specifies how you have stored passwords in the roles tags 
    in datasets.xml. If you aren't storing any passwords this is irrelevant.
    The options (in order of increasing security) are: "plaintext", "MD5", 
    or "UEPMD5" (MD5(UserName:ERDDAP:Password), the default).
    You should only use "plaintext" or "MD5" if you need to match values 
    stored that way in an external password database.  See the info at
    https://erddap.github.io/setup.html#security
    -->
    <passwordEncoding>UEPMD5</passwordEncoding>
    
    <!-- This determines whether datasets that the user doesn't currently
    have access to (because he isn't logged in or because his roles don't
    allow access) should be shown on lists of data sets 
    (e.g., from full text search, categorize, view all datasets, ...).
    The options are: "true", or "false" (the default).
    If false, no information about the dataset (even its existence) is 
      shown to users who don't have access to it.
    If true, some information about the dataset (title, summary, etc) is
      shown to users who don't have access to it.  
      If the user clicks on a link to a dataset he doesn't have access to,
      he will get an error message and be prompted to log in.
    -->
    <listPrivateDatasets>false</listPrivateDatasets>
    
    <!-- If the number of requests between two runs of LoadDatasets 
    exceeds unusualActivity, an email is sent to emailEverythingTo.
    The default is 10000.
    -->
    <unusualActivity>10000</unusualActivity>
```

* Nieuwe datasets[EDDGridKopiëren](/docs/server-admin/datasets#eddgridcopy)en[EDDtabelkopie](/docs/server-admin/datasets#eddtablecopy)een lokale kopie van een ander maken en bewarenEDDGridof EDDTable dataset gegevens en serveren gegevens van de lokale kopie. Deze zijn zeer gemakkelijk te gebruiken en zeer effectief **oplossingen voor enkele van de grootste problemen bij het bedienen van gegevens uit externe gegevensbronnen:** 
    
    * De toegang tot gegevens van een externe gegevensbron kan traag zijn (om verschillende redenen) .
    * De externe dataset is soms niet beschikbaar (opnieuw, om verschillende redenen) .
    * Vertrouwen op één bron voor de gegevens niet goed schalen (b.v. wanneer veel gebruikers en veelERDDAPGebruik het) .
    
Plus, de lokale kopie is een back-up van het origineel, die nuttig is voor het geval er iets gebeurt met het origineel.
    
Er is niets nieuws aan het maken van een lokale kopie van een dataset. Wat hier nieuw is, is dat deze klassen het maken.\\*gemakkelijk\\*het creëren en\\*handhaven\\*een lokale kopie van gegevens van een\\*ras\\*van soorten externe gegevensbronnen en\\*Metadata toevoegen\\*tijdens het kopiëren van de gegevens.
    
Deze datasettypes maken deel uit van een complete reeks functies die het creëren van[rasters/clusters/feeraties vanERDDAPs](/docs/server-admin/scaling)zeer zware lasten te hanteren (bv. in een datacenter) .
    
* Nieuw datasettype[EDDTableFromDatabase](/docs/server-admin/datasets#eddtablefromdatabase)krijgt gegevens uit een lokale of externe databasetabel.
*   ERDDAP™nu heeft een[beveiliging](/docs/server-admin/additional-information#security)systeem dat authenticatie ondersteunt (gebruikers inloggen) en vergunning (hen toegang te verlenen tot bepaalde particuliere datasets) .
* Er zijn[twee, nieuwe, command-line tools](/docs/server-admin/datasets#tools)te helpenERDDAP™beheerders genereren de XML voor een nieuwe dataset indatasets.xml:
    * GenererenDatasets Xml kan een ruwe versie van de dataset XML genereren voor bijna elk type datasets.
    * DasDds helpt u herhaaldelijk de XML te testen en te verfijnen voor een dataset.ERDDAP's GenerateDatasets Xml webpagina's zijn verwijderd. Om veiligheidsredenen ondersteunden ze slechts enkele datasets. De nieuwe command line tools zijn een betere oplossing.
* Het nieuwe[statuspagina](/docs/server-admin/additional-information#status-page)laat iedereen (maar met name beheerders) de status van eenERDDAP™van elke browser door naar\\[baseUrl\\]/erddap/status.html.
* Tabledap ondersteunt nu[server-kant functies](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#functions):
    * &Onduidelijk () verwijdert dubbele rijen uit de responstabel;
    * &orderBy (...) kunt u aangeven hoe de responstabel moet worden gesorteerd,
    * &orderByMax (...) geeft aan hoe de responstabel gesorteerd moet worden en verwijdert alle rijen behalve de rijen met de maximumwaarden in de laatste opgegeven kolom. Dit kan bijvoorbeeld worden gebruikt om de laatste beschikbare gegevens voor elk station te krijgen.
* Tabulaire datasets kunnen nu extra datumtijdvariabelen bevatten die geen naam hebben"time". Deze variabelen worden herkend aan hun "eenheden" metagegevens, die" since "  (voor numerieke datum Tijden) of "yy" of "YY" (voor geformatteerde tekstdatumTijden) . Maar gebruik nog steeds dedestinationName "time"voor de hoofddatum Tijdsvariabele.
*   ERDDAP™nu genereert een[sitemap.xml](/docs/server-admin/additional-information#sitemapxml)bestand, die zoekmachines vertelt dat uwERDDAPMoet alleen elke maand gekropen worden.ERDDAP™beheerders, volg a.u.b.[deze instructies](/docs/server-admin/additional-information#sitemapxml)om de zoekmachines te informeren over het nieuwe sitemap.xml bestand.
*   ERDDAP's foutmeldingen zijn nu veel korter en gericht op clients (geen programmeurs) . Dankzij Greg Williams.
* [&lt;verzoekBlacklist&gt;] (/docs/server-admin/datasets#verzoekblacklist) ondersteunt nu ook IP-adressen waar het laatste nummer is vervangen door \\*.
* Verzoeken om.jsonen .geoJson bestanden kunnen nu een optionele[jsonp](https://niryariv.wordpress.com/2009/05/05/jsonp-quickly/)verzoek door toevoeging "&.jsonp=_functionName_" tot het einde van de query. Eigenlijk zegt dit alleen maar:ERDDAP™toe te voegen "_functionName_ (" naar het begin van de reactie en ") " tot het einde van de reactie. Als er oorspronkelijk geen vraag was, laat dan de "&" in uw vraag. Dankzij Greg Williams.
* Aan de[Dagelijks verslag](/docs/server-admin/additional-information#daily-report).
* Op webpagina's met lijsten van datasets, instelling en id zijn nu aan de rechterkant. Dit verplaatst abonnement en andere meer nuttige kolommen in beeld op smalle computerschermen.
* Op alle webpagina's, de titel van de pagina (gebaseerd op de&lt;titel&gt; in de&lt;startHeadHtml&gt; die u in setup.xml definieert) is gewijzigd om een betere beschrijving van de webpagina te bevatten (bijvoorbeeld door de titel en de instelling van de huidige gegevensset op te nemen) .
* Xmx informatie is nu opgenomen met de geheugen informatie afgedrukt in log.txt, het Dagelijks Verslag, en op status.html. Dankzij Ellyn Montgomery.
*   ERDDAP™beschikt over aanvullende algemene bescherming tegen alle fouten (bv. OutOfMemoryError) . Dankzij Charles Carleton.
* Verbeteringen in foutafhandeling als het antwoord al is gedaan.
* VERBETERD: EDDTableFromFiles enEDDGridFromFiles nu gewoon toestaan&lt;metadataVan&gt; eerste of laatste. voorlaatste wordt niet langer ondersteund. En de eerste en laatste zijn nu gebaseerd op de laatste ModifiedTime van de bestanden.
* Bugfix: in EDDTableVanSOS, ongeldige info voor een station gooide een uitzondering en zorgde ervoor dat de hele dataset werd afgewezen. Die stations worden genegeerd. (en het foutbericht is ingelogd om log.txt) . Dankzij Rick Blair.
     

## Versie 1.18{#version-118} 
 (uitgebracht 2009-04-08) 

* Bug fix: Vanaf 1.14, de EDDTable Data Access Form en Make A Graph web pagina niet goed omgaan met geciteerde beperkingen.
* Bug fix: Vanaf 1.14, EDDTableFromDapSequence niet correct omgaan met tijdbeperkingen als de brontijd eenheden waren niet "seconden sinds 1970-01-01T00:00:00" .
     

## Versie 1.16{#version-116} 
 (uitgebracht 2009-03-26) 

*   ERDDAP™beheerders:
    * Dit is een belangrijke release omdat het een bug die eenERDDAP™draad draait als u Tomcat Manager gebruikt om te stoppen/starten of te herladenERDDAP. Dus als je 1.16 installeert, gebruik dan niet alleen Tomcat manager om de oudeERDDAP™en zet de nieuweERDDAP. In plaats daarvan: **het oude uitschakelenERDDAP™, herstart Tomcat (of de server) , zet dan de nieuweERDDAP.** Het is altijd een goed idee om dat te doen bij het installeren van een nieuwe versie.
    * Toevoegen [&lt;verzoekBlacklist&gt;&lt;/verzoekBlacklist&gt;] (/docs/server-admin/datasets#verzoekblacklist) uwdatasets.xml. Dit kan worden gebruikt om een lijst met IP-adressen van de client op te geven die geblokkeerd moeten worden (b.v. een ontkenningsaanval of een te ijverige webrobot afweren) .
* Er is nu een\\[bigParentDirectory\\]/logsmap om deERDDAP™logbestanden. Wanneer u begintERDDAP™, het maakt een archiefkopie van log.txt en log. txt.vorige bestanden met een tijdstempel. Als er problemen waren voor de herstart, kan het nuttig zijn om deze bestanden te analyseren.
*   ERD'sERDDAP™nu is het abonnementssysteem ingeschakeld.
*   ERDDAP™staat opnieuw toe (maar nog steeds niet aanbevelen) de codering "%26" van "&" in verzoekURL's (zie[gerelateerde v1.14 verandering](#percent26)) .
* Verschillende nieuwe toevoegingen aan de Tally sectie van de[Dagelijks verslag](/docs/server-admin/additional-information#daily-report).
* Kleine bugfixes in generateDatasetsXml.
* Een paar kleine foutjes.
     

## Versie 1.14{#version-114} 
 (uitgebracht 2009-03-17) 

* Wijzigingen voor gebruikers:
    * Bij verzoeken om rastergegevens,ERDDAP™ondersteunt nu:[last-n](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#last)waarbij n een geheel getal indexen is en[ (last-d) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#lastInParentheses)waarbij d een numerieke waarde is (voor tijd, het is in seconden) .
    * In tabelgegevens verzoeken, String beperkingen nu vereist[dubbele citaten](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#QuoteStrings)rond de waarde, bijvoorbeeld, &id="NDBC40121" Dit is vereist door deDAPprotocol.
    * In tabelgegevensverzoeken,ERDDAP™Nu vereist dat[alle beperkingen zijn correct procent gecodeerd](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#PercentEncode). Browsers doen dit automatisch, dus dit beïnvloedt meestal computerprogramma's/scripts die toegang hebben totERDDAP.
#### Procent26{#percent26} 
*   [Wat voorafging:](#percent26)de[een grafiek webpagina insluiten](https://coastwatch.pfeg.noaa.gov/erddap/images/embed.html)en de[ERDDAP™Google Gadget webpagina](https://coastwatch.pfeg.noaa.gov/erddap/images/gadgets/GoogleGadgets.html)zei om de "&" in de URL van de afbeelding te vervangen door "%26." Vanaf nu moet je de "&" in de URL van de afbeelding vervangen door "&amp;." Dus je moet alle "%26" in bestaande webpagina's en Google Gadgets vervangen door "&amp;." (Sorry.) 
*   ERDDAP™Beheerders, alstublieft:
    * Voeg het volgende toe aan uw[setup.xml](/docs/server-admin/deploy-install#setupxml)bestand (en verander de vlag Sleutelwaarde) :
```
        <!-- ERDDAP™ has a service that lets remote users set a flag
        to notify ERDDAP™ to try to reload a dataset.
        These requests use a key which is generated based
        on baseUrl/warName, a datasetID, and flagKeyKey.
        \\*\\*\\* Change this once, to any text (a favorite quote? random text? 
        It doesn't matter). Normally, you won't ever change this again.
        But if you think someone is abusing the flag system,
        change this text again, restart ERDDAP™, and send
        all of the users of the flag system the relevant new flagKeys
        (see the list in the Daily Report). -->
        <flagKeyKey>A stitch in time saves nine. CHANGE THIS!!!</flagKeyKey>
        
        <!-- ERDDAP™ has an email/URL subscription system which sends a user
        an email or pings a url whenever a dataset of interest changes.
        (This is different from the RSS system, which is always active.)
        The system relies on the server being able to send out 
        emails to people to validate their subscription requests.
        The emails appear to come from the emailFromAddress below.
        So if your server can't send out emails, don't make this system active.
        You may choose (for whatever reason) to make this system active or not, 
        so valid values below are "true" (the default) and "false".
        Note that if you change this and restart ERDDAP™, the list of 
        subscriptions (in \\[bigParentDirectory\\]/subscriptionsV1.txt) isn't
        affected. See also the subscriptionEmailBlacklist in datasets.xml.
        -->
        <subscriptionSystemActive>true</subscriptionSystemActive>  
```

    * Op de lijn na&lt;e-mailGebruikersnaam&gt; in uw[setup.xml](/docs/server-admin/deploy-install#setupxml)bestand, toevoegen
```
        <emailPassword>_myPassword_</emailPassword> <!-- optional; if absent, emails can't be sent to non-local addresses -->  
```
en voer uw echte wachtwoord in.
    * Je kunt veranderen.&lt;wmsSampleBBox&gt; in uw[setup.xml](/docs/server-admin/deploy-install#setupxml)bestand met lengtegraadwaarden tot 360, bijvoorbeeld,
```
        <!-- The bounding box values are 
           minLongitude,minLatitude,maxLongitude,maxLatitude.
           Longitude values within -180 to 180, or 0 to 360, are now okay. -->
        <wmsSampleBBox>0,-75,360,75</wmsSampleBBox>  
```

    * In uwdatasets.xmlbestand, hernoem de dataset type EDDTableFromNc4DFiles naar EDDTableFromNcFiles (die nu bestanden met een aantal dimensies ondersteunt) . Als u een EDDTableFromNc4DFiles dataset had:
        
        1. U MOET veranderen in "EDDTableFromNcFiles" in uw datasets. XML-bestand.
        2. U MOET een&lt;nDimensions&gt; 4&lt;/nDimensions&gt; tag naar XML van de dataset.
        3. U mag de nieuwe&lt;SorteerFilesBySourceNames&gt; tag om de interne volgorde voor de bestanden te specificeren, die de algemene volgorde van de geretourneerde gegevens bepaalt.
        
Voor nadere bijzonderheden, zie[EDDTableFromFiles](/docs/server-admin/datasets#eddtablefromfiles).
    * In het verleden, voor EDDTableFromDapSequence, voorOPeNDAPDRDS-servers, indatasets.xml, we gebruikten&lt;bronCanConstrainStringsRegex&gt;~=&lt;/sourceCanConstrainStringRegex&gt;. Maar we zien nu dat de DRDS regex ondersteuning beperkter is danERDDAP's, dus we raden&lt;bronCanConstrainStringsRegex&gt;&lt;/sourceCanConstrainStringRegex&gt; zodat regex beperkingen niet worden doorgegeven aan de bron, maar in plaats daarvan worden behandeld doorERDDAP.
    * Vernieuwde behandeling van bronCanConstrain... indatasets.xmldoor[EDDtabelVanDapSequence](/docs/server-admin/datasets#eddtablefromdapsequence)en (intern) alle EDDTable datasets. Het nieuwe systeem is eenvoudiger en weerspiegelt beter de variabiliteit van de verschillende gegevensbronnen. Mogelijk moet u de XML aanpassen voor uw datasets indatasets.xml.
* Er zijn verschillende nieuwe kenmerken die op zichzelf nuttig zijn, maar wanneer ze worden gecombineerd, ook het creëren van[rasters/clusters/feeraties vanERDDAPs](/docs/server-admin/additional-information#grids-clusters-and-federations).
    * Nieuwe datasets:
        *   [EDDGridVanErdap](/docs/server-admin/datasets#eddfromerddap)en[EDDtabelVanErdap](/docs/server-admin/datasets#eddfromerddap)die laat eenERDDAP™bevat een dataset van een andereERDDAP™op een zeer eenvoudige en zeer efficiënte manier.
        *   [EDDGridFromFiles](/docs/server-admin/datasets#eddgridfromfiles)  (en zijn onderklasse,[EDDGridVanNcFiles](/docs/server-admin/datasets#eddgridfromncfiles)die kan lezenNetCDF .nc, GRIB .grb, enHDF .hdfbestanden) .
        *   [EDDtabelVanNcFiles](/docs/server-admin/datasets#eddtablefromncfiles)die kan lezenNetCDF .ncdie een tafelachtige structuur hebben.
    * RunLoadDatasets en LoadDatasets werden vernieuwd zodatERDDAP™is zeer reagerend op het herladen van datasets op basis van bestanden in de[vlag](/docs/server-admin/additional-information#flag)map (vaak&lt;5 seconden als de hoofdbelastingDatasets is momenteel gedaan).
    * Nieuwe dienst om toe te staan[een URL om een vlagbestand aan te maken](/docs/server-admin/additional-information#set-dataset-flag)voor een bepaalde dataset, bijvoorbeeld,
    ```
        https://coastwatch.pfeg.noaa.gov/erddap/setDatasetFlag.txt?datasetID=rPmelTao&flagKey=123456789  
    ```
maakt een vlagbestand aan in de vlagmap voor rPmelTao (Hoewel de vlag De sleutel hier is verkeerd.) .
    * Nieuw[abonnement](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions)service zodat elke client een actie kan specificeren die zal worden uitgevoerd wanneer een specifieke dataset wordt aangemaakt (wanneerERDDAP™wordt herstart) en wanneer de dataset op enigerlei wijze verandert. Dit systeem kan worden uitgeschakeld via&lt;abonnementSystemActive&gt; in uw[setup.xml](/docs/server-admin/deploy-install#setupxml)bestand. DeERDDAP™ [Dagelijks verslag](/docs/server-admin/additional-information#daily-report)nu bevat alle abonnementen en bevat de URL die nodig is om ze te annuleren, voor het geval u het systeem wordt misbruikt. Indatasets.xml, is er een nieuwe, facultatieve [&lt;abonnement E-mailBlacklist&gt;] (/docs/server-admin/datasets#subscriptionemailblacklist) tag zodat beheerders een door komma's gescheiden lijst van e-mailadressen kunnen opgeven die onmiddellijk op de zwarte lijst staan van het abonnementssysteem.
    * Nieuw [&lt;onChange&gt;] (/docs/server-admin/datasets#onchange) attribuut indatasets.xmllaat deERDDAP™beheerder een actie specificeren die zal worden uitgevoerd wanneer een specifieke dataset wordt aangemaakt (wanneerERDDAP™wordt herstart) en wanneer de dataset op enigerlei wijze verandert.
    * Verbeteringen aan full text search: het opslaan van de zoekreeks voor elke dataset gebruikt nu 1/2 het geheugen. Het zoekalgoritme (Boyer-Moore-achtig) is nu 3X sneller.
    * E-mails vanERDDAP™nu altijd voorbereiden van het onderwerp en inhoud met\\[erddap Url\\], zodat het duidelijk zal zijn welkeERDDAP™Dit kwam van (als u meerdereERDDAPs) .
    * Meer uitgebreide statistieken verzamelen voor de[Dagelijks verslag](/docs/server-admin/additional-information#daily-report)e-mail.
    * Nieuw logbestand\\[bigParentDirectory\\]/emailLogYEAR-MM-DD.txt logt alle e-mails verzonden doorERDDAP™Elke dag. Dit is vooral handig als je server geen e-mails kan versturen -- je kunt ze tenminste lezen in het logboek.
    *   ERDDAP™nu maakt een\\[bigParentDirectory\\]/cache/ (datasetID) directory voor elke dataset aangezien er veel bestanden kunnen zijn gecached.
* Nieuw[RSS2,01](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions)voer voor elke dataset (kijk voor de oranjeRSSpictogrammen op lijsten van datasets, Data Access Forms en Make A Graph webpagina's) .
*   EDDGrid .kmlantwoorden nu tegelafbeeldingen gebruiken ("superoverlays" - dynamisch gegenereerde quadtree-afbeeldingen) . De eerste afbeelding laadt veel sneller in GoogleEarth dan voorheen. De resolutie van de kaart neemt toe als je inzoomt, tot de volledige resolutie van de dataset. Aanbevelen: gebruikers moeten vragen.kmlvoor één keer, maar de dataset is volledig lengte, breedtegraad. Helaas werd ondersteuning voor tijdbereik verwijderd (Ik hoop dat het terugkomt.) .
*   ERDDAP™nu toevoegt[Verloopt en Cache-Control max-age headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)naar alle gewenste bestanden uit de map /images. Dit vermindert sterk het aantal statische bestand verzoeken verzonden naarERDDAPen dus sterk versnelt de meesteERDDAP™Paginaladingen. Ook, veelJavaScript bestand verwijzingen verplaatst naar de onderkant van hun HTML-pagina's, die ook versnelt veelERDDAP™Paginaladingen. Dankzij het boek "High Performance Web Sites" door Steve Souders en de ySlow toevoeging aan de FireBug plugin in FireFox.
*   ERDDAP™overgeschakeld van netcdf-java 2.2.22 naar netcdf-java 4.0. Dit maakt onder andereEDDGridVanNcFiles om te lezenHDF .hdf, evenals GRIB .grb enNetCDF .ncdossiers.
*   EDDGridVanDap enEDDGridFromNcFiles ondersteunt nu ook DArray (evenals DGrid)  dataVariables. Als een dimensie geen corresponderende coördinatenvariabele heeft,ERDDAP™maakt een asvariabele aan met de indexwaarden (bv. 0, 1, 2, ..., 311, 312) . Dus alle andere aspecten vanEDDGridblijven hetzelfde:
\\* Het dient nog steeds alle datasets als Rasters, met een asvariabele voor elke dimensie.
\\* Vragen kunnen nog steeds waarden van de asvariabelen opvragen.
Dankzij Charles Carleton, Thomas Im, Dorian Raymer en anderen.
* DeWMS OpenLayerspagina's hebben nu een standaard lengtegraad,breedtebereik dat iets groter is dan het bereik van de dataset (niet het exacte bereik, dus de context van kleine datasets is duidelijker) . Het standaardbereik kan nu ook 0 tot 360 zijn, waardoor het volledige bereik van vele datasets nu getoond kan worden. DankzijToddSpindler.
* Nieuwe sliders op sommige Data Access Formulieren en Maak een Graph webpagina's. Zij vereenvoudigen (ruw) specificatie van de gewenste gegevens en bieden goede visuele feedback.
* Een nieuwe optie voor de&lt;dataset&gt; tags indatasets.xml:[actief="valse"](/docs/server-admin/datasets#active).
* Verwijzingen naarERD'sERDDAP™veranderd van coastwatch.pfel (werkt nog steeds via proxy) naar coastwatch.pfeg (voorkeur) .
* Nieuwe steun voor[data\\_minendata\\_max](/docs/server-admin/datasets#data_min-and-data_max)variabele metadata attributen.
* Een gedeeltelijke oplossing voor de[Wacht dan opnieuw proberen / gedeeltelijke resultaten uitzondering](/docs/server-admin/additional-information#waitthentryagain-exception): Nu, sommige verzoeken die eerder mislukt wanneer een gegevensbron verandering werd gedetecteerd zal slagen omdatERDDAP™zal de dataset opnieuw laden en de gegevens automatisch opnieuw aanvragen, alles in het kader van het oorspronkelijke verzoek.
* Bugfix: genereren Datasets Xml was uitgeschakeld inERDDAP™versie 1.12. Met dank aan Ellyn Montgomery voor het erop wijzen.
* Kleine wijzigingen in foutafhandeling.
* Veel verbeteringen om mogelijke raceomstandigheden te vermijden/dealen (Dat wil zeggen, mogelijke problemen die voortvloeien uit de multithreaded aard vanERDDAP) Wat kleine, frequente problemen veroorzaakte.
* Nu, als er een foutmelding op een afbeelding wordt geschreven, zal de afbeelding alleen in de cache blijven voor ~5-10 minuten (niet 60) . Dankzij Cara Wilson.
* Het standaard bericht wanneer er geen gegevens zijn is nu "Uw vraag geproduceerd geen overeenkomende resultaten.", dat is korter, nauwkeuriger, en overeenkomtOPeNDAPservers.
*   EDDGridkoppelaswaarden zijn niet langer toegestaan.
* Kleine wijzigingen in .ver en .help verzoeken.
* Veel kleine wijzigingen en fouten herstellen.
     

## Versie 1.12{#version-112} 
 (uitgebracht 2008-10-31) 

* EDDTabelVanSOSwerkt opnieuw met NDBCSOSen werkt met de nieuwe NOSSOS.
* EDDTableFromBMDE vereist nuERDDAP™admin om op te gevendataVariables.
*   EDDGridvereist niet langer dat lat en lon gelijkmatig verdeeld worden voor . transparant Png of.kml. DankzijToddSpindler.
* Een paar kleine veranderingen.
     

## Versie 1.10{#version-110} 
 (uitgebracht 2008-10-14) 

* Nieuwe "colorbar"-metadata voor gegevensvariabelen indatasets.xmldefinieert de standaard kleurbalkinstellingen voor grafieken en kaarten. Zie[meer informatie](/docs/server-admin/datasets#color-bar-attributes). Dit is belangrijk omdat het sterk verbetert het uiterlijk van de standaard grafieken en kaarten geproduceerd door Make A Graph en omdat de standaard grafieken en kaarten hebben nu een consistente kleurbalk, zelfs wanneer de client verandert van de gevraagde tijd of geografische bereik. Ook was dit noodzakelijk voorWMS.
*   ERDDAP™nu dient de meeste netgegevens via eenWMSservice. Dit is belangrijk omdat het laat zien dat naast het verkrijgen van gegevens van vele soorten dataservers,ERDDAP™kan gegevens verspreiden via verschillende protocollen (DAP,WMS... meer in de toekomst) . Zie[documentatie van klanten](https://coastwatch.pfeg.noaa.gov/erddap/wms/documentation.html). Of de[documentatie voor beheerders](/docs/server-admin/datasets#wms). Of[Probeer het eens.](https://coastwatch.pfeg.noaa.gov/erddap/wms/index.html).
* Nieuwe steun voor lengtegraadwaarden &gt;180 in.kmldossiers.
* Nieuwe cdm\\_data\\_type: Overig .
*   ERDDAP™nu ondersteunt "boolean" brongegevensType. Zie[meer informatie](/docs/server-admin/datasets#boolean-data)Dit zal nuttig worden voor de toekomstige EDDTableFromDatabase.
* Nieuwe EDDTableFromBMDE ondersteunt DIGIR/BMDE gegevensbronnen.
* EDVGridAxis staat nu aflopende gesorteerde waarden toe. De pmelOscar datasets hadden dit nodig.
*   ERDDAP™geeft nu HTTP-fouten terug (b.v. "404 for resource/page not found") in meer situaties, in plaats van HTML pagina's met foutmeldingen.
* Veel wijzigingen/toevoegingen aan deERDDAP™documentatie.
* Veel kleine veranderingen.
* Wat insectenreparaties.
*    **DingenERDDAP™beheerders moeten doen om te upgraden naar deze versie:** 
    * Indatasets.xml, voor elke EDDtabelvanSOSdatasets, verander "observedProperty" metadata in "sourceObservedProperty."
    * De regels voor eenaxisVariableofdataVariable'sdestinationNamenu[strenger](/docs/server-admin/datasets#datavariable-addattributes). U moet controleren of uw variabele namen geldig zijn. Controleer ze met de hand of rennen.ERDDAP™en kijk naar de foutmeldingen in het rapport dat wordt gemaild naar de beheerder.
    * Indatasets.xml, als u wilt dat een rastergegevens variabele toegankelijk is viaWMS, moet je kleurBar metadata toevoegen. Tenminste, bijvoorbeeld,&lt;att name="colorBarMinimum"type="dubbel"&gt;0&lt;/att&gt;
```
          <att name="colorBarMaximum" type="double">32</att>  
```
Zie[meer informatie](/docs/server-admin/datasets#wms).
    * Voeg het volgende toe aan uw[setup.xml](/docs/server-admin/deploy-install#setupxml)bestand (maar pas het aan met uw informatie) :

```
        <!-- drawLand specifies the default Make A Graph setting for 
        whether the landmask should be drawn "over" (the default) or "under" 
        surface data on maps. "over" is recommended for primarily 
        oceanographic data (so that grid data over land is obscured by the 
        landmask). "under" is recommended for all other data.
        -->
        <drawLand>over</drawLand>  
        
        <!-- Information about the ERDDAP™ administrator is used for the 
        SOS and WMS servers. You MUST CHANGE these to describe your 
        installation. 
        -->
        <adminInstitution>NOAA Environmental Research 
        Division</adminInstitution>
        <adminIndividualName>Your Name</adminIndividualName>
        <adminPosition>Webmaster</adminPosition>
        <adminPhone>your-phone-number</adminPhone>
        <adminAddress>99 Pacific St, Suite 255A</adminAddress>
        <adminCity>Monterey</adminCity>
        <adminStateOrProvince>CA</adminStateOrProvince>
        <adminPostalCode>93940</adminPostalCode>
        <adminCountry>USA</adminCountry>
        <adminEmail>yourName@yourSite</adminEmail>
        
        <!-- Information about the ERDDAP™ administrator is used for ERDDAP's
        SOS server. You MUST CHANGE these to describe your installation. 
        -->
        <sosTitle>NOAA Environmental Research Division SOS</sosTitle>
        <sosAbstract>NOAA Environmental Research Division's ERDDAP™ makes 
          data from multiple sources available via the SOS 
          protocol.</sosAbstract>
        <sosKeywords>Weather, Ocean Currents, Temperature, 
          Salinity</sosKeywords>
        <sosAccessConstraints>NONE</sosAccessConstraints>
        <sosFees>NONE</sosFees>
        
        <!-- Information about the ERDDAP™ administrator is used for 
        ERDDAP's WMS server. You MUST CHANGE these to describe your 
        installation. -->
        <wmsTitle>NOAA Environmental Research Division 
        WMS</wmsTitle>
        <wmsAbstract>NOAA Environmental Research Division's ERDDAP™ makes
        data from multiple sources available via the WMS 
        protocol.</wmsAbstract>
        <wmsKeywords>Weather, Ocean Currents, Temperature, 
          Salinity</wmsKeywords> 
        <wmsAccessConstraints>NONE</wmsAccessConstraints>
        <wmsFees>NONE</wmsFees>
        <!-- For the wms examples, pick one of your grid datasets that has 
        longitude and latitude axes. The sample variable must be a variable 
        in the sample grid dataset.  The bounding box values are 
        minx,miny,maxx,maxy.
        -->
        <wmsSampleDatasetID>erdBAssta5day</wmsSampleDatasetID>
        <wmsSampleVariable>sst</wmsSampleVariable>
        <wmsSampleBBox>0,-75,180,75</wmsSampleBBox>
```

## Versie 1.08{#version-108} 
 (uitgebracht 2008-07-13) 

* Een nieuwe webservice inERDDAP™, genereren Datasets Xml, assisteertERDDAP™beheerders door een ruwe versie van de XML aan te maken die nodig is om een dataset te beschrijven indatasets.xml
* Sommige wijzigingen/bugfixes met betrekking tot het mogelijk maken van griddap door netcdf-java te zien als een opendap server, inclusief: globale metadata wordt nu aangeduid als "NC\\_GLOBAL" (in plaats van "GLOBAL") .
* DeEDDGriden EDDTable Data Access Forms nu gebruik maken van query informatie in de URL. Dus, bijvoorbeeld, als een gebruiker gaat van een Make A Graph formulier naar een Data Access Form, worden de beperkingen nu correct overgedragen.
*   tabledap's Make A Graph staat nu beperkingen toe op String-variabelen.
* EDDtable's Make A Graph staat nu NaN beperkingen toe. Dankzij Steve Hankin.
* Bugfix: EDDtabel opslaan AsImage herkende de .colorbar min en max waarden niet goed. Dankzij Steve Hankin.
* Veel verbeteringen aan setupDatasetsXml. Dankzij Ellyn Montgomery.
* Raddap-verzoeken nu toestaan () -stijl vraagt iets buiten het werkelijke asbereik. Dit is passend omdat () -waarden worden afgerond op de dichtstbijzijnde werkelijke waarde. Dankzij Cindy Bessey.
* Ik maakte de FloatArray en DoubleArray test van isEvenlySpaced meer verfijnd. Het zal altijd onvolmaakt zijn. (omdat de test moet worden aangepast voor elke dataset) Maar het zou beter moeten zijn. Dankzij Ellyn Montgomery.
* Ik verhuisde setup.html en setupDatasets Xml.html erddap's /download directory en hard gecodeerd alle links naar hen. Nu kan ik wijzigingen aanbrengen en de installatie-informatie onmiddellijk bijwerken.
* Veel kleine veranderingen. Een paar kleine foutjes.
*    **DingenERDDAP™beheerders moeten doen om te upgraden naar deze versie:** 
    * Verplaatsen&lt;de korte beschrijving Html&gt; van uw berichten.xml naar uw[setup.xml](/docs/server-admin/deploy-install#setupxml)bestand. Het specificeert de tekst die in het midden van de linkerkant van deERDDAP™homepage. Toevoegen&lt;h1&gt;ERDDAP&lt;/h1&gt; (of een andere kop) Bovenaan. **Of,** kopiëren&lt;de korte beschrijvingHtml&gt; in het nieuwe[setup.xml](/docs/server-admin/deploy-install#setupxml)bestand (van de nieuwe erddapContent.zip) in uw setup.xml.
         

## Versie 1.06{#version-106} 
 (uitgebracht 2008-06-20) 

* Nieuwe steun voorIOOS DIF SOSgegevensbronnen.
* Veel kleine veranderingen. Een paar kleine foutjes.
     

## Versie 1.04{#version-104} 
 (uitgebracht 2008-06-10) 

* Nieuwe Slide Sorter functie.
* Nieuwe Google Gadgets pagina en voorbeelden.
* Bugfix inEDDGrid.saveAsNc voor variabele met schaal en addOffset.
     

## Versie 1.02{#version-102} 
 (uitgebracht 2008-05-26) 

* NieuwEDDGridSideBySide zorgt voor verschillendeaxisVariables\\[0\\]bron Waarden.
* Alle stromingen en winddatasets werden samengevoegd inEDDGridSideBySide datasets.
* Afbeeldingen van afbeeldingen worden nu 1 uur gecached.
     

## Versie 1.00{#version-100} 
 (uitgebracht 2008-05-06) 

* Maak A Graph webpagina's en grafische commando's in URL's.
* Ondersteuning voor vlagbestanden om een dataset opnieuw te laden.
* Nieuw datasettype: EDDTableFrom4DFiles (de eerste subklasse van EDDTableFromFiles) .
