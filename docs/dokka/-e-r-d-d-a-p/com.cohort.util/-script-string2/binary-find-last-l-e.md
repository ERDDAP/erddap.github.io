//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[binaryFindLastLE](binary-find-last-l-e.md)

# binaryFindLastLE

[JVM]\
open fun [binaryFindLastLE](binary-find-last-l-e.md)(sar: Array&lt;[String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)&gt;, s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): Int

Find the last element which is &lt;= s in an ascending sorted array.

#### Return {#return}

the index of the last element which is &lt;= s in an ascending sorted array. If s is null or s &lt;the smallest element, this returns -1 (no element is appropriate). If s &gt;the largest element, this returns sar.length-1.

#### Parameters {#parameters}

JVM

| | |
|---|---|
| sar | an ascending sorted String[] which may have duplicate values |
| s |