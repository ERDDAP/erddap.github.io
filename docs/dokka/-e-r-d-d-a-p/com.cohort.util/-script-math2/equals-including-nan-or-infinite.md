//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[equalsIncludingNanOrInfinite](equals-including-nan-or-infinite.md)

# equalsIncludingNanOrInfinite

[JVM]\
open fun [equalsIncludingNanOrInfinite](equals-including-nan-or-infinite.md)(a: Double, b: Double): Boolean

open fun [equalsIncludingNanOrInfinite](equals-including-nan-or-infinite.md)(a: Float, b: Float): Boolean

This returns true if a == b. This treats as true: NaN=NaN (which Java says is false), NEGATIVE_INFINITY=NEGATIVE_INFINITY, and POSITIVE_INFINITY=POSITIVE_INFINITY.

#### Return

true if a == b.

#### Parameters

JVM

| |
|---|
| a |
| b |