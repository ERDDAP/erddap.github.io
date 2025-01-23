//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[countAll](count-all.md)

# countAll

[JVM]\
open fun [countAll](count-all.md)(s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), findS: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): Int

This counts all occurrences of findS in s. if (s == null || findS == null || findS.length() == 0) return 0;

#### Parameters {#parameters}

JVM

| | |
|---|---|
| s | the source string |
| findS | the string to be searched for |

[JVM]\
open fun [countAll](count-all.md)(s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), findS: Char): Int

This counts all occurrences of findS in s. if (s == null || findS == null || findS.length() == 0) return 0;

#### Parameters {#parameters-1}

JVM

| | |
|---|---|
| s | the source string |
| findS | the char to be searched for |