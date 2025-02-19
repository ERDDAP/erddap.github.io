//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[narrowToShort](narrow-to-short.md)

# narrowToShort

[JVM]\
fun [narrowToShort](narrow-to-short.md)(i: Int): Short

Safely narrows an int to a short.

#### Return

Short.MAX_VALUE if i is too small or too big; otherwise i.

#### Parameters

JVM

| | |
|---|---|
| i | any int |

[JVM]\
fun [narrowToShort](narrow-to-short.md)(i: Long): Short

Safely narrows a long to a short.

#### Return

Short.MAX_VALUE if i is too small or too big; otherwise i.

#### Parameters

JVM

| | |
|---|---|
| i | any long |