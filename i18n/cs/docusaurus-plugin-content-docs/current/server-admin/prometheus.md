---
sidebar_position: 9
---
# Prometheus

 [Prometheovy metriky](https://prometheus.io/) jsou k dispozici v /erddap/metrics. JVM jádro metriky byly přidány v 2.25 s mnoha ERDDAP™ metriky přidané ve verzi 2.26. Pokud chcete použít metriky, ujistěte se, že jste alespoň ve verzi 2.26. Oni výchozí povolit, můžete je zakázat přidáním
```xml
<usePrometheusMetrics>false</usePrometheusMetrics>
```
na vaše nastavení.xml.

Tyto metriky jsou navrženy tak, aby byly strojově čitelné. Zatímco můžete ručně zkontrolovat stránku metriky, pro hloubkový monitoring se doporučuje použít server Prometheus. Prometheus server bude ukládat historické metriky, které umožňují více do hloubky monitorování (jako sazby a změny z minulých hodnot) , a také je často spuštěn se serverem Grafana. Poskytujeme některé předem postavené palubní desky, které mohou být užitečné pro zahájení monitorování svých serverů.

## Spuštění serveru Prometheus

Nejlepší dokumentace pro spuštění monitorovacího zásobníku (Prometheus + Grafana) je v Prometheu [readme](https://github.com/ERDDAP/erddap/blob/main/docker/prometheus/README.md) .

##  ERDDAP™ metriky

### JVM

 ERDDAP™ exportuje řadu metrik, které můžete najít užitečné (začínáme ERDDAP™ 2. 25) . Pro obecné sledování zdraví JVM používáme metriky shromážděné klientem Prometheus. To zahrnuje data o sběru odpadků, využití paměti, nitě a další. Více informací viz [Prometheus Java Klientská dokumentace JVM](https://prometheus.github.io/client_java/instrumentation/jvm/) .

###  ERDDAP™ specifické

Také jsme exportovat řadu ERDDAP™ specifické metriky (začínáme ERDDAP™ 2. 26) . Pokud chcete kopat do kódu, můžete najít metriky shromážděné v [Metrics.java](https://github.com/ERDDAP/erddap/blob/main/WEB-INF/classes/gov/noaa/pfel/erddap/util/Metrics.java) .

####  ERDDAP _build_info

Tohle je informace o stavbě ERDDAP™ server. Obsahuje verzi (major. menší) , verze_plná (major. minor.patch) , a nasazení_info (slouží k označení, jak je server nasazen, jako 'Docker ') .

#### feature_flags

Jedná se o informační metriku, která ukazuje aktuální stav vlajek funkcí. Většina booleánských konfigurací jsou považovány za funkce vlajky.

#### pufrované Obrázek

Jedná se o informační metriku, která udává, zda je k dispozici grafické zrychlení.

####  http _request_durace_sekundy

Tohle je histogram doby odezvy na žádost v sekundách. Štítky jsou request_type (například griddap, tabledap , soubory, wms) , database_id (případně jinak opakuje typ žádosti) , soubor_typ (výstupní formát pro žádost např. '.html', '.csv', '.iso19115 ') , lang_kód (jazyk žádosti nebo prázdný řetězec, pokud je výchozí) , status_code ( http stavový kód žádosti, např. 200, 302, 404) .

To lze použít pro sledování požadavků pomocí souboru dat k určení populárních souborů serveru. Může také pomoci určit, zda existují určité druhy požadavků, které jsou pomalé na vašem serveru.

#### touch_thread_durace_sekundy

Histogram dotekových vláken trvání úkolu. Jsou označeny úspěchem (true/false) .

#### úkol_vazba_durace_sekundy

Histogram trvání úlohových nití. Jsou označeny úspěchem (true/false) a typ úlohy_typ (intetger) .

#### load_datasets_durace_sekund

Histogram doby trvání pro úlohy datového souboru zatížení. Jsou označeny velkým písmem. (true/false) .

#### email_thread_durace_sekundy

Histogram e-mailových vláken trvání úkolu. Jsou označeny úspěchem (true/false) .

#### email_count_distribution

Histogram e-mailů na jeden úkol.

#### Databáze_count

Měřítko souborů údajů, nastavené po každém volání souborů údajů o zatížení. Je označena kategorií (mřížka, tabulka) .

#### Database_failed_load_count

Měřidlo souborů údajů, které se nepodařilo načíst, nastavené po každém volání souborů údajů o zatížení.

#### bouda_požadavky_celkem

Proti požadavkům, které byly staženy. Server prozradí požadavek, když se domnívá, že server je málo paměti (RAM) a žádost by způsobila problémy. To nezahrnuje požadavky, že chyba v důsledku nízké RAM nebo místa na disku během manipulace s žádostí.

#### nebezpečné_paměť_emaily_celkem

Počítaje čas, kdy se server pokouší poslat e-mail správci, že paměť je nebezpečně nízká.

#### nebezpečné_paměť_selhání_celkem

Počitadlo žádostí, které selhaly kvůli tomu, že stroj došel paměti. Často je to proto, že stroj dostává hodně drahé žádosti nebo individuální žádost byla výjimečně velká.

#### topo_request_total

Počítadlo žádostí o topo data. Toto je označená cache. (cached/not_catched) .

#### Hranice

Je tu také sbírka čítačů pro žádosti o hranice:

 - národní_hraničí_request_total
 - stát_hraničí_request_total
 - řeka_hraničí_request_total
 - gshhs_request_total

Jsou označeny statusem (hrubý, úspěšný, vyhozený) .
