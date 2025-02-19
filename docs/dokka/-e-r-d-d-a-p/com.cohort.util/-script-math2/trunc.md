//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[trunc](trunc.md)

# trunc

[JVM]\
open fun [trunc](trunc.md)(d: Double): Double

This returns the truncated part of a double.

#### Return

d truncated. The return value will be the same sign as d. !isFinite(d), this returns NaN. d=trunc(d)+frac(d);

#### Parameters

JVM

| | |
|---|---|
| d | a double value |