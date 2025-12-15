Tá an t-ábhar seo bunaithe ar [teachtaireacht ó Roy Mendelssohn go dtí an ERDDAP web development](https://groups.google.com/g/erddap/c/6Hl024ZGkes/m/DS5WzsydAQAJ) .

 ERDDAP™ iarracht a bheith agnostic faoi na formáidí sonraí a úsáideann daoine as a gcuid sonraí, ina ionad sin ag iarraidh a bheith ag obair leis na formáidí sonraí an chuid is mó a úsáid do na pobail a bhfreastalaíonn muid go príomha. Mar go bhfuil níos mó agus níos mó oibre sa scamall, agus tá plethora na formáidí sonraí a úsáideann daoine sa scamall, bheadh sé deas má ERDDAP™ D'fhéadfadh tacaíocht a lán de na formáidí. Alas, ERDDAP™ Tá forbairt agus cothabháil faoi deara cheana féin, agus cad a bheadh inmhianaithe é a úsáid a bhaint as an obair daoine eile chun an sprioc seo a bhaint amach, gan a bheith a mhodhnú ERDDAP™ .

Cuir isteach [Diúscairt](https://duckdb.org/) agus [cliceáil grianghraf a mhéadú](https://trino.io/) . Soláthraíonn an dá cheann de na naisc le formáidí sonraí éagsúla, agus is féidir iad a rochtain ag baint úsáide as JDBC. Sa scríobhaí beidh mé ag breathnú ach ag baint úsáide as DuckDB toisc go bhfuil mé roinnt eolas leis, agus Trino ar a laghad le mo intinn, an chuma beagán níos casta a chur ar bun, agus ceart anois bhí mé díreach tar éis cruthúnas ar choincheap. (A agus ar ais Damien Smythe bhí scríofa go raibh sussed sé amach conas a úsáid Trino agus mé i dteagmháil leis agus rinne sé é a fháil a bheith ag obair agus beidh mé nótaí a sheoladh - mar sin níos mó ar seo sa todhchaí) . Chomh maith leis sin tá mé rud ar bith ach saineolaí ar aon cheann de seo, mar sin tá sé seo ag foghlaim chomh maith liom - in iúl dom má fhaigheann tú aon botúin, nó rudaí atá soiléir, nó má tá bealaí níos fearr chun rudaí a dhéanamh.

1. Réamhliminaries:
—————————————

Chun DuckDB a úsáid i ERDDAP™ ní mór duit duckDB a shuiteáil ar do ríomhaire, agus an cónascaire DuckDB JDBC a shuiteáil isteach ERDDAP™ . Treoracha ar shuiteáil DuckDB féin ag

https://duckdb.org/docs/installation/?version=stable&environment=cli&platform=macos&download_method=direct

Is féidir leis an DuckDB JDBC cónascaire a íoslódáil ó

https://duckdb.org/docs/stable/clients/java.html

Má tá do tomcat suite ag $ TOMCAT_HOME, ansin ba mhaith leat a chur ar an gcomhad ag $ TOMCAT_HOME / apps / erddap / WEB-INF /lib.

2. Cad a dhéanann an tricky:
—————————————————————————


Ar a laghad, DuckDB (mar a dúirt mé nach bhfuil mé d'fhéach sé ar Trino in aon mion)   Java Is féidir le cláir rochtain a fháil ach DuckDB tríd an cónascaire JDBC, agus is féidir leis an cónascaire JDBC léamh ach sonraí atá stóráilte i bhformáid DuckDB .db. Cé gur uirlis iontach é DuckDB, a bhfuil na sonraí a chóipeáil go dtí an fhormáid seo, cuireann DuckDB an cuspóir iomlán ar fáil, áfach, go bhfuil go leor de na formáidí comhaid a thacaíonn sé leo (tá liosta méadaitheach ann) is féidir leat a chur ar bun fíorúil .db comhad a léann ach sna meiteashonraí is gá. Fuair mé an .db go bhfuil cruthaithe a bheith beag go leor i méid, agus soláthraíonn sé cad is cosúil le rochtain go tapa. Is nóta suimiúil go murab ionann agus an chuid is mó córais bhunachar sonraí (agus lena n-áirítear Trino) , le Duck DB nach bhfuil tú iarratas atá ag rith i gcónaí sa chúlra, mar sin ní mór go mbeadh roinnt lag i rochtain mar gheall ar tosaithe, ach mar a dúirt mé i mo tástálacha beaga is cosúil rochtain tapaidh.


3. Sampla simplí:
————————————————

Chun tús a chur, beidh mé ag breathnú ar conas é seo a dhéanamh le .csv comhad. Ceart, nach bhfuil sé seo go suimiúil cás a úsáid mar ERDDAP™ Láimhseálann cheana .csv comhaid go leor go maith, mar sin tá aon rud á fháil sa chiall sin, ach tá comhad téacs níos éasca a bheith ag obair leis agus a debug i féachaint ar cad atá ar siúl, agus mar a bhí mé ag foghlaim seo a rinne sé mo shaol níos éasca. Thíos beidh mé ag breathnú ar chás úsáide níos suimiúla nuair a fheicimid cad atá ag teastáil.

Is é an comhad Tá mé ag obair le ar a dtugtar "detects.csv" a bhfuil comhad 305MB de bhrath chlib ag braiteoirí. Is é an chéad chéim a chruthú .db comhad a pointí leis an gcomhad seo (seo agus cad a leanas le haghaidh áise Beidh mé glacadh i gcónaí go bhfuil tú ag obair ar an leibhéal is gá mar sin ní féidir liom a thabhairt cosáin iomlán - i gcleachtas beidh ort a bheith) :

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

Is é an comhad "detects.db" 268KB i méid. Is féidir linn a sheiceáil go bhfuil sé seo ag obair i ndáiríre:

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

agus méid na mbraitheanna. db nach bhfuil athrú ó déanamh an oibríocht. Mar sin, is é an chéim deiridh seo a nascadh leis ERDDAP™ , Léiríonn mé ach an chuid is gá chun ceangal leis an gcomhad, ní léir an t-eolas athraitheach:

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

Agus is é seo an tacar sonraí i ERDDAP™ ar mo ríomhaire glúine ag baint úsáide as an DuckDB cónascaire:
