//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[parseBooleanToInt](parse-boolean-to-int.md)

# parseBooleanToInt

[JVM]\
open fun [parseBooleanToInt](parse-boolean-to-int.md)(s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): Int

This converts a string to a boolean and then a Int.

#### Return {#return}

Integer.MAX_VALUE (i.e., missing value) if s is null or s is &quot;&quot;. Return 0 if s is &quot;false&quot;, &quot;f&quot;, or &quot;0&quot;. Return 1 if for all other values. Case and leading/trailing spaces don't matter.

#### Parameters {#parameters}

JVM

| | |
|---|---|
| s | the string |