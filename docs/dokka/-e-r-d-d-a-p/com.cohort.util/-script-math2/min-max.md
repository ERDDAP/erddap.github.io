//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[minMax](min-max.md)

# minMax

[JVM]\
fun [minMax](min-max.md)(min: Int, max: Int, current: Int): Int

This forces a int into a range defined by min..max.

#### Return {#return}

min if current is less than min; or max if current is greater than max; else it returns the current value.

#### Parameters {#parameters}

JVM

| | |
|---|---|
| min | the minimum allowed value |
| max | the maximum allowed value |
| current | the current value |

[JVM]\
fun [minMax](min-max.md)(min: Double, max: Double, current: Double): Double

This forces a double into a range defined by min..max.

#### Return {#return-1}

min if current is less than min; or max if current is greater than max; else it returns the current value.

#### Parameters {#parameters-1}

JVM

| | |
|---|---|
| min | the minimum allowed value |
| max | the maximum allowed value |
| current | the current value |