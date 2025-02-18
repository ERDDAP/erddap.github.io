//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[roundToShort](round-to-short.md)

# roundToShort

[JVM]\
fun [roundToShort](round-to-short.md)(d: Double): Short

Safely rounds a double to a short.

#### Return

Short.MAX_VALUE if d is too small, too big, or NaN; otherwise d, rounded to the nearest short. Undesirable: d.5 rounds up for positive numbers, down for negative.

#### Parameters

JVM

| | |
|---|---|
| d | any double |