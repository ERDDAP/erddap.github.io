//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[toNewlineString](to-newline-string.md)

# toNewlineString

[JVM]\
open fun [toNewlineString](to-newline-string.md)(ar: Array&lt;Any&gt;): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

Generates a newline-separated string, with a newline at the end. 

WARNING: This is simplistic. It doesn't do anything special for strings with internal newlines.

#### Return {#return}

a String with the values, with a '\n' after each value, even the last. Returns null if ar is null. null elements are represented as &quot;[null]&quot;.

#### Parameters {#parameters}

JVM

| | |
|---|---|
| ar | an array of objects (for an ArrayList or Vector, use o.toArray()) |

[JVM]\
open fun [toNewlineString](to-newline-string.md)(ar: Array&lt;Int&gt;): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

This generates a newline-separated (always '\n') String from the array.

#### Return {#return-1}

a newline-separated String (or null if ar is null)

#### Parameters {#parameters-1}

JVM

| | |
|---|---|
| ar | an array of ints |

[JVM]\
open fun [toNewlineString](to-newline-string.md)(ar: Array&lt;Double&gt;): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

This generates a newline-separated (always '\n') String from the array.

#### Return {#return-2}

a newline-separated String (or null if ar is null)

#### Parameters {#parameters-2}

JVM

| | |
|---|---|
| ar | an array of double |