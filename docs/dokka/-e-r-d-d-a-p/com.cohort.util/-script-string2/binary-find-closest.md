//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[binaryFindClosest](binary-find-closest.md)

# binaryFindClosest

[JVM]\
open fun [binaryFindClosest](binary-find-closest.md)(sar: Array&lt;[String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)&gt;, s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): Int

Find the closest element to s in an ascending sorted array.

#### Return {#return}

the index of the element closest to s. If s is null, this returns -1.

#### Parameters {#parameters}

JVM

| | |
|---|---|
| sar | an ascending sorted String[]. It the array has duplicates and s equals one of them, it isn't specified which duplicate's index will be returned. |
| s |