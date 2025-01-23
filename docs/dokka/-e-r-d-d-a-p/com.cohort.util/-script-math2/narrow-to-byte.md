//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[narrowToByte](narrow-to-byte.md)

# narrowToByte

[JVM]\
fun [narrowToByte](narrow-to-byte.md)(i: Int): Byte

Safely narrows an int to a byte.

#### Return {#return}

Byte.MAX_VALUE if i is too small or too big; otherwise i.

#### Parameters {#parameters}

JVM

| | |
|---|---|
| i | any int |

[JVM]\
fun [narrowToByte](narrow-to-byte.md)(i: Long): Byte

Safely narrows a long to a byte.

#### Return {#return-1}

Byte.MAX_VALUE if i is too small or too big; otherwise i.

#### Parameters {#parameters-1}

JVM

| | |
|---|---|
| i | any long |