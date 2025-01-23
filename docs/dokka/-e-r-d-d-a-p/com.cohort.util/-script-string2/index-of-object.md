//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[indexOfObject](index-of-object.md)

# indexOfObject

[JVM]\
open fun [indexOfObject](index-of-object.md)(ar: Array&lt;Any&gt;, o: Any, startAt: Int): Int

This finds the first element in Object[] (starting at element startAt) where ar[i]==o.

#### Return {#return}

the element number of ar which is equal to s (or -1 if ar is null, or s is null or not found)

#### Parameters {#parameters}

JVM

| | |
|---|---|
| ar | the array of Objects |
| o | the String to be found |
| startAt | the first element of ar to be checked. If startAt &lt;0, this starts with startAt = 0. If startAt &gt;= ar.length, this returns -1. |

[JVM]\
open fun [indexOfObject](index-of-object.md)(ar: Array&lt;Any&gt;, o: Any): Int

A variant of indexOfObject() that uses startAt=0.