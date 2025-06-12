---
title: "ERDDAP™ Documentation"
---
## NyesteERDDAP™version version version{#latest-erddap-version} 

2.27.0, se den[Ændringer af dokumentation](/changes#version-2270)og og og[Download den](https://github.com/ERDDAP/erddap/releases/tag/v2.27.0).

## ERDDAP™Oplysninger om information{#erddap-information} 

ERDDAP™er en videnskabelig dataserver, der giver brugerne en enkel, konsekvent måde at downloade subsets af
gitterede og tabulære videnskabelige datasæt i almindelige filformater og lave grafer og kort.
ERDDAP™er en gratis og åben kilde (Apache og Apache-lignende)  JavaServlet fraNOAA NMFS SWFSCMiljøforskningsdivision (ERD) .

* For at se/bruge enERDDAP™installation:[ https://coastwatch.pfeg.noaa.gov/erddap/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/index.html)
* For at komme i gang med en installation læs[installationsvejledning](/docs/server-admin/deploy-install).
* At bidrage kode se[programmørens guide](/docs/contributing/programmer-guide).


Nedenfor finder du relevante links til at stille spørgsmål og hvordan du bidrager.
* Gennemgå samtaler og stille spørgsmål på[ https://groups.google.com/g/erddap ](https://groups.google.com/g/erddap)eller på[ https://github.com/erddap/erddap/discussions ](https://github.com/erddap/erddap/discussions)
* Gennemgå og indsende spørgsmål til[ https://github.com/erddap/erddap/issues ](https://github.com/erddap/erddap/issues)
* Følg denne vejledning for at foreslå funktioner:[ERDDAPDiskussioner #93 (Kommentarer til kommentar) ](https://github.com/ERDDAP/erddap/discussions/93#discussion-4920427)


## Søg efter flereERDDAP™s s s
Der er to måder at søge på flereERDDAP™s til datasæt:[Søg efter flereERDDAP™s s s](/SearchMultipleERDDAPs.html)og og og[ERDDAP™Datasæt Discovery](http://erddap.com/).


## Opsæt din egenERDDAP™ {#set-up-your-own-erddap} 

ERDDAP™er en[Gratis og åben kilde](https://en.wikipedia.org/wiki/Free_and_open-source_software), alleJava  (Leverandør af:) , webapplikation, der kører i en webserver (for eksempel Tomcat (anbefalet anbefalet) eller Jetty (det virker, men vi understøtter ikke det) ) . Denne webside er for det meste for folk (" " " "ERDDAP™administratorer") der ønsker at opsætte deres egneERDDAP™installation på deres eget websted.

For at komme i gang med en installation læs[installationsvejledning](/docs/server-admin/deploy-install).

### Hvorfor brugeERDDAP™til at distribuere dine data?{#why-use-erddap-to-distribute-your-data} 

Fordi den lille indsats at sætte opERDDAP™bringer mange fordele.

* Hvis du allerede har en webtjeneste til at distribuere dine data,
du kan opretteERDDAP™at få adgang til dine data via den eksisterende tjeneste.
Eller du kan opsætteERDDAP™at få adgang til dine data direkte fra lokale filer.
* For hvert datasæt skal du kun skrive en lille smule XML for at fortælleERDDAP™Sådan får du adgang til datasættet.
* Når du harERDDAP™at betjene dine data, slutbrugere kan:
    * Anmod om data på forskellige måder (DAP,WMS, og mere i fremtiden) .
    * Få data svar i forskellige filformater. (Det er nok den største grund&#33;) 
    * Lav grafer og kort. (Alle kan lide smukke billeder.) 
    * Byg andre nyttige og interessante ting på toppen afERDDAP's webtjenester - se de[Awesome ERDDAPTM TM TM](https://github.com/IrishMarineInstitute/awesome-erddap)liste over fantastiskeERDDAP- relaterede projekter.

Du kan[Tilpas tilpasning](/docs/server-admin/deploy-install#customize)Dit din egenERDDAP's udseende såERDDAP™afspejler din organisation og passer i resten af din hjemmeside.

## Er installationsproceduren hård? Kan jeg gøre det?{#is-the-installation-procedure-hard-can-i-do-it} 

Den oprindelige installation tager noget tid, men det er ikke meget svært. Du kan gøre det. Hvis du sidder fast, mail mig påerd dot data at noaa dot gov. Jeg vil hjælpe dig.
Eller du kan tilmelde dig[ERDDAP™Google Group/ Mailing List](https://groups.google.com/g/erddap)og post dit spørgsmål der.

## Hvem brugerERDDAP™ {#who-uses-erddap} 

ERDDAP™er blevet installeret af ca. 100 organisationer i mindst 17 lande

 (Australien, Belgien, Canada, Kina, Frankrig, Indien, Irland, Italien, New Zealand, Rusland, Sydafrika, Spanien, Sri Lanka, Sverige, Thailand, Storbritannien, USA) , herunder:

*   [APDRC](https://apdrc.soest.hawaii.edu/erddap/index.html)  (Hoteller i nærheden af International Pacific Research Center) på Hawaii Universitet (UH)  
*   [BCO-DMO på WHOI](https://erddap.bco-dmo.org/erddap/index.html)  (Biologisk og kemisk Oceanografi Data Management Office på Woods Hole Oceanographic Institution)  
*   [CanWINERDDAP™](https://canwinerddap.ad.umanitoba.ca/erddap/index.html)  (Oplysninger om canadiske vand) Hoteller i nærheden af Center for Earth Observation Science (CEOS) Hoteller i nærheden af University of Manitoba
*   [CDIP](https://erddap.cdip.ucsd.edu/erddap/index.html)  (Oplysninger om Coastal Data Program på UCSD)  
*   [CNR-ISP](https://data.iadc.cnr.it/erddap/index.html)  (Hoteller i nærheden af Institute of Polar Sciences)  
* CSIRO og IMOS (Australiens videnskabelige og industrielle forskningsorganisation og den integrerede marine Observeringssystem) 
*   [DIVER (NOAAORR) ](https://pub-data.diver.orr.noaa.gov/erddap/index.html)  (NOAAKontor af svar og restaurering)  
*   [EMODnet Fysik](https://erddap.emodnet-physics.eu/erddap/index.html)  (Det Europæiske Havobservation og Datanetværk - Fysik)  
*   [GoMRI](https://erddap.griidc.org/erddap/index.html)  (Hoteller i nærheden af Gulf of Mexico Research Initiative)  
*   [Hoteller i nærheden af Hakai Institute](https://catalogue.hakai.org/erddap/index.html)  (Hoteller i nærheden af The Hakai Institute on te Central Coast of British Columbia) 
*   [Højskoleteknologi](https://myhsts.org), som tilbyder kodning og teknologitræning for studerende og voksne
*   [ICHEC](https://erddap.ichec.ie/erddap/index.html)  (Hoteller i nærheden af Irish Centre for High-End Computing) 
*   [JegNCOIS](https://erddap.incois.gov.in/erddap/index.html)  (Hoteller i nærheden af Indian National Centre for Ocean Information Services)  
* IRD (Institut de Recherche pour le Développement, Frankrig)   
CNRS (Hoteller i nærheden af Centre National de la Recherche Scientifique, Frankrig)   
UPMC (Hoteller i nærheden af Université Pierre et Marie CURIE, Paris, Frankrig Frankrig)   
UCAD (Hoteller i nærheden af Université Cheikh Anta Diop de Dakar)   
UGB (Hoteller i nærheden af Université Gaston Berger -- Saint-Louis du Sénégal)   
UFHB (Hoteller i nærheden af Université Félix Hoteller i nærheden af Abidjan, Côte d'Ivoire)   
IPSL (Institut Pierre Simon Laplace des sciences de l'environnement, Paris, Frankrig Frankrig)   
LMI ECLAIRS (Hoteller i nærheden af Laboratoire Mixte International «Etude du Climat en Afrique de l’Ouest et de ses Interactions avec l’Environnement, en appui aux tjenester klimaiques») 
* JRC (Europa-Kommissionen - Joint Research Centre, EU) 
*   [Hoteller i nærheden af The Marine Institute](https://erddap.marine.ie/erddap/index.html)  (Irland Irland)  
* Marineinstrumenter S.A. (Spanien Spanien Spanien) 
* NCI (Hoteller i nærheden af Australien's National Computational Infrastructure) 
*   [NOAABilleder af CoastWatch](https://coastwatch.noaa.gov/erddap/index.html)  (centralt centralt centralt centralt)  
*   [NOAABilleder af CoastWatch CGOM](https://cwcgom.aoml.noaa.gov/erddap/index.html)  (Caribisk/Gulf af Mexico Node)  
*   [NOAABilleder af CoastWatch GLERL](https://coastwatch.glerl.noaa.gov/erddap/index.html)  (Spændende søer Node)  
*   [NOAAHoteller i nærheden af CoastWatch West Coast](https://coastwatch.pfeg.noaa.gov/erddap/index.html)som er sammen med og arbejder med
    [NOAA ERD](https://coastwatch.pfeg.noaa.gov/erddap/index.html)  (MiljøforskningsdivisionSWFSCafNMFS) 
*   [NOAAIOOS Sensorer](https://erddap.sensors.ioos.us/erddap/index.html)  (Integreret Ocean Observeringssystem)  
*   [NOAAIOOS CeNCOOS OS OS](https://erddap.axiomdatascience.com/erddap/index.html)  (Central og Northern California Ocean Observing System, der drives af Axiom Data Science)  
*   [NOAAIOOS GCOOS Atmospheric og Oceanographic Data: Observering System](https://erddap.gcoos.org/erddap/index.html)  
    [NOAAIOOS GCOOS Atmospheric og Oceanographic Data: Historiske samlinger](https://gcoos5.geos.tamu.edu/erddap/index.html)  
    [NOAAIOOS GCOOS Biological and Socioøkonomier](https://gcoos4.tamu.edu/erddap/index.html)  (Hoteller i nærheden af Gulf Coast Ocean Observing System) 
*   [NOAAI nærheden af NERACOOS](http://www.neracoos.org/erddap/index.html)  (Hoteller i nærheden af Northeastern Regional Association of Coastal and Ocean)  
*   [NOAAIOOS NGDAC](https://data.ioos.us/gliders/erddap/index.html)  (National Glider Oplysninger om databeskyttelse)  
*   NOAAIOOS NANOOS (Hoteller i nærheden af Northwest Association of Networked Ocean) 
*   [NOAAIOOS PacIOOS](https://pae-paha.pacioos.hawaii.edu/erddap/index.html)  (I nærheden af Pacific Islands Ocean Observing System) på Hawaii Universitet (UH)  
*   NOAAI nærheden af SCCOOS (Hoteller i nærheden af Southern California Coastal Ocean) 
*   [NOAAIOOS SECOORA](https://erddap.secoora.org/erddap/index.html)  (Hoteller i nærheden af Southeast Coastal Ocean)  
*   [NOAANCEI](https://www.ncei.noaa.gov/erddap/index.html)  (National Centers for Miljøinformation)    
*   NOAANGDC STP (National Geofysik Data Center, Solar -- Terrestrial Fysik) 
*   NOAA NMFSNEFSC (Hoteller i nærheden af Northeast Fisheries Science Center) 
*   [NOAANOS CO-OPS](https://opendap.co-ops.nos.noaa.gov/erddap/index.html)  (Center for Operational Oceanographic Products and Services)  
*   [NOAAOSMC](http://osmc.noaa.gov/erddap/index.html)  (Kontrol af systemovervågning Center)  
*   [NOAAPIFSC](https://oceanwatch.pifsc.noaa.gov/erddap/index.html)  (Hoteller i nærheden af Pacific Islands Fishing Science Center)  
*   [NOAAPMEL](https://data.pmel.noaa.gov/pmel/erddap/index.html)
*   [NOAAPolarWatch](https://polarwatch.noaa.gov/erddap/index.html)
*   [NOAAUAF](https://upwell.pfeg.noaa.gov/erddap/index.html)  (Uificeret adgangsramme)  
*   [Hoteller i nærheden af Ocean Networks Canada](http://dap.onc.uvic.ca/erddap/index.html) 
*   [Ocean Tracking Network](https://members.oceantrack.org/erddap/index.html) 
*   [OOI / Alle data](https://erddap-goldcopy.dataexplorer.oceanobservatories.org/erddap/index.html)  (Ocean Observatorer Initiative)   
OOI / Uforarbejdede data
* Hoteller i nærheden af Hydrometeorology Research Group
* R.Tech Engineering, Frankrig
*   [Hoteller i nærheden af Department of Marine and Coastal Sciences](https://tds.marine.rutgers.edu/erddap/index.html)  
* Hoteller i nærheden af San Francisco Estuary Institute
*   [Hoteller i nærheden af Spray Underwater Gliders](https://spraydata.ucsd.edu/erddap/index.html) 
*   [Smart Atlantic](https://www.smartatlantic.ca/erddap/index.html)Hoteller i nærheden af Memorial University of Newfoundland
* Sydafrikansk miljøobservation Netværk
* Spyglasteknologier
* Hoteller i nærheden af Hopkins Marine Station
*   [UNESCO IODE](https://erddap.oa.iode.org/erddap/index.html)  (International Oceanographic and Information Dataudveksling)  
*   [University of British Columbia, Earth, Ocean & Atmospheric Institut for Videnskab](https://salishsea.eos.ubc.ca/erddap/index.html) 
*   [Hoteller i nærheden af University of California at Davis Hoteller i nærheden af Bodega Marine Laboratory](http://bmlsc.ucdavis.edu:8080/erddap/index.html) 
*   [Hoteller i nærheden af University of Delaware](https://basin.ceoe.udel.edu/erddap/index.html) 
* Hoteller i nærheden af University of Washington
*   [I nærheden af USGS CMGP](https://geoport.usgs.esipfed.org/erddap/index.html)  (Coastal og Marine Geology Program)  
*   [VOTO](https://erddap.observations.voiceoftheocean.org/erddap/index.html)  (Stemme af havet, Sverige)  

Dette er en liste over blot nogle af de organisationer, hvorERDDAP™er blevet installeret af en eller anden gruppe. Det betyder ikke, at den enkelte, gruppen eller organisationen anbefaler eller godkender eller godkenderERDDAP.

### ERDDAP™anbefales inden forNOAAog CNRS{#erddap-is-recommended-within-noaa-and-cnrs} 
[NOAAData Access Proceduraldirektivet](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations)InkluderetERDDAP™på listen over anbefalede dataservere til brug af grupper inden forNOAA.ERDDAP™anses for at være nævnt i afsnit 4.2.3 af
[Guide de bonnes pratiques sur la gestion des données de la recherche
 (Forskningsdatastyring Bedste praksisvejledning) Særkegle ( https://mi-gt-donnees.pages.math.unistra.fr/guide/04-traiter.html#deposer-et-structurer-dans-des-plateformes-de-gestion-de-donnees-locales ) Hoteller i nærheden af National de la Recherche Scientifique (CNRS) i Frankrig.

## Slideshows{#slide-shows} 

Her er nogle PowerPoint lysbilledshows og dokumenter, som Bob Simons har skabt relateret tilERDDAP.

 **DISCLAIMER: Indholdet og meninger udtrykt i disse dokumenter er Bob Simons personlige meninger og afspejler ikke nødvendigvis enhver holdning til regeringen eller regeringenNational Oceanic and Atmospheric Administration.** 

De fire hoveddokumenter:

*   [Den vigtigste introduktion tilERDDAP™  (version 5) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTalk5.pptx).
Du kan også[se denne video af Bob give denne tale![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=H541G1XXZrU&t=4).
*   [En side Beskrivelse afERDDAP™  (.pdf) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ERDDAP_OnePage.pdf)
*   [ERDDAP: Heavy Loads, Grids, Clusters, Federations og Cloud Computing](/docs/server-admin/scaling)
*   [Vejledning til datadistributionssystemer](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html)

Andre præsentationer:

*   [2020 EDM: Nye funktioner iERDDAP™v2.10](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapFeatures2.10.pptx)
*   [2020-05-19 DMIT: Data Ingest](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapDataIngest.pptx)  (Eller[se denne video af Bob give denne tale](https://www.youtube.com/watch?v=9ArYxgwON2k).) 
*   [2019 IOOS DMAC: Nye funktioner iERDDAP™v2.0](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/Erddapv2Features.pptx)
*   [2018 2018 Sommer ESIP: Subsetting InERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapSubset2018.pptx)
*   [2018 2018 Sommer ESIP: JSON Support InERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapJson2018.pptx)
*   [2018 EDM: Et distribueret system af webtjenester (Hurtigere, nemmere, mindre eksplosiv)   (Eller hvorfor jeg var glad for 4 år siden.) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/10P.04_Simons_DistributedWebServices2018.pptx)
*   [2018 EDM:ERDDAP™i 2018](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/7A4_Simons_ErddapSession2018.pptx)
*   [2018 EDM: Nye funktioner iERDDAP™til billede, lyd og videodata](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/4D4_Simons_ErddapMediaFiles2018.pptx)
*   [2018 EDM: UAF ogERDDAP™Løsninger til dataintegration](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/3D3_Simons_DataIntegration2018.pptx)
*   [2017 EDM: En hurtig introduktion tilERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapIntro.pptx)
*   [2017 EDM og 2017 IOOS: Ny eller lille KnownERDDAP™Egenskaber (Til brugere) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapUserFeatures2017.pptx)
*   [2017 EDM og 2017 IOOS: Ny eller lille KnownERDDAP™Egenskaber (for administratorer) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapAdminFeatures2017.pptx)
*   [2017 EDM: EML, KNB ogERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/eml_knb_erddap.pptx)
*   [2017 2017 EDM: Hvordan får data fra kilden til slutbrugeren? Gamle Skole versus New School](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OldSchoolNewSchool.pptx)
*   [2016 2016 2016 2016 Sommer ESIP: The Big Picture: PARR,OPeNDAP,ERDDAP™, og datadistribution](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheBigPicture.pptx)
*   [2016 EDM: En og Done](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OneAndDone.pptx)
*   [2016 2016 2016 2016 Gov API: Næste generation Dataservere](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/NextGeneration.pptx)
*   [2015 2015 2015 Sommer ESIP: Tabular Aggregation](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularAggregation.pptx)
*   [2014 EDM: Bob's Do's og Don't for Tabular Data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsDosDontsTabular.pptx)
*   [2014 EDM: Den ideelle brugergrænseflade](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheIdealUserInterface.pptx)
*   [2014 2014 Sommer ESIP: Tabular Data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularData.pptx)
*   [2013: Behandl ikke In-Situ og Tabular Data som Gridded Data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TablesAndGrids.html)
*   [2013 EDM: Gør mere med mindre](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/DoMoreWithLess.ppt)
*   [2012 EDM: Vejledning til datadistributionssystemer](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/guidelines3.ppt)

Præsentationer af andre mennesker:

*   [Et FAIR-baseret værktøj til forbedring af Global Datadeling![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=kdBTgNEp5TA&ab_channel=GOOSIOC)  
af Kevin O'Brien på Global Ocean Observing System (GOOS) Webinar / Observation Coordination Group (OCG) Serie / 1, november 12, 2020.
*   [Byg din egen Weather App ved hjælp afNOAAÅbne data og Jupyter Notebooks![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=MF-WH01Qw0g)  
af Filipe Fernandes og Rich Signell på SciPy 2018, juli 13, 2018.
*   [Brug af OOIERDDAP![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=tj4M9hodTG0)  
af Rich Signell, februar 2018.
*   [ESIP Tech Dive: "ERDDAPLightning Talks"![YouTube](/img/youtube.png)](https://youtu.be/2-ydBByYB0M?t=160)  
Otte 5-Min Talks Om interessante ting folk gør medERDDAPaf Jenn Sevadjian, Jim Potemra, Conor Delaney, Kevin O'Brien, John Kerfoot, Stephanie Petillo, Charles Carleton og Hunter præsenteret som en ESIP Tech Dive den 31. august 2017.
*   [Brug af brugERDDAP™Til Access Tabular Data![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=_BwMHRh7CS8)  
af Rich Signell, august 2015.
*   [Test ved hjælp af testERDDAP™for Blue Carbon Data![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=TbOhElC_-qU)  
af Rich Signell, august 2015.
*   [Brug af data fraERDDAP™i in in in inNOAA'sGNOMESoftware software![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=18xZoXu1USM).
I denne video downloader Rich Signell havstrømsprognose data fraERDDAP™til at modellere et giftigt spild i havet ved hjælp af[NOAA'sGNOMEsoftware software software](https://response.restoration.noaa.gov/oil-and-chemical-spills/oil-spills/response-tools/gnome.html)  (på 5 minutter&#33;) . (En lille fejl i videoen: når du søger efter datasæt, skal du ikke bruge og mellem søgetermer. Det er implicit.) Af Rich Signell, den 8. april 2011.
