//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[NaNCheck](-na-n-check.md)

# NaNCheck

[JVM]\
open fun [NaNCheck](-na-n-check.md)(d: Double): Double

Checks if the value is NaN or infinite: returns Double.NaN if so; otherwise returns the original value.

#### Return

d (or NaN if !isFinite(d))

#### Parameters

JVM

| | |
|---|---|
| d | and double value |