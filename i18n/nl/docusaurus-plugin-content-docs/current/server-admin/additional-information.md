---
sidebar_position: 4
---
ERDDAP™- Stel je eigenERDDAP™    

## Dingen die je moet weten.{#things-you-need-to-know} 
     
###    **[Proxy-fouten](#proxy-errors)**  {#proxy-errors} 
Soms, een verzoek omERDDAP™zal een Proxy Fout, een HTTP 502 Bad Gateway Fout, of een soortgelijke fout. Deze fouten worden gegooid door Apache of Tomcat, nietERDDAP™Zelf.
* Als elke aanvraag deze fouten genereert, vooral wanneer u voor het eerst uwERDDAP™, dan is het waarschijnlijk een proxy of slechte gateway fout, en de oplossing is waarschijnlijk te repareren[ERDDAP's proxy instellingen](/docs/server-admin/deploy-install#proxypass). Dit kan ook het probleem zijn wanneer een gevestigdeERDDAP™Plotseling begint met het gooien van deze fouten voor elk verzoek.
* Anders, "proxy" fouten zijn meestal eigenlijk time-out fouten gegooid door Apache of Tomcat. Zelfs als ze relatief snel gebeuren, is het een soort reactie van Apache of Tomcat die optreedt wanneerERDDAP™is zeer druk, geheugen beperkt, of beperkt door een andere bron. In deze gevallen, zie het advies hieronder om te behandelen[ERDDAP™langzaam reageren](#responding-slowly).
        
Verzoeken voor een lange periode (&gt; 30 tijdpunten) van een gerasterde dataset zijn gevoelig voor time-out mislukkingen, die vaak verschijnen als Proxy fouten, omdat het vergt aanzienlijke tijd voorERDDAP™om alle gegevensbestanden één voor één te openen. AlsERDDAP™is anders druk tijdens het verzoek, het probleem is meer kans op optreden. Als de bestanden van de dataset gecomprimeerd zijn, is de kans groter dat het probleem zich voordoet, hoewel het moeilijk is voor een gebruiker om te bepalen of de bestanden van een dataset gecomprimeerd zijn.
De oplossing is om meerdere verzoeken te doen, elk met een kleiner tijdsbestek. Hoe klein is de tijd? Ik stel voor om heel klein te beginnen. (30 tijdpunten?) , dan (ongeveer) Verdubbel het tijdbereik totdat het verzoek mislukt, ga dan terug een verdubbeling. Doe dan alle verzoeken (elk voor een ander stuk tijd) nodig om alle gegevens te krijgen.
EenERDDAP™Dit probleem kan door de[Apache timeout-instellingen](/docs/server-admin/deploy-install#apache-timeout).
        
### Toezicht{#monitoring} 
We willen allemaal dat onze datadiensten hun publiek vinden en uitgebreid worden gebruikt, maar soms uwERDDAP™kan worden gebruikt te veel, waardoor problemen, waaronder super trage reacties voor alle verzoeken. Ons plan om problemen te voorkomen is:

* MonitorERDDAP™via de[status.html web pagina](#status-page).
Het heeft veel nuttige informatie. Als je ziet dat een groot aantal verzoeken binnenkomen, of tonnen geheugen wordt gebruikt, of tonnen mislukte verzoeken, of elke Major LoadDatasets duurt een lange tijd, of zien elk teken van dingen worden geblokkeerd en langzaam reageren, kijk dan inERDDAP's[log.txt-bestand](#log)Om te zien wat er aan de hand is.
    
Het is ook handig om gewoon op te merken hoe snel de status pagina reageert. Als het langzaam reageert, is dat een belangrijke indicator datERDDAP™is erg druk.
    
* MonitorERDDAP™via de[Dagelijks verslag](#daily-report)e-mail.
     
* Let op verouderde datasets via de *baseUrl* /erddap/outOfDateDatasets.htmlweb pagina die is gebaseerd op de optionele[testOutOfDate](/docs/server-admin/datasets#testoutofdate)globaal kenmerk.
     
#### Externe monitoren{#external-monitors} 
De hierboven genoemde methoden zijn:ERDDAP's manieren om zichzelf te monitoren. Het is ook mogelijk om externe systemen te maken of te gebruiken om uwERDDAP. Een project om dit te doen is[Axiom's erddap-metrics project](https://github.com/axiom-data-science/erddap-metrics). Dergelijke externe systemen hebben enkele voordelen:
* Ze kunnen worden aangepast om de informatie die u wilt, weergegeven op de manier die u wilt.
* Zij kunnen informatie bevatten overERDDAP™datERDDAP™kan niet gemakkelijk of helemaal (bijvoorbeeld, CPU gebruik, schijf vrije ruimte,ERDDAP™reactietijd vanuit het perspectief van de gebruiker,ERDDAP™uptime,
* Zij kunnen waarschuwingen verstrekken (e-mails, telefoontjes, sms'jes) aan beheerders wanneer problemen een drempel overschrijden.
             
### Meerdere gelijktijdige Verzoeken{#multiple-simultaneous-requests} 
*    **Blacklist gebruikers maken meerdere gelijktijdige verzoeken&#33;** 
Als het duidelijk is dat sommige gebruikers meerdere gelijktijdige verzoeken doen, herhaaldelijk en continu, voeg dan hun IP-adres toe aanERDDAP's [&lt;verzoekBlacklist&gt;] (/docs/server-admin/datasets#verzoekblacklist) in uwdatasets.xmlbestand. Soms zijn de verzoeken allemaal van één IP-adres. Soms zijn ze van meerdere IP-adressen, maar duidelijk dezelfde gebruiker. U kunt ook mensen zwartlijsten die tonnen ongeldige verzoeken of tonnen van geestverdovend inefficiënte verzoeken.
    
Dan, voor elk verzoek dat zij doen,ERDDAP™geeft:
    
    > HTTP ERROR 403 - Access Forbidden --  
    > Your IP address is on this ERDDAP's request blacklist.  
    > Did you often submit more than one request at a time?  
    > Did you often submit identical requests in a short period of time?  
    > Did you submit a large number of invalid requests?  
    > If you are ready to avoid these problems, please email \\[ERDDAP™ administrator's email address\\] to request to be taken off of the blacklist.
    
Hopelijk zal de gebruiker dit bericht zien en contact met u opnemen om uit te vinden hoe het probleem op te lossen en uit de zwarte lijst te komen. Soms wisselen ze van IP-adres en proberen het opnieuw.
    
Het is als het machtsevenwicht tussen offensieve en defensieve wapens in oorlog. Hier, de verdedigingswapens. (ERDDAP) hebben een vaste capaciteit, beperkt door het aantal kernen in de CPU, de schijftoegangsbandbreedte en de netwerkbandbreedte. Maar de offensieve wapens (gebruikers, met name scripts) beschikken over onbeperkte capaciteit:
    
    * Een enkele aanvraag voor gegevens van veel tijdpunten kan veroorzakenERDDAPom een groot aantal bestanden te openen (in volgorde of gedeeltelijk meerdraads) . In extreme gevallen kan een "eenvoudig" verzoek gemakkelijk de RAID die is gekoppeld aanERDDAP™voor een minuut, effectief blokkeren van de behandeling van andere verzoeken.
         
    * Een enkel verzoek kan een grote brok geheugen verbruiken (ook alERDDAP™is gecodeerd om het geheugen dat nodig is om grote verzoeken te behandelen te minimaliseren) .
         
    * Parallellering -
Het is gemakkelijk voor een slimme gebruiker om een grote taak parallel door het genereren van veel threads, die elk een afzonderlijk verzoek (die groot of klein kunnen zijn) . Dit gedrag wordt aangemoedigd door de computer wetenschap gemeenschap als een efficiënte manier om te gaan met een groot probleem (en parallelleren is efficiënt in andere omstandigheden) . Terug naar de oorlog analogie: gebruikers kunnen een in wezen onbeperkt aantal gelijktijdige verzoeken met de kosten van elk zijn in wezen nul, maar de kosten van elk verzoek komen inERDDAP™groot enERDDAPHet reactievermogen is eindig. Het is duidelijk,ERDDAP™zal deze strijd verliezen, tenzij deERDDAP™beheerder blacklists gebruikers die meerdere gelijktijdige verzoeken die zijn oneerlijk verdrongen andere gebruikers.
         
    * Meerdere scripts -
Denk nu eens na over wat er gebeurt als er verschillende slimme gebruikers zijn die elk parallelle scripts uitvoeren. Als een gebruiker zoveel verzoeken kan genereren dat andere gebruikers verdrongen zijn, dan kunnen meerdere dergelijke gebruikers zoveel verzoeken genereren datERDDAP™wordt overweldigd en lijkt niet te reageren. Het is in feite een[DDOS aanval](https://en.wikipedia.org/wiki/Denial-of-service_attack)Nogmaals, de enige verdediging voorERDDAP™is om gebruikers zwarte lijst met meerdere gelijktijdige verzoeken die zijn oneerlijk verdringing van andere gebruikers.
         
    * Opgeblazen verwachtingen -
In deze wereld van massale tech bedrijven (Amazon, Google, Facebook, ...) , gebruikers zijn begonnen te verwachten in wezen onbeperkte mogelijkheden van de aanbieders. Aangezien deze bedrijven zijn geld maken operaties, hoe meer gebruikers ze hebben, hoe meer inkomsten ze hebben om hun IT-infrastructuur uit te breiden. Zo kunnen ze zich een enorme IT-infrastructuur veroorloven om verzoeken te behandelen. En ze beperken het aantal verzoeken en kosten van elk verzoek van gebruikers slim door de soorten verzoeken die gebruikers kunnen doen te beperken, zodat geen enkel verzoek is belastend, en er is nooit een reden (of een manier) voor gebruikers om meerdere gelijktijdige verzoeken te doen. Dus deze enorme tech bedrijven kunnen veel meer gebruikers danERDDAP™, maar ze hebben enorm meer middelen en slimme manieren om de verzoeken van elke gebruiker te beperken. Het is een beheersbare situatie voor de grote IT-bedrijven (En ze worden rijk&#33;) maar niet voorERDDAP™installaties. Nogmaals, de enige verdediging voorERDDAP™is om gebruikers zwarte lijst met meerdere gelijktijdige verzoeken die zijn oneerlijk verdringing van andere gebruikers.
         
    
Dus gebruikers: Maak niet meerdere gelijktijdige verzoeken of je wordt op de zwarte lijst&#33;
     

Het is duidelijk dat het het beste is als uw server veel cores heeft, veel geheugen (zodat u veel geheugen kunt toewijzen aanERDDAP™, meer dan ooit nodig) , en een hoge bandbreedte internetverbinding. Dan is geheugen zelden of nooit een beperkende factor, maar netwerkbandbreedte wordt de meer voorkomende beperkende factor. In principe, aangezien er steeds meer gelijktijdige verzoeken, de snelheid naar een bepaalde gebruiker afneemt. Dat vertraagt natuurlijk het aantal aanvragen dat binnenkomt als elke gebruiker slechts één verzoek tegelijk indient.
    
### ERDDAP™Gegevens van THREDDS ophalen{#erddap-getting-data-from-thredds} 
Als uERDDAP™krijgt sommige van de gegevens van een THredDS op uw site, zijn er enkele voordelen aan het maken van een kopie van de THredDS-gegevensbestanden (ten minste voor de meest populaire datasets) op een andere RAID datERDDAP™heeft toegang totERDDAP™kan gegevens van de bestanden direct dienen. OpERD, doen we dat voor onze meest populaire datasets.

*   ERDDAP™kan de gegevens direct krijgen en hoeft niet te wachten tot THREDDS om de dataset te herladen of ...
*   ERDDAP™kan merken en opnemen van nieuwe gegevensbestanden onmiddellijk, zodat het hoeft niet te pester THREDDS vaak om te zien of de dataset is veranderd. Zie [&lt;updateEveryNMillis&gt;] (/docs/server-admin/datasets#updateeveryonmillis) .
* De belasting is verdeeld tussen 2 RAIDS en 2 servers, in plaats van het verzoek is hard op beideERDDAP™En Thredds.
* U vermijdt het mismatch probleem veroorzaakt door THREDDS met een kleine (standaard) maximale verzoekgrootte.ERDDAP™heeft een systeem om de wanverhouding aan te pakken, maar het vermijden van het probleem is beter.
* U heeft een back-up van de gegevens die altijd een goed idee is.

Hoe dan ook, doe nooit Thredds enERDDAP™in dezelfde Tomcat. Voer ze uit in aparte Tomcats, of beter, op aparte servers.

We vinden dat THredDS regelmatig in een staat komt waar verzoeken gewoon hangen. Als uERDDAP™is het verkrijgen van gegevens van een THredDS en de THredDS is in deze staat,ERDDAP™heeft een verdediging (Er staat dat de op THREDDS gebaseerde dataset niet beschikbaar is) , maar het is nog steeds lastig voorERDDAP™omdatERDDAP™moet wachten tot de timeout elke keer dat het probeert om een dataset te herladen van een opgehangen THredDS. Sommige groepen (inclusiefERD) Vermijd dit door het proactief opnieuw opstarten van THredDS vaak (bijv. 's nachts in een cron job) .

### Langzaam reageren{#responding-slowly} 
*    **AlsERDDAP™Antwoordt langzaam** of als bepaalde verzoeken langzaam reageren,
U kunt erachter komen of de traagheid redelijk en tijdelijk is. (bijvoorbeeld vanwege veel verzoeken van scripts ofWMSgebruikers) , of als er iets onverklaarbaar verkeerd is en je moet[stop en start Tomcat opnieuw enERDDAP™](#shut-down-and-restart).
    
AlsERDDAP™reageert langzaam, zie het advies hieronder om de oorzaak te bepalen, die hopelijk zal u in staat stellen om het probleem op te lossen.
U kunt een specifiek startpunt hebben (bv. een specifieke verzoek-URL) of een vaag startpunt (bv.ERDDAP™is traag) .
U kent wellicht de betrokken gebruiker. (Omdat ze je e-mailden.) , of niet.
Je hebt misschien andere aanwijzingen, of niet.
Aangezien al deze situaties en alle mogelijke oorzaken van de problemen samen vervagen, probeert het onderstaande advies alle mogelijke uitgangspunten en alle mogelijke problemen in verband met trage reacties aan te pakken.
    
    *    **Zoek naar aanwijzingen in[ERDDAPlogbestand](#log)**   ( *bigParentDirectory* /logs/log.txt) .
        \\[In zeldzame gevallen zijn er aanwijzingen in[Tomcat's logbestand](#tomcat-logs)  ( *kat* /logs/catalina.out) .\\]  
Zoek naar foutmeldingen.
Kijk voor een groot aantal verzoeken afkomstig van een (of een paar) gebruikers en misschien het opbergen van veel van de bronnen van uw server (geheugen, CPU tijd, schijf toegang, internet bandbreedte) .
        
Als het probleem verbonden is met **één gebruiker** , kunt u vaak een aanwijzing over wie de gebruiker is via web services zoals[ https://whatismyipaddress.com/ip-lookup ](https://whatismyipaddress.com/ip-lookup)dat u informatie kan geven over het IP-adres van de gebruiker (waarin u kunt vinden inERDDAP's[log.txt](#log)bestand) .
        
        * Als de gebruiker een **bot** zich slecht gedragen (met name, een zoekmachine proberen in te vullen deERDDAP™formulieren met elke mogelijke permutatie van ingangswaarden) , zorg ervoor dat u uw server goed hebt ingesteld[robots.txt](#robotstxt)bestand.
        * Als de gebruiker een **script (s) ** dat is het maken van meerdere gelijktijdige verzoeken, contact opnemen met de gebruiker, uitleggen dat uwERDDAP™beschikt over beperkte middelen (b.v., geheugen, CPU-tijd, schijftoegang, internetbandbreedte) , en vraag hen om rekening te houden met andere gebruikers en doe slechts één verzoek tegelijk. Je zou ook kunnen zeggen dat je ze op de zwarte lijst zal zetten als ze zich niet terugtrekken.
        * Als de gebruiker een **script** het maken van een groot aantal tijdrovende verzoeken, vraag de gebruiker om rekening te houden met andere gebruikers door een kleine pauze (Twee seconden?) in het script tussen verzoeken.
        *    **WMSclientsoftware** kan zeer veeleisend zijn. Een klant vraagt vaak om 6 aangepaste afbeeldingen tegelijk. Als de gebruiker eenWMSclient die legitieme verzoeken doet, kunt u:
            * Negeer het. (aanbevolen, want ze zullen snel verder gaan) 
            * Zet uw server uitWMSservice viaERDDAP's setup.html bestand. (niet aanbevolen) 
        * Als de verzoeken lijken **stom, krankzinnig, buitensporig, of kwaadaardig,** of als u het probleem niet op een andere manier kunt oplossen, overwegen tijdelijk of permanent het IP-adres van de gebruiker toe te voegen aan de [&lt;aanvraagBlacklist&gt; in uwdatasets.xmlbestand] (/docs/server-admin/datasets#verzoekblacklist) .
             
    *    **Probeer het probleem zelf te dupliceren, vanaf je computer.**   
Uitzoeken of het probleem is met één dataset of alle datasets, voor één gebruiker of alle gebruikers, voor slechts bepaalde soorten verzoeken, enz..
Als je het probleem kunt dupliceren, probeer het probleem te beperken.
Als u het probleem niet kunt dupliceren, dan kan het probleem worden gekoppeld aan de computer van de gebruiker, de internetverbinding van de gebruiker, of de internetverbinding van uw instelling.
         
    * Als **één dataset** reageert langzaam (Misschien alleen voor **één type verzoek** van één gebruiker) Het probleem kan zijn:
        *   ERDDAP's toegang tot de brongegevens van de dataset (met name uit relationele databases, Cassandra en datasets op afstand) tijdelijk of permanent traag kan zijn. Controleer de snelheid van de bron onafhankelijk vanERDDAP. Als het langzaam gaat, kun je het misschien verbeteren.
        * Heeft het probleem te maken met het specifieke verzoek of het algemene soort verzoek?
Hoe groter de gevraagde subset van een dataset, hoe waarschijnlijker het verzoek mislukt. Als de gebruiker is het maken van enorme verzoeken, vraag de gebruiker om kleinere verzoeken die meer kans op een snelle en succesvolle reactie.
            
Bijna alle datasets zijn beter in de behandeling van sommige soorten verzoeken dan andere soorten verzoeken. Bijvoorbeeld, wanneer een dataset verschillende tijdblokken in verschillende bestanden opslaat, kunnen verzoeken om gegevens uit een groot aantal tijdpunten erg traag zijn. Als de huidige verzoeken zijn van een moeilijk type, overwegen het aanbieden van een variant van de dataset die is geoptimaliseerd voor deze verzoeken. Of gewoon uitleggen aan de gebruiker dat dat soort verzoek is moeilijk en tijdrovend, en vragen om hun geduld.
            
        * De dataset is mogelijk niet optimaal geconfigureerd. U kunt mogelijk wijzigingen aanbrengen in de datasetdatasets.xmlbrok om te helpenERDDAP™Behandel de dataset beter. Bijvoorbeeld,
            
            *   EDDGridFromNcFiles datasets die toegang krijgen tot gegevens van gecomprimeerde nc4/hdf5 bestanden zijn traag bij het verkrijgen van gegevens voor het gehele geografische bereik (bv. voor een wereldkaart) omdat het hele bestand gedecomprimeerd moet worden. U kunt de bestanden converteren naar ongecomprimeerde bestanden, maar dan zal de schijfruimte vereiste veel, veel groter zijn. Het is waarschijnlijk beter te accepteren dat dergelijke datasets in bepaalde omstandigheden traag zullen zijn.
            * De configuratie van de [&lt;subsetVariables&gt;] (/docs/server-admin/datasets#subsetvariabelen) tag heeft een enorme invloed op hoeERDDAP™verwerkt EDDTable datasets.
            * U kunt de[snelheid van een EDDTableFromDatabase](/docs/server-admin/datasets#database-speed)dataset.
            * Veel EDDTable datasets kunnen worden versneld door[een kopie van de gegevens opslaan inNetCDFOnvoorziene Ragged Array-bestanden](/docs/server-admin/datasets#eddtablefromfiles), dieERDDAP™kan heel snel lezen.
            
Als u hulp wilt bij het versnellen van een specifieke dataset, neem dan een beschrijving van het probleem en de dataset brok vandatasets.xmlen zie onze[sectie over het krijgen van extra ondersteuning](/docs/intro#support).
             
    * Als **alles** inERDDAP™is **altijd** langzaam, het probleem kan zijn:
        * De computer die draaitERDDAP™kan niet genoeg geheugen of verwerkingskracht hebben. Het is goed om te rennenERDDAP™op een moderne, multi-core server. Voor zwaar gebruik moet de server een 64-bit besturingssysteem en 8 GB of meer geheugen hebben.
        * De computer die draaitERDDAP™kan ook andere toepassingen draaien die veel systeembronnen verbruiken. Zo ja, kunt u een dedicated server voorERDDAP? Bijvoorbeeld (Dit is geen goedkeuring.) , kunt u een quad-core Mac Mini Server met 8 GB geheugen voor ~ $1100.
             
    * Als **alles** inERDDAP™is **tijdelijk** langzaam, bekijk uwERDDAP's[ **/erddap/status.htmlblz.** ](#status-page)in je browser.
        * Heeft deERDDAP™Kan statuspagina niet geladen worden?
Zo ja,[herstartERDDAP™](#shut-down-and-restart).
        * Heeft deERDDAP™status pagina laden langzaam (bv. &gt; 5 seconden) ?
Dat is een teken dat alles inERDDAP™loopt langzaam, maar het is niet per se problemen.ERDDAP™Misschien is het gewoon erg druk.
        * Voor "Respensatie mislukt tijd (sinds de laatste grote LoadDatasets) ", is n= een groot aantal?
Dat betekent dat er de laatste tijd veel mislukte verzoeken zijn gedaan. Dat kan problemen zijn of het begin van problemen. De mediane tijd voor de storingen is vaak groot (bv. 210000 ms) ,
Wat betekent dat er (Zijn?) Veel actieve draden.
die veel middelen bijeenbrachten (Zoals geheugen, open bestanden, open sockets, ...) ,
Wat niet goed is.
        * Voor "Respons Succeed Time (sinds de laatste grote LoadDatasets) ", is n= een groot aantal?
Dat geeft aan dat er de laatste tijd veel succesvolle verzoeken zijn gedaan. Dit is geen probleem. Het betekent gewoon dat jeERDDAP™wordt zwaar gebruikt.
        * Is het "Aantal niet-Tomcat-wachtdraden" een typische waarde?
Dit is vaak ernstige problemen die veroorzakenERDDAP™om te vertragen en uiteindelijk te bevriezen. Als dit uren aanhoudt, kunt u proactief[herstartERDDAP™](#shut-down-and-restart).
        * Onderaan de "Geheugen Gebruik Samenvatting" lijst, is de laatste "Geheugen: momenteel gebruik" waarde zeer hoog?
Dat kan gewoon wijzen op hoog gebruik, of het kan een teken van problemen zijn.
        * Kijk naar de lijst van threads en hun status. Doen een ongewoon aantal van hen iets ongewoons?
             
    * Is **de internetverbinding van uw instelling** Op dit moment langzaam?
Doorzoek het internet voor "internet snelheidstest" en gebruik een van de gratis online tests, zoals[ https://www.speakeasy.net/speedtest/ ](https://www.speakeasy.net/speedtest/). Als uw instelling internetverbinding is traag, dan verbindingen tussenERDDAP™en externe gegevensbronnen zullen traag zijn, en verbindingen tussenERDDAP™en de gebruiker zal traag zijn. Soms kun je dit oplossen door onnodig internetgebruik te stoppen (b.v. mensen die streamingvideo's bekijken of videoconferentiegesprekken) .
         
    * Is **de internetverbinding van de gebruiker** Op dit moment langzaam?
Laat de gebruiker het internet zoeken voor "internet snelheidstest" en gebruik maken van een van de gratis online tests, zoals[ https://www.speakeasy.net/speedtest/ ](https://www.speakeasy.net/speedtest/). Als de internetverbinding van de gebruiker traag is, vertraagt het hun toegang totERDDAP. Soms kunnen ze dit oplossen door onnodig internetgebruik bij hun instelling te stoppen (b.v. mensen die streamingvideo's bekijken of videoconferentiegesprekken) .
         
    *    **Vast?**   
Zie onze[sectie over het krijgen van extra ondersteuning](/docs/intro#support).

### Afsluiten en opnieuw opstarten{#shut-down-and-restart} 
*    **Hoe te afsluiten en opnieuw te starten Tomcat enERDDAP™**   
Je hoeft Tomcat niet opnieuw te starten.ERDDAPalsERDDAP™tijdelijk langzaam is, langzaam om een bekende reden (zoals veel verzoeken van scripts ofWMSgebruikers) , of wijzigingen toe te passen opdatasets.xmlbestand.
    
Je moet stoppen en Tomcat opnieuw opstarten.ERDDAP™als u wijzigingen in het setup.xml bestand moet toepassen, of alsERDDAP™Bevriest, hangt of sluit. In extreme omstandigheden,Javakan bevriezen voor een minuut of twee, terwijl het doet een volledige afvalverzameling, maar dan herstellen. Dus het is goed om een minuut of twee te wachten om te zien ofJava'ERDDAP™is echt bevroren of als het gewoon een lange afvalverzameling. (Als afvalverzameling een veel voorkomend probleem is,[meer geheugen toewijzen aan Tomcat](/docs/server-admin/deploy-install#memory).) 
    
Ik raad het gebruik van de Tomcat Web Application Manager niet aan om Tomcat te starten of te sluiten. Als je Tomcat niet volledig afsluit en opstart, heb je vroeg of laat problemen met PermGen geheugen.
    
Tomcat enERDDAP:
    
    * Als je Linux of een Mac gebruikt:
         (Als je een speciale gebruiker hebt gemaakt om Tomcat uit te voeren, bijvoorbeeld Tomcat, vergeet dan niet om de volgende stappen te doen als die gebruiker.)   
         
        1. Gebruik cd *kat* /bin
             
        2. ps-ef gebruiken|grep Tomcat om het java/tomcat proces te vinden ID (Hopelijk wordt slechts één proces vermeld) , die we bellen *javaProcessID* beneden.
             
        3. AlsERDDAP™is bevroren/opgehangen/opgesloten, gebruik kill -3 *javaProcessID* om te vertellenJava  (die Tomcat draait) om een thread dump te doen naar het Tomcat log bestand: *kat* /logs/catalina.out . Nadat u herstart, kunt u het probleem diagnostiseren door het vinden van de draad dump informatie (en alle andere nuttige informatie erboven) in *kat* /logs/catalina.out en ook door het lezen van relevante delen van de[ERDDAP™logarchief](#log). Als u wilt, kunt u deze informatie opnemen en onze[sectie over het krijgen van extra ondersteuning](/docs/intro#support).
             
        4. Gebruik ./shutdown. sh
             
        5. ps-ef gebruiken|grep Tomcat herhaaldelijk totdat het java/tomcat proces niet is vermeld.
            
Soms duurt het java/tomcat proces tot twee minuten om volledig te sluiten. De reden is:ERDDAP™stuurt een bericht naar zijn achtergrond threads om hen te zeggen te stoppen, maar soms duurt het lang voordat deze threads op een goede stopplaats zijn.
            
        6. Als na een minuut of zo java/tomcat niet vanzelf stopt, kunt u
doden -9 *javaProcessID*   
om het java/tomcat-proces onmiddellijk te stoppen. Indien mogelijk, gebruik dit alleen als laatste redmiddel. De -9 schakelaar is krachtig, maar kan verschillende problemen veroorzaken.
             
        7. HerstartenERDDAP™, gebruik ./startup.sh
             
        8. BeeldERDDAP™in uw browser om te controleren of de herstart geslaagd is. (Soms moet je 30 seconden wachten en proberen te ladenERDDAP™opnieuw in uw browser om het te slagen.)   
             
    * Als u Windows gebruikt:
         
        1. Gebruik cd *kat* /bin
             
        2. Gebruikshutdown.bat  
             
        3. U kunt de Windows Task Manager gebruiken (toegankelijk via Ctrl Alt Del) om ervoor te zorgen dat deJavaTomcatERDDAP™proces/toepassing is volledig gestopt.
Soms duurt het proces/toepassing tot twee minuten om te sluiten. De reden is:ERDDAP™stuurt een bericht naar zijn achtergrond threads om hen te zeggen te stoppen, maar soms duurt het lang voordat deze threads op een goede stopplaats zijn.
             
        4. HerstartenERDDAP™, gebruik startup.bat
             
        5. BeeldERDDAP™in uw browser om te controleren of de herstart geslaagd is. (Soms moet je 30 seconden wachten en proberen te ladenERDDAP™opnieuw in uw browser om het te slagen.)   
             
### Regelmatige Crashes of Freezes{#frequent-crashes-or-freezes} 
AlsERDDAP™wordt langzaam, crasht of bevriest, er is iets mis. Kijk in[ERDDAPlogbestand](#log)om de oorzaak te achterhalen. Als u niet kunt, gelieve de details en zie onze[sectie over het krijgen van extra ondersteuning](/docs/intro#support).

Het meest voorkomende probleem is een lastige gebruiker die meerdere scripts tegelijk draait en/of iemand die een groot aantal ongeldige verzoeken doet. Als dit gebeurt, moet je waarschijnlijk blacklist die gebruiker. Wanneer een gebruiker op de zwarte lijst een verzoek doet, moedigt de foutmelding in het antwoord hen aan om u te mailen om de problemen op te lossen. Dan kunt u hen aanmoedigen om slechts één script tegelijk uit te voeren en de problemen in hun script op te lossen (b.v., het aanvragen van gegevens uit een dataset op afstand die niet kan reageren voordat de timing is uitgeschakeld) . Zie [&lt;aanvraagBlacklist&gt; in uwdatasets.xmlbestand] (/docs/server-admin/datasets#verzoekblacklist) .

In extreme omstandigheden,Javakan bevriezen voor een minuut of twee, terwijl het doet een volledige afvalverzameling, maar dan herstellen. Dus het is goed om een minuut of twee te wachten om te zien ofJava'ERDDAP™is echt bevroren of als het gewoon een lange afvalverzameling. (Als afvalverzameling een veel voorkomend probleem is,[meer geheugen toewijzen aan Tomcat](/docs/server-admin/deploy-install#memory).) 

AlsERDDAP™wordt langzaam of bevriest en het probleem is niet een lastige gebruiker of een lange afvalverzameling, kunt u meestal het probleem oplossen door[herstartenERDDAP™](#shut-down-and-restart). Mijn ervaring is datERDDAP™kan maanden lopen zonder herstart nodig te hebben.
     

### Monitor{#monitor} 
U kunt uwERDDAP's status door te kijken naar de[/erddap/status.htmlblz.](#status-page), met name de statistieken in het bovenste deel. AlsERDDAP™wordt langzaam of bevriest en het probleem is niet alleen zeer zwaar gebruik, u kunt meestal het probleem oplossen door[herstartenERDDAP™](#shut-down-and-restart). Er zijn extra metrics beschikbaar via de Prometheus integratie op /erdap/metrics.

Mijn ervaring is datERDDAP™kan maanden lopen zonder herstart nodig te hebben. U hoeft het alleen opnieuw te starten als u enkele wijzigingen wilt aanbrengen die u heeft gemaaktERDDAP's setup.xml of wanneer u nieuwe versies vanERDDAP™,JavaTomcat, of het besturingssysteem. Als u opnieuw moet startenERDDAP™Vaak is er iets mis. Kijk in[ERDDAPlogbestand](#log)om de oorzaak te achterhalen. Als u niet kunt, gelieve de details en zie onze[sectie over het krijgen van extra ondersteuning](/docs/intro#support). Als tijdelijke oplossing kunt u het gebruik van[Monit](https://mmonit.com/monit/)om uwERDDAP™en herstart het indien nodig. Of je kunt een cron job maken om opnieuw te starten.ERDDAP™  (proactief) periodiek. Het kan een beetje uitdagend zijn om een script te schrijven om monitoring te automatiseren en herstartenERDDAP. Enkele tips die kunnen helpen:

* U kunt het testen vereenvoudigen als het Tomcat-proces nog loopt met behulp van de -c switch met grep:
ps -u *kat Gebruiker*  |grep -c java
Dat zal de uitvoer verminderen tot "1" als het Tomcat proces nog leeft, of "0" als het proces is gestopt.
     
* Als je goed bent met gawk, kunt u de procesID uit de resultaten van
ps -u *kat Gebruiker*  |grep java en gebruik de processID in andere regels van het script.
     

Als je Monit of een cron job opzet, zou het geweldig zijn als je de details kon delen zodat anderen kunnen profiteren zie onze[sectie over het krijgen van extra ondersteuning](/docs/intro#support)voor waar je kunt delen.

#### Permgen{#permgen} 
Als u Tomcat Manager herhaaldelijk gebruikt om te herladen (of stoppen en starten)  ERDDAP™,ERDDAP™kan niet starten en gooien java.lang. UitMemoryError: PermGen. De oplossing is om periodiek (Of elke keer?)  [stop en start Tomcat enERDDAP™](#shut-down-and-restart), in plaats van gewoon opnieuw ladenERDDAP.
\\[Update: Dit probleem werd sterk geminimaliseerd of opgelost inERDDAP™versie 1.24.\\]  
     
#### Log{#log} 
*    **[log.txt](#log)**   
AlsERDDAP™niet opstarten of als iets niet werkt zoals verwacht, is het erg handig om te kijken naar de fout en kenmerkende berichten in deERDDAP™logbestand.
    * Het logbestand is *bigParentDirectory* /logs/log.txt
         ( *bigParentDirectory* is gespecificeerd in[setup.xml](/docs/server-admin/deploy-install#setupxml)) . Als er geen logboek is. txt bestand of als het logboek. txt-bestand is niet bijgewerkt sinds u herstartERDDAP™, kijk in de[Tomcat-logbestanden](#tomcat-logs)om te zien of er een foutmelding is.
    * Soorten kenmerkende berichten in het logbestand:
        * Het woord "fout" wordt gebruikt wanneer er iets zo fout ging dat de procedure niet kon worden voltooid. Hoewel het vervelend om een fout te krijgen, de fout dwingt u om te gaan met het probleem. Wij denken dat het beter is om een fout te maken dan omERDDAP™We gaan door, werken op een manier die je niet verwachtte.
        * Het woord "waarschuwing" wordt gebruikt wanneer er iets mis ging, maar de procedure kon worden voltooid. Deze zijn vrij zeldzaam.
        * Al het andere is een informatieve boodschap. U kunt bepalen hoeveel informatie is gelogd met [&lt;logLevel&gt;] (/docs/server-admin/datasets#loglevel)  datasets.xml.
        * Herladen gegevensset en gebruikersreacties die &gt;10 seconden duren om te voltooien (succesvol of niet succesvol) zijn gemarkeerd met " (&gt;10s&#33;) " Zo kunt u het log.txt bestand doorzoeken naar deze zin om de datasets te vinden die traag waren om te herladen of het verzoeknummer van de verzoeken die langzaam af waren. U kunt dan hoger kijken in het log.txt bestand om te zien wat de dataset probleem was of wat de gebruiker aanvraag was en van wie het was. Deze trage dataset ladingen en gebruikers verzoeken zijn soms belastend opERDDAP. Dus meer weten over deze verzoeken kan u helpen bij het identificeren en oplossen van problemen.
    * Informatie wordt geschreven naar het logbestand op de disk drive in vrij grote brokken. Het voordeel is dat dit zeer efficiënt is --ERDDAP™zal nooit blokkeren wachten tot informatie naar het logbestand wordt geschreven. Het nadeel is dat het logboek bijna altijd eindigt met een gedeeltelijk bericht, dat pas wordt ingevuld als het volgende stuk is geschreven. Je kunt het up-to-date maken (voor een moment) door uwERDDAP's status webpagina op https://*your.domain.org*/erddap/status.html   (ofhttp://alshttpsis niet ingeschakeld) .
    * Wanneer de log.txt-bestanden 20 MB bereiken,
het bestand is hernoemd naar log. txt.previous en een nieuw log.txt bestand is aangemaakt. Dus logbestanden verzamelen zich niet.
        
In setup.xml kunt u een andere maximale grootte opgeven voor het logbestand, in MegaBytes. Het toegestane minimum is 1 (MB) . Het toegestane maximum is 2000 (MB) . Standaard is 20 (MB) . Bijvoorbeeld:
```
        <logMaxSizeMB>20</logMaxSizeMB>
```

    * Wanneer u opnieuw startERDDAP™,
        ERDDAP™maakt een archiefkopie van log.txt en log. txt.previous bestanden met een tijdstempel op de naam van het bestand. Als er problemen waren voor de herstart, kan het nuttig zijn om deze gearchiveerde bestanden te analyseren voor aanwijzingen over wat het probleem was. U kunt de archiefbestanden verwijderen als ze niet meer nodig zijn.
         
##### Ontleden van log.txt{#parsing-logtxt} 
ERDDAPLogboek. txt-bestand is niet ontworpen voor ontleden (Hoewel u in staat zou zijn om regelmatige expressies die de gewenste informatie extraheren) . Het is ontworpen om een mens te helpen erachter te komen wat er mis gaat als er iets mis gaat. Wanneer u een fout of probleemrapport indient aanERDDAP™ontwikkelaars, indien mogelijk, gelieve alle informatie uit het log.txt bestand met betrekking tot de lastige aanvraag.

Om redenen van efficiëntie,ERDDAP™schrijft alleen informatie om te loggen. Txt nadat een groot deel van de informatie is verzameld. Dus als je log bezoekt. txt direct nadat er een fout is opgetreden, kan informatie over de fout nog niet zijn geschreven naar log.txt. Om perfect up-to-date informatie van log.txt te krijgen, bezoek uwERDDAP's[status.html pagina](#status-page). WanneerERDDAP™processen die vragen, het spoelt alle hangende informatie naar log.txt.

VoorERDDAP™gebruiksstatistieken, gebruik de[Apache- en/of Tomcat-logbestanden](#tomcat-logs)in plaats vanERDDAP's log.txt Merk op datERDDAP's[status.html pagina](#status-page)  (enkele) en[Dagelijks verslag](#daily-report)  (meer) hebben een groot aantal gebruiksstatistieken vooraf berekend voor u.
    
### Tomcat-logs{#tomcat-logs} 
AlsERDDAP™start niet op omdat een fout zeer vroeg inERDDAP's opstarten, de foutmelding verschijnt in Tomcat's logbestanden ( *kat* /logs/catalina. *vandaag* .log *kat* /logs/catalina.out) , niet in[ERDDAP's log.txt bestand](#log).

Gebruiksstatistieken: Voor de meeste informatie die mensen willen verzamelen uit een logbestand (bv. gebruiksstatistieken) Gebruik de Apache- en/of Tomcat-logbestanden. Ze zijn mooi geformatteerd en hebben dat soort informatie. Er zijn tal van hulpmiddelen om ze te analyseren, bijvoorbeeld,[AWSTats](https://www.awstats.org),[ElasticSearch's Kibana](https://www.elastic.co/products/kibana)en[JMeter](https://jmeter.apache.org), maar doorzoek het web om de juiste tool voor uw doeleinden te vinden.

Merk op dat de logbestanden alleen gebruikers identificeren als IP-adressen. Er zijn websites om u te helpen informatie over een bepaald IP-adres te krijgen, bijvoorbeeld:[WatisMyIPaddress](https://whatismyipaddress.com/ip-lookup), maar u zult normaal gesproken niet in staat zijn om de naam van de gebruiker te vinden.

Ook vanwege[DHCP](https://en.wikipedia.org/wiki/Dynamic_Host_Configuration_Protocol), het IP-adres van een bepaalde gebruiker kan verschillend zijn op verschillende dagen, of verschillende gebruikers kunnen hetzelfde IP-adres op verschillende tijdstippen hebben.

Als alternatief kunt u iets als[Google Analytics](https://analytics.google.com/analytics/web/provision/?authuser=0#/provision). Maar pas op: wanneer u externe diensten zoals Google Analytics gebruikt, geeft u de privacy van uw gebruikers op door Google volledige toegang te geven tot hun activiteiten op uw site die Google (En anderen?) kan voor altijd bewaren en gebruiken voor elk doel (misschien niet technisch, maar waarschijnlijk in de praktijk) . Uw gebruikers hebben niet ingestemd met dit en waarschijnlijk zijn niet op de hoogte dat ze zullen worden gevolgd op uw website, net zoals ze waarschijnlijk niet bewust van de mate dat ze worden gevolgd op bijna alle websites. Tegenwoordig zijn veel gebruikers erg bezorgd dat alles wat ze doen op het web wordt gecontroleerd door deze grote bedrijven (Google, Facebook, enz.) en door de overheid, en vinden dit een ongerechtvaardigde inbreuk in hun leven (zoals in het boek, 1984) . Dit heeft veel gebruikers om producten te installeren zoals[Privacy das](https://www.eff.org/privacybadger/faq)om tracking te minimaliseren, om alternatieve browsers zoals[Tor-browser](https://www.torproject.org/)  (of tracking uitschakelen in traditionele browsers) , en om alternatieve zoekmachines te gebruiken zoals[Duck Duck Go](https://duckduckgo.com/). Als u gebruik maakt van een dienst zoals Google Analytics, documenteer dan in ieder geval het gebruik en de gevolgen door het wijzigen van de&lt;standaardPrivacyBeleid&gt; tag inERDDAP's
\\[kat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml file.
    
### E-maillog{#e-mail-log} 
*    **e-mailLogYEAR-MM-DD.txt**   
    ERDDAP™schrijft altijd de tekst van alle uitgaande e-mailberichten in de huidige e-mail LogYEAR-MM-DD.txt bestand in *bigParentDirectory* /logs ( *bigParentDirectory* is gespecificeerd in[setup.xml](/docs/server-admin/deploy-install#setupxml)) .
    * Als de server geen e-mailberichten kan versturen, of als u heeft geconfigureerdERDDAP™niet om e-mailberichten te versturen, of als je gewoon nieuwsgierig bent, dit bestand is een handige manier om alle e-mailberichten die zijn verzonden te zien.
    * U kunt e-maillogbestanden van vorige dagen verwijderen als ze niet meer nodig zijn.
         
### Dagelijks verslag{#daily-report} 
Het Dagelijks Verslag heeft veel nuttige informatie -- alle informatie van uwERDDAP's[/erddap/status.htmlblz.](#status-page)En meer.
    * Het is de meest complete samenvatting van uwERDDAPstatus.
    * Onder andere statistieken, het bevat een lijst van datasets die niet geladen en de uitzonderingen die ze gegenereerd.
    * Het wordt gegenereerd wanneer u opstartERDDAP™  (vlak naERDDAP™eindigt bij het laden van alle datasets) en gegenereerd snel na 7 uur lokale tijd elke ochtend.
    * Wanneer het wordt gegenereerd, wordt het geschreven naar[ERDDAP's log.txt bestand](#log).
    * Wanneer het wordt gegenereerd, wordt het gemaild naar&lt;e-mailDailyReportsTo&gt; en&lt;e-mailAlles Aan&gt; (die zijn gespecificeerd in[setup.xml](/docs/server-admin/deploy-install#setupxml)) op voorwaarde dat u het e-mailsysteem hebt ingesteld (in setup.xml) .

### Statuspagina{#status-page} 
U kunt de status van uwERDDAP™van elke browser door naar&lt;baseUrl&gt;/erddap/status.html
* Deze pagina wordt dynamisch gegenereerd, zodat het altijd up-to-the-moment statistieken voor uwERDDAP.
* Het bevat statistieken over het aantal verzoeken, geheugengebruik, draadstapelsporen, de taakThread, enz.
* Omdat de status pagina kan worden bekeken door iedereen, het bevat niet zo veel informatie als de[Dagelijks verslag](#daily-report).
         
### Datasets toevoegen/wijzigen{#addingchanging-datasets} 
ERDDAP™meestal herleestdatasets.xmlelke *loadDatasetsMinMinutes*   (gespecificeerd in[setup.xml](/docs/server-admin/deploy-install#setupxml)) . Zodat u wijzigingen kunt aanbrengen indatasets.xmlop elk moment, zelfs alsERDDAP™is aan het rennen.
Binnenkort zal een nieuwe dataset worden gedetecteerd, meestal binnen *loadDatasetsMinMinutes* .
Een gewijzigde dataset wordt opnieuw geladen wanneer het *herladenEveryNMinutes* oud (zoals gespecificeerd indatasets.xml) .
    
#### Vlag{#flag} 
*    **[Een vlagbestand](#flag)TeltERDDAP™om zo snel mogelijk een dataset te herladen** 
    
    *   ERDDAP™zal geen wijzigingen merken in de setup van een dataset indatasets.xmltotERDDAP™herlaadt de dataset.
         
    * Om te vertellenERDDAP™om zo snel mogelijk een dataset te herladen (voordat de dataset&lt;herladenEveryNMinutes&gt; zou ervoor zorgen dat het opnieuw geladen wordt), zet een bestand in *bigParentDirectory* Vlag ( *bigParentDirectory* is gespecificeerd in[setup.xml](/docs/server-admin/deploy-install#setupxml)) met dezelfde naam als de datasetdatasetID.
Dit verteltERDDAP™om die dataset zo snel mogelijk te herladen.
De oude versie van de dataset blijft beschikbaar voor gebruikers totdat de nieuwe versie beschikbaar is en atomair op zijn plaats wordt geruild.
VoorEDDGridFromFiles en EDDTable VanuitFiles zal de herlaaddataset zoeken naar nieuwe of gewijzigde bestanden, deze lezen en ze opnemen in de dataset. Dus de tijd om te herladen is afhankelijk van het aantal nieuwe of gewijzigde bestanden.
Als de dataset actief is="valse,"ERDDAP™zal de dataset verwijderen.
         
##### Onjuiste bestandsvlag{#bad-files-flag} 
* Een variant van de /flag directory is de /badFilesFlag directory. (Toegevoegd inERDDAP™v2.12.)   
Als u een bestand in de *bigParentDirectory* /badFilesVlag directory met adatasetIDals bestandsnaam (de inhoud van het bestand doet er niet toe) , dan zodraERDDAP™ziet de badFiles Vlaggenbestand,ERDDAP™zal:
    
    1. Verwijder het badFilesFlag bestand.
    2. De badFiles verwijderen.ncbestand (als er één is) , die heeft de lijst van slechte bestanden voor die dataset.
Voor datasets zoalsEDDGridSideBySide die hebben kindDatasets, dit verwijdert ook de badFiles.ncbestand voor alle dochterdatasets.
    3. Herlaad de dataset zo snel mogelijk.
    
Dus, dit veroorzaaktERDDAP™om opnieuw te proberen om te werken met de bestanden eerder (Fout?) gemarkeerd als slecht.
         
##### Harde vlag{#hard-flag} 
* Een andere variant van de /flag directory is de /hardFlag directory. (Toegevoegd inERDDAP™v1.74.)   
Als u een bestand invoegt *bigParentDirectory* /hardVlag met eendatasetIDals bestandsnaam (de inhoud van het bestand doet er niet toe) , dan zodraERDDAP™Ziet het harde Vlaggenbestand,ERDDAP™zal:
    
    1. Verwijder het hardevlagbestand.
    2. Verwijder de dataset vanERDDAP.
    3. Verwijder alle informatie dieERDDAP™heeft opgeslagen over deze dataset.
VoorEDDGridFromFiles en EDDTable FromFiles subklassen, dit verwijdert de interne database van gegevensbestanden en hun inhoud.
Voor datasets zoalsEDDGridSideBySide die kindDatasets hebben, dit verwijdert ook de interne database van gegevensbestanden en hun inhoud voor alle kinddatasets.
    4. Herlaad de dataset.
VoorEDDGridFromFiles en EDDTable FromFiles subklassen, dit veroorzaaktERDDAP™om opnieuw te lezen **alle** van de gegevensbestanden. De herlaadtijd is dus afhankelijk van het totale aantal gegevensbestanden in de dataset. Omdat de dataset werd verwijderd vanERDDAP™wanneer de harde vlag werd opgemerkt, zal de dataset niet beschikbaar zijn totdat de dataset opnieuw geladen is. Wees geduldig. Kijk in de[log.txt](#log)als je wilt zien wat er aan de hand is.
    
De hardFlag variant verwijdert de opgeslagen informatie van de dataset, zelfs als de dataset momenteel niet geladen isERDDAP.
    
Hard Vlaggen zijn erg nuttig als je iets doet dat een verandering veroorzaakt in hoeERDDAP™leest en interpreteert de brongegevens, bijvoorbeeld wanneer u een nieuwe versie vanERDDAP™of wanneer u een wijziging hebt aangebracht in de definitie van een dataset indatasets.xml
    
* De inhoud van de vlag, badFilesFlag, en hardFlag bestanden zijn irrelevant.ERDDAP™Kijk gewoon naar de bestandsnaam om dedatasetID.
     
* Tussen belangrijke datasets herladen,ERDDAP™zoekt continu naar vlag, badFilesFlag, en hardFlag bestanden.
     
* Merk op dat wanneer een dataset wordt herladen, alle bestanden in de *bigParentDirectory* '[cache](#cached-responses)' *datasetID* map worden verwijderd. Dit omvat.ncen afbeeldingsbestanden die normaal gesproken worden gecached voor ~15 minuten.
     
* Merk op dat als de dataset xml bevat[actief="valse"](/docs/server-admin/datasets#active), een vlag zal de dataset inactief maken (als het actief is) , en in ieder geval, niet opnieuw geladen.
     
* AltijdERDDAP™start LoadDatasets om een grote herlading te doen (de getimede herlading gecontroleerd door&lt;loadDatasetsMinMinutes&gt;) of een kleine herlading (als gevolg van een externe of interne vlag) ,ERDDAP™leest alles&lt;DecompressedCacheMaxGB&gt;,&lt;decompressedCacheMaxMinutesOld&gt;,&lt;gebruiker&gt;,&lt;verzoekBlacklist&gt;,&lt;trageDownTroubleMillis&gt;, en&lt;abonnementEmailBlacklist&gt; tags en schakelt over naar de nieuwe instellingen. Dus je kunt een vlag gebruiken als een manier omERDDAP™om veranderingen in die tags zo snel mogelijk op te merken.

##### Datasetmarkering instellen{#set-dataset-flag} 
*  ERDDAP™heeft een webservice zodat vlaggen via URL's kunnen worden ingesteld.
    
    * Bijvoorbeeld,
         https://coastwatch.pfeg.noaa.gov/erddap/setDatasetFlag.txt?datasetID=rPmelTao&flagKey=123456789   
         (Dat is een valse vlag. Sleutel) zal een vlag instellen voor de rPmelTao dataset.
    * Er is een andere vlagKey voor elkedatasetID.
    * Beheerders kunnen een lijst van vlaggen-URL's voor alle datasets zien door te kijken naar de onderkant van hun[Dagelijks verslag](#daily-report)e-mail.
    * Beheerders moeten deze URL's als vertrouwelijk behandelen, omdat ze iemand het recht geven om een dataset te resetten naar believen.
    * Als je denkt dat de vlagKeys zijn gevallen in de handen van iemand die ze misbruikt, je kunt veranderen&lt;flagKeyKey&gt; in[setup.xml](/docs/server-admin/deploy-install#setupxml)en herstartERDDAPte forcerenERDDAP™om een andere set flagKeys te genereren en te gebruiken.
    * Als u verandert&lt;flagKeyKey&gt;, verwijder alle oude abonnementen (zie de lijst in uw Dagelijks Verslag) en vergeet niet om de nieuwe URL's te sturen naar de mensen die je wel wilt hebben.
    
Het vlaggensysteem kan dienen als basis voor een efficiënter mechanisme voor het vertellenERDDAP™wanneer een dataset opnieuw geladen moet worden. U kunt bijvoorbeeld een dataset instellen&lt;herladenEveryNMinutes&gt; naar een groot aantal (bv. 10080 = 1 week) . Dan, als je weet dat de dataset is veranderd (misschien omdat je een bestand aan de datamap van de dataset hebt toegevoegd) , stel een vlag in zodat de dataset zo snel mogelijk opnieuw geladen wordt. Vlaggen worden meestal snel gezien. Maar als de LoadDatasets-thread al bezet is, kan het even duren voordat het beschikbaar is om op de vlag te handelen. Maar het vlaggensysteem is veel responsiever en veel efficiënter dan setting&lt;herlaadEveryNMinutes&gt; naar een klein getal.
    
#### Datasets verwijderen{#removing-datasets} 
Als een dataset actief is inERDDAP™en u wilt het tijdelijk of permanent deactiveren:
1. Indatasets.xmlvoor de dataset, ingesteld[actief="valse"](/docs/server-admin/datasets#active)in de dataset.
2. Wacht opERDDAP™de dataset verwijderen tijdens de volgende grote herlading of[een vlag instellen](#flag)voor de datasetERDDAP™om deze wijziging zo snel mogelijk op te merken. Als je dit doet,ERDDAP™gooit geen informatie die het kan hebben opgeslagen over de dataset en doet zeker niets met de werkelijke gegevens.
3. Dan kunt u de actieve="valse" dataset indatasets.xmlof verwijder het.
         
#### Wanneer worden datasets herladen?{#when-are-datasets-reloaded} 
Een thread genaamd RunLoadDatasets is de hoofdthread die bepaalt wanneer datasets worden herladen. Uitvoeren Datasets loops voor altijd:

1. RunLoadDatasets merkt de huidige tijd op.
2. RunLoadDatasets start een LoadDatasets-thread om een "majorLoad" te doen. U kunt informatie zien over de huidige/vorige majorLoad bovenaan uwERDDAP's
    [/erddap/status.htmlblz.](#status-page)  (bijvoorbeeld,[voorbeeld statuspagina](https://coastwatch.pfeg.noaa.gov/erddap/status.html)) .
    
    1. LoadDatasets maakt een kopie vandatasets.xml.
    2. LoadDatasets leest door de kopie vandatasets.xmlen, voor elke dataset, ziet of de dataset moet worden (re) geladen of verwijderd.
        * Indien een[vlag](#flag)bestand bestaat voor deze dataset, het bestand wordt verwijderd en de dataset wordt verwijderd als actief="valse" of (re) geladen indien actief="true" (ongeacht de leeftijd van de dataset) .
        * Als de dataset.xml-chunk actief is="valse" en de dataset momenteel geladen is (actief) , het wordt gelost (verwijderd) .
        * Als de dataset active="true" heeft en de dataset nog niet geladen is, wordt deze geladen.
        * Als de dataset active="true" heeft en de dataset al geladen is, wordt de dataset opnieuw geladen als de dataset oud is (tijd sinds de laatste lading) groter is dan de&lt;herladen EveryNminutes&gt; (standaard = 10080 minuten) , anders wordt de dataset met rust gelaten.
    3. LoadDatasets is klaar.
    
De RunLoadDatasets-thread wacht tot de LoadDatasets-thread klaar is. Als LoadDatasets langer duurt dan loadDatasets Minminuten (zoals gespecificeerd in setup.xml) , RunLoadDatasets onderbreekt de LoadDatasets-thread. Idealiter, LoadDatasets merkt de onderbreking en afwerking. Maar als het niet opvalt de onderbreking binnen een minuut, RunLoadDatasets roept loadDatasets. stoppen () , wat ongewenst is.
3. Terwijl de tijd sinds het begin van de laatste majorLoad minder is dan loadDatasets Minminuten (zoals gespecificeerd in setup.xml, bv. 15 minuten) , RunLoadDatasets herhaaldelijk zoekt[vlag](#flag)bestanden in de *bigParentDirectory* /vlag directory. Als een of meer vlag bestanden worden gevonden, worden ze verwijderd, en RunLoadDatasets start een LoadDatasets thread om een "minorLoad" te doen (majorLoad=false) . U kunt geen minorLoad informatie op uwERDDAP's[/erddap/status.htmlblz.](#status-page).
    1. LoadDatasets maakt een kopie vandatasets.xml.
    2. LoadDatasets leest door de kopie vandatasets.xmlen, voor elke dataset waarvoor een vlaggenbestand bestond:
        * Als de dataset.xml-chunk actief is="valse" en de dataset momenteel geladen is (actief) , het wordt gelost (verwijderd) .
        * Als de dataset active="true" heeft, is de dataset (re) geladen, ongeacht zijn leeftijd. Niet-gevlagde datasets worden genegeerd.
    3. LoadDatasets is klaar.
4. Uitvoeren Datasets gaat terug naar stap 1.

Opmerkingen:
* Starten
Wanneer u herstartERDDAP™, elke dataset met active="true" is geladen.
* Cache
Wanneer een dataset is (re) geladen, zijn cache (met inbegrip van gegevensbestanden en/of beeldbestanden) is leeg.
* Veel datasets
Als je veel datasets hebt en/of een of meer datasets zijn traag naar (re) laden, een LoadDatasets draad kan een lange tijd duren om zijn werk te voltooien, misschien zelfs langer dan loadDatasets MinMinutes.
* One LoadDatasets Thread
Er loopt nooit meer dan één LoadDatasets draad tegelijk. Als een vlag wordt ingesteld wanneer LoadDatasets al actief is, zal de vlag waarschijnlijk niet worden opgemerkt of zal worden gehandeld totdat de LoadDatasets-thread voltooid is. Je zou kunnen zeggen: "Dat is stom. Waarom start je niet gewoon een aantal nieuwe threads om datasets te laden?" Maar als je veel datasets hebt die gegevens van een externe server krijgen, zal zelfs één LoadDatasets-thread aanzienlijke stress op de externe server veroorzaken. Hetzelfde is waar als u veel datasets die gegevens van bestanden op een RAID. Er zijn snel afnemende rendementen van het hebben van meer dan één LoadDatasets draad.
* Vlag = ASAP
Een vlag instellen geeft aan dat de dataset (re) geladen zo snel mogelijk, niet noodzakelijk onmiddellijk. Als er momenteel geen LoadDatasets-thread actief is, zal de dataset binnen enkele seconden opnieuw geladen worden. Maar als er momenteel een LoadDatasets-thread draait, wordt de dataset waarschijnlijk pas opnieuw geladen nadat de LoadDatasets-thread is voltooid.
* Vlaggenbestand verwijderd
In het algemeen, als je een vlag bestand in de *bigParentDirectory* /erddap/vlagmap (door de vlag van de dataset te bezoeken Url of het plaatsen van een echt bestand daar) , de dataset zal meestal worden herladen zeer snel na die vlag bestand wordt verwijderd.
* Vlag versus Kleine herlading AlleNminuten
Als je een externe manier hebt om te weten wanneer een dataset moet worden herladen en als het handig voor je is, is de beste manier om ervoor te zorgen dat een dataset altijd up-to-date is om zijn herladen in te stellen. ElkeNMinuten naar een groot aantal (10080?) en zet een vlag (Via een script?) wanneer het opnieuw geladen moet worden. Dat is het systeem datEDDGridVan Erddap en EDDTableFromErdap gebruiken ontvangen berichten die de dataset moet worden herladen.
* In log.txt kijken
Aan de *bigParentDirectory* /logs/log.txt-bestand. Als het niet werkt zoals je verwacht, kijk dan naar log. txt kunt u het probleem diagnostiseren door precies uit te vinden watERDDAP™Ja.
    
    * Zoek naar "majorLoad=true" voor het begin van grote LoadDataset threads.
    * Zoek naar "majorLoad=false" voor het begin van kleine LoadDatasets threads.
    * Zoeken naar een gegeven datasetdatasetIDvoor informatie over het zijn (re) geladen of in beslag genomen.
        
          
         
#### Cached Responses{#cached-responses} 
In het algemeen,ERDDAP™cache niet (opslag) antwoorden op verzoeken van gebruikers. De reden was dat de meeste verzoeken iets anders zouden zijn, zodat de cache niet erg effectief zou zijn. De grootste uitzonderingen zijn verzoeken voor afbeeldingsbestanden (die zijn gecached sinds browsers en programma's zoalsGoogle Earthvaak opnieuw verzoeken om afbeeldingen) en verzoeken om.ncbestanden (omdat ze niet on-the-fly gemaakt kunnen worden) .ERDDAP™slaat de opgeslagen bestanden van elke dataset op in een andere map: *bigParentDirectory* /cache/ *datasetID* omdat een enkele cache directory een groot aantal bestanden kan hebben die langzaam toegang kunnen krijgen.
Bestanden worden verwijderd uit de cache om een van de drie redenen:
* Alle bestanden in deze cache worden verwijderd wanneerERDDAP™opnieuw gestart.
* Periodiek, elk bestand meer dan&lt;cacheMinuten&gt; oud (zoals gespecificeerd in[setup.xml](/docs/server-admin/deploy-install#setupxml)) zal worden verwijderd. Bestanden in de cache verwijderen op basis van leeftijd (niet het minst recent gebruikt) zorgt ervoor dat bestanden niet lang in de cache blijven. Hoewel het lijkt alsof een gegeven verzoek altijd hetzelfde antwoord moet geven, is dat niet waar. Bijvoorbeeld atabledapverzoek met & tijd&gt; *enkele Tijd* zal veranderen als er nieuwe gegevens komen voor de dataset. En een griddap verzoek dat omvat\\[laatste\\]voor de tijddimensie zal veranderen als er nieuwe gegevens voor de dataset aankomen.
* Afbeeldingen met foutcondities worden gecached, maar slechts enkele minuten (Het is een moeilijke situatie.) .
* Elke keer dat een dataset wordt herladen, worden alle bestanden in de cache van die dataset verwijderd. Omdat verzoeken voor de"last"index in een gerasterde dataset, bestanden in de cache kunnen ongeldig worden wanneer een dataset wordt herladen.
         
#### Opgeslagen gegevensverzamelingsinformatie{#stored-dataset-information} 
Voor alle soorten datasets,ERDDAP™verzamelt veel informatie wanneer een dataset wordt geladen en bewaart dat in het geheugen. Dit laat toeERDDAP™zeer snel te reageren op zoekopdrachten, verzoeken om lijsten van datasets en verzoeken om informatie over een dataset.

Voor een paar soorten datasets (met nameEDDGridBegrepen, EDDtableCopy,EDDGridVan *Xxx* Bestanden, en EDDtabelVan *Xxx* Bestanden) ,ERDDAP™slaat op schijf wat informatie op over de dataset die wordt hergebruikt wanneer de dataset wordt herladen. Dit versnelt het herlaadproces enorm.

* Sommige bestanden met datasets zijn menselijk leesbaar.jsonbestanden en worden opgeslagen in *bigParentDirectory* /dataset/ *last2LettersOfDatasetID/datasetID* .
*   ERDDAP™verwijdert alleen deze bestanden in ongebruikelijke situaties, bijvoorbeeld als u een variabele uit de dataset toevoegt of verwijdertdatasets.xmlBrok.
* De meeste wijzigingen in een datasetdatasets.xmlbrok (b.v. een globaal attribuut of een variabel attribuut wijzigen) hoeft u deze bestanden niet te verwijderen. Een reguliere dataset herladen zal omgaan met dit soort veranderingen. Je kunt zienERDDAP™om zo snel mogelijk een dataset te herladen door een[vlag](#flag)voor de dataset.
* Evenzo zal de toevoeging, verwijdering of wijziging van gegevensbestanden worden behandeld wanneerERDDAP™herlaadt een dataset. MaarERDDAP™zal dit type wijziging snel en automatisch opmerken als de dataset gebruik maakt van de [&lt;updateEveryNMillis&gt;] (/docs/server-admin/datasets#updateeveryonmillis) systeem.
* Het moet alleen zelden nodig zijn voor u om deze bestanden te verwijderen. De meest voorkomende situatie waar je moet dwingenERDDAP™om de opgeslagen informatie te verwijderen (omdat het verouderd/onjuist is en niet automatisch doorERDDAP) is wanneer u wijzigingen aan de dataset aanbrengtdatasets.xmlbrok dat invloed heeft op hoeERDDAP™interpreteert gegevens in de brongegevensbestanden, bijvoorbeeld, het veranderen van de tijd variabele formaat string.
* De opgeslagen informatiebestanden van een dataset verwijderen uit eenERDDAP™dat loopt (zelfs als de dataset momenteel niet geladen is) , stel een[hard Vlag](#hard-flag)voor die dataset. Onthoud dat als een dataset een aggregatie is van een groot aantal bestanden, het herladen van de dataset veel tijd kan kosten.
* De opgeslagen informatiebestanden van een dataset verwijderen wanneerERDDAP™is niet rennen, rennen[DasDds](/docs/server-admin/datasets#dasdds)voor die gegevensset (wat makkelijker is dan uitzoeken in welke map de info zich bevindt en de bestanden met de hand verwijderen) . Onthoud dat als een dataset een aggregatie is van een groot aantal bestanden, het herladen van de dataset veel tijd kan kosten.
         
### Geheugenstatus{#memory-status} 
ERDDAP™Je mag nooit crashen of bevriezen. Als dat zo is, is een van de meest waarschijnlijke oorzaken onvoldoende geheugen. U kunt het geheugengebruik monitoren door te kijken naar de status.html webpagina, die een regel zoals

0 gc gesprekken, 0 verzoeken schuur, en 0 gevaarlijk GeheugenE-mails sinds de laatste grote LoadDatasets

 (Dat zijn steeds ernstiger gebeurtenissen.)   
en MB inUse en gc Oproepen kolommen in de tabel van statistieken. Je kunt zien hoe je geheugen gestrest is.ERDDAP™is door naar deze nummers te kijken. Hogere cijfers wijzen op meer stress.

* MB in Use moet altijd minder dan de helft van de[\\-Xmx geheugeninstelling](/docs/server-admin/deploy-install#memory). Grotere getallen zijn een slecht teken.
* gc oproepen geeft het aantal keren aanERDDAP™genaamd de vuilnisverzamelaar om te proberen te verlichten hoog geheugengebruik. Als dit &gt;100 wordt, is dat een teken van ernstige problemen.
* schuur geeft het aantal inkomende verzoeken aan die werden gestort (met HTTP-foutnummer 503, Service Niet beschikbaar) omdat het geheugengebruik al te hoog was. Idealiter mogen geen verzoeken worden afgewezen. Het is oké als een paar verzoeken worden afgewezen, maar een teken van ernstige problemen als velen worden vergoten.
* gevaarlijk GeheugenE-mails - Als geheugengebruik gevaarlijk hoog wordt,ERDDAP™stuurt een e-mail naar de e-mailadressen in&lt;e-mailAlles Aan&gt; (in setup.xml) met een lijst van de actieve gebruikersverzoeken. Zoals de e-mail zegt, stuur deze e-mails door naar Chris. John at noaa. Zodat we de informatie kunnen gebruiken om toekomstige versies vanERDDAP.
     

Als uERDDAP™is een geheugenstress:
* Overweeg het toewijzen van meer van het geheugen van uw server aanERDDAP™door de Tomcat te veranderen[‐Xmx geheugeninstelling](/docs/server-admin/deploy-install#memory).
* Als je al zoveel geheugen hebt toegewezen als je kuntERDDAP™via -Xmx, overwegen meer geheugen voor uw server te kopen. Geheugen is goedkoop (vergeleken met de prijs van een nieuwe server of uw tijd) &#33; Verhoog dan -Xmx.
* Indatasets.xml, ingesteld&lt;nGridThreads&gt; to 1, ingesteld&lt;nTableThreads&gt; to 1, and set&lt;ipAddressMaxRequestsActive&gt; to 1.
* Kijk naar de verzoeken in log.txt voor inefficiënt of lastig (maar legitiem) verzoeken. Voeg hun IP adressen toe aan&lt;verzoekBlacklist&gt; indatasets.xml. De zwarte lijst foutmelding bevat deERDDAP™E-mailadres van de beheerder met de hoop dat deze gebruikers contact met u opnemen, zodat u kunt werken met hen te gebruikenERDDAP™efficiënter. Het is goed om een lijst van IP-adressen die je zwarte lijst en waarom, zodat u kunt werken met de gebruikers als ze contact met u opnemen.
* Kijk naar de verzoeken in log.txt voor verzoeken van kwaadaardige gebruikers. Voeg hun IP adressen toe aan&lt;verzoekBlacklist&gt; indatasets.xml. Als soortgelijke verzoeken afkomstig zijn van meerdere soortgelijke IP-adres, kunt u gebruik maken van sommige who-is diensten (bv.[ https://www.whois.com/whois/ ](https://www.whois.com/whois/)) om het bereik van IP-adressen van die bron te achterhalen en het hele bereik zwart te maken. Zie [&lt;aanvraagBlacklist&gt; documentatie] (/docs/server-admin/datasets#verzoekblacklist) .
         
#### OutOfMemoryError{#outofmemoryerror} 
Als je klaar bentERDDAP™, geeft u de maximale hoeveelheid geheugen datJavakan gebruiken via de[\\-Xmx-instelling](/docs/server-admin/deploy-install#memory). AlsERDDAP™Als je ooit meer geheugen nodig hebt, gooit het een java. Lang. OutOfMemoryError.ERDDAP™doet veel controle om het mogelijk te maken om die fout sierlijk te verwerken (b.v., dus een lastig verzoek zal mislukken, maar het systeem behoudt zijn integriteit) . Maar soms, de fout schade systeem integriteit en je moet opnieuw startenERDDAP. Hopelijk is dat zeldzaam.

De snelle en eenvoudige oplossing voor een OutOfMemoryError is het verhogen van de[\\-Xmx-instelling](/docs/server-admin/deploy-install#memory), maar je moet nooit de -Xmx instelling verhogen naar meer dan 80% van het fysieke geheugen in de server (Bijvoorbeeld, voor een 10GB server, zet -Xmx niet hoger dan 8GB) . Geheugen is relatief goedkoop, dus het kan een goede optie zijn om het geheugen in de server te verhogen. Maar als je het geheugen op de server hebt gemaximeerd of om andere redenen niet kunt verhogen, moet je meer direct omgaan met de oorzaak van de OutOfMemoryError.

Als u in de[log.txt](#log)bestand om te zien watERDDAP™deed toen de fout ontstond, kunt u meestal een goede aanwijzing over de oorzaak van de OutOfMemoryError. Er zijn veel mogelijke oorzaken, waaronder:

* Een enorme gegevensbestand kan de OutOfMemoryError veroorzaken, met name, enorme ASCII-gegevensbestanden. Als dit het probleem is, moet het duidelijk zijn omdatERDDAP™zal de dataset niet laden (voor tabeldatasets) of lees gegevens uit dat bestand (voor gerasterde datasets) . De oplossing, indien haalbaar, is om het bestand te splitsen in meerdere bestanden. Idealiter kun je het bestand splitsen in logische stukken. Bijvoorbeeld, als het bestand heeft 20 maand waarde aan gegevens, splitsen in 20 bestanden, elk met 1 maand waarde aan gegevens. Maar er zijn voordelen, zelfs als het hoofdbestand willekeurig wordt gesplitst. Deze aanpak heeft meerdere voordelen: a) Dit vermindert het geheugen dat nodig is om de gegevensbestanden te lezen naar 1/20th, omdat slechts één bestand tegelijk wordt gelezen. b) Vaak,ERDDAP™kan omgaan met verzoeken veel sneller omdat het hoeft te kijken in een of een paar bestanden om de gegevens voor een bepaald verzoek te vinden. c) Als de gegevensverzameling aan de gang is, dan kunnen de bestaande 20 bestanden ongewijzigd blijven en hoeft u slechts één klein nieuw bestand te wijzigen om de waarde van de gegevens van de volgende maand aan de dataset toe te voegen.
* Eén groot verzoek kan de OutOfMemoryError veroorzaken. In het bijzonderorderByopties hebben het volledige antwoord in geheugen voor een seconde (b.v. een soort) . Als het antwoord groot is, kan het leiden tot de fout. Er zullen altijd enkele verzoeken zijn die op verschillende manieren te groot zijn. U kunt het probleem oplossen door de -Xmx instelling te verhogen. Of u kunt de gebruiker aanmoedigen om een aantal kleinere verzoeken te doen.
* Het is onwaarschijnlijk dat een groot aantal bestanden de bestandsindex zou veroorzaken dieERDDAP™maakt zo groot dat dat bestand de fout zou veroorzaken. Als we aannemen dat elk bestand 300 bytes gebruikt, dan nemen 1.000.000 bestanden slechts 300MB op. Maar datasets met een enorm aantal gegevensbestanden veroorzaken andere problemen voorERDDAP, met name, het duurt een lange tijd voorERDDAP™om al die gegevensbestanden te openen bij het beantwoorden van een gebruikersverzoek om gegevens. In dit geval kan de oplossing zijn om de bestanden zo te samenvoegen dat er minder gegevensbestanden zijn. Voor tabeldatasets is het vaak geweldig als u de gegevens van de huidige dataset in[CF Discrete bemonsteringsgeometrie (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Aanhoudende Ragged Array-gegevensbestanden (verzoek.ncCF-bestanden vanERDDAP) en maak dan een nieuwe dataset. Deze bestanden kunnen zeer efficiënt worden behandeld metERDDAP's[EDDtabelVanNcCFFiles](/docs/server-admin/datasets#eddtablefromnccffiles). Als ze logisch georganiseerd zijn (elk met data voor een stuk ruimte en tijd) ,ERDDAP™kan gegevens uit hen zeer snel halen.
* Voor tabeldatasets die de [ gebruiken&lt;subsetVariables&gt;] (/docs/server-admin/datasets#subsetvariabelen) kenmerk,ERDDAP™maakt een tabel van unieke combinaties van de waarden van die variabelen. Voor enorme datasets of wanneer&lt;subsetVariables&gt; is verkeerd geconfigureerd, deze tabel kan groot genoeg zijn om OutOfMemoryFouten te veroorzaken. De oplossing is het verwijderen van variabelen uit de lijst van&lt;subsetVariables&gt; waarvoor een groot aantal waarden bestaat, of indien nodig variabelen verwijderen totdat de grootte van die tabel redelijk is. De onderdelen vanERDDAP™die desubsetVariablessysteem werkt niet goed (bijv. webpagina's laden zeer langzaam) Als er meer dan 100.000 rijen in die tabel staan.
* Het is altijd mogelijk dat meerdere gelijktijdige grote verzoeken (op een heel drukkeERDDAP) kan combineren om geheugenproblemen te veroorzaken. Bijvoorbeeld, 8 verzoeken, elk 1GB elk, zou problemen veroorzaken voor een -Xmx=8GB setup. Maar het is zeldzaam dat elk verzoek tegelijkertijd op het hoogtepunt van zijn geheugengebruik zou zijn. En je zou gemakkelijk kunnen zien dat jeERDDAP™is erg druk met grote verzoeken. Maar het is mogelijk. Het is moeilijk om met dit probleem om te gaan anders dan door het verhogen van de -Xmx instelling.
* Er zijn andere scenario's. Als u kijkt naar de[log.txt](#log)bestand om te zien watERDDAP™deed toen de fout ontstond, kunt u meestal een goede aanwijzing over de oorzaak. In de meeste gevallen is er een manier om dat probleem te minimaliseren (zie boven) , maar soms heb je gewoon meer geheugen nodig en een hogere -Xmx instelling.
         
### Te veel geopende bestanden{#too-many-open-files} 
Beginnen metERDDAP™v2.12,ERDDAP™heeft een systeem om het aantal geopende bestanden te controleren (die sockets en sommige andere dingen bevat, niet alleen bestanden) in Tomcat op Linux computers. Als sommige bestanden per ongeluk nooit worden gesloten (een "resource lek") , het aantal open bestanden kan toenemen totdat het het maximum toegestane door het besturingssysteem en tal van echt slechte dingen gebeuren. Dus nu, op Linux computers (omdat de informatie niet beschikbaar is voor Windows) :

* Er is een kolom "Open Files" aan de rechterkant van de status.html webpagina met het percentage van de max bestanden geopend. Op Windows, het toont gewoon "?"
* WanneerERDDAP™genereert die informatie aan het einde van elke belangrijke dataset herladen, het zal afdrukken naar het logboek. txt-bestand:
openFileCount= *huidige* van max= *max* %= *percentage* 
* Indien het percentage &gt;50% bedraagt, wordt een e-mail naar deERDDAP™beheerder en e-mail Alles Naar e-mailadressen.

Als het percentage 100% is,ERDDAP™Hij zit in de problemen. Laat dit niet gebeuren.
Indien het percentage &gt;75% bedraagt,ERDDAP™Hij heeft bijna vreselijke problemen. Dat is niet goed.
Als het percentage &gt;50% is, is het zeer goed mogelijk dat een piek het percentage op 100 brengt.
Als het percentage ooit &gt; 50% is, dient u:
* Verhoog het maximum aantal geopende bestanden toegestaan door:
    * Het maken van deze veranderingen elke keer voordat u begint Tomcat (Zet ze in het Tomcat startup.sh bestand?) :
ulimit - Hn 16384
ulimit -Sn 16384
    * Of het maken van een permanente verandering door het bewerken (als root) /etc/security/ limits.conf en voeg de regels toe:
tomcat soft nofile 16384
Tomcat hard nofile 16384
Die commando's gaan ervan uit dat de gebruiker die Tomcat draait "tomcat" heet.
Bij veel Linux varianten moet je de server herstarten om die wijzigingen toe te passen. Voor beide opties is de "16384" hierboven een voorbeeld. Je kiest het nummer dat je het beste vindt.
* HerstartenERDDAP. Het besturingssysteem zal alle geopende bestanden sluiten.
         
### Verzoek mislukt{#failed-requests} 
*    **Ongebruikelijke activiteit: &gt;25% van de verzoeken is mislukt**   
Als onderdeel van elke herlaaddatasets, die meestal elke 15 minuten,ERDDAP™kijkt naar het percentage verzoeken dat is mislukt sinds de laatste herlaaddatasets. Indien &gt;25%,ERDDAP™stuurt een e-mail naar deERDDAP™beheerder met het onderwerp "Ongewone activiteit: &gt;25% van de verzoeken is mislukt." Die e-mail bevat een tally in de buurt van de bodem getiteld "Requester's IP Address (Mislukt)   (sinds de laatste Major LoadDatasets) " Zoek daar naar. Het vertelt u het IP-adres van de computers die de meest mislukte verzoeken. U kunt dan zoeken naar die IP-adressen in de\\[bigParentDirectory\\]/logs /[log.txt](#log)bestand en zie wat voor soort verzoeken ze doen.
    
U kunt het IP-nummer van de gebruiker gebruiken (bijvoorbeeld met[ https://whatismyipaddress.com/ip-lookup ](https://whatismyipaddress.com/ip-lookup)) om uit te zoeken wie of wat de gebruiker is. Soms zal dat u vrij nauwkeurig vertellen wie de gebruiker is (Bijvoorbeeld, het is een zoekmachine web crawler) . Meestal geeft het je gewoon een aanwijzing. (Bijvoorbeeld, het is een amazonaws computer, het is van een universiteit, het is iemand in een bepaalde stad) .
    
Door te kijken naar het eigenlijke verzoek, het IP-nummer en de foutmelding (alle van[log.txt](#log)) Voor een reeks fouten, kunt u meestal uitzoeken wat er mis gaat. In mijn ervaring zijn er vier gemeenschappelijke oorzaken van veel mislukte verzoeken:
    
1) De verzoeken zijn kwaadaardig (b.v. zoeken naar veiligheidsgebreken, of verzoeken indienen en deze dan annuleren voordat ze zijn voltooid) . U moet&lt;verzoekBlacklist&gt; indatasets.xmlom die IP-adressen op de zwarte lijst te zetten.
    
2) Een zoekmachine probeert naïef de URL's inERDDAP™webpagina's en ISO 19115 documenten. Er zijn bijvoorbeeld veel plaatsen die de basis tonenOPeNDAPURL, bijvoorbeeld, https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST , waaraan de gebruiker een bestandstype moet toevoegen (bv., .das, .dds, .html) . Maar de zoekmachine weet dit niet. En het verzoek aan de basis-URL mislukt. Een gerelateerde situatie is wanneer de zoekmachine bizarre verzoeken genereert of probeert formulieren in te vullen om naar "verborgen" webpagina's te komen. Maar de zoekmachines doen dit vaak slecht, wat tot mislukkingen leidt. De oplossing is:[robots.txt](#robotstxt)bestand.
    
3) Sommige gebruiker draait een script dat herhaaldelijk vraagt om iets dat er niet is. Misschien is het een dataset die vroeger bestond, maar is nu weg (tijdelijk of permanent) . Scripts verwachten dit vaak niet en gaan er dus niet intelligent mee om. Dus het script blijft verzoeken doen en de verzoeken blijven falen. Als u kunt raden wie de gebruiker is (van het IP-nummer hierboven) , neem contact met hen op en vertel hen dat de dataset niet meer beschikbaar is en vraag hen hun script te wijzigen.
    
4) Er is echt iets mis met een dataset. Meestal,ERDDAP™zal de probleemdataset inactief maken. Soms niet, dus alle verzoeken leiden tot fouten. Zo ja, los het probleem op met de dataset of (als je dat niet kunt) stel de dataset in op[actief="valse"](/docs/server-admin/datasets#active). Natuurlijk kan dit leiden tot probleem #2.
    
Soms zijn de fouten niet zo erg, vooral alsERDDAP™kan de fout detecteren en zeer snel reageren (&lt;=1ms). Dus u kunt besluiten geen actie te ondernemen.
    
Als al het andere mislukt, is er een universele oplossing: voeg het IP-nummer van de gebruiker aan de [&lt;verzoekBlacklist&gt;] (/docs/server-admin/datasets#verzoekblacklist) . Dit is niet zo erg of zo drastisch als het lijkt. De gebruiker krijgt dan een foutmelding waarin staat dat s/he op de zwarte lijst staat en vertelt hen uw (deERDDAP™Beheerders) e-mailadres. Soms neemt de gebruiker contact met u op en kunt u het probleem oplossen. Soms neemt de gebruiker geen contact met u op en ziet u exact hetzelfde gedrag van een ander IP-nummer de volgende dag. Blacklist het nieuwe IP-nummer en hoop dat ze uiteindelijk het bericht te krijgen. (Of dit is jullie Grondhogdag, waaraan jullie nooit zullen ontsnappen. Sorry.) 
    
### robots.txt{#robotstxt} 
De zoekmachine bedrijven gebruiken web crawlers (bv. Google Bot) alle pagina's op het web te onderzoeken om de inhoud toe te voegen aan de zoekmachines. VoorERDDAP™Dat is eigenlijk goed.ERDDAP™heeft veel links tussen pagina's, zodat de crawlers vinden alle webpagina's en voeg ze toe aan de zoekmachines. Dan kunnen gebruikers van de zoekmachines datasets vinden op uwERDDAP.
    
Helaas, sommige web crawlers (bv. Google Bot) nu formulieren invullen en indienen om extra inhoud te vinden. Voor websites is dit geweldig. Maar dit is verschrikkelijk voorERDDAP™omdat het leidt tot een **oneindig** aantal ongewenste en nutteloze pogingen om de werkelijke gegevens te kruipen. Dit kan leiden tot meer verzoeken om gegevens dan van alle andere gebruikers samen. En het vult de zoekmachine met goofy, nutteloze subsets van de werkelijke gegevens.
    
Om te vertellen dat de web crawlers stoppen met het invullen van formulieren en gewoon niet kijken naar webpagina's die ze niet hoeven te kijken, moet je een tekstbestand genaamd[robots.txt](https://en.wikipedia.org/wiki/Robots_exclusion_standard)in de root directory van de documenthiërarchie van uw website, zodat het door iedereen kan worden bekeken als, bijvoorbeeld, http://*www.your.domain*/robots.txt .
Als je een nieuwe robot creëert. txt-bestand, dit is een goede start:
```
    User-Agent: \\*
    Disallow: /erddap/files/ 
    Disallow: /files/ 
    Disallow: /images/ 
    Disallow: /\\*?
    Disallow: /\\*?\\*
    Disallow: /\\*.asc\\*
    Disallow: /\\*.csv\\*
    Disallow: /\\*.dods\\*
    Disallow: /\\*.esriAscii\\*
    Disallow: /\\*.esriCsv\\*
    Disallow: /\\*.geoJson\\*
    Disallow: /\\*.htmlTable\\*
    Disallow: /\\*.json\\*
    Disallow: /\\*.mat\\*
    Disallow: /\\*.nc\\*
    Disallow: /\\*.odvTxt\\*
    Disallow: /\\*.tsv\\*
    Disallow: /\\*.xhtml\\*
    Disallow: /\\*.geotif\\*
    Disallow: /\\*.itx\\*
    Disallow: /\\*.kml\\*
    Disallow: /\\*.pdf\\*
    Disallow: /\\*.png\\*
    Disallow: /\\*.large\\*
    Disallow: /\\*.small\\*
    Disallow: /\\*.transparentPng\\*
    Sitemap: http://***your.institutions.url***/erddap/sitemap.xml
```
     (Maar vervangen *uw.instellingen.url* met uwERDDAPDe basis URL.)   
Het kan een paar dagen duren voordat de zoekmachines het merken en de wijzigingen van kracht worden.
     
### sitemap.xml{#sitemapxml} 
Als de[ https://www.sitemaps.org ](https://www.sitemaps.org/)website zegt:

> Sitemaps are an easy way for webmasters to inform search engines about pages on their sites that are available for crawling. In its simplest form, a Sitemap is an XML file that lists URLs for a site along with additional metadata about each URL (when it was last updated, how often it usually changes, and how important it is, relative to other URLs on the site) so that search engines can more intelligently crawl the site.
> 
> Web crawlers usually discover pages from links within the site and from other sites. Sitemaps supplement this data to allow crawlers that support Sitemaps to pick up all URLs in the Sitemap and learn about those URLs using the associated metadata. Using the Sitemap protocol does not guarantee that web pages are included in search engines, but provides hints for web crawlers to do a better job of crawling your site.

Eigenlijk, sindsERDDAP™isRESTful, zoekmachine spinnen kunnen gemakkelijk kruipen uwERDDAP. Maar ze doen het vaker. (dagelijks&#33;) dan noodzakelijk (maandelijks?) .

* Gezien het feit dat elke zoekmachine kan kruipen uw heleERDDAP™Elke dag kan dit leiden tot veel onnodige verzoeken.
* Dus.ERDDAP™genereert een sitemap.xml bestand voor uwERDDAP™die zoekmachines vertelt dat uwERDDAP™Moet alleen elke maand gekropen worden.
* U moet een verwijzing naarERDDAP' s sitemap.xml naar uw[robots.txt](https://en.wikipedia.org/wiki/Robots_exclusion_standard)bestand:
Overzicht: http://**www.yoursite.org**/erddap/sitemap.xml
 
* Als dat niet lijkt te zijn het krijgen van het bericht aan de crawlers, kunt u vertellen de verschillende zoekmachines over de sitemap.xml bestand door een bezoek aan deze URL's (maar verandering **Uw instituut** de afkorting of afkorting van uw instelling, en **www.oursite.org** uwERDDAP's URL) :
    *    https://www.bing.com/webmaster/ping.aspx?siteMap=http://**www.yoursite.org**/erddap/sitemap.xml
 
    *    https://www.google.com/ping?sitemap=http://**www.yoursite.org**/erddap/sitemap.xml(I Denk na) je hoeft alleen maar om elke zoekmachine een keer ping, voor altijd. De zoekmachines zullen dan regelmatig wijzigingen in sitemap.xml detecteren.
     
### Verspreiding van gegevens / Distributie van gegevens NetwerkenPushenPullTechnologie{#data-dissemination--data-distribution-networks-push-and-pull-technology} 
* Normaal gesproken,ERDDAP™fungeert als tussenpersoon: het neemt een verzoek van een gebruiker, krijgt gegevens van een externe gegevensbron, herformatteert de gegevens en stuurt het naar de gebruiker.
*   [PullTechnologie](https://en.wikipedia.org/wiki/Pull_technology):ERDDAP™heeft ook de mogelijkheid om actief alle beschikbare gegevens uit een externe gegevensbron en[een lokale kopie van de gegevens opslaan](/docs/server-admin/datasets#eddgridcopy).
*   [PushTechnologie](https://en.wikipedia.org/wiki/Push_technology): Door gebruikERDDAP's[abonnementsdiensten](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions), andere dataservers kunnen worden aangemeld zodra nieuwe gegevens beschikbaar zijn, zodat zij de gegevens kunnen aanvragen (door het trekken van de gegevens) .
*   ERDDAP's[EDDGridVanErdap](/docs/server-admin/datasets#eddfromerddap)en[EDDtabelVanErdap](/docs/server-admin/datasets#eddfromerddap)gebruikERDDAPabonnementsdiensten en[vlagsysteem](#flag)zodat het onmiddellijk wordt gemeld wanneer nieuwe gegevens beschikbaar zijn.
* U kunt deze combineren met een groot effect: als u wrap anEDDGridKopiëren rond eenEDDGridFromErdap-dataset (of wrap een EDDtableCopy rond een EDDtableFromErdap dataset) ,ERDDAP™zal automatisch een lokale kopie van een ander maken en behoudenERDDAPDe dataset.
* Omdat de abonnementsdiensten werken zodra nieuwe gegevens beschikbaar zijn, verspreidt pushtechnologie zeer snel gegevens (binnen enkele seconden) .

Deze architectuur plaatst elkERDDAP™beheerder belast met het bepalen waar de gegevens voor zijn/haarERDDAP™komt van.

* AndereERDDAP™Beheerders kunnen hetzelfde doen. Er is geen behoefte aan coördinatie tussen de beheerders.
* Als veelERDDAP™beheerders koppelen aan elkaarERDDAPs, een data distributie netwerk wordt gevormd.
* Gegevens zullen snel, efficiënt en automatisch worden verspreid uit gegevensbronnen (ERDDAPs en andere servers) naar locaties voor gegevensherverdeling (ERDDAPs) overal in het netwerk.
* A gegevenERDDAP™kan zowel een bron van gegevens voor sommige datasets en een herverdelingssite voor andere datasets zijn.
* Het resulterende netwerk is ongeveer vergelijkbaar met data distributie netwerken opgezet met programma's zoals[UnidataIDD/IDM](https://www.unidata.ucar.edu/projects/index.html#idd), maar minder strak gestructureerd.
         
### Beveiliging, Authenticatie en Autorisatie{#security-authentication-and-authorization} 
Standaard,ERDDAP™draait als een volledig publieke server (gebruikhttpen/ofhttps) zonder aanmelding ([authenticatie](https://en.wikipedia.org/wiki/Authentication)) systeem en geen beperkingen op de toegang tot gegevens ([vergunning](https://en.wikipedia.org/wiki/Authorization)) .

#### Beveiliging{#security} 
Als u de toegang tot sommige of alle datasets wilt beperken tot sommige gebruikers, kunt uERDDAPHet ingebouwde beveiligingssysteem. Wanneer het beveiligingssysteem in gebruik is:

*   ERDDAP™toepassingen[rolgebaseerde toegangscontrole](https://en.wikipedia.org/wiki/Role-based_access_control).
    * DeERDDAP™beheerder definieert gebruikers met de [&lt;gebruiker&gt;] (/docs/server-admin/datasets#user) tag indatasets.xml. Elke gebruiker heeft een gebruikersnaam, een wachtwoord (if authenticatie=custom) , en een of meer rollen.
    * DeERDDAP™beheerder bepaalt welke rollen toegang hebben tot een gegeven gegevensset via de [&lt;toegankelijkTo&gt;] (/docs/server-admin/datasets#accessibleto) tag indatasets.xmlvoor elke dataset die geen publieke toegang zou moeten hebben.
* Aanmeldstatus van de gebruiker (en een link om in/uit te loggen) zal worden weergegeven bovenaan elke webpagina. (Maar een ingelogde gebruiker zal verschijnenERDDAP™om niet ingelogd te zijn als hij eenhttpURL.) 
* Indien de&lt;baseUrl&gt; dat u opgeeft in uw setup.xml is een **http** URL, gebruikers die niet zijn ingelogd kunnen gebruikenERDDAP's **http** Urls. Als&lt;baseHttpsUrl&gt; is ook gespecificeerd, gebruikers die niet zijn ingelogd kunnen ook gebruikenhttpsUrls.
* Alleen HTTPS... Indien de&lt;baseUrl&gt; dat u opgeeft in uw setup.xml is een **https** URL, gebruikers die niet zijn ingelogd worden aangemoedigd (niet gedwongen) te gebruikenERDDAP's **https** URL's -- alle links opERDDAP™webpagina's verwijzen naarhttpsUrls.
    
Als u gebruikers wilt dwingen om te gebruikenhttpsURL-adres, voeg een vaste regel Redirect toe binnen de&lt;VirtualHost \\*:80&gt; sectie in het configuratiebestand van uw Apache (meestalhttpd.conf) , bijvoorbeeld,
    
```
    <VirtualHost \\*:80>
        \\[...\\]
        ServerName example.com
        Redirect permanent / https://example.com/
    </VirtualHost>
```

Als u wilt, is er een extra methode om het gebruik vanhttps: [HTTP Strict Transport Security (HSTS) ](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security). Om het te gebruiken:
    
    1. Activeer de Apache Headers Module: a2enmod headers
    2. Voeg de extra header toe aan de HTTPS VirtualHost richtlijn. Max-leeftijd wordt gemeten in seconden en kan worden ingesteld op een bepaalde lange waarde.
        
```
        <VirtualHost \\*:443>
            # Guarantee HTTPS for 1 Year including Sub Domains 
            Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
```
    
Deze header is alleen geldig op een HTTPS VirtualHost.
    
Een reden om gebruikers niet te dwingen te gebruikenhttpsURL's is: de onderliggende SSL/TLS link kost tijd om vast te stellen en neemt dan tijd om alle informatie die wordt verzonden tussen de gebruiker en de server te versleutelen en te decoderen. Maar sommige instellingen vereisenhttpsAlleen.
    
* Gebruikers die ingelogd zijn MUST gebruikenERDDAP's **https** Urls. Als zehttpURL's, ze lijkenERDDAP™niet ingelogd zijn. Dit garandeert de privacy van de communicatie en helpt voorkomen[sessie kaping en sidejacking](https://en.wikipedia.org/wiki/Session_hijacking).
* Iedereen die niet is ingelogd kan toegang krijgen tot en gebruik maken van de openbare datasets. Standaard verschijnen privé datasets niet in lijsten van datasets als een gebruiker niet is ingelogd. Als de beheerder setup.xml's heeft ingesteld&lt;listPrivateDatasets&gt; naar waar, zullen ze verschijnen. Pogingen om gegevens van particuliere datasets op te vragen (als de gebruiker de URL kent) zal worden doorgestuurd naar de login pagina.
* Iedereen die is ingelogd zal in staat zijn om gegevens te zien en op te vragen uit elke openbare dataset en elke private dataset waartoe hun rol hen toegang geeft. Standaard verschijnen privédatasets waartoe een gebruiker geen toegang heeft niet in lijsten van datasets. Als de beheerder setup.xml's heeft ingesteld&lt;listPrivateDatasets&gt; naar waar, zullen ze verschijnen. Pogingen om gegevens op te vragen van private datasets waartoe de gebruiker geen toegang heeft, worden doorgestuurd naar de login pagina.
* DeRSSinformatie voor volledig particuliere datasets is alleen beschikbaar voor gebruikers (enRSSlezers) die zijn ingelogd en gemachtigd om die dataset te gebruiken. Dit maaktRSSniet erg nuttig voor volledig particuliere datasets.
    
Als een dataset privé is, dan is het [&lt;grafiekenToebehorenTo&gt;] (/docs/server-admin/datasets#graphsaccessableto) is ingesteld op publiek, de dataset'sRSSis toegankelijk voor iedereen.
    
* E-mailabonnementen kunnen alleen worden ingesteld als een gebruiker toegang heeft tot een dataset. Als een gebruiker zich abonneert op een private dataset, blijft het abonnement functioneren nadat de gebruiker is uitgelogd.

##### Beveiliging instellen{#setup-security} 
Om het beveiligings-/authenticatie-/authorisatiesysteem op te zetten:

* Doe de standaardERDDAP™ [beginopstelling](/docs/server-admin/deploy-install).
* In[setup.xml](/docs/server-admin/deploy-install#setupxml),
    * Toevoegen/wijzigen&lt;aanmelden&gt; waarde van niets naar aangepaste (Gebruik dit niet) , e-mail (Gebruik dit niet) , google (aanbevolen) , orcid (aanbevolen) , of oauth2 (wat google+orcid is, aanbevolen) . Zie de opmerkingen over deze opties hieronder.
    * Toevoegen/wijzigen&lt;baseHttpsUrl&gt; waarde.
    * Invoegen/verwijderen&loginInfo;in&lt;startBodyHtml&gt; om de in-/uitinfo van de gebruiker bovenaan elke webpagina weer te geven.
* Voor testdoeleinden op uw personal computer,[volg deze instructies om Tomcat te configureren om SSL te ondersteunen](https://tomcat.apache.org/tomcat-8.0-doc/ssl-howto.html)  (de grondslag voorhttpsverbindingen) door een keystore aan te maken met een[zelfondertekend certificaat](https://en.wikipedia.org/wiki/Self-signed_certificate)en door wijziging *kat* /conf/server.xml om de connector voor poort 8443 uit te schakelen. Op Windows, kunt u .keystore verplaatsen van "c:\\Users\\ *u* \\.keystore" naar "c:\\Users\\Default User\\.keystore" of "c:\\.keystore" (zie *kat* /logs/catalina. *vandaag* .log als de toepassing niet laadt of gebruikers de log-in pagina niet kunnen zien) . U kunt zien wanneer het .keystore certificaat vervalt door het certificaat te onderzoeken wanneer u inlogt.
    
Voor een publiek toegankelijke server, in plaats van het gebruik van een zelf ondertekend certificaat, wordt sterk aanbevolen dat u een certificaat ondertekend door een[certificaatautoriteit](https://en.wikipedia.org/wiki/Certificate_authority), omdat het geeft uw klanten meer zekerheid dat ze inderdaad verbinding met uwERDDAP™, geen man-in-het-midden versie van uwERDDAP. Veel leveranciers verkopen digitale certificaten. (Zoek naar web.) Ze zijn niet duur.
    
* Als Tomcat op Linux computers in Apache draait, wijzigt u /etc/httpd/conf.d/ssl.conf-bestand om HTTPS-verkeer naar/vanaf toe te staanERDDAP™zonder het :8443 poortnummer in de URL te vereisen:
    1. Het bestaande wijzigen&lt;VirtualHost&gt;-tag (als er één is) , of voeg er een toe aan het einde van het bestand zodat het tenminste deze regels heeft:
```
        <VirtualHost \\_default\\_:443>
            SSLEngine on
            SSLProxyEngine On
            ProxyPass /erddap http://localhost:8443/erddap
            ProxyPassReverse /erddap http://localhost:8443/erddap
        </VirtualHost>
```

    2. Herstart vervolgens Apache: /usr/sbin/apachectl -k sierlijk (maar soms is het in een andere map) .
* In *kat* /conf/server.xml, maak de port=8443 ongedaan&lt;Connector&gt;-tag:
```
    <Connector port="8443" 
        protocol="org.apache.coyote.http11.Http11NioProtocol"
        maxThreads="150" SSLEnabled="true">
        <SSLHostConfig>
        <Certificate certificateKeystoreFile="conf/localhost-rsa.jks" 
            type="RSA" />
        </SSLHostConfig>
    </Connector>
```
en verander de locatie van het certificaatKeystoreFile.
##### Vergunning{#authorization} 
*   [Indatasets.xml, maak een](#authorization)[&lt;gebruiker&gt;] (/docs/server-admin/datasets#user) tag voor elke gebruiker met gebruikersnaam, wachtwoord (if authorization=custom) , en rolinformatie. Dit is het machtigingsgedeelte vanERDDAPHet beveiligingssysteem.
     
* Indatasets.xml, voeg een [&lt;toegankelijkTo&gt;] (/docs/server-admin/datasets#accessibleto) tag naar elke dataset die geen publieke toegang zou moeten hebben.&lt;toegankelijkTo&gt; geeft u aan welke rollen toegang hebben tot die dataset.
     
* Herstart Tomcat. Problemen? Controleer de Tomcat logs.
     
* Controleer je werk&#33; Elke fout kan leiden tot een veiligheidsfout.
     
* Controleer of de login pagina gebruikthttps  (niethttp) . Pogingen om in te loggen viahttpmoet automatisch worden doorgestuurd naarhttpsen haven 8443 (Hoewel het poortnummer verborgen kan zijn via een Apache proxy) . Mogelijk moet u met uw netwerkbeheerder samenwerken om externe webverzoeken toegang te geven tot poort 8443 op uw server.
     
* U kunt de&lt;gebruiker&gt; en&lt;toegankelijkTo&gt; tags op elk gewenst moment. De wijzigingen zullen worden toegepast bij de volgende regelmatige herladen van een dataset, of ASAP als u een[vlag](#flag).

##### Aanmeldingscontrole{#authentication} 
[ **Aanmeldingscontrole (loggen) ** ](#authentication)  
Als u niet wilt toestaan dat gebruikers inloggen, geef dan geen waarde voor&lt;authenticatie&gt; in setup.xml.
Als u wilt toestaan dat gebruikers inloggen, moet u een waarde voor&lt;authenticatie&gt;. Momenteel,ERDDAP™ondersteuning
[aangepast](#custom)  (Gebruik dit niet) ,
[e-mail](#email)  (Gebruik dit niet) ,
[google](#google)  (aanbevolen) ,
[orcid](#orcid)  (aanbevolen) en
[oauth2color](#oauth2)  (aanbevolen) voor de authenticatiemethode.
Als u wilt inschakelen om in te loggen, raden we de google, orcid, of oauth2 opties, omdat ze u bevrijden van het opslaan en behandelen van gebruikerswachtwoorden (nodig voor aangepaste) en zijn veiliger dan de e-mail optie. Onthoud dat gebruikers vaak hetzelfde wachtwoord gebruiken op verschillende sites. Dus ze kunnen hetzelfde wachtwoord gebruiken voor uwERDDAP™Net als bij hun bank. Dat maakt hun wachtwoord zeer waardevol -- veel waardevoller voor de gebruiker dan alleen de gegevens die ze vragen. Dus je moet zoveel mogelijk doen om de wachtwoorden privé te houden. Dat is een grote verantwoordelijkheid. De e-mail, google, orcid, en oauth2 opties zorgen voor wachtwoorden, zodat u niet hoeft te verzamelen, opslaan of werken met hen. Dus je bent bevrijd van die verantwoordelijkheid.

Alles&lt;authenticatie&gt; opties gebruiken a[cookie](https://en.wikipedia.org/wiki/HTTP_cookie)op de computer van de gebruiker, zodat de browser van de gebruiker moet worden ingesteld om cookies toe te staan. Als een gebruiker maaktERDDAP™verzoeken van een computerprogramma (geen browser) , cookies en authenticatie zijn moeilijk om mee te werken. Dat is een veel voorkomend probleem met alle authenticatie systemen. Sorry.

De details van de&lt;authenticatie&gt; opties zijn:

###### Aangepast{#custom} 
aangepaste isERDDAP's aangepaste systeem voor het laten gebruikers inloggen door het invoeren van hun gebruikersnaam en wachtwoord in een formulier op een webpagina. Als een gebruiker 3 keer binnen 10 minuten probeert in te loggen, wordt de gebruiker ervan weerhouden om 10 minuten in te loggen. Dit voorkomt dat hackers gewoon miljoenen wachtwoorden proberen tot ze de juiste vinden.

Dit is enigszins veilig omdat de gebruikersnaam en het wachtwoord viahttps  (niethttp) , maar authenticatie=google, orcid, of oauth2 zijn beter omdat ze je bevrijden van het omgaan met wachtwoorden. De aangepaste aanpak vereist dat u een gebruikersnaam en een hashvert van hun wachtwoord te verzamelen (Gebruik je telefoon&#33; e-mail is niet veilig&#33;) en bewaar ze indatasets.xmlin [&lt;gebruiker&gt;] (/docs/server-admin/datasets#user) Tags.

Met de aangepaste optie, kan niemand inloggen totdat u (deERDDAP™beheerder) maak een&lt;gebruiker&gt; tag voor de gebruiker, met vermelding van de naam van de gebruiker als de gebruikersnaam, de hash vertakking van hun wachtwoord als het wachtwoord, en hun rollen.

Niet aanbevolen
Vanwege de onhandigheid van het genereren en doorgeven van de hash vertakking van het wachtwoord van de gebruiker en vanwege de risico's verbonden aanERDDAP™met de hash samenvattingen van de wachtwoorden, wordt deze optie niet aanbevolen.

Om de veiligheid van deze optie te verhogen:

* U MOET ervoor zorgen dat andere gebruikers op de server (Linux-gebruikers, nietERDDAP™gebruikers) kan bestanden in de Tomcat-map niet lezen (vooral dedatasets.xmlbestand&#33;) ofERDDAP's BigParentDirectory.
Gebruik op Linux als user=tomcat:
chmod -R g-rwx *bigParentDirectory*   
chmod -R o-rwx *bigParentDirectory*   
chmod -R g-rwx *tomcatmap*   
chmod -R o-rwx *tomcatmap*   
     
* Gebruik UEPSHA256 voor&lt;wachtwoordCoding&gt; in setup.xml.
     
* Gebruik een as-secure-as-possible methode om de hash samenvatting van het wachtwoord van de gebruiker door te geven van de gebruiker aan deERDDAP™beheerder (Telefoon?) .
         
###### e-mail{#email} 
De optie e-mailauthenticatie maakt gebruik van het e-mailaccount van een gebruiker om de gebruiker te authenticeren (door ze een e-mail te sturen met een speciale link die ze moeten openen om in te loggen) . In tegenstelling tot andere e-mails dieERDDAP™stuurt,ERDDAP™schrijft deze uitnodigingsmails niet naar het e-maillogbestand omdat ze vertrouwelijke informatie bevatten.
In theorie is dit niet erg veilig, omdat e-mails niet altijd worden gecodeerd, dus een slechterik met de mogelijkheid om e-mails te onderscheppen kan misbruik maken van dit systeem door gebruik te maken van een geldige gebruiker e-mailadres en onderscheppen van de uitnodiging e-mail.
In de praktijkERDDAP™om een Google-e-mailaccount te gebruiken om e-mails te versturen, en als je het hebt ingesteld om één van de TLS-opties voor de verbinding te gebruiken, en als de gebruiker een Google-e-mailaccount heeft, is dit enigszins veilig omdat de e-mails versleuteld zijn vanERDDAP™aan de gebruiker.

Om de veiligheid van deze optie te verhogen:

* Zorg ervoor dat andere gebruikers op de server (Linux-gebruikers, nietERDDAP™gebruikers) kan geen bestanden lezen in de Tomcat-map ofERDDAP's BigParentDirectory.
Gebruik op Linux als user=tomcat:
chmod -R g-rwx *bigParentDirectory*   
chmod -R o-rwx *bigParentDirectory*   
chmod -R g-rwx *tomcatmap*   
chmod -R o-rwx *tomcatmap*   
     
* Stel dingen in om end-to-end beveiliging voor de e-mails verzonden vanERDDAP™aan de gebruikers. U kunt bijvoorbeeld een Google-centrisch systeem maken door alleen het maken van&lt;gebruiker&gt; tags voor Google-beheerde e-mailadressen en door het instellen van uwERDDAP™om een Google-e-mailserver te gebruiken via een beveiligde/TLS-verbinding: gebruik bijvoorbeeld in uw setup.xml;
```
    <emailSmtpHost>smtp.gmail.com</emailSmtpHost>  
    <emailSmtpPort>587</emailSmtpPort>  
    <emailProperties>mail.smtp.starttls.enable|true</emailProperties>
```

Niet aanbevolen
De optie e-mailauthenticatie wordt niet aanbevolen. Gebruik in plaats daarvan de optie google, orcid of oauth2.

Zoals met de google, orcid, en oauth2 opties, e-mail is zeer handig voorERDDAP™beheerders -- je hoeft nooit om te gaan met wachtwoorden of hun hashverts. Alles wat je hoeft te creëren is een [&lt;gebruiker&gt;] (/docs/server-admin/datasets#user) label voor een gebruiker indatasets.xmlis het e-mailadres van de gebruiker, datERDDAP™gebruikt als gebruikersnaam. (Het wachtwoordattribuut wordt niet gebruikt bij authenticatie=email, google, orcid of oauth2.) 

Met de e-mail optie, alleen gebruikers die een&lt;gebruiker&gt; tag indatasets.xmlkan proberen om in te loggenERDDAP™door het verstrekken van hun e-mailadres en het klikken op de link in de e-mail dieERDDAP™stuurt ze.

ERDDAP™behandelt e-mailadressen als hoofdlettergevoelig. Het doet dit door e-mailadressen die u invoert te converteren (in&lt;gebruiker&gt; tags) of gebruikers invoeren (op het aanmeldformulier) op hun kleine versie.

Authenticatie=email instellen:

1. Verander in uw setup.xml de&lt;waarde van baseHttpsUrl&gt;-tag.
Voor het experimenteren/werken op uw personal computer, gebruik
     https://localhost:8443   
Voor uw publiekERDDAP™Gebruik
     https://*your.domain.org*:8443   
of zonder de:8443 als u een Apache gebruikt[proxypass](/docs/server-admin/deploy-install#proxypass)zodat het poortnummer niet nodig is.
     
2. Verander in uw setup.xml de&lt;authenticatie&gt; waarde van tag naar e-mail:
```
    <authentication>email</authentication>  
```

3. In uw setup.xml, zorg ervoor dat het e-mailsysteem is ingesteld via alle van de&lt;e-mail...&gt; tags, zodatERDDAP™kan e-mails verzenden. Stel dit zo mogelijk in om een beveiligde verbinding te gebruiken (SSL / TLS) naar de e-mailserver.
     
4. In uwdatasets.xml, create [&lt;gebruiker&gt;] (/docs/server-admin/datasets#user) tags voor elke gebruiker die toegang heeft tot private datasets.
Gebruik het e-mailadres van de gebruiker als gebruikersnaam in de tag.
Geef het wachtwoordattribuut in de gebruikerstag niet op.
     
5. HerstartenERDDAP™zodat de wijzigingen in setup.xml endatasets.xmlvan kracht worden.
         
###### Google, orcid, oauth2{#google-orcid-oauth2} 
*   [ **google** ](#google),[ **orcid** ](#orcid)en[ **oauth2color** ](#oauth2)   (aanbevolen)   
Alle drie deze opties zijn de aanbevolenERDDAP™Authenticatieopties. Het zijn allemaal de veiligste opties. De andere opties hebben een aanzienlijk zwakkere veiligheid.
     
###### Google{#google} 
* De google-authenticatieoptie gebruikt[Teken In met Google](https://developers.google.com/identity/gsi/web/guides/overview), dat is een uitvoering van de[OAuth 2.0-authenticatieprotocol](https://oauth.net/2/).ERDDAP™gebruikers aanmelden bij hun e-mailaccount van Google, inclusief Google-beheerde accounts zoals@noaa.govrekeningen. Dit laat toeERDDAP™om de identiteit van de gebruiker te verifiëren (naam en e-mailadres) en toegang tot hun profiel afbeelding, maar geeft geenERDDAP™toegang tot hun e-mails, hun Google Drive of andere persoonlijke informatie.
    
VoorERDDAP™v2.22 en lager,ERDDAP™gebruikt "Google Sign-In." Google zegt dat het systeem is verouderd na 31 maart 2023. Als je dat nog niet gedaan hebt, ga dan naarERDDAP™v2.23+ om het nieuwe op Google gebaseerde authenticatiesysteem te gebruiken.
    
VoorERDDAP™v2.23 gevallen met een Content-Security-Policy geconfigureerd en met behulp van Google Authentication, moet u toevoegen https://accounts.google.com naar de lijst van toegestane script-src (of script-src-elem) .ERDDAP™niet meer gebruikt https://apis.google.com , dus als je dat hebt toegestaan, kunt u het nu verwijderen.
    
VoorERDDAP™v2.24+ moet u misschien ook toevoegen https://accounts.google.com/gsi/style naar stlye-src en https://accounts.google.com/gsi/ om-src te verbinden. Voor de script-src kunt u nu gebruiken https://accounts.google.com/gsi/client.
 
    
Voor meer informatie kunt u naar de[Google-pagina](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#content_security_policy)over CSP configuratie. Als je vragen hebt, neem dan contact op met Chris.John bij Noaa.gov.
         
###### Orcid{#orcid} 
* De orcid-authenticatieoptie gebruikt[Orcid-authenticatie](https://members.orcid.org/api/integrate/orcid-sign-in), dat is een uitvoering van de[OAuth 2.0-authenticatieprotocol](https://oauth.net/2/).ERDDAP™gebruikers aanmelden bij hun[Orcid-account](https://members.orcid.org/api/integrate/orcid-sign-in), dat wordt vaak gebruikt door onderzoekers om zich te identificeren. Dit laat toeERDDAP™om de Orcid identiteit van de gebruiker te verifiëren en hun Orcid-accountnummer te krijgen, maar geeft geenERDDAP™toegang tot hun andere Orcid-accountinformatie.

###### Oauth2color{#oauth2} 
* Met de optie oauth2 kunnen gebruikers zich aanmelden bij hun Google-account of hun Orcid-account.

De google, orcid, en oauth2 opties zijn de opvolgers van de openid optie, die werd beëindigd naERDDAP™versie 1.68, die gebaseerd was op een versie van open ID dat nu verouderd is. Schakel over naar de optie google, orcid of oauth2.

Deze opties zijn zeer handig voorERDDAP™beheerders -- je hoeft nooit om te gaan met wachtwoorden of hun hashverts. Alles wat je hoeft te creëren is een [&lt;gebruiker&gt;] (/docs/server-admin/datasets#user) label voor een gebruiker indatasets.xmlwaarin het Google-e-mailadres of het Orcid-accountnummer van de gebruiker wordt opgegeven als het gebruikersnaamattribuut. (Het wachtwoordattribuut wordt niet gebruikt bij authenticatie=email, google, orcid of oauth2.) 

Met deze opties kan iedereen zich aanmelden bijERDDAP™door zich aan te melden bij hun Google-e-mailaccount of Orcid-account, maar niemand heeft het recht om toegang te krijgen tot private datasets totdat u (deERDDAP™beheerder) maak een&lt;gebruiker&gt; tag, met vermelding van hun Google-e-mailadres of Orcid-accountnummer als gebruikersnaam, en met vermelding van hun rollen.

ERDDAP™behandelt e-mailadressen als hoofdlettergevoelig. Het doet dit door e-mailadressen die u invoert te converteren (in&lt;gebruiker&gt; tags) of gebruikers invoeren (op het aanmeldformulier) op hun kleine versie.

Om google, orcid of oauth2-authenticatie in te stellen:

* Verander in uw setup.xml de&lt;waarde van baseHttpsUrl&gt;-tag.
Voor het experimenteren/werken op uw personal computer, gebruik
     https://localhost:8443   
Voor uw publiekERDDAP™Gebruik
     https://*your.domain.org*:8443   
of beter, zonder de :8443 als u een Apache gebruikt[proxypass](/docs/server-admin/deploy-install#proxypass)zodat het poortnummer niet nodig is.
     
* Verander in uw setup.xml de&lt;authenticatie&gt; waarde van google, orcid, of oauth2, bijvoorbeeld:
```
    <authentication>oauth2</authentication>  
```
###### Google setup{#google-setup} 
* Voor de google en oauth2 opties:
Volg onderstaande instructies om Google-authenticatie voor uwERDDAP.
     
    1. Als je geen Google-e-mailaccount hebt,[maak er één aan](https://www.google.com/intl/en_us/mail/help/about.html)  
         
    2. Volgen[deze instructies](https://developers.google.com/identity/sign-in/web/devconsole-project)om een Google Developers Console-project te maken en een client-ID te krijgen.
        
Wanneer het formulier van Google om toestemming vraagtJavaScript origins, voer de waarde van&lt;baseHttpsUrl&gt; van uw personal computerERDDAP™setup.xml, bv.
         https://localhost:8443   
Op een tweede regel, voeg de&lt;baseHttpsUrl&gt; van uw publiekERDDAP™setup.xml, bv.
         https://*your.domain.org*:8443
 
        
Geef geen toegestane redirect URI's op.
        
Wanneer u uw Client ID voor dit project ziet, kopieer en plak het in uw setup.xml (meestal net onder&lt;authenticatie&gt; ordelijk te zijn, maar plaatsing doet er eigenlijk niet toe), in de&lt;googleClientID&gt;-tag, bv.
        &lt;googleClientID&gt; *yourClientID* &lt;/googleClientID&gt;
De client ID zal een string van ongeveer 75 tekens, waarschijnlijk beginnen met verschillende cijfers en eindigen met .apps.googleusercontent.com .
         
        
    3. In uwdatasets.xml, maak een [&lt;gebruiker&gt;] (/docs/server-admin/datasets#user) tag voor elke gebruiker die toegang heeft tot private datasets. Voor het gebruikersnaamattribuut in de tag:
        
        * Voor gebruikers die zich aanmelden bij Google, gebruik het Google-e-mailadres van de gebruiker.
        * Voor gebruikers die zich aanmelden met orcid, gebruik het Orcid-accountnummer van de gebruiker (met streepjes) .
        
Geef het wachtwoordattribuut voor de gebruikerstag niet op.
         
    4. HerstartenERDDAP™zodat de wijzigingen in setup.xml endatasets.xmlvan kracht worden.
         
###### Orcid setup{#orcid-setup} 
* Voor de opties orcid en oauth2:
Volg de onderstaande instructies om Orcid-authenticatie voor uwERDDAP.
     (Voor nadere bijzonderheden, zie[API-documentatie van Orcid](https://members.orcid.org/api/integrate/orcid-sign-in).)   
     
    1. Als je geen Orcid-account hebt,[maak er één aan](https://orcid.org/signin)  
         
    2. Log in bij Orcid[ https://orcid.org/signin ](https://orcid.org/signin)gebruik van uw persoonlijke Orcid-account.
         
    3. Klik op "Developer Tools" (onder "Voor Onderzoekers" bovenaan) .
         
    4. Klik op "Registreer voor de gratis openbare ORCID API." Voer deze informatie in:
Naam:ERDDAP™op\\[uw organisatie\\]  
Website:\\[uwERDDAP's domein\\]  
Beschrijving:ERDDAP™is een wetenschappelijke dataserver. Gebruikers moeten zich authenticeren met Google of Orcid om toegang te krijgen tot niet-openbare datasets.
Redirect URI's:\\[uwERDDAP's domein\\]/erddap/loginOrcid.html
         
    5. Klik op het pictogram Opslaan (Het lijkt op een 3,5" disk&#33;) .
U kunt dan uw ORCID APP Client ID en ORCID Client Secret zien.
         
    6. Kopieer en plak de ORCID APP Client ID (die begint met "APP") in setup.xml in de&lt;orcidClientID&gt;-tag, bijvoorbeeld,
```
        <orcidClientID>APP-*ALPHANUMERICCHARACTERS*</orcidClientID>
```
    7. Kopieer en plak het ORCID Client Secret (kleine letters alfa-numerieke tekens met streepjes) in setup.xml in de&lt;orcidClientSecret&gt;-tag, bijvoorbeeld,
```
        <orcidClientSecret>*alpha-numeric-characters-with-dashes*</orcidClientSecret>
```

    8. In uwdatasets.xml, maak een [&lt;gebruiker&gt;] (/docs/server-admin/datasets#user) tag voor elke gebruiker die toegang heeft tot private datasets. Voor het gebruikersnaamattribuut in de tag:
        
        * Voor gebruikers die zich aanmelden bij Google, gebruik het Google-e-mailadres van de gebruiker.
        * Voor gebruikers die zich aanmelden met orcid, gebruik het Orcid-accountnummer van de gebruiker (met streepjes) .
        
Geef het wachtwoordattribuut voor de gebruikerstag niet op.
         
    9. HerstartenERDDAP™zodat de wijzigingen in setup.xml endatasets.xmlvan kracht worden.
             

###### Hoe dan ook aanmelden{#log-in-either-way} 
Als u de google-, orcid- of oauth2-authenticatieopties gebruikt, en Google Sign-In of Orcid's Authentication API plotseling stopt met werken (om welke reden dan ook) of niet meer werken alsERDDAP™verwacht, gebruikers zullen niet in staat zijn om in te loggen op uwERDDAP. Als tijdelijk (of permanent) oplossing, kunt u gebruikers vragen om zich aan te melden bij het andere systeem (een Google-e-mailaccount opvragen of een Orcid-account opvragen) . Om dit te doen:

1. Wijzig de&lt;authenticatie&gt; tag zodat het het andere authenticatiesysteem toelaat. De oauth2 optie laat gebruikers toe om in te loggen met een van beide systemen.
2. Dupliceer elk van de&lt;gebruiker&gt; tags en wijzig het gebruikersnaamattribuut van het e-mailadres van Google naar het overeenkomstige Orcid-accountnummer (of vice versa) , maar hou de rollen attribuut hetzelfde.

###### OpenId{#openid} 
ERDDAP™ondersteunt de optie openid-authenticatie niet meer, die gebaseerd was op een versie van open ID dat nu verouderd is. Gebruik in plaats daarvan de google, orcid of oauth2 opties.

###### BASIS{#basic} 
ERDDAP™ondersteunt BASIC-authenticatie niet omdat:
* BASIC lijkt gericht op vooraf gedefinieerde webpagina's die veilige toegang of deken aan/uit toegang tot de hele site, maarERDDAP™staat toe (beperkte toegang) datasets die on-the-fly moeten worden toegevoegd.
* BASIC authenticatie biedt geen manier voor gebruikers om uit te loggen&#33;
* BASIC-authenticatie is niet veilig.

##### Veilige gegevensbronnen{#secure-data-sources} 
Als een gegevensverzameling beperkte toegang moet hebben totERDDAP™gebruikers, de gegevensbron (van waaruitERDDAP™krijgt de gegevens) mag niet openbaar toegankelijk zijn. Hoe dan wel?ERDDAP™de gegevens voor datasets met beperkte toegang krijgen? Enkele opties zijn:

*   ERDDAP™kan gegevens van lokale bestanden dienen (bijvoorbeeld via EDDTable VanFiles ofEDDGridFromFiles) .
     
*   ERDDAP™kan in een[DMZ](https://en.wikipedia.org/wiki/Demilitarized_zone_(computing)) en de gegevensbron (bv. eenOPeNDAPserver of database) kan achter een[firewall](https://en.wikipedia.org/wiki/Firewall), waar het toegankelijk is voorERDDAP™Maar niet voor het publiek.
     
* De gegevensbron kan op een openbare website staan, maar vereist een login om de gegevens te krijgen. De twee soorten dataset dieERDDAP™kan inloggen op toegang zijn[EDDTableFromDatabase](/docs/server-admin/datasets#eddtablefromdatabase)en[EDDtabelVanCassandra](/docs/server-admin/datasets#eddtablefromcassandra). Deze datasets ondersteunen (en moet altijd) gebruikersnamen (eenERDDAP™gebruiker die alleen-lezen privileges heeft) , wachtwoorden, SSL-verbindingen en andere beveiligingsmaatregelen.
    
Maar in het algemeen, momenteel,ERDDAP™kan niet omgaan met deze gegevensbronnen omdat het geen bepalingen heeft voor het inloggen op de gegevensbron. Dit is de reden waarom[EDDGridFromErdap and EDDTable VanErdap](/docs/server-admin/datasets#eddfromerddap)Datasets kunnen niet worden beperkt. Momenteel is de lokaleERDDAP™heeft geen manier om in te loggen en toegang te krijgen tot de metadata informatie vanaf de remoteERDDAP. En zet de "remote"ERDDAP™achter je firewall en het verwijderen van die dataset is toegankelijk Aan beperkingen lost het probleem niet op: sinds gebruikersverzoeken voor EDDXxx FromErdap gegevens moeten worden doorgestuurd naar de remoteERDDAP™, de afstandsbedieningERDDAP™moeten toegankelijk zijn.
    
#### Verdedigingen tegen Hackers{#defenses-against-hackers} 
Er zijn slechterik hackers die proberen om de veiligheid zwakheden in server software te exploiteren zoalsERDDAP.ERDDAP™volgt het gemeenschappelijke veiligheidsadvies om meerdere verdedigingslagen te hebben:

* Beperkte voorrechten -- Een van de belangrijkste verdediging is om Tomcat uit te voeren via een gebruiker genaamd Tomcat die geen wachtwoord heeft (zodat niemand kan inloggen als die gebruiker) en heeft beperkte bestandssysteemrechten (b.v. alleen-lezen toegang tot de gegevens) . ZieERDDAP's instructies voor[opzetten van Tomcat](/docs/server-admin/deploy-install#tomcat).
* Zwaar gebruik In het algemeen,ERDDAP™is gebouwd voor zwaar gebruik, onder andere door scripts die tienduizenden verzoeken, de ene na de andere. Het is moeilijk voorERDDAP™om zich tegelijkertijd open te stellen voor zwaar legitiem gebruik en zich te beschermen tegen misbruik. Het is soms moeilijk om onderscheid te maken tussen zwaar rechtmatig gebruik, buitensporig rechtmatig gebruik en onrechtmatig gebruik. (en soms is het echt makkelijk) . Onder andere de verdediging,ERDDAP™bewust niet toestaan dat een enkel verzoek om een overmatige fractie van de middelen van het systeem te gebruiken (tenzij het systeem anders niet actief is) .
* Identificeer problematische gebruikers - AlsERDDAP™vertraagt of bevriest (misschien omdat een naïeve gebruiker of een bot meerdere scripts draait om meerdere verzoeken gelijktijdig of misschien vanwege een slechterik's[Ontkenning van diensten](https://en.wikipedia.org/wiki/Denial-of-service_attack)aanval) , kunt u kijken naar de[Dagelijks verslag e-mail](#daily-report)  (en vaker identieke informatie in de[ERDDAP™logbestand](#log)) waarin het aantal verzoeken van de meest actieve gebruikers wordt weergegeven (zie het IP-adres van de verzoeker (Toegestaan) ") .ERDDAP™stuurt ook e-mails naar de beheerder wanneer er is["Ongewone activiteit: &gt;25% van de verzoeken is mislukt"](#failed-requests). U kunt dan kijken in deERDDAP™logbestand om de aard van hun verzoeken te zien. Als je denkt dat iemand te veel verzoeken doet, bizarre verzoeken (Je zou niet geloven wat ik gezien heb.) , of aanval-type verzoeken, kunt u hun IP-adres toevoegen aan de zwarte lijst.
* Blacklist -- U kunt het IP-adres van lastige gebruikers, bots, en[Ontkenning van diensten](https://en.wikipedia.org/wiki/Denial-of-service_attack)aanvallers aan deERDDAP [zwarte lijst](/docs/server-admin/datasets#requestblacklist), zodat toekomstige verzoeken van hen onmiddellijk zullen worden afgewezen. Deze instelling is indatasets.xmlzodat u snel een IP-adres aan de lijst kunt toevoegen en vervolgens[vlag](#flag)een dataset zodatERDDAP™onmiddellijk bericht en past de wijziging toe. De foutmelding naar de zwarte lijst gebruikers moedigt hen aan contact op te nemen met deERDDAP™beheerder als ze het gevoel hebben dat ze per ongeluk op de zwarte lijst zijn gezet. (In onze ervaring waren verschillende gebruikers niet op de hoogte dat ze meerdere scripts gelijktijdig uitvoerden, of dat hun scripts onzinverzoeken deden.) 
* Gegevenssetbeveiliging - Sommige soorten datasets (met name, EDDTableFromDatabase) aanvullende veiligheidsrisico's inhouden (bijv. SQL-injectie) en hebben hun eigen veiligheidsmaatregelen. Zie de informatie voor die soorten datasets in[Werken met dedatasets.xmlBestand](/docs/server-admin/datasets), met name[EDDTableVanDatabase beveiliging](/docs/server-admin/datasets#database-security).
* Veiligheidsaudit -- HoewelNOAAIT beveiliging weigerde onze verzoeken voor scans voor jaren, ze nu routinematig scannen mijn (Bob's)  ERDDAP™installatie. Hoewel de eerste scans vond sommige problemen die ik vervolgens opgelost, daaropvolgende scans hebben geen problemen metERDDAP. De scans zorgen over een heleboel dingen: met name, sindstabledapverzoeken lijken op SQL verzoeken, ze maken zich zorgen over SQL injectie kwetsbaarheden. Maar die zorgen zijn ongegrond omdatERDDAP™ontleedt en valideert altijd vragen en bouwt dan apart de SQL query op een manier die injectie kwetsbaarheden vermijdt. Het andere waar ze soms over klagen is dat onzeJavaversie of Tomcat versies zijn niet zo up-to-date als ze willen, dus we updaten ze als reactie. Ik heb eerder aangeboden om mensen de beveiligingsrapporten te laten zien, maar ik heb nu gehoord dat ik dat niet kan doen.

#### Vragen? Suggesties?{#questions-suggestions} 
Als u vragen heeft overERDDAP's beveiligingssysteem of hebben vragen, twijfels, zorgen, of suggesties over hoe het wordt opgezet, zie onze[sectie over het krijgen van extra ondersteuning](/docs/intro#support).
    

## Dingen die je niet hoeft te weten{#things-you-dont-need-to-know} 

Dit zijn details die je niet hoeft te weten totdat er een behoefte ontstaat.

### TweedeERDDAP™ {#second-erddap} 
*    **Een tweede instellenERDDAP™voor test/ontwikkeling**   
Als je dit wilt doen, zijn er twee benaderingen:
    *    (Beste) Installeer Tomcat enERDDAP™op een andere computer dan de computer die uw publiek heeftERDDAP. Als u uw persoonlijke computer gebruikt:
        1. Doe de installatie stap voor stap. Zet Tomcat eerst aan de praat.
Wanneer Tomcat draait, moet de Tomcat Manager op
            [ http://127.0.0.1:8080/manager/html/ ](http://127.0.0.1:8080/manager/html/)  (of misschien[ http://localhost:8080/manager/html/ ](http://localhost:8080/manager/html/)) 
        2. InstallerenERDDAP.
        3. Gebruik ProxyPass niet om het poortnummer uit deERDDAP™URL.
        4. In[setup.xml](/docs/server-admin/deploy-install#setupxml), baseUrl instellen op http://127.0.0.1:8080
 
        5. Nadat je dit opstartERDDAP™, moet je in staat zijn om het te zien op
            [ http://127.0.0.1:8080/erddap/status.html ](http://127.0.0.1:8080/erddap/status.html)  (of misschien[ http://localhost:8080/erddap/status.html ](http://localhost:8080/erddap/status.html)) 
#### Tweede Tomcat{#second-tomcat} 
*    (Tweede beste) Installeer een andere Tomcat op dezelfde computer als uw publiekERDDAP.
    1. Doe de installatie stap voor stap. Zet Tomcat eerst aan de praat.
Verander alle poortnummers in verband met de tweede Tomcat (Bijvoorbeeld, verandering 8080 naar 8081)   (zie[Meerdere Tomcat Sectie Gerechten](https://tomcat.apache.org/tomcat-8.0-doc/RUNNING.txt)halverwege dat document) .
    2. InstallerenERDDAP™In de nieuwe Tomcat.
    3. Gebruik ProxyPass niet om het poortnummer uit deERDDAP™URL.
    4. In[setup.xml](/docs/server-admin/deploy-install#setupxml), baseUrl instellen op http://www.*yourDomainName*:8081
 
    5. Nadat je dit opstartERDDAP™, moet je in staat zijn om het te zien op
         http://www.*yourDomainName*:8081/erddap/status.html   
             
### Solid State Drives{#solid-state-drives} 
*    **Solid State Drives (SSD's) Geweldig&#33;**   
De snelste, makkelijkste en goedkoopste manier om te versnellenERDDAP's toegang tot tabelgegevens is om de gegevensbestanden op een Solid State Drive (SSD) . De meeste tabeldatasets zijn relatief klein, dus een 1 of 2 TB SSD is waarschijnlijk voldoende om alle gegevensbestanden voor al uw tabeldatasets te bewaren. SSD is uiteindelijk uitgeput als je gegevens naar een cel schrijft, verwijdert en te vaak nieuwe gegevens naar die cel schrijft. Dus als je gewoon gebruik maken van uw SSD om de gegevens een keer te schrijven en lees het vele malen, zelfs een consument-grade SSD moet een zeer lange tijd duren, waarschijnlijk veel langer dan elke Harde Schijf Drive (HDD) . Consumentenklasse SSD's zijn nu goedkoop (in 2018, ~ $200 voor 1 TB of ~ $400 voor 2 TB) en de prijzen dalen nog steeds snel. WanneerERDDAP™toegang tot een gegevensbestand, een SSD biedt zowel kortere latency (~0.1ms, versus ~3ms voor een HDD, versus ~10 (?) ms voor een RAID, versus ~55ms voor Amazon S3) en hogere doorvoer (~500 MB/S, versus 75 MB/s voor een HDD, versus 500 MB/s voor een RAID) . Zodat je een grote prestatie boost kunt krijgen (tot 10X versus een HDD) Voor $200&#33; Vergeleken met de meeste andere mogelijke wijzigingen in uw systeem (Een nieuwe server voor $10.000? Een nieuwe RAID voor $35.000? een nieuwe netwerkschakelaar voor $5000? enz.) , dit is veruit het beste rendement op investeringen (ROI) . Als/wanneer de SSD sterft (in 1, 2, ... 8 jaar) Vervang het. Vertrouw er niet op als voor de lange termijn, archival opslag van de gegevens, alleen voor de front-end kopie van de gegevens.\\[SSD's zouden ook geweldig zijn voor gerasterde data, maar de meeste gerasterde datasets zijn veel groter, waardoor de SSD erg duur is.\\]
    
Als uw server niet is geladen met geheugen, extra geheugen voor uw server is ook een geweldige en relatief goedkope manier om alle aspecten vanERDDAP.
     
    
### [Zware lasten/beperkingen](#heavy-loads--constraints) **  {#heavy-loads--constraints} 
Met zwaar gebruik, een standaloneERDDAP™kunnen worden beperkt door verschillende problemen. Voor meer informatie, zie de[lijst van beperkingen en oplossingen](/docs/server-admin/scaling#heavy-loads--constraints).
     
### Rasters, Clusters en Federaties{#grids-clusters-and-federations} 
Onder zeer zwaar gebruik, een enkele standaloneERDDAP™zal in een of meer beperkingen terechtkomen en zelfs de voorgestelde oplossingen zullen ontoereikend zijn. Voor dergelijke situaties,ERDDAP™heeft functies die het gemakkelijk maken om schaalbare roosters te bouwen (ook clusters of federaties genoemd) vanERDDAPs waarmee het systeem zeer zwaar kan omgaan (bv. voor een groot datacenter) . Voor meer informatie, zie[rasters, clusters en federaties vanERDDAPs](/docs/server-admin/scaling).
     
### Cloud Computing{#cloud-computing} 
Verschillende bedrijven beginnen aan te bieden[cloudcomputingdiensten](https://en.wikipedia.org/wiki/Cloud_computing)  (bv.[Amazon Web Services](https://aws.amazon.com/)) .[Webhostingbedrijven](https://en.wikipedia.org/wiki/Web_hosting_service)sinds het midden van de jaren negentig eenvoudiger diensten hebben aangeboden, maar de "cloud"-diensten hebben de flexibiliteit van de systemen en het aanbod van diensten aanzienlijk vergroot. U kunt deze diensten gebruiken om een enkeleERDDAP™of een raster/cluster vanERDDAPs zeer zwaar te gebruiken. Voor meer informatie, zie[cloud computing metERDDAP™](/docs/server-admin/scaling#cloud-computing).

### Amazon{#amazon} 
*    **[Amazon Web Services (AWS) EC2-installatieoverzicht](#amazon)**   
    [Amazon Web Services (AWS) ](https://aws.amazon.com/)is a[cloudcomputingdienst](https://en.wikipedia.org/wiki/Cloud_computing)dat een breed scala aan computerinfrastructuur biedt die u per uur kunt huren. U kunt installerenERDDAP™op een[Elastic Compute Cloud (EC2) ](https://aws.amazon.com/ec2/)instantie (hun naam voor een computer die u per uur kunt huren) . AWS heeft een uitstekende[Gebruikershandleiding AWS](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html)en u kunt Google gebruiken om antwoorden te vinden op specifieke vragen die u zou kunnen hebben. Zet je schrap -- het is een behoorlijke hoeveelheid werk om te beginnen. Maar als je eenmaal een server aan de praat hebt, kun je gemakkelijk zoveel extra middelen huren (servers, databases, SSD-ruimte, enz.) tegen een redelijke prijs.\\[Dit is geen aanbeveling of goedkeuring van Amazon Web Services. Er zijn andere cloud providers.\\]
    
Een overzicht van wat je moet doen om te krijgenERDDAP™draaien op AWS is:
    
    * In het algemeen zult u alles doen wat in de[Gebruikershandleiding AWS](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html).
    * Een AWS-account opzetten.
    * Stel een AWS-gebruiker in binnen dat account met beheerdersrechten. Log in als deze gebruiker om alle volgende stappen te doen.
    * Elastische blokopslag (EBS) is het AWS equivalent van een harde schijf aangesloten op uw server. Sommige EBS-ruimte wordt toegewezen wanneer u voor het eerst een EC2 instantie aanmaakt. Het is persistente opslag -- de informatie is niet verloren als je je EC2 instantie stopt. En als u van instantietype verandert, wordt uw EBS-ruimte automatisch gekoppeld aan de nieuwe instantie.
    * Maak een Elastisch IP-adres zodat uw EC2 instantie een stabiele, publieke URL heeft (in tegenstelling tot een privé-URL die elke keer als u uw instantie herstart verandert) .
    * Een EC2 instantie aanmaken en opstarten (computer) . Er zijn een breed scala van[type instantie](https://aws.amazon.com/ec2/instance-types/), elk tegen een andere prijs. Een m4.large of m4.xlarge instantie is krachtig en is waarschijnlijk geschikt voor de meeste toepassingen, maar kies wat aan uw behoeften voldoet. U zult waarschijnlijk Amazon's Linux als besturingssysteem willen gebruiken.
    * Als uw desktop/laptop computer een Windows-computer is, kunt u[Puttachtig](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/putty.html), een gratis SSH client voor Windows, om toegang te krijgen tot de opdrachtregel van uw EC2 instantie. Of je hebt misschien een ander SSH programma dat je liever hebt.
    * Wanneer u inlogt op uw EC2 instantie, wordt u aangemeld als de administratieve gebruiker met de gebruikersnaam "ec2-user." ec2-gebruiker heeft sudo privileges. Dus als je iets als root gebruiker moet doen, gebruik dan: sudo *someCommand* 
    * Als uw desktop/laptop computer een Windows-computer is, kunt u[FileZilla](https://stackoverflow.com/questions/16744863/connect-to-amazon-ec2-file-directory-using-filezilla-and-sftp), een gratis SFTP programma, om bestanden naar / van uw EC2 instantie. Of je hebt misschien een ander SFTP programma dat je liever hebt.
    *   [Apache installeren](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/install-LAMP.html)op uw EC2 instantie.
    * Volg de standaard[ERDDAP™installatie-instructies](/docs/server-admin/deploy-install).
         
### Wacht dan probeer opnieuw uitzondering{#waitthentryagain-exception} 
Een gebruiker kan een foutmelding krijgen zoals
Wacht danTry againException:
Er was een (Tijdelijk?) probleem. Wacht even, probeer het dan opnieuw. (Klik in een browser op de knop Herladen.)   
Details: GridDataAccessor.increment: partialResults\\[0\\]="123542730" werd verwacht op "123532800."

De algemene uitleg van de WaitThenTryAgainException is:
WanneerERDDAP™reageert op een gebruikersverzoek, er kan een onverwachte fout optreden met de dataset (bijvoorbeeld een fout bij het lezen van gegevens uit het bestand of een fout bij het openen van een dataset op afstand) . WachtDan probeer opnieuw signalen naarERDDAP™dat het verzoek is mislukt (tot dusver) maar datERDDAP™de dataset snel opnieuw laden (Het roept[RequestReloadASAP](#requestreloadasap)) en het verzoek opnieuw proberen. Vaak lukt dit, en de gebruiker ziet gewoon dat het antwoord op het verzoek traag was. Andere keren, de herlading mislukt of is te traag, of de daaropvolgende poging om om te gaan met het verzoek ook mislukt en gooit een andere WaitThenTryAgain. Als dat gebeurt,ERDDAP™markeert de dataset voor herladen, maar vertelt de gebruiker (via een WaitThenTry again Exception) dat er een mislukking was tijdens het beantwoorden van het verzoek.

Dat is het normale gedrag. Dit systeem kan veel gemeenschappelijke problemen oplossen.
Maar het is mogelijk dat dit systeem overdreven geactiveerd wordt. De meest voorkomende oorzaak is datERDDAP's laden van de dataset ziet geen probleem, maarERDDAP's antwoord op een verzoek om gegevens ziet het probleem. Wat de oorzaak ook is, de oplossing is dat je omgaat met wat er mis is met de dataset. Kijk in log.txt om de werkelijke foutmeldingen te zien en de problemen op te lossen. Als veel bestanden geldige headers maar ongeldige gegevens hebben (een beschadigd bestand) , de bestanden te vervangen door onbeschadigde bestanden. Als de verbinding met een RAID flapey is, fix het. Als de verbinding met een remote service flapey is, vind een manier om het niet flapey of download alle bestanden van de externe bron en server de gegevens van de lokale bestanden.

De gedetailleerde uitleg van die specifieke fout (boven) is:
Voor elkEDDGriddataset,ERDDAP™houdt de variabele waarden van de as in het geheugen. Ze worden bijvoorbeeld gebruikt voor het omzetten van gevraagde aswaarden die de " () " formaat in indexnummers. Bijvoorbeeld, als de as waarden zijn "10, 15, 20, 25," een verzoek voor (20) wordt geïnterpreteerd als een verzoek voor index #2 (0- basisindices) . WanneerERDDAP™krijgt een verzoek om gegevens en krijgt de gegevens van de bron, het controleert dat de as waarden die het kreeg van de bron overeenkomen met de as waarden in het geheugen. Normaal wel. Maar soms is de gegevensbron op een significante manier veranderd: bijvoorbeeld, index waarden vanaf het begin van de as variabele kan zijn verwijderd (b.v. "10, 15, 20, 25" kan "20, 25, 30" zijn geworden) . Als dat gebeurt, is het duidelijk datERDDAP"De uitlegging van het verzoek (bv. " (20) " is index #2) is nu verkeerd. Dus.ERDDAP™gooit een uitzondering en roept RequestReloadASAP.ERDDAP™zal de dataset binnenkort bijwerken (vaak in een paar seconden, meestal binnen een minuut) . Andere, soortgelijke problemen ook gooien de WaitThenTryOpnieuw uitzondering.
    
#### RequestReloadASAP{#requestreloadasap} 
U kunt RequestReloadASAP zien in het log.txt bestand direct na een foutmelding en vaak in de buurt van een[Wacht dan probeer opnieuw uitzondering](#waitthentryagain-exception). Het is eigenlijk een interne, programmatische manier voorERDDAP™om een[vlag](#flag)om aan te geven dat de dataset zo snel mogelijk opnieuw geladen moet worden.
     
### Bestanden worden niet verwijderd{#files-not-being-deleted} 
Voor een paarERDDAP™installaties, is er een probleem met een aantal tijdelijke bestanden worden gemaakt doorERDDAP™open blijven (ten onrechte) en dus niet worden verwijderd. In een paar gevallen hebben veel van deze bestanden verzameld en nam een aanzienlijke hoeveelheid schijfruimte.

Hopelijk zijn deze problemen opgelost. (vanafERDDAP™v2,00) . Als je dit probleem ziet, stuur dan de directory+namen van de beledigende bestanden naar Chris. John bij Noaa.gov. Je hebt een paar opties om het probleem aan te pakken:

* Als de bestanden niet groot zijn en er niet voor zorgen dat je geen schijfruimte meer hebt, kun je het probleem negeren.
* De eenvoudigste oplossing is het afsluiten van Tomcat /ERDDAP™  (na uren waardoor minder gebruikers worden getroffen) . Tijdens het afsluiten, als het besturingssysteem de bestanden niet verwijdert, verwijder ze met de hand. HerstartenERDDAP.
         
### JSON-ld{#json-ld} 
*    **[Semantische Markup van Datasets met json-ld (JSON Gekoppelde gegevens) ](#json-ld)**   
    ERDDAP™nu gebruikt[json-ld (JSON Gekoppelde gegevens) ](https://json-ld.org)om uw data catalogus en datasets deel te maken van de[semantisch web](https://en.wikipedia.org/wiki/Semantic_Web), dat is Tim Berners-Lee's idee om web inhoud meer machineleesbaar en machine "begrijpelijk" te maken. De json-ld inhoud gebruikt[schema.org](https://schema.org/)termen en definities. Zoekmachines ([Google in het bijzonder](https://developers.google.com/search/docs/data-types/datasets)) en andere semantische tools kunnen deze gestructureerde markup gebruiken om ontdekking en indexering te vergemakkelijken. De json-ld gestructureerde markering lijkt onzichtbaar voor mensen.&lt;script&gt; code op de https://.../erddap/info/index.html webpagina (wat een semantisch web is[DataCatalog](https://schema.org/DataCatalog)) en op elk https://.../erddap/info/*datasetID*/index.html webpagina (wat een semantisch web is[Dataset](https://schema.org/Dataset)) . (Speciale dank aan Adam Leadbetter en Rob Fuller van het Instituut voor de Zee in Ierland voor het doen van de harde delen van het werk om dit deel vanERDDAP.)   
     
### URL's buiten de datum{#out-of-date-urls} 
Langzaam maar zeker, de URL's die data providers hebben geschreven in gegevensbestanden worden verouderd (bijvoorbeeld,httpwordthttps, websites worden herschikt, en organisaties zoals NODC/NGDC/NCDC worden gereorganiseerd in NCII) . De resulterende verbroken links zijn een steeds aanwezige probleem geconfronteerd door alle websites. Om hiermee om te gaan,ERDDAP™heeft nu een systeem om verouderde URL's automatisch bij te werken. Als GenererenDatasets Xml ziet een verouderde URL, het voegt de up-to-date URL aan&lt;addAttributes&gt;. Ook wanneer een dataset laadt, alsERDDAP™ziet een verouderde URL, het verandert het stil naar de up-to-date URL. De veranderingen worden gecontroleerd door een reeks zoek-voor-vervang-met-paren gedefinieerd in&lt;updateUrls&gt; inERDDAP's
\\[kat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml file. Daar kun je veranderingen aanbrengen. Als u suggesties voor wijzigingen, of als u denkt dat dit moet worden omgezet in een dienst (zoals de converters) E-mail Chris. John bij Noaa.gov.
     
### CORS{#cors} 
* CORS ([Cross-origin Resource Sharing](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing))   
"is een mechanisme dat beperkte middelen toelaat (bijvoorbeeld lettertypen ofERDDAP™gegevens) op een webpagina die moet worden aangevraagd bij een ander domein buiten het domein waaruit de eerste bron werd geserveerd" (Arun Ranganathan) . In principe, CORS is een bericht dat kan worden geplaatst in de HTTP header van een antwoord, zeggen in wezen, "Het is goed met deze site als bepaalde andere sites (specifieke, of alle) bronnen grijpen (bv. gegevens) van deze site en maak het beschikbaar op hun site." Het is dus een alternatief voor[JSONP](https://en.wikipedia.org/wiki/JSONP).
    
De ontwikkelaars vanERDDAP™geen veiligheidsdeskundigen zijn. We zijn niet helemaal duidelijk over de veiligheidskwesties in verband met CORS. We willen geen verklaring afleggen voor een actie die de veiligheid vermindert. Dus we blijven neutraal en laten het aan elk over.ERDDAP™beheerder om te beslissen of de voordelen of het mogelijk maken van een CORS header de risico's waard zijn. Zoals altijd, als uwERDDAP™Het is een goed idee om extra voorzichtig te zijn met beveiliging.
    
Als u CORS wilt inschakelen voor uwERDDAP™, zijn er[gemakkelijk beschikbare instructies](https://enable-cors.org/index.html)beschrijven hoe websitebeheerders een CORS-header kunnen inschakelen via hun serversoftware op lager niveau (bv. Apache of nginx) .
    
### Paletten{#palettes} 
* Paletten worden gebruikt doorERDDAP™om een reeks gegevenswaarden om te zetten in een reeks kleuren bij het maken van grafieken en kaarten.
    
Elk palet is gedefinieerd in een .cpt-stijl paletbestand zoals gebruikt door[GMT](https://www.soest.hawaii.edu/gmt/). AllesERDDAP™.cpt bestanden zijn geldige GMT .cpt bestanden, maar het tegenovergestelde is niet waar. Voor gebruik inERDDAP™, .cpt bestanden hebben:
    
    * Optionele commentaarregels aan het begin van het bestand, te beginnen met "#."
    * Een hoofdsectie met een beschrijving van de segmenten van het palet, één segment per lijn. Elke segmentbeschrijving lijn heeft 8 waarden:
start Waarde, startRood, start Groen, begin. Blauw, endValue, endRed, endGreen, endBlue.
Er kunnen een aantal segmenten zijn.ERDDAP™maakt gebruik van lineaire interpolatie tussen de startRed/Green/Blue en endRed/Green/Blue van elk segment.
        
We raden aan dat elk segment een start- en eindkleur geeft die anders zijn, en dat de startkleur van elk segment dezelfde is als de eindkleur van het vorige segment, zodat het palet een continue mix van kleuren beschrijft.ERDDAP™heeft een systeem voor het creëren van on-the-fly een palet van discrete kleuren uit een palet met een continue mix van kleuren. EenERDDAP™gebruiker kan aangeven of ze willen dat het palet continu is (het origineel) Discrete (afgeleid van het origineel) . Maar er zijn legitieme redenen om deze aanbevelingen voor sommige paletten niet te volgen.
        
    * De startValue en endValues moeten gehele getallen zijn.
Het eerste segment moet startValue=0 en endValue=1 hebben.
Het tweede segment moet startValue=1 en endValue=2 hebben.
Etc.
    * De rode, groene en blauwe waarden moeten gehele getallen zijn van 0 (geen) ... 255 (volledig op) .
    * Het einde van het bestand moet 3 regels hebben met:
        1. Een achtergrond rgb kleur voor gegevens waarden minder dan de kleurbalk minimum, bijvoorbeeld: B 128 128 128
Het is vaak de startRed, startGreen, en startBlue van het eerste segment.
        2. Een voorgrond rgb kleur voor data waarden meer dan de kleurbalk maximum, bijvoorbeeld: F 128 0 0
Het is vaak het eindeRood, endGreen, en eindBlue van het laatste segment.
        3. Een rgb-kleur voor NaN-gegevenswaarden, bv. N 128 128 128
Het is vaak middengrijs (128 128 128) .
    * De waarden op elke regel moeten worden gescheiden door tabbladen, zonder externe spaties.
    
Een sample .cpt bestand is BlueWhiteRed.cpt:
    
\\# Dit is BlueWhiteRed.cpt.
0 0 0 128 1 0 0 255
1 0 0 255 2 0 255
2 0 255 255 3 255 255 255
3 255 255 255 4 255 255 0
5 255 255 0 0
5 255 0 0 6 128 0 0
B 0 0 128
F 128 0 0
N 128 128 128
    
Zie de bestaande .cpt-bestanden voor andere voorbeelden. Als er problemen zijn met een .cpt bestand,ERDDAP™zal waarschijnlijk een fout gooien wanneer het .cpt bestand wordt ontleed (Dat is beter dan de informatie verkeerd gebruiken.) .
    
U kunt extra paletten toevoegen aanERDDAP. U kunt ze zelf maken of vinden op het web (bijvoorbeeld op[cpt-city](http://soliton.vm.bytemark.co.uk/pub/cpt-city/)) Hoewel je waarschijnlijk zal moeten hun formaat iets te bewerken om te voldoen aanERDDAP.cpt eisen. Om te krijgenERDDAP™om een nieuw .cpt bestand te gebruiken, sla het bestand op in *kat* /webapps/erddap/WEB-INF/cptfiles (dat moet je doen voor elke nieuwe versie vanERDDAP) en hetzij:
    
    * Als u het standaard messages.xml bestand gebruikt: voeg de bestandsnaam toe aan de&lt;paletten&gt; tag in
         *kat* /webapps/erdap/WEB-INF/classes/gov/noaa/pfel/erdap/util/messages.xml.
Als je dit doet, moet je het doen elke keer als je upgradeERDDAP.
    * Als u een aangepaste messages.xml bestand: voeg de bestandsnaam aan de&lt;paletten&gt;-tag in uw aangepaste berichten.xml-bestand: *kat* /content/erdap/messages.xml . Als je dit doet, hoef je het maar één keer te doen. (maar er is andere werk om een aangepaste berichten.xml bestand te onderhouden) .
    
HerstartenERDDAP™dusERDDAP™merkt de veranderingen op. Een voordeel van deze aanpak is dat u de volgorde van de paletten kunt opgeven in de lijst die aan gebruikers wordt gepresenteerd. Als je een verzameling toevoegt, raden we je aan om een voorvoegsel toe te voegen met de auteurs initialen (bv. "KT\\_") naar de naam van elk palet om de collectie te identificeren en zodat er meerdere paletten kunnen zijn die anders dezelfde naam zouden hebben.
    
Verwijder of verander geen standaard paletten. Ze zijn een standaard kenmerk van alleERDDAP™installaties. Als u denkt dat een palet of verzameling paletten in de standaard moet worden opgenomenERDDAP™distributie omdat het / ze van algemeen nut zou zijn, e-mail ze naar Chris. John bij Noaa.gov.
    
### Kleurbalken{#colorbars} 
*    **Hoe gaat het?ERDDAP™de kleuren in een kleurbalk genereren?** 
    
    1. De gebruiker selecteert een van de vooraf gedefinieerde[paletten](#palettes)of gebruikt de standaard, bijvoorbeeld Rainbow. Paletten worden opgeslagen/gedefinieerd in GMT-stijl .cpt Kleur Palet Tabelbestanden. ElkERDDAP's voorgedefinieerde paletten hebben een eenvoudig integer bereik, bijvoorbeeld 0 tot 1 (als er maar één sectie in het palet staat) , of 0 tot 4 (als er vier secties in het palet staan) . Elk segment in het bestand bestrijkt n tot n+1, te beginnen bij n=0.
    2.  ERDDAP™genereert een nieuw .cpt bestand on-the-fly door het bereik van het vooraf gedefinieerde palet te schalen (bv. 0 tot 4) naar het bereik van het palet dat de gebruiker nodig heeft (bv. 0,1 tot 50) en dan een sectie in het nieuwe palet aanmaken voor elke sectie van het nieuwe palet (b.v. een logschaal met teken op 0,1, 0,5, 1, 5, 10, 50 heeft 5 secties) . De kleur voor het eindpunt van elke sectie wordt gegenereerd door de relevante sectie van het palet te vinden in het .cpt bestand, waarna de R-, G- en B-waarden lineair worden geïnterpoleerd. (Dat is hetzelfde als hoe GMT genereert kleuren uit de kleur palet tafel bestanden.) Dit systeem staatERDDAP™om te beginnen met generieke paletten (b.v. Regenboog met 8 segmenten, in totaal 0 tot 8) en maak aangepaste paletten on-the-fly (bijv. een aangepaste regenboog, die 0,1 tot 50 mg/l in kaart brengt met de regenboogkleuren) .
    3.  ERDDAP™dan gebruikt dat nieuwe .cpt bestand om de kleur te genereren voor elke verschillende gekleurde pixel in de kleurbalk (en later voor elk gegevenspunt wanneer gegevens op een grafiek of kaart worden uitgezet) , opnieuw door het vinden van de relevante sectie van het palet in het .cpt bestand, vervolgens lineair interpoleren van de R, G en B waarden.
    
Dit proces lijkt misschien onnodig ingewikkeld. Maar het lost problemen op in verband met log schalen die moeilijk zijn om andere manieren op te lossen.
    
Dus hoe kun je nabootsen watERDDAP™Doet? Dat is niet makkelijk. In principe moet je het proces datERDDAP™gebruikt. Als u eenJavaprogrammeur, u kunt dezelfde gebruikenJavaklasse datERDDAP™gebruikt om dit alles te doen:
     *kat* /webapps/erdap/WEB-INF/classes/gov/noaa/pfel/coastwatch/sgt/CompoundColorMap.java.
    
### Richtsnoeren voor gegevensdistributiesystemen{#guidelines-for-data-distribution-systems} 
Meer algemene adviezen over het ontwerp en de evaluatie van datadistributiesystemen zijn te vinden[Hier.](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html).
     
### ArchiefADataset{#archiveadataset} 
Inbegrepen in uwERDDAP™installatie is een command line tool genaamd ArchiveADataset die u kan helpen een archief te maken (a.zipof.tar.gzbestand) met een deel of geheel van een dataset opgeslagen in een reeks van netcdf-3.ncgegevensbestanden in een bestandsformaat dat geschikt is voor indiening bijNOAANCEI-archief (.ncvoor gerasterde datasets of[.ncCFMA](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA)voor tabeldatasets, zoals gespecificeerd door de[NCIINetCDFSjablonen v2.0](https://www.ncei.noaa.gov/data/oceans/ncei/formats/netcdf/v2.0/index.html)) .

ArchiefA Dataset kan twee verschillende archiefformaten maken:

* Het oorspronkelijke formaat volgt deze[NCII-Archiveringsrichtsnoeren](https://www.ncdc.noaa.gov/atrac/guidelines.html), deze gids voor[Uw gegevens archiveren bij NCII](https://sites.google.com/a/noaa.gov/ncei-ioos-archive/cookbook?pli=1), en[Praktijken voor het waarborgen van gegevensintegriteit](https://sites.google.com/a/noaa.gov/ncei-ioos-archive/cookbook/data-integrity).
* Het "BagIt" formaat maakt[BagIt bestanden](https://en.wikipedia.org/wiki/BagIt), een gestandaardiseerd archiefformaat gepromoot door de Amerikaanse bibliotheek van het Congres, zoals gespecificeerd door de[BagIt v0.97 specificatie](https://tools.ietf.org/html/draft-kunze-bagit-14).NOAA's NCII kan standaardiseren op BagIt-bestanden voor inzendingen aan het archief.

Niet verrassend, de[globale en variabele metagegevens](/docs/server-admin/datasets#global-attributes)datERDDAP™stimuleert / vereist is bijna precies dezelfde in-file CF en ACDD metadata die NCII stimuleert / vereist, dus al uw datasets moeten klaar zijn voor indiening bij NCII via[Send2NCEI](https://www.nodc.noaa.gov/s2n/)of[ATRAC](https://www.ncdc.noaa.gov/atrac/index.html)  (NCII's Advanced Tracking and Resource tool voor archiefcollecties) .

Als u (deERDDAP™beheerder) gebruik ArchiefADataset om gegevens te verzenden naar NCII, dan kunt u (niet NCII) zal bepalen wanneer om een stuk van gegevens te verzenden naar NCEI en wat die brok zal zijn, want je zult weten wanneer er nieuwe gegevens en hoe te specificeren dat brok (en NCII niet) . ArchiveADataset is dus een hulpmiddel voor u om een pakket aan te maken om te onderwerpen aan NCII.

ArchiefA Dataset kan nuttig zijn in andere situaties, bijvoorbeeld voorERDDAP™beheerders die een deelverzameling van een dataset moeten converteren (op een privéERDDAP) vanaf het oorspronkelijke bestandsformaat in een set van[.ncCF-bestanden](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA), zodat een publiekERDDAP™kan de gegevens van de.ncCF-bestanden in plaats van de originele bestanden.

Als je eenmaal klaar bentERDDAP™en run het (ten minste één keer) , kunt u ArchiveADataset vinden en gebruiken in de *kat* /webapps/erddap/WEB-INF directory. Er is een shellscript (ArchiefADataset.sh) voor Linux/Unix en een batchbestand (ArchiefADataset.bat) voor ramen.

Op Windows, de eerste keer dat je ArchiveADataset draait, moet je de ArchiveADataset bewerken. bat-bestand met een teksteditor om het pad naar de java te veranderen. exe-bestand zodat Windows kan vindenJava.

Wanneer u ArchiveADataset draait, stelt het u een reeks vragen. Typ voor elke vraag een antwoord en druk op Enter. Of druk op ^C om een programma op elk moment te verlaten.

Of je kunt de antwoorden op de vragen op volgorde op de commandoregel zetten. Om dit te doen, voer het programma een keer en typ in en schrijf uw antwoorden. Dan kunt u een enkele opdrachtregel aanmaken (met de antwoorden als parameters) die het programma draait en alle vragen beantwoordt.
Gebruik het woord standaard als u de standaard waarde voor een gegeven parameter wilt gebruiken.
Gebruik "" (twee dubbele citaten) als plaatshouder voor een lege string.
Het specificeren van parameters op de opdrachtregel kan zeer handig zijn, bijvoorbeeld als u ArchiveADataset eenmaal per maand gebruikt om gegevens van een maand te archiveren. Zodra je de opdrachtregel met parameters hebt gegenereerd en die in je notities of in een shellscript hebt opgeslagen, hoef je alleen maar elke maand kleine wijzigingen aan te brengen om het archief van die maand te maken.

De vragen die ArchiveADataset stelt staan u toe:

* Originele of Bagit-bestandsverpakking opgeven. Gebruik Bagit voor NCII.
* Zip of teer specificeren.gzcompressie voor het pakket. Gebruik teer voor NCII.gz.
* Geef een contact e-mailadres op voor dit archief (het zal worden geschreven in het READ\\_ME.txt bestand in het archief) .
* Vermeld dedatasetIDvan de dataset die u wilt archiveren.
* Geef aan welke gegevensvariabelen u wilt archiveren (meestal alle) .
* Geef aan welke deelverzameling van de dataset u wilt archiveren. Je moet de subset op dezelfde manier formatteren als je een subset zou formatteren voor een gegevensaanvraag, dus het zal anders zijn voor gerasterde datasets dan voor tabeldatasets.
    * Voor gerasterde datasets kunt u een bereik van waarden van de meest linkse dimensie opgeven, meestal is dat een bereik van tijd. ArchiefADataset zal een apart verzoek doen en een apart gegevensbestand genereren voor elke waarde in het waardenbereik. Omdat gerasterde datasets meestal groot zijn, moet je bijna altijd een kleine subset opgeven ten opzichte van de grootte van de hele dataset.
Bijvoorbeeld,\\[ (2015-12-01) : (2015-12-31) \\]\\[\\]\\[\\]\\[\\]
    * Voor tabeldatasets kunt u elke verzameling van beperkingen specificeren, maar het is vaak een bereik van tijd. Omdat tabeldatasets meestal klein zijn, is het vaak mogelijk om geen beperkingen op te geven, zodat de hele dataset gearchiveerd wordt.
Bijvoorbeeld, &time&gt;=2015-12-01&time&lt;2016 01 01
* Voor tabeldatasets: geef een komma gescheiden lijst van 0 of meer variabelen op die bepalen hoe de gearchiveerde gegevens verder in verschillende gegevensbestanden worden onderverdeeld. Voor datasets met
    [cdm\\_data\\_type](/docs/server-admin/datasets#cdm_data_type)\\=Tijdreeks|TijdSeries-bestand|Traject|TrajectoryProfile
je moet bijna altijd de variabele specificeren die de cf\\_role=timeserie heeft\\_id (bv.stationID) cf\\_role=trajectory\\_id attribuut. ArchiefADataset zal een apart verzoek doen en een apart gegevensbestand genereren voor elke combinatie van de waarden van deze variabelen, bijvoorbeeld voor elkestationID.
Voor alle andere tabeldatasets, zult u waarschijnlijk geen variabelen voor dit doel specificeren.
Waarschuwing: Als de subset van de dataset die u archivert erg groot is (&gt; 2 GB) en er is geen geschikte variabele voor dit doel, dan is ArchiveADataset niet bruikbaar met deze dataset. Dit moet zeldzaam zijn.
* Specificeer het bestandsformaat voor de gegevensbestanden die zullen worden aangemaakt.
Voor gerasterde datasets, voor NCII, gebruiken.nc.
Voor tabeldatasets, voor NCII, gebruik[.ncCFMA](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA)als het een optie is; anders gebruik.nc.
* Specificeer het type bestandssamenvatting dat voor elk gegevensbestand en voor het gehele archiefpakket moet worden aangemaakt: MD5, SHA-1, of SHA-256. Het bestandssamenvatting biedt een manier voor de client (bv. NCII) om te testen of het gegevensbestand beschadigd is geraakt. Traditioneel waren dit[.md5 bestanden](https://en.wikipedia.org/wiki/MD5), maar nu zijn er betere opties. Gebruik SHA-256 voor NCII.

Nadat u alle vragen hebt beantwoord, zal ArchiveADataset:

1. Maak een reeks verzoeken aan de dataset en podium de resulterende gegevensbestanden in *bigParentDirectory* /ArchiveADataset/ *datasetID_Tijdstempel* /.
Voor gerasterde datasets zal er een bestand zijn voor elke waarde van de meest linkse dimensie (bv. tijd) . De naam van het bestand zal die waarde zijn (bv. de tijdswaarde) .
Voor tabeldatasets zal er een bestand zijn voor elke waarde van de ... variabele (s) . De naam van het bestand zal die waarde zijn. Als er meer dan één variabele is, zullen de linkervariabelen gebruikt worden om subdirectory namen te maken, en de meest rechtse variabele zal gebruikt worden om de bestandsnamen te maken.
Elk gegevensbestand moet&lt;2GB (het toegestane maximum door.ncversie 3 bestanden) .
2. Maak een bestand gerelateerd aan elk gegevensbestand met de samenvatting van het gegevensbestand. Bijvoorbeeld, als het gegevensbestand 46088 is.ncen het verteringstype is .sha256, dan heeft het verteringsbestand de naam 46088.nc.sha256 .
3. Maak een READ\\_ME.txt bestand met informatie over het archief, inclusief een lijst van alle instellingen die u hebt opgegeven om dit archief te genereren.
4. Maak 3 bestanden in *bigParentDirectory* /ArchiveADataset/:
    
    * A.zipof.tar.gzarchiefbestand genaamd *datasetID_Tijdstempel* .zip  (of.tar.gz) alle geënsceneerde gegevensbestanden bevatten en bestanden verteren. Dit bestand kan elke grootte hebben, beperkt door schijfruimte.
    * Een samenvattingsbestand voor het archiefbestand, bijvoorbeeld, *datasetID_Tijdstempel* .zip.sha256.txt
    * Voor het "originele" type archief, een tekstbestand genaamd *datasetID_Tijdstempel* .zip.listOfFiles.txt (of.tar.gz) waarin alle bestanden in de.zip  (of.tar.gz) bestand.
    
Als u het archief voor NCII bereidt, zijn dit de bestanden die u naar NCII stuurt, misschien via[Send2NCEI](https://www.nodc.noaa.gov/s2n/)of[ATRAC](https://www.ncdc.noaa.gov/atrac/index.html)  (NCII's Advanced Tracking and Resource tool voor archiefcollecties) .
5. Verwijder alle geënsceneerde bestanden zodat alleen het archiefbestand (bv..zip) , de vertakking (bv. .sha256.txt) van het archief, en (facultatief) de .listOfFiles.txt bestanden blijven over.

#### ISO 19115 .xml Metadatabestanden{#iso-19115-xml-metadata-files} 
Het archiefADataset archiefpakket bevat niet het ISO 19115 .xml metadatabestand voor de dataset. Als u een ISO 19115 bestand voor uw dataset wilt/moet indienen naar NCII, kunt u ze het ISO 19115 .xml metadata bestand datERDDAP™gemaakt voor de dataset (maarNMFSmensen moeten het ISO 19115 bestand voor hun datasets van InPort krijgen alsERDDAP™dient dat bestand nog niet) .

Problemen? Suggesties? ArchiefADataset is nieuw. Als u problemen of suggesties, Zie onze[sectie over het krijgen van extra ondersteuning](/docs/intro#support).
     
