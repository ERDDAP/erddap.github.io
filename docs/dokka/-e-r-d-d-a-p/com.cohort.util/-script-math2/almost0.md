//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[almost0](almost0.md)

# almost0

[JVM]\
fun [almost0](almost0.md)(d: Double): Boolean

This quickly tests if d is almost 0 (Math.abs(d)&lt;dEps). 

- If you are working with small numbers, this test may be inappropriate.
- This is very fast, since it only involves one comparison.
- Use almost0(d) instead of almostEqual5 or almostEqual9.

#### Return {#return}

true if Math.abs(d) &lt;dEps. NaN and Infinity correctly return false.

#### Parameters {#parameters}

JVM

| | |
|---|---|
| d | any double |