Questo contenuto si basa su un [messaggio da Roy Mendelssohn a ERDDAP utenti di gruppo](https://groups.google.com/g/erddap/c/6Hl024ZGkes/m/DS5WzsydAQAJ) .

 ERDDAP™ cerca di essere agnostico su quali formati di dati le persone utilizzano per i loro dati, cercando invece di lavorare con i formati di dati di maggior uso alle comunità che serviamo principalmente. Poiché sempre più lavoro è nel cloud, e ci sono una pletora di formati di dati che le persone utilizzano nel cloud, sarebbe bello se ERDDAP™ potrebbe supportare molti di questi formati. Ahi&#33; ERDDAP™ lo sviluppo e la manutenzione è già soppresso, e ciò che sarebbe auspicabile è fare uso del lavoro di altri per raggiungere questo obiettivo, senza dover modificare ERDDAP™ .

Inserisci [DuckDB](https://duckdb.org/) e [Trino](https://trino.io/) . Entrambi forniscono connessioni a una varietà di formati di dati e possono essere accessibili tramite JDBC. In questa scrittura guarderò solo l'uso di DuckDB perché ho una certa familiarità con esso, e Trino almeno alla mia mente, sembrava un po 'più complicato da configurare, e in questo momento volevo solo una prova di concetto. (Un po' indietro Damien Smythe aveva scritto che aveva sossed come usare Trino e l'ho contattato e l'ha fatto arrivare al lavoro e mi manderà note - così più su questo in futuro) . Anche io sono altro che un esperto su qualsiasi di questo, quindi questo sta imparando con me - fatemi sapere se trovate errori, o cose che non sono chiare, o se ci sono modi migliori di fare le cose.

1. Pregiudiziale:
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

Per utilizzare DuckDB in ERDDAP™ è necessario installare paperDB sul computer e installare il connettore DuckDB JDBC ERDDAP™ . Istruzioni per l'installazione DuckDB stesso sono a

https://duckdb.org/docs/installation/?version=stable&environment=cli&platform=macos&download_method=direct

Il connettore DuckDB JDBC può essere scaricato da

https://duckdb.org/docs/stable/clients/java.html

Se il tuo tomcat si trova a $TOMCAT_HOME, allora si desidera inserire questo file a $TOMCAT_HOME/webapps/erddap/WEB-INF/lib.

2. Cosa rende questo difficile:
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————


Almeno per DuckDB (come ho detto non ho guardato Trino in alcun dettaglio)   Java i programmi possono accedere solo a DuckDB attraverso il connettore JDBC, e il connettore JDBC può solo leggere i dati che vengono memorizzati nel formato DuckDB .db. Mentre DuckDB è un grande strumento, dovendo copiare i dati a questo formato sconfigge l'intero scopo, Tuttavia, DuckDB fornisce la struttura che per molti dei formati di file supporta (c'è una lista crescente di estensioni) è possibile impostare un file .db virtuale che legge solo nei metadati necessari. Ho trovato il .db che è creato per essere abbastanza piccolo in dimensioni, e fornisce ciò che sembra essere accesso veloce. Una nota interessante è che a differenza della maggior parte dei sistemi di database (e compreso Trino) con Duck DB non si dispone di un'applicazione che è costantemente in esecuzione in background, quindi ci deve essere qualche ritardo nell'accesso a causa dell'avvio, ma come ho detto nei miei piccoli test l'accesso sembra veloce.


3. Un semplice esempio:
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

Per iniziare, guarderò come farlo con un file .csv. Corretto, questo non è così interessante di un caso di utilizzo come ERDDAP™ già gestisce i file .csv abbastanza bene, quindi nulla viene guadagnato in quel senso, ma un file di testo è più facile da lavorare con e debug nel vedere che cosa sta succedendo, e come stavo imparando questo ha reso la mia vita più facile. Qui di seguito guarderò un caso di uso più interessante una volta che vediamo ciò che è necessario.

Il file con cui sto lavorando è chiamato “detects.csv” che è un file 305MB di rilevamento dei tag da sensori. Il primo passo è creare un file .db che punta a questo file (in questo e ciò che segue per convenienza presumo che si sta lavorando al livello necessario in modo da non dare percorsi completi - in pratica si dovrà) :

```
duckdb detects.db <<EOF
CREATE VIEW detects_table AS
SELECT *
FROM read_csv_auto(
'detects.csv',
header=true,
sample_size=2147483647 -- scan whole file for schema (optional)
);
EOF
```

Il file “detects.db” è 268KB di dimensione. Possiamo verificare che questo abbia effettivamente funzionato:

```
duckdb detects.db
DuckDB v1.3.1 (Ossivalis) 2063dda3e6
Enter ".help" for usage hints.
D SHOW TABLES;
┌───────────────┐
│ name │
│ varchar │
├───────────────┤
│ detects_table │
└───────────────┘
D SELECT * FROM detects_table LIMIT 5;
┌────────────────┬─────────┬──────────────┬───────┬──────────┬───┬──────────┬──────────────┬───────────────┬─────────┐
│ Study_ID │ TagCode │ DateTime_PST │ recv │ location │ … │ tag_life │ Rel_latitude │ Rel_longitude │ time │
│ varchar │ varchar │ timestamp │ int64 │ varchar │ │ int64 │ double │ double │ varchar │
├────────────────┼─────────┼──────────────┼───────┼──────────┼───┼──────────┼──────────────┼───────────────┼─────────┤
│ ButteSink_2024 │ 1B76 │ NULL │ NULL │ NULL │ … │ 52 │ 39.32663 │ -121.8847 │ -08 │
│ ButteSink_2024 │ 1B94 │ NULL │ NULL │ NULL │ … │ 52 │ 39.32663 │ -121.8847 │ -08 │
│ ButteSink_2024 │ 1BA5 │ NULL │ NULL │ NULL │ … │ 52 │ 39.35858 │ -121.8943 │ -08 │
│ ButteSink_2024 │ 1C55 │ NULL │ NULL │ NULL │ … │ 52 │ 39.33546 │ -121.8923 │ -08 │
│ ButteSink_2024 │ 1C95 │ NULL │ NULL │ NULL │ … │ 52 │ 39.33546 │ -121.8923 │ -08 │
├────────────────┴─────────┴──────────────┴───────┴──────────┴───┴──────────┴──────────────┴───────────────┴─────────┤
│ 5 rows 18 columns (9 shown) │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

e la dimensione di rileva. db non è cambiato dal fare questa operazione. Quindi il passo finale è quello di collegare questo con ERDDAP™ , mostro solo la parte necessaria per connettersi al file, non tutte le informazioni variabili:

```
<dataset type="EDDTableFromDatabase" datasetID="duckdb_test" active="true">
<!-- JDBC Connection Details -->
<sourceUrl>jdbc:duckdb:detects.db</sourceUrl>
<driverName>org.duckdb.DuckDBDriver</driverName>
<catalogName></catalogName>
<schemaName></schemaName>
<tableName>detects_table</tableName>
<columnNameQuotes></columnNameQuotes>
>
```

E questo è il dataset in un ERDDAP™ sul mio computer portatile utilizzando il connettore DuckDB:
