//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[md5Hex](md5-hex.md)

# md5Hex

[JVM]\
open fun [md5Hex](md5-hex.md)(password: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

This returns the MD5 hash digest of stringToUtf8Bytes(password) as a String of 32 lowercase hex digits. Lowercase because the digest authentication standard uses lower case; so mimic them. And lowercase is easier to type.

#### Return {#return}

the MD5 hash digest of the password (32 lowercase hex digits, as a String), or null if password is null or there is trouble.

#### Parameters {#parameters}

JVM

| | |
|---|---|
| password | the text to be digested |