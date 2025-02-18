# elismerések

A közreműködő[hitelek](https://github.com/erddap/erddap/blob/main/CREDITS.md)MertERDDAP™most egy külön oldalon van.ERDDAP™egy termék a[NOAA](https://www.noaa.gov "National Oceanic and Atmospheric Administration") [NMFS](https://www.fisheries.noaa.gov "National Marine Fisheries Service") [SWFSC](https://swfsc.noaa.gov "Southwest Fisheries Science Center") [ERD](https://www.fisheries.noaa.gov/about/environmental-research-division-southwest-fisheries-science-center "Environmental Research Division")...

Bob Simons az eredeti fő szerzőjeERDDAP™  (a tervező és szoftverfejlesztő, aki írta aERDDAP-specifikus kód) ... A kiindulópont Roy Mendelssohn (Bob főnöke) Javaslat, hogy Bob fordítsa ConvertTable programját (egy kis hasznosság, amely a mesés adatokat egy formátumból a másikba konvertálja, és amely nagyrészt Bob előtti kódja voltNOAAolyan munka, amelyet Bob újra engedélyezett nyílt forráskódúnak) webszolgáltatásba.

Ez volt és Roy Mendelssohn elképzelései az elosztott adatrendszerekről, a Bob-ra vonatkozó kezdeti javaslatáról, valamint folyamatos támogatásáról (beleértve a hardvert, a hálózatot és más szoftvertámogatást, és felszabadítja Bob idejét, hogy több időt tölthessenERDDAP™kód) ez lehetővé tette ezt a projektet, és lehetővé tette növekedését.

AERDDAP-specifikus kódot szerzői jogi nyílt forráskódként engedélyeznek,[NOAA](https://www.noaa.gov)a szerzői jog fenntartása. Lásd:[ERDDAP™licenc](/license)...
ERDDAP™szerzői jogi nyílt forráskódú, Apache, LGPL, MIT/X, Mozilla és nyilvános domain könyvtárak és adatok felhasználásával.
ERDDAP™nem igényel semmilyen GPL kódot vagy kereskedelmi programot.

A munka finanszírozásának tömegeERDDAP™jöttNOAAEbben Bob Simons fizetését fizette. Az első évreERDDAP™Amikor kormányzati vállalkozó volt, a finanszírozás jött[NOAACoastWatch](https://coastwatch.noaa.gov/)program,[NOAAIOOS](https://ioos.noaa.gov/)program, és a most defekt Pacific Ocean Shelf Tracking (POST) program.

Sok hitel megy a sokERDDAP™adminisztrátorok és felhasználók, akik olyan javaslatokat és megjegyzéseket tettek, amelyek számos fejlesztéshez vezettekERDDAP... Sokan említik a nevet a[Változások listája](/changes)... Köszönöm mind (névtelen és névtelen) nagyon. Így,ERDDAP™nagyszerű példa erre[Felhasználó-vezérelt innováció](https://en.wikipedia.org/wiki/User_innovation), ahol a termékinnováció gyakran a fogyasztóktól származik (ERDDAP™felhasználók) nem csak a termelők (ERDDAP™fejlesztők) ...

Itt van a szoftverek és adatkészletek listája, amelyek aERDDAP™elosztás. Nagyon hálásak vagyunk mindezért. Köszönöm nagyon.
\\[Kezdve 2021-ben, szinte lehetetlenné vált, hogy megfelelően felsorolja az összes kód forrásátERDDAP™mert néhány könyvtárat használunk (nevezetesen netcdf-java és különösen AWS) fordítson sok más könyvtárat. Minden könyvtár, amitERDDAP™A kódhívások közvetlenül szerepelnek az alábbiakban, mivel sok könyvtár, amit a másik könyvtárak hívnak. Ha látja, hogy kihagytunk egy projektet az alábbiakban, kérjük, tudassa velünk, hogy hozzáadhatjuk az alábbi projektet, és hitelt adhatunk, ahol a hitel esik.\\]

## Áttekintés{#overview} 
ERDDAP™egy[JavaServlet](https://www.oracle.com/technetwork/java/javaee/servlet/index.html)program. AERD, ez belül fut egy[Tomcat](https://tomcat.apache.org/)alkalmazáskiszolgáló (licenc:[Apache](https://www.apache.org/licenses/)) Egy[Apache](https://httpd.apache.org/)webszerver (licenc:[Apache](https://www.apache.org/licenses/)) , egy számítógépen futtatva a[Red Hat Linux](https://www.redhat.com/)operációs rendszer (licenc:[GPL](https://www.gnu.org/licenses/gpl-3.0.html)) ...
     
## Adatkészletek{#datasets} 
Az adatkészletek különböző forrásokból származnak. Lásd a metaadatát (különösen a ""sourceUrl",",infoUrl-,"institution", és "licensz") minden adatkészlethez. Számos adatkészlet korlátozza a használatát, amely megköveteli, hogy az adatszolgáltatót kalkulálja / hitelezze, ha használja az adatokat. Mindig jó formája az adatszolgáltató forgalomba hozatalának / hitelezésének. Lásd[Hogyan idézzünk egy adatkészletet egy papírban](https://coastwatch.pfeg.noaa.gov/erddap/information.html#citeDataset)...
     
## CoHort szoftver{#cohort-software} 
[A Com/cohort osztályok](#cohort-software)A CoHort Software ( https://www.cohortsoftware.com ) amely ezeket az osztályokat elérhetővé teszi egy MIT/X-szerű licenccel (Osztályok/com/cohort/util/LICENSE.txt) ...
     
## CoastWatch böngésző{#coastwatch-browser} 
ERDDAP™kódot használ a CoastWatch Browser projektből (most dekódoltak) a[NOAACoastWatch](https://coastwatch.noaa.gov) [West Coast Regional Node](https://coastwatch.pfeg.noaa.gov/)  (licenc: szerzői jogi nyílt forráskód) ... Ezt a projektet Dave Foley kezdeményezte és kezelte, egy korábbi koordinátorNOAACoastWatch West Coast Regional Node. Az összes CoastWatch Browser kódot Bob Simons írta.
     
## OPeNDAP {#opendap} 
Adatok[OPeNDAP](https://www.opendap.org)szervereket olvasnak[Java DAP1.1.7](https://www.opendap.org/deprecated-software/java-dap)  (licenc: LGPL) ...
     
## NetCDFJava{#netcdf-java} 
NetCDFfájlok (.nc) GMT stílusNetCDFfájlok (.grd) , GRIB és BUFR olvasható és írt kóddal a[NetCDF JavaKönyvtár](https://www.unidata.ucar.edu/software/netcdf-java/)  (licenc:[BSD-3](https://github.com/Unidata/netcdf-java/blob/develop/LICENSE)) A[Unidata](https://www.unidata.ucar.edu/)...

Szoftver bezárvaNetCDF Java.jar:

* Slf4j
ANetCDF JavaKönyvtár és Cassandra szükség[Slf4j a Simple Logging Facade-tólJava](https://www.slf4j.org/)projekt. Jelenleg,ERDDAP™használja a slf4j-simple-xxx.jar nevet, mint slf4j.jar, hogy megfeleljen ennek a szükségletnek. (licenc:[MIT/X](https://www.slf4j.org/license.html)) ...
     
* JDOM
ANetCDF Java.jar tartalmazza az XML feldolgozási kódját[JDOM](http://www.jdom.org/)  (licenc:[Apache](http://www.jdom.org/docs/faq.html#a0030)) , amely szerepel a netcdfAll.jar.
     
* Joda
ANetCDF Java.jar tartalmazza[Joda](https://www.joda.org/joda-time/)naptári számításokra (amelyet valószínűleg nem használnakERDDAP) ... (licenc:[Apache 2.0](https://www.joda.org/joda-time/licenses.html)) ...
     
* Apache
ANetCDF Java.jar több .jar fájlt tartalmaz[Apache projektek](https://www.apache.org/):
    [közös kódex](https://commons.apache.org/proper/commons-codec/),
    [közös felfedezés](https://commons.apache.org/discovery/),
    [közösek -httpügyfél](https://hc.apache.org/httpcomponents-client-ga/),
    [közös blogolás](https://commons.apache.org/proper/commons-logging/)  
    [HttpComponensek](https://hc.apache.org),
     (Összességében: licenc:[Apache](https://www.apache.org/licenses/LICENSE-2.0))   
Ezek szerepelnek a netcdfAll.jar.
     
* Egyéb
ANetCDF Java.jar tartalmazza a kódot: com.google.code.findbugs, com.google.errorprone, com.google.guava, com.google.j2objc, com.google.protobuf, edu.ucar, org.codehaus.mojo, com.beust.jcommander, com.google.common, com.google.2j és com.google.thirdparty. (A Google az Apache és a BSD-szerű licenceket használja.)   
         
## SGT{#sgt} 
A grafikonok és térképek a repülésen egy módosított változattal készülnekNOAASGT (volt https://www.pmel.noaa.gov/epic/java/sgt/ Most megszűnt) verzió 3 (egyJava- alapú tudományos grafikai eszközkészlet, amelyet Donald Denbo írt[NOAAPMEL](https://www.pmel.noaa.gov/))   (licenc: szerzői jogi nyílt forráskód (volt https://www.pmel.noaa.gov/epic/java/license.html ) ) ...
     
## Walter Zorn{#walter-zorn} 
Nagy, HTML tooltipsERDDAPHTML oldalak jönnek létre Walter Zorn wz\\_tooltip. js (licenc: LGPL) ...
A Slide Sorter csúszók és csepp funkciója a Walter Zorn wz\\_dragdrop.js (licenc: LGPL) ...
     
## OpenPDF{#openpdf} 
A .pdf fájlokat hozták létre[Openpdf](https://github.com/LibrePDF/OpenPDF)szabadJava-PDF könyvtár.
     
## GSHHS{#gshhs} 
A shoreline és a tó adatai a[GSHHS](https://www.ngdc.noaa.gov/mgg/shorelines/gshhs.html)- Globális önellátó, hierarchikus, nagy felbontású rövidítésű adatbázis (licenc:[GPL](https://www.soest.hawaii.edu/pwessel/gshhs/README.TXT)) Paul Wessel és Walter Smith létrehozta.

NEM KAPCSOLÓDÓ AZ ÁLLAMOK KORREKTNESSÉGE AZ ÁLLAMOK KAPCSOLÓDÓLERDDAP™- NE SZERETETT NE NAVIGATIONAL PURPOSES.
     
    
## GMT pscoast{#gmt-pscoast} 
A politikai határ és a folyó adatok a[pscoast](https://www.soest.hawaii.edu/gmt/gmt/html/man/pscoast.html)program[GMT](https://www.soest.hawaii.edu/gmt/), amely adatokat használ az adatokból[CIA World Data Bank II](https://www.evl.uic.edu/pape/data/WDB/)  (licenc: nyilvános domain) ...

NEM KAPCSOLÓDÓ A POLITIKAI BOUNDARY DATA SZÜKSÉGEERDDAP...
    
## ETOPO{#etopo} 
Az egyes térképek hátterében használt fürdőkád/topográfiai adatok a[ETOPO1 Global 1-Minute Gridded Elevation Adatkészlet](https://www.ngdc.noaa.gov/mgg/global/global.html)  (Ice Surface, grid regisztrált, bináris, 2 byte int: etopo1\\_ice\\_g\\_i2.zip)   (licenc:[nyilvános domain](https://www.ngdc.noaa.gov/ngdcinfo/privacy.html#copyright)) , amelyet szabadon terjesztenek[NOAANGDC](https://www.ngdc.noaa.gov)...

NEM KAPCSOLÓDÓ KÖZÖS ELŐTTT A BATHYMETRY/TOPOGRAPHY DATA KÖZÖSSÉGEERDDAP... NE SZERETETET NAVIGATIONAL PURPOSES.
    
## JavaMail{#javamail} 
E-maileket küldenek kód használatával e-mailben. jar aOracleA[JavaMail API](https://javaee.github.io/javamail/)  (licenc:[COMMON DEVELOPMENT ÉS DISTRIBUTION LICENSE (CDDL) Verzió 1.1](https://javaee.github.io/javamail/LICENSE)) ...
     
## JSON{#json} 
ERDDAP™Használat[json.orgJava- alapú JSON könyvtár](https://www.json.org/index.html)parázs[JSON](https://www.json.org/)adatok (licenc:[szerzői joggal nyílt forráskód](https://www.json.org/license.html)) ...
     

## PostgrSQL{#postgrsql} 
ERDDAP™tartalmazza a[PostGres JDBC](https://mvnrepository.com/artifact/org.postgresql/postgresql)sofőr (licenc:[BSD](https://www.postgresql.org/about/licence/)) ... A sofőr a szerzői jog (c)) 1997-2010, PostgreSQL Global Development Group. Minden jog fenntartva.
     
## Lucene{#lucene} 
ERDDAP™Használati kód Apache[Lucene](https://lucene.apache.org/)... (licenc:[Apache](https://www.apache.org/licenses/LICENSE-2.0)) a "lucene" keresőmotor opció (de nem az alapértelmezett "eredeti" keresőmotor számára) ...
     
## Compress közös{#commons-compress} 
ERDDAP™Használati kód Apache[Compress közös](https://commons.apache.org/compress/)... (licenc:[Apache](https://www.apache.org/licenses/LICENSE-2.0)) ...
     
## JEXL{#jexl} 
ERDDAP™a kifejezések és szövegek értékelésének támogatása&lt;sourceNames&gt; támaszkodik a[Apache projektje](https://www.apache.org/):[JavaKifejezési nyelv (JEXL) ](https://commons.apache.org/proper/commons-jexl/)  (licenc:[Apache](https://www.apache.org/licenses/LICENSE-2.0)) ...
     
## Cassandra{#cassandra} 
ERDDAP™tartalmazza Apache[Cassandra](https://cassandra.apache.org/) [cassandra-driver-core.jar](https://mvnrepository.com/artifact/com.datastax.cassandra/cassandra-driver-core)  (licenc:[Apache 2.0](https://github.com/datastax/java-driver/blob/2.1/LICENSE)) ...
Cassandra cassandra-driver-core.jar megköveteli (és ígyERDDAP™tartalmazza) :
*   [guava.jar](https://github.com/google/guava)  (licenc:[Apache 2.0](https://github.com/google/guava/blob/master/LICENSE)) ...
*   [lz4.jar](https://repo1.maven.org/maven2/net/jpountz/lz4/lz4/)  (licenc:[Apache 2.0](https://github.com/jpountz/lz4-java/blob/master/LICENSE.txt)) ...
*   [Metrics-core.jar](https://mvnrepository.com/artifact/com.codahale.metrics/metrics-core/3.0.2)  (licenc:[MIT](https://github.com/codahale/metrics/blob/master/LICENSE)) ...
*   [Netty-all.jar](https://netty.io/downloads.html)  (licenc:[Apache 2.0](https://netty.io/downloads.html)) ...
*   [Snappy-java.jar](https://xerial.org/snappy-java/)  (licenc:[Apache 2.0](https://github.com/xerial/snappy-java/blob/develop/LICENSE)) ...
         
## KT\\_paletta{#kt_-palettes} 
A színpaletták, amelyek az előtagot "KT\\_"Egy[.cpt paletták gyűjteménye Kristen Thyng](http://soliton.vm.bytemark.co.uk/pub/cpt-city/cmocean/index.html)  (licenc:[MIT/X](http://soliton.vm.bytemark.co.uk/pub/cpt-city/cmocean/copying.html)) , de kissé megreformálta Jennifer SevadjianNOAAhogy megfeleljenekERDDAP.cpt követelmények.
     
## Leaflet {#leaflet} 
ERDDAP™Használja aJavaScript könyvtár[Leaflet](https://leafletjs.com/)  (licenc:[BSD 2](https://github.com/Leaflet/Leaflet/blob/main/LICENSE)) mintWMSügyfélWMSweboldalak aERDDAP... Ez kiváló szoftver (jól megtervezett, könnyen használható, gyors és ingyenes) Vlagyimir Agafonkin.
     
## AWS{#aws} 
Az Amazon AWS-rel való együttműködéshez (többek között az S3) ,ERDDAP™v2 használatát[AWS SDKJava](https://aws.amazon.com/sdk-for-java/)  (licenc:[Apache](https://www.apache.org/licenses/)) ...

Az AWS megköveteli, hogy Maven a függőségekbe húzzon. Ezek közé tartoznak a következő .jar fájlok (ahol a xxx a verziószám, amely idővel változik, és az engedély típusa parentheses) : annotations-xxx.jar (Apache) Apache-client-xxx.jar (Apache) Ams-xxx.jar (BSD) asm-xxx.jar (BSD) asm-analysis-xxx.jar (BSD) asm-commons-xxx.jar (BSD) asm-tree-xxx.jar (BSD) asm-util-xxx.jar (BSD) Auth-xxx.jar (?) Aws-core-xxx.jar (Apache) Aws-query-protocol-xxx.jar (Apache) Aws-xml-protokoll-xxx.jar (Apache) Ellenőrző-qual-xxx.jar (MIT) , hiba\\_prone\\_annotations-xxx.jar (Apache) eseménystream-xxx.jar (Apache) , kudarcaccess-xxx.jar (Apache) ,httpcore-xxx.jar (Apache) j2objc-annotations-xxx.jar (Apache) jackson-annotations-xxx.jar (Apache) jackson-core-xxx.jar (Apache) jackson-databind-xxx.jar (Apache) jaxen-xxx.jar (BSD) jffi-xxx.jar (Apache) jffi-xxx.natív. jar (Apache) , jnr-constants-xxx.jar (Apache) , jnr-ffi-xxx.jar (Apache) , jnr-posix-xxx.jar (Apache) jnr-x86asm-xxx.jar (Apache) json-xxx.jar (Szerzői nyílt forráskód) jsr305-xxx.jar (Apache) , figyelemre méltófuture-xxx.jar (Apache) Körülbelül egy tucat netty. jar (Apache) Profiles-xxx.jar (Apache) protokoll-core-xxx.jar (Apache) Reactive-streams-xxx.jar (CCO 1.0) régiók-xxx.jar (Apache) S3-xxx.jar (Apache) Sdk-core-xxx.jar (Apache) Utils-xxx.jar (?) ... A tényleges licencek megtekintéséhez keresse meg a .jar nevét[Maven Repository](https://mvnrepository.com/)Ezután pletyka a projekt fájljaiban, hogy megtalálja a licencet.
    

Nagyon hálásak vagyunk minden olyan szoftver és weboldal számára, amelyet a fejlesztés során használunk.ERDDAPbeleértve
[Chrome](https://www.google.com/chrome/browser/desktop/),
[curl](https://curl.haxx.se/),
[dalszöveg: DuckDuckGo](https://duckduckgo.com/?q=),
[EditPlus](https://www.editplus.com/),
[FileZilla](https://filezilla-project.org/)...
[GitHub](https://github.com/),
[Google keresés](https://www.google.com/webhp),
[Téged](https://www.chiark.greenend.org.uk/~sgtatham/putty/download.html),
[Stack túláramlás](https://stackoverflow.com/),
[dohányos](https://todoist.com/?lang=en),
[Wikipedia](https://www.wikipedia.org/),
az internet, a World Wide Web és az összes többi, nagyszerű, hasznos weboldal.
Köszönöm nagyon.
