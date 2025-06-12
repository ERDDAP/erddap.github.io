---
title: "ERDDAP™ - Changes"
---
# ERDDAP™Değişiklikler Değişiklikler Değişiklikler

ERDDAP™Büyük bir örnek[User-Driven Innovation](https://en.wikipedia.org/wiki/User_innovation)Ürün inovasyonu genellikle tüketicilerden geliyor (ERDDAP™Kullanıcılar) Ama sadece üreticiler değil (ERDDAP™Geliştiriciler geliştiricileri) . Yıllar boyunca, yeni özellikler ve değişiklikler için fikirlerin çoğuERDDAP™Kullanıcılardan geldi. Bu kullanıcılar büyük fikirleri için aşağıda belirtilmiştir. Teşekkür ederim&#33; Lütfen bu büyük önerileri devam edin&#33;

İşte her biri ile ilişkili değişikliklerERDDAP™salıver.

## Version 2.27.07.0{#version-2270} 
 (2025-06-11-11) 

*    **Yeni Özellikler ve Değişiklikler (kullanıcılar için) :** 
    * New data to colorbar dönüştürücü on servers at /erddap /convert /color.html

*    **Şeyler ŞeylerERDDAP™Yöneticilerin Bilme ve Yapması Gerekiyor:** 
    * Varsayılan behavoir, önbellek artık büyük yük veri setlerinin görevinden bağımsız olarak temizlenecektir. Bu, eski önbellek dosyalarının daha güvenilir ve düzenli olarak açıklanmasına izin verecektir. Disk uzayında düşük olduğunda sunucu behavoir geliştirmek için ek bir çalışma var (Sunucunun uzaydan tükenmesini talep etmek için bir hata döndürür ve düşük disk koşullarında daha sık önbellekleri açıklayarak hataları önlemek için hataları açıklayın) . In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In Indatasets.xml  (veya kurulum.xml) Yeni önbelleği ekleyebilirsiniz ClearMinutes parametresi, sunucunun önbelleği nasıl açıklayacağını kontrol etmek için. Not, mevcut önbellek parametresi dosyaların tutulmasını kontrol eder, yeni önbellekli ClearMinutes, bir chache net yapmak için ne sıklıkta.
    ```
        <cacheClearMinutes>15</cacheClearMinutes>
    ```
Yeni önbellek açık çekleri yapılandırmada sahte görünmeye engel olabilirsiniz.xml, ancak bu tavsiye edilmez.
Önbelli önbelli önbelli önbelli önbelli önbelli önbelli önbelli önbelli önbelli önbelli ClearMinutes aynı zamanda[Datasets Document](/docs/server-admin/datasets#cacheclearminutes).
    
    * Yerelleştirilmiş veri kümesi metadata desteği. Bu, bir değer için yerelleştirmeyi destekleraddAttributesBölüm. Sadece ek xml ile bir özellik ekleyin:lang etiketi. Örneğin bir Fransız unvanı veri setine eklemek içinaddAttributesBölüm şunları içerecektir:
    ```
        <att name="title">Data from a local source.</att>
        <att name="title" xml:lang="fr">Donn&#xE9;es provenant d'une source locale.</att>
    ```
Mevcut ek ayrıntılar[Yerelleştirilmiş metadata belgeleri](/docs/server-admin/localized-metadata).

    * New Docker SSL ve çıplak bir Bones Prometheus sunucusu için seçeneklerle eğlence dosyası. Shane St. Savage for the SSL and Jiahui Hu for the Prometheus için teşekkürler.

    * Form dosyasına güvenmek yerine sunucu URL'yi belirlemek için başlıklardaki bilgileri kullanmak için destek. Bu, bir sunucunun birden fazla isim tarafından erişilebilir olmasına ve belirli yapılandırmaları basitleştirebilmesine izin verecektir. Lütfen bunu etkinleştirin ve geri bildirim gönderin.
    ```
        <useHeadersForUrl>true</useHeadersForUrl>
    ```

    * Bazı küçük değişiklikler, boğalar ve optimizasyonlar.

*    **For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For ForERDDAP™Geliştiriciler:** 
    * Dosya türlerinin kodda nasıl tanımlandığına yardımcı olun. Bu yüzden dosya türleri birçok kod yere dokunmak zorunda kalmadan eklenmelidir.

## Version 2.26{#version-226} 
 (2025-03-31) 

*    **Her şey için:** 
    * Belge sitemize büyük güncelleme: https://erddap.github.io/
 
Güncellenen görünümün yanı sıra gelişmiş navigasyon, arama, çeviri ve ilerlemeyi korumak daha kolay olmalıdır&#33;

*    **Yeni Özellikler ve Değişiklikler (kullanıcılar için) :** 
    * Abonelik ve AbonelikRSSGüncellemeler, dosya değişikliklerinden sık güncellenen veri setleri için daha güvenilir olmalıdır.

*    **Şeyler ŞeylerERDDAP™Yöneticilerin Bilme ve Yapması Gerekiyor:** 
    * Varsayılan sürüm gerektirir / destek gerektirirJavasürüm 21 Bu sürümde geri dönüş kolayca yapabilirJava17 uyumlu ikili.

    * UI'deki veri kümeleri hakkında gösterilen bilgileri özelleştirmek için yeni özellik. Bunun veri setleri gibi şeyleri eklemek özellikle kullanışlı olmasını bekliyoruz. Daha fazla ayrıntı için, okuyabilirsiniz[Yeni Belgeler](/docs/server-admin/display-info). Katkı için Ayush Singh sayesinde&#33;

    * Ek Prometheus metrics. En büyük olanı "http_request_duration_sans', istek yanıtlarını içeren zamanlar şunları içerir: "request_type", "dataset_id", "file_type", "lang_code", "status_code"
Bu makine okunabilir format, kullanıcıların sunucuyu nasıl kullandıklarını anlamak için daha iyi ölçüm koleksiyonu sağlayacaktır.

    * ISO19115 XML dosyaları oluşturmak için yeni bir yol. Apache SIS kullanıyor ve bu sürümde yeni bir seçenek. Lütfen bunu etkinleştirin ve geri bildirim gönderin.
    ```
        <useSisISO19115>true</useSisISO19115>
    ```

    * UI şimdi her url için bireysel bağlantılar yaratacakinfoUrlve özet.

    * Abonelik ve AbonelikRSSGüncellemeler, dosya değişikliklerinden sık güncellenen veri kümeleri için daha güvenilir olmalıdır. Bu sorunlara sebep olursa lütfen GitHub'a ulaşır ve aşağıdaki bayrağı sizin kurulumunuza ekleyerek işlevselliği devre dışı bırakır.xml.
RECOMMENDED
    ```
        <updateSubsRssOnFileChanges>false</updateSubsRssOnFileChanges>
    ```

    * Alt set değişkenleri artık veri set türü EDDTableNcCFFiles için otomatik olarak oluşturulmayacaktır. Davranışa güvenseydiniz, ya da (Tercih edilen çözüm tercih edildi) Ekle the add the add the add the add thesubsetVariablesDataset tanımına göredatasets.xml, veya aşağıdaki bayrağı kurulumunuza ekleyin.xml. Bunu açmak için ihtiyaç duyuyorsanız, lütfen GitHub'a ulaşırsınız, böylece kullanımınızı ileriye götürebiliriz.
RECOMMENDED
    ```
    <includeNcCFSubsetVariables>true</includeNcCFSubsetVariables>
    ```

    * Sunucu artık belgeleri yönlendirme isteği (İndirmeler altında / bu, göç edilen belgedir) Yeni belge sitesine. Gerekirse bunu kurulumda bir bayrakla devretebilirsiniz.xml:
RECOMMENDED
    ```
        <redirectDocumentationToGitHubIo>false</redirectDocumentationToGitHubIo>
    ```

    * Bazı küçük değişiklikler ve bug düzeltmeleri.

*    **For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For ForERDDAP™Geliştiriciler:** 
    * Daha fazla kod kalitesi iyileştirme ve ölü kod temizlendi. Bu, küçük optimizasyonlar, daha iyi işlenmiş kaynakların kullanımı ve uzun eski veri türlerinden uzaklaşmayı içerir. (Vector gibi) .

    * EDStatic'e yapılandırma, mesaj ve metrik kodun çoğunu çekmek için büyük bir refaksiyon. Ayrıca ilkleme ve dizin yollarının kullanımı daha iyi (Bu son 2'nin yapılacak daha fazlası var.) 

    * Resmi olarak desteklenen Docker Image'ya yönelik birçok ilerleme. Plan nihaileştirmek ve serbest bırakmaktırERDDAP™2.26 sürüm mevcuttur.

## Version 2.25{#version-225} 
 (2024-10-31) 

*    **Yeni Özellikler ve Değişiklikler (kullanıcılar için) :** 
    * EDDTable FromFiles şimdi sadece elde edilen çıktılarla sorguları destekleyebilir (Globals, jexl senaryosu veya değişkenler) .
         
*    **Şeyler ŞeylerERDDAP™Yöneticilerin Bilme ve Yapması Gerekiyor:** 
    * Version 2.25 gerektirirJava21 veya yeni. Bu LTS versiyonudur ve bir yıldan fazla kullanılabilir.
         
    * OrtakWatchService artık varsayılan. Bunu devre dışı bırakmanız gerekiyorsa lütfen chris ile iletişime geçin. Noaaa.gov'da beni bilmeme izin vermek için, bu yüzden gelecekteki versiyonlarda geliştirebilirim ve ekliyor:
        &lt;useSharedWatchService&gt;false&lt;/useSharedWatchService&gt; to your installation.xml.
         
    * The The The The The The The TheERDDAP™servlet şimdi sunucu başlangıçta başlayacak. Bu, veri setlerinin bir istek yapıldığına kadar hemen yüklenmeye başlaması anlamına gelir.
         
    * EDDTable'deki kaldırmaMVRows parametresi şimdi bir etkisi olacak. Sahte olarak kurmak bazı sorguları önemli ölçüde hızlandırabilir, ancak bu tüm veri kümeleri için uygun olmayabilir. Daha fazla bilgi için bakınız[parametrenin tanımı](/docs/server-admin/datasets#removemvrows).
         
    * Datasets (EDDTable FromNcFiles andEDDGridFromNcFiles) Phenr dosyaları kullanmak şimdi desteklenmektedir. DosyaNameRegex veya yolRegex içinde "zarr" dahil edilmelidir. Bakın,[Datasets Dokümantasyonunda Yerlilik](/docs/server-admin/datasets#zarr)Daha fazla ayrıntı için.
         
    * Yeni veri set türü, EDDTable FromParquetFiles şimdi destekleniyor. Bakın,[EDDTable FromParquetFiles secion in the datasets documents](/docs/server-admin/datasets#eddtablefromparquetfiles)Daha fazla ayrıntı için.
         
    *   [Prometheus metrics](https://prometheus.io/)Şimdi /erddap /metriklerde mevcuttur.
         
    * Yeni bir XML . uygulaması mevcuttur. Bu yeni parser XInclude'yi kullanarak izin veriyordatasets.xml. Ayush Singh sayesinde özellik için.
         
    * Yeni parametredatasets.xmlolağandışı aktivite e-postalarını kontrol etmek. olağandışıActivityity BaşarısızPercent varsayılan% 25'in eski değerine. Ayush Singh sayesinde özellik için.
         
    * Kurulumda Yeni parametre.xml, veri set yükleme hatalarının statüsünde gösterildiğini kontrol eder.html sayfasında. Doğru varsayılan olarak, veri kümesi hataları statü sayfasında devre dışı bırakmak için,LoadErrorsOnStatusPage'i yanlış göstermek için:&lt;LoadErrorsOnStatusPage&gt;false&lt;/ ShowLoadErrorsOnStatusPage&gt;
         
    * Bazı küçük değişiklikler ve bug düzeltmeleri.
         
*    **For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For ForERDDAP™Geliştiriciler:** 
    * Birim ve entegrasyon için ayrı test (Yavaş yavaş yavaş yavaş yavaş yavaş yavaş yavaş yavaş yavaş yavaş) Testler. Ayrıca daha fazla test etkinleştirildi ve testler daha az flaky yapıldı.
         
    * Hata Prone (Bazı çekler hala engelli) Ve Spot Bugs Maven aracılığıyla entegre edilmiştir.
         
    * Google Style Guide ile eşleştirmek için tam kod tabanı formatı.
         

## Version 2.24{#version-224} 
 (2024-06-07) 

*    **Yeni Özellikler ve Değişiklikler (kullanıcılar için) :** 
    * Akustik veri setleri için yeni renkli paletler mevcut. Rob Cermak sayesinde bunun için.
         
    * EDDTableAggregateRows'in tüm çocuklardan doğru aralıkları göstermediğini bir sorun. Marco Alba'ya düzeltme ve bug raporu için teşekkürler.
         
*    **Şeyler ŞeylerERDDAP™Yöneticilerin Bilme ve Yapması Gerekiyor:** 
    * TO DO: GÜVENLİK CHANGE: Google Authentication, CSP'nize değişiklikler gerektirebilir.
        
Özellikle, eklemek de gerekebilir https://accounts.google.com/gsi/style  st https://accounts.google.com/gsi/ Bağ-src bağlanmak için. script-src için artık kullanabilirsiniz https://accounts.google.com/gsi/client.
 
        
Daha fazla bilgi için gidebilirsin[Google sayfası](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#content_security_policy)CSP konfigürasyonu hakkında.
         
        
    * Yeni Ortak İzleme Hizmeti. Bu, yönetmenleri güncelleştirmeler için izlemek için yeni bir seçenektir. Veri setinde tek bir iplik yerine her dosya sistemi için bir iplik vardır. Büyük olasılıkla bu, değişiklikler için izlemek için kullanılan iplik sayısını büyük ölçüde azaltacaktır. Bu, tüm veri kümelerinin kendi güncelleme frekansına sahip olduğu her veri setinin yerine birlikte güncellendiğini anlamına gelir. Büyük olasılıkla bu çoğu veri setleri için daha sık güncelleme anlamına gelecektir.
        
Bu eklemek için&lt;UseSharedWatchService&gt; true&lt;/useSharedWatchService&gt; to your installation.xml.
        
          
Lütfen bunu deneyin ve sizin için chris için nasıl çalıştığını tekrar rapor edin. john noaa.gov.
         
    * Kayıtlarda yanlış isimler için düzeltme. Hata için Ayush Singh sayesinde.
         
    * Bazı küçük değişiklikler ve bug düzeltmeleri.
         
*    **İyileştirmeler içinERDDAP™Geliştiriciler:** 
    * Docker kullanarak yerel gelişim için destek. Matt Hopson ve Roje sayesinde.
         
    * Jetty ve belge geliştirmeleri kullanarak yerel gelişime destek. Teşekkürler Micah Wengren.
         
    * Sorunları çapraz platformu azaltmak için testler için değişiklikler. Teşekkürler teşekkürler Shane St. Savage.
         

## Version 2.23{#version-223} 
 (2023-02-27) 

Bu sürüm Bob Simons tarafından yapıldığını unutmayın, böylece Chris John'a geçiş sırasında hala etrafta ve aktif olduğunu gösteriyor. Bu sürümle ifade etmek, tüm kod değişiklikleri Chis John tarafından yapılır, aksi takdirde belirtilmeden.

*    **Yeni Özellikler ve Değişiklikler (kullanıcılar için) :** 
    *    (Hiçbir şey yok)   
         
*    **Şeyler ŞeylerERDDAP™Yöneticilerin Bilme ve Yapması Gerekiyor:** 
    * TO DO: GÜVENLİK CHANGE: Google Authentication şimdi Google Identity Services kütüphanesi aracılığıyla gerçekleştiriliyor ve "Google ile Kayıt" parçası. Google'ın eski "Google Sign In" sistemi için desteği 2023-03-31 durdurulacaktır. Yani Google Kimlik Doğrulamasını kullanıyorsanızERDDAP™kurulum, you MUST update toERDDAP™v2.23+ daha önce. (Bob kısa fark için üzgünüm. Bob'un hatası.)   
         
    * IMPROVED: NCCSV şimdi v1.2. Değişim şu ki, dosyalar şimdi UTF-8 kodlanmış dosyalar (ASCII) Ve şimdi de herhangi bir Unicode karakteri dahil edebilir, Žu_hhhh_ olarak kodlamaz, ancak bu hala izin verilir.
NCCSV dosyaları yazarken,ERDDAP™Şimdi v1.2 dosyaları yazıyor.
        ERDDAP™Hala v1.0 ve v1.1 özelliklerini takip eden NCCSV dosyalarını okuyacaktır.
Pauline-Chauvet sayesinde, n-a-t-e ve thogar-bilgisayarı bunu önermek ve çeşitli elektronik tablo programları UTF-8 dosyalarını ithal edebilir. Bu kod değişikliği için Bob Simons sayesinde.
         
    * NEW: Durum.html web sayfası, veri setlerinin şu anda yükleme ve ilgili istatistikler olduğunu gösteren üst düzeye yakın bir çizgiye sahiptir veya hiçbir veri kümesi yüklenmezse hiçbir şey değildir. Bu, çok yararlı olabilirERDDAP™Yöneticiler neden yüklemeyi denediler Datasets çok uzun sürüyor. Ayrıca, nGridDatasets, nTableDatasets ve n TotalDatasets şu anda anlık olarak doğrulanıyor (Daha önce, son büyük yükün sonuna kadarydılar. Datasets) .
Bu değişiklik Roy Mendelssohn için. Bu kod değişikliği için Bob Simons sayesinde.
         
    * IMPROVED: GenrateDatasets X ml şimdi CF-1.10 için değişiklikler. (CF-1.6) "Conventions" özellikleri.
Bu kod değişikliği için Bob Simons sayesinde.
         
    * Bazı küçük değişiklikler ve bug düzeltmeleri.
         

## Version 2.22{#version-222} 
 (2022-12-08-08) 

Bu salıvermenin Bob Simons tarafından yapıldığını unutmayın, bu yüzden o hala onun ardına geçiş sırasında etrafta ve aktif olduğunu gösteriyor.

*    **Yeni Özellikler ve Değişiklikler (kullanıcılar için) :** 
    *    (Hiçbir şey yok)   
         
*    **Şeyler ŞeylerERDDAP™Yöneticilerin Bilme ve Yapması Gerekiyor:** 
    * TO DO: Hiçbir şey.
         
    * İLGİLİ BUG FIX: Dil seçiminin düşmesi için kodda bir Cross Site scripting- related bug vardı. Teşekkürler teşekkürlerNOAABunu yakalamak için güvenlik taramaları. Bu, gösteriyor ki,NOAAGüvenlik aktif ve rutin olarak güvenlik zayıflıklarını arıyorERDDAP.
         
    * SECURITY FIX: Kullanılan birçok kütüphaneERDDAP™Her zamanki gibi, bu serbest bırakılmasın bir parçası olarak güncellendi. Bu sefer, bu PostagreSQL sürücüsünü güncellemeyi içeriyordu (Hangi bir güvenlik otobüsü vardı) 42.5.1.
         
    * IMPROVED: Daha küçük değişikliklerERDDAP“ hafıza yönetimi sistemi, mevcut hafıza eksikliği nedeniyle verilen bir istek olasılığını azaltmalıdır.
         
    * Bazı küçük değişiklikler ve bug düzeltmeleri.
         

## Version 2.21{#version-221} 
 (2022-10-09-09) 

*    **Yeni Özellikler ve Değişiklikler (kullanıcılar için) :** 
    *    (Hiçbir şey yok)   
         
*    **Şeyler ŞeylerERDDAP™Yöneticilerin Bilme ve Yapması Gerekiyor:** 
    * TO DO: ForJava17, \\-d64'ü JAVA\\_OPTS'de setenv.bat veya setenv.sh'de kullanmamalısınız. Yani oradaysa, lütfen onu kaldır. Sanırım 64 bit modu artık 64 bit sürümünü indirdiğinizde seçilirJava. Sam Woodman sayesinde.
         
    * BUG FIX: Bazen, yeni e-posta sistemi Google E-posta sunucularının tüm gelecekteki tüm girişimleri reddetmesine neden olan çok sık giriş yapmaya çalıştı. Şimdi, e-posta sistemi bu ve ilgili sorunlardan kaçınır.
         

## Version 2.20{#version-220} 
 (2022-09-30) 

*    **v2.20 kullanmayın. Bu kusurlu.** Ancak yöneticiler hala v2.21+'ya yükseltme yaparken listelenen TO DO öğelerini yapmalılar.
     
*    **Yeni Özellikler ve Değişiklikler (kullanıcılar için) :** 
    *    (Hiçbir şey yok)   
         
*    **Şeyler ŞeylerERDDAP™Yöneticilerin Bilme ve Yapması Gerekiyor:** 
    * IMPROVED: Eski hafıza yönetim sistemini yeniden etkinleştiriyoruz (Math2.ensureMemoryAvailable) Ve yeni hafıza yönetimi sistemini değiştirdi (EDStatic.shedBuRequest) onunla daha iyi çalışmak. See See See See[Hafıza Durumu](/docs/server-admin/additional-information#memory-status)Detaylar için.
         
    * CHANGED: Varsayılan olarak&lt;ipAddressMaxRequests&gt; in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in indatasets.xml7 ila 15 arasında yükseldi. Bazı meşruiyetin açık olduğu açıktırWMSMüşteriler 7'den fazla eşzamanlı istek üretebilirler.
         

## Version 2.19{#version-219} 
 (2022-09-01) 

*    **v2.19 kullanmayın. Bu kusurlu.** Ancak yöneticiler hala v2.20+'ya yükseltme yaparken listelenen TO DO öğelerini yapmalılar.
     
*    **Yeni Özellikler ve Değişiklikler (kullanıcılar için) :** 
    * YENİ: Yeni bir sunucunun işlevi var,orderByDescending, hangi gibi çalışırorderByAma bir çeşit aşağılayıcı sipariş. Adam Leadbetter sayesinde.
         
    * IMPROVED: Şimdi, grafikler (Ama haritalar değil) Mevcut alanı tuvalde doldurmak için genişleyecek, yani efsane tarafından kullanılmadığı uzay. Yüksek grafikler, kare grafikler veya geniş grafikler elde edebilirsiniz ve &.size=_ genişlik_ geniş_graflar|_height_ parametre (nerede genişlik ve yükseklik tuval boyutunu belirtir, pikselde) İstek URL'de. (Bu, .graph web sayfasında bir seçenek değildir. Bunu URL'ye manuel olarak eklemek zorundasınız.) Eğer ve boyut parametresini belirtmezseniz, mevcut alanı doldurmanız için talepler, .txt, .largePng, . smallPdf, .pdf ve .large.pdf önceden tanımlanmış tuval boyutlarına sahiptir, bu yüzden grafiğiniz genellikle kare olacaktır. Bob Fleming sayesinde.
         
*    **Şeyler ŞeylerERDDAP™Yöneticilerin Bilme ve Yapması Gerekiyor:** 
    * TO DO:ERDDAP™Şimdi ihtiyaç duyulanJava17 ve ilgili Tomcat 10. Takip etmeniz gerekirERDDAP™yükleme talimatları (Ya da Docker için eşdeğer e.g.) yüklemek içinJava17 ve Tomcat 10 ve kopyalayın\\[tomcat\\]/ Nicholas directory from your Tomcat 8 installation into the new\\[tomcat\\]rehberi. Sizin için yapmanız gereken başka değişiklikler yokturERDDAPBu değişiklikle ilgili yükleme. Başka bir deyişle,ERDDAP™Daha önce olduğu gibi çalışır.
        
Yapmayı unutmaERDDAP- Tomcat'ın sunucusu.xml ve context.xml ile Tomcat'ı yükseltdiğinizde ilgili değişiklikler. See See See SeeERDDAP"[Tomcat yükleme talimatları](/docs/server-admin/deploy-install#tomcat).
        
Benim izlenimimJava17, uzun süredir daha fazla işleme gücü ve hafızayı tercih ettiği, daha büyük uygulamalar gibiERDDAP™, bu yüzden biraz daha yavaş çalışırJava8 Düşük güç bilgisayarları ile (e.g., 2 temel ve minimum RAM) ve biraz daha hızlı çalışırJava8 daha yüksek güç bilgisayarları ile (e.g., 4+ cores and plentiful RAM) . Yani eğer kötü performansı görürseniz, Linux’un programları kullanın[Top top](https://www.howtogeek.com/668986/how-to-use-the-linux-top-command-and-understand-its-output/)Kaynak kullanımını kontrol etmek ve vermekERDDAP™Daha fazla kaynak, özellikle daha fazla hafıza. Memory ucuz&#33; Çoğu telefon, bazılarınızın çalıştırmak için kullandığı sunuculardan daha fazla işlemci ve hafızaya sahiptir.ERDDAP&#33;
Erin Turnbull sayesinde.
         
        
    * TO DO: If you useERDDAP™Cassandra'ya erişmek için, Cassandra için, sürümünü kullanmaya devam etmeniz gerekirJavaCassandra'yı çalıştırmak için kullanıyordunuz. Sadece geçişJava17 Tomcat+ERDDAP.
         
    * TO DO: Önerilen: Eğer sunucunuzun CPU'su çekirdekleri ve 8+ GB RAM'ı çekiyorsa, bu ayarları sizin için bu ayarlara değiştirmeyi düşünündatasets.xmlDosya:
```
          <nGridThreads>3</nGridThreads>  
          <nTableThreads>3</nTableThreads>  
```

Eğer sunucunuz daha az kaynağa sahipse, bu ayarların her ikisi için "1" tutun.
nThreads sistemleri içinEDDGridFromFiles and EDDTableFiles önemli ölçüde gelişmişti. Bu değişiklikler büyük bir hız iyileşmesine yol açtı (e.g., nThreads 2 veya daha fazla ayarlandığında 2X hız) En zorlu talepler için (Çok sayıda dosyanın sonuçları toplamak için işlendiği zaman sonuçları toplamak gerekir) . Chris John'dan bazı ilgili değişiklikler de genel bir hıza yol açacaktırERDDAP. Bu değişiklikler için kod Chris John tarafından katkıda bulundu. Teşekkür ederim, Chris&#33;
         
    * WARNING: hipnozdatasetID“Döntilir ve artık desteklenmez (Teknik olarak hala teknik olarak izin verildiğine rağmen) . Muhtemelen bir sonraki sürümde hayal kırıklığına uğrayacaklar. Eğer hipnozdan kaçınmak için hyphens kullanıyorsanız, şu anda vurgulara geçiş yapın. Şimdi değişikliği yaparsanız, kendi hızınızda. Bir sonraki sürüme kadar beklerseniz, panik içinde olacaksınız ve o gün bununla uğraşmak zorundasınız.
         
    * YENİ: Şimdi, şimdilik.htmlTableVeri yanıtları, bir String hücresindeki veriler veri içeriyorsa:image/JP;base64, bir baz64 kodlanmış .JP görüntü,ERDDAP™Bir ikonu gösterecektir (Bu yüzden kullanıcı görüntüyü görebilirler, eğer üstünde eğiliyorlarsa) metin veya görüntüyü klip odasına kurtarmak için düğmeler. Marco Alba sayesinde (Kod kime katkıda bulundu?) Bob Simons (Kim onu biraz değiştirdi) .
         
    * YENİ: -StandartNames ekle
Eğer \\-doNotAddStNames'ı çalıştırdığınızda bir komut satırı parametresi olarak eklemezseniz Datasets X ml, üretir Datasets X ml eklemeyecekstandard\\_nameVeaddAttributesLetitude, uzunlık, yükseklik, derinlik veya zaman adı verilen değişkenler dışında herhangi bir değişken için (Hangisi açıkstandard\\_names) . Bu, üretildikten sonra faydalı olabilir Datasets X ml doğrudan içerideERDDAP™Çıktıyı düzenlemeden, çünkü üretir Datasets X ml sık sık tahmin ederstandard\\_nameYanlış bir şekilde. (Bunu kullanmadan önce çıktıyı her zaman düzenlemenizi tavsiye ediyoruzERDDAP.) Bu parametreyi kullanmak diğer küçük ilgili etkilere sahip olacaktır çünkü tahmin edilen tahminstandard\\_nameGenellikle diğer amaçlar için kullanılır, e.g., yeni bir yaratmak içinlong\\_nameVe renkBar ayarlarını oluşturmak için. Kevin O'Brien sayesinde.
         
    * YENİ: Şimdi koyabilirsiniz&lt;GüncellemeMax Events&gt;10&lt;/updateMax Events&gt; in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in indatasets.xml  (En yakın diğer ayarlarla) Maksimum dosya değişikliklerini değiştirmek için (varsayılan=10) Bu, herNMillis sistemi tarafından işlenecektir. Daha büyük bir sayı (100?) Veri setinin her zaman güncel tutulması çok önemli olduğunda faydalı olabilir. Bakın,[GüncellemeMax Events Belgeler](/docs/server-admin/datasets#updatemaxevents). John Maurer sayesinde.
         
    * NEW: Global " için destek eklendi"real\\_time= Gerçek =|Sahte" String özelliği.
Eğer bu yanlış (varsayılan varsayılan) Ve eğer veri kümesi güncelleştirme kullanmıyorsa HerNMillis,ERDDAP™Tüm dosyanın daha önce oluşturulacağı dosya türleri için taleplere önbellek cevapları önleyecekERDDAP™Kullanıcıya cevabı göndermeye ve onları yaklaşık 15 dakikaya kadar yeniden kullanmaya başlayabilir. (E.g.,.nc,) .
Eğer bu doğruya ayarlanırsa veya veri seti güncelleniyorsa HerNMillis,ERDDAP™Yanıt dosyalarını asla önlemeyecek ve her zaman yeni oluşturulan dosyaları geri dönecektir.
John Maurer sayesinde.
         
    * YENİ: E-postalar şimdi ayrı bir e-postada gönderilir. Bu, e-postaları daha hızlı üreten veri setlerini ve diğer eylemleri yükler, çünkü yüklemeDatasets gönderilen e-postayı beklemek zorunda değildir, bu bazen uzun zaman alır. Yeni sistem e-posta seansı için birden fazla e-posta gönderebilir, böylece e-posta sunucu giriş sayısını azaltır ve bu başarısızların riskini azaltır çünkü çok sıklar. Durumda e-posta için istatistikler vardır.html sayfası ve günlük tanı mesajları.txt - "email protectedThread" arayın. Not that a tally of nEmailsPerSession=0, trouble, i.e., bir e-posta oturumu herhangi bir e-posta göndermedi.
Bob Simons sayesinde.
         
    * CHANGED: E-postalar şimdi biraz farklı kodla gönderilir (ÇünküJava17 ve e-posta için değişim) . E-posta gönderiyorsanız lütfen e-posta gönderinerd.data at noaa.gov.
         
    * YENİ: Uzak URL'nin “kökün” bir uzaktan URL'nin şimdi ayrı bir dokunuşla ele alındığı Abonelik eylemleri. Bu, URL'lere daha hızlı dokunan veri kümelerini ve diğer eylemleri yükler çünkü yüklemeDatasets, bazen uzun bir zaman alır. Durumda touchThread için istatistikler vardır.html sayfası ve günlük tanı mesajları.txt - " touchThread" arayın.
Bob Simons sayesinde.
         
    * YENİ: Durum.html sayfasında, "Major LoadDatasets Time Series" bölümünde, dökülen talep sayısını gösteren yeni bir "düşük" sütunu var.ERDDAP™hafıza kullanımı çok yüksekti. Bağışlanan istekler HTTP statüsü kodu 503 "Hizmet kullanılabilir". Bu istekler mutlaka bir problem değildi. Onlar sadece meşgul bir zamana geldiler. Bu, bir Revamp parçasıydı nasılERDDAP™Yüksek hafıza kullanımı ile anlaşmalar.
         
    * YENİ: Unix/Linux bilgisayarlarda, şimdi CPU yük ve hafıza kullanımı dahil mevcut işletim sistemi bilgileri ile "OS Info" hattı var.
         
    * IMPROVED: Şimdi, ne zamanERDDAP™Yeniden başlatılır ve hızlıdırRestart= true, EDDTable FromFiles datasets yeniden alt setleri yeniden kullanılacaktır.ncVe ayrı ayrı ve.nc. Bazı veri setleri için, bu veri setlerini yüklemek için zamanı büyük ölçüde azaltır (e.g., 60 saniyeden 0.3'lere) . Yeni e-postaYazdır ve görevThread ile birlikte (Yukarıda bakınız) Bu, yeniden başlamak için büyük ölçüde hızlanmalıERDDAP™Birçok kişi içinERDDAP™Kurulumlar. Ben Adams ve John Kerfoot sayesinde.
         
    * CHANGED: Daha önce, yetim veri setleri (İçinde yaşayan veri setleriERDDAP™Ama içinde değildatasets.xml) Sadece statüde kaydedildi. html ve her büyük yükDatasets'ten sonra.txt. Şimdi, otomatik olarak kaldırıldılarERDDAP™Ve durum.html ve log.txt'de ve e-posta ile e-postalandı Her şeyTo. Yani bir veri kümesi kaldırmak istiyorsanızERDDAP™Şimdi yapmanız gereken tek şey, xml'in chunk'ını xml'i kaldırmaktırdatasets.xmlVe bir sonraki büyük yükDatasets içinde kaldırılacaktır. Bob Simons sayesinde.
         
    * KNOWN BUG netcdf-java v5.5.2 ve v5.5.3: The The The The The The The TheEDDGridBundan sonra GenrateDatasets X ml, uzaktan THREDDS kataloglarında veri setlerine referansları içeren THREDDS katalogları için çalışmak için kullanıldı. Şimdi değil. Sorunu netcdf-java geliştiricilerine rapor ettim.
         
    * BUG FIX: Docker kullanıcıları için kurulum.xml parametreleri viaERDDAP\\__paramName_: int ve boolean parametreleri (e.g., email SmtpPort) ,ERDDAP™Yanlış bir şekilde sadece _paramName_ arıyordu. Şimdi _ için görünüyorERDDAP\\_paramName_. Alessandro De Donno sayesinde.
         
    * CHANGE: The TheERDDAP™Test sistemi şimdi yeni oluşturulan test görüntülerinin tam olarak beklendiğini kontrol etmek için otomatik bir sistem kullanır. Chris'e teşekkürler John öneri için ve Bob Simons uygulama için.
         

## Version 2.1818{#version-218} 
 (2022-02-23) 

*    **Yeni Özellikler ve Değişiklikler (kullanıcılar için) :** 
    * NONE
*    **Şeyler ŞeylerERDDAP™Yöneticilerin Bilme ve Yapması Gerekiyor:** 
    * BUG FIX:.ncBazı durumlarda dosyaları kapalı değildi. Şimdi onlar. Marco Alba sayesinde, Roland Schweitzer, John Maurer ve diğerleri.
         

## Version 2.17{#version-217} 
 (2022-02-16) 

*    **Yeni Özellikler ve Değişiklikler (kullanıcılar için) :** 
    * BUG FIX: Değişikliklerden sonraorderByBirkaç yıl önce, Tabledap's Make A Graph, kullanılan birçok sorguyu düzgün bir şekilde ele almadı.orderBy_Xxx_. Şimdi öyle. Maurice Libes sayesinde.
         
    * CHANGE: Daha önce,ERDDAP™. şeffaf şeffaf şeffaf şeffaf Png'ın enlem ve / veya uzunlık değerleri kısmen ya da tamamen dışlanmış olması. (ERDDAP™GitHub Issues #19, Rob Fuller tarafından yayınlandı - Rob Fuller'in yayınladığı yazı sayesinde) Şimdi görüntünün herhangi bir dış mekan alanı için şeffaf piksel döndürür. Bu birçok müşteri uygulamaları için faydalıdır. Bu değişikliği yapmak için kod değişiklikleri tamamen Chris John tarafından yapıldı. Çok teşekkür ederim Chris&#33;
         
    * CHANGE: Daha önce,ERDDAP™Verilen bir boyut için indeks değerlerinin nerede olduğuna dair griddap talepleri reddedildi\\[Yüksek:low\\]. Şimdi bu talepleri düşük ve yüksek değerleri takas ederek gerçekleştirir. Bu, kullanıcılar için uzun süredir devam eden bir problem ve dış programlar için xtracto gibi çözülür ve bu, yüksekten düşük talep etmek için enlem değerlerine sahip birkaç veri kümesini takip etmek zorunda kaldı.\\[ (50 50 50) : (20 20) \\]Bu yüzden index alanındaki istek oldu.\\[Düşük: yüksek\\]. See See See See https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplAquariusSSS3MonthV5.html Şimdi, bir istek gibi\\[ (20 20) : (50 50 50) \\]Bu veri setlerinden biri otomatik olarak yorumlanır\\[ (50 50 50) : (20 20) \\].
         
    * CHANGED: .esriAscii şimdi bir "File: Save As" dialog kutusu kullanıcının tarayıcısında. Joel Van Noord sayesinde.
         
    * BUG FIX: Şimdi, bir çocuğun veri kümesinin uzun değişkeni bir çocuğunEDDGridLonPM180 veyaEDDGridLon0360 veri kümesinin bir parçası varvalid\\_minve/veyavalid\\_maxÖzellikler, kaldırıldılarEDDGridLonPM180 veyaEDDGridLon0360 veri kümesi. Roy Mendelssohn sayesinde.
         
*    **Şeyler ŞeylerERDDAP™Yöneticilerin Bilme ve Yapması Gerekiyor:** 
    * TO DO: Eğer setiniz varsa&lt;VeriProviderFormActive&gt; XSS kırılganlığı ile geçici olarak uğraşmak için yanlış, lütfen doğruya geri dönelim.
         
    * SECURITY BUG FIX: Data Provider Form'da Sabit XSS kırılganlığı. Genaro Contreras Gutiérrez sayesinde.
         
    * BUG FIX: Bir AWS S3 Sharctory'nin 10000'den fazla dosyaları olduğu zaman,ERDDAP™"Internal Hata" attı. Bu şimdi sabit. Andy Ziegler sayesinde.
         
    * BUG FIX:EDDGridSideBySide değişkenin izin vermedisourceNameFarklı çocuk veri setlerinde aynı olmak. Şimdi öyle. Joshua Stanford sayesinde.
         

## Version 2.16{#version-216} 
 (2021-12-17) 

*    **Yeni Özellikler ve Değişiklikler (kullanıcılar için) :** 
    * CHANGES/BUG FIXES: Dile özgü editörlerden önerileri sayesinde çeviri sistemine çok az değişiklik. Melanie Abecassis sayesinde, Marco Alba, Jessy Barrette, Filipe Fernandes, Etienne Godin, Jennifer Sevadjian ve Mike Smit.
         
    * Google Translate için uygun bir feragat ve alıntılama, Google Translate açısından gerekli olduğu gibi. Ayrıca,&lt;html&gt; HTML'de her web sayfası için etiket, makine çevirisi olarak İngilizce olmayan web sayfaları doğru bir şekilde tanımlar. Mike Smit sayesinde.
         
    * BUG FIX: Giriş web sayfaları artık farklı dil ayarları ile düzgün çalışıyor. Mike Smit sayesinde.
         
    * YENİ YENİ YENİ YENİ YENİorderBySum filtresi. Ve yeni Check All and Uncheck All düğmeleriEDDGridData Access Form web sayfası. Marco Alba tarafından kod katkısı sayesinde.
         
*    **Şeyler ŞeylerERDDAP™Yöneticilerin Bilme ve Yapması Gerekiyor:** 
    * TO DO: Eğer varsa
        &lt;SoruMarkImageFile&gt;QuestionMark.jpg&lt;/questionMarkImageFile&gt;
Kurulumunuzda.xml dosyasında, tüm etiketi kaldırmanız gerekir (önerilir, böylece varsayılan dosya kullanılır) veya onu değiştirmek:
        &lt;SoruMarkImageFile&gt;QuestionMark.txt&lt;/questionMarkImageFile&gt;
         
    * CHANGE: Sadece bildiğiniz gibi,[Kabulium](https://adoptium.net/?variant=openjdk8)Satın aldı OpenJDK, ana/recommended kaynağı olarakJava  (OpenJDK) .
         
    * CHANGE: Kayıt dosyalarındanERDDAP™GenerateDatasets X ml ve DasDds şimdi UTF-8, bilgisayar varsayılan karakter seti değil. Çok fazla kontrol yaptım ve bunu sağlamak için birkaç değişiklik yaptımERDDAP™Her zaman, her türlü dosyayı okuduğunuz veya yazarken doğru karakteri belirtir ve artık hayır artık (Birkaç durumda) Bilgisayarın varsayılan karakterine dayanmaktadır. Bu birkaç hata düzeltti ve UTF-8'i mümkün olduğunca çok dosya türü kullanarak mümkün olduğunca yakın hareket etti. (e.g., .log, .xml, .html,.json,.jsonl,.ncHeader) . ISO-8859-1 kullanmak için birçok eski dosya türü gerekli olduğunu unutmayın (E.g.,OPeNDAP.das, .dds, .csv,.tsv,.nc3,.nccsv.cpt) . Daha önce CF grubu ve ile çalışmaya çalıştımUnidataUTF-8 için destek eklemek için.nc3 dosyalar; ikisi de dirençliydi.
         
    * YENİ: AWS S3'ten dosyaları indirdiğinizde,ERDDAP's önbellek FromUrl sistemi in Url sistemiEDDGridFromFiles and EDDTableFiles şimdi paralelleştirilmiş chunks ile dosyaları indirmek için yeni AWS Transfer Manager kullanır. (Böylece çok hızlı hızlı) . Hedef, dosya başına 20 Gbps'ye ayarlanıyor, bu yüzden bu tüm AWS örnek türleriyle iyi çalışır, ancak özellikle mükemmel "Networking Performance" olan kişiler. Bu değişim ileERDDAP's cache Url sistemi artık xarray'ın pre-chunked dosyalarının paralelleştirilmiş indirme yaklaşımlarına karşılaştırılabilir hızlar sunuyor, ancak kaynak dosyalarını kaynak dosyalarından dönüştürmeye gerek kalmadan.ncve.hdfchunked xarray dosyaları. Aslında,ERDDAP“Sistem, aynı dosyadan okumak için bir sonraki istek varsa daha iyidir, çünküERDDAP™Şimdi dosyanın yerel bir kopyası var. Topluluğumuz yıllar boyunca standartlaştırmayı harcadı.ncve.hdfdosyaları. Şimdi, tüm verilerin AWS S3'te depolandığında iyi performans elde etmek zorunda değiliz. Rich Signell sayesinde.
         
    * CHANGE: arama mühendisliği =Lucene şu an için, deprecated. Genellikle arama mühendisliği =orijin'in daha arzu edilen davranışlarından biraz farklı olan karmaşık bir sistemdir. Neredeyse herkes içinERDDAP™Kurulumlar, Lucene'nin zaman tasarrufu, sonuçlardaki farklılıkları dengelemez. Lütfen mümkünse arama mühendisliği =orijin kullanın. Eğer bu sorunlara neden olursa, lütfen e-posta Bob.
         
    * CHANGE: Lucene arama mühendisliği şimdi orijinal arama mühendisliği gibi davranıyor. Artık lucene'nin bir veri kümesi maçları ve orijinalin olmadığını düşündüğü herhangi bir vaka yoktur. Ayrıca, lucene'nin sıralaması artık orijinal sıralamalara eşit (Çünkü orijinal şimdi her zaman sıralamayı hesaplamak için kullanılır) .
         
    * BUG FIX: Son bir salıvermeye başlayın,ERDDAP™Verilen AWS S3 kovasındaki ilk 1000 nesneden daha fazlasını görmeyi bıraktı. Şimdi,ERDDAP™Yine tüm nesneleri görür. Andy Ziegler sayesinde.
         
    * BUG FIX: Şimdi EDDTableAggregate Rows ortadan kaldırıractual\\_rangeBir veya daha fazla çocuk veri setlerinin asla değişkenlerini bilmiyor ‘ ‘ ‘actual\\_range  (E.g., EDDTable FromDatabase) . Erik Geletti sayesinde.
         

## 2.15{#version-215} 
 (2021-11-19) 

*    **Yeni Özellikler ve Değişiklikler (kullanıcılar için) :** 
    *   ERDDAP™Kullanıcının tüm web sayfaları için kullanılacak dili belirtmesine izin vermek için yeni bir sistem var. Eğer birERDDAP™Kurulum onu kullanmak için ayarlanır, diller listesi her web sayfasının üst köşesinde görünecektir.ERDDAP™URL'nin bu sürümden önce çalışması devam ediyor ve her zaman daha önce olduğu gibi İngilizce içeriği geri dönüyor.
        
Tüm metin veya tüm web sayfaları tercüme edilmedi. Qi ve Bob'un %100'e ulaşmasına engel olan bu projede zaman kısıtlamaları vardı.
        
Açık soru şu: Chrome web sayfalarını yüze çevirdiğinde neden bu kadar çok çaba sarf ettik? Cevap: Bu şekilde, çevirinin nasıl yapıldığı konusunda çok daha fazla kontrol alıyoruz. Elbette, web sayfaları, e.g., veri setleri ve özetleri, değişkenlerin, parametrelerin, birimlerin ve organizasyonların isimlerine çevrilmemesi gereken birçok kelime var. Çeviri çabalarının çoğu tercüme edilmemesi gereken kelimeleri ve cümleleri tanımlamaktı. Ayrıca, makine çevirileri mangle'ye belirli HTML işaretlerine eğilimlidir. Çeviriyi yönetmek bize bu sorunu en aza indirmek için izin verdi.
        
Çeviri projesi Qi Zeng tarafından yapıldı (Google Summer of Code Intern) Ve Bob Simons Google'ın çeviri web hizmetini kullanıyor. Bu büyük bir projeydi. Teşekkürler, Qi&#33;
        
    * BUG FIX:ERDDAP™Şimdi ORCID ID'nin X'e son sayısal olarak sahip olmasını sağlar. Maurice Libes sayesinde.
         
*    **Şeyler ŞeylerERDDAP™Yöneticilerin Bilme ve Yapması Gerekiyor:** 
    * TO DO:
        
        * İlgili birkaç değişiklik yapmanız gerekirERDDAPKullanıcıların web sayfaları için dili belirtmelerine izin vermek için yeni sistem.
            * Kurulumınızın ilk satırında.xml vedatasets.xmlDosyalar, değişiklikler: encoding="UTF-8" ve belgenin metin editöründeki yankısını değiştirir, böylece UTF-8 dosyası olarak kaydedilir. GenrateDatasets X ml şimdi bunun olduğunu varsayıyordatasets.xmlUTF-8 dosyası.
            * Derleyen programcılarERDDAP: Bütün bunların hepsiERDDAP™.java dosyaları varsayılan olarak UTF-8 dosyaları olarak tedavi edilmelidir. javac komut satırına "-encoding UTF-8" eklemeniz gerekebilir. (Ben yaptım.) 
            * Bu sistemi sağlamak için (şiddetle tavsiye edilen şiddetle tavsiye edilir) Ama içinde&lt;StartBodyHtml5&gt; etiketi, belirtebileceğinizidatasets.xml"&amp&#33;loginInfo;" "&amp&#33;loginInfo;|Veamp&#33;dil; ” böylece dillerin listesi her şeyin üst köşesinde görünürERDDAP™Web sayfası.
            *   ERDDAP™Sadece sadece kullanır&lt;StartBodyHtml5&gt; etiketi, belirtebileceğinizidatasets.xmlHTML içeriklerini her şeyden önce belirtmek içinERDDAP™Web sayfası, kullanıcının hangi dili seçtiği önemli değil. Bu etiketi kullanmak için değiştirirseniz
" " ""&EasierAccessToScientificData;"Easier bilimsel verilere erişimi" ve "
" " ""&BroughtToYouBy;"Seninle sana teslim oldu" yerine,ERDDAP™Bu cümlelerin pankarttaki çeviri versiyonlarını kullanacak.
            * Benzer şekilde, yeni varsayılan&lt;TheShortDescriptionHtml&gt; in theShortDescriptionHt ml&gt; in theShortDescriptionHt ml&gt; in theShortDescriptionHt ml&gt; in theShortDescriptionHt ml&gt; in theShortDescriptionHtml&gt; in theShort ml&gt; in theShortDescriptionHt ml&gt; in theShortdatasets.xmlIs is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is
                
```
                <theShortDescriptionHtml><!\\[CDATA\\[ 
                <h1>ERDDAP</h1>
                &erddapIs;
                &thisParticularErddap;
                \\[standardShortDescriptionHtml\\]
                \\]\\]></theShortDescriptionHtml>
```
Son 3 içerik hatları, çeviri metin ile değiştirilecek şeylerdir. Bunlardan herhangi birini çevirirseniz (Özellikle & bu KatılımcıErddap;) Ya da hepsi açık metindedatasets.xml  (Hangi önceliği varsa, mevcut) veya mesajlar.xml, bu metin, kullanıcının neyi seçtiği konusunda hiçbir şey görünmeyecektir. Bu mükemmel değil, ama birkaç yöneticinin düzenlemek istediğini anladım&lt;TheShortDescriptionHtml&gt; 35 farklı dosyada bu etiketin 35 farklı çeviri versiyonlarını sunmak için.
        
          
         
    * CHANGED: Bazı hatalar şimdi biraz farklı şekilde ele alınır ve bu nedenle statüdeki "Failed Requests"ın yüksek sesle eklenebilir.html ve Daily Report Email. Bu rakamlar daha önce olduğundan biraz daha büyük olabilir.
         
    * BUG FIX: GenrateDatasets X ml içinEDDGridLon0360 veEDDGridLonPM180 şimdi kaynak veri kümelerini dışlıyordatasetID=~".\\*\\_LonPM180" vedatasetID=~".\\*\\_Lon0360", sırasıyla.
         

## Version 2.14{#version-214} 
 (2021-07-02) 

*    **Yeni Özellikler ve Değişiklikler (kullanıcılar için) :** 
    *    (Hiçbir kimse hiçbir şey yok)   
         
*    **Şeyler ŞeylerERDDAP™Yöneticilerin Bilme ve Yapması Gerekiyor:** 
    * YENİ:EDDGridLon0360, uzun vadeli değerler vegt ile bir ağlayan veri kümesi yapar;=0 ve 0&lt;=360, uzunlık değerlere vegt ile bir ağlayan veri setinden;=-180 ve 180;&lt;=180. Görün bakalım,[EDDGridLon0360 belgeleri](/docs/server-admin/datasets#eddgridlon0360). Dale Robinson sayesinde.
         
    * YENİ:ERDDAP™Yöneticiler şimdi kurulumda herhangi bir değere sahip olabilir.xml, adında bir çevre değişkeni aracılığıylaERDDAP\\__valueName_ before runningERDDAP. Örneğin, kullanınERDDAP\\_baseUrl overrides the&lt;BaseUrl&gt; değer. Bu, dağıtma yaparken el ele alınabilirERDDAP™Bir konteynerle, kurulumda standart ayarlar koyabilirsiniz.xml ve sonra çevre değişkenleri aracılığıyla özel ayarlar tedarik edebilirsiniz. Gizli bilgi tedarik edersenizERDDAP™Bu yöntem aracılığıyla, bilginin gizli kalacağını kontrol ettiğinizden emin olun.ERDDAP™Sadece başlangıç başına bir kez çevre değişkenlerini okur, ilk ikinci başlangıçta, bu yüzden bunu kullanmak için bir yol: çevre değişkenlerini kurmak, başlayınERDDAP™, bekleye kadar bekleyinERDDAP™Başladı, sonra çevre değişkenlerini unset. Marc Portier sayesinde.
         
    * IMPROVED: Şimdi, bir EDDTable'teki bazı dosyalar... Birçok dosyayı içeren dosyalar çok uzun bir String değerine sahiptir, dataset çok daha hızlı yüklenecek ve çok daha hızlı talep etmeye cevap verecek. Daha önce,ERDDAP™Bu tür veri kümeleri için dosya bilgileri ile saklanan dosyaların min ve max String değerleri için çok fazla yer ayıracaktır. Ortaya çıkan dosya çok büyüktü, yazılması ve yavaşça okumasına neden oldu. OBIS sayesinde.
         
    * IMPROVED: Şimdi,ERDDAP™CSV dosyalarında alışılmadık ve geçersiz karakter dizilerini yorumlamanın daha iyi bir işi. OBIS sayesinde.
         
    * FIX: Cassandra ile bir yıllık problemden sonra, sonunda Cassandra'yı başarıyla kurdum. (v2) Tekrar tekrar ve bu yüzden Cassandra v2 ile testleri yeniden becerebildi. Şimdi daha emin bir şekilde devlet yapabilirim ki,ERDDAP™Cassandra v2 ve v3 ile çalışır. ONC sayesinde.
         

## Version 2.1212{#version-212} 
 (2021-05-14) 

*    **Yeni Özellikler ve Değişiklikler (kullanıcılar için) :** 
    * BUG FIX: Abone kara listedeyseniz, aboneliklerinizin listesini talep edemezsiniz.
         
*    **Şeyler ŞeylerERDDAP™Yöneticilerin Bilme ve Yapması Gerekiyor:** 
    * TO DO: YENİ: Sistem, kötü niyetli kullanıcıların yeteneklerini otomatik olarak sınırlandırır ve aşırı agresif meşru kullanıcıları diğer kullanıcılar için çok sayıda eşzamanlı istek yapmak için aşırı derecede agresif bir şekilde sınırlandırır. İçinde 3 yeni opsiyonel etiket vardatasets.xmlHangisinden / hemen sonra ekleyebilmeniz&lt;GrafikBackground Color&gt; :
```
        <ipAddressMaxRequests></ipAddressMaxRequests>  <!-- current default=7 -->
        <ipAddressMaxRequestsActive></ipAddressMaxRequestsActive>  <!-- current default=2 -->
        <ipAddressUnlimited></ipAddressUnlimited>  <!-- default=empty -->  
```

Daha fazla bilgi için, bakınız[İLGİLİLER](/docs/server-admin/datasets#ipaddressmaxrequests).ERDDAP™Ayrıca şimdi eşsiz kullanıcıların "Number of unique users"larını yazdırır (O zamandan beri başlangıç) " statüsü.html sayfasında.
Çin'deki kişi sayesinde benim için saldırıyorERDDAP™kurulum.
         
    * CHANGE to Postgresql sürücüsü davranışı: Postgresql sürücüsünü güncellediğim zaman, Postgresql ve GenerateDatasetsXml tarafından üretilen masa listesindeki sütun isimleri daha önce olduğu gibi tüm üst katlara geri döndü. Bu, diğer şeyleri etkileyeceğini bilmiyorum, çünkü veritabanı genellikle bu isimlerin hassas durumda olduğunu düşünüyor. Test veri setim hala doğru çalışıyor. Ancak veri setiniz bununla çalışmayı durdurursaERDDAP™Güncelleme, bu ilk önce takip etmek için mümkün olan nedenidir.
         
    * BUG FIX:ERDDAP™Şimdi ayrıca özel AWS S3 dosyaları doğru şekilde ele alıyor. AWS S3 dosyalarının kullanımı ile ilgili diğer gelişmeler vardı. Michael Gangl ve Dylan Pugh sayesinde.
         
    * YENİ:EDDGridFromNcFiles andEDDGridFromNcFiles Unpacked artık "yapılardan" verileri okuyabiliyor.nc4 ve 4.hdf4 dosya. Bir yapıdan gelen bir değişkeni tanımlamak için,&lt;sourceName&gt; &gt; &gt; &gt; Formatı kullanmalıdır: _fullStructureName_|_memberName_, örneğin grup1/myStruct|Member . NRL sayesinde.
         
    * CHANGED: Şimdi, mevcut bellek kullanımı artı bu istek biraz yüksekse, griddap setleri Bu talep için nThreads 1. Böylece,ERDDAP™Bellek az olduğunda hafızayı korur. Çin'deki kişi sayesinde benim için saldırıyorERDDAP™kurulum.
         
    * Açık dosyaları izlemek için YENİ sistem (Hangi soketleri ve diğer şeyleri içerir, sadece dosyaları değil) Tomcat on Linux bilgisayarlar. Bazı dosyalar asla kapanmıyorsa, açık dosyaların sayısı en fazla izin verilen ve çok sayıda gerçek kötü şeyin gerçekleşmesine kadar artabilir. Şimdi Linux bilgisayarlarda (Bilgi Windows için mevcut değil) :
        
        * statüsün sağ tarafında yeni bir "Open Files" sütunu var.html web sayfası max dosyaların yüzdesini açık gösteriyor. Windows'da, sadece "" gösteriyor.
        * When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When WhenERDDAP™Bu bilgiyi her büyük veri setinin yeniden yük sonunda üretir, girişe yazdıracaktır. txt dosyası:
openFileCount =_current_ of max=_max_%=_percent_
        * Yüzde &gt;50 ise, bir e-posta gönderilirERDDAP™yönetici ve e-posta Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey E-posta adresleri için.
        
Daha fazlasını öğrenmek için, ya da bu sorunu görürsenizERDDAP™gör[Çok fazla Open Files](/docs/server-admin/additional-information#too-many-open-files).
Çin'deki kişi sayesinde benim için saldırıyorERDDAP™kurulum.
         
    * YENİ: "Too'nun birçok açık dosyayı kontrol etmek için çok fazla şey ekledim", bu yüzden görev sadece duraklar ve kullanıcı hata mesajını görür. Veri dosyaları artık onları bir "Too birçok açık dosya" hatasında izlerse kötü olarak işaretlenmez.
         
    * YENİ YENİ YENİ YENİ YENİ\\[Büyük Parent Yönetmeny\\]/badFilesFlag rehberi:
Bu dizininde bir dosya koyarsanız,datasetIDDosya adı olarak (Dosya içeriği önemli değil) ,ERDDAP™KötüFilesleri silecektir.ncBu veri kümesi için dosya (Eğer herhangi bir) Ve veri kümesi ASAP'ı yeniden yükleyin. Bu nedenlere sebep olurERDDAP™Daha önce dosyaları ile çalışmak için tekrar denemek (Açıkçası?) Kötü olarak işaretlendi. Marco Alba sayesinde.
         
    * CHANGED: Başlangıçta, eğer bir şey varsaEDDGridFrom...Files or EDDTable From... Files dataset başlangıçta bilinen geçerli dosyaları listesinde 0 dosyaya sahiptir (e.g., yeni bir veri kümesi) Sonra,ERDDAP™defers onu yükler ve bir bayrak ayarlar, böylece büyük yükDatasets bittikten sonra ASAP yüklenecektir. Bu yeni veri setleri olduğunda ilk başlangıç hızları.
         
    * CHANGED: FileVisitorDNLS.testAWSS3 () DosyaVisitorSubdir.testAWSS3 () Şu anda AWS v2 kullanın (v1) SDK. Şimdi GitERDDAP™Dağıtım şimdi tüm gerekli dosyaları içeriyor ve artık büyük v1 AWS SDK jar dosyasını manuel olarak eklemek zorunda değilsiniz.
         
    * CHANGED: Maven'i algılama/toplayıcı bağımlılıklarını kullanmaya başladım (.jar dosyaları /lib) . AWS SDK'nın v2'sine olan değişim bunu gerektirir. Gelecekte diğer ithal kod için gerekli olacaktır. Kyle Wilcox sayesinde, pom.xml'i yaratan ve kullanır, bu da benim için birkaç sorunu çözdü.
         
    * CHANGED: Sınıfpath parametresi (-cp) GenrateDatasetX ml, DasDds ve gelecek diğer küçük programlarda kullanılırERDDAP™Ve programcılara tavsiyede şimdi çok daha basit ve bir kez daha değişmemelidir, çünkü bu rehbere atıfta bulunur, bireysel dosyalar değil:
\\-cp sınıfları;C: Tianprograms._tomcat Tianlib Tianservlet-api.jar;lib\\\*
         (veya ':' yerine ';' Linux ve Macs) .
         (Bu yıl önce bir seçenek haline geldiğinde yapmalıyım.)   
         
    * YENİ: GenrateDatasets X ml'nin yeni bir yararlı seçeneği var: bir tür griddedilmiş bir koleksiyonu aracılığıyla aramayı zorlayın.nc  (ve ilgili) dosyaları tekrarlanan zaman değerleri ile bulmak. See See See See[FindDuplicate Zaman Zamanı](/docs/server-admin/datasets#findduplicatetime)  
         
    * YENİ:datasets.xmlŞimdi bir tane içerebilir&lt;Tracktes&gt; etiketi hangi overrides the&lt;Tracktes&gt; mesajların değeri.xml (veya mesajları geri döndürür.xml değeri boş ise boş) . Bu, mevcut palet listesini değiştirirken değiştirmenize izin verirERDDAP™Koşuyor. Ayrıca, bir cptfiles subdirectory varsaERDDAP™içerik rehberi,ERDDAP™Tüm \\*.cpt dosyaları bu dizinin içine kopyalayacak\\[tomcat\\]/webapps/erddap /WEB-INF/cptfiles her seferinde rehberiERDDAP™Başlayın. Birlikte, bu değişiklikler paletleri eklemenize izin verir ve değişiklikler yeni bir sürüm yüklemenizde devam ederERDDAP. Görün bakalım,[paletler belgeleri](/docs/server-admin/datasets#palettes)  
Jennifer Sevadjian, Melanie Abecassis ve belki diğer CoastWatch insanları sayesinde.
         
    * CHANGED:&lt;YavaşDownTroubleMillis&gt; (/docs /server-admin/datasets#slowdowntroublemillis) Şimdi tüm başarısız talepler için kullanılır, sadece birkaç tür değil.
         
    * CHANGED: RunLoadDatasets thread şimdi 3 LoadDatasets thread at 4 LoadDatasets MaxMinutes bu yüzden kesintiyi fark etmek ve lütufla çıkmak için daha fazla zaman var. Ayrıca bunun için daha fazla ve daha iyi teşhis mesajları vardır.
         
    * Lucene'nin eski versiyonundan v8.7.0.
         
    * CHANGE: tarafından gönderilen e-postalarERDDAP™Şimdi sabit bir fontla görünür.
         
    * CHANGE:EDDGridFromFiles şimdi eksen değerleri alır ve ilk önce gelen özellikler|LAST dosyası, belirtildiği gibi&lt;metadata From&gt;. Teşekkürler teşekkürler (Değil değil) Ken Casey, et al.
         
    * Başarısız birimler için geçici destek " derece\\_North" ve " derece\\_East", son dosyalar tarafından hatalı olarak kullanılır (2020-10-01'den beri) AVHRR Pathfinder Version 5.3 L3-Collated (L3C) SST datasets (nceiPH53sstd1day and nceiPH53sstn1day) .ERDDAP™Şimdi onları geçerli birimler için standartleştirebilir. Teşekkürler teşekkürler (Değil değil) Ken Casey, et al.
         

## Version 2.11{#version-211} 
 (2020-12-04) 

*    **Yeni Özellikler ve Değişiklikler (kullanıcılar için) :** 
    * BUG FIX: OrderByMean, değişkenin sadece bir \\_FillValue veya eksik\\_FillValue veya eksik\\_FillValue olsaydı bir NullPointerException attı. Değer tanımlanmış. Şimdi durumu doğru şekilde ele alır. Marco Alba sayesinde.
         
    * BUG FIX: tarafından yaratılan ODV metin dosyaları ile ilgili sorunlar vardıERDDAP™v2.10. Bu sorunlar düzeltilir. Shaun Bell sayesinde.
         
    * BUG FIX: Sadece sadece içindeERDDAP™v2.10: Eğer lat lon sınırları URL'de belirtilmişse, bağlayıcı kutu dünya haritasında çizilmedi. Şimdi yine. John Maurer sayesinde.
         
*    **Şeyler ŞeylerERDDAP™Yöneticilerin Bilme ve Yapması Gerekiyor:** 
    * BUG FIX: Sadece sadece içindeERDDAP™v2.10: ArchiveADataset için senaryo dosyaları, GenerateDatasets X ml ve DasDds işe yaramadı çünkü birlikte eklenmiş olan sınıfpath’ya değişiklikler yoktu.ERDDAP™v2.10. Şimdi yaparlar. Marco Alba sayesinde.
         
    * YENİ: İçindedatasets.xmlŞimdi etiketiniz olabilir:
```
        <emailDiagnosticsToErdData></emailDiagnosticsToErdData> <!-- true (the default) or false -->  
```

Şu anda, eğer doğruysa (Ya da etiket boşsa veya etiket dosyada değilse) Bir kullanıcının isteği bir NullPointerException'a yol açtığında,ERDDAP™Çöp izlerini e-posta iletecektirerd.data at noaa.gov  (The the the theERDDAP™Geliştirme ekibi) . Bu güvenli ve güvenli olmalıdır çünkü gizli bilgi yok (E.g., istekUrl) E-postaya dahil edilir. Bu, NullPointerExceptions'a yol açan herhangi bir karanlık, tamamen beklenmedik böcekleri yakalamak mümkün olmalıdır. Aksi takdirde, kullanıcı istisnaları görür, ancakERDDAP™Geliştiriciler yapmaz, bu yüzden düzeltilmesi gereken bir sorun olduğunu bilmiyoruz.
        
Bu etiketin diğer, benzer teşhis bilgilerine e-posta yoluyla yol açacağı mümkündür.erd.data at noaa.govGelecekte. E-postanın içeriği her zaman böceklerle ve ilgili olacaktır ve örneğin, kullanım bilgileri için. Marco Alba sayesinde.
         
        
    * CHANGED: Şimdi, yaygın sıkıştırılmış dosya türleri (.bz2,.gz,.gzip,.tar,.tgz,.z,.zip) Ayrıca online istekler için de yasaktır. Bu, aşağıda belirtilmiştir&lt;NoRangeRequests&gt; mesajlarda.xml.
         
    * KNOWN PROBLEM: As with as withERDDAP™2.10,.ncBir özelliği değiştirmeye çalışan ml dosyaları, özelliği değiştirmez. Bu, netcdf-java'da bildirilen bilinen bir otobüsdür ve netcdf-java'nın bir sonraki serbest bırakılmasında düzeltilecektir.
         

## Version 2.10{#version-210} 
 (2020-11-05) 

*    **Yeni Özellikler ve Değişiklikler (kullanıcılar için) :** 
    * YENİ: Yeni The new[Interpolate](https://coastwatch.pfeg.noaa.gov/erddap/convert/interpolate.html)Bir şebekeli veri kümesinin değerlerinden etkin bir şekilde bağlanır. Bu nedenle, hayvan takip verileri ile çalışan araştırmacılar için özellikle yararlıdır. Bu dönüştürücü, latitude, uzunlık ve zaman sütunları ile bir masada alır. (Ve belki diğer sütunlar) Ve interpolated değerler ile ek sütunlarla bir masa döndürür. Böylece, bu popülerliğe benzer.[Xtractomatic](https://coastwatch.pfeg.noaa.gov/xtracto)Dave Foley tarafından yaratılan senaryo, ancak talep başına 100 puana kadar işleme avantajı sunar. Dave Foley ve Jordan Watson sayesinde (NMFS) .
         
    * IMPROVED: Gelişmiş Arama artık non-.html talepleri için katı. Şimdi kalıcı hataları olan talepler için istisnalar atacaktır (e.g., minLat &gt; maxLat) veya geçici hatalar (E.g., bir istek içinstandard\\_nameBu mevcut değil) . .html talepleri için, Gelişmiş Arama değişmez: Google aramalarıyla, en iyi ve sessiz bir şekilde düzeltiyor veya hataları görmezden geliyor. Rich Signell sayesinde.
         
    * IMPROVED: Gelişmiş Arama sayfasındaki harita şimdi daha büyük (Hala squint'a sahipsin, ama daha az) Ve önemli ölçüde daha doğru (Ama yine de mükemmel değil) . John Maurer sayesinde.
         
    * IMPROVED: Bir Graph web sayfalarını ve &.land=... bir haritayı talep eden URL'lerde iki seçenek daha desteklemektedir:
"outline" sadece toprak kesimlerini, siyasi sınırları, gölleri ve nehirleri çekiyor.
"off" hiçbir şey çizmiyor.
Görün bakalım,[&.land =... Belgeler](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands).
John Maurer sayesinde.
         
    * IMPROVED: tarafından yaratılan grafikler ve haritalarERDDAP™Şimdi üç yeni işaret türü kullanabilir: Borderless Filled Square, Borderless Filled Circle, Borderless Filled Up Triangle. Bunun kodu, Marco Alba of ETT / EMODnet Fiziği tarafından katkıda bulundu. Marco Alba sayesinde.
         
    * YENİ:"files"Sistem şimdi düzelme desteklemektedir Dosya türü yanıtları (.csv,.htmlTable,.itx,.json,.jsonlCSV1,.jsonlCSV,.jsonlKVP,.mat,.nc,.nccsv,.tsvYa da.xhtml.) E.g.,[ https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv ](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv).
Kyle Wilcox sayesinde.
         
    * IMPROVED: Bir kullanıcının bir Data Access Form kullandığı URL'ler (.html) veya bir Make-A-Graph (.graph) Web sayfası artık karakterleri doğru bir şekilde doğrulayın\\[ve\\]. Bu, URL'leri insanlar için okumak için biraz daha zor hale getirir, ancak bir web güvenlik açısından daha iyidir. Yöneticiler artık rahatQueryChars = ayarlama seçeneğine sahipler = ‘ ‘ ‘\\[\\]|Tomcat sunucusunda.xml dosyası (Daha az güvenli) ya da değil mi? (Daha güvenli daha güvenli) .
Antoine Queric, Dominic Fuller-Rowell ve diğerleri sayesinde.
         
    * YENİ: Eğer bir EDDTable veri setlerine bir istek içerir ve ekleyin Değişkenler Değişkenler Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede? (_attribute Ad, özellikler Değer_) ,ERDDAP™_attribute sahip tüm değişkenleri ekleyecek Name=attribute Değer_ talep edilen değişkenler listesine.
Görün bakalım,[&add Değişkenler Değişkenler Belge nerede](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#addVariablesWhere). Aurelie Briand, et al.
         
    * CHANGED:ERDDAP™Şimdi /files /.ncveya.hdfdosyaları. Uzaka bağlanmaya çalışmayın.ncveya.hdfYerel dosyalar gibi dosyalar. Korkunç bir şekilde verimsizdir ve genellikle diğer sorunlara neden olur. Bunun yerine:
        * Use Use Use Use Use(OPeN)DAPmüşteri yazılımı bağlanmak içinERDDAP"DAPBu dataset için hizmetler (Hangisi /griddap / veya /tabledap/ URL'de) . Bu nedirDAPiçindir.
        * Veri kümesinin veri kümesini talep etmek için veri kümesini kullanın.
        * Tüm dosyaya ihtiyacınız varsa veya uzun bir süre boyunca tekrarlanan erişime ihtiyacınız varsa, kullanıncurl,wget, veya tüm dosyayı indirmek için tarayıcınız, sonra dosyanızın yerel kopyasından verilere erişin.
             
    * IMPROVED: .odv Txt çıktı seçeneği, yeni sürümünü desteklemek için yeniden yazılmıştırODV .txtdosyalar ve yörünge, zaman serisi ve profil verilerinin uygun gösterimini desteklemek.
         
    * IMPROVED: Şimdi, çift alıntılarda arama terimleri bir json dize olarak yorumlanır, bu yüzden Ž kodlanmış karakterlere sahip olabilirler. Diğer şeyler arasında, bu, bir özellik için tam bir maç aramanıza izin verir, e.g., "institution=NOAA\\n" kurumla bir veri kümesiyle eşleşmeyecek =NOAA NMFS. Dan Nowacki sayesinde.
         
    * IMPROVED: Ek yerlerde, yüzen nokta numaraları (Özellikle yüzler çiftlere dönüştürülür) Şimdi ek yerlerdeki sayının biraz daha yuvarlak bir versiyonu olarak görünüyor, e.g. daha önce 32.27998779296875 gibi iki kez gösterilen bir yüz, şimdi 32.28 olarak görünebilir. Kyle Wilcox sayesinde.
         
    * BUG FIX: tam tam tam tam anlamıyla ses dosyaları biraz yanlış okuyordu. Şimdi doğru okunurlar.
         
*    **Şeyler ŞeylerERDDAP™Yöneticilerin Bilme ve Yapması Gerekiyor:** 
    * WARNING: İlk kez çalıştırıyorsunERDDAP™v2.10, yerel veri dosyalarına dayanan bazı veri kümeleri yüklenecek **çok çok çok çok çok çok çok çok çok** Yavaş yavaş çünküERDDAP™Dosya bilgilerini veritabanını yeniden oluşturmak gerekir. Yavaş başlangıç yükünden sonra, daha önce olduğu gibi çabuk yüklenecekler. Lütfen sabırlı olun.
         
    * SİZİN ÖĞRETİM:
        * İlk önce v2.10 çalıştırdığınızda, bazı veri setleri yüklenemez çünküERDDAP™Şimdi bazı metadata hakkında daha katı. Daha önce olduğu gibiERDDAP™İlk yükleri geldiğinde size bir Günlük Raporu e-posta iletecektir. Bu, yüklemediği her veri setleri için hata mesajları içerecektir. Problemleri anlamak için hata mesajlarını okuyun. Çoğu durumda, sorunu çözmek için veri setinin metadatasına küçük bir değişiklik yapmanız gerekir.
             
        * In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In Indatasets.xml, arama&lt;sourceNameVegt; = (Not the note the note theNote the note the note the note the note the note the note the note the note the note the note the note the note the note the note the note the note the note the note the note the note the note the note the note the note the note the note the note the note the note the note the note the note the note the note the note the note the note the note the note the note the note the note the note the note the note the note the note the'='işareti, hangi bir tanım[Sabit değersourceName](/docs/server-admin/datasets#fixed-value-sourcenames)) . Çoğu içinERDDAP™Kurulumlar, bunlar nadirdir. Değerlerden herhangi biri sonra'='stringler (Sayı sayısı sayılar değil) Ama şimdi çift alıntılarda dizeyi kapatıyorsunuz. Örneğin,
Daha önce:&lt;sourceNameVegt;=KZ401&lt;/sourceName&gt; &gt; &gt; &gt;
Sonra:&lt;sourceNameVegt;="KZ401"&lt;/sourceName&gt; &gt; &gt; &gt;
             
        * YENİ: Kurulumda yeni bir seçenek var.xml,&lt;Varsayılan olarak erişilebilirlikViaFiles&gt;, hangi varsayılan varsayılan ayarlar&lt;Her bir veri kümesi için erişilebilirViaFiles&gt;. Bu yeni etiket için varsayılan yanlış, bu öncekileri taklit ediyorERDDAP™Davranış. Bu alt seviye ayarı, belirli bir veri kümesinin aşırı uçabilir&lt;erişilebilirViaFiles&gt; ayar.
            
RECOMMENDED (Çünkü bunu isteyen kullanıcılar var) :
Tüm EDD yapmak istiyorsanız...Files datasets dosyaları sistemi aracılığıyla erişilebilir, sonra
            
            1. Bu etiketi kurulumunuza ekleyin.xml dosyası:
```
                <defaultAccessibleViaFiles>true</defaultAccessibleViaFiles>
```
            2.   (Seçmeli olarak) Bütünleri Çıkarın
```
                <accessibleViaFiles>true</accessibleViaFiles>
```
in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in indatasets.xmlVarsayılan şimdi doğru olduğundan.
                 
        * \\_FillValue Attributes:
            ERDDAP™Tüm tam sayı değişkenleri için varsayılan bir \\_FillValue sahip olmak için kullanılır: veri tipinin maksimum değeri (e.g., 127 for byte variables) . Şimdi değil. Veri değerleri olarak gösterilen bu değerlere sahip olmak için (Eksik değerler eksik değil) Bunu \\_FillValue özellikleri ile açıkça ifade etmeniz gerekir. Şu andan itibaren, her seferinde başlıyorsunuzERDDAP™Ancak yöneticiyi bir .csv masası ile bir \\_FillValue veya ya da \\_FillValue veya ya damissing\\_valueözellikler ve önerilen yeni \\_FillValue özellikleri. See See See See[Add \\_Fill Değer Attributes](/docs/server-admin/datasets#add-_fillvalue-attributes)Daha fazla bilgi ve talimatlar için.
             
        * Eğer dersenizERDDAP™Ancak, bu yeni kavanoza referans eklemek için sınıfsal parametreyi değiştirmeniz gerekir: lib/je-jexl.jar;lib/aws-java-sdk.;lib/jackson-annotations.jar;lib/jackson-core.jar;lib/jackson-databindbind. .
             
    * CHANGED: Tomcat 9 şimdi Tomcat'ın önerilen versiyonuERDDAP. Tomcat 8.5+'nın son versiyonu da şimdilik iyi. TemizlendikERDDAP"[Tomcat yükleme talimatları](/docs/server-admin/deploy-install#tomcat).
        
En son sürümüJava8 8 (Değil değilJava9, 10, 11, ...) From from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from from[OpenJDK](https://adoptopenjdk.net/)önerilen versiyon olarak kalırJavaÇünküERDDAP.Java8, OpenJDK'yı benimsemekten Uzun Dönem Desteği var, bu yüzden kullanmak güvenlidir, ancak güvenlik nedenleri için periyodik olarak en son sürümü almayı unutmayın.
        
    * YENİ: script SourceNames / Türlü Değişkenler Tabular Datasets
EDDTable FromFiles, EDDTable FromDatabase ve EDDTableFromFileNames datasets şimdi ifadeler ve senaryolar içerebilirsourceName. Bu, kaynak dosyalarında mevcut değişkenlere dayanan yeni değişkenler yapmanıza olanak sağlar. Belirli bir yeni değişken için hesaplama, tüm satırlar için defalarca sonuçlar bir sıra içinde yapılır. Örneğin, aralıktaki değerler ile uzun bir değişken yapmak için -180 - aralığı 0 - 360°:
        &lt;sourceNameVegt;=Math2. bok180 (satır.column Çift ("lon") ) &lt;/sourceName&gt; &gt; &gt; &gt;
Detaylar için, bakınız[script SourceNames](/docs/server-admin/datasets#script-sourcenamesderived-variables)  
Bob Simons sayesinde (Bunu daha önce kim planladıERDDAP™v1.0 ve sonunda onu uygulamak için bir yol buldu) Kevin O'Brien, Roland Schweitzer, John Maurer ve Apache JEXL kütüphanesi gerçekten zor bir kısmını yapmak için gerçekten zor bir bölüm. (Ve bunu iyi yapın) .
         
    * YENİ: Sayısal olmayan veri türleri (ubay, u 6:, uint, ulong) Şimdi destekleniyor. Birçok dosya türü Not Not that many file types (E.g., .das, .dds,.nc3 3) Tüm bu yeni veri türlerini desteklemiyor. Bakın,[Data Data Data Data Tipik dokümantasyon](/docs/server-admin/datasets#data-types)Detaylar için nasılERDDAP™Bu farklılıklarla ilgilenir. Muhtemelen, çünkü(OPeN)DAPÖzellikle .dds cevabı, uzunlar veya ulonglar tarafından imzalanan destek değildir, kullanmak isteyebilirsinizERDDAP' .das ve .das'ın tabular gösterimihttp... /erddap / **Bilgi bilgi** /datasetID_.html web sayfası (Örneğin,[ https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html) ) Ayrıca başka dosya türlerinde veya diğer dosyalarında da alabilirsiniz.nccsvMetadata yanıt (Örneğin,[ https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata) ) Her ikisi de tüm durumlarda tüm veri türlerini destekler.
        
WARNING: Bu değişiklikten etkilenen veri setleri için, veri kümesi ile sorunları göreceğiniz mümkündür, çünkü veri kümesi ile ilgili verilerERDDAP™Kaynaktan gelen okumalar farklı olabilir (e.g., daha önce imzalanmış tamsayılar olarak okuduğunuz değişkenler artık imzalanmamış tam sayılar olarak okunabilir) . Ortaya çıkan sorunlar şunları içerir: Verilere erişmeye çalıştığınızda yeni dosyalar ve / veya hatalar. Bir veri kümesinin sorunları varsa, denemek için ilk şey denemektir.[Sert bir set Bayrak Bayrak](/docs/server-admin/additional-information#hard-flag)Dataset için. Eğer bu sorunu çözmezse, o zaman loga bakmak zorundasınız. Hata mesajları görmek için txt, delve into thedatasets.xmlVeri kümesi için ve/veya belki de veri kümesi içinDatasets.xml üretiyor.
Netcdf-java 5.x sayesinde (Hangi sorunu zorladı) Ve sonraki CF 1.9.
        
    * IMPROVED: Şimdi var[Daha iyi doküman /advice](/docs/server-admin/datasets#s3-buckets)AWS S3 kovasındaki dosyalardan nasıl bir veri kümesi oluşturmak için. Micah Wengren sayesinde.
         
    * CHANGED: Birkaç değişiklik var"files"Sistem.
        * Bunu işlemek için kod daha fazla sınıf tarafından kullanılabilir hale getirildi.
             
        * YENİ: Rehber listeleri için kullanıcı istekleri şimdi yanıtın istenen dosya uzatmasını sağlayarak standart düz tablo türlerinden biri olmasını talep edebilir: .csv,.htmlTable,.itx,.json,.jsonlCSV1,.jsonlCSV,.jsonlKVP,.mat,.nc,.nccsv,.tsvYa da.xhtml). Örneğin,
            [ https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv ](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv)  
Kyle Wilcox ve Shane St Savage sayesinde.
             
        * IMPROVED: Şimdi, Genrate Datasets X ml bir dahil olmayacak&lt;Oturumda erişilebilirViaFiles&gt; etiketi. varsayım, veri kümesinin yeni değere güveneceğidir.&lt;Varsayılan olarak kullanılabilirViaFiles&gt; Kurulumda etiket.xml. See See See See[erişilebilir erişilebilir erişilebilir erişilebilir ViaFiles](/docs/server-admin/datasets#accessibleviafiles).
             
        * IMPROVED: Ek veri set türleri artık erişilebilir destek ViaFiles:EDDGridSide TarafındanSideEDDGridAggregateExistingDimension,EDDGridErddap'tan EDTable FromErddap,EDDGridFromEDDTable, EDDTable From FromEDDGridVeEDDGridFromEtopo. Bunlar için, verilen uzaktan/çocuk veri setinden gelen dosyalar sadece ebeveyn ve uzaktan / çocuk veri setinin erişilebilir olması durumunda erişilebilir olacaktır. ViaFiles gerçek (perhaps via through)&lt;Varsayılan olarak kullanılabilirViaFiles&gt;). Damian Smyth ve Rob Fuller sayesinde.
             
        * TO DO / RECOMMENDATION: Tüm ilgili veri kümelerini dosyaları sistemi aracılığıyla erişilebilir hale getirmek için tavsiye ediyoruz&lt;Varsayılan olarakViaFiles&gt; kurulumunda doğru.xml çünkü bu verilerin elde edilmesi için tercih edilen bir grup kullanıcı var. Diğer nedenler arasında,"files"Sistem, kullanıcıların hangi dosyaların mevcut olduğunu ve son değiştiğinde, böylece tüm veri kümesinin kendi kopyalarını korumak için kolay hale getirir. Genellikle dosyaları sistemi aracılığıyla erişilebilir veri setleri yapmak istemiyorsanız, set&lt;Varsayılan olarak kullanılabilirViaFiles&gt; yanlış. Ya da durumda, sadece kullanın&lt;erişilebilirViaFiles&gt;, belirlenen genel politikaya istisna olan birkaç veri kümesi için&lt;Varsayılan olarak kullanılabilirViaFiles&gt; (Örneğin, dataset kullandığında.ncKullanıcılar için gerçekten yararlı olmayan ml dosyaları) .
             
    * IMPROVED: Şimdi, bir kaynak veri kümesinin CF grid\\_mapping bilgisi varsa, üretmek Datasets X ml ızgara veri setleri için bilgi küresel olarak ekleyecek&lt;Atts&gt; ekleyin ve bilgi küresel olarak eklenecektir&lt;KaynakAtts&gt; Her zaman verileri dosyadan okunur. Bilgi, veri kümesinin global özellikleri, ek gridin_mapping\\_ .
         
    * IMPROVED: Okurken gruplar için destek.nc4 4 4 (ve bir dereceye kadar.hdf5 5) dosyaları. Genel olarak, birERDDAP™Dataset, dosyanın gruplarından birinde değişkenlerden inşa edilecek. Ayrıca, GenerateDatasets X ml içinEDDGridFromNcFiles andEDDGridFromNcFiles Unpacked şimdi bir "grup" için soruyor (E.g., "" herhangi bir/tüm gruplar için, "bazı Grup", "bazı Grup/bazı Grup" veya "\\[kök kök kök kök\\]“Sadece kök grubu için) . Charles Carleton ve Jessica Hausman sayesinde.
         
    * IMPROVED: GenrateDatasets X ml içinEDDGridFromNcFiles andEDDGridFromNcFiles Unpacked şimdi, bu veri kümesinin kullanılmasını istediğiniz boyutlardaki kaynak isimlerini belirtmenize olanak sağlayan bir "DimensionsCSV" parametresini destekliyor. Daha önce olduğu gibi en boyutları kullanan değişkenleri almak için "" kullanın. Ayrıca, bu tür bir dosya ile gerçekleşen ilgili küçük bir boğa şimdi sabit. Sujal Manandhar sayesinde.
         
    * BUG FIX: GenrateDatasets X ml şimdi düzgün listeler "EDDTable FromJsonlCSVFiles" ("EDDTable FromJsonlCSV") EDDType seçeneklerinden biri olarak. Andy Ziegler sayesinde.
         
    * IMPROVED:EDDGridFromNcFiles Unpacked now standardizes "units" attributes to standard/"canonical" udunits (Birimler dönüştürücü olarak aynı yöntem) . Örneğin,"meter per second","meters/second","m.s^-1"Ve"m s-1"Her şey bütün haline gelir"m s-1". Andy Ziegler sayesinde.
        
WARNING: Bu, mevcut bazı veri setleri için sorunlara neden olacaktır (e.g., yeni dosyaların "kötü" olarak etiketlenmesine neden olur.) . Eğer öyleyse,[Sert bir set Bayrak Bayrak](/docs/server-admin/additional-information#hard-flag)Veri kümesi için, tüm kaynak dosyalarının yeni sistemle yeniden hazır hale gelecektir.
        
    * IMPROVED: Şimdi, değişkenin&lt;sourceName&gt; =NaN ve değişkenin sabit bir değerini belirtebiliractual\\_rangeSonlu bir aralığı belirleyen özellikler. Bu bazen yararlıdır, böylece bir veri kümesi (Özellikle bir EDDTableFileNames dataset) dummy değişken olabilir (s)   (e.g., latitude, uzunlık, zaman) NaN'nin sabit değerleri ile, ancak geçerli bir geçerliactual\\_range  (Kur’an hakkı için) . Daha sonra, Advanced Search a user, belirli bir enlemde verileri olan veri setlerini, uzun süre aralıklarını ve bu veri setinin ilgili verilere sahip olduğunu söyleyebilir. (Tüm verilerin gerçek satırları NaN'i gösterse de) . Görün bakalım,[Sabit değer belgeleri](/docs/server-admin/datasets#fixed-value-sourcenames).
Mathew Biddle sayesinde.
         
    * YENİ: Şimdi,datasets.xmlEDTable FromAsciiFiles veya EDDTableFromColumnarAsciiFiles dataset'den gelen bir etiket içerebilir ve bu da söz konusu bir etiket içerebilir.ERDDAP™Dosyanın tepesindeki tüm hatları görmezden gelmek ve belirtilen düzenli ifadeyi oynayan çizgi dahil olmak. Örneğin,
        &lt;JumpHeaderToRegex&gt;G\\*.\\*.\\*END OF HEADER.\\*&lt;/skipHeaderToRegex&gt;
Tüm hatları göz ardı edecek ve “bir çizgi de dahil edecek”\\*\\*\\* END OF HEADER." Görün ki,&lt;JumpHeaderToRegex&gt; Document] (/docs /server-admin/datasets#skipheadertoregex) .
Eli Hunter sayesinde
         
    * YENİ: Şimdi,datasets.xmlEDTable FromAsciiFiles veya EDDTableFromColumnarAsciiFilesdataset'ten gelen bir etiket içerebilir ve bu da söz konusu bir etiket içerebilir.ERDDAP™Belirtilen düzenli ifadeyi oynayan dosyadaki tüm hatları görmezden gelmek. Örneğin,
```
        <skipLinesRegex>#.\\*</skipLinesRegex>  
```

"#" ile başlayan tüm hatları atlayacaktır. Görün ki,&lt;JumpLinesRegex&gt; Document] (/docs /server-admin/datasets#skiplinesregex) .
Eli Hunter sayesinde.
         
    * YENİ: The Thedatasets.xmlHerhangi bir EDDTable veri kümesi için chunk şimdi dahil olabilir veadd Değişkenler Değişkenler Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede? (_attributeNamesCSV_) . Eğer yaparsa,ERDDAP™Belirtilen özelliklerin her biri için bir widget ekleyecek Veri kümesinin Data Access Formlarına İsimler (.html web sayfası) Kullanıcıların eklemek ve eklemek için kolay hale getirmek Değişkenler Değişkenler Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede Nerede? (_attribute Ad, özellikler Değer_) İstek için.
Görün bakalım,[&add Değişkenler Değişkenler Belge nerede](/docs/server-admin/datasets#addvariableswhere).
Aurelie Briand, et al.
         
    * YENİ YENİ YENİ YENİ YENİ Third-Party Tool:ERDDAP-lint
        ERDDAP-lint, Rob Fuller ve Adam Leadbetter'den bir programdır ve İrlanda Deniz Enstitüsü'nden metadata'yı geliştirmek için kullanabileceğiniz bir programdır.ERDDAP™datasets.ERDDAP-lint "bazı kurallar ve basit bir statik web uygulaması, bazı doğrulama testlerinize karşı çalışan içinERDDAP™sunucu. Tüm testler web tarayıcısında çalıştırılıyor.” Tıpkı gibi[Unix/Linux lint aracı](https://en.wikipedia.org/wiki/Lint_(software)) Mevcut kuralları düzenleyebilir veya yeni kurallar ekleyebilirsiniz. See See See See[ERDDAP-lint](https://github.com/IrishMarineInstitute/erddap-lint)Daha fazla bilgi için.
        
Bu araç, bazı zaman önce yarattığınız veri setleri için özellikle yararlıdır ve şimdi mevcut metadata tercihleriniz ile güncel olmak istiyor. Örneğin, GenerateDatasets'in erken versiyonları X ml küresel yaratmak için herhangi bir çaba göstermedicreator\\_name,creator\\_email, yaratıcısıncreator\\_urlmetadata. KullanabilirsinizERDDAP- bu metadata özellikleri eksik olan veri kümelerini tanımlamak için.
        
Rob ve Adam bu aracı oluşturmak ve bunu yapmak için teşekkürlerERDDAP™topluluk.
        
    * YENİ: Şimdi, bazı dosyaların bir kısmını bir seferde tamam.EDDGridFiles veri setinden tüm veri kümesinin değişkenleri yoktur. dosyalar değişkenleri olsaydı dahil edilecek. (Tüm eksik değerler ile) .
Dale Robinson ve Doug Latornell sayesinde.
         
    * YENİ: Giriş dosyasında yeni kullanım istatistikleri var ve yöneticilerin hafıza problemlerine neden olan kullanıcıları tanımlamalarına yardımcı olmak için Daily Report. İstatistikler "OutOfMemory" olarak adlandırılır. (Dizi Boyut) "OutOfMemory (Çok Büyük) ", and "OutOfMemory (Way Too Big) ". Bu kategorilerde talep eden kullanıcıların IP adreslerini ve yaptıkları istek sayısını gösteriyorlar. Sıkıntı talepleri olmasaydı, bu istatistikler ortaya çıkmaz. "OutOfMemory (Dizi Boyut) " ve "OutOfMemory (Way Too Big) "İstekler genellikle bir problem değildir çünkü istekler o kadar büyükydi ki,ERDDAP™Onları çabucak yakaladı ve bir hata mesajı geri döndü. "OutOfMemory (Çok Büyük) " talepleri daha tehlikeli çünkü çünküERDDAP™Fark etmeden önce biraz çaba sarf etti, şu anda isteği işlemek için mevcut değildi (Ancak sorun bu taleplerden önce başka istekler de olabilir) .
        
Ayrıca, büyük talepleri olan kullanıcıların IP adreslerini gösteren "Large Request, IP adresi" adlı yeni istatistikler de vardır. (Şu anda, gridded.ncdosyalar &gt; 1GB) .
        
Ayrıca, durum.html sayfasındaki zaman serisi masa, "ExOfMemory" ile başarısız olan istek sayısını gösteren bir "memFail" sütunu içeriyor. (Çok Büyük) “Son büyük yük Datasets’ten bu yana hatalar. Burada 0'dan başka herhangi bir sayı, endişe için en az neden.
Bob Simons sayesinde.
        
    * YENİ: Yeni versiyonuHyraxEkran listeleri daha önce farklı.ERDDAP™Şimdi eski ve yeni dizi listelerini okuyabilirsiniz.
         
    * YENİ: Dataset reloads and user response that take &gt;10 saniye bitirmek için (başarıyla veya başarısız olarak) " ile işaretlenir" (&gt;10s&#33;) ". Böylece, kayıt için yavaş olan veri setlerini bulmak için bu cümle için log.txt dosyasını arayabilirsiniz ya da bitirmek için yavaş olan istek numaraları. Daha sonra veri kümesi sorununun ne olduğunu veya kullanıcının isteğinin ne olduğunu ve kim olduğunu görmek için log.txt dosyasında daha yüksek görünebilirsiniz. Bu yavaş veri kümesi yükleri ve kullanıcı istekleri bazen vergilendirilirERDDAP. Bu talepleri hakkında daha fazla bilgi, problemleri tanımlamanıza ve çözmenize yardımcı olabilir.
    * IMPROVED: Bir CF DSG veri kümesini ne zaman onaylarken,ERDDAP™Şimdi, cf\\_role özellikleri ile değişkenlerin, ilgili cdm\\_...\\_variables listesinde olduğunu ve diğer cdm\\_...\\_variables listelerinde olmadığını sağlar. Örneğin, bir zaman serisiProfile dataset, cf\\_id" değişkenine sahip bir "kamp\\_id" değişkenine sahipse, o zaman "station\\_id" cf\\_timeset\\_variables listesinde olmalıdır, ancak cf\\_contentables listesinde olmamalıdır.
Micah Wengren sayesinde.
         
    * IMPROVED: 'Simplify' artık daha hızlı, daha az hafıza kullanıyor ve LongArray'a geri dönebilir. Teşekkürler teşekkürlerUnidata.
         
    * IMPROVED: hızlıBaşlangıç artık EDDTable için önemli ölçüde daha hızlı (nc ile ilgili) Dosyalar (EDDTableNcCFFiles ve EDDTableInvalidCRAFils dışında) Çünkü makyaj yapmak Beklendi (Ve başka bir yer) Şimdi sadece örnek dosyasının metadatasını tüm verileri okumak yerine okur. Jessica Austin sayesinde.
         
    * IMPROVED: Artık ek basamakların hepsi 0'ın, e.g., "2020-05-22T01:02:03.456000000Z" dir. Yibo Jiang sayesinde.
         
    * IMPROVED: GenrateDatasetsXml's EDD.suggestDestinationName ‘(' ve sonra her şey. Şimdi kaldırıyor (.\\*) Sadece bunun sonuysasourceName. Şimdi de kaldırıyor\\[.\\*\\]Sadece bunun sonuysasourceName. Julien Paul sayesinde.
         
    * IMPROVED: GenrateDatasets X ml şimdi değişkenleri yapardestinationName\\_2, \\_3 eklenerek benzersizdir, ... ihtiyaç olduğu gibi. Julien Paul sayesinde.
         
    * IMPROVED: Takvim2.parseDateTime pars dd, hh, ya da HH, ilk 'dil' artık bir uzay olabilir.
    * KNOWN PROBLEM: Starting with withERDDAP™2.10,.ncBir özelliği değiştirmeye çalışan ml dosyaları, özelliği değiştirmez. Bu, netcdf-java'da bildirilen bilinen bir otobüsdür ve netcdf-java'nın bir sonraki serbest bırakılmasında düzeltilecektir.
         
    * BKEN LINKS FIX: Kırık bağlantılar için test için uygun bir sistem yaptımERDDAP™Web sayfaları, bu yüzden şimdi çok az kırık bağlantılar olmalı (En azından her yayın tarihi olarak - yeni kırık bağlantılar sık sık sık ortaya çıkıyor) .
         
    * BUG FIX: EDDTable FromHtttpGet bazı isteklerle başarısız oldu. Şimdi değil. BODC'de Emma sayesinde.
         
    * BUG FIX: Bazı istekleri işlemek için, EDDTable, her talep edilen değişken için geçici bir dosya yaptı, değişkenin adı ile. Eğer değişkenin adı aynı zamanda bir tür sıkıştırmaydı (E.g.,) ,ERDDAPDeneyecek (Ve başarısız ol) Geçici dosyayı bastırmak için. Şimdi geçici dosya isimleri ".temp" sonunda sona erer. Mathew Biddle sayesinde.
         
    * BUG FIX: GenrateDatasetsX ml ve Takvim2.convertToJavaDateTime Biçim şimdi muhtemelen geçersiz bir tarih zamanı biçimini düzeltmeye çalışırken yanlış bir değişiklik yapmak çok daha az olasıdır. Muhtemelen, oto-suggested dateTime format değiştirilecektir. Mathew Biddle sayesinde.
         
    * BUG FIX: Uzak URL'den içerik alırken bir hata olsaydı ve hataStream içeriği sıkıştırılırsa,ERDDAP™Şimdi doğru şekilde hata mesajını bastırır. Bob Simons sayesinde.
         
    * BUG FIX:&lt;AboneToRemoteErddapDataset&gt; EDD'de uygulanmadı...Erddap veri setinden bir çocuk veri setiydi. Şimdi öyle. Chris Romsos sayesinde.
         
    * BUG FIX: GenrateDatasets X ml artık "latin" ile başlayan bir kaynak değişkeni adın entitude olabileceğini düşünmez. Vincent Luzzo sayesinde.
         
    * BUG FIX: Şimdi, bir OutOfMemoryError, bir kullanıcının isteği işlemesi BadFiles listesine bir dosya eklemek için bir neden değildir. Bob Simons sayesinde.
         

## Version 2.022{#version-202} 
 (2019-08-21-21) 

*    **Yeni Özellikler ve Değişiklikler (kullanıcılar için) :** 
    * YENİ: Veri setlerini birden fazla aramanın iki yolu varERDDAPs. Biraz farklı çalışır ve farklı arayüzler ve seçeneklere sahiptir.
        
        *   [AramaMultipleplepleERDDAPs.html](/SearchMultipleERDDAPs.html)Bob Simons /NOAA NMFS SWFSC ERD.
        *   [ http://erddap.com ](http://erddap.com)Rob Fuller/The Marine Institute of Ireland.
        
Orijinal istek için Tylar Murray sayesinde.
         
    * IMPROVED: Bir istek"files"Sistem aslında uzak bir sitede olan bir dosyayı indirmek için (e.g., AWS S3) Şimdi bir yönlendirmeye yol açıyor, bu yüzden kullanıcı aslında verileri kaynaktan indirecek, çünkü kullanmak yerineERDDAP™Bir aracı olarak. Andy Ziegler ve TeşekkürlerNOAA.
         
    * YENİ: Yeni AWS S3- ilgili özelliklerin bir örneği olarak ve herkesin genel AWS S3 kovalarından dosyaları taramasını ve indirmelerini kolaylaştırmak için daha kolay hale getirmek için, yarattık.
        [~110 örnek veri setleri](https://registry.opendata.aws/)Bu, herkesin neredeyse tüm içeriğine uymasına izin verir
        [AWS S3 Açık Veri Kovaları](https://registry.opendata.aws/). Eğer tıkırsanız"files"Bu örnek veri kümelerinden herhangi biri için bağlantı, bu S3 kovasındaki dizi ağacı ve dosyaları gözleyebilirsiniz. Bu veri setlerinin çalışması nedeniyle, bu dizi listeleri her zaman mükemmel bir şekilde günceldir çünküERDDAP™Onları at-the-fly. Seri ağacı gerçek bir dosya adına tıkla ve dosya adına tıklayınsanız,ERDDAP™Talebinizi AWS S3'e yönlendirecektir, böylece dosyayı doğrudan AWS'den indirebilirsiniz.ERDDAP™Yöneticiler yönetebilir
        [Bunu diğer S3 kovas için nasıl yapacağımı için yol okuyun](/docs/server-admin/datasets#working-with-aws-s3-files). Andy Ziegler ve TeşekkürlerNOAA.
         
*    **Şeyler ŞeylerERDDAP™Yöneticilerin Bilme ve Yapması Gerekiyor:** 
    * DOĞUMLAR: Hiçbir şey
         
    * IMPROVED:ERDDAP's method of storage arrays of strings (StringArray) Şimdi çok daha hafıza verimli. String Diziler boyunca kullanılırERDDAP™Özellikle tabular ASCII veri dosyaları okurken. Ayrıca, diğer değişiklikler CSV/TSV/SSV ASCII, sütunar ASCII ve jsonlCSV tabular veri dosyaları daha hızlı ve daha fazla hafıza verimli. Sonuç: 764 MB ASCII veri testi dosyası için (Ancak 52MB'ye sıkıştırın.gzDosya dosyası) 3,503,266 sıra ve 33 sütun ile, maksimum hafıza kullanımı 10GB'den 0.6GB'ye çıktı (zirvede) . Bunu okumak için zaman ~ 7 dakika (Ancak bilgisayarda ne kadar fiziksel bellek olduğu konusunda büyük ölçüde değişir.) -36 saniye (10'lar da basitleştirmek için () Bu sadece GenrateDatasets tarafından kullanılır X ml) . Diğer birçok yerdeERDDAP™Bu artan hafıza verimliliğinden yararlanacaktır. Tylar Murray ve Mathew Biddle sayesinde.
        
Farklı bir çözüm keşfettim (StringArray'daki dizeleri UTF-8-encoded byte dizileri) . Bu, hafıza kullanımını başka bir -% 33 azaltır, ancak -% 33 yavaşlayın pahasına. Şimdi kullanılan sisteme kıyasla, kötü bir ticaret gibi görünüyordu. Bir bilgisayar daha fazla hafıza vermek daha kolaydır (Daha fazla hafıza satın alın -$200) Bunu daha hızlı yapmak için (Tüm yeni bir bilgisayar satın alın) .
        
Eğer uygunsa, büyük tabular veri dosyalarını bazı kriterlere dayanarak birkaç küçük dosyalara bölmek için hala iyi bir fikirstationIDve/veya zaman.ERDDAP™Genellikle sadece bir kullanıcının isteğine cevap veren küçük dosyalardan birini açmak zorunda kalacak ve böylece çok daha hızlı yanıt verebilecek.
        
    * IMPROVED: Şimdi var[ERDDAP™AWS S3 Belgeleri](/docs/server-admin/datasets#working-with-aws-s3-files)Bu, nasıl elde edeceğinizi açıklarERDDAP™AWS S3 kovalarında veri dosyaları ile çalışmak.
Ayrıca,ERDDAP™Şimdi AWS S3'te yeni özellikler kullanıyorJavaAPI.
Ayrıca,ERDDAP™Şimdi AWS S3 URL'leri ek karakterler dahil etmek için izin veriyor (Dönem, hipnoz) Kova isimlerinde.
Ayrıca,ERDDAP™Şimdi AWS S3 kova URL'lerinin belirli bir şekilde tanımlanmasını gerektirir:
           https://_bucketName_.s3._aws-region._amazonaws.com/_prefix_/   
Nerede ek isteğe bağlı.
Andy Ziegler ve TeşekkürlerNOAA.
         
    * IMPROVED: GenrateDatasets X ml şimdi daha yaygın davranıyormissing\\_valueEksik değerler olarak öne çıkıyor ve bu yüzden bir sütunu sayısal veri türüne dönüştürmek daha olasıdır. Ayrıca, PrimitiveArray.simplify () Şimdi belirli veri değeri, belirli bir sütunu bir dize sütunu olarak tedavi etmesine neden olan oturumlar. Mathew Biddle sayesinde.
         
    * IMPROVED:&lt;Blacklist&gt; Şimdi desteklemektedir.\\*.\\*  (Veya :\\*:\\*IPv6 için) IP adreslerinin sonunda, daha büyük bir IP adresleri, e.g., 110.52.\\*.\\*  (Çin Unicom Tianjin) . Belgeleri görmek için&lt;Blacklist&gt;) (/docs /server-admin/datasets#request Blacklist) Çin Unicom ve Çin Telecom sayesinde.
         
    * IMPROVED: Bir veri kümesinin kaynağı bir belirtmezse"institution"Özellikler, GenrateDatasets X ml ve yüklemeDataset şimdi bir "küresel" özellikten elde edin (Eğer mevcut varsa) . Micah Wengren sayesinde.
         
    * BUG FIX: standardize ASCII veri dosyalarına her zaman uygulanmadı.
Ayrıca, EDDTable, kaynağın String zaman değerleri ve standardize edildiğinde zaman kısıtlamaları düzgün bir şekilde ele almadı. Ne kullanılmıştı.
Paloma de la Vallee sayesinde.
        
Daha önce açıkça ifade etmedim: Sadece standartlaştırmanız gerekir Aslında onlara ihtiyacınız olduğunda hangi özellikler (e.g., farklı kaynak dosyaları zaman değerlerini farklı şekillerde depolarken) Çünkü bazı datasets'e standart olarak kullanan bazı talepler Biraz daha yavaş işlenecektir.
        
    * BUG FIX: Kullanılan kodda bir hataEDDGridNcFiles ondan başarısız olmaya neden oldu.nc4 ve 4.hdf“uzun” olan 5 dosya (Int64) değişkenler. Bu şimdi sabit. Friedemann Wobus sayesinde.
         
    * BUG FIX: ISO 19115 dosyalarına farklı bir geçerlici mutlu etmek için küçük değişiklikler. Chris MacDermaid ve Anna Milan sayesinde.
         

## Version 2.01{#version-201} 
 (2019-07-02) 

*    **Yeni Özellikler ve Değişiklikler (kullanıcılar için) :** 
    * Hiçbir şey.
*    **Şeyler ŞeylerERDDAP™Yöneticilerin Bilme ve Yapması Gerekiyor:** 
    * BUG FIX: Veriler Access Formunu oluşturan kodda bir hatatabledapVeri setleri, web sayfasının bazı veri setleri için boş olmasına neden oldu. Ayrıca, tüm HTML sayfalarında beklenmedik hataların kullanımını geliştirdim, böylece yapacaklar (Genellikle genellikle genellikle genellikle genellikle) Bir hata mesajı gösterir. Marco Alba sayesinde.
    * IMPROVED: GenrateDatasets X ml artık çıktının üst kısmında uzun bir uyarı yayınlamıyor. Bunun yerine, lütfen bakınız[Genrate Datasets X ml Çıktı](/docs/server-admin/datasets#you-need-to-edit-the-output-from-generatedatasetsxml-to-make-it-better). Steven Baum sayesinde.
    * IMPROVED: GenrateDatasets X ml şimdi farklı durumlarda biraz farklı öneriler yapar&lt;EDD için herNMillis&gt;'i güncelleyin....Files datasets. Ayrıca, GenerateDatasets X ml şimdi EDDTableFromFiles datasets için orijinal "extract" sistemini cesaret ediyor.

## Version 2.00{#version-200} 
 (2019-06-26) 

*    **ERDDAP™v2.00 sonunda burada&#33; Yea&#33;**   
     
    * Bu versiyonu bitirmek için gerekli olan uzun gecikmeden özür dileriz.
Sabrınız için teşekkür ederiz.
         
    * İyi haber şu ki, kullanıcıların talep ettiği özelliklerin daha fazlasını eklemek için ekstra zaman kullanıldı. Kötü haber, gecikme ile bile, talep edilen tüm özellikler eklendi. Üzülüyoruz ama bu salıvermeyi daha fazla geciktirmek daha önemli görünüyordu (Sonsuza dek?) Sürekli olarak yeni özellikler ekliyor. Gelecekte daha sık yayınlara geri dönmeye söz veriyoruz.
         
    * "Version 2?&#33; Büyük değişiklikler ve inkompatibiliteler var mı?”
Büyük yeni özellikler? Evet.
Big incompatibiliteler veya yöneticiler veya kullanıcılar için değişiklikler? Hayır.
v1.82'den v2.00'a attık:
        * kısmen 10 yıl kutlamak (Şimdi 11) Çünkü ilk halk serbest bırakılmasıERDDAP™  (v1.00 2008-05-06'de, dış görünüşe göre v2.00 gibi görünüyordu) . O zaman,ERDDAP™En az 12 ülkede neredeyse 100 yüklemeye bir yüklemeden geçti. (Avustralya, Belçika, Kanada, Fransa, Hindistan, İrlanda, İtalya, Güney Afrika, İspanya, Tayland, İngiltere, ABD) .
        * kısmen tamamen yeni bir yönde büyük bir ek işaretlemek:ERDDAP™Şimdi mevcut veri sunucu hizmetleri ile gitmek için en büyük bir sistem var. (see see see see see see[EDDTable FromHttpGet](#eddtablefromhttpget)) ,
        * Ve kısmen, 1.82'den 2.00'ye kadar büyük bir at değildi, bu yüzden doğru zaman gibi görünüyordu.
             
    * Diğer iyi haber şu ki, şimdi iki başka grup koda katkıda bulunacakERDDAP™  (Bu versiyonda ve göstergelerle devam edecekler) : Rob Fuller ve Adam İrlanda'nın Deniz Enstitüsü ve PMEL ve Airtop Danışmanlık'ın Roland Schweitzer. Çok teşekkür ederim. Kendi seçtikleri projeler üzerinde çalışıyorlar, ancak klasik açık kaynak geliştirme modeli - gruplar çoğu ek görmek istedikleri özellikler için kod katkıda bulunur. Buna katkıda bulunmak için ek fayda: Yeni özellikleri en kısa sürede kullanmaya başlarlar; bir sonraki serbest bırakılması için beklemek zorunda değiller.ERDDAP. Grubun da katkıda bulunmak için hoş geldiniz&#33; Bakın,[ERDDAP™Programr's Guide](/docs/contributing/programmer-guide).
         
    * Umut ediyoruz seni seviyorumERDDAP™v2.00. Önümüzdeki 10 yıl boyunca ileriye bakıyoruzERDDAP™Geliştirme ve dünya çapında daha fazla kullanım.
         
*    **Yeni Özellikler ve Değişiklikler (kullanıcılar için) :**   
     
    * YENİ:orderByMeanfiltre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre
ÇünkütabledapVeri setleri belirtilen gruplar için araçları hesaplayacaktır. Ayrıca, tüm bunlarorderBySeçenekler şimdi tanımlayan grupların ek bir yolunu destekler: _numericVariable\\[/ sayı\\[ZamanUnitsitsits\\]\\[:\\]\\]_, e.g., saat/1day veya derinlik/10:5. Örneğin,stationID,time,waterTemp &orderByMean (" " ""stationID,time/1day") Sonuçları bir şekilde sıralayacaktırstationIDVe zaman, sonra her biri için suTemp kelimesini hesaplayın ve geri dönünstationIDHer gün için. Bunlar oldukça kullanışlı ve güçlü yeni özelliklerdir. Bu özellikler için yeni kod ve eski koddaki değişiklikler Rob Fuller ve Adam Leadbetter of İrlanda'nın Deniz Enstitüsü tarafından katkıda bulundu ve Git aracılığıyla sunuldu. Teşekkür ederim, Rob ve Adam&#33;
         
    * YENİ: Tellar veri setleri için dosya türü:[.data Masa](https://developers.google.com/chart/interactive/docs/reference#dataparam),
Kullanılacak bir JSON dosyası formatıGoogle Visualizationmüşteri kütüphanesi (Google Charts) . Bunun kodu Roland Schweitzer tarafından katkıda bulundu ve Git aracılığıyla sunuldu. Teşekkür ederim, Roland&#33;
         
    * YENİ: Tellar veri setleri için dosya türü:[.jsonlCSV1](https://jsonlines.org/examples/),
İşte mevcut olan gibi.jsonlCSVseçenek, ancak ilk satırdaki sütun isimleri ile. Eugene Burger sayesinde.
         
    * YENİ: Eğer yönetici bunu sağlarsa, kullanıcılar artık giriş yapabilirler[ORCID](https://orcid.org)hesap.
OAuth 2.0 doğrulama sistemi, Google doğrulama gibi. ORCID, araştırmacılar tarafından kendilerini eşsiz bir şekilde tanımlamak için yaygın olarak kullanılır. ORCID hesapları ücretsizdir ve Google hesaplarının sahip olduğu gizlilik sorunları yoktur. See See See SeeERDDAP"[Orcid kimlik doğrulama talimatları](/docs/server-admin/additional-information#orcid). BCO-DMO sayesinde (Adam Shepard, Danie Kinkade, vs.) .
         
    * YENİ: Yeni bir URL dönüştürücü, güncel URL'leri güncel URL'lere dönüştürür.
See... /erddap /convert /urls.html herhangi bir konudaERDDAP™Kurulum, e.g.,
        [Bu bağlantı, dönüştürücüye,ERD ERDDAP](https://coastwatch.pfeg.noaa.gov/erddap/convert/urls.html). Bu, veri yöneticileri için yararlı olmalıdır. Bu aynı zamanda GenerateDatasetsX ml tarafından içsel olarak kullanılmaktadır. Bob Simons ve Sharon Mesick sayesinde.
         
    * IMPROVED: The[Time Converter](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)Şimdi bir ISO8601 dize zamanı dönüştürmek veya bir ISO8601 dize zamanı dönüştürmek için seçeneklere sahiptir.UDUNITS- zaman birimleri doğru bir şekilde doğru bir şekildeUDUNITSZaman birimleri dize. Bu da yararlı olmalıdırERDDAP™Kontrol zamanı değişkenleri için “kendi” özellikleri için hangi formatın belirtilmesi gerektiğini bilmek zorunda olan yöneticiler. Bu aynı zamanda GenrateDatasetsX ml tarafından içsel olarak kullanılmaktadır ve EDDTable'in ne özelliğinin ne kadar standartlaştırılması. Bob Simons sayesinde.
         
    * YENİ: The The[Birimler](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)Yeni bir "Standartize UDUnits" seçeneği var.
Örneğin, "deg\\_C/m" ve " dereceler\\_C metre-1" her ikisi de dönüştürülür
" derece\\_C m-1". Bu özellik, EDTable FromFiles'in hangi özelliğinin standartlaştırılması ile de kullanılır. Bob Simons sayesinde.
         
    * YENİ: Grafikler için (Yüzey grafikler dışında diğer) griddap'ın vetabledap's Make A Graph web sayfaları, x eksen bir zaman eksen değilken, x eksen değişkeninin aralığının sadece bir alt kümesi görünürse, X Axis solunu veya doğruyu değiştirmek için grafiğin üzerindeki düğmeler var. Carrie Wall Bell / Hydrophone projesi sayesinde.
         
    * YENİ: Grafikler için, X ve / veya Y eksen artık bir Log ölçeği kullanabilir.
Kullanıcılar, Y Axis Scale'i griddap vetabledapBir Graph web sayfasını yapın. Bakın,[.xRange ve yRange Belgeleri](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#xRange). Carrie Wall Bell / Hydrophone projesi sayesinde.
         
    * IMPROVED:ERDDAP™Şimdi çeşitli HTTP hata kodlarının daha iyi kullanımı yapar ve şimdi geri döner(OPeN)DAPv2.0-formatted hata mesajı ödeme yükü. See See See See[Detaylar](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#Errors). Antoine Queric ve Aurelie Briand sayesinde.
         
    * IMPROVED: Netcdf-java/c veya diğer yazılım araçlarını kullanmayan.ncveya.hdfTarafından servis edilen dosyalarERDDAP‘s /files / sistem yerel dosyalar olsaydı.ERDDAP™Şimdi bu talepleri reddediyor. Korkunç bir şekilde verimsizdir ve genellikle diğer sorunlara neden olur. Bunun yerine:
        
        * Use Use Use Use Use(OPeN)DAPmüşteri yazılımı bağlanmak içinERDDAP"DAPDataset için hizmetler (Hangisi /griddap / veya /tabledap/ URL'de) . Bu nedirDAPiçindir ve çok iyi yapar.
        * Ya da, veri kümesinin veri girişi formunu kullanarak kullanın.
        * Ya da, tüm dosyaya ihtiyacınız varsa veya uzun bir süre içinde tekrarlanan erişime ihtiyacınız varsa, kullanıncurl,wget, veya tüm dosyayı indirmek için tarayıcınız, sonra dosyanızın yerel kopyasından verilere erişin.
        
          
         
    * IMPROVED: On theERDDAP™Ana Sayfa, Full Text Search şu anda "All Datasets Listesi" üzerindedir, çünkü çoğu kullanıcı için en iyi başlangıç noktasıdır. Didier Mallarino ve Maurice Libes sayesinde.
         
    * IMPROVED: DataProviderForm3.html Artık ortak listeler varstandard\\_names. IOOS DMAC toplantısında birisi sayesinde.
         
    * IMPROVED: /files / web sayfalarında, şimdi bu dosyalarla ne yapabilirim?” / dosyalar / dokümanlar bölümü. Bu bölüm çeşitli dosya türlerini açıklar ve onlarla nasıl çalışılacağına dair öneriler verir. Maurice Libes sayesinde.
         
    * IMPROVED: Hemen hemen her istekERDDAP™En az biraz daha hızlı olmalı ve bazen çok daha hızlı olmalıdır.
         
    * BUG FIX: Bazı koşullar altında, bir EDDTable veri kümesi bazı türlerde verileri kurtardığında.ncdosyaları, küresel "id" özelliği dosyanın önerilen adına ayarlanmıştı, bu istek için eşsiz hale getirmek için bir tane içeriyor. Şimdi "id" düzgün bir şekilde bırakılır (Eğer belirtseniz) veya dataset'in setine ayarlayındatasetID  (belirtmezseniz) . John Maurer sayesinde.
         
*    **Şeyler ŞeylerERDDAP™Yöneticilerin Bilme ve Yapması Gerekiyor:**   
     
    * TO DO: Bu sürüm biraz zaman alacaktır ve sizden çalışacaktır. Lütfen sabırlı olun ve gerekli değişiklikleri yapmak için birkaç saat planlayın ve yeni özelliklerle deney yapmak için birkaç saat daha plan olun.
         
    * TO DO: Güvenlik için, mevcut kurulumunuzun yedek bir kopyasını yapın.xml anddatasets.xmldosyaları böylece onlara geri dönebileceğiniz olası durumda geri dönmeniz gereken yere geri dönebilirsiniz.ERDDAP™v1.82.
         
    * TO DO: önerilenJavaŞimdi OpenJDK'nın AçıkJDK'sını Kabul Ediyor 8 8 (LTS) + HotSpot.
Bu açık bir kaynak değişkeniJavaBu onun kullanımında kısıtlama yok (aksine farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı aksine farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı aksine farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklıOracle"Javadağıtım dağıtım dağıtım dağıtım) . Bu, türetilmiştir.Oracle"JavaDevamlı bir şekilde,Oracle“Zenginlik. Güvenlik nedenleri için, bu sizin için tutmak önemlidirJavasürüm up-to-date. See See See SeeERDDAP"[Javayükleme talimatları](/docs/server-admin/deploy-install#java).
         
    * TO DO: OpenJDK'nın Kabul EdilmesiJavaTomcat kurulumunuz için küçük bir eke ihtiyaç var: Bakın[Kaynaklar Cache talimatları](/docs/server-admin/deploy-install#contentxml). Bunun -XX için bir yedek olduğunu düşünüyorum:MaxPermSize ayarlayın, hangi (Kabul) OpenJDK artık destek vermiyor.
         
    * TO DO: Yeni varsayılan ve tavsiye&lt;fontFamily&gt; Kurulumda ayarlanır.xml is is set in installation.xml.
DejaVu Sans, OpenJDK'nın Kabul Edilmesi için inşa edilmişJava. Görün bakalım,
        [revize edilmiş font yükleme talimatları talimatları](/docs/server-admin/deploy-install#fonts).
         
    * TO DO: Birçok etiket kurulumdan hareket ediyor.xml todatasets.xml. Avantaj, değerlerini değiştirirkenERDDAP™Is running, without restartingERDDAP. Muhtemelen, kolayca değiştirebilirsiniz&lt;startBodyHtml5&gt; geçici bir mesaj görüntülemek içinERDDAP™Ev sayfası (E.g., "Yeni JPL MUR SST v4.1 veri setini kontrol et ..." veya "BuERDDAP™2019-05-08T17:00 PDT'yi%8T20:00 PDT aracılığıyla korumak için çevrimdışı olacaktır.") . Eğer / bu etiketleri değiştirirsenizdatasets.xmlAncak değişiklikler bir sonraki sefere etkilenecekERDDAP™Okunuşu okudatasets.xml.
         
        
        1. Bu içeriği sizin için kopyalayındatasets.xmlDosya ( Dosyanın başlangıcında herhangi bir yerde, sonra&lt;erddapDatasets&gt;):
```
            <!-- The tags below are described in setupDatasetsXml.html.
                 The defaults listed below are as of ERDDAP™ v2.00. -->
            <cacheMinutes></cacheMinutes>                                     <!-- default=60 --> 
            <decompressedCacheMaxGB></decompressedCacheMaxGB>                 <!-- default=10 --> 
            <decompressedCacheMaxMinutesOld></decompressedCacheMaxMinutesOld> <!-- default=15 --> 
            <drawLandMask></drawLandMask>                                     <!-- "over" or "under" (default) -->
            <graphBackgroundColor></graphBackgroundColor>                     <!-- 0xAARRGGBB, default is 0xffccccff -->
            <loadDatasetsMinMinutes></loadDatasetsMinMinutes>                 <!-- usually=default=15 -->
            <loadDatasetsMaxMinutes></loadDatasetsMaxMinutes>                 <!-- default=60 -->
            <logLevel></logLevel> <!-- "warning" (fewest messages), "info" (default), or "all" (most messages) -->
            <nGridThreads></nGridThreads>                                     <!-- default=1 -->
            <nTableThreads></nTableThreads>                                   <!-- default=1 -->
            <partialRequestMaxBytes></partialRequestMaxBytes>                 <!-- default=490000000 -->
            <partialRequestMaxCells></partialRequestMaxCells>                 <!-- default=10000000 -->
            <slowDownTroubleMillis></slowDownTroubleMillis>                   <!-- default=1000 -->
            <unusualActivity></unusualActivity>                               <!-- default=10000 -->
            <!-- The defaults for the following tags are in messages.xml. -->
            <startHeadHtml5></startHeadHtml5>                                
            <startBodyHtml5></startBodyHtml5>                                 <!-- This is often customized. -->
            <theShortDescriptionHtml></theShortDescriptionHtml>               <!-- This is often customized. -->
            <endBodyHtml5></endBodyHtml5>
            <standardLicense></standardLicense>
            <standardContact></standardContact>
            <standardDataLicenses></standardDataLicenses>
            <standardDisclaimerOfEndorsement></standardDisclaimerOfEndorsement>
            <standardDisclaimerOfExternalLinks></standardDisclaimerOfExternalLinks>
            <standardGeneralDisclaimer></standardGeneralDisclaimer>
            <standardPrivacyPolicy></standardPrivacyPolicy>
```

        2. One-by-one, değerini kopyalayın (Eğer herhangi bir) Kurulumdan gelen bu etiketlerin her biri için.xml dosyası sadece geçmiş olduğunuz yeni etikete. (Yukarıda yukarıda yukarıda yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda) in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in indatasets.xml. Örneğin, 30'un değerini kullandıysanız&lt;Önlemler&gt; Kurulumda.xml, bu değeri yenilere kopyalamanız gerekir.&lt;Önlemler&gt; etiketidatasets.xml  (Değer yeni varsayılan değer olarak aynı olsa da, sadece etiketden etiketi terk etmek en iyisidirdatasets.xmlboş boş boş boş boş) .
            
Değeriniz yeni önerilen varsayılan varsayılan varsayılandan farklısa (başkası hariç)&lt;BodyHtml5&gt; ve&lt;TheShortDescriptionHtml&gt;, bu sizin için kullanışlıdırERDDAP™Kurulum), lütfen yeni varsayılan değerlere geçiş düşünün. Bu özellikle doğrudur&lt;kısmiRequestMaxBytes&gt; ve&lt;KısmiRequestMaxCells&gt;, varsayılan/suggested değeri yıllar boyunca önemli ölçüde değişti.
            
Her değeri kopyaladıktan sonra, etiketi ve açıklamasını kurulum.xml. Bu etiketlere sahip olmak daha iyidirdatasets.xml. Ve şimdi daha iyi açıklamalar var[SetDatasetsXml.html](/docs/server-admin/datasets#the-basic-structure-of-the-datasetsxml-file).
            
        
Yeni sistemin bir quirk, başladığın ilk web sayfasıdır.ERDDAPvarsayılan varsayılan olacaktırERDDAP™Web sayfası. Her sonraki web sayfası, belirtebileceğiniz ...Ht ml içeriğini kullanacakdatasets.xml.
        
    * WARNING: İlk kez çalıştırıyorsunERDDAP™v2.0, yerel veri dosyalarına dayanan veri kümeleri yüklenecek **çok çok çok çok çok çok çok çok çok** Yavaş yavaş çünküERDDAP™Veritabanını biraz farklı bir formatta yeniden oluşturmak gerekir. Yavaş başlangıç yükünden sonra, daha önce olduğu gibi çabuk yüklenecekler. Lütfen sabırlı olun.
         
#### EDDTable FromHttpGet{#eddtablefromhttpget} 
    *   [BÜYÜK EĞİTİM: EDDTable FromHtttpGet](#eddtablefromhttpget)  
Şimdiye kadar,ERDDAP™Sadece verileri okuyun ve kullanıcılar için mevcut yaptı. Şimdi,ERDDAP™Sensörlerden gerçek zamanlı verileri almak için basit, verimli bir sistem var. Diğer özelliklerin yanı sıra, bu veri seti iyi hazırlanmış versiyon sunuyor: veri setine yapılan her değişikliği hatırlar, yapıldığında ve kime göre. Genellikle, kullanıcılar sadece uygulanan tüm değişikliklerle veri kümesinin en son versiyonunu isteyecekler. Ancak, kullanıcılar için herhangi bir zamanda olduğu gibi veri setinden veri talep etme seçeneği vardır. Bu, yenidenroducible bilimi kolaylaştırır. Böylece, diğer yakın zamanlı veri setlerinin aksine, bu veri setleri için uygundur.[DOIs](https://en.wikipedia.org/wiki/Digital_object_identifier). Çünkü tanıştılarDOIDataset'in değişmediği şart, aggregation hariç. See See See See[EDDTable FromHttpGet](/docs/server-admin/datasets#eddtablefromhttpget). OOI sayesinde (Uzun zaman önce ve şimdi) Bunun ve Eugene Burger'in ihtiyacı hakkında konuşmak için, neyin önemli olduğuna dair hatırlatma için.
         
    * BÜYÜK YENİ EDİN:ERDDAP™Şimdi doğrudan dışlanmış veri dosyalarından veriye hizmet edebilir, dahil.tgz,.tar.gz,.tar.gzip,.gz,.gzip,.zip,.bz2, veya .Z. Datasets dış kaynaklı dosyaların bir karışımı içerebilir (Belki de eski veri dosyaları?) ve dışlanmamış dosyalar ve herhangi bir zamanda bir dosyayı sıkıştırabilirsiniz.
        
Bu harika çalışır&#33;
Çoğu durumda, dosyaları bastırmakla ilgili yavaşlama küçük. Bunu denemek için sizi güçlü bir şekilde teşvik ediyoruz, özellikle de kullanılan veri kümeleri ve / veya veri dosyaları için.
        
Bu sizi $ 30,000 veya daha fazla kurtarabilir&#33;
Bu birkaç kişiden biridirERDDAP™Size çok fazla para kazandırabilecek özellikler - birçok veri dosyayı sıkıştırırsanız, verileri depolamak için çok daha az RAIDs/hard sürücülere ihtiyacınız olacaktır veya tersine, çok daha fazla veriye hizmet edebilirsiniz (10x) Zaten sahip olduğunuz RAIDlerle. Bu özellik sizi başka bir RAID satın almaktan kurtarırsa, o zaman sizi yaklaşık 30 $ tasarruf etti.
        
Görün bakalım,[Dış olarak Comed Files belgeleri](/docs/server-admin/datasets#externally-compressed-files). Benoit Perrimond ve Paloma de la Vallee sayesinde.
        
    * BÜYÜK YENİ EDİN: Bütün HepsiEDDGridFromFiles and all EDDTable FromFiles datasets destek&lt;Önbellek FromUrl&gt; etiketi ve bir&lt;ÖnbellekSizeGB&gt; etiketi. Önbelli:GB belirtilmemişse, bu uzak bir veri kümesinin dosyalarının tam bir kopyasını alacaktır. ÖnbellekSizeGB belirtilir ve &gt;0 ise, bu, uzaktan veri setinden dosyaları indirecektir, gerektiği gibi sınırlı bir boyutla yerel bir önbellek olarak, bulut tabanlı olarak çalışırken faydalı olacaktır. (E.g., S3) veri dosyaları. Görün bakalım,[Önbelli önbelli önbelli önbelli önbelli önbelli önbelli önbelli önbelli önbelli önbelli FromUrl belgeleri](/docs/server-admin/datasets#cachefromurl)Detaylar için. Bob Simons ve Roy Mendelssohn sayesinde (Hangi yıllar boyunca uzaktan veri set dosyalarının yerel kopyalarını işlemek için senaryolar yazıyor) Lloyd Cotten, Eugene Burger, Conor Delaney (Amazon Web Services’teyken) Ve Google Cloud Platform.
         
    * NEW: The new EDDTable FromJsonlCSV Sınıftan tabular verilerini okuyabilirsiniz
        [JSON Lines CSV dosyaları](https://jsonlines.org/examples/)  ("Better Than CSV") . Marine Institute of İrlanda'daki insanlar sayesinde bana bu format hakkında ve Eugene Burger ve PMEL'e bir giriş türü olarak destek vermek için teşekkürler.
         
    * YENİ: AllEDDGridVe tüm EDDTableFromFiles datasets bir destek&lt;nThreads&gt; ayarı, hangi diyorERDDAP™Bir isteke cevap verirken kaç tane ip kullanmak. Bakın,[nThreads Belgeler](/docs/server-admin/datasets#nthreads)Detaylar için. Axiom Data Science Rob Bochenek sayesinde, Eugene Burger, Conor Delaney (Amazon Web Services’teyken) Ve Google Cloud Platform.
         
    * YENİ standardize Tüm EDDTable'in alt sınıflarından ne için -
Daha önce, belirli bir değişken için, önemli özelliklerin değerleri (E.g.,scale\\_factor,add\\_offset,missing\\_value, \\_FillValue, birimler) tutarlı değildi, EDDTable FromFiles, "valid" olmak için her türlü özellik için bir değer alır ve "Bad Files" olarak diğer özellikleri ile dosyaları işaret eder. Şimdi, dosyaları en kısa zamanda EDDTable FromFiles dosyaları okurken standartlaştırmak için bir sistem var. See See See See[EDDTable FromFile's standardize What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What What](/docs/server-admin/datasets#standardizewhat). One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One Of One OfERDDAP“Temel hedefler veri dosyaları ve veri setleri tutarlı bir şekilde erişilebilir hale getirmektir. standardize standardize Bunu gerçeğe dönüştürmek için önemli bir yeni araç nedir. Marco Alba sayesinde, Margaret O'Brien (Diğer EML kullanıcıları) BCO-DMO vePort kullanıcıları.
         
    * NEW EDDTable FromInvalidCRAFiles, bir veri kümesinden bir veri setini bir koleksiyondan yapmanızı sağlarNetCDF  (v3 veya v4)  .ncBelirli, geçersiz, CF DSG Contiguous Ragged Dizileri (CRA) dosyaları. Bu veri set türü için örnek dosyaları bulunabilir https://data.nodc.noaa.gov/thredds/catalog/ncei/wod/  \\[2020-10-21-21-21 Bu sunucu artık güvenilir olarak mevcut değil\\]. Her ne kadar olsa da olsa da olsa da olsa da rağmenERDDAP™Bu dosya türünü destekler, kimsenin kullanmaya başlamaması gereken geçersiz bir dosya türüdür. Şu anda bu dosyayı kullanan gruplar, kullanmak için şiddetle teşvik edilirERDDAP™Geçerli CF DSG CRA dosyaları oluşturmak ve bu dosyaları kullanmayı bırakın. Ajay Krishnan ve Tim Boyer sayesinde.
         
    * EDDTable FromThreddsFiles and EDDTable FromHyraxFiles are now deprecated. Lütfen EDDTable FromNcFiles (veya bir değişken) artı artı artı artı&lt;Önbellek FromUrl&gt;. Bu bir sebepten dolayı çalışmıyorsa, e-postaerd.data at noaa.gov. 2020'den önce şikayet yoksa, bu veri set türleri kaldırılabilir.
         
    * IMPROVED – Sistem otomatik olarak ISO 8601 kez ISO 8601 kez ISO 8601 kez dönüştürmek için (v1.82'de tanıtıldı) Çok sayıda ek formatla uğraşmak için büyük ölçüde genişletildi. Bu, GenrateDatasetsX ml veERDDAP“Kaynak metadata'nın kullanımı.
         
    * IMPROVED – String zamanı parsing sisteminin üçüncü büyük revizyonu ile (Ve umarım son) ,ERDDAP™Artık artık kullanılmıyorJavaTarihTimeFormatter, bazen aşırı zamanları etkileyen böcekler yüzünden (yıllar)&lt;=0000).ERDDAP™Şimdi kendi sistemini zaman dizeleri için kullanır.
         
    * WARNING: Yeni String zamanı parsing sistemi biraz katı. Veri setlerinden biri aniden zaman değerleri için eksik değerlere sahipse, neden neredeyse kesinlikle zaman aralığı biraz yanlış. Girişte hata mesajları olmalıdır. Zaman formatına uymayan zaman değerleriyle ilgili txt - bu veri kümesi için zaman biçimini düzeltmenize yardımcı olmalıdır. Yardıma ihtiyacınız varsa, seçeneği kullanınERDDAP"Convert\\[s\\]ISO 8601 dize zamana kadar herhangi bir ortak dize zamanı” - dönüştürücünin kaynak dizesini görmezden geldiğini gösterir.
         
    * RECOMMENDATION: En hızlı, en kolay ve en ucuz yolERDDAP“Pilar verilere erişim, bir Solid State Drive üzerindeki veri dosyalarını koymaktır (SSD) . Çoğu tabut veri setleri nispeten küçük, bu yüzden 1 veya 2 TB SSD muhtemelen tüm tabu veri kümeleriniz için veri dosyalarını tutmak için yeterlidir. SSD'nin sonunda bir hücreye veri yazsanız, onu silip bu hücreye çok fazla kez yeni veriler yaz. Bunun yerine, bunu tavsiye ediyorum (Mümkün olduğu kadar) Sadece bir kez verileri yazmak ve birçok kez okumak için SSD'nizi kullanın. O zaman, bir tüketici sınıfı SSD bile çok uzun bir süre son vermeli, muhtemelen herhangi bir Hard Disk Drive Drive Drive'dan çok daha uzun (HDD) . Tüketici-grad SSD’ler artık ucuz (2018 - 1 TB veya - 2 TB için 400 $) Ve fiyatlar hala hızlı düşüyor. When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When WhenERDDAP™Bir veri dosyasına erişim sağlar, bir SSD her ikisini de sunar
        
        * Daha kısa latency (~0.1ms, bir HDD için ~3ms karşı, karşı ~10 (??) Bir RAID için, Amazon S3 için $) Ve
        * Daha yüksek (~500 MB/S, karşı ~75 MB /s for an HDD against ~500 MB /s for a RAID) .
        
Bu yüzden bir ~ 10X performans artışına yükselebilirsiniz (Bir HDD vs) 200 $&#33; Sisteminize en olası değişikliklerle karşılaştırıldığında (10.000 $ için yeni bir sunucu? 35,000 $ için yeni bir RAID? 5.000 $ için yeni bir ağ geçişi mi? vs.) Bu, Yatırım Üzerindeki En İyi Geri Dönüş (ROI) . Eğer sunucunuz hafıza ile yüklenemezse, sunucunuz için ek bellek aynı zamanda tüm yönleri hızlandırmak için harika ve nispeten ucuz bir yoldur.ERDDAP.
        \\[SSD'nin ızgara verileri için harika olurdu, ancak çoğu grid veri setleri çok daha büyük, SSD'yi çok pahalı hale getiriyor.\\]  
         
    * YENİ: Giriş yapan herkes rol alır =\\[Herhangi bir kişi In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In\\]Ama orada olmasa bile,&lt;kullanıcı için etiketdatasets.xml. Dataset'in ayarlarsanız&lt;erişilebilirTo&gt; to\\[Herhangi bir kişi In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In\\]Sonra giriş yapan herkesERDDAP™  (e.g., Gmail veya Orcid hesabı aracılığıyla) Veri kümesine erişmek için yetkili olacaktır, belirtmediyseniz bile&lt;kullanıcı için etiketdatasets.xml. Maurice Libes sayesinde.
         
    * IMPROVED: TheUDUNITS/UCUM birimleri dönüştürücü çok gelişmişti.
Bu, geçersiz birimler daha iyi algılar (Bilgiyi korumak için bir vurgu ile başlayarak, geçerliliği sağlamak yerine) . Ayrıca, sonuçlar şimdi standart bir sözcülüğe sahiptir.
         
    * YENİ: The TheUDUNITS/UCUM birimleri dönüştürücü, standartlaştırmak için yeni bir seçeneğe sahiptirUDUNITSdize.
Bu, geçerlilik için iyi çalışırUDUNITSdizeler ve makul derecede standart olmayan / geçersizUDUNITSdizeler. Örneğin, Örneğin,UDUNITS="meters per second", "meter/saniye","m.s^-1"Ve"m s-1"Hepsi "m.s-1" geri dönecek. Bu yeni standardize için gerekliydi Yukarıda açıklanan hangi sistem. Marco Alba sayesinde, Margaret O'Brien (Diğer EML kullanıcıları) BCO-DMO vePort kullanıcıları.
         
    * NEW: EDDTable FromMultidimNcFiles şimdi bir tane var[Terapistler](/docs/server-admin/datasets#treatdimensionsas)seçenek, bu diyorERDDAP™Bazı boyutları tedavi etmek için (E.g., LAT ve LON) Sanki onlar başka boyutlardaymış gibi (E.g., TIME) . Bu, sadece bir boyut kullanmaları gerektiğinde farklı boyutlardaki bazı yanlış dosyalar için faydalıdır (E.g., TIME) . Marco Alba ve Maurice Libes sayesinde.
         
    * YENİ: Şimdi, tümEDDGridFrom...Files datasets yeni özel bir eksen desteklersourceNameHangi diyor kiERDDAP™DosyaName'den bilgi almak için (Sadece dosya adı.ext) Ve değerini kullanmak için **yerini değiştirmek** Mevcut sol en eksen değeri. formattır
        \\*\\*\\*replace FromFileName,_dataType_,_extractRegex_,_captureGroupNumber_
See See See See[Bu belge](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata). Teşekkürler teşekkürlerNOAAPathfinder Daily aggregation dataset.
         
    * YENİ: Şimdi, tümEDDGridFrom...Files datasets yeni özel bir eksen desteklersourceNameHangi diyor kiERDDAP™Dosyanın yolundan bilgi almak için (Yönetmenler + dosya adı.ext)   
        \\*\\*\\*pathName,_dataType_,_extractRegex_,_captureGroupNumber_
Bunun için, yol adı her zaman kullanır'/'Rehber ayırıcı karakteri olarak, asla 'biz' değil.
See See See See[Bu belge](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata). Paloma de la Vallee sayesinde.
         
    * NEW: Şimdi, tüm EDDTable From... Dosyalar datasets ek sahte değişkenleri destekliyorsourceNameDosyanın dosyasından bilgi alan (Sadece dosya adı.ext)   (see see see see see see[\\*\\*\\*fileName](/docs/server-admin/datasets#filename-sourcenames)) veya dosyanın tam yoluName (/dir1/dir2/filename.ext)   (see see see see see see[\\*\\*\\*pathName](/docs/server-admin/datasets#pathname-sourcenames)) . Paloma de la Vallee sayesinde.
         
    * YENİ: Eğer biriniz varsaEDDGridDataset'in bir veya daha büyük boyutları vardır (e.g., milyonlarca değer) Hangi bir çok hafızayı alır, yeniyi ayarlayabilirsiniz [&lt;boyutValuesInMemory&gt;] (/docs /server-admin/datasets#dimensionvaluesinmemory) Sahtekarlık (Varsayılan gerçek doğru) Bu, veri kümesinin diskteki değerleri depolamasına ve gerektiğinde onları almaya yardımcı olur. David Rodriguez ve Rich Signell sayesinde (Tekrar:EDDGridRoloFiles) .
         
    * IMPROVED: Daha önce, yeniden sipariş edersenizdataVariables for a EDDTable FromFiles dataset and reloaded the dataset, EDDTable FromFiles tüm veri kameralarını yeniden hazırlayacaktır. Şimdi, tüm veri dosyalarına yeniden hazırlanmadan yeniden sipariş ile başa çıkabilir. Roland Schweitzer sayesinde.
         
    * IMPROVED: Şimdi, ne zamanERDDAP™ASCII, NCCSV ve JSON Hatları CSV veri dosyaları okursa, belirli bir çizgide bir hata bulursa (e.g., yanlış sayıda öğe) , bir uyarı mesajı girin ("WARNING: Skipping line #"... " beklenmedik sayıda öğe...") Ve[log.txt file](/docs/server-admin/additional-information#log)Ve sonra veri dosyasının geri kalanını okumaya devam edin. Böylece, periyodik olarak bakmak sizin sorumluluğunuzdur (veya bunu yapmak için bir senaryo yaz) Bu mesaj için girişte. txt böylece veri dosyalarındaki sorunları düzeltebilirsiniz.ERDDAP™Bu şekilde ayarlanmıştır, böylece kullanıcılar mevcut tüm geçerli verileri okumaya devam edebilir, ancak dosyanın bazı hatları kusurlarına sahip olsa da. Daha önce,ERDDAP™Dosyayı "kötü" olarak işaretledi ve veri setinden kaldırdı.
         
    * IMPROVED: Ne zaman kesin zaman (E.g., en yakın ikinci veya milisaniye) Kaynakta " dakikadan beri" olarak depolanır. (veya daha büyük birimler) ,ERDDAP™Şimdi, değerleri okurken en yakın milisaniyeye yuvarlanırERDDAP. Aksi takdirde, yüzen nokta numaraları belirli zamanlardaki veriler için çürük ve taleplerdir. (e.g., &time=2018-06-15T01:30:00) Başarısız olacaktır. Daha önce, onları mümkün olduğunca tam olarak hesapladı (Ve hala birimler e.g. ise, "saniyeler ..." veya "millisans o zamandan beri ...") . Bu problemden büyük birimleri kullanarak kaçınmak en iyisidir (E.g., dakika veya saat) Doğru zaman değerlerini depolamak için (e.g., mikrosaniye) - bilgisayarlar, decimal basamaklarını işlemek için fakir bir iş yapar. Marco Alba sayesinde.
         
    * CHANGES to EDDTable FromEDDGridBu çok daha iyi yapar. EDDTable From FromEDDGridKullanıcıların tabular veri setleri olduğu gibi ağlayan veri kümelerini sorgulamasına izin verir ("değerli") .
        
        * Şimdi bir destek&lt;maxAxis0&gt; etiketi (varsayılan=10) Hangi maksimum eksen sayısını belirtir\\[0 0 0 0\\]  (Genellikle genellikle genellikle genellikle genellikle"time") Bir zamanlar queried olabilecek değerler. Bu, EDDTable'den almak için naif talepleri önlerEDDGridTüm bir ağlanmış veri kümesi aracılığıyla aramak (Bu bir süre içinde başarısız olur) .
        * GenrateDatasets X ml şimdi EDDTable'ı oluşturmak için bir seçenek varEDDGridVerilen bir veri kümesinin hepsi için veri setleriERDDAP™Hangi maç belirli bir regex (.\\* tüm veri kümelerini eşleştirmek için) . Veri setleri, bunun bir ızgara veri kümesinin bir tabut versiyonu olduğunu gösteren özet özellikleri hakkında daha fazla bilgiye sahip olmasıdır. Ve onlarındatasetIDİşte bu,datasetIDKafeded dataset, artı "\\_AsATable".
        * En yaygın kurulum için büyük bir hız var: ızgara veri setinin bir an olduğu zamanEDDGridErddap veri setinden bu aynı zamandaERDDAP.
        
James Gallagher ve Ed Armstrong sayesinde.
         
    * YENİ: üretmek Datasets X ml tüm veri kümeleri türleri için şimdi bir \\_FillValue veya eklemek çok daha olasıdır.missing\\_valueBir sayısal değişkenin özellikleriaddAttributes. Örneğin, bu dize eksik değer işaretleyicileri olduğunda gerçekleşir (E.g., "", "", "NA", "nd", "NaN") Örnek dosyadaki bu değişken için dönüştürülürERDDAP‘Yer eksik değerlerin (127 in byte columns, 32767 kısa sütunlarda, 2147483647 Int columns, 92233720368547758 Uzun sütunlarda ve NaN yüz ve çift değişkenlerde) . Ayrıca yüz ve iki değişkende NaN değerleri için de meydana gelir. Ayrıca, "nd", sayısal veri sütunlarında sayısal eksik değer işaretlerinin listesine eklendi.ERDDAP™Görmeli. Matt Biddle of BCO-DMO sayesinde.
         
    * IMPROVED: Üretilen ncdump seçeneği Datasets X ml şimdi daha fazla ncdump gibi (Ancak hala ncdump-java versiyonunu kullanır) . Şimdi, yeni bir seçenek listesini yazdırır. Şimdi, şimdilik,.ncml dosyaları, ncdump çıktısını sonuna kadar yazdırır.ncAltta yatan dosya değişiklikleri uygulanır.ncveya.hdfDosya.
         
    * BUG FIX: Bir dosya sızdırıyor (Sonunda nedenERDDAP™Donmak için) Bazı çıktı dosyaları oluşturmak için, e.g., .geotif, özellikle de icat sırasında hatalar meydana geldiğinde. Sanırım / bu şimdi tüm sabit. Hala sorunları görürseniz, lütfen bana veri kümesini söyleyin (grid veya masa) Ve probleme neden olan dosya türü. Steven Beale sayesinde Lynn DeWitt, Jibei Zhao ve diğerleri.
         
    * BUG FIX: The The The The The The The TheWMS LeafletDemo tamamen / basit bir şekilde "elevation" için " derinlemesine" ekseni dönüştürmedi. Şimdi, yapar ve kırık efsane talepleri sabitlenir. Ayrıca, düşüş listelerindeki tüm eksen seçenekleri her zaman sıralanmış bir düzendedir. Antoine Queric ve Aurelie Briand sayesinde.
         
    * BUG FIX: EDDTable FromFiles şu anda veri dosyalarında araç değişkenlerinden oluşturulan String değişkenleri üzerinde kısıtlamalar destekliyor. Antoine Queric ve Aurelie Briand sayesinde.
         
    * BUG FIX: Şimdi, bir veri kümesi kullanılamadığı zaman, veri seti bildirim almaya çalışır (Mesajla "Bu veri kümesi şu anda mevcut değildir.") aboneleri, listelenen eylemler, rss ve lonPM180 veri setleri buna güvenmektedir. Roy Mendelssohn ve Bob Simons sayesinde.
         
    * BUG FIX: EDDTableCopy ile ilgili iki böcek. Sam McClatchie sayesinde.
         
    * IMPROVED: Durum.html sayfasında gösterilen başarısız istek sayısı artacaktır çünkü daha fazla şey daha önce başarısızlık olarak sayılır.
         
    * IMPROVED:ERDDAP'Şimdi "Requests" gösteriyor. (Aylarda medyan zamanları) "Zaman serisinde. Daha önce, medyan zamanlarını tam saniyeye düşürdü.
         
    * IMPROVED: jsonld çıkışında, jsonld "isim" artık veri kümesinden geliyor"title"in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in inERDDAPVe jsonld "headline" şimdi dataset'in "datasetID"İçinde"ERDDAP. Daha önce, tersine döndü. Bu benim için yanlış görünüyor çünkü normal İngilizce kullanımda, "isim" genellikle kısa, (İdeal olarak ideal olarak) nadiren /nver değişikliklerinin benzersiz tanımlayıcıları (E.g., Robert Middlename Simons) Ama eşsiz olmayan bir açıklama değil ve bu kolayca ve sık sık değişebilir (E.g., "Yazılı bir adamNOAA" vs." için yazılım yazan uzun bir adamNOAA" " "") . Gee, şema.org tanımı harika olurdu[Name Name Name Name Name Name Name Name Name Name Name](https://schema.org/name)Ancak bir Dataset bağlamında daha spesifikti. Yazılım geliştiricileri, uzmanların rehberliği olmadan tek başına bir spesifikasyona dayalı bir uygulama yazabilmeli. Ama Google'a gidiyorum (özellikle Natasha Natasha Noy) NCEI (Özellikle John Relph) Rob Fuller.
         
    * IMPROVED: jsonld çıkışında, dört "spatialCoverage GeoShape kutusu" değeri şimdi minLat maxLon maxLat maxLon. Daha önce, lat ve lon pozisyonları ters alındı. Gee, şema.org tanımı harika olurdu[GeoShapepe](https://schema.org/GeoShape)Doğru düzeni belirt. Yazılım geliştiricileri, uzmanların rehberliği olmadan tek başına bir spesifikasyona dayalı bir uygulama yazabilmeli. Natasha Noy ve Rob Fuller sayesinde.

## Version 1.82{#version-182} 
 (2018-01-26) 

*    **Yeni Özellikler (kullanıcılar için) :**   
     
    * Bakış-ve-feel bakmak için çok ince değişikliklerERDDAP™Web sayfaları.
        * IMPROVED:ERDDAP™Şimdi HTML 5 kullanır ve CSS'nin daha iyi kullanımını sağlar.
        * IMPROVED: Web sayfaları onları daha temiz ve daha az "busy" yapmak için biraz değiştirildi. (Hala yoğun ve hala şikayet edebilecek şeyler var, ama umarım daha önce çok daha az.) Bazı yorumlar için John Kerfoot sayesinde.
        * IMPROVED: Web sayfaları şimdi mobil telefonlarda ve diğer küçük cihazlarda çok daha iyi görünüyor, özellikle onları manzara yöneliminde kullanıyorsanız. Ayrıca masaüstü tarayıcılarda çok küçük ve çok büyük pencerelerde daha iyi görünüyorlar.
        * IMPROVED: Güvenlik ve diğer nedenleri geliştirmek için, güncel bir Openkat sürümünün kullanımıWMSGösteri sayfaları değiştirildiLeaflet.
        * NEW: Görüntü, ses ve video dosyalarının önizlemeleri için destek"files"Sistem sistemi sistemi sistemi sistemi sistemi sistemi sistemi sistemi sistemi (Örneğin,[Bu test verileri seti](https://coastwatch.pfeg.noaa.gov/erddap/files/testMediaFiles/ShouldWork/)) ve içinde.htmlTableBir hücrenin bir görüntünün URL'si olduğunda, ses veya video dosyası (Örneğin,[Bu istek](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/testMediaFiles.htmlTable?url%2Cname%2ClastModified%2Csize%2CfileType%26url=~%22.*ShouldWork.*%22)) . Bir '?' ikonu üzerinde duruyorsanız, bir görüntü, ses veya video dosyası önbelleği görmeniz gerekir. Ayrıca tarayıcınızdaki dosyayı görüntülemek için dosya linkine tıklayabilirsiniz. Bakın,[Media Files belgeleri](/docs/server-admin/datasets#media-files). Farklı tarayıcıların farklı dosya türlerini desteklediğini unutmayın, bu nedenle örnekler tarayıcınızda çalışmayabilir.
Bu insanlar/bağışlar için fikirler ve örnek kod için CSS-sadece görüntü araçları için teşekkürler (was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at https://codepen.io/electricalbah/pen/eJRLVd ) Ve ertelenmiş görüntü yükleme (was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at was at https://varvy.com/pagespeed/defer-images.html )   (Kod kullanımdan önce değiştirilmiş olmasına rağmenERDDAP) .
Cara Wilson, Matthew Austin ve Adam Shepherd/BCO-DMO görüntü desteği için talepler için teşekkürler.
Jim Potemra, Rich Signell, OOI ve Carrie Wall Bell'in ses/hidrojen dosya desteği talep ettiği için teşekkürler.
Video desteği ihtiyacını göstermek için OOI sayesinde.
        * YENİ: Herhangi bir veri kümesi herhangi birindenERDDAP™Dataset (Ancak genellikle ses dosyalarından bir veri kümesi) Şimdi bir .wav ses dosyasında kurtarılabilir. ([Belge belgeleri](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#wav)) Jim Potemra, Rich Signell, OOI ve Carrie Wall Bell'in ses/hidrojen dosya desteği talep ettiği için teşekkürler.
        * IMPROVED: Web Accessible Folders için format (WAF)   (e.g., /files / klasörler) HTML masasını kullanmak için güncellendi. Yeni format, Apache'nin daha yeni versiyonları tarafından yaratılan dizi web sayfalarının daha yeni versiyonunu taklit eder. İnsanlar, değişikliklerin bilgiyi okumak için daha kolay hale getirdiğini bulacaklar. Bu belgeleri parlayan yazılım (e.g., ISO 19115 belgelerini hasat eden yazılımERDDAP) revize edilmek zorunda kalacak, ancak yeni format önceki formattan daha kolay olacak. (Dikkat, Anna Milan.) 
        * YENİ YENİ YENİ YENİ YENİoutOfDateDatasets.htmlSayfa. ([Örnek örnek örnek örnek örneği](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html)) Bu web sayfası, yakın zamanlı veri setlerinin hepsi ile bir masa gösteriyor&lt;testOutOfDate&gt; etiket (Aşağıdaki aşağıda bakınız) Ancak, veri setlerinin ne kadar güncel olduğu ile sıralanmıştır. Bu pano için yararlı olmalıdırERDDAP™Yöneticiler ve son kullanıcılar hangi veri setlerinin güncel olduğunu bilmek isterler. For out-of-date datasets, muhtemelen veri kaynağı ile ilgili bir sorun var, bu yüzden bu yüzden bu yüzdenERDDAP™Daha son zamanlardaki puanlardan / verileri göremiyor.
Yöneticiler: Out-Of-Date Datasets web sayfasını istemiyorsanız, kurulumunuza ekleyin.xml:
            &lt;outOfDateDatasetsActive&gt;false&lt;/outOfDateDatasetsActive&gt;
Şimdi vartestOutOfDateve dışarı çıkıp OfDate sütunları içindeallDatasetsdataset.
Bunu yıllardır isteyen Bob Simons sayesinde ve İrlanda'nın Deniz Enstitüsü'ndeki akıllı insanlar bana özel Raspberry Pi ile ilham verdi ve her zaman ofislerinde böyle bir ekran gösteriyor.
        * IMPROVED:.htmlTableve.xhtmlCevap şimdi daha iyi formatlanmış, daha kompakt ve böylece daha hızlı yükleniyor. HTML5 ve CSS sayesinde.
    * YENİ çıktı dosya türü ızgara veri kümeleri için: .timeGaps. Medya boşluklarından daha büyük olan zaman değerlerinde boşlukların listesini gösteriyor. ([Örnek örnek örnek örnek örneği](https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMHchla8day.timeGaps)) Bu, için yararlıdırERDDAP™Yöneticiler ve son kullanıcılar, bir veri kümesi için zamanında beklenmedik boşluklar olup olmadığını bilmek istediklerinde, düzenli olarak zaman değerlerinin olması bekleniyor. Bu özelliği ihtiyacı olan Bob Simons ve Roy Mendelssohn sayesinde.
    * IMPROVED: Varsayılan grafikler içinallDatasetsdataset şimdi x=maxLon ve y=maxLat ile bir harita. John Kerfoot, Rich Signell ve OOI-CI sayesinde.
    * YENİ:[erddapy](https://github.com/ioos/erddapy)- bir şey değilERDDAP™özellik, ama birçok kişiye ilgilenecekERDDAP™Kullanıcılar. Erddapy (ERDDAP™+ + + +Python) Bir şeydirPythonFilipe Fernandes tarafından yaratılan kütüphane, “onların avantajlarını alırERDDAP"RESTfulWeb hizmetleri ve yaratırERDDAP™Veri kümeleri aramak gibi herhangi bir istek için URL, bir metadata satın almak, verileri indirmek vs." Filipe Fernandes sayesinde.
    * Daha önce bahsetmeliyim: Çalışmayı daha kolay hale getirmek için tasarlanmış üçüncü taraf R paketi varERDDAP™R içinde:[Rerddap](https://github.com/ropensci/rerddap#rerddap). Teşekkürler teşekkürler[rOpenSci](https://ropensci.org/)Roy Mendelssohn.
         
*    **Şeyler ŞeylerERDDAP™Yöneticilerin Bilme ve Yapması Gerekiyor:**   
     
    * TO DO: Kurulumda.xml, sağ aşağıda&lt;adminInstitution&gt;, lütfen bir ekleyin&lt;adminInstitutionUrl&gt; etiketi, kuruluşunuz için bir URL'yi belirtir (veya grup) .
    * TO DO: Kurulumda bu 3 etiket artık kullanılmamıştır:
        &lt;start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start HeadHtml&gt;,&lt;startBodyHtml&gt; ve&lt;endBodyHtml&gt;. Onlar tarafından değiştirildi
        &lt;HeadHtml5&gt;&lt;BodyHtml5&gt; ve&lt;endBodyHtml5&gt;, mesajlarda belirtilen varsayılan değerleri vardır.xml (ve aşağıda gösterilen) .
        
Varsayılan olarak kullanmayı öneriyoruz&lt;HeadHtml5&gt; ve&lt;endBodyHtml5&gt;.
Tavsiye ederiz: Eğer orijinaline değişiklikler yaptıysanız&lt;BaşlangıçBodyHtml&gt; ve / veya özelleştirmek istiyorERDDAP™Şimdi, lütfen yeniyi kopyalayın&lt;startBodyHtml5&gt; etiketi (aşağıdan aşağıya) Kurulumunuza.xml ve onu özelleştirmek için değiştirinERDDAP™Bu yüzdenERDDAP" web sayfaları organizasyonunuzu yansıtıyor, değilNOAA ERD. Elbette, lütfen "B'nin size ait olduğunu" organizasyonunuza değiştirin (s) . Yardıma ihtiyacınız varsa lütfen e-postaerd.data at noaa.gov. (Eğer özelleştirmek istemiyorsanızERDDAP™Şimdi varsayılan olarak kullanın&lt;startBodyHtml5&gt;.)
        
Sonra kurulumunuzda 3 eski etiketler sil.xml artık kullanılmamıştır.

```
        <startBodyHtml5><!\\[CDATA\\[ 
        <body>
        <table class="compact nowrap" style="width:100%; background-color:#128CB5;"> 
          <tr> 
            <td style="text-align:center; width:80px;"><a rel="bookmark"
              href="https://www.noaa.gov/"><img 
              title="National Oceanic and Atmospheric Administration" 
              src="&erddapUrl;/images/noaab.png" alt="NOAA"
              style="vertical-align:middle;"></a></td> 
            <td style="text-align:left; font-size:x-large; color:#FFFFFF; ">
              <strong>ERDDAP</strong>
              <br><small><small><small>Easier access to scientific data</small></small></small>
              </td> 
            <td style="text-align:right; font-size:small;"> 
              &loginInfo; &nbsp; &nbsp;
              <br>Brought to you by 
              <a title="National Oceanic and Atmospheric Administration" rel="bookmark"
              href="https://www.noaa.gov">NOAA</a>  
              <a title="National Marine Fisheries Service" rel="bookmark"
              href="https://www.fisheries.noaa.gov">NMFS</a>  
              <a title="Southwest Fisheries Science Center" rel="bookmark"
              href="https://www.fisheries.noaa.gov/about/southwest-fisheries-science-center">SWFSC</a> 
              <a title="Environmental Research Division" rel="bookmark"
              href="https://www.fisheries.noaa.gov/about/environmental-research-division-southwest-fisheries-science-center">ERD</a>  
              &nbsp; &nbsp;
              </td> 
          </tr> 
        </table>
        \\]\\]></startBodyHtml5>
```

Yapabileceğiniz ek yollar vardır[özelleştirme özelleştirme özelleştirme özelleştirme özelleştirme özelleştirme özelleştirmeERDDAP™](/docs/server-admin/deploy-install#customize)Bu yüzdenERDDAP's web sayfaları organizasyonunuzu bunun yerine yansıtıyorNOAA ERD.
        
    * TO DO: The&lt;EDDGrid...Example&gt; etiketler (le birlikte başlayın&lt;EDDGridIdExample&gt;) ve&lt;EDDTable... Örnek&gt; etiketler (le başlamak&lt;EDDTableIdExample&gt;) Kurulumnızda.xml dosyası, griddap ve vetabledapBelgeler. html web sayfanızdaERDDAP.
        
Bu etiketleri özelleştirmediyseniz lütfen kurulum.xml dosyasından silin. Şimdi hepsi mesajlarda varsayılanlar var.xml, Bob'un veri setlerine atıfta bulunanERDDAP™At içeri at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at https://coastwatch.pfeg.noaa.gov/erddap/index.html . Bu yüzden artık belirli veri kümelerine sahip olmanız gerekmezERDDAP. Varsayılanleri abartmak istiyorsanız, kurulumunuza bazı veya tüm bu etiketleri kopyalayın.xml ve değerlerini değiştirin.
Örneklerin sizin için işaret etmesini istiyorsanızERDDAP™En kolay yöntem:
        
        1. Bu iki veri kümesini sizin için ekleyinERDDAP™Bunu size ekleyerekdatasets.xml:
```
            <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>
            </dataset>
            <dataset type="EDDTableFromErddap" datasetID="pmelTaoDySst" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst</sourceUrl>
            </dataset>
```

        2. Bu etiketi kurulumunuza ekleyin.xml, ancak URL'yi URL'yi URL'yi sizin için değiştirin.ERDDAP" (https??) URL: URL:
```
            <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
            <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```
        
Bu etiketleri özelleştirseydiniz, onları olduğu gibi bırakın ve lütfen kurulumunuza bu 2 yeni etiket ekleyin.xml'i belirtmek içinERDDAP™Bu veri kümeleri için URL, ancak URL'yi URL'yi sizin için değiştirirERDDAP" (https??) URL: URL:
```
        <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
        <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```

    * TO DO:ERDDAP™Şimdi erddap2.css olarak adlandırılan bir cs dosyasını kullanır. Değişiklikleri değiştirirseniz\\[tomcat\\]/webapps/erddap/images/erddap.css, erddap2.csss (Aynı dizide) .
    * YENİ:ERDDAP's web sayfaları şimdi neredeyse görünmez iç bağlantıların çok sayıda var (Metin siyah ve vurgulanmamış) . Bu bağlantıların bir tanesine doğru ilerlerseniz (Genellikle başlık ve paragrafların ilk birkaç kelime) , cursor bir el haline gelir. Bağlantıya tıkladığınızda, URL belgenin bu bölümüne içsel bağlantıdır. Bu, belgelerin belirli bölümlerine atıfta bulunmak kolaylaşır. Bunu yıllardır isteyen Bob Simons sayesinde.
    * YENİ:ERDDAP™Şimdi destekleniyor[Byte Range / Kabul-Ranges](https://en.wikipedia.org/wiki/Byte_serving)/files / dosyaların porsiyonları için talepler. Bu, tarayıcılarda ses ve video izleyicileri desteklemek için gerekliydi.
    * TO DO: Şimdi, güvenliği geliştirmek için, belirtseniz&lt;BaseHtttpsUrl&gt; Kurulumda.xml (Ve böylece destekhttps) , önerilen bayrak Url bir anhttpsDaha güvenli bir bayrakla URLKey. Eğer öyleyse, önceki bayrakları /flagKeys geçersiz olacaktır. Adminler: Bu değişiklikler sizin için geçerliyseERDDAP™Ve eğer seninERDDAP™has has has has has has has has has has has has has has has has has has has has have has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has hasEDDGridErddap ve EDDTableErddap'tan gelen bu, uzaktan gelene aboneERDDAPs, sonra, güncellemeden sonraERDDAP, seninERDDAP™otomatik olarak yeni bayrakUrl ile abone olmaya çalışacak, böylece eski abonelikleri silmelisiniz ve yeni abonelik doğrulama e-postalarını aldığınızda yeni abonelikleri doğrulamanız gerekir.
    * TO DO: If your yourERDDAP™has has has has has has has has has has has has has has has has has has has has have has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has has hasEDDGridErddap veri setlerinden Bob'un sahil gözlemleri içinERDDAP™Lütfen yeni erdVH2018 veri setlerine atıfta bulunmak için onları değiştirin.
    * TO DO: Eğer jplAquariusSSS örnek veri setlerinin herhangi birini içersenizERDDAP™Lütfen "V4"i içinde değiştirindatasetID"V5".
    * TO DO:actual\\_rangeŞimdi bir CF standart özellik (CF-1.7) Ve açıkça, değişken kullanımları kullanırsaadd\\_offsetve/veyascale\\_factorVeri değerlerini paketlemek için, sonraactual\\_rangeDeğerler paketsiz veri türünü kullanmalıdır ve paketlenmiş değerler olmalıdır. Ne yazık ki, önceki tavsiyelerimizle bu çatışmalar. GenrateDatasets X ml şimdi paketsizactual\\_rangedeğerler, ama bu mevcut veri kümelerini sizin tarafınızda düzeltmezdatasets.xmlDosya.
        
Öyleyse, lütfen veri setlerinizi kontrol edin: değişkenin değerleri paketlenmiş ve eğeractual\\_rangepaketlenmiş veri değerleri olarak belirtilmiştir, lütfen ekleyin&lt;addAttributes&gt; &gt; &gt; &gt;actual\\_rangeKapalı değerleri belirtmek için değer. Aksi takdirde, dataset yüklemeyecekERDDAP. Bunu yapmak için basit ve neredeyse mükemmel bir yol, aramanız içindatasets.xmlKaynak için Attributes that have have
```
        <att name="actual\\_range" type="shortList">  
        or <att name="actual\\_range" type="intList">  
```
vescale\\_factor1.0'dan başka. Bunlar,actual\\_rangedüzeltmeniz gerekebilir özellikleri.
        
eksen değişkenleri içinEDDGriddatasets,ERDDAP™Her zaman setleri ayarlaractual\\_rangeBu değerleri bildiğinden bu yana değerlerin gerçek aralığı olmak.
        
İndük değerleri ile eksen değişkenleri (e.g., some latitude variables) ,ERDDAP™Oluşturulmuş yaratılmış yaratılmış yaratılmış yaratılmışactual\\_rangeile birlikte\\[0 0 0 0\\]...\\[Son son son son\\]Değerler, yüksek olan...düşü. Şimdi her zaman yeni CF tanımı yapmak için düşük ... yüksek değerler kullanır.
        
Doğrulukactual\\_rangedeğerler EDDTable veri kümeleri için özellikle önemlidir, çünküERDDAP™Kullanıcıların veri değerlerinden daha az olan taleplerini hızlıca reddedecektir.actual\\_rangeMinimum değer veya hangisi daha büyükactual\\_rangeMaksimum değer.
        
İlgili: gerçek\\_min, gerçek\\_max,data\\_minvedata\\_maxözellikler şimdi deprecated. Lütfen veri kümelerinizi kullanmak için dönüştürmeactual\\_rangeBunun yerine.
        
    *  DO (Seçmeli, ancak önerilen) : Her yakın-gerçek zamanlı için ve tahmin veri setiniziERDDAP™Lütfen bir ekleyin&lt;testOutOfDate&gt;) (/docs /server-admin/datasets#testoutofdate) Formda bir değerle etiketnow-_nUnits_, e.g.,now-2 gün. Veri kümesi için en fazla zaman değeri bu değerden daha eskiyse, veri seti güncel olarak kabul edilir ve bu şekilde işaretlenecektir.[outOfDateDatasets.html](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html)Web sayfası. Bu, bir veri kümesinin kaynağıyla yanlış olduğunda görmek için kolay bir yol sağlar.
    *   [YENİ: Json-ld ile Datasets Semantic Markup (JSON Linked Data) ](/docs/server-admin/additional-information#json-ld)  
        ERDDAP™Şimdi kullanımları kullanın[json-ld (JSON Linked Data) ](https://json-ld.org)Veri katalogunuzu ve veri kümelerinizi oluşturmak için[semantic web](https://en.wikipedia.org/wiki/Semantic_Web)Tim Berners-Lee'nin web içeriğini daha fazla makine okunabilir ve makine "korkunabilir". Arama motorları ([Google özellikle Google](https://developers.google.com/search/docs/data-types/datasets)) Ve diğer semantik araçlar, keşif ve indekslemeyi kolaylaştırmak için bu yapılandırılmış işaret kullanabilir. json-ld yapılandırılmış işaret, görünmez-insanlar olarak görünür&lt;script&gt; Kod http://.../erddap/info/index.html web sayfası (Hangi bir semantic web[DataCatalog](https://schema.org/DataCatalog)) Ve her şeyde ve http://.../erddap/info/_datasetID_/index.html web sayfası (Hangi bir semantic web[Dataset](https://schema.org/Dataset)) . (Adam Leadbetter ve Rob Fuller of the Marine Institute in İrlanda'daki işin bu bölümünü yapmak için işin zor kısımlarını yapmak için özel teşekkürler.ERDDAP.) 
    * YENİ: Verileri ses dosyalarından okuyabilen yeni veri set türleri vardır:
        [EDDGridRoloFiles](/docs/server-admin/datasets#eddfromaudiofiles)Ancak bu, ses verilerini ızgara veriler olarak tedavi eder.
        [EDDTable From ISSoFiles](/docs/server-admin/datasets#eddfromaudiofiles)Ancak bu, ses verilerini tabular veri verileri olarak tedavi eder. Jim Potemra, Rich Signell, OOI ve Carrie Wall Bell'in ses/hidrojen dosya desteği talep ettiği için teşekkürler.
    * GenrateDatasets için değişiklikler X ml (Ve ilgili değişiklikler) :
        * YENİ:ERDDAP™Şimdi otomatik olarak bir sisteme sahip[Güncel URL'ler](/docs/server-admin/additional-information#out-of-date-urls)Her ikisi de GenrateDatasets X ml ve datasets yüklediğinizde. Yakalanmış ve güncellenecek ek URL’ler için önerileriniz varsa veya bunun bir hizmete dönüşeceğini düşünüyorsanız (Paketler gibi) Lütfen e-postaerd.data at noaa.gov.
        * NEW: Now, if GenerateDatasets X ml bir CF görürstandard\\_name  (Her şey daha düşük olmalıdır) Üst bir karakterle, tüm düşük sürüm sürümlerini bir üst köşeye ekliyor&lt;addAttributes&gt;. Ayrıca, bir veri kümesi yükleri olduğunda, eğerERDDAP™Bir CF görürstandard\\_nameÜst bir karakterle, onu sessizce değiştirirstandard\\_name. Rich Signell sayesinde.
        * NEW: Now, if GenerateDatasets X ml ISO 8601 formatında olmayan bir süre ile bir özellik görür, ISO 8601 formatını ekliyor.&lt;addAttributes&gt;. If if if if if if if if if if if if if if if if if if if if if if if if if if if if ifERDDAP™Biçimi tanımıyor, zaman değerini değişmeden bırakıyor. Bir format görürseniz,ERDDAP™Bilmiyor ve düzeltin, lütfen e-posta ileerd.data at noaa.gov.
        * IMPROVED: Düşük seviye koduEDDGridBundan sonra GenrateDatasets X ml şimdi X ml'ye dayanıyorUnidatanetcdf-java katalog tarama kodu (thredds. katalog sınıfları) Bu yüzden tüm THREDDS katalogları idare edebilir (Hangi şaşırtıcı derecede karmaşık olabilir) . Roland Schweitzer sayesinde bu değişikliği önermek ve teşekkürlerUnidataKod için.
        * YENİ: GenrateDatasets X ml içinEDDGridDap'tan şimdi gerçek zamanlı eksen değerlerine dayanan başlık başlığının sona ermesi için ", start Years-End Years" ekliyor. Son 150 günde veri var ise son 150 gün içinde uçup gidiyor.
        * YENİ: GenrateDatasets X ml içinEDDGridFromDap şimdi ",\\[Karar\\]°", veri kümesinin bile uzaydığı ve lat ve lon için aynı olduğu başlık için.
        * IMPROVED: Zaman dönüştürücüsi artık ek özelliklere sahiptir, özellikle de ISO 8601 dizelerine veya UDUnits-Jonits uyumlu bir numaraya yayılabilme yeteneği. Daha önce desteklenen tüm özellikler çalışmaya devam ediyor, değişmeden.
        * BUG FIX: GenrateDatasets X ml ve Anahtar Kelimeler dönüştürücü şimdi "Dünya Bilimi &gt; "GCMD Bilim Anahtar Kelimelerinin başlangıcında. Bir veri kümesi yüklenen zamanERDDAP™,ERDDAP™Artık anahtar kelimelerdeki herhangi bir GCMD anahtar kelimelerini "Dünya Bilim &gt; " veya bu, başlık durumundan başka bir şey kullanıyor (Her kelimenin ilk mektubu nerede sermayelenmiş) .
        * IMPROVED: Ne zaman önerir&lt;destinationName&gt;'s, GenerateDatasets EDDTableAsciiFiles için X ml sadece kuyruğunu kullandısourceNames with'/'  (Bazıları dosya adı benzeriydi) . Şimdi tüm bunları kullanırsourceName(e.g., "blahblah (m/s)". Bu değişiklik bazı veri kümeleri için iyi olacak ve başkaları için değil, daha güvenli bir davranıştır. Maurice Libes sayesinde.
        * BUG FIX: GenrateDatasets X ml ve veri setleri yapıcılar şimdi tekrarlanan sütun isimleri olmadığından emin olurlar. Maurice Libes sayesinde.
        * BUG FIX: GenrateDatasets EDDTableAsciiFiles için X ml yazmadı&lt;KöşeSeparator&gt; çıktıya. Şimdi öyle. Maurice Libes sayesinde.
    * YENİ: DasDds aracı şimdi zaman boşluk bilgileri yazdırıyor (The the the the[.timeGaps bilgi](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#timeGaps)) Eğer veri kümesi bir ağlanmış veri kümesidir.
    * YENİ: Gelişmiş Arama şimdi "şimdi_\\-nUnits_" zaman değerlerini kabul ediyor. Rich Signell sayesinde.
    * IMPROVED: Güvenlik geliştirmek için, bir e-posta adresi bir veri kümesinin metadata veya veri bir html web sayfasına yazılırken, "@" ile değiştirilir. Bu sadece tüm metadata veya veri değeri olan e-posta adreslerini yakalar, daha uzun değerlere gömülü olmayan e-posta adresleri değildir.
    * IMPROVED: Güvenliği artırmak için,RSSÖzel veri setleri için bilgi şimdi sadece kullanıcılar için mevcuttur (veRSSokuyucular) Kim girişte ve bu veri kümesini kullanmaya yetkilidir.
    * NEW: Şimdi, bir veri kümesi yüklendiği zaman, eğerdate\\_created,date\\_issued,date\\_modified, veya tarih\\_metadata\\_modified özelliği ISO 8601 formatında olmayan zaman değeri vardır,ERDDAP™ISO 8601 formatına değişiklikler. If if if if if if if if if if if if if if if if if if if if if if if if if if if if ifERDDAP™Biçimi tanımıyor, zaman değerini değişmeden bırakıyor. Bir format görürseniz,ERDDAP™Bilmiyor ve düzeltin, lütfen e-posta ileerd.data at noaa.gov.
    * IMPROVED: .dods yanıtlarındanEDDGridVeri setleri artık önemli ölçüde daha hızlı olmalıdır. Rich Signell sayesinde.
    * İlgili DeğişikliklerERDDAPISO 19115 belgelerinin yaratılması:
        * BUG FIX: ISO 19115 belgeleri oluştururken,dataVariableBirimler HTML Attribute encoded ve yüzde encoded değildi. Şimdi onlar. NGDC'nin ISO 19115 geçerliatörü sayesinde.
        * BUG FIX: ISO 19115 belgeleri oluştururken,date\\_createdSanki, çoğu zaman yanlış formattı. Şimdi ISO 8601 Z dizesine dönüştürülür. NGDC'nin ISO 19115 geçerliatörü sayesinde.
        * BUG FIX: ISO 19115 belgeleri oluştururken,ERDDAP™Şimdi daha uzun yıl ile tarihler yazıyor =0000 (iklimoloji verileri ile) Çünkü ISO 19115 şeması, tarihlerin yıl=0000 ile izin vermez. NGDC'nin ISO 19115 geçerliatörü sayesinde.
    * YENİ: Bir istekten öncehttp... /erddap /vers sadece sürüm numarası geri dönecektir (metin olarak) E.g., "ERDDAP\\_vers=1.82."
Şimdi, bir istekhttp... /erddap /vers\\_string bir numara geri dönecek ve '\\_' artı ASCII metni (Uzaylar veya kontrol karakterleri yok) E.g., "ERDDAP\\_vers\\_string=1.82\\_JohnsFork. Fork yapan insanlar bunu EDStatic.erddapVersion'ı değiştirerek belirtecektir. Bunu yapmanın bu yolu, önceki versiyonları için sorunlara neden olmazERDDAP. Axiom sayesinde (Özellikle, Kyle Wilcox) İrlanda'nın Deniz Enstitüsü (Özellikle Rob Fuller) .
    * BUG FIX: wms versiyonu için =1.3.0, istek =GetMap, crs=EPSG:4326 (CRS:84) Talepler: bbox siparişi minLat,minLon,maxLat,maxLon olmalıdır. CRS için:84 talep, daha önce olduğu gibi, bbox siparişi minLon,minLat,maxLon,maxLat olmalıdır. Bu, kullanarak düzeltebilirERDDAP"WMS1.3.0 hizmet içindeArcGIS  (Paola Arce sayesinde) . Teşekkürler teşekkürler (Değil değil) toklanmak içinOGCBu kadar karmaşık hale getirmek için. Teşekkürler teşekkürlerLeafletBu doğru şekilde işlemek ve bunu test etmek için bana bir yol vermek için.
    * IMPROVED: Önceki, önerilen bağlantı içinRSSve e-posta abonelikleri de varhttpURL içinERDDAP. Şimdi bu,httpsURL, eğer bu aktifse.
    * YENİ:EDDGridKopya şimdi opsiyonel bir etiket destekler&lt;Sadece&gt;_someValue_&lt;/ Sadece&gt;, değerin belirli bir ISO-8601-formatted zamanı veya a) olduğunow-nUnits (E.g.,now-2 yıl) Zaman. Görün bakalım,[Sadece sadece sadece sadece sadece sadece sadece sadece sadece sadece sadece sadece sadece Dokümantasyondan beri](/docs/server-admin/datasets#onlysince). Drew P sayesinde.
    * IMPROVED: Eğer mevcutsa,ERDDAP™GösterecekhttpsURL (From URL)&lt;BaseHtttpsUrl&gt;, eğer mevcutsa)httpURL, kullanıcılara URL'yi abonelik eklemek / güncel /remove/list eklemek için söylediğinde.
    * BUG FIX:ERDDAP™Şimdi bir abonelik eyleminin " https://" . (Bob alnını kırıyor.) Jennifer Sevadjian sayesinde.
    * BUG FIX:.jsonlKVPŞimdi her anahtar ve değer arasında, bunun yerine “:” kullanır.'='. (Bob alnını kırıyor.) Alexander Barth sayesinde.
    * BUG FIX: Daha önce, yeniden başladıysanızERDDAP™HızlıRestart = true, ve eğer, veri kümesi normal olarak yeniden yüklendikten önce, herNMillis'i güncellemekte olan bir EDDTable'e bir çağrı yaptınız ve eğer bir veri dosyası değiştirseydi, istek bir null pointer hatasıyla başarısız olur. Şimdi istek başarılı olacaktır. John Kerfoot sayesinde.
    * YENİ: Bir veri kümesi yüklendiği zamanERDDAP™Ancak anahtar kelimeler şimdi sıralanmış bir düzen haline getirilir ve yeni karakterler kaldırılır.
    * IMPROVED: Şimdi, eğer bir .geoJson,.jsonveya.ncOJson isteği vardır.jsonp parametre, yanıt mime tipi uygulama/javascript. Not that Not that Note that Not.jsonp desteklenmez.jsonlCSVveya.jsonlKVPÇünkü işe yaramayacak. Rob Fuller sayesinde.
    * IMPROVED: json hatları dosyaType seçenekleri için mime tipi şimdi "application/x-jsonlines". Uygulama /jsonl idi. Şu anda kesin bir doğru seçim yoktur.
    * IMPROVED: Durumda gösterilen başarısız istek sayısı artacaktır.html sayfa daha öncekinden daha fazla şey başarısızlık olarak sayılır, e.g., MüşteriAbortException.
    * IMPROVED: Şimdi, bir yanıtERDDAP™Baskılanmamış değil, sonra cevabın başlığı "Content-Encoding"="identity" içerecektir.
    * IMPROVED: "license" özelliği gerekli değildi. Şimdi, belirtilmemişse, mesajlardan standartLicense.xml. (veya kurulumdan sonra.xml) varsayılan olarak kullanılır.
    * YENİ: Şimdi bir seçenek var[fileAccessSuffix özelliği](/docs/server-admin/datasets#fileaccessbaseurl)Mevcut mevcut ile kullanılabilir.[fileAccessBaseUrl özelliği](/docs/server-admin/datasets#fileaccessbaseurl).
    * IMPROVED: Güvenliği artırmak için, bu sürüm en sonJavaJDK v8u162.
    * YENİ: Güvenlik artırmak için, geçici e-posta adresleri sunan birkaç ortak alan (e.g., @mailinator.com) Şu anda abonelik sistemi için kalıcı bir e-posta karalist.
    * YENİ: Güvenlik artırmak için, Günlük Rapordaki uzunlar şunları içerir:
SetDataset Bayrak IP Adresi Başarısız (Son günden beri günlük rapor)   
SetDataset Bayrak IP Adresi Başarısız (O zamandan beri başlangıç)   
SetDataset Bayrak IP Adresi Succeed (Son günden beri günlük rapor)   
SetDataset Bayrak IP Adresi Succeed (O zamandan beri başlangıç)   
"Failed" boyunları kimin gördüğünü görelim (Bir hacker?) Bir bayrak oluşturmaya çalışıyor ama başarısız.
    * IMPROVED: Güvenlik, e-posta adreslerini artırmak için&lt;abonelikEmailBlacklist&gt; Sizindatasets.xmlŞimdi vakaya duyarlı olarak kabul edilir.
         

## Version 1.80{#version-180} 
 (2017-08-04) 

*    **Yeni Özellikler (kullanıcılar için) :**   
     
    * YENİ YENİ YENİ YENİ YENİorderByCount () Filtre, sonuçları masanın nasıl sıralanacağını belirtmenize izin verir (ya da değil mi?) Ve sadece her bir grup için bir sıra döndürür, her değişken için izinsiz değerlerin sayısı ile.
Örneğin,orderByCount (" " ""stationID" " "") TarafındanstationIDVe her biri için bir sıra geri dönünstationIDAncak, her değişken için izinsiz değerlerin sayısı ile.
Eğer sadece belirtsenizorderByCount ("") Ancak yanıt, her veri değişkeni için izinsiz değer sayısına sadece bir sıra olacaktır.
Görün bakalım,[orderBy... Belge belgeleri](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#orderBy)Ben Adams sayesinde.
    * YENİ YENİ YENİ YENİ YENİ.ncOJson dosyasını Kafeded ve tabular veri setleri için Type seçeneği. Bu seçenek bir an yaparNCOlvl=2 "pedantic" JSON dosyası tüm bilgiler normal olarak bulundu.ncDosya. See See See See[ http://nco.sourceforge.net/nco.html#json ](https://nco.sourceforge.net/nco.html#json)Charlie Zender sayesinde.
    * BUG FIX: The The The The The The The TheorderBy... () Make A Graph web sayfasındaki seçenekler artık doğru şekilde ele alınır.
    * BUG FIX: .geoJson çıkışı şimdi lat veya lon değerlerinin eksik olduğu yerde baskı satırları yayınlamaz. Ayrıca, yükseklik değerleri (Eğer mevcut varsa) Şimdi koordinatlara dahil, veri değerleri olarak değil. Jonathan Wilkins sayesinde.
         
*    **Şeyler ŞeylerERDDAP™Yöneticilerin Bilme ve Yapması Gerekiyor:**   
     
    * SECURITY ISSUE: protokolleri.js kütüphanesi için kullanılanOpenLayersDemodaWMSSayfalarda sayfalarERDDAP™Tarih dışıdır ve potansiyel olarak kötüye kullanılmasına izin veren bir otobüse sahiptir. (Ne yazık ki, güncellemeOpenLayersve protokolleri. js kolay değil.) Bu, kütüphanenin bir yerdeki kırılganlığa izin vermek için kurulabileceği olasılığı ortaya koyar. Ancak, o zamandan beriERDDAP™Sadece sadece sadece kullanırOpenLayersBelirli bir başlangıç yolunda ve sadece özel olarakERDDAP- tabanlı veri kaynakları, herhangi bir çapraz yer kırılganlığı olmadığına inanıyoruzERDDAP's use of'OpenLayersVe protokoller.js. Ancak, buna inanmıyorsanız, artık kullanımı devre dışı bırakabilirsiniz.OpenLayersDemodaWMSSayfalarınızERDDAP™ekleyerek
```
        <openLayersActive>false</openLayersActive>  
```
Kurulumunuz için.xml dosyasına. Varsayılan "gerçek". Charles Carleton ve NCEI sayesinde.
    * SECURITY CHANGES: Kullanılmamış .jar dosyaları ve tekrar .jar dosyaları (Çünkü aynı zamanda netcdfAll.jar) kaldırıldıktan sonraERDDAP™dağıtım. Out-of-date .jar dosyaları güncellendi. Charles Carleton ve NCEI sayesinde.
    * İLGİLİ: NetcdfAll.jar dosyası ile dağıtılmışERDDAP™En son sürüm (Şu anda 4.6.10) Ancak hala Amazon S3 veri kaynaklarına eriştiğinde kullanılan Jackson kütüphaneleri var. Amazon S3 aracılığıyla veriye erişmezseniz (Eğer olsaydın bileceksin) Ancak bu açıklar ilgili değildir.
        
Netcdf-java geliştiricileri, bu açıklığın bu kütüphaneleri kullandığı ve herhangi bir durumda Amazon S3'e eriştiğinde ilgili olmadığını koruyor. See See See See[ https://github.com/Unidata/thredds/issues/866 ](https://github.com/Unidata/thredds/issues/866). Onlara inanıyorum. Hala bununla ilgili endişeleriniz varsa, lütfen netcdf-java geliştiricileriyle iletişime geçin. (Netcdf-java geliştiricilerine inanmıyorsanız ve kullanmayı düşünmüyorsunuzERDDAP™Bu nedenle, THREDDS'yi de kullanmamalısınız, çünkü THREDDS netcdf-java'yı daha temel ve daha geniş bir şekilde daha geniş bir şekilde kullanıyorERDDAP.) 
        
Detaylar: Sorunlu kod ve kırılgan uyarılar şunlardır:
netcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-databind/pom.xml
See See See See https://nvd.nist.gov/vuln/detail/CVE-2016-7051 – Yüksek Yüksek Yüksek Yüksek Yüksek
netcdfAll-latest.jar/META-INF/maven/com.fasterxml.dataformat /jackson-dataformat-cbor/pom.xml.xml.xml.xml.xml.
See See See See https://nvd.nist.gov/vuln/detail/CVE-2016-7051 – Yüksek Yüksek Yüksek Yüksek Yüksek
netcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-annotations/pom.xml
See See See See https://nvd.nist.gov/vuln/detail/CVE-2016-7051 – Yüksek Yüksek Yüksek Yüksek Yüksek
See See See See https://nvd.nist.gov/vuln/detail/CVE-2016-3720 - Eleştirel
netcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-core/pom.xml
See See See See https://nvd.nist.gov/vuln/detail/CVE-2016-7051 – Yüksek Yüksek Yüksek Yüksek Yüksek
See See See See https://nvd.nist.gov/vuln/detail/CVE-2016-3720 - Eleştirel
"For version 4.6.10, aws-java-sdk-core 2.6.6 of jackson-\\* works." (Netcdf-java insanlardan e-posta) .
Charles Carleton ve NCEI sayesinde.
        
    * COMPILER CHANGES: If you recompileERDDAP™Ancak, komut hattı için gerekli olan -cp sınıfıpath parametresinin artık daha kısa olduğunu unutmayın. Yeni -cp ayarına bakın[Bu belge](/docs/contributing/programmer-guide#development-environment). Charles Carleton ve NCEI sayesinde.
    * YENİ OPTION in GenrateDatasets X ml: EDDTable FromBcodmo, bu sadece BCO-DMO'da iç kullanım içindir.
Adam Shepherd ve BC multivitaminO sayesinde.
    * YENİ ATTRIBUTE ve FE Vitamini: Eğer bir EDDTable sütunu web erişilebilir dosyalarının dosyalarına sahiptir (e.g., görüntü, video veya ses dosyaları) , ekleyebilirsiniz
```
        <att name="fileAccessBaseUrl">_someBaseURL_</a>  
```
Temel URL'yi belirtmek için (Sonunda /) Dosya isimlerinin tam URL'lere yapılması gerekiyordu. Sonra için.htmlTableCevaplar,ERDDAP™Dosya adı, birleşik URL'ye bir bağlantı olarak gösterecektir (Temel Url artı dosya adı) .
Eğer istiyorsanERDDAP™İlgili dosyaları hizmet etmek için, bu dosyalar için ayrı bir EDDTableFromFileNames dataset yapın (Özel bir veri kümesi olabilir) .
Adam Shepherd ve BC multivitaminO sayesinde.
    * NEW ATTRIBUTE RECOMMENDATION: Eğer bir EDDTable sütunu web erişilebilir dosyaların dosyalarına sahiptir (e.g., görüntü, video veya ses dosyaları) Hangi bir arşiv aracılığıyla erişilebilir (E.g.,.zipDosya dosyası) Bir URL aracılığıyla erişilebilir, kullanın
```
        <att name="fileAccessArchiveUrl">_theURL_</att>  
```
URL'yi arşiv için belirtmek için.
Eğer istiyorsanERDDAP™Arşiv dosyasına hizmet etmek için, bu dosya için ayrı bir EDDTableFromFileNames dataset yapın (Özel bir veri kümesi olabilir) .
Adam Shepherd ve BC multivitaminO sayesinde.
    * GenrateDatasets için IMPROVEMENTS X ml geçersiz/kötü sebeplerini ortadan kaldırmak için&lt;subsetVariables&gt; öneriler ve tekrar / kötü önerilen değişken isimler vs. Rich Signell, Adam Shepherd ve BCO-DMO sayesinde.
    * YENİ OPTION: Siyasi sınır bilgisi ile dağıtıldıERDDAPÜçüncü bir parti ve biraz güncel. Ayrıca, dünyadaki çeşitli yerlerde tartışmalı sınırlar var, farklı insanların neyin doğru olduğu hakkında farklı fikirlere sahip olacağı.  COR  POLI  POLI  POLI  POLI  POLI  POLI  POLIERDDAP. Eğer gelen siyasi sınır bilgilerini beğenmezsenizERDDAP™Şimdi söyleyebilirsinERDDAP™Hiçbir zaman siyasi sınırları çizerek çizmeyin
```
        <politicalBoundariesActive>false</politicalBoundariesActive>  
```
Kurulumunuza.xml dosyasına. Varsayılan "gerçek". Raju Devender sayesinde.
    * YENİ METADATA TAG: İçindedatasets.xmlBir veri kümesi için, şimdi varsayılan sayıda renk belirtebilirsiniz Bar bölümleri içindataVariableGrafikler ve haritalar
```
        <att name="colorBarNSections">_anInteger_</att>  
```
         (varsayılan=-1, hangi diyor kiERDDAP™karar karar karar karar karar karar karar karar karar karar karar karar karar karar karar karar karar karar karar karar karar karar karar karar karar) . Görün bakalım,[Renk rengi renk rengi Bar ayarları](/docs/server-admin/datasets#color-bar-attributes).
    * IMPROVED: haritalardaki devlet sınırı rengi mordu (Deep Mor for you Baby Boomers) . Şimdi gri (Ulusal sınır gri ve toprak gri) .
    * BUG FIX:&lt;iso19115File&gt; ve&lt;fgdcFile&gt; içindedatasets.xmlHer zaman doğru şekilde ele alınmadı. Şimdi onlar. BCO-DMO sayesinde.

## Version 1.78{#version-178} 
 (2017-05-27-27) 

*    **Yeni Özellikler (kullanıcılar için) :**   
     
    *    (Hiçbir kimse hiçbir şey yok)   
         
*    **Şeyler ŞeylerERDDAP™Yöneticilerin Bilme ve Yapması Gerekiyor:**   
     
    * IMPROVED: "Major LoadDatasets Time Series" in the order of line in "Major LoadDatasets Time Series" in the status.html page is now latest to older at the alt.
    * BUG FIX:ERDDAP™Şimdi yazıyor.nccsvZaman değişkeninin dosyalarıactual\\_rangeISO-8601 String zamanı olarak. Bu, EDTable FromErddap parsing info from a uzaktan dataset and from the quickRestart file for all EDDTableFrom...Files datasets. (Zaman Zamanıactual\\_rangev1.78'deki veri kümesi yüklerini ilk kez yanlış olacak, ancak yeniden yüklendikten sonra doğru, e.g., eğer veri kümesini bayraklarsanız.) 

## Version 1.76{#version-176} 
 (2017-05-12) 

*    **Yeni Özellikler (kullanıcılar için) :**   
     
    * Tomcat'ta CHANGE: İstekler içinERDDAP™Web tarayıcılarından diğer yazılımlardan geliyor (E.g.,curl, R,Matlab,Python,Java) :
Tomcat versiyonlarında önceki değişiklikler gibi (Çalışan alt düzey yazılımERDDAP) 2016 yılından bu yana, istek URL'nin sorgu kısmındaki karakterlerin daha fazla ve daha fazlası talep edilmelidir[ **Percent Encoded** ](/docs/server-admin/datasets#infourl)Güvenlik nedenleri için. Tarayıcılar sizin için yüzde encoding bakımı alır. Bu yüzden kullanınERDDAP™Bir tarayıcıda, istek başka bir şeye yönlendirmediği sürece etkilenmezERDDAP.
    * IMPROVED: Önce,ERDDAP™tedavi edilen tedavi tedavi edilen tedavi tedavi edilen tedavi tedavi tedavi edilen tedavi tedavi tedavi edilen tedavi tedavi tedavi edilen tedavi tedavi tedavi tedavi edilen tedavi tedavi tedavi tedavi edilen tedavi tedavi tedavi tedavi edilen tedavi tedavi tedavi tedavi tedavi tedavi tedavi edilen tedavi tedavi tedavi tedavi tedavi tedavi edilen tedavi tedavi tedavi tedavi tedavi tedavi tedavi tedavi tedavi tedavi edilen tedavi tedavi tedavi tedavi tedavi tedavi tedavi tedavi tedavi tedavi tedavi tedavi tedavi tedavi tedavi tedavi tedavi tedavi tedavi tedavi tedavi tedavi tedavi tedavi tedavi tedavi tedavi edilen tedavi **Kar değişkenleri** karakterlerden daha kısa tamsayılar gibi. Şimdi onlara 1-character-long UCS-2 gibi daha fazla davranır (Unicode) Strings. Görün bakalım,[Yardım belgeleri](/docs/server-admin/datasets#char). Aurelie Briand ve Argo projesi sayesinde.
    * IMPROVED: Önce,ERDDAP™Küçük destek için teklif edildi **Unicode karakterleri** Yukarıdaki karakter #255 in Strings. Şimdi, içsel olarak,ERDDAP™2bay UCS-2 karlarını tamamen destekliyor (karakterler 0 through 65535) Strings'te. String verileri çeşitli dosya türlerine yazılırken,ERDDAP™2-bayt karlarını desteklemek için en iyisini yapar. Başka bir örnek ise .csv dosyalarıdır.ERDDAP™ISO-8859-1 karset ile yazar (1bay karset) Bu yüzdenERDDAP™Yukarıdaki herhangi bir karakter yazın #255 with the JSON-like 4.99u_hhhh_ syntax. See See See See[String data](/docs/server-admin/datasets#string).
    * IMPROVED: In.nctarafından yazılmış dosyalarERDDAP™Ancak, Strings olarak yorumlanmak için kömür değişkenleri niteliklere sahip olacak
         **\\_Encoding=ISO-8859-1**   
In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In.ncdosyaları okuERDDAP™Ancak, "\\_Encoding" ile araç değişkenleri, belirtilen karset ile Strings olarak yorumlanacaktır.
    * REMINDER:ERDDAP™destek desteği destek desteği **JSON-like backslash-encoding** Kar ve String değişkenlerinin kısıtlamaları belirttiğinizde özel karakterler. Bu nedenle, MyString= € 20ac'ın Euro sembolü için kod noktasının hexadecimal versiyonu olduğundan, veri satırlarını istediğiniz zaman &myString="u20ac" gibi bir şey isteyebilirsiniz. Web'deki çeşitli kaynaklar Unicode sembolleri, e.g için kod noktası numaraları gösterir.[ https://en.wikipedia.org/wiki/Unicode ](https://en.wikipedia.org/wiki/Unicode).
    * IMPROVED: Önce,ERDDAP™sunulan sınırlı destek için **uzun tamsayı** değişkenler. Şimdi Şimdi ŞimdiERDDAP™Tamamen uzunları içsel olarak destekler ve uzun verileri çeşitli dosya türlerine yazarken en iyisini yapar. . Bakın,[Uzun Belgeler Uzun Süreli Belgeler](/docs/server-admin/datasets#long). İrlanda Deniz Enstitüsü sayesinde, Craig Risien, Rich Signell, Christopher Wingard ve OOI.
    * YENİ: griddap vetabledap: **.nccsv** Ama bu bir şey yaparNetCDFgibi, ASCII, karşılaştırılabilir olan tüm metadata'yı da içeren bir CSV dosyası..ncDosya. Görün bakalım,[NCCSV Özellikler Özellikler Özellikler Özellikler Özellikler Özellikler Özellikler](/docs/user/nccsv-1.00). Steve Hankin sayesinde.
    * YENİ: **orderByClosestfiltre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre** Sonuçların nasıl sıralanacağını ve bir aralığın nasıl sıralanacağını belirtmenize izin verirsiniz (E.g., 2 saat) . Her bir grup içinde, sadece aralığın en yakın satırları tutulacaktır. Örneğin,orderByClosest (" " ""stationIDZaman, 2 saat”) TarafındanstationIDVe zaman, ama sadece her biri için satırları geri döndürürstationIDEn son neredeorderBysütun sütun sütun (Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman) 2 saat aralığına yakın. Bu, en yakın şeydirtabledapBir griddap isteğindeide değerlerini stride etmek. Bu seçenek herhangi bir şekilde belirtilebilirtabledapdataset's .html web sayfası, .graph web sayfası ve kendinizi üreten herhangi bir URL tarafından. İrlanda Deniz Enstitüsü ve Ocean Networks Kanada sayesinde.
    * YENİ: **orderByLimitfiltre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre filtre** Sonuçların nasıl sıralanacağını ve bir limit numarasının nasıl tanımlanacağını belirtmenize izin verin (e.g., 100) . Her bir grup içinde, sadece ilk ‘limit’ satırları tutulacaktır. Örneğin,orderByMax (" " ""stationID100") TarafındanstationIDAma sadece her biri için ilk 100 satır geri döndürürstationID. Bu, SQL'nin LIMIT maddesine benzer. Bu seçenek herhangi bir şekilde belirtilebilirtabledapdataset's .html web sayfası, .graph web sayfası ve kendinizi üreten herhangi bir URL tarafından. İrlanda Deniz Enstitüsü ve Ocean Networks Kanada sayesinde.
    * YENİ: İki yeni yanıt dosya türü, **.jsonlCSVve.jsonlKVP** Ağlanmış veri kümeleri, tabular veri setleri ve diğer birçok yer için kullanılabilir.ERDDAP  (e.g., datasets hakkında bilgi için talepler) . dosyalar JSON Lines dosyalarıdır ([ https://jsonlines.org/ ](https://jsonlines.org/)) Her çizginin ayrı bir JSON nesnesi vardır..jsonlCSVSadece bir CSV formatındaki değerlere sahiptir..jsonlKVPAnahtar vardır: Değer çiftleri. Her çizgi kendi başına duruyor. hatları daha büyük bir JSON serisinde veya nesnede kapalı değildir. Örneğin, bakınız[Bu örnek istek isteği](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst.jsonlKVP?longitude%2Clatitude%2Ctime%2Cstation%2Cwmo_platform_code%2CT_25%26time%3E=2015-05-23T12:00:00Z%26time%3C=2015-05-31T12:00:00Z). Damian Smyth, Rob Fuller, Adam Leadbetter ve İrlanda'nın Deniz Enstitüsü sayesinde.
    * YENİ: Tanımlanan yeni belge var[ **Özel Veri kümeleri nasıl ErişilirERDDAP™Tarafından scripts** ](/docs/user/AccessToPrivateDatasets). Lynn DeWitt sayesinde.
    * IMPROVED: En az ölçüde **OpenLayers** harita 2 dereceydi ve şimdi 4 veri pikseli. Rusty Holleman sayesinde.
    * IMPROVED: Bazı yaygın durumlarda, hangi talepleri içerir **Düzenli ifade** kısıtlama çok daha hızlı işlenecektir.
         
*    **Şeyler ŞeylerERDDAP™Yöneticilerin Bilme ve Yapması Gerekiyor:**   
     
    *    **Önceki İçerik** Bu yeni sürüme ilk kez başladığınız zaman, uzun bir zaman alacakERDDAP™Tüm veri kümelerini yüklemek için, çünkü kaynağın hepsini yeniden okumak gerekir (Ancak sadece ağlayan veri dosyaları için başlık) . Kayıtlara bakarsanız, bazı iç dosyaların "eski/endüslenmiş gelişmişVersion" dediğini görebilirsiniz - bu iyi -ERDDAP™İç dosyaların yeni versiyonlarını yapacaktır. Lütfen sabırlı olun.
    * ACTION:ERDDAP™Şimdi yeni kullanımı kullanın **java.time** sınıflar sınıf sınıf sınıf sınıf sınıf sınıf sınıf sınıf sınıfları (Ayrıca JSR 310 olarak da bilinir) Joda yerine String zamanlarını sayısal zamanlarda parse. Notlar:
        * If if if if if if if if if if if if if if if if if if if if if if if if if if if if ifERDDAP™Birden verilen bir veri kümesi için String zamanlarına sahiptir ve bu nedenle sadece NaN'in tüm zamanların en fazla veya her zaman dönüştürülür. (Eksik değerler eksik) Sorun neredeyse her zaman tarihle. Zaman biçimi, değişkenin "units" olarak belirttiğiniz anlamına gelir. Yeni sistem bazen biraz farklı bir tarihTime format dizesine ihtiyaç duyar.
        * Tarihteki sayısız ay ve günler 0-padded değil (E.g., "3/7/2016") Ancak formatın sadece tek bir M ve d'ye sahip olduğundan emin olun. (E.g., "M/d/yyyyyy", "MM/dd/yyyyyy" değil.) .
        * Daha düşük dosyaları kullanan herhangi bir kesik saniye spesifikasyonu değiştirin (E.g., .ss in in in the .yyyy-MM-dd"T'HHH:mm:s.s.) - başkente S's, (E.g.,yyyy-MM-dd'T'HH:mm:s.SSS) .
        *   ERDDAP™Artık dize tarihini desteklemiyor İki dijital yıl ile zaman biçimleri (yy) Bir yüzyılda (e.g., 1900 veya 2000) . İşletmeler, 1990'ların sonlarında bu sorunu çözmek için milyarlarca dolar harcadılar. Bilim adamları iki sayısal yıl kullanmamalıdır. Lütfen kaynak dosyasını düzelt (s) 4-digit yıllarına göre, o zaman yyyyyy'ı tarihte kullanın. Zaman formatı.
        * yyyyyy veya YYYYYYYY kullanabilirsiniz (hangisi hangisi hangisi hangisi hangisi hangisi hangisi hangisidir?ERDDAP™Uuuu) Olumsuz yıllar da dahil olmak üzere 4 dijital yıl, e.g., -4712 (4713 BC) . SeaDataNet, Thomas Gardner ve BODC sayesinde.
        * Lütfen almak için bir tarihTime formatında Z kullanmaya devam edinERDDAPBir zaman dengelemek için (e.g., Z, +0200, -08, -0800, -08:30) .
        *    **Kullandığınızdan emin olunJava1.8.0\\_21 veya daha yüksek.** 
        * Programcılar – Eğer yazarsanızJavaTakip eden programlarERDDAP™Kod, joda-time referansını kaldırmanız gerekir. Sınıf yol parametresinde kavanoz.
    * YENİ:ERDDAP"[ArchiveA Dataset aracı](/docs/server-admin/additional-information#archiveadataset)Şimdi yaratabilir[ **BagIt dosyaları** ](https://en.wikipedia.org/wiki/BagIt). NCEI bu formatta standartlaşabilir. Scott Cross ve John Relph sayesinde.
    * IMPROVED: Hatayı indirmek için bağlantılar. Savaşta SavaşERDDAP™web sayfaları şimdi nokta **GitHub** . (Halk bağlantıları, bu yüzden GitHub'a katılmak zorunda değilsiniz.) Bu çok daha hızlı indirme anlamına geliyor (12Mb /s karşı 1Mb /s) indirmelerle birkaç sorun. Damian Smyth sayesinde Rob Fuller, Adam Leadbetter, Conor Delaney ve İrlanda'nın Deniz Enstitüsü.
    * IMPROVED: The **Durum.html sayfası ve günlük Durum Raporu e-posta** Şimdi, istatistiki gösteren "Major LoadDatasets Time Series" bölümünü içerir.ERDDAP™Son 100 büyük yükDatasets için her büyük yükDatasets'in sonuna kadar. Sıkıntılı RAID sayesinde.
    * YENİ: yeni, isteğe bağlı (Ancak tavsiye edilen ancak önerilir) EDDTableFromCassandra datasets için parametre: [ ** &lt;BölümKeyCSV&gt; ** ] (/docs /server-admin/datasets#partitionkeycsv) . Ocean Networks Kanada sayesinde.
    * NEW: EDDTable FromAsciiFiles şimdi destekleniyor ** &lt;sütunSeparator&gt; ** parametre. Eğer null veya "", sınıf daha önce tahmin edecek, aksi takdirde ilk karakter dosyaları okurken sütun ayırıcı olarak kullanılacaktır. Sky Bristol ve Abigail Benson sayesinde.
    * Yeni: yeni veri set türü,[ **EDDTable FromNccsvFiles** ](/docs/server-admin/datasets#eddtablefromnccsvfiles), agreating tarafından bir veri kümesi yapabilir[NCCSV .csv dosyaları](/docs/user/nccsv-1.00). Steve Hankin sayesinde.
    * IMPROVED: **EDDTable FromErddap** Şimdi kullanımları kullanın.nccsvUzaktan bilgi almakERDDAPs ve yerel bu metadata bilgi arşivi için. Bu, kar ve uzun veri türleri için tam destek sağlar ve Unicode için (UCS-2) Karlar ve Stringler için karset. Rob Fuller ve İrlanda'nın Deniz Enstitüsü sayesinde.
    * IMPROVED: EDDTable FromErddap andEDDGridErddap'tan şimdi destek ** &lt;&gt; yönlendirme&lt;/ ** Hangi diyor kiERDDAP™Kullanıcıyı uzaktan yönlendirmek aslaERDDAP. Varsayılan gerçek. Bu uzaklarda faydalıdırERDDAP™Özel bir özeldirERDDAP. Damian Smyth, Rob Fuller ve İrlanda'nın Deniz Enstitüsü sayesinde.
    * IMPROVED:ERDDAP™Şimdi yakalama **İptal edilen kullanıcı istekleri** er. VeERDDAP™Şimdi daha hızlı kapanıyor çünkü düşük seviyeli iplikler daha hızlı kapatıyor. Sıkıntılı RAID sayesinde.
    *    **GenrateDatasets X ml:** 
        * YENİ: Yeni özel EDDType "ncdump" bir baskı[ncdump](https://linux.die.net/man/1/ncdump)\\-like printout of the header of an.ncDosya. Ayrıca belirtilen değişkenler için veri değerlerini yazdırabilirsiniz (veya herhangi bir veri değerlerini yazdırmak için "Hayır" girin) . Bu yararlıdır, çünkü ncdump olmadan bir dosyada ne olduğunu bilmek zordur ve böylece EDDType'ın GenrateDatasetsXml için belirtilmesi gerekir. Craig Risien, Rich Signell, Christopher Wingard ve OOI sayesinde.
        * YENİ: For SeaData Net veriler:
Uygun olduğunda, GenerateDatasets X ml şimdi uzak bir SPARQL sorgu kullanarak belirli bir semantik dönüşüm yapıyor: değişkenin kaynağı metadata bir sdn\\_parameter\\_urn, e.g., sdn\\_parameter\\_urn = "SDN:P01::PSLTZZ01", GenrateDatasets X ml, ilgili P02 özelliklerini, e.g., sdn\\_P02\\_urn = "SDN:P02:::PSAL". Bu özellikleri kullanan veri kümeleri varsa ve eğer bu özellikleriniz varsaERDDAP"&lt;categoryAttributes&gt; Kurulum.xml, sdn\\_parameter\\_urn ve sdn\\_P02\\_urn içerir, kullanıcılar kullanabilecekERDDAP™Kategori arama sistemi bu özelliklerin belirli değerleri ile veri kümelerini aramak için. BODC ve Alexandra Kokkinaki sayesinde.
        * IMPROVED: GenrateDatasets X ml şimdi birçok değişiklik değiştiriyorhttp://Metadata'daki referanslarhttps://Uygun olduğunda.
        * IMPROVED: GenrateDatasets X ml şimdi yaratıcı\\_type ve yayıncı\\_type tahmin etmeye çalışır.
        * IMPROVED: GenrateDatasets tarafından önerilen değişken veri türleri X ml şimdi biraz daha iyi olacak. Margaret O'Brien, LTER ve EML sayesinde.
        * IMPROVED: GenrateDatasets X ml, X ml'nin belirtilmesinde daha iyidir&lt;cdm\\_data\\_type&gt; ve ilgili, gerekli özellikleri (örneğin.g.,&lt;cdm\\_timese\\_variables&gt;), bu yüzden bu bilgiyi tedarik edebilirsiniz. Rich Signell sayesinde.
        * IMPROVED: GenrateDatasets X ml, EDDTable veri setleri için, öneri&lt;subsetVariables&gt; Şimdi çok daha muhafazakar. John Kerfoot sayesinde.
        * IMPROVED: Eğerdatasets.xmlBir veri kümesi için spekülasyonlarfeatureTypeAncak cdm\\_data\\_type değil, the thefeatureTypecdm\\_data\\_type olarak kullanılacaktır. Rich Signell sayesinde.
        * BUG FIX: üretmek Datasets X ml şimdi doğruyu öneriyor&lt;DataType&gt; veri değişkenleri içinscale\\_factor,add\\_offsetve / veya \\_Unsigned özellikler.
    * IMPROVED: Ne zamanERDDAP™Bir açılır.ncBu dosya **Daha kısa daha kısa** Bunun yerine olması gerekiyor (e.g., tamamen yer içine kopyalanmadı) ,ERDDAP™Şimdi dosyayı kötü muamele eder. Daha önce,ERDDAP™Dosyanın herhangi bir eksik parçası için eksik değerler geri döndü çünkü netcdf-java için varsayılan davranış budur.ERDDAP™Şimdi ucar kullanıyor.nc2.iosp.netcdf3.N3header.disallowFileTruncation = true; Sıkıntılı RAID ve Christian Ward-Garrison sayesinde.
    * IMPROVED: ISO 19115 yazarı şimdi kullanımı yapar **Yaratıcı** Eğer mevcutsa.
    * IMPROVED:ERDDAP™Şimdi, ek türlerini okuyabilen son netcdf-java v4.6.9 kullanır. **netcdf-4 dosyaları** . Craig Risien, Rich Signell, Christopher Wingard ve OOI sayesinde.
    * BUG FIX: Farklı kaynak dosyalarının belirli bir değişken için farklı veri türlerine sahip olup olmadığını sorundan kaçının. Roy Mendelssohn ve Eugene Burger sayesinde.
    * BUG FIX: **Zaman formatı dönüşümleri** Şimdi kötü zaman değerlerine karşı daha iyi korunuyor. NDBC sayesinde.
    * BUG FIX:EDDGridFromNcFiles Unpacked now handles time values with with **"Aylar o zamandan beri ..." ve "yıllar ..."** Doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru doğru (Ay veya yıl artarak, ham olarak e.g., 30 gün defalarca e.g.) . Soda3.3.1 sayesinde.
    * BUG FIX: sadece v1.74'te, **Abonelik abonelikleri** Gerekli bir eylem gerekli (E.g.,http://...) Ancak hangisi ve isteğe bağlı olmalıdır.
    * BUG FIX:EDDGridMergeIRFiles.lowGet SourceMetadata () Herhangi bir küresel özellik eklemedi. Şimdi öyle.
         

## Version 1.74{#version-174} 
 (2016-10-07-07) 

*    **Yeni Özellikler (kullanıcılar için) :**   
     
    * Şimdi, bir Datasets listesi (Tüm, veya bir aramadan) Bir web sayfasında görüntüleniyor, uzun başlıklar birden fazla çizgide gösteriliyor. Daha önce, uzun bir başlığın ortası "..." olarak değiştirildi. Margaret O'Brien, LTER ve EML sayesinde.
         
*    **Şeyler ŞeylerERDDAP™Yöneticilerin Bilme ve Yapması Gerekiyor:**   
     
    * TO DO: Linux bilgisayarlarda, Apache zamanout ayarlarını değiştirir, böylece zaman alıcı kullanıcı istekleri zaman kesintiye uğramaz (Sık sık "Proxy" veya "Bad Gateway" hatası olarak görünen şeyle) . Kök kullanıcı olarak:
        
        1. Apache'yi Değiştirinhttpd.conf file (Genellikle / etc /httpd/conf /) :
Mevcut değişikliği değiştir&lt;Timeout&gt; ayarı (veya dosyayı sonunda bir tane ekleyin) 3600 (saniye saniye saniye saniye saniye) Ancak varsayılan 60 veya 120 saniye yerine.
Mevcut değişikliği değiştir&lt;ProxyTimeout&gt; ayar ayar ayar ayarı ayar ayar ayar ayar ayarı ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayarı ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar ayar (veya dosyayı sonunda bir tane ekleyin) 3600 (saniye saniye saniye saniye saniye) Ancak varsayılan 60 veya 120 saniye yerine.
        2. Restart Apache: /usr /sbin /apachectl -k lütufkâr (Ama bazen farklı bir dizide) .
        
Thomas Oliver sayesinde.
         
    * YENİ:\\[Büyük Referans Yönetmeni /hard Flag directory
Bu bayrak rehberi gibi çalışır, ancak sertFlag versiyonu aynı zamanda önbellek veri kümesi bilgilerinin tamamını da silir. SertFlag kurmak için URL yok. Bu sadece bu dizide bir dosyayı koyarak kullanılabilir.
Sert zor zor zor zor zor Bayraklar, bir değişiklike neden olan bir şey yaptığınızda çok yararlıdırERDDAP™Kaynak verilerini okur ve yorumlar, örneğin, yeni bir sürüm yüklerkenERDDAP™Ya da belirli bir tür değişikliği bir veri kümesinin tanımına verdiğinizdedatasets.xml. See See See See[Bu belge](/docs/server-admin/additional-information#hard-flag). John Kerfoot ve tüm Argo grupları sayesinde.
         
    * YENİ: GenrateDatasets X ml şimdi bir EDDTableFromEML seçeneği var
Bu, bir Ecolojik Metadata Dilinde Bir Veriset Açıklamasını Okuyan Bir Dil (EML) Dosya, ilgili veri dosyasını indirin ve bir chunk üretirdatasets.xmlBu nedenle, veri setleri eklenebilirERDDAP. Ayrıca bir rehberdeki EML dosyalarının hepsi için aynı şeyi yapan bir EDDTable FromEMLBatch da var. Bu çok iyi çalışır çünkü EML veri kümesini tanımlamak ve KNB ve LTER mevcut gerçek verileri yapar.
EML artıERDDAP™Büyük bir kombinasyon olabilir, çünkü o zamandan beriERDDAP™Kullanıcılara KNB ve LTER verilerinin zenginliklerine daha doğrudan erişim sağlayabilir ve bu projelerin ABD hükümetiyle tanışmasına yardımcı olabilir.[Araştırma Sonuçlarına Kamu Erişimi (PARR) gereksinimlerini gerektirir](https://nosc.noaa.gov/EDMC/PD.DSP.php)Bir web hizmeti aracılığıyla mevcut verileri yaparak.
See See See See[Bu belge](/docs/server-admin/EDDTableFromEML). Margaret O'Brien, LTER ve EML sayesinde.
         
    * YENİ: GenrateDatasets X ml şimdiPort seçeneğinden bir EDDTable var
Hangi bir InPort XML dosyasında bir veri kümesi açıklamasını okur ve bir chunk oluşturmaya çalışırdatasets.xmlBu nedenle, veri setleri eklenebilirERDDAP. Bu nadiren XML'in hazır kullanımı için bir chunk oluştururdatasets.xmlAncak, bir insan tarafından düzenleme için iyi bir başlangıç noktası olan iyi bir kaba taslak oluşturacaktır.
Port'de kullanan insanlar veri setlerini belgelemek için harika olurduERDDAP™Mevcut gerçek verileri gerçekleştirmek içinERDDAP" web hizmetleri ve böylece ABD hükümetinin veNOAA"[Araştırma Sonuçlarına Kamu Erişimi (PARR) gereksinimlerini gerektirir](https://www.whitehouse.gov/blog/2013/02/22/expanding-public-access-results-federally-funded-research)Bir web hizmeti aracılığıyla mevcut verileri yaparak. Bu şu anda kullanılabilir bir çözüm. (erd.data at noaa.govYardım etmek mutludur.)   
See See See See[Bu belge](/docs/server-admin/datasets#eddtablefrominport). Evan Howell ve Melanie Abecassis sayesinde.
         
    * IMPROVED:ERDDAP™Şimdi netcdf-java 46.6 kullanır.
Daha önceki versiyonlarla, netcdf-java bazı doldurma değerleri okudu (Belki, sadece netcdf-4 dosyalarında) 0's olarak. Şimdi bunlardan bazılarını netcdf standart doldurma değeri olarak okur: -127 for bytes, -32767 for shorts, -2147483647 for ints.UnidataYeni davranışın doğru davranış olduğunu söylüyor. Bir veri kümesindeki bir değişken, 0’lar göstermek için kullandıkları bu değerlerden birini göstermeye başlarsa, ekebilirsiniz, e.g.,
```
        <att name="\\_FillValue" type="short">-32767</att>  
```
Değişkenin değişkenineaddAttributesSöylemek içinERDDAP™Bu değeri bir şekilde tedavi etmekmissing\\_value/\\_Fill Değer. Ancak, birçok durumda, istenen sonucu elde etmeyecek: 0's. Eğer öyleyse, dosyaları değiştirir düşününNCOveya dosyaları yeniden yaz. Şikayetler? Lütfen temasa geçinUnidata;
         
    * TO DO: New TopographyDepth palette
Yeni TopographyDepth paletini kullanmak için OceanDepth paletlerini kullanan tüm veri kümelerini değiştirmenizi teşvik ediyorum, bu da renklerle birlikte Topography gibi, bu yüzden derinlik değerleri için uygun olduğu için (Olumlu =down) Bunun yerine, yükseklik değerleri (Olumlu =up) . Bu palet için önerilen ayarlar şunlardır:
```
            <att name="colorBarMaximum" type="double">8000.0</att>
            <att name="colorBarMinimum" type="double">-8000.0</att>
            <att name="colorBarPalette">TopographyDepth</att> 
```

    * YENİ EDİN: Stringmissing\\_valueve / veya \\_FillValue
Bir String değişkeni bir tanımlarsamissing\\_valueve / veya \\_FillValue,ERDDAP™Şimdi bu değerleri verilerden çıkartacak ve boş bir dize ile değiştirecektir, bu nedenle eksik değerler boş dizeler olarak görünür, diğer veri kümeleri ile diğer veri kümeleri ile boş dizeler olarak görünür.ERDDAP. Margaret O'Brien, LTER ve EML sayesinde.
         
    * YENİ EDİN: Yerel Times için destek
Strings'ten kaynak verileri ile zaman damga değişkenleri artık bir "zaman bölgesi" ile belirtebilirtime\\_zone“Ona yol açan özelliklerERDDAP™Yerel-zaman-bölge kaynak zamanlarını dönüştürmek (Standart zamanda, Gün ışığında Bazı Zaman Tasarruf Zamanları) içineZuluZamanlar. Geçerli zaman alan isimlerinin listesi muhtemelen TZ sütununda liste ile aynıdır[Bu masa](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). Varsayılan "The default"Zulu". Ortak ABD zaman bölgeleri şunlardır: ABD/Hawaii, ABD/Alaska, ABD/Pacific, ABD/Mountain, ABD/Arizona, ABD/Central, ABD/Eastern. Zamanlayıcı kaynak verileri ile değişkenler için, "You can specify the "time\\_zone“İsviçre, ama değer “Zulu" veya "UTC". Margaret O'Brien, LTER ve EML sayesinde.
         
    * NEW FEATURE: EDDTable FromAsciiFiles şimdi yarı koloni destekli dosyaları destekliyor
Ve ayırıcıyı anlamak için daha akıllıdır. Margaret O'Brien, LTER ve EML sayesinde.
         
    * YENİ EDİN: Yüklemede önemli bir hata varsaDatasets (Büyük veya küçük, e.g., eksik veya geçersizdatasets.xmlBelge belgesi) ,ERDDAP™Şimdi bunu statüsünde gösterecektir.html, hemen aşağıda "N Datasets Failed To Load" olarak ERROR: işlem işleme sırasındadatasets.xml: Ayrıntılar için log.txt bakınız.
         
    * YENİ EDİN:ERDDAP™yetimler için görünüyor.
When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When WhenERDDAP™Büyük bir yük Datasets, şimdi yetim veri setleri için görünüyor (İçinde olan veri setleriERDDAP™Ama içeride değildatasets.xml) . Eğer bulunursa, statüde listelenirler.html, hemen aşağıda "N Datasets Failed To Load" ERROR: n Dynamic Datasets (veri kümeleriERDDAP™Ama içeride değildatasets.xml) =...
Eğer kaldırmak istiyorsanız (Unload) Bir yetimdenERDDAP™, eklemek zorundasınız
        &lt;dataset type="_anyValidType_"datasetID="_theDatasetID_" aktif="false" /&gt;
toklanmak içindatasets.xmlDataset bir sonraki büyük yükDatasets sırasında yüklenemez.
         
    * BUG FIX: Bir veri kümesi diğer birimlerle diğer birimlerle sayısal bir zamanlayıcı değişkeni olsaydı"seconds since 1970-01-01T00:00:00Z"Ve ile&lt;HerNMillis&gt; sistemini aktif bir şekilde güncellemek, zamantamp değişkeninin aralığı, veri kümesinin güncellendiği zaman yanlış ayarlanmıştı. John Kerfoot sayesinde.
         
    * BUG FIX: Eğer&lt;quickRestart&gt; Kurulumda doğruydu.xml ve bir EDDTable'den veri istediniz... Kullanılan dosyalar veri kümesi&lt;HerNMillis&gt;, veri setine ilk istek başarısız olur, ancak sonraki istekler başarılı olacaktır. Şimdi ilk istek başarısız olmayacaktır. John Kerfoot sayesinde.
         
    * BUG FIX: GenrateDatasetsXml.sh ve .bat komuta hattında &gt;9 parametre ile çalışmadı. Şimdi yaparlar. John Kerfoot sayesinde.
         
    * BUG FIX: The new EDDTable FromMultidimNcFiles sürekli olarak iplerden uzak durmadı. Şimdi öyle. Elbette bu etkilenen ARGO dosyaları. Kevin O'Brien ve Roland Schweitzer sayesinde.
         
    * BUG FIX: Tüm uzaktan erişimDAPhizmetler artık daha modern kod tarafından başlatılıyor. Bu, bazı EDDTable'eErddap veri setlerine eriştiğinde "bağlantı kapalı" hatasını düzeltiyor. Kevin O'Brien sayesinde.
         
    * BUG FIX: KullanımıorderBy... () Ve ayrı ayrı ve () Şimdi son değişikliklerden önce oldukları şekilde geri döndü: Verilen bir istek birden çok şeye sahip olabilirorderBy... () ve/veya ayrı bir () Filtre;ERDDAP™Onlara belirtilen sırayla idare edecek. David Karuga sayesinde.
         
    * BUG FIX: Eğer veri kümesi EDDTableFromDatabase ve bir sorgu vardır[Kaynak CanOrderBy](/docs/server-admin/datasets#sourcecanorderby)ve/veya[KaynakCanDoDistinct](/docs/server-admin/datasets#sourcecandodistinct)Daha sonra veritabanı olabilir (ayarlara bağlı olarakdatasets.xml) Kısmen veya tamamen idare **Sadece ilk önce**  orderBy.. () veya ayrı veya () . David Karuga sayesinde.
         
    * BUG FIX: Son ekstra yüzde-encoding bazı sorgularla sorunlara neden oldu.ncCF dosyaları, e.g., "HTTP Durum 500 - Sorgu hatası: değişken = istasyon sonuçlar değişken listesinde iki kez listelenir.” Kevin O'Brien sayesinde.
         
    * BUG FIX: EDDTable FromFiles, sütunlardan biri gerçek bir kar sütunu olduğunda bir veri setini yeniden yüklemişti. Roland Schweitzer sayesinde.
         
    * BUG FIX:EDDGridFromNcFiles Unpacked şimdi de dönüşüyormissing\\_valueve \\_FillValue standart değerlere, böylece farklı değerlere sahip dosyalar toplanabilir. Bu değişiklik nedeniyle, bu yeni sürümü yüklemekten sonraERDDAP™Lütfen bir set[Sert zor zor zor zor zor Bayrak Bayrak](/docs/server-admin/additional-information#hard-flag)Her biri içinEDDGridFromNcFiles Unpacked dataset in your yourERDDAP.
         
    * IMPROVED: EDDTable FromNcCFFiles şimdi birden fazla örneği olan dosyaları idare edebilir. Verilen bir veri kümesi sadece örneklerden birini kullanan değişkenleri kullanmalıdır. Ajay Krishnan sayesinde.
         
    * IMPROVED: EDDTable From...Files,&lt;Kaynak İsimleri Tarafından Şimdi komünalize izin veriyor (önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen) Ya da uzay değişken kaynak isimlerinin ayrı listeleri. Her iki durumda da, bireysel değişken isimler çift alıntılarla çevrili olabilir, e.g., adın bir iç alanı varsa.

## Version 1.72{#version-172} 
 (2016-05-12) 

*    **Yeni Özellikler (kullanıcılar için) :** Hiçbir şey.
     
*    **Şeyler ŞeylerERDDAP™Yöneticilerin Bilme ve Yapması Gerekiyor:** 
    * NEW EDDTable FromMultidimNcFiles[EDDTable FromMultidimNcFiles](/docs/server-admin/datasets#eddtablefrommultidimncfiles)EDDTable FromNcFiles için yeni bir alternatif. Paylaşılan boyutlarda çeşitli değişkenlerle dosya grupları ile uğraşmak için tasarlanmıştır, e.g., var1\\[Birbiri\\]\\[b\\]Var2\\[Birbiri\\]Var3\\[b\\], scalarVar. Argo Project sayesinde, Aurélie Briand ve Roland Schweitzer.
    * BUG FIX:ERDDAP™  (FileVisitorDNLS ve FileVistorSubdir sınıfları aracılığıyla) Şimdi Linux'ta sembolik bağlantıları takip edin.ERDDAP™Hala .lnk'ın Windows'ta takip etmiyor.
    * BUG FIX of bug 1.70'de tanıtıldı: farklı +orderByBir istekte birlikte izin verilmezdi. Şimdi tekrarlar. Onlar karşılıklı olarak özel/reddant değiller. David Karuga sayesinde.
    * CHANGE todatasets.xmlIP adreslerinin kara listesi:
IP v4 adresleri görünür görünüyorERDDAP™4 periyodik hex sayıları olarak.
IP v6 adreslerinin 8 kolonyalı hex numarası olarak göründüğünü düşünüyorum.
Bu yüzdenERDDAP™Şimdi bu listedeki IP adreslerindeki kolonları destekliyor ve:\\* listenin sonunda bir dizi adres engellemek için.
    * IMPROVED:ERDDAP™Şimdi NetcdfFileYazr'ı yazmak için kullanır.ncNoted NetcdfFileYazılabilir dosyaları yerine. Elde edilen dosyalar için ayırt edilebilir bir değişiklik olmamalıdır. Bu büyük yapma olasılığını açıyor.ncKullanan dosyaları.nc3 64bit uzantıları. Bunu istiyorsanız, lütfen bir istek gönderinerd.data at noaa.gov.
    * IMPROVED: Uzak web sitelerine bağlantıların çoğu günceldi. Şimdi onlar güncel ve kullanımhttps:Bunun yerine,http: Mümkün olduğunda.
    * Birçok küçük değişiklik.

## Version 1.70{#version-170} 
 (2016-04-15) 

*    **Yeni Özellikler (kullanıcılar için) :** Hiçbir şey.
     
*    **Şeyler ŞeylerERDDAP™Yöneticilerin Bilme ve Yapması Gerekiyor:** Aşağıda, kurulum.xml dosyasında belge için birkaç önerilen değişiklik var.
Lütfen bu değişiklikleri şimdi yapın.
30 dakikalık bir çalışma şimdi gelecekte sizi saatlerce karışıklık kurtarabilir.
    * Bug düzeltme: Sorun şu ki, bir uzaktan yönlendirilen isteklerERDDAPBaşarısız bir karakterle başarısız oldu ‘|“ hata mesajı. Bu sadece Tomcat'ın son versiyonlarıyla gerçekleşti. Rusty Holleman, Conor Delaney ve Roy Mendelssohn sayesinde.
    * Bug düzeltme:ERDDAP™Şimdi netcdf-javava'nın güncel bir versiyonunu kullanır (Bu uzun bir hikaye) Bu, NcML MantıksalReduce ile sorunu beklenen NcML MantıksalReduce için güncel bir destek içeriyor. Metadata'ya birkaç küçük değişiklik olabilir, ki buERDDAP™Netcdf-java aracılığıyla okur.nc,.hdf, .grib ve .bufr dosyaları. Favio Medrano sayesinde.
    * Yeni The new[EDDTableAggregateRows](/docs/server-admin/datasets#eddtableaggregaterows)Aynı birimleri kullanarak aynı veri değişkenlerine sahip olan iki veya daha fazla EDDTable veri setinden birleştirilmiş bir EDDTable veri kümesi yapmanıza izin verir. Kevin O'Brien sayesinde.
    * EDDTableFromDatabase için yeni seçenekler ([Kaynak CanOrderBy](/docs/server-admin/datasets#sourcecanorderby)ve[KaynakCanDoDistinct](/docs/server-admin/datasets#sourcecandodistinct)) belirtmenize izin verinERDDAP™, veritabanı, ya da her ikisi, ayrı veorderBy  (Ve tüm varyantlar) kısıtlamalar. David Karuga sayesinde.
    * Artık yeni aracılığıyla halka sunulan özel bir veri kümesinin grafikler ve metadata yapabilirsiniz [&lt;Grafikler AccessibleTo&gt;public&lt;/graflar AccessibleTo&gt; (/docs /server-admin/datasets#graphsaccessibleto) etiket. Emanuele Lombardi sayesinde.
    * Şimdi, bir dize GenerateDatasets'a geçtiyse X ml veya DasDds çift alıntılarla çevrilidir, alıntılanmamış (Sanki bir JSON dizesi) . John Kerfoot ve Melanie Abecassis sayesinde.
    * GenrateDatasets X ml şimdi varsayılan ve boş bir dize almak için "default" desteklemektedir. (Onlarla veya alıntı yapmadan çalışırlar) . Bu, boş dizeleri geçmekle ilgili bazı problemleri çözer.
    * Şimdi, GenrateDatasets X ml, herkes içinEDDGridFromFiles and EDDTableFiles datasets, eğer örnek FileName you specify is "" (Boş dize) Ancak, dizin + regex + recursive=gerçekten son eşleşen dosyaName kullanacaktır.
    * Güncelleme: Linux bilgisayarlardaki GenerateDatasetsX ml ve DasDds'ın sonuçlarını görüntülemek için kullanılan ekranInBrowser kodu, güncel değildi ve Netscape hakkında garip bir mesaj verdi. Şimdi, bu modern bir Linux aracı kullanır: xdg-open. Melanie Abecassis sayesinde.
    * The The The The The The The TheallDatasetsveri seti şimdi bir tane var"files"sütun, hangi /files bağlantı URL'sini gösterir (Eğer bir tane varsa) Dataset için.
    * Genel güvenliğini artırınERDDAP™Tomcat rehberi ile ilişkili izinleri değiştirerek ve büyükParent müdürlüğü:
         (Aşağıdaki gerçek komutlar Linux için. Diğer OS'nin için, analog değişiklikler yapın.) 
        * Tomcat, kullanıcı adınız veya tomcat içeren küçük bir grubun adı ve Tomcat / Tomcat / tüm yöneticileriERDDAPE.g.,
chgrp -R _yourUserName_ apache-tomcat-_8.0.23_
chgrp -R _your UserName bigParent Yönetmeny_
        * Change permissions so that tomcat and the group have read, write, execute privileges, e.g.
chmod -R ug+rwx apache-tomcat-_8.0.23_
chmod -R ug+rwx _bigParent Yönetmeny_
        * "Diğer" kullanıcı izinlerini okumak, yazmak veya uygulamak için çıkarın:
chmod -R o-rwx apache-tomcat-_8.0.23_
chmod -R o-rwx _bigParent Yönetmeny_
Bu önemlidir, çünkü diğer kullanıcıların muhtemelen hassas bilgileri okumaktan alıkoymasını engellerERDDAP™dosyaları, log dosyaları ve özel veri setleri hakkında bilgi sahibi dosyalar.
    * Kimlik doğrulama/login sistemi geri alındı. Thomas Gardner sayesinde, Emanuele Lombardi ve ABD hükümeti yeni[HTTPS-Only Standard](https://home.dotgov.gov/management/preloading/dotgovhttps/).
        * Kimlik doğrulama=openid seçeneği kaldırıldı. Bu son zamanlardaydı.
        * Yeni, önerilen,[doğrulama=google](/docs/server-admin/additional-information#google)seçeneği kullanır Google Sign-InIn (OAuth 2.0 tabanlı) Bir Google e-posta hesabı olan herkese izin vermek (Ayrıca dahil de dahil olmak üzere de dahil de dahil de dahil de dahil de dahil olmak üzere de dahil de dahil de dahil de dahil de dahil de dahil de dahil de dahil de dahil de dahil olmak üzere de dahil de dahil de dahil de dahil de dahil de dahil de dahil de dahil olmak üzere de dahil de dahil de dahil de dahil de dahil de dahil de dahil de dahil de dahil de dahil de dahil Google, hesapları yönetilen@noaa.gov) Giriş yapmak için.
        * Yeni,[Kimlik doğrulama = e-posta](/docs/server-admin/additional-information#email)seçenek kimlik doğrulama için geri döndü =google. Kullanıcılarına bir acıkmasına izin verir&lt;kullanıcı&gt; etiketidatasets.xmlOnlara özel bir bağlantı ile bir e-posta göndererek giriş yapın.
        * Kurulumunuzda.xml, lütfen açıklamayı değiştirin&lt;&gt;
```
            <!-- If you want to restrict access to some datasets, 
            you need to specify the method used for logging on (authentication).
            See the info at 
            https://erddap.github.io/setup.html#security
            Currently, the options are: "" (logins not supported, the default), 
            "custom", "email", and "google" (recommended).  
            \\[No longer supported: "basic", "openid"\\]
            -->
```

        * Kurulumunuzda.xml, lütfen bu doğruyu aşağıda ekleyin&lt;&gt; etiket
```
            <!-- If authentication=google, you must supply your Google Client ID. 
            See
            https://developers.google.com/identity/sign-in/web/devconsole-project
            When setting this up, for Authorized JavaScript origins, 
            for testing on your computer, use the domain "localhost" 
            (e.g., origin=https://localhost:8443), 
            not "127.0.0.1" (because Google Sign-In doesn't work with anything 
            at that domain).
            This will be a string of about 75 characters, probably starting with
            several digits and ending with .apps.googleusercontent.com .
            -->
            <googleClientID></googleClientID>
```

        * Şimdi, giriş olmayan kullanıcılar kullanabilirhttpveyahttpsURL'ler (eğer kurduysanız&lt;BaseHtttpsUrl&gt; Kurulumunuzda.xml). ABD hükümeti tarafından yeni[HTTPS-Only Standard](https://https.cio.gov/).
        * Şimdi, tüm kullanıcıları kullanmak için teşvik edebilirsinizhttps  (Değil değilhttp) Kur'an hakkı için&lt;BaseUrl&gt; bir an içinhttpsURL. Kullanıcıları sadece kullanmak için zorlamakhttpsAyrıca Apache/Tomcat kurulumunuz için değişiklikleri yapmamanız gerekirhttpsErişim. ABD hükümeti tarafından yeni[HTTPS-Only Standard](https://https.cio.gov/).
            
Kurulumunuzda.xml, lütfen açıklamayı değiştirin&lt;BaseUrl&gt; Olmak
```
            <!-- baseUrl is the start of the public URL, to which "/erddap" 
            is appended. For example:
            For running/testing on your personal computer:
              <baseUrl>http://localhost:8080</baseUrl>     
              (127.0.0.1 doesn't work with authentication=google).
            If you want to encourage all users to use https (not http), 
              make the baseUrl the same as the baseHttpsUrl (see below).
            For ERD releases, we used to use
              <baseUrl>http://coastwatch.pfeg.noaa.gov</baseUrl>    
            For ERD releases, we now use
              <baseUrl>https://coastwatch.pfeg.noaa.gov</baseUrl>    
            -->
```

        * Seçenekler&lt;passwordEncoding&gt; değişti. Kurulumunuzda.xml, lütfen açıklamayı değiştirin&lt;passwordEncoding&gt;
```
            <!-- For "custom" authentication, this specifies how you have 
            stored passwords in the roles tags in datasets.xml.
            If you aren't storing any passwords, this is irrelevant.
            The options (in order of increasing security) are: 
            "MD5", "UEPMD5" (MD5(UserName:ERDDAP:Password)), 
            "SHA256", "UEPSHA256" (SHA256(UserName:ERDDAP:Password), 
            the default).
            You should only use "MD5" or "SHA256" if you need to match 
            values stored that way in an external password database.
            See the info at 
            https://erddap.github.io/setup.html#security
            --> 
```

        * Kurulumunuzda.xml, lütfen açıklamayı değiştirin&lt;BaseHtttpsUrl&gt; Olmak
```
            <!-- This is a variant of <baseUrl> which is used when 
            authentication is active and the user is logged in.
            In general, you take the <baseUrl>, change "http" to "https", 
            and change/add ":8443". This must begin with "https://".
            If you make a proxy so that ":8443" isn't needed, 
            then don't use ":8443" here.
            This is relevant even if <authentication> is "".
            See the instructions at 
            https://erddap.github.io/setup.html#security
            For example:
            For running/testing on your personal computer:
              <baseHttpsUrl>https://localhost:8443</baseHttpsUrl>                  
            For releases at ERD, we use:
              <baseHttpsUrl>https://coastwatch.pfeg.noaa.gov</baseHttpsUrl>  
            If you want to encourage all users to use https (not http), 
              make the baseUrl (see above) the same as the baseHttpsUrl.
            --> 
```

        * Şimdi, belirliDatasets=Real in installation.xml, daha az bilgi, bir kullanıcının erişime sahip olmadığı veri setleri hakkında gösterilecek.
    * Şimdi, özellikle başlangıçta sizin için ayarlandığındaERDDAPŞimdi söyleyebilirsinERDDAP™Uzaklara abone olmaya çalışmayınERDDAP™datasets. Filipe Rocha Freire sayesinde.
Kurulumunuzda.xml, hemen önce&lt;fontFamily&gt;, lütfen ekleyin
```
        <!-- Normally, if you have a EDDGridFromErddap or EDDTableFromErddap 
        dataset in your datasets.xml, it will try to subscribe to the remote 
        ERDDAP™ dataset so that the local dataset is kept perfectly up-to-date.
        If this ERDDAP™ is not publicly accessible (http://localhost), or its
        IP address will change soon, or you have some other reason, 
        you can tell this ERDDAP™ to not try to subscribe to the remote 
        ERDDAP™ datasets by setting this to false. (default=true) 
        This is the overall setting for this ERDDAP. It can be overridden by
        the same tag (with a different value) in the datasets.xml chunk for 
        a given EDD...FromErddap dataset. 
        For each fromErddap dataset that doesn't subscribe to the remote 
        ERDDAP™ dataset, you should set <reloadEveryNMinutes> to a smaller 
        number so that the local dataset stays reasonably up-to-date. -->
        <subscribeToRemoteErddapDataset>true</subscribeToRemoteErddapDataset>
```

    * Kurulumunuzda.xml, yukarıdaki talimatlarda&lt;E-postaAddress&gt;, lütfen ekleyin:
Mümkünse, bunu güvenli bir bağlantı kurmak için ayarlayın (SSL / TLS) e-posta sunucusuna.
Kurulumunuz e-posta sunucusuna güvenli bir bağlantı kullanmıyorsa, lütfen bunu yapmak için değişiklikleri yapın.
    * Sizin içindatasets.xmlLütfen bu çizgiyi açıklamaya ekleyin&lt;abonelikEmailBlacklist&gt; Sizindatasets.xml:
Adı kullanabilirsiniz "\\*"Bütün bir alan, e.g.,\\*@system.com.
    * v1.66'daki giriş sistemine göre, giriş dosyası asla güncel değildir. Kayıt dosyasına yazılması için bekleyen mesajların veya kısımları vardır. Şimdi, bunu güncelleyebilirsiniz (Bir an için) Görmek içinERDDAP's durumu web sayfası at http://_your.domain.org_/erddap/status.html .
    * HashDigest...
    * Küçük bir değişiklik (String2.canonical) Bu, işleri hızlı bir şekilde hareket etmeye yardımcı olmalı,ERDDAP™Çok meşgul ve çok sayıda veri setleriyle daha iyi bir anlaşma.
    * Güçlü bir şekilde Önerilen: kullanmayı bırak&lt;TurnToPublic SourceUrl&gt; in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in indatasets.xmlBir veri kümesinde bir IP numarasını dönüştürmek&lt;sourceUrl&gt; &gt; &gt; &gt; (E.g., http://192.168.#.#/ ) Bir alan adı (E.g.,http:my.domain.org/) . Şu andan itibaren, yeni abonelikler için http://localhost , http://127.0.0.1 Ve http://192.168.#.# URLS güvenlik nedenleri için izin verilmez. Lütfen her zaman halka açık alan adı kullanın&lt;sourceUrl&gt; etiket (DNS sorunları nedeniyle gerekli olsaydı) , kullanabilirsin[/ v /hosts table on your server](https://linux.die.net/man/5/hosts)Yerel alan isimlerini bir DNS sunucusu kullanmadan IP numaralarına dönüştürmekle sorunu çözmek. Belirli bir alan adı kullanarak doğru bir şekilde çözülebilirseniz test edebilirsiniz
ping _some.domain.name_
    * Datasets.xml, uzak veri setleri için (E.g., bir THREDDS sunucusundan) , otomatik olarak üretilendatasetIDs çoğu domain için değişmemektedir. Birkaç alan için, ilk bölüm (i.e., isim) Otomatik olarak üretilendatasetIDBiraz farklı olacak. Muhtemelen, bir parçası olan isimler şimdi iki parçaya sahip olmak daha olasıdır. Örneğin, datasets from http://oos.soest.hawaii.edu Daha önce daha önce yol açtıdatasetIDhawaii\\_ ile başlayan s, ama şimdi yola çıkıyordatasetIDhawaii\\_soest\\_ ile başlayan s. Eğer bu sizin için sorunlara neden olursa, lütfen e-posta ver. Bir iş çevresinde olabilir.
    * Cassandra sürücüsü, Cassandra-vida-core-3.0.0.jar için güncellendi ve bu nedenle Cassandra v3. EDDTableFromCassandra Cassandra Cassandra'da yeni özelliklerden faydalanmıyor v3. Cassandra'daki indeksler artık daha karmaşık olabilir, ancakERDDAP™Yine de Cassandra v2 indeks modeli kullanır, ki bu bir endeksli sütunun doğrudan queried olabileceğini varsayar.'='kısıtlamalar. GenrateDatasets X ml EDDTable FromCassandra artık indekslerle sütunları tespit etmiyor; eğer bir indeks basittirse, bunu belirtmelisiniz.datasets.xmlel ile. Daha karmaşık indeksler veya diğer yeni özellikler için desteğe ihtiyacınız varsa, lütfen e-postaerd.data at noaa.gov.
&#33;&#33;&#33; Cassandra 2.x kullanıyorsanız lütfen kullanmaya devam edinERDDAP™v1.68 Cassandra 3.x kullanmaya yükseltinceye kadar.
    * Jars ve Sınıfpath – Neredeyse tüm dahil edilmiş üçüncü taraf .jar dosyaları en son versiyonlarına güncellendi.
        * slf4j.jar /lib ve sınıfpath eklendi.
        * joid. jar and tsik. jar /lib ve sınıfpath kaldırıldı.
        * Sınıflar hakkında hata mesajları alırsanız, derlediğiniz veya çalıştırdığınızda bulunamadınızERDDAP™Ya da aletlerinden biri, komut satırınızın sınıfpath'sını karşılaştırmakERDDAP"[Mevcut sınıfpath](/docs/contributing/programmer-guide#development-environment)Hangi .jars'in sınıf sempatinizden eksik olduğunu anlamak için.

## Version 1.68{#version-168} 
 (2016-02-08) 

*    **Yeni Özellikler (kullanıcılar için) :** Hiçbir şey.
     
*    **Şeyler ŞeylerERDDAP™Yöneticilerin Bilme ve Yapması Gerekiyor:** 
    *   [EDDGridFromFiles Aggregation via File Names or Global Metadata](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata)–
Tüm varyasyonlarıEDDGridFiles şimdi yeni bir sol boyutu ekleyerek bir dizi dosyayı toplayabilir, genellikle zaman, her dosya adından veya her dosyada bulunan global bir özelliğin değerine dayanarak.
    * IMPROVED: Daha önce oluşturmak istediğinizi önerdikEDDGridErddap veri setinizdedatasets.xmlBu referans ve jplMU'yu yeniden gözlemlediRSST dataset in our ourERDDAP. Artık bu veri kümesinin yeni bir versiyonu olduğundan, bu veri seti şimdi deprecated. Yani bu veri kümesine sahipsenizERDDAP™Lütfen bu yeni veri setini ekleyin
```
        <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">  
          <!-- Multi-scale Ultra-high Resolution (MUR) SST analysis fv04.1, Global, 0.011 Degree, Daily -->  
          <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>  
        </dataset>  
```
Eski jplMU kaldırmak istiyorsanızRSST dataset from your your your yourERDDAP™  (Bu senin seçiminiz) Aktif ayarını "gerçek"den "false" değiştirmek.
    * Bug düzeltme: Lütfen kurulumunuzda belirttiğiniz büyükParent yöneticisini kontrol edin.xml. If you didn't put a slash at the end of the end of the end of the&lt;BüyükParent Yöneticiy&gt; adı, sonraERDDAP™Sözcükler oluşturmak yerine doğrudan belirttiğiniz isime göre çeşitli yönetmenler yaratacaktır. 1.68 sürümü ile başlayın,ERDDAP™Bir tane belirtmediyseniz dizin adının sonuna bir çek ekler. Yani daha önce sonunda bir çek belirtmediyseniz, o zaman kurulum yaptığınızdaERDDAP™v1.68 Bu yönetmenleri adlandırmanız ve adlandırmanız gerekir **After after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after after** Eskileri kapattınERDDAP™ve **Daha önce daha önce** Yeni yeni başlıyorsunuzERDDAP. Örneğin, yanlışlıkla / ev / ev/erddapBPD olarak büyükParentmi belirtseniz (Hiçbir iz bırakma) veERDDAP™Yanlış bir şekilde yönetmenleri yarattı
/home/erddapBPDcache
/home/erddapBPDcopy
/home/erddapBPDdataset
/home/erddapBPDflag
/home/erddapBPDlogs
/home/erddapBPDlucene
Ve /home/erddapBPDsubscriptionsV1.txt,
Sonra onları hareket etmeli ve adlandırmanız gerekir
/home/erddapBPD/cache
/home/erddapBPD/copy
/home/erddapBPD/dataset
/home/erddapBPD /flag
/home/erddapBPD /loglar
/home/erddapBPD/lucene
ve /home/erddapBPD /subscriptionsV1.txt
    * Bug düzeltme: Orada böcekler vardıEDDGridLonPM180 yılındaERDDAP™v1.66, çocuk veri kümesi bir an olduğunda meydana geldiEDDGridErddap'tan.
    * Bug düzeltme: Orada bir boğa vardıEDDGridFromFiles and EDDTable FromFiles in FromERDDAP™v1.66'ya sebep oldu&lt;HerNMillis&gt;, bir yeniden başlatmadan sonra veri setini görmezden gelmek için güncellemek.
    * Bug Fix/New Feature: Bir çocuk veri kümesi içerideEDDGridAggregateExistingDimension,EDDGridKopya,EDDGridFromEDDTable,EDDGridLonPM180,EDDGridSideBySide, EDDTableCopy veya EDDTable FromEDDGridBir ...Erddap veri setinden, o ebeveyn veri setine şimdi altta abone oluyorERDDAP™dataset. Eğer altERDDAP™Dataset aynı zamandaERDDAP™Ancak abonelik ve geçerliliği doğrudan yapılır; abonelikleri doğrulamanızı istediğiniz bir e-posta alacaksınız. Aksi takdirde, abonelik sistemi sizin içinERDDAP™kapalı, set the set the&lt;HerNMinutes&gt; ebeveyn veri setini küçük bir sayıya ayarlayın (60?) Bu yüzden güncel kalır.
    * Bug Fix/New Feature: Bir çocuk veri kümesi içerideEDDGridAggregateExistingDimension,EDDGridKopya,EDDGridFromEDDTable,EDDGridLonPM180,EDDGridSideBySide, EDDTableCopy veya EDDTable FromEDDGridAktif="false", o çocuk veri seti şimdi atılır.

## Version 1.66{#version-166} 
 (2016-01-19-19) 

*    **Yeni Özellikler (kullanıcılar için) :** 
    * Graphs (haritalar değil haritalar) Şimdi axes üzerinde değerler inebilir. Bir Make A Graph web sayfasını kullanırken bunu elde etmek için, yeni Y Axis : yükselen ayar ayarı (varsayılan varsayılan) İnmek için. Ya da, bir grafik talep eden bir URL'de, yeni Seçmeli 3rd 'ı kullanın.|'Para için parametre[&.x Range and/or &. yRange anahtarları](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands)Ama bu hiçbir şey olamaz (varsayılan varsayılan) Doğru, ya da değerleri yükseltmek için ya da yanlış ya da f kullanmak. Gerçek doğru|Sahte değerler hassas durumda. Chris Fullilove sayesinde John Kerfoot, Luke Campbell ve Cara Wilson.
    * Kullanıcılar artık grafikler için arka rengi belirtebilir ve bir &.bgRenk=0x__ AARRGGBB_ grafiği talep eden URL'ye geçer. .bg Color in the Graphics Commands section of the Graphics[network](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands)ve[tabledap](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#GraphicsCommands)Belgeler. John Kerfoot ve Luke Campbell sayesinde.
    * Prolar veri setleri için, kısıtlamalar şimdi minna işaret edebilir (_someVariableName_) veya max (_someVariableName_) . See See See See[min () ve max () ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#min). John Kerfoot sayesinde.
    * Tellar veri setleri için, bu kullanım zaman kısıtlamaları[Şimdi şimdi şimdi şimdi](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now)Şimdi milisaniye veya milis zaman birimleri belirtebilir.
    * Bir tabu veri kümesinin görüntüsü için bir istek şimdi bir harita yapar (Bir grafik değil) x ve y değişkenleri uzun ve benzeri değişkenler ise değişkenler (uyumlu birimler) . Rich Signell sayesinde.
    * Bug düzeltme: Zaman eksenli etiketler ve keneler bazen birden fazla grafik talep ettiğinde garip düzensizlikler vardı (e.g., bir web sayfasında) . Sorun SGT grafik kütüphanesinde bir boğaydı,ERDDAP™kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım (Bir değişken "statik" idi, bu olmamalıdır) . Bradford Butman sayesinde.
         
*    **Şeyler ŞeylerERDDAP™Yöneticilerin Bilme ve Yapması Gerekiyor:** 
    * E-posta parolanızı kurulum gibi basit bir metin dosyasında koymak için bir güvenlik riskidir.xml. Bu sorunu azaltmak için, size şiddetle tavsiye ediyoruz:
        1. Sadece bir e-posta hesabı kurmak içinERDDAP“Kullanım, e.g., erddap@yourInstitution.org . Bu da başka faydaları vardır; özellikle de birden fazlaERDDAP™Yönetici o zaman bu e-posta hesabına erişebilir.
        2. Kurulum izni yapın.xml dosyası rw (read+ write) Tomcat ve çalıştıracak kullanıcı içinERDDAP™  (kullanıcı=tomcat?) Ve izin yok (Okunma veya yazma) Grup ve diğer kullanıcılar için. Filipe Rocha Freire sayesinde.
    * Yeni The new[ArchiveADataset](/docs/server-admin/additional-information#archiveadataset)Bir araç basitleştirir.tar.gzBir alt kümesi ile arşiv, arşiv için arşiv için uygun olan bir formatta (Özellikle, özellikle,NOAA") . Bu birçok kişi için yararlı olmalıdırERDDAP™Birçok durumda yöneticiler, ancak özellikle gruplar içinNOAA.
    * Yeni veri kümesi tipi[EDDGridFromNcFilesUnpacked](/docs/server-admin/datasets#eddgridfromncfilesunpacked)Bir değişkendirEDDGridFromNcFiles. Fark, bu sınıfın her veri dosyasını daha önce paketsiz olmasıdırEDDGridFiles dosyalarına bakar:
        
        * Kullandığı paketler paketlenmiş değişkenlerscale\\_factorve/veyaadd\\_offset.
        * \\_Unsigned = gerçek özellikleri daha büyük bir tamsayı veri türüne sahip olan tam değişkenleri teşvik eder, böylece değerler imzalanmamış değerler olarak görünür. Örneğin, bir \\_Unsigned = true byte (8 bit) değişken, imzalanmış kısa bir süreye dönüşür (16 bit) değişken.
        * \\_FillValue vemissing\\_valueNaN'in değerleri (veya MAX\\_VALUE tam veri türleri için) .
        
Bu sınıfın büyük avantajı, farklı değerlerle uğraşmak için bir yol sağladığıdırscale\\_factor,add\\_offset\\_FillValue veyamissing\\_valueBir koleksiyonda farklı dosyalarda. Aksi takdirde, bir araç kullanmak zorunda kalacaksınız[NcML](/docs/server-admin/datasets#ncml-files)veya[NCO](/docs/server-admin/datasets#netcdf-operators-nco)Her dosyayı farklılıkları kaldırmak için değiştirmek için, böylece dosyalar tarafından ele alınabilirEDDGridFromNcFiles. Bu sınıf düzgün çalışmak için, dosyalar ilgili özellikler için CF standartlarını takip etmelidir. Philippe Makowski sayesinde.
    * Yeni veri kümesi tipi[EDDGridLonPM180](/docs/server-admin/datasets#eddgridlonpm180)Veri kümelerini 180'den daha büyük olan bazı uzunlık değerlere sahip değiştirmenize izin verir (e.g., the range 0 to 360) aralıktaki uzunlık değerlere sahip veri setlerine -180 ila 180 (Longitude Plus veya Minus 180, bu nedenle adı) . Veri setlerini aralıkta uzunlık değerlerle sunmak için büyük avantaj -180 ila 180OGCHizmetler hizmetleri hizmetleri hizmetleri hizmetleri hizmetleri (E.g.,WMS) Bu aralıkta uzunlık değerleri gerektirir. Lynne Tablewski, Fabien Guichard, Philippe Makowski ve Martin Spel sayesinde.
2016-01-26 Güncelleme: Eeek&#33; Bu, çocuk veri setinin anlayacağı bir boğaya sahiptir.EDDGridErddap'tan itibaren aynı zamanda bir veri kümesini referanslarERDDAP. Bu hata düzeltiliyorERDDAP™v1.68.
    * In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In[GenrateDatasetsX ml](/docs/server-admin/datasets#generatedatasetsxml), yeni bir özel veri kümesi türü,EDDGridLonPM180ErddapCatalog'tan, oluşturmanıza izin verirdatasets.xmlÇünküEDDGridLonPM180 veri kümeleri tüm bunlardanEDDGridBir veri kümesiERDDAPBu 180'den daha uzun bir değere sahiptir.
    * Her şey içinEDDGridveri setleri, içindedatasets.xmlŞimdi opsiyonel kullanabilirsiniz
[&lt;erişilebilir erişilebilir erişilebilir erişilebilir Via ViaWMS&gt; Gerçek &gt;|Sahte sahte yanlış&lt;/ erişilemez / Via ViaWMS&gt;) (/docs /server-admin/datasets #accessibleviawms)   (varsayılan = gerçek) . Bunu sahte bir şekilde devre dışı bırakmak,WMSBu veri kümesi için hizmet. Eğer doğruysa, veri kümesi hala erişilebilir olmayabilirWMSDiğer nedenlerle (E.g., hayır lat veya lon axes) . Bu, özellikle kendi başlarına var olan ve sarılmış veri setleri için faydalıdırEDDGridLonPM180, bu yüzden sadece LonPM180 versiyonu erişilebilirWMS.
    * Kurulumda.xml, grafiklerin arka planı için farklı bir varsayılan renk belirtebilirsiniz. Renk, 0x_AARRGGBB_ şeklinde 8 sayısal hexadecimal değeri olarak belirtilmiştir, AA, RR, GG ve BB opakity, kırmızı, yeşil ve mavi bileşenler, sırasıyla 2 hexadecimal sayı olarak belirtilmiştir. tuvalin her zaman tatlı beyaz olduğunu unutmayın, bu yüzden bir (yarı yarı yarı yarı yarı -) şeffaf grafik arka renk beyaz tuvale karışır. Varsayılan ışık mavidir:
```
        <graphBackgroundColor>0xffccccff</graphBackgroundColor>  
```
John Kerfoot ve Luke Campbell sayesinde.
    * Kurulumda.xml, şimdi en yüksek boyutunu belirtebilirsiniz[günlük dosya](/docs/server-admin/additional-information#log)  (Kayıt için yeniden adlandırıldığı zaman. txt. Önceki ve yeni bir giriş. txt oluşturulur) MegaBytes'de. Minimum izin 1. Maksimum izin 2000. varsayılan 20'dir. (MB MB MB) . Örneğin:
```
        <logMaxSizeMB>20</logMaxSizeMB>
```
    * In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In Indatasets.xml[ ]&lt;fgdcFile&gt; (/docs /server-admin/datasets#fgdcfiles) veya&lt;iso19115File&gt;] (/docs /server-admin/datasets#iso19115file) Şimdi yerel bir dosya olabilir (Daha önce olduğu gibi) veya bir URL veya (Hangi indirilecek, böylece yerel bir kopya var) . If if if if if if if if if if if if if if if if if if if if if if if if if if if if ifERDDAP™Dosyayı indirmez, veri kümesinin yüklenmesi devam edecek, ancak veri setinin bir fgdc veya iso19115 dosyası olmayacak.
    *   EDDGridFromFiles and EDDTableFiles datasets şimdi hızlı bir başlangıç yapabilir (Sistem, sistemERDDAP™Datasets ilk yüklendiği zaman kullanmaya çalışırERDDAP™Yeniden başlatılır) . Bu hızlar yeniden başladıERDDAP.
2016-01-26 Güncelleme: Eeek&#33; Bu, nedenleri olan bir boğaya sahiptir&lt;HerNMillis&gt;, ilk defa veri setinin yeniden başlamasından sonra yüklenmesi gerekir. Bu hata düzeltiliyorERDDAP™v1.68.
    * HızlıRestart sistemine genel bir gelişme izin verirERDDAP™Datasets yüklemek için daha hızlıERDDAP™Yeniden başlatılır.
    * Bütün HepsiEDDGridFromFiles and EDDTable FromFiles subclasses now accept a new&lt;YolRegex&gt; etiketi, genellikle aşağıda doğru belirtilir&lt;recursive&gt;. Recursive "gerçek" ise, sadece yolRegex ile eşleşen tam alt yönlendirme yolları (Varsayılan=".\\*) Kabul edilecektir. Benzer şekilde,&lt;sourceUrls&gt; etiketiEDDGridAggregateExistingDimension artık bir yol dahil edebilir (Varsayılan=".\\*) .
    * Varsayılan için&lt;kısmiRequestMaxBytes&gt; Kurulumda.xml şimdi 490000000 (~490 MB) . Bu, THREDDS veri sunucularından verileri almakla ilgili bazı sorunlar / zaman kesintilerinden kaçınır. Leslie Thorne sayesinde.
    * Giriş sistemine küçük bir değişiklik izin vermeliERDDAP™Çok olduğunda daha duyarlı olmak, çok meşgul. Bilgi şimdi disk sürücüsündeki log dosyasına oldukça büyük chunkste yazılır. avantaj bu çok verimli olmasıdır -ERDDAP™Bilginin günlük dosyaya yazılması için asla engel olmayacaktır. dezavantajlılık, girişin neredeyse her zaman kısmi bir mesajla biteceğini, bir sonraki chunk yazıya kadar tamamlanmayacağını gösteriyor.
    * Bug, inotify ve [Bug düzeltmesi] ile ilgilidir.&lt;HerNMillis&gt; (/docs /server-admin/datasets #update allnmillis) Sistem için sistemEDDGridFromFiles and EDDTableFiles datasets: Büyük bir fs.inotify.max\\_user\\_watches veya fs.inotify.max\\_user\\_instances.max\\_user\\_instances. Bir otobüs varJavaBu bazı parçalara neden olurJava'Inotify/Watch Yönetici sistemi sonlandığında toplanmamış çöp değil; sonunda, sayıların sayısı maksimum sayıyı aşacaktır.ERDDAP™Şimdi bu etrafında çalışıyorJavaBug.
Ayrıca, inotify threads sayısı durum.html web sayfasında listelenir, böylece kullanımında bir göz tutabilirsiniz. Tipik olarak, 1 inotify thread perotifyEDDGridFromFiles and EDDTableFiles dataset'ten.
    * Bug düzeltmesi: Birçok yerde, bir hata yerine, yeni bir hata, yalnızca orijinal hata mesajının kısa bir versiyonunu ve yığın izi olmadan oluşturuldu. Şimdi, yeni bir hata yapıldığında, tüm orijinal istisna e.g.'yi düzgün bir şekilde içerir, yeni bir dışlama atmak. ("bazı yeni mesaj", e) ;
Susan Perkins sayesinde.
    * Bug düzeltme: yakın zamana kadar (v1.64?) Bir ... /datasetIDURL talep edildi,ERDDAP™URL'ye .html eklemek. v1.64'te bu başarısız oldu (Yanlış bir URL oluşturuldu ve sonra başarısız oldu) . Şimdi bu tekrar çalışır. Chris Fullilove sayesinde.

## Version 1.64{#version-164} 
 (2015-08-19) 

*    **Yeni Özellikler (kullanıcılar için) :** 
    * Artık şifre korumalı özelliğe erişmek için rehberlik varERDDAP™datasets (https://) via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via via viacurlvePython. Görün bakalım,[curl](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#curl)ve[Python](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#Python)Talimatlar.
Emilio Mayorga of NANOOS ve Paul Jan Spycam Teknolojilerinin Geleceği sayesinde.
         
*    **Şeyler ŞeylerERDDAP™Yöneticilerin Bilme ve Yapması Gerekiyor:** 
    *   ERDDAP™Şimdi ihtiyaç duyulanJava1.8+.
        Java1.7 ona ulaştı[Yaşam sonunda](https://www.oracle.com/technetwork/java/eol-135779.html)  (Daha fazla güvenlik güncellemesi yok) Nisan 2015'te. Bu versiyonERDDAP™versiyonları ile çalışmayacakJavaAşağıdaki 1.8. If you update fromJava1.7x (veya daha önce) Ayrıca Tomcat'ı güncellemeniz gerekir. Bakın,[ERDDAP™Set Up Talimatlar](/docs/server-admin/deploy-install)İndirme bağlantıları ve tavsiye için.
    * Yeni Data Provider Form.
Bir veri sağlayıcısı size bazı verileri sizin için eklemeyi umduğunuz zamanERDDAP™Tüm metadata toplamak için zor ve zaman harcamak, veri kümesini veri kümesine eklemek için gerekli olabilirERDDAP. Birçok veri kaynağı kaynağı (Örneğin, .csv dosyaları, Excel dosyaları, databases) İç metadata yok, bu yüzdenERDDAP™Veri sağlayıcısından metadata toplamak ve Data In Databases için kapsamlı rehberlik dahil olmak üzere bazı diğer kılavuzları verir. Gönderilen bilgiler dönüştürülürdatasets.xmlformat ve sonra e-posta ile e-postaERDDAP™yönetici yönetici yönetici (sen sen sen sensin sen) ve yazılı (Tamamlanan) BüyükParentYönetmen /loglar /dataProviderForm.log . Böylece, form yarı otomatik olarak bir veri kümesi alma sürecini otomatikleştirirERDDAP™Ama amaERDDAP™yönetici hala tamamlamak zorundadırdatasets.xmlchunk ve veri dosyasını almakla uğraşmak (s) Sağlayıcıdan veya veritabanına bağlanır. Daha fazla bilgi için, bakınız[Data Provider Form Description](/docs/server-admin/datasets#data-provider-form).
    * Yeni Yeni Yeni Yeni Yeni Yeni Yeni&lt;matchAxisNDigits&gt;
Tarafından kullanılabilirEDDGridFromFiles (Ve böyleceNcFiles veMergeIRFiles'ten ve) ,EDDGridAggregateExistingDimension,EDDGridKopyalayın veEDDGridSideBySide datasets, farklı dosyalardaki eksen değerlerine tam olarak nasıl eşit olduğunu belirtmek için (kaç basamak) : 0=no kontrol (Bunu kullanmayın&#33;) 1-18 artan hassasiyet veya 20 (varsayılan varsayılan) Tam eşitlik için. n=1-18 içinERDDAP™Çift değerlerin ilk n basamaklarının çift değerlerini garanti eder. (veya (n+1) div 2 için yüz değerleri) eşit.
        &lt;matchAxisNDigits&gt; Değiştirin&lt;AxisValues AreEqual&gt;, bu şimdi de tartışmalıdır. "Gerçek" değeri, AxisNDigits=20 ile eşleştirmeye dönüştürülecektir. Bir değer ‘false’ (Bunu yapmayın&#33;) Maça dönüştürülecek AxisNDigits=0.
    *   EDDGridFromFiles and EDDTable FromFiles çok yavaş ilk kez bu versiyonunu kullandığınızdaERDDAP.
        ERDDAP™Şimdi iç dosya bilgilerini biraz farklı bir şekilde depolar, bu yüzden bu veri setlerinin her biri için iç dosya masası yeniden inşa edilmelidir. Endişelenmeyin. Hiçbir şey yanlış değildir. Bu bir zaman şeydir.
    * Uzak Kaynak Dosyalar
        EDDGridFromNcFiles, EDDTable FromNcFiles, EDDTable FromNcCFFiles şimdi dosyaların bir dizide uzaktan dosyalar olmasına izin veriyorhttp://  (Ve muhtemelenhttps://Ve ftp #, ama onlar test edilmez) Uzak sunucu desteklerse[Range Requests](https://en.wikipedia.org/wiki/Byte_serving)İstek başlığında. THREDDS ve Amazon S3 destek Range Requests,Hyraxdeğil. Bu sistem, dosyaları indirmeden uzak dosyalarda verilere erişmenizi sağlar (Bu, uzak dosyaların çok voluminous) Ancak bu dosyalara erişim yerel dosyalara veya uzaktan uzak bir uzaktan erişimden çok daha yavaş olacaktır.OPeNDAPkaynak.
Bu da içerir"files"Amazon S3 kovasında, çünkü onlar aracılığıyla erişilebilir olduklarındanhttp://. S3 nesne isimleri dosya isimleri gibidir (internal /'s like a Linux directory tree tree) ,ERDDAP™Ayrıca dosyaları erişilebilir hale getirebilirERDDAP""files"Sistem. Bu çalışma için, S3 bilginiz ~ /.aws /credentials olmalıdır (Linux, OS X veya Unix) , ya da C:Users SandUSERNAMEGaws Sandcredentials (Windows üzerinde) sunucuda,ERDDAP. Görün bakalım,[Amazon SDK belgeleri](https://docs.aws.amazon.com/sdk-for-java/?id=docs_gateway#aws-sdk-for-java,-version-1).
    * GenrateDatasets X ml'nin yeni, olağandışı bir seçeneği var: EDDs FromFiles.
Bu bir dosya sistemi üzerinden gidecek (Amazon S3 gibi uzaktan bir sistem bile, eğer nesneler dosya gibi isimler varsa) Ve yaratırdatasets.xmlBir dizi veri kümesi için chunks. Mileageiniz değişebilir. Bu, dosyalar organize edilirse iyi çalışır, böylece verilen bir dizi veritabanındaki tüm veri dosyaları (Ve onun alt danışmanları) Bir veri kümesi için uygun (e.g., tüm SST 1-gün kompozitler) . Aksi takdirde Aksi takdirde (e.g., bir dizi SST dosyaları içeriyorsa ve bazı Chlorophyll-a dosyaları) Bu kötü çalışır, ancak hala yararlı olabilir.
    * Programcılar: yeni /lib .jar dosyaları.
Eğer dersenizERDDAP™Ama lütfen sınıfpath'daki yeni .jar dosyaları unutmayın -cp parametre listede listelenenERDDAP™ [Programr's Guide](/docs/contributing/programmer-guide).
    * Sea\\_water\\_practical\\_salinity
Herhangi bir değişken için CF standart adı deniz\\_water\\_salinity kullanıyorsanız, size deniz\\_water\\_practical\\_salinity'ye geçiş yapmanızı öneririm.[CF Standard Name Table 29 versiyonu](https://cfconventions.org/Data/cf-standard-names/29/build/cf-standard-name-table.html)  (Ve bazı önceki versiyonlar - Bunu bilmiyordum) . Bu isim, bunun gerçekten pratik bir Salinity değeri olduğunu gösteriyorPractical Salinity Units  (PSU) Eski bir g/kg değerine karşı olduğu gibi. Kanonik birimler farklıdır, ancak yine de inanılmaz derecede yardımsız: 1 1 1 (Muhtemelen ima ediyorPSU/PSS-78) 1e-3'e karşı olduğu gibi (Muhtemelen g /kg ima ediyor) Sea\\_water\\_salinity için.\\[Hey,Unidatave CF: Diğer ölçekleri kullanan değerleri tanımlıyoruz, örneğin Fahrenheit veya °, ölçek veya bazı varyasyonun adı olan bir birim dize aracılığıyla. Neden onların ölçeği, e.g., PSS-78 aracılığıyla selam birimleri tanımlayamayız? Biliyorum: PSS-78 değerleri "özgür", ancak ima edilen bir ölçek var, orada değil mi? Değerlerin 0.875 defa PSS-78 değerleri olduğu yeni bir pratik selamlama ölçeği icat edersem, kanonik birimler hala "1" olmalıdır mı? Bir kullanıcı onları nasıl ayrı söyleyebilir? 1e-3 ve 1 birimleri, sayıların ne işaret ettiğini anlamaya çalışan kullanıcılar için ne de yararlı değildir.\\]

## Version 1.62{#version-162} 
 (2015-06-08) 

*    **Yeni Özellikler (kullanıcılar için) :** 
    * For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For ForEDDGridVeri setleri, kullanıcılar şimdi Graph Type yapabilir: numeric axes'in herhangi bir kombinasyonu ile yüzey grafikler, sadece enlem karşı değil. Bu, x'i y'ye karşı yapmanıza izin verir (Projelendi) Grafikler ve çeşitli grafikler[Hovmöller Diagrams](https://en.wikipedia.org/wiki/Hovm%C3%B6ller_diagram)Örneğin, derinliğine karşı uzun bir süre ya da derinliklere karşı zaman.\\[Not: Eğer derinlik Y Axis'de ise, muhtemelen istediğiniz şeyden silinecektir. Üzgünüm, henüz bir seçenek değil.\\]Cara Wilson ve Lynn DeWitt sayesinde.
    * Yeni bir şey var[Oceanic/Atmospheric Acronym Converter](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericAcronyms.html)Bu, ortak bir okyanus / atmosferik acronymı tam bir isimden / dönüştürmenizi sağlar.
    * Yeni bir şey var[Oceanic/A atmosferik Değişken İsimleri](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericVariableNames.html)Bu, ortak bir okyanus / atmosferik değişken adı tam bir isimden / dönüştürmenizi sağlar.
*    **Şeyler ŞeylerERDDAP™Yöneticilerin Bilme ve Yapması Gerekiyor:** 
    *   Java7/8
        OracleArtık destek yok (Güvenlik boğaları için sağlar)  Java7.ERDDAP™Hala hala destekleniyorJava7, ama lütfen hareket etmekJava8. Sonraki sürümERDDAP™Muhtemelen gerektirecektirJava8.
    *   valid\\_min/max /
Daha önce ve şimdi, eğer birdataVariableHavel Havel vardıscale\\_factorveadd\\_offsetmetadata,ERDDAP™Veri değerlerini paketler ve o metadata'yı ortadan kaldırır. Daha önce,ERDDAP™Değiştirilmedi / herhangi bir paket değiştirmedivalid\\_range,valid\\_min,valid\\_maxmetadata (Hangi genellikle / paketlenmiş değerler içermelidir) Yemin ederimscale\\_factorveadd\\_offset. Şimdi öyle. Lütfen aramaERDDAP™"valid\\_" için ve tüm değişkenlerin sahip olduğundan emin olunvalid\\_range,valid\\_minYa davalid\\_maxDatasets yeni sürümde göründüğünde doğru değerlere sahipERDDAP. See See See See[valid\\_range/min /max belgeleri](/docs/server-admin/datasets#valid_range).
    * ACD-1.3
Daha önce,ERDDAP™  (Özellikle GenrateDatasets X ml) kullanılmış / orijinali (1.0) Versiyonu[NetCDFDataset Discovery için Katkı](https://wiki.esipfed.org/ArchivalCopyOfVersion1)Bu, "UnidataDataset Discovery v1.0" Küresel Sözleşmelerde veMetadata\\_Conventionsözellikler. Şimdi, tavsiye ederiz[ACD version 1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Bu, 2015 yılının başlarında onaylandı ve "ACD-1.3" olarak adlandırılır. Neyse ki, ACD-1.3 sürüm 1.0 ile oldukça uyumlu. Biz size bunu yapıyoruz[ACD-1.3](/docs/server-admin/datasets#switch-to-acdd-13). Zor değil.
    * GenrateDatasets X ml Attributes
Geliştirmek için çok sayıda değişiklik vardı&lt;addAttributes&gt; GenerateDatasets tarafından önerilen değerler Küresel Sözleşmeler için X ml,creator\\_name/ e-posta/url, anahtar kelimeler, özet ve başlık özellikleri ve değişken içinlong\\_nameÖzellikler. Bazı değişiklikler ACD-1.3'ün yeni kullanımı ile ilgilidir.
    * EDDTable From FromSOSdatasets
Yeni türlerin ara sıra,SOSEski sunuculara ve değişiklikler, eski sunuculara daha zor geliyorERDDAP™Sunucu tipini sunucunun cevaplarından otomatik olarak tespit etmek. The use of [[değiştir | kaynağı değiştir]&lt;SosServerType&gt; (/docs /server-admin/datasets #edtable fromsos-uralon-xml)   (IOOS\\_NDBC değeri ile IOOS\\_NOS,OOSTethysveya WHOI) Şimdi STRONGLY RECOMMENDED. Bu türün herhangi biri yeni versiyonunda sorunlar varsaERDDAP, yeniden çalışan GenerateDatasets X ml içinSOSserver yeni bir chunk oluşturmak içindatasets.xmlBu veri kümesi için. GenrateDatasets X ml farklı denemenize izin verecektir&lt;sosServerType&gt; Verilen bir sunucu için doğru olanı bulana kadar seçenekler. Hala sorunlarınız varsa, lütfen gördüğünüz sorunu ve sunucunun URL'sini ve yardım etmeye çalışacağım.
    * EDDTable FromFileNames datasets
Tavsiye edilen bazı özellikleraddAttributesŞimdi kaynakAttributes. Muhtemelen mevcut veri setleriniz için herhangi bir şeyi değiştirmek zorunda değilsinizdatasets.xml.
    * Bug, EDDTable FromNcCFFiles datasets'e bazı isteklerle ilgili düzeltmektedir.
Ayrıca, altta yatan yöntemlerin mevcut çok sayıda birim test ekledim. (Senaryoların 100'leri var) . Eli Hunter sayesinde.
    * Bug düzeltme/küçük değişikliklerEDDGridMergeIR'dan.
Jonathan Lafite ve Philippe Makowski sayesinde
    * Bug düzeltme:EDDGridErddap'tan şimdi uzaktan bir veri setinin sahip olmadığı bile çalışıyorioos\\_categorydeğişken özellikler.
Kevin O'Brien sayesinde.
    * Bug .graph web sayfası içinEDDGridBir değerden daha fazlası ile sadece bir eksen değişkeni olduğunda veri setleri.
Charles Carleton sayesinde.
    * Başka küçük gelişmeler, değişiklikler ve bug düzeltmeleri vardı.

## Version 1.60{#version-160} 
 (2015-03-12-12) 

*    **Yeni Özellikler (kullanıcılar için) :** Hiçbir kimse hiçbir şey yok
*    **Şeyler ŞeylerERDDAP™Yöneticilerin Bilme ve Yapması Gerekiyor:** 
    * STRONGLY RECOMMENDED: Sunucunuzun Güncellemesi[Robotlar.txt](/docs/server-admin/additional-information#robotstxt)Dosya dahil:
Disallow: /erddap/files /
    * Problemi ve Çözümü söylemiyorum:
Linux bilgisayarlarda, kullanıyorsanız&lt;HerNMillis&gt; Tür ile datasets ile =EDDGridFromFiles, EDDTable FromFiles,EDDGridKopya, EDDTableCopy veya alt sınıfları, bir veri kümesinin yükleyemediği bir problem görebilirsiniz (Bazen veya sürekli olarak) Hata mesajı ile: "IOException: Kullanıcı inotify örneklerinin limiti veya çok fazla açık dosyaya ulaştı". Eğer öyleyse, bu sorunu çağırarak düzeltebilirsiniz (Kök olarak) :
yankı fs.inotify.max\\_user\\_watches=65536|Tee -a / etc /sysctl.conf
yankı fs.inotify.max\\_user\\_instances=1024|Tee -a / etc /sysctl.conf
sysctl -p
Ya da problem devam ederse daha yüksek sayılar kullanın. Saatler için varsayılan 8192. Örnekler için varsayılan 128.\\[UPDATE: Bir boğa varJavaBu, çöp toplamaması için örneklere neden olur. Bu problem kaçınılıyorERDDAP™v1.66 ve daha yüksek. Bu yüzden daha iyi çözüm en son sürüme geçmekERDDAP.\\]
    * Hayır Bug Fix:
Veri kümelerine neden olabilecek bir otobüs vardı =EDDGridFromFiles, EDDTable FromFiles,EDDGridKopyalama, EDDTableCopy veya alt sınıfları bazen hatayla yüklememek için "NoSuchFileException: _someFileName_". Bug FileVisitor kullanımı ile ilgilidir ve tanıtıldıERDDAP™v1.56. Sorun nadirdir ve veri kümelerini çok sayıda sık değişen veri dosyaları ile etkileme olasılığı yüksektir.
    * Bazı küçük gelişmeler, değişiklikler ve bug düzeltmeleri vardı.

## Version 1.58{#version-158} 
 (2015-02-25) 

*    **Yeni Özellikler (kullanıcılar için) :** 
    * Yeni The new["files"](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)Sistem, sanal bir dosya sistemi taramanıza ve birçok kaynaktan kaynak veri dosyalarını indirmenize olanak sağlarERDDAP™datasets. The The The The The The The The"files"Sistem varsayılan olarak aktiftir, ancakERDDAP™Yöneticiler onu koyarak devre dışı bırakabilir
```
        <filesActive>false</filesActive>  
```
İçindeERDDAP™Kurulum.xml dosyası. Philippe Makowski sayesinde, bu fikrin güzelliğini takdir etmek için yavaş olduğumda devam etti.
    * Zaman hedefi Max – Max Daha önce, EDDTable veri kümelerinin gerçek zamanlı verilerle zaman değişkeni, veri kümesi için en fazla zaman değerini ima eden bir NaN hedefine sahipti, ancak tam olarak bilinmemektedir ve sık değişmez. Şimdi, hedefMax'in gerçek bir değeri var, şu anda bilinen son zamanı gösteriyor. Birçok veri kümesi sürekli olarak güncellenmiştir.ERDDAP™En son verilere erişmeyi destekler, şu anda bilinen son zamanlarda olsa bile. Not that the new&lt;HerNMillis&gt; (/docs /server-admin/datasets #update allnmillis) Destek içinde destekEDDGridFromFiles and EDDTableFiles datasets zaman değişkeninin hedefiMax'i güncelliyor. Bu değişimin bir başka sonucu da, bu değişimin bir diğer sonucudur.datasetID= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =allDatasetsDataset şimdi maxTime sütunlarında şu anda bilinen son zamanı içeriyor. John Kerfoot sayesinde.
*    **Şeyler ŞeylerERDDAP™Yöneticilerin Bilme ve Yapması Gerekiyor:** 
    * STRONGLY RECOMMENDED: Sunucunuzun Güncellemesi[Robotlar.txt](/docs/server-admin/additional-information#robotstxt)Dosya dahil:
Disallow: /files /
Disallow: /erddap/files /
    * Örnek Örnek Örnek Örnek Örnek Örnek Örnek Örnekdatasets.xml– Geçen yıl, kıyıwatch'da birkaç mükemmel veri setini tavsiye ettikERDDAP™Bu size ekleyebilirsinERDDAP™Sadece birkaç çizgi eklemek içindatasets.xml. Eğer erdVH veri setlerini eklediyseniz, lütfen yenier erdVH2 veri setlerine değiştirin:
        * Tüm erdVH veri setlerinin bir kopyasını yapın ve kopyalayındatasetID“SadVH’den... erdVH2 için... ve referansı değiştirmek içinsourceUrlerdVH'den... erdVH2.
        * ErdVH'yi ayarlayın... Aktif="false için veri setleri.”
    * Bütün HepsiEDDGridFromFiles and EDDTable FromFiles subclasses now support [İngilizce).&lt;erişilebilirViaFiles&gt; (/docs /server-admin/datasets #accessibleviafiles) Kaynak veri dosyalarını erişilebilir hale getirmek için"files"sistemler. Varsayılan olarak, bu sistem her veri kümesi için kapalıdır. Bunu sağlamak için etiketi eklemek zorundasınız. Philippe Makowski sayesinde.
    * Bütün HepsiEDDGridFromFiles and EDDTable FromFiles subclasses now support [İngilizce).&lt;HerNMillis&gt; (/docs /server-admin/datasets #update allnmillis) . Varsayılan olarak, bu sistem her veri kümesi için kapalıdır. Bunu sağlamak için etiketi eklemek zorundasınız. Dominic Fuller-Rowell ve NGDC sayesinde.
    * Yeni The new[EDDTable FromFileNames](/docs/server-admin/datasets#eddtablefromfilenames)Sunucunun dosya sisteminde bir dosya grubu hakkında bilgiden bir veri kümesi oluşturur, ancak dosyaların içinde verilere hizmet etmez. Örneğin, bu görüntü dosyaları, ses dosyaları, video dosyaları, kelime işleme dosyaları ve tablo dosyalarını dağıtmak için yararlıdır. Bu yeni el-in-hand ile yeni çalışır["files"](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)Sistem, böylece kullanıcılar dosyaları indirebilir. Philippe Makowski sayesinde, bu fikrin güzelliğini takdir etmek için yavaş olduğumda devam etti.
    * Yeni The new[EDDGridFromEDDTable](/docs/server-admin/datasets#eddgridfromeddtable)Bir tabu veri kümesini bir ızgara veri kümesine dönüştürmenize izin verin. Ocean Networks Kanada sayesinde.
    * Yeni The new[EDDGridMergeIRFiles](/docs/server-admin/datasets#eddgridfrommergeirfiles)Bir grup yerel MergeIR'dan toplanan veriler.gzdosyaları.EDDGridMergeIRFiles'ten gelen kod ilk chunk olmanın ayrımı, katkıda bulunan kodların ayrımına sahiptir.ERDDAP. Tamamen bizim yardımımız olmadan yapıldı. Jonathan Lafite ve Philippe Makowski of R.Tech Engineering sayesinde üç heyecan ve özel.
    * Yeni, seçmeli bir kurulum.xml etiketi var,&lt;UnitTestDataDir&gt;, yeni bir GitHub repository aracılığıyla mevcut olan birim test verileri dosyaları ile dizinini belirtir:[ https://github.com/ERDDAP/erddapTest ](https://github.com/ERDDAP/erddapTest). Örneğin:
```
        <unitTestDataDir>/erddapTest/</unitTestDataDir>  
```
Bu henüz yararlı değil, ancak mümkün olduğunca diğer insanlar tarafından yönetilen ünite testlerinin çoğunu yapmak için hareketin bir parçasıdır. Terry Rankine sayesinde.
    * Birçok küçük gelişme, değişiklikler ve bug düzeltmeleri vardı.

## Version 1.56{#version-156} 
 (2014-12-16) 

*    **Yeni Özellikler (kullanıcılar için) :**   (Hiçbir şey yok) 
*    **Şeyler ŞeylerERDDAP™Yöneticilerin Bilme ve Yapması Gerekiyor:** 
    * Muhtemelen zaten biliyorsunuz[EDDGridFromErddap](/docs/server-admin/datasets#eddfromerddap)ve[EDDTable FromErddap](/docs/server-admin/datasets#eddfromerddap)Bu, diğerinde veri kümelerine bağlantı kurmanıza izin verirERDDAPs ve onlar senin içinde görünüyorERDDAP. Bu veri kümelerinden gelen gerçek veriler için kullanıcı talepleri, kaynağına uygun olarak yönlendirilir.ERDDAP™Bu nedenle veriler sisteminizden akmıyor veya bant genişliğinizi kullanmıyor. Şimdi örneklenmiş veri setlerinin büyük bir listesi vardatasets.xmlSeddapContent.zip. Onlara dahil etmek içinERDDAP™Yapmanız gereken her şey kopyalanır ve istediğinizleri içine yapıştırırdatasets.xml. Conor Delaney sayesinde.
    * Eğer dersenizERDDAP™Bazı yeni eklemek zorundasınız. jar dosyalarına[classpath -cp switch](/docs/contributing/programmer-guide#development-environment)javac ve java için.
    * Yeni The new[EDDTable FromCassandra](/docs/server-admin/datasets#eddtablefromcassandra)Verilerden veri almak[Cassandra](https://cassandra.apache.org/). Ocean Networks Kanada sayesinde.
    * Yeni The new[EDDTable FromColumnarAsciiFiles](/docs/server-admin/datasets#eddtablefromcolumnarasciifiles)Sabit geniş sütunlarla ASCII veri dosyalarından veri alıyor. Philippe Makowski sayesinde.
    * Bütün HepsiEDDGridFromFiles and EDDTable FromFiles subclasses now use a new method, FileVisitor (Buna ek olarak eklendiJava11.7'de) dosyaları hakkında bilgi toplamak için. Bu, verilen bir veri kümesi için dosya bilgisinin ilk toplanması için bir faydası olmayabilir, ancak yakında yapılan sonraki toplantılar için büyük bir fayda var gibi görünüyor, OS hala bilgi önbelleğine sahipken. NGDC sayesinde.
        
Hala tavsiye ediyoruz: Bir veri kümesinin çok sayıda dosya varsa (E.g., &gt;1,000) , işletim sistemi (Ve böyleceEDDGridFromFiles and EDDTable FromFiles) dosyaları bir dizi subdirectories'de saklarsanız çok daha verimli çalışacaktır. (Yılda bir ya da veri setleri için ayda bir, çok sık dosyalar) Ancak, verilen bir dizi veritabanında asla çok sayıda dosya yoktur.
        
    * EDDTable FromAsciiFiles için birkaç küçük gelişme.
    * EDDTableAsciiServiceNOS için bazı gelişmeler, özellikle kaynaktan bazı bilgi sütunları almak. Lynn DeWitt sayesinde.
    * ISO 19115 ile ilgili bazı küçük otobüslerERDDAP™üretir. Anna Milan sayesinde.

## Version 1.54{#version-154} 
 (2014-10-24) 

*    **Yeni Özellikler (kullanıcılar için) :** 
    * Bazı değişkenler şimdi milisans hassas, e.g., 2014-10-24T16:41.485Z'de zaman ile çalışır. Dominic Fuller-Rowell sayesinde.
*    **Küçük değişiklikler / Bug Fixes:** 
    * Bug düzeltme: Bazı koşullar kombinasyonu ile,EDDGridNcFile veri setlerinden veri azaltıldığında geri döndü (e.g., çiftlerin yerine yüzler) . Bu sadece verileri &gt; 8 önemli rakamlarla etkileyebilir. Benim özür dilerim. (Ve klasik bir bilgisayar programlamaydı: yanlış bir karakter.) Dominic Fuller-Rowell sayesinde.
    * Birçok küçük değişiklik.
*    **Şeyler ŞeylerERDDAP™Yöneticilerin Bilme ve Yapması Gerekiyor:** 
    * Griddap veri setleri şimdi zaman damga değişkenlerini ve veri değişkenlerini destekliyor (I.e., zaman değerleri ile değişkenler, ama birdestinationNameDiğeri"time") . Dominic Fuller-Rowell sayesinde.
    *   ERDDAP™Şimdi doğru bir şekilde milisaniyeleri desteklertime\\_precision"1970-01-01T00:00:00.000Z." Bir niyetle quirk: insan odaklı dosyalara zaman yazarken (E.g., .csv,.tsv,.json,.xhtml) ,ERDDAP™Belirtilen belirtilen kullanımları kullanırtime\\_precisionsaniyeler ve / veya decimal saniyeler içeriyorsa; aksi takdirde, saniyeler kullanır.time\\_precision"1970-01-01T00:00Z" (tutarlılık ve geriye dönük uyumluluk) . Dominic Fuller-Rowell sayesinde.
    *   EDDGridFromNcFiles now support reading StringdataVariables.
    *   .ncgriddap tarafından yazılan dosyalar şimdi String'e sahip olabilirdataVariables.
    * GenrateDatasets X ml şimdi daha fazla kızarık içerir () Bilgi probleminden kaçınmaya çağrılar dosyalarına yazılmamıştır. Thierry Valero sayesinde.
    * GenerateDatasetsXml için dokümanlar geliştirildi, özellikle de - sadece komut satırındaki tüm cevapları belirtseniz çalışır. (e.g., senaryo modu) . Ve senaryo modu açıklanmaktadır. Thierry Valero sayesinde.
    *   ERDDAP™Artık bir veri kümesindeki iki değişkenin aynı olmasına izin vermeyinsourceName. (Birisi daha önce yaptıysa, muhtemelen hata mesajlarına yol açtı.) Daha önce olduğu gibiERDDAP™Bir veri kümesindeki iki değişkenin aynı olmasına izin vermiyordestinationName.

## Version 1.522{#version-152} 
 (2014-10-03) 

*    **Yeni Özellikler:**   (Hiçbir kimse hiçbir şey yok) 
*    **Küçük değişiklikler / Bug Fixes:** 
    * Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir Başka Bir (Daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük daha küçük) Değişim yapmakERDDAP™Daha hızlı.
    * ISO 19115 dosyalarının geliştirilmesiERDDAP: Yeni önerilen yeni önerilen eklendi&lt;gmd:protocol&gt; değerler (Bilgi, arama,OPeNDAP:OPeNDAP,ERDDAP:griddap veERDDAP:tabledap) içeride&lt;gmd:CI\\_OnlineKaynak&gt; Derrick Snowden ve John Maurer sayesinde.
    * Birçok küçük değişiklik.
*    **Şeyler ŞeylerERDDAP™Yöneticilerin Bilme ve Yapması Gerekiyor:** 
    * Bug düzeltme: GenerateDatasetsXml.sh ve DasDds.sh, 1.48 ve 1.50 için hatalı değildi. Şimdi onlar. Thierry Valero sayesinde.
    * Testte bazı hız testleri için küçük değişiklikler onları şansa daha az hassas hale getirmek için. Terry Rankine sayesinde.

## Version 1.50{#version-150} 
 (2014-09-06) 

*    **Yeni Özellikler:**   (Hiçbir kimse hiçbir şey yok) 
*    **Küçük değişiklikler / Bug Fixes:** 
    * Bu Bu Bu BuERDDAP™Son versiyonlardan çok daha hızlı olmalıdır.
*    **Şeyler ŞeylerERDDAP™Yöneticilerin Bilme ve Yapması Gerekiyor:**   (Hiçbir şey hiçbir şey hiçbir şey yok hiçbir şey yok hiçbir şey yok) 

## Version 1.48{#version-148} 
 (2014-09-04) 

*    **Yeni Özellikler:** 
    *   ERDDAP™Şimdi her zaman bir tabu veri kümesi yaratır,datasetID= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =allDatasetsBu, tüm veri kümeleri hakkında bir bilgi masasına sahiptir.ERDDAP. Başka bir tabu veri kümesi gibi queried olabilir. Bu, datasets programımatically hakkında bilgi almak için mevcut sisteme faydalı bir alternatiftir.
    * EDDTable için iki yeni çıkış dosya türü var veEDDGrid.csv0 ve.tsv0. Onlar, sütun isimleri veya birimleri ile hatları olmayan değer dosyalarına sahipler. Veriler ilk satırda başlar. Onlar sadece bir parça bilgi isteyen senaryolar için özellikle yararlıdırERDDAP.
*    **Küçük değişiklikler / Bug Fixes:** 
    * Haritalar şimdi aralıkta uzunluğa yapılabilir - 720'ye kadar720.
    * Yeni The new.ncml yanıt File Type tüm için mevcutturEDDGriddatasets. döndürür[NCML](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/ncml_overview.html)\\-formatted Description of the dataset (Birleştirilmiş .dds + .das) .
    * Bug düzeltme: Bir tabu verileri bir an için kurtarmak.ncDosya değişken başına 100.000 değerle sınırlıydı. Şimdi sadece 2 GB toplam dosya büyüklüğü ile sınırlıdır. Kevin O'Brien sayesinde.
    * Bug düzeltme: The saveAsMatlabYöntemler şimdi bunu sağlardatasetIDs güvenli bir şekilde dönüştürülürMatlabdeğişken isimler. Ama hala yarattığınızı şiddetle tavsiye ediyorumdatasetIDGeçerli değişken isimler şunlardır: Bir mektupla başlayın ve sonra sadece A-Z, a-z, 0-9 ve \\_. See See See See[datasetID](/docs/server-admin/datasets#datasetid). Luke Campbell sayesinde.
    * Bug, EDDTable FromDatabase'de düzeltme: Bazı veritabanı türleri ile, NO\\_ Veritabanından gelen DATA cevabı anlamsız 30 ikinci gecikmeye yol açtıERDDAP. Greg Williams sayesinde.
    * Bug düzeltme:EDDGridGraph Type = hatları ile bir Graph yapın (veya işaretleyiciler veya çizgiler ve çizgiler) Zaman olmak için x eksen değişkeni zorladı. Şimdi herhangi bir eksen olabilir. Lynn DeWitt sayesinde.
*    **Şeyler ŞeylerERDDAP™Yöneticilerin Bilme ve Yapması Gerekiyor:** 
    * STRONGLY RECOMMENDED: UpdateJava  
Bu versiyonERDDAP™Gereklilik gerektirirJava7 veya daha yüksek, amaJava7 Nisan 2015'te son hayatına ulaşacak (Yakında&#33;) Ama şimdiye kadar geçmek için iyi bir zamanJava8.Java8 STRONGLY RECOMMENDED. Benimle test ediyorumJava8. Not thatJava6 Şubat 2013 yılında son hayatına ulaştı. (Daha fazla güvenlik otobüsü yok&#33;) .
    * STRONGLY RECOMMENDED: Update Tomcat
Tomcat kullanıyorsanız, lütfen Tomcat'ın son sürümüne geçin. Tomcat 8, çalışmak için tasarlanmıştırJava8.
    * " " ""ERDDAP" artık bir acronym değil. Şimdi sadece bir isim. Adını vurgulamak istemiyorumERD. Keşke istiyorumERDDAP™Kurumunuzu ve verilerinizi vurgulamak için.
    * PLEASE[görünümünü özelleştirinERDDAP™Kurumunuzu ve verilerinizi vurgulamak için kurulum](/docs/server-admin/deploy-install#customize). Bir saat çalışmasıyla, sonsuza kadar sürecek güzel gelişmeler yapabilirsiniz.
    * Kurulumda.xml,&lt;EkranDiagnosticInfo&gt; seçeneği artık her zaman yanlış olup olmadığını göz ardı edilir.
RECOMMENDED: Kaldırın&lt;EkranDiagnosticInfo&gt; etiketi ve kurulumunuzdan ilgili bilgiler.xml.
    * Kurulumda.xml, varsayılan&lt;drawLandMask&gt; "over" idi, ama şimdi daha iyi bir genel varsayılan olan "altın" (Tüm veri setleriyle iyi çalışır) .
    * GenerateDatasetsX ml.sh ve DadDds.sh Linux senaryoları artık csh yerine bash kullanıyor ve uzatmaya sahip. Emilio Mayorga sayesinde
    * GenrateDatasets X ml ve DasDds şimdi kendi günlük dosyaları yaratıyor (GenrateDatasetsX ml.log ve DasDds.log) ve çıktı dosyaları (GenrateDatasetsX ml.out ve DadDds.out) _bigParent Yönetmeny_/logs / ve asla panoda sonuçlarını koymaz.
    * GenrateDatasets X ml şimdi belirli bir yerde belirtilen dosyaya çıkan bir komut satırı parametresini destekliyor. Bakın,[Belge belgeleri](/docs/server-admin/datasets#generatedatasetsxml). Terry Rankine sayesinde.
    * EDDTableFromDatabase şimdi destekleniyor&lt;sütunNameQuotes&gt;&lt;/columnNameQuotes&gt;, geçerli değerlerle " (varsayılan varsayılan) ", ya da hiçbir şey. Bu karakter (Eğer herhangi bir) Daha önce ve SQL sorgularında sütun isimlerinden sonra kullanılacaktır. Farklı veritabanı türleri, farklı şekillerde ayarlanmış, farklı sütun adı alıntılarına ihtiyaç duyacaktır.
    * Tabular entitude ve uzun değişkenleri şimdi özelleştirilmiş özelleştirilmiş özelleştirilmiş olabilirlong\\_name's, e.g., Profilecraft. Daha önce, sadece bok ve uzun olabilir.
    * Şu andan itibaren, "defaultDataQuery" ve "defaultGraphQuery" veri setinin global metadata (i.e.&lt;AddAtts&gt;), ayrı değil&lt;varsayılanDataQuery&gt; ve&lt;varsayılan GrafQuery&gt; etiketler. (Yine de, onları hala etiketler aracılığıyla belirtseniz,ERDDAP™Otomatik olarak bilgi ile global özellikler yaratacaktır.) 

## Version 1.46{#version-146} 
 (2013-07-09-09) 

*    **Yeni Özellikler:** 
    *    (Hiçbir şey yok) 
*    **Küçük değişiklikler / Bug Fixes:** 
    * Bug düzeltme: EDDTable FromDatabase, sürüm 1.44 sadece,ERDDAP™Uygun bir şekilde veritabanının SQL ifadelerindeki tablo adını alıntılar. Bu şimdi sabit. Kevin O'Brien sayesinde.
*    **Şeyler ŞeylerERDDAP™Yöneticilerin Bilme ve Yapması Gerekiyor:** 
    *    ** Mesajlarda standart mesajları değiştirmezseniz.xml,
silinir\\[tomcat\\]/content/erddap/messages.xml . **   
Varsayılan mesajlar.xml dosyası şimdi hatada. Savaş dosyası, erddapContent.zip. Bu yüzden artık mesajları manuel olarak güncellemeniz gerekmez.xml .
    * Mesajları mesajları şu andan itibaren değiştirirseniz, her seferinde güncellemekERDDAP™Ya da:
        * Daha önce yaptığınız aynı değişiklikleri yeniliğe yapın
            \\[tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messajlar.xml.
Ve bu bir kez: silinir\\[tomcat\\]/content/erddap/messages.xml .
        * Ya da, yeni mesajlarda neyin değiştiğini öğrenin.xml (Diff) , ve değişiklik
            \\[tomcat\\]/content/erddap/messages.xml dosyası buna göre.

## Version 1.44{#version-144} 
 (2013-05-30) 

*    **Yeni Özellikler:** 
    * EDTable veri setlerine kuyruklar şimdi destek ve destekorderByMin Min Min (...) veorderByMinMax (...)   (Hangi her grupta iki sıra döndürür, en az ve en önemlisi sonorderBydeğer değeri değer değeri) . Lynn DeWitt sayesinde.
    * İki yeni yeni yeni vartabledapDosya türleri:.ncCFHeader ve.ncCFMAHeader (Bu, ncdump benzeri başlığını geri döndürür.ncCF ve.ncCFMA dosya türleri) . Steve Hankin sayesinde.
*    **Küçük değişiklikler / Bug Fixes:** 
    * Bug düzeltme: birçok zaman değeri olan veri kümeleri için .graph ve .html web sayfalarını yüklemek yavaştı çünkü çünküERDDAP™Zaman kaydırak seçenekleri oluştururken yavaştı. Şimdi her zaman hızlı. Michael Barry, OOICI ve Kristian Sebastian Blalid sayesinde.
    * Bug düzeltme: Bazı EDDTable veri kümelerinde, zaman kısıtlamaları her zaman doğru şekilde ele alınmadı. Şimdi onlar. John Maurer ve Kevin O'Brien sayesinde.
    * Bug düzeltme: veri setleri her zaman yüklenemezsubsetVariablesSabit değer değişkenleri idi. Şimdi olacaklar. Lynn DeWitt ve John Peterson sayesinde.
    * IMPROVED: Şimdi, sadece alt küme değişkenleri için tüm sorgular sanki &distinct () Sorunun bir parçasıdır.
    * IMPROVED: Şimdi, içeren sorgular için ve.jsonp =_ functionName_, _ function Name_ MUST şimdi 1 veya daha fazla seri olmak (Dönem -) kelimeler. Her kelime ISO 8859 mektubu veya "\\_" ile başlamalı ve 0 veya daha fazla ISO 8859 mektup, basamak veya "\\_" takip edilmelidir. Evet, bu daha kısıtlayıcıJavascript'in işlevleri isimleri için gereksinimleri.
    * Grafiklerdeki zaman eksenleri artık daha uzun zaman aralıkları için iyi çalışıyor (80 - 10000 yıl) ve daha kısa zaman aralıkları (0.003 - 180 saniye) .
    *   ERDDAP™Şimdi ISO-8601-format zaman verilerinin varyasyonlarını parlarken daha fazla bağışlayıcıdır.
    * Diğer birçok küçük değişiklik ve bug düzeltmeleri vardı.
*    **Şeyler ŞeylerERDDAP™Yöneticilerin Bilme ve Yapması Gerekiyor:** 
    *    **Güvenli olmak için en son sürüme güncellemek için.**   
        ERDDAP™Bir güvenlik denetimi uygulandı. Bazı böcekler ve zayıflıklar vardı. Version 1.44, güvenlik ve erişilebilirliği artırmak için birkaç önemli güvenlik otobüsü ve birkaç değişiklik içerir (e.g., görme engelli kullanıcılar için) . Version 1.44, takip güvenlik denetimini geçti. ABDGS ve Acunetix'deki tüm iyi insanlar sayesinde bunu mümkün kılan. (olmamalıdırNOAABunu yapmak mı?) 
    * Yeni The new[EDDTable From FromWFSDosyalar](/docs/server-admin/datasets#eddtablefromwfsfiles)Tüm verilerin yerel bir kopyasını bir andan yaparArcGISMapServerWFSsunucu ve böylece veriler daha sonra yeniden gözlemlenebilirERDDAP™Kullanıcılar. Christy Caudill sayesinde.
    * Yeni The new[EDDTable From FromEDDGrid](/docs/server-admin/datasets#eddtablefromeddgrid)Bir EDDTable veri kümesi oluşturmanıza izin verinEDDGriddataset. Bunu yapmak için bazı ortak nedenler şunlardır:
        * Bu, veri kümesinin queried olmasını sağlarOPeNDAPSeçim kısıtlamaları (Hangi bir kullanıcı talep edilebilir) .
        * Dataset doğal olarak bir tabular veri kümesidir. OOICI sayesinde Jim Potemra, Roy Mendelssohn.
    * Değişken adı "derinlemesine" artık "altitude" için özel bir alternatiftir. Birimler "metrelerin" bazı varyantları olmalıdır. Veri değerleri pozitif =down olmalıdır.ERDDAP™Şimdi “ derinlemesine” kelimesinin tam olarak farkındadır ve her yerde yükseklik destekleniyor (e.g., bir CF DSG cdm\\_data\\_type= profil dataset) . Bir veri kümesi hem "derinlemesine" hem de "altitude" değişkenlerine sahip olmamalıdır.
    * Sizin içindatasets.xmlLütfen herhangi bir kullanımını ortadan kaldır&lt;Adı="cdm\\_altitude\\_proxy"&gt; derinlemesine&lt;/att&gt; derinlik artık yüksekliğe özel bir alternatiftir ve bu yüzden özel olarak tanımlanması gerekmez.
    * Sizin içindatasets.xmlLütfen herhangi bir kullanımını ortadan kaldır&lt;yükseklikMetersPer SourceUnit&gt;, EDDTable dışında From From From From From From From From From From From From From From From From From From From From From From From From FromSOS.
Değer 1 olduğunda, sadece onu sil.
Değer ne zaman -1, değişken adı derinliğine değiştirmeyi düşünün.
Diğer değerler için, ekleyin&lt;addAttributes&gt; Örneğin,:
```
        <att name="scale\\_factor" type="float">-1</att>
```

    * Tüm veri setleri şimdi destekleniyor
        
        *   &lt;VarsayılanDataQuery&gt; .html herhangi bir sorgu talep edilmezse kullanılır.
            * Muhtemelen bunu nadiren kullanmanız gerekir.
            * griddap veri setleri için, bunun ortak bir kullanımı, farklı bir varsayılan derinlik veya yüksek çözünürlük değerini belirtmektir (E.g.,\\[0 0 0 0\\]Bunun yerine,\\[Son son son son\\]) .
Herhangi bir durumda, her zaman tüm değişkenleri listelemelisiniz, her zaman tüm değişkenler için aynı boyut değerlerini kullanmalıdır ve neredeyse her zaman kullanırsınız.\\[0 0 0 0\\],\\[Son son son son\\]Ya da\\[0:last\\]Boyut değerleri için.
Örneğin:
```
                <defaultDataQuery>u\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\],v\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]</defaultDataQuery>
```

            * For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For FortabledapVeri setleri, bunun en yaygın kullanımı farklı bir varsayılan zaman aralığı belirtmektir (Şimdiye kadar, e.g., &time&gt;=now-1day) .
Hiçbir veri değişkenini talep etmenin tüm veri değişkenlerini belirttiği gibi aynı olduğunu unutmayın, bu yüzden genellikle yeni zaman kısıtlamasını belirtebilirsiniz.
Örneğin:
```
                <defaultDataQuery>&amp;time&gt;=now-1day</defaultDataQuery>
```

        *   &lt;varsayılan GrafQuery&gt;, eğer .graph soru sormazsa kullanılır.
            * Muhtemelen bunu nadiren kullanmanız gerekir.
            * griddap veri setleri için, bunun en yaygın kullanımı, farklı bir varsayılan derinlik veya yükseklik değeri değeri değeri belirtmektir. (E.g.,\\[0 0 0 0\\]Bunun yerine,\\[Son son son son\\]) ve / veya belirli bir değişkenin grafiklendiğini belirtmek.
Her durumda, neredeyse her zaman kullanırsınız\\[0 0 0 0\\],\\[Son son son son\\]Ya da\\[0:last\\]Boyut değerleri için.
Örneğin:
```
                <defaultGraphQuery>temp\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]&amp;.draw=surface&amp;.vars=longitude|latitude|temp</defaultGraphQuery>
```

            * For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For FortabledapVeri setleri, bunun en yaygın kullanımları grafiklenmesi için farklı değişkenleri belirtmektir, farklı bir varsayılan zaman aralığı (Şimdiye kadar, e.g., &time&gt;=now-1day) ve / veya farklı varsayılan grafikler ayarları (e.g., işaret tipi) .
Örneğin:
```
                <defaultGraphQuery>longitude,latitude,seaTemperature&amp;time&gt;=now-1day&amp;.marker=1|5</defaultGraphQuery>
```

XML-encode veya yüzde-encode ihtiyacınız olduğunu unutmayın (Ya da, ama ikisi de değil) XML belgesinde olduklarından beri varsayılan sorgular. Örneğin, & olur;amp; ,&lt;Veamp;lt; ve &gt; olur &amp;gt;
Ve lütfen işinizi kontrol edin. Bir hata yapmak ve istediğiniz şeyi elde etmek kolaydır.
Charles Carleton, Kevin O'Brien, Luke Campbell ve diğerleri sayesinde.
    *   EDDGridFromDap,EDDGridErddap ve EDDTable FromEDDGridSık sık değişen verilerle uğraşmak için yeni bir sistem var (Genellikle her 0,5 s) . Aksine farklı aksine farklı farklı farklı farklı farklı farklı farklı farklı farklı şekilde farklı farklı farklı farklı farklı farklı şekilde farklı farklı farklı şekilde farklı farklı farklı şekilde farklı farklı farklı farklı farklı şekilde farklı farklı farklı farklı şekilde farklı farklı farklı farklı farklı farklı farklı farklı şekilde farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı şekilde farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı şekilde farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı şekilde farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklı farklıERDDAPHer veri kümesini tamamen yeniden yükleme için düzenli, proaktif sistem, bu opsiyonel ek sistem reaktifdir (Bir kullanıcı isteği tarafından başlatılan) ve arter (Sadece güncellenecek bilgileri güncelleyin) . Örneğin, bir istek bir istek varsaEDDGridFromDap dataset, son güncellemeden bu yana belirtilen sayıda milisaniyeden daha fazla oluşur.ERDDAP™Sol en çok yeni değerler olup olmadığını görecek. (Genellikle genellikle genellikle genellikle genellikle"time") Boyut ve, eğer öyleyse, sadece kullanıcının isteğini işlemeden önce bu yeni değerleri indirin. Bu sistem, veri kaynağındaki minimum taleplerle hızla değişen bir veri kümesi tutmakta çok iyidir, ancak bazı kullanıcı taleplerinin işlenmesini biraz yavaşlamakta. Görsün&lt;HerNMillis&gt; (/docs /server-admin/datasets #update allnmillis)   
Michael Barry ve OOICI sayesinde.
    *   EDDGridFromNcFiles, EDDTable FromNcFiles, and EDDTable FromNcCFFiles now support[NcML.ncml ml ml](/docs/server-admin/datasets#ncml-files)kaynak dosyaları yerinde.ncdosyaları. Jose B Rodriguez Rueda sayesinde.
    * For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For ForEDDGridAggregateExistingDimension,ERDDAP™SunucuType özellikleri için yeni bir sunucuType="dodsindex" seçeneği destekler&lt;sourceUrls&gt; etiketi. Bu, dosyaları listeleyen web sayfaları ile çalışır&lt;&gt; pre&gt;&lt;/pre&gt; ve çoğu zaman altındaOPeNDAPlogo. Bir örnek bir örnektir.[ https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html ](https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html).
    * EDDTable FromSOSŞimdi opsiyonel bir etiket destekler
```  
        <sosServerType>_serverType_</sosServerType>  
```
Bu yüzden türü belirtebilirsinizSOSserver sunucusu (Bu yüzdenERDDAP™Bunu anlamak zorunda değil) . Geçerli değerlerin geçerli değerleri&lt;_serverType_\\&gt; IOOS\\_NDBC, IOOS\\_NOS,OOSTethysVe WHOI (Yeni desteklenen bir sunucu Tipi Tipi Tipi Tipi) . See See See See[EDDTable From FromSOS](/docs/server-admin/datasets#eddtablefromsos). Derrick Snowden ve Janet Fredericks sayesinde.
    * Bütün HepsiEDDGridFrom...Files, EDDTable From...Files,EDDGridKopyalama ve EDDTable Kopyalama şimdi opsiyonel bir etiket destekler
```
        <fileTableInMemory>true</fileTableInMemory> (The default is false.)  
```
Hangisi söyleyebilirERDDAP™Dosyayı tutmak için Masa (Her kaynak veri dosyası hakkında bilgi) bellek yerine sadece disk üzerinde (varsayılan varsayılan) . FileTable'ü hafıza hızlarında tutmak veri talepleri için (Özellikle &gt;1000 kaynak veri dosyaları varsa) Ancak daha fazla hafıza kullanır. Bunu herhangi bir veri kümesi için doğru ayarlarsanız, hafızada bir göz tutun: şu anda _yourDomain_/erddap/status.htmlBunu sağlamak içinERDDAP™Hala birçok ücretsiz hafızaya sahiptir. Fredrik Stray sayesinde.
    * EDDTable FromASCIIFiles şimdi destekleniyor&lt;karset&gt;. En yaygın iki karset (Dava hassas&#33;) ISO-8859-1 (varsayılan varsayılan) UTF-8.
    * Önerilen: Kurulum.xml içinde, içeride&lt;HeadHt ml&gt;, lütfen değişim&lt;html&gt; içine
        &lt;html lang="en-US"&gt; (Ya da farklı[dil kodu](https://www.w3schools.com/tags/ref_language_codes.asp)Mesajları tercüme etmişseniz.xml) .
    * Kurulum.xml, parçalarını devre dışı bırakmak için yeni opsiyonel etiketlere sahiptir.ERDDAP:
        *   &lt;dönüştürücülerActive&gt;false&lt;/convertersActive&gt;&lt;&#33;- varsayılan gerçek --&gt;
        *   &lt;slideSorterActive&gt;false&lt;/slideSorterActive&gt;&lt;&#33;- varsayılan gerçek --&gt;
        *   &lt;wmsActive&gt;false&lt;/wmsActive&gt;&lt;&#33;- varsayılan gerçek --&gt; Genel olarak, bunlardan herhangi birini yanlış ayarlamaya karşı tavsiye ederiz.
    * GenrateDatasets X ml şimdi _bigParent Yöneticiy_/logs/generateDatasetsX mlLog.txt için sonuçları yazıyor.txt. Kristian Sebastian Blalid sayesinde.
    * GenrateDatasets X ml şimdi için iyi bir öneri yapar&lt;reload HerNMinutes&gt;. Teşekkürler teşekkürlerNOAAUAF projesi.
    * GenrateDatasetsXml için birçok küçük gelişme. Teşekkürler teşekkürlerNOAAUAF projesi.

## Version 1.42{#version-142} 
 (2012-11-26-26) 

*    **Yeni Özellikler:** 
    *    (Önemli yeni özellikler yok.) 
*    **Şeyler ŞeylerERDDAP™Yöneticilerin Bilme ve Yapması Gerekiyor:** 
    * Eğer yükseltme yapıyorsanızERDDAP™1.38 veya 1.40, yapılandırma dosyalarınıza değişiklikler yapmanızı gerektiren değişiklikler yoktu (Ancak yeni mesajları kullanmalısınız.xml dosyası) .
    *   ERDDAP™Bir kez daha birlikte koşabilirJava1.6. (ERDDAP™v1.40 gerekliJava1.7.) Hala son versiyonunu kullanarak şiddetle tavsiye ediyoruzJava1.7.
    * Yeni bir veri kümesi türü,[EDDTable From From AwsX mlFiles](/docs/server-admin/datasets#eddtablefromawsxmlfiles), verileri bir dizi Otomatik Hava İstasyonundan okuyabilirsiniz (AWS) XML veri dosyaları. Lynn Dewitt ve Exploratorium sayesinde.
*    **Küçük değişiklikler / Bug Fixes:** 
    * NDBC'ye değişiklikler için ayarlandıSOSkaynak veri sunucuları.
    * NOS COOPS ASCII hizmetlerine değişiklikler yapmak için ayarlandı.
    * Birkaç küçük değişiklik ve bug düzeltmeleri yaptı.

## Version 1.40{#version-140} 
 (2012-10-25-25) 

*    **Yeni Özellikler:** 
    * Yeni bir çıkış dosyası formatı var çünkütabledapdatasets:.ncTalep edilen verileri bir bakışta kurtaran CFMA,.ncHangi dosyaya uygun[Discrete Sampling Geometries](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Çok boyutlu Dizi seçenekleri ve bu nedenle NODC şablonlarına uygundur\\[2021: Şimdi[NCEI şablonları](https://www.ncei.noaa.gov/netcdf-templates)\\]Bu tür verileri depolamak için. NODC sayesinde.
    *   tabledapİstekler şimdi &time gibi zaman kısıtlamaları içerebilir&gt;now-5 gün. Görün bakalım,[Belge belgeleri](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now). James Gosling sayesinde.
*    **Şeyler ŞeylerERDDAP™Yöneticilerin Bilme ve Yapması Gerekiyor:** 
    * Eğer yükseltme yapıyorsanızERDDAP™1.38, yapılandırma dosyalarınıza değişiklikler yapmanızı gerektiren değişiklikler yoktu (Ancak yeni mesajları kullanmalısınız.xml dosyası) .
    *   ERDDAP™Halk yayınları ve iç kilometreler aracılığıyla kullanılabilir[ERDDAP™GitHub](https://github.com/ERDDAP). Daha fazla bilgi için, bakınız[Wiki Wiki Wiki](https://github.com/ERDDAP/erddap/wiki)ÇünküERDDAP™Proje ayrıca daha genel olarak[ERDDAP™Programr's Guide](/docs/contributing/programmer-guide). (Bu, birkaç hafta sonra ayrı duyuruldu.ERDDAP™1.38 sürüm.) 
    * GenrateDatasets X ml gelişmiştir.
        * Senaryo revize edildi, böylece tüm Linux bilgisayarlarında doğru çalışmalıdır (Sadece birkaç değil) .
        * Şimdi ekliyorcreator\\_name,creator\\_emailVecreator\\_urlMümkün olduğunda.
        * Diğer birçok küçük gelişme.
    * Nasıl pişmanlık duydu?ERDDAP™Zaman ile anlaşmalar.
        * İçsel olarak,ERDDAP™Şimdi milisan hassaslıkta zamanları ele geçiriyor (saniyeler değil) .
        * Şimdi belirli bir veri kümesi için zaman hassasiyetini belirtebilirsiniz, bakınız[time\\_precision](/docs/server-admin/datasets#time_precision). Örneğin, tarih hassaslığı ile zaman değerlerini görüntülemek için bir veri kümesi ayarlayabilirsiniz (e.g., 1970-01-01) .
        * Mevcut veri setleri varsayılan ayarları kullanacak, bu yüzden bu değişikliklerden etkilenmezler ve saniyeler hassasiyetle zaman göstermeye devam edecekler. Servet Cizmeli ve Philip Goldstein sayesinde.
    *   [EDDTable FromNcCFFiles](/docs/server-admin/datasets#eddtablefromnccffiles)Sizin kullanabileceğiniz yeni bir veri kümesi türüdürdatasets.xmlDosya. Veriler, tanımlanan sayısız dosya formatlarından herhangi birinden okuyabilirsiniz.[CF Discrete Sampling Geometries](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Kongreler. Kyle Wilcox sayesinde geçerli DSG dosya formatları için örnek dosyaları yapmak ve bunları halka açık olarak sunmak için NODC ve özel teşekkürler.
*    **Küçük değişiklikler / Bug Fixes:** 
    * Genişledi[HızlıRestart](#quick-restart)Tüm ilgili sistemeEDDGridve EDDTable alt sınıfları.
    * Geliştirilmiş dokümanlar, özellikle nasıl kullanılacağıyla ilgili[network](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType)ve[tabledap](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#fileType)Çeşitli müşteri yazılımlarından.
    * Zaman ve / veya maxTime'ı desteklemek için gelişmiş arama, ikinci olarak ifade etti. Lynn Dewitt sayesinde.
    * Değiştirilmiş Değişim.htmlTableLinkler olarak URL ve e-posta adreslerini görüntülemek için çıktı.
    * "rel=" ve "rev=" alakalı&lt;Bir href&gt; etiketler. Pat Cappelaere sayesindeOGC RESTProje.
    * Gerçek olmayan büyük veri isteklerine karşı gelişmiş koruma, özellikle içeridetabledapDaha zor bir problem nerede.
    * Mesajlara daha fazla mesaj at.xml.
    * Yapılan hız iyileştirmeleri.
    * Sabit SabitEDDGridUygarlardan axlara izin vermek için. Maricel Etchegaray sayesinde.
    * IGoogle'a kaldırıldı çünkü durdurulacaktır.
    * Birkaç küçük değişiklik ve bug düzeltmeleri yaptı.

## Version 1.38{#version-138} 
 (2012-04-21-21) 

*    **Yeni Özellikler:** 
    * ISO 19115 ve FGDC -ERDDAP™Her veri kümesi için ISO 19115 ve FGDC XML metadata dosyaları oluşturabilir. dosyaların bağlantıları her veri setlerinin listesinde görünür (E.g., Full Text Search) Ayrıca Web Accessible Folders'da (WAF)   (Görmeyi gör[FGDC WAF](https://coastwatch.pfeg.noaa.gov/erddap/metadata/fgdc/xml/)ve[ISO 19115 WAF](https://coastwatch.pfeg.noaa.gov/erddap/metadata/iso19115/xml/)) . Ted Newsmann sayesinde Dave Neufeld ve diğerleri.
    * Full Text Searches for Datasets now support \\-__excludedWord_ ve \\-"_ dışlanmış cümle_" . Rich Signell sayesinde.
    * Veri setleri için aramalar şimdi bir seferde bir sayfa döndürür. Varsayılan parametre dizesini kullanır: sayfa=1&itemsPerPage=1000, ancak isteğinizin URL'sinde değerleri değiştirebilirsiniz. Steve Hankin ve UAF projesi sayesinde.
    *   OpenSearch–ERDDAP™Şimdi şimdi destekleniyor[OpenSearch1.1](https://coastwatch.pfeg.noaa.gov/erddap/opensearch1.1/index.html)Datasets aramak için standart. Diğer şeyler arasında, bu, katalog aggregation web sitelerinin dağıtılmış arama yapmasını sağlar (Her kataloga bir arama isteği aktarın, bildiği her kataloga) .
    * Comma Ayrılandı Değer Değer Değer Değer Değer Değer Değer Değer Değer Değer Değer Değer (Kataloğu) dosyalar –ERDDAP™Şimdi, değerler arasında sadece bir komün ile CSV dosyaları üretir (Hangi Excel tercih eder) Bunun yerine koma+space. Jeff deLaBeaujardiere sayesinde.
    * Milyon Datasets – Çeşitli değişiklikler desteklemek için yapıldıERDDAPÇok sayıda veri kümesine sahip olmak, belki de bir milyon bile. Steve Hankin ve UAF projesi sayesinde.
*    **Şeyler ŞeylerERDDAP™Yöneticilerin Bilme ve Yapması Gerekiyor:** 
#### Hızlı Restart{#quick-restart} 
*   [A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A](#quick-restart)Hızlı yeniden başlatma sistemi izin verirERDDAP™Çok daha hızlı yeniden başlamak için.
     **Lütfen bunu kurulumunuza ekleyin.xml file** sağdan sonra&lt;/datasetsRegex&gt;:
```
              <!-- If true, when you start up ERDDAP™, some types of datasets (e.g., 
              EDDGridFromDap) will used cached information (.dds, .das, etc.) to reload
              very quickly, without contacting the remote server.  The dataset's age 
              will be based on when the dataset was reloaded last.  Normally this 
              should be true (the default), but set it to false if you want to bypass 
              the cached information.
              <quickRestart>true</quickRestart>
```

    * Datasets için tam metin aramaları şimdi Lucene arama motoru ile yapılabilir (Orijinal arama motoru tavsiye etsek de 10.000'den daha az veri kümesiniz varsa) veya orijinal arama sistemi.
         **Lütfen bunu kurulumunuza ekleyin.xml file** sağdan sonra&lt;/displayDiagnosticInfo&gt;:
```
              <!-- ERDDAP™ lets you choose between two search engines for full text searches:
              \\* original (the default) -- is the best choice if your ERDDAP™ has fewer 
                than about 10,000 datasets.  It is very robust and trouble free. 
              \\* lucene -- is the best choice for more than about 10,000 datasets.
                The advantages are that with any number of datasets it works fast 
                and uses very little memory.
                But there are many things that might go wrong with individual 
                queries and with the whole system. 
                And although its behaviour (the datasets it finds and the order that
                it ranks them) is almost identical to the original search engine,
                it has a few quirky, subtle, small differences.
              -->
              <searchEngine>original</searchEngine>
```

    * Kurulumda.xml, şimdi iki yeni kategoriyi komünalize listesine ekleyebilirsiniz.&lt;categoryAttributes&gt;:
        * Global:keywords (Bunu hemen globalden sonra ekleyin:) - Her anahtar kelime için ayrı bir giriş yapmak için küresel anahtar kelimelerden gelen bir övgü listesi.
        * değişken değişken değişken değişken değişken Name Name Name Name Name Name Name Name Name Name Name (Bunu sonunda ekleyin) - her birini kategorize eden yeni bir özel durumdataVariable destinationNames.
    * Kurulumda.xml, yapabilirsiniz (Ama neden?) SöyleERDDAP™FGDC ve / veya ISO 19115 herhangi bir veri kümesi için metadata sunmak
```
        <fgdcActive>false</fgdcActive>  
        <iso19115Active>false</iso19115Active>
```

Bu ayarlar için varsayılan değerler doğrudur.
    * In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In Indatasets.xmlLütfen metadata'yı veri setleriniz için geliştirmeyi düşünün.ERDDAP™Şimdi otomatik olarak ISO 19115 ve FGDC XML metadata dosyaları veri setinin metadatasına dayanan.
Yani, **İyi dataset metadata iyi gidiyorERDDAP- ISO 19115 ve FGDC metadata'yı yarattı.**   
         **Birçok yeni RECOMMENDED için yeni belgeleri görün[Global Attributes](/docs/server-admin/datasets#global-attributes).** 
    * In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In Indatasets.xmlAma söylemek istiyorsanERDDAP™FGDC ve/veya ISO 19115 dosyasını kullanmak yerine sunucunun dosya sisteminde bir yerdedir.ERDDAP™Bu dosyaları üretir, kullanır:
```
        <fgdcFile>_fullFileName_</fgdcFile>  
        <iso19115File>_fullFileName_</iso19115File>
```
Eğer _fullFileName_\\="" veya dosya bulunamadıysa, veri kümesi FGDC ve / veya ISO 19115 metadata olmayacak. Bu, FGDC ve / veya ISO 19115 metadata'yı belirli bir veri kümesi için bastırmak istiyorsanız de yararlıdır.
    * In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In Indatasets.xmlHer şey içinEDDGridSide TarafındanSide veEDDGridAggregateExistingDimension datasets, çocuğun veri kümelerinin farklı olduğunu emin olun.datasetIDEbeveynler veri kümelerinden ve diğer çocuklardan daha fazlası. (Örneğin, George Foreman'ın çocuklarını adlandırmak için basit ama etkili bir sistemi takip edebilirsiniz.) Bir ailedeki herhangi bir isim tam olarak aynıysa, veri kümesi yüklenemez (Kombine edilen eksenlerin değerlerinin sıralanmış bir düzen olmadığı hata mesajı ile) .
    * In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In Indatasets.xmlAncak geçerliliğin listesine bazı değişiklikler vardı.ioos\\_categorymetadata değerleri:
        * "pCO2" "CO2" olarak değiştirildi.
        * "Physical Oceanography" eklendi.
        * "Soils" eklendi.
    * In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In Indatasets.xml,ERDDAP™Artık ‘.’ aya izin vermez.datasetID. İzin verildi ama cesaretliydi. (Üzgünüm) 
    * In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In Indatasets.xmlEDTable için kurulumThreddsFiles ve EDDTable FromHyraxDosyalar biraz değişti çünkü her iki sınıf daha verimli olmak için yeniden yazıldı (Her iki sınıf şimdi her zaman tüm uzak veri dosyalarının yerel bir kopyasını yapar) . Bu sınıfları kurmak için belgeleri görün:[EDDTable From FromHyraxDosyalar](/docs/server-admin/datasets#eddtablefromhyraxfiles)ve[EDDTable FromThreddsFiles](/docs/server-admin/datasets#eddtablefromthreddsfiles). Özellikle, revize edilmiş yorumları görmek&lt;fileDir&gt; (Şimdi alakasız) ve&lt;sourceUrl&gt; &gt; &gt; &gt; (Şimdi şimdi gerekli temel) . Ayrıca, bu sınıfı EDTableCopy'de verimlilik için asla sarmamalısınız.
    * In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In Indatasets.xmlEğer EDDTableFromDatabase kullanıyorsanız bir an ileOracleVeritabanı, bir bağlantı içermelidir Emlak gibi
```
        <connectionProperty name="defaultRowPrefetch">4096</connectionProperty>  
```
Bir seferde getirmek için kaç satır veri sırasını belirtmek için, varsayılan 10, bu çok verimsiz. Bakın,[OracleBelge belgeleri](https://docs.oracle.com/cd/B10501_01/java.920/a96654/basic.htm). MySql ve PostgreSQL bu ayar için daha iyi varsayılanlara sahip görünüyor. Kevin O'Brien sayesinde.
    * EDDTableFromDatabase kullanıyorsanız, geliştirilmiş olanı görün["Speed" belgeleri](/docs/server-admin/datasets#eddtablefromdatabase)Performansı geliştirmek için ek öneriler için. Kevin O'Brien sayesinde.
    * In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In Indatasets.xmlTüm EDDTable için... veri setleri, Sözleşmelerde veMetadata\\_ConventionsGlobal özellikler, lütfen CF-1.6'ya atıfta bulun (CF-1.0, 1.1, 1.2, 1.3, 1.4 veya 1.5 değil) CF-1.6, Discrete Sampling Geometry ile ilgili değişiklikleri içerecek ilk sürümdür.
    * Programcılar, bu,ERDDAP™Kod, javac ve java komut hattı yollarında jar dosyaların listesine kütüphane/lucene-core.jar eklemek gerekir.
    *   ERDDAP™Birine sahip[Yeni hizmet hizmeti](https://coastwatch.pfeg.noaa.gov/erddap/convert/keywords.html)Bir GCMD Bilim Anahtar Kelimesi'nden bir CF Standard Name'ı dönüştürmek. Global anahtar kelimeler metadata'yı sizin veri setleri için oluştururken bu faydalı bulabilirsinizERDDAP.
    * Bots ile anlaşma - Lütfen bu tavsiyeyi okuyun[Botların taramasını önlemekERDDAP™Aptal bir şekilde](/docs/server-admin/additional-information#robotstxt).
    * Çeviri - Metin ÜzerineERDDAP" web sayfaları şimdi çoğunlukla mesajlarda.xml ve bu yüzden farklı diller için çeviri için uygun (E.g., Alman, Fransız) . Mesajlar şimdi sıklıkla metin oluşturmak için MesajFormat'ı kullanır, ayrıca çeviriler yapmak için yardımcı olur. Bir çeviri yapmak ilginizi çekiyorsanız lütfen e-postaerd dot data at noaa dot gov.
    * Örnek Örnek Örnek Örnek Örnek Örnek Örnek Örnekdatasets.xml– Numunede birkaç küçük ama önemli hata vardıdatasets.xml. Bu veri kümelerini kullanırsanız, yeni örneklemelerden yeni sürümler alındatasets.xmlYeni erddapContent.zipDosya. James Wilkinson sayesinde.
    * Git - Zor yapmaya çalışacağımERDDAP™Bu sürümden sonra bir GitHub projesi ASAP.
*    **Küçük değişiklikler / Bug Fixes:** 
    * Yeni bir palet, OceanDepth, derinlik değerleri için faydalıdır (Olumlu aşağı) E.g., 0 (sığ sığ sığ sığ) 8000 ila (Derin derin derin derin derin derin derin) .
    * The The The The The The The The.kmlÇıktıdan çıktıtabledapDaha iyi bir işaret ikonağı kullanır (Bu bulanık değil) . Ve bir işaretçinin üzerine yürümek artık onu daha büyük yapar.
    * EDDTable FromFiles - Son yükseltmede, yeni netcdf-java kütüphanesi değişken isimler için sıkı kısıtlamalar vardı..ncdosyaları. Bu, EDDTable için sorunlara neden oluyorsa değişkeninsourceNameBazı Noktalama karakterleri vardı. EDDTable FromFiles şimdi bu problemden kaçınmak için değiştirildi. Thomas Holcomb sayesinde.
    * .subset sayfası şimdi destekleniyor 0/10/100/1000/10000/100000, İlgili Veriler için bir çek kutusu yerine. Aracıtip, tarayıcınızın kazaya neden olabileceğini uyarır. Annette DesRochers sayesinde Richard (Abe) Coughlin ve IOOS Biyoloji Projesi.
    * ... /erddap /info /_datasetID_/index.html web sayfaları şimdi tıkılabilir bağlantılar olarak URL ve e-posta adreslerini gösteriyor. Richard'a teşekkürler (Abe) Coughlin ve IOOS Biyoloji Projesi.
    * Bug düzeltme: In Itg Fix: In ThetabledapAncak, yüksek irtifa ile veri kümeleri için MalzemelerPer SourceUnit&lt;0, yüksek kısıtlamalarla ilgili sorgular yanlış ele alındı. Kyle Wilcox sayesinde.
    * Bug düzeltme:EDDGridAggregate FromExistingDimension şimdi daha çeşitli TDS URL'leri destekliyor. Teşekkürler?

## Version 1.36{#version-136} 
 (2011-08-01) 

*    **Yeni Özellikler:** 
    * Bir kullanıcının bakış açısından önemli değişiklikler yoktur.
*    **Şeyler ŞeylerERDDAP™Yöneticilerin Bilme ve Yapması Gerekiyor:** 
    * The amelTao dataset that was often used as the sample dataset for thetabledap  
Belge artık mevcut değildir.ERDDAP™Yöneticiler bu değişiklikleri yapar:
        * Sizin içindatasets.xmlEğer biriniz varsadatasetID="pmelTao" dataset, add
Aktif="false "&gt;" bu çizginin sonunda.
        * Kurulumunuzda.xml, if your installation.xml&lt;EDDTableIdExample&gt; O zaman:
            * Eğer senindatasets.xmlBir veri kümesi yokdatasetID="erdGlobecBottle", add
```
                <dataset type="EDDTableFromErddap" datasetID="erdGlobecBottle" active="true">  
                  <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGlobecBottle</sourceUrl>  
                </dataset>
```
            * Kurulumnızda.xml, tüm etiketlerin değiştirilmesini&lt;EDDTableIdExample&gt; aracılığıyla
                &lt;EDDTableMatlabPlotExample&gt; ile birlikte
```
                <!-- Tabledap Examples
                This group of settings is used to make examples for the tabledap documentation 
                that appears at \\[baseUrl\\]/erddap/tabledap/documentation.html and elsewhere.
                If you include the erdGlobecBottle dataset in your datasets.xml (recommended), 
                you don't need to change these.
                If you don't, you MUST change these before you make your ERDDAP™ public; 
                otherwise, none of the examples will work!
                The new settings should be very similar to the defaults.
                If your ERDDAP™ won't serve any tabular datasets, use "NOT\\_APPLICABLE" for all of the entities.
                In .xml files like this, ampersand, lessThan, and greaterThan have to be 
                HTML encoded as "&amp;", "&lt;", "&gt;".
                -->
                <!-- This is the datasetID for an EDDTable dataset that is served by your ERDDAP.
                     This dataset is used as the basis for all of the EDDGrid examples below. 
                     Ideally, it is a dataset that has longitude, latitude, and time variables (among others). 
                     ('time' allows for making a time series graph. 'latitude' and 'longitude' allow for making a map.)
                     The dataset can have longitude values -180 to 180, or 0 to 360. -->
                <EDDTableIdExample>erdGlobecBottle</EDDTableIdExample>
                <!-- This is a comma-separated list of variables from the dataset.
                     It is useful if it is "longitude,latitude,time," plus a data variable name. -->
                <EDDTableVariablesExample>longitude,latitude,time,bottle\\_posn,temperature1</EDDTableVariablesExample>
                <!-- This is the constraints example which is appended to EDDTableVariablesExample. -->
                <EDDTableConstraintsExample>&amp;time&gt;=2002-08-17T00:00:00Z&amp;time&lt;=2002-08-19T20:18:00Z</EDDTableConstraintsExample>
                <!-- This is an example data query using an ISO-formatted time. 
                     You could generate your example via your dataset's Data Access Form in ERDDAP.  -->
                <EDDTableDataTimeExample>longitude,latitude,time,bottle\\_posn,temperature1&amp;time&gt;=2002-08-17T00:00:00Z&amp;time&lt;=2002-08-19T20:18:00Z</EDDTableDataTimeExample>
                <!-- This is an equivalent example data query, but which specifies time as seconds-since-1970-01-01. 
                     If you need to convert a date/time to "seconds since 1970-01-01", use
                     https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html -->
                <EDDTableDataValueExample>longitude,latitude,time,bottle\\_posn,temperature1&amp;time&gt;=1029542400&amp;time&lt;=1029788280</EDDTableDataValueExample>
                <!-- This is an example query which generates a graph. 
                     You could generate your example via your dataset's Make A Graph form in ERDDAP.  -->
                <EDDTableGraphExample>bottle\\_posn,temperature1&amp;time=2002-08-19T10:06:00Z&amp;.draw=lines</EDDTableGraphExample>
                <!-- This is an example query which generates a map. 
                     In the default mapExample, temperature1, time, bottle\\_posn are useful 
                     because they appear in GoogleEarth with the .kml example 
                     and are ignored by the other image file types. -->
                <EDDTableMapExample>longitude,latitude,temperature1,time,bottle\\_posn&amp;time&gt;=2002-08-13T00:00:00Z&amp;time&lt;=2002-08-20T00:00:00Z&amp;bottle\\_posn=1&amp;.draw=markers&amp;.marker=5|5</EDDTableMapExample>
                <!-- This is a Matlab example which uses data from the EDDTableGraphExample.
                     Note the Matlab notation datasetName.variableName.  -->
                <EDDTableMatlabPlotExample>plot(erdGlobecBottle.bottle\\_posn, erdGlobecBottle.temperature1)</EDDTableMatlabPlotExample>
```
                
    * Türün EDDTable'den bir alt sınıf olduğu veri setleri için, şimdi metadata'dan veri yapabilirsiniz.
Özellikle, şimdi orijinal değişkenlerden birinin özelliklerinden birinin özelliklerinden bir değişken yapabilirsiniz.
Örneğin, örneğin,datasets.xml, içinde&lt;dataVariable&gt; tag, eğer kullanırsanız
```
        <sourceName>variable:cruise:PI</sourceName>  
```
        ERDDAP™Yolcu değişkeninin PI özelliğinin değerleri ile değişken hale gelecektir.
WOD sayesinde.
*    **Değişiklikler:** 
    * Küçük değişiklikler

## Version 1.34{#version-134} 
 (2011-06-15) 

*    **Değişiklikler:** 
    * Bug düzeltme: 64-bitkide meydana gelen bir bellek sızıntıJavaKurulumlar.
    * Bug düzeltme:ERDDAP™Şimdi doğru, enlem boyutunun değerleri yüksekten düşük olduğunda bu küresel özellikleri ayarlar: geospatial\\_lat\\_min, geospatial\\_lat\\_max, Southernest\\_Northing, Northern most_Northing.
        
Not that Not that Note that Notactual\\_rangeDeğişmez: düşük, yüksek değerlere veya yüksek,düşük değerlere sahip olabilir, çünkü depolama alanını ve siparişini belirtmek amaçlanmıştır.
        
    * Küçük değişiklikler.
    *   ERDDAP™Yöneticilerin kurulumuna herhangi bir değişiklik yapması gerekmez.xml veyadatasets.xml.

## Version 1.32{#version-132} 
 (2011-05-20-20-20) 

*    **Değişiklikler:** 
    * Yeni onay için destek, CF Discrete Sampling Geometries (Ne yazık ki henüz online değil) Bu, önerilen CF Point Gözlem Sözleşmelerini değiştirir.
        ERDDAP™Kullanıcıların, cdm\\_feature\\_type=Station'ın Time serisi tarafından değiştirildiğini ve yaratılan dosyalar için küçük değişiklikler olduğunu görecekler..ncCF dosya türü (flat\\_dimension şimdi örnek olarak adlandırılır) .
        ERDDAP™Yöneticiler bu değişiklikleri bu değişiklikleri yapmak zorunda kalacaklardatasets.xml:
        * cdm\\_data\\_type=Station, cdm\\_data\\_type=TimeSeries için değiştirilmelidir.
        * cdm\\_data\\_type=StationProfile, cdm\\_data\\_type=TimeProfile için değiştirilmelidir.
        * cdm\\_station\\_variables, cdm\\_time Series\\_variables için değiştirilmelidir.
        * cf\\_role=station\\_id cf\\_role=time Series\\_id için değiştirilmelidir.
    * Yeni Yeni Yeni Yeni Yeni Yeni Yeniioos\\_categorySeçenekler: "Renkli Organik Madde", "pCO2", "Stream Flow", " Total Suspended".
    * 64-bit üzerinde olası bir bellek sızıntısına olası bir çözümJava.\\[Çalışmadı.\\]
    * Küçük değişiklikler.

## Version 1.30{#version-130} 
 (2011-04-29-29) 

*    **Yeni Özellikler:** 
    * 64-bit için destekJava. 64 bitinceJava,ERDDAP™Şimdi çok daha fazla heap hafızasını kullanabilir ve birçok eşzamanlı istekle başa çıkabilir.
    * Destek için Destek.ncDosya 2GB'ye kadar talep eder (64-bit olmadan bileJava) Daha iyi kullanım yoluylaERDDAP“Güclerde verilerin kullanımı.
    * Kod ve 2X hızlarında birçok 2X hız gelişmelerJava1.6ERDDAP™2X daha öncekinden 4X daha hızlı.
    * Hafıza kurtarma iyileştirmeleri önemli ölçüde daha düşükERDDAP“Temel hafıza kullanımı.
    * Prolar datasets için,ERDDAP™Artık bir veri kümesinin cdm\\_data\\_type'inin ve veri haritalarının CDM tipine tam olarak farkındadır. Bakın,[CF Discrete Sampling Geometriler spesifikasyon](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries). Belki bir gün yakında, bu Word dosyası .html'ye dönüştürülecek ve bu web sayfasında mevcut "OBSOLETE" bilgilerini değiştirecektir. Teşekkürler teşekkürlerNOAAUAF projesi.
    * Çoğu EDDTable veri setleri için, yeni bir çıkış dosyası türü seçeneği,.ncCF, Contigcious Ragged Dizi.ncEn son sürüme uygun dosyaları[CF Discrete Sampling Geometriler kongreleri](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries). Bu dosyalar veri kümesinin CDM verilerini yansıtacak şekilde yapılandırılmıştır. Önerilen kongreler sadece bu yazı olarak değiştirildiği için, netcdf-java kütüphanesi henüz oluşturulan dosya formatlarını okumaz.ERDDAPOnları CDM veri dosyaları olarak yorumlayın. Muhtemelen yakında olacak. Teşekkürler teşekkürlerNOAAUAF projesi.
    * View: .subset web sayfasındaki Distinct Data seçeneği, kullanıcıların en fazla sayıda farklı verilerin görüntülenmesini sağlayan bir düşüş listesidir. (varsayılan = 1000) . Bu değişim ve diğerleri, izinERDDAP™Farklı verilerin çok sayıda satırları olan veri setleriyle çalışmak. (Herhangi bir değişken için eşsiz değer sayısı hala bir konudur, ancak oldukça yüksek olabilir (20.000?) .subset ve diğer web sayfaları gerçekten yavaş yükler.) Teşekkürler teşekkürlerNOAAUAF projesi.
    * .subset web sayfalarının yeni bir seçeneği var: View Distinct Data Counts. GTOPP projesi sayesinde.
    * Kullanıcılara yardım etmek için, farklı değerler (E.g., istasyon isimleri) Şimdi Make-A-Graph ve Data Access Forms üzerinde gösteriliyor. Teşekkürler teşekkürlerNOAAUAF projesi.
    * .transmain Png şimdi tüm grafik ve veri temsillerini destekliyor. Sadece verileri çizer - hiçbir eksen, efsaneler, topraklark veya başka bir şey. Bu, görüntüleri şeffafPngs katmanları olarak yapmak mümkün kılar. If &.size=_ genişlik_|_height_ sorguda belirtilmiştir (önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen) O şereflidir. Varsayılan 360x360 pikseldir. Tek istisna,EDDGrid&.draw=surface, varsayılan nerede (Daha önce olduğu gibi) veri noktası için ~1 / script ile bir görüntü (3000 x ve y piksel) . Fred Hochstaedter sayesinde.
    * The The The The The The The TheWMSWeb sayfaları şimdi veri setinin değişkeni için renk çubuğu gösteriyor (s) . Emilio Mayorga ve diğerleri sayesinde.
*    **Şeyler ŞeylerERDDAP™Yöneticilerin Bilme ve Yapması Gerekiyor:** 
    * Bu sürüm birçok değişiklik içerir. Hepsi önemlidir. Lütfen sabırlı olun ve aşağıda listelenen tüm değişikliklerle çalışın.
    * Bu sürüm daha önce bazılarla uğraşmaktan daha önce itiliyorJavaGüvenlik böcekleri. Ne yazık ki, bunun için tasarlanmış birkaç özellik / ekERDDAP™sürüm bu sürümde değil. Üzgünüm. Umarım, bir sonraki sürüm nispeten yakında olacak (ve çok daha kolay yükseltmek için) .
    * Birkaç güvenlik böcekleri önlemek içinJava6 Güncelleme 23 ve aşağıda, indirme ve en son sürümü yüklemekJava  (Java6 Güncelleme 24 veya daha yüksek) . 64 bit işletim sistemi varsa, lütfen 64-bit bir sürüm alınJava.
    * Tomcat 5 kullanıyorsanız, Tomcat 6 veya 7'ye yükseltebilirsiniz (tercih tercih tercih tercih tercih tercih tercih tercih tercih tercih tercih tercih tercih tercih tercih tercih tercih tercih tercih tercih) . Tomcat 6 kullanıyorsanız, Tomcat versiyonuna yükseltmeyi düşünün 7.
    * Lütfen tüm talimatları takip edin[Yeni bir yeni kurmakERDDAP™](/docs/server-admin/deploy-install)Ancak bununla ilgili olarak, eski kurulumunuzdan yeni kuruluma kopyalayacaksınız, özellikle de yeni kuruluma.\\[tomcat\\]/content/erddap directory ve dosyaları. Bunun bir parçası olarak, dikkat edin[Yeni Tomcat kurulum önerileri](/docs/server-admin/deploy-install#tomcat).
    * Varsayılan erddap.css şimdi hata dosyasına dahil edilmiştir.
        * Varsayılan hataları kullanmak için, **silinir** Eski eski eski yaşlın\\[tomcat\\]/content/erddap/images/erddap.css .
        * Değiştirseydiniz\\[tomcat\\]/content/erddap/images/erddap.css ve kullanmaya devam etmek istiyorum: sadece yerinde bırakın ve yerini değiştirin ve yerini değiştir&lt;Giriş&gt; Bölüm:
```
            /\\* Small input items let more be shown on one screen  
            (esp. Chrome and Safari). Google Chrome and Safari have  
            default margin 2px, while others are 0. This sets all to 0.  
            .skinny is used e.g., for the buttons above the image on  
            a Make A Graph page. \\*/  
            input\\[type=button\\], input\\[type=submit\\], button {  
              margin:0px; padding:0px 3px; }  
            input\\[type=checkbox\\], input\\[type=password\\],  
              input\\[type=text\\], select, textarea {  
              margin:0px; padding:0px; }  
            input\\[type=radio\\] {margin:0px 2px; padding:0px; }  
            input.skinny {padding:0px 1px; }
```

    * Sizin için\\[tomcat\\]/content/erddap/setup.xml:
        * Yorumlar ve etiketlerle ilgili olarak değiştirin&lt;kısmiRequestMaxBytes&gt; ve&lt;kısmiRequestMaxCells&gt; ile birlikte
```
            <!-- When possible (and it isn't always possible),  
            ERDDAP™ breaks source data requests into chunks to  
            conserve memory. See the description of these tags in  
            messages.xml. You can override the default chunk sizes  
            here with  
            For grids:  
             <partialRequestMaxBytes>100000000</partialRequestMaxBytes>  
            For tables:  
             <partialRequestMaxCells>100000</partialRequestMaxCells>  
            \\-->
```
        * Yorumlari ilgili olarak değiştirmek&lt;categoryAttributes&gt; ve etiketin değerini değiştirmeyi düşünün:
```
            <!-- This is the comma-separated list (recommended:  
            in alphabetical order) of the global attribute and  
            variable attribute names which will be used to  
            categorize the datasets and shown to clients at urls  
            like .../erddap/categorize/ioos\\_category/index.html  
            (ioos\\_category is unusual, but is used at ERD).  
            If an attribute is a global attribute, identify it by  
            prefixing it with "global:".  
            \\-->  
            <categoryAttributes>global:institution, ioos\\_category,  
            long\\_name, standard\\_name</categoryAttributes>  
```

Bireysel Bireysel&lt;categoryAttributes&gt; Şimdi küresel nitelikler olan MUST, önceden belirlenmiş küresel olarak tanımlanır: (E.g., global:institution) . Diğer özellikler değişken nitelikler olarak kabul edilir (E.g.,standard\\_name) . Ayrıca, kurum değerleri (Tek olanlar) Orijinal durumda kaldı. Şimdi tüm kategori değerleri daha düşüklüğe dönüştürülür.
    * Sizin için\\[tomcat\\]/content/erddap /datasets.xml:
        * Big IMPROVED:ERDDAP™Bir tabu veri kümesinin cdm\\_data\\_type ile ilgili yeni gereksinimleri vardır. Muhtemelen, her veri kümesi MUST, cdm\\_data\\_type ile ilgili doğru metadata ve değişkenlere sahiptir. Değilse, veri kümesi yüklenemez ve bir hata atacaktır. Belgeleri görmek için[cdm\\_data\\_type](/docs/server-admin/datasets#cdm_data_type).
        * FYI: Yeni bir veri kümesi tipi var: EDDTable FromAsciiServiceNOS.
        * FYI: Üç yeni izin varioos\\_categoryseçenekler: Hidroloji, Kalite (e.g., kaliteli bayraklar için) Ve İstatistikler (E.g., yani) .
        * EDDTable From... Dosyalar datasets, any any any&lt;nDimensions&gt; etiketler. Artık gerekli veya kullanılmış değiller.
        * Değişkenler içindestinationName=altitude,ERDDAP™Artık kuvvet yoklong\\_nameAltitude olmak. Lütfendatasets.xmlVe defalarca arama&lt;destinationName&gt;altitude and add to that variable's&lt;addAttributes&gt;:
```
              <att name="long\\_name">Altitude</att>  
```
             (veya biraz farklılong\\_nameÖzel durumlarda özel durumlarda) .
        * Seçmeli: All EDDTable FromFiles subclasses support variable[sourceName=global:...](/docs/server-admin/datasets#global-sourcenames)Küresel metadata'yı her dosyadan bir veri değişkenine dönüştürmek. Lynn DeWitt sayesinde.
    * EDDTableFromDatabase kullanıcıları -ERDDAP™Postgres için yeni bir JDBC 4 sürücü ile geliyor. Diğer veritabanı için, veritabanınız için en son JDBC .jar dosyasını kontrol edin. O zamandan beriERDDAP™Şimdi kullanımları kullanınJava1.6+, JDBC 4 (3 değil 3) Muhtemelen önerilir.
    * FYI
        *   EDDGridFrom...Files and EDDTable From... Files datasets now store the fileTable information in the file
            \\[Büyük Parent Yönetmeny\\]/dataset Bilgi / Bilgi / Bilgi\\[datasetID\\]/\\*.ncdosyaları.
Ayrıca, EDDTable veri setleri şimdi alt başlangıç bilgilerini depolar
            \\[Büyük Parent Yönetmeny\\]/dataset Bilgi / Bilgi / Bilgi\\[datasetID\\]/\\*.ncdosyaları. Bu dosyalar eskiden
            \\[Büyük Parent Yönetmeny\\]/dataset Bilgi / Bilgi / Bilgi\\[datasetID\\].\\*.jsondosyaları.
Eski dosyalar otomatik olarak silinecektirERDDAP™Başlayın. Ya da tüm dosyaları silebilirsiniz (Ama boş alt yönlendirmeleri bırakın) in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in\\[Büyük Parent Yönetmeny\\]/datasetInfo/.
        * Önerilen, yeni CF Point Gözlem Konvansiyonları kullanarak yerel ve uzaktan dosyaların verilerini okuyacak yeni bir EDDTable FromNcCFFiles üzerinde çalıştım. Ama bu sürümde değil. Bu dosyaları okumak için bazı yöntemlerle ilgili netcdf-java kütüphanelerinde sorunlar var. Ve önerilen CF Point Gözlem Konvansiyonları için bazı son değişiklikler vardı. Netcdf-java kütüphanesi en son teklif için düzeltildiğinde, bu konuda çalışmaya devam edeceğim.
        * Koşu KoşuERDDAP™Windows’da sorunlar olabilir: özellikle, görebilirsiniz\\[BüyükParentYönetmen /loglar /log.txt dosyası,ERDDAP™Bazen dosyaları çabuk silemez ve / veya yeniden adlandırmaz. Bu, antivirüs yazılımı nedeniyle (E.g., McAfee ve Norton) Hangi dosyaları virüsler için kontrol eder. Eğer bu sorunla karşılaşırsanız (Bu, girişte hata mesajları tarafından görülebilir.txt dosyası gibi "Unable to delete ...") Ancak antivirüs yazılımının ayarlarını değiştirmek kısmen sorunu hafifletebilir.
EğerERDDAP™Windows'da sadece masaüstünde çalışan bir test, bu sadece rahatsız edici.
EğerERDDAP™Windows'ta sizin halkınızERDDAP™Linux sunucusuna geçiş yapmayı düşünün.
    * Yavaş İlk Startup – İlk kez çalıştırıyorsunERDDAP™Yükseltdikten sonra,ERDDAP™Veri setlerini yüklemek yavaş olabilir. YolERDDAP™Komplike dosyaları hakkında mağaza bilgileri değişti, bu yüzdenERDDAP™Tüm bu dosyalardan bazı bilgileri yeniden hazırlamanız gerekecek. Bu zaman alacak.
    * Startup'da hata - cdm\\_data\\_type ile ilgili değişiklikler göz önüne alındığında, bazı veri setlerinizin yükleyemeyeceği ve hataları atacağı muhtemeldir. Günlük Raporu e-postasını dikkatlice okuyunERDDAP™gönderirken size gönderirkenERDDAP™Başlıyor. Bu yüklememiş bir veri setleri listesine sahip olacak (En üstte) Ve onların yükledikleri sebep (Altın yakınında) .
    * Sıkıştıysanız veya başka sorularınız varsa, ayrıntıları bana e-posta:erd.data at noaa.gov.
    * Programcılar – Eğer yazarsanızJavaTakip eden programlarERDDAP™Kod, komut satırı parametre referanslarından bazılarını değiştirmeniz gerekir:
        * joda-time-1.6.2.jar to joda-time. jar jar jar
        * Postgres JDBC .jar reference to postgresql.jc.jar
*    **Küçük Değişiklikler ve Bug Fixes:** 
    
    * Takfil ipliklerden kaçınmak için geliştirilmiş bağlantı.
    * Neredeyse aynı istekleri daha verimli bir şekilde işlemek için iyileştirici uygulamalar.
    *   ERDDAP™Şimdi netcdfAll-4.2 kullanır.jar (NetcdfAll-latest'e yeniden isimlendi. jar jar jar) . Bu, birkaç içsel değişikliği gerekli hale getirdi ve birkaç küçük dış değişikliğine neden oldu, e.g., aptalca dosyaların nasıl okunduğunu ve küçük değişikliklerin nasıl okunduğunu ve küçük değişiklikler olduğunu değiştiriyor..ncHeader çıktı.
    * Yeni özellik:\\[erddap\\]/convert /fipscounty.html dönüştürülürFIPSilçe kodları / ilçe isimleri.
    * haritalarda, devlet sınırları şimdi karanlık violet, bu yüzden tüm arka renklerde daha iyi duruyorlar.
    * Tabular.kmlTekrar işaret noktaları için bir dairesel simge kullanır (Uçak ikonu değil Google son zamanlarda Google'a geçti) .
    * HedCalcofi veri setleri yeniden düzenlenmiştir ve şimdi yerel dosyalardan servis edilir (Daha hızlı daha hızlı) .
    * GenrateDatasets X ml'den Thredds Kataloğu şimdi bir sonuç dosyası oluşturur:
        \\[tomcat\\]/webapps /erddap /WEB-INF /temp /EDDGridThreddsCatalog.xml . Kevin O'Brien sayesinde.
    * GenrateDatasets X ml'den Thredds Kataloğu şimdi kaynak URL'lerden gereksiz port numaralarını kaldırmaya çalışır (e.g.,:8080 ve:8081 bazen kaldırılabilir) . Teşekkürler teşekkürlerNOAAMerkezin güvenlik ekibi.
    * .subset web sayfaları için, Distinct Data haritası artık değişken bir lat lon aralığına sahiptir.
    * Birkaç liste içindeERDDAP™  (e.g., tüm veri kümelerini gösteren masa) A.Z bir daha önce sıralandı..z. Şimdi bir durumda hassas bir şekilde sıralıyorlar.
    * .subset web sayfalarına küçük değişiklikler: birimler şimdi belirtilmektedir.
    * GenrateDatasets X ml ve DasDds artık sonuçları sistem klibine koyamaz veya InBrowser'i gösteremeyen bir istisna atmıyor. Eric Bridger ve Greg Williams sayesinde.
    * Bug düzeltme: Datasets yüklenirken,ERDDAP™Şimdi geospatial global özellikleri ortadan kaldırır veya ayarlar. Charles Carleton sayesinde.
    * Bug düzeltme: String2.getClassPath () Şimdi sınıfları doğru düzgün bir şekilde kodlayın Yol Yolu (Özellikle, Windows'da, dosya adındaki boşluklar% 20 olarak ortaya çıktı) . Bu etkilenenERDDAP™EDStatic, SSR'yi çağırıyor () ve içerik/erddap bulmak. Abe Coughlin sayesinde.
    * Bug düzeltmesi: EDDTableFromFiles,DataForDapQuery'nin farklı kullanımlarını sağlamakla ilgili () Talepler. Eric Bridger sayesinde.
    * Bug düzeltme:tabledapİstekler, dataset'in yüksek irtifa kısıtlamalarında düzgün bir şekilde ele almadı MalzemelerPer SourceUnit oldu -1. Eric Bridger sayesinde.
    * Bug düzeltme: EDDTable From... Files datasets now right handle requests which include =NaN ve &#33; =NaN.
    
## Version 1.28{#version-128} 
 (2010-08-27) 

*    **Yeni Özellikler:** Hiçbir şey.
*    **Şeyler ŞeylerERDDAP™Yöneticilerin Bilme ve Yapması Gerekiyor:** Hiçbir şey.
*    **Bug Fix:** Bir programlama hatası düzeltme (Sadece 1.26) Bunu yaptıERDDAP™Çok yavaş.
     

## Version 1.26{#version-126} 
 (2010-08-25) 

*    **Yeni Özellikler:** Hiçbir şey.
*    **Şeyler ŞeylerERDDAP™Yöneticilerin Bilme ve Yapması Gerekiyor:** 
    * sizden\\[tomcat\\]/content/erddap/setup.xml,
        * In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In&lt;yasal&gt;, aşağıda yeni bir çizgide\\[standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart standart DataLicenses\\]ekleyin,\\[standartİletişim\\].\\[standartİletişim\\]Yemin ederim,&lt;adminEmail&gt; Kurulumda daha yüksek belirtilmiştir.xml.
        * Kaldırın&lt;MasaCommonBG Color&gt; ve&lt;tableHighlightBG Color&gt;.
        * Önerilen: Change Change Change Change Change&lt;endBodyHtml&gt; to
```
            <endBodyHtml><!\\[CDATA\\[  
            <br>&nbsp;  
            <hr>  
            ERDDAP, Version &erddapVersion;  
            <br><a href="&erddapUrl;/legal.html">Disclaimers</a> |  
            <a href="&erddapUrl;/legal.html#privacyPolicy">Privacy Policy</a> |  
            <a href="&erddapUrl;/legal.html#contact">Contact</a>  
            </body>  
            \\]\\]></endBodyHtml>
```

    * Gerekli: Senin için\\[tomcat\\]/content/erddap/images/erddap.css and erddapAlt.css, add at the alt:
```
        /\\* This is used on the /info/\\[datasetID\\]/index.html pages to highlight a row or cell. \\*/  
        tr.highlightBGColor {background-color:#cceecc; }  
        td.highlightBGColor {background-color:#cceecc; }
```
*    **Bug Fixes ve Küçük Değişiklikler:** 
    
    * Bug düzeltme: Bazı durumlarda, formlar Internet Explorer'ın bazı versiyonlarında çalışmadı. Greg Williams'a çok teşekkürler.
    * Bug düzeltme: Make A Graph düğmeleri, bir uzaktan kumandan uzak olsaydı çalışmadıERDDAP.
    * Bug düzeltme:WMSBazen veri setinin uzaktan uzakta olup olmadığını çalışmadıERDDAP.
    * Birçok küçük değişiklik ve bug düzeltmeleri.
    

## Version 1.24{#version-124} 
 (2010-08-06) 

*    **Yeni Özellikler:** 
    * Yeni Yeni Yeni Yeni Yeni Yeni Yeni[Altset web sayfaları](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/index.html)Prolar datasets alt setlerini seçmek için yüzen arama. POST sayesinde.
    * Yeni Yeni Yeni Yeni Yeni Yeni Yeni[Gelişmiş Arama](https://coastwatch.pfeg.noaa.gov/erddap/search/advanced.html)Diğer arama seçeneklerinin tümünü birleştirir ve uzun süreli, entitude ve zaman sınırlama kutularını ekler. Ellyn Montgomery sayesinde. (gecikme için özür dilerim.) 
    * Yeni Yeni Yeni Yeni Yeni Yeni Yeni[Dönüştürme Zamanı](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)Web sayfası ve hizmeti, ISO dize zamanlarından / numeric kez dönüştürmenize izin verir.
    * Yeni Yeni Yeni Yeni Yeni Yeni Yeni[Dönüşüm Birimleri](https://coastwatch.pfeg.noaa.gov/erddap/convert/units.html)Web sayfası ve hizmeti dönüştürmenize izin verirUDUNITSUCUM birimlerinden / Teşekkürler teşekkürlerNOAAIOOSSOS.
    * Eğertabledapİstek içerir &units ("UCUM") , birimlerin isimleri orijinal isimlerden dönüştürülecektir (Genellikle genellikle genellikle genellikle genellikleUDUNITS) toklanmak için[UCUM](https://unitsofmeasure.org/ucum.html)Birimler isimleri. Bu sadece birimleri etkiler\\*İsim isimleri\\*Ancak veri değerleri değil. Teşekkürler teşekkürlerNOAAIOOSSOS.
    * Grafik web sayfaları ve grafikler yapmak için iyileştirmeler:
        * Grafik bir haritaysa, haritanın merkezi noktasını değiştirmek için yeni bir Graph düğmeleri ve yeni bir seçenek vardır. POST sayesinde.
        * Filtre ayarları aşağıda eklendi. Greg Williams sayesinde.
        * Kıyı veri dosyalarında inşa edilen GSHHS v2.0 için güncellendi. POST sayesinde.
        * Haritalar şimdi göller ve nehirler içerir. POST sayesinde. (Üzgünüm, Sacramento River Delta eksik, çünkü ne kıyı şeridi verileri ne de göl/river veri setleri bununla ilgilenir.) 
        * Pscoast-derived ulus / devlet dosyalarında inşa edilmiştir. POST sayesinde.
        * Topography.cpt biraz değiştirildi. (Bu olumsuz sizi etkilerse üzgünüm.) POST sayesinde.
        * griddap'in A Graph'ı yaptığında, bir kullanıcı değişkeni değiştirirse, form otomatik olarak yeniden ortaya çıkıyor.axisVariables' showStartAnd stop her zaman grafik değişkenlerini yansıtıyor. Joaquin Trinanes sayesinde.
        * txt ve pdf görüntü URL'ler için:
            * New &.land =_value_, _value_ nerede "düşün" olabilir (Show topography) veya "over" (Just show bathymetry) . Eğer belirtmezseniz varsayılan ayarlanır[drawLandMask](/docs/server-admin/datasets#global-drawlandmask)in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in indatasets.xmlveya kurulum.xml. POST sayesinde.
            * Yeni: Efsanede çok uzun olan çizgiler otomatik olarak birden fazla çizgiye kırılıyor. POST sayesinde.
        * txt görüntü URL'ler için:
            * New &.legend=_value_, _value_ nerede "Bottom" olabilir (varsayılan varsayılan varsayılan varsayılan varsayılan varsayılan) "Off" veya "Sadece". Bu efsaneyi içermenize izin verir, efsaneyi dışlayın veya sadece efsaneyi alın. Cara Wilson sayesinde.
            * Yeni &.trim=_n Pixels_ nPixels sınırı bırakır (E.g., 10) Görüntünün dibinde. .legend=Off sonra uygulanır. Cara Wilson sayesinde.
            * Yeni &.size=_ genişlik_|_height_, görüntü için genişliği ve yüksekliği belirtebilirsiniz, piksel.
    * Yeni çıkış dosya biçimleri:
        * .csvp ve.tsvp - .csv ve.tsvAma " (_units_) "İlk satırdaki sütun isimlerine yakalandı.
        * .odvTxt - veriyi veri haline getiren bir .txt dosyası yapar[Ocean Data View View View View (ODV) ](https://odv.awi.de/).
        * .esriCsv - ESRI'nın ithalat için uygun bir .csv dosyası yaparArcGIS. (tabular veri kümeleri sadece) Jan Mason sayesinde Jeff de La Beaujardiere veNOAAIOOSSOSProje.
    * GUI gelişimine[Categorize](https://coastwatch.pfeg.noaa.gov/erddap/categorize/index.html)Web sayfaları. Ayrıca, kategorileme değerleri (kurum dışında) Şimdi hepsi daha düşük. Ekransız istekler kabul edilir (Yönlendirme) Doğru uyumluluk için. Roy Mendelssohn sayesinde.
    * Hata mesajları artık kullanıcılara daha kısa ve daha odaklanmış durumda. Greg Williams sayesinde.
    * Büyük ölçüde azaltan içsel bir değişiklikERDDAP“Temel hafıza kullanımı.
    * Sadece POST projesi ile ilgili olan birçok yeni özellik.
*    **Şeyler ŞeylerERDDAP™Yöneticilerin Bilme ve Yapması Gerekiyor:** Çok fazla değişiklik var. Üzgünüm. Ama her biri bazı güzel faydalar getiriyor.
    * GenrateDatasetXml için büyük değişiklikler - şimdi sık sık daha fazla soru sorar (İlgiliyi gör[Dataset Tür türleri](/docs/server-admin/datasets#detailed-descriptions-of-dataset-types)Bilgi Bilgileri) Ve şimdi her zaman aslında hazır kullanım içeriği yaratırdatasets.xml. Hala kurulumdan sorumlusunuz, bu yüzden hala incelemelisindatasets.xmlBunu kullanmadan önce içerik. Projeye çaba veren bir insan her zaman bir bilgisayar programından daha iyi olacaktır. UAF projesi sayesinde.
    * REQUIRED: Kurulum.xml'de, iptal etmeniz gerekirWMSBölüm. Şimdi bu etiketleri içermelidir (Ancak değerleri değiştirmek için özgür hissetmek) :
```
        <!-- These default accessConstraints, fees, and keywords are used 
        by the SOS, WCS, and WMS services.
        They can be overridden by "accessConstraints", "fees", "keywords" 
        attributes in a dataset's global metadata.
        If a dataset that has an "accessibleTo" tag doesn't override 
        "accessConstraints", then the default for "accessConstraints" is the
        "accessRequiresAuthorization" value.  
        -->
        <accessConstraints>NONE</accessConstraints>
        <accessRequiresAuthorization>only accessible to authorized
        users</accessRequiresAuthorization>
        <fees>NONE</fees>
        <keywords>Earth science, oceans</keywords> 
        
        <!-- This appears on the erddap/legal.html web page after the 
        General Disclaimer. 
        You can replace any of the \\[standardParts\\] with your own HTML. -->
        <legal><!\\[CDATA\\[
        \\[standardDisclaimerOfEndorsement\\]
        \\[standardDisclaimerOfExternalLinks\\]
        \\[standardPrivacyPolicy\\]
        \\[standardDataLicenses\\]
        \\]\\]></legal>
        
        <!-- Specify the default units standard (e.g., "UDUNITS" 
        (the default) or "UCUM") that you (the ERDDAP™ admin) are using to 
        specify units.  The value is case-sensitive.
        This is used by ERDDAP's SOS server to determine if the units need to
        be converted to UCUM units for WMS and SOS GetCapabilities responses. 
        -->
        <units\\_standard>UDUNITS</units\\_standard>
        
        <!-- For the wms examples, pick one of your grid datasets that has
        longitude and latitude axes.
        The sample variable must be a variable in the sample grid dataset.
        The bounding box values are minx,miny,maxx,maxy.
        -->
        <wmsSampleDatasetID>erdBAssta5day</wmsSampleDatasetID>
        <wmsSampleVariable>sst</wmsSampleVariable>
        <!-- The bounding box values are 
           minLongitude,minLatitude,maxLongitude,maxLatitude.
           Longitude values within -180 to 180, or 0 to 360, are now okay. -->
        <wmsSampleBBox>0,-75,360,75</wmsSampleBBox>
```

    * REQUIRED: Kurulum.xml, kopya ve bu yeni önerilen&lt;HeadHtml&gt; eski versiyonunu değiştirmek için başlayın. Ama tercihleriniz için değişiklikler yapmak için özgür hissediyorum.
```
        <!-- startHeadHtml has the start of the HTML document and the 
        'head' tags (starting at "<!DOCTYPE>", but not including 
        "</head>") for all HTML web pages. 
        This may include &erddapUrl;, which is expanded to be 
          \\[baseUrl\\]/erddap (or \\[baseUttpsUrl\\]/erddap if the user is logged in).
        If your ERDDAP™ allows users to log in, all referenced image files, 
          css files, etc. must be in \\[tomcat\\]/content/erddap/images or a 
          subdirectory and must be referenced here with 
          &erddapUrl;/images/\\[fileName\\].
        
        favicon.ico is the image that browsers associate with your website.
        For more information, see https://en.wikipedia.org/wiki/Favicon .
        You can use your own favicon.ico file by putting it in 
          \\[tomcat\\]/content/erddap/images. 
        
        \\*\\*\\* Optional: you can change the appearance of all of your 
        ERDDAP's HTML pages by changing the CSS <style> settings below.
        
        For an example of a very different style, change the import reference
        to <tomcat>/content/erddap/images/erddapAlt.css
        
        \\*\\*\\* If your CSS style includes links to files (e.g., images), that 
        style information must be inline in the style tag below, after the
        'import' line, not in the .css file.  
        Put all of the (e.g., image) files in the 
        \\[tomcat\\]/content/erddap/images directory (or a subdirectory) and 
        reference them below starting with &erddapUrl;.
        Why? On ERDDAP™ https: web pages, \\*all\\* links should use "https:" 
        (not "http:"); otherwise, most browsers consider the web page not 
        fully secure.  Because ERDDAP™ would use the same .css file for 
        http: and https: web pages, the links within the .css file wouldn't 
        switch between http: and https:.  There doesn't seem to be a way 
        around this other than using inline style information.
        -->
        <startHeadHtml><!\\[CDATA\\[ 
        <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
          "http://www.w3.org/TR/html4/loose.dtd">
        <html>
        <head>
        <title>ERDDAP</title>
        <link rel="shortcut icon" href="&erddapUrl;/images/favicon.ico">
        <style type="text/css">
        <!--
          @import "&erddapUrl;/images/erddap.css";
        -->
        </style>
        \\]\\]></startHeadHtml>
        
        <!-- The tableCommonBGColor MUST be the same color as the 
           table.commonBGColor in erddap.css above. Suggested is #f1ecd8. 
           But if you use erddapAlt.css, change this to #e7dec5. -->
        <tableCommonBGColor>#f1ecd8</tableCommonBGColor>
        
        <!-- This is used, e.g., for the type=variable rows on the metadata
          info tables. -->
        <tableHighlightBGColor>#cceecc</tableHighlightBGColor>
```

POST sayesinde Hans Vedo ve Rick Blair.
    * REQUIRED: Kurulumda.xml, in In installation.&lt;BaşlangıçBodyHtml&gt;, değiştirir&lt;body&gt; etiketi sadece&lt;body&gt;, stil artık erddap.css tarafından ayarlandığından beri.
    * REQUIRED: Kurulum.xml'de, bu konuda değişiklik&lt;endBodyHtml&gt; (Ancak e-posta adresinizi e-posta adresinizi değiştirin ve diğer değişiklikler yapmak için ücretsiz hissediyorum) :
```
        <!-- The end of the body of the HTML code for all HTML web pages
          (with "</body>" at the end). 
        This may include &erddapUrl;, which is expanded to be 
          \\[baseUrl\\]/erddap (or \\[baseUttpsUrl\\]/erddap if the user is logged in).
        If your ERDDAP™ allows users to log in, all referenced image files, etc. 
          must be in \\[tomcat\\]/content/erddap/images or a subdirectory
          and must be referenced here with &erddapUrl;/images/\\[fileName\\].
        
        You can change this, but please keep "ERDDAP, Version &erddapVersion;"
        and these references to the Disclaimers and Privacy Policy. -->
        <endBodyHtml><!\\[CDATA\\[ 
        <br>&nbsp;
        <hr>
        ERDDAP, Version &erddapVersion;
        <br><font class="subduedColor">Questions, comments, 
          suggestions?  Please send an email to 
          <tt>erd dot data at noaa dot gov</tt>
        <br>and include the ERDDAP™ URL directly related to your question
          or comment.
        <br>
          <a href="&erddapUrl;/legal.html">Disclaimers</a> | 
          <a href="&erddapUrl;/legal.html#privacyPolicy">Privacy 
            Policy</a>
        </font>
        </body>
        \\]\\]></endBodyHtml>
```

    * YÜKSEK RECOMMENDED: Kurulumda.xml, önerilen&lt;ShortDescriptionHtml&gt; şimdi
```
        <theShortDescriptionHtml><!\\[CDATA\\[ 
        <h1>ERDDAP</h1>
        This website (the Environmental Research Division's Data Access 
        Program) aggregates scientific data from diverse local and remote 
        sources and offers you a simple, consistent way to download subsets 
        of the data in common file formats and make graphs and maps.
        This particular ERDDAP™ installation has oceanographic data
        (for example, data from satellites and buoys).
        
        \\[standardShortDescriptionHtml\\]
        \\]\\]></theShortDescriptionHtml>
```

Bunu değiştirmek için özgür hissediyorum, özellikle ilk paragrafta son cümle.
    * Kurulumda.xml, email EverythingTo and emailDailyReport Şimdi e-posta adreslerinin komünize listeleri olabilir. İlk e-posta Her Şey Özel, e.g., EDDXxxx'e abonelikler bu e-posta adresini kullanır. John Maurer sayesinde.
    * E-posta hataları şimdiye kadar giriş yapılır\\[Büyük Parent Yönetmeny\\]/loglar / e-postaLogYY-MM-D.txt dosyası.
    * Kurulumda.xml, e-posta hesabı özelliklerini belirlemek için yeni, isteğe bağlı bir parametre var (genellikle hemen sonra hemen hemen hemen sonra&lt;e-postaPassword&gt;:
```
          <emailProperties>_propertyName1_|_propertyValue1_|_propertyName2_| _propertyValue2_|...</emailProperties>  
        For example, gmail accounts need  
          <emailProperties>mail.smtp.starttls.enable|true</emailProperties>  
```

Varsayılan bir şey değildir. Rich Signell sayesinde.
    * REQUIRED: EDTableCopy veya kullanıyorsanızEDDGridKopyalama, hepiniz DELETE'ye ihtiyacınız var\\[Büyük Parent Yönetmeny\\]"xh" içeren /copy / yönetmenler ve dosyalar, eski notları durdurmadan sonra dizi veya dosya isimleri içerirERDDAP™Ve yeni başlayana kadarERDDAP™Bu nedenle bu dosyalar yeniden finanse edilecek. Çok üzgünüm, ama değişim yapmak ve umarım birkaç yönetici ve birkaç dosyayı etkiliyor.
Linux'ta bu dosyaları bulabilirsiniz, cd\\[Büyük Parent Yönetmeny\\]/copy
bul .\\*x x x\\*  
Windows'da, bu dosyaları bulabilirsiniz Start, Start|Arama Arama
Aramak istediğiniz şey: Belgeler
Dosya adının tüm veya parçası: xh
Bak,\\[Büyük Parent Yönetmeny\\]/copy
Click on 'Ara'
^A to select them all
Hepsini silmek için
    * REQUIRED: Indatasets.xmlEDDTableFromDatabase datasets, for date and timestamp değişkenleri için, verileri değiştirin 1970-01-01T00:00Z'den bu yana iki ve birkaç saniyeye yazın. Veritabanında zamanlayıcı verileri depolamanız için IQUIRE that you store timestamp data in the database\\*ile birlikte\\*Bir zaman bölgesi. Zaman Bölgesi bilgisi olmadan, sorgularERDDAP™Veritabanına gönderir ve sonuçları,ERDDAP™JDBC aracılığıyla veritabanından elde etmek belirsizdir ve muhtemelen yanlış olacaktır. denedik, ancak "zaman Bölgesi olmadan zaman çizelgesi" verileriyle başa çıkmanın güvenilir bir yolu bulamadık. Bunun her neyse iyi bir uygulama olduğunu düşünüyoruz. Sonuçta, "Zaman Bölgesi olmadan zaman işareti" verileri ima edilmiş bir zaman bölgesine sahiptir. Zaman bölgesinin veritabanı yöneticisine açık olması harika olsa da, diğer yazılımların veritabanınızla düzgün bir şekilde etkileşime girebileceğini belirtmek mantıklıdır. Teşekkürler/sorry Michael Urzen.
    * YÜKSEK RECOMMENDED: Indatasets.xmlAyrıca, .subset web sayfalarını tabular veri setlerinizin yüz yüzen aramasını sağlamak için, [ eklemek gerekir]&lt;subsetVariables&gt;) (/docs /server-admin/datasets#subsetables) Dataset'in global özelliklerine.
    * RECOMMENDED: Indatasets.xmlEğer veri kümesine sahipsenizdatasetID="pmelGtsppp", lütfen bunu değiştirmek
```
          <dataset type="EDDTableFromDapSequence" datasetID="pmelGtsppp" active="false">  
        Whether or not you had that dataset, feel free to add this new GTSPP dataset:  
          <dataset type="EDDTableFromErddap" datasetID="erdGtsppBest">  
            <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGtsppBest</sourceUrl>  
          </dataset>
```
    * RECOMMENDED: Indatasets.xmlAncak, yeni geçerli seçenekler var [&lt;cdm\\_data\\_type&gt;] (/docs /server-admin/datasets#cdm_data_type) Küresel özellikler, bu yüzden veri setleriniz için değerini gözden geçirmelisiniz.
    * In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In Indatasets.xmlYeni [yeni]&lt;KaynaklanmışlarExpandedFP\\_EQ&gt;] (/docs /server-admin/datasets#sourceneedsexpandedfp_eq) Kaynak sunucusu sürekli olarak ele almasa yardımcı olur ve_variable_\\=_value_ testleri doğru düzgün bir şekilde test eder (Çünkü[Yüz sayılarının eşitliğini test etmenin genel zorluğu](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/)) . KaynaklarExpandedFP\\_EQ varsayılan olarak doğruya ayarlanır (En güvenli ayar) Yani herhangi bir değişiklik yapmanız gerekmez.
    * Yeni Yeni Yeni Yeni Yeni Yeni Yeni[EDDTable FromAsciiFiles](/docs/server-admin/datasets#eddtablefromasciifiles). Jerry Yun Pan sayesinde.
    * Yeni Yeni Yeni Yeni Yeni Yeni Yeni[EDDTable FromThreddsFiles](/docs/server-admin/datasets#eddtablefromthreddsfiles). Roy Mendelssohn sayesinde.
    * Değişikliklerin değişmesi[EDDTable FromNcFiles](/docs/server-admin/datasets#eddtablefromncfiles)Daha geniş bir dosya yelpazesi ile kullanılmalıdır.
    * EDDTable FromBMDE engellidir. Artık aktif, uygun, veri kaynakları yoktur.
    * GenrateDatasetX ml, yeniEDDGridBundan sonra Kataloğu bütün bir THREDDS kataloğunu hasat eder (veya bir alt) Ve üretirler ve üretirlerdatasets.xmlİçerik. UAF projesi sayesinde.
    * GenrateDatasets X ml ve DasDds şimdi de sonuçlarını koydu\\[Büyük Parent Yönetmeny\\]/loglar /log.txt. Rich Signell ve Charles Carleton sayesinde.
    * Giriş sistemine birçok gelişme. POST sayesinde.
*    **Şeyler ŞeylerERDDAP™Programcılar Bilmek ve Yapmalı:** 
    * /WEB-INF/lib / dizininde değişiklikler yapıldı. Lütfen bu şekilde javac ve java sınıfpath ayarlarını değiştirin.
    * Yeni bir şey var\\[Senin Url\\]/erddap /vers hizmeti bir versiyonunu belirlemek içinERDDAP. Cevap metin, e.g.,ERDDAP\\_vers=1.24 Bir HTTP 404 Not-Found hata mesajı alırsan, tedavi edinERDDAP™1.22 veya daha düşük sürüm olarak. POST sayesinde.
*    **Küçük Değişiklikler ve Bug Fixes:** 
    
    * EDDTable From From Sos değişiklikleri:
        * IOOS okumak için aşağılanmış destekSOSXML yanıtları.
        * IOOS okumak için eklenmiş destekSOSmetin /csv. (Yani NOSSOSsunucular şu anda desteklenmez.) 
        * IOOS ile ilgili birçok değişiklik yaptıSOSsunucu detayları.
        * IOOS için BBOX sorguları için eklenmiş destekSOSveOOSTethys SOSsunucular. Bu değişiklikler ilgili veri talepleri için büyük bir hızda sonuçlanır. IOOS sayesindeSOS.
    * Text in Text in Text.mattabular veri dosyaları şu anda doğru kurtarılıyor. Roy Mendelssohn sayesinde.
    *   WMS
        *   OpenLayersŞimdi birlikte paketleniyorERDDAP™Kullanım içinWMSWeb sayfaları. Bu, problemin neden ne zaman ortaya çıktığını düzeltiyorOpenLayersBirkaç ay önce değişti ve gelecekteki sorunları engeller.
        * İçindeWMS GetCapabilitiesCevap, yanıt,&lt;OnlineKaynak&gt; Değer şimdi URL'dirWMSServis. Charlton Galvarino sayesinde.
        * Bir efsane görüntüleniyorWMSRenk çubuğunu göstermek için web sayfası. Emilio Mayorga sayesinde.
    *   EDDGridAggregateExistingDimension yapılayıcısı, bir eksen kaynağının kaynağının bir kaynağının varsa sorunları vardı. Değerler varışlarına eşit değildi Değerler, e.g., eğer kaynak zamanı başka bir şey olsaydı"seconds since 1970-01-01". Teşekkürler teşekkürlerToddSpindler.
    * MasaYazrGeoJson'da, fazla ',' sonra bbox\\[...\\]kaldırıldı. Greg Williams sayesinde.
    * Birçok küçük değişiklik ve bug düzeltmeleri.
    
## Version 1.22{#version-122} 
 (2009-07-05) 

* SlideSorter bug 1.20'de tanıtıldı.
* OBIS bug 1.20'de tanıtıldı.
* Jason datasets'e resimler/gadgets/GoogleGadgets sayfasının referansları kaldırıldı.
     
## Version 1.20{#version-120} 
 (2009-07-02) 

*   ERDDAP™Yöneticiler, lütfen bunu kurulum.xml dosyasına ekleyin:
```
    <!-- If you want to restrict access to some datasets, you need to 
    specify the method used for logging on (authentication). See the info 
    at https://erddap.github.io/setup.html#security
    Currently, the options are: "" (logins not supported, the default),
    "custom", "openid". Note that openid login doesn't work when testing 
    with localhost (https://127.0.0.1:8443).
    -->
    <authentication></authentication>
    
    <!-- This specifies how you have stored passwords in the roles tags 
    in datasets.xml. If you aren't storing any passwords this is irrelevant.
    The options (in order of increasing security) are: "plaintext", "MD5", 
    or "UEPMD5" (MD5(UserName:ERDDAP:Password), the default).
    You should only use "plaintext" or "MD5" if you need to match values 
    stored that way in an external password database.  See the info at
    https://erddap.github.io/setup.html#security
    -->
    <passwordEncoding>UEPMD5</passwordEncoding>
    
    <!-- This determines whether datasets that the user doesn't currently
    have access to (because he isn't logged in or because his roles don't
    allow access) should be shown on lists of data sets 
    (e.g., from full text search, categorize, view all datasets, ...).
    The options are: "true", or "false" (the default).
    If false, no information about the dataset (even its existence) is 
      shown to users who don't have access to it.
    If true, some information about the dataset (title, summary, etc) is
      shown to users who don't have access to it.  
      If the user clicks on a link to a dataset he doesn't have access to,
      he will get an error message and be prompted to log in.
    -->
    <listPrivateDatasets>false</listPrivateDatasets>
    
    <!-- If the number of requests between two runs of LoadDatasets 
    exceeds unusualActivity, an email is sent to emailEverythingTo.
    The default is 10000.
    -->
    <unusualActivity>10000</unusualActivity>
```

* Yeni dataset türleri[EDDGridKopya kopya](/docs/server-admin/datasets#eddgridcopy)ve[EDDTableCopy](/docs/server-admin/datasets#eddtablecopy)Başka bir kopyasının yerel bir kopyasını yapmak ve korumakEDDGridveya EDDTable veri kümesinin verileri ve yerel kopyadan verilere hizmet eder. Bunlar kullanmak ve çok etkili olmak çok kolaydır **Uzak veri kaynaklarından veri servis eden en büyük problemlerden bazılarına çözümler:** 
    
    * Uzak bir veri kaynağından gelen verilere erişmek yavaş olabilir (Çeşitli nedenlerle) .
    * Uzak veri kümesi bazen kullanılamaz (Tekrar, çeşitli nedenlerle) .
    * Veriler için bir kaynağa dayanarak iyi ölçeklendirmez (e.g., birçok kullanıcı ve birçok kişiERDDAPs onu kullanır) .
    
Ayrıca, yerel kopya orijinalin bir yedekidir, bu da bir şeyin orijinale olması için kullanışlıdır.
    
Bir veri kümesinin yerel bir kopyasını yapmak için yeni bir şey yoktur. Burada yeni olan şey bu sınıflar bunu yapıyor\\*kolay kolay kolay kolay kolay\\*Yaratmak ve yaratmak\\*maintain maintain maintain maintain\\*Verilerin yerel bir kopyası bir veriden\\*Çeşitli çeşitlilik çeşitliliği çeşitlilik çeşitliliği çeşitlilik çeşitliliği çeşitliliği çeşitliliği çeşitlilik çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitlilik çeşitliliği çeşitliliği çeşitliliği çeşitlilik çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitlilik çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitlilik çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitlilik çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitlilik çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitlilik çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitlilik çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitlilik çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitlilik çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitlilik çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitlilik çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitlilik çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitlilik çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitlilik çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği çeşitliliği\\*Uzak veri kaynakları ve türleri\\*Ekle metadata\\*Verileri kopyalarken.
    
Bu dataset türleri, yaratılışını basitleştiren tam bir dizi özellik parçasıdır[gridler/kırıcılar/federasyonlarERDDAPs](/docs/server-admin/scaling)Çok ağır yükleri işlemek için (e.g., bir veri merkezinde) .
    
* Yeni dataset type[EDDTable FromDatabase](/docs/server-admin/datasets#eddtablefromdatabase)Yerel veya uzaktan veritabanı masasından veri alır.
*   ERDDAP™Şimdi bir tane var[güvenlik güvenliği güvenlik güvenliği](/docs/server-admin/additional-information#security)Kimlik doğrulama sistemini destekleyen sistem (Kullanıcıların oturum açmalarına izin vermek) ve yetkilendirme ve (Onlara belirli özel veri kümelerine erişmelerini sağlamak) .
* Orada orada vardır[İki, yeni, komut satırı araçları](/docs/server-admin/datasets#tools)Yardım etmek için yardım etmekERDDAP™Yöneticiler XML’i yeni bir veri kümesi için üretirlerdatasets.xml:
    * GenrateDatasets X ml, neredeyse herhangi bir veri kümesi için veri kümesi XML'nin kaba bir taslağı oluşturabilir.
    * DasDds, XML'i bir veri kümesi için defalarca test etmenize ve geliştirmenize yardımcı oluyor.ERDDAP'In GenerateDatasets X ml web sayfaları kaldırıldı. Güvenlik nedenleri için, sadece birkaç veri kümesi türünü desteklediler. Yeni komut hattı araçları daha iyi bir çözümdür.
* Yeni The new[Durum sayfası](/docs/server-admin/additional-information#status-page)Herkesin kimseye izin vermesine izin verir (Ancak özellikle yöneticiler) Bir kişinin durumuERDDAP™Herhangi bir tarayıcıdan\\[BaseUrl\\]/erddap/status.html.
* Masadap şimdi destekleniyor[server-side işlevleri](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#functions):
    * Vedistinct () Yanıt masasından tekrar satırları kaldırır,
    * & & &orderBy (...) Cevap masasının nasıl sıralaması gerektiğini belirtmenize izin verin,
    * & & &orderByMax (...) Cevap masasının nasıl sıralaması gerektiğini ve son belirtilen sütundaki maksimum değerlerle sıra dışı tüm satırları kaldırmalısınız. Bu, örneğin her istasyon için son mevcut verileri elde etmek için kullanılabilir.
* Tabular veri setleri artık adlandırılmayan ek tarihTime değişkenlerini içerebilir."time". Bu değişkenler "units" metadata tarafından kabul edilir, hangi kapsamalıdır" since "  (numeric tarihi Times Times) veya "yy" veya "YY" (Formated String dateTimes) . Ama lütfen hala kullanındestinationName "time"ana tarih için Zaman değişkeni.
*   ERDDAP™Şimdi bir şeyler üretiyor[sitemap.xml](/docs/server-admin/additional-information#sitemapxml)Dosya, hangi arama motorlarını size söylerERDDAPSadece her ay taranmalıdır.ERDDAP™Yöneticiler, lütfen takip edin[Bu talimatlar](/docs/server-admin/additional-information#sitemapxml)Arama motorlarını yeni sitemap.xml dosyası hakkında bilgilendirmek.
*   ERDDAP“Suç mesajları şimdi çok daha kısa ve müşterilere yöneliktir (Programcılar değil) . Greg Williams sayesinde.
* [&lt;Blacklist&gt;) (/docs /server-admin/datasets#request Blacklist) Şimdi aynı zamanda son sayının \\* tarafından değiştirildiği IP adreslerini de destekler.
* İstekler için.jsonVe .geoJson dosyaları artık bir seçenek içerebilir[jsonp](https://niryariv.wordpress.com/2009/05/05/jsonp-quickly/)"&&&&.jsonp=_ functionName_" to the end of the query. Temel olarak, bu sadece anlatıyorERDDAP™"_functionName_ (" cevabın başlangıcında ve ") " cevabın sonuna. Eğer başlangıçta sorgu olmasaydı, sorgunuzdaki "&"den ayrıldı. Greg Williams sayesinde.
* Birçok yeni istatistik eklendi[Günlük Rapor](/docs/server-admin/additional-information#daily-report).
* Web sayfalarında veri setleri, kurum ve id artık şu ana kadar. Bu, abonelik ve diğer daha kullanışlı sütunları dar bilgisayar ekranlarında görüntülemek için hareket eder.
* Tüm web sayfalarında, sayfanın adı (yarasıyla ilgili)&lt;Başlık: In the the&lt;HeadHtml&gt; Kurulumda tanımladığınız.xml) web sayfasının daha iyi bir açıklamasını içerecek şekilde değiştirildi. (Örneğin, mevcut veri kümesinin adı ve kurumu dahil olmak üzere) .
* Xmx bilgisi şimdi log.txt, Daily Report ve statüde basılan hafıza bilgilerine dahil edilmiştir.html. Ellyn Montgomery sayesinde.
*   ERDDAP™Ek, tüm hataların karşı genel amaçlı koruma (E.g., OutOfMemoryErroror) . Charles Carleton sayesinde.
* Yanıtın zaten işlendiği takdirde hata işlemenin iyileştirilmesi.
* IMPROVED: EDDTable FromFiles andEDDGridFromFiles now just Allow&lt;metadata&gt; ilk ya da son. penultimate artık desteklenmez. Ve ilk ve son şimdi dosyaların sonModifiedTime'a dayanmaktadır.
* Bug düzeltme: EDDTable From FromSOSBir istasyon için geçersiz bilgi bir istisna attı ve tüm veri kümesinin reddedilmesine neden oldu. Şimdi, bu istasyonlar sadece görmezden gelindi (Ve hata mesajı oturum açmaya girişilir.txt) . Rick Blair sayesinde.
     

## Version 1.18{#version-118} 
 (2009-04-08-08) 

* Bug düzeltme: 1.14'te başlayın, EDDTable Data Access Form ve A Graph web sayfası alıntı kısıtlamalarla düzgün bir şekilde ilgilenmedi.
* Bug düzeltme: 1.14'te başlayın, EDDTableFromDapSequence, kaynak zaman birimlerinin 1970'ten bu yana "saniye" olmadığı doğru zaman kısıtlamalarını doğru bir şekilde ele almadı.
     

## Version 1.16{#version-116} 
 (2009-03-26-26) 

*   ERDDAP™Yöneticiler:
    * Bu önemli bir serbestlik çünkü bir boğayı düzeltiyorERDDAP™Tomcat Manager'ı Stop/Start veya Reload için kullandıysanız çalışırsanızERDDAP. 1.16'yı yüklediğinizde, sadece Tomcat yöneticisini eski işletmeye kullanmıyorsunuzERDDAP™Ve yenileri dağıtınERDDAP. Bunun yerine: **Eski işe yaramazERDDAP™Tomcat (veya sunucu) Sonra yenileri dağıtınERDDAP.** Her zaman yeni bir versiyon yüklemede bunu yapmak için iyi bir fikir.
    * Lütfen ekleyin (&lt;Blacklist&gt;&lt;/ DequestBlacklist&gt; (/docs /server-admin/datasets#request Blacklist) Senin içindatasets.xml. Bu, bloke edilecek bir müşteri IP adresleri listesini belirtmek için kullanılabilir. (e.g., bir Hizmet saldırısını veya aşırı derecede zeal bir web robotunu yıkmak için) .
* Şimdi bir tane var\\[Büyük Parent Yönetmeny\\]/loglar rehberi tutmak içinERDDAP™log dosyaları. Ne zaman başlarsınERDDAP™Ancak, log.txt'in bir arşiv kopyasını ve giriş yapar. txt.previous files with a time pul. Yeniden başlatmadan önce sorun olsaydı, bu dosyaları analiz etmek faydalı olabilir.
*   ERD"ERDDAP™Şimdi abonelik sistemi döndü.
*   ERDDAP™Bir kez daha bir kez daha izin verir (Ancak hala tavsiye edilmez) "%26", URL'leri talep eden "&" nin yaygınlaşması (Görmeyi gör[İlgili v1.14 değişiklik](#percent26)) .
* Tally bölümüne birkaç yeni ek[Günlük Rapor](/docs/server-admin/additional-information#daily-report).
* DatasetsXml oluşturmakta küçük otobüsler.
* Birkaç küçük bug düzeltmeleri.
     

## Version 1.14{#version-114} 
 (2009-03-17) 

* Kullanıcılar için değişiklikler:
    * Ağ veri taleplerinde,ERDDAP™Şimdi destek:[son-n](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#last)n tam bir dizi indeks ve[ (Sonuncu) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#lastInParentheses)D'nin sayısal değeri nerede (Zaman için, saniyede) .
    * Tellar veri taleplerinde, String kısıtlamaları artık gerektirir[çift tırnak](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#QuoteStrings)Değerin etrafında, örneğin &id="NDBC40121" Bu gereklidirDAPprotokol.
    * Tellar veri taleplerinde,ERDDAP™Şimdi bunu gerektirir[Tüm kısıtlamalar doğru bir şekilde kodlanmış](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#PercentEncode). Tarayıcılar bunu otomatik olarak yapar, bu yüzden bu çoğunlukla bilgisayar programları / tanımlayıcıları etkilerERDDAP.
#### Yüzde26{#percent26} 
*   [Daha önce,](#percent26)The the the the[Bir grafik web sayfasını yapıştırın](https://coastwatch.pfeg.noaa.gov/erddap/images/embed.html)ve[ERDDAP™Google Kaddafi web sayfası](https://coastwatch.pfeg.noaa.gov/erddap/images/gadgets/GoogleGadgets.html)Görüntünün URL'sinde "&"%26 ile değiştirilmesini söyledi. Şu andan itibaren, görüntüdeki URL'yi "&amp;" ile değiştirmelisiniz. Bu yüzden mevcut web sayfalarında herhangi bir "%26" değiştirmeniz gerekiyor ve Google Gadgets "&amp" ile. (Üzgünüm) 
*   ERDDAP™Yöneticiler, lütfen:
    * Takip et[Kurulum.xml](/docs/server-admin/deploy-install#setupxml)Dosya dosyası (Ve bayrağı değiştir KeyKey değeri) :
```
        <!-- ERDDAP™ has a service that lets remote users set a flag
        to notify ERDDAP™ to try to reload a dataset.
        These requests use a key which is generated based
        on baseUrl/warName, a datasetID, and flagKeyKey.
        \\*\\*\\* Change this once, to any text (a favorite quote? random text? 
        It doesn't matter). Normally, you won't ever change this again.
        But if you think someone is abusing the flag system,
        change this text again, restart ERDDAP™, and send
        all of the users of the flag system the relevant new flagKeys
        (see the list in the Daily Report). -->
        <flagKeyKey>A stitch in time saves nine. CHANGE THIS!!!</flagKeyKey>
        
        <!-- ERDDAP™ has an email/URL subscription system which sends a user
        an email or pings a url whenever a dataset of interest changes.
        (This is different from the RSS system, which is always active.)
        The system relies on the server being able to send out 
        emails to people to validate their subscription requests.
        The emails appear to come from the emailFromAddress below.
        So if your server can't send out emails, don't make this system active.
        You may choose (for whatever reason) to make this system active or not, 
        so valid values below are "true" (the default) and "false".
        Note that if you change this and restart ERDDAP™, the list of 
        subscriptions (in \\[bigParentDirectory\\]/subscriptionsV1.txt) isn't
        affected. See also the subscriptionEmailBlacklist in datasets.xml.
        -->
        <subscriptionSystemActive>true</subscriptionSystemActive>  
```

    * Sonraki satırda&lt;e-postaUserName&gt; Sizin için[Kurulum.xml](/docs/server-admin/deploy-install#setupxml)Dosya, ekle
```
        <emailPassword>_myPassword_</emailPassword> <!-- optional; if absent, emails can't be sent to non-local addresses -->  
```
Ve gerçek şifrenizi girin.
    * Değiştirebilirsin&lt;wmsSampleBBox&gt; senin içinde[Kurulum.xml](/docs/server-admin/deploy-install#setupxml)Dosya, 360, e.g'ye kadar uzunlık değerleri içerecektir.
```
        <!-- The bounding box values are 
           minLongitude,minLatitude,maxLongitude,maxLatitude.
           Longitude values within -180 to 180, or 0 to 360, are now okay. -->
        <wmsSampleBBox>0,-75,360,75</wmsSampleBBox>  
```

    * Sizin içindatasets.xmlDosya, dataset type EDDTable FromNc4DFiles to EDDTable FromNcFiles (Hangi şimdi dosyaları herhangi bir boyutla destekler) . Eğer bir EDDTableNc4DFiles veri setiniz olsaydı:
        
        1. You MUST change to type="EDDTable FromNcFiles" in your datasets. XML dosyası.
        2. You MUST add a a&lt;nDimensions&gt; 4 4 4&lt;/nDimensions&gt; dataset'in XML'ine etiket.
        3. Yenileri ekleyebilirsin&lt;KaynakNames&gt; etiketi, verilerin genel siparişini belirleyen dosyalar için içsel siparişi belirtmek için.
        
Detaylar için, bakınız[EDDTable FromFiles](/docs/server-admin/datasets#eddtablefromfiles).
    * Geçmişte, EDDTable FromDapSequence için,OPeNDAPDRDS sunucuları, içindedatasets.xmlBiz kullandık&lt;KaynakCanConstrainStringsRegex&gt;~=&lt;/sourceCanConstrainStringRegex&gt;. Ama şimdi DRDS regex desteğinin daha sınırlı olduğunu görüyoruzERDDAP‘s, bu yüzden tavsiye ediyoruz&lt;KaynakCanConstrainStringsRegex&gt;&lt;/sourceCanConstrainStringRegex&gt; bu yüzden regex kısıtlamaları kaynağa geçmiyor, ancak bunun yerine ele geçiriliyorERDDAP.
    * Kaynağın yeniden düzenlenmesi CanConstrain... in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in indatasets.xmlYemin ederim[EDDTable FromDapSequence](/docs/server-admin/datasets#eddtablefromdapsequence)ve (İçsel olarak) Tüm EDDTable veri kümesi türleri. Yeni sistem daha basit ve daha iyi farklı veri kaynaklarının değişkenliğini yansıtıyor. XML'i veri kümeleriniz için değiştirmeniz gerekebilirdatasets.xml.
* Kendileri tarafından yararlı olan birkaç yeni özellik var, ancak birleştirildiğinde, aynı zamanda yaratılışı kolaylaştırın[gridler/kırıcılar/federasyonlarERDDAPs](/docs/server-admin/additional-information#grids-clusters-and-federations).
    * Yeni veri kümesi türleri:
        *   [EDDGridFromErddap](/docs/server-admin/datasets#eddfromerddap)ve[EDDTable FromErddap](/docs/server-admin/datasets#eddfromerddap)Hangisine izin verERDDAP™Başka bir veri kümesi de içerirERDDAP™Çok basit ve çok verimli bir şekilde.
        *   [EDDGridFromFiles](/docs/server-admin/datasets#eddgridfromfiles)  (ve alt sınıfı,[EDDGridFromNcFiles](/docs/server-admin/datasets#eddgridfromncfiles)Hangileri okuyabilirsinizNetCDF .ncGRIB .grb veHDF .hdfdosyaları dosyaları dosyaları dosyaları) .
        *   [EDDTable FromNcFiles](/docs/server-admin/datasets#eddtablefromncfiles)Hangileri okuyabilirsinizNetCDF .ncHangi bir masa benzeri yapıya sahiptir.
    * RunLoadDatasets ve LoadDatasets geri alındı, böyleceERDDAP™Datasets'i dosyaların dosyalarına dayanarak yeniden yüklemeye çok duyarlıdır[Bayrak bayrağı](/docs/server-admin/additional-information#flag)(often)&lt;5 saniye ana yükDatasets şu anda yapılırsa).
    * Yeni hizmet izin vermek için[Bir URL bir bayrak dosyası oluşturmak için](/docs/server-admin/additional-information#set-dataset-flag)Belirli bir veri kümesi için, e.g.,
    ```
        https://coastwatch.pfeg.noaa.gov/erddap/setDatasetFlag.txt?datasetID=rPmelTao&flagKey=123456789  
    ```
rPmelTao (Bayrak bayrağına rağmen Buradaki anahtar yanlış) .
    * Yeni Yeni Yeni Yeni Yeni Yeni Yeni[abonelik abonelik abonelik abonelik abonelik abonelik abonelik](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions)Hizmet böylece herhangi bir müşteri belirli bir veri kümesi oluşturululduğunda yapılacak bir eylemi belirtebilir. (Ne zaman zaman ne zaman zaman zaman ne zaman zaman zaman ne zaman zaman zaman ne zaman zaman zaman ne zaman zaman zaman ne zaman ne zaman zaman zaman ne zaman ne zaman zaman zaman zaman ne zaman zaman zaman ne zaman zaman ne zaman ne zaman ne zaman?ERDDAP™Yeniden başlatılır) Ve veri kümesi herhangi bir şekilde değişir. Bu sistem devre dışı kalabilir&lt;Abonelik SistemiActive&gt; Sizin[Kurulum.xml](/docs/server-admin/deploy-install#setupxml)Dosya. The The The The The The The TheERDDAP™ [Günlük Rapor](/docs/server-admin/additional-information#daily-report)Şimdi tüm abonelikleri listeler ve her birini iptal etmek için gereken URL'yi içerir, çünkü sistemin kötüye kullanıldığını hissediyorsunuz. In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In Indatasets.xmlAma yeni, isteğe bağlı bir şey var [&lt;abonelik abonelik abonelik abonelik abonelik abonelik abonelik E-postaBlacklist&gt; (/docs /server-admin/datasets #subscriptionemail Blacklist) Bu yüzden yöneticiler abonelik sisteminden hemen siyah listelenen bir e-posta adreslerini ilan edebilir.
    * Yeni [Yeniler]&lt;Değişim&gt; (/docs /server-admin/datasets#onchange) Özelliklerdatasets.xmlİzin verinERDDAP™Yönetici belirli bir veri kümesi oluşturulduktan sonra yapılacak bir eylemi belirtir. (Ne zaman zaman ne zaman zaman zaman ne zaman zaman zaman ne zaman zaman zaman ne zaman zaman zaman ne zaman zaman zaman ne zaman ne zaman zaman zaman ne zaman ne zaman zaman zaman zaman ne zaman zaman zaman ne zaman zaman ne zaman ne zaman ne zaman?ERDDAP™Yeniden başlatılır) Ve veri kümesi herhangi bir şekilde değişir.
    * Tüm metin aramasını iyileştirmeler: her veri kümesi için arama dizesini depolamak şimdi 1/2 hafıza kullanır. Arama algoritması (Boyer-Moore-like) Şimdi 3X daha hızlı.
    * E-postalardanERDDAP™Şimdi her zaman konu ve içeriği konu ve içerikten vazgeçerek\\[erddap Url\\]Ama bu açık olacak ki,ERDDAP™Bu oradan geldi (Çoğu durumda birden çok kez yönetiyorsunuzERDDAPs) .
    * Daha kapsamlı istatistik toplantısı için[Günlük Rapor](/docs/server-admin/additional-information#daily-report)e-posta.
    * Yeni günlük dosya dosyası\\[Büyük Parent Yönetmeny\\]/ e-postaLogYEAR-MM-D.txt tüm e-postaları gönderERDDAP™Her gün. Bu, özellikle sunucunuz aslında e-posta gönderemezse yararlıdır - en azından bunları logda okuyabilirsiniz.
    *   ERDDAP™Şimdi bir şey yapın\\[Büyük Parent Yönetmeny\\]/ (datasetID) Her veri kümesi için dizin çünkü birçok dosya önbellek olabilir.
* Yeni Yeni Yeni Yeni Yeni Yeni Yeni[RSS2.01](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions)Her veri kümesi için besleme (portakala bakınRSSDatasets, Data Access Forms listelerinde ikonlar ve bir Graph web sayfasını yapın) .
*   EDDGrid .kmlCevaplar şimdi karot resimler kullanın ("süperoverlays" - dinamik olarak kudtree görüntüler) . İlk görüntü Google Earth'e öncekinden çok daha hızlı yükler. Haritanın çözümü, veri kümesinin tam çözümüne kadar yakın olduğunuz gibi artmaktadır. Tavsiye: Kullanıcılar talep etmelidir.kmlBir zaman noktası için, ancak veri kümesinin tüm uzun süreli,latitude aralığı. Ne yazık ki, zaman aralıkları için destek kaldırıldı (Umarım geri dönecek) .
*   ERDDAP™Şimdi ekliyor[Expires and Cache-Control max-age headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)Tüm dosyalar / görüntülerin rehberinden talep edilir. Bu, gönderilen statik dosya taleplerinin sayısını büyük ölçüde azaltırERDDAPVe böylece çoğu büyük hızlarERDDAP™Sayfa Yükleri. Ayrıca, birçok kişiJavaSenaryo dosyaları referansları HTML sayfalarının altlarına taşındı, bu da birçok hıza kadar hızlanıyorERDDAP™Sayfa Yükleri. "Yüksek Performans Web Siteleri" kitabı sayesinde Steve Souders ve ySlow FireFox'daki FireBug eklentisine ek olarak.
*   ERDDAP™Netcdf-java 2.2.22'den netcdf-java 4.0'a geçti. Diğer şeyler arasında, bu izin verirEDDGridFromNcFiles to readHDF .hdfAyrıca GRIB .grb veNetCDF .ncdosyaları.
*   EDDGridFromDap andEDDGridFromNcFiles now also support DArray (Ayrıca DGrid)  dataVariables. Bir boyut bir koordinat değişkenine sahip değilse,ERDDAP™indeks değerleri ile bir eksen değişkeni yaratır (E.g., 0, 1, 2, ..., 311, 312) . Yani diğer tüm yönleriEDDGridAynı kalır:
\\* Hala her boyut için bir eksen değişkeni ile tüm veri kümelerine hizmet ediyor.
\\* Queries hala eksen değişkenlerinden değerler talep edebilir.
Charles Carleton, Thomas Im, Dorian Raymer ve diğerleri sayesinde.
* The The The The The The The TheWMS OpenLayersArtık sayfalar veri setinin aralığından biraz daha büyük olan varsayılan bir uzunluğa sahiptir. (Tam aralığı değil, bu yüzden küçük veri setlerinin bağlamı daha belirgindir) . Varsayılan aralığı şimdi de 0 ila 360 olabilir, bu da şu anda gösterilen birçok veri kümesinin tam aralığına izin verir. Teşekkürler teşekkürlerToddSpindler.
* Bazı Veri Erişim Formlarında Yeni kaydırıcılar ve Grafik web sayfalarını yapın. Basitleştiriyorlar (ham) İstenen verilerin özellikleri ve iyi görsel geri bildirimler sunar.
* Yeni bir seçenek için&lt;dataset&gt; etiketlerdatasets.xml:[Aktif="false"](/docs/server-admin/datasets#active).
* Referanslar içinERD"ERDDAP™Seawatch.pfel (Hala proxy proxy ile çalışır) Sahilwatch.pfeg (tercih tercih tercih tercih tercih tercih tercih tercih tercih tercih tercih tercih tercih tercih tercih tercih tercih tercih tercih tercih) .
* Yeni destek için[data\\_minvedata\\_max](/docs/server-admin/datasets#data_min-and-data_max)Değişken metadata özellikleri.
* Kısmi bir çözüm[WaitOTryAgain / Partili Sonuçlar](/docs/server-admin/additional-information#waitthentryagain-exception): Şimdi, bir veri kaynağı değişikliği tespit edildiğinde daha önce başarısız olan bazı talepler başarılı olacaktır çünküERDDAP™Veri kümesini yeniden yükleyecek ve verileri otomatik olarak yeniden sorgulayacak, tüm orijinal istek bağlamında.
* Bug düzeltme: üretmek Datasets X ml'de devre dışı bırakıldıERDDAP™1.12. Bunu işaret etmek için Ellyn Montgomery sayesinde.
* Hata çalışması için küçük değişiklikler.
* Mümkün ırk koşullarından kaçınmak için birçok gelişme (I.e., çoklu hazır doğanından kaynaklanan olası sorunlarERDDAP) Küçük, infreknt sorunlara neden olan.
* Şimdi, bir hata mesajı bir görüntü üzerinde yazılırsa, görüntü sadece önbellekte kalır -5-10 dakika (60 değil 60 değil) . Cara Wilson sayesinde.
* Veriler olmadığı zaman standart mesaj artık "Your query made no eşleştirme results", bu daha kısa, daha doğru ve maç maçları.OPeNDAPsunucular.
*   EDDGridArtık bağlı eksen değerlerine izin vermeyin.
* Küçük değişiklikler .ver ve .help talepleri.
* Birçok küçük değişiklik ve bug düzeltmeleri.
     

## Version 1.12{#version-112} 
 (2008-10-31) 

* EDDTable From FromSOSBir kez daha NDBC ile çalışırSOSVe yeni NOS ile çalışırSOS.
* EDDTable FromBMDE şimdi gerektirirERDDAP™YönetimdataVariables.
*   EDDGridArtık bu lat ve lon'un tamamıyla uzaylı olmasını gerektirmez. şeffaf şeffaf şeffaf şeffaf Png veya.kml. Teşekkürler teşekkürlerToddSpindler.
* Birkaç küçük değişiklik.
     

## Version 1.10{#version-110} 
 (2008-10-14) 

* Yeni "colorBar" metadata veri değişkenleri içindatasets.xmlGrafikler ve haritalar için varsayılan renkli bar ayarlarını tanımlar. See See See See[Daha fazla bilgi](/docs/server-admin/datasets#color-bar-attributes). Bu önemlidir, çünkü müşteri istenen zaman veya coğrafi aralığı değiştirirken varsayılan grafikler ve haritaların görünümünü büyük ölçüde geliştirir. Ayrıca, bu gerekliydiWMS.
*   ERDDAP™Şimdi çoğu ağ verilerini bir ayla hizmet ediyorWMSServis. Bu önemlidir, çünkü birçok veri sunucusundan veri almak için ek olarak,ERDDAP™Veriler farklı protokolleri kullanarak dağıtabilir (DAP,WMS... gelecekte daha fazla) . Görün bakalım,[müşteri belgeleri](https://coastwatch.pfeg.noaa.gov/erddap/wms/documentation.html). Ya da[Yöneticiler için Belgeler](/docs/server-admin/datasets#wms). Ya da[Deneyin](https://coastwatch.pfeg.noaa.gov/erddap/wms/index.html).
* Uzunlık değerleri için yeni destek &gt;180 içinde.kmldosyaları.
* Yeni cdm\\_data\\_type: Diğer .
*   ERDDAP™Şimdi "boolean" kaynağı veriType'ı destekler. See See See See[Daha fazla bilgi](/docs/server-admin/datasets#boolean-data)Bu, gelecekte EDDTableFromDatabase için faydalı olacaktır.
* New EDDTable FromBMDE DiGIR/BMDE veri kaynaklarını destekler.
* EDVGridAxis şimdi sıralanmış değerlere izin veriyor. pmOscar veri setleri buna ihtiyaç duyuyordu.
*   ERDDAP™Şimdi HTTP hataları döndürür (e.g., "404 kaynak / sayfa bulunamadı") Daha fazla durumda, HTML sayfaları yerine hata mesajları ile.
* Çok fazla değişiklik / alıntılarERDDAP™Belgeler.
* Birçok küçük değişiklik.
* Bazı otobüsler.
*    **Şeyler ŞeylerERDDAP™Yöneticiler bu sürüme yükseltmek için yapmalılar:** 
    * In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In Indatasets.xmlHerhangi bir EDDTable FromSOSdatasets, "observedProperty" metadata'yı "kaynakObservedProperty".
    * Kurallar bir an içinaxisVariableveyadataVariable"destinationNameŞu anda[Daha katı](/docs/server-admin/datasets#datavariable-addattributes). Değişken isimlerinizin geçerli olduğunu kontrol etmeniz gerekir. Ya onları el ile kontrol edin ya da çalıştırınERDDAP™Ve yöneticiye e-postalanan rapordaki hata mesajlarına bakın.
    * In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In Indatasets.xmlEğer bir ağ veri değişkeni aracılığıyla erişilebilir olmasını istiyorsanızWMS, renkBar metadata eklemek gerekir. En azından, örneğin,&lt;Adı:colorBarMinimum" type="double"&gt;0&lt;/t&gt;
```
          <att name="colorBarMaximum" type="double">32</att>  
```
See See See See[Daha fazla bilgi](/docs/server-admin/datasets#wms).
    * Takip et[Kurulum.xml](/docs/server-admin/deploy-install#setupxml)Dosya dosyası (Ancak bunu bilginizle özelleştirin) :

```
        <!-- drawLand specifies the default Make A Graph setting for 
        whether the landmask should be drawn "over" (the default) or "under" 
        surface data on maps. "over" is recommended for primarily 
        oceanographic data (so that grid data over land is obscured by the 
        landmask). "under" is recommended for all other data.
        -->
        <drawLand>over</drawLand>  
        
        <!-- Information about the ERDDAP™ administrator is used for the 
        SOS and WMS servers. You MUST CHANGE these to describe your 
        installation. 
        -->
        <adminInstitution>NOAA Environmental Research 
        Division</adminInstitution>
        <adminIndividualName>Your Name</adminIndividualName>
        <adminPosition>Webmaster</adminPosition>
        <adminPhone>your-phone-number</adminPhone>
        <adminAddress>99 Pacific St, Suite 255A</adminAddress>
        <adminCity>Monterey</adminCity>
        <adminStateOrProvince>CA</adminStateOrProvince>
        <adminPostalCode>93940</adminPostalCode>
        <adminCountry>USA</adminCountry>
        <adminEmail>yourName@yourSite</adminEmail>
        
        <!-- Information about the ERDDAP™ administrator is used for ERDDAP's
        SOS server. You MUST CHANGE these to describe your installation. 
        -->
        <sosTitle>NOAA Environmental Research Division SOS</sosTitle>
        <sosAbstract>NOAA Environmental Research Division's ERDDAP™ makes 
          data from multiple sources available via the SOS 
          protocol.</sosAbstract>
        <sosKeywords>Weather, Ocean Currents, Temperature, 
          Salinity</sosKeywords>
        <sosAccessConstraints>NONE</sosAccessConstraints>
        <sosFees>NONE</sosFees>
        
        <!-- Information about the ERDDAP™ administrator is used for 
        ERDDAP's WMS server. You MUST CHANGE these to describe your 
        installation. -->
        <wmsTitle>NOAA Environmental Research Division 
        WMS</wmsTitle>
        <wmsAbstract>NOAA Environmental Research Division's ERDDAP™ makes
        data from multiple sources available via the WMS 
        protocol.</wmsAbstract>
        <wmsKeywords>Weather, Ocean Currents, Temperature, 
          Salinity</wmsKeywords> 
        <wmsAccessConstraints>NONE</wmsAccessConstraints>
        <wmsFees>NONE</wmsFees>
        <!-- For the wms examples, pick one of your grid datasets that has 
        longitude and latitude axes. The sample variable must be a variable 
        in the sample grid dataset.  The bounding box values are 
        minx,miny,maxx,maxy.
        -->
        <wmsSampleDatasetID>erdBAssta5day</wmsSampleDatasetID>
        <wmsSampleVariable>sst</wmsSampleVariable>
        <wmsSampleBBox>0,-75,180,75</wmsSampleBBox>
```

## Version 1.08{#version-108} 
 (2008-07-13) 

* Yeni bir web hizmeti içindeERDDAP™, üretmek Datasets X ml, yardımcıERDDAP™XML'in kaba bir taslağı yaratarak yöneticiler bir veri kümesi tanımlamak için gerekli olan bir veri kümesi oluşturmak içindatasets.xml
* Netcdf-java tarafından açık bir sunucu olarak görülmesine izin vermekle ilgili bazı değişiklikler/bug düzeltmeler: global metadata şimdi "NC\\_GLOBAL" olarak etiketleniyor. (Bunun yerine "GLOBAL") .
* The The The The The The The TheEDDGridve EDDTable Data Access Forms şimdi URL'de sorgu bilgilerini kullanır. Bu nedenle, örneğin, bir kullanıcı bir Data Access Form'a bir Graph biçiminden geçerse, kısıtlamalar artık doğru şekilde transfer edilir.
*   tabledap'A Graph şimdi String değişkenleri üzerinde kısıtlamalar sağlar.
* EDDTable'in A Graph'ı şimdi NaN kısıtlamalarına izin veriyor. Steve Hankin sayesinde.
* Bug düzeltme: EDDTable kurtarma Image düzgün bir şekilde .colorbar min ve max değerleri tanımadı. Steve Hankin sayesinde
* DatasetsX ml'i kurmak için birçok gelişme. Ellyn Montgomery sayesinde.
* Griddap şimdi izin veriyor () - tarzı gerçek eksen aralığı dışında biraz talep eder. Bu o zamandan beri uygun () -değerler en yakın gerçek değere yuvarlanır. Cindy Bessey sayesinde
* YüzArray ve DoubleArray testi daha sofistike. Her zaman mükemmel olmayacak (Çünkü test her veri kümesi için özelleştirilmiş olmalıdır) Ama daha iyi olmalıdır. Ellyn Montgomery sayesinde.
* Kuruluma geçtim.html ve Datasets kurulum X ml.html erddap's /download directory ve zor tüm bağlantıları onlara kodladı. Şimdi, kurulum bilgilerini hemen değiştirebilir ve güncelleyebilirim.
* Birçok küçük değişiklik. Birkaç küçük bug düzeltmeleri.
*    **Şeyler ŞeylerERDDAP™Yöneticiler bu sürüme yükseltmek için yapmalılar:** 
    * Move Move Move Move&lt;TheShortDescription Html&gt; mesajlarınızdan.xml'e[Kurulum.xml](/docs/server-admin/deploy-install#setupxml)Dosya. Sol tarafta görünen metni belirtirERDDAP™Ev sayfası. Ayrıca, ekleyin&lt;h1&gt;ERDDAP&lt;/h1&gt; (Ya da başka bir başlık) Bunun üstüne. **Ya da** kopya kopya kopya kopya kopya&lt;TheShortDescriptionHtml&gt; Yeni yazılarda[Kurulum.xml](/docs/server-admin/deploy-install#setupxml)Dosya dosyası (Yeni erddapContent.zip) Kurulumunuza.xml.
         

## Version 1.06{#version-106} 
 (2008-06-20) 

* Yeni destek içinIOOS DIF SOSveri kaynakları.
* Birçok küçük değişiklik. Birkaç küçük bug düzeltmeleri.
     

## Version 1.04{#version-104} 
 (2008-06-10-10) 

* New Slide Sorter özelliği.
* Yeni Google Gadgets sayfası ve örnekleri.
* Bug,EDDGrid.saveAsNc ölçek ile değişken için veOffset ekleyin.
     

## Version 1.02{#version-102} 
 (2008-05-26-26) 

* Yeni Yeni Yeni Yeni Yeni Yeni YeniEDDGridSideBySide farklı bir şekilde izin veriraxisVariables\\[0 0 0 0\\]kaynak kaynağı kaynağı kaynağı Değerler.
* Mevcutların ve rüzgarların tüm veri kümeleri bir araya getirildiEDDGridSideBySide datasets.
* Görüntü isteklerinden gelen görüntüler şimdi 1 saat boyunca önbelleklenir.
     

## Version 1.00{#version-100} 
 (2008-05-06) 

* URL'lerde Graph web sayfaları ve grafik komutları yapın.
* Bir veri kümesini yeniden yüklemeye zorlamak için bayrak dosyalarına destek.
* Yeni veri kümesi türü: EDDTable From4DFiles (EDDTable'ün ilk alt sınıfı) .
