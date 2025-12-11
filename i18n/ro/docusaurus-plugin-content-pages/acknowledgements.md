# Confirmări

Contribuabilul [credite](https://github.com/erddap/erddap/blob/main/CREDITS.md) pentru ERDDAP™ este acum pe o pagină separată. ERDDAP™ este un produs al [ NOAA ](https://www.noaa.gov "National Oceanic and Atmospheric Administration")   [ NMFS ](https://www.fisheries.noaa.gov "National Marine Fisheries Service")   [ SWFSC ](https://swfsc.noaa.gov "Southwest Fisheries Science Center")   [ ERD ](https://www.fisheries.noaa.gov/about/environmental-research-division-southwest-fisheries-science-center "Environmental Research Division") .

Bob Simons este autorul principal original al ERDDAP™   (designerul și dezvoltatorul software care a scris ERDDAP -cod specific) . Punctul de plecare a fost Roy Mendelssohn lui (Şeful lui Bob.) Sugestia că Bob rândul său, programul său Converttable (un mic utilitar care converteşte date tabulare dintr-un format în altul şi care era în mare parte cod din pre- NOAA munca pe care Bob re-licenced pentru a fi open source) într-un serviciu web.

A fost şi este ideile lui Roy Mendelssohn despre sistemele de date distribuite, sugestia sa iniţială către Bob şi sprijinul său continuu (inclusiv hardware, rețea, și alte suport software, și eliberând timpul lui Bob astfel încât el ar putea petrece mai mult timp pe ERDDAP™ cod) care a făcut posibilă şi a permis dezvoltarea acestui proiect.

ă ERDDAP -cod specific este licenţiat ca sursă deschisă cu drepturi de autor, cu [ NOAA ](https://www.noaa.gov) care deţine drepturile de autor. Vezi [ ERDDAP™ licență](/license) .
 ERDDAP™ folosește open source, Apache, LGPL, MIT/X, Mozilla și biblioteci și date din domeniul public.
 ERDDAP™ nu necesită niciun cod GPL sau programe comerciale.

Cea mai mare parte a finanțării pentru activitatea pe ERDDAP™ a venit de la NOAA , în care a plătit salariul lui Bob Simons. Pentru primul an de ERDDAP™ Când era contractor guvernamental, finanţarea venea de la [ NOAA CoastWatch](https://coastwatch.noaa.gov/) programul, [ NOAA IOOS](https://ioos.noaa.gov/) program, și acum defunct Pacific Ocean Perioada de urmărire (POST) Program.

Mult credit merge la multe ERDDAP™ administratori și utilizatori care au făcut sugestii și comentarii care au condus la multe îmbunătățiri în ERDDAP . Multe sunt menţionate pe nume în [Lista modificărilor](/changes) . Mulţumesc tuturor. (nume și nenume) Foarte mult. Astfel, ERDDAP™ este un mare exemplu de [Inovarea bazată pe utilizator](https://en.wikipedia.org/wiki/User_innovation) , unde inovarea produselor vine adesea de la consumatori ( ERDDAP™ utilizatori) , nu doar producătorii ( ERDDAP™ dezvoltatori) .

Iată lista de software și seturi de date care sunt în ERDDAP™ distribuţie. Suntem foarte recunoscători pentru toate acestea. Mulţumesc foarte mult.
 \\[ Începând cu 2021, a devenit aproape imposibil de listat în mod corespunzător toate sursele de cod pentru ERDDAP™ pentru că câteva dintre bibliotecile pe care le folosim (în special netcdf-java și în special AWS) La rândul său, folosiţi multe, multe alte biblioteci. Toate bibliotecile care ERDDAP™ apelurile de cod sunt incluse direct mai jos, la fel ca multe dintre bibliotecile pe care celelalte biblioteci le numesc la rândul lor. Dacă vedeți că am omis un proiect de mai jos, vă rugăm să ne anunțați astfel încât să putem adăuga proiectul de mai jos și să dea credit în cazul în care creditul este datorat. \\] 

## Prezentare generală{#overview} 
 ERDDAP™ este [ Java Servlet](https://www.oracle.com/technetwork/java/javaee/servlet/index.html) Program. La ERD , se execută în interiorul unei [Tomcat](https://tomcat.apache.org/) server aplicație (licență: [Apache](https://www.apache.org/licenses/) ) , cu [Apache](https://httpd.apache.org/) server web (licență: [Apache](https://www.apache.org/licenses/) ) , rulează pe un calculator folosind [Red Hat Linux](https://www.redhat.com/) sistem de operare (licență: [GPL](https://www.gnu.org/licenses/gpl-3.0.html) ) .
     
## Setări de date{#datasets} 
Seturile de date provin din diferite surse. A se vedea metadatele (în special " sourceUrl "," infoUrl "; "institution" , și "licență") pentru fiecare set de date. Multe seturi de date au o restricție privind utilizarea lor, care necesită să citați/creditați furnizorul de date ori de câte ori utilizați datele. Este întotdeauna o formă bună de a cita/credita furnizorul de date. Vezi? [Cum să citezi un set de date într-o lucrare](https://coastwatch.pfeg.noaa.gov/erddap/information.html#citeDataset) .
     
## CoHort Software{#cohort-software} 
 [Clasele de comunicare/cohortă](#cohort-software) sunt de la CoHort Software (https://www.cohortsoftware.com) care face aceste clase disponibile cu o licență MIT/X-like (a se vedea clasele/com/cohort/util/LICENSE.txt) .
     
## Navigator CoastWatch{#coastwatch-browser} 
 ERDDAP™ folosește codul din proiectul CoastWatch Browser (acum decomissioned) de la [ NOAA CoastWatch](https://coastwatch.noaa.gov)   [Nodul regional al coastei de vest](https://coastwatch.pfeg.noaa.gov/)   (licență: open source cu drepturi de autor) . Acest proiect a fost iniţiat şi gestionat de Dave Foley, fost coordonator al NOAA CoastWatch West Coast Regional Node. Tot codul browserului CoastWatch a fost scris de Bob Simons.
     
##  OPeNDAP  {#opendap} 
Date din [ OPeNDAP ](https://www.opendap.org) serverele sunt citite cu [ Java   DAP 1, 7](https://www.opendap.org/deprecated-software/java-dap)   (licență: LGPL) .
     
##  NetCDF - Java.{#netcdf-java} 
 NetCDF fișiere ( .nc ) , stil GMT NetCDF fișiere (.grd) , GRIB, și BUFR sunt citite și scrise cu codul în [ NetCDF   Java Bibliotecă](https://www.unidata.ucar.edu/software/netcdf-java/)   (licență: [BSD-3](https://github.com/Unidata/netcdf-java/blob/develop/LICENSE) ) din [ Unidata ](https://www.unidata.ucar.edu/) .

Software inclus în NetCDF   Java .jar:

* slf4j
ă NetCDF   Java Biblioteca şi Cassandra au nevoie [slf4j de la simplu Logging Facade pentru Java ](https://www.slf4j.org/) proiect. În prezent, ERDDAP™ folosește slf4j-simple-xx.jar redenumit slf4j.jar pentru a satisface această nevoie. (licență: [MIT/X](https://www.slf4j.org/license.html) ) .
     
* JDOM
ă NetCDF   Java .jar include codul de procesare XML din [JDOM](http://www.jdom.org/)   (licență: [Apache](http://www.jdom.org/docs/faq.html#a0030) ) , care este inclus în netcdfall.jar.
     
* Joda
ă NetCDF   Java .jar include [Joda](https://www.joda.org/joda-time/) pentru calculele calendarului (care probabil nu sunt utilizate de ERDDAP ) . (licență: [Apache 2. 0](https://www.joda.org/joda-time/licenses.html) ) .
     
* Apache
ă NetCDF   Java .jar include .jar fișiere de la mai multe [Proiecte Apache](https://www.apache.org/) :
     [Codul comun](https://commons.apache.org/proper/commons-codec/) ,
     [Descoperire comună](https://commons.apache.org/discovery/) ,
     [comune- http client](https://hc.apache.org/httpcomponents-client-ga/) ,
     [codare comună](https://commons.apache.org/proper/commons-logging/)   
     [Componenți Http](https://hc.apache.org) ,
     (Pentru toți: licență: [Apache](https://www.apache.org/licenses/LICENSE-2.0) )   
Acestea sunt incluse în netcdfAll.jar.
     
* Altele
ă NetCDF   Java .jar include, de asemenea, cod de la: com.google.code.findbugs, com.google.errorprone, com.google.guava, com.google.j2objc, com.google.protobuf, edu.ucar, org.codehaus.mojo, com.beust.jocom.com.google.common, com.google.re2j, and com.google.ter3party. (Google foloseşte licenţe Apache şi BSD.)   
         
## SGT{#sgt} 
Graficele și hărțile sunt create pe zbor cu o versiune modificată a NOAA 's SGT (a fost lahttps://www.pmel.noaa.gov/epic/java/sgt/, acum se întrerupe) Versiunea 3 (a Java -pe baza de grafica stiintifica Toolkit scris de Donald Denbo la [ NOAA PMEL](https://www.pmel.noaa.gov/) )   (licență: open source cu drepturi de autor (a fost lahttps://www.pmel.noaa.gov/epic/java/license.html) ) .
     
## Walter Zorn{#walter-zorn} 
Sfaturi mari, HTML pe ERDDAP Paginile HTML sunt create cu Walter Zorn wz\\_tooltip. js (licență: LGPL) .
Sliders și funcția de drag și picătură a Sorter Slide sunt create cu wz\\_dragdrop.js Walter Zorn (licență: LGPL) .
     
## OpenPDF{#openpdf} 
Fișierele .pdf sunt create cu [openpdf](https://github.com/LibrePDF/OpenPDF) , un liber Java - Biblioteca PDF.
     
## GSHHS{#gshhs} 
Datele despre ţărm şi lac sunt de la [GSHHS](https://www.ngdc.noaa.gov/mgg/shorelines/gshhs.html) - O bază de date globală auto-consistentă, ierarhică, de înaltă rezoluţie (licență: [GPL](https://www.soest.hawaii.edu/pwessel/gshhs/README.TXT) ) creat de Paul Wessel şi Walter Smith.

N-avem nicio pretenţie cu privire la corectitudinea datelor de pe shoreline. ERDDAP™ -- NU-L UTILIZAŢI PENTRU MĂRCI NAVIGAŢIONALE.
     
    
## GMT pscoast{#gmt-pscoast} 
Granița politică și datele fluviale sunt de la [pscoast](https://www.soest.hawaii.edu/gmt/gmt/html/man/pscoast.html) program în [GMT](https://www.soest.hawaii.edu/gmt/) , care utilizează date de la [CIA Banca Mondială de Date II](https://www.evl.uic.edu/pape/data/WDB/)   (licenta: domeniu public) .

Nu ne bazăm pe corectitudinea datelor politice care vin cu ERDDAP .
    
## ETOPO{#etopo} 
Datele Batimetrie / topografie utilizate în fundalul unor hărți este [ETOPO1 Set global de date privind creșterea cu 1 minut](https://www.ngdc.noaa.gov/mgg/global/global.html)   (Ice Surface, retea inregistrata, binar, 2 byte int: etopo1\\_ice\\_g\\_i2 .zip )   (licență: [domeniul public](https://www.ngdc.noaa.gov/ngdcinfo/privacy.html#copyright) ) , care este distribuit gratuit prin [ NOAA NGDC](https://www.ngdc.noaa.gov) .

Nu ne bazăm pe corectitudinea datelor BATHYMETRY/TOGRAFY care vin cu ERDDAP . NU-L UTILIZAŢI PENTRU PUNCT NAVIGAŢIONAL.
    
##  Java Mail{#javamail} 
E-mail-urile sunt trimise prin e-mail. borcan din Oracle 's [ Java Mail API](https://javaee.github.io/javamail/)   (licență: [LICENȚA COMUNĂ DE DEZVOLTARE ȘI DISTRIBUȚIE (CDDL) Versiunea 1.1](https://javaee.github.io/javamail/LICENSE) ) .
     
## JSON{#json} 
 ERDDAP™ utilizări [Json.org Java -Biblioteca JSON bazata](https://www.json.org/index.html) la parse [JSON](https://www.json.org/) date (licență: [open source cu drepturi de autor](https://www.json.org/license.html) ) .
     

## PostgrSQL{#postgrsql} 
 ERDDAP™ include [PostGres JDBC](https://mvnrepository.com/artifact/org.postgresql/postgresql) conducător auto (licență: [BSD](https://www.postgresql.org/about/licence/) ) . Şoferul are drepturi de autor. (c) 1997-2010, PostgreSQL Global Development Group. Toate drepturile rezervate.
     
## Lucene{#lucene} 
 ERDDAP™ utilizează codul Apache [Lucene](https://lucene.apache.org/) . (licență: [Apache](https://www.apache.org/licenses/LICENSE-2.0) ) pentru opțiunea motorului de căutare "lucenă" (dar nu pentru motorul de căutare "original" implicit) .
     
## commons-compress{#commons-compress} 
 ERDDAP™ utilizează codul Apache [commons-compress](https://commons.apache.org/compress/) . (licență: [Apache](https://www.apache.org/licenses/LICENSE-2.0) ) .
     
## JEXL{#jexl} 
 ERDDAP™ suport pentru evaluarea expresiilor si scripturilor in&lt; sourceName S &gt; se bazează pe [Proiectul Apache](https://www.apache.org/) : [ Java Limba expresiei (JEXL) ](https://commons.apache.org/proper/commons-jexl/)   (licență: [Apache](https://www.apache.org/licenses/LICENSE-2.0) ) .
     
## Cassandra.{#cassandra} 
 ERDDAP™ include Apache [Cassandra's](https://cassandra.apache.org/)   [Cassandra-driver-core.jar](https://mvnrepository.com/artifact/com.datastax.cassandra/cassandra-driver-core)   (licență: [Apache 2. 0](https://github.com/datastax/java-driver/blob/2.1/LICENSE) ) .
Cassandra cassandra-driver-core.jar cere (si asa ERDDAP™ include) :
*    [guava.jar](https://github.com/google/guava)   (licență: [Apache 2. 0](https://github.com/google/guava/blob/master/LICENSE) ) .
*    [lz4.jar](https://repo1.maven.org/maven2/net/jpountz/lz4/lz4/)   (licență: [Apache 2. 0](https://github.com/jpountz/lz4-java/blob/master/LICENSE.txt) ) .
*    [metrics-core.jar](https://mvnrepository.com/artifact/com.codahale.metrics/metrics-core/3.0.2)   (licență: [MIT](https://github.com/codahale/metrics/blob/master/LICENSE) ) .
*    [netty-all.jar](https://netty.io/downloads.html)   (licență: [Apache 2. 0](https://netty.io/downloads.html) ) .
*    [squipy-java.jar](https://xerial.org/snappy-java/)   (licență: [Apache 2. 0](https://github.com/xerial/snappy-java/blob/develop/LICENSE) ) .
         
##  KT\\_ Palete{#kt_-palettes} 
Paletele de culori care au prefixul " KT\\_ " sunt o [colectarea de .cpt palettes de Kristen Thyng](http://soliton.vm.bytemark.co.uk/pub/cpt-city/cmocean/index.html)   (licență: [MIT/X](http://soliton.vm.bytemark.co.uk/pub/cpt-city/cmocean/copying.html) ) , dar ușor reformat de Jennifer Sevadjian de NOAA astfel încât acestea să se conformeze ERDDAP Cerinţele .cpt.
     
##  Leaflet  {#leaflet} 
 ERDDAP™ utilizează Java Bibliotecă script [ Leaflet ](https://leafletjs.com/)   (licență: [BSD 2](https://github.com/Leaflet/Leaflet/blob/main/LICENSE) ) ca WMS client pe WMS pagini web în ERDDAP . Este un software excelent. (bine proiectat, ușor de utilizat, rapid, și gratuit) de la Vladimir Agafonkin.
     
## AWS{#aws} 
Pentru lucrul cu Amazon AWS (inclusiv S3) , ERDDAP™ utilizează v2 [AWS SDK pentru Java ](https://aws.amazon.com/sdk-for-java/)   (licență: [Apache](https://www.apache.org/licenses/) ) .

AWS cere Maven pentru a trage în dependențe. Acestea includ următoarele fișiere .jar (unde xxx este numărul versiunii, care se schimbă în timp, iar tipul de licență este în paranteze) : adnotări-xx.jar (Apache) , apache-client-xx.jar (Apache) , Ams-xx.jar (BSD) , asm-xx.jar (BSD) , asm-analysis-xx.jar (BSD) , asm-commons-xx.jar (BSD) , Asm-tree-xx.jar (BSD) , asm-util-xx.jar (BSD) , auth-xx.jar (?) , aws-core-xx.jar (Apache) , aws-query-protocol-xx.jar (Apache) , aws-xml-protocol-xx.jar (Apache) , checker-qual-xx.jar (MIT) , eroare\\_prona\\_annotations-xx.jar (Apache) , eventstream-xx.jar (Apache) , esecaccess-xx.jar (Apache) , http core-xx.jar (Apache) , j2objc-annotations-xx.jar (Apache) , Jackson-annotations-xx.jar (Apache) , jackson-core-xx.jar (Apache) , jackson-databind-xx.jar (Apache) , jaxen-xx.jar (BSD) , jffi-xx.jar (Apache) Jffi-xx.native. borcan (Apache) , jnr-constants-xx.jar (Apache) , jnr-ffi-xx.jar (Apache) , jnr-posex-xx.jar (Apache) , jnr-x86asm-xx.jar (Apache) , json-xx.jar (Copyright open source) , jsr305-xx.jar (Apache) , ascultablefuture-xx.jar (Apache) Cam o duzină. borcan (Apache) , profile-xx.jar (Apache) , protocol-core-xx.jar (Apache) , reactiv-streams-xx.jar (CCO 1, 0) , regiuni-xx.jar (Apache) , s3-xx.jar (Apache) , sdk-core-xx.jar (Apache) , utils-xx.jar (?) . Pentru a vedea licențele reale, căutați numele .jar în [Depozitul Maven](https://mvnrepository.com/) Și apoi scotocesc în jurul în fișierele proiectului pentru a găsi licența.
    

Suntem, de asemenea, foarte recunoscători pentru toate software-ul și site-urile pe care le folosim atunci când dezvoltăm ERDDAP , inclusiv
 [Chrome](https://www.google.com/chrome/browser/desktop/) ,
 [ curl ](https://curl.haxx.se/) ,
 [DuckDuckGo](https://duckduckgo.com/?q=) ,
 [Editează plus](https://www.editplus.com/) ,
 [FileZilla](https://filezilla-project.org/) .
 [GitHub](https://github.com/) ,
 [Caută Google](https://www.google.com/webhp) ,
 [PuTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/download.html) ,
 [supraîncărcare stivă](https://stackoverflow.com/) ,
 [todoist](https://todoist.com/?lang=en) ,
 [ Wikipedia ](https://www.wikipedia.org/) ,
Internet, World Wide Web, și toate celelalte, mare, site-uri de ajutor.
Mulţumesc foarte mult.
