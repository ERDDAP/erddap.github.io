//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[doubleToFloatNaN](double-to-float-na-n.md)

# doubleToFloatNaN

[JVM]\
fun [doubleToFloatNaN](double-to-float-na-n.md)(d: Double): Float

Safely converts a double to a float (including the non-standard conversion of large values to Float.NaN, not Float.POSITIVE_INFINITY).

#### Return {#return}

a float. If f is not finite or greater than Float.MAX_VALUE, this returns Float.NaN.

#### Parameters {#parameters}

JVM

| | |
|---|---|
| d | a double |