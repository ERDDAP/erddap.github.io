//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[binaryExponent](binary-exponent.md)

# binaryExponent

[JVM]\
open fun [binaryExponent](binary-exponent.md)(d: Double): Int

This returns the binary exponent of a double: usually +-1023.

#### Return

the binary exponent of d. If d = 0, this returns Binary0 (which is a flag, not a real value). If !isFinite(d), this return BinaryLimit (which is a flag, not a real value).

#### Parameters

JVM

| | |
|---|---|
| d | any double |