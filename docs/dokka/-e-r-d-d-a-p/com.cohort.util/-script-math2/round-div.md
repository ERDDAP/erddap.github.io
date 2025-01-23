//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[roundDiv](round-div.md)

# roundDiv

[JVM]\
open fun [roundDiv](round-div.md)(num: Int, den: Int): Int

A div that rounds. Positive numbers only. e.g., 1/4 goes to 0; 3/4 goes to 1; den = 0 throws an exception.

#### Return {#return}

num/den, but rounded to the next larger (abs) int

#### Parameters {#parameters}

JVM

| | |
|---|---|
| num | the numerator (a positive number) |
| den | the denominator (a positive number) |