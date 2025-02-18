//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[makeValidUnicode](make-valid-unicode.md)

# makeValidUnicode

[JVM]\
open fun [makeValidUnicode](make-valid-unicode.md)(s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), alsoOK: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

This makes s valid Unicode by converting invalid characters (e.g., #128) with \\uhhhh (literally 2 backslashes, so no info is lost). The invalid characters are often Windows charset characters #127 - 159.

#### Return {#return}

the valid Unicode string.

#### Parameters {#parameters}

JVM

| |
|---|
| s |
| alsoOK | a string with characters (e.g., \r, \n, \t) which are also valid |