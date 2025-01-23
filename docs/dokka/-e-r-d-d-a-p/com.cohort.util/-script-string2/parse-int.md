//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[parseInt](parse-int.md)

# parseInt

[JVM]\
open fun [parseInt](parse-int.md)(s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), def: Int): Int

Like parseInt(s), but returns def if error).

[JVM]\
open fun [parseInt](parse-int.md)(s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): Int

Convert a string to an int. Leading or trailing spaces are automatically removed. This accepts hexadecimal integers starting with &quot;0x&quot;. Leading 0's (e.g., 0012) are ignored; number is treated as decimal (not octal as Java would). Floating point numbers are rounded. This won't throw an exception if the number isn't formatted right. To make a string from an int, use &quot;&quot;+i, Integer.toHexString, or Integer.toString(i,radix).

#### Return {#return}

the int value from the String (or Integer.MAX_VALUE if error).

#### Parameters {#parameters}

JVM

| | |
|---|---|
| s | is the String representation of a number. |