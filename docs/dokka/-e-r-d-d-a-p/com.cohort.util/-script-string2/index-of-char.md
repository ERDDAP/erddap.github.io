//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[indexOfChar](index-of-char.md)

# indexOfChar

[JVM]\
open fun [indexOfChar](index-of-char.md)(s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), car: Array&lt;Char&gt;, fromIndex: Int): Int

This indexOf is a little different: it finds the first instance in s of any char in car.

#### Return {#return}

The first instance in s of any char in car. If not found, it returns -1.

#### Parameters {#parameters}

JVM

| | |
|---|---|
| s | a string |
| car | the chars you want to find any of |
| fromIndex | the index number of the position to start the search |