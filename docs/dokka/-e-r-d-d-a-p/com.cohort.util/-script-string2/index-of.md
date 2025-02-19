//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[indexOf](index-of.md)

# indexOf

[JVM]\
open fun [indexOf](index-of.md)(iArray: Array&lt;Int&gt;, i: Int, fromIndex: Int): Int

Finds the first instance of i at or after fromIndex (0.. ) in iArray.

#### Return

The first instance of i. If not found, it returns -1.

#### Parameters

JVM

| |
|---|
| iArray |
| i | the int you want to find |
| fromIndex | the index number of the position to start the search |

[JVM]\
open fun [indexOf](index-of.md)(iArray: Array&lt;Int&gt;, i: Int): Int

Finds the first instance of i in iArray.

#### Return

The first instance of i. If not found, it returns -1.

#### Parameters

JVM

| |
|---|
| iArray |
| i | the int you want to find |

[JVM]\
open fun [indexOf](index-of.md)(cArray: Array&lt;Char&gt;, c: Char, fromIndex: Int): Int

Finds the first instance of c at or after fromIndex (0.. ) in cArray.

#### Return

The first instance of c. If not found, it returns -1.

#### Parameters

JVM

| |
|---|
| cArray |
| c | the char you want to find |
| fromIndex | the index number of the position to start the search |

[JVM]\
open fun [indexOf](index-of.md)(cArray: Array&lt;Char&gt;, c: Char): Int

Finds the first instance of c in cArray.

#### Return

The first instance of c. If not found, it returns -1.

#### Parameters

JVM

| |
|---|
| cArray |
| c | the char you want to find |

[JVM]\
open fun [indexOf](index-of.md)(s: [String](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/String.html), car: [String](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/String.html), fromIndex: Int): Int

This indexOf is a little different: it finds the first instance in s of any char in car.

#### Return

The first instance in s of any char in car. If not found, it returns -1.

#### Parameters

JVM

| | |
|---|---|
| s | a string |
| car | the chars you want to find any of |
| fromIndex | the index number of the position to start the search |

[JVM]\
open fun [indexOf](index-of.md)(dArray: Array&lt;Double&gt;, d: Double, fromIndex: Int): Int

Finds the first instance of d at or after fromIndex (0.. ) in dArray (tested with Math2.almostEqual5).

#### Return

The first instance of d. If not found, it returns -1.

#### Parameters

JVM

| |
|---|
| dArray |
| d | the double you want to find |
| fromIndex | the index number of the position to start the search |

[JVM]\
open fun [indexOf](index-of.md)(dArray: Array&lt;Double&gt;, d: Double): Int

Finds the first instance of d in dArray (tested with Math2.almostEqual5).

#### Return

The first instance of d. If not found, it returns -1.

#### Parameters

JVM

| |
|---|
| dArray |
| d | the double you want to find |

[JVM]\
open fun [indexOf](index-of.md)(ar: Array&lt;Any&gt;, s: [String](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/String.html)): Int

This finds the first element in Object[] where the ar[i].toString value equals to s.

#### Return

the element number of ar which is equal to s (or -1 if ar is null, or s is null or not found)

#### Parameters

JVM

| | |
|---|---|
| ar | the array of Objects (Strings?) |
| s | the String to be found |

[JVM]\
open fun [indexOf](index-of.md)(ar: Array&lt;Any&gt;, s: [String](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/String.html), startAt: Int): Int

This finds the first element in Object[] (starting at element startAt) where the ar[i].toString value equals s.

#### Return

the element number of ar which is equal to s (or -1 if ar is null, or s is null or not found)

#### Parameters

JVM

| | |
|---|---|
| ar | the array of Objects |
| s | the String to be found |
| startAt | the first element of ar to be checked. If startAt &lt;0, this starts with startAt = 0. If startAt &gt;= ar.length, this returns -1. |