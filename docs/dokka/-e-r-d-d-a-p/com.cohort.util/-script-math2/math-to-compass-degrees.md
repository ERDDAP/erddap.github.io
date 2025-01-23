//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[mathToCompassDegrees](math-to-compass-degrees.md)

# mathToCompassDegrees

[JVM]\
fun [mathToCompassDegrees](math-to-compass-degrees.md)(math: Double): Double

This converts a Math-style degrees (East is 0, North is 90, ...) to a compass heading (where North is 0, East is 90, ...).

#### Return {#return}

degrees always &gt;=0 and &lt;360 (compass=NaN -&gt; 0).

#### Parameters {#parameters}

JVM

| |
|---|
| math |