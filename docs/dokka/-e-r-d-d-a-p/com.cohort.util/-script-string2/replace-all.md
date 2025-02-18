//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[replaceAll](replace-all.md)

# replaceAll

[JVM]\
open fun [replaceAll](replace-all.md)(s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), oldS: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), newS: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

Returns a string where all occurences of oldS have been replaced with newS. If oldS occurs inside newS, it won't be replaced recursively (obviously).

#### Return {#return}

a modified version of s, with newS in place of all the olds.

#### Parameters {#parameters}

JVM

| | |
|---|---|
| s | the main string |
| oldS | the string to be searched for |
| newS | the string to replace oldS |

#### Throws {#throws}

| | |
|---|---|
| [RuntimeException](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/RuntimeException.html) | if s is null. |

[JVM]\
open fun [replaceAll](replace-all.md)(s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), oldCh: Char, newCh: Char): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

Returns a string where all occurences of oldCh have been replaced with newCh. This doesn't throw exceptions if bad values.