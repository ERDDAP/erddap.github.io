//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptRow](index.md)

# ScriptRow

[JVM]\
open class [ScriptRow](index.md)

This class makes the data on 1 row of a table accessible to JexlScript scripts via &quot;row.*name*()&quot; methods. 

This class is Copyright 2019, NOAA.

#### Author {#author}

Bob Simons (was bob.simons@noaa.gov, now BobSimons2.00@gmail.com) 2019-11-14

## Constructors {#constructors}

| | |
|---|---|
| [ScriptRow](-script-row-constructor.md) | [JVM]<br/>constructor(tFullFileName: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), tTable: Table)<br/>The constructor. |

## Properties {#properties}

| Name | Summary |
|---|---|
| [fileName](file-name.md) | [JVM]<br/>open val [fileName](file-name.md): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html) |
| [fullFileName](full-file-name.md) | [JVM]<br/>open val [fullFileName](full-file-name.md): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html) |
| [row](row.md) | [JVM]<br/>open var [row](row.md): Int |

## Functions {#functions}

| Name | Summary |
|---|---|
| [columnDouble](column-double.md) | [JVM]<br/>open fun [columnDouble](column-double.md)(colName: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): Double<br/>This gets the value from a column as a double. |
| [columnFloat](column-float.md) | [JVM]<br/>open fun [columnFloat](column-float.md)(colName: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): Float<br/>This gets the value from a column as a float. |
| [columnInt](column-int.md) | [JVM]<br/>open fun [columnInt](column-int.md)(colName: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): Int<br/>This gets the value from a column as an int. |
| [columnLong](column-long.md) | [JVM]<br/>open fun [columnLong](column-long.md)(colName: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): Long<br/>This gets the value from a column as a long. |
| [columnString](column-string.md) | [JVM]<br/>open fun [columnString](column-string.md)(colName: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)<br/>This gets the value from a column as a String. |