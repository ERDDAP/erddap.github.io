//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[repeatedlyReplaceAll](repeatedly-replace-all.md)

# repeatedlyReplaceAll

[JVM]\
open fun [repeatedlyReplaceAll](repeatedly-replace-all.md)(s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), oldS: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), newS: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), ignoreCase: Boolean): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

This repeatedly replaces all oldS with newS. e.g., replace &quot;++&quot; with &quot;+&quot; in &quot;++++&quot; will yield &quot;+&quot;.