//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[md5Hex12](md5-hex12.md)

# md5Hex12

[JVM]\
open fun [md5Hex12](md5-hex12.md)(password: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

This returns the last 12 hex digits from md5Hex (or null if md5 is null), broken into 3 blocks of 4 digits, separated by '_'. I use this as a short, easy to type, repeatable, representation of long strings (e.g., an ERDDAP query URL), sort of like the idea of tinyURL. It performs much better than hashcode or CRC32 when a large number of passwords (or filenames) are encoded and you don't want any collisions. See Projects.testHashFunctions.