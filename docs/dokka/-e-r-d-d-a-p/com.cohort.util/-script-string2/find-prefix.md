//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[findPrefix](find-prefix.md)

# findPrefix

[JVM]\
open fun [findPrefix](find-prefix.md)(prefixes: Array&lt;[String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)&gt;, longerString: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), startAt: Int): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

This is like whichPrefix, but returns the found prefix (or null).

#### Return {#return}

the prefixes[i] which longerString starts with (or null if not found)

#### Parameters {#parameters}

JVM

| | |
|---|---|
| prefixes | the array of prefixes |
| longerString | the String that might start with one of the prefixes |
| startAt | the first element of ar to be checked. If startAt &lt;0, this starts with startAt = 0. |