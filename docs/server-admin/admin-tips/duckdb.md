This content is based on a [message from Roy Mendelssohn to the ERDDAP users group](https://groups.google.com/g/erddap/c/6Hl024ZGkes/m/DS5WzsydAQAJ).

ERDDAP™ tries to be agnostic about what data formats people use for their data, instead trying to work with the data formats of most use to the communities we mainly serve. As more and more work is in the cloud, and there are a plethora of data formats that people use in the cloud, it would be nice if ERDDAP™ could support a lot of these formats. Alas, ERDDAP™ development and maintenance is already understaffed, and what would be desirable is to make use of the work of others to achieve this goal, without having to modify ERDDAP™.

Enter [DuckDB](https://duckdb.org/) and [Trino](https://trino.io/). Both of these provide connections to a variety of data formats, and can be accessed using JDBC. In this writeup I will only look at using DuckDB because I have some familiarity with it, and Trino at least to my mind, seemed a little more complicated to set up, and right now I just wanted a proof of concept. (A while back Damien Smythe had written that he had sussed out how to use Trino and I contacted him and he did get it to work and will send me notes - so more on this in the future). Also I am anything but an expert on any of this, so this is learning along with me - let me know if you find any mistakes, or things that are unclear, or if there are better ways of doing things.

1. Preliminaries:
———————————

In order to use DuckDB in ERDDAP™ you need to install duckDB onto your computer, and to install the DuckDB JDBC connector into ERDDAP™. Instructions on installing DuckDB itself are at

https://duckdb.org/docs/installation/?version=stable&environment=cli&platform=macos&download_method=direct

The DuckDB JDBC connector can be downloaded from

https://duckdb.org/docs/stable/clients/java.html

If your tomcat is located at $TOMCAT_HOME, then you want to put this file at $TOMCAT_HOME/webapps/erddap/WEB-INF/lib.

2. What makes this tricky:
—————————————————


At least for DuckDB (as I have said I haven’t looked at Trino in any detail) Java programs can only access DuckDB through the JDBC connector, and the JDBC connector can only read data that are stored in the DuckDB .db format. While DuckDB is a great tool, having to copy the data to this format defeats the whole purpose, However, DuckDB provides the facility that for many of the file formats it supports (there is a growing list of extensions) you can set up a virtual .db file that just reads in the necessary metadata. I have found the .db that is created to be quite small in size, and provides what appears to be fast access. An interesting note is that unlike most database systems (and including Trino), with DuckDB you do not have an application that is constantly running in the background, so there must be some lag in access due to startup, but as I said in my small tests access seems speedy.


3. A simple example:
——————————————

To start, I will look at how to do this with a .csv file. Correct, this isn’t that interesting of a use case as ERDDAP™ already handles .csv files pretty well, so nothing is being gained in that sense, but a text file is easier to work with and to debug in seeing what is going on, and as I was learning this it made my life easier. Below I will look at a more interesting use case once we see what is needed.

The file I am working with is called “detects.csv” which is a 305MB file of tag detections by sensors. The first step is to create a .db file that points to this file (in this and what follows for convenience I will always assume you are working at the level needed so I do not give full paths - in practice you will have to):

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

The file “detects.db” is 268KB in size. We can check that this has actually worked:

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

and the size of detects.db has not changed from doing this operation. So the final step is to connect this with ERDDAP™, I show only the part needed to connect to the file, not all the variable information:

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

And this is the dataset in an ERDDAP™ on my laptop using the DuckDB connector: