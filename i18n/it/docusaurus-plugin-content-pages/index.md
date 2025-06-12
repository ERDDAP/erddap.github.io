---
title: "ERDDAP™ Documentation"
---
## Più recentiERDDAP™versione{#latest-erddap-version} 

2.27.0, vedi il[modifiche della documentazione](/changes#version-2270)e[scaricalo](https://github.com/ERDDAP/erddap/releases/tag/v2.27.0).

## ERDDAP™informazioni{#erddap-information} 

ERDDAP™è un server di dati scientifico che dà agli utenti un modo semplice e coerente per scaricare sottoinsiemi di
dati scientifici grigliati e tabulari in formati di file comuni e fare grafici e mappe.
ERDDAP™è una fonte libera e aperta (Apache e Apache)  JavaServlet daNOAA NMFS SWFSCDivisione Ricerca Ambientale (ERD) .

* Per vedere/usareERDDAP™installazione:[ https://coastwatch.pfeg.noaa.gov/erddap/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/index.html)
* Per iniziare con una lettura di installazione[la guida di installazione di distribuzione](/docs/server-admin/deploy-install).
* Per contribuire al codice vedi[Guida del programmatore](/docs/contributing/programmer-guide).


Qui di seguito troverete link rilevanti per fare domande e come contribuire.
* Recensione conversazioni e fare domande a[ https://groups.google.com/g/erddap ](https://groups.google.com/g/erddap)o[ https://github.com/erddap/erddap/discussions ](https://github.com/erddap/erddap/discussions)
* Revisione e presentazione di problemi[ https://github.com/erddap/erddap/issues ](https://github.com/erddap/erddap/issues)
* Per proporre richieste di funzionalità, seguire questa guida:[ERDDAPDiscussioni #93 (commento) ](https://github.com/ERDDAP/erddap/discussions/93#discussion-4920427)


## Ricerca multiplaERDDAP™#
Ci sono due modi per cercare piùERDDAP™s per set di dati:[Ricerca multiplaERDDAP™#](/SearchMultipleERDDAPs.html)e[ERDDAP™Dataset Discovery](http://erddap.com/).


## Impostare il proprioERDDAP™ {#set-up-your-own-erddap} 

ERDDAP™è un[Free e Open Source](https://en.wikipedia.org/wiki/Free_and_open-source_software)♪Java  (Osservatorio) , applicazione web che esegue in un server di applicazione web (per esempio, Tomcat (raccomandato) o Jetty (funziona, ma non lo sosteniamo) ) . Questa pagina web è per lo più per le persone ("ERDDAP™amministratori") che vogliono creare il proprioERDDAP™installazione sul proprio sito web.

Per iniziare con una lettura di installazione[la guida di installazione di distribuzione](/docs/server-admin/deploy-install).

### Perché usareERDDAP™per distribuire i tuoi dati?{#why-use-erddap-to-distribute-your-data} 

Perché il piccolo sforzo di impostareERDDAP™porta molti benefici.

* Se hai già un servizio web per la distribuzione dei tuoi dati,
si può impostareERDDAP™per accedere ai tuoi dati tramite il servizio esistente.
Oppure, si può impostareERDDAP™per accedere ai tuoi dati direttamente dai file locali.
* Per ogni dataset, devi solo scrivere un piccolo pezzo di XML da raccontareERDDAP™come accedere al dataset.
* Una volta che haiERDDAP™al servizio dei tuoi dati, gli utenti finali possono:
    * Richiedi i dati in vari modi (DAP♪WMS, e più in futuro) .
    * Ottieni la risposta dei dati in vari formati di file. (Probabilmente e' il motivo piu' grande&#33;) 
    * Crea grafici e mappe. (A tutti piacciono le belle foto.) 
    * Costruisci altre cose utili e interessanti in cimaERDDAP's servizi web -- vedere il[Awesome ERDDAPTM](https://github.com/IrishMarineInstitute/awesome-erddap)elenco di impressionanteERDDAP- progetti correlati.

Puoi[personalizzare](/docs/server-admin/deploy-install#customize)il tuoERDDAPl'apparenza cosìERDDAP™riflette la tua organizzazione e si inserisce con il resto del tuo sito web.

## La procedura di installazione è difficile? Posso farlo?{#is-the-installation-procedure-hard-can-i-do-it} 

L'installazione iniziale richiede un po' di tempo, ma non è molto difficile. Puoi farcela. Se sei bloccato, mandami un'emailerd dot data at noaa dot gov. Ti aiutero'.
Oppure, puoi unirti al[ERDDAP™Google Group / Mailing List](https://groups.google.com/g/erddap)e posta la tua domanda lì.

## Chi usaERDDAP™ {#who-uses-erddap} 

ERDDAP™è stato installato da circa 100 organizzazioni in almeno 17 paesi

 (Australia, Belgio, Canada, Cina, Francia, India, Irlanda, Italia, Nuova Zelanda, Russia, Sudafrica, Spagna, Sri Lanka, Svezia, Thailandia, Regno Unito, USA) , incluso:

*   [APDRC](https://apdrc.soest.hawaii.edu/erddap/index.html)  (Asia-Pacifico Data-Research Center, International Pacific Research Center) presso l'Università delle Hawaii (U.)  
*   [BCO-DMO a WHOI](https://erddap.bco-dmo.org/erddap/index.html)  (Oceanografia biologica e chimica Ufficio di gestione dei dati a Woods Hole Oceanographic Istituzioni)  
*   [CanWINERDDAP™](https://canwinerddap.ad.umanitoba.ca/erddap/index.html)  (Canadian Watershed Information Network) presso il Centro per la Scienza dell'Osservazione della Terra (CEO) , Università di Manitoba
*   [CDIP](https://erddap.cdip.ucsd.edu/erddap/index.html)  (Programma informativo costiero su UCSD)  
*   [CNR-ISP](https://data.iadc.cnr.it/erddap/index.html)  (Consiglio Nazionale di Ricerca d'Italia, Istituto di Scienze Polari)  
* CSIRO e IMOS (L'Australia's Commonwealth Scientific and Industrial Research Organisation e il sistema integrato di osservazione marina) 
*   [DIVER (NOAAORR) ](https://pub-data.diver.orr.noaa.gov/erddap/index.html)  (NOAAUfficio di Risposta e Restauro)  
*   [EMODnet Fisica](https://erddap.emodnet-physics.eu/erddap/index.html)  (L'Osservazione Marina Europea e la Rete Dati -- Fisica)  
*   [Vai.](https://erddap.griidc.org/erddap/index.html)  (Iniziativa di ricerca del Golfo del Messico)  
*   [Istituto Hakai](https://catalogue.hakai.org/erddap/index.html)  (L'Istituto Hakai sulla costa centrale della British Columbia, Canada) 
*   [Servizi di tecnologia delle scuole superiori](https://myhsts.org), che offre formazione di codifica e tecnologia per studenti e adulti
*   [ICHEC](https://erddap.ichec.ie/erddap/index.html)  (Centro irlandese per l'alta produzione) 
*   [Io...NCOÈ](https://erddap.incois.gov.in/erddap/index.html)  (Centro nazionale indiano per i servizi di informazione sull'oceano)  
* IRD (Institut de Recherche pour le Développement, Francia)   
CNRS (Centre National de la Recherche Scientifique, Francia)   
UPMC (Université Pierre et Marie CURIE, Parigi, Francia)   
UCAD (Université Cheikh Anta Diop de Dakar, Sénégal)   
UGB (Université Gaston Berger -- Saint-Louis du Sénégal)   
UFHB (Université Félix HOUPHOUËT-BOIGNY, Abidjan, Côte d'Ivoire)   
IPSL (Institut Pierre Simon Laplace des sciences de l'environnement, Parigi, Francia)   
LMI ECLAIRS (Laboratoire Mixte International «Etude du Climat en Afrique de l’Ouest et de ses Interactions avec l’Environnement Régional, et appui aux services climatiques») 
* CCR (Commissione europea - Centro comune di ricerca, Unione europea) 
*   [L'Istituto Marino](https://erddap.marine.ie/erddap/index.html)  (Irlanda)  
* Strumenti Marine S.A. (Spagna) 
* NSC (Infrastrutture computazionali nazionali dell'Australia) 
*   [NOAACosta](https://coastwatch.noaa.gov/erddap/index.html)  (centrale centrale)  
*   [NOAACGOM della costa](https://cwcgom.aoml.noaa.gov/erddap/index.html)  (Caraibi / Golfo del Messico Node)  
*   [NOAACosta d'acqua GLERL](https://coastwatch.glerl.noaa.gov/erddap/index.html)  (Grandi laghi Nodo)  
*   [NOAACosta Ovest](https://coastwatch.pfeg.noaa.gov/erddap/index.html)che è co-locato con e lavora con
    [NOAA ERD](https://coastwatch.pfeg.noaa.gov/erddap/index.html)  (Divisione Ricerca AmbientaleSWFSCdiNMFS) 
*   [NOAASensori IOOS](https://erddap.sensors.ioos.us/erddap/index.html)  (Sistema integrato di osservazione dell'oceano)  
*   [NOAAIOOS CeNCOOS](https://erddap.axiomdatascience.com/erddap/index.html)  (Central e Northern California Ocean Observing System, gestito da Axiom Data Science)  
*   [NOAAIOOS GCOOS Dati atmosferici e oceanografici: Sistema di osservazione](https://erddap.gcoos.org/erddap/index.html)  
    [NOAAIOOS GCOOS Atmosferica e Oceanografica Dati: Collezioni storiche](https://gcoos5.geos.tamu.edu/erddap/index.html)  
    [NOAAIOOS GCOOS Biologica e Socioeconomia](https://gcoos4.tamu.edu/erddap/index.html)  (Sistema di osservazione Oceano della costa del Golfo) 
*   [NOAAIOOS NERACOOS](http://www.neracoos.org/erddap/index.html)  (Associazione regionale nordorientale dei sistemi di osservazione costiera e oceanica)  
*   [NOAAIOOS NGDAC](https://data.ioos.us/gliders/erddap/index.html)  (Glider nazionale Centro di assemblaggio dati)  
*   NOAAIOOS NANOOS (Associazione Nord-Occidentale Networked Ocean Observing Systems) 
*   [NOAAIOOS PacIOOS](https://pae-paha.pacioos.hawaii.edu/erddap/index.html)  (Sistema di osservazione Oceano delle Isole del Pacifico) presso l'Università delle Hawaii (U.)  
*   NOAAIOOS SCCOOS (Sistema di osservazione dell'oceano costiero della California meridionale) 
*   [NOAAIOOS SECOORA](https://erddap.secoora.org/erddap/index.html)  (Sud-Est Oceano costiero Osservazione Associazione Regionale)  
*   [NOAANCEI](https://www.ncei.noaa.gov/erddap/index.html)  (Centri nazionali di informazione ambientale)    
*   NOAASTATO NGDC (Geofisica nazionale Data Center, Solar -- Fisica Terrestre) 
*   NOAA NMFSNEFSC (Centro scientifico della pesca nordorientale) 
*   [NOAANOS CO-OPs](https://opendap.co-ops.nos.noaa.gov/erddap/index.html)  (Centro per i prodotti e servizi Oceanografici Operativi)  
*   [NOAAOSMC](http://osmc.noaa.gov/erddap/index.html)  (Centro di monitoraggio del sistema di osservazione)  
*   [NOAAPIFSC](https://oceanwatch.pifsc.noaa.gov/erddap/index.html)  (Centro per la pesca delle isole del Pacifico)  
*   [NOAAPMEL](https://data.pmel.noaa.gov/pmel/erddap/index.html)
*   [NOAAPolarWatch](https://polarwatch.noaa.gov/erddap/index.html)
*   [NOAAUF](https://upwell.pfeg.noaa.gov/erddap/index.html)  (Quadro di accesso unificato)  
*   [Ocean Networks Canada](http://dap.onc.uvic.ca/erddap/index.html) 
*   [Rete di monitoraggio dell'oceano](https://members.oceantrack.org/erddap/index.html) 
*   [OOI / Tutti i dati](https://erddap-goldcopy.dataexplorer.oceanobservatories.org/erddap/index.html)  (Iniziativa Osservatori dell'Oceano)   
OOI / Dati non abilitati
* Princeton, Gruppo di Ricerca Idrometeorologica
* R.Tech Engineering, Francia
*   [Rutgers University, Dipartimento di Scienze marine e costiere](https://tds.marine.rutgers.edu/erddap/index.html)  
* San Francisco Estuary Institute
*   [Scripps Istituzione di Oceanografia, Spray Subwater Gliders](https://spraydata.ucsd.edu/erddap/index.html) 
*   [Smart Atlantic](https://www.smartatlantic.ca/erddap/index.html)Memorial University of Newfoundland
* Rete di osservazione ambientale sudafricana
* Tecnologie di vetro
* Stanford University, Hopkins Marine Station
*   [IODE UNESCO](https://erddap.oa.iode.org/erddap/index.html)  (Oceanografico Internazionale e Informazioni Scambio dati)  
*   [University of British Columbia, Earth, Ocean & Atmospheric Dipartimento di Scienze](https://salishsea.eos.ubc.ca/erddap/index.html) 
*   [Università della California a Davis, Laboratorio marino di Bodega](http://bmlsc.ucdavis.edu:8080/erddap/index.html) 
*   [Università di Delaware, Stazione di ricezione satellitare](https://basin.ceoe.udel.edu/erddap/index.html) 
* Università di Washington, Laboratorio di Fisica Applicata
*   [USGS CMGP](https://geoport.usgs.esipfed.org/erddap/index.html)  (Programma di geologia costiera e marina)  
*   [VOTO](https://erddap.observations.voiceoftheocean.org/erddap/index.html)  (Voce dell'oceano, Svezia)  

Questa è una lista di solo alcune delle organizzazioni doveERDDAP™è stato installato da qualche individuo o da qualche gruppo. Non implica che l'individuo, il gruppo, o l'organizzazione consiglia o approvaERDDAP.

### ERDDAP™è raccomandato all'internoNOAAe CNRS{#erddap-is-recommended-within-noaa-and-cnrs} 
[NOAADirettiva procedurale di accesso ai dati](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations)inclusoERDDAP™nella sua lista di server di dati consigliati per l'utilizzo da parte di gruppi all'internoNOAA.ERDDAP™è favorevolmente menzionato nella sezione 4.2.3 del
[Guide de bonnesques sur la gestion des données de la recherche
 (Gestione dei dati di ricerca Guida alle migliori pratiche) ] ( https://mi-gt-donnees.pages.math.unistra.fr/guide/04-traiter.html#deposer-et-structurer-dans-des-plateformes-de-gestion-de-donnees-locales ) del Centro Nazionale della Recherche Scientifique (CNRS) in Francia.

## Spettacoli di scorrimento{#slide-shows} 

Ecco alcuni spettacoli di diapositiva di PowerPoint e documenti che Bob Simons ha creato relativiERDDAP.

 **DISCLAIMER: Il contenuto e le opinioni espresse in questi documenti sono le opinioni personali di Bob Simons e non riflettono necessariamente nessuna posizione del Governo o delNational Oceanic and Atmospheric Administration.** 

I quattro documenti principali:

*   [L'introduzione principaleERDDAP™  (versione 5) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTalk5.pptx).
Si può anche[guardare questo video di Bob dare questo parlare![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=H541G1XXZrU&t=4).
*   [Descrizione di una paginaERDDAP™  (.pdf) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ERDDAP_OnePage.pdf)
*   [ERDDAP: Carico pesante, griglie, cluster, federazioni e cloud computing](/docs/server-admin/scaling)
*   [Linee guida di Bob per i sistemi di distribuzione dei dati](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html)

Altre presentazioni:

*   [2020 EDM: nuove funzionalità inERDDAP™V2.10](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapFeatures2.10.pptx)
*   [2020-05-19 DMIT: Ingestione dei dati](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapDataIngest.pptx)  (O[guardare questo video di Bob dare questo parlare](https://www.youtube.com/watch?v=9ArYxgwON2k).) 
*   [2019 IOOS DMAC: nuove funzionalità inERDDAP™v.](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/Erddapv2Features.pptx)
*   [2018 Summer ESIP: Subsetting InERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapSubset2018.pptx)
*   [2018 ESIP estivo: supporto JSON inERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapJson2018.pptx)
*   [2018 EDM: Un sistema distribuito di servizi Web (Più veloce, più facile, meno costoso)   (O perche' sono stato felice 4 anni fa.) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/10P.04_Simons_DistributedWebServices2018.pptx)
*   [2018 EDM:ERDDAP™nel 2018](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/7A4_Simons_ErddapSession2018.pptx)
*   [2018 EDM: nuove funzionalità inERDDAP™per immagini, audio e dati video](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/4D4_Simons_ErddapMediaFiles2018.pptx)
*   [2018 EDM: UAF eERDDAP™Soluzioni per l'integrazione dei dati](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/3D3_Simons_DataIntegration2018.pptx)
*   [2017 EDM: una rapida introduzione aERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapIntro.pptx)
*   [2017 EDM e 2017 IOOS: Nuovo o poco conosciutoERDDAP™Caratteristiche (per gli utenti) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapUserFeatures2017.pptx)
*   [2017 EDM e 2017 IOOS: Nuovo o poco conosciutoERDDAP™Caratteristiche (per Amministratori) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapAdminFeatures2017.pptx)
*   [2017 EDM: EML, KNB, eERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/eml_knb_erddap.pptx)
*   [2017 EDM: Come arrivano i dati dalla sorgente all'utente finale? Scuola Vecchia contro Nuova Scuola](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OldSchoolNewSchool.pptx)
*   [2016 Estate ESIP: La grande immagine: PARR,OPeNDAP♪ERDDAP™, e distribuzione dei dati](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheBigPicture.pptx)
*   [2016 EDM: uno e fatto](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OneAndDone.pptx)
*   [2016 Gov API: prossima generazione Server dei dati](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/NextGeneration.pptx)
*   [2015 ESIP estivo: Aggregazione tabulare](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularAggregation.pptx)
*   [2014 EDM: Bob's Do's e Don't for Tabular Data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsDosDontsTabular.pptx)
*   [2014 EDM: L'interfaccia utente ideale](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheIdealUserInterface.pptx)
*   [2014 Summer ESIP: Dati tabulari](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularData.pptx)
*   [2013: Non trattare dati in-Situ e tabulari come dati rettificati](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TablesAndGrids.html)
*   [2013 EDM: Fare di più con meno](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/DoMoreWithLess.ppt)
*   [2012 EDM: Linee guida per i sistemi di distribuzione dei dati](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/guidelines3.ppt)

Presentazioni di altre persone:

*   [Uno strumento basato su FAIR per migliorare la condivisione globale dei dati![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=kdBTgNEp5TA&ab_channel=GOOSIOC)  
di Kevin O'Brien al Global Ocean Observing System (GOOS) Webinar / Gruppo di coordinamento osservazione (OCCUPAZIONE) Serie / 1, 12 novembre 2020.
*   [Costruire il proprio Meteo App utilizzandoNOAAAprire i manuali di dati e di Jupyter![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=MF-WH01Qw0g)  
di Filipe Fernandes e Rich Signell a SciPy 2018, 13 luglio 2018.
*   [Utilizzo dell'OOIERDDAP![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=tj4M9hodTG0)  
di Rich Signell, febbraio 2018.
*   [ESIP Tech Dive: "ERDDAP"Il fulmine"![YouTube](/img/youtube.png)](https://youtu.be/2-ydBByYB0M?t=160)  
Otto 5-Minute parla di cose interessanti con cui la gente sta facendoERDDAPdi Jenn Sevadjian, Jim Potemra, Conor Delaney, Kevin O'Brien, John Kerfoot, Stephanie Petillo, Charles Carleton e Eli Hunter hanno presentato come ESIP Tech Dive il 31 agosto 2017.
*   [UtilizzoERDDAP™Accesso ai dati tabulari![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=_BwMHRh7CS8)  
di Rich Signell, agosto 2015.
*   [Test utilizzandoERDDAP™per Blue Carbon Data![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=TbOhElC_-qU)  
di Rich Signell, agosto 2015.
*   [Utilizzo dei dati daERDDAP™inNOAA'GNOMESoftware software![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=18xZoXu1USM).
In questo video, Rich Signell scarica i dati delle correnti oceanicheERDDAP™per modellare una fuoriuscita tossico nell'oceano utilizzando[NOAA'GNOMEsoftware software](https://response.restoration.noaa.gov/oil-and-chemical-spills/oil-spills/response-tools/gnome.html)  (tra 5 minuti&#33;) . (Un piccolo errore nel video: quando si cerca di set di dati, non utilizzare E tra i termini di ricerca. È implicito.) Di Rich Signell, 8 aprile 2011.
