//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[isVariableNameSafe](is-variable-name-safe.md)

# isVariableNameSafe

[JVM]\
open fun [isVariableNameSafe](is-variable-name-safe.md)(s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): Boolean

This tests if s is a valid variableName: 

- first character must be (iso8859Letter|_).
- optional subsequent characters must be (iso8859Letter|_|0-9).

 Note that Java allows Unicode characters, but this does not.

#### Return {#return}

true if s is a valid variableName.

#### Parameters {#parameters}

JVM

| | |
|---|---|
| s | a possible variable name |