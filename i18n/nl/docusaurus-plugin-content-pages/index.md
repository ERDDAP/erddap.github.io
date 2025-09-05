---
title: "ERDDAP™ Documentation"
---
## Laatste ERDDAP™ versie{#latest-erddap-version} 

2.28,1, zie [de documentatie wijzigen](/changes#version-2281) en [download het](https://github.com/ERDDAP/erddap/releases/tag/v2.28.1) .

##  ERDDAP™ informatie{#erddap-information} 

 ERDDAP™ is een wetenschappelijke data server die gebruikers een eenvoudige, consistente manier om subsets van
gridded en tabeller wetenschappelijke datasets in gemeenschappelijke bestandsformaten en maak grafieken en kaarten.
 ERDDAP™ is een Vrije en Open Bron (Apache en Apache-achtige)   Java Server van NOAA   NMFS   SWFSC Afdeling Milieuonderzoek ( ERD ) .

* Zien/gebruiken ERDDAP™ installatie: [https://coastwatch.pfeg.noaa.gov/erddap/index.html](https://coastwatch.pfeg.noaa.gov/erddap/index.html) 
* Aan de slag met een installatie lezen [de installatiehandleiding](/docs/server-admin/deploy-install) .
* Om bij te dragen code zie de [programmeurshandleiding](/docs/contributing/programmer-guide) .


Hieronder vindt u relevante links voor vragen stellen en hoe u kunt bijdragen.
* Bekijk gesprekken en stel vragen op [https://groups.google.com/g/erddap](https://groups.google.com/g/erddap) of op [https://github.com/erddap/erddap/discussions](https://github.com/erddap/erddap/discussions) 
* Beoordelen en onderwerpen aan [https://github.com/erddap/erddap/issues](https://github.com/erddap/erddap/issues) 
* Om featureverzoeken voor te stellen, volgt u deze leidraad: [ ERDDAP Discussies #93 (commentaar) ](https://github.com/ERDDAP/erddap/discussions/93#discussion-4920427) 


## Meerdere zoekopdrachten ERDDAP™ s
Er zijn twee manieren om meerdere te zoeken ERDDAP™ s voor datasets: [Meerdere zoekopdrachten ERDDAP™ s](/SearchMultipleERDDAPs.html) en [ ERDDAP™ Dataset Discovery](http://erddap.com/) .


## Stel uw eigen ERDDAP™  {#set-up-your-own-erddap} 

 ERDDAP™ is a [Vrije en open bron](https://en.wikipedia.org/wiki/Free_and_open-source_software) , all- Java   (servlet) , webapplicatie die draait in een webapplicatieserver (bijvoorbeeld, Tomcat (aanbevolen) , of Jetty (Het werkt, maar we steunen het niet.) ) . Deze web pagina is vooral voor mensen (" ERDDAP™ beheerders") die hun eigen ERDDAP™ installatie op hun eigen website.

Aan de slag met een installatie lezen [de installatiehandleiding](/docs/server-admin/deploy-install) .

### Waarom gebruiken ERDDAP™ om uw gegevens te verspreiden?{#why-use-erddap-to-distribute-your-data} 

Omdat de kleine inspanning om ERDDAP™ brengt vele voordelen.

* Als u al een webservice heeft voor het verspreiden van uw gegevens,
Je kunt het opzetten. ERDDAP™ toegang tot uw gegevens via de bestaande dienst.
Of, je kunt het opzetten ERDDAP™ om rechtstreeks toegang te krijgen tot uw gegevens uit lokale bestanden.
* Voor elke dataset hoef je alleen een klein stukje XML te schrijven om te vertellen ERDDAP™ hoe toegang te krijgen tot de dataset.
* Zodra u ERDDAP™ het dienen van uw gegevens, eindgebruikers kunnen:
    * De gegevens op verschillende manieren aanvragen ( DAP , WMS , en meer in de toekomst) .
    * Krijg de data response in verschillende bestandsformaten. (Dat is waarschijnlijk de grootste reden&#33;) 
    * Maak grafieken en kaarten. (Iedereen houdt van mooie plaatjes.) 
    * Bouw andere nuttige en interessante dingen op de top van ERDDAP 's Web services -- zie de [ Awesome ERDDAP TM](https://github.com/IrishMarineInstitute/awesome-erddap) lijst van geweldig ERDDAP - gerelateerde projecten.

Je kunt [aanpassen](/docs/server-admin/deploy-install#customize) uw ERDDAP Het lijkt erop dat ERDDAP™ weerspiegelt uw organisatie en past in de rest van uw website.

## Is de installatieprocedure moeilijk? Mag ik het doen?{#is-the-installation-procedure-hard-can-i-do-it} 

De eerste installatie duurt enige tijd, maar het is niet erg moeilijk. Je kunt het. Als je vastzit, mail me dan naar erd dot data at noaa dot gov . Ik zal je helpen.
Of, u kunt toetreden tot de [ ERDDAP™ Google Group / mailinglijst](https://groups.google.com/g/erddap) en plaats je vraag daar.

## Wie gebruikt ERDDAP™  {#who-uses-erddap} 

 ERDDAP™ is geïnstalleerd door ongeveer 100 organisaties in ten minste 17 landen

 (Australië, België, Canada, China, Frankrijk, India, Ierland, Italië, Nieuw-Zeeland, Rusland, Zuid-Afrika, Spanje, Sri Lanka, Zweden, Thailand, Verenigd Koninkrijk, Verenigde Staten) , waaronder:

*    [APDRC](https://apdrc.soest.hawaii.edu/erddap/index.html)   (Asia-Pacific Data-Research Center, International Pacific Research Center) aan de Universiteit van Hawaï (UH)  
*    [BCO-DMO bij WHI](https://erddap.bco-dmo.org/erddap/index.html)   (Biologische en chemische Oceanografie Data Management Office bij Woods Hole Oceanographic Instellingen)  
*    [CanWIN ERDDAP™ ](https://canwinerddap.ad.umanitoba.ca/erddap/index.html)   (Canadian Watershed Information Network) bij het Centrum voor Aardobservatiewetenschappen (CEOS) , Universiteit van Manitoba
*    [CDIP](https://erddap.cdip.ucsd.edu/erddap/index.html)   (Kustgegevensinformatieprogramma bij UCSD)  
*    [CNR-ISP](https://data.iadc.cnr.it/erddap/index.html)   (Nationale Onderzoeksraad van Italië, Instituut voor Polar Sciences)  
* CSIRO en IMOS (Australië's Commonwealth Wetenschappelijk en Industrieel Onderzoek Organisatie en het Geïntegreerd Observatiesysteem voor de Zee) 
*    [DIVER ( NOAA ORR) ](https://pub-data.diver.orr.noaa.gov/erddap/index.html)   ( NOAA Bureau voor respons en herstel)  
*    [EMODnet Natuurkunde](https://erddap.emodnet-physics.eu/erddap/index.html)   (Het Europese mariene observatie- en datanetwerk - Natuurkunde)  
*    [GoMRI](https://erddap.griidc.org/erddap/index.html)   (Onderzoeksinitiatief Golf van Mexico)  
*    [Hakai Instituut](https://catalogue.hakai.org/erddap/index.html)   (Het Hakai Instituut aan de Centrale Kust van British Columbia, Canada) 
*    [High School Technology Services](https://myhsts.org) , die programmeer- en technologietraining biedt voor studenten en volwassenen
*    [ICHEC](https://erddap.ichec.ie/erddap/index.html)   (Irish Centre for High-End Computing) 
*    [I NCO IS](https://erddap.incois.gov.in/erddap/index.html)   (Indian National Centre for Ocean Information Services)  
* IRD (Institut de Recherche pour le Développement, Frankrijk)   
CNRS (Centre National de la Recherche Scientifique, Frankrijk)   
UPMC (Université Pierre et Marie CURIE, Parijs, Frankrijk)   
UCAD (Universiteit Cheikh Anta Diop de Dakar, Sénégal)   
UGB (Université Gaston Berger -- Saint-Louis du Sénégal)   
UFHB (Université Félix HOUPHOUËT-BOIGNY, Abidjan, Ivoorkust)   
IPSL (Institut Pierre Simon Laplace des sciences de l'environnement, Parijs, Frankrijk)   
LMI ECLAIRS (Laboratoire Mixte International Etude du Climate en Afrique de l) 
* GCO (Europese Commissie - Gemeenschappelijk Centrum voor onderzoek, Europese Unie) 
*    [Het Instituut voor de Zee](https://erddap.marine.ie/erddap/index.html)   (Ierland)  
* Marine Instruments S.A. (Spanje) 
* NCI (Australië's nationale computerinfrastructuur) 
*    [ NOAA Kustwacht](https://coastwatch.noaa.gov/erddap/index.html)   (centraal)  
*    [ NOAA Coastwatch CGOM](https://cwcgom.aoml.noaa.gov/erddap/index.html)   (Caribisch gebied/Golf van Mexico-knooppunt)  
*    [ NOAA Kustwacht GLERL](https://coastwatch.glerl.noaa.gov/erddap/index.html)   (Grote merenknooppunt)  
*    [ NOAA CoastWatch West Coast](https://coastwatch.pfeg.noaa.gov/erddap/index.html) die samen met en werkt met
     [ NOAA   ERD ](https://coastwatch.pfeg.noaa.gov/erddap/index.html)   (Afdeling Milieuonderzoek SWFSC van NMFS ) 
*    [ NOAA IOOS-sensoren](https://erddap.sensors.ioos.us/erddap/index.html)   (Geïntegreerd oceaanobservatiesysteem)  
*    [ NOAA IOOS Ce NCO OS](https://erddap.axiomdatascience.com/erddap/index.html)   (Centraal- en Noord-Californië Ocean Observing System, gerund door Axiom Data Science)  
*    [ NOAA IOOS GCOOS Atmosferische en Oceanografische Gegevens: Observerend Systeem](https://erddap.gcoos.org/erddap/index.html)   
     [ NOAA IOOS GCOOS Atmosferische en Oceanografische gegevens: Historische collecties](https://gcoos5.geos.tamu.edu/erddap/index.html)   
     [ NOAA IOOS GCOOS Biologische en Socio-economie](https://gcoos4.tamu.edu/erddap/index.html)   (Observatiesysteem voor de Golfkust van de Oceaan) 
*    [ NOAA IOOS NERACOOS](http://www.neracoos.org/erddap/index.html)   (Noordoostelijke regionale vereniging van kust- en oceaanobservatiesystemen)  
*    [ NOAA IOOS NGDAC](https://data.ioos.us/gliders/erddap/index.html)   (Nationale Glider Gegevensverzamelingscentrum)  
*    NOAA IOOS NANOOS (Northwest Association of Networked Ocean Observing Systems) 
*    [ NOAA IOOS PACIOOS](https://pae-paha.pacioos.hawaii.edu/erddap/index.html)   (Pacific Islands Ocean Observing System) aan de Universiteit van Hawaï (UH)  
*    NOAA IOOS SCCOOS (Observatiesysteem voor de zuidelijke kust van Californië) 
*    [ NOAA IOOS SECORA](https://erddap.secoora.org/erddap/index.html)   (Regionale vereniging van de zuidoostelijke kustzee)  
*    [ NOAA NCII](https://www.ncei.noaa.gov/erddap/index.html)   (Nationale centra voor milieu-informatie)    
*    NOAA NGDC STP (Nationaal Geofysisch Datacenter, Zonne -- Terrestrische Natuurkunde) 
*    NOAA   NMFS NEFSC (Northeast Fisheries Science Center) 
*    [ NOAA NOS COOPS](https://opendap.co-ops.nos.noaa.gov/erddap/index.html)   (Centrum voor operationele Oceanografische producten en diensten)  
*    [ NOAA OSMC](http://osmc.noaa.gov/erddap/index.html)   (Waarnemingssysteembewakingscentrum)  
*    [ NOAA PIFSC](https://oceanwatch.pifsc.noaa.gov/erddap/index.html)   (Pacific Islands Fisheries Science Center)  
*    [ NOAA PMEL](https://data.pmel.noaa.gov/pmel/erddap/index.html) 
*    [ NOAA PolarWatch](https://polarwatch.noaa.gov/erddap/index.html) 
*    [ NOAA UAF](https://upwell.pfeg.noaa.gov/erddap/index.html)   (Unified Access Framework)  
*    [Ocean Networks Canada](http://dap.onc.uvic.ca/erddap/index.html)  
*    [Ocean Tracking Network](https://members.oceantrack.org/erddap/index.html)  
*    [OOI / Alle gegevens](https://erddap-goldcopy.dataexplorer.oceanobservatories.org/erddap/index.html)   (Initiatief Ocean Observatories)   
OOI / ongekabelde gegevens
* Princeton, Hydrometeorologie Research Group
* R.Tech Engineering, Frankrijk
*    [Rutgers University, Vakgroep Mariene en Kustwetenschappen](https://tds.marine.rutgers.edu/erddap/index.html)   
* San Francisco Estuary Institute
*    [Scripps Instelling van Oceanografie, Spray Underwater Gliders](https://spraydata.ucsd.edu/erddap/index.html)  
*    [Slimme Atlantische Oceaan](https://www.smartatlantic.ca/erddap/index.html) Memorial University of Newfoundland
* Zuid-Afrikaanse milieuobservatienetwerk
* Spyglass Technologies
* Stanford University, Hopkins Marine Station
*    [UNESCO IODE](https://erddap.oa.iode.org/erddap/index.html)   (Internationale Oceanografie en Informatie Gegevensuitwisseling)  
*    [University of British Columbia, Earth, Ocean & Atmospheric Afdeling Wetenschappen](https://salishsea.eos.ubc.ca/erddap/index.html)  
*    [Universiteit van Californië aan Davis, Bodega Marine Laboratory](http://bmlsc.ucdavis.edu:8080/erddap/index.html)  
*    [Universiteit van Delaware, Satellietontvangststation](https://basin.ceoe.udel.edu/erddap/index.html)  
* Universiteit van Washington, Toegepast Natuurkunde Laboratorium
*    [USGS CMGP](https://geoport.usgs.esipfed.org/erddap/index.html)   (Programma voor kust- en mariene geologie)  
*    [STEMMING](https://erddap.observations.voiceoftheocean.org/erddap/index.html)   (Stem van de Oceaan, Zweden)  

Dit is een lijst van enkele organisaties waar ERDDAP™ is geïnstalleerd door een individu of een groep. Het betekent niet dat het individu, de groep, of de organisatie beveelt of onderschrijft ERDDAP .

###  ERDDAP™ wordt aanbevolen binnen NOAA en CNRS{#erddap-is-recommended-within-noaa-and-cnrs} 
 [ NOAA Procedurele richtlijn gegevenstoegang](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations) omvat ERDDAP™ in de lijst van aanbevolen dataservers voor gebruik door groepen binnen NOAA . ERDDAP™ is gunstig vermeld in paragraaf 4.2.3 van de
[Guide de bonnes pratiques sur la gestion des Donnees de la recherche
 (Onderzoeksgegevensbeheer Gids voor beste praktijken) ] (https://mi-gt-donnees.pages.math.unistra.fr/guide/04-traiter.html#deposer-et-structurer-dans-des-plateformes-de-gestion-de-donnees-locales) van het Centre National de la Recherche Scientifique (CNRS) in Frankrijk.

## Diavoorstellingen{#slide-shows} 

Hier zijn enkele PowerPoint dia shows en documenten die Bob Simons heeft gemaakt met betrekking tot ERDDAP .

 **DISCLAIMER: De inhoud en meningen in deze documenten zijn de persoonlijke meningen van Bob Simons en weerspiegelen niet noodzakelijkerwijs enig standpunt van de regering of de National Oceanic and Atmospheric Administration .** 

De vier belangrijkste documenten:

*    [De belangrijkste inleiding tot ERDDAP™   (versie 5) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTalk5.pptx) .
U kunt ook [bekijk deze video van Bob die dit gesprek geeft![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=H541G1XXZrU&t=4) .
*    [Beschrijving van één pagina ERDDAP™   (.pdf) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ERDDAP_OnePage.pdf) 
*    [ ERDDAP : Zware ladingen, rasters, Clusters, Federaties en Cloud Computing](/docs/server-admin/scaling) 
*    [Richtsnoeren van Bob voor gegevensdistributiesystemen](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html) 

Andere presentaties:

*    [2020 EDM: nieuwe functies in ERDDAP™ v2.10](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapFeatures2.10.pptx) 
*    [2020-05-19 DMIT: Data Ingest](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapDataIngest.pptx)   (Of [bekijk deze video van Bob die dit gesprek geeft](https://www.youtube.com/watch?v=9ArYxgwON2k) .) 
*    [2019 IOOS DMAC: Nieuwe functies in ERDDAP™ v2.0](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/Erddapv2Features.pptx) 
*    [2018 Zomer ESEP: Subset In ERDDAP™ ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapSubset2018.pptx) 
*    [2018 Zomer ESEP: JSON Support In ERDDAP™ ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapJson2018.pptx) 
*    [2018 EDM: Een gedistribueerd systeem van webdiensten (Sneller, gemakkelijker, minder duur)   (Of waarom ik vier jaar geleden gelukkig was.) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/10P.04_Simons_DistributedWebServices2018.pptx) 
*    [2018 ERDDAP™ in 2018](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/7A4_Simons_ErddapSession2018.pptx) 
*    [2018 EDM: Nieuwe functies in ERDDAP™ voor afbeelding, audio en videogegevens](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/4D4_Simons_ErddapMediaFiles2018.pptx) 
*    [2018 EDM: UAF en ERDDAP™ Oplossingen voor data-integratie](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/3D3_Simons_DataIntegration2018.pptx) 
*    [2017 EDM: Een snelle introductie tot ERDDAP ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapIntro.pptx) 
*    [2017 EDM en 2017 IOOS: Nieuw of weinig bekend ERDDAP™ Kenmerken (voor gebruikers) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapUserFeatures2017.pptx) 
*    [2017 EDM en 2017 IOOS: Nieuw of weinig bekend ERDDAP™ Kenmerken (voor beheerders) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapAdminFeatures2017.pptx) 
*    [2017 EDM: EML, KNB, en ERDDAP ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/eml_knb_erddap.pptx) 
*    [2017 EDM: Hoe komen gegevens van de bron naar de eindgebruiker? Old School versus New School](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OldSchoolNewSchool.pptx) 
*    [2016 Zomer ESEP: De Grote Foto: PARR, OPeNDAP , ERDDAP™ , en gegevensdistributie](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheBigPicture.pptx) 
*    [2016 EDM: Een en klaar](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OneAndDone.pptx) 
*    [2016 Gov API: volgende generatie Dataservers](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/NextGeneration.pptx) 
*    [2015 Zomer-ESIP: Tabulaire samentrekking](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularAggregation.pptx) 
*    [2014 EDM: Bob's Do's en niet voor Tabulaire gegevens](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsDosDontsTabular.pptx) 
*    [2014 EDM: De ideale gebruikersinterface](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheIdealUserInterface.pptx) 
*    [2014 Zomer ESEP: Tabulaire gegevens](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularData.pptx) 
*    [2013: Behandel In-Situ en Tabulaire gegevens niet zoals rastergegevens](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TablesAndGrids.html) 
*    [2013 EDM: Meer doen met minder](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/DoMoreWithLess.ppt) 
*    [2012 EDM: Richtlijnen voor gegevensdistributiesystemen](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/guidelines3.ppt) 

Presentaties door andere mensen:

*    [Een op FAIR gebaseerd instrument voor het verbeteren van de wereldwijde gegevensuitwisseling![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=kdBTgNEp5TA&ab_channel=GOOSIOC)   
door Kevin O'Brien bij het Global Ocean Observing System (GOOS) Webinar / Observatie Coördinatiegroep (OCG) Serie / 1, november 12, 2020.
*    [Bouwen van uw eigen weerapp met behulp van NOAA Open Data en Jupyter Notebooks![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=MF-WH01Qw0g)   
door Filipe Fernandes en Rich Signell op SciPy 2018, 13 juli 2018.
*    [Gebruik van de OOI ERDDAP ![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=tj4M9hodTG0)   
door Rich Signell, februari 2018.
*    [ESEP Tech Dive: " ERDDAP Lightning Talks"![YouTube](/img/youtube.png)](https://youtu.be/2-ydBByYB0M?t=160)   
Acht 5-minuten praatjes over interessante dingen die mensen doen met ERDDAP Jim Potemra, Conor Delaney, Kevin O'Brien, John Kerfoot, Stephanie Petillo, Charles Carleton en Eli Hunter presenteerden zich op 31 augustus 2017.
*    [Gebruik ERDDAP™ toegang tot tabelgegevens![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=_BwMHRh7CS8)   
door Rich Signell, augustus 2015.
*    [Test met behulp van ERDDAP™ voor gegevens over blauwe koolstof![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=TbOhElC_-qU)   
door Rich Signell, augustus 2015.
*    [Gegevens van ERDDAP™ in NOAA 's GNOME Software![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=18xZoXu1USM) .
In deze video downloadt Rich Signell oceaanstromingen voorspellingsgegevens van ERDDAP™ om een toxische lekkage in de oceaan te modelleren met behulp van [ NOAA 's GNOME software](https://response.restoration.noaa.gov/oil-and-chemical-spills/oil-spills/response-tools/gnome.html)   (Over vijf minuten.) . (Een kleine fout in de video: bij het zoeken naar datasets, niet gebruiken EN tussen zoektermen. Het is impliciet.) Door Rich Signell, 8 april 2011.
