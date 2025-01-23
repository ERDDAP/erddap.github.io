//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[isPrintable](is-printable.md)

# isPrintable

[JVM]\
fun [isPrintable](is-printable.md)(ch: Int): Boolean

This indicates if ch is printable with System.err.println() and Graphics.drawString(); hence, it is a subset of 0..255. 

- This is used, for example, to limit characters entering CoText.
- Currently, this accepts the ch if (ch&gt;=32 &amp;&amp; ch&lt;127) || (ch&gt;=161 &amp;&amp; ch&lt;=255).
- tab(#9) is not included. It should be caught separately and dealt with (expand to spaces?). The problem is that tabs are printed with a wide box (non-character symbol) in Windows Courier font. Thus, they mess up the positioning of characters in CoText.
- newline is not included. It should be caught separately and dealt with.
- This requires further study into all standard fonts on all platforms to see if other characters can be accepted.

#### Return {#return}

true if ch is a printable character

#### Parameters {#parameters}

JVM

| | |
|---|---|
| ch | a char |

[JVM]\
fun [isPrintable](is-printable.md)(s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): Boolean

Returns true if all of the characters in s are printable