//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[floatToDoubleNaN](float-to-double-na-n.md)

# floatToDoubleNaN

[JVM]\
fun [floatToDoubleNaN](float-to-double-na-n.md)(f: Double): Double

Crudely (not nicely) converts a float to a double (including the non-standard conversion of INFINITY values to NaN). See floatToDouble.

#### Return

a double. If f is NaN or +-INFINITY, this returns Double.NaN.

#### Parameters

JVM

| | |
|---|---|
| f | a float or double |