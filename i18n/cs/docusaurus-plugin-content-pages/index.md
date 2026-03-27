---
title: "ERDDAP™ Documentation"
---
## Nejnovější ERDDAP™ verze{#latest-erddap-version} 

2.30.0, viz [změna dokumentace](/changes#version-2300) a [Stáhnout](https://github.com/ERDDAP/erddap/releases/tag/v2.30.0) .

##  ERDDAP™ informace{#erddap-information} 

 ERDDAP™ je vědecký datový server, který poskytuje uživatelům jednoduchý, konzistentní způsob stahování podskupin
gridded a tabulkové vědecké soubory dat ve společných formátech souboru a dělat grafy a mapy.
 ERDDAP™ je svobodný a otevřený zdroj (Apache a Apache-like)   Java Sluníčko NOAA   NMFS   SWFSC Oddělení environmentálního výzkumu ( ERD ) .

* Chcete-li vidět / použít ERDDAP™ instalace: [ https://coastwatch.pfeg.noaa.gov/erddap/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/index.html) 
* Chcete-li začít s instalací číst [Příručka instalace nasazení](/docs/server-admin/deploy-install) .
* Viz kód [průvodce programátorem](/docs/contributing/programmer-guide) .


Níže naleznete příslušné odkazy pro otázky a jak přispět.
* Recenze konverzace a klást otázky na [ https://groups.google.com/g/erddap ](https://groups.google.com/g/erddap) nebo [ https://github.com/erddap/erddap/discussions ](https://github.com/erddap/erddap/discussions) 
* Přezkum a předložení otázek [ https://github.com/erddap/erddap/issues ](https://github.com/erddap/erddap/issues) 
* Chcete-li navrhnout žádosti o funkce, postupujte podle těchto pokynů: [ ERDDAP Diskuse # 93 (komentář) ](https://github.com/ERDDAP/erddap/discussions/93#discussion-4920427) 


## Vyhledat více ERDDAP™ s
Existují dva způsoby, jak hledat více ERDDAP™ s pro soubory dat: [Vyhledat více ERDDAP™ s](/SearchMultipleERDDAPs.html) a [ ERDDAP™ Dataset Discovery](http://erddap.com/) .


## Nastavit si vlastní ERDDAP™  {#set-up-your-own-erddap} 

 ERDDAP™ je [Volný a otevřený zdroj](https://en.wikipedia.org/wiki/Free_and_open-source_software) , all- Java   (servlet) , webová aplikace, která běží na webovém serveru aplikace (například Tomcat (doporučeno) , nebo Jetty (Funguje to, ale my to nepodporujeme.) ) . Tato webová stránka je většinou pro lidi (" ERDDAP™ administrátoři ") Kdo si chce založit vlastní ERDDAP™ instalace na vlastní webové stránky.

Chcete-li začít s instalací číst [Příručka instalace nasazení](/docs/server-admin/deploy-install) .

### K použití ERDDAP™ distribuovat data?{#why-use-erddap-to-distribute-your-data} 

Protože malé úsilí o založení ERDDAP™ přináší mnoho výhod.

* Pokud již máte webovou službu pro distribuci vašich dat,
můžete nastavit ERDDAP™ přístup k vašim datům prostřednictvím stávající služby.
Nebo to můžeš zařídit. ERDDAP™ přístup k vašim datům přímo z místních souborů.
* Pro každý datový soubor, stačí napsat malý kus XML říct ERDDAP™ jak se dostat do datového souboru.
* Jakmile máte ERDDAP™ koneční uživatelé mohou sloužit vašim datům:
    * Vyžádat si údaje různými způsoby ( DAP , WMS , a více v budoucnosti) .
    * Získat odpověď na data v různých formátech souboru. (To je asi ten největší důvod&#33;) 
    * Vytvořit grafy a mapy. (Každý má rád hezké obrázky.) 
    * Vybudovat další užitečné a zajímavé věci na vrcholu ERDDAP webové služby -- viz [ Awesome ERDDAP ™](https://github.com/IrishMarineInstitute/awesome-erddap) seznam úžasných ERDDAP - související projekty.

Můžeš. [přizpůsobit](/docs/server-admin/deploy-install#customize) Vaše ERDDAP je vzhled tak ERDDAP™ odráží vaši organizaci a zapadá do zbytku vašich webových stránek.

## Je postup instalace těžký? Můžu to udělat?{#is-the-installation-procedure-hard-can-i-do-it} 

Počáteční instalace chvíli trvá, ale není to moc těžké. Dokážeš to. Jestli se zasekneš, pošli mi e-mail. erd dot data at noaa dot gov . Pomůžu ti.
Nebo se můžeš přidat k [ ERDDAP™ Google Group / Mailing List](https://groups.google.com/g/erddap) a položte tam otázku.

## Kdo používá ERDDAP™  {#who-uses-erddap} 

 ERDDAP™ byla instalována přibližně 100 organizacemi v nejméně 17 zemích

 (Austrálie, Belgie, Kanada, Čína, Francie, Indie, Irsko, Itálie, Nový Zéland, Rusko, Jižní Afrika, Španělsko, Srí Lanka, Švédsko, Thajsko, Velká Británie, USA) , včetně:

*    [APKD](https://apdrc.soest.hawaii.edu/erddap/index.html)   (Asia-Pacific Data-Research Center, International Pacific Research Center) na Havajské univerzitě (Uh)  
*    [BCO-DMO na WHOI](https://erddap.bco-dmo.org/erddap/index.html)   (Biologická a chemická oceánografie Úřad pro správu dat v Woods Hole Oceanographic Instituce)  
*    [CanWIN ERDDAP™ ](https://canwinerddap.ad.umanitoba.ca/erddap/index.html)   (Kanadská informační síť pro vodní toky) ve Středisku pro pozorování Země (CEOS) , University of Manitoba
*    [CDIP](https://erddap.cdip.ucsd.edu/erddap/index.html)   (Pobřežní informační program na UCSD)  
*    [CNR- ISP](https://data.iadc.cnr.it/erddap/index.html)   (Národní rada pro výzkum Itálie, Ústav polárních věd)  
* CSIRO a IMOS (Australská organizace pro vědecký a průmyslový výzkum a integrovaný námořní pozorovatelský systém) 
*    [DIVER ( NOAA ORR) ](https://pub-data.diver.orr.noaa.gov/erddap/index.html)   ( NOAA Úřad pro reakci a obnovu)  
*    [EMODnet Fyzika](https://erddap.emodnet-physics.eu/erddap/index.html)   (Evropská námořní pozorovací a datová síť -- Fyzika)  
*    [GMRI](https://erddap.griidc.org/erddap/index.html)   (Výzkumná iniciativa Mexického zálivu)  
*    [Hakai Institute](https://catalogue.hakai.org/erddap/index.html)   (Ústav Hakai na centrálním pobřeží Britské Kolumbie, Kanada) 
*    [Vysokoškolské technologické služby](https://myhsts.org) , který nabízí kódování a technologický výcvik pro studenty a dospělé
*    [ICHEC](https://erddap.ichec.ie/erddap/index.html)   (Irish Centre for High- End Computing) 
*    [I NCO IS](https://erddap.incois.gov.in/erddap/index.html)   (Indické národní centrum pro oceánské informační služby)  
* RADY (Institut de Recherche pour le Développement, Francie)   
CNRS (Centre National de la Recherche Scientifique, Francie)   
UPMC (Université Pierre et Marie CURIE, Paris, Francie)   
UCAD (Université Cheikh Anta Diop de Dakar, Sénégal)   
UGB (Université Gaston Berger -- Saint- Louis du Sénégal)   
UFHB (Université Félix HOUPHOUT- BOIGNY, Abidjan, Pobřeží slonoviny)   
IPSL (Institut Pierre Simon Laplacement des sciences de l 'environnement, Paris, Francie)   
LMI ECLAIRS (Laboratoire Mixte International "Etude du Climat en Afrique de l 'Ouest et de ses Interactions avec l' Environnement Régional, et appui aux services climatiques") 
* JRC (Evropská komise - Společné výzkumné středisko, Evropská unie) 
*    [Námořní institut](https://erddap.marine.ie/erddap/index.html)   (Irsko)  
* Marine Instruments S.A., (Španělsko) 
* NCI (Australská národní počítačová infrastruktura) 
*    [ NOAA Pobřežní hlídka](https://coastwatch.noaa.gov/erddap/index.html)   (centrální)  
*    [ NOAA CoastWatch CGOM](https://cwcgom.aoml.noaa.gov/erddap/index.html)   (Karibik / Mexický záliv Uzel)  
*    [ NOAA Pobřežní hlídka GLERL](https://coastwatch.glerl.noaa.gov/erddap/index.html)   (Uzel Velkých jezer)  
*    [ NOAA Pobřežní hlídka západní pobřeží](https://coastwatch.pfeg.noaa.gov/erddap/index.html) který je ko- umístěn s a pracuje s
     [ NOAA   ERD ](https://coastwatch.pfeg.noaa.gov/erddap/index.html)   (Oddělení environmentálního výzkumu SWFSC z NMFS ) 
*    [ NOAA IOOS senzory](https://erddap.sensors.ioos.us/erddap/index.html)   (Integrovaný systém pozorování oceánu)  
*    [ NOAA IOOS Ce NCO OS](https://erddap.axiomdatascience.com/erddap/index.html)   (Central and Northern California Ocean Observing System, řízený Axiom Data Science)  
*    [ NOAA Atmosférická a oceánografická data IOOS GCOOS: pozorovací systém](https://erddap.gcoos.org/erddap/index.html)   
     [ NOAA Atmosférická a oceánografická data IOOS GCOOS: Historické sbírky](https://gcoos5.geos.tamu.edu/erddap/index.html)   
     [ NOAA IOOS GCOOS Biologické a socioekonomie](https://gcoos4.tamu.edu/erddap/index.html)   (Systém sledování pobřeží zálivu) 
*    [ NOAA IOOS NERACOOS](http://www.neracoos.org/erddap/index.html)   (Severovýchodní regionální sdružení pobřežních a oceánských pozorovatelských systémů)  
*    [ NOAA IOOS NGDAC](https://data.ioos.us/gliders/erddap/index.html)   (National Glider Centrum shromažďování dat)  
*    NOAA IOOS NANOOS (Northwest Association of Netword Ocean Observing Systems) 
*    [ NOAA IOOS Pacioos](https://pae-paha.pacioos.hawaii.edu/erddap/index.html)   (Tichý oceán) na Havajské univerzitě (Uh)  
*    NOAA IOOS SCCOOS (Jižní Kalifornie Pobřežní oceán Pozorování systém) 
*    [ NOAA IOOS SECOORA](https://erddap.secoora.org/erddap/index.html)   (Jihovýchodní pobřežní oceán Pozorování regionální asociace)  
*    [ NOAA NCEI](https://www.ncei.noaa.gov/erddap/index.html)   (Národní centra pro environmentální informace)    
*    NOAA NGDC STP (Národní geofyzikální Datové centrum, Solar -- Pozemní fyzika) 
*    NOAA   NMFS NEFSC (Severovýchodní vědecké středisko pro rybolov) 
*    [ NOAA NOS COOPS](https://opendap.co-ops.nos.noaa.gov/erddap/index.html)   (Centrum pro operační oceánografické produkty a služby)  
*    [ NOAA OSMC](http://osmc.noaa.gov/erddap/index.html)   (Pozorování monitorovacího centra systému)  
*    [ NOAA PIFSC](https://oceanwatch.pifsc.noaa.gov/erddap/index.html)   (Vědecké středisko pro rybolov na tichomořských ostrovech)  
*    [ NOAA PMEL](https://data.pmel.noaa.gov/pmel/erddap/index.html) 
*    [ NOAA PolarWatch](https://polarwatch.noaa.gov/erddap/index.html) 
*    [ NOAA UAF](https://upwell.pfeg.noaa.gov/erddap/index.html)   (Jednotný rámec přístupu)  
*    [Ocean Networks Kanada](http://dap.onc.uvic.ca/erddap/index.html)  
*    [Ocean Tracking Network](https://members.oceantrack.org/erddap/index.html)  
*    [OOI / Všechna data](https://erddap-goldcopy.dataexplorer.oceanobservatories.org/erddap/index.html)   (Iniciativa oceánských observatoří)   
OOI / Nepřístupná data
* Princeton, hydrometeorologická výzkumná skupina
* R.Tech Engineering, Francie
*    [Rutgers University, Katedra mořských a pobřežních věd](https://tds.marine.rutgers.edu/erddap/index.html)   
* San Francisco Estuary Institute
*    [Scripps Institution of Oceanography, Spray Underwater Gliders](https://spraydata.ucsd.edu/erddap/index.html)  
*    [Chytrý Atlantik](https://www.smartatlantic.ca/erddap/index.html) Memorial University of Newfoundland
* Jihoafrická síť pro sledování životního prostředí
* Spyglass Technologies
* Stanford University, Hopkins Marine Station
*    [UNESCO IODE](https://erddap.oa.iode.org/erddap/index.html)   (Mezinárodní oceánografie a informace Výměna údajů)  
*    [University of British Columbia, Earth, Ocean & Atmosféric Vědecké oddělení](https://salishsea.eos.ubc.ca/erddap/index.html)  
*    [University of California at Davis, Bodega Marine Laboratory](http://bmlsc.ucdavis.edu:8080/erddap/index.html)  
*    [University of Delaware, Satelitní přijímací stanice](https://basin.ceoe.udel.edu/erddap/index.html)  
* University of Washington, aplikovaná fyzikální laboratoř
*    [USGS CMGP](https://geoport.usgs.esipfed.org/erddap/index.html)   (Pobřežní a námořní geologický program)  
*    [VOTO](https://erddap.observations.voiceoftheocean.org/erddap/index.html)   (Hlas oceánu, Švédsko)  

Toto je seznam jen některých organizací, kde ERDDAP™ byl nainstalován nějakou jednotlivou nebo jinou skupinou. To neznamená, že jednotlivec, skupina, nebo organizace doporučuje nebo podporuje ERDDAP .

###  ERDDAP™ Doporučuje se NOAA a CNRS{#erddap-is-recommended-within-noaa-and-cnrs} 
 [ NOAA Procesní směrnice o přístupu k údajům](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations) zahrnuje ERDDAP™ ve svém seznamu doporučených datových serverů pro použití podle skupin NOAA . ERDDAP™ je příznivě uvedeno v oddíle 4.2.3
[Guide de bonnes pratiques sur la gestion des données de la recherche
 (Správa údajů o výzkumu Příručka nejlepší praxe) ] ( https://mi-gt-donnees.pages.math.unistra.fr/guide/04-traiter.html#deposer-et-structurer-dans-des-plateformes-de-gestion-de-donnees-locales ) střediska National de la Recherche Scientifique (CNRS) ve Francii.

## Slide Show{#slide-shows} 

Zde jsou některé prezentace PowerPoint a dokumenty, které Bob Simons vytvořil související ERDDAP .

 **Obsah a názory vyjádřené v těchto dokumentech jsou osobní názory Boba Simonse a nemusí nutně odrážet žádný postoj vlády nebo National Oceanic and Atmospheric Administration .** 

Čtyři hlavní dokumenty:

*    [Hlavní úvod ERDDAP™   (verze 5) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTalk5.pptx) .
Můžete také [Podívejte se na video, kde Bob mluví.![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=H541G1XXZrU&t=4) .
*    [Popis jedné stránky ERDDAP™   (.pdf) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ERDDAP_OnePage.pdf) 
*    [ ERDDAP : Heavy Loads, Grids, Clusters, Federations, and Cloud Computing](/docs/server-admin/scaling) 
*    [Bobovy pokyny pro datové distribuční systémy](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html) 

Ostatní prezentace:

*    [2020 EDM: Nové funkce v ERDDAP™ v2.10](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapFeatures2.10.pptx) 
*    [2020- 05- 19 DMIT: Datový Ingest](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapDataIngest.pptx)   (nebo [Podívejte se na video, kde Bob mluví.](https://www.youtube.com/watch?v=9ArYxgwON2k) .) 
*    [2019 IOOS DMAC: Nové funkce v ERDDAP™ v2.0](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/Erddapv2Features.pptx) 
*    [2018 Letní ESIP: Subsetting In ERDDAP™ ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapSubset2018.pptx) 
*    [2018 Letní ESIP: Podpora JSON In ERDDAP™ ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapJson2018.pptx) 
*    [2018 EDM: Distribuovaný systém webových služeb (Rychlejší, jednodušší, levnější)   (Nebo proč jsem byl před čtyřmi lety šťastný.) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/10P.04_Simons_DistributedWebServices2018.pptx) 
*    [2018 EDM: ERDDAP™ v roce 2018](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/7A4_Simons_ErddapSession2018.pptx) 
*    [2018 EDM: Nové funkce v ERDDAP™ pro obrazová, zvuková a video data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/4D4_Simons_ErddapMediaFiles2018.pptx) 
*    [2018 EDM: UAF ERDDAP™ Řešení pro integraci dat](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/3D3_Simons_DataIntegration2018.pptx) 
*    [2017 EDM: Rychlý úvod do ERDDAP ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapIntro.pptx) 
*    [2017 EDM a 2017 IOOS: Nové nebo málo známé ERDDAP™ Vlastnosti (pro uživatele) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapUserFeatures2017.pptx) 
*    [2017 EDM a 2017 IOOS: Nové nebo málo známé ERDDAP™ Vlastnosti (pro správce) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapAdminFeatures2017.pptx) 
*    [2017 EDM: EML, KNB, a ERDDAP ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/eml_knb_erddap.pptx) 
*    [2017 EDM: Jak se data dostanou ze zdroje ke konečnému uživateli? Stará škola versus nová škola](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OldSchoolNewSchool.pptx) 
*    [2016 Letní ESIP: Velký obrázek: PARR, OPeNDAP , ERDDAP™ , a distribuce dat](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheBigPicture.pptx) 
*    [2016 EDM: One And Done](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OneAndDone.pptx) 
*    [2016 Gov API: Další generace Servery dat](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/NextGeneration.pptx) 
*    [2015 Letní ESIP: Tabulární agregace](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularAggregation.pptx) 
*    [2014 EDM: Bob 's Do' s and Don 't for Tabular Data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsDosDontsTabular.pptx) 
*    [2014 EDM: Ideální uživatelské rozhraní](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheIdealUserInterface.pptx) 
*    [2014 Letní ESIP: Tabulární data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularData.pptx) 
*    [2013: Neléčte In- Situ a Tabulární data jako Gridded Data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TablesAndGrids.html) 
*    [2013 EDM: dělat více s méně](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/DoMoreWithLess.ppt) 
*    [2012 EDM: Pokyny pro datové distribuční systémy](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/guidelines3.ppt) 

Prezentace jiných lidí:

*    [Nástroj založený na FAIR pro zlepšení globálního sdílení dat![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=kdBTgNEp5TA&ab_channel=GOOSIOC)   
Kevin O 'Brien z Global Ocean Observing System (GOOS) Webinar / Pozorovatelská koordinační skupina (OCG) Série /1, 12. listopadu2020.
*    [Stavba vlastní aplikace počasí NOAA Otevřené datové a datové zápisníky![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=MF-WH01Qw0g)   
od Filipe Fernandes a Rich Sigdell na SciPy2018, 13. července2018.
*    [Použití OOI ERDDAP ![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=tj4M9hodTG0)   
by Rich Sigdell, February2018.
*    [ESIP Tech Dive: " ERDDAP Blesk mluví "![YouTube](/img/youtube.png)](https://youtu.be/2-ydBByYB0M?t=160)   
Osm 5 minut mluví o zajímavých věcech, které lidé dělají s ERDDAP Jenn Sevadjian, Jim Potemra, Conor Delaney, Kevin O 'Brien, John Kerfoot, Stephanie Petillo, Charles Carleton a Eli Hunter prezentovány jako ESIP Tech Dive dne 31. srpna2017.
*    [Použití ERDDAP™ přístup k tabulkovým datům![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=_BwMHRh7CS8)   
od Rich Sigdell, srpen2015.
*    [Test použití ERDDAP™ pro Blue Carbon Data![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=TbOhElC_-qU)   
od Rich Sigdell, srpen2015.
*    [Použití dat z ERDDAP™ n NOAA s GNOME Software![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=18xZoXu1USM) .
V tomto videu, Rich Sigdell stahuje data z předpovědi oceánských proudů ERDDAP™ modelovat toxický únik v oceánu pomocí [ NOAA s GNOME software](https://response.restoration.noaa.gov/oil-and-chemical-spills/oil-spills/response-tools/gnome.html)   (Za 5 minut&#33;) . (Jedna malá chyba ve videu: při hledání souborů dat, nepoužívejte A mezi vyhledávacími termíny. Je to implicitní.) Od Richa Signella, 8. dubna2011.
