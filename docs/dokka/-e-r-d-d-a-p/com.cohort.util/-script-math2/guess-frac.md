//[ERDDAP](../../../index.md)/[com.cohort.util](../index.md)/[ScriptMath2](index.md)/[guessFrac](guess-frac.md)

# guessFrac

[JVM]\
open fun [guessFrac](guess-frac.md)(r: Double, int3: Array&lt;Int&gt;)

Looks for a fraction very close to some decimal value. 

- Tries denominators 1..1000. So answer is at least accurate to within 1/1000th. For example, .33333 -&gt; 1/3.
- For example: -1.75 -&gt; whole=-1, numerator=-3 denominator=4
- Results stored in int3[0=whole, 1=num, 2=den].
- Slow if no good match found, but this does a good approximate job that gcd() might miss. ```kotlin
       int ar[]=new int[3];
       double d=-1.75;
       int whole=guessFrac(d,ar);
       //results: ar[0]=-1, ar[1]=-3, ar[2]=4
   
   ```