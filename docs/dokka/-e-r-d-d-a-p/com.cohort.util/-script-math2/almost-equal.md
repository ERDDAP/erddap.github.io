//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[almostEqual](almost-equal.md)

# almostEqual

[JVM]\
open fun [almostEqual](almost-equal.md)(nSignificantDigits: Int, d1: Double, d2: Double): Boolean

This tests if the numbers are equal to at least n significant digits. 

- Numbers must match to 1 part in 10^n to ensure that rounding to n-1 digits is identical.
- If d1 and d2 are almost0, this returns true.
- This is slow compared to almost0.

#### Return {#return}

true if the numbers are equal to at least n significant digits (or are both almost0). If either number is NaN or Infinity, this returns false.

#### Parameters {#parameters}

JVM

| | |
|---|---|
| nSignificantDigits | 0 to 18 are allowed; 5, 9, and 14 are common |
| d1 | any double |
| d2 | any double |

[JVM]\
open fun [almostEqual](almost-equal.md)(nSignificantDigits: Int, f1: Float, f2: Float): Boolean

This tests if two floats are equal to at least n significant digits.

#### Return {#return-1}

true if the numbers are equal to at least n significant digits (or are both almost0). If either number is NaN or Infinity, this returns false.

#### Parameters {#parameters-1}

JVM

| | |
|---|---|
| nSignificantDigits | 0 to 18 are allowed; 5, 9, and 14 are common |
| f1 | any float |
| f2 | any float |