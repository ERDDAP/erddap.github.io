//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[quoteParameterIfNeeded](quote-parameter-if-needed.md)

# quoteParameterIfNeeded

[JVM]\
open fun [quoteParameterIfNeeded](quote-parameter-if-needed.md)(s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

For command line parameters, this returns toJson(s) if the string is empty or contains special characters or single or double quotes or backslash; otherwise it return s.