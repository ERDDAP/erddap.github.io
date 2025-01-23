//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[reduceHashCode](reduce-hash-code.md)

# reduceHashCode

[JVM]\
open fun [reduceHashCode](reduce-hash-code.md)(hashCode: Int): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

This reduces a hash code (currently to a 10 digit unsigned number -- no loss of information). For much stronger than hashCode, use String2.md5Hex or even String2.md5Hex12.

#### Return {#return}

the reduced version

#### Parameters {#parameters}

JVM

| |
|---|
| hashCode |