//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)

# ScriptMath2

[JVM]\
open class [ScriptMath2](index.md)

This class makes almost all of the static methods in com.cohort.Math2 accessible to JexlScript scripts as &quot;Math2.*name*()&quot; methods. This doesn't include the memory related and sleep related methods. 

The underlying Math2 class is Copyright (c) 2005 Robert Simons (CoHortSoftware@gmail.com). See the MIT/X-like license in com/cohort/util/LICENSE.txt.

#### Author {#author}

Bob Simons (was bob.simons@noaa.gov, now BobSimons2.00@gmail.com) 2019-11-14

## Constructors {#constructors}

| | |
|---|---|
| [ScriptMath2](-script-math2-constructor.md) | [JVM]<br/>constructor() |

## Properties {#properties}

| Name | Summary |
|---|---|
| [Binary0](-binary0.md) | [JVM]<br/>val [Binary0](-binary0.md): Int = -2000<br/>-2000 |
| [BinaryLimit](-binary-limit.md) | [JVM]<br/>val [BinaryLimit](-binary-limit.md): Int = 980<br/>980; //2^980 = ~1e295 |
| [BytesPerGB](-bytes-per-g-b.md) | [JVM]<br/>val [BytesPerGB](-bytes-per-g-b.md): Long = 1073741824<br/>BytesPerMB * (long)BytesPerKB |
| [BytesPerKB](-bytes-per-k-b.md) | [JVM]<br/>val [BytesPerKB](-bytes-per-k-b.md): Int = 1024<br/>1024 |
| [BytesPerMB](-bytes-per-m-b.md) | [JVM]<br/>val [BytesPerMB](-bytes-per-m-b.md): Int = 1048576<br/>BytesPerKB * BytesPerKB |
| [BytesPerPB](-bytes-per-p-b.md) | [JVM]<br/>val [BytesPerPB](-bytes-per-p-b.md): Long = 1125899906842624<br/>BytesPerTB * BytesPerKB; |
| [BytesPerTB](-bytes-per-t-b.md) | [JVM]<br/>val [BytesPerTB](-bytes-per-t-b.md): Long = 1099511627776<br/>BytesPerGB * BytesPerKB |
| [COMMON_MV9](-c-o-m-m-o-n_-m-v9.md) | [JVM]<br/>val [COMMON_MV9](-c-o-m-m-o-n_-m-v9.md): Array&lt;Double&gt;<br/>-99, -99.9, -99.99, -999, -999.9, -9999, -99999, -999999, -9999999, 99, 99.9, 99.99, 999, 999. |
| [dEps](d-eps.md) | [JVM]<br/>val [dEps](d-eps.md): Double = 1.0E-13<br/>epsilon suitable for doubles = 1e-13. |
| [fEps](f-eps.md) | [JVM]<br/>val [fEps](f-eps.md): Float = 1.0E-5f<br/>Eps values define small values that are suitable for quick tests if the difference between two values is close to the precision of of the data type. |
| [InverseTen](-inverse-ten.md) | [JVM]<br/>val [InverseTen](-inverse-ten.md): Array&lt;Double&gt;<br/>This defines inverse powers of ten. |
| [kelvinToC](kelvin-to-c.md) | [JVM]<br/>val [kelvinToC](kelvin-to-c.md): Double = -273.15<br/>-273. |
| [kmPerMile](km-per-mile.md) | [JVM]<br/>val [kmPerMile](km-per-mile.md): Double = 1.6134453781512605<br/>mPerMile * 0. |
| [ln10](ln10.md) | [JVM]<br/>val [ln10](ln10.md): Double<br/>Math.log(10.0); //2. |
| [ln2](ln2.md) | [JVM]<br/>val [ln2](ln2.md): Double<br/>Math.log(2. |
| [loAnd](lo-and.md) | [JVM]<br/>val [loAnd](lo-and.md): Long = 4294967295<br/>((long) Integer. |
| [meterPerFoot](meter-per-foot.md) | [JVM]<br/>val [meterPerFoot](meter-per-foot.md): Double = 0.30557677616501144<br/>1200.0 / 3927.0. |
| [mPerMile](m-per-mile.md) | [JVM]<br/>val [mPerMile](m-per-mile.md): Double = 1613.4453781512605<br/>5280 * meterPerFoot |
| [OneRadian](-one-radian.md) | [JVM]<br/>val [OneRadian](-one-radian.md): Double = 57.29577951308232<br/>180.0 / Math. |
| [Ten](-ten.md) | [JVM]<br/>val [Ten](-ten.md): Array&lt;Double&gt;<br/>This defines powers of ten. |
| [Two](-two.md) | [JVM]<br/>val [Two](-two.md): Array&lt;Int&gt;<br/>two defines powers of two, e.g., Two[0]=1, Two[1]=2, Two[2]=4, ... |
| [TwoPi](-two-pi.md) | [JVM]<br/>val [TwoPi](-two-pi.md): Double = 6.283185307179586<br/>2 * Math. |
| [UBYTE_MAX_VALUE](-u-b-y-t-e_-m-a-x_-v-a-l-u-e.md) | [JVM]<br/>val [UBYTE_MAX_VALUE](-u-b-y-t-e_-m-a-x_-v-a-l-u-e.md): Short = 255<br/>255 |
| [UINT_MAX_VALUE](-u-i-n-t_-m-a-x_-v-a-l-u-e.md) | [JVM]<br/>val [UINT_MAX_VALUE](-u-i-n-t_-m-a-x_-v-a-l-u-e.md): Long = 4294967295<br/>4294967295L |
| [ULONG_MAX_VALUE](-u-l-o-n-g_-m-a-x_-v-a-l-u-e.md) | [JVM]<br/>val [ULONG_MAX_VALUE](-u-l-o-n-g_-m-a-x_-v-a-l-u-e.md): [BigInteger](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/math/BigInteger.html)<br/>18446744073709551615. |
| [USHORT_MAX_VALUE](-u-s-h-o-r-t_-m-a-x_-v-a-l-u-e.md) | [JVM]<br/>val [USHORT_MAX_VALUE](-u-s-h-o-r-t_-m-a-x_-v-a-l-u-e.md): Int = 65535<br/>65535 |

## Functions {#functions}

| Name | Summary |
|---|---|
| [almost0](almost0.md) | [JVM]<br/>fun [almost0](almost0.md)(d: Double): Boolean<br/>This quickly tests if d is almost 0 (Math. |
| [almostEqual](almost-equal.md) | [JVM]<br/>open fun [almostEqual](almost-equal.md)(nSignificantDigits: Int, d1: Double, d2: Double): Boolean<br/>This tests if the numbers are equal to at least n significant digits.<br/>[JVM]<br/>open fun [almostEqual](almost-equal.md)(nSignificantDigits: Int, f1: Float, f2: Float): Boolean<br/>This tests if two floats are equal to at least n significant digits. |
| [angle02Pi](angle02-pi.md) | [JVM]<br/>fun [angle02Pi](angle02-pi.md)(radians: Double): Double<br/>This converts an angle (in radians) into the range &gt;=0 to &lt;2PI. |
| [angle0360](angle0360.md) | [JVM]<br/>fun [angle0360](angle0360.md)(degrees: Double): Double<br/>This converts an angle (in degrees) into the range &gt;=0 to &lt;360. |
| [anglePM180](angle-p-m180.md) | [JVM]<br/>fun [anglePM180](angle-p-m180.md)(degrees: Double): Double<br/>This converts an angle (in degrees) into the range &gt;=-180 to &lt;180 (180 becomes -180). |
| [bigger](bigger.md) | [JVM]<br/>open fun [bigger](bigger.md)(d: Double): Double<br/>This increases the value (nicely). |
| [bigger15](bigger15.md) | [JVM]<br/>open fun [bigger15](bigger15.md)(d: Double): Double<br/>This increases the value (nicely) so the mantissa is 1 or 5. |
| [biggerAngle](bigger-angle.md) | [JVM]<br/>open fun [biggerAngle](bigger-angle.md)(d: Double): Double<br/>This increases the double degrees value (nicely), and returns it as a string. |
| [biggerDouble](bigger-double.md) | [JVM]<br/>open fun [biggerDouble](bigger-double.md)(def: Double, mult: Double, max: Double, d: Double): Double<br/>This increases d to the next multiple of mult. |
| [binaryExponent](binary-exponent.md) | [JVM]<br/>open fun [binaryExponent](binary-exponent.md)(d: Double): Int<br/>This returns the binary exponent of a double: usually +-1023. |
| [binaryFindClosest](binary-find-closest.md) | [JVM]<br/>open fun [binaryFindClosest](binary-find-closest.md)(dar: Array&lt;Double&gt;, x: Double): Int<br/>Find the closest element to x in an ascending sorted array. |
| [binaryFindFirstGAE](binary-find-first-g-a-e.md) | [JVM]<br/>open fun [binaryFindFirstGAE](binary-find-first-g-a-e.md)(dar: Array&lt;Double&gt;, x: Double, precision: Int): Int<br/>Find the first element which is &gt;x or almostEqual(precision, x) in an ascending sorted array. |
| [binaryFindFirstGE](binary-find-first-g-e.md) | [JVM]<br/>open fun [binaryFindFirstGE](binary-find-first-g-e.md)(dar: Array&lt;Double&gt;, x: Double): Int<br/>Find the first element which is &gt;= x in an ascending sorted array. |
| [binaryFindLastLAE](binary-find-last-l-a-e.md) | [JVM]<br/>open fun [binaryFindLastLAE](binary-find-last-l-a-e.md)(dar: Array&lt;Double&gt;, x: Double, precision: Int): Int<br/>Find the last element which is &lt;x or almostEqual(5, x) in an ascending sorted array. |
| [binaryFindLastLE](binary-find-last-l-e.md) | [JVM]<br/>open fun [binaryFindLastLE](binary-find-last-l-e.md)(dar: Array&lt;Double&gt;, x: Double): Int<br/>Find the last element which is &lt;= x in an ascending sorted array. |
| [byteToChar](byte-to-char.md) | [JVM]<br/>fun [byteToChar](byte-to-char.md)(b: Int): Char<br/>Safely converts a byte (-128..127) to char (0..255). |
| [compassToMathDegrees](compass-to-math-degrees.md) | [JVM]<br/>fun [compassToMathDegrees](compass-to-math-degrees.md)(compass: Double): Double<br/>This converts a compass heading (usually 0..360, where North is 0, East is 90...) to Math-style degrees (East is 0, North is 90, ...). |
| [doubleToFloatNaN](double-to-float-na-n.md) | [JVM]<br/>fun [doubleToFloatNaN](double-to-float-na-n.md)(d: Double): Float<br/>Safely converts a double to a float (including the non-standard conversion of large values to Float.NaN, not Float.POSITIVE_INFINITY). |
| [equalsIncludingNanOrInfinite](equals-including-nan-or-infinite.md) | [JVM]<br/>open fun [equalsIncludingNanOrInfinite](equals-including-nan-or-infinite.md)(a: Double, b: Double): Boolean<br/>open fun [equalsIncludingNanOrInfinite](equals-including-nan-or-infinite.md)(a: Float, b: Float): Boolean<br/>This returns true if a == b. |
| [exponent](exponent.md) | [JVM]<br/>open fun [exponent](exponent.md)(d: Double): Double<br/>This returns the double exponent of a double (e.g., -0.0175 returns 0.01 since -0.0175=-1.75*0.01). |
| [finiteMax](finite-max.md) | [JVM]<br/>open fun [finiteMax](finite-max.md)(a: Double, b: Double): Double<br/>This returns the greater value. |
| [finiteMin](finite-min.md) | [JVM]<br/>open fun [finiteMin](finite-min.md)(a: Double, b: Double): Double<br/>This returns the lesser value. |
| [floatToDouble](float-to-double.md) | [JVM]<br/>fun [floatToDouble](float-to-double.md)(f: Double): Double<br/>Safely converts a float to a double. |
| [floatToDoubleNaN](float-to-double-na-n.md) | [JVM]<br/>fun [floatToDoubleNaN](float-to-double-na-n.md)(f: Double): Double<br/>Crudely (not nicely) converts a float to a double (including the non-standard conversion of INFINITY values to NaN). |
| [floorDiv](floor-div.md) | [JVM]<br/>open fun [floorDiv](floor-div.md)(num: Int, den: Int): Int<br/>open fun [floorDiv](floor-div.md)(num: Long, den: Long): Long<br/>A div where the implied mod is always &gt;=0. |
| [frac](frac.md) | [JVM]<br/>open fun [frac](frac.md)(d: Double): Double<br/>This returns the fraction part of a double. |
| [gcd](gcd.md) | [JVM]<br/>open fun [gcd](gcd.md)(n: Int, d: Int): Int<br/>Finds the greatest common divisor. |
| [getSmallIncrement](get-small-increment.md) | [JVM]<br/>open fun [getSmallIncrement](get-small-increment.md)(range: Double): Double<br/>This returns a small increment roughly 1/100th the range (e.g., .1, 1, 10, ....). |
| [greaterThanAE](greater-than-a-e.md) | [JVM]<br/>open fun [greaterThanAE](greater-than-a-e.md)(nSignificantDigits: Int, d1: Double, d2: Double): Boolean<br/>This tests if d1 is greater than or almostEqual9 d2. |
| [guessFrac](guess-frac.md) | [JVM]<br/>open fun [guessFrac](guess-frac.md)(r: Double, int3: Array&lt;Int&gt;)<br/>Looks for a fraction very close to some decimal value. |
| [guessFracString](guess-frac-string.md) | [JVM]<br/>open fun [guessFracString](guess-frac-string.md)(d: Double): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)<br/>This creates a String based on the results of guessFrac() |
| [hiDiv](hi-div.md) | [JVM]<br/>open fun [hiDiv](hi-div.md)(num: Int, den: Int): Int<br/>open fun [hiDiv](hi-div.md)(num: Long, den: Long): Long<br/>A div that rounds up if den&gt;0. |
| [intExponent](int-exponent.md) | [JVM]<br/>open fun [intExponent](int-exponent.md)(d: Double): Int<br/>This returns the integer exponent of a double (-0.0175 returns -2 since -0.0175=-1.75*10^-2). |
| [lessThanAE](less-than-a-e.md) | [JVM]<br/>open fun [lessThanAE](less-than-a-e.md)(nSignificantDigits: Int, d1: Double, d2: Double): Boolean<br/>This tests if d1 is less than or almostEqual d2. |
| [longToDoubleNaN](long-to-double-na-n.md) | [JVM]<br/>fun [longToDoubleNaN](long-to-double-na-n.md)(tl: Long): Double<br/>This converts a long to a double (Long.MAX_VALUE becomes NaN). |
| [looserAngle0360](looser-angle0360.md) | [JVM]<br/>fun [looserAngle0360](looser-angle0360.md)(degrees: Double): Double<br/>This converts an angle (in degrees) into the range &gt;= 0 to &lt;=360 (note 360 is valid). |
| [looserAnglePM180](looser-angle-p-m180.md) | [JVM]<br/>fun [looserAnglePM180](looser-angle-p-m180.md)(degrees: Double): Double<br/>This converts an angle (in degrees) into the range &gt;=-180 to &lt;=180 (note 180 is valid). |
| [mantissa](mantissa.md) | [JVM]<br/>open fun [mantissa](mantissa.md)(d: Double): Double<br/>This returns the mantissa of a double (-0.0175 returns -1.75 since -0.0175=-1.75*10^-2). |
| [mathToCompassDegrees](math-to-compass-degrees.md) | [JVM]<br/>fun [mathToCompassDegrees](math-to-compass-degrees.md)(math: Double): Double<br/>This converts a Math-style degrees (East is 0, North is 90, ...) to a compass heading (where North is 0, East is 90, ...). |
| [minMax](min-max.md) | [JVM]<br/>fun [minMax](min-max.md)(min: Double, max: Double, current: Double): Double<br/>This forces a double into a range defined by min..max.<br/>[JVM]<br/>fun [minMax](min-max.md)(min: Int, max: Int, current: Int): Int<br/>This forces a int into a range defined by min..max. |
| [minMaxDef](min-max-def.md) | [JVM]<br/>fun [minMaxDef](min-max-def.md)(min: Double, max: Double, def: Double, current: Double): Double<br/>This forces a double into a range defined by min..max.<br/>[JVM]<br/>fun [minMaxDef](min-max-def.md)(min: Int, max: Int, def: Int, current: Int): Int<br/>This forces an int into a range defined by min..max. |
| [NaNCheck](-na-n-check.md) | [JVM]<br/>open fun [NaNCheck](-na-n-check.md)(d: Double): Double<br/>Checks if the value is NaN or infinite: returns Double.NaN if so; otherwise returns the original value. |
| [narrowToByte](narrow-to-byte.md) | [JVM]<br/>fun [narrowToByte](narrow-to-byte.md)(i: Int): Byte<br/>Safely narrows an int to a byte.<br/>[JVM]<br/>fun [narrowToByte](narrow-to-byte.md)(i: Long): Byte<br/>Safely narrows a long to a byte. |
| [narrowToChar](narrow-to-char.md) | [JVM]<br/>fun [narrowToChar](narrow-to-char.md)(i: Int): Char<br/>Safely narrows an int to a char.<br/>[JVM]<br/>fun [narrowToChar](narrow-to-char.md)(i: Long): Char<br/>Safely narrows a long to a char. |
| [narrowToInt](narrow-to-int.md) | [JVM]<br/>fun [narrowToInt](narrow-to-int.md)(i: Long): Int<br/>Safely narrows a long to an int. |
| [narrowToShort](narrow-to-short.md) | [JVM]<br/>fun [narrowToShort](narrow-to-short.md)(i: Int): Short<br/>Safely narrows an int to a short.<br/>[JVM]<br/>fun [narrowToShort](narrow-to-short.md)(i: Long): Short<br/>Safely narrows a long to a short. |
| [niceDouble](nice-double.md) | [JVM]<br/>fun [niceDouble](nice-double.md)(d: Double, nDigits: Int): Double<br/>Safely tries to un-bruise a double (8. |
| [odd](odd.md) | [JVM]<br/>open fun [odd](odd.md)(i: Int): Boolean<br/>Indicates if i is odd. |
| [oneDigitBigger](one-digit-bigger.md) | [JVM]<br/>open fun [oneDigitBigger](one-digit-bigger.md)(max: Double, def: Double, d: Double): Double<br/>This increases the first digit of d (for example, .8, .9, 1, 2, 3, ..., 9, 10, 20, 30, ...). |
| [oneDigitSmaller](one-digit-smaller.md) | [JVM]<br/>open fun [oneDigitSmaller](one-digit-smaller.md)(min: Double, def: Double, d: Double): Double<br/>This decreases the first digit of d (for example, 30, 20, 10, 9, ..., 3, 2, 1, .9, .8, ...). |
| [random](random.md) | [JVM]<br/>open fun [random](random.md)(max: Int): Int<br/>This returns a random integer between 0 and max-1. |
| [reduceHashCode](reduce-hash-code.md) | [JVM]<br/>open fun [reduceHashCode](reduce-hash-code.md)(hashCode: Int): [String](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/String.html)<br/>This reduces a hash code (currently to a 10 digit unsigned number -- no loss of information). |
| [roundDiv](round-div.md) | [JVM]<br/>open fun [roundDiv](round-div.md)(num: Int, den: Int): Int<br/>A div that rounds. |
| [roundTo](round-to.md) | [JVM]<br/>fun [roundTo](round-to.md)(d: Double, nPlaces: Int): Double<br/>Rounds the value to the specified number of decimal places. |
| [roundToByte](round-to-byte.md) | [JVM]<br/>fun [roundToByte](round-to-byte.md)(d: Double): Byte<br/>Safely rounds a double to a byte. |
| [roundToChar](round-to-char.md) | [JVM]<br/>fun [roundToChar](round-to-char.md)(d: Double): Char<br/>Safely rounds a double to a char (treated as unsigned short). |
| [roundToDouble](round-to-double.md) | [JVM]<br/>fun [roundToDouble](round-to-double.md)(d: Double): Double<br/>Safely rounds a double to the nearest integer (stored as a double). |
| [roundToInt](round-to-int.md) | [JVM]<br/>fun [roundToInt](round-to-int.md)(d: Double): Int<br/>Safely rounds a double to an int. |
| [roundToLong](round-to-long.md) | [JVM]<br/>fun [roundToLong](round-to-long.md)(d: Double): Long<br/>Safely rounds a double to a long. |
| [roundToShort](round-to-short.md) | [JVM]<br/>fun [roundToShort](round-to-short.md)(d: Double): Short<br/>Safely rounds a double to a short. |
| [roundToUByte](round-to-u-byte.md) | [JVM]<br/>fun [roundToUByte](round-to-u-byte.md)(d: Double): Short<br/>Safely rounds a double to a ubyte. |
| [roundToUInt](round-to-u-int.md) | [JVM]<br/>fun [roundToUInt](round-to-u-int.md)(d: Double): Long<br/>Safely rounds a double to a uint. |
| [roundToULong](round-to-u-long.md) | [JVM]<br/>fun [roundToULong](round-to-u-long.md)(d: Double): [BigInteger](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/math/BigInteger.html)<br/>Safely rounds a double to a ulong. |
| [roundToUShort](round-to-u-short.md) | [JVM]<br/>fun [roundToUShort](round-to-u-short.md)(d: Double): Int<br/>Safely rounds a double to a ushort. |
| [setSeed](set-seed.md) | [JVM]<br/>open fun [setSeed](set-seed.md)(seed: Long)<br/>This sets the seed for the next call to random(). |
| [sign1](sign1.md) | [JVM]<br/>open fun [sign1](sign1.md)(i: Int): Int<br/>This returns 1 for positive i's, -1 for negative i's, and 1 if i is 0 (i.e., 0 is treated as a positive number). |
| [smaller](smaller.md) | [JVM]<br/>open fun [smaller](smaller.md)(d: Double): Double<br/>This decreases the value (nicely). |
| [smaller15](smaller15.md) | [JVM]<br/>open fun [smaller15](smaller15.md)(d: Double): Double<br/>This gets the double value from the string, decreases it (nicely), so the mantissa is 1 or 5. |
| [smallerAngle](smaller-angle.md) | [JVM]<br/>open fun [smallerAngle](smaller-angle.md)(d: Double): Double<br/>This decreases the double degree value (nicely). |
| [smallerDouble](smaller-double.md) | [JVM]<br/>open fun [smallerDouble](smaller-double.md)(def: Double, mult: Double, min: Double, d: Double): Double<br/>This decreases d to the previous multiple of mult. |
| [suggestDivisions](suggest-divisions.md) | [JVM]<br/>open fun [suggestDivisions](suggest-divisions.md)(range: Double): Array&lt;Double&gt;<br/>This suggests the division distance along an axis so that there will be about 5-7 primary divisions and 10-25 secondary. |
| [suggestLowHigh](suggest-low-high.md) | [JVM]<br/>open fun [suggestLowHigh](suggest-low-high.md)(low: Double, high: Double): Array&lt;Double&gt;<br/>This returns a nice bounding range (e.g., for an axis) which includes low and high. |
| [suggestMaxDivisions](suggest-max-divisions.md) | [JVM]<br/>open fun [suggestMaxDivisions](suggest-max-divisions.md)(range: Double, maxDivisions: Int): Double<br/>This suggests the division distance along an axis so that there will be between maxDivisions/2 and maxDivisions. |
| [ten](ten.md) | [JVM]<br/>open fun [ten](ten.md)(toThe: Int): Double<br/>This returns an integer power of ten. |
| [trunc](trunc.md) | [JVM]<br/>open fun [trunc](trunc.md)(d: Double): Double<br/>This returns the truncated part of a double. |
| [truncToInt](trunc-to-int.md) | [JVM]<br/>open fun [truncToInt](trunc-to-int.md)(d: Double): Int<br/>This returns the truncated part of a double, stored as an int. |
| [ulongToDouble](ulong-to-double.md) | [JVM]<br/>fun [ulongToDouble](ulong-to-double.md)(tl: Long): Double<br/>This converts an unsigned long to a double. |
| [unsignedByte](unsigned-byte.md) | [JVM]<br/>fun [unsignedByte](unsigned-byte.md)(b: Int): Int<br/>Safely converts a signed byte (-128..127) to an unsigned byte (0..255). |