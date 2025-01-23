//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[toVariableName](to-variable-name.md)

# toVariableName

[JVM]\
open fun [toVariableName](to-variable-name.md)(s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

This suggests a camel-case variable name.

#### Return {#return}

a valid variable name asciiLowerCaseLetter+asciiDigitLetter*, using camel case. This is a simplistic suggestion. Different strings may return the same variable name. null returns &quot;null&quot;. &quot;&quot; returns &quot;a&quot;.

#### Parameters {#parameters}

JVM

| | |
|---|---|
| s | the starting string for the variable name. |