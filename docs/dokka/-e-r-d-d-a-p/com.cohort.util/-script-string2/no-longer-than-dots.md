//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[noLongerThanDots](no-longer-than-dots.md)

# noLongerThanDots

[JVM]\
open fun [noLongerThanDots](no-longer-than-dots.md)(s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), max: Int): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

This is like noLongerThan, but if truncated, s.substring(0, max-3) + &quot;...&quot; is returned.

#### Return {#return}

s (if it is short) or the first max characters of s

#### Parameters {#parameters}

JVM

| |
|---|
| s |
| max |