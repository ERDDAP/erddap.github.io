//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[suggestMaxDivisions](suggest-max-divisions.md)

# suggestMaxDivisions

[JVM]\
open fun [suggestMaxDivisions](suggest-max-divisions.md)(range: Double, maxDivisions: Int): Double

This suggests the division distance along an axis so that there will be between maxDivisions/2 and maxDivisions.

#### Return

a double with the suggested division distance. If range isn't finite, this returns NaN. If range == 0, this returns 1. If range &lt;0, this the result will be negative. If maxDivisions == 0, this returns range. If maxDivisions &lt;0, this uses Math.abs(maxDivisions).

#### Parameters

JVM

| | |
|---|---|
| range | the range of the axis, e.g., an axis spanning 30 - 50 would have a range of 20 |
| maxDivisions | the maximum number of divisions (segments). If you have maxNValues, use maxNValues-1 to call this method. |