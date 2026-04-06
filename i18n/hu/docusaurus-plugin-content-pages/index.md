---
title: "ERDDAP™ Documentation"
---
## Legutóbbi ERDDAP™ változat{#latest-erddap-version} 

2.30.0, lásd a [a dokumentáció módosítása](/changes#version-2300) és [letöltése](https://github.com/ERDDAP/erddap/releases/tag/v2.30.0) .

##  ERDDAP™ információ{#erddap-information} 

 ERDDAP™ egy tudományos adatszerver, amely a felhasználók egyszerű, következetes módon letölthető alkészletek
gridded és táblázatos tudományos adatkészletek közös fájlformátumokban, valamint grafikonok és térképek készítése.
 ERDDAP™ szabad és nyílt forrás (Apache és apache- szerű)   Java Szolga NOAA   NMFS   SWFSC Környezetvédelmi Kutatási Osztály ( ERD ) .

* A ERDDAP™ telepítés: [ https://coastwatch.pfeg.noaa.gov/erddap/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/index.html) 
* Beépítéssel kezdeni [telepítési útmutató](/docs/server-admin/deploy-install) .
* Hozzájárulás kód lásd: [programozó útmutató](/docs/contributing/programmer-guide) .


Az alábbiakban megtalálja a megfelelő linkeket kérdések és hogyan járulhat hozzá.
* Beszélgetések áttekintése és kérdések a következő honlapon: [ https://groups.google.com/g/erddap ](https://groups.google.com/g/erddap) vagy [ https://github.com/erddap/erddap/discussions ](https://github.com/erddap/erddap/discussions) 
* A kérdések felülvizsgálata és benyújtása [ https://github.com/erddap/erddap/issues ](https://github.com/erddap/erddap/issues) 
* A bónusz kérések javaslatához kövesse ezt az útmutatót: [ ERDDAP Beszélgetések # 93 (megjegyzés) ](https://github.com/ERDDAP/erddap/discussions/93#discussion-4920427) 


## Keresés ERDDAP™ sz
Két módja van a többszörös keresésnek. ERDDAP™ s adatkészletek esetében: [Keresés ERDDAP™ sz](/SearchMultipleERDDAPs.html) és [ ERDDAP™ Adatbázis felfedezés](http://erddap.com/) .


## Saját beállítás ERDDAP™  {#set-up-your-own-erddap} 

 ERDDAP™ a [Szabad és nyitott forrás](https://en.wikipedia.org/wiki/Free_and_open-source_software) Minden... Java   (szervlet) , webes alkalmazás fut egy webes alkalmazás szerver (például, Tomcat (ajánlott) , vagy Jetty (működik, de nem támogatjuk.) ) . Ez a weboldal leginkább az embereknek van. (" ERDDAP™ adminisztrátorok ") Ki akarja létrehozni a saját ERDDAP™ telepítés saját honlapján.

Beépítéssel kezdeni [telepítési útmutató](/docs/server-admin/deploy-install) .

### Miért kell alkalmazni? ERDDAP™ az adatok terjesztése?{#why-use-erddap-to-distribute-your-data} 

Mert a kis erőfeszítés, hogy létre ERDDAP™ Sok előnnyel jár.

* Ha már van webes szolgáltatása az adatok terjesztésére,
Beállíthatod. ERDDAP™ az adataihoz való hozzáférés a meglévő szolgáltatáson keresztül.
Vagy felállíthatod. ERDDAP™ az adatokhoz való közvetlen hozzáférés helyi fájlokból.
* Minden adathoz csak egy kis XML darabot kell írni, hogy ERDDAP™ hogyan lehet hozzáférni az adatkészlethez.
* Ha ERDDAP™ a végfelhasználók:
    * Az adatok kérése különböző módokon ( DAP , WMS , és a jövőben) .
    * Szerezd meg az adatválaszt különböző fájlformátumokban. (Valószínűleg ez a legnagyobb ok&#33;) 
    * Készíts grafikonokat és térképeket. (Mindenki szereti a szép képeket.) 
    * Épít más hasznos és érdekes dolgokat tetején ERDDAP web szolgáltatások -- lásd a [ Awesome ERDDAP ™](https://github.com/IrishMarineInstitute/awesome-erddap) a király listája ERDDAP - kapcsolódó projektek.

Megteheted. [testre szabva](/docs/server-admin/deploy-install#customize) Ön ERDDAP a külseje annyira ERDDAP™ tükrözi a szervezet és illeszkedik a többi a honlapon.

## Nehéz a telepítési eljárás? Megtehetem?{#is-the-installation-procedure-hard-can-i-do-it} 

A kezdeti telepítés időbe telik, de nem nehéz. Meg tudod csinálni. Ha beragadsz, küldj e-mailt: erd dot data at noaa dot gov . Segítek.
Vagy csatlakozhatsz a [ ERDDAP™ Google Csoport / Levelezési lista](https://groups.google.com/g/erddap) és tedd fel a kérdésed.

## Ki használja ERDDAP™  {#who-uses-erddap} 

 ERDDAP™ legalább 17 országban mintegy 100 szervezet telepítette

 (Ausztrália, Belgium, Kanada, Kína, Franciaország, India, Írország, Olaszország, Új-Zéland, Oroszország, Dél-Afrika, Spanyolország, Sri Lanka, Svédország, Thaiföld, Egyesült Királyság, USA) a következőkkel:

*    [APKT](https://apdrc.soest.hawaii.edu/erddap/index.html)   (Asia- Pacific Data- Research Center, International Pacific Research Center) a Hawaii Egyetemen (Uh)  
*    [BCO- DMO WHOI](https://erddap.bco-dmo.org/erddap/index.html)   (Biológiai és kémiai oceanográfia Adatkezelő Hivatal a Woods Hole Oceanographic-nál Intézmény)  
*    [KANWIN ERDDAP™ ](https://canwinerddap.ad.umanitoba.ca/erddap/index.html)   (Canadian Watershed Information Network) a Föld-megfigyelési Központban (CEOS) Manitoba Egyetem
*    [CDIP](https://erddap.cdip.ucsd.edu/erddap/index.html)   (Partmenti információs program az UCSD-n)  
*    [CNR- ISP](https://data.iadc.cnr.it/erddap/index.html)   (Olasz Nemzeti Kutatási Tanács, Polar Sciences Intézet)  
* CSIRO és IMOS (Ausztrália Közösség Tudományos és Ipari Kutatási Szervezete és az Integrált Tengeri Megfigyelőrendszer) 
*    [DIVER ( NOAA ORR) ](https://pub-data.diver.orr.noaa.gov/erddap/index.html)   ( NOAA A válaszadási és helyreállítási hivatal)  
*    [EMODnet fizika](https://erddap.emodnet-physics.eu/erddap/index.html)   (Az európai tengeri megfigyelési és adathálózat - Fizika)  
*    [GOMR](https://erddap.griidc.org/erddap/index.html)   (Mexikói-öböl kutatási kezdeményezés)  
*    [Hakai Intézet](https://catalogue.hakai.org/erddap/index.html)   (A Hakai Intézet a brit Columbia középső partján, Kanada) 
*    [Középiskolai technológiai szolgáltatások](https://myhsts.org) , amely kódolási és technológiai képzést kínál a diákok és a felnőttek
*    [ICHEC](https://erddap.ichec.ie/erddap/index.html)   (Irish Centre for High- End Computing) 
*    [I NCO IS](https://erddap.incois.gov.in/erddap/index.html)   (Indiai Nemzeti Óceáninformációs Központ)  
* HIVATAL (Institut de Recherche pour le Développement, Franciaország)   
CNRS (Centre National de la Recherche Scientifique, Franciaország)   
UPMC (Université Pierre et Marie CURIE, Paris, Franciaország)   
UCAD (Université Cheikh Anta Diop de Dakar, Sénégal)   
UGB (Université Gaston Berger -- Saint- Louis du Sénégal)   
UFHB (Université Félix MAGYARORSZÁG, Abidjan, Elefántcsontpart)   
IPSL (Institut Pierre Simon Laplace des sciences de l 'environnement, Paris, Franciaország)   
LMI ECLAIRS (Laboratoire Mixte International "Etude du Climat en Afrique de l 'Ouest et de ses Interactions avec l' Environnement Régional, et appui aux services climatiques") 
* JRC (Európai Bizottság - Közös Kutatóközpont, Európai Unió) 
*    [A Tengerészeti Intézet](https://erddap.marine.ie/erddap/index.html)   (Írország)  
* Marine Instruments S.A. (Spanyolország) 
* NCI (Ausztrália nemzeti számítástechnikai infrastruktúrája) 
*    [ NOAA Part Watch](https://coastwatch.noaa.gov/erddap/index.html)   (központi)  
*    [ NOAA CoastWatch CGOM](https://cwcgom.aoml.noaa.gov/erddap/index.html)   (Karibi / Mexikói-öböl csomópontja)  
*    [ NOAA CoastWatch GLERL](https://coastwatch.glerl.noaa.gov/erddap/index.html)   (Nagy-tavak csomópontja)  
*    [ NOAA Part Watch West Coast](https://coastwatch.pfeg.noaa.gov/erddap/index.html) amely együtt található és működik
     [ NOAA   ERD ](https://coastwatch.pfeg.noaa.gov/erddap/index.html)   (Környezetvédelmi Kutatási Osztály SWFSC II. NMFS ) 
*    [ NOAA IOOS szenzorok](https://erddap.sensors.ioos.us/erddap/index.html)   (Integrált tengeri megfigyelési rendszer)  
*    [ NOAA IOOS Ce NCO OS](https://erddap.axiomdatascience.com/erddap/index.html)   (Közép- és Észak-Kalifornia Óceán Megfigyelő Rendszer, az Axiom Data Science működtetésével)  
*    [ NOAA IOOS GCOOS atmoszférikus és oceanográfiai adatok: Megfigyelési rendszer](https://erddap.gcoos.org/erddap/index.html)   
     [ NOAA IOOS GCOOS atmoszférikus és oceanográfiai adatok: Történelmi gyűjtemények](https://gcoos5.geos.tamu.edu/erddap/index.html)   
     [ NOAA IOOS GCOOS Biological and Socioeconomic](https://gcoos4.tamu.edu/erddap/index.html)   (Öböl-parti-óceáni megfigyelő rendszer) 
*    [ NOAA IOOS NERACOOS](http://www.neracoos.org/erddap/index.html)   (A parti és óceáni megfigyelő rendszerek északkeleti regionális szövetsége)  
*    [ NOAA IOOS NGDAC](https://data.ioos.us/gliders/erddap/index.html)   (National Glider Adatgyűjtő központ)  
*    NOAA IOOS NANOOS (Northwest Association of Networking Ocean Observing Systems) 
*    [ NOAA IOOS PACIOOS](https://pae-paha.pacioos.hawaii.edu/erddap/index.html)   (Csendes-óceáni megfigyelési rendszer) a Hawaii Egyetemen (Uh)  
*    NOAA IOOS SCCOOS (Dél-kaliforniai parti óceáni megfigyelő rendszer) 
*    [ NOAA IOOS SECOORA](https://erddap.secoora.org/erddap/index.html)   (Délkelet-parti Óceán Megfigyelő Regionális Egyesület)  
*    [ NOAA NCEI](https://www.ncei.noaa.gov/erddap/index.html)   (Nemzeti Környezetvédelmi Információs Központok)    
*    NOAA NGDC STP (Nemzeti geofizikai Data Center, Solar -- Szárazföldi Fizika) 
*    NOAA   NMFS NEFSC (Északkeleti Halászati Tudományos Központ) 
*    [ NOAA NOS CO- OPS](https://opendap.co-ops.nos.noaa.gov/erddap/index.html)   (Operatív Oceanográfiai Termékek és Szolgáltatások Központja)  
*    [ NOAA OSMC](http://osmc.noaa.gov/erddap/index.html)   (Megfigyelőrendszer Monitoring Center)  
*    [ NOAA PIFSC](https://oceanwatch.pifsc.noaa.gov/erddap/index.html)   (Csendes-óceáni szigetek Halászati Tudományos Központ)  
*    [ NOAA PMEL](https://data.pmel.noaa.gov/pmel/erddap/index.html) 
*    [ NOAA PolarWatch](https://polarwatch.noaa.gov/erddap/index.html) 
*    [ NOAA UAF](https://upwell.pfeg.noaa.gov/erddap/index.html)   (Egységes hozzáférési keret)  
*    [Ocean Networks Kanada](http://dap.onc.uvic.ca/erddap/index.html)  
*    [Óceánkövető hálózat](https://members.oceantrack.org/erddap/index.html)  
*    [OOI / összes adat](https://erddap-goldcopy.dataexplorer.oceanobservatories.org/erddap/index.html)   (Az Ocean Observatory Initiative)   
OOI / Számtalan adatok
* Princeton, Hydrometeorológiai Kutatócsoport
* R.Tech Engineering, Franciaország
*    [Rutgers Egyetem, Tengerészeti és Parttudományi Tanszék](https://tds.marine.rutgers.edu/erddap/index.html)   
* San Francisco Estuary Institute
*    [Scripps Institution of Oceanography, Spray Underwater Gliders](https://spraydata.ucsd.edu/erddap/index.html)  
*    [Smart Atlantic](https://www.smartatlantic.ca/erddap/index.html) Újfundlandi Emlékegyetem
* Dél-afrikai Környezetvédelmi Megfigyelési Hálózat
* Spyglass Technologies
* Stanford Egyetem, Hopkins Marine Station
*    [UNESCO-IODE](https://erddap.oa.iode.org/erddap/index.html)   (Nemzetközi Oceanográfiai és Információs Adatcsere)  
*    [University of British Columbia, Earth, Ocean & Atmoszféra Tudományos Osztály](https://salishsea.eos.ubc.ca/erddap/index.html)  
*    [Kaliforniai Egyetem, Davis, Bodega Tengeri Laboratórium](http://bmlsc.ucdavis.edu:8080/erddap/index.html)  
*    [University of Delaware, Satellite Receiving Station](https://basin.ceoe.udel.edu/erddap/index.html)  
* University of Washington, Alkalmazott Fizika Laboratórium
*    [USGS CMGP](https://geoport.usgs.esipfed.org/erddap/index.html)   (Part menti és tengeri geológiai program)  
*    [VOTO](https://erddap.observations.voiceoftheocean.org/erddap/index.html)   (Az óceán hangja, Svédország)  

Ez egy lista néhány szervezetről, ahol ERDDAP™ amelyet valamilyen személy vagy csoport telepített. Ez nem jelenti azt, hogy az egyén, a csoport vagy a szervezet ajánlja vagy támogatja ERDDAP .

###  ERDDAP™ ajánlott NOAA és CNRS{#erddap-is-recommended-within-noaa-and-cnrs} 
 [ NOAA Adathozzáférési eljárási irányelv](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations) magában foglalja ERDDAP™ az ajánlott adatszerverek listájában, NOAA . ERDDAP™ a
[Guide de bonnes pratiques sur la gestion des données de la recherche
 (Kutatási adatok kezelése Legjobb gyakorlatok útmutató) ] ( https://mi-gt-donnees.pages.math.unistra.fr/guide/04-traiter.html#deposer-et-structurer-dans-des-plateformes-de-gestion-de-donnees-locales ) A Centre National de la Recherche Scientifique (CNRS) Franciaországban.

## Slide Shows{#slide-shows} 

Itt van néhány PowerPoint diavetítés és dokumentumok, hogy Bob Simons létrehozott kapcsolódó ERDDAP .

 **A dokumentumok tartalma és véleménye Bob Simons személyes véleménye, és nem feltétlenül tükrözi a kormány vagy a National Oceanic and Atmospheric Administration .** 

A négy fő dokumentum:

*    [A fő bevezetés a ERDDAP™   (változat) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTalk5.pptx) .
Ön is [Nézd ezt a videót, amin Bob beszél.![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=H541G1XXZrU&t=4) .
*    [Egy oldal leírása ERDDAP™   (.pdf) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ERDDAP_OnePage.pdf) 
*    [ ERDDAP : Heavy Loads, Grids, Clusters, Federations, and Cloud Computing](/docs/server-admin/scaling) 
*    [Bob az adatelosztási rendszerekre vonatkozó iránymutatásai](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html) 

Egyéb előadások:

*    [2020 EDM: Új jellemzők ERDDAP™ v2.10](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapFeatures2.10.pptx) 
*    [2020- 05- 19 DMIT: Adatösszetétel](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapDataIngest.pptx)   (vagy [Nézd ezt a videót, amin Bob beszél.](https://www.youtube.com/watch?v=9ArYxgwON2k) .) 
*    [2019 IOOS DMAC: Új jellemzők ERDDAP™ v2.0](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/Erddapv2Features.pptx) 
*    [2018 Nyári ESIP: Subsetting In ERDDAP™ ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapSubset2018.pptx) 
*    [2018 Nyári ESIP: JSON támogatás ERDDAP™ ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapJson2018.pptx) 
*    [2018 EDM: A web szolgáltatások elosztott rendszere (Gyorsabb, könnyebb, kevésbé drága.)   (Vagy, hogy miért voltam boldog 4 évvel ezelőtt.) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/10P.04_Simons_DistributedWebServices2018.pptx) 
*    [2018 EDM: ERDDAP™ 2018-ban](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/7A4_Simons_ErddapSession2018.pptx) 
*    [2018 EDM: Új jellemzők ERDDAP™ Kép, Hang és Video adatok](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/4D4_Simons_ErddapMediaFiles2018.pptx) 
*    [2018 EDM: UAF és ERDDAP™ Megoldások az adatintegrációhoz](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/3D3_Simons_DataIntegration2018.pptx) 
*    [2017 EDM: Egy gyors bevezetés ERDDAP ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapIntro.pptx) 
*    [2017 EDM és 2017 IOOS: Új vagy kis ismert ERDDAP™ Jellemzők (felhasználók számára) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapUserFeatures2017.pptx) 
*    [2017 EDM és 2017 IOOS: Új vagy kis ismert ERDDAP™ Jellemzők (adminisztrátorok esetében) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapAdminFeatures2017.pptx) 
*    [2017 EDM: EML, KNB, és ERDDAP ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/eml_knb_erddap.pptx) 
*    [2017 EDM: Hogyan jutnak el az adatok a forrástól a végfelhasználóig? Old School versus New School](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OldSchoolNewSchool.pptx) 
*    [2016 Nyári ESIP: A nagy kép: PARR, OPeNDAP , ERDDAP™ és adatelosztás](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheBigPicture.pptx) 
*    [2016 EDM: Egy és kész](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OneAndDone.pptx) 
*    [2016 Gov API: Következő generáció Adatszerverek](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/NextGeneration.pptx) 
*    [2015 Nyári ESIP: táblázatos aggregáció](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularAggregation.pptx) 
*    [2014 EDM: Bob Do 's and Don' t for Tabular Data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsDosDontsTabular.pptx) 
*    [2014 EDM: Az ideális felhasználói felület](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheIdealUserInterface.pptx) 
*    [2014 Nyári ESIP: táblázatos adatok](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularData.pptx) 
*    [2013: Ne kezelje az in- Situ és táblázatos adatok, mint a gridded adatok](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TablesAndGrids.html) 
*    [2013 EDM: Tenni többet kevesebbel](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/DoMoreWithLess.ppt) 
*    [2012. évi EDM: az adatelosztási rendszerekre vonatkozó iránymutatások](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/guidelines3.ppt) 

Más emberek előadásai:

*    [A globális adatok megosztásának javítására szolgáló FAIR-alapú eszköz![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=kdBTgNEp5TA&ab_channel=GOOSIOC)   
by Kevin O 'Brien at the Global Ocean Observing System (GOOS) Webinar / Megfigyelési Koordinációs Csoport (OCG) Sorozat / 1, November 12, 2020.
*    [Építése saját időjárás App használata NOAA Nyitott adat- és adatbázisok![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=MF-WH01Qw0g)   
Írta Filipe Fernandes és Rich Signell a SciPy 2018, július 13, 2018.
*    [Az OOI használata ERDDAP ![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=tj4M9hodTG0)   
by Rich Signell, February 2018.
*    [ESIP Tech Dive: " ERDDAP Villám beszél "![YouTube](/img/youtube.png)](https://youtu.be/2-ydBByYB0M?t=160)   
Nyolc 5 perces beszélgetés érdekes dolgokról, amiket az emberek csinálnak ERDDAP by Jenn Sevadjian, Jim Potemra, Conor Delaney, Kevin O 'Brien, John Kerfoot, Stephanie Petillo, Charles Carleton and Eli Hunter presented as a SSIP Tech Dive on August 31, 2017.
*    [Felhasználás ERDDAP™ A táblázatos adatokhoz való hozzáférés![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=_BwMHRh7CS8)   
írta Rich Signell, Augusztus 2015.
*    [Vizsgálat ERDDAP™ a kék szén adatai esetében![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=TbOhElC_-qU)   
írta Rich Signell, Augusztus 2015.
*    [Az adatok használata ERDDAP™ in NOAA s GNOME Szoftver![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=18xZoXu1USM) .
Ebben a videóban Rich Signell letölti az óceán áramlatait ERDDAP™ hogy modellezni egy mérgező szivárgás az óceánban [ NOAA s GNOME szoftver](https://response.restoration.noaa.gov/oil-and-chemical-spills/oil-spills/response-tools/gnome.html)   (5 perc múlva&#33;) . (Egy apró hiba a videóban: az adatkészletek keresésekor ne használja ÉS a keresési feltételek között. Ez implicit.) Rich Signell, 2011. április 8.
