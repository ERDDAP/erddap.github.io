//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[noLongerThan](no-longer-than.md)

# noLongerThan

[JVM]\
open fun [noLongerThan](no-longer-than.md)(s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), max: Int): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

This returns a string no more than max characters long, throwing away the excess. If you want to keep the whole string and just insert newlines periodically, use noLongLines() instead.

#### Return {#return}

s (if it is short) or the first max characters of s. If s==null, this returns &quot;&quot;.

#### Parameters {#parameters}

JVM

| |
|---|
| s |
| max |