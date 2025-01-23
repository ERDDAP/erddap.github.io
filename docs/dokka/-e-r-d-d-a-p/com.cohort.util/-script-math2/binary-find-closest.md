//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[binaryFindClosest](binary-find-closest.md)

# binaryFindClosest

[JVM]\
open fun [binaryFindClosest](binary-find-closest.md)(dar: Array&lt;Double&gt;, x: Double): Int

Find the closest element to x in an ascending sorted array.

#### Return {#return}

the index of the index of the element closest to x. If x is NaN, this returns -1.

#### Parameters {#parameters}

JVM

| | |
|---|---|
| dar | an ascending sorted double[]. It the array has duplicates and x equals one of them, it isn't specified which duplicate's index will be returned. |
| x |