//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptCalendar2](index.md)/[tryToIsoString](try-to-iso-string.md)

# tryToIsoString

[JVM]\
open fun [tryToIsoString](try-to-iso-string.md)(someDateTimeString: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

This tries to figure out the format of someDateTimeString then parse the value and convert to an ISO 8601 string with 'Z' at end. This is the most flexible approach to parsing/cleaning a weird date time string.

#### Return {#return}

an iso8601String as a date, a dateTime with T and Z, or &quot;&quot; if trouble;

#### Parameters {#parameters}

JVM

| |
|---|
| someDateTimeString |