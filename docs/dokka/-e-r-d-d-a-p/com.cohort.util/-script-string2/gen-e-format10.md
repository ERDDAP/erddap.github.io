//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[genEFormat10](gen-e-format10.md)

# genEFormat10

[JVM]\
open fun [genEFormat10](gen-e-format10.md)(d: Double): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

This returns the number formatted with up to 10 digits to the left and right of the decimal and trailing decimal 0's removed. If abs(d) &lt;0.09999999995 or abs(d) &gt;= 999999.99999999995, the number is displayed in scientific notation (e.g., 8.9544680321E-5). Thus the maximum length should be 18 characters (-123456.1234567898). 0 returns &quot;0&quot; NaN returns &quot;NaN&quot;. Double.POSITIVE_INFINITY returns &quot;Infinity&quot;. Double.NEGATIVE_INFINITY returns &quot;-Infinity&quot;.

#### Return {#return}

the number converted to a string

#### Parameters {#parameters}

JVM

| | |
|---|---|
| d | a number |