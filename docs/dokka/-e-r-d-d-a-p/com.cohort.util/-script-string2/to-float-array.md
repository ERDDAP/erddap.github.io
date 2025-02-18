//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[toFloatArray](to-float-array.md)

# toFloatArray

[JVM]\
open fun [toFloatArray](to-float-array.md)(oar: Array&lt;Any&gt;): Array&lt;Float&gt;

This converts an Object[] (for example, where objects are Strings or Floats) into a float[].

#### Return {#return}

the corresponding float[] (invalid values are converted to Float.NaN). oar=null returns null.

#### Parameters {#parameters}

JVM

| | |
|---|---|
| oar | an Object[] |