Dette innholdet er basert på en [melding fra Roy Mendelssohn til ERDDAP brukergruppe](https://groups.google.com/g/erddap/c/6Hl024ZGkes/m/DS5WzsydAQAJ) ..

 ERDDAP™ prøver å være agnostikert over hvilke dataformater folk bruker til sine data, i stedet prøver å jobbe med dataformatene til mest bruk til samfunnene vi hovedsakelig tjener. Som mer og mer arbeid er i skyen, og det er en rekke dataformater som folk bruker i skyen, ville det være hyggelig hvis ERDDAP™ Kan støtte mange av disse formatene. Alas, ERDDAP™ utvikling og vedlikehold er allerede underpersonell, og det som ville være ønskelig er å gjøre bruk av andres arbeid for å nå dette målet, uten å måtte endre ERDDAP™ ..

Skriv inn [DuckDB](https://duckdb.org/) og [Trino](https://trino.io/) .. Begge disse gir tilkoblinger til en rekke dataformater, og kan nås ved hjelp av JDBC. I dette skriveopp vil jeg bare se på å bruke DuckDB fordi jeg har noen kjennskap til det, og Trino i det minste til tankene mine, virket litt mer komplisert å sette opp, og akkurat nå ønsket jeg bare et bevis på konsept. (En stund tilbake Damien Smythe hadde skrevet at han hadde sussed ut hvordan å bruke Trino og jeg kontaktet ham og han fikk det til å jobbe og vil sende meg notater - så mer om dette i fremtiden) .. Også jeg er noe annet enn en ekspert på noe av dette, så dette er å lære sammen med meg - gi meg beskjed om du finner noen feil, eller ting som er uklare, eller om det er bedre måter å gjøre ting på.

1. Preliminary:
——————————

For å bruke DuckDB i ERDDAP™ du må installere andDB på datamaskinen, og for å installere DuckDB JDBC-kontakten i ERDDAP™ .. Instruksjoner om å installere DuckDB i seg selv er på

https://duckdb.org/docs/installation/?version=stable&environment=cli&platform=macos&download_method=direct

DuckDB JDBC-kontakten kan lastes ned fra

https://duckdb.org/docs/stable/clients/java.html

Hvis din tomcat befinner seg på $TOMCAT_HOME, så vil du sette denne filen på $TOMCAT_HOME/webapps/erddap/WEB-INF/lib.

2. Hva gjør dette vanskelig:
————————————————


I det minste for DuckDB (Som sagt har jeg ikke sett på Trino i detalj)   Java programmer kan bare få tilgang til DuckDB gjennom JDBC-kontakten, og JDBC-kontakten kan bare lese data som lagres i DuckDB .db-formatet. Mens DuckDB er et flott verktøy, må kopiere data til dette formatet beseirer hele formålet, men DuckDB gir anlegget som for mange av filformatene det støtter (Det er en voksende liste over utvidelser) du kan konfigurere en virtuell .db-fil som bare leser i de nødvendige metadataene. Jeg har funnet den .db som er laget for å være ganske liten i størrelse, og gir det som ser ut til å være rask tilgang. Et interessant notat er at i motsetning til de fleste databasesystemer (og inkludert Trino) , med Duck DB du ikke har et program som kjører hele tiden i bakgrunnen, så det må være noe lag i tilgang på grunn av oppstart, men som jeg sa i mine små tester tilgang synes rask.


3. Et enkelt eksempel:
—————————————

For å begynne, vil jeg se på hvordan jeg gjør dette med en .csv-fil. Dette er ikke så interessant i bruk som ERDDAP™ allerede håndterer .csv-filer ganske bra, så ingenting blir oppnådd i den forstand, men en tekstfil er lettere å jobbe med og å feilsøke i å se hva som foregår, og som jeg lærte dette det gjorde livet mitt enklere. Nedenfor vil jeg se på en mer interessant brukssak når vi ser hva som er nødvendig.

Filen jeg jobber med kalles \"detects.csv\" som er en 305 MB fil av tag deteksjoner av sensorer. Det første steget er å opprette en .db-fil som peker på denne filen (i dette og det som følger for bekvemmelighet vil jeg alltid anta at du jobber på det nivået som trengs, så jeg ikke gir fulle veier - i praksis må du) :)

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

Filen «detects.db» er 268KB i størrelse. Vi kan sjekke at dette faktisk har fungert:

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

og størrelsen på deteksjon. db har ikke endret seg fra å utføre denne operasjonen. Det siste trinnet er å koble dette til ERDDAP™ , Jeg viser bare den delen som trengs for å koble til filen, ikke all variabel informasjon:

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

Dette er datasettet i en ERDDAP™ på min bærbare datamaskin ved hjelp av DuckDB-kontakten:
