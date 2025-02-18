//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[roundToUInt](round-to-u-int.md)

# roundToUInt

[JVM]\
fun [roundToUInt](round-to-u-int.md)(d: Double): Long

Safely rounds a double to a uint.

#### Return {#return}

4294967295L if d is too small, too big, or NaN; otherwise d, rounded to the nearest short. Undesirable: d.5 rounds up for positive numbers, down for negative.

#### Parameters {#parameters}

JVM

| | |
|---|---|
| d | any double |