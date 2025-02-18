//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[isLetter](is-letter.md)

# isLetter

[JVM]\
fun [isLetter](is-letter.md)(c: Int): Boolean

This includes hiASCII/ISO Latin 1/ISO 8859-1, but not extensive unicode characters. Letters are A..Z, a..z, and #192..#255 (except #215 and #247). For unicode characters, see Java Lang Spec pg 14.

#### Return {#return}

true if c is a letter

#### Parameters {#parameters}

JVM

| | |
|---|---|
| c | a char |