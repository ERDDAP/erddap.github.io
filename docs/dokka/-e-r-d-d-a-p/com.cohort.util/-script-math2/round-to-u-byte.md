//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[roundToUByte](round-to-u-byte.md)

# roundToUByte

[JVM]\
fun [roundToUByte](round-to-u-byte.md)(d: Double): Short

Safely rounds a double to a ubyte.

#### Return

255 if d is too small, too big, or NaN; otherwise d, rounded to the nearest byte. Undesirable: d.5 rounds up for positive numbers, down for negative.

#### Parameters

JVM

| | |
|---|---|
| d | any double |