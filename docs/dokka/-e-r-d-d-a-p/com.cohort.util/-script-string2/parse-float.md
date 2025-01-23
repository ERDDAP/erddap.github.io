//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[parseFloat](parse-float.md)

# parseFloat

[JVM]\
open fun [parseFloat](parse-float.md)(s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): Float

Parse as a float with either &quot;.&quot; or &quot;,&quot; as the decimal point. Leading or trailing spaces are automatically removed.

#### Return {#return}

the corresponding float (or Float.NaN if not properly formatted)

#### Parameters {#parameters}

JVM

| | |
|---|---|
| s | a String representing a float value (e.g., 1234.5 or 1234,5 or 1.234e3 1,234e3) |