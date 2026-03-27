# Bandiere della caratteristica

Questa pagina documenta le bandiere di configurazione disponibili nel sistema. Queste bandiere controllano varie funzioni, capacità sperimentali e comportamenti legacy.

##  **Legenda del ciclo di vita della bandiera** 

*  **Stabile:** Destinato come bandiere a lungo termine per consentire agli amministratori di cambiare funzionalità. Sicuro per la produzione.
*  **Prova:** Caratteristiche che sono pronti per il test. Questi saranno laureati in "Stable" o eventualmente essere impostato al loro valore di destinazione e hanno rimosso la bandiera.
*  **In costruzione:** Attualmente hardcoded a false nel codice, indipendentemente dalla configurazione. La funzione non è ancora pronta per l'uso.

##  **🚀 Ottimizzazione dei test** 

Queste sono bandiere che potrebbero essere rimosse in futuro.

###  **toccare il solo quando esso** 

Descrizione
Bandiera di ottimizzazione. Se è vero, il thread touch viene eseguito solo quando ci sono elementi da elaborare.

 | Proprietà | Dettagli | 
 | --- | --- | 
 |   **Ciclo di vita**   | Testing | 
 |   **Corrente di default**   | vero | 
 |   **Obiettivo a lungo termine**   | vero | 
 |   **Storia**   | Aggiunto in 2.29.0 | 

###  **taskCacheClear** 

Descrizione
Consente l'attività di sfondo che cancella gli elementi scaduti dalla cache.

 | Proprietà | Dettagli | 
 | --- | --- | 
 |   **Ciclo di vita**   | Stabile | 
 |   **Corrente di default**   | vero | 
 |   **Obiettivo a lungo termine**   | vero | 
 |   **Storia**   | Aggiunto in 2.27.0 | 

###  **NcHeaderMakeFile** 

Descrizione
Se vero il server genererà l'intero file nc prima di creare il risultato ncheader. Il nuovo (preferito) comportamento quando falso è quello di generare direttamente il risultato ncheader.

 | Proprietà | Dettagli | 
 | --- | --- | 
 |   **Ciclo di vita**   | Testing | 
 |   **Corrente di default**   | falso | 
 |   **Obiettivo a lungo termine**   | falso | 
 |   **Storia**   | Aggiunto in 2.29.0 | 

###  **usoEddReflection** 

Descrizione
Consente l'uso di Java Riflessione su EDD istantaneo ( ERDDAP Dataset) classi.

 | Proprietà | Dettagli | 
 | --- | --- | 
 |   **Ciclo di vita**   | Testing | 
 |   **Corrente di default**   | vero | 
 |   **Obiettivo a lungo termine**   | vero | 
 |   **Storia**   | Default cambiato in true in 2.28.0, aggiunto in 2.25 | 

###  **backgroundCreateSubsetTavole** 

Descrizione
Consente di creare tabelle sottoset in filetti di sfondo per migliorare il tempo di caricamento dei set di dati.

 | Proprietà | Dettagli | 
 | --- | --- | 
 |   **Ciclo di vita**   | Testing | 
 |   **Corrente di default**   | vero | 
 |   **Obiettivo a lungo termine**   | vero | 
 |   **Storia**   | Aggiunto in 2.29.0 | 

###  **utilizzareNcMetadataForFileTable** 

Descrizione
Usi NetCDF metadati per popolare la visualizzazione della tabella dei file. In particolare se un file nc include l'effettivo_range per ogni variabile, il caricamento del set di dati può saltare la lettura dell'intero file.

 | Proprietà | Dettagli | 
 | --- | --- | 
 |   **Ciclo di vita**   | Stabile | 
 |   **Corrente di default**   | vero | 
 |   **Obiettivo a lungo termine**   | vero | 
 |   **Storia**   | Aggiunto in 2.29.0 | 

##  **🛠 System & Core Behavior** 

###  **email IsActive** 

Descrizione
Controlla se il sistema tenta di inviare e-mail effettive (ad es., per aggiornamenti o report di errore di abbonamento) tramite il server SMTP configurato.

 | Proprietà | Dettagli | 
 | --- | --- | 
 |   **Ciclo di vita**   | Stabile | 
 |   **Corrente di default**   | falso | 
 |   **Obiettivo a lungo termine**   | vero (Dipendente da admin config)   | 
 |   **Storia**   | Legacy | 

