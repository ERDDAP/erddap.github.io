//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[binaryFindLastLE](binary-find-last-l-e.md)

# binaryFindLastLE

[JVM]\
open fun [binaryFindLastLE](binary-find-last-l-e.md)(dar: Array&lt;Double&gt;, x: Double): Int

Find the last element which is &lt;= x in an ascending sorted array. 

If firstGE &gt;lastLE, there are no matching elements (because the requested range is less than or greater than all the values, or between two adjacent values).

#### Return

the index of the last element which is &lt;= x in an ascending sorted array. If x &lt;the smallest element, this returns -1 (no element is appropriate). If x &gt;the largest element, this returns dar.length-1. If x is NaN, this is currently undefined.

#### Parameters

JVM

| | |
|---|---|
| dar | an ascending sorted double[] which may have duplicate values |
| x |