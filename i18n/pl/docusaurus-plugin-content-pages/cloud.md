---
title: "ERDDAP™ and the Cloud"
---
# ERDDAP™i chmura

## Czym jest chmura?

Najprostszą definicją nie są serwery lokalne. Jest to bardzo szerokie i może oznaczać wiele różnych rozwiązań. Na przykład, może to być dedykowany serwer fizyczny w centrum danych, Virtual Private Server, serwer współdzielony, serverless lub coś innego.

### Dlaczego chmura

Istnieje wiele powodów, dla których organizacje chcą przenieść się do chmury. Najważniejszą z nich jest elastyczność, jaką zapewnia dla potrzeb obliczeń / magazynowania w porównaniu z zakupem sprzętu fizycznego.

Eliminuje to potrzebę utrzymywania serwera / centrum danych. Pozwala również na skalowanie zasobów do aktualnych potrzeb. Podobnie jak chmura może oznaczać wiele różnych rzeczy, zdolność do skalowania zasobów robi również. To może oznaczać płacenie za więcej. (lub mniej) bezsercowe zasoby. To może oznaczać przeniesienie z serwera dzielonego na serwer prywatny. To może oznaczać modernizację do większego dedykowanego serwera fizycznego.

## MożeERDDAP™biegać w chmurze?

Tak.

ERDDAP™jest przeznaczony do działania w obrębie Tomcat, które mogą być prowadzone lokalnie lub w środowisku chmury. Istnieje wsparcie społeczne dla biegania w Docker i jest[urzędowy Wsparcie Dockera wkrótce](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md).

To znaczy,ERDDAP™został zaprojektowany w czasie, gdy dedykowane serwery były normą. Nie jest on bezsercowy, i byłoby niezwykle trudne, jeśli nie niemożliwe, aby uczynić go bezsercowy.

### MożeERDDAP™Skala?

SkalowanieERDDAP™jest bardziej skomplikowane niż tylko użycie większej ilości bezsercowych zasobów. Mamy świetną dokumentację.[jak skalowaćERDDAP™](https://erddap.github.io/docs/server-admin/scaling). Ułatwia skalowanieERDDAP™Jesteśmy zainteresowani.

### Co zapobiega autoskalowaniu?

ERDDAP™robi wiele rzeczy, w tym aktualizowanie zbiorów danych, powiadamianie abonentów o zmianach w zbiorach danych, buforowanie danych, rozpatrywanie wniosków użytkowników i innych. Dla wystarczająco dużychERDDAP™server like[CoastWatch](https://coastwatch.pfeg.noaa.gov/erddap/index.html)To znaczy, że ciągle coś robi. Nieustanne korzystanie jest rzeczywiście niezwykle kosztowną sytuacją dla bezsercowych opcji (płacisz dużą premię za obliczenia podczas wykonywania bez serverless i więc główną zaletą jest, gdy tylko okazjonalnie wykonać połączenia) . Dodatkowo, próbuje przenieść wszystkieERDDAP™Różnorodność funkcjonalności wersji bez serverless spowodowałaby znacznie bardziej skomplikowaną konfigurację wymaganą dla administratorów.

### MożeERDDAP™używać Cloud Storage?

Tak.

ERDDAP™obsługuje pamięć masową w chmurze (w tym AWS S3) i poprawa tego wsparcia (na przykład non-AWS S3) jest wysokim priorytetem w zakresieERDDAP™Plan działania na rzecz rozwoju.ERDDAP™jest również zdolny do pobierania danych z wielu istniejących usług online. Aby uzyskać więcej informacji polecam przeglądanie naszych[dokumentacja typu zbioru danych](https://erddap.github.io/docs/server-admin/datasets#detailed-descriptions-of-dataset-types).
