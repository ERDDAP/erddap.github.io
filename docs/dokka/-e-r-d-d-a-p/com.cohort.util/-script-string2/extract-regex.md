//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[extractRegex](extract-regex.md)

# extractRegex

[JVM]\
open fun [extractRegex](extract-regex.md)(s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), regex: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), fromIndex: Int): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

This returns the first section of s (starting at fromIndex) which matches regex. !!! Note that . in the regex doesn't match line terminators in s !!!

#### Return {#return}

the section of s which matches regex, or null if not found

#### Parameters {#parameters}

JVM

| | |
|---|---|
| s | the source String. |
| regex | the regular expression, see java.util.regex.Pattern. |
| fromIndex | the starting index in s |

#### Throws {#throws}

| | |
|---|---|
| [RuntimeException](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/RuntimeException.html) | if trouble |