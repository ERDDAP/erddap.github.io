---
title: "ERDDAP™ Documentation"
---
## PinakahuliERDDAP™bersyon{#latest-erddap-version} 

2.28.0, tingnan ang[Pagbabago ng dokumentasyon](/changes#version-2280)at[download ito](https://github.com/ERDDAP/erddap/releases/tag/v2.28.0).

## ERDDAP™impormasyon{#erddap-information} 

ERDDAP™ay isang siyentipikong tagapagsilbi ng impormasyon na nagbibigay sa mga gumagamit ng simple at di - nagbabagong paraan ng pag - download ng mga subset ng
Ang magkakaugnay at tabular na siyentipikong mga datasets sa karaniwang mga format ng talaksan at gumagawa ng mga graph at mapa.
ERDDAP™ay Isang Malaya at Bukás na Pinagmumulan (Apache at Apache-tulad ng)  JavaAlisNOAA NMFS SWFSCPaghahati sa Pananaliksik sa Kapaligiran (ERD) .

* Upang makita/gamitan ng aERDDAP™pagluklok:[ https://coastwatch.pfeg.noaa.gov/erddap/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/index.html)
* Upang magsimula sa isang instalasyon na binasa[ng install guide](/docs/server-admin/deploy-install).
* Upang mag - abuloy ng kodigo tingnan ang[gabay ng programmer](/docs/contributing/programmer-guide).


Makikita mo sa ibaba ang kaugnay na mga kaugnayan sa pagtatanong at kung paano mag - aabuloy.
* Repasuhin ang mga pag - uusap at magtanong sa[ https://groups.google.com/g/erddap ](https://groups.google.com/g/erddap)o sa[ https://github.com/erddap/erddap/discussions ](https://github.com/erddap/erddap/discussions)
* Magrepaso at magpadala ng mga isyu[ https://github.com/erddap/erddap/issues ](https://github.com/erddap/erddap/issues)
* Upang magmungkahi ng mga kahilingan, sundin ang patnubay na ito:[ERDDAPTalakayin #93 (komento) ](https://github.com/ERDDAP/erddap/discussions/93#discussion-4920427)


## Maraming PaghahanapERDDAP™s
May dalawang paraan upang saliksikin ang multipleERDDAP™mga datos:[Maraming PaghahanapERDDAP™s](/SearchMultipleERDDAPs.html)at[ERDDAP™Natuklasan ang Dateset](http://erddap.com/).


## Itatag ang Iyong SariliERDDAP™ {#set-up-your-own-erddap} 

ERDDAP™ay isang[Malaya at Bukás na Pinagmumulan](https://en.wikipedia.org/wiki/Free_and_open-source_software), all-Java  (servelet) , web application na tumatakbo sa isang web application server (Halimbawa, si Tomcat (mungkahi) , o Jetty (mabisa ito, subalit hindi namin ito sinusuportahan) ) . Ang pahinang web na ito ay karamihang para sa mga tao ("ERDDAP™Mga administrador") na nagnanais magtatag ng kanilang sarilingERDDAP™sa kanilang sariling website.

Upang magsimula sa isang instalasyon na binasa[ng install guide](/docs/server-admin/deploy-install).

### Kung Bakit Kailangang GamitinERDDAP™upang ipamahagi ang iyong impormasyon?{#why-use-erddap-to-distribute-your-data} 

Sapagkat ang munting pagsisikap na magtayoERDDAP™ay nagdudulot ng maraming kapakinabangan.

* Kung mayroon ka nang web service sa pamamahagi ng iyong datos,
maaari kang magtayoERDDAP™upang makuha ang iyong impormasyon sa pamamagitan ng umiiral na serbisyo.
O, maaari kang magtayoERDDAP™upang makuha ang iyong datos nang tuwiran mula sa lokal na mga file.
* Sa bawat dataset, kailangan mo lamang sumulat ng isang maliit na tipak ng XML upang sabihinERDDAP™kung paano gagamitin ang dataset.
* Minsang magkaroon ka nitoERDDAP™nagsilbi sa inyong data, wakasan ang mga gumagamit nito:
    * Paghingi ng impormasyon sa iba't ibang paraan (DAP,WMS, at higit pa sa hinaharap) .
    * Kunin ang tugon ng datos sa iba't ibang format ng talaksan. (Iyan marahil ang pinakamalaking dahilan&#33;) 
    * Gumawa ng mga graph at mapa. (Lahat ay mahilig sa magagandang larawan.) 
    * Magtayo ng iba pang kapaki - pakinabang at kawili - wiling mga bagay sa ibabaw ngERDDAP'Mga web service - tingnan ang[Awesome ERDDAPTM](https://github.com/IrishMarineInstitute/awesome-erddap)listahan ng kasindak - sindakERDDAPMga proyektong kaugnay nito.

Puwede[Pag - aayos](/docs/server-admin/deploy-install#customize)ng iyongERDDAP' Gayon ang hitsuraERDDAP™ang inyong organisasyon at bagay na bagay sa inyong website.

## Mahirap ba ang paraan ng pagkakabit? Magagawa ko ba ito?{#is-the-installation-procedure-hard-can-i-do-it} 

Ang unang instalasyon ay nangangailangan ng ilang panahon, subalit hindi ito napakahirap. Magagawa mo ito. Kung maipit ka, i-mail mo akoerd dot data at noaa dot gov. Tutulungan kita.
O, maaari kang sumali[ERDDAP™Google Group / Listahan ng mga Sulat](https://groups.google.com/g/erddap)at ipaskil ang iyong tanong doon.

## Sino ang GumagamitERDDAP™ {#who-uses-erddap} 

ERDDAP™ay inilagay ng humigit - kumulang 100 organisasyon sa di - kukulanging 17 bansa

 (Australia, Belgium, Canada, Tsina, Pransiya, India, Ireland, Italya, New Zealand, Russia, Timog Aprika, Espanya, Sri Lanka, Sweden, Thailand, UK, USA) , pati na:

*   [APDRC](https://apdrc.soest.hawaii.edu/erddap/index.html)  (Asia-Pacific Data-Rearch Center, International Pacific Research Center) sa University of Hawaii (UH)  
*   [BCO-DMO sa WHOI](https://erddap.bco-dmo.org/erddap/index.html)  (Biyolohikal at Chemical Oceanography Office ng Data Management sa Woods Hole Oceanographic Pagsasaayos)  
*   [LANGISERDDAP™](https://canwinerddap.ad.umanitoba.ca/erddap/index.html)  (Ang Canadiano Watershed Information Network) Sa Centre for Earth Observation Science (MGA CEO) , Unibersidad ng Manitoba
*   [KONIP](https://erddap.cdip.ucsd.edu/erddap/index.html)  (Programa sa Impormasyon ng Date sa Baybayin sa UCSD)  
*   [CNR-ISP](https://data.iadc.cnr.it/erddap/index.html)  (National Research Council ng Italya, Institute of Polar Sciences)  
* CSIRO at IMOS (Ang Organisasyon ng Commonwealth Scientific and Industrial Research ng Australia at ang Integrated Marine Observing System) 
*   [PAG - ASA (NOAAORR) ](https://pub-data.diver.orr.noaa.gov/erddap/index.html)  (NOAATanggapan ng Pagtugon at Pagbabalik)  
*   [Pisika ng EMODnet](https://erddap.emodnet-physics.eu/erddap/index.html)  (The European Marine Observation and Data Network --- Physics)  
*   [GOMRI](https://erddap.griidc.org/erddap/index.html)  (Ang Paghahanda sa Pananaliksik sa Gulpo ng Mexico)  
*   [Hakai Institute](https://catalogue.hakai.org/erddap/index.html)  (Ang Hakai Institute sa Gitnang Baybayin ng British Columbia, Canada) 
*   [Mga Serbisyo ng Teknolohiya sa Mataas na Paaralan](https://myhsts.org), na nag-aalok ng coding at teknolohiya pagsasanay para sa mga mag-aaral at adulto
*   [ICHEC](https://erddap.ichec.ie/erddap/index.html)  (Irish Centre for High-End Computing) 
*   [AkoNCOIS](https://erddap.incois.gov.in/erddap/index.html)  (Indian National Centre for Ocean Information Services)  
* IRD (Institut de Recherche buhusan ng le Développement, Pransiya)   
MGA CNRE (Centre National de la Recherche Scinifique, Pransiya)   
UPMC (Université Pierre et Marie CURIE, Paris, Pransiya)   
UCAD (Université Cheikh Anta Diop de Dakar, Sénégal)   
UGB (Université Gaston Berger -- Saint-Louis du Sénégal)   
UFHB (Di - sinasadyang Félix HUPHOUOUT-BOGNY, Abidjan, Côte d'Ivoire)   
IPSL (Institut Pierre Simon Laplace des sciences de l'environnement, Paris, Pransiya)   
MGA LMI ECLERS (Pinagsama ang Laboratoire sa Buong Daigdig «Etude du Climat en Afrique de l’Ouest et de ses Interactions avec l’Environnement Régional, et appui aux serbisyo climatiques») 
* JRC (European Commission - Joint Research Centre, European Union) 
*   [Ang Marine Institute](https://erddap.marine.ie/erddap/index.html)  (Irlanda)  
* Marine Instruments S.A. (Espanya) 
* NCI (Ang Pambansang Komputasyonal na Infrastructure ng Australia) 
*   [NOAABantayog sa Baybayin](https://coastwatch.noaa.gov/erddap/index.html)  (gitna)  
*   [NOAACoastWatch CGOM](https://cwcgom.aoml.noaa.gov/erddap/index.html)  (Caribbean/Gulf ng Mexico Node)  
*   [NOAACoastWatch GLERL](https://coastwatch.glerl.noaa.gov/erddap/index.html)  (Ang Great Lakes Node)  
*   [NOAACoastWatch West Coast](https://coastwatch.pfeg.noaa.gov/erddap/index.html)na may kasamang colocated at gumagana
    [NOAA ERD](https://coastwatch.pfeg.noaa.gov/erddap/index.html)  (Paghahati ng Pananaliksik sa KapaligiranSWFSCngNMFS) 
*   [NOAAMga Sensor ng IOOS](https://erddap.sensors.ioos.us/erddap/index.html)  (Sistema ng Obserbasyon sa Karagatan)  
*   [NOAAUso ng IOSNCOOS](https://erddap.axiomdatascience.com/erddap/index.html)  (Central at Hilagang California Ocean Obserbasyon System, na pinatatakbo ng Axiom Data Science)  
*   [NOAAIOOS GCOS A Octronic and Oceanographic Data: Observing System](https://erddap.gcoos.org/erddap/index.html)  
    [NOAAIOOS GCOS A Octronic and Oceanographic Data: Historical Collections](https://gcoos5.geos.tamu.edu/erddap/index.html)  
    [NOAAMGA IOO GCOS Biological and Socio Economics](https://gcoos4.tamu.edu/erddap/index.html)  (Sistema ng Pagmamasid sa Karagatan ng Gulpo) 
*   [NOAAMGA NERACOO](http://www.neracoos.org/erddap/index.html)  (Northeastern Regional Association of Coastal and Ocean Observing Systems)  
*   [NOAAIOOS NGNGDAC](https://data.ioos.us/gliders/erddap/index.html)  (Pambansang Glider Sentro ng Kapulungan ng mga Data)  
*   NOAAMGA IOO NANOO (Northern Association of Networked Ocean Observing Systems) 
*   [NOAAMGA PROO NG IOOS](https://pae-paha.pacioos.hawaii.edu/erddap/index.html)  (Sistema ng Obserbasyon sa Karagatang Pasipiko) sa University of Hawaii (UH)  
*   NOAAMGA SCCOOO NG IOOS (Sistema ng Pagdiriwang sa Southern California Coastal Ocean) 
*   [NOAAIOOS SECOORA](https://erddap.secoora.org/erddap/index.html)  (Southeast Coastal Ocean Obserbasyon sa Rehiyonal na Samahan)  
*   [NOAANCEI](https://www.ncei.noaa.gov/erddap/index.html)  (Pambansang mga Sentro Para sa Impormasyong Pangkapaligiran)    
*   NOAASSTP NG NGNGDC (Pambansang Heopisikal Sentro ng mga Data, Solar -- Terrestrial Physics) 
*   NOAA NMFSNEFSC (Ang Northeast Fisheries Science Center) 
*   [NOAAMGA KONO-OP](https://opendap.co-ops.nos.noaa.gov/erddap/index.html)  (Sentro para sa mga Produksyonal na Panitikan at Serbisyo)  
*   [NOAAOSMC](http://osmc.noaa.gov/erddap/index.html)  (Pagdiriwang ng System Monitoring Center)  
*   [NOAAPIFSC](https://oceanwatch.pifsc.noaa.gov/erddap/index.html)  (Namamalakaya ang mga Isla sa Pasipiko sa Sentro ng Siyensiya)  
*   [NOAAPMEL](https://data.pmel.noaa.gov/pmel/erddap/index.html)
*   [NOAAPolarWatch](https://polarwatch.noaa.gov/erddap/index.html)
*   [NOAAUAF](https://upwell.pfeg.noaa.gov/erddap/index.html)  (Di - maipaliwanag na Gawaing Pagkakamit)  
*   [Mga Ocean Network sa Canada](http://dap.onc.uvic.ca/erddap/index.html) 
*   [Pagsubaybay sa Karagatan Network](https://members.oceantrack.org/erddap/index.html) 
*   [OOI / Lahat ng Data](https://erddap-goldcopy.dataexplorer.oceanobservatories.org/erddap/index.html)  (Inihanda ang mga Obserbatoryo sa Karagatan)   
OOI / Hindi Mapagkakatiwalaang Data
* Princeton, Grupo ng Pananaliksik sa Hydrometeorolohiya
* R.Tech Engineering, Pransiya
*   [Rutgers University, Kagawaran ng Marine and Coastal Sciences](https://tds.marine.rutgers.edu/erddap/index.html)  
* Estasyon ng San Francisco
*   [Scripps Institution of Oceanography, Sprayer Underwater Gliders](https://spraydata.ucsd.edu/erddap/index.html) 
*   [Matalinong Atlantiko](https://www.smartatlantic.ca/erddap/index.html)Memorial University of Newfoundland
* South African Environmental Observation Network
* Mga Technologie ng Spyglass
* Stanford University, Hopkins Marine Station
*   [ISODE NG UNESCO](https://erddap.oa.iode.org/erddap/index.html)  (Internasyonal na Oceanographic at Impormasyon Pagpapalit ng Data)  
*   [Unibersidad ng British Columbia, Lupa, Karagatan & Atmospheric Departamento ng Sciences](https://salishsea.eos.ubc.ca/erddap/index.html) 
*   [Unibersidad ng California sa Davis, Bidega Marine Laboratory](http://bmlsc.ucdavis.edu:8080/erddap/index.html) 
*   [Unibersidad ng Delaware, Istasyon ng Satelayt](https://basin.ceoe.udel.edu/erddap/index.html) 
* Unibersidad ng Washington, Arpieded Physics Laboratory
*   [USGS CMGP](https://geoport.usgs.esipfed.org/erddap/index.html)  (Programa ng Kalyal at Marine Geology)  
*   [LALATO](https://erddap.observations.voiceoftheocean.org/erddap/index.html)  (Tinig ng Karagatan, Sweden)  

Ito ay isang talaan ng ilan lamang sa mga organisasyon kung saanERDDAP™ay ikinabit ng isang indibiduwal o ng isang grupo. Hindi nito ipinahihiwatig na ang indibiduwal, ang grupo, o ang organisasyon ay nagrerekomenda o nagrerekomendaERDDAP.

### ERDDAP™ay inirerekomenda sa loobNOAAat mga CNR{#erddap-is-recommended-within-noaa-and-cnrs} 
[NOAA'S Data Access Procedual Directive](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations)kasama angERDDAP™sa talaan nito ng inirerekomendang mga server ng impormasyon para gamitin ng mga grupo sa loobNOAA.ERDDAP™ay may pagsang - ayong binabanggit sa seksiyon 4.2.3 ng
[Guide de bonnes pratiques sur la gestion des données de la recherche
 (Pangangasiwa ng Pananaliksik na Data Pinakamabuting Gabayin) ] ( https://mi-gt-donnees.pages.math.unistra.fr/guide/04-traiter.html#deposer-et-structurer-dans-des-plateformes-de-gestion-de-donnees-locales ) ng Centre National de la Recherche Scinifique (MGA CNRE) sa Pransiya.

## Mga Displey na Palabas{#slide-shows} 

Narito ang ilang mga slide show ng PowerPoint at mga dokumento na nilikha ni Bob Simons na may kaugnayan saERDDAP.

 **DISKLAIMER: Ang nilalaman at mga opinyon na ipinahahayag sa mga dokumentong ito ay personal na mga opinyon ni Bob Simons at hindi laging nagpapabanaag ng anumang posisyon ng Pamahalaan o ng PamahalaanNational Oceanic and Atmospheric Administration.** 

Ang Apat na Pangunahing Documents:

*   [Ang pangunahing pambungadERDDAP™  (bersyon 5) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTalk5.pptx).
Maaari mo ring gawin[panoorin ang video na ito ni Bob na nagpapahayag![Ang YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=H541G1XXZrU&t=4).
*   [Isang PaglalarawanERDDAP™  (.pdf) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ERDDAP_OnePage.pdf)
*   [ERDDAP: Mabibigat na Pasan, Grids, Clusters, Pederasyon, at Cloud Computing](/docs/server-admin/scaling)
*   [Mga Tuntunin ni Bob sa Pamamahagi ng mga Date](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html)

Iba Pang Paghaharap:

*   [2020 EDM: Bagong mga Katangian saERDDAP™v2.10](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapFeatures2.10.pptx)
*   [2020-05-19 DMIT: Inggit ng Data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapDataIngest.pptx)  (O[panoorin ang video na ito ni Bob na nagpapahayag](https://www.youtube.com/watch?v=9ArYxgwON2k).) 
*   [2019 IOOS DMAC: Mga Bagong Katangian saERDDAP™v2.0.](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/Erddapv2Features.pptx)
*   [2018 ESIP SA Tag - araw: Paglalagay ng SubsettingERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapSubset2018.pptx)
*   [2018 ESIP SA Tag - araw: Support inERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapJson2018.pptx)
*   [2018 EDM: Sistema ng Pamamahagi ng mga Web Services (Mas Mabilis, Mas Madali, Hindi gaanong Magastos)   (O, kung bakit ako maligaya 4 na taon na ang nakalipas.) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/10P.04_Simons_DistributedWebServices2018.pptx)
*   [2018 EDM:ERDDAP™sa 2018](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/7A4_Simons_ErddapSession2018.pptx)
*   [2018 EDM: Mga Bagong Katangian saERDDAP™para sa Image, Audio, at Video Data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/4D4_Simons_ErddapMediaFiles2018.pptx)
*   [2018 EDM: UAF atERDDAP™Mga Lunas Para sa Paglipat ng Date](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/3D3_Simons_DataIntegration2018.pptx)
*   [2017 EDM: Isang Mabilis na Pagpapakilala saERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapIntro.pptx)
*   [2017 EDM at 2017 IOOS: Bago o Hindi gaanong KilalaERDDAP™Mga Katangian (para sa mga Gumagamit) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapUserFeatures2017.pptx)
*   [2017 EDM at 2017 IOOS: Bago o Hindi gaanong KilalaERDDAP™Mga Katangian (para sa mga Administrador) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapAdminFeatures2017.pptx)
*   [2017 EDM: EML, KNB, atERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/eml_knb_erddap.pptx)
*   [2017 EDM: Paano nakakakuha ng impormasyon mula sa pinagmulan tungo sa gumagamit ng dulo? Lumang Paaralan Laban sa Bagong Paaralan](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OldSchoolNewSchool.pptx)
*   [2016 ESIP SA Tag - araw: Ang Malaking Larawan: PAR,OPeNDAP,ERDDAP™, at Pamamahagi ng Data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheBigPicture.pptx)
*   [2016 EDM: Isa at Ginawa](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OneAndDone.pptx)
*   [2016 Gov API: Susunod na Henerasyon Mga Tagapagsilbi ng Data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/NextGeneration.pptx)
*   [2015 ESIP SA Tag - araw: Tablar Agregation](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularAggregation.pptx)
*   [2014 EDM: Don's at Huwag Para sa Tablar Data ni Bob](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsDosDontsTabular.pptx)
*   [2014 EDM: The Ideal User Interface](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheIdealUserInterface.pptx)
*   [2014 ESIP SA Tag - araw: Tablar Data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularData.pptx)
*   [2013: Huwag Maggamot ng In-Situ at Tablar Data Tulad ng Gridded Data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TablesAndGrids.html)
*   [2013 EDM: Gumawa Nang Higit Pa sa Kaunti](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/DoMoreWithLess.ppt)
*   [2012 EDM: Mga tuntunin para sa mga Sistema ng Pamamahagi ng Date](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/guidelines3.ppt)

Mga Paghaharap ng Ibang Tao:

*   [ISANG matibay na batayang kasangkapan upang mapasulong ang pamamahagi ng Global Data![Ang YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=kdBTgNEp5TA&ab_channel=GOOSIOC)  
ni Kevin O'Brien sa Global Ocean Observing System (MGA GOO) Grupong Pangkasalukuyan / Pagdiriwang (OCG) Serye / 1, Nobyembre 12, 2020.
*   [Pagtatayo ng Iyong Sariling Lagay ng PanahonNOAAOpen Data at mga Tampok na Aklat![Ang YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=MF-WH01Qw0g)  
ni Filipe Fernandes at Rich Signell sa SciPy 2018, Hulyo 13, 2018.
*   [Paggamit ng OOIERDDAP![Ang YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=tj4M9hodTG0)  
by Rich Signell, Pebrero 2018.
*   [ESIP Tech Dive: "ERDDAPNag-uusap ang Kidlat"![Ang YouTube](/img/youtube.png)](https://youtu.be/2-ydBByYB0M?t=160)  
Walong 5-Minutong Pag-uusap Tungkol sa Kawili-wiling mga Bagay na Ginagawa ng mga TaoERDDAPSa pamamagitan nina Jenn Sevadjian, Jim Potemra, Conor Delaney, Kevin O'Brien, John Kerfoot, Stephanie Petrillo, Charles Carleton at Eli Hunter na itinanghal bilang isang ESIP Tech Dive noong Agosto 31, 2017.
*   [PaggamitERDDAP™Upang Makakuha ng Tablar Data![Ang YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=_BwMHRh7CS8)  
Sa pamamagitan ng Rich Signell, Agosto 2015.
*   [Pagsubok sa PaggamitERDDAP™para sa Blue Carbon Data![Ang YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=TbOhElC_-qU)  
Sa pamamagitan ng Rich Signell, Agosto 2015.
*   [Paggamit ng Data Mula saERDDAP™sa loobNOAA'GNOMEKagamitan![Ang YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=18xZoXu1USM).
Sa video na ito, ini - download ng Rich Signell ang mga agos sa karagatan na humuhula ng impormasyon mula sa mga impormasyonERDDAP™upang imodelo ang isang nakalalasong natapong langis sa karagatan[NOAA'GNOMEsoftware](https://response.restoration.noaa.gov/oil-and-chemical-spills/oil-spills/response-tools/gnome.html)  (sa loob ng 5 minuto&#33;) . (Isang maliit na pagkakamali sa video: kapag naghahanap ng datasets, huwag gumamit ng AT sa pagitan ng mga termino sa paghahanap. Ito'y maliwanag.) Sa Pamamagitan ng Mayamang Signell, Abril 8, 2011.
