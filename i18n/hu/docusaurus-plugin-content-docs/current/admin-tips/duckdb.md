Ez a tartalom egy [Roy Mendelssohn üzenete a ERDDAP felhasználók csoport](https://groups.google.com/g/erddap/c/6Hl024ZGkes/m/DS5WzsydAQAJ) ...

 ERDDAP™ megpróbálja agnosztikusnak lenni abban, hogy milyen adatformátumokat használnak az emberek az adataikhoz, ahelyett, hogy megpróbálnának a legtöbb felhasználási adatformátummal dolgozni az általunk főként szolgáló közösségekhez. Ahogy egyre több munka van a felhőben, és vannak olyan adatformátumok plethorája, amelyeket az emberek használnak a felhőben, jó lenne, ha ERDDAP™ sok ilyen formátumot támogathat. Alanya, ERDDAP™ a fejlesztés és a karbantartás már megalapozott, és mi lenne kívánatos, hogy használja a munka mások számára, hogy elérje ezt a célt, anélkül, hogy módosítania kell ERDDAP™ ...

Belépés [DuckDB](https://duckdb.org/) és [Trino](https://trino.io/) ... Mindkét hozzáférést biztosít számos adatformátumhoz, és elérhető a JDBC használatával. Ebben az írásban csak a DuckDB használatát fogom megnézni, mert ismerős vagyok vele, és Trino legalábbis az elmémnek tűnik egy kicsit bonyolultabbnak, hogy felállítsam, és most csak a koncepció bizonyítékát akartam. (Egy időre Damien Smythe megírta, hogy felgyorsította, hogyan kell használni Trino-t, és kapcsolatba léptem vele, és megszerezte, hogy dolgozzon, és megjegyzéseket küld nekem - így tovább a jövőben) ... Szintén bármi vagyok, csak egy szakértő ezen, így ez tanul velem együtt - hadd tudd meg, hogy találsz-e hibákat, vagy olyan dolgokat, amelyek nem világosak, vagy ha vannak jobb módjai a dolgoknak.

1. Előzetesek:
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

A DuckDB használatához ERDDAP™ duckDB-t kell telepítenie a számítógépre, és telepítenie kell a DuckDB JDBC csatlakozót ERDDAP™ ... Maga a DuckDB telepítésének utasításai

https://duckdb.org/docs/installation/?version=stable&environment=cli&platform=macos&download_method=direct

A DuckDB JDBC csatlakozó letölthető

https://duckdb.org/docs/stable/clients/java.html

Ha a tomcat a $TOMCAT_HOME-nál található, akkor ezt a fájlt a $TOMCAT_HOME/webapps/erddap/WEB-INF/lib.

2. Mi teszi ezt a trükköst:
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————


Legalább a DuckDB számára (Mint mondtam, nem néztem meg a Trino-t minden részletben)   Java A programok csak a DuckDB-t érhetik el a JDBC csatlakozóján keresztül, és a JDBC csatlakozó csak olyan adatokat olvashat, amelyeket a DuckDB .db formátumban tárolnak. Míg a DuckDB egy nagyszerű eszköz, hogy másolja az adatokat, hogy ez a formátum legyőzi az egész célt, azonban a DuckDB biztosítja a létesítményt, hogy sok fájlformátumot támogatja, amely támogatja (van egy növekvő lista a kiterjesztésekről) létrehozhat egy virtuális .db fájlt, amely csak a szükséges metaadatban olvasható. Megtaláltam a .db-t, amely elég kicsi méretű, és biztosítja azt, ami gyors hozzáférésnek tűnik. Érdekes megjegyzés, hogy ellentétben a legtöbb adatbázis rendszerrel (és köztük Trino) - kacsával DB nem rendelkezik olyan alkalmazással, amely folyamatosan fut a háttérben, így az indulás miatt kell lennie néhány lagnak, de ahogy azt mondtam, a kis tesztekhez való hozzáférésem gyorsnak tűnik.


3. Egy egyszerű példa:
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

Kezdeni, megnézem, hogyan kell ezt csinálni egy .csv fájllal. Correct, ez nem olyan érdekes egy használati esetről, mint ERDDAP™ már jól kezeli az .csv fájlokat, így semmi sem nyerhető ebben az értelemben, de egy szövegfájl könnyebb dolgozni, és megdönteni azt, ami történik, és ahogy megtanultam, ez megkönnyítette az életemet. Az alábbiakban egy érdekesebb használati esetet fogok megnézni, amikor látjuk, mire van szükség.

Az általam dolgozott fájlt "Detects.csv"-nek hívják, ami egy 305MB-os jelzési fájl az érzékelők által. Az első lépés egy .db fájl létrehozása, amely rámutat erre a fájlra (Ebben és mi következik a kényelemért, mindig azt fogom vállalni, hogy a szükséges szinten dolgozol, így nem adok teljes utat - a gyakorlatban meg kell adnia.) :

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

A "detects.db" fájl 268KB méretű. Ellenőrizhetjük, hogy ez valóban működött:

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

és az érzékelések mérete. db nem változott a művelet elvégzésétől. Tehát az utolsó lépés az, hogy ezt összekapcsolja ERDDAP™ , csak a fájlhoz való csatlakozáshoz szükséges részt mutatom, nem minden változó információt:

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

És ez az adatkészlet egy ERDDAP™ a laptopomon a DuckDB csatlakozóval:
