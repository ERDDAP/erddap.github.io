//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[toIso88591Char](to-iso88591-char.md)

# toIso88591Char

[JVM]\
open fun [toIso88591Char](to-iso88591-char.md)(ch: Char): Char

This converts the char to an ISO-8859-1 (ISO_8859_1) char. This converts any char in 127-159 and &gt;255 into '?'.

#### Return

an ISO_8859_1-only char.

#### Parameters

JVM

| | |
|---|---|
| ch | the char to be converted |