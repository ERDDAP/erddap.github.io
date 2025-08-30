---
title: "ERDDAP™ Documentation"
---
## ViimeisinERDDAP™versio versio versio versio versio{#latest-erddap-version} 

2.28.0 Katso lisää[Muutoksen dokumentointi](/changes#version-2280)ja[Lataa](https://github.com/ERDDAP/erddap/releases/tag/v2.28.0).

## ERDDAP™Tietoa{#erddap-information} 

ERDDAP™on tieteellinen tietopalvelin, joka antaa käyttäjille yksinkertaisen ja johdonmukaisen tavan ladata alijoukkoja
verkottuneet ja tabulaariset tieteelliset tietoaineistot yhteisissä tiedostomuodoissa ja grafiikoiden ja karttojen tekeminen.
ERDDAP™Vapaa ja avoin lähde (Apache ja Apache)  JavaPalvelijaltaNOAA NMFS SWFSCYmpäristötutkimusyksikkö (ERD) .

* Nähdä / käyttääERDDAP™Asennus:[ https://coastwatch.pfeg.noaa.gov/erddap/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/index.html)
* Aloita asennuslukemalla[Asennuksen opas](/docs/server-admin/deploy-install).
* Tukea koodiin Katso[Ohjelmoijan opas](/docs/contributing/programmer-guide).


Alta löydät merkityksellisiä linkkejä kysyä kysymyksiä ja miten edistää.
* Tarkista keskustelut ja kysy kysymyksiä[ https://groups.google.com/g/erddap ](https://groups.google.com/g/erddap)tai[ https://github.com/erddap/erddap/discussions ](https://github.com/erddap/erddap/discussions)
* Tarkista ja lähetä kysymyksiä[ https://github.com/erddap/erddap/issues ](https://github.com/erddap/erddap/issues)
* Jos haluat esittää pyyntöjä, noudata näitä ohjeita:[ERDDAPKeskusteluja #93 (Kommentti Kommentti) ](https://github.com/ERDDAP/erddap/discussions/93#discussion-4920427)


## Etsi useitaERDDAP™s
On kaksi tapaa etsiä useitaERDDAP™s aineistoihin:[Etsi useitaERDDAP™s](/SearchMultipleERDDAPs.html)ja[ERDDAP™Datan löytö](http://erddap.com/).


## Aseta omasiERDDAP™ {#set-up-your-own-erddap} 

ERDDAP™on A[Vapaa ja avoin lähde](https://en.wikipedia.org/wiki/Free_and_open-source_software)Kaikki-Java  (Servlet) Web-sovellus, joka toimii verkkosovelluspalvelimessa (Esimerkiksi Tomcat (Suositeltu) Tai Jetty (Toimii, mutta emme tue sitä) ) . Tämä sivusto on enimmäkseen ihmisille ("""ERDDAP™Hallinnolliset") jotka haluavat perustaa omanERDDAP™asennus omalla verkkosivustollaan.

Aloita asennuslukemalla[Asennuksen opas](/docs/server-admin/deploy-install).

### Miksi käyttääERDDAP™Jakamaan tietojasi?{#why-use-erddap-to-distribute-your-data} 

Pieniä ponnisteluja perustaaERDDAP™tuo monia etuja.

* Jos sinulla on jo verkkopalvelu tietojen jakamiseen,
Voit luodaERDDAP™käyttää tietojasi olemassa olevan palvelun kautta.
Tai voit perustaaERDDAP™käyttää tietojasi suoraan paikallisista tiedostoista.
* Jokaisesta aineistosta sinun on vain kirjoitettava pieni XML-merkki, jotta voit kertoaERDDAP™Kuinka käyttää aineistoa.
* Kun sinulla onERDDAP™Tietojesi käyttö, loppukäyttäjät voivat:
    * Pyydä tietoja eri tavoin (DAP,WMSja enemmän tulevaisuudessa) .
    * Saada tietovaste eri tiedostomuodoissa. (Se on luultavasti suurin syy&#33;) 
    * Tee kuvia ja karttoja. (Kaikki pitävät kauniista kuvista.) 
    * Rakenna muita hyödyllisiä ja mielenkiintoisia asioitaERDDAPVerkkopalvelut – katso[Awesome ERDDAPTM](https://github.com/IrishMarineInstitute/awesome-erddap)Luettelo upeistaERDDAPliittyviä projekteja.

Voit[Mukautettu](/docs/server-admin/deploy-install#customize)sinunERDDAP"Näyttää siltä, ettäERDDAP™heijastaa organisaatiotasi ja sopii muuhun sivustoosi.

## Onko asennusprosessi vaikea? Voinko tehdä sen?{#is-the-installation-procedure-hard-can-i-do-it} 

Alkuasennukset vievät aikaa, mutta se ei ole kovin vaikeaa. Voit tehdä sen. Jos olet jumissa, lähetä minulle sähköpostiaerd dot data at noaa dot gov. Minä autan sinua.
Tai voit liittyä[ERDDAP™Google Group / Mailing List](https://groups.google.com/g/erddap)Kirjoita kysymyksesi sinne.

## Kuka käyttääERDDAP™ {#who-uses-erddap} 

ERDDAP™noin 100 organisaatiota on asennettu vähintään 17 maassa.

 (Australia, Belgia, Kanada, Kiina, Ranska, Irlanti, Italia, Uusi-Seelanti, Venäjä, Etelä-Afrikka, Espanja, Sri Lanka, Ruotsi, Thaimaa, Yhdistynyt kuningaskunta, Yhdysvallat) mukaan lukien:

*   [APDRC](https://apdrc.soest.hawaii.edu/erddap/index.html)  (Asia-Pacific Data-Research Center, kansainvälinen Tyynenmeren tutkimuskeskus) Havaijin yliopistossa (UH)  
*   [BCO-DMO WHO](https://erddap.bco-dmo.org/erddap/index.html)  (Biologinen ja kemiallinen valtameri tietoja kohteesta Woods Hole Oceanographic Instituutti)  
*   [VoittajatERDDAP™](https://canwinerddap.ad.umanitoba.ca/erddap/index.html)  (Kanadan vesitietoverkosto) Maapallon tarkkailutieteen keskus (Toimitusjohtaja) Manitoban yliopisto
*   [cd](https://erddap.cdip.ucsd.edu/erddap/index.html)  (Coastal Data Information Program UCSD)  
*   [CNR-ISP](https://data.iadc.cnr.it/erddap/index.html)  (Italian kansallinen tutkimusneuvosto, Polar Sciences -instituutti)  
* CSIRO ja IMOS (Australian Commonwealth Scientific and Industrial Research Organisation and the Integrated Marine Observing System Näytä tarkat tiedot) 
*   [Kuvittaja (NOAAORR) ](https://pub-data.diver.orr.noaa.gov/erddap/index.html)  (NOAAVastaus- ja palautustoimisto)  
*   [EMODnet-fysiikka](https://erddap.emodnet-physics.eu/erddap/index.html)  (European Marine Observation and Data Network – Fysiikka)  
*   [GoMRI](https://erddap.griidc.org/erddap/index.html)  (Meksikon tutkimusaloite)  
*   [Hakai-instituutti](https://catalogue.hakai.org/erddap/index.html)  (Hakai Institute on the Central Coast of British Columbia, Kanada) 
*   [Lukion teknologiapalvelut](https://myhsts.org)joka tarjoaa koodaus- ja teknologiakoulutusta opiskelijoille ja aikuisille
*   [ICHEC](https://erddap.ichec.ie/erddap/index.html)  (Irlannin High-End -tietokonekeskus) 
*   [MinäNCOon](https://erddap.incois.gov.in/erddap/index.html)  (Intian valtameritietopalvelukeskus)  
* IRD (Institut de Recherche pour le Développement, Ranska)   
CNRS (National de la Recherche Scientifique, Ranska)   
UPMC (Université Pierre et Marie CURIE, Pariisi Ranska Ranska Ranska)   
UCAD (Pääosissa Université Cheikh Anta Diop de Dakar)   
UGB (Université Gaston Berger, Saint-Louis du Sénégal)   
UFHB (Université Félix HOUPHOUEET-BOIGNY, Abidjan, Norsunluurannikon osavaltio)   
IPSL (Pierre Simon Laplace des sciences de l'environnement, Pariisi Ranska Ranska Ranska)   
LMI ECLAIRS (Laboratoire Mixte kansainvälinen Etude du Climat en Afrique de l'Ouest et de ses Interactions avec l'Environnement Régional, et appui aux -palvelut) 
* JRC (Euroopan komissio - Yhteistutkimuskeskus, Euroopan unioni) 
*   [Marine-instituutti](https://erddap.marine.ie/erddap/index.html)  (Irlanti Irlanti)  
* Merenkulkuvälineet S.A. (Espanja Espanja Espanja Espanja) 
* NCI (Australian kansallinen laskentainfrastruktuuri) 
*   [NOAACoastwatch](https://coastwatch.noaa.gov/erddap/index.html)  (Keski keskus keskus keskus keskus keskus keskus keskus keskus keskus)  
*   [NOAACoastWatch CGOM](https://cwcgom.aoml.noaa.gov/erddap/index.html)  (Karibian ja Meksikon solmu)  
*   [NOAACoastWatch GLERL](https://coastwatch.glerl.noaa.gov/erddap/index.html)  (Suuria järviä)  
*   [NOAACoastWatch West Coast](https://coastwatch.pfeg.noaa.gov/erddap/index.html)jotka on sijoitettu ja toimivat yhdessä
    [NOAA ERD](https://coastwatch.pfeg.noaa.gov/erddap/index.html)  (YmpäristötutkimusyksikköSWFSCjostaNMFS) 
*   [NOAAIOOS Sensor](https://erddap.sensors.ioos.us/erddap/index.html)  (Integroitu valtameren tarkkailujärjestelmä)  
*   [NOAAIOOS CeNCOOS](https://erddap.axiomdatascience.com/erddap/index.html)  (Central and Northern California Ocean Observing System, tunnetuin esittäjä Axiom Data Science)  
*   [NOAAIOOS GCOOS Atmospheric and Oceanographic Data Näytä tarkat tiedot](https://erddap.gcoos.org/erddap/index.html)  
    [NOAAIOOS GCOOS Atmospheric and Oceanographic Data Näytä tarkat tiedot](https://gcoos5.geos.tamu.edu/erddap/index.html)  
    [NOAAIOOS GCOOS biologinen ja sosioekonominen](https://gcoos4.tamu.edu/erddap/index.html)  (Persianlahden rannikon tarkkailujärjestelmä) 
*   [NOAANERACOOS](http://www.neracoos.org/erddap/index.html)  (Rannikko- ja merivalvontajärjestelmien koillisosasto)  
*   [NOAAIOOS NGDAC](https://data.ioos.us/gliders/erddap/index.html)  (Kansallinen Glider Data Assembly Center)  
*   NOAAIOOS NANOOS (Northwest Association of Networked Ocean Observing Systems Näytä tarkat tiedot) 
*   [NOAAIOOS PacIOOS](https://pae-paha.pacioos.hawaii.edu/erddap/index.html)  (Tyynenmeren saarten tarkkailujärjestelmä) Havaijin yliopistossa (UH)  
*   NOAAIOOS SCCOOS (Southern California Coastal Ocean Observointijärjestelmä) 
*   [NOAAIOOS SECOOORA](https://erddap.secoora.org/erddap/index.html)  (Kaakkoisrannikko Ocean Obsering Regional Association)  
*   [NOAANCEI](https://www.ncei.noaa.gov/erddap/index.html)  (Kansalliset ympäristötietokeskukset)    
*   NOAANGDC STP (Kansallinen geofysiikka Tietokeskus, Aurinko – Terrestrial Physics) 
*   NOAA NMFSNEFSC (Luoteiskantojen tiedekeskus) 
*   [NOAACO-OPS](https://opendap.co-ops.nos.noaa.gov/erddap/index.html)  (Toiminnallisten valtamerituotteiden ja palvelujen keskus)  
*   [NOAAOSMC](http://osmc.noaa.gov/erddap/index.html)  (Järjestelmän seurantakeskus)  
*   [NOAAPIFSC](https://oceanwatch.pifsc.noaa.gov/erddap/index.html)  (Tyynenmeren saarten kalastuksen tiedekeskus)  
*   [NOAAPM](https://data.pmel.noaa.gov/pmel/erddap/index.html)
*   [NOAAPolarwatch](https://polarwatch.noaa.gov/erddap/index.html)
*   [NOAAUAF](https://upwell.pfeg.noaa.gov/erddap/index.html)  (Yhtenäinen Access Framework)  
*   [Valtameriverkosto Kanada](http://dap.onc.uvic.ca/erddap/index.html) 
*   [Ocean Tracking -verkosto](https://members.oceantrack.org/erddap/index.html) 
*   [Kaikki tiedot / All Data](https://erddap-goldcopy.dataexplorer.oceanobservatories.org/erddap/index.html)  (Ocean Observatories -aloite)   
OOI / Uncabled data
* Princeton, Hydrometeorologian tutkimusryhmä
* R. Tech Engineering, Ranska
*   [Rutgers University, meri- ja rannikkotieteiden laitos](https://tds.marine.rutgers.edu/erddap/index.html)  
* San Francisco Estuary Institute
*   [Scripps Institution of Oceanography Näytä tarkat tiedot](https://spraydata.ucsd.edu/erddap/index.html) 
*   [Älykäs Atlantti](https://www.smartatlantic.ca/erddap/index.html)Newfoundlandin muistomerkki
* Etelä-Afrikan ympäristötarkkailuverkosto
* Spyglasstekniikka
* Stanfordin yliopisto, Hopkinsin meriasema
*   [UNESCO IOD](https://erddap.oa.iode.org/erddap/index.html)  (Kansainvälinen merentutkimus ja tieto Datan vaihto)  
*   [University of British Columbia, Earth, Ocean & Atmospheric Tieteiden osasto](https://salishsea.eos.ubc.ca/erddap/index.html) 
*   [Kalifornian yliopisto Davisissa, Bodega Marine Laboratory](http://bmlsc.ucdavis.edu:8080/erddap/index.html) 
*   [Delawaren yliopisto, satelliittien vastaanottoasema](https://basin.ceoe.udel.edu/erddap/index.html) 
* Washingtonin yliopisto, sovellettu fysiikan laboratorio
*   [USGS CMGP](https://geoport.usgs.esipfed.org/erddap/index.html)  (Rannikko- ja merigeologian ohjelma)  
*   [Äänestäminen](https://erddap.observations.voiceoftheocean.org/erddap/index.html)  (Valtameri, Ruotsi)  

Tämä on luettelo niistä järjestöistä, joissaERDDAP™Jonkin henkilön tai jonkin ryhmän asentaminen. Se ei tarkoita, että yksilö, ryhmä tai organisaatio suosittelee tai hyväksyy.ERDDAP.

### ERDDAP™Suositellaan sisälläNOAACNRS{#erddap-is-recommended-within-noaa-and-cnrs} 
[NOAATietojen saatavuusmenettelydirektiivi](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations)SisältääERDDAP™suositeltujen palvelinten luettelossa ryhmän käyttöönNOAA.ERDDAP™mainitaan suotuisasti kohdassa 4.2.3.
[Guide de bonnes pratiques sur la gestion des données de la recherche] Näytä tarkat tiedot
 (Tutkimusaineiston hallinta Parhaat käytännöt) ) ( https://mi-gt-donnees.pages.math.unistra.fr/guide/04-traiter.html#deposer-et-structurer-dans-des-plateformes-de-gestion-de-donnees-locales ) Kansallinen de la Recherche Scientifique (CNRS) Ranskassa.

## Slide Shows{#slide-shows} 

Tässä muutamia PowerPoint-liukumäkiä ja dokumentteja, jotka Bob Simons on luonutERDDAP.

 **DISCLAIMER: Näissä asiakirjoissa ilmaistu sisältö ja mielipiteet ovat Bob Simonsin henkilökohtaisia mielipiteitä, eivätkä ne välttämättä heijasta hallituksen tai hallituksen kantaa.National Oceanic and Atmospheric Administration.** 

Neljä pääasiakirjaa:

*   [Tärkein johdantoERDDAP™  (versio 5) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTalk5.pptx).
Voit myös[Katso Bobin video tästä![YouTube YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=H541G1XXZrU&t=4).
*   [Yhden sivun kuvausERDDAP™  (.pdf) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ERDDAP_OnePage.pdf)
*   [ERDDAPRaskas vuoto, verkot, klusterit, Federations ja pilvipalvelut](/docs/server-admin/scaling)
*   [Bobin ohjeet tietojen jakelujärjestelmiin](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html)

Muut esitykset:

*   [2020 EDM: Uusia ominaisuuksiaERDDAP™V2.10](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapFeatures2.10.pptx)
*   [2020-05-19 Lähde: Data Ingest](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapDataIngest.pptx)  (tai[Katso Bobin video tästä](https://www.youtube.com/watch?v=9ArYxgwON2k).) 
*   [2019 IOOS DMAC: Uudet ominaisuudetERDDAP™V2.0](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/Erddapv2Features.pptx)
*   [2018 2018 2018 Kesä ESIP: Subseting inERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapSubset2018.pptx)
*   [2018 2018 2018 Kesä ESIP: JSON-tukiERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapJson2018.pptx)
*   [2018 EDM: Jaettu verkkopalvelujärjestelmä (Helpompi, vähemmän kallis)   (Miksi olin onnellinen neljä vuotta sitten?) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/10P.04_Simons_DistributedWebServices2018.pptx)
*   [2018 EDM:ERDDAP™Vuonna 2018](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/7A4_Simons_ErddapSession2018.pptx)
*   [2018 EDM: Uudet ominaisuudetERDDAP™Kuva, ääni ja videotiedot](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/4D4_Simons_ErddapMediaFiles2018.pptx)
*   [2018: UAF jaERDDAP™Ratkaisut tietojen integrointiin](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/3D3_Simons_DataIntegration2018.pptx)
*   [2017 EDM: nopea käyttöönottoERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapIntro.pptx)
*   [2017 EDM ja 2017 IOOS: Uusi tai vähän tunnettuERDDAP™ominaisuuksia (Käyttäjille) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapUserFeatures2017.pptx)
*   [2017 EDM ja 2017 IOOS: Uusi tai vähän tunnettuERDDAP™ominaisuuksia (Hallinnoijille) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapAdminFeatures2017.pptx)
*   [2017: EML, KNB jaERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/eml_knb_erddap.pptx)
*   [2017 2017 2017 Edm: Miten tiedot saadaan loppukäyttäjältä? Vanha koulu vs. uusi koulu](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OldSchoolNewSchool.pptx)
*   [2016 2016 2016 2016 Alkuperäinen nimi: The Big Picture: PARROPeNDAP,ERDDAP™ja tietojen jakaminen](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheBigPicture.pptx)
*   [2016: Yksi ja tehty](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OneAndDone.pptx)
*   [2016 2016 2016 2016 Gov API: Seuraava sukupolvi Datapalvelimet](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/NextGeneration.pptx)
*   [2015 2015 2015 2015 Kesä ESIP: Tabular Aggregation](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularAggregation.pptx)
*   [2014 EDM: Bob's Do's and Don't for Tabular Näytä tarkat tiedot](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsDosDontsTabular.pptx)
*   [2014: Ihanteellinen käyttäjäliittymä](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheIdealUserInterface.pptx)
*   [2014 2014 2014 2014 Kesä ESIP: Tabular data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularData.pptx)
*   [2013: Don't Treat In-Situ ja Tabular Data Like Gridded Data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TablesAndGrids.html)
*   [2013 EDM: Tee vähemmän](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/DoMoreWithLess.ppt)
*   [2012 EDM: Tietojen jakelujärjestelmien ohjeet](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/guidelines3.ppt)

Muiden esitykset:

*   [FAIR-pohjainen työkalu datan jakamisen parantamiseksi![YouTube YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=kdBTgNEp5TA&ab_channel=GOOSIOC)  
Kirjoittanut Kevin O'Brien Global Ocean Observing System (GOOS) Webinaari / observatorion koordinointiryhmä (OCG) Sarja 1.11.2020.
*   [Rakenna oma sääsovellusNOAAAvoin data ja Jupyter Notebooks![YouTube YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=MF-WH01Qw0g)  
filippiiniläiset Fernandes ja Rich Signell SciPy 2018 -tapahtumassa 13. heinäkuuta 2018.
*   [Käyttämällä OOIERDDAP![YouTube YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=tj4M9hodTG0)  
Rich Signell, helmikuu 2018.
*   [ESIP Teknologia: "ERDDAPSalama puhuu »![YouTube YouTube](/img/youtube.png)](https://youtu.be/2-ydBByYB0M?t=160)  
Kahdeksan 5 minuutin puheenvuorot mielenkiintoisista asioista, joita ihmiset tekevätERDDAPKirjoittanut Jenn Sevadjian, Jim Potemra, Conor Delaney, Kevin O'Brien, John Kerfoot, Stephanie Petillo, Charles Carleton ja Eli Hunter esittelivät ESIP Tech Divenä 31. elokuuta 2017.
*   [KäyttäminenERDDAP™Pääsy Tabular-tietoihin![YouTube YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=_BwMHRh7CS8)  
Rich Signell, elokuu 2015.
*   [Testin käyttöERDDAP™Blue Carbonin tiedot![YouTube YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=TbOhElC_-qU)  
Rich Signell, elokuu 2015.
*   [Tietojen käyttäminenERDDAP™SisälläNOAA&gt;GNOMEOhjelmisto Ohjelmisto![YouTube YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=18xZoXu1USM).
Tässä videossa Rich Signell lataa valtameren virtauksia ennustaa tietojaERDDAP™Mallistaa myrkyllinen roisku meressä käyttäen[NOAA&gt;GNOMEohjelmisto ohjelmisto](https://response.restoration.noaa.gov/oil-and-chemical-spills/oil-spills/response-tools/gnome.html)  (5 minuutissa&#33;) . (Yksi pieni virhe videossa: kun etsit tietoaineistoja, älä käytä ja hakuehtojen välillä. Se on implisiittistä.) Rich Signell, 8. huhtikuuta 2011.
