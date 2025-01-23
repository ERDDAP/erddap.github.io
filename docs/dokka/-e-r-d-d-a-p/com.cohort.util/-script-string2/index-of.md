//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[indexOf](index-of.md)

# indexOf

[JVM]\
open fun [indexOf](index-of.md)(iArray: Array&lt;Int&gt;, i: Int, fromIndex: Int): Int

Finds the first instance of i at or after fromIndex (0.. ) in iArray.

#### Return {#return}

The first instance of i. If not found, it returns -1.

#### Parameters {#parameters}

JVM

| |
|---|
| iArray |
| i | the int you want to find |
| fromIndex | the index number of the position to start the search |

[JVM]\
open fun [indexOf](index-of.md)(iArray: Array&lt;Int&gt;, i: Int): Int

Finds the first instance of i in iArray.

#### Return {#return-1}

The first instance of i. If not found, it returns -1.

#### Parameters {#parameters-1}

JVM

| |
|---|
| iArray |
| i | the int you want to find |

[JVM]\
open fun [indexOf](index-of.md)(cArray: Array&lt;Char&gt;, c: Char, fromIndex: Int): Int

Finds the first instance of c at or after fromIndex (0.. ) in cArray.

#### Return {#return-2}

The first instance of c. If not found, it returns -1.

#### Parameters {#parameters-2}

JVM

| |
|---|
| cArray |
| c | the char you want to find |
| fromIndex | the index number of the position to start the search |

[JVM]\
open fun [indexOf](index-of.md)(cArray: Array&lt;Char&gt;, c: Char): Int

Finds the first instance of c in cArray.

#### Return {#return-3}

The first instance of c. If not found, it returns -1.

#### Parameters {#parameters-3}

JVM

| |
|---|
| cArray |
| c | the char you want to find |

[JVM]\
open fun [indexOf](index-of.md)(s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), car: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), fromIndex: Int): Int

This indexOf is a little different: it finds the first instance in s of any char in car.

#### Return {#return-4}

The first instance in s of any char in car. If not found, it returns -1.

#### Parameters {#parameters-4}

JVM

| | |
|---|---|
| s | a string |
| car | the chars you want to find any of |
| fromIndex | the index number of the position to start the search |

[JVM]\
open fun [indexOf](index-of.md)(dArray: Array&lt;Double&gt;, d: Double, fromIndex: Int): Int

Finds the first instance of d at or after fromIndex (0.. ) in dArray (tested with Math2.almostEqual5).

#### Return {#return-5}

The first instance of d. If not found, it returns -1.

#### Parameters {#parameters-5}

JVM

| |
|---|
| dArray |
| d | the double you want to find |
| fromIndex | the index number of the position to start the search |

[JVM]\
open fun [indexOf](index-of.md)(dArray: Array&lt;Double&gt;, d: Double): Int

Finds the first instance of d in dArray (tested with Math2.almostEqual5).

#### Return {#return-6}

The first instance of d. If not found, it returns -1.

#### Parameters {#parameters-6}

JVM

| |
|---|
| dArray |
| d | the double you want to find |

[JVM]\
open fun [indexOf](index-of.md)(ar: Array&lt;Any&gt;, s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): Int

This finds the first element in Object[] where the ar[i].toString value equals to s.

#### Return {#return-7}

the element number of ar which is equal to s (or -1 if ar is null, or s is null or not found)

#### Parameters {#parameters-7}

JVM

| | |
|---|---|
| ar | the array of Objects (Strings?) |
| s | the String to be found |

[JVM]\
open fun [indexOf](index-of.md)(ar: Array&lt;Any&gt;, s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), startAt: Int): Int

This finds the first element in Object[] (starting at element startAt) where the ar[i].toString value equals s.

#### Return {#return-8}

the element number of ar which is equal to s (or -1 if ar is null, or s is null or not found)

#### Parameters {#parameters-8}

JVM

| | |
|---|---|
| ar | the array of Objects |
| s | the String to be found |
| startAt | the first element of ar to be checked. If startAt &lt;0, this starts with startAt = 0. If startAt &gt;= ar.length, this returns -1. |