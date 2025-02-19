//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[smaller15](smaller15.md)

# smaller15

[JVM]\
open fun [smaller15](smaller15.md)(d: Double): Double

This gets the double value from the string, decreases it (nicely), so the mantissa is 1 or 5.

#### Return

the next 1 or 5 * 10^x. It rounds to nearest 1 or 5, then changes it. If !Double.isFinite(d), it returns d. If almost0(d), it returns 0.01.

#### Parameters

JVM

| | |
|---|---|
| d | the initial value |