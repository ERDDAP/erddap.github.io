此內容基于 [羅伊·門德爾索恩致 ERDDAP 使用者群組](https://groups.google.com/g/erddap/c/6Hl024ZGkes/m/DS5WzsydAQAJ) .

 ERDDAP™ 試著忽略人們用於數據的資料格式, 越来越多的工作在云中, 和有很多數據格式 人們在云中使用, ERDDAP™ 可以支持很多這些格式。 唉 ERDDAP™ 發展與維持已經人手不足, ERDDAP™ .

輸入 [DuckDB 工具](https://duckdb.org/) 和 [翠野](https://trino.io/) . 兩者都提供各种數據格式的連接, 可以使用 JDBC 存取 。 在這篇文章中,我只會用DuckDB來看待,因為我對它有些熟悉,至少我覺得Trino似乎有點複雜, (達米安·斯麥斯回信說他用Trino 我和他聯繫了 他確實把它弄好了) . 我除了專家之外什麼都不懂 所以這也是與我同學的 如果你發現任何錯誤 或事情不明

1. 初步:
———————————

要在其中使用 DuckDB ERDDAP™ 您需要安裝 DuckDB 在您的電腦上, 並安裝 DuckDB JDBC 連接器 ERDDAP™ . 關於安裝 DuckDB 本身的指令已存在

https://duckdb.org/docs/installation/?version=stable&environment=cli&platform=macos&download_method=direct

DuckDB JDBC 連接器可以從中下載

https://duckdb.org/docs/stable/clients/java.html

如果您的 tomcat 位於 $TOMCAT_ HOME , 您要將此檔案放在 $TOMCAT_ HOME/webapps/erddap/WEB- INF/ lib 中 。

2. 是什么讓這變得棘手:
—————————————————


至少對 DuckDB 來說 (雖然我說過,)   Java 程式只能通過 JDBC 連接器存取 DuckDB, JDBC 連接器只能讀取以 DuckDB 格式儲存的資料 。 DuckDB 是個很棒的工具, 必須將資料複製到此格式才能完全失敗。 然而, DuckDB 提供了它所支持的很多檔案格式的便利 (延伸清單在增加) 您可以設定一個虛擬的 . db 檔案, 它只是讀取到必要的中繼資料 。 我發現製造的 . . . . 有趣的是 不像大多數數數據庫系統 (包括Trino) 與小鴨 DB 您沒有一個應用程式在背景中持續運作, 所以要啟動的話, 存取一定有些滞后, 但正如我在小測試中說的,


3. 一個簡單的例子:
——————————————

首先,我會研究如何用 .csv 檔案來做這個。 對, ERDDAP™ 已處理的. csv 檔案很不錯, 所以沒有什麼東西能從這方面獲得, 但文本檔案更容易工作, 下面我看看一個更有趣的使用案例 一旦我們看到需要什麼。

我所合作的檔案叫做「偵察器」, 第一步是建立指向此檔案的. db 文件 (為了方便,我永遠認為你的工作水平是必需的,所以我不會提供完整的道路——實際上,你將不得不) :

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

檔案「 detects. 我們可以檢查一下這是否有效:

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

和探測器的大小 db 的操作沒有改變 。 最後一步就是把這和 ERDDAP™ ,我只顯示與檔案連接需要的部分,而不是所有可變資訊:

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

這是一個 ERDDAP™ 使用 DuckDB 連結器:
