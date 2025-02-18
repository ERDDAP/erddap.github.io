# Krediter

## Bidrag tillERDDAP™kodkodkod{#contributions-to-erddap-code} 
* MergeIR
    [EDDGridFrånMergeIRFiles.java](/docs/server-admin/datasets#eddgridfrommergeirfiles)var skriven och bidragen av Jonathan Lafite och Philippe Makowski från R.Tech Engineering (licens: upphovsrättsskyddad öppen källkod) . Tack, Jonathan och Philippe&#33;
     
* TableWriterDataTable
    [.data Bord (TableWriterDataTable.java) ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#fileType)skrevs och bidrog av Roland SchweitzerNOAA  (licens: upphovsrättsskyddad öppen källkod) . Tack, Roland&#33;
     
* Json-ld
Den första versionen av den[Semantisk märkning av datamängder med json-ld (JSON Länkade data) ](/docs/server-admin/additional-information#json-ld)funktion (och därmed allt det hårda arbetet med att utforma innehållet) skrevs och bidrog (licens: upphovsrättsskyddad öppen källkod) Adam Leadbetter och Rob Fuller från Marine Institute i Irland. Tack, Adam och Rob&#33;
     
*   orderBy  
Koden för koden[orderByMeanfilterfilter](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#orderByMean)in itabledapoch de omfattande ändringarna av koden för att stödja[_variableName/divisor:offset_ notation](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#orderByDivisorOptions)för allaorderByfilter skrevs och bidrog (licens: upphovsrättsskyddad öppen källkod) av Rob Fuller och Adam Leadbetter från Marine Institute i Irland. Tack, Rob och Adam&#33;
     
* Borderless Marker Typer
Koden för tre nya markörtyper (Borderless Filled Square, Borderless Filled Circle, Borderless Filled Up Triangle) Marco Alba från ETT/EMODnet Physics. Tack, Marco Alba&#33;
     
* Översättningar av messages.xml
Den första versionen av koden i TranslateMessages.java som använder Googles översättningstjänst för att översätta meddelanden.xml till olika språk skrevs av Qi Zeng, som arbetade som en Google Summer of Code intern. Tack, Qi&#33;
     
*   orderBySum
Koden för koden[orderBySumma filter](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#orderBySum)in itabledap  (baserat på Rob Fuller och Adam LeadbettersorderByMean) Kontrollera alla och avmarkera alla knappar påEDDGridData Access Form skrevs och bidrog (licens: upphovsrättsskyddad öppen källkod) Marco Alba från ETT Solutions och EMODnet. Tack, Marco&#33;
     
* Out-of-range .transparent Png Förfrågningar
    ERDDAP™accepterar nu förfrågningar om . transparent transparent transparent Png när latitud- och/eller longitudvärden är delvis eller helt out-of-range. (Detta varERDDAP™GitHub Problem #19, publicerad av Rob Fuller - tack för att ha publicerat det, Rob.) Koden för att fixa detta skrevs av Chris John. Tack, Chris&#33;
     
* Visa bas64 bilddata i.htmlTablesvar
Koden för att visa bas64 bilddata i.htmlTableSvaren bidrog till Marco Alba av ETT/EMODnet Physics. Tack, Marco Alba&#33;
     
* nThreads Förbättring
NThreads-systemet för EDDTableFromFiles förbättrades avsevärt. Dessa förändringar leder till en stor hastighetsförbättring (2X speedup när nThreads är inställd på 2 eller mer) för de mest utmanande förfrågningarna (när ett stort antal filer måste behandlas för att samla in resultaten) . Dessa förändringar kommer också att leda till en allmän hastighet hela tiden.ERDDAP™. Koden för dessa ändringar bidrog till Chris John. Tack, Chris&#33;

* Färgpalett EK80 för akustiska datamängder. Tack Rob Cermak&#33;

* EDDTableAggregateRows aggregation över alla barn fasta. Tack Marco Alba&#33;

* Fix för felaktiga varNames i loggar. Tack Ayush Singh&#33;
