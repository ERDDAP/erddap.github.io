这一内容基于 [罗伊·门德尔索恩致 ERDDAP 用户组](https://groups.google.com/g/erddap/c/6Hl024ZGkes/m/DS5WzsydAQAJ) 。 。 。 。

 ERDDAP™ 尝试对人们使用何种数据格式来获取数据进行不可知论,而是尝试与我们主要服务的社区使用的大部分数据格式合作。 随着越来越多的工作在云中进行,以及云中人们使用的数据格式繁多,如果 ERDDAP™ 可以支持许多这些格式。 唉哟 ERDDAP™ 发展和维持人员已经不足,最好利用他人的工作来实现这一目标,而不必修改。 ERDDAP™ 。 。 。 。

输入 [DuckDB 数据库](https://duckdb.org/) 和 [特里诺](https://trino.io/) 。 。 。 两者都提供各种数据格式的连接,并且可以使用JDBC访问. 在这封信里,我只考虑使用DuckDB, 因为我对它有些熟悉, 至少在我脑海里,Trino似乎更复杂一些。 现在我只是想证明一个概念。 (不久前,达米安·斯迈斯写道,他用Trino, 我联系他,他确实得到了它的工作,并且会寄给我笔记 - 所以以后更多关于这一点。) 。 。 。 我也只是其中的一位专家, 所以这正在与我一起学习—— 如果你们发现任何错误或事情不明, 或是否有更好的方法去做, 请告诉我。

1. 初步内容:
———————————

为了在其中使用 DuckDB ERDDAP™ 您需要将 DuckDB 安装到您的电脑上, 并安装 DuckDB JDBC 连接器 ERDDAP™ 。 。 。 关于安装 DuckDB 本身的指令 。

https://duckdb.org/docs/installation/?version=stable&environment=cli&platform=macos&download_method=direct

DuckDB JDBC 连接器可以从

https://duckdb.org/docs/stable/clients/java.html

如果您的 tomcat 位于 $TOMCAT_HOME, 那么您想要将此文件设置为 $TOMCAT_HOME/webapps/erddap/WEB-INF/lib 。

2. 是什么使这个棘手:
—————————————————


至少对 DuckDB 来说 (正如我说过的,我没有仔细地看Trino。)   Java 程序只能通过JDBC连接器访问DuckDB,JDBC连接器只能读取以DuckDB.db格式存储的数据. 虽然DuckDB是一个伟大的工具,但必须将数据复制到这种格式才能完全实现目的,但是DuckDB为它支持的许多文件格式提供了便利 (有越来越多的扩展列表) 您可以设置一个虚拟的 .db 文件,它只是读到必要的元数据。 我发现,创建的.db 相当小的尺寸, 提供看来是快速进入。 有趣的是,与大多数数据库系统不同 (包括特里诺) ,与鸭子 DB 您没有在背景中不断运行的应用程序,所以由于启动,访问一定有些滞后,但是正如我在小测试访问中所说的,似乎很快.


3. 一个简单的例子:
——————————————

首先,我将研究如何用 .csv 文件做到这一点。 对,这不是一个有趣的用例, ERDDAP™ 已经很好地处理.csv文件了, 所以从这个意义上说,没有获得任何好处, 但文本文件更容易工作, 并且更容易调试看到发生了什么, 下面我将看看一个更有趣的使用案例 一旦我们看到需要什么。

与我合作的文件称为“探测器.csv”,是传感器检测标记的305MB文件。 第一步是创建指向此文件的. db 文件 (为了方便起见,我永远认为你们的工作水平是必需的,所以我并没有给出完整的路径,实际上你们必须这样做。) 数字 :

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

文件“db”的尺寸为268KB。 我们可以检查这是否确实奏效:

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

还有探测器的大小 db没有改变。 所以,最后一步是连接到 ERDDAP™ ,我只显示连接文件所需的部分,而不是所有可变信息:

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

这是一个 ERDDAP™ 使用DuckDB连接器在我的笔记本电脑上:
