# Tunnustukset

Avustaja [Luottoa](https://github.com/erddap/erddap/blob/main/CREDITS.md) for ERDDAP™ Nyt se on erillisellä sivulla. ERDDAP™ Se on tuotteen [ NOAA ](https://www.noaa.gov "National Oceanic and Atmospheric Administration")   [ NMFS ](https://www.fisheries.noaa.gov "National Marine Fisheries Service")   [ SWFSC ](https://swfsc.noaa.gov "Southwest Fisheries Science Center")   [ ERD ](https://www.fisheries.noaa.gov/about/environmental-research-division-southwest-fisheries-science-center "Environmental Research Division") .

Bob Simons on ensimmäinen kirjailija ERDDAP™   (Suunnittelija ja ohjelmistokehittäjä, joka kirjoitti ERDDAP erityiskoodi) . Alkuperäinen nimi: Roy Mendelssohn's (Bobin pomo) Bob käänsi ConvertTable-ohjelmansa (pieni apuohjelma, joka muuntaa tabulaaritiedot yhdestä formaatista toiseen ja joka oli suurelta osin koodi Bobin esi- NOAA Työt, jotka Bob on luvannut avoimeksi) verkkopalveluun.

Se oli ja on Roy Mendelssohnin ideoita hajautetuista tietojärjestelmistä, hänen ensimmäinen ehdotuksensa Bobille ja hänen jatkuva tuki. (mukaan lukien laitteistot, verkostot ja muut ohjelmistotuet sekä vapauttamalla Bobin aika, jotta hän voisi viettää enemmän aikaa. ERDDAP™ koodikoodi) Tämä on mahdollistanut projektin ja mahdollistanut sen kasvun.

The ERDDAP spesifinen koodi on lisensoitu tekijänoikeudella suojatuksi avoimeksi lähteeksi, [ NOAA ](https://www.noaa.gov) säilyttää tekijänoikeudet. Nähdään [ ERDDAP™ lisenssi lisenssi lisenssi lisenssi](/license) .
 ERDDAP™ käyttää tekijänoikeuksin suojattua avoimen lähdekoodin, Apachen, LGPL:n, MIT/X:n, Mozillan ja julkisten verkkotunnusten kirjastoja ja tietoja.
 ERDDAP™ ei vaadi GPL-koodia tai kaupallisia ohjelmia.

Suurin osa työn rahoituksesta ERDDAP™ on tullut NOAA Hän maksoi Bob Simonsin palkan. Ensimmäisen vuoden ERDDAP™ Kun hän oli hallituksen jäsen, rahoitus tuli [ NOAA Coastwatch](https://coastwatch.noaa.gov/) Ohjelma, [ NOAA IOOS](https://ioos.noaa.gov/) Pacific Ocean Shelf Tracking (käytetty) (POST) ohjelma.

Paljon rahaa menee monille ERDDAP™ ylläpitäjät ja käyttäjät, jotka ovat tehneet ehdotuksia ja kommentteja, jotka ovat johtaneet moniin parannuksiin. ERDDAP . Monet mainitaan nimillä [Lista muutoksista](/changes) . Kiitos kaikille (nimetty ja nimeämätön) hyvin paljon. Näin, ERDDAP™ Hyvä esimerkki [Käyttäjälähtöinen innovaatio](https://en.wikipedia.org/wiki/User_innovation) Tuoteinnovaatiot tulevat usein kuluttajilta ( ERDDAP™ Käyttäjät) Ei pelkästään tuottajat ( ERDDAP™ Kehittäjät) .

Tässä on luettelo ohjelmistoista ja tietoaineistoista, jotka ovat ERDDAP™ Jakelu. Olemme erittäin kiitollisia näistä kaikista. Kiitos paljon.
 \\[ Vuodesta 2021 lähtien on lähes mahdotonta listata kaikkia koodin lähteitä oikein. ERDDAP™ Muutama kirjasto, jota käytämme (Netcdf-java ja erityisesti AWS) Käyttää monia, monia muita kirjastoja. Kaikki kirjastot, jotka ERDDAP™ Alla on koodipuhelut, kuten monet muut kirjastot kutsuvat. Jos näet, että olemme jättäneet alla olevan projektin, ilmoita meille, jotta voimme lisätä projektin alla ja antaa luottoa, jos luotto on maksettu. \\] 

## Yleiskatsaus{#overview} 
 ERDDAP™ on A [ Java Servlet](https://www.oracle.com/technetwork/java/javaee/servlet/index.html) ohjelma. At ERD Se kulkee a:n sisällä [Tomca](https://tomcat.apache.org/) sovelluspalvelin (Lisenssi: [Apasseja](https://www.apache.org/licenses/) ) yhdellä [Apasseja](https://httpd.apache.org/) Web-palvelin (Lisenssi: [Apasseja](https://www.apache.org/licenses/) ) Käy tietokoneessa käyttäen [Punainen Linux](https://www.redhat.com/) Käyttöjärjestelmä (Lisenssi: [GPL](https://www.gnu.org/licenses/gpl-3.0.html) ) .
     
## Dataa{#datasets} 
Tiedot ovat peräisin eri lähteistä. Katso metatiedot (Erityisesti " sourceUrl " infoUrl " "institution" ja "lisenssi") jokaisesta datasta. Monet tietoaineistot rajoittavat niiden käyttöä, joka edellyttää, että mainitset/luovutat tietojen tarjoajan aina, kun käytät tietoja. Tietojen tarjoajalle on aina hyvä mainita/luottaa. Näytä [Miten lisätä tietoaineisto paperissa](https://coastwatch.pfeg.noaa.gov/erddap/information.html#citeDataset) .
     
## CoHort-ohjelmisto{#cohort-software} 
 [com/cohort-luokka](#cohort-software) Lähde: CoHort Software (https://www.cohortsoftware.com) jotka asettavat nämä luokat saataville MIT/X-luvalla (Katso luokat/com/cohort/util/LICENSE.txt) .
     
## Coastwatch selain{#coastwatch-browser} 
 ERDDAP™ CoastWatch Browser -projektin koodi (Nyt poistettu) From the [ NOAA Coastwatch](https://coastwatch.noaa.gov)   [Länsirannikon alueellinen solmu](https://coastwatch.pfeg.noaa.gov/)   (Lähde: Copyrighted Open Source) . Projekti aloitettiin ja sitä johti Dave Foley, entinen koordinaattori. NOAA CoastWatch West Coast Regional Node Näytä tarkat tiedot Kaikki CoastWatchin selainkoodit ovat Bob Simonsin kirjoittamia.
     
##  OPeNDAP  {#opendap} 
Tietoja [ OPeNDAP ](https://www.opendap.org) Palvelimia luetaan [ Java   DAP 1.1.7.](https://www.opendap.org/deprecated-software/java-dap)   (Lähde: LGPL) .
     
##  NetCDF Java{#netcdf-java} 
 NetCDF tiedostoja ( .nc ) GMT-tyyli NetCDF tiedostoja (.grd) GRIB ja BUFR luetaan ja kirjoitetaan koodilla [ NetCDF   Java Kirjastot](https://www.unidata.ucar.edu/software/netcdf-java/)   (Lisenssi: [BSD-3](https://github.com/Unidata/netcdf-java/blob/develop/LICENSE) ) From [ Unidata ](https://www.unidata.ucar.edu/) .

Ohjelmisto sisältyy NetCDF   Java .jar:

* SF4j
The NetCDF   Java Kirjasto ja Cassandra tarvitsevat [Simple Logging Facade -pelistä Java ](https://www.slf4j.org/) projekti. Tällä hetkellä, ERDDAP™ käyttää slf4j-simple-xxx.jar nimetty slf4j.jar vastaamaan tätä tarvetta. (Lisenssi: [MIT/X](https://www.slf4j.org/license.html) ) .
     
* JDOM
The NetCDF   Java .jar sisältää XML-prosessointikoodin [JDOM](http://www.jdom.org/)   (Lisenssi: [Apasseja](http://www.jdom.org/docs/faq.html#a0030) ) , joka sisältyy verkkotunnukseen.fi.
     
* Joo
The NetCDF   Java .jar sisältää [Joo](https://www.joda.org/joda-time/) kalenterilaskelmat (joita ei todennäköisesti käytetä ERDDAP ) . (Lisenssi: [Apace 2.0](https://www.joda.org/joda-time/licenses.html) ) .
     
* Apasseja
The NetCDF   Java .jar sisältää .jar-tiedostoja useista [Apace-projektit](https://www.apache.org/) :
     [Yhteistyökoodi](https://commons.apache.org/proper/commons-codec/) ,
     [Yhteiset löydöt](https://commons.apache.org/discovery/) ,
     [Yhteistyö- http asiakasasiakas](https://hc.apache.org/httpcomponents-client-ga/) ,
     [Yhteinen logiikka](https://commons.apache.org/proper/commons-logging/)   
     [HttpComponents](https://hc.apache.org) ,
     (Kaikki: lisenssi: [Apasseja](https://www.apache.org/licenses/LICENSE-2.0) )   
Näitä ovat netcdfAll.jar.
     
* Muut muut
The NetCDF   Java .jar sisältää myös koodin: com.google.code.findbugs, com.google.errorprone, com.google.guava, com.google.j2objc, com.google.protobuf, koulu.ucar, org.codehaus.mojo, com.beust.jcommander, com.google.common, com.google.rej, ja com.com.com. (Google käyttää Apache- ja BSD-lisenssejä)   
         
## SGT{#sgt} 
Kuvat ja kartat on-the-fly, jossa on muunnettu versio NOAA SGT (olihttps://www.pmel.noaa.gov/epic/java/sgt/Nyt lopetettu) versio 3 (A Java Scientific Graphics Toolkit, kirjoittanut Donald Denbo [ NOAA PM](https://www.pmel.noaa.gov/) )   (Lähde: Copyrighted Open Source (olihttps://www.pmel.noaa.gov/epic/java/license.html) ) .
     
## Walter Zorn{#walter-zorn} 
Big, HTML-työkalut ERDDAP HTML-sivut luodaan Walter Zornin wz-tooltip-sivuilla. j (Lähde: LGPL) .
Slide Sorterin veto- ja pudotusominaisuus on luotu Walter Zornin wz ́dragdrop.js:llä. (Lähde: LGPL) .
     
## OpenPDF{#openpdf} 
.pdf-tiedostot luodaan [Avoinna](https://github.com/LibrePDF/OpenPDF) Ilmainen Java PDF-kirjasto.
     
## GSH{#gshhs} 
Ranta- ja järvitiedot ovat peräisin [GSH](https://www.ngdc.noaa.gov/mgg/shorelines/gshhs.html) Global Self-consistent, Hierarchical, High-resolution Shoreline Database (suom. (Lisenssi: [GPL](https://www.soest.hawaii.edu/pwessel/gshhs/README.TXT) ) Kirjoittanut Paul Wessel ja Walter Smith.

Me emme tee riitaa korrektiiveista, jotka tulevat ERDDAP™ Älä käytä NAVIGATIONALIN PURPOSESS.
     
    
## GMT Pscoast{#gmt-pscoast} 
Poliittiset raja- ja jokitiedot ovat peräisin [Pscoast](https://www.soest.hawaii.edu/gmt/gmt/html/man/pscoast.html) Ohjelmassa [GM](https://www.soest.hawaii.edu/gmt/) joka käyttää tietoja [CIA Maailmanpankki II](https://www.evl.uic.edu/pape/data/WDB/)   (Lähde: Public Domain) .

Me emme tee riitaa POLITICAL BOUNDARY ́in korrektiiveista, jotka tulevat ERDDAP .
    
## ETOPO{#etopo} 
Joidenkin karttojen taustalla käytetyt bathymetria/topografiatiedot ovat [ETOPO1 Global 1-Minute Gridded Elevation Data](https://www.ngdc.noaa.gov/mgg/global/global.html)   (Ice Surface, verkkorekisteröity, binääri, 2 tavun sisältö: etopo1 ± 2 .zip )   (Lisenssi: [Julkinen domain](https://www.ngdc.noaa.gov/ngdcinfo/privacy.html#copyright) ) joka jaetaan ilmaiseksi [ NOAA NGDC](https://www.ngdc.noaa.gov) .

Me emme tee mitään kliseeitä Bathymogyyn / Topografiaan liittyvistä asioista ERDDAP . Älä käytä NAVIGATIONALIN PURPOSESS.
    
##  Java Mail{#javamail} 
Sähköpostit lähetetään koodilla sähköpostitse. Jar Oracle &gt; [ Java Matkustaja API](https://javaee.github.io/javamail/)   (Lisenssi: [KOMMMON DEVELOPMENT AND DISTRIBUTION LICENSE (CDD) Versio 1.1](https://javaee.github.io/javamail/LICENSE) ) .
     
## JSON{#json} 
 ERDDAP™ käyttää [json.org Java JSON-kirjasto](https://www.json.org/index.html) parse [JSON](https://www.json.org/) Datatiedot (Lisenssi: [Tekijänoikeudet avoin lähde](https://www.json.org/license.html) ) .
     

## PostsQL{#postgrsql} 
 ERDDAP™ Sisältää [Lähde: JDBC](https://mvnrepository.com/artifact/org.postgresql/postgresql) Kuljettaja kuljettaja (Lisenssi: [BSD](https://www.postgresql.org/about/licence/) ) . Kuljettaja on tekijänoikeus (c)) Vuosina 1997–2010 PostgreSQL Global Development Group. Kaikki oikeudet pidätetään.
     
## Luce{#lucene} 
 ERDDAP™ Käytä koodia Apache [Luce](https://lucene.apache.org/) . (Lisenssi: [Apasseja](https://www.apache.org/licenses/LICENSE-2.0) ) "lucene" hakukone vaihtoehto (Ei ole olemassa "alkuperäinen" hakukone) .
     
## Yhteinen Compress{#commons-compress} 
 ERDDAP™ Käytä koodia Apache [Yhteinen Compress](https://commons.apache.org/compress/) . (Lisenssi: [Apasseja](https://www.apache.org/licenses/LICENSE-2.0) ) .
     
## Jyväskylä{#jexl} 
 ERDDAP™ Tuki ilmaisujen ja käsikirjoitusten arviointiin&lt; sourceName s &gt; luottaa [Apache-projekti](https://www.apache.org/) : [ Java Ilmaisukieli (Jyväskylä) ](https://commons.apache.org/proper/commons-jexl/)   (Lisenssi: [Apasseja](https://www.apache.org/licenses/LICENSE-2.0) ) .
     
## Cassandra{#cassandra} 
 ERDDAP™ Sisältää Apasseja [Cassandra](https://cassandra.apache.org/)   [Cassandra-driver-core.jar](https://mvnrepository.com/artifact/com.datastax.cassandra/cassandra-driver-core)   (Lisenssi: [Apace 2.0](https://github.com/datastax/java-driver/blob/2.1/LICENSE) ) .
Cassandra's cassandra-driver-core.jar vaatii (Ja niin ERDDAP™ Sisältää) :
*    [guava.jar](https://github.com/google/guava)   (Lisenssi: [Apace 2.0](https://github.com/google/guava/blob/master/LICENSE) ) .
*    [lz4.jar](https://repo1.maven.org/maven2/net/jpountz/lz4/lz4/)   (Lisenssi: [Apace 2.0](https://github.com/jpountz/lz4-java/blob/master/LICENSE.txt) ) .
*    [Metrics-core.jar](https://mvnrepository.com/artifact/com.codahale.metrics/metrics-core/3.0.2)   (Lisenssi: [MM](https://github.com/codahale/metrics/blob/master/LICENSE) ) .
*    [Netty All.jar](https://netty.io/downloads.html)   (Lisenssi: [Apace 2.0](https://netty.io/downloads.html) ) .
*    [Snappy-java.jar](https://xerial.org/snappy-java/)   (Lisenssi: [Apace 2.0](https://github.com/xerial/snappy-java/blob/develop/LICENSE) ) .
         
##  KT\\_ Paletti{#kt_-palettes} 
Väripaletti, jossa on etuliite. KT\\_ "Olet a [.cpt palettes by Kristen Thyng](http://soliton.vm.bytemark.co.uk/pub/cpt-city/cmocean/index.html)   (Lisenssi: [MIT/X](http://soliton.vm.bytemark.co.uk/pub/cpt-city/cmocean/copying.html) ) Hieman uudistettu Jennifer Sevadjian NOAA niin, että he noudattavat ERDDAP .cpt-vaatimukset.
     
##  Leaflet  {#leaflet} 
 ERDDAP™ käyttää Java Kirjaston käsikirjoitus [ Leaflet ](https://leafletjs.com/)   (Lisenssi: [BSD 2](https://github.com/Leaflet/Leaflet/blob/main/LICENSE) ) kuin WMS Asiakas on WMS Verkkosivut sisään ERDDAP . Erinomainen ohjelmisto (hyvin suunniteltu, helppokäyttöinen, nopea ja ilmainen) Lähde: Vladimir Agafonkin
     
## AWS{#aws} 
Lähde: Amazon AWS (mukaan lukien S3) , ERDDAP™ V2:n käyttö [AWS SDK Java ](https://aws.amazon.com/sdk-for-java/)   (Lisenssi: [Apasseja](https://www.apache.org/licenses/) ) .

AWS vaatii Mavenia vetämään riippuvuuksia. Sisältää seuraavat .jar-tiedostot (missä xxx on versionumero, joka muuttuu ajan myötä, ja lisenssityyppi on vanhemmissa) Annotations-xx.jar (Apasseja) Apache-client-xxx.jar (Apasseja) Ams-xx.jar (BSD) Asm-xx.jar (BSD) Asm-analysis-xxx.jar (BSD) Asm-commons-xxx.jar (BSD) Asm-tree-xxx.jar (BSD) Asm-util-xx.jar (BSD) Auth-xxx.jar (??) Aws-core-xxx.jar (Apasseja) Aws-query-protocol-xxx.jar (Apasseja) Aws-xml-protokolla-xxx.jar (Apasseja) Checker-qual-xxx.jar (MM) erehdys \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t \\ t t \\ t t t t t t \\ t t t t t \\ \\ t t t t t \\ t \\ \\ t t t \\ t t t t t \\ t t \\ t t \\ \\ t t \\ \\ \\ \\ \\ t t \\ \\ \\ \\ \\ t \\ \\ \\ \\ \\ t t \\ \\ \\ \\ \\ \\ (Apasseja) Lähellä majoitusliikettä Evenstream-xxx.jar (Apasseja) Epäonnistuminen xxx.jar (Apasseja) , http Core-xxx.jar (Apasseja) j2objc-annotations-xxx.jar (Apasseja) Jackson-annotations-xxx.jar (Apasseja) Jackson-core-xxx.jar (Apasseja) Jackson-databind-xxx.jar (Apasseja) Jaxen-xx.jar (BSD) jffi-xx.jar (Apasseja) jffi-xxx.native. ja (Apasseja) jnr-constants-xxx.jar (Apasseja) jnr-ffi-xxx.jar (Apasseja) jnr-posix-xxx.jar (Apasseja) jnr-x86asm-xxx.jar (Apasseja) json-xxx.jar (Tekijänoikeudet avoin lähde) jsr305-xxx.jar (Apasseja) Future-xxx.jar (Apasseja) noin tusinaa nettiä. Jar (Apasseja) Profiilit-xx.jar (Apasseja) Protokolla-core-xxx.jar (Apasseja) Reactive-streams-xxx.jar (CCO 1.0) alueet-xx.jar (Apasseja) s3-xxx.jar (Apasseja) Sdk-core-xxx.jar (Apasseja) Hyödynnä xxx.jar (??) . Nähdäksesi todelliset lisenssit, etsi .jar-nimeä [Maven repositiivinen](https://mvnrepository.com/) Ja sitten pyörii hankkeen tiedostoissa löytääkseen lisenssin.
    

Olemme myös kiitollisia kaikista käyttämistämme ohjelmistoista ja verkkosivustoista. ERDDAP mukaan lukien
 [Chrome](https://www.google.com/chrome/browser/desktop/) ,
 [ curl ](https://curl.haxx.se/) ,
 [DuckDuckGo](https://duckduckgo.com/?q=) ,
 [EditPlus](https://www.editplus.com/) ,
 [Filezilla](https://filezilla-project.org/) .
 [GitHub](https://github.com/) ,
 [Google etsii](https://www.google.com/webhp) ,
 [Put](https://www.chiark.greenend.org.uk/~sgtatham/putty/download.html) ,
 [Ylikuormitus](https://stackoverflow.com/) ,
 [Todo](https://todoist.com/?lang=en) ,
 [ Wikipedia ](https://www.wikipedia.org/) ,
Internet, World Wide Web ja kaikki muut, hyvät ja hyödylliset sivustot.
Kiitos paljon.
