//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[fromNccsvString](from-nccsv-string.md)

# fromNccsvString

[JVM]\
open fun [fromNccsvString](from-nccsv-string.md)(s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

This converts an NCCSV string to a true string (surrounding &quot;'s (if any) are removed and \\, \f, \n, \r, \t, \/, and \&quot; are unescaped). This is very liberal in what it accepts, including all common C escaped characters: http://msdn.microsoft.com/en-us/library/h21280bw%28v=vs.80%29.aspx This won't throw an exception.

#### Return {#return}

the decoded string

#### Parameters {#parameters}

JVM

| | |
|---|---|
| s | it may be enclosed by &quot;'s, or not. |