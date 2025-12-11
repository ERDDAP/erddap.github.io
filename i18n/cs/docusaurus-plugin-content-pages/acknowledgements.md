# Poděkování

Přispívá [Úvěry](https://github.com/erddap/erddap/blob/main/CREDITS.md) místo ERDDAP™ je nyní na samostatné stránce. ERDDAP™ je produktem [ NOAA ](https://www.noaa.gov "National Oceanic and Atmospheric Administration")   [ NMFS ](https://www.fisheries.noaa.gov "National Marine Fisheries Service")   [ SWFSC ](https://swfsc.noaa.gov "Southwest Fisheries Science Center")   [ ERD ](https://www.fisheries.noaa.gov/about/environmental-research-division-southwest-fisheries-science-center "Environmental Research Division") .

Bob Simons je původní hlavní autor ERDDAP™   (návrhář a vývojář softwaru, který napsal ERDDAP - specifický kód) . Výchozím bodem byl Roy Mendelssohnův (Bobův šéf.) návrh, aby Bob otočit svůj program ConvertTable (malý nástroj, který převádí tabulková data z jednoho formátu do druhého a který byl převážně kód z Bobova pre- NOAA práce, že Bob re-licenceed být open source) do webové služby.

Byl a je Roy Mendelssohn nápady o distribuovaných datových systémů, jeho původní návrh Bob, a jeho pokračující podporu (včetně hardwaru, sítě a další podpory softwaru, a uvolněním Bobův čas, aby mohl strávit více času na ERDDAP™ kód) který umožnil tento projekt a umožnil jeho růst.

The ERDDAP - specifický kód je licencován jako autorský open source, s [ NOAA ](https://www.noaa.gov) drží autorská práva. Viz [ ERDDAP™ licence](/license) .
 ERDDAP™ používá autorizovaný open source, Apache, LGPL, MIT/X, Mozilla, veřejné doménové knihovny a data.
 ERDDAP™ nevyžaduje žádný GPL kód nebo komerční programy.

Většina financování práce na ERDDAP™ Pochází z NOAA , že zaplatil Bob Simons plat. První rok ERDDAP™ Když byl vládním dodavatelem, finanční prostředky pocházejí z [ NOAA CoastWatch](https://coastwatch.noaa.gov/) program, [ NOAA IOOS](https://ioos.noaa.gov/) program, a nyní zaniklý Tichý oceán Shelf Tracking (POST) Program.

Mnoho kreditů patří mnoha ERDDAP™ Správci a uživatelé, kteří předložili návrhy a připomínky, které vedly k mnoha zlepšením ERDDAP . Mnoho z nich je uvedeno jménem v [Seznam změn](/changes) . Děkuji vám všem. (pojmenovaný a nepojmenovaný) Velmi. Takže, ERDDAP™ je skvělý příklad [Uživatelská inovace](https://en.wikipedia.org/wiki/User_innovation) , kde inovace produktů často pocházejí od spotřebitelů ( ERDDAP™ uživatelé) , nejen výrobci ( ERDDAP™ Vývojáři) .

Zde je seznam softwaru a souborů, které jsou v ERDDAP™ distribuce. Za to všechno jsme velmi vděční. Děkuji mnohokrát.
 \\[ Od roku 2021 je téměř nemožné správně uvést všechny zdroje kódu ERDDAP™ protože několik knihoven používáme (zejména netcdf-java a zejména AWS) zase používat mnoho, mnoho dalších knihoven. Všechny knihovny ERDDAP™ kódy hovory přímo jsou zahrnuty níže, stejně jako mnoho z knihoven, které ostatní knihovny volají v pořadí. Pokud vidíte, že jsme vynechali projekt níže, dejte nám prosím vědět, abychom mohli přidat projekt níže a připsat úvěr tam, kde má být úvěr. \\] 

## Přehled{#overview} 
 ERDDAP™ je [ Java Servit](https://www.oracle.com/technetwork/java/javaee/servlet/index.html) Program. V ERD , běží uvnitř [Tomcat](https://tomcat.apache.org/) aplikační server (licence: [Apač](https://www.apache.org/licenses/) ) , s [Apač](https://httpd.apache.org/) webový server (licence: [Apač](https://www.apache.org/licenses/) ) , běží na počítači pomocí [Red Hat Linux](https://www.redhat.com/) operační systém (licence: [GPL](https://www.gnu.org/licenses/gpl-3.0.html) ) .
     
## Datové soubory{#datasets} 
Soubory dat jsou z různých zdrojů. Viz metadata (zejména " sourceUrl "," infoUrl " "institution" , a "licence") pro každý datový soubor. Mnoho souborů údajů má omezení jejich použití, které vyžaduje, abyste upozorňovali/zaúčtovali poskytovatele údajů, kdykoli údaje používáte. Vždy je dobrá forma citovat/úvěr poskytovatele dat. Viz [Jak citovat soubor dat v knize](https://coastwatch.pfeg.noaa.gov/erddap/information.html#citeDataset) .
     
## CoHort Software{#cohort-software} 
 [Třída komunikace/kohort](#cohort-software) jsou z CoHort Software (https://www.cohortsoftware.com) která tyto třídy zpřístupní s licencí typu MIT/X (viz třídy/com/cohort/util/LICENSE.txt) .
     
## Prohlížeč pobřežní hlídky{#coastwatch-browser} 
 ERDDAP™ používá kód z projektu CoastWatch Browser (nyní decomissioned) z [ NOAA CoastWatch](https://coastwatch.noaa.gov)   [Regionální uzel západního pobřeží](https://coastwatch.pfeg.noaa.gov/)   (licence: autorizovaný open source) . Projekt byl zahájen a řízen Davem Foleym, bývalým koordinátorem NOAA CoastWatch West Coast Regional Node. Celý kód prohlížeče CoastWatch napsal Bob Simons.
     
##  OPeNDAP  {#opendap} 
Údaje od [ OPeNDAP ](https://www.opendap.org) servery jsou čteny s [ Java   DAP 1, 7](https://www.opendap.org/deprecated-software/java-dap)   (licence: LGPL) .
     
##  NetCDF - Java{#netcdf-java} 
 NetCDF soubory ( .nc ) , GMT- styl NetCDF soubory (.grd) , GRIB a BUFR jsou čteny a psány s kódem v [ NetCDF   Java Knihovna](https://www.unidata.ucar.edu/software/netcdf-java/)   (licence: [BSD-3](https://github.com/Unidata/netcdf-java/blob/develop/LICENSE) ) od [ Unidata ](https://www.unidata.ucar.edu/) .

Software Zahrnuto v NetCDF   Java .jar:

* slf4j
The NetCDF   Java Knihovna a Cassandra potřebují [slf4j z jednoduché logovací fasády pro Java ](https://www.slf4j.org/) projekt. V současné době, ERDDAP™ používá slf4j-simple-xxx.jar přejmenován jako slf4j.jar k uspokojení této potřeby. (licence: [MIT/X](https://www.slf4j.org/license.html) ) .
     
* JDOM
The NetCDF   Java .jar obsahuje XML kód zpracování od [JDOM](http://www.jdom.org/)   (licence: [Apač](http://www.jdom.org/docs/faq.html#a0030) ) , která je zahrnuta v netcdfAll.jar.
     
* Joda
The NetCDF   Java .jar zahrnuje [Joda](https://www.joda.org/joda-time/) pro kalendářní výpočty (které pravděpodobně nepoužívají ERDDAP ) . (licence: [Apache 2. 0](https://www.joda.org/joda-time/licenses.html) ) .
     
* Apač
The NetCDF   Java .jar obsahuje .jar soubory z několika [Projekty Apache](https://www.apache.org/) :
     [kodec obecný](https://commons.apache.org/proper/commons-codec/) ,
     [Objevování společné situace](https://commons.apache.org/discovery/) ,
     [Obyčejné... http klient](https://hc.apache.org/httpcomponents-client-ga/) ,
     [Logování běžných záznamů](https://commons.apache.org/proper/commons-logging/)   
     [HttpComponents](https://hc.apache.org) ,
     (Pro všechny: licence: [Apač](https://www.apache.org/licenses/LICENSE-2.0) )   
Ty jsou zahrnuty v netcdfAll.jar.
     
* Ostatní
The NetCDF   Java .jar také obsahuje kód z: com.google.code.findbugs, com.google.errorprone, com.google.guava, com.google.j2objc, com.google.protobuf, edu.ucar, org.codehaus.mojo, com.beust.jcommander, com.google.common, com.google.re2j, a com.google.thirdparty. (Google používá licence typu Apache a BSD.)   
         
## SGT{#sgt} 
Grafy a mapy jsou vytvořeny on-the-fly s upravenou verzí NOAA 's SGT (vhttps://www.pmel.noaa.gov/epic/java/sgt/, nyní přerušen) verze 3 (a Java -založené vědecké grafiky Toolkit napsal Donald Denbo na [ NOAA PMEL](https://www.pmel.noaa.gov/) )   (licence: autorizovaný open source (vhttps://www.pmel.noaa.gov/epic/java/license.html) ) .
     
## Walter Zorn{#walter-zorn} 
Velké HTML tipy ERDDAP 's HTML stránky jsou vytvořeny pomocí wz\\_tooltip Waltera Zorna. js (licence: LGPL) .
Slidery a drag and drop funkce Slide Sorter jsou vytvořeny s Walter Zorn wz\\_dragdrop.js (licence: LGPL) .
     
## openPDF{#openpdf} 
Soubory .pdf jsou vytvořeny s [openpdf](https://github.com/LibrePDF/OpenPDF) , volný Java - Knihovna PDF.
     
## GSHHS{#gshhs} 
Údaje o pobřeží a jezeře jsou z [GSHHS](https://www.ngdc.noaa.gov/mgg/shorelines/gshhs.html) -- Global Self-consistent, Hierarchical, High-solution Shoreline Database (licence: [GPL](https://www.soest.hawaii.edu/pwessel/gshhs/README.TXT) ) a vytvořil Paul Wessel a Walter Smith.

Netvrdíme o správnosti údajů, které přicházejí ERDDAP™ -- Nepoužívejte ji k navigačním účelům.
     
    
## GMT pscoast{#gmt-pscoast} 
Politické hranice a říční údaje jsou z [pscoast](https://www.soest.hawaii.edu/gmt/gmt/html/man/pscoast.html) program v [GMT](https://www.soest.hawaii.edu/gmt/) , který používá údaje z [CIA Světová Data Bank II](https://www.evl.uic.edu/pape/data/WDB/)   (licence: veřejná doména) .

Netvrdíme, že je správná politická nadace, která obsahuje ERDDAP .
    
## ETOPO{#etopo} 
Údaje o batymetrii/topografii použité v pozadí některých map je [ETOPO1 Global 1-Minute Gridd](https://www.ngdc.noaa.gov/mgg/global/global.html)   (Povrch ledu, registrovaná mřížka, binární, 2 byte int: etopo1\\_ice\\_g\\_i2 .zip )   (licence: [veřejná doména](https://www.ngdc.noaa.gov/ngdcinfo/privacy.html#copyright) ) , který je distribuován zdarma [ NOAA NGDC](https://www.ngdc.noaa.gov) .

Netvrdíme o správnosti údajů o BATHYMETRY/TOPOGRAFIE, které přicházejí ERDDAP . Nepoužívejte ji pro NAVIGAČNÍ ÚČELY.
    
##  Java Pošta{#javamail} 
Emaily se posílají poštou. sklenice z Oracle 's [ Java API pošty](https://javaee.github.io/javamail/)   (licence: [SPOLEČNÝ ROZVOJ A DISTRIBUČNÍ LICENCE (CDDL) Verze 1.1](https://javaee.github.io/javamail/LICENSE) ) .
     
## JSON{#json} 
 ERDDAP™ použití [Json.org Java -založená knihovna JSON](https://www.json.org/index.html) k analýze [JSON](https://www.json.org/) údaje (licence: [autorizovaný open source](https://www.json.org/license.html) ) .
     

## PostgrSQL{#postgrsql} 
 ERDDAP™ zahrnuje: [PostGres JDBC](https://mvnrepository.com/artifact/org.postgresql/postgresql) řidič (licence: [BSD](https://www.postgresql.org/about/licence/) ) . Řidič je Copyright (c) 1997-2010, PostgreSQL Global Development Group. Všechna práva vyhrazena.
     
## Lucene{#lucene} 
 ERDDAP™ použít kód od Apache [Lucene](https://lucene.apache.org/) . (licence: [Apač](https://www.apache.org/licenses/LICENSE-2.0) ) pro volbu "lucene" vyhledávače (ale ne pro výchozí "originální" vyhledávač) .
     
## commons-compress{#commons-compress} 
 ERDDAP™ použít kód od Apache [commons-compress](https://commons.apache.org/compress/) . (licence: [Apač](https://www.apache.org/licenses/LICENSE-2.0) ) .
     
## JEXL{#jexl} 
 ERDDAP™ podpora hodnocení výrazů a skriptů v&lt; sourceName s&gt; spoléhá na [Projekt Apache](https://www.apache.org/) : [ Java Jazyk výrazu (JEXL) ](https://commons.apache.org/proper/commons-jexl/)   (licence: [Apač](https://www.apache.org/licenses/LICENSE-2.0) ) .
     
## Cassandra{#cassandra} 
 ERDDAP™ zahrnuje Apač [Cassandra's](https://cassandra.apache.org/)   [cassandra-driver-core.jar](https://mvnrepository.com/artifact/com.datastax.cassandra/cassandra-driver-core)   (licence: [Apache 2. 0](https://github.com/datastax/java-driver/blob/2.1/LICENSE) ) .
Cassandra je Cassandra-driver-core.jar vyžaduje (a tak ERDDAP™ zahrnuje) :
*    [guava.jar](https://github.com/google/guava)   (licence: [Apache 2. 0](https://github.com/google/guava/blob/master/LICENSE) ) .
*    [Iz4.jar](https://repo1.maven.org/maven2/net/jpountz/lz4/lz4/)   (licence: [Apache 2. 0](https://github.com/jpountz/lz4-java/blob/master/LICENSE.txt) ) .
*    [metrika-jar](https://mvnrepository.com/artifact/com.codahale.metrics/metrics-core/3.0.2)   (licence: [MIT](https://github.com/codahale/metrics/blob/master/LICENSE) ) .
*    [Netty-all.jar](https://netty.io/downloads.html)   (licence: [Apache 2. 0](https://netty.io/downloads.html) ) .
*    [Snappy-java.jar](https://xerial.org/snappy-java/)   (licence: [Apache 2. 0](https://github.com/xerial/snappy-java/blob/develop/LICENSE) ) .
         
##  KT\\_ palety{#kt_-palettes} 
Barevné palety, které mají předponu " KT\\_ "jsou [kolekce palet .cpt od Kristen Thyng](http://soliton.vm.bytemark.co.uk/pub/cpt-city/cmocean/index.html)   (licence: [MIT/X](http://soliton.vm.bytemark.co.uk/pub/cpt-city/cmocean/copying.html) ) , ale mírně přeformátována Jennifer Sevadjian z NOAA aby se přizpůsobili ERDDAP 's .cpt požadavky.
     
##  Leaflet  {#leaflet} 
 ERDDAP™ používá Java Knihovna skriptů [ Leaflet ](https://leafletjs.com/)   (licence: [BSD 2](https://github.com/Leaflet/Leaflet/blob/main/LICENSE) ) jako WMS klient na WMS webové stránky v ERDDAP . Je to vynikající software (dobře navržen, snadné použití, rychle a zdarma) od Vladimira Agafonkina.
     
## AWS{#aws} 
Pro práci s Amazon AWS (včetně S3) , ERDDAP™ použití v2 [AWS SDK pro Java ](https://aws.amazon.com/sdk-for-java/)   (licence: [Apač](https://www.apache.org/licenses/) ) .

AWS vyžaduje, aby Maven vytáhla závislost. Obsahují následující .jar soubory (kde xxx je číslo verze, které se časem mění a typ licence je v závorce) : anotace-xxx.jar (Apač) , apache-klient-xxx.jar (Apač) , ams-xxx.jar (BSD) , Asm-xxx.jar (BSD) , Asm-analysis-xxx.jar (BSD) , Asm-commons-xxx.jar (BSD) , Asm-tree-xxx.jar (BSD) , Asm-util-xxx.jar (BSD) , auth-xxx.jar (?) , aws-core-xxx.jar (Apač) , aws-query-protocol-xxx.jar (Apač) , aws-xml-protocol-xxx.jar (Apač) , checker-qual-xxx.jar (MIT) , chyba\\_prone\\_anotace-xxx.jar (Apač) , eventstream-xxx.jar (Apač) , failaccess-xxx.jar (Apač) , http core-xxx.jar (Apač) , j2objc-anotace-xxx.jar (Apač) , Jackson-anotace-xxx.jar (Apač) , Jackson-core-xxx.jar (Apač) , jackson-databind-xxx.jar (Apač) , jaxen-xxx.jar (BSD) , jffi-xxx.jar (Apač) , jffi-xxx.native. sklenice (Apač) , jnr-constants-xxx.jar (Apač) , jnr-fi-xxx.jar (Apač) , jnr-posix-xxx.jar (Apač) , jnr-x86asm-xxx.jar (Apač) , json-xxx.jar (Autorizovaný otevřený zdroj) , jsr305-xxx.jar (Apač) , poslechnutelná budoucnost-xxx.jar (Apač) , asi tucet netty . sklenice (Apač) , profily-xxx.jar (Apač) , protokol-core-xxx.jar (Apač) , reaktivní proudy-xxx.jar (CCO 1. 0) , regions-xxx.jar (Apač) , s3-xxx.jar (Apač) , sdk-core-xxx.jar (Apač) , utils-xxx.jar (?) . Chcete-li vidět skutečné licence, hledat . jar jméno v [Úložiště Maven](https://mvnrepository.com/) a pak se poflakovat v souborech projektu najít licenci.
    

Jsme také velmi vděčni za veškerý software a webové stránky, které používáme při vývoji ERDDAP , včetně
 [Chrom](https://www.google.com/chrome/browser/desktop/) ,
 [ curl ](https://curl.haxx.se/) ,
 [Duck DuckGo](https://duckduckgo.com/?q=) ,
 [EditPlus](https://www.editplus.com/) ,
 [FileZilla](https://filezilla-project.org/) .
 [GitHub](https://github.com/) ,
 [Google vyhledávání](https://www.google.com/webhp) ,
 [PUTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/download.html) ,
 [Nadbytek](https://stackoverflow.com/) ,
 [todoist](https://todoist.com/?lang=en) ,
 [ Wikipedia ](https://www.wikipedia.org/) ,
Internet, World Wide Web, a všechny ostatní, skvělé, užitečné webové stránky.
Děkuji mnohokrát.
