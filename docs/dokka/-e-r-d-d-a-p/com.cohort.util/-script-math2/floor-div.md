//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[floorDiv](floor-div.md)

# floorDiv

[JVM]\
open fun [floorDiv](floor-div.md)(num: Int, den: Int): Int

open fun [floorDiv](floor-div.md)(num: Long, den: Long): Long

A div where the implied mod is always &gt;=0. This is a consistent div for positive and negative numerators. For example, with regular division 1/2=0 and -1/2=0. But floorDiv(-1,2)=-1. den = 0 throws an exception.

#### Return

num/den, but is consistent for positive and negative numbers

#### Parameters

JVM

| | |
|---|---|
| num | the numerator (a positive or negative number) |
| den | the denominator (a positive number) |