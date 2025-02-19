//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[oneDigitBigger](one-digit-bigger.md)

# oneDigitBigger

[JVM]\
open fun [oneDigitBigger](one-digit-bigger.md)(max: Double, def: Double, d: Double): Double

This increases the first digit of d (for example, .8, .9, 1, 2, 3, ..., 9, 10, 20, 30, ...). It rounds to nearest single digit mantissa, then changes it. If !Double.isFinite(d), it returns def. If d = 0, it returns 1.

#### Return

d, rounded to a single digit mantissa and with the initial digit increased

#### Parameters

JVM

| | |
|---|---|
| max | the maximum value which may be returned |
| def | the default value, to be used if !isFinite |
| d | the initial value |