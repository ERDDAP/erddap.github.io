//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[noLongLines](no-long-lines.md)

# noLongLines

[JVM]\
open fun [noLongLines](no-long-lines.md)(s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), maxLength: Int, spaces: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

If lines in s are &gt;=maxLength characters, this inserts &quot;\n&quot;+spaces at the previous non-DigitLetter + DigitLetter; or if none, this inserts &quot;\n&quot;+spaces at maxLength. Useful keywords for searching for this method: longer, longest, noLongerThan.

#### Return {#return}

s (perhaps the same, perhaps different), but with no long lines

#### Parameters {#parameters}

JVM

| | |
|---|---|
| s | a String with multiple lines, separated by \n's |
| maxLength | the maximum line length allowed |
| spaces | the string to be inserted after the inserted newline, e.g., &quot;<br/> &quot; |