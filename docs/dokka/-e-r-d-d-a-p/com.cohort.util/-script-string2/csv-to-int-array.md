//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[csvToIntArray](csv-to-int-array.md)

# csvToIntArray

[JVM]\
open fun [csvToIntArray](csv-to-int-array.md)(csv: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): Array&lt;Int&gt;

This converts a comma-separated-value String into an int[]. Invalid values are converted to Integer.MAX_VALUE.

#### Return {#return}

the corresponding int[]. csv=null returns null. csv=&quot;&quot; is converted to int[1]&#123;Integer.MAX_VALUE&#125;.

#### Parameters {#parameters}

JVM

| | |
|---|---|
| csv | the comma-separated-value String. |