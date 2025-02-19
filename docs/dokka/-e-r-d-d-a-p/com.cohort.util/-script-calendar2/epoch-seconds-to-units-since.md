//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptCalendar2](index.md)/[epochSecondsToUnitsSince](epoch-seconds-to-units-since.md)

# epochSecondsToUnitsSince

[JVM]\
open fun [epochSecondsToUnitsSince](epoch-seconds-to-units-since.md)(baseSeconds: Double, factorToGetSeconds: Double, epochSeconds: Double): Double

This converts an epochSeconds value into a unitsSince value. This properly handles 'special' factorToGetSeconds values (for month and year).

#### Return

a numeric time value in source units &quot;*units* since *baseTime*&quot;

#### Parameters

JVM

| | |
|---|---|
| baseSeconds | from getTimeBaseAndFactor[0] |
| factorToGetSeconds | from getTimeBaseAndFactor[1] |
| epochSeconds | seconds since 1970-01-01 (or NaN if epochSeconds is NaN) |