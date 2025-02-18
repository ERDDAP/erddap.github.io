//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[parseLong](parse-long.md)

# parseLong

[JVM]\
open fun [parseLong](parse-long.md)(s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): Long

This converts String representation of a long. Leading or trailing spaces are automatically removed. THIS DOESN'T ROUND! So floating point values lead to Long.MAX_VALUE.

#### Return {#return}

a long (or Long.MAX_VALUE if trouble).

#### Parameters {#parameters}

JVM

| | |
|---|---|
| s | a valid String representation of a long value |