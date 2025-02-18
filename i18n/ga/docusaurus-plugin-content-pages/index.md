---
title: "ERDDAP™ Documentation"
---
## Déan Teagmháil LinnERDDAP™leagan leagan{#latest-erddap-version} 

2.25, féach ar an[data recovery](/changes#version-225)agus[íoslódáil](https://github.com/ERDDAP/erddap/releases/tag/v2.25.1).

## ERDDAP™Eochairfhocal information{#erddap-information} 

ERDDAP™Is freastalaí sonraí eolaíochta a thugann úsáideoirí simplí, ar bhealach comhsheasmhach a íoslódáil fo-thacar de
gridded agus tabular tacar sonraí eolaíochta i bhformáidí comhad coitianta agus graif agus léarscáileanna a dhéanamh.
ERDDAP™Is Foinse Saor agus Oscailte (Apache agus Apache-mhaith)  JavaSraithuimhir óNOAA NMFS SWFSCAn Rannóg Taighde Comhshaoil (ERD) .

* A fheiceáil / úsáidERDDAP™a shuiteáil:[ https://coastwatch.pfeg.noaa.gov/erddap/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/index.html)
* Chun tús a chur le suiteáil a léamh[an treoir a shuiteáil imscaradh](/docs/server-admin/deploy-install).
* Chun cur cód a fheiceáil[Eochairfhocal programmer's guide](/docs/contributing/programmer-guide).


Anseo thíos gheobhaidh tú naisc ábhartha chun ceisteanna a chur agus conas cur leo.
* Comhráite Athbhreithniú agus ceisteanna ag[ https://groups.google.com/g/erddap ](https://groups.google.com/g/erddap)nó ag[ https://github.com/erddap/erddap/discussions ](https://github.com/erddap/erddap/discussions)
* Athbhreithniú agus ceisteanna a chur faoi bhráid[ https://github.com/erddap/erddap/issues ](https://github.com/erddap/erddap/issues)
* Chun iarratais gné a mholadh, lean an treoir seo:[ERDDAPCeisteanna Coitianta (tráchtaireacht) ](https://github.com/ERDDAP/erddap/discussions/93#discussion-4920427)


## Cuardaigh ilERDDAP™s s
Tá dhá bhealach a chuardach ilERDDAP™s le haghaidh tacar sonraí:[Cuardaigh ilERDDAP™s s](/SearchMultipleERDDAPs.html)agus[ERDDAP™Faigh amach na sonraí](http://erddap.com/).


## Socraigh Suas Do FéinERDDAP™ {#set-up-your-own-erddap} 

ERDDAP™Is maith liom é[Foinse Saor in Aisce agus Oscailte](https://en.wikipedia.org/wiki/Free_and_open-source_software), uile-Java  (cineál gas: in airde) , iarratas gréasáin a ritheann i freastalaí iarratais gréasáin (mar shampla, Tomcat (molta molta) nó Jetty (oibríonn sé, ach ní chuirimid tacaíocht a thabhairt dó) ) . Tá an leathanach gréasáin den chuid is mó do dhaoine (" " "ERDDAP™riarthóirí ") ar mian leo a chur ar bun a gcuid féinERDDAP™suiteáil ar a láithreán gréasáin féin.

Chun tús a chur le suiteáil a léamh[an treoir a shuiteáil imscaradh](/docs/server-admin/deploy-install).

### Cén fáth a n-úsáidtearERDDAP™do chuid sonraí a dháileadh?{#why-use-erddap-to-distribute-your-data} 

Toisc an iarracht beag a chur ar bunERDDAP™Tugann go leor buntáistí.

* Má tá seirbhís gréasáin agat cheana féin chun do chuid sonraí a dháileadh,
is féidir leat a bhunúERDDAP™rochtain a fháil ar do chuid sonraí tríd an tseirbhís atá ann cheana.
Nó, Is féidir leat a bhunúERDDAP™chun rochtain a fháil ar do chuid sonraí go díreach ó chomhaid áitiúla.
* I gcás gach tacar sonraí, ní mór duit ach smután beag de XML a scríobh chun insintERDDAP™conas teacht ar an tacar sonraí.
* Nuair a bheidh túERDDAP™ag freastal ar do chuid sonraí, is féidir le húsáideoirí deiridh:
    * Iarr ar na sonraí ar bhealaí éagsúla (DAP,WMS, agus níos mó sa todhchaí) .
    * Faigh an freagra sonraí i bhformáidí comhad éagsúla. (Sin dócha an chúis is mó&#33;) 
    * Déan graif agus léarscáileanna. (Is maith ag gach duine pictiúir go leor.) 
    * Tógáil rudaí úsáideacha agus suimiúil eile ar bharrERDDAP's seirbhísí gréasáin - féach ar[Awesome ERDDAPTM](https://github.com/IrishMarineInstitute/awesome-erddap)liosta de uamhnachERDDAPtionscadail a bhaineann leo.

Is féidir leat[customize](/docs/server-admin/deploy-install#customize)do chuid féinERDDAP's cuma mar sinERDDAP™Léiríonn do eagraíocht agus luíonn i leis an gcuid eile de do láithreán gréasáin.

## An bhfuil an nós imeachta suiteála crua? An féidir liom é a dhéanamh?{#is-the-installation-procedure-hard-can-i-do-it} 

Tógann an suiteáil tosaigh roinnt ama, ach nach bhfuil sé an-deacair. Is féidir leat é a. Má tá tú i bhfostú, ríomhphost chugam agerd dot data at noaa dot gov. Beidh mé cabhrú leat.
Nó, is féidir leat a bheith ar an[ERDDAP™Google Group / Liosta poist](https://groups.google.com/g/erddap)agus post do cheist ann.

## Cé ÚsáidíERDDAP™ {#who-uses-erddap} 

ERDDAP™suiteáilte ag thart ar 100 eagraíochtaí i dtíortha 17 ar a laghad

 (An Astráil, an Bheilg, Ceanada, an tSín, an Fhrainc, an India, Éire, an Iodáil, an Nua-Shéalainn, an Rúis, an Afraic Theas, an Spáinn, Srí Lanca, an tSualainn, an Téalainn, an Ríocht Aontaithe, Stáit Aontaithe Mheiriceá) , lena n-áirítear:

*   [Amharc ar gach eolas](https://apdrc.soest.hawaii.edu/erddap/index.html)  (Áise-Aigéan Ciúin Ionad Sonraí-taighde, Ionad Taighde an Aigéin Chiúin Idirnáisiúnta) ag an Ollscoil Haváí (UH)  
*   [BCO-DMO ag WHOI](https://erddap.bco-dmo.org/erddap/index.html)  (Aigéineolaíocht Bitheolaíochta agus Ceimiceach Oifig Bainistíochta Sonraí ag Woods Hole Oceanographic Institiúid na hInstitiúide)  
*   [Uisce agus SéarachasERDDAP™](https://canwinerddap.ad.umanitoba.ca/erddap/index.html)  (Líonra Faisnéise Uisce Cheanada) ag an Ionad um Eolaíocht Bhreathnóireachta na Cruinne (Príomhfheidhmeannaigh) , Ollscoil Manitoba
*   [Is maith liom é](https://erddap.cdip.ucsd.edu/erddap/index.html)  (Clár Faisnéise Sonraí Cósta ag UCSD)  
*   [CNR-ISP](https://data.iadc.cnr.it/erddap/index.html)  (Comhairle Náisiúnta um Thaighde na hIodáile, Institiúid na nEolaíochtaí Polar)  
* CSIRO agus IMOS (Eagraíocht Taighde Eolaíochta agus Tionscail na hAstráile agus an Córas Breathnóireachta Muirí Comhtháite) 
*   [DIVER (NOAAORR) ](https://pub-data.diver.orr.noaa.gov/erddap/index.html)  (NOAAOifig an Fhreagairt agus an Aisithe)  
*   [Fisic EMODnet](https://erddap.emodnet-physics.eu/erddap/index.html)  (Líonra Breathnóireachta agus Sonraí Mara na hEorpa - Fisic)  
*   [Gorta](https://erddap.griidc.org/erddap/index.html)  (Tionscnamh Taighde na Murascaille Meicsiceo)  
*   [Institiúid Hakai](https://catalogue.hakai.org/erddap/index.html)  (An Institiúid Hakai ar an Chósta Lár na British Columbia, Ceanada) 
*   [Seirbhísí Teicneolaíochta na hOllscoile](https://myhsts.org), a thairgeann códú agus oiliúint teicneolaíochta do mhic léinn agus do dhaoine fásta
*   [ICHEC](https://erddap.ichec.ie/erddap/index.html)  (Ionad na hÉireann um Ríomhaireacht Ard) 
*   [Is maith liom éNCOIS FÉIDIR](https://erddap.incois.gov.in/erddap/index.html)  (Indiach Náisiúnta Ionad Seirbhísí Faisnéise Aigéan)  
* IARRATAIS (Institut de Recherche pour le Développement, France)   
CNRS (Ionad Náisiúnta de la Recherche Scientifique, An Fhrainc)   
UPMC (Université Pierre agus Marie Comhairle Contae Mhaigh Eo An Fhrainc)   
UCAD (Ollscoil na hÉireann, Gaillimh)   
UISCE (Ollscoil na hÉireann, Gaillimh)   
UFHB (Ollscoil na hÉireann, Gaillimh Déan teagmháil linn)   
IPSL (Institiúid Pierre Simon Laplace des sciences de l'environnement, Páras, An Fhrainc)   
Seirbhís do Chustaiméirí (Laboratoire Measctha Idirnáisiúnta «Etude du Climat en Afrique de l’Ouest et de ses Interactions avec l’Environnement Régional, agus seirbhísí gaolmhara ”) 
* Féach ar an bpróifíl (An Coimisiún Eorpach - Joint Research Centre, European Union) 
*   [Institiúid na Mara](https://erddap.marine.ie/erddap/index.html)  (Éire na hÉireann)  
* Ionstraimí Mara S.A. (an Spáinn) 
* NPPR (Bonneagar Ríomhaireacht Náisiúnta na hAstráile) 
*   [NOAAFéach ar an bpróifíl](https://coastwatch.noaa.gov/erddap/index.html)  (Eochairfhocal central)  
*   [NOAAFéach ar an bpróifíl](https://cwcgom.aoml.noaa.gov/erddap/index.html)  (An Mhuir Chairib/Gulf de Meicsiceo)  
*   [NOAAFéach ar an bpróifíl](https://coastwatch.glerl.noaa.gov/erddap/index.html)  (cliceáil grianghraf a mhéadú)  
*   [NOAAFéach ar an bpróifíl](https://coastwatch.pfeg.noaa.gov/erddap/index.html)atá comhlonnaithe le agus oibreacha le
    [NOAA ERD](https://coastwatch.pfeg.noaa.gov/erddap/index.html)  (Rannóg Taighde ComhshaoilSWFSCdeNMFS) 
*   [NOAAIOOS Braiteoirí](https://erddap.sensors.ioos.us/erddap/index.html)  (Córas breathnóireachta Aigéan Comhtháite)  
*   [NOAADéan Teagmháil LinnNCOOSPS](https://erddap.axiomdatascience.com/erddap/index.html)  (Lár agus Tuaisceart California Ocean Observing Córas, reáchtáil ag Axiom Eolaíocht Sonraí)  
*   [NOAAIOOS GCOOS Sonraí atmaisféir agus Oceanographic: Córas Breathnú](https://erddap.gcoos.org/erddap/index.html)  
    [NOAAIOOS GCOOS Sonraí atmaisféir agus Oceanographic: Bailiúcháin Stairiúla](https://gcoos5.geos.tamu.edu/erddap/index.html)  
    [NOAAIOOS GCOOS Bitheolaíochta agus Socheacnamaíocht](https://gcoos4.tamu.edu/erddap/index.html)  (Gulf Coast Ocean Breathnú Córas) 
*   [NOAAIOOS NERACOOS](http://www.neracoos.org/erddap/index.html)  (Northeastern Regional Association of Coastal and Ocean Observing Systems)  
*   [NOAAIOOS NGDAC](https://data.ioos.us/gliders/erddap/index.html)  (Glider Náisiúnta Ionad an Tionóil Sonraí)  
*   NOAAIOOS NANOOS (Northwest Association of Networked Ocean Observing Systems) 
*   [NOAAIOOSAINT SONRAÍ](https://pae-paha.pacioos.hawaii.edu/erddap/index.html)  (Aigéan Ciúin Oileáin Córas Breathnú Ocean) ag an Ollscoil Haváí (UH)  
*   NOAAIOOS SCCOOS (Southern California Cósta Ocean Breathnú Córas) 
*   [NOAAIOOS SONRAÍ](https://erddap.secoora.org/erddap/index.html)  (Oirdheisceart Aigéan Chósta Breathnú Cumann Réigiúnach)  
*   [NOAANCEI](https://www.ncei.noaa.gov/erddap/index.html)  (Ionad Náisiúnta um Fhaisnéis Comhshaoil)    
*   NOAANGDC STP (National Geophysical Ionad Sonraí, Solar - Fisic Terrestrial) 
*   NOAA NMFSNEFSC (Ionad Eolaíochta Iascaigh an Oirdheiscirt) 
*   [NOAANOS CO-OPs](https://opendap.co-ops.nos.noaa.gov/erddap/index.html)  (Ionad le haghaidh Táirgí agus Seirbhísí Oceanographic Oibriúcháin)  
*   [NOAAFéach ar Léarscáil](http://osmc.noaa.gov/erddap/index.html)  (Breathnú Ionad Monatóireachta Córas)  
*   [NOAAPIFSC](https://oceanwatch.pifsc.noaa.gov/erddap/index.html)  (An tAigéan Ciúin Oileáin Ionad Eolaíochta Iascaigh)  
*   [NOAAPMEL](https://data.pmel.noaa.gov/pmel/erddap/index.html)
*   [NOAAFéach ar an bpróifíl](https://polarwatch.noaa.gov/erddap/index.html)
*   [NOAAUISCE](https://upwell.pfeg.noaa.gov/erddap/index.html)  (Creat Rochtana aontaithe)  
*   [Aigéan Líonraí Ceanada](http://dap.onc.uvic.ca/erddap/index.html) 
*   [Ocean Rianú Líonra](https://members.oceantrack.org/erddap/index.html) 
*   [OOI / Gach Sonraí](https://erddap-goldcopy.dataexplorer.oceanobservatories.org/erddap/index.html)  (Tionscnamh Breathnóirí Aigéan)   
Sonraí OOI / Neamhchumasaithe
* Princeton, Hydrometeorology Research Group
* R.Tech Engineering, France
*   [Rutgers University, Roinn na nEolaíochtaí Mara agus Cósta](https://tds.marine.rutgers.edu/erddap/index.html)  
* Institiúid San Francisco Estuary
*   [Scripps Institiúid Aigéineolaíocht, Sprae Faoi Uisce Gliders](https://spraydata.ucsd.edu/erddap/index.html) 
*   [An tAigéan Ciúin](https://www.smartatlantic.ca/erddap/index.html)Memorial University Talamh an Éisc
* Líonra Breathnóireachta Comhshaoil na hAfraice Theas
* Córais stiúrtha
* Ollscoil Stanford, Stáisiún Mara Hopkins
*   [UNESCO IODE](https://erddap.oa.iode.org/erddap/index.html)  (Oceanographic agus Faisnéise Idirnáisiúnta Sonraí a Mhalartú)  
*   [Ollscoil British Columbia, Domhan, Aigéan &amp; Atmaisféar An Roinn Eolaíochta](https://salishsea.eos.ubc.ca/erddap/index.html) 
*   [Ollscoil California ag Davis, Saotharlann Mara Bodega](http://bmlsc.ucdavis.edu:8080/erddap/index.html) 
*   [Ollscoil Delaware, Stáisiún Glacadh Satailíte](https://basin.ceoe.udel.edu/erddap/index.html) 
* Ollscoil Washington, Fisic Fheidhmeach Saotharlainne
*   [Seirbhís do Chustaiméirí](https://geoport.usgs.esipfed.org/erddap/index.html)  (Cósta agus Geology Mara Clár)  
*   [VOTO](https://erddap.observations.voiceoftheocean.org/erddap/index.html)  (Guth As an Aigéan, an tSualainn)  

Is é seo an liosta de ach cuid de na heagraíochtaí inaERDDAP™suiteáilte ag duine éigin nó grúpa éigin. Ní chuireann sé le tuiscint go bhfuil an duine aonair, an grúpa, nó an eagraíocht Molann nó formhuiníonnERDDAP.

### ERDDAP™Moltar laistigh deNOAAagus ACRS{#erddap-is-recommended-within-noaa-and-cnrs} 
[NOAA's Treoir maidir le Rochtain ar Shonraí](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations)folaíonn séERDDAP™ina liosta de na freastalaithe sonraí molta le húsáid ag grúpaí laistighNOAA.ERDDAP™atá luaite go fabhrach in alt 4.2.3 den
[Dúirt na bonn agus na príomhchúiseanna le gestion des données de la recherche
 (Sonraí Teagmhála Treoir Chleachtais is Fearr) ] ( https://mi-gt-donnees.pages.math.unistra.fr/guide/04-traiter.html#deposer-et-structurer-dans-des-plateformes-de-gestion-de-donnees-locales ) an Ionad Náisiúnta de la Recherche Scientifique (CNRS) sa Fhrainc.

## Seónna Slide{#slide-shows} 

Seo roinnt seónna sleamhnán PowerPoint agus doiciméid go bhfuil Bob Simons cruthaíodh a bhaineann leERDDAP.

 **DISCLAIMER: Is iad tuairimí pearsanta Bob Simons an t-ábhar agus na tuairimí a léirítear sna doiciméid seo agus ní gá go léireodh siad aon phost de chuid an Rialtais nó an RialtaisNational Oceanic and Atmospheric Administration.** 

Na ceithre Phríomhdhoiciméid:

*   [An príomhrá a thabhairt isteachERDDAP™  (leagan 5) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTalk5.pptx).
Is féidir leat freisin[féachaint ar an físeán seo de Bob a thabhairt ar an labhairt![Nuacht agus Imeachtaí](/img/youtube.png)](https://www.youtube.com/watch?v=H541G1XXZrU&t=4).
*   [A One Page DescriptionERDDAP™  (Clár na dToghthóirí) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ERDDAP_OnePage.pdf)
*   [ERDDAP: Luchtaigh Trom, Grids, Clusters, Cónaidhm, agus Cloud Ríomhaireacht](/docs/server-admin/scaling)
*   [Treoirlínte Bob do Chórais Dáileadh Sonraí](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html)

Cur i láthair eile:

*   [2020 EDM: Gnéithe nua iERDDAP™v2.10](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapFeatures2.10.pptx)
*   [2020-05-19 DMIT: Sonraí Ingest](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapDataIngest.pptx)  (Nó[féachaint ar an físeán seo de Bob a thabhairt ar an labhairt](https://www.youtube.com/watch?v=9ArYxgwON2k).) 
*   [2019 IOOS DMAC: Gnéithe nua iERDDAP™v2.0](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/Erddapv2Features.pptx)
*   [2018 2018 2018 2018 Samhradh SIEP: Fo-shocrú IERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapSubset2018.pptx)
*   [2018 2018 2018 2018 Samhradh SIEP: Tacaíocht JSON InERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapJson2018.pptx)
*   [2018 EDM: Córas Dáilte Seirbhísí Gréasáin (airde plandaí (cm): níos ísle 30 cm)   (Nó, cén fáth go raibh mé sásta 4 bliain ó shin.) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/10P.04_Simons_DistributedWebServices2018.pptx)
*   [2018 EDM:ERDDAP™in 2018](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/7A4_Simons_ErddapSession2018.pptx)
*   [2018 EDM: Gnéithe nua iERDDAP™le haghaidh Íomhá, Fuaime, agus Video Sonraí](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/4D4_Simons_ErddapMediaFiles2018.pptx)
*   [2018 EDM: UAF agusERDDAP™Réitigh le haghaidh Comhtháthú Sonraí](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/3D3_Simons_DataIntegration2018.pptx)
*   [2017 EDM: Réamhrá tapa chunERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapIntro.pptx)
*   [2017 EDM agus 2017 IOOS: Nua nó Little KnownERDDAP™Gnéithe (do Úsáideoirí) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapUserFeatures2017.pptx)
*   [2017 EDM agus 2017 IOOS: Nua nó Little KnownERDDAP™Gnéithe (do Riarthóirí) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapAdminFeatures2017.pptx)
*   [2017 EDM: EML, KNB, agusERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/eml_knb_erddap.pptx)
*   [2017 2017 2017 EDM: Conas a dhéanann sonraí a fháil ón bhfoinse chuig an úsáideoir deiridh? Sean Scoil i gcoinne Scoil Nua](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OldSchoolNewSchool.pptx)
*   [2016 2016 2016 2016 Samhradh SIEP: An Pictiúr Mór: PARR,OPeNDAP,ERDDAP™, agus Dáileadh Sonraí](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheBigPicture.pptx)
*   [2016 EDM: One Agus Arna dhéanamh](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OneAndDone.pptx)
*   [2016 2016 2016 2016 Gov API: An Chéad Ghlúin Eile Freastalaithe Sonraí](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/NextGeneration.pptx)
*   [irl - 2015 Programmes Samhradh SIEP: Comhiomlánú Tabular](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularAggregation.pptx)
*   [2014 EDM: Do Bob agus Ná le haghaidh Sonraí Tabular](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsDosDontsTabular.pptx)
*   [2014 EDM: An comhéadan úsáideora Ideal](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheIdealUserInterface.pptx)
*   [Roghnaigh gach rud Samhradh SIEP: Sonraí Tabular](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularData.pptx)
*   [2013: Ná Treat In-Situ agus Sonraí Tabular Cosúil Sonraí Gridded](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TablesAndGrids.html)
*   [2013 EDM: An bhfuil níos mó Le Lúide](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/DoMoreWithLess.ppt)
*   [2012 EDM: Treoirlínte do Chórais Dáileadh Sonraí](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/guidelines3.ppt)

Cur i láthair ag Daoine Eile:

*   [Uirlis atá bunaithe ar FAIR chun comhroinnt Sonraí Domhanda a fheabhsú![Nuacht agus Imeachtaí](/img/youtube.png)](https://www.youtube.com/watch?v=kdBTgNEp5TA&ab_channel=GOOSIOC)  
ag Kevin O'Brien ag an gCóras Domhanda Aigéan Breathnú (Seirbhís do Chustaiméirí) Grúpa Comhordaithe Gréasáin / Breathnóireachta (Amharc ar gach eolas) Sraith / 1, Samhain 12, 2020.
*   [Tógáil Do Féin Aimsir App Ag baint úsáide asNOAASonraí Oscailte agus Leabhair Nótaí Jupyter![Nuacht agus Imeachtaí](/img/youtube.png)](https://www.youtube.com/watch?v=MF-WH01Qw0g)  
ag Filipe Fernandes agus Rich Signell ag SciPy 2018, Iúil 13, 2018.
*   [Ag baint úsáide as an OOIERDDAP![Nuacht agus Imeachtaí](/img/youtube.png)](https://www.youtube.com/watch?v=tj4M9hodTG0)  
ag Rich Signell, Feabhra 2018.
*   [SEIFÍS Tech Léim: "ERDDAPCainteanna Lightning "![Nuacht agus Imeachtaí](/img/youtube.png)](https://youtu.be/2-ydBByYB0M?t=160)  
Ocht 5-Minute cainteanna Maidir Suimiúil Daoine Rudaí An bhfuil Doing LeERDDAPag Jenn Sevadjian, Jim Potemra, Conor Delaney, Kevin O'Brien, John Kerfoot, Stephanie Petillo, Charles Carleton agus Eli Hunter i láthair mar tumadóireachtP Teicneoir Teicneoir ar 31 Lúnasa, 2017.
*   [Ag baint úsáide asERDDAP™Rochtain a fháil ar Shonraí Tabular![Nuacht agus Imeachtaí](/img/youtube.png)](https://www.youtube.com/watch?v=_BwMHRh7CS8)  
ag Rich Signell, Lúnasa 2015.
*   [Tástáil Ag baint úsáide asERDDAP™Sonraí Carbóin Gorm![Nuacht agus Imeachtaí](/img/youtube.png)](https://www.youtube.com/watch?v=TbOhElC_-qU)  
ag Rich Signell, Lúnasa 2015.
*   [Ag baint úsáide as Sonraí ÓERDDAP™iNOAA'sGNOMEBogearraí Bogearraí![Nuacht agus Imeachtaí](/img/youtube.png)](https://www.youtube.com/watch?v=18xZoXu1USM).
Sa físeán seo, Rich Signell íosluchtú sruthanna farraige réamhaisnéis sonraí óERDDAP™chun samhail doirte tocsaineach san fharraige ag baint úsáide as[NOAA'sGNOMEbogearraí](https://response.restoration.noaa.gov/oil-and-chemical-spills/oil-spills/response-tools/gnome.html)  (i 5 nóiméad&#33;) . (Earráid amháin beag bídeach sa físeán: nuair a chuardach le haghaidh tacair sonraí, ná úsáid agus idir téarmaí cuardaigh. Tá sé intuigthe.) De réir Rich Signell, 8 Aibreán, 2011.
