//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[lineContaining](line-containing.md)

# lineContaining

[JVM]\
open fun [lineContaining](line-containing.md)(ar: Array&lt;Any&gt;, s: [String](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/String.html)): Int

This finds the first element in Object[] where the ar[i].toString value contains the substring s.

#### Return

the element number of ar which is equal to s (or -1 if not found)

#### Parameters

JVM

| | |
|---|---|
| ar | the array of objects |
| s | the String to be found |

[JVM]\
open fun [lineContaining](line-containing.md)(ar: Array&lt;Any&gt;, s: [String](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/String.html), startAt: Int): Int

This finds the first element in Object[] (starting at element startAt) where the ar[i].toString value contains the substring s.

#### Return

the element number of ar which is equal to s (or -1 if not found)

#### Parameters

JVM

| | |
|---|---|
| ar | the array of objects |
| s | the String to be found |
| startAt | the first element of ar to be checked. If startAt &lt;0, this starts with startAt = 0. |