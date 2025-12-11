Tämä sisältö perustuu a [Kirjoittanut Roy Mendelssohn ERDDAP Käyttäjäryhmä](https://groups.google.com/g/erddap/c/6Hl024ZGkes/m/DS5WzsydAQAJ) .

 ERDDAP™ pyrkii olemaan agnostikko siitä, mitä datamuotoja ihmiset käyttävät tietoihinsa, sen sijaan, että yrittäisivät työskennellä useimpien käyttämiemme yhteisöjen tietomuotojen kanssa. Koska pilvessä on yhä enemmän työtä, ja pilvessä on paljon datamuotoja, olisi mukavaa, jos ERDDAP™ voi tukea monia näistä muodoista. Alas, ERDDAP™ kehittämistä ja ylläpitoa on jo alennettu, ja se, mikä olisi toivottavaa, on käyttää muiden työtä tämän tavoitteen saavuttamiseksi ilman muutosta. ERDDAP™ .

sisään [DuckDB](https://duckdb.org/) ja [Trino](https://trino.io/) . Molemmat tarjoavat yhteyksiä erilaisiin tietomuotoihin, ja niitä voidaan käyttää JDBC:llä. Tässä kirjoituksessa katson vain DuckDB:n käyttöä, koska minulla on siihen jonkin verran perehtymistä, ja ainakin mielessäni Trino vaikutti hieman monimutkaisemmalta, ja juuri nyt halusin vain todisteen konseptista. (Jonkin ajan kuluttua Damien Smythe oli kirjoittanut, että hän oli lykännyt Trinon käyttöä ja otin yhteyttä häneen ja hän sai sen töihin ja lähettää minulle muistiinpanoja.) . Minäkin olen kaikkea muuta kuin asiantuntija, joten tämä on oppimista kanssani – kerro minulle, löydätkö virheitä tai asioita, jotka ovat epäselviä tai ovatko parempia tapoja tehdä asioita.

1. Alustavat:
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

Käyttää DuckDB ERDDAP™ Sinun on asennettava duckDB tietokoneeseen ja asennettava DuckDB JDBC -liitin tietokoneeseen. ERDDAP™ . Ohjeet DuckDB:n asentamiseen ovat

https://duckdb.org/docs/installation/?version=stable&environment=cli&platform=macos&download_method=direct

DuckDB JDBC-liitäntä voidaan ladata

https://duckdb.org/docs/stable/clients/java.html

Jos tomcat sijaitsee $ TomCAT_HOME, haluat laittaa tämän tiedoston $ TomCAT_HOME/webapps/erddap/WEB-INF/lib.

2. Mikä tekee tästä huijauksen:
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --


Ainakin DuckDB (Kuten sanoin, en ole katsonut mitään yksityiskohtia.)   Java Ohjelmat voivat käyttää DuckDB:tä vain JDBC-liittimen kautta, ja JDBC-liitin voi lukea vain DuckDB .db -muodossa tallennettuja tietoja. Vaikka DuckDB on erinomainen työkalu, joka kopioi tiedot tähän muotoon voittaa koko tarkoituksen, DuckDB tarjoaa laitoksen, joka monissa tiedostomuodoissa se tukee. (Kasvava lista laajennuksista) Voit luoda virtuaalisen .db-tiedoston, joka lukee vain tarvittavassa metatiedotteessa. Olen löytänyt .db: n, joka on luotu melko pieneksi kooksi, ja se näyttää olevan nopea pääsy. Mielenkiintoista on, että toisin kuin useimmat tietokantajärjestelmät. (mukaan lukien Trino) Duckin kanssa DB: llä ei ole sovellusta, joka toimii jatkuvasti taustalla, joten käynnistyksen vuoksi on oltava jokin viive, mutta kuten sanoin pienissä testeissäni.


3. Yksinkertainen esimerkki:
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

Katsotaan, miten tämä tehdään .csv-tiedostolla. Oikein, tämä ei ole niin mielenkiintoinen tapaus kuin ERDDAP™ .csv-tiedostoja on jo käsitelty melko hyvin, joten mitään ei ole saatu siinä mielessä, mutta tekstitiedosto on helpompi työskennellä ja debytoida nähdessäni, mitä tapahtuu, ja kun opin, se helpottaa elämääni. Alla on mielenkiintoisempi tapaus, kun näemme, mitä tarvitaan.

Työskentelemäni tiedosto on nimeltään Detects.csv, joka on 305MB tiedosto tunnisteiden anturit. Ensimmäinen askel on luoda .db-tiedosto, joka viittaa tähän tiedostoon. (Tässä ja mitä mukavuudesta seuraa, oletan aina, että työskentelet tarvittavalla tasolla, jotta en anna täydellisiä polkuja - käytännössä sinun täytyy) :

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

Detects.db-tiedosto on kooltaan 268KB. Voimme tarkistaa, että tämä on todella toiminut:

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

ja havaintojen koko. DB ei ole muuttunut operaatiosta. Viimeinen askel on yhdistää tämä ERDDAP™ Näytän vain tiedostoon liitettävän osan, ei kaikki muuttujan tiedot:

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

Tämä on tietoaineistoa eräässä ERDDAP™ tietokoneellani DuckDB-liittimellä:
