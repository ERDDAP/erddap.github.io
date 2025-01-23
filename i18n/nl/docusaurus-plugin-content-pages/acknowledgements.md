# Erkenningen

De bijdrager[kredieten](https://github.com/erddap/erddap/blob/main/CREDITS.md)voorERDDAP™staat nu op een aparte pagina.ERDDAP™is een product van de[NOAA](https://www.noaa.gov "National Oceanic and Atmospheric Administration") [NMFS](https://www.fisheries.noaa.gov "National Marine Fisheries Service") [SWFSC](https://swfsc.noaa.gov "Southwest Fisheries Science Center") [ERD](https://www.fisheries.noaa.gov/about/environmental-research-division-southwest-fisheries-science-center "Environmental Research Division").

Bob Simons is de oorspronkelijke hoofdauteur vanERDDAP™  (de ontwerper en software-ontwikkelaar die deERDDAP-specifieke code) . Het uitgangspunt was Roy Mendelssohn's (Bobs baas.) suggestie dat Bob zijn ConvertTable programma draait (een klein hulpprogramma dat tabelgegevens van het ene formaat naar het andere omzet en dat grotendeels code was van Bob's pre-NOAAwerk dat Bob opnieuw heeft toegelaten om open source te zijn) in een webservice.

Het was en is Roy Mendelssohn's ideeën over gedistribueerde data systemen, zijn eerste suggestie aan Bob, en zijn voortdurende steun (inclusief hardware, netwerk, en andere software ondersteuning, en door het vrijmaken van Bob's tijd zodat hij meer tijd kon besteden aan deERDDAP™code) dat dit project mogelijk heeft gemaakt en zijn groei mogelijk heeft gemaakt.

