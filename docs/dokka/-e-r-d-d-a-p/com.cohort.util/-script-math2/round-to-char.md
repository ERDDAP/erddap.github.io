//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[roundToChar](round-to-char.md)

# roundToChar

[JVM]\
fun [roundToChar](round-to-char.md)(d: Double): Char

Safely rounds a double to a char (treated as unsigned short).

#### Return {#return}

Character.MAX_VALUE if d is too small, too big, or NaN; otherwise d, rounded to the nearest char. Undesirable: d.5 rounds up for positive numbers, down for negative.

#### Parameters {#parameters}

JVM

| | |
|---|---|
| d | any double |