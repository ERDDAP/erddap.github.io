//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[to0xHexString](to0x-hex-string.md)

# to0xHexString

[JVM]\
open fun [to0xHexString](to0x-hex-string.md)(i: Int, nHexDigits: Int): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

This returns the int formatted as a 0x hex String with at least nHexDigits, e.g., 0x00FF00. Negative numbers are twos compliment, e.g., -4 -&gt; 0xfffffffc.