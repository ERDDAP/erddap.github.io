//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[roundToULong](round-to-u-long.md)

# roundToULong

[JVM]\
fun [roundToULong](round-to-u-long.md)(d: Double): [BigInteger](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/math/BigInteger.html)

Safely rounds a double to a ulong.

#### Return {#return}

ULONG_MAX_VALUE if d is too small, too big, or NaN; otherwise d, rounded to the nearest short. Undesirable: d.5 rounds up for positive numbers, down for negative.

#### Parameters {#parameters}

JVM

| | |
|---|---|
| d | any double |