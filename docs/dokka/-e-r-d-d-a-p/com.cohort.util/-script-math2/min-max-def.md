//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[minMaxDef](min-max-def.md)

# minMaxDef

[JVM]\
fun [minMaxDef](min-max-def.md)(min: Int, max: Int, def: Int, current: Int): Int

This forces an int into a range defined by min..max.

#### Return {#return}

def if current is less than min; or def if current is greater than max; else it returns the current value.

#### Parameters {#parameters}

JVM

| | |
|---|---|
| min | the minimum allowed value |
| max | the maximum allowed value |
| def | the default value |
| current | the current value |

[JVM]\
fun [minMaxDef](min-max-def.md)(min: Double, max: Double, def: Double, current: Double): Double

This forces a double into a range defined by min..max.

#### Return {#return-1}

def if current is less than min; or def if current is greater than max; else it returns the current value.

#### Parameters {#parameters-1}

JVM

| | |
|---|---|
| min | the minimum allowed value |
| max | the maximum allowed value |
| def | the default value |
| current | the current value |