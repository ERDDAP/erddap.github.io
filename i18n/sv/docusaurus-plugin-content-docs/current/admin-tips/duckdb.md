Detta innehåll är baserat på en [från Roy Mendelssohn till ERDDAP användare grupp](https://groups.google.com/g/erddap/c/6Hl024ZGkes/m/DS5WzsydAQAJ) .

 ERDDAP™ försöker vara agnostisk över vilka dataformat människor använder för sina data, istället försöker arbeta med dataformat som används mest för de samhällen vi främst tjänar. Eftersom allt mer arbete finns i molnet, och det finns en mängd dataformat som folk använder i molnet, skulle det vara trevligt om ERDDAP™ kan stödja många av dessa format. Alas, ERDDAP™ utveckling och underhåll är redan underbemannad, och vad som skulle vara önskvärt är att utnyttja andras arbete för att uppnå detta mål, utan att behöva ändra ERDDAP™ .

Enter [DuckDB](https://duckdb.org/) och [Trino](https://trino.io/) . Båda dessa ger anslutningar till en mängd olika dataformat och kan nås med hjälp av JDBC. I denna uppskrivning kommer jag bara titta på att använda DuckDB eftersom jag har lite förtrogenhet med det, och Trino åtminstone till mitt sinne, verkade lite mer komplicerat att ställa in, och just nu ville jag bara ett bevis på koncept. (Ett tag tillbaka Damien Smythe hade skrivit att han hade sussed ut hur man använder Trino och jag kontaktade honom och han fick det att fungera och kommer att skicka mig anteckningar - så mer på detta i framtiden.) . Jag är allt annat än en expert på något av detta, så det här lär mig tillsammans med mig - låt mig veta om du hittar några misstag, eller saker som är oklara, eller om det finns bättre sätt att göra saker.

1. Preliminär:
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

För att använda DuckDB i ERDDAP™ du behöver installera duckDB på din dator och installera DuckDB JDBC-kontakten i ERDDAP™ . Instruktioner för att installera DuckDB själv är på

https://duckdb.org/docs/installation/?version=stable&environment=cli&platform=macos&download_method=direct

DuckDB JDBC-kontakten kan laddas ner från

https://duckdb.org/docs/stable/clients/java.html

Om din tomcat ligger på $TOMCAT_HOME, vill du lägga den här filen på $TOMCAT_HOME/webapps/erddap/WEB-INF/lib.

2. Vad gör detta knepigt:
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————


Åtminstone för DuckDB (Jag har sagt att jag inte har tittat på Trino i detalj)   Java program kan bara komma åt DuckDB genom JDBC-kontakten, och JDBC-kontakten kan bara läsa data som lagras i DuckDB .db-formatet. Medan DuckDB är ett bra verktyg, måste kopiera data till detta format besegrar hela syftet, DuckDB ger anläggningen som för många av filformaten stöder den. (Det finns en växande lista över tillägg) Du kan ställa in en virtuell .db-fil som bara läser i nödvändiga metadata. Jag har hittat .db som skapas för att vara ganska liten i storlek och ger vad som verkar vara snabb åtkomst. En intressant anmärkning är att till skillnad från de flesta databassystem (inklusive Trino) med Duck DB du inte har en applikation som ständigt körs i bakgrunden, så det måste finnas lite lag i tillgång på grund av start, men som jag sa i mina små tester tillgång verkar snabbt.


3. Ett enkelt exempel:
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

Till att börja med kommer jag att titta på hur man gör detta med en .csv-fil. Korrekt, detta är inte så intressant för ett användningsfall som ERDDAP™ redan hanterar .csv-filer ganska bra, så ingenting erhålls i den meningen, men en textfil är lättare att arbeta med och att debug för att se vad som händer, och som jag lärde mig detta gjorde det mitt liv lättare. Nedan ser jag ett mer intressant användningsfall när vi ser vad som behövs.

Filen jag arbetar med kallas "detects.csv" som är en 305MB-fil av tagdetektering av sensorer. Det första steget är att skapa en .db-fil som pekar på denna fil (I detta och vad som följer efter bekvämlighet kommer jag alltid att anta att du arbetar på den nivå som behövs så jag inte ger full väg - i praktiken måste du) Från:

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

Filen "detects.db" är 268KB i storlek. Vi kan kontrollera att detta faktiskt har fungerat:

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

och storleken på detekterna. db har inte ändrats från att göra denna operation. Så det sista steget är att ansluta detta med ERDDAP™ Jag visar bara den del som behövs för att ansluta till filen, inte all variabel information:

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

Och detta är datamängden i en ERDDAP™ på min bärbara dator med DuckDB-kontakt:
