---
sidebar_position: 5
---
# Scala

## ERDDAP™- Caricamenti pesanti, Griglia, cluster, federazioni e cloud computing{#erddap---heavy-loads-grids-clusters-federations-and-cloud-computing} 
 

## ERDDAP:

[ERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/index.html)è un'applicazione web e un servizio web che aggrega i dati scientifici provenienti da diverse fonti locali e remote e offre un modo semplice e coerente per scaricare sottoinsiemi dei dati in formati di file comuni e fare grafici e mappe. Questa pagina web parla di questioni relative a pesantiERDDAP™i carichi di utilizzo ed esplora le possibilità di trattare carichi estremamente pesanti tramite griglie, cluster, federazioni e cloud computing.

La versione originale è stata scritta nel giugno 2009. Non ci sono stati cambiamenti significativi. Ultimo aggiornamento 2019-04-15.

## DISCLAI{#disclaimer} 

I contenuti di questa pagina web sono opinioni personali di Bob Simons e non riflettono necessariamente alcuna posizione del Governo o delNational Oceanic and Atmospheric Administration. I calcoli sono semplicistici, ma credo che le conclusioni siano corrette. Ho usato la logica difettosa o ho commesso un errore nei miei calcoli? Se è così, la colpa è mia da sola. Si prega di inviare una e-mail con la correzione aerd dot data at noaa dot gov.
 

- - No.

## Carico pesante / vincoli{#heavy-loads--constraints} 

Con un uso pesante, un standaloneERDDAP™sarà limitato (da più a meno probabile) di:

### Larghezza di banda a distanza{#remote-source-bandwidth} 
1. Larghezza di banda di una fonte di dati remota — Anche con una connessione efficiente (ad esempio, viaOPeNDAP) , a meno che una fonte di dati remota abbia una connessione Internet molto alta larghezza di banda,ERDDAP"le risposte saranno limitate da quanto velocementeERDDAP™può ottenere i dati dalla fonte di dati. Una soluzione è quella di copiare il datasetERDDAPIl disco rigido, forse con[EDDGridCopia](/docs/server-admin/datasets#eddgridcopy)o[EDDTableCopy](/docs/server-admin/datasets#eddtablecopy).
     
### ERDDAPLarghezza di banda del server{#erddaps-server-bandwidth} 
2. A meno cheERDDAPIl server ha una connessione Internet ad alta larghezza di banda,ERDDAP"le risposte saranno limitate da quanto velocementeERDDAP™può ottenere i dati dalle fonti di dati e quanto velocementeERDDAP™può restituire i dati ai clienti. L'unica soluzione è quella di ottenere una connessione Internet più veloce.
     
### Memoria{#memory} 
3. Se ci sono molte richieste simultanee,ERDDAP™può esaurire la memoria e rifiutare temporaneamente nuove richieste. (ERDDAP™ha un paio di meccanismi per evitare questo e per minimizzare le conseguenze se accade.) Quindi più memoria nel server è migliore. Su un server a 32 bit, 4+ GB è davvero buono, 2 GB va bene, meno non è raccomandato. Su un server a 64 bit, si può quasi completamente evitare il problema ottenendo un sacco di memoria. Vedi il[Impostazioni \\-Xmx e -Xms](/docs/server-admin/deploy-install)perERDDAP- Tomcat. AnERDDAP™ottenere un uso pesante su un computer con un server a 64 bit con 8GB di memoria e -Xmx impostato a 4000M è raramente, se mai, limitato dalla memoria.
     
### Larghezza di trasmissione{#had-drive-bandwidth} 
4. L'accesso ai dati memorizzati sul disco rigido del server è molto più veloce dell'accesso ai dati remoti. Anche così, se ilERDDAP™server ha una connessione Internet molto alta larghezza di banda, è possibile che l'accesso ai dati sul disco rigido sarà un collo di bottiglia. Una soluzione parziale è quella di utilizzare più velocemente (ad esempio, 10.000 RPM) dischi rigidi magnetici o unità SSD (se ha senso il costo) . Un'altra soluzione è quella di memorizzare diversi set di dati su diverse unità, in modo che la larghezza di banda del disco rigido cumulativa è molto più alta.
     
