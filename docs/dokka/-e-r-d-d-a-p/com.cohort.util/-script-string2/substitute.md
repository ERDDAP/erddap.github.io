//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[substitute](substitute.md)

# substitute

[JVM]\
open fun [substitute](substitute.md)(msg: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), s0: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), s1: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), s2: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

This replaces &quot;&#123;0&#125;&quot;, &quot;&#123;1&#125;&quot;, and &quot;&#123;2&#125;&quot; in msg with s0, s1, s2.

#### Return {#return}

the modified msg

#### Parameters {#parameters}

JVM

| | |
|---|---|
| msg | a string which may contain &quot;&#123;0&#125;&quot;, &quot;&#123;1&#125;&quot;, and/or &quot;&#123;2&#125;&quot;. |
| s0 | the first substitution string. If null, that substitution won't be attempted. |
| s1 | the second substitution string. If null, that substitution won't be attempted. |
| s2 | the third substitution string. If null, that substitution won't be attempted. |