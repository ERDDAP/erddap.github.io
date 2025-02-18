//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[caseInsensitiveIndexOf](case-insensitive-index-of.md)

# caseInsensitiveIndexOf

[JVM]\
open fun [caseInsensitiveIndexOf](case-insensitive-index-of.md)(ar: Array&lt;Any&gt;, s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): Int

This finds the first element in Object[] where ar[i].toString().toLowerCase() equals to s.toLowerCase(). This could have been called indexOfIgnoreCase().

#### Return {#return}

the element number of ar which is equal to s (or -1 if s is null or not found)

#### Parameters {#parameters}

JVM

| | |
|---|---|
| ar | the array of Objects |
| s | the String to be found |