# Credits

## Bidrag til bog/antologi ERDDAP™ kodekode{#contributions-to-erddap-code} 
* Sammenfletning
     [ EDDGrid FraMergeIRFiles.java](/docs/server-admin/datasets#eddgridfrommergeirfiles) blev skrevet og bidraget af Jonathan Lafite og Philippe Makowski af R.Tech Engineering (licens: ophavsretlig open source) . Tak, Jonatan og Philippe&#33;
     
* TabelWriterDataTable
     [.data Tabelbord (TabelWriterDataTable.java) ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#fileType) blev skrevet og bidraget af Roland Schweitzer af NOAA   (licens: ophavsretlig open source) . Tak, fordi du var Roland&#33;
     
* json-ld
Den oprindelige version af den [Semantic Markup af Datasets med json-ld (JSON Disse data) ](/docs/server-admin/additional-information#json-ld) funktionsfunktion (og dermed alt det hårde arbejde i at designe indholdet) blev skrevet og bidraget (licens: ophavsretlig open source) af Adam Leadbetter og Rob Fuller of te Marine Institute i Irland. Tak, fordi du var Adam og Rob&#33;
     
*    orderBy   
Koden til koden [ orderByMean filter filter filter](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#orderByMean) i in in in in tabledap og de omfattende ændringer af koden til at støtte koden [_variableName/divisor:offset_ notation](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#orderByDivisorOptions) for alle orderBy filtre blev skrevet og bidraget (licens: ophavsretlig open source) af Rob Fuller og Adam Leadbetter af Marine Institute i Irland. Tak, fordi du var Rob og Adam&#33;
     
* Passløse markørtyper
Koden for tre nye mærketyper (Borderless Filled Square, Borderless Filled Circle, Borderless Filled Up Triangle) blev bidraget af Marco Alba af ETT / EMODnet Fysik. Tak, fordi du var Marco Alba&#33;
     
* Oversættelser af beskeder.xml
Den oprindelige version af koden i OversætMessages.java, som bruger Googles oversættelsestjeneste til at oversætte meddelelser.xml til forskellige sprog blev skrevet af Qi Zeng, der arbejdede som en Google Summer of Code praktikant. Tak, fordi du var Qi&#33;
     
*    orderBy Sum
Koden til koden [ orderBy Sum filter](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#orderBySum) i in in in in tabledap   (baseret på Rob Fuller og Adam Leadbetter's orderByMean ) og Tjek alle og fjerne alle knapper på knapperne EDDGrid Data Access Form blev skrevet og bidraget (licens: ophavsretlig open source) af Marco Alba af ETT Solutions og EMODnet. Tak, fordi du var Marco&#33;
     
* Out-of-range .transparent Png anmodninger
     ERDDAP™ nu accepterer anmodninger om . transparent transparent transparent Png's når breddegraden og/eller længdeværdierne er delvist eller fuldt ud. (Dette var ERDDAP™ GitHub spørgsmål #19, skrevet af Rob Fuller -- takket være at skrive, at, Rob.) Koden til at rette dette blev skrevet af Chris John. Tak, fordi du var Chris&#33;
     
* Vis basis64 billeddata i .htmlTable besvarelser
Koden til visning af basis64 billeddata i .htmlTable Svar blev bidraget af Marco Alba af ETT / EMODnet Physics. Tak, fordi du var Marco Alba&#33;
     
* nThreads Improvement
nThreads-systemet for EDDTableFraFiles blev væsentligt forbedret. Disse ændringer fører til en enorm hastighed forbedring (f.eks. 2X speedup, når nThreads er indstillet til 2 eller flere) for de mest udfordrende ønsker (når et stort antal filer skal behandles for at indsamle resultaterne) . Disse ændringer vil også føre til en generel hastighed gennem hele tiden ERDDAP™ . Koden for disse ændringer blev bidraget af Chris John. Tak, fordi du var Chris&#33;

* Farvepalet EK80 til akustiske datasæt. Tak, fordi du indsendte en redigering.

* EDDTableAggregateRows aggregation på tværs af alle børn fast. Tak, fordi du indsendte en redigering.

* Fix for forkerte varnavne i logfiler. Tak, fordi du indsendte en redigering.
