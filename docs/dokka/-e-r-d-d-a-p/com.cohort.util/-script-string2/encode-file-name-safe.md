//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[encodeFileNameSafe](encode-file-name-safe.md)

# encodeFileNameSafe

[JVM]\
open fun [encodeFileNameSafe](encode-file-name-safe.md)(s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

This is different from String2.modifyToBeFileNameSafe -- this encodes non-fileNameSafe characters so little or no information is lost.  This returns the string with just file-name-safe characters (0-9, A-Z, a-z, _, -, .).  'x' and non-safe characters are CONVERTED to 'x' plus their 2 lowercase hexadecimalDigit number or &quot;xx&quot; + their 4 hexadecimalDigit number.  See posix fully portable file names at https://en.wikipedia.org/wiki/Filename .  When the encoding is more than 25 characters, this stops encoding and adds &quot;xh&quot; and the hash code for the entire original string, so the result will always be less than ~41 characters. 

THIS WON'T BE CHANGED. FILE NAMES CREATED FOR EDDGridCopy and EDDTableCopy DEPEND ON SAME ENCODING OVER TIME.

#### Return {#return}

s with all of the non-fileNameSafe characters changed. If s is null, this returns &quot;x-1&quot;. If s is &quot;&quot;, this returns &quot;x-0&quot;.

#### Parameters {#parameters}

JVM

| |
|---|
| s |