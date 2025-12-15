Dette indhold er baseret på en [besked fra Roy Mendelssohn til te ERDDAP Brugere gruppe](https://groups.google.com/g/erddap/c/6Hl024ZGkes/m/DS5WzsydAQAJ) .

 ERDDAP™ forsøger at være engnosticering om, hvilke dataformater folk bruger til deres data, i stedet at forsøge at arbejde med de dataformater af mest brug til de samfund, vi hovedsageligt tjener. Som mere og mere arbejde er i skyen, og der er en overflod af dataformater, som folk bruger i skyen, ville det være rart, hvis ERDDAP™ kunne støtte en masse af disse formater. Aks, ERDDAP™ udvikling og vedligeholdelse er allerede under bemandet, og hvad ville være ønskeligt er at gøre brug af andres arbejde for at opnå dette mål, uden at skulle ændre ERDDAP™ .

Indtast Indtast Indtast Indtast [I nærheden af DuckDB](https://duckdb.org/) og og og [Trino](https://trino.io/) . Begge disse giver forbindelser til en række dataformater, og kan tilgås ved hjælp af JDBC. I denne skrivning vil jeg kun se på at bruge DuckDB, fordi jeg har nogle bekendte med det, og Trino mindst til mit sind, syntes lidt mere kompliceret at sætte op, og lige nu ville jeg bare have et bevis på koncept. (Et stykke tid tilbage Damien Smythe havde skrevet, at han havde sused ud af hvordan man bruger Trino og jeg kontaktede ham, og han fik det til at arbejde og sende mig noter - så mere på dette i fremtiden) . Jeg er også noget, men en ekspert på nogen af dette, så det lærer sammen med mig - lad mig vide, om du finder fejl, eller ting, der er uklare, eller hvis der er bedre måder at gøre tingene på.

1. Forudsætninger:
——————————————

For at bruge DuckDB i ERDDAP™ du er nødt til at installere andeDB på din computer, og til at installere AndDB JDBC stik til ERDDAP™ . Instruktioner om installation af DuckDB selv er på

https://duckdb.org/docs/installation/?version=stable&environment=cli&platform=macos&download_method=direct

The DuckDB JDBC stik kan downloades fra

https://duckdb.org/docs/stable/clients/java.html

Hvis din tomcat er placeret på $TOMCAT_HOME, så vil du sætte denne fil på $TOMCAT_HOME/webapps/erddap/WEB-INF/lib.

2. Det gør dette vanskeligt:
————————————————————————


Mindst for DuckDB (som jeg har sagt, at jeg ikke har kigget på Trino i alle detaljer)   Java Programmer kan kun få adgang til DuckDB via JDBC-stikket, og JDBC-stikket kan kun læse data, der er gemt i AndDB .db-format. Mens DuckDB er et godt værktøj, der skal kopiere dataene til dette format overvinder hele formålet, men DuckDB giver den facilitet, der for mange af de filformater, det understøtter (der er en voksende liste over udvidelser) Du kan oprette en virtuel .db-fil, der bare læser i de nødvendige metadata. Jeg har fundet .db, der er skabt til at være ret lille i størrelse, og giver hvad der synes at være hurtig adgang. En interessant note er, at i modsætning til de fleste databasesystemer (og herunder Trino) , med ro DB du ikke har et program, der konstant kører i baggrunden, så der skal være nogle lag i adgang på grund af opstart, men da jeg sagde i min lille test adgang synes speedy.


3. Et simpelt eksempel:
————————————————————

For at begynde, vil jeg se på, hvordan man gør dette med en .csv-fil. Korrekt, det er ikke, at interessant af en brugssag som ERDDAP™ allerede håndterer .csv-filer temmelig godt, så intet bliver opnået i den forstand, men en tekstfil er lettere at arbejde med og for at debug i at se, hvad der foregår, og som jeg lærte det gjorde mit liv lettere. Nedenfor vil jeg se på en mere interessant brugssag, når vi ser, hvad der er nødvendigt.

Den fil, jeg arbejder med, kaldes "detects.csv", som er en 305 MB fil med tagregistreringer af sensorer. Det første trin er at oprette en .db fil, der peger på denne fil (i dette og hvad der følger for bekvemmelighed, vil jeg altid antage, at du arbejder på det nødvendige niveau, så jeg ikke giver fulde stier - i praksis skal du være nødt til at) :

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

Filen “detects.db” er 268KB i størrelse. Vi kan kontrollere, at dette rent faktisk har arbejdet:

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

og størrelsen på detekter. db har ikke ændret sig fra at gøre denne operation. Så det sidste skridt er at forbinde dette med ERDDAP™ , Jeg viser kun den del, der er nødvendig for at oprette forbindelse til filen, ikke alle de variable oplysninger:

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

Og dette er datasættet i en ERDDAP™ på min bærbare computer ved hjælp af DuckDB-stikket:
