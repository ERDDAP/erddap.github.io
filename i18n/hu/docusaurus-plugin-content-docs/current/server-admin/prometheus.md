---
sidebar_position: 9
---
# Prometheus

 [Prometheus metrikák](https://prometheus.io/) rendelkezésre állnak /erddap / metrikus. A JVM alapmérőit 2,25-ben adták hozzá, sok ERDDAP™ a 2.26-os verzióban hozzáadott metrikák. Ha a metrikusokat szeretné használni, győződjön meg róla, hogy legalább 2.26 verzióban van. Alapértelmezettek, hogy lehetővé tegyék, tilthatjátok őket azzal, hogy hozzáadjátok őket.
```xml
<usePrometheusMetrics>false</usePrometheusMetrics>
```
a setup.xml.

Ezeket a metrikákat úgy tervezték, hogy géppel olvashatók legyenek. Bár manuálisan ellenőrizheti a metrikus oldalt, a mélység ellenőrzése érdekében ajánlott egy Prometheus szerver használatára. A Prometheus szerver történelmi metrikákat tárol, amelyek lehetővé teszik a mélység ellenőrzését (mint az árak és a múltbeli értékek változásai) És gyakran fut egy Grafana szerverrel. Biztosítunk néhány előépített dashboardokat, amelyek az adminok hasznosak lehetnek a szervereik megkezdéséhez.

## Futás Prometheus szerver

A legjobb dokumentáció a monitoring csomag működtetéséhez (Prometheus + Grafana) a Prometheusban van [olvasó](https://github.com/ERDDAP/erddap/blob/main/docker/prometheus/README.md) ...

##  ERDDAP™ metrikák

### JVM

 ERDDAP™ számos metrikát exportál, amelyeket hasznosnak találhat (Kezdőlap ERDDAP™ 2.25) ... A JVM egészségének általános figyelemmel kísérésére a Prometheus ügyfél által gyűjtött metrikákat használjuk. Ez magában foglalja a szemétgyűjtésről, a memóriafelhasználásról, a szálakról és még többet. További információkért lásd: [Prometheus Java Ügyfél JVM dokumentáció](https://prometheus.github.io/client_java/instrumentation/jvm/) ...

###  ERDDAP™ specifikus

Többet is exportálunk ERDDAP™ konkrét metrikák (Kezdőlap ERDDAP™ 2.26) ... Ha bele akarsz ásni a kódba, megtalálhatod a begyűjtött metrikákat [Metrics.java](https://github.com/ERDDAP/erddap/blob/main/WEB-INF/classes/gov/noaa/pfel/erddap/util/Metrics.java) ...

####  ERDDAP _build_info

Ez az építési információ a ERDDAP™ szerver. Tartalmazza a verziót (fő.minor) , verzió_full (fő.minor.patch) , és telepítés_info (jelzi, hogy a szerver hogyan telepítve van, mint a "Docker" "...") ...

#### funkció_ zászlók

Ez egy információs metrika, amely megmutatja a jelenlegi jellemző zászlók állapotát. A legtöbb boolean konfigurációs lehetőség jellemző zászlónak tekinthető.

#### puffadt Képek

Ez egy információs metrika, amely azt jelzi, hogy a grafikai gyorsulás elérhető-e.

####  http _request_duration_ másodpercek

Ez egy titokzatos kérelemre válaszidő másodpercekben. A címkék kérelem_típus (például griddap, tabledap , fájlok, wms) , adatset_id (ha alkalmazható, egyébként megismétli a kérelem típusát) , fájl_típus (kimeneti formátum kérésre pl. ".html", ".csv", ".iso19115 "...") , lang_code (nyelv a kérésre, vagy üres sztring, ha az alapértelmezett) status_code ( http a kérelem állapotkódja, például 200, 302, 404) ...

Ez felhasználható a kérelmek nyomon követésére az adatkészlet segítségével, hogy meghatározza a szerver népszerű adatkészleteit. Segíthet azonosítani, hogy vannak-e olyan kérések, amelyek lassúak a szerveren.

#### touch_thread_duration_ másodpercek

A mytogram érintőképernyős feladat időtartama. Ők címkézve sikerrel (Igazi / hamis) ...

#### feladat_thread_duration_ másodpercek

A feladatmeneti szál időtartama. Ők címkézve sikerrel (Igazi / hamis) feladat_típus (Intetger) ...

#### load_datasets_duration_seconds

A mytogram időtartama a terhelés adatkészlet feladatok. Ők címkézve nagy (Igazi / hamis) ...

#### e-mail_thread_duration_seconds

Az e-mail szálas feladat időtartama. Ők címkézve sikerrel (Igazi / hamis) ...

#### e-mail_count_distribution

A mytogram e-mailek feladatonként.

#### adatset_count

Az adatkészletek felügyelete, amelyet minden egyes terhelési adatkészlet hív. Ez kategória címkézése (háló, asztal) ...

#### adatset_failed_load_count

Az adatkészletek egy mérőeszköze, amely nem tudta betölteni, amelyet minden egyes terhelési adatkészlet hív.

#### Shed_requests_total

Azok a kérések, amelyek lefeküdtek. A kiszolgáló felveszi a kérést, amikor úgy véli, hogy a szerver alacsony a memórián (RAM) és a kérés problémákat okozna. Ez nem tartalmaz olyan kéréseket, amelyek az alacsony RAM vagy a lemezterület miatti hiba a kérelem kezelése során.

#### veszélyes_memory_emails_total

Időnként a szerver megpróbál e-mailt küldeni az adminisztrációnak, hogy az emlék veszélyesen alacsony.

#### veszélyes_memory_failures_total

Azok a kérések, amelyek kudarcot vallottak a gép miatt, ami a memóriából indult. Gyakran ez azért van, mert a gép sok drága kérést kap, vagy az egyéni kérés rendkívül nagy volt.

#### topo_request_total

A topo adatok iránti kérelmek számlája. Ez a címkézett cache (cached/not_cached) ...

#### határszámlálók

Van egy gyűjtemény a határok kérésére:

 - nacional_boundaries_request_total
 - State_boundaries_request_total
 - dalszöveg: Rock_boundaries_request_total
 - gshhs_request_total

Ezek statusszal vannak címkézve (coarse, siker, megszállott) ...
