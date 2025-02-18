//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[floatToDouble](float-to-double.md)

# floatToDouble

[JVM]\
fun [floatToDouble](float-to-double.md)(f: Double): Double

Safely converts a float to a double.

#### Return {#return}

an unbruised double (not xxxx999999 or xxxx000001). If f is NaN, this returns Double.NaN. If f is +-INFINITY, this returns Double.+-INFINITY.

#### Parameters {#parameters}

JVM

| | |
|---|---|
| f | a double or float |