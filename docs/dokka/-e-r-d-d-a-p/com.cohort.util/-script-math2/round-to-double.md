//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[roundToDouble](round-to-double.md)

# roundToDouble

[JVM]\
fun [roundToDouble](round-to-double.md)(d: Double): Double

Safely rounds a double to the nearest integer (stored as a double).

#### Return

Double.NaN if d is !finite; otherwise d, rounded to the nearest int. Undesirable: d.5 rounds up for positive numbers, down for negative. But this rounds d.5 in a way that is often more useful than Math.rint (which rounds to nearest even number).

#### Parameters

JVM

| | |
|---|---|
| d | any double |