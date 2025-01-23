//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[splitNoTrim](split-no-trim.md)

# splitNoTrim

[JVM]\
open fun [splitNoTrim](split-no-trim.md)(s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), separator: Char): Array&lt;[String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)&gt;

This splits the string at the specified character. A missing final string is treated as &quot;&quot; (not discarded as with String.split).

#### Return {#return}

a String[] with the strings (not canonical). s=null returns null. s=&quot;&quot; returns String[1]&#123;&quot;&quot;&#125;.

#### Parameters {#parameters}

JVM

| | |
|---|---|
| s | a string with 0 or more separator chatacters |
| separator |