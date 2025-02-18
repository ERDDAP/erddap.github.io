//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[smallerAngle](smaller-angle.md)

# smallerAngle

[JVM]\
open fun [smallerAngle](smaller-angle.md)(d: Double): Double

This decreases the double degree value (nicely).

#### Return {#return}

the previous multiple 15. It rounds to nearest mult, then changes it. If !Double.isFinite(d), it returns d.

#### Parameters {#parameters}

JVM

| | |
|---|---|
| d | the initial value |