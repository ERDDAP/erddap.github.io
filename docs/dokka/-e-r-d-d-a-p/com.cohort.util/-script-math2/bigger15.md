//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[bigger15](bigger15.md)

# bigger15

[JVM]\
open fun [bigger15](bigger15.md)(d: Double): Double

This increases the value (nicely) so the mantissa is 1 or 5.

#### Return

the next 1 or 5 * 10^x. It rounds to nearest 1 or 5, then changes it. If !Double.isFinite(d), it returns d. If almost0(d), it returns 0.01.

#### Parameters

JVM

| | |
|---|---|
| d | the initial value |