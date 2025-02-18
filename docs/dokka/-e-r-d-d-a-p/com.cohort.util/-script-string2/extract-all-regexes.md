//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[extractAllRegexes](extract-all-regexes.md)

# extractAllRegexes

[JVM]\
open fun [extractAllRegexes](extract-all-regexes.md)(s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), regex: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): Array&lt;[String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)&gt;

This returns all the sections of s that match regex. It assumes that the extracted parts don't overlap. !!! Note that . in the regex doesn't match line terminators in s !!!

#### Return {#return}

a String[] with all the matching sections of s (or String[0] if none)

#### Parameters {#parameters}

JVM

| | |
|---|---|
| s | the source String |
| regex | the regular expression, see java.util.regex.Pattern. Note that you often want to use the &quot;reluctant&quot; qualifiers which match as few chars as possible (e.g., ??, *?, +?) not the &quot;greedy&quot; qualifiers which match as many chars as possible (e.g., ?, *, +). |

#### Throws {#throws}

| | |
|---|---|
| [RuntimeException](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/RuntimeException.html) | if trouble |