# Tanıklıklar

katkıda bulunanlar [Kredi kredi kredileri kredi kredileri](https://github.com/erddap/erddap/blob/main/CREDITS.md) Çünkü ERDDAP™ Şimdi ayrı bir sayfada. ERDDAP™ Bir ürün [ NOAA ](https://www.noaa.gov "National Oceanic and Atmospheric Administration")   [ NMFS ](https://www.fisheries.noaa.gov "National Marine Fisheries Service")   [ SWFSC ](https://swfsc.noaa.gov "Southwest Fisheries Science Center")   [ ERD ](https://www.fisheries.noaa.gov/about/environmental-research-division-southwest-fisheries-science-center "Environmental Research Division") .

Bob Simons, orijinal ana yazar ERDDAP™   (Tasarımcı ve yazılım geliştiricisi kim yazdı ERDDAP - spesifik kod) . Başlangıç noktası Roy Mendelssohn'un (Bob'un patronu) Bob'un ConvertTable programını başlattığına dair öneri (Bir formattan diğerine tabular verileri dönüştüren küçük bir fayda ve bu büyük ölçüde Bob'un önceden kodlanmıştır. NOAA Bob'un açık kaynak olması için yeniden lisanslı olduğu çalışma) Bir web hizmetine.

Bu ve Roy Mendelssohn'un dağıtılmış veri sistemleri hakkındaki fikirleri, Bob'a ilk önerisi ve devam eden desteği (Donanım, ağ ve diğer yazılım desteği de dahil olmak üzere ve Bob'un zamanını ücretsiz olarak, böylece daha fazla zaman geçirebilirdi. ERDDAP™ Kod kodu kod kodu kod kodu) Bu projeyi mümkün kıldı ve büyümesini etkinleştirdi.

The The The The The The The The ERDDAP - Özel kod telif hakkı açık kaynak olarak lisanslanır, [ NOAA ](https://www.noaa.gov) telif hakkı tutmak. Bakın, [ ERDDAP™ Lisans lisansı](/license) .
 ERDDAP™ telif hakkı açık kaynak, Apache, LGPL, MIT/X, Mozilla ve halk domaini ve verileri kullanır.
 ERDDAP™ GPL kodu veya ticari programları gerektirmez.

İş için fon dökmesi üzerinde ERDDAP™ Gelmiştir NOAA Ama Bob Simons'ın maaşını ödedi. İlk yıl için ERDDAP™ Bir hükümet müteahhiti olduğu zaman, finansmandan geldi [ NOAA CoastWatch](https://coastwatch.noaa.gov/) Program, program, [ NOAA IOOS](https://ioos.noaa.gov/) Program ve şimdi Pasifik Okyanusu Raf Takip (POST) Program.

Çok fazla kredi birçok kişiye gidiyor ERDDAP™ Yöneticiler ve birçok gelişmeye yol açan önerileri ve yorumları yapan kullanıcılar ERDDAP . Birçoğu isim tarafından yazılır [Değişiklikler Listesi](/changes) . Hepinize teşekkür ederim (Adı ve isimsiz) Çok fazla. Böylece, ERDDAP™ Büyük bir örnek [User-Driven Innovation](https://en.wikipedia.org/wiki/User_innovation) Ürün inovasyonu genellikle tüketicilerden geliyor ( ERDDAP™ Kullanıcılar) Ama sadece üreticiler değil ( ERDDAP™ Geliştiriciler geliştiricileri) .

İşte yazılım ve veri setlerinin listesi budur ki bunlar içinde ERDDAP™ dağıtım. Bunların hepsi için çok minnettarız. Çok teşekkür ederim.
 \\[ 2021'de başlayarak, tüm kod kaynaklarını doğru bir şekilde listelemek neredeyse imkansız hale geldi ERDDAP™ Çünkü kullandığımız kütüphanelerin birkaçı (Özellikle netcdf-java ve özellikle AWS) Dönüşte birçok, diğer kütüphane kullanın. Tüm kütüphaneler, ERDDAP™ Kod aramaları doğrudan aşağıda listelenmiştir, çünkü diğer kütüphanelerin sırayla çağrıladığı birçok kütüphanedir. Aşağıdaki bir projeye sahip olduğumuzu görürseniz lütfen projeyi aşağıda ekleyebiliriz ve kredinin nerede olduğu konusunda kredi verebiliriz. \\] 

## Genel Bakış{#overview} 
 ERDDAP™ Bir şeydir [ Java Servlet](https://www.oracle.com/technetwork/java/javaee/servlet/index.html) Program. At At At At At At At At At At At At At At At At At At At At At At ERD , içinde çalışır [Tomcat](https://tomcat.apache.org/) Uygulama sunucusu (Lisans: [Apache Apache](https://www.apache.org/licenses/) ) , [Apache Apache](https://httpd.apache.org/) web server (Lisans: [Apache Apache](https://www.apache.org/licenses/) ) , kullanarak bir bilgisayar üzerinde koşmak [Red Hat Linux](https://www.redhat.com/) İşletim sistemi (Lisans: [GPL](https://www.gnu.org/licenses/gpl-3.0.html) ) .
     
## Datasets{#datasets} 
Veri setleri çeşitli kaynaklardandır. Metadata (Özellikle " sourceUrl ", ", " infoUrl ", "institution" Ve "license") Her veri kümesi için. Birçok veri setleri, verileri ne zaman kullandığınız veri sağlayıcısını silmenizi gerektiren kullanımlarında bir kısıtlamaya sahiptir. Veri sağlayıcıyı temizlemek için her zaman iyi bir form. See See See See [Bir Kağıtta Nasıl Hazırlanır](https://coastwatch.pfeg.noaa.gov/erddap/information.html#citeDataset) .
     
## CoHort Software Software{#cohort-software} 
 [com/cohort sınıfları](#cohort-software) CoHort Software (https://www.cohortsoftware.com) Bu sınıfları MIT/X benzeri bir lisansla yapan (Sınıflar/com/cohort/util/LICENSE.txt) .
     
## CoastWatch Browser Browser{#coastwatch-browser} 
 ERDDAP™ CoastWatch Browser projesinden kod kullanır (Şimdi de) Bundan sonra [ NOAA CoastWatch](https://coastwatch.noaa.gov)   [West Coast Bölgesel Node](https://coastwatch.pfeg.noaa.gov/)   (Lisans: telif hakkı açık kaynak) . Bu proje Dave Foley tarafından başlatıldı ve yönetildi, eski bir koordinatörü NOAA CoastWatch West Coast Regional Node. Tüm SahilWatch Tarayıcı kodu Bob Simons tarafından yazılmıştır.
     
##  OPeNDAP  {#opendap} 
Verilerden [ OPeNDAP ](https://www.opendap.org) sunucular okunur [ Java   DAP 1.1.7](https://www.opendap.org/deprecated-software/java-dap)   (Lisans: LGPL) .
     
##  NetCDF -java{#netcdf-java} 
 NetCDF dosyaları dosyaları dosyaları dosyaları ( .nc ) , GMT-style NetCDF dosyaları dosyaları dosyaları dosyaları (.grd) GRIB ve BUFR kodla okunur ve yazılır [ NetCDF   Java Kütüphane Kütüphanesi](https://www.unidata.ucar.edu/software/netcdf-java/)   (Lisans: [BSD-3](https://github.com/Unidata/netcdf-java/blob/develop/LICENSE) ) From from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from [ Unidata ](https://www.unidata.ucar.edu/) .

Software Dahil in the Software NetCDF   Java .jar:

* slf4j
The The The The The The The The NetCDF   Java Kütüphane ve Cassandra'nın ihtiyacı [Basit Logging Facade'den yana Java ](https://www.slf4j.org/) Proje. Şu anda, ERDDAP™ Bu ihtiyacı karşılamak için slf4j-simple-xxx.jar adı verilen. (Lisans: [MIT/X](https://www.slf4j.org/license.html) ) .
     
* JDOM
The The The The The The The The NetCDF   Java .jar XML işleme kodu içerir [JDOM](http://www.jdom.org/)   (Lisans: [Apache Apache](http://www.jdom.org/docs/faq.html#a0030) ) Bu, netcdfAll.jar'a dahil edilmiştir.
     
* Joda
The The The The The The The The NetCDF   Java .jar içerir. [Joda](https://www.joda.org/joda-time/) takvim hesaplamaları için (Hangi muhtemelen kullanılmamıştır ERDDAP ) . (Lisans: [Apache 2.0](https://www.joda.org/joda-time/licenses.html) ) .
     
* Apache Apache
The The The The The The The The NetCDF   Java .jar, birkaç kişiden .jar dosyaları içerir [Apache projeleri](https://www.apache.org/) :
     [Ortaklar-codec](https://commons.apache.org/proper/commons-codec/) ,
     [yaygındır](https://commons.apache.org/discovery/) ,
     [Ortaklar- http müşteri müşteri](https://hc.apache.org/httpcomponents-client-ga/) ,
     [yaygındır](https://commons.apache.org/proper/commons-logging/)   
     [HttpComponents](https://hc.apache.org) ,
     (Her şey için: lisans: [Apache Apache](https://www.apache.org/licenses/LICENSE-2.0) )   
Bunlar netcdfAll.jar'a dahil edilmiştir.
     
* Diğer Diğer Diğer Diğer
The The The The The The The The NetCDF   Java .jar ayrıca kod içerir: com.google.code.findbugs, com.google.errorprone, com.google.guava, com.google.j2objc, com.google.protobuf, edu.ucar, org.hauscode.mojo, com.beust.commander, com.google.com (Google Apache ve BSD benzeri lisansları kullanır.)   
         
## SGT{#sgt} 
Grafikler ve haritalar, değiştirilmiş bir versiyonla oluşturulur NOAA "SGT" (was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was athttps://www.pmel.noaa.gov/epic/java/sgt/Şimdi durduruldu) Versiyon 3 (Birbiri Java - Donald Denbo tarafından yazılmış bilimsel Grafik Toolkit [ NOAA PMEL](https://www.pmel.noaa.gov/) )   (Lisans: telif hakkı açık kaynak (was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was athttps://www.pmel.noaa.gov/epic/java/license.html) ) .
     
## Walter Zorn{#walter-zorn} 
Big, HTML aracıtips on ERDDAP “ HTML sayfaları Walter Zorn'ın wz\\_tooltip ile yaratıldı. js (Lisans: LGPL) .
Sliders and the drag and drop feature of the Slide Sorter are created with Walter Zorn's wz\\_dragdrop.js (Lisans: LGPL) .
     
## openPDF{#openpdf} 
.pdf dosyaları ile oluşturulur [openpdf](https://github.com/LibrePDF/OpenPDF) , ücretsiz Java -PDF kütüphane.
     
## GSHHS{#gshhs} 
Kıyı ve göl verileri, [GSHHS](https://www.ngdc.noaa.gov/mgg/shorelines/gshhs.html) - Global Self-consistent, Hierarşik, Yüksek çözünürlüklü Shoreline Database (Lisans: [GPL](https://www.soest.hawaii.edu/pwessel/gshhs/README.TXT) ) Paul Wessel ve Walter Smith tarafından yaratıldı.

MAKE NO CLAIM HAKKINDA SHORELINE DATA'nın DATA'sı ERDDAP™ - NAVIGAATION PURPOSES için USE IT.
     
    
## GMT pscoast{#gmt-pscoast} 
Siyasi sınır ve nehir verileri, [pscoast](https://www.soest.hawaii.edu/gmt/gmt/html/man/pscoast.html) Programda program [GMT GMT](https://www.soest.hawaii.edu/gmt/) , hangi verileri kullanarak [CIA CIA World Data Bank II](https://www.evl.uic.edu/pape/data/WDB/)   (Lisans: Public domain) .

 COR  POLI  POLI  POLI  POLI  POLI  POLI  POLI ERDDAP .
    
## ETOPO{#etopo} 
Bazı haritaların arka planında kullanılan banyo / topografi verileridir [ETOPO1 Global 1-Minute Gridded Elevation Data Set](https://www.ngdc.noaa.gov/mgg/global/global.html)   (Buz Yüzeyi, ağ kayıtlı, ikili, 2 int: etopo1\\_ice\\_g\\_i2 .zip )   (Lisans: [Public domain](https://www.ngdc.noaa.gov/ngdcinfo/privacy.html#copyright) ) Bu, ücretsiz olarak dağıtılır [ NOAA NGDC](https://www.ngdc.noaa.gov) .

BATHYMETRY/TOPOGRAPHY DATA'NININ DİKKATLIĞININ ERDDAP . USE IT FOR NAVIGAATION PURPOSES.
    
##  Java Mail Mail Mail{#javamail} 
E-postalar posta kodu kullanılarak gönderilir. jar from jar from Oracle " [ Java Mail API](https://javaee.github.io/javamail/)   (Lisans: [COMMON DEVELOPMENT AND DISTRIBUTION LICENSE (CDDL) Version 1.1](https://javaee.github.io/javamail/LICENSE) ) .
     
## JSON{#json} 
 ERDDAP™ kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım [json.org'un Java - temelli JSON kütüphanesi](https://www.json.org/index.html) parse [JSON](https://www.json.org/) Data data data data data data (Lisans: [telif hakkı açık kaynak](https://www.json.org/license.html) ) .
     

## PostgrSQL{#postgrsql} 
 ERDDAP™ içerir. [PostGres JDBC](https://mvnrepository.com/artifact/org.postgresql/postgresql) sürücü sürücüsü (Lisans: [BSD](https://www.postgresql.org/about/licence/) ) . Sürücü Copyright (c) 1997-2010, PostgreSQL Global Development Group. Tüm hakları saklıdır.
     
## Lucene{#lucene} 
 ERDDAP™ Apache'den kullanım kodu [Lucene](https://lucene.apache.org/) . (Lisans: [Apache Apache](https://www.apache.org/licenses/LICENSE-2.0) ) "lucene" arama motoru seçeneği (Ancak varsayılan "orijin" arama motoru için değil) .
     
## commons-compress{#commons-compress} 
 ERDDAP™ Apache'den kullanım kodu [commons-compress](https://commons.apache.org/compress/) . (Lisans: [Apache Apache](https://www.apache.org/licenses/LICENSE-2.0) ) .
     
## JEXL{#jexl} 
 ERDDAP™ ifadeleri ve senaryoları değerlendirmek için destek&lt; sourceName s&gt; s. [Apache projesinin](https://www.apache.org/) : [ Java Expression Language (JEXL) ](https://commons.apache.org/proper/commons-jexl/)   (Lisans: [Apache Apache](https://www.apache.org/licenses/LICENSE-2.0) ) .
     
## Cassandra{#cassandra} 
 ERDDAP™ içerir içerir dahil içerir Apache Apache [Cassandra'nın](https://cassandra.apache.org/)   [cassandra-vid-core.jars](https://mvnrepository.com/artifact/com.datastax.cassandra/cassandra-driver-core)   (Lisans: [Apache 2.0](https://github.com/datastax/java-driver/blob/2.1/LICENSE) ) .
Cassandra'nın cassandra-vida-core gerektirir. (Ve böylece ERDDAP™ içerir içerir dahil içerir) :
*    [guava.jar](https://github.com/google/guava)   (Lisans: [Apache 2.0](https://github.com/google/guava/blob/master/LICENSE) ) .
*    [lz4.jar](https://repo1.maven.org/maven2/net/jpountz/lz4/lz4/)   (Lisans: [Apache 2.0](https://github.com/jpountz/lz4-java/blob/master/LICENSE.txt) ) .
*    [metrics-core.jar](https://mvnrepository.com/artifact/com.codahale.metrics/metrics-core/3.0.2)   (Lisans: [MIT MIT](https://github.com/codahale/metrics/blob/master/LICENSE) ) .
*    [Netty-all.jar](https://netty.io/downloads.html)   (Lisans: [Apache 2.0](https://netty.io/downloads.html) ) .
*    [snappy-java.jar](https://xerial.org/snappy-java/)   (Lisans: [Apache 2.0](https://github.com/xerial/snappy-java/blob/develop/LICENSE) ) .
         
##  KT\\_ paletler{#kt_-palettes} 
Ön işareti olan renkli paletler " KT\\_ “Biri [Kristen tarafından .cpt paletleri koleksiyonu Senin](http://soliton.vm.bytemark.co.uk/pub/cpt-city/cmocean/index.html)   (Lisans: [MIT/X](http://soliton.vm.bytemark.co.uk/pub/cpt-city/cmocean/copying.html) ) Ancak Jennifer Sevadjian tarafından biraz reforma uğradı NOAA Bu yüzden onlar buna uygun ERDDAP 's .cpt requirements.
     
##  Leaflet  {#leaflet} 
 ERDDAP™ Kullanımı kullanır Java Senaryo kütüphanesi [ Leaflet ](https://leafletjs.com/)   (Lisans: [BSD 2](https://github.com/Leaflet/Leaflet/blob/main/LICENSE) ) Sanki WMS müşteri üzerinde müşteri WMS Web sayfaları ERDDAP . Mükemmel yazılım (İyi tasarlanmış, kullanımı kolay, hızlı ve özgür) Vladimir Agafonkin'den.
     
## AWS{#aws} 
Amazon AWS ile çalışmak için (S3 de dahil) , ERDDAP™ v2 kullanır [AWS SDK için Java ](https://aws.amazon.com/sdk-for-java/)   (Lisans: [Apache Apache](https://www.apache.org/licenses/) ) .

AWS, Maven'in bağımlılıklara çekilmesini gerektirir. Aşağıdaki .jar dosyaları içerir (xxx'nın sürüm numarası nerede, hangi zaman içinde değişir ve lisans türü ebeveynliklerdedir.) : annotations-xxx.jar (Apache Apache) , apache-client-xxx.jar (Apache Apache) , ams-xxx.jar (BSD) , asm-xxx.jar (BSD) , asm-analiz-xxx.jar (BSD) , asm-xxx-xxx.jar (BSD) , asm-tree-xxx.jar (BSD) , asm-util-xxx.jar (BSD) , auth-xxx.jar (??) , aws-core-xxx.jar (Apache Apache) , aws-query-protocol-xxx.jar (Apache Apache) , aws-xml-protocol-xxx.jar (Apache Apache) , checker-qual-xxx.jar (MIT MIT) Hatanın_prone\\_annotations-xxx.jar (Apache Apache) , eventstream-xxx.jar (Apache Apache) Başarısızlık-xxx.jar (Apache Apache) , http Temel-xxx.jar (Apache Apache) J2objc-annotations-xxx.jar (Apache Apache) Jackson-annotations-xxx.jar (Apache Apache) Jackson-core-xxx.jar (Apache Apache) Jackson-databind-xxx.jar (Apache Apache) , jaxen-xxx.jar (BSD) , jffi-xxx.jar (Apache Apache) , jffi-xxx.native. jar jar jar (Apache Apache) , jnr-constants-xxx.jar (Apache Apache) , jnr-ffi-xxx.jar (Apache Apache) , jnr-posix-xxx.jar (Apache Apache) , jnr-x86asm-xxx.jar (Apache Apache) , json-xxx.jar (Copyright açık kaynak) , jsr305-xxx.jar (Apache Apache) , dinleablefuture-xxx.jar (Apache Apache) Yaklaşık bir düzine netty . jar'ss (Apache Apache) Profiller-xxx.jar (Apache Apache) , protokol-core-xxx.jar (Apache Apache) , reaktif-streams-xxx.jar (CCO 1.0) , bölgeler-xxx.jar (Apache Apache) s3-xxx.jar (Apache Apache) , sdk-core-xxx.jar (Apache Apache) , utils-xxx.jar (??) . Gerçek lisansları görmek için, .jar adı için [Maven Repository](https://mvnrepository.com/) Ve sonra projenin dosyalarında lisans bulmak için rummage.
    

Ayrıca gelişmekte olduğunda kullandığımız tüm yazılım ve web siteleri için de çok minnettarız ERDDAP de dahil olmak üzere,
 [Chrome Chrome Chrome](https://www.google.com/chrome/browser/desktop/) ,
 [ curl ](https://curl.haxx.se/) ,
 [DuckDuckGo](https://duckduckgo.com/?q=) ,
 [EditPlus](https://www.editplus.com/) ,
 [FileZilla](https://filezilla-project.org/) .
 [GitHub](https://github.com/) ,
 [Google Search](https://www.google.com/webhp) ,
 [PuTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/download.html) ,
 [Overflow](https://stackoverflow.com/) ,
 [Todoist](https://todoist.com/?lang=en) ,
 [ Wikipedia ](https://www.wikipedia.org/) ,
İnternet, Dünya Wide Web ve diğer tüm büyük, yararlı web siteleri.
Çok teşekkür ederim.
