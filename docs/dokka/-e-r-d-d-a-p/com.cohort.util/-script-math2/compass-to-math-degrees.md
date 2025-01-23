//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[compassToMathDegrees](compass-to-math-degrees.md)

# compassToMathDegrees

[JVM]\
fun [compassToMathDegrees](compass-to-math-degrees.md)(compass: Double): Double

This converts a compass heading (usually 0..360, where North is 0, East is 90...) to Math-style degrees (East is 0, North is 90, ...).

#### Return {#return}

degrees always &gt;=0 and &lt;360 (compass=NaN -&gt; 0).

#### Parameters {#parameters}

JVM

| |
|---|
| compass |