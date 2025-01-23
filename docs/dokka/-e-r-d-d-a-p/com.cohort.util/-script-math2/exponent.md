//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[exponent](exponent.md)

# exponent

[JVM]\
open fun [exponent](exponent.md)(d: Double): Double

This returns the double exponent of a double (e.g., -0.0175 returns 0.01 since -0.0175=-1.75*0.01). It handles 0, +, and - numbers. WARNING: round off problems cause 100 -&gt; 10 *10^1, not 1*10^2!

#### Return {#return}

the exponent of the number. d=0 returns 1. If !isFinite(d), this returns NaN.

#### Parameters {#parameters}

JVM

| | |
|---|---|
| d | a double value |