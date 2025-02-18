//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[modifyToBeVariableNameSafe](modify-to-be-variable-name-safe.md)

# modifyToBeVariableNameSafe

[JVM]\
open fun [modifyToBeVariableNameSafe](modify-to-be-variable-name-safe.md)(s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

This is like modifyToBeFileNameSafe, but restricts the name to: 

- first character must be (iso8859Letter|_).
- subsequent characters must be (iso8859Letter|_|0-9).

 Note that Java allows Unicode characters, but this does not. See also the safer encodeMatlabNameSafe(String s). Note, this does not check for names that are too long (many system have an 80 or 255 char limit).

#### Return {#return}

a safe variable name (but perhaps two s's lead to the same result)

#### Parameters {#parameters}

JVM

| |
|---|
| s |