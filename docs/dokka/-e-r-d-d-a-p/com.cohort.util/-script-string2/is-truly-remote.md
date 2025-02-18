//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[isTrulyRemote](is-truly-remote.md)

# isTrulyRemote

[JVM]\
open fun [isTrulyRemote](is-truly-remote.md)(dir: [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)): Boolean

This returns true if the dir starts with http://, https://, ftp://, sftp://, or smb://, but not if it's an AWS S3 URL. This is like isRemote, but returns false for &quot;file://...&quot;. NOTE: AWS S3 URLs are considered local here, but sometimes they should be treated as local.

#### Return {#return}

true if the dir is remote (but not an AWS S3 URL) (e.g., a URL other than file://) If dir is null or &quot;&quot;, this returns false.