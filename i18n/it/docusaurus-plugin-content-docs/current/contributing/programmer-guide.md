---
sidebar_position: 2
---

# Guida del programmatore

Queste sono cose che solo un programmatore che intende lavorare con ERDDAP ' Java le classi devono saperlo.

###  **Ottenere il codice sorgente**  {#getting-the-source-code} 
   

  - Via Codice sorgente su GitHub
Il codice sorgente per le recenti versioni pubbliche e le versioni in fase di sviluppo è disponibile anche tramite [GitHub](https://github.com/ERDDAP) . Si prega di leggere il [Wiki](https://github.com/ERDDAP/erddap/wiki) per quel progetto. Se si desidera modificare il codice sorgente (e possibilmente hanno i cambiamenti incorporati nello standard ERDDAP™ distribuzione) , questo è l'approccio raccomandato.

###  ** ERDDAP™ dipendenze**  {#erddap-dependencies} 
 ERDDAP™ utilizza Maven per caricare dipendenze di codice e alcuni file di riferimento statici (WEB-INF/ref) . Questo è fatto per evitare di memorizzare molti file di grandi dimensioni nel repository.
È possibile utilizzare `compilazione` e che prenderanno le dipendenze e i file di rif. Puoi anche usare `pacchetto mvn` per generare un file di guerra.
È possibile scaricare manualmente i file ref:

  -  [etopo1 .zip ](https://github.com/ERDDAP/ERDDAPRefFiles/releases/download/1.0.0/etopo1_ice_g_i2.zip) e spostarlo in /WEB-INF/ref/ .

  -  [ref\\_files .zip ](https://github.com/ERDDAP/ERDDAPRefFiles/releases/download/1.0.0/ref_files.zip) e spostarlo in /WEB-INF/ref/ .

  -  [erddapContent .zip ](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.1/erddapContent.zip)   (versione 1.0.0, 20333 byte, MD5=2B8D2A5AE5ED73E3A42B529C168C60B5, datata 2024-10-14) e szip in _tomcat_, creando _tomcat_/content/erddap .

NOTA: Per impostazione predefinita, Maven cacherà i download dell'archivio dati di riferimento statico e di prova e li estrarra solo quando viene scaricata una nuova versione. Per saltare il download del tutto, è possibile impostare il `skipResourceScaricare` e/o `skipTestResourceScarica` proprietà a Maven (ad es. `mvn -DskipResourceScarica il pacchetto` ) . Per forzare l'estrazione, set `-Ddownload.unpack=true` e `-Ddownload.unpackWhenChanged=false` .

-  ERDDAP™ e i suoi subcomponenti sono molto liberali, open source [licenze](/license) , in modo da poter utilizzare e modificare il codice sorgente per qualsiasi scopo, per-profit o no-profit. Nota: ERDDAP™ e molti subcomponenti hanno licenze che richiedono di riconoscere la fonte del codice che si sta utilizzando. Vedi [Crediti](/credits) . Se richiesto o meno, è solo una buona forma per riconoscere tutti questi collaboratori.
  

-  **Utilizzare il codice per altri progetti** 

Mentre siete invitati a utilizzare parti del ERDDAP™ codice per altri progetti, essere avvertito che il codice può e cambierà. Non promettiamo di sostenere altri usi del nostro codice. Git e GitHub saranno le vostre soluzioni principali per affrontare questo -- Git vi permette di unire i nostri cambiamenti nei vostri cambiamenti.
   **Per molte situazioni in cui si potrebbe essere tentati di utilizzare parti di ERDDAP™ nel vostro progetto, pensiamo che troverete molto più facile da installare e utilizzare ERDDAP™ come è,** e poi scrivere altri servizi che utilizzano ERDDAP I servizi. Si può impostare il proprio ERDDAP™ installazione grezzo in un'ora o due. Si può impostare il proprio ERDDAP™ installazione in modo lucido in pochi giorni (a seconda del numero e della complessità dei tuoi set di dati) . Ma... ERDDAP™ per il tuo progetto è probabile che ci vorranno settimane (e mesi per catturare sottigliezze) e si perde la capacità di incorporare modifiche e correzioni di bug da successivi ERDDAP™ rilascia. Noi (ovviamente) pensare che ci sono molti vantaggi per l'utilizzo ERDDAP™ come è e rendere il vostro ERDDAP™ installazione pubblicamente accessibile. Tuttavia, in alcune circostanze, potrebbe non voler rendere il vostro ERDDAP™ installazione pubblicamente accessibile. Poi, il vostro servizio può accedere e utilizzare il vostro privato ERDDAP™ e i tuoi clienti non hanno bisogno di sapere ERDDAP™ .

  ####  **A metà strada** 

O, c'è un altro approccio che si può trovare utile che è a metà strada tra delving in ERDDAP il codice e l'utilizzo ERDDAP™ come servizio web stand-alone: Nella classe EDD, c'è un metodo statico che consente di fare un'istanza di un set di dati (in base alle specifiche datasets.xml ) :
"Dataset" Xml (String tDatasetID) 
`Restituisce un'istanza di un EDDTable o EDDGrid Dataset. Data l'istanza, puoi chiamare\\
#MakeNewFileForDapQuery # (String userDapQuery, String dir, String fileName, String file Tipologia) 
`per indicare l'istanza di fare un file di dati, di un file specificoTipo, con i risultati di una query dell'utente. Così, questo è un modo semplice per usare ERDDAP 's metodi per richiedere i dati e ottenere un file in risposta, proprio come un client userebbe ERDDAP™ applicazione web. Ma questo approccio funziona nel tuo Java programma e bypassa la necessità di un server di applicazione come Tomcat. Usiamo questo approccio per molti dei test di unità di EDDTable e EDDGrid sottoclassi, in modo da poter vedere esempi di questo nel codice sorgente per tutte quelle classi.

###  **Ambiente**  {#development-environment} 

  - Ci sono configurazioni per [Jetty](https://github.com/ERDDAP/erddap/blob/main/development/jetty) e [Docker](https://github.com/ERDDAP/erddap/blob/main/development/docker) a GitHub, anche se le versioni sono previste per eseguire in Tomcat.

  -  **Facoltativo** : Impostazione ERDDAP™ in Tomcat\\
Da ERDDAP™ è principalmente destinato ad essere un servlet in esecuzione in Tomcat, si consiglia vivamente di seguire lo standard [istruzioni di installazione](/docs/server-admin/deploy-install) per installare Tomcat, e poi installare ERDDAP™ nella directory webapps di Tomcat. Tra le altre cose, ERDDAP™ è stato progettato per essere installato nella struttura di directory di Tomcat e si aspetta Tomcat per fornire alcuni file .jar.

  -  ERDDAP™ non richiede un IDE specifico (Chris utilizza principalmente Visual Studio Code, Bob utilizzato EditPlus) . Non usiamo Eclipse, Ant, ecc; né offriamo ERDDAP - il supporto per loro. Il progetto utilizza Maven.

  - Usiamo un file batch che elimina tutti i file .class nell'albero di origine per garantire che abbiamo una compilazione pulita (con javac) .

  - Usiamo attualmente il javac di Adoptium jdk-21.0.3+9 per compilare gov.noaa.pfeg.coastwatch.TestAll (ha collegamenti a alcune classi che non sarebbero compilati altrimenti) e eseguire i test. Per motivi di sicurezza, è quasi sempre meglio utilizzare le ultime versioni di Java 21 e Tomcat 10.

    - Quando eseguiamo javac o java, la directory corrente è _tomcat_/webapps/erddap/WEB-INF .

    - Il nostro percorso di javac e java è
       `classi;././././lib/servlet-api.jar;lib/*` 

    - Quindi la vostra linea di comando javac sarà qualcosa di simile\\
       `javac -coding UTF-8 -cp class;./././././lib/servlet-api.jar;lib/* classi/gov/noa/pfel/coastwatch/TestAll.java` 

    - E la vostra linea di comando java sarà qualcosa di simile\\
`java -cp class;./././././lib/servlet-api.jar;lib/* -Xmx4000M -Xms4000M classi/gov/noa/pfel/coastwatch/TestAll
       `Opzionale: è possibile aggiungere` -verbose:gc`, che dice Java per stampare statistiche di raccolta rifiuti.

    - Se prova Tutte le compilazioni, tutto ERDDAP™ i bisogni sono stati compilati. Alcune classi sono compilate che non sono necessarie per ERDDAP™ . Se la compilazione di TestAll riesce, ma non compila una certa classe, quella classe non è necessaria. (Ci sono alcune classi incompiute/non utilizzate.) 

  - In alcuni casi, utilizziamo il codice sorgente di terze parti invece dei file .jar (in particolare DODS ) e li hanno modificati leggermente per evitare problemi di compilazione Java 21. Abbiamo spesso fatto altre piccole modifiche (in particolare DODS ) per altri motivi.

  - La maggior parte delle classi hanno metodi di test nel loro file src/test associato. È possibile eseguire i test JUnit con il `test mvn` comando. Questo scaricherà diversi file zip di dati che i test si basano sull'ultima versione di [ ERDDAP Traduzione: Test](https://github.com/ERDDAP/erddapTest/releases/) .
     
NOTA: Maven caches downloads ma rimuoverà gli archivi scaricati su ogni esecuzione, che richiede tempo. Per saltare il download
e decomprimere archivi di dati di prova, è possibile specificare il `skipTestResourceScarica` proprietà a Maven (ad es. `mvn -DskipTestResourceScarica il pacchetto` ) .

###   **Classi importanti**  {#important-classes} 

Se si desidera guardare il codice sorgente e cercare di capire come ERDDAP™ lavori, per favore.

  - Il codice ha Java Doc commenta, ma il Java I dottori non sono stati generati. Sentitevi liberi di generarli.

  - Le classi più importanti (compresi quelli indicati di seguito) sono all'interno di gov/noaa/pfel/erddap.

  - The ERDDAP™ classe ha i metodi di livello più alto. Si estende HttpServlet.

  -  ERDDAP™ passa richieste a istanze di sottoclassi di EDDGrid o EDDTable, che rappresentano singoli set di dati.

  - EDStatic ha la maggior parte delle informazioni e delle impostazioni statiche (ad esempio, dai file setup.xml e message.xml) e offre servizi statici (ad esempio, inviando e-mail) .

  -  EDDGrid e sottoclassi EDDTable parse la richiesta, ottenere i dati da metodi specifici di sottoclasse, quindi formattare i dati per la risposta.

  -  EDDGrid sottoclassi spingono i dati in GridDataAccessor (il contenitore dati interno per i dati grigliati) .

  - Le sottoclassi EDDTable spingono i dati nelle sottoclassi TableWriter, che scrivono i dati a un tipo di file specifico on-the-fly.

  - Altre classi (ad esempio, classi di basso livello) sono anche importanti, ma è meno probabile che lavorerai per cambiarli.
     

###  **Contributi del codice**  {#code-contributions} 

- Problemi GitHub
Se vuoi contribuire ma non hai un progetto, vedi l'elenco [Problemi GitHub](https://github.com/ERDDAP/erddap/issues) , molti dei quali sono progetti che si potrebbe prendere su. Se si desidera lavorare su un problema, si prega di assegnarlo a te stesso per indicare agli altri che si sta lavorando su di esso. Il problema GitHub è il posto migliore per discutere qualsiasi domanda per come procedere con il lavoro su quel problema.

- Se il cambiamento che si desidera fare è uno dei seguenti casi comuni, si prega di creare un [Problema GitHub](https://github.com/ERDDAP/erddap/issues) indicando il cambiamento che intende fare. Poi una volta che il cambiamento è completo, fare una richiesta pull per richiedere la fusione. I cambiamenti comuni includono:

  - Vuoi scrivere un'altra sottoclasse di EDDGrid o EDDTable per gestire un altro tipo di sorgente dati. Se è così, si consiglia di trovare la sottoclasse esistente più vicina e utilizzare quel codice come punto di partenza.

  - Vuoi scrivere un altro metodo saveAs_FileType_. Se è così, si consiglia di trovare il metodo salvaAs_FileType_ più vicino in EDDGrid o EDDTable e utilizzare quel codice come punto di partenza.

Queste situazioni hanno il vantaggio che il codice che scrivi è autocontenuto. Non è necessario conoscere tutti i dettagli di ERDDAP E' interno. E sarà facile per noi incorporare il vostro codice in ERDDAP . Nota che se si invia il codice, la licenza avrà bisogno di compatibilità con il ERDDAP™   [licenza](/license)   (ad esempio, [Apache](https://www.apache.org/licenses/) ♪ [BSD](https://www.opensource.org/licenses/bsd-license.php) o [MIT-X](https://www.opensource.org/licenses/mit-license.php) ) . Elenceremo il tuo contributo nel [crediti](/credits) .

- Se avete una funzione non coperta sopra che si desidera aggiungere a ERDDAP , si consiglia prima di creare un filo di discussione nel [GitHub Discussioni](https://github.com/ERDDAP/erddap/discussions/categories/ideas) . Per caratteristiche/cambiamenti significativi il Consiglio Tecnico ne discuterà e deciderà se approvarlo ERDDAP™ .

###  **A giudicare i tuoi contributi al codice**  {#judging-your-code-contributions} 
Se si desidera inviare codice o altre modifiche da includere ERDDAP E' fantastico. Il vostro contributo deve soddisfare determinati criteri per essere accettato. Se si seguono le linee guida qui sotto, si aumenta notevolmente le probabilità del vostro contributo essere accettato.
   

  - The ERDDAP™ il progetto è gestito da un NATD ( NOAA Nominato Direttore Tecnico) con ingresso da un Technical Board.
Dal 2007 (l'inizio del ERDDAP ) nel 2022, quello era Bob Simons (anche il Fondatore-Leader) . A partire dal gennaio 2023, quello è Chris John. Fondamentalmente, il NATD è responsabile per ERDDAP , così s/he ha la parola finale sulle decisioni ERDDAP™ codice, in particolare sulla progettazione e se una data richiesta pull sarà accettata o meno. Deve essere in questo modo in parte per motivi di efficienza (funziona benissimo per Linus Torvalds e Linux) e in parte per motivi di sicurezza: Qualcuno deve dire alle persone di sicurezza IT che si assume la responsabilità per la sicurezza e l'integrità del codice.
     

  - Il NATD non garantisce che accetterà il tuo codice.
Se un progetto non funziona così come avevamo sperato e se non può essere recuperato, il NATD non includerà il progetto nel ERDDAP™ distribuzione. Ti prego, non sentirti in colpa. A volte i progetti non funzionano così come sperato. Succede a tutti gli sviluppatori di software. Se si seguono le linee guida qui sotto, si aumenta notevolmente le probabilità di successo.
     

  - E 'meglio se i cambiamenti sono di interesse generale e utilità.
Se il codice è specifico per la vostra organizzazione, è probabilmente meglio mantenere un ramo separato di ERDDAP™ per il vostro utilizzo. L'assioma lo fa. Per fortuna, Git lo rende facile da fare. Il NATD vuole mantenere una visione coerente per ERDDAP , non permettere che diventi un progetto di lavandino della cucina dove tutti aggiungono una caratteristica personalizzata per il loro progetto.
     

  - Seguire il Java Convenzioni di codice.
In generale, il tuo codice dovrebbe essere di buona qualità e dovrebbe seguire l'originale [ Java Convenzioni di codice](https://www.oracle.com/technetwork/java/codeconventions-150003.pdf) : mettere i file .class nel posto corretto nella struttura della directory, dare file .class un nome appropriato, includere il corretto Java Doc commenta, includere //commenti all'inizio di ogni paragrafo di codice, indent con 4 spazi (non scheda) , evitare linee &gt; 80 caratteri, ecc. Le convenzioni cambiano e il codice sorgente non è sempre aggiornato. Quando in dubbio, corrispondere codice alle convenzioni e non codice esistente.

- Utilizzare la classe descrittiva, il metodo e i nomi variabili.
Questo rende il codice più facile per gli altri da leggere.
   

- Evita il codice di fantasia.
A lungo termine, voi o altre persone dovranno capire il codice per mantenerlo. Quindi si prega di utilizzare semplici metodi di codifica che sono così più facili per gli altri (incluso in futuro) per capire. Ovviamente, se c'è un vero vantaggio per usare un po 'di fantasia Java funzione di programmazione, usarlo, ma documenta ampiamente ciò che hai fatto, perché, e come funziona.
   

- Lavorare con il Technical Board prima di iniziare.
Se si spera di ottenere i cambiamenti del codice in ERDDAP™ , The Technical Board vorrÃ sicuramente parlare di quello che farai e di come lo farai prima di apportare modifiche al codice. In questo modo, possiamo evitare di fare cambiamenti che il NATD, alla fine, non accetta. Quando si sta facendo il lavoro, il NATD e Technical Board è disposto a rispondere a domande per aiutarti a capire il codice esistente e (globale) come affrontare il vostro progetto.
   

- Lavoro indipendente (quanto più possibile) dopo l'inizio.
In contrasto con quanto sopra "Lavorare con il Consiglio Tecnico", dopo aver iniziato il progetto, il NATD ti incoraggia a lavorare il più in modo indipendente possibile. Se il NATD deve dirvi quasi tutto e rispondere a molte domande (soprattutto quelli che avresti potuto rispondere leggendo la documentazione o il codice) , allora i vostri sforzi non sono un risparmio di tempo per il NATD e s / lui potrebbe anche fare il lavoro loro stessi. E' il [Mese dell'Uomo Mitico](https://en.wikipedia.org/wiki/The_Mythical_Man-Month) problema. Naturalmente, dobbiamo ancora comunicare. Sarebbe bello vedere periodicamente il vostro lavoro in corso per assicurarsi che il progetto sia in pista. Ma più si può lavorare indipendentemente (dopo l'accordo del Consiglio tecnico sul compito a portata di mano e sull'approccio generale) Meglio.
   

- Evita gli insetti.
Se un bug non viene catturato prima di un rilascio, causa problemi per gli utenti (al meglio) , restituisce le informazioni sbagliate (al peggio) , è un blot su ERDDAP la reputazione, e persevererà su out-of-date ERDDAP™ impianti per anni. Lavorare molto duramente per evitare bug. Parte di questo è scrivere codice pulito (così è più facile vedere i problemi) . Parte di questo è test unità di scrittura. Parte di questo è un atteggiamento costante di evitare bug quando si scrive codice. Non fare rimpiangere NATD aggiungendo il codice a ERDDAP™ .
   

- Scrivere un test di unità o test.
Per il nuovo codice, si dovrebbe scrivere test JUnit in un file di prova.
Si prega di scrivere almeno un metodo di prova individuale che testa a fondo il codice che si scrive e aggiungerlo al file di prova JUnit classe in modo che venga eseguito automaticamente. Unità (e relative) test sono uno dei modi migliori per catturare bug, inizialmente, e nel lungo periodo (come altre cose cambiano ERDDAP™ ) . Come disse Bob: "I test sono ciò che mi fa dormire la notte".
   

- Rendere più facile per il NATD capire e accettare le modifiche nella vostra richiesta pull.
Parte di ciò sta scrivendo un metodo di prova unità (#) . Parte di questo sta limitando le modifiche a una sezione del codice (o una classe) se possibile. Il NATD non accetterà alcuna richiesta pull con centinaia di modifiche in tutto il codice. Il NATD dice alle persone di sicurezza IT che si assume la responsabilità per la sicurezza e l'integrità del codice. Se ci sono troppe modifiche o sono troppo difficili da capire, allora è troppo difficile verificare che le modifiche siano corrette e non introdurre bug o problemi di sicurezza.
   

- Tienila semplice.
Un buon tema generale per il vostro codice è: mantenere semplice. Il codice semplice è facile per gli altri (incluso in futuro) leggere e mantenere. È facile per il NATD capire e quindi accettare.
   

- Assumere responsabilità a lungo termine per il vostro codice.
Nel lungo periodo, è meglio se si assume la responsabilità continua per mantenere il codice e rispondere a domande su di esso (ad esempio, nel ERDDAP™ Google Group) . Come alcuni autori notano, il codice è una responsabilità così come un bene. Se un bug viene scoperto in futuro, è meglio se si risolve perché nessuno conosce il tuo codice meglio di te (anche in modo che ci sia un incentivo per evitare bug in primo luogo) . Il NATD non chiede un impegno costante per la manutenzione in corso. Il NATD sta solo dicendo che fare la manutenzione sarà molto apprezzato.
