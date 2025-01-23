//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[zeroPad](zero-pad.md)

# zeroPad

[JVM]\
open fun [zeroPad](zero-pad.md)(number: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), nDigits: Int): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

This adds 0's to the left of the string until there are nDigits to the left of the decimal point (or nDigits total if there isn't a decimal point). If the number is too big, nothing is added or taken away.

#### Return {#return}

the number, left-padded with 0's so there are nDigits to the left of the decimal point

#### Parameters {#parameters}

JVM

| | |
|---|---|
| number | a positive number. This doesn't handle negative numbers. |
| nDigits | the desired number of digits to the left of the decimal point (or total, if no decimal point) |