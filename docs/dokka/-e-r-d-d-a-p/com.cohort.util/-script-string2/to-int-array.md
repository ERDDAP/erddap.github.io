//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[toIntArray](to-int-array.md)

# toIntArray

[JVM]\
open fun [toIntArray](to-int-array.md)(oar: Array&lt;Any&gt;): Array&lt;Int&gt;

This converts an Object[] (for example, where objects are Strings or Integers) into an int[].

#### Return {#return}

the corresponding int[] (invalid values are converted to Integer.MAX_VALUE). oar=null returns null.

#### Parameters {#parameters}

JVM

| | |
|---|---|
| oar | an Object[] |