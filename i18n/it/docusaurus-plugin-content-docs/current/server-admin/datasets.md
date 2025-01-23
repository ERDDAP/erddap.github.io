---
title: "ERDDAP™ - Working with the datasets.xml File"
---
# Lavorare con ildatasets.xmlFile

\\[Questa pagina web sarà solo di interesseERDDAP™amministratori.\\]

Dopo aver seguito ilERDDAP™ [istruzioni di installazione](/docs/server-admin/deploy-install), è necessario modificare ildatasets.xmlfile in *tomcat* /content/erddap/ per descrivere i dataset che ilERDDAP™l'installazione servirà.

- - No.

## [Introduzione](#introduction) {#introduction} 

### Qualche assemblaggio richiesto{#some-assembly-required} 
Impostazione di un set di datiERDDAP™non è solo una questione di puntare alla directory o URL del dataset. Devi scrivere un pezzo di XML perdatasets.xmlche descrive il dataset.

* Per i dataset grigliati, al fine di rendere il dataset conforme aERDDAPLa struttura dei dati per i dati grigliati, è necessario identificare un sottoinsieme delle variabili del dataset che condividono le stesse dimensioni. ([Perche'?](#why-just-two-basic-data-structures) [Come?](#dimensions)) 
* I metadati attuali del dataset vengono importati automaticamente. Ma se si desidera modificare i metadati o aggiungere altri metadati, è necessario specificarlo indatasets.xml. EERDDAP™ha bisogno di altri metadati, compreso[attributi globali](#global-attributes)  (comeinfoUrl, istituzione,sourceUrl, sommario e titolo) e[attributi variabili](#variable-addattributes)  (comelong\\_namee unità) . Proprio come i metadati attualmente presenti nel dataset aggiungono informazioni descrittive al dataset, i metadati richiesti daERDDAP™aggiunge informazioni descrittive al dataset. I metadati aggiuntivi sono una buona aggiunta al dataset e aiutanoERDDAP™fare un lavoro migliore di presentare i tuoi dati agli utenti che non hanno familiarità con esso.
*   ERDDAP™ha bisogno di fare cose speciali con[longitudine, latitudine, altitudine (o profondità) , e variabili di tempo](#destinationname).

Se acquisti in queste idee ed espedi lo sforzo di creare l'XML perdatasets.xml, si ottiene tutti i vantaggi diERDDAP™, incluso:

* Ricerca completa di testo per set di dati
* Ricerca per datasets per categoria
* Moduli di accesso ai dati ( *datasetID* .html) in modo da poter richiedere un sottoinsieme di dati in molti formati di file diversi
* Forme per richiedere grafici e mappe ( *datasetID* .) 
* Servizio Mappa Web (WMS) per set di dati grigliati
*   RESTfulaccesso ai dati

Fare ildatasets.xmlrichiede notevoli sforzi per i primi set di dati, ma **diventa più facile** . Dopo il primo dataset, è spesso possibile riutilizzare un sacco di lavoro per il prossimo set di dati. Fortunatamente,ERDDAP™viene con due[Strumenti](#tools)per aiutarti a creare l'XML per ogni dataset indatasets.xml.
Se ti bloccano, vedi il nostro[sezione per ottenere supporto aggiuntivo](/docs/intro#support).

### Fornitore di dati Forma{#data-provider-form} 
Quando un fornitore di dati viene a voi sperando di aggiungere alcuni dati al vostroERDDAP, può essere difficile e richiede tempo per raccogliere tutti i metadati (informazioni sul dataset) necessario aggiungere i dati inseritiERDDAP. Molte fonti di dati (per esempio, file .csv, File Excel, database) non hanno metadati interni, quindiERDDAP™ha un modulo Data Provider che raccoglie i metadati dal fornitore di dati e fornisce al fornitore di dati un'altra guida, tra cui una vasta guida per[Dati nei database](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm1.html#databases). Le informazioni inviate sono convertite indatasets.xmlformato e quindi inviato alERDDAP™amministratore (Tu sei) e scritto (allegato) a *BigParentDirectory* /logs/dataProviderForm.log . Così, la forma semi-automatizza il processo di ottenere un set di dati inERDDAP, ma ilERDDAP™l'amministratore deve ancora completaredatasets.xmlchunk e trattare con ottenere il file di dati (#) dal fornitore o la connessione al database.

L'invio di file di dati reali da fonti esterne è un enorme rischio di sicurezza, quindiERDDAP™non si occupa di questo. Devi capire una soluzione che funziona per te e per il fornitore di dati, ad esempio, e-mail (per piccoli file) , tirare dal cloud (per esempio, DropBox o Google Drive) , un sito sftp (con password) , o sneaker Rete (una chiavetta USB o un disco rigido esterno) . Probabilmente dovresti accettare solo i file delle persone che conosci. È necessario eseguire la scansione dei file per i virus e prendere altre precauzioni di sicurezza.

Non c'è un collegamentoERDDAP™al modulo Data Provider (per esempio, sulERDDAP™home page) . Invece, quando qualcuno ti dice che vogliono avere i loro dati serviti dai tuoiERDDAP, è possibile inviare loro una e-mail dicendo qualcosa come:
Sì, possiamo far entrare i tuoi datiERDDAP. Per iniziare, si prega di compilare il modulo a https://*yourUrl*/erddap/dataProviderForm.html   (ohttp://sehttps://non è abilitato) .
Dopo aver finito, ti contattero' per scoprire i dettagli finali.
Se vuoi solo guardare il modulo (senza riempirlo) , potete vedere il modulo suERD'ERDDAP:[Introduzione](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm.html)♪[Parte 1](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm1.html)♪[Parte 2](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm2.html)♪[Parte 3](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm3.html)e[Parte 4](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm4.html). Questi collegamentiERD ERDDAP™inviare informazioni a me, non a te, quindi non inviare informazioni con loro a meno che non si desidera effettivamente aggiungere i dati alERD ERDDAP.

Se si desidera rimuovere il modulo Data Provider dal proprioERDDAP™#
```
<dataProviderFormActive>false</dataProviderFormActive>  
```
nel file setup.xml.

L'impeto per questo eraNOAA2014[Accesso pubblico ai risultati della ricerca (PARERI) Direttiva](https://www.glerl.noaa.gov/review2016/reviewer_docs/NOAA_PARR_Plan_v5.04.pdf), che richiede tuttoNOAAi dati ambientali finanziati tramite il pagamento fiscale sono messi a disposizione tramite un servizio dati (non solo file) entro 12 mesi di creazione. Quindi c'è un maggiore interesse nell'usoERDDAP™per rendere disponibili i set di dati tramite un servizio ASAP. Abbiamo bisogno di un modo più efficiente per affrontare un gran numero di fornitori di dati.

Feedback/Suggestions? Questo modulo è nuovo, quindi si prega di e-mailerd dot data at noaa dot govse avete qualche feedback o suggerimenti per migliorare questo.

### Strumenti{#tools} 
ERDDAP™viene fornito con due programmi di riga di comando che sono strumenti per aiutarti a creare l'XML per ogni set di dati che desideriERDDAP™per servire. Una volta che hai impostatoERDDAP™e correte (almeno una volta) , è possibile trovare e utilizzare questi programmi nel *tomcat* /webapps/erddap/WEB-INF directory. Ci sono script di shell Linux/Unix (con l'estensione .sh) e script di Windows (con l'estensione .bat) per ogni programma.\\[Su Linux, eseguire questi strumenti come lo stesso utente (Tomcat?) che gestirà Tomcat.\\]Quando si esegue ogni programma, ti farà domande. Per ogni domanda, digitare una risposta, quindi premere Invio. Oppure premere ^C per uscire da un programma in qualsiasi momento.

#### Il programma non correrà?{#program-wont-run} 

* Se si ottiene un programma sconosciuto (o simili) messaggio di errore, il problema è probabilmente che il sistema operativo non ha trovatoJava. Devi capire doveJavaè sul computer, quindi modificare il riferimento java nel file .bat o .sh che si sta cercando di utilizzare.
* Se si ottiene un file jar non trovato o la classe non trovato messaggio di errore, alloraJavaNon è stato possibile trovare una delle classi elencate nel file .bat o .sh che si sta cercando di utilizzare. La soluzione è quella di capire dove si trova quel file .jar, e modificare il riferimento java ad esso nel file .bat o .sh.
* Se si utilizza una versione diJavache è troppo vecchio per un programma, il programma non verrà eseguito e vedrete un messaggio di errore come
Eccezione nel thread "main" java.lang.UnsupportedClassVersionError:
     *alcuni/classe/nome* : Versione non supportata major.minor *alcuni*   
La soluzione è quella di aggiornare alla versione più recente diJavae assicurarsi che il file .sh o .bat per il programma lo stia usando.

#### Gli strumenti stampano vari messaggi diagnostici:{#the-tools-print-various-diagnostic-messages} 

* La parola "ERROR" viene usata quando qualcosa è andato così male che la procedura non è riuscita a completare. Anche se è fastidioso per ottenere un errore, l'errore ti costringe a affrontare il problema.
* La parola "WARNING" viene usata quando qualcosa è andato storto, ma la procedura è stata completata. Sono piuttosto rari.
* Qualunque altra cosa è solo un messaggio informativo. È possibile aggiungere \\-verbose al[GenerareDatasetsXml](#generatedatasetsxml)o[DasDds](#dasdds)riga di comando per ottenere ulteriori messaggi informativi, che a volte aiuta a risolvere i problemi.

I due strumenti sono un grande aiuto, ma è ancora necessario leggere tutte queste istruzioni su questa pagina con attenzione e prendere decisioni importanti da soli.

### GenerareDatasetsXml{#generatedatasetsxml} 
*    **GenerareDatasetsXml** è un programma di riga di comando che può generare una bozza approssimativa del dataset XML per quasi qualsiasi tipo di dataset.
    
Rendiamo STRONGLY che si utilizza GenerateDatasets Xml invece di creare pezzi didatasets.xmla mano perché:
    
    * Genera i dati Xml funziona in pochi secondi. Fare questo a mano è almeno un'ora di lavoro, anche quando sai cosa stai facendo.
    * Genera i dati Xml fa un lavoro migliore. Fare questo a mano richiede una vasta conoscenza di comeERDDAP™funziona. È improbabile che si farà un lavoro migliore a mano. (Bob Simons usa sempre GenerateDatasets Xml per la prima bozza, e ha scrittoERDDAP.) 
    * Genera i dati Xml genera sempre un pezzo valido didatasets.xml. Qualsiasi pezzo didatasets.xmlche si scrive probabilmente avrà almeno alcuni errori che impedisconoERDDAP™dal caricamento del dataset. Spesso ci vogliono ore per diagnosticare questi problemi. Non sprecare tempo. Lasciare Generare Datasets Xml fa il duro lavoro. Quindi è possibile affinare il .xml a mano se si desidera.
    
Quando si utilizza GenerateDatasets Programma Xml:
    
    * Su Windows, la prima volta che si esegue GenerateDatasetsXml, è necessario modificare il file GenerateDatasetsXml.bat con un editor di testo per cambiare il percorso per la java. exe file in modo che Windows possa trovareJava.
    * Genera i dati Xml ti chiede prima di specificare l'EDDType (Erd Dap Dataset Tipo) del dataset. Vedi il[Elenco dei tipi di Dataset](#list-of-types-datasets)  (in questo documento) per capire su quale sia il tipo appropriato per il dataset su cui stai lavorando. Oltre al regolare EDDTypes, ci sono anche alcuni[Tipi di Dataset speciali/Pseudo](#specialpseudo-dataset-types)  (ad esempio, uno che striscia un catalogo THREDDS per generare un pezzo didatasets.xmlper ciascuno dei set di dati del catalogo) .
    * Genera i dati Xml poi ti fa una serie di domande specifiche a quella EDDType. Le domande raccolgono le informazioni necessarie perERDDAP™accedere alla sorgente del dataset. Per capire cosaERDDAP™è chiedere, vedere la documentazione per il EDDType che hai specificato facendo clic sullo stesso tipo di set di dati nel[Elenco dei tipi di Dataset](#list-of-types-datasets).
        
Se è necessario inserire una stringa con caratteri speciali (ad esempio, caratteri whitespace all'inizio o alla fine, caratteri non-ASCII) , entrare in un[stringa in stile JSON](https://www.json.org/json-en.html)  (con caratteri speciali scappati con caratteri \\) . Ad esempio, per entrare solo un carattere scheda, inserire "\t" (con le citazioni doppie circostanti, che diconoERDDAP™che questa è una stringa in stile JSON.
        
    * Spesso, una delle vostre risposte non sarà ciò di cui ha bisogno GenerateDatasetsXml. Si può poi riprovare, con risposte revisionate alle domande, fino a GenerateDatasets Xml può trovare e capire con successo i dati di origine.
    * Se rispondi correttamente alle domande (o sufficientemente correttamente) , GenerateDatasets Xml si connetterà alla sorgente del dataset e raccoglierà informazioni di base (per esempio, nomi variabili e metadati) .
Per i datasets che provengono da localiNetCDF .nce i file correlati, GenerateDatasets Xml spesso stampa la struttura ncdump-like del file dopo che legge prima il file. Questo può darvi informazioni per rispondere meglio alle domande su un loop successivo attraverso GenerateDatasetsXml.
    * Genera i dati Xml genererà quindi una bozza approssimativa del dataset XML per quel dataset.
    * Informazioni diagnostiche e la bozza approssimativa del dataset XML saranno scritte a *BigParentDirectory* /logs/GenerateDatasetsXml.log .
    * La bozza approssimativa del dataset XML sarà scritta a *BigParentDirectory* /logs/GenerateDatasetsXml.out .
#### "0 file" Messaggio di errore{#0-files-error-message} 
Se esegue GenerateDatasets Xml o[DasDds](#dasdds), o se si tenta di caricare unEDDGridDa...Files o EDDTableDa... File dataset inERDDAP™, e si ottiene un messaggio di errore "0 file" che indica cheERDDAP™trovato 0 file corrispondenti nella directory (quando pensi che ci siano file corrispondenti in quella directory) :
* Controlla che hai specificato il nome completo della directory. E se hai specificato il nome del file campione, assicurati di specificare il nome completo del file, incluso il nome della directory completa.
* Controllare che i file sono davvero in quella directory.
* Controlla l'ortografia del nome della directory.
* Controlla il fileNameRegex. E 'davvero, davvero facile fare errori con regexe. Per scopi di prova, prova il regex .\\* che dovrebbe corrispondere a tutti i nomi di file. (Vedi questo[documentazione regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)e[tutorial regex](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) 
* Controllare che l'utente che esegue il programma (ad esempio, user=tomcat (?) per Tomcat/ERDDAP) ha il permesso "leggere" per quei file.
* In alcuni sistemi operativi (per esempio, SELinux) e a seconda delle impostazioni di sistema, l'utente che ha eseguito il programma deve avere 'leggi' il permesso per l'intera catena di directory che porta alla directory che ha i file.


* Se hai problemi che non puoi risolvere,[richiesta supporto](/docs/intro#support)con quante più informazioni possibile. Allo stesso modo, se sembra che il EDDType appropriato per un dato set di dati non funziona con quel dataset, o se non c'è un EDDType appropriato, si prega di presentare un[problema su GitHub](https://github.com/ERDDAP/erddap/issues)con i dettagli (e un file di esempio se necessario) .
         
#### È necessario modificare l'output da GenerateDatasets Xml per migliorare.{#you-need-to-edit-the-output-from-generatedatasetsxml-to-make-it-better} 
         
* DISCLAIMER:
IL PAESEdatasets.xmlMADE BE GenerateDataset Xml non e' perfetto. Devi solo recuperare e cancellare l'XML prima di usarlo in una PUBBLICAERDDAP. Genera i dati Xml si ricollega ad un sacco di regole-OF-THUMB che non è sempre stato aggiornato. Lei è responsabile per l'adempimento della competenza dell'XML che lei haERDDAP#datasets.xmlFILE.
    
     (- Non sto urlando. Per motivi legali storici, i disclaimer devono essere scritti in tutti i caps.) 
    
L'output di GenerateDatasetsXml è una bozza grezza.
Dovrai quasi sempre modificarlo.
Abbiamo fatto e continuiamo a fare un enorme sforzo per rendere l'output il più possibile pronto per andare, ma ci sono limiti. Spesso, le informazioni necessarie non sono semplicemente disponibili dai metadati di origine.
    
Un problema fondamentale è che stiamo chiedendo un programma per computer (GenerareDatasetsXml) per fare un compito dove, se avete dato lo stesso compito a 100 persone, si otterrebbe 100 risultati diversi. Non c'è una sola risposta "destra". Ovviamente, il programma si avvicina alla lettura della mente di Bob (non tuo) , ma anche così, non è un programma AI tutto compreso, solo un gruppo di euristica acciottolato insieme per fare un compito simile a AI. (Quel giorno di un programma AI tutto compreso può venire, ma non è ancora. Se / quando lo fa, noi umani possono avere problemi più grandi. Fai attenzione a quello che desideri.) 
    
* Per scopi informativi, l'output mostra la fonte globaleAttributi e sorgenti variabiliAttributi come commenti.ERDDAP™combina sorgenteAttributi eaddAttributes  (che hanno la precedenza) per fare il combinato Attributi che vengono visualizzati all'utente. (E altri attributi vengono automaticamente aggiunti a longitudine, latitudine, altitudine, profondità e variabili di tempo quandoERDDAP™effettivamente rende il dataset) .
     
* Se non ti piace una fonteAttributo, sovrascrivilo aggiungendo un addAttributo con lo stesso nome ma un valore diverso (o nessun valore, se si desidera rimuoverlo) .
     
* TuttiaddAttributessono suggerimenti generati dal computer. Modificali&#33; Se non ti piace un addAttribute, cambialo.
     
* Se vuoi aggiungere altroaddAttributesaggiungeteli.
     
* Se vuoi cambiare undestinationName, cambialo. Ma non cambiaresourceNameS.
     
* È possibile modificare l'ordine deldataVariables o rimuovere qualsiasi di loro.


    * Si può quindi utilizzare[DasDds](#dasdds)  (vedi sotto) per testare ripetutamente l'XML per quel dataset per garantire che il dataset risultante appare come si desidera che inERDDAP.
    * Sentitevi liberi di fare piccole modifiche aldatasets.xmlchunk che è stato generato, per esempio, fornire un meglioinfoUrl, sommario, o titolo.
#### doNotAddStandardNames{#donotaddstandardnames} 
Se si include \\-doNotAddStandardNames come parametro di riga di comando quando si esegue generare Datasets Xml, generare Datasets Xml non aggiungeràstandard\\_namealaddAttributesper qualsiasi variabile diversa dalle variabili denominate latitudine, longitudine, altitudine, profondità o tempo (che hanno ovviastandard\\_name#) . Questo può essere utile se si utilizza l'output da generare Datasets Xml direttamente inERDDAP™senza modificare l'output, perché generare Datasets Xml spesso indovinastandard\\_nameErroneamente. (Si noti che si consiglia sempre di modificare l'output prima di utilizzarlo inERDDAP.) Utilizzando questo parametro avrà altri effetti correlati minori perché l'ipotesistandard\\_nameè spesso usato per altri scopi, ad esempio, per creare un nuovolong\\_name, e per creare le impostazioni di ColorBar.
#### Scripting{#scripting} 
Come alternativa per rispondere interattivamente alle domande alla tastiera e looping per generare ulteriori set di dati, è possibile fornire argomenti di riga di comando per rispondere a tutte le domande per generare un dataset. Genera i dati Xml elaborerà tali parametri, scriverà l'output al file di output e e esce dal programma.
        
Per impostare questo, prima utilizzare il programma in modalità interattiva e scrivere le risposte. Ecco un esempio parziale:
Diciamo che si esegue lo script: ./GenerateDatasetsXml.sh
Poi entrare: EDDTableFromAsciiFiles
Quindi inserire: /u00/data/
Quindi inserire: .\\*\\\.asc
Quindi inserire: /u00/data/sampleFile.asc
Quindi inserire: ISO-8859-1
        
Per eseguire questo in modo non interattivo, utilizzare questa riga di comando:
./GenerateDatasetsXml.sh EDDTableFromAsciiFiles /u00/data/ .\\*\\\\.asc /u00/data/sampleFile.asc ISO-8859-1
Quindi, in fondo, elenca tutte le risposte sulla riga di comando.
Questo dovrebbe essere utile per i set di dati che cambiano frequentemente in un modo che richiede la re-running GenerateDatasets Xml (in particolareEDDGridDaThreddsCatalog) .
        
Dettagli:

* Se un parametro contiene uno spazio o un carattere speciale, quindi codificare il parametro come un[stringa in stile JSON](https://www.json.org/json-en.html), ad esempio, "il mio parametro con spazi e due\\nlinee".
* Se si desidera specificare una stringa vuota come parametro, utilizzare: niente
* Se si desidera specificare il valore predefinito di un parametro, utilizzare: predefinito
             
* Generare i dati Xml supporta un -i *set di dati XmlName* # *tagName* parametro riga di comando che inserisce l'output nel parametro specificatodatasets.xmlfile (il default è *tomcat* / contenuto/erddap/datasets.xml) . Genera i dati Xml cerca due linee in dataset XmlName:
```
        <!-- Begin GenerateDatasetsXml #*tagName someDatetime* -->  
```
e
```
        <!-- End GenerateDatasetsXml #*tagName someDatetime* -->  
```
e sostituisce tutto tra quelle righe con il nuovo contenuto, e cambia il SomeDatetime.
* L'interruttore -i è solo elaborato (e modifichedatasets.xmlsono fatti solo) se si esegue GenerateDatasets Xml con argomenti di riga di comando che specificano tutte le risposte a tutte le domande per un loop del programma. (Vedere 'Scripting' sopra.)   (Il pensiero è: Questo parametro è da utilizzare con gli script. Se si utilizza il programma in modalità interattiva (digitando informazioni sulla tastiera) , si rischia di generare alcuni pezzi errati di XML prima di generare quello che si desidera.) 
* Se le linee Begin e End non sono trovate, allora quelle linee e il nuovo contenuto vengono inseriti subito prima&lt;/erddapDatasets&gt;.
* C'è anche un -I (capitale) commutare per scopi di prova che funziona lo stesso di -i, ma crea un file chiamatodatasets.xml *Data* e non cambiadatasets.xml.
* Non eseguire GenerateDatasets Xml con -i in due processi contemporaneamente. C'è una possibilità che solo una serie di cambiamenti saranno mantenuti. Ci può essere un problema serio (per esempio, file corrotti) .
    
Se si utilizza "GenerateDatasetsXml -verbose", stamperà più messaggi diagnostici del solito.
    
#### Tipi di Dataset speciali/Pseudo{#specialpseudo-dataset-types} 
In generale, le opzioni EDDType in GenerateDatasets Xml match dei tipi EDD descritti in questo documento (vedi il[Elenco dei tipi di Dataset](#list-of-types-datasets)) e generare unodatasets.xmlchunk per creare un dataset da una specifica fonte di dati. Ci sono alcune eccezioni e casi speciali:
    
##### EDDGridDa Erddap{#eddgridfromerddap} 
Questo EDDType genera tuttidatasets.xmlpezzi necessari per fare[EDDGridDa Erddap](#eddfromerddap)set di dati da tuttiEDDGridset di dati in un telecomandoERDDAP. Avrete la possibilità di mantenere l'originaledatasetID# (che possono duplicare alcunidatasetIDgià nel tuoERDDAP) o generare nuovi nomi che saranno unici (ma di solito non sono come leggibili dall'uomo) .
     
##### EDDTableFromErddap{#eddtablefromerddap} 
Questo EDDType genera tuttidatasets.xmlpezzi necessari per fare[EDDTableFromErddap](#eddfromerddap)set di dati da tutti i dataset EDDTable in un telecomandoERDDAP. Avrete la possibilità di mantenere l'originaledatasetID# (che possono duplicare alcunidatasetIDgià nel tuoERDDAP) o generare nuovi nomi che saranno unici (ma di solito non sono come leggibili dall'uomo) .
     
##### EDDGridDaThreddsCatalog{#eddgridfromthreddscatalog} 
Questo EDDType genera tuttidatasets.xmlpezzi necessari per tutti[EDDGridDamasco](#eddgridfromdap)set di dati che può trovare strisciando ricorsivamente attraverso un THREDDS (sub) catalogo. Ci sono molte forme di URL del catalogo THREDDS. Questa opzione REQUIRES un URL THREDDS .xml con /catalog/ in esso, ad esempio,
 https://oceanwatch.pfeg.noaa.gov/thredds/catalog/catalog.xml o
 https://oceanwatch.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/chla/catalog.xml   
(un relativo catalogo .html è a
 https://oceanwatch.pfeg.noaa.gov/thredds/Satellite/aggregsatMH/chla/catalog.html , che non è accettabileEDDGridDaThreddsCatalog).
Se avete problemiEDDGridDa tre Catalogo:
* Assicurarsi che l'URL che si sta utilizzando sia valido, include /catalog/, e termina con /catalog.xml .
* Se possibile, utilizzare un indirizzo IP pubblico (per esempio, https://oceanwatch.pfeg.noaa.gov ) nell'URL, non un indirizzo IP numerico locale (per esempio, https://12.34.56.78 ) . Se il THREDDS è accessibile solo tramite l'indirizzo IP numerico locale, è possibile utilizzare [&lt;convertToPublicSourceUrl&gt;] (#converttopublicsourceurl) CosìERDDAP™gli utenti vedono l'indirizzo pubblico, anche seERDDAP™ottiene i dati dall'indirizzo numerico locale.
* Se hai problemi che non puoi risolvere,[controllare i consigli di risoluzione dei problemi](#troubleshooting-tips).
* Il codice a basso livello per questo ora utilizzaUnidatanetcdf-java catalogo crawler codice (Tre. classi di catalogo) in modo che possa gestire tutti i cataloghi THREDDS (che può essere sorprendentemente complesso) Grazie aUnidataper quel codice.
         
##### EDDGridLonPM180Da ErddapCatalog{#eddgridlonpm180fromerddapcatalog} 
Questo EDDType genera ildatasets.xmlper fare[EDDGridLonPM180](#eddgridlonpm180)set di dati da tuttiEDDGridset di dati in unERDDAPche hanno valori di longitudine superiori a 180.
* Se possibile, utilizzare un indirizzo IP pubblico (per esempio, https://oceanwatch.pfeg.noaa.gov ) nell'URL, non un indirizzo IP numerico locale (per esempio, https://12.34.56.78 ) . SeERDDAP™è accessibile solo tramite l'indirizzo IP numerico locale, è possibile utilizzare [&lt;convertToPublicSourceUrl&gt;] (#converttopublicsourceurl) CosìERDDAP™gli utenti vedono l'indirizzo pubblico, anche seERDDAP™ottiene i dati dall'indirizzo numerico locale.
         
##### EDDGridLon0360Da ErddapCatalog{#eddgridlon0360fromerddapcatalog} 
Questo EDDType genera ildatasets.xmlper fare[EDDGridLon0360](#eddgridlon0360)set di dati da tuttiEDDGridset di dati in unERDDAPche hanno valori di longitudine inferiori a 0.
* Se possibile, utilizzare un indirizzo IP pubblico (per esempio, https://oceanwatch.pfeg.noaa.gov ) nell'URL, non un indirizzo IP numerico locale (per esempio, https://12.34.56.78 ) . SeERDDAP™è accessibile solo tramite l'indirizzo IP numerico locale, è possibile utilizzare [&lt;convertToPublicSourceUrl&gt;] (#converttopublicsourceurl) CosìERDDAP™gli utenti vedono l'indirizzo pubblico, anche seERDDAP™ottiene i dati dall'indirizzo numerico locale.
         
##### EDDsFromFiles{#eddsfromfiles} 
Data una directory di avvio, questo attraversa la directory e tutte le sottodirectory e cerca di creare un set di dati per ogni gruppo di file di dati che trova.
* Ciò presuppone che quando si trova un dataset, il dataset include tutte le sottodirectory.
* Se si trova un dataset, le directory sibling simili verranno trattate come set di dati separati (Ad esempio, le directory per gli anni '90, i 2000, i 2010, genereranno set di dati separati) . Dovrebbero essere facili da combinare a mano -- basta cambiare il primo set di dati&lt;fileDir&gt; nella directory principale ed eliminare tutti i seguenti set di dati di semplificazione.
* Questo cercherà solo di generare un pezzo didatasets.xmlper il tipo più comune di estensione di file in una directory (non contare .md5, che è ignorato) . Così, dato una directory con 10.ncfile e 5 .txt file, un dataset verrà generato per.ncSolo i file.
* Ciò presuppone che tutti i file in una directory con la stessa estensione appartengano allo stesso dataset. Se una directory ha qualcosa.ncfile con dati SST e alcuni.ncfile con dati clorofill, solo un campione.ncil file sarà letto (SST? clorofilla?) e solo un set di dati verrà creato per quel tipo di file. Questo dataset probabilmente non riesce a caricare a causa di complicazioni dal tentativo di caricare due tipi di file nello stesso dataset.
* Se ci sono meno di 4 file con l'estensione più comune in una directory, questo presuppone che non siano file di dati e semplicemente salta la directory.
* Se ci sono 4 o più file in una directory, ma questo non può generare con successo un pezzo didatasets.xmlper i file (per esempio, un tipo di file non supportato) , questo genererà[EDDTableFromFileNames](#eddtablefromfilenames)dataset per i file.
* Alla fine della diagnostica che questo scrive al file di registro, poco prima deldatasets.xmlchunks, questo stamperà un tavolo con una sintesi di informazioni raccolte attraversando tutte le sottodirectory. La tabella elenca ogni sottodirectory e indica il tipo più comune di estensione del file, il numero totale di file, e quale tipo di dataset è stato creato per questi file (se c'è) . Se si trova di fronte a una struttura di file complessa, profondamente nidificata, considerare l'esecuzione GenerateDatasets Xml con EDDType=EDDsFromFiles solo per generare queste informazioni,
* Questa opzione non può fare un ottimo lavoro di indovinare il miglior EDDType per un determinato gruppo di file di dati, ma è veloce, facile e vale la pena di provare. Se i file sorgente sono adatti, funziona bene ed è un buon primo passo nella generazionedatasets.xmlper un file system con un sacco di sottodirectory, ciascuno con file di dati da diversi set di dati.
         
##### EDDTableFromEML e EDDTableFromEMLBatch{#eddtablefromeml-and-eddtablefromemlbatch} 
Questo speciale EDDType genera ildatasets.xmlper fare[EDDTableFromAsciiFiles](#eddtablefromasciifiles)dataset da ciascuna delle tabelle descritte in[Lingua ecologica dei metadati](https://knb.ecoinformatics.org/external//emlparser/docs/index.html)File XML. La variante "Batch" funziona su tutti i file EML in una directory locale o remota. Si prega di vedere il separato[documentazione per EDDTableFromEML](/docs/server-admin/EDDTableFromEML).
     
##### EDDTableDal porto{#eddtablefrominport} 
Questo speciale EDDType genera ildatasets.xmlper fare[EDDTableFromAsciiFiles](#eddtablefromasciifiles)dataset dalle informazioni in un[inport-xml](https://inport.nmfs.noaa.gov/inport)file. Se è possibile accedere al file di dati sorgente (il file inport-xml dovrebbe avere indizi per dove trovarlo) , è possibile effettuare un set di dati di lavoroERDDAP.

I seguenti passaggi delineano come utilizzare GenerateDatasets Xml con un file inport-xml al fine di ottenere un set di dati di lavoroERDDAP.

1. Una volta che hai accesso al file inport-xml (o come URL o file locale) : eseguire GenerateDatasets Xml, specificare EDDType=EDDTableFromInPort, specificare l'URL inport-xml o il nome completo del file, specificare qualeChild=0, e specificare le altre informazioni richieste (se noto) . (A questo punto, non è necessario avere il file di dati di origine o specificare il suo nome.) L'impostazione di cheChild=0 dice GenerateDatasets Xml per scrivere le informazioni per **Tutto** della&lt;entità-attributo-informazione&gt;&lt;entità&gt; nel file inport-xml (se ci sono) . Stampa anche un riassunto delle informazioni di sfondo, tra cui tutti i download-url elencati nel file inport-xml.
2. Guarda tutte queste informazioni (comprese le informazioni di sfondo che generanoDatasets Stampe Xml) e visitare il download-url (#) per cercare di trovare il file di dati sorgente (#) . Se riesci a trovarlo (loro) , scaricare (loro) in una directory accessibileERDDAP. (Se non riesci a trovare alcun file di dati di origine, non c'è alcun punto di procedere.) 
3. Correre Generate Datasets Ancora Xml.
Se il file di dati di origine corrisponde a uno dei file inport-xml&lt;entità-attributo-informazione&gt;&lt;l'entità, specificare quale bambino= *che l'Entità è ilNumero*   (ad esempio, 1, 2, 3, ...) .ERDDAP™cercherà di abbinare i nomi delle colonne nel file di dati di origine a nomi nelle informazioni dell'entità, e richiedere di accettare/rifiggere/fissare eventuali discrepanze.
O, se il file inport-xml non ha alcun&lt;entità-attributo-informazione&gt;&lt;l'entità, specificare quale bambino=0.
4. Nel pezzo didatasets.xmlche è stato fatto da GenerateDatasets Xml, rivedere il [globale&lt;addAttributes&gt; (#global-attributi) come necessario / desiderato.
5. Nel pezzo didatasets.xmlche è stato fatto da GenerateDatasetsXml, aggiungere / rivedere il [&lt;dataVariable&gt; (#datavariabile #) informazioni necessarie/desiderate per descrivere ciascuna delle variabili. Assicurati di identificare correttamente ogni variabile
[&lt;sourceName&gt; (#)   (come appare nella fonte) ♪
[&lt;destinationName&gt; (#destinationname)   (che ha più limitazioni sui caratteri consentiti chesourceName) ♪
[&lt;unità &gt; (# Units #)   (soprattutto se è un[tempo o timestamp variabile](#timestamp-variables)dove le unità devono specificare il formato) e
[&lt;missing\\_value&gt; (#missing_value) ♪
6. Quando si è vicini alla finitura, ripetutamente utilizzare[DasDds](#dasdds)strumento per vedere rapidamente se la descrizione del dataset è valida e se il dataset apparirà inERDDAP™come vuoi.
     

Sarebbe bello se i gruppi che utilizzano InPort per documentare i loro set di dati utilizzassero ancheERDDAP™per rendere disponibili i dati effettivi:

*   ERDDAP™è una soluzione che può essere utilizzata in questo momento in modo da poter soddisfareNOAA'[Accesso pubblico ai risultati della ricerca (PARERI) requisiti](https://nosc.noaa.gov/EDMC/PD.DSP.php)in questo momento, non in un momento vago in futuro.
*   ERDDAP™rende i dati reali disponibili agli utenti, non solo i metadati. (Che bene sono i metadati senza dati?) 
*   ERDDAP™supporta i metadati (in particolare, le unità delle variabili) , a differenza di alcuni altri software del server dati in essere considerato. (Che bene sono i dati senza metadati?) Utilizzare software che non supporta i metadati è invitare i dati ad essere fraintesi e abusati.
*   ERDDAP™è software libero e open-source a differenza di alcuni altri software che vengono considerati. Sviluppo continuoERDDAP™è già pagato. Supporto perERDDAP™gli utenti sono liberi.
*   ERDDAP'l'aspetto può essere facilmente personalizzato per riflettere ed evidenziare il vostro gruppo (nonERDoERDDAP) .
*   ERDDAP™offre un modo coerente per accedere a tutti i set di dati.
*   ERDDAP™può leggere i dati da molti tipi di file di dati e da database relazionali.
*   ERDDAP™può trattare con grandi set di dati, compresi i set di dati in cui i dati sorgente sono in molti file di dati.
*   ERDDAP™può scrivere dati a molti tipi di file di dati, a richiesta dell'utente, compresi i tipi di file di dati scientifici come netCDF, ESRI .csv, eODV .txt.
*   ERDDAP™può fare grafici personalizzati e mappe di sottoinsiemi dei dati, in base alle specifiche dell'utente.
*   ERDDAP™può trattare con non-data datasets come le collezioni di immagini, video o file audio.
*   ERDDAP™è stato installato e utilizzato a[più di 60 istituzioni nel mondo](/#who-uses-erddap).
*   ERDDAP™è elencato come uno dei server di dati consigliati per l'uso all'internoNOAAnel[NOAADirettiva procedurale di accesso ai dati](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations), a differenza di un altro software che viene considerato.
*   ERDDAP™è un prodotto diNMFS/NOAA, così usando dentroNMFSeNOAAdovrebbe essere un punto di orgoglio perNMFSeNOAA.

Per favore.ERDDAP™un tentativo. Se avete bisogno di aiuto, si prega di inviare un messaggio nelERDDAP™Gruppo di Google.
     
##### aggiungereFillValueAttributi{#addfillvalueattributes} 
Questa speciale opzione EDDType non è un tipo di dataset. È uno strumento che può aggiungere attributi \\_FillValue ad alcune variabili in alcuni set di dati. Vedi[aggiungereFillValueAttributi](#add-_fillvalue-attributes).
     
##### trovareDuplicato Tempo{#findduplicatetime} 
Questa speciale opzione EDDType non è un tipo di dataset. Invece, dice GenerateDatasets Xml per cercare attraverso una raccolta di griglie.nc  (e relative) file per trovare e stampare un elenco di file con valori di tempo duplicati. Quando guarda i valori del tempo, li converte dalle unità originali alle"seconds since 1970-01-01"nel caso in cui i file diversi utilizzino stringhe diverse unità. È necessario fornire la directory di partenza (con o senza lo slash trailing) , il nome del file espressione regolare (ad esempio, .\\*\\.nc ) , e il nome della variabile di tempo nei file.
     
##### NC{#ncdump} 
Questa speciale opzione EDDType non è un tipo di dataset. Invece, dice GenerateDatasets Xml per stampare un[NC](https://linux.die.net/man/1/ncdump)\\-come stampa di un.nc♪.nco.hdffile. In realtà usa il netcdf-java[NCdump](https://docs.unidata.ucar.edu/netcdf-java/5.4/javadoc/ucar/nc2/write/Ncdump.html), che è uno strumento più limitato della versione C di NCdump. Se si utilizza questa opzione, GenerateDatasetsXml vi chiede di utilizzare una delle opzioni: "-h" (intestazione) "-c" (vassoi di coordinate) , "-vall" (predefinito) , "-v var1;var2", "-v var1 (0,0:10,0:20) ". Questo è utile perché, senza ncdump è difficile sapere cosa è in un.nc♪.nco.hdffile e quindi quale EDDType si dovrebbe specificare per GenerateDatasets Xml. Per una.ncfile ml, questo stamperà l'uscita ncdump per il risultato del.ncmodifiche di file ml applicate al sottostante.nco.hdffile.
         
### DasDds{#dasdds} 
*   [ **DasDds** ](#dasdds)è un programma di riga di comando che è possibile utilizzare dopo aver creato un primo tentativo all'XML per un nuovo dataset indatasets.xml. Con DasDds, è possibile testare ripetutamente e affinare l'XML. Quando si utilizza il programma DasDds:
    1. Su Windows, la prima volta che si esegue DasDds, è necessario modificare i DasDds. bat file con un editor di testo per cambiare il percorso alla java. exe file in modo che Windows possa trovareJava.
    2. DasDds ti chiededatasetIDper il set di dati su cui stai lavorando.
    3. DasDds cerca di creare il dataset con questodatasetID.
        * DasDds stampa sempre un sacco di messaggi diagnostici.
Se si utilizza "DasDds -verbose", DasDds stamperà più messaggi diagnostici del solito.
        * Per la sicurezza, DasDds elimina sempre tutte le informazioni del dataset cache (file) per il dataset prima di cercare di creare il dataset. Questo è l'equivalente dell'impostazione di un[bandiera dura](/docs/server-admin/additional-information#hard-flag)Così per i dataset aggregati, si potrebbe desiderare di regolare temporaneamente il fileNameRegex per limitare il numero di file che il costruttore di dati trova.
        * Se il dataset non riesce a caricare (per qualsiasi ragione) , DasDds si fermerà e vi mostrerà il messaggio di errore per il primo errore che trova.
             **Non provare a indovinare quale potrebbe essere il problema. Leggi attentamente il messaggio ERROR.**   
Se necessario, leggere i messaggi diagnostici precedenti per trovare più indizi e informazioni, troppo.
        *    **Modificare l'XML del dataset per cercare di risolvere questo problema**   
e lasciare che DasDds provi a creare nuovamente il dataset.
        *    **Se risolvi ripetutamente ogni problema, alla fine risolverai tutti i problemi**   
e il dataset verrà caricato.
    4. Tutti gli output DasDds (diagnostica e risultati) sono scritti sullo schermo e su *BigParentDirectory* /logs/DasDds.log .
    5. Se DasDds può creare il dataset, DasDds vi mostrerà il[.das (Struttura di attributi di dataset) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType_das)♪[.dds (Descrittore di dataset Struttura) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType_dds)e[.timeGaps (lacune di tempo) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#timeGaps)informazioni per il set di dati sullo schermo e scriverle a *BigParentDirectory* /logs/DasDds.out .
    6. Spesso, si desidera fare qualche piccolo cambiamento all'XML del dataset per pulire i metadati del dataset e eseguire DasDds.

### Bonus Strumento di terze parti:ERDDAP- Ci siamo.{#bonus-third-party-tool-erddap-lint} 
ERDDAP-lint è un programma di Rob Fuller e Adam Leadbetter dell'Irish Marine Institute che è possibile utilizzare per migliorare i metadati del vostroERDDAP™Datasets.ERDDAP-lint "contiene regole e una semplice applicazione web statica per eseguire alcuni test di verifica contro il vostroERDDAP™server. Tutti i test sono eseguiti nel browser web." Come[Unix/Linux lint tool](https://en.wikipedia.org/wiki/Lint_(software)), è possibile modificare le regole esistenti o aggiungere nuove regole. Vedi[ERDDAP- Ci siamo.](https://github.com/IrishMarineInstitute/erddap-lint)per maggiori informazioni.

Questo strumento è particolarmente utile per i set di dati che hai creato qualche tempo fa e ora vuoi aggiornarti con le tue preferenze dei metadati attuali. Ad esempio, le prime versioni di GenerateDatasets Xml non ha messo alcuno sforzo nella creazione globalecreator\\_name♪creator\\_email, creatore\\_type, ocreator\\_urlmetadati. Potresti usareERDDAP-lint per identificare i set di dati che mancano quegli attributi dei metadati.

Grazie a Rob e Adam per la creazione di questo strumento e renderlo disponibile alERDDAP™comunità.
 
## La struttura di base deldatasets.xmlFile{#the-basic-structure-of-the-datasetsxml-file} 
I tag richiesti e facoltativi consentiti in undatasets.xmlfile (e il numero di volte che possono apparire) sono mostrati di seguito. In pratica, il tuodatasets.xmlavrà molti&lt;tag di dataset&gt; e utilizzare solo gli altri tag all'interno&lt;erddapDatasets&gt; come necessario.

  >&nbsp;&lt;&#63;xml version="1.0" encoding="ISO-8859-1" &#63;>  
  >&nbsp;&lt;erddapDatasets>  
  >&nbsp;&nbsp;&nbsp;[&lt;angularDegreeUnits>](#angulardegreeunits)...&lt;/angularDegreeUnits> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;angularDegreeTrueUnits>](#angulardegreetrueunits)...&lt;/angularDegreeTrueUnits> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;cacheMinutes>](#cacheminutes)...&lt;/cacheMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;commonStandardNames>](#commonstandardnames)...&lt;/commonStandardNames> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertInterpolateRequestCSVExample />](#convertinterpolaterequestcsvexample) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertInterpolateDatasetIDVariableList />](#convertinterpolatedatasetidvariablelist) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertToPublicSourceUrl />](#converttopublicsourceurl) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;decompressedCacheMaxGB>](#decompressed-cache)...&lt;/decompressedCacheMaxGB> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;decompressedCacheMaxMinutesOld>](#decompressed-cache)...&lt;/decompressedCacheMaxMinutesOld> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;drawLandMask>](#drawlandmask)...&lt;/drawLandMask> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;emailDiagnosticsToErdData>](#emaildiagnosticstoerddata)...&lt;/emailDiagnosticsToErdData> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;graphBackgroundColor>](#graphbackgroundcolor)...&lt;/graphBackgroundColor> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressMaxRequests>](#ipaddressmaxrequests)...&lt;/ipAddressMaxRequests> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressMaxRequestsActive>](#ipaddressmaxrequestsactive)...&lt;ipAddressMaxRequestsActive> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressUnlimited>](#ipaddressunlimited)...&lt;ipAddressUnlimited> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;loadDatasetsMinMinutes>](#loaddatasetsminminutes)...&lt;/loadDatasetsMinMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;loadDatasetsMaxMinutes>](#loaddatasetsmaxminutes)...&lt;/loadDatasetsMaxMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;logLevel>](#loglevel)...&lt;/logLevel> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;nGridThreads>](#nthreads)...&lt;/nGridThreads> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;nTableThreads>](#nthreads)...&lt;/nTableThreads> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;palettes>](#palettes)...&lt;/palettes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;partialRequestMaxBytes>](#partialrequestmaxbytes-and-partialrequestmaxcells)...&lt;/partialRequestMaxBytes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;partialRequestMaxCells>](#partialrequestmaxbytes-and-partialrequestmaxcells)...&lt;/partialRequestMaxCells> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;requestBlacklist>](#requestblacklist)...&lt;/requestBlacklist> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;slowDownTroubleMillis>](#slowdowntroublemillis)...&lt;/slowDownTroubleMillis> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;subscriptionEmailBlacklist>](#subscriptionemailblacklist)...&lt;/subscriptionEmailBlacklist> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;unusualActivity>](#unusualactivity)...&lt;/unusualActivity> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;updateMaxEvents>](#updatemaxevents)...&lt;/updateMaxEvents> &lt;!-- 0 or 1 -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;standardLicense>](#standard-text)...&lt;/standardLicense> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardContact>](#standard-text)...&lt;/standardContact> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDataLicenses>](#standard-text)...&lt;/standardDataLicenses> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDisclaimerOfEndorsement>](#standard-text)...&lt;/standardDisclaimerOfEndorsement> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDisclaimerOfExternalLinks>](#standard-text)...&lt;/standardDisclaimerOfExternalLinks> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardGeneralDisclaimer>](#standard-text)...&lt;/standardGeneralDisclaimer> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardPrivacyPolicy>](#standard-text)...&lt;/standardPrivacyPolicy> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;startHeadHtml5>](#standard-text)...&lt;/startHeadHtml5> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;startBodyHtml5>](#standard-text)...&lt;/startBodyHtml5> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;theShortDescriptionHtml>](#standard-text)...&lt;/theShortDescriptionHtml> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;endBodyHtml5>](#standard-text)...&lt;/endBodyHtml5> &lt;!-- 0 or 1 -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;user username="..." password="..." roles="..." />](#user) &lt;!-- 0 or more -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;dataset>](#list-of-types-datasets)...&lt;/dataset> &lt;!-- 1 or more -->  
  >&nbsp;&lt;/erddapDatasets>  

È possibile che altre codifiche saranno consentite in futuro, ma per ora, solo ISO-8859-1 è raccomandato.
 
### XI.{#xinclude} 
Nuovo nella versione 2.25 è il supporto per XInclude. Questo richiede che si sta utilizzando il parser SAX&lt;utilizzareSaxParser&gt;true&lt;/useSaxParser&gt; nel vostro setup.xml. Questo può consentire di scrivere ogni dataset nel proprio file, quindi includerli tutti nel principaledatasets.xml, riutilizzare parti di definizioni di dataset, o entrambi. Se vuoi vedere un esempio,[EDDTestDataset.java](https://github.com/ERDDAP/erddap/blob/main/src/test/java/testDataset/EDDTestDataset.java)imposta XInclude per riutilizzare le definizioni variabili.
 

- - No.

## Note{#notes} 

Lavorare con ildatasets.xmlfile è un progetto non banale. Si prega di leggere attentamente tutte queste note. Dopo aver scelto[tipo di dataset](#list-of-types-datasets), si prega di leggere la descrizione dettagliata di esso attentamente.
     
### Scegliere il tipo Dataset{#choosing-the-dataset-type} 
Nella maggior parte dei casi, c'è solo unoERDDAP™tipo di dataset appropriato per una data fonte di dati. In alcuni casi (ad esempio,.ncfile) , ci sono alcune possibilità, ma di solito uno di loro è sicuramente meglio. La prima e più grande decisione che dovete prendere è: è opportuno trattare il dataset come un gruppo di array multidimensionali (se così vedi[EDDGridtipi di dataset](#eddgrid)) o come una tabella di dati simile a database (se così vedi[Tipi di dataset EDDTable](#eddtable)) .
     
### Servire i dati come è{#serving-the-data-as-is} 
Di solito, non c'è bisogno di modificare la fonte di dati (ad esempio, convertire i file in un altro tipo di file) cosìERDDAP™può servire. Uno dei presupposti diERDDAP™è che la fonte di dati verrà utilizzata come è. Di solito questo funziona bene. Alcune eccezioni sono:
* Database relazionali e Cassandra --ERDDAP™può servire i dati direttamente da database relazionali e Cassandra. Ma per problemi di sicurezza, bilanciamento del carico e prestazioni, è possibile scegliere di impostare un altro database con gli stessi dati o salvare i dati perNetCDFV.ncfile e hannoERDDAP™servire i dati dalla nuova fonte di dati. Vedi[EDDTableDatabase](#eddtablefromdatabase)e[EDDTable FromCassandra](#eddtablefromcassandra).
* Fonti dati non supportate --ERDDAP™può supportare un gran numero di tipi di fonti di dati, ma il mondo è pieno di 1000 (milioni?) di diverse fonti di dati (in particolare, le strutture dei file di dati) . SeERDDAP™non supporta la fonte di dati:
    * Se la fonte di dati èNetCDF .ncfile, è possibile utilizzare[NCML](#ncml-files)per modificare i file di dati on-the-fly, o utilizzare[NCO](#netcdf-operators-nco)per modificare definitivamente i file di dati.
    * È possibile scrivere i dati a un tipo di sorgente dati cheERDDAP™supporti.NetCDF-3.nci file sono una buona, raccomandazione generale perché sono file binari cheERDDAP™può leggere molto rapidamente. Per i dati tabulari, considerare la memorizzazione dei dati in una raccolta di.ncfile che utilizzano[CFU Geometrie di smorzamento discreto (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Contiguous Ragged Array strutture di dati e così può essere gestito conERDDAP'[EDDTableFromNcCFFiles](#eddtablefromnccffiles)). Se sono organizzati logicamente (ciascuno con i dati per un pezzo di spazio e tempo) ♪ERDDAP™può estrarre i dati da loro molto rapidamente.
    * È possibile richiedere che venga aggiunto il supporto per tale fonte di datiERDDAP™e-mail Chris. John a Noaa.gov.
    * È possibile aggiungere supporto per quella fonte di dati scrivendo il codice per gestirlo da soli. Vedi[ilERDDAP™Guida del programmatore](/docs/contributing/programmer-guide)
* Velocità...ERDDAP™può leggere i dati da alcune fonti di dati molto più veloce di altri. Ad esempio, la letturaNetCDFV.ncfile è veloce e la lettura di file ASCII è più lento. E se c'è un grande (&gt; 1000) o enorme (&gt; 10.000) numero di file di dati di origine,ERDDAP™risponderà ad alcune richieste di dati lentamente. Di solito, la differenza non è evidente per gli esseri umani. Tuttavia, se si pensaERDDAP™è lento per un dato set di dati, è possibile scegliere di risolvere il problema scrivendo i dati a una configurazione più efficiente (di solito: alcuni, ben strutturati,NetCDFV.ncfile) . Per i dati tabulari, vedere[questo consiglio](#millions-of-files).
         
### Salve.{#hint} 
Spesso è più facile generare l'XML per un set di dati facendo una copia di una descrizione del set di dati di lavoro in dataset.xml e quindi modificandolo.
    
### Codifica caratteri speciali{#encoding-special-characters} 
Dadatasets.xmlè un file XML, DOVE[&-encode](https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Predefined_entities_in_XML)"&", "&lt;", e "&gt;" in qualsiasi contenuto come "&amp;", "&lt;", e "&gt;".
Sbagliato:&lt;Titolo Tempo e maree&lt;&gt;
Bene.&lt;Titolo Tempo e maree&lt;&gt;
     
### XML non tollera errori di sintassi{#xml-doesnt-tolerate-syntax-errors} 
Dopo aver modificato il file dataset.xml, è una buona idea verificare che il risultato sia[XML ben formato](https://www.w3schools.com/xml/xml_dtd.asp)incollando il testo XML in un checker XML come[xmlvalidazione](https://www.xmlvalidation.com/).
     
### Consigli per la risoluzione dei problemi{#troubleshooting-tips} 
*    **Altri modi per diagnosticare i problemi con i set di dati**   
Oltre ai due principali[Strumenti](#tools)♪
    *   [log.txt](/docs/server-admin/additional-information#log)è un file di log con tuttiERDDAPSono messaggi diagnostici.
    * The[Rapporto giornaliero](/docs/server-admin/additional-information#daily-report)ha più informazioni rispetto alla pagina di stato, incluso un elenco di set di dati che non hanno caricato e le eccezioni (errori) hanno generato.
    * The[Pagina di stato](/docs/server-admin/additional-information#status-page)è un modo rapido per controllareERDDAP's stato da qualsiasi browser web. Include un elenco di set di dati che non hanno caricato (anche se non le relative eccezioni) e attivitàStatistiche (mostrare il progresso[EDDGridCopia](#eddgridcopy)e[EDDTableCopy](#eddtablecopy)set di dati e qualsiasi[EDDGridDa Fili](#eddgridfromfiles)o[EDDTableFromFiles](#eddtablefromfiles)set di dati che utilizzano[cachedall'Url](#cachefromurl)  (ma non la cache Dimensione GB) ) .
    * Se ti bloccano, vedi il nostro[sezione per ottenere supporto aggiuntivo](/docs/intro#support).
         
### Variazioni speciali{#special-variables} 
*    **[La longitudine, latitudine, altitudine (o profondità) e il tempo (LL) variabile](#destinationname) [destinationName](#destinationname)sono speciali.** 
    * In generale:
        * Le variabili LLAT sono rese note aERDDAP™se la variabile dell'asse (perEDDGridset di dati) o variabili di dati (per set di dati EDDTable)  [destinationName](#destinationname)è "longitudine", "latitudine", "altitudine", "profondità", o"time".
        * Vi incoraggiamo fortemente a utilizzare questi nomi standard per queste variabili quando possibile. Nessuno di loro è richiesto. Se non si utilizzano questi nomi variabili speciali,ERDDAP™non riconosceranno il loro significato. Ad esempio, le variabili LLAT sono trattate appositamente da Make A Graph ( *datasetID* .) : se la variabile X Axis è "longitudine" e la variabile Y Axis è "latitudine", otterrete una mappa (utilizzando una proiezione standard, e con una maschera di terra, confini politici, ecc.) invece di un grafico.
        *   ERDDAP™aggiungerà automaticamente molti metadati a variabili LLAT (per esempio, "[ioos\\_category](#ioos_category)", "[unità](#units)", e diversi attributi correlati agli standard come "\\_CoordinateAxisType") .
        *   ERDDAP™automaticamente, on-the-fly, aggiungere un sacco di metadati globali relativi ai valori LLAT del sottoinsieme di dati selezionato (per esempio, "geospatial\\_lon\\_min") .
        * I clienti che supportano questi standard di metadati saranno in grado di sfruttare i metadati aggiunti per posizionare i dati nel tempo e nello spazio.
        * I client troveranno più facile generare query che includono variabili LLAT perché i nomi della variabile sono gli stessi in tutti i dataset rilevanti.
    * Per la variabile "longitudine" e la variabile "Latitudine":
        * Utilizzare[destinationName](#destinationname)s "longitudine" e "latitudine" solo se la[unità](#units)sono gradi\\_east e gradi\\_north, rispettivamente. Se i dati non si adattano a questi requisiti, utilizzare nomi variabili diversi (per esempio, x, y, lonRadians, latRadians) .
        * Se avete dati di longitudine e latitudine espressi in unità diverse e quindi con differentidestinationNames, per esempio, lonRadians e latRadians, fare un grafico ( *datasetID* .) farà grafici (per esempio, serie di tempo) invece delle mappe.
    * Per la variabile "altitude" e la variabile "profondità":
        * Utilizzare[destinationName](#destinationname)"latitudine" per identificare la distanza dei dati sopra il livello del mare (positivo="up" valori) . Opzionalmente, è possibile utilizzare "altitudine" per distanze sotto il livello del mare se i valori sono negativi sotto il mare (o se si utilizza, per esempio,
[&lt;#scale\\_factor"tipo="int"&gt;- 1&lt;/att&gt;] (#scale_factor) per convertire valori di profondità in valori di altitudine.
        * UtilizzaredestinationName"profondità" per identificare la distanza dei dati sotto il livello del mare (valori positivi="down") .
        * Un dataset potrebbe non avere variabili "altitudine" e "profondità".
        * Per questi nomi variabili, il[unità](#units)deve essere "m", "meter", o "meters". Se le unità sono diverse (per esempio, fathoms) , si può usare
[&lt;#scale\\_factor&gt; *alcuni Valore* &lt;/att&gt;] (#scale_factor) E...&lt;at name="units"&gt;meters&lt;/att&gt;] (# Units #) per convertire le unità a metri.
        * Se i dati non si adattano a questi requisiti, utilizzare un diversodestinationName  (per esempio, sopraGround, distanza ToBottom) .
        * Se si conosce il CRS verticale si prega di specificarlo nei metadati, ad esempio, "EPSG:5829" (Altezza istantanea sopra il livello del mare) , "EPSG:5831" (profondità istantanea sotto il livello del mare) , o "EPSG:5703" (Altezza NAVD88) .
    * Per il"time"variabile:
        * Utilizzare[destinationName](#destinationname) "time"solo per variabili che includono l'intera data+time (o data, se è tutto quello che c'è) . Se, ad esempio, ci sono colonne separate per data e oraOfDay, non usare il nome variabile"time".
        * Vedi[unità](#time-units)per maggiori informazioni sull'attributo delle unità per tempo e tempoStamp variabili.
        * La variabile di tempo e relativa[tempo Variazioni di francobolli](#timestamp-variables)sono unici in quanto convertono sempre i valori di dati dal formato di tempo della sorgente (qualunque cosa sia) in un valore numerico (secondi dal 1970-01-01T00:00:00:00Z) o un valore di stringa (ISO 8601:2004 (E) formato) , a seconda della situazione.
        * Quando un utente richiede dati temporali, può richiederlo specificando il tempo come valore numerico (secondi dal 1970-01-01T00:00:00:00Z) o un valore di stringa (ISO 8601:2004 (E) formato) .
        *   ERDDAP™ha una utilità per[Convertire un Numerico Tempo di / da un tempo di stress](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html).
        * Vedi[Come?ERDDAPOfferte con il tempo](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap).
            
### Perché solo due strutture di dati di base?{#why-just-two-basic-data-structures} 
* Dal momento che è difficile per i clienti umani e client di computer affrontare un insieme complesso di possibili strutture di dataset,ERDDAP™utilizza solo due strutture di dati di base:
    * a[struttura dati grigliata](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#dataModel)  (per esempio, per dati satellitari e dati di modello) e
    * a[struttura dei dati tabulati](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#dataModel)  (per esempio, per i dati in-situ buoy, stazione e traiettoria) .
* Certamente, non tutti i dati possono essere espressi in queste strutture, ma gran parte di esso può. Le tabelle, in particolare, sono strutture di dati molto flessibili (guardare il successo dei programmi di database relazionali) .
* Questo rende le query dei dati più facili da costruire.
* Ciò rende le risposte dei dati hanno una struttura semplice, che rende più facile servire i dati in una più ampia varietà di tipi di file standard (che spesso supporta solo semplici strutture di dati) . Questo è il motivo principale che abbiamo istituitoERDDAP™Da questa parte.
* Questo, a sua volta, rende molto facile per noi (o chiunque) scrivere software client che funziona con tuttiERDDAP™Datasets.
* Questo rende più facile confrontare i dati da diverse fonti.
* Siamo molto consapevoli che se si utilizza per lavorare con i dati in altre strutture di dati si può inizialmente pensare che questo approccio sia semplicistico o insufficiente. Ma tutte le strutture dei dati hanno degli scambi. Nessuno è perfetto. Anche le strutture do-it-all hanno i loro svantaggi: lavorare con loro è complesso e i file possono essere scritti o letti solo con librerie software speciali. Se accettiERDDAP's approccio abbastanza per cercare di lavorare con esso, si può scoprire che ha i suoi vantaggi (in particolare il supporto per più tipi di file che possono contenere le risposte dei dati) . The[ERDDAP™presentazione](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTechTalk.html)  (in particolare[strutture di dati slide](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTechTalk.html#dataStructures)) parla molto di questi problemi.
* E anche se questo approccio ti sembra strano, la maggior parteERDDAP™i clienti non noteranno mai -- vedranno semplicemente che tutti i dataset hanno una bella struttura semplice e saranno grati che possano ottenere i dati da una vasta gamma di fonti restituiti in una vasta gamma di formati di file.
         
### Dimensioni{#dimensions} 
*    **E se le variabili di rete nel dataset sorgente non condividono le stesse variabili di asse?**   
InEDDGriddatasets, tutte le variabili di dati (Condividi) tutte le variabili dell'asse. Quindi, se un dataset di origine ha alcune variabili con un insieme di dimensioni, e altre variabili con una diversa serie di dimensioni, dovrete fare due set di dati inERDDAP. Per esempio, si potrebbe fare unoERDDAP™dataset intitolato "Alcuni titoli (in superficie) " per tenere variabili che usano\\[tempo\\]\\[latitudine\\]\\[longitudine\\]dimensioni e ne fanno un altroERDDAP™dataset intitolato "Alcuni titoli (a profondità) " per tenere le variabili che utilizzano\\[tempo\\]\\[altitudine\\]\\[latitudine\\]\\[longitudine\\]. O forse è possibile modificare la fonte di dati per aggiungere una dimensione con un unico valore (per esempio, altitudine=0) per rendere le variabili coerenti.
    
    ERDDAP™non gestisce più set di dati complicati (per esempio, modelli che utilizzano una maglia di triangoli) Bene. È possibile servire questi set di dati inERDDAP™creando due o più set di dati inERDDAP™  (in modo che tutte le variabili di dati in ogni nuovo set di dati condividono lo stesso set di variabili di asse) , ma non è quello che gli utenti vogliono. Per alcuni set di dati, si potrebbe considerare di fare una regolare versione grigliata del dataset e l'offerta che oltre ai dati originali. Alcuni software client possono gestire solo una griglia regolare, quindi facendo questo, si raggiungono clienti aggiuntivi.
     
    
### Dati rettificati proiettati{#projected-gridded-data} 
Alcuni dati grigliati hanno una struttura complessa. Ad esempio, livello satellitare 2 ("along track") i dati non utilizzano una semplice proiezione. Modelli (e altri) spesso lavorano con dati grigliati su varie proiezioni non cilindriche (per esempio, conico, polare stereographic, tripolar) o in reti non strutturate (una struttura dati più complessa) . Alcuni utenti finali vogliono questi dati, così non c'è perdita di informazioni. Per quei clienti,ERDDAP™può servire i dati, come è, solo seERDDAP™l'amministratore interrompe il dataset originale in alcuni set di dati, con ogni parte comprese variabili che condividono le stesse variabili di asse. Sì, sembra strano per le persone coinvolte ed è diverso dalla maggior parteOPeNDAPserver. MaERDDAP™sottolinea rendere i dati disponibili in molti formati. Questo è possibile perchéERDDAP™utilizza/richiede una struttura dati più uniforme. Anche se è un po' imbarazzante (cioè, diverso dal previsto) ♪ERDDAP™può distribuire i dati proiettati.

\\[Sì,ERDDAP™potrebbe avere più requisiti per la struttura dei dati, ma mantenere i requisiti per i formati di output. Ma questo porterebbe a confusione tra molti utenti, in particolare i neofiti, poiché molte richieste apparentemente valide per i dati con strutture diverse sarebbero invalide perché i dati non si adattano al tipo di file. Continuiamo a tornare al design del sistema attuale.\\]

Alcuni utenti finali vogliono i dati in una proiezione cilindrica lat lon come Equirectangular / plate carrée o Mercator) per facilità d'uso in situazioni diverse. Per queste situazioni, incoraggiamoERDDAP™amministratore per utilizzare alcuni altri software (NCO?Matlab? R? IDV? ...?) per riprogettare i dati su un geografico (Proiezione equirettangolare / piastra carrée) o altra proiezione cilindrica e servire quella forma dei dati inERDDAP™come dataset diverso. Questo è simile a quello che le persone fanno quando convertono i dati del livello 2 del satellite in dati di livello 3. Uno di questi strumenti è[NCO](https://nco.sourceforge.net/nco.html#Regridding)che offre opzioni di estensione per la registrazione dei dati.

#### GIS e Reprojecting Data{#gis-and-reprojecting-data} 
Dal momento che il mondo GIS è spesso orientato alla mappa, i programmi GIS di solito offrono supporto per la riproiezione dei dati, cioè, la trama dei dati su una mappa con una proiezione diversa.

Attualmente,ERDDAP™non ha strumenti per riprogettare i dati. Invece, si consiglia di utilizzare uno strumento esterno per fare una variante del dataset, dove i dati sono stati riprogettati dalla sua forma originale su una rettangolare (latitudine longitudine) array adatto perERDDAP.

A nostro parere, il CF/DAPil mondo è un po' diverso dal mondo GIS e lavora a un livello leggermente inferiore.ERDDAP™riflette questo. In generale,ERDDAP™è progettato per funzionare principalmente con i dati (non mappe) e non vuole cambiare (ad esempio, riprogetto) quei dati. PerERDDAP™, i dati grigliati sono spesso/solitamente/preferibilmente associati ai valori lat lon e a una proiezione cilindrica, e non alcuni valori x,y di proiezione. In ogni caso,ERDDAP™non fa nulla con la proiezione dei dati; semplicemente passa i dati attraverso, come è, con la sua proiezione attuale, sulla teoria che una riproiezione è un cambiamento significativo ai dati eERDDAP™non vuole essere coinvolto con cambiamenti significativi. Inoltre, gli utenti successivi potrebbero ingenuamente riprogettare i dati di nuovo, che non sarebbe così buono come solo fare una riproiezione. (Quindi, se ilERDDAP™l'amministratore vuole offrire i dati in una diversa proiezione, fine; basta riprogettare i dati offline e offrire che come dataset diverso inERDDAP. Un sacco di dataset satellitari sono offerti come ciò che la NASA chiama Livello 2 (Scambio) e come Livello 3 (Proiezione equattangolare) versioni.) QuandoERDDAP™rende le mappe (direttamente o viaWMSo KML) ♪ERDDAP™Attualmente solo offre di fare mappe con la proiezione di carrée Equirectangular / Plate che, fortunatamente, è accettato dalla maggior parte dei programmi di mappatura.

Noi incoraggiamoERDDAP™amministratori per utilizzare alcuni altri software (NCO?Matlab? R? IDV? ...?) per riprogettare i dati su un geografico (Proiezione equirettangolare / piastra carrée) o altra proiezione cilindrica e servire quella forma dei dati inERDDAP™come dataset diverso. Questo è simile a quello che le persone fanno quando convertono i dati del livello 2 del satellite in dati di livello 3. Uno di questi strumenti è[NCO](https://nco.sourceforge.net/nco.html#Regridding)che offre opzioni di estensione per la registrazione dei dati.

Speriamo cheERDDAP™avrà strumenti integrati per offrire mappe con altre proiezioni in futuro. Speriamo anche di avere legami migliori con il mondo del GIS in futuro (diverso dalla correnteWMSservizio) . È terribile che in questo mondo "moderno", i legami tra il CF/DAPil mondo e il mondo del GIS sono ancora così deboli. Entrambe queste cose sono nella lista "To Do". (Se si desidera aiutare, in particolare con la connessioneERDDAP™a MapServer, si prega di e-mail Chris. John a noaa.gov.) 
    
### Tipi di dati{#data-types} 
ERDDAP™supporta i seguenti tipi di dati
 (i nomi sono sensibili al caso;'u'prefisso sta per "non firmato"; il numero molti dei nomi in altri sistemi è il numero di bit) :

#### byte{#byte} 
*    **byte** ha firmato valori interi con una gamma di -128 a 127.
In altri sistemi, questo è talvolta chiamato int8.
Si chiama "tinyint" di SQL e Cassandra.
    ERDDAP™converti[boolean](#boolean-data)da alcune fonti (ad esempio, SQL e Cassandra) in byte inERDDAP™con un valore di 0=false, 1=true, e 127=missing\\_value.
#### Ubyte{#ubyte} 
*    **Ubyte** ha valori interi senza firma con un range da 0 a 255.
In altri sistemi, questo è talvolta chiamato uint8.
#### breve{#short} 
*    **breve** ha firmato valori interi con una gamma di -32768 a 32767.
In altri sistemi, questo è talvolta chiamato int16.
Questo è chiamato "piccolo" di SQL e Cassandra.
#### noihort{#ushort} 
*    **noihort** ha valori interi senza firma con una gamma da 0 a 65535.
In altri sistemi, questo è talvolta chiamato uint16.
#### In{#int} 
*    **In** ha firmato valori interi con una gamma di -2147483648 a 2147483647.
In altri sistemi, questo è talvolta chiamato int32.
Questo si chiama "integer|numerico (?) "di SQL e "int" di Cassandra.
#### U.{#uint} 
*    **U.** ha valori interi senza firma con una gamma da 0 a 4294967295.
In altri sistemi, questo è talvolta chiamato uint32.
#### lungo{#long} 
*    **lungo** ha firmato valori interi con una gamma di -9223372036854775808 a 9223372036854775807.
In altri sistemi, questo è talvolta chiamato int64.
Questo si chiama "bigint|numerico (?) "di SQL e "bigint" di Cassandra.
Poiché molti tipi di file non supportano i dati lunghi, il loro utilizzo è scoraggiato. Quando possibile, utilizzare il doppio invece (vedi sotto) .
#### *{#ulong} 
*    ***** ha valori interi senza firma con una gamma da 0 a 18446744073709551615
In altri sistemi, questo è talvolta chiamato uint64.
Poiché molti tipi di file non supportano i dati ulong, il loro uso è scoraggiato. Quando possibile, utilizzare il doppio invece (vedi sotto) .
#### galleggiante{#float} 
*    **galleggiante** è un galleggiante IEEE 754 con una gamma di circa +/- 3.402823466e+38.
In altri sistemi, questo è talvolta chiamato float32.
Questo si chiama "reale"|galleggiante (?) |decimale (?) |numerico (?) "di SQL e "float" di Cassandra.
Il valore speciale NaN significa Not-a-Number.
    ERDDAP™converte i valori infiniti positivi e negativi in NaN.
#### doppio{#double} 
*    **doppio** è un IEEE 754 doppio con una gamma di circa
+/- 1.7976931348623157E+308.
In altri sistemi, questo è talvolta chiamato float64.
Questo si chiama "doppia precisione|galleggiante (?) |decimale (?) |numerico (?) "di SQL e "doppio" di Cassandra.
Il valore speciale NaN significa Not-a-Number.
    ERDDAP™converte i valori infiniti positivi e negativi in NaN.
#### carbone{#char} 
*    **carbone** è un singolo, 2 byte (16 bit)  [Unicode UCS-2 carattere](https://en.wikipedia.org/wiki/UTF-16)da\\u0000  (#) attraverso\\uffff  (#65535 #) .
    \\uffffLa definizione è Not-a-Character, analoga ad un doppio valore di NaN.
L'uso di char è scoraggiato perché molti tipi di file non supportano i carboni o supportano solo i carboni da 1 byte (vedi sotto) . Considera di usare String.
Gli utenti possono utilizzare variabili di beneficenza per fare grafici.ERDDAP™convertirà i caratteri al loro numero di codice Unicode, che può essere utilizzato come dati numerici.
#### String{#string} 
*    **String** è una sequenza di 0 o più, 2 byte (16 bit)  [Unicode UCS-2 caratteri](https://en.wikipedia.org/wiki/UTF-16).
    ERDDAP™utilizza/interpreta una stringa 0-lunghezza come valore mancante.ERDDAP™non supporta una vera stringa null.
La lunghezza massima teorica della stringa è 2147483647 caratteri, ma ci sono probabilmente vari problemi in vari luoghi anche con stringhe un po 'più corte.
UsoERDDAP's String for SQL's carattere, varchar, carattere variabile, binario, varbinary, intervallo, array, multiset, xml, e qualsiasi altro tipo di dati del database che non si adatta in modo pulito con qualsiasi altroERDDAP™tipo di dati.
UsoERDDAP's String for Cassandra's "text" e qualsiasi altro tipo di dati Cassandra che non si adatta in modo pulito con qualsiasi altroERDDAP™tipo di dati.
     

PrimaERDDAP™V2.10,ERDDAP™non ha supportato i tipi interi non firmati internamente e ha offerto un supporto limitato nei suoi lettori e scrittori di dati.
    
### Limitazioni di tipo di dati{#data-type-limitations} 
Si può pensareERDDAP™come sistema che ha set di dati virtuali, e che funziona leggendo i dati dalla fonte di un dataset in un modello di dati interno e scrivendo i dati a vari servizi (ad esempio,(OPeN)DAP♪WMS) e tipi di file in risposta alle richieste degli utenti.

* Ogni lettore di input supporta un sottoinsieme dei tipi di dati cheERDDAP™supporti. Così la lettura dei dati inERDDAPLa struttura dei dati interni non è un problema.
* Ogni produttore di output supporta anche un sottoinsieme di tipi di dati. Questo è un problema perchéERDDAPdeve spremere, per esempio, dati lunghi in tipi di file che non supportano i dati lunghi.
     

Qui di seguito sono le spiegazioni dei limiti (o nessuno) di vari scrittori di uscita e comeERDDAP™si occupa dei problemi. Tali complicazioni sono una parte intrinseca diERDDAPl'obiettivo di rendere interoperabili sistemi disparati.

#### ASCII{#ascii} 
* ASCII (.csv,.tsv, ecc.) file di testo -
    * Tutti i dati numerici sono scritti tramite la sua rappresentazione String (con valori di dati mancanti che appaiono come stringhe di 0-lunghezza) .
    * Anche seERDDAP™scrive valori lunghi e ulong correttamente ai file di testo ASCII, molti lettori (ad esempio, programmi di foglio di calcolo) non può trattare correttamente con valori lunghi e ulong e invece convertirli in valori doppi (con perdita di precisione in alcuni casi) .
    * I dati Char e String sono scritti tramite JSON Strings, che gestiscono tutti i caratteri Unicode (in particolare, i caratteri "insoliti" al di là di ASCII #127, ad esempio, il carattere Euro appare come "\\u20ac") .
    
        
#### JSON{#json} 
* JSON (.json♪.jsonlCSV, ecc.) file di testo -
    * Tutti i dati numerici sono scritti tramite la sua rappresentazione String.
    * I dati Char e String sono scritti come JSON Strings, che gestiscono tutti i caratteri Unicode (in particolare, i caratteri "insoliti" al di là di ASCII #127, ad esempio, il carattere Euro appare come "\\u20ac") .
    * I valori mancanti per tutti i tipi di dati numerici appaiono nulli.
         
#### .nc3 file{#nc3-files} 
*   .nc3 file non supportano in modo nativo alcun tipo di dati interi non firmati. Prima di CF v1.9, CF non ha supportato tipi interi non firmati. Per affrontare questo,ERDDAP™2.10+ segue lo standard NUG e aggiunge sempre un attributo "\\_Unsigned" con un valore di "vero" o "falso" per indicare se i dati provengono da una variabile non firmata o non firmata. Tutti gli attributi interi sono scritti come attributi firmati (ad esempio, byte) con valori firmati (ad esempio, un ubyteactual\\_rangeattributo con valori da 0 a 255, appare come attributo byte con valori da 0 a -1 (l'inverso del valore di complemento dei due del valore out-of-range). Non c'è modo facile di sapere quali (segnati) attributi interi devono essere letti come attributi non firmati.ERDDAP™supporta l'attributo "\\_Unsigned" quando legge.nc3 file.
*   .nc3 file non supportano i tipi di dati lunghi o lunghi.ERDDAP™si occupa di questo convertendoli temporaneamente in due variabili. I doppi possono rappresentare esattamente tutti i valori fino a +/- 9,007,199,254,740,992 che è 2^53. Questa è una soluzione imperfetta.Unidatarifiuta di fare un aggiornamento minore per.nc3 per affrontare questo e problemi connessi, citando.nc4 (un cambiamento importante) come soluzione.
* La specifica CF (prima della data) ha detto che supporta un tipo di dati di beneficenza, ma non è chiaro se char è destinato solo come i blocchi di costruzione di array di beneficenza, che sono efficacemente Strings. Le domande alla loro mailing list hanno fornito solo risposte confuse. A causa di queste complicazioni, è meglio evitare variabili di carbone inERDDAP™e usare variabili di stringa quando possibile.
* Tradizionalmente,.nc3 file supportati solo stringhe con codifica ASCII (7 bit, #0 - #127) caratteri. NUG (eERDDAP) estendere (a partire dal 2017) includendo l'attributo "\\_Encoding" con un valore di "ISO-8859-1" (un'estensione di ASCII che definisce tutti i 256 valori di ogni carattere a 8 bit) o "UTF-8" per indicare come i dati String sono codificati. Altre codifiche possono essere legali ma scoraggiate.
         
#### .nc4 file{#nc4-files} 
*   .nc4 file supportano tuttiERDDAPi tipi di dati.
    
#### File NCCSV{#nccsv-files} 
I file NCCSV 1.0 non supportano i tipi di dati interi non firmati.
[File NCCSV 1.1+](/docs/user/nccsv-1.00)supporta tutti i tipi di dati interi non firmati.
     
#### DAP {#dap} 
*   (OPeN)DAP  (.das, .dds, .asc file ASCII e .dods file binari) - No.
    *   (OPeN)DAPmaniglie brevi, ushort, int, uint, galleggiante e doppi valori correttamente.
    *   (OPeN)DAPha un tipo di dati "byte" che definisce come non firmato, mentre storicamente, THREDDS eERDDAP™hanno trattato "byte" come firmato nel loro(OPeN)DAPservizi. Per affrontare meglio questo,ERDDAP™2.10+ segue lo standard NUG e aggiunge sempre un attributo "\\_Unsigned" con un valore di "vero" o "falso" per indicare se i dati sono ciòERDDAP™chiama byte o ubyte. Tutti gli attributi byte e ubyte sono scritti come attributi "byte" con valori firmati (ad esempio, un ubyteactual\\_rangeattributo con valori da 0 a 255, appare come attributo byte con valori da 0 a -1 (l'inverso del valore di complemento dei due del valore out-of-range). Non c'è modo facile di sapere quali attributi "byte" devono essere letti come attributi ubyte.
    *   (OPeN)DAPnon supporta lunghi firmati o non firmati.ERDDAP™si occupa di questo convertendoli temporaneamente in due variabili e attributi. I doppi possono rappresentare esattamente tutti i valori fino a 9,007,199,254,740,992 che è 2^53. Questa è una soluzione imperfetta.OPeNDAP  (l'organizzazione) rifiuta di fare un aggiornamento minore perDAP2.0 per affrontare questo e problemi correlati, citandoDAP4 (un cambiamento importante) come soluzione.
    * Perché?(OPeN)DAPnon ha alcun tipo di dati di beneficenza separato e tecnicamente supporta solo i caratteri ASCII 1 byte (#0 - #127) in Strings, le variabili di dati di beneficenza appariranno come stringhe lunghe 1-character in(OPeN)DAP.das, .dds e .dods risposte.
    * Tecnicamente, il(OPeN)DAPla specifica supporta solo stringhe con caratteri codificati ASCII (#0 - #127) . NUG (eERDDAP) estendere (a partire dal 2017) includendo l'attributo "\\_Encoding" con un valore di "ISO-8859-1" (un'estensione di ASCII che definisce tutti i 256 valori di ogni carattere a 8 bit) o "UTF-8" per indicare come i dati String sono codificati. Altre codifiche possono essere legali ma scoraggiate.
         
### Tipo di dati{#data-type-comments} 
* A causa del povero supporto per lunghi, ulong e dati di beneficenza in molti tipi di file, scoraggiamo l'uso di questi tipi di dati inERDDAP. Quando possibile, utilizzare il doppio invece di lungo e lungo, e utilizzare String invece di carbone.
     
* Metadati - Perché(OPeN)DAP's .das e .dds risposte non supportano attributi lunghi o ulong o tipi di dati (e invece mostrare loro come doppie) , potresti invece voler usareERDDAPLa rappresentazione tabulare dei metadati come si vede nellahttp... **Informazioni** / *datasetID* Pagina web .html (per esempio,[ https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html) )   (che è anche possibile ottenere in altri tipi di file, ad esempio, .csv,.htmlTable♪.itx♪.json♪.jsonlCSV1♪.jsonlCSV♪.jsonlKVP♪.mat♪.nc♪.nccsv♪.tsv♪.xhtml) o.nccsvRisposta dei metadati (per esempio,[ https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata)Anche se.nccsvI metadati sono disponibili solo per i set di dati tabulari) , entrambi supportano tutti i tipi di dati (in particolare, lungo, ulong e char) .
         
### File multimediali{#media-files} 
Non tutti i dati sono array di numeri o di testo. Alcuni dataset sono costituiti da o includono file multimediali, come immagini, audio e file video.ERDDAP™ha alcune caratteristiche speciali per rendere più facile per gli utenti di ottenere l'accesso ai file multimediali. E' un processo di due fasi:
 

1. Rendere ogni file accessibile tramite il proprio URL, tramite un sistema che supporta le richieste dell'intervallo byte.
Il modo più semplice per farlo è mettere i file in una directory cheERDDAP™ha accesso a. (Se sono in un contenitore come.zipfile, staccarli, anche se si può desiderare di offrire.zipfile anche agli utenti.) Allora, fai un[EDDTableFromFileNames](#eddtablefromfilenames)dataset per rendere accessibili tali file tramiteERDDAP™, in particolare viaERDDAP'["files"sistema](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html).
    
Tutti i file resi accessibili tramite EDDTableFromFileNames eERDDAP'"files"supporto di sistema[byte gamma richieste](https://en.wikipedia.org/wiki/Byte_serving). Normalmente, quando un cliente (ad esempio, un browser) fa una richiesta a un URL, ottiene l'intero file come risposta. Ma con una richiesta di intervallo byte, la richiesta specifica una gamma di byte dal file, e il server restituisce solo quelle byte. Questo è importante qui perché i lettori audio e video nei browser funzionano solo se il file può essere accessibile tramite le richieste dell'intervallo byte.
    
Opzionale: Se si dispone di più di un set di dati con i file multimediali associati, è possibile fare solo un EDDTableFromFileNames che ha una sottocartella per ogni gruppo di file. Il vantaggio è che quando si desidera aggiungere nuovi file multimediali per un nuovo dataset, tutto quello che dovete fare è creare una nuova cartella e mettere i file in quella cartella. La cartella e i file verranno aggiunti automaticamente al dataset EDDTableFromFileNames.
    
2. Opzionale: Se hai un set di dati che include riferimenti ai file multimediali, aggiungilo aERDDAP.
Ad esempio, si può avere un file .csv con una riga per ogni volta che qualcuno ha visto una balena e una colonna che include il nome di un file di immagine relativo a tale avvistamento. Se il nome del file immagine è solo il nome del file, ad esempio, Img20141024T192403Z, non un URL completo, allora è necessario aggiungere[fileAccessBase Url e/o fileAccessSuffix](#fileaccessbaseurl)attributi ai metadati per questodataVariableche specifica la baseURL e il suffisso per quei nomi di file. Se hai reso i file accessibili tramite EDDTableFromFileNames, l'URL sarà nel modulo
     *di base* /erddap/files/ *datasetID* /
Per esempio,
```
        <att name="fileAccessBaseUrl">*someBaseURL*</a>  
        <att name="fileAccessSuffix">.png</a>
```
        
Se c'è un.zipo altro file contenitore con tutti i file multimediali relativi a una variabile di dati, si consiglia di rendere anche quel file accessibile agli utenti (vedi passo 1 sopra) e poi identificarlo con un[fileAccessArchive Ur](#fileaccessarchiveurl)attributo.
    

\\[A partire daERDDAP™Voce principale:\\]Se fai il primo passo sopra (o entrambi i passaggi) , allora quando un utente visualizza ilERDDAP™ "files"sistema per quel dataset (o chiede di vedere un sottoinsieme del dataset tramite un.htmlTablerichiesta, se hai fatto il secondo passo) ♪ERDDAP™mostrerà un'icona '?' a sinistra del nome del file. Se l'utente salta su quell'icona, vedrà un popup che mostra l'immagine, o un lettore audio, o un lettore video. I browser supportano solo un numero limitato di tipi di

* immagine (di solito .gif, .jpg, e .png) ♪
* audio (di solito .mp3, .ogg, e .wav) e
* file video (di solito .mp4, .ogv, e . webm) .

Il supporto varia con diverse versioni di diversi browser su diversi sistemi operativi. Quindi, se avete una scelta di quale tipo di file da offrire, ha senso offrire questi tipi.

Oppure, se un utente clicca sul nome del file mostrato su unERDDAP™pagina web, il loro browser mostrerà l'immagine, il file audio o video come una pagina web separata. Questo è per lo più utile per vedere un'immagine molto grande o un video scalato a schermo intero, invece di in un popup.
    
### Lavorare con AWS S3 file{#working-with-aws-s3-files} 
[Servizio web Amazon (AWS) ](https://aws.amazon.com)è un venditore di[cloud computing](https://en.wikipedia.org/wiki/Cloud_computing)servizi.[S3](https://aws.amazon.com/s3/)è un sistema di archiviazione di oggetti offerto da AWS. Invece del sistema gerarchico di directory e file di un file system tradizionale (come un disco rigido nel tuo PC) , S3 offre solo "buchi" che tengono "oggetti" (noi li chiameremo"files") .

Per i file ASCII (ad esempio, .csv) ♪ERDDAP™può lavorare con i file nei secchi direttamente. L'unica cosa che devi fare è specificare il&lt;fileDir&gt; per il set di dati utilizzando un formato specifico per il secchio AWS, ad esempio, https://*bucketName*.s3.*aws-region*.amazonaws.com/*subdirectory*/ . Non dovresti usare&lt;cacheFromUrl&gt; . Vedere di seguito per i dettagli.

Ma per i file binari (ad esempio,.nc, .grib, .bufr e.hdffile) , devi usare il&lt;cacheFromUrl&gt; sistema descritto di seguito.ERDDAP, netcdf-java (cheERDDAP™utilizza per leggere i dati da questi file) , e altri software di dati scientifici sono progettati per lavorare con i file in un file system tradizionale che offre[livello di blocco](https://en.wikipedia.org/wiki/Block-level_storage)accesso ai file (che consente la lettura di pezzi di un file) , ma S3 offre solo[livello di file (oggetto) ](https://en.wikipedia.org/wiki/Block-level_storage)accesso ai file (che permette solo di leggere l'intero file) . AWS offre un'alternativa a S3,[Negozio di blocco elastico (EBS) ](https://aws.amazon.com/ebs/)), che supporta l'accesso a livello di blocco ai file, ma è più costoso di S3, quindi è raramente utilizzato per la memorizzazione in massa di grandi quantità di file di dati. (Così quando la gente dice di memorizzare i dati nel cloud (S3) è economico, di solito è un confronto di mele arance.) 

#### S3 Secchi{#s3-buckets} 
 **Il contenuto di un secchio. Le chiavi. Oggetti, delimitatori.**   
Tecnicamente, i secchi S3 non sono organizzati in una struttura di file gerarchici come un file system su un computer. Invece, i secchi contengono solo "oggetti" (file) , ognuno dei quali ha un "chiave" (un nome) . Un esempio di chiave in quel secchio noaa-goes17 è

```
ABI-L1b-RadC/2019/235/22/OR\\_ABI-L1b-RadC-M6C01\\_G17\\_s20192352201196\\_e20192352203569\\_c20192352204013.nc
```
L'URl corrispondente per quell'oggetto è

[ https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/2019/235/22/OR\\_ABI-L1b-RadC-M6C01\\_G17\\_s20192352201196\\_e20192352203569\\_c20192352204013.nc ](https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/2019/235/22/OR_ABI-L1b-RadC-M6C01_G17_s20192352201196_e20192352203569_c20192352204013.nc)

AWS supporta una piccola variazione nel modo in cui l'URL è costruito, maERDDAP™richiede questo formato specifico:
   https://*bucketName*.s3.*region*.amazonaws.com/*key*   
È pratica comune, come con questo esempio, far apparire i nomi chiave come un percorso gerarchico più un nome di file, ma tecnicamente non lo sono. Poiché è comune e utile,ERDDAP™tratta le chiavi con /'s come se fossero un percorso gerarchico più il nome del file, e questa documentazione li farà riferimento come tale. Se le chiavi di un secchio non usano /'s (ad esempio, una chiave come
ABI-Lib.2018.052.22.OR\\_ABI-L1b-RadM2-M3C10\\_G16\\_s20180522247575ERDDAP™tratterà l'intera chiave come nome di file lungo.

Secchi privati e pubblici -- L'amministratore del secchio S3 può rendere pubblico o privato il secchio e il suo contenuto. Se pubblico, qualsiasi file nel secchio può essere scaricato da chiunque utilizzi l'URL per il file. Amazon ha un[Dati aperti](https://aws.amazon.com/opendata/)programma che ospita i set di dati pubblici (compresi i dati daNOAA, NASA e USGS) gratuitamente e non addebita a nessuno di scaricare i file da quei secchi. Se un secchio è privato, i file nel secchio sono accessibili solo agli utenti autorizzati e AWS addebita una tassa (di solito pagato dal proprietario del secchio) per scaricare i file in un computer S3 non AWS.ERDDAP™può lavorare con i dati in secchi pubblici e privati.

#### AWS Credenziali{#aws-credentials} 
per far sì cheERDDAP™può leggere il contenuto di benne private, è necessario credenziali AWS e è necessario memorizzare un file credenziali nel luogo standard in modo daERDDAP™può trovare le informazioni. Vedere il SDK AWS perJavaDocumentazione 2.x:[Impostare le credenziali di default](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/setup.html#setup-credentials). (L'opzione per memorizzare i valori comeJavaparametri della riga di comando in\\[tomcat\\]/bin/setenv.sh può essere una buona opzione.) 
#### AWS /files/{#aws-files} 
* /files/ system -- TheERDDAP™ [/files/ sistema](#accessibleviafiles)consente agli utenti di scaricare i file sorgente per un dataset. Si consiglia di accendere questo per tutti i dataset con i file di origine perché molti utenti vogliono scaricare i file di origine originali.
    * Se i file sono in un secchio S3 privato, la richiesta dell'utente di scaricare un file verrà gestita daERDDAP™, che leggerà i dati dal file e poi lo trasmetterà all'utente, aumentando così il carico sul vostroERDDAP™, usando la larghezza di banda in entrata e in uscita, e facendoti (ilERDDAP™amministratore) pagare la tassa di avanzamento dei dati a AWS.
    * Se i file sono in un secchio S3 pubblico, la richiesta dell'utente di scaricare un file verrà reindirizzata all'URL AWS S3 per quel file, in modo che i dati non fluiscano attraversoERDDAP™, riducendo così il carico suERDDAP. E se i file sono in un Amazon Open Data (gratis) secchio pubblico, poi tu (ilERDDAP™amministratore) non dovrà pagare alcuna tassa di egresso dei dati a AWS. Così, c'è un grande vantaggio che serve i dati da pubblico (non privato) Secchi S3 e un enorme vantaggio per servire i dati da Amazon Open Data (gratis) Secchi.

#### ERDDAP™e AWS S3 Buckets{#erddap-and-aws-s3-buckets} 
[ **ERDDAP™e AWS S3 Buckets** ](#erddap-and-aws-s3-buckets)  
Fortunatamente, dopo molto sforzo,ERDDAP™ha una serie di caratteristiche che permettono di affrontare i problemi inerenti al lavoro con l'accesso a livello di blocco di S3 ai file in modo ragionevolmente efficiente:

*   \\[Disclaimer: Lavorare con i secchi AWS S3 è molto lavoro in più. AWS è un enorme ecosistema di servizi e caratteristiche. C'è molto da imparare. Ci vuole tempo e fatica, ma è fattibile. Sii paziente e farai funzionare le cose. Cerca/chiedi aiuto
([Documentazione AWS](https://aws.amazon.com/documentation/gettingstarted/), siti web come[Stack Overflow](https://stackoverflow.com/), e il regolare
    [ERDDAP™opzioni di supporto](/docs/intro#support)) se/quando vi bloccate.\\]  
     
* Può essere difficile perfino scoprire la struttura della directory e i nomi dei file dei file in un secchio S3.ERDDAP™ha una soluzione per questo problema: EDDTableFromFileNames ha uno speciale[\\*\\*\\*dall'inizio](#fromonthefly)opzione che consente di fare un EDDTableFromFileNames dataset che consente agli utenti di navigare il contenuto di un secchio S3 (e scaricare i file) tramite il dataset"files"opzione. C'è un[esempio di questo di seguito](#viewing-the-contents-of-a-bucket).
     
*   ERDDAP™può leggere i dati da[file di dati compressi esternamente](#externally-compressed-files), quindi va bene se i file su S3 vengono memorizzati come.gz♪.gzip♪.bz2, .Z, o altri tipi di file di dati compressi esternamente, che possono drammaticamente (2 - 20X) ridurre i costi di archiviazione dei file. Non c'è spesso alcuna penalità di tempo per l'utilizzo di file compressi esternamente, dal momento che il tempo salvato trasferendo un file più piccolo da S3 aERDDAPapprossimativamente bilancia il tempo extra necessario perERDDAP™decomprimere il file. Per utilizzare questa funzione, è sufficiente assicurarsi che il set di dati&lt;fileNameRegex&gt; consente il tipo di file compresso (ad esempio, aggiungendo (|.gz) alla fine del regex) .
     
* Per il caso più comune, dove hai unERDDAP™installato sul PC per il test/sviluppo e dove il dataset ha file di dati binari che vengono memorizzati come oggetti in un secchio S3, un approccio per ottenere il dataset inERDDAP™è:
    1. Crea una directory sul tuo PC per tenere alcuni file di dati di prova.
    2. Scarica due file di dati dalla sorgente alla directory appena creata.
    3. Uso[GenerareDatasetsXml](#generatedatasetsxml)per generare il pezzo didatasets.xmlper il dataset basato sui due file di dati locali.
    4. Verificare che tale dataset funzioni come desiderato[DasDds](#dasdds)e/o il tuo localeERDDAP.
        
         **I seguenti passaggi fanno una copia di quel dataset (che otterrà i dati dal secchio S3) su un pubblicoERDDAP.** 
        
    5. Copia il pezzo didatasets.xmlper il dataset aldatasets.xmlper il pubblicoERDDAP™che servirà i dati.
    6. Creare una directory sul pubblicoERDDAPIl disco rigido locale per contenere una cache di file temporanei. La directory non userà molto spazio su disco (vedi cacheSizeGB qui sotto) .
    7. Modificare il valore del dataset&lt;fileDir&gt; tag in modo che punti alla directory appena creato (anche se la directory è vuota) .
    8. Aggiungi un[cachedall'Url](#cachefromurl)tag che specifica il nome del secchio del dataset e il prefisso opzionale (i.e., directory) nella specifica[Aws S3 URL Formato cheERDDAP™richiede](#accessing-files-in-an-aws-s3-bucket).
    9. Aggiungi un [&lt;cacheSizeGB&gt;] (# Cachefromurl #) tag al set di dati xml (ad esempio, 10 è un buon valore per la maggior parte dei set di dati) per direERDDAP™per limitare la dimensione della cache locale (cioè, non cercare di nascondere tutti i file remoti) .
    10. Vedi se funziona in pubblicoERDDAP. Nota che la prima voltaERDDAP™carica il dataset, ci vorrà molto tempo per caricare, perchéERDDAP™ha bisogno di scaricare e leggere tutti i file di dati.
        
Se il dataset è un'enorme raccolta di file di dati grigliati, questo richiederà molto tempo e sarà impraticabile. In alcuni casi, per i file di dati grigliati,ERDDAP™può estrarre le informazioni necessarie (ad esempio, il punto di tempo per i dati in un file di dati grigliato) dal nome del file ed evitare questo problema. Vedi[Aggregazione tramite Nome di file](#aggregation-via-file-names-or-global-metadata).
        
    11. Opzionalmente (ma soprattutto per EDDTableFromFiles datasets) , si può aggiungere un[nParti](#nthreads)tag al dataset da raccontareERDDAPutilizzare più di 1 thread quando si risponde alla richiesta di dati di un utente. Ciò minimizza gli effetti del ritardo che si verifica quandoERDDAP™legge i file di dati da (telecomando) Secchi AWS S3 nella cache locale e (Forse) decomprimendoli.

#### AWS S3 Dati aperti{#aws-s3-open-data} 
Come parte diNOAA'[Big Data Program](https://www.noaa.gov/nodd/about)♪NOAAha partnership con cinque organizzazioni, tra cui AWS, "per esplorare i potenziali vantaggi di memorizzare copie di osservazioni chiave e uscite di modelli nel Cloud per consentire il calcolo direttamente sui dati senza richiedere ulteriore distribuzione". AWS include i dataset che ottiene daNOAAcome parte del suo programma per offrire accesso pubblico a una grande collezione di[Dati aperti su AWS S3](https://registry.opendata.aws/)da qualsiasi computer, se si tratta di un'istanza di calcolo Amazon (un computer affittato) sulla rete AWS o il proprio PC su qualsiasi rete. L'esempio seguente presuppone che si sta lavorando con un set di dati accessibile pubblicamente.

#### Accedere ai file in un secchio AWS S3{#accessing-files-in-an-aws-s3-bucket} 
Per un secchio dati S3 privato, il proprietario del secchio deve darvi accesso al secchio. (Vedere la documentazione AWS.) 

In tutti i casi, avrete bisogno di un account AWS perché il SDK AWS perJava  (cheERDDAP™utilizza per recuperare informazioni sul contenuto di un secchio) richiede le credenziali dell'account AWS. (più su questo sotto) 

ERDDAP™può accedere solo ai secchi AWS S3 se si specifica il [&lt;Condividi su Google (# Cachefromurl #) O&lt;fileDir&gt;) in un formato specifico:
 https://*bucketName*.s3.*aws-region*.amazonaws.com/*prefix/*   
dove

* Il secchioName è la forma corta del nome del secchio, ad esempio noa-goes17 .
* La regione aws, ad esempio, noi-est-1, è dalla colonna "Regione" in una delle tabelle[AWS Service Endpoints](https://docs.aws.amazon.com/general/latest/gr/rande.html)dove si trova il secchio.
* Il prefisso è facoltativo. Se presente, deve finire con'/'.

Per esempio, https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/   
Questo formato URL è una delle raccomandazioni AWS S3: vedi[Accedere a un secchio](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucket.html)e[questa descrizione dei prefissi](https://docs.aws.amazon.com/AmazonS3/latest/dev/ListingKeysHierarchy.html).ERDDAP™richiede di combinare l'URL del secchio e il prefisso opzionale in un URL al fine di specificare&lt;cacheFromUrl&gt; (o&lt;fileDir&gt;) dove si trovano i file.

#### Test pubblico AWS S3 Secchi{#test-public-aws-s3-buckets} 
Per i secchi pubblici, è possibile e dovrebbe testare l'URL del secchio della directory AWS S3 nel browser, ad esempio,
[ https://noaa-goes17.s3.us-east-1.amazonaws.com ](https://noaa-goes17.s3.us-east-1.amazonaws.com)Se l'URL del secchio è corretto e appropriato perERDDAP, restituirà un documento XML che ha (parziale) elenco dei contenuti di quel secchio. Purtroppo, l'URL completo (i.e., secchio URL più prefisso) cheERDDAP™vuole per un dato dataset non funziona in un browser. AWS non offre un sistema per navigare la gerarchia di un secchio facilmente nel browser. (Se non è corretto, si prega di e-mail Chris. John a Noaa.gov. In caso contrario, Amazon, si prega di aggiungere il supporto per questo&#33;) 

#### Visualizzare il contenuto di un secchio{#viewing-the-contents-of-a-bucket} 
Secchi S3 spesso contengono un paio di categorie di file, in un paio di sottodirectory pseudo, che potrebbero diventare un paio diERDDAP™Datasets. Per fare ilERDDAP™datasets, è necessario conoscere la directory di partenza per&lt;cacheFromUrl&gt; (o&lt;fileDir&gt;) e il formato dei nomi dei file che identificano quel sottoinsieme di file. Se si tenta di visualizzare l'intero contenuto di un secchio in un browser, S3 vi mostrerà solo i primi 1000 file, che è insufficiente. Attualmente, il modo migliore per visualizzare tutto il contenuto di un secchio è quello di fare un[EDDTableFromFileNames](#eddtablefromfilenames)set di dati (sul tuo PCERDDAP™e/o sul tuo pubblicoERDDAP) , che ti dà anche un modo semplice per navigare la struttura della directory e scaricare i file. The&lt;fileDir&gt; per questo sarà l'URL che hai fatto sopra, ad esempio, https://noaa-goes17.s3.us-east-1.amazonaws.com .\\[Perché AWS S3 non offre un modo semplice e veloce per chiunque di farlo senza un account AWS?\\]Si noti che quando faccio questo sul mio PC su una rete non-Amazon, sembra che Amazon rallenta la risposta a un trickle (circa 100 (?) file per chunk) dopo i primi pezzi (di 1000 file per pezzo) sono scaricati. Dal momento che i secchi possono avere un numero enorme di file (noaa-goes17 ha 26 milioni) , ottenere tutti i contenuti di un secchio può prendere EDDTableFromFileNames diverse ore (Ad esempio, 12&#33;) per finire.\\[Amazon, è così?&#33;\\]

#### Fare un EDDTable FromFileNames Dataset con un secchio AWS S3{#making-an-eddtablefromfilenames-dataset-with-an-aws-s3-bucket} 
Se si dispone di un nome di secchio, ma non hanno già un elenco di file nel secchio S3 o il prefisso che identifica la posizione dei file rilevanti nel secchio, utilizzare le istruzioni qui sotto per fare un EDDTableFromFileNames dataset in modo da poter navigare la gerarchia directory del secchio S3 tramiteERDDAP'"files"sistema.

1. Aprire un account AWS
    ERDDAP™utilizza il[AWS SDK perJava](https://docs.aws.amazon.com/sdk-for-java/index.html)per ottenere informazioni di secchio da AWS, quindi è necessario[creare e attivare un account AWS](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/). E' un bel lavoro, con un sacco di cose da imparare.
     
2. Metti le credenziali AWS doveERDDAP™può trovarli.
Seguire le istruzioni[Impostare Credenziali AWS e Regione per lo Sviluppo](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/setup.html#setup-credentials)CosìERDDAP™  (specificamente, il SDK AWS perJava) sarà in grado di trovare e utilizzare le credenziali AWS. SeERDDAP™non riesci a trovare le credenziali, vedrai un
Java.lang. IllegalArgumentException: il file del profilo non può essere un errore nullERDDAPIl file log.txt.
    
Presa per Linux e Mac OS: il file delle credenziali deve essere nella home directory dell'utente che esegue Tomcat (eERDDAP)   (per questo paragrafo, assumiamo user=tomcat) in un file chiamato ~/.aws/credentials . Non presumere che ~ è /home/tomcat -- effettivamente utilizzare cd ~ per scoprire dove il sistema operativo pensa ~ per user=tomcat è. Crea la directory se non esiste. Inoltre, dopo aver messo in atto il file delle credenziali, assicurarsi che l'utente e il gruppo per il file siano tomcat e quindi utilizzare le credenziali chmod 400 per assicurarsi che il file sia in sola lettura per user=tomcat.
    
3. Creare l'URL del secchio nel[formato cheERDDAP™richiede](#accessing-files-in-an-aws-s3-bucket)Per esempio,
    [ https://noaa-goes17.s3.us-east-1.amazonaws.com ](https://noaa-goes17.s3.us-east-1.amazonaws.com)e (per secchi pubblici) provarlo in un browser per assicurarsi che ritorni un documento XML che ha una lista parziale del contenuto di quel secchio.
     
4. Uso[GenerareDatasetsXml](#generatedatasetsxml)per creare un[EDDTableFromFileNames](#eddtablefromfilenames)dataset:
    * Per la directory di avvio, utilizzare questa sintassi:
        \\*\\*. *daOnTheFly,* *
per esempio,
        \\*\\**dall'inizio, https://noaa-goes17.s3.us-east-1.amazonaws.com/
 
    * Nome file regex? .
    * Ricorrente? vero
    * ricarica EveryNMinutes? 10080
    *   infoUrl? https://registry.opendata.aws/noaa-goes/
 
    * Istituzione?NOAA
    * Riepilogo? niente (ERDDAP™creerà automaticamente un riassunto decente.) 
    * titolo? niente (ERDDAP™creerà automaticamente un titolo decente.) Come al solito, è necessario modificare l'XML risultante per verificare la correttezza e apportare miglioramenti prima del blocco dei set di dati utilizzandolo indatasets.xml.
5. Se si seguono le istruzioni sopra e caricare il dataset inERDDAP, hai creato un dataset EDDTableFromFiles. Come esempio, e per rendere più facile per chiunque di navigare e scaricare i file dai secchi AWS Open Data, abbiamo creato EDDTableFromFileNames datasets (vedere l'elenco a
    [ https://upwell.pfeg.noaa.gov/erddap/search/index.html?searchFor=awsS3Files\\_ ](https://upwell.pfeg.noaa.gov/erddap/search/index.html?searchFor=awsS3Files_)) per quasi tutti[AWS S3 Secchi di dati aperti](https://registry.opendata.aws/).
    \\[I pochi secchi che non abbiamo incluso hanno un gran numero di file nella directory root (più che può essere scaricato in una quantità ragionevole di tempo) , o non consentire l'accesso pubblico (Non dovrebbero essere tutti pubblici?) , o sono Secchi di Paga di Richiesta (ad esempio, Sentinel) .\\]  
Se fai clic su"files"link per uno di questi set di dati, è possibile sfogliare l'albero della directory e i file in quel secchio S3. A causa della via\\*\\*\\*dall'OnTheFly EDDTableFromFiles funziona, questi elenchi di directory sono sempre perfettamente aggiornati perchéERDDAP™Li mette in moto. Se fai clic sull'albero della directory su un nome del file reale e fai clic sul nome del file,ERDDAP™reindirizza la tua richiesta a AWS S3 in modo da poter scaricare il file direttamente da AWS. Allora puoi ispezionare quel file.
    
Problemi?
Se il tuo EDDTableFromFiles non verrà caricatoERDDAP™  (o DasDds) , guarda nel file log.txt per un messaggio di errore. Se vedi un
Java.lang. IllegalArgumentException: il file del profilo non può essere un errore nullo, il problema è che il SDK AWS perJava  (usato daERDDAP) non trova il file delle credenziali. Vedere le istruzioni delle credenziali sopra.
     

È spiacevole che AWS non permetta semplicemente alle persone di utilizzare un browser per visualizzare il contenuto di un secchio pubblico.

 **Poi si può fareERDDAP™datasets che danno agli utenti l'accesso ai dati nei file.**   
Vedere le istruzioni in[ERDDAP™e S3 Buckets](#erddap-and-aws-s3-buckets)  (sopra) .
Per il campione EDDTableFromFileNames dataset che hai fatto sopra, se si fa un po 'in giro con la directory e i nomi di file nell'albero della directory, diventa chiaro che i nomi delle directory di livello superiore (ad esempio, ABI-L1b-RadC) corrisponde a quello cheERDDAP™chiamerebbe set di dati separati. Il secchio con cui lavori può essere simile. Si potrebbe quindi perseguire la creazione di set di dati separati inERDDAP™per ciascuno di questi set di dati, utilizzando, ad esempio,
 https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/   
come&lt;cacheFromUrl&gt;. Purtroppo, per questo esempio particolare, i dataset nel secchio sembrano tutti essere set di dati di livello 1 o livello 2, cheERDDAP™ [non è particolarmente buono a](#dimensions), perché il dataset è una raccolta più complicata di variabili che utilizzano dimensioni diverse.
     
    
### File NcML{#ncml-files} 
I file NcML consentono di specificare le modifiche on-the-fly a una o più sorgenti originaliNetCDF  (v3 o v4)  .nc, .grib, .bufr, o.hdf  (v4 o v5) file, e poi hannoERDDAP™tratta il.nci file ml come i file sorgente.ERDDAP™i set di dati accetteranno.ncfile ml ogni volta.nci file sono attesi. I file NcML Devono avere l'estensione.ncml. Vedere la[UnidataDocumentazione NcML](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/ncml_overview.html). NcML è utile perché si può fare alcune cose con esso (ad esempio, apportando diverse modifiche a diversi file in una raccolta, incluso l'aggiunta di una dimensione con un valore specifico a un file) che non puoi fareERDDAP'datasets.xml.

* Modifiche a un.ncl'ultimo tempo modificato del file ml causerà il caricamento del file ogni volta che il dataset viene ricaricato, ma le modifiche al sottostante.nci file di dati non saranno notati direttamente.
* Punti positivi: NcML is\\*Molto bene.\\*sensibile all'ordine di alcuni elementi nel file NcML. Pensa a NcML come specificare una serie di istruzioni nell'ordine specificato, con l'intenzione di cambiare i file sorgente (lo stato all'inizio/inizio del file NcML) nei file di destinazione (lo stato alla fine/in basso del file NcML) .

Un'alternativa a NcML è il[NetCDFOperatori (NCO) ](#netcdf-operators-nco). La grande differenza è che NcML è un sistema per fare cambiamenti sul volo (in modo che i file sorgente non siano modificati) , mentreNCOpuò essere utilizzato per apportare modifiche (o nuove versioni di) I file. EntrambiNCOe NcML sono molto, molto flessibile e consentono di fare quasi qualsiasi cambiamento si può pensare ai file. Per entrambi, può essere difficile capire esattamente come fare quello che si desidera fare -- controllare il web per esempi simili. Entrambi sono strumenti utili per la preparazione di netCDF eHDFfile da utilizzareERDDAP, in particolare per apportare modifiche al di là di quantoERDDAPIl sistema di manipolazione puo' fare.

Esempio #1: Aggiungere una dimensione temporale con un valore unico
Ecco un.ncfile ml che crea una nuova dimensione esterna (tempo, con 1 valore: 1041379200) e aggiunge quella dimensione alla variabile pic nel file denominato A2003001.L3m\\_DAY\\_PIC\\_pic\\_4km.nc:
```
    <netcdf xmlns='https://www.unidata.ucar.edu/namespaces/netcdf/ncml-2.2'>
      <variable name='time' type='int' shape='time' />
      <aggregation dimName='time' type='joinNew'>
        <variableAgg name='pic'/>
        <netcdf location='A2003001.L3m\\_DAY\\_PIC\\_pic\\_4km.nc' coordValue='1041379200'/>
      </aggregation>
    </netcdf>
```
Esempio #2: Cambiare un Valore Tempo esistente
A volte la fonte.ncfile ha già una dimensione del tempo e il valore del tempo, ma il valore è errato (per i tuoi scopi) . Questo.ncil file ml dice: per il file di dati denominato ""19810825230030-NCEI...", per la variabile di dimensione"time", impostare l'attributo unità di essere 'secondi dal 1970-01-01T00:00:00Z' e impostare il valore di tempo di essere 367588800.
```
    <netcdf xmlns='https://www.unidata.ucar.edu/namespaces/netcdf/ncml-2.2'
      location="19810825230030-NCEI-L3C\\_GHRSST-SSTskin-AVHRR\\_Pathfinder-PFV5.3\\_NOAA07\\_G\\_1981237\\_day-v02.0-fv01.0.nc">
      <variable name="time">
        <attribute name='units' value='seconds since 1970-01-01T00:00:00Z' />
        <values>367588800</values>
      </variable>
    </netcdf>
```
### NetCDFOperatori (NCO)  {#netcdf-operators-nco} 
"Gli operatori netCDF (NCO) compongono una dozzina di programmi standalone, linea di comando che prendono netCDF\\[v3 o v4\\]♪HDF \\[v4 o v5\\]♪\\[.grib, .bufr,\\]e/oDAPfile come input, quindi utilizzare (ad esempio, derivano nuovi dati, statistiche di calcolo, stampa, iperslab, manipolano i metadati) e l'output dei risultati a schermo o file in formati di testo, binario o netCDF.NCOaiuta l'analisi dei dati scientifici grigliati. Lo stile delle copertureNCOconsente agli utenti di manipolare e analizzare i file in modo interattivo, o con script espressivi che evitano alcuni overhead di ambienti di programmazione di livello superiore." (dal[NCO](https://nco.sourceforge.net/)homepage) .

Un'alternativa aNCOè[NCML](#ncml-files). La grande differenza è che NcML è un sistema per fare cambiamenti sul volo (in modo che i file sorgente non siano modificati) , mentreNCOpuò essere utilizzato per apportare modifiche (o nuove versioni di) I file. EntrambiNCOe NcML sono molto, molto flessibile e consentono di fare quasi qualsiasi cambiamento si può pensare ai file. Per entrambi, può essere difficile capire esattamente come fare quello che si desidera fare -- controllare il web per esempi simili. Entrambi sono strumenti utili per la preparazione di netCDF eHDFfile da utilizzareERDDAP, in particolare per apportare modifiche al di là di quantoERDDAPIl sistema di manipolazione puo' fare.

Per esempio, è possibile utilizzareNCOper rendere le unità del tempo variabile coerente in un gruppo di file in cui non erano coerenti originariamente. Oppure, puoi usareNCOda applicarescale\\_factoreadd\\_offsetin un gruppo di file dovescale\\_factoreadd\\_offsethanno valori diversi in diversi file sorgente.
 (Oppure, ora puoi occuparti di questi problemiERDDAP™via[EDDGridDaNcFilesUnpacked](#eddgridfromncfilesunpacked), che è una varianteEDDGridFromNcFiles che disacco i dati imballati e standardizza i valori di tempo a basso livello al fine di affrontare un file di raccolta che hanno diversiscale\\_factoreadd\\_offset, o diverse unità temporali.) 

NCOè Software Libero e Open Source che utilizza[GPL 3.0](https://www.gnu.org/licenses/gpl-3.0.html)La patente.

Esempio #1: rendere le unità coerenti
EDDGridDaFiles ed EDDTable Da File insistere che le unità per una determinata variabile siano identiche in tutti i file. Se alcuni dei file sono banalmente (non funzionale) diversi da altri (ad esempio, unità temporali di
"secondi dal 1970-01-01 00:00:00:00 UTC" contro
"seconds since 1970-01-01T00:00:00Z"# Potresti usare #NCO'[Ncatted](https://nco.sourceforge.net/nco.html#ncatted-netCDF-Attribute-Editor). cambiare le unità in tutti i file per essere identici con
nco/ncatted -a unit,time,o,c,'seconds from 1970-01-01T00:00:00:00Z' \\*.nc  
\\[Per molti problemi come questo in EDDTableDa... File datasets, è ora possibile utilizzare[standardizzare Cosa?](#standardizewhat)per direERDDAPstandardizzare i file sorgente in cui vengono lettiERDDAP.\\]
    
### Limiti alla dimensione di un Dataset{#limits-to-the-size-of-a-dataset} 
Vedrete molti riferimenti a "2 miliardi" di seguito. Più precisamente, questo è un riferimento a 2,147,483,647 (2.31-1) , che è il valore massimo di un intero a 32 bit firmato. In alcune lingue del computer, ad esempioJava  (cheERDDAP™è scritto in) , questo è il più grande tipo di dati che può essere utilizzato per molte strutture di dati (per esempio, la dimensione di un array) .

Per valori di stringa (per esempio, per nomi variabili, nomi di attributo, valori di attributo String e valori di dati di stringa) , il numero massimo di caratteri per String inERDDAP™- 2 miliardi. Ma in quasi tutti i casi, ci saranno problemi piccoli o grandi se uno String supera una dimensione ragionevole (ad esempio, 80 caratteri per nomi e nomi di attributo variabili e 255 caratteri per la maggior parte dei valori di attributo String e valori di dati) . Ad esempio, le pagine web che visualizzano nomi variabili lunghi saranno goffamente larghe e i nomi variabili lunghi saranno troncati se superano il limite del tipo di file di risposta.

Per i set di dati grigliati:

* Il numero massimo diaxisVariables è di circa 2 miliardi.
Il numero massimo didataVariables è di circa 2 miliardi.
Ma se un dataset ha &gt;100 variabili, sarà ingombrante per gli utenti da utilizzare.
E se un dataset ha &gt;1 milioni di variabili, il server avrà bisogno di un sacco di memoria fisica e ci saranno altri problemi.
* La dimensione massima di ogni dimensione (axisVariable) è ~2 miliardi di valori.
* Credo che il numero totale massimo di cellule (il prodotto di tutte le dimensioni) è illimitato, ma può essere ~9e18.

Per set di dati tabulari:

* Il numero massimo didataVariables è di circa 2 miliardi.
Ma se un dataset ha &gt;100 variabili, sarà ingombrante per gli utenti da utilizzare.
E se un dataset ha &gt;1 milioni di variabili, il server avrà bisogno di un sacco di memoria fisica e ci saranno altri problemi.
* Il numero massimo di fonti (per esempio, file) che può essere aggregato è ~2 miliardi.
* In alcuni casi, il numero massimo di righe da una fonte individuale (per esempio, un file, ma non un database) è ~2 miliardi di file.
* Non credo ci siano altri limiti.

Per i set di dati grigliati e tabulari, ci sono alcuni limiti interni sulla dimensione del sottoinsieme che possono essere richiesti da un utente in una singola richiesta (spesso legato a &gt;2 miliardi di qualcosa o ~9e18 di qualcosa) , ma è molto più probabile che un utente colpirà i limiti specifici del tipo di file.

*   NetCDFversione 3.nci file sono limitati a 2GB byte. (Se questo è davvero un problema per qualcuno, fammi sapere: Potrei aggiungere il supporto perNetCDFversione 3.ncEstensione a 64 bit oNetCDFVersione 4, che aumenterebbe significativamente il limite, ma non infinitamente.) 
* Browser crash dopo solo ~500MB di dati, quindiERDDAP™limita la risposta.htmlTablerichieste a ~400MB di dati.
* Molti programmi di analisi dei dati hanno limiti simili (per esempio, la dimensione massima di una dimensione è spesso ~2 miliardi di valori) , quindi non c'è motivo di lavorare duramente per aggirare i limiti specifici del tipo di file.
* I limiti specifici del tipo di file sono utili in quanto impediscono richieste ingenue di quantità veramente enormi di dati (per esempio, "darmi tutto questo dataset" quando il dataset ha 20TB di dati) , che richiederebbe settimane o mesi per scaricare. Più a lungo il download, più probabilmente fallirà per una varietà di motivi.
* I limiti specifici del tipo di file sono utili in quanto costringono l'utente a trattare con sottoinsiemi di dimensioni ragionevoli (per esempio, trattare con un grande dataset grigliato tramite file con dati da un punto di volta ogni) .
         
### Passare a ACDD-1.3{#switch-to-acdd-13} 
Noi (in particolare[GenerareDatasetsXml](#generatedatasetsxml)) attualmente consigliamo[Versione ACDD 1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3), che è stato ratificato all'inizio del 2015 e che è denominato "ACDD-1.3" nell'attributo delle Convenzioni globali. Prima diERDDAP™versione 1.62 (pubblicato nel giugno 2015) ♪ERDDAP™usato/ricomposto l'originale, versione 1.0, del[NetCDFConvegno Attributo per Dataset Discovery](https://wiki.esipfed.org/ArchivalCopyOfVersion1)che è stato indicato come "UnidataDataset Discovery v1.0" nelle Convenzioni globali eMetadata\\_Conventionsattributi.

Se i tuoi set di dati utilizzano le versioni precedenti di ACDD, noi RECOMMEND che si passa a ACDD-1.3. Non e' difficile. ACDD-1.3 è altamente compatibile con la versione 1.0. Per passare, per tutti i set di dati (eccettoEDDGridDa Erddap e EDDTable DaErddap datasets) :

1. Rimuovere il nuovo deprecato globaleMetadata\\_Conventionsattributo aggiungendo (o modificando l'esistenteMetadata\\_Conventionsattributo)   
```
        <att name="Metadata\\_Conventions">null</att>  
```
a livello globale del dataset&lt;addAttributes&gt;.
     
2. Se il dataset ha un attributo Conventions nel mondo&lt;addAttributes&gt;, cambiare tutto "UnidataDataset Discovery v1.0" riferimenti a "ACDD-1.3".
Se il dataset non ha un attributo Conventions nel mondo&lt;addAttributes&gt;, quindi aggiungere uno che si riferisce a ACDD-1.3. Per esempio,
```
        <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>  
```
         
3. Se il dataset ha un livello globalestandard\\_name\\_vocabularyattributo, si prega di modificare il formato del valore a, ad esempio,
```
        <att name="standard\\_name\\_vocabulary">CF Standard Name Table v65</att>  
```
Se il riferimento è a una versione precedente della[Tabella dei nomi standard CF](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html). è probabilmente una buona idea passare alla versione attuale (65, come scriviamo questo) , poiché vengono aggiunti nuovi nomi standard a quella tabella con versioni successive, ma i vecchi nomi standard sono raramente deprecati e mai rimossi.
     
4. Anche se ACDD-1.0 includeva attributi globali percreator\\_name♪creator\\_email♪creator\\_url♪[GenerareDatasetsXml](#generatedatasetsxml)non li ha aggiunti automaticamente fino a qualche volta intornoERDDAP™v1.50. Si tratta di informazioni importanti:
        
    *   creator\\_nameconsente agli utenti di conoscere/citare il creatore del dataset.
    *   creator\\_emaildice agli utenti l'indirizzo email preferito per contattare il creatore del dataset, ad esempio se hanno domande sul dataset.
    *   creator\\_urldà agli utenti un modo per saperne di più sul creatore.
    *   ERDDAP™utilizza tutte queste informazioni quando si generano documenti metadati FGDC e ISO 19115-2/19139 per ogni dataset. Questi documenti sono spesso utilizzati da servizi di ricerca esterni.
    
Si prega di aggiungere questi attributi al dataset globale&lt;addAttributes&gt;.
```
        <att name="creator\\_name">NOAA NMFS SWFSC ERD</att>  
        <att name="creator\\_email">erd.data@noaa.gov</att>  
        <att name="creator\\_url">https://www.pfeg.noaa.gov</att>  
```
    
Tutto qui. Spero non sia stato troppo difficile.
     
### Zar{#zarr} 
A partire dalla versione 2.25ERDDAP™può leggere locale File Zarr utilizzando[EDDTableFromNcFiles](#eddtablefromncfiles)e[EDDGridDa NcFiles](#eddgridfromncfiles).

 (A partire da agosto 2019) Possiamo facilmente sbagliare, ma non siamo ancora convinti che[Zar](https://github.com/zarr-developers/zarr-python), o sistemi simili che rompe i file di dati in piccoli pezzi, sono grandi soluzioni al problema diERDDAP™dati di lettura memorizzati in servizi cloud come Amazon AWS S3. Zarr è una grande tecnologia che ha mostrato la sua utilità in una varietà di situazioni, non siamo sicuri cheERDDAP+S3 sarà una di quelle situazioni. Per lo più stiamo dicendo: prima di correre per fare lo sforzo per memorizzare tutti i nostri dati in Zarr, facciamo alcuni test per vedere se è in realtà una soluzione migliore.

I problemi di accesso ai dati nel cloud sono latenza (il ritardo per ottenere i dati) e accesso a livello di file (piuttosto che l'accesso a livello di blocco) . Zarr risolve il problema di accesso a livello di file, ma non fa nulla sulla latenza. Rispetto al semplice download del file (così può essere letto come file locale con accesso a livello di blocco) , Zarr può anche esacerbare il problema di latenza perché, con Zarr, la lettura di un file ora comporta una serie di diverse chiamate per leggere diverse parti del file (ciascuno con il proprio lag) . Il problema della latenza può essere risolto parallelizzando le richieste, ma è una soluzione di livello superiore, non dipendente da Zarr.

E con Zarr (come con database relazionali) , perdiamo la convenienza di avere un file di dati essere un semplice, singolo file che è possibile verificare facilmente l'integrità di, o fare / scaricare una copia di.

ERDDAP™  (a partire da v2) ha un sistema per mantenere una cache locale di file da un'origine URL (ad esempio, S3) (v.&lt;cacheFromUrl&gt; e&lt;cacheMaxGB&gt;] (# Cachefromurl #) ). E il nuovo [&lt;) (#Nthreads) dovrebbe ridurre al minimo il problema di latenza parallelizzando il recupero dei dati ad un livello elevato.&lt;cacheFromUrl&gt; sembra funzionare molto bene per molti scenari. (Non siamo sicuri di quanto benefico&lt;nThreads&gt; è senza ulteriori test.) Ammettiamo che non abbiamo fatto test di temporizzazione su un'istanza AWS con una buona connessione di rete, ma abbiamo testato con successo con varie fonti di URL remote di file. EERDDAP'&lt;cacheFromUrl&gt; funziona con qualsiasi tipo di file di dati (ad esempio,.nc♪.hdf,.jsonlCSV) , anche se compressa esternamente (ad esempio,.gz) , senza modifiche ai file (ad esempio, riscrivendoli come collezioni Zarr) .

È probabile che diversi scenari favoriranno diverse soluzioni, ad esempio, solo bisogno di leggere parte di un file una volta (Zarr vincerà) , vs. bisogno di leggere tutti i file una volta, vs. bisogno di leggere parte o tutti i file ripetutamente (&lt;cacheFromUrl&gt; vincerà).

Per lo più stiamo dicendo: prima di correre per fare lo sforzo per memorizzare tutti i nostri dati in Zarr, facciamo alcuni test per vedere se è in realtà una soluzione migliore.

- - No.
## Elenco dei tipi Datasets{#list-of-types-datasets} 
Se hai bisogno di aiuto per scegliere il tipo di dataset giusto, vedi[Scegliere il tipo Dataset](#choosing-the-dataset-type).

I tipi di dataset rientrano in due categorie. ([Perche'?](#why-just-two-basic-data-structures)) 

### EDDGrid {#eddgrid} 
*   [ **EDDGrid** ](#eddgrid)datasets gestiscono dati grigliati.
    * InEDDGriddataset, le variabili di dati sono array multidimensionali di dati.
    * C'è una variabile di asse per ogni dimensione. Le variabili di asse devono essere specificate nell'ordine in cui le variabili di dati le utilizzano.
    * InEDDGriddatasets, tutte le variabili di dati (Condividi) tutte le variabili dell'asse.
         ([Perche'?](#why-just-two-basic-data-structures) [E se non lo facessero?](#dimensions)) 
    * Valori di Dimensione Ordinati - In tuttoEDDGridset di dati, ogni dimensione DEVE essere in ordine ordinato (salire o scendere) . Ciascuno può essere distanziato in modo irregolare. Non ci possono essere legami. Questo è un requisito del[CF metadati standard](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html). Se i valori di qualsiasi dimensione non sono in ordine ordinato, il dataset non verrà caricato eERDDAP™identificherà il primo valore non selezionato nel file di registro, *BigParentDirectory* /logs/log.txt .
        
Alcune sottoclassi hanno restrizioni aggiuntive (in particolare,EDDGridAggregateExistingDimension richiede che la dimensione esterna (più sinistra, prima) sia ascendente.
        
I valori di dimensione non assortiti indicano quasi sempre un problema con il dataset sorgente. Questo più comunemente si verifica quando un file misnamed o inappropriato è incluso nell'aggregazione, che porta ad una dimensione temporale non assortita. Per risolvere questo problema, vedere il messaggio di errore nelERDDAP™log.txt file per trovare il valore temporale offensivo. Quindi guardare nei file sorgente per trovare il file corrispondente (o uno prima o uno dopo) non appartiene all'aggregazione.
        
    * Vedere la descrizione più completa della[EDDGridmodello di dati](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#dataModel).
    * TheEDDGridi tipi di dataset sono:
        *   [EDDGridDa AudioFiles](#eddfromaudiofiles)aggrega i dati da un gruppo di file audio locali.
        *   [EDDGridDamasco](#eddgridfromdap)gestisce i dati grigliati daDAPserver.
        *   [EDDGridDaEDDTable](#eddgridfromeddtable)consente di convertire un set di dati tabulari in un set di dati grigliato.
        *   [EDDGridDa Erddap](#eddfromerddap)gestisce i dati grigliati da un telecomandoERDDAP.
        *   [EDDGridDa Etopo](#eddgridfrometopo)gestisce solo i dati di topografia ETOPO integrati.
        *   [EDDGridDa Fili](#eddgridfromfiles)è la superclasse di tuttiEDDGridDa... cinque classi.
        *   [EDDGridDaMergeIRFiles](#eddgridfrommergeirfiles)aggrega i dati di un gruppo di MergeIR locale.gzfile.
        *   [EDDGridDa NcFiles](#eddgridfromncfiles)aggrega i dati da un gruppo di localiNetCDF  (v3 o v4)  .nce file correlati.
        *   [EDDGridDaNcFilesUnpacked](#eddgridfromncfilesunpacked)è una variante seEDDGridFromNcFiles che aggrega anche i dati di un gruppo di localiNetCDF  (v3 o v4)  .nce file correlati, cheERDDAP™disacco a basso livello.
        *   [EDDGridLonPM180](#eddgridlonpm180)modifica i valori di longitudine di un bambinoEDDGridin modo che siano nella gamma -180 a 180.
        *   [EDDGridLon0360](#eddgridlon0360)modifica i valori di longitudine di un bambinoEDDGridin modo che siano nella gamma da 0 a 360.
        *   [EDDGridSideBySide](#eddgridsidebyside)aggregati due o piùEDDGridset di dati fianco a fianco.
        *   [EDDGridAggregateExistingDimension](#eddgridaggregateexistingdimension)aggregati due o piùEDDGriddataset, ognuno dei quali ha una diversa gamma di valori per la prima dimensione, ma identici valori per le altre dimensioni.
        *   [EDDGridCopia](#eddgridcopy)può fare una copia locale di un altroEDDGrid's dati e serve dati dalla copia locale.
             
    * TuttiEDDGriddatasets supporta un'impostazione nThreads, che diceERDDAP™quanti thread da utilizzare quando si risponde a una richiesta. Vedi il[nParti](#nthreads)documentazione per i dettagli.
         
### EDDTable{#eddtable} 
*   [ **EDDTable** ](#eddtable)i dataset gestiscono i dati tabulari.
    * I dati tabulari possono essere rappresentati come una tabella simile al database con righe e colonne. Ogni colonna (una variabile di dati) ha un nome, un insieme di attributi e memorizza solo un tipo di dati. Ogni riga ha un'osservazione (o gruppo di valori correlati) . La fonte di dati può avere i dati in una diversa struttura dei dati, una struttura dei dati più complicata e/o più file di dati, maERDDAP™deve essere in grado di adulare i dati di origine in una tabella simile al database per presentare i dati come set di dati tabulari agli utenti diERDDAP.
    * Vedere la descrizione più completa della[Modello di dati EDDTable](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#dataModel).
    * I tipi di dataset EDDTable sono:
        *   [EDDTableFromAllDatasets](#eddtablefromalldatasets)è un dataset di livello superiore che ha informazioni su tutti gli altri set di dati nel vostroERDDAP.
        *   [EDDTableFromAsciiFiles](#eddtablefromasciifiles)aggrega i dati dai file di dati tabulari ASCII virgola-, tab-, semicolon- o separati dallo spazio.
        *   [EDDTableFromAsciiService](#eddtablefromasciiservice)è la superclasse di tutte le classi EDDTableFromAsciiService.
        *   [EDDTableFromAsciiServiceNOS](#eddtablefromasciiservicenos)gestisce i dati da alcuni deiNOAAServizi web NOS.
        *   [EDDTableFromAudioFiles](#eddfromaudiofiles)aggrega i dati da un gruppo di file audio locali.
        *   [EDDTEDD OhsXmlFiles](#eddtablefromawsxmlfiles)aggrega i dati da un insieme di Stazione Meteo Automatica (AWS) File XML.
        *   [EDDTable FromCassandra](#eddtablefromcassandra)gestisce i dati tabulari da una tabella Cassandra.
        *   [EDDTableFromColumnarAsciiFiles](#eddtablefromcolumnarasciifiles)aggrega i dati dai file di dati tabular ASCII con colonne di dati a larghezza fissa.
        *   [EDDTableFromDapSequenza](#eddtablefromdapsequence)gestisce i dati tabulari daDAPserver di sequenza.
        *   [EDDTableDatabase](#eddtablefromdatabase)gestisce i dati tabulari da una tabella di database.
        *   [EDDTEDDEDDGrid](#eddtablefromeddgrid)consente di creare un dataset EDDTable da unEDDGridDataset.
        *   [EDDTableFromErddap](#eddfromerddap)gestisce i dati tabulari da un telecomandoERDDAP.
        *   [EDDTableFromFileNames](#eddtablefromfilenames)crea un set di dati da informazioni su un gruppo di file nel file system del server, ma non serve dati dall'interno dei file.
        *   [EDDTableFromFiles](#eddtablefromfiles)è la superclasse di tutti EDDTableDa...Files classi.
        *   [EDDTableDaHttpGet](#eddtablefromhttpget)èERDDAP's solo sistema per l'importazione di dati e l'esportazione di dati.
        *   [EDDTEDDHyraxFile](#eddtablefromhyraxfiles)  (DEPRECATE) aggrega i dati da file con diverse variabili con dimensioni condivise servite da un[Hyrax OPeNDAPserver](https://www.opendap.org/software/hyrax-data-server).
        *   [EDDTableFrom non valido](#eddtablefrominvalidcrafiles)aggrega i dati daNetCDF  (v3 o v4)  .ncfile che utilizzano una specifica, non valida, variante del CF DSG Contiguous Ragged Array (CRA) file. Anche seERDDAP™supporta questo tipo di file, è un tipo di file non valido che nessuno dovrebbe iniziare a usare. I gruppi che attualmente utilizzano questo tipo di file sono fortemente incoraggiati ad utilizzareERDDAP™generare file CF DSG CRA validi e smettere di utilizzare questi file.
        *   [EDDTableFromJsonlCSVFiles](#eddtablefromjsonlcsvfiles)aggrega i dati da[JSON Linee file CSV](https://jsonlines.org/examples/).
        *   [EDDTableFromMultidimNcFiles](#eddtablefrommultidimncfiles)aggrega i dati daNetCDF  (v3 o v4)  .ncfile con diverse variabili con dimensioni condivise.
        *   [EDDTableFromNcFiles](#eddtablefromncfiles)aggrega i dati daNetCDF  (v3 o v4)  .ncfile con diverse variabili con dimensioni condivise. È bene continuare a utilizzare questo tipo di dataset per i set di dati esistenti, ma per i nuovi set di dati si consiglia di utilizzare EDDTableFromMultidimNcFiles invece.
        *   [EDDTableFromNcCFFiles](#eddtablefromnccffiles)aggrega i dati daNetCDF  (v3 o v4)  .ncfile che utilizzano uno dei formati di file specificati dal[CFU Geometrie di smorzamento discreto (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)convenzioni. Ma per i file che utilizzano una delle varianti multidimensionali CF DSG, utilizzare[EDDTableFromMultidimNcFiles](#eddtablefrommultidimncfiles)Invece.
        *   [EDDTableFromNccsvFiles](#eddtablefromnccsvfiles)aggrega i dati da[NCCSV](/docs/user/nccsv-1.00)File ASCII .csv.
        *   [EDDTableFromNOS](#eddtablefromnos)  (DEPRECATE) gestisce i dati tabulari dai server XML NOS.
        *   [EDDTable FromOBIS](#eddtablefromobis)gestisce i dati tabulari dai server OBIS.
        *   [EDDTableFromParquetFiles](#eddtablefromparquetfiles)gestisce i dati da[Parquet](https://parquet.apache.org/).
        *   [EDDTEDDSOS](#eddtablefromsos)gestisce i dati tabulari daSOSserver.
        *   [EDDTableFromThreddsFiles](#eddtablefromthreddsfiles)  (DEPRECATE) aggrega i dati da file con diverse variabili con dimensioni condivise servite da un[THREDOPeNDAPserver](https://www.unidata.ucar.edu/software/tds/).
        *   [EDDTEDDWFSFile](#eddtablefromwfsfiles)  (DEPRECATE) fa una copia locale di tutti i dati da unArcGISMappaServerWFSserver in modo che i dati possano essere ri-servati rapidamente aERDDAP™utenti.
        *   [EDDTableAggregateRows](#eddtableaggregaterows)può creare un set di dati EDDTable da un gruppo di set di dati EDDTable.
        *   [EDDTableCopy](#eddtablecopy)può fare una copia locale di molti tipi di set di dati EDDTable e quindi conservare i dati rapidamente dalla copia locale.

  
- - No.

## Descrizioni dettagliate dei tipi di Dataset{#detailed-descriptions-of-dataset-types} 

### EDDGridDamasco{#eddgridfromdap} 
[ **EDDGridDamasco** ](#eddgridfromdap)maniglie variabili di griglia da[DAP](https://www.opendap.org/)server.

* Si consiglia vivamente di utilizzare[Generare i dati Programma Xml](#generatedatasetsxml)per fare una bozza ruvida deldatasets.xmlchunk per questo dataset. È possibile raccogliere le informazioni che è necessario modificare che o creare il proprio XML per unEDDGridFromDap dataset guardando i file DDS e DAS del set di dati di origine nel tuo browser (aggiungendo .das e .dds alsourceUrl, per esempio,[ https://thredds1.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day.dds ](https://thredds1.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day.dds)) .
     
*   EDDGridFromDap può ottenere dati da qualsiasi variabile multidimensionale da unaDAPserver dati. (Negli episodi precedenti...EDDGridFromDap era limitato alle variabili designate come "grid", ma non è più un requisito.)   
     
* Valori di Dimensione Ordinati - I valori per ogni dimensione DEVE essere in ordine ordinato (salire o scendere) . I valori possono essere irregolari. Non ci possono essere legami. Questo è un requisito del[CF metadati standard](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html). Se i valori di qualsiasi dimensione non sono in ordine ordinato, il dataset non verrà caricato eERDDAP™identificherà il primo valore non selezionato nel file di registro, *BigParentDirectory* /logs/log.txt .
    
I valori di dimensione non assortiti indicano quasi sempre un problema con il dataset sorgente. Questo più comunemente si verifica quando un file misnamed o inappropriato è incluso nell'aggregazione, che porta ad una dimensione temporale non assortita. Per risolvere questo problema, vedere il messaggio di errore nelERDDAP™log.txt file per trovare il valore temporale offensivo. Quindi guardare nei file sorgente per trovare il file corrispondente (o uno prima o uno dopo) non appartiene all'aggregazione.
    
#### EDDGridScheletro di Dap XML{#eddgridfromdap-skeleton-xml} 

 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset type="EDDGridFromDap" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromDap, this gets the remote .dds and then gets the new  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

     
### EDDGridDaEDDTable{#eddgridfromeddtable} 
[ **EDDGridDaEDDTable** ](#eddgridfromeddtable)consente di convertire un EDDTable dataset tabular in unEDDGridDataset grigliato. Ricordate cheERDDAP™tratta i set di dati come[set di dati grigliati (sottoclassi diEDDGrid) o set di dati tabulari (sottoclassi di EDDTable) ](#why-just-two-basic-data-structures).

* Normalmente, se si dispone di dati grigliati, è sufficiente impostare unEDDGridset di dati direttamente. A volte questo non è possibile, per esempio, quando si hanno i dati memorizzati in un database relazionale cheERDDAP™può accedere solo tramite EDDTableFromDatabase.EDDGridDaEDDTable classe ti permette di rimediare a quella situazione.
     
* Ovviamente, i dati nel dataset EDDTable sottostante devono essere (fondamentalmente) dati grigliati, ma in forma tabulare. Ad esempio, il dataset EDDTable può avere dati CTD: misurazioni della corrente est e nord, a più profondità, più volte. Poiché le profondità sono le stesse ad ogni punto di tempo,EDDGridFromEDDTable può creare un dataset grigliato con un tempo e una dimensione di profondità che accede ai dati tramite il dataset EDDTable sottostante.
     
* Generare i dati Xml... Si consiglia vivamente di utilizzare[Generare i dati Programma Xml](#generatedatasetsxml)per fare una bozza ruvida deldatasets.xmlchunk per questo dataset. È possibile raccogliere le informazioni necessarie per migliorare la bozza ruvida.
     
* Attributi di origine -- Come con tutti gli altri tipi di dataset,EDDGridFromTable ha l'idea che ci siano fonti globaliAttributi e[globaleaddAttributes](#global-attributes)  (specificatodatasets.xml) , che sono combinati per rendere la combinazione globale Attributi, che sono ciò che gli utenti vedono. Per la fonte globaleAttributi,EDDGridFromEDDTable utilizza la combinazione globale Attributi del set di dati EDDTable sottostante. (Se ci pensi per un minuto, ha senso.) 
    
Analogamente, per ciascunoaxisVariableedataVariable'[addAttributes](#addattributes)♪EDDGridFromEDDTable utilizza la combinazione della variabile Attributi dal set di dati EDDTable sottostante comeEDDGridDalla sorgente della variabile EDTable Attributi. (Se ci pensi per un minuto, ha senso.) 
    
Di conseguenza, se la EDDTable ha buoni metadati,EDDGridDaEDDTable spesso ha pochissimoaddAttributesmetadati -- solo un paio di modifiche qui e là.
    
*   dataVariablecontroaxisVariableS... Il sottostante EDDTable ha solodataVariableS. AnEDDGridFromEDDTable dataset avrà alcuniaxisVariable# (creato da alcune delle EDDTabledataVariable#) e alcunidataVariable# (creato dal restante EDDTabledataVariable#) .[GenerareDatasetsXml](#generatedatasetsxml)farà un'ipotesi su cui EDDTabledataVariabledovrebbe diventareEDDGridDaEDDTableaxisVariables, ma è solo un'ipotesi. È necessario modificare l'output di GenerateDatasetsXml per specificare qualedataVariablesaràaxisVariables, e in quale ordine.
     
* asseValori -- Non c'è niente di cui parlare l'EDDTable sottostanteEDDGridDaEDDTable i valori possibili delaxisVariables nella versione grigliata del dataset, quindi devi fornire tali informazioni per ogniaxisVariabletramite uno di questi attributi:
    
    * assiValori -- consente di specificare un elenco di valori. Per esempio,
        &lt;at name="axisValues"[tipo="doubleList"](#attributetype)\\&gt;2, 2.5, 3, 3.5, 4&lt;//
Nota l'uso di un[tipo di dati](#data-types)più la parola Lista. Inoltre, il tipo di lista (per esempio, doppio) , DEVE corrispondere ai dati Tipo della variabile in EDDTable eEDDGridDatasets.
    * asseValuesStartStrideStop -- consente di specificare una sequenza di valori regolarmente distanziati specificando i valori di avvio, passo e stop. Ecco un esempio che è equivalente all'asseValues esempio sopra:
        &lt;att name="axisValuesStartStrideStop"[tipo="doubleList"](#attributetype)\\&gt;2, 0,5, 4&lt;//
Ancora una volta, si noti l'uso di un tipo di dati elenco. Inoltre, il tipo di lista (per esempio, doppio) , DEVE corrispondere ai dati Tipo della variabile in EDDTable eEDDGridDatasets.
         
    
Aggiornamenti -- Come non c'è modo diEDDGridDaEDDTable per determinare l'asseValore dall'EDDTable inizialmente, non c'è anche modo affidabile perEDDGridDaEDDTable per determinare dal EDDTable quando l'asseValori sono cambiati (in particolare, quando ci sono nuovi valori per la variabile di tempo) . Attualmente, l'unica soluzione è quella di modificare l'attributo dell'asseValuesdatasets.xmle ricaricare il dataset. Per esempio, si potrebbe scrivere uno script per
    
    1. Ricercadatasets.xmlper
        datasetID= *theDatasetID* "
così si sta lavorando con il corretto dataset.
    2. Ricercadatasets.xmlper il prossimo evento
        <sourceName> *il nome della Vergine* </sourceName>  
così si sta lavorando con la variabile corretta.
    3. Ricercadatasets.xmlper il prossimo evento
```
        <att name="axisValuesStartStrideStop" type="doubleList">  
```
quindi conosci la posizione di partenza del tag.
    4. Ricercadatasets.xmlper il prossimo evento
```
        </att>  
```
quindi conosci la posizione finale dei valori dell'asse.
    5. Sostituisci il vecchio inizio, stride, ferma i valori con i nuovi valori.
    6. Contattare[URL della bandiera](/docs/server-admin/additional-information#set-dataset-flag)per il dataset da raccontareERDDAP™per ricaricare il dataset.
    
Non è l'ideale, ma funziona.
     
* precisione -- QuandoEDDGridFromEDDTable risponde alla richiesta di dati di un utente, sposta una riga di dati dalla tabella di risposta EDDTable nellaEDDGridgriglia di risposta. Per fare questo, deve capire se i valori "assi" su una determinata riga nella tabella corrispondono a una combinazione di valori di asse nella griglia. Per i tipi di dati interi, è facile determinare se due valori sono uguali. Ma per galleggianti e doppie, questo solleva il problema orribile di numeri di punti galleggianti[non abbinato esattamente](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/). (per esempio, 0.2 versus 0.199999999999996) . A (cercare di) affrontare questo,EDDGridFromTable consente di specificare un attributo di precisione per uno qualsiasi deiaxisVariables, che specifica il numero totale di cifre decimali che devono essere identiche.
    * Per esempio,&lt;at name="precision" type="int"&gt;5&lt;//
    * Per diversi tipi di variabili di dati, ci sono diversi valori di precisione di default. I default sono di solito appropriati. Se non lo sono, è necessario specificare valori diversi.
    * PeraxisVariableche sono[tempo o tempo Variazioni di francobolli](#timestamp-variables), il default è piena precisione (una corrispondenza esatta) .
    * PeraxisVariables che sono galleggianti, la precisione predefinita è 5.
    * PeraxisVariables che sono doppie, la precisione predefinita è 9.
    * PeraxisVariables che hanno tipi di dati interi,EDDGridFromEDDTable ignora l'attributo di precisione e utilizza sempre la massima precisione (una corrispondenza esatta) .
         
    *    **ATTENZIONE&#33;** Quando si effettua la conversione di un pezzo di dati tabulari in un pezzo di dati grigliati, seEDDGridFromEDDTable non può corrispondere ad un valore "assi" EDDTable ad uno dei prevedibiliEDDGridValori asse daEDDTable,EDDGridDaEDDTable silenziosamente (nessun errore) butta via i dati da quella riga della tabella. Per esempio, ci possono essere altri dati (non sulla griglia) nel Dataset EDDTable. (E se lo sforzo &gt; 1, non è ovvio aEDDGridDaTabella quali valori asse sono valori desiderati e quali sono quelli da saltare a causa del passo.) Quindi, se i valori di precisione sono troppo elevati, l'utente vedrà i valori mancanti nella risposta dei dati quando esistono valori di dati validi.
        
Al contrario, se i valori di precisione sono troppo bassi, EDDTable "assis" valori che non dovrebbero corrispondereEDDGridDaEDDI valori dell'asse (erroneamente) Corrisponde.
        
Questi potenziali problemi sono terribili, perché l'utente ottiene i dati sbagliati (o valori mancanti) quando dovrebbero ottenere i dati giusti (o almeno un messaggio di errore) .
Questo non è un difettoEDDGridFromTable.EDDGridFromTable non riesce a risolvere questo problema. Il problema è inerente alla conversione dei dati tabulari in dati grigliati (a meno che non possano essere fatte altre ipotesi, ma non possono essere fatte qui) .
spetta a te,ERDDAP™amministratore, a **prova il tuoEDDGridDaEDDTable accuratamente** per garantire che i valori di precisione siano impostati per evitare questi potenziali problemi.
        
#### spazio{#gapthreshold} 
*   [spazio](#gapthreshold)-- Questo è un tipo di dataset molto insolito. Dal momento che i tipi di query che possono essere fatti a (gestito da) unEDDGridset di dati (correlato ai range e ai passiaxisVariable#) sono molto diversi dai tipi di query che possono essere fatte a (gestito da) un set di dati EDDTable (solo correlato ai range di alcune variabili) , l'esecuzione delEDDGridDaEDDTable datasets varia notevolmente a seconda della richiesta esatta che viene fatta e la velocità del dataset EDDTable sottostante. Per richieste che hanno un valore di sforzo &gt; 1,EDDGridFromEDDTable può chiedere il sottostante EDDTable per un pezzo relativamente grande di dati (come se stridesse=1) e poi passare attraverso i risultati, mantenendo i dati da alcune righe e gettando via i dati da altri. Se deve passare attraverso un sacco di dati per ottenere i dati di cui ha bisogno, la richiesta richiederà più tempo per riempire.
    
SeEDDGridFromEDDTable può dire che ci saranno grandi lacune (con righe di dati indesiderati) tra le righe con i dati desiderati,EDDGridFromEDDTable può scegliere di fare diverse sottorequisizioni al sottostante EDDTable invece di una grande richiesta, saltando così le righe indesiderate di dati nelle grandi lacune. La sensibilità per questa decisione è controllata dal gapValore di soglia come specificato nella&lt;gapThreshold&gt; tag (default=1000 righe di dati sorgente) . Impostare il gapTreshold a un numero più piccolo porterà al dataset facendo (in generale) più subrequisiti. Impostare il gapTreshold a un numero più grande porterà al processo di elaborazione dei dati (in generale) meno subrequisiti.
    
Se il gapThreshold è impostato troppo piccolo,EDDGridFromEDDTable opererà più lentamente perché il overhead di più richieste sarà maggiore del tempo salvato ottenendo alcuni dati in eccesso. Se gapThreshold è impostato troppo grande,EDDGridFromEDDTable opererà più lentamente perché così tanti dati in eccesso saranno recuperati dalla EDDTable, solo per essere scartati. (Come Goldilocks ha scoperto, il mezzo è "solo giusto".) L'overhead per diversi tipi di dataset EDDTable varia notevolmente, quindi l'unico modo per conoscere l'impostazione migliore effettiva per il tuo dataset è attraverso la sperimentazione. Ma non andrai troppo male ad attaccare al default.
    
Un semplice esempio è: Immagina unEDDGridFromTable con uno soloaxisVariable  (tempo, con una dimensione di 100000) UnodataVariable  (temperatura) , e il gap predefinitoTreshold di 1000.
    
    * Se un utente richiede temperatura\\[0&#58;100&#58;5000\\], il passo è 100 quindi la dimensione del gap è 99, che è inferiore al gapThreshold. Quindi...EDDGridFromTable farà una sola richiesta a EDDTable per tutti i dati necessari per la richiesta (equivalente a temperatura\\[0:5000\\]) e buttare via tutte le righe di dati che non ha bisogno.
    * Se un utente richiede temperatura\\[0:2500:5000\\], quel passo è 2500 quindi la dimensione del gap è 2499, che è maggiore del gapThreshold. Quindi...EDDGridFromTable farà richieste separate a EDDTable che sono equivalenti alla temperatura\\[0\\], temperatura\\[2500\\], temperatura\\[5000\\].
    
Il calcolo della dimensione del gap è più complicato quando ci sono più assi.
    
Per ogni richiesta dell'utente,EDDGridStampa FromEDDTable messaggi diagnostici relativi a questo nel[log.txt](/docs/server-admin/additional-information#log)file.
    
    * Se...&lt;logLevel&gt;] (#loglevel) indatasets.xmlè impostato su info, questo stampa un messaggio come
Traduzione:
Se nOuterAxes=0, gapThreshold non è stato superato e solo una richiesta sarà fatta a EDDTable.
Se nOuterAxes&gt;0, gapThreshold è stato superato e nOuterRequests sarà fatto a EDDTable, corrispondente ad ogni combinazione richiesta del nOuterAxes più sinistro. Ad esempio, se il dataset ha 4axisVariableedataVariablea est\\[tempo\\]\\[latitudine\\]\\[longitudine\\]\\[profondità\\]il più a sinistra (primo) la variabile dell'asse è il tempo.
    * Se&lt;logLevel&#33; indatasets.xmlè impostato a tutti, ulteriori informazioni sono scritte al file log.txt.
         
#### EDDGridScheletro daEDDTable XML{#eddgridfromeddtable-skeleton-xml} 
 >&nbsp;&lt;dataset type="EDDGridFromEDDTable" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->   
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromEDDTable, this only works if the underlying EDDTable  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;supports updateEveryNMillis. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;gapThreshold>](#gapthreshold)...&lt;/gapThreshold> &lt;!-- 0 or 1. The default is 1000. >  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The underlying source EDDTable dataset. -->  
 >&nbsp;&lt;/dataset>  

### EDDERDDAP {#eddfromerddap} 
 **EDDGridDa Erddap** gestisce i dati grigliati da un telecomandoERDDAP™server.
 **EDDTableFromErddap** gestisce i dati tabulari da un telecomandoERDDAP™server.

*   EDDGridFromErddap e EDDTableFromErddap si comportano in modo diverso da tutti gli altri tipi di set di dati inERDDAP.
    * Come altri tipi di dataset, questi set di dati ottengono informazioni sul set di dati dalla sorgente e la tengono in memoria.
    * Come altri tipi di dataset, quandoERDDAP™ricerche per set di dati, visualizza il modulo di accesso dati ( *datasetID* .html) , o visualizza il modulo Make A Graph ( *datasetID* .) ♪ERDDAP™utilizza le informazioni sul set di dati che è in memoria.
    *   EDDGridDa Erddap e EDDTable FromErddap sono la base per[reti/clusters/federazioni](/docs/server-admin/scaling)diERDDAPs, che distribuisce in modo efficiente l'utilizzo della CPU (per lo più per fare mappe) , l'utilizzo della memoria, l'archiviazione dei dataset e l'utilizzo della larghezza di banda di un grande data center.
#### Redirect{#redirect} 
* A differenza di altri tipi di dataset, quandoERDDAP™riceve una richiesta di dati o immagini da questi set di dati,ERDDAP [reindirizzamenti](https://en.wikipedia.org/wiki/URL_redirection)la richiesta al telecomandoERDDAP™server. Il risultato è:
    * Questo è molto efficiente (CPU, memoria e larghezza di banda) , perché altrimenti
        1. Il compositoERDDAP™deve inviare la richiesta all'altroERDDAP™  (che richiede tempo) .
        2. L'altroERDDAP™deve ottenere i dati, riformattare e trasmettere i dati al compositoERDDAP.
        3. Il compositoERDDAP™deve ricevere i dati (usando larghezza di banda) # Riformalo # (utilizzando CPU e memoria) , e trasmettere i dati all'utente (usando larghezza di banda) . Reindirizzando la richiesta e permettendo l'altraERDDAP™inviare la risposta direttamente all'utente, il compositoERDDAP™non passa essenzialmente tempo di CPU, memoria, o larghezza di banda su richiesta.
    * Il reindirizzamento è trasparente per l'utente indipendentemente dal software client (un browser o qualsiasi altro software o strumento di riga di comando) .
*   [Si può direERDDAP™](#redirect)non reindirizzare le richieste dell'utente impostando&lt;redirect&gt;false&lt;/redirect&gt;, ma questo nega la maggior parte dei vantaggi del... FromErddap dataset type (in particolare, disperdendo il carico sul fronteERDDAP™al telecomando/backendERDDAP) .
         
     
#### Abbonamenti{#subscriptions} 
Normalmente, quando unEDDGridDa Erddap e EDDTable Da Erddap sono (re) caricato sul tuoERDDAP, cercano di aggiungere un abbonamento al set di dati remoto tramite il telecomandoERDDAP's sistema di abbonamento e-mail/URL. In questo modo, ogni volta che il set di dati remoto cambia, il telecomandoERDDAP™contatti[Set di dati URL della bandiera](/docs/server-admin/additional-information#set-dataset-flag)sul tuoERDDAP™in modo che il dataset locale venga ricaricato ASAP e che il dataset locale sia sempre perfettamente aggiornato e mimiti il dataset remoto. Quindi, la prima volta che questo accade, si dovrebbe ottenere una e-mail che richiede di convalidare l'abbonamento. Tuttavia, se il localeERDDAP™non può inviare un'e-mail o se il telecomandoERDDAP's email/URL sistema di abbonamento non è attivo, si dovrebbe e-mail il telecomandoERDDAP™amministratore e richiedere che s/he aggiunga manualmente [&lt;) (# Il cambiamento #) ...&lt;/onChange&gt; tags a tutti i relativi set di dati per chiamare il vostro set di dati[Set di dati URLs della bandiera](/docs/server-admin/additional-information#set-dataset-flag). Vedi il tuoERDDAP™report giornaliero per un elenco di setDataset URL della bandierina, ma basta inviare quelli perEDDGridFromErddap e EDDTableFromErddap datasets al telecomandoERDDAP™amministratore.
    
Non funziona? I tuoi dataset locali non sono sincronizzati con i dataset remoti?
Molte cose devono funzionare correttamente per questo sistema in modo che i tuoi set di dati rimangano aggiornati. Controllare ciascuna di queste cose in ordine:
    
    1. Il tuoERDDAP™deve essere in grado di inviare e-mail. Vedi le impostazioni dell'email nel tuo setup.xml.
    2. In generale (ma non sempre) ♪ERDDAP'&lt;baseUrl&gt; e&lt;baseHttpsUrl&gt; non deve avere un numero di porta (ad es. : 8080, : 8443) . Se lo fanno, usa un[proxypass](/docs/server-admin/deploy-install#proxypass)per rimuovere il porto dall'url.
    3. Nel tuo setup.xml,&lt;IscrivitiToRemoteErddapDataset&gt; deve essere impostato a true.
    4. Quando il tuo EDD locale... FromErddap dataset viene ricaricato, dovrebbe inviare una richiesta al telecomandoERDDAP™abbonarsi al set di dati remoto. Guarda su log.txt per vedere se sta succedendo.
    5. Si dovrebbe ottenere una e-mail chiedendo di convalidare la richiesta di abbonamento.
    6. È necessario fare clic sul link in quella e-mail per convalidare la richiesta di abbonamento.
    7. Il telecomandoERDDAP™dovrebbe dire che la validazione ha avuto successo. In qualsiasi momento, è possibile richiedere un'e-mail dal telecomandoERDDAP™con un elenco degli abbonamenti in sospeso e validi. Vedere il modulo *telecomandoErddapBase Ur* /erddap/abbonamento/list.html .
    8. Quando il set di dati remoto cambia (ad esempio, ottiene dati aggiuntivi) , il telecomandoERDDAP™dovrebbe cercare di contattare il flagURL sul vostroERDDAP. Non puoi controllare, ma puoi chiedere all'amministratore del telecomandoERDDAP™per controllare.
    9. Il tuoERDDAP™dovrebbe ricevere una richiesta per impostare tale flagURL. Guarda nel tuo log.txt per "setDatasetFlag.txt?" richiesta (#) e vedere se c'è un messaggio di errore associato alle richieste.
    10. Il tuoERDDAP™dovrebbe quindi provare a ricaricare quel dataset (forse non subito, ma ASAP) .
         
#### Max aggiornato (tempo) ?{#up-to-date-maxtime} 
EDDGrid/TableFromErddap datasets modifica solo le informazioni memorizzate su ogni dataset sorgente quando il dataset sorgente è["ricarica"](#reloadeverynminutes)e qualche pezzo di cambiamenti di metadati (ad esempio, la variabile di tempoactual\\_range) , generando così una notifica di abbonamento. Se il dataset sorgente ha dati che cambiano frequentemente (ad esempio, nuovi dati ogni secondo) e utilizza["aggiornamento"](#updateeverynmillis)sistema per rilevare frequenti modifiche ai dati sottostanti,EDDGrid/TableFromErddap non sarà avvisato di questi frequenti cambiamenti fino al successivo set di dati "ricarica", così ilEDDGrid/TableFromErddap non sarà perfettamente aggiornato. È possibile ridurre al minimo questo problema modificando il dataset sorgente&lt;reloadEveryNMinutes&gt; a un valore più piccolo (60? 15?) in modo che ci sono più notifiche di abbonamento per raccontareEDDGrid/TableFromErddap per aggiornare le sue informazioni sul dataset sorgente.

Oppure, se il sistema di gestione dei dati sa quando il dataset sorgente ha nuovi dati (ad esempio, tramite uno script che copia un file di dati in atto) , e se non è super frequente (ad esempio, ogni 5 minuti, o meno frequenti) C'è una soluzione migliore:

1. Non usare&lt;updateEveryNMillis&gt; per mantenere aggiornati i dati di origine.
2. Impostare il dataset sorgente&lt;reloadEveryNMinutes&gt; a un numero maggiore (1440?) .
3. Fai contattare lo script del dataset sorgente[URL della bandiera](/docs/server-admin/additional-information#set-dataset-flag)subito dopo che copia un nuovo file di dati in atto.
     

Ciò porterà al set di dati di origine essere perfettamente aggiornato e causare la creazione di una notifica di abbonamento, che verrà inviata alEDDGrid/TableFromErddap dataset. Questo porteràEDDGrid/TableFromErddap dataset per essere perfettamente aggiornato (bene, entro 5 secondi dall'aggiunta di nuovi dati) . E tutto ciò che sarà fatto in modo efficiente (senza inutili ricarica dataset) .
     
#### No.addAttributes♪axisVariableodataVariable {#no-addattributes-axisvariable-or-datavariable} 
A differenza di altri tipi di dataset, EDDTableFromErddap eEDDGridI dataset di Erddap non permettono a livello globale&lt;addAttributes&gt;♪&lt;axisVariable&gt; o&lt;dataVariable&gt; sezioni nelledatasets.xmlper quel dataset. Il problema è che permettere a coloro che portano a incongruenze:
    
1. Diciamo che è stato permesso e ha aggiunto un nuovo attributo globale.
2. Quando un utente chiede il tuoERDDAP™per gli attributi globali, apparirà il nuovo attributo.
3. Ma quando un utente ti chiedeERDDAP™per un file di dati, il tuoERDDAP™reindirizza la richiesta alla fonteERDDAP. Che cosa?ERDDAP™non è a conoscenza del nuovo attributo. Quindi, se crea un file di dati con metadati, ad esempio, un.ncfile, i metadati non avranno il nuovo attributo.

Ci sono due soluzioni:

1. Convincere l'amministratore della fonteERDDAP™fare i cambiamenti che si desidera ai metadati.
2. Invece di EDDTableFromErddap, uso[EDDTableFromDapSequenza](#eddtablefromdapsequence). O invece diEDDGridDaErddap, uso[EDDGridDamasco](#eddgridfromdap). Questi tipi EDD consentono di connettersi in modo efficiente a un set di dati su un telecomandoERDDAP™  (ma senza reindirizzare le richieste di dati) e ti permettono di includere globale&lt;addAttributes&gt;♪&lt;axisVariable&gt; o&lt;dataVariable&gt; sezioni nelledatasets.xml. Un'altra differenza: è necessario iscriversi manualmente al set di dati remoto, in modo che il dataset sul tuoERDDAP™sarà notificato (via il[URL della bandiera](/docs/server-admin/additional-information#set-dataset-flag)) quando ci sono modifiche al set di dati remoto. Così, si sta creando un nuovo dataset, invece di collegare a un set di dati remoto.
         
#### Altre note{#other-notes} 
* Per motivi di sicurezza,EDDGridDa Erddap e EDDTable FromErddap non supporta il [&lt;Per saperne di più (# Accessibleto #) tag e non può essere utilizzato con set di dati remoti che richiedono l'accesso (perché usano [&lt;Per saperne di più (# Accessibleto #) ). VediERDDAP'[sistema di sicurezza](/docs/server-admin/additional-information#security)per limitare l'accesso ad alcuni set di dati ad alcuni utenti.
     
* A partire daERDDAP™V2.10,EDDGridDa Erddap e EDDTableFromErddap sostengono il [&lt;accessibileViaFiles&gt;] (#accessibleviafiles) tag. A differenza di altri tipi di dataset, il default è vero, ma i file del dataset saranno accessibiliViaFiles solo se il dataset di origine ha anche&lt;accessibileViaFiles&gt; impostato a true.
     
* È possibile utilizzare[Generare i dati Programma Xml](#generatedatasetsxml)per faredatasets.xmlchunk per questo tipo di dataset. Ma è possibile fare questi tipi di set di dati facilmente a mano.
     
#### EDDGridDello scheletro di Erddap XML{#eddgridfromerddap-skeleton-xml} 
*   EDDGridDello scheletro di Erddap XML dataset è molto semplice, perché l'intento è solo quello di imitare il set di dati remoto che è già adatto per l'uso inERDDAP:
 >&nbsp;&nbsp;&lt;dataset type="EDDGridFromErddap" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)...&lt;/accessibleViaFiles> &lt;!-- 0 or 1, default=true. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromErddap, this gets the remote .dds and then gets  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the new leftmost (first) dimension values. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;redirect>](#redirect)true(default)|false&lt;/redirect> &lt;!-- 0 or 1; -->  
 >&nbsp;&nbsp;&lt;/dataset>  

#### EDDTableFromErddap scheletro XML{#eddtablefromerddap-skeleton-xml} 
* Lo scheletro XML per un dataset EDDTableFromErddap è molto semplice, perché l'intento è solo quello di imitare il dataset remoto, che è già adatto per l'uso inERDDAP:
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromErddap" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;redirect>](#redirect)true(default)|false&lt;/redirect> &lt;!-- 0 or 1; -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDGridDa Etopo{#eddgridfrometopo} 
[ **EDDGridDa Etopo** ](#eddgridfrometopo)solo serve il[ETOPO1 Global 1-Minute Grid Elevation Data Set](https://www.ngdc.noaa.gov/mgg/global/global.html)  (Superficie del ghiaccio, griglia registrata, binario, 2byte int: etopo1\\_ice\\_g\\_i2.zip) che è distribuito conERDDAP.

* Solo duedatasetIDs sono sostenuti perEDDGridDa Etopo, in modo da poter accedere ai dati con valori di longitudine da -180 a 180, o valori di longitudine da 0 a 360.
* Non ci sono mai sotto tag, dal momento che i dati sono già descritti all'internoERDDAP.
* Quindi le due opzioni perEDDGridI dataset di Etopo sono (letteralmente) :
```
      <!-- etopo180 serves the data from longitude -180 to 180 -->
      <dataset type="EDDGridFromEtopo" datasetID="etopo180" /> 
      <!-- etopo360 serves the data from longitude 0 to 360 -->
      <dataset type="EDDGridFromEtopo" datasetID="etopo360" /> 
```

### EDDGridDa Fili{#eddgridfromfiles} 
[ **EDDGridDa Fili** ](#eddgridfromfiles)è la superclasse di tuttiEDDGridDa... cinque classi. Non puoi usareEDDGridDa Files direttamente. Invece, utilizzare una sottoclasse diEDDGridDaFiles per gestire il tipo di file specifico:

*   [EDDGridDaMergeIRFiles](#eddgridfrommergeirfiles)gestisce i dati da grigliato[MergeIR.gz](https://www.cpc.ncep.noaa.gov/products/global_precip/html/README)file.
*   [EDDGridDa AudioFiles](#eddfromaudiofiles)aggrega i dati da un gruppo di file audio locali.
*   [EDDGridDa NcFiles](#eddgridfromncfiles)gestisce i dati da grigliato[GRIB .grb](https://en.wikipedia.org/wiki/GRIB)file,[HDF  (v4 o v5)  .hdf](https://www.hdfgroup.org/)file,[.ncml](#ncml-files)file, e[NetCDF  (v3 o v4)  .nc](https://www.unidata.ucar.edu/software/netcdf/)file. Questo può funzionare con altri tipi di file (per esempio, BUFR) , semplicemente non l'abbiamo testato -- si prega di inviare alcuni file campione se siete interessati.
*   [EDDGridDaNcFilesUnpacked](#eddgridfromncfilesunpacked)è una varianteEDDGridDaNcFiles che gestisce i dati da grigliateNetCDF  (v3 o v4)  .nce file correlati, cheERDDAP™disacco a basso livello.

Attualmente non sono supportati altri tipi di file. Ma di solito è relativamente facile aggiungere il supporto per altri tipi di file. Contattaci se hai una richiesta. Oppure, se i tuoi dati sono in un vecchio formato di file che ti piacerebbe allontanarti, ti consigliamo di convertire i file per essereNetCDFV.ncfile.NetCDFè un formato binario ampiamente supportato, consente un accesso casuale veloce ai dati, ed è già supportato daERDDAP.

#### Da file Dettagli{#from-files-details} 
Le seguenti informazioni si applicano a tutte le sottoclassi diEDDGridDa Files.

##### Aggregazione di una dimensione esistente{#aggregation-of-an-existing-dimension} 
Tutte le variazioniEDDGridFromFiles può aggregare i dati dai file locali, dove ogni file ha 1 (o più) valori diversi per il più sinistro (primo) dimensione, di solito\\[tempo\\], che sarà aggregato. Per esempio, le dimensioni potrebbero essere\\[tempo\\]\\[altitudine\\]\\[latitudine\\]\\[longitudine\\], e i file potrebbero avere i dati per uno (o pochi) valore del tempo (#) per file. Il dataset risultante appare come se tutti i dati del file fossero stati combinati. I grandi vantaggi dell'aggregazione sono:

* La dimensione del set di dati aggregati può essere molto più grande di un singolo file può essere convenientemente (~ 2 GB) .
* Per i dati in tempo reale, è facile aggiungere un nuovo file con l'ultimo pezzo di dati. Non devi riscrivere l'intero dataset.

I requisiti di aggregazione sono:
* I file locali non hanno lo stessodataVariable# (come definito nel datasetdatasets.xml) . Il dataset avrà ildataVariables definito indatasets.xml. Se un dato file non ha un datodataVariable♪ERDDAP™aggiungerà i valori mancanti come necessario.
* TuttidataVariables DOVE usare lo stessoaxisVariables/dimensioni (come definito nel datasetdatasets.xml) . I file saranno aggregati in base al primo (a sinistra) dimensione, ordinata in ordine crescente.
* Ogni file MAY ha dati per uno o più valori della prima dimensione, ma non ci può essere alcuna sovrapposizione tra i file. Se un file ha più di un valore per la prima dimensione, i valori devono essere ordinati in ordine crescente, senza legami.
* Tutti i file devono avere esattamente gli stessi valori per tutte le altre dimensioni. La precisione del test è determinata da[matchAxisNDigits](#matchaxisndigits).
* Tutti i file devono avere esattamente lo stesso[unità](#units)metadati per tuttiaxisVariableedataVariableS. Se questo è un problema, si può essere in grado di utilizzare[NCML](#ncml-files)o[NCO](#netcdf-operators-nco)per risolvere il problema.
         
##### Aggregazione tramite Nome file o Metadati globali{#aggregation-via-file-names-or-global-metadata} 
Tutte le variazioniEDDGridFromFiles può anche aggregare un gruppo di file aggiungendo un nuovo leftmost (primo) dimensione, di solito tempo, basato su un valore derivato da ogni nome del file o dal valore di un attributo globale che è in ogni file. Ad esempio, il nome del file potrebbe includere il valore di tempo per i dati nel file.ERDDAP™creerebbe poi una nuova dimensione temporale.

A differenza della caratteristica simile in THREDDS,ERDDAP™crea sempre unaxisVariablecon valori numerici (come richiesto da CF) , mai Valori di stringa (che non sono ammessi da CF) . Inoltre,ERDDAP™ordinare i file nell'aggregazione in base al numericoaxisVariablevalore assegnato a ciascun file, in modo che la variabile dell'asse abbia sempre valori ordinati come richiesto dal CF. L'approccio THREDDS di fare un tipo lessicografico basato sui nomi dei file porta ad aggregazioni in cui i valori dell'asse non sono ordinati (che non è consentito da CF) quando i nomi dei file ordinano in modo diverso da quello derivatoaxisVariablevalori.

Creare una di queste aggregazioniERDDAP™, si definirà un nuovo leftmost (primo)  [axisVariable](#axisvariable)con uno speciale, pseudo&lt;sourceName&gt; che diceERDDAP™dove e come trovare il valore per la nuova dimensione da ogni file.

* Il formato per lo pseudosourceNameche ottiene il valore da un nome di file (solo filename.ext) è
    \\*\\*. *Nome del file,* [dati Tipo](#data-types) *♪* estrattoreRegex *♪* catturaGroupNumber*
* Il formato per lo pseudosourceNameche ottiene il valore dal nome del percorso assoluto di un file è
    \\*\\*. *PathName,* [dati Tipo](#data-types) *♪* estrattoreRegex *♪* catturaGroupNumber*
    \\[Per questo, il nome del percorso usa sempre'/'come il carattere separatore directory, mai '\'.\\]
* Il formato per lo pseudosourceNameche ottiene il valore da un attributo globale è
    \\*\\*. *globale:* attributo Nome *♪* [dati Tipo](#data-types) *♪* estrattoreRegex *♪* catturaGroupNumber*
* Questo pseudosourceNameopzione funziona in modo diverso dagli altri: invece di creare un nuovo leftmost (primo)  axisVariable, questo sostituisce il valore della correnteaxisVariablecon un valore estratto dal nome del file (solo filename.ext) . Il formato è
    \\*\\*. *sostituire Da FileName,* [dati Tipo](#data-types) *♪* estrattoreRegex *♪* catturaGroupNumber*
     

Le descrizioni delle parti da fornire sono:

*    *attributo Nome* -- il nome dell'attributo globale che è in ogni file e che contiene il valore della dimensione.
*    *dati Tipo* -- Questo specifica il tipo di dati che verrà utilizzato per memorizzare i valori. Vedere l'elenco standard di[dati Tipi](#data-types)cheERDDAP™supporti, tranne che String non è permesso qui da variabili di asse inERDDAP™non possono essere variabili di stringa.
    
C'è un dato pseudo aggiuntivoTipo, timeFormat= *stringa TimeFormat* , che diceERDDAP™che il valore è un tempo di stringaStamp[unità adatta per tempi di stringa](#string-time-units). Nella maggior parte dei casi, la stringTimeFormat di cui hai bisogno sarà una variazione di uno di questi formati:
    
    *   yyyy-MM-dd'T'HH:mm:ss.SSSZ -- che ISO 8601:2004 (E) formato orario della data. Potrebbe essere necessario una versione abbreviata di questo, ad esempio,yyyy-MM-dd'T'HH:mm:ss oyyyy-MM-dd.
    * yyyMMddHmmss.SSS -- che è la versione compatta del formato data ISO 8601. Potrebbe essere necessario una versione abbreviata di questo, ad esempio, yyyymmddHHmmss o yyyyyMMdd.
    * M/d/yyyyy H:mm:ss.SSS -- che è il formato data slash degli Stati Uniti. Potrebbe essere necessario una versione abbreviata di questo, ad esempio, M/d/yyyyy .
    * yyyyDDDHmmssSSS -- che è l'anno più il giorno zero-integrato dell'anno (e.g, 001 = 1 gennaio, 365 = 31 dicembre in un anno non adeguato; questo è talvolta erroneamente chiamato la data Julian) . Potrebbe essere necessario una versione abbreviata di questo, ad esempio, yyyyDDD .
    
Se si utilizza questo pseudo dataTipo, aggiungere questo alla nuova variabile&lt;addAttributes&gt;:
```
        <att name="units">seconds since 1970-01-01T00:00:00Z</att>  
```
Se si desidera spostare tutti i valori di tempo, spostare il valore di tempo in unità, ad esempio,
1970-01-01-01T12:00:00Z.
*    *estrattoreRegex* -- Questo è[espressione regolare](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) che include un gruppo di cattura (in parentesi) che descrive come estrarre il valore dal nome del file o dal valore dell'attributo globale. Per esempio, dato un nome di file come S19980011998031.L3b\\_MO\\_CHL.nc, gruppo di cattura #1, "\\dtutorial", nell'espressione regolare S (.\\dtutorial) .\\dtutorial\\.L3b.\\* cattura le prime 7 cifre dopo 'S': 1998001.
*    *catturaGroupNumber* -- Questo è il numero del gruppo di cattura (in un paio di parentesi) nell'espressione regolare che contiene le informazioni di interesse. Di solito è 1, il primo gruppo di cattura. A volte è necessario utilizzare gruppi di cattura per altri scopi nel regex, quindi il numero di gruppo di cattura importante sarà 2 (il secondo gruppo di cattura) o 3 (il terzo) , ecc.

Un esempio completo diaxisVariableche rende un dataset aggregato con un nuovo asse di tempo che ottiene i valori di tempo dal nome del file di ogni file è
```
      <axisVariable>
        <sourceName>\\*\\*\\*fileName,timeFormat=yyyyDDD,S(\\d{7})\\.L3m.\\*,1</sourceName>
        <destinationName>time</destinationName>
      </axisVariable>
```
Quando utilizzi i dati pseudo "timeFormat=" Tipo,ERDDAP™aggiungerà 2 attributi alaxisVariablein modo che sembrano provenire dalla fonte:
```
    <att name="standard\\_name">time</att>  
    <att name="units">seconds since 1970-01-01T00:00:00Z</att>  
```
Quindi, in questo caso,ERDDAP™creerà un nuovo asse chiamato"time"con valori doppi (secondi dal 1970-01-01T00:00:00:00Z) estraendo le 7 cifre dopo "S" e prima ".L3m" nel nome del file e interpretando quelle come valori di tempo formattati come yyyyDDD.

È possibile ignorare il tempo di base predefinito (1970-01-01T00:00:00:00Z) aggiungendo un[aggiungereAttribuzione](#addattributes)che specifica un'unità diversa attributo con un tempo di base diverso. Una situazione comune è: ci sono gruppi di file di dati, ciascuno con un composito 1 giorno di un set di dati satellitare, dove si desidera che il valore di tempo sia mezzogiorno del giorno menzionato nel nome del file (il tempo incentrato di ogni giorno) e voglio la variabilelong\\_nameper essere "Centered Time". Un esempio che fa questo è:
```
      <axisVariable>
        <sourceName>\\*\\*\\*fileName,timeFormat=yyyyDDD,S(\\d{7})\\.L3m.\\*,1</sourceName>
        <destinationName>time</destinationName>
        <addAttributes>
          <att name="long\\_name">Centered Time</att>
          <att name="units">seconds since 1970-01-01T12:00:00Z</att>
        </addAttributes>
      </axisVariable>
```
Note ore=12 nel tempo di base, che aggiunge 12 ore rispetto al tempo base originale del 1970-01-01T00:00Z.

Un esempio completo diaxisVariableche rende un dataset aggregato con un nuovo asse "run" (con valori int) che ottiene i valori di esecuzione dall'attributo globale "runID" in ogni file (con valori come "r17\\_global", dove 17 è il numero di corsa) è
```
      <axisVariable> 
        <sourceName>\\*\\*\\*global:runID,int,(r|s)(\\d+)\\_global,2</sourceName>
        <destinationName>run</destinationName>
        <addAttributes>
          <att name="ioos\\_category">Other</att>
          <att name="units">count</att>
        </addAttributes>
      </axisVariable>
```
Notare l'uso del gruppo di cattura numero 2 per catturare le cifre che si verificano dopo 'r' o 's', e prima di "\\_global". Questo esempio mostra anche come aggiungere attributi aggiuntivi (ad esempio,ioos\\_categorye unità) alla variabile asse.
     
#### File compressi esterni{#externally-compressed-files} 
* Datasets che sono sottoset diEDDGridDaFiles ed EDDTable FromFiles può servire i dati direttamente da file di dati compressi esternamente, compresi.tgz♪.tar.gz♪.tar.gzip♪.gz♪.gzip♪.zip♪.bz2, e file .Z.
     
*    **Questo funziona sorprendentemente bene&#33;**   
Nella maggior parte dei casi, il rallentamento relativo alla decompressione dei file di dati di piccole e medie dimensioni è minore. Se avete bisogno di risparmiare spazio su disco, incoraggiamo fortemente l'utilizzo di questa funzione, soprattutto per i file più vecchi che sono raramente accessibili.
     
*    **Risparmia&#33;**   
Questa è una delle poche caratteristiche inERDDAP™che ti offre la possibilità di risparmiare un sacco di soldi (anche se al costo di prestazioni leggermente diminuite) . Se il rapporto di compressione è ad esempio, 6:1 (a volte sarà molto più alto) , quindi i file di dati del set di dati avranno bisogno solo di 1/6 lo spazio del disco. Allora forse si può ottenere con 1 RAID (di una data dimensione) invece di 6 RAIDS (della stessa dimensione) . E' un enorme risparmio. Speriamo, la capacità di comprimere alcuni file in una collezione (I più anziani?) e non comprimere gli altri (quelli nuovi?) , e per cambiare che in qualsiasi momento, minimizziamo il lato negativo per comprimere alcuni dei file (accesso più lento) . E se la scelta è tra la memorizzazione dei file su nastro (e accessibile solo su richiesta, dopo un ritardo) vs memorizzarli compressi su un RAID (e accessibile tramiteERDDAP) , allora c'è un enorme vantaggio per l'utilizzo della compressione in modo che gli utenti possano interagire e (relativamente) accesso rapido ai dati. E se questo può risparmiare dall'acquisto di un RAID aggiuntivo, questa funzione può risparmiare circa $30.000.
     
* Per tuttiEDDGridLe sottoclassi FromFiles, se i file di dati hanno un'estensione che indica che sono file compressi esternamente (Attualmente:.tgz♪.tar.gz♪.tar.gzip♪.gz♪.gzip♪.zip♪.bz2, o) ♪ERDDAP™decomprimerà i file nella directory cache del dataset quando li legge (se non sono già nella cache) . Lo stesso vale per il file binario (ad esempio,.nc) sottoclassi di EDDTableFromFiles.
     
* Per le sottoclassi EDDTableFromFiles per i file non-binary (ad esempio, .csv) , i file di dati con un'estensione che indica che sono file compressi esternamente saranno decompressi on-the-fly come il file viene letto.
     
* ATTREZZATURA: Se il tipo di file compresso esternamente utilizzato (ad esempio,.tgzo.zip) supporta più di 1 file all'interno del file compresso, il file compresso deve contenere solo 1 file.
     
* ATTREZZATURA: Questa funzione presuppone che il contenuto dei file compressi esternamente non cambi, in modo che un file decompresso cache può essere riutilizzato. Se alcuni o tutti i file di un dataset sono a volte modificati, non comprimere quei file. Questo è coerente con l'uso comune, poiché le persone non comprimere normalmente i file che a volte hanno bisogno di cambiare.
     
*   &lt;fileNameRegex&gt; Per fare questo lavoro, il set di dati&lt;fileNameRegex&gt; deve corrispondere ai nomi dei file compressi. Ovviamente, regexe come .\\*corrisponderà a tutti i nomi di file. Se si specifica un tipo di file specifico, ad esempio, .\\*#.nc, quindi è necessario modificare il regex per includere anche l'estensione di compressione, ad esempio, .\\ *#.nc#.gz(se tutti i file saranno* qualcosa..nc.gzfile) .
     
* Va bene se il vostro set di dati include un mix di file compressi e non compressi. Questo può essere utile se si crede che alcuni file (ad esempio, i file più vecchi) sarà usato meno spesso e quindi sarebbe utile salvare spazio su disco comprimendoli. Per fare questo lavoro,&lt;fileNameRegex&gt; deve corrispondere ai nomi dei file compressi e non compressi, ad esempio .\\*o.\\*#.nc (|#.gz) (dove il gruppo di cattura alla fine di ciò specifica che.gzè facoltativo.
     
* E 'bene se si comprime o decomprimere i file specifici nella raccolta in qualsiasi momento.
Se il dataset non utilizza [&lt;AggiornamentoOgniNMillis&gt; (#updateeverynmillis #) , impostare il dataset[bandiera](/docs/server-admin/additional-information#flag)per direERDDAP™per ricaricare il dataset e quindi notare le modifiche. Interessante, è possibile utilizzare diversi algoritmi di compressione e impostazioni per diversi file nello stesso dataset (ad esempio,.bz2per file raramente utilizzati,.gzper i file non spesso utilizzati e nessuna compressione per i file usati frequentemente) , basta essere sicuri che il regex supporta tutte le estensioni di file che sono in uso, ad esempio, .\\*\\\.nc (|#.gz|#.bz2) .
     
* Naturalmente, i rapporti di compressione e le velocità per i diversi algoritmi di compressione variano con il file sorgente e le impostazioni (ad esempio, livello di compressione) . Se si desidera ottimizzare questo sistema per i file, fare un test dei diversi metodi di compressione con i file e con una gamma di impostazioni di compressione. Se vuoi un bene affidabile (non necessariamente il meglio) setup, ti consigliamo leggermentegzip  (.gz) .gzipnon rende il file compresso più piccolo (è ragionevolmente vicino) , ma comprime il file molto rapidamente e (più importante perERDDAP™utenti) decomprime il file molto rapidamente. E poi...gzipsoftware viene standard con ogni installazione Linux e Mac OS ed è prontamente disponibile per Windows tramite strumenti gratuiti come 7Zip e Linux componenti aggiuntivi come Git Bash. Ad esempio, per comprimere un file sorgente nel.gzversione del file (stesso nome di file, ma con.gzallegato) , uso (in Linux, Mac OS e Git Bash)   
    gzip  *sourceName*   
Per decomprimere un.gzfile di nuovo all'originale, uso
Gunzip *sourceName.gz*   
Per comprimere ciascuno dei file sorgente nella directory e nelle sue sottodirectory, ricorsivamente, utilizzare
    gzip- No. *registaName*   
Decomprimere ciascuno dei.gzfile in directory e le sue sottodirectory , ricorsivamente, utilizzare
Gunzip -r *registaName*   
     
* ATTENZIONE: Non comprimere esternamente (gzip) file già compressi internamente&#33;
Molti file hanno già compresso i dati internamente. Se tu fossigzipquesti file, i file risultante non saranno molto più piccoli (&lt;5%) eERDDAP™sprecherà tempo decomprimendoli quando ha bisogno di leggerli. Per esempio:
    
    * file di dati: ad esempio,.nc4, e.hdf5 file: Alcuni file usano la compressione interna; alcuni no. Come dire: le variabili compresse hanno attributi "\\_ChunkSize". Inoltre, se un gruppo di grigliati.nco.hdfi file sono tutte le dimensioni diverse, sono probabilmente compressi internamente. Se sono tutte le stesse dimensioni, non sono compressi internamente.
    * file immagine: ad esempio, .gif, .jpg, and .png
    * file audio: ad esempio, .mp3, e .ogg.
    * file video: ad esempio, .mp4, .ogv e .webm.
    
        
Uno sfortunato caso dispari: .wav file audio sono enormi e non compressi internamente. Sarebbe bello comprimere (gzip) loro, ma generalmente non dovresti perché se lo fai, gli utenti non saranno in grado di riprodurre i file compressi nel loro browser.
     
* Caso di prova: compressione (congzip) un dataset con 1523 grigliati.ncfile.
    
    * I dati nei file di origine erano radi (molti valori mancanti) .
    * Lo spazio totale del disco è passato da 57 GB prima della compressione a 7 GB dopo.
    * Una richiesta di un sacco di dati da un punto di tempo è&lt;1 s prima e dopo la compressione.
    * Una richiesta di 1 data point per 365 time point (la situazione peggiore) andò da 4 s a 71 s.
         
    
A me che è un ragionevole trade-off per qualsiasi dataset, e certamente per i dataset che sono raramente utilizzati.
     
* Compressione interna ed esterna --
Rispetto alla compressione dei file interna offerta da.nc4 e.hdf5 file,ERDDAPL'approccio per i file binari compressi esternamente ha vantaggi e svantaggi. Lo svantaggio è: per una volta letto di una piccola parte di un file, la compressione interna è migliore perchéEDDGridFromFiles ha solo bisogno di decomprimere qualche pezzo (#) del file, non l'intero file. MaERDDAPL'approccio ha alcuni vantaggi:
    
    *   ERDDAP™supporta la compressione di tutti i tipi di file di dati (binario e non vincolante, ad esempio,.nc3 e .csv) non solo.nc4 e.hdf4.
    * Se la maggior parte di un file deve essere letto più di una volta in un breve periodo di tempo, allora risparmia tempo per decomprimere il file una volta e leggerlo molte volte. Questo accade inERDDAP™quando un utente utilizza Make-A-Graph per il dataset e apporta una serie di piccole modifiche al grafico.
    * La capacità di avere file compressi e non file compressi nella stessa collezione, consente di controllare più su quali file sono compressi e che non sono. E questo controllo aggiunto viene senza davvero modificare il file sorgente (dal momento che è possibile comprimere un file con ad esempio,.gze poi decomprimerlo per ottenere il file originale) .
    * La capacità di cambiare in qualsiasi momento se un dato file è compresso e come è compresso (diversi algoritmi e impostazioni) ti dà più controllo sulle prestazioni del sistema. E si può facilmente recuperare il file originale non compresso in qualsiasi momento.
    
Mentre né l'approccio è un vincitore in tutte le situazioni, è chiaro cheERDDAPLa capacità di servire i dati da file compressi esternamente rende la compressione esterna una ragionevole alternativa alla compressione interna offerta da.nc4 e.hdf5. Questo è significativo dato che la compressione interna è uno dei motivi principali che le persone scelgono di utilizzare.nc4 e.hdf5.
     
##### Cache decompresso{#decompressed-cache} 
ERDDAP™rende una versione decompressa di qualsiasi binario compresso (ad esempio,.nc) file di dati quando ha bisogno di leggere il file. I file decompressi sono conservati nella directory del dataset all'interno *BigParentDirectory* /decompresso/. I file decompressi che non sono stati utilizzati di recente verranno eliminati per liberare lo spazio quando la dimensione del file cumulativo è &gt;10GB. Puoi cambiarlo impostando&lt;decompressoCacheMaxGB&gt; (default = 10) in datasets Xml.xml, ad esempio,
```
        <decompressedCacheMaxGB>40</decompressedCacheMaxGB>  
```
Inoltre, i file decompressi che non sono stati utilizzati negli ultimi 15 minuti verranno eliminati all'inizio di ogni importante reload dataset. Puoi cambiarlo impostando&lt;decompressoCacheMaxMinutesOld&gt; (predefinito = 15) in datasets Xml.xml, ad esempio,
```
        <decompressedCacheMaxMinutesOld>60</decompressedCacheMaxMinutesOld>  
```
I numeri più grandi sono belli, ma la dimensione cumulativa dei file decompressi può causare *BigParentDirectory* per esaurire lo spazio su disco, che causa gravi problemi.
     
* Perché decomprimere un file può richiedere una quantità significativa di tempo (da 0,1 a 10 secondi) , i set di dati con file compressi possono beneficiare dell'impostazione del dataset [&lt;) (#Nthreads) impostazione a un numero più alto (2? 3? 4?) . I lati negativi ai numeri ancora più alti (Per esempio, 5? 6? 7?) stanno diminuendo i rendimenti e che la richiesta di un utente può quindi utilizzare un'alta percentuale delle risorse del sistema, rallentando così significativamente l'elaborazione delle richieste di altri utenti. Così, non c'è impostazione nThreads ideale, solo conseguenze diverse in situazioni diverse con impostazioni diverse.
         
#### Valori di dimensione ordinati{#sorted-dimension-values} 
I valori per ogni dimensione DEVE essere in ordine ordinato (salire o scendere, tranne il primo (a sinistra) dimensione che deve ascendere) . I valori possono essere irregolari. Non ci possono essere legami. Questo è un requisito del[CF metadati standard](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html). Se i valori di qualsiasi dimensione non sono in ordine ordinato, il dataset non verrà caricato eERDDAP™identificherà il primo valore non selezionato nel file di registro, *BigParentDirectory* /logs/log.txt .
    
I valori di dimensione non assortiti indicano quasi sempre un problema con il dataset sorgente. Questo più comunemente si verifica quando un file misnamed o inappropriato è incluso nell'aggregazione, che porta ad una dimensione temporale non assortita. Per risolvere questo problema, vedere il messaggio di errore nelERDDAP™log.txt file per trovare il valore temporale offensivo. Quindi guardare nei file sorgente per trovare il file corrispondente (o uno prima o uno dopo) non appartiene all'aggregazione.
    
#### Regole{#directories} 
I file MAY sono in una directory, o in una directory e le sue sottodirectory (ricorsiva) . Se ci sono un gran numero di file (per esempio, &gt; 1,000) , il sistema operativo (e cosìEDDGridDa Fili) opererà molto più efficiente se si memorizza i file in una serie di sottodirectory (uno all'anno, o uno al mese per dataset con file molto frequenti) , in modo che non ci sono mai un numero enorme di file in una determinata directory.
     
#### &lt;Condividi su Google{#cachefromurl} 
TuttiEDDGridFromFiles e tutti i dataset EDDTableFromFiles supportano una serie di tag che diconoERDDAP™per scaricare e mantenere una copia di tutti i file di un set di dati remoto, o una cache di alcuni file (scaricato come necessario) . Questo può essere incredibilmente utile. Vedi il[cache Documentazione di FromUrl](#cachefromurl).
    
#### Regia remote e richieste HTTP Range{#remote-directories-and-http-range-requests} 
 (AKA Byte Serving, Byte Range Richieste, Accettare-Rangeshttpintestazione)   
EDDGridDa NcFiles, EDDTableFromMultidimNcFiles, EDDTableFromNcFiles e EDDTableFromNcCFFiles, può *a volte* servire i dati da.ncfile su server remoti e accesso via HTTP se il server supporta[Servizio di Byte](https://en.wikipedia.org/wiki/Byte_serving)tramite richieste dell'intervallo HTTP (il meccanismo HTTP per il servizio byte) . Questo è possibile perché netcdf-java (cheERDDAP™usi per leggere.ncfile) supporta la lettura dei dati da remoto.ncfile tramite richieste dell'intervallo HTTP.

 **Non farlo&#33;** È terribile inefficiente e lento.
Invece, usare il [&lt;cacheFromUrl&gt; system] (# Cachefromurl #) .

AccessoERDDAP™datasets come file tramite le richieste dell'intervallo byte --
Lo sto facendo, dato che puoi (in teoria) pensare a un dataset inERDDAP™come un gigante.ncfile da appending ".nc" alla base OPenDAPURL per un dato dataset (ad esempio, https://myserver.org/erddap/griddap/datasetID.nc e anche aggiungendo un ?query dopo che per specificare un sottoset) , è forse ragionevole chiedere se è possibile utilizzare netcdf-java,Ferreto altriNetCDFsoftware client per leggere i dati tramite HTTP Range Richieste daERDDAP. La risposta è no, perché non c'è davvero un enorme ".nc"file. Se si desidera fare questo, invece fare una di queste opzioni:

* Uso(OPeN)DAPsoftware client per connettersi ai servizi di griddap offerti daERDDAP. Questo è ciòDAP  (e cosìERDDAP) è stato progettato per. È molto efficiente.
* Oppure, scarica il file sorgente (#) dal"files"sistema (o un file subset tramite un.nc? query) al computer e utilizzare netcdf-java,Ferreto altriNetCDFsoftware client per leggere il (Ora) file locale (#) .
         
#### Informazioni sul file Cached{#cached-file-information} 
QuandoEDDGridFromFiles dataset è prima caricato,EDDGridFromFiles legge informazioni da tutti i file pertinenti e crea tabelle (una riga per ogni file) con informazioni su ogni file valido e ogni "cattivo" (diverso o invalido) file.
* Le tabelle sono memorizzate anche su disco, comeNetCDFV.ncfile in *BigParentDirectory* / dataset/ *ultimo2CharsOfDatasetID* / *datasetID* / in file di nome:
dirTable.nc  (che contiene un elenco di nomi di directory unici) ♪
file Tabella.nc  (che contiene la tabella con le informazioni di ciascun file valido) ♪
BadFiles.nc  (che contiene la tabella con le informazioni di ogni file cattivo) .
* Per accelerare l'accesso a unEDDGridDal set di dati di Files (ma a scapito di usare più memoria) , si può usare
>   [<fileTableInMemory>true</fileTableInMemory>](#filetableinmemory)  
per direERDDAP™per mantenere una copia delle tabelle di informazioni di file in memoria.
* La copia delle tabelle di informazioni sul file sul disco è utile anche quandoERDDAP™è chiuso e riavviato: salvaEDDGridFromFiles da dover rileggere tutti i file di dati.
* Quando un dataset viene ricaricato,ERDDAP™solo bisogno di leggere i dati in nuovi file e file che sono cambiati.
* Se un file ha una struttura diversa dagli altri file (per esempio, un tipo di dati diverso per una delle variabili, o un valore diverso per il "[unità](#units)" attributo) ♪ERDDAPaggiunge il file all'elenco dei file "cattivo". Le informazioni sul problema del file saranno scritte al *BigParentDirectory* /logs/log.txt file.
* Non dovresti mai dover eliminare o lavorare con questi file. Un'eccezione è: se stai ancora apportando modifiche a un datasetdatasets.xmlsetup, potresti voler eliminare questi file per forzaERDDAP™per rileggere tutti i file in quanto i file saranno letti/interpretati in modo diverso. Se hai mai bisogno di eliminare questi file, puoi farlo quandoERDDAP™sta correndo. (Poi impostare un[bandiera](/docs/server-admin/additional-information#set-dataset-flag)per ricaricare il dataset ASAP.) Tuttavia,ERDDAP™di solito nota che ildatasets.xmlle informazioni non corrispondono al file Informazioni di tabella ed elimina automaticamente le tabelle di file.
* Se vuoi incoraggiareERDDAP™per aggiornare le informazioni memorizzate (per esempio, se hai appena aggiunto, rimosso o modificato alcuni file nella directory dei dati del set) , usare il[sistema di segnalazione](/docs/server-admin/additional-information#flag)a forzaERDDAP™per aggiornare le informazioni dei file memorizzati nella cache.
         
#### Richieste di gestione{#handling-requests} 
Quando viene elaborata la richiesta di dati del cliente,EDDGridFromFiles può guardare rapidamente nella tabella con le informazioni di file valide per vedere quali file hanno i dati richiesti.
     
#### Aggiornamento delle informazioni sul file Cached{#updating-the-cached-file-information} 
Ogni volta che il dataset viene ricaricato, le informazioni dei file memorizzati nella cache vengono aggiornate.
    
* Il dataset viene ricaricato periodicamente come determinato dal&lt;reloadEveryNMinutes&gt; nelle informazioni del set di datidatasets.xml.
* Il dataset viene ricaricato il prima possibile ogni voltaERDDAP™rileva che hai aggiunto, rimosso,[toccato](https://en.wikipedia.org/wiki/Touch_(Unix)) (per cambiare l'ultimo file Tempo modificato) , o ha cambiato un file di dati.
* Il dataset viene ricaricato il prima possibile se si utilizza[sistema di segnalazione](/docs/server-admin/additional-information#flag).

Quando il dataset viene ricaricato,ERDDAP™confronta i file attualmente disponibili nelle tabelle delle informazioni sui file memorizzati nella cache. I nuovi file vengono letti e aggiunti alla tabella dei file validi. I file che non esistono più vengono eliminati dalla tabella dei file validi. I file in cui il timestamp del file è cambiato sono letti e le loro informazioni sono aggiornate. Le nuove tabelle sostituiscono i vecchi tavoli in memoria e su disco.
     
#### File cattivi{#bad-files} 
La tabella dei file cattivi e le ragioni per cui i file sono stati dichiarati cattivi (file danneggiato, variabili mancanti, ecc.) è inviato via email all'e-mail Tutto A indirizzo email (probabilmente) ogni volta che il dataset viene ricaricato. È necessario sostituire o riparare questi file il prima possibile.
     
#### Variabili mancanti{#missing-variables} 
Se alcuni dei file non hanno alcuni deidataVariables definito nel datasetdatasets.xmlBasta cosi'. QuandoEDDGridFromFiles legge uno di quei file, funzionerà come se il file avesse la variabile, ma con tutti i valori mancanti.
     
#### Problemi FTP / Consigli{#ftp-troubleadvice} 
Se si FTP nuovi file di dati alERDDAP™serverERDDAP™sta correndo, c'è la possibilità cheERDDAP™verrà ricaricato il dataset durante il processo FTP. Succede più spesso di quanto si possa pensare&#33; Se succede, il file sembrerà valido (ha un nome valido) Ma il file non è ancora valido. SeERDDAP™tenta di leggere i dati da quel file non valido, l'errore risultante causerà l'aggiunta del file alla tabella dei file non validi. Non va bene. Per evitare questo problema, utilizzare un nome di file temporaneo quando FTP'ing the file, ad esempio, ABC2005.nc\\_TEMP . Poi, il fileNameRegex test (vedi sotto) indicherà che questo non è un file rilevante. Dopo che il processo FTP è completo, rinominare il file nel nome corretto. Il processo di rinominazione causerà che il file diventi rilevante in un istante.
     
#### "0 file" Messaggio di errore{#0-files-error-message-1} 
Se scappi[GenerareDatasetsXml](#generatedatasetsxml)o[DasDds](#dasdds), o se si tenta di caricare unEDDGridDa...Files dataset inERDDAP™, e si ottiene un messaggio di errore "0 file" che indica cheERDDAP™trovato 0 file corrispondenti nella directory (quando pensi che ci siano file corrispondenti in quella directory) :
    * Controllare che i file sono davvero in quella directory.
    * Controlla l'ortografia del nome della directory.
    * Controlla il fileNameRegex. E 'davvero, davvero facile fare errori con regexe. Per scopi di prova, prova il regex .\\* che dovrebbe corrispondere a tutti i nomi di file. (Vedi questo[documentazione regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)e[tutorial regex](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) 
    * Controllare che l'utente che esegue il programma (ad esempio, user=tomcat (?) per Tomcat/ERDDAP) ha il permesso "leggere" per quei file.
    * In alcuni sistemi operativi (per esempio, SELinux) e a seconda delle impostazioni di sistema, l'utente che ha eseguito il programma deve avere 'leggi' il permesso per l'intera catena di directory che porta alla directory che ha i file.
         
#### EDDGridDallo scheletro di Files XML{#eddgridfromfiles-skeleton-xml} 
*    **Lo scheletro XML** per tuttiEDDGridLe sottoclassi FromFiles sono:

>&nbsp;&nbsp;&lt;dataset type="EDDGridFrom...Files" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromFiles subclasses, this uses Java's WatchDirectory system   
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to notice new/deleted/changed files quickly and efficiently. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileDir>...&lt;/fileDir> &lt;-- The directory (absolute) with the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;data files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;recursive>true|false&lt;/recursive> &lt;!-- 0 or 1. Indicates if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;subdirectories of fileDir have data files, too. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileNameRegex>...&lt;/fileNameRegex> &lt;-- 0 or 1. A  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) describing valid data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;file names, for example, ".\\*\\.nc" for all .nc files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;metadataFrom>...&lt;/metadataFrom> &lt;-- The file to get  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;metadata from ("first" or "last" (the default) based on file's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lastModifiedTime). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;false (the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheFromUrl>](#cachefromurl)...&lt;/cacheFromUrl> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheSizeGB>](#cachefromurl)...&lt;/cacheSizeGB> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDD*Dall'AudioFiles{#eddfromaudiofiles} 
 **EDDGridDa AudioFiles** e **EDDTableFromAudioFiles** aggregare i dati da una raccolta di file audio locali. (Questi primi sono apparsiERDDAP™v1.82.) La differenza è cheEDDGridDaAudioFiles tratta i dati come set di dati multidimensionali (di solito con 2 dimensioni:\\[avvio del file Tempo\\]e\\[trascorso Tempo in un file\\]) , mentre EDDTableFromAudioFiles tratta i dati come dati tabulari (di solito con colonne per il file startTime, il tempo trascorso con il file, e i dati dai canali audio) .EDDGridDaAudioFiles richiede che tutti i file hanno lo stesso numero di campioni, quindi se non è vero, è necessario utilizzare EDDTableFromAudioFiles. In caso contrario, la scelta del tipo EDD da utilizzare è completamente la vostra scelta. Un vantaggio di EDDTableFromAudioFiles: è possibile aggiungere altre variabili con altre informazioni, ad esempio,stationID, stationType. In entrambi i casi, la mancanza di una variabile di tempo unificata rende più difficile lavorare con i dati di questi tipi di EDD, ma non c'era un buon modo per impostare una variabile di tempo unificata.

Vedi le superclassi di questa classe,[EDDGridDa Fili](#eddgridfromfiles)e[EDDTableFromFiles](#eddtablefromfiles), per informazioni generali su come funziona questa classe e come usarla.

Si consiglia vivamente di utilizzare[Generare i dati Programma Xml](#generatedatasetsxml)per fare una bozza ruvida deldatasets.xmlchunk per questo dataset. Dal momento che i file audio non hanno metadati diversi dalle informazioni relative alla codifica dei dati audio, è necessario modificare l'output da GenerateDatasets Xml per fornire informazioni essenziali (ad esempio, titolo, sommario,creator\\_name, istituzione, storia) .

Dettagli:

* Ci sono un gran numero di formati di file audio. Attualmente,ERDDAP™può leggere i dati dalla maggior parte dei file .wav e .au. Attualmente non può leggere altri tipi di file audio, ad esempio, .aiff o .mp3. Se hai bisogno di supporto per altri formati di file audio o altre varianti di .wav e .au, invia la tua richiesta a Chris. John a noaa.gov. Oppure, come soluzione di lavoro è possibile utilizzare in questo momento, è possibile convertire i file audio in PCM\\_ SEGNALE (per dati interi) o PCM\\_FLOAT (per i dati dei punti galleggianti) .wav file in modo cheERDDAP™può lavorare con loro.
* Attualmente,ERDDAP™può leggere i file audio con ciòJavaLa classe AudioFormat chiama codifica PCM\\_FLOAT, PCM\\_SIGNED, PCM\\_UNSIGNED, ALAW e ULAW.ERDDAP™converte i valori PCM\\_UNSIGNED (ad esempio, da 0 a 255) in valori firmati (ad esempio, da -128 a 128) riorganizzando i bit nei valori dei dati.ERDDAP™converte ALAW e ULAW codificati dal loro formato byte codificato nativo in breve (Indice) valori. DaJavavuole bigEndian=true dati,ERDDAP™riorganizza i byte dei dati memorizzati con bigEndian=false (piccolo endiano) per leggere correttamente i valori. Per tutte le altre codifiche (PCM) ♪ERDDAP™legge i dati come è.
* QuandoERDDAP™legge i dati dai file audio, converte i metadati audio disponibili del file in attributi globali. Questo includerà sempre (con valori di esempio visualizzati) 
    
String audioBigEndian "false"; //vero o falso
audio Canali 1;
String audioCodifica "PCM\\_SIGNED";
galleggiante audioFrameRate 96000.0; //al secondo
int audioFrameSize 2; //# di byte di dati per frame
audio floatSampleRate 96000.0; //al secondo
int audioSampleSizeInBits 16; //# di bit per canale per campione
    
PerERDDAP's finalità, una cornice è sinonimo di un campione, che è i dati per un punto nel tempo.
Gli attributi inERDDAP™avrà le informazioni che descrivono i dati come era nei file di origine.ERDDAP™spesso hanno cambiato questo durante la lettura dei dati, ad esempio, PCM\\_UNSIGNED, ALAW e dati codificati ULAW vengono convertiti in PCM\\_SIGNED, e bigEndian=false i dati vengono convertiti in bigEndian=true dati (che è comeJavavuole leggerlo) . Alla fine, i valori dei datiERDDAP™sarà sempre[Codice PCM](https://en.wikipedia.org/wiki/Pulse-code_modulation)valori di dati (cioè, semplici campioni digitalizzati dell'onda sonora) .
* QuandoERDDAP™legge i dati dai file audio, legge l'intero file.ERDDAP™può leggere fino a circa 2 miliardi di campioni per canale. Ad esempio, se il tasso campione è di 44.100 campioni al secondo, 2 miliardi di campioni si traduce in circa 756 minuti di dati sonori per file. Se si dispone di file audio con più di questa quantità di dati, è necessario rompere i file in piccoli pezzi in modo cheERDDAP™può leggerli.
* Perché?ERDDAP™legge interi file audio,ERDDAP™deve avere accesso a una grande quantità di memoria per lavorare con grandi file audio. Vedi[ERDDAPImpostazioni di memoria](/docs/server-admin/deploy-install#memory). Ancora una volta, se questo è un problema, una soluzione che è possibile utilizzare in questo momento è quello di rompere i file in piccoli pezzi in modo cheERDDAP™può leggerli con meno memoria.
* Alcuni file audio sono stati scritti in modo non corretto.ERDDAP™fa un piccolo sforzo per affrontare tali casi. Ma in generale, quando c'è un errore,ERDDAP™getterà un'eccezione (e respingere il file) o (se l'errore è inosservabile) leggere i dati (ma i dati saranno errati) .
*   ERDDAP™non controlla o altera il volume del suono. Idealmente, i dati audio interi sono scalati per utilizzare l'intera gamma del tipo di dati.
* I file audio e i lettori audio non hanno un sistema per i valori mancanti (ad esempio, -999 o Float.NaN) . Quindi i dati audio non dovrebbero avere valori mancanti. Se ci sono valori mancanti (ad esempio, se è necessario allungare un file audio) , utilizzare una serie di 0's che sarà interpretato come silenzio perfetto.
* QuandoERDDAP™legge i dati dai file audio, crea sempre una colonna chiamata trascorso Tempo con il tempo per ogni campione, in secondi (memorizzato come doppie) , rispetto al primo campione (che è assegnato trascorso Traduzione:) . ConEDDGridDaAudioFiles, questa diventa la variabile dell'asse Time trascorso.
*   EDDGridDaAudioFiles richiede che tutti i file abbiano lo stesso numero di campioni. Quindi, se non è vero, è necessario utilizzare EDDTableFromAudioFiles.
* PerEDDGridDaAudioFiles, si consiglia di impostare [&lt;dimensioneValori in memoria&gt;] (#dimensionevalori inmemoria) a falsi (come è raccomandato da GenerateDatasets Xml) , perché la dimensione del tempo ha spesso un numero enorme di valori.
* PerEDDGridDaAudioFiles, si dovrebbe quasi sempre utilizzareEDDGridSistema FromFiles per[Aggregazione tramite Nome di file](#aggregation-via-file-names-or-global-metadata), quasi sempre estraendo la data di inizio della registrazione E' ora dei nomi dei file. Per esempio,
```
    <sourceName>\\*\\*\\*fileName,"timeFormat=yyyyMMdd'\\_'HHmmss",aco\\_acoustic\\.(\\[0-9\\]{8}\\_\\[0-9\\]{6})\\.wav,1</sourceName>
```
Genera i dati Xml incoraggerà questo e vi aiuterà con questo.
* Per EDDTableFromAudioFiles, si dovrebbe quasi sempre utilizzare il sistema EDDTableFromFiles per[\\*\\**fileName pseudosourceName#](#filename-sourcenames)per estrarre informazioni dal nome del file (quasi sempre la data di inizio Tempo per la registrazione) e promuoverlo per essere una colonna di dati. Per esempio,
```
    <sourceName>\\*\\*\\*fileName,aco\\_acoustic\\.(\\[0-9\\]{8}\\_\\[0-9\\]{6})\\.wav,1</sourceName>
```
Il formato di tempo deve quindi essere specificato come attributo unità:&lt;at name="units"&gt;yyyMMdd'\\_'HHmmss&lt;//
     
### EDDGridDaMergeIRFiles{#eddgridfrommergeirfiles} 
[ **EDDGridDaMergeIRFiles** ](#eddgridfrommergeirfiles)aggrega i dati da locali,[MergeIR](https://www.cpc.ncep.noaa.gov/products/global_precip/html/README)file, che sono da[Missione di misurazione della pioggia tropicale (TRMM) ](https://trmm.gsfc.nasa.gov), che è una missione congiunta tra la NASA e la Japan Aerospace Exploration Agency (JAXA) . Merge I file IR possono essere scaricati da[NASA](ftp://disc2.nascom.nasa.gov/data/s4pa/TRMM_ANCILLARY/MERG/).

EDDGridFromMergeIRFiles.java è stato scritto e contribuitoERDDAP™progetto di Jonathan Lafite e Philippe Makowski di R.Tech Engineering (licenza: fonte aperta protetta da copyright) .

EDDGridFromMergeIRFiles è un po' insolito:

*   EDDGridFromMergeIRFiles supporta file di dati compressi o non compressi, in qualsiasi combinazione, nello stesso set di dati. Questo consente, ad esempio, di comprimere i file più vecchi che sono raramente accessibili, ma non compressi nuovi file che sono spesso accessibili. Oppure, è possibile modificare il tipo di compressione dall'originale . Z ad esempio,.gz.
* Se si dispone di versioni compresse e non compresse degli stessi file di dati nella stessa directory, assicurarsi che la&lt;fileNameRegex&gt; per il vostro set di dati corrisponde ai nomi dei file che si desidera abbinare e non corrisponde ai nomi dei file che non si desidera abbinare.
* I file di dati di origine non compressi non devono avere estensione del file (cioè, no ". nel nome del file) .
* I file di dati di origine compressa devono avere un'estensione di file, maERDDAP™determina il tipo di compressione controllando il contenuto del file, non guardando l'estensione del file (per esempio, ".Z") . I tipi di compressione supportati includono "gz", "bzip2", "xz", "lzma", "snappy-raw", "snappy-framed", "pack200", e "z". QuandoERDDAP™legge i file compressi, decomprime on-the-fly, senza scrivere a un file temporaneo.
* Tutti i file di dati di origine devono utilizzare il file naming originale: i.e., merg\\_ *YYYMMDDH* \\_4km-pixel (dove *YYYMMDDH* indica l'ora associata ai dati nel file) , più un'estensione del file se il file è compresso.

Vedi la superclasse di questa classe,[EDDGridDa Fili](#eddgridfromfiles), per informazioni generali su come funziona questa classe e come usarla.

Si consiglia vivamente di utilizzare[Generare i dati Programma Xml](#generatedatasetsxml)per fare una bozza ruvida deldatasets.xmlchunk per questo dataset. Puoi quindi modificarlo per affinarlo.
 
### EDDGridDa NcFiles{#eddgridfromncfiles} 
[ **EDDGridDa NcFiles** ](#eddgridfromncfiles)aggrega i dati da locale, grigliato,[GRIB .grb e .grb2](https://en.wikipedia.org/wiki/GRIB)file,[HDF  (v4 o v5)  .hdf](https://www.hdfgroup.org/)file,[.ncml](#ncml-files)file,[NetCDF  (v3 o v4)  .nc](https://www.unidata.ucar.edu/software/netcdf/)file, e[Zar](https://github.com/zarr-developers/zarr-python)file (in versione 2.25) . I file Zarr hanno un comportamento leggermente diverso e richiedono sia il fileNameRegex che il pathRegex per includere "zarr".

Questo può funzionare con altri tipi di file (per esempio, BUFR) , non l'abbiamo ancora testato -- si prega di inviare alcuni file campione.

* Per i file GRIB,ERDDAP™farà un file indice .gbx la prima volta che legge ogni file GRIB. Quindi i file GRIB devono essere in una directory in cui il "utente" che ha eseguito Tomcat ha letto il permesso di scrittura.
* Vedi la superclasse di questa classe,[EDDGridDa Fili](#eddgridfromfiles), per informazioni su come funziona questa classe e come usarla.
* A partire daERDDAP™2, del regolamento (CEE) n.EDDGridDa NcFilesEDDGridDa NcFiles Unpacked può leggere i dati da "strutture" in.nc4 e.hdf4 file. Per identificare una variabile che proviene da una struttura, la&lt;sourceName&gt; deve usare il formato: *Nome completo della struttura* | *MemberName* , per esempio group1/myStruct|myMember .
* Si consiglia vivamente di utilizzare[Generare i dati Programma Xml](#generatedatasetsxml)per fare una bozza ruvida deldatasets.xmlchunk per questo dataset. Puoi quindi modificarlo per affinarlo.
    
#### Gruppi in file Nc Gridded{#groups-in-gridded-nc-files} 
    [I file Netcdf4 possono contenere gruppi.](#groups-in-gridded-nc-files) ERDDAP™Basta fare un set di dati dalle variabili in un gruppo e tutti i suoi gruppi genitori. È possibile specificare un nome specifico di gruppo in GenerateDatasets Xml (omettere lo slash trailing) , o usare "" per avere GenerateDatasets Xml cercare tutti i gruppi per le variabili che utilizzano la maggior parte delle dimensioni, o utilizzare "\\[radice di radice\\]" per avere GenerateDatasets basta cercare variabili nel gruppo root.
    
La prima cosa che GenerateDatasetsXml fa per questo tipo di dataset dopo aver risposto alle domande è stampare la struttura ncdump-like del file campione. Quindi, se si inserisce alcune risposte goofy per il primo ciclo attraverso GenerateDatasets Xml, almeno sarai in grado di vedere seERDDAP™può leggere il file e vedere quali dimensioni e variabili sono nel file. Quindi è possibile dare risposte migliori per il secondo ciclo attraverso GenerateDatasetsXml.
    

### EDDGridDaNcFilesUnpacked{#eddgridfromncfilesunpacked} 
[ **EDDGridDaNcFilesUnpacked** ](#eddgridfromncfilesunpacked)è una variante[EDDGridDa NcFiles](#eddgridfromncfiles)che aggrega i dati da locale, grigliatoNetCDF  (v3 o v4)  .nce file correlati. La differenza è che questa classe disacco ogni file di dati primaEDDGridFromFiles guarda i file:

* Disimballa le variabili che sono imballate con[scale\\_factore/oadd\\_offset](#scale_factor).
* Converte \\_FillValue emissing\\_valuevalori per essere di NaN (o MAX\\_VALUE per tipi di dati interi) .
* Converte i valori temporali e timestamp"seconds since 1970-01-01T00:00:00Z".

Il grande vantaggio di questa classe è che fornisce un modo per affrontare diversi valori discale\\_factor♪add\\_offset, \\_FillValue,missing\\_value, o unità di tempo in diversi file sorgente in una raccolta. Altrimenti, si dovrebbe utilizzare uno strumento come[NCML](#ncml-files)o[NCO](#netcdf-operators-nco)modificare ogni file per rimuovere le differenze in modo che i file possano essere gestiti daEDDGridDa NcFiles. Affinché questa classe funzioni correttamente, i file devono seguire gli standard CF per gli attributi correlati.

* Se provi a fare unEDDGridDa NcFiles Unpacked da un gruppo di file con cui hai precedentemente provato e non sei riuscito a usareEDDGridDa NcFiles, cd a
     *BigParentDirectory* / dataset/ *Last2Letters* / *datasetID* /
dove *Last2Letters* è le ultime 2 lettere delladatasetID♪
ed eliminare tutti i file in quella directory.
* A partire daERDDAP™2, del regolamento (CEE) n.EDDGridDa NcFilesEDDGridDa NcFiles Unpacked può leggere i dati da "strutture" in.nc4 e.hdf4 file. Per identificare una variabile che proviene da una struttura, la&lt;sourceName&gt; deve usare il formato: *Nome completo della struttura* | *MemberName* , per esempio group1/myStruct|myMember .
* Si consiglia vivamente di utilizzare[Generare i dati Programma Xml](#generatedatasetsxml)per fare una bozza ruvida deldatasets.xmlchunk per questo dataset. Puoi quindi modificarlo per affinarlo.
    
I file Netcdf4 possono contenere gruppi. Vedi[questa documentazione](#groups-in-gridded-nc-files).
    
La prima cosa che GenerateDatasetsXml fa per questo tipo di dataset dopo aver risposto alle domande è stampare la struttura simile a ncdump del file campione **prima** è disfatto. Quindi, se si inserisce alcune risposte goofy per il primo ciclo attraverso GenerateDatasets Xml, almeno sarai in grado di vedere seERDDAP™può leggere il file e vedere quali dimensioni e variabili sono nel file. Quindi è possibile dare risposte migliori per il secondo ciclo attraverso GenerateDatasetsXml.
    
### EDDGridLonPM180{#eddgridlonpm180} 
[ **EDDGridLonPM180** ](#eddgridlonpm180)modifica i valori di longitudine di un bambino (chiuso)  EDDGriddataset che ha alcuni valori di longitudine superiori a 180 (per esempio, da 0 a 360) in modo che siano nella gamma -180 a 180 (Longitude Plus o Minus 180, da cui il nome) .

* Questo fornisce un modo per rendere i set di dati che hanno valori di longitudine superiori a 180 conformi in / conOGCservizi (per esempioWMSserver inERDDAP) ♪OGCi servizi richiedono valori di longitudine entro -180 a 180.
* Lavorare vicino a una discontinuità provoca problemi, indipendentemente dal fatto che la discontinuità sia a longitudine 0 o a longitudine 180. Questo tipo di dataset ti permette di evitare questi problemi per tutti, offrendo due versioni dello stesso dataset:
uno con valori di longitudine nel range da 0 a 360 ("Pacificentrico"?) ♪
uno con valori di longitudine nella gamma -180 a 180 ("Anticentrico"?) .
* Per i set di dati per bambini con tutti i valori di longitudine superiori a 180, tutti i nuovi valori di longitudine sono semplicemente 360 gradi più bassi. Ad esempio, un dataset con valori di longitudine da 180 a 240 diventerebbe un dataset con valori di longitudine da -180 a -120.
* Per i set di dati per bambini che hanno valori di longitudine per tutto il mondo (circa 0 a 360) , il nuovo valore di longitudine sarà riorganizzato per essere (circa) Da -180 a 180:
I valori originali da 0 a quasi 180 sono invariati.
I valori originali da 180 a 360 vengono convertiti in -180 a 0 e spostati all'inizio della longitudine.
* Per i set di dati per bambini che coprono 180 ma non coprono il globo,ERDDAP™inserisce i valori mancanti come necessario per fare un set di dati che copre il globo. Ad esempio, un dataset bambino con valori di longitudine da 140 a 200 diventerebbe un dataset con valori di longitudine da -180 a 180.
I valori dei bambini da 180 a 200 diventerebbero da -180 a -160.
Nuovi valori di longitudine sarebbero inseriti da -160 a 140. I valori corrispondenti dei dati saranno \\_FillValues.
I valori dei bambini da 140 a quasi 180 sarebbero invariati.
L'inserimento dei valori mancanti può sembrare strano, ma evita diversi problemi che derivano dall'avere valori di longitudine che saltano improvvisamente (per esempio, da -160 a 140) .
* In[GenerareDatasetsXml](#generatedatasetsxml), c'è uno speciale "dataset type",EDDGridLonPM180Da ErddapCatalog, che consente di generare ildatasets.xmlperEDDGridDataset LonPM180 da ciascuno deiEDDGridset di dati in unERDDAPche hanno valori di longitudine superiori a 180. Questo facilita l'offerta di due versioni di questi set di dati:
l'originale, con valori di longitudine nella gamma da 0 a 360,
e il nuovo dataset, con valori di longitudine nel range -180 a 180.
    
I dati del bambino all'interno di ogniEDDGridLonPM180 dataset sarà unEDDGridFromErddap dataset che punta al dataset originale.
Il nuovo datasetdatasetIDsarà il nome del dataset originale più "\\_LonPM180".
Per esempio,
```
    <dataset type="EDDGridLonPM180" datasetID="erdMBsstdmday\\_LonPM180" active="true">
      <dataset type="EDDGridFromErddap" datasetID="erdMBsstdmday\\_LonPM180Child">
        <!-- SST, Aqua MODIS, NPP, 0.025 degrees, Pacific Ocean, Daytime 
          (Monthly Composite) minLon=120.0 maxLon=320.0 -->
        <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMBsstdmday
        </sourceUrl>
      </dataset>
    </dataset> 
```
Metti laEDDGridDataset LonPM180 **di seguito** il dataset originale indatasets.xml. Questo evita alcuni possibili problemi.
    
In alternativa, è possibile sostituire ilEDDGridFromErddap dataset bambino con il dataset originaledatasets.xml. Poi, ci sarà solo una versione del dataset: quella con valori di longitudine entro -180 a 180. Lo scoraggiamo perché ci sono momenti in cui ogni versione del dataset è più conveniente.
    
* Se si offrono due versioni di un dataset, per esempio, uno con longitudine da 0 a 360 e uno con longitudine da -180 a 180:
    * È possibile utilizzare l'opzione [&lt;accessibile Via ViaWMS&gt; frattaglie&lt;/accessibile Via ViaWMS&gt; (#accessibleviawms) con il dataset 0-360 per disabilitare con forza ilWMSservizio per quel dataset. Quindi, solo la versione LonPM180 del dataset sarà accessibile tramiteWMS.
    * Ci sono un paio di modi per mantenere aggiornato il dataset LonPM180 con modifiche al dataset sottostante:
        * Se il dataset del bambino è unEDDGridFromErddap dataset che fa riferimento ad un dataset nello stessoERDDAP™, il dataset LonPM180 cercherà di iscriversi direttamente al dataset sottostante in modo che sia sempre aggiornato. Gli abbonamenti diretti non generano e-mail che ti chiedono di convalidare l'abbonamento - la convalida deve essere eseguita automaticamente.
        * Se il dataset del bambino non è unEDDGridFromErddap dataset che è sulla stessaERDDAP™, il dataset LonPM180 cercherà di utilizzare il sistema di abbonamento regolare per iscriversi al dataset sottostante. Se hai il sistema di abbonamento nel tuoERDDAP™acceso, si dovrebbe ottenere e-mail chiedendo di convalidare l'abbonamento. Ti prego, fallo.
        * Se hai il sistema di abbonamento nel tuoERDDAP™disattivato, il dataset LonPM180 può a volte avere metadati obsoleti fino a quando il dataset LonPM180 viene ricaricato. Quindi, se il sistema di abbonamento è disattivato, si dovrebbe impostare il [&lt;ricarica Tutti i bambini &gt; (#reloadeverynminutes) l'impostazione del dataset LonPM180 a un numero più piccolo, in modo che è più probabile per catturare le modifiche al dataset bambino prima.

#### EDDGridscheletro di LonPM180 XML{#eddgridlonpm180-skeleton-xml} 

>&nbsp;&nbsp;&lt;dataset type="EDDGridLonPM180" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromDap, this gets the remote .dds and then gets the new  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The child EDDGrid dataset. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDGridLon0360{#eddgridlon0360} 
[ **EDDGridLon0360** ](#eddgridlon0360)modifica i valori di longitudine di un bambino (chiuso)  EDDGriddataset che ha alcuni valori di longitudine inferiori a 0 (per esempio, da -180 a 180) in modo che siano nella gamma da 0 a 360 (da qui il nome) .

* Lavorare vicino a una discontinuità provoca problemi, indipendentemente dal fatto che la discontinuità sia a longitudine 0 o a longitudine 180. Questo tipo di dataset ti permette di evitare questi problemi per tutti, offrendo due versioni dello stesso dataset:
uno con valori di longitudine nella gamma -180 a 180 ("Anticentrico"?) .
uno con valori di longitudine nel range da 0 a 360 ("Pacificentrico"?) ♪
* Per i dataset bambino con tutti i valori di longitudine inferiori a 0, tutti i nuovi valori di longitudine sono semplicemente 360 gradi più alti. Ad esempio, un dataset con valori di longitudine da -180 a -120 diventerebbe un dataset con valori di longitudine da 180 a 240.
* Per i set di dati per bambini che hanno valori di longitudine per tutto il mondo (circa -180 a 180) , il nuovo valore di longitudine sarà riorganizzato per essere (circa) 0 a 360:
I valori originali da -180 a 0 vengono convertiti a 180 a 360 e spostati alla fine della longitudine.
I valori originali da 0 a quasi 180 sono invariati.
* Per i set di dati per bambini che coprono lon=0 ma non coprono il globo,ERDDAP™inserisce i valori mancanti come necessario per fare un set di dati che copre il globo. Ad esempio, un dataset bambino con valori di longitudine da -40 a 20 diventerebbe un dataset con valori di longitudine da 0 a 360.
I valori dei bambini da 0 a 20 sarebbero invariati.
Nuovi valori di longitudine sarebbero inseriti da 20 a 320. I valori corrispondenti dei dati saranno \\_FillValues.
I valori dei bambini da -40 a 0 diventerebbero da 320 a 360.
L'inserimento dei valori mancanti può sembrare strano, ma evita diversi problemi che derivano dall'avere valori di longitudine che saltano improvvisamente (per esempio, dal 20 al 320) .
* In[GenerareDatasetsXml](#generatedatasetsxml), c'è uno speciale "dataset type",EDDGridLon0360Da ErddapCatalog, che consente di generare ildatasets.xmlperEDDGridDataset Lon0360 da ciascuno deiEDDGridset di dati in unERDDAPche hanno valori di longitudine superiori a 180. Questo facilita l'offerta di due versioni di questi set di dati:
l'originale, con valori di longitudine nella gamma da 0 a 360,
e il nuovo dataset, con valori di longitudine nel range -180 a 180.
    
I dati del bambino all'interno di ogniEDDGridLon0360 dataset sarà unEDDGridFromErddap dataset che punta al dataset originale.
Il nuovo datasetdatasetIDsarà il nome del dataset originale più "\\_Lon0360".
Per esempio,
```
    <dataset type="EDDGridLon0360" datasetID="erdMBsstdmday\\_Lon0360" active="true">
      <dataset type="EDDGridFromErddap" datasetID="erdMBsstdmday\\_Lon0360Child">
        <!-- SST, Aqua MODIS, NPP, 0.025 degrees, Pacific Ocean, Daytime 
          (Monthly Composite) minLon=-40.0 maxLon=20.0 -->
        <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMBsstdmday
        </sourceUrl>
      </dataset>
    </dataset> 
```
Metti laEDDGridDataset Lon0360 **di seguito** il dataset originale indatasets.xml. Questo evita alcuni possibili problemi.
    
In alternativa, è possibile sostituire ilEDDGridFromErddap dataset bambino con il dataset originaledatasets.xml. Poi, ci sarà solo una versione del dataset: quella con valori di longitudine entro 0 a 360. Lo scoraggiamo perché ci sono momenti in cui ogni versione del dataset è più conveniente.
    
* Se si offrono due versioni di un dataset, per esempio, uno con longitudine da 0 a 360 e uno con longitudine da -180 a 180:
    * È possibile utilizzare l'opzione [&lt;accessibile Via ViaWMS&gt; frattaglie&lt;/accessibile Via ViaWMS&gt; (#accessibleviawms) con il set da 0 a 360 dati per disabilitare con forzaWMSservizio per quel dataset. Quindi, solo la versione -180 - 180 del dataset sarà accessibile tramiteWMS.
    * Ci sono un paio di modi per mantenere aggiornato il dataset Lon0360 con modifiche al dataset sottostante:
        * Se il dataset del bambino è unEDDGridFromErddap dataset che fa riferimento ad un dataset nello stessoERDDAP™, il dataset Lon0360 cercherà di iscriversi direttamente al dataset sottostante in modo che sia sempre aggiornato. Gli abbonamenti diretti non generano e-mail che ti chiedono di convalidare l'abbonamento - la convalida deve essere eseguita automaticamente.
        * Se il dataset del bambino non è unEDDGridFromErddap dataset che è sulla stessaERDDAP™, il dataset Lon0360 cercherà di utilizzare il sistema di abbonamento regolare per iscriversi al dataset sottostante. Se hai il sistema di abbonamento nel tuoERDDAP™acceso, si dovrebbe ottenere e-mail chiedendo di convalidare l'abbonamento. Ti prego, fallo.
        * Se hai il sistema di abbonamento nel tuoERDDAP™disattivato, il dataset Lon0360 può a volte avere metadati obsoleti fino a quando il dataset Lon0360 viene ricaricato. Quindi, se il sistema di abbonamento è disattivato, si dovrebbe impostare il [&lt;ricarica Tutti i bambini &gt; (#reloadeverynminutes) l'impostazione del dataset Lon0360 a un numero più piccolo, in modo che è più probabile per catturare le modifiche al dataset bambino prima.
#### EDDGridLon0360 scheletro XML{#eddgridlon0360-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridLon0360" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromDap, this gets the remote .dds and then gets the new  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The child EDDGrid dataset. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDGridSideBySide{#eddgridsidebyside} 
[ **EDDGridSideBySide** ](#eddgridsidebyside)aggregati due o piùEDDGridset di dati (i bambini) fianco a fianco.

* Il dataset risultante ha tutte le variabili di tutti i dataset del bambino.
* Il set di dati del genitore e tutti i dataset del bambinodatasetIDS. Se i nomi in una famiglia sono esattamente gli stessi, il dataset non verrà caricato (con il messaggio di errore che i valori dell'asse aggregato non sono in ordine ordinato) .
* Tutti i bambini DEVE avere gli stessi valori sorgente peraxisVariable#\\[1+\\]  (per esempio, latitudine, longitudine) . La precisione del test è determinata da[matchAxisNDigits](#matchaxisndigits).
* I bambini possono avere valori di origine diversi peraxisVariable#\\[0\\]  (per esempio, il tempo) , ma di solito sono in gran parte uguali.
* Il set di dati del genitore sembrerà avere tuttiaxisVariable#\\[0\\]valori sorgente da tutti i bambini.
* Ad esempio, questo consente di combinare un dataset sorgente con un u-component del vettore e un altro dataset sorgente con un v-componente del vettore, in modo che i dati combinati possano essere serviti.
* I bambini creati da questo metodo sono tenuti privatamente. Non sono set di dati accessibili separatamente (ad esempio, per richieste di dati client o per[file di bandiera](/docs/server-admin/additional-information#flag)) .
* I metadati e le impostazioni globali per il genitore provengono dai metadati e dalle impostazioni globali per il primo bambino.
* Se c'è un'eccezione durante la creazione del primo bambino, il genitore non sarà creato.
* Se c'è un'eccezione durante la creazione di altri bambini, questo invia un'e-mail a e-mailEverythingTo (come specificato[setup.xml](/docs/server-admin/deploy-install#setupxml)) e continua con gli altri bambini.
#### EDDGridScheletro SideBySide XML{#eddgridsidebyside-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridSideBySide" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 2 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDGridAggregateExistingDimension{#eddgridaggregateexistingdimension} 
[ **EDDGridAggregateExistingDimension** ](#eddgridaggregateexistingdimension)aggregati due o piùEDDGriddataset ciascuno dei quali ha una diversa gamma di valori per la prima dimensione, ma identici valori per le altre dimensioni.

* Ad esempio, un dataset bambino potrebbe avere 366 valori (per il 2004) per la dimensione del tempo e un altro bambino potrebbe avere 365 valori (per il 2005) per la dimensione del tempo.
* Tutti i valori per tutte le altre dimensioni (per esempio, latitudine, longitudine) Deve essere identico per tutti i bambini. La precisione del test è determinata da[matchAxisNDigits](#matchaxisndigits).
* Valori di Dimensione Ordinati - I valori per ogni dimensione DEVE essere in ordine ordinato (salire o scendere) . I valori possono essere irregolari. Non ci possono essere legami. Questo è un requisito del[CF metadati standard](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html). Se i valori di qualsiasi dimensione non sono in ordine ordinato, il dataset non verrà caricato eERDDAP™identificherà il primo valore non selezionato nel file di registro, *BigParentDirectory* /logs/log.txt .
    
I valori di dimensione non assortiti indicano quasi sempre un problema con il dataset sorgente. Questo più comunemente si verifica quando un file misnamed o inappropriato è incluso nell'aggregazione, che porta ad una dimensione temporale non assortita. Per risolvere questo problema, vedere il messaggio di errore nelERDDAP™log.txt file per trovare il valore temporale offensivo. Quindi guardare nei file sorgente per trovare il file corrispondente (o uno prima o uno dopo) non appartiene all'aggregazione.
    
* Il set di dati dei genitori e il set di dati dei bambinidatasetIDS. Se i nomi in una famiglia sono esattamente gli stessi, il dataset non verrà caricato (con il messaggio di errore che i valori dell'asse aggregato non sono in ordine ordinato) .
* Attualmente, il dataset bambino DEVE essere unEDDGridFromDap dataset e MUST hanno i valori più bassi della dimensione aggregata (di solito i valori del tempo più antichi) . Tutti gli altri bambini DEVE essere quasi identici dataset (differire solo nei valori per la prima dimensione) e sono specificati solo lorosourceUrl.
* Il dataset aggregato ottiene i suoi metadati dal primo bambino.
* The[Generare i dati Programma Xml](#generatedatasetsxml)può fare una bozza ruvida deldatasets.xmlper unEDDGridAggregateExistingDimension basato su un insieme di file serviti da unHyraxo server THREDDS. Ad esempio, utilizzare questo input per il programma (il "/1988" nell'URL rende l'esempio più veloce) :
    ```
      EDDType? EDDGridAggregateExistingDimension  
      Server type (hyrax, thredds, or dodsindex)? hyrax  
      Parent URL (for example, for hyrax, ending in "contents.html";  
        for thredds, ending in "catalog.xml")  
      ? https://opendap.jpl.nasa.gov/opendap/ocean\\_wind/ccmp/L3.5a/data/  
        flk/1988/contents.html  
      File name regex (for example, ".\\*\\.nc")? month.\\*flk\\.nc\\.gz  
      ReloadEveryNMinutes (for example, 10080)? 10080  
    ```
È possibile utilizzare il risultato&lt;sourceUrl&gt; tags o eliminarli e slegare il&lt;sourceUrl&gt; tag (in modo che i nuovi file vengano notati ogni volta che il dataset viene ricaricato.
#### EDDGridAggregateExistingDimension scheletro XML{#eddgridaggregateexistingdimension-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridAggregateExistingDimension" [datasetID](#datasetid)\\="..."  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- This is a regular [EDDGridFromDap](#eddgridfromdap) dataset  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;description child with the lowest values for the aggregated  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dimensions. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl> &lt;!-- 0 or many; the sourceUrls for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;other children.  These children must be listed in order of  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ascending values for the aggregated dimension. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrls serverType="..." regex="..." recursive="true"  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[pathRegex](#pathregex)\\=".\\*"  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;>https://*someServer/someDirectory/someSubdirectory*/catalog.xml&lt;/sourceUrls>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1. This specifies how to find the other children,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;instead of using separate sourceUrl tags for each child.  The  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;advantage of this is: new children will be detected each time  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the dataset is reloaded. The serverType must be "thredds",  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"hyrax", or "dodsindex". 
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) (regex)  ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) is .\\*\\.nc  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;recursive can be "true" or "false".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Only directory names which match the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(default=".\\*") will be accepted.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A thredds catalogUrl MUST include "/thredds/catalog/".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a thredds catalogUrl is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://thredds1.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;chla/catalog.xml](https://thredds1.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/chla/catalog.xml)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a hyrax catalogUrl is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;flk/1988/contents.html](https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/1988/contents.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a dodsindex URL is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html](https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Note the "OPeNDAP logo at the top of the page.)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;When these children are sorted by filename, they must be in  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;order of ascending values for the aggregated dimension. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDGridCopia{#eddgridcopy} 
[ **EDDGridCopia** ](#eddgridcopy)fa e mantiene una copia locale di un altroEDDGrid's dati e serve dati dalla copia locale.

*   EDDGridCopia (e per dati tabulari,[EDDTableCopy](#eddtablecopy)) è molto facile da usare e molto efficace
     **soluzione ad alcuni dei maggiori problemi con il servizio dei dati da una fonte di dati remota:** 
    * L'accesso ai dati da una fonte di dati remota può essere lento.
        * Può essere lento perché è intrinsecamente lento (ad esempio, un tipo inefficiente di server) ♪
        * perché è sopraffatto da troppe richieste,
        * o perché il server o il server remoto è limitato alla larghezza di banda.
    * Il set di dati remoto a volte non è disponibile (di nuovo, per una varietà di motivi) .
    * Affidarsi a una fonte per i dati non scala bene (per esempio, quando molti utenti e moltiERDDAPs utilizzarlo) .
         
* Come funziona...EDDGridCopia risolve questi problemi facendo automaticamente e mantenendo una copia locale dei dati e servendo i dati dalla copia locale.ERDDAP™può servire i dati dalla copia locale molto, molto rapidamente. E fare una copia locale allevia l'onere sul server remoto. E la copia locale è un backup dell'originale, che è utile nel caso qualcosa accade all'originale.
    
Non c'è niente di nuovo nel fare una copia locale di un set di dati. Ciò che è nuovo qui è che questa classe lo rende\\*facile\\*creare e creare\\*mantenere\\*una copia locale dei dati da una\\*varietà\\*di tipi di fonti di dati remote e\\*aggiungi metadati\\*durante la copia dei dati.
    
* Cavi di dati --EDDGridCopia rende la copia locale dei dati richiedendo pezzi di dati dal telecomando&lt;dataset&gt; . Ci sarà un pezzo per ogni valore del più sinistro (primo) variabile asse.EDDGridLa copia non si basa sui numeri dell'indice del dataset remoto per l'asse -- quelli possono cambiare.
    
ATTENZIONE: Se la dimensione di un pezzo di dati è così grande (&gt; 2 GB) che provoca problemi,EDDGridLa copia non può essere usata. (Mi dispiace, speriamo di avere una soluzione per questo problema in futuro.) 
    
*   \\[Un'alternativa aEDDGridRicevuto.
Se i dati remoti sono disponibili tramite file scaricabili, non un servizio web, utilizzare[cache opzione FromUrl perEDDGridDa Fili](#cachefromurl), che fa una copia locale dei file remoti e serve i dati dai file locali.\\]
* File locali -- Ogni pezzo di dati viene memorizzato in un separatoNetCDFfile in una sottodirectory *BigParentDirectory* /copia/ *datasetID* / (come specificato[setup.xml](/docs/server-admin/deploy-install#setupxml)) . I nomi dei file creati dai valori dell'asse vengono modificati per renderli sicuri (per esempio, i trattini sono sostituiti da "x2D") - Questo non riguarda i dati effettivi.
     
* Nuovi dati -- Ogni voltaEDDGridCopia viene ricaricata, controlla il telecomando&lt;dataset&gt; per vedere quali pezzi sono disponibili. Se il file per un pezzo di dati non esiste già, una richiesta per ottenere il pezzo viene aggiunta a una coda.ERDDAP's taskThread elabora tutte le richieste in coda per pezzi di dati, one-by-one. È possibile vedere le statistiche per il compitoAttività del pane sul[Pagina di stato](/docs/server-admin/additional-information#status-page)e nel[Rapporto giornaliero](/docs/server-admin/additional-information#daily-report). (Sì,ERDDAP™potrebbe assegnare più compiti a questo processo, ma che utilizzerebbe un sacco di larghezza di banda, memoria e tempo della CPU della sorgente di dati remota, e un sacco di tempo localeERDDAPLa larghezza di banda, la memoria e il tempo della CPU, nessuno dei quali è una buona idea.) 
    
NOTA: La prima volta unaEDDGridLa copia è caricata, (se tutto va bene) un sacco di richieste per pezzi di dati saranno aggiunti all'attivitàPadre del pane, ma non saranno stati creati file di dati locali. Così il costruttore fallirà, ma taskThread continuerà a lavorare e creare file locali. Se tutto va bene, il taskThread farà alcuni file di dati locali e il prossimo tentativo di ricaricare il dataset (in ~15 minuti) avrà successo, ma inizialmente con una quantità molto limitata di dati.
    
NOTA: Dopo che il dataset locale ha alcuni dati e appare nel vostroERDDAP, se il dataset remoto è temporaneamente o permanentemente non accessibile, il dataset locale continuerà a funzionare.
    
ATTENZIONE: Se il set di dati remoto è grande e/o il server remoto è lento (questo è il problema, non è vero?&#33;) , ci vorrà molto tempo per fare una copia completa locale. In alcuni casi, il tempo necessario sarà inaccettabile. Ad esempio, la trasmissione di 1 TB di dati su una linea T1 (0.15 GB/s) richiede almeno 60 giorni, in condizioni ottimali. Inoltre, utilizza un sacco di larghezza di banda, memoria e tempo della CPU sui computer remoti e locali. La soluzione è quella di inviare un disco rigido all'amministratore del set di dati remoto in modo che s/he possa fare una copia del set di dati e inviare il disco rigido indietro a voi. Utilizzare i dati come punto di partenza eEDDGridCopia aggiungerà i dati ad esso. (Questo è un modo[Servizio cloud EC2 di Amazon](https://aws.amazon.com/importexport/)gestisce il problema, anche se il loro sistema ha un sacco di larghezza di banda.) 
    
ATTENZIONE: Se un dato valore per il più a sinistra (primo) l'asse variabile scompare dal set di dati remoto,EDDGridCopia NON cancella il file copiato locale. Se vuoi, puoi cancellarlo da solo.
    
#### Controllo della copia della griglia Dati{#grid-copy-checksourcedata} 
Thedatasets.xmlper questo dataset può avere un tag opzionale
```
    <checkSourceData>true</checkSourceData>  
```
Il valore predefinito è vero. Se/quando lo si imposta a false, il dataset non controllerà mai il dataset sorgente per vedere se ci sono dati aggiuntivi disponibili.

#### solo da{#onlysince} 
Si può direEDDGridCopia per fare una copia di un sottoinsieme del dataset sorgente, invece dell'intero dataset sorgente, aggiungendo un tag nel modulo&lt;solo dal punto di vista *alcuni Valore* &lt;/onlySince&gt; al datasetdatasets.xmlSbagliato.EDDGridCopia scarica solo i valori dei dati relativi ai valori della prima dimensione (di solito la dimensione del tempo) che sono più grandi *alcuni Valore* . *alcuni Valore* può essere:
    * Un tempo relativo specificato tramitenow- *NIENTE* .
Per esempio,&lt;solo dal punto di vistanow-2 anni&lt;/onlySince&gt; dice al dataset di fare solo copie locali dei dati per i dati in cui i valori della dimensione esterna (di solito i valori di tempo) sono negli ultimi 2 anni (che viene rivalutato ogni volta che il dataset viene ricaricato, che è quando cerca nuovi dati da copiare) . Vedere la[now- *NIENTE* descrizione sintassi](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now). Questo è utile se la prima dimensione ha dati di tempo, che di solito fa.
        
        EDDGridCopia non elimina i file di dati locali che hanno dati che, nel tempo, diventano più vecchi dinow- *NIENTE* . È possibile eliminare quei file in qualsiasi momento se si sceglie di farlo. Se lo fai, ti consigliamo vivamente di impostare un[bandiera](/docs/server-admin/additional-information#flag)dopo aver eliminato i file da raccontareEDDGridCopia per aggiornare l'elenco dei file memorizzati nella cache.
        
    * Un punto fisso nel tempo specificato come una stringa ISO 8601yyyy-MM-ddTHH:mm:ssZ.
Per esempio,&lt;Solo dal 2000-01T00:00:00:00:00Z&lt;/onlySince&gt; dice al dataset solo per fare copie locali di dati in cui il valore della prima dimensione è \\&gt;=2000-01T00:00:00Z . Questo è utile se la prima dimensione ha dati di tempo, che di solito fa.
         
    * Un numero di punti galleggianti.
Per esempio,&lt;solo dal punto di vista&gt;946684800.0&lt;. Le unità saranno le unità di destinazione della prima dimensione. Per esempio, per dimensioni del tempo, le unità inERDDAP™sono sempre"seconds since 1970-01-01T00:00:00Z". Così 946684800.0"seconds since 1970-01-01T00:00:00Z"è equivalente a 2000-01-01T00:00:00Z. Questa è sempre un'opzione utile, ma è particolarmente utile quando la prima dimensione non ha dati di tempo.

#### EDDGridCopia uso ricomposto{#eddgridcopy-recomended-use} 
1. Creare&lt;Dataset &gt; ingresso (il tipo nativo, nonEDDGridCopia) per la fonte di dati remota.
     **Funziona correttamente, inclusi tutti i metadati desiderati.** 
2. Se è troppo lento, aggiungere il codice XML per avvolgerlo in unEDDGridRicevuto.
    * Utilizzare un diversodatasetID  (forse cambiandodatasetIDdel vecchiodatasetIDleggermente) .
    * Copiare&lt;accessibile A &gt;&lt;reloadEveryNMinutes&gt; e&lt;onChange&gt; dal telecomandoEDDGrid's XML alEDDGridLa copia e' XML. (I loro valoriEDDGridCopia materia; i loro valori per l'insieme dei dati interni diventano irrilevanti.) 
3.  ERDDAP™farà e manterrà una copia locale dei dati.
         
* ATTENZIONE:EDDGridCopia presume che i valori di dati per ogni pezzo non cambino mai. Se / quando lo fanno, è necessario eliminare manualmente i file chunk in *BigParentDirectory* /copia/ *datasetID* / che è cambiato e[bandiera](/docs/server-admin/additional-information#flag)il set di dati da ricaricare in modo che i pezzi eliminati saranno sostituiti. Se si dispone di un abbonamento e-mail al dataset, si otterrà due e-mail: una quando il dataset prima ricarica e inizia a copiare i dati, e un'altra quando il dataset carica di nuovo (automaticamente) e rileva i nuovi dati locali.
     
* Tutti i valori dell'asse devono essere uguali.
Per ciascuno degli assi tranne il più a sinistra (primo) , tutti i valori devono essere uguali per tutti i bambini. La precisione del test è determinata da[matchAxisNDigits](#matchaxisndigits).
     
* Impostazioni, metadati, variabili --EDDGridCopia utilizza le impostazioni, i metadati e le variabili dal dataset di origine allegato.
     
* Cambiare i metadati -- Se hai bisogno di cambiareaddAttributeso modificare l'ordine delle variabili associate al dataset sorgente:
    1. CambiareaddAttributesper il dataset sorgente indatasets.xml, come necessario.
    2. Eliminare uno dei file copiati.
    3. Impostare un[bandiera](/docs/server-admin/additional-information#flag)per ricaricare immediatamente il dataset. Se si utilizza una bandiera e si dispone di un abbonamento e-mail al dataset, si otterrà due e-mail: una quando il dataset ricarica prima e inizia a copiare i dati, e un'altra quando il dataset carica di nuovo (automaticamente) e rileva i nuovi dati locali.
    4. Il file eliminato verrà rigenerato con i nuovi metadati. Se il dataset sorgente non è mai disponibile, ilEDDGridCopia dataset otterrà metadati dal file rigenerato, dal momento che è il file più giovane.
#### EDDGridCopia scheletro XML{#eddgridcopy-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridCopy" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or false   
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;checkSourceData>](#grid-copy-checksourcedata)...&lt;/checkSourceData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onlySince>](#onlysince)...&lt;/onlySince> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTable FromCassandra{#eddtablefromcassandra} 
[ **EDDTable FromCassandra** ](#eddtablefromcassandra)gestisce i dati da uno[Cassandra](https://cassandra.apache.org/)tavolo. Cassandra è un database NoSQL.

*   ERDDAP™può lavorare con Cassandra v2 e v3 senza modifiche o differenze di configurazione. Abbiamo testato con[Cassandra v2 e v3 da Apache](https://cassandra.apache.org/download/). È probabile cheERDDAP™può anche lavorare con Cassandra scaricato da DataStax.
     
* Per il mese di agosto 2019 - maggio 2021, abbiamo avuto difficoltà a ottenere Cassandra di lavorare con AdoptOpenJdkJavav8. Ha lanciato un'ESCEPTION\\_ACCESS\\_VIOLATION). Ma ora (maggio 2021) , quel problema è andato: possiamo usare con successo Cassandra v2.1.22 e AdoptOpenJdk jdk8u292-b10.
     
#### Una tabella{#one-table} 
Cassandra non supporta i "joins" nel modo in cui fanno i database relazionali. UnoERDDAP™EDDTableFromCassandra dataset mappe a uno (forse un sottoinsieme di uno) Tavolo Cassandra.

#### Cassandradatasets.xml {#cassandra-datasetsxml} 
*   ERDDAP™viene con la CassandraJavadriver, quindi non è necessario installarlo separatamente.
* Leggi attentamente tutte le informazioni di questo documento su EDDTableFromCassandra. Alcuni dei dettagli sono molto importanti.
* La CassandraJavadriver è destinato a lavorare con Apache Cassandra (1.2+) e DataStax Enterprise (3.1+) . Se si utilizza Apache Cassandra 1.2.x, è necessario modificare il file cassandra.yaml per ogni nodo per impostare start\\_native\\_transport: true, quindi riavviare ogni nodo.
* Si consiglia vivamente di utilizzare[Generare i dati Programma Xml](#generatedatasetsxml)per fare una bozza ruvida deldatasets.xmlchunk per questo dataset. È quindi possibile modificarlo per affinarlo (soprattutto [&lt;partizione Nome chiave» (#partitionkeysourcenames) ). È possibile raccogliere la maggior parte delle informazioni necessarie per creare l'XML per un dataset EDDTableFromCassandra contattando l'amministratore Cassandra e cercando il web.
    
Genera i dati Xml ha due opzioni speciali per EDDTableFromCassandra:
    
    1. Se si entra "&#33;&#33;&#33;LIST&#33;&#33;&#33;" (senza le citazioni) per lo spazio chiave, il programma visualizzerà un elenco di keyspaces
    2. Se si entra in uno spazio chiave specifico e quindi inserire "&#33;&#33;&#33;LIST&#33;&#33;&#33;" (senza le citazioni) per il nome del tavolo, il programma visualizzerà un elenco di tabelle in quel keyspace e le loro colonne.
##### Sensibilità del caso{#case-sensitivity} 
* Case-insensibile Keyspace e nomi della tabella -
Cassandra tratta keyspace e nomi da tavolo in modo insensibile. A causa di questo, non dovete mai usare una parola riservata (ma con un caso diverso) come uno spazio chiave Cassandra o un nome da tavolo.
* Nome della colonna insensibile --
Per impostazione predefinita, Cassandra tratta i nomi delle colonne in modo insensibile. Se si utilizza una delle parole riservate di Cassandra come nome di colonna (Ti prego, no&#33;) , tu devi usare
```
        <columnNameQuotes>"<columnNameQuotes>  
```
indatasets.xmlper questo dataset in modo che Cassandra eERDDAP™tratterà i nomi delle colonne in modo sensibile al caso. Questo probabilmente sarà un enorme mal di testa per voi, perché è difficile determinare le versioni caso-sensibili dei nomi delle colonne -- Cassandra mostra quasi sempre i nomi delle colonne come tutti i minuscoli, indipendentemente dal vero caso.
* Lavorare a stretto contatto con l'amministratore Cassandra, che può avere esperienza rilevante. Se il dataset non riesce a caricare, leggere[messaggio di errore](#troubleshooting-tips)attentamente per scoprire perché.
         
#### Cassandra&lt;connessione Proprietà &gt;{#cassandra-connectionproperty} 
Cassandra ha proprietà di connessione che possono essere specificate indatasets.xml. Molti di questi influenzeranno l'andamento della Cassandra-ERDDAP™connessione. Purtroppo, le proprietà di Cassandra devono essere impostate programmaticamente inJava#ERDDAP™deve avere il codice per ogni proprietàERDDAP™supporti. Attualmente,ERDDAP™supporta queste proprietà:
 (I default visualizzati sono ciò che vediamo. I default del sistema potrebbero essere diversi.) 

*    **Opzioni generali**   
    &lt;connessione Nome di proprietà=" **compressione** &gt; *nessuno|LZ4|snappy* &lt;/connessione Proprietà (case-insensibile, default=none)   
     (Consigli generali di compressione: usare 'none' se il collegamento tra Cassandra eERDDAP™è locale/veloce e utilizzare 'LZ4' se la connessione è remota/slow.)   
    &lt;connessione Nome di proprietà=" **credenziali** &gt; *nome utente/password* &lt;/connessione Proprietà (E' una lettera'/')   
    &lt;connessione Nome di proprietà=" **metriche** &gt; *vero|falso* &lt;/connessione Proprietà (2021-01-25 era predefinito=vero, ora ignorato e sempre falso)   
    &lt;connessione Nome di proprietà=" **porto** &gt; *Anonimo* &lt;/connessione Proprietà (default per il protocollo binario nativo=9042)   
    &lt;connessione Nome di proprietà=" **#** &gt; *vero|falso* &lt;/connessione Proprietà (default=false)   
     (Il mio rapido tentativo di usare ssl fallito. Se hai successo, per favore dimmi come hai fatto.) 
*    **Opzioni di query**   
    &lt;connessione Nome di proprietà=" **consistenza Livello** &gt; *Tutto|qualsiasi|ciascuno|locale / locale|locale\\_quorum|locale\\_serial|uno|quorum|seriale|tre|Due* &lt;/connessione Proprietà (case-insensibili, default=ONE)   
    &lt;connessione Nome di proprietà=" **Preferito** &gt; *Anonimo* &lt;/connessione Proprietà (predefinito = 5000)   
     (Non impostare fetchSize ad un valore più piccolo.)   
    &lt;connessione Nome di proprietà=" **serialConsistencyLevel** &gt; *Tutto|qualsiasi|ciascuno|locale / locale|locale\\_quorum|locale\\_serial|uno|quorum|seriale|tre|Due* &lt;/connessione Proprietà (caso-insensibile, predefinito=SERIAL) 
*    **Opzioni di presa**   
    &lt;connessione Nome di proprietà=" **collegareTimeoutMillis** &gt; *Anonimo* &lt;/connessione Proprietà (predefinito = 5000)   
     (Non impostare la connessione TimeoutMillis ad un valore più piccolo.)   
    &lt;connessione Nome di proprietà=" **mantenere viva** &gt; *vero|falso* &lt;/connessione Proprietà
    &lt;connessione Nome di proprietà=" **Leggi TimeoutMillis** &gt; *Anonimo* &lt;/connessione Proprietà
     (Cassandra's default readTimeoutMillis è 12000, maERDDAP™cambia il default a 120000. Se Cassandra sta lanciando readTimeouts, aumentando questo potrebbe non aiutare, perché Cassandra a volte li lancia prima di questa volta. Il problema è più probabile che si memorizzano troppi dati per partizione Combinazione chiave.)   
    &lt;connessione Nome di proprietà=" **ricevereBufferSize** &gt; *Anonimo* &lt;/connessione Proprietà
     (Non è chiaro ciò che il default riceveBufferSize è. Non impostare questo a un piccolo valore.)   
    &lt;connessione Nome di proprietà=" **Solitario** &gt; *Anonimo* &lt;/connessione Proprietà
    &lt;connessione Nome di proprietà=" **TcpNoDelay** &gt; *vero|falso* &lt;/connessione Proprietà (default=null) 

Se è necessario essere in grado di impostare altre proprietà di connessione, vedere il nostro[sezione per ottenere supporto aggiuntivo](/docs/intro#support).

Per una data startup di Tomcat, la connessioneProperties viene utilizzata solo la prima volta che un dataset viene creato per un dato URL Cassandra. Tutti i reload di quel dataset e tutti i successivi dataset che condividono lo stesso URL utilizzeranno quelle connessioni originaliProperties.
    
#### CQL{#cql} 
La lingua di query della Cassandra (CQL) è superficiale come SQL, la lingua di query utilizzata dai database tradizionali. Perché?OPeNDAP'le richieste di dati tabulari sono state progettate per imitare le richieste di dati tabular SQL, è possibile perERDDAP™per convertire le richieste di dati tabulari in CQL Bound/PreparedStatements.ERDDAP™registra la dichiarazione in[log.txt](/docs/server-admin/additional-information#log)come
dichiarazione come testo: *lo stato di testo*   
La versione dell'affermazione che vedete sarà una rappresentazione del testo dell'affermazione e avrà solo "?", dove saranno collocati i valori di vincolo.
       
Non così semplice... Purtroppo, CQL ha molte restrizioni su cui le colonne possono essere interrogate con quali tipi di vincoli, ad esempio, le colonne chiave della partizione possono essere limitate con = e IN, quindiERDDAP™invia alcuni vincoli a Cassandra e applica tutti i vincoli dopo che i dati vengono ricevuti da Cassandra. Per aiutareERDDAP™trattare in modo efficiente con Cassandra, è necessario specificare [&lt;partizione Nome chiave» (#partitionkeysourcenames) ♪&lt;clusterColumnSourceNames&gt;] (#clustercolumnsourcenames) E...&lt;indiceColumnSourceNames&gt;] (#indexcolumnsourcenames) indatasets.xmlper questo dataset. Questi sono i modi più importanti per aiutareERDDAP™lavorare in modo efficiente con Cassandra. Se non lo diciERDDAP™queste informazioni, il dataset sarà dolorosamente lento inERDDAP™e usare tonnellate di risorse Cassandra.
     
#### &lt;partizione KeySourceNames&gt;{#partitionkeysourcenames} 
Perché le chiavi della partizione giocano un ruolo centrale nelle tabelle Cassandra,ERDDAP™ha bisogno di saperesourceNames e, se pertinente, altre informazioni su come lavorare con loro.
* È necessario specificare un elenco separato da virgola dei nomi delle colonne delle chiavi di partizione indatasets.xmlvia&lt;partizione KeySourceNames&gt;.
Esempio semplice,
```
        <partitionKeySourceNames>station, deviceid<partitionKeySourceNames>  
```
Esempio più complesso,
```
        <partitionKeySourceNames>deviceid=1007, date/sampletime/1970-01-01<partitionKeySourceNames>
```
* TimeStamp Partition Keys -- Se una delle colonne chiave della partizione è una colonna timestamp che ha una versione di un'altra colonna timestamp, specificare questo tramite
     *partizioneKeySourcName/altroColumnSourceName/time\\_precision*   
dovetime\\_precisionè uno dei[time\\_precision](#time_precision)stringhe utilizzate altrove inERDDAP.
Il sentiero Z neltime\\_precisionstringa è il default, quindi non importa se latime\\_precisionstringa termina in Z o no.
Per esempio,ERDDAP™interpreterà la data/sampletime/1970-01-01 come "I vincoli per la data possono essere costruiti da vincoli sull'ora del campione utilizzando questotime\\_precision." La conversione effettiva dei vincoli è più complessa, ma questa è la panoramica.
     **Utilizzare questo ogni volta che è rilevante.** ConsenteERDDAP™lavorare in modo efficiente con Cassandra. Se questo rapporto tra colonne esiste in una tabella Cassandra e non lo diciERDDAP™, il dataset sarà dolorosamente lento inERDDAP™e usare tonnellate di risorse Cassandra.
* Singola Tasti di partizione del valore -- Se vuoi unERDDAP™dataset per lavorare con un solo valore di una chiave di partizione, specificare *partizioneKeySourceName=valore* .
Non usare preventivi per una colonna numerica, ad esempio, deviceid=1007
Utilizzare le citazioni per una colonna String, per esempio, stationid="Point Pinos"
* Dataset Default Ordinare -- L'ordine della chiave di partizione&lt;dataVariable&gt; è indatasets.xmldetermina l'ordine predefinito dei risultati da Cassandra. Naturalmente, gli utenti possono richiedere un ordine diverso per una data serie di risultati tramite appending &orderBy (" *elenco separato da virgola delle variabili* ") alla fine della loro domanda.
* Per impostazione predefinita, Cassandra eERDDAP™trattare i nomi delle colonne in modo insensibile. Ma se si imposta[colonnaNameQuotes](#case-sensitivity)"ERDDAP™tratterà i nomi delle colonne Cassandra in modo sensibile al caso.
         
#### &lt;partizione KeyCSV&gt;{#partitionkeycsv} 
Se questo è specificato,ERDDAP™lo userà invece di chiedere a Cassandra per la partizione Informazioni chiave ogni volta che il dataset viene ricaricato. Questo fornisce l'elenco dei valori chiave di partizione distinti, nell'ordine che verranno utilizzati. I tempi devono essere specificati come secondi dal 1970-01-01T00:00:00Z. Ma ci sono anche due modi alternativi speciali per specificare i tempi (ogni codificato come una stringa) :

1) tempo (aISO8601 Tempo)   (MAY essere codificato come una stringa)   
2) "tempo" (aISO8601StartTime, strideSeconds, stopTime) " (DEVE essere codificato come una stringa)   
Fermati. Il tempo può essere ISO8601 Tempo o "now-tempo (ad esempio, "now-3 minuti") .
Fermati. Il tempo non deve essere esattamente un inizio Tempo + x strideSeconds.
Una fila con le volte () il valore viene espanso in più righe prima di ogni query, quindi l'elenco della partizione Le chiavi possono essere sempre perfettamente aggiornate.
Per esempio,
```
    <partitionKeyCSV>
    deviceid,date
    1001,"times(2014-11-01T00:00:00Z, 86400, 2014-11-02T00:00:00Z)"
    1007,"time(2014-11-07T00:00:00Z)"
    1008,time(2014-11-08T00:00:00Z)
    1009,1.4154912E9
    </partitionKeyCSV>
```
si espande in questa tabella di combinazioni di tasti partizione:
```
    deviceid,date
    1001,1.4148E9
    1001,1.4148864E9
    1007,1.4153184E9
    1008,1.4154048E9
    1009,1.4154912E9 
```
#### &lt;clusterColumnSourceNames&gt;{#clustercolumnsourcenames} 
Cassandra accetta vincoli SQL-like sulle colonne a grappolo, che sono le colonne che formano la seconda parte della chiave primaria (dopo la chiave della partizione (#) ) . Quindi, è essenziale che identifichi queste colonne tramite&lt;clusterColumnSourceNames&gt;. Questo consenteERDDAP™lavorare in modo efficiente con Cassandra. Se ci sono colonne di cluster e non lo diciERDDAP, il dataset sarà dolorosamente lento inERDDAP™e usare tonnellate di risorse Cassandra.
    * Per esempio,&lt;clusterColumnSourceNames&gt; *myClusterColumn1, myClusterColumn2* &lt;/clusterColumnSourceNames&gt;
    * Se una tabella Cassandra non ha colonne di cluster, non specificare&lt;clusterColumnSourceNames&gt;, o specificarlo senza valore.
    * Per impostazione predefinita, Cassandra eERDDAP™trattare i nomi delle colonne in modo insensibile. Ma se si imposta[colonnaNameQuotes](#case-sensitivity)"ERDDAP™tratterà i nomi delle colonne Cassandra in modo sensibile al caso.
         
#### &lt;indiceColumnSourceNames&gt;{#indexcolumnsourcenames} 
Cassandra accetta'='vincoli sulle colonne indici secondari, che sono le colonne che hai esplicitamente creato indici per via
```
    CREATE INDEX *indexName* ON *keyspace.tableName* (*columnName*);  
```
 (Sì, sono necessarie le parentesi.)   
Quindi, è molto utile se si identificano queste colonne tramite&lt;IndiceColumnSourceNames&gt;. Questo consenteERDDAP™lavorare in modo efficiente con Cassandra. Se ci sono colonne di indice e non lo diciERDDAP, alcune domande saranno inutilmente, dolorosamente lento inERDDAP™e usare tonnellate di risorse Cassandra.
* Per esempio,&lt;indiceColumnSourceNames&gt; *myIndexColumn1, myIndexColumn2* &lt;/indexColumnSourceNames&gt;
* Se una tabella Cassandra non ha colonne di indice, non specificare&lt;indiceColumnSourceNames&gt;, o specificarlo senza valore.
* ATTENZIONE: Gli indici Cassandra non sono come gli indici dei database. Gli indici Cassandra aiutano solo con'='vincoli. E sono solo[raccomandato](https://cassandra.apache.org/doc/latest/cql/indexes.html)per colonne che hanno valori molto meno distinti rispetto ai valori totali.
* Per impostazione predefinita, Cassandra eERDDAP™trattare i nomi delle colonne in modo insensibile. Ma se si imposta[colonnaNameQuotes](#case-sensitivity)"ERDDAP™tratterà i nomi delle colonne Cassandra in modo sensibile al caso.
         
#### &lt;maxRequestFraction&gt;{#maxrequestfraction} 
QuandoERDDAP™  (re) carica un dataset,ERDDAP™ottiene da Cassandra l'elenco di combinazioni distinte delle chiavi di partizione. Per un enorme dataset, il numero di combinazioni sarà enorme. Se si desidera impedire agli utenti di richiedere la maggior parte o tutti i dataset (o anche una richiesta che chiedeERDDAP™per scaricare la maggior parte o tutti i dati per filtrarlo ulteriormente) # You can tell #ERDDAP™solo per consentire richieste che riducono il numero di combinazioni di un certo importo tramite&lt;maxRequestFraction&gt;, che è un numero di punto variabile tra 1e-10 (che significa che la richiesta non può avere più di 1 combinazione in un miliardo) e 1 (il default, il che significa che la richiesta può essere per l'intero dataset) .
Ad esempio, se un dataset ha 10000 combinazioni distinte delle chiavi della partizione e maxRequestFraction è impostato a 0.1,
poi le richieste che necessitano di dati da 1001 o più combinazioni genereranno un messaggio di errore,
ma le richieste che necessitano di dati da 1000 o meno combinazioni saranno consentite.
    
Generalmente, più grande è il dataset, più basso è necessario impostare&lt;maxRequestFraction&gt;. Così si potrebbe impostare a 1 per un piccolo dataset, 0.1 per un dataset di medie dimensioni, 0.01 per un grande dataset, e 0.0001 per un enorme dataset.
    
Questo approccio è lontano da perfetto. Essa porterà ad alcune ragionevoli richieste di rigetto e ad alcune richieste troppo grandi. Ma è un problema difficile e questa soluzione è molto meglio di niente.
    
#### CassandrasubsetVariables {#cassandra-subsetvariables} 
Come con altri set di dati EDDTable, è possibile specificare un elenco separato da virgola di&lt;dataVariable&gt;destinationNames in un attributo globale chiamato "[subsetVariables](#subsetvariables)" per identificare variabili che hanno un numero limitato di valori. Il dataset avrà poi una pagina web .subset e mostra liste di valori distinti per quelle variabili in elenchi a discesa su molte pagine web.
    
Comprese solo le variabili chiave di partizione e le colonne statiche nell'elenco è STRONGLY ENCOURAGED. Cassandra sarà in grado di generare l'elenco di combinazioni distinte molto rapidamente e facilmente ogni volta che il dataset viene ricaricato. Un'eccezione è chiavi di partizione timestamp che sono versioni grossolane di qualche altra colonna timestamp -- è probabilmente meglio lasciare questi dall'elenco disubsetVariablesdal momento che ci sono un gran numero di valori e non sono molto utili per gli utenti.
    
Se si include la chiave di non partizione, variabili non statiche nell'elenco, probabilmente sarà **Molto bene.** computazionalmente costoso per Cassandra ogni volta che il dataset viene ricaricato, perchéERDDAP™deve guardare attraverso ogni riga del dataset per generare le informazioni. Infatti, la query Ã ̈ probabile che fallisca. Quindi, ad eccezione di piccoli dataset, questo è STRONGLY DISCOURAGED.
    
#### Cassandra DataTipe{#cassandra-datatypes} 
Perché c'è qualche ambiguità su cui[Tipo di dati Cassandra](https://cassandra.apache.org/doc/latest/cql/types.html)mappa a cuiERDDAP™tipi di dati, è necessario specificare un [&lt;dataType&gt;] (#datatype #) tag per ogni [&lt;dataVariable&gt; (#datavariabile #) per direERDDAP™quali datiTipo da usare. Lo standardERDDAP™dati Tipi (e i più comuni tipi di dati Cassandra corrispondenti) sono:
    
*   [boolean](#boolean-data)  (boolean) cheERDDAP™poi memorizza come byte
* byte (int, se la gamma è -128 a 127) 
* breve (int, se la gamma è -32768 a 32767) 
* In (int, contro?, varint?, se la gamma è -2147483648 a 2147483647) 
* lungo (bigint, counter?, varint?, se la gamma è -9223372036854775808 a 9223372036854775807) 
* galleggiante (galleggiante) 
* doppio (doppia, decimale (con possibile perdita di precisione) ♪) 
* carbone (ascii o testo, se non hanno mai più di 1 carattere) 
* String (ascii, text, varchar, inet, uuid, timeuuid, blob, map, set, list?) 

Cassandra[timestamp](#cassandra-timestamp-data)è un caso speciale: usoERDDAP'due dati Tipo.

Se specifichi un dati di stringaTipo inERDDAP™per una mappa, un insieme o un elenco di Cassandra, la mappa, il set o l'elenco su ogni riga Cassandra saranno convertiti in una singola stringa su una singola rigaERDDAP™tavolo.ERDDAP™ha un sistema alternativo per le liste; vedi sotto.

 *tipo* Liste...ERDDAP#&lt;dataType&gt;] (#datatype #) tag per CassandradataVariables può includere il regolareERDDAP™dati Tipi (vedi sopra) più diversi dati specialiTipi che possono essere utilizzati per colonne di elenco Cassandra: booleanList, byteList, ubyteList, shortList, ushortList, intList, uintList, longList, ulongList, floatList, doubleList, charList, StringList. Quando una di queste colonne di elenco è nei risultati che vengono passati aERDDAP™, ogni riga di dati di origine verrà estesa all'elenco. dimensione () righe di dati inERDDAP; dati semplici Tipi (per esempio, int) in quella riga di dati di origine sarà l'elenco duplicato. dimensione () tempi. Se i risultati contengono più di una variabile di elenco, tutti gli elenchi su una determinata riga di dati DEVE avere la stessa dimensione e DEVE essere liste "parallele" oERDDAP™genererà un messaggio di errore. Ad esempio, per le misurazioni delle correnti da un ADCP,
profondità\\[0\\],\\[0\\],\\[0\\], e\\[0\\]sono tutti correlati, e
profondità\\[1\\],\\[1\\],\\[1\\], e\\[1\\]sono tutti correlati, ...
In alternativa, se non vuoiERDDAP™per espandere un elenco in più righeERDDAP™tabella, specificare String comedataVariable'i dati Tipo così l'intero elenco sarà rappresentato come uno String su una riga inERDDAP.
    
#### Cassandra TimeStampa dati{#cassandra-timestamp-data} 
I dati del timestamp di Cassandra sono sempre consapevoli dei fusi orari. Se si immetteno dati timestamp senza specificare un fuso orario, Cassandra assume che il timestamp utilizzi il fuso orario locale.
    
ERDDAP™supporta i dati timestamp e presenta sempre i dati nelZulu/GMT fuso orario. Quindi, se si inserisce i dati timestamp in Cassandra utilizzando un fuso orario diverso da quelloZulu/GMT, ricorda che è necessario fare tutte le domande per i dati timestamp inERDDAP™usandoZulu/GMT fuso orario. Quindi non essere sorpreso quando i valori timestamp che escono daERDDAPsono spostati da diverse ore a causa del commutatore di fuso orario da locale aZuluL'ora della GMT.

* InERDDAP'datasets.xml, nel&lt;dataVariable&gt; tag per una variabile di timestamp, set
```
          <dataType>double</dataType>  
```
e&lt;addAttributes&gt; set
```
          <att name="units">seconds since 1970-01-01T00:00:00Z</att>
```
* Suggerimento: Se i dati sono un intervallo di tempo, è utile avere i valori timestamp si riferiscono al centro dell'intervallo di tempo implicito (per esempio, mezzogiorno) . Ad esempio, se un utente ha dati per 2010-03-26T13:00Z da un altro dataset e desidera i dati più vicini da questo dataset Cassandra che ha dati per ogni giorno, quindi i dati per 2010-03-26T12:00Z (rappresentazione dei dati Cassandra per tale data) è ovviamente il migliore (al contrario della mezzanotte prima o dopo, dove è meno evidente che è meglio) .
*   ERDDAP™ha una utilità per[Convertire un Numerico Tempo di / da un tempo di stress](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html).
* Vedi[Come?ERDDAP™Offerte con il tempo](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap).
         
#### Integer nulls{#integer-nulls} 
Cassandra sostiene nulls in Cassandra int (ERDDAP™In) e bigint (ERDDAP™lungo) colonne, maERDDAP™non supporta i veri nulls per qualsiasi tipo di dati interi.
Per impostazione predefinita, Cassandra integer nulls sarà convertito inERDDAP™a 2147483647 per colonne int, o 9223372036854775807 per colonne lunghe. Questi apparirà come "NaN" in alcuni tipi di file di output di testo (per esempio, .csv) , "" in altri tipi di file di output di testo (per esempio,.htmlTable) , e il numero specifico (2147483647 per valori int mancanti) in altri tipi di file (per esempio, file binari come.nce tappetino) . Un utente può cercare righe di dati con questo tipo di valore mancante facendo riferimento a "NaN", ad esempio "&windSpeed=NaN".
    
Se si utilizza un altro valore intero per indicare i valori mancanti nella tabella Cassandra, si prega di identificare quel valore indatasets.xml:

>    &lt;att name="missing\\_value" [type="int"](#attributetype)\\>-999&lt;/att>

Per colonne a punto galleggiante Cassandra, nulls vengono convertiti in NaNsERDDAP. Per i tipi di dati Cassandra convertiti in stringheERDDAP™, nulls ottenere convertito a vuoto Strings. Non dovrebbe essere un problema.
    
#### " ATTENZIONE: Re-preparing già preparato query"{#warning-re-preparing-already-prepared-query} 
* " ATTENZIONE: Re-preparing già preparato query" in *tomcat* /logs/catalina.out (o qualche altro file di registro Tomcat)   
La documentazione di Cassandra dice che c'è problema se la stessa query è fatta in uno stato preparato due volte (o più) . (Vedi questo[rapporto bug](https://datastax-oss.atlassian.net/browse/JAVA-236).) Per evitare di far arrabbiare Cassandra,ERDDAP™caches all ReadydStatements in modo da poterli riutilizzare. Quella cache è persa se/quando Tomcat/ERDDAP™è riavviata, ma penso che vada bene perché gli Stati preparatori sono associati a una data sessione (traJavae Cassandra) , che è anche perso. Quindi, potete vedere questi messaggi. Non conosco nessun'altra soluzione. Fortunatamente, è un avvertimento, non un errore (anche se Cassandra minaccia che può portare a problemi di prestazione) .
    
Cassandra sostiene che gli Stati preparati sono buoni per sempre, quindiERDDAPGli Stati Preparad non dovrebbero mai diventare out-of-date/invalid. Se questo non è vero, e si ottiene errori su alcuni Stati preparati essere out-of-date/invalid, allora è necessario riavviareERDDAP™per liberareERDDAPE' la cache di ReadydStatements.
    
#### Cassandra Sicurezza{#cassandra-security} 
Vedi[Securing Cassandra](https://cassandra.apache.org/doc/latest/operating/security.html)

Quando si lavora con Cassandra, è necessario fare le cose il più in modo sicuro e sicuro possibile per evitare di consentire a un utente dannoso di danneggiare la Cassandra o ottenere l'accesso ai dati a cui non dovrebbero avere accesso.ERDDAP™Cerca anche di fare le cose in modo sicuro.

* Vi incoraggiamo a prepararviERDDAP™per connettersi a Cassandra come utente Cassandra che ha solo accesso **rilevante** tavolo (#) e ha solo privilegi READ.
* Vi invitiamo a impostare il collegamento daERDDAP™a Cassandra così che
    * usa sempre SSL,
    * solo consente connessioni da un indirizzo IP (o un blocco di indirizzi) e da quelloERDDAP™utente, e
    * trasferisce solo le password nel loro MD5 hashed form.
*   \\[PROBLEMI DI LAVORO\\]La connessioneProprietà (inclusa la password&#33;) sono memorizzati come testo normale indatasets.xml. Non abbiamo trovato un modo per consentire all'amministratore di inserire la password di Cassandra durante ilERDDAP's startup in Tomcat (che si verifica senza input utente) , quindi la password deve essere accessibile in un file. Per rendere questo più sicuro:
    * # (ilERDDAP™amministratore) dovrebbe essere il proprietario didatasets.xmle avere accesso READ e WRITE.
    * Fai un gruppo che include solo user=tomcat. Utilizzare chgrp per rendere che il gruppo perdatasets.xml, con solo privilegi READ.
    * Utilizzare chmod per assegnare privilegi o-rwx (nessun accesso READ o WRITE per "altri utenti") perdatasets.xml.
* QuandoERDDAP™, la password e altre proprietà di connessione sono memorizzate in "privato"Javavariabili.
* Le richieste dei clienti sono analizzate e verificate per la validità prima di generare le richieste CQL per Cassandra.
* Le richieste a Cassandra sono fatte con CQL Bound/PreparedStatements, per evitare l'iniezione CQL. In ogni caso, Cassandra è intrinsecamente meno sensibile all'iniezione di CQL rispetto ai database tradizionali.[SQL injection](https://en.wikipedia.org/wiki/SQL_injection).
         
#### Velocità di cassandra{#cassandra-speed} 
Cassandra può essere veloce o lento. Ci sono alcune cose che puoi fare per farlo in fretta:
* In generale -
La natura di CQL è che le query sono[dichiarativo](https://en.wikipedia.org/wiki/Declarative_programming). Specificano solo ciò che l'utente vuole. Non includono una specifica o suggerimenti per come la query deve essere gestita o ottimizzata. Quindi non c'è modo diERDDAP™generare la query in modo tale che aiuti Cassandra ad ottimizzare la query (o in qualsiasi modo specifica come la query deve essere gestita) . In generale, spetta all'amministratore Cassandra impostare le cose (per esempio, indici) ottimizzare per alcuni tipi di query.
     
* Specificare le colonne timestamp che sono relative a tasti di partizione timestamp di precisione di coarser via [&lt;partizione Nome chiave» (#partitionkeysourcenames) è il modo più importante per aiutareERDDAP™lavorare in modo efficiente con Cassandra. Se questo rapporto esiste in un tavolo Cassandra e non lo diciERDDAP™, il dataset sarà dolorosamente lento inERDDAP™e usare tonnellate di risorse Cassandra.
     
* Specificare le colonne del cluster tramite [&lt;clusterColumnSourceNames&gt;] (#clustercolumnsourcenames) è il secondo modo più importante per aiutareERDDAP™lavorare in modo efficiente con Cassandra. Se ci sono colonne di cluster e non lo diciERDDAP, un grande sottoinsieme delle possibili query per i dati sarà inutilmente, dolorosamente lento inERDDAP™e usare tonnellate di risorse Cassandra.
     
* #[Indici](https://cassandra.apache.org/doc/latest/cql/indexes.html)per Variabili Comunemente Constrained --
È possibile accelerare alcune query creando indici per colonne Cassandra che sono spesso costrette con vincoli "=".
    
Cassandra non può fare indici per le colonne di elenco, set o mappa.
    
* Specificare le colonne dell'indice tramite [&lt;indiceColumnSourceNames&gt;] (#indexcolumnsourcenames) è un modo importante per aiutareERDDAP™lavorare in modo efficiente con Cassandra. Se ci sono colonne di indice e non lo diciERDDAP, alcune domande per i dati saranno inutilmente, dolorosamente lento inERDDAP™e usare tonnellate di risorse Cassandra.
     
#### Cassandra Stats{#cassandra-stats} 
*   [Messaggi diagnostici "Cassandra stats"](#cassandra-stats)-- Per ogniERDDAP™query utente a un dataset Cassandra,ERDDAP™stamperà una linea nel file di registro, *BigParentDirectory* /logs/log.txt, con alcune statistiche relative alla query, per esempio,
```
        \\* Cassandra stats: partitionKeyTable: 2/10000=2e-4 < 0.1 nCassRows=1200 nErddapRows=12000 nRowsToUser=7405  
```
Utilizzando i numeri nell'esempio precedente, questo significa:

* QuandoERDDAP™Ultimo (re) caricato questo dataset, Cassandra dettoERDDAP™che ci sono state 10000 combinazioni distinte delle chiavi della partizione.ERDDAP™memorizzato tutte le combinazioni distinte in un file.
* A causa dei vincoli dell'utente,ERDDAP™identificato 2 combinazioni su 10000 che potrebbero avere i dati desiderati. Allora...ERDDAP™farà 2 chiamate a Cassandra, una per ogni combinazione delle chiavi di partizione. (Ecco cosa richiede Cassandra.) Chiaramente, è problematico se un grande dataset ha un gran numero di combinazioni delle chiavi di partizione e una data richiesta non riduce drasticamente questo. È possibile richiedere che ogni richiesta ridurre lo spazio chiave impostando [&lt;MaxRequestFraction&gt;] (# Maxrequestfraction) . Qui, 2/10000=2e-4, che è inferiore alla maxRequestFraction (0,1) , così la richiesta è stata consentita.
* Dopo aver applicato i vincoli sulle chiavi della partizione,[colonne di cluster](#clustercolumnsourcenames)e[colonne indice](#indexcolumnsourcenames)che sono stati inviatiERDDAP™, Cassandra ha restituito 1200 file di dati aERDDAP™nel Risultato.
* Il Risultato Set deve aver avuto[dati Traduzione: *qualche tipo* Elenco](#cassandra-datatypes)colonne (con una media di 10 elementi per lista) perchéERDDAP™ampliato le 1200 file da Cassandra in 12000 righe inERDDAP.
*   ERDDAP™applica sempre tutti i vincoli dell'utente ai dati di Cassandra. In questo caso, i vincoli che Cassandra non aveva mosso hanno ridotto il numero di file a 7405. Questo è il numero di righe inviate all'utente.

L'uso più importante di questi messaggi diagnostici è quello di assicurarsi cheERDDAP™sta facendo quello che pensi stia facendo. Se non lo è (per esempio, non sta riducendo il numero di combinazioni distinte come previsto?) Poi puoi usare le informazioni per cercare di capire cosa sta succedendo.
 
* Ricerca e sperimentazione per trovare e impostare meglio [&lt;connessioneProperty&gt;] (#cassandra-connectionproperty) 's.
 
* Controllare la velocità della connessione di rete tra Cassandra eERDDAP. Se la connessione è lenta, vedere se è possibile migliorare. La situazione migliore è quandoERDDAP™è in esecuzione su un server collegato allo stesso (veloce) passare come server che esegue il nodo Cassandra a cui si collega.
 
* Sii paziente. Leggi attentamente le informazioni qui e nella documentazione Cassandra. Esperimento. Controlla il tuo lavoro. Se la Cassandra...ERDDAP™il collegamento è ancora più lento di quanto ci si aspetta, si prega di includere lo schema della tabella Cassandra e il vostroERDDAP™pezzo didatasets.xmle vedere il nostro[sezione per ottenere supporto aggiuntivo](/docs/intro#support).
 
* Se tutto il resto fallisce,
considerare la memorizzazione dei dati in una raccolta diNetCDFV.ncfile (soprattutto.ncfile che utilizzano[CFU Geometrie di smorzamento discreto (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Contiguous Ragged Array strutture di dati e così può essere gestito conERDDAP'[EDDTableFromNcCFFiles](#eddtablefromnccffiles)) . Se sono organizzati logicamente (ciascuno con i dati per un pezzo di spazio e tempo) ♪ERDDAP™può estrarre i dati da loro molto rapidamente.
         
#### EDDTableFromCassandra scheletro XML{#eddtablefromcassandra-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromCassandra" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;ipAddress>](#sourceurl)...&lt;/ipAddress>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The Cassandra URL without the port number, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;127.0.0.1 REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[connectionProperty](#cassandra-connectionproperty) name="*name*">*value*&lt;/connectionProperty>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The names (for example, "readTimeoutMillis") and values  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;of the Cassandra properties that ERDDAP™ needs to change.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0 or more. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;keyspace>...&lt;/keyspace> &lt;!-- The name of the keyspace that has  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the table. REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;tableName>...&lt;/tableName> &lt;!-- The name of the table, default = "".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;partitionKeySourceNames>](#partitionkeysourcenames)...&lt;partitionKeySourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;clusterColumnSourceNames>](#clustercolumnsourcenames)...&lt;clusterColumnSourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;indexColumnSourceNames>](#indexcolumnsourcenames)...&lt;indexColumnSourceNames> &lt;!-- OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;maxRequestFraction>](#maxrequestfraction)...&lt;maxRequestFraction>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- OPTIONAL double between 1e-10 and 1 (the default). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;columnNameQuotes>](#case-sensitivity)...&lt;columnNameQuotes> &lt;!-- OPTIONAL.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Options: \\[nothing\\] (the default) or ". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Each dataVariable MUST include a [&lt;dataType>](#datatype) tag. See  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [Cassandra DataTypes](#cassandra-datatypes).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; For [Cassandra timestamp columns](#cassandra-timestamp-data), set dataType=double and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; units=seconds since 1970-01-01T00:00:00Z -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromDapSequenza{#eddtablefromdapsequence} 
[ **EDDTableFromDapSequenza** ](#eddtablefromdapsequence)gestisce variabili all'interno di sequenze di 1 e 2 livelli da[DAP](https://www.opendap.org/)server comeDAPPER (era https://www.pmel.noaa.gov/epic/software/dapper/ , ora interrotto) .

* Si consiglia vivamente di utilizzare[Generare i dati Programma Xml](#generatedatasetsxml)per fare una bozza ruvida deldatasets.xmlchunk per questo dataset. Puoi quindi modificarlo per affinarlo. È possibile raccogliere le informazioni necessarie guardando i file DDS e DAS del set di dati di origine nel browser (aggiungendo .das e .dds alsourceUrl(un esempio è stato https://dapper.pmel.noaa.gov/dapper/epic/tao\\_time\\_series.cdp.dds ).
    
* Una variabile è in unaDAPsequenza se la risposta .dds indica che la struttura dei dati che tiene la variabile è una "sequenza" (caso insensibile) .
* In alcuni casi, si vedrà una sequenza all'interno di una sequenza, una sequenza di 2 livelli -- EDDTableFromDapSequence gestisce anche questi.
#### EDDTableFromDapSequence scheletro XML{#eddtablefromdapsequence-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromDapSequence" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;outerSequenceName>...&lt;/outerSequenceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the outer sequence for DAP sequence data.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This tag is REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;innerSequenceName>...&lt;/innerSequenceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the inner sequence for DAP sequence data.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This tag is OPTIONAL; use it if the DAP data is a two level  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sequence. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringEQNE>](#sourcecanconstrainstringeqne)true|false&lt;/sourceCanConstrainStringEQNE>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringGTLT>](#sourcecanconstrainstringgtlt)true|false&lt;/sourceCanConstrainStringGTLT>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringRegex>](#sourcecanconstrainstringregex)...&lt;/sourceCanConstrainStringRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;skipDapperSpacerRows>...&lt;/skipDapperSpacerRows>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- skipDapperSpacerRows specifies whether the dataset  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;will skip the last row of each innerSequence other than the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;last innerSequence (because Dapper servers put NaNs in the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;row to act as a spacer).  This tag is OPTIONAL. The default  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is false.  It is recommended that you set this to true for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;all Dapper sources and false for all other data sources. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

### EDDTableDatabase{#eddtablefromdatabase} 
[ **EDDTableDatabase** ](#eddtablefromdatabase)gestisce i dati da una tabella di database relazionale o[vista](https://en.wikipedia.org/wiki/View_(database)).

#### Una tabella o vista{#one-table-or-view} 
Se i dati che si desidera servire sono in due o più tabelle (e quindi ha bisogno di un JOIN per estrarre i dati da entrambe le tabelle contemporaneamente) # Devi farne uno #[denormalizzato](https://en.wikipedia.org/wiki/Denormalization)  (già entrato) tavolo o[vista](https://en.wikipedia.org/wiki/View_(SQL)) con tutti i dati che si desidera rendere disponibili come dataset inERDDAP.

Per grandi database complessi, può avere senso separare diversi pezzi come tabelle denormalizzate, ciascuno con un diverso tipo di dati, che diventerà set di dati separati inERDDAP.

Fare un tavolo denormalizzato per l'usoERDDAP™Potrebbe sembrare un'idea folle per te. Ti prego, fidati di noi. Ci sono diversi motivi per cuiERDDAP™opere con tavoli denormalizzati:

* È molto più facile per gli utenti.
QuandoERDDAP™presenta il dataset come una, semplice, denormalizzata, singola tabella, è molto facile per chiunque comprendere i dati. La maggior parte degli utenti non hanno mai sentito parlare di tabelle normalizzate, e pochissime comprendono le chiavi, le chiavi estere o le unioni di tabella, e quasi certamente non conoscono i dettagli dei diversi tipi di unioni, o come specificare l'SQL per fare un'unione (o più unioni) correttamente. Utilizzando un tavolo denormalizzato evita tutti quei problemi. Questa sola ragione giustifica l'uso di una singola tabella denormalizzata per la presentazione di un set di datiERDDAP™utenti.
     
* Tabelle normalizzate (più tabelle relative a colonne chiave) sono grandi per la memorizzazione dei dati in un database.
Ma anche in SQL, il risultato che viene restituito all'utente è un denormalizzato (un) tavolo singolo. Così sembra ragionevole presentare il dataset agli utenti come un enorme, denormalizzato, singola tabella da cui possono quindi richiedere sottoinsiemi (ad esempio, mostrami le righe della tabella in cui la temperatura&gt; 30) .
     
* È possibile apportare modificheERDDAP™senza cambiare i tavoli.
    ERDDAP™ha alcuni requisiti che possono essere diversi da come hai impostato il tuo database.
Per esempio,ERDDAP™richiede che i dati timestamp vengano memorizzati in campi 'timestamp con timezone'.
Facendo una tabella / vista separata perERDDAP™, si possono fare questi cambiamenti quando si effettua il tavolo denormalizzato perERDDAP. Così, non è necessario apportare modifiche ai vostri tavoli.
     
*   ERDDAP™ricreare una parte della struttura dei tavoli normalizzati.
È possibile specificare quali colonne di dati provengono dalle tabelle "outer" e quindi hanno un numero limitato di valori distinti.ERDDAP™raccoglierà tutte le diverse combinazioni di valori in queste colonne e le presenterà agli utenti su uno speciale . sottoset pagina web che aiuta gli utenti a selezionare rapidamente i sottoset del dataset. I valori distinti per ogni colonna sono mostrati anche negli elenchi a discesa sulle altre pagine web del set di dati.
     
* Una tabella denormalizzata rende i dati di consegna da voi aERDDAPamministratore facile.
Sei l'esperto di questo dataset, quindi ha senso che si prendono le decisioni su quali tabelle e quali colonne unirsi e come unirsi a loro. Quindi non devi consegnarci. (o peggio, gli utenti finali) diverse tabelle e istruzioni dettagliate per unirsi a loro, basta darci accesso al tavolo denormalizzato.
     
* Una tabella denormalizzata consente un accesso efficiente ai dati.
La forma denormalizzata è di solito più veloce da accedere rispetto alla forma normalizzata. I gruppi possono essere lenti. Le unioni multiple possono essere molto lente.
     

Per ottenere i dati da due o più tabelle nel databaseERDDAP™, ci sono tre opzioni:
 

* Opzione consigliata:
È possibile creare un file a valore di virgola o separato dalla scheda con i dati dalla tabella denormalizzata.
Se il dataset è enorme, allora ha senso creare diversi file, ciascuno con un sottoinsieme coeso della tabella denormalizzata (per esempio, i dati da un intervallo di tempo più piccolo) .
    
Il grande vantaggio è cheERDDAP™sarà in grado di gestire le richieste degli utenti per i dati senza ulteriori sforzi dal database. Quindi...ERDDAP™non sarà un peso sul tuo database o un rischio di sicurezza. Questa è l'opzione migliore in quasi tutte le circostanze perchéERDDAP™di solito può ottenere i dati dai file più velocemente di un database (se convertiamo i file .csv a.ncFile CF) . (Parte della ragione è cheERDDAP+files è un sistema di sola lettura e non deve affrontare i cambiamenti durante la fornitura[ACIDIO](https://en.wikipedia.org/wiki/ACID)  (Atomicità, resistenza, isolamento, durata) .) Inoltre, probabilmente non avrete bisogno di un server separato in quanto possiamo memorizzare i dati su uno dei nostri RAID e accedervi con un server esistenteERDDAP™su un server esistente.
    
* Ok Opzione:
Hai impostato un nuovo database su un computer diverso con la tabella denormalizzata.
Dal momento che questo database può essere un database gratuito e open source come MariaDB, MySQL e PostgreSQL, questa opzione non deve costare molto.
    
Il grande vantaggio è cheERDDAP™sarà in grado di gestire le richieste degli utenti per i dati senza ulteriori sforzi dal database corrente. Quindi...ERDDAP™Non sarà un peso sul tuo database attuale. Questo elimina anche un sacco di preoccupazioni di sicurezza dalERDDAP™non avrà accesso al database corrente.
    
* Opzione scoraggiata:
Possiamo connetterciERDDAP™al tuo database attuale.
Per fare questo, è necessario:
    
    * Creare una tabella o una visualizzazione separata con la tabella denormalizzata dei dati.
    * Creare un utente "erddap" che ha accesso di sola lettura solo alla tabella denormalizzata (#) .
         
    
Questa è un'opzione se i dati cambiano molto frequentemente e si desidera dareERDDAP™l'accesso istantaneo a tali modifiche; tuttavia, anche così, può avere senso utilizzare l'opzione di file sopra e periodicamente (ogni 30 minuti?) sostituire il file che ha i dati di oggi.
Gli enormi svantaggi di questo approccio sono cheERDDAP™le richieste dell'utente probabilmente metteranno un peso insopportabile sul tuo database e cheERDDAP™connessione è un rischio di sicurezza (anche se possiamo ridurre / gestire il rischio) .

Rendere il tavolo denormalizzato o la vista perERDDAP™è una buona opportunità per fare alcuni cambiamenti cheERDDAP™ha bisogno, in un modo che non influisce sui vostri tavoli originali:

* Modificare la data e i campi/colonne timestamp per utilizzare i datiTipo che le chiamate Postgres[timestamp con fuso orario](#database-date-time-data)  (o l'equivalente nel tuo database) .
I timestamp senza informazioni sul fuso orario non funzionano correttamenteERDDAP.
* Fare indici per le colonne che gli utenti spesso cercano.
* Essere molto consapevoli di[il caso dei nomi del campo/colonna](#quotes-for-names-and-case-sensitivity)  (per esempio, utilizzare tutte le minuscole) quando li digiti.
* Non usare parole riservate per la tabella e per i nomi campo/colonna.

Se hai bisogno di aiuto per fare la tabella o la visualizzazione denormalizzata, contatta l'amministratore del database.
Se si desidera parlare di questo approccio intero o strategizzare come meglio farlo, si prega di e-mail Chris. John a noaa.gov.
    
#### database indatasets.xml {#database-in-datasetsxml} 
È difficile creare il correttodatasets.xmlinformazioni necessarie perERDDAP™stabilire una connessione al database. Sii paziente. Sii metodico.
* Si consiglia vivamente di utilizzare[Generare i dati Programma Xml](#generatedatasetsxml)per fare una bozza ruvida deldatasets.xmlchunk per questo dataset. Puoi quindi modificarlo per affinarlo.
        
Genera i dati Xml ha tre opzioni speciali per EDDTableFromDatabase:
1. Se si entra "&#33;&#33;&#33;LIST&#33;&#33;&#33;" (senza le citazioni) per il nome del catalogo, il programma visualizzerà un elenco dei nomi del catalogo.
2. Se si entra "&#33;&#33;&#33;LIST&#33;&#33;&#33;" (senza le citazioni) per il nome dello schema, il programma visualizzerà un elenco dei nomi degli schemi.
3. Se si entra "&#33;&#33;&#33;LIST&#33;&#33;&#33;" (senza le citazioni) per il nome del tavolo, il programma visualizzerà un elenco di tabelle e le loro colonne. La prima voce "&#33;&#33;&#33;LIST&#33;&#33;&#33;" che fai è quella che verrà utilizzata.
* Leggi attentamente tutte le informazioni di questo documento su EDDTableFromDatabase.
* È possibile raccogliere la maggior parte delle informazioni necessarie per creare l'XML per un set di dati EDDTableFromDatabase contattando l'amministratore del database e cercando il web.
* Sebbene i database trattino spesso i nomi delle colonne e i nomi delle tabelle in modo caso-insensibile, sono casi-sensibili inERDDAP. Quindi, se un messaggio di errore dal database dice che un nome della colonna è sconosciuto (per esempio, "Unknown identificatore= ' *colonna\\_name* ") anche se sai che esiste, prova a usare tutte le capitali, per esempio, *COLUMN* , che è spesso la vera, caso sensibile versione del nome della colonna.
* Lavorare a stretto contatto con l'amministratore del database, che può avere esperienza rilevante. Se il dataset non riesce a caricare, leggere[messaggio di errore](#troubleshooting-tips)attentamente per scoprire perché.
         
#### Driver per il dispositivo JDBC{#jdbc-driver} 
* [JDBC Driver e&lt;autistaName&gt; (#jdbc-driver) -- È necessario ottenere il file .jar del driver JDBC 3 o JDBC 4 appropriato per il database e
Mettilo dentro. *tomcat* /webapps/erddap/WEB-INF/lib dopo l'installazioneERDDAP. Allora, nel tuodatasets.xmlper questo dataset, è necessario specificare il&lt;driverName&gt; per questo driver, che è (purtroppo) diverso dal nome del file. Cerca sul web per il driver JDBC per il tuo database e il driverName cheJavadeve usarlo.
    
    * Per MariaDB, prova[ https://mariadb.com/kb/en/about-the-mariadb-java-client/ ](https://mariadb.com/kb/en/about-the-mariadb-java-client/)  
The&lt;driverName&gt; da utilizzaredatasets.xml  (vedi sotto) è probabilmente org.mariadb.jdbc. Driver.
    * Per MySQL e Amazon RDS, prova[ https://dev.mysql.com/downloads/connector/j/ ](https://dev.mysql.com/downloads/connector/j/)  
The&lt;driverName&gt; da utilizzaredatasets.xml  (vedi sotto) è probabilmente com.mysql.jdbc. Driver.
    * PerOracle♪[ https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html ](https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html).
The&lt;driverName&gt; da utilizzaredatasets.xml  (vedi sotto) è probabilmente oracle.jdbc.driver.OracleDriver.
    * Per Postgresql, abbiamo il driver JDBC 4 da[ https://mvnrepository.com/artifact/org.postgresql/postgresql ](https://mvnrepository.com/artifact/org.postgresql/postgresql)  
The&lt;driverName&gt; da utilizzaredatasets.xml  (vedi sotto) è probabilmente org.postgresql. Driver.
    * Per SQL Server, è possibile ottenere il driver JTDS JDBC da[ https://jtds.sourceforge.net ](https://jtds.sourceforge.net).
The&lt;driverName&gt; da utilizzaredatasets.xml  (vedi sotto) è probabilmente net.sourceforge.jtds.jdbc. Driver.
    
Dopo aver messo il driver JDBC .jar inERDDAP™lib directory, è necessario aggiungere un riferimento a quel file .jar nei file di script .bat e/o .sh per GenerateDatasets Xml, DasDds e ArchiveADataset che sono in *tomcat* /webapps/erddap/WEB-INF/ directory; altrimenti, otterrai una ClassNotFoundException quando eseguirai questi script.
    
Purtroppo, JDBC è a volte la fonte di problemi. Nel suo ruolo di intermediario traERDDAP™e il database, a volte apporta sottili modifiche alla richiesta SQL standard/generic del databaseERDDAP™crea, causando così problemi (per esempio, relativo a[identificatori superiori/bassi](#quotes-for-names-and-case-sensitivity)e relative a[date/ora](#database-date-time-data)) . Si prega di essere paziente, leggere attentamente le informazioni qui, controllare il vostro lavoro, e vedere il nostro[sezione per ottenere supporto aggiuntivo](/docs/intro#support).
    
#### Database&lt;connessione Proprietà &gt;{#database-connectionproperty} 
* [&lt;connessioneProperty&gt;] (#database-connectionproperty) -- Neldatasets.xmlper il dataset, è necessario definire diverse connessioni Tag di proprietà da raccontareERDDAP™come connettersi al database (per esempio, per specificare il nome utente, la password, la connessione ssl e[dimensione del fetch](#set-the-fetch-size)) . Questi sono diversi per ogni situazione e sono un po' difficili da capire. Cerca sul web esempi di utilizzo di un driver JDBC per connettersi al tuo database. The&lt;connessioneProperty&gt; nomi (per esempio, "utente", "password", e "ssl") , e alcuni dei valori di connessioneProperty possono essere trovati cercando il web per "JDBC proprietà di connessione *database Tipo* " (per esempio,Oracle, MySQL, Amazon RDS, MariaDB, PostgreSQL) .
     
#### Quotazioni per i nomi e la sensibilità del caso{#quotes-for-names-and-case-sensitivity} 
*   [Citazioni per nomi di campo/colonna; Sensibilità dei casi](#quotes-for-names-and-case-sensitivity)- Per impostazione predefinita, EDDTableFromDatabase mette le doppie citazioni standard ANSI-SQL intorno ai nomi di campo/colonna nelle dichiarazioni SELECT nel caso in cui si abbia usato una parola riservata come nome di campo/colonna, o un personaggio speciale in un nome campo/colonna. Le doppie citazioni inoltre ostacolano alcuni tipi di attacchi SQL injection. Si può direERDDAP™utilizzare ", ', o senza preventivi via&lt;colonnaNameQuotes&gt; indatasets.xmlper questo dataset.
    
Per molti database, l'utilizzo di qualsiasi tipo di preventivi fa sì che il database funzioni con nomi di campo/colonna in modo sensibile (invece del caso database predefinito in modo insensibile) . I database mostrano spesso nomi di file/colonna come tutti i casi superiori, quando in realtà la forma sensibile del caso è diversa. InERDDAP™, si prega di trattare sempre i nomi delle colonne del database come caso sensibile.
    
    * Per Maria DB, devi eseguire il database con[*--sql-mode=ANSI\\_QUOTES](https://mariadb.com/kb/en/mysql-command-line-client/).
    * Per MySQL e Amazon RDS, è necessario eseguire il database con[*--sql-mode=ANSI\\_QUOTES](https://dev.mysql.com/doc/refman/5.7/en/sql-mode.html#sqlmode_ansi_quotes).
    *   Oraclesupporta le doppie citazioni standard ANSI-SQL[per impostazione predefinita](https://docs.oracle.com/database/121/SQLRF/sql_elements008.htm#SQLRF00223).
    * PostgreSQL supporta le doppie citazioni standard ANSI per impostazione predefinita.
    
      
Non usare una parola riservata per un database, un catalogo, uno schema o un nome della tabella.ERDDAP™non cita.
    
Se possibile, utilizzare tutti i minuscoli per database, catalogo, schema, nomi di tabella e nomi di campo quando si crea la tabella del database (o vista) e quando si riferisce ai nomi di campo/colonna indatasets.xmlinERDDAP. In caso contrario, è possibile ottenere un messaggio di errore che dice che il database, catalogo, schema, tabella e / o campo non è stato trovato. Se si ottiene quel messaggio di errore, provare a utilizzare la versione caso-sensibile, la versione di tutti i casi superiori, e la versione tutta minuscola del nome inERDDAP. Uno di loro può funzionare. In caso contrario, è necessario modificare il nome di database, catalogo, schema e / o tabella a tutti i casi più bassi.
    
#### Database&lt;dati Tipo &gt;{#database-datatype} 
*   [Database](#database-datatype)[&lt;dataType&gt;] (#datatype #) Tag -- Perché c'è qualche ambiguità su cui[tipi di dati del database](https://www.w3schools.com/sql/sql_datatypes_general.asp)mappa a cuiERDDAP™tipi di dati, è necessario specificare un [&lt;dataType&gt;] (#datatype #) tag per ogni [&lt;dataVariable&gt; (#datavariabile #) per direERDDAP™quali datiTipo da usare. Parte del problema è che diversi set di dati utilizzano termini diversi per i vari tipi di dati -- quindi cercare sempre di abbinare le definizioni, non solo i nomi. Vedi la descrizione[standardERDDAP™dati Tipi](#data-types), che include riferimenti ai corrispondenti tipi di dati SQL.[Data e timestamp](#database-date-time-data)sono casi speciali: usoERDDAP'due dati Tipo.
     
#### Data del database{#database-date-time-data} 
Alcune colonne dell'ora della data del database non hanno un fuso orario esplicito. Tali colonne sono guai perERDDAP. I database supportano il concetto di data (con o senza tempo) senza un fuso orario, come una gamma approssimativa di tempo. MaJava  (e cosìERDDAP) si occupa solo di data+ora istantanea con un fuso orario. Così si può sapere che i dati dell'ora della data si basano su un fuso orario locale (con o senza l'ora legale) o il GMT/Zulufuso orario, maJava  (eERDDAP) No. In origine pensavamo che avremmo potuto risolvere questo problema. (ad esempio, specificando un fuso orario per la colonna) , ma il database+JDBC+Javale interazioni hanno reso questa una soluzione inaffidabile.
* Allora...ERDDAP™richiede di memorizzare tutti i dati di data e di data nella tabella del database con un tipo di dati del database che corrisponde al tipo JDBC "timestamp with time zone" (idealmente, che utilizza il GMT/Zulufuso orario) .
* InERDDAP'datasets.xml, nel&lt;dataVariable&gt; tag per una variabile di timestamp, set
    >     [&lt;dataType>double&lt;/dataType>](#datatype)  

e&lt;addAttributes&gt; set
```
          <att name="units">seconds since 1970-01-01T00:00:00Z</att>
```
* Suggerimento: Se i dati sono un intervallo di tempo, è utile avere i valori timestamp si riferiscono al centro dell'intervallo di tempo implicito (per esempio, mezzogiorno) . Ad esempio, se un utente ha dati per 2010-03-26T13:00Z da un altro dataset e desidera i dati più vicini da un dataset database che ha dati per ogni giorno, quindi i dati del database per 2010-03-26T12:00Z (rappresentazione dei dati per tale data) è ovviamente il migliore (al contrario della mezzanotte prima o dopo, dove è meno evidente che è meglio) .
*   ERDDAP™ha una utilità per[Convertire un Numerico Tempo di / da un tempo di stress](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html).
* Vedi[Come?ERDDAPOfferte con il tempo](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap).
       
#### Integer nulls{#integer-nulls-1} 
I database supportano nulls integer (int, piccolo, minuscolo) colonne, maERDDAP™non supporta i veri nulls.
Il database nulls sarà convertito inERDDAP™127 per colonne di byte, 255 per colonne di ubyte, 32767 per colonne corte, 65535 per colonne di cava us, 2147483647 per colonne di int, 4294967295 per colonne di uint, 9,223,372,036,854,775,807 per colonne lunghe, o 18446744073709551615 per colonne ulong. Se si utilizzano tali default, si prega di identificare quellimissing\\_values per gli utenti del datasetERDDAP™con

>    &lt;att name="\\_FillValue" [type="int"](#attributetype)\\>2147483647&lt;/att>  

o

>    &lt;att name="\\_FillValue" [type="short"](#attributetype)\\>32767&lt;/att>  

In alternativa, è possibile utilizzare il "missing\\_value"attributo invece di "\\_FillValue".
Genera i dati Xml aggiunge automaticamente questi attributi \\_FillValue quando genera il suggeritodatasets.xmlper set di dati del database.

Per le colonne dei punti galleggianti del database, nulls vengono convertiti in NaNsERDDAP.
Per i tipi di dati del database convertiti in stringheERDDAP™, nulls ottenere convertito a vuoto Strings.
    
#### Sicurezza del database{#database-security} 
* Quando si lavora con i database, è necessario fare le cose il più in modo sicuro e sicuro possibile per evitare che un utente dannoso danneggia il database o ottenere l'accesso ai dati a cui non dovrebbero avere accesso.ERDDAP™Cerca anche di fare le cose in modo sicuro.
    * Considerare la replica, su un computer diverso, le tabelle di database e database con i dati che si desideraERDDAP™per servire. (Sì, per banche dati commerciali comeOracle, questo comporta costi aggiuntivi di licenza. Ma per i database open source, come PostgreSQL, MySQL, Amazon RDS e MariaDB, questo non costa nulla.) Questo ti dà un alto livello di sicurezza e impedisce ancheERDDAP™richieste da rallentare il database originale.
    * Vi incoraggiamo a prepararviERDDAP™per connettersi al database come utente del database che ha solo accesso al **rilevante** database (#) e ha solo privilegi READ.
    * Vi invitiamo a impostare il collegamento daERDDAP™al database in modo che
        * usa sempre SSL,
        * solo consente connessioni da un indirizzo IP (o un blocco di indirizzi) e da quelloERDDAP™utente, e
        * trasferisce solo le password nel loro MD5 hashed form.
    *   \\[PROBLEMI DI LAVORO\\]La connessioneProprietà (inclusa la password&#33;) sono memorizzati come testo normale indatasets.xml. Non abbiamo trovato un modo per consentire all'amministratore di inserire la password del database durante ilERDDAP's startup in Tomcat (che si verifica senza input utente) , quindi la password deve essere accessibile in un file. Per rendere questo più sicuro:
        * # (ilERDDAP™amministratore) dovrebbe essere il proprietario didatasets.xmle avere accesso READ e WRITE.
        * Fai un gruppo che include solo user=tomcat. Utilizzare chgrp per rendere che il gruppo perdatasets.xml, con solo privilegi READ.
        * Utilizzare chmod per assegnare privilegi o-rwx (nessun accesso READ o WRITE per "altri utenti") perdatasets.xml.
    * QuandoERDDAP™, la password e altre proprietà di connessione sono memorizzate in "privato"Javavariabili.
    * Le richieste dei clienti vengono analizzate e verificate per la validità prima di generare le richieste SQL per il database.
    * Le richieste al database sono effettuate con SQL ReadydStatements, per evitare[SQL injection](https://en.wikipedia.org/wiki/SQL_injection).
    * Le richieste al database vengono inviate con l'esecuzione Query (non eseguireStato) limitare le richieste di sola lettura (così tentato SQL injection per modificare il database fallirà per questo motivo, troppo) .
         
#### SQL SQL{#sql} 
* Perché?OPeNDAP'le richieste di dati tabulari sono state progettate per imitare le richieste di dati schedari SQL, è facile perERDDAP™per convertire le richieste di dati tabulari in semplici SQL ReadydStatements. Per esempio, ilERDDAP™richiesta
```
    time,temperature&time>=2008-01-01T00:00:00Z&time&lt;=2008-02-01T00:00:00Z  
```
verrà convertito in SQL ReadydStatement
```
    SELECT "time", "temperature" FROM *tableName*  
    WHERE "time" >= 2008-01-01T00:00:00Z AND "time" &lt;= 2008-02-01T00:00:00Z  
```
ERDDAP™richieste con &distinct () e/oorderBy ( *variabili* ) aggiungerà DISTINCT e/o ORDINE *variabili* alla dichiarazione preparata da SQL. In generale, questo rallenterà notevolmente la risposta dal database.
ERDDAP™registra lo stato preparato in[log.txt](/docs/server-admin/additional-information#log)come
```
    statement=*thePreparedStatement*  
```
Questa sarà una rappresentazione del testo dello stato preparato, che può essere leggermente diversa dall'attuale stato preparato. Ad esempio, nello stato preparato, i tempi sono codificati in modo speciale. Ma nella rappresentazione del testo, appaiono come ISO 8601 date times.
     
#### Velocità del database{#database-speed} 
* I database possono essere lenti. Ci sono alcune cose che puoi fare:
    * In generale -
La natura di SQL è che le query sono[dichiarativo](https://en.wikipedia.org/wiki/Declarative_programming). Specificano solo ciò che l'utente vuole. Non includono una specifica o suggerimenti per come la query deve essere gestita o ottimizzata. Quindi non c'è modo diERDDAP™generare la query in modo tale che aiuta il database ad ottimizzare la query (o in qualsiasi modo specifica come la query deve essere gestita) . In generale, spetta all'amministratore del database impostare le cose (per esempio, indici) ottimizzare per alcuni tipi di query.
##### Impostare la dimensione del pezzo{#set-the-fetch-size} 
I database riportano i dati aERDDAP™in pezzi. Per impostazione predefinita, diversi database restituiscono un diverso numero di righe nei blocchi. Spesso questo numero è molto piccolo e così molto inefficiente. Ad esempio, il default perOracle10&#33; Leggi la documentazione di JDBC per il driver JDBC del tuo database per trovare la proprietà di connessione da impostare per aumentare questo, e aggiungerlo alla descrizione del set di dati nelladatasets.xml. Per esempio,
Per MySQL e Amazon RDS, utilizzare
```
        <connectionProperty name="defaultFetchSize">10000</connectionProperty>  
```
Per MariaDB, attualmente non c'è modo di cambiare la dimensione del fetch. Ma è una funzione richiesta, quindi cercare il web per vedere se questo è stato implementato.
PerOracle, uso
```
        <connectionProperty name="defaultRowPrefetch">10000</connectionProperty>  
```
Per PostgreSQL, utilizzare
```
        <connectionProperty name="defaultRowFetchSize">10000</connectionProperty>  
```
ma sentitevi liberi di cambiare il numero. Impostare il numero troppo grande causeràERDDAP™utilizzare un sacco di memoria e essere più probabile che esca dalla memoria.
#### Condizioni di connessione{#connectionproperties} 
Ogni database ha altre proprietà di connessione che possono essere specificate indatasets.xml. Molti di questi influenzeranno le prestazioni del database aERDDAP™connessione. Si prega di leggere la documentazione per il driver JDBC del database per vedere le opzioni. Se si trovano proprietà di connessione che sono utili, si prega di inviare un'e-mail con i dettagli pererd dot data at noaa dot gov.
* Fare un tavolo --
Probabilmente otterrete risposte più veloci se periodicamente (Ogni giorno? quando ci sono nuovi dati?) generare una tabella reale (simile a come hai generato il VIEW) e direERDDAP™per ottenere i dati dalla tabella invece del VIEW. Poiché qualsiasi richiesta al tavolo può essere soddisfatta senza JOINing un'altra tabella, la risposta sarà molto più veloce.
* Sottovuoto della tabella -
MySQL e Amazon RDS risponderanno molto più velocemente se si utilizza[TABELLA](https://dev.mysql.com/doc/refman/5.7/en/optimize-table.html).
Maria DB risponderà molto più velocemente se si utilizza[TABELLA](https://mariadb.com/kb/en/optimize-table/).
PostgreSQL risponderà molto più velocemente se si[VACUO](https://www.postgresql.org/docs/8.3/static/sql-vacuum.html)il tavolo.
    Oraclenon ha o ha bisogno di un comando analogo.
* #[Indici](https://en.wikipedia.org/wiki/Database_index)per Variabili Comunemente Constrained --
È possibile accelerare molte/most query creando indici nel database per le variabili (che le banche dati chiamano "colonne") che sono spesso ostacolati nella query dell'utente. In generale, queste sono le stesse variabili specificate da [&lt;subsetVariables&gt; (# Subsetvariables #) e/o le variabili di latitudine, longitudine e tempo.
##### Utilizzare la connessione Pooling{#use-connection-pooling} 
Normalmente,ERDDAP™rende una connessione separata al database per ogni richiesta. Questo è l'approccio più affidabile. L'alternativa più veloce è quella di utilizzare un DataSource che supporta la connessione pooling. Per impostare, specificare (per esempio)   
```
        <dataSourceName>java:comp/env/jdbc/postgres/erddap</dataSourceName>  
```
vicino a&lt;sourceUrl&gt;&lt;driverName&gt;, e&lt;connessione Proprietà &gt;
E in *tomcat* /conf/context.xml, definire una risorsa con le stesse informazioni, ad esempio,
```
        <Resource  
        name="jdbc/postgres/erddap" auth="Container" type="javax.sql.DataSource"  
        driverClassName="org.postgresql.Driver"  
        url="*jdbc:postgresql://somehost:5432/myDatabaseName*"  
        username="*myUsername*" password="*myPassword*"  
        initialSize="0" maxActive="8" minIdle="0" maxIdle="0" maxWait="-1"/>  
```
Informazioni generali sull'utilizzo di un DataSource[ https://docs.oracle.com/javase/tutorial/jdbc/basics/sqldatasources.html ](https://docs.oracle.com/javase/tutorial/jdbc/basics/sqldatasources.html).
Vedi[Informazioni su Tomcat DataSource](https://tomcat.apache.org/tomcat-7.0-doc/jndi-resources-howto.html#JDBC_Data_Sources)e[Esempi di Tomcat DataSource](https://tomcat.apache.org/tomcat-7.0-doc/jndi-datasource-examples-howto.html)o cercare il web per esempi di utilizzo di DataSources con altri server di applicazione.
* Se tutto il resto fallisce,
considerare la memorizzazione dei dati in una raccolta diNetCDFV.ncfile (soprattutto.ncfile che utilizzano[CFU Geometrie di smorzamento discreto (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Contiguous Ragged Array strutture di dati e così può essere gestito conERDDAP'[EDDTableFromNcCFFiles](#eddtablefromnccffiles)) . Se sono organizzati logicamente (ciascuno con i dati per un pezzo di spazio e tempo) ♪ERDDAP™può estrarre i dati da loro molto rapidamente.
         
#### EDDTableFromDatabase scheletro XML{#eddtablefromdatabase-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromDatabase" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The format varies for each type of database, but will be  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;something like:  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For MariaDB:    jdbc:mariadb://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For MySql       jdbc:mysql://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Amazon RDS: jdbc:mysql://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Oracle:     jdbc:oracle:thin:@*xxx.xxx.xxx.xxx*:1521:*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Postgresql: jdbc:postgresql://*xxx.xxx.xxx.xxx*:5432/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;where *xxx.xxx.xxx.xxx* is the host computer's numeric IP address  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;followed by :*PortNumber* (4 digits), which may be different for your  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;database.  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[driverName](#jdbc-driver)\\>...&lt;/driverName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The high-level name of the database driver, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"org.postgresql.Driver".  You need to put the actual database  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;driver .jar file (for example, postgresql.jdbc.jar) in  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*tomcat*/webapps/erddap/WEB-INF/lib.  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[connectionProperty](#database-connectionproperty) name="*name*">*value*&lt;/connectionProperty>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The names (for example, "user", "password", and "ssl")  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and values of the properties needed for ERDDAP™ to establish  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the connection to the database.  0 or more. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataSourceName>](#use-connection-pooling)...&lt;/dataSourceName>  &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;catalogName>...&lt;/catalogName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the catalog which has the schema which has the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;table, default = "".  OPTIONAL.  Some databases don't use  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;schemaName>...&lt;/schemaName> &lt;!-- The name of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;schema which has the table, default = "".  OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;tableName>...&lt;/tableName>  &lt;!-- The name of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;table, default = "".  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;columnNameQuotes>](#quotes-for-names-and-case-sensitivity)&lt;columnNameQuotes> &lt;!-- OPTIONAL. Options:  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" (the default), ', \\[nothing\\]. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;orderBy>...&lt;/orderBy>  &lt;!-- A comma-separated list of  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[sourceName](#sourcename)s to be used in an ORDER BY clause at the end of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;every query sent to the database (unless the user's request  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;includes an &orderBy() filter, in which case the user's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;orderBy is used).  The order of the sourceNames is important.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The leftmost (first) sourceName is most important; subsequent  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sourceNames are only used to break ties.  Only relevant  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sourceNames are included in the ORDER BY clause for a given user  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;request.  If this is not specified, the order of the returned  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;values is not specified. Default = "".  OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanOrderBy>](#sourcecanorderby)no(default)|partial|yes&lt;/sourceCanOrderBy>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanDoDistinct>](#sourcecandodistinct)no(default)|partial|yes&lt;/sourceCanDoDistinct>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Each dataVariable MUST include a [&lt;dataType>](#datatype) tag.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;See [Database DataTypes](#database-datatype).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For [database date and timestamp columns](#database-date-time-data), set dataType=double and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;units=seconds since 1970-01-01T00:00:00Z -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTEDDEDDGrid {#eddtablefromeddgrid} 
[ **EDDTEDDEDDGrid** ](#eddtablefromeddgrid)consente di creare un dataset EDDTable da qualsiasiEDDGridDataset.

* Alcuni motivi comuni per farlo sono:
    * Questo consente al dataset di essere queried conOPeNDAPvincoli di selezione, che è un tipo di "query by value" (che un utente può aver richiesto) .
    * Il dataset è intrinsecamente un dataset tabulare.
* Il valore dell'attributo globale "maxAxis0" (di solito di tipo="int") ♪ (il default è 10) sarà utilizzato per limitare il numero di assi\\[0\\]  (di solito"time"asse) valori del chiusoEDDGriddataset a cui è possibile accedere per richiesta di dati. Se non si desidera che ci sia alcun limite, specificare un valore di 0. Questa impostazione è importante perché, altrimenti, sarebbe troppo facile per un utente chiedere EDDTableFromEDDGridper guardare attraverso tutti i dati del dataset grigliato. Ci vorrà molto tempo e quasi certamente fallire con un errore di timeout. Questa è l'impostazione che rende sicuro avere EDDTableFromEDDGridset di dati nel tuoERDDAPsenza paura che porterà ad un uso irragionevole delle risorse di calcolo.
* Se il allegatoEDDGridè un[EDDGridDa Erddap](#eddfromerddap)e ilERDDAP™è lo stessoERDDAP, poi EDDTableFromEDDGridutilizzerà sempre la versione attualmente disponibile del dataset di riferimento direttamente. Questo è un modo molto efficiente per EDDTableFromEDDGridper accedere ai dati grigliati.
* Questa classe è [&lt;ricarica Tutti i bambini &gt; (#reloadeverynminutes) è ciò che conta. Il chiusoEDDGrid'&lt;reloadEveryNMinutes&gt; è ignorato.
* Se un valore per [&lt;AggiornamentoOgniNMillis&gt; (#updateeverynmillis #) viene fornito per questo dataset, viene ignorato. Il chiusoEDDGrid'&lt;updateEveryNMillis&gt; è ciò che conta.
*   [GenerareDatasetsXml](#generatedatasetsxml)ha un'opzione per il tipo di dataset=EDDTableFromEDDGridche chiede l'URL di unERDDAP  (di solito lo stessoERDDAP)   (terminare in "/erddap/") e un'espressione regolare. Genera i dati Xml genererà quindi l'XML per un EDDTableFromEDDGriddataset per ogni dataset grigliato nelERDDAP™che hadatasetIDche corrisponde all'espressione regolare (utilizzare .\\* per abbinare tuttidatasetIDs per set di dati grigliati) .
    
Il pezzo di XML generato da GenerateDatasetsXml per ogni dataset include:
    
    * AdatasetIDche èEDDGrid'datasetIDpiù "\\_AsATable".
    * Un nuovo attributo globale sommario che è ilEDDGrid's sommario più un nuovo primo paragrafo che descrive ciò che questo dataset è.
    * Un nuovo titolo attributo globale che è ilEDDGridIl titolo più ", (Come tavolo) ".
    * Un nuovo attributo globale maxAxis0 con un valore di 10.
#### EDDTEDDEDDGridscheletro XML{#eddtablefromeddgrid-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromEDDGrid" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDTableFromEDDGrid, this calls lowUpdate() of the underlying  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGrid. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes>  &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataset>](#eddgrid)...&lt;/dataset> &lt;!-- 1  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Any type of EDDGrid dataset.  You can even use an  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; EDDGridFromERDDAP™ to access an independent EDDGrid dataset on  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; this server. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromFileNames{#eddtablefromfilenames} 
[ **EDDTableFromFileNames** ](#eddtablefromfilenames)crea un set di dati da informazioni su un gruppo di file nel file system del server, incluso un URL per ogni file in modo che gli utenti possano scaricare i file tramiteERDDAP'["files"sistema](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html). A differenza di tutti[EDDTableFromFiles](#eddtablefromfiles)sottoclassi, questo tipo di dataset non serve i dati dall'interno dei file.

* EDDTableFromFileNames è utile quando:
    * Hai un gruppo di file che si desidera distribuire come file interi perché non contengono "dati" nello stesso modo in cui i file di dati regolari hanno dati. Ad esempio, file di immagine, file video, documenti di Word, file di foglio di calcolo Excel, file di presentazione di PowerPoint o file di testo con testo non strutturato.
    * Hai un gruppo di file che hanno dati in un formato cheERDDAP™Non riesco ancora a leggere. Ad esempio, un progetto-specifico, personalizzato, format binario.
         
#### EDDTableFromFileNames dati{#eddtablefromfilenames-data} 
*   [I dati in un set di dati EDDTableFromFileNames](#eddtablefromfilenames-data)è un tavolo cheERDDAP™crea on-the-fly con informazioni su un gruppo di file locali. Nella tabella, c'è una riga per ogni file. Quattro attributi speciali nel[datasets.xmlper questo dataset](#eddtablefromfilenames-skeleton-xml)determinare quali file saranno inclusi in questo dataset:
    
##### file Di{#filedir} 
    *   &lt;fileDir&gt; - Questo specifica la directory sorgente nel file system del server con i file per questo dataset. I file che sono effettivamente situati nel file system del server nel&lt;fileDir&gt; apparirà nella colonna url di questo set di dati all'interno di una directory virtuale denominata https://*serverUrl*/erddap/files/*datasetID/* .
Per esempio, se ildatasetIDè jplMURSST.
e il&lt;fileDir&gt; è /home/data/mur/ ,
e quella directory ha un file chiamato jplMURSST20150103000000.png,
poi l'URL che verrà mostrato agli utenti per quel file sarà
         https://*serverUrl*/erddap/jplMURSST/jplMURSST20150103000000.png .
        
Oltre a utilizzare una directory locale per&lt;fileDir&gt;, è anche possibile specificare l'URL di una pagina web remota, simile alla directory. Questo funziona con:
        
        * Dataset non aggregati in THREDDS, ad esempio,
             https://data.nodc.noaa.gov/thredds/catalog/aquarius/nodc\\_binned\\_V3.0/monthly/  \\[2020-10-21 Questo server non è più affidabile disponibile.\\]
        * Dataset non aggregati inHyraxPer esempio,
            [ https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ ](https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/)
        * La maggior parte degli elenchi di directory simili a Apache, ad esempio,
            [ https://www1.ncdc.noaa.gov/pub/data/cmb/ersst/v5/netcdf/ ](https://www1.ncdc.noaa.gov/pub/data/cmb/ersst/v5/netcdf/)
##### da OnTheFly{#fromonthefly} 
[\\*\\*\\*dall'inizio](#fromonthefly)-- Per alcuni enormi secchi S3 (come noaa-goes17, che ha 26 milioni di file) , può prendereERDDAP™fino a 12 ore per scaricare tutte le informazioni sul contenuto del secchio (e poi ci sono altri problemi) . Per aggirare questo, c'è un modo speciale per usare&lt;fileDir&gt; in EDDTableFromFileNames per creare un set di dati con la directory e i nomi di file da un secchio AWS S3. Il dataset non avrà l'elenco di tutte le directory e i nomi dei file del secchio S3 che un utente può cercare tramite richieste al dataset. Ma il dataset otterrà i nomi di directory e file on-the-fly se l'utente attraversa la gerarchia della directory con il dataset's"files"opzione. Così, questo consente agli utenti di navigare la gerarchia dei file del secchio S3 e i file tramite il dataset"files"sistema. Per fare questo, invece di specificare l'URL per il secchio S3 come "Starting directory" (in GenerateDatasets Xml) o&lt;fileDigital (indatasets.xml) , uso:
```
\\*\\*\\*fromOnTheFly,*theS3BucketUrl*  
```
per esempio:
```
\\*\\*\\*fromOnTheFly,https://noaa-goes17.s3.us-east-1.amazonaws.com/  
```
Vedere la documentazione per[lavorare con S3 Buckets inERDDAP™](#working-with-aws-s3-files), in particolare la descrizione del formato specifico che deve essere utilizzato per l'URL del secchio S3. E vedi
[questi dettagli e un esempio](#making-an-eddtablefromfilenames-dataset-with-an-aws-s3-bucket)di utilizzo\\*\\*\\*dallFly.
        
##### ricorsi{#recursive} 
*   &lt;recursive&gt; -- File in sottodirectory&lt;fileDir&gt; con nomi che corrispondono&lt;fileRegex&gt; apparirà nelle stesse sottodirectory"files"URL se&lt;recursive&gt; è impostato a true. Il default è falso.
* [&lt;percorsoRegex&gt; (Traduzione:) -- Se recursive=true, Solo i nomi delle directory che corrispondono al pathRegex (default=.\\*) sarà accettato. Se recursive=false, questo viene ignorato. Questo è raramente usato, ma può essere molto utile in circostanze insolite. (Vedi questo[documentazione regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)e[tutorial regex](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) 
##### fileRegex{#fileregex} 
*   &lt;fileRegex&gt; Solo i nomi dei file in cui l'intero nome del file (non incluso il nome della directory) corrispondere&lt;fileRegex&gt; sarà incluso in questo dataset. Per esempio, jplMURSST.&#123;14&#125;\\\.png . (Vedi questo[documentazione regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)e[tutorial regex](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).)   
         
##### Da File Names Tabella dati Contenuto{#from-file-names-data-table-contents} 
Nella tabella, ci saranno colonne con:
* url... L'URL che gli utenti possono utilizzare per scaricare il file tramiteERDDAP'["files"sistema](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html).
* nome... Il nome del file (senza un nome di directory) .
* ultimomodificato -- L'ultima volta che il file è stato modificato (memorizzato come doppie con"seconds since 1970-01-01T00:00:00Z") . Questa variabile è utile perché gli utenti possono vedere se / quando il contenuto di un dato file è cambiato. Questa variabile è una[tempo Variazione del timbro](#timestamp-variables), così i dati possono apparire come valori numerici (secondi dal 1970-01-01T00:00:00:00Z) o un valore di stringa (ISO 8601:2004 (E) formato) , a seconda della situazione.
* taglia -- La dimensione del file in byte, memorizzato come doppie. Sono memorizzati come doppie perché alcuni file possono essere più grandi di ints permettono e i lunghi non sono supportati in alcuni tipi di file di risposta. I doppi daranno la dimensione esatta, anche per i file molto grandi.
* colonne aggiuntive definite dallaERDDAP™amministratore con le informazioni estratte dal nome del file (per esempio, il tempo associato ai dati nel file) in base a due attributi specificati nei metadati per ogni colonna aggiuntiva/dataVariable:
    
    * estrattoRegex -- Questo è[espressione regolare](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) . L'intero regex deve corrispondere all'intero nome del file (non incluso il nome della directory) . Il regex deve includere almeno un gruppo di cattura (una sezione di un'espressione regolare che è racchiusa da parentesi) cheERDDAP™utilizza per determinare quale sezione del nome del file da estrarre per diventare dati.
    * estratto Gruppo... Questo è il numero del gruppo di cattura (#1 è il primo gruppo di cattura) nell'espressione regolare. Il default è 1. Un gruppo di cattura è una sezione di un'espressione regolare che è racchiusa da parentesi.
    
Ecco due esempi:
```
            <dataVariable>
                <sourceName>time</sourceName>
                <destinationName>time</destinationName>
                <dataType>String</dataType>
                <addAttributes>
                    <att name="extractRegex">jplMURSST(.{14})\\.png</att>
                    <att name="extractGroup" type="int">1</att>
                    <att name="units">yyyyMMddHHmmss</att>
                </addAttributes>
            </dataVariable>
```
```
            <dataVariable>
                <sourceName>day</sourceName>
                <destinationName>day</destinationName>
                <dataType>int</dataType>
                <addAttributes>
                    <att name="extractRegex">jplMURSST.{6}(..).{6}\\.png</att>
                    <att name="extractGroup" type="int">1</att>
                    <att name="ioos\\_category">Time</att>
                </addAttributes>
            </dataVariable> 
```
Nel caso della variabile di tempo, se un file ha il nome jplMURSST20150103000000.png, l'estrattoRegex corrisponderà al nome del file, estrae i caratteri che corrispondono al primo gruppo di cattura ("20150103000000") come dataType=String, quindi utilizzare[unità adatta per tempi di stringa](#string-time-units)per analizzare le stringhe in valori di dati temporali (2015-01-03T00:00:00:00Z) .

Nel caso della variabile di giorno, se un file ha il nome jplMURSST20150103000000.png, l'estrattoRegex corrisponderà al nome del file, estrae i caratteri che corrispondono al primo gruppo di cattura ("03") #&lt;dataType&gt;] (#datatype #) \\=int, dando un valore di dati di 3.
        
#### Altre informazioni{#other-information} 
* No&#33;&lt;AggiornamentoOgniNMillis&gt; (#updateeverynmillis #) -- Questo tipo di dataset non ha bisogno e non può utilizzare&lt;updateEveryNMillis&gt; tag perché le informazioni servite da EDDTableFromFileNames sono sempre perfettamente aggiornate perchéERDDAP™chiede il file system per rispondere a ogni richiesta di dati. Anche se ci sono un numero enorme di file, questo approccio dovrebbe funzionare ragionevolmente bene. Una risposta può essere lenta se ci sono un numero enorme di file e il dataset non è stato interrogato per un po '. Ma per diversi minuti dopo, il sistema operativo mantiene le informazioni in una cache, quindi le risposte dovrebbero essere molto veloci.
     
* È possibile utilizzare[Generare i dati Programma Xml](#generatedatasetsxml)per faredatasets.xmlchunk per questo tipo di dataset. È possibile aggiungere / definire colonne aggiuntive con informazioni estratte dal nome del file, come mostrato sopra.
     
#### EDDTableFromFileNames scheletro XML{#eddtablefromfilenames-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromFileNames" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileDir>](#eddtablefromfilenames-data)...&lt;/fileDir>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;recursive>](#eddtablefromfilenames-data)...&lt;/recursive>  &lt;!-- true or false (the default) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileNameRegex>](#eddtablefromfilenames-data)...&lt;/fileNameRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Each dataVariable MUST include [&lt;dataType>](#datatype) tag. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromFiles{#eddtablefromfiles} 
[ **EDDTableFromFiles** ](#eddtablefromfiles)è la superclasse di tutti EDDTableDa...Files classi. Non è possibile utilizzare EDDTableFromFiles direttamente. Invece, utilizzare una sottoclasse di EDDTableFromFiles per gestire il tipo di file specifico:

*   [EDDTableFromAsciiFiles](#eddtablefromasciifiles)aggrega i dati dai file di dati tabulari ASCII virgola-, tab-, semicolon- o separati dallo spazio.
*   [EDDTableFromAudioFiles](#eddfromaudiofiles)aggrega i dati da un gruppo di file audio locali.
*   [EDDTEDD OhsXmlFiles](#eddtablefromawsxmlfiles)aggrega i dati da un insieme di Stazione Meteo Automatica (AWS) File XML.
*   [EDDTableFromColumnarAsciiFiles](#eddtablefromcolumnarasciifiles)aggrega i dati dai file di dati tabular ASCII con colonne di dati a larghezza fissa.
*   [EDDTEDDHyraxFile](#eddtablefromhyraxfiles)  (DEPRECATE) aggrega i dati con diverse variabili, ciascuna con dimensioni condivise (per esempio, tempo, altitudine (o profondità) , latitudine, longitudine) , e servito da un[Hyrax OPeNDAPserver](https://www.opendap.org/software/hyrax-data-server).
*   [EDDTableFrom non valido](#eddtablefrominvalidcrafiles)aggrega i dati daNetCDF  (v3 o v4)  .ncfile che utilizzano una specifica, non valida, variante del CF DSG Contiguous Ragged Array (CRA) file. Anche seERDDAP™supporta questo tipo di file, è un tipo di file non valido che nessuno dovrebbe iniziare a usare. I gruppi che attualmente utilizzano questo tipo di file sono fortemente incoraggiati ad utilizzareERDDAP™generare file CF DSG CRA validi e smettere di utilizzare questi file.
*   [EDDTableFromJsonlCSVFiles](#eddtablefromjsonlcsvfiles)aggrega i dati da[JSON Linee file CSV](https://jsonlines.org/examples/).
*   [EDDTableFromMultidimNcFiles](#eddtablefrommultidimncfiles)aggrega i dati daNetCDF  (v3 o v4)  .nc  (o[.ncml](#ncml-files)) file con diverse variabili, ciascuna con dimensioni condivise (per esempio, tempo, altitudine (o profondità) , latitudine, longitudine) .
*   [EDDTableFromNcFiles](#eddtablefromncfiles)aggrega i dati daNetCDF  (v3 o v4)  .nc  (o[.ncml](#ncml-files)) file con diverse variabili, ciascuna con dimensioni condivise (per esempio, tempo, altitudine (o profondità) , latitudine, longitudine) . È bene continuare a utilizzare questo tipo di dataset per i set di dati esistenti, ma per i nuovi set di dati si consiglia di utilizzare EDDTableFromMultidimNcFiles invece.
*   [EDDTableFromNcCFFiles](#eddtablefromnccffiles)aggrega i dati daNetCDF  (v3 o v4)  .nc  (o[.ncml](#ncml-files)) file che utilizzano uno dei formati di file specificati dal[CFU Geometrie di smorzamento discreto (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)convenzioni. Ma per i file che utilizzano una delle varianti multidimensionali CF DSG, utilizzare[EDDTableFromMultidimNcFiles](#eddtablefrommultidimncfiles)Invece.
*   [EDDTableFromNccsvFiles](#eddtablefromnccsvfiles)aggrega i dati da[NCCSV](/docs/user/nccsv-1.00)File ASCII .csv.
*   [EDDTableFromParquetFiles](#eddtablefromparquetfiles)gestisce i dati da[Parquet](https://parquet.apache.org/).
*   [EDDTableFromThreddsFiles](#eddtablefromthreddsfiles)  (DEPRECATE) aggrega i dati da file con diverse variabili con dimensioni condivise servite da un[THREDOPeNDAPserver](https://www.unidata.ucar.edu/software/tds/).
*   [EDDTEDDWFSFile](#eddtablefromwfsfiles)  (DEPRECATE) fa una copia locale di tutti i dati da unArcGISMappaServerWFSserver in modo che i dati possano essere ri-servati rapidamente aERDDAP™utenti.

Attualmente non sono supportati altri tipi di file. Ma di solito è relativamente facile aggiungere il supporto per altri tipi di file. Contattaci se hai una richiesta. Oppure, se i tuoi dati sono in un vecchio formato di file che ti piacerebbe allontanarti, ti consigliamo di convertire i file per essereNetCDFV.ncfile (e soprattutto.ncfile con[CFU Geometrie di smorzamento discreto (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Contiguous Ragged Array struttura dei dati --ERDDAP™può estrarre i dati da loro molto rapidamente) .NetCDFè un formato binario ampiamente supportato, consente un accesso casuale veloce ai dati, ed è già supportato daERDDAP.

#### Da Files Dettagli{#fromfiles-details} 
Le seguenti informazioni si applicano a tutte le sottoclassi di EDDTableFromFiles.
##### Aggregazione{#aggregation} 
Questa classe aggrega i dati dai file locali. Ogni file contiene (relativamente) piccola tabella di dati.
    * Il dataset risultante appare come se tutte le tabelle del file fossero state combinate (tutte le righe di dati dal file #1, più tutte le righe dal file #2, ...) .
    * I file non devono tutti avere tutte le variabili specificate. Se un dato file non ha una variabile specificata,ERDDAP™aggiungerà i valori mancanti come necessario.
    * Le variabili in tutti i file devono avere gli stessi valori per i file[add\\_offset](#scale_factor)♪[missing\\_value](#missing_value)♪[# Filtro # Valore](#missing_value)♪[scale\\_factor](#scale_factor)e[unità](#units)attributi attributi attributi attributi attributi (se c'è) .ERDDAP™controlli, ma è un test imperfetto -- se ci sono valori diversi,ERDDAPnon sa quale sia corretto e quindi quali file sono invalidi. Se questo è un problema, si può essere in grado di utilizzare[NCML](#ncml-files)o[NCO](#netcdf-operators-nco)per risolvere il problema.
         
##### File compressi{#compressed-files} 
I file di dati di origine per tutte le sottoclassi EDDTableFromFiles possono essere compressi esternamente (ad esempio,.tgz♪.tar.gz♪.tar.gzip♪.gz♪.gzip♪.zip♪.bz2, o) . Vedere la[Documentazione esterna dei file compressi](#externally-compressed-files).
     
##### Informazioni sul file Cached{#cached-file-information-1} 
* Quando un Dataset EDDTableFromFiles viene caricato per la prima volta, EDDTableFromFiles legge informazioni da tutti i file pertinenti e crea tabelle (una riga per ogni file) con informazioni su ogni file valido e ogni "cattivo" (diverso o invalido) file.
    * Le tabelle sono memorizzate anche su disco, comeNetCDFV.ncfile in *BigParentDirectory* / dataset/ *ultimo2CharsOfDatasetID* / *datasetID* / in file di nome:
dirTable.nc  (che contiene un elenco di nomi di directory unici) ♪
file Tabella.nc  (che contiene la tabella con le informazioni di ciascun file valido) ♪
BadFiles.nc  (che contiene la tabella con le informazioni di ogni file cattivo) .
    * Per accelerare l'accesso a un set di dati EDDTableFromFiles (ma a scapito di usare più memoria) , si può usare
[&lt;fileTableInMemory&gt;true&lt;/fileTableInMemory&gt;] (#filetableinmemory #)   
per direERDDAP™per mantenere una copia delle tabelle di informazioni di file in memoria.
    * La copia delle tabelle di informazioni sul file sul disco è utile anche quandoERDDAP™è chiuso e riavviato: salva EDDTable FromFiles da dover rileggere tutti i file di dati.
    * Quando un dataset viene ricaricato,ERDDAP™solo bisogno di leggere i dati in nuovi file e file che sono cambiati.
    * Se un file ha una struttura diversa dagli altri file (per esempio, un tipo di dati diverso per una delle variabili, o un valore diverso per il "[unità](#units)" attributo) ♪ERDDAPaggiunge il file all'elenco dei file "cattivo". Le informazioni sul problema del file saranno scritte al *BigParentDirectory* /logs/log.txt file.
    * Non dovresti mai dover eliminare o lavorare con questi file. Un'eccezione è: se stai ancora apportando modifiche a un datasetdatasets.xmlsetup, potresti voler eliminare questi file per forzaERDDAP™per rileggere tutti i file in quanto i file saranno letti/interpretati in modo diverso. Se hai mai bisogno di eliminare questi file, puoi farlo quandoERDDAP™sta correndo. (Poi impostare un[bandiera](/docs/server-admin/additional-information#set-dataset-flag)per ricaricare il dataset ASAP.) Tuttavia,ERDDAP™di solito nota che ildatasets.xmlle informazioni non corrispondono al file Informazioni di tabella ed elimina automaticamente le tabelle di file.
    * Se vuoi incoraggiareERDDAP™per aggiornare le informazioni memorizzate (per esempio, se hai appena aggiunto, rimosso o modificato alcuni file nella directory dei dati del set) , usare il[sistema di segnalazione](/docs/server-admin/additional-information#flag)a forzaERDDAP™per aggiornare le informazioni dei file memorizzati nella cache.
         
##### Richieste di gestione{#handling-requests-1} 
*   ERDDAP™le richieste di dati schedari possono mettere vincoli su qualsiasi variabile.
    * Quando la richiesta di dati del cliente viene elaborata, EDDTableFromFiles può guardare rapidamente nella tabella con le informazioni di file valide per vedere quali file potrebbero avere dati rilevanti. Ad esempio, se ogni file sorgente ha i dati per un booy fisso-location, EDDTableFromFiles può determinare in modo molto efficiente quali file potrebbero avere i dati all'interno di un determinato range di longitudine e la latitudine.
    * Poiché la tabella di informazioni dei file valida include il valore minimo e massimo di ogni variabile per ogni file valido, EDDTableFromFiles può spesso gestire altre domande in modo abbastanza efficiente. Ad esempio, se alcuni dei booy non hanno un sensore di pressione dell'aria, e un cliente richiede i dati per airPressure&#33;=NaN, EDDTableFromFiles può determinare in modo efficiente quali boe hanno i dati di pressione dell'aria.
         
##### Aggiornamento delle informazioni sul file Cached{#updating-the-cached-file-information-1} 
Ogni volta che il dataset viene ricaricato, le informazioni dei file memorizzati nella cache vengono aggiornate.
    
* Il dataset viene ricaricato periodicamente come determinato dal&lt;reloadEveryNMinutes&gt; nelle informazioni del set di datidatasets.xml.
* Il dataset viene ricaricato il prima possibile ogni voltaERDDAP™rileva che hai aggiunto, rimosso,[toccato](https://en.wikipedia.org/wiki/Touch_(Unix)) (per cambiare l'ultimo file Tempo modificato) , o ha cambiato un file di dati.
* Il dataset viene ricaricato il prima possibile se si utilizza[sistema di segnalazione](/docs/server-admin/additional-information#flag).

Quando il dataset viene ricaricato,ERDDAP™confronta i file attualmente disponibili nella tabella delle informazioni sui file memorizzati nella cache. I nuovi file vengono letti e aggiunti alla tabella dei file validi. I file che non esistono più vengono eliminati dalla tabella dei file validi. I file in cui il timestamp del file è cambiato sono letti e le loro informazioni sono aggiornate. Le nuove tabelle sostituiscono i vecchi tavoli in memoria e su disco.
     
##### File cattivi{#bad-files-1} 
La tabella dei file cattivi e le ragioni per cui i file sono stati dichiarati cattivi (file danneggiato, variabili mancanti, valori asse errati, ecc.) è inviato via email all'e-mail Tutto A indirizzo email (probabilmente) ogni volta che il dataset viene ricaricato. È necessario sostituire o riparare questi file il prima possibile.
     
##### Variabili mancanti{#missing-variables-1} 
Se alcuni dei file non hanno alcuni deidataVariables definito nel datasetdatasets.xmlBasta cosi'. Quando EDDTableFromFiles legge uno di quei file, funzionerà come se il file avesse la variabile, ma con tutti i valori mancanti.
     
##### Vicino a Real Time Data{#near-real-time-data} 
* EDDTableFromFiles tratta le richieste di dati molto recenti come un caso speciale. Il problema: Se i file che compongono il dataset vengono aggiornati frequentemente, è probabile che il dataset non verrà aggiornato ogni volta che un file viene modificato. Quindi EDDTableFromFiles non sarà a conoscenza dei file modificati. (Si potrebbe usare[sistema di segnalazione](/docs/server-admin/additional-information#flag), ma questo potrebbe portare aERDDAP™ricaricare il dataset quasi continuamente. Quindi nella maggior parte dei casi, non lo consigliamo.) Invece, EDDTableFromFiles tratta questo dal seguente sistema: QuandoERDDAP™riceve una richiesta di dati entro le ultime 20 ore (per esempio, 8 ore fa fino a Ora) ♪ERDDAP™cercherà tutti i file che hanno dati nelle ultime 20 ore. Così,ERDDAP™non ha bisogno di avere dati perfettamente aggiornati per tutti i file al fine di trovare gli ultimi dati. Si dovrebbe ancora impostare [&lt;ricarica Tutti i bambini &gt; (#reloadeverynminutes) a un valore ragionevolmente piccolo (per esempio, 60) , ma non deve essere piccolo (per esempio, 3) .
     
    *    **Non raccomandato** organizzazione di dati in tempo quasi reale nei file: Se, ad esempio, si dispone di un dataset che memorizza i dati per numerose stazioni (o buoi, o traiettoria, ...) per molti anni, è possibile organizzare i file in modo che, per esempio, c'è un file per stazione. Ma poi, ogni volta che arrivano nuovi dati per una stazione, è necessario leggere un grande vecchio file e scrivere un grande nuovo file. E quandoERDDAP™ricarica il dataset, nota che alcuni file sono stati modificati, quindi legge completamente quei file. E' inefficiente.
         
    *    **Consigliato** organizzazione di dati in tempo quasi reale nei file: Memorizzare i dati in blocchi, ad esempio, tutti i dati per una stazione/buoy/traiettoria per un anno (o un mese) . Poi, quando arriva un nuovo dato, solo il file con quello di quest'anno (o mese) i dati sono interessati.
        
        * Il meglio: UsoNetCDFV.ncfile con dimensione illimitata (tempo) . Quindi, per aggiungere nuovi dati, puoi semplicemente aggiungere i nuovi dati senza dover leggere e riscrivere l'intero file. Il cambiamento è reso molto efficiente e essenzialmente atomico, quindi il file non è mai in uno stato incoerente.
        * Altrimenti: Se non si utilizza.ncfile con dimensione illimitata (tempo) , allora, quando è necessario aggiungere nuovi dati, è necessario leggere e riscrivere l'intero file interessato (Speriamo piccolo perché ha solo un anno (o mese) valore dei dati) . Fortunatamente, tutti i file per gli anni precedenti (o mesi) per quella stazione rimane invariata.
        
In entrambi i casi, quandoERDDAP™ricarica il dataset, la maggior parte dei file sono invariati; solo alcuni, piccoli file sono cambiati e devono essere letti.
         
##### Regole{#directories-1} 
I file possono essere in una directory, o in una directory e le sue sottodirectory (ricorsiva) . Se ci sono un gran numero di file (per esempio, &gt; 1,000) , il sistema operativo (e quindi EDDTableFromFiles) opererà molto più efficiente se si memorizza i file in una serie di sottodirectory (uno all'anno, o uno al mese per dataset con file molto frequenti) , in modo che non ci sono mai un numero enorme di file in una determinata directory.
     
##### Regia remote e richieste HTTP Range{#remote-directories-and-http-range-requests-1} 
*    **Regia remote e richieste HTTP Range**   (AKA Byte Serving, Byte Range Richieste) --
    EDDGridDa NcFiles, EDDTableFromMultidimNcFiles, EDDTableFromNcFiles e EDDTableFromNcCFFiles, a volte possono servire i dati da.ncfile su server remoti e accesso via HTTP se il server supporta[Servizio di Byte](https://en.wikipedia.org/wiki/Byte_serving)tramite richieste dell'intervallo HTTP (il meccanismo HTTP per il servizio byte) . Questo è possibile perché netcdf-java (cheERDDAP™usi per leggere.ncfile) supporta la lettura dei dati da remoto.ncfile tramite richieste dell'intervallo HTTP.
    
     **Non farlo&#33;**   
Invece, usare il [&lt;cacheFromUrl&gt; system] (# Cachefromurl #) .
    
##### CacheFromUrl{#cachefromurl} 
* [ ** &lt;Condividi su Google ** ] (# Cachefromurl #) - No.
TuttiEDDGridFromFiles e tutti i dataset EDDTableFromFiles supportano una serie di tag che diconoERDDAP™per scaricare e mantenere una copia di tutti i file di un set di dati remoto, o una cache di alcuni file (scaricato come necessario) . **Questa è una caratteristica incredibilmente utile.** 
    * The&lt;cacheFromUrl&gt; tag consente di specificare un URL con un elenco dei file di un set di dati remoto da un elenco di file remoto.
        
        * Dataset non aggregati in THREDDS, ad esempio,
             https://data.nodc.noaa.gov/thredds/catalog/aquarius/nodc\\_binned\\_V3.0/monthly/  \\[2020-10-21 Questo server non è più affidabile disponibile.\\]
        * Dataset non aggregati inHyraxPer esempio,
            [ https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ ](https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/)
        * La maggior parte degli elenchi di directory simili a Apache, ad esempio,
            [ https://www.ncei.noaa.gov/data/global-precipitation-climatology-project-gpcp-daily/ ](https://www.ncei.noaa.gov/data/global-precipitation-climatology-project-gpcp-daily/)
        * Secchi S3, ad esempio,
            [ https://noaa-goes17.s3.us-east-1.amazonaws.com/ ](https://noaa-goes17.s3.us-east-1.amazonaws.com/)  
Tuttavia, questo può richiedere un account AWS e una maggiore configurazione.
Vedi[lavorare con S3 Buckets inERDDAP™](#working-with-aws-s3-files).
Inoltre, di solito non è necessario utilizzare la cache FromUrl con file in secchi S3 se i file sono file ASCII (ad esempio, .csv) perchéERDDAP™può leggere efficacemente i dati dal secchio direttamente tramite un flusso.
        
        ERDDAP™copiare o memorizzare questi file nel dataset&lt;directory fileDir&gt;. Se hai bisogno di supporto per un altro tipo di elenco di file remoto (ad esempio, FTP) , per favore e-mail la vostra richiesta a Chris. John a noaa.gov.
        
        * Il valore predefinito per il&lt;cacheFromUrl&gt; tag è null. Se non si specifica un valore per&lt;cacheFromUrl&gt; tag, il sistema di copia/cache non verrà utilizzato per questo set di dati.
        * Se il dataset è&lt;fileRegex&gt; l'impostazione è qualcosa di diverso da .\\*,ERDDAP™scarica solo i file che corrispondono al fileRegex.
        * Se il dataset è&lt;l'impostazione recursive&gt; è vera e i file remoti sono in sottodirectory,ERDDAP™guarderà in sottodirectory remote che corrispondono al dataset [&lt;percorsoRegex&gt; (Traduzione:) , creare la stessa struttura directory localmente, e mettere i file locali nelle stesse sottodirectory.
        * In GenerateDatasets Xml, se si specifica un&lt;cacheFromUrl&gt; valore, Generare Datasets Xml creerà il locale&lt;directory fileDir&gt; e copiare 1 file remoto in esso. Genera i dati Xml poi genererà ildatasets.xmlchunk basato su quel file campione (specificare il campione Traduzione:) .
        * Se l'origine dei dati è remotaERDDAP™, uso[EDDGridDa Erddap](#eddfromerddap)o[EDDTableFromErddap](#eddfromerddap)invece di&lt;cacheFromUrl&gt;. Da quella parte, il tuo locale.ERDDAP™sembrerà avere il dataset, ma non avrà bisogno di memorizzare nessuno dei dati a livello locale. L'unico motivo per usare&lt;cacheFromUrl&gt; per ottenere i dati da un telecomandoERDDAP™è quando si dispone di un altro motivo per cui si desidera avere una copia locale dei file di dati. In tal caso:
            * Questo dataset cercherà di sottoscrivere il dataset sul telecomandoERDDAPin modo che le modifiche a quel dataset chiameranno la bandiera di questo dataset Url, causando questo dataset locale per ricaricare e scaricare i file remoti modificati. Così, il dataset locale sarà aggiornato molto presto dopo che le modifiche sono effettuate al dataset remoto.
            * È necessario inviare e-mail all'amministratore del telecomandoERDDAP™a chiederedatasets.xmlper il set di dati remoto in modo da poter effettuare l'impostazione dei dati nel tuo localeERDDAP™sembra il set di dati nel telecomandoERDDAP.
        * Se l'origine dei dati è remotaERDDAP™, il dataset locale cercherà di sottoscrivere il dataset remoto.
            * Se l'abbonamento riesce, ogni volta che il telecomandoERDDAPricarica e ha nuovi dati, metterà in contatto il flagURL per questo dataset, causandogli di ricaricare e scaricare i nuovi e/o i file di dati modificati.
            * Se l'abbonamento non funziona (per qualsiasi ragione) o se si desidera semplicemente garantire che il dataset locale è aggiornato, è possibile impostare un[bandiera](/docs/server-admin/additional-information#flag)per il dataset locale, quindi verrà ricaricato, quindi controllerà per i file di dati remoti nuovi e/o modificati.
        * Se la fonte di dati non è un telecomandoERDDAP: il dataset controllerà per i file remoti nuovi e/o modificati ogni volta che si ricarica. Normalmente, questo è controllato da [&lt;ricarica Tutti i bambini &gt; (#reloadeverynminutes) . Ma se si sa quando ci sono nuovi file remoti, è possibile impostare un[bandiera](/docs/server-admin/additional-information#flag)per il dataset locale, in modo da ricaricare e controllare i file di dati remoti nuovi e/o modificati. Se questo accade di routine in un certo momento del giorno (ad esempio, alle 7) , si può fare un lavoro cron per usarecurlper contattare la bandiera Url per questo set di dati, in modo da ricaricare e controllare per i file di dati remoti nuovi e/o modificati.
    * The&lt;cacheSizeGB&gt; tag specifica la dimensione della cache locale. Probabilmente è solo necessario utilizzare questo quando si lavora con sistemi di archiviazione cloud come[Amazon S3](https://aws.amazon.com/s3/)che è un sistema di archiviazione comunemente usato che fa parte di[Servizi web Amazon (AWS) ](https://aws.amazon.com/). Il valore predefinito è -1.
        * Se il valore è&lt;* (ad esempio, il valore predefinito di -1) ♪
            ERDDAP™scarica e manterrà un **copia completa** di tutti i file di dataset remoto nel dataset&lt;fileDir&gt;.
            * Questa è l'impostazione che è raccomandato ogni volta che possibile.
            * Ogni volta che il dataset viene ricaricato, confronta i nomi, le dimensioni e gli ultimi tempi modificati dei file remoti e dei file locali, e scarica tutti i file remoti che sono nuovi o modificati.
            * Se un file che era sul server remoto scompare,ERDDAP™non cancellerà il corrispondente file locale (altrimenti, se qualcosa era temporaneamente sbagliato con il server remoto,ERDDAP™potrebbe eliminare alcuni o tutti i file locali&#33;) .
            * Con questa impostazione, di solito si imposta&lt;updateEveryNMillis&gt; a -1, dal momento che il dataset è a conoscenza di quando ha copiato nuovi file di dati in atto.
        * Se il valore è &gt;0,
            ERDDAP™scaricherà i file dal set di dati remoto come necessario in un locale **cache** (nel dataset's&lt;fileDir&gt;) con una dimensione di soglia di quel numero specificato di GB.
            * La cache deve essere abbastanza grande da contenere almeno diversi file di dati.
            * In generale, più grande la cache, meglio è, perché il prossimo file di dati richiesto sarà più probabile che già sia nella cache.
            * Caching dovrebbe essere utilizzato solo quandoERDDAP™è in esecuzione in un server cloud computing (ad esempio, un'istanza di calcolo AWS) e i file remoti in un sistema di archiviazione cloud (ad esempio, AWS S3) .
            * Quando lo spazio del disco utilizzato dai file locali supera la cache SizeGB,ERDDAP™sarà presto (forse non subito) eliminare alcuni dei file memorizzati nella cache (attualmente, sulla base del minimo recentemente usato (LRU) algoritmo) fino a quando lo spazio del disco utilizzato dai file locali è&lt;0.75\\*cacheSizeGB (il "canale") . Sì, ci sono casi in cui LRU esegue molto male -- non c'è un algoritmo perfetto.
            *   ERDDAP™non cercherà mai di eliminare un file cache cheERDDAP™ha iniziato a usare negli ultimi 10 secondi. Questo è un sistema imperfetto per affrontare il sistema cache e il sistema di lettore di file di dati è stato integrato solo liberamente. A causa di questa regola,ERDDAP™Potrebbe non essere in grado di eliminare abbastanza file per raggiungere il suo obiettivo, in tal caso stamperà un AVVERTENZA al file log.txt, e il sistema sprecherà molto tempo cercando di indiscrererere la cache, ed è possibile che la dimensione dei file nella cache possa superare notevolmente la cacheSizeGB. Se questo accade, utilizzare un'impostazione cacheSizeGB più grande per quel dataset.
            * Attualmente,ERDDAP™mai controlla se il server remoto ha una nuova versione di un file che è nella cache locale. Se avete bisogno di questa funzione, si prega di e-mail Chris. John a noaa.gov.
        * Anche se l'uso degli stessi nomi dei tag potrebbe implicare che il sistema di copia e il sistema di cache utilizzano lo stesso sistema sottostante, che non è corretto.
            * Il sistema di copia avvia proattivamente le attivitàPer scaricare nuovi e modificati i file ogni volta che il set di dati viene ricaricato. Solo i file che sono stati copiati nella directory locale sono disponibili tramite laERDDAP™Dataset.
            * Il sistema cache ottiene l'elenco dei file remoto ogni volta che il dataset viene ricaricato e fa finta che tutti questi file siano disponibili tramite ilERDDAP™Dataset. È interessante notare che tutti i file remoti appaiono anche nelle pagine /file/ del dataset e sono disponibili per il download (anche se forse solo dopo un ritardo mentre il file viene scaricato per la prima volta dal server remoto alla cache locale.) 
        * I set di dati che utilizzano cacheSizeGB possono beneficiare di un[nParti](#nthreads)impostazione superiore a 1, perché questo permetterà al dataset di scaricare più di 1 file remoto alla volta.
    * The&lt;cachePartialPathRegex&gt; tag è un tag raramente usato che può specificare un'alternativa per il set di dati [&lt;percorsoRegex&gt; (Traduzione:) . Il default è nullo.
        * Utilizzare questo solo se si copia l'intero dataset tramite il default&lt;cacheSizeGB&gt; valore di -1. Con&lt;cacheSizeGB&gt; valori di &gt;1, questo verrà ignorato perché non è sensibile.
        * Vedi [la documentazione per&lt;percorsoRegex&gt; (Traduzione:) per la guida su come costruire il regex.
        * Se questo è specificato, verrà utilizzato ogni volta che il dataset viene ricaricato, tranne la prima volta che un dataset viene ricaricato all'inizio di un mese.
        * Questo è utile quando il dataset remoto viene memorizzato in un labirinto di sottodirectory e quando la maggior parte di quei file raramente, se mai, cambiano. (&lt;tossicità NASA&lt;tosse &gt; Si potrebbe, ad esempio, specificare un&lt;cachePartialPathRegex&gt; che corrisponde solo all'anno corrente o al mese corrente. Questi regexe sono molto difficili da specificare, perché tutti i nomi dei percorsi parziali e completi devono corrispondere al&lt;cachePartialPathRegex&gt; e perché&lt;cachePartialPathRegex&gt; deve lavorare con gli URL remoti e le directory locali. Un vero esempio di vita è:
```
            <cacheFromUrl>https://data.nodc.noaa.gov/ghrsst/GDS2/L4/GLOB/JPL/MUR/v4.1/</cacheFromUrl>  
            \\>!-- \\[2020-10-21 This server is no longer reliably available.\\] For most types of remote directories, omit the filename (e.g., contents.html for Hyrax). -->  
            <fileDir>/u00/satellite/MUR41/</fileDir>  
            <fileNameRegex>\\*\\.nc</fileNameRegex>  
            <recursive>true</recursive>  
            <pathRegex>.\\*</pathRegex>  
            <cachePartialPathRegex>.\\*/v4\\.1/(|2018/(|01./))</cachePartialPathRegex>  
```
L'URL di esempio sopra ha i file in sottodirectory in base all'anno (ad esempio, 2018) e giorno dell'anno (ad esempio, 001, 002, ..., 365 o 366) .
Nota che&lt;cachePartialPathRegex&gt; inizia con .\\*,
poi ha una specifica sottodirectory comune agli URL remoti e alle directory locali, ad esempio /v4\\\.1/
poi ha una serie di gruppi di cattura nidificati dove la prima opzione non è nulla
e la seconda opzione è un valore specifico.
            
L'esempio di cui sopra corrisponderà solo alle directory per i secondi 10 giorni del 2018, ad esempio,
             https://data.nodc.noaa.gov/ghrsst/GDS2/L4/GLOB/JPL/MUR/v4.1/2018/010/  \\[2020-10-21 Questo server non è più affidabile disponibile.\\]  
e giorno 011, 012, ..., 019.
             (Vedi questo[documentazione regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)e[tutorial regex](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).)   
Se hai bisogno di aiuto per creare&lt;cachePartialPathRegex&gt;, si prega di e-mail il&lt;cacheFromUrl&gt; a Chris. John a noaa.gov.
            
        * Un approccio comune: Se si desidera utilizzare&lt;cachePartialPathRegex&gt;, non utilizzarlo inizialmente, perché si desideraERDDAP™per scaricare tutti i file inizialmente. DopoERDDAP™ha scaricato tutti i file, aggiungerlo al pezzo di datasetdatasets.xml.
             
##### Migliaia di file{#thousands-of-files} 
Se il tuo dataset ha molte migliaia di file,ERDDAP™può essere lento a rispondere alle richieste di dati da tale dataset. Ci sono due problemi qui:
 

1. Il numero di file per directory.
Internamente,ERDDAP™opera alla stessa velocità indipendentemente dal fatto che i file n siano in una directory o dispersi in diverse directory.
     
Ma c'è un problema: Più file in una determinata directory, più lento è il sistema operativo a restituire l'elenco dei file nella directory (per file) aERDDAP. Il tempo di risposta potrebbe essere O (N log n) . È difficile dire quanti file in una directory sono troppi, ma 10.000 sono probabilmente troppi. Quindi, se la configurazione sta generando un sacco di file, una raccomandazione qui potrebbe essere: mettere i file in subdirectories logicamente organizzato (ad esempio, stazione o stazione/anno) .
    
Un altro motivo per usare sottodirectory: se un utente vuole usareERDDAP'"files"sistema per trovare il nome del file più vecchio per la stazione X, è più veloce e più efficiente se i file sono in stazioni / anni subdirectories, perché molto meno informazioni devono essere trasferite.
    
2. Il numero totale di file.
Per set di dati tabulari,ERDDAP™tiene traccia della gamma di valori per ogni variabile in ogni file. Quando un utente fa una richiesta,ERDDAP™deve leggere tutti i dati da tutti i file che potrebbero avere dati corrispondenti alla richiesta dell'utente. Se l'utente chiede i dati da un tempo limitato (ad esempio, un giorno o un mese) AlloraERDDAP™non dovrà aprire troppi file nel tuo dataset. Ma ci sono casi estremi in cui quasi ogni file potrebbe avere dati corrispondenti (ad esempio, quando l'acquaTemperatura=13.2C) . Da quando ci vuoleERDDAP™un po' di tempo (in parte il tempo di ricerca sull'HDD, in parte il tempo di leggere l'intestazione del file) solo per aprire un dato file (e di più se ci sono un sacco di file nella directory) , c'è una pena di tempo significativa se il numero totale di file cheERDDAP™deve aprire è molto grande. Anche l'apertura di 1000 file richiede tempo significativo. Quindi ci sono vantaggi per consolidare periodicamente i file giornalieri in pezzi più grandi (ad esempio, 1 stazione per 1 anno) . Capisco che potrebbe non volerlo fare per vari motivi, ma porta a risposte molto più veloci. In casi estremi (ad esempio, mi occupo di un set di dati GTSPP che ha ~35 milioni di file sorgente) , servire i dati da un numero enorme di file sorgente è poco pratico perchéERDDAPLa risposta alle domande semplici può richiedere ore e usare tonnellate di memoria. Consolidando i file sorgente in un numero più piccolo (per GTSPP, ho 720 ora, 2 al mese) ♪ERDDAP™può rispondere ragionevolmente rapidamente. Vedi[Milioni di file](#millions-of-files)  
     

N.B. Solid State Drives sono grandi&#33; Il modo più veloce, più semplice, più economico per aiutareERDDAP™affare con un numero enorme di (piccola) file è quello di utilizzare un'unità di stato solido. Vedi[Solid State Drives sono grandi&#33;](/docs/server-admin/additional-information#solid-state-drives)  
     
##### Milioni di file{#millions-of-files} 
* Alcuni dataset hanno milioni di file sorgente.ERDDAP™può gestire questo, ma con risultati misti.
    
    * Per richieste che coinvolgono solo variabili elencate in [&lt;subsetVariables&gt; (# Subsetvariables #) ♪ERDDAP™ha tutte le informazioni necessarie già estratte dai file di dati e memorizzate in un file, in modo da poter rispondere molto, molto rapidamente.
    * Per altre richieste,ERDDAP™può eseguire la scansione del dataset[informazioni di file memorizzate](#cached-file-information)e capire che solo alcuni dei file potrebbero avere dati rilevanti per la richiesta e quindi rispondere rapidamente.
    * Ma per altre richieste (per esempio, acquaTemperatura=18 gradi\\_C) dove qualsiasi file potrebbe avere dati rilevanti,ERDDAP™deve aprire un gran numero di file per vedere se ciascuno dei file ha dati rilevanti per la richiesta. I file sono aperti in modo sequenziale. Su qualsiasi sistema operativo e su qualsiasi file system (diversi da unità di stato solide) Ci vuole molto tempo. (CosìERDDAP™risponde lentamente) e davvero lega il file system (CosìERDDAP™risponde lentamente ad altre richieste) .
    
Fortunatamente, c'è una soluzione.
    
    1. Impostare il dataset su un non pubblicoERDDAP™  (il tuo personal computer?) .
    2. Creare ed eseguire uno script che richiede una serie di.ncFile CF, ciascuno con un grande pezzo del dataset, di solito un periodo di tempo (ad esempio, tutti i dati per un determinato mese) . Scegliere il periodo di tempo in modo che tutti i file risultante siano inferiori a 2GB (ma sperabilmente maggiore di 1GB) . Se il dataset ha dati in tempo quasi reale, eseguire lo script per rigenerare il file per il periodo di tempo corrente (ad esempio, questo mese) frequentemente (ogni 10 minuti? ogni ora?) . Richieste diERDDAP™per.ncI file CF creano unNetCDFV.ncfile che utilizza[CFU Geometrie di smorzamento discreto (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Contiguous Ragged Array strutture dati).
    3. Impostare un[EDDTableFromNcCFFiles](#eddtablefromnccffiles)dataset sul tuo pubblicoERDDAP™che ottiene i dati dal.nc (CFU) file.ERDDAP™può estrarre i dati da questi file molto rapidamente. E visto che ora ci sono decine o centinaia (invece di milioni) di file, anche seERDDAP™deve aprire tutti i file, può farlo rapidamente.
    
Sì, questo sistema richiede un po 'di tempo e di sforzo per impostare, ma funziona molto, molto bene. La maggior parte delle richieste di dati può essere gestita 100 volte più velocemente di prima.
    \\[Bob sapeva che era una possibilità, ma è stato Kevin O'Brien a fare questo e ha mostrato che funziona bene. Ora, Bob utilizza questo per il dataset GTSPP che ha circa 18 milioni di file sorgente e cheERDDAP™ora serve via circa 500.nc (CFU) file.\\]
    
N.B. Solid State Drives sono grandi&#33; Il modo più veloce, più semplice, più economico per aiutareERDDAP™affare con un numero enorme di (piccola) file è quello di utilizzare un'unità di stato solido. Vedi[Solid State Drives sono grandi&#33;](/docs/server-admin/additional-information#solid-state-drives)  
     
    
##### File enormi{#huge-files} 
* Un unico file di dati enorme (in particolare enormi file di dati ASCII) può causare un OutOfMemoryError. Se questo è il problema, dovrebbe essere ovvio perchéERDDAP™non verrà caricato il dataset. La soluzione, se possibile, è quella di dividere il file in più file. Idealmente, è possibile dividere il file in blocchi logici. Ad esempio, se il file ha 20 mesi di valore di dati, dividerlo in 20 file, ciascuno con 1 mese di valore di dati. Ma ci sono vantaggi anche se il file principale è diviso arbitrariamente. Questo approccio ha molteplici vantaggi: a) Questo ridurrà la memoria necessaria per leggere i file di dati a 1/20, perché solo un file viene letto alla volta. b) Spesso,ERDDAP™può trattare le richieste molto più velocemente perché deve solo guardare in uno o pochi file per trovare i dati per una determinata richiesta. c) Se la raccolta dei dati è in corso, i 20 file esistenti possono rimanere invariati, e devi solo modificare un, piccolo, nuovo file per aggiungere il valore dei dati del mese successivo al dataset.
     
##### Problemi FTP / Consigli{#ftp-troubleadvice-1} 
* Se si FTP nuovi file di dati alERDDAP™serverERDDAP™sta correndo, c'è la possibilità cheERDDAP™verrà ricaricato il dataset durante il processo FTP. Succede più spesso di quanto si possa pensare&#33; Se succede, il file sembrerà valido (ha un nome valido) Ma il file non è valido. SeERDDAP™tenta di leggere i dati da quel file non valido, l'errore risultante causerà l'aggiunta del file alla tabella dei file non validi. Non va bene. Per evitare questo problema, utilizzare un nome di file temporaneo quando FTP'ing the file, ad esempio, ABC2005.nc\\_TEMP . Poi, il fileNameRegex test (vedi sotto) indicherà che questo non è un file rilevante. Dopo che il processo FTP è completo, rinominare il file nel nome corretto. Il processo di rinominazione causerà che il file diventi rilevante in un istante.
    
##### Nome file estrae{#file-name-extracts} 
\\[Questa funzione è DEPRECATED. Per favore[\\*\\**fileName pseudosourceName](#filename-sourcenames)Invece.\\]  
EDDTableFromFiles ha un sistema per estrarre uno String da ogni nome di file e usarlo per rendere una variabile di dati pseudo. Attualmente, non c'è alcun sistema per interpretare queste stringhe come date/ora. Ci sono diversi tag XML per impostare questo sistema. Se non hai bisogno di parte o di tutto questo sistema, non specificare questi tag o utilizzare i valori ".

* preExtractRegex è un[espressione regolare](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) usato per identificare il testo da rimuovere dall'inizio del nome del file. La rimozione avviene solo se il regex è abbinato. Questo di solito inizia con "^" per corrispondere all'inizio del nome del file.
* post ExtractRegex è un'espressione regolare utilizzata per identificare il testo da rimuovere dalla fine del nome del file. La rimozione avviene solo se il regex è abbinato. Questo di solito termina con "$" per corrispondere alla fine del nome del file.
* estrattoreRegex Se presente, questa espressione regolare viene utilizzata dopo preExtractRegex e postExtractRegex per identificare una stringa da estrarre dal nome del file (per esempio, ilstationID) . Se il regex non è abbinato, l'intero nome del file viene utilizzato (meno preExtract e post Estratto) . Utilizzare ".\\*" per abbinare l'intero nome del file che viene lasciato dopo preExtractRegex e postExtractRegex.
* colonna NameForExtract è il nome sorgente della colonna di dati per le stringhe estratte. AdataVariablecon questo[sourceName](#sourcename)deve essere neldataVariableelenco (con qualsiasi tipo di dati, ma di solito String) .

Ad esempio, se un dataset ha file con nomi come XYZAble.nc, XYZBaker.nc, XYZCharlie.nc, ... e vuoi creare una nuova variabile (stationID) quando ogni file viene letto che avrà valori ID stazione (Able, Baker, Charlie, ...) estratti dai nomi dei file, è possibile utilizzare questi tag:

*   &lt;PreExtractRegex&gt;^XYZ&lt;/preExtractRegex&gt;
Il primo ^ è un carattere speciale espressione regolare che forzaERDDAP™cercare XYZ all'inizio del nome del file. Questo causa XYZ, se trovato all'inizio del nome del file, da rimuovere (per esempio, il nome del file XYZAble.ncdiventa Able.nc) .
*   &lt;PostExtractRegex&gt;\\.nc&#33;&lt;/PostExtractRegex&gt;
Il $ alla fine è un carattere speciale espressione regolare che forzaERDDAP™per cercare.ncalla fine del nome del file. Poiché . è un carattere speciale espressione regolare (che corrisponde a qualsiasi carattere) , è codificato come \\\. Qui (perché 2E è il numero di carattere esadecimale per un periodo) . Questo provoca.nc, se trovato alla fine del nome del file, da rimuovere (per esempio, il nome parziale del file Able.ncdiventa Able) .
*   &lt;EsclusoRegex&gt;.&lt;/estrattore
L'espressione regolare .\\* corrisponde a tutti i caratteri rimanenti (per esempio, il nome parziale del file Able diventa l'estratto del primo file) .
*   &lt;colonnaNameForExtract&gt;stationID&lt;/columnNameForExtract&gt;
Questo diceERDDAP™per creare una nuova colonna sorgente chiamatastationIDquando si legge ogni file. Ogni riga di dati per un dato file avrà il testo estratto dal suo nome di file (per esempio, Able) come il valore nelstationIDcolonna.

Nella maggior parte dei casi, ci sono numerosi valori per queste etichette di estratto che produrranno gli stessi risultati -- espressioni regolari sono molto flessibili. Ma in alcuni casi, c'è solo un modo per ottenere i risultati desiderati.
     
##### PseudosourceName#{#pseudo-sourcenames} 
Ogni variabile in ogni datasetERDDAP™ha un&lt;sourceName&gt; (#) che specifica il nome della sorgente per la variabile. EDDTableFromFiles supporta alcuni pseudosourceNames che estrae un valore da qualche altro luogo (ad esempio, il nome del file o il valore di un attributo globale) e promuovere tale valore per essere una colonna di valori costanti per quel pezzo di dati (ad esempio, la tabella dei dati di quel file) . Per queste variabili, è necessario specificare il tipo di dati della variabile tramite il [&lt;dataType&gt;] (#datatype #) tag. Se le informazioni estratte sono una stringa dateTime, specificare il formato della stringa dateTime nella stringa data[unità attributo](#string-time-units). Lo pseudosourceNamele opzioni sono:
 
###### globale:sourceName#{#global-sourcenames} 
Un attributo globale dei metadati in ogni file di dati sorgente può essere promosso come colonna di dati. Se una variabile è&lt;sourceName&gt; ha il formato
```
        <sourceName>global:*attributeName*</sourceName>
```
alloraERDDAP™sta leggendo i dati da un file,ERDDAP™cercherà un attributo globale di quel nome (per esempio, PI) e creare una colonna riempita con il valore dell'attributo. Questo è utile quando l'attributo ha valori diversi in diversi file sorgente, perché altrimenti, gli utenti vedranno solo uno di quei valori per l'intero dataset. Per esempio,
```
        <sourceName>global:PI</sourceName>
```
Quando si promuove un attributo per essere dati,ERDDAP™rimuove l'attributo corrispondente. Questo è appropriato perché il valore è presumibilmente diverso in ogni file; mentre nel dataset aggregatoERDDAP™avrà un solo valore. Se si desidera, è possibile aggiungere un nuovo valore per l'attributo per l'intero dataset aggiungendo&lt;# *attributo Nome* &gt; *nuovo Valore* &lt;/att&gt; al set di dati globale [&lt;addAttributes&gt; (#addattributes) . Per gli attributi globaliERDDAP™richiede, ad esempio, l'istituzione, È necessario aggiungere un nuovo valore per l'attributo.
     
###### variabile:sourceName#{#variable-sourcenames} 
L'attributo dei metadati di una variabile in ogni file può essere promosso come colonna di dati. Se una variabile è&lt;[sourceName](#sourcename)\\&gt; ha il formato
```
        <sourceName>variable:*variableName*:*attributeName*<sourceName>
```
alloraERDDAP™sta leggendo i dati da un file,ERDDAP™cercherà l'attributo specificato (per esempio, ID) della variabile specificata (per esempio, strumento) e creare una colonna riempita con il valore dell'attributo. La variabile genitore (per esempio, strumento) non deve essere uno deidataVariables incluso nella definizione del datasetERDDAP. Per esempio,
```
        <sourceName>variable:instrument:ID</sourceName>
```
Questo è utile quando l'attributo ha valori diversi in diversi file sorgente, perché altrimenti, gli utenti vedranno solo uno di quei valori per l'intero dataset.

Quando si promuove un attributo per essere dati,ERDDAP™rimuove l'attributo corrispondente. Questo è appropriato perché il valore è presumibilmente diverso in ogni file; mentre nel dataset aggregatoERDDAP™avrà un solo valore. Se si desidera, è possibile aggiungere un nuovo valore per l'attributo per l'intero dataset aggiungendo&lt;# *attributo Nome* &gt; *nuovo Valore* &lt;/att&gt; alla variabile [&lt;addAttributes&gt; (#addattributes) . Per attributi cheERDDAP™richiede, ad esempio,ioos\\_category  (a seconda della configurazione) , È necessario aggiungere un nuovo valore per l'attributo.
        
###### fileNamesourceName#{#filename-sourcenames} 
È possibile estrarre parte del file di un nome e promuovere che per essere una colonna di dati. Il formato per questo pseudo [&lt;sourceName&gt; (#) è
```
        <sourceName>\\*\\*\\*fileName,*regex*,*captureGroupNumber*</sourceName>
```
Per esempio,
```
        <sourceName>\\*\\*\\*fileName,A(\\d{12})\\.slcpV1.nc,1</sourceName>
```
Quando EDDTableFromFiles sta leggendo i dati da un file, si assicurerà il fileName (per esempio, A201807041442.slcpV1.nc) corrisponde all'espressione regolare specificata ("regex") ed estrarre il specificato (in questo caso, il primo) gruppo di cattura (che è una parte circondata da parentesi) , per esempio, "201807041442". (Vedi questo[documentazione regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)e[tutorial regex](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) Il regex può essere specificato come una stringa con o senza citazioni circostanti. Se il regex è specificato come una stringa con citazioni circostanti, la stringa deve essere[stringa in stile JSON](https://www.json.org/json-en.html)  (con caratteri speciali scappati con caratteri \\) . Il numero di gruppo di cattura è di solito 1 (il primo gruppo di cattura) , ma può essere qualsiasi numero.
     
###### NomesourceName#{#pathname-sourcenames} 
È possibile estrarre parte del percorso completo di un file Nome (/directories/fileName.ext) e promuovere che sia una colonna di dati. Il formato per questo pseudo [&lt;sourceName&gt; (#) è
```
        <sourceName>\\*\\*\\*pathName,*regex*,*captureGroupNumber*<sourceName>
```
Per esempio,
```
        <sourceName>\\*\\*\\*pathName,/data/myDatasetID/(\\[A-Z0-9\\]\\*)/B(\\d{12}).nc,1</sourceName>
```
Quando EDDTableFromFiles sta leggendo i dati da un file, si assicurerà il percorso completoName (per esempio, /data/myDatasetID/BAY17/B201807041442.nc. Per questo test, i separatori di directory saranno sempre'/'♪ ') corrisponde all'espressione regolare specificata ("regex") ed estrarre il specificato (in questo caso, il primo) gruppo di cattura (che è una parte circondata da parentesi) , per esempio, "BAY17". (Vedi questo[documentazione regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)e[tutorial regex](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) Il regex può essere specificato come una stringa con o senza citazioni circostanti. Se il regex è specificato come una stringa con citazioni circostanti, la stringa deve essere una[stringa in stile JSON](https://www.json.org/json-en.html)  (con caratteri speciali scappati con caratteri \\) . Il numero di gruppo di cattura è di solito 1 (il primo gruppo di cattura) , ma può essere qualsiasi numero.
         
##### "0 file" Messaggio di errore{#0-files-error-message-2} 
* Se scappi[GenerareDatasetsXml](#generatedatasetsxml)o[DasDds](#dasdds)o se provi a caricare un EDDTableDa... File dataset inERDDAP™, e si ottiene un messaggio di errore "0 file" che indica cheERDDAP™trovato 0 file corrispondenti nella directory (quando pensi che ci siano file corrispondenti in quella directory) :
    * Controllare che i file sono davvero in quella directory.
    * Controlla l'ortografia del nome della directory.
    * Controlla il fileNameRegex. E 'davvero, davvero facile fare errori con regexe. Per scopi di prova, prova il regex .\\* che dovrebbe corrispondere a tutti i nomi di file. (Vedi questo[documentazione regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)e[tutorial regex](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html).) 
    * Controllare che l'utente che esegue il programma (ad esempio, user=tomcat (?) per Tomcat/ERDDAP) ha il permesso "leggere" per quei file.
    * In alcuni sistemi operativi (per esempio, SELinux) e a seconda delle impostazioni di sistema, l'utente che ha eseguito il programma deve avere 'leggi' il permesso per l'intera catena di directory che porta alla directory che ha i file.
         
##### standardizzare Cosa?{#standardizewhat} 
* Quando qualsiasi sottoclasse di EDDTableFromFiles aggrega un insieme di file sorgente, per una determinata variabile, tutti i file di origine devono avere valori di attributo identici per diversi attributi:scale\\_factor♪add\\_offset,missing\\_value, \\_FillValore e unità). Pensateci: se un file ha ventoSpeed unit=knots e un altro ha ventoSpeed unit=m/s, i valori di dati dei due file non dovrebbero essere inclusi nello stesso set di dati aggregati. Così, quando EDDTableFromFiles crea il dataset, legge i valori dell'attributo da un file, quindi rifiuta tutti i file che hanno valori diversi per quegli attributi importanti. Per la maggior parte delle collezioni di file, questo non è un problema perché gli attributi di tutte le variabili sono coerenti. Tuttavia, per altre collezioni di file, questo può portare a 1%, 10%, 50%, 90%, o anche il 99% dei file che vengono rifiutati come file "cattivo". E' un problema.
    
EDDTableFrom file ha un sistema per affrontare questo problema: standardizzare Cosa? La standardizzazione Quale impostazione dice EDDTableFromFiles per standardizzare i file non appena li legge, prima EDDTableFromFiles guarda gli attributi per vedere se sono coerenti.
    
Il lato flip è: se il dataset non ha questo problema, non usare standardizzare Cosa? standardizzare Quali sono i rischi potenziali (discusso di seguito) e inefficienze. Quindi, se non avete realmente bisogno delle caratteristiche di standardizzare Non c'è bisogno di affrontare i potenziali rischi e inefficienze. La più grande inefficienza è: Quando vari standardize Quali opzioni sono utilizzate da un dataset, implica che i file di origine stanno memorizzando i dati in modi significativamente diversi (ad esempio, con diversiscale\\_factoreadd\\_offset, o con stringhe di tempo utilizzando diversi formati) . Così, per un dato vincolo in una richiesta dell'utente, non c'è modo perERDDAP™fare un unico limite di livello sorgente che può essere applicato a tutti i file sorgente. Quindi...ERDDAP™può applicare solo i vincoli colpiti a un livello più alto. Quindi...ERDDAP™deve leggere i dati da più file prima di applicare i vincoli più alti, livello di destinazione. Così le richieste ai set di dati che utilizzano standardizzare Ciò che richiede più tempo per essere elaborato.
    
Per utilizzare questo sistema, è necessario specificare
```
    <standardizeWhat>*standardizeWhat*</standardizeWhat>  
```
nel[datasets.xmlper l'EDDTableDa... Dataset file](#eddtablefromfiles-skeleton-xml)(nel&lt;dataset&gt; tag).
    
The *standardizzare Cosa?* valore specifica quali cambiamenti EDDTableFromFiles dovrebbero cercare di applicare. I cambiamenti sono la somma di una qualche combinazione di:
    
1. Un pacchetto
Questo fa molte operazioni comuni e sicure per standardizzare le colonne numeriche nei file:
    * Sescale\\_factore/oadd\\_offsetattributi sono presenti, rimuoverli e applicarli per disfare i valori dei dati.
    * Unpack attributi imballati (ad esempio, reale\\_min, reale\\_max,actual\\_range♪data\\_min♪data\\_max, dati\\_range,valid\\_min♪valid\\_max♪valid\\_range) , se presente, se la variabile è stata imballata, e se i valori dell'attributo sono stati imballati (questo è difficile, ma ragionevolmente affidabile) .
    * Se \\_FillValore e/omissing\\_valuesono presenti, convertire questi valori di dati inERDDAPvalori mancanti "standard": MAX\\_VALUE per i tipi interi (ad esempio, 127 per byte, 32.767 per corto, e 2.147,483,647 per ints, 9223372036854775807 per lunghi) e NaN per doppi e galleggianti.
    * Rimuovere il vecchio \\_FillValue e/omissing\\_valueattributi attributi attributi attributi attributi (se c'è) , e sostituirli con solo \\_FillValue=\\[ilERDDAP™valore mancante standard\\].
         
2. Standardizzare i tempi numerici
Se una colonna numerica ha unità di tempo numeriche in stile CF (" *tempoUnisciti* da *baseTime* ", ad esempio, "giorni dal 1900-01-01") , questo converte la data Valori del tempo"seconds since 1970-01-01T00:00:00Z"valori e modifica l'attributo delle unità per indicarlo.
Se questa è selezionata e c'è la possibilità che questa variabile abbiascale\\_factoroadd\\_offset, #1 DEVE essere selezionato anche.
     
3. Applicare lo stressmissing\\_value  
Se una colonna di stringa ha \\_FillValue e/omissing\\_valueattributi, questo converte quei valori in "" e rimuove gli attributi.
     
4. Trova Numericomissing\\_value  
Se una colonna numerica non ha \\_FillValue omissing\\_valueattributi, questo cerca di identificare un numerico non definitomissing\\_value  (Ad esempio, -999, 9999, 1e37f) e convertire le istanze di esso ai valori "standard" (MAX\\_VALUE per tipi interi, e NAN per doppie e galleggianti) .
     **Questa opzione ha un rischio:** se il più grande o il più piccolo valore di dati valido sembra un valore mancante (ad esempio, 999) , quindi i valori di dati validi saranno convertiti in valori mancanti (ad esempio, NaN) .
     
5. Cambia la stringa "N/A" a "
Per ogni colonna String, convertire diverse stringhe comunemente utilizzate per indicare un valore di stringa mancante in "". Attualmente, questo cerca "., "...", "-", "?", "??", "N/A", "NA", "none", "non applicabile", "null", "non noto", "non specificato". La ricerca della stringa è caso-insensibile e applicata dopo che le stringhe sono trim'd. "nd" e "altro" non sono specificamente sulla lista.
     **Questa opzione ha un rischio:** Le stringhe che si considerano valide possono essere convertite in ".
     
6. Standardizzare a String ISO 8601 DateTimes
Per ogni colonna String, cercare di convertire non-purely-numeric String dateTimes (ad esempio, "Jan 2, 2018") a ISO 8601 Data di stringaTimes ("2018-01-02") .
     **Nota** che tutti i valori di dati per la colonna devono utilizzare lo stesso formato, altrimenti questa opzione non farà alcuna modifica a una determinata colonna.
     **Questa opzione ha un rischio:** Se c'è una colonna con valori di stringa che sembrano una data comune Formato del tempo, saranno convertiti in ISO 8601 String dateTimes.
     
7. Standardize Compact DateTimes a ISO 8601 DateTimes
Per ogni colonna di tipo String o integer, prova a convertire data di stringa puramente numericaTimes (ad esempio, "20180102") a ISO 8601 Data di stringaTimes ("2018-01-02") .
     **Nota** che tutti i valori di dati per la colonna devono utilizzare lo stesso formato, altrimenti questa opzione non farà alcuna modifica a una determinata colonna.
     **Questa opzione ha un rischio:** Se c'è una colonna con valori non compatti I tempi ma sembrano compatti dateTimes, saranno convertiti in ISO 8601 String dateTimes.
     
8. Standardizzare le unità
Questo cerca di standardizzare la stringa delle unità per ogni variabile. Per esempio, "metri al secondo", "metro/secondo","m.s^-1"♪"m s-1", "m.s-1" tutti saranno convertiti in "m.s-1". Questo non cambia i valori dei dati. Questo funziona bene per validoUDUNITSunità stringhe, ma può avere problemi con stringhe non valide o complesse. È possibile affrontare i problemi specificando coppie specifiche in&lt;standardizzare le unità inERDDAP'
    \\[tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noa/pfel/erddap/util/messages.xml file. Si prega di e-mail eventuali modifiche apportate a Chris. John a noa.gov in modo che possano essere incorporati nei messaggi di default.xml.
     **Questa opzione ha un rischio:** Questo può raggruppare alcune unità complesse o non valide; tuttavia, è possibile utilizzare il work-around descritto sopra per aggirare i problemi se si verificano.
         
    
Il valore predefinito di standardize Cos'e' 0, che non fa niente.

Se / quando si cambia il valore di standardizzare La prossima volta che il dataset viene ricaricato,ERDDAP™rileggerà tutti i file di dati per il dataset al fine di ricostruire la mini-database con informazioni su ogni file. Se il dataset ha un sacco di file, questo richiederà molto tempo.
    
Note:

* Una cosa difficile è...
La standardizzazione Quale impostazione viene utilizzata per tutte le colonne nel file sorgente. Così, per esempio, utilizzando #2048 potrebbe convertire con successo una colonna di stringa compatta dateTimes in ISO 8601 String dateTimes, ma potrebbe anche erroneamente convertire una colonna con Strings che solo capita di assomigliare a dateTimes compatto.
     
*   datasets.xmle generareDatasets Xml -
È particolarmente difficile ottenere le impostazioni corrette indatasets.xmlper far funzionare il tuo dataset come vuoi. Il miglior approccio (come sempre) è:
    1. Uso[GenerareDatasetsXml](#generatedatasetsxml)e specificare il valore di standardizzare Cosa vorresti usare?
    2. Uso[DasDds](#dasdds)per garantire che il dataset carichi correttamente e riflette la standardizzazione Che impostazione hai specificato.
    3. Testare il set di dati a mano quando è inERDDAP™garantire che le variabili interessate funzionino come previsto.
         
* Rischi -
Opzioni #256 e sopra sono più rischiosi, vale a dire, c'è una maggiore probabilità cheERDDAP™farà un cambiamento che non dovrebbe essere fatto. Per esempio, l'opzione #2048 potrebbe accidentalmente convertire una variabile con stringhe di ID della stazione che tutti appena capita di guardare le date "compatte" ISO 8601 (ad esempio, 20180102) in ISO 8601"extended"date ("2018-01-02") .
     
* Rallenta dopo un cambiamento...
Dal momento che il valore di standardizzare Ciò che cambia i valori di dati che EDDTableFromFiles vede per ogni file di dati, se si modifica la standardizzazione Quale impostazione, EDDTableFromFiles getterà via tutte le informazioni memorizzate nella cache su ogni file (che include il minimo e max per ogni variabile di dati in ogni file) e rileggere ogni file di dati. Se un dataset ha un gran numero di file, questo può essere molto tempo di consumo, quindi ci vorrà molto tempo per il dataset di ricaricare la prima voltaERDDAP™lo ricarica dopo aver fatto il cambiamento.
     
* Euristica -
Opzioni #256 e sopra usare euristica per fare i loro cambiamenti. Se si imbatte in una situazione in cui gli euristici prendono una cattiva decisione, si prega di inviare una descrizione del problema a Chris. John a Noaa. gov così possiamo migliorare l'euristica.
     
* Alternative --
Se una delle opzioni standardizeWhat non risolve un problema per un dato set di dati, si può essere in grado di risolvere il problema facendo un[.ncfile ml](#ncml-files)a parallelo ogni file di dati e definire le modifiche alle cose nei file in modo che i file siano coerenti. Allora di' all'EDDTableDa... Dataset file per aggregare.ncfile ml.
    
O, uso[NCO](#netcdf-operators-nco)effettuare modifiche ai file in modo che i file siano coerenti.
        
##### Colonne separate per anno, mese, data, ora, minuto, secondo{#separate-columns-for-year-month-date-hour-minute-second} 
È abbastanza comune per i file di dati tabular avere colonne separate per anno, mese, data, ora, minuto, secondo. PrimaERDDAP™v2.10, l'unica soluzione era quella di modificare il file di dati per combinare quelle colonne in una colonna di tempo unificata. ConERDDAP™2.10+, è possibile utilizzare
[&lt;sourceName&gt;= *espressione* &lt;sourceName&gt; (#) per direERDDAP™come combinare le colonne di origine per fare una colonna di tempo unificata, quindi non è più necessario modificare il file di origine.
##### &lt;skipHeaderToRegex&gt;{#skipheadertoregex} 
* [&lt;FORMAZIONE PROFESSIONALE (# Skipheadertoregex #) --
Opzionale. (Per EDDTableFromAsciiFiles e EDDTableFromColumnarAsciiFiles solo set di dati.)   
Quando EDDTableFromAsciiFiles legge un file di dati, ignorerà tutte le righe fino a e compresa la linea che corrisponde a questa espressione regolare. Il default è "", che non utilizza questa opzione. Un esempio è
```
    <skipHeaderToRegex>\\\*\\\*\\\* END OF HEADER.\\*<skipHeaderToRegex>  
```
che ignorerà tutte le righe fino a e tra cui una linea che inizia con "\\*\\*FINE DI HEADER».

Quando si utilizza questo tag,&lt;colonnaNamesRow&gt; e&lt;firstDataRow&gt; agire come se l'intestazione è stata rimossa prima della lettura del file. Ad esempio, useresti la colonnaNamesRow=0 se i nomi delle colonne sono sulla riga subito dopo l'intestazione.

Se si desidera utilizzare generare Datasets Xml con un set di dati che ha bisogno di questo tag:

1. Fare un nuovo, temporaneo, file campione copiando un file esistente e rimuovendo l'intestazione.
2. Correre genera Datasets Xml e specificare il file campione.
3. Aggiungere manualmente il&lt;skipHeaderToRegex&gt; tag aldatasets.xmlSbagliato.
4. Eliminare il file temporaneo e campione.
5. Utilizzare il dataset inERDDAP.
##### &lt;skipLinesRegex&gt;{#skiplinesregex} 
Opzionale. (Per EDDTableFromAsciiFiles e EDDTableFromColumnarAsciiFiles solo set di dati.)   
Quando EDDTableFromAsciiFiles legge un file di dati, ignorerà tutte le linee che corrispondono a questa espressione regolare. Il default è "", che non utilizza questa opzione. Un esempio è
```
    <skipLinesRegex>#.\\*<skipLinesRegex>  
```
che ignorerà tutte le linee che iniziano con "#".

Quando si utilizza questo tag,&lt;colonnaNamesRow&gt; e&lt;firstDataRow&gt; agire come se tutte le linee corrispondenti fossero state rimosse prima che il file venga letto. Ad esempio, useresti la colonnaNamesRow=0 anche se ci sono diverse linee che iniziano con, ad esempio, "#" all'inizio del file.
    
#### EDDTableFromFiles scheletro XML{#eddtablefromfiles-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFrom...Files" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;nDimensions>...&lt;/nDimensions>  &lt;!-- This was used prior to ERDDAP™  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;version 1.30, but is now ignored. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromFiles subclasses, this uses Java's WatchDirectory system  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to notice new/deleted/changed files quickly and efficiently. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;standardizeWhat>](#standardizewhat)...&lt;/standardizeWhat> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;specialMode>*mode*&lt;/specialMode>  &lt;-- This rarely-used, OPTIONAL tag  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;can be used with EDDTableFromThreddsFiles to specify that special,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hard-coded rules should be used to determine which files should  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;be downloaded from the server. Currently, the only valid *mode*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is SAMOS which is used with datasets from  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;https://tds.coaps.fsu.edu/thredds/catalog/samos to download only the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files with the last version number. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrl>...&lt;/sourceUrl>  &lt;-- For subclasses like  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromHyraxFiles and EDDTableFromThreddsFiles, this is where  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;you specify the base URL for the files on the remote server.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For subclasses that get data from local files, ERDDAP™ doesn't use  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this information to get the data, but does display the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;information to users. So I usually use "(local files)". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileDir>...&lt;/fileDir> &lt;-- The directory (absolute) with the data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;recursive>true|false&lt;/recursive> &lt;!-- 0 or 1. Indicates if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;subdirectories of fileDir have data files, too. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileNameRegex>...&lt;/fileNameRegex> &lt;-- 0 or 1. A [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) describing valid data file names, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;".\\*\\.nc" for all .nc files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;metadataFrom>...&lt;/metadataFrom> &lt;-- The file to get metadata  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;from ("first" or "last" (the default) based on file's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lastModifiedTime). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;charset>...&lt;/charset>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- (For EDDTableFromAsciiFiles and EDDTableFromColumnarAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This OPTIONAL tag specifies the character set (case  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sensitive!) of the source files, for example, ISO-8859-1  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default) and UTF-8.  -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;skipHeaderToRegex>](#skipheadertoregex)...&lt;/skipHeaderToRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;skipLinesRegex>](#skiplinesregex)...&lt;/skipLinesRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;columnNamesRow>...&lt;/columnNamesRow> &lt;-- (For EDDTableFromAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This specifies the number of the row with the column  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;names in the files. (The first row of the file is "1".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Default = 1.)  If you specify 0, ERDDAP™ will not look for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;column names and will assign names: Column#1, Column#2, ... -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;firstDataRow>...&lt;/firstDataRow>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- (For EDDTableFromAsciiFiles and EDDTableFromColumnarAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This specifies the number of the first row with data in the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files. (The first row of the file is "1". Default = 2.) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dimensionsCSV>...&lt;/dimensionsCSV> &lt;-- (For EDDTableFromNcFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and EDDTableFromMultidimNcFiles only) This is a comma-separated  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;list of dimension fullNames. If specified, ERDDAP™ will only read  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;variables in the source files which use some or all of these  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dimensions, plus all of the scalar variables. If a dimension  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is in a group, you must specify its fullName,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e.g., "*groupName/dimensionName*". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- The next four tags are DEPRECATED. For more information, see  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[File Name Extracts](#filename-sourcenames). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;preExtractRegex>...&lt;/preExtractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;postExtractRegex>...&lt;/postExtractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;extractRegex>...&lt;/extractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;columnNameForExtract>...&lt;/columnNameForExtract>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sortedColumnSourceName>...&lt;/sortedColumnSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- The [sourceName](#sourcename) of the numeric column that the data files are  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;usually already sorted by within each file, for example, "time".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Don't specify this or use an empty string if no variable is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;suitable. It is ok if not all files are sorted by this column.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If present, this can greatly speed up some data requests.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDTableFromHyraxFiles, EDDTableFromNcFiles and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromThreddsFiles, this must be the leftmost (first) axis variable.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromMultidimNcFiles ignores this because it has a better  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;system. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sortFilesBySourceNames>...&lt;/sortFilesBySourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- This is a space-separated list of [sourceName](#sourcename)s  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;which specifies how the internal list of files should be sorted  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(in ascending order), for example "id time".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;It is the minimum value of the specified columns in each file  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;that is used for sorting.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;When a data request is filled, data is obtained from the files  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in this order. Thus it determines the overall order of the data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in the response.  If you specify more than one column name, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;second name is used if there is a tie for the first column; the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;third is used if there is a tie for the first and second  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;columns; ... This is OPTIONAL (the default is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fileDir+fileName order). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;false (the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheFromUrl>](#cachefromurl)...&lt;/cacheFromUrl> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheSizeGB>](#cachefromurl)...&lt;/cacheSizeGB> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- For EDDTableFromHyraxFiles, EDDTableFromMultidimNcFiles,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromNcFiles, EDDTableFromNccsvFiles, and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromThreddsFiles, the source's axis variables (for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;example, time) needn't be first or in any specific order. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromAsciiService{#eddtablefromasciiservice} 
[ **EDDTableFromAsciiService** ](#eddtablefromasciiservice)è essenzialmente un raschietto dello schermo. Si intende trattare con fonti di dati che hanno un semplice servizio web per la richiesta di dati (spesso un modulo HTML su una pagina web) e che può restituire i dati in qualche formato ASCII strutturato (per esempio, un formato di testo ASCII a valore di virgola o colonnare, spesso con altre informazioni prima e/o dopo i dati) .

EDDTableFromAsciiService è la superclasse di tutte le classi EDDTableFromAsciiService. Non è possibile utilizzare EDDTableFromAsciiService direttamente. Invece, utilizzare una sottoclasse di EDDTableFromAsciiService per gestire tipi specifici di servizi:

*   [EDDTableFromAsciiServiceNOS](#eddtablefromasciiservicenos)ottiene i dati daNOAAI servizi ASCII di NOS.

Attualmente non sono supportati altri tipi di servizio. Ma di solito è relativamente facile sostenere altri servizi se lavorano in modo simile. Contattaci se hai una richiesta.

#### Dettagli{#details} 
Le seguenti informazioni si applicano a tutte le sottoclassi di EDDTableFromAsciiService.

* Constraints --ERDDAP™le richieste di dati schedari possono mettere vincoli su qualsiasi variabile. Il servizio sottostante può o non può consentire vincoli su tutte le variabili. Per esempio, molti servizi supportano solo vincoli sui nomi delle stazioni, latitudine, longitudine e tempo. Così quando una sottoclasse di EDDTableFromAsciiService ottiene una richiesta di un sottoinsieme di un dataset, passa il maggior numero possibile di vincoli al servizio dati sorgente e quindi applica i restanti vincoli ai dati restituiti dal servizio, prima di consegnare i dati all'utente.
* Gamma valida -- A differenza di molti altri tipi di dataset, EDDTableFromAsciiService di solito non conosce la gamma di dati per ogni variabile, in modo da non poter rifiutare rapidamente le richieste di dati al di fuori della gamma valida.
* Parsing the ASCII Text Response -- Quando EDDTableFromAsciiService riceve una risposta da un servizio di testo ASCII, deve convalidare che la risposta ha il formato e le informazioni attesi, e poi estrarre i dati. È possibile specificare il formato utilizzando vari tag speciali nel blocco di XML per questo set di dati:
    *   &lt;prima di Data1&gt; attraverso&lt;primaData10&gt; tags -- È possibile specificare una serie di pezzi di testo (quante ne vuoi, fino a 10) che EDDTableFromAsciiService deve cercare nell'intestazione del testo ASCII restituito dal servizio con&lt;prima di Data1&gt; attraverso&lt;prima diData10&gt;. Ad esempio, questo è utile per verificare che la risposta include le variabili attesi utilizzando le unità attesi. L'ultimo tag precedenteData che si specifica identifica il testo che si verifica prima dell'avvio dei dati.
    *   &lt;dopoData&gt; -- Questo specifica il testo che EDDTableFromAsciiService cercherà nel testo ASCII restituito dal servizio che significa la fine dei dati.
    *   &lt;No. -- Se EDDTableFromAsciiService trova questo testo nel testo ASCII restituito dal servizio, si conclude che non ci sono dati che corrispondono alla richiesta.
#### EDDTableFromAsciiService scheletro XML{#eddtablefromasciiservice-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromAsciiService..." [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrl>...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;beforeData1>...&lt;beforeData1> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;beforeData10>...&lt;beforeData10> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;afterData>...&lt;afterData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;noData>...&lt;noData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromAsciiServiceNOS{#eddtablefromasciiservicenos} 
[ **EDDTableFromAsciiServiceNOS** ](#eddtablefromasciiservicenos)rende i set di dati EDDTable dai servizi di dati di testo ASCII offerti daNOAA'[Servizio Oceano Nazionale (NOS) ](https://oceanservice.noaa.gov/). Per informazioni su come funziona questa classe e come usarla, vedere la superclasse di questa classe[EDDTableFromAsciiService](#eddtablefromasciiservice). È improbabile che chiunque altro che Bob Simons abbia bisogno di usare questa sottoclasse.

Poiché i dati all'interno della risposta da un servizio NOS utilizzano un formato di testo colonnare ASCII, le variabili di dati diverse da latitudine e longitudine devono avere un attributo speciale che specifica quali caratteri di ogni linea di dati contengono i dati della variabile, ad esempio,
```
<att name="responseSubstring">17, 25</att>  
```
 
### EDDTableFromAllDatasets{#eddtablefromalldatasets} 
[ **EDDTableFromAllDatasets** ](#eddtablefromalldatasets)è un dataset di livello superiore che ha informazioni su tutti gli altri set di dati che sono attualmente caricati nel vostroERDDAP. A differenza di altri tipi di dataset, non vi è alcuna specifica per ilallDatasetsdataset indatasets.xml.ERDDAP™crea automaticamente un EDDTableFromAllDatasets dataset (condatasetID=allDatasets) . Così, unallDatasetsdataset sarà creato in ogniERDDAP™installazione e funzionerà allo stesso modo in ciascunoERDDAP™installazione.

TheallDatasetsdataset è un set di dati tabulari. Ha una riga di informazioni per ogni dataset. Ha colonne con informazioni su ogni dataset, ad esempio,datasetID, accessibile, istituzione, titolo, minLongitude, maxLongitude, minLatitudine, maxLatitude, minTime, maxTime, ecc. Perché?allDatasetsè un dataset tabulare, è possibile query lo stesso modo in cui è possibile query qualsiasi altro set di dati tabulari inERDDAP™, e è possibile specificare il tipo di file per la risposta. Questo consente agli utenti di cercare set di dati di interesse in modi molto potenti.
 
### EDDTableFromAsciiFiles{#eddtablefromasciifiles} 
[ **EDDTableFromAsciiFiles** ](#eddtablefromasciifiles)aggrega i dati dai file di dati tabulari ASCII virgola-, tab-, semicolon- o separati dallo spazio.

* Il più delle volte, i file avranno nomi di colonne sulla prima riga e dati a partire dalla seconda riga. (Qui, la prima riga del file è chiamata numero di riga 1.) Ma puoi usare&lt;colonnaNamesRow&gt; e&lt;primoDataRow&gt; nel tuodatasets.xmlfile per specificare un numero di riga diverso.
*   ERDDAP™consente alle righe di dati di avere diversi numeri di valori di dati.ERDDAP™presuppone che i valori di dati mancanti siano le colonne finali della riga.ERDDAP™assegna i valori di valore mancanti standard per i valori di dati mancanti. (aggiunto v1.56) 
* I file ASCII sono facili da lavorare, ma non sono il modo più efficiente per memorizzare / recuperare i dati. Per una maggiore efficienza, salvare i file comeNetCDFV.ncfile (con una dimensione, "row", condivisa da tutte le variabili) Invece. Puoi[usoERDDAP™per generare i nuovi file](#millions-of-files).
* Vedi la superclasse di questa classe,[EDDTableFromFiles](#eddtablefromfiles), per informazioni su come funziona questa classe e come usarla.
* Si consiglia vivamente di utilizzare[Generare i dati Programma Xml](#generatedatasetsxml)per fare una bozza ruvida deldatasets.xmlchunk per questo dataset. A causa della totale mancanza di metadati nei file ASCII, è sempre necessario modificare i risultati di GenerateDatasetsXml.
* ATTENZIONE: QuandoERDDAP™legge i file di dati ASCII, se trova un errore su una determinata linea (ad esempio, numero errato di articoli) , registra un messaggio di avviso (" ATTENZIONE: Bad line (#) di dati" ... con un elenco delle linee sbagliate su linee successive) al[file log.txt](/docs/server-admin/additional-information#log)e poi continua a leggere il resto del file di dati. Così, è vostra responsabilità guardare periodicamente (o scrivere uno script per farlo) per quel messaggio nel registro. txt in modo da poter risolvere i problemi nei file di dati.ERDDAP™è impostato in questo modo in modo che gli utenti possono continuare a leggere tutti i dati validi disponibili anche se alcune linee del file hanno difetti.
     
### EDDTEDD OhsXmlFiles{#eddtablefromawsxmlfiles} 
[ **EDDTEDD OhsXmlFiles** ](#eddtablefromawsxmlfiles)aggrega i dati da un insieme di Stazione Meteo Automatica (AWS) File di dati XML utilizzando l'API XML di WeatherBug Rest (non più attivo) .

* Questo tipo di file è un modo semplice ma inefficiente per memorizzare i dati, perché ogni file di solito sembra contenere l'osservazione da un solo punto di tempo. Quindi ci può essere un gran numero di file. Se si desidera migliorare le prestazioni, considerare il consolidamento di gruppi di osservazioni (Una settimana vale?) inNetCDFV.ncfile (meglio:.ncfile con[CFU Geometrie di smorzamento discreto (DSG) Formato di Array Ragged Contiguous](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)) e utilizzando[EDDTableFromMultidimNcFiles](#eddtablefrommultidimncfiles)  (o[EDDTableFromNcCFFiles](#eddtablefromnccffiles)) per servire i dati. Puoi[usoERDDAP™per generare i nuovi file](#millions-of-files).
* Vedi la superclasse di questa classe,[EDDTableFromFiles](#eddtablefromfiles), per informazioni su come funziona questa classe e come usarla.
     
### EDDTableFromColumnarAsciiFiles{#eddtablefromcolumnarasciifiles} 
[ **EDDTableFromColumnarAsciiFiles** ](#eddtablefromcolumnarasciifiles)aggrega i dati dai file di dati tabular ASCII con colonne di larghezza fissa.

* Il più delle volte, i file avranno nomi di colonne sulla prima riga e dati a partire dalla seconda riga. La prima riga / riga nel file è chiamata riga #1. Ma puoi usare&lt;colonnaNamesRow&gt; e&lt;primoDataRow&gt; nel tuodatasets.xmlfile per specificare un numero di riga diverso.
* The&lt;addAttributes&gt; per ciascuno&lt;dataVariable&gt; per questi set di dati DEVE includere questi due attributi speciali:
    
    *   &lt;at name="startColumn"&gt; *Integro* &lt;att&gt; -- specifica la colonna del carattere in ogni riga che è l'inizio di questa variabile di dati.
    *   &lt;int name="stopColumn"&gt; *Integro* &lt;att&gt; -- specifica la colonna del carattere in ogni riga che è la 1 dopo la fine di questa variabile di dati.
    
La prima colonna del carattere è chiamata colonna #0.
Per esempio, per questo file che ha valori temporali abutting valori di temperatura:
```
      0         1         2        <-- character column number 10's digit
      0123456789012345678901234567 <-- character column number 1's digit
      time                temp
      2014-12-01T12:00:00Z12.3
      2014-12-02T12:00:00Z13.6
      2014-12-03T12:00:00Z11.0
```
la variabile di dati di tempo avrebbe
```
      <att name="startColumn">0<att>  
      <att name="stopColumn">20<att>  
```
e la variabile di dati di tempo avrebbe
```
      <att name="startColumn">20<att>  
      <att name="stopColumn">24<att>  
```
Questi attributi devono essere specificati per tutte le variabili tranne[valore fisso](#fixed-value-sourcenames)e[nome file-source-nomi](#filename-sourcenames)variabili.
* I file ASCII sono facili da lavorare, ma non sono un modo efficiente per memorizzare / recuperare i dati. Per una maggiore efficienza, salvare i file comeNetCDFV.ncfile (con una dimensione, "row", condivisa da tutte le variabili) Invece. Puoi[usoERDDAP™per generare i nuovi file](#millions-of-files).
* Vedi la superclasse di questa classe,[EDDTableFromFiles](#eddtablefromfiles), per informazioni su come funziona questa classe e come usarla.
* Si consiglia vivamente di utilizzare[Generare i dati Programma Xml](#generatedatasetsxml)per fare una bozza ruvida deldatasets.xmlchunk per questo dataset. A causa della difficoltà di determinare le posizioni di avvio e di fine per ogni colonna di dati e la totale mancanza di metadati nei file ASCII, è sempre necessario modificare i risultati da GenerateDatasetsXml.
     
### EDDTableDaHttpGet{#eddtablefromhttpget} 
EDDTable FromHttpGet è diverso da tutti gli altri tipi di dataset inERDDAP™in quanto dispone di un sistema in cui specifici "autori" possono aggiungere dati, rivedere i dati, o eliminare i dati dal dataset da regolariHTTP GETo[POST](#http-post)richieste da un programma per computer, uno script o un browser. Il dataset è queryable dagli utenti nello stesso modo in cui tutti gli altri set di dati EDDTable sono queryable inERDDAP. Vedi la descrizione della superclasse di questa classe,[EDDTableFromFiles](#eddtablefromfiles), per leggere le caratteristiche che vengono ereditate da quella superclasse.

Le caratteristiche uniche di EDDTableFromHttpGet sono descritte di seguito. È necessario leggere tutta questa sezione iniziale e comprenderla; altrimenti, si possono avere aspettative irrealistiche o mettersi nei guai che è difficile da risolvere.

#### Uso intenso{#intended-use} 
Questo sistema è destinato a:

* Tabella (in situ) dati, non dati grigliati.
* Dati in tempo reale -
L'obiettivo è quello di consentire un autore (ad esempio, il sensore, uno script QC automatizzato o uno specifico umano) per modificare il dataset (tramite un[.insert o comando .delete](#insert-and-delete)) e rendere tale cambiamento accessibileERDDAP™utenti, tutto in meno di 1 secondo, e possibilmente molto più veloce. La maggior parte di questo 1 secondo è l'ora della rete.ERDDAP™può elaborare la richiesta in circa 1 ms e i dati sono immediatamente accessibili agli utenti. Questo è[veloce](#httpget-speed)♪[robusto](#robust)e[sistema affidabile](#system-reliability).
* Quasi qualsiasi frequenza di dati -
Questo sistema può accettare dati non frequenti (ad esempio, ogni giorno) attraverso dati molto frequenti (ad esempio, dati 100 Hz) . Se si ottimizza il sistema, può gestire i dati di frequenza superiore (forse 10 KHz dati se si va agli estremi) .
* Dati da un sensore o una raccolta di sensori simili.
*   [Versione](#versioning)/[Scienza reproducibile](https://en.wikipedia.org/wiki/Reproducibility)/DOIS...
Situazioni in cui è necessario essere in grado di apportare modifiche ai dati (ad esempio, cambiare una bandiera di controllo di qualità) , sapere quale autore ha fatto ogni cambiamento, conoscere il timestamp di quando l'autore ha fatto il cambiamento, e (su richiesta) essere in grado di vedere i dati originali prima della modifica è stato fatto. Pertanto, questi set di dati sono idonei per[DOI#](https://en.wikipedia.org/wiki/Digital_object_identifier). perché incontranoDOIrequisito che il dataset non si muova, tranne per aggregazione. In generale, nei pressi di dataset in tempo reale non sono ammissibili perDOIs perché i dati sono spesso retroattivamente modificati (ad esempio, per scopi QA/QC) .
     

Una volta che i dati sono in un dataset EDDTableFromHttpGet, qualsiasi utente può richiedere i dati nello stesso modo in cui richiedono i dati da qualsiasi altro dataset EDDTable.
     
#### Sperimentale: Attenzione{#experimental-be-careful} 
Poiché questo sistema è nuovo e poiché i dati ambientali persi non possono essere recuperati, si dovrebbe trattare EDDTableFromHttpGet come sperimentale. Se si sta passando da un altro sistema, si prega di eseguire il vecchio sistema e il nuovo sistema in parallelo fino a quando si è sicuri che il nuovo sistema funziona bene (settimane o mesi, non solo ore o giorni) . In tutti i casi, assicurarsi che il sistema archivia separatamente gli URL .insert e .delete che vengono inviati al dataset EDDTableFromHttpGet (anche se solo nei registri di Apache e/o Tomcat) Almeno per un po'. E in tutti i casi, assicurarsi che i file di dati creati dal dataset EDDTableFromHttpGet siano regolarmente supportati da dispositivi di archiviazione dati esterni. (Nota:[r](https://en.wikipedia.org/wiki/Rsync). può eseguire il backup dei file di dati creati da EDDTableFromHttpGet molto efficiente.)   
     
#### .inserto e .delete{#insert-and-delete} 

Per qualsiasi dataset inERDDAP™quando invii una richiestaERDDAP™per un sottoinsieme dei dati in un dataset, specificare il tipo di file che si desidera per la risposta, ad esempio, .csv,.htmlTable♪.nc♪.json. EDDTableDaHttp Ottenere estende questo sistema per supportare due ulteriori "file type" che possono inserire (o cambiamento) o eliminare i dati nel set di dati:

* .inserzione
    * La richiesta è formattata come una risposta standard del modulo HTML, con coppie key=value, separate da '&'. Per esempio,
         https://*some.erddap.url*/erddap/tabledap/myDataset**.insert**?stationID=46088&time=2016-03-30T12:37:55Z&latitude=10.1&longitude=-150.1&airTemp=17.23&waterTemp=12.3&author=JohnSmith\\_someKey1   
diceERDDAP™per aggiungere o modificare i dati perstationID=46088 per il tempo specificato.
    * L'autore di questo cambiamento è JohnSmith e la chiave è SomeKey1.
    * L'URL deve includere valori validi (valori non mancanti) per tutti[httpOttenere necessarioVariables](#httpgetrequiredvariables-global-attribute)
    * Se i valori delhttpOttenere richiesto Variabili nella richiesta (ad esempio,stationIDe il tempo) corrispondere i valori su una riga già nel dataset, i nuovi valori in modo efficace sovrascrivere i valori vecchi (anche se i valori vecchi sono ancora accessibili se l'utente richiede dati da un precedente[versione](#versioning)del set di dati) .
    * L'URL .insert non deve mai includere &timestamp= (ERDDAP™genera quel valore) o &amp; quot; (che è specificato da .insert (che è il comando=0) o .delete (che è il comando= 1) ) .
    * Se l'URL .insert non specifica i valori per altre colonne che sono nell'set dati, si presume che siano i valori mancanti nativi (MAX\\_VALUE per tipi di dati interi, NaN per galleggianti e doppie, e "" per archi) .
             
    * .
        * La richiesta è formattata come una risposta standard del modulo HTML, con coppie key=value, separate da '&'. Per esempio,
             https://*some.erddap.url*/erddap/tabledap/myDataset**.delete**?stationID=46088&time=2016-03-30T12:37:55Z&author=JohnSmith\\_someKey1   
diceERDDAP™cancellare i dati perstationID=46088 al momento specificato.
        * L'autore di questo cambiamento è JohnSmith e la chiave è SomeKey1.
        * L'URL deve specificare[httpOttenere necessarioVariables](#httpgetrequiredvariables-global-attribute)nella richiesta (ad esempio,stationIDe il tempo) . Se questi valori corrispondono ai valori su una riga già nel dataset (che di solito saranno) , i valori vecchi vengono eliminati efficacemente (anche se i valori vecchi sono ancora accessibili se un utente richiede dati da un precedente[versione](#versioning)del set di dati) .
        * Non è necessario specificare i valori per non-HttpGetRequiredVariables, diverso dall'autore, che è necessario per autenticare la richiesta.
             
    
Dettagli:
    * .insert e .delete le richieste sono formattate come risposte standard del modulo HTML, con coppie key=value, separate da '&'. I valori devono essere[per cento codificato](https://en.wikipedia.org/wiki/Percent-encoding). Così, è necessario codificare caratteri speciali nella forma %HH, dove HH è il valore esadecimale 2 cifre del carattere. Di solito, è sufficiente convertire alcuni dei caratteri di punteggiatura: % in %25, & in %26, " in %22,&lt;in %3C, = in %3D, &gt; in %3E, + in %2B,|in %7C,\\[in %5B,\\]in %5D, spazio in %20, e convertire tutti i caratteri sopra #127 nella loro forma UTF-8 e quindi per cento codificare ogni byte del modulo UTF-8 nel formato %H (chiedere aiuto a un programmatore) .
    * .insert e .delete le richieste devono includere[httpOttenere necessarioVariables](#httpgetrequiredvariables-global-attribute)Per esempio,stationIDe il tempo. Per le richieste .insert, si presume che le variabili non specificate nella richiesta siano valori mancanti (MAX\\_VALUE per le variabili integer, NaN per le variabili float e doppie, e una stringa vuota per le variabili di stringa) . Per richieste .delete, valori per non-HttpGetRequired Variabili (diverso dall'autore, che è richiesto) sono ignorati.
    * .insert e .delete le richieste devono includere il nome dell'autore e la chiave dell'autore tramite un parametro nel form author= *autore* come ultimo parametro nella richiesta. Richiedendo questo per essere ultimo assicura che l'intera richiesta è stata ricevuta daERDDAP. Solo l'autore (non la chiave) verrà memorizzato nel file di dati. È necessario specificare l'elenco dei permessi *autore* 's tramite l'attributo globale[httpGetKeys](#httpgetkeys)
    * .insert e .delete parametri possono essere scalari (singolo) valori o array di qualsiasi lunghezza nel modulo\\[valore1,valore2,valore3,...,valoreN\\]. Per una determinata richiesta, tutte le variabili con array devono avere array con lo stesso numero di valori (altrimenti è un errore) . Se una richiesta ha valori scalari e array, i valori scalari vengono replicati per diventare array con la stessa lunghezza degli array specificati, ad esempio, &stationID= 46088 potrebbe essere trattato come &amp;stationID=\\[46088,46088,46088\\]. Arrays sono la chiave per[alto rendimento](#httpget-speed). Senza array, sarà difficile per .insert o .delete più di 8 righe di dati al secondo da un autore remoto (a causa di tutta la testata della rete) . Con array, sarà facile da .insert o .delete più di 1000 righe di dati al secondo da un sensore remoto.
    * .insert e .delete accettano (senza un messaggio di errore) numeri di punti fluttuanti quando sono previsti interi. In questi casi, il dataset completa i valori degli interi.
    * .insert e .delete accettano (senza un messaggio di errore) numeri di punti interi e fluttuanti che sono fuori gamma del tipo di dati della variabile. In questi casi, il dataset memorizza i valori comeERDDAPvalori nativi mancanti per quel tipo di dati (MAX\\_VALUE per tipi interi e NaN per galleggianti e doppie) .
         
#### Risposta{#response} 
Se l'URL .insert o .delete riesce, il codice di risposta HTTP sarà 200 (Ok.) e la risposta sarà il testo con un.jsonoggetto, ad esempio,
```
    {
    "status":"success",
    "nRowsReceived":1,
    "stringTimestamp":"2018-11-05T22:12:19.517Z",
    "numericTimestamp":1.541455939517+E9
    }
```
Si noti che i timestamp hanno precisione di millisecondo.

Se l'URL .insert o .delete non riesce, otterrete un codice di risposta HTTP diverso da 200 (Ok.) , ad esempio, Errore 403 Proibiti se invii un valore non corretto dell'autore\\_key.ERDDAP™invia il codice di risposta HTTP (no, ad esempio,.jsonerrore formattato) perché è così che le cose vengono fatte in internet e perché gli errori possono verificarsi ovunque nel sistema (ad esempio, nella rete, che restituisce un errore HTTP) . Se l'errore viene daERDDAP™, la risposta può includere qualche testo (non.json) con una spiegazione più dettagliata di ciò che è andato storto, ma il codice di risposta HTTP (200=Okay, qualsiasi altro problema) è il modo corretto per verificare se il .insert o .delete è riuscito. Se il controllo del codice di risposta HTTP non è possibile o è scomodo, cercare "status":"successo" nel testo di risposta che dovrebbe essere un'indicazione affidabile di successo.
    
#### File di registro{#log-files} 
Quando EDDTableFromHttpGet riceve comandi .insert e .delete, semplicemente aggiunge le informazioni al file relativo in un insieme di file di registro, ognuno dei quali è una tabella memorizzata in un[JSON Linee file CSV](https://jsonlines.org/examples/). Quando un utente effettua una richiesta di dati,ERDDAP™legge rapidamente i relativi file di registro, applica le modifiche al dataset nell'ordine che sono stati fatti, e quindi filtra la richiesta tramite vincoli dell'utente come qualsiasi altroERDDAP™richiesta di dati. La partizionamento dei dati in vari file di registro, la memorizzazione di vari pezzi di informazioni (ad esempio, il timestamp del comando, e se il comando era .insert o .delete) , e vari aspetti della configurazione del dataset, tutto rende possibile perERDDAPper memorizzare i dati e recuperare i dati da questo dataset molto rapidamente e molto efficiente.
     
#### Sicurezza e Autore{#security-and-author} 
Ogni comando .insert e .delete deve includere &author= *autore* come ultimo parametro, dove autore\\_key è composto dall'identificatore dell'autore (hai scelto: nome, iniziali, pseudonimo, numero) Una chiave segreta. TheERDDAP™l'amministratore lavorerà con gli autori per generare l'elenco dei valori validi dell'autore\\_key, che possono essere modificati in qualsiasi momento.
Quando EDDTableFromHttpGet riceve un comando .insert o .delete, si assicura che l'autoreID\\_key sia l'ultimo parametro e valido. Poiché è l'ultimo parametro, indica che l'intera riga di comando ha raggiuntoERDDAP™e non era troncato. La chiave segreta assicura che solo gli autori specifici possano inserire o eliminare i dati nel dataset.ERDDAP™poi estrae l'autoreID e salva che nella variabile dell'autore, in modo che chiunque possa vedere chi è stato responsabile di una data modifica al dataset.
I comandi .insert e .delete possono essere effettuati solo tramitehttps:  (sicuro)  ERDDAP™URLs. Ciò assicura che le informazioni trasferite siano tenute segrete durante il transito.
     
#### timestamp{#timestamp} 
Come parte del sistema di log, EDDTableFromHttpGet aggiunge un timestamp (il tempo cheERDDAPricevuto la richiesta) a ogni comando che memorizza nei file di registro. Perché?ERDDAP™genera il timestamp, non gli autori, non importa se diversi autori stanno facendo cambiamenti da computer con orologi impostati a tempi leggermente diversi. Il timestamp indica in modo affidabile il momento in cui il cambiamento è stato fatto al dataset.
     
#### HTTP POST{#http-post} 
*   ["E HTTP POST?&#33;"](#http-post)  
HTTP[POST](https://en.wikipedia.org/wiki/POST_(HTTP)) è l'alternativa migliore (rispetto aHTTP GET) per l'invio di informazioni da un client a un server HTTP. Se è possibile, o se si desidera davvero migliorare la sicurezza, utilizzare POST invece di GET per inviare le informazioni aERDDAP. POST è più sicuro perché: con GET ehttps, l'URL viene trasmesso in modo sicuro, ma l'intero URL (compresi i parametri, compreso l'autore\\_key) sarà scritto a Apache, Tomcat, eERDDAP™file di registro, dove qualcuno potrebbe leggerli se i file non sono adeguatamente protetti. Con POST, i parametri vengono trasmessi in modo sicuro e non sono scritti ai file di registro. POST è un po 'più difficile per i clienti di lavorare con e non è supportato come ampiamente dal software client, ma i linguaggi di programmazione lo supportano. Il contenuto che si invia al dataset tramite GET o POST sarà lo stesso, appena formattato in modo diverso.
     
#### httpOttenere richiesto Attributo globale variabili{#httpgetrequiredvariables-global-attribute} 
Una parte essenziale di ciò che rende il lavoro di questo sistema è l'attributo globale richiestohttpOttenere richiesto Variabili, che è un elenco separato da virgoladataVariablenomi sorgente che identificano in modo univoco una riga di dati. Questo dovrebbe essere il più minimo possibile e quasi sempre includerà la variabile di tempo. Per esempio, ecco i consigliatihttpOttenere richiesto Variabili per ciascuno dei[CFU Geometrie di smorzamento discreto (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)  (Naturalmente, i nomi ID possono essere diversi nel vostro set di dati.) :

* Per il TimeSeries:stationID♪
* Per la traiettoria: traiettoriaID, tempo
* Per il profilo: tempo (il tempo di assumere è il profilo\\_id) , profondità
* Per il tempo Profilo:stationID♪ (il tempo di assumere è il profilo\\_id) , profondità
* Per la traiettoria Profilo: trajectoryID, time (il tempo di assumere è il profilo\\_id) , profondità

    
Prendere TimeSeries come esempio:
Data un comando .insert che includestationID=46088 e ora=2016-06-23T19:53:00Z (e altri valori per altre variabili) :
* Se non ci sono dati esistenti per quella stazione e quella volta, l'effetto sarà quello di aggiungere i dati al dataset.
* Se ci sono dati esistenti per quella stazione e quella volta, l'effetto sarà quello di sostituire la riga esistente di dati con questi nuovi dati. (Certo, da quandoERDDAP™mantiene il registro di ogni comando che riceve, i vecchi dati sono ancora nel registro. Se un utente richiede dati da una versione del dataset prima di questa modifica, vedranno i dati precedenti.)   
         
#### httpOttieni la Struttura delle Direttive{#httpgetdirectorystructure} 
*   [httpOttenere la direzione Struttura Attributi globali e dati (Log) Nome di file](#httpgetdirectorystructure)  
Parte di ciò che rende l'intero sistema funziona in modo efficiente è cheERDDAP™crea un insieme di dati (registro) file, ciascuno con un pezzo diverso del dataset. Se queste sono impostate bene,ERDDAP™sarà in grado di rispondere rapidamente alla maggior parte delle richieste di dati. Questa configurazione è specificata dalhttpGetDirectoryStructure attributo globale, che è uno String che sembra un nome relativo di file, ad esempio, "stationID/10years", ma è in realtà una specifica per la struttura della directory. Le parti di ciò indicano come directory e nomi di file per i dati (registro) i file saranno costruiti.
    
    * Se una parte è un intero (&gt;= 1) più un tempoPeriod (millisecondo, secondo, minuto, ora, data, mese, anno, o loro plurali) , ad esempio, 10 anni, quindi il dataset EDDTableFromHttpGet prenderà il valore del tempo per la riga dei dati (ad esempio, 2016-06-23T19:53:00Z) , calcolare il tempo troncato a quella precisione (ad esempio, 2010) , e fare una cartella o fileName da quello.
        
L'obiettivo è quello di ottenere un pezzo ragionevolmente grande di dati in ogni file, ma molto meno di 2GB.
        
    * In caso contrario, la parte delle specifiche deve essere unadataVariable'sourceNamePer esempio,stationID. In questo caso, EDDTableFromHttpGet farà una cartella o un nome file dal valore di quella variabile per la nuova riga di dati (ad esempio, "46088") .
    
Poiché i dati di comando .insert e .delete vengono memorizzati in dati specifici (registro) file, EDDTableFromHttpGet di solito ha solo bisogno di aprire uno o pochi dati (registro) file per trovare i dati per una determinata richiesta utente. E perché ogni dato (registro) file ha tutte le informazioni pertinenti per il suo pezzo del dataset, è veloce e facile per EDDTableFromHttpGet per fare una versione specifica (o la versione corrente) del dataset per i dati in quel file (e non devono generare la versione richiesta dell'intero dataset) .
    
Le linee guida generali si basano sulla quantità e la frequenza dei dati. Se assumiamo 100 byte per riga di dati, allora...
``` 
    | Frequency  <br>of measurements | Recommended  <br>httpGetDirectoryStructure |
    | --- | --- |
    | \\>=1 per second | *featureID*/1year/1day |
    | \\>=1 per minute | *featureID*/2months |
    | \\>=1 per hour | *featureID*/10years |
    | \\>=1 per day | *featureID* |
```
Ad esempio, se la struttura della directory èstationID/2 mesi e si inserisce i dati da due stazioni (46088 e 46155) con i valori di tempo da dicembre 2015 a maggio 2016, EDDTableFromHttp Get creerà directory di nome 46088 e 46155 e creerà file in ogni nome 2015-11.jsonl, 2016-01.jsonl, 2016-03.jsonl, 2016-05.jsonI (ogni possesso di 2 mesi di dati per la stazione rilevante) . In qualsiasi momento in futuro, se si utilizza .insert o .delete per modificare o eliminare i dati per, ad esempio, stazione 46088 al 2016-04-05T14:45:00Z, EDDTableFromHttp Get appenderà quel comando a 46088/2016-03.jsonl, i dati pertinenti (registro) file. E chiaramente, è bene aggiungere i dati per altre stazioni in qualsiasi momento in futuro, dal momento che il dataset sarà semplicemente creare directory aggiuntive se necessario per tenere i dati dalle nuove stazioni.
    
#### httpGetKeys{#httpgetkeys} 
Ogni EDDTable Da parte sua Ottenere dataset deve avere un attributo globalehttpGetKeys che specifica l'elenco degli autori consentiti e le loro chiavi segrete come una lista separata da virgole *autore* Per esempio, JohnSmith\\_someKey1, HOBOLogger\\_someKey2, QCScript59\\_someKey3 .
* autore\\_key sono casi-sensibili e devono essere completamente caratteri ASCII (#33 - #126, e senza virgola, " o ' caratteri
* Le chiavi sono come password, quindi devono essere &gt;=8 caratteri, difficili da indovinare, e senza parole del dizionario interno. Dovresti trattarli come trattare le password -- tenerle private.
* Il primo carattere '\\_' separa l'autore dalla chiave, quindi il nome dell'autore non può includere un carattere '\\_' (ma una chiave può) .
* Qualsiasi autore può avere uno o più autori\\_key, ad esempio, JohnSmith\\_some Key1, JohnSmith\\_some Key7, ecc.
* È possibile modificare il valore di questo attributo in qualsiasi momento. Le modifiche hanno effetto la prossima volta che il dataset viene caricato.
* Queste informazioni saranno rimosse dal datoset globaleAttributi prima che venga reso pubblico.
* Ogni richiesta al set di dati per inserire o eliminare i dati deve includere un &author= *autore* parametro. Dopo aver verificato la validità della chiave,ERDDAP™salva solo la parte dell'autore (non la chiave) nel file di dati.

#### Impostazione{#set-up} 

Ecco i passaggi consigliati per configurare un set di dati EDDTableFromHttpGet:

1. Fare la directory principale per tenere i dati di questo dataset. Per questo esempio, usiamo /data/testGet/ . L'utente che esegue GenerateDatasetsXml e l'utente in esecuzioneERDDAP™devono entrambi avere accesso lettura-scrittura a questa directory.
     
2. Utilizzare un editor di testo per fare un campione.jsonil file CSV con l'estensione.jsonL in quella directory.
Il nome non è importante. Per esempio, si potrebbe chiamare campione.jsonI
Fare una linea 2.jsonl file CSV, con i nomi delle colonne sulla prima riga e i valori fittizi/tipici (del corretto tipo di dati) sulla seconda linea. Ecco un file campione che è adatto per una raccolta difeatureType=TempoRicerca i dati che misurano la temperatura dell'aria e dell'acqua.
    \\[PerfeatureType=Traiettoria, potresti cambiarestationIDessere traiettoriaID.\\]  
    \\[PerfeatureType=Profilo, potresti cambiarestationIDper essere profileID e aggiungere una variabile di profondità.\\]
    
    \\["stationID""time", "latitude", "longitude", "airTemp", "waterTemp", "timestamp", "author", "command"\\]
    \\["myStation", "2018-06-25T17:00:00Z", 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, "SomeBody", 0\\]
    
Nota:
    * I valori di dati reali non importa perché alla fine cancellerai questo file, ma dovrebbero essere del tipo di dati corretto. In particolare, la variabile di tempo dovrebbe utilizzare lo stesso formato che i dati reali dalla fonte utilizzeranno.
    * Per tutte le variabili,sourceNamesarà ugualedestinationName, quindi utilizzare i nomi variabili corretti / finali ora, tra cui tempo, latitudine, longitudine e talvolta profondità o altitudine se le variabili con tali informazioni saranno incluse.
    * Ci sarà quasi sempre una variabile tempo di nome che registra il tempo dell'osservazione è stato fatto. Può essere dataType String con[unità adatta per tempi di stringa](#string-time-units)  (ad esempio,yyyy-MM-dd'T'HH:mm:ss.SSSZ) o dati Tipo doppio con[unità adatta per tempi numerici](#time-units)  (ad esempio, secondi dal 1970-01-01T00:00:00Z, o qualche altro tempo base) .
    * Tre delle colonne (di solito gli ultimi tre) deve essere timestamp, autore, comando.
    * La colonna timestamp verrà utilizzata da EDDTableFromHttpGet per aggiungere un timestamp che indica quando ha aggiunto una data linea di dati al file di dati. Avrà datiTipo doppio e unità secondi dal 1970-01-01T00:00:00Z.
    * La colonna dell'autore con i datiType String sarà utilizzata per registrare quale autore autorizzato ha fornito i dati di questa linea. Gli autori autorizzati sono specificati da[httpattributo globale GetKeys](#httpgetkeys). Anche se le chiavi sono specificate come *autore* e sono nell'URL "richiesta" in quel modulo, solo la parte dell'autore viene salvata nel file di dati.
    * La colonna di comando con dataType byte indica se i dati su questa linea sono un'inserzione (0) o una cancellazione (1) .
         
3. Eseguire GenerateDatasets Xml e dillo
    
    1. Il tipo di set di dati è EDDTableFromHttpGet
    2. La directory è (per questo esempio) / dati/test Vai&#33;
    3. Il file campione è (per questo esempio) /dati/testGet/startup.jsonI
    4. ThehttpOttenere richiesto Variabili sono (per questo esempio)  stationID♪ Vedi la descrizione[httpOttenere necessarioVariables](#httpgetrequiredvariables-global-attribute)sotto.
    5. Se i dati vengono raccolti ogni 5 minuti, ilhttpGetDirectoryStructure per questo esempio èstationID/2 mesi. Vedi la descrizione[httpOttieni la Struttura delle Direttive](#httpgetdirectorystructure)sotto.
    6. The[httpGetKeys](#httpgetkeys)
    
Aggiungi l'output (il pezzo didatasets.xmlper il dataset) adatasets.xml.
     
4. Modificadatasets.xmlchunk per questo set di dati per renderlo corretto e completo.
Precisamente, sostituire tutto il??? con il contenuto corretto.
     
5. Per il&lt;fileTableInMemory&gt; impostazione:
    * Impostare questo a true se il dataset di solito ottiene frequenti richieste .insert e/o .delete (ad esempio, più spesso di una volta ogni 10 secondi) . Questo aiuta EDDTableFromHttpGet rispondere più velocemente alle richieste .insert e/o .delete. Se si imposta questo a true, EDDTableFromHttpGet salverà ancora il fileTable e le informazioni relative al disco periodicamente (come necessario, circa ogni 5 secondi) .
    * Metti questo al falso (il default) se il dataset di solito riceve richieste di infrequenza .insert e/o .delete (ad esempio, meno di una volta ogni 10 secondi) .
         
6. Nota: È possibile usare&lt;cacheFromUrl&gt; e impostazioni correlate indatasets.xmlper EDDTable Da parte sua Ottenere set di dati come un modo per fare e mantenere una copia locale di un remoto EDDTableFromHttpGet dataset su un altroERDDAP. Tuttavia, in questo caso, questo dataset locale respingerà qualsiasi richiesta .insert e .delete.

#### Utilizzo di EDDTable DaHttpGet Datasets{#using-eddtablefromhttpget-datasets} 

* Gli autori possono fare "richiesta" che[inserire i dati o eliminare i dati dal dataset](#insert-and-delete).
     
* Dopo che i dati reali sono stati inseriti nel dataset, è possibile eliminare il file di dati del campione originale.
     
* Gli utenti possono richiedere i dati dal dataset come fanno per qualsiasi altro dataset EDDTable inERDDAP. Se la richiesta non include un vincolo sulla colonna timestamp, la richiesta ottiene i dati dalla versione corrente del dataset (il file di log dopo l'elaborazione di tutti i comandi di inserimento e cancellazione e ri-sorzionando dalhttpOttenere necessarioVariables) .
     
* Gli utenti possono anche fare richieste specifiche per EDDTableFromHttpGet datasets:
    * Se la richiesta include una&lt;o&lt;= vincolo della colonna timestamp, quindiERDDAP™elabora le righe del file di registro fino al timestamp specificato. In effetti, questo elimina temporaneamente tutte le modifiche apportate al dataset da quel valore timestamp. Per ulteriori informazioni, vedere[Versione](#versioning).
    * Se la richiesta include un &gt;, &gt;=, o = vincolo della colonna timestamp, ad esempio, &timestamp&lt;=0, alloraERDDAP™restituisce i dati dai file di dati come è, senza elaborare i comandi di inserimento e cancellazione.
* In futuro, immaginiamo che gli strumenti saranno costruiti (Da noi? Da te?) per lavorare con questi set di dati. Ad esempio, ci potrebbe essere uno script che legge i file di registro grezzi, applica una diversa equazione, e genera / aggiorna un diverso dataset con quelle informazioni derivate. Si noti che lo script può ottenere i dati originali tramite una richiesta diERDDAP™  (che ottiene i dati nel formato del file che è più facile per lo script di lavorare con) e generare / aggiornare il nuovo dataset tramite .insert "richiedi" perERDDAP. Lo script non ha bisogno di accesso diretto ai file di dati; può essere su qualsiasi computer dell'autore autorizzato.
     

#### Informazioni dettagliate su EDDTableFromHttpGet{#detailed-information-about-eddtablefromhttpget} 

Gli argomenti sono:

*   [Non cambiare la configurazione&#33;](#dont-change-the-setup)
*   [CRUDIO](#crud)
*   [InvalidRichiesta](#invalidrequests)
*   [Velocità](#httpget-speed)
*   [Robusto](#robust)
*   [Affidabilità del sistema](#system-reliability)
*   [Versione](#versioning)
*   ["E HTTP PUT e DELETE?"](#https-put-and-delete)
*   [Note](#httpget-notes)
*   [Grazie a CHORDS per l'idea di base.](#thanks)

Ecco le informazioni dettagliate:

##### Non cambiare la configurazione&#33;{#dont-change-the-setup} 
Una volta che il dataset è stato creato e hai aggiunto i dati ad esso:

* Non aggiungere o rimuovere alcundataVariableS.
* Non cambiaresourceNameodestinationNamedelladataVariableS.
* Non modificare i dati Tipo didataVariableS. Ma puoi cambiaredataVariableI metadati.
* Non cambiarehttpOttenere richiesto Variabili attributo globale.
* Non cambiarehttpGetDirectoryStructure attributo globale.

Se è necessario modificare una di queste cose, fare un nuovo dataset e trasferire tutti i dati al nuovo dataset.
     
##### CRUDIO{#crud} 
In informatica, i quattro comandi fondamentali per lavorare con un set di dati sono[CREATE, READ, UPDATE, DELETE (CRUDIO) ](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete). SQL, la lingua per lavorare con database relazionali, ha l'equivalente in INSERT, SELECT, UPDATE e DELETE. In EDDTableFromHttpGet,

* .insert è una combinazione di CREATE e UPDATE.
* .delete è DELETE.
* Il sistema regolare per la richiesta di sottoinsiemi di dati è READ.

Così, EDDTableFromHttpGet supporta tutti i comandi fondamentali per lavorare con un dataset.
     
* .insert o .delete richieste senza errori restituirà il codice di stato HTTP=200 e un oggetto JSON, ad esempio,
```
    {
    "status":"success",
    "nRowsReceived":1,
    "stringTimestamp":"2018-03-26T15:34:05.552Z",
    "numericTimestamp":1.522078445552E9
    }
```
I valori due timestamp si riferiscono allo stesso millisecondo, che è il millisecondo che verrà memorizzato nella variabile timestamp per le righe di dati che sono stati inseriti o cancellati.ERDDAP™non cambierà il nome e la formattazione di queste coppie chiave-valore in futuro.ERDDAP™può aggiungere ulteriori coppie chiave-valore all'oggetto JSON in futuro.
     
##### InvalidRichiesta{#invalidrequests} 
Le richieste Invalid .insert o .delete restituiranno un codice di stato di errore HTTP diverso dallo stato=200 e non verranno apportate modifiche al dataset. Questo include richieste con informazioni di autore errate, nomi variabili errati, diverse lunghezze di array per diverse variabili, variabili mancanti, valori variabili richiesti mancanti, ecc. Se la richiesta coinvolge più di un file di dati, è possibile che parte della richiesta avrà successo e parte fallirà. Tuttavia questo non dovrebbe essere un problema se il sensore che invia la richiesta tratta qualsiasi fallimento come un completo fallimento. Per esempio, se lo diciERDDAP™da inserire (o eliminare) gli stessi dati due volte di fila, il peggiore dei casi è che le informazioni vengono memorizzate due volte, si chiudono insieme nel file di registro. È difficile vedere come potrebbe causare problemi.
     
##### Velocità HttpGet{#httpget-speed} 
Per richieste .insert o .delete (non contarehttpsopra) , ballpark figure la velocità di .insert o .delete sono
1ms per .insert con 1 riga di dati
2ms per .insert con 10 righe di dati in array (\\[\\])   
3ms per .insert con 100 righe di dati in array (\\[\\])   
13ms per .insert con 1000 righe di dati in array (\\[\\])   
Chiaramente gli array sono la chiave per[alto rendimento](#httpget-speed). Senza array, sarà difficile per .insert o .delete più di 8 righe di dati al secondo da un autore remoto (a causa di tutta la testata della rete) . Con array, sarà facile da .insert o .delete più di 1000 righe di dati al secondo da un sensore remoto.

Con grandi quantità di dati per richiesta, si colpirà il limite di Tomcat alla lunghezza massima query (predefinito è 8KB?) , ma questo può essere aumentato modificando l'impostazione maxHttpHeaderSize nella vostra *tomcat* /conf/server.xml HTTP/1.1 Entrata del connettore.

QuandoERDDAP™legge i dati JSON Lines CSV (registro) file, c'è una piccola penalità di tempo rispetto alla lettura di file di dati binari. Abbiamo ritenuto che questa penalità di tempo quando la lettura fosse un prezzo ragionevole da pagare per la velocità e la robustezza del sistema durante la scrittura dei dati (che è di primaria importanza) .

##### SSD{#ssd} 
[Per una maggiore velocità,](#ssd)utilizzare un[Solid State Drive (SSD) ](https://en.wikipedia.org/wiki/Solid-state_drive)per memorizzare i dati. Hanno un tempo di accesso file molto più veloce (&lt;0.1ms) rispetto ai dischi rigidi (3 - 12 ms) . Hanno anche una velocità di trasferimento dati più veloce (200 - 2500 MB/s) rispetto a dischi rigidi (~ 200 MB/s) . Il loro costo è sceso considerevolmente negli ultimi anni. Anche se i primi SSD hanno avuto problemi dopo un gran numero di scritture a un dato blocco, questo problema è ora notevolmente ridotto. Se si utilizza il SSD per scrivere i dati una volta quindi leggere molte volte, anche un SSD di livello consumer (che è notevolmente meno costoso di un SSD di livello enterprise) dovrebbe durare molto tempo.
    
##### Robusto{#robust} 
Abbiamo cercato di rendere questo sistema il più facile da lavorare e più robusto possibile.
* Il sistema è progettato per avere fili multipli (ad esempio, il sensore, uno script QC automatizzato e un umano) contemporaneamente lavorando sulla stessa dataset e anche lo stesso file. Gran parte di questo è reso possibile utilizzando un approccio di file di log per memorizzare i dati e utilizzando un tipo di file molto semplice,[JSON Linee file CSV](https://jsonlines.org/examples/), per memorizzare i dati.
* Un altro enorme vantaggio per JSON Lines CSV è che se un file mai diventa danneggiato (ad esempio, non valido a causa di un errore su una linea) , è facile aprire il file in un editor di testo e risolvere il problema.
* Un altro vantaggio è, se c'è un errore su una linea in un file, il sistema può ancora leggere tutti i dati sulle linee prima e dopo la linea di errore. E il sistema può ancora registrare ulteriori informazioni .insert e .delete.
* Un enorme vantaggio di utilizzare file standard accessibili da admin (rispetto a un database relazionale o Cassandra o altro software) : Non c'è nessun altro software che deve essere mantenuto e che deve essere in esecuzione per memorizzare o recuperare i dati. E è facile eseguire il backup di file standard in qualsiasi momento e in modo incrementale perché i dati sono in blocchi (dopo un po', solo il file corrente per ogni stazione cambierà) . Al contrario, ci vuole un notevole sforzo e sistema giù tempo per fare i file di backup esterni da database e da Cassandra.
         
##### Affidabilità del sistema{#system-reliability} 
È ragionevole aspettarsi un server conERDDAP™per avere 99,9% uptime -- sono circa 9 ore di fermo all'anno (Anche se, si può usare questo in una brutta notte&#33;) .
Se siete diligenti e fortunati, si potrebbe ottenere 99,99% uptime (53 minuti di fermo all'anno) , dal momento che solo alcuni riavviamenti per gli aggiornamenti ci vorrà molto tempo.
Si dovrebbe prendere misure estreme (un server di backup separato, alimentazione ininterrotta, aria condizionata di backup, personale 24x7x365 per monitorare il sito, ecc.) per avere una sottile possibilità di 99,999% uptime (5.25 minuti di fermo dell'anno) . Anche allora, è estremamente improbabile che si otterrà 99,999% uptime (o anche 99,99%) perché i problemi sono spesso al di fuori del vostro controllo. Ad esempio, Amazon Web Service e Google offrono servizi web incredibilmente affidabili, ma grandi sezioni di loro sono a volte giù per ore.

Affrontalo, tutti voglionoERDDAP™avere il 100% di uptime, o almeno il vaunted "sei noves" (99.9999% uptime equivale a 32 secondi di downtime all'anno) , ma non c'è modo che si sta per ottenere, non importa quanto tempo, sforzo e soldi si spendono.

MaERDDAP™l'ora legale non è il vero obiettivo. L'obiettivo è quello di costruire un affidabile **sistema** , uno che non perde dati. Questo è un problema risolvibile.

La soluzione è: costruire la tolleranza di errore nel software del computer che sta inviando i dati aERDDAP. Nello specifico, quel software dovrebbe mantenere una coda di dati in attesa di andare aERDDAP. Quando i dati vengono aggiunti alla coda, il software dovrebbe controllare la risposta daERDDAP. Se la risposta non include i dati ricevuti. Nessun errore, quindi il software dovrebbe lasciare i dati in coda. Quando vengono generati più dati e aggiunti alla coda, il software dovrebbe nuovamente provare a .inserire i dati nella coda (forse con il\\[\\]sistema) . Ci riuscirà o fallirà. Se fallisce, riproverà più tardi. Se si scrive il software per funzionare in questo modo e se il software è pronto a mettere in coda alcuni giorni vale la pena di dati, in realtà avete una buona probabilità di caricare il 100% dei dati del sensore aERDDAP. E lo avrete fatto senza andare a grandi sforzi o spese.

\\[Sfondo: Non l'abbiamo pensato.[È così che le reti di computer raggiungono l'affidabilità.](https://en.wikipedia.org/wiki/Reliability_(computer_networking)) Le reti di computer sono intrinsecamente inaffidabili. Così quando si trasferisce un file da un computer all'altro, il software di invio sa / prevede che alcuni pacchetti possono essere persi. Se non ottiene un riconoscimento appropriato per un dato pacchetto dal ricevitore, si rivende il pacchetto perso. Con questo approccio, il software del mittente e del ricevitore relativamente semplice può costruire un sistema di trasferimento di file affidabile sopra una rete inaffidabile.\\]
    
##### Perché JSON Lines CSV file?&#33;{#why-json-lines-csv-files} 
EDDTableFromHttpGet utilizza[JSON Linee file CSV](https://jsonlines.org/examples/). per la memorizzazione dei dati. Le ragioni sono:

* La ragione principale è: La semplicità dei file JSON Lines CSV offre un modo veloce, facile e affidabile per consentire a più thread di scrivere in un dato file (ad esempio, sincronizzando il nome del file) .
* Se un file JSON Lines CSV è mai stato danneggiato (ad esempio, non valido a causa di un errore su una linea) , EDDTableFromFromHttpGet potrebbe ancora leggere tutti i dati su tutte le righe prima e dopo la linea di errore. E il sistema .insert e .delete potrebbe continuare ad aggiungere nuovi dati al file di dati.
* Poiché i file JSON Lines CSV sono file ASCII, se un file è mai stato danneggiato, sarebbe facile da risolvere (in un editor di testo) .
* Supporti JSON Lines CSV Stringhe Unicode.
* JSON Lines CSV supporta stringhe di lunghezza variabile (non limitato ad una lunghezza massima) .
* JSON Lines CSV supporta integer a 64 bit (lunghi) .
* La natura formale e la sintassi extra di JSON Lines CSV (vs vecchia scuola CSV) fornisce qualche ulteriore garanzia che una data linea non è stata corrotta.

Inizialmente abbiamo cercato di usare.nc3 file con una dimensione illimitata. Tuttavia, ci sono stati problemi:

* Il problema principale era: Non c'è modo affidabile per consentire a più fili di scrivere a un.nc3 file, anche se i fili cooperano facendo le scritture in modo sincronizzato.
* Se un.nc3 file diventa danneggiato, il sistema .insert e .delete non può continuare a usare il file.
* Perché.nc3 file sono binari, se un file diventa danneggiato (che fanno a causa del problema multi-threading) sono estremamente difficili o impossibili da risolvere. Non ci sono strumenti per aiutare con la riparazione.
* CF non ha modo di specificare la codifica delle stringhe, quindi non c'è modo ufficiale di supportare Unicode, ad esempio la codifica UTF-8. Abbiamo cercato di ottenere CF per supportare un attributo \\_Encoding ma non siamo stati in grado di fare alcun progresso. (Unidata, al loro credito, supporta l'attributo \\_Encoding.) 
*   .nc3 file supportano solo stringhe di lunghezza fissa. Ancora una volta, abbiamo cercato di ottenere CF eUnidatasostenere stringhe di lunghezza variabile ma non sono stati in grado di fare alcun progresso.
*   .nc3 file non supportano un modo semplice per distinguere singole variabili di carattere da variabili di stringa. Ancora una volta, abbiamo cercato di ottenere CF eUnidatasostenere un sistema per distinguere questi due tipi di dati, ma non sono stati in grado di fare alcun progresso.
*   .nc3 file supportano solo i caratteri a 8 bit con una codifica non specificata. Ancora una volta, abbiamo cercato di ottenere CF eUnidatasostenere un sistema per specificare la codifica, ma non sono stati in grado di fare alcun progresso.
*   .nc3 file non supportano interi a 64 bit (lunghi) . Ancora una volta, abbiamo cercato di ottenere CF eUnidatasostenere un sistema per i lunghi, ma non sono stati in grado di fare alcun progresso.
         
##### Versione{#versioning} 
Perché EDDTable Da parte sua Ottenere memorizza un registro di tutte le modifiche al dataset con il timestamp e l'autore di ogni cambiamento, può rapidamente ricreare che l'impostazione di dati come di qualsiasi punto nel tempo. In un certo senso, c'è una versione per qualsiasi punto nel tempo. Se la richiesta di un utente per i dati include un timestamp&lt;= vincolo, ad esempio, &timestamp&lt;=2016-06-23T16:32:22.128Z (o qualsiasi punto di tempo) , ma nessun vincolo di autore o di comando,ERDDAP™risponderà alla richiesta generando prima una versione del dataset a partire da quel punto nel tempo. Allora...ERDDAP™applica gli altri vincoli dell'utente, come con qualsiasi altra richiesta di dati daERDDAP. EDDTableFromHttpGet è impostato in modo che questo processo è molto veloce ed efficiente, anche per i set di dati molto grandi.

Allo stesso modo, un utente può scoprire quando il dataset è stato aggiornato l'ultima volta richiedendo ...?timestamp&timestamp=max (timestamp) &gt; () 

E per qualsiasi richiesta di dati, per qualsiasi versione del dataset, gli utenti possono vedere quale autore ha fatto quali cambiamenti, e quando li hanno fatti.

Questo sistema di versione consente[Scienza reproducibile](https://en.wikipedia.org/wiki/Reproducibility)perché chiunque, in qualsiasi momento, può richiedere i dati dalla versione del dataset in qualsiasi momento. Questa versione fine-grained non è possibile con qualsiasi altro sistema che conosciamo. Il meccanismo sottostante è molto efficiente, in quanto non è necessario spazio di archiviazione aggiuntivo, e la superficie di elaborazione è veramente minima.

Non tutti hanno bisogno di questo tipo di versione fine-grained, ma è estremamente utile, forse necessario, nel contesto di una grande organizzazione di gestione dei dati (ad esempio, OOI, Earth Cube, Data One, eNOAANCEI) dove un dataset può avere più autori (ad esempio, il sensore, uno script QC automatizzato e un editor umano) .

\\[Storia: La necessità di questo tipo di versione per primo è venuto su per me (Bob.) quando si legge su e discutere OOI nel 2008. All'epoca, OOI aveva un sistema ingombrante, lento e inefficiente per la versione basata su Git. Git è grande per quello che è stato progettato per, ma non questo. Nel 2008, mentre in una discussione OOI, ho progettato un ampio ed efficiente sistema alternativo-to-OOI per la gestione dei dati, tra cui molte delle caratteristiche che ho aggiuntoERDDAP™da allora, e compreso questo sistema di versione. A quel tempo e da allora, OOI è stato impegnato nel loro sistema di versione e non interessato alle alternative. Nel 2016, altri aspetti di questo piano sono entrati in vigore e ho iniziato a implementarlo. Perché ci sono state molte interruzioni per lavorare su altri progetti, non ho finito fino al 2018. Anche ora, non sono a conoscenza di qualsiasi altro sistema di dati scientifici che offre un accesso così rapido e facile a una versione dei dati da qualsiasi momento nel tempo, per la modifica di frequente dei set di dati. I semplici file system non offrono questo. I database relazionali no. Cassandra no.\\]
    
##### HTTPS Mettere e cancellare{#https-put-and-delete} 
*   ["E HTTPS PUT e DELETE?"](#https-put-and-delete)  
    [Protocollo di trasferimento ipertestuale (HTTP) ](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)è la base del World Wide Web e il motivo per cui gli URL della pagina web iniziano con " http://" o " https://" . HTTPS è HTTP con uno strato di sicurezza aggiuntivo. Ogni giorno, browser, script e programmi per computer fanno miliardi di HTTP (S)   **G** richieste di ottenere informazioni da fonti remote. HTTP (S) comprende anche altri[verbi](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods), in particolare PUT (per spingere i dati al server) e DELETE (al DELETE dati dal server) . Sì, PUT e DELETE sono il modo corretto per inserire i dati e cancellare i dati da, un dataset tramite HTTP (S) . GET è supportato da ogni software che può funzionare con HTTP (S) . GET è davvero facile da lavorare. Tutti sanno già come lavorare con GET e molti sanno come utilizzare POST (che può essere utilizzato essenzialmente allo stesso modo di GET) , così abbiamo fatto EDDTableFromHttpGet lavoro con GET e POST. Pochissime persone (anche pochi programmatori di computer) hanno mai lavorato con PUT e DELETE. PUT e DELETE sono generalmente supportati solo dalle lingue del computer, quindi l'utilizzo richiede un programma abile. Quindi PUT e DELETE sono di solito un approccio molto più ingombrante dato il modo in cui gli strumenti si sono evoluti.
     
##### Note HttpGet{#httpget-notes} 
*   [Note](#httpget-notes)
    * No.dataVariablepuò avere datiTipo=char. Utilizzare i datiTipo=String invece. Se hai davvero bisogno di datiType=char, e-mail Chris. John a noaa.gov.
         
##### Grazie.{#thanks} 
*   [Grazie a CHORDS per l'idea di base.](#thanks)  
L'idea di base per EDDTableFromHttpGet (cioè, usando unHTTP GETrichiedere di aggiungere i dati a un set di dati) è da UCAR (NCAR?)  [Servizi in tempo reale cloud-Hosted (ORARI) ](https://github.com/earthcubeprojects-chords)progetto. Il formato per i parametri nella richiesta (ripetuto *nome=valore* , separato da &'s) è lo stesso formato standard utilizzato dai moduli HTML sulle pagine web. È un'idea semplice e brillante e ancora di più perché si fonde così perfettamente conERDDAPIl sistema esistente per trattare dati tabulari. L'idea è evidente nel senno, ma io (Bob.) Non ci ha pensato. EDDTableDaHttp Ottenere utilizza quell'idea di base, combinato con le nostre idee di come implementarlo, per fare un sistema inERDDAP™per il caricamento dei dati. Oltre all'idea di base di utilizzare GET per spingere i dati nel sistema, l'implementazione EDDTableFromHttpGet è completamente diversa e completamente indipendente da CHORDS e ha caratteristiche diverse (ad esempio, file di registro, blocco di dati, sistema di sicurezza diverso, supporto CRUD, dati riproducibili) . La nostra esposizione a CHORDS era solo un webinar. Non abbiamo guardato il loro codice o letto sul loro progetto perché sapevamo subito che volevamo implementare il sistema in modo diverso. Ma siamo grati a loro per l'idea di base. Il riferimento completo a CHORDS è
Daniels, M. D., Kerkez, B., Chandrasekar, V., Graves, S., Stamps, D. S., Martin, C., Dye, M., Gooch, R., Bartos, M., Jones, J., Keiser, K. (2014) . Servizi in tempo reale cloud-Hosted per le geoscienze (ORARI) software. UCAR/NCAR -- Laboratorio di osservazione della Terra.[ https://doi.org/10.5065/d6v1236q ](https://doi.org/10.5065/d6v1236q)  
     
### EDDTEDDHyraxFile{#eddtablefromhyraxfiles} 
[ **EDDTEDDHyraxFile** ](#eddtablefromhyraxfiles)  (deprecato) aggrega i file di dati con diverse variabili, ognuna con una o più dimensioni condivise (per esempio, tempo, altitudine (o profondità) , latitudine, longitudine) , e servito da un[Hyrax OPeNDAPserver](https://www.opendap.org/software/hyrax-data-server).

* Questo tipo di dataset è **DEPRECATE** . La soluzione più recente e più generale è quella di utilizzare[cache opzione FromUrl per EDDTable Da Fili](#cachefromurl)  (o una variante) , che fa una copia locale dei file remoti e serve i dati dai file locali. The&lt;opzione cacheFromUrl&gt; può essere utilizzato con qualsiasi tipo di file di dati tabulari. **   
Se non riesci a farlo funzionare per qualche motivo, e-mail Chris. John a noaa.gov.
Se non ci sono reclami prima del 2020, questo tipo di dataset può essere rimosso. ** 
* Si consiglia vivamente di utilizzare[Generare i dati Programma Xml](#generatedatasetsxml)per fare una bozza ruvida deldatasets.xmlchunk per questo dataset. Puoi quindi modificarlo per affinarlo.
* Nella maggior parte dei casi, ogni file ha più valori per la sinistra (primo) dimensione, per esempio, tempo.
* I file spesso (ma non devi) hanno un unico valore per le altre dimensioni (per esempio, altitudine (o profondità) , latitudine, longitudine) .
* I file possono avere variabili di carattere con una dimensione aggiuntiva (per esempio, nCharacters) .
*   Hyraxi server possono essere identificati dal "/dods-bin/nph-dods/" o "/opendap/" nell'URL.
* Questa classe scandaglia lo schermoHyraxpagine web con le liste di file in ogni directory. A causa di questo, è molto specifico per il formato corrente diHyraxpagine web. Cercheremo di regolareERDDAP™rapidamente se / quando versioni future diHyraxcambiare come i file sono elencati.
* The&lt;l'impostazione fileDir&gt; è ignorata. Poiché questa classe scarica e fa una copia locale di ogni file di dati remoto,ERDDAP™forza il file Dir a essere *BigParentDirectory* /copia/ *datasetID* /.
* Per&lt;sourceUrl&gt;, utilizzare l'URL della directory di base del datasetHyraxserver, ad esempio,
    &lt;sourceUrl&gt; http://edac-dap.northerngulfinstitute.org/dods-bin/nph-dods/WCOS/nmsp/wcos/ &lt;/sourceUrl&gt;
     (ma mettilo su una linea)   (Scusa, quel server non è più disponibile) .
ThesourceUrlpagina web di solito ha "OPeNDAPIndice del server\\[directoryName\\]" in cima.
* Dal momento che questa classe scarica sempre e fa una copia locale di ogni file di dati remoto, non si dovrebbe mai avvolgere questo set di dati in[EDDTableCopy](#eddtablecopy).
* Vedi la superclasse di questa classe,[EDDTableFromFiles](#eddtablefromfiles), per informazioni su come funziona questa classe e come usarla.
* Vedere gli esempi 1D, 2D, 3D e 4D per[EDDTableFromNcFiles](#eddtablefromncfiles).
     
### EDDTableFrom non valido{#eddtablefrominvalidcrafiles} 
[ **EDDTableFrom non valido** ](#eddtablefrominvalidcrafiles)aggrega i dati daNetCDF  (v3 o v4)  .ncfile che utilizzano una specifica, non valida, variante del CF DSG Contiguous Ragged Array (CRA) file. Anche seERDDAP™supporta questo tipo di file, è un tipo di file non valido che nessuno dovrebbe iniziare a usare. I gruppi che attualmente utilizzano questo tipo di file sono fortemente incoraggiati ad utilizzareERDDAP™generare file CF DSG CRA validi e smettere di utilizzare questi file.

Dettagli: Questi file hanno più variabili di riga\\_size, ciascuna con un attributo campione\\_dimensione. I file sono file non-CF-standard perché il campione multiplo (o) le dimensioni devono essere decodificate e collegate tra loro con questa regola aggiuntiva e promettono che non fa parte della specifica CF DSG: "puoi associare un dato ad esempio, il valore della temperatura (temp\\_obs dimensione) con un dato valore di profondità (dimensione z\\_obs, la dimensione con la maggior parte dei valori) , perché: la riga di temperatura\\_size (per un dato cast) sarà 0 o uguale alla riga di profondità corrispondente\\_size (per quel cast)   (questa è la regola) . Quindi, se la riga di temperatura\\_size non è 0, i valori di temperatura n per quel getto si riferiscono direttamente ai valori di profondità n per quel cast (questa è la promessa) .

Un altro problema con questi file: la riga principale\\_Investigator\\_size non ha un attributo campione\\_dimensione e non segue la regola sopra.

I file di esempio per questo tipo di dataset possono essere trovati a https://data.nodc.noaa.gov/thredds/catalog/ncei/wod/  \\[2020-10-21 Questo server non è più disponibile\\].

Vedi la superclasse di questa classe,[EDDTableFromFiles](#eddtablefromfiles), per informazioni su come funziona questa classe e come usarla.

Si consiglia vivamente di utilizzare[Generare i dati Programma Xml](#generatedatasetsxml)per fare una bozza ruvida deldatasets.xmlchunk per questo dataset. Puoi quindi modificarlo per affinarlo.

La prima cosa GenerateDatasets Xml fa per questo tipo di dataset dopo aver risposto alle domande è stampare la struttura ncdump-like del file campione. Quindi, se si inserisce alcune risposte goofy per il primo ciclo attraverso GenerateDatasets Xml, almeno sarai in grado di vedere seERDDAP™può leggere il file e vedere quali dimensioni e variabili sono nel file. Quindi è possibile dare risposte migliori per il secondo ciclo attraverso GenerateDatasetsXml.
 
### EDDTableFromJsonlCSVFiles{#eddtablefromjsonlcsvfiles} 
[ **EDDTableFromJsonlCSVFiles** ](#eddtablefromjsonlcsvfiles)aggrega i dati da[JSON Linee file CSV](https://jsonlines.org/examples/). Vedi la superclasse di questa classe,[EDDTableFromFiles](#eddtablefromfiles), per informazioni su come funziona questa classe e come usarla.

* Come dice jsonlines.org, questo formato è "Meglio di CSV" (E legalmente, come dipendente federale, non posso essere d'accordo o disaccordo con loro... quanto e' folle?) . CSV non è mai stato formalmente definito ed è ostacolato dal bagaglio storico relativo alla sua connessione ai programmi originali del foglio di calcolo. JSON Lines CSV, in confronto, è completamente definito e beneficia della sua connessione allo standard JSON ampiamente utilizzato, che a sua volta beneficia della sua connessione aJavaScript eJava. In particolare, c'è il supporto completo per interi lunghi e per caratteri Unicode in stringhe, e un modo chiaro per includere altri caratteri speciali (in particolare schede e novità) in stringhe.
    
Questo formato è particolarmente buono per i set di dati in cui è necessario periodicamente aggiungere righe aggiuntive alla fine di un dato file di dati. Per questo motivo ed altri (vedi sopra) ♪[EDDTableDaHttpGet](#eddtablefromhttpget)utilizza i file Json Lines CSV per la memorizzazione dei dati.
    
* I file di input sono considerati codificati UTF-8. Tuttavia, data la \\u *#* formato per codificare caratteri speciali (e.g., \\u20ac è la codifica per il carattere Euro) , hai la possibilità di scrivere i file in modo che contengono solo 7 bit caratteri ASCII utilizzando \\u *#* per codificare tutti i caratteri sopra #127.
     
* Si consiglia vivamente di utilizzare[Generare i dati Programma Xml](#generatedatasetsxml)per fare una bozza ruvida deldatasets.xmlchunk per questo dataset. Puoi quindi modificarlo per affinarlo.
    
La prima cosa che GenerateDatasetsXml fa per questo tipo di dataset dopo aver risposto alle domande è stampare la struttura ncdump-like del file campione. Quindi, se si inserisce alcune risposte goofy per il primo ciclo attraverso GenerateDatasets Xml, almeno sarai in grado di vedere seERDDAP™può leggere il file e vedere quali dimensioni e variabili sono nel file. Quindi è possibile dare risposte migliori per il secondo ciclo attraverso GenerateDatasetsXml.
    
* ATTENZIONE: QuandoERDDAP™legge JSON Linee file di dati CSV, se trova un errore su una determinata linea (ad esempio, numero errato di articoli) , registra un messaggio di avviso (" ATTENZIONE: Bad line (#) di dati" ... con un elenco delle linee sbagliate su linee successive) al[file log.txt](/docs/server-admin/additional-information#log)e poi continua a leggere il resto del file di dati. Così, è vostra responsabilità guardare periodicamente (o scrivere uno script per farlo) per quel messaggio nel registro. txt in modo da poter risolvere i problemi nei file di dati.ERDDAP™è impostato in questo modo in modo che gli utenti possono continuare a leggere tutti i dati validi disponibili anche se alcune linee del file hanno difetti.
     
### EDDTableFromMultidimNcFiles{#eddtablefrommultidimncfiles} 
[ **EDDTableFromMultidimNcFiles** ](#eddtablefrommultidimncfiles)aggrega i dati daNetCDF  (v3 o v4)  .nc  (o[.ncml](#ncml-files)) file con diverse variabili, ognuna con una o più dimensioni condivise. I file possono avere variabili di carattere con o senza una dimensione aggiuntiva (per esempio, STRUTTURA14) . Vedi la superclasse di questa classe,[EDDTableFromFiles](#eddtablefromfiles), per informazioni su come funziona questa classe e come usarla.

* Se i file sono varianti CF DSG multidimensionali, utilizzare questo tipo di dataset invece di[EDDTableFromNcCFFiles](#eddtablefromncfiles).
     
* Per nuovi set di dati tabulari da.ncfile, utilizzare questa opzione prima di provare il vecchio[EDDTableFromNcFiles](#eddtablefromncfiles). Alcuni vantaggi di questa classe sono:
    * Questa classe può leggere più variabili da una più ampia varietà di strutture di file. Se si specifica DimensioniCSV (un elenco separato da virgola di nomi di dimensione) in GenerateDatasets Xml (o&lt;dimensioniCSV&gt; indatasets.xmlinfo per uno di questi datasets), quindiERDDAP™leggerà solo variabili nei file sorgente che utilizzano alcune o tutte queste dimensioni, oltre a tutte le variabili scalari. Se una dimensione è in un gruppo, è necessario specificare il suo nome completo, ad esempio, " *groupName/dimensione Nome* ".
    * Questa classe può spesso rifiutare i file molto rapidamente se non corrispondono ai vincoli di una richiesta. Così la lettura dei dati da grandi collezioni spesso andrà molto più veloce.
    * Questa classe gestisce le vere variabili di beneficenza (variabili non-String) correttamente.
    * Questa classe può tagliare le variabili di stringa quando il creatore non ha usato Netcdf-java's writeStrings (che aggiunge char #0 per segnare la fine della stringa) .
    * Questa classe è migliore nel trattare con i singoli file che mancano determinate variabili o dimensioni.
    * Questa classe può rimuovere blocchi di righe con valori mancanti come specificato per[CFU Geometrie di smorzamento discreto (DSG) File di Array multidimensionali incompleti](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#_incomplete_multidimensional_array_representation)  
         
* Si consiglia vivamente di utilizzare[Generare i dati Programma Xml](#generatedatasetsxml)per fare una bozza ruvida deldatasets.xmlchunk per questo dataset. Puoi quindi modificarlo per affinarlo.
    
La prima cosa che GenerateDatasetsXml fa per questo tipo di dataset dopo aver risposto alle domande è stampare la struttura ncdump-like del file campione. Quindi, se si inserisce alcune risposte goofy per il primo ciclo attraverso GenerateDatasets Xml, almeno sarai in grado di vedere seERDDAP™può leggere il file e vedere quali dimensioni e variabili sono nel file. Quindi è possibile dare risposte migliori per il secondo ciclo attraverso GenerateDatasetsXml.
    
Gruppo... Genera i dati Xml chiederà un "Gruppo". È possibile inserire "" per farlo ricercare qualsiasi / tutti i gruppi, " *alcuni Gruppo* " o " *alcuniGruppo / alcuniSubGroup* " per far ricercare un gruppo specifico, o "\\[radice di radice\\]" per avere la ricerca solo il gruppo radice. La stringa "Gruppo" diventa&lt;gruppo &gt; neldatasets.xmlinfo per il set dati (anche se "\\[radice di radice\\]"diviene "") .
    
DimensioniCSV - GenerateDatasets Xml chiederà una stringa "DimensionsCSV". Si tratta di un elenco di nomi sorgente a valore separato da virgola di un insieme di dimensioni. Genera i dati Xml leggerà solo le variabili di dati nel campione.ncfile che utilizzano alcune o tutte quelle dimensioni (e non altre dimensioni) , più tutte le variabili scalari nel file, e rendere i dati impostati da tali variabili di dati. Se una dimensione è in un gruppo, è necessario specificare il suo nome completo, ad esempio, " *groupName/dimensione Nome* ".
Se non specificate nulla (una stringa vuota) , GenerateDatasets Xml cercherà le variabili con la maggior parte delle dimensioni, sulla teoria che saranno le più interessanti, ma ci possono essere momenti in cui si desidera fare un set di dati da qualche altro gruppo di variabili di dati che utilizza qualche altro gruppo di dimensioni.
Se si specifica solo un nome di dimensione che non esiste (ad esempio, NO\\_MATCH) ♪ERDDAP™troverà solo tutte le variabili scalari.
La stringa "DimensionsCSV" diventa&lt;dimensioniCSV&gt; indatasets.xmlinfo per il dataset.
    
#### trattamentoDimensioniAs{#treatdimensionsas} 
C'è una categoria di invalidità.ncfile (perché non seguono le regole CF) che hanno dimensioni multiple (ad esempio, lat, lon, time) quando avrebbero dovuto usare una sola dimensione (ad esempio, il tempo) , per esempio:
```
    dimensions:
        time = UNLIMITED ; // (1437 currently)
        depth = 10;
        lat = 1437 ;
        lon = 1437 ;
    variables:
        double time(time) ;
        double lat(lat) ;
        double lon(lon) ;
        float temperature(time, depth) ;
```
EDDTableFromMultidimNcFiles ha una caratteristica speciale per affrontare questi file: se si aggiunge l'attributo globale "treatDimensionsAs" ai dataset globaliaddAttributes# You can tell #ERDDAP™per il trattamento di determinate dimensioni (ad esempio, lat e lon) come se fossero un'altra dimensione (ad esempio, il tempo) . Il valore dell'attributo deve essere un elenco separato da virgola che specifica le dimensioni "da" e poi la dimensione "a", ad esempio,
<att name="treatDimensionsAs">lat, lon, time</att>  
AlloraERDDAP™leggerà il file come se fosse:
```
    dimensions:
        time = UNLIMITED ; // (1437 currently)
        depth = 10;
    variables:
        double time(time) ;
        double lat(time) ;
        double lon(time) ;
        float temperature(time, depth) ;
```
Naturalmente, la dimensione attuale di ciascuna delle dimensioni dell'elenco deve essere la stessa; altrimenti,ERDDAP™tratterà il file come "Bad File".

Si noti che questi file sono invalidi perché non seguono le regole CF. Anche seERDDAP™può leggerli, si consiglia vivamente di non creare file come questo perché altri strumenti software basati su CF non saranno in grado di leggerli correttamente. Se hai già tali file, ti consigliamo vivamente di sostituirli con file validi il prima possibile.
    
### EDDTableFromNcFiles{#eddtablefromncfiles} 
[ **EDDTableFromNcFiles** ](#eddtablefromncfiles)aggrega i dati daNetCDF  (v3 o v4)  .nc  (o[.ncml](#ncml-files)) file e[Zar](https://github.com/zarr-developers/zarr-python)file (in versione 2.25) con diverse variabili, ciascuna con una dimensione condivisa (per esempio, il tempo) o più dimensioni condivise (per esempio, tempo, altitudine (o profondità) , latitudine, longitudine) . I file devono avere gli stessi nomi di dimensione. Un dato file può avere più valori per ciascuna delle dimensioni e i valori possono essere diversi in diversi file sorgente. I file possono avere variabili di carattere con una dimensione aggiuntiva (per esempio, STRUTTURA14) . Vedi la superclasse di questa classe,[EDDTableFromFiles](#eddtablefromfiles), per informazioni su come funziona questa classe e come usarla.

I file Zarr hanno un comportamento leggermente diverso e richiedono sia il fileNameRegex che il pathRegex per includere "zarr".

* Se.nci file usano uno dei[CFU Geometrie di smorzamento discreto (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)formati di file, provare a usare[EDDTableFromNcCFFiles](#eddtablefromncfiles)prima di provarlo.
     
* Per nuovi set di dati tabulari da.ncfile, provare il nuovo[EDDTableFromMultidimNcFiles](#eddtablefrommultidimncfiles)Prima.
     
* Si consiglia vivamente di utilizzare[Generare i dati Programma Xml](#generatedatasetsxml)per fare una bozza ruvida deldatasets.xmlchunk per questo dataset. Puoi quindi modificarlo per affinarlo.
    
La prima cosa che GenerateDatasetsXml fa per questo tipo di dataset dopo aver risposto alle domande è stampare la struttura ncdump-like del file campione. Quindi, se si inserisce alcune risposte goofy per il primo ciclo attraverso GenerateDatasets Xml, almeno sarai in grado di vedere seERDDAP™può leggere il file e vedere quali dimensioni e variabili sono nel file. Quindi è possibile dare risposte migliori per il secondo ciclo attraverso GenerateDatasetsXml.
    
DimensioniCSV - GenerateDatasets Xml chiederà una stringa "DimensionsCSV". Si tratta di un elenco di nomi sorgente a valore separato da virgola di un insieme di dimensioni. Genera i dati Xml troverà le variabili di dati nelle.ncfile che utilizzano alcune o tutte queste dimensioni, più tutte le variabili scalari, e rendono i dati impostati da tali variabili di dati. Se non specificate nulla (una stringa vuota) , GenerateDatasets Xml cercherà le variabili con la maggior parte delle dimensioni, sulla teoria che saranno le più interessanti, ma ci possono essere momenti in cui si desidera fare un set di dati da qualche altro gruppo di variabili di dati che utilizza qualche altro gruppo di dimensioni.
    
* 1D Esempio: i file 1D sono un po' diversi da file 2D, 3D, 4D, ....
    * Potresti avere una serie di.ncfile di dati in cui ogni file ha un mese di dati da un buoy alla deriva.
    * Ogni file avrà 1 dimensione, per esempio, il tempo (dimensione =\\[molti\\]) .
    * Ogni file avrà una o più variabili 1D che utilizzano quella dimensione, per esempio, il tempo, la longitudine, latitudine, la temperatura dell'aria, ....
    * Ogni file può avere variabili di carattere 2D, ad esempio, con dimensioni (tempo, nCharacters) .
         
* Esempio 2D:
    * Potresti avere una serie di.ncfile di dati in cui ogni file ha un mese di dati da un buoy alla deriva.
    * Ogni file avrà 2 dimensioni, per esempio, il tempo (dimensione =\\[molti\\]) e id (dimensione = 1) .
    * Ogni file avrà 2 variabili 1D con gli stessi nomi delle dimensioni e utilizzando la dimensione dello stesso nome, per esempio, tempo (tempo) # (Id) . Queste variabili 1D dovrebbero essere incluse nell'elenco delle&lt;dataVariable&gt; è in XML del dataset.
    * Ogni file avrà una o più variabili 2D, per esempio, longitudine, latitudine, temperatura dell'aria, temperatura dell'acqua, ...
    * Ogni file può avere variabili di carattere 3D, ad esempio, con dimensioni (tempo,id,nCharacters) .
         
* Esempio 3D:
    * Potresti avere una serie di.ncfile di dati in cui ogni file ha un mese di dati da un booy stazionario.
    * Ogni file avrà 3 dimensioni, per esempio, il tempo (dimensione =\\[molti\\]) ♪ (dimensione = 1) e lon (dimensione = 1) .
    * Ogni file avrà 3 variabili 1D con gli stessi nomi delle dimensioni e utilizzando la dimensione dello stesso nome, per esempio, tempo (tempo) ♪ (La) # (I) . Queste variabili 1D dovrebbero essere incluse nell'elenco delle&lt;dataVariable&gt; è in XML del dataset.
    * Ogni file avrà una o più variabili 3D, ad esempio, temperatura dell'aria, temperatura dell'acqua, ...
    * Ogni file può avere variabili di carattere 4D, ad esempio, con dimensioni (tempo, ritardo,lon,nCharacters) .
    * Il nome del file potrebbe avere il nome del buoy all'interno del nome del file.
         
* Esempio 4D:
    * Potresti avere una serie di.ncfile di dati in cui ogni file ha un mese di dati da una stazione. Ad ogni punto di tempo, la stazione prende le letture in una serie di profondità.
    * Ogni file avrà 4 dimensioni, per esempio, il tempo (dimensione =\\[molti\\]) , profondità (dimensione =\\[molti\\]) ♪ (dimensione = 1) e lon (dimensione = 1) .
    * Ogni file avrà 4 variabili 1D con gli stessi nomi delle dimensioni e utilizzando la dimensione dello stesso nome, per esempio, tempo (tempo) , profondità (profondità) ♪ (La) # (I) . Queste variabili 1D dovrebbero essere incluse nell'elenco delle&lt;dataVariable&gt; è in XML del dataset.
    * Ogni file avrà una o più variabili 4D, ad esempio, temperatura dell'aria, temperatura dell'acqua, ...
    * Ogni file può avere variabili di carattere 5D, ad esempio, con dimensioni (tempo, profondità, ritardo,lon,nCharacters) .
    * Il nome del file potrebbe avere il nome del buoy all'interno del nome del file.
         
### EDDTableFromNcCFFiles{#eddtablefromnccffiles} 
[ **EDDTableFromNcCFFiles** ](#eddtablefromnccffiles)aggrega i dati aggregati dati daNetCDF  (v3 o v4)  .nc  (o[.ncml](#ncml-files)) file che utilizzano uno dei formati di file specificati dal[CFU Geometrie di smorzamento discreto (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)convenzioni. Vedi la superclasse di questa classe,[EDDTableFromFiles](#eddtablefromfiles), per informazioni su come funziona questa classe e come usarla.

Per i file che utilizzano una delle varianti multidimensionali CF DSG, utilizzare[EDDTableFromMultidimNcFiles](#eddtablefrommultidimncfiles)Invece.

Le convenzioni CF DSG definiscono dozzine di formati di file e includono numerose variazioni minori. Questa classe si occupa di tutte le variazioni di cui siamo a conoscenza, ma potremmo aver perso uno (o più) . Quindi, se questa classe non può leggere i dati dai file CF DSG, per favore[raggiungere il supporto aggiuntivo](/docs/intro#support).

Si consiglia vivamente di utilizzare[Generare i dati Programma Xml](#generatedatasetsxml)per fare una bozza ruvida deldatasets.xmlchunk per questo dataset. Puoi quindi modificarlo per affinarlo.
 
### EDDTableFromNccsvFiles{#eddtablefromnccsvfiles} 
[ **EDDTableFromNccsvFiles** ](#eddtablefromnccsvfiles)aggrega i dati da[NCCSV](/docs/user/nccsv-1.00)File ASCII .csv. Vedi la superclasse di questa classe,[EDDTableFromFiles](#eddtablefromfiles), per informazioni su come funziona questa classe e come usarla.

* Si consiglia vivamente di utilizzare[Generare i dati Programma Xml](#generatedatasetsxml)per fare una bozza ruvida deldatasets.xmlchunk per questo dataset. Puoi quindi modificarlo per affinarlo.
    
La prima cosa che GenerateDatasetsXml fa per questo tipo di dataset dopo aver risposto alle domande è stampare la struttura ncdump-like del file campione. Quindi, se si inserisce alcune risposte goofy per il primo ciclo attraverso GenerateDatasets Xml, almeno sarai in grado di vedere seERDDAP™può leggere il file e vedere quali dimensioni e variabili sono nel file. Quindi è possibile dare risposte migliori per il secondo ciclo attraverso GenerateDatasetsXml.
    
* ATTENZIONE: QuandoERDDAP™legge i file di dati NCCSV, se trova un errore su una determinata linea (ad esempio, numero errato di articoli) , registra un messaggio di avviso (" ATTENZIONE: Bad line (#) di dati" ... con un elenco delle linee sbagliate su linee successive) al[file log.txt](/docs/server-admin/additional-information#log)e poi continua a leggere il resto del file di dati. Così, è vostra responsabilità guardare periodicamente (o scrivere uno script per farlo) per quel messaggio nel registro. txt in modo da poter risolvere i problemi nei file di dati.ERDDAP™è impostato in questo modo in modo che gli utenti possono continuare a leggere tutti i dati validi disponibili anche se alcune linee del file hanno difetti.
     
### EDDTableFromNOS{#eddtablefromnos} 
[ **EDDTableFromNOS** ](#eddtablefromnos)  (DEPRECATE) gestisce i dati da unNOAA [NOS](https://opendap.co-ops.nos.noaa.gov/axis/)fonte, che utilizza[SOAP+XML](https://www.w3schools.com/xml/xml_soap.asp)per richieste e risposte. È molto specificoNOAANos e' XML. Vedere il campione EDDTableFromNOS dataset in datasets2.xml.
 
### EDDTable FromOBIS{#eddtablefromobis} 
[ **EDDTable FromOBIS** ](#eddtablefromobis)gestisce i dati da un sistema di informazioni biogeografiche oceaniche (OBIS) server (era http://www.iobis.org  ) . È possibile che non ci siano più server attivi che utilizzano questo tipo di sistema server OBIS ora fuori data.

* I server OBIS si aspettano una richiesta XML e restituiscono una risposta XML.
* Perché tutti i server OBIS servono le stesse variabili allo stesso modo (era http://iobis.org/tech/provider/questions ) , non è necessario specificare molto per impostare un Dataset OBIS inERDDAP.
* È necessario includere un "creator\\_email" attributo nel globaleaddAttributes, poiché tali informazioni vengono utilizzate all'interno della licenza. Un indirizzo email adatto può essere trovato leggendo la risposta XML dal sourceURL.
* Si può o potrebbe non essere in grado di ottenere l'attributo globale [&lt;subsetVariables&gt; (# Subsetvariables #) lavorare con un determinato server OBIS. Se provi, prova una variabile (per esempio, Nome Scientifico o Genus) .
#### EDDTable FromOBIS scheletro XML{#eddtablefromobis-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromOBIS" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceCode>...&lt;/sourceCode>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- If you read the XML response from the sourceUrl, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;source code (for example, GHMP) is the value from one of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;resource>&lt;code> tags. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- All ...SourceMinimum and Maximum tags are OPTIONAL -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceMinimum>...&lt;/longitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceMaximum>...&lt;/longitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceMinimum>...&lt;/latitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceMaximum>...&lt;/latitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMinimum>...&lt;/altitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMaximum>...&lt;/altitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- For timeSource... tags, use yyyy-MM-dd'T'HH:mm:ssZ format. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceMinimum>...&lt;/timeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceMaximum>...&lt;/timeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1.  This MUST include  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"creator\\_email" -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromParquetFiles{#eddtablefromparquetfiles} 
[ **EDDTableFromParquetFiles** ](#eddtablefromparquetfiles)gestisce i dati da[Parquet](https://parquet.apache.org/). Vedi la superclasse di questa classe,[EDDTableFromFiles](#eddtablefromfiles), per informazioni su come funziona questa classe e come usarla.

* Parquet è progettato per comprimere in modo molto efficiente, in modo che possa dare dimensioni di file più piccole rispetto ad altri formati.
* Si consiglia vivamente di utilizzare[Generare i dati Programma Xml](#generatedatasetsxml)per fare una bozza ruvida deldatasets.xmlchunk per questo dataset. Puoi quindi modificarlo per affinarlo.
* ATTENZIONE: QuandoERDDAP™legge i file di dati di Parquet, se trova un errore su una determinata linea (ad esempio, numero errato di articoli) , registra un messaggio di avviso (" ATTENZIONE: Bad line (#) di dati" ... con un elenco delle linee sbagliate su linee successive) al[file log.txt](/docs/server-admin/additional-information#log)e poi continua a leggere il resto del file di dati. Così, è vostra responsabilità guardare periodicamente (o scrivere uno script per farlo) per quel messaggio nel registro. txt in modo da poter risolvere i problemi nei file di dati.ERDDAP™è impostato in questo modo in modo che gli utenti possono continuare a leggere tutti i dati validi disponibili anche se alcune linee del file hanno difetti.
     
### EDDTEDDSOS {#eddtablefromsos} 
[ **EDDTEDDSOS** ](#eddtablefromsos)gestisce i dati da un servizio di osservazione dei sensori (SWE/[SOS](https://www.ogc.org/standards/sos)) server.

* Questo tipo di dataset aggrega i dati di un gruppo di stazioni che sono tutti serviti da unoSOSserver.
* Le stazioni servono tutti lo stesso insieme di variabili (anche se la fonte per ogni stazione non deve servire tutte le variabili) .
*   SOSi server si aspettano una richiesta XML e restituiscono una risposta XML.
* Si consiglia vivamente di utilizzare[Generare i dati Programma Xml](#generatedatasetsxml)per fare una bozza ruvida deldatasets.xmlchunk per questo dataset. Puoi quindi modificarlo per affinarlo. Non è facile generare il dataset XML perSOSset di dati a mano. Per trovare le informazioni necessarie, è necessario visitaresourceUrl+? servizioSOSTraduzione:GetCapabilities" in un browser; guardare l'XML; fare una richiesta GetObservation a mano; e guardare la risposta XML alla richiesta.
* Con l'aggiunta occasionale di nuovi tipi diSOSserver e modifiche ai vecchi server, è sempre più difficile perERDDAP™per rilevare automaticamente il tipo di server dalle risposte del server. L'uso di&lt;Sospensione all'uso (con un valore di IOOS\\_NDBC, IOOS\\_NOS,OOSTethyso QUII) è ora RACCOMANDATO. Se hai problemi con eventuali set di dati di questo tipo, prova a re-running GenerateDatasets Xml per ilSOSserver. Generazione Datasets Xml vi permetterà di provare i diversi&lt;sosServerType&gt; opzioni fino a trovare quello giusto per un determinato server.
*   SOSpanoramica:
    * # (Attivazione del sensore) eSOS  (Servizio di osservazione dei sensori) sono[Standard OpenGIS®](https://www.ogc.org/standards). Quel sito ha i documenti standard.
    * TheOGCServizi Web Specificazione comune ver 1.1.0 (OGC06-121r3) copre la costruzione di query GET e POST (vedi sezione 7.2.3 e sezione 9) .
    * Se si invia una richiesta getCapabilities xml a unSOSserver (sourceUrl+ "?service=SOSTraduzione:GetCapabilities") , si ottiene un risultato xml con un elenco di stazioni e l'osservato Proprietà per cui hanno dati.
    * Un osservatoProperty è un URI formale di riferimento a una proprietà. Per esempio, urn:ogc:phenomenon:longitude:wgs84 o https://mmisw.org/ont/cf/parameter/sea\\_water\\_temperature
 
    * Un osservatoProperty non è una variabile.
    * Più di una variabile può avere lo stesso osservato Proprietà (per esempio, dentroTemp e fuori Temp potrebbe entrambi aver osservato Proprietà https://mmisw.org/ont/cf/parameter/air\\_temperature ) .
    * Se invii una richiesta di getObservation xml a unSOSserver, si ottiene un risultato xml con le descrizioni dei nomi di campo nella risposta, unità di campo e i dati. I nomi dei campi includono longitudine, latitudine, profondità (Forse) E il tempo.
    * OgnidataVariableper un EDDTableDaSOSdeve includere un attributo "observedProperty", che identifica l'osservatoProperty che deve essere richiesto dal server per ottenere quella variabile. Spesso, diversidataVariables elencare lo stesso composito osservatoProperty.
    * I datiTipo per ognidataVariablenon può essere specificato dal server. Se è così, è necessario guardare le risposte dei dati XML dal server e assegnare appropriato [&lt;dataType&gt;s] (#datatype #) nelERDDAP™set di datidataVariabledefinizioni.
    *    (Al momento di scrivere questo) alcuniSOSi server rispondono a ottenere richieste di prenotazione per più di un osservato Proprietà semplicemente restituire i risultati per il primo deiProprietà osservate. (Nessun messaggio di errore&#33;) Vedere la richiesta dei parametri del costruttore OsservatoProprietàSeparatamente.
* EDDTEDDSOSaggiunge automaticamente
  >  <att name="[subsetVariables](#subsetvariables)">station\\_id, longitude, latitude</att>  
agli attributi globali del dataset quando viene creato il dataset.
*   SOSserver di solito esprimono[unità](#units)con il[UCIO](https://unitsofmeasure.org/ucum.html)sistema. PiùERDDAP™server express unità con[UDUNITS](https://www.unidata.ucar.edu/software/udunits/)sistema. Se è necessario convertire tra i due sistemi, è possibile utilizzare[ERDDAPIl servizio web per convertire unità UCUM da/perUDUNITS](https://coastwatch.pfeg.noaa.gov/erddap/convert/units.html).
#### EDDTEDDSOSscheletro XML{#eddtablefromsos-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromSOS" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sosServerType>...&lt;/sosServerType> &lt;!-- 0 or 1, but STRONGLY  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RECOMMENDED. This lets you specify the type of SOS server  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(so ERDDAP™ doesn't have to figure it out).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Valid values are: IOOS\\_NDBC, IOOS\\_NOS, OOSTethys, and WHOI. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;responseFormat>...&lt;/responseFormat> &lt;!-- 0 or 1. Use this only if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;you need to override the default responseFormat for the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;specified sosServerType.  -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;stationIdSourceName>...&lt;/stationIdSourceName> &lt;!-- 0 or 1.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Default="station\\_id". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceName>...&lt;/longitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceName>...&lt;/latitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceName>...&lt;/altitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMinimum>...&lt;/altitudeSourceMinimum> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMaximum>...&lt;/altitudeSourceMaximum> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;altitudeMetersPerSourceUnit>](#altitudemeterspersourceunit)...&lt;/altitudeMetersPerSourceUnit>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceName>...&lt;/timeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceFormat>...&lt;/timeSourceFormat>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- timeSourceFormat MUST be either  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* For numeric data: a [UDUnits](https://www.unidata.ucar.edu/software/udunits/)\\-compatible string (with the format  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"*units* since *baseTime*") describing how to interpret  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;source time values (for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"seconds since 1970-01-01T00:00:00Z"), where the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;base time is an ISO 8601:2004(E) formatted date time  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;string (yyyy-MM-dd'T'HH:mm:ssZ).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* For String date time data: specify  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[units suitable for string times](#string-time-units)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;describing how to interpret string times  (for example, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ISO8601TZ\\_FORMAT "yyyy-MM-dd'T'HH:mm:ssZ"). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;observationOfferingIdRegex>...&lt;/observationOfferingIdRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- Only observationOfferings with IDs (usually the station names)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;which match this [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) will be included  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in the dataset (".+" will catch all station names). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;requestObservedPropertiesSeparately>true|false(default)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/requestObservedPropertiesSeparately>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* Each dataVariable MUST include the [dataType](#datatype) tag.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* Each dataVariable MUST include the observedProperty attribute.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* For IOOS SOS servers, \\*every\\* variable returned in the text/csv  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;response MUST be included in this ERDDAP™ dataset definition. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableFromThreddsFiles{#eddtablefromthreddsfiles} 
[ **EDDTableFromThreddsFiles** ](#eddtablefromthreddsfiles)  (deprecato) aggrega i file di dati con diverse variabili, ognuna con una o più dimensioni condivise (per esempio, tempo, altitudine (o profondità) , latitudine, longitudine) , e servito da un[THREDOPeNDAPserver](https://www.unidata.ucar.edu/software/tds/).

* Questo tipo di dataset è **DEPRECATE** . La soluzione più recente e più generale è quella di utilizzare[cache opzione FromUrl per EDDTable Da Fili](#cachefromurl)  (o una variante) , che fa una copia locale dei file remoti e serve i dati dai file locali. The&lt;opzione cacheFromUrl&gt; può essere utilizzato con qualsiasi tipo di file di dati tabular da qualsiasi fonte web-based che pubblica un elenco di file simile a directory. **   
Se non riesci a farlo funzionare per qualche motivo, e-mail Chris. John a noaa.gov.
Se non ci sono reclami prima del 2020, questo tipo di dataset può essere rimosso. ** 
* Si consiglia vivamente di utilizzare[Generare i dati Programma Xml](#generatedatasetsxml)per fare una bozza ruvida deldatasets.xmlchunk per questo dataset. Puoi quindi modificarlo per affinarlo.
* Nella maggior parte dei casi, ogni file ha più valori per la sinistra (primo) dimensione, per esempio, tempo.
* I file spesso (ma non devi) hanno un unico valore per le altre dimensioni (per esempio, altitudine (o profondità) , latitudine, longitudine) .
* I file possono avere variabili di carattere con una dimensione aggiuntiva (per esempio, nCharacters) .
* I server THREDDS possono essere identificati dai "/thredds/" negli URL. Per esempio,
```
    https://www.ncei.noaa.gov/thredds/catalog/uv/6h\\_strs\\_agg/catalog.html
```
* I server THREDDS hanno cataloghi in vari luoghi. Questa classe REQUIRES che l'URL include "/thredds/catalog/". Di solito è possibile trovare questa variabile iniziando in un browser nel catalogo radice, e poi cliccando attraverso il subcatalogo desiderato.
* Questa classe legge i file catalog.xml serviti da THREDDS con le liste di&lt;catalogoRefs&gt; (riferimenti a ulteriori cataloghi.xml sotto-file) e&lt;dataset&gt; (file di dati) .
* The&lt;l'impostazione fileDir&gt; è ignorata. Poiché questa classe scarica e fa una copia locale di ogni file di dati remoto,ERDDAP™forza il file Dir a essere *BigParentDirectory* /copia/ *datasetID* /.
* Per&lt;sourceUrl&gt;, utilizzare l'URL del file catalog.xml per il dataset nel server THREDDS, ad esempio: per questo URL che può essere utilizzato in un browser web,
     https://data.nodc.noaa.gov/thredds/catalog/nmsp/wcos/catalog.html  \\[2020-10-21 Questo server non è più affidabile disponibile.\\]♪
uso&lt;sourceUrl&gt; https://data.nodc.noaa.gov/thredds/catalog/nmsp/wcos/catalog.xml &lt;/sourceUrl&gt;
     (ma mettilo su una linea) .
* Dal momento che questa classe scarica sempre e fa una copia locale di ogni file di dati remoto, non si dovrebbe mai avvolgere questo set di dati in[EDDTableCopy](#eddtablecopy).
* Questo tipo di dataset supporta un tag OPTIONAL, raramente utilizzato, speciale,&lt;specialeMode&gt; *modalità* &lt;/specialMode&gt; che può essere utilizzato per specificare che le regole speciali e codificate devono essere utilizzate per determinare quali file devono essere scaricati dal server. Attualmente, l'unico valido *modalità* è SAMOS che viene utilizzato con set di dati da https://tds.coaps.fsu.edu/thredds/catalog/samos per scaricare solo i file con l'ultimo numero di versione.
* Vedi la superclasse di questa classe,[EDDTableFromFiles](#eddtablefromfiles), per informazioni su come funziona questa classe e come usarla.
* Vedere gli esempi 1D, 2D, 3D e 4D per[EDDTableFromNcFiles](#eddtablefromncfiles).
     
### EDDTEDDWFSFile{#eddtablefromwfsfiles} 
[ **EDDTEDDWFSFile** ](#eddtablefromwfsfiles)  (DEPRECATE) fa una copia locale di tutti i dati da unArcGISMappaServerWFSserver in modo che i dati possano essere ri-servati rapidamente aERDDAP™utenti.

* È necessario specificare un appositamente formattatosourceUrlattributo globale da raccontareERDDAP™come richiedere informazioni sulle funzionalità dal server. Si prega di utilizzare questo esempio come modello:
```
    <att name="sourceUrl">http://*someUrl/dir1/dir2*/MapServer/WFSServer?request=GetFeature&amp;service=WFS&amp;typename=aasg:BoreholeTemperature&amp;format=&quot;text/xml;%20subType=gml/3.1.1/profiles/gmlsf/1.0.0/0"</att>  
```
     (ma metti tutto su una linea) 
* È necessario aggiungere un attributo globale speciale per direERDDAP™come identificare i nomi dei pezzi di dati che dovrebbero essere scaricati. Questo probabilmente funzionerà per tutti EDDTableFromWFSDataset file:
```
    <att name="rowElementXPath">/wfs:FeatureCollection/gml:featureMember</att>
```
* Dal momento che questa classe scarica sempre e fa una copia locale di ogni file di dati remoto, non si dovrebbe mai avvolgere questo set di dati in[EDDTableCopy](#eddtablecopy).
* Vedi la superclasse di questa classe,[EDDTableFromFiles](#eddtablefromfiles), per ulteriori informazioni su come funziona questa classe e come usarla.
     
### EDDTableAggregateRows{#eddtableaggregaterows} 
[ **EDDTableAggregateRows** ](#eddtableaggregaterows)può creare un set di dati EDDTable da un gruppo di set di dati EDDTable "bambino".

* Ecco alcuni usi per EDDTableAggregateRows:
    * È possibile creare un dataset EDDTableAggregateRows da due diversi tipi di file o fonti di dati, ad esempio, un dataset con dati fino alla fine del mese scorso memorizzati in.ncFile CF e un dataset con dati per il mese corrente memorizzato in un database relazionale.
    * Si potrebbe fare un EDDTableAggregateRows dataset per affrontare una modifica dei file sorgente (per esempio, il formato di tempo cambiato, o un nome variabile cambiato, o dati Tipologiascale\\_factor/add\\_offsetcambiato) . In questo caso, un bambino otterrebbe dati da file fatti prima della modifica e l'altro bambino otterrebbe dati da file fatti dopo la modifica. Questo uso di EDDTableAggregateRows è un'alternativa all'utilizzo[NCML](#ncml-files)o[NCO](#netcdf-operators-nco). A meno che non ci sia una caratteristica distintiva nei nomi dei file (in modo da poter usare&lt;fileNameRegex&gt; per determinare quale file appartiene a quale dataset bambino), è probabilmente necessario memorizzare i file per i due set di dati per bambini in diverse directory.
    * È possibile creare un dataset EDDTableAggregateRows che ha un sottoinsieme condiviso di variabili di uno o più analoghi ma diversi set di dati, ad esempio, un dataset che rende un Dataset Profilo dalla combinazione di un Dataset Profilo, un Dataset TimeSeriesProfile e un Dataset TrajectoryProfile (che hanno alcune variabili diverse e alcune variabili in comune -- in tal caso dovrete fare varianti speciali per i dataset bambino, con solo le variabili in-comune) .
    * Si potrebbe avere diversi dataset standalone, ciascuno con lo stesso tipo di dati, ma da una stazione diversa. Si potrebbe lasciare intatti quei dataset, ma anche creare un EDDTableAggregateRows dataset che ha dati da tutte le stazioni -- ciascuno dei dataset bambino potrebbe essere un semplice[EDDTableFromErddap](#eddfromerddap), che indica uno dei dataset della stazione esistente. Se lo fai, dare a ciascuno dei dataset EDDTableFromErddap un diversodatasetIDrispetto ai dataset standalone originali, ad esempio, applicando "bambino" all'originaledatasetID.
* Ogni bambino&lt;dataset&gt; specificato deve essere un set di dati completo, come se si trattasse di un set di dati stand-alone. Ciascuno deve avere lo stesso[dataVariable#](#datavariable), nello stesso ordine, con lo stesso[destinationName#](#destinationname)♪[dati Tipi](#datatype)♪[missing\\_value#](#missing_value)♪[\\_FillValori](#missing_value)e[unità](#units). I metadati per ogni variabile per il dataset EDDTableAggregateRows vengono da variabili nel primo dataset bambino, ma EDDTableAggregateRows aggiornerà le[actual\\_range](#actual_range)metadati per essere la gamma reale per tutti i bambini.
* Raccomandazione: Ottenere ciascuno dei set di dati del bambino che lavorano come set di dati stand-alone. Quindi provare a fare il set di dati EDDTableAggregateRows tagliando e incollandodatasets.xmlchunk per ciascuno nel nuovo EDDTableAggregate Righe dataset.
* Dataset Default Ordinare -- L'ordine dei set di dati del bambino determina l'ordine generale di default dei risultati. Naturalmente, gli utenti possono richiedere un ordine diverso per una data serie di risultati tramite appending &orderBy (" *elenco separato da virgola delle variabili* ") alla fine della loro domanda.
* La "fonte"[globale Attributi](#global-attributes)per il EDDTableAggregateRows è il globale combinatoAttributi dal primo set di dati bambino. L'Aggregato EDDTable Le righe possono avere un globale&lt;addAttributes&gt; fornire attributi globali aggiuntivi o sovrascrivere gli attributi globali di origine.
#### EDDTableAggregate Scheletrico di righe XML{#eddtableaggregaterows-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableAggregateRows" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDTableCopy{#eddtablecopy} 
[ **EDDTableCopy** ](#eddtablecopy)può fare una copia locale di molti tipi di set di dati EDDTable e quindi conservare i dati rapidamente dalla copia locale.

* EDDTableCopy (e per i dati della griglia,[EDDGridCopia](#eddgridcopy)) è molto facile da usare e molto efficace **soluzione ad alcuni dei maggiori problemi con il servizio di dati da fonti di dati remoti:** 
    * L'accesso ai dati da una fonte di dati remota può essere lento.
        * Possono essere lenti perché sono intrinsecamente lenti (ad esempio, un tipo inefficiente di server) ♪
        * perché sono sopraffatti da troppe richieste,
        * o perché il server o il server remoto è limitato alla larghezza di banda.
    * Il set di dati remoto a volte non è disponibile (di nuovo, per una varietà di motivi) .
    * Affidarsi a una fonte per i dati non scala bene (per esempio, quando molti utenti e moltiERDDAPs utilizzarlo) .
         
* Come funziona -- EDDTableCopy risolve questi problemi facendo automaticamente e mantenendo una copia locale dei dati e servendo i dati dalla copia locale.ERDDAP™può servire i dati dalla copia locale molto, molto rapidamente. E fare e utilizzare una copia locale allevia l'onere sul server remoto. E la copia locale è un backup dell'originale, che è utile nel caso qualcosa accade all'originale.
    
Non c'è niente di nuovo nel fare una copia locale di un set di dati. Ciò che è nuovo qui è che questa classe lo rende\\*facile\\*creare e creare\\*mantenere\\*una copia locale dei dati da una\\*varietà\\*di tipi di fonti di dati remote e\\*aggiungi metadati\\*durante la copia dei dati.
    
#### EDDTableCopy vs&lt;cacheFromUrl&gt;{#eddtablecopy-vs-cachefromurl} 
&lt;cacheFromUrl&gt; è un'alternativa a EDDTableCopy. Lavorano in modo diverso.

* EDDTable Copiare le opere richiedendo pezzi di dati da un servizio remoto e memorizzare quei pezzi nei file locali. Così, EDDTableCopy è utile in alcuni casi in cui i dati sono accessibili tramite un servizio remoto.
* [&lt;Condividi su Google (# Cachefromurl #) scarica i file esistenti elencati su un sito web remoto.&lt;cacheFromUrl&gt; è più facile da usare e più affidabile in quanto può facilmente dire quando c'è un nuovo file di dati remoto o quando un file di dati remoto è cambiato e quindi deve essere scaricato.

Se ci sono situazioni in cui EDDTableCopy o&lt;cacheFromUrl&gt; potrebbe essere utilizzato, utilizzare&lt;cacheFromUrl&gt; perché è più facile e più affidabile.
     
#### &lt;estrattoDestinazione Nomi &gt;{#extractdestinationnames} 
EDDTable Copia rende la copia locale dei dati richiedendo pezzi di dati dal set di dati remoto. EDDTable Copia determina quali pezzi da richiedere richiedendo il &distinct () valori per&lt;estrattoDestinazioneNames&gt; (specificato neldatasets.xml, vedi sotto) , che sono i nomi di destinazione separati dallo spazio di variabili nel set di dati remoto. Per esempio,
```
    <extractDestinationNames>drifter profile</extractDestinationNames>  
```
potrebbe produrre distinte combinazioni di valori di drifter=tig17,profile=1017, drifter=tig17,profile=1095, ... drifter=une12,profile=1223, drifter=une12,profile=1251, ....

In situazioni in cui una colonna (per esempio, profilo) può essere tutto ciò che è necessario per identificare in modo univoco un gruppo di righe di dati, se ci sono un gran numero di, per esempio, profili, può essere utile specificare anche un estratto aggiuntivo Destinazione Nome (per esempio, drifter) che serve a suddividere i profili. Questo porta a meno file di dati in una determinata directory, che può portare ad un accesso più veloce.
    
#### File locali{#local-files} 
Ogni pezzo di dati viene memorizzato in un separatoNetCDFfile in una sottodirectory *BigParentDirectory* /copia/ *datasetID* / (come specificato[setup.xml](/docs/server-admin/deploy-install#setupxml)) . C'è un livello sottodirectory per tutti, ma l'ultimo estrattoDestinationName. Ad esempio, i dati per tig17+1017 sarebbero memorizzati in
     *BigParentDirectory* /copia/campioneDataset/tig17/1017.nc.
Ad esempio, i dati per une12+1251, sarebbero memorizzati in
     *BigParentDirectory* /copia/campioneDataset/une12/1251.nc.
Le directory e i nomi dei file creati dai valori dei dati vengono modificati per renderli sicuri (per esempio, gli spazi sono sostituiti da "x20") - Questo non riguarda i dati effettivi.
     
#### Nuovi dati{#new-data} 
Ogni volta EDDTable Copia viene ricaricata, controlla il set di dati remoto per vedere quali pezzi distinti sono disponibili. Se il file per un pezzo di dati non esiste già, una richiesta per ottenere il pezzo viene aggiunta a una coda.ERDDAP's taskThread elabora tutte le richieste in coda per pezzi di dati, one-by-one. È possibile vedere le statistiche per il compitoAttività del pane sul[Pagina di stato](/docs/server-admin/additional-information#status-page)e nel[Rapporto giornaliero](/docs/server-admin/additional-information#daily-report). (Sì,ERDDAP™potrebbe assegnare più compiti a questo processo, ma che utilizzerebbe un sacco di larghezza di banda, memoria e tempo della CPU della sorgente di dati remota, e un sacco di tempo localeERDDAPLa larghezza di banda, la memoria e il tempo della CPU, nessuno dei quali è una buona idea.) 
    
NOTA: La prima volta che un EDDTableCopy è caricato, (se tutto va bene) un sacco di richieste per pezzi di dati saranno aggiunti all'attivitàPadre del pane, ma non saranno stati creati file di dati locali. Così il costruttore fallirà, ma taskThread continuerà a lavorare e creare file locali. Se tutto va bene, il taskThread farà alcuni file di dati locali e il prossimo tentativo di ricaricare il dataset (in ~15 minuti) avrà successo, ma inizialmente con una quantità molto limitata di dati.
    
NOTA: Dopo che il dataset locale ha alcuni dati e appare nel vostroERDDAP, se il dataset remoto è temporaneamente o permanentemente non accessibile, il dataset locale continuerà a funzionare.
    
ATTENZIONE: Se il set di dati remoto è grande e/o il server remoto è lento (questo è il problema, non è vero?&#33;) , ci vorrà molto tempo per fare una copia completa locale. In alcuni casi, il tempo necessario sarà inaccettabile. Ad esempio, la trasmissione di 1 TB di dati su una linea T1 (0.15 GB/s) richiede almeno 60 giorni, in condizioni ottimali. Inoltre, utilizza un sacco di larghezza di banda, memoria e tempo della CPU sui computer remoti e locali. La soluzione è quella di inviare un disco rigido all'amministratore del set di dati remoto in modo che s/he possa fare una copia del set di dati e inviare il disco rigido indietro a voi. Utilizzare questi dati come punto di partenza e EDDTableCopy aggiungerà i dati ad esso. (Questo è il modo in cui Amazon's EC2 Cloud Service ha usato per gestire il problema, anche se il loro sistema ha un sacco di larghezza di banda.) 
    
ATTENZIONE: Se una data combinazione di valori scompare da un set di dati remoto, EDDTableCopy NON elimina il file copiato locale. Se vuoi, puoi cancellarlo da solo.
    
#### Tabella&lt;checkSourceData&gt;{#tablecopy-checksourcedata} 
Thedatasets.xmlper questo dataset può avere un tag opzionale
```
    <checkSourceData>true</checkSourceData>  
```
Il valore predefinito è vero. Se/quando lo si imposta a false, il dataset non controllerà mai il dataset sorgente per vedere se ci sono dati aggiuntivi disponibili.
     
#### Uso consigliato{#recommended-use} 
1. Creare&lt;Dataset &gt; ingresso (il tipo nativo, non EDDTableCopy) per la fonte di dati remota. **Funziona correttamente, inclusi tutti i metadati desiderati.** 
2. Se è troppo lento, aggiungere il codice XML per avvolgerlo in un set di dati EDDTableCopy.
    * Utilizzare un diversodatasetID  (forse cambiandodatasetIDdel vecchiodatasetIDleggermente) .
    * Copiare&lt;accessibile A &gt;&lt;reloadEveryNMinutes&gt; e&lt;onChange&gt; dal remoto XML di EDDTable all'XML di EDDTableCopy. (I loro valori per la materia EDDTableCopy; i loro valori per l'insieme dei dati interni diventano irrilevanti.) 
    * Creare&lt;estrattoDestinazioneNames&gt; tag (vedi sopra) .
    *   &lt;orderExtractBy&gt; è un elenco separato di nomi variabili di destinazione OPTIONAL nello spazio remoto. Quando ogni pezzo di dati viene scaricato dal server remoto, il blocco sarà ordinato da queste variabili (dalla prima variabile, poi dalla seconda variabile se la prima variabile è legata, ...) . In alcuni casi,ERDDAP™sarà in grado di estrarre i dati più velocemente dai file di dati locali se la prima variabile nell'elenco è una variabile numerica ("time"conta come variabile numerica) . Ma scegliere queste variabili in un modo appropriato per il set di dati.
3.  ERDDAP™farà e manterrà una copia locale dei dati.
         
* ATTENZIONE: EDDTableCopy assume che i valori di dati per ogni pezzo non cambiano mai. Se / quando lo fanno, è necessario eliminare manualmente i file chunk in *BigParentDirectory* /copia/ *datasetID* / che è cambiato e[bandiera](/docs/server-admin/additional-information#flag)il set di dati da ricaricare in modo che i pezzi eliminati saranno sostituiti. Se si dispone di un abbonamento e-mail al dataset, si otterrà due e-mail: una quando il dataset prima ricarica e inizia a copiare i dati, e un'altra quando il dataset carica di nuovo (automaticamente) e rileva i nuovi dati locali.
     
* Cambiare i metadati -- Se hai bisogno di cambiareaddAttributeso modificare l'ordine delle variabili associate al dataset sorgente:
    1. CambiareaddAttributesper il dataset sorgente indatasets.xml, come necessario.
    2. Eliminare uno dei file copiati.
    3. Impostare un[bandiera](/docs/server-admin/additional-information#flag)per ricaricare immediatamente il dataset. Se si utilizza una bandiera e si dispone di un abbonamento e-mail al dataset, si otterrà due e-mail: una quando il dataset ricarica prima e inizia a copiare i dati, e un'altra quando il dataset carica di nuovo (automaticamente) e rileva i nuovi dati locali.
    4. Il file eliminato verrà rigenerato con i nuovi metadati. Se il dataset sorgente non è mai disponibile, il dataset EDDTableCopy otterrà i metadati dal file rigenerato, dal momento che è il file più giovane.
         
*   [EDDGridCopia](#eddgridcopy)è molto simile a EDDTableCopy, ma funziona con set di dati grigliati.
#### EDDTableCopy scheletro XML{#eddtablecopy-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableCopy" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;extractDestinationNames>...&lt;/extractDestinationNames>  &lt;!-- 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;orderExtractBy>...&lt;/orderExtractBy> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or false  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;checkSourceData>](#tablecopy-checksourcedata)...&lt;/checkSourceData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 -->  
>&nbsp;&nbsp;&lt;/dataset>  

- - No.

## Dettagli{#details-1} 

Ecco le descrizioni dettagliate dei tag e degli attributi comuni.

### &lt;angularDegreeUnits&gt;{#angulardegreeunits} 
* [ ** &lt;Azioni generali ** ] (#angolarità) è un tag OPTIONAL raramente usato all'interno di un&lt;erddapDatasets&gt; tag indatasets.xmlche contiene un elenco separato da virgola di stringhe di unità cheERDDAP™dovrebbe trattare come unità di gradi angolari. Se una variabile ha una di queste unità,tabledap'orderByMeanil filtro calcola il mezzo in modo speciale, quindi riferisci il mezzo come valore da -180 a 180. VediERDDAP's EDStatic.java file di codice sorgente per l'elenco predefinito corrente. Eventuali modifiche al valore di questo tag avranno effetto la prossima voltaERDDAP™leggidatasets.xml, anche in risposta a un set di dati[bandiera](/docs/server-admin/additional-information#flag).
### &lt;angularDegreeTrueUnits&gt;{#angulardegreetrueunits} 
* [ ** &lt;angolare Titoli di studio ** ] (Revisione:) è un tag OPTIONAL raramente usato all'interno di un&lt;erddapDatasets&gt; tag indatasets.xmlche contiene un elenco separato da virgola di stringhe di unità cheERDDAP™dovrebbe trattare come gradi angolari unità vere. Se una variabile ha una di queste unità,tabledap'orderByMeanil filtro calcola il mezzo in modo speciale, quindi segnala il mezzo come valore da 0 a 360. VediERDDAP's EDStatic.java file sorgente per l'elenco predefinito corrente. Eventuali modifiche al valore di questo tag avranno effetto la prossima voltaERDDAP™leggidatasets.xml, anche in risposta a un set di dati[bandiera](/docs/server-admin/additional-information#flag).
     
### &lt;comuneStandardNames&gt;{#commonstandardnames} 
* [ ** &lt;comuneStandardNames ** ] (#commonstandardnames) è un tag OPTIONAL raramente usato all'interno di un&lt;erddapDatasets&gt; tag indatasets.xmlper specificare un elenco separato da virgola di comune[Nomi standard CF](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html). Ad esempio,
```
    <commonStandardNames>air\\_pressure, ..., wind\\_to\\_direction</commonStandardNames>  
```
Questo elenco viene utilizzato in DataProviderForm3.html come convenienza per gli utenti.
Se si desidera fornire queste informazioni indatasets.xml, avviare copiando l'elenco predefinito corrente in&lt;DEFAULT\\_comuneStandardNames&gt; inERDDAP'
\\[tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noa/pfel/erddap/util/messages.xml file.
     
### &lt;cacheMinutes&gt;{#cacheminutes} 
* [ ** &lt;cacheMinuts&gt; ** ] (#cacheminutes) è un tag OPTIONAL raramente usato all'interno di un&lt;erddapDatasets&gt; tag indatasets.xmlper specificare l'età (in minuti) in cui i file nella cache devono essere eliminati (default = 60) . Ad esempio,
```
    <cacheMinutes>60</cacheMinutes>  
```
In generale, solo i file di immagine (perché le stesse immagini sono spesso richieste ripetutamente) e.ncfile (perché devono essere completamente creati prima di inviare all'utente) sono in cache. Anche se potrebbe sembrare come una data richiesta dovrebbe sempre restituire la stessa risposta, che non è vero. Per esempio, untabledaprichiesta che include il tempo *alcuni Tempo* cambierà quando arriveranno nuovi dati per il dataset. E una richiesta di grigliata che include\\[Ultimo\\]per la dimensione del tempo cambierà quando nuovi dati arrivano per il dataset. Eventuali modifiche al valore di questo tag avranno effetto la prossima voltaERDDAP™leggidatasets.xml, anche in risposta a un set di dati[bandiera](/docs/server-admin/additional-information#flag). PrimaERDDAP™v2.00, questo è stato specificato in setup.xml, che è ancora permesso ma scoraggiato.
     
### &lt;convertInterpolateRequestCSVExample&gt;{#convertinterpolaterequestcsvexample} 
* [ ** &lt;ConvertireInterpolateRequestCSVExample&gt; ** ] (#convertinterpolarequestcsvexample) è un tag OPTIONAL all'interno di un&lt;erddapDatasets&gt; tag indatasets.xml \\[a partire daERDDAP™V2.10\\]che contiene un esempio che verrà mostrato nella pagina web del convertitore Interpolato. Il valore predefinito è: jplMURSST41/analyed\\_sst/Bilinear/4 .
### &lt;convertInterpolateDatasetIDVariableList&gt;{#convertinterpolatedatasetidvariablelist} 
* [ ** &lt;conversioneInterpolareDatasetIDVariableList&gt; ** ] (#convertinterpolatedatasetidvariablelist) è un tag OPTIONAL all'interno di un&lt;erddapDatasets&gt; tag indatasets.xml \\[a partire daERDDAP™V2.10\\]che contiene un elenco CSV didatasetID/variabile Esempi di nome che saranno utilizzati come suggerimenti dalla pagina web del convertitore Interpolate. Il valore predefinito è: jplMURSST41/analyed\\_sst.
### &lt;convertToPublicSourceUrl&gt;{#converttopublicsourceurl} 
* [ ** &lt;convert toPublicSourceUrl&gt; ** ] (#converttopublicsourceurl) è un tag OPTIONAL all'interno di un&lt;erddapDatasets&gt; tag indatasets.xmlche contiene un attributo "da" e "a" che specifica come convertire un corrispondente localesourceUrl  (di solito un numero IP) in un pubblicosourceUrl  (un nome di dominio) . "da" deve avere la forma "\\[qualcosa\\]//\\[qualcosa\\]. Ci possono essere 0 o più di questi tag. Per ulteriori informazioni vedere [&lt;sourceUrl&gt; (#sourceurl #) . Per esempio,
```
    <convertToPublicSourceUrl from="https://192.168.31.18/" to="https://oceanwatch.pfeg.noaa.gov/" />  
```
causerà una corrispondenza localesourceUrl  (come https://192.168.31.18/thredds/dodsC/satellite/BA/ssta/5day )   
in un pubblicosourceUrl  ( https://oceanwatch.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day ) .
Eventuali modifiche al valore di questo tag avranno effetto la prossima voltaERDDAP™leggidatasets.xml, anche in risposta a un set di dati[bandiera](/docs/server-admin/additional-information#flag).

Ma, per motivi di sicurezza e per motivi legati al sistema di abbonamento, **Non usare questo TAG&#33;**   
Invece, utilizzare sempre il nome di dominio pubblico nel&lt;sourceUrl&gt; tag e utilizzare[Tabella /etc/hosts](https://linux.die.net/man/5/hosts)sul server per convertire i nomi di dominio locali in numeri IP senza utilizzare un server DNS. È possibile verificare se un nome di dominio viene correttamente convertito in un numero IP utilizzando:
p. *alcuni.domain.name*   
     
### dati: immagine/png;base64,{#dataimagepngbase64} 
* Quando un utente richiede.htmlTablerisposta daERDDAP™, se i dati in una cella di stringa contengono i dati: immagine/png;base64, seguito da un'immagine .png codificata base64,ERDDAP™visualizzerà un'icona (in modo che l'utente può vedere l'immagine se si accumulano sopra di esso) e pulsanti per salvare il testo o l'immagine nella clipboard. Questa funzione è stata aggiunta inERDDAP™v2.19 di Marco Alba.
### drawLandMask {#drawlandmask} 
*   [ **drawLandMask** ](#drawlandmask)specifica l'impostazione predefinita che controlla quando e come la maschera di terra dovrebbe essere disegnata quandoERDDAP™disegna una mappa. Può essere specificato in tre diversi luoghi indatasets.xml  (elencato da più basso a più alta priorità) :
    
    1. SedrawLandMaskè specificato all'interno&lt;erddapDatasets&gt; (non connesso a qualsiasi dataset specifico) , quindi specifica il valore predefinito didrawLandMaskper tutte le variabili in tutti i dataset. Per esempio,
    ```
        <drawLandMask>under</drawLandMask>  
    ```
Eventuali modifiche al valore di questo tag avranno effetto la prossima voltaERDDAPleggidatasets.xml.
Se questo tag non è presente, il valore predefinito sottostante è sotto.
         
    2. SedrawLandMaskè specificato come attributo globale di un dato dataset, quindi specifica il valore predefinito didrawLandMaskper tutte le variabili in quel dataset, sovrascrivendo qualsiasi impostazione di priorità inferiore. Per esempio,
    ```
        <att name="drawLandMask">under</att>  
    ```
Eventuali modifiche al valore di questo tag avranno effetto la prossima voltaERDDAP™ricarica quel dataset.
         
    3. SedrawLandMaskè specificato come attributo di una variabile in un dato dataset, quindi specifica il valore predefinito didrawLandMaskper quella variabile in quel dataset, sovrascrivendo qualsiasi impostazione di priorità inferiore. Per esempio,
    ```
        <att name="drawLandMask">under</att>  
    ```
Eventuali modifiche al valore di questo tag avranno effetto la prossima voltaERDDAP™ricarica quel dataset.
    
Un utente può sovrascrivere il default (dove è specificato) selezionando un valore per "Maschera di terra" da un elenco a discesa sulla pagina web Make A Graph del set di dati, o includendo &.land= *valore* nell'URL che richiede una mappa daERDDAP.
    
In tutte le situazioni, ci sono 4 valori possibili per l'attributo:
    
    * "sotto" disegna la maschera di terra prima che disegna i dati sulla mappa.
Per i set di dati grigliati, la terra appare come un colore grigio chiaro costante.
Per i set di dati tabulari, "sotto" mostra i dati topografici su terra e oceani.
    * "fuori"... Per i dataset grigliati, "over" disegna il landmask dopo che disegna i dati sulle mappe in modo che maschera qualsiasi dato sulla terra. Per i set di dati tabulari, "over" mostra la miriade dell'oceano e un grigio chiaro costante dove c'è terra, entrambi disegnati sotto i dati.
    * "outline" disegna solo il profilo della maschera di terra, confini politici, laghi e fiumi.
    * "off" non disegna niente.
### &lt;emailDiagnosticsToErdData&gt;{#emaildiagnosticstoerddata} 
* [ ** &lt;emailDiagnosticsToErdData&gt; ** ] (#emaildiagnosticstoerddata) è un tag OPTIONAL raramente usato all'interno di un&lt;erddapDatasets&gt; tag indatasets.xml. Il valore del tag può essere vero (il default) o falso. Se è vero,ERDDAP™e-mail la traccia stack a Chris. John a Noaa. Vai. (ilERDDAP™team di sviluppo) . Questo dovrebbe essere sicuro e sicuro in quanto nessuna informazione riservata (ad esempio, la richiesta) è incluso nell'email. Questo dovrebbe consentire di catturare eventuali bug oscuri e totalmente inaspettati che portano a NullPointerExceptions. In caso contrario, l'utente vede le eccezioni, ma ilERDDAP™il team di sviluppo non (così non sappiamo che c'è un problema che deve essere risolto) .
     
### &lt;graficoBackgroundColor&gt;{#graphbackgroundcolor} 
* [ ** &lt;grafoBackgroundColore &gt; ** ] (#graphbackgroundcolor) è un tag OPTIONAL raramente usato all'interno di un&lt;erddapDatasets&gt; tag indatasets.xmlper specificare il colore di sfondo predefinito sui grafici. Questo colpisce quasi tutti i grafici. Ci sono alcune situazioni non interessate. Il colore è specificato come un valore esadecimale a 8 cifre nella forma 0xAARRGGBB, dove AA, RR, GG e BB sono i componenti opacità, rosso, verde e blu, rispettivamente. "0x" è sensibile al caso, ma le cifre esadecimali non sono sensibili al caso. Per esempio, un completamente opaco (?) colore verde-blu con rosso=22, verde=88, blu=ee sarebbe 0xff2288ee. Il bianco opaco è 0xffffffff. Il default è blu chiaro opaco (0xfcccccc) , che ha il vantaggio di essere diverso dal bianco, che è un colore importante in molte tavolozze utilizzate per disegnare i dati. Per esempio,
    ```
    <graphBackgroundColor>0xffffffff</graphBackgroundColor>  
    ```
Eventuali modifiche al valore di questo tag avranno effetto la prossima voltaERDDAP™leggidatasets.xml, anche in risposta a un set di dati[bandiera](/docs/server-admin/additional-information#flag).
### &lt;ipAddressMaxRequests&gt;{#ipaddressmaxrequests} 
* [ ** &lt;ipAddressMaxRequests&gt; ** ] (#ipaddressmaxrequeste) è un tag opzionale raramente usato (primo supportato conERDDAP™2, del regolamento (CEE) n.) all'interno di&lt;erddapDatasets&gt; tag indatasets.xmlche fa parte di un sistema per limitare la capacità di utenti legittimi eccessivamente aggressivi e utenti dannosi di fare un gran numero di richieste simultanee che degradano le prestazioni del sistema per altri utenti. IpAddress MaxRequests specifica il numero massimo di richieste simultanee che saranno accettate da qualsiasi indirizzo IP specifico. Ulteriori richieste riceveranno un errore HTTP 429: Troppe richieste. I piccoli file statici in erddap/download/ erddap/images/ NON sono esenti da questo conteggio. Il valore predefinito è 15. Il massimo consentito è 1000, che è pazzo alto -- non farlo&#33;ERDDAP™non accetterà un numero inferiore a 6 perché molti utenti legittimi (in particolare browser web eWMSclienti) effettuare fino a 6 richieste alla volta. TheERDDAP™Quotidiano Report e le informazioni simili scritte al file log.txt con ogni Major Dataset Reload, includeranno ora una parte delle richieste di questi indirizzi IP sotto il titolo "Indirizzo IP del Richiedente (Troppe richieste) ".
Eventuali modifiche al valore di questo tag avranno effetto la prossima voltaERDDAP™leggidatasets.xml, anche in risposta a un set di dati[bandiera](/docs/server-admin/additional-information#flag).
    
La sezione "Major LoadDatasets Time Series" di status.html include una colonna "tooMany" che elenca il numero di richieste che hanno superato l'impostazione di ipAddressMaxRequests di un utente e quindi ha visto un errore "Too Many Requests". Questo ti permette di vedere facilmente quando ci sono attivi utenti legittimi eccessivamente aggressivi e utenti dannosi in modo da poter (facoltativamente) guardare nel file log.txt e decidere se si desidera lista nera quegli utenti.
    
Non c'e' niente di specifico che non vada nell'accettare questo ad un numero piu' alto. Sta a te decidere. Ma in questo modo permette / incoraggia le persone a creare sistemi che utilizzano un gran numero di fili per lavorare su progetti e quindi non dà loro alcun feedback che ciò che stanno facendo non è ottenere loro alcun beneficio.
### &lt;ipAddressMaxRequestsActive&gt;{#ipaddressmaxrequestsactive} 
* [ ** &lt;ipAddressMaxRequestsActive&gt; ** ] (#ipaddressmaxrequestsattivi) è un tag opzionale raramente usato (primo supportato conERDDAP™2, del regolamento (CEE) n.) all'interno di&lt;erddapDatasets&gt; tag indatasets.xmlche fa parte di un sistema per limitare la capacità di utenti legittimi eccessivamente aggressivi e utenti dannosi di fare un gran numero di richieste simultanee che degradano le prestazioni del sistema per altri utenti. ipAddressMaxRequestsActive specifica il numero massimo di richieste simultanee che saranno attivamente elaborate da qualsiasi indirizzo IP specifico. Ulteriori richieste saranno in fila fino a quando non saranno state elaborate le richieste precedenti. I piccoli file statici in erddap/download/ erddap/images/ ARE esenti da questo conteggio e dalla relativa limitazione. Il default è 2. Il massimo consentito è 100, che è pazzo alto -- non farlo&#33; È possibile impostare questo a 1 per essere rigoroso, soprattutto se avete problemi con utenti eccessivamente aggressivi o dannosi. Gli utenti avranno ancora rapidamente tutti i dati che richiedono (fino a ipAddressMaxRichiedi) , ma non saranno in grado di accumulare risorse di sistema. Non consigliamo di impostare questo a un numero più grande perché permette utenti legittimi eccessivamente aggressivi e utenti dannosi di dominareERDDAPcapacità di lavorazione.
Eventuali modifiche al valore di questo tag avranno effetto la prossima voltaERDDAP™leggidatasets.xml, anche in risposta a un set di dati[bandiera](/docs/server-admin/additional-information#flag).
     
### &lt;ipAddressUnlimited&gt;{#ipaddressunlimited} 
* [ ** &lt;ipAddressUnlimited&gt; ** ] (#ipaddressunlimited) è un tag opzionale raramente usato (primo supportato conERDDAP™2, del regolamento (CEE) n.) all'interno di&lt;erddapDatasets&gt; tag indatasets.xmlche fa parte di un sistema per limitare la capacità di utenti legittimi eccessivamente aggressivi e utenti dannosi di fare un gran numero di richieste simultanee che degradano le prestazioni del sistema per altri utenti. ipAddressUnlimited è un elenco separato da virgola di indirizzi IP che si desidera consentire l'accesso illimitato alERDDAP. Guarda nel tuo registro. file txt per vedere quale formato il server utilizza per gli indirizzi IP. Su alcuni server, gli indirizzi IP saranno nel formato #.#.#.#.# (dove è un intero da 0 a 255) ; mentre su altri sarà nel formato #:#:#:#:#:#:#:#:#:#:# . I richiedenti di questa lista non sono soggetti a le impostazioni ipAddressMaxRequests o ipAddressMaxRequestsActive. Questo potrebbe essere un secondoERDDAP™o per determinati utenti o server del sistema.ERDDAP™aggiunge sempre " (SconosciutoIndirizzo) ", cheERDDAP™utilizza quando l'indirizzo IP del richiedente non può essere determinato, ad esempio, per altri processi in esecuzione sullo stesso server.
Eventuali modifiche al valore di questo tag avranno effetto la prossima voltaERDDAP™leggidatasets.xml, anche in risposta a un set di dati[bandiera](/docs/server-admin/additional-information#flag).
    
Se per qualche motivo tutte le richieste di un utente ottengono il messaggio di errore "Timeout in attesa delle altre richieste di processo.", allora è possibile risolvere il problema aggiungendo l'indirizzo IP dell'utente all'elenco ipAddressUnlimited, applicando tale cambiamento, quindi rimuovendolo da quella lista.
    
### &lt;loadDatasetsMinMinutes&gt;{#loaddatasetsminminutes} 
* [ ** &lt;caricoDatasetsMinMinutes&gt; ** ] (#loaddatasetsminminutes) è un tag OPTIONAL raramente usato all'interno di un&lt;erddapDatasets&gt; tag indatasets.xmlper specificare il tempo minimo (in minuti) tra carico maggiore Datasets (quandoERDDAP™ritrattamentidatasets.xml, compreso il controllo di ogni dataset per vedere se ha bisogno di essere ricaricato secondo il suo ricarica Impostazione EveryNMinutes, default=15) . Ad esempio,
```
    <loadDatasetsMinMinutes>15</loadDatasetsMinMinutes>  
```
Se una data corsa di caricoDatasets richiede meno di questa volta, il caricatore guarda ripetutamente la directory di bandiera e/o dorme fino a quando il tempo rimanente è passato. Il default è di 15 minuti, che dovrebbe essere bene per quasi tutti. L'unico svantaggio di impostare questo a un numero più piccolo è che aumenterà la frequenza cheERDDAP™retries datasets che hanno errori che impediscono loro di essere caricati (ad esempio, un server remoto è giù) . Se ci sono un sacco di tali set di dati e vengono rivisitati frequentemente, la fonte di dati potrebbe considerarlo pestering / comportamento aggressivo. Eventuali modifiche al valore di questo tag avranno effetto la prossima voltaERDDAP™leggidatasets.xml, anche in risposta a un set di dati[bandiera](/docs/server-admin/additional-information#flag). PrimaERDDAP™v2.00, questo è stato specificato in setup.xml, che è ancora permesso ma scoraggiato.
     
### &lt;loadDatasetsMaxMinutes&gt;{#loaddatasetsmaxminutes} 
* [ ** &lt;caricamentoDatasetsMaxMinutes&gt; ** ] (#loaddatasetsmaxminutes) è un tag OPTIONAL all'interno di un&lt;erddapDatasets&gt; tag indatasets.xmlper specificare il tempo massimo (in minuti) un carico importante Lo sforzo di Datasets è permesso di prendere (prima del carico Filetto di Datasets trattato come "stalled" e viene interrotto)   (default = 60) . Ad esempio,
```
    <loadDatasetsMaxMinutes>60</loadDatasetsMaxMinutes>  
```
In generale, questo dovrebbe essere impostato almeno due volte, a condizione che ragionevolmente pensi che ricaricare tutti i dataset (cumulativamente) dovrebbe (dal momento che i computer e le reti a volte sono più lenti del previsto) Questo dovrebbe sempre essere molto più lungo di caricareDatasetsMinMinutes. Il default è di 60 minuti. Alcune persone lo stabiliranno più a lungo. Eventuali modifiche al valore di questo tag avranno effetto la prossima voltaERDDAP™leggidatasets.xml, anche in risposta a un set di dati[bandiera](/docs/server-admin/additional-information#flag). PrimaERDDAP™v2.00, questo è stato specificato in setup.xml, che è ancora permesso ma scoraggiato.
     
### &lt;logLevel&gt;{#loglevel} 
* [ ** &lt;logLevel&#33; ** ] (#loglevel) è un tag OPTIONAL all'interno di un&lt;erddapDatasets&gt; tag indatasets.xmlper specificare quanti messaggi diagnostici vengono inviati al file log.txt. Può essere impostato su "avvertimento" (i messaggi più pochi) , "info" (il default) o "tutti" (più messaggi) . Ad esempio,
```
    <logLevel>info</logLevel>  
```
Eventuali modifiche al valore di questo tag avranno effetto la prossima voltaERDDAP™leggidatasets.xml, anche in risposta a un set di dati[bandiera](/docs/server-admin/additional-information#flag). PrimaERDDAP™v2.00, questo è stato specificato in setup.xml, che è ancora permesso ma scoraggiato.
     
### &lt;parzialeRequestMaxBytes&gt; e&lt;parzialeRichiestaMaxCells&gt;{#partialrequestmaxbytes-and-partialrequestmaxcells} 
* [ ** &lt;parzialeRequestMaxBytes&gt; **] (#Richiesta parzialemaxbytes-e-partialrequestmaxcellule) E...** &lt;parzialeRequestMaxCells&gt; ** ] (#Richiesta parzialemaxbytes-e-partialrequestmaxcellule) sono raramente utilizzati tag OPTIONAL all'interno di un&lt;erddapDatasets&gt; tag indatasets.xml. Quando possibile (e non è sempre possibile) ♪ERDDAP™rompe grandi richieste di dati in pezzi per conservare la memoria.
    
Con 32 bitJava, in senso semplicistico, il numero massimo simultaneo *grande* richieste sono circa 3/4 della memoria disponibile (il valore -Xmx passato a Tomcat) diviso per la dimensione del pezzo (ad esempio, 1200 MB / 100 MB =&gt; 12 richieste) . Altre cose richiedono memoria, quindi il numero effettivo di richieste sarà meno. In pratica, il blocco non è sempre possibile. Così un enorme o un paio di grandi richieste simultanee non schiacciabili potrebbe causare problemi su 32 bitJava.

Con 64 bitJava, il valore -Xmx può essere molto più grande. Quindi la memoria è molto meno probabile che sia un vincolo.

È possibile sovrascrivere la dimensione del pezzo predefinito definendo questi tag indatasets.xml  (con valori diversi da quelli mostrati qui) :
Per griglie:&lt;parzialeRequestMaxBytes&gt;100000000000&lt;/Richiesta parzialeMaxBytes&gt;
Per i tavoli:&lt;parzialeRequestMaxCells&gt;1000000&lt;/Richiesta parziale MaxCells&gt;

parzialeRequestMaxBytes è il numero massimo preferito di byte per una richiesta parziale di dati della griglia (un pezzo della richiesta totale) . default = 100000000000 (10.) . Le dimensioni più grandi non sono necessariamente migliori (e non andare oltre 500 MB perché questo è il limite predefinito di THREDDS perDAPrisposte) . Ma dimensioni più grandi possono richiedere meno accessi di tonnellate di file (pensare aERD's dati satellitari con ogni punto di tempo in un file separato - è meglio ottenere più dati da ogni file in ogni richiesta parziale) .

parzialeRequestMaxCells è il numero massimo preferito di celle (* nColumns nella tabella dei dati) per una richiesta parziale di dati TABLE (un pezzo della richiesta totale) . Default = 100000. Le dimensioni più grandi non sono necessariamente migliori. Essi provocano un'attesa più lunga per il lotto iniziale di dati dalla fonte.

Eventuali modifiche al valore di questo tag avranno effetto la prossima voltaERDDAP™leggidatasets.xml, anche in risposta a un set di dati[bandiera](/docs/server-admin/additional-information#flag). PrimaERDDAP™v2.00, questi sono stati specificati in setup.xml, che è ancora permesso ma scoraggiato.
     
### &lt;richiestaBlacklist&gt;{#requestblacklist} 
* [ ** &lt;richiestaBlacklist» ** ] (#requestblacklist #)  [è un tag OPTIONAL](/docs/server-admin/additional-information#frequent-crashes-or-freezes)all'interno di&lt;erddapDatasets&gt; tag indatasets.xmlche contiene un elenco separato da virgola di indirizzi IP numerici che saranno elencati in nero. Eventuali modifiche al valore di questo tag avranno effetto la prossima voltaERDDAP™leggidatasets.xml, anche in risposta a un set di dati[bandiera](/docs/server-admin/additional-information#flag).
    * Questo può essere usato per respingere un[La negazione dell'attacco di servizio](https://en.wikipedia.org/wiki/Denial_of_service), un eccessivamente zelante[web robot](https://en.wikipedia.org/wiki/Internet_bot), o qualsiasi altro tipo di utente problematico.
    * Utente problematico -- SeERDDAP™rallenta a una striscia o congela / ferma, la causa è spesso un utente problematico che sta eseguendo più di uno script in una sola volta e / o facendo un gran numero di richieste molto grandi, estremamente inefficienti, o non valide, o simultaneamente. Guarda[log.txt](/docs/server-admin/additional-information#log)per vedere se questo è il caso e trovare l'indirizzo IP numerico dell'utente problematico. Se questo è il problema, si dovrebbe probabilmente blacklist quell'utente.
        
QuandoERDDAP™ottiene una richiesta da un indirizzo IP in lista nera, restituirà HTTP Errore 403: Proibito. Il messaggio di errore di testo di accompagnamento incoraggia l'utente a e-mail, ilERDDAPamministratore, per risolvere i problemi. Se prendono il tempo per leggere il messaggio di errore (molti a quanto pare non) e contattarti, puoi quindi lavorare con loro per farli eseguire solo uno script alla volta, fare richieste più efficienti, risolvere i problemi nel loro script (ad esempio, la richiesta di dati da un set di dati remoto che non può rispondere prima della tempistica fuori) o qualunque altra cosa fosse la fonte di guai.
        
Gli utenti sono spesso semplicemente inconsapevoli che le loro richieste sono fastidiose. Spesso non sono a conoscenza di bug, inefficienze lorde, o altri problemi con i loro script. Spesso pensano che perché il tuoERDDAP™offre i dati gratuitamente, che possono chiedere quanti dati vogliono, ad esempio, eseguendo più script o utilizzando più thread contemporaneamente.
        
        * Potete spiegare loro che ciascunoERDDAP™, ora importa quanto grande e potente, ha risorse finite (Tempo della CPU, disco rigido I/O, larghezza di banda di rete, ecc.) e non è giusto se un utente richiede i dati in un modo che affolla altri utenti o overburdensERDDAP.
        * Una volta che un utente sa come fare 2 richieste simultanee, spesso non vedono motivo di non fare 5, 10 o 20 richieste simultanee, dal momento che le richieste aggiuntive non costano nulla. È come una guerra asimmetrica: qui le armi offensive hanno un enorme vantaggio (costo zero) sulle armi difensive (installazione finita con costi reali) .
        * Dite loro che ci sono rendimenti in diminuzione per fare richieste sempre più simultanee; le richieste aggiuntive bloccano ulteriormente le richieste degli altri utenti; non producono un enorme miglioramento per loro.
        * Ricorda loro che ci sono altri utenti (sia utenti casual che altri utenti che eseguono script) , quindi non è giusto da loro per scavare tuttiERDDAPLe risorse.
        * Si noti che i giganti tecnologici hanno indotto gli utenti ad aspettarsi risorse infinite dai servizi web. Mentre ci sono modi per impostare[reti/clusters/federazioni diERDDAP#](/docs/server-admin/scaling)per fareERDDAP™sistema con più risorse, la maggior parteERDDAP™Gli amministratori non hanno il denaro o la forza lavoro per impostare tali sistemi, e un tale sistema sarà ancora finito. AERDper esempio, c'è una persona (#) scritturaERDDAP™, somministrando dueERDDAP# (con aiuto dal mio capo) , e la gestione di diverse fonti di dati, il tutto con un budget hardware annuale di $0 (ci affidiamo a borse occasionali da pagare per l'hardware) . Questo non è Google, Facebook, Amazon, ecc con 100 di ingegneri, e milioni di dollari di ricavi per riciclare in sistemi sempre più grandi. E non possiamo muoverci.ERDDAP™a, ad esempio, Amazon AWS, perché i costi di archiviazione dei dati sono grandi e le spese di uscita dei dati sono grandi e variabili, mentre il nostro budget per i servizi esterni è fisso $0.
        * La mia richiesta agli utenti è: per richieste non puntuali (che è di gran lunga il caso più comune) , il loro sistema dovrebbe solo fare una richiesta alla volta. Se le richieste sono sensibili al tempo (ad esempio, più .pngs su una pagina web, più piastrelle per unaWMScliente, ecc.) , allora forse 4 richieste simultanee dovrebbero essere il massimo (e solo per un tempo molto breve) .
        * Se spieghi la situazione all'utente, la maggior parte degli utenti capirà e sarà disposta a fare le modifiche necessarie in modo da poter rimuovere il loro indirizzo IP dalla lista nera.
             
    * Per lista nera un utente, aggiungere il loro indirizzo IP numerico all'elenco separato da virgola degli indirizzi IP in&lt;richiestaBlacklist&gt; nel tuodatasets.xmlfile. Per trovare l'indirizzo IP dell'utente problematico, guardare nelERDDAP™  *BigParentDirectory* /logs/log.txt file ( *BigParentDirectory* è specificato in[setup.xml](/docs/server-admin/deploy-install#setupxml)) per vedere se questo è il caso e per trovare l'indirizzo IP dell'utente. L'indirizzo IP per ogni richiesta è elencato sulle linee che iniziano con "&#123;&#123;&#123;#123;#" ed è 4 numeri separati da periodi, ad esempio, 123.45.67.8 . La ricerca di "ERROR" vi aiuterà a trovare problemi come richieste non valide.
    * È inoltre possibile sostituire l'ultimo numero in un indirizzo IP con\\*(per esempio, 202.109.200.\\*) bloccare un intervallo di indirizzi IP, 0-255.
    * È inoltre possibile sostituire gli ultimi 2 numeri in un indirizzo IP con\\*.\\*  (per esempio, 121.204.\\*.\\*) per bloccare una più ampia gamma di indirizzi IP, 0-255.0-255.
    * Per esempio,
    ```
        <requestBlacklist>98.76.54.321, 202.109.200.\\*, 121.204.\\*.\\*</requestBlacklist>
    ```
    * Non devi riavviareERDDAP™per le modifiche&lt;richiestaBlacklist&gt; per avere effetto. Le modifiche saranno rilevate la prossima voltaERDDAP™verifica se eventuali set di dati devono essere ricaricati. Oppure, è possibile accelerare il processo visitando un[Set di dati URL della bandiera](/docs/server-admin/additional-information#set-dataset-flag)per qualsiasi dataset.
    * Il tuoERDDAP™il report giornaliero include un elenco/tally dei richiedenti più attivi e bloccati.
    * Se si desidera capire che dominio / istituzione è legato a un indirizzo IP numerico, è possibile utilizzare un servizio web DNS gratuito e invertito come[ https://network-tools.com/ ](https://network-tools.com/).
    * Ci possono essere momenti in cui ha senso bloccare alcuni utenti a un livello superiore, per esempio, utenti dannosi. Ad esempio, è possibile bloccare il loro accesso a tutto il server, non soloERDDAP. Su Linux, un tale metodo è quello di utilizzare[Iptables](https://www.linode.com/docs/guides/control-network-traffic-with-iptables/). Ad esempio, è possibile aggiungere una regola che blocca tutto che proviene da 198.51.100.0 con il comando
iptables -I INPUT -s 198.51.100.0 - DROP
       
### &lt;slowDownTroubleMillis&gt;{#slowdowntroublemillis} 
* [ ** &lt;rallentare il dolore ** ] (#Slowdowntroublemillis #) è un tag OPTIONAL raramente usato all'interno di un&lt;erddapDatasets&gt; tag indatasets.xmlche contiene un intero che specifica il numero di millisecondi (predefinito = 1000) soffermarsi quando rispondere a tutte le richieste fallite, ad esempio, dataset sconosciuto, chiedere troppo grande, utente sulla lista nera. Ad esempio,
    ```
    <slowDownTroubleMillis>2000</slowDownTroubleMillis>
    ```
Se uno script sta facendo una richiesta immediatamente dopo l'altro, allora potrebbe rapidamente fare una brutta richiesta dopo un altro. Con questa impostazione, è possibile rallentare uno script in fallimento in modo daERDDAP™Non e' inondata di cattive richieste. Se un umano fa una cattiva richiesta, non noteranno nemmeno questo ritardo. Raccomandazioni:
    
    * Se il problema è una negazione di servizio (DDOS) attacco da 100+ attaccanti, impostare questo a un numero più piccolo (100?) . Rallentare tutto per troppo tempo porta a troppi fili attivi.
    * Se il problema è da 1-10 fonti, impostare questo a 1000 ms (il default) , ma un numero maggiore (10000) è anche ragionevole. Questo li rallenta in modo da sprecare meno risorse di rete. Inoltre, 1000 ms o così non infastidire gli utenti umani che fanno una cattiva richiesta.
    
Eventuali modifiche al valore di questo tag avranno effetto la prossima voltaERDDAP™leggidatasets.xml, anche in risposta a un set di dati[bandiera](/docs/server-admin/additional-information#flag).
     
### &lt;abbonamentoEmailBlacklist&gt;{#subscriptionemailblacklist} 
* [ ** &lt;abbonamento EmailBlacklist» ** ] (#subscriptionemailblacklist) è un tag OPTIONAL raramente usato all'interno di un&lt;erddapDatasets&gt; tag indatasets.xmlche contiene un elenco separato da virgola di indirizzi e-mail che sono immediatamente blacklist[sistema di abbonamento](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions), per esempio
    ```
    <subscriptionEmailBlacklist>bob@badguy.com, john@badguy.com</subscriptionEmailBlacklist>  
    ```
Questo è un sistema caso-insensibile. Se un indirizzo e-mail viene aggiunto a questo elenco, se l'indirizzo e-mail ha abbonamenti, gli abbonamenti verranno cancellati. Se un indirizzo e-mail dell'elenco cerca di iscriversi, la richiesta verrà rifiutata. Eventuali modifiche al valore di questo tag avranno effetto la prossima voltaERDDAP™leggidatasets.xml, anche in risposta a un set di dati[bandiera](/docs/server-admin/additional-information#flag).
     
### Testo standard{#standard-text} 
*   [ **Testo standard** ](#standard-text)-- Ci sono diversi tag OPTIONAL (la maggior parte sono raramente utilizzati) all'interno di&lt;erddapDatasets&gt; tag indatasets.xmlper specificare il testo che appare in vari luoghiERDDAP. Se si desidera modificare il testo predefinito, copiare il valore esistente dal tag dello stesso nome in
     *tomcat* /webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util.messages.xml adatasets.xml, quindi modificare il contenuto. Il vantaggio di avere questi indatasets.xmlè che è possibile specificare nuovi valori in qualsiasi momento, anche quandoERDDAP™sta correndo. Eventuali modifiche ai valori di questi tag avranno effetto la prossima voltaERDDAP™leggidatasets.xml, anche in risposta a un set di dati[bandiera](/docs/server-admin/additional-information#flag). I nomi dei tag descrivono il loro scopo, ma vedere il contenuto predefinito in message.xml per una comprensione più profonda.
    
    *   &lt;standardL’obiettivo
    *   &lt;standardContatto&gt;
    *   &lt;standardDataLicens&gt;
    *   &lt;standardDisclaimerOfEndorsement&gt;
    *   &lt;standardDisclaimerOfLink esterno&gt;
    *   &lt;standardGeneralDisclaimer&gt;
    *   &lt;standard PrivacyPolicy&gt;
    *   &lt;StartHeadHtml5 &gt;
    *   &lt;startBodyHtml5&gt; è un buon tag per cambiare al fine di personalizzare l'aspetto della parte superiore di ogni pagina web nella tuaERDDAP. In particolare, è possibile utilizzare questo per aggiungere facilmente un messaggio temporaneoERDDAP™home page (ad esempio, "Controllare il nuovo set di dati JPL MUR SST v4.1..." o "QuestoERDDAP™sarà offline per la manutenzione 2019-05-08T17:00:00 PDT attraverso 2019-05-08T20:00:00:00 PDT.") . Un quirk di mettere questo tag indatasets.xmlè: quando si riavviaERDDAP, la prima richiestaERDDAP™restituirà l'avvio predefinito BodyHtml5 HTML, ma ogni richiesta successiva utilizzerà il startBodyHtml5 HTML specificato indatasets.xml.
    *   &lt;la descrizione breve Html&gt; è un buon tag per cambiare per personalizzare la descrizione della tuaERDDAP. Si noti che è possibile modificare facilmente questo per aggiungere un messaggio temporaneo nella pagina iniziale (ad esempio, "QuestoERDDAP™sarà offline per la manutenzione 2019-05-08T17:00:00 PDT attraverso 2019-05-08T20:00:00:00 PDT.") .
    *   &lt;endBodyHtml5&gt;
    
      
PrimaERDDAP™v2.00, questi sono stati specificati in setup.xml, che è ancora permesso ma scoraggiato.
     
### &lt;insolito Attività &gt;{#unusualactivity} 
* [ ** &lt;insolitaAttività ** ] (#unusualattività #) è un tag OPTIONAL raramente usato all'interno di un&lt;erddapDatasets&gt; tag indatasets.xmlspecificare il numero massimo di richieste tra due rune di LoadDataset che è considerato normale (default = 10000) . Se tale numero è superato, un'email viene inviata a e-mail TuttoPer (come specificato in setup.xml) . Ad esempio,
    ```
    <unusualActivity>10000</unusualActivity>  
    ```
Eventuali modifiche al valore di questo tag avranno effetto la prossima voltaERDDAP™leggidatasets.xml, anche in risposta a un set di dati[bandiera](/docs/server-admin/additional-information#flag). PrimaERDDAP™v2.00, questo è stato specificato in setup.xml, che è ancora permesso ma scoraggiato.
     
### &lt;aggiornamentoMaxEvents&gt;{#updatemaxevents} 
* [ ** &lt;aggiornamentoMaxEvents&gt; ** ] (#updatemaxevents) è un tag OPTIONAL raramente usato all'interno di un&lt;erddapDatasets&gt; tag indatasets.xmlper specificare il numero massimo di eventi di modifica dei file (default = 10) che sarà gestito da [&lt;AggiornamentoOgniNMillis&gt; (#updateeverynmillis #) sistema prima di passare per ricaricare il dataset invece. Per esempio,
    ```
    <updateMaxEvents>10</updateMaxEvents>  
    ```
Il sistema di aggiornamentoEveryNMillis è destinato a funzionare molto rapidamente prima che la richiesta di un utente venga elaborata. Se ci sono un sacco di eventi di cambiamento di file, quindi presumibilmente non può essere eseguito rapidamente, quindi invece richiede che il set di dati venga ricaricato. Se il tuoERDDAP™si occupa di dataset che devono essere mantenuti aggiornati anche quando ci sono modifiche a un gran numero di file di dati, è possibile impostare questo a un numero maggiore (100?) .

### &lt;user&gt;{#user} 
* [ ** &lt;utente ** ] (#) è un tag OPTIONAL all'interno di un&lt;erddapDatasets&gt; tag indatasets.xmlche identifica il nome utente, la password (se l'autenticazione=custom) , e ruoli (un elenco separato da virgola) . L'uso di nome utente e password varia leggermente in base al valore di [&lt;autenticazione &gt; (/docs/server-admin/additional-information#authentication) nel tuoERDDAPIl file setup.xml.
    * Questo fa parte diERDDAP'[sistema di sicurezza](/docs/server-admin/additional-information#security)per limitare l'accesso ad alcuni set di dati ad alcuni utenti.
    * Fare un separato&lt;tag utente&gt; per ogni utente. Opzionalmente, se l'autenticazione=oauth2, è possibile impostare due&lt;utente tag per ogni utente: uno per quando l'utente accede tramite Google, uno per quando l'utente accede via Orcid, presumibilmente con gli stessi ruoli.
    * Se non c'è&lt;user&gt; tag per un cliente, s/he sarà solo in grado di accedere ai set di dati pubblici, cioè, set di dati che non hanno un [&lt;Per saperne di più (# Accessibleto #) tag.
    * nome utente
Per l'autenticazione=custom, il nome utente è solitamente una combinazione di lettere, cifre, underscore e periodi.
Per l'autenticazione=email, il nome utente è l'indirizzo email dell'utente. Potrebbe essere qualsiasi indirizzo e-mail.
Per l'autenticazione=google, il nome utente è l'indirizzo e-mail completo di Google. Questo include account gestiti da Google come@noaa.govconti.
Per l'autenticazione=orcid, il nome utente è il numero di account Orcid dell'utente (con trattini) .
Per l'autenticazione=oauth2, il nome utente è l'indirizzo e-mail completo di Google o il numero di account Orcid dell'utente (con trattini) .
    * password
Per l'autenticazione=email, google, orcid o oauth2, non specificare un attributo password.
Per l'autenticazione=custom, è necessario specificare un attributo password per ogni utente.
        * Le password che gli utenti entrano sono sensibili al caso e devono avere 8 o più caratteri quindi sono più difficili da rompere. Al giorno d'oggi, anche 8 caratteri possono essere crepati rapidamente e poco costoso da forza bruta utilizzando un gruppo di computer su AWS.ERDDAP™applica solo il minimo di 8 caratteri quando l'utente tenta di accedere (non quando il&lt;user&gt; tag è in fase di elaborazione, perché questo codice vede solo il digerimento hash della password, non la password del testo normale).
        * setup.xml's&lt;passwordEncoding&gt; determina come vengono memorizzate le password&lt;utente tags indatasets.xml. Per aumentare la sicurezza, le opzioni sono:
            *   [MD5](https://en.wikipedia.org/wiki/MD5)  (Non usarlo&#33;) -- per l'attributo password, specificare l'hash digest MD5 della password dell'utente.
            * UEPMD5 (Non usarlo&#33;) -- per l'attributo password, specificare l'hash digest MD5 di *nome utente* :ERDDAP: *password* . Il nome utente e "ERDDAP" sono usati per[sale](https://en.wikipedia.org/wiki/Salt_(cryptography)) il valore hash, rendendo più difficile decodificare.
            *   [SHA256](https://en.wikipedia.org/wiki/SHA-2)  (non raccomandato) -- per l'attributo password, specificare l'hash digest SHA-256 della password dell'utente.
            * UEPSHA256 (predefinito, password consigliataCodifica. Ma molto meglio: utilizzare le opzioni di autenticazione di Google, orchid o oauth2.) -- per l'attributo password, specificare l'hash digest SHA-256 di *nome utente* :ERDDAP: *password* . Il nome utente e "ERDDAP" sono utilizzati per sale il valore hash, rendendo più difficile decodificare.
        * Su Windows, è possibile generare valori di digerire password MD5 scaricando un programma MD5 (come[MD5](https://www.fourmilab.ch/md5/)) e utilizzando (per esempio) :
md5 -djsmith:ERDDAP: *realepassword* 
        * Su Linux/Unix, è possibile generare valori MD5 digest utilizzando il programma md5sum integrato (per esempio) :
echo -n "jsmith:ERDDAP: *realepassword* "|MD5sum
        * Le password memorizzate sono sensibili al caso. Le forme memorizzate di password MD5 e UEPMD5 non sono sensibili al caso.
        * Per esempio (utilizzando UEPMD5) , se username="jsmith" e password="myPassword", il&lt;tag user&gt; è:
```
            <user username="jsmith"  
            password="57AB7ACCEB545E0BEB46C4C75CEC3C30"  
            roles="JASmith, JASmithGroup" />  
```
dove è stata generata la password memorizzata
md5 -djsmith:ERDDAP: La mia Parola di Passione
        * ruoli è un elenco separato da virgola di ruoli per i quali l'utente è autorizzato. Qualsiasi&lt;dataset&gt; può avere un [&lt;Per saperne di più (# Accessibleto #) tag che elenca i ruoli che possono accedere a quel dataset. Per un dato utente e un dato set di dati, se uno dei ruoli nell'elenco dei ruoli dell'utente corrisponde a uno dei ruoli nell'elenco del set di dati&lt;accessTo&gt; ruoli, quindi l'utente è autorizzato ad accedere a tale dataset.
            
Ogni utente che accede viene automaticamente dato il ruolo\\[chiunqueLogabbia In\\]Se c'è una&lt;tag utente&gt; per loro indatasets.xmlo no. Quindi, se un dato set di dati ha
```
            <accessibleTo>\\[anyoneLoggedIn\\]</accessibleTo>  
```
allora qualsiasi utente che è connesso sarà autorizzato ad accedere a quel dataset, anche se non c'è&lt;tag utente&gt; per loro indatasets.xml.
            
    * Eventuali modifiche al valore di questo tag avranno effetto la prossima voltaERDDAP™leggidatasets.xml, anche in risposta a un set di dati[bandiera](/docs/server-admin/additional-information#flag).
         
### &lt;pathRegex&gt;{#pathregex} 
* [ ** &lt;il percorso ** ] (Traduzione:) consente di specificare un'espressione regolare che limita i percorsi (quali sottodirectory) sarà incluso nel dataset. Il default è .\\*, che corrisponde a tutti i percorsi. Questo è un raramente usato, raramente necessario, tag OPTIONAL perEDDGridFromFiles datasets, EDDTableFromFiles datasets e alcuni altri tipi di dataset. Tuttavia, quando ne hai bisogno, ne hai davvero bisogno.
    
Per fare questo lavoro, è necessario essere davvero bene con espressioni regolari. Vedi questo[documentazione regex](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)e[tutorial regex](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html). In particolare, è necessario conoscere i gruppi di cattura (qualcosa dentro parentesi) , e il simbolo "o" "|".
Insieme, questi consentono di specificare qualsiasi numero di opzioni, ad esempio, (opzione|opzione|opzione) .
Inoltre, qualsiasi delle opzioni può essere nulla, ad esempio, (|opzione|opzione) .
Inoltre, è necessario sapere che i gruppi di cattura possono essere nidificati, cioè, qualsiasi opzione in un gruppo di cattura può contenere un altro gruppo di cattura, ad esempio, (|opzione (|opzione B|Opzione2c) |opzione) che dice che l'opzione2 può essere seguita da nulla, o option2b, o option2c.
Per pathRegexes, ogni opzione sarà un nome di cartella seguito da un /, ad esempio, barra / .
    
La parte difficile del percorsoRegex è: QuandoERDDAP™scende ricorsivamente l'albero della directory, il pathRegex deve accettare tutti i percorsi che incontra sulla sua strada verso le directory con i dati. Regex con gruppi di cattura nidi sono un buon modo per affrontare questo.
    
Un esempio:
Supponiamo di avere la seguente struttura directory:
    ```
    /foo/bar/D0001/a/\\*.nc  
    /foo/bar/D0001/b/\\*.nc  
    /foo/bar/D0002/a/\\*.nc  
    /foo/bar/D0002/b/\\*.nc  
    ...  
    /foo/bar/E0001/a/\\*.nc  
    ...  
    ```
e il file specificatoDirectory è /foo/bar/, e vogliamo solo.ncfile nel D\\[0\\]&#123;4&#125;/a/ sottodirectory.
La soluzione è impostare pathRegex a /foo/bar/ (|D\\[0\\]Traduzione: (|a)) )   
Questo dice:
Il percorso deve iniziare con /foo/bar/
Questo può essere seguito da niente o D\\[0\\]Traduzione:
Ciò può essere seguito da niente o da un
    
Sì, pathRegex può essere incredibilmente difficile da formulare. Se sei bloccato, chiedi a un programmatore di computer (la cosa più vicina al mondo reale a un mago che sputa incantesimi?) o inviare un'e-mail a Chris. John a Noaa.gov.
    
### &lt;dataset&gt;{#dataset} 
* [ ** &lt;Dataset &gt; ** ] (# Dataset #) è un OPTIONAL (ma sempre usato) tag all'interno di un&lt;erddapDatasets&gt; tag indatasets.xmlche (se includi tutte le informazioni tra&lt;dataset&gt; e&lt;/dataset&gt;) descrive completamente un set di dati. Per esempio,
    ```
    <dataset type="EDDGridFromDap" datasetID="erdPHssta8day" active="true"> ... </dataset>  
    ```
Ci può essere qualsiasi numero di tag di dataset nel tuodatasets.xmlfile.
Tre attributi MAY appaiono all'interno di un&lt;dataset&gt; tag:
     
    *    **Traduzione: *a Tipo* "** è un attributo REQUIRED all'interno di&lt;tag dataset&gt; indatasets.xmlche identifica il tipo di dataset (per esempio, se è unEDDGrid/gridded o EDDTable/tabular dataset) e la fonte dei dati (per esempio, un database, file o un telecomandoOPeNDAPserver) . Vedere la[ **Elenco dei tipi di Dataset** ](#list-of-types-datasets).
         
#### set di dati Id{#datasetid} 
*   [ **datasetID= *aDatasetID* "** ](#datasetid)è un attributo REQUIRED all'interno di&lt;tag dataset&gt; che assegna un breve (di solito&lt;15 caratteri), unico, identificando il nome a un set di dati.
    * ThedatasetIDs DOVE essere una lettera (A-Z, a-z) seguito da qualsiasi numero di A-Z, a-z, 0-9, e \\_ (ma meglio se&lt;32 caratteri totali).
    * Dataset Gli ID sono sensibili al caso, ma DON'T crea duedatasetIDs che differiscono solo in lettere superiori / minuscole. Esso causerà problemi sui computer Windows (il tuo e/o il computer di un utente) .
    * Migliori pratiche: Si consiglia di utilizzare[Cammello Caso](https://en.wikipedia.org/wiki/CamelCase).
    * Migliori pratiche: Raccomandiamo che la prima parte sia un acronimo o un'abbreviazione del nome dell'istituzione sorgente e la seconda parte sia un acronimo o un'abbreviazione del nome del dataset. Quando possibile, creiamo un nome che riflette il nome della fonte per il set di dati. Per esempio, abbiamo usatodatasetID=ssta8day" per un dataset daNOAA NMFS SWFSCDivisione Ricerca Ambientale (ERD) che è designato dalla fonte per essere satellite/PH/sst8 giorni.
    * Se si modifica il nome di un dataset, il vecchio dataset (con il vecchio nome) sarà ancora vivoERDDAP. Questo è un dataset "orfano", perché le specifiche per esso indatasets.xmlora è andato. Questo deve essere trattato:
        1. PerERDDAP™v2.19 e più tardi, non è necessario fare nulla.ERDDAP™rimuoverà automaticamente questi dataset orfani.
        2. PerERDDAP™v2.18 e prima, è necessario fare qualcosa per rimuovere i dataset orfani: Fare un set di dati "false" attivo, ad esempio,
```
                <dataset type="EDDTableFromNcFiles" datasetID="*theOldName*" active="false" />  
```
Dopo il prossimo carico maggiore Datasets, È possibile rimuovere il tag dopo che il vecchio set di dati è inattivo.
                 
#### attivo{#active} 
*   [ **attive= *boolean* "** ](#active)è un attributo OPTIONAL all'interno di un&lt;tag dataset&gt; indatasets.xmlche indica se un dataset è attivo (idonei all'usoERDDAP) o no.
    * Valori validi sono veri (il default) e falso.
    * Poiché il default è vero, non è necessario utilizzare questo attributo fino a quando non si desidera rimuovere temporaneamente o permanentemente questo dataset daERDDAP.
    * Se si rimuove semplicemente un dataset attivo="true" dadatasets.xml, il dataset sarà ancora attivoERDDAP™ma non sarà mai aggiornato. Tale dataset sarà un "orfano" e sarà elencato come tale sullo stato. pagina web html proprio sotto l'elenco dei set di dati che non sono riusciti a caricare.
    * Se si imposta attiva="false",ERDDAP™disattivare i dataset la prossima volta che tenta di aggiornare il dataset. Quando lo fai,ERDDAP™non getta alcuna informazione che potrebbe aver memorizzato sul dataset e certamente non fa nulla ai dati effettivi.
    * Per rimuovere un dataset daERDDAP™, vedi[Rimozione dei Dataset di Forza](/docs/server-admin/additional-information#removing-datasets).
         

 ** Diversi tag possono apparire tra i&lt;dataset&gt; e&lt;/dataset&gt; tags. **   
C'è qualche variazione in cui i tag sono consentiti da quali tipi di dataset. Vedere la documentazione per uno specifico[tipo di dataset](#list-of-types-datasets)per i dettagli.

#### &lt;accessibile To&gt;{#accessibleto} 
* [ ** &lt;accessibile &gt; ** ] (# Accessibleto #) è un tag OPTIONAL all'interno di un&lt;dataset&gt; tag che specifica un elenco separato da virgola[ruoli](#user)che possono avere accesso a questo dataset. Per esempio,
    ```
    <accessibleTo>RASmith, NEJones</accessibleTo>  
    ```
    * Questo fa parte diERDDAP'[sistema di sicurezza](/docs/server-admin/additional-information#security)per limitare l'accesso ad alcuni set di dati ad alcuni utenti.
    * Se questo tag non è presente, tutti gli utenti (anche se non si sono registrati) avrà accesso a questo dataset.
    * Se questo tag è presente, questo dataset sarà visibile e accessibile solo agli utenti registrati che hanno uno dei ruoli specificati. Questo set di dati non sarà visibile agli utenti che non sono registrati.
    * Ogni utente che accede viene automaticamente dato il ruolo\\[chiunqueLogabbia In\\]Se c'è una&lt;tag utente&gt; per loro indatasets.xmlo no. Quindi, se un dato set di dati ha
    ```
        <accessibleTo>\\[anyoneLoggedIn\\]</accessibleTo>  
    ```
allora qualsiasi utente che è connesso sarà autorizzato ad accedere a quel dataset, anche se non c'è&lt;tag utente&gt; per loro indatasets.xml.
         
#### &lt;graficoAccessibleTo&gt;{#graphsaccessibleto} 
* [ ** &lt;grafisAccessibleTo&gt; ** ] (#graphsaccessibleto) è un tag OPTIONAL all'interno di un&lt;tag dataset&gt; indatasets.xmlche determina se la grafica e i metadati per il dataset sono disponibili al pubblico. Esso offre un modo per eliminare parzialmente i dataset [&lt;Per saperne di più (# Accessibleto #) impostazione. I valori consentiti sono:
    * auto... Questo valore (o l'assenza di un&lt;grafiAccessibleTo&gt; tag per il dataset) rende l'accesso a grafici e metadati dal dataset imitando il dataset&lt;&gt; impostazione.
Quindi, se il dataset è privato, i suoi grafici e metadati saranno privati.
E se il dataset è pubblico, i suoi grafici e metadati saranno pubblici.
    * pubblico pubblico -- Questa impostazione rende i grafici e i metadati del dataset accessibili a chiunque, anche gli utenti che non sono connessi, anche se il dataset è altrimenti privato perché ha un&lt;accessibile.
         
#### &lt;accessibile ViaFiles&gt;{#accessibleviafiles} 
* [ ** &lt;accessibileViaFiles&gt; ** ] (#accessibleviafiles) è un tag OPTIONAL all'interno di un&lt;tag dataset&gt; indatasets.xmlper[EDDGridAggregateExistingDimension](#eddgridaggregateexistingdimension)♪[EDDGridCopia](#eddgridcopy)♪[EDDGridDaEDDTable](#eddgridfromeddtable)♪[EDDGridDa Erddap](#eddfromerddap)♪[EDDGridDa Etopo](#eddgridfrometopo)♪[EDDGridDa Fili](#eddgridfromfiles)  (compresi tutti i sottoclassi) ♪[EDDGridSideBySide](#eddgridsidebyside)♪[EDDTableCopy](#eddtablecopy) [EDDTableFromErddap](#eddfromerddap)♪[EDDTEDDEDDGrid](#eddtablefromeddgrid)e[EDDTableFromFiles](#eddtablefromfiles)  (compresi tutti i sottoclassi) Datasets. Può avere un valore di vero o falso. Per esempio,
    ```
    <accessibleViaFiles>true</accessibleViaFiles>  
    ```
Se il valore è vero,ERDDAP™lo farà in modo che gli utenti possano navigare e scaricare i file di dati sorgente del dataset tramiteERDDAP'["files"sistema](https://coastwatch.pfeg.noaa.gov/erddap/files/). Vedere la"files"sistema[documentazione](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)per maggiori informazioni.
    
Il valore predefinito di&lt;accessibileViaFiles&gt; proviene da&lt;defaultAccessibleViaFiles&gt; in[setup.xml](/docs/server-admin/deploy-install#setupxml). Ha un valore predefinito di falso, ma si consiglia di aggiungere quel tag al vostro setup.xml con un valore di vero.
    
Raccomandazione -- Si consiglia di rendere tutti i set di dati pertinenti accessibili tramite il sistema di file impostando&lt;defaultAccessibleViaFiles&gt; true in setup.xml perché c'è un gruppo di utenti per i quali questo è il modo preferito per ottenere i dati. Tra le altre ragioni,"files"sistema rende facile per gli utenti di vedere quali file sono disponibili e quando sono cambiati, rendendo così facile per un utente mantenere la propria copia dell'intero dataset. Se di solito non si desidera rendere i set di dati accessibili tramite il file system, impostare&lt;defaultAccessibleViaFiles&gt; a false. In entrambi i casi, basta usare&lt;accessibileViaFiles&gt; per i pochi set di dati che sono eccezioni alla politica generale stabilita da&lt;defaultAccessibleViaFiles&gt; (per esempio, quando il dataset utilizza[.ncml](#ncml-files)file, che non sono davvero utili per gli utenti) .
     
#### &lt;accessibile Via ViaWMS&gt;{#accessibleviawms} 
* [ ** &lt;accessibile Via ViaWMS&gt; ** ] (#accessibleviawms) è un tag OPTIONAL all'interno di un&lt;tag dataset&gt; indatasets.xmlper tutti[EDDGrid](#eddgrid)sottoclassi. Può avere un valore vero (il default) o falso. Per esempio,
    ```
    <accessibleViaWMS>true</accessibleViaWMS>  
    ```
Se il valore è falso,ERDDAP'WMSserver non sarà disponibile per questo dataset. Questo è comunemente usato per set di dati che hanno alcuni valori di longitudine superiori a 180 (che tecnicamente è invalidaWMSservizi) , e per il quale si offre anche una variante del dataset con valori di longitudine interamente nella gamma -180 a 180 via[EDDGridLonPM180](#eddgridlonpm180).
Se il valore è vero,ERDDAP™cercherà di rendere disponibile il dataset tramiteERDDAP'WMSserver. Ma se il dataset è completamente inadatto perWMS  (ad esempio, non ci sono dati di longitudine o latitudine) , quindi il dataset non sarà disponibile tramiteERDDAP'WMSserver, indipendentemente da questa impostazione.
     
#### &lt;aggiungere Variabili Dove &gt;{#addvariableswhere} 
* [&lt;aggiungereVariablesWhere&gt;] (#Addvariableswhere) è un tag OPTIONAL all'interno&lt;dataset&gt; tag per tutti i set di dati EDDTable.
    
Le richieste a qualsiasi set di dati EDDTable possono includere &add Variabili Dove? (" *attributo Nome* "," *attributo Valore* ") , che diceERDDAP™aggiungere tutte le variabili nel dataset dove *attributoName=attributeValue* all'elenco delle variabili richieste. Ad esempio, se un utente aggiunge &add Variabili Dove? ("ioos\\_category","Wind") a una domanda,ERDDAPaggiungerà tutte le variabili nel dataset che hanno unioos\\_category= attributo del vino all'elenco delle variabili richieste (per esempio, windSpeed, windDirection, windGustSpeed) . *attributo Nome* e *attributo Valore* sono case-sensibili.
    
Indatasets.xml, se il pezzo di dataset.xml per un dataset ha
    ```
    <addVariablesWhere>*attributeNamesCSV*<addVariablesWhere>  
    ```
per esempio,
    ```
    <addVariablesWhere>ioos\\_category,units<addVariablesWhere>  
    ```
il modulo di accesso ai dati (Pagina web .html) per il dataset includerà un widget (per ogni attributeName nell'elenco separato dalla virgola) proprio sotto l'elenco delle variabili che permettono agli utenti di specificare un valore dell'attributo. Se l'utente seleziona un valore dell'attributo per uno o più dei nomi dell'attributo, verrà aggiunto alla richiesta tramite &add Variabili Dove? (" *attributo Nome* "," *attributo Valore* ") . Così, questo tag indatasets.xmlconsente di specificare l'elenco dei nomi degli attributi che verranno visualizzati sul modulo di accesso dati per quel dataset e rende facile per gli utenti aggiungere &addVariables Dove funzioni alla richiesta. The *attributoNamesCSV* l'elenco è sensibile al caso.
    
#### &lt;altitudineMetersPerSourceUnit&gt;{#altitudemeterspersourceunit} 
* [ ** &lt;altitudineMetersPerSourceUnit&gt; ** ] (#altitudemeterspersourceunit) è un tag OPTIONAL all'interno&lt;dataset&gt; tag in datasets. xxml per EDDTableFromSOSset di dati (Solo&#33;) che specifica un numero moltiplicato per i valori di altitudine o di profondità di sorgente per convertirli in valori di altitudine (in metri sopra il livello del mare) . Per esempio,
    ```
    <altitudeMetersPerSourceUnit>-1</altitudeMetersPerSourceUnit>  
    ```
Questo tag deve essere utilizzato se i valori dell'asse verticale del dataset non sono metri, positivo=up. In caso contrario, è OPTIONAL, dal momento che il valore predefinito è 1. Per esempio,
    * Se la fonte è già misurata in metri sopra il livello del mare, utilizzare 1 (o non utilizzare questo tag, poiché 1 è il valore predefinito) .
    * Se la fonte è misurata in metri sotto il livello del mare, utilizzare -1.
    ```
        <altitudeMetersPerSourceUnit>-1</altitudeMetersPerSourceUnit>
    ```
    * Se la fonte è misurata in km sopra il livello del mare, utilizzare 0.001.
         
#### &lt;defaultDataQuery&gt;{#defaultdataquery} 
* [ ** &lt;defaultDataQuery&gt; ** ] (#defaultdataquery) è un tag OPTIONAL all'interno di un&lt;tag dataset&gt; indatasets.xmlche diceERDDAP™per utilizzare la query specificata (la parte dell'URL dopo il "?") se il file .html Tipo (il modulo di accesso ai dati) è richiesto senza query.
    * Probabilmente sarà raramente necessario utilizzare questo.
    * Devi codificare XML (non per cento-encode) le domande di default in quanto sono in un documento XML. Per esempio, & diventa e ,&lt;diventa&lt;&gt; diventa &gt; .
    * Controlla il tuo lavoro. È facile fare un errore e non ottenere ciò che si desidera.ERDDAP™cercherà di pulire i vostri errori -- ma non fare affidamento su questo, dal momento che\\*come\\*è ripulito può cambiare.
    * Per i dataset di griddap, un uso comune di questo è quello di specificare una diversa profondità di default o valore di dimensione di altitudine (per esempio,\\[0\\]invece di\\[Ultimo\\]) .
In ogni caso, si dovrebbe sempre elencare tutte le variabili, utilizzare sempre gli stessi valori di dimensione per tutte le variabili, e quasi sempre utilizzare\\[0\\]♪\\[Ultimo\\]o\\[0:Last\\]per i valori di dimensione.
Per esempio:
    ```
        <defaultDataQuery>u\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\],v\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]</defaultDataQuery>
    ```
    * Pertabledapset di dati, se non si specifica alcun vincolo, la richiesta restituirà l'intero set di dati, che può essere estremamente grande, a seconda del dataset. Se non si desidera specificare alcun vincolo, piuttosto che avere un vuoto&lt;defaultDataQuery&gt; (che è lo stesso di non specificare un default DataQuery) , è necessario elencare esplicitamente tutte le variabili che si desidera includere nel defaultDataQuery.
    * Pertabledapdatasets, l'uso più comune di questo è quello di specificare un intervallo di tempo predefinito diverso (rispetto a max (tempo) , per esempio, &time&gt;=max (tempo) -1day, o relativo ad ora, per esempio, &time&gt;=now-1 giorno) .
Ricorda che la richiesta di non variabili di dati è la stessa di specificare tutte le variabili di dati, quindi di solito è possibile specificare il nuovo limite di tempo.
Per esempio:
    ```
        <defaultDataQuery>&amp;time&gt;=max(time)-1day</defaultDataQuery>  
    ```
o
    ```
        <defaultDataQuery>&amp;time&gt;=now-1day</defaultDataQuery>  
    ```
#### &lt;defaultGraphQuery&gt;{#defaultgraphquery} 
* [ ** &lt;defaultGraphQuery&gt; ** ] (#defaultgraphquery) è un tag OPTIONAL all'interno di un&lt;tag dataset&gt; indatasets.xmlche diceERDDAP™per utilizzare la query specificata (la parte dell'URL dopo il "?") se il file .graph Tipo (la forma di un grafico) è richiesto senza query.
    * Probabilmente sarà raramente necessario utilizzare questo.
    * Devi codificare XML (non per cento-encode) le domande di default in quanto sono in un documento XML. Per esempio, & diventa e ,&lt;diventa&lt;&gt; diventa &gt; .
    * Controlla il tuo lavoro. È facile fare un errore e non ottenere ciò che si desidera.ERDDAP™cercherà di pulire i vostri errori -- ma non fare affidamento su questo, dal momento che\\*come\\*è ripulito può cambiare.
    * Per i dataset di griddap, l'uso più comune di questo è quello di specificare una diversa profondità di default o valore di dimensione di altitudine (per esempio,\\[0\\]invece di\\[Ultimo\\]) e/o specificare che una variabile specifica sia grafo.
In ogni caso, userai quasi sempre\\[0\\]♪\\[Ultimo\\]o\\[0:Last\\]per i valori di dimensione.
Per esempio:
    ```
        <defaultGraphQuery>temp\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]&amp;.draw=surface&amp;.vars=longitude|latitude|temp</defaultGraphQuery>  
    ```
         (ma metti tutto su una linea) 
    * Pertabledapset di dati, se non si specifica alcun vincolo, la richiesta grafizzerà l'intero set di dati, che può richiedere molto tempo, a seconda dell'impostazione dei dati.
    * Pertabledapdatasets, l'uso più comune di questo è quello di specificare un intervallo di tempo predefinito diverso (rispetto a max (tempo) , per esempio, &time&gt;=max (tempo) -1day, o relativo ad ora, per esempio, &time&gt;=now-1 giorno) .
Ricorda che la richiesta di non variabili di dati è la stessa di specificare tutte le variabili di dati, quindi di solito è possibile specificare il nuovo limite di tempo.
Per esempio:
    ```
        <defaultGraphQuery>&amp;time&gt;=max(time)-1day</defaultGraphQuery>  
    ```
o
    ```
        <defaultGraphQuery>&amp;time&gt;=now-1day</defaultGraphQuery>  
    ```
#### &lt;dimensioneValuesInMemory&gt;{#dimensionvaluesinmemory} 
* [ ** &lt;dimensione Valori in memoria ** ] (#dimensionevalori inmemoria)   (vero (il default) o falsi) è un tag OPTIONAL e raramente usato all'interno&lt;tag dataset&gt; per qualsiasiEDDGriddataset che diceERDDAP™dove mantenere i valori sorgente delle dimensioni (noto anche comeaxisVariable#) :
    
    * vero = in memoria (che è più veloce ma usa più memoria) 
    * falso = su disco (che è più lento ma non usa memoria) 
    
Per esempio,
    ```
    <dimensionValuesInMemory>false</dimensionValuesInMemory>  
    ```
Si dovrebbe usare questo solo con il valore non predefinito del falso se il vostroERDDAP™ha un sacco di dataset con dimensioni molto grandi (ad esempio, milioni di valori, ad esempio, inEDDGridDai set di dati AudioFiles) eERDDAPL'uso della memoria è sempre troppo alto. Vedere la Memoria: attualmente utilizzando la linea\\[il tuo Dominio\\]/erddap/status.htmlper monitorareERDDAP™uso della memoria.
     
#### &lt;fileTableInMemory&gt;{#filetableinmemory} 
* [ ** &lt;fileTableInMemory&gt; ** ] (#filetableinmemory #)   (vero o falso (il default) ) è un tag OPTIONAL all'interno&lt;tag dataset&gt; per qualsiasiEDDGridDaFiles ed EDDTable FromFiles dataset che raccontaERDDAP™dove tenere il fileTabella (che ha informazioni su ogni file di dati sorgente) :
    
    * vero = in memoria (che è più veloce ma usa più memoria) 
    * falso = su disco (che è più lento ma non usa memoria) 
    
Per esempio,
    ```
    <fileTableInMemory>true</fileTableInMemory>  
    ```
Se si imposta questo a true per qualsiasi dataset, tenere d'occhio la memoria: attualmente utilizzando la linea\\[il tuo Dominio\\]/erddap/status.htmlassicurare cheERDDAP™ha ancora un sacco di memoria gratuita.
     
#### &lt;fgdcFile&gt;{#fgdcfile} 
* [ ** &lt;fgdcFile&gt; ** ] (#fgdcfile) è un tag OPTIONAL all'interno di un&lt;tag dataset&gt; indatasets.xmlche diceERDDAP™utilizzare un file FGDC pre-made invece di avereERDDAP™cercare di generare il file. Utilizzo:
```
    <fgdcFile>*fullFileName*</fgdcFile>  
```
     *pieno Nome del file* può fare riferimento a un file locale (da qualche parte sul file system del server) o l'URL di un file remoto.
Se *pieno Nome del file* \\=""" o il file non viene trovato, il dataset non avrà metadati FGDC. Quindi questo è anche utile se si desidera sopprimere i metadati FGDC per un datoset specifico.
Oppure, puoi mettere&lt;fgdcActive&gt;false&lt;/fgdcActive&gt; in setup.xml per direERDDAP™non offrire metadati FGDC per qualsiasi dataset.
     
#### &lt;iso19115 File&gt;{#iso19115file} 
* [ ** &lt;iso19115File&gt; ** ] (#iso19115file) è un tag OPTIONAL all'interno di un&lt;tag dataset&gt; indatasets.xmlche diceERDDAP™utilizzare un file ISO 19115 pre-made invece di avereERDDAP™cercare di generare il file. Utilizzo:
    ```
    <iso19115File>*fullFileName*</iso19115File>  
    ```
     *pieno Nome del file* può fare riferimento a un file locale (da qualche parte sul file system del server) o l'URL di un file remoto.
Se *pieno Nome del file* \\=""" o il file non è trovato, il dataset non avrà metadati ISO 19115. Quindi questo è utile anche se si desidera sopprimere i metadati ISO 19115 per un datoset specifico.
Oppure, puoi mettere&lt;iso19115Active&gt;false&lt;/iso19115Active&gt; in setup.xml per direERDDAP™non offrire metadati ISO 19115 per qualsiasi dataset.
     
#### &lt;matchAxis NDigits&gt;{#matchaxisndigits} 
* [ ** &lt;matchAxisNDigits&gt; ** ] (Traduzione:) è un tag OPTIONAL all'interno di unEDDGrid &lt;tag dataset&gt; perEDDGriddatasets che sono aggregazioni, ad esempio, aggregazioni di file. Ogni volta che il dataset viene ricaricato,ERDDAP™controlla che i valori dell'asse di ogni componente dell'aggregazione siano gli stessi. La precisione del test è determinata dalla[matchAxisNDigits](#matchaxisndigits), che specifica il numero totale di cifre che devono corrispondere quando si verificano i valori dell'asse di doppia precisione, 0 - 18 (il default) . Quando si verificano i valori dell'asse galleggiante, il test viene eseguito con matchAxisNDigits/2 cifre. Un valore di 18 o superiore diceEDDGridper fare un test esatto. Un valore di 0 diceEDDGridnon fare alcun test, che non è raccomandato, tranne come descritto di seguito.
    
Anche seEDDGridconsente ai componenti dell'aggregazione di avere valori di asse leggermente diversi, solo un insieme di valori di asse viene mostrato all'utente. Il set proviene dallo stesso componente che fornisce i metadati sorgente del dataset. Per esempio, perEDDGridFromFiles datasets, che è specificato dal&lt;metadatidall’impostazione (default=last) .
    
L'uso di matchAxisNDigits\\=0 è fortemente scoraggiato nella maggior parte dei casi, perché si spegne tutto il controllo. Anche il controllo minimo è utile perché assicura che i componenti siano adatti per l'aggregazione. Tutti presumiamo che tutti i componenti sono adatti, ma non è sempre così. Questo è quindi un importante test di sanità. Anche i valori di matchAxisNDigits1, 2, 3 o 4 sono scoraggiati perché i valori di asse diversi spesso indicano che i componenti sono stati creati (- Cessato?) un modo diverso e non sono quindi adatti per aggregazione.
    
C'è un caso in cui l'utilizzo di matchAxisNDigits\\=0 è utile e raccomandato: con aggregazioni di file remoti, ad esempio, i dati in secchi S3. In questo caso, se il dataset utilizza cacheFromUrl, cacheSizeGB, matchAxisNDigits\\=0, eEDDGridSistema FromFiles per[Aggregazione tramite Nome di file](#aggregation-via-file-names-or-global-metadata)AlloraEDDGridnon deve leggere tutti i file remoti per fare l'aggregazione. Questo consente ai datasets fatti da dati in secchi S3 di caricare molto rapidamente (invece di assurdamente lentamente seEDDGriddeve scaricare e leggere tutti i file) .
    
#### &lt;nThreads&gt;{#nthreads} 
* A partire daERDDAP™versione 2.00, quando qualsiasi sottoclasse di EDDTableFromFiles oEDDGridlegge i dati dalla sua fonte, può leggere un pezzo di dati (ad esempio, un file sorgente) in un momento (in un filo)   (questo è il default) o più di un pezzo di dati (ad esempio, 2+ file sorgente) in un momento (in 2 o più fili) durante l'elaborazione di ogni richiesta.
     
    * Regola di Thumb:
Per la maggior parte dei set di dati sulla maggior parte dei sistemi, utilizzare nThreads=1, il default. Se hai un computer potente (un sacco di core della CPU, un sacco di memoria) , quindi considerare l'impostazione nThreads a 2, 3, 4, o superiore (ma mai più del numero di core della CPU nel computer) per set di dati che potrebbero beneficiare:
        
        * La maggior parte dei set di dati EDDTableFromFiles beneficerà.
        * I set di dati in cui qualcosa provoca un ritardo prima di un pezzo di dati possono effettivamente essere trattati beneficeranno, ad esempio:
            * Datasets con[esternamente compresso (ad esempio,.gz) ](#externally-compressed-files)binario binario (ad esempio,.nc) file, perchéERDDAP™deve decomprimere l'intero file prima che possa iniziare a leggere il file.
            * Datasets che utilizzano[cacheSizeGB](#cachefromurl)perchéERDDAP™spesso deve scaricare il file prima che possa leggerlo.
            * Datasets con file di dati memorizzati su un file system parallelo ad alta larghezza di banda, perché può fornire più dati, più veloce, quando richiesto. Esempi di file system paralleli includono[JBOD](https://en.wikipedia.org/wiki/Non-RAID_drive_architectures)♪[p.](http://www.pnfs.com/)♪[Gluster](https://en.wikipedia.org/wiki/Gluster), Amazon S3, e Google Cloud Storage.
                 
        
Attenzione: Quando si utilizza nThreads&gt;1, tenere d'occhioERDDAPuso della memoria, uso del filo e reattività generale (vedi[ERDDAPPagina di stato](/docs/server-admin/additional-information#status-page)) . Vedi i commenti su questi problemi qui sotto.
         
    * Per un dato set di dati, questa impostazione nThreads può provenire da diversi luoghi:
        
        * Sedatasets.xmlchunk per un dataset ha un&lt;nThreads&gt; tag (entro&lt;dataset&gt; tag, non come attributo globale) con un valore &gt;= 1, quel valore di nThreads è usato. Così, è possibile specificare un numero diverso per ogni dataset.
        * Altrimenti, sedatasets.xmlha un&lt;nTableThreads&gt; tag (per EDDTable FromFiles datasets) o&lt;nGridThreads&gt; tag (perEDDGridset di dati) con un valore &gt;= 1, fuori di un&lt;dataset&gt; tag, che valore di nThreads viene utilizzato.
        * In caso contrario, viene utilizzato 1 thread, che è una scelta sicura in quanto utilizza la minima quantità di memoria.
             
        
Per il[originale originaleERDDAP™installazione](https://coastwatch.pfeg.noaa.gov/erddap/index.html)# Usiamo #
        &lt;nTableThreads&gt; 6&lt;/nTableThreads&gt; (E' un server potente.) Le richieste difficili ora richiedono il 30% dell'ora precedente.
         
##### Monitorare l'utilizzo delle risorse{#monitor-resource-usage} 
Quando si sta sperimentando con diverse impostazioni nThreads (e forse facendo domande di campione difficili al vostroERDDAP) , è possibile monitorare l'utilizzo delle risorse del computer:
* Su Mac, utilizzare Finder: Applicazioni: Utilità: Monitor di attività
* Su Linux, usa il top
* Su Windows 10, utilizzare *Ctrl + Shift + Esc* per aprire Task Manager
             
##### Avvertenza: Risponsabilità ridotta{#warning-decreased-responsiveness} 
In isolamento,ERDDAP™soddisferà una richiesta a un set di dati con un nThreads più alto impostazione più veloce di se nThreads=1. Ma mentre questa richiesta è in fase di elaborazione, altre richieste da altri utenti saranno un po' affollate e ottenere una risposta più lenta. Anche, quandoERDDAP™risponde a una data richiesta, altre risorse di calcolo (ad esempio, accesso a disco, larghezza di banda di rete) può essere limitante, soprattutto con impostazioni nThreads più elevate. Così con le impostazioni nThreads più elevate, la reattività del sistema generale sarà peggiore quando ci sono più richieste di elaborazione -- questo può essere molto fastidioso per gli utenti&#33; A causa di questo: non impostare nThreads a più del numero di core della CPU nel computer. nThreads=1 è l'impostazione più giusta da ogni richiesta (tra diverse richieste simultanee) otterrà una pari quota di risorse di calcolo. Ma il più potente il computer, meno questo sarà un problema.
         
##### Avvertenza: memoria più alta Uso perEDDGridDatasets{#warning-higher-memory-use-for-eddgrid-datasets} 
L'uso della memoria durante le richieste di elaborazione è direttamente proporzionale all'impostazione nThreads. Una regola ragionevolmente sicura del pollice è: è necessario impostare[ERDDAPImpostazioni di memoria](/docs/server-admin/deploy-install#memory)almeno 2GB + (2GB) . Alcune richieste ad alcuni set di dati avranno bisogno di più memoria di quello. Ad esempio, impostando nThreads=3 per qualsiasiEDDGriddataset significa che l'impostazione -Xmx dovrebbe essere almeno -Xmx8000M. Se tale impostazione di memoria è maggiore di 3/4 la memoria fisica del computer, diminuire l'impostazione nThreads in modo da poter diminuire l'impostazione di memoria.

L'uso della memoria delle richieste di elaborazione dei thread a EDDTable datasets è quasi sempre più basso perché i file sono di solito molto più piccoli. Tuttavia, se un dato set di dati EDDTable ha enorme (ad esempio, &gt;=1 GB) i file di dati, quindi i commenti sopra si applicheranno a tali set di dati pure.

Qualunque sia l'impostazione nThreads, tenere d'occhio attentamente le statistiche di utilizzo della memoria sul tuo[ERDDAPPagina di stato](/docs/server-admin/additional-information#status-page). Non dovresti mai avvicinarti a massimizzare l'utilizzo della memoriaERDDAP; altrimenti ci saranno gravi errori e guasti.
        
##### Set temporaneo a 1{#temporarily-set-to-1} 
Se l'utilizzo della memoria corrente è anche leggermente alto,ERDDAP™impostare nThreads per questa richiesta a 1. Così,ERDDAP™conserva la memoria quando la memoria è scarsa.
         
##### Diminishing Resi{#diminishing-returns} 
Ci sono ritorni in diminuzione per aumentare l'impostazione nThreads: 2 thread saranno molto meglio di 1 (se ignoriamo il overclock dinamico) . Ma 3 sarà solo un pezzo migliore di 2. E 4 sarà solo marginalmente migliore di 3.

In una prova di una query difficile a un grande dataset EDDTable, il tempo di risposta utilizzando 1, 2, 3, 4, 5, 6 threads era 38, 36, 20, 18, 13, 11 secondi. (Ora usiamo nTableThreads=6 su quel server.) 

Traduzione: Anche se, c'è spesso un beneficio significativo per specificare nThreads=2 invece di nThreads=1, spesso non farà molta differenza nel tempo dell'orologio necessario per rispondere alla richiesta di un dato utente. Il motivo è: con nThreads=1, la maggior parte delle CPU moderne spesso[dinamicamente overclock](https://en.wikipedia.org/wiki/Intel_Turbo_Boost)  (turbo booster) aumentare temporaneamente la velocità dell'orologio della CPU. Così con nThreads=1, l'unico core sarà spesso lavorare ad una velocità di clock più alta di ciascuno dei due core se si utilizza nThreads=2. Indipendentemente, pensiamo ancora che sia meglio usare nThreads=2 piuttosto che nThreads=1, in quanto tale impostazione darà risultati migliori in una più ampia varietà di situazioni. E, naturalmente, se il computer ha abbastanza core della CPU, un'impostazione nThreads ancora più alta dovrebbe produrre risultati migliori.

Come accennato in precedenza, le impostazioni nThreads molto elevate possono portare a risposte più rapide ad alcune richieste, ma il rischio di riduzione complessivaERDDAP™reattività e alto uso della memoria (come indicato sopra) mentre quelle richieste vengono elaborate significa che in genere non è una buona idea.
        
##### CPU Nuclei{#cpu-cores} 
Non si dovrebbe mai impostare nThreads a un numero più grande del numero di core della CPU nella CPU del computer. Essenzialmente tutte le CPU moderne hanno core multipli (ad esempio, 2, 4 o 8) . Alcuni computer hanno anche più CPU (ad esempio, 2 CPU \\* 4 core/CPU = 8 core della CPU) . Per scoprire quante CPU e core ha un computer:

* Su Mac, utilizzare *Chiave di opzione* : Menù di mele : Informazioni di sistema
* Su Linux, utilizzare cat /proc/cpuinfo
* Su Windows 10, utilizzare *Ctrl + Shift + Esc* per aprire Task Manager: Performance (I processori logici mostrano il numero totale di core della CPU) 

Sì, la maggior parte dei processori in questi giorni dicono che supportano 2 thread per core (via[iper-threading](https://en.wikipedia.org/wiki/Hyper-threading)) , ma i 2 thread condividono risorse di calcolo, in modo da non vedere il doppio del throughput su una CPU sotto carico pesante. Ad esempio, un computer con una CPU con 4 core può affermare di supportare fino a 8 thread, ma non dovresti mai superare nThreads=4 in questoERDDAP. Ricordate che:

* L'impostazione nThreads inERDDAP™è a richiesta.ERDDAP™spesso gestisce più richieste contemporaneamente.
*   ERDDAP™fa cose diverse dalle richieste di processo, ad esempio, ricaricare i set di dati.
* QuandoERDDAP™risponde a una data richiesta, altre risorse di calcolo (ad esempio, accesso a disco, larghezza di banda di rete) può essere limitante. Più alto si imposta nThreads, più probabile che queste altre risorse saranno massimizzate e rallenteràERDDAPLa reattività generale.
* Il sistema operativo fa cose diverse da eseguireERDDAP.

Quindi è meglio non impostare l'impostazione nThreads a più del numero di core nella CPU del computer.
         
##### Il tuo migliaio di maggio Vary (YMMV)  {#your-mileage-may-vary-ymmv} 
I risultati delle diverse impostazioni nThreads variano notevolmente per diverse richieste a diversi set di dati su diversi sistemi. Se davvero si desidera conoscere l'effetto delle diverse impostazioni nThreads, eseguire test realistici.
         
##### Perché nThreads per richiesta?{#why-nthreads-per-request} 
Riesco a sentire qualcuno di voi pensare "Perché nThreads per richiesta? Se stessi codificando questo, userei un pool di filettatura permanente del lavoratore e una coda di messaggistica per migliorare le prestazioni." Il problema con l'utilizzo di un pool di thread dei lavoratori e una coda di messaggistica è che una richiesta difficile inondare la coda con numerosi compiti lenti. Questo blocco potrebbe effettivamenteERDDAP™dall'avvio anche di lavori relativi ad altre richieste fino alla richiesta iniziale (essenzialmente) finito. Così, anche semplici richieste successive risponderebbero super lentamente.ERDDAPL'uso di nThreads per richiesta porta ad un uso molto più equo delle risorse di calcolo.
         
##### nThreads vs. Multiple Worker Computers{#nthreads-vs-multiple-worker-computers} 
Sfortunatamente,ERDDAPIl sistema nThreads non sarà mai così efficace come il vero parallelismo attraverso più computer dei lavoratori, con ogni lavoro su un pezzo di dati, nel modo in cui Hadoop o Apache Spark sono di solito utilizzati. Quando l'attività è realmente parallelizzata/distribuita a più computer, ogni computer può utilizzare tutte le sue risorse da parte sua dell'attività. ConERDDAP's nThreads system, ciascuno dei thread è in competizione per la larghezza di banda dello stesso computer, unità disco, memoria, ecc. Purtroppo, la maggior parte di noi non ha le risorse o i fondi per istituire o anche affittare (su Amazon Web Services (AWS) o Google Cloud Platform (GCP) ) grandi reti di computer. Inoltre, a differenza di un database relazionale che è permesso di restituire le righe di risultato in qualsiasi ordine,ERDDAP™fa una promessa di restituire le righe di risultato in un ordine coerente. Questo vincolo faERDDAP's nThreads attuazione meno efficiente. MaERDDAP's nThreads è utile in molti casi.

Tuttavia, ci sono modi per fareERDDAP™scala per gestire un numero enorme di richieste rapidamente impostando un[griglie/cluster/federazioneERDDAP#](/docs/server-admin/scaling).
         
#### &lt;tavolozza &gt;{#palettes} 
* A partire daERDDAP™versione 2.12,datasets.xmlpuò includere un&lt;&gt; tag (entro)&lt;erddapDatasets&gt;) che sovrascrive il&lt;palettes&gt; valore tag da messaggi.xml (o ritorna al valore di message.xml se il tag indatasets.xmlè vuoto) . Questo consente di modificare l'elenco delle palette disponibili mentreERDDAP™sta correndo. Ti permette anche di fare un cambiamento e di farlo persistere quando si installa una nuova versione diERDDAP.
ATTENZIONE: Le palette elencate indatasets.xmldeve essere un superset delle palette elencate in message.xml; altrimentiERDDAP™getterà un'eccezione e interrompere l'elaborazionedatasets.xml. Questo assicura tuttoERDDAP™installazioni almeno supportano le stesse palette di base.
ATTENZIONE:ERDDAP™controlla che i file di tavolozza specificati in message.xml effettivamente esistono, ma non controlla i file di tavolozza elencati indatasets.xml. E' tua responsabilità assicurarti che i file siano presenti.
    
Anche a partire daERDDAP™versione 2.12, se fai una sottodirectory cptfiles nellaERDDAP™directory dei contenuti,ERDDAP™copiare tutti i file \\*.cpt in quella directory nella\\[tomcat\\]/webapps/erddap/WEB-INF/cptfiles directory ogni voltaERDDAP™Comincia. Così, se si mette i file cpt personalizzati in quella directory, quei file saranno utilizzati daERDDAP™, senza alcun ulteriore sforzo da parte vostra, anche quando si installa una nuova versione diERDDAP.
    
ATTENZIONE: Se aggiungi palette personalizzate alle tueERDDAP™e tu haiEDDGridFromErddap e/o EDDTableFromErddap datasets nel vostroERDDAP™, quindi gli utenti vedranno le opzioni di tavolozza personalizzateERDDAP™Fare pagine web di un grafico, ma se l'utente tenta di utilizzarli, otterrà un grafico con il default (di solito Arcobaleno) tavolozza. Questo perché l'immagine è fatta dal telecomandoERDDAP™che non ha la tavolozza personalizzata. Le uniche soluzioni ora sono di e-mail il telecomandoERDDAP™amministratore per aggiungere le tue palette personalizzate al suo / suoERDDAPo e-mail Chris. John a noa.gov per chiedere che le palette vengano aggiunte allo standardERDDAP™distribuzione.
    
#### &lt;onChange&gt;{#onchange} 
* [ ** &lt;&gt; ** ] (# Il cambiamento #) è un tag OPTIONAL all'interno di un&lt;tag dataset&gt; indatasets.xmlche specifica un'azione che verrà eseguita quando questo set di dati viene creato (quandoERDDAP™è riavviata) e ogni volta che questo set di dati cambia in qualsiasi modo.
    * Attualmente, perEDDGridsottoclassi, qualsiasi cambiamento a metadati o a una variabile di asse (per esempio, un nuovo punto di tempo per i dati in tempo quasi reale) è considerato un cambiamento, ma una ricarica del dataset non è considerata una modifica (da solo) .
    * Attualmente, per le sottoclassi EDDTable, qualsiasi ricarica del dataset è considerata una modifica.
    * Attualmente sono ammessi solo due tipi di azioni:
        * " http://" o " https://" -- Se l'azione inizia con " http://" o " https://" ♪ERDDAP™invierà unHTTP GETrichiedere l'URL specificato. La risposta sarà ignorata. Ad esempio, l'URL potrebbe dire ad un altro servizio web di fare qualcosa.
            * Se l'URL ha una parte di query (dopo il "?") , deve essere già[per cento codificato](https://en.wikipedia.org/wiki/Percent-encoding). È necessario codificare caratteri speciali nei vincoli (oltre alla prima '&' e la principale'='in vincoli) nella forma %HH, dove HH è il valore esadecimale a 2 cifre del carattere. Di solito, è sufficiente convertire alcuni dei caratteri di punteggiatura: % in %25, & in %26, " in %22,&lt;in %3C, = in %3D, &gt; in %3E, + in %2B,|in %7C,\\[in %5B,\\]in %5D, spazio in %20, e convertire tutti i caratteri sopra #127 nella loro forma UTF-8 e quindi per cento codificare ogni byte del modulo UTF-8 nel formato %H (chiedere aiuto a un programmatore) .
Per esempio, &stationID&gt;="41004"
diventa &gt;stationID%3=%2241004%22
Percente codifica è generalmente richiesto quando si accedeERDDAPtramite software diverso da un browser. I browser di solito gestiscono la codifica percentuale per voi.
In alcune situazioni, è necessario per cento codificare tutti i caratteri diversi da A-Za-z0-9\\_-&#33;~ ' () \\*, ma ancora non codificare la prima '&' o la principale'='nei vincoli.
Le lingue di programmazione hanno strumenti per farlo (ad esempio, vediJava'[java.net.URLEncoder](https://docs.oracle.com/javase/8/docs/api/java/net/URLEncoder.html)eJavaScript's [encodeURIComponent()] ( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent ) ) e ci sono
                [siti web che per cento codificare / decodificare per voi](https://www.url-encode-decode.com/).
            * Dadatasets.xmlè un file XML, devi anche &-encode ALL '&', '&lt;', e '&gt;' nell'URL come '&amp;', '&lt;', e '&gt;' dopo la codifica percentuale.
            * Esempio: Per un URL che si potrebbe digitare in un browser come:
                 https://www.company.com/webService?department=R%26D&param2=value2   
Si dovrebbe specificare un&lt;tag onChange&gt; via (su una linea) 
            ```
                <onChange>https://www.company.com/webService?department=R%26D&amp;param2=value2</onChange>
            ```
        * mailto: -- Se l'azione inizia con "mailto:",ERDDAP™invierà una e-mail all'indirizzo e-mail successivo indicando che il dataset è stato aggiornato/cambiato.
Per esempio:&lt;onChange&gt;mailto:john.smith@company.com&lt;/onChange&gt; Se hai una buona ragioneERDDAP™per sostenere qualche altro tipo di azione, inviarci una e-mail che descrive quello che vuoi.
    * Questo tag è OPTIONAL. Ci possono essere molti di questi tag come si desidera. Utilizzare uno di questi tag per ogni azione da eseguire.
    * Questo è analogo aERDDAP's email/sistema di abbonamento URL, ma queste azioni non vengono memorizzate persistentmente (cioè, sono memorizzati solo in un oggetto EDD) .
    * Per rimuovere un abbonamento, basta rimuovere il&lt;tag onChange&gt;. La modifica sarà notata la prossima volta che il dataset viene ricaricato.
         
#### &lt;reloadEveryNMinutes&gt;{#reloadeverynminutes} 
* [ ** &lt;ricarica Tutti i prodotti ** ] (#reloadeverynminutes) è un tag OPTIONAL all'interno di un&lt;tag dataset&gt; indatasets.xmldi quasi tutti i tipi di dataset che specifica quanto spesso il dataset dovrebbe essere ricaricato. Per esempio,
    ```
    <reloadEveryNMinutes>60</reloadEveryNMinutes>
    ```
    * Generalmente, i set di dati che cambiano frequentemente (per esempio, ottenere nuovi file di dati) dovrebbe essere ricaricato frequentemente, per esempio, ogni 60 minuti.
    * I set di dati che cambiano raramente devono essere ricaricati di rado, ad esempio ogni 1440 minuti (ogni giorno) o 10080 minuti (settimanale settimanale) .
    * Questo tag è OPTIONAL, ma consigliato. Il default è 10080.
    * Un esempio è:&lt;reloadEveryNMinuts&gt;1440&lt;/Ricarica Tutti i prodotti
    * Quando un dataset viene ricaricato, tutti i file *BigParentDirectory* /cache/ *datasetID* directory vengono eliminati.
    * Non importa a cosa sia impostato, un dataset non verrà caricato più frequentemente di&lt;caricoDatasetsMinMinutes&gt; (predefinito = 15) , come specificato[setup.xml](/docs/server-admin/deploy-install#setupxml). Quindi, se si desidera che i set di dati vengano ricaricati molto frequentemente, è necessario impostare sia reloadEveryNMinutes che loadDatasets MinMinutes a piccoli valori.
    * Non impostare reloadEveryNMinutes allo stesso valore di loadDatasets MinMinutes, perché il tempo trascorso è probabile (per esempio) 14:58 o 15:02, così il dataset sarà ricaricato solo in circa la metà dei principali reload. Invece, utilizzare un più piccolo (per esempio, 10) o più grandi (per esempio, 20) ricarica Il valore di EveryNMinutes.
    * Indipendentemente da reloadEveryNMinutes, si può dire manualmenteERDDAP™per ricaricare un dataset specifico il prima possibile tramite un[file flag](/docs/server-admin/additional-information#flag).
    * Per i programmatori curiosi -- InERDDAP™, il reload di tutti i dataset è gestito da due fili singoli. Un thread avvia un reload minore se trova un file di bandiera o un reload maggiore (che controlla tutti i set di dati per vedere se devono essere ricaricati) . L'altro thread fa il carico effettivo dei set di dati uno alla volta. Questi thread funzionano sullo sfondo assicurando che tutti i set di dati siano aggiornati. Il thread che realmente fa i reload prepara una nuova versione di un dataset poi lo scambia in luogo (essenzialmente sostituire la vecchia versione atomicamente) . Quindi è molto possibile che si verifichi la seguente sequenza di eventi (è una buona cosa) :
        
        1.  ERDDAP™inizia a ricaricare un dataset (fare una nuova versione) sullo sfondo.
        2. L'utente 'A' fa una richiesta al dataset.ERDDAP™utilizza la versione corrente del dataset per creare la risposta. (Bene. Non c'è stato alcun ritardo per l'utente, e la versione corrente del dataset non dovrebbe mai essere molto stante.) 
        3.  ERDDAP™termina creando la nuova versione ricaricata del dataset e scambia quella nuova versione in produzione. Tutte le successive nuove richieste sono gestite dalla nuova versione del dataset. Per coerenza, la richiesta dell'utente A è ancora stata riempita dalla versione originale.
        4. L'utente 'B' fa una richiesta al dataset eERDDAP™utilizza la nuova versione del dataset per creare la risposta.
        5. Le richieste dell'utente A e dell'utente B sono completate (Forse Prima le finiture di A, forse le finiture di B) .
        
Sento qualcuno che dice: "Solo due tristi&#33; Ha&#33; E' patetico&#33; Egli dovrebbe impostare questo in modo che il ricaricamento dei set di dati utilizza il maggior numero di thread come sono necessari, in modo che tutto viene fatto più veloce e con poco o nessun ritardo." Si' e no. Il problema è che il caricamento più di un dataset alla volta crea diversi problemi nuovi difficili. Tutti devono essere risolti o trattati. L'attuale sistema funziona bene e ha problemi gestibili (per esempio, il potenziale di ritardo prima di una bandiera viene notato) . (Se hai bisogno di aiuto per gestirli, consulta il nostro[sezione per ottenere supporto aggiuntivo](/docs/intro#support).) Il relativo[aggiornamento OgniNMillis](#updateeverynmillis). il sistema funziona all'interno di thread di risposta, in modo che può e porta a più set di dati essere aggiornato (non il pieno carico) contemporaneamente.
##### Proattivo vs. Reattivo{#proactive-vs-reactive} 
ERDDAPIl sistema di ricarica è proattivo -- i set di dati vengono ricaricati subito dopo il loro ricarica Il tempo di EveryNMinutes è finito (cioè, diventano "stale", ma mai molto stanti) , se il dataset riceve richieste dagli utenti o meno. Quindi...ERDDAP™i dataset sono sempre aggiornati e pronti all'uso. Questo è in contrasto con l'approccio reattivo di THREDDS: la richiesta di un utente è ciò che dice a THREDDS di verificare se un dataset è stallo (può essere molto stante) . Se è stallo, THREDDS fa aspettare l'utente (spesso per qualche minuto) mentre il dataset viene ricaricato.
        
#### &lt;aggiornamento EveryNMillis&gt;{#updateeverynmillis} 
* [ ** &lt;aggiornamentoOgni giorno ** ] (#updateeverynmillis #) è un tag OPTIONAL all'interno di un&lt;tag dataset&gt; indatasets.xmldi alcuni tipi di dataset che aiutanoERDDAP™lavorare con i dataset che cambiano molto frequentemente (come spesso ogni secondo) . DiversamenteERDDAPE' normale, proattivo,&lt;ricarica Tutti i bambini &gt; (#reloadeverynminutes) sistema per ricaricare completamente ogni dataset, questo sistema aggiuntivo OPTIONAL è reattivo (attivato da una richiesta utente) e più veloce perché è incrementale (solo aggiornando le informazioni che devono essere aggiornate) . Per esempio, se una richiesta a unEDDGridFromDap dataset si verifica più del numero specificato di millisecondi dall'ultimo aggiornamento,ERDDAP™vedrà se ci sono nuovi valori per i più a sinistra (prima, di solito"time") dimensione e, se è così, basta scaricare quei nuovi valori prima di gestire la richiesta dell'utente. Questo sistema è molto buono a mantenere un rapido cambiamento dei dati di configurazione up-to-date con richieste minime sulla fonte di dati, ma al costo di rallentare leggermente il trattamento di alcune richieste dell'utente.
    * Per utilizzare questo sistema, aggiungere (per esempio) :
        ```
        <updateEveryNMillis>1000</updateEveryNMillis>  
        ```
subito dopo&lt;reloadEveryNMinuts&gt; tag per il dataset indatasets.xml. Il numero di millisecondi che si specifica può essere piccolo come 1 (per garantire che il dataset sia sempre aggiornato) . Un valore di 0 (il default) o un numero negativo spegne il sistema.
    * A causa della loro natura incrementale, gli aggiornamenti dovrebbero finire molto rapidamente, quindi gli utenti non dovrebbero mai aspettare molto tempo.
    * Se una seconda richiesta di dati arriva prima che l'aggiornamento precedente sia terminato, la seconda richiesta non attiva un altro aggiornamento.
    * Durante tutta la documentazione, cercheremo di utilizzare la parola "ricarica" per i normali, completi reload di dataset e "aggiornamento" per questi nuovi aggiornamenti incrementali e parziali.
    * Per scopi di prova, alcuni diagnostica sono stampati a log.txt se [&lt;logLevel&gt;] (#loglevel) indatasets.xmlè impostato su "tutti".
    * Se si utilizzano aggiornamenti incrementali e soprattutto se la sinistra (primo) , per esempio, il tempo, l'asse è grande, si può desiderare di impostare&lt;reloadEveryNMinutes&gt; a un numero maggiore (1440?) , in modo che gli aggiornamenti facciano la maggior parte del lavoro per mantenere il dataset up-to-date, e i carichi completi sono fatti di rado.
    * Nota: questo nuovo sistema di aggiornamento aggiorna i metadati (per esempio, il tempoactual\\_range, time\\_coverage\\_end, ...) ma non si attiva suChange (email o contatto URL) o cambiareRSSalimentazione (Forse dovrebbe...) .
    * Per tutti i set di dati che utilizzano sottoclassi di[EDDGridDa Fili](#eddgridfromfiles)e[EDDTableFromFiles](#eddtablefromfiles):
        *    **ATTENZIONE:** quando si aggiunge un nuovo file di dati a un dataset copiandolo nella directory cheERDDAP™guarda, c'è un pericolo cheERDDAP™noterà il file parzialmente scritto; cercare di leggerlo, ma fallire perché il file è incompleto; dichiarare il file di essere un file "cattivo" e rimuoverlo (temporaneamente) dal dataset.
Per evitare questo, noi **RACCOMANDAZIONE** che si copia un nuovo file nella directory con un nome temporaneo (per esempio, 20150226.ncT.) che non corrisponde al file datasets NomeRegex (*.nc) , poi rinominare il file al nome corretto (per esempio, 20150226.nc) . Se si utilizza questo approccio,ERDDAP™ignorerà il file temporaneo e noterà solo il file correttamente chiamato quando è completo e pronto per essere utilizzato.
        * Se si modificano i file di dati esistenti in atto (per esempio, per aggiungere un nuovo punto dati) ♪&lt;updateEveryNMillis&gt; funzionerà bene se le modifiche appaiono atomicamente (in un istante) e il file è sempre un file valido. Ad esempio, la libreria netcdf-java consente di aggiungere la dimensione illimitata di un "classico".ncfile v3 da fare atomicamente.
            &lt;updateEveryNMillis&gt; funzionerà male se il file è invalido mentre le modifiche vengono effettuate.
        *   &lt;updateEveryNMillis&gt; funzionerà bene per i set di dati in cui uno o pochi file cambiano in una breve quantità di tempo.
        *   &lt;updateEveryNMillis&gt; funzionerà male per i set di dati in cui un gran numero di file cambiano in una breve quantità di tempo (a meno che i cambiamenti non appaiono atomicamente) . Per questi set di dati, è meglio non utilizzare&lt;updateEveryNMillis&gt; e impostare un[bandiera](/docs/server-admin/additional-information#set-dataset-flag)per direERDDAP™per ricaricare il dataset.
        *   &lt;aggiornamentoOgni giorno non aggiorna le informazioni associate a [&lt;subsetVariables&gt; (# Subsetvariables #) . Normalmente, questo non è un problema, perché ilsubsetVariablesavere informazioni su cose che non cambiano molto spesso (per esempio, l'elenco dei nomi delle stazioni, delle latitudini e delle longitudini) . SesubsetVariablesmodifiche dei dati (per esempio, quando una nuova stazione viene aggiunta al dataset) , quindi contattare il[URL della bandiera](/docs/server-admin/additional-information#set-dataset-flag)per il dataset da raccontareERDDAP™per ricaricare il dataset. Altrimenti...ERDDAP™non noterà il nuovo sottoset Informazioni variabili fino alla successiva ricarica del dataset (&lt;reloadEveryNMinutes&gt;).
        * La nostra raccomandazione generica è quella di utilizzare:
        ```
            <reloadEveryNMinutes>1440</reloadEveryNMinutes>  
            <updateEveryNMillis>10000</updateEveryNMillis>
        ```
        * Davvero? Su computer Linux, se si utilizza&lt;aggiornamentoOgni giorno conEDDGridFromFiles o EDDTableFromFiles classi, si può vedere un problema in cui un dataset non riesce a caricare (occasionalmente o regolarmente) con il messaggio di errore: "IOException: Limite utente di inotify istanze raggiunte o troppi file aperti". La causa può essere un bug inJavache causa inotify istanze di non essere spazzatura raccolta. Questo problema è evitato inERDDAP™v1.66 e più in alto. Quindi la soluzione migliore è quella di cambiare l'ultima versione diERDDAP.
Se questo non risolve il problema (cioè, se si dispone di un gran numero di set di dati utilizzando&lt;updateEveryNMillis&gt;), è possibile risolvere questo problema chiamando:
            ```
            sudo sysctl fs.inotify.max\\_user\\_watches=65536  
            sudo sysctl fs.inotify.max\\_user\\_instances=1024  
            sudo sysctl -p  
            ```
Oppure, utilizzare numeri più alti se il problema persiste. Il default per gli orologi è 8192. Il default per le istanze è 128.
    * Puoi mettere&lt;aggiornamentoMaxEvents&gt;10&lt;/updateMaxEvents&gt; indatasets.xml  (in con le altre impostazioni vicino all'alto) per modificare il numero massimo di modifiche dei file (default = 10) che sarà elaborato dall'aggiornamentoEveryNMillis sistema. Un numero più grande può essere utile per il dataset in cui è molto importante che vengano mantenuti sempre aggiornati. Vedi il[aggiornamento documentazione MaxEvents](#updatemaxevents).
    * Per i programmatori curiosi -- questi aggiornamenti incrementali, a differenzaERDDAPE' piena.[reloadEveryNMinuts](#reloadeverynminutes)sistema, si verificano all'interno dei filetti di richiesta dell'utente. Così, qualsiasi numero di set di dati può essere l'aggiornamento contemporaneamente. C'è il codice (e una serratura) per garantire che un solo thread stia lavorando su un aggiornamento per qualsiasi dato set di dati in qualsiasi momento. Consentire più aggiornamenti simultanei è stato facile; consentire più carichi completi simultanei sarebbe stato più difficile.
         
#### &lt;fonteCanConstrainStringEQNE&gt;{#sourcecanconstrainstringeqne} 
* [ ** &lt;fonteCanConstrainStringEQNE&gt; ** ] (#sourcecanconstrainstringeqne) è un tag OPTIONAL all'interno di un EDDTable&lt;tag dataset&gt; indatasets.xmlche specifica se la sorgente può limitare le variabili di stringa con gli operatori = e &#33;=.
    * Per EDDTableFromDapSequence, questo vale solo per la sequenza esterna String variabili. Si presume che la sorgente non possa gestire alcun vincolo sulle variabili di sequenza interna.
    * Questo tag è OPTIONAL. Valori validi sono veri (il default) e falso.
    * Per EDDTableFromDapSequenceOPeNDAPServer DRDS, questo dovrebbe essere impostato su true (il default) .
    * Per EDDTableFromDapSequence Server Dapper, questo dovrebbe essere impostato su falso.
    * Un esempio è:
```
        <sourceCanConstrainStringEQNE>true</sourceCanConstrainStringEQNE>  
```
         
#### &lt;fonteCanConstrainStringGTLT&gt;{#sourcecanconstrainstringgtlt} 
* [ ** &lt;fonteCanConstrainStringGTLT&gt; ** ] (#sourcecanconstrainstringimentogtlt) è un tag OPTIONAL all'interno di un EDDTable&lt;dataset&gt; tag che specifica se la sorgente può limitare le variabili di stringa con la&lt;♪&lt;=, &gt; e &gt;= operatori.
    * Per EDDTableFromDapSequence, questo vale solo per la sequenza esterna String variabili. Si presume che la sorgente non possa gestire alcun vincolo sulle variabili di sequenza interna.
    * Valori validi sono veri (il default) e falso.
    * Questo tag è OPTIONAL. Il default è vero.
    * Per EDDTableFromDapSequenceOPeNDAPServer DRDS, questo dovrebbe essere impostato su true (il default) .
    * Per EDDTableFromDapSequence Server Dapper, questo dovrebbe essere impostato su falso.
    * Un esempio è:
```
        <sourceCanConstrainStringGTLT>true</sourceCanConstrainStringGTLT>  
```
         
#### &lt;fonteCanConstrainStringRegex&gt;{#sourcecanconstrainstringregex} 
* [ ** &lt;fonteCanConstrainStringRegex&gt; ** ] (#sourcecanconstrainstringregex) è un tag OPTIONAL all'interno di un EDDTable&lt;dataset&gt; tag che specifica se la fonte può limitare le variabili di stringa da espressioni regolari, e se è così, che cosa l'operatore è.
    * Valori validi sono "=~" (ilDAPstandard) # (erroneamente sostenuto da moltiDAPserver) , o " (indicando che la fonte non supporta espressioni regolari) .
    * Questo tag è OPTIONAL. Il default è ".
    * Per EDDTableFromDapSequenceOPeNDAPServer DRDS, questo dovrebbe essere impostato su "" (il default) .
    * Per EDDTableFromDapSequence Server Dapper, questo dovrebbe essere impostato su "" (il default) .
    * Un esempio è:
```
        <sourceCanConstrainStringRegex>=~</sourceCanConstrainStringRegex>  
```
#### &lt;fonteCanDoDistinct&gt;{#sourcecandodistinct} 
* [ ** &lt;fonteCanDoDistintion&gt; ** ] (#sourcecandodistinct) è un tag OPTIONAL all'interno di un EDDTableFromDatabase&lt;dataset&gt; tag che specifica se il database sorgente dovrebbe gestire &distinct () vincoli nelle query degli utenti.
    * Questo tag è OPTIONAL. Valori validi non sono (ERDDAP™maniglie distinte; il default) , parziale (le maniglie di origine distinte eERDDAP™di nuovo) e sì (le maniglie di origine distinte) .
    * Se si utilizza no eERDDAP™sta esaurendo la memoria quando si tratta distinta, usare sì.
    * Se si utilizza sì e il database di origine gestisce troppo lentamente, utilizzare no.
    * parziale ti dà il peggio di entrambi: è lento perché la gestione del database distinta è lenta e può esaurire la memoria inERDDAP.
    * I database interpretano DISTINCT come una richiesta di risultati unici, mentreERDDAP™la interpreta come una richiesta di un elenco ordinato di righe uniche di risultati. Se si imposta questo a parziale o sì,ERDDAP™automaticamente dice anche al database di ordinare i risultati.
    * Una piccola differenza nei risultati:
Senza|parziale,ERDDAP™ordinare "" all'inizio dei risultati (prima di non-" stringhe) .
Con sì, il database può (Postgres sarà) tipo "" alla fine dei risultati (dopo non-"" stringhe) .
Immagino che questo influenzerà anche la selezione di parole corte contro parole più lunghe che iniziano con la parola breve. Per esempio,ERDDAP™ordina "Simon" prima di "Simons".
    * Un esempio è:
```
        <sourceCanDoDistinct>yes</sourceCanDoDistinct>  
```
         
#### &lt;fonteCanOrderBy&gt;{#sourcecanorderby} 
* [ ** &lt;fonte CanOrderBy&gt; ** ] (#sourcecanorderby) è un tag OPTIONAL all'interno di un EDDTableFromDatabase&lt;dataset&gt; tag che specifica se il database sorgente dovrebbe gestire &orderBy (...) vincoli nelle query degli utenti.
    * Questo tag è OPTIONAL. Valori validi non sono (ERDDAP™maniglieorderBy (...) ; il valore predefinito) , parziale (le maniglie di sorgenteorderByeERDDAP™di nuovo) e sì (le maniglie di sorgenteorderBy (...) ) .
    * Se si utilizza no eERDDAP™sta esaurendo la memoria quando si trattaorderBy (...) , usare sì.
    * Se si utilizza sì e le maniglie del database di origineorderBy (...) troppo lentamente, usa no.
    * parziale ti dà il peggio di entrambi: è lento perché la gestione del databaseorderBy (...) è lento e può esaurire la memoria inERDDAP.
    * Una piccola differenza nei risultati:
Senza|parziale,ERDDAP™ordinare "" all'inizio dei risultati (prima di non-" stringhe) .
Con sì, il database può (Postgres sarà) tipo "" alla fine dei risultati (dopo non-"" stringhe) .
Questo può anche influenzare la selezione di parole corte contro parole più lunghe che iniziano con la parola breve. Per esempio,ERDDAP™ordinare "Simon" prima "Simons", ma non sono sicuro di come un database li ordina.
    * Un esempio è:
```
        <sourceCanOrderBy>yes</sourceCanOrderBy>  
```
         
#### &lt;fonteNeedsExpandedFP\\_EQ&gt;{#sourceneedsexpandedfp_eq} 
* [ ** &lt;fonteNeedsExpandedFP\\_EQ&gt; ** ] (#sourceneedsexpandedfp_eq) è un tag OPTIONAL all'interno di un EDDTable&lt;dataset&gt; tag che specifica (vero (il default) o falsi) se la fonte ha bisogno di aiuto con le query&lt;numerico Variabile &gt;=&lt;&gt;=, &gt;=,&lt;=). Per esempio,
    ```
    <sourceNeedsExpandedFP\\_EQ>false</sourceNeedsExpandedFP\\_EQ>
    ```
    * Per alcune fonti di dati, query numeriche che coinvolgono =, &#33;=,&lt;=, o &gt;= non può funzionare come desiderato con numeri di punto galleggiante. Ad esempio, una ricerca di longitudine=220.2 può fallire se il valore viene memorizzato come 220.20000000000001.
    * Questo problema sorge perché i numeri di punti fluttuanti sono[non rappresentato esattamente nei computer](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/).
    * Se fonteNeedsExpandedFP\\_EQ è impostato su true (il default) ♪ERDDAP™modifica le query inviate alla fonte dati per evitare questo problema. E 'sempre sicuro e bene lasciare questo insieme a true.
         
#### &lt;sourceUrl&gt;{#sourceurl} 
* [ ** &lt;sourceUrl&gt; ** ] (#sourceurl #) è un tag comune all'interno di un dataset globale&lt;addAttributes&gt; tag che specifica l'URL che è la fonte dei dati.
    * Un esempio è:
    ```
        <sourceUrl>https://oceanwatch.pfeg.noaa.gov/thredds/dodsC/satellite/VH/chla/1day</sourceUrl>  
    ```
         (ma metti tutto su una linea) 
    * InERDDAP™, tutti i dataset avranno un "sourceUrl" negli attributi globali combinati che vengono mostrati agli utenti.
    * Per la maggior parte dei tipi di dataset, questo tag è REQUIRED. Vedere la descrizione del tipo di dataset per scoprire se questo è REQUIRED o no.
    * Per alcuni set di dati, il separato&lt;sourceUrl&gt; tag non è consentito. Invece, è necessario fornire un "sourceUrl"[attributo globale](#global-attributes), di solito nel globale \\&gt;addAttributes&lt;. Se non c'è un URL sorgente reale (ad esempio, se i dati vengono memorizzati nei file locali) , questo attributo ha spesso solo un valore segnaposto, per esempio,&lt;int name="name"&gt; (file locali) &lt;/att&gt; .
    * Per la maggior parte dei set di dati, questa è la base dell'URL che viene utilizzato per richiedere i dati. Per esempio, perDAPserver, questo è l'URL a cui potrebbero essere aggiunti .dods, .das, .dds o .html.
    * Dadatasets.xmlè un file XML, devi anche codificare '&', '&lt;', e '&gt;' nell'URL come '&amp;', '&lt;', e '&gt;'.
    * Per la maggior parte dei tipi di dataset,ERDDAP™aggiunge l'originalesourceUrl  (il "localSourceUrl" nel codice sorgente) al[attributi globali](#global-attributes)  (dove diventa il "publicSourceUrl" nel codice sorgente) . Quando l'origine dei dati è file locali,ERDDAP™aggiungesourceUrl= (file locali) " agli attributi globali come precauzione di sicurezza. Quando la fonte di dati è un database,ERDDAP™aggiungesourceUrl= (database sorgente) " agli attributi globali come precauzione di sicurezza. Se alcuni dei tuoi set di dati utilizzano non pubblicisourceUrl' (di solito perché il loro computer è nel DMZ o su una LAN locale) si può usare [&lt;convertToPublicSourceUrl&gt;] (#converttopublicsourceurl) tag per specificare come convertire il localesourceUrls a pubblicosourceUrlS.
    * AsourceUrlpuò iniziare conhttp://♪https://, ftp://, e forse altri prefissi.httpsle connessioni leggono e controllano il certificato digitale della fonte per assicurarsi che la fonte sia chi dicono di essere. In rari casi, questo controllo può fallire con l'errore "javax.net.ssl.SSLProtocolException: handshake alert: unrecognized\\_name". Questo è probabilmente dovuto al nome di dominio sul certificato non corrispondente al nome di dominio che si sta utilizzando. È possibile e dovrebbe leggere i dettagli delsourceUrlIl certificato del tuo browser web, in particolare, l'elenco dei "DNS Name" nella sezione "Subject Alternative Name".
        
In alcuni casi, ilsourceUrlsi sta utilizzando può essere un alias del nome di dominio sul certificato. Per esempio,
         https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ getterà questo errore, ma
         https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ , che utilizza il nome di dominio sul certificato, non lo farà. La soluzione in questi casi è quindi quella di trovare e utilizzare il nome di dominio sul certificato. Se non riesci a trovarlo sul certificato, contatta il fornitore di dati.
        
In altri casi, il nome di dominio sul certificato può essere per un gruppo di nomi. Se questo accade o il problema è altrimenti irrisolvibile, si prega di e-mail Chris. John a noaa.gov per segnalare il problema.
         

#### &lt;addAttributes&gt; {#addattributes} 
* [ ** &lt;addAttributes&gt; ** ] (#addattributes) è un tag OPTIONAL per ogni dataset e per ogni variabile che consenteERDDAPgli amministratori controllano gli attributi dei metadati associati a un dataset e alle sue variabili.
    *   ERDDAP™combina gli attributi dalla sorgente del dataset ("Attributi delle risorse") e il "addAttributes" che definisci indatasets.xml  (che hanno priorità) per rendere gli "attributi combinati", che sono cosaERDDAP™gli utenti vedono. Così, si può usareaddAttributesper ridefinire i valori di sorgenteAttributi, aggiungere nuovi attributi, o rimuovere gli attributi.
    * The&lt;addAttributes&gt; tag racchiude 0 o più ** &lt;&gt; ** subtag, che vengono utilizzati per specificare gli attributi individuali.
    * Ogni attributo è costituito da un nome e un valore (che ha un tipo di dati specifico, ad esempio, doppio) .
    * Ci può essere solo un attributo con un dato nome. Se ci sono di più, l'ultimo ha la priorità.
    * Il valore può essere un unico valore o un elenco di valori separato dallo spazio.
    * Traduzione:
        * L'ordine del&lt;all'interno deladdAttributesnon è importante.
        * The&lt;il formato del sottotag è
        ```
            <att name="*name*" \\[type="*type*"\\] >*value*</att>
        ```
        * Il nome di destinazione di tutti gli attributi DEVE iniziare con una lettera (A-Z, a-z) e DEVE contenere solo i caratteri A-Z, a-z, 0-9, o '\\_'.
        * Se un&lt;att&gt; subtag non ha valore o valore di null, tale attributo verrà rimosso dagli attributi combinati.
Per esempio,&lt;att name="rows" /&gt; rimuoverà le righe dagli attributi combinati.
Per esempio,&lt;at name="coordinas"&gt;null&lt;/att&gt; rimuoverà le coordinate dagli attributi combinati.
##### attributo Tipo{#attributetype} 
* [Il valore di tipo OPTIONAL per&lt;&gt; subtag. (# Attributetype #) indica il tipo di dati per i valori. Il tipo predefinito è String. Un esempio di attributo String è:
    ```
    <att name="creator\\_name">NASA/GSFC OBPG</att>
    ```
    * I tipi validi per i valori singoli sono byte (Integer a 8 bit) ♪ (16 bit firmato interi) # (Integer firmato a 32 bit) ♪ (Integer firmato a 64 bit) # (Punto galleggiante a 32 bit) ♪ (Punto galleggiante a 64 bit) , char e String. Per esempio,
        ```
        <att name="scale\\_factor" type="float">0.1</att>
        ```
Vedere queste note sulla[tipo di dati di beneficenza](#char).
Vedere queste note sulla[tipo di dati lungo](#long).
        
    * Tipi validi per liste di valori separate dallo spazio (o valori singoli) sono byteList, shortList, unsignedShortList, charList, intList, longList, floatList, double Lista. Per esempio,
        ```
        <att name="actual\\_range" type="doubleList">10.34 23.91</att>  
        ```
Un non firmatoShortList consente di specificare un elenco di shorts non firmati, ma saranno convertiti in un elenco dei caratteri Unicode corrispondenti (ad esempio, "65 67 69" saranno convertiti in "A C E".
Se si specifica un charList, codificare qualsiasi caratteri speciali (ad esempio, spazio, doppie citazioni, backslash,&lt;#32, o &gt; #127) come li codificareste nella sezione dati di un file NCCSV (ad esempio, ", "\" o """", "\\\\\\\\", "\\n", "\\u20ac") .
Non c'è stringList. Conservare i valori di stringa come String multi-linea. Per esempio,
        ```
        <att name="history">2011-08-05T08:55:02Z ATAM - made CF-1.6 compliant.  
        2012-04-08T08:34:58Z ATAM - Changed 'height' from double to float.</att>  
                ```
                 
#### Attributi globali{#global-attributes} 
* [ ** Attributi globali / Global&lt;addAttributes&gt; ** ] (#global-attributi) --
    &lt;addAttributes&gt; è un tag OPTIONAL all'interno&lt;dataset&gt; tag che viene utilizzato per modificare gli attributi che si applicano all'intero dataset.
    
    *    ** Utilizzare il globale&lt;addAttributes&gt; per modificare gli attributi globali del dataset. ** ERDDAP™combina gli attributi globali dalla sorgente del dataset (** fonteAttributi **) e il globale** addAttributes **che definisci indatasets.xml  (che hanno priorità) per rendere il globale** attributi combinati ** , che sono ciòERDDAP™gli utenti vedono. Così, si può usareaddAttributesper ridefinire i valori di sorgenteAttributi, aggiungere nuovi attributi, o rimuovere gli attributi.
    * Vedere il [ ** &lt;addAttributes&gt; **informazioni] (#addattributes) che si applica a livello globale e variabile** &lt;addAttributes&gt; ** .
    *   [FGDC](https://www.fgdc.gov/standards/projects/FGDC-standards-projects/metadata/base-metadata/index_html)e[ISO 19115-2/19139](https://en.wikipedia.org/wiki/Geospatial_metadata)Metadati -- Normalmente,ERDDAP™genererà automaticamente ISO 19115-2/19139 e FGDC (FGDC-STD-001-1998) File di metadati XML per ogni dataset utilizzando informazioni dai metadati del dataset. Allora... **buon dataset metadati porta a buoniERDDAP-generati metadati ISO 19115 e FGDC. Si prega di considerare di mettere un sacco di tempo e sforzo per migliorare i metadati dei tuoi set di dati (che è una buona cosa da fare comunque) .** La maggior parte degli attributi dei metadati di dataset che vengono utilizzati per generare i metadati ISO 19115 e FGDC sono dei[ACDD metadati standard](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)e sono così annotati di seguito.
    * Molti attributi globali sono speciali in quantoERDDAP™li cerca e li utilizza in vari modi. Per esempio, un link alinfoUrlè incluso su pagine web con liste di dataset e altri luoghi, in modo che gli utenti possano scoprire di più sul dataset.
    * Quando un utente seleziona un sottoinsieme di dati, gli attributi globali relativi alla longitudine della variabile, latitudine, altitudine (o profondità) , e intervalli di tempo (per esempio, Southernmost\\_Northing, Northernmost\\_Northing, time\\_coverage\\_start, time\\_coverage\\_end) vengono generati automaticamente o aggiornati.
    * Un semplice campione globale&lt;addAttributes&gt; è:
        ```
        <addAttributes> 
          <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>
          <att name="infoUrl">https://coastwatch.pfeg.noaa.gov/infog/PH\\_ssta\\_las.html</att>
          <att name="institution">NOAA CoastWatch, West Coast Node</att>
          <att name="title">SST, Pathfinder Ver 5.0, Day and Night, Global</att>
          <att name="cwhdf\\_version" />
        </addAttributes>  
        ```
L'attributo cwhdf\\_version vuoto causa l'attributo sorgente cwhdf\\_version (se c'è) da rimuovere dall'elenco finale, combinato di attributi.
    * Fornire queste informazioni aiutaERDDAP™fare un lavoro migliore e aiuta gli utenti a capire i set di dati.
I buoni metadati rendono un dataset utilizzabile.
I metadati insufficienti rendono inutile un set di dati.
Si prega di prendere il tempo per fare un buon lavoro con attributi metadati.
##### attributi globali speciali inERDDAP™
###### riconoscimento{#acknowledgement} 
*   [ **riconoscimento** ](#acknowledgement)e **riconoscimento**   (dal[ACDDETTI](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)standard metadati) è un modo RACCOMANDATO per riconoscere il gruppo o i gruppi che hanno fornito supporto (in particolare, finanziaria) per il progetto che ha creato questi dati. Per esempio,
    ```
    <att name="acknowledgment">AVISO</att>
    ```    
Nota che ACDD 1.0 e 1.1 hanno usato l'ortografia "acknowledgment" (che è la solita ortografia negli Stati Uniti.) , ma ACDD 1.3 ha cambiato questo in "riconoscimento" (che è la solita ortografia nel Regno Unito.) . La mia comprensione è che il cambiamento è stato essenzialmente un incidente e che certamente non hanno riconosciuto le ramificazioni del cambiamento. Che casino&#33; Ora ci sono milioni di file di dati in tutto il mondo che hanno "riconoscimento" e milioni che hanno "riconoscimento". Questo evidenzia la follia dei cambiamenti "semplice" a uno standard, e sottolinea la necessità di stabilità negli standard. Perché ACDD 1.3 (che è la versione di ACDD cheERDDAP™Supporti) dice "riconoscimento", ecco cosaERDDAP™  (in particolare GenerateDatasets Xml) incoraggia.
     
###### cdm\\_altitude\\_proxy{#cdm_altitude_proxy} 
*   [ **cdm\\_altitude\\_proxy** ](#cdm_altitude_proxy)è solo per i dataset EDDTable che non hanno una variabile di altitudine o di profondità ma hanno una variabile che è un proxy per altitudine o profondità (per esempio, pressione, sigma, bottigliaNumero) , è possibile utilizzare questo attributo per identificare tale variabile. Per esempio,
    ```
    <att name="cdm\\_altitude\\_proxy">pressure</att>  
    ```
Se[cdm\\_data\\_type](#cdm_data_type)è Profilo o TrajectoryProfile e non vi è alcuna variabile di altitudine o di profondità, cdm\\_altitude\\_proxy DEVE essere definito. Se cdm\\_altitude\\_proxy è definito,ERDDAP™aggiungerà i seguenti metadati alla variabile: \\_Coordinate AxisType=altezza e asse=Z.
     
###### cdm\\_data\\_type{#cdm_data_type} 
*   [ **cdm\\_data\\_type** ](#cdm_data_type)  (dal[ACDDETTI](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)standard metadati) è un attributo globale che indica ilUnidata [Modello di dati comune](https://www.unidata.ucar.edu/software/netcdf-java/v4.6/CDM/index.html)tipo di dati per il dataset. Per esempio,
    ```
    <att name="cdm\\_data\\_type">Point</att>  
    ```
Il CDM è ancora in evoluzione e può cambiare di nuovo.ERDDAP™rispetta il relativo e più dettagliato[Geometrie di smorzamento discreto (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)capitolo del[Paesi Bassi](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)convenzioni di metadati (in precedenza chiamato CF Point Observation Conventions) .
    * Sia il set di dati globale[fonteAttributi](#global-attributes)o il suo globale&lt;addAttributes&gt; DEVE includere l'attributo cdm\\_data\\_type. Alcuni tipi di dataset (come EDDTable Da parte di Obis) impostarlo automaticamente.
    * PerEDDGridset di dati, le opzioni cdm\\_data\\_type sono Grid (il predefinito e di gran lunga il tipo più comune perEDDGridset di dati) , MovingGrid, Altro, Punto, Profilo, RadialSweep, TimeSeries, TimeSeriesProfile, Swath, Trajectory e TrajectoryProfile. Attualmente,EDDGridnon richiede che vengano specificati i metadati correlati, né controlla che i dati corrispondano al cdm\\_data\\_type. Questo probabilmente cambierà nel prossimo futuro.
    * EDDTable utilizza cdm\\_data\\_type in modo rigoroso, seguendo le specifiche DSG di CF piuttosto che CDM, che per qualche motivo non è stato aggiornato per essere coerente con DSG. Se i metadati di un dataset non sono conformi alERDDAPI requisiti cdm\\_data\\_type (vedi sotto) , il dataset non verrà caricato e genererà un[messaggio di errore](#troubleshooting-tips). (Questa è una buona cosa, nel senso che il messaggio di errore vi dirà che cosa è sbagliato in modo da poterlo risolvere.) E se i dati del dataset non corrispondono alla configurazione dei metadati del dataset (ad esempio, se c'è più di un valore di latitudine per una data stazione in un set di dati di timeeries) , alcune richieste di dati restituiranno i dati errati nella risposta. Quindi assicurati di avere tutto questo giusto.
        
Per tutti questi dataset, nelle Convenzioni eMetadata\\_Conventionsattributi globali, si prega di fare riferimento a CF-1.6 (non CF-1.0, 1.1, 1.2, 1.3, 1.4 o 1.5) , poiché CF-1.6 è la prima versione per includere le modifiche relative alla Geometria di Sampling Discrete (DSG) convenzioni.
        *   **ERDDAP™ha una relazione non semplice con CF DSG** 
        *   ERDDAP™può effettuare un valido set di dati DSG da un dataset sorgente che è già un file DSG valido (#) , o fuori da un dataset sorgente che non è impostato per DSG ma può essere fatto così tramite modifiche ai metadati (alcuni dei quali sonoERDDAP-specifico al fine di fornire un approccio più generale per specificare la configurazione di DSG) .
        *   ERDDAP™fa un sacco di test di validità quando carica un set di dati. Se il dataset che ha un cdm\\_data\\_type (ofeatureType) attribuire carichi con successo inERDDAP™AlloraERDDAP™sta dicendo che il dataset soddisfa i requisiti DSG (altrimenti,ERDDAP™getterà un'eccezione spiegando il primo problema che ha trovato) .
AVVERTENZA: Un dataset caricato con successo sembra soddisfare i requisiti DSG (ha la giusta combinazione di attributi) , ma può ancora essere impostato in modo errato, portando a risultati errati.ncCF e.ncFile di risposta CFMA. (Il software è intelligente in alcuni modi e inutile negli altri.) 
        * Quando si guarda i metadati del datasetERDDAP™, il dataset DSG sembra essere inERDDAP' il formato interno (un tavolo gigante, simile al database) . Non è in uno dei formati DSG (ad esempio, le dimensioni e i metadati non sono giusti) , ma le informazioni necessarie per trattare il dataset come dataset DSG sono nei metadati (per esempio, cdm\\_data\\_type=TimeSeries e cdm\\_timeseries\\_variables= *aCsvListOfStationRelativiVarables* nei metadati globali e cf\\_role=timeseries\\_id per alcune variabili) .
        * Se un utente richiede un sottoinsieme del dataset in un.ncCFU (un.ncfile in formato file Contiguous Ragged Array di DSG) o.ncFile CFMA (a.ncfile in formato file Multidimensional Array di DSG) , questo file sarà un file CF DSG valido.
ATTENZIONE: Tuttavia, se il dataset è stato impostato in modo errato (in modo che le promesse fatte dai metadati non siano vere) , allora il file di risposta sarà tecnicamente valido ma sarà errato in qualche modo.
             
###### EDDTable cdm_data_types
* Per i set di dati EDDTable, le opzioni cdm\\_data\\_type (e requisiti correlati inERDDAP) sono
###### N.{#point} 
*   [N.](#point)-- è per una serie di misure prese in tempi e luoghi non correlati.
    * Come per tutti i cdm\\_data\\_types diversi da altri, i set di dati del punto devono avere longitudine, latitudine e variabili di tempo.
###### Profilo{#profile} 
*   [Profilo](#profile)-- è un insieme di misure tutte prese in una volta, in una posizione di longitudine latitudine, ma in più di una profondità (o altitudine) . Il dataset può essere una raccolta di questi profili, ad esempio, 7 profili da diverse posizioni. Questo cdm\\_data\\_type non implica alcuna connessione logica tra uno qualsiasi dei profili.
    
* Una delle variabili (per esempio, profilo\\_number) Devi avere l'attributo variabile cf\\_role=profile\\_id per identificare la variabile che identifica in modo univoco i profili.
    ```
    <att name="cf\\_role">profile\\_id</att>  
    ```
Se nessun'altra variabile è adatta, prendere in considerazione l'utilizzo della variabile di tempo.
###### cdm\\_profile\\_variables{#cdm_profile_variables} 
* Il dataset DEVE includere l'attributo globale[cdm\\_profile\\_variables](#cdm_profile_variables), dove il valore è un elenco separato da virgola delle variabili che hanno le informazioni su ogni profilo. Per un dato profilo, i valori di queste variabili devono essere costanti. Per esempio,
    ```
    <att name="cdm\\_profile\\_variables">profile\\_number,time,latitude,longitude</att>
    ```
L'elenco DEVE includere la variabile cf\\_role=profile\\_id e tutte le altre variabili con informazioni sul profilo, e il tempo, latitudine e longitudine.
La lista non includerà mai l'altitudine, la profondità, o qualsiasi variabile di osservazione.
     

\\[Opinione: cdm\\_data\\_type=Profile dovrebbe essere usato raramente. In pratica, un dato set di dati è di solito o un TimeSeriesProfile (profili in posizione fissa) o un profilo traiettoriale (profili lungo una traiettoria) , e così dovrebbe essere adeguatamente identificato come tale.\\]  
###### Orario{#timeseries} 
*   [Orario](#timeseries)-- è una sequenza di misurazioni (ad esempio, temperatura dell'acqua di mare) preso ad uno, fisso, latitudine, longitudine, profondità (o altitudine) posizione. (Pensalo come "stazione".) Il dataset può essere una raccolta di queste TimeSeries, ad esempio, una sequenza da ciascuna di 3 diverse posizioni.
    * Una delle variabili (per esempio, stazione\\_id) Devi avere l'attributo variabile cf\\_role=timeseries\\_id per identificare la variabile che identifica in modo univoco le stazioni.
        ```
        <att name="cf\\_role">timeseries\\_id</att>
        ```
###### cdm\\_serie di tempo\\_variabili{#cdm_timeseries_variables} 
* Il dataset DEVE includere l'attributo globale[cdm\\_serie di tempo\\_variabili](#cdm_timeseries_variables), dove il valore è un elenco separato da virgola delle variabili che hanno le informazioni su ogni stazione. Per una determinata stazione, i valori di queste variabili devono essere costanti. Per esempio,
    ```
    <att name="cdm\\_timeseries\\_variables">station\\_id,station\\_type,latitude,longitude</att>
    ```
L'elenco DEVE includere la variabile cf\\_role=timeseries\\_id e tutte le altre variabili con informazioni sulla stazione, che quasi sempre include latitudine e longitudine (e altitudine o profondità, se presente) .
La lista non includerà mai il tempo o le variabili di osservazione.
* Per alcuni boe ormeggiate, un dataset può avere due serie di variabili di latitudine e longitudine:
    1. Un paio di valori di latitudine e longitudine che sono costanti (cioè, la posizione fissa dell'ormeggio) . InERDDAP™, dare a queste variabili ledestinationNames di latitudine e longitudine, e includere queste variabili nell'elenco di cdm\\_timeseries\\_variables.
    2. Precisi valori di latitudine e longitudine associati ad ogni osservazione. InERDDAP™, dare queste variabili diversedestinationName# (ad esempio, precisoLat e preciso Lon) e non includere queste variabili nell'elenco di cdm\\_timeseries\\_variables.
Il ragionamento è: da una prospettiva teorica, per un set di dati DSG TimeSeries, la latitudine e la longitudine (e altitudine o profondità, se presente) posizione della stazione DEVE essere costante.
###### TimeSeriesProfile{#timeseriesprofile} 
*   [TimeSeriesProfile](#timeseriesprofile)-- è per una sequenza di profili presi in una posizione, fissa, latitudine longitudine. Ogni profilo è un insieme di misure prese a più altitudini o profondità. Il dataset può essere una raccolta di questi TimeSeriesProfiles, per esempio, una sequenza di profili presi in ciascuna di 12 diverse posizioni.
    * Una delle variabili (per esempio, stazione\\_id) Devi avere l'attributo variabile cf\\_role=timeseries\\_id per identificare la variabile che identifica in modo univoco le stazioni.
    ```
        <att name="cf\\_role">timeseries\\_id</att>
    ```
    * Una delle variabili (per esempio, profilo\\_number) Devi avere l'attributo variabile cf\\_role=profile\\_id per identificare la variabile che identifica in modo univoco i profili.
        ```
        <att name="cf\\_role">profile\\_id</att>  
        ```
         (Un dato profilo\\_id deve essere unico solo per un dato timeseries\\_id.) Se nessun'altra variabile è adatta, prendere in considerazione l'utilizzo della variabile di tempo.
    * Il dataset DEVE includere il cdm/_timeseries\\_variables globaleAttribute, dove il valore è un elenco separato da virgola delle variabili che hanno le informazioni su ogni stazione. Per una determinata stazione, i valori di queste variabili devono essere costanti. Per esempio,
        ```
        <att name="cdm\\_timeseries\\_variables">station\\_id,station\\_type,latitude,longitude</att>
        ```
L'elenco DEVE includere la variabile cf\\_role=timeseries\\_id e tutte le altre variabili con informazioni sulla stazione, che quasi sempre include latitudine e longitudine.
La lista non includerà mai tempo, altitudine, profondità, o qualsiasi variabile di osservazione.
    * Il dataset DEVE includere il globalAttribute cdm\\_profile\\_variables, dove il valore è un elenco separato da virgola delle variabili che hanno le informazioni su ogni profilo. Per un dato profilo, i valori di queste variabili devono essere costanti. Per esempio,
        ```
        <att name="cdm\\_profile\\_variables">profile\\_number,time</att>
        ```
L'elenco DEVE includere la variabile cf\\_role=profile\\_id e tutte le altre variabili con informazioni sul profilo, che quasi sempre include il tempo.
La lista non includerà mai latitudine, longitudine, altitudine, profondità, o qualsiasi variabile di osservazione.
###### Traiettoria{#trajectory} 
*   [Traiettoria](#trajectory)-- è una sequenza di misurazioni effettuate lungo una traiettoria (un percorso attraverso lo spazio e il tempo)   (ad esempio, mare\\_acqua\\_temperatura presa da una nave mentre si muove attraverso l'acqua) . Il dataset può essere una raccolta di questi Traiettori, per esempio, una sequenza da ciascuna di 4 diverse navi.
    * Una delle variabili (per esempio, nave\\_id) DEVE avere l'attributo cf\\_role=trajectory\\_id per identificare la variabile che identifica in modo univoco le traiettorie.
        ```  
        <att name="cf\\_role">trajectory\\_id</att>
        ```
###### cdm\\_traiettoria\\_variabili{#cdm_trajectory_variables} 
* Il dataset DEVE includere l'attributo globale[cdm\\_traiettoria\\_variabili](#cdm_trajectory_variables), dove il valore è un elenco separato da virgola delle variabili che hanno le informazioni su ciascuna traiettoria. Per una data traiettoria, i valori di queste variabili devono essere costanti. Per esempio,
    ```
    <att name="cdm\\_trajectory\\_variables">ship\\_id,ship\\_type,ship\\_owner</att>
    ```
L'elenco DEVE includere la variabile cf\\_role=trajectory\\_id e tutte le altre variabili con informazioni sulla traiettoria.
La lista non includerà mai tempo, latitudine, longitudine, o qualsiasi variabile di osservazione.
###### TraiettoriaProfilo{#trajectoryprofile} 
*   [TraiettoriaProfilo](#trajectoryprofile)-- è una sequenza di profili presi lungo una traiettoria. Il dataset può essere una raccolta di questi TrajectoryProfiles, ad esempio, una sequenza di profili presi da 14 diverse navi.
    * Una delle variabili (per esempio, nave\\_id) DEVE avere l'attributo variabile cf\\_role=trajectory\\_id per identificare la variabile che identifica in modo univoco le traiettorie.
        ``` 
        <att name="cf\\_role">trajectory\\_id</att>
        ```
    * Una delle variabili (per esempio, profilo\\_number) Devi avere l'attributo variabile cf\\_role=profile\\_id per identificare la variabile che identifica in modo univoco i profili.
        ```
        <att name="cf\\_role">profile\\_id</att>  
        ```
         (Un dato profilo\\_id deve essere unico solo per una data traiettoria\\_id.) Se nessun'altra variabile è adatta, prendere in considerazione l'utilizzo della variabile di tempo.
    * Il dataset DEVE includere il cdm/_trajectory\\_variables globaleAttribute, dove il valore è un elenco separato da virgola delle variabili che hanno le informazioni su ciascuna traiettoria. Per una data traiettoria, i valori di queste variabili devono essere costanti. Per esempio,
        ```
        <att name="cdm\\_trajectory\\_variables">ship\\_id,ship\\_type,ship\\_owner</att>
        ```
L'elenco DEVE includere la variabile cf\\_role=trajectory\\_id e tutte le altre variabili con informazioni sulla traiettoria.
L'elenco non includerà mai variabili, tempo, latitudine, longitudine o variabili di osservazione.
    * Il dataset DEVE includere il globalAttribute cdm\\_profile\\_variables, dove il valore è un elenco separato da virgola delle variabili che hanno le informazioni su ogni profilo. Per un dato profilo, i valori di queste variabili devono essere costanti. Per esempio,
        ```
        <att name="cdm\\_profile\\_variables">profile\\_number,time,latitude,longitude</att>
        ```
L'elenco DEVE includere la variabile cf\\_role=profile\\_id e tutte le altre variabili con informazioni sul profilo, che quasi sempre include tempo, latitudine e longitudine.
La lista non includerà mai l'altitudine, la profondità, o qualsiasi variabile di osservazione.
###### Altri{#other} 
*   [Altri](#other)- Non ha requisiti. Utilizzare se il dataset non si adatta ad una delle altre opzioni, in particolare, se il dataset non include variabili di latitudine, longitudine e tempo.
     
###### Note correlate{#related-notes} 
* Tutti i dataset EDDTable con un cdm\\_data\\_type diverso da "Altri" DOVE avere longitudine, latitudine e variabili di tempo.
* Datasets con profili DEVE avere una variabile di altitudine, una variabile di profondità, o una[cdm\\_altitude\\_proxy](#cdm_altitude_proxy)variabile.
* Se non è possibile effettuare un set di dati conforme a tutti i requisiti per il cdm\\_data\\_type ideale, utilizzare "Point" (che ha pochi requisiti) o "Altro" (che non ha requisiti) Invece.
* Queste informazioni sono utilizzate daERDDAP™in vari modi, per esempio, ma soprattutto per fare.ncFile CF (.nci file che rispettano le Rappresentanze di Array Ragged Contiguous associate al cdm\\_data\\_type del set di dati) e.ncFile CFMA (.ncfile conformi alle Rappresentanze Multidimensionali Array associate al cdm\\_data\\_type del dataset) come definito in[Geometrie di smorzamento discreto (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)capitolo del[CFU](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)convenzioni di metadati, che sono stati precedentemente denominati "Convenzioni di osservazione dei punti di CF".
* Colpo: Per questi set di dati, l'impostazione corretta per[subsetVariables](#subsetvariables)è solitamente la combinazione di tutte le variabili elencate negli attributi cdm\\_...\\_variables. Ad esempio, per TimeSeriesProfile, utilizzare il cdm\\_timeseries\\_variables più il cdm\\_profile\\_variables.
###### contributor\\_name {#contributor_name} 
*   [ **contributor\\_name** ](#contributor_name)  (dal[ACDDETTI](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)standard metadati) è il modo RACCOMANDATO per identificare una persona, un'organizzazione o un progetto che hanno contribuito a questo set di dati (per esempio, il creatore originale dei dati, prima che sia stato ritrattato dal creatore di questo dataset) . Per esempio,
    ```
        <att name="contributor\\_name">NOAA OceanWatch - Central Pacific</att>  
    ```
Se "contributor" non si applica realmente a un set di dati, omettere questo attributo. Rispetto a[creator\\_name](#creator_name), questo è talvolta più focalizzato sulla fonte di finanziamento.
###### contributor\\_role {#contributor_role} 
*   [ **contributor\\_role** ](#contributor_role)  (dal[ACDDETTI](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)standard metadati) è il modo RACCOMANDATO per identificare il ruolo di[contributor\\_name](#creator_name). Per esempio,
    ```
        <att name="contributor\\_role">Source of Level 2b data</att>  
    ```
Se "contributor" non si applica realmente a un set di dati, omettere questo attributo.
###### Convenzioni{#conventions} 
*   [ **Convenzioni** ](#conventions)  (dal[CFU](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)standard metadati) è RACCOMANDATO. (Potrebbe essere REQUIRED in futuro.) Il valore è un elenco separato da virgola degli standard di metadati che segue questo dataset. Per esempio:
    ```
    <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>  
    ```
Le convenzioni comuni dei metadatiERDDAP™sono:
    
    *   [COARDSConvenzioni](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)è il precursore del CF.
    *   [Clima e previsioni (CFU) Convenzioni](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)è la fonte di molti degli attributi consigliati e richiesti inERDDAP. La versione attuale di CF è identificata come "CF-1.6".
    * TheNetCDFConvegno Attributo per Dataset Discovery (ACDDETTI) è la fonte di molti degli attributi consigliati e richiesti inERDDAP. La versione 1.0 originale di ACDD (un brillante lavoro di Ethan Davis) , è stato identificato come[UnidataDataset Discovery v1.0](https://wiki.esipfed.org/ArchivalCopyOfVersion1)La corrente (a partire dal 2015) 1.3 versione di ACDD è identificato come[ACDD-1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3). Se i tuoi set di dati sono stati utilizzatiUnidataDataset Discovery v1.0, vi incoraggiamo a[passare i tuoi set di dati per utilizzare ACDD-1.3](#switch-to-acdd-13).
    
Se il tuo dataset segue alcuni standard di metadati aggiuntivi, aggiungi il nome all'elenco CSV nell'attributo Conventions.
###### coverage\\_content\\_type {#coverage_content_type} 
*   [ **coverage\\_content\\_type** ](#coverage_content_type)  (dal[ISO 19115](https://en.wikipedia.org/wiki/Geospatial_metadata)standard metadati) è il modo RACCOMANDATO per identificare il tipo di dati grigliati (inEDDGridset di dati) . Per esempio,
    ```
    <att name="coverage\\_content\\_type">modelResult</att>  
    ```
Gli unici valori consentiti sono ausiliariInformazioni, immagine, modelloRisultato, fisico Misura (il default quando i metadati ISO 19115 vengono generati) , qualitàInformazioni, riferimentoInformazione e tematicaClassificazione. (Non usare questo tag per i dataset EDDTable.)   
###### creator\\_name {#creator_name} 
*   [ **creator\\_name** ](#creator_name)  (dal[ACDDETTI](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)standard metadati) è il modo RACCOMANDATO per identificare la persona, l'organizzazione o il progetto (se non una persona specifica o un'organizzazione) , più responsabile della creazione (o rielaborazione più recente) di questi dati. Per esempio,
    ```
    <att name="creator\\_name">NOAA NMFS SWFSC ERD</att>  
    ```
Se i dati sono stati ampiamente ritrattati (ad esempio, i dati satellitari dal livello 2 al livello 3 o 4) , quindi di solito il riprocessore è elencato come il creatore e il creatore originale è elencato tramite[contributor\\_name](#contributor_name). Rispetto a[progetto](#project), questo è più flessibile, dal momento che può identificare una persona, un'organizzazione, o un progetto.
###### creator\\_email {#creator_email} 
*   [ **creator\\_email** ](#creator_email)  (dal[ACDDETTI](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)standard metadati) è il modo RACCOMANDATO per identificare un indirizzo email (correttamente formattato) che fornisce un modo per contattare il creatore. Per esempio,
    ```
    <att name="creator\\_email">erd.data@noaa.gov</att>  
    ```
###### creator\\_url {#creator_url} 
*   [ **creator\\_url** ](#creator_url)  (dal[ACDDETTI](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)standard metadati) è il modo RACCOMANDATO per identificare un URL per l'organizzazione che ha creato il dataset, o un URL con le informazioni del creatore su questo dataset (ma questo è più lo scopo[infoUrl](#infourl)) . Per esempio,
    ```
    <att name="creator\\_url">https://www.pfeg.noaa.gov</att>  
    ```
###### date\\_created {#date_created} 
*   [ **date\\_created** ](#date_created)  (dal[ACDDETTI](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)standard metadati) è il modo RACCOMANDATO per identificare la data in cui i dati sono stati creati (per esempio, elaborato in questo modulo) , in formato ISO 8601. Per esempio,
    ```
    <att name="date\\_created">2010-01-30</att>  
    ```
Se i dati vengono periodicamente aggiunti al dataset, questa è la prima data in cui sono stati resi disponibili i dati originali.
###### date\\_modified {#date_modified} 
*   [ **date\\_modified** ](#date_modified)  (dal[ACDDETTI](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)standard metadati) è il modo RACCOMANDATO per identificare la data in cui i dati sono stati modificati (per esempio, quando è stato risolto un errore o quando sono stati aggiunti i dati più recenti) , in formato ISO 8601. Per esempio,
    ```
    <att name="date\\_modified">2012-03-15</att>  
    ```
###### date\\_issued {#date_issued} 
*   [ **date\\_issued** ](#date_issued)  (dal[ACDDETTI](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)standard metadati) è il modo RACCOMANDATO per identificare la data in cui i dati sono stati resi disponibili per la prima volta ad altri, in formato ISO 8601, ad esempio, 2012-03-15. Per esempio,
    ```
    <att name="date\\_issued">2010-07-30</att>  
    ```
Ad esempio, il dataset potrebbe avere un[date\\_created](#date_created)del 2010-01-30, ma è stato reso disponibile solo pubblicamente 2010-07-30.date\\_issuedè meno comunemente usato chedate\\_creatededate\\_modified. Sedate\\_issuedè omesso, si presume essere lo stesso come ildate\\_created.
###### globaledrawLandMask {#global-drawlandmask} 
*   [ **drawLandMask** ](#global-drawlandmask)-- Questo è un attributo globale OPTIONAL utilizzato daERDDAP™  (e senza standard di metadati) che specifica il valore predefinito per l'opzione "Draw Land Mask" sul modulo Make A Graph del dataset ( *datasetID* .) e per il parametro &.land in un URL che richiede una mappa dei dati. Per esempio,
    ```
    <att name="drawLandMask">over</att>  
    ```
Vedere la[drawLandMaskpanoramica](#drawlandmask).
###### featureType {#featuretype} 
*   [ **featureType** ](#featuretype)  (dal[CFU](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)standard metadati) è IGNORED e/o REPLACED. Se il dataset è[cdm\\_data\\_type](#cdm_data_type)è appropriato,ERDDAP™lo userà automaticamente per creare unfeatureTypeattributo. Quindi non c'è bisogno che tu lo aggiunga.
    
Tuttavia, se si utilizza[EDDTableFromNcCFFiles](#eddtablefromnccffiles)per creare un set di dati da file che seguono[CFU Geometrie di smorzamento discreto (DSG) standard](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries), i file stessi devono averefeatureTypecorrettamente definito, in modo cheERDDAP™può leggere correttamente i file. Questo fa parte dei requisiti CF DSG per quel tipo di file.
     
###### storia della storia{#history} 
*   [ **storia della storia** ](#history)  (dal[CFU](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)e[ACDDETTI](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)standard di metadati) è un attributo globale di stringa multi-linea RACCOMANDATO con una linea per ogni fase di elaborazione che i dati hanno subito. Per esempio,
    ```
    <att name="history">2011-08-05T08:55:02Z CMOR: Rewrote data to comply with CF standards.  
    2012-04-08T08:34:58Z CMOR: Converted 'height' type from 'd' to 'f'.</att>
    ```
    * Idealmente, ogni linea ha una ISO 8601:2004 (E) data formattata+timeZ (per esempio, 2011-08-05T08:55:02Z) seguito da una descrizione della fase di elaborazione.
    *   ERDDAP™crea questo se non esiste già.
    * Se esiste già,ERDDAP™applicherà nuove informazioni alle informazioni esistenti.
    * la storia è importante perché consente ai clienti di eseguire il backtrack alla fonte originale dei dati.
###### infoUrl {#infourl} 
*   [ **infoUrl** ](#infourl)è un attributo globale REQUIRED con l'URL di una pagina web con maggiori informazioni su questo dataset (di solito al sito web dell'istituzione sorgente) . Per esempio,
    ```
    <att name="infoUrl">http://www.globec.org/</att>
    ```
    * Sia il set di dati globale[fonteAttributi](#global-attributes)o il suo globale&lt;addAttributes&gt; DEVE includere questo attributo.
    *   infoUrlè importante perché consente ai clienti di saperne di più sui dati dalla fonte originale.
    *   ERDDAP™visualizza un link alinfoUrlsul modulo di accesso dati dell'utente ( *datasetID* .html) , Fare una pagina web del grafico ( *datasetID* .) , e altre pagine web.
    * Se l'URL ha una parte di query (dopo il "?") , deve essere già[per cento codificato](https://en.wikipedia.org/wiki/Percent-encoding). È necessario codificare caratteri speciali nei vincoli (oltre alla prima '&' e la principale'='se c'è) nella forma %HH, dove HH è il valore esadecimale a 2 cifre del carattere. Di solito, è sufficiente convertire alcuni dei caratteri di punteggiatura: % in %25, & in %26, " in %22,&lt;in %3C, = in %3D, &gt; in %3E, + in %2B,|in %7C,\\[in %5B,\\]in %5D, spazio in %20, e convertire tutti i caratteri sopra #127 nella loro forma UTF-8 e quindi per cento codificare ogni byte del modulo UTF-8 nel formato %H (chiedere aiuto a un programmatore) .
Per esempio, &stationID&gt;="41004"
diventa &gt;stationID%3=%2241004%22
Percente codifica è generalmente richiesto quando si accedeERDDAPtramite software diverso da un browser. I browser di solito gestiscono la codifica percentuale per voi.
In alcune situazioni, è necessario per cento codificare tutti i caratteri diversi da A-Za-z0-9\\_-&#33;~ ' () \\*, ma ancora non codificare la prima '&' o la principale'='.
Le lingue di programmazione hanno strumenti per farlo (ad esempio, vediJava'[java.net.URLEncoder](https://docs.oracle.com/javase/8/docs/api/java/net/URLEncoder.html)  
eJavaScript's [encodeURIComponent()] ( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent ) ) e ci sono
        [siti web che per cento codificare / decodificare per voi](https://www.url-encode-decode.com/).
    * Dadatasets.xmlè un file XML, devi anche &-encode ALL '&', '&lt;', e '&gt;' nell'URL come '&amp;', '&lt;', e '&gt;' dopo la codifica percentuale.
    *   infoUrlè unico perERDDAP. Non è da qualsiasi standard di metadati.
###### istituzione{#institution} 
*   [ **istituzione** ](#institution)  (dal[CFU](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)e[ACDDETTI](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)standard di metadati) è un attributo globale REQUIRED con la versione breve del nome dell'istituzione che è la fonte di questi dati (solitamente un acronimo, di solito&lt;20 caratteri). Per esempio,
    ```
    <att name="institution">NASA GSFC</att>
    ```
    * Sia il set di dati globale[fonteAttributi](#global-attributes)o il suo globale&lt;addAttributes&gt; DEVE includere questo attributo.
    *   ERDDAP™visualizza l'istituzione ogni volta che visualizza un elenco di set di dati. Se il nome di un'istituzione è più lungo di 20 caratteri, solo i primi 20 caratteri saranno visibili nell'elenco dei set di dati (ma l'intera istituzione può essere visto mettendo il cursore del mouse sopra l'icona adiacente "?") .
    * Se si aggiunge istituzione all'elenco di&lt;categoryAttributes&gt; inERDDAP'[setup.xml](/docs/server-admin/deploy-install#setupxml)file, gli utenti possono facilmente trovare set di dati dalla stessa istituzione viaERDDAP"Ricerca per i Datasets per Categoria" nella home page.
###### parole chiave{#keywords} 
*   [ **parole chiave** ](#keywords)  (dal[ACDDETTI](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)standard metadati) è un elenco di parole e frasi brevi separato da virgole (per esempio,[GCMD Parole chiave della scienza](https://wiki.earthdata.nasa.gov/display/CMR/GCMD+Keyword+Access)) che descrivono il dataset in modo generale, e non assumendo alcuna altra conoscenza del dataset (per esempio, per i dati oceanografici, includono l'oceano) . Per esempio,
    ```
    <att name="keywords">ano, circulation, coastwatch, currents, derived, Earth Science &gt; Oceans &gt; Ocean Circulation &gt; Ocean Currents, eastward, eastward\\_sea\\_water\\_velocity, experimental, hf radio, meridional, noaa, northward, northward\\_sea\\_water\\_velocity, nuevo, ocean, oceans, radio, radio-derived, scan, sea, seawater, velocity, water, zonal</att>  
    ```
Dadatasets.xmlè un documento XML, i caratteri &,&lt;, e &gt; in un attributo come parole chiave (ad esempio, i caratteri &gt; nelle parole chiave scientifiche GCMD) deve essere codificato come &amp;,&lt;rispettivamente.
Quando un dataset viene caricato inERDDAP♪
    
    * "Earth Science &gt; " è aggiunto all'inizio di qualsiasi parola chiave GCMD che manca.
    * Le parole chiave GCMD sono convertite in Titolo Case (cioè, le prime lettere sono capitalizzate) .
    * Le parole chiave sono riordinate in ordine ordinato e tutti i caratteri newline vengono rimossi.
     
###### keywords\\_vocabulary {#keywords_vocabulary} 
*   [ **keywords\\_vocabulary** ](#keywords_vocabulary)  (dal[ACDDETTI](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)standard metadati) è un attributo RACCOMANDATO: se state seguendo una linea guida per le parole/frasi nel vostro attributo delle parole chiave (per esempio, parole chiave di GCMD Scienza) Metti qui il nome di quella linea guida. Per esempio,
    ```
    <att name="keywords\\_vocabulary">GCMD Science Keywords</att>  
    ```
###### licenza{#license} 
*   [ **licenza** ](#license)  (dal[ACDDETTI](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)standard metadati) è un attributo globale RACCOMANDATO STRONGLY con le restrizioni di licenza e/o utilizzo. Per esempio,
    ```
    <att name="license">\\[standard\\]</att>
    ```
    * Se...\\[standard\\]" si verifica nel valore dell'attributo, sarà sostituito dallo standardERDDAP™licenza dalla&lt;etichetta standardLicense&gt;ERDDAP'
        \\[tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noa/pfel/erddap/util/messages.xml file.
         
###### Metadata\\_Conventions {#metadata_conventions} 
*   [ **Metadata\\_Conventions** ](#metadata_conventions)è dal obsoleto[ACDD 1.0](https://wiki.esipfed.org/ArchivalCopyOfVersion1)  (che è stato identificato inMetadata\\_Conventionscome...UnidataDataset Discovery v1.0") metadati standard. Il valore dell'attributo era un elenco separato da virgola delle convenzioni dei metadati utilizzate da questo dataset.
Se un dataset utilizza ACDD 1.0, questo attributo è RACCOMANDATO STRONGly, per esempio,
    ```
    <att name="Metadata\\_Conventions">COARDS, CF-1.6, Unidata Dataset Discovery v1.0</att>  
    ```
MaERDDAP™raccomanda ora ACDD-1.3. Se avete[cambiare i tuoi set di dati per utilizzare ACDD-1.3](#switch-to-acdd-13), uso diMetadata\\_Conventionsè STRONGLY DISCOURAGED: basta usare [&lt;Convenzioni» (# Convenzioni) Invece.
###### processing\\_level {#processing_level} 
*   [ **processing\\_level** ](#processing_level)  (dal[ACDDETTI](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)standard metadati) è una descrizione testuale RACCOMANDATA del trattamento (per esempio,[Livelli di elaborazione dati satellitari della NASA](https://en.wikipedia.org/wiki/Remote_sensing#Data_processing_levels), ad esempio, Livello 3) o livello di controllo della qualità (ad esempio, Qualità della Scienza) dei dati. Per esempio,
    ```
    <att name="processing\\_level">3</att>  
    ```
###### progetto{#project} 
*   [ **progetto** ](#project)  (dal[ACDDETTI](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)standard metadati) è un attributo OPTIONAL per identificare il progetto di cui il dataset fa parte. Per esempio,
    ```
    <att name="project">GTSPP</att>  
    ```
Se il dataset non fa parte di un progetto, non usare questo attributo. Rispetto a[creator\\_name](#creator_name), questo è focalizzato sul progetto (non una persona o un'organizzazione, che può essere coinvolta in più progetti) .
###### publisher\\_name {#publisher_name} 
*   [ **publisher\\_name** ](#publisher_name)  (dal[ACDDETTI](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)standard metadati) è il modo RACCOMANDATO per identificare la persona, l'organizzazione o il progetto che sta pubblicando questo set di dati. Per esempio,
    ```
    <att name="publisher\\_name">JPL</att>  
    ```
Ad esempio, sei l'editore se un'altra persona o un gruppo[creato](#creator_name)il dataset e lo stai semplicemente riservando tramiteERDDAP. Se "publisher" non si applica davvero a un set di dati, omettere questo attributo. Rispetto a[creator\\_name](#creator_name), l'editore probabilmente non ha modificato o rielaborazione significativamente i dati; l'editore sta solo rendendo i dati disponibili in una nuova sede.
###### publisher\\_email {#publisher_email} 
*   [ **publisher\\_email** ](#publisher_email)  (dal[ACDDETTI](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)standard metadati) è il modo RACCOMANDATO per identificare un indirizzo email (correttamente formattato, per esempio, john\\_smith@great.org) che fornisce un modo per contattare l'editore. Per esempio,
    ```
    <att name="publisher\\_email">john\\_smith@great.org</att>  
    ```
Se "publisher" non si applica davvero a un set di dati, omettere questo attributo.
###### publisher\\_url {#publisher_url} 
*   [ **publisher\\_url** ](#publisher_url)  (dal[ACDDETTI](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)standard metadati) è il modo RACCOMANDATO per identificare un URL per l'organizzazione che ha pubblicato il dataset, o un URL con le informazioni dell'editore su questo dataset (ma questo è più lo scopo[infoUrl](#infourl)) . Per esempio,
    ```
    <att name="publisher\\_url">https://podaac.jpl.nasa.gov</att>  
    ```
Se "publisher" non si applica davvero a un set di dati, omettere questo attributo.
###### real\\_time {#real_time} 
*   [ **real\\_time** ](#real_time)è un attributo globale String (non da qualsiasi standard) indicando se si tratta di un dataset in tempo reale. Per esempio,
    ```
    <att name="real\\_time">true</att>  
    ```
Se questo è falso (il default) ♪ERDDAP™cacherà le risposte alle richieste di tipi di file in cui l'intero file deve essere creato primaERDDAP™può iniziare a inviare la risposta all'utente e riutilizzarli fino a circa 15 minuti (ad esempio,.nc#) .
Se questo è vero,ERDDAP™non cacherà mai i file di risposta e restituirà sempre i file appena creati.
###### sourceUrlattributo{#sourceurl-attribute} 
*   [ **sourceUrl** ](#sourceurl-attribute)è un attributo globale con l'URL della fonte dei dati. Per esempio,
    ```
    <att name="sourceUrl">https://opendap.co-ops.nos.noaa.gov/ioos-dif-sos/SOS</att>  
    ```
     (ma metti tutto su una linea) 
    *   ERDDAP™di solito crea questo attributo globale automaticamente. Due eccezioni sono EDDTableFromHyraxFile e EDDTableFromThreddsFiles.
    * Se la fonte è file locali e i file sono stati creati dalla vostra organizzazione, utilizzare
    ```
        <att name="sourceUrl">(local files)</att>
    ```
    * Se la fonte è database locale e i dati sono stati creati dalla vostra organizzazione, utilizzare
    ```
        <att name="sourceUrl">(local database)</att>
    ```
    *   sourceUrlè importante perché consente ai clienti di eseguire il backtrack alla fonte originale dei dati.
    *   sourceUrlè unico perERDDAP. Non è da qualsiasi standard di metadati.
        
###### standard\\_name\\_vocabulary {#standard_name_vocabulary} 
*   [ **standard\\_name\\_vocabulary** ](#standard_name_vocabulary)  (dal[ACDDETTI](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)standard metadati) è un attributo RACCOMANDATO per identificare il nome del vocabolario controllato da cui variabile[standard\\_name](#standard_name)sono presi. Per esempio,
    ```
    <att name="standard\\_name\\_vocabulary">CF Standard Name Table v77</att>  
    ```
per la versione 77 del[Tabella dei nomi standard CF](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html).
         
##### subsetVariables {#subsetvariables} 
*    **subsetVariables**   (solo per set di dati EDDTable) è un attributo globale RACCOMANDATO che consente di specificare un elenco separato da virgola di [&lt;dataVariable&gt; (#datavariabile #)  [destinationName](#destinationname)s per identificare le variabili che hanno un numero limitato di valori (ha dichiarato un altro modo: variabili per le quali ciascuno dei valori ha molti duplicati) . Per esempio,
    ```
        <att name="subsetVariables">station\\_id, longitude, latitude</att>  
    ```
Se questo attributo è presente, il dataset avrà un *datasetID* .subset pagina web (e un link ad esso su ogni lista di dataset) che consente agli utenti di selezionare rapidamente e facilmente vari sottoinsiemi dei dati.
    * Ogni volta che un set di dati viene caricato,ERDDAPcarichi e negozi su disco una tabella con tutti i distinti () combinazioni del sottoset Valori variabili di Variable.ERDDAP™può leggere chesubsetVariablestavolo e processarlo molto rapidamente (soprattutto rispetto alla lettura di un sacco di file di dati o ottenere dati da un database o da un altro servizio esterno) .
    * Questo permetteERDDAP™fare 3 cose:
        1. PermetteERDDAP™mettere un elenco di possibili valori in un elenco a discesa sul modulo di accesso dati, fare una pagina web del grafico, e .subset pagine web.
        2. PermetteERDDAP™offrire una pagina web .subset per quel dataset. Questa pagina è interessante perché rende facile trovare combinazioni valide dei valori di quelle variabili, che per alcuni set di dati e alcune variabili è molto, molto difficile (quasi impossibile) . Quindi, tutte le richieste dell'utente per distinta () Subset I dati variabili saranno molto veloci.
        3. Se c'è una richiesta utente che si riferisce solo a un sottoinsieme di tali variabili,ERDDAP™può leggere rapidamentesubsetVariablestavolo, e rispondere alla richiesta. Questo può risparmiare un sacco di tempo e di sforzo perERDDAP.
    * L'ordine deldestinationNames specificato determina l'ordine di tipo sul *datasetID* .subset pagina web, in modo che di solito specificare le variabili più importanti prima, poi il meno importante. Ad esempio, per i dataset con i dati delle serie temporali per diverse stazioni, si potrebbe utilizzare, ad esempio,
        ```
            <att name="subsetVariables">station\\_id, longitude, latitude</att>  
        ```
in modo che i valori siano ordinati per stazione\\_id.
    * Ovviamente, è la vostra scelta quali variabili includere nelsubsetVariableselenco, ma l'uso suggerito è:
        
In generale, includere variabili per le quali si desideraERDDAP™per visualizzare un elenco a discesa di opzioni sul modulo di accesso dati del set di dati (.html) e Make-A-Graph (.) pagine web.
        
In generale, includere variabili con informazioni sulle caratteristiche del dataset (le stazioni, i profili e/o le traiettorie, in particolare[cdm\\_serie di tempo\\_variabili](#cdm_timeseries_variables)♪[cdm\\_profile\\_variables](#cdm_profile_variables)♪[cdm\\_traiettoria\\_variabili](#cdm_trajectory_variables)) . Ci sono solo alcuni valori diversi per queste variabili in modo da lavorare bene con liste a discesa.
        
Non includere mai variabili di dati associate a singole osservazioni (ad esempio, tempo, temperatura, salinità, velocità attuale) nelsubsetVariableslista. Ci sono troppi valori diversi per queste variabili, quindi un elenco a discesa sarebbe lento da caricare e difficile da lavorare con (o non lavorare) .
        
    * Se il numero di combinazioni distinte di queste variabili è maggiore di circa 1,000,000, si dovrebbe considerare di limitare ilsubsetVariablesche si specifica di ridurre il numero di combinazioni distinte a meno di 1,000,000; altrimenti, il *datasetID* .subset pagine web possono essere generate lentamente. In casi estremi, il dataset non può caricare inERDDAP™perché generare l'elenco di combinazioni distinte utilizza troppa memoria. Se è così, è necessario rimuovere alcune variabili dalsubsetVariableslista.
    * Se il numero di valori distinti di una variabile subset è maggiore di circa 20.000, si dovrebbe considerare di non includere quella variabile nell'elenco disubsetVariables; altrimenti, ci vuole molto tempo per trasmettere *datasetID* .subset, *datasetID* .graph, and *datasetID* .html pagine web. Inoltre, su un Mac, è molto difficile fare selezioni da una lista a discesa con più di 500 elementi a causa della mancanza di una barra di scorrimento. Un compromesso è: rimuovere le variabili dall'elenco quando gli utenti non sono suscettibili di selezionare i valori da un elenco a discesa.
    * Si dovrebbe testare ogni dataset per vedere sesubsetVariablesl'impostazione va bene. Se il server dati sorgente è lento e ci vuole troppo tempo (o fallisce) per scaricare i dati, ridurre il numero di variabili specificate o rimuovere ilsubsetVariablesattributo globale.
    * Subset Le variabili sono molto utili. Quindi, se il vostro set di dati è adatto, si prega di creare unsubsetVariablesattributo.
    * EDDTEDDSOSaggiunge automaticamente
        ```
            <att name="subsetVariables">station\\_id, longitude, latitude</att>  
        ```
quando viene creato il dataset.
        * Avvertenza possibile: se un utente utilizza *datasetID* .subset pagina web seleziona un valore che ha un carattere di cartellaRitorno o newline, *datasetID* .subset fallirà.ERDDAP™non può funzionare intorno a questo problema a causa di alcuni dettagli HTML. In ogni caso, è quasi sempre una buona idea rimuovere i caratteri di carrelloRitorno e newline dai dati. Per aiutarti a risolvere il problema, se la EDDTable.subsetVariablesMetodo DataTable inERDDAPrileva i valori di dati che causeranno problemi, e-mail un avviso con un elenco di valori offendere l'e-mail Tutto Per gli indirizzi e-mail specificati in setup.xml. In questo modo, sai cosa deve essere risolto.
        *    **Tavoli sottoset pregenerati.** Normalmente, quandoERDDAP™carica un dataset, richiede il distinto () sottoset variabili data table dalla sorgente dati, solo tramite una normale richiesta di dati. In alcuni casi, questi dati non sono disponibili dalla fonte di dati o il recupero dalla fonte di dati può essere difficile sul server sorgente dati. Se è così, è possibile fornire una tabella con le informazioni in un.jsono file .csv con il nome *tomcat* / contenuto/erddap/subset/ *datasetID* .json  (o .csv) . Se presente,ERDDAP™lo leggerà una volta che il dataset viene caricato e utilizzarlo come fonte dei dati del sottoset.
            * Se c'è un errore durante la lettura, il dataset non verrà caricato.
            * Deve avere nomi esatti della stessa colonna (per esempio, lo stesso caso) come&lt;subsetVariables&gt;, ma le colonne MAY essere in qualsiasi ordine.
            * MAGGIORE ha colonne extra (saranno rimosse e le nuove righe ridondanti saranno rimosse) .
            * I valori mancanti dovrebbero mancare (non numeri falsi come -99) .
            *   .jsoni file possono essere un po 'più difficile da creare, ma trattare con i caratteri Unicode bene..jsoni file sono facili da creare se li crei conERDDAP.
            * I file .csv sono facili da lavorare, ma adatti solo ai caratteri ISO 8859-1. I file .csv devono avere i nomi delle colonne sulla prima riga e i dati sulle righe successive.
        * Per grandi set di dati o quando&lt;subsetVariables&gt; è configurato male, la tabella di combinazioni di valori può essere abbastanza grande da causare errori Too Much Data o OutOfMemory. La soluzione è quella di rimuovere le variabili dall'elenco di&lt;subsetVariables&gt; per i quali ci sono un gran numero di valori, o rimuovere le variabili necessarie fino a quando la dimensione di tale tabella non è ragionevole. Indipendentemente dall'errore, le parti diERDDAP™che usanosubsetVariablessistema non funziona bene (ad esempio, le pagine web caricano molto lentamente) quando ci sono troppe righe (ad esempio, più di un milione) in quel tavolo.
        *   subsetVariablesnon ha nulla a che fare con specificare quali variabili gli utenti possono utilizzare in vincoli, cioè come gli utenti possono richiedere sottoinsiemi del dataset.ERDDAP™consente sempre vincoli di riferirsi a qualsiasi delle variabili.
###### Unità di tempo{#time-units} 
[Tempo e timestamp](#time-units)colonne dovrebbero avere ISO 8601:2004 (E) data formattata + ora stringhe Z (per esempio, 1985-01-31T15:31:00Z) .
             
###### sintesi{#summary} 
*   [ **sintesi** ](#summary)  (dal[CFU](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)e[ACDDETTI](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)standard di metadati) è un attributo globale REQUIRED con una lunga descrizione del dataset (solitamente&lt;500 caratteri). Per esempio,
    ```
    <att name="summary">VIIRSN Level-3 Standard Mapped Image, Global, 4km, Chlorophyll a, Daily. The Visible and Infrared Imager/Radiometer Suite (VIIRS) is a multi-disciplinary instrument that flies on the National Polar-orbiting Operational Environmental Satellite System (NPOESS) series of spacecraft, including the NPOESS Preparatory Project (NPP).</att>
    ```
    * Sia il set di dati globale[fonteAttributi](#global-attributes)o il suo globale&lt;addAttributes&gt; DEVE includere questo attributo.
    * il riassunto è molto importante perché permette ai clienti di leggere una descrizione del set di dati che ha più informazioni del titolo e quindi capire rapidamente che cosa è il dataset.
    * Consulenza: si prega di scrivere il riassunto in modo che funzionerebbe per descrivere il set di dati a una persona casuale che si incontra per strada o a un collega. Ricorda di includere il[Cinque W e uno H](https://en.wikipedia.org/wiki/Five_Ws): Chi ha creato il dataset? Quali informazioni sono state raccolte? Quando sono stati raccolti i dati? Dove e' stato raccolto? Perche' e' stato raccolto? Com'e' stato raccolto?
    *   ERDDAP™visualizza il riepilogo sul modulo di accesso dati dell'utente ( *datasetID* .html) , Fare una pagina web del grafico ( *datasetID* .) , e altre pagine web.ERDDAP™utilizza il riassunto quando si crea documenti FGDC e ISO 19115.
###### testOutOfDate {#testoutofdate} 
*   [ **testOutOfDate** ](#testoutofdate)  (un optionalERDDAP-attributo globale specifico dei metadati, non da qualsiasi standard) specifica, in modo semplicistico, quando i dati per un set di dati in tempo quasi reale sono considerati fuori data, specificati comenow- *NIENTE* , per esempio,now-2 giorni per i dati che di solito appaiono 24-48 ore dopo il valore di tempo. Per i dati previsionali, utilizzare ora **+**  *NIENTE* , per esempio, ora+6days per i dati previsionali che sono, al massimo, 8 giorni in futuro. (Vedere la[now- *NIENTE* descrizione sintassi](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now).) Se il valore di tempo massimo per il dataset è più recente dell'ora specificata, il dataset è considerato aggiornato. Se il valore massimo del tempo è superiore al tempo specificato, il dataset è considerato aggiornato. Per i dataset non aggiornati, presumibilmente c'è un problema con la fonte di dati, quindiERDDAP™non è in grado di accedere ai dati da più recenti punti di tempo.
    
ThetestOutOfDateil valore viene visualizzato come colonna nella[allDatasetsset di dati](#eddtablefromalldatasets)nel tuoERDDAP. Viene anche utilizzato per calcolare l'indice outOfDate, che è un'altra colonna nellaallDatasetsDataset.
Se l'indice è&lt;1, il dataset è considerato aggiornato.
Se l'indice è&lt;=1, il dataset è considerato out-of-date.
Se l'indice è&lt;=2, il dataset è considerato molto out-of-date.
    
ThetestOutOfDatevalore è utilizzato anche daERDDAP™per generare https://*yourDomain*/erddap/outOfDateDatasets.html pagina web ([esempio](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html)) che mostra i dataset che hanno&lt;testOutOfDate&gt; tags, con i datasets classificati da come out-of-date sono. Se si modifica il tipo di file (da .html a .csv,.jsonlCSV♪.nc♪.tsv...) , è possibile ottenere queste informazioni in diversi formati di file.
    
Quando possibile,[GenerareDatasetsXml](#generatedatasetsxml)aggiunge untestOutOfDateattributo al globaleaddAttributesdi un dataset. Questo valore è un suggerimento basato sulle informazioni disponibili per GenerateDatasetsXml. Se il valore non è appropriato, cambialo.
    
"Out-of-date" qui è molto diverso da [&lt;ricarica Tutti i bambini &gt; (#reloadeverynminutes) , che si occupa di quanto aggiornatoERDDAPLa conoscenza del dataset è. The&lt;testOutOfDate&gt; sistema presuppone cheERDDAPLa conoscenza del dataset è aggiornata. La questione&lt;testOutOfDate&gt; si occupa di: sembra che ci sia qualcosa che non va con la fonte dei dati, causando dati più recenti non accessibili daERDDAP?
    
###### titolo{#title} 
*   [ **titolo** ](#title)  (dal[CFU](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)e[ACDDETTI](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)standard di metadati) è un attributo globale REQUIRED con la breve descrizione del dataset (solitamente&lt;=95 caratteri). Per esempio,
    ```
    <att name="title">VIIRSN Level-3 Mapped, Global, 4km, Chlorophyll a, Daily</att>
    ```
    * Sia il set di dati globale[fonteAttributi](#global-attributes)o il suo globale&lt;addAttributes&gt; DEVE includere questo attributo.
    * il titolo è importante perché ogni elenco di dataset presentati daERDDAP  (diversi dai risultati della ricerca) elenca i set di dati in ordine alfabetico, per titolo. Quindi, se si desidera specificare l'ordine dei set di dati, o avere alcuni set di dati raggruppati insieme, è necessario creare titoli con questo in mente. Molte liste di dataset (per esempio, in risposta a una ricerca di categoria) , mostrare un sottoinsieme della lista completa e in un ordine diverso. Così il titolo per ogni dataset dovrebbe stare da solo.
    * Se il titolo contiene la parola "DEPRECATED" (tutte le lettere) , quindi il dataset otterrà una classifica inferiore nelle ricerche.
             
##### &lt;axisVariable&gt;{#axisvariable} 
* [ ** &lt;axisVariable&gt; ** ] (# Axisvariabile #) è usato per descrivere una dimensione (anche chiamato "asse") .
PerEDDGridset di dati, uno o piùaxisVariabletags è REQUIRED, e tutto[dataVariable#](#datavariable)sempre condividere/utilizzare tutte le variabili di asse. ([Perche'?](#why-just-two-basic-data-structures) [E se non lo facessero?](#dimensions))   
C'è una variabile di asse per ogni dimensione delle variabili di dati.
Le variabili di asse devono essere specificate nell'ordine in cui le variabili di dati le utilizzano.
(EDDTable datasets non può utilizzare&lt;axisVariable&gt; tag.)
Un esempio in carne e ossa è:

>&nbsp;&nbsp;&lt;axisVariable>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[sourceName](#sourcename)\\>MT&lt;/sourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[destinationName](#destinationname)\\>time&lt;/destinationName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">days since 1902-01-01T12:00:00Z&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  
>&nbsp;&nbsp;&lt;/axisVariable>  

&lt;axisVariable&gt; supporta i seguenti sottotag:
###### &lt;sourceName.{#sourcename} 
* [&lt;sourceName* (#) - il nome della sorgente dati per la variabile. Questo è il nome cheERDDAP™userà durante la richiesta di dati dalla fonte dati. Questo è il nome cheERDDAP™cercherà quando i dati vengono restituiti dalla fonte dati. Questo è un caso sensibile. Questo è REQUIRED.
###### &lt;destinationName.{#destinationname} 
* [&lt;destinationName* (#destinationname) è il nome della variabile che verrà mostrata e utilizzata daERDDAP™utenti.
    * Questo è OPTIONAL. Se assente, ilsourceNameviene utilizzato.
    * Questo è utile perché permette di cambiare un criptico o stranosourceName.
    *   destinationNameè sensibile al caso.
    *   destinationNames DOVE iniziare con una lettera (A-Z, a-z) e DEVE essere seguito da 0 o più caratteri (A-Z, a-z, 0-9 e \\_) . ('-'era permesso primaERDDAP™versione 1.10.) Questa restrizione consente ai nomi variabili di asse di essere gli stessi inERDDAP™, nei file di risposta, e in tutto il software in cui tali file saranno utilizzati, compresi i linguaggi di programmazione (comePython♪MatlabeJavaScript) dove ci sono restrizioni simili su nomi variabili.
    * InEDDGriddatasets, i[longitudine, latitudine, altitudine, profondità e tempo](#destinationname)Le variabili di asse sono speciali.
         
###### axisVariable &lt;addAttributes&gt; {#axisvariable-addattributes} 
* [&lt;addAttributes&gt; (#variable-addattributes) definisce un insieme OPTIONAL di attributi ( *nome* = *valore* ) che vengono aggiunti agli attributi della sorgente per una variabile, per rendere gli attributi combinati per una variabile.
Se la variabile è[fonteAttributi](#variable-addattributes)o&lt;addAttributes&gt; includere[scale\\_factore/oadd\\_offset](#scale_factor)attributi, i loro valori verranno utilizzati per disfare i dati dalla sorgente prima della distribuzione al client
     (risultato Valore = fonte Valore *scale\\_factor+add\\_offset) . La variabile non imballata sarà dello stesso tipo di dati (per esempio, galleggiante) comescale\\_factoreadd\\_offsetvalori.
         
##### &lt;dataVariable&gt;{#datavariable} 
* [ ** &lt;dataVariable&gt; ** ] (#datavariabile #) è un vero e proprio (per quasi tutti i dataset) tag all'interno del&lt;dataset&gt; tag che viene utilizzato per descrivere una variabile di dati. Ci devono essere 1 o più istanze di questo tag. Un esempio in carne e ossa è:

>&nbsp;&nbsp;&lt;dataVariable>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[sourceName](#sourcename)\\>waterTemperature&lt;/sourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[destinationName](#destinationname)\\>sea\\_water\\_temperature&lt;/destinationName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataType>](#datatype)float&lt;/dataType>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[ioos\\_category](#ioos_category)">Temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[long\\_name](#long_name)">Sea Water Temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[standard\\_name](#standard_name)">sea\\_water\\_temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">degree\\_C&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  
>&nbsp;&nbsp;&lt;/dataVariable>  

&lt;dataVariable&gt; supporta i seguenti sottotag:
###### &lt;sourceName&gt;{#sourcename-1} 
* [&lt;sourceName&gt; (#) - il nome della sorgente dati per la variabile. Questo è il nome cheERDDAP™userà durante la richiesta di dati dalla fonte dati. Questo è il nome cheERDDAP™cercherà quando i dati vengono restituiti dalla fonte dati. Questo è un caso sensibile. Questo è REQUIRED.
###### Gruppi{#groups} 
CF ha aggiunto il supporto per gruppi con CF v1.8. A partire da ~20,NetCDFstrumenti di supporto mettendo variabili in gruppi in un.ncfile. In pratica, questo significa solo che le variabili hanno un nome lungo che identifica il gruppo (#) e il nome variabile, ad esempio, group1a/group2c/varName ).ERDDAP™supporta i gruppi convertendo "/" nella variabile&lt;sourceName&gt; in "\\_" nella variabile&lt;destinationName&gt;, ad esempio, group1a\\_group2c\\_varName . (Quando lo vedete, dovreste rendervi conto che i gruppi non sono molto più di una convenzione di sintassi.) Quando le variabili sono elencateERDDAP™, tutte le variabili in un gruppo compariranno insieme, mimetizzando il gruppo sottostante.\\[SeERDDAP™, in particolare GenerateDatasets Xml, non esegue così come potrebbe con i file di origine che hanno gruppi, si prega di inviare un file campione a Chris. John a noaa.gov.\\]

EDDTableFromFiles datasets può utilizzare alcuni appositamente codificato, pseudosourceNames per definire nuove variabili di dati, ad esempio, per promuovere un attributo globale come una variabile di dati. Vedi[questa documentazione](#pseudo-sourcenames).
###### HDFStrutture{#hdf-structures} 
A partire daERDDAP™2, del regolamento (CEE) n.EDDGridDa NcFilesEDDGridDa NcFiles Unpacked può leggere i dati da "strutture" in.nc4 e.hdf4 file. Per identificare una variabile che proviene da una struttura, la&lt;sourceName&gt; deve usare il formato: *Nome completo della struttura* | *MemberName* , per esempio group1/myStruct|myMember .

###### Valore fisso{#fixed-value-sourcenames} 
In un dataset EDDTable, se si desidera creare una variabile (con un unico valore fisso) che non è nel dataset sorgente, utilizzare:
```
    <sourceName>=*fixedValue*</sourceName>  
```
Il segno iniziale uguale diceERDDAP™che sia fisso Il valore seguirà.

* Per le variabili numeriche, il valore fisso deve essere un singolo valore finito o NaN (caso insensibile, ad esempio, \\=NaN) .
* Per le variabili di stringa, il valore fisso deve essere singolo,[stringa in stile JSON](https://www.json.org/json-en.html)  (con caratteri speciali scappati con caratteri \\) , ad esempio, \\="My \\"Special\\" String" .
* Per una variabile di timestamp, specificare il valore fisso come numero in"seconds since 1970-01-01T00:00:00Z"e uso
unità=secondi dal 1970-01-01T00:00:00Z .
    
Gli altri tag per il&lt;dataVariable&gt; lavorare come se questa fosse una variabile regolare.
Ad esempio, per creare una variabile chiamata altitudine con un valore fisso di 0,0 (galleggiante) , uso:

>        &lt;sourceName>=0&lt;/sourceName>  
>        [&lt;destinationName\\>](#destinationname)altitude&lt;/destinationName>  
>        [&lt;dataType>float&lt;/dataType>](#datatype)  

Per situazioni insolite, è anche possibile specificare unactual\\_rangeaddAttribute, che supererà i valori attesi di destinazioneMin e destinazioneMax (che altrimenti sarebbe uguale al fisso Valore) .
 
###### Script SourceNames/variabili derivati{#script-sourcenamesderived-variables} 
A partire daERDDAP™v2.10, in un[EDDTableFromFiles](#eddtablefromfiles)♪[EDDTableDatabase](#eddtablefromdatabase)o[EDDTableFromFileNames](#eddtablefromfilenames)dataset, il&lt;sourceName&gt; può essere
un'espressione (un'equazione che valuta ad un unico valore) , usando il formato
```
    <sourceName>=*expression*</sourceName>  
```
o uno script (una serie di dichiarazioni che restituisce un unico valore) , usando il formato
```
    <sourceName>=*script*</sourceName>  
```
ERDDAP™si basa sulla[Progetto Apache](https://www.apache.org/) [JavaLingua di espressione (JEXL) ](https://commons.apache.org/proper/commons-jexl/)  (licenza:[Apache](https://www.apache.org/licenses/LICENSE-2.0)) per valutare le espressioni ed eseguire gli script.
Il calcolo per una data nuova variabile viene effettuato in una riga dei risultati, ripetutamente per tutte le righe.
Le espressioni e gli script usano unJava- eJavaSintassi simile a Script e può usare qualsiasi di
[operatori e metodi che sono costruiti in JEXL](https://commons.apache.org/proper/commons-jexl/reference/syntax.html).
Gli script possono anche usare metodi (funzioni) da queste classi:
*   [Calendario](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2), che è un wrapper per alcuni dei metodi statici, legati al tempo e al calendario in com.cohort.util.Calendar2 ([licenza](/acknowledgements#cohort-software)) . Per esempio,
Calendar2.parseToEpochSeconds ( *sorgenteTime, data TimeFormat* ) parse la fonte stringa di tempo tramite la stringa TimeFormat e restituire una"seconds since 1970-01-01T00:00:00Z"  (epocaSeconda) doppio valore.
*   [matematica](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math), che è un wrapper per quasi tutti i metodi statici, legati alla matematica[Java.lang. matematica](https://docs.oracle.com/javase/8/docs/api/java/lang/Math.html). Ad esempio, Math.atan2 ( *y, x* ) prende in coordinate rettangolari (y, x) e restituisce coordinate polari (una serie di doppie con\\[r, theta\\]) .
*   [Matematica](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2), che è un wrapper per quasi tutti i metodi statici, legati alla matematica in com.cohort.util. Matematica ([licenza](/acknowledgements#cohort-software)) . Per esempio,
Math2.roundTo ( *d, nPlaces* ) arrotonda d al numero specificato di cifre a destra del punto decimale.
* String, che ti dà accesso a tutti i metodi statici e correlati allo stress[Java.lang. String](https://docs.oracle.com/javase/8/docs/api/java/lang/String). Oggetti in tensioneERDDAP™espressioni e script possono utilizzare uno qualsiasi dei loro associatiJavametodi, come descritto nel java.lang. Documentazione di stress. Per esempio, String.valueOf (D) convertirà il doppio valore d in uno String (anche se è possibile utilizzare ""+d) .
*   [String2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2), che è un wrapper per la maggior parte dei metodi statici, legati allo stress e all'array in com.cohort.util.String2 ([licenza](/acknowledgements#cohort-software)) . Per esempio, String2.zeroPad ( *numero, nDigits* ) aggiungerà 0's a sinistra del numero String in modo che il numero totale di cifre è nDigits (ad esempio, String2.zeroPad ("6", 2) tornerà "06") .
*   [riga](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-row), che ha metodi non statici per accedere ai dati dalle varie colonne nella riga corrente della tabella dei dati di origine. Per esempio, Row.columnString ("anno") legge il valore dalla colonna "anno" come String, mentre, Row.column In ("anno") legge il valore dalla colonna "anno" come interi.

Per motivi di sicurezza, espressioni e script non possono usare altre classi diverse da quelle 6.ERDDAP™applica questa limitazione creando una lista nera predefinita (che blacklist tutte le classi) e poi una lista bianca (che permette in particolare le 6 classi descritte sopra) . Se hai bisogno di altri metodi e/o altre classi per fare il tuo lavoro, invia le tue richieste a Chris. John a noaa.gov.
    
###### Efficienza
Per EDDTableFromFiles datasets, c'è solo un molto, molto minimo (probabilmente non notabile) rallentamento delle richieste di dati da queste variabili. Per EDDTableFromDatabase, c'è una grande penalità di velocità per richieste che includono vincoli su queste variabili (ad esempio, (&longitude0360&gt;30&longitude0360&lt;40) perché i vincoli non possono essere passati al database, quindi il database deve restituire molto più dati aERDDAP™  (che richiede molto tempo) cosìERDDAP™può creare la nuova variabile e applicare il vincolo. Per evitare il caso peggiore (dove non ci sono vincoli che vengono passati al database) ♪ERDDAP™getta un messaggio di errore in modo che il database non debba restituire l'intero contenuto della tabella. (Se si desidera bypassare questo, aggiungere un vincolo a una colonna non scritta che sarà sempre vero, ad esempio, &time&lt;3000-01-01.) Per questo motivo, con EDDTableFromDatabase, è probabilmente sempre meglio creare una colonna derivata nel database piuttosto che utilizzaresourceNameTraduzione:ERDDAP.

###### Panoramica di come un'espressione (O Script) È usato:
In risposta alla richiesta di un utente per i dati tabulari,ERDDAP™ottiene i dati da una serie di file sorgente. Ogni file sorgente genererà una tabella grezza (direttamente dalla sorgente) dati.ERDDAP™passare poi attraverso la tabella dei dati grezzi, riga per riga, e valutare l'espressione o lo script una volta per ogni riga, al fine di creare una nuova colonna che ha quella espressione o script come unasourceName.
    
###### GenerareDatasetsXml
Nota che GenerateDatasets Xml è completamente ignaro quando c'è la necessità di creare una variabile con&lt;sourceName&gt;= *espressione* &lt;/sourceName&gt;. Devi creare la variabile indatasets.xmla mano.

###### Esempi di espressione:
Ecco alcuni esempi completi di variabili di dati che utilizzano un'espressione per creare una nuova colonna di dati. Ci aspettiamo che questi esempi (e varianti di loro) coprirà circa il 95% dell'utilizzo di tutte le espressioni-derivatesourceNameS.

###### Combinare "data" separata e"time"colonne in una colonna di tempo unificata:
```
    <dataVariable>
        <sourceName>=Calendar2.parseToEpochSeconds(row.columnString("date") + "T" + 
            row.columnString("time") + "Z", "yyyy-MM-dd'T'HH:mm:ss'Z'")</sourceName> 
        <destinationName>time</destinationName>
        <dataType>double</dataType>
        <addAttributes>
            <att name="units">seconds since 1970-01-01</att>
        </addAttributes>
    </dataVariable>
```
Che cosa?sourceNameespressione rende una nuova"time"colonna concatenando i valori di stringa dalla "data" (yyyy-MM-dd) e"time"  (HH:mm:ss) colonne su ogni riga del file sorgente, e convertendo quella stringa in una"seconds since 1970-01-01"  (epocaSeconda) doppio valore.

O, naturalmente, dovrete personalizzare la stringa del formato orario per trattare il formato specifico in ogni data di origine e colonne dell'ora di ciascun set di dati, vedere il
[documentazione delle unità di tempo](#string-time-units).

Tecnicamente, non devi usare Calendar2.parseToEpochSeconds () per convertire la data + ora combinata in epocaSeconds. Si potrebbe solo passare la data+ora String aERDDAP™e specificare il formato (ad esempio,
yyyy-MM-dd'T'HH:mm:ss'Z') tramite l'attributo delle unità. Ma ci sono vantaggi significativi per convertire in epocaSecondi - in particolare, EDDTableFromFiles può quindi facilmente tenere traccia della gamma di valori di tempo in ogni file e così rapidamente decidere se guardare in un dato file quando rispondere a una richiesta che ha vincoli di tempo.

Un problema relativo è la necessità di creare una colonna data + ora unificata da una fonte con anno separato, mese, data, ora, minuto, secondo. La soluzione è molto simile, ma spesso è necessario zero-pad molti dei campi, in modo che, per esempio, mese (1 - 12) e data (1 - 31) hanno sempre 2 cifre. Ecco un esempio con anno, mese, data:
```
    <sourceName>=Calendar2.parseToEpochSeconds(row.columnString("year") + 
        String2.zeroPad(row.columnString("month"), 2) + 
        String2.zeroPad(row.columnString("date"), 2), "yyyyMMdd")</sourceName>
```
Un problema relativo è la necessità di creare una colonna di latitudine o longitudine unificata combinando i dati nei gradi separati della tabella di origine, i minuti e le colonne dei secondi, ciascuna memorizzata come interi. Per esempio,
```
    <sourceName>=row.columnInt("deg") + row.columnInt("min")/60.0 + 
        row.columnInt("sec")/3660.0</sourceName>
```
###### Convertire una colonna chiamata "lon" con valori di longitudine da 0 a 360° in una colonna denominata "longitudine" con valori da -180 - 180°
```
    <dataVariable>
        <sourceName>=Math2.anglePM180(row.columnDouble("lon"))</sourceName> 
        <destinationName>longitude</destinationName>
        <dataType>double</dataType>
        <addAttributes>
            <att name="units">degrees\\_east</att>
        </addAttributes>
    </dataVariable>
```
Che cosa?sourceNamel'espressione fa una nuova colonna "longitude" convertendo il doppio valore dalla colonna "lon" su ogni riga del file sorgente (presumibilmente con 0 - 360 valori) , e convertendo che in un -180 a 180 doppio valore.

Se invece si desidera convertire i valori di longitudine sorgente di -180 - 180° in 0 - 360°, utilizzare
```
    <sourceName>=Math2.angle0360(row.columnDouble("lon"))</sourceName>
```
Denominazione delle due variabili di longitudine:
Se il dataset avrà 2 variabili di longitudine, si consiglia di utilizzaredestinationName= longitudine per la variabile -180 - 180° edestinationName= longitudine0360 (e longName=\"Longitude 0-360°") per la variabile 0 - 360°. Questo è importante perché gli utenti a volte utilizzano Ricerca avanzata per cercare i dati all'interno di un intervallo di longitudine specifico. Questa ricerca funzionerà meglio se la longitudine ha costantemente valori -180 - 180° per tutti i set di dati. Inoltre, gli attributi geospaziali del set di dati\\_lon\\_min, geospatial\\_lon\\_max, Westernmost\\_Easting e Easternmost\\_Eastings globali saranno quindi impostati in modo coerente (con valori di longitudine da -180 a 180°) ;
    
###### Convertire una colonna denominata "tempF" con valori di temperatura in grado\\_ F in una colonna denominata "tempC" con temperature in grado\\_ C:
```
    <dataVariable>
        <sourceName>=(row.columnFloat("tempF")-32)\\*5/9</sourceName> 
        <destinationName>tempC</destinationName>
        <dataType>float</dataType>
        <addAttributes>
            <att name="units">degrees\\_C</att>
        </addAttributes>
    </dataVariable>
```
Che cosa?sourceNameespressione rende una nuova colonna "tempC" convertendo il grado galleggiante\\_ Valore F dalla colonna "tempF" su ogni riga del file sorgente in un grado galleggiante\\_ Valore C.

Si noti che il dataset può avere sia la temp originale F variabile e la nuova temp C variabile avendo un'altra variabile con
```
    <sourceName>tempF</sourceName>
```
###### Convertire le colonne del vento "velocità" e "direzione" in due colonne con i componenti u,v
* Per fare una variabile u, utilizzare
```
    <sourceName>=row.columnFloat("speed") \\* Math.cos(row.columnFloat("direction"))</sourceName>
```
* Per fare una variabile v, utilizzare
```
    <sourceName>=row.columnFloat("speed") \\* Math.sin(row.columnFloat("direction"))</sourceName>
```
O, dato u,v:
* Per fare una variabile di velocità, utilizzare
```
    <sourceName>=Math.atan2(row.columnDouble("v"), row.columnDouble("u"))\\[0\\]</sourceName>
```
* Per fare una variabile di direzione, utilizzare
```
    <sourceName>=Math.toDegrees(Math.atan2(row.columnDouble("v"), row.columnDouble("u"))\\[1\\])</sourceName>
```
    
###### Esempio di script:
Ecco un esempio di utilizzo di uno script, non solo un'espressione, come unsourceName. Ci aspettiamo che gli script, al contrario delle espressioni, non saranno necessari spesso. In questo caso l'obiettivo è di restituire un valore mancante non NaN (-99) per valori di temperatura al di fuori di un intervallo specifico. Si noti che lo script è la parte dopo il "=".
```
    <dataVariable>
        <sourceName>=var tc=row.columnFloat("tempC"); return tc&gt;35 || tc&lt;-5? -99.0f : tc\\*9/5+32;</sourceName> 
        <destinationName>tempF</destinationName>
        <dataType>float</dataType>
        <addAttributes>
            <att name="units">degrees\\_F</att>
        </addAttributes>
    </dataVariable>
```
###### Bandiera rigida
Se si modifica l'espressione o lo script definito in unsourceName# You must set a[bandiera dura](/docs/server-admin/additional-information#hard-flag)per il dataset così ilERDDAP™cancella tutte le informazioni memorizzate nella cache per il dataset e rilegge ogni file di dati (utilizzando la nuova espressione o script) la prossima volta carica il dataset. In alternativa, è possibile utilizzare[DasDds](#dasdds)che fa l'equivalente di impostare una bandiera dura.

###### Percentuale Encode
Questo è solo raramente rilevante: Perché le espressioni e gli script sono scritti indatasets.xml, che è un documento XML, è necessario per cento codificare qualsiasi&lt;, \\&gt; e & caratteri nelle espressioni e negli script come&lt;, &gt;, e &amp; .

###### Problemi comuni
Un problema comune è che si crea una variabilesourceName= *espressione* ma la colonna risultante dei dati ha solo valori mancanti. In alternativa, alcune righe della nuova colonna hanno valori mancanti e pensi che non dovrebbero. Il problema di fondo è che qualcosa non va con l'espressione eERDDAPsta convertendo quell'errore in un valore mancante. Per risolvere il problema,

* Guarda l'espressione per vedere quale potrebbe essere il problema.
* Guarda[log.txt](/docs/server-admin/additional-information#log), che mostrerà il primo messaggio di errore generato durante la creazione di ogni nuova colonna.

Le cause comuni sono:

* Hai usato il caso sbagliato. Espressioni e script sono sensibili al caso.
* Hai omesso il nome della classe. Per esempio, è necessario utilizzare Math.abs () Non solo abs () .
* Non hai fatto conversioni di tipo. Ad esempio, se il tipo di dati del valore di un parametro è String e hai un doppio valore, devi convertire un doppio in uno String tramite ""+d.
* Il nome della colonna nell'espressione non corrisponde esattamente al nome della colonna nel file (o il nome potrebbe essere diverso in alcuni file) .
* C'è un errore di sintassi nell'espressione (ad esempio, un mancante o extra) ').

Se sei bloccato o hai bisogno di aiuto,
si prega di includere i dettagli e vedere i nostri[sezione per ottenere supporto aggiuntivo](/docs/intro#support).
        
###### &lt;destinationName&gt;{#destinationname-1} 
* [&lt;destinationName&gt; (#destinationname) -- il nome della variabile che verrà mostrata e utilizzata daERDDAP™utenti.
    * Questo è OPTIONAL. Se assente, il[sourceName](#sourcename)viene utilizzato.
    * Questo è utile perché permette di cambiare un criptico o stranosourceName.
    *   destinationNameè sensibile al caso.
    *   destinationNames DOVE iniziare con una lettera (A-Z, a-z) e DEVE essere seguito da 0 o più caratteri (A-Z, a-z, 0-9 e \\_) . ('-'era permesso primaERDDAP™versione 1.10.) Questa restrizione consente ai nomi variabili di dati di essere gli stessi inERDDAP™, nei file di risposta, e in tutto il software in cui tali file saranno utilizzati, compresi i linguaggi di programmazione (comePython♪MatlabeJavaScript) dove ci sono restrizioni simili su nomi variabili.
    * In EDDTable datasets,[longitudine, latitudine, altitudine (o profondità) e il tempo](#destinationname)le variabili di dati sono speciali.
             
###### &lt;dati Tipo &gt;{#datatype} 
* [&lt;dataType&gt;] (#datatype #) -- specifica il tipo di dati proveniente dalla fonte. (In alcuni casi, ad esempio, quando si leggono i dati dai file ASCII, si specifica come i dati provenienti dalla fonte devono essere memorizzati.) 
    * Questo è REQUIRED da alcuni tipi di dataset e IGNORED da altri. Tipi di Dataset che richiedono questo per lorodataVariablesono:EDDGridDaXxxFiles, EDDTableFromXxxFiles, EDDTableFromMWFS, EDDTableFromNOS, EDDTableFromSOS. Altri tipi di dataset ignorano questo tag perché ottengono le informazioni dalla fonte.
         
    * I valori validi sono uno degli standard[ERDDAP™tipi di dati](#data-types)più boolean (vedi sotto) . I dati I nomi di tipo sono sensibili al caso.
         
###### dati boolean{#boolean-data} 
*   ["booleano"](#boolean-data)è un caso speciale.
    * Internamente,ERDDAP™non supporta un tipo booleano perché i booleani non possono memorizzare i valori mancanti e la maggior parte dei tipi di file non supportano i booleani. Inoltre,DAPnon supporta i booleani, quindi non ci sarebbe un modo standard per query variabili booleane.
    * Specificare "boolean" per i dati Tipologiadatasets.xmlcauserà valori booleani da conservare e rappresentati come byte: Traduzione:missing\\_value.
    * Gli utenti possono specificare vincoli utilizzando i valori numerici (per esempio, "isAlive=1") .
    *   ERDDAP™gli amministratori a volte hanno bisogno di utilizzare i dati "booleani" Tipologiadatasets.xmlper direERDDAP™come interagire con la sorgente dati (ad esempio, per leggere i valori booleani da un database relazionale e convertirli a 0, 1, o 127) .
         
* Se si desidera modificare una variabile di dati dal dataTipo nei file sorgente (per esempio, breve) in alcuni altri dati Digitare nel set di dati (per esempio, int) Non usare&lt;dataType&gt; per specificare cosa si desidera. (Funziona per alcuni tipi di dataset, ma non altri.) Invece:
    * Uso&lt;dataType&gt; per specificare cosa è nei file (per esempio, breve) .
    * Nel&lt;addAttributes&gt; per la variabile, aggiungere un[scale\\_factor](#scale_factor)attributo con i nuovi dati Tipo (per esempio, int) e un valore di 1, per esempio,
```
            <att name="scale\\_factor" type="int">1</att>  
```
###### dataVariable &lt;addAttributes&gt; {#datavariable-addattributes} 
* [&lt;addAttributes&gt; (#variable-addattributes) -- definisce un insieme di attributi ( *nome* = *valore* ) che vengono aggiunti agli attributi della sorgente per una variabile, per rendere gli attributi combinati per una variabile. Questo è OPTIONAL.
Se la variabile è[fonteAttributi](#variable-addattributes)o&lt;addAttributes&gt; includere[scale\\_factore/oadd\\_offset](#scale_factor)attributi, i loro valori saranno utilizzati per disfare i dati dalla sorgente prima della distribuzione al client. La variabile non imballata sarà dello stesso tipo di dati (per esempio, galleggiante) comescale\\_factoreadd\\_offsetvalori.
        
###### Variabile&lt;addAttributes&gt; {#variable-addattributes} 
* [ ** Attributi variabili / Variabili&lt;addAttributes&gt; ** ] (#variable-addattributes) --&lt;addAttributes&gt; è un tag OPTIONAL all'interno di un&lt;axisVariable&gt; o&lt;dataVariable&gt; tag che viene utilizzato per modificare gli attributi della variabile.
    
    *    ** Utilizzare una variabile&lt;addAttributes&gt; per modificare gli attributi della variabile. ** ERDDAP™combina gli attributi di una variabile dalla sorgente del dataset (** fonteAttributi **) e della variabile** addAttributes **che definisci indatasets.xml  (che hanno priorità) per rendere la variabile "** attributi combinati ** ", che sono ciòERDDAP™gli utenti vedono. Così, si può usareaddAttributesper ridefinire i valori di sorgenteAttributi, aggiungere nuovi attributi, o rimuovere gli attributi.
    * Vedere il [ ** &lt;addAttributes&gt; **informazioni] (#addattributes) che si applica a livello globale e variabile** &lt;addAttributes&gt; ** .
    *   ERDDAP™cerca e utilizza molti di questi attributi in vari modi. Ad esempio, i valori della barra di colore sono necessari per rendere disponibile una variabile tramiteWMS, in modo che le mappe possono essere fatte con colori coerentiBar.
    *   [La longitudine, latitudine, altitudine (o profondità) , e variabili di tempo](#destinationname)ottenere un sacco di metadati appropriati automaticamente (per esempio,[unità](#units)) .
    * Un campione&lt;addAttributes&gt; per una variabile di dati è:

    >&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="actual\\_range" type="doubleList">10.34 23.91&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="colorBarMinimum" type="double">0&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="colorBarMaximum" type="double">32&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[ioos\\_category](#ioos_category)">Temperature&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[long\\_name](#long_name)">Sea Surface Temperature&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="numberOfObservations" />  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">degree\\_C&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  

Il numero vuotoOfObservations attributo causa il numero sorgenteOfObservations attributo (se c'è) da rimuovere dall'elenco finale, combinato di attributi.
    * Fornire queste informazioni aiutaERDDAP™fare un lavoro migliore e aiuta gli utenti a capire i set di dati.
I buoni metadati rendono un dataset utilizzabile.
I metadati insufficienti rendono inutile un set di dati.
Si prega di prendere il tempo per fare un buon lavoro con attributi metadati.
    
###### Commenti su attributi variabili che sono speciali inERDDAP:

###### actual\\_range {#actual_range} 
*   [ **actual\\_range** ](#actual_range)è un attributo variabile RECOMMENDED. Per esempio,

>    &lt;att name="actual\\_range" [type="floatList"](#attributetype)\\>0.17 23.58&lt;/att>

* Questo attributo è da[CDCCOARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)e[CF 1.7+](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)standard di metadati.
* Se presente, deve essere una serie di due valori dello stesso tipo di dati del tipo di destinazione della variabile, specificando l'effettivo (non il teorico o il permesso) valori minimi e massimi dei dati per tale variabile.
* Se i dati sono imballati[scale\\_factore/oadd\\_offset](#scale_factor)♪actual\\_rangedeve avere valori imballati ed essere dello stesso tipo di dati dei valori non imballati.
* Per alcune fonti di dati (per esempio, tutti EDDTableDa... Dataset file) ♪ERDDAP™determina ilactual\\_rangedi ogni variabile e impostaactual\\_rangeattributo. Con altre fonti di dati (per esempio, database relazionali, Cassandra,DAPPER,Hyrax) , potrebbe essere fastidioso o gravoso per la fonte per calcolare l'intervallo, quindiERDDAP™Non lo richiede. In questo caso, è meglio se è possibile impostareactual\\_range  (soprattutto per le variabili di longitudine, latitudine, altitudine, profondità e tempo) aggiungendo unactual\\_rangeattributo a ciascuna variabile [&lt;addAttributes&gt; (#addattributes) per questo dataset indatasets.xml, per esempio,

>    &lt;att name="actual\\_range" [type="doubleList"](#attributetype)\\>-180 180&lt;/att>

* Per numeri[variabili temporali e timestamp](#time-units), i valori specificati devono essere la fonte rilevante (non destinazione) valori numerici. Ad esempio, se i valori di tempo di origine sono memorizzati come "giorni dal 1985-01-01", allora ilactual\\_rangedovrebbe essere specificato in "giorni dal 1985-01". E se si desidera fare riferimento a NOW come il secondo valore per i dati in tempo quasi reale che viene periodicamente aggiornato, si dovrebbe utilizzare NaN . Ad esempio, per specificare un intervallo di dati 1985-01-17 fino a NOW, utilizzare

>    &lt;att name="actual\\_range" [type="doubleList"](#attributetype)\\>16 NaN&lt;/att>

* Seactual\\_rangeè conosciuto (sia daERDDAP™calcolarlo o aggiungendolo tramite&lt;addAttributes&gt;ERDDAP™lo mostrerà all'utente sul modulo di accesso dati ( *datasetID* .html) e fare un grafico pagine web ( *datasetID* .) per quel dataset e usarlo quando si generano i metadati FGDC e ISO 19115. Inoltre, gli ultimi 7 giorni del tempoactual\\_rangevengono utilizzati come subset temporale predefinito.
* Seactual\\_rangeè noto, gli utenti possono utilizzare[min min () e max () funzioni](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#min)nelle richieste, che è spesso molto utile.
* Per tutti i dati EDDTable, seactual\\_rangeè conosciuto (sia da Lei specificandolo o daERDDAP™calcolarlo) ♪ERDDAP™sarà in grado di rifiutare rapidamente qualsiasi richiesta di dati al di fuori dell'intervallo. Ad esempio, se il valore di tempo più basso del dataset corrisponde al 1985-01-17, allora una richiesta di tutti i dati dal 1985-01 al 1985-01-16 sarà immediatamente respinta con il messaggio di errore "La tua richiesta non ha prodotto risultati corrispondenti". Questo faactual\\_rangeun pezzo molto importante di metadati, in quanto può salvareERDDAP™molto sforzo e salvare l'utente un sacco di tempo. E questo evidenzia cheactual\\_rangei valori non devono essere più ristretti della gamma reale dei dati; altrimenti,ERDDAP™può erroneamente dire "Non ci sono dati corrispondenti" quando infatti ci sono dati rilevanti.
* Quando un utente seleziona un sottoinsieme di dati e richiede un tipo di file che include metadati (per esempio,.nc) ♪ERDDAP™modificaactual\\_rangenel file di risposta per riflettere la gamma del sottoinsieme.
* Vedi anche[data\\_minedata\\_max](#data_min-and-data_max), che sono un modo alternativo per specificareactual\\_range. Tuttavia, questi sono deprecati ora cheactual\\_rangeè definito da CF 1.7+.
         
###### Attributi della barra di colore{#color-bar-attributes} 
Ci sono diversi attributi variabili OPTIONAL che specificano gli attributi predefiniti suggeriti per una barra di colore (usato per convertire i valori dei dati in colori su immagini) per questa variabile.
* Se presente, queste informazioni vengono utilizzate come informazioni predefinite da griddap etabledapogni volta che si richiede un'immagine che utilizza una barra di colore.
* Ad esempio, quando i dati grigliati di latitudine-longitude vengono tracciati come una copertura su una mappa, la barra dei colori specifica come i valori dei dati vengono convertiti in colori.
* Avere questi valori consenteERDDAP™per creare immagini che utilizzano una barra di colore coerente in diverse richieste, anche quando i valori di tempo o di altre dimensioni variano.
* Questi nomi di attributo sono stati creati per l'uso inERDDAP. Non sono di uno standard di metadati.
* Gli attributi relativi alla barra dei colori sono:
    *    **colorBarMinimum** specifica il valore minimo sul coloreBar. Per esempio,

    >    &lt;att name="colorBarMinimum" [type="double"](#attributetype)\\>-5&lt;/att>  

    * Se i dati sono imballati[scale\\_factore/oadd\\_offset](#scale_factor), specificare ilcolorBarMinimumcome valore imballato.
    * Valori di dati inferiori acolorBarMinimumsono rappresentati dallo stesso colore comecolorBarMinimumvalori.
    * L'attributo dovrebbe essere di[tipo="doppio"](#attributetype), indipendentemente dal tipo della variabile di dati.
    * Il valore è di solito un bel numero tondo.
    * Migliori pratiche: Consigliamo un valore leggermente superiore al valore minimo dei dati.
    * Non c'è valore predefinito.
*    **colorBarMaximum** specifica il valore massimo sul coloreBar. Per esempio,

    >    &lt;att name="colorBarMaximum" [type="double"](#attributetype)\\>5&lt;/att>  

    * Se i dati sono imballati[scale\\_factore/oadd\\_offset](#scale_factor), specificare ilcolorBarMinimumcome valore imballato.
    * Valori di dati superiori acolorBarMaximumsono rappresentati dallo stesso colore comecolorBarMaximumvalori.
    * L'attributo dovrebbe essere di[tipo="doppio"](#attributetype), indipendentemente dal tipo della variabile di dati.
    * Il valore è di solito un bel numero tondo.
    * Migliori pratiche: Consigliamo un valore leggermente inferiore al valore massimo dei dati.
    * Non c'è valore predefinito.
*    **colore BarPalette** specifica la tavolozza per il coloreBar. Per esempio,
    ```
            <att name="colorBarPalette">WhiteRedBlack</att>
    ```
    * TuttiERDDAP™impianti supportano queste palette standard: BlackBlueWhite, BlackRedWhite, BlackWhite, BlueWhiteRed, LightRainbow, Ocean, OceanDepth, Rainbow, RedWhiteBlue, ReverseRainbow, Topografia, TopografiaDepth\\[aggiunto in v1.74\\], WhiteBlack, WhiteBlueBlack e WhiteRedBlack.
    * Se hai installato[tavolozze aggiuntive](/docs/server-admin/additional-information#palettes), si può fare riferimento a uno di loro.
    * Se questo attributo non è presente, il default è BlueWhiteRed se \\-1\\*colorBarMinimum=colorBarMaximum; altrimenti il default è Rainbow.
*    **coloreBarScale** specifica la scala per il coloreBar. Per esempio,
    ``` 
            <att name="colorBarScale">Log</att>
    ```
    * I valori validi sono lineari e log.
    * Se il valore è Log,colorBarMinimumdeve essere maggiore di 0.
    * Se questo attributo non è presente, il default è Linear.
*    **colore BarContinuo** specifica se il coloreBar ha una tavolozza continua di colori, o se il coloreBar ha alcuni colori discreti. Per esempio,
    ```
            <att name="colorBarContinuous">false</att>
    ```
    * Valori validi sono le stringhe vere e false.
    * Se questo attributo non è presente, il default è vero.
*    **coloreBarNSections** specifica il numero predefinito di sezioni sul coloreBar. Per esempio,
    ```
            <att name="colorBarNSections" type="int">6</att>
    ```
    * I valori validi sono interi positivi.
    * Se questo attributo non è presente, il default è \\-1, che diceERDDAP™per selezionare il numero di sezioni in base alla gamma del coloreBar.
###### WMS {#wms} 
I principali requisiti per una variabile da raggiungere tramiteERDDAP'WMSserver sono:
* Il dataset deve essere unEDDGrid... dataset.
* La variabile di dati DEVE essere una variabile grigliata.
* La variabile di dati DEVE avere variabili di longitudine e di latitudine. (Altre variabili di asse sono OPTIONAL.) 
* Ci devono essere alcuni valori di longitudine tra -180 e 180.
* ThecolorBarMinimumecolorBarMaximumattributi Devo essere specificato. (Altri attributi della barra di colore sono OPTIONAL.) 

###### data\\_minedata\\_max {#data_min-and-data_max} 
*   [ **data\\_min** e **data\\_max** ](#data_min-and-data_max)-- Questi sono attributi variabili deprecati definiti nel World Ocean Circulation Experiment (WOCE) descrizione dei metadati. Per esempio,

    >    &lt;att name="data\\_min" [type="float"](#attributetype)\\>0.17&lt;/att>  
    >    &lt;att name="data\\_max" [type="float"](#attributetype)\\>23.58&lt;/att>

    * Si consiglia di utilizzare[actual\\_range](#actual_range), invece didata\\_minedata\\_maxperchéactual\\_rangeè ora definito dalla specifica CF.
    * Se presenti, devono essere dello stesso tipo di dati del tipo di dati di destinazione della variabile e specificare l'effettivo (non il teorico o il permesso) valori minimi e massimi dei dati per tale variabile.
    * Se i dati sono imballati[scale\\_factore/oadd\\_offset](#scale_factor)♪data\\_minedata\\_maxdevono essere i valori imballati utilizzando il tipo di dati non imballati.
         
###### variabiledrawLandMask {#variable-drawlandmask} 
*   [ **drawLandMask** ](#variable-drawlandmask)-- Questo è un attributo variabile OPTIONAL utilizzato daERDDAP™  (e senza standard di metadati) che specifica il valore predefinito per l'opzione "Draw Land Mask" sul modulo Make A Graph del dataset ( *datasetID* .) e per il parametro &.land in un URL che richiede una mappa dei dati. Per esempio,
    ```
        <att name="drawLandMask">under</att>  
    ```
Vedere la[drawLandMaskpanoramica](#drawlandmask).
###### Codifica{#encoding} 
*   [ **\\_Codifica** ](#encoding)
    * Questo attributo può essere utilizzato solo con le variabili di stringa .
    * Questo attributo è fortemente raccomandato.
    * Questo attributo è da[NetCDFGuida dell'utente (NUG) ](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/index.html).
    * Internamente inERDDAP™, Le stringhe sono una sequenza di caratteri di 2 byte che utilizzano[Unicode UCS-2 set di caratteri](https://en.wikipedia.org/wiki/UTF-16).
    * Molti tipi di file supportano solo i caratteri di 1 byte in Strings e quindi hanno bisogno di questo attributo per identificare un associato
        [charset (Pagina del codice AKA) ](https://en.wikipedia.org/wiki/Code_page)che definisce come mappare i 256 valori possibili ad un insieme di 256 caratteri tratti dal set di caratteri UCS-2 e/o dal sistema di codifica, ad esempio,[UTF-8](https://en.wikipedia.org/wiki/UTF-8)  (che richiede tra 1 e 4 byte per carattere) .
    * I valori per \\_Encoding sono case-insensibili.
    * In teoria,ERDDAP™potrebbe supportare gli identificatori \\_Encoding da[questa lista IANA](https://www.iana.org/assignments/character-sets/character-sets.xhtml), ma in pratica,ERDDAP™attualmente solo supporti
        * ISO-8859-1 (notare che ha trattini, non sottolinea) , che ha il vantaggio che è identico ai primi 256 caratteri di Unicode, e
        * UTF-8.
    * Quando si leggono i file sorgente, il valore predefinito è ISO-8859-1, ad eccezione dei file netcdf-4, dove il valore predefinito è UTF-8.
    * Questo è un problema problematico in corso perché molti file di origine utilizzano charset o codifiche che sono diverse da ISO-8859-1, ma non identificare il charset o la codifica. Ad esempio, molti file di dati di origine hanno alcuni metadati copiati e incollati da Microsoft Word su Windows e quindi hanno tratti e apostrofi fantasia da un set di beneficenza specifico di Windows invece di ASCII hyphens e apostrofes. Questi personaggi poi appaiono come caratteri strani o '?' inERDDAP.
         
###### fileAccessBaseUrl{#fileaccessbaseurl} 
*    **[fileAccessBaseUrl](#fileaccessbaseurl)e fileAccessSuffix** sono attributi molto raramente utilizzati che non sono da qualsiasi standard. Se una colonna EDDTable ha nomi di file di file accessibili web (ad esempio, immagini, video o file audio) , si può aggiungere
```
    <att name="fileAccessBaseUrl">*someBaseURL*</a>  
```
per specificare l'URL di base (termina con /) necessario per rendere i nomi dei file in URL completi. In casi insoliti, come quando una colonna ha riferimenti a file .png ma i valori mancano ".png", è possibile aggiungere
```
    <att name="fileAccessSuffix">*someSuffix*</a>  
```
(per esempio,&lt;at name="fileAccessSuffix"&gt;.png&lt;/a&gt;)
per specificare un suffisso da aggiungere per rendere i nomi dei file in URL completi. Allora.htmlTablerisposte,ERDDAP™mostrerà il nome del file come link all'URL completo (la base Url più il nome del file più il suffisso) .

Se vuoiERDDAP™per servire i file correlati, fare un separato[EDDTableFromFileNames](#eddtablefromfilenames)dataset per quei file (può essere un set di dati privato) .
    
###### fileAccessArchive Ur{#fileaccessarchiveurl} 
*   [ **fileAccessArchive Ur** ](#fileaccessarchiveurl)è un attributo molto raramente usato che non è da alcun standard. Se una colonna EDDTable ha nomi di file di file accessibili web (ad esempio, immagini, video o file audio) che sono accessibili tramite un archivio (ad esempio,.zipfile) accessibile tramite un URL, utilizzare&lt;at name="fileAccessArchiveUrl"&gt; *L'URL* &lt;/att&gt; per specificare l'URL per l'archivio.
    
Se vuoiERDDAP™per servire il file di archivio, fare un separato[EDDTableFromFileNames](#eddtablefromfilenames)dataset per quel file (può essere un set di dati privato) .
    
###### ioos\\_category {#ioos_category} 
*   [ **ioos\\_category** ](#ioos_category)-- Questo è un attributo variabile REQUIRED se&lt;variabiliMustHaveIoosCategory&gt; è impostato su true (il default) in[setup.xml](/docs/server-admin/deploy-install#setupxml); altrimenti, è OPTIONAL.
Per esempio,&lt;#ioos\\_category&gt; Salinità&lt;//
Le categorie sono da[NOAASistema integrato di osservazione dell'oceano (IOOS) ](https://ioos.noaa.gov/).
    
    *    (Per scrivere questo) Non siamo a conoscenza di definizioni formali di questi nomi.
    * I nomi principali sono da Zdenka Willis' .ppt "Integrated Ocean Observing System (IOOS)  NOAAApproccio alla costruzione di una capacità operativa iniziale" e dal[US IOOS Blueprint](https://www.iooc.us/wp-content/uploads/2010/11/US-IOOS-Blueprint-for-Full-Capability-Version-1.0.pdf)  (pagina 1-5) .
    * È probabile che questo elenco sarà rivisto in futuro. Se avete richieste, si prega di e-mail Chris. John a Noaa.gov.
    *   ERDDAP™supporta un elenco più ampio di categorie di IOOS perché Bob Simons ha aggiunto nomi aggiuntivi (per lo più basato sui nomi dei campi scientifici, ad esempio, Biologia, Ecologia, Meteorologia, Statistica, Tassonomia) per altri tipi di dati.
    * I valori attuali validi inERDDAP™sono Bathymetry, Biology, Bottom Character, CO2, Colored Dissolved Organic Matter, Contaminants, Currents, Dissolved Nutrients, Dissolved O2, Ecology, Fish Abundance, Fish Species, Heat Flux, Hydrology, Ice Distribution, Identifier, Location, Meteorology Wave, Ocean Color, Optical Properties, Other, Pathogens, Phytoplan
    * C'è qualche sovrapposizione e ambiguità tra termini diversi -- fare il meglio.
    * Se aggiungiioos\\_categoryalla lista di&lt;categoryAttributes&gt; inERDDAP'[setup.xml](/docs/server-admin/deploy-install#setupxml)file, gli utenti possono facilmente trovare set di dati con dati simili tramiteERDDAP"Ricerca per i Datasets per Categoria" nella home page.
        [Prova a usareioos\\_categoryalla ricerca di dataset di interesse.](https://coastwatch.pfeg.noaa.gov/erddap/categorize/ioos_category/index.html?page=1&itemsPerPage=1000)
    * C'era[una discussione suERDDAP™eioos\\_categorynelERDDAP™Google Group.](https://groups.google.com/forum/#!topic/erddap/TnwbgzpSS0w)
    
Potete essere tentati di impostare&lt;variabiliMustHaveIoosCategory&gt; a false in modo che questo attributo non sia richiesto. ("Pfft&#33; Cos'è per me?") Alcune ragioni per lasciarla stabilita a vero (il default) e usoioos\\_categorysono:
    
    * Se setup.xml è&lt;variabiliMustHaveIoosCategory&gt; è impostato a vero,[GenerareDatasetsXml](#generatedatasetsxml)crea sempre/suggest unioos\\_categoryattributo per ogni variabile in ogni nuovo dataset. Allora perche' non lasciarlo entrare?
    *   ERDDAP™consente agli utenti di cercare set di dati di interesse per categoria.ioos\\_categoryè una categoria di ricerca molto utile perché i ioos\\_categories (ad esempio, Temperatura) sono piuttosto ampie. Questo faioos\\_categorymolto meglio per questo scopo che, per esempio, il CF molto più sottilestandard\\_name# (che non sono così buoni per questo scopo a causa di tutti i sinonimi e variazioni leggere, per esempio, mare\\_surface\\_temperature versus mare\\_acqua\\_temperatura) .
(Utilizzoioos\\_categoryper questo scopo è controllato da&lt;categoryAttributes&gt; nel file setup.xml.)
        [Prova a usareioos\\_categoryalla ricerca di dataset di interesse.](https://coastwatch.pfeg.noaa.gov/erddap/categorize/ioos_category/index.html?page=1&itemsPerPage=1000)
    * Queste categorie sono da[NOAASistema integrato di osservazione dell'oceano (IOOS) ](https://ioos.noaa.gov/). Queste categorie sono fondamentali per la descrizione di IOOS della missione di IOOS. Se sei dentroNOAA, sostegnoioos\\_categoryè un bene Uno...NOAAcosa da fare. (Guarda qui.[UnoNOAAvideo video](https://www.youtube.com/watch?v=nBnCsMYm2yQ)e essere ispirato&#33;) Se sei in qualche altra agenzia americana o internazionale, o lavori con agenzie governative, o lavori con qualche altro Ocean Observing System, non è una buona idea collaborare con l'ufficio IOOS degli Stati Uniti?
    * Prima o poi, potresti volerne altriERDDAP™link ai tuoi set di dati tramite[EDDGridDa Erddap](#eddfromerddap)e[EDDTableFromErddap](#eddfromerddap). Se l'altroERDDAP™richiedeioos\\_category, i tuoi dati devono avereioos\\_categoryin ordine perEDDGridDa Erddap e EDDTableFromErddap al lavoro.
    * È psicologicamente molto più facile da includereioos\\_categoryquando si crea il dataset (è solo un'altra cosa cheERDDAP™richiede di aggiungere il datasetERDDAP) , che aggiungerlo dopo il fatto (se hai deciso di usarlo in futuro) .
         
###### long\\_name {#long_name} 
*   [ **long\\_name** ](#long_name)  ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)♪[CFU](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)e[ACDDETTI](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)standard di metadati) è un attributo variabile RACCOMANDATO inERDDAP. Per esempio,
    ```
        <att name="long\\_name">Eastward Sea Water Velocity</att>
    ```
    *   ERDDAP™utilizza illong\\_nameper l'etichettatura degli assi sui grafici.
    * Migliori pratiche: Capitalizzare le parolelong\\_namecome se fosse un titolo (capitalizzare la prima parola e tutte le parole non artificiali) . Non includere le unità nellelong\\_name. Il lungo nome non dovrebbe essere molto lungo (di solito&lt;20 caratteri), ma dovrebbe essere più descrittivo del[destinationName](#destinationname), che è spesso molto conciso.
    * Se...long\\_name" non è definito nella variabile[fonteAttributi](#variable-addattributes)o&lt;addAttributes&gt;ERDDAP™lo genererà pulendo il[standard\\_name](#standard_name)  (se presente) odestinationName.
         
###### missing\\_value {#missing_value} 
*   [ **missing\\_value** ](#missing_value)e **# Filtro # Valore**   ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)e[CFU](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)) sono attributi variabili che descrivono un numero (per esempio, -9999) che è usato per rappresentare un valore mancante. Per esempio,

>  &lt;att name="missing\\_value" [type="double"](#attributetype)\\>-9999&lt;/att>  

Per le variabili di stringa, il default per entrambi è "" (la stringa vuota) .
Per le variabili numeriche, il default per entrambi è NaN.
*   ERDDAP™supporta entrambimissing\\_valuee \\_FillValue, dal momento che alcune fonti di dati assegnano significati leggermente diversi.
* Se presenti, dovrebbero essere dello stesso tipo di dati della variabile.
* Se i dati sono imballati[scale\\_factore/oadd\\_offset](#scale_factor)#missing\\_valuee i valori \\_FillValue devono essere anche imballati. Allo stesso modo, per una colonna con valori di data/ora di stringa che utilizzano un locale[time\\_zone](#time_zone)#missing\\_valuee i valori \\_FillValue dovrebbero utilizzare la zona orario locale.
* Se una variabile utilizza questi valori speciali,missing\\_valuee/o gli attributi \\_FillValue sono REQUIRED.
* Per[variabili temporali e timestamp](#time-units)  (se la sorgente è stringa o numerica) ♪missing\\_values e \\_FillValori appaiono come " (la stringa vuota) quando il tempo è scritto come String e come NaN quando il tempo è scritto come un doppio. I valori sorgente permissing\\_valuee \\_FillValue non apparirà nei metadati della variabile.
* Per variabili di stringa,ERDDAP™sempre converte qualsiasimissing\\_values o \\_FillValuta i valori dei dati in " (la stringa vuota) . I valori sorgente permissing\\_valuee \\_FillValue non apparirà nei metadati della variabile.
* Per variabili numeriche:
Themissing\\_valuee \\_FillValue apparirà nei metadati della variabile.
Per alcuni formati di dati di output,ERDDAP™lascerà intatti questi numeri speciali, ad esempio, vedrete -9999.
Per altri formati di dati di uscita (in particolare formati simili a testo come .csv e.htmlTable) ♪ERDDAP™sostituirà questi numeri speciali con NaN o ".
* Alcuni tipi di dati hanno intrinseci indicatori di valore mancanti che non hanno bisogno di essere esplicitamente identificati conmissing\\_valueo \\_FillValue attributi: galleggiante e doppie variabili hanno NaN (Non un numero) , I valori di stringa usano la stringa vuota e i valori di char hanno carattere\\uffff  (personaggio #65535, che è il valore di Unicode per Not a Character) . I tipi di dati Integer non hanno marcatori di valore mancanti.
* Se una variabile integer ha un valore mancante (per esempio, una posizione vuota in un file .csv) ♪ERDDAP™interpreterà il valore come definitomissing\\_valueo \\_FillValore per quella variabile. Se nessuno è definito,ERDDAP™interpreterà il valore come valore mancante predefinito per quel tipo di dati, che è sempre il valore massimo che può essere tenuto da quel tipo di dati:
127 per variabili di byte, 32767 per corto, 2147483647 per int, 9223372036854775807 per lungo,
255 per ubyte, 65535 per noihort, 4294967295 per uint, e 18446744073709551615 per ulong.
###### ADD \\_FillValue ATTRIBUTES?{#add-_fillvalue-attributes} 
*   [ADD \\_FillValue ATTRIBUTES?](#add-_fillvalue-attributes)  
Ogni voltaERDDAP™carica un dataset, controlla se le variabili con i tipi di dati di origine interi hanno una definizionemissing\\_valueo attributo \\_FillValue. Se una variabile non lo fa, alloraERDDAP™stampa un messaggio al file di registro (iniziando con "Add \\_FillValue Attribute?") raccomandare che ilERDDAP™amministratore aggiungere un \\_Fill attributo di valore per questa variabile indatasets.xml. È molto utile per ogni variabile avere un \\_FillValue omissing\\_valueperché i valori mancanti sono sempre possibili, ad esempio, se un dato file in un dataset non ha una determinata variabile,ERDDAP™deve essere in grado di presentare quella variabile come avere tutti i valori mancanti per quella variabile. Se si decide una variabile non dovrebbe avere un attributo \\_FillValue, è possibile aggiungere
    &lt;int name="\\_FillValue"&gt;null&lt;/att&gt; invece, che sopporterà il messaggio per questodatasetIDCombinazione +variabile in futuro.
    
Ogni voltaERDDAP™inizia, raccoglie tutte quelle raccomandazioni in un messaggio che è scritto al file di registro (a partire da "ADD \\_FillValue ATTRIBUTES?) , inviato via email alERDDAP™amministratore, e scritto a un file di dati CSV nel\\[BigParentDirectory\\]/logs/ directory. Se vuoi, puoi usare il programma GenerateDatasetsXml (e l'opzione AddFillValueAttributes) per applicare tutti i suggerimenti del file CSV aldatasets.xmlfile. Per qualsiasidatasetID/variabili combinazioni in quel file, se si decide non c'è bisogno di aggiungere l'attributo, è possibile modificare l'attributo a&lt;int name="\\_FillValue"&gt;null&lt;/att&gt; sopprimere la raccomandazione per questodatasetIDCombinazione +variabile in futuro.
    
E' importante&#33;
Come ha spesso detto Bob: sarebbe male (e imbarazzante) se alcune delle prove del riscaldamento globale sono state causate da valori mancanti non identificati nei dati (ad esempio, i valori di temperatura di 99 o 127 gradi\\_ C che avrebbe dovuto essere contrassegnata come valori mancanti e così ha skewed la media e/o le statistiche mediane più alte) .

* Il valore \\_Fill emissing\\_valuei valori per una determinata variabile in diversi file sorgente devono essere coerenti; altrimenti,ERDDAP™accetterà i file con un insieme di valori e rigetterà tutti gli altri file come "Bad Files". Per risolvere il problema,
    * Se i file sono grigliati.ncfile, è possibile utilizzare[EDDGridDaNcFilesUnpacked](#eddgridfromncfilesunpacked).
    * Se i file sono file di dati schedari, è possibile utilizzare EDDTableFrom...Files '[standardizzare Cosa?](#standardizewhat)per direERDDAPstandardizzare i file sorgente in cui vengono lettiERDDAP.
    * Per problemi più difficili, è possibile utilizzare[NCML](#ncml-files)o[NCO](#netcdf-operators-nco)per risolvere il problema.
             
###### scale\\_factor {#scale_factor} 
*   [ **scale\\_factor** ](#scale_factor)  (default = 1) e **add\\_offset**   (default = 0)   ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)e[CFU](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)) sono attributi variabili OPTIONAL che descrivono i dati che sono imballati in un tipo di dati più semplice tramite una semplice trasformazione.
    * Se presente, il loro tipo di dati è diverso dal tipo di dati sorgente e descrive il tipo di dati dei valori di destinazione.
Ad esempio, una fonte di dati potrebbe aver memorizzato i valori dei dati del galleggiante con una cifra decimale imballata come brevi ints (Indice) , usandoscale\\_factor= 0,1 eadd\\_offset= 0. Ad esempio,

    >    &lt;att name="scale\\_factor" [type="float"](#attributetype)\\>0.1&lt;/att>  
    >    &lt;att name="add\\_offset" [type="float"](#attributetype)\\>0&lt;/att>  

In questo esempio,ERDDAP™disfare i dati e presentarlo all'utente come valori di dati float.
    * Se presente,ERDDAP™estrarre i valori da questi attributi, rimuovere gli attributi e disfare automaticamente i dati per l'utente:
destinazione Valore = fonte Valore *scale\\_factor+add\\_offset  
O, ha dichiarato un altro modo:
non imballatoValue = imballato Valore *scale\\_factor+add\\_offset
    * Thescale\\_factoreadd\\_offseti valori per una determinata variabile in diversi file sorgente devono essere coerenti; altrimenti,ERDDAP™accetterà i file con un insieme di valori e rigetterà tutti gli altri file come "Bad Files". Per risolvere il problema,
        * Se i file sono grigliati.ncfile, è possibile utilizzare[EDDGridDaNcFilesUnpacked](#eddgridfromncfilesunpacked).
        * Se i file sono file di dati schedari, è possibile utilizzare EDDTableFrom...Files '[standardizzare Cosa?](#standardizewhat)per direERDDAPstandardizzare i file sorgente in cui vengono lettiERDDAP.
        * Per problemi più difficili, è possibile utilizzare[NCML](#ncml-files)o[NCO](#netcdf-operators-nco)per risolvere il problema.
             
###### standard\\_name {#standard_name} 
*   [ **standard\\_name** ](#standard_name)  (dal[CFU](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)standard metadati) è un attributo variabile RACCOMANDATO inERDDAP. CF mantiene l'elenco dei permessi[Nomi standard CF](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html). Per esempio,
    ```
        <att name="standard\\_name">eastward\\_sea\\_water\\_velocity</att>
    ```
    * Se aggiungistandard\\_nameagli attributi delle variabili e aggiungerestandard\\_namealla lista di&lt;categoryAttributes&gt; inERDDAP'[setup.xml](/docs/server-admin/deploy-install#setupxml)file, gli utenti possono facilmente trovare set di dati con dati simili tramiteERDDAP"Ricerca per i Datasets per Categoria" nella home page.
    * Se si specifica un CFstandard\\_nameper una variabile, l'attributo delle unità per la variabile non deve essere identico alle Unità Canoniche specificate per il nome standard nella tabella CF Standard Name, ma le unità devono essere convertibili nelle Unità Canoniche. Ad esempio, tutti i CF correlati alla temperaturastandard\\_nameS hanno "K" (Kelvin) come unità canoniche. Quindi una variabile con una temperatura correlatastandard\\_nameDOVE avere unità di K, grado\\_C, grado\\_F, o qualche variante UDUnits di quei nomi, dal momento che sono tutti interconvertibile.
    * Migliori pratiche: Parte della potenza[vocabolario controllato](https://en.wikipedia.org/wiki/Controlled_vocabulary)viene da utilizzare solo i termini nella lista. Così si consiglia di attaccare ai termini definiti nel vocabolario controllato, e si consiglia di non inventare un termine se non c'è uno appropriato nella lista. Se avete bisogno di termini aggiuntivi, vedere se il comitato standard li aggiungerà al vocabolario controllato.
    *   standard\\_namei valori sono gli unici valori dell'attributo CF che sono sensibili al caso. Sono sempre tutti minuscoli. A partire daERDDAP™v1.82, GenerateDatasets convertirà lettere maiuscole in lettere minuscole. E quando un dataset viene caricatoERDDAP, lettere maiuscole sono silenziosamente cambiate in lettere minuscole.
         
###### time\\_precision {#time_precision} 
*   time\\_precisionè un attributo OPTIONAL utilizzato daERDDAP™  (e senza standard di metadati) per[variabili temporali e timestamp](#time-units), che possono essere in set di dati grigliati o set di dati tabulari, e inaxisVariableodataVariableS. Per esempio,
    ```
        <att name="time\\_precision">1970-01-01</att>  
    ```
    time\\_precisionspecifica la precisione da utilizzare ogni voltaERDDAP™formati i valori di tempo da quella variabile come stringhe sulle pagine web, incluso.htmlTablerisposte. In formati di file doveERDDAP™formati volte come stringhe (per esempio, .csv e.json) ♪ERDDAP™utilizza solotime\\_precision- formato specificato se include secondi frazionari; altrimenti,ERDDAP™utilizza il 1970-01-01T00:00:00:00 Formato Z.
* Valori validi sono 1970-01, 1970-01-01, 1970-01T00Z, 1970-01-01-01T00:00Z, 1970-01-01T00:00:00Z (il default) , 1970-01-01T00:00:00.0Z, 1970-01-01T00:00:00:00.00Z, 1970-01-01T00:00:00.000Z.\\[Il 1970 non è un'opzione perché è un singolo numero, quindiERDDAP™non può sapere se è una stringa di tempo formattata (un anno) o se è un certo numero di secondi dal 1970-01-01T00:00:00Z.\\]
* Setime\\_precisionnon è specificato o il valore non è corrispondente, il valore predefinito verrà utilizzato.
* Qui, come in altre parti diERDDAP™, tutti i campi del tempo formattato che non vengono visualizzati sono assunti per avere il valore minimo. Per esempio, 1985-07, 1985-07-01, 1985-07-01T00Z, 1985-07-01T00:00Z, e 1985-07-01T00:00:00:00:00 Z sono tutti considerati equivalenti, anche se con diversi livelli di precisione impliciti. Questo corrisponde al[ISO 8601:2004"extended"Specificazione del formato del tempo](https://www.iso.org/iso/date_and_time_format).
*    **ATTENZIONE:** Si dovrebbe usare solo un limitatotime\\_precisionse **Tutto** dei valori di dati per la variabile hanno solo il valore minimo per tutti i campi che sono nascosti.
    * Per esempio, è possibile utilizzare untime\\_precisiondel 1970-01-01 se tutti i valori di dati hanno ora=0, minuto=0, e secondo=0 (per esempio 2005-03-04T00:00:00Z e 2005-03-05T00:00:00Z) .
    * Per esempio, non usare untime\\_precisiondel 1970-01-01 se ci sono valori non-0 ora, minuto o secondi, (per esempio 2005-03-05T12:00:00:00Z) perché il valore dell'ora non predefinita non sarebbe visualizzato. Altrimenti, se un utente chiede tutti i dati con time=2005-03-05, la richiesta fallirà inaspettatamente.
             
###### time\\_zone {#time_zone} 
*   [ **time\\_zone** ](#time_zone)
    *   time\\_zoneè un attributo OPTIONAL utilizzato daERDDAP™  (e senza standard di metadati) per[variabili temporali e timestamp](#time-units), che possono essere in set di dati grigliati o set di dati tabulari.
    * Il default è "Zulu" (che è la versione moderna di fuso orario di GMT) .
    * Informazioni sullo sfondo: "time offsets" (per esempio, Pacific Standard Time, -08:00, GMT-8) sono fissi, specifici, compensati relativi aZulu  (GMT) . Al contrario, "zone temporali" sono le cose molto più complesse che sono influenzate da Daylight Saving (ad esempio, "US/Pacific") , che hanno avuto regole diverse in luoghi diversi in tempi diversi. I fusi orari hanno sempre nomi in quanto non possono essere riassunti da un semplice valore di offset (vedi la colonna "Nomi del database TZ" nella tabella a[ https://en.wikipedia.org/wiki/List\\_of\\_tz\\_database\\_time\\_zones ](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)) .ERDDAP'time\\_zoneattributo ti aiuta a gestire i dati dell'ora locale da qualche fuso orario (per esempio, 1987-03-25T17:32:05 Pacifico Tempo) . Se hai dati di stringa o di tempo numerico con un (fisso) tempo compensato, si dovrebbe semplicemente regolare i dati perZulu  (che è ciòERDDAP™vuole) specificando un diverso tempo di base nell'attributo delle unità (ad esempio, "ore dal 1970-01-01T08:00:00:00Z", si noti il T08 per specificare il tempo compensato) , e controllare sempre i risultati per assicurarsi di ottenere i risultati che si desidera.
    * Per variabili timestamp con dati di origine da Strings, questo attributo consente di specificare un fuso orario che conduceERDDAP™per convertire i tempi di origine locale-tempo-zona (alcuni in Standard time, alcuni in Daylight Tempo di risparmio) aZuluvolte (che sono sempre in Tempo standard) . L'elenco dei nomi di fuso orario valido è probabilmente identico all'elenco nella colonna TZ alla[ https://en.wikipedia.org/wiki/List\\_of\\_tz\\_database\\_time\\_zones ](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). I fusi orari comuni degli Stati Uniti sono: US/Hawaii, US/Alaska, US/Pacific, US/Mountain, US/Arizona, US/Central, US/Eastern.
    * Per variabili di timestamp con dati di origine numerica, è possibile specificare il "time\\_zone"attributo, ma il valore deve essere "Zulu"o "UTC". Se avete bisogno di supporto per altri fusi orari, si prega di e-mail Chris. John a noaa.gov.
         
###### unità{#units} 
*   [ **unità** ](#units)  ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)♪[CFU](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)e[ACDDETTI](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)standard metadati) definisce le unità dei valori di dati. Per esempio,
    ```
        <att name="units">degree\\_C</att>
    ```
    * "units" è REQUIRED come una fonteAttributo o un componente aggiuntivo per"time"variabili ed è RACCOMANDATO STRONGLY per altre variabili ogni volta che opportuno (che è quasi sempre) .
    * In generale, si consiglia[UDUnits](https://www.unidata.ucar.edu/software/udunits/)\\-unità compatibili che è richiesto dal[COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)e[CFU](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)standard.
    * Un altro standard comune è[UCIO](https://unitsofmeasure.org/ucum.html)- il Codice Unificato per Unità di Misura.[OGC](https://www.ogc.org/)servizi quali[SOS](https://www.ogc.org/standards/sos)♪[WCS](https://www.ogc.org/standards/wcs)e[WMS](https://www.ogc.org/standards/wms)richiedono UCUM e spesso si riferiscono a UCUM come UOM (Unità di misura) .
    * Si consiglia di utilizzare uno standard di unità per tutti i set di dati nel vostroERDDAP. Dovresti dirlo.ERDDAP™quale standard stai usando&lt;unità\\_standard&gt;, nel vostro[setup.xml](/docs/server-admin/deploy-install#setupxml)file.
    * Le unità per una determinata variabile in diversi file sorgente devono essere coerenti. Se si dispone di una raccolta di file di dati in cui un sottoinsieme dei file utilizza valori di unità diverse rispetto ad uno o più altri sottoset dei file (ad esempio,
"giorni dal 1985-01" contro "giorni dal 2000-01-01",
"grado\\_Celsius" contro "deg\\_C", o
"knots" contro "m/s") è necessario trovare un modo per standardizzare i valori delle unità, altrimenti,ERDDAP™carica solo un sottoinsieme dei file. Pensateci: se un file ha ventoSpeed unit=knots e un altro ha ventoSpeed unit=m/s, allora i valori dei due file non dovrebbero essere inclusi nello stesso dataset aggregato.
        * Se i file sono grigliati.ncfile, in molte situazioni è possibile utilizzare[EDDGridDaNcFilesUnpacked](#eddgridfromncfilesunpacked).
        * Se i file sono file di dati tabulari, in molte situazioni è possibile utilizzare EDDTableFrom...Files '[standardizzare Cosa?](#standardizewhat)per direERDDAPstandardizzare i file sorgente in cui vengono lettiERDDAP.
        * Per problemi più difficili, è possibile utilizzare[NCML](#ncml-files)o[NCO](#netcdf-operators-nco)per risolvere il problema.
    * La sezione standard CF 8.1 dice che se i dati di una variabile sono imballati tramite[scale\\_factore/oadd\\_offset](#scale_factor), "Le unità di una variabile devono essere rappresentative dei dati non imballati".
    *   [Per variabili temporali e timestamp,](#time-units)o la variabile[fonteAttributi](#variable-addattributes)o&lt;addAttributes&gt; (che ha la precedenza) Ho[unità](#units)che sia
        
        * Per variabili dell'asse temporale o variabili di dati temporali con dati numerici:[UDUnits](https://www.unidata.ucar.edu/software/udunits/)\\- stringa compatibile (con il formato *unità* da *baseTime* ) descrivere come interpretare i valori del tempo di origine (per esempio, secondi dal 1970-01T00:00:00:00Z) .
            
         *unità* può essere qualsiasi di:
        ```
            ms, msec, msecs, millis, millisec, millisecs, millisecond, milliseconds,  
            s, sec, secs, second, seconds, m, min, mins, minute, minutes, h, hr, hrs, hour, hours,  
            d, day, days, week, weeks, mon, mons, month, months, yr, yrs, year, or years.  
        ```
Tecnicamente,ERDDAP™non segue ilUDUNITSstandard durante la conversione"years since"e"months since"valori di tempo"seconds since". TheUDUNITSstandard definisce un anno come un valore unico fisso: 3.15569259747e7 secondi. EUDUNITSdefinisce un mese come anno/12. Purtroppo, la maggior parte / tutti i set di dati che abbiamo visto quell'uso"years since"o"months since"chiaramente intendono i valori per essere anni di calendario o mesi di calendario. Per esempio, 3"months since 1970-01-01"di solito è destinato a significare 1970-04-01. Allora...ERDDAP™interpretazioni"years since"e"months since"come calendario anni e mesi, e non segue rigorosamenteUDUNITSstandard.
            
The *baseTime* deve essere un ISO 8601:2004 (E) stringa di data formattata (yyyy-MM-dd'T'HH:mm:ssZ, per esempio, 1970-01-01T00:00:00Z) , o qualche variazione di questo (per esempio, con parti mancanti alla fine) .ERDDAP™cerca di lavorare con una vasta gamma di variazioni di quel formato ideale, ad esempio, "1970-1-1 0:0:0" è supportato. Se manca l'informazione del fuso orario, si presume che siaZulufuso orario (AKA GMT) . Anche se è specificato un altro offset temporale,ERDDAP™non usa mai Daylight Saving Time. Se la baseTime utilizza un altro formato, è necessario utilizzare&lt;addAttributes&gt; specificare una nuova stringa di unità che utilizza una variazione della ISO 8601:2004 (E) formato (ad esempio, cambiare i giorni dal 1° gennaio 1985 in giorni dal 1985-01-01.
        
Puoi provareERDDAPla capacità di affrontare una specifica *unità* da *baseTime* conERDDAP'[Convertitore di tempo](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html). Speriamo che si può collegare un numero (il valore della prima volta dalla fonte di dati?) e una stringa di unità, fare clic su Convert, eERDDAP™sarà in grado di convertirlo in una ISO 8601:2004 (E) stringa di data formattata. Il convertitore restituirà un messaggio di errore se la stringa delle unità non è riconoscibile.

###### Unità di tempo di stringa{#string-time-units} 
*   [Per l'attributo delle unità per variabili di dati temporali o timestamp con dati di stringa,](#string-time-units)è necessario specificare un[java.time.DateTimeFormatter](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html)modello (che è per lo più compatibile con java.text. SimpleDateFormat) che descrive come interpretare i tempi di stringa.
    
Per i formati di tempo comunemente utilizzati che sono variazioni della ISO 8601:2004 (E) formato standard (per esempio, 2018-01-02T00:00:00:00Z) , è possibile specificare variazioni diyyyy-MM-dd'T'HH:mm:ssZ, per esempio, usoyyyy-MM-ddse il tempo di stringa ha solo un appuntamento. Per qualsiasi formato che inizia con yyyy-M,ERDDAPutilizza un parser speciale che è molto perdonante di variazioni minori nel formato. Il parser può gestire fusi orari nel formato 'Z', "UTC", "GMT", ±XX:XX, ±XXXX e ±XXX. Se le parti dell'ora della data non sono specificate (per esempio, minuti e secondi) ♪ERDDAP™assume il valore più basso per quel campo (ad esempio, se i secondi non sono specificati, si presume che si tratti di secondi=0) .
    
Per tutti gli altri formati di tempo di stringa, è necessario specificare con precisione una stringa di formato di tempo compatibile con DataTimeFormatter. #yyyy-MM-dd'T'HH:mm:ssZ, queste stringhe di formato sono costruite da caratteri che identificano un tipo specifico di informazioni dalla stringa di tempo, ad esempio, m significa minuti di ora. Se si ripete il carattere del formato un certo numero di volte, si affina ulteriormente il significato, ad esempio, m significa che il valore può essere specificato da qualsiasi numero di cifre, mm significa che il valore deve essere specificato da 2 cifre. TheJavadocumentazione per DateTimeFormatter è una panoramica grezza e non rende questi dettagli chiari. Quindi ecco un elenco di varianti di carattere di formato e il loro significato all'internoERDDAP™  (che a volte è leggermente diverso daJavaDataTimeFormatter) :
    
    |Caratteri|Esempi|Significato|
    |---|---|---|
    |u, y, Y|\\-4712, 0, 1, 10, 100, 2018|un numero di anno, qualsiasi numero di cifre.ERDDAP™Trattamenti (anno di età) e Y (settimana-basato-anno, perché questo è spesso erroneamente usato invece di y) come u, il[numero anno astronomico](https://en.wikipedia.org/wiki/Astronomical_year_numbering). Gli anni astronomici sono interi positivi o negativi che non utilizzano il BCE (BC) o CE (AD) era designators: 2018=2018CE, ..., 2=2CE, 1=1CE, 0=1BCE, -1=2BCE, -2=3BCE, ...|
    |uuuu, yyyy, Sì.|\\-4712, 0000, 0001, 0010, 0100, 2018|un numero di anno astronomico a 4 cifre (ignorare qualsiasi precedente '-')  |
    |M|1, 01, 12|un numero di mese, qualsiasi numero di cifre (1=gennaio)  |
    |MM|01, 12|a 2 cifre (zero imbottito) numero di mese|
    |M|Jan, Jan, JAN|a 3 lettere Nome del mese inglese, caso insensibile|
    |MM|Gennaio, Gennaio, Gennaio, Gennaio, GENNAIO|a 3 lettera o nome completo del mese inglese, caso insensibile|
    |D|1, 01, 31|un numero di giorno del mese, qualsiasi numero di cifre|
    |D|01, 31|a 2 cifre (zero imbottito) Giorno del mese. Il primo 'digit' può essere uno spazio.|
    |D|1, 001, 366|giorno dell'anno, qualsiasi numero di cifre, 001=Jan 1|
    |D|001, 366|giorno dell'anno, 3 cifre, 001=Jan 1|
    |E|thu, THU, Thu|un giorno di 3 lettere di settimana, il valore viene ignorato quando la parsing|
    |EEEE|giovedì, giovedì, giovedì, giovedì|a 3 lettere o full English day-of-week, caso insensibile, il valore viene ignorato quando il parsing|
    |H|0, 00, 23|H ora del giorno (0-23) , qualsiasi numero di cifre|
    |H|00, 23|HH ora del giorno (00-23) 2 cifre. Il primo 'digit' può essere uno spazio.|
    |a|AM, PM, PM|AM o PM, caso insensibile|
    |h|12, 1, 01, 11|orologio-ora-di-am-pm (12, 1, 2, ... 11) , qualsiasi numero di cifre|
    |#|12, 01, 11|orologio-ora-di-am-pm (12, 1, 2, ... 11) 2 cifre. Il primo 'digit' può essere uno spazio.|
    |K|0, 1, 11|ore del mattino (0, 1, ...11) , qualsiasi numero di cifre|
    |KK|00, 01, 11|ore del mattino, 2 cifre|
    |m|0, 00, 59|minuto di ora, qualsiasi numero di cifre|
    |mm|00, 59|minuto di ora, 2 cifre|
    |#|0, 00, 59|secondo minuto, qualsiasi numero di cifre|
    |#|00, 59|secondo minuto, 2 cifre|
    |S|0, 000, 9, 999|frazione di secondo, come se seguendo un punto decimale, qualsiasi numero di cifre|
    |SS|00, 99|centesimi di secondo, 2 cifre|
    |SSS|000, 999|migliaia di secondo, 3 cifre|
    |A|0, 0000, 86399999|millisecondo giorno, qualsiasi numero di cifre|
    |AAAAAAAAAA|00000000, 86399999|millisecondo giorno, 8 cifre|
    |N.|0, 000000000000000000, 8639999999999999|nanosecondo di giorno, qualsiasi numero di cifre. InERDDAP™, questo è troncato a nMillis.|
    |NNNNNNNNNNNNNNNNNN|000000000000000000, 863999999999999999|nanosecondo giorno, 14 cifre. InERDDAP™Questo è troncato a nMillis.|
    |n|0, 000000000000000, 5999999999999|nanosecondo di secondo, qualsiasi numero di cifre. InERDDAP™Questo è troncato a nMillis.|
    |N.d.|00000000000, 5999999999999|nanosecondo di secondo, 11 cifre. InERDDAP™Questo è troncato a nMillis.|
    |XXX, ZZZ|Z, -08:00, +01:00|un fuso orario con il formato 'Z' o ± (2 cifre) : (2 cifre) . Questo tratta *spazio* come + (non standard) . ZZZ che supporta 'Z' non è standard ma si occupa di un errore utente comune.|
    |XX, ZZ|Z -0800, +0100|un fuso orario con il formato 'Z' o ± (2 cifre) : (2 cifre) . Questo tratta *spazio* come + (non standard) . ZZ che supporta 'Z' non è standard ma si occupa di un errore utente comune.|
    |X, Z|Z, -08, +01|un fuso orario con il formato 'Z' o ± (2 cifre) : (2 cifre) . Questo tratta *spazio* come + (non standard) . Z supporta 'Z' non è standard ma si occupa di un errore utente comune.|
    |xxx|0-08:00, +01:00|un fuso orario con il formato ± (2 cifre) : (2 cifre) . Questo tratta *spazio* come + (non standard) .|
    |x|\\-0800, +0100|un fuso orario con il formato ± (2 cifre)  (2 cifre) . Questo tratta *spazio* come + (non standard) .|
    |x|\\-08, +01|un fuso orario con il formato ± (2 cifre) . Questo tratta *spazio* come + (non standard) .|
    |'|"T", "Z", "GMT"|inizio e fine di una serie di caratteri letterali|
    |' ' (due singole citazioni)  |' '|due singole citazioni denota una sola citazione letterale|
    | \\[\\] | \\[ \\] |l'inizio ("\\[") e la fine ("\\]") di una sezione opzionale. Questa notazione è supportata solo per caratteri letterali e alla fine della stringa di formato.|
    |#, & #123;, & #125;|#, & #123;, & #125;|riservato all'uso futuro|
    |G,L,Q,e,c,V,z,O,p|     |Questi caratteri di formattazione sono supportati daJava's DateTimeFormatter, ma attualmente non supportato daERDDAP. Se avete bisogno di supporto per loro, e-mail Chris. John a noaa.gov.|
    
Note:
    
    * In una data con punteggiatura, i valori numerici possono avere un numero variabile di cifre (ad es., nel formato data slash statunitense "1/2/1985", il mese e la data possono essere 1 o 2 cifre) in modo che il formato deve usare token a 1 lettere, ad esempio, M/d/yyyy, che accettano qualsiasi numero di cifre per il mese e la data.
    * Se il numero di cifre per un articolo è costante, ad esempio, 01/02/1985, specificare il numero di cifre nel formato, ad esempio, MM/dd/yyyyy per il mese a 2 cifre, la data a 2 cifre e l'anno a 4 cifre.
    * Questi formati sono difficili da lavorare. Un dato formato può funzionare per la maggior parte, ma non tutti, stringhe di tempo per una determinata variabile. Controllare sempre che il formato specificato funzioni come previstoERDDAPper tutte le stringhe di tempo di una variabile.
    * Quando possibile, GenerateDatasetXml suggerirà stringhe di formato di tempo.
    * Se avete bisogno di aiuto per generare una stringa di formato, si prega di e-mail Chris. John a noaa.gov.

La variabile di dati di tempo principale (per set di dati tabulari) e la variabile dell'asse di tempo principale (per set di dati grigliati) sono riconosciuti dal[destinationName](#destinationname)tempo. I loro metadati devono essere una stringa di unità compatibile con UDUnits per valori di tempo numerici, ad esempio, "giorni dal 1970-01" (per set di dati tabulari o grigliati) o[unità adatta per tempi di stringa](#string-time-units)"M/d/yyyyy" (per set di dati tabulari) .

Unità di tempo diverse in diverse grigliate.ncFile - Se hai una collezione di griglie.ncfile in cui, per la variabile di tempo, un sottoinsieme dei file utilizza diverse unità di tempo rispetto ad uno o più altri sottoset dei file, è possibile utilizzare[EDDGridDaNcFilesUnpacked](#eddgridfromncfilesunpacked). Converte i valori del tempo in"seconds since 1970-01-01T00:00:00Z"a un livello inferiore, nascondendo così le differenze, in modo da poter fare un set di dati dalla raccolta di file eterogenei.

###### Variabili TimeStamp{#timestamp-variables} 
[Variabili TimeStamp](#timestamp-variables)-- Qualsiasi altra variabile (axisVariableodataVariablein unEDDGrido set di dati EDDTable) può essere una variabile timeStamp. Le variabili di timestamp sono variabili che hanno unità e dati relativi al tempo, ma hanno un&lt;destinationName&gt; diverso dal tempo. Le variabili TimeStamp si comportano come la variabile di tempo principale in quanto convertono il formato di tempo della sorgente in"seconds since 1970-01-01T00:00:00Z"e/o ISO 8601:2004 (E) formato).ERDDAP™riconosce il tempo Le variabili di timbro per il loro tempo "[unità](#units)" metadati, che devono corrispondere a questa espressione regolare "\\[a-zA-Z\\]+ + visto +\\[0\\].+" (per data numerica I tempi, per esempio,"seconds since 1970-01-01T00:00:00Z") o essere una data stringa di formato orario contenente "uuuu", "yyyyy" o "YYYY" (per esempio, "yyyy-MM-dd'T'HH:mm:ssZ') . Ma per favore usi ancoradestinationName "time"per la data principale Variabile temporale.

 **Controllare sempre il vostro lavoro per essere sicuri che i dati del tempo che si presenta inERDDAP™sono i dati di tempo corretti.** Lavorare con i dati del tempo è sempre difficile e incline agli errori.

Vedi[maggiori informazioni sulle variabili di tempo](#destinationname).
ERDDAP™ha una utilità per[Convertire un Numerico Tempo di / da un tempo di stress](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html).
Vedi[Come?ERDDAP™Offerte con il tempo](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap).
         
        
###### valid\\_range {#valid_range} 
*   [ **valid\\_range** o **valid\\_min** e **valid\\_max** ](#valid_range)-- Questi sono attributi variabili OPTIONAL definiti nel[CFU](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)convenzioni di metadati. Per esempio,

    >    &lt;att name="valid\\_range" [type="floatList"](#attributetype)\\>0.0 40.0&lt;/att>  

o

    >    &lt;att name="valid\\_min" [type="float"](#attributetype)\\>0.0&lt;/att>  
    >    &lt;att name="valid\\_max" [type="float"](#attributetype)\\>40.0&lt;/att>  

    * Se presenti, devono essere dello stesso tipo di dati della variabile e specificare i valori minimi e massimi validi dei dati per tale variabile. Gli utenti dovrebbero considerare i valori al di fuori di questa gamma per essere invalidi.
    *   ERDDAP™non si applicavalid\\_range. Ha detto un altro modo:ERDDAP™non converte i valori di dati al di fuori delvalid\\_rangeal \\_Fill Valore omissing\\_value.ERDDAP™solo passa su questi metadati e lascia l'applicazione fino a te.
Perche'? Ecco a cosa servono questi metadati. Se il fornitore di dati avesse voluto, il fornitore di dati avrebbe potuto convertire i valori di dati al di fuori delvalid\\_rangeper essere \\_FillValues.ERDDAP™non secondo indovinare il fornitore di dati. Questo approccio è più sicuro: se viene mostrato in seguito che ilvalid\\_rangeera troppo stretto o altrimenti scorretto,ERDDAP™non avrà cancellato i dati.
    * Se i dati sono imballati[scale\\_factore/oadd\\_offset](#scale_factor)♪valid\\_range♪valid\\_minevalid\\_maxdovrebbe essere il tipo e i valori di dati imballati. DaERDDAP™si applicascale\\_factoreadd\\_offsetquando carica il dataset,ERDDAP™disfare il pacchettovalid\\_range♪valid\\_minevalid\\_maxvalori in modo che i metadati di destinazione (mostrati agli utenti) indicherà il tipo e l'intervallo di dati non imballati.
O, se un imballato\\_valid\\_rangeattributo è presente, verrà rinominatovalid\\_rangequandoERDDAP™carica il dataset.
##### &lt;rimuovereMVRows&gt;{#removemvrows} 
* [ ** &lt;rimuovereMVRows&gt; ** ] (#removemvrows) è un tag OPTIONAL all'interno di un tag indatasets.xmlper EDDTableFromFiles (compresi tutti i sottoclassi) datasets, anche se è utilizzato solo per EDDTableFromMultidimNcFiles. Può avere un valore di vero o falso. Per esempio, vero
Questo rimuove qualsiasi blocco di righe alla fine di un gruppo in cui tutti i valori sonomissing\\_value, \\_FillValue, o CoHort ...Arrivo il valore nativo mancante (o char=#32 per CharArrays) . Questo è per il tipo di file CF DSG Multidimensional Array e file simili. Se è vero, questo fa il test corretto e quindi carica sempre tutte le variabili dim max, quindi può richiedere tempo extra.
Il valore predefinito è falso.
Raccomandazione -- Se possibile per il vostro set di dati, si consiglia di impostare removeMVRows a false. Impostare rimuovereMVRows a true può rallentare significativamente le richieste, anche se può essere necessario per alcuni set di dati.
