//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[toSVString](to-s-v-string.md)

# toSVString

[JVM]\
open fun [toSVString](to-s-v-string.md)(ar: Array&lt;Any&gt;, separator: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), finalSeparator: Boolean): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

This is used at a low level to generate a 'separator'-separated-value string (without newlines) with the element.toString()'s from the array.

#### Return {#return}

a separator-separated-value String. Returns null if ar is null. null elements are represented as &quot;[null]&quot;.

#### Parameters {#parameters}

JVM

| | |
|---|---|
| ar | an array of objects (for an ArrayList or Vector, use o.toArray()) |
| separator | the separator string |
| finalSeparator | if true, a separator will be added to the end of the resulting string (if it isn't &quot;&quot;). |