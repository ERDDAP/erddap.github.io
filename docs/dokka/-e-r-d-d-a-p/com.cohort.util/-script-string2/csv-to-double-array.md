//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[csvToDoubleArray](csv-to-double-array.md)

# csvToDoubleArray

[JVM]\
open fun [csvToDoubleArray](csv-to-double-array.md)(csv: [String](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/String.html)): Array&lt;Double&gt;

This converts a comma-separated-value String into a double[]. Invalid values are converted to Double.NaN.

#### Return

the corresponding double[]. csv=null returns null. csv=&quot;&quot; is converted to double[1]&#123;Double.NAN&#125;.

#### Parameters

JVM

| | |
|---|---|
| csv | the comma-separated-value String |