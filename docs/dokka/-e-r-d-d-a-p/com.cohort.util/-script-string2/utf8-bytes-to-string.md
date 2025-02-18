//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[utf8BytesToString](utf8-bytes-to-string.md)

# utf8BytesToString

[JVM]\
open fun [utf8BytesToString](utf8-bytes-to-string.md)(bar: Array&lt;Byte&gt;): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

This returns a string from the UTF-8 encoded byte[] (or ERROR if trouble). The inverse of this is stringToUtf8Bytes. This won't throw an exception unless bar is invalid and returns ERROR if trouble. null in returns null out.