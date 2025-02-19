//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[oneDigitSmaller](one-digit-smaller.md)

# oneDigitSmaller

[JVM]\
open fun [oneDigitSmaller](one-digit-smaller.md)(min: Double, def: Double, d: Double): Double

This decreases the first digit of d (for example, 30, 20, 10, 9, ..., 3, 2, 1, .9, .8, ...). It rounds to nearest single digit mantissa, then changes it. If !Double.isFinite(d), it returns def. If d = 0, it returns -1.

#### Return

d, rounded to a single digit mantissa and with the initial digit decreased

#### Parameters

JVM

| | |
|---|---|
| min | the minimum value which may be returned |
| def | the default value, to be used if !isFinite |
| d | the initial value |