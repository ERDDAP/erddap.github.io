//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[roundToUShort](round-to-u-short.md)

# roundToUShort

[JVM]\
fun [roundToUShort](round-to-u-short.md)(d: Double): Int

Safely rounds a double to a ushort.

#### Return

0xffff if d is too small, too big, or NaN; otherwise d, rounded to the nearest short. Undesirable: d.5 rounds up for positive numbers, down for negative.

#### Parameters

JVM

| | |
|---|---|
| d | any double |