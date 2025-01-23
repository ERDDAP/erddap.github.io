//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[toHexCSSVString](to-hex-c-s-s-v-string.md)

# toHexCSSVString

[JVM]\
open fun [toHexCSSVString](to-hex-c-s-s-v-string.md)(ar: Array&lt;Byte&gt;): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

This generates a hexadecimal Comma-Space-Separated-Value (CSSV) String from the array. Negative numbers are twos compliment, e.g., -4 -&gt; 0xfc. 

CHANGED: before 2011-09-04, this was called toHexCSVString.

#### Return {#return}

a CSSV String (or null if ar is null)

#### Parameters {#parameters}

JVM

| | |
|---|---|
| ar | an array of bytes |

[JVM]\
open fun [toHexCSSVString](to-hex-c-s-s-v-string.md)(ar: Array&lt;Short&gt;): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

This generates a hexadecimal Comma-Space-Separated-Value (CSSV) String from the array. Negative numbers are twos compliment, e.g., -4 -&gt; 0xfffc. 

CHANGED: before 2011-09-04, this was called toHexCSVString.

#### Return {#return-1}

a CSSV String (or null if ar is null)

#### Parameters {#parameters-1}

JVM

| | |
|---|---|
| ar | an array of short |

[JVM]\
open fun [toHexCSSVString](to-hex-c-s-s-v-string.md)(ar: Array&lt;Int&gt;): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

This generates a hexadecimal Comma-Space-Separated-Value (CSSV) String from the array. Negative numbers are twos compliment, e.g., -4 -&gt; 0xfffffffc. 

CHANGED: before 2011-09-04, this was called toHexCSVString.

#### Return {#return-2}

a CSSV String (or null if ar is null)

#### Parameters {#parameters-2}

JVM

| | |
|---|---|
| ar | an array of ints |