DeERDDAP-specifieke code is gelicenseerd als auteursrechtelijke open source, met[NOAA](https://www.noaa.gov)het auteursrecht bezitten. Zie[ERDDAP™licentie](/license).
ERDDAP™maakt gebruik van auteursrechtelijk beschermde open source, Apache, LGPL, MIT/X, Mozilla, en openbare domeinbibliotheken en gegevens.
ERDDAP™vereist geen GPL-code of commerciële programma's.

Het grootste deel van de financiering voor werkzaamheden aanERDDAP™afkomstig is vanNOAA, omdat het Bob Simons salaris betaalde. Voor het eerste jaar vanERDDAP™, toen hij een overheidsaannemer was, kwam de financiering van de[NOAAKustwacht](https://coastwatch.noaa.gov/)programma, de[NOAAIOOS](https://ioos.noaa.gov/)programma, en de nu opgeheven Pacific Ocean Shelf Tracking (POST) programma.

Veel krediet gaat naar de veleERDDAP™Beheerders en gebruikers die suggesties en opmerkingen hebben gedaan die hebben geleid tot vele verbeteringen inERDDAP. Velen worden bij naam genoemd in de[Lijst van wijzigingen](/changes). Dank u allen (genoemd en ongenoemd) Heel erg. Dus,ERDDAP™is een groot voorbeeld van[Gebruikersgestuurde innovatie](https://en.wikipedia.org/wiki/User_innovation), waar productinnovatie vaak afkomstig is van consumenten (ERDDAP™gebruikers) , niet alleen de producenten (ERDDAP™ontwikkelaars) .

Hier is de lijst van software en datasets die in deERDDAP™distributie. Voor al deze zaken zijn wij zeer dankbaar. Heel erg bedankt.
\\[Vanaf 2021 is het bijna onmogelijk geworden om alle bronnen van code voorERDDAP™omdat een paar van de bibliotheken die we gebruiken (met name netcdf-java en vooral AWS) Op zijn beurt gebruiken veel, vele andere bibliotheken. Alle bibliotheken dieERDDAP™code aanroepen zijn hieronder opgenomen, evenals veel van de bibliotheken die de andere bibliotheken op hun beurt oproepen. Als u ziet dat we hieronder een project hebben weggelaten, laat het ons dan weten zodat we hieronder het project kunnen toevoegen en krediet kunnen geven waar krediet verschuldigd is.\\]

## Overzicht{#overview} 
ERDDAP™is a[JavaServer](https://www.oracle.com/technetwork/java/javaee/servlet/index.html)programma. OpERD, het loopt in een[Tomcat](https://tomcat.apache.org/)programmaserver (licentie:[Apache](https://www.apache.org/licenses/)) , met[Apache](https://httpd.apache.org/)webserver (licentie:[Apache](https://www.apache.org/licenses/)) , draaien op een computer met behulp van de[Red Hat Linux](https://www.redhat.com/)besturingssysteem (licentie:[GPL](https://www.gnu.org/licenses/gpl-3.0.html)) .
     
## Datasets{#datasets} 
De datasets komen uit verschillende bronnen. Zie de metagegevens (met name de "sourceUrl", "infoUrl""institution", en "licentie") voor elke dataset. Veel datasets hebben een beperking op hun gebruik die vereist dat u de dataprovider te citeren / crediteren wanneer u de gegevens gebruikt. Het is altijd een goede vorm om de dataprovider te citeren/crediteren. Zie[Hoe een dataset in een paper te plaatsen](https://coastwatch.pfeg.noaa.gov/erddap/information.html#citeDataset).
     
## CoHort-software{#cohort-software} 
[De com/cohort klassen](#cohort-software)zijn van CoHort Software ( https://www.cohortsoftware.com ) die deze klassen beschikbaar stelt met een MIT/X-achtige licentie (zie klassen/com/cohort/util/LICENSE.txt) .
     
## CoastWatch Browser{#coastwatch-browser} 
ERDDAP™gebruikt code van het CoastWatch Browser project (nu gedecomissioneerd) van de[NOAAKustwacht](https://coastwatch.noaa.gov) [Westkust Regionaal Knooppunt](https://coastwatch.pfeg.noaa.gov/)  (licentie: auteursrechtelijk beschermde open source) . Dit project werd geïnitieerd en beheerd door Dave Foley, een voormalig coördinator van deNOAACoastWatch West Coast Regional Node. Alle CoastWatch Browser code is geschreven door Bob Simons.
     
## OPeNDAP {#opendap} 
Gegevens van[OPeNDAP](https://www.opendap.org)servers worden gelezen met[Java DAP1.1.7](https://www.opendap.org/deprecated-software/java-dap)  (licentie: LGPL) .
     
## NetCDF- Java{#netcdf-java} 
NetCDFbestanden (.nc) , GMT-stijlNetCDFbestanden (.grd) , GRIB, en BUFR worden gelezen en geschreven met code in de[NetCDF JavaBibliotheek](https://www.unidata.ucar.edu/software/netcdf-java/)  (licentie:[BSD-3](https://github.com/Unidata/netcdf-java/blob/develop/LICENSE)) van[Unidata](https://www.unidata.ucar.edu/).

Software opgenomen in deNetCDF Java.jar:

* slf4j
DeNetCDF JavaBibliotheek en Cassandra behoefte[slf4j van de Simple Logging Facade voorJava](https://www.slf4j.org/)project. Momenteel,ERDDAP™gebruikt de slf4j-simple-xxx.jar hernoemd als slf4j.jar om aan deze behoefte te voldoen. (licentie:[MIT/X](https://www.slf4j.org/license.html)) .
     
* JDOM
DeNetCDF Java.jar bevat XML-verwerkingscode van[JDOM](http://www.jdom.org/)  (licentie:[Apache](http://www.jdom.org/docs/faq.html#a0030)) , die is opgenomen in de netcdfAll.jar.
     
* Joda
DeNetCDF Java.jar omvat[Joda](https://www.joda.org/joda-time/)voor kalenderberekeningen (die waarschijnlijk niet worden gebruikt doorERDDAP) . (licentie:[Apache 2.0](https://www.joda.org/joda-time/licenses.html)) .
     
* Apache
DeNetCDF Java.jar bevat .jar bestanden van verschillende[Apache projecten](https://www.apache.org/):
    [commons-codec](https://commons.apache.org/proper/commons-codec/),
    [commons-discovery](https://commons.apache.org/discovery/),
    [commons-httpclient](https://hc.apache.org/httpcomponents-client-ga/),
    [commons-logging](https://commons.apache.org/proper/commons-logging/)  
    [HttpComponenten](https://hc.apache.org),
     (Voor iedereen: licentie:[Apache](https://www.apache.org/licenses/LICENSE-2.0))   
Deze zijn opgenomen in de netcdfAll.jar.
     
* Andere
DeNetCDF Java.jar bevat ook code van: com.google.code.findbugs, com.google.errorprone, com.google.guava, com.google.j2objc, com.google.protobuf, edu.ucar, org.codehaus.mojo, com.beust.jcommander, com.google.common, com.google.re2j, en com.google.derde partij. (Google gebruikt Apache en BSD-achtige licenties.)   
         
## SGT{#sgt} 
De grafieken en kaarten worden on-the-fly gemaakt met een aangepaste versie vanNOAA's SGT (was op https://www.pmel.noaa.gov/epic/java/sgt/ , nu stopgezet) versie 3 (aJava-based Scientific Graphics Toolkit geschreven door Donald Denbo op[NOAAPMEL](https://www.pmel.noaa.gov/))   (licentie: auteursrechtelijk beschermde open source (was op https://www.pmel.noaa.gov/epic/java/license.html ) ) .
     
## Walter Zorn{#walter-zorn} 
Grote, HTML-tooltips opERDDAP's HTML pagina's zijn gemaakt met Walter Zorn's wz\\_tooltip. js (licentie: LGPL) .
Sliders en de drag and drop functie van de Slide Sorter zijn gemaakt met Walter Zorn's wz\\_dragdrop.js (licentie: LGPL) .
     
## openPDF{#openpdf} 
De .pdf bestanden worden gemaakt met[openpdf](https://github.com/LibrePDF/OpenPDF), een gratisJava- PDF bibliotheek.
     
## GSHHS{#gshhs} 
De kustlijn en het meer gegevens zijn van[GSHHS](https://www.ngdc.noaa.gov/mgg/shorelines/gshhs.html)-- Een wereldwijde zelfconsistente, hiërarchieke, hoge resolutie Shoreline-database (licentie:[GPL](https://www.soest.hawaii.edu/pwessel/gshhs/README.TXT)) en gemaakt door Paul Wessel en Walter Smith.

We maken geen claim over de overeenstemming van de Shoreline gegevens die metERDDAP™Gebruik het niet voor NAVIGATIONAL-doeleinden.
     
    
## GMT-pscoast{#gmt-pscoast} 
De politieke grenzen en riviergegevens zijn afkomstig van de[pscoast](https://www.soest.hawaii.edu/gmt/gmt/html/man/pscoast.html)programma in[GMT](https://www.soest.hawaii.edu/gmt/), die gebruik maakt van gegevens van de[CIA Wereldbank II](https://www.evl.uic.edu/pape/data/WDB/)  (licentie: openbaar domein) .

Wij maken geen aanspraak op de samenhang van de politieke grensgegevens die metERDDAP.
    
## ETOPO{#etopo} 
De badymetrie/topografische gegevens die op de achtergrond van sommige kaarten worden gebruikt is de[ETOPO1 Global 1-minute Gridded Elevation Data set](https://www.ngdc.noaa.gov/mgg/global/global.html)  (IJsoppervlak, raster geregistreerd, binair, 2 byte int: etopo1\\_ice\\_g\\_i2.zip)   (licentie:[publiek domein](https://www.ngdc.noaa.gov/ngdcinfo/privacy.html#copyright)) , die gratis door[NOAANGDC](https://www.ngdc.noaa.gov).

We maken geen claim over de overeenstemming van de badkamer/topographiegegevens die metERDDAP. Gebruik het niet voor NAVIGATIONELE DOELSTELLINGEN.
    
## JavaPost{#javamail} 
E-mails worden verzonden met behulp van code in post. pot vanOracle's[JavaE-mail API](https://javaee.github.io/javamail/)  (licentie:[GEMEENSCHAPPELIJKE ONTWIKKELING EN DISTRIBUTIELICENSE (CDDL) Versie 1.1](https://javaee.github.io/javamail/LICENSE)) .
     
## JSON{#json} 
ERDDAP™toepassingen[json.org'sJava-based JSON bibliotheek](https://www.json.org/index.html)te ontleden[JSON](https://www.json.org/)gegevens (licentie:[auteursrechtelijk beschermde open source](https://www.json.org/license.html)) .
     

## PostgrSQL{#postgrsql} 
ERDDAP™omvat de[PostGres JDBC](https://mvnrepository.com/artifact/org.postgresql/postgresql)stuurprogramma (licentie:[BSD](https://www.postgresql.org/about/licence/)) . De bestuurder is Copyright (c) 1997-2010, PostgreSQL Global Development Group. Alle rechten voorbehouden.
     
## Luceen{#lucene} 
ERDDAP™code van Apache gebruiken[Luceen](https://lucene.apache.org/). (licentie:[Apache](https://www.apache.org/licenses/LICENSE-2.0)) voor de "luceen"-zoekmachineoptie (maar niet voor de standaard "originele" zoekmachine) .
     
## commons-compress{#commons-compress} 
ERDDAP™code van Apache gebruiken[commons-compress](https://commons.apache.org/compress/). (licentie:[Apache](https://www.apache.org/licenses/LICENSE-2.0)) .
     
## JEXL{#jexl} 
ERDDAP™ondersteuning voor het evalueren van expressies en scripts in&lt;sourceNames&gt;'s steunt op de[Apache-project](https://www.apache.org/):[JavaUitdrukkingstaal (JEXL) ](https://commons.apache.org/proper/commons-jexl/)  (licentie:[Apache](https://www.apache.org/licenses/LICENSE-2.0)) .
     
## Cassandra{#cassandra} 
ERDDAP™omvat Apache[Cassandra's](https://cassandra.apache.org/) [cassandra-driver-core.jar](https://mvnrepository.com/artifact/com.datastax.cassandra/cassandra-driver-core)  (licentie:[Apache 2.0](https://github.com/datastax/java-driver/blob/2.1/LICENSE)) .
Cassandra's cassandra-driver-core.jar vereist (en zoERDDAP™omvat) :
*   [guava.jar](https://github.com/google/guava)  (licentie:[Apache 2.0](https://github.com/google/guava/blob/master/LICENSE)) .
*   [lz4.jar](https://repo1.maven.org/maven2/net/jpountz/lz4/lz4/)  (licentie:[Apache 2.0](https://github.com/jpountz/lz4-java/blob/master/LICENSE.txt)) .
*   [metrics-core.jar](https://mvnrepository.com/artifact/com.codahale.metrics/metrics-core/3.0.2)  (licentie:[MIT](https://github.com/codahale/metrics/blob/master/LICENSE)) .
*   [netty-all.jar](https://netty.io/downloads.html)  (licentie:[Apache 2.0](https://netty.io/downloads.html)) .
*   [snappy-java.jar](https://xerial.org/snappy-java/)  (licentie:[Apache 2.0](https://github.com/xerial/snappy-java/blob/develop/LICENSE)) .
         
## KT\\_paletten{#kt_-palettes} 
De kleurenpaletten met het voorvoegsel "KT\\_" zijn a[verzameling van .cpt paletten door Kristen Thyng](http://soliton.vm.bytemark.co.uk/pub/cpt-city/cmocean/index.html)  (licentie:[MIT/X](http://soliton.vm.bytemark.co.uk/pub/cpt-city/cmocean/copying.html)) , maar enigszins geformatteerd door Jennifer Sevadjian vanNOAAzodat ze voldoen aanERDDAP.cpt eisen.
     
## Leaflet {#leaflet} 
ERDDAP™gebruikt deJavaScriptbibliotheek[Leaflet](https://leafletjs.com/)  (licentie:[BSD 2](https://github.com/Leaflet/Leaflet/blob/main/LICENSE)) als deWMSclient opWMSwebpagina's inERDDAP. Het is uitstekende software (goed ontworpen, gebruiksvriendelijk, snel en gratis) van Vladimir Agafonkin.
     
## AWS{#aws} 
Voor het werken met Amazon AWS (inclusief S3) ,ERDDAP™gebruikt v2 van de[AWS SDK voorJava](https://aws.amazon.com/sdk-for-java/)  (licentie:[Apache](https://www.apache.org/licenses/)) .

AWS vereist dat Maven de afhankelijkheden intrekt. Ze omvatten de volgende .jar bestanden (waarbij xxx het versienummer is, dat in de loop van de tijd verandert, en het licentietype tussen haakjes staat) : annotaties-xxx.jar (Apache) , apache-client-xxx.jar (Apache) , ams-xxx.jar (BSD) , asm-xxx.jar (BSD) , asm-analyse-xxx.jar (BSD) , asm-commons-xxx.jar (BSD) , asm-tree-xxx.jar (BSD) , asm-util-xxx.jar (BSD) , auth-xxx.jar (?) , aws-core-xxx.jar (Apache) , aws-query-protocol-xxx.jar (Apache) , aws-xml-protocol-xxx.jar (Apache) , Checker-qual-xxx.jar (MIT) , error\\_prone\\_annotations-xxx.jar (Apache) , eventstream-xxx.jar (Apache) , failureaccess-xxx.jar (Apache) ,httpcore-xxx.jar (Apache) , j2objc-annotaties-xxx.jar (Apache) , jackson-annotaties-xxx.jar (Apache) , Jackson-core-xxx.jar (Apache) , Jackson-databind-xxx.jar (Apache) , jaxen-xxx.jar (BSD) , jffi-xxx.jar (Apache) , jffi-xxx.native. pot (Apache) , jnr-constants-xxx.jar (Apache) , jnr-fifi-xxx.jar (Apache) , jnr-posix-xxx.jar (Apache) , jnr-x86asm-xxx.jar (Apache) , json-xxx.jar (Gecopyrighteerde open source) , jsr305-xxx.jar (Apache) , luisterbare toekomst-xxx.jar (Apache) Ongeveer een dozijn netty. pot (Apache) , profielen-xxx.jar (Apache) , protocol-core-xxx.jar (Apache) , reactief-streams-xxx.jar (CCO 1,0) , regio's-xxx.jar (Apache) , s3-xxx.jar (Apache) , sdk-core-xxx.jar (Apache) , utils-xxx.jar (?) . Om de werkelijke licenties te zien, zoek naar de .jar naam in de[Maven repository](https://mvnrepository.com/)En dan rondsnuffelen in de dossiers van het project om de licentie te vinden.
    

We zijn ook erg dankbaar voor alle software en websites die we gebruiken bij het ontwikkelenERDDAP, inclusief
[Chrome](https://www.google.com/chrome/browser/desktop/),
[curl](https://curl.haxx.se/),
[DuckDuckGo](https://duckduckgo.com/?q=),
[BewerkenPlus](https://www.editplus.com/),
[FileZilla](https://filezilla-project.org/).
[GitHub](https://github.com/),
[Google Search](https://www.google.com/webhp),
[Puttachtig](https://www.chiark.greenend.org.uk/~sgtatham/putty/download.html),
[stack overflow](https://stackoverflow.com/),
[todoist](https://todoist.com/?lang=en),
[Wikipedia](https://www.wikipedia.org/),
het internet, het World Wide Web, en alle andere, geweldige, behulpzame websites.
Heel erg bedankt.
