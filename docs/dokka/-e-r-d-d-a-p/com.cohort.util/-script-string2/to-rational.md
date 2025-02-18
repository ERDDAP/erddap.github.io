//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[toRational](to-rational.md)

# toRational

[JVM]\
open fun [toRational](to-rational.md)(d: Double): Array&lt;Int&gt;

This converts a double to a rational number (m * 10^t). This is similar to Math2.mantissa and Math2.intExponent, but works via string manipulation to avoid roundoff problems (e.g., with 6.6260755e-24).

#### Return

int[2]: [0]=m, [1]=t. (or &#123;0, 0&#125; if d=0, or &#123;1, Integer.MAX_VALUE&#125; if !finite(d))

#### Parameters

JVM

| |
|---|
| d |