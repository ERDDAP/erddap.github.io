//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[smaller](smaller.md)

# smaller

[JVM]\
open fun [smaller](smaller.md)(d: Double): Double

This decreases the value (nicely).

#### Return

a number slightly smaller than d. If !Double.isFinite(d), it returns d. If almost 0, it returns -0.01.

#### Parameters

JVM

| | |
|---|---|
| d | a double |