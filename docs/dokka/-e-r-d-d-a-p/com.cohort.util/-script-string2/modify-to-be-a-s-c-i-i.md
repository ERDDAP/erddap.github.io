//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[modifyToBeASCII](modify-to-be-a-s-c-i-i.md)

# modifyToBeASCII

[JVM]\
open fun [modifyToBeASCII](modify-to-be-a-s-c-i-i.md)(s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

This converts the string to plain ascii (0..127). Diacritics are stripped off high ASCII characters. Some high ASCII characters are crudely converted to similar characters (the conversion is always character-for-character, so the string length will be unchanged). Other characters become '?'. The result will be the same length as s.

#### Return {#return}

the string converted to plain ascii (0..127).

#### Parameters {#parameters}

JVM

| |
|---|
| s |