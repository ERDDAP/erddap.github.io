# Özel Bayraklar

Bu sayfa, sistemde mevcut olan yapılandırma bayraklarını belgelemektedir. Bu bayraklar çeşitli özellikleri, deneysel yetenekleri ve mirası kontrol eder.

##  **Bayrak Lifecycle Legend** 

*  **Stable:** Uzun vadeli bayraklar, yöneticilerin işlevselliği değiştirmelerine izin verme eğilimindeydi. Üretim için güvenli.
*  **Test:** Test için hazır olan Özellikler. Bunlar ya "Stable" ya da sonunda hedef değerlerine ayarlanacak ve bayrağı kaldıracaktır.
*  **İnşaat altında:** Şu anda kodda yanlış kodda, yapılandırmadan bağımsız olarak. Bu özellik henüz kullanıma hazır değildir.

##  **  Testlerde Optimizasyonlar** 

Bunlar gelecekte kaldırılacak bayraklar.

###  **touchThread Only WhenItems** 

Açıklama
Optimizasyon bayrağı. Eğer doğruysa, dokunma iplik sadece işlem için öğeler olduğunda çalışır.

 | Emlak | Detaylar | 
 | : | : | 
 |   **Yaşam döngüsü**   | Test Testi Test Testi | 
 |   **Mevcut Tembel**   | Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek | 
 |   **Long-term Goal**   | Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek | 
 |   **Tarih Tarihi**   | 2.29.0'da eklendi. | 

###  **GörevCacheClear** 

Açıklama
Hazırlanan arka plan görevi önbelleklerden sona ermiştir.

 | Emlak | Detaylar | 
 | : | : | 
 |   **Yaşam döngüsü**   | Stable Stable | 
 |   **Mevcut Tembel**   | Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek | 
 |   **Long-term Goal**   | Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek | 
 |   **Tarih Tarihi**   | 2.27.0 | 

###  **ncHeaderMakeFile** 

Açıklama
Eğer gerçek bir sunucu, ncheader sonucu oluşturmadan önce tüm nc dosyasını üretecektir. Yeni Yeni The new (tercih tercih tercih tercih tercih tercih tercih tercih tercih tercih tercih tercih tercih tercih tercih tercih tercih tercih tercih tercih) Sahte olan davranış doğrudan ncheader sonucu yaratır.

 | Emlak | Detaylar | 
 | : | : | 
 |   **Yaşam döngüsü**   | Test Testi Test Testi | 
 |   **Mevcut Tembel**   | sahte yanlış | 
 |   **Long-term Goal**   | sahte yanlış | 
 |   **Tarih Tarihi**   | 2.29.0'da eklendi. | 

###  **EddReflection** 

Açıklama
Enables the use of the use of Java Şimdiye Kadar Düşünmek ( ERDDAP Dataset) Sınıflar.

 | Emlak | Detaylar | 
 | : | : | 
 |   **Yaşam döngüsü**   | Test Testi Test Testi | 
 |   **Mevcut Tembel**   | Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek | 
 |   **Long-term Goal**   | Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek | 
 |   **Tarih Tarihi**   | Varsayılan olarak 2.28.0'te gerçek olarak değiştirildi, 2.25'te eklendi. | 

###  **arka planCreateSubsetTables** 

Açıklama
Subset masalarının veri setlerini yükleme süresini geliştirmek için arka ipliklerde yaratılmasına izin verin.

 | Emlak | Detaylar | 
 | : | : | 
 |   **Yaşam döngüsü**   | Test Testi Test Testi | 
 |   **Mevcut Tembel**   | Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek | 
 |   **Long-term Goal**   | Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek | 
 |   **Tarih Tarihi**   | 2.29.0'da eklendi. | 

###  **NcMetadaForFileTable** 

Açıklama
Kullanımları NetCDF Metadata dosya tablo görünümünü populate etmek için. Özellikle bir nc dosyası her değişken için gerçek_range içeriyorsa, veri set yükleme tüm dosyayı okumayı atabilir.

 | Emlak | Detaylar | 
 | : | : | 
 |   **Yaşam döngüsü**   | Stable Stable | 
 |   **Mevcut Tembel**   | Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek | 
 |   **Long-term Goal**   | Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek | 
 |   **Tarih Tarihi**   | 2.29.0'da eklendi. | 

##  **  System & Core Davranış** 

###  **e-posta e-posta e-posta e-posta IsActive** 

