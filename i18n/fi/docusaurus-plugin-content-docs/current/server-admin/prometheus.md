---
sidebar_position: 9
---
# Prometheus

 [Prometheus metriikka](https://prometheus.io/) Saatavilla osoitteessa /erddap/metrics. JVM:n ydinmittarit lisättiin 2,25:een. ERDDAP™ Lisätty versiossa 2.26. Jos haluat käyttää mittareita, varmista, että olet vähintään versiossa 2.26. Ne ovat oletusarvoisia, voit poistaa ne lisäämällä
```xml
<usePrometheusMetrics>false</usePrometheusMetrics>
```
Teidän asennus.xml.

Nämä mittarit on suunniteltu koneellisesti luettavaksi. Vaikka voit tarkistaa mittaussivun manuaalisesti, syvän seurannan vuoksi on suositeltavaa käyttää Prometheus-palvelinta. Prometheus-palvelin tallentaa historiallisia mittareita, joiden avulla voidaan seurata syvemmin. (Aiempien arvojen muutokset ja hinnat) Usein myös Grafana-palvelimella. Tarjoamme joitain esivalmistettuja kojetauluja, joita hallinnoijat voivat käyttää palvelimiensa seurantaan.

## Prometheus-palvelin

Parhaat dokumentit seurantaan (Prometheus + Grafana) on Prometheuksessa [Lukeminen](https://github.com/ERDDAP/erddap/blob/main/docker/prometheus/README.md) .

##  ERDDAP™ Metriikka

### JVM

 ERDDAP™ Vie useita mittareita, joista voi olla hyötyä (Aloitetaan ERDDAP™ 2.25) . JVM:n terveyden yleisessä seurannassa käytetään Prometheus-asiakkaan keräämiä mittareita. Tämä sisältää tietoja roskapostien keräämisestä, muistin käytöstä, langoista ja muista. Lisätiedot näkevät [Prometheus Java Asiakas JVM-dokumentointi](https://prometheus.github.io/client_java/instrumentation/jvm/) .

###  ERDDAP™ Erityistä erityistä

Viemme myös useita ERDDAP™ Erityiset mittarit (Aloitetaan ERDDAP™ 2.26) . Jos haluat kaivaa koodiin, löydät mittarit, jotka on kerätty [Metrics.java](https://github.com/ERDDAP/erddap/blob/main/WEB-INF/classes/gov/noaa/pfel/erddap/util/Metrics.java) .

####  ERDDAP Rakennettu_info

Tämä on rakentamisen infoa ERDDAP™ palvelin. Sisältää version (Pääartikkeli: Minor) versio_full (Pääartikkeli: Minor.patch) Käyttöönotto_info (käytetään osoittamaan, miten palvelin on otettu käyttöön, kuten Docker """) .

#### Esiintyjät: Flags

Tämä on infomittari, joka näyttää nykyisen ominaisuuslipun. Useimpia booleelaisia kokoonpanovaihtoehtoja pidetään lippuina.

#### Puskuri Kuvat

Tämä on infomittari, joka osoittaa, onko grafiikka kiihtyvyys käytettävissä.

####  http _request_duration_seconds Näytä tarkat tiedot

Tämä on histogrammi pyynnön vastauksen kesto sekunneissa. Etiketit ovat pyynnön_tyyppisiä (esimerkiksi griddap, tabledap tiedostoja, wms) Dataset_id (soveltuvin osin toistaa pyynnön tyyppi) tiedosto_type (Tuotantomuoto pyyntöön .html, .csv, .iso19115 """) Lang_code (pyynnön kieli tai tyhjä kieli, jos oletus) Tila_koodi ( http Pyynnön tilakoodi: 200, 302, 404) .

Tätä voidaan käyttää pyyntöjen seuraamiseen tietoaineiston id avulla palvelimen suosittujen tietoaineistojen määrittämiseksi. Se voi myös auttaa tunnistamaan, onko palvelimellasi hitaita pyyntöjä.

#### Kosketus_thread_duration_seconds

Histogram of touch thread -tehtävän kesto. Ne on merkitty menestyksellä (Todellinen/väärä) .

#### Tehtävä_thread_duration_seconds

Tehtävän keston histogrammi. Ne on merkitty menestyksellä (Todellinen/väärä) Tehtävä_type (Integroitu) .

#### Lataa_datasets_duration_seconds

Histogrammi kuorma-aineiston tehtäviin. Ne on merkitty suurilla (Todellinen/väärä) .

#### Sähköposti_thread_duration_seconds

Histogrammi sähköpostin thread-tehtävien kestosta. Ne on merkitty menestyksellä (Todellinen/väärä) .

#### Sähköposti_count_jakelu

Sähköpostien histogrammi per tehtävä.

#### tietoja_count

Tietoaineistojen mittari, joka on määritetty kunkin lataustietoaineiston soituksen jälkeen. Tämä on merkitty kategorialla (Verkko, pöytä) .

#### tietoja_failed_load_count

aineistot, jotka eivät latautuneet, asetetaan kunkin latausaineiston puhelun jälkeen.

#### _ _ _ Total

pyyntöihin, jotka on jätetty. Palvelin luovuttaa pyynnön, kun se uskoo palvelimen olevan alhainen muistissa. (Ram) Pyyntö aiheuttaa ongelmia. Tämä ei sisällä pyyntöjä, jotka johtuvat alhaisesta RAM- tai levytilasta pyynnön käsittelyn aikana.

#### vaarallinen_memory_emails_total

Toisinaan palvelin yrittää lähettää sähköpostia järjestelmänvalvojalle, että muisti on vaarallisen alhainen.

#### Vaarallinen_muisti_failures_total

Vastaus pyyntöihin, jotka epäonnistuivat, koska kone loppui muistista. Usein tämä johtuu siitä, että kone saa paljon kalliita pyyntöjä tai yksittäinen pyyntö oli poikkeuksellisen suuri.

#### Topo_request_total

Topo-tietopyyntöjen vastainen. Tämä on merkitty salasana (Cached/not_cached) .

#### Rajojen vastaiset

Rajoja koskevia pyyntöjä on myös kerätty:

 - Kansallinen_boundaries_request_total
 - State_boundaries_request_total
 - River_boundaries_request_total
 - Gshhs_request_total Näytä tarkat tiedot

Nämä on merkitty status (Karhu, menestys, heitto) .
