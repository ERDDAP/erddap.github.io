//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[simpleMatlabNameSafe](simple-matlab-name-safe.md)

# simpleMatlabNameSafe

[JVM]\
open fun [simpleMatlabNameSafe](simple-matlab-name-safe.md)(s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

This is like encodeMatlabNameSafe, but simpler and won't always retain all the info. 

- first character must be A-Z, a-z.
- subsequent characters must be A-Z, a-z, _, 0-9.

 non-safe characters are some safe variant.  See posix fully portable file names at https://en.wikipedia.org/wiki/Filename .  When the encoding is more than 25 characters, this stops encoding and adds &quot;xh&quot; and the hash code for the entire original string, so the result will always be less than ~41 characters.  This meets MatLab restrictions: https://www.mathworks.com/help/matlab/ref/matlab.lang.makevalidname.html 

THIS WON'T BE CHANGED. SOME datasetIDs DEPEND ON SAME ENCODING OVER TIME.

#### Return {#return}

s with all of the non-variableNameSafe characters changed. If s is null, this returns &quot;null_&quot;. If s is &quot;&quot;, this returns &quot;nothing_&quot;.

#### Parameters {#parameters}

JVM

| |
|---|
| s |