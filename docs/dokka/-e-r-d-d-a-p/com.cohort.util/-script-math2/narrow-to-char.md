//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[narrowToChar](narrow-to-char.md)

# narrowToChar

[JVM]\
fun [narrowToChar](narrow-to-char.md)(i: Int): Char

Safely narrows an int to a char.

#### Return

Character.MAX_VALUE if i is too small or too big; otherwise i.

#### Parameters

JVM

| | |
|---|---|
| i | any int |

[JVM]\
fun [narrowToChar](narrow-to-char.md)(i: Long): Char

Safely narrows a long to a char.

#### Return

Character.MAX_VALUE if i is too small or too big; otherwise i.

#### Parameters

JVM

| | |
|---|---|
| i | any long |