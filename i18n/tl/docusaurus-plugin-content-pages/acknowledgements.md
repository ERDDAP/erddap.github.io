# Pagpapahalaga

Ang nag - abuloy [Mga kredito](https://github.com/erddap/erddap/blob/main/CREDITS.md) para sa ERDDAP™ ngayon ay nasa hiwalay na pahina. ERDDAP™ ay produkto ng [ NOAA ](https://www.noaa.gov "National Oceanic and Atmospheric Administration")   [ NMFS ](https://www.fisheries.noaa.gov "National Marine Fisheries Service")   [ SWFSC ](https://swfsc.noaa.gov "Southwest Fisheries Science Center")   [ ERD ](https://www.fisheries.noaa.gov/about/environmental-research-division-southwest-fisheries-science-center "Environmental Research Division") .

Si Bob Simons ang orihinal na pangunahing awtor ng ERDDAP™   (ang disenyador at developer ng software na sumulat ng ERDDAP -specific code) . Ang simulang punto ay ang kay Roy Mendelssohn (Ang amo ni Bob) mungkahi na buksan ni Bob ang kaniyang naturang programa (isang maliit na kasangkapan na binabago ang taskular data mula sa isang format tungo sa isa pa at na pangunahin ay code mula sa pre-- NOAA gawa na muling ginawa ni Bob upang maging bukas na pinagmulan) sa isang web service.

Ito at ang mga ideya ni Roy Mendelssohn tungkol sa pamamahagi ng mga sistema ng impormasyon, ang kaniyang panimulang mungkahi kay Bob, at ang kaniyang patuloy na pagsuporta (kasama ang mga hardware, network, at iba pang software support, at sa pamamagitan ng pagpapalaya sa panahon ni Bob upang siya ay makagugol ng higit na panahon sa ERDDAP™ kodigo) na nagpangyari sa proyektong ito at nagpangyari sa paglaki nito.

Ang ERDDAP --specific code ay lisensiyado bilang copyright opening, na may copyright [ NOAA ](https://www.noaa.gov) hawak ang copyright. Tingnan ang [ ERDDAP™ lisensiya](/license) .
 ERDDAP™ ay gumagamit ng copyright opensource, Apache, LGPL, MIT/X, Mozilla, at pampublikong domain aklatan at datos.
 ERDDAP™ ay hindi nangangailangan ng anumang GPL code o komersiyal na mga programa.

Ang malaking bahagi ng pondo para sa pagtatrabaho ERDDAP™ nagmula NOAA , dahil diyan ay nagbayad ng suweldo si Bob Simons. Sa unang taon ng ERDDAP™ , noong siya ay isang kontratista ng pamahalaan, ang pondo ay galing sa [ NOAA Bantayog sa Baybayin](https://coastwatch.noaa.gov/) programa, ang [ NOAA MGA IOO](https://ioos.noaa.gov/) programa, at ang ngayo'y naglalahong Karagatang Pasipiko na Shelf tracking (POST) programa.

Malaki ang pagpapahalaga ng marami ERDDAP™ Ang mga administrador at mga gumagamit nito na nakagawa ng mga mungkahi at komento na umakay sa maraming pagsulong ERDDAP . Marami ang binabanggit ang pangalan sa [Talaan ng mga Pagbabago](/changes) . Salamat sa inyong lahat (at hindi binanggit ang pangalan) Napakarami. Kaya, ERDDAP™ isang magandang halimbawa [User-Driven Innovation](https://en.wikipedia.org/wiki/User_innovation) , kung saan ang pagbabago ng produkto ay kadalasang nanggagaling sa mga mamimili ( ERDDAP™ gumagamit) , hindi lamang ang mga prodyuser ( ERDDAP™ mga developer) .

Narito ang listahan ng mga software at datasets na nasa ERDDAP™ pamamahagi. Laking pasasalamat namin sa lahat ng ito. Maraming salamat.
 \\[ Simula noong 2021, naging halos imposible na mailista nang wasto ang lahat ng pinagmumulan ng kodigo para sa ERDDAP™ sapagkat ang ilan sa mga aklatan na ginagamit natin (Partikular na ang netcdf-java at lalo na ang AWS) At gamitin naman ang marami pang ibang aklatan. Lahat ng aklatan na ERDDAP™ Ang mga tawag sa kodigo ay tuwirang kasali sa ibaba, gayundin ang marami sa mga aklatan na tinatawag naman ng ibang aklatan. Kung makita mong inalis na namin ang isang proyekto sa ibaba, pakisuyong ipaalam sa amin na maaari naming idagdag ang proyekto sa ibaba at magbigay ng kredito kung saan nararapat ang kapurihan. \\] 

## Overview{#overview} 
 ERDDAP™ ay isang [ Java Servlet](https://www.oracle.com/technetwork/java/javaee/servlet/index.html) programa. Nasa ERD , tumatakbo ito sa loob ng isang [Tomcat](https://tomcat.apache.org/) application server (lisensiya: [Apache](https://www.apache.org/licenses/) ) , kasama ang isang [Apache](https://httpd.apache.org/) web server (lisensiya: [Apache](https://www.apache.org/licenses/) ) , pagtakbo sa isang computer na ginagamit ang [Red Hat Linux](https://www.redhat.com/) operating system (lisensiya: [GPL](https://www.gnu.org/licenses/gpl-3.0.html) ) .
     
## Mga Data{#datasets} 
Ang mga set ng datos ay mula sa iba't ibang pinagmulan. Tingnan ang metadata (lalo na ang " sourceUrl ", " infoUrl ", "institution" , at "lisensiya") para sa bawat dataset. Maraming datasets ay may restriksiyon sa paggamit nito na humihiling sa iyo na banggitin/credit ang data provider kailanma't ginagamit mo ang datos. Laging mabuting anyo na banggitin/credit ang data provider. Tingnan [Kung Paano Magsasalaysay ng Isang Dateset sa Isang Papel](https://coastwatch.pfeg.noaa.gov/erddap/information.html#citeDataset) .
     
## CoHort Software{#cohort-software} 
 [Ang mga klase ngcom/cohort](#cohort-software) mula sa CoHort Software (https://www.cohortsoftware.com) na nagbibigay sa mga klaseng ito ng lisensiyang MIT/X-tulad ng (tingnan ang mga klase/com/cohort/util/LICENSE.txt) .
     
## CoastWatch Browser{#coastwatch-browser} 
 ERDDAP™ gumagamit ng code mula sa proyektong CoastWatch Browser (ngayo'y pinaalis) mula sa [ NOAA Bantayog sa Baybayin](https://coastwatch.noaa.gov)   [Blg.](https://coastwatch.pfeg.noaa.gov/)   (lisensiya: may copyright na open source) . Ang proyektong iyon ay pinasimulan at pinangasiwaan ni Dave Foley, isang dating Koordinado ng NOAA CoastWatch West Coast Regional Node. Lahat ng CoastWatch Browser code ay isinulat ni Bob Simons.
     
##  OPeNDAP  {#opendap} 
Talaan ng mga Nilalaman [ OPeNDAP ](https://www.opendap.org) Binabasa ang mga server [ Java   DAP 1.7.](https://www.opendap.org/deprecated-software/java-dap)   (lisensiya: LGPL) .
     
##  NetCDF -java{#netcdf-java} 
 NetCDF mga talaksan ( .nc ) , GMT-style NetCDF mga talaksan (.grd) , GRIB, at BUFR ay binabasa at isinusulat na may kodigo sa [ NetCDF   Java Aklatan](https://www.unidata.ucar.edu/software/netcdf-java/)   (lisensiya: [BSD-3](https://github.com/Unidata/netcdf-java/blob/develop/LICENSE) ) mula sa [ Unidata ](https://www.unidata.ucar.edu/) .

Kasali sa Software NetCDF   Java .jar:

* slf4j
Ang NetCDF   Java Kailangan ang Aklatan at Cassandra [Silf4j mula sa Simpleng Liwasang Fada Para sa Java ](https://www.slf4j.org/) proyekto. Sa kasalukuyan, ERDDAP™ ay gumagamit ng slf4j-simpleng-xx.jar na muling pinangalanan bilang slf4j.jar upang matugunan ang pangangailangang ito. (lisensiya: [MIT/X](https://www.slf4j.org/license.html) ) .
     
* HDOM
Ang NetCDF   Java .jar kabilang ang XML processing code mula sa XML [HDOM](http://www.jdom.org/)   (lisensiya: [Apache](http://www.jdom.org/docs/faq.html#a0030) ) , na kasama sa netcdf All.jar.
     
* Joda
Ang NetCDF   Java .jar ay kinabibilangan ng [Joda](https://www.joda.org/joda-time/) para sa mga kalkulasyon sa kalendaryo (na malamang ay hindi ginagamit ng ERDDAP ) . (lisensiya: [Apache 2.0](https://www.joda.org/joda-time/licenses.html) ) .
     
* Apache
Ang NetCDF   Java .jar ay kinabibilangan ng mga talaksang .jar mula sa ilang mga files [Mga proyektong Apache](https://www.apache.org/) :
     [karaniwang-codec](https://commons.apache.org/proper/commons-codec/) ,
     [karaniwang-pagtuklas](https://commons.apache.org/discovery/) ,
     [Karaniwan- http kliyente](https://hc.apache.org/httpcomponents-client-ga/) ,
     [karaniwang-logging](https://commons.apache.org/proper/commons-logging/)   
     [Mga HtpComponent](https://hc.apache.org) ,
     (Para sa lahat: lisensiya: [Apache](https://www.apache.org/licenses/LICENSE-2.0) )   
Kasama ito sa netcdf All.jar.
     
* Iba Pa
Ang NetCDF   Java Ang .jar ay kinabibilangan din ng code mula sa: com.gogle.code.finderbugs, com.google.errogrone, com.google.guava, com.google.j2objc, com.google.protobuf, edu.ucar, og.codehaus.mojo, com.beust.j commander, com.ogle.comcommon, comcommon, le.comle, le, le, le, le, le, le, le, lejle, at lej2le, at lejlejle.de.de.de.comle, at lej2le. (Ang Google ay gumagamit ng Apache at BSD-tulad ng lisensiya.)   
         
## SGT{#sgt} 
Ang mga grap at mapa ay nalilikha sa-the-fly na may binagong bersyon ng NOAA ' s SGT ' (noonhttps://www.pmel.noaa.gov/epic/java/sgt/, ngayo'y huminto) bersyon 3 (a Java -based Scientific Graphics Toolkit na isinulat ni Donald Denbo sa [ NOAA PMEL](https://www.pmel.noaa.gov/) )   (lisensiya: may copyright na open source (noonhttps://www.pmel.noaa.gov/epic/java/license.html) ) .
     
## Walter Zorn{#walter-zorn} 
Malalaking dulo ng kasangkapang HTML ERDDAP Ang mga pahinang HTML ay nilikha na may wz\\_tooltip ni Walter Zorn. mga j. (lisensiya: LGPL) .
Ang mga slider at ang draft at drop tampok ng Slide Sander ay nilikha kasama ang wz\\_dragdrop ni Walter Zorn.js (lisensiya: LGPL) .
     
## openPDF{#openpdf} 
Ang mga talaksang .pdf ay nalilikha na may [openpdf](https://github.com/LibrePDF/OpenPDF) , libre Java -PDF aklatan.
     
## MGA GSHHS{#gshhs} 
Ang impormasyon mula sa baybayin at lawa ay mula sa [MGA GSHHS](https://www.ngdc.noaa.gov/mgg/shorelines/gshhs.html) -- Isang Global Self-consistent, Hierarchical, High-resolution Shoreline Database (lisensiya: [GPL](https://www.soest.hawaii.edu/pwessel/gshhs/README.TXT) ) at nilikha nina Paul Wessel at Walter Smith.

HINDI TAYO NAG - AABULOY TUNGKOL SA KARUNUNGAN NG MAHIRAP NA DATIM NA NAUMUMUMUHAY ERDDAP™ - HUWAG ITONG SAGUMPAYAN NG NAVIGATIONAL.
     
    
## GMT pscoast{#gmt-pscoast} 
Ang pulitikal na hangganan at mga impormasyon sa ilog ay mula sa [" biscoast "](https://www.soest.hawaii.edu/gmt/gmt/html/man/pscoast.html) programa sa [GMT](https://www.soest.hawaii.edu/gmt/) , na gumagamit ng datos mula sa [CIA World Data Bank II](https://www.evl.uic.edu/pape/data/WDB/)   (lisensiya: public domain) .

HINDI TAYO NAG - AABULOY TUNGKOL SA KARUNUNGAN NG POLITIKAL NA BOLUNDARY DATA NA NAUMUMUMUMUHAY ERDDAP .
    
## ETOPO{#etopo} 
Ang bathymetry/topograpiyang datos na ginagamit sa likuran ng ilang mga mapa ay ang [ETOPO1 Global 1-Minute Gridded Delection Data Set](https://www.ngdc.noaa.gov/mgg/global/global.html)   (Ice Surface, grid rehistrado, binaryo, 2 byte int: etopo1\\_ice\\_g\\_i2 .zip )   (lisensiya: [public domain](https://www.ngdc.noaa.gov/ngdcinfo/privacy.html#copyright) ) , na ipinamamahagi para sa libre ng [ NOAA NGDC](https://www.ngdc.noaa.gov) .

HINDI TAYO NAG - AABULOG TUNGKOL SA KARUNUNGAN NG BATHYMETRY/TOPOGRAPHY DATA na NAGMUMUMUMUMUMUHAY ERDDAP . HUWAG ITONG SAGUMPAYAN NG NAVIGATIONAL.
    
##  Java Sulat{#javamail} 
Ang mga email ay ipinadadala gamit ang code sa koreo. banga mula sa Oracle ' [ Java API](https://javaee.github.io/javamail/)   (lisensiya: [KARANIWANG PAGTANGGAP AT PISTRIYENTE (CDDL) Bersiyong 1.](https://javaee.github.io/javamail/LICENSE) ) .
     
## JON{#json} 
 ERDDAP™ gumamit [json.org's Java - Bababang aklatan ng JSON](https://www.json.org/index.html) i-parse [JON](https://www.json.org/) datos (lisensiya: [may karapatang bukas na source](https://www.json.org/license.html) ) .
     

## PostgrSQL{#postgrsql} 
 ERDDAP™ kasama ang [PostGres JDBC](https://mvnrepository.com/artifact/org.postgresql/postgresql) drayber (lisensiya: [BSD](https://www.postgresql.org/about/licence/) ) . Ang tsuper ay tama ang pagkakakopya (c) 1997-2010, PostgresQL Global Development Group. Ang lahat ng karapatan ay nakalaan.
     
## Lucene{#lucene} 
 ERDDAP™ gumamit ng code mula sa Apache [Lucene](https://lucene.apache.org/) . (lisensiya: [Apache](https://www.apache.org/licenses/LICENSE-2.0) ) para sa "lucene" search engine option (ngunit hindi para sa default "orihinal" na search engine) .
     
## karaniwang-compress{#commons-compress} 
 ERDDAP™ gumamit ng code mula sa Apache [karaniwang-compress](https://commons.apache.org/compress/) . (lisensiya: [Apache](https://www.apache.org/licenses/LICENSE-2.0) ) .
     
## HEXL{#jexl} 
 ERDDAP™ suporta sa pagsusuri ng mga ekspresyon at iskrip&lt; sourceName Depende sa&gt; [Ang proyektong Apache](https://www.apache.org/) : [ Java Ipinahayag na Wika (HEXL) ](https://commons.apache.org/proper/commons-jexl/)   (lisensiya: [Apache](https://www.apache.org/licenses/LICENSE-2.0) ) .
     
## Cassandra{#cassandra} 
 ERDDAP™ kasama ang Apache [Ang kay Cassandra](https://cassandra.apache.org/)   [cassandra-d ilog-core.jar.](https://mvnrepository.com/artifact/com.datastax.cassandra/cassandra-driver-core)   (lisensiya: [Apache 2.0](https://github.com/datastax/java-driver/blob/2.1/LICENSE) ) .
Ang cassandra's cassandra-driver-core.jar ay nangangailangan ng (at iba pa ERDDAP™ kasama ang) :
*    [guava.jar.](https://github.com/google/guava)   (lisensiya: [Apache 2.0](https://github.com/google/guava/blob/master/LICENSE) ) .
*    [lz4.jar.](https://repo1.maven.org/maven2/net/jpountz/lz4/lz4/)   (lisensiya: [Apache 2.0](https://github.com/jpountz/lz4-java/blob/master/LICENSE.txt) ) .
*    [metriko-core.jar.](https://mvnrepository.com/artifact/com.codahale.metrics/metrics-core/3.0.2)   (lisensiya: [MIT](https://github.com/codahale/metrics/blob/master/LICENSE) ) .
*    [nety-all.jar](https://netty.io/downloads.html)   (lisensiya: [Apache 2.0](https://netty.io/downloads.html) ) .
*    [Flappy-java.jar.](https://xerial.org/snappy-java/)   (lisensiya: [Apache 2.0](https://github.com/xerial/snappy-java/blob/develop/LICENSE) ) .
         
##  KT\\_ Mga Paleta{#kt_-palettes} 
Ang kulay paleta na may panlapi " KT\\_ " ay isang [koleksiyon ng mga .cpt Paleta ni Kristen Thyng](http://soliton.vm.bytemark.co.uk/pub/cpt-city/cmocean/index.html)   (lisensiya: [MIT/X](http://soliton.vm.bytemark.co.uk/pub/cpt-city/cmocean/copying.html) ) , subalit bahagyang reporma na sinamahan ni Jennifer Sevadjian ng NOAA upang sila'y umayon ERDDAP ' s mga kahilingan.
     
##  Leaflet  {#leaflet} 
 ERDDAP™ gamitin ang Java Aklatan ng Script [ Leaflet ](https://leafletjs.com/)   (lisensiya: [BSD 2](https://github.com/Leaflet/Leaflet/blob/main/LICENSE) ) bilang ang WMS kliyente WMS web pahina sa ERDDAP . Napakahusay nitong software (dinisenyo, madaling gamitin, mabilis, at malaya) mula kay Vladimir Agafonkin.
     
## MGA AW{#aws} 
Para sa paggawang kasama ng Amazon AWS (kasama ang S3) , ERDDAP™ gumagamit ng v2 ng [SDK NG WAS Java ](https://aws.amazon.com/sdk-for-java/)   (lisensiya: [Apache](https://www.apache.org/licenses/) ) .

Hinihiling ng AWS na hilahin ng Maven ang mga dependensiya. Kabilang dito ang mga sumusunod na talaksang .jar (Kung saan ang xxx ang numero ng bersyon, na nagbabago sa paglipas ng panahon, at ang uri ng lisensiya ay nasa mga panaklong) : annotations-xx.jar. (Apache) , apo-client-xxx.jar (Apache) , ams-xx.jar. (BSD) , asm-xx.jar (BSD) , asm-analysis-xx.jar. (BSD) , asm-commons-xxx.jar (BSD) , asm-tree-xxx.jar (BSD) , asm-util-xx.jar (BSD) , auth-xxx.jar. (?) , aws-core-xx.jar (Apache) , aws-query-protocol-xx.jar. (Apache) , aws-xml-protocol-xx.jarx. (Apache) , checker-qual-xxx.jar (MIT) , error\\_prone\\_annotations-xx.jarx (Apache) , episodestream-xxx.jar (Apache) , bigoccess-xxx.jar (Apache) , http core-xx.jar (Apache) , j2objc-annotations-xx.jar. (Apache) , jackson-annotations-xxx.jar (Apache) , jackson-core-xx.jar (Apache) , jackson-databind-xxx.jar (Apache) , jaxen-xx.jar. (BSD) , jffi-xx.jar (Apache) , jffi-xx.native. banga (Apache) , jnr-coments-xxx.jar. (Apache) , jnr-ffi-xx.jar (Apache) , jnr-poanim-xxx.jar (Apache) , jnr-x86asm-xxx.jar. (Apache) , json-xx.jar. (Tama ang pagkakakopya) , jsr305-xx.jar. (Apache) , pakingganfuture-xxx.jar (Apache) , mga isang dosenang nety . ng banga (Apache) , profiles-xxx.jar (Apache) , protocol-core-xx.jar (Apache) , reactive-streams-xxx.jar (CCO 1.0.) , mga rehiyon-xxx.jar (Apache) , s3-xx.jar. (Apache) , sdk-core-xx.jar (Apache) , utils-xxx.jar (?) . Upang makita ang aktuwal na lisensiya, hanapin ang .jar na pangalan sa . [Repositoryo ng Maven](https://mvnrepository.com/) at pagkatapos ay mag - research sa mga file ng proyekto para makita ang lisensiya.
    

Nagpapasalamat din kami sa lahat ng software at website na ginagamit namin kapag gumagawa ERDDAP , pati na
 [Krome](https://www.google.com/chrome/browser/desktop/) ,
 [ curl ](https://curl.haxx.se/) ,
 [DuckDuck Go](https://duckduckgo.com/?q=) ,
 [EditPlus](https://www.editplus.com/) ,
 [FileZilla](https://filezilla-project.org/) .
 [GitHub](https://github.com/) ,
 [Paghahanap ng Google](https://www.google.com/webhp) ,
 [KARAPATAN](https://www.chiark.greenend.org.uk/~sgtatham/putty/download.html) ,
 [umaapaw ang talaksan](https://stackoverflow.com/) ,
 [" todoist "](https://todoist.com/?lang=en) ,
 [ Wikipedia ](https://www.wikipedia.org/) ,
ang Internet, ang World Wide Web, at ang lahat ng iba pa, magaganda, nakatutulong na mga website.
Maraming salamat.