:::info Logic
Questa bandiera è calcolata dinamicamente all'avvio. Si predefinisce per falso a meno che tutte le credenziali SMTP richieste (host, porta, utente, password, indirizzo) sono rigorosamente forniti in setup.xml.
:::

###  **showLoadErrorsOnStatusPage** 

Descrizione
Determina se gli errori di carico del set di dati dettagliati vengono visualizzati pubblicamente nella pagina di stato.

 | Proprietà | Dettagli | 
 | --- | --- | 
 |   **Ciclo di vita**   | Stabile | 
 |   **Corrente di default**   | vero | 
 |   **Obiettivo a lungo termine**   | impostato come desiderato | 
 |   **Storia**   | Aggiunto in 2.25 | 

###  **defaultAccessibleViaFiles** 

Descrizione
Imposta il comportamento predefinito se i file sottostanti di un set di dati possono essere accessibili nel servizio file.

 | Proprietà | Dettagli | 
 | --- | --- | 
 |   **Ciclo di vita**   | Stabile | 
 |   **Corrente di default**   | falso | 
 |   **Obiettivo a lungo termine**   | falso | 
 |   **Storia**   | Aggiunto in 2.10 | 

##  **Datasets** 

###  **avvio rapido** 

Descrizione
Se abilitato, il sistema tenta di avviare più velocemente saltando alcuni controlli di convalida profonda sui set di dati durante l'inizializzazione.

 | Proprietà | Dettagli | 
 | --- | --- | 
 |   **Ciclo di vita**   | Stabile | 
 |   **Corrente di default**   | vero | 
 |   **Obiettivo a lungo termine**   | vero | 
 |   **Storia**   | Aggiunto in 1.38 | 

###  **abilitareEnvParsing** 