Açıklama
Sistem gerçek e-posta göndermeye çalışırsa kontroller (e.g., abonelik güncellemeler veya hata raporları için) yapılandırılmış SMTP sunucusu aracılığıyla.

 | Emlak | Detaylar | 
 | : | : | 
 |   **Yaşam döngüsü**   | Stable Stable | 
 |   **Mevcut Tembel**   | sahte yanlış | 
 |   **Long-term Goal**   | Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek (Yönetici yapılandırmasına bağlı olarak)   | 
 |   **Tarih Tarihi**   | Mirası | 

:::info
Bu bayrak başlangıçta dinamik olarak hesaplanmıştır. Tüm gerekli SMTP kimlik bilgilerini gerekli olmadıkça yanlış varsayılanlar (host, port, user, password, from-address) Kurulumda kesinlikle sağlanır.xml.
:::

###  **LoadErrorsOnStatusPage** 

Açıklama
Detaylı veri kümesi yük hatalarının durum sayfasında halka açık gösterilmesini belirler.

 | Emlak | Detaylar | 
 | : | : | 
 |   **Yaşam döngüsü**   | Stable Stable | 
 |   **Mevcut Tembel**   | Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek | 
 |   **Long-term Goal**   | İstenildiği gibi seti | 
 |   **Tarih Tarihi**   | 2.25 yılında eklendi. | 

###  **Varsayılan kayıt** 

Açıklama
Bir veri kümesinin altta yatan dosyaların dosyaların dosyalarda erişilebilir olup olmadığı için varsayılan davranışı ayarlar.

 | Emlak | Detaylar | 
 | : | : | 
 |   **Yaşam döngüsü**   | Stable Stable | 
 |   **Mevcut Tembel**   | sahte yanlış | 
 |   **Long-term Goal**   | sahte yanlış | 
 |   **Tarih Tarihi**   | 2.10'da eklendi. | 

##  **🗃️ Datasets** 

###  **HızlıRestart** 

Açıklama
Eğer etkinleştirilirse, sistem başlangıçta veri setlerinde belirli derin doğrulama kontrollerini atlayarak daha hızlı başlamaya çalışır.

 | Emlak | Detaylar | 
 | : | : | 
 |   **Yaşam döngüsü**   | Stable Stable | 
 |   **Mevcut Tembel**   | Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek | 
 |   **Long-term Goal**   | Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek | 
 |   **Tarih Tarihi**   | 1.38 yılında eklendi. | 

###  **etkinleştirin** 

