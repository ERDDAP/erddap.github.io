//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[roundToByte](round-to-byte.md)

# roundToByte

[JVM]\
fun [roundToByte](round-to-byte.md)(d: Double): Byte

Safely rounds a double to a byte.

#### Return

Byte.MAX_VALUE if d is too small, too big, or NaN; otherwise d, rounded to the nearest byte. Undesirable: d.5 rounds up for positive numbers, down for negative.

#### Parameters

JVM

| | |
|---|---|
| d | any double |