//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[binaryFindFirstGE](binary-find-first-g-e.md)

# binaryFindFirstGE

[JVM]\
open fun [binaryFindFirstGE](binary-find-first-g-e.md)(dar: Array&lt;Double&gt;, x: Double): Int

Find the first element which is &gt;= x in an ascending sorted array. 

If firstGE &gt;lastLE, there are no matching elements (because the requested range is less than or greater than all the values, or between two adjacent values).

#### Return

the index of the first element which is &gt;= x in an ascending sorted array. If x &lt;the smallest element, this returns 0. If x &gt;the largest element, this returns dar.length (no element is appropriate). If x is NaN, this is currently undefined.

#### Parameters

JVM

| | |
|---|---|
| dar | an ascending sorted double[] which currently may not have duplicate values |
| x |