//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[passwordDigest](password-digest.md)

# passwordDigest

[JVM]\
open fun [passwordDigest](password-digest.md)(algorithm: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), password: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

This returns the hash digest of stringToUtf8Bytes(password) as a String of lowercase hex digits. Lowercase because the digest authentication standard uses lower case; so mimic them. And lowercase is easier to type.

#### Return {#return}

the algorithm's hash digest of the password (many lowercase hex digits, as a String), or null if password is null or there is trouble.

#### Parameters {#parameters}

JVM

| | |
|---|---|
| algorithm | one of the FILE_DIGEST_OPTIONS &#123;&quot;MD5&quot;, &quot;SHA-1&quot;, &quot;SHA-256&quot;, &quot;SHA-384&quot;, &quot;SHA-512&quot; &#125;; |
| password | the text to be digested |