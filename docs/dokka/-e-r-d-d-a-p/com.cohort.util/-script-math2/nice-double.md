//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[niceDouble](nice-double.md)

# niceDouble

[JVM]\
fun [niceDouble](nice-double.md)(d: Double, nDigits: Int): Double

Safely tries to un-bruise a double (8.999999999 -&gt; 9.0, or 1.000000001 -&gt; 1.0). 

- nDigits specifies how many digits. Use 7 for converting float to double. Use 11 for converting 6byte real to double.
- nGoodDigits afterward is ~ 22-nDigits.

#### Parameters {#parameters}

JVM

| | |
|---|---|
| d | a double (often bruised) |
| nDigits | the desired number of significant digits |