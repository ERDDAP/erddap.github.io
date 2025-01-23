//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptCalendar2](index.md)/[parseToEpochSeconds](parse-to-epoch-seconds.md)

# parseToEpochSeconds

[JVM]\
open fun [parseToEpochSeconds](parse-to-epoch-seconds.md)(sourceTime: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), dateTimeFormat: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), timeZoneString: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): Double

This converts a sourceTime string into a double with epochSeconds.

#### Return {#return}

the epochSeconds value or NaN if trouble

#### Parameters {#parameters}

JVM

| | |
|---|---|
| sourceTime | a formatted time string |
| dateTimeFormat | See https://erddap.github.io/setupDatasetsXml.html#string-time-units |
| timeZoneString | For a list of valid timezone ID's, see the &quot;TZ database names&quot; column in the table at https://en.wikipedia.org/wiki/List_of_tz_database_time_zones . If this is null or &quot;&quot;, Zulu will be used. |

[JVM]\
open fun [parseToEpochSeconds](parse-to-epoch-seconds.md)(sourceTime: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), dateTimeFormat: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): Double

A variant of parseToEpochSeconds that uses the Zulu time zone.

#### Return {#return-1}

the epochSeconds value or NaN if trouble

#### Parameters {#parameters-1}

JVM

| | |
|---|---|
| sourceTime | a formatted time string |
| dateTimeFormat | See https://erddap.github.io/setupDatasetsXml.html#string-time-units |