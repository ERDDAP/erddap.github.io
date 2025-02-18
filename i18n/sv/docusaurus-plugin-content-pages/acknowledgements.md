# Erkännanden

Bidragsgivaren[krediter](https://github.com/erddap/erddap/blob/main/CREDITS.md)FörERDDAP™är nu på en separat sida.ERDDAP™är en produkt av[NOAA](https://www.noaa.gov "National Oceanic and Atmospheric Administration") [NMFS](https://www.fisheries.noaa.gov "National Marine Fisheries Service") [SWFSC](https://swfsc.noaa.gov "Southwest Fisheries Science Center") [ERD](https://www.fisheries.noaa.gov/about/environmental-research-division-southwest-fisheries-science-center "Environmental Research Division").

Bob Simons är den ursprungliga huvudförfattaren tillERDDAP™  (designer och mjukvaruutvecklare som skrevERDDAP-specifik kod) . Utgångspunkten var Roy Mendelssohns (Bobs chef) Förslag till att Bob vänder sitt ConvertTable-program (ett litet verktyg som konverterar tabelldata från ett format till ett annat och som till stor del var kod från Bobs pre-NOAAarbete som Bob återlicensieras för att vara öppen källkod) till en webbtjänst.

Det var och är Roy Mendelssohns idéer om distribuerade datasystem, hans första förslag till Bob och hans pågående stöd. (inklusive hårdvara, nätverk och annat mjukvarustöd och genom att frigöra Bobs tid så att han kunde spendera mer tid påERDDAP™kodkodkod) Detta projekt har gjort det möjligt och möjliggjort dess tillväxt.

ochERDDAP-specifik kod är licensierad som upphovsrättsskyddad öppen källkod, med[NOAA](https://www.noaa.gov)Att hålla upphovsrätten. Se[ERDDAP™licens](/license).
ERDDAP™använder upphovsrättsskyddad öppen källkod, Apache, LGPL, MIT/X, Mozilla och offentliga domänbibliotek och data.
ERDDAP™inte kräver någon GPL-kod eller kommersiella program.

Huvuddelen av finansieringen för arbete påERDDAP™har kommit frånNOAADet betalade Bob Simons lön. För det första året avERDDAP™När han var statlig entreprenör kom finansieringen från[NOAACoastWatch](https://coastwatch.noaa.gov/)program,[NOAAIOOS](https://ioos.noaa.gov/)Programmet, och den nu nedlagda Pacific Ocean Shelf Tracking (POST) Programmet.

Mycket kredit går till de mångaERDDAP™administratörer och användare som har gjort förslag och kommentarer som har lett till många förbättringarERDDAP. Många nämns vid namn i[Lista över förändringar](/changes). Tack alla (namn och unnamed) Mycket. Således,ERDDAP™är ett bra exempel på[Användar-Driven Innovation](https://en.wikipedia.org/wiki/User_innovation)Där produktinnovation ofta kommer från konsumenter (ERDDAP™användare) inte bara producenterna (ERDDAP™utvecklare) .

Här är listan över programvara och datamängder som finns iERDDAP™distribution. Vi är mycket tacksamma för alla dessa. Tack så mycket.
\\[Från och med 2021 har det blivit nästan omöjligt att korrekt lista alla källor till kod förERDDAP™för några av biblioteken vi använder (särskilt netcdf-java och särskilt AWS) Använd i sin tur många andra bibliotek. Alla bibliotek somERDDAP™Kodsamtal direkt ingår nedan, liksom många av de bibliotek som de andra biblioteken kallar i sin tur. Om du ser att vi har utelämnat ett projekt nedan, vänligen låt oss veta så att vi kan lägga till projektet nedan och ge kredit där kredit beror.\\]

## Översikt{#overview} 
ERDDAP™är en[JavaServlet](https://www.oracle.com/technetwork/java/javaee/servlet/index.html)Programmet. på At at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at atERDDen går inuti en[Tomcat](https://tomcat.apache.org/)applikationsserver (Licens:[Apache](https://www.apache.org/licenses/)) med en[Apache](https://httpd.apache.org/)Webserver (Licens:[Apache](https://www.apache.org/licenses/)) kör på en dator med hjälp av[Red Hat Linux](https://www.redhat.com/)operativsystem (Licens:[GPL](https://www.gnu.org/licenses/gpl-3.0.html)) .
     
## Dataset{#datasets} 
Datauppsättningarna är från olika källor. Se metadata (i synnerhet "sourceUrl", "infoUrl","institution"och "licens") för varje dataset. Många datamängder har en begränsning på deras användning som kräver att du citerar/krediterar dataleverantören när du använder data. Det är alltid bra att citera/kreditera dataleverantören. Se[Hur man citerar en dataset i en papper](https://coastwatch.pfeg.noaa.gov/erddap/information.html#citeDataset).
     
## CoHort Software{#cohort-software} 
[Kom/kohort klasser](#cohort-software)är från CoHort Software ( https://www.cohortsoftware.com ) som gör dessa klasser tillgängliga med en MIT/X-liknande licens (se klasser/com/cohort/util/LICENSE.txt) .
     
## CoastWatch Browser{#coastwatch-browser} 
ERDDAP™använder kod från CoastWatch Browser-projektet (Nu decomissioned) från[NOAACoastWatch](https://coastwatch.noaa.gov) [Västkusten Regional Node](https://coastwatch.pfeg.noaa.gov/)  (licens: upphovsrättsskyddad öppen källkod) . Projektet initierades och förvaltades av Dave Foley, en före detta samordnare avNOAACoastWatch West Coast Regional Node. All CoastWatch Browser-kod skrevs av Bob Simons.
     
## OPeNDAP {#opendap} 
Data från[OPeNDAP](https://www.opendap.org)servrar läses med[Java DAP1.1.7](https://www.opendap.org/deprecated-software/java-dap)  (Licens: LGPL) .
     
## NetCDF-java{#netcdf-java} 
NetCDFfiler filer (.nc) GMT-stilNetCDFfiler filer (.grd) GRIB och BUFR läses och skrivs med kod i[NetCDF JavaBibliotek](https://www.unidata.ucar.edu/software/netcdf-java/)  (Licens:[BSD-3](https://github.com/Unidata/netcdf-java/blob/develop/LICENSE)) Från[Unidata](https://www.unidata.ucar.edu/).

Programvara som ingår iNetCDF JavaJar:

* SF4j
ochNetCDF JavaBibliotek och Cassandra behöver[SF4j från Simple Logging Facade förJava](https://www.slf4j.org/)projekt. För närvarande,ERDDAP™använder slf4j-simple-xx.jar omdöpt som slf4j.jar för att möta detta behov. (Licens:[MIT/X](https://www.slf4j.org/license.html)) .
     
* JDOM JDOM
ochNetCDF Java.jar innehåller XML-bearbetningskod från[JDOM JDOM](http://www.jdom.org/)  (Licens:[Apache](http://www.jdom.org/docs/faq.html#a0030)) , som ingår i netcdfAll.jar.
     
* Joda
ochNetCDF Java.jar inkluderar[Joda](https://www.joda.org/joda-time/)för kalenderberäkningar (som förmodligen inte används avERDDAP) . (Licens:[Apache 2.0](https://www.joda.org/joda-time/licenses.html)) .
     
* Apache
ochNetCDF Java.jar innehåller .jar filer från flera[Apache projekt](https://www.apache.org/)Från:
    [commons-codec](https://commons.apache.org/proper/commons-codec/),
    [commons-discovery](https://commons.apache.org/discovery/),
    [Vanliga -httpKundklient](https://hc.apache.org/httpcomponents-client-ga/),
    [commons-logging](https://commons.apache.org/proper/commons-logging/)  
    [HttpComponents](https://hc.apache.org),
     (För alla: licens:[Apache](https://www.apache.org/licenses/LICENSE-2.0))   
Dessa ingår i netcdfAll.jar.
     
* Andra
ochNetCDF Java.jar innehåller också kod från: com.google.code.findbugs, com.google.errorprone, com.google.guava, com.google.j2objc, com.google.protobuf, edu.ucar, org.codehaus.mojo, com.beust.jcommander, com.google.common, com.google.re2j och com.google.thirdparty. (Google använder Apache och BSD-liknande licenser.)   
         
## SGT{#sgt} 
Graferna och kartorna skapas på flygningen med en modifierad version avNOAASGT (var på https://www.pmel.noaa.gov/epic/java/sgt/ Nu avbröt) version 3 (enJavaScientific Graphics Toolkit skriven av Donald Denbo på[NOAAPMEL](https://www.pmel.noaa.gov/))   (licens: upphovsrättsskyddad öppen källkod (var på https://www.pmel.noaa.gov/epic/java/license.html ) ) .
     
## Walter Zorn{#walter-zorn} 
Stora, HTML-verktygERDDAPHTML-sidor skapas med Walter Zorns wz\\_tooltip. js (Licens: LGPL) .
Sliders och drag- och släppfunktionen hos Slide Sorter skapas med Walter Zorns wz\\_dragdrop.js (Licens: LGPL) .
     
## OpenPDF{#openpdf} 
.pdf filer skapas med[openpdf](https://github.com/LibrePDF/OpenPDF)En gratisJava-PDF bibliotek.
     
## GSHS{#gshhs} 
Strandlinjen och sjödata är från[GSHS](https://www.ngdc.noaa.gov/mgg/shorelines/gshhs.html)En global självkonsekvent, hierarkisk, högupplöst shoreline-databas (Licens:[GPL](https://www.soest.hawaii.edu/pwessel/gshhs/README.TXT)) skapad av Paul Wessel och Walter Smith.

Vi gör ingen klaim om hjärtat av Sharelinera-dataen som kommer medERDDAP™Använd inte det för NAVIGATIONAL PURPOSES.
     
    
## GMT pscoast{#gmt-pscoast} 
Den politiska gränsen och floddata är från[Pscoast](https://www.soest.hawaii.edu/gmt/gmt/html/man/pscoast.html)Program i[GMT](https://www.soest.hawaii.edu/gmt/)som använder data från[CIA Världsdatabank II](https://www.evl.uic.edu/pape/data/WDB/)  (Licens: offentlig domän) .

Vi gör inga klaimer om hjärtat av den politiska skriften data medERDDAP.
    
## ETOPO{#etopo} 
Badymetri / topografi data som används i bakgrunden av vissa kartor är den[ETOPO1 Global 1-minuters Gridded Elevation Data Set](https://www.ngdc.noaa.gov/mgg/global/global.html)  (Ice Surface, grid registrerad, binär, 2 byte int: etopo1\\_ice\\_g\\_i2.zip)   (Licens:[Offentlig domän](https://www.ngdc.noaa.gov/ngdcinfo/privacy.html#copyright)) som distribueras gratis genom[NOAANGDC](https://www.ngdc.noaa.gov).

Vi gör ingen klaim om korrektonen av Bathymetrien/TopOGRAPHY DATA KOMMER MEDERDDAP. Använd inte det för NAVIGATIONAL PURPOSES.
    
## JavaMail{#javamail} 
E-post skickas med kod i mail. Jar frånOracle"S[JavaMail API](https://javaee.github.io/javamail/)  (Licens:[KOMMON DEVELOPMENT OCH DISTRIBUTION LICENSE (CDDL) Version 1.1](https://javaee.github.io/javamail/LICENSE)) .
     
## JSON{#json} 
ERDDAP™Användning[Json.orgsJava-baserat JSON-bibliotek](https://www.json.org/index.html)till parse[JSON](https://www.json.org/)Datadata data (Licens:[Upphovsrättsskyddad open source](https://www.json.org/license.html)) .
     

## PostgrSQL{#postgrsql} 
ERDDAP™inbegripet[PostGres JDBC](https://mvnrepository.com/artifact/org.postgresql/postgresql)Förare (Licens:[BSD](https://www.postgresql.org/about/licence/)) . Föraren är upphovsrätt (c c) 1997-2010, PostgreSQL Global Development Group. Alla rättigheter förbehållna.
     
## Lucene{#lucene} 
ERDDAP™Använd kod från Apache[Lucene](https://lucene.apache.org/). (Licens:[Apache](https://www.apache.org/licenses/LICENSE-2.0)) För alternativet "lucene" sökmotor (Men inte för standard "ursprunglig" sökmotor) .
     
## commons-compress{#commons-compress} 
ERDDAP™Använd kod från Apache[commons-compress](https://commons.apache.org/compress/). (Licens:[Apache](https://www.apache.org/licenses/LICENSE-2.0)) .
     
## Jexl{#jexl} 
ERDDAP™stöd för utvärdering av uttryck och skript i&lt;sourceNames&gt; är beroende av[Apache projektets](https://www.apache.org/)Från:[JavaExpression språk (Jexl) ](https://commons.apache.org/proper/commons-jexl/)  (Licens:[Apache](https://www.apache.org/licenses/LICENSE-2.0)) .
     
## Cassandra{#cassandra} 
ERDDAP™inkluderar Apache[Cassandras](https://cassandra.apache.org/) [cassandra-driver-core.jar](https://mvnrepository.com/artifact/com.datastax.cassandra/cassandra-driver-core)  (Licens:[Apache 2.0](https://github.com/datastax/java-driver/blob/2.1/LICENSE)) .
Cassandras cassandra-driver-core.jar kräver (och såERDDAP™inkluderar) Från:
*   [Guava.jar](https://github.com/google/guava)  (Licens:[Apache 2.0](https://github.com/google/guava/blob/master/LICENSE)) .
*   [Lz4.jar](https://repo1.maven.org/maven2/net/jpountz/lz4/lz4/)  (Licens:[Apache 2.0](https://github.com/jpountz/lz4-java/blob/master/LICENSE.txt)) .
*   [Metrics-core.jar](https://mvnrepository.com/artifact/com.codahale.metrics/metrics-core/3.0.2)  (Licens:[MIT MIT](https://github.com/codahale/metrics/blob/master/LICENSE)) .
*   [netty-all.jar](https://netty.io/downloads.html)  (Licens:[Apache 2.0](https://netty.io/downloads.html)) .
*   [Snappy-java.jar](https://xerial.org/snappy-java/)  (Licens:[Apache 2.0](https://github.com/xerial/snappy-java/blob/develop/LICENSE)) .
         
## KT\\_paletter{#kt_-palettes} 
Färgpaletter som har prefixet "KT\\_"är en[samling av .cpt paletter av Kristen Thyng](http://soliton.vm.bytemark.co.uk/pub/cpt-city/cmocean/index.html)  (Licens:[MIT/X](http://soliton.vm.bytemark.co.uk/pub/cpt-city/cmocean/copying.html)) , men lite omformaterad av Jennifer Sevadjian avNOAAså att de överensstämmer medERDDAP.cpt krav.
     
## Leaflet {#leaflet} 
ERDDAP™AnvänderJavaScript-biblioteket[Leaflet](https://leafletjs.com/)  (Licens:[BSD 2](https://github.com/Leaflet/Leaflet/blob/main/LICENSE)) SomWMSklient påWMSwebbsidor iERDDAP. Det är utmärkt mjukvara (väl utformad, lätt att använda, snabb och fri) från Vladimir Agafonkin.
     
## AWS{#aws} 
För att arbeta med Amazon AWS (inklusive S3) ,ERDDAP™använder v2 av[AWS SDK förJava](https://aws.amazon.com/sdk-for-java/)  (Licens:[Apache](https://www.apache.org/licenses/)) .

AWS kräver Maven att dra i beroenden. De inkluderar följande .jar filer (där xxx är versionsnumret, som ändras över tiden, och licenstypen är i parentes) Annotations-xx.jar (Apache) apache-client-xx.jar (Apache) Ams-xx.jar (BSD) asm-xx.jar (BSD) asm-analys-xx.jar (BSD) asm-commons-xx.jar (BSD) asm-tree-xx.jar (BSD) asm-util-xx.jar (BSD) auth-xx.jar (??) aws-core-xx.jar (Apache) aws-query-protocol-xx.jar (Apache) aws-xml-protocol-xx.jar (Apache) checker-qual-xx.jar (MIT MIT) fel\\_prone\\_annotations-xx.jar (Apache) Eventstream-xx.jar (Apache) Misslyckande-xx.jar (Apache) ,httpcore-xx.jar (Apache) j2objc-annotations-xx.jar (Apache) Jackson-annotations-xx.jar (Apache) Jackson-core-xx.jar (Apache) Jackson-databind-xx.jar (Apache) Jaxen-xx.jar (BSD) jffi-xx.jar (Apache) jffi-xx.native. Jar (Apache) jnr-constants-xx.jar (Apache) jnr-ffi-xx.jar (Apache) jnr-posix-xx.jar (Apache) jnr-x86asm-xx.jar (Apache) json-xx.jar (Upphovsrätt öppen källkod) jsr305-xx.jar (Apache) Lyssningsbarfuture-xx.jar (Apache) Om ett dussin nät. Jar's (Apache) Profiler-xx.jar (Apache) protokoll-core-xx.jar (Apache) reaktiv-streams-xx.jar (CCO 1.0) regioner-xx.jar (Apache) s3-xx.jar (Apache) , sdk-core-xx.jar (Apache) Utils-xx.jar (??) . För att se de faktiska licenserna, sök efter .jar-namnet i[Maven Repository](https://mvnrepository.com/)och sedan rykta runt i projektets filer för att hitta licensen.
    

Vi är också mycket tacksamma för all programvara och webbplatser som vi använder när vi utvecklarERDDAP, inklusive
[Chrome Chrome Chrome](https://www.google.com/chrome/browser/desktop/),
[curl](https://curl.haxx.se/),
[DuckDuckGo](https://duckduckgo.com/?q=),
[EditPlus](https://www.editplus.com/),
[FileZilla](https://filezilla-project.org/).
[GitHub](https://github.com/),
[Google Search](https://www.google.com/webhp),
[Putty](https://www.chiark.greenend.org.uk/~sgtatham/putty/download.html),
[Stack overflow](https://stackoverflow.com/),
[Todoist](https://todoist.com/?lang=en),
[Wikipedia](https://www.wikipedia.org/),
Internet, World Wide Web och alla andra, bra, hjälpsamma webbplatser.
Tack så mycket.
