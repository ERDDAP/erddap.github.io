//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[isUrl](is-url.md)

# isUrl

[JVM]\
open fun [isUrl](is-url.md)(url: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): Boolean

This indicates if 'url' is probably a valid url. This is like isRemote, but returns true for &quot;file://...&quot;.

#### Return {#return}

true if 'url' is probably a valid url. false if 'url' is not a valid url. Note that &quot;file://...&quot; is a url.

#### Parameters {#parameters}

JVM

| | |
|---|---|
| url | a possible url |