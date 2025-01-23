//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[bigger](bigger.md)

# bigger

[JVM]\
open fun [bigger](bigger.md)(d: Double): Double

This increases the value (nicely).

#### Return {#return}

a number slightly larger than d. If !Double.isFinite(d), it returns d. If almost 0, it returns 0.01.

#### Parameters {#parameters}

JVM

| | |
|---|---|
| d | a double |