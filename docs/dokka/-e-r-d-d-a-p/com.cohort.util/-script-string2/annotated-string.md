//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[annotatedString](annotated-string.md)

# annotatedString

[JVM]\
open fun [annotatedString](annotated-string.md)(s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

This converts non-isPrintable characters to &quot;[#]&quot;. \\n generates both [10] and a newline character.

#### Return {#return}

s, but with non-32..126 characters replaced by [#]. The result ends with &quot;[end]&quot;. null returns &quot;[null][end]&quot;.

#### Parameters {#parameters}

JVM

| | |
|---|---|
| s | the string |