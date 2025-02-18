//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[unsignedByte](unsigned-byte.md)

# unsignedByte

[JVM]\
fun [unsignedByte](unsigned-byte.md)(b: Int): Int

Safely converts a signed byte (-128..127) to an unsigned byte (0..255). Note that reverse is easy: (byte)ch works (for 0..255) because narrowing just saves the low order bits, so &gt;127 becomes negative bytes.

#### Return {#return}

an int (0..255)

#### Parameters {#parameters}

JVM

| | |
|---|---|
| b | a byte (-128 .. 127) (or char, short, or int where you just want the lower 8 bits stored as 0..255) |