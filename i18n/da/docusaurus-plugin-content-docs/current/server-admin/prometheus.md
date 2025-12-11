---
sidebar_position: 9
---
# I nærheden af Prometheus

 [Prometheus metrics](https://prometheus.io/) er tilgængelig på /erddap/metrics. JVM kernemålinger blev tilføjet i 2.25 med mange ERDDAP™ metrics tilføjet i version 2.26. Hvis du vil bruge metrics, skal du sørge for, at du er i mindst version 2.26. De kan som standard deaktivere dem ved at tilføje
```xml
<usePrometheusMetrics>false</usePrometheusMetrics>
```
til din opsætning.xml.

Disse metrics er designet til at være maskinlæsbar. Mens du kan kontrollere metrics-siden manuelt, anbefales det at bruge en Prometheus-server. En Prometheus-server vil gemme historiske metrics, som gør det muligt for mere i dybdeovervågning (som priser og ændringer fra tidligere værdier) , og kører ofte med en Grafana-server. Vi leverer nogle foruddefinerede dashboards, som administratorer kan finde nyttige til at få startet overvågning af deres servere.

## Kør Prometheus server

Den bedste dokumentation for at køre overvågningstabellen (Prometheus + Grafana) er i Prometheus [readme](https://github.com/ERDDAP/erddap/blob/main/docker/prometheus/README.md) .

##  ERDDAP™ metrics

### JVM

 ERDDAP™ eksporterer en række målinger, som du kan finde nyttige (begyndende i starten ERDDAP™ 2.25) . For generel overvågning af JVMs sundhed bruger vi de metrics indsamlet af Prometheus-klienten. Dette omfatter data om affaldsopsamling, hukommelsesforbrug, tråde og mere. For flere oplysninger se oplysningerne [I nærheden af Prometheus Java Klient JVM dokumentation](https://prometheus.github.io/client_java/instrumentation/jvm/) .

###  ERDDAP™ specifikke specifikke specifikke specifikke

Vi eksporterer også en række ERDDAP™ specifikke målinger (begyndende i starten ERDDAP™ 2.26) . Hvis du vil grave ind i koden, kan du finde de metrics indsamlet i [Metrics.java](https://github.com/ERDDAP/erddap/blob/main/WEB-INF/classes/gov/noaa/pfel/erddap/util/Metrics.java) .

####  ERDDAP _build_info

Dette er byggeinfo for byggepladsen ERDDAP™ server. Den indeholder version (store.minor) , version_full (store.minor.patch) , og implementering_info (Bruges til at angive, hvordan serveren er indsat, som "Docker '') .

#### funktion_flags

Dette er en info metric, der viser den aktuelle tilstand af trækflag. De fleste boolean konfigurations indstillinger betragtes som trækflag.

#### buffered Billedbillede

Dette er en info metric, der angiver, om grafikacceleration er tilgængelig.

####  http _request_duration_kunder

Dette er et histogram af anmodning svar varigheder på få sekunder. Etiketterne er anmodning_type (for eksempel gitterdap, tabledap , filer, wms) , datasæt_id (hvis det er relevant, ellers gentager anmodningstype) , filtype (outputformat til anmodning f.eks. '.html', '.csv', '.iso19115 '') , lang_code (sprog for anmodning, eller tom streng, hvis standard) , status_code ( http Statuskode for anmodningen f.eks. 200, 302, 404) .

Dette kan bruges til at spore anmodninger fra datasæt id for at afgøre serverens populære datasæt. Det kan også hjælpe med at identificere, om der er særlige former for anmodninger, der er langsom på din server.

#### touch_thread_duration_kunder

En histogram af touch tråd opgave varighed. De er præget af succes (sand/false) .

#### opgave_thread_duration_kunder

En histogram af opgavetråd varighed. De er præget af succes (sand/false) og opgave_type (Begrænsninger) .

#### belastning_datasets_duration_kunders

Et histogram af varighed for belastning af datasæt opgaver. De er mærket med store (sand/false) .

#### e-mail_thread_duration_kunder

En histogram af e-mail tråd opgave varighed. De er præget af succes (sand/false) .

#### e-mail_count_distribution

Et histogram af e-mails pr. opgave.

#### Datasæt_count

En måling af datasæt, sæt efter hver belastning datasæt opkald. Dette er præget af kategori (gitter, bord) .

#### Dataset_failed_load_count

En gauge af de datasæt, der mislykkedes at indlæse, sæt efter hver belastning datasæt opkald.

#### I nærheden af sku_requests_total

Mod af anmodninger, der blev kastet. serveren vil miste en anmodning, når den mener, at serveren er lav på hukommelse (RAM) og anmodningen ville forårsage problemer. Dette omfatter ikke anmodninger, der fejl skyldes lav RAM eller diskplads under håndtering af anmodningen.

#### farlig_memory_emails_total

Counter af tider serveren forsøger at sende en e-mail til den administrator, at hukommelsen er farlig lav.

#### farlig_memory_failures_total

Counter af anmodninger, der mislykkedes på grund af maskinen, der kører ud af hukommelse. Ofte er dette, fordi maskinen modtager en masse dyre anmodninger eller den enkelte anmodning var usædvanligt stor.

#### Flyrejser tilpo_request_total

Modsat anmodninger om topo data. Dette er markeret cache (cached / ikke_cached) .

#### Grænseløs tællere

Der er også en samling af tællere til anmodninger om grænser:

 - National_boundaries_request_total
 - Stats_boundaries_request_total
 - Flok_boundaries_request_total
 - Gshhs_request_total

Disse er markeret med status (groft, succes, tosed) .
