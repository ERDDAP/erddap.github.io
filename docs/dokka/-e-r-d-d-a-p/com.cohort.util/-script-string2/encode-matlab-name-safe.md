//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[encodeMatlabNameSafe](encode-matlab-name-safe.md)

# encodeMatlabNameSafe

[JVM]\
open fun [encodeMatlabNameSafe](encode-matlab-name-safe.md)(s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

This is like encodeFileNameSafe, but further restricts the name to 

- first character must be A-Z, a-z.
- subsequent characters must be A-Z, a-z, _, 0-9.

 'x' and non-safe characters are CONVERTED to 'x' plus their 2 lowercase hexadecimalDigit number or &quot;xx&quot; + their 4 hexadecimalDigit number.  See posix fully portable file names at https://en.wikipedia.org/wiki/Filename .  When the encoding is more than 25 characters, this stops encoding and adds &quot;xh&quot; and the hash code for the entire original string, so the result will always be less than ~41 characters.  This meets MatLab restrictions: https://www.mathworks.com/help/matlab/ref/matlab.lang.makevalidname.html 

THIS WON'T BE CHANGED. FILE NAMES CREATED FOR EDDGridFromFile and EDDTableFromFile DEPEND ON SAME ENCODING OVER TIME.

#### Return {#return}

s with all of the non-variableNameSafe characters changed. If s is null, this returns &quot;x_1&quot;. If s is &quot;&quot;, this returns &quot;x_0&quot;.

#### Parameters {#parameters}

JVM

| |
|---|
| s |