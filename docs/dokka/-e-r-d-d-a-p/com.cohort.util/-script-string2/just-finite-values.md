//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptString2](index.md)/[justFiniteValues](just-finite-values.md)

# justFiniteValues

[JVM]\
open fun [justFiniteValues](just-finite-values.md)(iar: Array&lt;Int&gt;): Array&lt;Int&gt;

This returns an int[] with just the non-Integer.MAX_VALUE values from the original array.

#### Return

a new int[] with just the non-Integer.MAX_VALUE values. iar=null returns null.

#### Parameters

JVM

| | |
|---|---|
| iar | is an int[] |

[JVM]\
open fun [justFiniteValues](just-finite-values.md)(dar: Array&lt;Double&gt;): Array&lt;Double&gt;

This returns a double[] with just the finite values from the original array.

#### Return

a new double[] with just finite values. dar=null returns null.

#### Parameters

JVM

| | |
|---|---|
| dar | is a double[] |