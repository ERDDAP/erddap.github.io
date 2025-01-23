//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[makeString](make-string.md)

# makeString

[JVM]\
open fun [makeString](make-string.md)(ch: Char, length: Int): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

This makes a new String of specified length, filled with ch. For safety, if length&gt;=1000000, it returns &quot;&quot;.

#### Return {#return}

a String 'length' long, filled with ch. If length &lt;0 or &gt;= 1000000, this returns &quot;&quot;.

#### Parameters {#parameters}

JVM

| | |
|---|---|
| ch | the character to fill the string |
| length | the length of the string |