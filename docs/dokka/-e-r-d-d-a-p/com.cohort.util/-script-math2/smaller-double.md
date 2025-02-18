//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[smallerDouble](smaller-double.md)

# smallerDouble

[JVM]\
open fun [smallerDouble](smaller-double.md)(def: Double, mult: Double, min: Double, d: Double): Double

This decreases d to the previous multiple of mult.

#### Return

the next multiple of mult smaller than d. It rounds to nearest mult, then changes it. If !Double.isFinite(d), it returns def.

#### Parameters

JVM

| | |
|---|---|
| def | the default value |
| mult | the multiple |
| min | the minimum value |
| d | the initial value |