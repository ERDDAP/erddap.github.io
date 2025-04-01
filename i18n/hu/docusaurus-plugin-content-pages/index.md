---
title: "ERDDAP™ Documentation"
---
## LegutóbbERDDAP™verzió{#latest-erddap-version} 

2.26 lásd:[változások dokumentáció](/changes#version-226)és[Töltse le](https://github.com/ERDDAP/erddap/releases/tag/v2.26.0)...

## ERDDAP™információ{#erddap-information} 

ERDDAP™egy tudományos adatkiszolgáló, amely egyszerű, következetes módja annak, hogy letöltse az alkészleteket
fúrt és mesés tudományos adatkészletek közös fájlformátumokban, és grafikonokat és térképeket készítenek.
ERDDAP™Ingyenes és nyílt forráskód (Apache és Apache-szerű)  JavaSzervizNOAA NMFS SWFSCKörnyezetkutatási osztály (ERD) ...

* Látni / használni egyERDDAP™telepítés:[ https://coastwatch.pfeg.noaa.gov/erddap/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/index.html)
* Kezdeni egy telepítési olvasással[A telepítő útmutató](/docs/server-admin/deploy-install)...
* A kód hozzáadásához lásd a[programozó útmutatója](/docs/contributing/programmer-guide)...


Az alábbiakban megtalálja a releváns linkeket a kérdések megkérésére, és hogyan kell hozzájárulni.
* Tekintse meg a beszélgetéseket és kérdéseket tegyen fel[ https://groups.google.com/g/erddap ](https://groups.google.com/g/erddap)vagy[ https://github.com/erddap/erddap/discussions ](https://github.com/erddap/erddap/discussions)
* Felülvizsgálati és benyújtási kérdéseket[ https://github.com/erddap/erddap/issues ](https://github.com/erddap/erddap/issues)
* A szolgáltatási kérelmek javasolásához kövesse ezt az iránymutatást:[ERDDAPBeszélgetések #93 (Hozzászólás) ](https://github.com/ERDDAP/erddap/discussions/93#discussion-4920427)


## Keresés többszörösERDDAP™s
Két módja van a keresés többERDDAP™s az adatkészletek esetében:[Keresés többszörösERDDAP™s](/SearchMultipleERDDAPs.html)és[ERDDAP™Adatkészlet felfedezése](http://erddap.com/)...


## Állítsa be sajátjátERDDAP™ {#set-up-your-own-erddap} 

ERDDAP™egy[Ingyenes és nyitott forrás](https://en.wikipedia.org/wiki/Free_and_open-source_software)All-Java  (servlet) , webes alkalmazás, amely egy webes alkalmazáskiszolgálóban fut (Például Tomcat (ajánlott) vagy Jetty (működik, de nem támogatjuk) ) ... Ez a weboldal többnyire az emberek számára ("..."ERDDAP™adminisztrátorok") Ki akarja létrehozni a sajátERDDAP™telepítés saját honlapján.

Kezdeni egy telepítési olvasással[A telepítő útmutató](/docs/server-admin/deploy-install)...

### Miért használjaERDDAP™Adatainak terjesztése?{#why-use-erddap-to-distribute-your-data} 

Mert a kis erőfeszítés a felállításraERDDAP™sok előnyt hoz.

* Ha már rendelkezik internetes szolgáltatással az adatok terjesztéséhez,
beállításaERDDAP™az adatokhoz való hozzáférés a meglévő szolgáltatáson keresztül.
Vagy létrehozhatERDDAP™az adatok közvetlenül a helyi fájlokból való hozzáféréséhez.
* Minden adatkészlet esetében csak egy kis darab XML-t kell írnia, hogy elmondjaERDDAP™hogyan lehet hozzáférni az adatkészlethez.
* Egyszer márERDDAP™az Ön adatainak kiszolgálása, a végfelhasználók:
    * Az adatok különféle módokon történő kérése (DAP,WMSés még inkább a jövőben) ...
    * Szerezd meg az adatválaszot különböző fájlformátumokban. (Ez valószínűleg a legnagyobb ok&#33;) 
    * Készítsen grafikonokat és térképeket. (Mindenki szereti a szép képeket.) 
    * Építs más hasznos és érdekes dolgokat a tetejénERDDAPwebszolgáltatások - lásd[Awesome ERDDAPTM](https://github.com/IrishMarineInstitute/awesome-erddap)Félelmetes listaERDDAP- kapcsolódó projektek.

Lehet[testreszabása](/docs/server-admin/deploy-install#customize)TeERDDAP"Úgy tűnik,ERDDAP™tükrözi a szervezetet, és illeszkedik a webhely többi részéhez.

## Kemény a telepítési eljárás? Megtehetem?{#is-the-installation-procedure-hard-can-i-do-it} 

A kezdeti telepítés egy kis időt vesz igénybe, de nem nagyon nehéz. Meg tudod csinálni. Ha megragadsz, e-mailt küldjerd dot data at noaa dot gov... Segíteni fogok.
Vagy csatlakozhatsz[ERDDAP™Google Group / Mailing List](https://groups.google.com/g/erddap)és tegye közzé ott a kérdést.

## Ki használjaERDDAP™ {#who-uses-erddap} 

ERDDAP™legalább 17 országban mintegy 100 szervezet telepítette

 (Ausztrália, Belgium, Kanada, Kína, Franciaország, India, Írország, Olaszország, Új-Zéland, Oroszország, Dél-Afrika, Spanyolország, Srí Lanka, Svédország, Thaiföld, Egyesült Királyság, USA) beleértve:

*   [APDRC](https://apdrc.soest.hawaii.edu/erddap/index.html)  (Ázsia-Pacific Data-Research Center, Nemzetközi Csendes-óceáni Kutatóközpont) a University of Hawaii (UH)  
*   [BCO-DMO WHOI](https://erddap.bco-dmo.org/erddap/index.html)  (Biológiai és kémiai óceánográfia Adatkezelő iroda a Woods Hole Oceanographic-ban intézmény)  
*   [CanWINERDDAP™](https://canwinerddap.ad.umanitoba.ca/erddap/index.html)  (Kanadai Watershed információs hálózat) a Földmegfigyelési Tudomány Központjában (CEOS) University of Manitoba
*   [CDIP](https://erddap.cdip.ucsd.edu/erddap/index.html)  (A part menti adatinformációs program az UCSD-nél)  
*   [CNR-ISP](https://data.iadc.cnr.it/erddap/index.html)  (Nemzeti Kutatási Tanács Olaszországban, Polar Sciences Intézet)  
* CSIRO és IMOS (Ausztrália közös tudományos és ipari kutatási szervezete és az integrált tengeri megfigyelő rendszer) 
*   [DIVER (NOAAVagy) ](https://pub-data.diver.orr.noaa.gov/erddap/index.html)  (NOAAVálasz és helyreállítás hivatala)  
*   [EMODnet fizika](https://erddap.emodnet-physics.eu/erddap/index.html)  (Az Európai Tengerészeti Megfigyelés és Adathálózat - Fizika)  
*   [GoMRI](https://erddap.griidc.org/erddap/index.html)  (Mexikói kutatási kezdeményezés öbölje)  
*   [Hakai Intézet](https://catalogue.hakai.org/erddap/index.html)  (A Hakai Intézet a British Columbia középső partján, Kanada) 
*   [High School Technology Szolgáltatások](https://myhsts.org), amely kódolási és technológiai képzést kínál a diákok és a felnőttek számára
*   [ICHEC](https://erddap.ichec.ie/erddap/index.html)  (Irish Centre for High-End Computing) 
*   [Én vagyokNCOIS](https://erddap.incois.gov.in/erddap/index.html)  (Indiai Nemzeti Központ az Ocean Information Services számára)  
* IRD (Institut de Recherche pour le Djepppement, Franciaország)   
CNRS (Centre National de la Recherche Scientifique, Franciaország)   
UPMC (Université Pierre et Marie CURIE, Párizs, Franciaország)   
UCAD (Université Cheikh Anta Diop de Dakar, Sénégal)   
UGB (Université Gaston Berger - Saint-Louis du Sénégal)   
UFHB (Université Félix HOUPHOUËT-BOIGNY, Abidjan, Côte d'Ivoire)   
IPSL (Pierre Simon Laplace intézet des Sciences de l'environnement, Párizs, Franciaország)   
LMI ECLAIRS (Laboratoire Mixte International "Etude du Climat en Afrique de l'Ouest et de ses Interactions avec l'Environnement Régional, et appui segédszolgálati klimatatiques") 
* JRC (Európai Bizottság – Közös Kutatóközpont, Európai Unió) 
*   [A Tengerészeti Intézet](https://erddap.marine.ie/erddap/index.html)  (Írország)  
* Tengeri eszközök S.A. (Spanyolország) 
* NCI (Ausztrália nemzeti számítástechnikai infrastruktúra) 
*   [NOAACoastWatch](https://coastwatch.noaa.gov/erddap/index.html)  (központi központ)  
*   [NOAACoastWatch CGOM](https://cwcgom.aoml.noaa.gov/erddap/index.html)  (Mexikói Node karibi/gulf)  
*   [NOAACoastWatch GLERL](https://coastwatch.glerl.noaa.gov/erddap/index.html)  (Great Lakes Node)  
*   [NOAACoastWatch West partvidék](https://coastwatch.pfeg.noaa.gov/erddap/index.html)amely együttműködik és működik
    [NOAA ERD](https://coastwatch.pfeg.noaa.gov/erddap/index.html)  (Környezetkutatási osztálySWFSCaNMFS) 
*   [NOAAIOOS érzékelők](https://erddap.sensors.ioos.us/erddap/index.html)  (Integrált Ocean megfigyelő rendszer)  
*   [NOAAIOOS CeNCOOS](https://erddap.axiomdatascience.com/erddap/index.html)  (Közép- és Észak-Kaliforniai óceán megfigyelő rendszere, amelyet az Axiom Data Science vezet)  
*   [NOAAIOOS GCOOS légköri és Oceanographic adatok: megfigyelő rendszer](https://erddap.gcoos.org/erddap/index.html)  
    [NOAAIOOS GCOOS légköri és Oceanográfiai adatok: Történelmi gyűjtemények](https://gcoos5.geos.tamu.edu/erddap/index.html)  
    [NOAAIOOS GCOOS biológiai és társadalmi-gazdasági](https://gcoos4.tamu.edu/erddap/index.html)  (Gulf Coast Ocean megfigyelő rendszer) 
*   [NOAAIOOS NERACOOS](http://www.neracoos.org/erddap/index.html)  (A part menti és óceáni megfigyelő rendszerek északkeleti regionális társulása)  
*   [NOAAIOOS NGDAC](https://data.ioos.us/gliders/erddap/index.html)  (Nemzeti Glider Adatgyűjtő központ)  
*   NOAAIOOS NANOOS (A hálózati óceán megfigyelő rendszerek északnyugati társulása) 
*   [NOAAIOOS PacIOOS](https://pae-paha.pacioos.hawaii.edu/erddap/index.html)  (Pacific Islands Ocean megfigyelő rendszer) a University of Hawaii (UH)  
*   NOAAIOOS SCCOOS (Dél-Kaliforniai part menti óceán megfigyelő rendszer) 
*   [NOAAIOOS SECOORA](https://erddap.secoora.org/erddap/index.html)  (Délkelet-parti óceán megfigyeli a regionális társulást)  
*   [NOAANCEI](https://www.ncei.noaa.gov/erddap/index.html)  (Nemzeti központok a környezeti információkhoz)    
*   NOAANGDC STP (Nemzeti Geofizikai Data Center, Solar - Terrestrial Fizika) 
*   NOAA NMFSNEFSC (Északkelet-halásztudományi központ) 
*   [NOAANOS CO-OPS](https://opendap.co-ops.nos.noaa.gov/erddap/index.html)  (Operatív Oceanográfiai termékek és szolgáltatások központja)  
*   [NOAAOSMC](http://osmc.noaa.gov/erddap/index.html)  (Megfigyelés System Monitoring Center)  
*   [NOAAPIFSC](https://oceanwatch.pifsc.noaa.gov/erddap/index.html)  (Pacific Islands Halászati Tudományos Központ)  
*   [NOAAPMEL](https://data.pmel.noaa.gov/pmel/erddap/index.html)
*   [NOAAPolarWatch](https://polarwatch.noaa.gov/erddap/index.html)
*   [NOAAUAF](https://upwell.pfeg.noaa.gov/erddap/index.html)  (Egységes hozzáférési keret)  
*   [Ocean Networks Kanada](http://dap.onc.uvic.ca/erddap/index.html) 
*   [Ocean Tracking hálózat](https://members.oceantrack.org/erddap/index.html) 
*   [OOI / Minden adat](https://erddap-goldcopy.dataexplorer.oceanobservatories.org/erddap/index.html)  (Ocean Observators Kezdeményezés)   
OOI / képtelen adatok
* Princeton, Hydrometeorológiai Kutatócsoport
* R.Tech Engineering, Franciaország
*   [Rutgers University, a tengeri és part menti tudományok osztálya](https://tds.marine.rutgers.edu/erddap/index.html)  
* San Francisco Estuary Institute
*   [Scripps Institution of Oceanography, Spray Underwater Gliders](https://spraydata.ucsd.edu/erddap/index.html) 
*   [intelligens atlanti](https://www.smartatlantic.ca/erddap/index.html)Memorial University of Newfoundland
* Dél-afrikai környezetvédelmi megfigyelő hálózat
* Spyglass Technologies
* Stanford Egyetem, Hopkins tengeri állomás
*   [UNESCO IODE](https://erddap.oa.iode.org/erddap/index.html)  (Nemzetközi Oceanográfia és információ Adatcsere)  
*   [University of British Columbia, Föld, óceán és légkör Tudományos osztály](https://salishsea.eos.ubc.ca/erddap/index.html) 
*   [University of California at Davis, Bodega tengeri laboratórium](http://bmlsc.ucdavis.edu:8080/erddap/index.html) 
*   [Delaware Egyetem, Satellite Receiving Station](https://basin.ceoe.udel.edu/erddap/index.html) 
* University of Washington, Alkalmazott fizika laboratórium
*   [USGS CMGP](https://geoport.usgs.esipfed.org/erddap/index.html)  (part menti és tengeri geoológiai program)  
*   [VOTO](https://erddap.observations.voiceoftheocean.org/erddap/index.html)  (Az óceán hangja, Svédország)  

Ez csak néhány olyan szervezet listája, aholERDDAP™egyes egyén vagy néhány csoport telepítette. Nem jelenti azt, hogy az egyén, a csoport vagy a szervezet ajánlja vagy támogatjaERDDAP...

### ERDDAP™ajánlott belülNOAACNRS{#erddap-is-recommended-within-noaa-and-cnrs} 
[NOAAAdathozzáférési eljárási irányelv](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations)tartalmazzaERDDAP™az ajánlott adatkiszolgálók listáján csoportok általi használatraNOAA...ERDDAP™kedvezően említik a 4.2.3. szakaszban
[Guide de bonnes pratiques sur la gestion des données de la reherche
 (Kutatási adatok kezelése Legjobb gyakorlatok útmutató) ] ( https://mi-gt-donnees.pages.math.unistra.fr/guide/04-traiter.html#deposer-et-structurer-dans-des-plateformes-de-gestion-de-donnees-locales ) a Centre National de la Recherche Scientifique (CNRS) Franciaországban.

## Slide Shows{#slide-shows} 

Íme néhány PowerPoint csúszó show és dokumentum, amit Bob Simons hoztak létre aERDDAP...

 **DISCLAIMER: Az ilyen dokumentumokban kifejezett tartalmak és vélemények Bob Simons személyes véleményei, és nem feltétlenül tükrözik a kormány vagy aNational Oceanic and Atmospheric Administration...** 

A négy fő dokumentum:

*   [A fő bevezetés aERDDAP™  (verzió 5) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTalk5.pptx)...
Ön is[nézd meg a Bob videóját, hogy ezt a beszélgetést![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=H541G1XXZrU&t=4)...
*   [Egy oldal leírásaERDDAP™  (.pdf) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ERDDAP_OnePage.pdf)
*   [ERDDAPHeavy Loads, Grids, Klaszterek, Föderációk és Cloud Computing](/docs/server-admin/scaling)
*   [Bob az adatelosztási rendszerek iránymutatásai](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html)

Egyéb előadások:

*   [2020 EDM: Új funkciókERDDAP™v2.10](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapFeatures2.10.pptx)
*   [2020-05-19 DMIT: Data Ingest](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapDataIngest.pptx)  (Vagy[nézd meg a Bob videóját, hogy ezt a beszélgetést](https://www.youtube.com/watch?v=9ArYxgwON2k)...) 
*   [2019 IOOS DMAC: Új funkciókERDDAP™v2.0](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/Erddapv2Features.pptx)
*   [2018. Nyári ESIP: BeállításERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapSubset2018.pptx)
*   [2018. Nyári ESIP: JSON támogatásERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapJson2018.pptx)
*   [2018 EDM: Webszolgáltatások elosztott rendszere (Gyorsabb, könnyebb, kevesebb költséges)   (Vagy miért boldog voltam 4 évvel ezelőtt.) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/10P.04_Simons_DistributedWebServices2018.pptx)
*   [2018 EDM:ERDDAP™2018-ban](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/7A4_Simons_ErddapSession2018.pptx)
*   [2018 EDM: Új funkciókERDDAP™Image, Audio és videó adatok](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/4D4_Simons_ErddapMediaFiles2018.pptx)
*   [2018 EDM: UAF ésERDDAP™Az adatintegráció megoldásai](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/3D3_Simons_DataIntegration2018.pptx)
*   [2017 EDM: Gyors bevezetőERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapIntro.pptx)
*   [2017 EDM és 2017 IOOS: New vagy Little KnownERDDAP™Jellemzők (Felhasználóknak) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapUserFeatures2017.pptx)
*   [2017 EDM és 2017 IOOS: New vagy Little KnownERDDAP™Jellemzők (Adminisztrátorok) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapAdminFeatures2017.pptx)
*   [2017 EDM: EML, KNB ésERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/eml_knb_erddap.pptx)
*   [2017. évi 2017 EDM: Hogyan jut az adatok a forrásból a végfelhasználóba? Old School versus New School](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OldSchoolNewSchool.pptx)
*   [2016 2016 2016 Nyári ESIP: A nagy kép: PARR,OPeNDAP,ERDDAP™, és adatelosztás](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheBigPicture.pptx)
*   [2016 EDM: One And Done](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OneAndDone.pptx)
*   [2016 2016 2016 Gov API: Következő generáció Adatkiszolgáló](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/NextGeneration.pptx)
*   [2015. Nyári ESIP: Tabular Aggregation](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularAggregation.pptx)
*   [2014 EDM: Bob Do's és Don’t for Tabular Data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsDosDontsTabular.pptx)
*   [2014 EDM: Az ideális felhasználói felület](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheIdealUserInterface.pptx)
*   [2014. Nyári ESIP: Tabular Data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularData.pptx)
*   [2013: Ne kezelje az In-Situ és a Tabular adatokat, mint a megrúgott adatok](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TablesAndGrids.html)
*   [2013 EDM: többet kevesebbel](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/DoMoreWithLess.ppt)
*   [2012 EDM: Az adatelosztási rendszerek iránymutatásai](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/guidelines3.ppt)

Más emberek előadásai:

*   [FAIR alapú eszköz a globális adatmegosztás javítására![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=kdBTgNEp5TA&ab_channel=GOOSIOC)  
Kevin O'Brien a Globális óceán megfigyelő rendszerén (GOOS) Webinárium / megfigyelési koordinációs csoport (OCG) Sorozat / 1, 2020. november 12.
*   [Építsd meg a saját időjárási alkalmazásodatNOAANyitott adatok és Jupyter Notebookok![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=MF-WH01Qw0g)  
Filipe Fernandes és Rich Signell a SciPy 2018-ban, 2018. július 13.
*   [Az OOI használataERDDAP![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=tj4M9hodTG0)  
Rich Signell, 2018. február.
*   [ESIP Tech Dive: "ERDDAPLightning beszélgetések"![YouTube](/img/youtube.png)](https://youtu.be/2-ydBByYB0M?t=160)  
Nyolc 5 perces beszélgetés az érdekes dolgokról, amelyeket az emberek csinálnakERDDAPJenn Sevadjian, Jim Potemra, Conor Delaney, Kevin O'Brien, John Kerfoot, Stephanie Petillo, Charles Carleton és Eli Hunter 2017. augusztus 31-én bemutatták az ESIP Tech Dive-t.
*   [HasználatERDDAP™Az Access Tabular adatokhoz![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=_BwMHRh7CS8)  
Rich Signell, 2015. augusztus.
*   [Teszt használataERDDAP™Kék szénadat![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=TbOhElC_-qU)  
Rich Signell, 2015. augusztus.
*   [Adatok felhasználása az adatokbólERDDAP™benneNOAAAGNOMEszoftver![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=18xZoXu1USM)...
Ebben a videóban Rich Signell letölti az óceán áramlatait az adatok előrejelzéseERDDAP™toxikus tabletta modellezése az óceánban[NOAAAGNOMEszoftver](https://response.restoration.noaa.gov/oil-and-chemical-spills/oil-spills/response-tools/gnome.html)  (5 perc alatt&#33;) ... (Egy apró hiba a videóban: az adatkészletek keresésekor ne használjon ÉS a keresési feltételek között. Ez implicit.) Rich Signell, 2011. április 8.
