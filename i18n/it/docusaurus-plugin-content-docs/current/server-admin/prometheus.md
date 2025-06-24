---
sidebar_position: 9
---
# Prometeo

[metriche di Prometheus](https://prometheus.io/)sono disponibili a /erddap/metrics. Le metriche di base JVM sono state aggiunte in 2,25 con moltiERDDAP™metriche aggiunte nella versione 2.26. Se si desidera utilizzare le metriche assicurarsi di essere in almeno versione 2.26. Essi di default per abilitare, è possibile disattivarli aggiungendo
```xml
<usePrometheusMetrics>false</usePrometheusMetrics>
```
al tuo setup.xml.

Queste metriche sono progettate per essere leggibili in macchina. Mentre è possibile controllare manualmente la pagina delle metriche, per il monitoraggio in profondità si consiglia di utilizzare un server Prometheus. Un server Prometheus memorizza metriche storiche che consentono un monitoraggio più approfondito (come i tassi e i cambiamenti dei valori passati) , e anche è spesso eseguito con un server Grafana. Forniamo alcune dashboard precostruite che gli amministratori possono trovare utili per iniziare a monitorare i loro server.

## Eseguire il server Prometheus

La migliore documentazione per eseguire lo stack di monitoraggio (Prometeo + Grafana) è nel Prometeo[lettura](https://github.com/ERDDAP/erddap/blob/main/docker/prometheus/README.md).

## ERDDAP™metriche

### JVM

ERDDAP™esporta una serie di metriche che si possono trovare utili (a partire daERDDAP™2.25) . Per il monitoraggio generale della salute del JVM utilizziamo le metriche raccolte dal client Prometheus. Questo include i dati sulla raccolta rifiuti, l'uso della memoria, i fili e altro ancora. Per maggiori informazioni vedere[PrometeoJavaDocumentazione client JVM](https://prometheus.github.io/client_java/instrumentation/jvm/).

### ERDDAP™specifico

Esportiamo anche un certo numero diERDDAP™metriche specifiche (a partire daERDDAP™2.26) . Se si desidera scavare nel codice, è possibile trovare le metriche raccolte in[Metrics.java](https://github.com/ERDDAP/erddap/blob/main/WEB-INF/classes/gov/noaa/pfel/erddap/util/Metrics.java).

#### ERDDAP_build_info

Questa è l'informazione di costruzione perERDDAP™server. Include la versione (major.minor) , versione_full (major.minor.patch) , e la distribuzione_info (usato per indicare come il server viene distribuito, come 'Docker ') .

#### caratteristiche_flags

Questa è una metrica di informazioni che mostra lo stato attuale delle bandiere di caratteristica. La maggior parte delle opzioni di configurazione booleana sono considerate bandiere di caratteristica.

#### bufferizzato Immagine

Questa è una metrica di info che indica se l'accelerazione grafica è disponibile.

#### http_request_duration_seconds

Questo è un istogramma di durata di risposta richiesta in pochi secondi. Le etichette sono request_type (per esempio grigliadap,tabledap, file, wms) , dataset_id (se applicabile, altrimenti ripete il tipo di richiesta) , file_type (formato di uscita per richiesta ad esempio '.html', '.csv', '.iso19115 ') , lang_code (lingua per la richiesta, o stringa vuota se predefinita) , status_code (httpcodice di stato della richiesta ad esempio 200, 302, 404) .

Questo può essere utilizzato per monitorare le richieste da dataset id per determinare i set di dati popolari del server. Può anche aiutare a identificare se ci sono particolari tipi di richieste che sono lente sul server.

#### touch_thread_duration_seconds

Un istogramma di durata del compito del thread touch. Sono etichettati con successo (vero/falso) .

#### task_thread_duration_seconds

Un istogramma di durata del thread di compito. Sono etichettati con successo (vero/falso) e task_type (Integer) .

#### load_datasets_duration_seconds

Un istogramma di durata per le attività di dataset di carico. Sono etichettate con il maggiore (vero/falso) .

#### email_thread_duration_seconds

Un istogramma di durata delle attività del thread di posta elettronica. Sono etichettati con successo (vero/falso) .

#### email_count_distribution

Un istogramma di e-mail per compito.

#### dataset_count

Un indicatore dei set di dati, impostato dopo ogni chiamata dataset di carico. Questo è etichettato con la categoria (griglia, tavolo) .

#### dataset_failed_load_count

Un indicatore dei set di dati che non sono riusciti a caricare, impostare dopo ogni chiamata dataset di carico.

#### capannone_requests_total

Contatore di richieste che sono state sparse. Il server perderà una richiesta quando ritiene che il server sia basso sulla memoria (RAM) e la richiesta causerebbe problemi. Questo non include richieste di errore dovute a bassa RAM o spazio su disco durante la gestione della richiesta.

#### pericoloso_memory_emails_total

Contro di volte il server tenta di inviare un'e-mail all'amministratore che la memoria è pericolosamente bassa.

#### pericoloso_memory_failures_total

Contatore di richieste che non sono riuscite a causa della macchina che esce dalla memoria. Spesso questo è perché la macchina sta ricevendo un sacco di richieste costose o la richiesta individuale era eccezionalmente grande.

#### topo_request_totale

Contatore delle richieste di dati di topo. Questa è la cache etichettata (memorizzato/non registrato) .

#### Controversie Boundary

C'è anche una raccolta di contatori per richieste di confini:

 - Nazionali_produzioni_totale
 - State_boundaries_request_total
 - River_boundaries_request_total
 - gshhs_request_total

Questi sono etichettati con lo stato (grossolano, successo, gettato) .
