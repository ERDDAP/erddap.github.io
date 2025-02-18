//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[greaterThanAE](greater-than-a-e.md)

# greaterThanAE

[JVM]\
open fun [greaterThanAE](greater-than-a-e.md)(nSignificantDigits: Int, d1: Double, d2: Double): Boolean

This tests if d1 is greater than or almostEqual9 d2.

#### Return

true if d1 is greater than or almostEqual9 d2. If isNaN(d1) || isNaN(d2), this returns false.

#### Parameters

JVM

| | |
|---|---|
| nSignificantDigits | 0 to 18 are allowed; 5, 9, and 14 are common |
| d1 | the first number |
| d2 | the second number |