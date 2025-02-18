//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[suggestDivisions](suggest-divisions.md)

# suggestDivisions

[JVM]\
open fun [suggestDivisions](suggest-divisions.md)(range: Double): Array&lt;Double&gt;

This suggests the division distance along an axis so that there will be about 5-7 primary divisions and 10-25 secondary.

#### Return {#return}

a double[2] with [0]=suggested major division distance and [1]=suggested minor division distance. If range isn't finite, this returns 2 Double.NaN's. If range == 0, this returns 1 and .5. If range &lt;0, this uses Math.abs(range).

#### Parameters {#parameters}

JVM

| | |
|---|---|
| range | the range of the axis, e.g., an axis spanning 30 - 50 would have a range of 20 |