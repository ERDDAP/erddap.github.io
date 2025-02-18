//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[toCSSVString](to-c-s-s-v-string.md)

# toCSSVString

[JVM]\
open fun [toCSSVString](to-c-s-s-v-string.md)(ar: Array&lt;Any&gt;): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

Generates a Comma-Space-Separated-Value (CSSV) string. 

CHANGED: before 2011-03-06, this didn't do anything special for strings with internal commas or quotes. Now it uses toJson for that string. 

CHANGED: before 2011-09-04, this was called toCSVString.

#### Return {#return}

a CSSV String with the values with &quot;, &quot; after all but the last value. Returns null if ar is null. null elements are represented as &quot;[null]&quot;.

#### Parameters {#parameters}

JVM

| | |
|---|---|
| ar | an array of objects |

[JVM]\
open fun [toCSSVString](to-c-s-s-v-string.md)(ar: Array&lt;Boolean&gt;): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

This generates a Comma-Space-Separated-Value (CSSV) String from the array. 

CHANGED: before 2011-09-04, this was called toCSVString.

#### Return {#return-1}

a CSSV String (or null if ar is null)

#### Parameters {#parameters-1}

JVM

| | |
|---|---|
| ar | an array of boolean |

[JVM]\
open fun [toCSSVString](to-c-s-s-v-string.md)(ar: Array&lt;Byte&gt;): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

This generates a Comma-Space-Separated-Value (CSSV) String from the array. 

CHANGED: before 2011-09-04, this was called toCSVString.

#### Return {#return-2}

a CSSV String (or null if ar is null)

#### Parameters {#parameters-2}

JVM

| | |
|---|---|
| ar | an array of bytes |

[JVM]\
open fun [toCSSVString](to-c-s-s-v-string.md)(ar: Array&lt;Char&gt;): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

This generates a Comma-Space-Separated-Value (CSSV) String from the array. (chars are treated as unsigned shorts). 

CHANGED: before 2011-09-04, this was called toCSVString.

#### Return {#return-3}

a CSSV String (or null if ar is null)

#### Parameters {#parameters-3}

JVM

| | |
|---|---|
| ar | an array of char |

[JVM]\
open fun [toCSSVString](to-c-s-s-v-string.md)(ar: Array&lt;Short&gt;): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

This generates a Comma-Space-Separated-Value (CSSV) String from the array. 

CHANGED: before 2011-09-04, this was called toCSVString.

#### Return {#return-4}

a CSSV String (or null if ar is null)

#### Parameters {#parameters-4}

JVM

| | |
|---|---|
| ar | an array of shorts |

[JVM]\
open fun [toCSSVString](to-c-s-s-v-string.md)(ar: Array&lt;Int&gt;): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

This generates a Comma-Space-Separated-Value (CSSV) String from the array. 

CHANGED: before 2011-09-04, this was called toCSVString.

#### Return {#return-5}

a CSSV String (or null if ar is null)

#### Parameters {#parameters-5}

JVM

| | |
|---|---|
| ar | an array of ints |

[JVM]\
open fun [toCSSVString](to-c-s-s-v-string.md)(ar: Array&lt;Long&gt;): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

This generates a Comma-Space-Separated-Value (CSSV) String from the array. 

CHANGED: before 2011-09-04, this was called toCSVString.

#### Return {#return-6}

a CSSV String (or null if ar is null)

#### Parameters {#parameters-6}

JVM

| | |
|---|---|
| ar | an array of longs |

[JVM]\
open fun [toCSSVString](to-c-s-s-v-string.md)(ar: Array&lt;Float&gt;): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

This generates a Comma-Space-Separated-Value (CSSV) String from the array. 

CHANGED: before 2011-09-04, this was called toCSVString.

#### Return {#return-7}

a CSSV String (or null if ar is null)

#### Parameters {#parameters-7}

JVM

| | |
|---|---|
| ar | an array of float |

[JVM]\
open fun [toCSSVString](to-c-s-s-v-string.md)(ar: Array&lt;Double&gt;): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

This generates a Comma-Space-Separated-Value (CSSV) String from the array. 

CHANGED: before 2011-09-04, this was called toCSVString.

#### Return {#return-8}

a CSSV String (or null if ar is null)

#### Parameters {#parameters-8}

JVM

| | |
|---|---|
| ar | an array of double |