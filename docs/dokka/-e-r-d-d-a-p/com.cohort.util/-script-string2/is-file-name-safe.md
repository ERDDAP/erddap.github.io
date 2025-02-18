//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[isFileNameSafe](is-file-name-safe.md)

# isFileNameSafe

[JVM]\
open fun [isFileNameSafe](is-file-name-safe.md)(ch: Char): Boolean

This indicates if ch is a file-name-safe character (A-Z, a-z, 0-9, _, -, or .).

#### Return {#return}

true if ch is a file-name-safe character (A-Z, a-z, 0-9, _, -, .).

#### Parameters {#parameters}

JVM

| |
|---|
| ch |

[JVM]\
open fun [isFileNameSafe](is-file-name-safe.md)(s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): Boolean

This indicates if s has length &gt;= 1 and has just file-name-safe characters (0-9, A-Z, a-z, _, -, .). Note, this does not check for filenames that are too long (Windows has a path+fileName max length of 255 chars).

#### Return {#return-1}

true if s has just file-name-safe characters (0-9, A-Z, a-z, _, -, .). It returns false if s is null or &quot;&quot;.

#### Parameters {#parameters-1}

JVM

| | |
|---|---|
| s | a string, usually a file name |