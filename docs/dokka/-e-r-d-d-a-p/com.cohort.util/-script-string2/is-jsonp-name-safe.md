//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[isJsonpNameSafe](is-jsonp-name-safe.md)

# isJsonpNameSafe

[JVM]\
open fun [isJsonpNameSafe](is-jsonp-name-safe.md)(s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): Boolean

This tests if s is a valid jsonp function name. The functionName MUST be a series of 1 or more (period-separated) words. For each word: 

- The first character must be (iso8859Letter|_).
- The optional subsequent characters must be (iso8859Letter|_|0-9).
- s must not be longer than 255 characters.

 Note that JavaScript allows Unicode characters, but this does not.

#### Return {#return}

true if s is a valid jsonp function name.

#### Parameters {#parameters}

JVM

| | |
|---|---|
| s | a possible jsonp function name |