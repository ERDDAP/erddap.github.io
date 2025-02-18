//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[mantissa](mantissa.md)

# mantissa

[JVM]\
open fun [mantissa](mantissa.md)(d: Double): Double

This returns the mantissa of a double (-0.0175 returns -1.75 since -0.0175=-1.75*10^-2). It handles 0, +, and - numbers. WARNING: round off problems can cause (for example) 100 to be treated 10 *10^1, not 1*10^2! 

See the similar String2.toRational()

#### Return {#return}

d / exponent(d) (or 0 if d=0, or NaN if !finite(d))

#### Parameters {#parameters}

JVM

| | |
|---|---|
| d | any double |