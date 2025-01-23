---
title: "EDDTableFromEML" 
---
# EDTable FromEML ve EDDTable FromEMLBatch GenrateDatasets'teki Seçenekler X ml

\\[Bu web sayfası sadece ilgilenecekERDDAP™EML dosyaları ile çalışan yöneticiler.
Bu belge aslında 2016 yılında yaratıldı. 2020-11-30'da son olarak düzenlenmişti.\\]

[ **ERDDAP™** ](https://coastwatch.pfeg.noaa.gov/erddap/index.html)Kullanıcılara basit, tutarlı bir yol veren ve yaygın dosya formatlarında lineer bilimsel veri setlerini indirmek ve grafikler ve haritalar yapmak.ERDDAP™Verilen bir veri kümesi ile ya çok boyutlu ızgara değişkenleri grubu olarak çalışır (e.g., uydu veya model verileri) veya veritabanı benzeri bir tablo olarak (Her bir bilgi türü ve her gözlem için bir sütun ile) .ERDDAP™Free ve Open Source Software, böylece herkes yapabilir[indirme ve yüklemeERDDAP™](/docs/server-admin/deploy-install)Onların verilere hizmet etmek.

Bir veri kümesi eklemek içinERDDAP™Kurulum, kurulum,ERDDAP™Yönetici, veri kümesini denilen bir dosyaya tarif eden XML'in bir chunk eklemek gerekirdatasets.xml. (Orada var[Kapsamlı dokümanlar içindatasets.xml](/docs/server-admin/datasets).) XML'in chunk'ını oluşturmak mümkün olsa dadatasets.xmlTamamen el ile,ERDDAP™denilen bir araçla geliyor[ **GenrateDatasetsX ml** ](/docs/server-admin/datasets#tools)Bu, veri kümesi hakkında bazı bilgi kaynağına dayanan belirli bir veri kümesi için gerekli olan XML'nin kaba taslağını oluşturabilir.

GenerateDatasets ilk şey X ml, oluşturmak istediğiniz veri kümesinin ne türü olduğunu soruyor. GenrateDatasets X ml'in özel bir seçeneği var, **EDDTable FromEML** , bu bilgiyi bir an içinde kullanır[Ekolojik Metadata Dili (EML) ](https://knb.ecoinformatics.org/external//emlparser/docs/index.html)XML dosyası, XML'in chunk'unu oluşturmak içindatasets.xmlBir yaratmak için[EDDTable FromAsciiFiles](/docs/server-admin/datasets#eddtablefromasciifiles)Bir EML dosyasında her veri masasından veri kümesi. Bu çoğu EML dosyaları için çok iyi çalışır, çünkü EML dosyaları, kolay çalışma ile ilgili bir veri kümesi için gerekli tüm metadatayı depolamak için mükemmel bir iş yapar. GenerateDatasetsXml'in veri setleri için URL dahil olmak üzere EML dosyası oluşturmak için ihtiyacı olan bilgiler, GenerateDatasetsX ml downloads, pars ve EML dosyasının açıklamasıyla karşılaştırılır. (Birçok grup EML'ye geçiş yapmak için iyi olur, bu, herhangi bir tabut bilimsel veri kümesini belgelemek için harika bir sistemdir, sadece ekolojik veriler değil. Ve XML şemaları oluşturan birçok grup, EML'yi açık olan XML şemaları için bir vaka çalışması olarak kullanmak için iyi olacaktır, noktaya kadar derin değil. (I.e., çok fazla seviye) Ve insanlar ve bilgisayarlarla çalışmak kolay.) 

## Sorular{#questions} 

İşte tüm sorular GenrateDatasets X ml, sadece bir EML dosyasını veya EML dosyalarının bir topluunu işlemek istiyorsanız nasıl cevap vermeniz gerektiği hakkında yorumlanacaktır:

* Hangi EDDType?
Sadece bir dosyayı işlemek istiyorsanız, cevap: EDDTable FromEML
Bir dosya grubu işlemek istiyorsanız, cevap: EDDTable FromEMLBatch
* Dosyaları depolamak için Rehber?
EML ve / veya veri dosyaları indirmek için kullanılacak olan dizinin adını girin.
Eğer dizi mevcut değilse, oluşturulacaktır.
*    (EDDTable FromEML Sadece sadece sadece sadece sadece sadece sadece sadece sadece sadece sadece sadece sadece) EML URL veya yerel dosyaName?
Bir EML dosyasının URL veya yerel dosya adı girin.
*    (EDDTable FromEMLBatch sadece) EML dir (URL veya yerel) ??
EML dosyaları ile dizinin adını girin (Bir URL veya yerel bir korkunç) .
Örneğin: http://sbc.lternet.edu/data/eml/files/
 
*    (EDDTable FromEMLBatch sadece) Filename regex?
EML dizinindeki istenen EML dosyalarını tanımlamak için kullanılan düzenli ifade girin.
Örneğin: knb-lter-sbc bo.
* Mevcut durumlarda yerel dosyaları kullanın (Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek|Sahte sahte yanlış) ??
Mevcut yerel EML dosyalarını ve veri dosyalarını kullanmak için gerçek girin, eğer varlarsa.
EML dosyalarını ve/veya veri dosyalarını her zaman yeniden indirmek için yanlış girin.
* erişilebilir erişilebilir erişilebilir erişilebilir To?
Yeni veri setlerinin özel veri setleri olmasını istiyorsanızERDDAPAma grubun adını belirtin (s) Bu erişime izin verilecek.
LTER grupları için önerilen: "lter" artı grubu, e.g., lter Sbc.
Eğer "null" girerseniz, olmayacak&lt;erişilebilir erişilebilir erişilebilir erişilebilir To&gt; çıktıda etiket.
See See See See[erişilebilir erişilebilir erişilebilir erişilebilir To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To To](/docs/server-admin/datasets#accessibleto).
* yerel yerel yerel yerel yerel yerel TimeZone (e.g., ABD/Pacific) ??
Bir zaman değişkeni yerel zaman değerlerine sahip olduğunu gösterirse, bu zaman bölgesi tayin edilecektir.
Bu, değer olmalıdır.[TZ sütun listesi zaman bölgesinin isimleri](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).
Listenin sonunda tüm kolay kullanım "US/..." isimleri.
Daha sonra bunun yanlış olduğunu bulursanız, değiştirebilirsiniztime\\_zoneIn the chunk of thedatasets.xml.

EML artıERDDAP™Büyük bir kombinasyondur, çünkü o zamandan beriERDDAP™Kullanıcılara daha doğrudan erişim sağlayabilir[Biocomplexity için Bilgi Ağı (KNB) ](https://knb.ecoinformatics.org/)ve[Uzun Dönem Ekolojik Araştırmalar (LTER) ](https://lternet.edu/)Veriler ve bu projeler ABD hükümeti ile tanışmalarına yardımcı oluyor[Araştırma Sonuçlarına Kamu Erişimi (PARR) gereksinimlerini gerektirir](https://nosc.noaa.gov/EDMC/PD.DSP.php)Bir web hizmeti aracılığıyla mevcut verileri yaparak. Ayrıca, EML artıERDDAP™Bilim insanları arasında akademik / NSF finanse edilen alanda ve federal ajanslarda büyük bir köprü gibi görünüyor. (NOAANASA, USGS) Uzay.

Görmemize bakın[Bölüm almak için ek destek](/docs/intro#support).
 
## Tasarım Detayları{#design-details} 

İşte EDDTableFromEML seçeneğinin GenrateDatasetsX ml tasarım detayları.
Bazıları EML ve EML'nin nasıl farkları ile ilgilidir.ERDDAP™Şeyler ve GenrateDatasets nasıl yapılır X ml bu sorunlarla ilgilenir.

### One dataTable Becomes OneERDDAP™Dataset{#one-datatable-becomes-one-erddap-dataset} 
Bir EML dosyası birden fazla olabilir&lt;Data data data data data data Masa&gt;s.ERDDAP™Bir tane yaparERDDAP™EML dataTable başına veri kümesi. The The The The The The The ThedatasetIDVeri kümesi için
 *EMLName* \\_t *MasaNumber*   (EMLname metin olduğunda) veya
 *system\\_EMLName* \\_t *MasaNumber*   (EMLname bir numara olduğunda) .
Örneğin, dosyadaki tablo #1 knb-lter-sbc.28, olurERDDAP™ datasetID=knb\\_lter\\_sbc\\_28\\_t1,
     
### EML ile karşılaştırıldığında{#eml-versus-cfacdd} 
EML dosyalarındaki metadata'nın hemen hepsi içine girerERDDAPAma farklı bir formatta.ERDDAP™Kullanımı kullanır[CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)ve[ACDDDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)metadata standartları. Global metadata ve her değişkenin metadata için anahtar değer çiftleri kullanan tamamlayıcı metada sistemlerdir.
Evet, metadata'nın EML gösterimi, CF+ACD gösteriminden daha güzel. EML için bir yedek olarak CF+ACDD gösterimini kullanmayı önermiyorum. Lütfen EML dünyadan EML dünyaya köprünün bir parçası olarak CF+ACDDD'yi düşününOPeNDAP/CF/ACD dünya.
     
### Küçük Değişiklikler{#small-changes} 
ERDDAP™Birçok küçük değişiklik yapar. Örneğin,ERDDAP™EML'yi olmayan kullanırDOIAlternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif alternatif Identifier artı bir veriTable numarası olarakERDDAP™ datasetIDAma biraz değişiklik alternatif Bunu çoğu bilgisayar dilinde geçerli bir değişken adı haline getirmek için Identifier, e.g., knb-lter-sbc.33 data Masa #1 knb\\_lter\\_sbc\\_33\\_t1 olur.
     
### DocBook{#docbook} 
EML, DocBook'un işaret sistemini EML dosyalarında metin bloklarını oluşturmak için kullanır. CF ve ACD, metadata'nın düz metin olmasını gerektirir. Yani GenrateDatasets X ml, metnin formatlı versiyonu gibi görünen düz metine işaret ediyor. İnline etiketleri, meydan paraları, e.g ile cezalandırılır.\\[vurguladı vurgu vurguladı\\]Ve düz metinde kaldı.
     
### Data Files{#data-files} 
EML dataTable gerçek veri dosyasının URL'sini içerdiğinden, GenerateDatasets X ml olacak:
1. Veri dosyasını indirin.
2. EML dosyası olarak aynı dizide saklayın.
3. Verileri okuyun.
4. EML'deki verilerin dosyadaki gerçek verilerle tanımlanması.
5. GenrateDatasets X ml farklılıkları bulur, onlarla ilgilenir veya farkların tamam olup olmadığını operatörden sorar veya bir hata mesajı döndürür. Detaylar aşağıda çeşitli öğelerdedir.
         
### .zip'd Data Files{#zipd-data-files} 
Referanslı veri dosyası ise bir.zipDosya, sadece bir dosyayı içermelidir. Bu dosya için kullanılacakERDDAP™dataset. 1 dosyadan daha fazlası varsa.ERDDAP™Bu veri kümesini reddedecektir. Gerekirse, bu değiştirilebilir. (Pratikte, tüm SBC LTER zip dosyaları sadece bir veri dosyasına sahiptir.)   
     
### DepolamaType{#storagetype} 
Bir sütunun depolama alanı Tip belirtilmez,ERDDAP™Veri dosyasındaki verilere dayanarak en iyi tahminini kullanır. Bu oldukça iyi çalışır.
     
### Birimler Birimler{#units} 
ERDDAP™kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım[UDUNITSBirimler için formatlama](https://www.unidata.ucar.edu/software/udunits/). GenrateDatasets X ml EML birimlerini EML birimlerini dönüştürmekUDUNITSZamanın yaklaşık% 95'i temizliyor. Kalan% 5 sonuçları birimlerin okunabilir bir açıklaması, e.g., "biyomsDensityUnitPerAbmentsceUnit" in EML, "biyomlar yoğunluğu birim başına" gelir.ERDDAP. Teknik olarak bu izin verilmez. Koşulların altında bu kadar kötü olduğunu düşünmüyorum.\\[Gerekirse, yapılabilecek birimler yapılabilirUDUNITSUyumlu değişkenin yorum özelliklerine taşınabilir.\\]  
     
### EML version 2.1.1{#eml-version-211} 
EML v2.1.1 dosyaları için bu destek GenerateDatasets eklendi X ml 2016 yılında EML topluluğunda bazı artış olacağını umutla. 2020 itibariyle bu gerçekleşmedi. The The The The The The The TheERDDAP™Geliştiriciler, EML'nin daha yeni versiyonları için destek vermekten mutluluk duyacaktır, ancak yeni özellikler aslında kullanılacaksa. Lütfen e-postaerd.data at noaa.govEML'nin daha yeni versiyonları için destek istiyorsanız ve aslında bu özelliği kullanacaktır.
     

## EML Files ile ilgili sorunlar{#issues-with-the-eml-files} 

Bir yazılım müşterisi olduğunda sorunlara neden olan EML dosyaları ile bazı sorunlar / sorunlar var (EDDTable FromEML seçeneği GenrateDatasetsXML) EML dosyalarını yorumlama / işlemeye çalışır.

* Burada listelenen birkaç konu olmasına rağmen, çoğunlukla küçük, çözülebilir sorunlardır. Genel olarak, EML harika bir sistemdir ve onunla çalışmak benim zevkim olmuştur.
* Bunlar en kötü / en yaygın olarak en az kötü / daha az yaygındır.
* Çoğu, belirli EML dosyalarında küçük sorunlarla ilgilidir (EML'nin hatası değil) .
* Çoğu, EML dosyası veya veri dosyasına basit değişikliklerle düzeltilebilir.
* LTER insanların EML dosyalarının geçerliliğini test etmek için bir EML checker inşa ettikleri için, checker'e ek olabilecek bazı önerileri ekledim.

İşte sorunlar:

### Ayrı Tarih ve Zaman Köşeleri{#separate-date-and-time-columns} 
Bazı veri dosyaları tarih ve zaman için ayrı sütunlar vardır, ancak birleşik tarih + zaman sütunu yoktur. Şu anda, GenrateDatasets X ml bu ayrı sütunlarla bir veri kümesi yaratır, ancak ideal değildir çünkü:

* Veri kümeleri varsa en iyisidirERDDAP™Birleştirilmiş tarih+time sütunu denilen"time".
* Çoğu zaman veri kümesi yüklemezERDDAP™Çünkü,"time"sütun tarihi + zaman verileri yoktur.

İki olası çözüm var:
1. Datafile'de yeni bir sütun eklemek için kaynak veri dosyasını analiz edin (Ve bunu EML'de tarif et) Tarih ve zaman sütunları bir sütuna dönüştürülür. Ardından GenerateDatasets X ml bu yüzden yeni sütunu bulur.
2. Kullanın[Türlü Değişkenler](/docs/server-admin/datasets#script-sourcenamesderived-variables)özelliğiERDDAP™Yeni bir değişken tanımlamak içindatasets.xmlBu, tarihi ve zaman sütunlarını birleştirerek yaratılmıştır. Örneklerden biri özellikle bu durumla ilgilidir.
         
### Inconsistent Column Names{#inconsistent-column-names} 
EML dosyaları veri dosyasının sütunlarını ve isimlerini listeler. Ne yazık ki, gerçek veri dosyasındaki sütun isimlerinden genellikle farklıdır. Normalde, EML dosyasındaki sütun siparişi, veri dosyasında sütun düzeni ile aynı, isimlerin biraz değiştiğine rağmen, her zaman değil. GenrateDatasets X ml sütun isimlerini eşleştirmeye çalışır. Ne zaman yapamaz (hangisi yaygındır) Ama duracaktır, size EML/data dosya adı çiftlerini göster ve doğru bir şekilde uyumlu olup olmadığını sorun. Bir masayı atlatmak için ‘s’ girerseniz, GeneratedDatasetsX ml bir hata mesajı yazdırır ve bir sonraki masaya gidecektir.
Çözüm, veri dosyasındaki sütun isimlerini eşleştirmek için EML dosyasındaki hatalı sütun isimlerini değiştirmektir.
     
### Farklı Köşe Düzeni{#different-column-order} 
EML'nin sütunları veri dosyasında var olduklarından farklı bir şekilde belirlediği birkaç vaka var. GenrateDatasets X ml duracak ve bahislerin tamam olup olmadığını veya veri setinin atılması gerektiğini soracaktır. Eğer atılırsa, sonuçlar dosyasında bir hata mesajı olacak, e.g.:
```
      &lt;-- SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
      datasetID=knb\\_lter\\_sbc\\_17\\_t1
      dataFile=all\\_fish\\_all\\_years\\_20140903.csv
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        SURVEY\\_TIMING        = notes
        NOTES                = survey\\_timing
      --&gt;
```
Çözüm bu EML dosyalarında sütun siparişini düzeltmektir, böylece siparişi veri dosyalarında eşleştirirler.

EML checker, kaynak dosyasında sütunlar ve sütun siparişinin EML dosyasında sütunları ve sütun siparişini eşleştirdiğini kontrol etti.
    
### Incorrect numHeaderLines{#incorrect-numheaderlines} 
Çeşitli veriler Masalar yanlış durumda numHeaderLines =1, e.g., ...sbc.4011. Bu nedenlere sebep olurERDDAP™İlk veri çizgisini sütun isimleri olarak okumak. Tüm bu dataTables'in tamamını manuel olarak SKIP'ye çalıştım. Açıklar çünkü eşsiz kaynak kol isimleri tüm veri değerleridir. Ve eğer yanlış bir şekilde numHeaderLines=0 olan dosyalar varsa, sistemim bunu açık yapmaz. İşte SBC LTER başarısızlık dosyasından bir örnek:
```
      &lt;-- SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
       datasetID=knb\\_lter\\_sbc\\_3017\\_t1
      dataFile=MC06\\_allyears\\_2012-03-03.txt
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        2008-10-01T00:00     = timestamp\\_local
        2008-10-01T07:00     = timestamp\\_UTC
        2.27                 = discharge\\_lps
        -999.0               = water\\_temperature\\_celsius
      --&gt;
```
Yani hata GenerateDatasets olarak görünebilir X ml, dosyadaki verilerle ilk çizginin dosyada olduğunu düşünüyor (e.g., 2008-10-01T00:00 vs.) sütun isimleri ile çizgidir (2008-10-01T00:00 bir sütun adı olsaydı) .

EML checker numHeaderLines değerini kontrol ederse güzel olurdu.
    
### numHeaderLines = 0{#numheaderlines--0} 
Bazı kaynak dosyalarının sütun isimleri yoktur.ERDDAP™EML'nin aynı sütun sayısını tanımladığını kabul edin.

Benim görüşüme göre: bu çok tehlikeli görünüyor. Farklı bir sırayla sütunlar olabilir veya farklı birimlerle (Aşağıdaki aşağıda bakınız) Ve bu sorunları yakalamak için bir yol yoktur. Tüm ASCII veri dosyalarının sütun isimleri ile sıraya sahip olması çok daha iyidir.
    
### DateTime Format Strings{#datetime-format-strings} 
EML tarih zaman formatlarını tanımlamak için standart bir yol vardır. Ancak EML dosyalarında kullanımında önemli bir varyasyon var. (Bu konuda daha önce yanlışdım. EML dokümanını formatString için görüyorum ki bu da maça çıkıyor[JavaTarihTimeFormatter spesifikasyon](https://docs.oracle.com/javase/8/docs/api/index.html?java/time/format/DateTimeFomatter.html)Ancak kullanımı hakkında önemli yönergeleri eksik olan, bu formatString'in genellikle / genellikle uygunsuz olarak kullanılmasıdır.) Yanlış vaka ile birkaç örnek vardır ve / veya bir mektubun yanlış çoğaltılması ve / veya standart olmayan formatlama. Bu, müşteriler için güvenilmez bir yük sağlar, özellikle GenrateDatasetsX ml gibi yazılım müşterileri. GenrateDatasets X ml, EML dosyalarındaki yanlış tanımlanmış formatları EML dosyalarına dönüştürmeye çalışır
[Tarih/zaman formatı,ERDDAP™Gereklilik gerektirir](/docs/server-admin/datasets#string-time-units)Ama bu neredeyse aynıJava/Joda zaman formatı spesifikasyonu, ancak biraz daha affedicidir.

EML checker'in sıkı bir bağlılık gerektirdiği güzel olurduJava/Joda /ERDDAPZaman birimleri, veri masasındaki tarih zaman değerlerinin belirtilen formatla doğru şekilde parslenebilir ve doğrulanabilir.
    
### DateTime Ama No Time Zone{#datetime-but-no-time-zone} 
GenrateDatasets X ml, tarihle bir sütun için görünüyor Zaman ve belirli bir zaman bölgesi (Ya daZulu: Zaman birimleri 'Z' veya bir sütun adı veya özellik tanımı "gmt" veya "utc" veya yerel: sütun adı veya özellik tanımında "yerel" veya yerel:) . Ayrıca kabul edilebilir bir tarih sütunu ile bir dosyadır, ancak zaman sütunu yoktur. Ayrıca kabul edilebilir bir dosya tarih veya zaman bilgisi ile değildir.

GenrateDatasets X ml, belirli bir dosya, e.g. için SBC LTER için belirtebileceğiniz zaman bölgesinden olduğu gibi tüm "yerel" zamanlarda davranır. Bilgi bazen yorumlardadır, ancak bir bilgisayar programı için anlaşılabilmesi kolaydır.

Bu kriterle tanışmayan dosyalar “NO GOOD DATE (Saat) VARIABLE.” Ortak sorunlar şunlardır:

* Zamanlı tarihler ve bir sütun ile bir sütun var, ancak tarih değil Zaman sütunu.
* Zaman birimleri var, ancak zaman bölgesi belirtilmemiş.

Diğer yorumlar:
Zaman bölgesi sütunu ile iyi bir tarih + zamanı varsa, o sütun adlandırılacaktır"time"in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in inERDDAP.ERDDAP™Bu zaman sütun verileri anlaşılabilir / anlaşılır olmalıdırZulu/UTC/GMT zaman bölge tarihiTimes.\\[Benim inancım: yerel zamanlarda ve farklı tarih/zaman formatlarını kullanarak (2 dijital yıl&#33; mm/dd/yy vs dd/mm/yy vs...) Veri dosyaları, son kullanıcıyı karmaşık dönüşümler yapmak için zorlaştırırZuluVerileri başka bir veri ile karşılaştırmak için zaman. Bu yüzdenERDDAP™Tüm zaman verilerini standartlaştırıyor: Zaman için,ERDDAP™ISO 8601'i her zaman kullanır:2004 (E) Standart format, örneğin, 1985-01-02T00:00Z. numeric zamanlar için,ERDDAP™Her zaman her zaman kullanır"seconds since 1970-01-01T00:00:00Z".ERDDAP™Her zaman kullanırZulu  (UTC, GMT) Zaman Bölgesi farklı zaman bölgeleri ve günlük ışık tasarrufu zamanı karşı standart zamanlarla çalışmanın zorlukları ortadan kaldırmak için. Yani GenrateDatasets X ml, tarih+time ile bir EML dataTable sütunu arıyorZulu. Bu zor çünkü EML resmi bir kelime/sistem kullanmıyor (Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like[Java/Joda zaman formatı](https://www.joda.org/joda-time/apidocs/org/joda/time/format/DateTimeFormat.html)) Verileri belirtmek için Zaman formatı:
Eğer sayısal zaman değerleri ile bir kol varsa (E.g.,MatlabZaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman) veZuluZaman Bölgesi (Ya da sadece tarihler, zaman sütunları ile) , olarak kullanılır"time".
Tarih ve zaman verileri ile bir kol varsa, kullanarakZuluZaman bölgesi, olarak kullanılır"time"Ve başka bir tarih veya zaman sütunu kaldırıldı.
Sadece tarih bilgisi olan bir kol bulunursa, bu olarak kullanılır"time"değişken değişken değişken değişken değişken (Hiçbir zaman bölge ile) .
Bir veri sütunu ve bir zaman sütunu varsa ve bir tarih tarihi yok Zaman sütunu, veri kümesi REJECTED'dir - ancak veri seti birleşik bir tarih ekleyerek kullanılabilir. Zaman sütunu (tercihen,ZuluZaman bölgesi) Datafile'e ve EML dosyasında açıklamasını ekledi.
SBC LTER'dan EXAMPLE:[ https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/ ](https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/)dataTable #2.

EML/LTER'in bir sütunun dahil edilmesi gerektiğinde güzel olurduZulu  (UTC, GMT) Tüm ilgili kaynak veri dosyalarında zaman bölgesi zamanı. Bir sonraki en iyisi EML'ye bir sistem eklemektime\\_zoneStandart isimleri kullanarak özellikler (Bundan sonra[TZ sütun](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)) .
    
### Eksikliği Eksikliği Eksikmissing\\_value {#missing-missing_value} 
Bazı sütunlar bir tane kullanırmissing\\_valueAncak EML metadata, e.g., yağış\\_mm in knb-lter-sbc.5011 kullanımları -999. EML'de eksik bir değer belirtilmemişse, GenrateDatasetsX ml otomatik olarak ortak eksik değerler için aramalar (e.g., 99, -99, 999, -999, 9999, -99) Ve o metadata yaratır. Ama diğer eksikmissing\\_values yakalanır.

EML checker eksik görünüyordu güzel olurdumissing\\_values.
    
### Küçük sorunlar{#small-problems} 
Birçok küçük sorun var (Büyü,) Bu muhtemelen sadece her veri kümesini bir insan tarafından bulunacaktır.

EML checker büyü ve grammatik hataları ararsa güzel olurdu. Bu zor bir problem çünkü bilimdeki kelimeler genellikle büyü kontrolleri tarafından bayraklanır. İnsan düzenlemesi muhtemelen gereklidir.
    
### Invalid Unicode Karakterleri{#invalid-unicode-characters} 
EML içeriğinden bazıları geçersiz Unicode karakterleri içerir. Bunlar muhtemelen yanlışlıkla kopyalanan ve UTF-8 EML dosyalarına geçmiş olan Windows karset'ten karakterlerdir. GenrateDatasets X ml bu karakterleri e.g'e yükseltti.\\[#128\\]Bu yüzden aramaları kolaydırERDDAP™ datasets.xmlDosya.

EML checker bunu kontrol ederse güzel olurdu. düzeltmek ve kolay bulmak kolaydır.
    
### Farklı Köşe Birimleri] (#farkColumnUnits)  {#different-column-unitsdifferentcolumnunits} 
Bazı EML dataTables, veri dosyasındaki sütunlarla çelişen sütunları tanımlar, özellikle de farklı birimleri vardır. GenrateDatasets X ml bunları bayraklar. Farkların tamam olup olmadığına karar vermek için operatöre kadar. Bunlar "SKIPPED" veriTables olarak başarısızlık dosyasında görünüyor. SBC LTER başarısızlık dosyasında EXAMPLE:
```
      < SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
       datasetID=knb\\_lter\\_sbc\\_3\\_t1
      dataFile=SBCFC\\_Precip\\_Daily\\_active\\_logger.csv
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        Daily\\_Precipitation\\_Total\\_mm = Daily\\_Precipitation\\_Total\\_inch
        Flag\\_Daily\\_Precipitation\\_Total\\_mm = Flag\\_Daily\\_Precipitation\\_Total\\_inch
      -->
```
EML checker, birimlerin eşleşmesini kontrol ettiğinde güzel olurdu. Ne yazık ki, bu muhtemelen veri kümesi yaratıcısıyla temas etmeden çözmek imkansızdır, kaynak dosyasının birimleri içermediğini verilen. Yukarıdaki örnek için diskrepancy sadece fark edildi çünkü birimler kaynak sütun adı ve EML sütun adına dahil edildi. Diğer birçok veriTables'in bu sorunu var ama tespit edilemez mi?
    
### EML'nin farklı versiyonları{#different-versions-of-eml} 
GenrateDatasets X ml EML 2.1.1 ile çalışmak için tasarlanmıştır. EML'nin diğer versiyonları, 2.1.1 ile eşleştirdikleri veya GenerateDatasetsX ml'in bununla başa çıkmak için özel koda sahip olacağı ölçüde çalışacaktır. Bu nadir bir problem. Oluşturulduğunda, çözüm dosyalarınızı EML 2.1.1'e dönüştürmek veya EML dosyasını EML dosyasını EML dosyasına göndermektir.erd.data at noaa.govBu yüzden GenrateDatasets için değişiklikler yapabilirim X ml farklarla uğraşmak.

Bob, EML dosyaları için GenrateDatasets için destek ekledi X ml 2016 yılında EML topluluğunda bazı artış olacağını umutla. 2020 itibariyle bu gerçekleşmedi. Bob, EML'nin daha yeni versiyonlarına destek vermekten mutluluk duyuyor, ancak yeni özellikler aslında kullanılacaksa. Lütfen e-postaerd.data at noaa.govEML'nin daha yeni versiyonları için destek istiyorsanız ve aslında bu özelliği kullanacaktır.
    
### Data File'i Sorun{#trouble-parsing-the-data-file} 
Nadiren, bir dataTable hatayla reddedilebilir “önemli sayıda öğeyi #120 (gözlem=52, beklenen=50) " " "" Bu gibi bir hata mesajı, datafile'deki bir çizginin diğer hatlardan farklı sayıda değere sahip olması anlamına gelir. Bu bir problem olabilirERDDAP™  (e.g., dosyayı doğru bir şekilde ifade etmiyor) veya dosyada. SBC LTER'dan EXAMPLE:
[ https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/ ](https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/)dataTable #3, datafile=LTER\\_ayly\\_bottledata\\_rolled\\_stations\\_20140429.txt
