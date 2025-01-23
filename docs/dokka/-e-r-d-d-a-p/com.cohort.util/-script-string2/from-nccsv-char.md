//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[fromNccsvChar](from-nccsv-char.md)

# fromNccsvChar

[JVM]\
open fun [fromNccsvChar](from-nccsv-char.md)(s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): Char

This converts an NCCSV encoded char to a true char (surrounding &quot;'s and ''s (if any) are removed and \\, \f, \n, \r, \t, \/, and \&quot; are unescaped). This is very liberal in what it accepts, including all common C escaped characters: http://msdn.microsoft.com/en-us/library/h21280bw%28v=vs.80%29.aspx

#### Return {#return}

the decoded char (or '?' if trouble) as a 1-char string.

#### Parameters {#parameters}

JVM

| | |
|---|---|
| s | it may be enclosed by &quot;'s and ''s, or not. |