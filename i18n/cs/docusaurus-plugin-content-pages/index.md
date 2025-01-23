---
title: "ERDDAP™ Documentation"
---

## ERDDAP™informace{#erddap-information} 

ERDDAP™je vědecký datový server, který dává uživatelům jednoduchý, konzistentní způsob, jak stáhnout podskupiny
mřížkované a tabulární vědecké soubory v běžných formátech souborů a vytvářet grafy a mapy.
ERDDAP™je svobodný a otevřený zdroj (Apači a Apači jako)  JavaSerlet zNOAA NMFS SWFSCOddělení environmentálního výzkumu (ERD) .

* Zobrazit/ použítERDDAP™instalace:[ https://coastwatch.pfeg.noaa.gov/erddap/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/index.html)
* Chcete-li začít s instalací číst[návod k instalaci zařízení](/docs/server-admin/deploy-install).
* Přispívat kód viz[průvodce programátorem](/docs/contributing/programmer-guide).


Níže naleznete příslušné odkazy pro kladení otázek a jak přispět.
* Recenze konverzace a klást otázky na[ https://groups.google.com/g/erddap ](https://groups.google.com/g/erddap)nebo[ https://github.com/erddap/erddap/discussions ](https://github.com/erddap/erddap/discussions)
* Přezkum a předložení otázek[ https://github.com/erddap/erddap/issues ](https://github.com/erddap/erddap/issues)
* Abyste mohli navrhovat konkrétní požadavky, řiďte se těmito pokyny:[ERDDAPDiskuse #93 (komentář) ](https://github.com/ERDDAP/erddap/discussions/93#discussion-4920427)


## Hledat víceERDDAP™án
Existují dva způsoby, jak hledat víceERDDAP™s pro datové soubory:[Hledat víceERDDAP™án](/SearchMultipleERDDAPs.html)a[ERDDAP™Objev datové sady](http://erddap.com/).


## Nastavte si vlastníERDDAP™ {#set-up-your-own-erddap} 

ERDDAP™je[Volný a otevřený zdroj](https://en.wikipedia.org/wiki/Free_and_open-source_software), vše-Java  (servlet) , webová aplikace běžící na webovém serveru aplikace (například Tomcat (doporučené) , nebo Jetty (Funguje to, ale my to nepodporujeme.) ) . Tato webová stránka je většinou pro lidi ("ERDDAP™Správci") kteří si chtějí založit vlastníERDDAP™instalace na vlastních internetových stránkách.

### PročERDDAP™šířit vaše data?{#why-use-erddap-to-distribute-your-data} 

Protože malá snaha o založeníERDDAP™přináší mnoho výhod.

* Pokud již máte webovou službu pro distribuci vašich dat,
Můžeš to připravit.ERDDAP™přístup k vašim údajům prostřednictvím stávající služby.
Nebo se můžete připravit.ERDDAP™přístup k vašim datům přímo z místních souborů.
* Pro každý soubor dat stačí napsat malý kousek XML, abyste řekliERDDAP™jak přístup k datovému souboru.
* Jakmile budete mítERDDAP™sloužící vašim údajům mohou koncoví uživatelé:
    * Žádost o údaje různými způsoby (DAP,WMS, a více v budoucnosti) .
    * Získejte odpověď na data v různých formátech souborů. (To je asi ten největší důvod&#33;) 
    * Vytvořit grafy a mapy. (Každý má rád pěkné fotky.) 
    * Vybudovat další užitečné a zajímavé věci na vrcholuERDDAP's web services -- viz[Awesome ERDDAPTM](https://github.com/IrishMarineInstitute/awesome-erddap)seznam úžasnýchERDDAP- související projekty.

Můžeš.[přizpůsobit](/docs/server-admin/deploy-install#customize)VašeERDDAP's vzhled takERDDAP™odráží vaši organizaci a zapadá do zbytku vašeho webu.

## Je instalace těžká? Můžu to udělat?{#is-the-installation-procedure-hard-can-i-do-it} 

Počáteční instalace chvíli trvá, ale není to moc těžké. Zvládneš to. Jestli uvízneš, pošli mi email.erd dot data at noaa dot gov. Pomůžu ti.
Nebo se můžete připojit k[ERDDAP™Google Group / Mailing List](https://groups.google.com/g/erddap)a napište tam svou otázku.

## Kdo používáERDDAP™ {#who-uses-erddap} 

ERDDAP™byla instalována přibližně 100 organizacemi v nejméně 17 zemích

 (Austrálie, Belgie, Kanada, Čína, Francie, Indie, Irsko, Itálie, Nový Zéland, Rusko, Jihoafrická republika, Španělsko, Srí Lanka, Švédsko, Thajsko, Spojené království, USA) včetně:

*   [APRKS](https://apdrc.soest.hawaii.edu/erddap/index.html)  (Asia-Pacific Data-Výzkum Center, International Pacific Research Center) na Havajské univerzitě (UH)  
*   [BCO-DMO na WHOI](https://erddap.bco-dmo.org/erddap/index.html)  (Biologická a chemická oceánografie Správa dat v Woods Hole Oceanografic Instituce)  
*   [CanWINERDDAP™](https://canwinerddap.ad.umanitoba.ca/erddap/index.html)  (Canadian Watershed Information Network) ve středisku pro pozorování Země (CEOS) , University of Manitoba
*   [CDIP](https://erddap.cdip.ucsd.edu/erddap/index.html)  (Pobřežní informační program na UCSD)  
*   [CNR-ISP](https://data.iadc.cnr.it/erddap/index.html)  (National Research Council of Italy, Institute of Polar Sciences)  
* CSIRO a IMOS (Australská organizace pro vědecký a průmyslový výzkum a integrovaný systém sledování moří) 
*   [DIVER (NOAAORR) ](https://pub-data.diver.orr.noaa.gov/erddap/index.html)  (NOAAÚřad pro odpověď a obnovu)  
*   [EMODnet Fyzika](https://erddap.emodnet-physics.eu/erddap/index.html)  (Evropská námořní pozorovací a datová síť -- Fyzika)  
*   [GoMRI](https://erddap.griidc.org/erddap/index.html)  (Výzkumná iniciativa Mexického zálivu)  
*   [Hakai Institute](https://catalogue.hakai.org/erddap/index.html)  (Hakai Institute na centrálním pobřeží Britské Kolumbie, Kanada) 
*   [Technické služby středních škol](https://myhsts.org), který nabízí kódovací a technologické školení pro studenty a dospělé
*   [ICHEC](https://erddap.ichec.ie/erddap/index.html)  (Irish Centre for High-End Computing) 
*   [INCOIS](https://erddap.incois.gov.in/erddap/index.html)  (Indické národní centrum pro oceánské informační služby)  
* IRD (Institut de Recherche pour le Développement, Francie)   
CNRS (Centre National de la Recherche Scientifique, Francie)   
UPMC (Université Pierre et Marie CURIE, Paříž, Francie)   
UCAD (Université Cheikh Anta Diop de Dakar, Sénégal)   
UGB (Université Gaston Berger -- Saint-Louis du Sénégal)   
UFHB (Université Félix HOUPHOUËT-BOIGNY, Abidjan, Pobřeží slonoviny)   
IPSL (Institut Pierre Simon Laplaceova des sciences de l'environnement, Paříž, Francie)   
LMI ECLAIRS (Laboratoire Mixte International Environnement Régional, et appui aux services climatiques) 
* SVS (Evropská komise - Společné výzkumné středisko, Evropská unie) 
*   [Mořský institut](https://erddap.marine.ie/erddap/index.html)  (Irsko)  
* Marine Instruments S.A. (Španělsko) 
* NCI (Národní výpočetní infrastruktura Austrálie) 
*   [NOAACoastWatch](https://coastwatch.noaa.gov/erddap/index.html)  (centrální)  
*   [NOAACoastWatch CGOM](https://cwcgom.aoml.noaa.gov/erddap/index.html)  (Karibik/záliv Mexika)  
*   [NOAACoastWatch GLERL](https://coastwatch.glerl.noaa.gov/erddap/index.html)  (Uzel Velkých jezer)  
*   [NOAACoastWatch západní pobřeží](https://coastwatch.pfeg.noaa.gov/erddap/index.html)která se nachází spolu a pracuje s
    [NOAA ERD](https://coastwatch.pfeg.noaa.gov/erddap/index.html)  (Oddělení environmentálního výzkumuSWFSCzNMFS) 
*   [NOAAIOOS senzory](https://erddap.sensors.ioos.us/erddap/index.html)  (Integrovaný systém sledování oceánu)  
*   [NOAAIOOS CeNCOOS](https://erddap.axiomdatascience.com/erddap/index.html)  (Central and Northern California Ocean Observing System, vedený Axiom Data Science)  
*   [NOAAIOOS GCOOS Atmosférické a oceánografické údaje: pozorovací systém](https://erddap.gcoos.org/erddap/index.html)  
    [NOAAIOOS GCOOS Atmosférické a oceánografické údaje: Historické sbírky](https://gcoos5.geos.tamu.edu/erddap/index.html)  
    [NOAAIOOS GCOOS Biologická a společenská ekonomie](https://gcoos4.tamu.edu/erddap/index.html)  (Systém sledování pobřeží zálivu) 
*   [NOAAIOOS NERACOOS](http://www.neracoos.org/erddap/index.html)  (severovýchodní regionální sdružení pobřežních a oceánských pozorovacích systémů)  
*   [NOAAIOOS NGDAC](https://data.ioos.us/gliders/erddap/index.html)  (Národní kluzák Centrum shromažďování dat)  
*   NOAAIOOS NANOOS (Severozápadní asociace síťových systémů pozorování oceánu) 
*   [NOAAIOOS Pacioos](https://pae-paha.pacioos.hawaii.edu/erddap/index.html)  (Systém sledování oceánu Tichých ostrovů) na Havajské univerzitě (UH)  
*   NOAAIOOS SCCOOS (Jižní Kalifornie pobřežní oceán pozorovací systém) 
*   [NOAAIOOS SECOORA](https://erddap.secoora.org/erddap/index.html)  (Regionální sdružení pro sledování jihovýchodního pobřeží)  
*   [NOAANCEI](https://www.ncei.noaa.gov/erddap/index.html)  (Národní centra pro environmentální informace)    
*   NOAANGDC STP (Národní geofyzikální Datové centrum, Solární -- Základní fyzika) 
*   NOAA NMFSNEFSC (Severovýchodní vědecké středisko rybolovu) 
*   [NOAANOS CO-OPS](https://opendap.co-ops.nos.noaa.gov/erddap/index.html)  (Středisko pro provozní oceánografické produkty a služby)  
*   [NOAAOSMC](http://osmc.noaa.gov/erddap/index.html)  (Pozorování monitorovacího centra systému)  
*   [NOAAPIFSC](https://oceanwatch.pifsc.noaa.gov/erddap/index.html)  (Pacific Islands Fisheries Science Center)  
*   [NOAAPMEL](https://data.pmel.noaa.gov/pmel/erddap/index.html)
*   [NOAAPolarWatch](https://polarwatch.noaa.gov/erddap/index.html)
*   [NOAAUAF](https://upwell.pfeg.noaa.gov/erddap/index.html)  (Jednotný přístupový rámec)  
*   [Ocean Networks Canada](http://dap.onc.uvic.ca/erddap/index.html) 
*   [Síť sledování oceánu](https://members.oceantrack.org/erddap/index.html) 
*   [OOI / všechna data](https://erddap-goldcopy.dataexplorer.oceanobservatories.org/erddap/index.html)  (Iniciativa pro pozorování oceánu)   
OOI / Uncabled Data
* Princeton, Hydrometeorologická výzkumná skupina
* R. Tech Engineering, Francie
*   [Rutgers University, Ústav mořských a pobřežních věd](https://tds.marine.rutgers.edu/erddap/index.html)  
* San Francisco Estuary Institute
*   [Scripts Instituce oceánografie, Spray Podvodní kluzáky](https://spraydata.ucsd.edu/erddap/index.html) 
*   [Chytrý Atlantik](https://www.smartatlantic.ca/erddap/index.html)Memorial University of Newfoundland
* Jihoafrická síť pro sledování životního prostředí
* Špionážní technologie
* Stanford University, Hopkins Marine Station
*   [UNESCO IODE](https://erddap.oa.iode.org/erddap/index.html)  (Mezinárodní oceánografie a informace Výměna údajů)  
*   [University of British Columbia, Earth, Ocean & Atmosféra Ústav věd](https://salishsea.eos.ubc.ca/erddap/index.html) 
*   [Kalifornská univerzita v Davisu, Bodega Marine Laboratory](http://bmlsc.ucdavis.edu:8080/erddap/index.html) 
*   [Univerzita v Delaware, Satelitní přijímací stanice](https://basin.ceoe.udel.edu/erddap/index.html) 
* Washingtonská univerzita, laboratoř aplikované fyziky
*   [USGS CMGP](https://geoport.usgs.esipfed.org/erddap/index.html)  (Program pobřežní a mořské geologie)  
*   [VOTO](https://erddap.observations.voiceoftheocean.org/erddap/index.html)  (Hlas oceánu, Švédsko)  

Toto je seznam jen některých organizací, kdeERDDAP™byla instalována nějakým jednotlivcem nebo nějakou skupinou. To neznamená, že jednotlivec, skupina nebo organizace doporučuje nebo podporujeERDDAP.

### ERDDAP™se doporučuje v rámciNOAAa CNRS{#erddap-is-recommended-within-noaa-and-cnrs} 
[NOAA's procesní směrnice pro přístup k údajům](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations)zahrnujeERDDAP™ve svém seznamu doporučených datových serverů pro použití podle skupin uvnitřNOAA.ERDDAP™je příznivě uvedeno v bodě 4.2.3
[Guide de bonnes pratiques sur la gestion des données de la recherche
 (Řízení údajů o výzkumu Průvodce nejlepšími postupy) ] ( https://mi-gt-donnees.pages.math.unistra.fr/guide/04-traiter.html#deposer-et-structurer-dans-des-plateformes-de-gestion-de-donnees-locales ) Centre National de la Recherche Scientifique (CNRS) ve Francii.

## Snímky{#slide-shows} 

Zde jsou některé PowerPoint slide ukazuje a dokumenty, které Bob Simons vytvořil související sERDDAP.

 **Obsah a názory vyjádřené v těchto dokumentech jsou osobní názory Boba Simonse a nemusí nutně odrážet žádné stanovisko vlády neboNational Oceanic and Atmospheric Administration.** 

Čtyři hlavní dokumenty:

*   [Hlavní úvod doERDDAP™  (verze 5) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTalk5.pptx).
Můžete také[Podívejte se na toto video Boba, jak dává tuto přednášku![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=H541G1XXZrU&t=4).
*   [Popis jedné stránkyERDDAP™  (.pdf) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ERDDAP_OnePage.pdf)
*   [ERDDAP: Heavy Loads, Grids, Clusters, Federations, and Cloud Computing](/docs/server-admin/scaling)
*   [Bobovy pokyny pro systémy distribuce dat](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html)

Další prezentace:

*   [2020 EDM: Nové funkce vERDDAP™v2.10](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapFeatures2.10.pptx)
*   [20-05-19 DMIT: Data Ingest](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapDataIngest.pptx)  (nebo[Podívejte se na toto video Boba, jak dává tuto přednášku](https://www.youtube.com/watch?v=9ArYxgwON2k).) 
*   [2019 IOOS DMAC: Nové funkce vERDDAP™v2. 0](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/Erddapv2Features.pptx)
*   [2018 Letní ESIP: Subsetting inERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapSubset2018.pptx)
*   [2018 Letní ESIP: JSON podporaERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapJson2018.pptx)
*   [2018 EDM: Distribuovaný systém webových služeb (Rychlejší, jednodušší, levnější)   (Nebo proč jsem byl před čtyřmi lety šťastný.) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/10P.04_Simons_DistributedWebServices2018.pptx)
*   [2018 EDM:ERDDAP™v roce 2018](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/7A4_Simons_ErddapSession2018.pptx)
*   [2018 EDM: Nové funkce vERDDAP™pro obraz, audio a video data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/4D4_Simons_ErddapMediaFiles2018.pptx)
*   [2018 EDM: UAF aERDDAP™Řešení pro integraci dat](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/3D3_Simons_DataIntegration2018.pptx)
*   [2017 EDM: Rychlý úvod doERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapIntro.pptx)
*   [2017 EDM a 2017 IOOS: Nové nebo málo známéERDDAP™Vlastnosti (pro uživatele) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapUserFeatures2017.pptx)
*   [2017 EDM a 2017 IOOS: Nové nebo málo známéERDDAP™Vlastnosti (pro správce) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapAdminFeatures2017.pptx)
*   [2017 EDM: EML, KNB aERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/eml_knb_erddap.pptx)
*   [2017 EDM: Jak se data dostávají ze zdroje ke konečnému uživateli? Stará škola versus Nová škola](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OldSchoolNewSchool.pptx)
*   [2016 The Big Picture: PARR,OPeNDAP,ERDDAP™, a distribuce dat](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheBigPicture.pptx)
*   [2016 EDM: Jeden a hotovo](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OneAndDone.pptx)
*   [2016 Gov API: Další generace Datové servery](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/NextGeneration.pptx)
*   [2015 Letní ESIP: Tabulkové členění](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularAggregation.pptx)
*   [2014 EDM: Bob's Do's and Don't for Tabular Data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsDosDontsTabular.pptx)
*   [2014 EDM: Ideální uživatelské rozhraní](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheIdealUserInterface.pptx)
*   [2014 Letní ESIP: Tabulkové údaje](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularData.pptx)
*   [2013: Neléčit in-Situ a tabular data jako Gridded data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TablesAndGrids.html)
*   [2013 EDM: dělat více s méně](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/DoMoreWithLess.ppt)
*   [2012 EDM: Pokyny pro systémy distribuce dat](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/guidelines3.ppt)

Prezentace od jiných lidí:

*   [Nástroj založený na FAIR pro zlepšení globálního sdílení dat![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=kdBTgNEp5TA&ab_channel=GOOSIOC)  
od Kevina O'Briena v globálním systému pozorování oceánu (Goos) Webinar / Skupina pro koordinaci pozorování (OCG) Série / 1. listopadu 12, 2020.
*   [Budování vlastní aplikace počasí pomocíNOAAOtevřít zápisníky dat a jupyterů![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=MF-WH01Qw0g)  
Filipe Fernandes a Rich Signell na SciPy 2018, červenec 13, 2018.
*   [Použití OOIERDDAP![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=tj4M9hodTG0)  
Rich Signell, únor 2018.
*   [ESIP Tech Dive: "ERDDAPBlesk mluví"![YouTube](/img/youtube.png)](https://youtu.be/2-ydBByYB0M?t=160)  
Osm 5-Minute mluví o zajímavých věcech, které lidé dělajíERDDAPJenn Sevadjian, Jim Potemra, Conor Delaney, Kevin O'Brien, John Kerfoot, Stephanie Petillo, Charles Carleton a Eli Hunter představili 31. srpna 2017 jako ESIP Tech Dive.
*   [PoužitíERDDAP™pro přístup k tabulkovým datům![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=_BwMHRh7CS8)  
Rich Signell, srpen 2015.
*   [Test použitíERDDAP™pro údaje o modrém uhlíku![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=TbOhElC_-qU)  
Rich Signell, srpen 2015.
*   [Použití dat zERDDAP™vNOAA'sGNOMESoftware![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=18xZoXu1USM).
V tomto videu Rich Signell stahuje data z oceánských proudůERDDAP™modelovat toxické skvrny v oceánu pomocí[NOAA'sGNOMEsoftware](https://response.restoration.noaa.gov/oil-and-chemical-spills/oil-spills/response-tools/gnome.html)  (Za 5 minut&#33;) . (Jedna malá chyba ve videu: při hledání souborů nepoužívej A mezi hledanými výrazy. Je to implicitní.) Od Riche Signella z 8. dubna 2011.
