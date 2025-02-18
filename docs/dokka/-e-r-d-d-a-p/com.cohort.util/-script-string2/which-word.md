//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[whichWord](which-word.md)

# whichWord

[JVM]\
open fun [whichWord](which-word.md)(longerString: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), words: Array&lt;[String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)&gt;): Int

This tries to find the first one of the words in the longerString. This is case-sensitive.

#### Return {#return}

index of the matching word (or -1 if no match or other trouble)