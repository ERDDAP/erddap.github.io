Dieser Inhalt basiert auf einer [Nachricht von Roy Mendelssohn an die ERDDAP Benutzergruppe](https://groups.google.com/g/erddap/c/6Hl024ZGkes/m/DS5WzsydAQAJ) .

 ERDDAP™ versucht, agnostisch zu sein, welche Datenformate die Menschen für ihre Daten verwenden, anstatt mit den Datenformaten der meisten Verwendung für die Gemeinschaften zu arbeiten, die wir hauptsächlich bedienen. Da immer mehr Arbeit in der Cloud ist, und es gibt eine Vielzahl von Datenformaten, die Menschen in der Cloud verwenden, wäre es schön, wenn ERDDAP™ könnte eine Menge dieser Formate unterstützen. Leider. ERDDAP™ Entwicklung und Wartung ist bereits unterbesetzt, und was wünschenswert wäre, ist, die Arbeit anderer zu nutzen, um dieses Ziel zu erreichen, ohne zu ändern ERDDAP™ .

Geben Sie [DuckDB](https://duckdb.org/) und [Trin](https://trino.io/) . Beide bieten Verbindungen zu einer Vielzahl von Datenformaten und können über JDBC aufgerufen werden. In dieser Aufzeichnung werde ich mich nur mit DuckDB betrachten, weil ich einige Vertrautheit mit ihm habe, und Trino zumindest meinem Verstand, schien etwas komplizierter zu eingerichtet, und im Moment wollte ich nur einen Beweis des Konzepts. (Damals hatte Damien Smythe geschrieben, dass er verklagt hatte, wie man Trino benutzt, und ich kontaktierte ihn und er bekam es zur Arbeit und schickt mich Notizen - so mehr dazu in der Zukunft) . Auch ich bin etwas anderes als ein Experte auf irgendeine von diesem, so dass das Lernen zusammen mit mir - lassen Sie mich wissen, ob Sie irgendwelche Fehler, oder Dinge, die unklar sind, oder wenn es bessere Möglichkeiten, Dinge zu tun.

1. Vorsorge:
————————

Um DuckDB in ERDDAP™ Sie müssen duckDB auf Ihrem Computer installieren und den DuckDB JDBC-Anschluss in ERDDAP™ . Anleitungen zur Installation von DuckDB selbst sind bei

https://duckdb.org/docs/installation/?version=stable&environment=cli&platform=macos&download_method=direct

Der DuckDB JDBC Stecker kann von

https://duckdb.org/docs/stable/clients/java.html

Wenn sich Ihr tomcat bei $TOMCAT_HOME befindet, dann möchten Sie diese Datei auf $TOMCAT_HOME/webapps/erddap/WEB-INF/lib setzen.

2. Was macht diesen Trick:
——————————


Zumindest für DuckDB (wie ich gesagt habe, habe ich Trino in keinem Detail angesehen)   Java Programme können nur auf DuckDB über den JDBC-Steckverbinder zugreifen, und der JDBC-Steckverbinder kann nur Daten lesen, die im DuckDB .db-Format gespeichert sind. Während DuckDB ein großartiges Tool ist, die Daten in dieses Format zu kopieren besiegt den gesamten Zweck, DuckDB bietet jedoch die Einrichtung, dass für viele der Dateiformate es unterstützt (es gibt eine wachsende Liste von Erweiterungen) Sie können eine virtuelle .db-Datei einrichten, die nur in den notwendigen Metadaten liest. Ich habe die .db gefunden, die erstellt wird, um ziemlich klein in der Größe zu sein, und bietet, was scheint schnell Zugriff zu sein. Eine interessante Anmerkung ist, dass im Gegensatz zu den meisten Datenbanksystemen (und einschließlich Trino) , mit Duck DB Sie haben keine Anwendung, die ständig im Hintergrund läuft, so muss es einige Verzögerung im Zugriff durch Start, aber wie ich sagte, in meinen kleinen Tests Zugang scheint schnell.


3. Ein einfaches Beispiel:
—————————

Zu Beginn werde ich mir ansehen, wie ich das mit einer .csv-Datei machen soll. Richtig, das ist nicht interessant für einen Anwendungsfall als ERDDAP™ schon handhabt .csv Dateien ziemlich gut, so dass nichts in diesem Sinne gewonnen wird, aber eine Textdatei ist einfacher zu arbeiten und zu debug beim Sehen, was vor sich geht, und da ich das lernte, machte es mein Leben einfacher. Im Folgenden werde ich einen interessanteren Anwendungsfall betrachten, sobald wir sehen, was nötig ist.

Die Datei, mit der ich arbeite, heißt "detects.csv", die eine 305MB-Datei mit Tag-Erkennungen durch Sensoren ist. Der erste Schritt ist, eine .db-Datei zu erstellen, die auf diese Datei verweist (in diesem und was folgt für Bequemlichkeit Ich werde immer davon ausgehen, dass Sie auf der erforderlichen Ebene arbeiten, damit ich nicht volle Wege gebe - in der Praxis müssen Sie) :

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

Die Datei „detects.db“ ist 268KB in der Größe. Wir können überprüfen, ob dies tatsächlich funktioniert hat:

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

und die Größe der Detekten. db hat sich bei dieser Operation nicht geändert. So ist der letzte Schritt, dies mit ERDDAP™ , Ich zeige nur den Teil, der zur Verbindung mit der Datei benötigt wird, nicht alle variablen Informationen:

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

Und das ist der Datensatz in einem ERDDAP™ auf meinem Laptop mit dem DuckDB-Anschluss:
