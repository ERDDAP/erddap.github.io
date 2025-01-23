//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[narrowToInt](narrow-to-int.md)

# narrowToInt

[JVM]\
fun [narrowToInt](narrow-to-int.md)(i: Long): Int

Safely narrows a long to an int.

#### Return {#return}

Integer.MAX_VALUE if i is too small or too big; otherwise i.

#### Parameters {#parameters}

JVM

| | |
|---|---|
| i | any long |