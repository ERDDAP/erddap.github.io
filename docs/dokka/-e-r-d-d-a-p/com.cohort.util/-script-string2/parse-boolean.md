//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[parseBoolean](parse-boolean.md)

# parseBoolean

[JVM]\
open fun [parseBoolean](parse-boolean.md)(s: [String](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/String.html)): Boolean

This converts a string to a boolean.

#### Return

false if s is &quot;false&quot;, &quot;f&quot;, or &quot;0&quot;. Case and leading/trailing spaces don't matter. All other values (and null) are treated as true.

#### Parameters

JVM

| | |
|---|---|
| s | the string |