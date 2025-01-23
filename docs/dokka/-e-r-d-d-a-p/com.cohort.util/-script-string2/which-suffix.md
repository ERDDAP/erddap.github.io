//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[whichSuffix](which-suffix.md)

# whichSuffix

[JVM]\
open fun [whichSuffix](which-suffix.md)(suffixes: Array&lt;[String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)&gt;, longerString: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), startAt: Int): Int

This finds the first element in suffixes (starting at element startAt) where the longerString ends with suffixes[i].

#### Return {#return}

the element number of suffixes which longerString ends with (or -1 if not found)

#### Parameters {#parameters}

JVM

| | |
|---|---|
| suffixes | the array of suffixes |
| longerString | the String that might end with one of the suffixes |
| startAt | the first element of ar to be checked. If startAt &lt;0, this starts with startAt = 0. |