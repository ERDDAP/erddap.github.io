# Anerkendelser

Den bidragyder [kreditter](https://github.com/erddap/erddap/blob/main/CREDITS.md) for for for ERDDAP™ er nu på en separat side. ERDDAP™ er et produkt af produktet [ NOAA ](https://www.noaa.gov "National Oceanic and Atmospheric Administration")   [ NMFS ](https://www.fisheries.noaa.gov "National Marine Fisheries Service")   [ SWFSC ](https://swfsc.noaa.gov "Southwest Fisheries Science Center")   [ ERD ](https://www.fisheries.noaa.gov/about/environmental-research-division-southwest-fisheries-science-center "Environmental Research Division") .

Bob Simons er den originale hovedforfatter af ERDDAP™   (designer og softwareudvikler, der skrev den ERDDAP -specifik kode) . Udgangspunktet var Roy Mendelssohn's (Bob's chef) foreslog, at Bob forvandler sin ConvertTable program (et lille værktøj, der konverterer tabulære data fra et format til et andet, og som var stort kode fra Bobs pre--- NOAA arbejde, som Bob har licens til at være åben kilde) ind i en webtjeneste.

Det var og er Roy Mendelssohns ideer om distribuerede datasystemer, hans første forslag til Bob, og hans løbende støtte (herunder hardware, netværk og anden software support, og ved at frigøre Bob's tid, så han kunne bruge mere tid på det ERDDAP™ kodekode) der har gjort dette projekt muligt og gjort det muligt for sin vækst.

The The The The The The The ERDDAP -specifik kode er licenseret som ophavsretlig open source, med [ NOAA ](https://www.noaa.gov) besiddelse af ophavsretten. Se billederne [ ERDDAP™ licenslicens](/license) .
 ERDDAP™ Brug af ophavsretlig open source, Apache, LGPL, MIT/X, Mozilla og offentlige domænebiblioteker og data.
 ERDDAP™ kræver ikke nogen GPL-kode eller kommercielle programmer.

Mængden af finansieringen til arbejde på ERDDAP™ er kommet fra NOAA , hvor det betalte Bob Simons løn. For det første år af ERDDAP™ , da han var en statslig entreprenør, kom finansieringen fra [ NOAA Billeder af CoastWatch](https://coastwatch.noaa.gov/) programmet, programmet [ NOAA IOOS](https://ioos.noaa.gov/) program, og nu defunct Pacific Ocean Shelf Tracking (Tilmeld dig) program.

Meget kredit går til de mange ERDDAP™ Administratorer og brugere, der har fremsat forslag og kommentarer, som har ført til mange forbedringer i ERDDAP . Mange nævnes ved navn i [Liste over ændringer](/changes) . Tak for alle (navngivet og unavnlig) meget. Således, ERDDAP™ er et fantastisk eksempel på [Bruger-Driven Innovation](https://en.wikipedia.org/wiki/User_innovation) , hvor produktinnovation ofte kommer fra forbrugerne ( ERDDAP™ brugere) , ikke bare producenterne ( ERDDAP™ udviklere udviklere) .

Her er listen over software og datasæt, der er i listen ERDDAP™ distribution. Vi er meget taknemmelige for alle disse. Mange tak.
 \\[ Startende i 2021, er det næsten umuligt at liste alle kilder til kode for ERDDAP™ fordi et par af de biblioteker, vi bruger (Især netcdf-java og især AWS) Brug for mange, mange andre biblioteker. Alle de biblioteker, der ERDDAP™ kodeopkald er direkte inkluderet nedenfor, som er mange af de biblioteker, som de andre biblioteker ringer til. Hvis du ser, at vi har udeladt et projekt nedenfor, så lad os vide, så vi kan tilføje projektet nedenfor og give kredit, hvor kreditten skyldes. \\] 

## Oversigt{#overview} 
 ERDDAP™ er en [ Java Servlet](https://www.oracle.com/technetwork/java/javaee/servlet/index.html) program. At tage på ERD , det kører inde i en [Tomcat](https://tomcat.apache.org/) applikationsserver (licens: [Apache Apache](https://www.apache.org/licenses/) ) , med en [Apache Apache](https://httpd.apache.org/) webserver (licens: [Apache Apache](https://www.apache.org/licenses/) ) , kører på en computer ved hjælp af computeren [Red Hat Linux](https://www.redhat.com/) operativsystem (licens: [GPL](https://www.gnu.org/licenses/gpl-3.0.html) ) .
     
## Datasæt{#datasets} 
Datasættet er fra forskellige kilder. Se metadata (især " sourceUrl ", " infoUrl "," "institution" , og "licens") for hver datasæt. Mange datasæt har en begrænsning på deres brug, der kræver, at du cite/krediterer dataudbyderen, når du bruger dataene. Det er altid god form for cite/kredit dataudbyderen. Se endnu [Sådan Citer du et datasæt i en papir](https://coastwatch.pfeg.noaa.gov/erddap/information.html#citeDataset) .
     
## CoHort Software{#cohort-software} 
 [com/cohort klasser](#cohort-software) er fra CoHort Software (https://www.cohortsoftware.com) som gør disse klasser tilgængelige med en MIT/X-lignende licens (Se klasser/com/cohort/util/LICENSE.txt) .
     
## Billeder af CoastWatch{#coastwatch-browser} 
 ERDDAP™ bruger kode fra CoastWatch Browser projekt (Nu dekoder) fra fra [ NOAA Billeder af CoastWatch](https://coastwatch.noaa.gov)   [Hoteller i nærheden af West Coast Regional Node](https://coastwatch.pfeg.noaa.gov/)   (licens: ophavsretlig open source) . Dette projekt blev igangsat og administreret af Dave Foley, en tidligere koordinator for NOAA I nærheden af CoastWatch West Coast Regional Node. Alle CoastWatch Browser kode blev skrevet af Bob Simons.
     
##  OPeNDAP  {#opendap} 
Data fra [ OPeNDAP ](https://www.opendap.org) servere læses med [ Java   DAP 1.1.7](https://www.opendap.org/deprecated-software/java-dap)   (licens: LGPL) .
     
##  NetCDF -java{#netcdf-java} 
 NetCDF filer filer filer ( .nc ) , GMT-stil NetCDF filer filer filer (.) , GRIB og BUFR læses og skrives med kode i koden [ NetCDF   Java Bibliotek](https://www.unidata.ucar.edu/software/netcdf-java/)   (licens: [BSD-3](https://github.com/Unidata/netcdf-java/blob/develop/LICENSE) ) fra fra fra [ Unidata ](https://www.unidata.ucar.edu/) .

Software inkluderet i softwaren NetCDF   Java .jar:

* Vejrf4j
The The The The The The The NetCDF   Java Bibliotek og Cassandra har brug for [slf4j fra Simple Logging Facade til Java ](https://www.slf4j.org/) projekt. I øjeblikket, ERDDAP™ bruger slf4j-simple-xxx.jar omdøbt som slf4j.jar til at opfylde dette behov. (licens: [MIT/X](https://www.slf4j.org/license.html) ) .
     
* JDOM
The The The The The The The NetCDF   Java .jar indeholder XML behandling kode fra [JDOM](http://www.jdom.org/)   (licens: [Apache Apache](http://www.jdom.org/docs/faq.html#a0030) ) , som er inkluderet i netcdfAll.jar.
     
* Joda
The The The The The The The NetCDF   Java .jar omfatter [Joda](https://www.joda.org/joda-time/) for kalenderberegninger (som sandsynligvis ikke anvendes af ERDDAP ) . (licens: [Apache 2.0](https://www.joda.org/joda-time/licenses.html) ) .
     
* Apache Apache
The The The The The The The NetCDF   Java .jar indeholder .jar filer fra flere [Apache projekter](https://www.apache.org/) :
     [Ofte stillede spørgsmål](https://commons.apache.org/proper/commons-codec/) ,
     [Ofte stillede spørgsmål](https://commons.apache.org/discovery/) ,
     [Almindelige http klient](https://hc.apache.org/httpcomponents-client-ga/) ,
     [Ofte stillede spørgsmål](https://commons.apache.org/proper/commons-logging/)   
     [HttpComponents](https://hc.apache.org) ,
     (Til alle: licens: [Apache Apache](https://www.apache.org/licenses/LICENSE-2.0) )   
Disse er inkluderet i netcdfAll.jar.
     
* Andre andre
The The The The The The The NetCDF   Java .jar indeholder også kode fra: com.google.code.findbugs, com.google.errorprone, com.google.guava, com.google.j2objc, com.google.protobuf, edu.ucar ellergcodehaus.mojo, com.beust.jcommander, com.google.common, com.rej2 og google.com.com. (Google bruger Apache og BSD-lignende licenser.)   
         
## SGT{#sgt} 
Graferne og kortene er skabt på farten med en ændret version af NOAA 's SGT (var påhttps://www.pmel.noaa.gov/epic/java/sgt/, nu ophørt) version 3 (a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a a Java -baseret videnskabelig grafik Toolkit skrevet af Donald Denbo på [ NOAA PMEL](https://www.pmel.noaa.gov/) )   (licens: ophavsretlig open source (var påhttps://www.pmel.noaa.gov/epic/java/license.html) ) .
     
## Walter Zorn{#walter-zorn} 
Big, HTML værktøjtips på ERDDAP 's HTML sider er skabt med Walter Zorn's wz\\_tooltip. js (licens: LGPL) .
Skydere og træk og slip funktion af Slide Sorter er skabt med Walter Zorn's wz\\_dragdrop.js (licens: LGPL) .
     
## openPDF{#openpdf} 
.pdf-filer er oprettet med [Brugervejledning](https://github.com/LibrePDF/OpenPDF) , en gratis Java -PDF bibliotek.
     
## GSHHS{#gshhs} 
Kyst- og sødata er fra [GSHHS](https://www.ngdc.noaa.gov/mgg/shorelines/gshhs.html) -- En global selvkonsistent, Hierarchical, High-opløsning Shoreline Database (licens: [GPL](https://www.soest.hawaii.edu/pwessel/gshhs/README.TXT) ) og skabt af Paul Wessel og Walter Smith.

Vi gør NO CLAIM klar over CORRECTNESS i SHORELINE-dataene, som COMES har ERDDAP™ -- Brug IKKE IT til NAVIGATIONAL PURPOSES.
     
    
## GMT pscoast{#gmt-pscoast} 
De politiske grænse- og floddata er fra [Pscoast](https://www.soest.hawaii.edu/gmt/gmt/html/man/pscoast.html) program i [GMT GMT](https://www.soest.hawaii.edu/gmt/) , som bruger data fra [CIA Verdensdatabank II](https://www.evl.uic.edu/pape/data/WDB/)   (licens: offentligt domæne) .

Vi gør NO CLAIM OM CORRECTNESS for at sikre, at der er tale om en sådan behandling. ERDDAP .
    
## ETOPO{#etopo} 
De badymetry/topografi data, der bruges i baggrunden af nogle kort, er den [ETOPO1 Global 1-Minute Gridded Elevation Data Set](https://www.ngdc.noaa.gov/mgg/global/global.html)   (Overflade, gitter registreret, binær, 2 byte int: etopo1\\_ice\\_g\\_i2 .zip )   (licens: [Offentligt domæne](https://www.ngdc.noaa.gov/ngdcinfo/privacy.html#copyright) ) , som er distribueret gratis af [ NOAA NGDC](https://www.ngdc.noaa.gov) .

Vi gør NO CLAIM OM CORRECTNESS af BATHYMETRY/TOPOGRAPHY-data, som COMES ERDDAP . Brug IKKE IT til NAVIGATIONAL PURPOSES.
    
##  Java Mail{#javamail} 
Emails sendes via kode i mail. krukke fra Oracle 's [ Java Mail API](https://javaee.github.io/javamail/)   (licens: [Udvikling og udvikling (CDDL) Version 1.1](https://javaee.github.io/javamail/LICENSE) ) .
     
## JSON{#json} 
 ERDDAP™ Brug af anvendelser [I nærheden af json.org's Java -baseret JSON bibliotek](https://www.json.org/index.html) til parse [JSON](https://www.json.org/) Datadata (licens: [ophavsretligt beskyttet open source](https://www.json.org/license.html) ) .
     

## PostgrSQL{#postgrsql} 
 ERDDAP™ Inkluderet [PostGres JDBC](https://mvnrepository.com/artifact/org.postgresql/postgresql) driver driver (licens: [BSD](https://www.postgresql.org/about/licence/) ) . Chaufføren er ophavsret (c) 1997-2010, PostgreSQL Global Development Group. Alle rettigheder forbeholdes.
     
## Lucene{#lucene} 
 ERDDAP™ Brug koden fra Apache [Lucene](https://lucene.apache.org/) . (licens: [Apache Apache](https://www.apache.org/licenses/LICENSE-2.0) ) for "lucene" søgemaskine mulighed (men ikke for standarden "original" søgemaskine) .
     
## Ofte stillede spørgsmål{#commons-compress} 
 ERDDAP™ Brug koden fra Apache [Ofte stillede spørgsmål](https://commons.apache.org/compress/) . (licens: [Apache Apache](https://www.apache.org/licenses/LICENSE-2.0) ) .
     
## JEXL{#jexl} 
 ERDDAP™ støtte til evaluering af udtryk og scripts i&lt; sourceName s&gt;'s afhænger af [Apache projekt's](https://www.apache.org/) : [ Java Forretningssprog (JEXL) ](https://commons.apache.org/proper/commons-jexl/)   (licens: [Apache Apache](https://www.apache.org/licenses/LICENSE-2.0) ) .
     
## Cassandra{#cassandra} 
 ERDDAP™ Inkluderet Apache Apache [Cassandra's](https://cassandra.apache.org/)   [kassandra-driver-core.jar](https://mvnrepository.com/artifact/com.datastax.cassandra/cassandra-driver-core)   (licens: [Apache 2.0](https://github.com/datastax/java-driver/blob/2.1/LICENSE) ) .
Cassandra's cassandra-driver-core.jar kræver (og så ERDDAP™ Inkluderet) :
*    [guava.jar](https://github.com/google/guava)   (licens: [Apache 2.0](https://github.com/google/guava/blob/master/LICENSE) ) .
*    [lz4.jar](https://repo1.maven.org/maven2/net/jpountz/lz4/lz4/)   (licens: [Apache 2.0](https://github.com/jpountz/lz4-java/blob/master/LICENSE.txt) ) .
*    [metrics-core.jar](https://mvnrepository.com/artifact/com.codahale.metrics/metrics-core/3.0.2)   (licens: [MIT](https://github.com/codahale/metrics/blob/master/LICENSE) ) .
*    [Netty-all.jar](https://netty.io/downloads.html)   (licens: [Apache 2.0](https://netty.io/downloads.html) ) .
*    [snappy-java.jar](https://xerial.org/snappy-java/)   (licens: [Apache 2.0](https://github.com/xerial/snappy-java/blob/develop/LICENSE) ) .
         
##  KT\\_ paletter{#kt_-palettes} 
Farvepaleterne, som har præfikset " KT\\_ " er en [samling af .cpt paletter af Kristen Thyng](http://soliton.vm.bytemark.co.uk/pub/cpt-city/cmocean/index.html)   (licens: [MIT/X](http://soliton.vm.bytemark.co.uk/pub/cpt-city/cmocean/copying.html) ) , men lidt omformateret af Jennifer Sevadjian af NOAA så de overholder ERDDAP 's .cpt krav.
     
##  Leaflet  {#leaflet} 
 ERDDAP™ Brug af cookies Java Script bibliotek [ Leaflet ](https://leafletjs.com/)   (licens: [BSD 2](https://github.com/Leaflet/Leaflet/blob/main/LICENSE) ) som det WMS klient på WMS Websider på internettet ERDDAP . Det er fremragende software (veldesignet, let at bruge, hurtigt og gratis) fra Vladimir Agafonkin.
     
## AWS{#aws} 
Til arbejde med Amazon AWS (inkl. S3) , ERDDAP™ Brug af v2 af [AWS SDK for Java ](https://aws.amazon.com/sdk-for-java/)   (licens: [Apache Apache](https://www.apache.org/licenses/) ) .

AWS kræver Maven at trække i afhængighederne. De omfatter følgende .jar filer (hvor xxx er versionsnummeret, som ændrer sig over tid, og licenstypen er i parentes) : annotations-xxx.jar (Apache Apache) , apache-client-xxx.jar (Apache Apache) , ams-xxx.jar (BSD) , asm-xxx.jar (BSD) , asm-analysis-xxx.jar (BSD) , asm-commons-xxx.jar (BSD) , asm-tree-xxx.jar (BSD) , asm-util-xxx.jar (BSD) , auth-xxx.jar (?) , aws-core-xxx.jar (Apache Apache) , aws-query-protocol-xxx.jar (Apache Apache) , aws-xml-protocol-xxx.jar (Apache Apache) , checker-qual-xxx.jar (MIT) , fejl\\_prone\\_annotations-xxx.jar (Apache Apache) , eventstream-xxx.jar (Apache Apache) , fejlaccess-xxx.jar (Apache Apache) , http core-xxx.jar (Apache Apache) , j2objc-annotations-xxx.jar (Apache Apache) , jackson-annotations-xxx.jar (Apache Apache) , jackson-core-xxx.jar (Apache Apache) , jackson-databind-xxx.jar (Apache Apache) , jaxen-xxx.jar (BSD) , sfi-xxx.jar (Apache Apache) , sfi-xxx.native. krukke (Apache Apache) , jnr-constants-xxx.jar (Apache Apache) , jnr-ffi-xxx.jar (Apache Apache) , jnr-posix-xxx.jar (Apache Apache) , jnr-x86asm-xxx.jar (Apache Apache) , json-xxx.jar (Ophavsrett open source) , jsr305-xxx.jar (Apache Apache) , lytteablefuture-xxx.jar (Apache Apache) , om en snesevis net. krukkens (Apache Apache) , profiler-xxx.jar (Apache Apache) , protokol-core-xxx.jar (Apache Apache) , reaktiv-streams-xxx.jar (CCO 1.0) , regioner-xxx.jar (Apache Apache) , s3-xxx.jar (Apache Apache) , sdk-core-xxx.jar (Apache Apache) , utils-xxx.jar (?) . For at se de faktiske licenser, søg efter .jar navn i den [Maven Repository](https://mvnrepository.com/) og derefter romage rundt i projektets filer for at finde licensen.
    

Vi er også meget taknemmelige for alle de software og hjemmesider, vi bruger, når vi udvikler ERDDAP , herunder
 [Chrome Chrome](https://www.google.com/chrome/browser/desktop/) ,
 [ curl ](https://curl.haxx.se/) ,
 [I nærheden af DuckDuckGo](https://duckduckgo.com/?q=) ,
 [Redigering af EditPlus](https://www.editplus.com/) ,
 [FileZilla](https://filezilla-project.org/) .
 [GitHub](https://github.com/) ,
 [Google Søgning](https://www.google.com/webhp) ,
 [PuTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/download.html) ,
 [stackoverløb](https://stackoverflow.com/) ,
 [Todoist](https://todoist.com/?lang=en) ,
 [ Wikipedia ](https://www.wikipedia.org/) ,
Internet, World Wide Web, og alle de andre, store, nyttige hjemmesider.
Mange tak.
