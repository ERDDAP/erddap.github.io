//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[toIso88591Chars](to-iso88591-chars.md)

# toIso88591Chars

[JVM]\
open fun [toIso88591Chars](to-iso88591-chars.md)(car: Array&lt;Char&gt;): Array&lt;Char&gt;

This converts the chars to ISO-8859-1 (ISO_8859_1) chars. This converts any char in 127-159 and &gt;255 into '?'.

#### Return

car for convenience.

#### Parameters

JVM

| | |
|---|---|
| car[] | the char[] to be converted |