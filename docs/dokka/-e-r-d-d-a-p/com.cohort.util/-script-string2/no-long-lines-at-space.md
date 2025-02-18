//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[noLongLinesAtSpace](no-long-lines-at-space.md)

# noLongLinesAtSpace

[JVM]\
open fun [noLongLinesAtSpace](no-long-lines-at-space.md)(s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), maxLength: Int, spaces: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

This is like noLongLines, but will only break at spaces.

#### Return {#return}

the content of s, but with no long lines

#### Parameters {#parameters}

JVM

| | |
|---|---|
| s | a String with multiple lines, separated by \n's |
| maxLength | the maximum line length allowed |
| spaces | the string to be inserted after the inserted newline, e.g., &quot; &quot; |