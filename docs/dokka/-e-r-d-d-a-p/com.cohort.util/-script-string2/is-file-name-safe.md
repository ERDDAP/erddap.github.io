//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[isFileNameSafe](is-file-name-safe.md)

# isFileNameSafe

[JVM]\
open fun [isFileNameSafe](is-file-name-safe.md)(ch: Char): Boolean

This indicates if ch is a file-name-safe character (A-Z, a-z, 0-9, _, -, or .).

#### Return

true if ch is a file-name-safe character (A-Z, a-z, 0-9, _, -, .).

#### Parameters

JVM

| |
|---|
| ch |

[JVM]\
open fun [isFileNameSafe](is-file-name-safe.md)(s: [String](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/String.html)): Boolean

This indicates if s has length &gt;= 1 and has just file-name-safe characters (0-9, A-Z, a-z, _, -, .). Note, this does not check for filenames that are too long (Windows has a path+fileName max length of 255 chars).

#### Return

true if s has just file-name-safe characters (0-9, A-Z, a-z, _, -, .). It returns false if s is null or &quot;&quot;.

#### Parameters

JVM

| | |
|---|---|
| s | a string, usually a file name |