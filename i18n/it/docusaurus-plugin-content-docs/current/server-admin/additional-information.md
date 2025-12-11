---
sidebar_position: 4
---
# Informazioni aggiuntive

## Cose da sapere{#things-you-need-to-know} 
     
###    ** [Errori proxy](#proxy-errors) **  {#proxy-errors} 
A volte, una richiesta di ERDDAP™ restituirà un errore proxy, un errore HTTP 502 Bad Gateway, o qualche errore simile. Questi errori sono stati gettati da Apache o Tomcat, non ERDDAP™ stesso.
* Se ogni richiesta genera questi errori, soprattutto quando si sta prima impostando il ERDDAP™ , allora probabilmente è un errore proxy o gateway cattivo, e la soluzione è probabilmente per risolvere [ ERDDAP Impostazioni proxy](/docs/server-admin/deploy-install#proxypass) . Questo può anche essere il problema quando un stabilito ERDDAP™ improvvisamente inizia a lanciare questi errori per ogni richiesta.
* Altrimenti, gli errori "proxy" di solito sono errori di time out lanciati da Apache o Tomcat. Anche quando si verificano relativamente rapidamente, è una sorta di risposta da Apache o Tomcat che si verifica quando ERDDAP™ è molto occupato, limitato alla memoria, o limitato da qualche altra risorsa. In questi casi, vedere i consigli qui sotto per affrontare [ ERDDAP™ rispondere lentamente](#responding-slowly) .
        
Richieste per un lungo periodo di tempo (&gt; 30 punti) da un dataset grigliato sono inclini a guasti time out, che spesso appaiono come errori proxy, perché ci vuole tempo significativo per ERDDAP™ per aprire tutti i file di dati uno per uno. Se ERDDAP™ è altrimenti occupato durante la richiesta, il problema è più probabile che accada. Se i file del dataset sono compressi, il problema è più probabile che si verifichi, anche se è difficile per un utente determinare se i file di un dataset sono compressi.
La soluzione è quella di fare diverse richieste, ognuna con un range di tempo più piccolo. Quanto è piccolo di un intervallo di tempo? Suggerisco di iniziare davvero piccolo (- 30 punti di tempo?) Allora (circa) raddoppiare l'intervallo di tempo fino a quando la richiesta non fallisce, quindi tornare indietro un raddoppio. Quindi fare tutte le richieste (ciascuno per un pezzo diverso di tempo) necessario per ottenere tutti i dati.
An ERDDAP™ l'amministratore può ridurre questo problema aumentando [Impostazioni timeout Apache](/docs/server-admin/deploy-install#apache-timeout) .
        
### Monitoraggio{#monitoring} 
Tutti vogliamo che i nostri servizi di dati trovino il loro pubblico e vengano ampiamente utilizzati, ma a volte il vostro ERDDAP™ può essere utilizzato troppo, causando problemi, comprese le risposte super lente per tutte le richieste. Il nostro piano per evitare problemi è:

* Monitoraggio ERDDAP™ via il [stato.html pagina web](#status-page) .
Ha tonnellate di informazioni utili. Se si vede che un numero enorme di richieste sono in arrivo, o tonnellate di memoria in uso, o tonnellate di richieste fallite, o ogni Major LoadDatasets sta prendendo molto tempo, o vedere qualsiasi segno di cose che vengono impantanati e rispondere lentamente, quindi guardare in ERDDAP ' [file log.txt](#log) per vedere cosa sta succedendo.
    
È anche utile notare semplicemente quanto velocemente la pagina di stato risponde. Se risponde lentamente, questo è un indicatore importante che ERDDAP™ è molto occupato.
    
* Monitoraggio ERDDAP™ via il [Rapporto giornaliero](#daily-report) email.
     
* Guarda i dataset non aggiornati tramite i *di base*  /erddap/outOfDateDatasets.html pagina web che si basa sull'opzionale [ testOutOfDate ](/docs/server-admin/datasets#testoutofdate) attributo globale.
     
#### Monitor esterni{#external-monitors} 
I metodi sopra elencati sono ERDDAP 's modi di monitorare se stesso. È anche possibile effettuare o utilizzare sistemi esterni per monitorare il vostro ERDDAP . Un progetto per farlo è [Il progetto erddap-metrico di Axiom](https://github.com/axiom-data-science/erddap-metrics) . Tali sistemi esterni hanno alcuni vantaggi:
* Possono essere personalizzati per fornire le informazioni desiderate, visualizzate nel modo desiderato.
* Possono includere informazioni su ERDDAP™ che ERDDAP™ non può accedere facilmente o a tutti (ad esempio, utilizzo della CPU, spazio libero del disco, ERDDAP™ tempo di risposta come visto dalla prospettiva dell'utente, ERDDAP™ uptime,
* Possono fornire avvisi (e-mail, telefonate, testi) agli amministratori quando i problemi superano una certa soglia.
             
### Multiple Simultaneous Richieste{#multiple-simultaneous-requests} 
*    **Utenti Blacklist che fanno più richieste simultanea&#33;** 
Se è chiaro che alcuni utenti stanno facendo più di una richiesta simultanea, ripetutamente e continuamente, quindi aggiungere il loro indirizzo IP a ERDDAP #&lt;richiestaBlacklist&gt; (/docs/server-admin/datasets#requestblacklist) nel tuo datasets.xml file. A volte le richieste sono tutte da un indirizzo IP. A volte sono da più indirizzi IP, ma chiaramente lo stesso utente. È inoltre possibile blacklist persone che fanno tonnellate di richieste non valide o tonnellate di domande senza cervello.
    
Poi, per ogni richiesta che fanno, ERDDAP™ ritorna:
    
    > HTTP ERROR 403 - Access Forbidden --  
    > Your IP address is on this ERDDAP's request blacklist.  
    > Did you often submit more than one request at a time?  
    > Did you often submit identical requests in a short period of time?  
    > Did you submit a large number of invalid requests?  
    > If you are ready to avoid these problems, please email \\[ERDDAP™ administrator's email address\\] to request to be taken off of the blacklist.
    
Speriamo che l'utente vedrà questo messaggio e contattarti per scoprire come risolvere il problema e scendere dalla lista nera. A volte, passano gli indirizzi IP e riprovano.
    
È come l'equilibrio del potere tra armi offensive e difensive in guerra. Qui, le armi difensive ( ERDDAP ) hanno una capacità fissa, limitata dal numero di core nella CPU, dalla larghezza di banda di accesso al disco e dalla larghezza di banda di rete. Ma le armi offensive (utenti, in particolare script) hanno una capacità illimitata:
    
    * Una singola richiesta di dati da un sacco di punti di tempo può causare ERDDAP per aprire un numero enorme di file (in sequenza o parzialmente multi-threaded) . In casi estremi, una richiesta "semplice" può facilmente legare la RAID allegata ERDDAP™ per un minuto, bloccando efficacemente la gestione di altre richieste.
         
    * Una sola richiesta può consumare un grande pezzo di memoria (anche se ERDDAP™ è codificato per minimizzare la memoria necessaria per gestire grandi richieste) .
         
    * Parallelizzazione - No.
È facile per un utente intelligente parallelizzare un grande compito generando un sacco di fili, ognuno dei quali presenta una richiesta separata (che possono essere grandi o piccole) . Questo comportamento è incoraggiato dalla comunità informatica come un modo efficiente per affrontare un grosso problema (e parallelizzare è efficiente in altre circostanze) . Tornando all'analogia di guerra: gli utenti possono fare un numero sostanzialmente illimitato di richieste simultanee con il costo di ogni essere essenzialmente zero, ma il costo di ogni richiesta entra in ERDDAP™ può essere grande e ERDDAP La capacità di risposta è finita. Chiaramente, ERDDAP™ perderà questa battaglia, a meno che la ERDDAP™ amministratori blacklist utenti che stanno facendo più richieste simultanee che sono ingiustamente affollare altri utenti.
         
    * Script multipli -
Ora pensare a cosa succede quando ci sono diversi utenti intelligenti ogni esecuzione di script parallelizzati. Se un utente può generare così tante richieste che altri utenti sono affollati fuori, quindi più utenti possono generare così tante richieste che ERDDAP™ diventa sopraffatto e apparentemente non rispondente. È effettivamente un [DDOS attacco](https://en.wikipedia.org/wiki/Denial-of-service_attack) Ancora, l'unica difesa per ERDDAP™ è agli utenti di blacklist che fanno più richieste simultanee che sono ingiustamente affollano altri utenti.
         
    * Aspetti gonfiati -
In questo mondo di grandi aziende tecnologiche (Amazon, Google, Facebook, ...) , gli utenti sono venuti ad aspettarsi capacità essenzialmente illimitate dai fornitori. Poiché queste aziende sono operazioni di fare soldi, più utenti hanno, più entrate devono espandere la loro infrastruttura IT. Così possono permettersi una massiccia infrastruttura IT per gestire le richieste. E limitano abilmente il numero di richieste e costi di ogni richiesta da parte degli utenti limitando i tipi di richieste che gli utenti possono fare in modo che nessuna singola richiesta sia gravosa, e non c'è mai una ragione (o un modo) per gli utenti di effettuare più richieste simultanea. Così queste grandi aziende tecnologiche possono avere molto più utenti che ERDDAP™ , ma hanno enormemente più risorse e modi intelligenti per limitare le richieste da ogni utente. È una situazione gestibile per le grandi aziende IT (e diventano ricchi&#33;) ma non per ERDDAP™ impianti. Ancora, l'unica difesa per ERDDAP™ è agli utenti di blacklist che fanno più richieste simultanee che sono ingiustamente affollano altri utenti.
         
    
Quindi gli utenti: Non fare più richieste simultanee o sarete lista nera&#33;
     

Chiaramente, è meglio se il server ha un sacco di core, un sacco di memoria (in modo da poter allocare un sacco di memoria a ERDDAP™ più di quanto abbia mai bisogno) , e una connessione internet ad alta larghezza di banda. Poi, la memoria è raramente o mai un fattore limitante, ma la larghezza di banda di rete diventa il fattore limitante più comune. Fondamentalmente, poiché ci sono sempre più richieste simultanee, la velocità a qualsiasi dato utente diminuisce. Questo rallenta naturalmente il numero di richieste in arrivo se ogni utente sta solo inviando una richiesta alla volta.
    
###  ERDDAP™ Ottenere dati da THREDDS{#erddap-getting-data-from-thredds} 
Se il tuo ERDDAP™ ottiene alcuni dei suoi dati da un THREDDS sul tuo sito, ci sono alcuni vantaggi per fare una copia dei file di dati THREDDS (almeno per i dataset più popolari) su un altro RAID che ERDDAP™ ha accesso a così che ERDDAP™ può servire i dati dai file direttamente. A ERD , lo facciamo per i nostri dataset più popolari.

*    ERDDAP™ può ottenere i dati direttamente e non devono aspettare THREDDS per ricaricare il dataset o...
*    ERDDAP™ può notare e incorporare i nuovi file di dati immediatamente, in modo da non dover pisciare spesso THREDDS per vedere se il dataset è cambiato. Vedi&lt;AggiornamentoOgniNMillis&gt; (/docs/server-admin/datasets#updateeverynmillis) .
* Il carico è diviso tra 2 server RAIDS e 2 server, invece della richiesta è difficile su entrambi ERDDAP™ e THREDDS.
* Si evita il problema sbagliato causato da THREDDS che ha un piccolo (per impostazione predefinita) dimensione massima richiesta. ERDDAP™ ha un sistema per gestire l'errore, ma evitare il problema è migliore.
* Hai una copia di backup dei dati che è sempre una buona idea.

In ogni caso, non eseguire THREDDS e ERDDAP™ nello stesso Tomcat. Eseguili in Tomcats separati, o meglio, su server separati.

Troviamo che il THREDDS viene periodicamente in uno stato in cui le richieste solo appendere. Se il tuo ERDDAP™ sta ottenendo dati da un THREDDS e il THREDDS è in questo stato, ERDDAP™ ha una difesa (dice che il dataset basato su THREDDS non è disponibile) , ma è ancora fastidioso per ERDDAP™ perché ERDDAP™ deve aspettare fino al timeout ogni volta che cerca di ricaricare un dataset da un THREDDS appeso. Alcuni gruppi (incluso ERD ) evitare questo riavviando proattivamente THREDDS frequentemente (ad esempio, di notte in un lavoro di cron) .

### Rispondere lentamente{#responding-slowly} 
*    **Se ERDDAP™ La risposta è lenta** o se solo alcune richieste stanno rispondendo lentamente,
si può essere in grado di capire se la lentezza è ragionevole e temporanea (ad esempio, a causa di un sacco di richieste da script o WMS utenti) , o se qualcosa è inspiegabilmente sbagliato e è necessario [spegnere e riavviare Tomcat e ERDDAP™ ](#shut-down-and-restart) .
    
Se ERDDAP™ sta rispondendo lentamente, vedere il consiglio qui sotto per determinare la causa, che si spera vi permetterà di risolvere il problema.
Si può avere un punto di partenza specifico (ad esempio, un URL di richiesta specifica) o un punto di partenza vago (ad esempio, ERDDAP™ è lento) .
È possibile conoscere l'utente coinvolto (ad esempio, perché ti hanno mandato via email) o no.
Potresti avere altri indizi, o no.
Poiché tutte queste situazioni e tutte le possibili cause dei problemi smussano insieme, il consiglio qui sotto cerca di affrontare tutti i possibili punti di partenza e tutti i possibili problemi legati alle risposte lente.
    
    *    **Cerca indizi in [ ERDDAP Il file di registro](#log) **   ( *BigParentDirectory* /logs/log.txt) .
         \\[ In rare occasioni, ci sono indizi in [Il file di registro di Tomcat](#tomcat-logs)   ( *tomcat* /logs/catalina.out) . \\]   
Cerca messaggi di errore.
Cercare un gran numero di richieste provenienti da uno (o pochi) utenti e forse scavando un sacco di risorse del server (memoria, tempo della CPU, accesso al disco, larghezza di banda internet) .
        
Se il problema è legato a **un utente** , si può spesso ottenere un indizio su chi l'utente è tramite servizi web come [https://whatismyipaddress.com/ip-lookup](https://whatismyipaddress.com/ip-lookup) che può darvi informazioni relative all'indirizzo IP dell'utente (che puoi trovare in ERDDAP ' [log.txt](#log) file) .
        
        * Se l'utente sembra essere un **bot** essere comportato male (in particolare, un motore di ricerca che cerca di riempire ERDDAP™ forme con ogni possibile permutazione dei valori di entrata) , assicurarsi di aver impostato correttamente il server [robot.txt](#robotstxt) file.
        * Se l'utente sembra essere un **script script (#) ** che sta facendo più richieste simultanee, contattare l'utente, spiegare che il ERDDAP™ ha risorse limitate (ad esempio, memoria, ora della CPU, accesso al disco, larghezza di banda internet) , e chiedere loro di essere premuroso di altri utenti e solo fare una richiesta alla volta. Si potrebbe anche dire che li blacklist se non si allontanano.
        * Se l'utente sembra essere un **script script** fare un gran numero di richieste che richiedono tempo, chiedere all'utente di essere premuroso di altri utenti mettendo una piccola pausa (Due secondi?) nello script tra le richieste.
        *    ** WMS software client** può essere molto esigente. Un cliente spesso chiederà 6 immagini personalizzate alla volta. Se l'utente sembra essere un WMS cliente che sta facendo richieste legittime, è possibile:
            * Ignoralo. (raccomandato, perché si muoveranno presto) 
            * Spegni il server WMS servizio tramite ERDDAP Il file setup.html. (non raccomandato) 
        * Se le richieste sembrano **stupido, pazzo, eccessivo o maligno,** o se non è possibile risolvere il problema in altro modo, considerare temporaneamente o permanentemente l'aggiunta dell'indirizzo IP dell'utente al [&lt;richiestaBlacklist&gt; nel tuo datasets.xml file] (/docs/server-admin/datasets#requestblacklist) .
             
    *    **Prova a duplicare il problema da solo, dal tuo computer.**   
Scopri se il problema è con un dataset o tutti i dataset, per un utente o tutti gli utenti, per alcuni tipi di richieste, ecc.
Se è possibile duplicare il problema, cercare di restringere il problema.
Se non è possibile duplicare il problema, allora il problema può essere legato al computer dell'utente, alla connessione internet dell'utente, o alla connessione internet della vostra istituzione.
         
    * Se solo **un dataset** sta rispondendo lentamente (forse solo per **un tipo di richiesta** da un utente) , il problema può essere:
        *    ERDDAP 'l'accesso ai dati sorgente del dataset (in particolare da database relazionali, Cassandra e dataset remoti) può essere temporaneamente o permanentemente lento. Prova a controllare la velocità della fonte indipendente da ERDDAP . Se è lento, forse si può migliorare.
        * Il problema riguarda la specifica richiesta o il tipo di richiesta generale?
Più grande è il sottoinsieme richiesto di un dataset, più è probabile che la richiesta fallisca. Se l'utente sta facendo richieste enormi, chiedere all'utente di fare richieste più piccole che sono più probabilità di ottenere una risposta veloce e di successo.
            
Quasi tutti i set di dati sono meglio nel gestire alcuni tipi di richieste rispetto ad altri tipi di richieste. Ad esempio, quando un dataset memorizza blocchi di tempo diversi in diversi file, le richieste di dati da un numero enorme di punti di tempo possono essere molto lente. Se le richieste attuali sono di tipo difficile, considerare di offrire una variante del dataset ottimizzata per queste richieste. O semplicemente spiegare all'utente che quel tipo di richiesta è difficile e richiede tempo, e chiedere la loro pazienza.
            
        * Il dataset potrebbe non essere configurato in modo ottimale. Potrebbe essere possibile apportare modifiche al dataset datasets.xml chunk per aiutare ERDDAP™ gestire meglio il dataset. Per esempio,
            
            *    EDDGrid Dai dataset NcFiles che i dati di accesso dai file nc4/hdf5 compressi sono lenti quando si ottengono i dati per l'intera gamma geografica (per esempio, per una mappa del mondo) perché l'intero file deve essere decompresso. Si potrebbe convertire i file in file non compressi, ma poi il requisito spazio disco sarà molto, molto più grande. È probabilmente meglio accettare che tali set di dati saranno lenti in determinate circostanze.
            * La configurazione del [&lt; subsetVariables &gt; (/docs/server-admin/datasets#subsetvariables) tag ha una grande influenza su come ERDDAP™ gestisce i set di dati EDDTable.
            * Si può essere in grado di aumentare il [velocità di un EDDTableFromDatabase](/docs/server-admin/datasets#database-speed) Dataset.
            * Molti set di dati EDDTable possono essere sped up da [memorizzazione di una copia dei dati in NetCDF File di Array Ragged Contiguous](/docs/server-admin/datasets#eddtablefromfiles) che ERDDAP™ può leggere molto rapidamente.
            
Se si desidera aiutare a velocizzare un set di dati specifico, includere una descrizione del problema e il pezzo di dataset datasets.xml e vedere il nostro [sezione per ottenere supporto aggiuntivo](/docs/intro#support) .
             
    * Se **tutto** in ERDDAP™ è **sempre** lento, il problema può essere:
        * Il computer in esecuzione ERDDAP™ può non avere abbastanza memoria o potenza di elaborazione. È bello correre ERDDAP™ su un server moderno e multi-core. Per un uso pesante, il server dovrebbe avere un sistema operativo a 64 bit e 8 GB o più di memoria.
        * Il computer in esecuzione ERDDAP™ può anche eseguire altre applicazioni che stanno consumando un sacco di risorse di sistema. Se è così, è possibile ottenere un server dedicato per ERDDAP ? Per esempio (questo non è un'approvazione) , è possibile ottenere un quad-core Mac Mini Server con 8 GB di memoria per ~$1100.
             
    * Se **tutto** in ERDDAP™ è **temporaneamente** lento, visualizzare il ERDDAP ' [ ** /erddap/status.html pagina** ](#status-page) nel tuo browser.
        * Fa il ERDDAP™ pagina di stato non riesce a caricare?
Se è così, [riavvio ERDDAP™ ](#shut-down-and-restart) .
        * L'ho fatto ERDDAP™ stato pagina carico lentamente (ad esempio, &gt;5 secondi) ?
Questo è un segno che tutto ERDDAP™ sta correndo lentamente, ma non è necessariamente un problema. ERDDAP™ Potrebbe essere molto impegnato.
        * Per "Risponsa il Tempo Non Risponso (dall'ultima maggiore LoadDatasets) ", è n= un gran numero?
Ciò indica che ci sono state molte richieste fallite di recente. Potrebbe essere un problema o l'inizio dei problemi. Il tempo mediano per i guasti è spesso grande (ad esempio, 210000 ms) ♪
che significa che c'erano (Davvero?) molti thread attivi.
che stavano legando un sacco di risorse (come memoria, file aperti, prese aperte, ...) ♪
che non è buono.
        * Per "Risponsa Tempo Accade (dall'ultima maggiore LoadDatasets) ", è n= un gran numero?
Ciò indica che ci sono state un sacco di richieste di successo di recente. Non è un problema. Significa solo il tuo ERDDAP™ sta diventando pesante.
        * Il "Numero di fili non-Tomcat" raddoppia un valore tipico?
Questo è spesso grave problema che causerà ERDDAP™ rallentare e alla fine congelare. Se questo persiste per ore, si può desiderare proattivamente [riavvio ERDDAP™ ](#shut-down-and-restart) .
        * Nella parte inferiore dell'elenco "Memory Use Summary", è l'ultimo valore "Memory: attualmente utilizzando" molto alto?
Questo può solo indicare l'uso elevato, o può essere un segno di problemi.
        * Guarda la lista dei filetti e il loro stato. Un numero insolito di loro sta facendo qualcosa di insolito?
             
    * È **connessione internet della vostra istituzione** Attualmente lento?
Cercare internet per "internet speed test" e utilizzare uno dei test online gratuiti, come [https://www.speakeasy.net/speedtest/](https://www.speakeasy.net/speedtest/) . Se la connessione internet della vostra istituzione è lenta, allora i collegamenti tra ERDDAP™ e le fonti di dati remote saranno lente e le connessioni tra ERDDAP™ e l'utente sarà lento. A volte, è possibile risolvere questo problema fermando uso di internet non necessario (ad esempio, le persone che guardano i video in streaming o le videochiamate) .
         
    * È **connessione internet dell'utente** Attualmente lento?
Fai cercare l'utente su internet per "internet speed test" e usa uno dei test online gratuiti, come [https://www.speakeasy.net/speedtest/](https://www.speakeasy.net/speedtest/) . Se la connessione internet dell'utente è lenta, rallenta il loro accesso a ERDDAP . A volte, possono risolvere questo problema bloccando l'uso di Internet non necessario alla loro istituzione (ad esempio, le persone che guardano i video in streaming o le videochiamate) .
         
    *    **Stuck?**   
Guarda la nostra [sezione per ottenere supporto aggiuntivo](/docs/intro#support) .

### Zitto e riavvia{#shut-down-and-restart} 
*    **Come chiudere e riavviare Tomcat e ERDDAP™ **   
Non c'è bisogno di chiudere e riavviare Tomcat e ERDDAP se ERDDAP™ è temporaneamente lento, lento per qualche ragione conosciuta (come un sacco di richieste da script o WMS utenti) , o per applicare le modifiche datasets.xml file.
    
Devi chiudere e riavviare Tomcat e ERDDAP™ se è necessario applicare le modifiche al file setup.xml, o se ERDDAP™ blocca, blocca o blocca. In circostanze estreme, Java può congelare per un minuto o due mentre fa una collezione di spazzatura completa, ma poi recuperare. Quindi è bene aspettare un minuto o due per vedere se Java / ERDDAP™ è davvero congelato o se sta solo facendo una lunga raccolta di rifiuti. (Se la raccolta di rifiuti è un problema comune, [allocare più memoria a Tomcat](/docs/server-admin/deploy-install#memory) .) 
    
Non consiglio di usare Tomcat Web Application Manager per avviare o chiudere Tomcat. Se non si completamente shutdown e avvio Tomcat, prima o poi si avrà PermGen problemi di memoria.
    
Per chiudere e riavviare Tomcat e ERDDAP :
    
    * Se si utilizza Linux o Mac:
         (Se hai creato un utente speciale per eseguire Tomcat, ad esempio, tomcat, ricorda di fare i seguenti passaggi come quell'utente.)   
         
        1. Utilizzare cd *tomcat* /
             
        2. Utilizzare ps -ef | tomcat grep per trovare il processo java/tomcat ID (Speriamo che solo un processo sarà elencato) che chiameremo *javaProcess* sotto.
             
        3. Se ERDDAP™ è congelato/hung/bloccato, uso uccidere -3 *javaProcess* per dire Java   (che è in esecuzione Tomcat) per fare una discarica filettata al file di registro Tomcat: *tomcat* /logs/catalina.out . Dopo il riavvio, è possibile diagnosticare il problema trovando il thread dump informazioni (e qualsiasi altra informazione utile sopra di esso) in *tomcat* /logs/catalina.out e anche leggendo parti rilevanti del [ ERDDAP™ archivio di log](#log) . Se vuoi, puoi includere queste informazioni e vedere le nostre [sezione per ottenere supporto aggiuntivo](/docs/intro#support) .
             
        4. Utilizzare ./shutdown. #
             
        5. Utilizzare ps -ef | grep tomcat ripetutamente fino a quando il processo java/tomcat non è elencato.
            
A volte, il processo java/tomcat richiederà fino a due minuti per chiudere completamente. Il motivo è: ERDDAP™ invia un messaggio ai suoi filetti di sfondo per dirgli di fermarsi, ma a volte ci vuole molto tempo per arrivare a un buon punto di sosta.
            
        6. Se dopo un minuto o giù di lì, java/tomcat non si ferma da solo, è possibile utilizzare
uccidere -9 *javaProcess*   
forzare il processo java/tomcat a fermarsi immediatamente. Se possibile, utilizzare questo solo come ultima risorsa. L'interruttore -9 è potente, ma può causare vari problemi.
             
        7. Riavviare ERDDAP™ , utilizzare ./startup.sh
             
        8. Vista ERDDAP™ nel tuo browser per verificare che il riavvio è riuscito. (A volte, è necessario aspettare 30 secondi e cercare di caricare ERDDAP™ di nuovo nel vostro browser per esso per avere successo.)   
             
    * Se si utilizza Windows:
         
        1. Utilizzare cd *tomcat* /
             
        2. Uso shutdown.bat   
             
        3. È possibile che si desidera / bisogno di utilizzare il Task Manager di Windows (accessibile tramite Ctrl Alt Del) per assicurare che Java /Tomcat/ ERDDAP™ processo/applicazione è completamente fermato.
A volte, il processo/applicazione richiederà fino a due minuti per chiudere. Il motivo è: ERDDAP™ invia un messaggio ai suoi filetti di sfondo per dirgli di fermarsi, ma a volte ci vuole molto tempo per arrivare a un buon punto di sosta.
             
        4. Riavviare ERDDAP™ , utilizzare startup.bat
             
        5. Vista ERDDAP™ nel tuo browser per verificare che il riavvio è riuscito. (A volte, è necessario aspettare 30 secondi e cercare di caricare ERDDAP™ di nuovo nel vostro browser per esso per avere successo.)   
             
### Crash frequenti o congela{#frequent-crashes-or-freezes} 
Se ERDDAP™ diventa lento, si schianta o si blocca, qualcosa non va. Guarda [ ERDDAP Il file di registro](#log) cercare di capire la causa. Se non è possibile, si prega di includere i dettagli e vedere i nostri [sezione per ottenere supporto aggiuntivo](/docs/intro#support) .

Il problema più comune è un utente problematico che sta eseguendo diversi script contemporaneamente e/o qualcuno che fa un gran numero di richieste non valide. Se questo accade, probabilmente si dovrebbe blacklist quell'utente. Quando un utente blacklist fa una richiesta, il messaggio di errore nella risposta li incoraggia a e-mail per risolvere i problemi. Poi, è possibile incoraggiarli a eseguire solo uno script alla volta e risolvere i problemi nel loro script (ad esempio, la richiesta di dati da un set di dati remoto che non può rispondere prima di scadere) . Vedi&lt;richiestaBlacklist&gt; nel tuo datasets.xml file] (/docs/server-admin/datasets#requestblacklist) .

In circostanze estreme, Java può congelare per un minuto o due mentre fa una collezione di spazzatura completa, ma poi recuperare. Quindi è bene aspettare un minuto o due per vedere se Java / ERDDAP™ è davvero congelato o se sta solo facendo una lunga raccolta di rifiuti. (Se la raccolta di rifiuti è un problema comune, [allocare più memoria a Tomcat](/docs/server-admin/deploy-install#memory) .) 

Se ERDDAP™ diventa lento o congela e il problema non è un utente fastidioso o una lunga raccolta di rifiuti, di solito si può risolvere il problema da [riavviare ERDDAP™ ](#shut-down-and-restart) . La mia esperienza è che ERDDAP™ può funzionare per mesi senza bisogno di un riavvio.
     

### Monitoraggio{#monitor} 
Puoi monitorare il tuo ERDDAP lo stato guardando [ /erddap/status.html pagina](#status-page) , in particolare le statistiche nella parte superiore. Se ERDDAP™ diventa lento o congela e il problema non è solo un uso estremamente pesante, di solito si può risolvere il problema da [riavviare ERDDAP™ ](#shut-down-and-restart) . Ci sono ulteriori metriche disponibili attraverso l'integrazione Prometheus a /erddap/metrics.

La mia esperienza è che ERDDAP™ può funzionare per mesi senza bisogno di un riavvio. Si dovrebbe solo bisogno di riavviare se si desidera applicare alcuni cambiamenti che hai fatto per ERDDAP 's setup.xml o quando è necessario installare nuove versioni di ERDDAP™ ♪ Java Tomcat, o il sistema operativo. Se hai bisogno di riavviare ERDDAP™ frequentemente, qualcosa non va. Guarda [ ERDDAP Il file di registro](#log) cercare di capire la causa. Se non è possibile, si prega di includere i dettagli e vedere i nostri [sezione per ottenere supporto aggiuntivo](/docs/intro#support) . Come soluzione temporanea, si potrebbe provare a utilizzare [Monit](https://mmonit.com/monit/) per monitorare il ERDDAP™ e riavviarlo se necessario. Oppure potresti fare un lavoro da cron per ricominciare. ERDDAP™   (proattivamente) periodicamente. Potrebbe essere un po' impegnativo scrivere uno script per automatizzare il monitoraggio e il riavvio ERDDAP . Alcuni consigli che potrebbero aiutare:

* È possibile semplificare il test se il processo Tomcat è ancora in esecuzione utilizzando l'interruttore -c con grep:
ps. *tomcat Utente*   | grep -c java
Ciò ridurrà l'output a "1" se il processo di tomcat è ancora vivo, o "0" se il processo si è fermato.
     
* Se sei bravo con gawk, puoi estrarre il processID dai risultati di
ps. *tomcat Utente*   | grep java, e utilizzare il processID in altre linee dello script.
     

Se si imposta Monit o un lavoro di cron, sarebbe bello se si potesse condividere i dettagli in modo che gli altri potrebbero beneficiare [sezione per ottenere supporto aggiuntivo](/docs/intro#support) per dove puoi condividere.

#### Profumo{#permgen} 
Se usi ripetutamente Tomcat Manager per ricaricare (o Stop and Start)   ERDDAP™ ♪ ERDDAP™ potrebbe non cominciare a lanciare java.lang. Voce principale: PermGen. La soluzione è periodicamente (o ogni volta?)   [spegnere e riavviare tomcat e ERDDAP™ ](#shut-down-and-restart) , invece di ricaricare ERDDAP .
 \\[ Aggiornamento: Questo problema è stato notevolmente ridotto o risolto in ERDDAP™ versione 1.24. \\]   
     
#### Log{#log} 
*    ** [log.txt](#log) **   
Se ERDDAP™ non si avvia o se qualcosa non funziona come previsto, è molto utile guardare i messaggi di errore e diagnostica nel ERDDAP™ file di registro.
    * Il file di registro è *BigParentDirectory* /logs/log.txt
         ( *BigParentDirectory* è specificato in [setup.xml](/docs/server-admin/deploy-install#setupxml) ) . Se non c'è un tronco. file txt o se il registro. txt file non è stato aggiornato da quando hai riavviato ERDDAP™ , guarda dentro [Tomcat File di registro](#tomcat-logs) per vedere se c'è un messaggio di errore lì.
    * Tipi di messaggi diagnostici nel file di registro:
        * La parola "error" viene usata quando qualcosa è andato così male che la procedura non è riuscita a completare. Anche se è fastidioso per ottenere un errore, l'errore ti costringe a affrontare il problema. Il nostro pensiero è che è meglio lanciare un errore, che avere ERDDAP™ Hobble lungo, lavorando in un modo che non ti aspettavi.
        * La parola "avvertimento" viene usata quando qualcosa è andato storto, ma la procedura è stata in grado di essere completata. Sono piuttosto rari.
        * Qualunque altra cosa è solo un messaggio informativo. È possibile controllare quante informazioni sono registrate con [&lt;logLevel&gt;] (/docs/server-admin/datasets#loglevel)   datasets.xml .
        * Ricarica dati e risposte utente che richiedono &gt;10 secondi per finire (con successo o senza successo) sono contrassegnati con " (10&#33;) ". Così, è possibile cercare il file log.txt per questa frase per trovare i set di dati che erano lenti a ricaricare o il numero di richiesta delle richieste che erano lente a finire. Si può quindi guardare più in alto nel file log.txt per vedere che cosa il problema dataset era o che cosa la richiesta dell'utente era e da chi era. Questi carichi di dataset lenti e le richieste degli utenti sono a volte tassando su ERDDAP . Così sapere di più su queste richieste può aiutare a identificare e risolvere i problemi.
    * Le informazioni sono scritte al file di registro sull'unità disco in pezzi abbastanza grandi. Il vantaggio è che questo è molto efficiente -- ERDDAP™ non blocco mai in attesa di informazioni da scrivere al file di registro. Lo svantaggio è che il registro finirà quasi sempre con un messaggio parziale, che non sarà completato fino a quando il prossimo pezzo sarà scritto. Puoi aggiornarlo. (per un istante) visualizzando il ERDDAP 's stato pagina web ahttps://*your.domain.org*/erddap/status.html  (o http:// se https non è abilitato) .
    * Quando i file log.txt arrivano a 20 MB,
il file viene rinominato log. txt.previous e viene creato un nuovo file log.txt. Quindi i file di registro non si accumulano.
        
In setup.xml, è possibile specificare una dimensione massima diversa per il file di registro, in MegaBytes. Il minimo consentito è 1 (MB) . Il massimo consentito è il 2000 (MB) . Il valore predefinito è 20 (MB) . Per esempio:
```
        <logMaxSizeMB>20</logMaxSizeMB>
```

    * Ogni volta che riavvia ERDDAP™ ♪
         ERDDAP™ fa una copia di archivio del log.txt e log. txt.previous file con un timestamp nel nome del file. Se ci sono stati problemi prima del riavvio, potrebbe essere utile analizzare questi file archiviati per indizi su ciò che il problema era. È possibile eliminare i file di archivio se non sono più necessari.
         
##### Parsing log.txt{#parsing-logtxt} 
 ERDDAP Il tronco. il file txt non è progettato per la parsing (anche se si potrebbe essere in grado di creare espressioni regolari che estrarre le informazioni desiderate) . È progettato per aiutare una persona a capire cosa sta andando storto quando qualcosa sta andando storto. Quando si invia un bug o un report di problemi ERDDAP™ gli sviluppatori, quando possibile, si prega di includere tutte le informazioni dal file log.txt relative alla richiesta fastidiosa.

Per motivi di efficienza, ERDDAP™ solo scrive informazioni per registrare. txt dopo un grande pezzo di informazione si è accumulato. Quindi se visiti il registro. txt subito dopo che si è verificato un errore, le informazioni relative all'errore potrebbero non essere ancora state scritte su log.txt. Per ottenere informazioni perfettamente aggiornate da log.txt, visita il tuo ERDDAP ' [stato.html pagina](#status-page) . Quando ERDDAP™ processi che richiedono, svuota tutte le informazioni in sospeso per log.txt.

Per ERDDAP™ statistiche di utilizzo, si prega di utilizzare [File di registro Apache e/o Tomcat](#tomcat-logs) invece di ERDDAP E' log.txt. Nota: ERDDAP ' [stato.html pagina](#status-page)   (alcuni) e [Rapporto giornaliero](#daily-report)   (di più) hanno un gran numero di statistiche di utilizzo precalcolato per voi.
    
### Tomcat Logs{#tomcat-logs} 
Se ERDDAP™ non inizia perché un errore si è verificato molto presto ERDDAP 's startup, il messaggio di errore verrà visualizzato nei file di registro di Tomcat ( *tomcat* /logs/catalina. *oggi* .log o *tomcat* /logs/catalina.out) , non dentro [ ERDDAP Il file log.txt](#log) .

Statistiche di utilizzo: Per la maggior parte delle informazioni che le persone vogliono raccogliere da un file di registro (ad esempio, statistiche di utilizzo) , si prega di utilizzare i file di registro Apache e/o Tomcat. Sono ben formattati e hanno quel tipo di informazioni. Ci sono numerosi strumenti per analizzarli, ad esempio, [AWStats](https://www.awstats.org) ♪ [Kibana di ElasticSearch](https://www.elastic.co/products/kibana) e [JMeter](https://jmeter.apache.org) , ma cercate il web per trovare lo strumento giusto per i vostri scopi.

Si noti che i file di registro identificano solo gli utenti come indirizzi IP. Ci sono siti web per aiutarti a ottenere informazioni relative a un determinato indirizzo IP, ad esempio, [WhatIsMyIPAddress](https://whatismyipaddress.com/ip-lookup) , ma normalmente non sarà in grado di trovare il nome dell'utente.

Inoltre, a causa di [DHCP](https://en.wikipedia.org/wiki/Dynamic_Host_Configuration_Protocol) , l'indirizzo IP di un dato utente può essere diverso in giorni diversi, o gli utenti diversi possono avere lo stesso indirizzo IP in tempi diversi.

In alternativa, puoi usare qualcosa come [Google Analytics](https://analytics.google.com/analytics/web/provision/?authuser=0#/provision) . Ma attenzione: quando utilizzi servizi esterni come Google Analytics, stai rinunciando alla privacy dei tuoi utenti dando a Google l'accesso completo alla loro attività sul tuo sito che Google (e altri?) può mantenere per sempre e utilizzare per qualsiasi scopo (forse non tecnicamente, ma probabilmente in pratica) . I tuoi utenti non hanno acconsentito a questo e probabilmente non sono consapevoli che saranno rintracciati sul tuo sito web, proprio come probabilmente non sono a conoscenza della misura in cui vengono monitorati su quasi tutti i siti web. In questi giorni, molti utenti sono molto preoccupati che tutto ciò che fanno sul web è monitorato da queste grandi aziende (Google, Facebook, ecc.) e dal governo, e trovare questo un'intrusione non sana nelle loro vite (come nel libro, 1984) . Questo ha spinto molti utenti a installare prodotti come [Privacy Badger](https://www.eff.org/privacybadger/faq) per minimizzare il monitoraggio, per utilizzare browser alternativi come [Tor Browser](https://www.torproject.org/)   (o disattivare il monitoraggio nei browser tradizionali) , e utilizzare motori di ricerca alternativi come [Duck Duck Go](https://duckduckgo.com/) . Se si utilizza un servizio come Google Analytics, si prega di documentare almeno il suo utilizzo e le conseguenze cambiando&lt;tag standardPrivacyPolicy&gt; in ERDDAP '
 \\[ tomcat \\] /webapps/erddap/WEB-INF/classes/gov/noa/pfel/erddap/util/messages.xml file.
    
### E-Mail Log{#e-mail-log} 
*    **emailLogYEAR-MM-DD.txt**   
     ERDDAP™ scrive sempre il testo di tutti i messaggi e-mail in uscita nell'e-mail del giorno corrente LogYEAR-MM-DD.txt file in *BigParentDirectory* /logs ( *BigParentDirectory* è specificato in [setup.xml](/docs/server-admin/deploy-install#setupxml) ) .
    * Se il server non può inviare messaggi e-mail, o se è configurato ERDDAP™ non inviare messaggi e-mail, o se siete solo curiosi, questo file è un modo conveniente per vedere tutti i messaggi e-mail che sono stati inviati.
    * È possibile eliminare i file di registro e-mail dei giorni precedenti se non sono più necessari.
         
### Rapporto giornaliero{#daily-report} 
Il Daily Report ha un sacco di informazioni utili -- tutte le informazioni dal vostro ERDDAP ' [ /erddap/status.html pagina](#status-page) e altro ancora.
    * È il riassunto più completo del vostro ERDDAP E' stato.
    * Tra le altre statistiche, include un elenco di set di dati che non hanno caricato e le eccezioni generate.
    * Viene generato quando si inizia ERDDAP™   (subito dopo ERDDAP™ finiture cercando di caricare tutti i dataset) e generato subito dopo 7 ore locali ogni mattina.
    * Ogni volta che viene generato, è scritto a [ ERDDAP Il file log.txt](#log) .
    * Ogni volta che viene generato, viene inviato via email&lt;emailDailyReportsTo&gt; e&lt;emailTutto &gt; (che sono specificati [setup.xml](/docs/server-admin/deploy-install#setupxml) ) a condizione che abbiate impostato il sistema di posta elettronica (in setup.xml) .

### Pagina di stato{#status-page} 
Puoi visualizzare lo stato del tuo ERDDAP™ da qualsiasi browser andando a&lt;&gt; /erddap/status.html 
* Questa pagina è generata dinamicamente, quindi ha sempre statistiche up-to-the-moment per il tuo ERDDAP .
* Esso comprende le statistiche relative al numero di richieste, l'utilizzo della memoria, le tracce dello stack del thread, il taskThread, ecc.
* Poiché la pagina di stato può essere vista da chiunque, non include molte informazioni come la [Rapporto giornaliero](#daily-report) .
         
### Aggiunta/Changing Datasets{#addingchanging-datasets} 
 ERDDAP™ di solito rilegge datasets.xml ogni *caricoDatasetsMinMinutes*   (specificato [setup.xml](/docs/server-admin/deploy-install#setupxml) ) . Così si può fare modifiche a datasets.xml in qualsiasi momento, anche mentre ERDDAP™ sta correndo.
Un nuovo set di dati verrà rilevato presto, di solito all'interno *caricoDatasetsMinMinutes* .
Un set di dati modificato verrà ricaricato quando è *reloadEveryNMinuts* vecchio (come specificato datasets.xml ) .
    
#### Bandiera{#flag} 
*    ** [Un file di bandiera](#flag) Indicazioni ERDDAP™ per cercare di ricaricare un Dataset non appena possibile** 
    
    *    ERDDAP™ non noterà alcuna modifica alla configurazione di un dataset datasets.xml fino a quando ERDDAP™ ricarica il dataset.
         
    * A dire ERDDAP™ ricaricare un dataset il prima possibile (prima del dataset)&lt;reloadEveryNMinutes&gt; lo causerebbe essere ricaricato), mettere un file in *BigParentDirectory* /flag ( *BigParentDirectory* è specificato in [setup.xml](/docs/server-admin/deploy-install#setupxml) ) che ha lo stesso nome del dataset datasetID .
Questo dice ERDDAP™ per provare a ricaricare il dataset ASAP.
La vecchia versione del dataset rimarrà disponibile agli utenti fino a quando la nuova versione è disponibile e scambiata atomicamente in atto.
Per EDDGrid DaFiles ed EDDTable DaFiles, il dataset di ricarica cercherà i file nuovi o modificati, li legga e li incorporerà nel dataset. Quindi il tempo di ricarica dipende dal numero di file nuovi o modificati.
Se il dataset è attivo="false", ERDDAP™ rimuoverà il dataset.
         
##### Bandiera dei file danneggiati{#bad-files-flag} 
* Una variante della directory /flag è la directory /badFilesFlag. (Aggiunto in ERDDAP™ Voce principale:)   
Se metti un file nel *BigParentDirectory* directory /badFilesFlag con un datasetID come il nome del file (il contenuto del file non importa) , poi non appena ERDDAP™ vede il maleFiles Bandiera, ERDDAP™ sarà:
    
    1. Eliminare il file BadFilesFlag.
    2. Eliminare i BadFiles .nc file (se c'è uno) , che ha l'elenco dei file cattivi per quel dataset.
Per i set di dati come EDDGrid SideBySide che hanno bambiniDatasets, questo elimina anche i BadFiles .nc file per tutti i dataset bambino.
    3. Ricarica il dataset al più presto.
    
Così, questa causa ERDDAP™ per provare di nuovo a lavorare con i file in precedenza (Erroneamente?) marcato come male.
         
##### Bandiera rigida{#hard-flag} 
* Un'altra variante della directory /flag è la directory /hardFlag. (Aggiunto in ERDDAP™ v1.74.)   
Se metti un file dentro *BigParentDirectory* /hardFlag con un datasetID come il nome del file (il contenuto del file non importa) , poi non appena ERDDAP™ vede il duro Bandiera, ERDDAP™ sarà:
    
    1. Eliminare il file hardFlag.
    2. Rimuovere il dataset da ERDDAP .
    3. Elimina tutte le informazioni che ERDDAP™ ha memorizzato su questo dataset.
Per EDDGrid DaFiles ed EDDTable FromFiles sottoclasses, questo elimina il database interno dei file di dati e il loro contenuto.
Per i set di dati come EDDGrid SideBySide che hanno bambiniDatasets, questo elimina anche il database interno dei file di dati e il loro contenuto per tutti i dataset bambino.
    4. Ricarica il dataset.
Per EDDGrid DaFiles ed EDDTable Dalle sottoclassi di Files, questo provoca ERDDAP™ a rileggere **Tutto** dei file di dati. Così, il tempo di ricarica dipende dal numero totale di file di dati nel dataset. Perché il dataset è stato rimosso ERDDAP™ quando l'hardFlag è stato notato, il dataset non sarà disponibile fino a quando il dataset termina il caricamento. Sii paziente. Guarda dentro [log.txt](#log) se vuoi vedere cosa sta succedendo.
    
La variante hardFlag cancella le informazioni memorizzate del dataset anche se il dataset non è attualmente caricato in ERDDAP .
    
Duro Le bandiere sono molto utili quando si fa qualcosa che provoca un cambiamento in come ERDDAP™ legge e interpreta i dati di origine, ad esempio, quando si installa una nuova versione di ERDDAP™ o quando hai apportato una modifica alla definizione di un dataset datasets.xml 
    
* I contenuti della bandiera, badFilesFlag e hardFlag sono irrilevanti. ERDDAP™ solo guarda il nome del file per ottenere il datasetID .
     
* Tra i maggiori carichi di dataset, ERDDAP™ cerca continuamente per i file di bandiera, badFilesFlag e hardFlag.
     
* Si noti che quando un dataset viene ricaricato, tutti i file nel *BigParentDirectory* / [cache](#cached-responses) / * datasetID * directory vengono eliminati. Questo include .nc e file di immagine che sono normalmente memorizzati nella cache per ~15 minuti.
     
* Nota che se il set di dati xml include [attivo="falso"](/docs/server-admin/datasets#active) , una bandiera farà sì che il set di dati sia reso inattivo (se è attivo) , e in ogni caso, non ricaricato.
     
* Ogni volta ERDDAP™ esegue LoadDatasets per effettuare una ricarica importante (il carico di tempo controllato da&lt;loadDatasetsMinMinutes&gt; o una ricarica minore (come risultato di una bandiera esterna o interna) ♪ ERDDAP™ legge tutto&lt;decompressoCacheMaxGB&gt;,&lt;decompressoCacheMaxMinutesOld&gt;,&lt;&gt;&lt;richiestaBlacklist&gt;,&lt;slowDownTroubleMillis&gt;, e&lt;sottoscrizioneEmailBlacklist&gt; tag e switch alle nuove impostazioni. Così si può utilizzare una bandiera come un modo per ottenere ERDDAP™ per notare le modifiche a tali tag al più presto.

##### Impostare la bandiera dei dati{#set-dataset-flag} 
*   ERDDAP™ ha un servizio web in modo che le bandiere possano essere impostate tramite URL.
    
    * Per esempio,
        https://coastwatch.pfeg.noaa.gov/erddap/setDatasetFlag.txt?datasetID=rPmelTao&flagKey=123456789  
         (che è una bandiera falsa Chiave) imposta una bandiera per il dataset rPmelTao.
    * C'è un altro flagKey per ogni datasetID .
    * Gli amministratori possono vedere un elenco di URL di bandiera per tutti i set di dati guardando in fondo al loro [Rapporto giornaliero](#daily-report) email.
    * Gli amministratori dovrebbero trattare questi URL come confidenziali, dal momento che danno a qualcuno il diritto di ripristinare un dataset a volontà.
    * Se pensi che i flagKeys siano caduti nelle mani di qualcuno che li abusa, puoi cambiare&lt;flagKeyKey&gt; in [setup.xml](/docs/server-admin/deploy-install#setupxml) e riavviare ERDDAP a forza ERDDAP™ per generare e utilizzare un diverso set di flagKeys.
    * Se cambi&lt;flagKeyKey&gt;, eliminare tutti i vecchi abbonamenti (vedi la lista nel tuo rapporto giornaliero) e ricorda di inviare i nuovi URL alle persone che si desidera avere.
    
Il sistema di bandiera può servire come base per un meccanismo più efficiente per raccontare ERDDAP™ quando ricaricare un dataset. Ad esempio, è possibile impostare un set di dati&lt;reloadEveryNMinutes&gt; a un numero elevato (ad esempio, 10080 = 1 settimana) . Poi, quando si sa che il dataset è cambiato (forse perché hai aggiunto un file alla directory dati del dataset) , impostare una bandiera in modo che il dataset venga ricaricato il prima possibile. Le bandiere sono di solito viste rapidamente. Ma se il filo LoadDatasets è già occupato, può essere un po 'prima che sia disponibile per agire sulla bandiera. Ma il sistema di bandiera è molto più reattivo e molto più efficiente di impostazione&lt;reloadEveryNMinutes&gt; a un piccolo numero.
    
#### Rimozione dei set di dati{#removing-datasets} 
Se un dataset è attivo ERDDAP™ e si desidera disattivarlo temporaneamente o permanentemente:
1. In datasets.xml per il dataset, set [attivo="falso"](/docs/server-admin/datasets#active) nel tag dataset.
2. Aspetta. ERDDAP™ per rimuovere il set di dati durante la successiva ricarica principale o [impostare una bandiera](#flag) per il dataset da raccontare ERDDAP™ per notare questo cambiamento il prima possibile. Quando lo fai, ERDDAP™ non getta alcuna informazione che potrebbe aver memorizzato sul dataset e certamente non fa nulla ai dati effettivi.
3. Quindi è possibile lasciare il dataset attivo="false" in datasets.xml o rimuoverlo.
         
#### Quando vengono ricaricati Datasets?{#when-are-datasets-reloaded} 
Un thread chiamato RunLoadDatasets è il filetto master che controlla quando vengono ricaricati i dataset. RunLoad Datasets loops per sempre:

1. RunLoadDatasets nota l'ora corrente.
2. RunLoadDatasets inizia un filetto LoadDatasets per fare un "majorLoad". Puoi vedere informazioni sull'attuale / precedente majorLoad in cima al tuo ERDDAP '
     [ /erddap/status.html pagina](#status-page)   (per esempio, [esempio pagina di stato](https://coastwatch.pfeg.noaa.gov/erddap/status.html) ) .
    
    1. LoadDatasets fa una copia di datasets.xml .
    2. LoadDatasets legge attraverso la copia di datasets.xml e, per ogni dataset, vede se il dataset deve essere (re) caricato o rimosso.
        * Se [bandiera](#flag) file esiste per questo set di dati, il file viene eliminato e il set di dati viene rimosso se attivo="falso" o (re) caricato se attivo="vero" (indipendentemente dall'età del dataset) .
        * Se il dataset's dataset.xml chunk è attivo="falso" e il dataset è attualmente caricato (attivo) , è scaricato (rimosso) .
        * Se il dataset ha attiva="true" e il dataset non è già caricato, è caricato.
        * Se il dataset è attivo="true" e il dataset è già caricato, il set di dati viene ricaricato se l'età del dataset (tempo dall'ultimo carico) è più grande della sua&lt;ricarica Tutti i prodotti (default = 10080 minuti) , altrimenti, il dataset è lasciato solo.
    3. Finiture LoadDatasets.
    
Il filetto RunLoadDatasets aspetta il thread LoadDatasets da terminare. Se LoadDatasets richiede più tempo di caricareDatasets MinMinuts (come specificato in setup.xml) , RunLoadDatasets interrompe il filetto LoadDatasets. Idealmente, LoadDatasets nota l'interruzione e le finiture. Ma se non si nota l'interruzione entro un minuto, RunLoadDatasets chiama loadDatasets. Fermati. () , che è indesiderabile.
3. Mentre il tempo dall'inizio dell'ultimo majorLoad è inferiore a caricoDatasets MinMinuts (come specificato in setup.xml, ad esempio, 15 minuti) , RunLoadDatasets ripetutamente cerca [bandiera](#flag) file nel *BigParentDirectory* directory /flag. Se si trovano uno o più file di bandiera, vengono eliminati e RunLoadDatasets avvia un filetto LoadDatasets per fare un "minorLoad" (majorLoad=false) . Non puoi vedere le informazioni di minor carico sul tuo ERDDAP ' [ /erddap/status.html pagina](#status-page) .
    1. LoadDatasets fa una copia di datasets.xml .
    2. LoadDatasets legge attraverso la copia di datasets.xml e, per ogni dataset per il quale c'era un file di bandiera:
        * Se il dataset's dataset.xml chunk è attivo="falso" e il dataset è attualmente caricato (attivo) , è scaricato (rimosso) .
        * Se il dataset è attivo="true", il dataset è (re) carica, indipendentemente dalla sua età. I dataset non infiammati vengono ignorati.
    3. Finiture LoadDatasets.
4. RunLoad Datasets torna al passo 1.

Note:
* Inizio
Quando si riavvia ERDDAP™ , ogni dataset con active="true" è caricato.
* Cache
Quando un set di dati è (re) caricato, la sua cache (incluso qualsiasi file di risposta dati e/o file di immagine) è svuotato.
* Molti Datasets
Se hai un sacco di dataset e/o uno o più dataset sono lenti a (re) carico, un filo LoadDatasets può richiedere molto tempo per finire il suo lavoro, forse anche più lungo di caricareDatasets MinMinutes.
* Un filetto di dati di carico
Non c'è mai più di un filetto LoadDatasets in esecuzione contemporaneamente. Se una bandiera è impostata quando LoadDatasets è già in esecuzione, la bandiera probabilmente non verrà notata o agita fino a che il filetto LoadDatasets non finirà in esecuzione. Potresti dire: "È stupido. Perché non si avvia un gruppo di nuovi thread per caricare i set di dati?" Ma se si dispone di un sacco di dataset che ottengono i dati da un server remoto, anche un filetto LoadDatasets metterà lo stress sostanziale sul server remoto. Lo stesso è vero se si dispone di un sacco di dataset che ottengono dati da file su un RAID. Ci sono ritorni in rapida diminuzione da avere più di un filo LoadDatasets.
* Bandiera = ASAP
Impostare una bandiera solo segnali che il set di dati dovrebbe essere (re) caricato il prima possibile, non necessariamente immediatamente. Se non è attualmente in esecuzione nessun thread LoadDatasets, il dataset inizierà a essere ricaricato entro pochi secondi. Ma se un filetto LoadDatasets è attualmente in esecuzione, il dataset probabilmente non verrà ricaricato fino a dopo che il thread LoadDatasets è finito.
* Bandiera Cancellata
In generale, se si mette un file di bandiera nel *BigParentDirectory* directory /erddap/flag (visitando la bandiera del dataset Url o mettere un file reale lì) , il dataset di solito verrà ricaricato molto presto dopo che il file di bandiera viene eliminato.
* Bandiera contro Small reload OgniNMinuts
Se avete qualche modo esterno di sapere quando un dataset deve essere ricaricato e se è conveniente per voi, il modo migliore per assicurarsi che un dataset è sempre aggiornato è quello di impostare il suo ricarica EveryNMinutes a un gran numero (10080?) e impostare una bandiera (tramite uno script?) ogni volta che deve essere ricaricato. Questo è il sistema che EDDGrid Da Erddap e EDDTableFromErddap l'uso riceve messaggi che il set di dati deve essere ricaricato.
* Guarda nel log.txt
Molte informazioni pertinenti sono scritte al *BigParentDirectory* /logs/log.txt file. Se le cose non funzionano come ti aspetti, guardando il registro. txt ti permette di diagnosticare il problema scoprendo esattamente cosa ERDDAP™ l'ha fatto.
    
    * Cerca "majorLoad=true" per l'inizio dei principali filetti LoadDataset.
    * Cerca "majorLoad=false" per l'inizio dei filetti LoadDatasets minori.
    * Ricerca di un dato set di dati datasetID per informazioni su di esso essendo (re) caricati o interrogati.
        
          
         
#### Risposte in attesa{#cached-responses} 
In generale, ERDDAP™ non memorizza (negozio) risposte alle richieste degli utenti. La ragione era che la maggior parte delle richieste sarebbe stata leggermente diversa quindi la cache non sarebbe stata molto efficace. Le maggiori eccezioni sono richieste di file immagine (che sono memorizzati in cache da browser e programmi come Google Earth spesso ri-richiesta immagini) e richieste di .nc file (perché non possono essere creati) . ERDDAP™ memorizza i file memorizzati nella cache di ogni dataset in una directory diversa: *BigParentDirectory* /cache/ * datasetID * dal momento che una singola directory cache potrebbe avere un numero enorme di file che potrebbero diventare lento all'accesso.
I file vengono rimossi dalla cache per uno dei tre motivi:
* Tutti i file in questa cache vengono eliminati quando ERDDAP™ è riavviata.
* Periodicamente, qualsiasi file più di&lt;cacheMinutes&gt; vecchio (come specificato [setup.xml](/docs/server-admin/deploy-install#setupxml) ) sarà cancellato. Rimozione dei file nella cache in base all'età (non Least-Recently-Used) assicura che i file non rimangano nella cache molto a lungo. Anche se potrebbe sembrare come una data richiesta dovrebbe sempre restituire la stessa risposta, che non è vero. Per esempio, un tabledap richiesta che include &time&gt; *alcuni Tempo* cambierà se arrivano nuovi dati per il dataset. E una richiesta di grigliata che include \\[ Ultimo \\] per la dimensione del tempo cambierà se nuovi dati arrivano per il dataset.
* Le immagini che mostrano condizioni di errore vengono memorizzate nella cache, ma solo per pochi minuti (è una situazione difficile) .
* Ogni volta che un dataset viene ricaricato, tutti i file nella cache di quel dataset vengono eliminati. Perché le richieste possono essere per "last" indice in un set di dati grigliato, i file nella cache possono diventare non validi quando un set di dati viene ricaricato.
         
#### Informazioni sul Dataset memorizzate{#stored-dataset-information} 
Per tutti i tipi di dataset, ERDDAP™ raccoglie un sacco di informazioni quando un set di dati viene caricato e lo mantiene in memoria. Questo permette ERDDAP™ rispondere molto rapidamente a ricerche, richieste di elenchi di set di dati e richieste di informazioni su un set di dati.

Per alcuni tipi di dataset (in particolare EDDGrid Ricevuto, EDDTableCopy, EDDGrid Da *Xxx* File e EDDTableFrom *Xxx* File) ♪ ERDDAP™ memorizza sul disco alcune informazioni sul dataset che viene riutilizzato quando il dataset viene ricaricato. Questo accelera notevolmente il processo di ricarica.

* Alcuni dei file di informazione del set di dati sono leggibili dall'uomo .json file e sono memorizzati in *BigParentDirectory* / dataset/ *Last2LettersOfDatasetID/ datasetID * .
*    ERDDAP™ elimina solo questi file in situazioni insolite, ad esempio, se si aggiunge o elimina una variabile dal dataset datasets.xml Sbagliato.
* La maggior parte delle modifiche a un dataset datasets.xml # (ad esempio, modificare un attributo globale o un attributo variabile) non è necessario eliminare questi file. Una normale ricarica dei dataset gestirà questi tipi di modifiche. Si può dire ERDDAP™ per ricaricare un dataset ASAP impostando un [bandiera](#flag) per il dataset.
* Allo stesso modo, l'aggiunta, la cancellazione o la modifica dei file di dati saranno trattati quando ERDDAP™ ricarica un dataset. Ma ERDDAP™ noterà questo tipo di cambiamento presto e automaticamente se il dataset sta usando il [&lt;AggiornamentoOgniNMillis&gt; (/docs/server-admin/datasets#updateeverynmillis) sistema.
* Dovrebbe essere solo raramente necessario per eliminare questi file. La situazione più comune in cui è necessario forzare ERDDAP™ per eliminare le informazioni memorizzate (perché è fuori data / non corretta e non sarà automaticamente fissato da ERDDAP ) è quando si apportano modifiche al dataset datasets.xml chunk che colpisce come ERDDAP™ interpreta i dati nei file di dati di origine, ad esempio, cambiando la stringa di formato della variabile di tempo.
* Per eliminare i file di informazione memorizzati di un dataset da un ERDDAP™ che sta correndo (anche se il dataset non è attualmente caricato) # Set a [duro Bandiera](#hard-flag) per quel dataset. Ricorda che se un dataset è un'aggregazione di un gran numero di file, ricaricare il dataset può richiedere molto tempo.
* Per eliminare i file di informazione memorizzati di un dataset quando ERDDAP™ non corre, corre [DasDds](/docs/server-admin/datasets#dasdds) per quel dataset (che è più facile di capire in quale directory si trova l'informazione e la cancellazione dei file a mano) . Ricorda che se un dataset è un'aggregazione di un gran numero di file, ricaricare il dataset può richiedere molto tempo.
         
### Stato di memoria{#memory-status} 
 ERDDAP™ Non dovrebbe mai schiantarsi o congelarsi. Se lo fa, una delle cause più probabili è la memoria insufficiente. È possibile monitorare l'utilizzo della memoria guardando la pagina web status.html, che include una linea come

0 chiamate gc, 0 richieste capannone e 0 pericolose MemoryEmails dall'ultima maggiore LoadDatasets

 (quelli sono eventi progressivamente più gravi)   
e MB inUse e gc Chiama colonne nella tabella delle statistiche. Si può dire come la memoria-stressed il ERDDAP™ è guardando questi numeri. I numeri più alti indicano più stress.

* MB inUse dovrebbe essere sempre meno della metà [Impostazione della memoria \\-Xmx](/docs/server-admin/deploy-install#memory) . I numeri più grandi sono un cattivo segno.
* gc chiamate indica il numero di volte ERDDAP™ chiamato il collettore spazzatura per cercare di alleviare l'uso di memoria alta. Se questo diventa &gt;100, questo è un segno di guai seri.
* capannone indica il numero di richieste in arrivo che sono state versate (con numero di errore HTTP 503, Servizio Non disponibile) perché l'uso della memoria era già troppo alto. Idealmente, nessuna richiesta deve essere versato. Va bene se alcune richieste sono state gettate, ma un segno di guai se molti sono stati gettati.
* pericoloso MemoryEmails - Se l'uso della memoria diventa pericolosamente alto, ERDDAP™ invia un'e-mail agli indirizzi e-mail elencati in&lt;emailTutto &gt; (in setup.xml) con un elenco delle richieste degli utenti attivi. Come dice l'email, si prega di inoltrare queste email a Chris. John a Noaa. gov in modo da poter utilizzare le informazioni per migliorare le versioni future di ERDDAP .
     

Se il tuo ERDDAP™ è la memoria-stressed:
* Considera di assegnare più memoria del tuo server ERDDAP™ cambiando il Tomcat [Impostazione della memoria ‐Xmx](/docs/server-admin/deploy-install#memory) .
* Se hai già assegnato più memoria possibile ERDDAP™ via -Xmx, prendere in considerazione l'acquisto di più memoria per il server. La memoria è a buon mercato (rispetto al prezzo di un nuovo server o al tuo tempo) &#33; Poi aumentare -Xmx.
* In datasets.xml , set&lt;nGridThreads&gt; a 1, set&lt;nTableThreads&gt; a 1, e set&lt;ipAddressMaxRequestsActive&gt; a 1.
* Guarda le richieste in log.txt per inefficienti o fastidiosi (ma legittimo) richieste. Aggiungi i loro indirizzi IP a&lt;richiestaBlacklist» in datasets.xml . Il messaggio di errore della lista nera include ERDDAP™ indirizzo email dell'amministratore con la speranza che quegli utenti ti contatteranno in modo che tu possa lavorare con loro per usare ERDDAP™ più efficiente. E 'bello mantenere un elenco di indirizzi IP che si blacklist e perché, in modo da poter lavorare con gli utenti se si contatta.
* Guarda le richieste in log.txt per le richieste degli utenti dannosi. Aggiungi i loro indirizzi IP a&lt;richiestaBlacklist» in datasets.xml . Se le richieste simili provengono da più indirizzi IP simili, è possibile utilizzare alcuni servizi who-is (ad esempio, [https://www.whois.com/whois/](https://www.whois.com/whois/) ) per scoprire la gamma di indirizzi IP da quella sorgente e la lista nera dell'intero range. Vedere il [&lt;richiestaBlacklist&gt; documentazione (/docs/server-admin/datasets#requestblacklist) .
         
#### Informazioni generali{#outofmemoryerror} 
Quando si imposta ERDDAP™ , specificare la quantità massima di memoria che Java può essere utilizzato tramite [Impostazione \\-Xmx](/docs/server-admin/deploy-install#memory) . Se ERDDAP™ mai ha bisogno di più memoria di questo, getterà una java. Lang. OutOfMemoryError. ERDDAP™ fa un sacco di controllo per consentire di gestire questo errore con grazia (ad esempio, una richiesta fastidiosa fallirà, ma il sistema mantiene la sua integrità) . Ma a volte, l'errore danneggia l'integrità del sistema e devi riavviare ERDDAP . Speriamo che sia raro.

La soluzione rapida e facile per un OutOfMemoryError è aumentare [Impostazione \\-Xmx](/docs/server-admin/deploy-install#memory) , ma non si dovrebbe mai aumentare l'impostazione -Xmx a più dell'80% della memoria fisica nel server (ad esempio, per un server da 10 GB, non impostare -Xmx sopra 8GB) . La memoria è relativamente economica, quindi può essere una buona opzione per aumentare la memoria nel server. Ma se si è massimizzato la memoria nel server o per altri motivi non può aumentare, è necessario affrontare più direttamente con la causa del OutOfMemoryError.

Se guardi dentro [log.txt](#log) file per vedere cosa ERDDAP™ stava facendo quando è sorto l'errore, di solito si può ottenere un buon indizio sulla causa del OutOfMemoryError. Ci sono molte cause possibili, tra cui:

* Un singolo file di dati enorme può causare OutOfMemoryError, in particolare, file di dati ASCII enormi. Se questo è il problema, dovrebbe essere ovvio perché ERDDAP™ non verrà caricato il dataset (per set di dati tabulari) o leggere i dati da quel file (per set di dati grigliati) . La soluzione, se possibile, è quella di dividere il file in più file. Idealmente, è possibile dividere il file in blocchi logici. Ad esempio, se il file ha 20 mesi di valore di dati, dividerlo in 20 file, ciascuno con 1 mese di valore di dati. Ma ci sono vantaggi anche se il file principale è diviso arbitrariamente. Questo approccio ha molteplici vantaggi: a) Questo ridurrà la memoria necessaria per leggere i file di dati a 1/20, perché solo un file viene letto alla volta. b) Spesso, ERDDAP™ può trattare le richieste molto più velocemente perché deve solo guardare in uno o pochi file per trovare i dati per una determinata richiesta. c) Se la raccolta dei dati è in corso, i 20 file esistenti possono rimanere invariati, e devi solo modificare un, piccolo, nuovo file per aggiungere il valore dei dati del mese successivo al dataset.
* Una singola enorme richiesta può causare il OutOfMemoryError. In particolare, alcuni dei orderBy opzioni hanno l'intera risposta in memoria per un secondo (ad esempio, per fare una specie) . Se la risposta è enorme, può portare all'errore. Ci saranno sempre alcune richieste che sono, in vari modi, troppo grandi. È possibile risolvere il problema aumentando l'impostazione -Xmx. Oppure, è possibile incoraggiare l'utente a fare una serie di richieste più piccole.
* È improbabile che un gran numero di file causerebbe l'indice di file che ERDDAP™ crea per essere così grande che quel file causerebbe l'errore. Se presumiamo che ogni file utilizza 300 byte, allora 1,000,000 file richiederebbe solo 300MB. Ma i set di dati con un numero enorme di file di dati causano altri problemi per ERDDAP , in particolare, ci vuole molto tempo per ERDDAP™ per aprire tutti quei file di dati quando si risponde a una richiesta dell'utente per i dati. In questo caso, la soluzione può essere quella di aggregare i file in modo che ci siano meno file di dati. Per i set di dati tabulari, è spesso grande se si salva i dati dal dataset corrente in [CFU Geometrie di smorzamento discreto (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Contiguous Ragged Array file di dati (richiesta .nc File CF da ERDDAP ) e poi fare un nuovo set di dati. Questi file possono essere gestiti in modo molto efficiente con ERDDAP ' [EDDTableFromNcCFFiles](/docs/server-admin/datasets#eddtablefromnccffiles) . Se sono organizzati logicamente (ciascuno con i dati per un pezzo di spazio e tempo) ♪ ERDDAP™ può estrarre i dati da loro molto rapidamente.
* Per set di dati tabulari che utilizzano il [&lt; subsetVariables &gt; (/docs/server-admin/datasets#subsetvariables) attributo, ERDDAP™ rende una tabella di combinazioni uniche dei valori di quelle variabili. Per grandi set di dati o quando&lt; subsetVariables &gt; è configurato male, questa tabella può essere abbastanza grande da causare OutOfMemoryErrors. La soluzione è quella di rimuovere le variabili dall'elenco di&lt; subsetVariables &gt; per i quali ci sono un gran numero di valori, o rimuovere le variabili necessarie fino a quando la dimensione di tale tabella non è ragionevole. Le parti di ERDDAP™ che usano subsetVariables sistema non funziona bene (ad esempio, le pagine web caricano molto lentamente) quando ci sono più di 100.000 righe in quella tabella.
* È sempre possibile che diverse richieste simultanee di grandi dimensioni (su un molto occupato ERDDAP ) può combinare per causare problemi di memoria. Ad esempio, 8 richieste, ciascuna usando 1GB ciascuna, causerebbero problemi per una configurazione -Xmx=8GB. Ma è raro che ogni richiesta sia al culmine del suo uso di memoria simultaneamente. E si sarebbe facilmente in grado di vedere che il vostro ERDDAP™ è molto occupato con grandi richieste. Ma è possibile. E 'difficile affrontare questo problema a parte aumentando l'impostazione -Xmx.
* Ci sono altri scenari. Se guardi [log.txt](#log) file per vedere cosa ERDDAP™ stava facendo quando è sorto l'errore, di solito si può ottenere un buon indizio sulla causa. Nella maggior parte dei casi, c'è un modo per minimizzare quel problema (vedi sopra) , ma a volte hai solo bisogno di più memoria e un'impostazione -Xmx più alta.
         
### Troppi file aperti{#too-many-open-files} 
A partire da ERDDAP™ 2, del regolamento (CEE) n. ERDDAP™ ha un sistema per monitorare il numero di file aperti (che include prese e alcune altre cose, non solo file) in Tomcat su computer Linux. Se alcuni file erroneamente non vengono mai chiusi (una "perdita di risorse") , il numero di file aperti può aumentare fino a che non superi il massimo consentito dal sistema operativo e numerose cose davvero brutte avvengono. Così ora, su computer Linux (perché le informazioni non sono disponibili per Windows) :

* C'è una colonna "Apri file" nell'estrema destra della pagina web status.html che mostra il per cento dei file max aperti. Su Windows, mostra solo "?".
* Quando ERDDAP™ genera tali informazioni alla fine di ogni importante reload dataset, stamperà al registro. file txt:
openFileCount= *corrente* di max = *massimo* # *percentuale* 
* Se la percentuale è &gt;50%, una e-mail viene inviata al ERDDAP™ amministratore e l'email Tutto A indirizzi e-mail.

Se la percentuale è al 100%, ERDDAP™ è in guai terribili. Non lasciare che accada.
Se la percentuale è &gt; 75%, ERDDAP™ è vicino a guai terribili. Non va bene.
Se la percentuale è &gt;50%, è molto possibile che un picco causerà la percentuale di colpire 100.
Se la percentuale è sempre &gt;50%, si dovrebbe:
* Aumentare il numero massimo di file aperti consentiti da:
    * Rendere questi cambiamenti ogni volta prima di iniziare tomcat (metterli nel file Tomcat startup.sh?) :
ulimit -Hn 16384
Ulimit -Sn 16384
    * O fare un cambiamento permanente modificando (come radice) /etc/security/limits.conf e aggiungendo le linee:
tomcat soft nofile 16384
tomcat hard nofile 16384
Questi comandi presumono che l'utente che esegue Tomcat sia chiamato "tomcat".
Su molte varianti Linux, è necessario riavviare il server per applicare tali modifiche. Per entrambe le opzioni, il "16384" sopra è un esempio. Scegli il numero che pensi sia meglio.
* Riavviare ERDDAP . Il sistema operativo chiuderà tutti i file aperti.
         
### Richieste fallite{#failed-requests} 
*    **Attività insolita: &gt;25% delle richieste fallite**   
Come parte di ogni reloadDatasets, che è di solito ogni 15 minuti, ERDDAP™ esamina la percentuale di richieste fallite dall'ultimo reloadDatasets. Se è &gt;25%, ERDDAP™ invia una email al ERDDAP™ amministratore con l'oggetto "Unusual Activity: &gt;25% delle richieste fallite". Tale email include un tally vicino al fondo dal titolo "Indirizzo IP del Richiedente (Sfigato)   (da ultimo Major LoadDatasets) ". Cercalo. Ti dice l'indirizzo IP dei computer che fanno le richieste più fallite. È quindi possibile cercare quegli indirizzi IP in \\[ BigParentDirectory \\] /logs/ [log.txt](#log) file e vedere che tipo di richieste stanno facendo.
    
È possibile utilizzare il numero IP dell'utente (per esempio, con [https://whatismyipaddress.com/ip-lookup](https://whatismyipaddress.com/ip-lookup) ) cercare di capire chi o cosa è l'utente. A volte che vi dirà abbastanza esattamente chi è l'utente (ad esempio, è un web crawler di un motore di ricerca) . La maggior parte del tempo ti dà solo un indizio (Per esempio, e' un computer amazonaws, e' di qualche università, e' qualcuno in una citta' specifica.) .
    
Osservando la richiesta effettiva, il numero IP e il messaggio di errore (tutti da [log.txt](#log) ) per una serie di errori, di solito si può capire che cosa sta andando storto. Nella mia esperienza, ci sono quattro cause comuni di molte richieste fallite:
    
1) Le richieste sono dannose (ad esempio, alla ricerca di carenze di sicurezza, o fare richieste e poi cancellarle prima di essere completate) . Dovresti usare&lt;richiestaBlacklist» in datasets.xml a blacklist quegli indirizzi IP.
    
2) Un motore di ricerca è ingenuamente provare gli URL elencati in ERDDAP™ pagine web e documenti ISO 19115. Per esempio, ci sono molti posti che elencano la base OPeNDAP URL, per esempio,https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST, a cui l'utente dovrebbe aggiungere un tipo di file (ad esempio, .das, .dds, .html) . Ma il motore di ricerca non lo sa. E la richiesta all'URL di base fallisce. Una situazione correlata è quando il motore di ricerca genera richieste bizzarre o cerca di compilare moduli per arrivare a pagine web "nascoste". Ma i motori di ricerca spesso fanno un cattivo lavoro di questo, portando a fallimenti. La soluzione è: creare un [robot.txt](#robotstxt) file.
    
3) Qualche utente esegue uno script che chiede ripetutamente qualcosa che non c'è. Forse è un set di dati che esisteva, ma ora è andato (temporaneamente o permanente) . Gli script spesso non si aspettano questo e quindi non affrontarlo in modo intelligente. Quindi lo script continua a fare richieste e le richieste continuano a fallire. Se si può indovinare chi è l'utente (dal numero IP sopra) , contattarli e dire loro che il dataset non è più disponibile e chiedere loro di cambiare il loro script.
    
4) Qualcosa è davvero sbagliato in alcuni dataset. Di solito, ERDDAP™ renderà inattivo il dataset problematico. A volte non lo fa, così tutte le richieste ad esso solo portare a errori. In tal caso, risolvere il problema con il dataset o (se non puoi) impostare il dataset per [attivo="falso"](/docs/server-admin/datasets#active) . Naturalmente, questo può portare al problema #2.
    
A volte gli errori non sono così male, in particolare, se ERDDAP™ può rilevare l'errore e rispondere molto rapidamente (&lt;= 1ms). Così si può decidere di non agire.
    
Se tutto il resto fallisce, c'è una soluzione universale: aggiungere il numero IP dell'utente al [&lt;richiestaBlacklist&gt; (/docs/server-admin/datasets#requestblacklist) . Non è così male o come drastica opzione come potrebbe sembrare. L'utente otterrà quindi un messaggio di errore che dice s/he è stato lista nera e dicendo loro il vostro (il ERDDAP™ amministratore) indirizzo email. A volte l'utente ti contatterà e puoi risolvere il problema. A volte l'utente non ti contatta e vedrai lo stesso comportamento proveniente da un numero IP diverso il giorno successivo. Blacklist il nuovo numero IP e spero che alla fine otterranno il messaggio. (O questo è il tuo giorno di Groundhog, da cui non fuggirai mai. Scusa.) 
    
### robot.txt{#robotstxt} 
Le società di motore di ricerca utilizzano web crawlers (ad esempio, Google Bot) esaminare tutte le pagine del web per aggiungere il contenuto ai motori di ricerca. Per ERDDAP™ , fondamentalmente buono. ERDDAP™ ha un sacco di link tra le pagine, così i crawler troveranno tutte le pagine web e li aggiungono ai motori di ricerca. Poi, gli utenti dei motori di ricerca saranno in grado di trovare set di dati sul vostro ERDDAP .
    
Purtroppo, alcuni web crawlers (ad esempio, Google Bot) sono ora compilare e presentare moduli per trovare contenuti aggiuntivi. Per i siti web di commercio, questo è grande. Ma questo è terribile ERDDAP™ perché porta a un **infinito infinito** numero di tentativi indesiderati e inutili di strisciare i dati reali. Questo può portare a più richieste di dati che da tutti gli altri utenti combinati. E riempie il motore di ricerca con subset goofy, inutile dei dati effettivi.
    
Per dire ai web crawler di smettere di compilare i moduli e semplicemente generalmente non guardando le pagine web che non hanno bisogno di guardare, è necessario creare un file di testo chiamato [robot.txt](https://en.wikipedia.org/wiki/Robots_exclusion_standard) nella directory principale della gerarchia dei documenti del tuo sito web in modo che possa essere visto da chiunque come, ad esempio,http://*www.your.domain*/robots.txt.
Se state creando un nuovo robot. file txt, questo è un buon inizio:
```
    User-Agent: \\*
    Disallow: /erddap/files/ 
    Disallow: /files/ 
    Disallow: /images/ 
    Disallow: /\\*?
    Disallow: /\\*?\\*
    Disallow: /\\*.asc\\*
    Disallow: /\\*.csv\\*
    Disallow: /\\*.dods\\*
    Disallow: /\\*.esriAscii\\*
    Disallow: /\\*.esriCsv\\*
    Disallow: /\\*.geoJson\\*
    Disallow: /\\*.htmlTable\\*
    Disallow: /\\*.json\\*
    Disallow: /\\*.mat\\*
    Disallow: /\\*.nc\\*
    Disallow: /\\*.odvTxt\\*
    Disallow: /\\*.tsv\\*
    Disallow: /\\*.xhtml\\*
    Disallow: /\\*.geotif\\*
    Disallow: /\\*.itx\\*
    Disallow: /\\*.kml\\*
    Disallow: /\\*.pdf\\*
    Disallow: /\\*.png\\*
    Disallow: /\\*.large\\*
    Disallow: /\\*.small\\*
    Disallow: /\\*.transparentPng\\*
    Sitemap: http://***your.institutions.url***/erddap/sitemap.xml
```
     (Ma sostituisci *il vostro.istituzioni.url* con il tuo ERDDAP L'URL di base.)   
Può richiedere alcuni giorni per i motori di ricerca di notare e per i cambiamenti di prendere effetto.
     
### sitemap.xml{#sitemapxml} 
Come [https://www.sitemaps.org](https://www.sitemaps.org/) il sito dice:

> Sitemaps are an easy way for webmasters to inform search engines about pages on their sites that are available for crawling. In its simplest form, a Sitemap is an XML file that lists URLs for a site along with additional metadata about each URL (when it was last updated, how often it usually changes, and how important it is, relative to other URLs on the site) so that search engines can more intelligently crawl the site.
> 
> Web crawlers usually discover pages from links within the site and from other sites. Sitemaps supplement this data to allow crawlers that support Sitemaps to pick up all URLs in the Sitemap and learn about those URLs using the associated metadata. Using the Sitemap protocol does not guarantee that web pages are included in search engines, but provides hints for web crawlers to do a better job of crawling your site.

A dire il vero, da quando ERDDAP™ è RESTful , i ragni del motore di ricerca possono facilmente strisciare il ERDDAP . Ma tendono a farlo più spesso (ogni giorno&#33;) rispetto al necessario (mensile?) .

* Dato che ogni motore di ricerca può essere strisciando l'intero ERDDAP™ ogni giorno, questo può portare a un sacco di richieste inutili.
* Quindi... ERDDAP™ genera un file sitemap.xml per il vostro ERDDAP™ che dice motori di ricerca che il vostro ERDDAP™ solo deve essere strisciato ogni mese.
* Si dovrebbe aggiungere un riferimento a ERDDAP 's sitemap.xml al vostro [robot.txt](https://en.wikipedia.org/wiki/Robots_exclusion_standard) file:
Mappa del sito:http://**www.yoursite.org**/erddap/sitemap.xml
* Se questo non sembra ottenere il messaggio ai crawler, è possibile dire ai vari motori di ricerca sul file sitemap.xml visitando questi URL (ma il cambiamento **La vostra Istituzione** all'acronimo o abbreviazione dell'istituzione e **www.yoursite.org** al tuo ERDDAP URL) :
    *   https://www.bing.com/webmaster/ping.aspx?siteMap=http://**www.yoursite.org**/erddap/sitemap.xml
    *   https://www.google.com/ping?sitemap=http://**www.yoursite.org**/erddap/sitemap.xml(Ipensare) devi solo ping ogni motore di ricerca una volta, per tutto il tempo. I motori di ricerca allora rilevano le modifiche a sitemap.xml periodicamente.
     
### Diffusione dei dati / Distribuzione dei dati Reti: Push e Pull Tecnologia{#data-dissemination--data-distribution-networks-push-and-pull-technology} 
* Normalmente, ERDDAP™ agisce come intermediario: richiede una richiesta da parte di un utente; ottiene i dati da una fonte di dati remota; riformatta i dati; e lo invia all'utente.
*    [ Pull Tecnologia](https://en.wikipedia.org/wiki/Pull_technology) : ERDDAP™ ha anche la capacità di ottenere attivamente tutti i dati disponibili da una fonte di dati remota e [memorizzare una copia locale dei dati](/docs/server-admin/datasets#eddgridcopy) .
*    [ Push Tecnologia](https://en.wikipedia.org/wiki/Push_technology) : Usando ERDDAP ' [servizi di abbonamento](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions) , altri server di dati possono essere notificati non appena sono disponibili nuovi dati in modo che possano richiedere i dati (tirando i dati) .
*    ERDDAP ' [ EDDGrid Da Erddap](/docs/server-admin/datasets#eddfromerddap) e [EDDTableFromErddap](/docs/server-admin/datasets#eddfromerddap) uso ERDDAP Servizi di abbonamento e [sistema di segnalazione](#flag) in modo che venga notificata immediatamente quando saranno disponibili nuovi dati.
* È possibile combinare questi a grande effetto: se si avvolge un EDDGrid Copia intorno a un EDDGrid Dal set di dati di Erddap (o avvolgere un EDDTableCopy intorno a un set di dati EDDTableFromErddap) ♪ ERDDAP™ creerà automaticamente e manterrà una copia locale di un altro ERDDAP E' dataset.
* Poiché i servizi di abbonamento funzionano non appena sono disponibili nuovi dati, la tecnologia push diffonde i dati molto rapidamente (in pochi secondi) .

Questa architettura mette ciascuno ERDDAP™ amministratore incaricato di determinare dove i dati per il ERDDAP™ viene da.

* Altri ERDDAP™ gli amministratori possono fare lo stesso. Non c'è bisogno di coordinamento tra gli amministratori.
* Se molti ERDDAP™ gli amministratori si collegano a vicenda ERDDAP s, si forma una rete di distribuzione dei dati.
* I dati saranno rapidamente, in modo efficiente e automaticamente diffusi da fonti di dati ( ERDDAP s e altri server) ai siti di ridistribuzione dei dati ( ERDDAP #) ovunque nella rete.
* Un dato ERDDAP™ può essere sia una fonte di dati per alcuni set di dati e un sito di ridistribuzione per altri set di dati.
* La rete risultante è approssimativamente simile alle reti di distribuzione dei dati configurate con programmi come [ Unidata IDD/IDM](https://www.unidata.ucar.edu/projects/index.html#idd) , ma meno rigidamente strutturato.
         
### Sicurezza, autenticazione e autorizzazione{#security-authentication-and-authorization} 
Per impostazione predefinita, ERDDAP™ funziona come un server completamente pubblico (usando http e/o https ) senza login ( [autenticazione](https://en.wikipedia.org/wiki/Authentication) ) sistema e nessuna restrizione all'accesso dei dati ( [autorizzazione](https://en.wikipedia.org/wiki/Authorization) ) .

#### Sicurezza{#security} 
Se si desidera limitare l'accesso ad alcuni o a tutti i set di dati ad alcuni utenti, è possibile utilizzare ERDDAP Il sistema di sicurezza integrato. Quando il sistema di sicurezza è in uso:

*    ERDDAP™ usi [controllo di accesso basato sul ruolo](https://en.wikipedia.org/wiki/Role-based_access_control) .
    * The ERDDAP™ l'amministratore definisce gli utenti con il [&lt;) (/docs/server-admin/datasets#user) tag in datasets.xml . Ogni utente ha un nome utente, una password (se l'autenticazione=custom) , e uno o più ruoli.
    * The ERDDAP™ l'amministratore definisce quali ruoli hanno accesso a un dato set di dati tramite il [&lt;Per saperne di più (/docs/server-admin/datasets#accessibleto) tag in datasets.xml per qualsiasi dataset che non dovrebbe avere accesso pubblico.
* Stato di login dell'utente (e un link per accedere/e) sarà mostrato nella parte superiore di ogni pagina web. (Ma un utente connesso apparirà ERDDAP™ per non essere registrato se usa un http URL.) 
* Se&lt;baseUrl&gt; che si specifica nella configurazione.xml è un ** http ** URL, gli utenti che non sono registrati possono utilizzare ERDDAP ' ** http ** URLs. Se&lt;baseHttpsUrl&gt; è anche specificato, gli utenti che non sono connessi possono anche utilizzare https URLs.
* HTTPS Only -- Se&lt;baseUrl&gt; che si specifica nella configurazione.xml è un ** https ** URL, gli utenti che non sono registrati sono incoraggiati (non forzato) da usare ERDDAP ' ** https ** URLs -- tutti i link su ERDDAP™ pagine web si riferiscono a https URLs.
    
Se si desidera costringere gli utenti a utilizzare https URL, aggiungere una linea permanente Redirect all'interno&lt;VirtualHost \\*:80&gt; sezione nel file di configurazione di Apache (di solito http d.conf) Per esempio,
    
```
    <VirtualHost \\*:80>
        \\[...\\]
        ServerName example.com
        Redirect permanent / https://example.com/
    </VirtualHost>
```

Se si desidera, c'è un metodo aggiuntivo per forzare l'uso di https:   [HTTP Strict Sicurezza dei trasporti (HSTS) ](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security) . Per usarlo:
    
    1. Abilitare il Apache Headers Module: a2enmod headers
    2. Aggiungi l'intestazione aggiuntiva alla direttiva HTTPS VirtualHost. La massima età è misurata in secondi e può essere impostata su un valore lungo.
        
```
        <VirtualHost \\*:443>
            # Guarantee HTTPS for 1 Year including Sub Domains 
            Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
```
    
Si prega di notare che questa intestazione è valida solo su un HTTPS VirtualHost.
    
Un motivo per non costringere gli utenti a utilizzare https URLs è: il link SSL/TLS sottostante richiede tempo per stabilire e quindi richiede tempo per crittografare e decifrare tutte le informazioni trasmesse tra l'utente e il server. Ma alcune istituzioni richiedono https Solo.
    
* Utenti che hanno effettuato l'accesso ERDDAP ' ** https ** URLs. Se usano http URLs, sembrano ERDDAP™ per non essere connesso. Questo garantisce la privacy delle comunicazioni e aiuta a prevenire [sessione dirottamento e sidejacking](https://en.wikipedia.org/wiki/Session_hijacking) .
* Chiunque non sia connesso può accedere e utilizzare i dataset pubblici. Per impostazione predefinita, i set di dati privati non appaiono nelle liste dei set di dati se un utente non è connesso. Se l'amministratore ha impostato setup.xml's&lt;listPrivateDatasets&gt; a true, appariranno. I tentativi di richiedere dati da dataset privati (se l'utente conosce l'URL) verrà reindirizzato alla pagina di login.
* Chiunque abbia effettuato l'accesso sarà in grado di vedere e richiedere i dati da qualsiasi dataset pubblico e da qualsiasi dataset privato a cui il loro ruolo consente di accedere. Per impostazione predefinita, i dati privati a cui un utente non ha accesso non appaiono nelle liste dei set di dati. Se l'amministratore ha impostato setup.xml's&lt;listPrivateDatasets&gt; a true, appariranno. I tentativi di richiedere dati da dataset privati a cui l'utente non ha accesso verranno reindirizzati alla pagina di login.
* The RSS informazioni per set di dati privati è disponibile solo per gli utenti (e RSS lettori) che sono connessi e autorizzati a utilizzare quel dataset. Questo fa RSS non molto utile per set di dati completamente privati.
    
Se un dataset è privato, ma il suo [&lt;grafiAccessibleTo&gt;] (/docs/server-admin/datasets#graphsaccessibleto) è impostato al pubblico, il set di dati RSS è accessibile a chiunque.
    
* Gli abbonamenti e-mail possono essere impostati solo quando un utente ha accesso a un set di dati. Se un utente si iscrive a un dataset privato, l'abbonamento continua a funzionare dopo che l'utente ha effettuato l'accesso.

##### Impostazione sicurezza{#setup-security} 
Per configurare il sistema di sicurezza/autorizzazione/autorizzazione:

* Fare lo standard ERDDAP™   [configurazione iniziale](/docs/server-admin/deploy-install) .
* In [setup.xml](/docs/server-admin/deploy-install#setupxml) ♪
    * Aggiungi / cambia&lt;autenticazione &gt; valore da nulla a personalizzato (non usare questo) , email (non usare questo) , Google (raccomandato) , orcido (raccomandato) , oauth2 (che è google+orcid, consigliato) . Vedi i commenti su queste opzioni qui sotto.
    * Aggiungi / cambia&lt;valore baseHttpsUrl&gt;.
    * Inserire/scommettere &loginInfo; in&lt;startBodyHtml&gt; per visualizzare le informazioni di accesso/out dell'utente nella parte superiore di ogni pagina web.
* Per scopi di test sul tuo personal computer, [seguire queste istruzioni per configurare tomcat per supportare SSL](https://tomcat.apache.org/tomcat-8.0-doc/ssl-howto.html)   (la base per https connessioni) creando una libreria con un [certificato autofirmato](https://en.wikipedia.org/wiki/Self-signed_certificate) e modificando *tomcat* /conf/server.xml per sbloccare il connettore per la porta 8443. Su Windows, potrebbe essere necessario spostare .keystore da "c:\\Users\\\ *Tu sei* \\.keystore" a "c:\\\\Users\\\\Default User\\\.keystore" o "c:\\\.keystore" (vedi *tomcat* /logs/catalina. *oggi* .log se l'applicazione non si carica o gli utenti non possono vedere il registro nella pagina) . È possibile vedere quando il certificato .keystore scade esaminando il certificato quando si accede.
    
Per un server pubblicamente accessibile, invece di utilizzare un certificato autofirmato, si raccomanda vivamente di acquistare e installare un certificato firmato da un [autorità di certificazione](https://en.wikipedia.org/wiki/Certificate_authority) , perché dà ai vostri clienti più garanzia che sono effettivamente di collegamento con il vostro ERDDAP™ , non la versione di un uomo nel mezzo della tua ERDDAP . Molti fornitori vendono certificati digitali. (Ricerca per web.) Non sono costosi.
    
* Su computer Linux, se Tomcat è in esecuzione in Apache, modificare il /etc/ http d/conf.d/ssl.conf file per consentire il traffico HTTPS da/per ERDDAP™ senza richiedere il numero di porta:8443 nell'URL:
    1. Modificare l'esistente&lt;VirtualHost&gt; tag (se c'è uno) , o aggiungerne uno alla fine del file in modo che abbia almeno queste righe:
```
        <VirtualHost \\_default\\_:443>
            SSLEngine on
            SSLProxyEngine On
            ProxyPass /erddap http://localhost:8443/erddap
            ProxyPassReverse /erddap http://localhost:8443/erddap
        </VirtualHost>
```

    2. Poi riavvia Apache: /usr/sbin/apachectl -k graziosa (ma a volte è in una directory diversa) .
* In *tomcat* /conf/server.xml, uncomment the port=8443&lt;Connettore&gt; tag:
```
    <Connector port="8443" 
        protocol="org.apache.coyote.http11.Http11NioProtocol"
        maxThreads="150" SSLEnabled="true">
        <SSLHostConfig>
        <Certificate certificateKeystoreFile="conf/localhost-rsa.jks" 
            type="RSA" />
        </SSLHostConfig>
    </Connector>
```
e modificare la posizione del certificatoKeystoreFile.
##### Autorizzazione{#authorization} 
*    [In datasets.xml , creare un](#authorization) [&lt;) (/docs/server-admin/datasets#user) tag per ogni utente con nome utente, password (se l'autorizzazione=custom) , e ruoli di informazione. Questa è la parte di autorizzazione ERDDAP Il sistema di sicurezza.
     
* In datasets.xml ♪&lt;Per saperne di più (/docs/server-admin/datasets#accessibleto) tag a ogni dataset che non dovrebbe avere accesso pubblico.&lt;accessTo&gt; consente di specificare quali ruoli hanno accesso a tale dataset.
     
* Riavvia Tomcat. Problemi? Controlla i registri di Tomcat.
     
* Controlla il tuo lavoro&#33; Qualsiasi errore potrebbe portare a un difetto di sicurezza.
     
* Controlla che la pagina di login utilizzi https   (non http ) . I tentativi di accedere via http dovrebbe essere reindirizzato automaticamente a https e porto 8443 (anche se il numero di porta può essere nascosto tramite un proxy Apache) . Potrebbe essere necessario lavorare con l'amministratore di rete per consentire alle richieste web esterne di accedere alla porta 8443 sul server.
     
* Puoi cambiare&lt;&gt; e&lt;accessTo&gt; tags in qualsiasi momento. Le modifiche saranno applicate al successivo carico regolare di qualsiasi dataset, o ASAP se si utilizza un [bandiera](#flag) .

##### Autenticazione{#authentication} 
 [ **Autenticazione (per il trasporto) ** ](#authentication)   
Se non si desidera consentire agli utenti di accedere, non specificare un valore per&lt;autenticazione &gt; in setup.xml.
Se si desidera consentire agli utenti di accedere, è necessario specificare un valore per&lt;autenticazione&gt;. Attualmente, ERDDAP™ Supporti
 [personalizzato](#custom)   (non usare questo) ♪
 [email](#email)   (non usare questo) ♪
 [Google](#google)   (raccomandato) ♪
 [Decisione n.](#orcid)   (raccomandato) e
 [Oauth2](#oauth2)   (raccomandato) per il metodo di autenticazione.
Se si desidera abilitare l'accesso, si consiglia vivamente le opzioni di google, orcid o oauth2 perché si libera di memorizzare e gestire le password dell'utente (necessario per personalizzato) e sono più sicuri dell'opzione email. Ricorda che gli utenti spesso utilizzano la stessa password in diversi siti. Quindi possono usare la stessa password per la tua ERDDAP™ come fanno alla loro banca. Ciò rende la loro password molto preziosa -- molto più prezioso per l'utente che solo i dati che stanno richiedendo. Quindi è necessario fare il più possibile per mantenere le password private. E' una grande responsabilita'. Le opzioni e-mail, google, orcid e oauth2 si prendono cura delle password, in modo da non dover raccogliere, memorizzare, o lavorare con loro. Quindi siete liberati da questa responsabilità.

Tutti&lt;opzioni di autenticazione &gt; utilizzare [cookie](https://en.wikipedia.org/wiki/HTTP_cookie) sul computer dell'utente, quindi il browser dell'utente deve essere impostato per consentire i cookie. Se un utente sta facendo ERDDAP™ richieste da un programma di computer (non un browser) , i cookie e l'autenticazione sono difficili da lavorare. Questo è un problema comune con tutti i sistemi di autenticazione. Scusa.

I dettagli del&lt;autenticazione le opzioni sono:

###### Personale{#custom} 
personalizzato è ERDDAP 's sistema personalizzato per consentire agli utenti di accedere inserendo il loro nome utente e password in un modulo su una pagina web. Se un utente tenta e non riesce a registrare in 3 volte entro 10 minuti, l'utente è bloccato dal tentativo di accedere per 10 minuti. Questo impedisce agli hacker di semplicemente provare milioni di password fino a trovare quello giusto.

Questo è un po' sicuro perché il nome utente e la password vengono trasmessi tramite https   (non http ) , ma l'autenticazione=google, orcid, oauth2 sono migliori perché ti liberano dal dover gestire le password. L'approccio personalizzato richiede di raccogliere il nome di un utente e un hash digest della loro password (usare il telefono&#33; email non è sicuro&#33;) e conservarli in datasets.xml #&lt;) (/docs/server-admin/datasets#user) tags.

Con l'opzione personalizzata, nessuno può accedere fino a quando non si (il ERDDAP™ amministratore) creare un&lt;user&gt; tag per l'utente, specificando il nome dell'utente come nome utente, l'hash digest della password come password e i loro ruoli.

Non consigliato
A causa della goffazza di generare e trasmettere l'hash digest della password dell'utente e a causa dei rischi associati ERDDAP™ tenere i digestori hash delle password, questa opzione non è raccomandata.

Per aumentare la sicurezza di questa opzione:

* È necessario assicurarsi che altri utenti sul server (cioè, utenti Linux, non ERDDAP™ utenti) non può leggere i file nella directory Tomcat (soprattutto il datasets.xml file&#33;) o ERDDAP E' la grande Direttoria dei Soldi.
Su Linux, come user=tomcat, usare:
chmod -R g-rwx *BigParentDirectory*   
chmod -R o-rwx *BigParentDirectory*   
chmod -R g-rwx *Direttive*   
chmod -R o-rwx *Direttive*   
     
* Utilizzare UEPSHA256 per&lt;passwordEncoding&gt; in setup.xml.
     
* Utilizzare un metodo as-secure-as-possible per passare l'hash digest della password dell'utente dall'utente al ERDDAP™ amministratore (telefono?) .
         
###### email{#email} 
L'opzione di autenticazione e-mail utilizza un account e-mail dell'utente per autenticare l'utente (inviando loro una email con un link speciale che devono accedere per accedere) . A differenza di altre email che ERDDAP™ mandati, ERDDAP™ non scrive queste email di invito al file di registro e-mail perché contengono informazioni riservate.
In teoria, questo non è molto sicuro, perché le e-mail non sono sempre crittografate, quindi un cattivo ragazzo con la capacità di intercettare e-mail potrebbe abusare di questo sistema utilizzando un indirizzo email di un utente valido e intercettando l'e-mail di invito.
In pratica, se si imposta ERDDAP™ utilizzare un account e-mail di Google per inviare e-mail, e se si imposta per utilizzare una delle opzioni TLS per la connessione, e se l'utente ha un account e-mail di Google, questo è un po ' sicuro perché le e-mail sono crittografate fino a tutto il percorso ERDDAP™ all'utente.

Per aumentare la sicurezza di questa opzione:

* Assicurarsi che altri utenti sul server (cioè, utenti Linux, non ERDDAP™ utenti) non può leggere i file nella directory Tomcat o ERDDAP E' la grande Direttoria dei Soldi.
Su Linux, come user=tomcat, usare:
chmod -R g-rwx *BigParentDirectory*   
chmod -R o-rwx *BigParentDirectory*   
chmod -R g-rwx *Direttive*   
chmod -R o-rwx *Direttive*   
     
* Impostare le cose per ottenere la sicurezza end-to-end per le e-mail inviate da ERDDAP™ agli utenti. Ad esempio, si potrebbe fare un sistema Google-centric solo creando&lt;tag utente&gt; per indirizzi email gestiti da Google e impostando il tuo ERDDAP™ per utilizzare un server di posta elettronica di Google tramite una connessione sicura/TLS: nel vostro setup.xml, utilizzare ad esempio,
```
    <emailSmtpHost>smtp.gmail.com</emailSmtpHost>  
    <emailSmtpPort>587</emailSmtpPort>  
    <emailProperties>mail.smtp.starttls.enable|true</emailProperties>
```

Non consigliato
L'opzione di autenticazione e-mail non è raccomandata. Si prega di utilizzare il google, orcid, oauth2 opzione invece.

Come con le opzioni di google, orcid e oauth2, e-mail è molto conveniente per ERDDAP™ amministratori -- non è mai necessario trattare con password o i loro hash digestivi. Tutto quello che dovete creare è un [&lt;) (/docs/server-admin/datasets#user) tag per un utente in datasets.xml è l'indirizzo e-mail dell'utente, che ERDDAP™ utilizza come nome dell'utente. (L'attributo password non viene utilizzato quando l'autenticazione=email, google, orcid o oauth2.) 

Con l'opzione email, solo gli utenti che hanno una&lt;tag utente&gt; datasets.xml può cercare di accedere a ERDDAP™ fornendo il loro indirizzo email e cliccando sul link nell'e-mail che ERDDAP™ Li manda.

 ERDDAP™ tratta gli indirizzi e-mail come caso-insensibile. Lo fa convertendo gli indirizzi email che inserisci (in&lt;user&gt; tags) o gli utenti entrano (sul modulo di login) alla loro versione minuscola.

Per impostare l'autenticazione=email:

1. Nel tuo setup.xml, cambia il&lt;valore del tag baseHttpsUrl&gt;.
Per sperimentare / lavorare sul tuo personal computer, utilizzare
    https://localhost:8443  
Per il tuo pubblico ERDDAP™ , uso
    https://*your.domain.org*:8443  
o senza:8443 se si utilizza un Apache [proxypass](/docs/server-admin/deploy-install#proxypass) in modo che il numero di porta non è necessario.
     
2. Nel tuo setup.xml, cambia il&lt;autenticazione valore del tag per e-mail:
```
    <authentication>email</authentication>  
```

3. Nel setup.xml, assicurarsi che il sistema e-mail sia impostato tramite tutti&lt;email...&gt; tags, in modo che ERDDAP™ può inviare e-mail. Se possibile, impostare questo per utilizzare una connessione sicura (SSL / TLS) al server di posta elettronica.
     
4. Nel tuo datasets.xml , creare [&lt;) (/docs/server-admin/datasets#user) tag per ogni utente che avrà accesso a dataset privati.
Utilizzare l'indirizzo email dell'utente come nome utente nel tag.
Non specificare l'attributo password nel tag utente.
     
5. Riavviare ERDDAP™ in modo che le modifiche a setup.xml e datasets.xml effetto.
         
###### Google, orcid, oauth2{#google-orcid-oauth2} 
*    [ **Google** ](#google) ♪ [ **Decisione n.** ](#orcid) e [ **Oauth2** ](#oauth2)    (raccomandato)   
Tutte e tre queste opzioni sono le consigliate ERDDAP™ opzioni di autenticazione. Sono tutte le opzioni più sicure. Le altre opzioni hanno una sicurezza significativamente più debole.
     
###### Google{#google} 
* L'opzione di autenticazione di Google utilizza [Firma In con Google](https://developers.google.com/identity/gsi/web/guides/overview) , che è un'attuazione della [Protocollo di autenticazione OAuth 2.0](https://oauth.net/2/) . ERDDAP™ gli utenti firmano nel loro account e-mail di Google, compresi gli account gestiti da Google come @noaa.gov conti. Questo permette ERDDAP™ per verificare l'identità dell'utente (nome e indirizzo email) e accedere alla loro immagine profilo, ma non dà ERDDAP™ accesso alle loro email, al loro Google Drive, o a qualsiasi altra informazione privata.
    
Per ERDDAP™ V2.22 e seguenti, ERDDAP™ usato "Google Sign-In". Google dice che il sistema è deprecato dopo il 31 marzo 2023. Se non l'hai già fatto, si prega di passare a ERDDAP™ v2.23+ per utilizzare il nuovo sistema di autenticazione basato su "Sign In with Google".
    
Per ERDDAP™ v2.23 istanze con una funzionalità di contenuto configurata e utilizzando l'autenticazione di Google, è necessario aggiungerehttps://accounts.google.comall'elenco di script-src consentiti (o script-src-elem) . ERDDAP™ non utilizza piùhttps://apis.google.com, quindi se avete questo permesso, si può essere in grado di rimuoverlo ora.
    
Per ERDDAP™ v2.24+ potrebbe anche essere necessario aggiungerehttps://accounts.google.com/gsi/stylea stlye-src ehttps://accounts.google.com/gsi/per collegare-src. Per lo script-src è ora possibile utilizzarehttps://accounts.google.com/gsi/client.
    
Per ulteriori informazioni potete andare al [Pagina di Google](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#content_security_policy) sulla configurazione CSP. Se avete domande, contattare chris.john a noaa.gov.
         
###### Orcid{#orcid} 
* L'opzione di autenticazione orcid utilizza [Autenticazione Orcid](https://members.orcid.org/api/integrate/orcid-sign-in) , che è un'attuazione della [Protocollo di autenticazione OAuth 2.0](https://oauth.net/2/) . ERDDAP™ gli utenti firmano [Conto ordinario](https://members.orcid.org/api/integrate/orcid-sign-in) , che è comunemente usato dai ricercatori per identificarsi. Questo permette ERDDAP™ per verificare l'identità Orcid dell'utente e ottenere il loro numero di account Orcid, ma non dà ERDDAP™ accesso alle altre informazioni sul loro account Orcid.

###### Oauth2{#oauth2} 
* L'opzione oauth2 consente agli utenti di accedere con il loro account Google o il loro account Orcid.

Le opzioni di google, orcid e oauth2 sono i successori dell'opzione openid, che è stato interrotto dopo ERDDAP™ versione 1.68, e che si basava su una versione aperta Identita' che ora e' fuori moda. Si prega di passare al google, orcid, oauth2 opzione.

Queste opzioni sono molto convenienti per ERDDAP™ amministratori -- non è mai necessario trattare con password o i loro hash digestivi. Tutto quello che dovete creare è un [&lt;) (/docs/server-admin/datasets#user) tag per un utente in datasets.xml che specifica l'indirizzo email di Google dell'utente o il numero di account Orcid come attributo del nome utente. (L'attributo password non viene utilizzato quando l'autenticazione=email, google, orcid o oauth2.) 

Con queste opzioni, chiunque può accedere a ERDDAP™ firmando nel loro account di posta elettronica Google o account Orcid, ma nessuno avrà il diritto di accedere a set di dati privati fino a quando non si (il ERDDAP™ amministratore) creare un&lt;user&gt; tag, specificando il loro indirizzo email di Google o il numero di account Orcid come nome utente e specificando i loro ruoli.

 ERDDAP™ tratta gli indirizzi e-mail come caso-insensibile. Lo fa convertendo gli indirizzi email che inserisci (in&lt;user&gt; tags) o gli utenti entrano (sul modulo di login) alla loro versione minuscola.

Per impostare l'autenticazione di google, orcid o oauth2:

* Nel tuo setup.xml, cambia il&lt;valore del tag baseHttpsUrl&gt;.
Per sperimentare / lavorare sul tuo personal computer, utilizzare
    https://localhost:8443  
Per il tuo pubblico ERDDAP™ , uso
    https://*your.domain.org*:8443  
o, meglio, senza il :8443 se si utilizza un Apache [proxypass](/docs/server-admin/deploy-install#proxypass) in modo che il numero di porta non è necessario.
     
* Nel tuo setup.xml, cambia il&lt;autenticazione il valore del tag su google, orcid, oauth2, per esempio:
```
    <authentication>oauth2</authentication>  
```
###### Impostazione di Google{#google-setup} 
* Per le opzioni di Google e Oauth2:
Seguire le istruzioni qui sotto per impostare l'autenticazione di Google per il tuo ERDDAP .
     
    1. Se non hai un account e-mail di Google, [creare uno](https://www.google.com/intl/en_us/mail/help/about.html)   
         
    2. Seguici [queste istruzioni](https://developers.google.com/identity/sign-in/web/devconsole-project) per creare un progetto di Google Developers Console e ottenere un ID client.
        
Quando il modulo di Google chiede l'autorizzazione Java Origini dello script, inserisci il valore da&lt;baseHttpsUrl&gt; dal vostro personal computer ERDDAP™ setup.xml, ad esempio,
        https://localhost:8443  
Su una seconda riga, aggiungere il&lt;baseHttpsUrl&gt; dal tuo pubblico ERDDAP™ setup.xml, ad esempio,
        https://*your.domain.org*:8443
        
Non specificare eventuali URI ridiretti autorizzati.
        
Quando vedi il tuo ID cliente per questo progetto, copia e incollalo nel tuo setup.xml (di solito appena sotto&lt;autenticazione &gt; per essere ordinato, ma il posizionamento non importa realmente), nel&lt;GoogleClientID&gt; tag, ad esempio,
        &lt;GoogleClientID&gt; *il tuo cliente* &lt;&gt;
L'ID client sarà una stringa di circa 75 caratteri, probabilmente a partire da diverse cifre e termina con .apps.googleusercontent.com .
         
        
    3. Nel tuo datasets.xml , creare un [&lt;) (/docs/server-admin/datasets#user) tag per ogni utente che avrà accesso a dataset privati. Per l'attributo del nome utente nel tag:
        
        * Per gli utenti che si iscriveranno con Google, utilizzare l'indirizzo email di Google dell'utente.
        * Per gli utenti che si iscriveranno con orcid, utilizzare il numero di account Orcid dell'utente (con trattini) .
        
Non specificare l'attributo password per il tag utente.
         
    4. Riavviare ERDDAP™ in modo che le modifiche a setup.xml e datasets.xml effetto.
         
###### Configurazione Orcid{#orcid-setup} 
* Per le opzioni di orcid e oauth2:
Segui le istruzioni qui sotto per impostare l'autenticazione Orcid per la tua ERDDAP .
     (Per i dettagli, vedere [Documentazione API di autenticazione di Orcid](https://members.orcid.org/api/integrate/orcid-sign-in) .)   
     
    1. Se non hai un account Orcid, [creare uno](https://orcid.org/signin)   
         
    2. Accedi a Orcid [https://orcid.org/signin](https://orcid.org/signin) utilizzando il tuo account Orcid personale.
         
    3. Clicca su "Strumenti di sviluppo" (sotto "Per i ricercatori" in alto) .
         
    4. Clicca su "Register for the free ORCID public API". Inserisci queste informazioni:
Nome: ERDDAP™ a \\[ la tua organizzazione \\]   
Sito web: \\[ il tuo ERDDAP dominio \\]   
Descrizione: ERDDAP™ è un server di dati scientifico. Gli utenti devono autenticarsi con Google o Orcid per accedere a dataset non pubblici.
Redirect URI: \\[ il tuo ERDDAP dominio \\] /erddap/loginOrcid.html
         
    5. Clicca sull'icona Salva (Sembra un disco da 3,5"&#33;) .
Puoi quindi vedere il tuo ID client ORCID APP e ORCID Client Secret.
         
    6. Copia e incolla l'ID client ORCID APP (che inizierà con "APP-") in setup.xml in&lt;orcidClientID&gt; tag, ad esempio,
```
        <orcidClientID>APP-*ALPHANUMERICCHARACTERS*</orcidClientID>
```
    7. Copia e incolla il segreto del cliente ORCID (caratteri alfa-numerici minuscoli con trattini) in setup.xml in&lt;orcidClientSecret&gt; tag, ad esempio,
```
        <orcidClientSecret>*alpha-numeric-characters-with-dashes*</orcidClientSecret>
```

    8. Nel tuo datasets.xml , creare un [&lt;) (/docs/server-admin/datasets#user) tag per ogni utente che avrà accesso a dataset privati. Per l'attributo del nome utente nel tag:
        
        * Per gli utenti che si iscriveranno con Google, utilizzare l'indirizzo email di Google dell'utente.
        * Per gli utenti che si iscriveranno con orcid, utilizzare il numero di account Orcid dell'utente (con trattini) .
        
Non specificare l'attributo password per il tag utente.
         
    9. Riavviare ERDDAP™ in modo che le modifiche a setup.xml e datasets.xml effetto.
             

###### Accedi in modo diverso{#log-in-either-way} 
Se si utilizzano le opzioni di autenticazione google, orcid o oauth2, e Google Sign-In o Orcid's Authentication API cessa improvvisamente di lavorare (per qualsiasi ragione) o cessa di lavorare come ERDDAP™ si aspetta, gli utenti non saranno in grado di accedere al ERDDAP . Come temporaneo (o permanente) soluzione, è possibile chiedere agli utenti di registrarsi con l'altro sistema (ottenere un account e-mail di Google, o ottenere un account Orcid) . Per fare questo:

1. Cambiare&lt;autenticazione&gt; tag in modo che consenta l'altro sistema di autenticazione. L'opzione oauth2 consente agli utenti di accedere con entrambi i sistemi.
2. Duplicare ciascuno dei&lt;user&gt; tags e modificare l'attributo nome utente dall'indirizzo e-mail di Google al corrispondente numero di account Orcid (o viceversa) , ma mantenere i ruoli attribuire lo stesso.

###### OpenId{#openid} 
 ERDDAP™ non supporta più l'opzione di autenticazione openid, basata su una versione aperta Identita' che ora e' fuori moda. Si prega di utilizzare le opzioni Google, orcid, oauth2 invece.

###### BASE{#basic} 
 ERDDAP™ non supporta l'autenticazione BASIC perché:
* BASIC sembra orientato verso le pagine web predefinite che necessitano di un accesso sicuro o di una coperta all'intero sito, ma ERDDAP™ consente (accesso limitato) set di dati da aggiungere on-the-fly.
* L'autenticazione BASIC non offre agli utenti un modo per uscire&#33;
* L'autenticazione BASIC è nota per non essere sicura.

##### Fonti di dati sicure{#secure-data-sources} 
Se un insieme di dati è quello di avere accesso limitato ERDDAP™ utenti, la fonte di dati (da dove ERDDAP™ ottiene i dati) non dovrebbe essere pubblicamente accessibile. Così come può ERDDAP™ ottenere i dati per i dataset di accesso limitato? Alcune opzioni sono:

*    ERDDAP™ può servire i dati dai file locali (per esempio, via EDDTable Da Fili o EDDGrid Da Fili) .
     
*    ERDDAP™ può essere in un [DMZ](https://en.wikipedia.org/wiki/Demilitarized_zone_(computing) ) e la fonte di dati (ad esempio, un OPeNDAP server o un database) può essere dietro [firewall](https://en.wikipedia.org/wiki/Firewall) , dove è accessibile ERDDAP™ ma non al pubblico.
     
* La fonte di dati può essere su un sito web pubblico, ma richiedono un login per ottenere i dati. I due tipi di dataset che ERDDAP™ può accedere all'accesso [EDDTableDatabase](/docs/server-admin/datasets#eddtablefromdatabase) e [EDDTable FromCassandra](/docs/server-admin/datasets#eddtablefromcassandra) . Questi set di dati supportano (e dovrebbe sempre usare) nomi utente (creare un ERDDAP™ utente che ha solo privilegi di sola lettura) , password, connessioni SSL e altre misure di sicurezza.
    
Ma in generale, attualmente, ERDDAP™ non può trattare con queste fonti di dati perché non ha disposizioni per l'accesso alla fonte di dati. Questo è il motivo per cui l'accesso [ EDDGrid Da Erddap e EDDTable Da Erddap](/docs/server-admin/datasets#eddfromerddap) i set di dati non possono essere limitati. Attualmente, il locale ERDDAP™ non ha modo di accedere e accedere alle informazioni dei metadati dal telecomando ERDDAP . E mettere il "remoto" ERDDAP™ dietro il tuo firewall e rimuovendo il dataset accessibile A restrizioni non risolve il problema: da richieste dell'utente per EDDXxx I dati di FromErddap devono essere reindirizzati al telecomando ERDDAP™ , il telecomando ERDDAP™ deve essere accessibile.
    
#### Difesa contro gli hacker{#defenses-against-hackers} 
Ci sono hacker cattivi che cercano di sfruttare le debolezze di sicurezza nel software del server come ERDDAP . ERDDAP™ segue il consiglio di sicurezza comune per avere diversi strati di difese:

* Privilegi limitati -- Una delle difese più importanti è quella di eseguire Tomcat tramite un utente chiamato tomcat che non ha una password (in modo che nessuno possa accedere come utente) e ha privilegi di file system limitati (ad esempio, accesso di sola lettura ai dati) . Vedi ERDDAP 's istruzioni per [creazione di tomcat](/docs/server-admin/deploy-install#tomcat) .
* Uso pesante - In generale, ERDDAP™ è costruito per uso pesante, anche da script che fanno decine di migliaia di richieste, uno dopo l'altro. È difficile per ERDDAP™ per aprirsi simultaneamente fino a un uso legittimo pesante e proteggersi da abusi. A volte è difficile differenziare l'uso legittimo pesante, l'uso legittimo eccessivo e illegittimo (e a volte è davvero facile) . Tra le altre difese, ERDDAP™ Consapevolmente non consente ad una sola richiesta di utilizzare una frazione inordinata delle risorse del sistema (a meno che il sistema non sia altrimenti attivo) .
* Identificare utenti problematici - Se ERDDAP™ sta rallentando o congelando (forse perché un utente ingenuo o un robot è in esecuzione di più script per presentare più richieste simultaneamente o forse a causa di un cattivo ragazzo [Denial-of-service](https://en.wikipedia.org/wiki/Denial-of-service_attack) attacco) # Puoi guardare # [E-mail del rapporto giornaliero](#daily-report)   (e più frequenti informazioni identiche [ ERDDAP™ file di log](#log) ) che visualizza il numero di richieste effettuate dagli utenti più attivi (vedi "Indirizzo IP del Richiedente (Ammessi) ") . ERDDAP™ invia anche email all'amministratore ogni volta che c'è ["Attività insolita: &gt;25% delle richieste fallite"](#failed-requests) . Si può quindi guardare in ERDDAP™ log file per vedere la natura delle loro richieste. Se sentite che qualcuno sta facendo troppe richieste, richieste bizzarre (Non crederesti a cio' che ho visto, beh, forse...) , o richieste di tipo di attacco, è possibile aggiungere il loro indirizzo IP alla lista nera.
* Blacklist... È possibile aggiungere l'indirizzo IP di utenti problematici, bot e [Denial-of-service](https://en.wikipedia.org/wiki/Denial-of-service_attack) attaccanti al ERDDAP   [Lista nera](/docs/server-admin/datasets#requestblacklist) , affinché le future richieste da loro vengano respinte immediatamente. Questa impostazione è in datasets.xml in modo da poter aggiungere rapidamente un indirizzo IP all'elenco e quindi [bandiera](#flag) un dataset in modo che ERDDAP™ immediatamente nota e applica il cambiamento. Il messaggio di errore inviato agli utenti blacklist li incoraggia a contattare il ERDDAP™ amministratore se si sentono erroneamente messi sulla lista nera. (Nella nostra esperienza, diversi utenti non sono stati consapevoli che stavano eseguendo più script contemporaneamente, o che i loro script stavano facendo richieste di assurdità.) 
* Dataset Security - Alcuni tipi di set di dati (in particolare, EDDTableFromDatabase) presenti ulteriori rischi di sicurezza (ad esempio, SQL injection) e avere le proprie misure di sicurezza. Vedere le informazioni per tali tipi di set di dati in [Lavorare con il datasets.xml File](/docs/server-admin/datasets) , in particolare [EDDTableDatabase sicurezza](/docs/server-admin/datasets#database-security) .
* Controllo di sicurezza... Anche se NOAA La sicurezza informatica ha rifiutato le nostre richieste di scansioni per anni, ora controllano regolarmente la mia (Bob's)   ERDDAP™ installazione. Anche se le scansioni iniziali hanno trovato alcuni problemi che ho poi risolto, le scansioni successive non hanno trovato problemi con ERDDAP . Le scansioni si preoccupano di un sacco di cose: in particolare, dal tabledap richieste sembrano richieste SQL, si preoccupano di vulnerabilità SQL injection. Ma queste preoccupazioni sono infondate perché ERDDAP™ sempre analizza e convalida le query e poi costruisce separatamente la query SQL in un modo che evita le vulnerabilità di iniezione. L'altra cosa di cui a volte si lamentano è che la nostra Java versione o Tomcat versioni non sono aggiornate come vogliono, quindi li aggiorniamo in risposta. In precedenza mi sono offerto di mostrare alla gente i rapporti di sicurezza, ma ora mi viene detto che non posso farlo.

#### Domande? Suggerimenti?{#questions-suggestions} 
Se avete domande su ERDDAP 's sistema di sicurezza o avere domande, dubbi, preoccupazioni, o suggerimenti su come è istituito, vedere il nostro [sezione per ottenere supporto aggiuntivo](/docs/intro#support) .
    

## Cose che non devi sapere{#things-you-dont-need-to-know} 

Questi sono i dettagli che non è necessario sapere fino a quando non sorge un bisogno.

### Secondo ERDDAP™  {#second-erddap} 
*    **Impostare un secondo ERDDAP™ per Test/Sviluppo**   
Se vuoi farlo, ci sono due approcci:
    *    (Migliore) Installare Tomcat e ERDDAP™ su un computer diverso dal computer che ha il tuo pubblico ERDDAP . Se utilizzi il tuo personal computer:
        1. Fare l'installazione un passo alla volta. Alza Tomcat e corre prima.
Quando Tomcat è in esecuzione, il Tomcat Manager dovrebbe essere in
             [http://127.0.0.1:8080/manager/html/](http://127.0.0.1:8080/manager/html/)   (o forse [http://localhost:8080/manager/html/](http://localhost:8080/manager/html/) ) 
        2. Installazione ERDDAP .
        3. Non utilizzare ProxyPass per eliminare il numero di porta dal ERDDAP™ URL.
        4. In [setup.xml](/docs/server-admin/deploy-install#setupxml) , set baseUrl tohttp://127.0.0.1:8080
        5. Dopo aver iniziato questo ERDDAP™ , dovresti essere in grado di vederlo
             [http://127.0.0.1:8080/erddap/status.html](http://127.0.0.1:8080/erddap/status.html)   (o forse [http://localhost:8080/erddap/status.html](http://localhost:8080/erddap/status.html) ) 
#### Secondo Tomcat{#second-tomcat} 
*    (Seconda cosa) Installare un altro Tomcat sullo stesso computer del pubblico ERDDAP .
    1. Fare l'installazione un passo alla volta. Alza Tomcat e corre prima.
Modificare tutti i numeri di porta associati al secondo Tomcat (per esempio, cambio 8080 a 8081)   (vedi il [Tomcat multipli Sezione delle istanze](https://tomcat.apache.org/tomcat-8.0-doc/RUNNING.txt) a metà del documento) .
    2. Installazione ERDDAP™ nel nuovo Tomcat.
    3. Non utilizzare ProxyPass per eliminare il numero di porta dal ERDDAP™ URL.
    4. In [setup.xml](/docs/server-admin/deploy-install#setupxml) , set baseUrl tohttp://www.*yourDomainName*:8081
    5. Dopo aver iniziato questo ERDDAP™ , dovresti essere in grado di vederlo
        http://www.*yourDomainName*:8081/erddap/status.html  
             
### Solid State Drives{#solid-state-drives} 
*    **Solid State Drives (SSD) sono grandi&#33;**   
Il modo più veloce, più semplice ed economico per accelerare ERDDAP 'l'accesso ai dati tabulari è quello di mettere i file di dati su un'unità di stato solido (SSD) . La maggior parte dei set di dati tabulari sono relativamente piccoli, quindi un SSD da 1 o 2 TB è probabilmente sufficiente per contenere tutti i file di dati per tutti i set di dati tabulari. SSD alla fine si consuma se si scrive i dati a una cella, eliminarlo, e scrivere nuovi dati a quella cella troppe volte. Quindi, se si utilizza il SSD per scrivere i dati una volta e leggerlo molte volte, anche un SSD di livello di consumo dovrebbe durare molto tempo, probabilmente molto più lungo di qualsiasi Hard Disk Drive (HDD) . SSD di livello di consumo sono ora a buon mercato (nel 2018, ~ $ 200 per 1 TB o ~ $400 per 2 TB) e i prezzi stanno ancora cadendo veloci. Quando ERDDAP™ accede a un file di dati, un SSD offre sia latenza più breve (~0.1ms, contro ~3ms per un HDD, contro ~10 (?) ms per un RAID, contro ~55ms per Amazon S3) e maggiore produttività (~500 MB/S, contro ~75 MB/s per un HDD, contro ~500 MB/s per un RAID) . Così si può ottenere una grande spinta prestazioni (fino a 10X contro un HDD) per 200 dollari&#33; Rispetto alla maggior parte delle altre possibili modifiche al sistema (un nuovo server per 10.000 dollari? un nuovo RAID per 35.000 dollari? un nuovo interruttore di rete per $5000? ecc.) , questo è di gran lunga il miglior ritorno sugli investimenti (ROI) . Se / quando il SSD muore (in 1, 2, ... 8 anni) Sostituiscilo. Non fare affidamento su di esso come per lungo termine, archiviazione dei dati, solo per la copia front-end dei dati. \\[ SSD sarebbe grande anche per i dati grigliati, ma la maggior parte dei set di dati grigliati sono molto più grandi, rendendo l'SSD molto costoso. \\] 
    
Se il server non è caricato di memoria, la memoria aggiuntiva per il server è anche un ottimo e relativamente economico modo per accelerare tutti gli aspetti ERDDAP .
     
    
###  [Carico pesante / vincoli](#heavy-loads--constraints)  **  {#heavy-loads--constraints} 
Con un uso pesante, un standalone ERDDAP™ può essere ostacolato da vari problemi. Per ulteriori informazioni, vedere il [elenco di vincoli e soluzioni](/docs/server-admin/scaling#heavy-loads--constraints) .
     
### Griglia, cluster e federazioni{#grids-clusters-and-federations} 
Sotto un uso molto pesante, un singolo standalone ERDDAP™ sarà eseguito in uno o più vincoli e anche le soluzioni suggerite saranno insufficienti. Per tali situazioni, ERDDAP™ ha caratteristiche che rendono facile la costruzione di griglie scalabili (anche chiamati cluster o federazioni) di ERDDAP s che permettono al sistema di gestire un uso molto pesante (ad esempio, per un grande data center) . Per ulteriori informazioni, vedere [griglie, cluster e federazioni ERDDAP #](/docs/server-admin/scaling) .
     
### Cloud Computing{#cloud-computing} 
Molte aziende stanno iniziando a offrire [servizi cloud computing](https://en.wikipedia.org/wiki/Cloud_computing)   (ad esempio, [Servizi web Amazon](https://aws.amazon.com/) ) . [Web hosting aziende](https://en.wikipedia.org/wiki/Web_hosting_service) hanno offerto servizi più semplici dalla metà del 1990, ma i servizi "cloud" hanno notevolmente ampliato la flessibilità dei sistemi e la gamma di servizi offerti. È possibile utilizzare questi servizi per impostare un singolo ERDDAP™ o una griglia/cluster di ERDDAP s per gestire un uso molto pesante. Per ulteriori informazioni, vedere [cloud computing con ERDDAP™ ](/docs/server-admin/scaling#cloud-computing) .

### Amazzonia{#amazon} 
*    ** [Servizi web Amazon (AWS) EC2 Panoramica dell'installazione](#amazon) **   
     [Servizi web Amazon (AWS) ](https://aws.amazon.com/) è un [servizio cloud computing](https://en.wikipedia.org/wiki/Cloud_computing) che offre una vasta gamma di infrastrutture informatiche che è possibile affittare entro l'ora. È possibile installare ERDDAP™ su [Nuvola integrata elastica (ECONOMIA) ](https://aws.amazon.com/ec2/) esempio (il loro nome per un computer che è possibile affittare entro l'ora) . AWS ha un eccellente [Guida utente di AWS](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html) e puoi usare Google per trovare risposte a domande specifiche che potresti avere. Preparati -- è una giusta quantità di lavoro per iniziare. Ma una volta che si ottiene un server in esecuzione, è possibile noleggiare facilmente quante più risorse aggiuntive (server, database, SSD-space, ecc.) come avete bisogno, ad un prezzo ragionevole. \\[ Questo non è una raccomandazione o approvazione di Amazon Web Services. Ci sono altri provider cloud. \\] 
    
Una panoramica delle cose che dovete fare per ottenere ERDDAP™ in esecuzione su AWS è:
    
    * In generale, farai tutte le cose descritte nella [Guida utente di AWS](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html) .
    * Impostare un account AWS.
    * Impostare un utente AWS all'interno di tale account con privilegi di amministratore. Accedi come questo utente per eseguire tutti i seguenti passaggi.
    * Deposito del blocco elastico (EBS) è l'equivalente AWS di un disco rigido collegato al server. Alcuni spazi EBS saranno assegnati quando si crea un'istanza EC2. È storage persistente -- le informazioni non vengono perse quando si ferma l'istanza EC2. E se si modificano i tipi di istanza, lo spazio EBS viene automaticamente attaccato alla nuova istanza.
    * Crea un indirizzo IP elastico in modo che la tua istanza EC2 abbia un URL stabile e pubblico (al contrario di un URL privato che cambia ogni volta che riavvia l'istanza) .
    * Creare e avviare un'istanza EC2 (computer computer) . Ci sono una vasta gamma di [tipi di esempio](https://aws.amazon.com/ec2/instance-types/) , ciascuno ad un prezzo diverso. Un'istanza m4.large o m4.xlarge è potente ed è probabilmente adatto per la maggior parte degli usi, ma scegliere qualsiasi cosa soddisfi le vostre esigenze. Probabilmente vorrai usare Linux di Amazon come sistema operativo.
    * Se il computer desktop/laptop è un computer Windows, è possibile utilizzare [PuTTY](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/putty.html) , un client SSH gratuito per Windows, per accedere alla riga di comando dell'istanza EC2. Oppure, potresti avere un altro programma SSH che preferisci.
    * Quando accedi all'istanza EC2, sarai registrato come utente amministrativo con il nome utente "ec2-user". ec2-utente ha privilegi sudo. Quindi, quando è necessario fare qualcosa come utente root, utilizzare: sudo *alcuniCommand* 
    * Se il computer desktop/laptop è un computer Windows, è possibile utilizzare [FileZilla](https://stackoverflow.com/questions/16744863/connect-to-amazon-ec2-file-directory-using-filezilla-and-sftp) , un programma SFTP gratuito, per trasferire file da/per la tua istanza EC2. Oppure, potresti avere un altro programma SFTP che preferisci.
    *    [Installare Apache](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/install-LAMP.html) sulla vostra istanza EC2.
    * Seguire lo standard [ ERDDAP™ istruzioni di installazione](/docs/server-admin/deploy-install) .
         
### AspettaThenTryAgain Eccezione{#waitthentryagain-exception} 
Un utente può ottenere un messaggio di errore come
WaitThenTryAgainException:
C'era un (temporaneo?) problema. Aspetta un attimo, poi riprova. (In un browser, fare clic sul pulsante Reload.)   
Dettagli: GridDataAccessor.increment: parzialeRisultati \\[ 0 \\] ="123542730" doveva essere "123532800".

La spiegazione generale di WaitThenTryAgainException è:
Quando ERDDAP™ sta rispondendo a una richiesta dell'utente, potrebbe esserci un errore inaspettato con il dataset (ad esempio, un errore durante la lettura dei dati dal file, o un errore di accesso a un set di dati remoto) . WaitThenTryAgain segnala di ERDDAP™ che la richiesta non sia riuscita (finora) ma ERDDAP™ dovrebbe cercare di ricaricare rapidamente il dataset (chiama [Richiesta di ricarica](#requestreloadasap) ) e riprovare la richiesta. Spesso, questo riesce, e l'utente vede solo che la risposta alla richiesta era lenta. Altre volte, il reload fallisce o è troppo lento, o il successivo tentativo di affrontare la richiesta fallisce e lancia un altro WaitThenTryAgain. Se succede, ERDDAP™ segna il dataset per il caricamento ma dice all'utente (via a WaitThenTryAgain Eccezione) che c'è stato un fallimento durante la risposta alla richiesta.

Questo è il comportamento normale. Questo sistema può affrontare molti problemi comuni.
Ma è possibile che questo sistema venga attivato eccessivamente. La causa più comune è che ERDDAP Il caricamento del dataset non vede un problema, ma ERDDAP La risposta a una richiesta di dati vede il problema. Non importa quale sia la causa, la soluzione è che tu abbia a che fare con tutto ciò che è sbagliato nel dataset. Guarda in log.txt per vedere i messaggi di errore reali e affrontare i problemi. Se un sacco di file hanno intestazioni valide ma dati non validi (un file danneggiato) , sostituire i file con file non corrotti. Se la connessione a un RAID è flakey, risolvere il problema. Se la connessione a un servizio remoto è flakey, trovare un modo per farlo non flakey o scaricare tutti i file dalla fonte remota e servire i dati dai file locali.

La spiegazione dettagliata di questo errore specifico (sopra) è:
Per ciascuno EDDGrid dataset, ERDDAP™ mantiene i valori variabili dell'asse in memoria. Sono utilizzati, ad esempio, per convertire i valori dell'asse richiesto che utilizzano il " () " formato in numeri di indice. Ad esempio, se i valori dell'asse sono "10, 15, 20, 25", una richiesta (20) sarà interpretato come una richiesta di indice #2 (Indici basati su 0) . Quando ERDDAP™ ottiene una richiesta di dati e ottiene i dati dalla fonte, verifica che i valori dell'asse che ha ottenuto dalla sorgente corrispondono ai valori dell'asse in memoria. Di solito lo fanno. Ma a volte la fonte di dati è cambiata in modo significativo: ad esempio, i valori indice dall'inizio della variabile asse possono essere stati rimossi (ad esempio, "10, 15, 20, 25" potrebbe essere diventato "20, 25, 30") . Se questo accade, è chiaro che ERDDAP « interpretazione della richiesta (ad esempio, " (20) " è l'indice #2) è ora sbagliato. Quindi... ERDDAP™ getta un'eccezione e chiama RequestReloadASAP. ERDDAP™ aggiornerà presto il dataset (spesso in pochi secondi, di solito entro un minuto) . Altri, problemi simili gettano anche l'eccezione WaitThenTryAgain.
    
#### Richiesta di ricarica{#requestreloadasap} 
È possibile vedere RequestReloadASAP nel file log.txt subito dopo un messaggio di errore e spesso vicino a un [AspettaThenTryAgain Eccezione](#waitthentryagain-exception) . È fondamentalmente un modo interno e programmatico per ERDDAP™ per impostare un [bandiera](#flag) per segnalare che il dataset dovrebbe essere ricaricato al più presto.
     
### File non cancellati{#files-not-being-deleted} 
Per alcuni ERDDAP™ installazioni, c'è stato un problema con alcuni file temporanei creati da ERDDAP™ soggiorno aperto (erroneamente) e quindi non essere cancellato. In alcuni casi, molti di questi file hanno accumulato e preso una quantità significativa di spazio su disco.

Speriamo che questi problemi siano risolti (come ERDDAP™ Voce principale:) . Se si vede questo problema, si prega di e-mail i nomi directory+ dei file offensivi a Chris. John a Noaa.gov. Hai alcune opzioni per affrontare il problema:

* Se i file non sono grandi e non ti stanno causando di esaurire lo spazio su disco, puoi ignorare il problema.
* La soluzione più semplice è spegnere tomcat/ ERDDAP™   (dopo ore così meno utenti sono interessati) . Durante l'arresto, se il sistema operativo non cancella i file, cancellali a mano. Poi riavviare ERDDAP .
         
### JSON-ld{#json-ld} 
*    ** [Semantic Markup di Datasets con json-ld (JSON Dati collegati) ](#json-ld) **   
     ERDDAP™ ora usi [json-ld (JSON Dati collegati) ](https://json-ld.org) per rendere il vostro catalogo dati e set di dati parte del [web semantico](https://en.wikipedia.org/wiki/Semantic_Web) , che è l'idea di Tim Berners-Lee di rendere più leggibile il contenuto del web e la macchina "sostenibile". Il contenuto json-ld utilizza [schema.org](https://schema.org/) termini e definizioni. Motori di ricerca ( [Google in particolare](https://developers.google.com/search/docs/data-types/datasets) ) e altri strumenti semantici possono utilizzare questo markup strutturato per facilitare la scoperta e l'indicizzazione. Il marchio strutturato json-ld appare come invisibile-uomo&lt;&gt; codice sulhttps://.../erddap/info/index.htmlpagina web (che è un web semantico [DataCatalog](https://schema.org/DataCatalog) ) e su ciascunohttps://.../erddap/info/*datasetID*/index.htmlpagina web (che è un web semantico [Dataset](https://schema.org/Dataset) ) . (Un ringraziamento speciale a Adam Leadbetter e Rob Fuller dell'Istituto Marino in Irlanda per aver fatto le parti dure del lavoro per fare questa parte del ERDDAP .)   
     
### URL Out-Of-Date{#out-of-date-urls} 
Lentamente ma certamente, gli URL che i fornitori di dati hanno scritto nei file di dati stanno diventando fuori-de-date (per esempio, http diventa https , i siti web sono riorganizzati e le organizzazioni come NODC/NGDC/NCDC sono riorganizzate in NCEI) . I link rotti risultanti sono un problema sempre presente di fronte a tutti i siti web. Per affrontare questo, ERDDAP™ ora ha un sistema per aggiornare automaticamente gli URL out-of-date. Se Genera i dati Xml vede un URL aggiornato, aggiunge l'URL aggiornato a&lt; addAttributes &gt;. Inoltre, quando un dataset carica, se ERDDAP™ vede un URL out-of-date, cambia silenziosamente l'URL aggiornato. Le modifiche sono controllate da una serie di coppie di ricerca-per/sostituzioni definite in&lt;aggiornamento in ERDDAP '
 \\[ tomcat \\] /webapps/erddap/WEB-INF/classes/gov/noa/pfel/erddap/util/messages.xml file. Puoi cambiare. Se avete suggerimenti per le modifiche, o se pensate che questo dovrebbe essere trasformato in un servizio (come i Convertitori) Per favore, e-mail Chris. John a Noaa.gov.
     
### CORS{#cors} 
* CORS ( [Condivisione delle risorse](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) )   
"è un meccanismo che permette risorse limitate (ad esempio font o ERDDAP™ dati) su una pagina web da richiedere a un altro dominio al di fuori del dominio da cui è stata servita la prima risorsa" (Arun Ranganathan) . Fondamentalmente, CORS è un messaggio che può essere messo nell'intestazione HTTP di una risposta, dicendo essenzialmente, "si sta bene con questo sito se alcuni altri siti (quelli specifici, o tutti) raccogliere risorse (ad esempio, dati) da questo sito e renderlo disponibile sul loro sito". Così, è un'alternativa a [JSONP](https://en.wikipedia.org/wiki/JSONP) .
    
Gli sviluppatori di ERDDAP™ non pretendono di essere esperti di sicurezza. Non siamo del tutto chiari circa le questioni di sicurezza relative a CORS. Non vogliamo fare alcuna dichiarazione che prometta un'azione che riduce la sicurezza. Quindi resteremo neutrali e lo lasceremo a ciascuno. ERDDAP™ admin per decidere se i vantaggi o l'attivazione di un intestazione CORS sono validi i rischi. Come sempre, se il tuo ERDDAP™ ha qualsiasi dataset privato, è una buona idea essere molto attenti alla sicurezza.
    
Se vuoi abilitare CORS per il tuo ERDDAP™ # Ci sono # [istruzioni disponibili](https://enable-cors.org/index.html) descrivendo come gli amministratori del sito possono abilitare un'intestazione CORS tramite il software server di livello inferiore (ad esempio, Apache o nginx) .
    
### Palette{#palettes} 
* Le Palette sono utilizzate da ERDDAP™ per convertire una gamma di valori di dati in una gamma di colori durante la fabbricazione di grafici e mappe.
    
Ogni tavolozza è definita in un file di tavolozza .cpt-style utilizzato da [GMT](https://www.soest.hawaii.edu/gmt/) . Tutti ERDDAP™ I file .cpt sono file GMT .cpt validi, ma il contrario non è vero. Per l'uso in ERDDAP™ , i file .cpt hanno:
    
    * Linee di commenti opzionali all'inizio del file, a partire da "#".
    * Una sezione principale con una descrizione dei segmenti della tavolozza, un segmento per linea. Ogni riga di descrizione del segmento ha 8 valori:
inizio Valore, startRed, inizio Green, inizio Blue, endValue, endRed, endGreen, endBlue.
Potrebbe esserci un numero qualsiasi di segmenti. ERDDAP™ utilizza l'interpolazione lineare tra startRed/Green/Blue e endRed/Green/Blue di ogni segmento.
        
Consigliamo che ogni segmento specifichi un colore di inizio e fine che sono diversi, e che il colore di inizio di ogni segmento sia lo stesso del colore finale del segmento precedente, in modo che la tavolozza descrive una miscela continua di colori. ERDDAP™ ha un sistema per creare on-the-fly una tavolozza di colori discreti da una tavolozza con una miscela continua di colori. An ERDDAP™ l'utente può specificare se desidera che la tavolozza sia continua (l'originale) o Discrete (derivato dall'originale) . Ma ci sono motivi legittimi per non seguire queste raccomandazioni per alcune tavolozze.
        
    * Il valore di partenza e la fineValore devono essere interi.
Il primo segmento deve avere inizioValue=0 e endValue=1.
Il secondo segmento deve avere inizioValue=1 e fineValue=2.
Etc.
    * I valori rossi, verdi e blu devono essere interi da 0 (nessuno) ... 255 (pieno su) .
    * La fine del file deve avere 3 linee con:
        1. Colore rgb di sfondo per valori di dati inferiori al minimo della barra di colore, ad esempio: B 128 128 128
È spesso il startRed, startGreen, e startBlue del primo segmento.
        2. Colore rgb di primo piano per valori di dati più del massimo della barra di colore, ad esempio: F 128 0 0
È spesso il endRed, endGreen e endBlue dell'ultimo segmento.
        3. Un colore rgb per i valori di dati NaN, ad esempio, N 128 128 128
È spesso grigio medio (128) .
    * I valori su ogni linea devono essere separati da schede, senza spazi estranei.
    
Un file campione .cpt è BlueWhiteRed.cpt:
    
# Qui BlueWhiteRed.cpt.
0 0 0 128 0 0 255
1 0 0 255 2 0 255 255
2 0 255 255 3 255 255 255 255
3 255 255 255 4 255 255 255 0
4 255 255 0 5 255 0 0
5 255 0 0 6 128 0
0 0 128
F 128 0 0
N 128 128 128
    
Vedere i file .cpt esistenti per altri esempi. Se c'è problema con un file .cpt, ERDDAP™ probabilmente getterà un errore quando il file .cpt è parsed (che è meglio che abusare delle informazioni) .
    
È possibile aggiungere ulteriori tavolozze a ERDDAP . Potete renderli voi stessi o trovarli sul web (per esempio, a [cpt-city](http://soliton.vm.bytemark.co.uk/pub/cpt-city/) ) anche se probabilmente dovrete modificare il loro formato leggermente per conformarsi a ERDDAP I requisiti del .cpt. # ERDDAP™ per utilizzare un nuovo file .cpt, memorizzare il file in *tomcat* /webapps/erddap/WEB-INF/cptfiles (Dovrai farlo per ogni nuova versione di ERDDAP ) ed entrambi:
    
    * Se si utilizza il file predefinito.xml: aggiungere il nome del file al&lt;&gt; tag in
         *tomcat* /webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml.
Se lo fai, devi farlo ogni volta che si aggiorna ERDDAP .
    * Se si utilizza un file message.xml personalizzato: aggiungere il nome del file al&lt;tag di tavolozza &gt; nel file di messaggi personalizzati.xml: *tomcat* /content/erddap/messages.xml . Se lo fai, devi farlo solo una volta. (ma c'è un altro lavoro per mantenere un file Messaggi personalizzati.xml) .
    
Poi riavviare ERDDAP™ Così ERDDAP™ nota le modifiche. Un vantaggio di questo approccio è che è possibile specificare l'ordine delle palette nell'elenco presentato agli utenti. Se aggiungi una collezione, ti invitiamo ad aggiungere un prefisso con le iniziali degli autori (ad esempio, " KT\\_ ") al nome di ogni tavolozza per identificare la collezione e in modo che ci possano essere più tavolozze che altrimenti avrebbero lo stesso nome.
    
Non rimuovere o modificare nessuna delle palette standard. Sono una caratteristica standard di tutti ERDDAP™ impianti. Se si pensa che una tavolozza o una raccolta di tavolozze dovrebbe essere inclusa nella norma ERDDAP™ distribuzione perché sarebbe di uso generale, si prega di e-mail a Chris. John a Noaa.gov.
    
### Barra di colore{#colorbars} 
*    **Come funziona ERDDAP™ generare i colori in una barra di colore?** 
    
    1. L'utente seleziona uno dei predefiniti [tavolozza](#palettes) o utilizza il default, ad esempio, Rainbow. Le Palette vengono memorizzate/definite nei file Tabella .cpt Color Palette in stile GMT. Ciascuno di ERDDAP 's palette predefinite ha una semplice gamma di interi, ad esempio, da 0 a 1 (se c'è solo una sezione nella tavolozza) 0 a 4 (se ci sono quattro sezioni nella tavolozza) . Ogni segmento del file copre n a n+1, a partire da n=0.
    2.   ERDDAP™ genera un nuovo file .cpt on-the-fly, scalando la gamma della tavolozza predefinita (ad esempio, da 0 a 4) alla gamma della tavolozza necessaria dall'utente (ad esempio, da 0,1 a 50) e poi generare una sezione nella nuova tavolozza per ogni sezione della nuova tavolozza (ad esempio, una scala di log con zecche a 0.1, 0.5, 1, 5, 10, 50 avrà 5 sezioni) . Il colore per il punto finale di ogni sezione è generato trovando la sezione relativa della tavolozza nel file .cpt, quindi interpolando linearmente i valori R, G e B. (Questo è lo stesso come il modo in cui GMT genera colori dai suoi file Tabella di colore Palette.) Questo sistema permette ERDDAP™ per iniziare con le palette generiche (ad esempio, Arcobaleno con 8 segmenti, in totale da 0 a 8) e creare palette personalizzate on-the-fly (ad esempio, un arcobaleno personalizzato, che mappa da 0,1 a 50 mg/L ai colori arcobaleno) .
    3.   ERDDAP™ quindi utilizza quel nuovo file .cpt per generare il colore per ogni pixel colorato diverso nella barra dei colori (e più tardi per ogni punto di dati quando si tracciano dati su un grafico o una mappa) , nuovamente trovando la sezione relativa della tavolozza nel file .cpt, quindi interpolando linearmente i valori R, G e B.
    
Questo processo può sembrare inutilmente complicato. Ma risolve i problemi relativi alle scale di registro che sono difficili da risolvere altri modi.
    
Così come si può imitare ciò ERDDAP™ Sta facendo? Non e' facile. Fondamentalmente è necessario duplicare il processo che ERDDAP™ sta usando. Se sei un Java programmatore, è possibile utilizzare lo stesso Java classe che ERDDAP™ utilizza per fare tutto questo:
     *tomcat* /webapps/erddap/WEB-INF/classes/gov/noaa/pfel/coastwatch/sgt/CompoundColorMap.java.
    
### Linee guida per i sistemi di distribuzione dei dati{#guidelines-for-data-distribution-systems} 
Si possono trovare opinioni più generali sulla progettazione e la valutazione dei sistemi di distribuzione dei dati [Qui](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html) .
     
### ArchivioAzione{#archiveadataset} 
Incluso nel tuo ERDDAP™ installazione è uno strumento di riga di comando chiamato ArchiveADataset che può aiutarti a creare un archivio (a .zip o .tar  .gz file) con parte o tutti i dati memorizzati in una serie di netcdf-3 .nc file di dati in un formato di file adatto per la presentazione a NOAA Archivio NCEI ( .nc per set di dati grigliati o [ .nc CFMA](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA) per set di dati tabulari, come specificato dal [NCEI NetCDF Modelli v2.0](https://www.ncei.noaa.gov/data/oceans/ncei/formats/netcdf/v2.0/index.html) ) .

Archivio Dataset può fare due diversi formati di archivio:

* Il formato "originale" segue questi [Linee guida NCEI Archiviato](https://www.ncdc.noaa.gov/atrac/guidelines.html) Questa guida per [Archiviazione dei tuoi dati a NCEI](https://sites.google.com/a/noaa.gov/ncei-ioos-archive/cookbook?pli=1) , e i relativi [Pratiche per assicurare l'integrità dei dati](https://sites.google.com/a/noaa.gov/ncei-ioos-archive/cookbook/data-integrity) .
* Il formato "BagIt" rende [File BagIt](https://en.wikipedia.org/wiki/BagIt) , un formato di archivio standardizzato promosso dalla Biblioteca del Congresso degli Stati Uniti, come specificato dalla [Specifiche BagIt v0.97](https://tools.ietf.org/html/draft-kunze-bagit-14) . NOAA 's NCEI può standardizzare sui file BagIt per le presentazioni all'archivio.

Non sorprendentemente, il [metadati globali e variabili](/docs/server-admin/datasets#global-attributes) che ERDDAP™ incoraggia / richiede è quasi esattamente lo stesso in-file CF e ACDD metadati che NCEI incoraggia / richiede, quindi tutti i tuoi set di dati dovrebbero essere pronti per la presentazione a NCEI via [Inviato](https://www.nodc.noaa.gov/s2n/) o [ATRAC](https://www.ncdc.noaa.gov/atrac/index.html)   (Strumento di monitoraggio e risorse avanzate di NCEI per le collezioni di archivi) .

Se tu fossi (il ERDDAP™ amministratore) utilizzare ArchiveADataset per inviare i dati a NCEI, quindi (NCEI) determinerà quando inviare un pezzo di dati a NCEI e che cosa sarà quel pezzo, perché saprete quando ci sono nuovi dati e come specificare che chunk (e NCEI non lo farà) . Così, ArchiveADataset è uno strumento da utilizzare per creare un pacchetto da inviare a NCEI.

Archivio Dataset può essere utile in altre situazioni, ad esempio, per ERDDAP™ amministratori che devono convertire un sottoinsieme di un set di dati (su un privato ERDDAP ) dal suo formato di file nativo in un insieme di [ .nc File CF](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA) , in modo che un pubblico ERDDAP™ può servire i dati dal .nc File CF invece dei file originali.

Una volta che hai impostato ERDDAP™ e correte (almeno una volta) , è possibile trovare e utilizzare ArchiveADataset *tomcat* /webapps/erddap/WEB-INF directory. C'è uno script di shell (ArchivioADataset.sh) per Linux/Unix e un file batch (ArchivioADataset.bat) per Windows.

Su Windows, la prima volta che esegue ArchiveADataset, è necessario modificare ArchiveADataset. bat file con un editor di testo per cambiare il percorso alla java. exe file in modo che Windows possa trovare Java .

Quando si esegue ArchiveADataset, ti farà una serie di domande. Per ogni domanda, digitare una risposta, quindi premere Invio. Oppure premere ^C per uscire da un programma in qualsiasi momento.

Oppure, puoi mettere le risposte alle domande, in ordine, sulla riga di comando. Per fare questo, eseguire il programma una volta e digitare e scrivere le risposte. Poi, è possibile creare una singola riga di comando (con le risposte come parametri) che gestisce il programma e risponde a tutte le domande.
Utilizzare la parola predefinita se si desidera utilizzare il valore predefinito per un dato parametro.
Utilizzare " (due doppie citazioni) come segnaposto per una stringa vuota.
Specificare i parametri sulla riga di comando può essere molto conveniente, ad esempio, se si utilizza ArchiveADataset una volta al mese per archiviare il valore di un mese di dati. Una volta generata la riga di comando con parametri e salvata che nelle note o in uno script di shell, è sufficiente fare piccole modifiche ogni mese per fare l'archivio di quel mese.

Le domande che ArchiveADataset pone ti permettono di:

* Specificare l'imballaggio originale o Bagit. Per NCEI, usare Bagit.
* Specificare zip o catrame .gz compressione per il pacchetto. Per NCEI, utilizzare il catrame .gz .
* Specificare un indirizzo email di contatto per questo archivio (sarà scritto nel file READ\\_ME.txt nell'archivio) .
* Specificare datasetID del dataset che si desidera archiviare.
* Specificare quali variabili di dati si desidera archiviare (di solito tutti) .
* Specificare quale sottoinsieme del dataset che si desidera archiviare. È necessario formattare il sottoinsieme nello stesso modo in cui si formatta un sottoinsieme per una richiesta di dati, quindi sarà diverso per griglie che per set di dati tabulari.
    * Per i set di dati grigliati, è possibile specificare un intervallo di valori della dimensione più sinistra, di solito che è un intervallo di tempo. ArchiveADataset farà una richiesta separata e genererà un file di dati separato per ogni valore nell'intervallo di valori. Dal momento che i dataset grigliati sono di solito grandi, sarà quasi sempre necessario specificare un piccolo sottoinsieme rispetto alla dimensione dell'intero dataset.
Per esempio, \\[  (2015-12-01) : (2015-12-31)  \\]  \\[  \\]  \\[  \\]  \\[  \\] 
    * Per i set di dati tabulari, è possibile specificare qualsiasi raccolta di vincoli, ma è spesso un intervallo di tempo. Poiché i set di dati tabulari sono di solito piccoli, è spesso possibile specificare nessun vincolo, in modo che l'intero set di dati sia archiviato.
Ad esempio, &time&gt;=2015-12-01&time&lt;2016-01-01
* Per i set di dati tabulari: specificare un elenco separato da virgola di 0 o più variabili che determineranno come i dati archiviati siano ulteriormente sottosette in diversi file di dati. Per set di dati che hanno
     [cdm\\_data\\_type](/docs/server-admin/datasets#cdm_data_type) Traduzione: | TimeSeriesProfile | Traiettoria | TraiettoriaProfilo
si dovrebbe quasi sempre specificare la variabile che ha la serie cf\\_role=time\\_id (ad esempio, stationID ) o cf\\_role=trajectory\\_id attributo. ArchiveADataset farà una richiesta separata e genererà un file di dati separato per ogni combinazione dei valori di queste variabili, ad esempio, per ogni stationID .
Per tutti gli altri set di dati tabulari, probabilmente non specificare alcuna variabile per questo scopo.
Attenzione: Se il sottoinsieme del dataset di archiviazione è molto grande (&gt;2GB) e non c'è una variabile adatta a questo scopo, quindi ArchiveADataset non è utilizzabile con questo dataset. Dovrebbe essere raro.
* Specificare il formato di file per i file di dati che verranno creati.
Per i set di dati grigliati, per NCEI, utilizzare .nc .
Per set di dati tabulari, per NCEI, utilizzare [ .nc CFMA](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA) se è un'opzione; altrimenti .nc .
* Specificare il tipo di file digest da creare per ogni file di dati e per l'intero pacchetto di archivio: MD5, SHA-1, o SHA-256. Il file digest fornisce un modo per il cliente (ad esempio, NCEI) per verificare se il file di dati è diventato danneggiato. Tradizionalmente, questi erano [.md5 file](https://en.wikipedia.org/wiki/MD5) , ma ora ci sono opzioni migliori. Per NCEI, utilizzare SHA-256 .

Dopo aver risposto a tutte le domande, ArchiveADataset:

1. Effettuare una serie di richieste al dataset e mettere in scena i file di dati risultante in *BigParentDirectory* Traduzione: * datasetID \\* /.
Per i set di dati grigliati, ci sarà un file per ogni valore della dimensione più sinistra (ad esempio, il tempo) . Il nome del file sarà quel valore (ad esempio, il valore del tempo) .
Per i set di dati tabulari, ci sarà un file per ogni valore della variabile ... (#) . Il nome del file sarà quel valore. Se c'è più di una variabile, le variabili di sinistra saranno utilizzate per fare nomi sottodirectory, e la variabile più destra sarà utilizzata per fare i nomi dei file.
Ogni file di dati deve essere&lt;2 GB (il massimo consentito da .nc versione 3 file) .
2. Fare un file relativo a ogni file di dati con il digerimento del file di dati. Ad esempio, se il file di dati è 46088 .nc e il tipo digerente è .sha256, quindi il file digerente avrà il nome 46088 .nc .sha256 .
3. Fare un file READ\\_ME.txt con informazioni sull'archivio, tra cui un elenco di tutte le impostazioni specificate per generare questo archivio.
4. Rendere 3 file in *BigParentDirectory* L'articolo 4, paragrafo 2, del regolamento (CEE) n.
    
    * A .zip o .tar  .gz file archivio chiamato * datasetID \\*  .zip   (o .tar  .gz ) contenente tutti i file dati in fase e digerire i file. Questo file può essere qualsiasi dimensione, limitata solo da spazio su disco.
    * Un file digerente per il file di archivio, per esempio, * datasetID \\*  .zip .sha256.txt
    * Per il tipo di archivio "originale", un file di testo chiamato * datasetID \\*  .zip .listOfFiles.txt (o .tar  .gz ) che elenca tutti i file nel .zip   (o .tar  .gz ) file.
    
Se si sta preparando l'archivio per NCEI, questi sono i file che invierà a NCEI, forse via [Inviato](https://www.nodc.noaa.gov/s2n/) o [ATRAC](https://www.ncdc.noaa.gov/atrac/index.html)   (Strumento di monitoraggio e risorse avanzate di NCEI per le collezioni di archivi) .
5. Elimina tutti i file in fase in modo che solo il file di archivio (ad esempio, .zip ) , il digerimento (ad esempio, .sha256.txt) dell'archivio, e (facoltativamente) i file .listOfFiles.txt rimangono.

#### ISO 19115 .xml File dei metadati{#iso-19115-xml-metadata-files} 
Il pacchetto di archivio ArchiveADataset non include il file di metadati ISO 19115 .xml per il dataset. Se si desidera / bisogno di inviare un file ISO 19115 per il dataset a NCEI, è possibile inviare loro il file di metadati ISO 19115 .xml che ERDDAP™ creato per il dataset (ma NMFS persone dovrebbero ottenere il file ISO 19115 per i loro dataset da InPort se ERDDAP™ non serve già quel file) .

Problemi? Suggerimenti? ArchiveADataset è nuovo. Se avete problemi o suggerimenti, Vedere il nostro [sezione per ottenere supporto aggiuntivo](/docs/intro#support) .
     
