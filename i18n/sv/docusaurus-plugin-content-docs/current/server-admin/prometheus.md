---
sidebar_position: 9
---
# Prometheus

 [Prometheus Metrics](https://prometheus.io/) finns på /erddap/metri. JVM kärnmätningar tillsattes i 2,25 med många ERDDAP™ mätvärden som läggs till i version 2.26. Om du vill använda mätvärdena se till att du är i minst version 2.26. De standard för att aktivera, du kan inaktivera dem genom att lägga till
```xml
<usePrometheusMetrics>false</usePrometheusMetrics>
```
till din setup.xml.

Dessa mätvärden är utformade för att vara maskinläsbara. Medan du kan kontrollera metrics-sidan manuellt, för djupgående övervakning rekommenderas att du använder en Prometheus-server. En Prometheus-server kommer att lagra historiska mätvärden som möjliggör mer djupgående övervakning (som priser och förändringar från tidigare värden) Och körs ofta med en Grafana-server. Vi tillhandahåller några förbyggda instrumentbrädor som administratörer kan hitta användbara för att komma igång med att övervaka sina servrar.

## Running Prometheus server

Den bästa dokumentationen för att köra övervakningsstapeln (Prometheus + Grafana) finns i Prometheus [Läsme](https://github.com/ERDDAP/erddap/blob/main/docker/prometheus/README.md) .

##  ERDDAP™ Metrics

### JVM

 ERDDAP™ exporterar ett antal mätvärden som du kan hitta användbart (Börjar i ERDDAP™ 2.25) . För allmän övervakning av hälsan hos JVM använder vi de mätvärden som samlats in av Prometheus-klienten. Detta inkluderar data om skräpsamling, minnesanvändning, trådar och mer. För mer information se [Prometheus Java Klient JVM dokumentation](https://prometheus.github.io/client_java/instrumentation/jvm/) .

###  ERDDAP™ specifika

Vi exporterar också ett antal ERDDAP™ specifika mätvärden (Börjar i ERDDAP™ 2.26) . Om du vill gräva i koden kan du hitta de mätvärden som samlas in i [Metrics.java](https://github.com/ERDDAP/erddap/blob/main/WEB-INF/classes/gov/noaa/pfel/erddap/util/Metrics.java) .

####  ERDDAP _build_info

Detta är bygg info för ERDDAP™ Server. Den innehåller version (major.minor) version_full (major.minor.patch) och deployment_info (används för att ange hur servern distribueras, som "Docker ") .

#### _Flags

Detta är en info metrisk som visar det aktuella läget för funktionsflaggor. De flesta booleanska konfigurationsalternativ anses vara funktionsflaggor.

#### Bufferterad Bild

Detta är en info metrisk som indikerar om grafikacceleration är tillgänglig.

####  http _request_duration_seconds

Detta är ett histogram av begäran svar varaktigheter på några sekunder. Etiketterna är request_type (till exempel griddap, tabledap filer, wms) Dataset_id (om tillämpligt, annars upprepar begäran typ) Fil_type (Utgångsformat för begäran t.ex. ".html", ".csv", ".iso19115 ") Lang_code (språk för begäran, eller tom sträng om standard) status_code ( http statuskod för begäran t.ex. 200, 302, 404) .

Detta kan användas för att spåra förfrågningar av dataset id för att bestämma serverns populära dataset. Det kan också hjälpa till att identifiera om det finns särskilda typer av förfrågningar som är långsamma på din server.

#### touch_thread_duration_seconds

Ett histogram av touch tråd uppgift varaktigheter. De är märkta med framgång (sant/falskt) .

#### task_thread_duration_seconds

Ett histogram av uppgiftstrådens varaktigheter. De är märkta med framgång (sant/falskt) och task_type (Intetger) .

#### load_datasets_duration_seconds

Ett histogram av varaktighet för datasetuppgifter. De är märkta med stora (sant/falskt) .

#### email_thread_duration_seconds

Ett histogram av e-posttrådsuppgifter. De är märkta med framgång (sant/falskt) .

#### e_count_distribution

Ett histogram av e-post per uppgift.

#### Dataset_count

En mätning av datamängderna, som anges efter varje laddningsdatamängdssamtal. Detta är märkt med kategori (rutnät, bord) .

#### dataset_failed_load_count

En mätning av datamängderna som misslyckades med att ladda, ställd efter varje laddningsdatamängd.

#### Shed_requests_total

Mottagare av förfrågningar som skedde. Servern kommer att skicka en förfrågan när den tror att servern är låg på minnet. (RAM) och begäran skulle orsaka problem. Detta inkluderar inte förfrågningar om felet på grund av lågt RAM- eller diskutrymme under hanteringen av begäran.

#### far_memory_emails_total

Kontrakt av gånger servern försöker skicka ett e-postmeddelande till admin att minnet är farligt lågt.

#### far_memory_failures_total

Mottagare av förfrågningar som misslyckades på grund av att maskinen gick ur minnet. Ofta beror detta på att maskinen får mycket dyra förfrågningar eller den enskilda begäran var exceptionellt stor.

#### Topo_request_total

Mottagare av förfrågningar om topo-data. Detta är märkt cache (cached/not_cached) .

#### Boundary Counters

Det finns också en samling räknare för förfrågningar om gränser:

 - National_boundaries_request_total
 - State_boundaries_request_total
 - River_boundaries_request_total
 - gshhs_request_total

Dessa är märkta med status (grov, framgång, kastad) .
