---
sidebar_position: 9
---
# Prometheus

 [Prometheus metriske](https://prometheus.io/) er tilgjengelig på /erddap/metri. JVM kjernemålinger ble tilsatt i 2,25 med mange ERDDAP™ metrikk lagt til i versjon 2.26. Hvis du vil bruke metrikkene, må du være i minst versjon 2.26. De standard å aktivere, kan du deaktivere dem ved å legge til
```xml
<usePrometheusMetrics>false</usePrometheusMetrics>
```
til setup.xml.

Disse metrikkene er designet for å være maskinlesbare. Mens du kan sjekke metrikksiden manuelt, anbefales det å bruke en Prometheus-server i dybdeovervåkning. En Prometheus-server vil lagre historiske målinger som muliggjør mer dybdeovervåking (som priser og endringer fra tidligere verdier) , og også ofte kjøres med en Grafana server. Vi tilbyr noen forhåndsbygde dashboards som administratorer kan finne nyttig for å komme i gang med å overvåke sine servere.

## Kjører Prometheus server

Den beste dokumentasjonen for å kjøre overvåkingsstabelen (Prometheus + Grafana) er i Prometheus [readme](https://github.com/ERDDAP/erddap/blob/main/docker/prometheus/README.md) ..

##  ERDDAP™ Metriske

### JVM

 ERDDAP™ eksportere en rekke metrikk som du kan finne nyttig (Starter i ERDDAP™ 2.25) .. For generell overvåking av helsen til JVM bruker vi metrikkene som samles inn av Prometheus-klienten. Dette inkluderer data om søppelinnsamling, minnebruk, tråder og mer. For mer informasjon se [Prometheus Java Kunde JVM dokumentasjon](https://prometheus.github.io/client_java/instrumentation/jvm/) ..

###  ERDDAP™ spesifikk

Vi eksporterer også en rekke ERDDAP™ Spesifikke målinger (Starter i ERDDAP™ 2.26) .. Hvis du vil grave inn i koden, kan du finne metrikkene samlet i [Metrics.java](https://github.com/ERDDAP/erddap/blob/main/WEB-INF/classes/gov/noaa/pfel/erddap/util/Metrics.java) ..

####  ERDDAP _build_info

Dette er byggeinformasjonen til ERDDAP™ server. Det inkluderer versjon (major.minor) , versjon_full (major.minor.patch) , og distribusjon_info (brukt til å angi hvordan serveren er utplassert, som 'Docker \") ..

#### funksjon_flag

Dette er en info metrologi som viser den aktuelle tilstanden av funksjonsflagg. De fleste innstillingsalternativene regnes som funksjonsflagg.

#### bufret Bilde

Dette er en info metrikk som indikerer om grafikkakselerasjon er tilgjengelig.

####  http _Request_duration_sekunder

Dette er et histogram av forespørselsvarvarighet i sekunder. Etikettene er forespørsel_type (f.eks. rutadap, tabledap , filer, wms) , dataset_id (Hvis relevant, ellers gjentar forespørselstypen) , fil_type (Utgangsformat for forespørsel f.eks. «.html», «.csv», «.iso19115 \") , lang_code (språk for forespørselen eller tom streng hvis standard) , status_code ( http statuskode for forespørselen, f.eks. 200, 302, 404) ..

Dette kan brukes til å spore forespørsler fra datasett-ID til å bestemme serverens populære datasett. Det kan også bidra til å identifisere om det er spesielle typer forespørsler som er langsomme på serveren din.

#### touch_thread_duration_sekunder

Et histogram av berøringstråd oppgave varighet. De er merket med suksess (sant/falsk) ..

#### empty_thread_duration_sekunder

Et histogram av oppgavetråd varighet. De er merket med suksess (sant/falsk) og oppgave_type (Intetger) ..

#### Last_datasett_duration_sekunder

Et histogram for varighet for datasett. De er merket med større (sant/falsk) ..

#### email_thread_duration_seconds

Et histogram for e-posttråd oppgave varighet. De er merket med suksess (sant/falsk) ..

#### email_count_distribusjon

Et histogram av e-post per oppgave.

#### dataset_count

En måler av datasettene, satt etter hver lastdatasett ringer. Dette er merket med kategori (rutenett, tabell) ..

#### dataset_failed_load_count

En måler av datasettene som ikke ble lastet, satt etter hvert datasett.

#### castle_requests_total

Counter av forespørsler som ble kastet. Serveren vil kaste en forespørsel når den mener serveren er lavt på minnet (RAM) Forespørselen vil forårsake problemer. Dette inkluderer ikke forespørsler som feil på grunn av lavt RAM- eller diskrom under håndteringen av forespørselen.

#### farlig_minne_emails_total

Counter av ganger serveren prøver å sende en e-post til administratoren om at minnet er farlig lavt.

#### farlig_ memory_failures_total

Counter av forespørsler som mislyktes på grunn av maskinen som løp ut av minnet. Ofte er dette fordi maskinen mottar mange dyre forespørsler eller den enkelte forespørselen var usedvanlig stor.

#### topo_request_total

Forespørsel om topo-data. Dette er merket cache (cached/ikke-kached) ..

#### Grenser

Det er også en samling av tellere for forespørsler om grenser:

 - nasjonal_boundarys_request_total
 - state_boundarys_request_total
 - elve_boundaries_request_total
 - gshhs_request_total

Disse er merket med status (grov, suksess, kastet) ..
