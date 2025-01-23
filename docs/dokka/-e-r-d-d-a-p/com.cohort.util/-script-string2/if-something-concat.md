//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[ifSomethingConcat](if-something-concat.md)

# ifSomethingConcat

[JVM]\
open fun [ifSomethingConcat](if-something-concat.md)(a: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), separator: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), b: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

This cleverly concatenates the 2 strings (with separator, as appropriate).

#### Return {#return}

a.trim(), a.trim()+separator+b.trim(), b.trim(), or &quot;&quot;

#### Parameters {#parameters}

JVM

| | |
|---|---|
| a | may be null or &quot;&quot; or something |
| separator | will only be used if a and b are something. |
| b | may be null or &quot;&quot; or something |