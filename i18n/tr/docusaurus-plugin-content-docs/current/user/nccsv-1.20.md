---
title: "NCCSV 1.20"
---

# NCCSV -
A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A NetCDF -Compatible, UTF-8, CSV Dosya tanımı,
Version 1.20

Bob Simons ve Steve Hankin
"NCCSV" Bob Simons ve Steve Hankin lisansı altında [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) 

##  [Giriş Giriş](#introduction)  {#introduction} 

Bu belge, tüm bilgileri içeren UTF-8 CSV metin dosyası formatına işaret eder. (metadata ve veri) Bu bir yerlerde bulunabilir NetCDF   .nc Bir CSV benzeri bir veri masası içeren dosya. Bu spesifikasyonu takip eden UTF-8 CSV dosyası için dosya uzatması .csv olması gerekir, böylece Excel ve Google Dokümanlar gibi tablo programları kolayca ve doğru şekilde okuyabilirsiniz. Bob Simons, NCCSV dosyasını bir NCCSV dosyasına dönüştürmek için yazılım yazacaktır NetCDF -3 (Ve belki de aynı zamanda NetCDF -4)   .nc Dosya ve tersine, bilgi kaybı ile. Bob Simons değiştirilmiş [ ERDDAP™ ](https://coastwatch.pfeg.noaa.gov/erddap/index.html) Bu tür dosyayı okumak ve yazmak.

NCCSV formatı tasarlanmıştır, bu yüzden Excel ve Google Dokümanlar gibi tablo yazılımı, bir csv dosyası olarak NCCSV dosyasını bir csv dosyası olarak ithal edebilir, tüm elektronik tablodaki hücreler düzenlemeye hazır. Ya da, NCCSV kongrelerini takip eden çizilebilir. spread tablosunun kaynağı ne olursa olsun, o zaman bir .csv dosyası olarak ihraç edilirse, NCCSV özelliklerine uygun olacaktır ve hiçbir bilgi kaybolmayacaktır. NCCSV dosyaları ve bu kongreleri takip eden analog yayılma tablo dosyaları arasındaki tek farklar:

* NCCSV dosyaları komünler tarafından ayrı bir çizgi üzerinde değere sahiptir.
Sayfalar, bitişik hücrelerde bir çizgide değerlere sahiptir.
* NCCSV dosyalarındaki Strings genellikle çift alıntılarla çevrilidir.
Transkriptler asla çift alıntılarla çevrili değildir.
* İç çift alıntı (" " "") NCCSV dosyalarındaki Strings 2 çift alıntı olarak görünüyor.
Orta çift alıntılar 1 çift alıntı olarak görünür.

Görün bakalım, [Sayfa](#spreadsheets) Daha fazla bilgi için aşağıdaki bölüm.

### Akışılabilir{#streamable} 
Genel olarak CSV dosyaları gibi NCCSV dosyaları yayınlanabilir. Böylece, bir NCSV, bir veri sunucusu tarafından, örneğin [ ERDDAP™ ](https://coastwatch.pfeg.noaa.gov/erddap/index.html) Ancak sunucu verileri tüm veriler toplandığından önce talep edene iletmeye başlayabilir. Bu faydalı ve arzu edilen bir özelliktir. NetCDF Dosyalar, aksine, yayınlanmaz.

###  ERDDAP  {#erddap} 
Bu spesifikasyon, NCCSV dosyaları ve the .nc Onlardan oluşturulabilecek dosyalar bir an tarafından kullanılabilir [ ERDDAP™ Data server](https://coastwatch.pfeg.noaa.gov/erddap/index.html)   (aracılığıyla [EDDTable FromNccsvFiles](/docs/server-admin/datasets#eddtablefromnccsvfiles) ve [EDDTable FromNcFiles](/docs/server-admin/datasets#eddtablefromncfiles) Dataset türleri) Ancak bu spesifikasyon dışsaldır ERDDAP . ERDDAP™ Birkaç gerekli küresel niteliklere ve birçok önerilen küresel ve değişkenliğe sahiptir, çoğunlukla CF ve ACD özelliklerine dayanmaktadır (bakınız).
 [/docs /server-admin/datasets #global-attributes](/docs/server-admin/datasets#global-attributes) ).

### Denge dengesi{#balance} 
NCCSV formatının tasarımı birkaç gereksinimlerinin dengesidir:

* dosyalar, bir tabular içinde olacak tüm veri ve metadata içermelidir. NetCDF Özel veri türleri de dahil olmak üzere dosya.
* Dosyalar okunabilmeli ve sonra bilgi kaybı olmadan bir spread tablosundan yazılmalıdır.
* Dosyalar insanlar oluşturmak, düzenlemek, okumak ve anlamak için kolay olmalıdır.
* dosyalar bilgisayar programları tarafından belirsiz bir şekilde parslenebilir.

Bu belgedeki bazı ihtiyaç garip veya seçici görünüyorsa, muhtemelen bu gereksinimlerin birini karşılamak gerekir.

### Diğer Özellikler{#other-specifications} 
Bu spesifikasyon, birlikte çalışmak için tasarlanmış olan diğer çeşitli özelliklere ve kütüphanelere atıfta bulunur, ancak bu spesifikasyon diğer özelliklerin herhangi birinin bir parçası değildir, ne de onlara herhangi bir değişiklik ihtiyacı yoktur. Bu standartların biri ile ilgili bir detay burada belirtilmezse, ilgili özellikleri görün. Elbette, bu şunları içerir:

* Dataset Discovery için Attribute Konvansiyonu (ACDDDD) metadata standardı:
     [https://wiki.esipfed.org/Attribute\\_Convention\\_for\\_Data\\_Discovery\\_1-3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) .
* İklim ve Tahminler (CF) metadata standardı:
     [https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) .
* The The The The The The The The NetCDF Kullanıcı Kılavuzu (NUG) :
     [https:///docs.unidata.ucar.edu/netcdf-java/current/userguide/index.html](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/index.html) .
* The The The The The The The The NetCDF yazılım kütüphaneleri gibi NetCDF -java ve NetCDF -c:
     [https://www.unidata.ucar.edu/software/netcdf/](https://www.unidata.ucar.edu/software/netcdf/) . Bu kütüphaneler NCCSV dosyalarını okuyamıyor, ancak okuyabiliyorlar .nc NCCSV dosyalarından oluşturulan dosyalar.
* JSON: [https://www.json.org/](https://www.json.org/) 

### Notation{#notation} 
Bu spesifikasyonda, braketler, \\[   \\] 2) Seçmeli eşyaları gösterir.

##  [File Structure](#file-structure)  {#file-structure} 

Tam NCCSV dosyası iki bölümden oluşur: metadata bölümü, veri bölümü tarafından takip edilir.

NCCSV dosyaları herhangi bir UCS-2 karakter içerebilir (i.e., 2bay Unicode karakterleri, sanki içinde Java ) UTF-8 aracılığıyla kodlandı. ERDDAP™ UTF-8 kodlamasını kullanarak NCCSV dosyaları yazıyor ve yazıyor.

NCCSV dosyaları yeni satırları kullanabilir ( \\n )   (Linux ve Mac OS X bilgisayarlarında yaygındır) veya vagonReturn artı yeniline ( \\r\\n )   (Windows bilgisayarlarda yaygındır) Son satır işaretleri olarak, ama ikisi de değil.

###  .nccsv Metadata{#nccsvmetadata} 
Hem yaratıcı hem de okuyucu bunu beklerken, aynı zamanda sadece metadata bölümü içeren bir NCCSV dosyasının bir kopyasını yapmak da mümkündür. (Ayrıca dahil olmak üzere\\*END\\_METADATA\\*line line line line line line) . Sonuç, dosyanın özellikleri, değişken isimleri ve veri türleri hakkında tam bir açıklama sağlar, böylece .das artı .dds yanıtları ile aynı amaca hizmet eder. OPeNDAP sunucu. ERDDAP™ Dosya talep ederseniz bu varyasyonu geri dönecektir Tipi = .nccsv Metadata'dan ERDDAP™ dataset.

##  [Metadata Bölüm](#the-metadata-section)  {#the-metadata-section} 

NCCSV dosyasında, metadata bölümün her satırı formatını kullanır
 [değişken değişken değişken değişken değişken Name Name Name Name Name Name Name Name Name Name Name](#variablename) , [Özellikler Name Name Name Name Name Name Name Name Name Name Name](#attributename) , [değer1](#value)  \\[ ,value2 \\]  \\[ ,value3 \\]  \\[ ,value4 \\]  \\[ ... \\]   
Kitaplardan önce veya sonra uzaylar izin verilmez, çünkü dosyayı elektronik tablo programlarına ithal ederken sorunlara neden olurlar.

### Sözleşmeler{#conventions} 
Bir NCCSV dosyasının ilk satırı metadata bölümünün ilk satırıdır ve bir NCCSV dosyasına sahip olmalıdır. [\\*GLOBAL GLOBAL GLOBAL\\*](#global) Konvansiyonlar, örneğin bir CSV listesi içeren bir String olarak dosyada kullanılan tüm kongreleri listelemektedir:
\\*GLOBAL GLOBAL GLOBAL\\*,Konventions" COARDS CF-1.6, ACD-1.3, NCCSV-1.2"
Listelenen kongrelerden biri NCCSV-1.2 olmalıdır, bu spesifikasyonun mevcut versiyonuna atıfta bulunur.

### Sonunda Metadata{#end-metadata} 
Bir NCCSV dosyasının metadata bölümünün sonu sadece bir çizgi ile belirtilmelidir
\\*END\\_METADATA\\*

Bu tavsiye edilir, ancak verilen bir değişken için tüm özelliklerin metadata bölümünün bitişik hatlarında görünmesini gerektirmez. Bir NCCSV dosyası bire dönüştürülürse NetCDF Dosya, değişkenNames'in ilk olarak metadata bölümünde ortaya çıkardığı sipariş, değişkenlerin değişkenleri sırayla olacaktır. NetCDF Dosya.

Seçmeli boş çizgiler gerekli ilk çizgi ile gerekli olan metadata bölümünde izin verilir [\\*GLOBAL GLOBAL GLOBAL\\*](#global)   [Sözleşmeler](#conventions) Bilgi Bilgileri (Aşağıdaki aşağıda bakınız) Ve gerekli son çizgiden önce\\*END\\_METADATA\\*.

Bir NCCSV dosyasından bir elektronik tablo oluşturulursa, metadata veri bölümü sütun A'daki değişken isimlerle görünecek, sütun B'deki özellikler ve sütun C.

Bu kongreleri takip eden bir yay sayfası bir CSV dosyası olarak kurtarılırsa, genellikle metadata bölümündeki hatların sonunda ekstra komün olacaktır. NCCSV dosyalarını dönüştüren yazılımlar, .nc dosyalar ekstra komünleri görmezden gelecektir.

###  [değişken değişken değişken değişken değişken Name Name Name Name Name Name Name Name Name Name Name](#variablename)  {#variablename} 

 *değişken değişken değişken değişken değişken Name Name Name Name Name Name Name Name Name Name Name* Veri dosyasında değişkenin durumu duyarlı adıdır. Tüm değişken isimler 7bit ASCII mektubu veya alt paragraf ile başlamalıdır ve 7bit ASCII mektuplarından oluşur ve 7bit ASCII basamakları.
#### GLOBAL GLOBAL GLOBAL{#global} 
Özel değişkenName [\\*GLOBAL GLOBAL GLOBAL\\*](#global) Küresel metadata ifade etmek için kullanılır.

###  [Özellikler Name Name Name Name Name Name Name Name Name Name Name](#attributename)  {#attributename} 

 *Özellikler Name Name Name Name Name Name Name Name Name Name Name* Bir değişken veya değişken ile ilişkili bir özelliğin durumu duyarlı adı [\\*GLOBAL GLOBAL GLOBAL\\*](#global) . Tüm özellikler isimleri 7bit ASCII mektubu veya alt paragrafla başlamalıdır ve 7bit ASCII mektuplarından oluşur ve 7bit ASCII basamaklarından oluşur.

#### SCALAR{#scalar} 
Özel özellikler Name Name Name Name Name Name Name Name Name Name Name\\*SCALAR\\*Ölçekli bir veri değişkeni oluşturmak ve değerini tanımlamak için kullanılabilir. Veri türü\\*SCALAR\\*Veri tipini değişken için tanımlar, bu yüzden belirtmeyin\\*DATA\\_TYPE\\*Ölçekli değişkenler için özellik. NCCSV dosyasının Data Bölümdeki ölçek değişkenleri için veri olmamalıdır unutmayın.

Örneğin, "Okeanos Explorer" değeri ile bir ölçek değişken oluşturmak ve bir cf\\_role özelliği kullanmak:
Gemi, gemi,\\*SCALAR\\*"Okeanos Explorer"
Gemi,cf\\_role,trajectory\\_id
Bir ölçekleyici veri değişkeni ne zaman okunur ERDDAP™ Ancak ölçek değeri her satırdaki aynı değerle veri masasında bir sütuna dönüştürülür.

###  [değer değeri değer değeri](#value)  {#value} 

 *değer değeri değer değeri* Metadata özelliğinin değeridir ve bir ya da bir aste ile bir dizi olmalıdır, ubyte, kısa, ukı, int, uint, uzun, ulong, yüz, double, String, or char. Başka hiçbir veri türü desteklenmez. Hiçbir değere sahip Attributes göz ardı edilecektir. Bir alt değerden daha fazlası varsa, alt değerlerin hepsi aynı veri türü olmalıdır. Örneğin, Strings'tan başka veri türleri için, MUST değerleri komün tarafından ayrı ayrı ayrıdır:
 sst , actual\\_range ,0.17f,23.58f
Strings için tek bir String kullanın \\n   (Yeniline) Karakterler altları ayırıyor.

Karakter veri türlerinin tanımları şunlardır:

#### Yemin ederim{#byte} 
* Türleme değerleri (8-bit, imzalanan) "b", e.g., -7b, 0b, 7b ile yazılmalıdır. Geçerli değer aralığı -128 to 127. Bir aste gibi görünen bir sayı ama geçersiz (e.g., 128b) Kayıp bir değere dönüştürülecek veya bir hata mesajı üretecektir.
     
#### ubay{#ubyte} 
* ubyte özellikleri değerleri (8-bit, yeminsiz) Suffix 'ub', e.g., 0ub, 7ub, 250ub ile yazılmalıdır. Geçerli değer aralığı 0 to 255. Bir ubay gibi görünen bir sayı ama geçersiz (E.g., 256ub) Kayıp bir değere dönüştürülecek veya bir hata mesajı üretecektir. Mümkün olduğunda, ubay yerine kullanın, çünkü birçok sistem imzalanmamış Bytes'i desteklemiyor (e.g., nitelikler in NetCDF -3 dosyaları) .
     
#### Kısa kısa kısa kısa{#short} 
* kısa özellik değerleri (16-bit, imzaladı) Suffix 's', e.g., -30000s, 0s, 30000s ile yazılmalıdır. Geçerli kısa değerlerin aralığı -32768 ila 32767. Kısa gibi görünen bir sayı ama geçersiz (E.g., 32768s) Kayıp bir değere dönüştürülecek veya bir hata mesajı üretecektir.
     
#### Burn{#ushort} 
* Altmış özellik değerleri (16-bit, unsigned) Suffix 'us', e.g., 0us, 30000us, 60000us ile yazılmalıdır. Geçerli kısa değerlerin aralığı 0 ila 65535. Altmış gibi görünen bir sayı ama geçersiz (E.g., 65536us) Kayıp bir değere dönüştürülecek veya bir hata mesajı üretecektir. Mümkün olduğunda, u 6: yerine kısa kullanın, çünkü birçok sistem imzalanmamış Bytes'i desteklemiyor (e.g., nitelikler in NetCDF -3 dosyaları) .
     
#### Yemin ederim{#byte-1} 
* Int attributes values (32-bit, imzaladı) JSON ints without a decimal point or exponent, but with the suffix 'i, e.g., -12067978i, 0i, 12067978i. Geçerli değer aralığı -2147483648 to 2147483647. Bir int gibi görünen bir sayı ama geçersiz (E.g., 21474836) Kayıp bir değere dönüştürülecek veya bir hata mesajı üretecektir.
     
#### Uint{#uint} 
* Uint özellikleri değerleri (32-bit, unsigned) JSON ints without a decimal point or exponent, but with the suffix 'ui', e.g., 0ui, 12067978ui, 47479ui. Geçerli değer aralığı 0 ila 4294967295. Bir uint gibi görünen bir sayı ama geçersiz (E.g., 21474836) Kayıp bir değere dönüştürülecek veya bir hata mesajı üretecektir. Mümkün olduğunda, uint yerine int kullanın, çünkü birçok sistem imzalanmamış Bytes'i desteklemiyor (e.g., nitelikler in NetCDF -3 dosyaları) .
     
#### Uzun uzun uzun uzun uzun uzun{#long} 
* Uzun öznitelik değerleri (64-bit, şu anda NUG tarafından desteklendi ve ERDDAP™ Ancak henüz CF tarafından desteklenmedi) Bir decimal noktası olmadan yazılmalıdır ve "L", e.g., -7479854321L, 0L, 747987654321L. Bir NCCSV dosyasını uzun değerlere dönüştürmek için dönüştürme yazılımı kullanıyorsanız NetCDF -3 dosya, her uzun değer çifte değere dönüştürülecektir. Geçerli uzun değerlerin aralığı -9223372036854775808 9223372036854775807. Uzun gibi görünen bir sayı ama geçersiz (E.g., 9223372036854808L) Kayıp bir değere dönüştürülecek veya bir hata mesajı üretecektir. Mümkün olduğunda, ulong yerine çift kullanın, çünkü birçok sistem uzun sürmez (E.g., NetCDF -3 dosyaları) .
     
#### Ulong{#ulong} 
* Ulong öznitelik değerleri (64-bit, unsigned, şu anda NUG tarafından desteklendi ve ERDDAP™ Ancak henüz CF tarafından desteklenmedi) Bir decimal noktası olmadan yazılmalıdır ve suffix 'uL', e.g., 0uL, 747987654321uL, 9007199254740992uL. Bir NCCSV dosyasını uzun değerlere dönüştürmek için dönüştürme yazılımı kullanıyorsanız NetCDF -3 dosya, her uzun değer çifte değere dönüştürülecektir. Geçerli uzun değerlerin aralığı 0 to 18446744073709551615. Bir ulong gibi görünen bir sayı ama geçersiz (e.g., 184467440737095516uL) Kayıp bir değere dönüştürülecek veya bir hata mesajı üretecektir. Mümkün olduğunda, ulong yerine çift kullanın, çünkü birçok sistem imzalanmış veya imzalanmamış uzun süre desteklemiyor (E.g., NetCDF -3 dosyaları) .
     
#### yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz yüz{#float} 
* yüz özellikleri değerleri (32-bit) Suffix 'f' ile yazılmalıdır ve bir decimal noktası ve / veya bir exponent, e.g., 0f, 1f, 12.34f, 1e12f, 1.23e+12f, 1.23e12f, 1.87E-7f. Bir yüz için NaNf kullanın NaNf (Eksik eksik eksik eksik eksik eksik) değer. Yüzlerin aralığı yaklaşık +/-3.40282347E+38f (~7 önemli decimal basamak) . Bir yüz gibi görünen bir sayı ama geçersiz (E.g., 1.0e39f) Kayıp bir değere dönüştürülecek veya bir hata mesajı üretecektir.
     
#### çift çift çift çift çift çift çift çift{#double} 
* çift özellik değerleri (64-bit) Suffix 'd' ile yazılmalıdır ve bir decimal noktası ve / veya bir exponent, e.g., 0d, 1d, 12.34d, 1e12d, 1.23e+12d, 1.23e12d, 1.87E-7d. Bir çift NaNd için NaNd kullanın (Eksik eksik eksik eksik eksik eksik) değer. Çiftlerin aralığı yaklaşık +/-1.79769313486231570E+308d (-15 önemli decimal basamak) . Çift gibi görünen bir sayı ama geçersiz (E.g., 1.0e309d) Kayıp bir değere dönüştürülecek veya bir hata mesajı üretecektir.
     
#### String{#string} 
* String özellikleri değerleri UCS-2 karakterlerinin bir dizisidir (i.e., 2bay Unicode karakterleri, sanki içinde Java ) JSON benzeri dizeler olarak yazılmalıdır.
    * Çift alıntı (" " "") Bir String değeri içinde iki çift alıntı olarak kodlanmalıdır. ("") . Bu, tablo programları .csv dosyalarını okuduğunuzda gerektirir. Bu, tablo programları bir .csv dosyası olarak yaydığınızda yazılacak.
    * Özel JSON arkaslash-encoded karakterleri bir String değeri içinde JSON olarak kodlanmalıdır (muhtemelen değil). \\n (newline), \\ (backslash), Žf (formfeed), Žt (tab), Žr (karriage return) veya ile birlikte) [. *hhhh* ](#uhhhh) Kelimeler. Bir spread sayfasında, Alt'ı bir metin hücresinde yeni bir çizgi belirtmek için kullanmayın; bunun yerine, kullanmak \\n   (2 karakter: backslash ve 'n ‘ ‘ ‘) Yeni bir çizgi göstermek için.
#####  uhhhh  {#uhhhh} 
    * Diğer tüm karakterler karakterden daha az #32, sözcülerle kodlanmalıdır. *hhhh* Ama hhhh karakterin 4 dijital hexadecimal numarasıdır.
    * Tüm yazdırılabilir karakterler karakter #126, e.g., Euro işareti, kodlanmamış görünebilir, e.g., € (Euro karakteri) , ya da kodlanmış [. *hhhh* ](#uhhhh) Kelimeler, e.g., Žu20AC. Kod sayfalarını referans olarak görün [https://en.wikipedia.org/wiki/Unicode](https://en.wikipedia.org/wiki/Unicode) Belirli Unicode karakterleri ile ilişkili hexadecimal sayılarını bulmak veya bir yazılım kütüphanesi kullanmak. Not that some some some ERDDAP™ Çıktı dosyası türleri, e.g., .csv, ISO 8859-1 karakter setini kullanın, bu veri değerlerinin bu dosya türleriyle yazıldığında Unicode karakterleri kaybolur.
    * Tüm basılı olmayan karakterler karakter #126'den daha büyük, e.g., karakter #127, STRONGLY DISCOURAGED, ama sen SHOULD 4.99uu *hhhh* Eğer bunları içeriyorsan sözcüler.
    * Eğer String'in başlangıçta veya sonunda bir alanı varsa veya " (çift alıntı) veya bir komün, veya başka bir veri türü olarak yorumlanacak değerleri içerir (E.g., bir int) Ya da "null" kelimesi, tüm String çift alıntılarda kapalı olmalıdır; aksi takdirde JSON'un aksine, çift alıntılar isteğe bağlı. Biz tavsiye ederiz: şüphe içinde tüm String'i çift alıntılarda kapat. Bir String'in başında veya sonundaki uzaylar güçlü bir şekilde cesaretiniz.
         
#### hayır{#char} 
* Kar özellikleri değerleri tek bir UCS-2 karakteridir (i.e., 2bay Unicode karakterleri, sanki içinde Java ) . Yazdırılabilir karakterler (Yeniline gibi özel karakterlerden başka, ", ', ve 4.99) olarak yazılabilir. Özel karakterler (E.g., newline) Ve diğer güvenilmez karakterler (E.g., #127) Yazılmalı [. *hhhh* ](#uhhhh) Kelimeler. Char özellikleri değerleri tek alıntılarda kapalı olmalıdır (İç alıntılar) ve çift alıntılar (Dış alıntılar) E.g., "'a", "" (Çift bir alıntı karakteri) ""Lo" (Tek bir alıntı karakteri) "'Lot" (Bir sekme) "'Lou007F" (The delete 'character ‘ ‘ ‘) Ve " €" (Euro karakteri) . Bu tek ve çift alıntıyı kullanmanın sistemi garip ve cumbersome, ancak yayranlarla çalışan bir şekilde Strings'ten kar değerlerini ayırt etmenin bir yoludur. Bir kömür gibi görünen bir değer ama geçersiz bir hata mesajı üretecektir. Not that some some some ERDDAP™ Çıktı dosyası türleri, e.g., .csv, ISO 8859-1 karakter setini kullanın, bu veri değerlerinin bu dosya türleriyle yazıldığında Unicode karakterleri kaybolur.

### Suffix{#suffix} 
NCCSV dosyasının özellikleri bölümünde, tüm sayısal özelliklerin değerlerinin bir ek mektubu olması gerektiğini unutmayın. (E.g., 'b') numeric veri tipini tanımlamak için (E.g., bytete) . Ancak NCCSV dosyasının veri bölümünde, sayısal veri değerleri asla bu ek mektuplara sahip olmamalıdır ("L" uzun tamsayılar ve "uL" ulong tamsaları için) - veri türü,\\*DATA\\_TYPE\\*Değişken için özellik.

### Data Type{#data-type} 
Her olmayan için veri türü [scalar](#scalar) Bir değişkenin belirtilmesi gerekir\\*DATA\\_TYPE\\*Taklit değeri olan özellikler, ubyte, kısa, ukı, int, uint, uzun, ulong, face, double, String, or char (En hassas durumda) . Örneğin,
qc\\_flag,\\*DATA\\_TYPE\\*,byte
WARNING: Doğruyu söylemek\\*DATA\\_TYPE\\*Sizin sorumluluğunuzdur. Yanlış veri tipini açın (e.g., belirtilmen gereken zaman değil) Bir hata mesajı üretmeyecek ve kaybedilmesi için bilgi neden olabilir (e.g., yüz değerleri ints için yuvarlak olacak) NCCSV dosyası okuduğunuzda ERDDAP™ Ya da bir şeye dönüştürülür NetCDF Dosya.

### Char Discouraged{#char-discouraged} 
Kar veri değerlerinin kullanımı cesaret vericidir çünkü diğer dosya türlerinde yaygın olarak desteklenmemektedir. Kar değerleri tek karakterler veya Strings olarak veri bölümünde yazılabilir. (Özellikle, özel bir karakter yazmanız gerekiyorsa) . Bir String bulunursa, String'in ilk karakteri, karın değeri olarak kullanılacaktır. Sıfır uzunluk Strings ve eksik değerler karaktere dönüştürülecektir ŽuFFFF. Not that Not that Note that Not NetCDF dosyaları sadece tek karları destekle, bu yüzden kardan daha fazla kar #255 yazıya dönüştürülecek mi? NetCDF dosyaları. Bir karset özelliği bir kar değişkeni için farklı bir karset belirtmek için kullanılmazsa, ISO-8859-1 karset kullanılacaktır.

### Long and Unsigned Discouraged{#long-and-unsigned-discouraged} 
Uzun ve imzalanmamış türler Discouraged. Birçok dosya türü olmasına rağmen (E.g., NetCDF -4 ve json) ve ERDDAP™ Uzun destek ve imzalanmamış (ubay, u 6:, uint, ulong) Değerler, NCCSV dosyalarındaki uzun ve imzalanmamış değerlerin kullanımı şu anda cesaret verici çünkü şu anda Excel, CF ve CF tarafından desteklenmezler. NetCDF -3 dosyaları. NCCSV dosyasında uzun veya imzalanmamış değerleri belirtmek istiyorsanız (Ya da ilgili Excel'de) Ancak, suffix 'L'yi kullanmanız gerekir, bu yüzden Excel sayıları daha düşük hassasiyetle yüz yüzen nokta numaraları tedavi etmez. Şu anda, bir NCCSV dosyaları bire dönüştürülürse NetCDF -3 .nc Dosya, uzun ve uzun veri değerleri iki değere dönüştürülecek, çok büyük değerler için hassas bir kaybına neden olacaktır. (Daha az -2.53 uzun veya uzun süre 2 ^53'ten daha fazlası) . In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In NetCDF -3 .nc dosyalar, ubyte, u 6: ve uint değişkenleri aste, kısa ve \\_Unsigned = gerçek metadata özelliği ile görünür. In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In NetCDF -3 .nc dosyalar, ubyte, u 6: ve uint özellikleri aste, kısa ve ilgili iki uygulama değeri içeren özellikler görünür. (e.g., 255ub gibi görünüyor -1bb) . Bu açıkça sorun, bu nedenle imzalanmamış veri türlerinin yerine mümkün olduğunda kullanılmalıdır.

### CF, ACD, ve ERDDAP™ Metadata{#cf-acdd-and-erddap-metadata} 
En NCCSV dosyalarının veya en NCCSV dosyalarının tahmin edildiği için, .nc Onlardan oluşturulan dosyalar, okunacak ERDDAP Bununla birlikte, NCCSV dosyalarının gerekli veya tavsiye edilen metadata özellikleri içerdiği veya tavsiye edildiği şiddetle tavsiye edilir. ERDDAP™ (bakınız)
 [/docs /server-admin/datasets #global-attributes](/docs/server-admin/datasets#global-attributes) ). Özellikler neredeyse tüm CF ve ACD metadata standartlarındandir ve verileri doğru bir şekilde tanımlamak için hizmet eder. (Kim, ne zaman, nerede, neden, nasıl,) Aksi takdirde veri kümesi hakkında hiçbir şey bilmeyen birine. Özellikle önemlidir, neredeyse tüm sayısal değişkenlerin bir birim özelliği olması gerekir UDUNITS - uyumlu değer, e.g.,
 sst ,units, degree\\_C

CF veya ACD standartlarının veya ACD standartlarının olmayan ek özellikleri içerecek şekilde iyidir. ERDDAP .

##  [Data Bölüm](#the-data-section)  {#the-data-section} 

###  [Yapı Yapısı](#structure)  {#structure} 

Veri bölümünün ilk satırı, değişken isimlerin vakaya duyarlı, komünize edilmiş bir listesine sahip olmalıdır. Bu listedeki tüm değişkenler metadata bölümünde açıklanmalıdır ve tersi ve tersi (Diğeri [\\*GLOBAL GLOBAL GLOBAL\\*](#global) özellikler ve özellikler [\\*SCALAR\\*](#scalar) Değişken değişken değişken değişken değişken değişkenler) .

Veri bölümün penultimate hatlarının ikincisi, değerlerin bir komünalize listesine sahip olmalıdır. Her satır veri aynı sayıda değere sahip olmalıdır çünkü değişken isimlerin komünalize listesi. Daha önce veya değerlerden sonra uzaylar izin verilmez, çünkü dosyayı elektronik tablo programlarına ithal ederken sorunlara neden olurlar. Bu bölümdeki her sütun sadece değerleri içermelidir\\*DATA\\_TYPE\\*Bu değişken için belirtilenler\\*DATA\\_TYPE\\*Bu değişken için özellik. Özellikleri bölümünden farklı olarak, veri bölümünde sayısal değerler veri tipini ifade etmek için ek mektuplara sahip olmamalıdır. Özellikleri bölümünden farklı olarak, veri bölümündeki kar değerleri, belirsizliği için gerekli değilse tek tırnakları durdurabilir. (Bu nedenle, ',' ve 'biz' burada gösterildiği gibi alıntılanmalıdır.) . Bu veri satırlarının bir NCCSV dosyasında herhangi bir sayı olabilir, ancak şu anda ERDDAP™ Sadece NCCSV dosyalarını yaklaşık 2 milyar sıraya kadar okuyabilirsiniz. Genel olarak, büyük veri kümelerini her biri 1 milyondan daha az NCCSV veri dosyalarına bölmeniz önerilir.

#### Data End Data{#end-data} 
Veri bölümün sonu sadece bir çizgi ile ifade edilmelidir
\\*END\\_DATA\\*

NCCSV dosyasında daha fazla içerik varsa, sonra\\*END\\_DATA\\*line, NCCSV dosyasının dönüştürüldüğü zaman göz ardı edilecektir. .nc Dosya. Bu nedenle bu tür içerik cesaret vericidir.

Bu kongrelerin ardından, değişken isimler ve veri değerleri birden fazla sütunda olacaktır. Aşağıdaki örneği görün.

###  [Eksik Değerler](#missing-values)  {#missing-values} 

Numeric eksik değerler, bir sayısal değer olarak tanımlanabilir missing\\_value veya bu değişken için \\_FillValue özelliği. Örneğin, bu veri sırasındaki ikinci değeri görün:
Bell M. Shimada,99,123.4
Bu, eksik değerlerin tükenmesi için önerilen yoldur, ubyte, kısa, ukı, int, uint, uzun ve ulong değişkenleri.

Yüz veya çift NaN değerleri NaN olarak yazılabilir. Örneğin, bu veri sırasındaki ikinci değeri görün:
Bell M. Shimada,NaN,123.4

String ve sayısal eksik değerler boş bir alan tarafından belirtilebilir. Örneğin, bu veri sırasındaki ikinci değeri görün:
Bell M. Shimada, 123.4

For byte, ubay, kısa, ukısa, int, uint, long, and ulong variables, NCCSV dönüştürücü fayda ve ve NCRS ERDDAP™ Bu veri türü için en fazla izin verilen değere boş bir alan dönüştürecektir. (e.g., 127 for bytes) . Bunu yaparsanız, bir ekleyin emin olun missing\\_value veya bu değeri tanımlamak için bu değişken için \\_FillValue özelliği, e.g.,
 *değişken değişken değişken değişken değişken Name Name Name Name Name Name Name Name Name Name Name* ,\\_FillValue,127b
Yüz ve çift değişken için, boş bir alan NaN'ye dönüştürülecektir.

###  [DateTime Values](#datetime-values)  {#datetime-values} 

DateTime values (Zaman bileşeni olmayan tarih değerleri de dahil) NCCSV dosyalarında sayılar veya Strings olarak temsil edilebilir. Verilen bir tarihTime değişken sadece String değerleri veya sadece sayısal değerlere sahip olabilir, ikisi de değil. NCCSV yazılımı, String dateTime değerlerini sayısal tarihe dönüştürecektir. Zaman değerleri .nc dosyaları dosyaları dosyaları dosyaları (CF tarafından) . String dateTime değerleri, insanlar tarafından kolayca okunabilir olmanın avantajına sahiptir.

TarihTime değerleri sayısal değerler olarak temsil edilen bir birim özelliği olmalıdır ki " *Birim birimleri* O zamandan beri o zamandan beri *Tarih tarihi Zaman Zamanı* "Cid tarafından gerekli ve belirtilenler tarafından UDUNITS E.g.,
Zaman, 1970'ten bu yana saniyeler,-01T00:00Z

String değerleri olarak temsil edilen tarihTime değerleri bir String değerine sahip olmalıdır\\*DATA\\_TYPE\\*Özellikler ve bir birim, bir tarihe işaret eden bir özelliktir Time pattern as specified by the Java DateTimeFormatter class
 ( [https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html) ) . Örneğin,
Zamanlar, yyyy-MM-dd 'T'HH:mm:sZ
Verilen bir veri değişkeni için tüm tarihTime değerleri aynı formatı kullanmalıdır.
Çoğu durumda, birim özellikleri için ihtiyacınız olan tarihTime modeli bu formatlardan birinin bir varyasyonu olacaktır:

*    yyyy-MM-dd 'T'HH:mm:s. ISO 8601:2004 (E) Tarih tarihi Zaman formatı. Bunun kısaltılmış bir versiyonuna ihtiyacınız olabilir, e.g., yyyy-MM-dd 'T'HH:mm:sZ (Sadece önerilen format) veya yyyy-MM-dd . TarihTime değerlerinizin biçimini değiştirirseniz NCCSV bu formata değiştiğinizi şiddetle tavsiye eder. (Belki de kısaltılabilir) . Bu, formattır, ERDDAP™ NCCSV dosyaları yazarken kullanacak.
* yyyyMMddHHmms.SSS - ISO 8601'in kompakt versiyonu:2004 tarihi Zaman formatı. Bunun kısaltılmış bir versiyonuna ihtiyacınız olabilir, e.g., yyyyMMdd.
* M/d/yyyyyy H:mm:s. ABD tarzı tarih ve tarihTimes'ı "3/23/2017 16:22:03.000" gibi ele alan. Bunun kısaltılmış bir versiyonuna ihtiyacınız olabilir, e.g., M/d/yy.
* yyDDDHHmmsSSS - yıl artı yılın sıfır-padded günü (E.g, 001 = 1 Ocak 365 = 31 Aralık, alkolsüz bir yıl içinde; Bu bazen Julian date olarak adlandırılır.) . Bunun kısaltılmış bir versiyonuna ihtiyacınız olabilir, e.g., yyyyDDD.

#### Hassasiyet{#precision} 
Bir yazılım kütüphanesi ne zaman dönüşür .nc Bir NCCSV dosyasına dosya, tüm tarih Zaman değerleri ISO 8601 ile Strings olarak yazılacaktır:2004 (E) Tarih tarihi Zaman formatı, e.g., 1970-01T00:00Z . Hassaslığı kontrol edebilirsiniz ERDDAP - spesifik özellikler time\\_precision . See See See See
 [/docs /server-admin/datasets # time\\_precision ](/docs/server-admin/datasets#time_precision) .

#### Zaman Bölgesi{#time-zone} 
Bugün için varsayılan zaman bölgesi Zaman değerleri, Zulu   (veya GMT) Zaman bölgesi, hangi gün ışık tasarrufu zaman dönemleri yoktur. Bir tarihTime değişkeni farklı bir zaman bölgesinden tarihTime değerleri varsa, bunu bununla belirtmelisiniz. ERDDAP - spesifik özellikler time\\_zone . Bu bir zorunluluktur ERDDAP™ (bakınız)
 [/docs /server-admin/datasets # time\\_zone ](/docs/server-admin/datasets#time_zone) ).

###  [Derece Değerleri](#degree-values)  {#degree-values} 

CF tarafından gerektiğinde, tüm derece değerleri (E.g., uzun ve entitude için) Dekimal- derece çift değerleri olarak belirtilmeli, bir derece olarak değil, derece, dakikalar, saniyeler için ayrı değişkenler olarak belirtilmelidir. Yön tasarımçıları N, S, E ve W izin verilmez. Batı boyları ve Güney enlemleri için negatif değerleri kullanın.

##  [DSG Özel Özellikleri](#dsg-feature-types)  {#dsg-feature-types} 

Bir NCCSV dosyası, CF Discrete Sampling Geometry içerebilir
 ( [https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) ) Veriler. Bu işi yapan özelliklerdir:

1. CF tarafından gerekli olduğu gibi, NCCSV dosyası metadata bölümünde bir çizgi içermelidir [\\*GLOBAL GLOBAL GLOBAL\\*](#global)   featureType Özellikler, e.g.,
    \\*GLOBAL GLOBAL GLOBAL\\*, featureType ,trajectory
2. Kullanımı için ERDDAP™ Ancak NCCSV dosyası, cf\\_role=...\\_id değişkenleri, e.g.,
Gemi,cf\\_role,trajectory\\_id
Bu, CF için isteğe bağlı, ancak NCCSV'de gereklidir.
3. Kullanımı için ERDDAP™ Ancak NCCSV dosyası, değişkenlerin her zaman serisi, yörünge veya profil ile ilişkili olduğunu tanımlayan metadata bölümünde bir çizgi veya çizgi içermelidir. ERDDAP™ (bakınız)
     [/docs /server-admin/datasets#cdm\\_data\\_type](/docs/server-admin/datasets#cdm_data_type) ), e.g.,
    \\*GLOBAL GLOBAL GLOBAL\\*,cdm\\_trajectory\\_variables "ship"
veya
    \\*GLOBAL GLOBAL GLOBAL\\*,cdm\\_time Series\\_variables"station\\_id,lat,lon"

##  [Örnek Dosya](#sample-file)  {#sample-file} 

İşte NCCSV dosyasının birçok özelliklerini gösteren bir örnek dosya:
```
\\*GLOBAL\\*,Conventions,"COARDS, CF-1.6, ACDD-1.3, NCCSV-1.2"
\\*GLOBAL\\*,cdm\\_trajectory\\_variables,"ship"
\\*GLOBAL\\*,creator\\_email,erd.data@noaa.gov
\\*GLOBAL\\*,creator\\_name,Bob Simons
\\*GLOBAL\\*,creator\\_type,person
\\*GLOBAL\\*,creator\\_url,https://www.pfeg.noaa.gov
\\*GLOBAL\\*,featureType,trajectory
\\*GLOBAL\\*,infoUrl,https://erddap.github.io/docs/user/nccsv-1.20
\\*GLOBAL\\*,institution,"NOAA NMFS SWFSC ERD, NOAA PMEL"
\\*GLOBAL\\*,license,"""NCCSV Demonstration"" by Bob Simons and Steve Hankin is
    licensed under CC BY 4.0, https://creativecommons.org/licenses/by/4.0/ ."
\\*GLOBAL\\*,keywords,"NOAA, sea, ship, sst, surface, temperature, trajectory"
\\*GLOBAL\\*,standard\\_name\\_vocabulary,CF Standard Name Table v55
\\*GLOBAL\\*,subsetVariables,"ship"
\\*GLOBAL\\*,summary,"This is a paragraph or two describing the dataset."
\\*GLOBAL\\*,title,"NCCSV Demonstration"
ship,\\*DATA\\_TYPE\\*,String
ship,cf\\_role,trajectory\\_id
time,\\*DATA\\_TYPE\\*,String
time,standard\\_name,time
time,units,"yyyy-MM-dd'T'HH:mm:ssZ"
lat,\\*DATA\\_TYPE\\*,double
lat,units,degrees\\_north
lon,\\*DATA\\_TYPE\\*,double
"lon","units","degrees\\_east"
status,\\*DATA\\_TYPE\\*,char
status,comment,"From http://some.url.gov/someProjectDocument , Table C"
testByte,\\*DATA\\_TYPE\\*,byte
testByte,units,1
testUByte,\\*DATA\\_TYPE\\*,ubyte
testUByte,units,1
testLong,\\*DATA\\_TYPE\\*,long
testLong,units,1
testULong,\\*DATA\\_TYPE\\*,ulong
testULong,units,1
sst,\\*DATA\\_TYPE\\*,float
sst,standard\\_name,sea\\_surface\\_temperature
sst,actual\\_range,0.17f,23.58f
sst,units,degree\\_C
sst,missing\\_value,99f
sst,testBytes,-128b,0b,127b
sst,testShorts,-32768s,0s,32767s
sst,testInts,-2147483648i,0i,2147483647i
sst,testLongs,-9223372036854775808L,0L,9223372036854775807L
sst,testFloats,-3.40282347e38f,0f,3.40282347E+38f
sst,testDoubles,-1.79769313486231570e308d,0d,1.79769313486231570E+308d
sst,testChars,"','","'""'","'€'"
sst,testStrings," a~,\\n'z""\\u20AC"
sst,testUBytes,0ub,127ub,255ub
sst,testUInts,0ui,2147483647ui,4294967295ui
sst,testULongs,0uL,9223372036854775807uL,18446744073709551615uL
sst,testUShorts,0us,32767us,65535us

\\*END\\_METADATA\\*
ship,time,lat,lon,status,testByte,testUByte,testLong,testULong,sst
Bell M. Shimada,2017-03-23T00:45:00Z,28.0002,-130.2576,A,-128, 0,-9223372036854775808L,0uL,10.9
Bell M. Shimada,2017-03-23T01:45:00Z,28.0003,-130.3472,\\u20AC,0,127,-9007199254740992L,9223372036854775807uL,10.0
"Bell M. Shimada","2017-03-23T02:45:00Z",28.0001,-130.4305,"'\\t'",126,254,9223372036854775806L,18446744073709551614uL,99
"Bell M. Shimada",2017-03-23T12:45:00Z,27.9998,-131.5578,"'""'",127,255,9223372036854775807L,18446744073709551615uL,NaN
```
Notlar:

* Bu örnek dosya birçok zor vaka içeriyor (e.g., kar ve uzun değişkenler ve zor String değerleri) . Çoğu NCCSV dosyaları çok daha basit olacaktır.
* Lisans hattı burada iki çizgiye kırılır, ancak örnek dosyada sadece bir çizgidir.
* \\u20ac is the the \\uhhh h encoding of €. 4.99u00FC is the \\uhhh u. Ayrıca kodlanmamış karakterleri doğrudan kullanabilirsiniz.
* Pek çok Örneğin Strings çift alıntılarla kapalıdır, ancak olması gerekmez, e.g., başlık dahil birçok küresel özellik, lon birimleri özelliği ve 3rd veri hattı.)
* TestLong değişkeni için birimlerin özellikleri çift alıntılarda yazılırsa, bunun bir String değeri olduğunu gösterir. Ancak mevcut temsiliyet (1, alıntı yapmadan) Bir String olarak doğru yorumlanacaktır, tam olarak değil, çünkü ‘i’ eki yoktur.
* Diğer sayısal veri türlerinden farklı olarak, veri bölümündeki uzun değerler ekinlere sahiptir. ('L') Bu onların sayısal veri türünü tanımlar. Bu, tabloları yüzen sayılar olarak yorumlamak ve böylece hassaslığı kaybetmek için gereklidir.

##  [Sayfalar](#spreadsheets)  {#spreadsheets} 

Bir NCCSV dosyasında olduğu gibi, yaygın bir tabloda:

* NCCSV dosyaları için belirtildiği gibi sayısal özellikler yazın (e.g., bir ek mektubu ile, e.g., 'f', özelliklerini tanımlamak için) .
* Strings'te, tüm baskısız ve özel karakterler bir JSON benzeri backslashed karakter olarak yazılmalıdır. (E.g., \\n Yeniline için) Ya da hexadecimal Unicode karakteri numarası (En hassas durumda) Sözcüklerle [. *hhhh* ](#uhhhh) . Muhtemelen, kullanım \\n   (2 karakter: backslash ve 'n ‘ ‘ ‘) Bir String içinde yeni bir çizgi göstermek için, Alt Gir değil. Tüm yazdırılabilir karakterler kodlanmamış veya sözcülerle yazılabilir. [. *hhhh* ](#uhhhh) .

NCCSV dosyaları ve bu kongreleri takip eden analog yayılma tablosu arasındaki tek fark:

* NCCSV dosyaları komünler tarafından ayrı bir çizgi üzerinde değere sahiptir.
Sayfalar, bitişik hücrelerde bir çizgide değerlere sahiptir.
* NCCSV dosyalarındaki Strings genellikle çift alıntılarla çevrilidir.
Transkriptler asla çift alıntılarla çevrili değildir.
* İç çift alıntı (" " "") NCCSV dosyalarındaki Strings 2 çift alıntı olarak görünüyor.
Orta çift alıntılar 1 çift alıntı olarak görünür.

Bu kongreleri takip eden bir yay sayfası bir CSV dosyası olarak kurtarılırsa, çoğu hatların sonunda ekstra komünler olacaktır. NCCSV dosyalarını dönüştüren yazılımlar, .nc dosyalar ekstra komünleri görmezden gelecektir.

###  [Excel Excel](#excel)  {#excel} 

Bir NCCSV dosyasını Excel'a ithal etmek:

1. Dosyayı seçin: Open .
2. Dosya türünü Text Files için değiştirin (\\*.prn;\\*.txt; \\*.csv) .
3. Yönetmenleri arayın ve NCCSV .csv dosyasına tıklayın.
4. Open .

Bir Excel'den NCCSV dosyası oluşturmak için:

1. Dosyayı seçin: Kaydet As.
2. Save the type: to be CSV (Comma delimited)   (\\*.csv) .
3. uyumluluk uyarısına yanıt olarak, Evet'e tıklayın.
4. Ortaya çıkan .csv dosyası, diğer tüm satırların sonunda, CSV satırlarından daha fazla komün olacaktır. Onları görmezden gelebilirsin.

Excel'de, yukarıdaki örnek NCCSV dosyası gibi görünüyor

![ÖrnekExcel.txt](/img/sampleExcel.png)

###  [Google Sheets](#google-sheets)  {#google-sheets} 

Bir NCCSV dosyasını Google Dokümanlarına ithal etmek:

1. Dosyayı seçin: Import .
2. Bir dosyayı yüklemek ve bilgisayarınızdan bir dosyayı yüklemek için tıklayın. Dosyayı seçin, sonra Open .
      
Ya da, My Drive'ı seçin ve dosya türünü tüm dosya türlerine değiştirir. Dosyayı seçin, sonra Open .

Bir Google Dokümanlarından NCCSV dosyası oluşturmak için:

1. Dosyayı seçin: Kaydet As.
2. Save the type: to be CSV (Comma delimited)   (\\*.csv) .
3. uyumluluk uyarısına yanıt olarak, Evet'e tıklayın.
4. Ortaya çıkan .csv dosyası, diğer tüm satırların sonunda, CSV satırlarından daha fazla komün olacaktır. Onları görmezden gel.

##  [Sorunlar / Savaşlar](#problemswarnings)  {#problemswarnings} 

* Bir metin editörü ile NCCSV dosyası oluşturursanız veya bir elektronik tablo programına analog bir yayılma sayfası oluşturmak istiyorsanız, metin editörü veya elektronik tablo programı bu kongreleri doğru takip ettiğinizi kontrol etmeyecektir. Bu kongreleri doğru bir şekilde takip etmeniz size kalmış.
* Bu kongreyi bir csv dosyasına takip eden bir elektronik tablonun dönüşümü (Böylece, NCCSV dosyası) CSV veri satırlarından diğer tüm satırların sonunda ekstra komünlere yol açacaktır. Onları görmezden gel. Yazılım sonra NCCSV dosyalarını NCCSV dosyalarına dönüştürür .nc dosyalar onları görmezden gelecektir.
* Bir NCCSV dosyası satırların sonunda fazla komüne sahipse, NCCSV dosyasını NCCSV dosyasına bir şekilde dönüştürmekle onları kaldırabilirsiniz. NetCDF Dosya ve sonra dönüştürme NetCDF Dosya bir NCCSV dosyasına geri döndü.
* NCCSV dosyasını bira dönüştürmeye çalıştığınızda NetCDF Dosya, bazı hatalar yazılım tarafından tespit edilecek ve hata mesajları üretecek, dönüştürmenin başarısız olmasına neden olacaktır. Diğer sorunlar yakalamak için zor veya imkansız ve hata mesajları veya uyarılar üretmeyecektir. Diğer sorunlar (E.g., sıraların sonunda aşırı komünler) Göz ardı edilecektir. Dosya dönüştürücü sadece ortaya çıkan doğrulığı kontrol edecektir NetCDF Dosya, e.g., CF uyumluluğu ile ilgili. Dosya yaratıcısının ve dosya kullanıcının dönüştürme sonuçlarının istenen ve doğru olduğunu kontrol etmek için sorumluluğudur. Kontrol etmenin iki yolu:
    * Yazdır the content of the .nc ncdump ile dosya
         ( [https://linux.die.net/man/1/ncdump](https://linux.die.net/man/1/ncdump)  ) .
    * Verilerin içeriğini görüntüleyin ERDDAP™ .

##  [Değişiklikler Değişiklikler Değişiklikler](#changes)  {#changes} 

Orijinal sürüm orijinal versiyondu [NCCSV v1.00](/docs/user/nccsv-1.00)   (in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in ERDDAP™ v1.76, 2017-05-12) 

* Yapılan değişiklikler [NCCSV v1.10](/docs/user/nccsv-1.10)   (in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in ERDDAP™ v2.10, 2020-11-05 serbest bırakıldı) :
    * ubay, u 6:, uint, ulong için destek eklendi. CF'deki bu veri türleri için destek eklemek için teşekkürler.
* v1.20'de getirilen değişiklikler (in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in ERDDAP™ v2.23, 2023-02-27) :
    * ASCII karakterine geçiş, NCCSV .csv dosyaları için UTF-8 kodlamasına yol açtı.
        *    ERDDAP™ NCCSV'nin önceki ve mevcut versiyonlarından dosyaları hala okuyabilirsiniz.
        *    ERDDAP™ Şimdi her zaman NCCSV v1.20 dosyaları yazıyor.
        * NCCSV dosyalarını okumak için bir müşteri yazdıysanız, UTF-8 dosyaları olarak tüm NCCSV dosyalarını tedavi eder. Bu eski NCCSV dosyaları ile çalışacak çünkü ASCII, UTF-8 karakterinin bir alt kümesidir.
        * Pauline Chauvet sayesinde Nate ve Thomas Gardiner.
