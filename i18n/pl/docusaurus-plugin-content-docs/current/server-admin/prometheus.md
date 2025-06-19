---
sidebar_position: 9
---
# Prometeusz

[Wskaźniki prometeusza](https://prometheus.io/)są dostępne na / erddap / metrics. Mierniki rdzenia JVM zostały dodane w 2.25 z wieluERDDAP™wskaźniki dodane w wersji 2.26. Jeśli chcesz użyć pomiarów upewnij się, że jesteś w co najmniej wersji 2.26. Domyślnie włączone, można je wyłączyć poprzez dodanie
```xml
<usePrometheusMetrics>false</usePrometheusMetrics>
```
do twojej ugody.

Te wskaźniki są zaprojektowane tak, aby były do odczytu maszynowego. Podczas gdy można sprawdzić stronę pomiaru ręcznie, w celu dogłębnego monitorowania zaleca się użycie serwera Prometeus. Serwer Prometheus przechowuje historyczne wskaźniki, które umożliwiają bardziej dogłębne monitorowanie (podobne kursy i zmiany z poprzednich wartości) , a także często działa z serwerem Grafana. Dostarczamy kilka wstępnie zbudowanych desek rozdzielczych, które administratorzy mogą uznać za przydatne do rozpoczęcia monitorowania swoich serwerów.

## Uruchomienie serwera Prometheus

Najlepsza dokumentacja do uruchomienia stosu monitorowania (Prometeusz + Grafana) jest w Prometeuszu[readme](https://github.com/ERDDAP/erddap/blob/main/docker/prometheus/README.md).

## ERDDAP™metryka

### JVM

ERDDAP™eksportuj wiele wskaźników, które mogą okazać się przydatne (odERDDAP™2, 25) . Do ogólnego monitorowania zdrowia JVM używamy pomiarów zebranych przez klienta Prometeusza. Obejmuje to dane dotyczące zbierania śmieci, wykorzystania pamięci, wątków i więcej. Więcej informacji można znaleźć na stronie internetowej:[PrometeuszJavaDokumentacja klienta JVM](https://prometheus.github.io/client_java/instrumentation/jvm/).

### ERDDAP™specyficzny

Eksportujemy również kilkaERDDAP™Specyficzne wskaźniki (odERDDAP™2, 26) . Jeśli chcesz przekopać się do kodu, możesz znaleźć metryki zebrane w[Metrics.java](https://github.com/ERDDAP/erddap/blob/main/WEB-INF/classes/gov/noaa/pfel/erddap/util/Metrics.java).

#### ERDDAP_ build _ info

To jest build info dlaERDDAP™serwer. Zawiera on wersję (major.minor) , version _ full (major.minor.patch) oraz wdrożenie_ info (używane do wskazania jak serwer jest rozmieszczany, jak 'Docker') .

#### feature _ flags

Jest to metryka informacyjna, która pokazuje aktualny stan flag funkcji. Większość opcji konfiguracji boolean są uważane za flagi funkcji.

#### buforowane Obraz

Jest to metryka informacyjna, która wskazuje, czy przyspieszenie graficzne jest dostępne.

#### http_ request _ time _ seconds

To jest histogram czasu trwania odpowiedzi w sekundach. Etykiety to request _ type (na przykład griddap,tabledap, pliki, wms) , dataset _ id (w stosownych przypadkach, w inny sposób powtarza typ wniosku) , file _ type (format wyjścia na żądanie np. '.html', '.csv', '.iso19115') , lang _ code (język dla żądania, lub pusty ciąg jeśli domyślnie) , status _ code (httpkod statusu wniosku np. 200, 302, 404) .

Można to wykorzystać do śledzenia żądań przy pomocy id dataset w celu określenia popularnych zbiorów danych serwera. Może również pomóc zidentyfikować, czy istnieją szczególne rodzaje żądań, które są wolne na serwerze.

#### touch _ thread _ time _ seconds

Histogram czasu trwania zadania nici dotykowej. Są one oznakowane sukcesem (true / false) .

#### task _ thread _ time _ seconds

Histogram długości nitki zadaniowej. Są one oznakowane sukcesem (true / false) i typ _ zadania (intetger) .

#### load _ datasets _ time _ seconds

Histogram czasu trwania zadań zbioru danych obciążenia. Są oznakowane dużymi literami (true / false) .

#### email _ thread _ time _ seconds

Histogram czasu trwania zadania nici e-mail. Są one oznakowane sukcesem (true / false) .

#### email _ count _ distribution

Histogram maili na każde zadanie.

#### dataset _ count

Wskaźnik zestawu danych, ustawiony po każdym wywołaniu zbioru danych obciążenia. Jest to etykieta z kategorią (siatka, tabela) .

#### dataset _ failed _ load _ count

Wskaźnik zestawów danych, które nie zostały załadowane, ustawiony po każdym wywołaniu zbioru danych obciążenia.

#### shed _ requests _ total

Licznik złożonych żądań. Serwer złoży żądanie, gdy uzna, że serwer jest niski w pamięci (RAM) a wniosek spowodowałby problemy. Nie obejmuje to wniosków o błąd spowodowany niską przestrzenią pamięci RAM lub dysku podczas obsługi wniosku.

#### niebezpieczne _ memory _ email _ total

Licznik razy serwer próbuje wysłać e-mail do administratora, że pamięć jest niebezpiecznie niska.

#### niebezpieczne _ pamięci _ awarie _ ogółem

Licznik żądań, które zawiodły z powodu braku pamięci maszyny. Często jest to spowodowane tym, że maszyna otrzymuje wiele kosztownych żądań lub indywidualne żądanie było wyjątkowo duże.

#### topo _ request _ total

Licznik wniosków o dane topo. To jest etykieta pamięci podręcznej (cached / not _ cached) .

#### Licznik granic

Istnieje również zbiór liczników dla wniosków o granice:

 - National _ borders _ request _ total
 - state _ borders _ request _ total
 - River _ borders _ request _ total
 - gshhs _ request _ total

Są one oznakowane statusem (grube, sukces, rzucone) .
