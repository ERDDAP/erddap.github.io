Deze inhoud is gebaseerd op een [bericht van Roy Mendelssohn aan de ERDDAP gebruikersgroep](https://groups.google.com/g/erddap/c/6Hl024ZGkes/m/DS5WzsydAQAJ) .

 ERDDAP™ probeert agnostisch te zijn over welke dataformaten mensen gebruiken voor hun gegevens, in plaats daarvan proberen te werken met de gegevensformaten van de meeste gebruik voor de gemeenschappen die we voornamelijk dienen. Aangezien er steeds meer werk in de cloud zit, en er een overvloed aan dataformaten zijn die mensen gebruiken in de cloud, zou het leuk zijn als ERDDAP™ kan veel van deze formaten ondersteunen. Helaas, ERDDAP™ ontwikkeling en onderhoud is al onderbemand, en wat wenselijk zou zijn is gebruik te maken van het werk van anderen om dit doel te bereiken, zonder te hoeven wijzigen ERDDAP™ .

Enter [DuckDB](https://duckdb.org/) en [Trino](https://trino.io/) . Beide bieden verbindingen met een verscheidenheid aan dataformaten en zijn toegankelijk via JDBC. In dit schrijven zal ik alleen maar kijken naar het gebruik van DuckDB omdat ik er bekend mee ben, en Trino in ieder geval voor mij, leek een beetje ingewikkelder om op te zetten, en op dit moment wilde ik gewoon een bewijs van concept. (Een tijdje terug had Damien Smythe geschreven dat hij had uitgezocht hoe Trino te gebruiken en ik contacteerde hem en hij kreeg het aan de slag en zal me notities sturen - dus meer hierover in de toekomst) . Ik ben ook alles behalve een expert in dit alles, dus dit leert samen met mij - laat het me weten als je fouten vindt, of dingen die onduidelijk zijn, of als er betere manieren zijn om dingen te doen.

1. Voorrondes:
Wat?

Om DuckDB te gebruiken in ERDDAP™ U moet eendDB installeren op uw computer, en de DuckDB JDBC connector installeren in ERDDAP™ . Instructies voor installatie DuckDB zelf zijn op

https://duckdb.org/docs/installation/?version=stable&environment=cli&platform=macos&download_method=direct

De DuckDB JDBC connector kan worden gedownload van

https://duckdb.org/docs/stable/clients/java.html

Als uw Tomcat zich op $TOMCAT_HOME bevindt, dan wilt u dit bestand op $TOMCAT_HOME/webapps/erddap/WEB-INF/lib plaatsen.

2. Wat maakt dit lastig:
Wat?


Tenminste voor DuckDB (zoals ik heb gezegd ik heb niet gekeken naar Trino in detail)   Java programma's kunnen alleen toegang krijgen tot DuckDB via de JDBC connector, en de JDBC connector kan alleen gegevens lezen die zijn opgeslagen in het DuckDB .db formaat. Terwijl DuckDB is een geweldige tool, het hebben van de gegevens te kopiëren naar dit formaat verslaat het hele doel, Echter, DuckDB biedt de faciliteit die voor veel van de bestandsformaten ondersteunt (er is een groeiende lijst van extensies) u een virtueel .db bestand kunt instellen dat alleen in de nodige metadata leest. Ik heb de .db gevonden die is gemaakt om vrij klein in grootte, en biedt wat lijkt op snelle toegang. Een interessante opmerking is dat in tegenstelling tot de meeste database systemen (en inclusief Trino) , met Duck DB je hebt geen toepassing die constant draait op de achtergrond, dus er moet enige vertraging in de toegang als gevolg van opstarten, maar zoals ik zei in mijn kleine tests toegang lijkt snel.


3. Een eenvoudig voorbeeld:
Wat?

Om te beginnen zal ik kijken hoe dit te doen met een .csv bestand. Correct, dit is niet dat interessant van een use case als ERDDAP™ al behandelt .csv bestanden vrij goed, dus er wordt niets gewonnen in die zin, maar een tekstbestand is gemakkelijker om mee te werken en te debuggen in het zien van wat er aan de hand is, en toen ik dit leerde maakte het mijn leven gemakkelijker. Hieronder zal ik kijken naar een interessanter gebruik geval zodra we zien wat nodig is.

Het bestand waar ik mee bezig ben heet "detects.csv De eerste stap is om een .db bestand aan te maken dat naar dit bestand verwijst (in dit en wat volgt voor het gemak Ik zal altijd aannemen dat u werkt op het niveau dat nodig is, zodat ik niet geven volledige paden - in de praktijk zult u moeten) :

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

Het bestand  We kunnen controleren of dit heeft gewerkt:

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

en de grootte van de detectives. db is niet veranderd van deze bewerking. Dus de laatste stap is om dit te verbinden met ERDDAP™ , Ik toon alleen het deel dat nodig is om verbinding te maken met het bestand, niet alle variabele informatie:

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

En dit is de dataset in een ERDDAP™ op mijn laptop met de DuckDB connector:
