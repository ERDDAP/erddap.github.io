//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[lineStartsWithIgnoreCase](line-starts-with-ignore-case.md)

# lineStartsWithIgnoreCase

[JVM]\
open fun [lineStartsWithIgnoreCase](line-starts-with-ignore-case.md)(ar: Array&lt;Any&gt;, s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): Int

This variant of lineStartsWith startsAt index=0.

#### Return {#return}

the element number of ar which starts with s (or -1 if not found)

#### Parameters {#parameters}

JVM

| | |
|---|---|
| ar | the array of objects, e.g., including LATITUDE |
| s | the String to be found, e.g., Lat |

[JVM]\
open fun [lineStartsWithIgnoreCase](line-starts-with-ignore-case.md)(ar: Array&lt;Any&gt;, s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), startAt: Int): Int

This is like lineStartsWith, but ignores case.

#### Return {#return-1}

the element number of ar which starts with s (or -1 if not found)

#### Parameters {#parameters-1}

JVM

| | |
|---|---|
| ar | the array of objects, e.g., including LATITUDE |
| s | the String to be found, e.g., Lat |
| startAt | the first element of ar to be checked. If startAt &lt;0, this starts with startAt = 0. |