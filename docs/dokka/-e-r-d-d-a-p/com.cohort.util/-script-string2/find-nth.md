//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[findNth](find-nth.md)

# findNth

[JVM]\
open fun [findNth](find-nth.md)(s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), findS: Char, nth: Int): Int

This returns the index of the nth occurrence of findS in s. If s == null, or &quot;&quot;, or nth &lt;0, or nth occurence not found, return -1. If s.length()==0 or nth==0, return -1;

#### Return {#return}

This returns the index of the nth occurrence of findS in s.

#### Parameters {#parameters}

JVM

| | |
|---|---|
| s | the source string |
| findS | the char to be searched for |
| nth | 1+ |