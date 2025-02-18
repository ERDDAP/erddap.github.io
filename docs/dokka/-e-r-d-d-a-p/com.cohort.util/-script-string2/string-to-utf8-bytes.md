//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[stringToUtf8Bytes](string-to-utf8-bytes.md)

# stringToUtf8Bytes

[JVM]\
open fun [stringToUtf8Bytes](string-to-utf8-bytes.md)(s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): Array&lt;Byte&gt;

This returns the UTF-8 encoding of the string (or null if trouble). The inverse of this is utf8BytesToString. This won't throw an exception and returns ERROR (as bytes) if trouble.

#### Return {#return}

the byte[]. null in returns null. length=0 returns BAR_ZERO.