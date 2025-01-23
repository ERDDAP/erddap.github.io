//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptCalendar2](index.md)/[format](format.md)

# format

[JVM]\
open fun [format](format.md)(epochSeconds: Double, pattern: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), zone: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

This formats the epochSeconds time value using the pattern.

#### Return {#return}

the formatted time string (or &quot;&quot; if trouble)

#### Parameters {#parameters}

JVM

| |
|---|
| epochSeconds |
| pattern | see https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/time/format/DateTimeFormatter.html If pattern is null or &quot;&quot;, this uses the ISO TZ format with seconds precision. |
| zone | if null or &quot;&quot;, Zulu is used |