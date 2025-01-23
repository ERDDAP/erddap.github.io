//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[extractCaptureGroup](extract-capture-group.md)

# extractCaptureGroup

[JVM]\
open fun [extractCaptureGroup](extract-capture-group.md)(s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), regex: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), captureGroupNumber: Int): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

This returns the specified capture group from s.

#### Return {#return}

the value of the specified capture group in the first match of the regex, or null if the s doesn't match the regex

#### Parameters {#parameters}

JVM

| | |
|---|---|
| s | the source String |
| regex | the regular expression, see java.util.regex.Pattern, which matches part of s. |
| captureGroupNumber | the number of the capture group (0 for entire regex, 1 for first capture group, 2 for second, etc.) |

#### Throws {#throws}

| | |
|---|---|
| [RuntimeException](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/RuntimeException.html) | if trouble, e.g., invalid regex syntax |