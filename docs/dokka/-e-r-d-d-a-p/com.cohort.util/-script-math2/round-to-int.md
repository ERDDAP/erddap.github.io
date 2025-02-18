//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[roundToInt](round-to-int.md)

# roundToInt

[JVM]\
fun [roundToInt](round-to-int.md)(d: Double): Int

Safely rounds a double to an int. (Math.round but rounds to a long and not safely.)

#### Return

Integer.MAX_VALUE if d is too small, too big, or NaN; otherwise d, rounded to the nearest int. Undesirable: d.5 rounds up for positive numbers, down for negative.

#### Parameters

JVM

| | |
|---|---|
| d | any double |