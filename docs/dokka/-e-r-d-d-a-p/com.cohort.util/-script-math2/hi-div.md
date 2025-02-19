//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[hiDiv](hi-div.md)

# hiDiv

[JVM]\
open fun [hiDiv](hi-div.md)(num: Int, den: Int): Int

open fun [hiDiv](hi-div.md)(num: Long, den: Long): Long

A div that rounds up if den&gt;0. e.g., 1/4 goes to 1; 4/4 goes to 1; den = 0 throws an exception.

#### Return

num/den, but rounded to the next larger (abs) int

#### Parameters

JVM

| | |
|---|---|
| num | the numerator (a positive number) |
| den | the denominator (a positive number) |