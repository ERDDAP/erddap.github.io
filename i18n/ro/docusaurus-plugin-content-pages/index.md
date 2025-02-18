---
title: "ERDDAP™ Documentation"
---
## UltimeleERDDAP™versiune{#latest-erddap-version} 

2,25, a se vedea[documentația privind modificările](/changes#version-225)şi[descarcă](https://github.com/ERDDAP/erddap/releases/tag/v2.25.1).

## ERDDAP™informații{#erddap-information} 

ERDDAP™este un server de date ştiinţifice care oferă utilizatorilor un mod simplu, consistent de a descărca subseturi de
seturile de date ştiinţifice grupate şi tabulare în formate de fişiere comune şi să facă grafice şi hărţi.
ERDDAP™este o sursă liberă și deschisă (Apaşi şi apaşi)  JavaServire dinNOAA NMFS SWFSCDivizia de cercetare în domeniul mediului (ERD) .

* Pentru a vedea / utilizaERDDAP™instalare:[ https://coastwatch.pfeg.noaa.gov/erddap/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/index.html)
* Pentru a începe cu o instalare citită[ghidul de instalare a implementarii](/docs/server-admin/deploy-install).
* Pentru a contribui la codul a se vedea[Ghidul programatorului](/docs/contributing/programmer-guide).


Mai jos veți găsi link-uri relevante pentru a pune întrebări și cum să contribuie.
* Revizuiţi conversaţiile şi puneţi întrebări la[ https://groups.google.com/g/erddap ](https://groups.google.com/g/erddap)sau la[ https://github.com/erddap/erddap/discussions ](https://github.com/erddap/erddap/discussions)
* Revizuirea și prezentarea problemelor[ https://github.com/erddap/erddap/issues ](https://github.com/erddap/erddap/issues)
* Pentru a propune cereri de caracteristici, urmați aceste orientări:[ERDDAPDiscuţii #93 (comentariu) ](https://github.com/ERDDAP/erddap/discussions/93#discussion-4920427)


## Caută mai multeERDDAP™s
Există două moduri de a căuta mai multeERDDAP™s pentru seturi de date:[Caută mai multeERDDAP™s](/SearchMultipleERDDAPs.html)şi[ERDDAP™Descoperirea datelor](http://erddap.com/).


## Configuraţi - vă propriulERDDAP™ {#set-up-your-own-erddap} 

ERDDAP™este[Sursă liberă și deschisă](https://en.wikipedia.org/wiki/Free_and_open-source_software)Toate...Java  (servlet) , aplicație web care rulează într-un server de aplicații web (De exemplu, Tomcat (recomandată) , sau Jetty (funcţionează, dar noi nu-l sprijinim.) ) . Această pagină web este în principal pentru oameni ("ERDDAP™administratori") care vor să-şi facă propria afacereERDDAP™instalarea pe propriul site web.

Pentru a începe cu o instalare citită[ghidul de instalare a implementarii](/docs/server-admin/deploy-install).

### De ce să utilizaţiERDDAP™să distribui datele tale?{#why-use-erddap-to-distribute-your-data} 

Pentru că efortul mic de a configuraERDDAP™aduce multe beneficii.

* Dacă aveți deja un serviciu web pentru distribuirea datelor dvs.,
Puteți configuraERDDAP™accesarea datelor dumneavoastră prin intermediul serviciului existent.
Sau, puteți configuraERDDAP™pentru a accesa datele direct din fișierele locale.
* Pentru fiecare set de date, trebuie doar să scrieți o mică bucată de XML pentru a spuneERDDAP™modul de accesare a setului de date.
* Odată ce aiERDDAP™servind datele dvs., utilizatorii finali pot:
    * Cere datele în diferite moduri (DAP,WMS, și mai mult în viitor) .
    * Obțineți răspunsul datelor în diferite formate de fișiere. (Acesta este, probabil, cel mai mare motiv&#33;) 
    * Faceţi grafice şi hărţi. (Tuturor le plac pozele frumoase.) 
    * Construiesc alte lucruri utile și interesante pe partea de sus aERDDAPServiciile web -- vezi[Awesome ERDDAPTM](https://github.com/IrishMarineInstitute/awesome-erddap)lista de minunatERDDAP- proiecte conexe.

Poţi[personalizează](/docs/server-admin/deploy-install#customize)dumneavoastrăERDDAPAşa arată.ERDDAP™reflectă organizația dumneavoastră și se potrivește cu restul site-ului dumneavoastră.

## Este procedura de instalare greu? Pot s-o fac?{#is-the-installation-procedure-hard-can-i-do-it} 

Instalarea inițială ia ceva timp, dar nu este foarte greu. Poţi s-o faci. Dacă te blochezi, trimite-mi un e-mail laerd dot data at noaa dot gov. Te voi ajuta.
Sau, vă puteți alătura[ERDDAP™Google Group / Listă de corespondență](https://groups.google.com/g/erddap)şi pune-ţi întrebarea acolo.

## Cine foloseşteERDDAP™ {#who-uses-erddap} 

ERDDAP™a fost instalat de aproximativ 100 de organizații în cel puțin 17 țări

 (Australia, Belgia, Canada, China, Franța, India, Irlanda, Italia, Noua Zeelandă, Rusia, Africa de Sud, Spania, Sri Lanka, Suedia, Thailanda, Marea Britanie, SUA) , inclusiv:

*   [APDRC](https://apdrc.soest.hawaii.edu/erddap/index.html)  (Asia-Pacific Data-Centrul de cercetare, Centrul International de Cercetare Pacific) la Universitatea din Hawaii (UH)  
*   [BCO-DMO la WHOI](https://erddap.bco-dmo.org/erddap/index.html)  (Oceanografie biologică și chimică Biroul de gestionare a datelor la Woods Hole Oceanographic Instituţie)  
*   [CanwinERDDAP™](https://canwinerddap.ad.umanitoba.ca/erddap/index.html)  (Canadian Watershed Information Network) la Centrul de observare a Pământului (CEOS) , University of Manitoba
*   [CDIP](https://erddap.cdip.ucsd.edu/erddap/index.html)  (Programul de informare privind datele de coastă la UCSD)  
*   [CNR-ISP](https://data.iadc.cnr.it/erddap/index.html)  (Consiliul Naţional de Cercetare din Italia, Institutul de Ştiinţe Polare)  
* CSIRO și OMI (Australia Commonwealth Science and Industrial Research Organization and the Integrated Marine Observating System) 
*   [DIVER (NOAARRO) ](https://pub-data.diver.orr.noaa.gov/erddap/index.html)  (NOAABiroul de Răspuns și Restaurare)  
*   [Fizica EMODnet](https://erddap.emodnet-physics.eu/erddap/index.html)  (Rețeaua europeană de observare și date privind mediul marin -- Fizică)  
*   [GOMRI](https://erddap.griidc.org/erddap/index.html)  (Inițiativa de cercetare din Golful Mexic)  
*   [Institutul Hakai](https://catalogue.hakai.org/erddap/index.html)  (Institutul Hakai de pe coasta centrală a Columbiei Britanice, Canada) 
*   [Servicii de tehnologie de liceu](https://myhsts.org), care oferă cursuri de codificare și tehnologie pentru studenți și adulți
*   [ICHEC](https://erddap.ichec.ie/erddap/index.html)  (Centrul Irlandez de Calcule de Inalta Sfarsit) 
*   [INCOESTE](https://erddap.incois.gov.in/erddap/index.html)  (Centrul Național Indian pentru Servicii de Informații Oceanice)  
* IRD (Institut de Recherche pour le Développement, Franța)   
CNRS (Centre National de la Recherche Scientifique, Franţa)   
UPMC (Université Pierre et Marie Curie, Paris, Franța)   
UCAD (Université Cheikh Anta Diop de Dakar, Sénégal)   
UGB (Université Gaston Berger -- Saint-Louis du Sénégal)   
UFHB (Université Félix HOUPHOUET-BOIGNY, Abidjan, Côte d'Ivoire)   
IPSL (Institut Pierre Simon Laplace des Sciences de l'environnement, Paris; Franța)   
LMI ECLAIRS (Laboratoire Mixte International ) 
* JRC (Comisia Europeană - Centrul Comun de Cercetare, Uniunea Europeană) 
*   [Institutul Marine](https://erddap.marine.ie/erddap/index.html)  (Irlanda)  
* Marine Instruments S.A. (Spania) 
* NCI (Infrastructura naţională de calcul a Australiei) 
*   [NOAACoastWatch](https://coastwatch.noaa.gov/erddap/index.html)  (centrală)  
*   [NOAACGOM CoastWatch](https://cwcgom.aoml.noaa.gov/erddap/index.html)  (Caraibe/Golful din Mexic)  
*   [NOAACoastWatch GLERL](https://coastwatch.glerl.noaa.gov/erddap/index.html)  (Nodul Marilor Lacuri)  
*   [NOAACoastWatch Coasta de Vest](https://coastwatch.pfeg.noaa.gov/erddap/index.html)care este co-locat cu și lucrează cu
    [NOAA ERD](https://coastwatch.pfeg.noaa.gov/erddap/index.html)  (Divizia de cercetare în domeniul mediului dinSWFSCdinNMFS) 
*   [NOAASenzori IOOS](https://erddap.sensors.ioos.us/erddap/index.html)  (Sistem integrat de observare a oceanelor)  
*   [NOAAIOOS CENCOOS](https://erddap.axiomdatascience.com/erddap/index.html)  (Central și Nord California Ocean Observating System, condus de Axiom Data Science)  
*   [NOAAIOOS GCOOS Date atmosferice și oceanografice: Sistemul de observare](https://erddap.gcoos.org/erddap/index.html)  
    [NOAAIOOS GCOOS Date atmosferice și oceanografice: Colecții istorice](https://gcoos5.geos.tamu.edu/erddap/index.html)  
    [NOAAIOOS GCOOS Biological and Socioeconomics](https://gcoos4.tamu.edu/erddap/index.html)  (Sistemul de observare a oceanului de pe coasta Golfului) 
*   [NOAAIOOS NERACOOS](http://www.neracoos.org/erddap/index.html)  (Asociaţia Regională Nord-Est a Sistemelor de Observare a Coastei şi Oceanului)  
*   [NOAAIOOS NGDAC](https://data.ioos.us/gliders/erddap/index.html)  (Glider național Centrul de colectare a datelor)  
*   NOAAIOOS NANOOS (Northwest Association of Networked Ocean Observating Systems) 
*   [NOAAIOOS PACIOOS](https://pae-paha.pacioos.hawaii.edu/erddap/index.html)  (Pacific Islands Ocean Observating System) la Universitatea din Hawaii (UH)  
*   NOAAIOOS SCCOOS (Sistemul de observare a oceanului de coastă din California de Sud) 
*   [NOAAIOOS SECOORA](https://erddap.secoora.org/erddap/index.html)  (Southeast Coast Ocean Observarea Asociaţiei Regionale)  
*   [NOAANCEI](https://www.ncei.noaa.gov/erddap/index.html)  (Centre naţionale de informare privind mediul)    
*   NOAANGDC STP (Geofizică națională Data Center, Solar -- Fizica Terestră) 
*   NOAA NMFSNEFSC (Northeast Fisheries Science Center) 
*   [NOAACOOPS NOS](https://opendap.co-ops.nos.noaa.gov/erddap/index.html)  (Centrul pentru Produse şi Servicii Oceanografice Operaţionale)  
*   [NOAAOSMC](http://osmc.noaa.gov/erddap/index.html)  (Centrul de monitorizare a sistemului de observare)  
*   [NOAAPIFSC](https://oceanwatch.pifsc.noaa.gov/erddap/index.html)  (Pacific Islands Fisheries Science Center)  
*   [NOAAPMEL](https://data.pmel.noaa.gov/pmel/erddap/index.html)
*   [NOAAPolarWatch](https://polarwatch.noaa.gov/erddap/index.html)
*   [NOAAUAF](https://upwell.pfeg.noaa.gov/erddap/index.html)  (Cadrul unic de acces)  
*   [Ocean Networks Canada](http://dap.onc.uvic.ca/erddap/index.html) 
*   [Reţeaua de urmărire oceanică](https://members.oceantrack.org/erddap/index.html) 
*   [OOI / Toate datele](https://erddap-goldcopy.dataexplorer.oceanobservatories.org/erddap/index.html)  (Inițiativa privind observatoarele oceanice)   
OOI / Date necabled
* Princeton, Hydrometeorology Research Group
* R.Tech Engineering, Franţa
*   [Universitatea Rutgers, Departamentul de Științe Marine și Coastale](https://tds.marine.rutgers.edu/erddap/index.html)  
* Institutul Estuar din San Francisco
*   [Instituţia de Oceanografie, Spray Underwater Gliders](https://spraydata.ucsd.edu/erddap/index.html) 
*   [Oceanul Atlantic inteligent](https://www.smartatlantic.ca/erddap/index.html)Universitatea Memorială din Newfoundland
* Rețeaua de observare a mediului din Africa de Sud
* Tehnologiile Spyglass
* Universitatea Stanford, Gara Marine Hopkins
*   [UNESCO IODE](https://erddap.oa.iode.org/erddap/index.html)  (Oceanografie internațională și informare Schimbul de date)  
*   [Universitatea din Columbia Britanică, Pământ, Ocean și Atmosferă Departamentul de Ştiinţe](https://salishsea.eos.ubc.ca/erddap/index.html) 
*   [Universitatea din California la Davis, Laboratorul Marine Bodega](http://bmlsc.ucdavis.edu:8080/erddap/index.html) 
*   [Universitatea din Delaware, staţia de recepţie prin satelit](https://basin.ceoe.udel.edu/erddap/index.html) 
* Universitatea din Washington, Laboratorul de Fizică Aplicată
*   [USGS CMGP](https://geoport.usgs.esipfed.org/erddap/index.html)  (Programul de Geologie costieră și marină)  
*   [VOTO](https://erddap.observations.voiceoftheocean.org/erddap/index.html)  (Vocea Oceanului, Suedia)  

Aceasta este o listă de doar unele dintre organizațiile în careERDDAP™a fost instalat de o persoană sau de un grup. Aceasta nu implică faptul că individul, grupul, sau organizația recomandă sau susțineERDDAP.

### ERDDAP™se recomandă înNOAAși CNRS{#erddap-is-recommended-within-noaa-and-cnrs} 
[NOAADirectiva privind procedura de acces la date](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations)includeERDDAP™în lista sa de servere de date recomandate pentru utilizarea de către grupuri din cadrulNOAA.ERDDAP™este menţionat favorabil în secţiunea 4.2.3 a
[Guide de bonnes pratiques sur la gestion des données de la recherche]
 (Managementul datelor de cercetare Ghid de bune practici) ] ( https://mi-gt-donnees.pages.math.unistra.fr/guide/04-traiter.html#deposer-et-structurer-dans-des-plateformes-de-gestion-de-donnees-locales ) al Centrului National de la Recherche Scientifique (CNRS) în Franţa.

## Slide Show-uri{#slide-shows} 

Iată câteva slide-uri PowerPoint și documente pe care Bob Simons le-a creat legate deERDDAP.

 **Conţinutul şi opiniile exprimate în aceste documente sunt opiniile personale ale lui Bob Simons şi nu reflectă neapărat nici o poziţie a Guvernului sauNational Oceanic and Atmospheric Administration.** 

Cele patru documente principale:

*   [Principala introducere laERDDAP™  (versiunea 5) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTalk5.pptx).
Puteți, de asemenea,[Uita-te la acest videoclip de Bob da această discuție![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=H541G1XXZrU&t=4).
*   [O pagină de descriere aERDDAP™  (.pdf) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ERDDAP_OnePage.pdf)
*   [ERDDAP: Greiloads, Grids, Clusters, Federations, and Cloud Computing](/docs/server-admin/scaling)
*   [Orientările lui Bob pentru sistemele de distribuţie a datelor](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html)

Alte prezentări:

*   [2020 EDM: Noi caracteristici înERDDAP™v2.10](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapFeatures2.10.pptx)
*   [2020-05-19 DMIT: Ingest de date](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapDataIngest.pptx)  (Sau[Uita-te la acest videoclip de Bob da această discuție](https://www.youtube.com/watch?v=9ArYxgwON2k).) 
*   [2019 IOOS DMAC: Noi caracteristici înERDDAP™v2. 0](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/Erddapv2Features.pptx)
*   [2018 Summer ESIP: Subsetarea înERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapSubset2018.pptx)
*   [2018 Summer ESIP: JSON Support InERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapJson2018.pptx)
*   [2018 EDM: un sistem distribuit de servicii web (Mai repede, mai uşor, mai puţin scump.)   (Sau, de ce am fost fericit acum 4 ani.) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/10P.04_Simons_DistributedWebServices2018.pptx)
*   [2018 EDM:ERDDAP™în 2018](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/7A4_Simons_ErddapSession2018.pptx)
*   [2018 EDM: Noi caracteristici înERDDAP™pentru imagini, audio și date video](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/4D4_Simons_ErddapMediaFiles2018.pptx)
*   [2018 EDM: UAF șiERDDAP™Soluţii pentru integrarea datelor](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/3D3_Simons_DataIntegration2018.pptx)
*   [2017 EDM: o introducere rapidă laERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapIntro.pptx)
*   [2017 EDM și 2017 IOOS: Nou sau puțin cunoscutERDDAP™Caracteristici (Pentru utilizatori) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapUserFeatures2017.pptx)
*   [2017 EDM și 2017 IOOS: Nou sau puțin cunoscutERDDAP™Caracteristici (pentru administratori) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapAdminFeatures2017.pptx)
*   [2017 EDM: EML, KNB șiERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/eml_knb_erddap.pptx)
*   [2017 EDM: Cum ajung datele de la sursă la utilizatorul final? Old School versus New School](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OldSchoolNewSchool.pptx)
*   [2016 Summer ESIP: The Big Picture: PARR,OPeNDAP,ERDDAP™, și Distribuția datelor](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheBigPicture.pptx)
*   [2016 EDM: One and Done](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OneAndDone.pptx)
*   [2016 Gov API: generaţia următoare Servere de date](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/NextGeneration.pptx)
*   [2015 Summer ESIP: Agregarea tabelară](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularAggregation.pptx)
*   [2014 EDM: Bob's Do și nu pentru Tabular Data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsDosDontsTabular.pptx)
*   [2014 EDM: Interfaţa cu utilizatorul ideală](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheIdealUserInterface.pptx)
*   [2014 Summer ESIP: Date tabelare](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularData.pptx)
*   [2013: Nu trata in-Situ și tabular date ca Gridded Data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TablesAndGrids.html)
*   [2013 EDM: Face mai mult cu mai puțin](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/DoMoreWithLess.ppt)
*   [2012 EDM: Orientări pentru sistemele de distribuție a datelor](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/guidelines3.ppt)

Prezentari de catre alte persoane:

*   [Un instrument bazat pe FAIR pentru îmbunătățirea schimbului global de date![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=kdBTgNEp5TA&ab_channel=GOOSIOC)  
de Kevin O'Brien la Global Ocean Observating System (GOOS) Grupul de coordonare Webinar / Observare (OCG) Series / 1, November 12, 2020.
*   [Construirea propriei aplicații meteoNOAADeschide date și notebook-uri Jupyter![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=MF-WH01Qw0g)  
de Filipe Fernandes și Rich Signell la SciPy 2018, 13 iulie 2018.
*   [Utilizarea OOIERDDAP![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=tj4M9hodTG0)  
de Rich Signell, februarie 2018.
*   [ESIP Tech Dive: "ERDDAPLightning Talks"![YouTube](/img/youtube.png)](https://youtu.be/2-ydBByYB0M?t=160)  
Opt discuţii despre lucruri interesante pe care oamenii le facERDDAPde Jenn Sevadjian, Jim Potemra, Conor Delaney, Kevin O'Brien, John Kerfoot, Stephanie Petillo, Charles Carleton și Eli Hunter au prezentat în data de 31 august 2017.
*   [UtilizareaERDDAP™Accesează datele tabelare![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=_BwMHRh7CS8)  
de Rich Signell, august 2015.
*   [Se testează utilizareaERDDAP™pentru datele privind carbonul albastru![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=TbOhElC_-qU)  
de Rich Signell, august 2015.
*   [Utilizarea datelor dinERDDAP™înNOAA'sGNOMEProgram![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=18xZoXu1USM).
În acest videoclip, Rich Signell descarcă datele prognozate ale curenţilor oceanici dinERDDAP™pentru a modela o deversare toxică în ocean folosind[NOAA'sGNOMEsoftware](https://response.restoration.noaa.gov/oil-and-chemical-spills/oil-spills/response-tools/gnome.html)  (În 5 minute&#33;) . (O mică eroare în video: atunci când căutați seturi de date, nu utilizați ȘI între termenii de căutare. Este implicit.) De Rich Signell, 8 aprilie 2011.
