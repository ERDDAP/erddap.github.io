//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptCalendar2](index.md)/[tryToEpochSeconds](try-to-epoch-seconds.md)

# tryToEpochSeconds

[JVM]\
open fun [tryToEpochSeconds](try-to-epoch-seconds.md)(someDateTimeString: [String](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/String.html)): Double

This tries to figure out the format of someDateTimeString then parse the value and convert it to epochSeconds.

#### Return

epochSeconds (or Double.NaN if trouble);

#### Parameters

JVM

| | |
|---|---|
| someDateTimeString | a formatted time string |