# Bekjennelser

Bidragsyteren[kreditter](https://github.com/erddap/erddap/blob/main/CREDITS.md)forERDDAP™Nå er det på en separat side.ERDDAP™er et produkt av[NOAA](https://www.noaa.gov "National Oceanic and Atmospheric Administration") [NMFS](https://www.fisheries.noaa.gov "National Marine Fisheries Service") [SWFSC](https://swfsc.noaa.gov "Southwest Fisheries Science Center") [ERD](https://www.fisheries.noaa.gov/about/environmental-research-division-southwest-fisheries-science-center "Environmental Research Division")..

Bob Simons er den originale hovedforfatteren tilERDDAP™  (designer og programvareutvikler som skrevERDDAP-spesifikk kode) .. Utgangspunktet var Roy Mendelssohns (Bobs sjef) Forslag om at Bob snu sin ConvertTable program (et lite verktøy som konverterer tabelldata fra ett format til et annet og som i stor grad var kode fra Bobs pre-NOAAjobber som Bob re-lisensert for å være åpen kildekode) i en webtjeneste.

Det var og er Roy Mendelssohns ideer om distribuerte datasystemer, hans opprinnelige forslag til Bob og hans pågående støtte (inkludert maskinvare, nettverk og annen programvarestøtte, og ved å frigjøre Bobs tid så han kan tilbringe mer tid påERDDAP™kode) Dette prosjektet har gjort det mulig og muliggjort vekst.

DenERDDAP-spesifikk kode er lisensiert som opphavsrettslig åpen kildekode, med[NOAA](https://www.noaa.gov)å holde opphavsretten. Se[ERDDAP™lisens](/license)..
ERDDAP™bruker opphavsrettslig åpen kildekode, Apache, LGPL, MIT/X, Mozilla og offentlige domenebiblioteker og data.
ERDDAP™krever ikke noen GPL-kode eller kommersielle programmer.

Hovedparten av finansieringen til arbeid påERDDAP™har kommet fraNOAAI den forbindelse betalte den Bob Simons lønn. For det første året avERDDAP™Når han var entreprenør, kom finansiering fra[NOAACoastWatch](https://coastwatch.noaa.gov/)program,[NOAAIOOS](https://ioos.noaa.gov/)programmet, og den nå nedlagte Stillehavet Shelf Tracking (POST) program.

Mye kreditt går til de mangeERDDAP™administratorer og brukere som har lagt fram forslag og kommentarer som har ført til mange forbedringer iERDDAP.. Mange er nevnt ved navn i[Liste over endringer](/changes).. Takk alle sammen (navngitt og navngitt) Veldig mye. DerforERDDAP™Et godt eksempel på[Brukerdrevet innovasjon](https://en.wikipedia.org/wiki/User_innovation), der produktinnovasjon ofte kommer fra forbrukere (ERDDAP™brukere) Ikke bare produsentene (ERDDAP™utviklere) ..

Her er listen over programvare og datasett som er iERDDAP™Fordeling. Vi er veldig takknemlige for alle disse. Tusen takk.
\\[Fra 2021 har det blitt nesten umulig å liste alle kildene til kode forERDDAP™Fordi noen av bibliotekene vi bruker (spesielt netcdf-java og spesielt AWS) Bruk i sin tur mange andre biblioteker. Alle bibliotekene somERDDAP™kodesamtaler direkte er inkludert nedenfor, som er mange av bibliotekene som de andre bibliotekene ringer i sin tur. Hvis du ser at vi har utelatt et prosjekt nedenfor, vennligst gi oss beskjed så vi kan legge til prosjektet nedenfor og gi kreditt der kreditt er pålagt.\\]

## Oversikt{#overview} 
ERDDAP™er en[JavaServlet](https://www.oracle.com/technetwork/java/javaee/servlet/index.html)program. PåERDDet går inne i et[Tomcat](https://tomcat.apache.org/)applikasjonsserver (lisens:[Apache](https://www.apache.org/licenses/)) Med en[Apache](https://httpd.apache.org/)webserver (lisens:[Apache](https://www.apache.org/licenses/)) kjører på en datamaskin ved hjelp av[Red Hat Linux](https://www.redhat.com/)operativsystem (lisens:[GPL](https://www.gnu.org/licenses/gpl-3.0.html)) ..
     
## Datasett{#datasets} 
Datasettene kommer fra ulike kilder. Se metadataene (SpesieltsourceUrl", "infoUrl","institution", og "lisens") For hvert datasett. Mange datasett har en restriksjon på deres bruk som krever at du siterer/kreditterer dataleverandøren når du bruker dataene. Det er alltid bra å sitere / kreditere dataleverandøren. Se[Hvordan citere et datasett i en papir](https://coastwatch.pfeg.noaa.gov/erddap/information.html#citeDataset)..
     
## CoHort programvare{#cohort-software} 
[Kom/kohort-klassene](#cohort-software)er fra CoHort programvare ( https://www.cohortsoftware.com ) som gjør disse klassene tilgjengelige med en MIT/X-lignende lisens (se klasser/com/cohort/util/LIKENSE.txt) ..
     
## CoastWatch-nettleser{#coastwatch-browser} 
ERDDAP™bruker kode fra CoastWatch nettleserprosjektet (Nå decomissioned) fra[NOAACoastWatch](https://coastwatch.noaa.gov) [Vestkysten Regional Node](https://coastwatch.pfeg.noaa.gov/)  (lisens: opphavsrettslig åpen kilde) .. Prosjektet ble initiert og ledet av Dave Foley, en tidligere koordinator forNOAACoastWatch West Coast Regional Node. Alle CoastWatch-nettleserkoden ble skrevet av Bob Simons.
     
## OPeNDAP {#opendap} 
Data fra[OPeNDAP](https://www.opendap.org)servere leses med[Java DAP1.1.7](https://www.opendap.org/deprecated-software/java-dap)  (lisens: LGPL) ..
     
## NetCDF-java{#netcdf-java} 
NetCDFfiler (.nc) , GMT-stilNetCDFfiler (.grd) , GRIB og BUFR leses og skrives med kode i[NetCDF JavaBibliotek](https://www.unidata.ucar.edu/software/netcdf-java/)  (lisens:[BSD-3](https://github.com/Unidata/netcdf-java/blob/develop/LICENSE)) fra[Unidata](https://www.unidata.ucar.edu/)..

Programvare inkludert iNetCDF Java.jar:

* slf4j
DenNetCDF JavaBibliotek og Cassandra trenger[slf4j fra den enkle loggefasen forJava](https://www.slf4j.org/)Prosjekt. I dag,ERDDAP™bruker slf4j-simple-xxx.jar omdøpt som slf4j.jar for å møte dette behovet. (lisens:[MIT/X](https://www.slf4j.org/license.html)) ..
     
* Jdom
DenNetCDF Java.jar inkluderer XML-prosesskode fra[Jdom](http://www.jdom.org/)  (lisens:[Apache](http://www.jdom.org/docs/faq.html#a0030)) , som er inkludert i netcdfAll.jar.
     
* Joda
DenNetCDF Java.jar inkluderer[Joda](https://www.joda.org/joda-time/)for kalenderberegninger (som sannsynligvis ikke brukes avERDDAP) .. (lisens:[Apache 2.0](https://www.joda.org/joda-time/licenses.html)) ..
     
* Apache
DenNetCDF Java.jar inkluderer .jar-filer fra flere[Apache-prosjekter](https://www.apache.org/):)
    [codec](https://commons.apache.org/proper/commons-codec/),
    [fellesoppdagelse](https://commons.apache.org/discovery/),
    [commons-httpklient](https://hc.apache.org/httpcomponents-client-ga/),
    [commons-logging](https://commons.apache.org/proper/commons-logging/)  
    [HttpComponents](https://hc.apache.org),
     (For alle: lisens:[Apache](https://www.apache.org/licenses/LICENSE-2.0))   
Disse er inkludert i netcdfAll.jar.
     
* Andre
DenNetCDF Java.jar inkluderer også kode fra: com.google.code.findbugs, com.google.errorprone, com.google.guava, com.google.j2objc, com.google.protobuf, edu.ucar, org.codehaus.mojo, com.beust.jcommander, com.google.com, com.google.re2j og com.google.tredjeparty. (Google bruker Apache og BSD-lignende lisenser.)   
         
## SGT{#sgt} 
Grafene og kartene opprettes på flyet med en modifisert versjon avNOAASGTs (var på https://www.pmel.noaa.gov/epic/java/sgt/ Nå avsluttet) versjon 3 (aJava-basert Scientific Graphics Toolkit skrevet av Donald Denbo på[NOAAPMEL](https://www.pmel.noaa.gov/))   (lisens: opphavsrettslig åpen kilde (var på https://www.pmel.noaa.gov/epic/java/license.html ) ) ..
     
## Walter Zorn{#walter-zorn} 
Store, HTML tips påERDDAPHTML-sider opprettes med Walter Zorns wz\\_tooltip. js (lisens: LGPL) ..
Slidere og trekk- og slippefunksjonen til Slide Sorter er laget med Walter Zorns wz-_dragdrop.js (lisens: LGPL) ..
     
## OpenPDF{#openpdf} 
.pdf-filene opprettes med[Openpdf](https://github.com/LibrePDF/OpenPDF)En gratisJava-PDF bibliotek.
     
## GSHHS{#gshhs} 
Landlinjen og innsjødata er fra[GSHHS](https://www.ngdc.noaa.gov/mgg/shorelines/gshhs.html)- En global selvkonsistent, hierarkisk, høyoppløselig Shoreline-database (lisens:[GPL](https://www.soest.hawaii.edu/pwessel/gshhs/README.TXT)) og skapt av Paul Wessel og Walter Smith.

Vi har ingen klaim om korrektheten av de shoreline data som kommer medERDDAP™- Ikke bruk det for ikke-vanskelige formål.
     
    
## GMT pscoast{#gmt-pscoast} 
Den politiske grensen og elvedataene er fra[pscoast](https://www.soest.hawaii.edu/gmt/gmt/html/man/pscoast.html)programmet i[GMT](https://www.soest.hawaii.edu/gmt/)som bruker data fra[CIA Verdensbanken II](https://www.evl.uic.edu/pape/data/WDB/)  (lisens: offentlig domene) ..

Vi har ingen klaim om korrektheten til de politiske bonadiske opplysningene som kommer medERDDAP..
    
## ETOPO{#etopo} 
De badymetri/topografi data som brukes i bakgrunnen av noen kart er[ETOPO1 Global 1-minute grepet hevelsesdatasett](https://www.ngdc.noaa.gov/mgg/global/global.html)  (Ice Overflate, nett registrert, binær, 2 byte intensjon: etopo1\\_ice\\_g\\_i2.zip)   (lisens:[offentlig domene](https://www.ngdc.noaa.gov/ngdcinfo/privacy.html#copyright)) , som distribueres gratis[NOAANGDC](https://www.ngdc.noaa.gov)..

Vi har ingen KLAIM OM KORREKTEN AV BATYMETRY/TOPOGRAFY DATA som kommer medERDDAP.. Ikke bruk det til ikke-overensstemmende formål.
    
## JavaE-post{#javamail} 
E-post sendes via kode i e-post. krukke fraOracle's[JavaE-post-API](https://javaee.github.io/javamail/)  (lisens:[KOMMON UTVIKLING OG DISTRIBUSJON LICENSE (CDDL) Versjon 1.1](https://javaee.github.io/javamail/LICENSE)) ..
     
## JSON{#json} 
ERDDAP™bruk[Json.orgsJava-basert JSON bibliotek](https://www.json.org/index.html)å tolke[JSON](https://www.json.org/)Data (lisens:[copyrighted open source](https://www.json.org/license.html)) ..
     

## PostgrSQL{#postgrsql} 
ERDDAP™inkluderer[PostGres JDBC](https://mvnrepository.com/artifact/org.postgresql/postgresql)driver (lisens:[BSD](https://www.postgresql.org/about/licence/)) .. Føreren er opphavsrett (c) 1997-2010, PostgreSQL Global Development Group. Alle rettigheter forbeholdt.
     
## Lucene{#lucene} 
ERDDAP™bruk kode fra Apache[Lucene](https://lucene.apache.org/).. (lisens:[Apache](https://www.apache.org/licenses/LICENSE-2.0)) for søkemotoren (men ikke for standard " original" søkemotor) ..
     
## commons-compress{#commons-compress} 
ERDDAP™bruk kode fra Apache[commons-compress](https://commons.apache.org/compress/).. (lisens:[Apache](https://www.apache.org/licenses/LICENSE-2.0)) ..
     
## JEXL{#jexl} 
ERDDAP™støtte for evaluering av uttrykk og skript i&lt;sourceNameS&gt; er avhengig av[Apache-prosjektets](https://www.apache.org/):)[JavaUttrykksspråk (JEXL) ](https://commons.apache.org/proper/commons-jexl/)  (lisens:[Apache](https://www.apache.org/licenses/LICENSE-2.0)) ..
     
## Cassandra{#cassandra} 
ERDDAP™inkluderer Apache[Cassandras](https://cassandra.apache.org/) [Cassandra-driver-core.jar](https://mvnrepository.com/artifact/com.datastax.cassandra/cassandra-driver-core)  (lisens:[Apache 2.0](https://github.com/datastax/java-driver/blob/2.1/LICENSE)) ..
Cassandras cassandra-driver-core.jar krever (og såERDDAP™inkluderer) :)
*   [Guava.](https://github.com/google/guava)  (lisens:[Apache 2.0](https://github.com/google/guava/blob/master/LICENSE)) ..
*   [Lz4.jar](https://repo1.maven.org/maven2/net/jpountz/lz4/lz4/)  (lisens:[Apache 2.0](https://github.com/jpountz/lz4-java/blob/master/LICENSE.txt)) ..
*   [Metrics-core.jar](https://mvnrepository.com/artifact/com.codahale.metrics/metrics-core/3.0.2)  (lisens:[MIT](https://github.com/codahale/metrics/blob/master/LICENSE)) ..
*   [Netty-all.jar](https://netty.io/downloads.html)  (lisens:[Apache 2.0](https://netty.io/downloads.html)) ..
*   [Snappy-java.](https://xerial.org/snappy-java/)  (lisens:[Apache 2.0](https://github.com/xerial/snappy-java/blob/develop/LICENSE)) ..
         
## KT\\_paletter{#kt_-palettes} 
Fargepalettene som har prefikset "KT\\_" er en[samling av .cpt paletter av Kristen Tyng](http://soliton.vm.bytemark.co.uk/pub/cpt-city/cmocean/index.html)  (lisens:[MIT/X](http://soliton.vm.bytemark.co.uk/pub/cpt-city/cmocean/copying.html)) , men litt isolert av Jennifer SevadjianNOAAslik at de er i samsvar medERDDAPcpt-krav.
     
## Leaflet {#leaflet} 
ERDDAP™brukerJavaSkriptbibliotek[Leaflet](https://leafletjs.com/)  (lisens:[BSD 2](https://github.com/Leaflet/Leaflet/blob/main/LICENSE)) somWMSKunde påWMSnettsider iERDDAP.. Det er utmerket programvare (godt designet, lett å bruke, raskt og gratis) fra Vladimir Agafonkin.
     
## AWS{#aws} 
For å jobbe med Amazon AWS (inkludert S3) ,ERDDAP™bruker v2 av[AWS SDK forJava](https://aws.amazon.com/sdk-for-java/)  (lisens:[Apache](https://www.apache.org/licenses/)) ..

AWS krever Maven å trekke seg i avhengighetene. De inkluderer følgende .jar filer (hvor xxx er versjonsnummer, som endres over tid, og lisenstypen er i parentes) : annotasjoner-xxx.jar (Apache) Apache-client-xxx.jar (Apache) , ams-xxx.jar (BSD) , asm-xxx.jar (BSD) , asm-analyse-xxx.jar (BSD) asm-commons-xxx.jar (BSD) , asm-tre-xxx.jar (BSD) , asm-util-xxx.jar (BSD) , auth-xxx.jar (?) , aws-core-xxx.jar (Apache) , aws-query-protocol-xxx.jar (Apache) , aws-xml-protocol-xxx.jar (Apache) , checker-qual-xxx.jar (MIT) , feil\\_prone\\_annotations-xxx.jar (Apache) , eventstream-xxx.jar (Apache) , manglende tilgang-xxx.jar (Apache) ,httpKjerne-xxx.jar (Apache) , j2objc-annotasjoner-xxx.jar (Apache) Jackson-annotasjoner-xxx.jar (Apache) Jackson-core-xxx.jar (Apache) , Jackson-databind-xxx.jar (Apache) Jaxen-xxx.jar (BSD) , jffi-xxx.jar (Apache) , jffi-xxx.native. krukke (Apache) , jnr-constants-xxx.jar (Apache) Jnr-ffi-xxx.jar (Apache) , jnr-posix-xxx.jar (Apache) jnr-x86asm-xxx.jar (Apache) , json-xxx.jar (Copyrighted open source) , jsr305-xxxx.jar (Apache) , hørbarfuture-xxx.jar (Apache) Om lag et dusin netty. krukkers (Apache) , profiler-xxx.jar (Apache) , protokoll-core-xxx.jar (Apache) , reactive-streams-xxx.jar (CCO 1.0) , regions-xxx.jar (Apache) , s3-xxx.jar (Apache) , sdk-core-xxx.jar (Apache) , utils-xxx.jar (?) .. For å se de faktiske lisensene, søk etter .jar navn i[Maven-arkivet](https://mvnrepository.com/)og deretter romme rundt i prosjektets filer for å finne lisensen.
    

Vi er også veldig takknemlige for alle programvaren og nettstedene vi bruker når vi utviklerERDDAP, inkludert
[Chrome](https://www.google.com/chrome/browser/desktop/),
[curl](https://curl.haxx.se/),
[DuckDuckGo](https://duckduckgo.com/?q=),
[RedigerPlus](https://www.editplus.com/),
[FileZilla](https://filezilla-project.org/)..
[GitHub](https://github.com/),
[Google-søk](https://www.google.com/webhp),
[PuTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/download.html),
[stabel overflod](https://stackoverflow.com/),
[Todoist](https://todoist.com/?lang=en),
[Wikipedia](https://www.wikipedia.org/),
Internett, World Wide Web, og alle de andre, flotte, nyttige nettsteder.
Tusen takk.
