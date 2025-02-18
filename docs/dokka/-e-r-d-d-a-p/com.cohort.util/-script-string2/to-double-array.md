//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[toDoubleArray](to-double-array.md)

# toDoubleArray

[JVM]\
open fun [toDoubleArray](to-double-array.md)(oar: Array&lt;Any&gt;): Array&lt;Double&gt;

This converts an Object[] (for example, where objects are Strings or Doubles) into a double[].

#### Return {#return}

the corresponding double[] (invalid values are converted to Double.NaN). oar=null returns null.

#### Parameters {#parameters}

JVM

| | |
|---|---|
| oar | an Object[] |