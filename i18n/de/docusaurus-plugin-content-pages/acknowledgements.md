# Anerkennung

Der Beitrag [Kredite](https://github.com/erddap/erddap/blob/main/CREDITS.md) für ERDDAP™ ist jetzt auf einer separaten Seite. ERDDAP™ ist ein Produkt der [ NOAA ](https://www.noaa.gov "National Oceanic and Atmospheric Administration")   [ NMFS ](https://www.fisheries.noaa.gov "National Marine Fisheries Service")   [ SWFSC ](https://swfsc.noaa.gov "Southwest Fisheries Science Center")   [ ERD ](https://www.fisheries.noaa.gov/about/environmental-research-division-southwest-fisheries-science-center "Environmental Research Division") .

Bob Simons ist der ursprüngliche Hauptautor ERDDAP™   (der Designer und Software-Entwickler, die schrieb, ERDDAP -spezifischer Code) . Der Ausgangspunkt war Roy Mendelssohn's (Bobs Chef) Vorschlag, dass Bob sein ConvertTable Programm drehen (ein kleines Dienstprogramm, das tabellarische Daten von einem Format in ein anderes umwandelt und das weitgehend von Bobs Vor- NOAA Arbeit, die Bob wieder lizenziert zu sein Open Source) in einen Webservice.

Es war und ist Roy Mendelssohns Ideen über verteilte Datensysteme, seinen ursprünglichen Vorschlag an Bob und seine laufende Unterstützung (einschließlich Hardware, Netzwerk und andere Software-Unterstützung, und indem er Bobs Zeit freigibt, so dass er mehr Zeit für die ERDDAP™ Code) Das hat dieses Projekt ermöglicht und sein Wachstum ermöglicht.

Die ERDDAP -spezifischer Code wird als urheberrechtlich geschützte Open Source lizenziert, mit [ NOAA ](https://www.noaa.gov) das Urheberrecht behalten. Siehe [ ERDDAP™ Lizenz](/license) .
 ERDDAP™ verwendet urheberrechtlich geschützte Open Source, Apache, LGPL, MIT/X, Mozilla und Public Domain-Bibliotheken und Daten.
 ERDDAP™ erfordert keinen GPL-Code oder kommerzielle Programme.

Der Großteil der Mittel für die Arbeit an ERDDAP™ kommt aus NOAA , indem es Bob Simons Gehalt bezahlt. Für das erste Jahr ERDDAP™ , als er ein Regierungsunternehmer war, kam die Finanzierung von [ NOAA Küstenwache](https://coastwatch.noaa.gov/) Programm, die [ NOAA IOOS](https://ioos.noaa.gov/) Programm und das jetzt defunct Pacific Ocean Shelf Tracking (POST) Programm.

Viel Kredit geht zu den vielen ERDDAP™ Administratoren und Benutzer, die Vorschläge und Kommentare gemacht haben, die zu vielen Verbesserungen in ERDDAP . Viele werden im Namen der [Liste der Änderungen](/changes) . Vielen Dank&#33; (benannt und nicht benannt) sehr viel. So ERDDAP™ ist ein großes Beispiel [Benutzergetriebene Innovation](https://en.wikipedia.org/wiki/User_innovation) , wo Produktinnovation oft von den Verbrauchern kommt ( ERDDAP™ Benutzer) , nicht nur die Erzeuger ( ERDDAP™ Entwickler) .

Hier ist die Liste der Software und Datensätze, die in der ERDDAP™ Verteilung. Wir sind sehr dankbar für all diese. Vielen Dank.
 \\[ Ab 2021 ist es fast unmöglich geworden, alle Quellen des Codes für richtig aufzulisten ERDDAP™ weil einige der Bibliotheken, die wir verwenden (insbesondere netcdf-java und insbesondere AWS) wiederum viele, viele andere Bibliotheken verwenden. Alle Bibliotheken, die ERDDAP™ Code-Anrufe sind im Folgenden enthalten, wie viele der Bibliotheken, die die anderen Bibliotheken wiederum anrufen. Wenn Sie sehen, dass wir ein Projekt unten weggelassen haben, teilen Sie uns bitte mit, damit wir das Projekt unten hinzufügen können und Kredit geben, wo Kredit fällig ist. \\] 

## Überblick{#overview} 
 ERDDAP™ ein [ Java Servlet](https://www.oracle.com/technetwork/java/javaee/servlet/index.html) Programm. Im ERD , es läuft in einem [Tomcat](https://tomcat.apache.org/) Anwendungsserver (Lizenz: [Apache](https://www.apache.org/licenses/) ) , mit [Apache](https://httpd.apache.org/) Webserver (Lizenz: [Apache](https://www.apache.org/licenses/) ) , auf einem Computer mit [Red Hat Linux](https://www.redhat.com/) Betriebssystem (Lizenz: [GPL](https://www.gnu.org/licenses/gpl-3.0.html) ) .
     
## Datensätze{#datasets} 
Die Datensätze stammen aus verschiedenen Quellen. Siehe Metadaten (insbesondere die " sourceUrl ", " infoUrl ", "institution" , und "Lizenz") für jeden Datensatz. Viele Datensätze haben eine Einschränkung auf ihre Verwendung, die Sie benötigen, um den Datenanbieter zu zitieren/zu akkreditieren, wenn Sie die Daten verwenden. Es ist immer eine gute Form, den Datenanbieter anzuführen/zu akkreditieren. Vgl. [Wie man einen Datensatz in einem Papier ausführt](https://coastwatch.pfeg.noaa.gov/erddap/information.html#citeDataset) .
     
## CoHort Software{#cohort-software} 
 [Die Com/Kohore-Klassen](#cohort-software) sind von CoHort Software (https://www.cohortsoftware.com) die diese Klassen mit einer MIT/X-ähnlichen Lizenz zur Verfügung stellt (siehe Klassen/com/cohort/util/LICENSE.txt) .
     
## CoastWatch Browser{#coastwatch-browser} 
 ERDDAP™ verwendet Code des CoastWatch Browser-Projekts (jetzt stillgelegt) von [ NOAA Küstenwache](https://coastwatch.noaa.gov)   [Westküste Regional Node](https://coastwatch.pfeg.noaa.gov/)   (Lizenz: urheberrechtlich geschützte Open Source) . Das Projekt wurde von Dave Foley, einem ehemaligen Koordinator der NOAA CoastWatch West Coast Regional Node. Der gesamte CoastWatch Browser Code wurde von Bob Simons geschrieben.
     
##  OPeNDAP  {#opendap} 
Daten aus [ OPeNDAP ](https://www.opendap.org) Server werden mit [ Java   DAP 1.1.7](https://www.opendap.org/deprecated-software/java-dap)   (Lizenz: LGPL) .
     
##  NetCDF - Java{#netcdf-java} 
 NetCDF Dateien ( .nc ) , GMT-Stil NetCDF Dateien (.grd) , GRIB und BUFR werden mit Code in der [ NetCDF   Java Bibliothek](https://www.unidata.ucar.edu/software/netcdf-java/)   (Lizenz: [BSD-3](https://github.com/Unidata/netcdf-java/blob/develop/LICENSE) ) von [ Unidata ](https://www.unidata.ucar.edu/) .

Software In der NetCDF   Java .jar:

* Slf4j
Die NetCDF   Java Bibliothek und Cassandra brauchen [slf4j aus der einfachen Logging Facade für Java ](https://www.slf4j.org/) Projekt. Derzeit, ERDDAP™ verwendet den slf4j-simple-xxx.jar umbenannt als slf4j.jar, um diese Notwendigkeit zu erfüllen. (Lizenz: [MITTEL/X](https://www.slf4j.org/license.html) ) .
     
* JDOM
Die NetCDF   Java .jar enthält XML-Verarbeitungscode von [JDOM](http://www.jdom.org/)   (Lizenz: [Apache](http://www.jdom.org/docs/faq.html#a0030) ) , die im netcdfAll.jar enthalten ist.
     
* Joda
Die NetCDF   Java .jar umfasst [Joda](https://www.joda.org/joda-time/) für Kalenderberechnungen (die wahrscheinlich nicht von ERDDAP ) . (Lizenz: [Apache 2.0](https://www.joda.org/joda-time/licenses.html) ) .
     
* Apache
Die NetCDF   Java .jar enthält .jar Dateien von mehreren [Apache Projekte](https://www.apache.org/) :
     [Commons-Codec](https://commons.apache.org/proper/commons-codec/) ,
     [gemeinschafts-entdeckung](https://commons.apache.org/discovery/) ,
     [gemeinschaften- http Kunden](https://hc.apache.org/httpcomponents-client-ga/) ,
     [Einloggen](https://commons.apache.org/proper/commons-logging/)   
     [HttpKomponenten](https://hc.apache.org) ,
     (Für alle: Lizenz: [Apache](https://www.apache.org/licenses/LICENSE-2.0) )   
Diese sind im netcdfAll.jar enthalten.
     
* Sonstige
Die NetCDF   Java .jar enthält auch Code von: com.google.code.findbugs, com.google.errorprone, com.google.guava, com.google.j2objc, com.google.protobuf, edu.ucar, org.codehaus.mojo, com.beust.jcommander, com.google.common. (Google verwendet Apache und BSD-ähnliche Lizenzen.)   
         
## SGT{#sgt} 
Die Grafiken und Karten werden auf dem Flug mit einer modifizierten Version von NOAA SGT (wart aufhttps://www.pmel.noaa.gov/epic/java/sgt/, jetzt eingestellt) Version 3 (eine Java -based Scientific Graphics Toolkit geschrieben von Donald Denbo at [ NOAA TEIL](https://www.pmel.noaa.gov/) )   (Lizenz: urheberrechtlich geschützte Open Source (wart aufhttps://www.pmel.noaa.gov/epic/java/license.html) ) .
     
## Walter Zorn{#walter-zorn} 
Große, HTML-Tooltips auf ERDDAP 's HTML-Seiten werden mit Walter Zorn's wz\\_tooltip erstellt. j) (Lizenz: LGPL) .
Sliders und die Drag &amp; Drop Funktion des Slide Sorters werden mit Walter Zorn's wz\\_dragdrop.js erstellt (Lizenz: LGPL) .
     
## PDF öffnen{#openpdf} 
Die .pdf-Dateien werden mit [pdf](https://github.com/LibrePDF/OpenPDF) , frei Java -PDF Bibliothek.
     
## GSH{#gshhs} 
Die Küsten- und Seedaten stammen aus [GSH](https://www.ngdc.noaa.gov/mgg/shorelines/gshhs.html) -- Eine globale selbstkonsistente, hierarchische, hochauflösende Shoreline-Datenbank (Lizenz: [GPL](https://www.soest.hawaii.edu/pwessel/gshhs/README.TXT) ) und erstellt von Paul Wessel und Walter Smith.

Wir haben kein CLAIM über den KORREKT der SHORELINE-DATA gemacht, das mit ERDDAP™ -- NICHT VERWENDUNGSBEDINGUNGEN
     
    
## GMT pscoast{#gmt-pscoast} 
Die politische Grenze und die Flussdaten stammen aus [pscoast](https://www.soest.hawaii.edu/gmt/gmt/html/man/pscoast.html) Programm in [GMT](https://www.soest.hawaii.edu/gmt/) , die Daten aus der [CIA Weltdatenbank II](https://www.evl.uic.edu/pape/data/WDB/)   (Lizenz: Public Domain) .

Wir haben kein CLAIM über den KORREKT der POLITIKBEREICH DATEN, die mit ERDDAP .
    
## ETOPO{#etopo} 
Die im Hintergrund einiger Karten verwendeten Daten zur Badymetrie/Topographie sind die [ETOPO1 Global 1-Minute Gridded Eleved Datensatz](https://www.ngdc.noaa.gov/mgg/global/global.html)   (Eisoberfläche, Gitter registriert, binär, 2 Byte-Int: etopo1\\_ice\\_g\\_i2 .zip )   (Lizenz: [öffentliche Domain](https://www.ngdc.noaa.gov/ngdcinfo/privacy.html#copyright) ) , die frei von [ NOAA NGDC](https://www.ngdc.noaa.gov) .

WE MAKE NO CLAIM ÜBER DEN KORREKT DES BUNDES/TOPOGRAPHIE DATEN ERDDAP . NICHT VERWENDUNGSBEREICH DER NAVIGATIONALEN ZUSAMMENARBEIT.
    
##  Java Post{#javamail} 
E-Mails werden per E-Mail-Code gesendet. Jar aus Oracle ' [ Java Mail API](https://javaee.github.io/javamail/)   (Lizenz: [GEMEINSAME ENTWICKLUNG UND VERTEILUNG (CDDL) Version 1.1](https://javaee.github.io/javamail/LICENSE) ) .
     
## JSON{#json} 
 ERDDAP™ Verwendung [json.org's Java -basierte JSON Bibliothek](https://www.json.org/index.html) zu parse [JSON](https://www.json.org/) Daten (Lizenz: [urheberrechtlich geschützte Open Source](https://www.json.org/license.html) ) .
     

## PostgrSQL{#postgrsql} 
 ERDDAP™ enthält [PostGres JDBC](https://mvnrepository.com/artifact/org.postgresql/postgresql) Fahrer (Lizenz: [BSD](https://www.postgresql.org/about/licence/) ) . Der Treiber ist Copyright (c)) 1997-2010, PostgreSQL Global Development Group. Alle Rechte vorbehalten.
     
## Lucen{#lucene} 
 ERDDAP™ Verwendungscode von Apache [Lucen](https://lucene.apache.org/) . (Lizenz: [Apache](https://www.apache.org/licenses/LICENSE-2.0) ) für die Option "lucene" Suchmaschine (aber nicht für die Standard-Suchmaschine "original") .
     
## wohnzimmer-kompress{#commons-compress} 
 ERDDAP™ Verwendungscode von Apache [wohnzimmer-kompress](https://commons.apache.org/compress/) . (Lizenz: [Apache](https://www.apache.org/licenses/LICENSE-2.0) ) .
     
## JEXL{#jexl} 
 ERDDAP™ Unterstützung bei der Auswertung von Ausdrücken und Skripten in&lt; sourceName s&gt;'s setzt auf die [Apache-Projekt](https://www.apache.org/) : [ Java Ausdruckssprache (JEXL) ](https://commons.apache.org/proper/commons-jexl/)   (Lizenz: [Apache](https://www.apache.org/licenses/LICENSE-2.0) ) .
     
## Cassandra{#cassandra} 
 ERDDAP™ einschließlich Apache [Cassandra's](https://cassandra.apache.org/)   [cassandra-driver-core.jar](https://mvnrepository.com/artifact/com.datastax.cassandra/cassandra-driver-core)   (Lizenz: [Apache 2.0](https://github.com/datastax/java-driver/blob/2.1/LICENSE) ) .
Cassandra's cassandra-driver-core.jar erfordert (und so ERDDAP™ einschließlich) :
*    [guava.jar](https://github.com/google/guava)   (Lizenz: [Apache 2.0](https://github.com/google/guava/blob/master/LICENSE) ) .
*    [Lz4.jar](https://repo1.maven.org/maven2/net/jpountz/lz4/lz4/)   (Lizenz: [Apache 2.0](https://github.com/jpountz/lz4-java/blob/master/LICENSE.txt) ) .
*    [metrics-core.jar](https://mvnrepository.com/artifact/com.codahale.metrics/metrics-core/3.0.2)   (Lizenz: [MITTEL](https://github.com/codahale/metrics/blob/master/LICENSE) ) .
*    [netty-all.jar](https://netty.io/downloads.html)   (Lizenz: [Apache 2.0](https://netty.io/downloads.html) ) .
*    [Schnapp-java.jar](https://xerial.org/snappy-java/)   (Lizenz: [Apache 2.0](https://github.com/xerial/snappy-java/blob/develop/LICENSE) ) .
         
##  KT\\_ Paletten{#kt_-palettes} 
Die Farbpaletten, die das Präfix haben " KT\\_ " [Sammlung von .cpt Paletten von Kristen Thyng](http://soliton.vm.bytemark.co.uk/pub/cpt-city/cmocean/index.html)   (Lizenz: [MITTEL/X](http://soliton.vm.bytemark.co.uk/pub/cpt-city/cmocean/copying.html) ) , aber leicht reformiert von Jennifer Sevadjian von NOAA so dass sie ERDDAP 's .cpt Anforderungen.
     
##  Leaflet  {#leaflet} 
 ERDDAP™ Verwendung von Java Script Bibliothek [ Leaflet ](https://leafletjs.com/)   (Lizenz: [BSD 2](https://github.com/Leaflet/Leaflet/blob/main/LICENSE) ) als WMS Kunden auf WMS Webseiten in ERDDAP . Es ist eine ausgezeichnete Software (gut gestaltet, einfach zu bedienen, schnell und kostenlos) von Vladimir Agafonkin.
     
## AWS{#aws} 
Für die Arbeit mit Amazon AWS (einschließlich S3) , ERDDAP™ Verwendung v2 der [AWS SDK für Java ](https://aws.amazon.com/sdk-for-java/)   (Lizenz: [Apache](https://www.apache.org/licenses/) ) .

AWS verlangt, dass Maven die Abhängigkeiten einzieht. Sie enthalten die folgenden .jar Dateien (wobei xxx die Versionsnummer ist, die sich im Laufe der Zeit ändert, und der Lizenztyp ist in Klammern) : annotations-xxx.jar (Apache) , apache-client-xxx.jar (Apache) , ams-xxx.jar (BSD) , asm-xxx.jar (BSD) , asm-analysis-xxx.jar (BSD) , asm-commons-xxx.jar (BSD) , asm-tree-xxx.jar (BSD) , asm-util-xxx.jar (BSD) , auth-xxx.jar (?) , aws-core-xxx.jar (Apache) , aws-query-protocol-xxx.jar (Apache) , aws-xml-protocol-xxx.jar (Apache) , checker-qual-xxx.jar (MITTEL) , fehler\\_prone\\_annotations-xxx.jar (Apache) , eventstream-xxx.jar (Apache) , Missaccess-xxx.jar (Apache) , http kern-xxx.jar (Apache) , j2objc-Annotations-xxx.jar (Apache) , jackson-annotations-xxx.jar (Apache) , jackson-core-xxx.jar (Apache) , jackson-databind-xxx.jar (Apache) , jaxen-xxx.jar (BSD) , jffi-xxx.jar (Apache) , jffi-xxx.native. Ja (Apache) , jnr-constants-xxx.jar (Apache) , jnr-ffi-xxx.jar (Apache) , jnr-posix-xxx.jar (Apache) , jnr-x86asm-xxx.jar (Apache) , json-xxx.jar (Copyright- Open Source) , jsr305-xxx.jar (Apache) , hörbar zukünftig-xxx.jar (Apache) , ungefähr ein Dutzend Nety . Jar (Apache) , Profile-xxx.jar (Apache) , Protokoll-core-xxx.jar (Apache) , reaktiv-streams-xxx.jar (CCO 1,0) , Regionen-xxx.jar (Apache) , s3-xxx.jar (Apache) , sdk-core-xxx.jar (Apache) , utils-xxx.jar (?) . Um die tatsächlichen Lizenzen zu sehen, suchen Sie nach dem .jar-Namen im [Maven Repository](https://mvnrepository.com/) und dann in den Akten des Projekts, um die Lizenz zu finden.
    

Wir sind auch sehr dankbar für alle Software und Webseiten, die wir bei der Entwicklung verwenden ERDDAP , einschließlich
 [Chrom](https://www.google.com/chrome/browser/desktop/) ,
 [ curl ](https://curl.haxx.se/) ,
 [Ducken](https://duckduckgo.com/?q=) ,
 [EditPlus](https://www.editplus.com/) ,
 [DateiZilla](https://filezilla-project.org/) .
 [GitHub](https://github.com/) ,
 [Google Search](https://www.google.com/webhp) ,
 [PuTT](https://www.chiark.greenend.org.uk/~sgtatham/putty/download.html) ,
 [Stapelüberlauf](https://stackoverflow.com/) ,
 [Todoist](https://todoist.com/?lang=en) ,
 [ Wikipedia ](https://www.wikipedia.org/) ,
das Internet, das World Wide Web und alle anderen, großen, hilfreichen Websites.
Vielen Dank.