Descrizione
Consente il trattamento datasets.xml file con [StringSubstitutore](https://commons.apache.org/proper/commons-text/apidocs/org/apache/commons/text/StringSubstitutor.html) . Questo ha molti usi, tra cui l'impostazione dei valori privati (come password) utilizzando variabili di ambiente.

 | Proprietà | Dettagli | 
 | --- | --- | 
 |   **Ciclo di vita**   | Stabile | 
 |   **Corrente di default**   | vero | 
 |   **Obiettivo a lungo termine**   | impostato come desiderato | 
 |   **Storia**   | Aggiunto in 2.29.0 | 

###  **usoSaxParser** 

Descrizione
Interruttore del motore di parsing XML interno per utilizzare un SAX (API semplice per XML) parser invece del parser DOM. Questo consente alcune nuove funzionalità avanzate come XInclude, e [attributi di visualizzazione personalizzati](https://erddap.github.io/docs/server-admin/display-info?_highlight=usesaxparser#usage-instructions) .

 | Proprietà | Dettagli | 
 | --- | --- | 
 |   **Ciclo di vita**   | Testing | 
 |   **Corrente di default**   | falso | 
 |   **Obiettivo a lungo termine**   | vero | 
 |   **Storia**   | Aggiunto in 2.25 | 

###  **elencoPrivateDatasets** 

Descrizione
Determina se vengono impostati i dati privati (quelli che richiedono l'autenticazione) appaiono nell'elenco dei dati principali.

 | Proprietà | Dettagli | 
 | --- | --- | 
 |   **Ciclo di vita**   | Stabile | 
 |   **Corrente di default**   | falso | 
 |   **Obiettivo a lungo termine**   | falso | 
 |   **Storia**   | Aggiunto in 1.20 | 

###  **politicoBoundariesAzione** 

Descrizione
Controllo se i confini politici possono essere tracciati sulle mappe.

 | Proprietà | Dettagli | 
 | --- | --- | 
 |   **Ciclo di vita**   | Stabile | 
 |   **Corrente di default**   | vero | 
 |   **Obiettivo a lungo termine**   | vero | 
 |   **Storia**   | Aggiunto in 1.80 | 

###  **forzaSynchronousLoading** 

Descrizione
Caricare i dataset sincrono invece di carico di sfondo differito.

 | Proprietà | Dettagli | 
 | --- | --- | 
 |   **Ciclo di vita**   | Stabile | 
 |   **Corrente di default**   | falso | 
 |   **Obiettivo a lungo termine**   | falso | 
 |   **Storia**   | Aggiunto in 2.30 | 

##  **📂 Metadati e standard** 

###  **Articolo** 

Descrizione
Genera e serve FGDC (Repubblica federale di Germania Comitato dei dati) metadati.

 | Proprietà | Dettagli | 
 | --- | --- | 
 |   **Ciclo di vita**   | Stabile | 
 |   **Corrente di default**   | vero | 
 |   **Obiettivo a lungo termine**   | vero | 
 |   **Storia**   | Aggiunto in 1.38 | 

###  **iso19115 Attivo** 

Descrizione
Genera e serve metadati ISO 19115.

 | Proprietà | Dettagli | 
 | --- | --- | 
 |   **Ciclo di vita**   | Stabile | 
 |   **Corrente di default**   | vero | 
 |   **Obiettivo a lungo termine**   | vero | 
 |   **Storia**   | Aggiunto in 1.38 | 

###  **usoSisISO19115** 

Descrizione
Utilizza la libreria Apache SIS per generare metadati ISO 19115 invece del generatore legacy. Se questo è attivo e usaSisISO19139 non è acceso, i metadati IOS 19115 di default saranno in formato ISO19115_3_2016. Se questo è falso il formato predefinito sarà nel formato ISO19115_2 modificato legacy.

 | Proprietà | Dettagli | 
 | --- | --- | 
 |   **Ciclo di vita**   | Testing | 
 |   **Corrente di default**   | falso | 
 |   **Obiettivo a lungo termine**   | vero | 
 |   **Storia**   | Aggiunto in 2.26 | 

###  **usoSisISO19139** 

Descrizione
Utilizza la libreria Apache SIS per generare metadati ISO19139_2007.

 | Proprietà | Dettagli | 
 | --- | --- | 
 |   **Ciclo di vita**   | Testing | 
 |   **Corrente di default**   | falso | 
 |   **Obiettivo a lungo termine**   | falso | 
 |   **Storia**   | Aggiunto in 2.29.0 | 

###  **JsonldActive** 

Descrizione
Genera e serve JSON-LD (Dati collegati) metadati.

 | Proprietà | Dettagli | 
 | --- | --- | 
 |   **Ciclo di vita**   | Stabile | 
 |   **Corrente di default**   | vero | 
 |   **Obiettivo a lungo termine**   | vero | 
 |   **Storia**   | Legacy | 

###  **generareCroissantSchema** 

Descrizione
Genera lo schema dei metadati "Croissant" come schema predefinito per la prontezza dell'apprendimento automatico.

 | Proprietà | Dettagli | 
 | --- | --- | 
 |   **Ciclo di vita**   | Testing | 
 |   **Corrente di default**   | vero | 
 |   **Obiettivo a lungo termine**   | vero | 
 |   **Storia**   | Aggiunto in 2.28.0 | 

###  **variabiliMustHaveIoosCategory** 

Descrizione
Forze che le variabili devono avere un attributo di categoria IOOS.

 | Proprietà | Dettagli | 
 | --- | --- | 
 |   **Ciclo di vita**   | Stabile | 
 |   **Corrente di default**   | vero | 
 |   **Obiettivo a lungo termine**   | impostato come desiderato | 
 |   **Storia**   | Legacy | 

###  **includereNcCFSubsetVariables** 

Descrizione
Il comportamento legacy era quello di generare variabili sottoset solo per EDDTableFromNcCFFiles datasets. Questo è stato aggiunto per default il comportamento per EDDTableFromNcCFFiles per essere coerente con altri tipi di dataset. Se avete bisogno del legacy automatico subsetVariables è possibile abilitare questo. La soluzione migliore sarebbe quella di aggiungere subsetVariables alla definizione del dataset.

 | Proprietà | Dettagli | 
 | --- | --- | 
 |   **Ciclo di vita**   | Testing | 
 |   **Corrente di default**   | falso | 
 |   **Obiettivo a lungo termine**   | falso | 
 |   **Storia**   | Aggiunto in 2.26 | 

##  **🔔 Abbonamenti e Notifiche** 

###  **sottoscrizioneSystemActive** 

Descrizione
Consente il sistema di abbonamento e-mail per gli aggiornamenti di dataset.

 | Proprietà | Dettagli | 
 | --- | --- | 
 |   **Ciclo di vita**   | Stabile | 
 |   **Corrente di default**   | vero | 
 |   **Obiettivo a lungo termine**   | vero | 
 |   **Storia**   | Aggiunto in 1.14 | 

###  **Iscriviti aRemoteErddapDataset** 

Descrizione
Questo permette ERDDAP istanza per abbonarsi a remoto ERDDAP set di dati per aggiornamenti.

 | Proprietà | Dettagli | 
 | --- | --- | 
 |   **Ciclo di vita**   | Stabile | 
 |   **Corrente di default**   | vero | 
 |   **Obiettivo a lungo termine**   | vero | 
 |   **Storia**   | Aggiunto in 1.70 | 

###  **aggiornamentoSubsRssOnFileChanges** 

Descrizione
Abbonamento e RSS aggiornamenti quando i file sottostanti cambiano. Il comportamento legacy è stato solo per fare aggiornamenti su dataset reload (che alcuni server avevano raramente come settimanale) .

 | Proprietà | Dettagli | 
 | --- | --- | 
 |   **Ciclo di vita**   | Stabile | 
 |   **Corrente di default**   | vero | 
 |   **Obiettivo a lungo termine**   | vero | 
 |   **Storia**   | Aggiunto in 2.26 | 

###  **abilita abilita abilita abilita abilita abilita abilita abilita abilita abilita abilita abilita abilita MqttBroker** 

Descrizione
Inizia un broker MQTT interno all'interno dell'applicazione per gestire la messaggistica.

 | Proprietà | Dettagli | 
 | --- | --- | 
 |   **Ciclo di vita**   | Testing | 
 |   **Corrente di default**   | falso | 
 |   **Obiettivo a lungo termine**   | impostato come desiderato | 
 |   **Storia**   | Aggiunto in 2.29.0 | 

###  **PubblicareMqttNotif** 

Descrizione
Consente la pubblicazione di notifiche (come le modifiche del dataset) al broker MQTT.

 | Proprietà | Dettagli | 
 | --- | --- | 
 |   **Ciclo di vita**   | Testing | 
 |   **Corrente di default**   | falso | 
 |   **Obiettivo a lungo termine**   | impostato come desiderato | 
 |   **Storia**   | Aggiunto in 2.29.0 | 

##  **🌐 Intestazioni Web/Configurazione** 

###  **utilizzareHeadersFor Ur** 

Descrizione
Consente di utilizzare intestazioni HTTP per determinare i dettagli dell'URL della richiesta (utile dietro i proxy) .

 | Proprietà | Dettagli | 
 | --- | --- | 
 |   **Ciclo di vita**   | Stabile | 
 |   **Corrente di default**   | vero | 
 |   **Obiettivo a lungo termine**   | vero | 
 |   **Storia**   | Default cambiato in true in 2.28.0, Aggiunto in 2.27.0 | 

###  **abilita abilita abilita abilita abilita abilita abilita abilita abilita abilita abilita abilita abilita Cors** 

Descrizione
Consente la condivisione delle risorse cross-Origin (CORSI) intestazioni sulle risposte HTTP.

 | Proprietà | Dettagli | 
 | --- | --- | 
 |   **Ciclo di vita**   | Stabile | 
 |   **Corrente di default**   | falso | 
 |   **Obiettivo a lungo termine**   | impostato come desiderato | 
 |   **Storia**   | Aggiunto in 2.26 | 

##  **🔍 Ricerca** 

###  **utilizzareLuceneSearchEngine** 

Descrizione
Attiva il motore di ricerca interno per utilizzare Apache Lucene.

 | Proprietà | Dettagli | 
 | --- | --- | 
 |   **Ciclo di vita**   | Testing | 
 |   **Corrente di default**   | falso | 
 |   **Obiettivo a lungo termine**   | ? | 
 |   **Storia**   | Legacy | 

##  **Servizi e protocolli** 

###  **fileActive** 

Descrizione
Consente la visualizzazione del browser "Files" per i dataset che lo supportano.

 | Proprietà | Dettagli | 
 | --- | --- | 
 |   **Ciclo di vita**   | Stabile | 
 |   **Corrente di default**   | vero | 
 |   **Obiettivo a lungo termine**   | vero | 
 |   **Storia**   | Aggiunto in 1.58 | 

###  **convertitoriActive** 

Descrizione
Consente gli strumenti di conversione nell'interfaccia utente.

 | Proprietà | Dettagli | 
 | --- | --- | 
 |   **Ciclo di vita**   | Stabile | 
 |   **Corrente di default**   | vero | 
 |   **Obiettivo a lungo termine**   | vero | 
 |   **Storia**   | Aggiunto in 1.44 | 

###  **slideSorterActive** 

Descrizione
Attiva il Sorter Slide.

 | Proprietà | Dettagli | 
 | --- | --- | 
 |   **Ciclo di vita**   | Stabile | 
 |   **Corrente di default**   | vero | 
 |   **Obiettivo a lungo termine**   | vero | 
 |   **Storia**   | Aggiunto in 1.44 | 

###  **dataProviderFormActive** 

Descrizione
Consente ai provider di dati di inserire i metadati.

 | Proprietà | Dettagli | 
 | --- | --- | 
 |   **Ciclo di vita**   | Stabile | 
 |   **Corrente di default**   | vero | 
 |   **Obiettivo a lungo termine**   | vero | 
 |   **Storia**   | Legacy | 

###  **outOfDateDatasetsActive** 

Descrizione
Consente la segnalazione di dataset non aggiornati.

 | Proprietà | Dettagli | 
 | --- | --- | 
 |   **Ciclo di vita**   | Stabile | 
 |   **Corrente di default**   | vero | 
 |   **Obiettivo a lungo termine**   | vero | 
 |   **Storia**   | Aggiunto in 1.82 | 

###  **wmsActive** 

Descrizione
Attiva il servizio Mappa Web ( WMS ) interfaccia.

 | Proprietà | Dettagli | 
 | --- | --- | 
 |   **Ciclo di vita**   | Stabile | 
 |   **Corrente di default**   | vero | 
 |   **Obiettivo a lungo termine**   | vero | 
 |   **Storia**   | Aggiunto in 1.44 | 

###  **wmsClientActive** 

Descrizione
Consente l'interno WMS funzioni client.

 | Proprietà | Dettagli | 
 | --- | --- | 
 |   **Ciclo di vita**   | Stabile | 
 |   **Corrente di default**   | vero | 
 |   **Obiettivo a lungo termine**   | vero | 
 |   **Storia**   | Legacy | 

###  **geoServicesRestActive** 

Descrizione
Abilita il RESTful interfaccia per i servizi geospaziali. Non completamente implementato.

 | Proprietà | Dettagli | 
 | --- | --- | 
 |   **Ciclo di vita**   | In costruzione | 
 |   **Corrente di default**   | falso (Hardcoded)   | 
 |   **Obiettivo a lungo termine**   | vero | 

###  **wcsActive** 

Descrizione
Consente il servizio di copertura Web ( WCS ) interfaccia. Non completamente implementato.

 | Proprietà | Dettagli | 
 | --- | --- | 
 |   **Ciclo di vita**   | In costruzione | 
 |   **Corrente di default**   | falso (Hardcoded)   | 
 |   **Obiettivo a lungo termine**   | vero | 

###  **sos Active** 

Descrizione
Consente il servizio di osservazione dei sensori ( SOS ) interfaccia.

 | Proprietà | Dettagli | 
 | --- | --- | 
 |   **Ciclo di vita**   | In costruzione | 
 |   **Corrente di default**   | falso (Hardcoded)   | 
 |   **Obiettivo a lungo termine**   | vero | 
