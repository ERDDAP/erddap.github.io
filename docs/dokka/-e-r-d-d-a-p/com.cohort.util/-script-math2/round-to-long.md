//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[roundToLong](round-to-long.md)

# roundToLong

[JVM]\
fun [roundToLong](round-to-long.md)(d: Double): Long

Safely rounds a double to a long.

#### Return

Long.MAX_VALUE if d is too small, too big, or NaN; otherwise d, rounded to the nearest int. Undesirable: d.5 rounds up for positive numbers, down for negative.

#### Parameters

JVM

| | |
|---|---|
| d | any double |