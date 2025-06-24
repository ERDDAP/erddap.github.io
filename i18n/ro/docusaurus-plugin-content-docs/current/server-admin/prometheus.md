---
sidebar_position: 9
---
# Prometeu

[Prometheus metrics](https://prometheus.io/)sunt disponibile la /erddap/metrice. Parametrii de bază JVM au fost adăugați în 2.25 cu mulțiERDDAP™valorile adăugate în versiunea 2.26. Dacă doriți să utilizați indicatorii asigurați-vă că sunteți în cel puțin versiunea 2.26. Ei implicit pentru a activa, le puteți dezactiva prin adăugarea
```xml
<usePrometheusMetrics>false</usePrometheusMetrics>
```
la setup.xml.

Aceste indicatori sunt concepute pentru a fi ușor de citit. În timp ce puteți verifica manual pagina de indicatori, pentru monitorizarea în profunzime este recomandat să utilizați un server Prometeu. Un server Prometheus va stoca indicatori istorici care permit o monitorizare mai profundă (cum ar fi ratele și modificările față de valorile anterioare) , și, de asemenea, este de multe ori rula cu un server Grafana. Noi oferim unele borduri de bord prebuilt care admins ar putea găsi util pentru a începe monitorizarea serverelor lor.

## Rulează serverul Prometeu

Cea mai bună documentație pentru funcționarea stiva de monitorizare (Prometeu + Grafana) este în Prometheus[readme](https://github.com/ERDDAP/erddap/blob/main/docker/prometheus/README.md).

## ERDDAP™Indicatori

### JVM

ERDDAP™exportă o serie de indicatori pe care le-ar putea găsi utile (începând cuERDDAP™2, 25) . Pentru monitorizarea generală a stării de sănătate a JVM folosim indicatorii colectaţi de clientul Prometheus. Acest lucru include date despre colectarea gunoiului, utilizarea memoriei, fire, și mai mult. Pentru mai multe informații, a se vedea[PrometeuJavaDocumentația JVM a clientului](https://prometheus.github.io/client_java/instrumentation/jvm/).

### ERDDAP™specific

De asemenea, exportăm o serie deERDDAP™indicatori specifici (începând cuERDDAP™2, 26) . Dacă doriți să sape în codul, puteți găsi valorile colectate în[Metrics.java](https://github.com/ERDDAP/erddap/blob/main/WEB-INF/classes/gov/noaa/pfel/erddap/util/Metrics.java).

#### ERDDAP_build_info

Aceasta este informaţia de construcţie pentruERDDAP™server. Include versiunea (major. minor) , versiunea_plină (major.minor.patch) , și implementarea_info (folosit pentru a indica modul în care serverul este implementat, cum ar fi 'Docker ') .

#### feature_flags

Acesta este un indicator informativ care arată starea actuală a steagurilor caracteristicilor. Cele mai multe opțiuni de configurare boolean sunt considerate steaguri caracteristică.

#### tamponat Imagine

Acesta este un metric info care indică dacă accelerația grafică este disponibilă.

#### http_Cere_durata_secunde

Aceasta este o histogramă a duratei de răspuns la cerere în câteva secunde. Etichetele sunt de tip cerere_tip (de exemplu griddap;tabledap, fișiere, wMS) , Set de date_id (dacă este cazul, repetă altfel tipul de cerere) , fișier_tip (Formatul de ieșire pentru cerere de exemplu "html," "csv," ".iso19115 ') , lang_cod (limba pentru cerere sau șirul gol dacă este implicit) , status_code (httpcodul de stare al cererii, de exemplu 200, 302, 404) .

Acest lucru poate fi folosit pentru a urmări cererile prin set de date pentru a determina setările de date populare ale serverului. De asemenea, poate ajuta la identificarea dacă există anumite tipuri de cereri care sunt lente pe server.

#### Atingerea_fire_durate_secunde

O histogramă de durate de sarcină tactil fir. Sunt etichetate cu succes. (adevărat/fals) .

#### sarcina_firul_durata_secunde

O histogramă de durate ale firului de sarcină. Sunt etichetate cu succes. (adevărat/fals) și task_type (intetger) .

#### incarcare_seturi de date_durata_secunde

O histogramă a duratei sarcinilor setului de sarcini. Acestea sunt etichetate cu majore (adevărat/fals) .

#### e-mail_fire_durate_secunde

O histogramă a duratei sarcinii firului de e-mail. Sunt etichetate cu succes. (adevărat/fals) .

#### e-mail_conte_distribution

O histogramă de e-mailuri pe sarcină.

#### Set_număr

Un indicator al seturilor de date, setat după fiecare apel de seturi de sarcini. Aceasta este etichetată cu categoria (grilă, tabel) .

#### Set de date_eșec_load_conte

Un indicator al seturilor de date care nu au putut fi încărcate, setat după fiecare apel al seturilor de date privind încărcătura.

#### Spot_cere_total

Contracararea cererilor care au fost vărsate. Serverul va pune o cerere atunci când crede că serverul este scăzut pe memorie (RAM) iar cererea ar cauza probleme. Aceasta nu include cererile de eroare din cauza spațiului RAM scăzut sau disc în timpul manipulării cererii.

#### periculos_memory_emails_total

Counter de ori serverul încearcă să trimită un e-mail la admin că memoria este periculos de scăzut.

#### periculos_memorie_eșec_total

Counter de cereri care nu a reușit din cauza mașinii care rulează afară din memorie. De multe ori acest lucru se datorează faptului că aparatul primește o mulțime de cereri scumpe sau cererea individuală a fost excepțional de mare.

#### topo_cerere_total

Counter of requests for topo data. Acest lucru este etichetat cache (Cache/nu_cached) .

#### Contoare hotarare

Există, de asemenea, o colecție de contoare pentru cereri de limite:

 - national_boundary_request_total
 - stat_frontiere_cerere_total
 - river_boundary_request_total
 - gshhs_request_total

Acestea sunt etichetate cu statut (grosolan, succes, aruncat) .
