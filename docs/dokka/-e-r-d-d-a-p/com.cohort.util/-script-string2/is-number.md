//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[isNumber](is-number.md)

# isNumber

[JVM]\
fun [isNumber](is-number.md)(s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): Boolean

This tries to quickly determine if the string is a correctly formatted number (including decimal, hexadecimal, octal, and &quot;NaN&quot; (any case)). 

This may not be perfect. In the future, this may be changed to be perfect. That shouldn't affect its use.

#### Return {#return}

true if s is *probably* a number. This returns false if s is *definitely* not a number. &quot;NaN&quot; (case insensitive) returns true. (It is a numeric value of sorts.) null and &quot;&quot; return false.

#### Parameters {#parameters}

JVM

| | |
|---|---|
| s | usually already trimmed, since any space in s will return false. |