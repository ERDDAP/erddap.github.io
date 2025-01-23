//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[parseDouble](parse-double.md)

# parseDouble

[JVM]\
open fun [parseDouble](parse-double.md)(s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): Double

Convert a string to a double. Leading or trailing spaces are automatically removed. This accepts hexadecimal integers starting with &quot;0x&quot;. Whole number starting with '0' (e.g., 012) is treated as decimal (not octal as Java would). This won't throw an exception if the number isn't formatted right.

#### Return {#return}

the double value from the String (a finite value, Double.POSITIVE_INFINITY, Double.NEGATIVE_INFINITY, or Double.NaN if error).

#### Parameters {#parameters}

JVM

| | |
|---|---|
| s | is the String representation of a number. |