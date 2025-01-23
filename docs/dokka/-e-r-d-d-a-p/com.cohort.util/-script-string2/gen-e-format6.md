//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[genEFormat6](gen-e-format6.md)

# genEFormat6

[JVM]\
open fun [genEFormat6](gen-e-format6.md)(d: Double): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

This returns the number formatted with up to 6 digits to the left and right of the decimal and trailing decimal 0's removed. If abs(d) &lt;0.0999995 or abs(d) &gt;= 999999.9999995, the number is displayed in scientific notation (e.g., 8.954321E-5). Thus the maximum length should be 14 characters (-123456.123456). 0 returns &quot;0&quot; NaN returns &quot;NaN&quot;. Double.POSITIVE_INFINITY returns &quot;Infinity&quot;. Double.NEGATIVE_INFINITY returns &quot;-Infinity&quot;.

#### Return {#return}

the number converted to a string

#### Parameters {#parameters}

JVM

| | |
|---|---|
| d | a number |