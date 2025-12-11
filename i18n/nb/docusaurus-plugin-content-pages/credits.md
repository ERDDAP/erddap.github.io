# Kreditter

## Bidrag til ERDDAP™ kode{#contributions-to-erddap-code} 
* MergeIR
     [ EDDGrid Fra FlightIRFiles.java](/docs/server-admin/datasets#eddgridfrommergeirfiles) ble skrevet og bidratt av Jonathan Lafite og Philippe Makowski fra R.Tech Engineering (lisens: opphavsrettslig åpen kilde) .. Takk, Jonathan og Philippe&#33;
     
* TabellSkriverDatatabell
     [.data Tabell (TableWriterDataTable.java) ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#fileType) ble skrevet og bidratt av Roland Schweitzer av NOAA   (lisens: opphavsrettslig åpen kilde) .. Takk, Roland&#33;
     
* Json-ld
Den første versjonen av [Semantisk markering av datasett med json-ld (JSON Linkede data) ](/docs/server-admin/additional-information#json-ld) funksjon (og dermed alt det harde arbeidet i å designe innholdet) ble skrevet og bidratt (lisens: opphavsrettslig åpen kilde) av Adam Leadbetter og Rob Fuller fra Marine Institute i Irland. Takk, Adam og Rob&#33;
     
*    orderBy   
Koden til [ orderByMean filter](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#orderByMean) i tabledap og de store endringene i koden for å støtte [_variabelt navn/divisor:offset_notasjon](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#orderByDivisorOptions) For alle orderBy Filtre ble skrevet og bidratt (lisens: opphavsrettslig åpen kilde) Rob Fuller og Adam Leadbetter fra Marine Institute i Irland. Takk, Rob og Adam&#33;
     
* Grenseløse merketyper
Koden for tre nye markørtyper (Borderless Fylled Square, Borderless Fylled Circle, Borderless Fylled Up Triangle) ble bidratt av Marco Alba av ETT / EMODnet Fysikk. Takk, Marco Alba&#33;
     
* Oversettelser av messages.xml
Den opprinnelige versjonen av koden i TranslateMessages.java som bruker Googles oversettelsestjeneste til å oversette meldinger.xml til ulike språk ble skrevet av Qi Zeng, som jobbet som Google Summer of Code praktikant. Takk, Qi&#33;
     
*    orderBy Sum
Koden til [ orderBy Sum filter](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#orderBySum) i tabledap   (basert på Rob Fuller og Adam Leadbetters orderByMean ) Sjekk alle og fjern alle knappene på EDDGrid Data Access Form ble skrevet og bidratt (lisens: opphavsrettslig åpen kilde) av Marco Alba av ITT Solutions og EMODnet. Takk, Marco&#33;
     
* Utenfor rekkevidde. Png Forespørsler
     ERDDAP™ nå aksepterer forespørsler. gjennomsiktig Png er når breddegrads- og/eller lengdegradsverdiene er delvis eller helt utenfor rekkevidde. (Dette var ERDDAP™ GitHub Issues #19, skrevet av Rob Fuller -- Takk for innlegget, Rob.) Koden til å fikse dette er skrevet av Chris John. Takk, Chris&#33;
     
* Vis base64 bildedata i .htmlTable svar
Koden for å vise base64 bildedata i .htmlTable Svarene ble bidratt av Marco Alba av ETT / EMODnet Physics. Takk, Marco Alba&#33;
     
* nThreads forbedring
NThreads-systemet for EDDTableFromFiles ble betydelig forbedret. Disse endringene fører til en enorm hastighetsforbedring (For eksempel 2X speedup når nThreads er satt til 2 eller mer) For de mest utfordrende forespørsler (Når et stort antall filer må behandles for å samle resultatene) .. Disse endringene vil også føre til en generell fart gjennom hele ERDDAP™ .. Koden for disse endringene var bidratt av Chris John. Takk, Chris&#33;

* Farge palett EK80 for akustiske datasett. Takk Rob Cermak&#33;

* EDDTableAggregate roads aggregation over alle barn faste. Takk Marco Alba&#33;

* Rett for feil varNames i logger. Takk, Ayush Singh&#33;
