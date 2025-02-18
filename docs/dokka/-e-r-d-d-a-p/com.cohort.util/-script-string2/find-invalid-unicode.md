//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[findInvalidUnicode](find-invalid-unicode.md)

# findInvalidUnicode

[JVM]\
open fun [findInvalidUnicode](find-invalid-unicode.md)(s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), alsoOK: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): Int

This returns the index of the first non-Unicode character. Currently, valid characters are #32 - #126, #160+.

#### Return {#return}

the index of the first non-utf-8 character, or -1 if all valid.

#### Parameters {#parameters}

JVM

| |
|---|
| s |
| alsoOK | a string with characters (e.g., \r, \n, \t) which are also valid |