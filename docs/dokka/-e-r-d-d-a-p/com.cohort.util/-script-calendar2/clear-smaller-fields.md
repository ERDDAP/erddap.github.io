//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptCalendar2](index.md)/[clearSmallerFields](clear-smaller-fields.md)

# clearSmallerFields

[JVM]\
open fun [clearSmallerFields](clear-smaller-fields.md)(epochSeconds: Double, field: Int): Double

This clears the fields smaller than 'field' (e.g., HOUR_OF_DAY clears MINUTE, SECOND, and MILLISECOND, but doesn't change HOUR_OF_DAY, MONTH, or YEAR).

#### Return {#return}

the new epochSeconds value (or NaN if trouble).

#### Parameters {#parameters}

JVM

| |
|---|
| epochSeconds |
| field | e.g., HOUR_OF_DAY |