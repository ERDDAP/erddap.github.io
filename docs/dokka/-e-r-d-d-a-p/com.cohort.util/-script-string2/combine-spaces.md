//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[combineSpaces](combine-spaces.md)

# combineSpaces

[JVM]\
open fun [combineSpaces](combine-spaces.md)(s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)

Returns a string where all cases of more than one space are replaced by one space. The string is also trim'd to remove leading and trailing spaces. Also, spaces after &#123; or ( and before ) or &#125; will be removed.

#### Return {#return}

s, but with the spaces combined (or null if s is null)

#### Parameters {#parameters}

JVM

| |
|---|
| s |