Açıklama
Enables processing the Enables processing the datasets.xml Bir dosya ile [StringSubstitutor](https://commons.apache.org/proper/commons-text/apidocs/org/apache/commons/text/StringSubstitutor.html) . Bu özel değerleri belirlemek dahil birçok kullanım vardır (Parola gibi) Çevre değişkenlerini kullanarak.

 | Emlak | Detaylar | 
 | : | : | 
 |   **Yaşam döngüsü**   | Stable Stable | 
 |   **Mevcut Tembel**   | Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek | 
 |   **Long-term Goal**   | İstenildiği gibi seti | 
 |   **Tarih Tarihi**   | 2.29.0'da eklendi. | 

###  **useSaxParser** 

Açıklama
Bir SAX kullanmak için iç XML parsing motoru Anahtarlar (XML için Basit API) DOM . yerine .. Bu, XInclude gibi bazı yeni gelişmiş özellikler sağlar ve [Özel ekran özellikleri](https://erddap.github.io/docs/server-admin/display-info?_highlight=usesaxparser#usage-instructions) .

 | Emlak | Detaylar | 
 | : | : | 
 |   **Yaşam döngüsü**   | Test Testi Test Testi | 
 |   **Mevcut Tembel**   | sahte yanlış | 
 |   **Long-term Goal**   | Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek | 
 |   **Tarih Tarihi**   | 2.25 yılında eklendi. | 

###  **ListeÖzel Verisets** 

Açıklama
Özel veri kümeleri belirlerse (Kimlik doğrulama gerektirenler) Ana veri kümesi listesinde görünüyor.

 | Emlak | Detaylar | 
 | : | : | 
 |   **Yaşam döngüsü**   | Stable Stable | 
 |   **Mevcut Tembel**   | sahte yanlış | 
 |   **Long-term Goal**   | sahte yanlış | 
 |   **Tarih Tarihi**   | 1.20 yılında eklendi. | 

###  **Siyasi SınırlarActive** 

Açıklama
Siyasi sınırların haritalarda çizilebileceği kontroller.

 | Emlak | Detaylar | 
 | : | : | 
 |   **Yaşam döngüsü**   | Stable Stable | 
 |   **Mevcut Tembel**   | Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek | 
 |   **Long-term Goal**   | Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek | 
 |   **Tarih Tarihi**   | 1.80 yılında eklendi. | 

###  **PowerSyncousLoading** 

Açıklama
Gönderilen arka yükleme yerine veri setleri senkronize eder.

 | Emlak | Detaylar | 
 | : | : | 
 |   **Yaşam döngüsü**   | Stable Stable | 
 |   **Mevcut Tembel**   | sahte yanlış | 
 |   **Long-term Goal**   | sahte yanlış | 
 |   **Tarih Tarihi**   | 2.30 yılında eklendi. | 

##  ** Meta Metadata & Standards** 

###  **fgdcActive** 

Açıklama
Genrates ve FGDC'ye hizmet eder (Federal Coğrafya Data Committee) metadata.

 | Emlak | Detaylar | 
 | : | : | 
 |   **Yaşam döngüsü**   | Stable Stable | 
 |   **Mevcut Tembel**   | Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek | 
 |   **Long-term Goal**   | Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek | 
 |   **Tarih Tarihi**   | 1.38 yılında eklendi. | 

###  **iso19115 Aktif Aktif Aktif Aktif Aktif Aktif Aktif** 

Açıklama
Genrates ve ISO 19115 metadata'ya hizmet eder.

 | Emlak | Detaylar | 
 | : | : | 
 |   **Yaşam döngüsü**   | Stable Stable | 
 |   **Mevcut Tembel**   | Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek | 
 |   **Long-term Goal**   | Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek | 
 |   **Tarih Tarihi**   | 1.38 yılında eklendi. | 

###  **SisISO19115** 

Açıklama
Geleneksel jeneratör yerine ISO 19115 metadata oluşturmak için Apache SIS kütüphanesini kullanın. Eğer bu devam ediyor veSisISO19139 kullanmıyorsa, varsayılan IOS 19115 metadata ISO19115_3_2016 formatında olacak. Bu doğruysa varsayılan format, değiştirilmiş ISO19115_2 formatında olacaktır.

 | Emlak | Detaylar | 
 | : | : | 
 |   **Yaşam döngüsü**   | Test Testi Test Testi | 
 |   **Mevcut Tembel**   | sahte yanlış | 
 |   **Long-term Goal**   | Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek | 
 |   **Tarih Tarihi**   | 2.26 yılında eklendi. | 

###  **SisISO19139** 

Açıklama
ISO19139_2007 metadata üretmek için Apache SIS kütüphanesini kullanın.

 | Emlak | Detaylar | 
 | : | : | 
 |   **Yaşam döngüsü**   | Test Testi Test Testi | 
 |   **Mevcut Tembel**   | sahte yanlış | 
 |   **Long-term Goal**   | sahte yanlış | 
 |   **Tarih Tarihi**   | 2.29.0'da eklendi. | 

###  **jsonldActive** 

Açıklama
Genrates ve JSON-LD'a hizmet eder (Linked Data) metadata.

 | Emlak | Detaylar | 
 | : | : | 
 |   **Yaşam döngüsü**   | Stable Stable | 
 |   **Mevcut Tembel**   | Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek | 
 |   **Long-term Goal**   | Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek | 
 |   **Tarih Tarihi**   | Mirası | 

###  **CroissantSchema** 

Açıklama
Genrates "Croissant" metadata şeması, makine öğrenimi hazırlığı için varsayılan şema olarak.

 | Emlak | Detaylar | 
 | : | : | 
 |   **Yaşam döngüsü**   | Test Testi Test Testi | 
 |   **Mevcut Tembel**   | Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek | 
 |   **Long-term Goal**   | Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek | 
 |   **Tarih Tarihi**   | 2.28.0'te eklendi. | 

###  **DeğişkenlerMust HaveIoosCategory** 

Açıklama
Değişkenlerin IOOS kategorisi özelliği olması gerekir.

 | Emlak | Detaylar | 
 | : | : | 
 |   **Yaşam döngüsü**   | Stable Stable | 
 |   **Mevcut Tembel**   | Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek | 
 |   **Long-term Goal**   | İstenildiği gibi seti | 
 |   **Tarih Tarihi**   | Mirası | 

###  **NcCFSubsetVariables** 

Açıklama
Miras davranışı sadece EDDTable FromNcCFFiles datasets için alt küme değişkenler üretmekti. Bu, EDDTableFromNcCFFiles'in diğer veri setleri ile tutarlı olması için davranışını varsayılan olarak eklendi. Eğer mirası otomatik ihtiyacınız varsa subsetVariables Bunu etkinleştirebilirsiniz. Daha iyi çözüm eklemek olacaktır subsetVariables Dataset tanımına.

 | Emlak | Detaylar | 
 | : | : | 
 |   **Yaşam döngüsü**   | Test Testi Test Testi | 
 |   **Mevcut Tembel**   | sahte yanlış | 
 |   **Long-term Goal**   | sahte yanlış | 
 |   **Tarih Tarihi**   | 2.26 yılında eklendi. | 

##  **Abonelikler ve Bildirimler** 

###  **Abonelik SistemiActive** 

Açıklama
Veri set güncellemeleri için e-posta abonelik sistemi kullanılabilir.

 | Emlak | Detaylar | 
 | : | : | 
 |   **Yaşam döngüsü**   | Stable Stable | 
 |   **Mevcut Tembel**   | Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek | 
 |   **Long-term Goal**   | Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek | 
 |   **Tarih Tarihi**   | 1.14'te eklendi. | 

###  **aboneToRemoteErddapDataset** 

Açıklama
Buna izin verin ERDDAP Örneğin uzaktan abone olmak için ERDDAP Güncellemeler için datasets.

 | Emlak | Detaylar | 
 | : | : | 
 |   **Yaşam döngüsü**   | Stable Stable | 
 |   **Mevcut Tembel**   | Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek | 
 |   **Long-term Goal**   | Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek | 
 |   **Tarih Tarihi**   | 1.70 yılında eklendi. | 

###  **UpdateSubsRsOnFileChanges** 

Açıklama
Promosyonlar abonelik ve RSS Altta yatan dosyalar değiştiğinde güncelleştirmeler. Geleneksel davranış sadece dataset reload üzerinde güncellemeler yapmaktı (Hangi bazı sunucular haftalık olarak dayanılmaz bir şekilde vardı) .

 | Emlak | Detaylar | 
 | : | : | 
 |   **Yaşam döngüsü**   | Stable Stable | 
 |   **Mevcut Tembel**   | Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek | 
 |   **Long-term Goal**   | Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek | 
 |   **Tarih Tarihi**   | 2.26 yılında eklendi. | 

###  **enable enable enable enable enable enable MqttBroker** 

Açıklama
mesajlaşmayı işlemek için uygulama içinde bir iç MQTT brokerine başlayın.

 | Emlak | Detaylar | 
 | : | : | 
 |   **Yaşam döngüsü**   | Test Testi Test Testi | 
 |   **Mevcut Tembel**   | sahte yanlış | 
 |   **Long-term Goal**   | İstenildiği gibi seti | 
 |   **Tarih Tarihi**   | 2.29.0'da eklendi. | 

###  **Yayınlanmamış** 

Açıklama
Enables yayını bildirimleri (Dataset gibi değişiklikler) MQTT brokerine.

 | Emlak | Detaylar | 
 | : | : | 
 |   **Yaşam döngüsü**   | Test Testi Test Testi | 
 |   **Mevcut Tembel**   | sahte yanlış | 
 |   **Long-term Goal**   | İstenildiği gibi seti | 
 |   **Tarih Tarihi**   | 2.29.0'da eklendi. | 

##  **  Web Headers /Configuration** 

###  **HeadersForFor Url** 

Açıklama
HTTP başlıkları kullanarak istek URL ayrıntılarını belirlemek için izinler (Yararlı arka proxy) .

 | Emlak | Detaylar | 
 | : | : | 
 |   **Yaşam döngüsü**   | Stable Stable | 
 |   **Mevcut Tembel**   | Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek | 
 |   **Long-term Goal**   | Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek | 
 |   **Tarih Tarihi**   | Varsayılan olarak 2.28.0'te doğru değiştirildi, 2.27.0'da eklendi. | 

###  **enable enable enable enable enable enable Cors** 

Açıklama
Enables Cross-Origin Resource Paylaşım (KURUMSAL) HTTP yanıtlarına dikkat edin.

 | Emlak | Detaylar | 
 | : | : | 
 |   **Yaşam döngüsü**   | Stable Stable | 
 |   **Mevcut Tembel**   | sahte yanlış | 
 |   **Long-term Goal**   | İstenildiği gibi seti | 
 |   **Tarih Tarihi**   | 2.26 yılında eklendi. | 

##  **  Arama** 

###  **LuceneAraMühendis** 

Açıklama
Apache Lucene'yi kullanmak için iç arama motoruna işaret eder.

 | Emlak | Detaylar | 
 | : | : | 
 |   **Yaşam döngüsü**   | Test Testi Test Testi | 
 |   **Mevcut Tembel**   | sahte yanlış | 
 |   **Long-term Goal**   | ?? | 
 |   **Tarih Tarihi**   | Mirası | 

##  **📡 Hizmetler ve Protokoller** 

###  **dosyalarıActivee** 

Açıklama
Enables the "Files" browser view for datasets that support it.

 | Emlak | Detaylar | 
 | : | : | 
 |   **Yaşam döngüsü**   | Stable Stable | 
 |   **Mevcut Tembel**   | Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek | 
 |   **Long-term Goal**   | Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek | 
 |   **Tarih Tarihi**   | 1.58 yılında eklendi. | 

###  **dönüştürücülerActive** 

Açıklama
UI'deki enables dönüştürme araçları.

 | Emlak | Detaylar | 
 | : | : | 
 |   **Yaşam döngüsü**   | Stable Stable | 
 |   **Mevcut Tembel**   | Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek | 
 |   **Long-term Goal**   | Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek | 
 |   **Tarih Tarihi**   | 1.44 yılında eklendi. | 

###  **slideSorterActive** 

Açıklama
Enables the Slide Sorter.

 | Emlak | Detaylar | 
 | : | : | 
 |   **Yaşam döngüsü**   | Stable Stable | 
 |   **Mevcut Tembel**   | Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek | 
 |   **Long-term Goal**   | Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek | 
 |   **Tarih Tarihi**   | 1.44 yılında eklendi. | 

###  **VerilerProviderFormActive** 

Açıklama
Form veri sağlayıcılarının metadata'ya girmesine izin verir.

 | Emlak | Detaylar | 
 | : | : | 
 |   **Yaşam döngüsü**   | Stable Stable | 
 |   **Mevcut Tembel**   | Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek | 
 |   **Long-term Goal**   | Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek | 
 |   **Tarih Tarihi**   | Mirası | 

###  **outOfDateDatasetsActive** 

Açıklama
Mevcut veri kümelerinin raporlanması.

 | Emlak | Detaylar | 
 | : | : | 
 |   **Yaşam döngüsü**   | Stable Stable | 
 |   **Mevcut Tembel**   | Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek | 
 |   **Long-term Goal**   | Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek | 
 |   **Tarih Tarihi**   | 1.82'de eklendi. | 

###  **wmsActive** 

Açıklama
Web Map Service ( WMS ) arayüz.

 | Emlak | Detaylar | 
 | : | : | 
 |   **Yaşam döngüsü**   | Stable Stable | 
 |   **Mevcut Tembel**   | Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek | 
 |   **Long-term Goal**   | Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek | 
 |   **Tarih Tarihi**   | 1.44 yılında eklendi. | 

###  **wmsClientActive** 

Açıklama
İçilebilirler WMS müşteri özellikleri.

 | Emlak | Detaylar | 
 | : | : | 
 |   **Yaşam döngüsü**   | Stable Stable | 
 |   **Mevcut Tembel**   | Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek | 
 |   **Long-term Goal**   | Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek | 
 |   **Tarih Tarihi**   | Mirası | 

###  **geoServicesRestActive** 

Açıklama
Enables the RESTful Geospatial Hizmetleri için arayüz. Tamamen uygulanmadı.

 | Emlak | Detaylar | 
 | : | : | 
 |   **Yaşam döngüsü**   | İnşaatın Altında | 
 |   **Mevcut Tembel**   | sahte yanlış (Hardcoded)   | 
 |   **Long-term Goal**   | Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek | 

###  **wcsActive** 

Açıklama
Web Coverage Service ( WCS ) arayüz. Tamamen uygulanmadı.

 | Emlak | Detaylar | 
 | : | : | 
 |   **Yaşam döngüsü**   | İnşaatın Altında | 
 |   **Mevcut Tembel**   | sahte yanlış (Hardcoded)   | 
 |   **Long-term Goal**   | Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek | 

###  **SosActive** 

Açıklama
Sensör Gözlem Servisi ( SOS ) arayüz.

 | Emlak | Detaylar | 
 | : | : | 
 |   **Yaşam döngüsü**   | İnşaatın Altında | 
 |   **Mevcut Tembel**   | sahte yanlış (Hardcoded)   | 
 |   **Long-term Goal**   | Gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek gerçek | 
