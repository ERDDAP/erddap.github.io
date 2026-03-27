---
title: "ERDDAP™ Documentation"
---
## Seneste ERDDAP™ version{#latest-erddap-version} 

2.30.0, se 2.30.0. [ændringer i dokumentationen](/changes#version-2300) og [download det](https://github.com/ERDDAP/erddap/releases/tag/v2.30.0) .

##  ERDDAP™ oplysninger{#erddap-information} 

 ERDDAP™ er en videnskabelig dataserver, der giver brugerne en enkel, konsekvent måde at downloade delsæt af
gridded og tabelform videnskabelige datasæt i fælles filformater og gøre grafer og kort.
 ERDDAP™ er en fri og åben kilde (Apache og Apache- lignende)   Java Serveret fra NOAA   NMFS   SWFSC Afdelingen for miljøforskning ( ERD ) .

* For at se / bruge et ERDDAP™ installation: [ https://coastwatch.pfeg.noaa.gov/erddap/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/index.html) 
* At komme i gang med en installation læse [installationsguide](/docs/server-admin/deploy-install) .
* For at bidrage med kode se [programmervejledning](/docs/contributing/programmer-guide) .


Nedenfor finder du relevante links til at stille spørgsmål og hvordan du bidrager.
* Gennemgå samtaler og stille spørgsmål på [ https://groups.google.com/g/erddap ](https://groups.google.com/g/erddap) eller [ https://github.com/erddap/erddap/discussions ](https://github.com/erddap/erddap/discussions) 
* Gennemgang og forelæggelse [ https://github.com/erddap/erddap/issues ](https://github.com/erddap/erddap/issues) 
* For at foreslå anmodninger om funktioner, skal du følge denne vejledning: [ ERDDAP Diskussioner # 93 (comment) ](https://github.com/ERDDAP/erddap/discussions/93#discussion-4920427) 


## Søg i flere ERDDAP™ s
Der er to måder at søge flere på ERDDAP™ s for datasæt: [Søg i flere ERDDAP™ s](/SearchMultipleERDDAPs.html) og [ ERDDAP™ Dataset Discovery](http://erddap.com/) .


## Indstil din egen ERDDAP™  {#set-up-your-own-erddap} 

 ERDDAP™ er [Fri og åben kilde](https://en.wikipedia.org/wiki/Free_and_open-source_software) , all - Java   (servlet) , webprogram, der kører i en webapplikationsserver (f.eks. Tomcat (anbefales) , eller Jetty (det virker, men vi støtter det ikke) ) . Denne webside er for det meste for mennesker (" ERDDAP™ administratorer ") der ønsker at oprette deres egne ERDDAP™ installation på deres egen hjemmeside.

At komme i gang med en installation læse [installationsguide](/docs/server-admin/deploy-install) .

### Hvorfor ERDDAP™ til at distribuere dine data?{#why-use-erddap-to-distribute-your-data} 

For den lille indsats for at oprette ERDDAP™ bringer mange fordele.

* Hvis du allerede har en webtjeneste til at distribuere dine data,
du kan sætte op ERDDAP™ at få adgang til dine data via den eksisterende tjeneste.
Eller, du kan sætte op ERDDAP™ at få adgang til dine data direkte fra lokale filer.
* For hvert datasæt, skal du kun skrive en lille del af XML for at fortælle ERDDAP™ hvordan man får adgang til datasættet.
* Når du har ERDDAP™ betjener dine data, slutbrugerne kan:
    * Anmoder om data på forskellige måder ( DAP , WMS , og mere i fremtiden) .
    * Få data svar i forskellige filformater. (Det er nok den største grund&#33;) 
    * Lav grafer og kort. (Alle kan lide smukke billeder.) 
    * Byg andre nyttige og interessante ting på toppen af ERDDAP s webtjenester -- se [ Awesome ERDDAP ™](https://github.com/IrishMarineInstitute/awesome-erddap) liste over awesome ERDDAP -relaterede projekter.

Du kan [tilpasse](/docs/server-admin/deploy-install#customize) er ERDDAP 's udseende så ERDDAP™ afspejler din organisation og passer ind med resten af din hjemmeside.

## Er installationsproceduren hård? Kan jeg gøre det?{#is-the-installation-procedure-hard-can-i-do-it} 

Den første installation tager lidt tid, men det er ikke særlig svært. Du kan godt. Hvis du sidder fast, email mig på erd dot data at noaa dot gov . Jeg vil hjælpe dig.
Eller, du kan deltage i [ ERDDAP™ Google Group / mailingliste](https://groups.google.com/g/erddap) og stille dit spørgsmål der.

## Hvem bruger ERDDAP™  {#who-uses-erddap} 

 ERDDAP™ er blevet installeret af ca. 100 organisationer i mindst 17 lande

 (Australien, Belgien, Canada, Kina, Frankrig, Indien, Irland, Italien, New Zealand, Rusland, Sydafrika, Spanien, Sri Lanka, Sverige, Thailand, Storbritannien, USA) , herunder:

*    [Den Demokratiske Republik Congo](https://apdrc.soest.hawaii.edu/erddap/index.html)   (Asia- Pacific Data- Research Center, International Pacific Research Center) på universitetet i Hawaii (UH)  
*    [BCO-DMO hos WHOI](https://erddap.bco-dmo.org/erddap/index.html)   (Biologisk og kemisk Oceanografi Data Management Office på Woods Hole Oceanographic Institution)  
*    [CanWIN ERDDAP™ ](https://canwinerddap.ad.umanitoba.ca/erddap/index.html)   (Canadian Watershed Information Network) på Centret for Jordobservation (CEOS) , University of Manitoba
*    [DIP](https://erddap.cdip.ucsd.edu/erddap/index.html)   (Kystdatainformationsprogram hos UCSD)  
*    [CNR- ISP](https://data.iadc.cnr.it/erddap/index.html)   (National Research Council of Italy, Institute of Polar Sciences)  
* CSIRO og IMOS (Australiens Commonwealth Scientific and Industrial Research Organisation og det integrerede havobservationssystem) 
*    [DIVER ( NOAA ORR) ](https://pub-data.diver.orr.noaa.gov/erddap/index.html)   ( NOAA Respons- og genoprettelseskontoret)  
*    [EMODnet- fysik](https://erddap.emodnet-physics.eu/erddap/index.html)   (European Marine Observation and Data Network -- Physics)  
*    [GoMRI](https://erddap.griidc.org/erddap/index.html)   (Forskningsinitiativ vedrørende Den Mexicanske Golf)  
*    [Hakai Institute](https://catalogue.hakai.org/erddap/index.html)   (The Hakai Institute on the Central Coast of British Columbia, Canada) 
*    [Tjenesteydelser i forbindelse med højskoleteknologi](https://myhsts.org) , der tilbyder kodning og teknologi uddannelse for studerende og voksne
*    [ICHEC](https://erddap.ichec.ie/erddap/index.html)   (Irish Centre for High- End Computing) 
*    [I NCO IS](https://erddap.incois.gov.in/erddap/index.html)   (Det indiske nationale center for oceaninformation)  
* IRD (Institut de Recherche pour le Développement, Frankrig)   
CNRS (Centre National de la Recherche Scientifique, Frankrig)   
UPMC (Université Pierre et Marie CURIE, Paris Frankrig)   
UCAD (Université Cheikh Anta Diop de Dakar, Sénégal)   
UGB (Université Gaston Berger -- Saint- Louis du Sénégal)   
UFHB (Université Félix BOIGNY, Abidjan, Côte d 'Ivoire)   
IPSL (Institut Pierre Simon Laplace des Sciences de l 'environnement, Paris Frankrig)   
LMI ECLAIRS (Laboratoire Mixte International "Etude du Climat en Afrique de l 'Ouest et de ses Interactions avec l' Environnement Régional, et appui aux services climatiques") 
* FFC (Europa-Kommissionen - Det Fælles Forskningscenter, Den Europæiske Union) 
*    [The Marine Institute](https://erddap.marine.ie/erddap/index.html)   (Irland)  
* Marine Instruments S.A. (Spanien) 
* NIC (Australiens nationale computerinfrastruktur) 
*    [ NOAA Kystur](https://coastwatch.noaa.gov/erddap/index.html)   (central)  
*    [ NOAA Kystur CGOM](https://cwcgom.aoml.noaa.gov/erddap/index.html)   (Caribbean / Mexicanske Golf Node)  
*    [ NOAA Kystur GLERL](https://coastwatch.glerl.noaa.gov/erddap/index.html)   (The Great Lakes Node)  
*    [ NOAA KystWatch vestkyst](https://coastwatch.pfeg.noaa.gov/erddap/index.html) som er placeret sammen med og arbejder med
     [ NOAA   ERD ](https://coastwatch.pfeg.noaa.gov/erddap/index.html)   (Miljøforskningsafdelingen SWFSC af NMFS ) 
*    [ NOAA IOOS-sensorer](https://erddap.sensors.ioos.us/erddap/index.html)   (Integreret havobservationssystem)  
*    [ NOAA IOOS Ce NCO OS](https://erddap.axiomdatascience.com/erddap/index.html)   (Central and Northern California Ocean Observation System, drives af Axiom Data Science)  
*    [ NOAA IOOS GCOOS Atmosfæriske og oceanografiske data: Observeringssystem](https://erddap.gcoos.org/erddap/index.html)   
     [ NOAA IOOS GCOOS Atmosfæriske og oceanografiske data: Historiske samlinger](https://gcoos5.geos.tamu.edu/erddap/index.html)   
     [ NOAA IOOS GCOOS Biologisk og Socioøkonomisk](https://gcoos4.tamu.edu/erddap/index.html)   (Havobservationssystem) 
*    [ NOAA IOOS NERACOOS](http://www.neracoos.org/erddap/index.html)   (Den nordøstlige regionale sammenslutning af kyst- og havobservationssystemer)  
*    [ NOAA IOOS NGDAC](https://data.ioos.us/gliders/erddap/index.html)   (National Glider Dataindsamlingscenter)  
*    NOAA IOOS NANOOS (Northwest Association of Networked Ocean Observing Systems) 
*    [ NOAA IOOS PacIOOS](https://pae-paha.pacioos.hawaii.edu/erddap/index.html)   (Stillehavsøerne Havobservationssystem) på universitetet i Hawaii (UH)  
*    NOAA IOOS SCCOOS (Southern California Coastal Ocean Observering System) 
*    [ NOAA IOOS SECOORA](https://erddap.secoora.org/erddap/index.html)   (Sydøstkystnære Ocean Observation Regional Association)  
*    [ NOAA NCEI](https://www.ncei.noaa.gov/erddap/index.html)   (Nationale centre for miljøinformation)    
*    NOAA NGDC STP (National geofysisk Data Center, Solar -- Terrestrial Fysik) 
*    NOAA   NMFS NEFSC (Northeast Fisheries Science Center) 
*    [ NOAA NOS CO- OPS](https://opendap.co-ops.nos.noaa.gov/erddap/index.html)   (Center for Operationelle Oceanografiske Produkter og Tjenesteydelser)  
*    [ NOAA OSMC](http://osmc.noaa.gov/erddap/index.html)   (Observerer systemovervågningscenter)  
*    [ NOAA PIFSC](https://oceanwatch.pifsc.noaa.gov/erddap/index.html)   (Stillehavet Fiskerividenskab Center)  
*    [ NOAA PMEL](https://data.pmel.noaa.gov/pmel/erddap/index.html) 
*    [ NOAA PolarWatch](https://polarwatch.noaa.gov/erddap/index.html) 
*    [ NOAA UAF](https://upwell.pfeg.noaa.gov/erddap/index.html)   (Ensartede adgangsrammer)  
*    [Ocean Networks Canada](http://dap.onc.uvic.ca/erddap/index.html)  
*    [Ocean Tracking Network](https://members.oceantrack.org/erddap/index.html)  
*    [OOI / Alle data](https://erddap-goldcopy.dataexplorer.oceanobservatories.org/erddap/index.html)   (Havobservationsinitiativet)   
OOI / Ukoblede data
* Princeton, Hydrometeorologi Research Group
* R.Tech Engineering, Frankrig
*    [Rutgers Universitet, Ministeriet for Hav- og Kystvidenskab](https://tds.marine.rutgers.edu/erddap/index.html)   
* San Francisco Estuary Institute
*    [Skrifter Institution of Oceanography, Spray Underwater Gliders](https://spraydata.ucsd.edu/erddap/index.html)  
*    [Smart Atlantic](https://www.smartatlantic.ca/erddap/index.html) Universitetet i Newfoundland
* Sydafrikas miljøovervågningsnet
* Spyglass Technologies
* Stanford University, Hopkins Marine Station
*    [UNESCO IODE](https://erddap.oa.iode.org/erddap/index.html)   (International Oceanografi og information Dataudveksling)  
*    [University of British Columbia, Earth, Ocean & Atmosfære Sciences Department](https://salishsea.eos.ubc.ca/erddap/index.html)  
*    [University of California på Davis, Bodega Marine Laboratory](http://bmlsc.ucdavis.edu:8080/erddap/index.html)  
*    [University of Delaware, Satellit Receiving Station](https://basin.ceoe.udel.edu/erddap/index.html)  
* University of Washington, Anvendt Fysik Laboratorium
*    [USGS CMGP](https://geoport.usgs.esipfed.org/erddap/index.html)   (Kyst- og havgeologiprogram)  
*    [VOTO](https://erddap.observations.voiceoftheocean.org/erddap/index.html)   (Havets stemme, Sverige)  

Dette er en liste over blot nogle af de organisationer, hvor ERDDAP™ er blevet installeret af en person eller en gruppe. Det betyder ikke, at personen, gruppen eller organisationen anbefaler eller støtter ERDDAP .

###  ERDDAP™ anbefales indenfor NOAA og CNRS{#erddap-is-recommended-within-noaa-and-cnrs} 
 [ NOAA 's Data Access Proceduredirektiv](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations) omfatter ERDDAP™ i sin liste over anbefalede dataservere til brug for grupper i NOAA . ERDDAP™ er positivt nævnt i afsnit 4.2.3 i
[Guide de bonnes pratiques sur la gestion des données de la recherche
 (Forvaltning af forskningsdata Guide til bedste praksis) ] ( https://mi-gt-donnees.pages.math.unistra.fr/guide/04-traiter.html#deposer-et-structurer-dans-des-plateformes-de-gestion-de-donnees-locales ) af Centre National de la Recherche Scientifique (CNRS) i Frankrig.

## Slide shows{#slide-shows} 

Her er nogle PowerPoint slide shows og dokumenter, som Bob Simons har skabt i forbindelse med ERDDAP .

 **DISCLAIMER: Indholdet og synspunkterne i disse dokumenter er Bob Simons personlige meninger og afspejler ikke nødvendigvis regeringens eller National Oceanic and Atmospheric Administration .** 

De fire vigtigste dokumenter:

*    [Hovedindledningen til ERDDAP™   (version 5) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTalk5.pptx) .
Du kan også [Se denne video af Bob giver denne tale![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=H541G1XXZrU&t=4) .
*    [En enkelt side Beskrivelse af ERDDAP™   (.pdf) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ERDDAP_OnePage.pdf) 
*    [ ERDDAP : Heavy Loads, Grids, klynger, føderationer, og Cloud Computing](/docs/server-admin/scaling) 
*    [Bobs retningslinjer for datadistributionssystemer](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html) 

Andre præsentationer:

*    [2020 EDM: nye funktioner i ERDDAP™ v2.10](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapFeatures2.10.pptx) 
*    [2020- 05- 19 DMIT: Dataindeks](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapDataIngest.pptx)   (Eller [Se denne video af Bob giver denne tale](https://www.youtube.com/watch?v=9ArYxgwON2k) .) 
*    [2019 IOOS DMAC: nye funktioner i ERDDAP™ v2, 0](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/Erddapv2Features.pptx) 
*    [2018 Summer ESIP: Undersætning i ERDDAP™ ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapSubset2018.pptx) 
*    [2018 Summer ESIP: JSON Support In ERDDAP™ ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapJson2018.pptx) 
*    [2018 EDM: Et distribueret system af webtjenester (Hurtigere, lettere, mindre dyrt)   (Eller hvorfor jeg var lykkelig for fire år siden.) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/10P.04_Simons_DistributedWebServices2018.pptx) 
*    [2018 EDM: ERDDAP™ i 2018](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/7A4_Simons_ErddapSession2018.pptx) 
*    [2018 EDM: nye funktioner i ERDDAP™ til billed-, lyd- og videodata](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/4D4_Simons_ErddapMediaFiles2018.pptx) 
*    [2018 EDM: UAF og ERDDAP™ Løsninger til dataintegration](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/3D3_Simons_DataIntegration2018.pptx) 
*    [2017 EDM: En hurtig introduktion til ERDDAP ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapIntro.pptx) 
*    [2017 EDM og 2017 IOOS: Ny eller lille kendt ERDDAP™ Funktioner (for brugere) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapUserFeatures2017.pptx) 
*    [2017 EDM og 2017 IOOS: Ny eller lille kendt ERDDAP™ Funktioner (for administratorer) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapAdminFeatures2017.pptx) 
*    [2017 EDM: EML, KNB, og ERDDAP ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/eml_knb_erddap.pptx) 
*    [2017 EDM: Hvordan kommer data fra kilden til slutbrugeren? Old School versus New School](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OldSchoolNewSchool.pptx) 
*    [2016 Summer ESIP: Det store billede: PARR, OPeNDAP , ERDDAP™ og datadistribution](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheBigPicture.pptx) 
*    [2016 EDM: En og færdig](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OneAndDone.pptx) 
*    [2016 Gov API: Næste generation Dataservere](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/NextGeneration.pptx) 
*    [2015 Sommer ESIP: Tabelaggregering](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularAggregation.pptx) 
*    [2014 EDM: Bob 's Do' s and Don 't for Tabular Data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsDosDontsTabular.pptx) 
*    [2014 EDM: Den ideelle brugergrænseflade](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheIdealUserInterface.pptx) 
*    [2014 Sommer ESIP: Tabulære data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularData.pptx) 
*    [2013: Behandl ikke In- Situ- og tabeldata som Gridded Data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TablesAndGrids.html) 
*    [2013 EDM: Gør mere med mindre](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/DoMoreWithLess.ppt) 
*    [2012 EDM: Retningslinjer for datadistributionssystemer](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/guidelines3.ppt) 

Præsentationer af andre mennesker:

*    [Et FAIR-baseret værktøj til forbedring af den globale datadeling![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=kdBTgNEp5TA&ab_channel=GOOSIOC)   
af Kevin O 'Brien ved det globale havobservationssystem (GOOS) Webinar / Observationskoordineringsgruppe (OKG) Serie 1, 12. november 2020.
*    [Opbygning af din egen vejr app bruger NOAA Åbne data og Jupyter Notebooks![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=MF-WH01Qw0g)   
ved Filipe Fernandes og Rich Signell på SciPy 2018, 13. juli 2018.
*    [Brug af OOI ERDDAP ![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=tj4M9hodTG0)   
ved Rich Signell, februar 2018.
*    [ESIP Tech Dive: " ERDDAP Lyn taler "![YouTube](/img/youtube.png)](https://youtu.be/2-ydBByYB0M?t=160)   
Otte 5-minutter taler om interessante ting folk gør med ERDDAP ved Jenn Sevadjian, Jim Potemra, Conor Delaney, Kevin O 'Brien, John Kerfoot, Stephanie Petillo, Charles Carleton og Eli Hunter præsenteret som en ESIP Tech Dive den 31. august 2017.
*    [Brug ERDDAP™ til adgang til tabeldata![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=_BwMHRh7CS8)   
ved Rich Signell, august 2015.
*    [Test med anvendelse ERDDAP™ for Blue Carbon Data![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=TbOhElC_-qU)   
ved Rich Signell, august 2015.
*    [Brug af data fra ERDDAP™ er NOAA 's GNOME Software![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=18xZoXu1USM) .
I denne video, Rich Signell downloads ocean strømme prognose data fra ERDDAP™ til at modellere et giftigt udslip i havet ved hjælp af [ NOAA 's GNOME software](https://response.restoration.noaa.gov/oil-and-chemical-spills/oil-spills/response-tools/gnome.html)   (om 5 minutter&#33;) . (En lille fejl i videoen: når du søger efter datasæt, skal du ikke bruge OG mellem søgeord. Det er implicit.) Af Rich Signell, 8. april 2011.
