//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[findWholeWord](find-whole-word.md)

# findWholeWord

[JVM]\
open fun [findWholeWord](find-whole-word.md)(s: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html), word: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): Int

This finds (case-sensitive) the first whole word instance of 'word' in s. It will find 'word' at the start or end of s. I.e., the character before and after (if any) mustn't be a letter or digit or '_'.

#### Return {#return}

-1 if not found (or trouble, e.g., find=null)

#### Parameters {#parameters}

JVM

| | |
|---|---|
| word | must be a simple word (without regex special characters) |