### Troppi file incassati{#too-many-files-cached} 
5. Troppi file in un[cache](/docs/server-admin/additional-information#cached-responses)elencoERDDAP™memorizza tutte le immagini, ma memorizza solo i dati per determinati tipi di richieste di dati. È possibile che la directory della cache per un set di dati abbia un gran numero di file temporaneamente. Questo rallenterà le richieste per vedere se un file è nella cache (Davvero&#33;) .&lt;cache Minuti &gt; in[setup.xml](/docs/server-admin/deploy-install#setupxml)consente di impostare quanto tempo un file può essere nella cache prima che venga eliminato. Impostare un numero più piccolo ridurrebbe questo problema.
     
### CPU{#cpu} 
6. Solo due cose richiedono molto tempo della CPU:
    *   NetCDF4 eHDF5 ora supportano la compressione interna dei dati. Decomprimere un grande compressoNetCDF4 /HDF5 file di dati possono richiedere 10 o più secondi. (Non e' colpa dell'implementazione. E' la natura della compressione.) Così, più richieste simultanee di set di dati con i dati memorizzati in file compressi possono mettere una forte tensione su qualsiasi server. Se questo è un problema, la soluzione è quella di memorizzare i dataset popolari in file non compressi, o ottenere un server con una CPU con più core.
    * Creazione di grafici (comprese le mappe) : circa 0,2 - 1 secondo per grafico. Quindi, se ci sono state molte richieste simultanee uniche per i grafici (WMSi clienti spesso fanno 6 richieste simultanee&#33;) , ci potrebbe essere una limitazione della CPU. Quando più utenti sono in esecuzioneWMSclienti, questo diventa un problema.
         

- - No.

## Identica multiplaERDDAPs con il bilanciamento del carico?{#multiple-identical-erddaps-with-load-balancing} 

La domanda viene spesso: "Per affrontare carichi pesanti, posso impostare più identiciERDDAPs con bilanciamento del carico?" È una domanda interessante perché arriva rapidamente al centro diERDDAPIl design. La risposta rapida è "no". So che è una risposta deludente, ma ci sono un paio di ragioni dirette e alcune ragioni fondamentali più grandi per cui ho progettatoERDDAP™utilizzare un approccio diverso (una federazioneERDDAPs, descritto nella maggior parte di questo documento) , che credo sia una soluzione migliore.

Alcuni motivi diretti perché non è possibile / non deve impostare più identicoERDDAPsono:

* Un datoERDDAP™legge ogni file di dati quando diventa disponibile per la prima volta per trovare gli intervalli di dati nel file. Poi memorizza quelle informazioni in un file di indice. Più tardi, quando viene richiesta un utente per i dati,ERDDAP™utilizza tale indice per capire quali file cercare per i dati richiesti. Se c'era più identicoERDDAPs, ognuno farebbe questo indicizzazione, che è sprecato sforzo. Con il sistema federato descritto di seguito, l'indicizzazione è fatta solo una volta, da uno deiERDDAPS.
* Per alcuni tipi di richieste degli utenti (ad esempio, per.nc, .png, .pdf file)  ERDDAP™deve fare l'intero file prima che la risposta possa essere inviata. Quindi...ERDDAP™memorizza questi file per un breve periodo di tempo. Se viene richiesta identica (come spesso fa, soprattutto per le immagini in cui l'URL è incorporato in una pagina web) ♪ERDDAP™può riutilizzare quel file cache. In un sistema di più identicoERDDAPs, quei file memorizzati nella cache non sono condivisi, quindi ogniERDDAP™sarebbe inutilmente e sprecato ricreare.nc, .png, o file .pdf. Con il sistema federato descritto di seguito, i file sono fatti solo una volta, da uno deiERDDAPs, e riutilizzato.
*   ERDDAPIl sistema di abbonamento non è configurato per essere condiviso da piùERDDAPS. Ad esempio, se il bilanciatore di carico invia un utente a unoERDDAP™e l'utente si iscrive a un dataset, poi l'altroERDDAPnon sarà a conoscenza di quell'abbonamento. Più tardi, se il bilanciatore di carico invia l'utente a un diversoERDDAP™e chiede una lista dei suoi abbonamenti, gli altriERDDAP™dirà che non ci sono (che lo conduce a fare un abbonamento duplicato sull'altro EREDDAP) . Con il sistema federato descritto di seguito, il sistema di abbonamento è gestito semplicemente dal principale, pubblico, compositoERDDAP.

Sì, per ognuno di questi problemi, potrei (con grande sforzo) progettare una soluzione (condividere le informazioni traERDDAP#) ma penso che[federazioneERDDAPapproccio](#grids-clusters-and-federations)  (descritto nella maggior parte di questo documento) è una soluzione complessiva molto migliore, in parte perché si occupa di altri problemi che il multi-identico-ERDDAPl'approccio s-with-a-load-balancer non inizia nemmeno ad affrontare, in particolare la natura decentralizzata delle fonti di dati nel mondo.

È meglio accettare il semplice fatto che non ho progettatoERDDAP™da distribuire come più identicoERDDAPs con un bilanciatore di carico. Ho progettato consapevolmenteERDDAP™lavorare bene all'interno di una federazioneERDDAPs, che credo abbia molti vantaggi. In particolare, una federazioneERDDAPs è perfettamente allineato con il sistema decentralizzato e distribuito di data center che abbiamo nel mondo reale (pensare alle diverse regioni IOOS, o alle diverse regioni CoastWatch, o alle diverse parti di NCEI, o agli altri 100 data center inNOAA, o i diversi DAAC della NASA, o i 1000 di data center in tutto il mondo) . Invece di dire a tutti i data center del mondo che hanno bisogno di abbandonare i loro sforzi e mettere tutti i loro dati in un "lago dati" centralizzato (anche se fosse possibile, è un'idea orribile per numerosi motivi -- vedere le varie analisi che mostrano i numerosi vantaggi di[sistemi decentralizzati](https://en.wikipedia.org/wiki/Decentralised_system)) ♪ERDDAPIl design funziona con il mondo così com'è. Ogni data center che produce dati può continuare a mantenere, curare e servire i propri dati (come dovrebbero) , e ancora, conERDDAP™, i dati possono essere immediatamente disponibili da un centralizzatoERDDAP, senza la necessità di trasmettere i dati al centralizzatoERDDAP™o la memorizzazione di copie duplicate dei dati. Infatti, un dato set di dati puÃ2 essere disponibile simultaneamente
da unERDDAP™all'organizzazione che ha prodotto e in realtà memorizza i dati (ad esempio, GoMOOS) ♪
da unERDDAP™all'organizzazione genitoriale (ad esempio, IOOS centrale) ♪
da un tutto...NOAA ERDDAP™♪
da un governo all-US-federaleERDDAP™♪
da un mondo globaleERDDAP™  (GOOS) ♪
e da specialistiERDDAP# (ad esempio, unERDDAP™presso un istituto dedicato alla ricerca HAB) ♪
tutto essenzialmente istantaneamente ed efficiente perché solo i metadati vengono trasferiti traERDDAPs, non i dati. Meglio di tutti, dopo l'inizialeERDDAP™all'organizzazione originaria, tutte le altreERDDAPs può essere impostato rapidamente (poche ore di lavoro) , con risorse minime (un server che non ha bisogno di RAID per l'archiviazione dei dati in quanto non memorizza dati localmente) , e quindi a costo veramente minimo. Confrontare che al costo di configurare e mantenere un centro dati centralizzato con un lago di dati e la necessità di una connessione Internet veramente massiccia, veramente costosa, più il problema del data center centralizzato è un unico punto di fallimento. A me,ERDDAPl'approccio decentralizzato e federato è di gran lunga superiore.

In situazioni in cui un data center ha bisogno di piùERDDAPs per soddisfare l'alta domanda,ERDDAPIl design è pienamente in grado di abbinare o superare le prestazioni del multi-identico-ERDDAPapproccio s-with-a-load-balancer. Hai sempre la possibilità di configurare[multipli compositiERDDAP# (come discusso di seguito) ](#multiple-composite-erddaps), ognuno dei quali ottiene tutti i loro dati da altriERDDAPs, senza bilanciamento del carico. In questo caso, vi consiglio di fare un punto di dare ciascuno dei compositiERDDAPs un nome / identità diverso e se possibile impostarli in diverse parti del mondo (ad esempio, diverse regioni AWS) Per esempio,ERD\\_US\\_East,ERD\\_US\\_West,ERD\\_IE,ERD\\_FR,ERD\\_IT, in modo che gli utenti consapevolmente, ripetutamente, lavorare con uno specificoERDDAP, con il beneficio aggiunto che hai rimosso il rischio da un unico punto di fallimento.
 

- - No.

## [ **Griglia, cluster e federazioni** ](#grids-clusters-and-federations) {#grids-clusters-and-federations} 

Sotto un uso molto pesante, un singolo standaloneERDDAP™verrà eseguito in uno o più dei[vincoli](#heavy-loads--constraints)elencati sopra e anche le soluzioni suggerite saranno insufficienti. Per tali situazioni,ERDDAP™ha caratteristiche che rendono facile la costruzione di griglie scalabili (anche chiamati cluster o federazioni) diERDDAPs che permettono al sistema di gestire un uso molto pesante (ad esempio, per un grande data center) .

Sto usando[griglia](https://en.wikipedia.org/wiki/Grid_computing)come termine generale per indicare un tipo di[cluster computer](https://en.wikipedia.org/wiki/Computer_cluster)dove tutte le parti possono o non possono essere fisicamente situate in una struttura e possono o non possono essere gestite centralmente. Un vantaggio di griglie co-locate, di proprietà centrale e amministrate (cluster) che beneficiano di economie di scala (soprattutto il carico di lavoro umano) e semplificare rendendo le parti del sistema funzionano bene insieme. Un vantaggio di griglie non trasferite, non centralmente possedute e amministrate (federazioni) è che distribuiscono il carico di lavoro umano e il costo, e possono fornire qualche ulteriore tolleranza di guasto. La soluzione che propongo di seguito funziona bene per tutte le topografie di griglia, cluster e federazioni.

L'idea di base di progettare un sistema scalabile è identificare i potenziali colli di bottiglia e quindi progettare il sistema in modo che le parti del sistema possano essere replicate come necessario per alleviare i colli di bottiglia. Idealmente, ogni parte replicata aumenta la capacità di quella parte del sistema linearmente (efficienza di scaling) . Il sistema non è scalabile a meno che non vi sia una soluzione scalabile per ogni collo di bottiglia.[Scalabilità](https://en.wikipedia.org/wiki/Scalability)è diverso dall'efficienza (come rapidamente un compito può essere fatto — efficienza delle parti) . La scalabilità consente al sistema di crescere per gestire qualsiasi livello di domanda. **Efficienza**   (di scaling e delle parti) determina quanti server, ecc., saranno necessari per soddisfare un determinato livello di domanda. L'efficienza è molto importante, ma ha sempre dei limiti. La scalabilità è l'unica soluzione pratica per costruire un sistema in grado di gestire **Molto bene.** uso pesante. Idealmente, il sistema sarà scalabile ed efficiente.

### Obiettivi{#goals} 
Gli obiettivi di questo design sono:

* Per fare un'architettura scalabile (una che è facilmente estensibile replicando qualsiasi parte che diventa sovraccarica) . Per rendere un sistema efficiente che massimizza la disponibilità e il throughput dei dati forniti alle risorse di calcolo disponibili. (Il costo è quasi sempre un problema.) 
* Per bilanciare le capacità delle parti del sistema in modo che una parte del sistema non travolga un'altra parte.
* Per fare una semplice architettura in modo che il sistema sia facile da configurare e amministrare.
* Fare un'architettura che funziona bene con tutte le topografie della griglia.
* Fare un sistema che fallisce con grazia e in modo limitato se qualsiasi parte diventa sovraccaricata. (Il tempo necessario per copiare un grande dataset limiterà sempre la capacità del sistema di affrontare con improvvisi aumenti della domanda di un dataset specifico.) 
*    (Se possibile) Fare un'architettura che non è legata a qualsiasi specifica[cloud computing](#cloud-computing)servizio o altri servizi esterni (perché non ha bisogno di loro) .

### Raccomandazione{#recommendations} 
Le nostre raccomandazioni
![diagramma della griglia](/img/cluster.png)

* Fondamentalmente, suggerisco di creare un compostoERDDAP™  ( **D** nel diagramma) , che è normaleERDDAP™tranne che serve solo i dati da altriERDDAPS. L'architettura della griglia è progettata per spostare il più possibile il lavoro (utilizzo della CPU, utilizzo della memoria, utilizzo della larghezza di banda) dal compositoERDDAP™all'altroERDDAPS.
*   ERDDAP™ha due tipi di dataset speciali,[EDDGridDa Erddap](/docs/server-admin/datasets#eddfromerddap)e[EDDTableFromErddap](/docs/server-admin/datasets#eddfromerddap), che si riferisce
set di dati su altriERDDAPS.
* Quando il compositoERDDAP™riceve una richiesta di dati o immagini da questi dataset, il compositoERDDAP™ [reindirizzamenti](https://en.wikipedia.org/wiki/URL_redirection)la richiesta di dati all'altroERDDAP™server. Il risultato è:
    * Questo è molto efficiente (CPU, memoria e larghezza di banda) , perché altrimenti
        1. Il compositoERDDAP™deve inviare la richiesta di dati all'altroERDDAP.
        2. L'altroERDDAP™deve ottenere i dati, riformattare e trasmettere i dati al compositoERDDAP.
        3. Il compositoERDDAP™deve ricevere i dati (usando larghezza di banda extra) # Riformalo # (utilizzando tempo e memoria CPU extra) , e trasmettere i dati all'utente (usando larghezza di banda extra) . Reindirizzando la richiesta di dati e consentendo all'altroERDDAP™inviare la risposta direttamente all'utente, il compositoERDDAP™non passa essenzialmente tempo di CPU, memoria, o larghezza di banda sulle richieste di dati.
    * Il reindirizzamento è trasparente per l'utente indipendentemente dal software client (un browser o qualsiasi altro software o strumento di riga di comando) .

### Parti di macinazione{#grid-parts} 
[Le parti della griglia sono:](#grid-parts)

 **A** : Per ogni sorgente di dati remota che ha una larghezza di banda elevataOPeNDAPserver, è possibile connettersi direttamente al server remoto. Se il server remoto è unERDDAP™, usoEDDGridDa Erddap o EDDTableFromERDDAPper servire i dati nel compositoERDDAP. Se il server remoto è un altro tipo diDAPserver, ad esempio, THREDDS,Hyrax, o GrADS, usoEDDGridDa papa'.

 **B** Per ogniERDDAP- fonte di dati (una fonte di dati da cuiERDDAPpuò leggere i dati) che ha un server ad alta larghezza di banda, impostare un altroERDDAP™nella griglia che è responsabile per il servizio dei dati da questa fonte di dati.

* Se alcuni di questiERDDAPs non stanno ottenendo molte richieste di dati, è possibile consolidarli in unoERDDAP.
* SeERDDAP™dedicato a ottenere i dati da una fonte remota è ottenere troppe richieste, c'è la tentazione di aggiungere ulterioreERDDAPs per accedere alla fonte di dati remota. In casi particolari questo può avere senso, ma è più probabile che questo travolga la fonte di dati remota (che è auto-defezione) e anche impedire ad altri utenti di accedere alla sorgente dati remota (che non è bello) . In tal caso, prendere in considerazione la creazione di un altroERDDAP™per servire tale dataset e copiare il dataset su quelloERDDAPIl disco rigido (vedi **C** ) , forse con[EDDGridCopia](/docs/server-admin/datasets#eddgridcopy)e/o[EDDTableCopy](/docs/server-admin/datasets#eddtablecopy).
*    **B** i server devono essere accessibili pubblicamente.

 **C** Per ogniERDDAP-able data source che ha un server a bassa larghezza di banda (o è un servizio lento per altri motivi) , prendere in considerazione la creazione di un altroERDDAP™e memorizzare una copia del dataset su questoERDDAPI dischi rigidi, forse con[EDDGridCopia](/docs/server-admin/datasets#eddgridcopy)e/o[EDDTableCopy](/docs/server-admin/datasets#eddtablecopy). Se alcuni di questiERDDAPs non stanno ottenendo molte richieste di dati, è possibile consolidarli in unoERDDAP.
 **C** i server devono essere accessibili pubblicamente.

#### CompositoERDDAP {#composite-erddap} 
 **D** : Il compositoERDDAP™è normaleERDDAP™tranne che serve solo i dati da altriERDDAPS.

* Perché il compositoERDDAP™ha informazioni in memoria di tutti i dataset, può rispondere rapidamente alle richieste di elenchi di set di dati (ricerca di testo completo, categoria ricerche, l'elenco di tutti i set di dati) , e le richieste di un modulo di accesso dati di un singolo set di dati, fare un modulo di grafico, oWMSpagina delle informazioni. Queste sono tutte piccole, generate dinamicamente, pagine HTML basate su informazioni che si tengono in memoria. Quindi le risposte sono molto veloci.
* Poiché le richieste di dati effettivi sono rapidamente reindirizzate all'altroERDDAPs, il compositoERDDAP™può rispondere rapidamente alle richieste di dati reali senza utilizzare qualsiasi tempo della CPU, memoria o larghezza di banda.
* Spostando il più possibile il lavoro (CPU, memoria, larghezza di banda) dal compositoERDDAP™all'altroERDDAPs, il compositoERDDAP™può apparire per servire i dati da tutti i dataset e ancora tenere il passo con un gran numero di richieste di dati da un gran numero di utenti.
* I test preliminari indicano che il compositoERDDAP™può rispondere alla maggior parte delle richieste in ~1ms di tempo della CPU, o 1000 richieste/secondo. Quindi un processore di 8 core dovrebbe essere in grado di rispondere a circa 8000 richieste/secondo. Anche se è possibile prevedere scoppi di attività più alta che causerebbe rallentamenti, che è un sacco di throughput. È probabile che la larghezza di banda del data center sarà il collo di bottiglia molto prima del compositoERDDAP™diventa il collo di bottiglia.
##### Max aggiornato (tempo) ?{#up-to-date-maxtime} 
TheEDDGrid/TableFromErddap in compositoERDDAP™solo modifica le informazioni memorizzate su ogni dataset sorgente quando il dataset sorgente è["ricarica"](/docs/server-admin/datasets#reloadeverynminutes)e qualche pezzo di cambiamenti di metadati (ad esempio, la variabile di tempoactual\\_range) , generando così una notifica di abbonamento. Se il dataset sorgente ha dati che cambiano frequentemente (ad esempio, nuovi dati ogni secondo) e utilizza["aggiornamento"](/docs/server-admin/datasets#updateeverynmillis)sistema per rilevare frequenti modifiche ai dati sottostanti,EDDGrid/TableFromErddap non sarà avvisato di questi frequenti cambiamenti fino al successivo set di dati "ricarica", così ilEDDGrid/TableFromErddap non sarà perfettamente aggiornato. È possibile ridurre al minimo questo problema modificando il dataset sorgente&lt;reloadEveryNMinutes&gt; a un valore più piccolo (60? 15?) in modo che ci sono più notifiche di abbonamento per raccontareEDDGrid/TableFromErddap per aggiornare le sue informazioni sul dataset sorgente.

Oppure, se il sistema di gestione dei dati sa quando il dataset sorgente ha nuovi dati (ad esempio, tramite uno script che copia un file di dati in atto) , e se non è super frequente (ad esempio, ogni 5 minuti, o meno frequenti) C'è una soluzione migliore:

1. Non usare&lt;updateEveryNMillis&gt; per mantenere aggiornati i dati di origine.
2. Impostare il dataset sorgente&lt;reloadEveryNMinutes&gt; a un numero maggiore (1440?) .
3. Fai contattare lo script del dataset sorgente[URL della bandiera](/docs/server-admin/additional-information#set-dataset-flag)subito dopo che copia un nuovo file di dati in atto.
Ciò porterà al set di dati di origine essere perfettamente aggiornato e causare la creazione di una notifica di abbonamento, che verrà inviata alEDDGrid/TableFromErddap dataset. Questo porteràEDDGrid/TableFromErddap dataset per essere perfettamente aggiornato (bene, entro 5 secondi dall'aggiunta di nuovi dati) . E tutto ciò che sarà fatto in modo efficiente (senza inutili ricarica dataset) .

#### Composizione multiplaERDDAP#{#multiple-composite-erddaps} 
* In casi molto estremi, o per la tolleranza di guasto, si può desiderare di impostare più di un compositoERDDAP. È probabile che altre parti del sistema (in particolare, la larghezza di banda del data center) diventerà un problema molto prima del compositoERDDAP™diventa un collo di bottiglia. Quindi la soluzione è probabilmente per impostare ulteriori, geografici diversi, data center (specchi) , ciascuno con un compositoERDDAP™e server conERDDAPe (almeno) copie a specchio dei dataset che sono in alta domanda. Tale configurazione fornisce anche tolleranza di errore e backup dei dati (tramite copia) . In questo caso, è meglio se il compositoERDDAPs hanno URL differenti.
    
Se davvero vuoi tutto il compositoERDDAPs per avere lo stesso URL, utilizzare un sistema front-end che assegna un dato utente a uno solo dei compositiERDDAP# (in base all'indirizzo IP) , in modo che tutte le richieste dell'utente vadano a uno solo dei compositoERDDAPS. Ci sono due ragioni:
    
    * Quando un dataset sottostante viene ricaricato e i metadati cambiano (ad esempio, un nuovo file di dati in un set di dati grigliato causa la variabile di tempoactual\\_rangea cambiare) , il compositoERDDAPs sarà temporaneamente leggermente fuori dalla sincronia, ma con[consistenza eventuale](https://en.wikipedia.org/wiki/Eventual_consistency). Normalmente, ri-sincroniranno entro 5 secondi, ma a volte sarà più lungo. Se un utente effettua un sistema automatizzato che si basa su[ERDDAP™sottoscrizioni](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions/index.html)che attivano le azioni, i brevi problemi di sincronizzazione diventeranno significativi.
    * 2+ compositoERDDAPe ciascuno mantiene il proprio insieme di abbonamenti (a causa del problema di sincronizzazione descritto sopra) .
    
Quindi un dato utente dovrebbe essere diretto a uno solo dei compositoERDDAPs per evitare questi problemi. Se uno dei compositiERDDAPs va giù, il sistema front-end può reindirizzare cheERDDAPGli utenti di un altroERDDAP™E' finita. Tuttavia, se si tratta di un problema di capacità che causa il primo compositoERDDAP™fallire (un utente troppo zelante? a[attacco denial-of-service](https://en.wikipedia.org/wiki/Denial-of-service_attack)?) , questo rende molto probabile che reindirizzare i suoi utenti ad altri compositoERDDAPs causerà[guasto a cascata](https://en.wikipedia.org/wiki/Cascading_failure). Così, la configurazione più robusta è quella di avere compositoERDDAPs con URL diversi.
    
O, forse meglio, impostare più compositoERDDAPs senza bilanciamento del carico. In questo caso, si dovrebbe fare un punto di dare ciascuno deiERDDAPs un nome / identità diverso e se possibile impostarli in diverse parti del mondo (ad esempio, diverse regioni AWS) Per esempio,ERD\\_US\\_East,ERD\\_US\\_West,ERD\\_IE,ERD\\_FR,ERD\\_IT, in modo che gli utenti consapevolmente, ripetutamente lavorare con uno specificoERDDAP.
    
*   \\[Per un design affascinante di un sistema ad alte prestazioni in esecuzione su un server, vedere questo[descrizione dettagliata di Mailinator](https://mailinator.blogspot.com/2007/01/architecture-of-mailinator.html).\\]

### Datasets in altissima domanda{#datasets-in-very-high-demand} 
Nel caso davvero insolito che uno dei **A** ♪ **B** o **C**  ERDDAPs non può tenere il passo con le richieste a causa delle limitazioni della larghezza di banda o del disco rigido, ha senso copiare i dati (di nuovo) su un altro server+hard Drive+ERDDAP, forse con[EDDGridCopia](/docs/server-admin/datasets#eddgridcopy)e/o[EDDTableCopy](/docs/server-admin/datasets#eddtablecopy). Mentre può sembrare ideale per avere il dataset originale e il dataset copiato appaiono senza soluzione di continuità come un dataset nel compositoERDDAP™, questo è difficile perché i due set di dati saranno in stati leggermente diversi in tempi diversi (in particolare, dopo che l'originale ottiene nuovi dati, ma prima che il dataset copiato ottiene la sua copia) . Pertanto, consiglio che i dataset siano dati titoli leggermente diversi (ad esempio, "... (copia #1) "e "... (copia #2) ", o forse " (specchio *n* ) " o " (server *n* ) ") e appaiono come set di dati separati nel compositoERDDAP. Gli utenti sono utilizzati per vedere le liste di[siti mirror](https://en.wikipedia.org/wiki/Website#mirror_site)in siti di download di file popolari, in modo che questo non dovrebbe sorprendere o deluderli. A causa di limitazioni di larghezza di banda in un dato sito, potrebbe avere senso avere lo specchio situato in un altro sito. Se la copia dello specchio è in un centro dati diverso, accessibile solo dal composito di quel data centerERDDAP™, i diversi titoli (ad esempio, "mirror #1) Non sono necessari.

### RAID contro dischi rigidi regolari{#raids-versus-regular-hard-drives} 
Se un grande dataset o un gruppo di dataset non sono pesantemente utilizzati, può avere senso memorizzare i dati su un RAID in quanto offre tolleranza di errore e dal momento che non è necessario il potere di elaborazione o la larghezza di banda di un altro server. Ma se un dataset viene utilizzato pesantemente, potrebbe avere più senso copiare i dati su un altro server +ERDDAP™+ disco rigido (simile a[ciò che Google fa](https://storagemojo.com/2007/02/19/googles-disk-failure-experience/)) piuttosto che utilizzare un server e un RAID per memorizzare più set di dati in quanto è possibile utilizzare sia server+hardDrive+ERDDAPs in griglia finché uno di loro non fallisce.

### Inadempimento{#failures} 
Cosa succede se...

* C'è una serie di richieste per un set di dati (ad esempio, tutti gli studenti di una classe richiedono simultaneamente dati simili) ?
SoloERDDAP™servire quel dataset sarà sopraffatto e rallentare o rifiutare richieste. Il compositoERDDAP™e altriERDDAPNon saranno colpiti. Poiché il fattore limitante per un dato set di dati all'interno del sistema è il disco rigido con i dati (nonERDDAP) , l'unica soluzione (non immediato) è fare una copia del set di dati su un server diverso+hardDrive+ERDDAP.
* An **A** ♪ **B** o **C**  ERDDAP™fallisce (ad esempio, guasto del disco rigido) ?
Solo il dataset (#) servito da quelloERDDAP™sono colpiti. Se il dataset (#) è specchiato su un altro server+hardDrive+ERDDAP, l'effetto è minimo. Se il problema è un guasto del disco rigido in un livello 5 o 6 RAID, è sufficiente sostituire l'unità e avere il RAID ricostruire i dati sull'unità.
* Il compositoERDDAP™fallisce?
Se si desidera fare un sistema con molto[elevata disponibilità](https://en.wikipedia.org/wiki/High_availability), si può impostare[multipli compositiERDDAP# (come discusso sopra) ](#multiple-composite-erddaps), usando qualcosa come[NGINX](https://www.nginx.com/)o[Traefik](https://traefik.io/)per gestire il bilanciamento del carico. Si noti che un dato compositoERDDAP™può gestire un gran numero di richieste da un gran numero di utenti perché
le richieste di metadati sono piccole e sono gestite da informazioni che sono in memoria, e
richieste di dati (che possono essere grandi) sono reindirizzati al bambinoERDDAPS.

### Semplice, scalabile{#simple-scalable} 
Questo sistema è facile da configurare e amministrare, e facilmente estensibile quando qualsiasi parte di esso diventa sovraccaricato. Le uniche limitazioni reali per un data data center sono la larghezza di banda del data center e il costo del sistema.

### Larghezza di banda{#bandwidth} 
Notare la larghezza di banda approssimativa dei componenti comunemente utilizzati del sistema:

|Componenti|Larghezza di banda approssimativa (GBytes/s)  |
|---|---|
|Memoria DDR|2,5|
|Unità SSD|1|
|Disco rigido SATA|0|
|Gigabit Ethernet|0,1|
|OC-12|0.06|
|OC-3|0.015|
|T1|0.0002|

  
Quindi, un disco rigido SATA (0,3 GB/i) su un server con unoERDDAP™può probabilmente saturare una LAN Ethernet Gigabit (0.1GB/s) . E una Gigabit Ethernet LAN (0.1GB/s) può probabilmente saturare una connessione Internet OC-12 (0.06GB/s) . E almeno una fonte elenca linee OC-12 che costano circa $100,000 al mese. (Sì, questi calcoli si basano sul spingere il sistema ai suoi limiti, che non è buono perché porta a risposte molto lente. Ma questi calcoli sono utili per la pianificazione e per il bilanciamento delle parti del sistema.)   **Chiaramente, una connessione Internet adeguata per il vostro data center è di gran lunga la parte più costosa del sistema.** Si può facilmente e relativamente a buon mercato costruire una griglia con una dozzina di server che eseguono una dozzinaERDDAPs che è in grado di pompare un sacco di dati rapidamente, ma una connessione Internet opportunamente veloce sarà molto, molto costoso. Le soluzioni parziali sono:

* Incoraggia i client a richiedere sottoinsiemi dei dati se è tutto ciò che è necessario. Se il cliente ha bisogno solo di dati per una piccola regione o ad una risoluzione più bassa, è quello che dovrebbero richiedere. Subsetting è un focus centrale dei protocolliERDDAP™supporti per la richiesta di dati.
* Incoraggiare la trasmissione di dati compressi.ERDDAP™ [compresse](https://coastwatch.pfeg.noaa.gov/erddap/information.html#compression)una trasmissione di dati se trova "accept-encoding" nelHTTP GETrichiedere l'intestazione. Tutti i browser web utilizzano "accept-encoding" e decomprimere automaticamente la risposta. Altri clienti (ad esempio, programmi per computer) deve usarlo esplicitamente.
* Colocate i vostri server in un ISP o in un altro sito che offre costi di larghezza di banda relativamente meno costosi.
* Disperse i server conERDDAPs a istituzioni diverse in modo che i costi siano dispersi. Puoi quindi collegare il tuo compositoERDDAP™a loroERDDAPS.

Nota:[Cloud Computing](#cloud-computing)e servizi web hosting offrono tutta la larghezza di banda Internet di cui hai bisogno, ma non risolvere il problema dei prezzi.

Per informazioni generali sulla progettazione di sistemi scalabili, ad alta capacità, tolleranti errori, vedere il libro di Michael T. Nygard[Rilasciare](https://www.amazon.com/Release-Production-Ready-Software-Pragmatic-Programmers/dp/0978739213).

### Come Legos{#like-legos} 
I progettisti di software spesso cercano di usare il bene[modelli di progettazione software](https://en.wikipedia.org/wiki/Software_design_pattern)risolvere i problemi. Buoni modelli sono buoni perché incapsulate bene, facile da creare e lavorare con, soluzioni generali che portano a sistemi con buone proprietà. I nomi dei modelli non sono standardizzati, quindi chiamerò il modello cheERDDAP™utilizza il modello Lego. Ogni lego (ciascunoERDDAP) è un semplice, piccolo, standard, stand-alone, mattoni (server dati) con un'interfaccia definita che permette di essere collegata ad altri legos (ERDDAP#) . Le parti diERDDAP™che compongono questo sistema sono: l'abbonamento e i sistemi flagURL (che permette la comunicazione traERDDAP#) L'ESD... FromErddap sistema redirect, e il sistema diRESTfulrichieste di dati che possono essere generati da utenti o altriERDDAPS. Così, dato due o più legos (ERDDAP#) , è possibile creare un numero enorme di forme diverse (topologie di reteERDDAP#) . Certo, il design e le caratteristiche diERDDAP™avrebbe potuto essere fatto in modo diverso, non Lego-come, forse solo per consentire e ottimizzare per una specifica topologia. Ma sentiamo cheERDDAPIl design Lego-like offre una buona soluzione generale che consente qualsiasiERDDAP™amministratore (o gruppo di amministratori) creare tutti i tipi di diverse topologie federazioni. Per esempio, una singola organizzazione potrebbe costituire tre (o più)  ERDDAPs come mostrato nella[ERDDAP™Diagramma Griglia/Cluster sopra](#recommendations). O un gruppo distribuito (IOOS? CoastWatch? NCEI? NWS?NOAA? USGS? DataONE? No? LTER? OOI? BODC? ONC? CCR? WMO?) può impostare unoERDDAP™in ogni piccolo avamposto (in modo che i dati possano rimanere vicini alla fonte) e poi impostare un compositoERDDAP™nell'ufficio centrale con dataset virtuali (che sono sempre perfettamente aggiornati) da ogni piccolo avampostoERDDAPS. Infatti, tuttiERDDAPs, installato in varie istituzioni di tutto il mondo, che ottengono dati da altriERDDAPs e/o fornire dati ad altriERDDAPs, formare una rete gigante diERDDAPS. Che figata&#33; Così, come da Lego, le possibilità sono infinite. Ecco perché questo è un buon modello. Ecco perché questo è un buon design perERDDAP.

### Diversi tipi di richieste{#different-types-of-requests} 
Una delle complicazioni della vita reale di questa discussione delle topologie del server dati è che ci sono diversi tipi di richieste e modi diversi per ottimizzare per i diversi tipi di richieste. Questo è per lo più un problema separato (Quanto velocemente puòERDDAP™con i dati rispondono alla richiesta di dati?) dalla discussione di topologia (che si occupa delle relazioni tra i server di dati e quali server ha i dati effettivi) .ERDDAP™, naturalmente, cerca di trattare con tutti i tipi di richieste in modo efficiente, ma gestisce alcuni meglio di altri.

* Molte richieste sono semplici.
Per esempio: Quali sono i metadati per questo dataset? Oppure: Quali sono i valori della dimensione del tempo per questo dataset grigliato?ERDDAP™è progettato per gestire questi il più rapidamente possibile (solitamente in&lt;=2 ms) mantenendo queste informazioni in memoria.
     
* Alcune richieste sono moderatamente difficili.
Per esempio: Dammi questo sottoinsieme di un set di dati (che è in un file di dati) . Queste richieste possono essere gestite relativamente rapidamente perché non sono così difficili.
     
* Alcune richieste sono difficili e quindi richiedono tempo.
Per esempio: Dammi questo sottoinsieme di un set di dati (che potrebbe essere in uno qualsiasi dei file di dati 10.000+, o potrebbe essere da file di dati compressi che ogni prendono 10 secondi per decomprimere) .ERDDAP™v2.0 ha introdotto alcuni nuovi e più veloci modi per affrontare queste richieste, in particolare consentendo al thread di gestione delle richieste di deporre diversi thread dei lavoratori che affrontano diversi sottoinsiemi della richiesta. Ma c'è un altro approccio a questo problema cheERDDAP™non supporta ancora: i sottoset dei file di dati per un dato set di dati potrebbero essere memorizzati e analizzati su computer separati, e quindi i risultati combinati sul server originale. Questo approccio si chiama[MappaRiduzione](https://en.wikipedia.org/wiki/MapReduce)ed è esemplare da[Hadoop](https://en.wikipedia.org/wiki/Apache_Hadoop)Il primo (?) open-source MapRidurre programma, che era basato su idee di un giornale di Google. (Se hai bisogno di MapReduce inERDDAP, si prega di inviare una richiesta e-mail aerd.data at noaa.gov.) Google's[BigQuery](https://cloud.google.com/bigquery/)è interessante perché sembra essere un'implementazione di MapReduce applicato a sottosetting set di dati tabulari, che è uno deiERDDAPGli obiettivi principali. È probabile che tu possa creare unERDDAP™dataset da un dataset BigQuery tramite[EDDTableDatabase](/docs/server-admin/datasets#eddtablefromdatabase)perché BigQuery può essere accessibile tramite un'interfaccia JDBC.

### Queste sono le mie opinioni.{#these-are-my-opinions} 

Sì, i calcoli sono semplicistici (e ora leggermente datato) , ma credo che le conclusioni siano corrette. Ho usato la logica difettosa o ho commesso un errore nei miei calcoli? Se è così, la colpa è mia da sola. Si prega di inviare una e-mail con la correzione aerd dot data at noaa dot gov.

- - No.

## [ **Cloud Computing** ](#cloud-computing) {#cloud-computing} 

Molte aziende offrono servizi di cloud computing (ad esempio,[Servizi web Amazon](https://aws.amazon.com/)e[Google Cloud Piattaforma](https://cloud.google.com/)) .[Web hosting aziende](https://en.wikipedia.org/wiki/Web_hosting_service)hanno offerto servizi più semplici dalla metà del 1990, ma i servizi "cloud" hanno notevolmente ampliato la flessibilità dei sistemi e la gamma di servizi offerti. DalERDDAP™griglia solo consiste diERDDAPs e daERDDAP#Javaapplicazioni web che possono funzionare in Tomcat (il server di applicazione più comune) o altri server di applicazione, dovrebbe essere relativamente facile configurare unERDDAP™griglia su un servizio cloud o sito web hosting. I vantaggi di questi servizi sono:

* Essi offrono l'accesso a connessioni Internet molto alte larghezza di banda. Questo solo può giustificare l'utilizzo di questi servizi.
* Essi addebitano solo per i servizi che si utilizzano. Ad esempio, si ottiene l'accesso a una connessione Internet molto alta larghezza di banda, ma si paga solo per i dati reali trasferiti. Che ti permette di costruire un sistema che raramente viene sopraffatto (anche al picco della domanda) , senza dover pagare per la capacità che raramente viene utilizzata.
* Sono facilmente estensibili. È possibile modificare i tipi di server o aggiungere il maggior numero di server o la quantità di archiviazione che si desidera, in meno di un minuto. Questo solo può giustificare l'utilizzo di questi servizi.
* Essi vi liberano da molti dei doveri amministrativi di gestire i server e le reti. Questo solo può giustificare l'utilizzo di questi servizi.

Gli svantaggi di questi servizi sono:

* Essi addebitano per i loro servizi, a volte molto (in termini assoluti; non che non sia un buon valore) . I prezzi indicati qui sono per[Amazon EC2](https://aws.amazon.com/ec2/pricing). Questi prezzi (a partire da giugno 2015) scenderà.
In passato, i prezzi erano più alti, ma i file di dati e il numero di richieste erano più piccoli.
In futuro, i prezzi saranno inferiori, ma i file di dati e il numero di richieste saranno più grandi.
Quindi i dettagli cambiano, ma la situazione rimane relativamente costante.
E non è che il servizio è troppo costoso, è che stiamo usando e l'acquisto di un sacco di servizio.
    * Trasferimento dati — I trasferimenti di dati nel sistema sono ora gratuiti (Si'&#33;) .
I trasferimenti di dati fuori dal sistema sono $0.09/GB.
Un disco rigido SATA (0,3 GB/i) su un server con unoERDDAP™può probabilmente saturare una LAN Ethernet Gigabit (0.1GB/s) .
Una rete Ethernet Gigabit (0.1GB/s) può probabilmente saturare una connessione Internet OC-12 (0.06GB/s) .
Se una connessione OC-12 può trasmettere ~ 150.000 GB/mese, i costi di trasferimento dati potrebbero essere pari a 150.000 GB @ $0.09/GB = $13,500/mese, che è un costo significativo. Chiaramente, se avete una dozzina di laboriosiERDDAPs su un servizio cloud, le spese mensili di trasferimento dati potrebbero essere sostanziali (fino a $162,000/mese) . (Ancora una volta, non è che il servizio è troppo costoso, è che stiamo usando e l'acquisto di un sacco di servizio.) 
    * Archiviazione dati — Amazon addebita $50/mese per TB. (Confrontare che per acquistare un drive 4TB enterprise outright per ~ $ 50 / TB, anche se il RAID per metterlo in e costi amministrativi aggiungere al costo totale.) Quindi, se è necessario memorizzare un sacco di dati nel cloud, potrebbe essere abbastanza costoso (ad esempio, 100TB costerebbe $5000/mese) . Ma a meno che non si dispone di una quantità davvero grande di dati, questo è un problema più piccolo rispetto ai costi di trasferimento di banda / dati. (Ancora una volta, non è che il servizio è troppo costoso, è che stiamo usando e l'acquisto di un sacco di servizio.)   
         
### Sospensione{#subsetting} 
* Il problema di sottosetting: L'unico modo per distribuire efficacemente i dati dai file di dati è quello di avere il programma che sta distribuendo i dati (ad esempio,ERDDAP) in esecuzione su un server che ha i dati memorizzati su un disco rigido locale (o simile accesso rapido a un SAN o RAID locale) . I file system locali consentonoERDDAP™  (e librerie sottostanti, come netcdf-java) richiedere intervalli di byte specifici dai file e ottenere risposte molto rapidamente. Molti tipi di richieste di dati daERDDAP™al file (in particolare richieste di dati grigliate in cui il valore del passo è &gt; 1) non può essere fatto in modo efficiente se il programma deve richiedere l'intero file o grandi pezzi di un file da un non-locale (quindi più lento) sistema di archiviazione dati e quindi estrarre un sottoinsieme. Se la configurazione del cloud non dàERDDAP™accesso rapido a intervalli byte dei file (veloce come con i file locali) ♪ERDDAPL'accesso ai dati sarà un grave collo di bottiglia e nega altri vantaggi di utilizzare un servizio cloud.

### Dati ospitati{#hosted-data} 
Un'alternativa all'analisi delle prestazioni di costo superiore (che si basa sul titolare dei dati (ad esempio,NOAA) il pagamento dei dati da memorizzare nel cloud) è arrivato intorno al 2012, quando Amazon (e in misura minore, alcuni altri fornitori di cloud) ha iniziato ad ospitare alcuni set di dati nel loro cloud (AWS S3) gratis (presumibilmente con la speranza che possano recuperare i loro costi se gli utenti avrebbero affittato istanze di calcolo AWS EC2 per lavorare con quei dati) . Chiaramente, questo rende il cloud computing molto più conveniente, perché il tempo e il costo per caricare i dati e ospitarlo sono ora zero. ConERDDAP™v2.0, ci sono nuove funzionalità per facilitare l'esecuzioneERDDAPin una nuvola:

* Ora, unEDDGridFromFiles o EDDTableFromFiles dataset può essere creato da file di dati che sono remoti e accessibili tramite Internet (ad esempio, secchi AWS S3) usando&lt;cacheFromUrl&gt; e&lt;cacheSize GB&gt; opzioni.ERDDAP™manterrà una cache locale dei file di dati più recenti utilizzati.
* Ora, se qualsiasi file sorgente EDDTableFromFiles viene compresso (ad esempio,.tgz) ♪ERDDAP™li decomprime automaticamente quando li legge.
* Ora,ERDDAP™thread rispondendo a una data richiesta saranno deposte i fili del lavoratore a lavorare su sottosezioni della richiesta se si utilizza la&lt;nThreads&gt; opzioni. Questa parallelizzazione dovrebbe consentire risposte più rapide alle richieste difficili.

Queste modifiche risolvono il problema di AWS S3 non offrendo archiviazione di file locale, a livello di blocco e il (vecchio) problema di accesso ai dati S3 che hanno un ritardo significativo. (Anni fa (~ 2014) , quel ritardo era significativo, ma ora è molto più breve e quindi non così significativo.) Tutto sommato, significa che l'impostazioneERDDAP™nel cloud funziona molto meglio ora.

 **Grazie.** — Molte grazie a Matthew Arrott e al suo gruppo nello sforzo OOI originale per il loro lavoro sul mettereERDDAP™nel cloud e le discussioni risultanti.
 

- - No.

## [Replica a distanza di Datasets](#remote-replication-of-datasets) {#remote-replication-of-datasets} 

C'è un problema comune che è legato alla discussione sopra di griglie e federazioni diERDDAPs: replica remota di datasets. Il problema di base è: un data provider mantiene un dataset che cambia di tanto in tanto e un utente vuole mantenere una copia locale aggiornata di questo dataset (per una varietà di motivi) . Chiaramente, ci sono un numero enorme di variazioni di questo. Alcune variazioni sono molto più difficili da affrontare rispetto ad altre.

* Aggiornamenti veloci
È più difficile mantenere aggiornati i dati locali *immediatamente*   (ad esempio, entro 3 secondi) dopo ogni cambiamento alla fonte, piuttosto che, per esempio, in poche ore.
     
* Variazioni frequenti
I cambiamenti frequenti sono più difficili da affrontare rispetto ai cambiamenti infrequenti. Ad esempio, i cambiamenti di una volta al giorno sono molto più facili da affrontare rispetto ai cambiamenti ogni 0,1 secondi.
     
* Piccoli cambiamenti
I piccoli cambiamenti in un file sorgente sono più difficili da affrontare di un file completamente nuovo. Questo è particolarmente vero se i piccoli cambiamenti possono essere ovunque nel file. I piccoli cambiamenti sono più difficili da rilevare e rendono difficile isolare i dati che devono essere replicati. I nuovi file sono facili da rilevare ed efficienti da trasferire.
     
* Intero Dataset
Mantenere un intero dataset up-to-date è più difficile che mantenere solo i dati recenti. Alcuni utenti hanno solo bisogno di dati recenti (ad esempio, l'ultimo 8 giorni vale) .
     
* Copie multiple
Mantenere più copie remote in diversi siti è più difficile di mantenere una copia remota. Questo è il problema della scala.
     

Ci sono ovviamente un numero enorme di variazioni di possibili tipi di modifiche al dataset sorgente e delle esigenze e aspettative dell'utente. Molte delle variazioni sono molto difficili da risolvere. La soluzione migliore per una situazione non è spesso la soluzione migliore per un'altra situazione — non c'è ancora una grande soluzione universale.

### [ **RilevamentoERDDAP™Strumenti** ](#relevant-erddap-tools) {#relevant-erddap-tools} 

ERDDAP™offre diversi strumenti che possono essere utilizzati come parte di un sistema che cerca di mantenere una copia remota di un set di dati:

*   ERDDAP'[RSS  (Ricco del Sito?) servizio](https://en.wikipedia.org/wiki/RSS)  
offre un modo rapido per verificare se un set di dati su un telecomandoERDDAP™è cambiato.
     
*   ERDDAP'[servizio di abbonamento](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions)  
è più efficiente (diRSS) approccio: invierà immediatamente un'e-mail o contatterà un URL a ciascun abbonato ogni volta che il dataset verrà aggiornato e l'aggiornamento ha comportato una modifica. E 'efficace in quanto accade al più presto e non c'è uno sforzo sprecato (come inquinare unRSSservizio) . Gli utenti possono utilizzare altri strumenti (come[IFTTT](https://ifttt.com/)) reagire alle notifiche e-mail dal sistema di abbonamento. Ad esempio, un utente potrebbe iscriversi a un set di dati su un telecomandoERDDAP™e utilizzare IFTTT per reagire alle notifiche e-mail di abbonamento e attivare l'aggiornamento del dataset locale.
     
*   ERDDAP'[sistema di segnalazione](/docs/server-admin/additional-information#flag)  
fornisce un modo per unERDDAP™amministratore per indicare un set di dati sul suo / suoERDDAPper ricaricare il prima possibile. La forma URL di una bandiera può essere facilmente utilizzata negli script. Il modulo URL di una bandiera può anche essere utilizzato come azione per un abbonamento.
     
*   ERDDAP'["files"sistema](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)  
può offrire l'accesso ai file sorgente per un dato set di dati, tra cui un elenco di directory in stile Apache dei file (una "Cartella di accesso Web") che ha l'URL di download di ogni file, l'ultima volta modificata e la dimensione. Un lato negativo dell'utilizzo"files"il sistema è che i file sorgente possono avere diversi nomi variabili e metadati diversi rispetto al dataset come appare nelERDDAP. Se un telecomandoERDDAP™dataset offre l'accesso ai file sorgente, che apre la possibilità di una versione rsync di un povero: diventa facile per un sistema locale vedere quali file remoti sono cambiati e devono essere scaricati. (Vedere la[opzione cacheFromUrl](#cache-from-url)sotto che può fare uso di questo.)   
     

### [Soluzioni](#solutions) {#solutions} 

Anche se ci sono un numero enorme di variazioni al problema e un numero infinito di possibili soluzioni, ci sono solo una manciata di approcci di base alle soluzioni:

#### Soluzioni personalizzate, Brute Force{#custom-brute-force-solutions} 
Una soluzione ovvia è quella di realizzare una soluzione personalizzata, che è quindi ottimizzata per una determinata situazione: fare un sistema che rileva/identifica quali dati sono cambiati e invia queste informazioni all'utente in modo che l'utente possa richiedere i dati modificati. Beh, puoi farlo, ma ci sono svantaggi:

* Le soluzioni personalizzate sono un sacco di lavoro.
* Le soluzioni personalizzate sono di solito così personalizzate per un dato set di dati e dato il sistema dell'utente che non possono essere facilmente riutilizzati.
* Le soluzioni personalizzate devono essere costruite e mantenute da voi. (Non e' mai una buona idea. È sempre una buona idea evitare il lavoro e ottenere qualcun altro per fare il lavoro&#33;) 

Sfido di prendere questo approccio perché è quasi sempre meglio cercare soluzioni generali, costruite e mantenute da qualcun altro, che possono essere facilmente riutilizzate in situazioni diverse.
     
#### r{#rsync} 
[r](https://en.wikipedia.org/wiki/Rsync)è l'esistente, sorprendentemente buona, soluzione di scopo generale per mantenere una raccolta di file su un computer sorgente in sincronia su un computer remoto dell'utente. Il modo in cui funziona è:

1. qualche evento (ad esempio, unERDDAP™evento del sistema di abbonamento) attiva rsync,
     (o, un lavoro di cron esegue rsync a orari specifici ogni giorno sul computer dell'utente) 
2. che contatta rsync sul computer sorgente,
3. che calcola una serie di hashes per i pezzi di ogni file e trasmette quelle hashes alla rsync dell'utente,
4. che confronta tali informazioni con le informazioni simili per la copia dell'utente dei file,
5. che poi richiede i pezzi di file che sono cambiati.

    
Considerando tutto ciò che fa, rsync opera molto rapidamente (ad esempio, 10 secondi più il tempo di trasferimento dati) e molto efficiente. Ci sono[variazioni di rsync](https://en.wikipedia.org/wiki/Rsync#Variations)che ottimizzano per diverse situazioni (ad esempio, precalcolando e caching le ceneri dei pezzi di ogni file sorgente) .

Le principali debolezze di rsync sono: ci vuole qualche sforzo per impostare (questioni di sicurezza) ; ci sono alcuni problemi di scaling; e non è bene per mantenere i set di dati NRT veramente aggiornati (ad esempio, è imbarazzante usare rsync più di circa ogni 5 minuti) . Se si può trattare con le debolezze, o se non influiscono sulla vostra situazione, rsync è una soluzione eccellente, scopo generale che chiunque può utilizzare in questo momento per risolvere molti scenari che coinvolgono la replica remota di dataset.

C'è un elemento sulERDDAP™Per fare elenco per cercare di aggiungere il supporto per i servizi rsync aERDDAP  (probabilmente un compito piuttosto difficile) , in modo che qualsiasi client possa utilizzare rsync (o una variante) per mantenere una copia aggiornata di un dataset. Se qualcuno vuole lavorare su questo, per favore e-mailerd.data at noaa.gov.

Ci sono altri programmi che fanno più o meno ciò che rsync fa, a volte orientato alla replica di dataset (anche se spesso a livello di file-copia) Per esempio,Unidata'[IDD](https://www.unidata.ucar.edu/projects/index.html#idd).
    
#### Cache da Url{#cache-from-url} 
[La cacheDaUrl](/docs/server-admin/datasets#cachefromurl)l'impostazione è disponibile (a partire daERDDAP™v.) per tuttiERDDAP's tipi di dataset che fanno set di dati da file (fondamentalmente, tutte le sottoclassi di[EDDGridDa Fili](/docs/server-admin/datasets#eddgridfromfiles)e[EDDTableFromFiles](/docs/server-admin/datasets#eddtablefromfiles)) . cache DaUrl rende banale scaricare e mantenere automaticamente i file di dati locali copiandoli da una sorgente remota tramite la cache Dalla regolazione Url. I file remoti possono essere in una cartella di accesso Web o in un elenco di file simile a directory offerto da THREDDS,Hyrax, un secchio S3 oERDDAP'"files"sistema.
    
Se la fonte dei file remoti è un telecomandoERDDAP™dataset che offre i file sorgente tramite ilERDDAP™ "files"sistema, allora si può[sottoscritto](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions)al set di dati remoto, e utilizzare[URL della bandiera](/docs/server-admin/additional-information#flag)per il vostro set di dati locale come azione per l'abbonamento. Poi, ogni volta che il set di dati remoto cambia, contatterà l'URL della bandiera per il vostro set di dati, che gli dirà di ricaricare ASAP, che rileva e scarica i file di dati remoti modificati. Tutto questo accade molto rapidamente (di solito ~5 secondi più il tempo necessario per scaricare i file modificati) . Questo approccio funziona grande se le modifiche del dataset sorgente sono nuovi file che vengono periodicamente aggiunti e quando i file esistenti non cambiano mai. Questo approccio non funziona bene se i dati sono spesso aggiunti a tutti (o più) dei file di dati di origine esistenti, perché allora il vostro set di dati locale viene spesso scaricato l'intero set di dati remoto. (Questo è dove è necessario un approccio rsync-like.) 
    
#### ArchivioAzione{#archiveadataset} 
ERDDAP™'[ArchivioAzione](/docs/server-admin/additional-information#archiveadataset)è una buona soluzione quando i dati vengono aggiunti a un set di dati frequentemente, ma i dati più vecchi non vengono mai modificati. Fondamentalmente, unERDDAP™amministratore può eseguire ArchiveADataset (forse in uno script, forse eseguito da cron) e specificare un sottoinsieme di un set di dati che vogliono estrarre (forse in più file) e pacchetto in un.zipo.tgzfile, in modo da poter inviare il file a persone o gruppi interessati (ad esempio, NCEI per l'archiviazione) o renderlo disponibile per il download. Ad esempio, è possibile eseguire ArchiveADataset tutti i giorni alle 12:10 e farlo fare un.zipdi tutti i dati dalle 12:00 sono il giorno precedente fino alle 12:00 di oggi. (Oppure, fai questo settimanale, mensile o annuale, come necessario.) Poiché il file pacchetto è generato offline, non c'è pericolo di un timeout o troppi dati, come ci sarebbe per uno standardERDDAP™richiesta.
     
#### ERDDAP™Sistema di richiesta standard{#erddaps-standard-request-system} 
ERDDAP™Il sistema di richiesta standard è una buona soluzione alternativa quando i dati vengono aggiunti a un set di dati frequentemente, ma i dati più vecchi non vengono mai modificati. Fondamentalmente, chiunque può utilizzare richieste standard per ottenere i dati per una specifica gamma di tempo. Ad esempio, alle 12:10 di tutti i giorni, si potrebbe fare una richiesta per tutti i dati da un dataset remoto dalle 12:00 del giorno precedente fino alle 12:00 di oggi. La limitazione (rispetto all'approccio ArchiveADataset) è il rischio di un timeout o ci sono troppi dati per un singolo file. È possibile evitare la limitazione facendo richieste più frequenti per periodi di tempo più piccoli.
     
#### EDDTableDaHttpGet{#eddtablefromhttpget} 
\\[Questa opzione non esiste ancora, ma sembra possibile costruire nel prossimo futuro.\\]  
Il nuovo[EDDTableDaHttpGet](/docs/server-admin/datasets#eddtablefromhttpget)tipo di dataset inERDDAP™v2.0 permette di prevedere un'altra soluzione. I file sottostanti mantenuti da questo tipo di dataset sono essenzialmente file di registro che registrano le modifiche al dataset. Dovrebbe essere possibile costruire un sistema che mantiene un dataset locale periodicamente (o in base a un trigger) richiedere tutte le modifiche apportate al set di dati remoto dall'ultima richiesta. Questo dovrebbe essere efficiente. (o più) che rsync e gestirebbe molti scenari difficili, ma funzionerebbe solo se i set di dati remoti e locali sono EDDTableFromHttpGet set di dati.

Se qualcuno vuole lavorare su questo, si prega di contattareerd.data at noaa.gov.
    
#### Dati distribuiti{#distributed-data} 
Nessuna delle soluzioni sopra fa un ottimo lavoro per risolvere le dure variazioni del problema perché la replica di quasi in tempo reale (N.) datasets è molto difficile, in parte a causa di tutti gli scenari possibili.

C'è una grande soluzione: non provare nemmeno a replicare i dati.
Invece, utilizzare l'unica fonte autorevole (un dataset su unoERDDAP) , mantenuto dal fornitore di dati (per esempio, un ufficio regionale) . Tutti gli utenti che vogliono dati da quel dataset lo ottengono sempre dalla fonte. Ad esempio, le applicazioni basate sul browser ottengono i dati da una richiesta basata su URL, quindi non dovrebbe importare che la richiesta sia alla fonte originale su un server remoto (non lo stesso server che ospita l'ESM) . Molte persone stanno sostenendo questo approccio Distributed Data da molto tempo (ad esempio, Roy Mendelssohn per gli ultimi 20+ anni) .ERDDAPmodello di griglia/federazione (l'80% superiore di questo documento) si basa su questo approccio. Questa soluzione è come una spada a un nodo Gordian — l'intero problema va via.

* Questa soluzione è incredibilmente semplice.
* Questa soluzione è incredibilmente efficiente dal momento che nessun lavoro è fatto per mantenere un set di dati replicato (#) up-to-date.
* Gli utenti possono ottenere i dati più recenti in qualsiasi momento (ad esempio, con una latenza di solo ~0,5 secondi) .
* Scala abbastanza bene e ci sono modi per migliorare la scalatura. (Vedere la discussione al vertice 80% di questo documento.)   
     

No, questa non è una soluzione per tutte le situazioni possibili, ma è una grande soluzione per la stragrande maggioranza. Se ci sono problemi / debolezze con questa soluzione in determinate situazioni, spesso vale la pena lavorare per risolvere quei problemi o vivere con quelle debolezze a causa dei vantaggi incredibili di questa soluzione. Se / quando questa soluzione è veramente inaccettabile per una determinata situazione, ad esempio, quando si deve veramente avere una copia locale dei dati, quindi prendere in considerazione le altre soluzioni discusse sopra.
     
### Conclusioni{#conclusion} 
Mentre non c'è una soluzione semplice e semplice che risolve perfettamente tutti i problemi in tutti gli scenari (come rsync e dati distribuiti quasi sono) , speriamo ci siano strumenti e opzioni sufficienti in modo da poter trovare una soluzione accettabile per la vostra situazione particolare.
