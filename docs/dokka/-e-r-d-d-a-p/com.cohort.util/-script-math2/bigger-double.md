//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[biggerDouble](bigger-double.md)

# biggerDouble

[JVM]\
open fun [biggerDouble](bigger-double.md)(def: Double, mult: Double, max: Double, d: Double): Double

This increases d to the next multiple of mult.

#### Return {#return}

the next multiple of mult bigger than d. It rounds to nearest mult, then changes it. If !Double.isFinite(d), it returns def.

#### Parameters {#parameters}

JVM

| | |
|---|---|
| def | the default value |
| mult | the multiple |
| max | the maximum value |
| d | the initial value |