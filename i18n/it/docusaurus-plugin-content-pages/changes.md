---
title: "ERDDAP™ - Changes"
---
# ERDDAP™Cambiamenti

ERDDAP™è un grande esempio di[Innovazione guidata dall'utente](https://en.wikipedia.org/wiki/User_innovation), dove l'innovazione del prodotto viene spesso dai consumatori (ERDDAP™utenti) non solo i produttori (ERDDAP™sviluppatori) . Nel corso degli anni, la maggior parte delle idee per nuove caratteristiche e cambiamentiERDDAP™sono venuti dagli utenti. Quegli utenti sono accreditati qui sotto per le loro grandi idee. Grazie&#33; Si prega di mantenere questi grandi suggerimenti in arrivo&#33;

Ecco i cambiamenti associati a ciascunoERDDAP™rilascio.

## Versione 2.26{#version-226} 
 (rilasciato 2025-02-??) 

*    **Per tutti:** 
    * Grande aggiornamento al nostro sito di documentazione: https://erddap.github.io/
 
Oltre all'aspetto aggiornato c'è una migliore navigazione, ricerca, traduzione, e dovrebbe essere più facile mantenere andare avanti&#33;

*    **Nuove funzionalità e modifiche (per gli utenti) :** 
    * Abbonamenti eRSSgli aggiornamenti dovrebbero accadere più in modo affidabile per i set di dati che vengono aggiornati frequentemente dalle modifiche dei file.

*    **CoseERDDAP™Gli amministratori devono sapere e fare:** 
    * Il rilascio predefinito richiede/supportiJavaversione 21. Tornare in questa versione è in grado di fare facilmente unaJava17 binari compatibili.

    * Nuova funzionalità per personalizzare le informazioni visualizzate sui set di dati nell'interfaccia utente. Ci aspettiamo che questo sia particolarmente utile per aggiungere cose come le citazioni di dataset. Per maggiori dettagli è possibile leggere[nuova documentazione](/docs/server-admin/display-info.md). Grazie a Ayush Singh per il contributo&#33;

    * Ulteriori metriche Prometheus. Il più grande è `http_request_duration_seconds` che include i tempi di risposta delle richieste interrotti da: "request_type", "dataset_id", "dataset_type", "file_type", "lang_code", "status_code"
Questo formato leggibile dalla macchina consentirà una migliore raccolta di metriche per capire come gli utenti utilizzano il server.

    * Nuovo modo per generare file XML ISO19115. Usa Apache SIS ed è una nuova opzione in questa versione. Si prega di abilitarlo e inviare feedback.
    ```
        <useSisISO19115>true</useSisISO19115>
    ```

    * L'interfaccia utente ora creerà singoli link per ogni url in campi comeinfoUrle sommario.

    * Abbonamenti eRSSgli aggiornamenti dovrebbero accadere più in modo affidabile per i set di dati che vengono aggiornati frequentemente dalle modifiche dei file. Se questo causa problemi, si prega di raggiungere su GitHub e disabilitare la funzionalità aggiungendo la bandiera sottostante al setup.xml.
NON RACCOMANDATO
    ```
        <updateSubsRssOnFileChanges>false</updateSubsRssOnFileChanges>
    ```

    * Le variabili sottoset non saranno più generate automaticamente per il tipo di dataset EDDTableFromNcCFFiles. Se si basava sul comportamento, si può (soluzione preferita) aggiungeresubsetVariablesalla definizione di dataset nel tuodatasets.xml, o aggiungere la bandiera sottostante al setup.xml. Se si sente la necessità di accendere questo, si prega di raggiungere su GitHub in modo che possiamo meglio sostenere il vostro caso di utilizzo in avanti.
NON RACCOMANDATO
    ```
    <includeNcCFSubsetVariables>true</includeNcCFSubsetVariables>
    ```

    * Il server reindirizza ora le richieste di documentazione (sotto download / che è la documentazione che è stata migrata) al nuovo sito di documentazione. Se necessario è possibile disattivare questo con una bandiera in setup.xml:
NON RACCOMANDATO
    ```
        <redirectDocumentationToGitHubIo>false</redirectDocumentationToGitHubIo>
    ```

    * Alcuni piccoli cambiamenti e correzioni di bug.

*    **PerERDDAP™Sviluppatori:** 
    * Miglioramento della qualità del codice e pulizia del codice morto. Ciò include piccole ottimizzazioni, una migliore gestione delle risorse clossabili, e la migrazione via da lunghi tipi di dati obsoleti (come Vector) .

    * Grande rifattore a EDStatic per estrarre la maggior parte del codice config, messaggio e metrico. E 'anche meglio incapsula l'inizializzazione e la gestione di percorsi directory (questi ultimi 2 hanno più da fare.) 

    * Molti progressi verso una Docker Image ufficialmente supportata. Il piano è quello di finalizzare e rilasciare dopo ilERDDAP™2.26 rilascio è disponibile.

## Versione 2.25{#version-225} 
 (rilasciato 2024-10-31) 

*    **Nuove funzionalità e modifiche (per gli utenti) :** 
    * EDDTableFromFiles ora può supportare query con solo output derivati (globals, script jexl o variabili) .
         
*    **CoseERDDAP™Gli amministratori devono sapere e fare:** 
    * La versione 2.25 richiedeJava21 o più recente. Questa è la versione LTS ed è disponibile da oltre un anno.
         
    * Il SharedWatchService è ora il default. Se è necessario disattivarlo, si prega di contattare chris. john a noa.gov per farmi sapere, così posso migliorarlo nelle versioni future e aggiungere:
        &lt;usoSharedWatchService&gt;false&lt;/useSharedWatchService&gt; al vostro setup.xml.
         
    * TheERDDAP™servlet ora inizierà all'avvio del server. Il che significa che i set di dati inizieranno a caricare immediatamente invece di aspettare fino a quando non verrà fatta una richiesta.
         
    * Il parametro removeMVRows in EDDTableFromMultidimNcFiles avrà ora un effetto. Impostare il falso può accelerare significativamente alcune domande, ma questo potrebbe non essere adatto per tutti i set di dati. Per maggiori informazioni vedere[descrizione del parametro](/docs/server-admin/datasets#removemvrows).
         
    * Datasets (EDDTableFromNcFiles eEDDGridDa NcFiles) utilizzando i file zarr sono ora supportati. Essi devono includere "zarr" nel fileNameRegex o percorsoRegex. Vedi il[zarr secion nella documentazione dei datasets](/docs/server-admin/datasets#zarr)per maggiori dettagli.
         
    * Nuovo tipo di dataset, EDDTableFromParquetFiles è ora supportato. Vedi il[EDDTableFromParquetFiles secion nella documentazione dei set di dati](/docs/server-admin/datasets#eddtablefromparquetfiles)per maggiori dettagli.
         
    *   [metriche di Prometheus](https://prometheus.io/)sono ora disponibili a /erddap/metrics.
         
    * È disponibile una nuova implementazione di parser XML. Questo nuovo parser permette di usare XInclude indatasets.xml. Grazie a Ayush Singh per la funzione.
         
    * Nuovo parametro indatasets.xmlcontrollare e-mail di attività insolite. insolitoAttività FailPercent predefinisce il vecchio valore del 25%. Grazie a Ayush Singh per la funzione.
         
    * Nuovo parametro in setup.xml che controlla se gli errori di caricamento del dataset vengono visualizzati nella pagina status.html. Di default a true, per disabilitare gli errori di dataset nella pagina di stato, impostare showLoadErrorsOnStatusPage a false:&lt;showLoadErrorsOnStatusPage&gt;false&lt;/showLoadErrorsOnStatusPage&gt;
         
    * Alcuni piccoli cambiamenti e correzioni di bug.
         
*    **PerERDDAP™Sviluppatori:** 
    * Test separati all'unità e all'integrazione (lento) test. Anche più test abilitati e test sono stati fatti meno infuocati.
         
    * Prossimo errore (alcuni controlli ancora disabilitati) e Spot Bugs integrato attraverso Maven.
         
    * Base di codice completo formattata per abbinare la Guida Stile di Google.
         

## Versione 2.24{#version-224} 
 (rilasciato 2024-06-07) 

*    **Nuove funzionalità e modifiche (per gli utenti) :** 
    * Nuova tavolozza di colori EK80 per set di dati acustici disponibili. Grazie a Rob Cermak per questo.
         
    * Fissare un problema in cui EDDTableAggregateRows non ha mostrato intervalli appropriati da tutti i bambini. Grazie a Marco Alba per il rapporto fix e bug.
         
*    **CoseERDDAP™Gli amministratori devono sapere e fare:** 
    * A: SICUREZZA: Google Authentication potrebbe richiedere modifiche al CSP.
        
In particolare, potrebbe essere necessario aggiungere https://accounts.google.com/gsi/style a stlye-src e https://accounts.google.com/gsi/ per collegare-src. Per lo script-src è ora possibile utilizzare https://accounts.google.com/gsi/client.
 
        
Per ulteriori informazioni potete andare al[Pagina di Google](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#content_security_policy)sulla configurazione CSP.
         
        
    * New Shared Watch Service. Questa è una nuova opzione per guardare directory per gli aggiornamenti. Ha un thread per ogni filesystem invece di un thread per dataset. Molto probabilmente questo ridurrà drasticamente il numero di fili utilizzati per guardare per i cambiamenti. Significa che tutti i dataset vengono aggiornati insieme invece di ogni dataset con la propria frequenza di aggiornamento. Molto probabilmente questo significherà aggiornamenti più frequenti per la maggior parte dei set di dati.
        
Per abilitare questo componente&lt;utilizzareSharedWatchService&gt;tru&lt;/useSharedWatchService&gt; al vostro setup.xml.
        
          
Si prega di provare questo e riferire come funziona per voi a chris. John a Noaa.gov.
         
    * Fissare per nomi var errati nei registri. Grazie a Ayush Singh per la correzione.
         
    * Alcuni piccoli cambiamenti e correzioni di bug.
         
*    **Miglioramenti perERDDAP™sviluppatori:** 
    * Supporto per lo sviluppo locale utilizzando Docker. Grazie Matt Hopson e Roje.
         
    * Supporto per lo sviluppo locale utilizzando Jetty e miglioramenti della documentazione. Grazie Micah Wengren.
         
    * Modifiche ai test per ridurre i problemi cross platform. Grazie. Shane St. Savage.
         

## Versione 2.23{#version-223} 
 (rilasciato 2023-02-27) 

Si noti che questo rilascio è stato fatto da Bob Simons, mostrando così che è ancora intorno e attivo durante la transizione a Chris John, il suo successore. Dichiarando questa versione, tutti i cambiamenti di codice vengono effettuati da Chis John, a meno che non diversamente specificato.

*    **Nuove funzionalità e modifiche (per gli utenti) :** 
    *    (Nessuno)   
         
*    **CoseERDDAP™Gli amministratori devono sapere e fare:** 
    * A: SICUREZZA: Google Authentication è ora realizzato tramite la nuova libreria Google Identity Services che fa parte di "Sign In with Google". Il supporto di Google per il vecchio sistema "Google Sign In" sarà interrotto 2023-03-31. Così se si utilizza Google Autenticazione nel vostroERDDAP™installazione, è necessario aggiornare aERDDAP™v2.23+ prima di allora. (Bob è dispiaciuto per il breve preavviso. E' colpa di Bob.)   
         
    * MIGLIORE: NCCSV è ora v1.2. Il cambiamento è che i file sono ora file codificati UTF-8 (loro erano ASCII) e così può ora includere qualsiasi carattere Unicode come è, senza codifica come \\u_hhhhhh_, anche se questo è ancora permesso.
Quando si scrive file NCCSV,ERDDAP™ora scrive i file v1.2.
        ERDDAP™leggere ancora i file NCCSV che seguono le specifiche v1.0 e v1.1.
Grazie a Pauline-Chauvet, n-a-t-e e thogar-computer per suggerire questo e fare i test per garantire vari programmi di foglio di calcolo possono importare i file UTF-8. Grazie a Bob Simons per questo cambio di codice.
         
    * NOVITÀ: La pagina web status.html ora ha una linea vicino all'inizio che indica quale dataset loadDatasets è attualmente il caricamento e le statistiche correlate, o nessuno se nessun dataset viene caricato. Questo può essere molto utileERDDAP™amministratori che cercano di capire perché caricare I Dataset ci stanno mettendo tanto. Inoltre, il nGridDatasets, nTableDatasets, e nTotalDatasets conta qui sotto che sono ora istantanee (in precedenza, erano alla fine dell'ultimo carico maggiore Datasets) .
Questo cambiamento è per Roy Mendelssohn. Grazie a Bob Simons per questo cambio di codice.
         
    * MIGLIORE: GenerareDatasets Xml ora cambia a CF-1.10 (era CF-1.6) negli attributi "Convenzioni".
Grazie a Bob Simons per questo cambio di codice.
         
    * Alcuni piccoli cambiamenti e correzioni di bug.
         

## Versione 2.22{#version-222} 
 (rilasciato 2022-12-08) 

Si noti che questo rilascio è stato fatto da Bob Simons, mostrando così che è ancora intorno e attivo durante la transizione al suo successore.

*    **Nuove funzionalità e modifiche (per gli utenti) :** 
    *    (Nessuno)   
         
*    **CoseERDDAP™Gli amministratori devono sapere e fare:** 
    * Niente.
         
    * SICUREZZA BUG FIX: C'era un bug relativo a Cross Site Scripting nel codice per la selezione della lingua a discesa. Grazie aNOAAControllo di sicurezza per catturarlo. Questo dimostra cheNOAAla sicurezza è attivamente e di routine alla ricerca di carenze di sicurezza inERDDAP.
         
    * FISSO DI SICUREZZA: Le molte biblioteche utilizzate daERDDAP™sono stati aggiornati, come al solito, come parte di questa release. Questa volta, questo includeva l'aggiornamento del driver PostgreSQL (che aveva un bug di sicurezza) a 42.5.1.
         
    * MIGLIORATO: Più piccoli cambiamenti aERDDAPIl sistema di gestione della memoria dovrebbe ridurre la possibilità di una data richiesta in mancanza a causa della mancanza di memoria disponibile.
         
    * Alcuni piccoli cambiamenti e correzioni di bug.
         

## Versione 2.21{#version-221} 
 (rilasciato 2022-10-09) 

*    **Nuove funzionalità e modifiche (per gli utenti) :** 
    *    (Nessuno)   
         
*    **CoseERDDAP™Gli amministratori devono sapere e fare:** 
    * PERJava17, non dovresti usare \\-d64 in JAVA\\_OPTS in setenv.bat o setenv.sh. Quindi, se è lì, si prega di rimuoverlo. Credo che la modalità a 64 bit sia ora selezionata quando si scarica una versione a 64 bitJava. Grazie a Sam Woodman.
         
    * BUG FIX: A volte, il nuovo sistema di posta elettronica ha tentato di accedere troppo spesso, che ha causato server Google Email per rifiutare tutti i futuri log in tentativi. Ora, il sistema e-mail evita questo e problemi correlati.
         

## Versione 2.20{#version-220} 
 (rilasciato 2022-09-30) 

*    **Non usare v2.20. E' impeccabile.** Ma gli amministratori devono ancora fare gli elementi TO DO elencati di seguito quando si aggiorna a v2.21+.
     
*    **Nuove funzionalità e modifiche (per gli utenti) :** 
    *    (Nessuno)   
         
*    **CoseERDDAP™Gli amministratori devono sapere e fare:** 
    * MIGLIORE: Abbiamo riabilitato il vecchio sistema di gestione della memoria (Math2.ensureMemoryAvailable) e modificato il nuovo sistema di gestione della memoria (EDStatic.shedThisRequest) lavorare meglio con esso. Vedi[Stato di memoria](/docs/server-admin/additional-information#memory-status)per i dettagli.
         
    * CHANGED: Il default per&lt;ipAddressMaxRequests&gt; indatasets.xmlè stato aumentato da 7 a 15. È chiaro che alcuni legittimiWMSi clienti possono generare più di 7 richieste simultanee.
         

## Versione 2.19{#version-219} 
 (rilasciato il 2022-09-01) 

*    **Non usare v2.19. E' impeccabile.** Ma gli amministratori devono ancora fare gli elementi TO DO elencati di seguito quando si aggiorna a v2.20+.
     
*    **Nuove funzionalità e modifiche (per gli utenti) :** 
    * NUOVO: C'è una nuova funzione lato server,orderByDescending, che funziona comeorderBy, ma in ordine decrescente. Grazie ad Adam Leadbetter.
         
    * MIGLIORE: Ora, grafici (ma non le mappe) si espanderà per riempire lo spazio disponibile sulla tela, cioè lo spazio non utilizzato dalla leggenda. È possibile ottenere grafici alti, grafici quadrati, o grafici larghi aggiungendo e manipolando il &.size=_width_|parametro _height_ (dove larghezza e altezza specificano la dimensione della tela, in pixel) sulla richiesta URL. (Questa non è un'opzione sulla pagina web .graph. Devi aggiungerlo all'URL manualmente.) Se non si specifica il parametro &.size, le richieste per .smallPng, .png, .largePng, .smallPdf, .pdf e .large.pdf hanno dimensioni di tela predefinite, quindi il grafico si espanderà per riempire lo spazio disponibile, ma di solito sarà approssimativamente quadrato. Grazie a Bob Fleming.
         
*    **CoseERDDAP™Gli amministratori devono sapere e fare:** 
    * A fare:ERDDAP™ora richiedeJava17 e il relativo Tomcat 10. Dovete seguire ilERDDAP™istruzioni di installazione (o l'equivalente ad esempio, per Docker) per installareJava17 e Tomcat 10 e copiare il\\[tomcat\\]directory /content dalla tua installazione Tomcat 8 nella nuova\\[tomcat\\]directory. Non ci sono altri cambiamenti che devi apportare al tuoERDDAPinstallazione relativa a questa modifica. In altre parole,ERDDAP™funziona come prima.
        
Non dimenticare di fare ilERDDAP- modifiche correlate a server.xml e context.xml di Tomcat quando si aggiorna Tomcat. VediERDDAP'[Istruzioni per l'installazione di Tomcat](/docs/server-admin/deploy-install#tomcat).
        
La mia impressioneJava17 è che preferisce più potenza di elaborazione e memoria per applicazioni di lunga durata, più grandi comeERDDAP™, quindi funziona leggermente più lento diJava8 con computer a bassa potenza (ad esempio, 2 core e RAM minima) e funziona leggermente più veloceJava8 con computer di potenza più alti (ad esempio, 4+ core e RAM abbondante) . Quindi, se vedi prestazioni povere, usa programmi come Linux's[superiore](https://www.howtogeek.com/668986/how-to-use-the-linux-top-command-and-understand-its-output/)controllare l'utilizzo delle risorse e considerare di dareERDDAP™più risorse, in particolare più memoria. La memoria è a buon mercato&#33; La maggior parte dei telefoni hanno più processori e memoria dei server che alcuni di voi stanno usando per eseguireERDDAP&#33;
Grazie a Erin Turnbull.
         
        
    * TO DO: Se si utilizzaERDDAP™per accedere a Cassandra, per Cassandra, è necessario continuare a utilizzare la versione diJavache usavi per aver gestito la Cassandra. Basta passare aJava17 per il running Tomcat+ERDDAP.
         
    * TO DO: Raccomandato: Se la CPU del server ha 4+ core e 8+ GB di RAM, considerare di cambiare a queste impostazioni nella tuadatasets.xmlfile:
```
          <nGridThreads>3</nGridThreads>  
          <nTableThreads>3</nTableThreads>  
```

Se il server ha meno risorse, si attiene a "1" per entrambe le impostazioni.
I sistemi nThreads perEDDGridDaFiles ed EDDTable Da Files sono stati significativamente migliorati. Questi cambiamenti hanno portato ad un enorme miglioramento della velocità (ad esempio, velocità 2X quando nThreads è impostato su 2 o più) per le richieste più impegnative (quando un gran numero di file deve essere elaborato per raccogliere i risultati) . Alcuni cambiamenti correlati da Chris John porterà anche a una velocità generale durante tuttoERDDAP. Il codice per questi cambiamenti è stato contribuito da Chris John. Grazie. Chris&#33;
         
    * AVVERTENZA:datasetID's sono deprecati e non supportati più (anche se tecnicamente ancora permesso) . Probabilmente saranno licenziati nel prossimo rilascio. Se si utilizza i trattini, passare a sottolinea ora per evitare problemi. Se fai il cambiamento ora, è a tua velocità. Se aspetti fino alla prossima uscita, sarai nel panico e dovrai affrontarlo quel giorno.
         
    * NOVITÀ: Ora, per.htmlTablerisposte dei dati, se i dati in una cella di stringa contengono i dati: immagine/png;base64, seguito da un'immagine di .png codificata base64,ERDDAP™visualizzerà un'icona (in modo che l'utente può vedere l'immagine se si accumulano sopra di esso) e pulsanti per salvare il testo o l'immagine nella clipboard. Grazie a Marco Alba (che ha contribuito al codice) e Bob Simons (che lo ha modificato leggermente) .
         
    * NUOVO: -doNotAddStandardNames
Se si include \\-doNotAddStandardNames come parametro di riga di comando quando si esegue generare Datasets Xml, generare Datasets Xml non aggiungeràstandard\\_namealaddAttributesper qualsiasi variabile diversa dalle variabili denominate latitudine, longitudine, altitudine, profondità o tempo (che hanno ovviastandard\\_name#) . Questo può essere utile se si utilizza l'output da generare Datasets Xml direttamente inERDDAP™senza modificare l'output, perché generare Datasets Xml spesso indovinastandard\\_nameErroneamente. (Si noti che si consiglia sempre di modificare l'output prima di utilizzarlo inERDDAP.) Utilizzando questo parametro avrà altri effetti correlati minori perché l'ipotesistandard\\_nameè spesso usato per altri scopi, ad esempio, per creare un nuovolong\\_name, e per creare le impostazioni di ColorBar. Grazie a Kevin O'Brien.
         
    * NUOVO: ora puoi mettere&lt;aggiornamentoMaxEvents&gt;10&lt;/updateMaxEvents&gt; indatasets.xml  (in con le altre impostazioni vicino all'alto) per modificare il numero massimo di modifiche dei file (default = 10) che sarà elaborato dall'aggiornamentoEveryNMillis sistema. Un numero maggiore (100?) può essere utile quando è molto importante che il dataset venga mantenuto sempre aggiornato. Vedi il[aggiornamento documentazione MaxEvents](/docs/server-admin/datasets#updatemaxevents). Grazie a John Maurer.
         
    * NUOVO: Aggiunto supporto per globale "real\\_time= vero|falso" attributo di stringa.
Se questo è falso (il default) e se il dataset non utilizza l'aggiornamento EveryNMillis,ERDDAP™cacherà le risposte alle richieste di tipi di file in cui l'intero file deve essere creato primaERDDAP™può iniziare a inviare la risposta all'utente e riutilizzarli fino a circa 15 minuti (ad esempio,.nc#) .
Se questo è impostato a true o se il dataset utilizza l'aggiornamento EveryNMillis,ERDDAP™non cacherà mai i file di risposta e restituirà sempre i file appena creati.
Grazie a John Maurer.
         
    * NOVITÀ: Le e-mail sono ora inviate in un'email separata. Questo rende i dataset di caricamento e altre azioni che generano e-mail più velocemente perché loadDatasets non deve aspettare che l'e-mail venga inviata, che a volte richiede molto tempo. Il nuovo sistema può inviare più e-mail per sessione di posta elettronica, riducendo così il numero di login del server e-mail e riducendo il rischio di coloro che non riescono perché sono troppo frequenti. Ci sono statistiche per l'emailParla sulla pagina status.html e messaggi diagnostici in log.txt -- cerca "emailThread". Si noti che un tally di nEmailsPerSession=0, indica problemi, cioè, una sessione di posta elettronica non è stato in grado di inviare qualsiasi e-mail.
Grazie a Bob Simons.
         
    * CHANGED: Le email sono ora inviate con un codice leggermente diverso (a causa diJava17 e la modifica all'e-mail) . Se avete problemi di inviare e-mail, si prega di e-mailerd.data at noaa.gov.
         
    * NUOVO: Azioni di abbonamento che "tocca" un URL remoto sono ora gestite in un tocco separato. Questo rende i dataset di caricamento e altre azioni che toccano gli URL più velocemente perché loadDatasets non deve aspettare che il tocco venga completato, che a volte richiede molto tempo. Ci sono statistiche per il touchThread sulla pagina status.html e messaggi diagnostici in log.txt -- cercare "touchThread".
Grazie a Bob Simons.
         
    * NOVITÀ: Sulla pagina status.html, nella "Major LoadDatasets Time Series", c'è una nuova colonna "shed" che indica il numero di richieste che sono state presentate perché correnteERDDAP™l'uso della memoria era troppo alto. Le richieste che sono capannone restituiranno il codice di stato HTTP 503 "Servizio disponibile". Queste richieste non erano necessariamente un problema. Sono appena arrivati in un momento difficile. Questo faceva parte di un rinnovamento di comeERDDAP™si occupa di alto uso della memoria.
         
    * NUOVO: Su computer Unix/Linux, c'è ora una linea "OS Info" sulla pagina web status.html con le informazioni del sistema operativo corrente, compreso il carico della CPU e l'uso della memoria.
         
    * Ora, quandoERDDAP™è riavviato e rapidoRiavviare=true, EDDTableFromFiles datasets riutilizzo subset.nce distinto.nc. Per alcuni dataset, questo riduce notevolmente il tempo di caricare i dataset (ad esempio, da 60 secondi a 0,3) . Insieme con la nuova e-mailParti e attivitàParla (vedi sopra) , questo dovrebbe accelerare notevolmente il riavvioERDDAP™per moltiERDDAP™impianti. Grazie a Ben Adams e John Kerfoot.
         
    * Precedentemente, i dataset orfani (datasets che sono in direttaERDDAP™ma non sonodatasets.xml) sono stati semplicemente notati sullo stato. html e in log.txt dopo ogni carico principaleDatasets. Ora, sono automaticamente rimossi daERDDAP™e annotato su status.html e in log.txt, e email Per tutto. Quindi, se si desidera rimuovere un set di dati daERDDAP™, ora tutto quello che dovete fare è rimuovere il suo pezzo di xml indatasets.xmle sarà rimosso nel prossimo carico principaleDatasets. Grazie a Bob Simons.
         
    * KNOWN BUG in netcdf-java v5.5.2 e v5.5.3: TheEDDGridDa tre Opzione del catalogo in GenerateDatasets Xml utilizzato per lavorare per i cataloghi THREDDS che includono riferimenti ai set di dati in cataloghi THREDDS remoti. Ora non e' cosi'. Ho segnalato il problema agli sviluppatori netcdf-java.
         
    * BUG FIX: Per gli utenti Docker impostare parametri setup.xml tramiteERDDAP\\_paramName_: per parametri int e boolean (ad esempio, e-mail Smtp) ♪ERDDAP™era erroneamente alla ricerca solo _paramName_. Ora sembra.ERDDAP\\_paramName_. Grazie ad Alessandro De Donno.
         
    * CAPITOLO:ERDDAP™Il sistema di test utilizza ora un sistema automatizzato per verificare che le immagini di test appena create siano esattamente come previsto. Grazie a Chris John per il suggerimento e Bob Simons per l'implementazione.
         

## Versione 2.18{#version-218} 
 (rilasciato 2022-02-23) 

*    **Nuove funzionalità e modifiche (per gli utenti) :** 
    * NONE
*    **CoseERDDAP™Gli amministratori devono sapere e fare:** 
    * BUG FIX:.ncI file non sono stati chiusi in alcune circostanze. Ora lo sono. Grazie a Marco Alba, Roland Schweitzer, John Maurer e altri.
         

## Versione 2.17{#version-217} 
 (rilasciato 2022-02-16) 

*    **Nuove funzionalità e modifiche (per gli utenti) :** 
    * BUG FIX: Dopo le modifiche alorderBysistema alcuni anni fa, Tabledap's Make A Graph non ha gestito correttamente molte query che hanno usatoorderBy- Si'. Ora si'. Grazie a Maurice Libes.
         
    * Nelle puntate precedenti...ERDDAP™richieste respinte. trasparente Png è quando i valori di latitudine e/o longitudine erano in parte o completamente fuori portata. (ERDDAP™GitHub Issues #19, inviato da Rob Fuller -- grazie per aver postato che Rob) Ora restituisce pixel trasparenti per tutte le aree fuori gamma dell'immagine. Questo è utile per molte applicazioni client. I cambiamenti del codice per fare questo cambiamento sono stati fatti interamente da Chris John. Grazie mille, Chris&#33;
         
    * Nelle puntate precedenti...ERDDAP™respinte le richieste di Gridap qualora i valori indici per una determinata dimensione fossero\\[alto: basso\\]. Ora rende queste richieste valide scambiando i valori bassi e alti. Questo risolve un problema di lunga data per gli utenti e per i programmi esterni come xtracto che ha dovuto tenere traccia dei pochi dataset che hanno valori di latitudine che variano da alto a basso per fare richiesta come\\[ (50) : (20) \\]in modo che la richiesta nello spazio indice fosse\\[basso: alto\\]. Vedi https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplAquariusSSS3MonthV5.html Ora, una richiesta come\\[ (20) : (50) \\]per uno di questi set di dati viene interpretato automaticamente\\[ (50) : (20) \\].
         
    * Le richieste di .esriAscii ora attivano una finestra di dialogo "File: Save As" nel browser dell'utente. Grazie a Joel Van Noord.
         
    * BUG FIX: Ora, se la variabile di longitudine di un dataset bambino di unEDDGridLonPM180 oEDDGridLon0360 dataset ha unvalid\\_mine/ovalid\\_maxattributo, vengono rimossi nelEDDGridLonPM180 oEDDGridDataset Lon0360. Grazie a Roy Mendelssohn.
         
*    **CoseERDDAP™Gli amministratori devono sapere e fare:** 
    * TO DO: Se tu avessi impostato&lt;dataProviderFormActive&gt; a false per trattare temporaneamente la vulnerabilità XSS, si prega di impostare nuovamente allineare.
         
    * SICUREZZA BUG FIX: Risolto vulnerabilità XSS nel modulo Data Provider. Grazie a Genaro Contreras Gutiérrez.
         
    * BUG FIX: Quando un dirctory AWS S3 aveva più di 10000 file,ERDDAP™ha lanciato un "errore interno". Questo è ora risolto. Grazie a Andy Ziegler.
         
    * BUG FIX:EDDGridSideBySide non ha permesso alla variabilesourceNames in diversi dataset bambino per essere lo stesso. Ora si'. Grazie a Joshua Stanford.
         

## Versione 2.16{#version-216} 
 (rilasciato 2021-12-17) 

*    **Nuove funzionalità e modifiche (per gli utenti) :** 
    * VARIAZIONI: Numerose piccole modifiche al sistema di traduzione grazie a suggerimenti di editor specifici per la lingua. Grazie a Melanie Abecassis, Marco Alba, Jessy Barrette, Filipe Fernandes, Etienne Godin, Jennifer Sevadjian e Mike Smit.
         
    * ADDED un corretto disclaimer e attribuzione per Google Traduttore, come richiesto dai termini di Google Traduttore. Inoltre, il&lt;html&gt; tag in HTML per ogni pagina web ora identifica correttamente le pagine web non-inglese come essendo stato tradotto macchina. Grazie a Mike Smit.
         
    * BUG FIX: Le pagine web di login ora funzionano correttamente con diverse impostazioni di lingua. Grazie a Mike Smit.
         
    * NUOVOorderByFiltro di sumo. E nuovo Controlla tutto e deseleziona tutti i pulsanti suEDDGridPagina web del modulo di accesso dati. Grazie al contributo in codice di Marco Alba.
         
*    **CoseERDDAP™Gli amministratori devono sapere e fare:** 
    * TO DO: Se avete
        &lt;domandaMarkImageFile&gt;QuestionMark.jpg&lt;/questioneMarkImageFile&gt;
nel file setup.xml, è necessario rimuovere l'intero tag (raccomandato, quindi il file predefinito viene utilizzato) o cambiarlo a:
        &lt;domandaMarkImageFile&gt;QuestionMark.png&lt;/questioneMarkImageFile&gt;
         
    * Giusto per sapere...[Adozione](https://adoptium.net/?variant=openjdk8)ha sostituito AdoptOpenJDK come fonte principale / consigliata diJava  (OpenJDK) .
         
    * I file di registro daERDDAP™, GenerateDatasets Xml e DasDds sono ora UTF-8, non il set di caratteri predefinito del computer. Ho fatto un sacco di controllo e ho fatto alcune modifiche per garantire cheERDDAP™sempre specifica il corretto set di caratteri quando legge o scrive tutti i tipi di file, e non più (in più casi) si basa sul set di caratteri predefinito del computer. Questo ha corretto alcuni errori e si è spostato il più vicino possibile all'obiettivo di utilizzare UTF-8 per il maggior numero di tipi di file possibile (ad esempio, .log, .xml, .html,.json♪.jsonIo....ncIntestazione) . Si noti che molti tipi di file più vecchi sono tenuti a utilizzare ISO-8859-1 (ad esempio,OPeNDAP.da, .dds, .csv,.tsv♪.nc3,.nccsv,) . In precedenza ho cercato di lavorare con il gruppo CF e conUnidataper aggiungere supporto per UTF-8 in.nc3 file; entrambi erano resistenti.
         
    * NUOVO: Quando si scaricano i file da AWS S3,ERDDAP's cache Sistema FromUrl inEDDGridDaFiles ed EDDTable DaFiles ora utilizza il nuovo AWS Transfer Manager per scaricare i file tramite blocchi parallelizzati (così molto veloce) . Il throughput di destinazione è impostato a 20 Gbps, per file, quindi questo funziona bene con tutti i tipi di istanza AWS, ma soprattutto quelli che hanno eccellenti "Networking Performance". Con questo cambiamentoERDDAP's cache Dal sistema Url ora offre velocità paragonabili all'approccio di xarray di download parallelizzati di file pre-chunked, ma senza la necessità di convertire i file sorgente da.nce.hdfin file xarray schiacciati. Infatti,ERDDAPIl sistema è migliore se c'è una successiva richiesta di lettura dallo stesso file, perchéERDDAP™ora ha una copia locale del file. La nostra comunità ha passato anni a standardizzare.nce.hdffile. Ora non dobbiamo gettare tutto fuori solo per ottenere buone prestazioni quando si memorizzano i dati in AWS S3. Grazie a Rich Signell.
         
    * CHANGE: searchEngine=Lucene è, per ora, deprecato. Si tratta di un sistema complesso che spesso produce risultati che sono leggermente diversi dal comportamento più desiderabile di ricercaEngine=originale. Per quasi tuttiERDDAP™installazioni, il risparmio di tempo di Lucene non compensa le differenze dei risultati. Si prega di utilizzare searchEngine=originale, se possibile. Se questo causa problemi, si prega di e-mail Bob.
         
    * CHANGE: La ricerca LuceneEngine ora si comporta più come la ricerca originaleEngine. Non ci sono più casi in cui Lucene pensa che un set di dati corrisponda e originale no. Inoltre, le classifiche di Lucene ora uguali classifica originali (perché originale è ora sempre usato per calcolare le classifiche) .
         
    * BUG FIX: A partire da una recente pubblicazione,ERDDAP™ha smesso di vedere più dei primi 1000 oggetti in una data benna AWS S3. Ora,ERDDAP™vede di nuovo tutti gli oggetti. Grazie a Andy Ziegler.
         
    * BUG FIX: Ora EDDTableAggregate Righe rimuove ilactual\\_rangeattributo ogni volta che uno o più dei dataset bambino non conosce mai le sue variabili 'actual\\_range  (ad esempio, EDDTableFromDatabase) . Grazie a Erik Geletti.
         

## versione 2.15{#version-215} 
 (rilasciato 2021-11-19) 

*    **Nuove funzionalità e modifiche (per gli utenti) :** 
    *   ERDDAP™ha un nuovo sistema per consentire all'utente di specificare la lingua da utilizzare per tutte le pagine web. Se unERDDAP™l'installazione è impostata per utilizzarla, l'elenco delle lingue apparirà nell'angolo in alto a destra di ogni pagina web.ERDDAP™URL viene da prima che questa versione continui a funzionare e restituisca sempre il contenuto inglese, come prima.
        
Non tutti i testi o tutte le pagine web sono stati tradotti. Ci sono stati vincoli di tempo su questo progetto che ha impedito a Qi e Bob di arrivare al 100%.
        
La domanda evidente è: perché abbiamo messo così tanto sforzo in questo quando Chrome tradurrà pagine web on-the-fly? La risposta è: in questo modo, otteniamo molto più controllo su come la traduzione è fatta. In particolare, ci sono un sacco di parole che non dovrebbero essere tradotte sulle pagine web, ad esempio, i titoli e le sintesi di dataset, i nomi di variabili, parametri, unità e organizzazioni. Gran parte dello sforzo di traduzione era identificare parole e frasi che non dovrebbero essere tradotte. Inoltre, le traduzioni della macchina tendevano a raggruppare alcuni tipi di markup HTML. Gestire la traduzione ci ha permesso di minimizzare questo problema.
        
Il progetto di traduzione è stato fatto da Qi Zeng (un Google Summer of Code intern) e Bob Simons utilizzando il servizio web di traduzione di Google. Era un progetto enorme. Grazie. Qi&#33;
        
    * BUG FIX:ERDDAP™ora permette ORCID ID di avere X come ultima cifra. Grazie a Maurice Libes.
         
*    **CoseERDDAP™Gli amministratori devono sapere e fare:** 
    * A fare:
        
        * È necessario fare alcune modifiche relative aERDDAPIl nuovo sistema consente agli utenti di specificare la lingua per le pagine web.
            * Sulla prima linea del vostro setup.xml edatasets.xmli file, cambiare a: encoding="UTF-8" e cambiare la codifica del documento nell'editor di testo in modo che venga salvato come file UTF-8. Genera i dati Xml ora presume che ildatasets.xmlè un file UTF-8.
            * Programmatori che compilanoERDDAP: TuttiERDDAP™I file .java dovrebbero essere trattati come file UTF-8 per impostazione predefinita. Potrebbe essere necessario aggiungere "-encoding UTF-8" alla riga di comando javac. (L'ho fatto.) 
            * Per abilitare questo sistema (fortemente raccomandato) , nel&lt;startBodyHtml5&gt; tag che si specifica indatasets.xml, cambiare "&amp&#33;loginInfo;" in "&amp&#33;loginInfo;|&amp; Language;" in modo che l'elenco delle lingue appare nell'angolo in alto a destra di ogniERDDAP™pagina web.
            *   ERDDAP™utilizza solo&lt;startBodyHtml5&gt; tag che si specifica indatasets.xmlper specificare il contenuto HTML per il banner nella parte superiore di ogniERDDAP™pagina web, non importa quale lingua l'utente seleziona. Se cambi il tag da usare
"&EasierAccessToScientificData;" invece di "più facile accesso ai dati scientifici" e
"&BroughtToYouBy;" invece di "portarti via",ERDDAP™userà versioni tradotte di quelle frasi nel banner.
            * Allo stesso modo, il nuovo default&lt;la breve descrizioneHtml&gt; indatasets.xmlè
                
```
                <theShortDescriptionHtml><!\\[CDATA\\[ 
                <h1>ERDDAP</h1>
                &erddapIs;
                &thisParticularErddap;
                \\[standardShortDescriptionHtml\\]
                \\]\\]></theShortDescriptionHtml>
```
Le ultime 3 righe di contenuto sono cose che saranno sostituite con testo tradotto. Se si converte uno di loro (in particolare ParticolareErddap;) o tutti loro a testo esplicito indatasets.xml  (che ha priorità, se presente) o message.xml, quel testo apparirà non importa quale lingua l'utente seleziona. Questo non è perfetto, ma ho pensato che pochi amministratori vorrebbero modificare&lt;ilShortDescriptionHtml&gt; in 35 diversi file per fornire 35 diverse versioni tradotte di quel tag.
        
          
         
    * CHANGED: Alcuni errori sono ora maneggiati leggermente in modo diverso e quindi possono essere aggiunti al tally di "Richiesta Fedele" su status.html e nel Daily Report Email. Quindi questi numeri possono essere un po 'più grandi di prima.
         
    * BUG FIX: Genera i dati Xml perEDDGridLon0360 eEDDGridLonPM180 ora esclude i dataset sorgente condatasetID=~".\\*\\_LonPM180" edatasetID=~".\\*\\_Lon0360", rispettivamente.
         

## Versione 2.14{#version-214} 
 (rilasciato 2021-07-02) 

*    **Nuove funzionalità e modifiche (per gli utenti) :** 
    *    (nessuno)   
         
*    **CoseERDDAP™Gli amministratori devono sapere e fare:** 
    * NUOVO:EDDGridLon0360 che fa un set dati grigliato con valori di longitudine &gt;=0 e&lt;=360 da un set di dati grigliato con valori di longitudine &gt;=-180 e&lt;= 180. Vedi il[EDDGridLon0360 documentazione](/docs/server-admin/datasets#eddgridlon0360). Grazie a Dale Robinson.
         
    * NUOVO:ERDDAP™gli amministratori possono ora sovrascrivere qualsiasi valore in setup.xml tramite una variabile di ambiente denominataERDDAP\\__valueName_ prima di eseguireERDDAP. Per esempio, utilizzareERDDAP\\_baseUrl sovrascrive il&lt;valore baseUrl&gt;. Questo può essere utile quando si distribuisceERDDAP™con un contenitore, come è possibile mettere le impostazioni standard in setup.xml e quindi fornire impostazioni speciali tramite variabili di ambiente. Se fornisce informazioni segrete aERDDAP™tramite questo metodo, assicurarsi di controllare che le informazioni rimangano segrete.ERDDAP™solo legge le variabili di ambiente una volta all'avvio, nel primo secondo di avvio, quindi un modo per usare questo è: impostare le variabili di ambiente, avviareERDDAP™♪, aspetta fino a quando ♪ERDDAP™è iniziato, quindi unset le variabili di ambiente. Grazie a Marc Portier.
         
    * MIGLIORE: Ora, se alcuni file in un EDDTableDa... Dataset file con un sacco di file hanno alcuni valori di stringa molto lunghi, il dataset carichi molto più veloce e rispondere alle richieste molto più veloce. Negli episodi precedenti...ERDDAP™allocare un sacco di spazio per i valori di stringa min e max nei file che vengono memorizzati con informazioni di file per tali set di dati. Il file risultante era enorme, causandolo essere scritto e letto lentamente. Grazie all'OBIS.
         
    * Ora,ERDDAP™fa un lavoro migliore di interpretare sequenze di caratteri insolite e non valide nei file CSV. Grazie all'OBIS.
         
    * FIX: Dopo un anno di problemi con Cassandra, finalmente ho installato Cassandra (V) di nuovo e così è stato in grado di eseguire i test con Cassandra v2. Così ora posso affermare con più fiducia cheERDDAP™funziona con Cassandra v2 e v3. Grazie a ONC.
         

## Versione 2.12{#version-212} 
 (rilasciato 2021-05-14) 

*    **Nuove funzionalità e modifiche (per gli utenti) :** 
    * BUG FIX: Se sei nella lista nera dell'abbonamento, non puoi richiedere un elenco dei tuoi abbonamenti.
         
*    **CoseERDDAP™Gli amministratori devono sapere e fare:** 
    * TO DO: NUOVO: sistema per limitare automaticamente la capacità degli utenti dannosi e utenti legittimi eccessivamente aggressivi di fare un gran numero di richieste simultanee che degradano le prestazioni del sistema per altri utenti. Ci sono 3 nuovi tag opzionali indatasets.xmlche si può/dovrebbe aggiungere subito dopo&lt;grafoBackgroundColore &gt;
```
        <ipAddressMaxRequests></ipAddressMaxRequests>  <!-- current default=7 -->
        <ipAddressMaxRequestsActive></ipAddressMaxRequestsActive>  <!-- current default=2 -->
        <ipAddressUnlimited></ipAddressUnlimited>  <!-- default=empty -->  
```

Per ulteriori informazioni, vedere[ipAddressMaxRichiesta](/docs/server-admin/datasets#ipaddressmaxrequests).ERDDAP™anche ora stampa il "Numero di utenti unici (dall'avvio) " sulla pagina status.html.
Grazie alla persona in Cina che attacca il mioERDDAP™installazione.
         
    * CHANGE to Postgresql comportamento del driver: Quando ho aggiornato il driver Postgresql, i nomi delle colonne nell'elenco delle tabelle generati da Postgresql e GenerateDatasetsXml sono tornati tutti in maiuscolo, invece di tutti i minuscoli, come prima. Non so se questo influenzerà altre cose poiché i database spesso considerano quei nomi insensibili. Il mio set di dati di prova funziona ancora correttamente. Ma se il tuo dataset smette di funzionare con questoERDDAP™aggiornamento, questa è la possibile causa di perseguire prima.
         
    * BUG FIX:ERDDAP™ora gestisce anche i file AWS S3 privati correttamente. Ci sono stati altri miglioramenti correlati alla gestione dei file AWS S3. Grazie a Michael Gangl e Dylan Pugh.
         
    * NUOVO:EDDGridDa NcFilesEDDGridDa NcFiles Unpacked può ora leggere i dati da "strutture" in.nc4 e.hdf4 file. Per identificare una variabile che proviene da una struttura, la&lt;sourceName&gt; deve usare il formato: _fullStructureName_|_memberName_, per esempio group1/myStruct|myMember . Grazie a NRL.
         
    * SUGGERIMENTO: Ora, se l'utilizzo della memoria corrente più questa richiesta è anche leggermente alta, set di griglie nThreads per questa richiesta a 1. Così,ERDDAP™conserva la memoria quando la memoria è scarsa. Grazie alla persona in Cina che attacca il mioERDDAP™installazione.
         
    * NUOVO sistema per monitorare il numero di file aperti (che include prese e alcune altre cose, non solo file) in Tomcat su computer Linux. Se alcuni file erroneamente non vengono mai chiusi, il numero di file aperti può aumentare fino a quando non supera il massimo consentito e molte cose davvero brutte accadere. Così ora, su computer Linux (le informazioni non sono disponibili per Windows) :
        
        * C'è una nuova colonna "Apri file" nell'estrema destra della pagina web status.html che mostra il per cento dei file max aperti. Su Windows, mostra solo "?".
        * QuandoERDDAP™genera tali informazioni alla fine di ogni importante reload dataset, stamperà al registro. file txt:
OpenFileCount=_current_ di max=_max_ %=_percent_
        * Se la percentuale è &gt;50%, una e-mail viene inviata alERDDAP™amministratore e l'email Tutto A indirizzi e-mail.
        
Per saperne di più, o se vedi questo problema sul tuoERDDAP™, vedi[Troppi file aperti](/docs/server-admin/additional-information#too-many-open-files).
Grazie alla persona in Cina che attacca il mioERDDAP™installazione.
         
    * NUOVO: Ho aggiunto un sacco di controllo e gestione di "Too molti file aperti", quindi l'attività si ferma e l'utente vede il messaggio di errore. I file di dati non saranno più contrassegnati come cattivi se la lettura loro si traduce in un errore "troppo molti file aperti".
         
    * NUOVO\\[BigParentDirectory\\]directory /badFilesFlag:
Se si inserisce un file in questa directory con undatasetIDcome il nome del file (il contenuto del file non importa) ♪ERDDAP™cancellerà il BadFiles.ncfile per quel dataset (se c'è) e ricaricare il dataset al più presto. Questo provocaERDDAP™per provare di nuovo a lavorare con i file in precedenza (Erroneamente?) marcato come male. Grazie a Marco Alba.
         
    * Al momento dell'avvio, se unEDDGridDa...Files o EDDTableDa... File dataset inizialmente ha 0 file nella sua lista di file validi noti (ad esempio, è un nuovo set di dati) AlloraERDDAP™sgonfia caricandolo e imposta una bandiera in modo che sarà caricato ASAP dopo il carico principaleDatasets è finito. Questo velocizza l'avvio iniziale quando ci sono nuovi set di dati.
         
    * MODIFICATO: FileVisitorDNLS.testAWSS3 () e FileVisitorSubdir.testAWSS3 () ; ora utilizzare il AWS v2 (non c'è) SDK. Così ora il GitERDDAP™distribuzione ora include tutti i file necessari e non è più necessario aggiungere manualmente il file enorme v1 AWS SDK jar.
         
    * CHANGED: Ho passato ad usare Maven per rilevare/raccontare le dipendenze (i file .jar in /lib) . Il cambiamento a v2 del SDK AWS ha richiesto questo. Sarà necessario per altri codici importati in futuro. Un enorme grazie a Kyle Wilcox che ha fornito il pom.xml che ha creato e utilizza, che ha risolto diversi problemi per me.
         
    * CHANGED: Il parametro classpath (- Cosa?) usato in GenerateDatasetXml, DasDds e altri piccoli programmi che vengono conERDDAP™, e nel consiglio ai programmatori è ora molto più semplice e non dovrebbe mai più cambiare poiché si riferisce alla directory, non ai singoli file:
\\-cp class;C:\\\programs\\\\_tomcat\\\\lib\\servlet-api.jar;lib\\\\*
         (o ':' invece di ';' per Linux e Mac) .
         (Avrei dovuto farlo anni fa quando e' diventata un'opzione.)   
         
    * NUOVO: Genera i dati Xml ha una nuova opzione di utilità: trovareDuplicateTime che cercherà attraverso una raccolta di grigliate.nc  (e relative) file per trovare file con valori di tempo duplicati. Vedi[trovareDuplicato Tempo](/docs/server-admin/datasets#findduplicatetime)  
         
    * NUOVO:datasets.xmlpuò ora includere un&lt;tags&gt; che sovrascrive il&lt;palettes&gt; valore tag da messaggi.xml (o ritorna al valore di message.xml se è vuoto) . Questo consente di modificare l'elenco delle palette disponibili mentreERDDAP™sta correndo. Inoltre, se si dispone di una sottodirectory cptfiles nellaERDDAP™directory dei contenuti,ERDDAP™copiare tutti i file \\*.cpt in quella directory nella\\[tomcat\\]/webapps/erddap/WEB-INF/cptfiles directory ogni voltaERDDAP™Comincia. Insieme, queste modifiche consentono di aggiungere palette e hanno le modifiche persistono quando si installa una nuova versione diERDDAP. Vedere la[documentazione](/docs/server-admin/datasets#palettes)  
Grazie a Jennifer Sevadjian, Melanie Abecassis, e forse altre persone CoastWatch.
         
    * [&lt;rallentare il problemaMillis&gt;] (/docs/server-admin/datasets#slowdowntroublemillis) è ora utilizzato per tutte le richieste fallite, non solo alcuni tipi.
         
    * CHANGED: Il filetto RunLoadDatasets interrompe il thread LoadDatasets a 3/4 LoadDatasets MaxMinutes quindi c'è più tempo per LoadDatasets per notare l'interruzione e l'uscita con grazia. Inoltre ci sono sempre più messaggi diagnostici per questo.
         
    * CAMBIATO dalla vecchia versione di Lucene a v8.7.0.
         
    * E-mail inviate daERDDAP™ora appaiono con un carattere di larghezza fissa.
         
    * CHANGE:EDDGridDaFiles ora ottiene i valori dell'asse e gli attributi da FIRST|File LAST, come specificato in&lt;metadatida&gt;. Grazie. (non) a Ken Casey, et al.
         
    * Supporto ADDED per le unità non valide "grad\\_North" e "grad\\_East" che sono erroneamente utilizzate dai file recenti (dal 2020-10-01) nella versione AVHRR Pathfinder 5.3 L3-Collato (L3C) Impostazioni dati SST (QUESTOsstd1day e nceiPH53sstGiorno) .ERDDAP™può ora standardizzarli a unità valide. Grazie. (non) a Ken Casey, et al.
         

## Versione 2.11{#version-211} 
 (rilasciato 2020-12-04) 

*    **Nuove funzionalità e modifiche (per gli utenti) :** 
    * BUG FIX: OrderByMean ha lanciato un NullPointerException se una variabile aveva solo uno di \\_FillValue o mancante\\_ Valore definito. Ora gestisce correttamente la situazione. Grazie a Marco Alba.
         
    * BUG FIX: Ci sono stati problemi con i file di testo ODV creati daERDDAP™in v2.10. Quei problemi sono risolti. Grazie a Shaun Bell.
         
    * BUG FIX: Solo...ERDDAP™v2.10: Se i limiti di lat lon sono stati specificati nell'URL, la casella di rilegatura non è stata disegnata sulla mappa del mondo. Ora è di nuovo. Grazie a John Maurer.
         
*    **CoseERDDAP™Gli amministratori devono sapere e fare:** 
    * BUG FIX: Solo...ERDDAP™v2.10: I file di script per ArchiveADataset, GenerateDatasets Xml e DasDds non hanno funzionato perché non avevano i cambiamenti al classpath che sono stati aggiunti conERDDAP™v2.10. Ora lo fanno. Grazie a Marco Alba.
         
    * NUOVO: Indatasets.xml, si può ora avere il tag:
```
        <emailDiagnosticsToErdData></emailDiagnosticsToErdData> <!-- true (the default) or false -->  
```

Attualmente, se vero (o se il tag è vuoto, o se il tag non è nel file) , quando la richiesta di un utente porta a un NullPointerException,ERDDAP™e-mail la traccia stack aerd.data at noaa.gov  (ilERDDAP™team di sviluppo) . Questo dovrebbe essere sicuro e sicuro in quanto nessuna informazione riservata (ad esempio, la richiesta) è incluso nell'email. Questo dovrebbe consentire di catturare eventuali bug oscuri e totalmente inaspettati che portano a NullPointerExceptions. In caso contrario, l'utente vede le eccezioni, ma ilERDDAP™Gli sviluppatori no, quindi non sappiamo che c'è un problema che deve essere risolto.
        
È possibile che questo tag porterà ad altre informazioni diagnostiche simili che vengono inviate via emailerd.data at noaa.govin futuro. Il contenuto dell'email sarà sempre minimo e relativo a bug, e non, per esempio, le informazioni sull'utilizzo. Grazie a Marco Alba.
         
        
    * CAMBIATO: Ora, comuni tipi di file compressi (.bz2♪.gz♪.gzip♪.tar♪.tgz♪.z♪.zip) sono anche vietati per le richieste di range byte. Questo è specificato tramite&lt;estensioniNoRangeRequests&gt; in message.xml.
         
    * KNOWN PROBLEM: ComeERDDAP™2.10,.nci file ml che cercano di cambiare un attributo, non cambiano l'attributo. Questo è un bug noto in netcdf-java che ho segnalato e dicono che sarà fissato nella prossima release di netcdf-java.
         

## Versione 2.10{#version-210} 
 (rilasciato 2020-11-05) 

*    **Nuove funzionalità e modifiche (per gli utenti) :** 
    * NUOVO: Il nuovo[Interpolare](https://coastwatch.pfeg.noaa.gov/erddap/convert/interpolate.html)il convertitore interpola efficacemente i valori di un dataset grigliato. Come tale, è particolarmente utile per i ricercatori che lavorano con i dati della traccia animale. Questo convertitore prende in una tabella con latitudine, longitudine e colonne di tempo (e forse altre colonne) e restituisce una tabella con colonne aggiuntive con valori interpolati. Così, questo è simile al popolare[Xtractomatico](https://coastwatch.pfeg.noaa.gov/xtracto)script originariamente creato da Dave Foley, ma offre il vantaggio di elaborare fino a 100 punti per richiesta. Grazie a Dave Foley e Jordan Watson (NMFS) .
         
    * MIGLIORE: Ricerca avanzata è ora rigorosa per richieste non.html. Ora getterà delle eccezioni per le richieste che hanno errori permanenti (ad esempio, richieste dove minLat &gt; maxLat) o errori temporanei (ad esempio, richieste distandard\\_nameche non esiste) . Per le richieste .html, la Ricerca Avanzata è invariata: come per le ricerche di Google, fa il suo meglio e silenziosamente corregge o ignora gli errori. Grazie a Rich Signell.
         
    * MIGLIORE: La mappa nella pagina di Ricerca avanzata è ora più grande (si deve ancora squint, ma meno) e significativamente più accurato (ma ancora non perfetto) . Grazie a John Maurer.
         
    * MIGLIORE: L'impostazione "Maschera di terra" su Make A Graph pagine web e l'impostazione &.land=... in URL che richiedono una mappa ora supporta altre due opzioni:
"outline" disegna solo il profilo della maschera di terra, confini politici, laghi e fiumi.
"off" non disegna niente.
Vedere la[&.land=... documentazione](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands).
Grazie a John Maurer.
         
    * MIGLIORE: Grafi e mappe create daERDDAP™può ora utilizzare tre nuovi tipi di marcatori: Quadrato riempito senza bordi, cerchio riempito senza bordi, triangolo riempito senza bordi. Il codice per questo è stato contribuito da Marco Alba di ETT / EMODnet Physics. Grazie a Marco Alba.
         
    * NUOVO:"files"il sistema ora supporta Risposte del tipo di file (.csv,.htmlTable♪.itx♪.json♪.jsonlCSV1♪.jsonlCSV♪.jsonlKVP♪.mat♪.nc♪.nccsv♪.tsvo.xhtml.) Per esempio,[ https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv ](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv).
Grazie a Kyle Wilcox.
         
    * MIGLIORE: Gli URL generati quando un utente utilizza un modulo di accesso dati (.html) o un Make-A-Graph (.) pagina web ora correttamente per cento codificare i caratteri\\[e\\]. Questo rende gli URL un po 'più difficile per gli esseri umani di leggere, ma è meglio da un punto di vista di sicurezza web. Gli amministratori ora hanno la possibilità di impostare rilassatoQueryChars= '\\[\\]|' nel file Tomcat server.xml (meno sicuro) o no (più sicuro) .
Grazie a Antoine Queric, Dominic Fuller-Rowell e altri.
         
    * NUOVO: Se una richiesta a un set di dati EDDTable include &add Variabili Dove? (_attributo Nome, attributo Valore) ♪ERDDAP™aggiungerà tutte le variabili che hanno _attribute Nome=attributo Valore_ all'elenco delle variabili richieste.
Vedere la[&add Variabili Dove documentazione](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#addVariablesWhere). Grazie a Aurelie Briand, et al.
         
    * CAMPIATO:ERDDAP™ora rifiuta le richieste della gamma byte a /files/.nco.hdffile. Non cercare di connettersi a distanza.nco.hdffile come se fossero file locali. È orribilmente inefficiente e spesso causa altri problemi. Invece:
        * Uso(OPeN)DAPsoftware client per connettersi aERDDAP'DAPservizi per questo dataset (che hanno /griddap/ o /tabledap/ nell'URL) . Ecco cosa.DAPè per.
        * Utilizzare il modulo di accesso dati del dataset per richiedere un sottoinsieme di dati.
        * Se avete bisogno dell'intero file o dell'accesso ripetuto per un lungo periodo di tempo, utilizzarecurl♪wget, o il browser per scaricare l'intero file, quindi accedere ai dati dalla copia locale del file.
             
    * MIGLIORATO: il .odv L'opzione di uscita Txt è stata riscritta per supportare la nuova versione diODV .txtfile e per supportare la corretta rappresentazione di traiettoria, timeerie e dati del profilo.
         
    * MIGLIORE: Ora, i termini di ricerca in doppie citazioni sono interpretati come una stringa json, in modo da poter avere \\ caratteri codificati. Tra le altre cose, questo ti permette di cercare una corrispondenza esatta per un attributo, ad esempio, "instituzione=NOAA\\n"non corrisponderà a un set di dati con l'istituzione=NOAA NMFS. Grazie a Dan Nowacki.
         
    * MIGLIORATO: In posti aggiuntivi, numeri di punti galleggianti (soprattutto carri convertiti in doppi) ora appaiono come una versione leggermente più arrotondata del numero in posti aggiuntivi, ad esempio un galleggiante precedentemente mostrato come un doppio come 32.27998779296875, potrebbe ora apparire come 32.28. Grazie a Kyle Wilcox.
         
    * BUG FIX: i file audio interi non firmati sono stati letti leggermente in modo errato. Ora sono letti correttamente.
         
*    **CoseERDDAP™Gli amministratori devono sapere e fare:** 
    * AVVERTENZA: La prima volta che si esegueERDDAP™v2.10, alcuni set di dati in base ai file di dati locali verranno caricati **Molto bene.** lentamente perchéERDDAP™deve ricreare il suo database di informazioni sui file. Dopo il lento ricarica iniziale, si carica rapidamente, come prima. Sii paziente.
         
    * Cose che devi fare:
        * Quando si esegue v2.10, alcuni set di dati potrebbero non caricare perchéERDDAP™è ora più rigoroso di alcuni metadati. Come prima,ERDDAP™vi e-mail un rapporto giornaliero quando si carica prima. Ciò includerà i messaggi di errore per ciascuno dei set di dati che non hanno caricato. Leggi i messaggi di errore per capire i problemi. Nella maggior parte dei casi, è sufficiente fare un piccolo cambiamento ai metadati del dataset per risolvere il problema.
             
        * Indatasets.xml, cercare&lt;sourceName&gt;= (nota la'='segno, che identifica un[valore fissosourceName](/docs/server-admin/datasets#fixed-value-sourcenames)) . Per la maggior parteERDDAP™configurazioni, sono rare. Se uno dei valori dopo'='sono stringhe (non numeri) , DEVE ora racchiudere la stringa in doppie citazioni. Per esempio,
Prima:&lt;sourceName&gt;=KZ401&lt;/sourceName&gt;
Dopo:&lt;sourceName&gt;="KZ401"&lt;/sourceName&gt;
             
        * NUOVO: C'è una nuova impostazione opzionale in setup.xml,&lt;defaultAccessibleViaFiles&gt;, che imposta il default&lt;accessibileViaFiles&gt; per ciascuno dei set di dati. Il default di questo nuovo tag è falso, che imita il precedenteERDDAP™comportamento. Questa impostazione di livello inferiore può essere sovrastampata da un dato dataset&lt;Impostazione ViaFiles&gt; accessibile.
            
RACCOMANDATO (perché ci sono utenti che vogliono questo) :
Se vuoi fare tutto EDD... FromFiles datasets accessibile tramite il file system, quindi
            
            1. Aggiungi questo tag al file setup.xml:
```
                <defaultAccessibleViaFiles>true</defaultAccessibleViaFiles>
```
            2.   (Opzionalmente) Rimuovi tutto
```
                <accessibleViaFiles>true</accessibleViaFiles>
```
indatasets.xmldal momento che il default è ora vero.
                 
        * Aggiungi gli attributi \\_FillValue:
            ERDDAP™usato per avere un valore predefinito \\_FillValue per tutte le variabili integer: il valore massimo del tipo di dati (ad esempio, 127 per variabili byte) . Ora non e' cosi'. Per evitare di avere questi valori indicati come valori di dati (valori non mancanti) , è necessario indicare esplicitamente questi attributi via \\_FillValue. D'ora in poi, ogni volta che iniziERDDAP™, invierà all'amministratore un'email con una tabella .csv con un elenco di variabili di origine interi che non hanno \\_FillValue omissing\\_valueattributi, e i nuovi attributi \\_FillValue suggeriti. Vedi[Aggiungi \\_Fill Attributi di valore](/docs/server-admin/datasets#add-_fillvalue-attributes)per ulteriori informazioni e istruzioni.
             
        * Se compilateERDDAP™, è necessario modificare il parametro classpath sulle linee di comando javac per aggiungere un riferimento a questi nuovi vasi: lib/commons-jexl.jar;lib/aws-java-sdk.jar;lib/jackson-annotations.jar;lib/jackson-core.jar;lib/jackson-databind.jar .
             
    * CAMBIATO: Tomcat 9 è ora la versione consigliata di Tomcat perERDDAP. L'ultima versione di Tomcat 8.5+ è anche eccellente per ora. Abbiamo ripulitoERDDAP'[Istruzioni per l'installazione di Tomcat](/docs/server-admin/deploy-install#tomcat).
        
L'ultima versione diJava8 (nonJava9, 10, 11, ...) da[AdoptOpenJDK](https://adoptopenjdk.net/)rimane la versione consigliata diJavaperERDDAP.Java8 ha supporto a lungo termine da AdoptOpenJDK quindi rimane sicuro da usare, ma ricorda di ottenere l'ultima versione di esso periodicamente per motivi di sicurezza.
        
    * NUOVO: Fonti di script / Variabili derivati in set di dati tabulari
EDDTableFromFiles, EDDTableFromDatabase e EDDTableFromFileNames datasets possono ora includere espressioni e script nellesourceName. Questo consente di effettuare nuove variabili in base alle variabili esistenti nei file sorgente. Il calcolo per una data nuova variabile viene effettuato in una riga dei risultati, ripetutamente per tutte le righe. Ad esempio, per fare una longitudine variabile con valori nella gamma -180 - 180° da una variabile con valori nella gamma 0 - 360°:
        &lt;sourceName&gt;=Math2.anglePM180 (file.columnDouble ("lon") ) &lt;/sourceName&gt;
Per i dettagli, vedere[Script SourceNames](/docs/server-admin/datasets#script-sourcenamesderived-variables)  
Grazie a Bob Simons (chi ha pianificato questoERDDAP™v1.0 e finalmente trovato un modo per implementarlo) , Kevin O'Brien, Roland Schweitzer, John Maurer e la libreria Apache JEXL per fare la parte davvero difficile (e facendolo bene) .
         
    * NUOVO: tipi di dati interi non firmati (ubyte, ushort, uint, ulong) sono ora supportati. Si noti che molti tipi di file (ad esempio, .das, .dds,.nc3) non supportano tutti questi nuovi tipi di dati. Vedi il[Dati Tipo di documentazione](/docs/server-admin/datasets#data-types)per dettagli su comeERDDAP™si occupa di queste differenze. In particolare, da quando(OPeN)DAP, in particolare la risposta .dds, non supporta byte firmate, longs o ulongs, si può desiderare di utilizzareERDDAP'rappresentazione tabulare di .das e .das come visto nellahttp... **Informazioni** #datasetID_.html pagina web (per esempio,[ https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html) ) che si può anche ottenere in altri tipi di file o.nccsvRisposta dei metadati (per esempio,[ https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata) ) , entrambi supportano tutti i tipi di dati in tutte le situazioni.
        
ATTENZIONE: Per i dataset che sono interessati da questa modifica, è possibile che si vedranno problemi con il dataset perché i dati cheERDDAP™le letture dalla fonte possono essere diverse (ad esempio, le variabili precedentemente lette come interi firmati possono ora essere lette come interi non firmati) . I problemi conseguenti includono: nuovi file che non vengono aggiunti al dataset e/o errori quando si tenta di accedere ai dati. Se un dataset ha problemi, la prima cosa da provare è quello di[impostare un duro Bandiera](/docs/server-admin/additional-information#hard-flag)per il dataset. Se questo non risolve il problema, allora devi guardare il log. txt per vedere i messaggi di errore, approfondiredatasets.xmlper il dataset, e/o forse rerun generaDatasets.xml per il dataset.
Grazie a netcdf-java 5.x (che ha costretto il problema) e il prossimo CF 1.9.
        
    * MIGLIORE: C'è ora[migliore documentazione / consulenza](/docs/server-admin/datasets#s3-buckets)per come creare un set di dati da file in secchi AWS S3. Grazie a Micah Wengren.
         
    * CAMPIATO: Ci sono diverse modifiche relative al"files"sistema.
        * Il codice per gestirlo è stato riscritto per essere utilizzabile da più classi.
             
        * NUOVO: Le richieste dell'utente per gli elenchi delle directory possono ora richiedere che la risposta sia uno dei tipi di tabella normale standard applicando l'estensione del file desiderato: .csv,.htmlTable♪.itx♪.json♪.jsonlCSV1♪.jsonlCSV♪.jsonlKVP♪.mat♪.nc♪.nccsv♪.tsvo.xhtml). Per esempio,
            [ https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv ](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv)  
Grazie a Kyle Wilcox e Shane St Savage.
             
        * MIGLIORE: Ora, Generare Datasets Xml non include un&lt;accessViaFiles&gt; tag in uscita. Il presupposto è che il dataset si affida al valore del nuovo&lt;defaultAccessibleViaFiles&gt; tag in setup.xml. Vedi[accessibile ViaFiles](/docs/server-admin/datasets#accessibleviafiles).
             
        * MIGLIORE: Ulteriori tipi di dataset ora supportano accessibili ViaFiles:EDDGridSideBySide,EDDGridAggregateExistingDimension,EDDGridDa Erddap, EDDTableFromErddap,EDDGridDaEDDTable, EDDTableFromEDDGrideEDDGridDa Etopo. Per questi, i file di un dato set di dati remoto/bambino saranno accessibili solo se sia il genitore che il set di dati remoto/bambino sono accessibili ViaFiles a true (forse via&lt;defaultAccessibleViaFiles&gt;). Grazie a Damian Smyth e Rob Fuller.
             
        * TO DO / RACCOMANDAZIONE: Si consiglia di rendere accessibili tutti i relativi set di dati tramite il sistema di file impostando&lt;defaultAccessibleViaFiles&gt; true in setup.xml perché c'è un gruppo di utenti per i quali questo è il modo preferito per ottenere i dati. Tra le altre ragioni,"files"sistema rende facile per gli utenti di vedere quali file sono disponibili e quando sono cambiati, rendendo così facile per un utente mantenere la propria copia dell'intero dataset. Se di solito non si desidera rendere i set di dati accessibili tramite il file system, impostare&lt;defaultAccessibleViaFiles&gt; a false. In entrambi i casi, basta usare&lt;accessibileViaFiles&gt; per i pochi set di dati che sono eccezioni alla politica generale stabilita da&lt;defaultAccessibleViaFiles&gt; (per esempio, quando il dataset utilizza.ncfile ml, che non sono davvero utili per gli utenti) .
             
    * MIGLIORATO: Ora, se un set di dati sorgente ha informazioni di griglia CF\\_mapping, generare Datasets Xml per i set di dati grigliati aggiungerà le informazioni a globale&lt;addAtts&gt; e le informazioni saranno aggiunte a livello globale&lt;fonteAtts&gt; ogni volta i dati vengono letti dal file. Le informazioni verranno visualizzate negli attributi globali del dataset come un insieme di attributi con la griglia prefisso\\_mapping\\_ .
         
    * MIGLIORE: Supporto per gruppi durante la lettura.nc4 (e in una certa misura.hdf5) file. Generalmente, unERDDAP™dataset sarà costruito dalle variabili in uno dei gruppi del file. Inoltre, GenerateDatasets Xml perEDDGridDa NcFilesEDDGridDa NcFiles Unpacked ora chiede un "gruppo" (ad esempio, "" per tutti i gruppi, "someGroup", "someGroup/someSubGroup", o "\\[radice di radice\\]" solo per il gruppo radice) . Grazie a Charles Carleton e Jessica Hausman.
         
    * MIGLIORE: GenerareDatasets Xml perEDDGridDa NcFilesEDDGridDa NcFiles Unpacked ora supporta un parametro opzionale "DimensionsCSV" che consente di specificare i nomi di origine delle dimensioni che si desidera utilizzare. Utilizzare "" per ottenere le variabili che utilizzano più dimensioni, come prima. Inoltre, un piccolo bug correlato che si è verificato con questo tipo di file è ora fissato. Grazie a Sujal Manandhar.
         
    * BUG FIX: Genera i dati Xml elenca ora correttamente "EDDTableFromJsonlCSVFiles" (non "EDDTableFromJsonlCSV") come una delle opzioni EDDType. Grazie a Andy Ziegler.
         
    * MIGLIORE:EDDGridDa NcFiles Unpacked ora standardizza gli attributi "unità" a udunits standard/"canonical" (lo stesso metodo del convertitore Unità) . Per esempio,"meter per second"♪"meters/second"♪"m.s^-1"e"m s-1"tutti diventano"m s-1". Grazie a Andy Ziegler.
        
ATTENZIONE: È possibile che questo causerà problemi per alcuni set di dati esistenti (ad esempio, causare nuovi file da etichettare "cattivo") . Se è così,[impostare un duro Bandiera](/docs/server-admin/additional-information#hard-flag)per il dataset in modo che tutti i file sorgente saranno rileggere con il nuovo sistema.
        
    * MIGLIORE: Ora, una variabile&lt;sourceName&gt; può specificare un valore fisso di = NaN e la variabile può avere unactual\\_rangeattributo che specifica un intervallo finito. Questo è a volte utile in modo che un dataset (in particolare un set di dati EDDTableFromFileNames) può avere una variabile fitta (#)   (ad esempio, latitudine, longitudine, tempo) con valori fissi di NaN, ma con un validoactual\\_range  (come impostato dall'attributo) . Quindi, in Ricerca Avanzata un utente può cercare set di dati che hanno dati in una latitudine specifica, longitudine, intervallo di tempo e questo dataset sarà in grado di dire che ha dati rilevanti (anche se tutte le righe reali di dati mostrerà NaN) . Vedere la[documentazione del valore fisso](/docs/server-admin/datasets#fixed-value-sourcenames).
Grazie a Mathew Biddle.
         
    * NUOVO: Ora, ildatasets.xmlchunk per un EDDTableFromAsciiFiles o EDDTableFromColumnarAsciiFiles dataset può includere un tag che diceERDDAP™ignorare tutte le righe nella parte superiore del file fino a e compresa la linea che corrisponde all'espressione regolare specificata. Per esempio,
        &lt;FORMAZIONE PROFESSIONALE\\*#\\*#\\*FINE DI HEADER.\\*&lt;/SkipHeaderToRegex&gt;
ignorerà tutte le righe fino a e tra cui una linea che inizia con "\\*\\*FINE DI HEADER». Vedere il [&lt;skipHeaderToRegex&gt; documentazione] (/docs/server-admin/datasets#skipheadertoregex) .
Grazie a Eli Hunter
         
    * NUOVO: Ora, ildatasets.xmlchunk per un EDDTableFromAsciiFiles o EDDTableFromColumnarAsciiFilesdataset può includere un tag che diceERDDAP™ignorare tutte le righe del file che corrispondono all'espressione regolare specificata. Per esempio,
```
        <skipLinesRegex>#.\\*</skipLinesRegex>  
```

salterà tutte le linee che iniziano con "#". Vedere il [&lt;skipLinesRegex&gt; documentazione] (/docs/server-admin/datasets#skiplinesregex) .
Grazie a Eli Hunter.
         
    * NUOVO:datasets.xmlchunk per qualsiasi dataset EDDTable può ora includere &add Variabili Dove? (_attributeNamesCSV_) . Se lo fa,ERDDAP™aggiungerà un widget per ogni attributo specificato Nomi al modulo di accesso dati del dataset (Pagina web .html) per rendere facile per gli utenti aggiungere &add Variabili Dove? (_attributo Nome, attributo Valore) alla richiesta.
Vedere la[&add Variabili Dove documentazione](/docs/server-admin/datasets#addvariableswhere).
Grazie a Aurelie Briand, et al.
         
    * NUOVO Strumento di terze parti:ERDDAP- Ci siamo.
        ERDDAP-lint è un programma di Rob Fuller e Adam Leadbetter dell'Irish Marine Institute che è possibile utilizzare per migliorare i metadati del vostroERDDAP™Datasets.ERDDAP-lint "contiene regole e una semplice applicazione web statica per eseguire alcuni test di verifica contro il vostroERDDAP™server. Tutti i test sono eseguiti nel browser web." Come[Unix/Linux lint tool](https://en.wikipedia.org/wiki/Lint_(software)), è possibile modificare le regole esistenti o aggiungere nuove regole. Vedi[ERDDAP- Ci siamo.](https://github.com/IrishMarineInstitute/erddap-lint)per maggiori informazioni.
        
Questo strumento è particolarmente utile per i set di dati che hai creato qualche tempo fa e ora vuoi aggiornarti con le tue preferenze dei metadati attuali. Ad esempio, le prime versioni di GenerateDatasets Xml non ha messo alcuno sforzo nella creazione globalecreator\\_name♪creator\\_email, creatore\\_type, ocreator\\_urlmetadati. Potresti usareERDDAP-lint per identificare i set di dati che mancano quegli attributi dei metadati.
        
Grazie a Rob e Adam per la creazione di questo strumento e renderlo disponibile alERDDAP™comunità.
        
    * NUOVO: Ora va bene se alcuni dei file in unEDDGridFromFiles dataset non ha tutte le variabili del dataset. I file saranno inclusi come se avessero le variabili (con tutti i valori mancanti) .
Grazie a Dale Robinson e Doug Latornell.
         
    * NUOVO: Ci sono nuove statistiche di utilizzo nel file di registro e nel Report giornaliero per aiutare gli amministratori a identificare gli utenti che stanno causando problemi di memoria. Le statistiche si chiamano "OutOfMemory (Dimensione dell'array) "OutOfMemory" (Troppo grande) ", e "OutOfMemory (Troppo grande) ". Essi mostrano gli indirizzi IP degli utenti che hanno fatto richieste in queste categorie e il numero di richieste che hanno fatto. Se non ci sono state richieste fastidiose, queste statistiche non appaiono. "OutOfMemory" (Dimensione dell'array) " e "OutOfMemory" (Troppo grande) " le richieste di solito non sono un problema perché le richieste erano così grandi cheERDDAP™catturati rapidamente e restituito un messaggio di errore. The "OutOfMemory (Troppo grande) " le richieste sono più pericolose perchéERDDAP™ha fatto qualche sforzo prima che si rendesse conto che non c'era abbastanza memoria attualmente disponibile per gestire la richiesta (anche se il problema può essere altre richieste prima di queste richieste) .
        
Ci sono anche nuove statistiche denominate "Large Request, indirizzo IP" che mostrano gli indirizzi IP degli utenti che hanno fatto grandi richieste (attualmente, grigliato.ncfile &gt; 1 GB) .
        
Inoltre, la tabella delle serie temporali sulla pagina status.html ora include una colonna "memFail" che mostra il numero di richieste che non sono state presentate con "OutOfMemory (Troppo grande) " errori dall'ultimo importante Dataset di carico. Qualsiasi numero diverso da 0 qui è almeno qualche motivo di preoccupazione.
Grazie a Bob Simons.
        
    * NOVITÀ: La nuova versione diHyraxvisualizza elenchi directory in modo diverso rispetto a prima.ERDDAP™può ora leggere i vecchi e nuovi elenchi di directory.
         
    * NUOVO: Ricarica dati e risposte utente che richiedono &gt;10 secondi per finire (con successo o senza successo) sono contrassegnati con " (10&#33;) ". Così, è possibile cercare il file log.txt per questa frase per trovare i set di dati che erano lenti a ricaricare o il numero di richiesta delle richieste che erano lente a finire. Si può quindi guardare più in alto nel file log.txt per vedere che cosa il problema dataset era o che cosa la richiesta dell'utente era e da chi era. Questi carichi di dataset lenti e le richieste degli utenti sono a volte tassando suERDDAP. Così sapere di più su queste richieste può aiutare a identificare e risolvere i problemi.
    * MIGLIORE: Quando si convalida un dataset CF DSG,ERDDAP™ora assicura che le variabili con attributi cf\\_role siano nell'elenco corrispondente cdm\\_...\\_variables e non sono in altri elenchi cdm\\_...\\_variables. Ad esempio, se un timeseriesProfile dataset ha una variabile "station\\_id" che ha l'attributo cf\\_role=timeseries\\_id, allora "station\\_id" deve essere nell'elenco cf\\_timeseries\\_variables, ma non deve essere nell'elenco cf\\_profile\\_variables.
Grazie a Micah Wengren.
         
    * MIGLIORE: 'Semplificare' è ora più veloce, usa meno memoria e può restituire LongArray. Grazie aUnidata.
         
    * MIGLIORE: QuickRestart è ora significativamente più veloce per EDDTableFrom (nc relativo) File (eccetto EDDTableFromNcCFFiles e EDDTableFromInvalidCRAFiles) perché Attesi (e un altro posto) ora legge i metadati del file campione invece di leggere tutti i dati. Grazie a Jessica Austin.
         
    * MIGLIORE: C'è ora il supporto per le stringhe di tempo con precisione maggiore di-the-millisecond se le cifre aggiuntive sono tutte 0's, ad esempio, "2020-05-22T01:02:03.456000000Z". Grazie a Yibo Jiang.
         
    * MIGLIORE: GenerateDatasetsXml EDD.suggestDestinationName usato per rimuovere '(' e tutto dopo. Ora rimuove (.\\*) solo se questa è la fine dellasourceName. Ora rimuove anche\\[.\\*\\]solo se questa è la finesourceName. Grazie a Julien Paul.
         
    * MIGLIORE: GenerareDatasets Xml ora rende la variabiledestinationNames unico da aggiunto \\_2, \\_3, ..., come necessario. Grazie a Julien Paul.
         
    * MIGLIORATO: Quando Calendar2.parseDateTime parses dd, hh, o HH, il primo 'digit' può ora essere uno spazio.
    * KNOWN PROBLEM: A partire daERDDAP™2.10,.nci file ml che cercano di cambiare un attributo, non cambiano l'attributo. Questo è un bug noto in netcdf-java che ho segnalato e dicono che sarà fissato nella prossima release di netcdf-java.
         
    * BROKEN LINK FIX: Ho fatto un buon sistema di test per i collegamenti interrottiERDDAP™pagine web, quindi ci dovrebbe ora essere molto pochi link rotti (almeno a partire da ogni data di rilascio -- nuovi collegamenti rotti sorgono spesso) .
         
    * BUG FIX: EDDTableFromHttpGet ha fallito con alcuni tipi di richieste. Ora non e' cosi'. Grazie a Emma al BODC.
         
    * BUG FIX: Per gestire alcune richieste, EDDTable ha fatto un file temporaneo per ogni variabile richiesta, con un nome di file che termina nel nome della variabile. Se il nome della variabile era anche un tipo di compressione (ad esempio, .Z) ♪ERDDAPavrebbe provato (e fallire) decomprimere il file temporaneo. Ora i nomi dei file temporanei terminano in ".temp". Grazie a Mathew Biddle.
         
    * BUG FIX: GenerateDatasetsXml e Calendar2.convertToJavaData Il formato è ora molto meno probabilità di fare un cambiamento errato quando si cerca di risolvere un formato di data non valida. In particolare, non verrà modificato il formato di data di uscita automatica. Grazie a Mathew Biddle.
         
    * BUG FIX: Se c'è stato un errore durante l'acquisizione di contenuti da un URL remoto, e se il contenuto di erroreStream è compresso,ERDDAP™ora decomprime correttamente il messaggio di errore. Grazie a Bob Simons.
         
    * BUG FIX:&lt;sottoscrizioneToRemoteErddapDataset&gt; non è stato applicato quando il... FromErddap dataset era un dataset bambino. Ora lo e'. Grazie a Chris Romsos.
         
    * BUG FIX: Genera i dati Xml non pensa più che un nome variabile di origine a partire da "latin" potrebbe essere latitudine. Grazie a Vincent Luzzo.
         
    * BUG FIX: Ora, un OutOfMemoryError durante la lettura di un file di dati durante l'elaborazione di una richiesta dell'utente non è un motivo per aggiungere un file all'elenco BadFiles. Grazie a Bob Simons.
         

## Versione 2.02{#version-202} 
 (rilasciato 2019-08-21) 

*    **Nuove funzionalità e modifiche (per gli utenti) :** 
    * NUOVO: Ci sono ora due modi per cercare i set di dati su piùERDDAPS. Funzionano leggermente in modo diverso e hanno diverse interfacce e opzioni.
        
        *   [RicercaERDDAPs.html](/SearchMultipleERDDAPs.html)da Bob Simons/NOAA NMFS SWFSC ERD.
        *   [ http://erddap.com ](http://erddap.com)da Rob Fuller/The Marine Institute of Ireland.
        
Grazie a Tylar Murray per la richiesta originale.
         
    * MIGLIORE: una richiesta al"files"sistema per scaricare un file che è in realtà in un sito remoto (ad esempio, AWS S3) ora porta a un reindirizzamento, in modo che l'utente effettivamente scaricare i dati dalla fonte, invece di utilizzareERDDAP™come intermediario. Grazie a Andy Ziegler eNOAA.
         
    * NOVITÀ: Come esempio delle nuove funzionalità AWS S3 correlate, e per rendere più facile per chiunque di navigare e scaricare i file dai secchi AWS S3 pubblici, abbiamo creato
        [~ 110 set di dati del campione](https://registry.opendata.aws/)che permettono a chiunque di navigare il contenuto di quasi tutti
        [AWS S3 Secchi di dati aperti](https://registry.opendata.aws/). Se fai clic su"files"link per uno qualsiasi di quei dataset del campione, è possibile navigare l'albero della directory e i file in quel secchio S3. A causa del funzionamento di questi dataset, questi elenchi di directory sono sempre perfettamente aggiornati perchéERDDAP™Li mette in moto. Se fai clic sull'albero della directory su un nome del file reale e fai clic sul nome del file,ERDDAP™reindirizza la tua richiesta a AWS S3 in modo da poter scaricare il file direttamente da AWS.ERDDAP™gli amministratori possono
        [leggere indicazioni per come fare questo per altri secchi S3](/docs/server-admin/datasets#working-with-aws-s3-files). Grazie a Andy Ziegler eNOAA.
         
*    **CoseERDDAP™Gli amministratori devono sapere e fare:** 
    * Cose che devi fare: nessuno
         
    * MIGLIORE:ERDDAPMetodo di memorizzazione di array di stringhe (StringArray) è ora molto più efficiente della memoria. String Arrays sono utilizzati in tuttoERDDAP™, in particolare quando legge i file di dati tabular ASCII. Inoltre, altre modifiche rendono la lettura dei file di dati tabulari CSV/TSV/SSV ASCII, colonnare ASCII e jsonlCSV più veloce e molto più efficiente della memoria. Il risultato è: per un file di test dati 764 MB ASCII (ma compresso a 52MB.gzfile) con 3.503.266 righe e 33 colonne, l'utilizzo massimo della memoria è passato da 10 GB fino a 0,6 GB (a picco) . Il tempo di leggere è passato da ~7 minuti (ma varia notevolmente con quanto memoria fisica è nel computer) fino a ~36 secondi (inclusi 10 per semplificare () che viene utilizzato solo da GenerateDatasets Xml) . Molti altri luoghi inERDDAP™beneficerà di questa maggiore efficienza della memoria. Grazie a Tylar Murray e Mathew Biddle.
        
Ho esplorato una soluzione diversa (memorizzare stringhe in StringArray come array byte codificati UTF-8) . Questo riduce l'utilizzo della memoria un altro ~33%, ma al costo di ~33% rallentamento. Rispetto al sistema che ora viene utilizzato, che sembrava un cattivo scambio. È più facile dare un computer più memoria (acquistare più memoria per ~$200) che rendere più veloce (acquistare un nuovo computer) .
        
Se è conveniente, è ancora sempre una buona idea dividere enormi file di dati tabular in diversi file più piccoli basati su alcuni criteri comestationIDe/o tempo.ERDDAP™spesso dovrà solo aprire uno dei piccoli file in risposta alla richiesta di un utente, e quindi essere in grado di rispondere molto più velocemente.
        
    * MIGLIORE: C'è ora[ERDDAP™AWS S3 documentazione](/docs/server-admin/datasets#working-with-aws-s3-files), che descrive come ottenereERDDAP™lavorare con i file di dati in secchi AWS S3.
Inoltre,ERDDAP™ora utilizza nuove funzionalità nell'AWS S3JavaAPI.
Inoltre,ERDDAP™ora consente agli URL AWS S3 di includere caratteri aggiuntivi (periodo, hyphen, underscore) in benne nomi.
Inoltre,ERDDAP™ora richiede che gli URL del secchio AWS S3 siano identificati in modo specifico:
           https://_bucketName_.s3._aws-region._amazonaws.com/_prefix_/   
dove il prefisso è facoltativo.
Grazie a Andy Ziegler eNOAA.
         
    * MIGLIORE: GenerareDatasets Xml ora tratta più comunemissing\\_values stand-ins come valori mancanti e quindi è più probabile convertire una colonna in un tipo di dati numerico. Inoltre, PrimitiveArray.semplificare () ora registra quale particolare valore di dati lo ha causato per trattare una determinata colonna come una colonna di stringhe. Grazie a Mathew Biddle.
         
    * MIGLIORE:&lt;richiestaBlacklist&gt; ora supporta .\\*.\\*  (o :\\*:\\*per IPv6) alla fine degli indirizzi IP, in modo da poter visualizzare una quantità maggiore di indirizzi IP, ad esempio, 110.52.\\*.\\*  (Cina Unicom Tianjin) . Vedere la documentazione per [&lt;richiestaBlacklist&gt; (/docs/server-admin/datasets#requestblacklist) Grazie a China Unicom e China Telecom.
         
    * MIGLIORE: Se la sorgente di un dataset non specifica un"institution"attributo, GenerateDatasets Xml e loadDataset ora lo ottengono da un attributo "creator\\_institution" (se disponibile) . Grazie a Micah Wengren.
         
    * BUG FIX: standardizzare Ciò che non è sempre stato applicato ai file di dati ASCII.
Inoltre, EDDTable non ha gestito correttamente i vincoli sui valori di tempo quando la fonte aveva valori di tempo di stringa e standardizzare Quello che veniva usato.
Grazie a Paloma de la Vallee.
        
Non ho chiaramente dichiarato prima: si dovrebbe solo utilizzare standardizzare Quali caratteristiche quando hai realmente bisogno di loro (ad esempio, quando diversi file sorgente memorizzano i valori del tempo in modi diversi) , perché alcune richieste di dataset che utilizzano standardizzare Ciò che verrà elaborato un po' più lento.
        
    * BUG FIX: Un bug in codice utilizzato daEDDGridDaNcFiles ha causato il fallimento con.nc4 e.hdf5 file che hanno "lungo" (in the 64) variabili. Questo è ora risolto. Grazie a Friedemann Wobus.
         
    * BUG FIX: Piccoli cambiamenti ai file ISO 19115 per rendere felice un diverso validatore. Grazie a Chris MacDermaid e Anna Milan.
         

## Versione 2.01{#version-201} 
 (rilasciato 2019-07-02) 

*    **Nuove funzionalità e modifiche (per gli utenti) :** 
    * Nessuno.
*    **CoseERDDAP™Gli amministratori devono sapere e fare:** 
    * BUG FIX: Un bug nel codice che genera il modulo di accesso dati pertabledapdatasets ha causato che la pagina web fosse vuota per alcuni set di dati. Inoltre, ho migliorato la gestione di errori inaspettati su tutte le pagine HTML in modo che saranno (di solito) visualizza un messaggio di errore. Grazie a Marco Alba.
    * MIGLIORE: GenerareDatasets Xml non stampa più un lungo avvertimento nella parte superiore dell'output. Invece, si prega di vedere[Modifica della Generazione Datasets Uscita Xml](/docs/server-admin/datasets#you-need-to-edit-the-output-from-generatedatasetsxml-to-make-it-better). Grazie a Steven Baum.
    * MIGLIORE: GenerareDatasets Xml ora fa raccomandazioni leggermente diverse in diverse situazioni per&lt;updateEveryNMillis&gt; per EDD...Da...Files datasets. Inoltre, GenerateDatasets Xml ora scoraggia il sistema "extract" originale per EDDTableFromFiles datasets.

## Versione 2.00{#version-200} 
 (rilasciato 2019-06-26) 

*    **ERDDAP™v2.00 è finalmente qui&#33; Si'&#33;**   
     
    * Ci scusiamo per il lungo ritardo necessario per finire questa versione.
Grazie per la pazienza.
         
    * La buona notizia è che il tempo supplementare è stato utilizzato per aggiungere più delle caratteristiche che gli utenti avevano richiesto. La cattiva notizia è che anche con il ritardo, non tutte le caratteristiche richieste sono state aggiunte. Ci dispiace, ma sembrava più importante ottenere questo rilascio che ritardare di più (Per sempre?) continuamente aggiungendo nuove funzionalità. Promettiamo di tornare alle versioni più frequenti in futuro.
         
    * "Versione 2?&#33; Ci sono grandi cambiamenti e incompatibilità?"
Grandi novità? Si'.
Grandi incompatibilità o modifiche per amministratori o utenti? No.
Abbiamo saltato da v1.82 a v2.00:
        * in parte per festeggiare 10 anni (Ora 11) dal primo rilascio pubblico diERDDAP™  (v1.00 il 2008-05-06, che esteriormente sembrava notevolmente come v2.00) . In quel tempo,ERDDAP™è passata da un'installazione a quasi 100 impianti in almeno 12 paesi (Australia, Belgio, Canada, Francia, India, Irlanda, Italia, Sud Africa, Spagna, Thailandia, Regno Unito, USA) .
        * in parte segnare un'importante aggiunta in una direzione completamente nuova:ERDDAP™ora ha un sistema di ingestione dati per andare con i servizi del server dati esistenti (vedi[EDDTableDaHttpGet](#eddtablefromhttpget)) ♪
        * e in parte perché non era un grande salto da 1.82 a 2.00 numericamente, così questo sembrava il momento giusto.
             
    * L'altra buona notizia è che ora ci sono altri due gruppi che contribuiscono al codiceERDDAP™  (in questa versione e con indicazioni continueranno) : Rob Fuller e Adam Leadbetter dell'Irlanda Marine Institute, e Roland Schweitzer di PMEL e Weathertop Consulting. Grazie mille. E 'vero che stanno lavorando su progetti di propria scelta, ma questo è il classico modello di sviluppo open-source -- i gruppi contribuiscono codice per le caratteristiche che più vorrebbero vedere aggiunto. Il vantaggio aggiunto ai contributori: possono utilizzare le nuove funzionalità non appena sono finiti; non devono aspettare il prossimo rilascio diERDDAP. Anche il vostro gruppo è lieto di contribuire&#33; Vedi il[ERDDAP™Guida del programmatore](/docs/contributing/programmer-guide).
         
    * Speriamo che ti piacciaERDDAP™v2.00. Attendiamo con ansia i prossimi 10 anni diERDDAP™sviluppo e sempre più uso in tutto il mondo.
         
*    **Nuove funzionalità e modifiche (per gli utenti) :**   
     
    * NUOVO:orderByMeanfiltro
pertabledapi set di dati calcolano i mezzi per i gruppi specificati. Inoltre, tuttoorderByopzioni ora supportano un ulteriore modo di definire i gruppi: _numericVariable\\[/ numero\\[tempoUnisciti\\]\\[:\\]\\]_, ad esempio, tempo/1day o profondità/10:5. Per esempio,stationID, time, waterTemp&orderByMean ("stationID, time/1day") potrebbe ordinare i risultati dastationIDe il tempo, poi calcolare e restituire il mezzo di acquaTemp per ognistationIDper ogni giorno. Queste sono incredibilmente utili e potenti nuove funzionalità. Il nuovo codice per queste caratteristiche e le modifiche al vecchio codice sono state apportate da Rob Fuller e Adam Leadbetter dell'Irlanda Marine Institute e presentate via Git. Grazie. Rob e Adam&#33;
         
    * NUOVO: tipo di file di uscita per set di dati tabulari:[.dati Tabella](https://developers.google.com/chart/interactive/docs/reference#dataparam)♪
un file JSON formattato per l'uso conGoogle Visualizationlibreria client (Google Charts) . Il codice per questo è stato contribuito da Roland Schweitzer e presentato via Git. Grazie. Roland&#33;
         
    * NUOVO: tipo di file di uscita per set di dati tabulari:[.jsonlCSV1](https://jsonlines.org/examples/)♪
che è come l'esistente.jsonlCSVopzione, ma con i nomi delle colonne sulla prima riga. Grazie a Eugene Burger.
         
    * NUOVO: Se l'amministratore lo consente, gli utenti possono ora accedere con il loro[ORCINE](https://orcid.org)conto.
Si tratta di un sistema di autenticazione OAuth 2.0, molto simile all'autenticazione di Google. ORCID è ampiamente usato dai ricercatori per identificarsi in modo unico. Gli account ORCID sono gratuiti e non hanno i problemi di privacy che gli account Google hanno. VediERDDAP'[Istruzioni di autenticazione Orcid](/docs/server-admin/additional-information#orcid). Grazie a BCO-DMO (Adam Shepard, Danie Kinkade, ecc.) .
         
    * NUOVO: Un nuovo convertitore di URL converte URL out-of-date in URL aggiornati.
Vedi .../erddap/convert/urls.html su qualsiasiERDDAP™installazione, ad esempio,
        [questo link al convertitore nelERD ERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/convert/urls.html). Questo dovrebbe essere utile ai responsabili dei dati. Questo viene utilizzato anche internamente da GenerateDatasetsXml. Grazie a Bob Simons e Sharon Mesick.
         
    * MIGLIORATO: Il[Convertitore di tempo](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)ora ha opzioni per convertire qualsiasi tempo di stringa comune in un tempo di stringa ISO8601, o convertire unUDUNITS- come le unità di tempo stringono in una correttaUDUNITSstringa delle unità temporali. Questo dovrebbe anche essere utileERDDAP™amministratori che hanno bisogno di sapere quale formato specificare per l'attributo "unità" per le variabili di tempo di stringa. Questo viene utilizzato anche internamente da GenerateDatasetsXml e la standardizzazioneQuale caratteristica di EDDTableFromFiles. Grazie a Bob Simons.
         
    * NUOVO:[Convertitore di unità](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)ha una nuova opzione "Standardize UDUnits".
Ad esempio, "deg\\_C/m" e "gradi\\_C metri-1" sono entrambi convertiti in
"grado\\_C m-1". Questa funzione è utilizzata anche dalla standardizeQuale caratteristica di EDDTableFromFiles. Grazie a Bob Simons.
         
    * NUOVO: Per i grafici (diversi dai grafi di superficie) su griglie etabledapLe pagine web di Make A Graph, quando l'asse x non è un asse di tempo, se solo un sottoinsieme della gamma della variabile di asse x è visibile, ci sono ora pulsanti sopra il grafico per spostare l'asse X verso sinistra o verso destra. Grazie a Carrie Wall Bell / il progetto Hydrophone.
         
    * NOVITÀ: Per i grafici, l'asse X e/o Y può ora utilizzare una scala di log.
Gli utenti possono controllare la Scala di asse Y tramite un nuovo widget a discesa sulla griglia etabledapFare un grafico pagine web. Vedi il[.xRange e . documentazione yRange](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#xRange). Grazie a Carrie Wall Bell / il progetto Hydrophone.
         
    * MIGLIORE:ERDDAP™ora fa un uso migliore di vari codici di errore HTTP e ora restituisce un(OPeN)DAPv2.0-formatted messaggio di errore payload. Vedi[i dettagli](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#Errors). Grazie a Antoine Queric e Aurelie Briand.
         
    * MIGLIORE: Non usare Netcdf-java/c o altri strumenti software per connettersi.nco.hdffile serviti daERDDAP's /files/ sistema come se fossero file locali.ERDDAP™ora rifiuta queste richieste. È orribilmente inefficiente e spesso causa altri problemi. Invece:
        
        * Uso(OPeN)DAPsoftware client per connettersi aERDDAP'DAPservizi per il dataset (che hanno /griddap/ o /tabledap/ nell'URL) . Ecco cosa.DAPè per e fa così bene.
        * Oppure, utilizzare il Dataset's Data Access Form per richiedere un sottoinsieme di dati.
        * Oppure, se hai bisogno dell'intero file o dell'accesso ripetuto per un lungo periodo di tempo, usacurl♪wget, o il browser per scaricare l'intero file, quindi accedere ai dati dalla copia locale del file.
        
          
         
    * MIGLIORATO: SullaERDDAP™homepage, Full Text Search è ora sopra "Visualizza una lista di tutti i datisets" dal momento che è il miglior punto di partenza per la maggior parte degli utenti. Grazie a Didier Mallarino e Maurice Libes.
         
    * MIGLIORATO: Su DataProviderForm3.html ci sono ora liste a discesa di comunestandard\\_nameS. Grazie a qualcuno alla riunione di IOOS DMAC.
         
    * MIGLIORATO: Sul /files/ pagine web, c'è ora un link alla nuova sezione "Cosa posso fare con questi file?" della /files/ documentazione. Questa sezione descrive vari tipi di file e dà suggerimenti per come lavorare con loro. Grazie a Maurice Libes.
         
    * MIGLIORE: Quasi ogni richiesta diERDDAP™dovrebbe essere almeno un po 'più veloce, e a volte molto più veloce.
         
    * BUG FIX: In alcune circostanze, quando un dataset EDDTable ha salvato i dati in alcuni tipi di.ncfile, l'attributo globale "id" è stato impostato sul nome suggerito del file, che include un hash per renderlo unico a tale richiesta. Ora "id" è correttamente lasciato invariato (se specificato) o impostato sul datasetdatasetID  (se non specificato) . Grazie a John Maurer.
         
*    **CoseERDDAP™Gli amministratori devono sapere e fare:**   
     
    * TO DO: Questa release richiederà un po 'di tempo e lavoro da voi. Si prega di essere paziente e pianificare di prendere alcune ore per fare le modifiche richieste e alcune ore in più per sperimentare nuove funzionalità.
         
    * TO DO: Per la sicurezza, fare una copia di backup del vostro setup.xml corrente edatasets.xmlfile in modo che si può tornare a loro nel caso improbabile in cui è necessario tornare aERDDAP™v1.82.
         
    * TO DO: Il consigliatoJavaè ora OpenJDK di AdoptOpenJDK 8 (LITTA) + HotSpot.
Questa è una variante open sourceJavache non ha restrizioni al suo utilizzo (a differenzaOracle'Javadistribuzione) . È derivato daOracle'Javain modo continuo, conOracleLa benedizione. Per motivi di sicurezza, è importante mantenere il vostroJavaversione aggiornata. VediERDDAP'[Javaistruzioni di installazione](/docs/server-admin/deploy-install#java).
         
    * TO DO: AdoptOpenJDK'sJavaha bisogno di una piccola aggiunta alla tua installazione Tomcat: vedi[Risorse Istruzioni Cache](/docs/server-admin/deploy-install#contentxml). Penso che questo sia un sostituto per l'impostazione -XX:MaxPermSize, che (Adozione) OpenJDK non supporta più.
         
    * TO DO: Il nuovo default e consiglia&lt;fontFamily&gt; impostazione in setup.xml è
DejaVu Sans che sono costruiti in AdoptOpenJDKJava. Vedere la
        [istruzioni per l'installazione di font revisionate](/docs/server-admin/deploy-install#fonts).
         
    * TO DO: Molti tag si muovono da setup.xml adatasets.xml. Il vantaggio è che puoi cambiare i loro valori mentreERDDAP™è in esecuzione, senza riavviareERDDAP. In particolare, si può facilmente cambiare&lt;startBodyHtml5&gt; per visualizzare un messaggio temporaneoERDDAP™home page (ad esempio, "Controllare il nuovo set di dati JPL MUR SST v4.1..." o "QuestoERDDAP™sarà offline per la manutenzione 2019-05-08T17:00:00 PDT attraverso 2019-05-08T20:00:00:00 PDT.") . Se / quando si modificano questi tag indatasets.xml, i cambiamenti avranno effetto la prossima voltaERDDAP™leggidatasets.xml.
         
        
        1. Copia questo contenuto nel tuodatasets.xmlfile (dove vicino all'inizio del file, dopo&lt;erddapDatasets&gt;:
```
            <!-- The tags below are described in setupDatasetsXml.html.
                 The defaults listed below are as of ERDDAP™ v2.00. -->
            <cacheMinutes></cacheMinutes>                                     <!-- default=60 --> 
            <decompressedCacheMaxGB></decompressedCacheMaxGB>                 <!-- default=10 --> 
            <decompressedCacheMaxMinutesOld></decompressedCacheMaxMinutesOld> <!-- default=15 --> 
            <drawLandMask></drawLandMask>                                     <!-- "over" or "under" (default) -->
            <graphBackgroundColor></graphBackgroundColor>                     <!-- 0xAARRGGBB, default is 0xffccccff -->
            <loadDatasetsMinMinutes></loadDatasetsMinMinutes>                 <!-- usually=default=15 -->
            <loadDatasetsMaxMinutes></loadDatasetsMaxMinutes>                 <!-- default=60 -->
            <logLevel></logLevel> <!-- "warning" (fewest messages), "info" (default), or "all" (most messages) -->
            <nGridThreads></nGridThreads>                                     <!-- default=1 -->
            <nTableThreads></nTableThreads>                                   <!-- default=1 -->
            <partialRequestMaxBytes></partialRequestMaxBytes>                 <!-- default=490000000 -->
            <partialRequestMaxCells></partialRequestMaxCells>                 <!-- default=10000000 -->
            <slowDownTroubleMillis></slowDownTroubleMillis>                   <!-- default=1000 -->
            <unusualActivity></unusualActivity>                               <!-- default=10000 -->
            <!-- The defaults for the following tags are in messages.xml. -->
            <startHeadHtml5></startHeadHtml5>                                
            <startBodyHtml5></startBodyHtml5>                                 <!-- This is often customized. -->
            <theShortDescriptionHtml></theShortDescriptionHtml>               <!-- This is often customized. -->
            <endBodyHtml5></endBodyHtml5>
            <standardLicense></standardLicense>
            <standardContact></standardContact>
            <standardDataLicenses></standardDataLicenses>
            <standardDisclaimerOfEndorsement></standardDisclaimerOfEndorsement>
            <standardDisclaimerOfExternalLinks></standardDisclaimerOfExternalLinks>
            <standardGeneralDisclaimer></standardGeneralDisclaimer>
            <standardPrivacyPolicy></standardPrivacyPolicy>
```

        2. One-by-one, copia il valore (se c'è) per ognuno di questi tag dal tuo file setup.xml nel nuovo tag che hai appena incollato (sopra) indatasets.xml. Ad esempio, se avessi usato un valore di 30 per&lt;cacheMinuts&gt; in setup.xml, si dovrebbe copiare quel valore nel nuovo&lt;cacheMinutes&gt; tag indatasets.xml  (anche se se il valore è lo stesso del nuovo valore predefinito, è meglio lasciare il tag indatasets.xmlvuoto) .
            
Se il tuo valore è diverso dal nuovo default suggerito (escluso per&lt;startBodyHtml5&gt; e&lt;ilShortDescriptionHtml&gt;, che sono utili per personalizzare ilERDDAP™installazione), si prega di considerare di passare ai nuovi valori di default. Questo è particolarmente vero&lt;parzialeRequestMaxBytes&gt; e&lt;parzialeRequestMaxCells&gt;, dove il valore predefinito/suggested è cambiato in modo significativo nel corso degli anni.
            
Dopo aver copiato ogni valore, eliminare il tag e la sua descrizione da setup.xml. È meglio avere questi tag indatasets.xml. E ci sono ora descrizioni migliori in[setupDatasetsXml.html](/docs/server-admin/datasets#the-basic-structure-of-the-datasetsxml-file).
            
        
Un quirk del nuovo sistema è che la prima pagina web quando si iniziaERDDAPsarà il defaultERDDAP™pagina web. Ogni pagina web successiva utilizzerà il contenuto ...Html specificato indatasets.xml.
        
    * AVVERTENZA: La prima volta che si esegueERDDAP™v2.0, i set di dati in base ai file di dati locali verranno caricati **Molto bene.** lentamente perchéERDDAP™ha bisogno di ricreare il suo database di file in un formato leggermente diverso. Dopo il lento ricarica iniziale, si carica rapidamente, come prima. Sii paziente.
         
#### EDDTableDaHttpGet{#eddtablefromhttpget} 
    *   [GRANDE NUOVA CARATTERISTICA: EDDTableFromHttpGet](#eddtablefromhttpget)  
Fino ad ora,ERDDAP™basta leggere i dati e renderlo disponibile agli utenti. Ora,ERDDAP™ha un sistema semplice ed efficiente per ingerire i dati in tempo reale dai sensori. Tra le altre caratteristiche, questo dataset offre una versione fine-grained: ricorda ogni cambiamento fatto al dataset, quando è stato fatto, e da chi. Di solito, gli utenti vogliono solo l'ultima versione del dataset, con tutte le modifiche applicate. Ma c'è l'opzione per gli utenti di richiedere i dati dal dataset come era in qualsiasi momento in tempo. Questo facilita la scienza riproducibile. Così, a differenza della maggior parte degli altri dataset in tempo reale, questi set di dati sono idonei per[DOI#](https://en.wikipedia.org/wiki/Digital_object_identifier). perché incontranoDOIrequisito che il dataset non si muova, tranne per aggregazione. Vedi[EDDTableDaHttpGet](/docs/server-admin/datasets#eddtablefromhttpget). Grazie a OOI (da molto tempo fa e ora) per parlare della necessità di questo e Eugene Burger per il promemoria di lavorare su ciò che è importante.
         
    * Grande NUOVA CARATTERISTICA:ERDDAP™può ora servire i dati direttamente da file di dati compressi esternamente, compresi.tgz♪.tar.gz♪.tar.gzip♪.gz♪.gzip♪.zip♪.bz2, o .Z. Datasets può includere un mix di file compressi esternamente (forse i file di dati più vecchi?) e file non compressi, e si può comprimere / decomprimere un file in qualsiasi momento.
        
Questo funziona benissimo&#33;
Nella maggior parte dei casi, il rallentamento relativo alla decompressione dei file è minore. Vi incoraggiamo fortemente a provare questo, in particolare per i dataset e / o file di dati che sono raramente utilizzati.
        
Questo può risparmiare $30,000 o più&#33;
Questo è uno dei pochiERDDAP™caratteristiche che possono risparmiare un sacco di soldi -- se si comprime un sacco di file di dati, avrete bisogno di molto meno RAID/hard drive per memorizzare i dati, o inversamente, è possibile servire molto più dati (fino a 10x) con i RAID che hai già. Se questa funzione ti salva dall'acquisto di un altro RAID, allora ti ha salvato circa $30.000.
        
Vedere la[Documentazione esterna dei file compressi](/docs/server-admin/datasets#externally-compressed-files). Grazie a Benoit Perrimond e Paloma de la Vallee.
        
    * Grande NUOVA CARATTERISTICA: TuttiEDDGridFromFiles e tutti i dataset EDDTableFromFiles supportano un&lt;cacheFromUrl&gt; tag e un&lt;cacheSizeGB&gt; tag. Se cacheSizeGB non è specificato, questo scaricherà e manterrà una copia completa dei file di un set di dati remoto. Se cacheSizeGB è specificato ed è &gt;0, questo scaricherà i file dal set di dati remoto, se necessario, in una cache locale con una dimensione limitata, che è utile quando si lavora con cloud-based (ad esempio, S3) file di dati. Vedere la[cache Documentazione di FromUrl](/docs/server-admin/datasets#cachefromurl)per i dettagli. Grazie a Bob Simons e Roy Mendelssohn (che da anni stanno scrivendo script per gestire la produzione di copie locali di file di dataset remoto) , Lloyd Cotten, Eugene Burger, Conor Delaney (quando era in Amazon Web Services) , e la piattaforma Google Cloud.
         
    * NUOVO: Il nuovo EDDTableFromJsonlCSV classe può leggere i dati tabulari da
        [JSON Linee file CSV](https://jsonlines.org/examples/)  ("Meglio di CSV") . Grazie alla gente del Marine Institute of Ireland per avermi parlato di questo formato e di Eugene Burger e PMEL per la richiesta di supportarlo come tipo di input.
         
    * NUOVO: TuttiEDDGride tutti i dataset EDDTableFromFiles supportano un&lt;nThreads&gt; impostazione, che diceERDDAP™quanti thread da utilizzare quando si risponde a una richiesta. Vedi il[documentazione nThreads](/docs/server-admin/datasets#nthreads)per i dettagli. Grazie a Rob Bochenek di Axiom Data Science, Eugene Burger, Conor Delaney (quando era in Amazon Web Services) , e Google Cloud Platform.
         
    * NUOVO standardizzare Cosa per tutti i sottoclassi EDDTableFromFiles -
In precedenza, se per una determinata variabile, i valori degli attributi importanti (ad esempio,scale\\_factor♪add\\_offset♪missing\\_value, \\_FillValore, unità) Non erano coerenti, EDDTableFromFiles avrebbe scelto un valore per ogni attributo di essere "valid" e contrassegnare i file con altri valori di attributo come "Bad Files". Ora, c'è un sistema per standardizzare i file non appena EDDTableFromFiles legge i file. Vedi[EDDTableFromFile standardize Cosa?](/docs/server-admin/datasets#standardizewhat). UnoERDDAP's principali obiettivi è quello di rendere i file di dati e set di dati accessibili in modo coerente. standardizzare Che cosa è un nuovo strumento importante per renderlo una realtà. Grazie a Marco Alba, Margaret O'Brien (e altri utenti EML) , BCO-DMO e utenti InPort.
         
    * NEW EDDTableFromInvalidCRAFiles consente di effettuare un set di dati da una raccolta diNetCDF  (v3 o v4)  .ncfile che utilizzano una specifica, non valida, variante del CF DSG Contiguous Ragged Array (CRA) file. I file di esempio per questo tipo di dataset possono essere trovati a https://data.nodc.noaa.gov/thredds/catalog/ncei/wod/  \\[2020-10-21 Questo server non è disponibile in modo affidabile\\]. Anche seERDDAP™supporta questo tipo di file, è un tipo di file non valido che nessuno dovrebbe iniziare a usare. I gruppi che attualmente utilizzano questo tipo di file sono fortemente incoraggiati ad utilizzareERDDAP™generare file CF DSG CRA validi e smettere di utilizzare questi file. Grazie ad Ajay Krishnan e Tim Boyer.
         
    * EDDTableFromThreddsFiles e EDDTableFromHyraxI file sono ora deprecati. Si prega di passare a EDDTableFromNcFiles (o una variante) più&lt;cacheFromUrl&gt;. Se questo non funziona per qualche motivo, e-mailerd.data at noaa.gov. Se non ci sono reclami prima del 2020, questi tipi di dataset possono essere rimossi.
         
    * MIGLIORATO... Il sistema per convertire automaticamente non ISO 8601 volte in ISO 8601 volte (presentato in v1.82) è stato notevolmente ampliato per affrontare un gran numero di formati aggiuntivi. Questo colpisce GenerateDatasetsXml eERDDAPLa gestione dei metadati di origine.
         
    * MIGLIORATO... Con la sua terza revisione importante del sistema di analisi del tempo di stringa (e spero l'ultimo) ♪ERDDAP™non utilizza piùJavaDateTimeFormatter a causa di bug che a volte influenzano tempi estremi (anni&lt;=0000).ERDDAP™ora utilizza il proprio sistema per le stringhe di tempo di parsing.
         
    * ATTENZIONE: Il nuovo sistema di parsing tempo di stringa è un po 'più rigoroso. Se uno dei tuoi dataset ha improvvisamente solo valori mancanti per i valori di tempo, la causa è quasi certamente che la stringa di formato di tempo è leggermente sbagliata. Ci dovrebbero essere messaggi di errore nel registro. txt relativo ai valori di tempo che non corrispondono al formato di tempo -- che dovrebbe aiutare a correggere la stringa di formato di tempo per quel dataset. Se hai bisogno di aiuto, usa l'opzione inERDDAPConvertitore di tempo che "Convertire\\[#\\]qualsiasi tempo di stringa comune in un tempo di stringa ISO 8601" -- indica il formato che il convertitore utilizzato per analizzare la stringa di origine.
         
    * RACCOMANDAZIONE: Il modo più veloce, più semplice ed economico per accelerareERDDAP'l'accesso ai dati tabulari è quello di mettere i file di dati su un'unità di stato solido (SSD) . La maggior parte dei set di dati tabulari sono relativamente piccoli, quindi un SSD da 1 o 2 TB è probabilmente sufficiente per contenere tutti i file di dati per tutti i set di dati tabulari. SSD alla fine si consuma se si scrive i dati a una cella, eliminarlo, e scrivere nuovi dati a quella cella troppe volte. Invece, consiglio che (quanto più possibile) Basta usare il SSD per scrivere i dati una volta e leggerlo molte volte. Poi, anche un SSD di livello consumer dovrebbe durare molto tempo, probabilmente molto più lungo di qualsiasi Hard Disk Drive (HDD) . SSD di livello di consumo sono ora a buon mercato (nel 2018, ~ $ 200 per 1 TB o ~ $400 per 2 TB) e i prezzi stanno ancora cadendo veloci. QuandoERDDAP™accede a un file di dati, un SSD offre entrambi
        
        * latenza più breve (~0.1ms, contro ~3ms per un HDD, contro ~10 (?) ms per un RAID, contro ~55ms per Amazon S3) e
        * maggiore produttività (~500 MB/S, contro ~75 MB/s per un HDD contro ~500 MB/s per un RAID) .
        
Così si può ottenere fino a un ~10X performance boost (vs un HDD) per 200 dollari&#33; Rispetto alla maggior parte delle altre possibili modifiche al sistema (un nuovo server per 10.000 dollari? un nuovo RAID per 35.000 dollari? un nuovo interruttore di rete per $5.000? ecc.) , questo è di gran lunga il miglior ritorno sugli investimenti (ROI) . Se il server non è caricato di memoria, la memoria aggiuntiva per il server è anche un ottimo e relativamente economico modo per accelerare tutti gli aspettiERDDAP.
        \\[SSD sarebbe grande anche per i dati grigliati, ma la maggior parte dei set di dati grigliati sono molto più grandi, rendendo l'SSD molto costoso.\\]  
         
    * NUOVO: Tutti coloro che hanno effettuato l'accesso hanno un ruolo=\\[chiunqueLogabbia In\\], anche se non c'è&lt;tag utente&gt; per loro indatasets.xml. Se si imposta dataset's&lt;accessibile a\\[chiunqueLogabbia In\\], allora chiunque si sia connessoERDDAP™  (ad esempio, tramite il loro account Gmail o Orcid) sarà autorizzato ad accedere al dataset, anche se non hai specificato un&lt;tag utente&gt; per loro indatasets.xml. Grazie a Maurice Libes.
         
    * MIGLIORATO: IlUDUNITS/UCUM unità convertitore è stato ampiamente migliorato.
Gestisce meglio le stringhe delle unità non valide (a partire da un'enfasi sulla conservazione delle informazioni, piuttosto che rafforzare la validità) . Inoltre, i risultati ora hanno una sintassi standardizzata.
         
    * NUOVO:UDUNITS/UCUM unità convertitore ha una nuova opzione per standardizzare unUDUNITSstringa.
Questo funziona bene per validoUDUNITSstringhe e ragionevolmente bene per non standard / non validoUDUNITSstringhe. Ad esempio, per esempio,UDUNITS="metri al secondo", "metro/secondo","m.s^-1"e"m s-1"tutti torneranno "m.s-1". Questo era necessario per il nuovo standardize Quale sistema descritto sopra. Grazie a Marco Alba, Margaret O'Brien (e altri utenti EML) , BCO-DMO e utenti InPort.
         
    * NUOVO: EDDTableFromMultidimNcFiles ora ha un[trattamentoDimensioniAs](/docs/server-admin/datasets#treatdimensionsas)opzione, che diceERDDAP™per il trattamento di determinate dimensioni (ad esempio, LAT e LON) come se fossero altre dimensioni (ad esempio, TIME) . Questo è utile per alcuni file errati che usano dimensioni diverse per diverse variabili quando dovrebbero usare solo una dimensione (ad esempio, TIME) . Grazie a Marco Alba e Maurice Libes.
         
    * NOVITÀ: Ora, tuttiEDDGridDa... I set di dati di Files supportano un nuovo asse specialesourceNameche diceERDDAP™per estrarre informazioni dal fileName (solo filename.ext) e utilizzare il valore per **sostituire** il valore dell'asse sinistro esistente. Il formato è
        \\*\\*\\* sostituiredaFileName,_dataType_,_extractRegex_,_captureGroupNumber_
Vedi[questa documentazione](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata). Grazie alNOAAPathfinder Daily aggregation dataset.
         
    * NOVITÀ: Ora, tuttiEDDGridDa... I set di dati di Files supportano un nuovo asse specialesourceNameche diceERDDAP™per estrarre informazioni dal percorso del fileName (directory + nome del file.ext)   
        \\*\\*\\*pathName,_dataType_,_extractRegex_,_captureGroupNumber_
Per questo, il nome del percorso usa sempre'/'come il carattere separatore directory, mai '\'.
Vedi[questa documentazione](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata). Grazie a Paloma de la Vallee.
         
    * NUOVO: Ora, tutto EDDTableDa... I dataset dei file supportano ulteriori pseudo variabilisourceNames quale estrarre le informazioni dal file del fileName (solo filename.ext)   (vedi[\\*\\** Nome del file](/docs/server-admin/datasets#filename-sourcenames)) o dal percorso completo del fileName (/dir1/dir2/filename.ext)   (vedi[\\*\\*\\ * Nome del percorso](/docs/server-admin/datasets#pathname-sourcenames)) . Grazie a Paloma de la Vallee.
         
    * NUOVO: Se unEDDGriddataset ha una o più dimensioni (ad esempio, milioni di valori) che prendono un sacco di memoria, è possibile impostare il nuovo [&lt;dimensioneValori in memoria&gt;] (/docs/server-admin/datasets #dimensioni inmemoria) che si aggrappa al falso (il default è vero) , che causa il set di dati per memorizzare i valori sul disco e recuperarli quando necessario. Grazie a David Rodriguez e Rich Signell (Re:EDDGridDa AudioFiles) .
         
    * In precedenza, se avete riordinato ildataVariables per un EDDTableFromFiles dataset e ricaricato il dataset, EDDTableFromFiles rileggerebbe tutti i file di dati. Ora, può trattare con il riordino senza rileggere tutti i file di dati. Grazie a Roland Schweitzer.
         
    * Ora, quandoERDDAP™legge i file di dati tabular ASCII, NCCSV e JSON Lines CSV, se trova un errore su una determinata linea (ad esempio, numero errato di articoli) , registra un messaggio di avviso ("WARNING: Skipping line #"... "numero inaspettato di articoli...") al[file log.txt](/docs/server-admin/additional-information#log)e poi continua a leggere il resto del file di dati. Così, è vostra responsabilità guardare periodicamente (o scrivere uno script per farlo) per quel messaggio nel registro. txt in modo da poter risolvere i problemi nei file di dati.ERDDAP™è impostato in questo modo in modo che gli utenti possono continuare a leggere tutti i dati validi disponibili anche se alcune linee del file hanno difetti. Negli episodi precedenti...ERDDAP™contrassegnato il file come "cattivo" e rimosso dal dataset.
         
    * MIGLIORE: Quando tempi precisi (ad esempio, al secondo o millisecondo più vicino) sono memorizzati alla fonte come "minuti da ..." (o unità più grandi) ♪ERDDAP™ora li circonda al millisecondo più vicino quando legge i valori inERDDAP. In caso contrario, i numeri di punti galleggianti sono ammassati e le richieste di dati in tempi specifici (ad esempio, &time=2018-06-15T01:30:00) fallirà. In precedenza, li ha calcolati il più precisamente possibile (e lo fa ancora se le unità sono ad esempio, "secondi da ..." o "millisecondi da ...") . E 'meglio evitare questo problema non utilizzando grandi unità (ad esempio, minuti o ore) per memorizzare valori di tempo precisi (ad esempio, microsecondi) - I computer fanno un povero lavoro di gestione delle cifre decimali. Grazie a Marco Alba.
         
    * Modifiche a EDDTableFromEDDGridche lo rendono molto meglio. EDDTEDDEDDGridconsente agli utenti di query dataset grigliati come se fossero set di dati tabulari ("query by value") .
        
        * Ora supporta un&lt;maxAxis0&gt; tag (default = 10) che specifica il numero massimo di asse\\[0\\]  (di solito"time") valori che possono essere interrogati subito. Questo impedisce alle richieste ingenue di ottenere EDDTableFromEDDGridper cercare attraverso un intero set dati grigliato (che fallisce con un errore di timeout) .
        * Genera i dati Xml ora ha un'opzione per generare EDDTableFromEDDGridset di dati per tutti i dataset grigliati in un datoERDDAP™che corrispondono a regex specificato (utilizzare .\\* per abbinare tutti i set di dati) . I dataset che crea hanno ulteriori informazioni nell'attributo sommario indicando che questa è una versione tabulare di un dataset grigliato. E lorodatasetIDè ildatasetIDdel dataset grigliato, più "\\_AsATable".
        * C'è una grande velocità per la configurazione più comune: quando il dataset grigliato è unEDDGridFromErddap dataset che è nello stessoERDDAP.
        
Grazie a James Gallagher e Ed Armstrong.
         
    * NUOVO: generare Datasets Xml per tutti i tipi di dataset è ora molto più probabile aggiungere un \\_FillValue omissing\\_valueattributo a una variabile numericaaddAttributes. Ad esempio, questo accade quando i marcatori di valore mancanti della stringa (ad esempio, "", ".", "?", "NA", "nd", "NaN") per quella variabile nel file campione sono convertiti inERDDAPvalori nativi mancanti (127 in colonne byte, 32767 in colonne corte, 2147483647 in colonne int, 9223372036854775807 in colonne lunghe, e NaN in galleggiante e doppie variabili) . Si verifica anche per i valori NaN in galleggiante e doppie variabili. Inoltre, "nd" è stato aggiunto all'elenco dei marcatori di valore mancanti comuni nelle colonne di dati numerici cheERDDAP™dovrebbe cercare. Grazie a Matt Biddle di BCO-DMO.
         
    * MIGLIORE: l'opzione ncdump in generare Datasets Xml è ora più simile a ncdump (ma utilizza ancora la versione netcdf-java di ncdump) . Ora, stampa una nuova lista di opzioni. Ora, per.ncfile ml, stampa l'uscita ncdump per il risultato del.ncmodifiche di file ml applicate al sottostante.nco.hdffile.
         
    * BUG FIX: C'era una perdita di file (eventualmente causandoERDDAP™per congelare) causato durante la creazione di alcuni tipi di file di output, ad esempio, .geotif, in particolare quando si sono verificati errori durante la creazione. Credo che sia tutto risolto. Se si vedono ancora problemi, si prega di dirmi il tipo di dataset (griglia o tavolo) e il tipo di file che sta causando il problema. Grazie a Steven Beale, Lynn DeWitt, Jibei Zhao e altri.
         
    * BUG FIX: TheWMS Leafletdemo non ha completamente/properly convertito l'asse "profondità" a "elevazione". E' cosi', e le richieste di leggende rotte sono sistemate. Inoltre, tutte le opzioni di asse negli elenchi a discesa sono sempre in ordine ordinato crescente. Grazie a Antoine Queric e Aurelie Briand.
         
    * BUG FIX: EDDTableFromFiles ora supporta correttamente i vincoli sulle variabili di stringa che sono stati creati da variabili di beneficenza nei file di dati. Grazie a Antoine Queric e Aurelie Briand.
         
    * BUG FIX: Ora, quando un dataset non è disponibile, il dataset cerca di avvisare (con il messaggio "Questo dataset non è attualmente disponibile".) i suoi abbonati, azioni quotate, rss e lonPM180 datasets che si basano su di esso. Grazie a Roy Mendelssohn e Bob Simons.
         
    * BUG FIX: Due bug relativi a EDDTableCopy. Grazie a Sam McClatchie.
         
    * MIGLIORATO: Il numero di richieste fallite mostrate sulla pagina status.html aumenterà perché più cose sono considerate come guasti rispetto a prima.
         
    * MIGLIORE:ERDDAP's status.html ora mostra "Richiesta (tempi mediani in ms) " nella serie del tempo. Precedentemente, ha mostrato tempi mediani troncati a secondi interi.
         
    * MIGLIORE: Nell'output jsonld, il "name" jsonld viene ora dal dataset"title"inERDDAP, e il jsonld "headline" ora viene dal dataset "datasetID"ERDDAP. Negli episodi precedenti, era invertito. Questo mi sembra sbagliato perché nel normale uso inglese, "nome" di solito è breve, (ideale) identificativo unico che raramente/mai cambia (per esempio, Robert Middlename Simons) , non una descrizione che non è unica e che può facilmente e spesso cambiare (ad esempio, "Un ragazzo che scrive software perNOAA" vs. "Un ragazzo alto che scrive software perNOAA") . Gee, sarebbe fantastico se la definizione di schema.org[Nome](https://schema.org/name), nel contesto di un Dataset, erano più specifici. Gli sviluppatori di software dovrebbero essere in grado di scrivere un'implementazione di una specifica basata sulle specifiche da soli, senza indicazioni da parte di esperti. Ma mi riferisco a Google (in particolare Natasha No&#33;) NCEI (in particolare John Relph) e Rob Fuller.
         
    * MIGLIORE: Nell'uscita jsonld, i quattro valori "spatialCoverage GeoShape box" sono ora minLat minLon maxLat maxLon. In precedenza, le posizioni dei lat e dei lon erano invertite. Gee, sarebbe fantastico se la definizione di schema.org[GeoShape](https://schema.org/GeoShape)specificato l'ordine corretto. Gli sviluppatori di software dovrebbero essere in grado di scrivere un'implementazione di una specifica basata sulle specifiche da soli, senza indicazioni da parte di esperti. Grazie a Natasha Noy e Rob Fuller.

## Versione 1.82{#version-182} 
 (rilasciato 2018-01-26) 

*    **Nuove funzionalità (per gli utenti) :**   
     
    * Numerosi cambiamenti sottili al look-and-feel diERDDAP™pagine web.
        * MIGLIORE:ERDDAP™ora utilizza HTML 5 e fa meglio uso di CSS.
        * MIGLIORE: Le pagine web sono state leggermente modificate per renderle più pulite e meno "busose". (Sono ancora densi e ci sono ancora cose di cui si potrebbe lamentarsi, ma speriamo molto meno di prima.) Grazie a John Kerfoot per alcuni commenti.
        * MIGLIORE: Le pagine web ora sembrano molto meglio sui telefoni cellulari e altri piccoli dispositivi, in particolare se li usi nell'orientamento del paesaggio. Essi anche guardare meglio in finestre molto piccole e molto grandi nei browser desktop.
        * MIGLIORATO: Per migliorare la sicurezza e altri motivi, l'uso di una versione Openlayers non aggiornataWMSle pagine dimostrative sono state sostituiteLeaflet.
        * NUOVO: supporto per le anteprime dei file immagine, audio e video"files"sistema (per esempio,[questo set di dati di prova](https://coastwatch.pfeg.noaa.gov/erddap/files/testMediaFiles/ShouldWork/)) e.htmlTablerisposte quando una cella ha l'URL di un file immagine, audio o video (per esempio,[questa richiesta](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/testMediaFiles.htmlTable?url%2Cname%2ClastModified%2Csize%2CfileType%26url=~%22.*ShouldWork.*%22)) . Se si passa sopra un'icona '?', si dovrebbe vedere un'anteprima di immagine, audio o file video. È inoltre possibile fare clic sul link del file per visualizzare la schermata completa del file nel browser. Vedi il[Documentazione dei file multimediali](/docs/server-admin/datasets#media-files). Si noti che diversi browser supportano diversi tipi di file, quindi gli esempi potrebbero non funzionare nel browser.
Grazie a queste persone/link per idee e codice di esempio per i tooltips di immagine solo CSS (era https://codepen.io/electricalbah/pen/eJRLVd ) e carico immagine differito (era https://varvy.com/pagespeed/defer-images.html )   (anche se il codice è stato modificato prima dell'usoERDDAP) .
Grazie a Cara Wilson, Matthew Austin e Adam Shepherd/BCO-DMO per richieste di supporto alle immagini.
Grazie a Jim Potemra, Rich Signell, OOI e Carrie Wall Bell per le richieste di supporto file audio/idrofono.
Grazie a OOI per mostrare la necessità di supporto video.
        * NUOVO: Un sottoinsieme di dati da qualsiasiERDDAP™set di dati (ma di solito un dataset da file audio) può ora essere salvato in un file audio .wav. ([documentazione](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#wav)) Grazie a Jim Potemra, Rich Signell, OOI e Carrie Wall Bell per le richieste di supporto file audio/idrofono.
        * MIGLIORE: Il formato per le cartelle accessibili Web (FAVORE)   (ad esempio, le /file/ cartelle) è stato aggiornato per utilizzare una tabella HTML. Il nuovo formato imita la versione più recente delle pagine web di elenco directory create da versioni più recenti di Apache. Gli umani troveranno che i cambiamenti rendono le informazioni più facili da leggere. Software che analizza questi documenti (ad esempio, software che raccoglie documenti ISO 19115 daERDDAP) dovrà essere revisionato, ma il nuovo formato sarà più facile da analizzare rispetto al formato precedente. (Attenzione, Anna Milan.) 
        * NUOVOoutOfDateDatasets.htmlpagina. ([esempio](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html)) Questa pagina mostra una tabella con tutti i dataset in tempo reale che hanno un&lt;testOutOfDate&gt; tag (vedi sotto) , classificato da come sono out-of-date i set di dati. Questa dashboard dovrebbe essere utile perERDDAP™amministratori e utenti finali quando vogliono sapere quali set di dati sono out-of-date. Per i dataset non aggiornati, presumibilmente c'è un problema con la fonte di dati, in modo cheERDDAP™non è in grado di vedere / ottenere i dati da più recenti punti di tempo.
Amministratori: Se non si desidera una pagina web Out-Of-Date Datasets, aggiungere questo al vostro setup.xml:
            &lt;outOfDateDatasetsActive&gt;false&lt;/outOfDateDatasetsActive&gt;
Ci sono oratestOutOfDatee fuori Colonne OfDate inallDatasetsDataset.
Grazie a Bob Simons, che ha voluto questo per anni, e alle persone intelligenti dell'Irlanda Marine Institute che mi ha dato l'ispirazione attraverso il loro dedicato Raspberry Pi e monitor che mostra sempre uno schermo come questo nel loro ufficio.
        * MIGLIORE:.htmlTablee.xhtmlrisposta sono ora meglio formattati, più compatti, e quindi caricare più velocemente. Grazie a HTML5 e CSS.
    * NUOVO tipo di file di output per set di dati griglie: .timeGaps. Mostra un elenco di lacune nei valori di tempo che sono più grandi del divario mediano. ([esempio](https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMHchla8day.timeGaps)) Questo è utile perERDDAP™amministratori e utenti finali quando vogliono sapere se ci sono lacune inaspettate nei valori di tempo per un set di dati che si prevede di avere valori di tempo regolarmente distanziati. Grazie a Bob Simons e Roy Mendelssohn che avevano bisogno di questa funzione.
    * MIGLIORATO: Il grafico predefinito perallDatasetsdataset è ora una mappa con x=maxLon e y=maxLat. Grazie a John Kerfoot, Rich Signell e OOI-CI.
    * NUOVO:[Erddapy](https://github.com/ioos/erddapy)- Non è unERDDAP™caratteristica, ma sarà di interesse per moltiERDDAP™utenti. Erddapi (ERDDAP™+Python) è unPythonbiblioteca creata da Filipe Fernandes che "si avvantaggia diERDDAP'RESTfulservizi web e crea ilERDDAP™URL per qualsiasi richiesta come la ricerca di set di dati, l'acquisizione di metadati, il download di dati, ecc." Grazie a Filipe Fernandes.
    * Avrei dovuto menzionare prima: C'è un pacchetto R di terze parti progettato per facilitare il lavoro conERDDAP™dall'interno R:[Traduzione:](https://github.com/ropensci/rerddap#rerddap). Grazie a[rOpenSci](https://ropensci.org/)e Roy Mendelssohn.
         
*    **CoseERDDAP™Gli amministratori devono sapere e fare:**   
     
    * TO DO: In setup.xml, proprio qui sotto&lt;adminInstitution&gt;, si prega di aggiungere un&lt;adminInstitutionUrl&gt; tag che specifica un URL per la tua istituzione (o gruppo) .
    * TO DO: Questi 3 tag in setup.xml non sono più utilizzati:
        &lt;inizio Testimonianza,&lt;startBodyHtml&gt; e&lt;endBodyHtml&gt;. Sono sostituiti da
        &lt;startHeadHtml5&gt;,&lt;startBodyHtml5&gt; e&lt;endBodyHtml5&gt;, che hanno valori predefiniti specificati nei messaggi.xml (e mostrato di seguito) .
        
Si consiglia di utilizzare il default&lt;startHeadHtml5&gt; e&lt;endBodyHtml5&gt;.
Consigliamo: Se hai apportato modifiche all'originale&lt;startBodyHtml&gt; e/o vuoi personalizzare il tuoERDDAP™ora, per favore copiare il nuovo&lt;startBodyHtml5&gt; tag (da sotto) nel vostro setup.xml e modificarlo per personalizzare il vostroERDDAP™cosìERDDAP's pagine web riflettono la vostra organizzazione, nonNOAA ERD. In particolare, si prega di cambiare il "Brought to you by" alla vostra organizzazione (#) . Se avete bisogno di aiuto, si prega di e-mailerd.data at noaa.gov. (Se non vuoi personalizzare il tuoERDDAP™ora, utilizzare il default&lt;startBodyHtml5&gt;.)
        
Quindi eliminare i 3 vecchi tag nella configurazione.xml che non sono più utilizzati.

```
        <startBodyHtml5><!\\[CDATA\\[ 
        <body>
        <table class="compact nowrap" style="width:100%; background-color:#128CB5;"> 
          <tr> 
            <td style="text-align:center; width:80px;"><a rel="bookmark"
              href="https://www.noaa.gov/"><img 
              title="National Oceanic and Atmospheric Administration" 
              src="&erddapUrl;/images/noaab.png" alt="NOAA"
              style="vertical-align:middle;"></a></td> 
            <td style="text-align:left; font-size:x-large; color:#FFFFFF; ">
              <strong>ERDDAP</strong>
              <br><small><small><small>Easier access to scientific data</small></small></small>
              </td> 
            <td style="text-align:right; font-size:small;"> 
              &loginInfo; &nbsp; &nbsp;
              <br>Brought to you by 
              <a title="National Oceanic and Atmospheric Administration" rel="bookmark"
              href="https://www.noaa.gov">NOAA</a>  
              <a title="National Marine Fisheries Service" rel="bookmark"
              href="https://www.fisheries.noaa.gov">NMFS</a>  
              <a title="Southwest Fisheries Science Center" rel="bookmark"
              href="https://www.fisheries.noaa.gov/about/southwest-fisheries-science-center">SWFSC</a> 
              <a title="Environmental Research Division" rel="bookmark"
              href="https://www.fisheries.noaa.gov/about/environmental-research-division-southwest-fisheries-science-center">ERD</a>  
              &nbsp; &nbsp;
              </td> 
          </tr> 
        </table>
        \\]\\]></startBodyHtml5>
```

Ci sono modi aggiuntivi che puoi[personalizzareERDDAP™](/docs/server-admin/deploy-install#customize)CosìERDDAP's pagine web riflettono la vostra organizzazione invece diNOAA ERD.
        
    * TO DO:&lt;EDDGrid...Example&gt; tags (a partire con&lt;EDDGridIdExample&gt;) e&lt;EDDTable... Esempio &gt; tag (a partire da&lt;EDDTableIdExample&gt;) nel tuo file setup.xml vengono utilizzati per creare esempi nel griddap etabledapdocumentazione. pagine web html nelle tueERDDAP.
        
Se non hai personalizzato questi tag, ti preghiamo di eliminarli dal tuo file setup.xml. Ora tutti hanno i di default in message.xml che si riferiscono ai set di dati in Bob'sERDDAP™a https://coastwatch.pfeg.noaa.gov/erddap/index.html . Quindi non è più necessario avere set di dati specifici nel tuoERDDAP. Se si desidera sovrascrivere i valori predefiniti, copiare alcuni o tutti quei tag nel setup.xml e modificare i valori.
Se vuoi che gli esempi puntino al tuoERDDAP™, il metodo più semplice è:
        
        1. Includi questi due set di dati nel tuoERDDAP™aggiungendo questo al tuodatasets.xml:
```
            <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>
            </dataset>
            <dataset type="EDDTableFromErddap" datasetID="pmelTaoDySst" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst</sourceUrl>
            </dataset>
```

        2. Aggiungi questo tag al tuo setup.xml, ma cambia l'URL al tuoERDDAP' (https?) URL:
```
            <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
            <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```
        
Se hai personalizzato questi tag, lasciali così com'è e aggiungi questi 2 nuovi tag al tuo setup.xml per specificare ilERDDAP™URL per questi set di dati, ma cambiare l'URL al tuoERDDAP' (https?) URL:
```
        <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
        <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```

    * A fare:ERDDAP™ora utilizza un file css chiamato erddap2.css. Se hai apportato modifiche\\[tomcat\\]/webapps/erddap/images/erddap.css, considerare di fare cambiamenti simili a erddap2.css (nella stessa directory) .
    * NUOVO:ERDDAP's pagine web ora hanno un gran numero di link interni quasi invisibili (il testo è nero e non sottolineato) . Se si supera uno di questi link (di solito le prime parole delle voci e dei paragrafi) , il cursore diventa una mano. Se si fa clic sul link, l'URL è il link interno a quella sezione del documento. Ciò rende facile fare riferimento a sezioni specifiche della documentazione. Grazie a Bob Simons, che ha voluto questo per anni.
    * NUOVO:ERDDAP™ora supporti[Byte Range / Accettare-Ranges](https://en.wikipedia.org/wiki/Byte_serving)richieste di porzioni di file /files/. Questo era necessario per supportare gli spettatori audio e video nei browser.
    * TO DO: Ora, per migliorare la sicurezza, se specificato&lt;baseHttpsUrl&gt; in setup.xml (e quindi sostegnohttps) , la bandiera raccomandata Url è unhttpsURL con un flagKey più sicuro. Se è così, qualsiasi precedente flagUrls/flagKeys diventerà invalido. Amministrazioni: Se queste modifiche si applicano al tuoERDDAP™e se il tuoERDDAP™haEDDGridDa Erddap e EDDTable Da Erddap che si iscrive a distanzaERDDAPs, allora, dopo aver aggiornatoERDDAP♪ERDDAP™cercherà di iscriversi automaticamente con la nuova flagUrl, quindi è necessario eliminare i vecchi abbonamenti e convalidare i nuovi abbonamenti quando si ottiene il nuovo abbonamento e-mail di convalida.
    * Per fare: Se il tuoERDDAP™haEDDGridFromErddap datasets for erdVH3 datasets sul coastwatch di BobERDDAP™, si prega di cambiarli per fare riferimento ai nuovi dataset erdVH2018.
    * TO DO: Se si include uno dei set di dati del campione jplAquariusSSS nei vostriERDDAP™, si prega di cambiare "V4" neldatasetID"V5".
    * A fare:actual\\_rangeè ora un attributo standard CF (a partire da CF-1.7) e dice chiaramente che se la variabile utilizzaadd\\_offsete/oscale\\_factorper imballare i valori dei dati, quindiactual\\_rangei valori dovrebbero utilizzare il tipo di dati non imballato e essere valori imballati. Purtroppo, questo conflitto con il nostro precedente consiglio. Genera i dati Xml ora sblocca i pacchetti imballatiactual\\_rangevalori, ma questo non risolverà i set di dati esistenti nei tuoidatasets.xmlfile.
        
Quindi, si prega di controllare i set di dati: se i valori di una variabile sono imballati e seactual\\_rangeè specificato come valori di dati imballati, si prega di aggiungere un&lt;addAttributes&gt;actual\\_rangevalore per specificare i valori non imballati. In caso contrario, il dataset non verrà caricato inERDDAP. Un modo semplice e quasi perfetto per fare questo è quello di cercare il vostrodatasets.xmlper fonte Attributi che hanno
```
        <att name="actual\\_range" type="shortList">  
        or <att name="actual\\_range" type="intList">  
```
escale\\_factordiverso da 1,0. Quelli sonoactual\\_rangeattributi che potresti dover correggere.
        
Per variabili di asse inEDDGriddatasets,ERDDAP™sempre imposta ilactual\\_rangeattribuire ad essere l'effettiva gamma dei valori in quanto conosce tali valori.
        
Per variabili di asse con valori discendente (ad esempio, alcune variabili di latitudine) ♪ERDDAP™creatoactual\\_rangecon il\\[0\\]...\\[Ultimo\\]valori, che erano alti... bassi. Ora utilizza sempre valori bassi... alti per rendere la nuova definizione CF.
        
La correttezza dellaactual\\_rangei valori sono particolarmente importanti per i dataset EDDTable, perchéERDDAP™scarterà rapidamente le richieste degli utenti per i valori di dati che sono inferiori a quelliactual\\_rangevalore minimo o superiore a quelloactual\\_rangevalore massimo.
        
Correlati: il vero\\_min, effettivo\\_max,data\\_minedata\\_maxgli attributi sono ora deprecati. Si prega di convertire i set di dati da utilizzareactual\\_rangeInvece.
        
    * A (opzionale, ma consigliato) : Per ogni dataset in tempo quasi reale e previsioni nel tuoERDDAP™, si prega di aggiungere un [&lt;testOutOfDate&gt; (/docs/server-admin/datasets#testoutofdate) tag con un valore nel modulonow-_nUnits_, ad esempio,now-Due giorni. Se il valore di tempo massimo per il dataset è più vecchio di quel valore, il dataset è considerato out-of-date e sarà contrassegnato come tale[outOfDateDatasets.html](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html)pagina web. Questo fornisce un modo semplice per vedere quando qualcosa non va con la sorgente di un dataset.
    *   [NUOVO: Semantic Markup di Datasets con json-ld (JSON Dati collegati) ](/docs/server-admin/additional-information#json-ld)  
        ERDDAP™ora usi[json-ld (JSON Dati collegati) ](https://json-ld.org)per rendere il vostro catalogo dati e set di dati parte del[web semantico](https://en.wikipedia.org/wiki/Semantic_Web), che è l'idea di Tim Berners-Lee di rendere più leggibile il contenuto del web e la macchina "sostenibile". Motori di ricerca ([Google in particolare](https://developers.google.com/search/docs/data-types/datasets)) e altri strumenti semantici possono utilizzare questo markup strutturato per facilitare la scoperta e l'indicizzazione. Il marchio strutturato json-ld appare come invisibile-uomo&lt;&gt; codice sul http://.../erddap/info/index.html pagina web (che è un web semantico[DataCatalog](https://schema.org/DataCatalog)) e su ciascuno http://.../erddap/info/_datasetID_/index.html pagina web (che è un web semantico[Dataset](https://schema.org/Dataset)) . (Un ringraziamento speciale a Adam Leadbetter e Rob Fuller dell'Istituto Marino in Irlanda per aver fatto le parti dure del lavoro per fare questa parte delERDDAP.) 
    * NUOVO: Ci sono nuovi tipi di dataset che possono leggere i dati dai file audio:
        [EDDGridDa AudioFiles](/docs/server-admin/datasets#eddfromaudiofiles), che tratta i dati audio come dati grigliati.
        [EDDTableFromAudioFiles](/docs/server-admin/datasets#eddfromaudiofiles), che tratta i dati audio come dati tabulari. Grazie a Jim Potemra, Rich Signell, OOI e Carrie Wall Bell per le richieste di supporto file audio/idrofono.
    * Modifiche a GenerareDatasets Xml (e modifiche correlate) :
        * NUOVO:ERDDAP™ora ha un sistema per automaticamente[Aggiornare gli URL di data](/docs/server-admin/additional-information#out-of-date-urls)entrambi in GenerateDatasets Xml e quando si caricano i set di dati. Se avete suggerimenti per ulteriori URL che dovrebbero essere catturati e aggiornati, o se pensate che questo dovrebbe essere trasformato in un servizio (come i Convertitori) , per favore e-mailerd.data at noaa.gov.
        * NUOVO: Ora, se GenerateDataset Xml vede un CFstandard\\_name  (che dovrebbe essere tutto minuscolo) con un carattere maiuscolo, aggiunge la versione tutta minuscola a&lt;addAttributes&gt;. Inoltre, quando un dataset carica, seERDDAP™vede un CFstandard\\_namecon un carattere maiuscolo, lo cambia silenziosamentestandard\\_name. Grazie a Rich Signell.
        * NUOVO: Ora, se GenerateDataset Xml vede un attributo con un tempo che non è in formato ISO 8601, aggiunge il tempo formattato ISO 8601 al&lt;addAttributes&gt;. SeERDDAP™non riconosce il formato, lascia il valore del tempo invariato. Se vedi un formato cheERDDAP™non riconosce e corregge, si prega di e-mail aerd.data at noaa.gov.
        * MIGLIORE: Il codice a basso livello perEDDGridDa tre Opzione del catalogo in GenerateDatasets Xml ora si basa sullaUnidatanetcdf-java catalogo crawler codice (Tre. classi di catalogo) in modo che possa gestire tutti i cataloghi THREDDS (che può essere sorprendentemente complesso) . Grazie a Roland Schweitzer per aver suggerito questo cambiamento e grazie aUnidataper il codice.
        * NUOVO: Genera i dati Xml perEDDGridFromDap ora aggiunge ", startYear-EndYear" alla fine del titolo in base ai valori attuali dell'asse temporale. EndYear="present" se i dati esistono negli ultimi 150 giorni.
        * NUOVO: Genera i dati Xml perEDDGridFromDap ora aggiunge ",\\[risoluzione\\]°" al titolo se il dataset è uniformemente distanziato e lo stesso per lat e lon.
        * MIGLIORE: Il convertitore di tempo ha ora caratteristiche aggiuntive, in particolare la capacità di convertire i tempi di stringa in una vasta gamma di formati comuni in stringhe ISO 8601 o in un numero compatibile con UDUnits. Tutte le funzionalità precedentemente supportate continuano a funzionare, invariate.
        * BUG FIX: Genera i dati Xml e il convertitore di parole chiave ora includono "Earth Science &gt; " all'inizio di GCMD Parole chiave di scienza. Quando un dataset viene caricato inERDDAP™♪ERDDAP™ora corregge qualsiasi parola chiave GCMD nell'attributo delle parole chiave che non iniziano con "Earth Science &gt; " o che utilizzano qualcosa di diverso dal caso del titolo (dove la prima lettera di ogni parola è capitalizzata) .
        * MIGLIORE: Quando si suggerisce&lt;destinationName&gt;'s, GenerateDatasets Xml per EDDTableFromAsciiFiles appena usato l'estremità della codasourceNamecon'/'  (alcuni erano filename-come) . Ora usa l'interosourceName(ad esempio, "blahblahblah (m/s)". Questo cambiamento sarà buono per alcuni set di dati e non per altri, ma è un comportamento più sicuro. Grazie a Maurice Libes.
        * BUG FIX: Genera i dati Xml e i costruttori di dataset ora assicurano che non ci siano nomi di colonne duplicate. Grazie a Maurice Libes.
        * BUG FIX: Genera i dati Xml per EDDTableFromAsciiFiles non ha scritto&lt;colonnaSeparatore&gt; all'output. Ora si'. Grazie a Maurice Libes.
    * NOVITÀ: Lo strumento DasDds ora stampa le informazioni sul gap di tempo (il[.timeGaps informazioni](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#timeGaps)) se il dataset è un dataset grigliato.
    * NOVITÀ: Ricerca avanzata accetta ora i valori di tempo "now_\\-nUnits_". Grazie a Rich Signell.
    * MIGLIORE: Per migliorare la sicurezza, quando un indirizzo e-mail nei metadati o i dati di un dataset viene scritto a una pagina web html, il "@" viene sostituito con " a ". Questo cattura solo indirizzi e-mail che sono l'intero valore dei metadati o dei dati, non indirizzi e-mail incorporati in valori più lunghi.
    * MIGLIORE: Aumentare la sicurezza,RSSinformazioni per dataset privati è ora disponibile solo per gli utenti (eRSSlettori) che sono connessi e autorizzati a utilizzare quel dataset.
    * NUOVO: Ora, quando un dataset viene caricato, sedate\\_created♪date\\_issued♪date\\_modified, o data\\_metadata\\_modified attribute ha un valore di tempo che non è in formato ISO 8601,ERDDAP™cambia al tempo formattato ISO 8601. SeERDDAP™non riconosce il formato, lascia il valore del tempo invariato. Se vedi un formato cheERDDAP™non riconosce e corregge, si prega di e-mail aerd.data at noaa.gov.
    * MIGLIORE: .dods risposte daEDDGriddatasets dovrebbe ora essere significativamente più veloce. Grazie a Rich Signell.
    * Modifiche connesseERDDAPla creazione di documenti ISO 19115:
        * BUG FIX: quando si creano documenti ISO 19115,dataVariableLe unità non erano codificate HTML e codificate per cento. Ora lo sono. Grazie al validatore ISO 19115 di NGDC.
        * BUG FIX: quando si creano documenti ISO 19115,date\\_createdera usato come è, così spesso era il formato sbagliato. Ora è convertito in stringa ISO 8601 Z. Grazie al validatore ISO 19115 di NGDC.
        * BUG FIX: quando si creano documenti ISO 19115,ERDDAP™ora più a lungo scrive date con anno=0000 (come con i dataset di climatologia) , perché lo schema ISO 19115 non consente date con annu=0000. Grazie al validatore ISO 19115 di NGDC.
    * NUOVO: Come prima di una richiestahttp.../erddap/versione restituirà solo il numero di versione (come testo) Per esempio, "ERDDAP\\_version=1.82.
Ora, una richiestahttp.../erddap/version\\_string restituirà un numero e un suffisso opzionale di '\\_' più testo ASCII (nessun spazio o caratteri di controllo) Per esempio, "ERDDAP\\_version\\_string=1.82\\_JohnsFork". La gente che fa la forcella specifica questo cambiando EDStatic.erddapVersion. Questo modo di farlo non causa problemi per le versioni precedenti diERDDAP. Grazie a Axiom (in particolare, Kyle Wilcox) e l'Istituto Marino d'Irlanda (in particolare, Rob Fuller) .
    * BUG FIX: Per wms versione=1.3.0, richiesta=GetMapEPSG: 4326 (non CRS:84) richieste: l'ordine bbox deve essere minLat,minLon,maxLat,maxLon. Per CRS:84 richieste, come prima, bbox ordine deve essere minLon,minLat,maxLon,maxLat. Questo può risolvere utilizzandoERDDAP'WMS1.3.0 servizio inArcGIS  (grazie a Paola Arce) . Grazie. (non) aOGCper aver reso tutto così complicato. Grazie aLeafletper gestirlo correttamente e per darmi un modo per testarlo.
    * MIGLIORE: Precedente, il link consigliato perRSSe gli abbonamenti e-mail hannohttpURL per il tuoERDDAP. Ora èhttpsURL, se è attiva.
    * NUOVO:EDDGridCopia ora supporta un tag opzionale&lt;solo dal punto di vista &gt;&lt;/onlySince&gt;, dove il valore è un tempo specifico formato ISO-8601 o unnow-NIENTE (ad esempio,now-2 anni) tempo. Vedere la[solo Dalla documentazione](/docs/server-admin/datasets#onlysince). Grazie a Drew P.
    * MIGLIORE: Se disponibile,ERDDAP™mostra ilhttpsURL (da&lt;baseHttpsUrl&gt;, se disponibile) invece dihttpURL quando dice agli utenti l'URL per aggiungere/validate/remove/list un abbonamento.
    * BUG FIX:ERDDAP™ora permette un'azione di abbonamento per iniziare con " https://" . (Bob gli schiaffeggia la fronte.) Grazie a Jennifer Sevadjian.
    * BUG FIX:.jsonlKVPora utilizza ':' tra ogni chiave e valore, invece di'='. (Bob gli schiaffeggia la fronte.) Grazie ad Alexander Barth.
    * BUG FIX: Nelle puntate precedenti...ERDDAP™con QuickRestart=true, e se, prima che il dataset fosse ricaricato normalmente, hai fatto una chiamata a un EDDTableFromFiles dataset che ha usato updateEveryNMillis, e se un file di dati fosse stato appena cambiato, la richiesta non sarebbe riuscita con un errore di puntatore null. Ora la richiesta avrà successo. Grazie a John Kerfoot.
    * NUOVO: Quando un dataset viene caricatoERDDAP™, le parole chiave sono ora riordinate in ordine ordinato e tutti i caratteri newline vengono rimossi.
    * Ora, se un .geoJson,.jsono.ncoJson richiesta ha.jsonp parametro, il tipo di mime risposta è l'applicazione/javascript. Nota:.jsonp non è supportato per.jsonlCSVo.jsonlKVPVisto che non funzionerebbe. Grazie a Rob Fuller.
    * MIGLIORATO: Il tipo di mime per file di linee jsonOpzioni di tipo 'Tipo' è ora "applicazione/x-jsonlines". Era applicazione/jsonl. Attualmente, non esiste una scelta corretta definitiva.
    * MIGLIORATO: Il numero di richieste fallite mostrate sulla pagina status.html aumenterà perché più cose sono considerate come guasti rispetto a prima, ad esempio ClientAbortException.
    * MIGLIORE: Ora, se una risposta daERDDAP™non è compresso, quindi l'intestazione della risposta includerà "Content-Encoding"="identità".
    * MIGLIORE: L'attributo "licenza" non era richiesto. Ora, se non è specificato, lo standardLicense da message.xml (o da setup.xml se presente) viene utilizzato come predefinito.
    * NUOVO: C'è ora un optional[fileAccessSuffix attributo](/docs/server-admin/datasets#fileaccessbaseurl). che può essere utilizzato con l'esistente[fileAccessBaseUrl attributo](/docs/server-admin/datasets#fileaccessbaseurl).
    * MIGLIORE: Per aumentare la sicurezza, questa versione è stata compilata con l'ultimaJavaJDK v8u162.
    * NOVITÀ: Per aumentare la sicurezza, diversi domini comuni che offrono indirizzi email temporanei (ad esempio, @mailinator.com) sono ora su una mail blacklist permanente per il sistema di abbonamenti.
    * NUOVO: Per aumentare la sicurezza, gli alti nel Rapporto Quotidiano ora includono:
Set Dataset Indirizzi IP contrassegnati (dall'ultimo rapporto giornaliero)   
Set Dataset Indirizzi IP contrassegnati (dall'avvio)   
Set Dataset Bandiera Indirizzo IP Acceso (dall'ultimo rapporto giornaliero)   
Set Dataset Bandiera Indirizzo IP Acceso (dall'avvio)   
Gli alti "Failed" ti permettono di vedere chi (Un hacker?) sta cercando di impostare una bandiera, ma sta fallendo.
    * MIGLIORE: Per aumentare la sicurezza, gli indirizzi e-mail&lt;abbonamentoEmailBlacklist&gt; nel tuodatasets.xmlsono ora considerati casi insensibili.
         

## Versione 1.80{#version-180} 
 (rilasciato 2017-08-04) 

*    **Nuove funzionalità (per gli utenti) :**   
     
    * NUOVOorderByCount () filtro consente di specificare come verrà ordinata la tabella dei risultati (o no) e restituisce solo una riga per ogni gruppo di tipo, con il conteggio del numero di valori non mancanti per ogni variabile.
Per esempio,orderByCount ("stationID") sarà ordinatastationIDe restituire una riga per ognistationID, con un conteggio del numero di valori non mancanti per ogni variabile.
Se si specifica soloorderByCount (") , la risposta sarà solo una riga con il numero di valori non mancanti per ogni variabile di dati.
Vedere la[orderBy... documentazione](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#orderBy)Grazie a Ben Adams.
    * NUOVO.ncfile oJson Tipo opzione per set di dati grigliati e tabulari. Questa opzione rende unNCOlvl=2 "pedantic" JSON file con tutte le informazioni normalmente trovate in un.ncfile. Vedi[ http://nco.sourceforge.net/nco.html#json ](https://nco.sourceforge.net/nco.html#json)Grazie a Charlie Zender.
    * BUG FIX: TheorderBy... () opzioni sulla pagina web Make A Graph sono ora gestite correttamente.
    * BUG FIX: .geoJson output ora non stampa righe dove manca il lat o i valori lon. Inoltre, valori di altitudine (se disponibile) sono ora inclusi nelle coordinate, non come valori di dati. Grazie a Jonathan Wilkins.
         
*    **CoseERDDAP™Gli amministratori devono sapere e fare:**   
     
    * ISSUE DI SICUREZZA: La libreria protocolli.js utilizzata per laOpenLayersdemo sulWMSpagineERDDAP™è out-of-date e ha un bug che potenzialmente permette di essere abusato. (Purtroppo, l'aggiornamentoOpenLayerse protocolli. js non è facile.) Questo apre la possibilità che la biblioteca possa essere impostata per consentire una vulnerabilità cross-site. Tuttavia, dalERDDAP™solo usiOpenLayersin modo specifico pre-set-up e solo con specificoERDDAP- fonti di dati basate, crediamo che non ci sia vulnerabilità cross-site inERDDAPL'uso diOpenLayerse protocolli.js. Tuttavia, se non credete a questo, ora potete disabilitare l'uso delOpenLayersdemo sulWMSpagine delle tueERDDAP™aggiungendo
```
        <openLayersActive>false</openLayersActive>  
```
al file setup.xml. Il default è "vero". Grazie a Charles Carleton e NCEI.
    * SICUREZZA: file .jar non utilizzati e file .jar duplicati (perché sono anche in netcdfAll.jar) sono stati rimossi dalERDDAP™distribuzione. I file .jar non aggiornati sono stati aggiornati. Grazie a Charles Carleton e NCEI.
    * SPESE DI SICUREZZA: Il file netcdfAll.jar distribuito conERDDAP™è l'ultima versione (attualmente 4.6.10) , ma contiene ancora i file jackson .jar interni che sono noti per essere out-of-date e avere vulnerabilità di sicurezza, in particolare le librerie Jackson che vengono utilizzate solo quando si accede alle fonti di dati Amazon S3. Se non si accede ai dati tramite Amazon S3 (tu sapresti se fossi) , queste vulnerabilità non sono rilevanti.
        
Gli sviluppatori di netcdf-java sostengono che queste vulnerabilità non sono rilevanti a causa del modo in cui il codice netcdf utilizza queste librerie e in ogni caso sarebbe rilevante solo quando si accede Amazon S3. Vedi[ https://github.com/Unidata/thredds/issues/866 ](https://github.com/Unidata/thredds/issues/866). Io credo a loro. Se avete ancora preoccupazioni su questo, si prega di contattare gli sviluppatori netcdf-java. (Nota che se non credete agli sviluppatori netcdf-java e state contemplando di non usareERDDAP™a causa di questo, non si dovrebbe utilizzare THREDDS, perché THREDDS utilizza netcdf-java più fondamentalmente e più estesamente diERDDAP.) 
        
Dettagli: Il codice problematico e gli avvisi di vulnerabilità sono:
netcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-databind/pom.xml
Vedi https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Alto
netcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.dataformat/jackson-format-cbor/pom.xml
Vedi https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Alto
netcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-annotations/pom.xml
Vedi https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Alto
Vedi https://nvd.nist.gov/vuln/detail/CVE-2016-3720 -- Critical
netcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-core/pom.xml
Vedi https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Alto
Vedi https://nvd.nist.gov/vuln/detail/CVE-2016-3720 -- Critical
"Per la versione 4.6.10, aws-java-sdk-core tira nella versione 2.6.6 di artefatti jackson-\\*." (email da netcdf-java persone) .
Grazie a Charles Carleton e NCEI.
        
    * PRESIDENZA DELLON. Se ricompilaERDDAP™, nota che il parametro -cp classpath necessario per la riga di comando è ora molto più breve di prima. Vedere la nuova impostazione -cp in[questa documentazione](/docs/contributing/programmer-guide#development-environment). Grazie a Charles Carleton e NCEI.
    * NUOVO OPTION in GenerateDataset Xml: EDDTableFromBcodmo, che è solo per uso interno a BCO-DMO.
Grazie a Adam Shepherd e BCODMO.
    * NUOVA ATTRIBUTE e CARATTERISTICHE: Se una colonna EDDTable ha nomi di file di file accessibili web (ad esempio, immagini, video o file audio) , si può aggiungere
```
        <att name="fileAccessBaseUrl">_someBaseURL_</a>  
```
per specificare l'URL di base (termina con /) necessario per rendere i nomi dei file in URL completi. Allora.htmlTablerisposte,ERDDAP™mostrerà il nome del file come link all'URL combinato (la base Url più il nome del file) .
Se vuoiERDDAP™per servire i file correlati, fare un separato EDDTableFromFileNames dataset per quei file (può essere un set di dati privato) .
Grazie a Adam Shepherd e BCODMO.
    * NUOVO RACCOMANDAZIONE ATTRIBUTE: Se una colonna EDDTable ha i nomi di file di file web accessibili (ad esempio, immagini, video o file audio) che sono accessibili tramite un archivio (ad esempio,.zipfile) accessibile tramite un URL, utilizzare
```
        <att name="fileAccessArchiveUrl">_theURL_</att>  
```
per specificare l'URL per l'archivio.
Se vuoiERDDAP™per servire il file di archivio, fare un separato EDDTableFromFileNames dataset per quel file (può essere un set di dati privato) .
Grazie a Adam Shepherd e BCODMO.
    * MIGLIORATI per generareDatasets Xml per rimuovere le cause di invalido / cattivo&lt;subsetVariables&gt; suggerimenti e duplicati/cattivo nomi variabili suggeriti, ecc. Grazie a Rich Signell, Adam Shepherd e BCO-DMO.
    * NUOVA OPZIONE: L'informazione sui confini politici distribuitaERDDAPè di una terza parte e un po' fuori moda. Inoltre, ci sono confini contestati in diversi luoghi del mondo, dove le persone diverse avranno idee diverse su ciò che è corretto. Non facciamo appello alla CORRETENZA dei dati biblici POLITICHE che vengono conERDDAP. Se non ti piace l'informazione di confine politica che viene conERDDAP™# Ora puoi dirlo #ERDDAP™per non tirare mai i confini politici aggiungendo
```
        <politicalBoundariesActive>false</politicalBoundariesActive>  
```
al file setup.xml. Il default è "vero". Grazie a Raju Devender.
    * NUOVO TAG METADATA: Neldatasets.xmlper un dataset, è ora possibile specificare il numero predefinito di colore Sezioni di barre per undataVariablesu grafici e mappe con
```
        <att name="colorBarNSections">_anInteger_</att>  
```
         (default=-1, che dice di lasciareERDDAP™decidere) . Vedere la[colore Impostazioni della barra](/docs/server-admin/datasets#color-bar-attributes).
    * MIGLIORE: il colore del confine di stato sulle mappe era viola (Deep Purple per te Baby Boomers) . Ora è grigio (in tra il confine nazionale grigio e la terra grigio) .
    * BUG FIX:&lt;iso19115File&gt; e&lt;fgdcFile&gt; indatasets.xmlnon sono sempre stati gestiti correttamente. Ora lo sono. Grazie a BCO-DMO.

## Versione 1.78{#version-178} 
 (rilasciato 2017-05-27) 

*    **Nuove funzionalità (per gli utenti) :**   
     
    *    (nessuno)   
         
*    **CoseERDDAP™Gli amministratori devono sapere e fare:**   
     
    * MIGLIORATO: L'ordine delle linee in "Major LoadDatasets Time Series" sulla pagina status.html è ora più nuovo in cima a più vecchio in basso.
    * BUG FIX:ERDDAP™ora scrive.nccsvfile con la variabile di tempoactual\\_rangecome tempo di stress ISO-8601. Questo risolve il bug con EDDTableFromErddap parsing info da un set di dati remoto e dal file di avvio rapido per tutti EDDTableFrom...Files datasets. (Il tempoactual\\_rangesarà sbagliato la prima volta che il dataset carica in v1.78 ma corretto dopo che è ricaricato, ad esempio, se si segnala il dataset.) 

## Versione 1.76{#version-176} 
 (rilasciato 2017-05-12) 

*    **Nuove funzionalità (per gli utenti) :**   
     
    * CHANGE in Tomcat: Per richiesteERDDAP™provenienti da software diversi dai browser web (ad esempio,curl, R,Matlab♪Python♪Java) :
Come con precedenti modifiche nelle versioni di Tomcat (il software di livello inferiore che esegueERDDAP) dall'inizio del 2016, sempre più caratteri nella parte di query dell'URL della richiesta devono essere[ **Percentuale codificato** ](/docs/server-admin/datasets#infourl)per motivi di sicurezza. I browser si prendono cura di per cento codifica per voi. così facendoERDDAP™in un browser non è interessato a meno che la richiesta venga reindirizzata ad un altroERDDAP.
    * Precedentemente,ERDDAP™trattato trattato **variabili di beneficenza** più come interi brevi non firmati che personaggi. Ora li tratta più come 1-character-long UCS-2 (Unicode) Strings. Vedi il[documentazione di beneficenza](/docs/server-admin/datasets#char). Grazie a Aurelie Briand e al progetto Argo.
    * Precedentemente,ERDDAP™poco sostegno offerto per **Personaggi Unicode** sopra il carattere #255 in Strings. Ora, internamente,ERDDAP™Supporta pienamente 2 byte UCS-2 carboni (caratteri numerati da 0 a 65535) in Strings. Quando i dati di stringa sono scritti a vari tipi di file,ERDDAP™fa il meglio che può sostenere 2 byte chars. Un altro esempio è file .csv cheERDDAP™scrive con il charset ISO-8859-1 (a 1 byte charset) #ERDDAP™scrive tutti i caratteri sopra il carattere #255 con la sintassi JSON-like \\u_hhh_. Vedi[Dati di stringa](/docs/server-admin/datasets#string).
    * MIGLIORATO: In.ncfile scritti daERDDAP™, variabili di beneficenza da interpretare come Strings avrà l'attributo
         **\\_Encoding=ISO-8859-1**   
In.ncfile letti daERDDAP™, variabili di beneficenza con "\\_Encoding" saranno interpretate come Strings con il charset specificato.
    * REMINDER:ERDDAP™Supporti **JSON-come backslash-encoding** di caratteri speciali quando si specificano vincoli di char e String variabili. Così si può richiedere qualcosa come &myString="\\u20ac" quando si desidera righe di dati in cui myString=€ dal 20ac è la versione esadecimale del codice punto per il simbolo Euro. Diverse fonti sul web mostrano i numeri dei punti di codice per i simboli Unicode, ad esempio,[ https://en.wikipedia.org/wiki/Unicode ](https://en.wikipedia.org/wiki/Unicode).
    * Precedentemente,ERDDAP™supporto limitato offerto per **lungo intero** variabili. OraERDDAP™supporta pienamente i lunghi interni e fa del suo meglio quando si scrive dati lunghi a vari tipi di file. Vedi il[lunga documentazione](/docs/server-admin/datasets#long). Grazie all'Irlanda's Marine Institute, Craig Risien, Rich Signell, Christopher Wingard e OOI.
    * NUOVO: tipo di file di uscita per grigliadap etabledap: **.nccsv** , che faNetCDF-come, ASCII, file CSV che contiene anche tutti i metadati che sarebbero in un paragonabile.ncfile. Vedere la[NCCSV Specificazione](/docs/user/nccsv-1.00). Grazie a Steve Hankin.
    * NUOVO: **orderByClosestfiltro** consente di specificare come la tabella dei risultati sarà ordinata e un intervallo (per esempio, 2 ore) . All'interno di ogni gruppo, saranno mantenute solo le righe più vicine all'intervallo. Per esempio,orderByClosest ("stationID, tempo, 2 ore") sarà ordinatastationIDe il tempo, ma solo restituire le righe per ognistationIDdove l'ultimoorderBycolonna (tempo) è più vicino a intervalli di 2 ore. Questa è la cosa più vicinatabledapin una richiesta di grigliata. Questa opzione può essere specificata tramite qualsiasitabledappagina web .html di dataset, pagina web .graph, e da qualsiasi URL che si genera. Grazie all'Irlanda Marine Institute e Ocean Networks Canada.
    * NUOVO: **orderByLimitfiltro** consente di specificare come la tabella dei risultati sarà ordinata e un numero limite (ad esempio, 100) . All'interno di ogni gruppo, saranno mantenute solo le prime righe "limite". Per esempio,orderByMax ("stationID, 100") sarà ordinatastationID, ma solo restituire le prime 100 righe per ognistationID. Questo è simile alla clausola LIMIT di SQL. Questa opzione può essere specificata tramite qualsiasitabledappagina web .html di dataset, pagina web .graph, e da qualsiasi URL che si genera. Grazie all'Irlanda Marine Institute e Ocean Networks Canada.
    * NUOVO: Due nuovi tipi di file di risposta, **.jsonlCSVe.jsonlKVP** sono disponibili per richieste di set di dati grigliati, set di dati tabulari e molti altri luoghi inERDDAP  (ad esempio, richieste di informazioni sui set di dati) . I file sono file JSON Lines ([ https://jsonlines.org/ ](https://jsonlines.org/)) dove ogni riga ha un oggetto JSON separato..jsonlCSVha solo i valori in un formato CSV..jsonlKVPha la chiave: coppie di valori. Ogni linea è da sola. Le linee non sono racchiuse in un più grande array JSON o oggetto. Per esempio, vedi[questa richiesta campione](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst.jsonlKVP?longitude%2Clatitude%2Ctime%2Cstation%2Cwmo_platform_code%2CT_25%26time%3E=2015-05-23T12:00:00Z%26time%3C=2015-05-31T12:00:00Z). Grazie a Damian Smyth, Rob Fuller, Adam Leadbetter e l'Irlanda Marine Institute.
    * NUOVO: C'è una nuova documentazione che descrive[ **Come accedere a Dataset privatiERDDAP™via Scripts** ](/docs/user/AccessToPrivateDatasets). Grazie a Lynn DeWitt.
    * MIGLIORE: L'estensione minima della **OpenLayers** la mappa era di 2 gradi ed ora è di 4 pixel di dati. Grazie a Rusty Holleman.
    * MIGLIORE: In alcuni casi comuni, richieste che includono un **espressione regolare** vincolo sarà elaborato molto più veloce.
         
*    **CoseERDDAP™Gli amministratori devono sapere e fare:**   
     
    *    **FIRST STARTUP:** La prima volta che si avvia questa nuova versione, ci vorrà molto tempo perERDDAP™per caricare tutti i dataset perché ha bisogno di rileggere tutti i datafile sorgente (anche se solo l'intestazione per i file di dati grigliati) . Se si guarda i registri si possono vedere messaggi di errore che dicono "vecchio / non supportato miglioratoVersione" di alcuni file interni -- va bene --ERDDAP™farà le nuove versioni dei file interni. Sii paziente.
    * AZIONE:ERDDAP™ora utilizza il nuovo **java.time** classi (noto anche come JSR 310) invece di Joda per parse Tempi di stringa in tempi numerici. Note:
        * SeERDDAP™improvvisamente ha problemi di parsing Tempi di stringa per un dato set di dati e quindi si converte più o tutte le volte a NaN's (valori mancanti) , il problema è quasi sempre con la data stringa di formato di tempo che hai specificato come le "unità" della variabile. Il nuovo sistema a volte ha bisogno di una stringa di formato dateTime leggermente diversa.
        * Se i mesi numerici e i giorni nella dataLe stringhe del tempo non sono a 0-imbottite (ad esempio, "3/7/2016") , assicurarsi che il formato appena ha un singolo M e d (ad esempio, "M/d/yyyyy", non "MM/dd/yyyy") .
        * Modificare le specifiche dei secondi frazionari che utilizzano la s minuscola (ad esempio, il .ss inyyyy-MM-dd- Si'.) , nel capitale S's, (ad esempio,yyyy-MM-dd'T'HH:mm:ss.SSS) .
        *   ERDDAP™non supporta più la data di stringa Formati del tempo con anni a due cifre (Sì.) con un secolo implicito (ad esempio, 1900 o 2000) . Le imprese hanno speso miliardi di dollari per risolvere questo problema alla fine del 1990. Gli scienziati non dovrebbero usare due anni di cifre. Si prega di risolvere il file sorgente (#) convertendo a 4 cifre anni, quindi utilizzare yyyy nella data Formato del tempo.
        * Puoi usare yyyy o YYYY (cheERDDAP™converti in uuu) a parse 4 anni di cifra, compresi gli anni negativi, ad esempio, -4712 (che è 4713 BC) . Grazie a SeaDataNet, Thomas Gardner e BODC.
        * Si prega di continuare a utilizzare Z entro un formato dateTime per ottenereERDDAPper analizzare un tempo compensato (Per esempio, Z, +0200, -08, -0800, -08:30) .
        *    **Assicurarsi di utilizzareJavaversione 1.8.0\\_21 o superiore.** 
        * Programmatori -- Se scriviJavaprogrammi che funzionanoERDDAP™codice, è necessario rimuovere il riferimento a joda-time. barattolo nel parametro del percorso di classe.
    * NUOVO:ERDDAP'[Archivio Strumento di Dataset](/docs/server-admin/additional-information#archiveadataset)può ora creare[ **File BagIt** ](https://en.wikipedia.org/wiki/BagIt). NCEI può standardizzare su questo formato. Grazie a Scott Cross e John Relph.
    * MIGLIORE: I link per scaricare l'erddap. la guerraERDDAP™pagine web ora punta a **GitHub** . (Sono collegamenti pubblici, quindi non devi aderire a GitHub.) Ciò significa download molto più veloci (fino a 12Mb/s contro 1Mb/s) e pochi problemi con i download. Grazie a Damian Smyth, Rob Fuller, Adam Leadbetter, Conor Delaney e l'Irlanda Marine Institute.
    * MIGLIORATO: Il **stato.html pagina e il quotidiano Status Report email** ora include una sezione "Major LoadDatasets Time Series" che mostra le statistiche suERDDAP™come della fine di ogni carico principaleDatasets per gli ultimi 100 carichi principaliDatasets. Grazie al nostro fastidioso RAID.
    * NUOVO: un nuovo, opzionale (ma consigliato) parametro per EDDTableFromCassandra datasets: [ ** &lt;partizioneKeyCSV&gt; ** ] (/docs/server-admin/datasets#partitionkeycsv) . Grazie a Ocean Networks Canada.
    * NUOVO: EDDTableFromAsciiFiles ora supporta ** &lt;colonnaSeparatore&gt; ** parametro. Se null o "", la classe intuirà, come prima, Altrimenti, il primo carattere verrà utilizzato come separatore di colonna durante la lettura dei file. Grazie a Sky Bristol e Abigail Benson.
    * Nuovo: il nuovo tipo di dataset,[ **EDDTableFromNccsvFiles** ](/docs/server-admin/datasets#eddtablefromnccsvfiles), può fare un set di dati aggregando[File NCCSV .csv](/docs/user/nccsv-1.00). Grazie a Steve Hankin.
    * MIGLIORE: **EDDTableFromErddap** ora usi.nccsvper ottenere informazioni da remotoERDDAPs e per l'archivio locale di quelle informazioni sui metadati. Questo consente il supporto completo per i tipi di dati di tipo char e lungo, e per Unicode (UCS-2) charset per beneficenza e archi. Grazie a Rob Fuller e all'Istituto Marino d'Irlanda.
    * MIGLIORATO: EDDTableFromErddap eEDDGridFromErddap ora supporto ** &lt;redirect&gt;false&lt;/Redirect&gt; ** che diceERDDAP™mai reindirizzare la richiesta al telecomandoERDDAP. Il default è vero. Questo è utile quando il telecomandoERDDAP™è un privatoERDDAP. Grazie a Damian Smyth, Rob Fuller e all'Istituto Marino d'Irlanda.
    * MIGLIORE:ERDDAP™ora cattura **richieste di utenti cancellate** Prima. EERDDAP™Ora si spegne più velocemente perché i fili di basso livello si spegneno più velocemente. Grazie al nostro fastidioso RAID.
    *    **Generare i dati Xml:** 
        * NUOVO: La nuova speciale EDDType "ncdump" stampa un[NC](https://linux.die.net/man/1/ncdump)\\-come stampa dell'intestazione di un.ncfile. È inoltre possibile stampare i valori di dati per variabili specificate (o inserire "niente" per non stampare alcun valore di dati) . Questo è utile perché, senza ncdump è difficile sapere che cosa è in un file e quindi quale EDDType si dovrebbe specificare per GenerateDatasetsXml. Grazie a Craig Risien, Rich Signell, Christopher Wingard e OOI.
        * NUOVO: per SeaData Dati netti:
Se del caso, GenerateDatasets Xml fa ora una specifica conversione semantica utilizzando una query SPARQL remota: se i metadati sorgenti di una variabile includono un sdn\\_parameter\\_urn, ad esempio, sdn\\_parameter\\_urn = "SDN:P01:::PSLTZZ01", GenerateDatasets Xml aggiungerà l'attributo P02 corrispondente, ad esempio, sdn\\_P02\\_urn = "SDN:P02::PSAL". Se hai set di dati che utilizzano questi attributi, e se il tuoERDDAP'&lt;categoryAttributes&gt; in setup.xml include sdn\\_parameter\\_urn e sdn\\_P02\\_urn, gli utenti saranno in grado di utilizzareERDDAP™Categoria sistema di ricerca per la ricerca di set di dati con valori specifici di questi attributi. Grazie a BODC e Alexandra Kokkinaki.
        * MIGLIORE: GenerareDatasets Xml ora cambia moltihttp://riferimenti nei metadati ahttps://quando opportuno.
        * MIGLIORE: GenerareDatasets Xml ora cerca di indovinare creatore\\_type ed editore\\_type.
        * MIGLIORE: I dati della variabileTipi suggeriti da GenerateDatasets Xml sarà un po' meglio. Grazie a Margaret O'Brien, LTER e EML.
        * MIGLIORE: GenerareDatasets Xml è meglio specificare il&lt;cdm\\_data\\_type&gt; e l'aggiunta degli attributi relativi e richiesti (ad esempio,&lt;cdm\\_timeseries\\_variables&gt;), in modo da poter fornire tali informazioni. Grazie a Rich Signell.
        * MIGLIORE: In GenerateDatasets Xml, per set di dati EDDTable, il suggerimento per&lt;subsetVariables&gt; è ora molto più conservatore. Grazie a John Kerfoot.
        * MIGLIORE: Sedatasets.xmlper un datasets specificafeatureTypema non cdm\\_data\\_type, ilfeatureTypesarà utilizzato come cdm\\_data\\_type. Grazie a Rich Signell.
        * BUG FIX: generare Datasets Xml ora suggerisce il corretto&lt;dataType&gt; per variabili di datiscale\\_factor♪add\\_offsete/o attributi \\_Unsigned.
    * MIGLIORE: QuandoERDDAP™apre una.ncfile che è **più breve** che dovrebbe essere (ad esempio, non è stato completamente copiato in posizione) ♪ERDDAP™ora tratta il file male. Negli episodi precedenti...ERDDAP™restituito i valori mancanti per qualsiasi parte mancante del file perché questo è il comportamento predefinito per netcdf-java.ERDDAP™ora utilizza ucar.nc2.iosp.netcdf3.N3header.disallowFileTruncation = true; Grazie al nostro fastidioso RAID e Christian Ward-Garrison.
    * MIGLIORE: lo scrittore ISO 19115 fa ora uso di **creatore/tipo** Se presente.
    * MIGLIORE:ERDDAP™ora utilizza l'ultimo netcdf-java v4.6.9 che può leggere tipi aggiuntivi di **netcdf-4 file** . Grazie a Craig Risien, Rich Signell, Christopher Wingard e OOI.
    * BUG FIX: evitare problemi se diversi file di origine hanno diversi tipi di dati per una determinata variabile. Grazie a Roy Mendelssohn e Eugene Burger.
    * BUG FIX: **Conversioni di formato di tempo** sono ora meglio protetti contro i valori del tempo cattivo. Grazie a NDBC.
    * BUG FIX:EDDGridDa NcFiles Unpacked ora gestisce i valori di tempo con **"mesi da ..." e "anni da ..."** correttamente (aumentando il mese o l'anno, non aggiungendo grezzo ad esempio, 30 giorni ripetutamente) . Grazie a Soda3.3.1.
    * BUG FIX: solo in v1.74, **sottoscrizioni** richiesto un'azione (ad esempio,http://...) , che era e dovrebbe essere facoltativo.
    * BUG FIX:EDDGridDaMergeIRFiles.lowGetSourceMetadata () non ha aggiunto attributi globali. Ora si'.
         

## Versione 1.74{#version-174} 
 (rilasciato 2016-10-07) 

*    **Nuove funzionalità (per gli utenti) :**   
     
    * Ora, quando una lista di dati (Tutti, o da una ricerca) viene visualizzato su una pagina web, i titoli lunghi vengono visualizzati su più linee. In precedenza, il mezzo di un lungo titolo è stato sostituito da "... ". Grazie a Margaret O'Brien, LTER e EML.
         
*    **CoseERDDAP™Gli amministratori devono sapere e fare:**   
     
    * TO DO: Su computer Linux, modificare le impostazioni di timeout di Apache in modo che le richieste degli utenti che richiedono tempo non timeout (con quello che spesso appare come un errore "Proxy" o "Bad Gateway") . Come utente root:
        
        1. Modificare il Apachehttpfile d.conf (di solito in /etc/httpd/conf/) :
Cambiare l'esistente&lt;Impostazione del tempo (o aggiungere uno alla fine del file) a 3600 (secondi) , invece dei 60 o 120 secondi di default.
Cambiare l'esistente&lt;Per saperne di più impostazione (o aggiungere uno alla fine del file) a 3600 (secondi) , invece dei 60 o 120 secondi di default.
        2. Riavviare Apache: /usr/sbin/apachectl -k graziosa (ma a volte è in una directory diversa) .
        
Grazie a Thomas Oliver.
         
    * NUOVO:\\[BigParentDirectory/hard Directory della bandiera
Questo funziona come la directory di bandiera, ma la versione hardFlag elimina anche tutte le informazioni di dataset cache. Non ci sono URL per impostare un hardFlag. Questo può essere utilizzato solo mettendo un file in quella directory.
duro Le bandiere sono molto utili quando si fa qualcosa che provoca un cambiamento in comeERDDAP™legge e interpreta i dati di origine, ad esempio, quando si installa una nuova versione diERDDAP™o quando hai apportato alcuni tipi di modifiche alla definizione di un datasetdatasets.xml. Vedi[questa documentazione](/docs/server-admin/additional-information#hard-flag). Grazie a John Kerfoot e a tutti i gruppi Argo.
         
    * NUOVO: Genera i dati Xml ora ha un'opzione EDDTableFromEML
che legge una descrizione del set di dati in un linguaggio Ecological Metadata (EML) file, scarica il relativo file di dati, e genera un pezzo didatasets.xmlin modo che il dataset possa essere aggiuntoERDDAP. C'è anche un EDDTableFromEMLBatch che fa la stessa cosa per tutti i file EML in una directory. Questo funziona molto bene perché EML fa un ottimo lavoro per descrivere il dataset e perché KNB e LTER rendono disponibili i file di dati reali.
EML plusERDDAP™potrebbe essere una grande combinazione, poichéERDDAP™potrebbe dare agli utenti più accesso diretto alla ricchezza di dati KNB e LTER e aiutare questi progetti incontrare il governo degli Stati Uniti[Accesso pubblico ai risultati della ricerca (PARERI) requisiti](https://nosc.noaa.gov/EDMC/PD.DSP.php)rendendo i dati disponibili tramite un servizio web.
Vedi[questa documentazione](/docs/server-admin/EDDTableFromEML). Grazie a Margaret O'Brien, LTER e EML.
         
    * NUOVO: Genera i dati Xml ora ha un EDDTableFromInPort opzione
che legge una descrizione del set di dati in un file InPort XML e cerca di generare un pezzo didatasets.xmlin modo che il dataset possa essere aggiuntoERDDAP. Questo raramente crea un pezzo di XML pronto all'uso perdatasets.xml, ma creerà una buona bozza ruvida che è un buon punto di partenza per la redazione da parte di un umano.
Sarebbe bello se le persone che utilizzano InPort per documentare i loro set di dati utilizzassero ancheERDDAP™per rendere disponibili i dati effettivi tramiteERDDAP's servizi web e quindi incontrare il governo degli Stati Uniti eNOAA'[Accesso pubblico ai risultati della ricerca (PARERI) requisiti](https://www.whitehouse.gov/blog/2013/02/22/expanding-public-access-results-federally-funded-research)rendendo i dati disponibili tramite un servizio web. Questa è una soluzione che potrebbe essere utilizzata in questo momento. (erd.data at noaa.govè felice di aiutare.)   
Vedi[questa documentazione](/docs/server-admin/datasets#eddtablefrominport). Grazie a Evan Howell e Melanie Abecassis.
         
    * MIGLIORE:ERDDAP™ora utilizza netcdf-java 4.6.6.
Con versioni precedenti, netcdf-java leggere alcuni valori di riempimento (forse, solo in netcdf-4 file) Come 0. Ora legge alcuni di loro come il valore di riempimento standard netcdf: -127 per byte, -32767 per shorts, -2147483647 per ints.Unidatadice che il nuovo comportamento è il comportamento corretto. Se una variabile in un set di dati inizia a mostrare uno di questi valori in cui mostravano 0's, è possibile aggiungere, ad esempio,
```
        <att name="\\_FillValue" type="short">-32767</att>  
```
alla variabileaddAttributesper direERDDAP™per trattare questo valore comemissing\\_value/ Valore. Tuttavia, in molti casi, che non cederà il risultato desiderato: 0. Se è così, considerare di modificare i file conNCOo riscrivere i file. I reclami? Si prega di contattareUnidata;
         
    * TO DO: Nuova Topografia
Vi incoraggio a passare tutti i dataset che utilizzano la tavolozza OceanDepth per utilizzare la nuova tavolozza TopographyDepth, che è come Topography, tranne che con i colori girati, in modo che sia adatto per valori di profondità (Traduzione:) , invece dei valori di altitudine (Traduzione:) . Le impostazioni consigliate per questa tavolozza sono:
```
            <att name="colorBarMaximum" type="double">8000.0</att>
            <att name="colorBarMinimum" type="double">-8000.0</att>
            <att name="colorBarPalette">TopographyDepth</att> 
```

    * NUOVA CARATTERISTICA: Stringmissing\\_valuee/o \\_FillValore
Se una variabile String definisce unamissing\\_valuee/o \\_FillValore,ERDDAP™rimuoverà questi valori dai dati e li sostituirà con una stringa vuota, in modo che i valori mancanti appaiono come stringhe vuote, come con altri set di dati inERDDAP. Grazie a Margaret O'Brien, LTER e EML.
         
    * NUOVA CARATTERISTICA: Supporto per gli orari locali
le variabili timestamp con i dati di origine da Strings possono ora specificare una zona di tempo tramite un "time\\_zone"attributo che conduceERDDAP™per convertire i tempi di origine locale-tempo-zona (alcuni in Standard time, alcuni in Daylight Tempo di risparmio) aZulutempi. L'elenco dei nomi di fuso orario valido è probabilmente identico all'elenco nella colonna TZ nella[questo tavolo](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). Il default è "Zulu". I fusi orari comuni degli Stati Uniti sono: US/Hawaii, US/Alaska, US/Pacific, US/Mountain, US/Arizona, US/Central, US/Eastern. Per variabili di timestamp con dati di origine numerica, è possibile specificare il "time\\_zone"attributo, ma il valore deve essere "Zulu"o "UTC". Grazie a Margaret O'Brien, LTER e EML.
         
    * NUOVA CARATTERISTICA: EDDTableFromAsciiFiles ora supporta i file semi-parati
ed è più intelligente per capire il separatore. Grazie a Margaret O'Brien, LTER e EML.
         
    * NUOVA CARATTERISTICA: Se c'è un errore significativo in loadDatasets (maggiore o minore, ad esempio, un mancante o invalidodatasets.xmldocumento) ♪ERDDAP™lo indicherà ora in status.html, proprio sotto "n Datasets Failed To Load" come ERROR: mentre l'elaborazionedatasets.xml: vedi log.txt per i dettagli.
         
    * NUOVA CARATTERISTICA:ERDDAP™cerca gli orfani.
QuandoERDDAP™fa un carico importante Datasets, ora cerca set di dati orfani (set di dati che sono inERDDAP™ma nondatasets.xml) . Se trovato, sono elencati in status.html, proprio qui sotto "n Datasets Failed To Load" come ERROR: n Orphan Datasets (datasets inERDDAP™ma nondatasets.xml) = ...
Se si desidera rimuovere (scarico) un orfano daERDDAP™, devi aggiungere
        &lt;dataset type="_anyValidType_"datasetID="_theDatasetID_" active="false" /&gt;
adatasets.xmlfino a quando il dataset viene scaricato durante il prossimo carico principaleDatasets.
         
    * BUG FIX: Se un set di dati ha una variabile di timestamp numerica con unità diverse da quelle"seconds since 1970-01-01T00:00:00Z"e con il&lt;updateEveryNMillis&gt; sistema attivo, la gamma della variabile timestamp è stata impostata in modo errato quando l'impostazione dei dati è stata aggiornata. Grazie a John Kerfoot.
         
    * BUG FIX: Se&lt;quickRestart&gt; era vero in setup.xml e hai richiesto i dati da un EDDTableDa... Dataset file utilizzato&lt;updateEveryNMillis&gt;, la prima richiesta al dataset sarebbe fallita, ma le richieste successive sarebbero riuscite. Ora la prima richiesta non fallira'. Grazie a John Kerfoot.
         
    * BUG FIX: Il GenerateDatasetsXml.sh e .bat non hanno funzionato con &gt;9 parametri sulla riga di comando. Ora si'. Grazie a John Kerfoot.
         
    * BUG FIX: Il nuovo EDDTableFromMultidimNcFiles non ha costantemente rimosso gli spazi trailing dalle stringhe. Ora si'. In particolare, questo ha interessato i file ARGO. Grazie a Kevin O'Brien e Roland Schweitzer.
         
    * BUG FIX: Tutti gli accessi a distanzaDAPi servizi sono ora avviati da codice più moderno. Questo risolve l'errore "connessione chiusa" quando si accede ad alcuni set di dati EDDTableFromErddap. Grazie a Kevin O'Brien.
         
    * BUG FIX: La gestione dellaorderBy... () e distinto () sono ora di nuovo al modo in cui erano prima delle recenti modifiche: una data richiesta potrebbe avere piùorderBy... () e/o un distinto () filtro;ERDDAP™li gestirà nell'ordine che sono specificati. Grazie a David Karuga.
         
    * BUG FIX: Se il dataset è EDDTableFromDatabase e una query ha[fonteCanOrderBy](/docs/server-admin/datasets#sourcecanorderby)e/o[fonteCanDoDistinct](/docs/server-admin/datasets#sourcecandodistinct), allora il database può (a seconda delle impostazionidatasets.xml) maniglia in parte o completamente **solo il primo**  orderBy. () o distinte () . Grazie a David Karuga.
         
    * BUG FIX: La recente codifica extra per cento ha causato problemi con alcune domande per.ncFile CF, ad esempio, "Stato HTTP 500 - Errore di query: variabile=station è elencato due volte nell'elenco delle variabili dei risultati." Grazie a Kevin O'Brien.
         
    * BUG FIX: EDDTableFromFiles aveva difficoltà a ricaricare un set di dati quando una delle colonne era una vera colonna di beneficenza. Grazie a Roland Schweitzer.
         
    * BUG FIX:EDDGridDa NcFiles Unpacked ora converte anchemissing\\_valuee \\_FillValore ai valori standard in modo che i file con valori diversi possano essere aggregati. A causa di questo cambiamento, dopo aver installato questa nuova versione diERDDAP™, si prega di impostare un[duro Bandiera](/docs/server-admin/additional-information#hard-flag)per ciascunoEDDGridDa NcFiles Dataset non imballato nel tuoERDDAP.
         
    * MIGLIORE: EDDTableFromNcCFFiles ora può gestire i file che hanno più campionario\\_dimensione. Un dato dataset deve utilizzare solo variabili che utilizzano una delle dimensioni del campione. Grazie ad Ajay Krishnan.
         
    * MIGLIORATO: Per EDDTableDa...Files,&lt;sortFilesBourceNames &gt; ora permette la virgola-separata (raccomandato) o liste separate di sorgenti variabili. In entrambi i casi, singoli nomi variabili possono essere circondati da doppie citazioni, ad esempio, se il nome ha uno spazio interno.

## Versione 1.72{#version-172} 
 (rilasciato 2016-05-12) 

*    **Nuove funzionalità (per gli utenti) :** Nessuno.
     
*    **CoseERDDAP™Gli amministratori devono sapere e fare:** 
    * NUOVO EDDTableFromMultidimNcFiles[EDDTableFromMultidimNcFiles](/docs/server-admin/datasets#eddtablefrommultidimncfiles)è una nuova alternativa a EDDTableFromNcFiles. È progettato per affrontare gruppi di file con diverse variabili con dimensioni condivise, ad esempio var1\\[a\\]\\[B\\], var2\\[a\\], var3\\[B\\]scalarVar. Grazie al progetto Argo, Aurélie Briand e Roland Schweitzer.
    * BUG FIX:ERDDAP™  (tramite le classi FileVisitorDNLS e FileVistorSubdir) ora segue link simbolici su Linux.ERDDAP™ancora non segue .lnk su Windows.
    * BUG FIX di bug introdotto in 1.70: distinta +orderBynon sono stati ammessi insieme in una sola richiesta. Ora sono di nuovo. Non sono reciprocamente esclusivi / ridondanti. Grazie a David Karuga.
    * SVILUPPOdatasets.xmlblacklist degli indirizzi IP:
Gli indirizzi IP v4 appaionoERDDAP™come 4 numeri di esagonali separati.
Penso che gli indirizzi IP v6 appaiono come numeri di esagonali separati da 8 punti.
Quindi...ERDDAP™ora supporta i punti degli indirizzi IP in quella lista e :\\* alla fine dell'elenco per bloccare una gamma di indirizzi.
    * MIGLIORE:ERDDAP™ora utilizza NetcdfFileWriter per scrivere.ncfile invece del deprecato NetcdfFileWriteable. Non ci dovrebbe essere alcun cambiamento discernibile ai file risultante. Questo apre la possibilità di fare grandi.ncfile che utilizzano.nc3 estensioni a 64 bit. Se si desidera / necessario, si prega di inviare una richiesta dierd.data at noaa.gov.
    * MIGLIORATO: Molti dei link ai siti web remoti erano fuori-data. Ora sono aggiornate e usatehttps:invece dihttp: quando possibile.
    * Molti piccoli cambiamenti.

## Versione 1.70{#version-170} 
 (rilasciato 2016-04-15) 

*    **Nuove funzionalità (per gli utenti) :** Nessuno.
     
*    **CoseERDDAP™Gli amministratori devono sapere e fare:** Di seguito, ci sono diverse modifiche consigliate alla documentazione nel file setup.xml.
Si prega di fare questi cambiamenti ora.
30 minuti di lavoro ora possono risparmiare ore di confusione in futuro.
    * Correzione di bug: Il problema era che le richieste che sono state reindirizzate a un telecomandoERDDAPfallito con un carattere non valido '|messaggio di errore. Questo si è verificato solo con le versioni recenti di Tomcat. Grazie a Rusty Holleman, Conor Delaney e Roy Mendelssohn.
    * Correzione di bug:ERDDAP™ora utilizza una versione aggiornata di netcdf-java (è una lunga storia) che include il supporto aggiornato per NcML, che risolve il problema con NcML LogicalReduce non funziona come previsto. Ci possono essere alcuni piccoli cambiamenti ai metadati cheERDDAP™legge via netcdf-java da.nc♪.hdf, .grib e .bufr file. Grazie a Favio Medrano.
    * Il nuovo[EDDTableAggregateRows](/docs/server-admin/datasets#eddtableaggregaterows)consente di effettuare un insieme di dati EDDTable unito da due o più set di dati EDDTable che hanno le stesse variabili di dati utilizzando le stesse unità. Grazie a Kevin O'Brien.
    * Nuove opzioni per EDDTableFromDatabase ([fonteCanOrderBy](/docs/server-admin/datasets#sourcecanorderby)e[fonteCanDoDistinct](/docs/server-admin/datasets#sourcecandodistinct)) per specificare seERDDAP™, il database, o entrambi, gestire distinto eorderBy  (e tutte le varianti) vincoli. Grazie a David Karuga.
    * È ora possibile effettuare grafici e metadati di un dataset privato disponibili al pubblico tramite il nuovo [&lt;grafiAccessibleTo&gt;public&lt;/graphsAccessibleTo&gt;] (/docs/server-admin/datasets#graphsaccessibleto) tag. Grazie a Emanuele Lombardi.
    * Ora, se una stringa è passata a GenerateDatasets Xml o DasDds è circondato da doppie citazioni, è non quotato (come se fosse una stringa JSON) . Grazie a John Kerfoot e Melanie Abecassis.
    * Genera i dati Xml ora supporta "default" per ottenere il default e "niente" per ottenere una stringa vuota (lavorano con o senza preventivi) . Questo risolve alcuni problemi legati al passaggio di stringhe vuote.
    * Ora, in GenerateDatasets Xml, per tuttiEDDGridDaFiles ed EDDTable FromFiles datasets, se il campione FileName specificato è "" (la stringa vuota) , userà l'ultimo file corrispondenteName dalla directory + regex + recursive=true.
    * Aggiornato: Il codice displayInBrowser che viene utilizzato per visualizzare i risultati di GenerateDatasetsXml e DasDds sui computer Linux è stato out-of-date e ha dato un messaggio strano su Netscape. Ora, questo utilizza uno strumento Linux moderno: xdg-open. Grazie a Melanie Abecassis.
    * TheallDatasetsdataset ora ha un"files"colonna, che indica l'URL di base del link /files (se c'è uno) per il dataset.
    * Aumenta la sicurezza generale del tuoERDDAP™modificando le autorizzazioni associate alla directory tomcat e alla bigParentDirectory:
         (I comandi effettivi di seguito sono per Linux. Per altri OS, fare cambiamenti analoghi.) 
        * Modificare il "gruppo" per essere tomcat, il nome utente o il nome di un piccolo gruppo che include tomcat e tutti gli amministratori di Tomcat/ERDDAPPer esempio,
chgrp -R _yourUserName_ apache-tomcat-_8.0.23_
chgrp -R Nome utente bigParentDirectory_
        * Cambiare le autorizzazioni in modo che tomcat e il gruppo hanno letto, scrivere, eseguire privilegi, ad esempio,.
chmod -R ug+rwx apache-tomcat-_8.0.23_
chmod -R ug+rwx _bigParentDirectory_
        * Rimuovere i permessi dell'utente "altro" per leggere, scrivere o eseguire:
chmod -R o-rwx apache-tomcat-_8.0.23_
chmod -R o-rwx _bigParentDirectory_
Questo è importante, perché impedisce ad altri utenti di leggere informazioni eventualmente sensibili inERDDAP™file di configurazione, file di registro e file con informazioni sui set di dati privati.
    * Il sistema di autenticazione/login è stato rinnovato. Grazie a Thomas Gardner, Emanuele Lombardi e al nuovo governo degli Stati Uniti[HTTPS-Only Standard](https://home.dotgov.gov/management/preloading/dotgovhttps/).
        * L'opzione di autenticazione=openid è stata rimossa. Era fuori moda.
        * Il nuovo, consigliato,[autenticazione=google](/docs/server-admin/additional-information#google)opzione utilizza Google Sign-In (basato su OAuth 2.0) per consentire a chiunque abbia un account e-mail Google (incluso account gestiti da Google@noaa.gov) per accedere.
        * Il nuovo,[autenticazione=email](/docs/server-admin/additional-information#email)opzione è un backup per l'autenticazione=google. Consente agli utenti con un&lt;tag utente&gt;datasets.xmlper accedere inviando loro una email con un link speciale.
        * Nel vostro setup.xml, si prega di modificare la descrizione per&lt;autenticazione &gt; essere
```
            <!-- If you want to restrict access to some datasets, 
            you need to specify the method used for logging on (authentication).
            See the info at 
            https://erddap.github.io/setup.html#security
            Currently, the options are: "" (logins not supported, the default), 
            "custom", "email", and "google" (recommended).  
            \\[No longer supported: "basic", "openid"\\]
            -->
```

        * Nel vostro setup.xml, si prega di aggiungere questo proprio sotto il&lt;autenticazione taggati
```
            <!-- If authentication=google, you must supply your Google Client ID. 
            See
            https://developers.google.com/identity/sign-in/web/devconsole-project
            When setting this up, for Authorized JavaScript origins, 
            for testing on your computer, use the domain "localhost" 
            (e.g., origin=https://localhost:8443), 
            not "127.0.0.1" (because Google Sign-In doesn't work with anything 
            at that domain).
            This will be a string of about 75 characters, probably starting with
            several digits and ending with .apps.googleusercontent.com .
            -->
            <googleClientID></googleClientID>
```

        * Ora, gli utenti che non sono registrati possono usarehttpohttpsURLs (se hai impostato&lt;baseHttpsUrl&gt; nel vostro setup.xml). Grazie al nuovo governo americano[HTTPS-Only Standard](https://https.cio.gov/).
        * Ora, è possibile incoraggiare tutti gli utenti a utilizzarehttps  (nonhttp) impostando&lt;baseUrl&gt; per esserehttpsURL. Per costringere gli utenti a utilizzare solohttps, è anche necessario apportare modifiche alla configurazione Apache/Tomcat per bloccare nonhttpsaccesso. Grazie al nuovo governo americano[HTTPS-Only Standard](https://https.cio.gov/).
            
Nel vostro setup.xml, si prega di modificare la descrizione per&lt;baseUrl&gt; per essere
```
            <!-- baseUrl is the start of the public URL, to which "/erddap" 
            is appended. For example:
            For running/testing on your personal computer:
              <baseUrl>http://localhost:8080</baseUrl>     
              (127.0.0.1 doesn't work with authentication=google).
            If you want to encourage all users to use https (not http), 
              make the baseUrl the same as the baseHttpsUrl (see below).
            For ERD releases, we used to use
              <baseUrl>http://coastwatch.pfeg.noaa.gov</baseUrl>    
            For ERD releases, we now use
              <baseUrl>https://coastwatch.pfeg.noaa.gov</baseUrl>    
            -->
```

        * Le opzioni&lt;passwordEncoding&gt; cambiato. Nel vostro setup.xml, si prega di modificare la descrizione per&lt;passwordEncoding&gt; per essere
```
            <!-- For "custom" authentication, this specifies how you have 
            stored passwords in the roles tags in datasets.xml.
            If you aren't storing any passwords, this is irrelevant.
            The options (in order of increasing security) are: 
            "MD5", "UEPMD5" (MD5(UserName:ERDDAP:Password)), 
            "SHA256", "UEPSHA256" (SHA256(UserName:ERDDAP:Password), 
            the default).
            You should only use "MD5" or "SHA256" if you need to match 
            values stored that way in an external password database.
            See the info at 
            https://erddap.github.io/setup.html#security
            --> 
```

        * Nel vostro setup.xml, si prega di modificare la descrizione per&lt;baseHttpsUrl&gt; per essere
```
            <!-- This is a variant of <baseUrl> which is used when 
            authentication is active and the user is logged in.
            In general, you take the <baseUrl>, change "http" to "https", 
            and change/add ":8443". This must begin with "https://".
            If you make a proxy so that ":8443" isn't needed, 
            then don't use ":8443" here.
            This is relevant even if <authentication> is "".
            See the instructions at 
            https://erddap.github.io/setup.html#security
            For example:
            For running/testing on your personal computer:
              <baseHttpsUrl>https://localhost:8443</baseHttpsUrl>                  
            For releases at ERD, we use:
              <baseHttpsUrl>https://coastwatch.pfeg.noaa.gov</baseHttpsUrl>  
            If you want to encourage all users to use https (not http), 
              make the baseUrl (see above) the same as the baseHttpsUrl.
            --> 
```

        * Ora, se l'elencoPrivateDatasets=true in setup.xml, anche meno informazioni saranno mostrate sui set di dati a cui un utente non ha accesso.
    * Ora, soprattutto per quando si sta inizialmente impostando il vostroERDDAP# Ora puoi dirlo #ERDDAP™non cercare di abbonarsi a remotoERDDAP™Datasets. Grazie a Filipe Rocha Freire.
Nel tuo setup.xml, subito prima&lt;fontFamily&gt;, aggiungi
```
        <!-- Normally, if you have a EDDGridFromErddap or EDDTableFromErddap 
        dataset in your datasets.xml, it will try to subscribe to the remote 
        ERDDAP™ dataset so that the local dataset is kept perfectly up-to-date.
        If this ERDDAP™ is not publicly accessible (http://localhost), or its
        IP address will change soon, or you have some other reason, 
        you can tell this ERDDAP™ to not try to subscribe to the remote 
        ERDDAP™ datasets by setting this to false. (default=true) 
        This is the overall setting for this ERDDAP. It can be overridden by
        the same tag (with a different value) in the datasets.xml chunk for 
        a given EDD...FromErddap dataset. 
        For each fromErddap dataset that doesn't subscribe to the remote 
        ERDDAP™ dataset, you should set <reloadEveryNMinutes> to a smaller 
        number so that the local dataset stays reasonably up-to-date. -->
        <subscribeToRemoteErddapDataset>true</subscribeToRemoteErddapDataset>
```

    * Nel vostro setup.xml, nelle istruzioni sopra&lt;emailFromAddress&gt;, si prega di inserire:
Se possibile, impostare questo per utilizzare una connessione sicura (SSL / TLS) al server di posta elettronica.
Se la configurazione non utilizza una connessione sicura al server e-mail, effettuare le modifiche per farlo.
    * Nel tuodatasets.xml, si prega di aggiungere questa riga alla descrizione di&lt;abbonamentoEmailBlacklist&gt; nel tuodatasets.xml:
Puoi usare il nome "\\*" a blacklist un intero dominio, ad esempio,\\*@example.com .
    * Dal momento che la modifica al sistema di registrazione in v1.66, il file di registro non è mai aggiornato. Ci sono sempre messaggi o parti di messaggi in attesa di essere scritti nel file di registro. Ora puoi aggiornarlo. (per un istante) visualizzando ilERDDAP's stato pagina web a http://_your.domain.org_/erddap/status.html .
    * HashDigest...
    * Un piccolo cambiamento (a String2.canonical) che dovrebbe aiutare a mantenere le cose in movimento rapidamente quandoERDDAP™è molto occupato e anche meglio trattare con un gran numero di dataset.
    * Forte Consigliato: smettere di usare&lt;convert toPublicSourceUrl&gt; indatasets.xmlper convertire un numero IP in un set di dati&lt;sourceUrl&gt; (ad esempio, http://192.168.#.#/ ) in un nome di dominio (ad esempio,http: my.domain.org/) . D'ora in poi, nuovi abbonamenti a http://localhost ♪ http://127.0.0.1 e http://192.168.#.# Gli URLS non saranno ammessi per motivi di sicurezza. Quindi si prega di utilizzare sempre il nome di dominio pubblico nel&lt;sourceUrl&gt; tag (se necessario a causa dei problemi DNS) , puoi usare il[Tabella /etc/hosts sul server](https://linux.die.net/man/5/hosts)per risolvere il problema convertendo i nomi di dominio locali in numeri IP senza utilizzare un server DNS. È possibile verificare se un dato nome di dominio viene risolto correttamente utilizzando
ping _some.domain.name_
    * In generareDatasets.xml, per set di dati remoti (ad esempio, da un server THREDDS) , generato automaticamentedatasetIDs sono invariati per la maggior parte dei domini. Per alcuni domini, la prima parte (cioè, il nome) del generato automaticamentedatasetIDsarà un po' diverso. In particolare, i nomi che avevano una parte sono ora più probabili avere due parti. Ad esempio, datasets da http://oos.soest.hawaii.edu in precedenza portato adatasetIDche ha cominciato con hawaii\\_, ma ora portare adatasetIDs che iniziano con hawaii\\_soest\\_ . Se questo causa problemi per voi, si prega di e-mail me. Potrebbe esserci una soluzione.
    * Il driver Cassandra è stato aggiornato a cassandra-driver-core-3.0.0.jar e quindi per Cassandra v3. EDDTableFromCassandra non sfrutta alcuna nuova funzionalità in Cassandra V3. Gli indici in Cassandra possono ora essere più complessi, maERDDAP™utilizza ancora il modello indice Cassandra v2, che presuppone che una colonna indicizzata possa essere direttamente interrogata con'='vincoli. Genera i dati Xml per EDDTableFromCassandra non rileva più colonne con indici; se un indice è semplice, è necessario specificarlo indatasets.xmla mano. Se avete bisogno di supporto per indici più complessi o altre nuove funzionalità, si prega di e-mailerd.data at noaa.gov.
♪ Se usi ancora Cassandra 2.x, continua a usareERDDAP™v1.68 fino a quando si aggiorna per utilizzare Cassandra 3.x.
    * Jars e il Classpath -- Quasi tutti i file inclusi di terze parti .jar sono stati aggiornati alle loro ultime versioni.
        * slf4j.jar è stato aggiunto a /lib e il classpath.
        * Joid. Jar e tsik. vaso sono stati rimossi da /lib e il classpath.
        * Se ricevi messaggi di errore sulle classi non trovate quando compilate o eseguiteERDDAP™o uno dei suoi strumenti, confrontare il classpath della riga di comandoERDDAP'[attuale classpath](/docs/contributing/programmer-guide#development-environment)per capire quali .jars sono mancanti dal vostro percorso di classe.

## Versione 1.68{#version-168} 
 (rilasciato 2016-02-08) 

*    **Nuove funzionalità (per gli utenti) :** Nessuno.
     
*    **CoseERDDAP™Gli amministratori devono sapere e fare:** 
    *   [EDDGridFromFiles Aggregation tramite nomi file o metadati globali](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata)--
Tutte le variazioniEDDGridFromFiles può ora aggregare un gruppo di file aggiungendo una nuova dimensione più sinistra, di solito il tempo, basato su un valore derivato da ogni nome del file o dal valore di un attributo globale che è in ogni file.
    * MIGLIORATO: In precedenza abbiamo suggerito che si potrebbe desiderare di creare unEDDGridDaErddap dataset nel tuodatasets.xmlche fa riferimento alla jplMURSST dataset nel nostroERDDAP. Poiché c'è ora una nuova versione di quel dataset, che il dataset è ora deprecato. Quindi, se hai quel dataset nel tuoERDDAP™, si prega di aggiungere questo nuovo dataset
```
        <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">  
          <!-- Multi-scale Ultra-high Resolution (MUR) SST analysis fv04.1, Global, 0.011 Degree, Daily -->  
          <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>  
        </dataset>  
```
Se si desidera rimuovere il vecchio jplMURSST dataset dal tuoERDDAP™  (è la tua scelta) , cambiare la sua impostazione attiva da "vero" a "falso".
    * Correzione di bug: Si prega di controllare la bigParentDirectory che hai specificato nel setup.xml. Se non hai messo uno slash alla fine del&lt;BigParentDirectory&gt; nome, alloraERDDAP™avrà creato diverse directory applicando le parole direttamente al nome che hai specificato, invece di creare sottodirectory. A partire dalla versione 1.68,ERDDAP™aggiunge uno slash alla fine del nome della directory se non ne specifica uno. Quindi, se in precedenza non ha specificato un slash alla fine, allora quando si installaERDDAP™v1.68 è necessario spostare e rinominare quelle directory **dopo** tu hai chiuso il vecchioERDDAP™e **prima** si avvia il nuovoERDDAP. Ad esempio, se hai erroneamente specificato bigParentDirectory come /home/erddapBPD (nessun slash trailing) eERDDAP™ha creato erroneamente directory come
/home/erddapBPDcache
/home/erddapBPDcopy
/home/erddapBPDdataset
/home/erddapBPDflag
/home/erddapBPDlogs
/home/erddapBPDlucene
e un file chiamato /home/erddapBPDsubscriptionsV1.txt,
allora è necessario muoversi e rinominarli per essere
/home/erddapBPD/cache
/home/erddapBPD/copia
/home/erddapBPD/dataset
/home/erddapBPD/flag
/home/erddapBPD/logs
/home/erddapBPD/lucene
e /home/erddapBPD/abbonamentoV1.txt
    * Correzione di bug: C'erano insetti inEDDGridLonPM180 inERDDAP™v1.66 che si è verificato quando il dataset del bambino è unEDDGridDa Erddap.
    * Correzione di bug: C'era un bugEDDGridDaFiles ed EDDTable Da Files inERDDAP™v1.66 che ha causato&lt;updateEveryNMillis&gt; da ignorare la prima volta che il dataset è stato caricato dopo un riavvio.
    * Correzione di bug / nuova caratteristica: Se un bambino imposta i dati all'internoEDDGridAggregateExistingDimension,EDDGridRicevuto.EDDGridDaEDDTable,EDDGridLonPM180,EDDGridSideBySide, EDDTableCopy, o EDDTableFromEDDGridè un...Dal set di dati di Erddap, che il set di dati dei genitori ora si iscrive al sottostanteERDDAP™Dataset. Se il sottostanteERDDAP™dataset è nello stessoERDDAP™, l'abbonamento e la sua convalida vengono effettuati direttamente; non riceverai un'email che ti chiede di convalidare l'abbonamento. Altrimenti, se il sistema di abbonamento per il tuoERDDAP™è spento, impostare il&lt;reloadEveryNMinutes&gt; impostazione per l'insieme dei dati genitori a un numero piccolo (60?) in modo che rimanga aggiornato.
    * Correzione di bug / nuova caratteristica: Se un bambino imposta i dati all'internoEDDGridAggregateExistingDimension,EDDGridRicevuto.EDDGridDaEDDTable,EDDGridLonPM180,EDDGridSideBySide, EDDTableCopy, o EDDTableFromEDDGridha attiva="false", che il dataset bambino è ora saltato.

## Versione 1.66{#version-166} 
 (rilasciato 2016-01-19) 

*    **Nuove funzionalità (per gli utenti) :** 
    * Grafici (non mappe) può ora avere valori discendenti sugli assi. Per ottenere questo quando si utilizza una pagina web Make A Graph, cambiare il nuovo asse Y: impostazione ascendente (il default) a scendere. Oppure, in un URL che richiede un grafico, utilizzare il nuovo opzionale 3rd '|' parametro per[&gt; Gamma e/o &. Interruttori yRange](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands), che non può essere nulla (il default) , vero, o t per ottenere valori ascendenti, o usare falsi o f per ottenere valori discendente. Il vero|i valori falsi sono insensibili. Grazie a Chris Fullilove, John Kerfoot, Luke Campbell e Cara Wilson.
    * Gli utenti possono ora specificare il colore di sfondo per i grafici aggiungendo un &.bgColor=0x_ AARRGGBB_ passare all'URL che richiede il grafico. Vedere .bgColor nella sezione Comandi grafici della[Grida](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands)e[tabledap](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#GraphicsCommands)documentazione. Grazie a John Kerfoot e Luke Campbell.
    * Per i set di dati tabulari, i vincoli possono ora fare riferimento a min (# SomeVariableName #) o max (# SomeVariableName #) . Vedi[min min () e max () ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#min). Grazie a John Kerfoot.
    * Per set di dati tabulari, vincoli di tempo che utilizzano[Ora](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now)può ora specificare unità temporali di millisecondi o millis.
    * Una richiesta di un'immagine di un set di dati tabulare ora fa una mappa (non un grafico) se le variabili x e y sono variabili longitudine-come e latitudine-come (unità compatibili) . Grazie a Rich Signell.
    * Correzione di bug: Etichette di asse del tempo e zecche a volte avevano irregolarità dispari durante la richiesta di più grafici contemporaneamente (ad esempio, su una pagina web) . Il problema era un bug nella libreria grafica SGT cheERDDAP™usi (una variabile era "statica" che non avrebbe dovuto essere) . Grazie a Bradford Butman.
         
*    **CoseERDDAP™Gli amministratori devono sapere e fare:** 
    * È un rischio di sicurezza per mettere la password di posta elettronica in un semplice file di testo come setup.xml. Per mitigare questo problema, si consiglia vivamente di:
        1. Impostare un account e-mail solo perERDDAP's use, ad esempio, erddap@yourInstitution.org . Questo ha anche altri vantaggi; in particolare più di unoERDDAP™l'amministratore può quindi essere dato l'accesso a tale account e-mail.
        2. Rendere le autorizzazioni del file setup.xml rw (lettura + scrittura) per l'utente che eseguirà Tomcat eERDDAP™  (user=tomcat?) e nessun permesso (non leggere o scrivere) per il gruppo e altri utenti. Grazie a Filipe Rocha Freire.
    * Il nuovo[ArchivioAzione](/docs/server-admin/additional-information#archiveadataset)strumento semplifica la realizzazione di.tar.gzarchivio con un sottoinsieme di un dataset in un formato adatto per l'archiviazione (in particolare,NOAANCEI) . Questo dovrebbe essere utile per moltiERDDAP™amministratori in molte situazioni, ma soprattutto per gruppi all'internoNOAA.
    * Il nuovo tipo di dataset[EDDGridDaNcFilesUnpacked](/docs/server-admin/datasets#eddgridfromncfilesunpacked)è una varianteEDDGridDa NcFiles. La differenza è che questa classe disacco ogni file di dati primaEDDGridFromFiles guarda i file:
        
        * Sblocca variabili imballate che utilizzanoscale\\_factore/oadd\\_offset.
        * Promuove variabili integer che hanno attributi \\_Unsigned=true ad un più grande tipo di dati interi in modo che i valori appaiono come i valori non assegnati. Per esempio, un \\_Unsigned=true byte (8 bit) variabile diventa breve firmata (16 bit) variabile.
        * Converte \\_FillValue emissing\\_valuevalori per essere di NaN (o MAX\\_VALUE per tipi di dati interi) .
        
Il grande vantaggio di questa classe è che fornisce un modo per affrontare diversi valori discale\\_factor♪add\\_offset, \\_FillValue, omissing\\_valuein diversi file in una collezione. Altrimenti, si dovrebbe utilizzare uno strumento come[NCML](/docs/server-admin/datasets#ncml-files)o[NCO](/docs/server-admin/datasets#netcdf-operators-nco)modificare ogni file per rimuovere le differenze in modo che i file possano essere gestiti daEDDGridDa NcFiles. Affinché questa classe funzioni correttamente, i file devono seguire gli standard CF per gli attributi correlati. Grazie a Philippe Makowski.
    * Il nuovo tipo di dataset[EDDGridLonPM180](/docs/server-admin/datasets#eddgridlonpm180)consente di modificare i set di dati che hanno alcuni valori di longitudine superiori a 180 (ad esempio, la gamma da 0 a 360) in dataset con valori di longitudine all'interno della gamma -180 a 180 (Longitude Plus o Minus 180, da cui il nome) . Il grande vantaggio di offrire set di dati con valori di longitudine nella gamma -180 a 180 è cheOGCservizi (ad esempio,WMS) richiedono valori di longitudine in questo range. Grazie a Lynne Tablewski, Fabien Guichard, Philippe Makowski e Martin Spel.
2016-01-26 Aggiornamento: Eeek&#33; Questo ha un bug che si verifica quando il dataset del bambino è unEDDGridFromErddap che fa riferimento ad un dataset nello stessoERDDAP. Questo bug è fissato inERDDAP™v1.68.
    * In[GenerareDatasetsXml](/docs/server-admin/datasets#generatedatasetsxml), un nuovo tipo di dataset speciale,EDDGridLonPM180Da ErddapCatalog, consente di generare ildatasets.xmlperEDDGridDataset LonPM180 da tuttiEDDGridset di dati in unERDDAPche hanno valori di longitudine superiori a 180.
    * Per tuttiEDDGriddatasets, indatasets.xmlè ora possibile utilizzare l'opzionale
[&lt;accessibile Via ViaWMS&gt; vero|falso&lt;/accessibile Via ViaWMS&gt; (/docs/server-admin/datasets#accessibleviawms)   (default=true) . Impostare questo per falsamente disabilita iWMSservizio per questo dataset. Se è vero, il dataset potrebbe ancora non essere accessibile tramiteWMSper altri motivi (ad es., senza lat o assi loni) . Questo è particolarmente utile per i dataset che esistono da soli e avvolti daEDDGridLonPM180, in modo che solo la versione LonPM180 sia accessibile tramiteWMS.
    * In setup.xml, è possibile specificare un colore predefinito diverso per lo sfondo dei grafici. Il colore è specificato come un valore esadecimale a 8 cifre nella forma 0x_AARRGGBB_, dove AA, RR, GG e BB sono i componenti opacità, rosso, verde e blu, rispettivamente, specificati come numeri esadecimali a 2 cifre. Si noti che la tela è sempre bianco opaco, quindi un (semi - No.) colore di sfondo grafico trasparente si fonde nella tela bianca. Il default è blu chiaro:
```
        <graphBackgroundColor>0xffccccff</graphBackgroundColor>  
```
Grazie a John Kerfoot e Luke Campbell.
    * In setup.xml, è ora possibile specificare la dimensione massima per[file di log](/docs/server-admin/additional-information#log)  (quando viene rinominato a log. Txt. precedente e un nuovo tronco. txt è creato) In MegaBytes. Il minimo consentito è 1. Il massimo consentito è il 2000. Il valore predefinito è 20 (MB) . Per esempio:
```
        <logMaxSizeMB>20</logMaxSizeMB>
```
    * Indatasets.xml♪&lt;fgdcFile&gt;] (/docs/server-admin/datasets#fgdcfile) o&lt;iso19115File&gt;] (/docs/server-admin/datasets#iso19115file) può ora essere un file locale (come prima) o un URL (che verrà scaricato in modo che ci sia una copia locale) . SeERDDAP™non è in grado di scaricare il file, il caricamento del dataset continuerà ma il dataset non avrà un file fgdc o iso19115.
    *   EDDGridDaFiles ed EDDTable FromFiles datasets può ora fare una rapidaRiavviare (il sistema cheERDDAP™tenta di utilizzare quando i dataset vengono caricati per la prima volta quandoERDDAP™è riavviata) . Questo accelera il riavvioERDDAP.
2016-01-26 Aggiornamento: Eeek&#33; Questo ha un bug che causa&lt;updateEveryNMillis&gt; da ignorare la prima volta che il dataset viene caricato dopo un riavvio. Questo bug è fissato inERDDAP™v1.68.
    * Un miglioramento generale al sistema QuickRestart consenteERDDAP™per caricare i dataset più velocemente quandoERDDAP™è riavviata.
    * TuttiEDDGridDaFiles ed EDDTable Le sottoclassi FromFiles ora accettano una nuova&lt;pathRegex&gt; tag, di solito specificato proprio qui sotto&lt;recursive&gt;. Se ricorsivo è "vero", solo percorsi subdirectory completi che corrispondono al percorsoRegex (default=.\\*) sarà accettato. Analogamente, un&lt;sourceUrl&gt; tag in unEDDGridAggregateExistingDimension può ora includere un pathRegex attributo (default=.\\*) .
    * Il default per&lt;parzialeRequestMaxBytes&gt; in setup.xml è ora 490000000 (~ 490 MB) . Questo evita alcuni problemi/oraggi relativi all'acquisizione di dati da server di dati THREDDS. Grazie a Leslie Thorne.
    * Un piccolo cambiamento del sistema di log dovrebbe consentireERDDAP™essere più reattivo quando è molto, molto occupato. Le informazioni sono ora scritte al file di registro sull'unità disco in pezzi abbastanza grandi. Il vantaggio è che questo è molto efficiente --ERDDAP™non blocco mai in attesa di informazioni da scrivere al file di registro. Lo svantaggio è che il registro finirà quasi sempre con un messaggio parziale, che non sarà completato fino a quando il prossimo pezzo sarà scritto.
    * Correzione di bug relativa a inotify e il [&lt;AggiornamentoOgniNMillis&gt; (/docs/server-admin/datasets#updateeverynmillis) sistema perEDDGridDaFiles ed EDDTable FromFiles datasets: Non è più necessario specificare una grande di fs.inotify.max\\_user\\_watches o fs.inotify.max\\_user\\_instances. C'è un bug inJavache causa alcune parti diJava's inotify/WatchDirectory sistema di non essere spazzatura raccolta quando sono finalizzati; alla fine, il numero di zombie inotify orologi o istanze supererebbe il numero massimo specificato.ERDDAP™ora funziona intorno a questoJavabug.
Inoltre, il numero di thread inotify è elencato sulla pagina web status.html, in modo da poter tenere d'occhio il suo utilizzo. Tipicamente, c'è 1 filo inotify perEDDGridDaFiles ed EDDTable Dal set di dati di Files.
    * Bug fix: in molti luoghi, invece di un errore in fase di riavvio, è stato generato un nuovo errore che includeva solo una breve versione del messaggio di errore originale e senza la traccia dello stack. Ora, quando viene generato un nuovo errore, include correttamente l'intera eccezione originale, ad esempio, lanciare nuova Eccezione ("qualche nuovo messaggio", e) ;
Grazie a Susan Perkins.
    * Correzione bug: fino a poco tempo fa (v1.64?) Se un .../datasetIDL'URL è stato richiesto,ERDDAP™aggiungerebbe .html all'URL. In v1.64, questo fallimento (un URL formattato erroneamente è stato generato e quindi fallito) . Ora funziona di nuovo. Grazie a Chris Fullilove.

## Versione 1.64{#version-164} 
 (pubblicato 2015-08-19) 

*    **Nuove funzionalità (per gli utenti) :** 
    * C'è ora una guida per accedere al privato protetto dalla passwordERDDAP™set di dati (https://) viacurlePython. Vedere la[curl](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#curl)e[Python](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#Python)istruzioni.
Grazie a Emilio Mayorga di NANOOS e Paul Janecek di Spyglass Technologies.
         
*    **CoseERDDAP™Gli amministratori devono sapere e fare:** 
    *   ERDDAP™ora richiedeJava1.8+.
        Java1.7 raggiunto il[fine della vita](https://www.oracle.com/technetwork/java/eol-135779.html)  (non più aggiornamenti di sicurezza) ad aprile 2015. Questa versioneERDDAP™non funzionerà con le versioni diJavasotto 1,8. Se si aggiorna daJava1.7. (o prima) , si dovrebbe anche aggiornare Tomcat. Vedi il[ERDDAP™Impostare le istruzioni](/docs/server-admin/deploy-install)per scaricare link e consigli.
    * Nuovo modulo Data Provider.
Quando un fornitore di dati viene a voi sperando di aggiungere alcuni dati al vostroERDDAP™, può essere difficile e richiede tempo per raccogliere tutti i metadati necessari per aggiungere il dataset inERDDAP. Molte fonti di dati (per esempio, file .csv, File Excel, database) non hanno metadati interni, quindiERDDAP™ha un nuovo modulo Data Provider che raccoglie i metadati dal fornitore di dati e fornisce al fornitore di dati alcune altre indicazioni, tra cui una vasta guida per i database. Le informazioni inviate sono convertite indatasets.xmlformato e quindi inviato alERDDAP™amministratore (Tu sei) e scritto (allegato) a bigParentDirectory/logs/dataProviderForm.log . Così, la forma semi-automatizza il processo di ottenere un set di dati inERDDAP™, ma ilERDDAP™l'amministratore deve ancora completaredatasets.xmlchunk e trattare con ottenere il file di dati (#) dal fornitore o la connessione al database. Per ulteriori informazioni, vedere il[Fornitore di dati Descrizione del modulo](/docs/server-admin/datasets#data-provider-form).
    * Nuovo&lt;matchAxisNDigits&gt;
può essere utilizzato daEDDGridDa Fili (e quindi daNcFiles e daMergeIRFiles) ♪EDDGridAggregateExistingDimension,EDDGridRicevuto, eEDDGridImpostazioni dati SideBySide per specificare come esattamente uguale i valori dell'asse in diversi file deve essere (quante cifre) 0=no check (Non usarlo&#33;) , 1-18 per aumentare la precisione, o 20 (il default) per l'esatta uguaglianza. Per n=1-18,ERDDAP™assicura che le prime n cifre dei doppi valori (o (#) div 2 per valori galleggianti) sono uguali.
        &lt;matchAxisNDigits&gt; sostituisce&lt;garantireAxisValuesAreEqual&gt;, che è ora deprecato. Un valore di 'vero' verrà convertito in corrispondenzaAxisNDigits=20. Valore della 'falsa' (Non farlo&#33;) sarà convertito in corrispondenza AxisNDigits=0.
    *   EDDGridDaFiles ed EDDTable FromFiles si carica molto lentamente la prima volta che si utilizza questa versione diERDDAP.
        ERDDAP™ora memorizza le informazioni dei file interni un po 'diverso, quindi la tabella dei file interni per ciascuno di questi set di dati deve essere ricostruita. Quindi non preoccuparti. Niente è sbagliato. E' una cosa di una volta.
    * File a distanza
        EDDGridDa NcFiles, EDDTableFromNcFiles, EDDTableFromNcCFFiles ora permettono ai file di essere file remoti in una directory accessibile dahttp://  (e probabilmentehttps://e ftp://, ma non sono testati) se il server remoto supporta[Richieste di Gamma](https://en.wikipedia.org/wiki/Byte_serving)nell'intestazione della richiesta. THREDDS e Amazon S3 supportano Range Requests,HyraxNo. Questo sistema consente di accedere ai dati in file remoti senza scaricare i file (che è utile se i file remoti sono troppo voluminosi) , ma l'accesso a questi file sarà molto più lento dell'accesso ai file locali o anche a un telecomandoOPeNDAPfonte.
Questo include"files"in un secchio Amazon S3 poiché sono accessibili tramitehttp://. Se i nomi degli oggetti S3 sono come i nomi dei file (con interno / è come un albero directory Linux) ♪ERDDAP™può anche rendere i file accessibili tramiteERDDAP'"files"sistema. Per questo per funzionare, le credenziali S3 devono essere in ~/.aws/credentials (su Linux, OS X, o Unix) , o C:\\Users\\USERNAME\\\\\.aws\\credentials (su Windows) sul server conERDDAP. Vedere la[Documentazione SDK Amazon](https://docs.aws.amazon.com/sdk-for-java/?id=docs_gateway#aws-sdk-for-java,-version-1).
    * Genera i dati Xml ha una nuova, insolita opzione: EDDsFromFiles.
Questo passerà attraverso un file system (anche un sistema remoto come un Amazon S3 se gli oggetti hanno nomi simili a file) e creare ildatasets.xmlpezzi per una serie di dataset. Il suo chilometraggio può variare. Questo funziona bene se i file sono organizzati in modo che tutti i file di dati in una determinata directory (e le sue sottodirectory) sono adatti per un set di dati (ad esempio, tutti i compositi SST 1 giorno) . Altrimenti (ad esempio, se una directory contiene alcuni file SST e alcuni file Chlorophyll-a) , questo funziona male, ma può ancora essere utile.
    * Programmatori: nuovi file /lib .jar.
Se compilateERDDAP™, si prega di notare i nuovi file .jar nel parametro classpath -cp elencati nelERDDAP™ [Guida del programmatore](/docs/contributing/programmer-guide).
    * mare\\_acqua\\_pratico\\_salinity
Se si utilizza il nome standard CF mare\\_acqua\\_salinity per qualsiasi variabile, vi incoraggio a passare al mare\\_water\\_practical\\_salinity che è disponibile in[versione 29 del CF Standard Name Table](https://cfconventions.org/Data/cf-standard-names/29/build/cf-standard-name-table.html)  (e alcune versioni precedenti -- Non sapevo che) . Questo nome indica che questo è davvero un valore di Salinity Pratico utilizzandoPractical Salinity Units  (PSU) , al contrario di un valore g/kg più vecchio. Le unità canoniche sono diverse, ma ancora incredibilmente scostanti: 1 (presumibilmente implicandoPSU/PSS-78) , al contrario di 1e-3 (presumibilmente implicando g/kg) per mare\\_acqua\\_salinity.\\[Ehi.Unidatae CF: Identifichiamo i valori che utilizzano altre scale, ad esempio Fahrenheit o Celsius, tramite una stringa di unità che è il nome della scala o qualche variazione. Perché non possiamo identificare le unità di salinità tramite la loro scala, ad esempio, PSS-78? So: i valori PSS-78 sono "unitless", ma c'è una scala implicita, non è vero? Se invento una nuova scala di salinità pratica dove i valori sono 0,75 volte i valori PSS-78, le unità canoniche dovrebbero ancora essere "1"? Come potrebbe un utente dirglielo? Le unità di 1e-3 e 1 non sono né descrittive né utili per gli utenti che stanno cercando di capire cosa indicano i numeri.\\]

## Versione 1.62{#version-162} 
 (pubblicato 2015-06-08) 

*    **Nuove funzionalità (per gli utenti) :** 
    * PerEDDGriddatasets, gli utenti possono ora fare tipo grafico: grafici di superficie con qualsiasi combinazione di assi numerici, non solo longitudine rispetto alla latitudine. Questo ti permette di fare x versus y (progetto) grafici e vari[Diagrammi Hovmöller](https://en.wikipedia.org/wiki/Hovm%C3%B6ller_diagram), per esempio, tracciare la longitudine contro la profondità, o il tempo contro la profondità.\\[Nota: se la profondità è sull'asse Y, probabilmente sarà capovolto da ciò che si desidera. Mi dispiace, non farlo e' ancora un'opzione.\\]Grazie a Cara Wilson e Lynn DeWitt.
    * C'è un nuovo[Convertitore di acronimo oceanico/atmosfera](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericAcronyms.html)che consente di convertire un comune acronimo oceanico/atmosferico a/da un nome completo.
    * C'è un nuovo[Oceanic/Atmosferica Convertitore di nomi variabili](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericVariableNames.html)che consente di convertire un nome variabile oceanico/atmosferico comune da/per un nome completo.
*    **CoseERDDAP™Gli amministratori devono sapere e fare:** 
    *   Java7/8
        Oraclenon supporta più (fornisce correzioni di bug di sicurezza per)  Java7.ERDDAP™ancora supportiJava7, ma per favore spostateviJava8. Il prossimo rilascio diERDDAP™probabilmente richiederàJava8.
    *   valid\\_min/max/linea
Nelle puntate precedenti...dataVariableavevascale\\_factoreadd\\_offsetmetadati,ERDDAP™disfare i valori dei dati e rimuovere i metadati. Negli episodi precedenti...ERDDAP™non ha modificato/non imballatovalid\\_range♪valid\\_min♪valid\\_maxmetadati (che di solito / dovrebbero contenere valori imballati) discale\\_factoreadd\\_offset. Ora si'. Per favore cerca il tuoERDDAP™per "valid\\_" e assicurarsi che tutte le variabili che hannovalid\\_range♪valid\\_minovalid\\_maxavere i valori corretti quando i set di dati appaiono nella nuova versione diERDDAP. Vedi[valid\\_rangedocumentazione /min/max](/docs/server-admin/datasets#valid_range).
    * ACDD-1.3
Negli episodi precedenti...ERDDAP™  (in particolare GenerateDatasets Xml) usato / consigliato l'originale (1.0) versione della[NetCDFConvegno Attributo per Dataset Discovery](https://wiki.esipfed.org/ArchivalCopyOfVersion1)che è stato indicato come "UnidataDataset Discovery v1.0" nelle Convenzioni globali eMetadata\\_Conventionsattributi. Ora, si consiglia[Versione ACDD 1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)che è stato ratificato all'inizio del 2015 e si chiama "ACDD-1.3". Fortunatamente, ACDD-1.3 è altamente compatibile con la versione 1.0. Vi raccomandiamo di[passare a ACDD-1.3](/docs/server-admin/datasets#switch-to-acdd-13). Non e' difficile.
    * Generare i dati Attributi Xml
Ci sono stati un gran numero di cambiamenti per migliorare&lt;addAttributes&gt; valori suggeriti da GenerateDatasets Xml per le Convenzioni globali,creator\\_name/email/url, parole chiave, attributi sommari e titoli e per la variabilelong\\_nameattributo. Alcuni cambiamenti sono legati al nuovo uso di ACDD-1.3.
    * EDDTEDDSOSset di dati
Con l'aggiunta occasionale di nuovi tipi diSOSserver e modifiche ai vecchi server, è sempre più difficile perERDDAP™per rilevare automaticamente il tipo di server dalle risposte del server. L'uso di [&lt;sosServerType&gt;] (/docs/server-admin/datasets#eddtable fromsos-skeleton-xml)   (con un valore di IOOS\\_NDBC, IOOS\\_NOS,OOSTethyso QUII) è ora RACCOMANDATO. Se uno qualsiasi dei tuoi set di dati di questo tipo ha problemi nella nuova versione diERDDAP, prova a riattivare GenerateDatasets Xml per ilSOSserver per generare un nuovo pezzo didatasets.xmlper quel dataset. Genera i dati Xml vi permetterà di provare i diversi&lt;sosServerType&gt; opzioni fino a trovare quello giusto per un determinato server. Se hai ancora problemi, per favore fammi sapere il problema che vedi e l'URL del server e cercherò di aiutare.
    * EDDTableFromFileNames datasets
Alcuni attributi che sono stati raccomandatiaddAttributessono ora fonteAttributi. Probabilmente non è necessario cambiare nulla per i dataset esistenti nel vostrodatasets.xml.
    * Correzione bug relativa a determinate richieste a EDDTableFromNcCFFiles datasets.
Ho anche aggiunto un gran numero di test unitari al numero di test unitari esistenti dei metodi sottostanti. (ci sono 100 di scenari) . Grazie a Eli Hunter.
    * Correzione di bug/piccoli cambiamenti aEDDGridDa MergeIR.
Grazie a Jonathan Lafite e Philippe Makowski
    * Correzione di bug:EDDGridFromErddap ora funziona anche se un set di dati remoto non haioos\\_categoryattributi variabili.
Grazie a Kevin O'Brien.
    * Bug fix nella pagina web .graph perEDDGridset di dati quando c'è una variabile di asse con più di un valore.
Grazie a Charles Carleton.
    * Ci sono stati altri piccoli miglioramenti, modifiche e correzioni di bug.

## Versione 1.60{#version-160} 
 (rilasciato il 2015-03-12) 

*    **Nuove funzionalità (per gli utenti) :** nessuno
*    **CoseERDDAP™Gli amministratori devono sapere e fare:** 
    * STRONGLY RECOMANDED: Aggiornare il server[robot.txt](/docs/server-admin/additional-information#robotstxt)file da includere:
Disallow: /erddap/files/
    * INotify Problema e Soluzione:
Su computer Linux, se si utilizza&lt;aggiornamentoOgni giorno con set di dati con tipo=EDDGridDa Files, EDDTableFromFiles,EDDGridCopia, EDDTableCopy, o le loro sottoclassi, si può vedere un problema in cui un dataset non riesce a caricare (occasionalmente o regolarmente) con il messaggio di errore: "IOException: Limite utente di inotify istanze raggiunte o troppi file aperti". Se è così, è possibile risolvere questo problema chiamando (come radice) :
echo fs.inotify.max\\_user\\_watches=65536|tee -a /etc/sysctl.conf
echo fs.inotify.max\\_user\\_instances=1024|tee -a /etc/sysctl.conf
- p
Oppure, utilizzare numeri più alti se il problema persiste. Il default per gli orologi è 8192. Il default per le istanze è 128.\\[C'è un bug inJavache causa inotify istanze di non essere spazzatura raccolta. Questo problema è evitato inERDDAP™v1.66 e più in alto. Quindi la soluzione migliore è passare alla versione più recente diERDDAP.\\]
    * NoSuchFileException Correzione di bug:
C'era un bug che potrebbe causare set di dati di tipo=EDDGridDa Files, EDDTableFromFiles,EDDGridCopia, EDDTableCopy, o le loro sottoclassi per non caricare occasionalmente con l'errore "NoSuchFileException: _someFileName_". Il bug è legato agli usi di FileVisitor ed è stato introdotto inERDDAP™V1.56. Il problema è raro ed è molto probabile che influenzi i dataset con un gran numero di file di dati che cambiano frequentemente.
    * Ci sono stati alcuni piccoli miglioramenti, modifiche e correzioni di bug.

## Versione 1.58{#version-158} 
 (rilasciato il 2015-02-25) 

*    **Nuove funzionalità (per gli utenti) :** 
    * Il nuovo["files"](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)sistema consente di navigare in un file system virtuale e scaricare file di dati sorgente da moltiERDDAP™Datasets. The"files"il sistema è attivo per impostazione predefinita, maERDDAP™gli amministratori possono disattivarlo mettendo
```
        <filesActive>false</filesActive>  
```
nelERDDAP™file setup.xml. Un ringraziamento speciale a Philippe Makowski, che perseverò quando ero lento ad apprezzare la bellezza di questa idea.
    * destinazione del tempo Max... In precedenza, la variabile temporale di EDDTable datasets con dati in tempo reale quasi aveva una destinazioneMax di NaN, che implicava che il valore massimo di tempo per il dataset è recente, ma non precisamente conosciuto e cambiando frequentemente. Ora, la destinazioneMax ha un valore reale, indicando l'ultima volta attualmente noto. Molti set di dati hanno dati continuamente aggiornati.ERDDAP™supporta l'accesso ai dati più recenti, anche se è dopo l'ultima volta attualmente noto. Nota che il nuovo [&lt;AggiornamentoOgniNMillis&gt; (/docs/server-admin/datasets#updateeverynmillis) supporto inEDDGridDaFiles ed EDDTable FromFiles datasets aggiorna la destinazione della variabile di tempoMax. Un'altra conseguenza di questo cambiamento è chedatasetID=allDatasetsdataset ora include l'ultima volta attualmente nota nelle colonne maxTime. Grazie a John Kerfoot.
*    **CoseERDDAP™Gli amministratori devono sapere e fare:** 
    * STRONGLY RECOMANDED: Aggiornare il server[robot.txt](/docs/server-admin/additional-information#robotstxt)file da includere:
Disallow: /files/
Disallow: /erddap/files/
    * Esempiodatasets.xml-- L'anno scorso, abbiamo consigliato diversi ottimi dataset nel coastwatchERDDAP™che potresti aggiungere al tuoERDDAP™solo aggiungendo alcune righe al tuodatasets.xml. Se hai aggiunto i dataset erdVH, si prega di passare ai nuovi dataset erdVH2:
        * Fare una copia di tutti i dataset erdVH e modificare la copiatadatasetIDE' da ErdVH... a ErdVH2... e cambiare il riferimentosourceUrlda ErdVH... a ErdVH2...
        * Impostare il erdVH... datasets a active="false".
    * TuttiEDDGridDaFiles ed EDDTable Dalle sottoclassi di Files ora supportano [&lt;accessibileViaFiles&gt;] (/docs/server-admin/datasets#accessibleviafiles) per rendere accessibili i file di dati di origine tramite"files"sistemi. Per impostazione predefinita, questo sistema è spento per ogni dataset. È necessario aggiungere il tag per abilitarlo. Grazie a Philippe Makowski.
    * TuttiEDDGridDaFiles ed EDDTable Dalle sottoclassi di Files ora supportano [&lt;AggiornamentoOgniNMillis&gt; (/docs/server-admin/datasets#updateeverynmillis) . Per impostazione predefinita, questo sistema è spento per ogni dataset. È necessario aggiungere il tag per abilitarlo. Grazie a Dominic Fuller-Rowell e NGDC.
    * Il nuovo[EDDTableFromFileNames](/docs/server-admin/datasets#eddtablefromfilenames)crea un set di dati da informazioni su un gruppo di file nel file system del server, ma non serve dati dall'interno dei file. Ad esempio, questo è utile per la distribuzione di raccolte di file di immagine, file audio, file video, file di elaborazione delle parole e file di foglio di calcolo. Questo funziona a mano con il nuovo["files"](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)sistema, in modo che gli utenti possano scaricare i file. Un ringraziamento speciale a Philippe Makowski, che perseverò quando ero lento ad apprezzare la bellezza di questa idea.
    * Il nuovo[EDDGridDaEDDTable](/docs/server-admin/datasets#eddgridfromeddtable)consente di convertire un set di dati tabulari in un set di dati grigliato. Grazie a Ocean Networks Canada.
    * Il nuovo[EDDGridDaMergeIRFiles](/docs/server-admin/datasets#eddgridfrommergeirfiles)aggrega i dati di un gruppo di MergeIR locale.gzfile.EDDGridFromMergeIRFiles ha la distinzione di essere il primo pezzo di codice contribuito aERDDAP. E' stato fatto interamente senza il nostro aiuto. Tre allegri e speciali grazie a Jonathan Lafite e Philippe Makowski di R.Tech Engineering.
    * C'è un nuovo tag setup.xml opzionale,&lt;unitTestDataDir&gt;, che specifica la directory con i file di dati di prova unità che sono disponibili tramite un nuovo repository GitHub:[ https://github.com/ERDDAP/erddapTest ](https://github.com/ERDDAP/erddapTest). Per esempio:
```
        <unitTestDataDir>/erddapTest/</unitTestDataDir>  
```
Questo non è ancora utile, ma fa parte del movimento verso fare il maggior numero di test unità gestibili da altre persone il più possibile. Grazie a Terry Rankine.
    * Ci sono stati molti piccoli miglioramenti, modifiche e correzioni di bug.

## Versione 1.56{#version-156} 
 (rilasciato 2014-12-16) 

*    **Nuove funzionalità (per gli utenti) :**   (Nessuno) 
*    **CoseERDDAP™Gli amministratori devono sapere e fare:** 
    * Probabilmente già sai[EDDGridDa Erddap](/docs/server-admin/datasets#eddfromerddap)e[EDDTableFromErddap](/docs/server-admin/datasets#eddfromerddap)che ti permettono di collegare a datasets in altriERDDAPe farli apparire nel tuoERDDAP. Le richieste dell'utente per i dati effettivi da questi set di dati vengono indirizzate invisibilmente alla fonteERDDAP™, in modo che i dati non fluiscono attraverso il sistema o utilizzare la larghezza di banda. C'è ora una grande lista di set di dati consigliati nel campionedatasets.xmlin erddapContent.zip. Per includerli nel tuoERDDAP™, tutto quello che devi fare è copiare e incollare quelli che vuoi nel tuodatasets.xml. Grazie a Conor Delaney.
    * Se compilateERDDAP™, è necessario aggiungere un po 'di nuovo . file di barattolo per il tuo[classpath -cp switch](/docs/contributing/programmer-guide#development-environment)per javac e java.
    * Il nuovo[EDDTable FromCassandra](/docs/server-admin/datasets#eddtablefromcassandra)gestisce ottenere dati da[Cassandra](https://cassandra.apache.org/). Grazie a Ocean Networks Canada.
    * Il nuovo[EDDTableFromColumnarAsciiFiles](/docs/server-admin/datasets#eddtablefromcolumnarasciifiles)gestisce l'acquisizione di dati da file di dati ASCII con colonne di larghezza fissa. Grazie a Philippe Makowski.
    * TuttiEDDGridDaFiles ed EDDTable Dalle sottoclassi di Files ora utilizzare un nuovo metodo, FileVisitor (aggiuntoJavain 1.7) per raccogliere informazioni sui file. Questo non può avere alcun beneficio per la prima raccolta di informazioni di file per un dato set di dati, ma sembra avere un enorme vantaggio per le riunioni successive se fatto presto, mentre il sistema operativo ha ancora le informazioni memorizzate. Grazie a NGDC.
        
Consigliamo ancora: Se un dataset ha un gran numero di file (ad esempio, &gt; 1.000) , il sistema operativo (e cosìEDDGridDaFiles e EDDTableFromFiles) opererà molto più efficiente se si memorizza i file in una serie di sottodirectory (uno all'anno, o uno al mese per dataset con file molto frequenti) , in modo che non ci sono mai un numero enorme di file in una determinata directory.
        
    * Diversi piccoli miglioramenti a EDDTableFromAsciiFiles.
    * Alcuni miglioramenti a EDDTableFromAsciiServiceNOS, in particolare per ottenere alcune colonne aggiuntive di informazioni dalla fonte. Grazie a Lynn DeWitt.
    * Alcune piccole correzioni di bug relative alla ISO 19115 cheERDDAP™genera. Grazie ad Anna Milan.

## Versione 1.54{#version-154} 
 (rilasciato 2014-10-24) 

*    **Nuove funzionalità (per gli utenti) :** 
    * Alcune variabili ora funzionano con il tempo alla precisione dei millisecondi, ad esempio, 2014-10-24T16:41:22.485Z. Grazie a Dominic Fuller-Rowell.
*    **Piccoli cambiamenti/Bug Fixs:** 
    * Correzione di bug: con una certa combinazione di circostanze,EDDGridI dataset NcFile hanno restituito i dati con una precisione ridotta (ad esempio, galleggianti invece di doppi) . Questo potrebbe influenzare solo i valori di dati con &gt; 8 cifre significative. Le mie scuse. (Ed era un classico bug di programmazione del computer: un personaggio sbagliato.) Grazie a Dominic Fuller-Rowell.
    * Molti piccoli cambiamenti.
*    **CoseERDDAP™Gli amministratori devono sapere e fare:** 
    * I dataset Griddap supportano ora variabili di asse timestamp e variabili di dati (cioè variabili con valori temporali, ma undestinationNamealtri"time") . Grazie a Dominic Fuller-Rowell.
    *   ERDDAP™ora correttamente supporta milliseconditime\\_precision"1970-01-01T00:00.000Z". Un quirk intenzionale: quando si scrive i tempi ai file orientati all'uomo (ad esempio, .csv,.tsv♪.json♪.xhtml) ♪ERDDAP™utilizza le specifichetime\\_precisionse include secondi e/o secondi decimali; altrimenti, utilizza seconditime\\_precision"1970-01-01T00:00:00:00Z" (per coerenza e compatibilità all'indietro) . Grazie a Dominic Fuller-Rowell.
    *   EDDGridDaNcFiles ora supporta la lettura StringdataVariableS.
    *   .nci file scritti da griddap possono ora avere StringdataVariableS.
    * Generare i dati Xml ora include più colore () chiama per evitare il problema delle informazioni che non vengono scritte ai file. Grazie a Thierry Valero.
    * La documentazione per GenerateDatasetsXml è stata migliorata, in particolare per sottolineare che l'interruttore -i funziona solo se si specifica tutte le risposte sulla riga di comando (ad esempio, modalità script) . E la modalità script è spiegato. Grazie a Thierry Valero.
    *   ERDDAP™non consente più due variabili in un dataset di avere lo stessosourceName. (Se qualcuno l'ha fatto prima, probabilmente ha portato a messaggi di errore.) Come prima,ERDDAP™non consente a due variabili in un dataset di avere lo stessodestinationName.

## Versione 1.52{#version-152} 
 (pubblicato 2014-10-03) 

*    **Nuove funzionalità:**   (nessuno) 
*    **Piccoli cambiamenti/Bug Fixs:** 
    * Altro (più piccolo) cambiamento per fareERDDAP™più veloce.
    * Miglioramento dei file ISO 19115 generati daERDDAP: aggiunto appena raccomandato&lt;gmd:protocol&gt; valori (informazioni, ricerca,OPeNDAP:OPeNDAP♪ERDDAP: griddap, eERDDAP:tabledap) all'interno&lt;gmd:CI\\_OnlineResource&gt;. Grazie a Derrick Snowden e John Maurer.
    * Molti piccoli cambiamenti.
*    **CoseERDDAP™Gli amministratori devono sapere e fare:** 
    * Bug fix: GenerateDatasetsXml.sh e DasDds.sh non erano in erddap.war per 1.48 e 1.50. Ora lo sono. Grazie a Thierry Valero.
    * Piccoli cambiamenti ad alcuni test di velocità in TestAll per renderli meno sensibili al caso. Grazie a Terry Rankine.

## Versione 1.50{#version-150} 
 (rilasciato il 2014-09-06) 

*    **Nuove funzionalità:**   (nessuno) 
*    **Piccoli cambiamenti/Bug Fixs:** 
    * QuestoERDDAP™dovrebbe essere molto più veloce delle versioni recenti.
*    **CoseERDDAP™Gli amministratori devono sapere e fare:**   (niente) 

## Versione 1.48{#version-148} 
 (rilasciato il 2014-09-04) 

*    **Nuove funzionalità:** 
    *   ERDDAP™ora crea sempre un set di dati tabulari,datasetID=allDatasets, che ha una tabella di informazioni su tutti i datasets in questoERDDAP. Può essere interrogato come qualsiasi altro set di dati tabulari. Questa è un'alternativa utile al sistema corrente per ottenere informazioni sui set di dati programmaticamente.
    * Ci sono due nuovi tipi di file di output per EDDTable eEDDGrid, .csv0 e.tsv0. Sono file a valore di virgola e separato dalla scheda che non hanno righe con nomi o unità di colonna. I dati iniziano sulla prima riga. Sono particolarmente utili per gli script che vogliono solo un pezzo di informazioni daERDDAP.
*    **Piccoli cambiamenti/Bug Fixs:** 
    * Le mappe possono ora essere fatte a longitudini nella gamma -720 a 720.
    * Il nuovo.ncrisposta ml Il tipo di file è disponibile per tuttiEDDGridDatasets. Ritorna la[NCML](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/ncml_overview.html)\\-formatted descrizione del dataset (simile a un combinato .dds + .das) .
    * Correzione bug: Salvataggio dei dati tabulari a un.ncil file era limitato a 100.000 valori per variabile. Ora è solo limitato a 2 GB dimensione totale del file. Grazie a Kevin O'Brien.
    * Correzione bug: il saveAsMatlabmetodi ora assicurarsi chedatasetIDs sono convertiti in sicuroMatlabnomi variabili. Ma consiglio vivamente di crearedatasetIDs che sono nomi variabili validi: a partire da una lettera e poi solo utilizzando A-Z, a-z, 0-9, e \\_. Vedi[datasetID](/docs/server-admin/datasets#datasetid). Grazie a Luke Campbell.
    * Bug fix in EDDTableFromDatabase: Con alcuni tipi di database, un NO\\_ La risposta dei dati dal database ha portato ad un ritardo di 30 secondi inutile nelERDDAP. Grazie a Greg Williams.
    * Correzione di bug:EDDGridFare un grafico con tipo grafico = linee (o marcatori o marcatori e linee) forzato x asse variabile per essere tempo. Ora può essere qualsiasi asse. Grazie a Lynn DeWitt.
*    **CoseERDDAP™Gli amministratori devono sapere e fare:** 
    * STRONGLY RECOMANDED: AggiornamentoJava  
Questa versioneERDDAP™richiedeJava7 o superiore, maJava7 raggiungerà la sua fine della vita nell'aprile 2015 (Presto&#33;) , quindi ora è un buon momento per passare aJava8. CosìJava8 è RACCOMANDATO. Io test conJava8. Nota cheJava6 ha raggiunto la sua fine della vita nel febbraio 2013 (Basta correzioni di bug di sicurezza&#33;) .
    * STRONGLY RECOMMENDED: Aggiornamento Tomcat
Se si utilizza Tomcat, si prega di passare all'ultima versione di Tomcat. Tomcat 8 è progettato per lavorare conJava8.
    * "ERDDAP" non è più un acronimo. Ora è solo un nome. Non voglio che il nome metta in evidenzaERD. VoglioERDDAP™per evidenziare la tua istituzione e i tuoi dati.
    * Per favore.[personalizzare l'aspetto del tuoERDDAP™installazione per evidenziare la tua istituzione e i tuoi dati](/docs/server-admin/deploy-install#customize). Con un'ora di lavoro, si possono fare buoni miglioramenti che dureranno per sempre.
    * In setup.xml, il&lt;l'opzione displayDiagnosticInfo&gt; è ora sempre ignorata e trattata come se il valore fosse falso.
RACCOMANDATO: Rimuovere il&lt;displayDiagnosticInfo&gt; tag e informazioni relative dal vostro setup.xml.
    * In setup.xml, il default per&lt;drawLandMask&gt; era "over", ma ora è "under", che è un default generale migliore (funziona bene con tutti i dataset) .
    * Gli script GenerateDatasetsXml.sh e DadDds.sh Linux ora usano bash invece di csh, e hanno l'estensione .sh. Grazie a Emilio Mayorga
    * Genera i dati Xml e DasDds ora creano i propri file di log (GenerateDatasetsXml.log e DasDds.log) e file di output (GenerareDatasetsXml.out e DadDds.out) in _bigParentDirectory_/logs/, e non mettere mai i loro risultati sulla clipboard.
    * Genera i dati Xml ora supporta un parametro riga di comando -i che inserisce l'output nel file specificato in un luogo specificato. Vedi il[documentazione](/docs/server-admin/datasets#generatedatasetsxml). Grazie a Terry Rankine.
    * EDDTableFromDatabase ora supporta&lt;colonnaNameQuotes&gt;&lt;/columnNameQuotes&gt;, con valori validi " (il default) O niente. Questo personaggio (se c'è) verrà utilizzato prima e dopo i nomi delle colonne in query SQL. Diversi tipi di database, impostati in modi diversi, avranno bisogno di diversi marchi di quotazione di nome di colonna.
    * Le variabili di latitudine e longitudine tabulare ora possono avere personalizzatolong\\_name's, ad esempio, Profile Latitude. Nelle puntate precedenti, potrebbero essere Latitudine e Longitudine.
    * D'ora in poi, specificare "defaultDataQuery" e "defaultGraphQuery" come attributi nei metadati globali del dataset (cioè,&lt;addAtts&gt;), non come separato&lt;defaultDataQuery&gt; e&lt;defaultGraphQuery&gt; tags. (Anche se, se li specifichi ancora tramite i tag,ERDDAP™creerà automaticamente attributi globali con le informazioni.) 

## Versione 1.46{#version-146} 
 (rilasciato 2013-07-09) 

*    **Nuove funzionalità:** 
    *    (Nessuno) 
*    **Piccoli cambiamenti/Bug Fixs:** 
    * Bug fix: In EDDTableFromDatabase, nella versione 1.44 solo,ERDDAP™correttamente citato il nome della tabella del database nelle dichiarazioni SQL. Questo è ora risolto. Grazie a Kevin O'Brien.
*    **CoseERDDAP™Gli amministratori devono sapere e fare:** 
    *    ** Se non modifichi i messaggi standard in message.xml,
Cancella\\[tomcat\\]/content/erddap/messages.xml . **   
Il file predefinito Message.xml è ora nel erddap. file di guerra, non erddapContent.zip. Quindi, non è più necessario aggiornare manualmente i messaggi.xml .
    * Se si modificano i messaggi in message.xml, da ora in poi, ogni volta che si aggiornaERDDAP™O:
        * Fare gli stessi cambiamenti che hai fatto prima al nuovo
            \\[tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml.
E questa volta: eliminare\\[tomcat\\]/content/erddap/messages.xml .
        * Oppure, capire cosa è cambiato nei nuovi messaggi.xml (Via diff) e modifica il tuo
            \\[tomcat\\]Di conseguenza, /content/erddap/messages.xml file.

## Versione 1.44{#version-144} 
 (rilasciato 2013-05-30) 

*    **Nuove funzionalità:** 
    * Query to EDDTable datasets now support &orderByMin (...) eorderByMinMax (...)   (che restituisce due righe in ogni gruppo, con il minimo e il massimo dell'ultimoorderByvalore) . Grazie a Lynn DeWitt.
    * Ci sono due nuovitabledaptipi di file:.ncCFHeader e.ncCFMAHeader (che restituiscono l'intestazione simile a ncdump del corrispondente.ncCF e.nctipi di file CFMA) . Grazie a Steve Hankin.
*    **Piccoli cambiamenti/Bug Fixs:** 
    * Correzione bug: caricare le pagine web .graph e .html per i set di dati con un sacco di valori di tempo era lento perchéERDDAP™era lento quando si generano le opzioni di cursore del tempo. Ora è sempre veloce. Grazie a Michael Barry, OOICI e Kristian Sebastian Blalid.
    * Correzione di bug: In alcuni tipi di dataset EDDTable, i vincoli di tempo non sono sempre stati gestiti correttamente. Ora lo sono. Grazie a John Maurer e Kevin O'Brien.
    * Correzione bug: i dataset non si caricano quando tuttisubsetVariableserano variabili di valore fisso. Ora lo faranno. Grazie a Lynn DeWitt e John Peterson.
    * MIGLIORE: ora, tutte le query per le sole variabili sottoset agiscono come se &distinct () fa parte della query.
    * MIGLIORE: ora, per domande che includono &.jsonTraduzione: Name_ DEVE ora essere una serie di 1 o più (periodo separato) parole. Ogni parola deve iniziare con una lettera ISO 8859 o "\\_" ed essere seguita da 0 o più lettere ISO 8859, cifre, o "\\_". Sì, questo è più restrittivo cheJavaRequisiti dello script per i nomi delle funzioni.
    * L'asse temporale sui grafici ora funziona bene per intervalli di tempo più lunghi (80 - 10000 anni) e intervalli di tempo più brevi (0.003 - 180 secondi) .
    *   ERDDAP™è ora più indulgente quando le variazioni di parsing dei dati di tempo ISO-8601-format.
    * Ci sono stati molti altri piccoli cambiamenti e correzioni di bug.
*    **CoseERDDAP™Gli amministratori devono sapere e fare:** 
    *    **Devi aggiornare l'ultima versione per essere sicuro.**   
        ERDDAP™ha effettuato un controllo di sicurezza. C'erano degli insetti e delle debolezze. La versione 1.44 include diverse importanti correzioni di bug di sicurezza e diverse modifiche per aumentare la sicurezza e l'accessibilità (ad es., per gli utenti affetti da visione) . La versione 1.44 ha superato il controllo di sicurezza di follow-up. Grazie a tutte le brave persone di USGS e Acunetix che hanno reso possibile questo. (Non dovrei.NOAAStai facendo questo?) 
    * Il nuovo[EDDTEDDWFSFile](/docs/server-admin/datasets#eddtablefromwfsfiles)fa una copia locale di tutti i dati da unArcGISMappaServerWFSserver e così i dati possono quindi essere conservati rapidamente perERDDAP™utenti. Grazie a Christy Caudill.
    * Il nuovo[EDDTEDDEDDGrid](/docs/server-admin/datasets#eddtablefromeddgrid)consente di creare un dataset EDDTable da unEDDGridDataset. Alcuni motivi comuni per farlo sono:
        * Questo consente al dataset di essere queried conOPeNDAPvincoli di selezione (che un utente può aver richiesto) .
        * Il dataset è intrinsecamente un dataset tabulare. Grazie a OOICI, Jim Potemra, Roy Mendelssohn.
    * Il nome variabile "profondità" è ora un'alternativa speciale alla "altitudine". Le unità devono essere una variante di "metri". I valori dei dati devono essere positivi=down.ERDDAP™è ora pienamente consapevole del significato di "profondità" e lo sostiene ovunque l'altitudine sia sostenuta (ad esempio, come componente di un CF DSG cdm\\_data\\_type=profile dataset) . Un dataset non deve avere entrambe le variabili "profondità" e "altitudine".
    * Nel tuodatasets.xml, si prega di rimuovere qualsiasi uso di&lt;at name="cdm\\_altitude\\_proxy"&gt; approfondimento&lt;/att&gt; dal momento che la profondità è ora un'alternativa speciale all'altitudine e quindi non ha bisogno di essere specificamente identificato.
    * Nel tuodatasets.xml, si prega di rimuovere qualsiasi uso di&lt;altitudineMetersPerSourceUnit&gt;, ad eccezione di EDDTable DaSOS.
Quando il valore è 1, basta cancellarlo.
Quando il valore è -1, considerare di cambiare il nome variabile in profondità.
Per altri valori, aggiungere a&lt;addAttributes&gt;, ad esempio:
```
        <att name="scale\\_factor" type="float">-1</att>
```

    * Tutti i dataset ora supportano
        
        *   &lt;defaultDataQuery&gt; che viene utilizzato se .html è richiesto senza query.
            * Probabilmente sarà raramente necessario utilizzare questo.
            * Per i dataset di griddap, un uso comune di questo è quello di specificare una diversa profondità di default o valore di dimensione di altitudine (ad esempio,\\[0\\]invece di\\[Ultimo\\]) .
In ogni caso, si dovrebbe sempre elencare tutte le variabili, utilizzare sempre gli stessi valori di dimensione per tutte le variabili, e quasi sempre utilizzare\\[0\\]♪\\[Ultimo\\]o\\[0:Last\\]per i valori di dimensione.
Per esempio:
```
                <defaultDataQuery>u\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\],v\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]</defaultDataQuery>
```

            * Pertabledapdatasets, l'uso più comune di questo è quello di specificare un intervallo di tempo predefinito diverso (relativo ad ora, ad esempio, &time&gt;=now-1 giorno) .
Ricorda che la richiesta di non variabili di dati è la stessa di specificare tutte le variabili di dati, quindi di solito è possibile specificare il nuovo limite di tempo.
Per esempio:
```
                <defaultDataQuery>&amp;time&gt;=now-1day</defaultDataQuery>
```

        *   &lt;defaultGraphQuery&gt; che viene utilizzato se .graph è richiesto senza query.
            * Probabilmente sarà raramente necessario utilizzare questo.
            * Per i dataset di griddap, l'uso più comune di questo è quello di specificare una diversa profondità di default o valore di dimensione di altitudine (ad esempio,\\[0\\]invece di\\[Ultimo\\]) e/o specificare che una variabile specifica sia grafo.
In ogni caso, userai quasi sempre\\[0\\]♪\\[Ultimo\\]o\\[0:Last\\]per i valori di dimensione.
Per esempio:
```
                <defaultGraphQuery>temp\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]&amp;.draw=surface&amp;.vars=longitude|latitude|temp</defaultGraphQuery>
```

            * Pertabledapdatasets, gli usi più comuni di questo sono quello di specificare diverse variabili da grafico, un intervallo di tempo predefinito diverso (relativo ad ora, ad esempio, &time&gt;=now-1 giorno) e/o diverse impostazioni grafiche di default (ad esempio, marcatore tipo) .
Per esempio:
```
                <defaultGraphQuery>longitude,latitude,seaTemperature&amp;time&gt;=now-1day&amp;.marker=1|5</defaultGraphQuery>
```

Ricorda che è necessario codificare XML o per cento-encode (uno, ma non entrambi) le domande di default in quanto sono in un documento XML. Per esempio, & diventa &amp; ,&lt;diventa &amp;lt; , e &gt; diventa &amp;gt; .
E per favore controlla il tuo lavoro. È facile fare un errore e non ottenere ciò che si desidera.
Grazie a Charles Carleton, Kevin O'Brien, Luke Campbell e altri.
    *   EDDGridFromDap,EDDGridDa Erddap e EDDTableFromEDDGridhanno un nuovo sistema per affrontare i set di dati che cambiano frequentemente (come spesso circa ogni 0,5 s) . DiversamenteERDDAPsistema regolare e proattivo per ricaricare completamente ogni dataset, questo sistema aggiuntivo opzionale è reattivo (attivato da una richiesta utente) e incrementale (solo aggiornando le informazioni che devono essere aggiornate) . Per esempio, se una richiesta a unEDDGridFromDap dataset si verifica più del numero specificato di millisecondi dall'ultimo aggiornamento,ERDDAP™vedrà se ci sono nuovi valori per i più a sinistra (di solito"time") dimensione e, se è così, basta scaricare quei nuovi valori prima di gestire la richiesta dell'utente. Questo sistema è molto buono a mantenere un rapido cambiamento dei dati di configurazione up-to-date con richieste minime sulla fonte di dati, ma al costo di rallentare leggermente il trattamento di alcune richieste dell'utente. Vedi&lt;AggiornamentoOgniNMillis&gt; (/docs/server-admin/datasets#updateeverynmillis)   
Grazie a Michael Barry e OOICI.
    *   EDDGridDa NcFiles, EDDTableFromNcFiles e EDDTableFromNcCFFiles ora supportano[NCML.ncml](/docs/server-admin/datasets#ncml-files)file sorgente al posto di.ncfile. Grazie a Jose B Rodriguez Rueda.
    * PerEDDGridAggregateExistingDimension,ERDDAP™supporta una nuova opzione serverType="dodsindex" per l'attributo serverType&lt;sourceUrls&gt; tag. Questo funziona con pagine web che hanno elenchi di file all'interno&lt;PRESENTAZIONE&lt;/pre&gt; e spesso sotto unOPeNDAPlogo. Un esempio è[ https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html ](https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html).
    * Per EDDTableFromSOSora supporta un tag opzionale
```  
        <sosServerType>_serverType_</sosServerType>  
```
in modo da poter specificare il tipo diSOSserver (CosìERDDAP™non deve capire) . Valori validi&lt;IOOS\\_NDBC, IOOS\\_NOS,OOSTethyse QUII (un server appena supportato Tipo) . Vedi[EDDTEDDSOS](/docs/server-admin/datasets#eddtablefromsos). Grazie a Derrick Snowden e Janet Fredericks.
    * TuttiEDDGridDa...Files, EDDTableDa...Files,EDDGridCopia e leggibile Copia ora supporta un tag opzionale
```
        <fileTableInMemory>true</fileTableInMemory> (The default is false.)  
```
che può direERDDAP™per mantenere il file Tabella (con informazioni su ogni file di dati sorgente) in memoria invece di solo sul disco (il default) . Mantenere il fileTabella nella memoria velocizza le richieste di dati (soprattutto se ci sono file di dati di origine &gt; 1000) , ma usa più memoria. Se si imposta questo a true per qualsiasi dataset, tenere d'occhio la memoria: attualmente utilizzando la linea a _yourDomain_/erddap/status.htmlassicurare cheERDDAP™ha ancora un sacco di memoria gratuita. Grazie a Fredrik Stray.
    * EDDTableFromASCIIFiles ora supporta&lt;charset&gt;. I due charset più comuni (caso sensibile&#33;) sono ISO-8859-1 (il default) e UTF-8.
    * Consigliato: in setup.xml, all'interno&lt;startHeadHtml&gt;, si prega di cambiare&lt;html a
        &lt;html lang="en-US"&gt; (o un altro[codice lingua](https://www.w3schools.com/tags/ref_language_codes.asp)se hai tradotto messaggi.xml) .
    * setup.xml ha nuovi tag opzionali per disabilitare parti diERDDAP:
        *   &lt;convertitoriActive&gt;false&lt;/ConvertitoriActive&gt;&lt;&#33;-- il default è vero --&gt;
        *   &lt;slideSorterActive&gt;false&lt;/SlideSorterActive &gt;&lt;&#33;-- il default è vero --&gt;
        *   &lt;fmsActive&gt;false&lt;/wmsActive&gt;&lt;&#33;-- il default è vero --&gt; In generale, si consiglia di impostare uno di questi a falsi.
    * Genera i dati Xml ora scrive i risultati a _bigParentDirectory_/logs/generateDatasetsXmlLog.txt, non log.txt. Grazie a Kristian Sebastian Blalid.
    * Genera i dati Xml ora fa un buon suggerimento per il&lt;ricarica EveryNMinutes&gt;. Grazie alNOAAProgetto UAF.
    * Molti piccoli miglioramenti a GenerateDatasetsXml. Grazie alNOAAProgetto UAF.

## Versione 1.42{#version-142} 
 (rilasciato 2012-11-26) 

*    **Nuove funzionalità:** 
    *    (Nessuna nuova caratteristica principale.) 
*    **CoseERDDAP™Gli amministratori devono sapere e fare:** 
    * Se si sta aggiornando daERDDAP™1.38 o 1.40, non ci sono state modifiche che richiedono di apportare modifiche ai file di configurazione (ma è necessario utilizzare il nuovo file message.xml) .
    *   ERDDAP™ancora una volta può funzionare conJava1.6. (ERDDAP™v1.40 richiestoJava1.7.) Si consiglia vivamente di utilizzare l'ultima versione diJava1.7.
    * Un nuovo tipo di dataset,[EDDTEDD OhsXmlFiles](/docs/server-admin/datasets#eddtablefromawsxmlfiles), può leggere i dati da un insieme di Stazione Meteo Automatica (AWS) File di dati XML. Grazie a Lynn Dewitt e all'Exploratorium.
*    **Piccoli cambiamenti/Bug Fixs:** 
    * Regolato alle modifiche al NDBCSOSserver dati sorgente.
    * Regolato alle modifiche ai servizi NOS COOPS ASCII.
    * Ha fatto diverse piccole modifiche e correzioni di bug.

## Versione 1.40{#version-140} 
 (rilasciato 2012-10-25) 

*    **Nuove funzionalità:** 
    * C'è un nuovo formato di file di output pertabledapdatasets:.ncCFMA, che salva i dati richiesti in un.ncfile conforme al CF[Geometrie di smorzamento discreto](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Opzioni Array multidimensionali, e che quindi si conformi ai modelli NODC\\[2021: ora il[Modelli NCEI](https://www.ncei.noaa.gov/netcdf-templates)\\]per la memorizzazione di questo tipo di dati. Grazie a NODC.
    *   tabledaple richieste possono ora includere vincoli di tempo come &time&gt;now-5 giorni. Vedi il[documentazione](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now). Grazie a James Gosling.
*    **CoseERDDAP™Gli amministratori devono sapere e fare:** 
    * Se si sta aggiornando daERDDAP™1.38, non ci sono state modifiche che richiedono di apportare modifiche ai file di configurazione (ma è necessario utilizzare il nuovo file message.xml) .
    *   ERDDAP™comunicati pubblici e pietre miliari interni sono disponibili tramite[ERDDAP™su GitHub](https://github.com/ERDDAP). Per ulteriori informazioni, vedere il[Wiki](https://github.com/ERDDAP/erddap/wiki)per ilERDDAP™progetto e più generale[ERDDAP™Guida del programmatore](/docs/contributing/programmer-guide). (Questo è stato annunciato separatamente alcune settimane dopoERDDAP™1.38 rilascio.) 
    * Generare i dati Xml è stato migliorato.
        * Lo script è stato revisionato in modo che dovrebbe funzionare correttamente su tutti i computer Linux (non solo alcuni) .
        * Ora aggiungecreator\\_name♪creator\\_emailecreator\\_urlquando possibile.
        * Molti altri piccoli miglioramenti.
    * Rifinito comeERDDAP™si occupa del tempo.
        * Internamente,ERDDAP™ora gestisce i tempi a precisione milliseconda (non secondi) .
        * Ora è possibile specificare facoltativamente la precisione di tempo per un dato set di dati, vedere[time\\_precision](/docs/server-admin/datasets#time_precision). Ad esempio, è possibile impostare un dataset per visualizzare i valori di tempo con precisione della data (ad esempio, 1970-01-01) .
        * Le impostazioni predefinite, in modo da non essere influenzate da queste modifiche e continueranno a visualizzare il tempo con la precisione dei secondi. Grazie a Servet Cizmeli e Philip Goldstein.
    *   [EDDTableFromNcCFFiles](/docs/server-admin/datasets#eddtablefromnccffiles)è un nuovo tipo di dataset che è possibile utilizzare nel vostrodatasets.xmlfile. Può leggere i dati da uno qualsiasi dei numerosi formati di file definiti dal[CFU Geometrie di smorzamento discreto](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)convenzioni. Grazie a NODC e speciale grazie a Kyle Wilcox per la realizzazione di file campione per il numero enorme di formati di file DSG validi e per renderli pubblicamente disponibili.
*    **Piccoli cambiamenti/Bug Fixs:** 
    * Ampliato il[avvio rapido](#quick-restart)sistema a tutti i pertinentiEDDGride sottoclassi EDDTable.
    * Documentazione migliorata, particolarmente legata a come utilizzare[Grida](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType)e[tabledap](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#fileType)da vari software client.
    * Cambiata ricerca avanzata per sostenere minTime e/o maxTime espresso come epocaSeconds. Grazie a Lynn Dewitt.
    * Variazione.htmlTableoutput per visualizzare urls e indirizzi e-mail come link.
    * Aggiunto "rel=" e "rev=" al relativo&lt;a href&gt; tags. Grazie a Pat Cappelaere dalOGC RESTprogetto.
    * Miglioramento della protezione contro richieste di dati non realistiche, in particolare all'internotabledap, dove è un problema più difficile.
    * Spostato più messaggi a message.xml.
    * Miglioramento della velocità.
    * FissoEDDGridDa Files per consentire di scendere assi ordinati. Grazie a Maricel Etchegaray.
    * Riferimenti rimossi a iGoogle dal momento che sarà interrotto.
    * Ha fatto diverse piccole modifiche e correzioni di bug.

## Versione 1.38{#version-138} 
 (rilasciato il 2012-04-21) 

*    **Nuove funzionalità:** 
    * ISO 19115 e FGDC --ERDDAP™può generare automaticamente i file di metadati ISO 19115 e FGDC XML per ogni dataset. I collegamenti ai file sono visibili su ogni elenco di set di dati (ad esempio, da Full Text Search) e anche in Web Accessibile cartelle (FAVORE)   (vedi il[FGDC WAF](https://coastwatch.pfeg.noaa.gov/erddap/metadata/fgdc/xml/)e[ISO 19115 WAF](https://coastwatch.pfeg.noaa.gov/erddap/metadata/iso19115/xml/)) . Grazie a Ted Habermann, Dave Neufeld e a molti altri.
    * Ricerca di testo completo per Datasets ora supporta \\-_excludedWord_ e \\-"_escluso frase_" . Grazie a Rich Signell.
    * Ricerca per set di dati ora restituisce risultati una pagina alla volta. Il default utilizza la stringa dei parametri: page=1&itemsPerPage=1000, ma è possibile modificare i valori nell'URL della richiesta. Grazie a Steve Hankin e al progetto UAF.
    *   OpenSearch--ERDDAP™ora supporta il[OpenSearch1.1.](https://coastwatch.pfeg.noaa.gov/erddap/opensearch1.1/index.html)standard per la ricerca di set di dati. Tra le altre cose, questo consente ai siti web di aggregazione catalogo di fare ricerche distribuite (passare una richiesta di ricerca a ogni catalogo che sa circa) .
    * Comma Separato Valore (CSV) File...ERDDAP™ora genera file CSV con una sola virgola tra i valori (che Excel preferisce) , invece di virgola+spazio. Grazie a Jeff deLaBeaujardiere.
    * Milioni di Datasets... Sono state apportate diverse modifiche al sostegnoERDDAPs avere un numero enorme di dataset, forse anche un milione. Grazie a Steve Hankin e al progetto UAF.
*    **CoseERDDAP™Gli amministratori devono sapere e fare:** 
#### Riavvio rapido{#quick-restart} 
*   [A](#quick-restart)sistema di riavvio rapido consenteERDDAP™per riavviare molto più velocemente.
     **Si prega di aggiungere questo al file setup.xml** subito dopo&lt;/datasetsRegex&gt;:
```
              <!-- If true, when you start up ERDDAP™, some types of datasets (e.g., 
              EDDGridFromDap) will used cached information (.dds, .das, etc.) to reload
              very quickly, without contacting the remote server.  The dataset's age 
              will be based on when the dataset was reloaded last.  Normally this 
              should be true (the default), but set it to false if you want to bypass 
              the cached information.
              <quickRestart>true</quickRestart>
```

    * Ricerca di testo completo per set di dati può ora essere fatto con il motore di ricerca Lucene (anche se consigliamo il motore di ricerca originale se avete meno di 10.000 set di dati) o il sistema di ricerca originale.
         **Si prega di aggiungere questo al file setup.xml** subito dopo&lt;/displayDiagnosticInfo&gt;:
```
              <!-- ERDDAP™ lets you choose between two search engines for full text searches:
              \\* original (the default) -- is the best choice if your ERDDAP™ has fewer 
                than about 10,000 datasets.  It is very robust and trouble free. 
              \\* lucene -- is the best choice for more than about 10,000 datasets.
                The advantages are that with any number of datasets it works fast 
                and uses very little memory.
                But there are many things that might go wrong with individual 
                queries and with the whole system. 
                And although its behaviour (the datasets it finds and the order that
                it ranks them) is almost identical to the original search engine,
                it has a few quirky, subtle, small differences.
              -->
              <searchEngine>original</searchEngine>
```

    * In setup.xml, è ora possibile/dovrebbe aggiungere due nuove categorie all'elenco separato dalla virgola di&lt;categoryAttributes&gt;:
        * globale: parole chiave (aggiungerlo subito dopo l'istituzione globale) -- un nuovo caso speciale che parses un elenco separato da virgola di parole chiave dall'attributo parole chiave globale per fare una voce separata per ogni parola chiave.
        * variabile Nome (aggiungere alla fine) -- un nuovo caso speciale che categorizza ciascuno deidataVariable destinationNameS.
    * In setup.xml, è possibile (Ma perché?) Dillo.ERDDAP™non offrire metadati FGDC e/o ISO 19115 per qualsiasi dataset incluso
```
        <fgdcActive>false</fgdcActive>  
        <iso19115Active>false</iso19115Active>
```

I valori predefiniti per queste impostazioni sono veri.
    * Indatasets.xml, si prega di considerare il miglioramento dei metadati per i vostri set di dati.ERDDAP™ora genera automaticamente i file di metadati ISO 19115 e FGDC XML per ogni dataset in base ai metadati del dataset.
Allora... **buon dataset metadati porta a buoniERDDAP-generati metadati ISO 19115 e FGDC.**   
         **Vedere la nuova documentazione per i molti nuovi[Attributi globali](/docs/server-admin/datasets#global-attributes).** 
    * Indatasets.xmlSe vuoi dirloERDDAP™utilizzare un file FGDC pre-made e/o ISO 19115 che è da qualche parte sul file system del server invece di avereERDDAP™generare questi file, utilizzare:
```
        <fgdcFile>_fullFileName_</fgdcFile>  
        <iso19115File>_fullFileName_</iso19115File>
```
Se _fullFileName_\\=" o il file non viene trovato, il dataset non avrà metadati FGDC e/o ISO 19115. Quindi questo è utile anche se si desidera sopprimere i metadati FGDC e/o ISO 19115 per un datoset specifico.
    * Indatasets.xmlper tuttiEDDGridSideBySide eEDDGridAggregateExistingDimension datasets, assicurarsi che i dataset bambino hanno diversidatasetIDs rispetto ai dati dei genitori e degli altri bambini. (Ad esempio, si potrebbe seguire il sistema semplice ma efficace di George Foreman per nominare i suoi figli.) Se i nomi in una famiglia sono esattamente gli stessi, il dataset non verrà caricato (con il messaggio di errore che i valori dell'asse aggregato non sono in ordine ordinato) .
    * Indatasets.xml, ci sono state alcune modifiche alla lista di validiioos\\_categoryvalori dei metadati:
        * "pCO2" è stato cambiato in "CO2".
        * "Oceanografia fisica" è stato aggiunto.
        * "Soils" è stato aggiunto.
    * Indatasets.xml♪ERDDAP™non permette più '.' indatasetID. Era permesso ma scoraggiato. (Scusa.) 
    * Indatasets.xml, la configurazione per EDDTableFromThreddsFiles e EDDTableFromHyraxI file sono cambiati leggermente perché entrambe le classi sono state riscritte per essere più efficienti (entrambe le classi ora fanno sempre una copia locale di tutti i file di dati remoti) . Vedi la documentazione per la creazione di queste classi:[EDDTEDDHyraxFile](/docs/server-admin/datasets#eddtablefromhyraxfiles)e[EDDTableFromThreddsFiles](/docs/server-admin/datasets#eddtablefromthreddsfiles). In particolare, vedere i commenti riveduti su&lt;fileDigital (ora irrilevante) e&lt;sourceUrl&gt; (ora essenziale) . Inoltre, non dovreste mai avvolgere questa classe in EDDTableCopy per l'efficienza.
    * Indatasets.xml, se si utilizza EDDTableFromDatabase con unOracledatabase, si dovrebbe includere una connessione Proprietà come
```
        <connectionProperty name="defaultRowPrefetch">4096</connectionProperty>  
```
per specificare quante righe di dati recuperare in una sola volta perché il default è 10, che è orribilmente inefficiente. Vedi il[Oracledocumentazione](https://docs.oracle.com/cd/B10501_01/java.920/a96654/basic.htm). MySql e PostgreSQL sembrano avere migliori default per questa impostazione. Grazie a Kevin O'Brien.
    * Se si utilizza EDDTableFromDatabase, vedere il migliorato[Documentazione "Speed"](/docs/server-admin/datasets#eddtablefromdatabase)per ulteriori suggerimenti per migliorare le prestazioni. Grazie a Kevin O'Brien.
    * Indatasets.xml, per tutti i dati EDDTable, nelle convenzioni eMetadata\\_Conventionsattributi globali, si prega di fare riferimento a CF-1.6 (non CF-1.0, 1.1, 1.2, 1.3, 1.4 o 1.5) , dal momento che CF-1.6 è la prima versione per includere le modifiche relative alla Geometria Sampling Discrete.
    * Programmatori che stanno compilandoERDDAP™codice bisogno di aggiungere lib/lucene-core.jar all'elenco dei file jar nei loro percorsi di riga di comando javac e java.
    *   ERDDAP™ha[nuovo servizio](https://coastwatch.pfeg.noaa.gov/erddap/convert/keywords.html)per convertire un nome standard CF da / per una parola chiave di scienza GCMD. È possibile trovare questo utile quando si generano metadati di parole chiave globali per i set di dati nel vostroERDDAP.
    * Trattare con Bots... Si prega di leggere questo consiglio per[impedire ai robot di strisciareERDDAP™in un modo stupido](/docs/server-admin/additional-information#robotstxt).
    * Traduzione... Il testo inERDDAP's pagine web è ora principalmente in messaggi.xml e così adatto per la traduzione in diverse lingue (ad esempio, tedesco, francese) . I messaggi ora spesso usano MessageFormat per la formattazione, anche per aiutare a fare traduzioni. Se siete interessati a fare una traduzione, si prega di e-mailerd dot data at noaa dot gov.
    * Esempiodatasets.xml-- Ci sono stati diversi piccoli ma significativi errori nel campionedatasets.xml. Se si utilizzano questi set di dati, si prega di ottenere le versioni più recenti dal nuovo campionedatasets.xmlnel nuovo erddapContent.zipfile. Grazie a James Wilkinson.
    * Git... Cercherò difficile da fareERDDAP™un progetto GitHub al più presto dopo questa pubblicazione.
*    **Piccoli cambiamenti/Bug Fixs:** 
    * Una nuova tavolozza, OceanDepth, è utile per valori di profondità (positivo è diminuito) , ad esempio, 0 (Articolo) a 8000 (profondo) .
    * The.kmluscita databledaputilizza un'icona di marcatore migliore (Non è fuzzy) . E l'hovering su un marcatore ora lo rende più grande.
    * EDDTableFromFiles -- Nell'ultimo aggiornamento, la nuova libreria netcdf-java aveva restrizioni più strette per i nomi variabili in.ncfile. Ciò ha causato problemi per EDDTableFromFiles se di una variabilesourceNameaveva alcuni caratteri di punteggiatura. EDDTableFromFiles è ora modificato per evitare questo problema. Grazie a Thomas Holcomb.
    * La pagina .subset ora supporta 0/10/100/1000/10000/100000 invece di una casella di controllo per Dati Correlati. Il tooltip avverte che 100000 potrebbero causare il crash del browser. Grazie a Annette DesRochers, Richard (Abe) Coughlin e IOOS Biological Project.
    * .../erddap/info/_datasetIDLe pagine web _/index.html ora mostrano URL e indirizzi e-mail come link cliccabili. Grazie a Richard (Abe) Coughlin e IOOS Biological Project.
    * Correzione di bug: Intabledap, per dataset con altitudine MetsPerSourceUnit&lt;0, le domande con vincoli di altitudine sono state gestite in modo errato. Grazie a Kyle Wilcox.
    * Correzione di bug:EDDGridAggregateFromExistingDimension ora supporta più diversi URL TDS. Grazie?

## Versione 1.36{#version-136} 
 (pubblicato 2011-08-01) 

*    **Nuove funzionalità:** 
    * Nessun cambiamento significativo dal punto di vista di un utente.
*    **CoseERDDAP™Gli amministratori devono sapere e fare:** 
    * Il dataset pmelTao che è stato spesso utilizzato come dataset del campione pertabledap  
la documentazione non è più disponibile.ERDDAP™Gli amministratori devono effettuare queste modifiche:
        * Nel tuodatasets.xmlSe hai undatasetID="pmelTao" dataset, aggiungere
attivo="falso" subito prima del "&gt;" alla fine di quella linea.
        * Nel tuo setup.xml, se il tuo&lt;EDDTableIdExample&gt; è pmelTao, allora:
            * Se il tuodatasets.xmlnon ha un dataset condatasetID="erdGlobecBottle", aggiungere
```
                <dataset type="EDDTableFromErddap" datasetID="erdGlobecBottle" active="true">  
                  <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGlobecBottle</sourceUrl>  
                </dataset>
```
            * Nel setup.xml, sostituire tutti i tag da&lt;EDDTableIdExample&gt; attraverso
                &lt;EDDTableMatlabEsemplare di trama &gt; con
```
                <!-- Tabledap Examples
                This group of settings is used to make examples for the tabledap documentation 
                that appears at \\[baseUrl\\]/erddap/tabledap/documentation.html and elsewhere.
                If you include the erdGlobecBottle dataset in your datasets.xml (recommended), 
                you don't need to change these.
                If you don't, you MUST change these before you make your ERDDAP™ public; 
                otherwise, none of the examples will work!
                The new settings should be very similar to the defaults.
                If your ERDDAP™ won't serve any tabular datasets, use "NOT\\_APPLICABLE" for all of the entities.
                In .xml files like this, ampersand, lessThan, and greaterThan have to be 
                HTML encoded as "&amp;", "&lt;", "&gt;".
                -->
                <!-- This is the datasetID for an EDDTable dataset that is served by your ERDDAP.
                     This dataset is used as the basis for all of the EDDGrid examples below. 
                     Ideally, it is a dataset that has longitude, latitude, and time variables (among others). 
                     ('time' allows for making a time series graph. 'latitude' and 'longitude' allow for making a map.)
                     The dataset can have longitude values -180 to 180, or 0 to 360. -->
                <EDDTableIdExample>erdGlobecBottle</EDDTableIdExample>
                <!-- This is a comma-separated list of variables from the dataset.
                     It is useful if it is "longitude,latitude,time," plus a data variable name. -->
                <EDDTableVariablesExample>longitude,latitude,time,bottle\\_posn,temperature1</EDDTableVariablesExample>
                <!-- This is the constraints example which is appended to EDDTableVariablesExample. -->
                <EDDTableConstraintsExample>&amp;time&gt;=2002-08-17T00:00:00Z&amp;time&lt;=2002-08-19T20:18:00Z</EDDTableConstraintsExample>
                <!-- This is an example data query using an ISO-formatted time. 
                     You could generate your example via your dataset's Data Access Form in ERDDAP.  -->
                <EDDTableDataTimeExample>longitude,latitude,time,bottle\\_posn,temperature1&amp;time&gt;=2002-08-17T00:00:00Z&amp;time&lt;=2002-08-19T20:18:00Z</EDDTableDataTimeExample>
                <!-- This is an equivalent example data query, but which specifies time as seconds-since-1970-01-01. 
                     If you need to convert a date/time to "seconds since 1970-01-01", use
                     https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html -->
                <EDDTableDataValueExample>longitude,latitude,time,bottle\\_posn,temperature1&amp;time&gt;=1029542400&amp;time&lt;=1029788280</EDDTableDataValueExample>
                <!-- This is an example query which generates a graph. 
                     You could generate your example via your dataset's Make A Graph form in ERDDAP.  -->
                <EDDTableGraphExample>bottle\\_posn,temperature1&amp;time=2002-08-19T10:06:00Z&amp;.draw=lines</EDDTableGraphExample>
                <!-- This is an example query which generates a map. 
                     In the default mapExample, temperature1, time, bottle\\_posn are useful 
                     because they appear in GoogleEarth with the .kml example 
                     and are ignored by the other image file types. -->
                <EDDTableMapExample>longitude,latitude,temperature1,time,bottle\\_posn&amp;time&gt;=2002-08-13T00:00:00Z&amp;time&lt;=2002-08-20T00:00:00Z&amp;bottle\\_posn=1&amp;.draw=markers&amp;.marker=5|5</EDDTableMapExample>
                <!-- This is a Matlab example which uses data from the EDDTableGraphExample.
                     Note the Matlab notation datasetName.variableName.  -->
                <EDDTableMatlabPlotExample>plot(erdGlobecBottle.bottle\\_posn, erdGlobecBottle.temperature1)</EDDTableMatlabPlotExample>
```
                
    * Per i set di dati in cui il tipo è una sottoclasse di EDDTableFromFiles, è ora possibile fare i dati dai metadati.
Nello specifico, è ora possibile fare una variabile dai valori di un attributo di una delle variabili originali.
Per esempio, indatasets.xml, dentro&lt;dataVariable&gt; tag, se si utilizza
```
        <sourceName>variable:cruise:PI</sourceName>  
```
        ERDDAP™farà una variabile con i valori dell'attributo PI della variabile di crociera.
Grazie alla polizia.
*    **Modifiche:** 
    * Piccoli cambiamenti

## Versione 1.34{#version-134} 
 (rilasciato il 2011-06-15) 

*    **Modifiche:** 
    * Correzione di bug: Risolto una perdita di memoria che si è verificato su circa 64 bitJavaimpianti.
    * Correzione di bug:ERDDAP™Ora imposta correttamente questi attributi globali quando i valori della dimensione di latitudine variano da alto a basso: geospatial\\_lat\\_min, geospatial\\_lat\\_max, Southernmost\\_Northing, Northernmost\\_Northing.
        
Nota:actual\\_rangeè invariato: può avere valori bassi, alti o alti, bassi, dal momento che è destinato a indicare l'intervallo e l'ordine di archiviazione.
        
    * Piccoli cambiamenti.
    *   ERDDAP™gli amministratori non hanno bisogno di apportare modifiche al loro setup.xml odatasets.xml.

## Versione 1.32{#version-132} 
 (rilasciato 2011-05-20) 

*    **Modifiche:** 
    * Supporto per le Geometrie di smorzamento di nuova ratifica, CF Discrete (che purtroppo non è ancora disponibile online) , che sostituisce le convenzioni di osservazione CF Point proposte.
        ERDDAP™Gli utenti vedranno che cdm\\_feature\\_type=Station è sostituito da TimeSeries e ci sono piccole modifiche ai file creati per.ncTipo di file CF (flat\\_dimension è ora chiamato campione\\_dimension) .
        ERDDAP™gli amministratori dovranno apportare queste modifichedatasets.xml:
        * cdm\\_data\\_type=Station dovrebbe essere modificato in cdm\\_data\\_type=TimeSeries.
        * cdm\\_data\\_type=StationProfile dovrebbe essere modificato in cdm\\_data\\_type=TimeSeriesProfile.
        * cdm\\_station\\_variables dovrebbe essere modificato in cdm\\_timeseries\\_variables.
        * cf\\_role=station\\_id dovrebbe essere modificato in cf\\_role=serie temporali\\_id.
    * Nuovoioos\\_categoryopzioni: "Materia organica disciolta colorata", "pCO2", "Custo di vapore", "Materia Sospesa Totale".
    * Possibile soluzione a una possibile perdita di memoria su 64 bitJava.\\[Non ha funzionato.\\]
    * Piccoli cambiamenti.

## Versione 1.30{#version-130} 
 (rilasciato il 2011-04-29) 

*    **Nuove funzionalità:** 
    * Supporto per 64 bitJava. Quando utilizzato con 64 bitJava♪ERDDAP™può ora utilizzare molto più grande memoria e gestire molte richieste più simultanee.
    * Supporto per.ncrichieste di file fino a 2GB (anche senza 64 bitJava) tramite un migliore utilizzoERDDAPLa gestione dei dati in pezzi.
    * Molti miglioramenti della velocità 2X nel codice e la velocità 2X aumenta daJava1.6 fareERDDAP™2X a 4X più veloce di prima.
    * Miglioramento del risparmio di memoria significativamente inferioreERDDAPL'uso della memoria di base.
    * Per set di dati tabulari,ERDDAP™è ora pienamente consapevole del cdm\\_data\\_type di un dataset e di come i dati mappano il tipo CDM. Vedi il[CFU Specifiche di geometrie di campionamento discreto](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries). Forse un giorno presto, quel file di Word sarà convertito in .html e sostituire le attuali informazioni "OBSOLETE" su quella pagina web. Grazie alNOAAProgetto UAF.
    * Per la maggior parte dei set di dati EDDTable, un nuovo tipo di file di output opzione,.ncCF, crea Contiguous Ragged Array.ncfile conformi all'ultima versione della[CFU Convenzioni di Geometrie di smorzamento discreto](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries). Questi file sono strutturati per riflettere il tipo di dati CDM del dataset. Poiché le convenzioni proposte sono appena cambiate, a partire da questa scrittura, la libreria netcdf-java non supporta ancora la lettura dei formati di file creati daERDDAPe interpretarli come file di dati CDM. Probabilmente presto. Grazie alNOAAProgetto UAF.
    * L'opzione Data Distinct sulla pagina web .subset è ora un elenco a discesa che consente agli utenti di specificare il numero massimo di righe di dati distinti da visualizzare (default = 1000) . Questo cambiamento, e altri, permettonoERDDAP™lavorare con i dataset che hanno un gran numero di righe di dati distinti. (Il numero di valori unici per ogni singola variabile è ancora un problema, ma può essere piuttosto alto (20.000?) prima che il .subset e altre pagine web caricano molto lentamente.) Grazie alNOAAProgetto UAF.
    * .subset pagine web hanno una nuova opzione: Visualizza conteggi di dati distinti. Grazie al progetto GTOPP.
    * Per aiutare gli utenti, i valori distinti (ad esempio, nomi della stazione) sono ora mostrati sui moduli Make-A-Graph e Data Access. Grazie alNOAAProgetto UAF.
    * .trasparente Le richieste Png ora supportano tutti i tipi di grafici e rappresentazioni dei dati. Disegna solo i dati -- niente assi, leggende, mascherina, o altro. Questo rende possibile fare immagini come strati di trasparentiPngs. Se &amp;size=_width_|_height_ è specificato nella query (raccomandato) , è onorato. Il default è 360x360 pixel. L'unica eccezione èEDDGrid&.draw=superficie, dove il default (come prima) è un'immagine con ~1/pixel per data point (fino a 3000 x e y pixel) . Grazie a Fred Hochstaedter.
    * TheWMSpagine web ora mostrano la barra dei colori per la variabile del dataset (#) . Grazie a Emilio Mayorga e altri.
*    **CoseERDDAP™Gli amministratori devono sapere e fare:** 
    * Questa versione comporta un sacco di cambiamenti. Sono tutti importanti. Si prega di essere paziente e lavorare attraverso tutti i cambiamenti elencati di seguito.
    * Questa versione è stata spinta fuori prima che intende trattare con alcuniJavabug di sicurezza. Purtroppo, diverse caratteristiche/fissi destinati a questoERDDAP™la versione non è in questa versione. Scusa. Speriamo che la prossima versione sarà relativamente presto (e molto più facile da aggiornare a) .
    * Per evitare diversi bug di sicurezza inJava6 aggiornamento 23 e seguenti, scaricare e installare l'ultima versione diJava  (Java6 aggiornamento 24 o superiore) . Se si dispone di un sistema operativo a 64 bit, si prega di ottenere una versione a 64 bit diJava.
    * Se stai usando Tomcat 5, devi aggiornare Tomcat 6 o 7 (preferito) . Se si utilizza Tomcat 6, prendere in considerazione l'aggiornamento a Tomcat versione 7.
    * Si prega di seguire tutte le istruzioni per[creare un nuovoERDDAP™](/docs/server-admin/deploy-install), ma se pertinente, sarete copiare i file dalla vostra vecchia installazione alla nuova installazione, in particolare la\\[tomcat\\]/content/erddap directory e file. Come parte di questo, nota il[nuove raccomandazioni per la configurazione di Tomcat](/docs/server-admin/deploy-install#tomcat).
    * Il default erddap.css è ora incluso nel file erddap.war.
        * Per usare erddap.css predefinito, **Cancella** il tuo vecchio\\[tomcat\\]/content/erddap/images/erddap.css .
        * Se hai modificato\\[tomcat\\]/content/erddap/images/erddap.css, e vuole continuare a usarlo: basta lasciarlo al posto e sostituire&lt;sezione input&gt; con:
```
            /\\* Small input items let more be shown on one screen  
            (esp. Chrome and Safari). Google Chrome and Safari have  
            default margin 2px, while others are 0. This sets all to 0.  
            .skinny is used e.g., for the buttons above the image on  
            a Make A Graph page. \\*/  
            input\\[type=button\\], input\\[type=submit\\], button {  
              margin:0px; padding:0px 3px; }  
            input\\[type=checkbox\\], input\\[type=password\\],  
              input\\[type=text\\], select, textarea {  
              margin:0px; padding:0px; }  
            input\\[type=radio\\] {margin:0px 2px; padding:0px; }  
            input.skinny {padding:0px 1px; }
```

    * Nel tuo\\[tomcat\\]/content/erddap/setup.xml:
        * Sostituire i commenti e i tag relativi a&lt;parzialeRequestMaxBytes&gt; e&lt;parzialeRequestMaxCells&gt; con
```
            <!-- When possible (and it isn't always possible),  
            ERDDAP™ breaks source data requests into chunks to  
            conserve memory. See the description of these tags in  
            messages.xml. You can override the default chunk sizes  
            here with  
            For grids:  
             <partialRequestMaxBytes>100000000</partialRequestMaxBytes>  
            For tables:  
             <partialRequestMaxCells>100000</partialRequestMaxCells>  
            \\-->
```
        * Sostituire i commenti relativi a&lt;categoryAttributes&gt; e considerare la modifica del valore del tag:
```
            <!-- This is the comma-separated list (recommended:  
            in alphabetical order) of the global attribute and  
            variable attribute names which will be used to  
            categorize the datasets and shown to clients at urls  
            like .../erddap/categorize/ioos\\_category/index.html  
            (ioos\\_category is unusual, but is used at ERD).  
            If an attribute is a global attribute, identify it by  
            prefixing it with "global:".  
            \\-->  
            <categoryAttributes>global:institution, ioos\\_category,  
            long\\_name, standard\\_name</categoryAttributes>  
```

Individuale&lt;categoryAttributes&gt; che sono attributi globali ora DEVE essere identificato tramite il prefisso globale: (ad esempio, globale:instituzione) . Altri attributi sono considerati attributi variabili (ad esempio,standard\\_name) . Inoltre, i valori dell'istituzione (gli unici) sono stati lasciati nel caso originale. Ora tutti i valori di categoria sono convertiti in minuscolo.
    * Nel tuo\\[tomcat\\]/ contenuto/erddap/datasets.xml:
        * Grande MIGLIORATO:ERDDAP™ha nuovi requisiti relativi al cdm\\_data\\_type di un set di dati tabulare. In particolare, ogni dataset DEVE avere i metadati e le variabili corretti relativi al cdm\\_data\\_type. In caso contrario, il dataset non si carica e getterà un errore. Vedere la documentazione per[cdm\\_data\\_type](/docs/server-admin/datasets#cdm_data_type).
        * FYI: C'è un nuovo tipo di dataset: EDDTableFromAsciiServiceNOS.
        * FYI: Ci sono tre nuovi permessiioos\\_categoryopzioni: Idrologia, Qualità (ad esempio, per bandiere di qualità) , e Statistiche (ad esempio, significa) .
        * Per EDDTableDa... File set di dati, rimuovere qualsiasi&lt;nDimensions&gt; tags. Non sono più necessari o utilizzati.
        * Per variabili condestinationName=latitudine,ERDDAP™non forza piùlong\\_nameessere Altitudine. Per favore, vattene.datasets.xmle ripetutamente cercare&lt;destinationName&gt;altitudine e aggiungere a quella variabile&lt;addAttributes&gt;:
```
              <att name="long\\_name">Altitude</att>  
```
             (o leggermente diversolong\\_namein casi particolari) .
        * Opzionale: Tutte le sottoclassi EDDTableFromFiles supportano la variabile[sourceName=globale:...](/docs/server-admin/datasets#global-sourcenames)convertire i metadati globali da ogni file in una variabile di dati. Grazie a Lynn DeWitt.
    * EDDTableFromDatabase utenti --ERDDAP™viene fornito con un nuovo driver JDBC 4 per Postgres. Per altri database, controlla il web per l'ultimo file JDBC .jar per il tuo database. DaERDDAP™ora usiJava1.6+, JDBC 4 (3) è probabilmente consigliato.
    * FYI
        *   EDDGridDa...Files ed EDDTable Da... File datasets ora memorizzare il fileLe informazioni di tabella in
            \\[BigParentDirectory\\]/set dati Informazioni /\\[datasetID\\]#.ncfile.
Inoltre, EDDTable datasets ora memorizzare le informazioni sottoset in
            \\[BigParentDirectory\\]/set dati Informazioni /\\[datasetID\\]#.ncfile. Questi file utilizzati per
            \\[BigParentDirectory\\]/set dati Informazioni /\\[datasetID\\]..jsonfile.
I vecchi file verranno cancellati automaticamente quandoERDDAP™Comincia. Oppure, è possibile eliminare tutti i file (ma lasciare le sottodirectory vuote) in\\[BigParentDirectory\\]/datasetInfo/.
        * Ho lavorato su un nuovo EDDTableFromNcCFFiles che avrebbe letto i dati da file locali e remoti utilizzando le nuove convenzioni di osservazione CF Point proposte. Ma non e' in questa versione. Ci sono problemi nelle librerie netcdf-java relativi ad alcuni metodi per la lettura di questi file. E ci sono stati alcuni recenti cambiamenti alle convenzioni di osservazione CF Point proposte. Quando la biblioteca netcdf-java è fissata e aggiornata all'ultima proposta, riprenderò il lavoro su questo.
        * CorrereERDDAP™su Windows potrebbe avere problemi: in particolare, si può vedere nel\\[bigParentDirectory/logs/log.txt file cheERDDAP™a volte non è in grado di eliminare e/o rinominare i file rapidamente. Questo è dovuto al software antivirus (ad esempio, da McAfee e Norton) che sta controllando i file per i virus. Se si verifica questo problema (che può essere visto da messaggi di errore nel file log.txt come "Impossibile eliminare ...") , cambiare le impostazioni del software antivirus può parzialmente alleviare il problema.
SeERDDAP™in Windows è solo un test in esecuzione sul desktop, questo è solo un fastidio.
SeERDDAP™in Windows è il tuo pubblicoERDDAP™, considerare di passare a un server Linux.
    * Primo avvio lento -- La prima volta che scappiERDDAP™dopo l'aggiornamento,ERDDAP™può essere lento per caricare i set di dati. La viaERDDAP™memorizza le informazioni sui file aggregati è cambiato, quindiERDDAP™avrà bisogno di rileggere alcune informazioni da tutti quei file. Ci vorrà del tempo.
    * Errori sull'avvio -- Data le modifiche relative a cdm\\_data\\_type, è probabile che alcuni dei tuoi set di dati non carichino e genereranno errori. Leggere attentamente l'email del Daily Report cheERDDAP™ti manda quandoERDDAP™è finito di iniziare. Avrà un elenco di set di dati che non hanno caricato (in alto) e la ragione per cui non hanno caricato (vicino al fondo) .
    * Se sei bloccato o hai altre domande, e-mail i dettagli a me:erd.data at noaa.gov.
    * Programmatori -- Se scriviJavaprogrammi che funzionanoERDDAP™codice, è necessario modificare alcuni dei riferimenti dei parametri della riga di comando:
        * Cambia joda-time-1.6.2.jar a joda-time. vaso
        * Modificare il riferimento Postgres JDBC .jar a postgresql.jdbc.jar
*    **Piccoli cambiamenti e correzioni di bug:** 
    
    * Migliorata la gestione della connessione per evitare filetti appesi.
    * Migliorate le pratiche di convalutazione per gestire le richieste quasi simultaneamente identiche in modo più efficiente.
    *   ERDDAP™ora utilizza netcdfAll-4.2.jar (rinominato a netcdfAll-latest. vaso) . Questo interruttore ha richiesto diversi cambiamenti interni e ha causato alcuni piccoli cambiamenti esterni, ad esempio, modifiche a come i file grib sono letti e piccole modifiche al.ncUscita intestazione.
    * Nuova funzionalità:\\[Erddap\\]/convert/fipscounty.html convertitiFIPScodici di contea da/da nomi di contea.
    * Sulle mappe, i confini dello stato sono ora viola scuro, quindi si distinguono meglio su tutti i colori di sfondo.
    * Tabella.kmloutput utilizza nuovamente un'icona circolare per contrassegnare i punti (non l'icona dell'aereo Google si è recentemente attivato) .
    * I dataset erdCalcofi sono stati riorganizzati e sono ora serviti da file locali (più veloce) .
    * Generare i dati Xml da Pronti Catalogo ora crea un file di risultati:
        \\[tomcat\\]/webapps/erddap/WEB-INF/temp/EDDGridDaThreddsCatalog.xml . Grazie a Kevin O'Brien.
    * Genera i dati Xml da Pronti Catalogo ora cerca di rimuovere i numeri di porta non necessari dagli URL sorgente (ad esempio, : 8080 e : 8081 possono talvolta essere rimossi) . Grazie aNOAALa squadra di sicurezza del centro.
    * Per le pagine web .subset, la Mappa di Distinct Data ora ha un range variabile di lat lon.
    * Varie listeERDDAP™  (ad esempio, la tabella che mostra tutti i set di dati) sono stati ordinati in modo che A..Z ordinati prima di un..z. Ora si occupano di casi insensibili.
    * Piccoli cambiamenti alle pagine web .subset, tra cui: le unità sono ora indicate.
    * Genera i dati Xml e DasDds non gettano più un'eccezione se non riesce a mettere i risultati sul sistema clipboard o displayInBrowser. Grazie a Eric Bridger e Greg Williams.
    * Correzione di bug: Quando vengono caricati i dataset,ERDDAP™ora rimuove o regola gli attributi geospaziali globali. Grazie a Charles Carleton.
    * Correzione bug: String2.getClassPath () ora correttamente per cento-decodifica la classe Sentiero (in particolare, su Windows, gli spazi nel nome del file sono apparsi in %20) . Ciò ha interessatoERDDAP™EDStatic chiama SSR.getContextDirectory () e trovare contenuti/erddap. Grazie ad Abe Coughlin.
    * Bug fix: in EDDTableFromFiles relativi a getDataForDapQuery gestione distinta () richieste. Grazie a Eric Bridger.
    * Correzione di bug:tabledaple richieste non gestivano correttamente i vincoli di altitudine quando l'altitudine del dataset MetersPerSourceUnit era -1. Grazie a Eric Bridger.
    * Bug fix: EDDTableDa... I dataset dei file ora gestiscono correttamente le richieste che includono = NaN e &#33;=NaN.
    
## Versione 1.28{#version-128} 
 (rilasciato 2010-08-27) 

*    **Nuove funzionalità:** Nessuno.
*    **CoseERDDAP™Gli amministratori devono sapere e fare:** Nessuno.
*    **Correzione di bug:** Fissare un errore di programmazione (solo in ver 1.26) che ha fattoERDDAP™Molto lento.
     

## Versione 1.26{#version-126} 
 (rilasciato 2010-08-25) 

*    **Nuove funzionalità:** Nessuno.
*    **CoseERDDAP™Gli amministratori devono sapere e fare:** 
    * Dal tuo\\[tomcat\\]/content/erddap/setup.xml,
        * In&lt;legal&gt;, su una nuova linea qui sotto\\[standard DataLicens\\], inserto\\[StandardContatto\\].\\[StandardContatto\\]si riferisce al&lt;adminEmail&gt; specificato più in alto in setup.xml.
        * Rimuovi&lt;tavoloCommonBGColor&gt; e&lt;tavoloHighlightBGColor&gt;.
        * Consigliato: Cambiamento&lt;endBodyHtml&gt; a
```
            <endBodyHtml><!\\[CDATA\\[  
            <br>&nbsp;  
            <hr>  
            ERDDAP, Version &erddapVersion;  
            <br><a href="&erddapUrl;/legal.html">Disclaimers</a> |  
            <a href="&erddapUrl;/legal.html#privacyPolicy">Privacy Policy</a> |  
            <a href="&erddapUrl;/legal.html#contact">Contact</a>  
            </body>  
            \\]\\]></endBodyHtml>
```

    * Richiesto: A te\\[tomcat\\]/content/erddap/images/erddap.css e erddapAlt.css, aggiungere in fondo:
```
        /\\* This is used on the /info/\\[datasetID\\]/index.html pages to highlight a row or cell. \\*/  
        tr.highlightBGColor {background-color:#cceecc; }  
        td.highlightBGColor {background-color:#cceecc; }
```
*    **Correzioni di bug e piccole modifiche:** 
    
    * Bug fix: in alcune situazioni, le forme non funzionavano in alcune versioni di Internet Explorer. Grazie mille a Greg Williams.
    * Correzione di bug: I pulsanti Make A Graph non funzionavano se il dataset provenisse da un telecomandoERDDAP.
    * Correzione di bug:WMSa volte non ha funzionato se il dataset era da un telecomandoERDDAP.
    * Molti piccoli cambiamenti e correzioni di bug.
    

## Versione 1.24{#version-124} 
 (rilasciato 2010-08-06) 

*    **Nuove funzionalità:** 
    * Nuovo[Le pagine web di Subset](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/index.html)utilizzare la ricerca sfaccettata per selezionare sottoinsiemi di set di dati tabulari. Grazie a POST.
    * Nuovo[Ricerca avanzata](https://coastwatch.pfeg.noaa.gov/erddap/search/advanced.html)combina tutte le altre opzioni di ricerca e aggiunge longitudine, latitudine, e le caselle di rilegatura del tempo. Grazie a Ellyn Montgomery. (Mi dispiace per il ritardo.) 
    * Nuovo[Tempo di conversione](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)pagina web e servizio consentono di convertire i tempi numerici in / dai tempi di stringa ISO.
    * Nuovo[Convertire unità](https://coastwatch.pfeg.noaa.gov/erddap/convert/units.html)pagina web e servizio consentono di convertireUDUNITSda/per unità UCUM. Grazie aNOAAIOOSSOS.
    * Setabledaprichiesta include &units ("UCUM") , i nomi delle unità saranno convertiti da nomi originali (di solitoUDUNITS) a[UCIO](https://unitsofmeasure.org/ucum.html)I nomi delle unità. Questo colpisce solo le unità\\*nomi\\*, non valori di dati. Grazie aNOAAIOOSSOS.
    * Miglioramenti per rendere un grafico pagine web e grafici e mappe:
        * Se il grafico è una mappa, ci sono nuovi pulsanti Make A Graph per ingrandire e una nuova opzione per fare clic per cambiare il punto centrale della mappa. Grazie a POST.
        * Filtro impostazioni aggiunte vicino al fondo. Grazie a Greg Williams.
        * I file di dati della costa sono stati aggiornati a GSHHS v2.0. Grazie a POST.
        * Le mappe ora includono laghi e fiumi. Grazie a POST. (Spiacenti, il Delta del fiume Sacramento manca perché né i dati della costa né il dataset del lago / fiume si occupa di esso.) 
        * Il costruito in pscoast-derived nazione / stati file sono stati aggiornati. Grazie a POST.
        * Topography.cpt è stato modificato leggermente. (Mi dispiace se questo ti colpisce negativamente.) Grazie a POST.
        * In Gridap's Make A Graph, se un utente cambia una variabile, il modulo viene automaticamente rispedito in modo che ilaxisVariables' showStartAndStop riflette sempre le variabili del grafico. Grazie a Joaquin Trinanes.
        * Per png e pdf URL immagine:
            * New &.land=_value_, dove _value_ può essere "sotto" (mostra topografia) o "sotto" (mostra solo la tecnica del bagno) . Se non specificato, il default è impostato per[drawLandMask](/docs/server-admin/datasets#global-drawlandmask)indatasets.xmlo setup.xml. Grazie a POST.
            * Nuovo: le linee nella leggenda che sono troppo lunghe vengono automaticamente rotte in più linee. Grazie a POST.
        * Per gli URL dell'immagine png:
            * New &.legend=_value_, dove _value_ può essere "Bottom" (predefinito) "Off" o "Only". Questo permette di includere la leggenda, escludere la leggenda, o ottenere solo la leggenda. Grazie a Cara Wilson.
            * Nuovo &amp; periodo; Pixels_ lascia un confine di nPixels (ad esempio, 10) in fondo all'immagine. Viene applicato dopo .legend=Off. Grazie a Cara Wilson.
            * New &amp;size=_width_|_height_ consente di specificare la larghezza e l'altezza dell'immagine, in pixel.
    * Nuovi formati di file di output:
        * .csvp e.tsvp -- come .csv e.tsv, ma con " (# Units #) " allegato ai nomi delle colonne sulla prima riga.
        * .odvTxt -- rende un file .txt che semplifica l'acquisizione dei dati in[Dati oceanici Vista (ODV) ](https://odv.awi.de/).
        * .esriCsv -- rende un file .csv adatto per l'importazione in ESRIArcGIS. (solo set di dati tabulari) Grazie a Jan Mason, Jeff de La Beaujardiere, eNOAAIOOSSOSprogetto.
    * Miglioramento della GUI[Categorizzare](https://coastwatch.pfeg.noaa.gov/erddap/categorize/index.html)pagine web. Inoltre, la categorizzazione dei valori (diversa dall'istituzione) sono ora tutte minuscole. Le richieste non richieste sono accettate (reindirizzato) per compatibilità all'indietro. Grazie a Roy Mendelssohn.
    * I messaggi di errore sono ora ancora più brevi e più orientati agli utenti. Grazie a Greg Williams.
    * Un cambiamento interno che riduce notevolmenteERDDAPL'uso della memoria di base.
    * Molte nuove caratteristiche che sono rilevanti solo per il progetto POST.
*    **CoseERDDAP™Gli amministratori devono sapere e fare:** Ci sono molti cambiamenti. Scusa. Ma ognuno porta dei benefici.
    * Grandi cambiamenti a GenerateDatasetXml -- ora fa spesso più domande (vedi il relativo[set di dati Tipi](/docs/server-admin/datasets#detailed-descriptions-of-dataset-types)informazioni) e ora genera sempre contenuto essenzialmente pronto all'uso perdatasets.xml. Sei ancora responsabile per la configurazione, quindi dovresti ancora rivedere ildatasets.xmlcontenuto prima di utilizzarlo. Un umano mettere lo sforzo nel progetto farà sempre meglio di un programma di computer. Grazie al progetto UAF.
    * REQUIRED: In setup.xml, è necessario rivedere ilWMSsezione. Dovrebbe ora includere questi tags (ma sentitevi liberi di cambiare i valori) :
```
        <!-- These default accessConstraints, fees, and keywords are used 
        by the SOS, WCS, and WMS services.
        They can be overridden by "accessConstraints", "fees", "keywords" 
        attributes in a dataset's global metadata.
        If a dataset that has an "accessibleTo" tag doesn't override 
        "accessConstraints", then the default for "accessConstraints" is the
        "accessRequiresAuthorization" value.  
        -->
        <accessConstraints>NONE</accessConstraints>
        <accessRequiresAuthorization>only accessible to authorized
        users</accessRequiresAuthorization>
        <fees>NONE</fees>
        <keywords>Earth science, oceans</keywords> 
        
        <!-- This appears on the erddap/legal.html web page after the 
        General Disclaimer. 
        You can replace any of the \\[standardParts\\] with your own HTML. -->
        <legal><!\\[CDATA\\[
        \\[standardDisclaimerOfEndorsement\\]
        \\[standardDisclaimerOfExternalLinks\\]
        \\[standardPrivacyPolicy\\]
        \\[standardDataLicenses\\]
        \\]\\]></legal>
        
        <!-- Specify the default units standard (e.g., "UDUNITS" 
        (the default) or "UCUM") that you (the ERDDAP™ admin) are using to 
        specify units.  The value is case-sensitive.
        This is used by ERDDAP's SOS server to determine if the units need to
        be converted to UCUM units for WMS and SOS GetCapabilities responses. 
        -->
        <units\\_standard>UDUNITS</units\\_standard>
        
        <!-- For the wms examples, pick one of your grid datasets that has
        longitude and latitude axes.
        The sample variable must be a variable in the sample grid dataset.
        The bounding box values are minx,miny,maxx,maxy.
        -->
        <wmsSampleDatasetID>erdBAssta5day</wmsSampleDatasetID>
        <wmsSampleVariable>sst</wmsSampleVariable>
        <!-- The bounding box values are 
           minLongitude,minLatitude,maxLongitude,maxLatitude.
           Longitude values within -180 to 180, or 0 to 360, are now okay. -->
        <wmsSampleBBox>0,-75,360,75</wmsSampleBBox>
```

    * REQUIRED: In setup.xml, copia e incolla questo nuovo suggerito&lt;startHeadHtml&gt; per sostituire la tua vecchia versione. Ma sentitevi liberi di apportare modifiche alle vostre preferenze.
```
        <!-- startHeadHtml has the start of the HTML document and the 
        'head' tags (starting at "<!DOCTYPE>", but not including 
        "</head>") for all HTML web pages. 
        This may include &erddapUrl;, which is expanded to be 
          \\[baseUrl\\]/erddap (or \\[baseUttpsUrl\\]/erddap if the user is logged in).
        If your ERDDAP™ allows users to log in, all referenced image files, 
          css files, etc. must be in \\[tomcat\\]/content/erddap/images or a 
          subdirectory and must be referenced here with 
          &erddapUrl;/images/\\[fileName\\].
        
        favicon.ico is the image that browsers associate with your website.
        For more information, see https://en.wikipedia.org/wiki/Favicon .
        You can use your own favicon.ico file by putting it in 
          \\[tomcat\\]/content/erddap/images. 
        
        \\*\\*\\* Optional: you can change the appearance of all of your 
        ERDDAP's HTML pages by changing the CSS <style> settings below.
        
        For an example of a very different style, change the import reference
        to <tomcat>/content/erddap/images/erddapAlt.css
        
        \\*\\*\\* If your CSS style includes links to files (e.g., images), that 
        style information must be inline in the style tag below, after the
        'import' line, not in the .css file.  
        Put all of the (e.g., image) files in the 
        \\[tomcat\\]/content/erddap/images directory (or a subdirectory) and 
        reference them below starting with &erddapUrl;.
        Why? On ERDDAP™ https: web pages, \\*all\\* links should use "https:" 
        (not "http:"); otherwise, most browsers consider the web page not 
        fully secure.  Because ERDDAP™ would use the same .css file for 
        http: and https: web pages, the links within the .css file wouldn't 
        switch between http: and https:.  There doesn't seem to be a way 
        around this other than using inline style information.
        -->
        <startHeadHtml><!\\[CDATA\\[ 
        <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
          "http://www.w3.org/TR/html4/loose.dtd">
        <html>
        <head>
        <title>ERDDAP</title>
        <link rel="shortcut icon" href="&erddapUrl;/images/favicon.ico">
        <style type="text/css">
        <!--
          @import "&erddapUrl;/images/erddap.css";
        -->
        </style>
        \\]\\]></startHeadHtml>
        
        <!-- The tableCommonBGColor MUST be the same color as the 
           table.commonBGColor in erddap.css above. Suggested is #f1ecd8. 
           But if you use erddapAlt.css, change this to #e7dec5. -->
        <tableCommonBGColor>#f1ecd8</tableCommonBGColor>
        
        <!-- This is used, e.g., for the type=variable rows on the metadata
          info tables. -->
        <tableHighlightBGColor>#cceecc</tableHighlightBGColor>
```

Grazie a POST, Hans Vedo e Rick Blair.
    * REQUIRED: In setup.xml, in&lt;startBodyHtml&gt;, cambiare il&lt;tag body&gt; essere solo&lt;body&gt;, dal momento che lo stile è ora impostato da erddap.css.
    * REQUIRED: In setup.xml, cambiare a questo&lt;endBodyHtml (ma cambia l'indirizzo e-mail al tuo indirizzo e-mail e sentiti libero di apportare altre modifiche) :
```
        <!-- The end of the body of the HTML code for all HTML web pages
          (with "</body>" at the end). 
        This may include &erddapUrl;, which is expanded to be 
          \\[baseUrl\\]/erddap (or \\[baseUttpsUrl\\]/erddap if the user is logged in).
        If your ERDDAP™ allows users to log in, all referenced image files, etc. 
          must be in \\[tomcat\\]/content/erddap/images or a subdirectory
          and must be referenced here with &erddapUrl;/images/\\[fileName\\].
        
        You can change this, but please keep "ERDDAP, Version &erddapVersion;"
        and these references to the Disclaimers and Privacy Policy. -->
        <endBodyHtml><!\\[CDATA\\[ 
        <br>&nbsp;
        <hr>
        ERDDAP, Version &erddapVersion;
        <br><font class="subduedColor">Questions, comments, 
          suggestions?  Please send an email to 
          <tt>erd dot data at noaa dot gov</tt>
        <br>and include the ERDDAP™ URL directly related to your question
          or comment.
        <br>
          <a href="&erddapUrl;/legal.html">Disclaimers</a> | 
          <a href="&erddapUrl;/legal.html#privacyPolicy">Privacy 
            Policy</a>
        </font>
        </body>
        \\]\\]></endBodyHtml>
```

    * RACCOMANDATO: In setup.xml, il consigliato&lt;il breve descrizioneHtml&gt; è ora
```
        <theShortDescriptionHtml><!\\[CDATA\\[ 
        <h1>ERDDAP</h1>
        This website (the Environmental Research Division's Data Access 
        Program) aggregates scientific data from diverse local and remote 
        sources and offers you a simple, consistent way to download subsets 
        of the data in common file formats and make graphs and maps.
        This particular ERDDAP™ installation has oceanographic data
        (for example, data from satellites and buoys).
        
        \\[standardShortDescriptionHtml\\]
        \\]\\]></theShortDescriptionHtml>
```

Non esitate a modificarlo, in particolare l'ultima frase del primo comma.
    * In setup.xml, emailEverythingTo e emailDailyReport Per ora può essere elenco separato da virgola di indirizzi e-mail. La prima email Tutto Per esempio, gli abbonamenti a EDDXxxxFromErddap usano quell'indirizzo e-mail. Grazie a John Maurer.
    * Gli errori e-mail sono ora registrati\\[BigParentDirectory\\]/logs/emailLogYYYY-MM-DD.txt file.
    * In setup.xml, c'è un nuovo parametro opzionale per impostare le proprietà dell'account e-mail (di solito subito dopo&lt;emailPassword&gt;:
```
          <emailProperties>_propertyName1_|_propertyValue1_|_propertyName2_| _propertyValue2_|...</emailProperties>  
        For example, gmail accounts need  
          <emailProperties>mail.smtp.starttls.enable|true</emailProperties>  
```

Il default non è niente. Grazie a Rich Signell.
    * REQUIRED: Se si utilizza EDDTableCopy oEDDGridCopia, devi eliminare tutto\\[BigParentDirectory\\]/copia/ directory e file che contengono "xh" nella directory o filename dopo aver fermato il vecchioERDDAP™e prima di iniziare il nuovoERDDAP™così quei file saranno ri-copied. Mi dispiace molto, ma è stato importante fare il cambiamento e, spero, colpisce pochi amministratori e pochi file.
In Linux, puoi trovare questi file con, cd\\[BigParentDirectory\\]/copia
trovare.\\*#\\*  
In Windows, è possibile trovare questi file con, Start|Ricerca
Cosa vuoi cercare: Documenti
Tutto o parte del nome del file: xh
Guarda in: Sfoglia - &gt;\\[BigParentDirectory\\]/copia
Clicca su 'Search'
^A per selezionarli tutti
Del per cancellarli tutti
    * REQUIRED: Indatasets.xml, per EDDTableFromDatabase datasets, per le variabili date e timestamp, cambiare i dati Tipo a doppio e le unità a secondi dal 1970-01-01T00:00:00Z. Noi REQUIRE che memorizzate i dati timestamp nel database\\*con\\*un fuso orario. Senza informazioni sul fuso orario, le query cheERDDAP™invia al database e i risultati cheERDDAP™ottiene dal database tramite JDBC sono ambigui e sono probabilmente sbagliati. Abbiamo provato, ma non abbiamo trovato alcun modo affidabile per affrontare i dati "timestamp senza timezone". Pensiamo che questa sia una buona pratica. Dopotutto, i dati "timestamp senza timezone" hanno un fuso orario implicito. Mentre è grande che il fuso orario è evidente per l'amministratore del database, ha senso specificarlo esplicitamente in modo che altri software possano interagire correttamente con il database. Grazie/mi dispiace Michael Urzen.
    * RISPARMIO SUPERIORE: Indatasets.xml, per abilitare le pagine web .subset per la ricerca sfaccettata dei tuoi set di dati tabulari, è necessario aggiungere [&lt;subsetVariables&gt; (/docs/server-admin/datasets#subsetvariables) agli attributi globali del dataset.
    * RACCOMANDATO: Indatasets.xml, se hai il dataset condatasetID= "pmelGtsppp", si prega di cambiarlo per essere
```
          <dataset type="EDDTableFromDapSequence" datasetID="pmelGtsppp" active="false">  
        Whether or not you had that dataset, feel free to add this new GTSPP dataset:  
          <dataset type="EDDTableFromErddap" datasetID="erdGtsppBest">  
            <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGtsppBest</sourceUrl>  
          </dataset>
```
    * RACCOMANDATO: Indatasets.xml, ci sono nuove opzioni valide per il [&lt;cdm\\_data\\_type&gt;] (/docs/server-admin/datasets#cdm_data_type) attributo globale, quindi è necessario rivedere / modificare il valore per i tuoi set di dati.
    * Indatasets.xml, il nuovo [&lt;fonteNeedsExpandedFP\\_EQ&gt;] (/docs/server-admin/datasets#sourceneedsexpandedfp_eq) è utile se il server sorgente non gestisce costantemente &_variable_\\=_value_ test correttamente (a causa della[difficoltà generale di testare l'uguaglianza dei numeri di punti fluttuanti](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/)) . fonteNeedsExpandedFP\\_EQ è impostato su true per default (l'impostazione più sicura) , quindi non è necessario apportare modifiche.
    * Nuovo[EDDTableFromAsciiFiles](/docs/server-admin/datasets#eddtablefromasciifiles). Grazie a Jerry Yun Pan.
    * Nuovo[EDDTableFromThreddsFiles](/docs/server-admin/datasets#eddtablefromthreddsfiles). Grazie a Roy Mendelssohn.
    * Modifiche a[EDDTableFromNcFiles](/docs/server-admin/datasets#eddtablefromncfiles)consente di essere utilizzato con una vasta gamma di file.
    * EDDTableFromBMDE è stato disabilitato. Non ci sono più fonti di dati attive, appropriate.
    * In GenerateDatasetXml, il nuovoEDDGridDa tre Catalogo raccoglie un intero catalogo THREDDS (o un sottoinsieme) e generadatasets.xmlcontenuto. Grazie al progetto UAF.
    * Genera i dati Xml e DasDds ora anche mettere i loro risultati in\\[BigParentDirectory\\]/logs/log.txt. Grazie a Rich Signell e Charles Carleton.
    * Molti miglioramenti al sistema di login. Grazie a POST.
*    **CoseERDDAP™Programmatori È necessario sapere e fare:** 
    * Ci sono state modifiche nella directory /WEB-INF/lib/. Si prega di cambiare le impostazioni di javac e java classpath di conseguenza.
    * C'è un nuovo\\[il tuo Ur\\]/erddap / servizio di conversione per determinare la versione di unERDDAP. La risposta è il testo, ad esempio,ERDDAPTraduzione: Se si ottiene un messaggio di errore HTTP 404 Non-Found, trattareERDDAP™come versione 1.22 o inferiore. Grazie a POST.
*    **Piccoli cambiamenti e correzioni di bug:** 
    
    * EDDTEDD Cambiamenti di sos:
        * Supporto per la lettura di IOOSSOSRisposte XML.
        * Aggiunto supporto per la lettura IOOSSOStesto/csv. (Così NOSSOSserver attualmente non sono supportati.) 
        * Ho fatto un sacco di modifiche relative a IOOSSOSdettagli del server.
        * Aggiunto il supporto per le domande BBOX per IOOSSOSeOOSTethys SOSserver. Questi cambiamenti comportano una grande velocità per richieste di dati rilevanti. Grazie a IOOSSOS.
    * Testo in.mati file di dati tabular sono ora salvati correttamente. Grazie a Roy Mendelssohn.
    *   WMS
        *   OpenLayersè ora in bundle conERDDAP™per l'usoWMSpagine web. Questo risolve il problema causato quandoOpenLayerscambiato alcuni mesi fa e previene i problemi futuri.
        * NelWMS GetCapabilitiesrisposta,&lt;Risorse on line &gt; valore è ora l'URL delWMSservizio. Grazie a Charlton Galvarino.
        * Una leggenda viene mostrataWMSpagina web per mostrare la barra dei colori. Grazie a Emilio Mayorga.
    *   EDDGridAggregateExistingDimension Buildor ha avuto problemi se una fonte di asse I valori non erano uguali alla loro destinazione Valori, ad esempio, se il tempo di origine era qualcosa di diverso da quello"seconds since 1970-01-01". Grazie aToddSpindler.
    * In TableWriterGeoJson, l'eccesso ',' dopo bbox\\[...\\]è stato rimosso. Grazie a Greg Williams.
    * Molti piccoli cambiamenti e correzioni di bug.
    
## Versione 1.22{#version-122} 
 (rilasciato 2009-07-05) 

* Il bug SlideSorter introdotto in 1.20 è fisso.
* Il bug OBIS introdotto in 1.20 è fisso.
* I riferimenti a Jason datasets sulla pagina immagini/gadgets/GoogleGadgets sono stati rimossi.
     
## Versione 1.20{#version-120} 
 (rilasciato 2009-07-02) 

*   ERDDAP™amministratori, aggiungi questo al file setup.xml:
```
    <!-- If you want to restrict access to some datasets, you need to 
    specify the method used for logging on (authentication). See the info 
    at https://erddap.github.io/setup.html#security
    Currently, the options are: "" (logins not supported, the default),
    "custom", "openid". Note that openid login doesn't work when testing 
    with localhost (https://127.0.0.1:8443).
    -->
    <authentication></authentication>
    
    <!-- This specifies how you have stored passwords in the roles tags 
    in datasets.xml. If you aren't storing any passwords this is irrelevant.
    The options (in order of increasing security) are: "plaintext", "MD5", 
    or "UEPMD5" (MD5(UserName:ERDDAP:Password), the default).
    You should only use "plaintext" or "MD5" if you need to match values 
    stored that way in an external password database.  See the info at
    https://erddap.github.io/setup.html#security
    -->
    <passwordEncoding>UEPMD5</passwordEncoding>
    
    <!-- This determines whether datasets that the user doesn't currently
    have access to (because he isn't logged in or because his roles don't
    allow access) should be shown on lists of data sets 
    (e.g., from full text search, categorize, view all datasets, ...).
    The options are: "true", or "false" (the default).
    If false, no information about the dataset (even its existence) is 
      shown to users who don't have access to it.
    If true, some information about the dataset (title, summary, etc) is
      shown to users who don't have access to it.  
      If the user clicks on a link to a dataset he doesn't have access to,
      he will get an error message and be prompted to log in.
    -->
    <listPrivateDatasets>false</listPrivateDatasets>
    
    <!-- If the number of requests between two runs of LoadDatasets 
    exceeds unusualActivity, an email is sent to emailEverythingTo.
    The default is 10000.
    -->
    <unusualActivity>10000</unusualActivity>
```

* Nuovi tipi di dataset[EDDGridCopia](/docs/server-admin/datasets#eddgridcopy)e[EDDTableCopy](/docs/server-admin/datasets#eddtablecopy)fare e mantenere una copia locale di un altroEDDGrido dati EDDTable dataset e servire i dati dalla copia locale. Questi sono molto facili da usare e molto efficaci **soluzioni ad alcuni dei maggiori problemi con il servizio di dati da fonti remote:** 
    
    * L'accesso ai dati da una fonte di dati remota può essere lento (per una varietà di motivi) .
    * Il set di dati remoto a volte non è disponibile (di nuovo, per una varietà di motivi) .
    * Affidarsi a una fonte per i dati non scala bene (ad esempio, quando molti utenti e moltiERDDAPs utilizzarlo) .
    
Inoltre, la copia locale è un backup dell'originale, che è utile nel caso in cui qualcosa accada all'originale.
    
Non c'è niente di nuovo nel fare una copia locale di un set di dati. Ciò che è nuovo qui è che queste classi lo rendono\\*facile\\*creare e creare\\*mantenere\\*una copia locale dei dati da una\\*varietà\\*di tipi di fonti di dati remote e\\*aggiungi metadati\\*durante la copia dei dati.
    
Questi tipi di dataset fanno parte di un insieme completo di funzionalità che semplificano la creazione di[reti/clusters/federazioni diERDDAP#](/docs/server-admin/scaling)per gestire carichi molto pesanti (ad esempio, in un data center) .
    
* Nuovo tipo di dataset[EDDTableDatabase](/docs/server-admin/datasets#eddtablefromdatabase)ottiene i dati da una tabella di database locale o remoto.
*   ERDDAP™ora ha[sicurezza](/docs/server-admin/additional-information#security)sistema che supporta l'autenticazione (consentire agli utenti di accedere) e autorizzazione (garantire loro l'accesso a determinati set di dati privati) .
* Ci sono[due, nuovi, strumenti di riga di comando](/docs/server-admin/datasets#tools)per aiutareERDDAP™gli amministratori generano l'XML per un nuovo set di datidatasets.xml:
    * Genera i dati Xml può generare una bozza approssimativa del dataset XML per quasi qualsiasi tipo di dataset.
    * DasDds ti aiuta a testare ripetutamente e affinare l'XML per un set di dati.ERDDAPGenera i dati Le pagine web Xml sono state rimosse. Per motivi di sicurezza, hanno supportato solo alcuni tipi di dataset. I nuovi strumenti di riga di comando sono una soluzione migliore.
* Il nuovo[pagina di stato](/docs/server-admin/additional-information#status-page)lascia a chiunque (ma soprattutto amministratori) vista lo stato di unERDDAP™da qualsiasi browser andando a\\[di base\\]/erddap/status.html.
* Tabledap ora supporta[funzioni lato server](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#functions):
    * &gt; () rimuove le righe duplicate dalla tabella di risposta,
    * &gt;orderBy (...) consente di specificare come la tabella di risposta dovrebbe essere ordinata,
    * &gt;orderByMax (...) consente di specificare come la tabella di risposta deve essere ordinata e rimuove tutte le righe tranne che per le righe con i valori massimi nell'ultima colonna specificata. Questo può essere utilizzato, ad esempio, per ottenere gli ultimi dati disponibili per ogni stazione.
* I set di dati tabulari possono ora includere ulteriori variabili dateTime che non sono nominati"time". Queste variabili sono riconosciute dai loro metadati "unità", che devono contenere" since "  (per data numerica Times) o "yy" o "YY" (per la data di stringa formattataTimes) . Ma per favore usi ancoradestinationName "time"per la data principale Variabile temporale.
*   ERDDAP™ora genera un[sitemap.xml](/docs/server-admin/additional-information#sitemapxml)file, che dice motori di ricerca che il vostroERDDAPsolo deve essere strisciato ogni mese.ERDDAP™amministratori, seguire[queste istruzioni](/docs/server-admin/additional-information#sitemapxml)per informare i motori di ricerca sul nuovo file sitemap.xml.
*   ERDDAPI messaggi di errore sono ora molto più brevi e orientati ai clienti (non programmatori) . Grazie a Greg Williams.
* [&lt;richiestaBlacklist&gt; (/docs/server-admin/datasets#requestblacklist) ora supporta anche gli indirizzi IP in cui l'ultimo numero è stato sostituito da \\*.
* Richieste per.jsone i file .geoJson possono ora includere un optional[Traduzione:](https://niryariv.wordpress.com/2009/05/05/jsonp-quickly/)richiesta aggiungendo "&.jsonp=_functionName_" alla fine della query. Fondamentalmente, questo diceERDDAP™per aggiungere "_functionName_ (" all'inizio della risposta e ") " alla fine della risposta. Se originariamente non c'era nessuna domanda, lasciare la "&" nella tua query. Grazie a Greg Williams.
* Sono state aggiunte molte nuove statistiche[Rapporto giornaliero](/docs/server-admin/additional-information#daily-report).
* Nelle pagine web con liste di datasets, istituzione e id sono ora alla destra. Questo sposta l'abbonamento e altre colonne più utili in vista su schermi di computer stretti.
* Su tutte le pagine web, il titolo della pagina (basato su&lt;titolo &gt; nel&lt;startHeadHtml&gt; che definisci in setup.xml) viene modificato per includere una migliore descrizione della pagina web (ad esempio, includendo il titolo e l'istituzione dell'attuale dataset) .
* Le informazioni Xmx sono ora incluse con le informazioni di memoria stampate in log.txt, il Daily Report e su status.html. Grazie a Ellyn Montgomery.
*   ERDDAP™ha una protezione supplementare, generale contro tutti gli errori (ad esempio, OutOfMemoryError) . Grazie a Charles Carleton.
* Miglioramenti alla gestione degli errori se la risposta è già stata impegnata.
* MIGLIORATO: EDDTableFromFiles eEDDGridDa Files ora basta consentire&lt;metadatiDal primo o ultimo. penultimo non è più supportato. E prima e ultimo sono ora basati sull'ultimoModifiedTime dei file.
* Correzione di bug: in EDDTableFromSOS, informazioni invalide per una stazione ha lanciato un'eccezione e ha causato l'intero set di dati da respingere. Ora, quelle stazioni sono ignorate. (e il messaggio di errore è collegato a log.txt) . Grazie a Rick Blair.
     

## Versione 1.18{#version-118} 
 (rilasciato 2009-04-08) 

* Correzione di bug: A partire dal 1.14, il modulo di accesso dati EDDTable e fare una pagina web del grafico non ha affrontato correttamente i vincoli citati.
* Bug fix: A partire dal 1.14, EDDTableFromDapSequence non ha gestito correttamente i vincoli di tempo se le unità di tempo di origine non erano "secondi dal 1970-01-01T00:00:00".
     

## Versione 1.16{#version-116} 
 (rilasciato 2009-03-26) 

*   ERDDAP™amministratori:
    * Questa è una release importante perché fissa un bug che ha lasciato unERDDAP™thread running se hai usato Tomcat Manager per arrestare / avviare o ricaricareERDDAP. Così quando si installa 1.16, non usare solo Tomcat manager per svelare il vecchioERDDAP™e distribuire il nuovoERDDAP. Invece: **indeploy il vecchioERDDAP™, riavvia Tomcat (o il server) , poi distribuire il nuovoERDDAP.** È sempre una buona idea farlo quando si installa una nuova versione.
    * Si prega di aggiungere [&lt;richiestaBlacklist»&lt;/richiestaBlacklist&gt; (/docs/server-admin/datasets#requestblacklist) al tuodatasets.xml. Questo può essere utilizzato per specificare un elenco di indirizzi IP client da bloccare (ad esempio, per respingere un attacco di servizio o un robot web eccessivamente zelante) .
* C'è ora\\[BigParentDirectory\\]directory /logs per tenere premuto ilERDDAP™file di registro. Quando iniziERDDAP™, fa una copia di archivio del log.txt e log. txt.previous file con un timestamp. Se ci sono stati problemi prima del riavvio, potrebbe essere utile analizzare questi file.
*   ERD'ERDDAP™ora ha attivato il sistema di abbonamento.
*   ERDDAP™ancora una volta permette (ma ancora non raccomanda) la codifica "%26" di "&" in URL di richiesta (vedi il[relativo v1.14 cambiamento](#percent26)) .
* Varie nuove aggiunte alla sezione Tally del[Rapporto giornaliero](/docs/server-admin/additional-information#daily-report).
* Piccoli bug corretti in generareDatasetsXml.
* Qualche piccolo bug corregge.
     

## Versione 1.14{#version-114} 
 (rilasciato 2009-03-17) 

* Modifiche per gli utenti:
    * Nelle richieste di dati della rete,ERDDAP™ora supporta:[Last-n](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#last)dove n è un numero intero di indici e[ (Ultimo.) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#lastInParentheses)dove d è un valore numerico (per tempo, è in secondi) .
    * Nelle richieste di dati tabulari, i vincoli di stringa ora richiedono[doppie citazioni](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#QuoteStrings)intorno al valore, per esempio, &id="NDBC40121" Questo è richiesto dalDAPProtocollo.
    * Nelle richieste di dati tabulari,ERDDAP™ora richiede che[tutti i vincoli sono adeguatamente per cento codificato](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#PercentEncode). I browser lo fanno automaticamente, quindi questo colpisce principalmente i programmi/scrizioni del computer che stanno accedendoERDDAP.
#### Percentuale26{#percent26} 
*   [Negli episodi precedenti...](#percent26)il[embed una pagina web del grafico](https://coastwatch.pfeg.noaa.gov/erddap/images/embed.html)e il[ERDDAP™Pagina web di Google Gadget](https://coastwatch.pfeg.noaa.gov/erddap/images/gadgets/GoogleGadgets.html)ha detto di sostituire la "&" nell'URL dell'immagine con "%26". D'ora in poi, si dovrebbe sostituire la "&" nell'URL dell'immagine con "&amp;". Quindi è necessario sostituire qualsiasi "%26" nelle pagine web esistenti e Google Gadgets con "&amp;". (Scusa.) 
*   ERDDAP™amministratori, per favore:
    * Aggiungi il seguente al tuo[setup.xml](/docs/server-admin/deploy-install#setupxml)file (e cambiare la bandiera KeyKey valore) :
```
        <!-- ERDDAP™ has a service that lets remote users set a flag
        to notify ERDDAP™ to try to reload a dataset.
        These requests use a key which is generated based
        on baseUrl/warName, a datasetID, and flagKeyKey.
        \\*\\*\\* Change this once, to any text (a favorite quote? random text? 
        It doesn't matter). Normally, you won't ever change this again.
        But if you think someone is abusing the flag system,
        change this text again, restart ERDDAP™, and send
        all of the users of the flag system the relevant new flagKeys
        (see the list in the Daily Report). -->
        <flagKeyKey>A stitch in time saves nine. CHANGE THIS!!!</flagKeyKey>
        
        <!-- ERDDAP™ has an email/URL subscription system which sends a user
        an email or pings a url whenever a dataset of interest changes.
        (This is different from the RSS system, which is always active.)
        The system relies on the server being able to send out 
        emails to people to validate their subscription requests.
        The emails appear to come from the emailFromAddress below.
        So if your server can't send out emails, don't make this system active.
        You may choose (for whatever reason) to make this system active or not, 
        so valid values below are "true" (the default) and "false".
        Note that if you change this and restart ERDDAP™, the list of 
        subscriptions (in \\[bigParentDirectory\\]/subscriptionsV1.txt) isn't
        affected. See also the subscriptionEmailBlacklist in datasets.xml.
        -->
        <subscriptionSystemActive>true</subscriptionSystemActive>  
```

    * Sulla linea dopo&lt;emailUserName&gt; nel tuo[setup.xml](/docs/server-admin/deploy-install#setupxml)file, aggiungere
```
        <emailPassword>_myPassword_</emailPassword> <!-- optional; if absent, emails can't be sent to non-local addresses -->  
```
e inserire la password reale.
    * Puoi cambiare&lt;wmsSampleBBox&gt; nel tuo[setup.xml](/docs/server-admin/deploy-install#setupxml)file per includere valori di longitudine fino a 360, ad esempio,
```
        <!-- The bounding box values are 
           minLongitude,minLatitude,maxLongitude,maxLatitude.
           Longitude values within -180 to 180, or 0 to 360, are now okay. -->
        <wmsSampleBBox>0,-75,360,75</wmsSampleBBox>  
```

    * Nel tuodatasets.xmlfile, rinominare il tipo di dataset EDDTableFromNc4DFiles a EDDTableFromNcFiles (che ora supporta i file con qualsiasi numero di dimensioni) . Se hai un Dataset EDDTableFromNc4DFiles:
        
        1. Devi cambiare per digitare="EDDTableFromNcFiles" nei tuoi set di dati. File XML.
        2. È necessario aggiungere un&lt;NDimensioni&gt; 4&lt;/nDimensions&gt; tag al dataset XML.
        3. Puoi aggiungere il nuovo&lt;sortFilesBySourceNames&gt; tag per specificare l'ordine interno per i file, che determina l'ordine complessivo dei dati restituiti.
        
Per i dettagli, vedere[EDDTableFromFiles](/docs/server-admin/datasets#eddtablefromfiles).
    * In passato, per EDDTableFromDapSequence, perOPeNDAPServer DRDS, indatasets.xml# Abbiamo usato #&lt;fonteCanConstrainStringsRegex&gt;~=&lt;/sourceCanConstrainStringRegex&gt;. Ma ora vediamo che il supporto regex di DRDS è più limitato cheERDDAP's, quindi si consiglia&lt;fonteCanConstrainStringsRegex&gt;&lt;/sourceCanConstrainStringRegex&gt; in modo che i vincoli regex non siano passati alla fonte, ma sono invece gestiti daERDDAP.
    * Gestione revisionata della fonteCanConstrain... indatasets.xmldi[EDDTableFromDapSequenza](/docs/server-admin/datasets#eddtablefromdapsequence)e (internamente) tutti i tipi di dataset EDDTable. Il nuovo sistema è più semplice e riflette meglio la variabilità delle diverse fonti di dati. Potrebbe essere necessario modificare l'XML per i tuoi set di dati indatasets.xml.
* Ci sono diverse nuove caratteristiche che sono utili da soli, ma quando combinato, anche facilitare la creazione di[reti/clusters/federazioni diERDDAP#](/docs/server-admin/additional-information#grids-clusters-and-federations).
    * Nuovi tipi di dataset:
        *   [EDDGridDa Erddap](/docs/server-admin/datasets#eddfromerddap)e[EDDTableFromErddap](/docs/server-admin/datasets#eddfromerddap)che lascianoERDDAP™includere un set di dati da un altroERDDAP™in modo molto semplice e molto efficiente.
        *   [EDDGridDa Fili](/docs/server-admin/datasets#eddgridfromfiles)  (e la sua sottoclasse,[EDDGridDa NcFiles](/docs/server-admin/datasets#eddgridfromncfiles)che può leggereNetCDF .nc, GRIB .grb, eHDF .hdffile) .
        *   [EDDTableFromNcFiles](/docs/server-admin/datasets#eddtablefromncfiles)che può leggereNetCDF .ncche hanno una struttura simile al tavolo.
    * RunLoadDatasets e LoadDatasets sono stati rinnovati in modo cheERDDAP™è molto reattivo per ricaricare i set di dati in base ai file in[bandiera](/docs/server-admin/additional-information#flag)directory (spesso&lt;5 secondi se il carico principaleDatasets è attualmente fatto).
    * Nuovo servizio per consentire[un URL per creare un file di bandiera](/docs/server-admin/additional-information#set-dataset-flag)per un dato set di dati, ad esempio,
    ```
        https://coastwatch.pfeg.noaa.gov/erddap/setDatasetFlag.txt?datasetID=rPmelTao&flagKey=123456789  
    ```
crea un file di bandiera nella directory di bandiera per rPmelTao (anche se la bandiera La chiave qui è sbagliata) .
    * Nuovo[abbonamento](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions)servizio in modo che qualsiasi client possa specificare un'azione che verrà eseguita quando viene creato un dataset specifico (quandoERDDAP™è riavviata) e ogni volta che il dataset cambia in qualsiasi modo. Questo sistema può essere disabilitato tramite&lt;sottoscrizioneSystemActive&gt; nel vostro[setup.xml](/docs/server-admin/deploy-install#setupxml)file. TheERDDAP™ [Rapporto giornaliero](/docs/server-admin/additional-information#daily-report)ora elenca tutti gli abbonamenti e include l'URL necessario per annullare ciascuno, nel caso in cui si sente che il sistema viene abusato. Indatasets.xml, c'è un nuovo, opzionale [&lt;abbonamento EmailBlacklist&gt;] (/docs/server-admin/datasets#subscriptionemailblacklist) tag in modo che gli amministratori possono specificare un elenco separato da virgola di indirizzi e-mail che sono immediatamente blacklist dal sistema di abbonamento.
    * Nuovo&lt;) (/docs/server-admin/datasets#onchange) attributo indatasets.xmllascia cheERDDAP™amministratore specificare un'azione che verrà eseguita quando viene creato un set di dati specifico (quandoERDDAP™è riavviata) e ogni volta che il dataset cambia in qualsiasi modo.
    * Miglioramenti alla ricerca completa del testo: memorizzare la stringa di ricerca per ogni dataset ora utilizza 1/2 la memoria. L'algoritmo di ricerca (Boyer-Moore) è ora 3X più veloce.
    * Email daERDDAP™ora sempre prepend il soggetto e il contenuto con\\[Erddap Ur\\], in modo che sia chiaro cheERDDAP™questo è venuto da (nel caso in cui si amministra piùERDDAP#) .
    * Riunione statistica più estesa per[Rapporto giornaliero](/docs/server-admin/additional-information#daily-report)email.
    * Nuovo file di log\\[BigParentDirectory\\]/emailLogYEAR-MM-DD.txt registra tutte le e-mail inviate daERDDAP™Ogni giorno. Questo è particolarmente utile se il server non può effettivamente inviare e-mail -- è possibile almeno leggerli nel registro.
    *   ERDDAP™ora fa\\[BigParentDirectory\\]/cache/ (datasetID) directory per ogni dataset in quanto ci possono essere un sacco di file memorizzati nella cache.
* Nuovo[RSS2.01](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions)feed per ogni dataset (cerca l'aranciaRSSicone su elenchi di set di dati, moduli di accesso dati, e fare un grafico pagine web) .
*   EDDGrid .kmlrisposte ora utilizzare immagini piastrellate ("superoverlays" - immagini quadtree generate dinamicamente) . L'immagine iniziale carica in GoogleEarth molto più velocemente di prima. La risoluzione della mappa aumenta mentre si ingrandisce, fino alla risoluzione completa del dataset. Consiglia: gli utenti dovrebbero richiedere.kmlper un punto di tempo, ma l'intera longitudine del set di dati, la distanza di latitudine. Purtroppo, il supporto per intervalli di tempo è stato rimosso (Spero che tornerà) .
*   ERDDAP™ora aggiunge[Intestazioni di scarico e Cache-Control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)a tutti i file richiesti dalla directory /images. Questo riduce notevolmente il numero di richieste di file statici inviate aERDDAPe quindi accelera notevolmente la maggior parteERDDAP™Caricamento pagina. Anche, moltiJavaRiferimenti di file Script spostati in fondo alle loro pagine HTML, che accelera anche moltiERDDAP™Caricamento pagina. Grazie al libro "High Performance Web Sites" di Steve Souders e alla ySlow aggiunta al plugin FireBug in FireFox.
*   ERDDAP™passando da netcdf-java 2.2.22 a netcdf-java 4.0. Tra le altre cose, questo permetteEDDGridDaNcFiles per leggereHDF .hdf, così come GRIB .grb eNetCDF .ncfile.
*   EDDGridFromDap eEDDGridDaNcFiles ora supporta anche DArray (e DGrid)  dataVariableS. Se una dimensione non ha una variabile di coordinate corrispondente,ERDDAP™crea una variabile di asse con i valori dell'indice (ad esempio, 0, 1, 2, ..., 311, 312) . Quindi tutti gli altri aspettiEDDGridrimane lo stesso:
* Serve ancora tutti i dataset come Grids, con una variabile di asse per ogni dimensione.
* Le query possono ancora richiedere valori dalle variabili dell'asse.
Grazie a Charles Carleton, Thomas Im, Dorian Raymer e altri.
* TheWMS OpenLayersle pagine ora hanno una longitudine predefinita, gamma di latitudine che è un po 'più grande della gamma di dataset (non l'intervallo esatto, quindi il contesto di piccoli set di dati è più evidente) . L'intervallo predefinito può ora essere da 0 a 360, che consente l'intera gamma di molti set di dati da mostrare ora. Grazie aToddSpindler.
* Nuovi cursori su alcuni moduli di accesso dati e fare un grafico pagine web. Semplificano (greggio) specifica dei dati desiderati e offrire un buon feedback visivo.
* Una nuova opzione per&lt;Dataset &gt; tags indatasets.xml:[attivo="falso"](/docs/server-admin/datasets#active).
* RiferimentiERD'ERDDAP™cambiato da coastwatch.pfel (funziona ancora tramite proxy) a coastwatch.pfeg (preferito) .
* Nuovo supporto per[data\\_minedata\\_max](/docs/server-admin/datasets#data_min-and-data_max)attributi dei metadati variabili.
* Una soluzione parziale alla[WaitThenTryAgain / Eccezione dei risultati parziali](/docs/server-admin/additional-information#waitthentryagain-exception): Ora, alcune richieste che in precedenza hanno fallito quando è stato rilevato un cambiamento di fonte di dati avranno successo perchéERDDAP™ricaricare il dataset e riconquistare automaticamente i dati, il tutto nel contesto della richiesta originale.
* Correzione bug: generare Datasets Xml è stato disabilitato inERDDAP™versione 1.12. Grazie a Ellyn Montgomery per averlo fatto notare.
* Piccoli cambiamenti nella gestione degli errori.
* Molti miglioramenti da evitare/guadagnare con possibili condizioni di gara (i.e. possibili problemi derivanti dalla natura multi-threaded diERDDAP) che ha causato piccoli, problemi frequenti.
* Ora, se un messaggio di errore è scritto su un'immagine, l'immagine rimarrà solo nella cache per ~5-10 minuti (non 60) . Grazie a Cara Wilson.
* Il messaggio standard quando non ci sono dati è ora "La tua query non ha prodotto risultati corrispondenti.", che è più breve, più accurato e corrispondeOPeNDAPserver.
*   EDDGridnon consente più i valori dell'asse legato.
* Piccoli cambiamenti alle richieste .ver e .help.
* Molti piccoli cambiamenti e correzioni di bug.
     

## Versione 1.12{#version-112} 
 (rilasciato 2008-10-31) 

* EDDTEDDSOSancora una volta funziona con NDBCSOSe lavora con i nuovi NOSSOS.
* EDDTableFromBMDE ora richiedeERDDAP™admin per specificaredataVariableS.
*   EDDGridnon richiede più che lat e lon siano uniformemente distanziati per . trasparente Png o.kml. Grazie aToddSpindler.
* Qualche piccolo cambiamento.
     

## Versione 1.10{#version-110} 
 (rilasciato 2008-10-14) 

* Nuovi metadati "colorBar" per variabili di dati indatasets.xmldefinisce le impostazioni della barra dei colori di default per grafici e mappe. Vedi[maggiori informazioni](/docs/server-admin/datasets#color-bar-attributes). Questo è importante perché migliora notevolmente l'aspetto dei grafici e delle mappe predefinite prodotte da Make A Graph e perché i grafici e le mappe di default hanno ora una barra di colore coerente anche quando il client cambia il tempo richiesto o l'intervallo geografico. Inoltre, questo era necessario perWMS.
*   ERDDAP™ora serve la maggior parte dei dati della griglia tramite unWMSservizio. Questo è importante perché mostra che, oltre a ottenere dati da molti tipi di server di dati,ERDDAP™può distribuire i dati tramite diversi protocolli (DAP♪WMS, ... più in futuro) . Vedere la[documentazione del cliente](https://coastwatch.pfeg.noaa.gov/erddap/wms/documentation.html). O il[documentazione per gli amministratori](/docs/server-admin/datasets#wms). O[provarlo](https://coastwatch.pfeg.noaa.gov/erddap/wms/index.html).
* Nuovo sostegno ai valori di longitudine &gt;180 in.kmlfile.
* Nuovo cdm\\_data\\_type: Altro .
*   ERDDAP™ora supporta i dati di origine "booleana"Tipo. Vedi[maggiori informazioni](/docs/server-admin/datasets#boolean-data)Questo diventerà utile per il futuro EDDTableFromDatabase.
* Il nuovo EDDTableFromBMDE supporta le sorgenti di dati DiGIR/BMDE.
* EDVGridAxis consente ora di scendere i valori ordinati. I dataset pmelOscar avevano bisogno di questo.
*   ERDDAP™ora restituisce errori HTTP (ad esempio, "404 per risorsa/pagina non trovata") in più situazioni, invece di pagine HTML con messaggi di errore.
* Tanti cambiamenti/addizioniERDDAP™documentazione.
* Tanti piccoli cambiamenti.
* Qualche problema.
*    **CoseERDDAP™gli amministratori dovrebbero fare per aggiornare a questa versione:** 
    * Indatasets.xmlPer qualsiasi EDDTableDaSOSdatasets, modifica metadati "observedProperty" a "sourceObservedProperty".
    * Le regole per unaxisVariableodataVariable'destinationNamesono ora[rigoroso](/docs/server-admin/datasets#datavariable-addattributes). È necessario verificare che i nomi variabili siano validi. Controllateli a mano o correteERDDAP™e guardare i messaggi di errore nel report che viene inviato all'amministratore.
    * Indatasets.xml, se si desidera che una variabile di dati della griglia sia accessibile tramiteWMS, è necessario aggiungere metadati colorBar. Almeno, per esempio,&lt;#colorBarMinimum"tipo="doppio" &gt;0&lt;//
```
          <att name="colorBarMaximum" type="double">32</att>  
```
Vedi[maggiori informazioni](/docs/server-admin/datasets#wms).
    * Aggiungi il seguente al tuo[setup.xml](/docs/server-admin/deploy-install#setupxml)file (ma personalizzarlo con le tue informazioni) :

```
        <!-- drawLand specifies the default Make A Graph setting for 
        whether the landmask should be drawn "over" (the default) or "under" 
        surface data on maps. "over" is recommended for primarily 
        oceanographic data (so that grid data over land is obscured by the 
        landmask). "under" is recommended for all other data.
        -->
        <drawLand>over</drawLand>  
        
        <!-- Information about the ERDDAP™ administrator is used for the 
        SOS and WMS servers. You MUST CHANGE these to describe your 
        installation. 
        -->
        <adminInstitution>NOAA Environmental Research 
        Division</adminInstitution>
        <adminIndividualName>Your Name</adminIndividualName>
        <adminPosition>Webmaster</adminPosition>
        <adminPhone>your-phone-number</adminPhone>
        <adminAddress>99 Pacific St, Suite 255A</adminAddress>
        <adminCity>Monterey</adminCity>
        <adminStateOrProvince>CA</adminStateOrProvince>
        <adminPostalCode>93940</adminPostalCode>
        <adminCountry>USA</adminCountry>
        <adminEmail>yourName@yourSite</adminEmail>
        
        <!-- Information about the ERDDAP™ administrator is used for ERDDAP's
        SOS server. You MUST CHANGE these to describe your installation. 
        -->
        <sosTitle>NOAA Environmental Research Division SOS</sosTitle>
        <sosAbstract>NOAA Environmental Research Division's ERDDAP™ makes 
          data from multiple sources available via the SOS 
          protocol.</sosAbstract>
        <sosKeywords>Weather, Ocean Currents, Temperature, 
          Salinity</sosKeywords>
        <sosAccessConstraints>NONE</sosAccessConstraints>
        <sosFees>NONE</sosFees>
        
        <!-- Information about the ERDDAP™ administrator is used for 
        ERDDAP's WMS server. You MUST CHANGE these to describe your 
        installation. -->
        <wmsTitle>NOAA Environmental Research Division 
        WMS</wmsTitle>
        <wmsAbstract>NOAA Environmental Research Division's ERDDAP™ makes
        data from multiple sources available via the WMS 
        protocol.</wmsAbstract>
        <wmsKeywords>Weather, Ocean Currents, Temperature, 
          Salinity</wmsKeywords> 
        <wmsAccessConstraints>NONE</wmsAccessConstraints>
        <wmsFees>NONE</wmsFees>
        <!-- For the wms examples, pick one of your grid datasets that has 
        longitude and latitude axes. The sample variable must be a variable 
        in the sample grid dataset.  The bounding box values are 
        minx,miny,maxx,maxy.
        -->
        <wmsSampleDatasetID>erdBAssta5day</wmsSampleDatasetID>
        <wmsSampleVariable>sst</wmsSampleVariable>
        <wmsSampleBBox>0,-75,180,75</wmsSampleBBox>
```

## Versione 1.08{#version-108} 
 (pubblicato 2008-07-13) 

* Un nuovo servizio web inERDDAP™, generare Datasets Xml, assistentiERDDAP™amministratori creando una bozza approssimativa dell'XML necessario per descrivere un set di dati indatasets.xml
* Alcune modifiche/bug correzioni relative a consentire la visualizzazione di netcdf-java come server opendap, tra cui: i metadati globali sono ora etichettati "NC\\_GLOBAL" (invece di "GLOBAL") .
* TheEDDGride i moduli di accesso dati EDDTable ora utilizzano le informazioni di query nell'URL. Così, ad esempio, se un utente va da un modulo Make A Graph a un modulo di accesso dati, i vincoli sono ora correttamente trasferiti.
*   tabledap's Make A Graph ora permette vincoli sulle variabili di stringa.
* EDDTable's Make A Graph ora permette vincoli NaN. Grazie a Steve Hankin.
* Correzione di bug: EDDTable save AsImage non ha riconosciuto correttamente i valori .colorbar min e max. Grazie a Steve Hankin
* Molti miglioramenti per configurareDatasetsXml. Grazie a Ellyn Montgomery.
* Le richieste di Griddap ora permettono () - richieste di stile leggermente al di fuori della gamma asse reale. Questo è appropriato poiché () -i valori sono arrotondati al valore reale più vicino. Grazie a Cindy Bessey
* Ho fatto il test di FloatArray e DoubleArray di EvenlySpaced più sofisticato. Sarà sempre imperfetto (perché il test dovrebbe essere personalizzato per ogni set di dati) Ma dovrebbe essere meglio. Grazie a Ellyn Montgomery.
* Ho spostato setup.html e setupDatasets Xml.html erddap's /download directory e hard codificato tutti i link ad essi. Ora, posso apportare modifiche e aggiornare immediatamente le informazioni di configurazione.
* Molti piccoli cambiamenti. Qualche piccolo bug corregge.
*    **CoseERDDAP™gli amministratori dovrebbero fare per aggiornare a questa versione:** 
    * Muovetevi&#33;&lt;la descrizione breve Html&gt; dai tuoi messaggi.xml al tuo[setup.xml](/docs/server-admin/deploy-install#setupxml)file. Specifica il testo che appare al centro del lato sinistro delERDDAP™home page. Inoltre, aggiungere&lt;*ERDDAP&lt;* (o qualche altro titolo) in cima. **O...** copia&lt;ilShortDescriptionHtml&gt; nel nuovo[setup.xml](/docs/server-admin/deploy-install#setupxml)file (dal nuovo erddapContent.zip) nel tuo setup.xml.
         

## Versione 1.06{#version-106} 
 (rilasciato 2008-06-20) 

* Nuovo supporto perIOOS DIF SOSfonti di dati.
* Molti piccoli cambiamenti. Qualche piccolo bug corregge.
     

## Versione 1.04{#version-104} 
 (rilasciato 2008-06-10) 

* Nuova funzione Slide Sorter.
* Nuova pagina ed esempi di Google Gadgets.
* Correzione di bugEDDGrid.saveAsNc per variabile con scala e addOffset.
     

## Versione 1.02{#version-102} 
 (rilasciato 2008-05-26) 

* NuovoEDDGridSideBySide permette diverseaxisVariable#\\[0\\]fonte Valori.
* Tutte le correnti e i dataset dei venti sono stati fusi inEDDGridDataset SideBySide.
* Le immagini delle richieste di immagini sono ora memorizzate nella cache per 1 ora.
     

## Versione 1.00{#version-100} 
 (rilasciato 2008-05-06) 

* Creare pagine web Graph e comandi grafici in URL.
* Supporto per i file di bandiera per forza di ricaricare un set di dati.
* Nuovo tipo di dataset: EDDTableFrom4DFiles (la prima sottoclasse di EDDTableFromFiles) .
