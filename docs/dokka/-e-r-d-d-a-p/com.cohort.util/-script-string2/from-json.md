//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[fromJson](from-json.md)

# fromJson

[JVM]\
open fun [fromJson](from-json.md)(s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

This returns the unJSON version of a JSON string (surrounding &quot;'s (if any) are removed and \\, \f, \n, \r, \t, \/, and \&quot; are unescaped). This is very liberal in what it accepts, including all common C escaped characters: http://msdn.microsoft.com/en-us/library/h21280bw%28v=vs.80%29.aspx &quot;null&quot; returns the String &quot;null&quot;. null returns null. This won't throw an exception.

#### Return {#return}

the decoded string

#### Parameters {#parameters}

JVM

| | |
|---|---|
| s | it may be enclosed by &quot;'s, or not. |