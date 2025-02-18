//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[whichPrefix](which-prefix.md)

# whichPrefix

[JVM]\
open fun [whichPrefix](which-prefix.md)(prefixes: Array&lt;[String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)&gt;, longerString: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), startAt: Int): Int

This finds the first element in prefixes (starting at element startAt) where the longerString starts with prefixes[i].

#### Return {#return}

the element number of prefixes which longerString starts with (or -1 if not found)

#### Parameters {#parameters}

JVM

| | |
|---|---|
| prefixes | the array of prefixes |
| longerString | the String that might start with one of the prefixes |
| startAt | the first element of ar to be checked. If startAt &lt;0, this starts with startAt = 0. |