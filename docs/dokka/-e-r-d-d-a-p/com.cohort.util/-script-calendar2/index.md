//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptCalendar2](index.md)

# ScriptCalendar2

[JVM]\
open class [ScriptCalendar2](index.md)

This class makes some of the static methods in com.cohort.Calendar2 accessible to JexlScript scripts as &quot;Calendar2.*name*()&quot; methods. 

The underlying Calendar2 class is Copyright (c) 2005 Robert Simons (CoHortSoftware@gmail.com). See the MIT/X-like license in com/cohort/util/LICENSE.txt.

#### Author {#author}

Bob Simons (was bob.simons@noaa.gov, now BobSimons2.00@gmail.com) 2019-11-20

## Constructors {#constructors}

| | |
|---|---|
| [ScriptCalendar2](-script-calendar2-constructor.md) | [JVM]<br/>constructor() |

## Properties {#properties}

| Name | Summary |
|---|---|
| [AM_PM](-a-m_-p-m.md) | [JVM]<br/>val [AM_PM](-a-m_-p-m.md): Int = 9 |
| [BC](-b-c.md) | [JVM]<br/>val [BC](-b-c.md): Int = 0 |
| [DATE](-d-a-t-e.md) | [JVM]<br/>val [DATE](-d-a-t-e.md): Int = 5<br/>1.. |
| [DAY_OF_YEAR](-d-a-y_-o-f_-y-e-a-r.md) | [JVM]<br/>val [DAY_OF_YEAR](-d-a-y_-o-f_-y-e-a-r.md): Int = 6 |
| [DST_OFFSET](-d-s-t_-o-f-f-s-e-t.md) | [JVM]<br/>val [DST_OFFSET](-d-s-t_-o-f-f-s-e-t.md): Int = 16<br/>in millis |
| [ERA](-e-r-a.md) | [JVM]<br/>val [ERA](-e-r-a.md): Int = 0<br/>These are the fields in a Calendar or GregorianCalendar object. |
| [HOUR](-h-o-u-r.md) | [JVM]<br/>val [HOUR](-h-o-u-r.md): Int = 10<br/>0.. |
| [HOUR_OF_DAY](-h-o-u-r_-o-f_-d-a-y.md) | [JVM]<br/>val [HOUR_OF_DAY](-h-o-u-r_-o-f_-d-a-y.md): Int = 11<br/>0.. |
| [MILLISECOND](-m-i-l-l-i-s-e-c-o-n-d.md) | [JVM]<br/>val [MILLISECOND](-m-i-l-l-i-s-e-c-o-n-d.md): Int = 14 |
| [MINUTE](-m-i-n-u-t-e.md) | [JVM]<br/>val [MINUTE](-m-i-n-u-t-e.md): Int = 12 |
| [MONTH](-m-o-n-t-h.md) | [JVM]<br/>val [MONTH](-m-o-n-t-h.md): Int = 2<br/>Jan=0, ... |
| [SECOND](-s-e-c-o-n-d.md) | [JVM]<br/>val [SECOND](-s-e-c-o-n-d.md): Int = 13 |
| [YEAR](-y-e-a-r.md) | [JVM]<br/>val [YEAR](-y-e-a-r.md): Int = 1 |
| [ZONE_OFFSET](-z-o-n-e_-o-f-f-s-e-t.md) | [JVM]<br/>val [ZONE_OFFSET](-z-o-n-e_-o-f-f-s-e-t.md): Int = 15<br/>in millis |

## Functions {#functions}

| Name | Summary |
|---|---|
| [clearSmallerFields](clear-smaller-fields.md) | [JVM]<br/>open fun [clearSmallerFields](clear-smaller-fields.md)(epochSeconds: Double, field: Int): Double<br/>This clears the fields smaller than 'field' (e.g., HOUR_OF_DAY clears MINUTE, SECOND, and MILLISECOND, but doesn't change HOUR_OF_DAY, MONTH, or YEAR). |
| [epochSecondsToLimitedIsoStringT](epoch-seconds-to-limited-iso-string-t.md) | [JVM]<br/>open fun [epochSecondsToLimitedIsoStringT](epoch-seconds-to-limited-iso-string-t.md)(time_precision: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), seconds: Double, NaNString: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)<br/>This is like safeEpochSecondsToIsoStringT3Z, but returns a limited precision string. |
| [epochSecondsToUnitsSince](epoch-seconds-to-units-since.md) | [JVM]<br/>open fun [epochSecondsToUnitsSince](epoch-seconds-to-units-since.md)(baseSeconds: Double, factorToGetSeconds: Double, epochSeconds: Double): Double<br/>This converts an epochSeconds value into a unitsSince value. |
| [format](format.md) | [JVM]<br/>open fun [format](format.md)(epochSeconds: Double, pattern: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), zone: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)<br/>This formats the epochSeconds time value using the pattern. |
| [getTimeBaseAndFactor](get-time-base-and-factor.md) | [JVM]<br/>open fun [getTimeBaseAndFactor](get-time-base-and-factor.md)(tsUnits: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), timeZone: [TimeZone](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/TimeZone.html)): Array&lt;Double&gt;<br/>This converts a string &quot;[units] since [isoDate]&quot; (e.g., &quot;minutes since 1985-01-01&quot;) into a baseSeconds (seconds since 1970-01-01) and a factor (&quot;minutes&quot; returns 60). |
| [parseToEpochSeconds](parse-to-epoch-seconds.md) | [JVM]<br/>open fun [parseToEpochSeconds](parse-to-epoch-seconds.md)(sourceTime: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), dateTimeFormat: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): Double<br/>A variant of parseToEpochSeconds that uses the Zulu time zone.<br/>[JVM]<br/>open fun [parseToEpochSeconds](parse-to-epoch-seconds.md)(sourceTime: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), dateTimeFormat: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), timeZoneString: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): Double<br/>This converts a sourceTime string into a double with epochSeconds. |
| [tryToEpochSeconds](try-to-epoch-seconds.md) | [JVM]<br/>open fun [tryToEpochSeconds](try-to-epoch-seconds.md)(someDateTimeString: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): Double<br/>This tries to figure out the format of someDateTimeString then parse the value and convert it to epochSeconds. |
| [tryToIsoString](try-to-iso-string.md) | [JVM]<br/>open fun [tryToIsoString](try-to-iso-string.md)(someDateTimeString: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)<br/>This tries to figure out the format of someDateTimeString then parse the value and convert to an ISO 8601 string with 'Z' at end. |
| [unitsSinceToEpochSeconds](units-since-to-epoch-seconds.md) | [JVM]<br/>open fun [unitsSinceToEpochSeconds](units-since-to-epoch-seconds.md)(baseSeconds: Double, factorToGetSeconds: Double, unitsSince: Double): Double<br/>This converts a unitsSince value into epochSeconds. |