//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[binaryFindFirstGE](binary-find-first-g-e.md)

# binaryFindFirstGE

[JVM]\
open fun [binaryFindFirstGE](binary-find-first-g-e.md)(sar: Array&lt;[String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)&gt;, s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): Int

Find the first element which is &gt;= s in an ascending sorted array.

#### Return {#return}

the index of the first element which is &gt;= s in an ascending sorted array. If s &lt;the smallest element, this returns 0. If s is null or s &gt;the largest element, this returns sar.length (no element is appropriate).

#### Parameters {#parameters}

JVM

| | |
|---|---|
| sar | an ascending sorted String[] which currently may not have duplicate values |
| s |