---
title: "ERDDAP™ Documentation"
---
## SisteERDDAP™versjon{#latest-erddap-version} 

2.25, se[endre dokumentasjon](/changes#version-225)og[Last ned den](https://github.com/ERDDAP/erddap/releases/tag/v2.25.1)..

## ERDDAP™Informasjon{#erddap-information} 

ERDDAP™er en vitenskapelig dataserver som gir brukerne en enkel og konsekvent måte å laste ned undergrupper av
gitt og tabell vitenskapelige datasett i felles filformater og lage grafer og kart.
ERDDAP™En fri og åpen kilde (Apache og Apache-lignende)  JavaServlet fraNOAA NMFS SWFSCMiljøforskningsdivisjon (ERD) ..

* For å se/bruke enERDDAP™installasjon:[ https://coastwatch.pfeg.noaa.gov/erddap/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/index.html)
* For å komme i gang med installasjon les[utplasseringsinstallasjonsguiden](/docs/server-admin/deploy-install)..
* For å bidra med kode se[Programmørens guide](/docs/contributing/programmer-guide)..


Nedenfor finner du relevante lenker for å stille spørsmål og hvordan du bidrar.
* Se på samtaler og stille spørsmål på[ https://groups.google.com/g/erddap ](https://groups.google.com/g/erddap)eller på[ https://github.com/erddap/erddap/discussions ](https://github.com/erddap/erddap/discussions)
* Se gjennom og sende problemer til[ https://github.com/erddap/erddap/issues ](https://github.com/erddap/erddap/issues)
* For å foreslå funksjonsforespørsler, følg denne veiledningen:[ERDDAPDiskusjoner #93 (kommentar) ](https://github.com/ERDDAP/erddap/discussions/93#discussion-4920427)


## Søk i flereERDDAP™s
Det finnes to måter å søke flere påERDDAP™s for datasett:[Søk i flereERDDAP™s](/SearchMultipleERDDAPs.html)og[ERDDAP™Datasett Discovery](http://erddap.com/)..


## Sett opp din egenERDDAP™ {#set-up-your-own-erddap} 

ERDDAP™er en[Fri og åpen kilde](https://en.wikipedia.org/wiki/Free_and_open-source_software), all-Java  (Servlet) , webprogram som kjører i en webapplikasjonsserver (For eksempel Tomcat (Anbefalt) , eller Jetty (Det fungerer, men vi støtter det ikke) ) .. Denne nettsiden er for det meste for mennesker ("ERDDAP™administratorer") som ønsker å sette opp sin egenERDDAP™installasjon på egen hjemmeside.

For å komme i gang med installasjon les[utplasseringsinstallasjonsguiden](/docs/server-admin/deploy-install)..

### Hvorfor brukeERDDAP™For å distribuere dine data?{#why-use-erddap-to-distribute-your-data} 

Fordi den lille innsatsen for å sette oppERDDAP™gir mange fordeler.

* Hvis du allerede har en webtjeneste for å distribuere dataene dine,
Du kan sette oppERDDAP™å få tilgang til dataene dine via eksisterende tjeneste.
Eller du kan sette oppERDDAP™å få tilgang til dataene dine direkte fra lokale filer.
* For hvert datasett trenger du bare å skrive en liten del av XML for å fortelleERDDAP™Hvordan få tilgang til datasettet.
* Når du harERDDAP™servere dine data, kan sluttbrukere:
    * Be om dataene på ulike måter (DAP,WMSog mer i fremtiden) ..
    * Få datarespons i ulike filformater. (Det er nok den største grunnen&#33;) 
    * Lag grafer og kart. (Alle liker vakre bilder.) 
    * Bygg andre nyttige og interessante ting på toppen avERDDAPInternett-tjenester -- se[Awesome ERDDAPTM](https://github.com/IrishMarineInstitute/awesome-erddap)Liste over fantastiskeERDDAP- relaterte prosjekter.

Du kan[tilpasse](/docs/server-admin/deploy-install#customize)dinERDDAPutseendet såERDDAP™reflekterer organisasjonen og passer inn i resten av nettstedet.

## Er installasjonsprosessen vanskelig? Kan jeg gjøre det?{#is-the-installation-procedure-hard-can-i-do-it} 

Den første installasjonen tar litt tid, men det er ikke så vanskelig. Du kan gjøre det. Hvis du sitter fast, e-post meg påerd dot data at noaa dot gov.. Jeg hjelper deg.
Eller du kan bli med i[ERDDAP™Google Group/E-postliste](https://groups.google.com/g/erddap)og legger spørsmålet der.

## Hvem brukerERDDAP™ {#who-uses-erddap} 

ERDDAP™har blitt installert av ca. 100 organisasjoner i minst 17 land

 (Australia, Belgia, Canada, Kina, Frankrike, India, Irland, Italia, New Zealand, Russland, Sør-Afrika, Spania, Sri Lanka, Sverige, Thailand, Storbritannia, USA) , inkludert:

*   [APDRC](https://apdrc.soest.hawaii.edu/erddap/index.html)  (Asia-Pacific Data Research Center, Internasjonalt Stillehavsforskningssenter) ved University of Hawaii (UH)  
*   [BCO-DMO på WHOI](https://erddap.bco-dmo.org/erddap/index.html)  (Biologisk og kjemisk oseanografi Dataadministrasjonskontor på Woods Hole Oceanografisk Institusjon)  
*   [CanWINERDDAP™](https://canwinerddap.ad.umanitoba.ca/erddap/index.html)  (Canada Watershed Information Network) i senteret for jordobservasjon (CEOS) University of Manitoba
*   [CDIP](https://erddap.cdip.ucsd.edu/erddap/index.html)  (Coastal Data Information Program hos UCSD)  
*   [CNR-ISP](https://data.iadc.cnr.it/erddap/index.html)  (Italias nasjonale forskningsråd, Institutt for polarvitenskap)  
* CSIRO og IMOS (Australias vitenskapelige og industrielle forskningsorganisasjon og det integrerte marine observasjonssystemet) 
*   [DIVER (NOAAORR) ](https://pub-data.diver.orr.noaa.gov/erddap/index.html)  (NOAARestaureringskontor)  
*   [EMODnet fysikk](https://erddap.emodnet-physics.eu/erddap/index.html)  (Det europeiske marineobservasjons- og datanettverket -- fysikk)  
*   [GoMRI](https://erddap.griidc.org/erddap/index.html)  (Golf of Mexico Forskningsinitiativ)  
*   [Hakai Institutt](https://catalogue.hakai.org/erddap/index.html)  (Hakai-instituttet på sentralkysten av British Columbia i Canada) 
*   [High School Technology Services](https://myhsts.org), som tilbyr kode- og teknologitrening for studenter og voksne
*   [ICHEC](https://erddap.ichec.ie/erddap/index.html)  (Irsk senter for High End Computing) 
*   [JegNCOIS](https://erddap.incois.gov.in/erddap/index.html)  (Indian National Centre for Ocean Information Services)  
* IRD (Institut de Recherche pour le Développement, Frankrike)   
CNRS (Bla gjennom Centre National de la Recherche Scientificique, Frankrike)   
UPMC (Université Pierre et Marie CURIE, Paris, Frankrike)   
UCAD (Université Cheikh Anta Diop de Dakar, Sénégal)   
UGB (Université Gaston Berger - Saint-Louis du Sénégal)   
UFHB (Université Félix Hoteller i nærheten av Abidjan, Elfenbenskysten)   
IPSL (Institutt Pierre Simon Laplace des Sciences de l'environnement, Paris, Frankrike)   
LMI ECLAIRS (Laboratoire Mixte International «Etude du Climat en Afrique de l'Ouest et de ses Interaksjoner avec l'Environnement Régional, et appui aux-tjenester climatiques») 
* JRC (EU-kommisjonen - Det felles forskningssenteret, EU) 
*   [Marineinstituttet](https://erddap.marine.ie/erddap/index.html)  (Irland)  
* Marine Instruments S.A. (Spania) 
* NCI (Australias nasjonale beregningsinfrastruktur) 
*   [NOAACoastWatch](https://coastwatch.noaa.gov/erddap/index.html)  (sentrale)  
*   [NOAACoastWatch CGOM](https://cwcgom.aoml.noaa.gov/erddap/index.html)  (Caribbean/Gulf of Mexico Node)  
*   [NOAACoastWatch GLERL](https://coastwatch.glerl.noaa.gov/erddap/index.html)  (Great Lakes Node)  
*   [NOAACoastWatch Vestkysten](https://coastwatch.pfeg.noaa.gov/erddap/index.html)som er samlokalisert med og arbeider med
    [NOAA ERD](https://coastwatch.pfeg.noaa.gov/erddap/index.html)  (MiljøforskningSWFSCavNMFS) 
*   [NOAAIOOS Sensorer](https://erddap.sensors.ioos.us/erddap/index.html)  (Integrert havobservasjonssystem)  
*   [NOAAIOOS CeNCOOS](https://erddap.axiomdatascience.com/erddap/index.html)  (Sentrale og nordlige California Ocean Observation System, drevet av Axiom Data Science)  
*   [NOAAIOOS GCOOS Atmosfæriske og oseanografiske data: Observasjonssystem](https://erddap.gcoos.org/erddap/index.html)  
    [NOAAIOOS GCOOS Atmosfæriske og oseanografiske data: Historiske samlinger](https://gcoos5.geos.tamu.edu/erddap/index.html)  
    [NOAAIOOS GCOOS Biologisk og Sosioøkonomi](https://gcoos4.tamu.edu/erddap/index.html)  (Gulf Coast Ocean Observation System) 
*   [NOAAIOOS NERACOOS](http://www.neracoos.org/erddap/index.html)  (Nordøstlige regionale sammenslutningen av kyst- og havobservasjonssystemer)  
*   [NOAAIOOS NGDAC](https://data.ioos.us/gliders/erddap/index.html)  (National Glider Datasamlingssenter)  
*   NOAAIOOS NANOOS (Nordvestforeningen av nettverkede havobservasjonssystemer) 
*   [NOAAIOOS PacIOOS](https://pae-paha.pacioos.hawaii.edu/erddap/index.html)  (Stillehavsøyene observasjonssystem) ved University of Hawaii (UH)  
*   NOAAIOOS SCCOOS (Det sørlige California Coastal Ocean Observation System) 
*   [NOAAIOOS SECOORA](https://erddap.secoora.org/erddap/index.html)  (Sørøstkysten observasjon regionale forening)  
*   [NOAANCEI](https://www.ncei.noaa.gov/erddap/index.html)  (Nasjonale sentre for miljøinformasjon)    
*   NOAANGDC STP (National Geofysisk Datasenter, Solar - Terrengfysikk) 
*   NOAA NMFSNEFSC (Nordøstlige fiskerivitenskapssenter) 
*   [NOAANOS CO-OPS](https://opendap.co-ops.nos.noaa.gov/erddap/index.html)  (Senter for operasjonelle oseanografiske produkter og tjenester)  
*   [NOAAOSMC](http://osmc.noaa.gov/erddap/index.html)  (Observasjonssystem Overvåkningssenter)  
*   [NOAAPIFSC](https://oceanwatch.pifsc.noaa.gov/erddap/index.html)  (Stillehavsøyene Fiskevitenskapssenter)  
*   [NOAAPMEL](https://data.pmel.noaa.gov/pmel/erddap/index.html)
*   [NOAAPolarWatch](https://polarwatch.noaa.gov/erddap/index.html)
*   [NOAAUAF](https://upwell.pfeg.noaa.gov/erddap/index.html)  (Unified Access Framework)  
*   [Ocean Networks Canada](http://dap.onc.uvic.ca/erddap/index.html) 
*   [Ocean Tracking Network](https://members.oceantrack.org/erddap/index.html) 
*   [OOI / Alle data](https://erddap-goldcopy.dataexplorer.oceanobservatories.org/erddap/index.html)  (Ocean Observatories Initiative)   
OOI/Ukabele data
* Princeton, Hydrometeorologi Research Group
* R.Tech Engineering, Frankrike
*   [Rutgers University, Institutt for marine og kystvitenskap](https://tds.marine.rutgers.edu/erddap/index.html)  
* San Francisco Estuary Institute
*   [Scripps Institusjon av oseanografi, Spray Undervannsglidere](https://spraydata.ucsd.edu/erddap/index.html) 
*   [Smart Atlantic](https://www.smartatlantic.ca/erddap/index.html)Minneuniversitetet i Newfoundland
* Sørafrikansk miljøobservasjon nettverk
* Spyglassteknologi
* Stanford University, Hopkins Marine Station
*   [UNESCO IODE](https://erddap.oa.iode.org/erddap/index.html)  (Internasjonal oseanografisk og informasjon Datautveksling)  
*   [University of British Columbia, Jorden, Ocean & Atmospheric Vitenskapsdepartementet](https://salishsea.eos.ubc.ca/erddap/index.html) 
*   [University of California ved Davis Bodega Marine Laboratory](http://bmlsc.ucdavis.edu:8080/erddap/index.html) 
*   [Universitet i Delaware, Satellittmottak stasjon](https://basin.ceoe.udel.edu/erddap/index.html) 
* University of Washington, Applied Physics Laboratory
*   [USGS CMGP](https://geoport.usgs.esipfed.org/erddap/index.html)  (Kyst- og marinegeologiprogrammet)  
*   [VOTO](https://erddap.observations.voiceoftheocean.org/erddap/index.html)  (Oceanets stemme, Sverige)  

Dette er en liste over noen av organisasjonene derERDDAP™Har blitt installert av en eller annen gruppe. Det betyr ikke at den enkelte, gruppen eller organisasjonen anbefaler eller støtterERDDAP..

### ERDDAP™anbefales iNOAAog CNRS{#erddap-is-recommended-within-noaa-and-cnrs} 
[NOAADatatilgangsdirektivet](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations)inkludererERDDAP™i listen over anbefalte dataservere for bruk av grupper iNOAA..ERDDAP™er positivt nevnt i avsnitt 4.2.3 i
[Guide de bons Pratiques sur la gestion des données de la recherche
 (Forskningsdatahåndtering Beste praksis guide) ] ( https://mi-gt-donnees.pages.math.unistra.fr/guide/04-traiter.html#deposer-et-structurer-dans-des-plateformes-de-gestion-de-donnees-locales ) av Senter National de la Recherche Scientificique (CNRS) i Frankrike.

## Lysbildevisninger{#slide-shows} 

Her er noen PowerPoint lysbildeshow og dokumenter som Bob Simons har opprettet relatert tilERDDAP..

 **innhold og meninger uttrykt i disse dokumentene er Bob Simons personlige meninger og reflekterer ikke nødvendigvis regjeringens ellerNational Oceanic and Atmospheric Administration..** 

De fire hoveddokumentene:

*   [Hovedintroduksjonen tilERDDAP™  (versjon 5) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTalk5.pptx)..
Du kan også[Se denne videoen av Bob som gir denne samtalen![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=H541G1XXZrU&t=4)..
*   [En side Beskrivelse avERDDAP™  (.pdf) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ERDDAP_OnePage.pdf)
*   [ERDDAP: Tunge belastninger, rutenett, klynger, føderasjoner og Cloud Computing](/docs/server-admin/scaling)
*   [Bobs retningslinjer for datadistribusjonssystemer](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html)

Andre presentasjoner:

*   [2020 EDM: Nye funksjoner iERDDAP™v2.10](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapFeatures2.10.pptx)
*   [2020-05-19 DMIT: Data Ingest](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapDataIngest.pptx)  (Eller[Se denne videoen av Bob som gir denne samtalen](https://www.youtube.com/watch?v=9ArYxgwON2k)..) 
*   [2019 IOOS DMAC: Nye funksjoner iERDDAP™v2.0](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/Erddapv2Features.pptx)
*   [2018 Sommer ESIP: Undersetting iERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapSubset2018.pptx)
*   [2018 Sommer ESIP: JSON-støtte iERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapJson2018.pptx)
*   [2018 EDM: Et distribuert system av webtjenester (Raskere, enklere, mindre dyrt)   (Hvorfor jeg var lykkelig for 4 år siden?) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/10P.04_Simons_DistributedWebServices2018.pptx)
*   [2018 EDM:ERDDAP™i 2018](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/7A4_Simons_ErddapSession2018.pptx)
*   [2018 EDM: Nye funksjoner iERDDAP™for bilde, lyd og videodata](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/4D4_Simons_ErddapMediaFiles2018.pptx)
*   [2018 EDM: UAF ogERDDAP™Løsninger for dataintegrasjon](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/3D3_Simons_DataIntegration2018.pptx)
*   [2017 EDM: En rask introduksjonERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapIntro.pptx)
*   [2017 EDM og 2017 IOOS: Ny eller lite kjentERDDAP™Funksjoner (for brukere) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapUserFeatures2017.pptx)
*   [2017 EDM og 2017 IOOS: Ny eller lite kjentERDDAP™Funksjoner (for Administratorer) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapAdminFeatures2017.pptx)
*   [EDM: EML, KNB ogERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/eml_knb_erddap.pptx)
*   [2017 EDM: Hvordan kommer data fra kilden til sluttbrukeren? Old School mot New School](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OldSchoolNewSchool.pptx)
*   [2016 Sommer ESIP: Det store bildet: PARR,OPeNDAP,ERDDAP™, og datadistribusjon](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheBigPicture.pptx)
*   [2016 EDM: En og ferdig](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OneAndDone.pptx)
*   [2016 Gov API: Neste generasjon Dataservere](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/NextGeneration.pptx)
*   [2015 Sommer ESIP: Tabular Aggregation](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularAggregation.pptx)
*   [2014 EDM: Bob's Do's og ikke for tabelldata](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsDosDontsTabular.pptx)
*   [2014 EDM: Det ideelle brukergrensesnittet](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheIdealUserInterface.pptx)
*   [2014 Sommer ESIP: Tabular Data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularData.pptx)
*   [2013: Ikke behandle In-Situ og Tabular Data som gitte data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TablesAndGrids.html)
*   [2013 EDM: Gjør mer med færre](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/DoMoreWithLess.ppt)
*   [2012 EDM: Retningslinjer for datadistribusjonssystemer](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/guidelines3.ppt)

Presentasjoner av andre mennesker:

*   [Et FAIR-basert verktøy for å forbedre global datadeling![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=kdBTgNEp5TA&ab_channel=GOOSIOC)  
av Kevin O'Brien i det globale observasjonssystemet (GOOS) Webinar / Observasjon Koordinasjon Gruppe (OCG) Serie / 1. november 12, 2020.
*   [Bygg din egen værapp ved hjelp avNOAAÅpne data og jupyrnotebøker![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=MF-WH01Qw0g)  
av Filipe Fernandes og Rich Signell på SciPy 2018, 13. juli 2018.
*   [Bruk av OOIERDDAP![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=tj4M9hodTG0)  
av Rich Signell, februar 2018.
*   [ESIP Tech Dive: "ERDDAPLynsamtaler"![YouTube](/img/youtube.png)](https://youtu.be/2-ydBByYB0M?t=160)  
8 5-minute snakker om interessante ting folk gjør medERDDAPav Jenn Sevadjian, Jim Potemra, Conor Delaney, Kevin O'Brien, John Kerfoot, Stephanie Petillo, Charles Carleton og Eli Hunter presentert som en ESIP Tech Dive den 31. august 2017.
*   [BrukerERDDAP™å få tilgang til tabelldata![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=_BwMHRh7CS8)  
av Rich Signell, august 2015.
*   [Test BrukERDDAP™Blue Carbon Data![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=TbOhElC_-qU)  
av Rich Signell, august 2015.
*   [Bruke data fraERDDAP™iNOAA'sGNOMEProgramvare![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=18xZoXu1USM)..
I denne videoen laster Rich Signell ned havstrømmer som varsler data fraERDDAP™å modellere et giftig spill i havet ved hjelp av[NOAA'sGNOMEprogramvare](https://response.restoration.noaa.gov/oil-and-chemical-spills/oil-spills/response-tools/gnome.html)  (Om 5 minutter&#33;) .. (En liten feil i videoen: Når du søker etter datasett, ikke bruk OG mellom søkevilkår. Det er implicitt.) Av Rich Signell, 8. april 2011.
