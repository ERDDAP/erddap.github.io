//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[isRemote](is-remote.md)

# isRemote

[JVM]\
open fun [isRemote](is-remote.md)(dir: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): Boolean

This returns true if the dir starts with http://, https://, ftp://, sftp://, or smb://. This is like isRemote, but returns false for &quot;file://...&quot;. WARNING: AWS S3 URLs are considered remote here, but often they should be treated as local.

#### Return {#return}

true if the dir is remote (e.g., a URL other than file://) If dir is null or &quot;&quot;, this returns false.