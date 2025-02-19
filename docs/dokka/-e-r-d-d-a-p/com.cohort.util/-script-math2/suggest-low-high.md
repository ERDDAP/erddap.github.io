//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[suggestLowHigh](suggest-low-high.md)

# suggestLowHigh

[JVM]\
open fun [suggestLowHigh](suggest-low-high.md)(low: Double, high: Double): Array&lt;Double&gt;

This returns a nice bounding range (e.g., for an axis) which includes low and high.

#### Return

returnLowHigh an array with 2 elements. The resulting bounds are stored as [0]=low and [1]=high. If low and high are not finite, this returns 0,1. In all other cases, this returns an appropriate wider range.

#### Parameters

JVM

| | |
|---|---|
| low | the low end of the range |
| high | the high end of the range |