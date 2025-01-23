//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[modifyToBeFileNameSafe](modify-to-be-file-name-safe.md)

# modifyToBeFileNameSafe

[JVM]\
open fun [modifyToBeFileNameSafe](modify-to-be-file-name-safe.md)(s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

This returns the string with just file-name-safe characters (0-9, A-Z, a-z, _, -, .). This is different from String2.encodeFileNameSafe -- this emphasizes readability, not avoiding losing information. Non-safe characters are converted to '_'. Adjacent '_' are collapsed into '_'. See posix fully portable file names at https://en.wikipedia.org/wiki/Filename . See javadocs for java.net.URLEncoder, which describes valid characters (but deals with encoding, whereas this method alters or removes). The result may be shorter than s. Note, this does not check for filenames that are too long (Windows has a path+fileName max length of 255 chars).

#### Return {#return}

s with all of the non-fileNameSafe characters removed or changed

#### Parameters {#parameters}

JVM

| | |
|---|---|
| s | If s is null, this returns &quot;_null&quot;. If s is &quot;&quot;, this returns &quot;_&quot;. |