Acest conţinut se bazează pe [mesaj de la Roy Mendelssohn la ERDDAP grupul de utilizatori](https://groups.google.com/g/erddap/c/6Hl024ZGkes/m/DS5WzsydAQAJ) .

 ERDDAP™ încearcă să fie agnostic despre ce formate de date folosesc oamenii pentru datele lor, în loc să încerce să lucreze cu formatele de date de cele mai multe utilizări pentru comunitățile pe care le servim în principal. Deoarece din ce în ce mai multă muncă este în cloud, și există o multitudine de formate de date pe care oamenii le folosesc în cloud, ar fi frumos dacă ERDDAP™ ar putea sprijini o mulțime de aceste formate. Vai, ERDDAP™ dezvoltarea și întreținerea este deja insuficient de personal, și ceea ce ar fi de dorit este de a face uz de activitatea altora pentru a atinge acest obiectiv, fără a fi nevoie să modifice ERDDAP™ .

Intră [DuckDB](https://duckdb.org/) şi [Trino](https://trino.io/) . Ambele dintre acestea oferă conexiuni la o varietate de formate de date, și pot fi accesate folosind JDBC. În această notă voi privi doar la utilizarea DuckDB pentru că am unele familiaritate cu ea, și Trino cel puțin în mintea mea, părea un pic mai complicat pentru a configura, și chiar acum am vrut doar o dovadă de concept. (Cu ceva timp în urmă Damien Smythe a scris că el a sussed cum să folosească Trino și l-am contactat și el a făcut-o să funcționeze și va trimite-mi note - atât de mult pe acest viitor) . De asemenea, eu nu sunt un expert în nimic din toate acestea, astfel încât acest lucru este de învățare împreună cu mine - lasă-mă să știu dacă găsiți greșeli, sau lucruri care sunt neclare, sau dacă există modalități mai bune de a face lucruri.

1. Antecedente:


Pentru utilizarea DuckDB în ERDDAP™ aveți nevoie pentru a instala rațăDB pe computer, și pentru a instala conectorul DuckDB JDBC în ERDDAP™ . Instrucțiunile privind instalarea DuckDB în sine sunt la

https://duckdb.org/docs/installation/?version=stable&environment=cli&platform=macos&download_method=direct

Conectorul DuckDB JDBC poate fi descărcat de la

https://duckdb.org/docs/stable/clients/java.html

Dacă Tomcat este situat la $TOMCAT_HOME, atunci doriți să puneți acest fișier la $TOMCAT_HOME/webapps/erddap/WEB-INF/lib.

2. Ce face acest lucru complicat:



Cel puțin pentru DuckDB (Aşa cum am spus, nu m-am uitat la Trino în detaliu.)   Java programe pot accesa doar DuckDB prin conectorul JDBC, iar conectorul JDBC poate citi doar date stocate în formatul DuckDB.db. În timp ce DuckDB este un instrument mare, având de a copia datele în acest format învinge întregul scop, Cu toate acestea, DuckDB oferă facilitatea că pentru multe dintre formatele de fişiere pe care le suportă (există o listă în creștere de extensii) puteți configura un fișier .db virtual care citește doar în metadatele necesare. Am găsit .db care este creat pentru a fi destul de mic în dimensiune, și oferă ceea ce pare a fi acces rapid. O notă interesantă este că spre deosebire de majoritatea sistemelor de baze de date (inclusiv Trino) , cu Duck DB nu aveți o aplicație care rulează în mod constant în fundal, așa că trebuie să existe un decalaj în acces din cauza startup-ului, dar așa cum am spus în mele mici teste acces pare rapid.


3. Un exemplu simplu:


Pentru a începe, mă voi uita la cum să facă acest lucru cu un fișier .csv. Corect, acest lucru nu este că interesant de un caz de utilizare ca ERDDAP™ deja se ocupă de fişiere .csv destul de bine, aşa că nimic nu este câştigat în acest sens, dar un fişier text este mai uşor de lucrat cu şi pentru a depana în a vedea ce se întâmplă, şi ca am fost de învăţare acest lucru a făcut viaţa mea mai uşoară. Mai jos mă voi uita la un caz de utilizare mai interesant odată ce vom vedea ceea ce este necesar.

Fişierul cu care lucrez se numeşte  Primul pas este de a crea un fișier .db care indică acest fișier (in aceasta si ceea ce urmeaza pentru comoditate voi presupune mereu ca lucrezi la nivelul necesar astfel incat sa nu dau cai complete - in practica va trebui sa) :

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

Fişierul  Putem verifica dacă acest lucru a lucrat de fapt:

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

și dimensiunea de detectează. db nu sa schimbat de la a face această operațiune. Deci, ultimul pas este de a conecta acest lucru cu ERDDAP™ , Vă arăt doar partea necesară pentru a se conecta la fișier, nu toate informațiile variabile:

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

Și acesta este setul de date într-o ERDDAP™ pe laptop-ul meu folosind conectorul DuckDB:
