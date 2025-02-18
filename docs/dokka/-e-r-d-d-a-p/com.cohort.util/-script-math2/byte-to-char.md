//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[byteToChar](byte-to-char.md)

# byteToChar

[JVM]\
fun [byteToChar](byte-to-char.md)(b: Int): Char

Safely converts a byte (-128..127) to char (0..255). Note that reverse is easy: (byte)ch works (for 0..255) because narrowing just saves the low order bits, so &gt;127 becomes negative bytes.

#### Return

a char (0..255)

#### Parameters

JVM

| | |
|---|---|
| b | a byte (-128 .. 127) (or char, short, or int where you just want the lower 8 bits stored as 0..255) |