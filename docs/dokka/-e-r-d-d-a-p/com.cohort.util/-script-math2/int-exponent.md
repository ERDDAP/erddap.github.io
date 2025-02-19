//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[intExponent](int-exponent.md)

# intExponent

[JVM]\
open fun [intExponent](int-exponent.md)(d: Double): Int

This returns the integer exponent of a double (-0.0175 returns -2 since -0.0175=-1.75*10^-2). It handles 0, +, and - numbers. 0 and NaN returns Integer.MAX_VALUE. WARNING: round off problems cause 100 -&gt; 10 *10^1, not 1*10^2! 

See the similar String2.toRational()

#### Return

the integer exponent of the number. If !isFinite(d), this returns Integer.MAX_VALUE d=0 returns 0.

#### Parameters

JVM

| | |
|---|---|
| d | a double value |