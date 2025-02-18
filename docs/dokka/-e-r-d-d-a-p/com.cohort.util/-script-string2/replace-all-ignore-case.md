//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[replaceAllIgnoreCase](replace-all-ignore-case.md)

# replaceAllIgnoreCase

[JVM]\
open fun [replaceAllIgnoreCase](replace-all-ignore-case.md)(s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), oldS: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), newS: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

Returns a string where all occurences of oldS have been replaced with newS. If oldS occurs inside newS, it won't be replaced recursively (obviously). When finding oldS in s, their case is irrelevant.

#### Return {#return}

a modified version of s, with newS in place of all the olds. throws RuntimeException if s is null.

#### Parameters {#parameters}

JVM

| | |
|---|---|
| s | the main string |
| oldS | the string to be searched for |
| newS | the string to replace oldS |