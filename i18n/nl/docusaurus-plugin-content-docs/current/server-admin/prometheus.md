---
sidebar_position: 9
---
# Prometheus

[Prometheus metrics](https://prometheus.io/)beschikbaar zijn op /erddap/metrics. JVM kernmetrics werden toegevoegd in 2.25 met veelERDDAP™metrics toegevoegd in versie 2.26. Als je de metrics wilt gebruiken, zorg dan dat je tenminste versie 2.26 hebt. Ze zijn standaard ingeschakeld, u kunt ze uitschakelen door het toevoegen
```xml
<usePrometheusMetrics>false</usePrometheusMetrics>
```
naar uw setup.xml.

Deze metrics zijn ontworpen om machineleesbaar te zijn. Terwijl u de metrics pagina handmatig kunt controleren, wordt aanbevolen om een Prometheus server te gebruiken voor de dieptebewaking. Een Prometheus server zal historische metrics opslaan die meer diepte monitoring mogelijk maken (zoals tarieven en veranderingen uit het verleden) , en wordt ook vaak uitgevoerd met een Grafana server. Wij bieden een aantal vooraf gebouwde dashboards die admins nuttig kunnen vinden voor het aan de slag controleren van hun servers.

## Uitvoeren van Prometheus-server

De beste documentatie voor het uitvoeren van de monitoring stack (Prometheus + Grafana) is in de Prometheus[leesme](https://github.com/ERDDAP/erddap/blob/main/docker/prometheus/README.md).

## ERDDAP™metrics

### JVM

ERDDAP™exporteert een aantal metrics die u nuttig kunt vinden (beginnend inERDDAP™2,25) . Voor algemene monitoring van de gezondheid van de JVM gebruiken we de door de Prometheus klant verzamelde metrics. Dit omvat gegevens over afvalverzameling, geheugengebruik, threads en meer. Voor meer informatie zie de[PrometheusJavaClient JVM documentatie](https://prometheus.github.io/client_java/instrumentation/jvm/).

### ERDDAP™specifiek

Wij exporteren ook een aantalERDDAP™specifieke maatstaven (beginnend inERDDAP™2,26) . Als je wilt graven in de code, kunt u de statistieken verzameld in[Metrics.java](https://github.com/ERDDAP/erddap/blob/main/WEB-INF/classes/gov/noaa/pfel/erddap/util/Metrics.java).

#### ERDDAP_Build_info

Dit is de bouw info voor deERDDAP™server. Het bevat versie (major.minor) , versie_volledig (major.minor.patch) , en deployment_info (gebruikt om aan te geven hoe de server wordt ingezet, zoals 'Docker ') .

#### feature_vlaggen

Dit is een info metriek die de huidige status van feature vlaggen toont. De meeste booleaanse configuratie opties worden beschouwd als functie vlaggen.

#### gebufferd Afbeelding

Dit is een informatie metriek die aangeeft of grafische acceleratie beschikbaar is.

#### http_Aanvragen_duur_seconden

Dit is een histogram van de responsduur in seconden. De labels zijn request_type (bijvoorbeeld griddap,tabledap, bestanden, wms) , dataset_id (indien van toepassing, herhaalt het verzoektype anders) , bestand_type (uitvoerformaat voor verzoek bv. '.html', '.csv', '.iso19115' ') , lang_code (taal voor het verzoek, of lege tekenreeks indien standaard) , status_code (httpstatuscode van het verzoek bv. 200, 302, 404) .

Dit kan worden gebruikt om verzoeken te volgen door dataset id om de populaire datasets van de server te bepalen. Het kan ook helpen identificeren als er bepaalde soorten verzoeken die traag zijn op uw server.

#### touch_thread_duration_seconden

Een histogram van touch thread taakduur. Ze worden gekenmerkt met succes (waar/onwaar) .

#### taak_thread_duration_seconden

Een histogram van taak draad duurt. Ze worden gekenmerkt met succes (waar/onwaar) en taak_type (intetger) .

#### load_datasets_duration_seconden

Een histogram van de duur voor taken met dataset. Ze zijn geëtiketteerd met grote (waar/onwaar) .

#### e-mail_thread_duration_seconden

Een histogram van e-mail draad taak duur. Ze worden gekenmerkt met succes (waar/onwaar) .

#### e-mail_count_distributie

Een histogram van e-mails per taak.

#### dataset_count

Een meter van de datasets, ingesteld na elke load datasets oproep. Dit wordt gekenmerkt met categorie (raster, tabel) .

#### dataset_failed_load_count

Een meter van de datasets die niet geladen konden worden, ingesteld na elke load datasets oproep.

#### schuur_verzoeken_totaal

Tegenstand tegen verzoeken die zijn afgewezen. De server zal een verzoek indienen wanneer hij gelooft dat de server weinig geheugen heeft (RAM) en het verzoek zou problemen veroorzaken. Dit omvat geen verzoeken die fout te wijten aan lage RAM of schijfruimte tijdens de behandeling van het verzoek.

#### gevaarlijk_geheugen_emails_totaal

Teller van keren dat de server probeert om een e-mail te sturen naar de admin dat geheugen gevaarlijk laag is.

#### gevaarlijk_memory_faillures_totaal

Counter van verzoeken die mislukt als gevolg van de machine raakt zonder geheugen. Vaak is dit omdat de machine ontvangt veel dure verzoeken of de individuele aanvraag was uitzonderlijk groot.

#### topo_request_totaal

Teller van verzoeken om topo-gegevens. Dit is gelabeld cache (gecached/not_cached) .

#### Grenzentellers

Er is ook een verzameling tellers voor verzoeken om grenzen:

 - nationale_grenzen_verzoek_totaal
 - status_grenzen_verzoek_totaal
 - rivier_grenzen_verzoek_totaal
 - gshhs_request_totaal

Deze zijn gemarkeerd met status (grof, succes, weggegooid) .
