//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptCalendar2](index.md)/[getTimeBaseAndFactor](get-time-base-and-factor.md)

# getTimeBaseAndFactor

[JVM]\
open fun [getTimeBaseAndFactor](get-time-base-and-factor.md)(tsUnits: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), timeZone: [TimeZone](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/TimeZone.html)): Array&lt;Double&gt;

This converts a string &quot;[units] since [isoDate]&quot; (e.g., &quot;minutes since 1985-01-01&quot;) into a baseSeconds (seconds since 1970-01-01) and a factor (&quot;minutes&quot; returns 60).  So simplistically, epochSeconds = storedTime * factor + baseSeconds.  Or simplistically, storedTime = (epochSeconds - baseSeconds) / factor. 

WARNING: don't use the equations above. Use unitsSinceToEpochSeconds or epochSecondsToUnitsSince which correctly handle special cases.

#### Return {#return}

double[]&#123;baseSeconds, factorToGetSeconds&#125;

#### Parameters {#parameters}

JVM

| | |
|---|---|
| tsUnits | e.g., &quot;minutes since 1985-01-01&quot;. This may include hours, minutes, seconds, decimal, and Z or timezone offset (default=Zulu). This is lenient. |
| timeZone | Is a TimeZone from TimeZone.gettimeZone(id). For valid ID's, see the &quot;TZ database names&quot; column in the table at https://en.wikipedia.org/wiki/List_of_tz_database_time_zones If this is null, Zulu will be used. |

#### Throws {#throws}

| | |
|---|---|
| [RuntimeException](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/RuntimeException.html) | if trouble (tsUnits is null or invalid) |