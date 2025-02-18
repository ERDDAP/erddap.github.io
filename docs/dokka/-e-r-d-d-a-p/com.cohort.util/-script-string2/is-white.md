//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[isWhite](is-white.md)

# isWhite

[JVM]\
fun [isWhite](is-white.md)(c: Int): Boolean

Whitespace characters are u0001 .. ' '. Java just considers a few of these (sp HT FF) as white space, see the Java Lang Specification. u0000 is not whitespace. Some methods count on this fact.

#### Return

true if c is a whitespace character

#### Parameters

JVM

| | |
|---|---|
| c | a char |