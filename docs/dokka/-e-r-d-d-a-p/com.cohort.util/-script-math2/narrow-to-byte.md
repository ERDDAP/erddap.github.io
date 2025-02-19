//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[narrowToByte](narrow-to-byte.md)

# narrowToByte

[JVM]\
fun [narrowToByte](narrow-to-byte.md)(i: Int): Byte

Safely narrows an int to a byte.

#### Return

Byte.MAX_VALUE if i is too small or too big; otherwise i.

#### Parameters

JVM

| | |
|---|---|
| i | any int |

[JVM]\
fun [narrowToByte](narrow-to-byte.md)(i: Long): Byte

Safely narrows a long to a byte.

#### Return

Byte.MAX_VALUE if i is too small or too big; otherwise i.

#### Parameters

JVM

| | |
|---|---|
| i | any long |