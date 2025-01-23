//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptCalendar2](index.md)/[epochSecondsToLimitedIsoStringT](epoch-seconds-to-limited-iso-string-t.md)

# epochSecondsToLimitedIsoStringT

[JVM]\
open fun [epochSecondsToLimitedIsoStringT](epoch-seconds-to-limited-iso-string-t.md)(time_precision: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), seconds: Double, NaNString: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

This is like safeEpochSecondsToIsoStringT3Z, but returns a limited precision string. This won't throw an exception.

#### Return {#return}

the formatted time string (or NaNString if trouble)

#### Parameters {#parameters}

JVM

| | |
|---|---|
| time_precision | can be &quot;1970&quot;, &quot;1970-01&quot;, &quot;1970-01-01&quot;, &quot;1970-01-01T00Z&quot;, &quot;1970-01-01T00:00Z&quot;, &quot;1970-01-01T00:00:00Z&quot; (used if time_precision not matched), &quot;1970-01-01T00:00:00.0Z&quot;, &quot;1970-01-01T00:00:00.00Z&quot;, &quot;1970-01-01T00:00:00.000Z&quot;. Or any of those without &quot;Z&quot;. If time_precision ends in Z, the result will too. If time_precision doesn't end in Z, the result won't end in Z. Note that ERDDAP requires/forces/ensures any format with hours(min(sec)) to have Z. |
| seconds | the epochSeconds value |
| NaNString | the value to return if seconds is not finite or is too big. |