//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath](index.md)

# ScriptMath

[JVM]\
open class [ScriptMath](index.md)

This class makes almost all of the static methods in java.lang.Math accessible to JexlScript scripts as &quot;Math.*name*()&quot; methods.

#### Author

Bob Simons (was bob.simons@noaa.gov, now BobSimons2.00@gmail.com) 2019-11-14

## Constructors

| | |
|---|---|
| [ScriptMath](-script-math-constructor.md) | [JVM]<br/>constructor() |

## Properties

| Name | Summary |
|---|---|
| [E](-e.md) | [JVM]<br/>val [E](-e.md): Double = 2.718281828459045<br/>The double value that is closer than any other to e, the base of the natural logarithms. |
| [PI](-p-i.md) | [JVM]<br/>val [PI](-p-i.md): Double = 3.141592653589793<br/>The double value that is closer than any other to pi, the ratio of the circumference of a circle to its diameter. |

## Functions

| Name | Summary |
|---|---|
| [abs](abs.md) | [JVM]<br/>open fun [abs](abs.md)(a: Double): Double<br/>Returns the absolute value of a double value.<br/>[JVM]<br/>open fun [abs](abs.md)(a: Float): Float<br/>Returns the absolute value of a float value.<br/>[JVM]<br/>open fun [abs](abs.md)(a: Int): Int<br/>Returns the absolute value of an int value.<br/>[JVM]<br/>open fun [abs](abs.md)(a: Long): Long<br/>Returns the absolute value of a long value. |
| [acos](acos.md) | [JVM]<br/>open fun [acos](acos.md)(a: Double): Double<br/>Returns the arc cosine of a value; the returned angle is in the range 0.0 through pi. |
| [addExact](add-exact.md) | [JVM]<br/>open fun [addExact](add-exact.md)(x: Int, y: Int): Int<br/>Returns the sum of its arguments, throwing an exception if the result overflows an int.<br/>[JVM]<br/>open fun [addExact](add-exact.md)(x: Long, y: Long): Long<br/>Returns the sum of its arguments, throwing an exception if the result overflows a long. |
| [asin](asin.md) | [JVM]<br/>open fun [asin](asin.md)(a: Double): Double<br/>Returns the arc sine of a value; the returned angle is in the range -pi/2 through pi/2. |
| [atan](atan.md) | [JVM]<br/>open fun [atan](atan.md)(a: Double): Double<br/>Returns the arc tangent of a value; the returned angle is in the range -pi/2 through pi/2. |
| [atan2](atan2.md) | [JVM]<br/>open fun [atan2](atan2.md)(y: Double, x: Double): Double<br/>Returns the angle theta from the conversion of rectangular coordinates (x, y) to polar coordinates (r, theta). |
| [cbrt](cbrt.md) | [JVM]<br/>open fun [cbrt](cbrt.md)(a: Double): Double<br/>Returns the cube root of a double value. |
| [ceil](ceil.md) | [JVM]<br/>open fun [ceil](ceil.md)(a: Double): Double<br/>Returns the smallest (closest to negative infinity) double value that is greater than or equal to the argument and is equal to a mathematical integer. |
| [copySign](copy-sign.md) | [JVM]<br/>open fun [copySign](copy-sign.md)(magnitude: Double, sign: Double): Double<br/>open fun [copySign](copy-sign.md)(magnitude: Float, sign: Float): Float<br/>Returns the first floating-point argument with the sign of the second floating-point argument. |
| [cos](cos.md) | [JVM]<br/>open fun [cos](cos.md)(a: Double): Double<br/>Returns the trigonometric cosine of an angle. |
| [cosh](cosh.md) | [JVM]<br/>open fun [cosh](cosh.md)(x: Double): Double<br/>Returns the hyperbolic cosine of a double value. |
| [decrementExact](decrement-exact.md) | [JVM]<br/>open fun [decrementExact](decrement-exact.md)(a: Int): Int<br/>Returns the argument decremented by one, throwing an exception if the result overflows an int.<br/>[JVM]<br/>open fun [decrementExact](decrement-exact.md)(a: Long): Long<br/>Returns the argument decremented by one, throwing an exception if the result overflows a long. |
| [exp](exp.md) | [JVM]<br/>open fun [exp](exp.md)(a: Double): Double<br/>Returns Euler's number e raised to the power of a double value. |
| [expm1](expm1.md) | [JVM]<br/>open fun [expm1](expm1.md)(x: Double): Double<br/>Returns ex -1. |
| [floor](floor.md) | [JVM]<br/>open fun [floor](floor.md)(a: Double): Double<br/>Returns the largest (closest to positive infinity) double value that is less than or equal to the argument and is equal to a mathematical integer. |
| [floorDiv](floor-div.md) | [JVM]<br/>open fun [floorDiv](floor-div.md)(x: Int, y: Int): Int<br/>Returns the largest (closest to positive infinity) int value that is less than or equal to the algebraic quotient.<br/>[JVM]<br/>open fun [floorDiv](floor-div.md)(x: Long, y: Long): Long<br/>Returns the largest (closest to positive infinity) long value that is less than or equal to the algebraic quotient. |
| [floorMod](floor-mod.md) | [JVM]<br/>open fun [floorMod](floor-mod.md)(x: Int, y: Int): Int<br/>Returns the floor modulus of the int arguments.<br/>[JVM]<br/>open fun [floorMod](floor-mod.md)(x: Long, y: Long): Long<br/>Returns the floor modulus of the long arguments. |
| [getExponent](get-exponent.md) | [JVM]<br/>open fun [getExponent](get-exponent.md)(d: Double): Int<br/>Returns the unbiased exponent used in the representation of a double.<br/>[JVM]<br/>open fun [getExponent](get-exponent.md)(f: Float): Int<br/>Returns the unbiased exponent used in the representation of a float. |
| [hypot](hypot.md) | [JVM]<br/>open fun [hypot](hypot.md)(x: Double, y: Double): Double<br/>Returns sqrt(x2 +y2) without intermediate overflow or underflow. |
| [IEEEremainder](-i-e-e-eremainder.md) | [JVM]<br/>open fun [IEEEremainder](-i-e-e-eremainder.md)(f1: Double, f2: Double): Double<br/>Computes the remainder operation on two arguments as prescribed by the IEEE 754 standard. |
| [incrementExact](increment-exact.md) | [JVM]<br/>open fun [incrementExact](increment-exact.md)(a: Int): Int<br/>Returns the argument incremented by one, throwing an exception if the result overflows an int.<br/>[JVM]<br/>open fun [incrementExact](increment-exact.md)(a: Long): Long<br/>Returns the argument incremented by one, throwing an exception if the result overflows a long. |
| [log](log.md) | [JVM]<br/>open fun [log](log.md)(a: Double): Double<br/>Returns the natural logarithm (base e) of a double value. |
| [log10](log10.md) | [JVM]<br/>open fun [log10](log10.md)(a: Double): Double<br/>Returns the base 10 logarithm of a double value. |
| [log1p](log1p.md) | [JVM]<br/>open fun [log1p](log1p.md)(x: Double): Double<br/>Returns the natural logarithm of the sum of the argument and 1. |
| [max](max.md) | [JVM]<br/>open fun [max](max.md)(a: Double, b: Double): Double<br/>Returns the greater of two double values.<br/>[JVM]<br/>open fun [max](max.md)(a: Float, b: Float): Float<br/>Returns the greater of two float values.<br/>[JVM]<br/>open fun [max](max.md)(a: Int, b: Int): Int<br/>Returns the greater of two int values.<br/>[JVM]<br/>open fun [max](max.md)(a: Long, b: Long): Long<br/>Returns the greater of two long values. |
| [min](min.md) | [JVM]<br/>open fun [min](min.md)(a: Double, b: Double): Double<br/>Returns the smaller of two double values.<br/>[JVM]<br/>open fun [min](min.md)(a: Float, b: Float): Float<br/>Returns the smaller of two float values.<br/>[JVM]<br/>open fun [min](min.md)(a: Int, b: Int): Int<br/>Returns the smaller of two int values.<br/>[JVM]<br/>open fun [min](min.md)(a: Long, b: Long): Long<br/>Returns the smaller of two long values. |
| [multiplyExact](multiply-exact.md) | [JVM]<br/>open fun [multiplyExact](multiply-exact.md)(x: Int, y: Int): Int<br/>Returns the product of the arguments, throwing an exception if the result overflows an int.<br/>[JVM]<br/>open fun [multiplyExact](multiply-exact.md)(x: Long, y: Long): Long<br/>Returns the product of the arguments, throwing an exception if the result overflows a long. |
| [negateExact](negate-exact.md) | [JVM]<br/>open fun [negateExact](negate-exact.md)(a: Int): Int<br/>Returns the negation of the argument, throwing an exception if the result overflows an int.<br/>[JVM]<br/>open fun [negateExact](negate-exact.md)(a: Long): Long<br/>Returns the negation of the argument, throwing an exception if the result overflows a long. |
| [nextAfter](next-after.md) | [JVM]<br/>open fun [nextAfter](next-after.md)(start: Double, direction: Double): Double<br/>open fun [nextAfter](next-after.md)(start: Float, direction: Double): Float<br/>Returns the floating-point number adjacent to the first argument in the direction of the second argument. |
| [nextDown](next-down.md) | [JVM]<br/>open fun [nextDown](next-down.md)(d: Double): Double<br/>Returns the floating-point value adjacent to d in the direction of negative infinity.<br/>[JVM]<br/>open fun [nextDown](next-down.md)(f: Float): Float<br/>Returns the floating-point value adjacent to f in the direction of negative infinity. |
| [nextUp](next-up.md) | [JVM]<br/>open fun [nextUp](next-up.md)(d: Double): Double<br/>Returns the floating-point value adjacent to d in the direction of positive infinity.<br/>[JVM]<br/>open fun [nextUp](next-up.md)(f: Float): Float<br/>Returns the floating-point value adjacent to f in the direction of positive infinity. |
| [pow](pow.md) | [JVM]<br/>open fun [pow](pow.md)(a: Double, b: Double): Double<br/>Returns the value of the first argument raised to the power of the second argument. |
| [random](random.md) | [JVM]<br/>open fun [random](random.md)(): Double<br/>Returns a double value with a positive sign, greater than or equal to 0.0 and less than 1.0. |
| [rint](rint.md) | [JVM]<br/>open fun [rint](rint.md)(a: Double): Double<br/>Returns the double value that is closest in value to the argument and is equal to a mathematical integer. |
| [round](round.md) | [JVM]<br/>open fun [round](round.md)(a: Double): Long<br/>Returns the closest long to the argument, with ties rounding to positive infinity.<br/>[JVM]<br/>open fun [round](round.md)(a: Float): Int<br/>Returns the closest int to the argument, with ties rounding to positive infinity. |
| [scalb](scalb.md) | [JVM]<br/>open fun [scalb](scalb.md)(d: Double, scaleFactor: Int): Double<br/>Returns d × 2scaleFactor rounded as if performed by a single correctly rounded floating-point multiply to a member of the double value set.<br/>[JVM]<br/>open fun [scalb](scalb.md)(f: Float, scaleFactor: Int): Float<br/>Returns f × 2scaleFactor rounded as if performed by a single correctly rounded floating-point multiply to a member of the float value set. |
| [signum](signum.md) | [JVM]<br/>open fun [signum](signum.md)(d: Double): Double<br/>Returns the signum function of the argument; zero if the argument is zero, 1.0 if the argument is greater than zero, -1.0 if the argument is less than zero.<br/>[JVM]<br/>open fun [signum](signum.md)(f: Float): Float<br/>Returns the signum function of the argument; zero if the argument is zero, 1.0f if the argument is greater than zero, -1.0f if the argument is less than zero. |
| [sin](sin.md) | [JVM]<br/>open fun [sin](sin.md)(a: Double): Double<br/>Returns the trigonometric sine of an angle. |
| [sinh](sinh.md) | [JVM]<br/>open fun [sinh](sinh.md)(x: Double): Double<br/>Returns the hyperbolic sine of a double value. |
| [sqrt](sqrt.md) | [JVM]<br/>open fun [sqrt](sqrt.md)(a: Double): Double<br/>Returns the correctly rounded positive square root of a double value. |
| [subtractExact](subtract-exact.md) | [JVM]<br/>open fun [subtractExact](subtract-exact.md)(x: Int, y: Int): Int<br/>Returns the difference of the arguments, throwing an exception if the result overflows an int.<br/>[JVM]<br/>open fun [subtractExact](subtract-exact.md)(x: Long, y: Long): Long<br/>Returns the difference of the arguments, throwing an exception if the result overflows a long. |
| [tan](tan.md) | [JVM]<br/>open fun [tan](tan.md)(a: Double): Double<br/>Returns the trigonometric tangent of an angle. |
| [tanh](tanh.md) | [JVM]<br/>open fun [tanh](tanh.md)(x: Double): Double<br/>Returns the hyperbolic tangent of a double value. |
| [toDegrees](to-degrees.md) | [JVM]<br/>open fun [toDegrees](to-degrees.md)(angrad: Double): Double<br/>Converts an angle measured in radians to an approximately equivalent angle measured in degrees. |
| [toIntExact](to-int-exact.md) | [JVM]<br/>open fun [toIntExact](to-int-exact.md)(value: Long): Int<br/>Returns the value of the long argument; throwing an exception if the value overflows an int. |
| [toRadians](to-radians.md) | [JVM]<br/>open fun [toRadians](to-radians.md)(angdeg: Double): Double<br/>Converts an angle measured in degrees to an approximately equivalent angle measured in radians. |
| [ulp](ulp.md) | [JVM]<br/>open fun [ulp](ulp.md)(d: Double): Double<br/>open fun [ulp](ulp.md)(f: Float): Float<br/>Returns the size of an ulp of the argument. |