//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[extractAllCaptureGroupsAsStringArray](extract-all-capture-groups-as-string-array.md)

# extractAllCaptureGroupsAsStringArray

[JVM]\
open fun [extractAllCaptureGroupsAsStringArray](extract-all-capture-groups-as-string-array.md)(s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), regex: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), captureGroupNumber: Int): Array&lt;[String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)&gt;

This repeatedly finds the regex and extracts the specified captureGroup.

#### Return {#return}

a String[] with the found strings in their original order.

#### Parameters {#parameters}

JVM

| | |
|---|---|
| s | the source String |
| regex | the regular expression, see java.util.regex.Pattern. Note that you often want to use the &quot;reluctant&quot; qualifiers which match as few chars as possible (e.g., ??, *?, +?) not the &quot;greedy&quot; qualifiers which match as many chars as possible (e.g., ?, *, +). |