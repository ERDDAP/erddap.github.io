//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptCalendar2](index.md)/[unitsSinceToEpochSeconds](units-since-to-epoch-seconds.md)

# unitsSinceToEpochSeconds

[JVM]\
open fun [unitsSinceToEpochSeconds](units-since-to-epoch-seconds.md)(baseSeconds: Double, factorToGetSeconds: Double, unitsSince: Double): Double

This converts a unitsSince value into epochSeconds. This properly handles 'special' factorToGetSeconds values (for month and year).

#### Return

seconds since 1970-01-01 (or NaN if unitsSince is NaN)

#### Parameters

JVM

| | |
|---|---|
| baseSeconds | from getTimeBaseAndFactor[0] |
| factorToGetSeconds | from getTimeBaseAndFactor[1] |
| unitsSince | a numeric time value in the source units |