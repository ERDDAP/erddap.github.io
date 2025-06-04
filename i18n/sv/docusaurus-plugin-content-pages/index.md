---
title: "ERDDAP™ Documentation"
---
## SenasteERDDAP™version version version{#latest-erddap-version} 

2.27.0, se[Ändra dokumentation](/changes#version-2270)och[Ladda ner den](https://github.com/ERDDAP/erddap/releases/tag/v2.27.0).

## ERDDAP™Information om information{#erddap-information} 

ERDDAP™är en vetenskaplig dataserver som ger användarna ett enkelt och konsekvent sätt att ladda ner delmängder
gallrade och tabula vetenskapliga datamängder i gemensamma filformat och göra grafer och kartor.
ERDDAP™är en fri och öppen källa (Apache och Apache-liknande)  JavaServlet frånNOAA NMFS SWFSCMiljöforskningsavdelning (ERD) .

* För att se/använda enERDDAP™installation:[ https://coastwatch.pfeg.noaa.gov/erddap/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/index.html)
* För att komma igång med en installationsläsning[Deploy install guide](/docs/server-admin/deploy-install).
* För att bidra med kod se[programmerarens guide](/docs/contributing/programmer-guide).


Nedan hittar du relevanta länkar för att ställa frågor och hur man bidrar.
* Granska samtal och ställa frågor på[ https://groups.google.com/g/erddap ](https://groups.google.com/g/erddap)eller[ https://github.com/erddap/erddap/discussions ](https://github.com/erddap/erddap/discussions)
* Granska och skicka frågor till[ https://github.com/erddap/erddap/issues ](https://github.com/erddap/erddap/issues)
* För att föreslå funktionsförfrågningar, följ denna vägledning:[ERDDAPDiskussioner #93 (kommentar) ](https://github.com/ERDDAP/erddap/discussions/93#discussion-4920427)


## Sök MultipleERDDAP™s
Det finns två sätt att söka fleraERDDAP™s för dataset:[Sök MultipleERDDAP™s](/SearchMultipleERDDAPs.html)och[ERDDAP™Dataset Discovery](http://erddap.com/).


## Ställ in din egenERDDAP™ {#set-up-your-own-erddap} 

ERDDAP™är en[Fri och öppen källa](https://en.wikipedia.org/wiki/Free_and_open-source_software)Allt-Java  (Servlet) webbapplikation som körs i en webbapplikationsserver (Till exempel Tomcat (rekommenderas) eller Jetty (Det fungerar, men vi stöder inte det) ) . Denna webbsida är mest för människor ("ERDDAP™administratörer") som vill sätta upp sin egenERDDAP™installation på sin egen hemsida.

För att komma igång med en installationsläsning[Deploy install guide](/docs/server-admin/deploy-install).

### Varför användaERDDAP™för att distribuera dina data?{#why-use-erddap-to-distribute-your-data} 

Eftersom den lilla ansträngningen att inrättaERDDAP™ger många fördelar.

* Om du redan har en webbtjänst för att distribuera dina data,
Du kan ställa inERDDAP™för att komma åt dina data via den befintliga tjänsten.
Eller så kan du ställa inERDDAP™för att komma åt dina data direkt från lokala filer.
* För varje datamängd behöver du bara skriva en liten bit av XML för att berättaERDDAP™hur man får tillgång till dataset.
* När du harERDDAP™Servera dina data, slutanvändare kan:
    * Begär data på olika sätt (DAP,WMSoch mer i framtiden) .
    * Få dataresponsen i olika filformat. (Det är förmodligen den största anledningen&#33;) 
    * Gör grafer och kartor. (Alla gillar vackra bilder.) 
    * Bygg andra användbara och intressanta saker ovanpåERDDAPwebbtjänster - se[Awesome ERDDAPTM](https://github.com/IrishMarineInstitute/awesome-erddap)Lista över awesomeERDDAP-relaterade projekt.

Du kan[anpassa](/docs/server-admin/deploy-install#customize)Dina dinaERDDAPutseende såERDDAP™reflekterar din organisation och passar in med resten av din webbplats.

## Är installationsproceduren hård? Kan jag göra det?{#is-the-installation-procedure-hard-can-i-do-it} 

Den första installationen tar lite tid, men det är inte mycket svårt. Du kan göra det. Om du fastnar, maila mig påerd dot data at noaa dot gov. Jag kommer att hjälpa dig.
Eller så kan du gå med i[ERDDAP™Google Group / Mailing List](https://groups.google.com/g/erddap)och posta din fråga där.

## Vem använderERDDAP™ {#who-uses-erddap} 

ERDDAP™har installerats av cirka 100 organisationer i minst 17 länder

 (Australien, Belgien, Kanada, Kina, Frankrike, Indien, Irland, Italien, Nya Zeeland, Ryssland, Sydafrika, Spanien, Sri Lanka, Sverige, Thailand, Storbritannien, USA) inklusive:

*   [APDRC](https://apdrc.soest.hawaii.edu/erddap/index.html)  (Asia-Pacific Data-Research Center, International Pacific Research Center) vid universitetet i Hawaii (UH)  
*   [BCO-DMO på WHOI](https://erddap.bco-dmo.org/erddap/index.html)  (Biologisk och kemisk oceanografi Data Management Office på Woods Hole Oceanografi Institution)  
*   [CanWINERDDAP™](https://canwinerddap.ad.umanitoba.ca/erddap/index.html)  (Kanadensiska Watershed Information Network) På Center for Earth Observation Science (VDS) University of Manitoba
*   [CDIP](https://erddap.cdip.ucsd.edu/erddap/index.html)  (Kustdatainformationsprogram vid UCSD)  
*   [CNR-ISP](https://data.iadc.cnr.it/erddap/index.html)  (National Research Council of Italy, Institute of Polar Sciences)  
* CSIRO och IMOS (Australiens Commonwealth Scientific and Industrial Research Organisation och det integrerade marina observationssystemet) 
*   [DIVER (NOAAORR) ](https://pub-data.diver.orr.noaa.gov/erddap/index.html)  (NOAAOffice of Response och Restoration)  
*   [EMODnet fysik](https://erddap.emodnet-physics.eu/erddap/index.html)  (European Marine Observation and Data Network – Fysik)  
*   [GoMRI](https://erddap.griidc.org/erddap/index.html)  (Mexikanska golfen forskningsinitiativ)  
*   [Hakai Institute](https://catalogue.hakai.org/erddap/index.html)  (Hakai-institutet på Centralkusten i British Columbia, Kanada) 
*   [High School Technology Services](https://myhsts.org), som erbjuder kodning och teknikutbildning för studenter och vuxna
*   [ICHEC](https://erddap.ichec.ie/erddap/index.html)  (Irländskt centrum för avancerad dator) 
*   [Jag är jagNCOÄr](https://erddap.incois.gov.in/erddap/index.html)  (Indian National Centre for Ocean Information Services)  
* IRD (Institut de Recherche häller Développement, Frankrike)   
CNRS (Centre National de la Recherche Scientifique, Frankrike)   
UPMC (Université Pierre et Marie Kurie, Paris, Frankrike Frankrike)   
UCAD (Université Cheikh Anta Diop de Dakar, Sénégal)   
UGB (Université Gaston Berger - Saint-Louis du Sénégal)   
UFHB (Université Félix HOUPHOUET-BOIGNY, Abidjan, Côte d'Ivoire)   
IPSL (Institut Pierre Simon Laplace des sciences de l'environnement, Paris, Frankrike Frankrike)   
LMI ECLAIRS (Laboratoire Mixte International "Etude du Climat en Afrique de l'Ouest et de ses Interactions avec l'Environnement Régional, et appui aux services climatiques") 
* JRC (Europeiska kommissionen - Gemensamt forskningscentrum, Europeiska unionen) 
*   [Marine Institute](https://erddap.marine.ie/erddap/index.html)  (Irland)  
* Marine Instruments S.A. (Spanien Spanien) 
* NCI (Australiens nationella beräkningsinfrastruktur) 
*   [NOAACoastWatch](https://coastwatch.noaa.gov/erddap/index.html)  (centralt centralt centralt)  
*   [NOAACoastWatch CGOM](https://cwcgom.aoml.noaa.gov/erddap/index.html)  (Karibien/Gulf of Mexico Node)  
*   [NOAACoastWatch GLERL](https://coastwatch.glerl.noaa.gov/erddap/index.html)  (Stora sjöar Node)  
*   [NOAACoastWatch West Coast](https://coastwatch.pfeg.noaa.gov/erddap/index.html)som är samlokaliserad med och arbetar med
    [NOAA ERD](https://coastwatch.pfeg.noaa.gov/erddap/index.html)  (MiljöforskningsavdelningenSWFSCavNMFS) 
*   [NOAAIOOS Sensors](https://erddap.sensors.ioos.us/erddap/index.html)  (Integrerat Ocean Observing System)  
*   [NOAAIOOS CeNCOOS](https://erddap.axiomdatascience.com/erddap/index.html)  (Central- och norra Kalifornien Ocean Observing System, som drivs av Axiom Data Science)  
*   [NOAAIOOS GCOOS atmosfäriska och oceanografiska data: observationssystem](https://erddap.gcoos.org/erddap/index.html)  
    [NOAAIOOS GCOOS atmosfäriska och oceanografiska data: historiska samlingar](https://gcoos5.geos.tamu.edu/erddap/index.html)  
    [NOAAIOOS GCOOS biologiska och socioekonomiska](https://gcoos4.tamu.edu/erddap/index.html)  (Gulf Coast Ocean Observing System) 
*   [NOAAIOOS NERACOOS](http://www.neracoos.org/erddap/index.html)  (Northeastern Regional Association of Coastal and Ocean Observing Systems)  
*   [NOAAIOOS NGDAC](https://data.ioos.us/gliders/erddap/index.html)  (National Glider Data Assembly Center)  
*   NOAAIOOS NANOOS (Northwest Association of Networked Ocean Observing Systems) 
*   [NOAAIOOS PacIOOS](https://pae-paha.pacioos.hawaii.edu/erddap/index.html)  (Stilla havet observerar system) vid universitetet i Hawaii (UH)  
*   NOAAIOOS SCCOOS (Södra Kalifornien kust Ocean Observing System) 
*   [NOAAIOOS SECOORA](https://erddap.secoora.org/erddap/index.html)  (Sydosta kust Ocean observerar regionala föreningen)  
*   [NOAANCEI](https://www.ncei.noaa.gov/erddap/index.html)  (Nationella centrum för miljöinformation)    
*   NOAANGDC STP (National Geophysical Datacenter, sol - Terrestrial fysik) 
*   NOAA NMFSNEFSC (Nordöstra fiske Science Center) 
*   [NOAANOS CO-OPS](https://opendap.co-ops.nos.noaa.gov/erddap/index.html)  (Center för operativa oceanografiska produkter och tjänster)  
*   [NOAAOSMC](http://osmc.noaa.gov/erddap/index.html)  (Observera System Monitoring Center)  
*   [NOAAPIFSC](https://oceanwatch.pifsc.noaa.gov/erddap/index.html)  (Stilla havet Fisheries Science Center)  
*   [NOAAPMEL](https://data.pmel.noaa.gov/pmel/erddap/index.html)
*   [NOAAPolarWatch](https://polarwatch.noaa.gov/erddap/index.html)
*   [NOAAUAF](https://upwell.pfeg.noaa.gov/erddap/index.html)  (Unified Access Framework)  
*   [Ocean Networks Kanada](http://dap.onc.uvic.ca/erddap/index.html) 
*   [Ocean Tracking Network](https://members.oceantrack.org/erddap/index.html) 
*   [OOI / All Data](https://erddap-goldcopy.dataexplorer.oceanobservatories.org/erddap/index.html)  (Ocean Observatories Initiativ)   
OOI / Uncabled Data
* Princeton, Hydrometeorology Research Group
* R.Tech Engineering, Frankrike
*   [Rutgers University, Department of Marine and Coastal Sciences](https://tds.marine.rutgers.edu/erddap/index.html)  
* San Francisco Estuary Institute
*   [Scripps Institution av Oceanografi, Spray Underwater Gliders](https://spraydata.ucsd.edu/erddap/index.html) 
*   [Smart Atlantic](https://www.smartatlantic.ca/erddap/index.html)Memorial University of Newfoundland
* Sydafrikas miljöskyddsnätverk
* Spyglass teknologier
* Stanford University, Hopkins Marine Station
*   [UNESCO IODE](https://erddap.oa.iode.org/erddap/index.html)  (Internationell oceanografi och information Data Exchange)  
*   [University of British Columbia, Earth, Ocean & Atmospheric Vetenskapsavdelningen](https://salishsea.eos.ubc.ca/erddap/index.html) 
*   [University of California i Davis, Bodega Marine Laboratory](http://bmlsc.ucdavis.edu:8080/erddap/index.html) 
*   [University of Delaware, satellitmottagningsstation](https://basin.ceoe.udel.edu/erddap/index.html) 
* University of Washington, tillämpad fysiklaboratorium
*   [USGS CMGP](https://geoport.usgs.esipfed.org/erddap/index.html)  (Kust- och maringeologiprogram)  
*   [VOTO](https://erddap.observations.voiceoftheocean.org/erddap/index.html)  (Voice Of The Ocean, Sverige)  

Detta är en lista över bara några av de organisationer därERDDAP™har installerats av någon individ eller någon grupp. Det innebär inte att individen, gruppen eller organisationen rekommenderar eller stöderERDDAP.

### ERDDAP™rekommenderas inomNOAAoch CNRS{#erddap-is-recommended-within-noaa-and-cnrs} 
[NOAAData Access Procedurdirektiv](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations)inkluderarERDDAP™i sin lista över rekommenderade dataservrar för användning av grupper inomNOAA.ERDDAP™nämns positivt i avsnitt 4.2.3 i
[Guide de bonnes pratiques sur la gestion des données de la recherche
 (Forskningsdatahantering Bästa praxis guide) ] ( https://mi-gt-donnees.pages.math.unistra.fr/guide/04-traiter.html#deposer-et-structurer-dans-des-plateformes-de-gestion-de-donnees-locales ) Center National de la Recherche Scientifique (CNRS) i Frankrike.

## Slide Shows{#slide-shows} 

Här är några PowerPoint bildspel och dokument som Bob Simons har skapat relaterat tillERDDAP.

 **Innehåll och åsikter som uttrycks i dessa dokument är Bob Simons personliga åsikter och reflekterar inte nödvändigtvis någon ställning för regeringen eller regeringen.National Oceanic and Atmospheric Administration.** 

De fyra huvuddokumenten:

*   [Huvudintroduktionen tillERDDAP™  (version 5) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTalk5.pptx).
Du kan också[Titta på den här videon av Bob som ger detta samtal![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=H541G1XXZrU&t=4).
*   [En sida beskrivning avERDDAP™  (.pdf) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ERDDAP_OnePage.pdf)
*   [ERDDAPHeavy Loads, Grids, Clusters, Federations och Cloud Computing](/docs/server-admin/scaling)
*   [Bobs riktlinjer för datadistributionssystem](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html)

Andra presentationer:

*   [2020 EDM: Nya funktioner iERDDAP™v2.10](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapFeatures2.10.pptx)
*   [2020-05-19 DMIT: Data Ingest](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapDataIngest.pptx)  (Eller[Titta på den här videon av Bob som ger detta samtal](https://www.youtube.com/watch?v=9ArYxgwON2k).) 
*   [2019 IOOS DMAC: Nya funktioner iERDDAP™v2.0](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/Erddapv2Features.pptx)
*   [2018 Summer ESIP: Subsetting inERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapSubset2018.pptx)
*   [2018 Sommar ESIP: JSON stöd iERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapJson2018.pptx)
*   [2018 EDM: Ett distribuerat system för webbtjänster (Snabbare, lättare, mindre dyra)   (Eller varför jag var glad för fyra år sedan.) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/10P.04_Simons_DistributedWebServices2018.pptx)
*   [2018 EDM:ERDDAP™2018](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/7A4_Simons_ErddapSession2018.pptx)
*   [2018 EDM: Nya funktioner iERDDAP™för bild, ljud och videodata](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/4D4_Simons_ErddapMediaFiles2018.pptx)
*   [2018 EDM: UAF ochERDDAP™Lösningar för dataintegration](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/3D3_Simons_DataIntegration2018.pptx)
*   [2017 EDM: En snabb introduktion tillERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapIntro.pptx)
*   [2017 EDM och 2017 IOOS: New or Little KnownERDDAP™Funktioner (för användare) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapUserFeatures2017.pptx)
*   [2017 EDM och 2017 IOOS: New or Little KnownERDDAP™Funktioner (För administratörer) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapAdminFeatures2017.pptx)
*   [2017 EDM: EML, KNB ochERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/eml_knb_erddap.pptx)
*   [2017 2017 2017 EDM: Hur får data från källan till slutanvändaren? Gamla skolan kontra New School](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OldSchoolNewSchool.pptx)
*   [2016 2016 Sommar ESIP: Den stora bilden: PARR,OPeNDAP,ERDDAP™, och Data Distribution](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheBigPicture.pptx)
*   [2016 EDM: En och Done](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OneAndDone.pptx)
*   [2016 2016 Gov API: Nästa generation Dataservrar](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/NextGeneration.pptx)
*   [2015 2015 2015 Sommar ESIP: Tabular Aggregation](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularAggregation.pptx)
*   [2014 EDM: Bob's Do's och Don't för Tabular Data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsDosDontsTabular.pptx)
*   [2014 EDM: Det ideala användargränssnittet](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheIdealUserInterface.pptx)
*   [2014 2014 2014 Sommar ESIP: Tabular Data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularData.pptx)
*   [2013: Behandla inte In-Situ och Tabular Data som Gridded Data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TablesAndGrids.html)
*   [2013 EDM: Gör mer med mindre](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/DoMoreWithLess.ppt)
*   [2012 EDM: Riktlinjer för datadistributionssystem](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/guidelines3.ppt)

Presentationer av andra människor:

*   [Ett FAIR-baserat verktyg för att förbättra global datadelning![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=kdBTgNEp5TA&ab_channel=GOOSIOC)  
Kevin O'Brien på Global Ocean Observing System (GOOS) Webinar / Observation Coordination Group (OCG) Serie / 1, 12 november 2020.
*   [Bygga din egen väderapp med användningNOAAÖppna data och Jupyter Notebooks![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=MF-WH01Qw0g)  
av Filipe Fernandes och Rich Signell på SciPy 2018, 13 juli 2018.
*   [Använda OOIERDDAP![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=tj4M9hodTG0)  
av Rich Signell, februari 2018.
*   [ESIP Tech Dive: "ERDDAPLightning Talks"![YouTube](/img/youtube.png)](https://youtu.be/2-ydBByYB0M?t=160)  
Åtta 5-minuterssamtal om intressanta saker som människor gör medERDDAPav Jenn Sevadjian, Jim Potemra, Conor Delaney, Kevin O'Brien, John Kerfoot, Stephanie Petillo, Charles Carleton och Eli Hunter presenterade som en ESIP Tech Dive den 31 augusti 2017.
*   [AnvändaERDDAP™Tillgång Tabular Data![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=_BwMHRh7CS8)  
av Rich Signell, augusti 2015.
*   [Test AnvändningERDDAP™för Blue Carbon Data![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=TbOhElC_-qU)  
av Rich Signell, augusti 2015.
*   [Använda data frånERDDAP™in iNOAA"SGNOMEProgramvara![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=18xZoXu1USM).
I den här videon hämtar Rich Signell havsströmmar prognosdata frånERDDAP™att modellera en giftig spill i havet med[NOAA"SGNOMEprogramvara](https://response.restoration.noaa.gov/oil-and-chemical-spills/oil-spills/response-tools/gnome.html)  (på 5 minuter&#33;) . (Ett litet fel i videon: när du söker efter datamängder, använd inte OCH mellan söktermer. Det är implicit.) Av Rich Signell, 8 april 2011.
