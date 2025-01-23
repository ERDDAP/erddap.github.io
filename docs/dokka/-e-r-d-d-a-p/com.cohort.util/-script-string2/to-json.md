//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[toJson](to-json.md)

# toJson

[JVM]\
open fun [toJson](to-json.md)(f: Float): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

This makes a JSON version of a float.

#### Return {#return}

&quot;null&quot; if not finite. Return an integer if it ends with &quot;.0&quot;. Else returns the number as a string.

#### Parameters {#parameters}

JVM

| |
|---|
| f |

[JVM]\
open fun [toJson](to-json.md)(d: Double): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

This makes a JSON version of a number.

#### Return {#return-1}

&quot;null&quot; if not finite. Return an integer if it ends with &quot;.0&quot;. Else returns the number as a string.

#### Parameters {#parameters-1}

JVM

| |
|---|
| d |

[JVM]\
open fun [toJson](to-json.md)(s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

This makes a JSON version of a string (\\, \f, \n, \r, \t and \&quot; are escaped with a backslash character and double quotes are added before and after). null is returned as null. This variant encodes char #127 and above.

#### Return {#return-2}

the JSON-encoded string surrounded by &quot;'s.

#### Parameters {#parameters-2}

JVM

| |
|---|
| s |

[JVM]\
open fun [toJson](to-json.md)(s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), firstUEncodedChar: Int): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

This makes a JSON version of a string (\\, \f, \n, \r, \t and \&quot; are escaped with a backslash character and double quotes are added before and after). null is returned as null. This variant encodes char #127 and above as \\uhhhh.

#### Return {#return-3}

the JSON-encoded string surrounded by &quot;'s.

#### Parameters {#parameters-3}

JVM

| | |
|---|---|
| s | The String to be encoded. |
| firstUEncodedChar | The first char to be \\uhhhh encoded, commonly 127, 256, or 65536. |

[JVM]\
open fun [toJson](to-json.md)(s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), firstUEncodedChar: Int, encodeNewline: Boolean): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

This is a variant of toJson that lets you encode newlines or not.

#### Return {#return-4}

the JSON-encoded string surrounded by &quot;'s.

#### Parameters {#parameters-4}

JVM

| | |
|---|---|
| s | The String to be encoded. |
| firstUEncodedChar | The first char to be \\uhhhh encoded, commonly 127, 256, or 65536. |