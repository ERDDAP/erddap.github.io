---
title: "EDDTableFromEML" 
---
# EDDTableFromEML e EDDTableFromEMLBatch Opzioni in GenerateDatasets Xml

\\[Questa pagina web sarà solo di interesseERDDAP™amministratori che lavorano con i file EML.
Questo documento è stato originariamente creato nel 2016. È stato modificato l'ultima volta il 2020-11-30.\\]

[ **ERDDAP™** ](https://coastwatch.pfeg.noaa.gov/erddap/index.html)è un server di dati che fornisce agli utenti un modo semplice e coerente per scaricare sottoinsiemi di dataset scientifici grigliati e tabulari in formati di file comuni e fare grafici e mappe.ERDDAP™funziona con un dato dataset come un gruppo di variabili grigliate multidimensionali (ad esempio, dati satellitari o modello) o come tabella di base (con una colonna per ogni tipo di informazione e una riga per ogni osservazione) .ERDDAP™è Software Libero e Open Source, così chiunque può[scaricare e installareERDDAP™](/docs/server-admin/deploy-install)per servire i loro dati.

Per aggiungere un set di dati a unERDDAP™installazione, ilERDDAP™l'amministratore deve aggiungere un pezzo di XML che descrive il dataset a un file chiamatodatasets.xml. (C'è[documentazione approfondita perdatasets.xml](/docs/server-admin/datasets).) Anche se è possibile generare il pezzo di XML perdatasets.xmlinteramente a mano,ERDDAP™viene con uno strumento chiamato[ **GenerareDatasetsXml** ](/docs/server-admin/datasets#tools)che può generare la bozza ruvida del pezzo di XML necessario per un dato set di dati basato su alcune fonti di informazioni sul dataset.

La prima cosa GenerateDatasets Xml chiede che tipo di dataset si desidera creare. Genera i dati Xml ha un'opzione speciale, **EDDTable FromEML** , che utilizza le informazioni in un[Lingua ecologica dei metadati (EML) ](https://knb.ecoinformatics.org/external//emlparser/docs/index.html)file XML per generare il pezzo di XML perdatasets.xmlper creare un[EDDTableFromAsciiFiles](/docs/server-admin/datasets#eddtablefromasciifiles)dataset da ogni tabella di dati in un file EML. Questo funziona molto bene per la maggior parte dei file EML, soprattutto perché i file EML fanno un ottimo lavoro di memorizzazione di tutti i metadati necessari per un set di dati in un formato facile da lavorare. Le informazioni che GenerateDatasetsXml ha bisogno di creare i set di dati è nel file EML, tra cui l'URL per il file di dati, che GenerateDatasetsXml scarica, parses, e confronta con la descrizione nel file EML. (Molti gruppi potrebbero fare bene per passare a EML, che è un ottimo sistema per documentare qualsiasi dataset scientifico tabulare, non solo dati ecologici. E molti gruppi che creano schemi XML farebbe bene ad usare EML come caso di studio per lo schema XML che sono chiari, al punto, non eccessivamente profondi (cioè, troppi livelli) , e facile per gli esseri umani e computer a lavorare con.) 

## Domande{#questions} 

Ecco tutte le domande GenerateDatasets Xml chiederà, con commenti su come si dovrebbe rispondere se si desidera elaborare solo un file EML o un gruppo di file EML:

* Quale EDDType?
Se si desidera elaborare un solo file, rispondere: EDDTableFromEML
Se si desidera elaborare un gruppo di file, rispondere: EDDTableFromEMLBatch
* Directory per memorizzare i file?
Inserisci il nome della directory che verrà utilizzata per memorizzare i file EML e/o dati scaricati.
Se la directory non esiste, verrà creata.
*    (Per EDDTableDaEML solo) URL EML o file localeName?
Inserisci l'URL o il nome del file locale di un file EML.
*    (Per EDDTableFromEMLBatch solo) EML dir (URL o locale) ?
Inserisci il nome della directory con i file EML (un URL o un dir locale) .
Per esempio: http://sbc.lternet.edu/data/eml/files/
 
*    (Per EDDTableFromEMLBatch solo) Nome file regex?
Inserisci l'espressione regolare che verrà utilizzata per identificare i file EML desiderati nella directory EML.
Per esempio: knb-lter-sbc\\\\\\\d+
* Utilizzare i file locali se presenti (vero|falso) ?
Inserisci il vero per utilizzare i file EML locali esistenti e i file di dati, se esistono.
Inserisci falso per scaricare sempre i file EML e/o i file di dati.
* accessibile A?
Se si desidera che i nuovi set di dati siano dataset privati inERDDAP, specificare il nome del gruppo (#) che sarà consentito l'accesso.
Raccomandato per gruppi LTER: combinare "lter" più il gruppo, ad esempio, lter Sbc.
Se si entra "null", non ci sarà&lt;accessibile To&gt; tag in uscita.
Vedi[accessibile A](/docs/server-admin/datasets#accessibleto).
* locale locale TimeZone (ad esempio, US/Pacifico) ?
Se una variabile di tempo indica che ha valori di tempo locale, questo fuso orario verrà assegnato.
Questo deve essere un valore dal[Elenco della colonna TZ dei nomi della zona temporale](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).
Nota tutti i nomi "US/..." facili da usare alla fine della lista.
Se poi si trova che per essere errato, è possibile modificare iltime\\_zonein the chunk ofdatasets.xml.

EML plusERDDAP™è una grande combinazione, poichéERDDAP™può dare agli utenti più accesso diretto alla ricchezza di[Rete di Conoscenza per la Biocomplessità (KNB) ](https://knb.ecoinformatics.org/)e[Ricerca ecologica a lungo termine (LETTERA) ](https://lternet.edu/)dati e aiutare questi progetti incontrare il governo degli Stati Uniti[Accesso pubblico ai risultati della ricerca (PARERI) requisiti](https://nosc.noaa.gov/EDMC/PD.DSP.php)rendendo i dati disponibili tramite un servizio web. Inoltre, EML plusERDDAP™sembra un grande ponte tra gli scienziati nel regno accademico / finanziato dal NSF e scienziati nell'agenzia federale (NOAA, NASA, USGS) Il regno.

Guarda la nostra[sezione per ottenere supporto aggiuntivo](/docs/intro#support).
 
## Design dettagli{#design-details} 

Ecco i dettagli di progettazione dell'opzione EDDTableFromEML in GenerateDatasetsXml.
Alcuni sono legati alle differenze nel modo in cui EML eERDDAP™fare le cose e come GenerateDatasets Xml si occupa di questi problemi.

### Un datoTable Diventa unoERDDAP™Dataset{#one-datatable-becomes-one-erddap-dataset} 
Un file EML può avere più&lt;dati Table&gt;s.ERDDAP™faERDDAP™dataset per dati EMLTable. ThedatasetIDper il dataset è
 *EMLName* # *tavoloNumero*   (quando EMLname è testo) o
 *sistema\\_EMLName* # *tavoloNumero*   (quando EMLname è un numero) .
Ad esempio, la tabella #1 nel file knb-lter-sbc.28, diventaERDDAP™ datasetID=knb\\_lter\\_sbc\\_28\\_t1,
     
### EML contro CF+ACDD{#eml-versus-cfacdd} 
Quasi tutti i metadati nei file EML entra inERDDAP, ma in un formato diverso.ERDDAP™utilizza il[CFU](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)e[ACDDETTI](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)standard di metadati. Sono sistemi di metadati complementari che utilizzano coppie chiave=valore per metadati globali e per i metadati di ciascuna variabile.
Sì, la rappresentazione EML dei metadati è più bella della rappresentazione CF+ACDD. Non sto suggerendo di usare la rappresentazione CF+ACDD come sostituto per l'EML. Si prega di pensare a CF+ACDD come parte del ponte dal mondo EML alOPeNDAP/CF/ACDD mondo.
     
### Piccoli cambiamenti{#small-changes} 
ERDDAP™fa un sacco di piccoli cambiamenti. Per esempio,ERDDAP™utilizza il EML non-DOIalternativo Identifier plus a dataNumero comeERDDAP™ datasetID, ma leggermente si alternano Identifier per renderlo un nome variabile valido nella maggior parte delle lingue del computer, ad esempio, dati knb-lter-sbc.33 La tabella #1 diventa knb\\_lter\\_sbc\\_33\\_t1.
     
### DocBook{#docbook} 
EML utilizza il sistema di markup di DocBook per fornire la struttura a blocchi di testo nei file EML. CF e ACDD richiedono che i metadati siano testo semplice. Così genera i dati Xml converte il testo segnalato in testo normale che sembra la versione formattata del testo. I tag in linea sono sanitizzati con staffe quadrate, ad esempio,\\[sottolineato\\], e lasciato nel testo normale.
     
### File di dati{#data-files} 
Dal momento che i dati EMLTable include l'URL del file di dati effettivo, GenerateDatasets Xml sarà:
1. Scarica il file di dati.
2. Conservalo nella stessa directory del file EML.
3. Leggi i dati.
4. Confrontare la descrizione dei dati nell'EML con i dati reali nel file.
5. Se Genera i dati Xml trova differenze, si occupa di loro, o chiede all'operatore se le differenze sono ok, o restituisce un messaggio di errore. I dettagli sono in vari articoli qui sotto.
         
### .zip'd File di dati{#zipd-data-files} 
Se il file di dati di riferimento è un.zipfile, deve contenere solo un file. Questo file sarà usato perERDDAP™Dataset. Se c'è più di 1 file.ERDDAP™respingerà tale dataset. Se necessario, questo potrebbe essere modificato. (In pratica, tutti i file zip SBC LTER hanno solo un file di dati.)   
     
### Tubo di stoccaggio{#storagetype} 
Se lo storage di una colonna Il tipo non è specificato,ERDDAP™utilizza la sua migliore ipotesi in base ai dati nel file di dati. Questo funziona abbastanza bene.
     
### Unità{#units} 
ERDDAP™usi[UDUNITSformattazione per unità](https://www.unidata.ucar.edu/software/udunits/). Genera i dati Xml è in grado di convertire unità EML inUDUNITSpulito circa il 95% del tempo. Il restante 5% si traduce in una descrizione leggibile delle unità, ad esempio, "biomassDensityUnitPerAbundanceUnit" in EML diventa "unità di densità di biomassa per unità di abbondanza" inERDDAP. Tecnicamente non e' permesso. Non credo che sia cosi' male nelle circostanze.\\[Se necessario, unità che non possono essere fatteUDUNITScompatibile potrebbe essere spostato all'attributo di commento della variabile.\\]  
     
### EML versione 2.1.1{#eml-version-211} 
Questo supporto per i file EML v2.1.1 è stato aggiunto a GenerateDatasets Xml nel 2016 con la speranza che ci sarebbe qualche assunzione nella comunità EML. A partire dal 2020, non è successo. TheERDDAP™gli sviluppatori sarebbero felici di aggiungere il supporto per le versioni più recenti di EML, ma solo se le nuove funzionalità saranno effettivamente utilizzate. Si prega di e-mailerd.data at noaa.govse si desidera il supporto per le versioni più recenti di EML e in realtà userà questa funzione.
     

## Problemi con i file EML{#issues-with-the-eml-files} 

Ci sono alcuni problemi / problemi con i file EML che causano problemi quando un client software (come l'opzione EDDTableFromEML in GenerateDatasetsXML) tenta di interpretare / elaborare i file EML.

* Anche se ci sono diversi problemi elencati qui, sono per lo più piccoli, solvable problemi. In generale, EML è un grande sistema ed è stato il mio piacere lavorare con esso.
* Questi sono approssimativamente ordinati dal peggio / più comune a meno male / meno comune.
* La maggior parte sono correlati a piccoli problemi in specifici file EML (che non sono colpa di EML) .
* La maggior parte può essere fissata con semplici modifiche al file EML o al file di dati.
* Dato che le persone LTER stanno costruendo un checker EML per testare la validità dei file EML, ho aggiunto alcuni suggerimenti qui sotto per quanto riguarda le caratteristiche che potrebbero essere aggiunte al checker.

Ecco i problemi:

### Data e ora separate colonne{#separate-date-and-time-columns} 
Alcuni file di dati hanno colonne separate per data e per ora, ma nessuna colonna data + ora unificata. Attualmente, GenerateDatasets Xml crea un set di dati con queste colonne separate, ma non è ideale perché:

* È meglio se i datasets inERDDAP™hanno una colonna data+ora combinata chiamata"time".
* Spesso il dataset non si carica inERDDAP™perché"time"la colonna non ha dati data+ora.

Ci sono due soluzioni possibili:
1. Modificare il file di dati sorgente per aggiungere una nuova colonna nel file di dati (e descriverlo nell'EML) dove le colonne della data e dell'ora sono unite in una colonna. Poi eseguire GenerateDatasets Xml così trova la nuova colonna.
2. Utilizzare[Variabili derivati](/docs/server-admin/datasets#script-sourcenamesderived-variables)funzione inERDDAP™definire una nuova variabiledatasets.xmlche è creato concatenando la data e le colonne di tempo. Uno degli esempi riguarda specificamente questa situazione.
         
### Nome colonna incoerente{#inconsistent-column-names} 
I file EML elencano le colonne del file di dati e i loro nomi. Purtroppo, sono spesso diversi dai nomi delle colonne nel file di dati reale. Normalmente, l'ordine della colonna nel file EML è lo stesso dell'ordine della colonna nel file di dati, anche se i nomi variano leggermente, ma non sempre. Genera i dati Xml cerca di abbinare i nomi delle colonne. Quando non può (che è comune) , si fermerà, mostrare le coppie di nome file EML/data, e chiedere se sono correttamente allineati. Se si immette 's' per saltare una tabella, GeneratedDatasetsXml stamperà un messaggio di errore e andare alla tabella successiva.
La soluzione è quella di cambiare i nomi delle colonne errate nel file EML per abbinare i nomi delle colonne nel file di dati.
     
### Ordine colonna differente{#different-column-order} 
Ci sono diversi casi in cui l'EML specificava le colonne in un ordine diverso da quello che esiste nel file di dati. Genera i dati Xml si fermerà e chiederà all'operatore se i matchup sono ok o se il dataset dovrebbe essere saltato. Se è saltato, ci sarà un messaggio di errore nel file dei risultati, ad esempio:
```
      &lt;-- SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
      datasetID=knb\\_lter\\_sbc\\_17\\_t1
      dataFile=all\\_fish\\_all\\_years\\_20140903.csv
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        SURVEY\\_TIMING        = notes
        NOTES                = survey\\_timing
      --&gt;
```
La soluzione è quella di correggere l'ordine della colonna in questi file EML in modo che corrispondano all'ordine nei file di dati.

Sarebbe bello se il checker EML controllasse che le colonne e l'ordine della colonna nel file sorgente corrispondono alle colonne e all'ordine della colonna nel file EML.
    
### Non corretto numHeaderLines{#incorrect-numheaderlines} 
Diversi dati Tabelle in modo errato numHeaderLines=1, ad esempio, ...sbc.4011. Questo provocaERDDAP™leggere la prima riga di dati come i nomi delle colonne. Ho cercato di SKIP manualmente tutti questi datiTavole. Sono ovvi perché i nomi col sorgente non corrispondenti sono tutti valori di dati. E se ci sono file che erroneamente hanno numHeaderLines=0, il mio sistema non lo rende evidente. Ecco un esempio del file di guasti SBC LTER:
```
      &lt;-- SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
       datasetID=knb\\_lter\\_sbc\\_3017\\_t1
      dataFile=MC06\\_allyears\\_2012-03-03.txt
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        2008-10-01T00:00     = timestamp\\_local
        2008-10-01T07:00     = timestamp\\_UTC
        2.27                 = discharge\\_lps
        -999.0               = water\\_temperature\\_celsius
      --&gt;
```
Così l'errore può apparire come se GenerateDatasets Xml pensa che la prima linea con i dati nel file (ad esempio, con 2008-10-01T00:00 ecc.) è la linea con i nomi delle colonne (come se 2008-10-01T00:00 fosse un nome di colonna) .

Sarebbe bello se l'EML checker controllasse il valore di numHeaderLines.
    
### numHeaderLines = 0{#numheaderlines--0} 
Alcuni file sorgente non hanno nomi di colonne.ERDDAP™accetta che se l'EML descrive lo stesso numero di colonne.

A mio parere, questo sembra molto pericoloso. Ci potrebbero essere colonne in un ordine diverso o con unità diverse (vedi sotto) e non c'è modo di prendere quei problemi. È molto meglio se tutti i file di dati ASCII hanno una riga con i nomi delle colonne.
    
### DataTime Formato Strings{#datetime-format-strings} 
EML ha un modo standard per descrivere i formati di data time. ma c'è una notevole variazione nel suo uso nei file EML. (Prima mi sbagliavo. Vedo la documentazione EML per formatString che sembra abbinare[JavaSpecificazione DataTimeFormatter](https://docs.oracle.com/javase/8/docs/api/index.html?java/time/format/DateTimeFomatter.html), ma che manca delle linee guida importanti circa il suo utilizzo, con il risultato che formatString è spesso / di solito improprio usato.) Ci sono diverse istanze con caso errato e/o duplicazione errata di una lettera e/o formattazione non standard. Questo mette un onere irragionevole per i clienti, in particolare i client software come GenerateDatasetsXml. Genera i dati Xml cerca di convertire i formati non definiti nei file EML in
[il formato data/ora cheERDDAP™richiede](/docs/server-admin/datasets#string-time-units), che è quasi identico aJava/Joda tempo formato specificazione, ma è leggermente più indulgente.

Sarebbe bello se l'EML checker richiedesse una stretta adesione allaJava/Joda/ERDDAPla specificazione delle unità di tempo e ha verificato che i valori dell'ora della data nella tabella dei dati potrebbero essere analizzati correttamente con il formato specificato.
    
### DataTime But No Time Zone{#datetime-but-no-time-zone} 
Generare i dati Xml cerca una colonna con data Tempo e una determinata zona temporale (oZulu: dalle unità di tempo che terminano in 'Z' o da un nome di colonna o una definizione di attributo che include "gmt" o "utc", o locale: da "locale" nel nome della colonna o nella definizione di attributo) . Anche accettabile è un file con una colonna della data ma nessuna colonna di tempo. Anche accettabile è un file senza informazioni di data o ora.

Genera i dati Xml tratta tutti i tempi "locali" come dal fuso orario che è possibile specificare per un determinato lotto di file, ad esempio, per SBC LTER, utilizzare US / Pacific. Le informazioni sono a volte nei commenti, ma non in una forma che è facile per un programma di computer da capire.

I file che non soddisfano questi criteri vengono rifiutati con il messaggio "NO GOOD DATE (TEMPO) VARIABILE. I problemi comuni sono:

* C'è una colonna con date e una colonna con tempi, ma non data Colonna temporale.
* Ci sono unità temporali, ma la zona temporale non è specificata.

Altri commenti:
Se c'è una buona data + ora con la colonna fuso orario, quella colonna verrà nominata"time"inERDDAP.ERDDAP™richiede che i dati della colonna di tempo siano comprensibili/convertibiliZulu/UTC/GMT data fuso orario.\\[La mia convinzione è: usare orari locali e diversi formati di data/ora (2 anni&#33; mm/dd/yyy vs dd/mm/yy vs ...) nei file di dati costringe l'utente finale a fare complicate conversioni aZulutempo al fine di confrontare i dati da un dataset con i dati da un altro. Quindi...ERDDAP™standardizza tutti i dati del tempo: Per tempi di stringa,ERDDAP™utilizza sempre la ISO 8601:2004 (E) formato standard, per esempio, 1985-01-02T00:00:00Z. Per tempi numerici,ERDDAP™sempre usi"seconds since 1970-01-01T00:00:00Z".ERDDAP™usa sempreZulu  (UTC, GMT) fuso orario per rimuovere le difficoltà di lavorare con diversi fusi orari e tempo standard rispetto all'ora legale. Così genera i dati Xml cerca una colonna EMLTabella con data+timeZulu. Questo è difficile perché EML non utilizza un vocabolario formale/sistema (come[JavaFormato orario /Joda](https://www.joda.org/joda-time/apidocs/org/joda/time/format/DateTimeFormat.html)) per specificare i dati Formato del tempo:
Se c'è un col con valori di tempo numerici (ad esempio,Matlabvolte) eZulufuso orario (o solo date, senza colonne di tempo) , è usato come"time".
Se c'è un col con dati di data e ora, utilizzando ilZulufuso orario, è usato come"time"e qualsiasi altra data o colonna dell'ora viene rimossa.
Altro se si trova un col con le informazioni della data giusta, viene utilizzato come"time"variabile (senza fuso orario) .
Se c'è una colonna di dati e una colonna di tempo e nessuna data combinata La colonna del tempo, il dataset è REJECTED — ma il dataset potrebbe essere reso utilizzabile aggiungendo una data combinata Colonna temporale (preferibilmente,Zulufuso orario) al file di dati e aggiungendo la sua descrizione nel file EML.
EXAMPLE da SBC LTER:[ https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/ ](https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/)datiTabella #2.

Sarebbe bello se EML/LTER richiedesse l'inclusione di una colonna conZulu  (UTC, GMT) tempi di fuso orario in tutti i relativi file di dati di origine. Il prossimo meglio è aggiungere un sistema a EML per specificare untime\\_zoneattributo utilizzando nomi standard (dal[Colonna TZ](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)) .
    
### Mancatomissing\\_value {#missing-missing_value} 
Alcune colonne usano unmissing\\_valuema non elencarlo nei metadati EML, ad esempio, precipitazioni\\_mm in knb-lter-sbc.5011 utilizza -999. Se non viene specificato alcun valore mancante nell'EML, GenerateDatasetsXml cerca automaticamente i valori mancanti comuni (Ad esempio, 99, 99, 99, 999, 999, 9999, -9999, ecc.) e crea quei metadati. Ma altri mancantimissing\\_values non sono catturati.

Sarebbe bello se l'EML checker cercasse di mancaremissing\\_valueS.
    
### Piccoli problemi{#small-problems} 
Ci sono un sacco di piccoli problemi (ortografia, punteggiatura) che probabilmente sarà trovato solo da un umano che ispeziona ogni dataset.

Sarebbe bello se l'EML checker cercasse errori di ortografia e grammatica. Questo è un problema difficile perché le parole nella scienza sono spesso contrassegnate da controllori di incantesimi. L'editing umano è probabilmente necessario.
    
### Personaggi non validi Unicode{#invalid-unicode-characters} 
Alcuni contenuti EML contengono caratteri Unicode non validi. Questi sono probabilmente personaggi del set di beneficenza di Windows che sono stati copiati e incollati in modo errato nei file UTF-8 EML. Genera i dati Xml santifica questi caratteri ad esempio,\\[#128 #\\], quindi sono facili da cercare nelERDDAP™ datasets.xmlfile.

Sarebbe bello se l'EML checker lo controllasse. È facile da trovare e facile da risolvere.
    
### Diverse unità di colonna] (#differenteColumnUnits)  {#different-column-unitsdifferentcolumnunits} 
Alcuni dati EMLTables definiscono colonne che sono in contrasto con le colonne nel file di dati, in particolare perché hanno unità diverse. Genera i dati Xml le bandiere. Spetta all'operatore decidere se le differenze vanno bene o no. Questi appaiono nel file di guasti come dati "SKIPPED". EXAMPLE in SBC LTER guasti file:
```
      < SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
       datasetID=knb\\_lter\\_sbc\\_3\\_t1
      dataFile=SBCFC\\_Precip\\_Daily\\_active\\_logger.csv
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        Daily\\_Precipitation\\_Total\\_mm = Daily\\_Precipitation\\_Total\\_inch
        Flag\\_Daily\\_Precipitation\\_Total\\_mm = Flag\\_Daily\\_Precipitation\\_Total\\_inch
      -->
```
Sarebbe bello se l'EML checker controllasse che le unità combaciassero. Sfortunatamente, questo è probabilmente impossibile da catturare e quindi impossibile da risolvere senza contattare il creatore del dataset, dato che il file sorgente non include unità. La discrepanza per l'esempio sopra era evidente solo perché le unità erano incluse nel nome della colonna di origine e nel nome della colonna EML. Quanti altri datiTavole hanno questo problema ma sono inosservabili?
    
### Versioni diverse di EML{#different-versions-of-eml} 
Genera i dati Xml è progettato per lavorare con EML 2.1.1. Altre versioni di EML lavoreranno nella misura in cui corrispondono a 2.1.1 o che GenerateDatasetsXml ha un codice speciale per affrontarlo. E' un problema raro. Quando si verifica, la soluzione è quella di convertire i file in EML 2.1.1, o inviare il file EML inerd.data at noaa.gov, così posso apportare modifiche a GenerateDatasets Xml per affrontare le differenze.

Bob ha aggiunto il supporto per i file EML per GenerateDatasets Xml nel 2016 con la speranza che ci sarebbe qualche assunzione nella comunità EML. A partire dal 2020, non è successo. Bob è felice di aggiungere il supporto per le versioni più recenti di EML, ma solo se le nuove funzionalità saranno effettivamente utilizzati. Si prega di e-mailerd.data at noaa.govse si desidera il supporto per le versioni più recenti di EML e in realtà userà questa funzione.
    
### Problemi di Parsing the Data File{#trouble-parsing-the-data-file} 
Raramente, un datoTable può essere respinto con l'errore "numero non previsto di elementi in linea #120 (osservato=52, atteso=50) " Un messaggio di errore come questo significa che una linea nel file di dati aveva un numero diverso di valori rispetto alle altre linee. Potrebbe essere un problemaERDDAP™  (ad esempio, non analizzare correttamente il file) o nel file. EXAMPLE da SBC LTER:
[ https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/ ](https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/)dataTable #3, vedere datafile=LTER\\_monthly\\_bottledata\\_registered\\_stations\\_20140429.txt
