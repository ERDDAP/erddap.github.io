Tento obsah je založen na [Zpráva od Roye Mendelssohna ERDDAP skupina uživatelů](https://groups.google.com/g/erddap/c/6Hl024ZGkes/m/DS5WzsydAQAJ) .

 ERDDAP™ se snaží být agnostický o tom, jaké datové formáty lidé používají pro svá data, místo toho se snaží pracovat s datovými formáty většiny využití pro komunity, které sloužíme především. Vzhledem k tomu, že stále více práce je v cloudu, a existuje spousta datových formátů, které lidé používají v cloudu, bylo by pěkné, kdyby ERDDAP™ může podpořit mnoho těchto formátů. Bohužel, ERDDAP™ rozvoj a údržba je již málo personál, a co by bylo žádoucí, je využít práci ostatních k dosažení tohoto cíle, aniž by museli upravit ERDDAP™ .

Vstupte [KachnaDB](https://duckdb.org/) a [Trino](https://trino.io/) . Obojí poskytuje spojení s různými formáty dat a je přístupné pomocí JDBC. V tomto zápisu se budu dívat pouze na použití DuckDB, protože mám nějaké znalosti s ním, a Trino alespoň do mé mysli, zdálo trochu složitější nastavit, a právě teď jsem jen chtěl důkaz konceptu. (Před nějakou dobou Damien Smythe napsal, že vyšetřoval, jak použít Trino, a já jsem ho kontaktoval a on to donutil pracovat a pošle mi poznámky - takže více o tom v budoucnu) . Také jsem na cokoli jiného než odborník, takže se to učí společně se mnou - dejte mi vědět, pokud najdete nějaké chyby, nebo věci, které jsou nejasné, nebo pokud existují lepší způsoby, jak dělat věci.

1. Předběžné informace:
?

K použití DuckDB v ERDDAP™ musíte nainstalovat duckDB do počítače a nainstalovat DuckDB JDBC konektor do ERDDAP™ . Pokyny pro instalaci DuckDB samotné jsou na

https://duckdb.org/docs/installation/?version=stable&environment=cli&platform=macos&download_method=direct

DuckDB JDBC konektor lze stáhnout z

https://duckdb.org/docs/stable/clients/java.html

Pokud se Váš Tomcat nachází na $TOMCAT_HOME, pak chcete dát tento soubor na $TOMCAT_HOME / Webapps/erddap/WEB-INF/lib.

2. Co je na tom složitého?
?


Alespoň pro DuckDB (jak jsem řekl, jsem se podíval na Trino v každém detailu)   Java programy lze přistupovat pouze k DuckDB přes konektor JDBC a konektor JDBC může číst pouze data, která jsou uložena ve formátu DuckDB .db. Zatímco DuckDB je skvělý nástroj, musí zkopírovat data do tohoto formátu porazí celý účel, Nicméně, DuckDB poskytuje zařízení, které pro mnoho formátů souborů, které podporuje (Existuje rostoucí seznam rozšíření) můžete nastavit virtuální soubor .db, který jen čte v nezbytných metadatech. Našel jsem .db, který je vytvořen tak, aby byl poměrně malý ve velikosti, a poskytuje to, co se zdá být rychlý přístup. Zajímavá poznámka je, že na rozdíl od většiny databázových systémů (včetně Trina) , s Duckem DB nemáte aplikaci, která je neustále běží v pozadí, takže tam musí být nějaké zpoždění v přístupu kvůli spuštění, ale jak jsem řekl v mých malých testů přístup se zdá rychlý.


3. Jednoduchý příklad:
?

Pro začátek se podívám, jak to udělat se souborem .csv. Správně, to není to zajímavé použití případu jako ERDDAP™ Už zvládá soubory .csv docela dobře, takže v tomto smyslu není nic získáváno, ale textový soubor je jednodušší pracovat s a debugovat při pohledu, co se děje, a jak jsem se to učil, tak mi to usnadnilo život. Níže se podívám na zajímavější případ použití, jakmile uvidíme, co je potřeba.

Soubor, se kterým pracuji, se nazývá "detects.csv" což je 305MB soubor detekce štítků senzory. Prvním krokem je vytvořit soubor .db, který ukazuje na tento soubor (v tomto a co následuje pro pohodlí Budu vždy předpokládat, že pracujete na úrovni potřebné, takže nedávám plné cesty - v praxi budete muset) :

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

Soubor Detekts.db.1 je 268KB ve velikosti. Můžeme se ujistit, že to skutečně fungovalo:

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

a velikost detekcí. DB se od této operace nezměnila. Takže poslední krok je spojit to s ERDDAP™ , Ukazuji pouze část potřebná pro připojení k souboru, ne všechny proměnné informace:

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

A toto je datový soubor v ERDDAP™ na mém notebooku pomocí DuckDB konektoru:
