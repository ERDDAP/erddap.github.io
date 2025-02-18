//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[roundingParseInt](rounding-parse-int.md)

# roundingParseInt

[JVM]\
open fun [roundingParseInt](rounding-parse-int.md)(s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): Double

Convert a string to an int, with rounding. Leading or trailing spaces are automatically removed. This won't throw an exception if the number isn't formatted right.

#### Return {#return}

the int value from the String (or Double.NaN if error).

#### Parameters {#parameters}

JVM

| | |
|---|---|
| s | is the String representation of a number. |