//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[looselyContains](loosely-contains.md)

# looselyContains

[JVM]\
open fun [looselyContains](loosely-contains.md)(s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), find: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): Boolean

This goes beyond indexOfIgnoreCase by looking after punctuation removed.

#### Return {#return}

true if find is loosely in s. Return false if s or find !isSomething.

#### Parameters {#parameters}

JVM

| |
|---|
| s |
| find |