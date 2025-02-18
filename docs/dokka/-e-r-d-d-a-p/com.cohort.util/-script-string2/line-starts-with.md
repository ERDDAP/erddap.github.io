//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[lineStartsWith](line-starts-with.md)

# lineStartsWith

[JVM]\
open fun [lineStartsWith](line-starts-with.md)(ar: Array&lt;Any&gt;, s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): Int

This finds the first element in Object[] (starting at element 0) where the ar[i].toString value starts with s.

#### Return {#return}

the element number of ar which starts with s (or -1 if not found)

#### Parameters {#parameters}

JVM

| | |
|---|---|
| ar | the array of objects |
| s | the String to be found |

[JVM]\
open fun [lineStartsWith](line-starts-with.md)(ar: Array&lt;Any&gt;, s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), startAt: Int): Int

This finds the first element in Object[] (starting at element startAt) where the ar[i].toString value starts with s.

#### Return {#return-1}

the element number of ar which starts with s (or -1 if not found)

#### Parameters {#parameters-1}

JVM

| | |
|---|---|
| ar | the array of objects |
| s | the String to be found |
| startAt | the first element of ar to be checked. If startAt &lt;0, this starts with startAt = 0. |