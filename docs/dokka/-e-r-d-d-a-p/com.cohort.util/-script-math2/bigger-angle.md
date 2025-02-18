//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[biggerAngle](bigger-angle.md)

# biggerAngle

[JVM]\
open fun [biggerAngle](bigger-angle.md)(d: Double): Double

This increases the double degrees value (nicely), and returns it as a string.

#### Return {#return}

the next multiple 15. It rounds to nearest mult, then changes it. If !Double.isFinite(d), it returns d.

#### Parameters {#parameters}

JVM

| | |
|---|---|
| d | the initial value |