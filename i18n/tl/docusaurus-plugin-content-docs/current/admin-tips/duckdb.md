Ang nilalamang ito ay batay sa isang [mensahe mula kay Roy Mendelssohn hanggang sa ERDDAP grupong gumagamit](https://groups.google.com/g/erddap/c/6Hl024ZGkes/m/DS5WzsydAQAJ) .

 ERDDAP™ ay nagsisikap na maging agnostiko tungkol sa kung anong data formats ang ginagamit ng mga tao para sa kanilang datos, sa halip ay sinisikap na gamitin ang mga data format na pinakamadalas gamitin sa mga komunidad na pangunahin nating pinaglilingkuran. Habang parami nang paraming trabaho ang nasa ulap, at maraming data format na ginagamit ng mga tao sa ulap, maganda sana kung ERDDAP™ ang marami sa mga format na ito. Aba, ERDDAP™ Ang pagpapaunlad at pagmamantini ay hindi na gaanong ginagamit, at ang kanais - nais ay gamitin ang gawain ng iba upang makamit ang tunguhing ito, nang hindi na kailangan pang baguhin ERDDAP™ .

Pumasok [DIckDB](https://duckdb.org/) at [Trino](https://trino.io/) . Ang dalawang ito ay nagbibigay ng mga koneksiyon sa iba't ibang format ng datos, at maaaring ma-access gamit ang JDBC. Sa pagsulat na ito ay titingnan ko lamang ang paggamit ng DuckDB sapagkat medyo pamilyar ako rito, at si Trino sa paano man sa aking isipan, ay waring mas masalimuot ngayon, at nais ko lamang patunayan ang aking ideya. (Noong nakaraan si Damien Smythe ay sumulat na siya'y nagsumite kung paano namin gagamitin ang Trino at ako'y nakipag - ugnayan sa kaniya at naipasok niya ito sa trabaho at ako'y padalhan ng mga nota - higit pa tungkol dito sa hinaharap) . Ako rin ay isang dalubhasa sa alinman dito, kaya't ito ay ang pag-aaral kasama ako - malaman mo kung may nakita kang anumang pagkakamali, o mga bagay na hindi malinaw, o kung may mas mabuting paraan ng paggawa ng mga bagay.

1. Mga Preliminaryo:
— Eipioxioisensiyaić

Upang magamit ang DuckDB ERDDAP™ Kailangan mong maglagay ng topDB sa iyong computer, at i-install ang DuckDB JDBC linkor ERDDAP™ . Ang mga tagubilin tungkol sa pagkakabit ng DuckDB mismo ay nasa

https://duckdb.org/docs/installation/?version=stable&environment=cli&platform=macos&download_method=direct

Ang DuckDB JDBC connektor ay maaaring i-download mula sa

https://duckdb.org/docs/stable/clients/java.html

Kung ang iyong tomcat ay nasa $TOMCAT_HOME, kung gayon ay nais mong ilagay ang file na ito sa $TOMCAT_HOME/webapps/erddap/WEB-INF/lib.

2. Ano ang gumagawa ritong mapandaya:
— Eipioximanificitificitixić


Sa paano man para sa DuckDB (gaya ng sinabi ko nang tiningnan ko ang Trino sa anumang detalye)   Java Ang mga programa ay maaari lamang mag-akses ng DuckDB sa pamamagitan ng JDBC connektor, at ang JDBC connektor ay maaari lamang magbasa ng datos na naka-imbak sa DuckDB .db format. Bagaman ang DuckDB ay isang malaking kasangkapan, ang paggaya ng impormasyon sa format na ito ay sumisira sa buong layunin, gayunman, ang DuckDB ay nagbibigay ng pasilidad na sinusuportahan nito para sa maraming file format (may dumaraming listahan ng mga karugtong) Maaari kang maglagay ng isang birtuwal na .db file na mababasa lamang sa kinakailangang metadata. Nasumpungan ko ang .db na nilikha na napakaliit, at naglalaan ng waring mabilis na makukuha. Kapansin - pansin na di - gaya ng karamihan sa mga sistema ng database (at kasama ang Trino) , kasama si Duck Ang DB ay walang aplikasyon na laging nasa likuran, kaya dapat na may lag sa pag - access dahil sa startup, subalit gaya ng sabi ko sa aking maliit na pagsusulit ay waring mabilis.


3. Isang simpleng halimbawa:
— Eiperimentićificitixić

Bilang pasimula, titingnan ko kung paano ito gagawin sa pamamagitan ng .csv file. Tama naman, ito ang dahilan kung bakit kawili - wili ang isang kaso ng paggamit na gaya ng ERDDAP™ mga hawakan na .csv files maganda maganda, kaya walang nakukuha sa ganoong diwa, ngunit ang isang file ng teksto ay mas madaling pagtrabahuin at i-debug sa pag-unawa ng kung ano ang nangyayari, at habang natututuhan ko ito ay mas madali ang aking buhay. Sa ibaba ay titingnan ko ang isang mas kawili - wiling gamit na case minsang makita natin kung ano ang kinakailangan.

Ang talaksang pinagtatrabahuhan ko ay tinatawag na “detects.csvić na isang 305MB na talaksan ng mga pagtutop ng tag sa pamamagitan ng sensors. Ang unang hakbang ay ang paglikha ng talaksang .db na tumuturo sa talaksang ito (sa bagay na ito at kung ano ang kasunod nito para sa kaginhawahan ay lagi kong iisipin na ikaw ay nagtatrabaho sa antas na kinakailangan upang hindi ako magbigay ng ganap na pag - uugali na kailangan mong gawin) :

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

Ang talaksang “detects.db” ay 268KB ang laki. Maaari nating suriin na ito ay aktuwal na gumagana:

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

at laki ng mga deteksiyon. Hindi nagbago ang db sa paggawa ng operasyong ito. Kaya ang huling hakbang ay iugnay ito sa ERDDAP™ , ipinakikita ko lamang ang bahaging kailangan upang maiugnay sa talaksan, hindi ang lahat ng iba't ibang impormasyon:

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

At ito ang dataset sa isang dataset ERDDAP™ sa aking laptop gamit ang DuckDB linkor:
