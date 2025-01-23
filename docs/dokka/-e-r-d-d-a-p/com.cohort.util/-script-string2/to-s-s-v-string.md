//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[toSSVString](to-s-s-v-string.md)

# toSSVString

[JVM]\
open fun [toSSVString](to-s-s-v-string.md)(ar: Array&lt;Any&gt;): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

Generates a space-separated-value string. 

WARNING: This is simplistic. It doesn't do anything special for strings with internal spaces.

#### Return {#return}

a SSV String with the values with &quot; &quot; after all but the last value. Returns null if ar is null. null elements are represented as &quot;[null]&quot;.

#### Parameters {#parameters}

JVM

| | |
|---|---|
| ar | an array of objects (for an ArrayList or Vector, use o.toArray()) |