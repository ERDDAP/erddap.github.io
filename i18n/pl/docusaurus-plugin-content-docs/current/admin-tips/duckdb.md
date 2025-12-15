Ta zawartość jest oparta na [wiadomość od Roy Mendelssohn do ERDDAP grupa użytkowników](https://groups.google.com/g/erddap/c/6Hl024ZGkes/m/DS5WzsydAQAJ) .

 ERDDAP™ stara się być agnostykiem w odniesieniu do formatów danych, których ludzie używają do swoich danych, zamiast próbować pracować z formatami danych, które są najczęściej używane w społecznościach, którym głównie służymy. Ponieważ coraz więcej pracy jest w chmurze, i istnieje mnóstwo formatów danych, które ludzie używają w chmurze, byłoby miło, gdyby ERDDAP™ może obsługiwać wiele z tych formatów. Niestety, ERDDAP™ rozwój i utrzymanie są już niewystarczające, a pożądane byłoby wykorzystanie pracy innych do osiągnięcia tego celu, bez konieczności zmiany ERDDAP™ .

Wpisz [DuckDB](https://duckdb.org/) oraz [Trino](https://trino.io/) . Oba z nich zapewniają połączenia do różnych formatów danych i mogą być dostępne za pomocą JDBC. W tym piśmie będę patrzeć na stosowanie DuckDB tylko dlatego, że mam pewną znajomość z nim, a Trino przynajmniej moim zdaniem, wydawało się trochę bardziej skomplikowane do skonfigurowania, a teraz po prostu chciałem dowód koncepcji. (Jakiś czas temu Damien Smythe napisał, że odkrył, jak używać Trino i skontaktowałem się z nim, a on to zrobił i wyśle mi notatki - więc więcej na ten temat w przyszłości) . Poza tym jestem ekspertem w tej dziedzinie, więc to jest nauka razem ze mną - daj mi znać, jeśli znajdziesz jakieś błędy lub rzeczy, które są niejasne, lub jeśli są lepsze sposoby robienia rzeczy.

1. Wstępne wyjaśnienia:
-

W celu stosowania DuckDB w ERDDAP™ musisz zainstalować duckDB na swoim komputerze, i zainstalować złącze DuckDB JDBC do ERDDAP™ . Instrukcje dotyczące instalacji DuckDB są na

https://duckdb.org/docs/installation/?version=stable&environment=cli&platform=macos&download_method=direct

Złącze DuckDB JDBC można pobrać z

https://duckdb.org/docs/stable/clients/java.html

Jeśli Twój tomcat znajduje się na $TOMCAT _ HOME, to chcesz umieścić ten plik na $TOMCAT _ HOME / webapps / erddap / WEB-INF / lib.

2. Co sprawia, że to trudne:
- - - - - - - - - - -


Przynajmniej dla DuckDB (Jak powiedziałem, nie patrzyłem na Trino w żadnym szczególe)   Java programy mogą uzyskać dostęp tylko do DuckDB poprzez złącze JDBC, a złącze JDBC może odczytywać tylko dane przechowywane w formacie DuckDB .db. Podczas gdy DuckDB jest doskonałym narzędziem, aby skopiować dane do tego formatu pokonuje cały cel, jednak DuckDB zapewnia, że dla wielu formatów plików obsługuje (rośnie lista rozszerzeń) możesz skonfigurować wirtualny plik .db, który tylko czyta w niezbędnych metadanych. Znalazłem .db, który jest stworzony, aby być dość mały rozmiar, i zapewnia to, co wydaje się być szybki dostęp. Ciekawe jest to, że w przeciwieństwie do większości systemów baz danych (oraz łącznie z Trino) , z kaczką DB nie masz aplikacji, która jest stale uruchomiony w tle, więc musi być trochę opóźnienia w dostępie z powodu startup, ale jak powiedziałem w moich małych testów dostęp wydaje się szybki.


3. Prosty przykład:
- - - - - - - -

Na początek, spojrzę jak to zrobić z pliku .csv. Zgadza się, to nie jest aż tak interesujące ze sprawy użycia jak ERDDAP™ już obsługuje pliki .csv całkiem dobrze, więc nic nie jest zyskiwane w tym sensie, ale plik tekstowy jest łatwiejszy do pracy i debugować w patrzeniu, co się dzieje, i jak się tego nauczyłem, to ułatwiło mi życie. Poniżej przyjrzę się ciekawszej sprawie użycia, gdy zobaczymy, co jest potrzebne.

Plik, z którym pracuję, nazywa się "detects.csv", który jest plikiem 305MB detekcji znaczników przez czujniki. Pierwszym krokiem jest utworzenie pliku .db, który wskazuje na ten plik (w tym i co następuje dla wygody zawsze zakładam, że pracujesz na poziomie potrzebnym, więc nie daje pełne ścieżki - w praktyce będziesz musiał) :

```
duckdb detects.db <<EOF
CREATE VIEW detects_table AS
SELECT *
FROM read_csv_auto(
'detects.csv',
header=true,
sample_size=2147483647 -- scan whole file for schema (optional)
);
EOF
```

Plik "detects.db" ma rozmiar 268KB. Możemy sprawdzić, czy rzeczywiście zadziałało:

```
duckdb detects.db
DuckDB v1.3.1 (Ossivalis) 2063dda3e6
Enter ".help" for usage hints.
D SHOW TABLES;
┌───────────────┐
│ name │
│ varchar │
├───────────────┤
│ detects_table │
└───────────────┘
D SELECT * FROM detects_table LIMIT 5;
┌────────────────┬─────────┬──────────────┬───────┬──────────┬───┬──────────┬──────────────┬───────────────┬─────────┐
│ Study_ID │ TagCode │ DateTime_PST │ recv │ location │ … │ tag_life │ Rel_latitude │ Rel_longitude │ time │
│ varchar │ varchar │ timestamp │ int64 │ varchar │ │ int64 │ double │ double │ varchar │
├────────────────┼─────────┼──────────────┼───────┼──────────┼───┼──────────┼──────────────┼───────────────┼─────────┤
│ ButteSink_2024 │ 1B76 │ NULL │ NULL │ NULL │ … │ 52 │ 39.32663 │ -121.8847 │ -08 │
│ ButteSink_2024 │ 1B94 │ NULL │ NULL │ NULL │ … │ 52 │ 39.32663 │ -121.8847 │ -08 │
│ ButteSink_2024 │ 1BA5 │ NULL │ NULL │ NULL │ … │ 52 │ 39.35858 │ -121.8943 │ -08 │
│ ButteSink_2024 │ 1C55 │ NULL │ NULL │ NULL │ … │ 52 │ 39.33546 │ -121.8923 │ -08 │
│ ButteSink_2024 │ 1C95 │ NULL │ NULL │ NULL │ … │ 52 │ 39.33546 │ -121.8923 │ -08 │
├────────────────┴─────────┴──────────────┴───────┴──────────┴───┴──────────┴──────────────┴───────────────┴─────────┤
│ 5 rows 18 columns (9 shown) │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

i wielkość wykryć. db nie zmienił się po wykonaniu tej operacji. Więc ostatnim krokiem jest połączenie tego z ERDDAP™ , Pokazuję tylko część potrzebną do połączenia się z plikiem, nie wszystkie zmienne informacje:

```
<dataset type="EDDTableFromDatabase" datasetID="duckdb_test" active="true">
<!-- JDBC Connection Details -->
<sourceUrl>jdbc:duckdb:detects.db</sourceUrl>
<driverName>org.duckdb.DuckDBDriver</driverName>
<catalogName></catalogName>
<schemaName></schemaName>
<tableName>detects_table</tableName>
<columnNameQuotes></columnNameQuotes>
>
```

A to jest zbiór danych w ERDDAP™ na moim laptopie przy użyciu złącza DuckDB:
