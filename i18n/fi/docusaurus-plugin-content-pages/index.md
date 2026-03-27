---
title: "ERDDAP™ Documentation"
---
## Uusin ERDDAP™ versio{#latest-erddap-version} 

2. 30. 0, ks. [muutokset](/changes#version-2300) sekä [lataa se](https://github.com/ERDDAP/erddap/releases/tag/v2.30.0) .

##  ERDDAP™ tiedot{#erddap-information} 

 ERDDAP™ on tieteellinen tietopalvelin, joka antaa käyttäjille yksinkertainen, johdonmukainen tapa ladata subsets
ruudutetut ja taulukkotieteelliset aineistot yhteisiä tiedostomuotoja ja tehdä kaavioita ja karttoja.
 ERDDAP™ on vapaa ja avoin lähdekoodi (Apassit ja apassit)   Java Palvele NOAA   NMFS   SWFSC Ympäristötutkimuksen osasto ( ERD ) .

* Nähdä / käyttää ERDDAP™ asennus: [ https://coastwatch.pfeg.noaa.gov/erddap/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/index.html) 
* Aloittaa asennus lukea [Asennusopas](/docs/server-admin/deploy-install) .
* Jos haluat antaa koodin, katso [Ohjelmoijan opas](/docs/contributing/programmer-guide) .


Alla on linkkejä kysymyksiin ja miten osallistua.
* Tarkastele keskusteluja ja kysy kysymyksiä osoitteessa [ https://groups.google.com/g/erddap ](https://groups.google.com/g/erddap) tai [ https://github.com/erddap/erddap/discussions ](https://github.com/erddap/erddap/discussions) 
* Tarkistaa ja toimittaa kysymyksiä [ https://github.com/erddap/erddap/issues ](https://github.com/erddap/erddap/issues) 
* Esittääksesi ominaisuuspyyntöjä, noudata näitä ohjeita: [ ERDDAP Keskustelut #93 (kommentti) ](https://github.com/ERDDAP/erddap/discussions/93#discussion-4920427) 


## Etsi useita ERDDAP™ tilu
On kaksi tapaa etsiä useita ERDDAP™ s tietokokonaisuuksien osalta: [Etsi useita ERDDAP™ tilu](/SearchMultipleERDDAPs.html) sekä [ ERDDAP™ Dataset Discovery](http://erddap.com/) .


## Aseta oma ERDDAP™  {#set-up-your-own-erddap} 

 ERDDAP™ a [Vapaa ja avoin lähdekoodi](https://en.wikipedia.org/wiki/Free_and_open-source_software) , kaikki- Java   (serveti) , web-sovellus, joka toimii web-sovelluspalvelimella (Esimerkiksi Tomcat (suositellaan) Tai Jetty. (Se toimii, mutta emme tue sitä.) ) . Tämä sivu on enimmäkseen ihmisille (" ERDDAP™ hallintovirkamiehet") jotka haluavat perustaa oman ERDDAP™ asennus omalla sivustollaan.

Aloittaa asennus lukea [Asennusopas](/docs/server-admin/deploy-install) .

### Miksi käytät ERDDAP™ Jakamaan tietojasi?{#why-use-erddap-to-distribute-your-data} 

Koska pienet ponnistelut ERDDAP™ Se tuo monia etuja.

* Jos sinulla on jo verkkopalvelu tietojen jakamiseen,
Voit asettaa ERDDAP™ päästä käsiksi tietoihin olemassa olevan palvelun kautta.
Tai voit järjestää ERDDAP™ käyttää tietoja suoraan paikallisista tiedostoista.
* Kunkin tiedoston, sinun tarvitsee vain kirjoittaa pieni osa XML kertoa ERDDAP™ miten tiedostoon pääsee käsiksi.
* Kun olet ERDDAP™ loppukäyttäjät voivat:
    * Pyydä tietoja eri tavoin ( DAP , WMS , ja enemmän tulevaisuudessa) .
    * Saada data vastaus eri tiedostomuodoissa. (Se on luultavasti suurin syy&#33;) 
    * Tee kaavioita ja karttoja. (Kaikki pitävät kauniista kuvista.) 
    * Rakenna muita hyödyllisiä ja mielenkiintoisia asioita päälle ERDDAP Internet-palvelut -- katso [ Awesome ERDDAP TM](https://github.com/IrishMarineInstitute/awesome-erddap) luettelo mahtavista ERDDAP - liittyvät hankkeet.

Voit. [muokkaa](/docs/server-admin/deploy-install#customize) sinun ERDDAP ' s ulkonäkö niin ERDDAP™ heijastaa organisaatiosi ja sopii muun sivuston.

## Onko asennusprosessi vaikea? Voinko tehdä sen?{#is-the-installation-procedure-hard-can-i-do-it} 

Alkuperäinen asennus kestää jonkin aikaa, mutta se ei ole kovin vaikeaa. Pystyt siihen. Jos jäät kiinni, lähetä sähköpostia. erd dot data at noaa dot gov . Autan sinua.
Tai voit liittyä [ ERDDAP™ Google Group / Postituslista](https://groups.google.com/g/erddap) Ja lähetä kysymyksesi sinne.

## Kuka käyttää ERDDAP™  {#who-uses-erddap} 

 ERDDAP™ on asentanut noin 100 organisaatiota vähintään 17 maassa

 (Australia, Belgia, Kanada, Kiina, Ranska, Intia, Irlanti, Italia, Uusi-Seelanti, Venäjä, Etelä-Afrikka, Espanja, Sri Lanka, Ruotsi, Thaimaa, Yhdistynyt kuningaskunta, Yhdysvallat) , mukaan lukien

*    [APDRC](https://apdrc.soest.hawaii.edu/erddap/index.html)   (Aasian ja Tyynenmeren tutkimuskeskus, International Pacific Research Center) Havaijin yliopistossa (UH)  
*    [BCO-DMO WHO:ssa](https://erddap.bco-dmo.org/erddap/index.html)   (Biologinen ja kemiallinen merentutkimus Woods Hole Oceanographicin tiedonhallintatoimisto Toimielin)  
*    [CanWIN ERDDAP™ ](https://canwinerddap.ad.umanitoba.ca/erddap/index.html)   (Canadian Watershed Information Network) Maanhavainnointitieteiden keskuksessa (Toimitusjohtajat) , Manitoban yliopisto
*    [CDIP](https://erddap.cdip.ucsd.edu/erddap/index.html)   (Coastal Data Information Program UCSD:ssä)  
*    [CNR-ISP](https://data.iadc.cnr.it/erddap/index.html)   (Italian kansallinen tutkimusneuvosto, Polar Sciences Institute)  
* CSIRO ja IMOS (Australian Commonwealth Scientific and Industrial Research Organization and the Integrated Marine Observing System) 
*    [DIVER ( NOAA ORR) ](https://pub-data.diver.orr.noaa.gov/erddap/index.html)   ( NOAA Response and restauration Office)  
*    [EMODnet-fysiikka](https://erddap.emodnet-physics.eu/erddap/index.html)   (Euroopan meripoliittinen seurantakeskus ja tietoverkko - fysiikka)  
*    [GoMRI](https://erddap.griidc.org/erddap/index.html)   (Meksikonlahden tutkimusaloite)  
*    [Hakai-instituutti](https://catalogue.hakai.org/erddap/index.html)   (Hakai-instituutti Brittiläisen Kolumbian keskirannikolla, Kanada) 
*    [Lukion teknologiapalvelut](https://myhsts.org) , joka tarjoaa koodausta ja teknologiaa koulutusta opiskelijoille ja aikuisille
*    [ICHEC](https://erddap.ichec.ie/erddap/index.html)   (Irish Centre for High-End Computing) 
*    [I NCO IS](https://erddap.incois.gov.in/erddap/index.html)   (Intian valtameriä koskevien tietopalvelujen kansallinen keskus)  
* IRD (Institut de Recherche pour le Développement, Ranska)   
CNRS (Centre National de la Recherche Scientifique, Ranska)   
UPMC (Université Pierre et Marie CURIE, Pariisi. Ranska)   
UCAD (Université Cheikh Anta Diop de Dakar, Sénégal)   
UGB (Université Gaston Berger -- Saint-Louis du Sénégal)   
MT7206 Euroopan unionin toimielimet (Université Félix HOufou.T-BOIGNY, Abidjan, Norsunluurannikko)   
IPSL (Institut Pierre Simon Laplace des sciences de l'environnement, Pariisi Ranska)   
LMI ECLAIRS (Laboratoire Mixte International Environnement Réregional, et apui aux services climatiques) 
* JRC (Euroopan komissio - Yhteinen tutkimuskeskus, Euroopan unioni) 
*    [Marine Institute](https://erddap.marine.ie/erddap/index.html)   (Irlanti)  
* Marine Instruments SA. (Espanja) 
* NCI (Australian kansallinen laskentainfrastruktuuri) 
*    [ NOAA CoastWatch](https://coastwatch.noaa.gov/erddap/index.html)   (keskus)  
*    [ NOAA CoastWatch CGOM](https://cwcgom.aoml.noaa.gov/erddap/index.html)   (Karibia/Meksikon lahti)  
*    [ NOAA CoastWatch GLERL](https://coastwatch.glerl.noaa.gov/erddap/index.html)   (Suuret järvet)  
*    [ NOAA CoastWatch länsirannikko](https://coastwatch.pfeg.noaa.gov/erddap/index.html) joka sijaitsee ja toimii
     [ NOAA   ERD ](https://coastwatch.pfeg.noaa.gov/erddap/index.html)   (Ympäristötutkimuksen osasto SWFSC / NMFS ) 
*    [ NOAA IOOS-anturit](https://erddap.sensors.ioos.us/erddap/index.html)   (Integroitu valtamerien havainnointijärjestelmä)  
*    [ NOAA IOOS Ce NCO OS](https://erddap.axiomdatascience.com/erddap/index.html)   (Keski- ja Pohjois-Kalifornia Ocean Observing System, jota johtaa Axiom Data Science)  
*    [ NOAA IOOS GCOOS-ilmakehän ja merimaan tiedot: havaintojärjestelmä](https://erddap.gcoos.org/erddap/index.html)   
     [ NOAA IOOS GCOOS Ilmakehän ja merentutkimusaineisto: Historialliset kokoelmat](https://gcoos5.geos.tamu.edu/erddap/index.html)   
     [ NOAA IOOS GCOOS Biologinen ja sosioekonominen](https://gcoos4.tamu.edu/erddap/index.html)   (Persianlahden rannikon havainnointijärjestelmä) 
*    [ NOAA IOOS NERACOOS](http://www.neracoos.org/erddap/index.html)   (Koillisen rannikko- ja valtamerien havaintojärjestelmien liitto)  
*    [ NOAA IOOS NGDAC](https://data.ioos.us/gliders/erddap/index.html)   (Kansallinen liitin Datan kokoamiskeskus)  
*    NOAA IOOS NANOOS (Northwest Association of Networked Ocean Observing Systems) 
*    [ NOAA IOOS PacIOOS](https://pae-paha.pacioos.hawaii.edu/erddap/index.html)   (Tyynenmeren saarten havainnointijärjestelmä) Havaijin yliopistossa (UH)  
*    NOAA IOOS SCKOOS (Southern California Coastal Ocean Observation System) 
*    [ NOAA IOOS SECOORA](https://erddap.secoora.org/erddap/index.html)   (Kaakkois-Rannan havaintoalueyhdistys)  
*    [ NOAA NCEI](https://www.ncei.noaa.gov/erddap/index.html)   (Kansalliset ympäristötietokeskukset)    
*    NOAA NGDC STP (Kansallinen geofyysinen Data Center, Solar - maafysiikka) 
*    NOAA   NMFS NEFSC (Koillisen kalastuksen tiedekeskus) 
*    [ NOAA NOS CO-OPS](https://opendap.co-ops.nos.noaa.gov/erddap/index.html)   (Operatiivisen merentutkimuksen tuotteiden ja palvelujen keskus)  
*    [ NOAA OSMC](http://osmc.noaa.gov/erddap/index.html)   (Järjestelmän seurantakeskus)  
*    [ NOAA PIFSC](https://oceanwatch.pifsc.noaa.gov/erddap/index.html)   (Tyynenmeren saarten kalastustiedekeskus)  
*    [ NOAA PMEL](https://data.pmel.noaa.gov/pmel/erddap/index.html) 
*    [ NOAA PolarWatch](https://polarwatch.noaa.gov/erddap/index.html) 
*    [ NOAA UAF](https://upwell.pfeg.noaa.gov/erddap/index.html)   (Yhtenäiset käyttöoikeuspuitteet)  
*    [Ocean Networks Canada](http://dap.onc.uvic.ca/erddap/index.html)  
*    [Ocean Tracking Network](https://members.oceantrack.org/erddap/index.html)  
*    [OOI / Kaikki tiedot](https://erddap-goldcopy.dataexplorer.oceanobservatories.org/erddap/index.html)   (Ocean Observatories Initiative)   
OOI / cabled data
* Princeton, Hydrometeorologian tutkimusryhmä
* R.Tech Engineering, Ranska
*    [Rutgersin yliopisto, meri- ja rannikkotieteiden laitos](https://tds.marine.rutgers.edu/erddap/index.html)   
* San Francisco Estuary Institute
*    [Scripps Institution of Oceanografia, Spray vedenalaiset liittimet](https://spraydata.ucsd.edu/erddap/index.html)  
*    [Älykäs Atlantti](https://www.smartatlantic.ca/erddap/index.html) Memorial University of Newfoundland
* Etelä-Afrikan ympäristöseurantaverkosto
* Spyglass-teknologiat
* Stanfordin yliopisto, Hopkinsin meriasema
*    [UNESCOn IODE](https://erddap.oa.iode.org/erddap/index.html)   (Kansainvälinen merentutkimus ja -tieto Tietojen vaihto)  
*    [University of British Columbia, Earth, Ocean & Ilmakehä Tieteen laitos](https://salishsea.eos.ubc.ca/erddap/index.html)  
*    [Kalifornian yliopisto Davisissa. Bodega Marine Laboratory](http://bmlsc.ucdavis.edu:8080/erddap/index.html)  
*    [Delawaren yliopisto, satelliittien vastaanottoasema](https://basin.ceoe.udel.edu/erddap/index.html)  
* Washingtonin yliopisto, soveltava fysiikan laboratorio
*    [USGS CMGP](https://geoport.usgs.esipfed.org/erddap/index.html)   (Rannikko- ja merigeologiaohjelma)  
*    [VOTO](https://erddap.observations.voiceoftheocean.org/erddap/index.html)   (Ääni Of the Ocean, Ruotsi)  

Tämä on lista vain joistakin järjestöistä, joissa ERDDAP™ on asentanut joku yksittäinen tai jokin ryhmä. Se ei tarkoita, että yksilö, ryhmä, tai organisaatio suosittelee tai tukee ERDDAP .

###  ERDDAP™ suositellaan NOAA ja CNRS{#erddap-is-recommended-within-noaa-and-cnrs} 
 [ NOAA Tietojen saatavuutta koskeva menettelydirektiivi](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations) sisältää ERDDAP™ luettelon suositelluista tietopalvelimista käytettäväksi ryhmissä NOAA . ERDDAP™ on suotuisasti mainittu kohdassa 4.2.3
[Guide de bonnes pratiques sur la gestion des données de la recherche
 (Tutkimustiedon hallinta Parhaiden käytäntöjen opas) ] ( https://mi-gt-donnees.pages.math.unistra.fr/guide/04-traiter.html#deposer-et-structurer-dans-des-plateformes-de-gestion-de-donnees-locales ) Centre National de la Recherche Scientifique (CNRS) Ranskassa.

## Liukunäytöt{#slide-shows} 

Tässä muutamia PowerPoint diaesityksiä ja asiakirjoja, jotka Bob Simons on luonut liittyvät ERDDAP .

 **Näiden asiakirjojen sisältö ja mielipiteet ovat Bob Simonsin henkilökohtaisia mielipiteitä, eivätkä ne välttämättä heijasta hallituksen tai National Oceanic and Atmospheric Administration .** 

Neljä tärkeintä asiakirjaa:

*    [Tärkein johdanto ERDDAP™   (versio 5) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTalk5.pptx) .
Voit myös [Katso tämä video Bob antaa tämän puhua![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=H541G1XXZrU&t=4) .
*    [A Yksi sivu Kuvaus ERDDAP™   (.pdf) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ERDDAP_OnePage.pdf) 
*    [ ERDDAP : Raskas kuormat, verkot, klusterit, liitot, ja pilvipalvelut](/docs/server-admin/scaling) 
*    [Bobin ohjeet tietojen jakelujärjestelmistä](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html) 

Muut esitykset:

*    [2020 EDM: uusia ominaisuuksia ERDDAP™ v2.10](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapFeatures2.10.pptx) 
*    [Vuosia 2020-05-19 DMIT: Data angest](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapDataIngest.pptx)   (Tai [Katso tämä video Bob antaa tämän puhua](https://www.youtube.com/watch?v=9ArYxgwON2k) .) 
*    [2019 IOOS DMAC: Uudet ominaisuudet ERDDAP™ v2.0](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/Erddapv2Features.pptx) 
*    [2018 Kesän ESIP: Subsetting in ERDDAP™ ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapSubset2018.pptx) 
*    [2018 Kesällä ESIP: JSON tuki in ERDDAP™ ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapJson2018.pptx) 
*    [2018 EDM: Verkkopalvelujen hajautettu järjestelmä (Nopeampi, helpompi, vähemmän kallis)   (Tai miksi olin onnellinen neljä vuotta sitten.) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/10P.04_Simons_DistributedWebServices2018.pptx) 
*    [2018 EDM: ERDDAP™ vuonna 2018](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/7A4_Simons_ErddapSession2018.pptx) 
*    [2018 EDM: Uudet ominaisuudet ERDDAP™ kuvalle, ääni- ja videodatalle](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/4D4_Simons_ErddapMediaFiles2018.pptx) 
*    [2018 EDM: UAF ja ERDDAP™ Ratkaisut datan integrointiin](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/3D3_Simons_DataIntegration2018.pptx) 
*    [2017 EDM: Nopea johdanto ERDDAP ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapIntro.pptx) 
*    [2017 EDM ja 2017 IOOS: Uusi tai vähän tunnettu ERDDAP™ Ominaisuudet (käyttäjille) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapUserFeatures2017.pptx) 
*    [2017 EDM ja 2017 IOOS: Uusi tai vähän tunnettu ERDDAP™ Ominaisuudet (hallintovirkamiehille) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapAdminFeatures2017.pptx) 
*    [2017 EDM: EML, KNB ja ERDDAP ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/eml_knb_erddap.pptx) 
*    [2017 EDM: Miten tieto tulee lähteestä loppukäyttäjälle? Vanha koulu vastaan uusi koulu](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OldSchoolNewSchool.pptx) 
*    [2016 Summer ESIP: Big Picture: PARR, OPeNDAP , ERDDAP™ , ja tietojen jakelu](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheBigPicture.pptx) 
*    [2016 EDM: Yksi ja tehty](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OneAndDone.pptx) 
*    [2016 Gov API: Seuraava sukupolvi Datapalvelimet](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/NextGeneration.pptx) 
*    [2015 Kesän ESIP: taulukkolaskenta](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularAggregation.pptx) 
*    [2014 EDM: Bob's Do's and Don't for Tabular Data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsDosDontsTabular.pptx) 
*    [2014 EDM: ihanteellinen käyttöliittymä](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheIdealUserInterface.pptx) 
*    [2014 Kesän ESIP: taulukkotiedot](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularData.pptx) 
*    [2013: Älä käsittele Situn sisäistä ja taulukkodataa kuten Grided Data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TablesAndGrids.html) 
*    [2013 EDM: Tee enemmän vähemmällä](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/DoMoreWithLess.ppt) 
*    [2012 EDM: Ohjeet tietojen jakelujärjestelmiä varten](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/guidelines3.ppt) 

Esitykset muilta ihmisiltä:

*    [FAIR-pohjainen työkalu maailmanlaajuisen tietojen jakamisen parantamiseksi![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=kdBTgNEp5TA&ab_channel=GOOSIOC)   
Kevin O'Brien at the Global Ocean Observing System (GOOS) Webinar / Tarkkailun koordinointiryhmä (OCG) Sarja / 1, 12. marraskuuta 2020.
*    [Oman sääsovelluksen rakentaminen NOAA Avaa data ja jupyter muistikirjat![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=MF-WH01Qw0g)   
Filipe Fernandes ja Rich Signell SciPy 2018, 13 heinäkuuta 2018.
*    [OOI:n käyttö ERDDAP ![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=tj4M9hodTG0)   
Rich Signell, helmikuu 2018.
*    [ESIP Tech Dive: " ERDDAP Salama puhuu"![YouTube](/img/youtube.png)](https://youtu.be/2-ydBByYB0M?t=160)   
Kahdeksan 5-minute puhuu mielenkiintoisia asioita ihmiset tekevät ERDDAP Jenn Sevadjian, Jim Potemra, Conor Delaney, Kevin O'Brien, John Kerfoot, Stephanie Petillo, Charles Carleton ja Eli Hunter esittelivät ESIP Tech Diven 31 elokuuta 2017.
*    [Käyttö ERDDAP™ Pääsy taulukkotietoihin![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=_BwMHRh7CS8)   
Rich Signell, elokuu 2015.
*    [Testi ERDDAP™ Blue Carbon Data![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=TbOhElC_-qU)   
Rich Signell, elokuu 2015.
*    [Datan käyttäminen ERDDAP™ in NOAA S GNOME Ohjelmisto![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=18xZoXu1USM) .
Tässä videossa, Rich Signell lataa valtameren virtaukset ennustetietoja ERDDAP™ mallintaa myrkyllistä vuotoa meressä käyttäen [ NOAA S GNOME ohjelmistot](https://response.restoration.noaa.gov/oil-and-chemical-spills/oil-spills/response-tools/gnome.html)   (Viisi minuuttia&#33;) . (Yksi pieni virhe videossa: etsiessäsi tiedostoja, älä käytä JA hakusanojen välissä. Se on implisiittistä.) By Rich Signell, 8. huhtikuuta 2011.
