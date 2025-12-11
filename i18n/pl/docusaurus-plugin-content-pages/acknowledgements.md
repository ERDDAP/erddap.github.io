# Podziękowania

Podmiot przekazujący dane [kredyty](https://github.com/erddap/erddap/blob/main/CREDITS.md) zamiast ERDDAP™ jest teraz na osobnej stronie. ERDDAP™ jest produktem [ NOAA ](https://www.noaa.gov "National Oceanic and Atmospheric Administration")   [ NMFS ](https://www.fisheries.noaa.gov "National Marine Fisheries Service")   [ SWFSC ](https://swfsc.noaa.gov "Southwest Fisheries Science Center")   [ ERD ](https://www.fisheries.noaa.gov/about/environmental-research-division-southwest-fisheries-science-center "Environmental Research Division") .

Bob Simons jest oryginalnym autorem ERDDAP™   (projektant i programista, który napisał ERDDAP - kod specyficzny) . Punktem wyjścia był Roy Mendelssohn (Szef Boba) sugestia, że Bob obróci swój program ConvertTable (małe narzędzie, które przekształca dane tabelaryczne z jednego formatu na inny i które w dużej mierze było kodem z pre- NOAA praca, że Bob ponownie licencjonowane być open source) do serwisu internetowego.

To były i są pomysły Roya Mendelssohna na temat rozproszonych systemów danych, jego wstępna sugestia dla Boba i jego bieżące wsparcie (w tym sprzęt, sieć i inne wsparcie oprogramowania, i przez uwolnienie czasu Boba, aby mógł spędzić więcej czasu na ERDDAP™ kod) który umożliwił ten projekt i umożliwił jego rozwój.

W ERDDAP -kod jest licencjonowany jako prawa autorskie open source, z [ NOAA ](https://www.noaa.gov) posiadanie praw autorskich. Patrz [ ERDDAP™ licencja](/license) .
 ERDDAP™ wykorzystuje chronione prawem autorskim open source, Apache, LGPL, MIT / X, Mozilla oraz biblioteki i dane domeny publicznej.
 ERDDAP™ nie wymaga żadnego kodu GPL lub programów komercyjnych.

Większość finansowania na prace ERDDAP™ pochodzi z NOAA W ten sposób opłaciła pensję Boba Simonsa. Na pierwszy rok ERDDAP™ , kiedy był rządowym wykonawcą, finansowanie pochodzi z [ NOAA CoastWatch](https://coastwatch.noaa.gov/) Program [ NOAA IOOS](https://ioos.noaa.gov/) program, a teraz nie działa Ocean Spokojny śledzenie półka (POST) Program.

Wiele kredytów idzie do wielu ERDDAP™ administratorzy i użytkownicy, którzy przedstawili sugestie i komentarze, które doprowadziły do wielu ulepszeń w ERDDAP . Wiele z nich jest wymienionych po imieniu w [Lista zmian](/changes) . Dziękuję wszystkim. (nazwany i nienazwany) Bardzo. Tak więc, ERDDAP™ jest doskonałym przykładem [User- Driven Innowacje](https://en.wikipedia.org/wiki/User_innovation) , gdzie innowacje produktowe często pochodzą od konsumentów ( ERDDAP™ użytkownicy) , nie tylko producentów ( ERDDAP™ programiści) .

Oto lista oprogramowania i zbiorów danych, które są w ERDDAP™ dystrybucji. Jesteśmy za to bardzo wdzięczni. Dziękuję bardzo.
 \\[ Począwszy od 2021 r., prawie niemożliwe stało się podanie wszystkich źródeł kodu ERDDAP™ ponieważ kilka bibliotek używamy (szczególnie netcdf- java, a zwłaszcza AWS) z kolei używać wiele, wiele innych bibliotek. Wszystkie biblioteki, które ERDDAP™ poniżej znajdują się wywołania kodowe, podobnie jak wiele bibliotek, które inne biblioteki z kolei wywołują. Jeśli zauważysz, że pominęliśmy projekt poniżej, daj nam znać, abyśmy mogli dodać projekt poniżej i dać kredyt tam, gdzie kredyt jest należny. \\] 

## Przegląd{#overview} 
 ERDDAP™ jest [ Java Serwlet](https://www.oracle.com/technetwork/java/javaee/servlet/index.html) Program. W ERD , działa wewnątrz [Tomcat](https://tomcat.apache.org/) serwer aplikacji (licencja: [Apache](https://www.apache.org/licenses/) ) , z [Apache](https://httpd.apache.org/) serwer WWW (licencja: [Apache](https://www.apache.org/licenses/) ) , działa na komputerze za pomocą [Czerwony kapelusz Linux](https://www.redhat.com/) system operacyjny (licencja: [GPL](https://www.gnu.org/licenses/gpl-3.0.html) ) .
     
## Zestawy danych{#datasets} 
Zestawy danych pochodzą z różnych źródeł. Zobacz metadane (w szczególności: sourceUrl "," infoUrl ", "institution" oraz "licencja") dla każdego zbioru danych. Wiele zestawów danych ma ograniczenia w ich użyciu, które wymagają cytowania / kredytowania dostawcy danych w każdym przypadku korzystania z danych. Zawsze dobra forma cytowania / kredytowania dostawcy danych. Patrz [Jak cytować Dataset w papierze](https://coastwatch.pfeg.noaa.gov/erddap/information.html#citeDataset) .
     
## Oprogramowanie kohortowe{#cohort-software} 
 [Klasy com / cohort](#cohort-software) są z oprogramowania CoHort (https://www.cohortsoftware.com) które udostępnia te klasy z licencją typu MIT / X- like (patrz klasy / com / cohort / util / LICENSE.txt) .
     
## Przeglądarka CoastWatch{#coastwatch-browser} 
 ERDDAP™ wykorzystuje kod z projektu CoastWatch Browser (teraz zdemisjonowane) od [ NOAA CoastWatch](https://coastwatch.noaa.gov)   [Węzeł regionalny Zachodniego Wybrzeża](https://coastwatch.pfeg.noaa.gov/)   (licence: copyright open source) . Projekt ten został zainicjowany i zarządzany przez Dave 'a Foleya, byłego koordynatora NOAA CoastWatch West Coast Regional Node. Wszystkie kody CoastWatch Browser zostały napisane przez Boba Simonsa.
     
##  OPeNDAP  {#opendap} 
Dane z [ OPeNDAP ](https://www.opendap.org) serwery są odczytywane z [ Java   DAP 1, 7](https://www.opendap.org/deprecated-software/java-dap)   (licencja: LGPL) .
     
##  NetCDF - Java{#netcdf-java} 
 NetCDF pliki ( .nc ) , GMT- style NetCDF pliki (.grd) , GRIB i BUFR są czytane i napisane kodem w [ NetCDF   Java Biblioteka](https://www.unidata.ucar.edu/software/netcdf-java/)   (licencja: [BSD-3](https://github.com/Unidata/netcdf-java/blob/develop/LICENSE) ) od [ Unidata ](https://www.unidata.ucar.edu/) .

Oprogramowanie zawarte w NetCDF   Java .jar:

* slf4j
W NetCDF   Java Biblioteka i Cassandra potrzebują [slf4j z prostej fasady logowania Java ](https://www.slf4j.org/) projekt. Obecnie ERDDAP™ używa slf4j- simple- xxx.jar przemianowany na slf4j.jar, aby zaspokoić tę potrzebę. (licencja: [MIT / X](https://www.slf4j.org/license.html) ) .
     
* JDOM
W NetCDF   Java .jar zawiera kod przetwarzania XML z [JDOM](http://www.jdom.org/)   (licencja: [Apache](http://www.jdom.org/docs/faq.html#a0030) ) , który jest zawarty w netcdfAll.jar.
     
* Joda
W NetCDF   Java .jar zawiera [Joda](https://www.joda.org/joda-time/) dla obliczeń kalendarzowych (które prawdopodobnie nie są używane przez ERDDAP ) . (licencja: [Apache 2.0](https://www.joda.org/joda-time/licenses.html) ) .
     
* Apache
W NetCDF   Java .jar zawiera pliki .jar z kilku [Projekty Apache](https://www.apache.org/) :
     [commons- codec](https://commons.apache.org/proper/commons-codec/) ,
     [communis- discovery](https://commons.apache.org/discovery/) ,
     [Często... http klient](https://hc.apache.org/httpcomponents-client-ga/) ,
     [commons- logowanie](https://commons.apache.org/proper/commons-logging/)   
     [HttpComponents](https://hc.apache.org) ,
     (Dla wszystkich: licencja: [Apache](https://www.apache.org/licenses/LICENSE-2.0) )   
Są one zawarte w netcdfAll.jar.
     
* Inne
W NetCDF   Java .jar zawiera również kod z: com.google.code.findbugs, com.google.errorpronder, com.google.guava, com.google.j2objc, com.google.protobuf, edu.ucar, org.codehaus.mojo, com.beust.jcommander, com.google.common, com.google.re2j, com.google.triddparty. (Google używa licencji typu Apache i BSD.)   
         
## SGT{#sgt} 
Wykresy i mapy są tworzone na -the- fly ze zmodyfikowaną wersją NOAA SGT (był whttps://www.pmel.noaa.gov/epic/java/sgt/, teraz przerwany) Wersja 3 (a Java -Based Scientific Graphics Toolkit napisany przez Donald Denbo w [ NOAA PMEL](https://www.pmel.noaa.gov/) )   (licence: copyright open source (był whttps://www.pmel.noaa.gov/epic/java/license.html) ) .
     
## Walter Zorn{#walter-zorn} 
Duży, HTML podpowiedzi na ERDDAP Strony HTML są tworzone za pomocą podpowiedzi Waltera Zorna. js (licencja: LGPL) .
Przesuwacze oraz funkcja przeciągnij i upuść Sortera slajdów są tworzone z Wz\\ _ dragdrop.js Waltera Zorna (licencja: LGPL) .
     
## openPDF{#openpdf} 
Pliki .pdf są tworzone z [openpdf](https://github.com/LibrePDF/OpenPDF) , wolny Java - Biblioteka PDF.
     
## GSHHS{#gshhs} 
Dane dotyczące wybrzeża i jeziora pochodzą z [GSHHS](https://www.ngdc.noaa.gov/mgg/shorelines/gshhs.html) -- Global Self- konsekwentny, Hierarchiczny, Wysokiej rozdzielczości Baza danych Shoreline (licencja: [GPL](https://www.soest.hawaii.edu/pwessel/gshhs/README.TXT) ) Stworzony przez Paula Wessela i Waltera Smitha.

Nie wiemy, co z danymi Shoreline 'a. ERDDAP™ -- NIE STOSOWAĆ DO CELÓW NAWIGACYJNYCH.
     
    
## GMT pscaast{#gmt-pscoast} 
Granica polityczna i dane rzeczne pochodzą z [pscaast](https://www.soest.hawaii.edu/gmt/gmt/html/man/pscoast.html) program w [GMT](https://www.soest.hawaii.edu/gmt/) , który wykorzystuje dane z [CIA Światowy Bank Danych II](https://www.evl.uic.edu/pape/data/WDB/)   (licencja: domena publiczna) .

Nie mamy pewności co do odpowiedniości politycznych danych boundary, które pochodzą z ERDDAP .
    
## ETOPO{#etopo} 
Dane batymetryczne / topograficzne wykorzystywane w tle niektórych map są [ETOPO1 Global 1- Minute Gridded Elevation Data Set](https://www.ngdc.noaa.gov/mgg/global/global.html)   (Ice Surface, grid registered, binary, 2 bajt int: etopo1\\ _ ice\\ _ g\\ _ i2 .zip )   (licencja: [domena publiczna](https://www.ngdc.noaa.gov/ngdcinfo/privacy.html#copyright) ) , który jest dystrybuowany za darmo przez [ NOAA NGDC](https://www.ngdc.noaa.gov) .

Nie mamy jasności co do odpowiedniości danych z badania / badań toksykologicznych, które pochodzą z ERDDAP . NIE STOSOWAĆ DO CELÓW NAWIGACYJNYCH.
    
##  Java Poczta{#javamail} 
E-maile są wysyłane za pomocą kodu pocztowego. słoik Oracle jest [ Java API poczty](https://javaee.github.io/javamail/)   (licencja: [WSPÓLNA LICENCJA ROZWOJU I DYSTRYBUCJI (CDDL) Wersja 1.1](https://javaee.github.io/javamail/LICENSE) ) .
     
## JSON{#json} 
 ERDDAP™ zastosowania [json.org Java - biblioteka oparta na JSON](https://www.json.org/index.html) do parsu [JSON](https://www.json.org/) dane (licencja: [open source z prawami autorskimi](https://www.json.org/license.html) ) .
     

## PostgrSQL{#postgrsql} 
 ERDDAP™ obejmuje [PostGres JDBC](https://mvnrepository.com/artifact/org.postgresql/postgresql) kierowca (licencja: [BSD](https://www.postgresql.org/about/licence/) ) . Kierowca jest Copyright (c) 1997- 2010, PostgreSQL Global Development Group. Wszelkie prawa zastrzeżone.
     
## Lucene{#lucene} 
 ERDDAP™ użyj kodu z Apache [Lucene](https://lucene.apache.org/) . (licencja: [Apache](https://www.apache.org/licenses/LICENSE-2.0) ) dla opcji wyszukiwarki "lucene" (ale nie dla domyślnej "oryginalnej" wyszukiwarki) .
     
## commons- compress{#commons-compress} 
 ERDDAP™ użyj kodu z Apache [commons- compress](https://commons.apache.org/compress/) . (licencja: [Apache](https://www.apache.org/licenses/LICENSE-2.0) ) .
     
## JEXL{#jexl} 
 ERDDAP™ obsługa oceny wyrażeń i skryptów w&lt; sourceName s &gt; s opiera się na [Projekt Apache](https://www.apache.org/) : [ Java Język ekspresji (JEXL) ](https://commons.apache.org/proper/commons-jexl/)   (licencja: [Apache](https://www.apache.org/licenses/LICENSE-2.0) ) .
     
## Cassandra{#cassandra} 
 ERDDAP™ obejmuje Apache [Cassandra](https://cassandra.apache.org/)   [cassandra- driver- core.jar](https://mvnrepository.com/artifact/com.datastax.cassandra/cassandra-driver-core)   (licencja: [Apache 2.0](https://github.com/datastax/java-driver/blob/2.1/LICENSE) ) .
Kasandra Cassandra- driver-core.jar wymaga (i tak ERDDAP™ obejmuje) :
*    [guava.jar](https://github.com/google/guava)   (licencja: [Apache 2.0](https://github.com/google/guava/blob/master/LICENSE) ) .
*    [lz4.jar](https://repo1.maven.org/maven2/net/jpountz/lz4/lz4/)   (licencja: [Apache 2.0](https://github.com/jpountz/lz4-java/blob/master/LICENSE.txt) ) .
*    [metrics- core.jar](https://mvnrepository.com/artifact/com.codahale.metrics/metrics-core/3.0.2)   (licencja: [MIT](https://github.com/codahale/metrics/blob/master/LICENSE) ) .
*    [netty- all.jar](https://netty.io/downloads.html)   (licencja: [Apache 2.0](https://netty.io/downloads.html) ) .
*    [snappy- java.jar](https://xerial.org/snappy-java/)   (licencja: [Apache 2.0](https://github.com/xerial/snappy-java/blob/develop/LICENSE) ) .
         
##  KT\\_ palety{#kt_-palettes} 
Palety kolorów, które mają przedrostek " KT\\_ "są [Kolekcja palet .cpt autorstwa Kristen Thyng](http://soliton.vm.bytemark.co.uk/pub/cpt-city/cmocean/index.html)   (licencja: [MIT / X](http://soliton.vm.bytemark.co.uk/pub/cpt-city/cmocean/copying.html) ) , ale nieco zreformowane przez Jennifer Sevadjian NOAA tak, że są one zgodne z ERDDAP wymagania .cpt.
     
##  Leaflet  {#leaflet} 
 ERDDAP™ wykorzystuje Java Biblioteka skryptów [ Leaflet ](https://leafletjs.com/)   (licencja: [BSD 2](https://github.com/Leaflet/Leaflet/blob/main/LICENSE) ) jako WMS klient na WMS strony internetowe w ERDDAP . To jest doskonałe oprogramowanie (dobrze zaprojektowane, łatwe w użyciu, szybkie i wolne) od Władimira Agafonkina.
     
## AWS{#aws} 
Do pracy z Amazon AWS (w tym S3) , ERDDAP™ wykorzystuje v2 [AWS SDK Java ](https://aws.amazon.com/sdk-for-java/)   (licencja: [Apache](https://www.apache.org/licenses/) ) .

AWS wymaga, by Maven wycofał zależności. Obejmują one następujące pliki .jar (gdzie xxx jest numerem wersji, który zmienia się w czasie, a typ licencji jest w nawiasach) : adnotations- xxx.jar (Apache) , apache- client- xxx.jar (Apache) , ams- xxx.jar (BSD) , asm- xxx.jar (BSD) , asm- analysis-xxx.jar (BSD) , asm- commons- xxx.jar (BSD) , asm- tree- xxx.jar (BSD) , asm- util- xxx.jar (BSD) , auth- xxx.jar (?) , aws- core- xxx.jar (Apache) , aws- query- protox- xxx.jar (Apache) , aws- xml- protox- xxx.jar (Apache) , checker- qual- xxx.jar (MIT) , error\\ _ proble\\ _ annotations- xxx.jar (Apache) , eventstream- xxx.jar (Apache) , awarieaccess- xxx.jar (Apache) , http core- xxx.jar (Apache) , j2objc- innotations- xxx.jar (Apache) , jackson-annotations- xxx.jar (Apache) , jackson- core- xxx.jar (Apache) , jackson- datadind- xxx.jar (Apache) , jaxen- xxx.jar (BSD) , jffi- xxx.jar (Apache) , jffi- xxx.native. słoik (Apache) , jnr- constants- xxx.jar (Apache) , jnr- ffi- xxx.jar (Apache) , jnr- posix- xxx.jar (Apache) , jnr- x86asm- xxx.jar (Apache) , json- xxx.jar (Copyright open source) , jsr305- xxx.jar (Apache) , listenablefuture- xxx.jar (Apache) , około tuzina netty. słoik (Apache) , profiles-xxx.jar (Apache) , protocol-core- xxx.jar (Apache) , reactive-streams- xxx.jar (CCO 1, 0) , regions- xxx.jar (Apache) , s3- xxx.jar (Apache) , sdk- core- xxx.jar (Apache) , utils- xxx.jar (?) . Aby zobaczyć rzeczywiste licencje, szukaj nazwy .jar w [Repozytorium Maven](https://mvnrepository.com/) a potem grzebać w aktach projektu, żeby znaleźć licencję.
    

Jesteśmy również bardzo wdzięczni za wszystkie oprogramowanie i strony internetowe, które używamy podczas opracowywania ERDDAP , w tym
 [Chrome](https://www.google.com/chrome/browser/desktop/) ,
 [ curl ](https://curl.haxx.se/) ,
 [DuckDuckGo](https://duckduckgo.com/?q=) ,
 [EditPlus](https://www.editplus.com/) ,
 [Plik](https://filezilla-project.org/) .
 [GitHub](https://github.com/) ,
 [Wyszukiwanie Google](https://www.google.com/webhp) ,
 [PUTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/download.html) ,
 [Przepływ stosu](https://stackoverflow.com/) ,
 [todoist](https://todoist.com/?lang=en) ,
 [ Wikipedia ](https://www.wikipedia.org/) ,
Internet, World Wide Web i wszystkie inne, wielkie, pomocne strony internetowe.
Dziękuję bardzo.
