---
sidebar_position: 4
---
# Ek Bilgiler

## Bilmeniz Gereken Şeyler{#things-you-need-to-know} 
     
###    **[Proxy Errors](#proxy-errors)**  {#proxy-errors} 
Bazen, bir istekERDDAP™Bir Proxy Hatası, HTTP 502 Kötü Gateway Hatası veya benzer bir hata döndürür. Bu hatalar Apache veya Tomcat tarafından atılıyor, değilERDDAP™Kendisi.
* Eğer her istek bu hataları üretirse, özellikle ilk olarak ilk olarak ayarlandığındaERDDAP™O zaman muhtemelen bir proxy veya kötü ağ geçidi hatasıdır ve çözüm muhtemelen düzeltmektir.[ERDDAP's](/docs/server-admin/deploy-install#proxypass). Bu aynı zamanda bir kurulmuş olduğunda sorun olabilir.ERDDAP™Aniden bu hataları her istek için atmaya başlar.
* Aksi takdirde, "proxy" hataları genellikle Apache veya Tomcat tarafından atılan hataların zamanlarıdır. nispeten hızlı olduklarında bile, Apache veya Tomcat'tan bir tür yanıt meydana geldiğinde meydana gelen bir tür yanıt.ERDDAP™Çok meşgul, bellek sınırlı veya başka bir kaynakla sınırlı. Bu durumlarda, aşağıdaki tavsiyeleri görmek[ERDDAP™Yavaş yavaş yavaş yavaş yavaş yanıt verin](#responding-slowly).
        
Uzun zaman aralığı için istekler (&gt;30 zaman noktaları) Bir şebekeli veri kümesi zaman hatalarına eğilimlidir, bu genellikle Proxy Hataları olarak görünür, çünkü önemli zaman alır.ERDDAP™Tüm veri dosyalarını bir-by-one açın. If if if if if if if if if if if if if if if if if if if if if if if if if if if if ifERDDAP™Aksi takdirde talep sırasında meşgul, problem daha muhtemel meydana gelecektir. Eğer veri kümesinin dosyaları sıkıştırılırsa, problem daha muhtemel olur, ancak bir kullanıcının veri kümesinin dosyaları sıkıştırılırsa tespit etmesi zor.
Çözüm birkaç istek yapmak, her biri daha küçük bir zaman aralığı ile. Bir zaman aralığının ne kadar küçük? Gerçekten küçük bir başlangıç öneririm (-30 zaman noktaları?) Sonra, (Yaklaşık yaklaşık yaklaşık yaklaşık yaklaşık yaklaşık) İstek başarısız olana kadar zaman aralığı ikiye katlayın, sonra bir doubling geri gidin. Sonra tüm istekleri yapın (Her biri farklı bir zaman için) Tüm verileri elde etmek için gerekli.
An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An AnERDDAP™yönetici bu sorunu giderek daha az artırabilir[Apache zamanout ayarları](/docs/server-admin/deploy-install#apache-timeout).
        
### İzleme İzleme İzleme İzleme İzleme{#monitoring} 
Hepimiz veri hizmetlerimizi seyircilerini bulmak ve yaygın olarak kullanmak istiyoruz, ancak bazen sizin bazen sizin bazen sizinERDDAP™Çok fazla kullanılabilir, tüm istekler için süper yavaş cevaplar da dahil olmak üzere sorunlara neden olabilir. Sorunlardan kaçınmak için planımız:

* MonitorERDDAP™aracılığıyla[Durum.html web sayfası](#status-page).
tonları yararlı bilgilere sahiptir. Çok sayıda talebin geldiğini görürseniz, ya da tonlar hafıza kullanılıyor, ya da tonlar başarısız istekler veya her Bin KargoDatasets uzun bir süre alıyor ya da her şeyin bogged ve yavaşça yanıt verdiğini görürseniz, o zaman yavaşça bakmanız için herhangi bir işareti görünERDDAP"[log.txt file](#log)Ne olduğunu görmek için.
    
Ayrıca, statü sayfasının ne kadar hızlı yanıt verdiğine dikkat etmek de yararlıdır. Yavaşça yanıt verirse, bu önemli bir göstergedir ki,ERDDAP™Çok meşgul.
    
* MonitorERDDAP™aracılığıyla[Günlük Rapor](#daily-report)e-posta.
     
* Tarihteki veri kümeleri aracılığıyla izleyin *BaseUrl* /erddap/outOfDateDatasets.htmlSeçmeli web sayfasına dayanan web sayfası[testOutOfDate](/docs/server-admin/datasets#testoutofdate)Küresel özellikler.
     
#### Dış monitörler{#external-monitors} 
Yukarıda listelenen yöntemler şunlardır:ERDDAP“Kendini izlemenin yolları. Ayrıca dış sistemleri izlemek için yapmak veya kullanmak da mümkündürERDDAP. Bunu yapmak için bir proje[Axiom'un hatalı projesi](https://github.com/axiom-data-science/erddap-metrics). Bu dış sistemler bazı avantajları vardır:
* İstediğiniz bilgileri sağlamak için özelleştirilmiş olabilirler, istediğiniz şekilde görüntülenebilirler.
* Bunlar hakkında bilgi içerebilirERDDAP™İşte buERDDAP™Kolayca veya her şeyde (örneğin, CPU kullanımı, disk ücretsiz alan,ERDDAP™Kullanıcının bakış açısından bakıldığında yanıt süresi,ERDDAP™Zaman,
* Uyarılar sağlayabilirler (e-postalar, telefon çağrıları, metinler) Sorunlar bazı eşiği aştığında yöneticilere.
             
### Birden çok Simultane İstekler{#multiple-simultaneous-requests} 
*    **Siyah liste kullanıcıları birden eşzamanlı istekler yapıyor&#33;** 
Bazı kullanıcının bir eş zamanlı istekten daha fazlasını yaptığı açıksa, defalarca ve sürekli olarak IP adresinizi ekleERDDAP"&lt;Blacklist&gt;) (/docs /server-admin/datasets#request Blacklist) Senin içindedatasets.xmlDosya. Bazen istekler bir IP adresinin hepsidir. Bazen birden fazla IP adreslerindendir, ancak açıkça aynı kullanıcı. Ayrıca siyah listeli insanlar tonlarca geçersiz istekler veya tonlarca akılsız talepler yapabilirler.
    
Sonra, her istek için yaparlar,ERDDAP™döndürür:
    
    > HTTP ERROR 403 - Access Forbidden --  
    > Your IP address is on this ERDDAP's request blacklist.  
    > Did you often submit more than one request at a time?  
    > Did you often submit identical requests in a short period of time?  
    > Did you submit a large number of invalid requests?  
    > If you are ready to avoid these problems, please email \\[ERDDAP™ administrator's email address\\] to request to be taken off of the blacklist.
    
Umarım kullanıcı bu mesajı görecek ve sorunu nasıl düzeltecek ve kara listeden çıkarabileceğinizi öğrenmek için sizinle iletişim kuracaktır. Bazen IP adreslerini değiştiriyorlar ve tekrar deneyin.
    
Savaştaki saldırgan ve savunma silahları arasındaki güç dengesi gibidir. İşte, savunma silahları (ERDDAP) CPU'daki çekirdek sayısına, disk erişim bant genişliğine ve ağ bant genişliğine sahip sabit bir kapasiteye sahiptir. Ama saldırgan silahlar (Kullanıcılar, özellikle senaryolar) Sınırsız kapasiteye sahip:
    
    * Birçok zaman noktasından veri için tek bir istek neden olabilirERDDAPÇok sayıda dosyayı açmak için (Sırada veya kısmen çoklu hazır) . Aşırı durumlarda, bir "basit" isteği kolayca RAID'i bağlı olarak bağlanabilirERDDAP™Bir dakika boyunca, diğer isteklerin kullanımını etkili bir şekilde engeller.
         
    * Tek bir istek hafızanın büyük bir kısmını tüketebilir (Yine de olsa rağmenERDDAP™Büyük talepleri işlemek için gerekli hafızayı en aza indirmek için kodlanır) .
         
    * Paralelleşme -
Akıllı bir kullanıcı için birçok iplik yaratarak büyük bir görevi paralelleştirmek kolaydır, her biri ayrı bir istek gönderir (Hangi büyük veya küçük olabilir) . Bu davranış bilgisayar bilim topluluğu tarafından büyük bir problemle başa çıkmak için verimli bir yol olarak teşvik edilir (ve paralelleştirme diğer koşullarda verimlidir) . Savaş analoguna geri dönün: kullanıcılar her birinin maliyetiyle aslında sınırsız sayıda eşzamanlı istek yapabilir, ancak her istekin maliyeti aslında sıfırdır, ancak her bir istekin maliyeti sıfırdır.ERDDAP™Büyük olabilir veERDDAP“ yanıt kapasitesi süresiz. Açıkçası,ERDDAP™Bu savaşı kaybedecek, süreceERDDAP™Diğer kullanıcıların haksız yere kalabalık olan birden aynı anda talep yapan yöneticiler siyah listeler.
         
    * Birden çok senaryo -
Şimdi birkaç akıllı kullanıcı her biri paralelleştirilmiş senaryolar olduğunda ne olacağını düşünün. Bir kullanıcı diğer kullanıcıların kalabalık olduğu kadar çok istek üretebilirse, o zaman birçok kullanıcı bu kadar çok talep yaratabilirERDDAP™Kırılır ve görünüşte sorumlu olur. Etkili bir şekilde[DDOS saldırısı](https://en.wikipedia.org/wiki/Denial-of-service_attack)Tekrar, tek savunmaERDDAP™Siyah liste kullanıcıları, diğer kullanıcıları haksız yere kalabalıklayan birden eşzamanlı talepler yapıyor.
         
    * Inflated Expectations -
Bu dünyada büyük teknoloji şirketleri (Amazon, Google, Facebook, ...) Ancak kullanıcılar, sağlayıcıların gerçekten sınırsız yeteneklerini beklemeye geldiler. Bu şirketler operasyonları para kazanıyor olduğundan, sahip oldukları daha fazla kullanıcı, BT altyapılarını genişletmek zorunda oldukları daha fazla gelir. Bu yüzden talepleri işlemek için büyük bir BT altyapısı karşılayabilirler. Ve akıllı bir şekilde, kullanıcıların tek bir isteğin yüklendiği isteklerini sınırlamak için her istek ve maliyetini sınırlandırırlar ve hiçbir zaman bir sebep yoktur ve hiçbir zaman bir sebep yoktur. (veya bir yol) Kullanıcılar için birden eşzamanlı istekler yapmak. Bu büyük teknoloji şirketleri çok daha fazla kullanıcıya sahip olabilirERDDAP™Ancak, istekleri her kullanıcıdan sınırlamak için çok daha fazla kaynağa ve akıllı yollar var. Büyük BT şirketleri için yönetilebilir bir durum (Ve zengin olurlar&#33;) Ama hayırERDDAP™Kurulumlar. Tekrar, tek savunmaERDDAP™Siyah liste kullanıcıları, diğer kullanıcıları haksız yere kalabalıklayan birden eşzamanlı talepler yapıyor.
         
    
Yani kullanıcılar: Birden fazla eşzamanlı istek yapmayın ya da karaliste olacaksınız&#33;
     

Açıkçası, sunucunuzun çok sayıda çekirdekleri varsa en iyisidir, çok fazla hafıza (Bu yüzden çok fazla hafıza ayırabilirsinizERDDAP™Ama her zaman ihtiyaç duyduğundan daha fazlası) , ve yüksek bantlı internet bağlantısı. Sonra hafıza nadiren veya asla sınırlayıcı bir faktör değildir, ancak ağ bant genişliği daha yaygın sınırlayıcı faktör haline gelir. Temel olarak, daha fazla ve daha eşzamanlı istekler olduğu gibi, verilen herhangi bir kullanıcıya hız azalır. Bu doğal olarak, her kullanıcı sadece bir istek gönderirse gelen istek sayısını yavaşlatır.
    
### ERDDAP™Data from THREDDS{#erddap-getting-data-from-thredds} 
Eğer seninERDDAP™Sitenizdeki bir THREDDS'den bazı verileri alır, THREDDS veri dosyalarının bir kopyasını yapmak için bazı avantajları vardır. (En azından en popüler veri setleri için) Başka bir RAID'de,ERDDAP™Bunun için erişime sahiptirERDDAP™dosyaları doğrudan servis edebilir. At At At At At At At At At At At At At At At At At At At At At AtERDBunu en popüler veri setlerimiz için yapıyoruz.

*   ERDDAP™Veriler doğrudan alabilir ve veri kümesini yeniden yüklemek için THREDDS beklemek zorunda değil ...
*   ERDDAP™Hemen yeni veri dosyalarını fark edebilir ve dahil edebilir, bu yüzden veri setinin değiştirdiğini görmek için sık sık zararlı THREDDS'ye sahip değildir. Görsün&lt;HerNMillis&gt; (/docs /server-admin/datasets #update allnmillis) .
* Yük 2 RAIDS ve 2 sunucu arasında bölünmüştür, çünkü istek her ikisinde de zor olmak yerine.ERDDAP™ve THREDDS.
* THREDDS’nin küçük bir küçük olmasına neden olan yanlış eşleştirme probleminden kaçınıyorsunuz (varsayılan olarak) Maksimum istek büyüklüğü.ERDDAP™Yanlış eşleştirmeyi işlemek için bir sistem var, ancak problemden kaçınmak daha iyidir.
* Her zaman iyi bir fikir olan verilerin yedek kopyasına sahipsiniz.

Herhangi bir durumda, asla THREDDS veERDDAP™Aynı Tomcat'ta. Onları ayrı Tomcats veya daha iyi, ayrı sunucularda çalıştırın.

THREDDS'nin, isteklerin sadece aslı olduğu bir durumda olduğunu görüyoruz. Eğer seninERDDAP™Bir THREDDS ve THREDDS'den veri almak bu durumda,ERDDAP™Bir savunma var (THREDDS tabanlı veri kümesinin mevcut olmadığını söylüyor) Ama hala rahatsız ediciERDDAP™Çünkü çünküERDDAP™Her seferinde bir aslı THREDDS'den bir veri setini yeniden yüklemeye çalışır. Bazı gruplar (Ayrıca dahil de dahil olmak üzere de dahil de dahil de dahil de dahil de dahil olmak üzere de dahil de dahil de dahil de dahil de dahil de dahil de dahil de dahil de dahil de dahil olmak üzere de dahil de dahil de dahil de dahil de dahil de dahil de dahil de dahil olmak üzere de dahil de dahil de dahil de dahil de dahil de dahil de dahil de dahil de dahil de dahil de dahilERD) Bunu proaktif olarak yeniden başlatma yoluyla önlemek (E.g., gece bir cron işinde) .

### Yavaşça cevap vermek{#responding-slowly} 
*    **If if if if if if if if if if if if if if if if if if if if if if if if if if if if ifERDDAP™Yavaşça yanıtlıyor** Ya da sadece bazı istekler yavaş cevap veriyorsa,
Yavaşlık makul ve geçici bir geçici olup olmadığını öğrenebilirsiniz (E.g., birçok talep senaryolardan veyaWMSKullanıcılar) Ya da bir şey açıklanamazsa ve ihtiyacınız var[Kapat ve Tomcat'ı yeniden başlatın veERDDAP™](#shut-down-and-restart).
    
If if if if if if if if if if if if if if if if if if if if if if if if if if if if ifERDDAP™Yavaşça cevaplanır, nedeni belirlemek için aşağıdaki tavsiyeyi görün, ki bu da sorunu düzeltmenizi sağlayacaktır.
Belirli bir başlangıç noktası olabilir (e.g., belirli bir istek URL) veya belirsiz bir başlangıç noktası (E.g.,ERDDAP™Yavaş yavaş) .
Kullanıcının dahil olduğunu biliyor olabilirsiniz (E.g., çünkü sizi e-postalmışlardı) Ya da değil.
Başka ipuçlarınız olabilir veya değil.
Tüm bu durumlar ve sorunların tüm olası nedenleri bir araya geldiğinden beri, aşağıdaki tavsiye tüm olası başlangıç noktalarıyla başa çıkmaya çalışır ve yavaş cevaplarla ilgili tüm olası sorunlarla ilgilidir.
    
    *    **ipuçları arayın[ERDDAP's log file](#log)**   ( *Büyük Parent Yönetmeny* /loglar /log.txt) .
        \\[Nadir durumlarda, ipuçları var[Tomcat's log file](#tomcat-logs)  ( *tomcat* /loglar/catalina.out) .\\]  
Hata mesajları arayın.
Bir numaradan gelen çok sayıda talep arayın (veya birkaç) Kullanıcılar ve belki de sunucunuzun kaynaklarından çok şey harcıyor (bellek, CPU zamanı, disk erişimi, internet bant genişliği) .
        
Sorun bağlıysa **Bir kullanıcı** Ancak, kullanıcının web hizmetleri aracılığıyla kim olduğu hakkında sık sık ipucu alabilirsiniz[ https://whatismyipaddress.com/ip-lookup ](https://whatismyipaddress.com/ip-lookup)Bu size kullanıcının IP adresi ile ilgili bilgi verebilir (Hangisinde bulabilirsinizERDDAP"[Giriş.txt](#log)Dosya dosyası) .
        
        * Eğer kullanıcı bir gibi görünüyorsa **Bot** Kötü davranmak kötü (Özellikle, bir arama motoru doldurmaya çalışıyorERDDAP™Her olası giriş değerleri ile formlar) , sunucunuzun düzgün bir şekilde ayarlandığından emin olun[Robotlar.txt](#robotstxt)Dosya.
        * Eğer kullanıcı bir gibi görünüyorsa **senaryo senaryo (s) ** Bu birden eşzamanlı istekler yapıyor, kullanıcıyla iletişime geçin, bunu açıklayınERDDAP™Sınırlı kaynaklar vardır (e.g., hafıza, CPU zamanı, disk erişimi, internet bant genişliği) Diğer kullanıcıların dikkate alınması ve sadece bir seferde bir istek yapmasını isteyin. Ayrıca, geri dönmedikleri takdirde siyah listelediğinizden de bahsedebilirsiniz.
        * Eğer kullanıcı bir gibi görünüyorsa **senaryo senaryo** Çok sayıda zaman alıcı isteği yapmak, kullanıcının küçük bir duraklama koyarak diğer kullanıcıların göz önünde bulundurmasını isteyin. (2 saniye?) İstekler arasındaki senaryoda.
        *    **WMSmüşteri yazılım** Çok talep edilebilir. Bir müşteri genellikle bir seferde 6 özel görüntü isteyecektir. Eğer kullanıcı bir gibi görünüyorsaWMSYasal istekler yapan müşteri, yapabilirsiniz:
            * Bunu görmezden gelirim. (önerilir, çünkü oldukça yakında hareket edecekler.) 
            * Turn off your server'sWMSServis via service via service via service via service via service via service via service via service via service via service via service via service via service via service via service via service via service via service via service via service through service via service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service through service throughERDDAP's kurulum.html dosyası. (tavsiye edilmez) 
        * İstekler görünüyorsa **aptal, deli, aşırı ya da kötü niyetli,** Ya da sorunu başka bir şekilde çözemezseniz, kullanıcının IP adresini geçici olarak veya kalıcı olarak eklemeyi düşünün [&lt;İstek Blacklist&gt; in your yourdatasets.xmlDosya) (/docs /server-admin/datasets#request Blacklist) .
             
    *    **Sorunu kendiniz tekrarlamaya çalışın, bilgisayarınızdan.**   
Sorun bir veri kümesi veya tüm veri setleri ile, bir kullanıcı veya tüm kullanıcılar için, sadece belirli istek türleri için, vb.
Problemi tekrar edebilirseniz, sorunu daraltmaya çalışın.
Sorunu tekrarlayamazsanız, sorun kullanıcının bilgisayarına, kullanıcının internet bağlantısına veya kurumun internet bağlantınıza bağlanabilir.
         
    * Eğer sadece **Bir veri kümesi** Yavaş yavaş cevap veriyor (Belki sadece sadece için **Bir tür istek** Bir kullanıcıdan) Sorun olabilir:
        *   ERDDAP“Verisetin kaynağı verilere erişim (Özellikle ilişkisel veritabanı, Cassandra ve uzaktan datasets) Geçici veya kalıcı olarak yavaş olabilir. Kaynağın hızını bağımsız olarak kontrol etmeye çalışınERDDAP. Yavaşsa, belki de onu geliştirebilirsiniz.
        * Özel istek veya genel istek türü ile ilgili sorun mu?
Bir veri kümesinin talep edilen alt kümesi daha büyük, istek başarısız olacaktır. Kullanıcı büyük talepler yapıyorsa, kullanıcının hızlı ve başarılı bir yanıt alma olasılığı daha küçük talepleri yapmasını isteyin.
            
Hemen hemen tüm veri setleri, diğer istek türlerinden bazı istekler işlemekte daha iyidir. Örneğin, bir veri kümesi farklı dosyalarda farklı zaman kıkırıkları depolandığında, çok sayıda zaman noktasından gelen veriler için talepler çok yavaş olabilir. Mevcut istekler zor bir türse, bu talepler için optimize edilen veri setinin bir kopyasını sunmayı düşünün. Ya da sadece bu tür bir istek zor ve zaman alıcı olduğunu ve sabrını isteyin.
            
        * Veri kümesi en uygun şekilde yapılandırılamaz. Veri setinin değişiklikleri yapabilirsinizdatasets.xmlYardım etmek için chunkERDDAP™Veri kümesini daha iyi idare edin. Örneğin,
            
            *   EDDGridNcFiles veri kümelerinden gelen veriler sıkıştırılmış nc4/hdf5 dosyaları, tüm coğrafi aralık aralığı için verileri elde ederken yavaştır. (e.g., bir dünya haritası için) Çünkü tüm dosya bastırılmalıdır. Dosyaları sıkıştırılmamış dosyalara dönüştürebilirsiniz, ancak sonra disk uzay gereksinimi çok daha büyük olacaktır. Muhtemelen bu tür veri kümelerinin belirli koşullarda yavaş olacağını kabul etmek daha iyidir.
            * The configuration of the [[değiştir | kaynağı değiştir]&lt;subsetVariables&gt;) (/docs /server-admin/datasets#subsetables) etiketin nasıl üzerinde büyük bir etkisi varERDDAP™EDDTable veri setleri ile uğraşır.
            * Yükseltebilirsin[Bir EDDTableFromDatabase](/docs/server-admin/datasets#database-speed)dataset.
            * Birçok EDDTable veri setleri tarafından genişletilebilir[Verilerin bir kopyasını depolayınNetCDFTartışma dosyaları](/docs/server-admin/datasets#eddtablefromfiles)hangisi,ERDDAP™Çok çabuk okuyabilirsiniz.
            
Belirli bir veri kümesini hızlandırmaya yardımcı olmak istiyorsanız, problemin ve veri setinin chunk'ının bir açıklaması ekleyin.datasets.xmlVe bizi gör[Bölüm almak için ek destek](/docs/intro#support).
             
    * If if if if if if if if if if if if if if if if if if if if if if if if if if if if if **Her şey her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her** in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in inERDDAP™Is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is **Her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman her zaman** Yavaş, problem olabilir:
        * Çalışan bilgisayarERDDAP™Yeterli hafıza veya işleme gücüne sahip olmayabilir. koşmak iyidirERDDAP™Modern, multi-core bir sunucuda. Ağır kullanım için, sunucu 64 bit işletim sistemi ve 8 GB veya daha fazla hafızaya sahip olmalıdır.
        * Çalışan bilgisayarERDDAP™Ayrıca birçok sistem kaynağı tüketen diğer uygulamaları da çalıştırılabilir. Eğer öyleyse, özel bir sunucu alabilirsinizERDDAP?? Örneğin (Bu bir ciro değil) , bir kud-core Mac Mini Server 8 GB bellek için -$1100 için.
             
    * If if if if if if if if if if if if if if if if if if if if if if if if if if if if if **Her şey her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her şeyi her** in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in inERDDAP™Is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is **geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak geçici olarak** Yavaş yavaş, bakış your view yourERDDAP"[ **/erddap/status.htmlSayfa sayfası** ](#status-page)Tarayıcınızda.
        * İşte bu,ERDDAP™Durum sayfası yüklenemez mi?
Eğer öyleyse,[Yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yenidenERDDAP™](#shut-down-and-restart).
        * OlsaydıERDDAP™Durum sayfası yavaş yavaş yük (e.g., &gt;5 saniye) ??
Bu, her şeyin içinde olduğu bir işarettir.ERDDAP™Yavaş yavaş çalışıyor ama mutlaka sorun değil.ERDDAP™Sadece gerçekten meşgul olabilir.
        * "Response Başarısız Zaman (Son büyük YükDatasets) ", n= çok sayıda?
Bu, son zamanlarda birçok başarısız talep olduğunu gösteriyor. Bu sorun olabilir veya problemin başlangıcı olabilir. Başarısızlık için medyan zamanı genellikle büyük (E.g., 210000 ms) ,
Bu, orada olduğu anlamına gelir. (Are?) Birçok aktif iplik.
Bu çok fazla kaynak harcıyordu (hafıza gibi, açık dosyalar, açık soketler, ...) ,
Bu iyi değil.
        * "Response Succeed Time (Son büyük YükDatasets) ", n= çok sayıda?
Bu, son zamanlarda birçok başarılı istek olduğunu gösteriyor. Bu sorun değil. Sadece senin anlamına gelirERDDAP™Ağır kullanım alıyor.
        * “Tomcat- beklenen ipliklerin Numberi” tipik bir değer mi?
Bu genellikle ciddi bir problemdir ki bu neden olacaktırERDDAP™Yavaşlayın ve sonunda dondurun. Eğer bu saatlerce devam ederse, proaktif olarak proaktif olmak isteyebilirsiniz[Yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yenidenERDDAP™](#shut-down-and-restart).
        * "Memory Use summary" listesinde, son "Memory: şu anda çok yüksek değer kullanıyor mu?
Bu sadece yüksek kullanım gösterebilir veya sorun işareti olabilir.
        * threadlerin ve statülerinin listesine bakın. alışılmadık bir sayı alışılmadık bir şey yapıyor mu?
             
    * Is Is Is Is Is Is Is Is Is Is Is Is Is **Kurumunuzun internet bağlantısı** Şu anda yavaş mı?
"internet hız testi" için interneti arayın ve ücretsiz online testlerden birini kullanın, örneğin[ https://www.speakeasy.net/speedtest/ ](https://www.speakeasy.net/speedtest/). Eğer kurumun internet bağlantısı yavaşsa, o zaman bağlantı arasındaki bağlantılar yavaştırERDDAP™Uzak veri kaynakları yavaş olacak ve bağlantıları arasındaki bağlantılarERDDAP™Ve kullanıcı yavaş olacak. Bazen bunu gereksiz internet kullanımını durdurarak çözebilirsiniz (e.g., insanlar yayın videoları ya da video konferans çağrıları izliyor) .
         
    * Is Is Is Is Is Is Is Is Is Is Is Is Is **Kullanıcının internet bağlantısı** Şu anda yavaş mı?
Kullanıcı, "internet hız testi" için interneti aramalı ve ücretsiz online testlerden birini kullanın, örneğin[ https://www.speakeasy.net/speedtest/ ](https://www.speakeasy.net/speedtest/). Kullanıcının internet bağlantısı yavaşsa, erişimlerini yavaşlatırERDDAP. Bazen, bunu kurumlarında gereksiz internet kullanımını durdurarak çözebilirler. (e.g., insanlar yayın videoları ya da video konferans çağrıları izliyor) .
         
    *    **Stuck?**   
Görmemize bakın[Bölüm almak için ek destek](/docs/intro#support).

### Shut Down and Restart{#shut-down-and-restart} 
*    **How to Shut Down and Restart Tomcat andERDDAP™**   
Tomcat'ı kapatıp yeniden başlatmanız gerekmez veERDDAPif if if if if if if if if ifERDDAP™Geçici olarak yavaş, bilinen bazı nedenlerden dolayı yavaş (scriptlerden veya senaryolardan birçok talep gibiWMSKullanıcılar) , veya değişiklikleri uygulamakdatasets.xmlDosya.
    
Tomcat'ı kapatmanız ve yeniden başlatmanız gerekiyor veERDDAP™Kurulum için değişiklikler yapmanız gerekiyorsa.xml dosyasına veya eğerERDDAP™Donmuşlar, aslar veya kilitler. Aşırı koşullarda,JavaTam bir çöp koleksiyonu yaparken bir dakika veya iki kez donabilir, ancak sonra geri döner. Bu yüzden bir dakika veya iki dakika beklemek iyiJava/ERDDAP™Gerçekten donmuş veya sadece uzun bir çöp koleksiyonu yapıyorsa. (Çöp koleksiyonu ortak bir problemse,[Tomcat'a daha fazla hafıza](/docs/server-admin/deploy-install#memory).) 
    
Tomcat Web Uygulama Yöneticisini kullanmaya veya Tomcat'ı kapatmayı tavsiye etmiyorum. Tomcat'ı tamamen kapatıp başlatmadıysanız, er ya da geç PermGen hafıza sorunlarınız olacak.
    
Tomcat'ı kapatma ve yeniden başlatmaERDDAP:
    
    * Linux veya Mac kullanıyorsanız:
         (Tomcat çalıştırmak için özel bir kullanıcı yarattıysanız, e.g., tomcat, bu kullanıcı olarak aşağıdaki adımları yapmayı unutmayın.)   
         
        1. Use cd *tomcat* /bin /
             
        2. ps kullanın -ef|java /tomcat işlemini bulmak için grep tomcat ID ID ID (Umarım, sadece bir süreç listelenecek) Biz çağıracağız *JavaProcessIDIDID* Aşağıda.
             
        3. If if if if if if if if if if if if if if if if if if if if if if if if if if if if ifERDDAP™Donmuş/hung/locked up, use Kill -3 *JavaProcessIDIDID* Söylemek içinJava  (Bu Tomcat) Tomcat log dosyasına bir iplik yapmak için: *tomcat* /loglar/catalina.out . Yeniden döndüğünüzden sonra, konuyu bulmakla sorunu teşhis edebilirsiniz bilgi (Ve yukarıdaki başka yararlı bilgiler) in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in *tomcat* /loglar/catalina.out ve ayrıca ilgili bölümleri okuyarak[ERDDAP™günlük arşiv arşivi](#log). Eğer istiyorsanız, bu bilgiyi içerebilir ve bizi görebilirsiniz[Bölüm almak için ek destek](/docs/intro#support).
             
        4. . /shutdown kullanın. sh
             
        5. ps kullanın -ef|Grep tomcat defalarca java/tomcat süreci listelenmedi.
            
Bazen, java/tomcat süreci tamamen kapanacak iki dakikaya kadar sürecek. Sebep şu:ERDDAP™Onları durdurmak için onun arkak ipliklerine bir mesaj gönderir, ancak bazen bu iplikleri iyi bir durdurma yerine getirmek için uzun bir zaman alır.
            
        6. Bir dakika sonra veya bu nedenle, java/tomcat kendi başına durmuyorsa, kullanabilirsiniz
Kill -9 *JavaProcessIDIDID*   
java/tomcat sürecini hemen durdurmak için zorlamak. Mümkünse, bunu sadece son bir tatil olarak kullanın. -9 geçiş güçlü, ancak çeşitli sorunlara neden olabilir.
             
        7. Yeniden yeniden başlamak içinERDDAP™. / startup.sh
             
        8. View View View ViewERDDAP™Tarayıcınızda yeniden başlatmanın başarılı olduğunu kontrol edin. (Bazen 30 saniye beklemeniz ve yüklemeye çalışmanız gerekirERDDAP™Tekrar tarayıcınızda başarılı olmak için.)   
             
    * Windows kullanıyorsanız:
         
        1. Use cd *tomcat* /bin /
             
        2. Use Use Use Use Useshutdown.bat  
             
        3. Windows Task Manager'ı kullanmak için / istediğiniz olabilir (Caroline Alt Del aracılığıyla erişilebilir) Bunu sağlamak içinJava/ Tomcat /ERDDAP™Süreç/application tamamen durduruldu.
Bazen, süreç/application kapatılması iki dakika sürer. Sebep şu:ERDDAP™Onları durdurmak için onun arkak ipliklerine bir mesaj gönderir, ancak bazen bu iplikleri iyi bir durdurma yerine getirmek için uzun bir zaman alır.
             
        4. Yeniden yeniden başlamak içinERDDAP™, başlangıç kullanın.bat
             
        5. View View View ViewERDDAP™Tarayıcınızda yeniden başlatmanın başarılı olduğunu kontrol edin. (Bazen 30 saniye beklemeniz ve yüklemeye çalışmanız gerekirERDDAP™Tekrar tarayıcınızda başarılı olmak için.)   
             
### Frequent Crashes veya Freezes{#frequent-crashes-or-freezes} 
If if if if if if if if if if if if if if if if if if if if if if if if if if if if ifERDDAP™Yavaş, kazalar veya dondurulur, bir şey yanlış. Bak,[ERDDAP's log file](#log)Nedeni anlamaya çalışın. Eğer yapamıyorsanız lütfen ayrıntıları ekleyin ve bizi gör[Bölüm almak için ek destek](/docs/intro#support).

En yaygın sorun, bir zamanlar birkaç senaryo çalışan ve / veya biri çok sayıda geçersiz istek yapıyor. Eğer bu olursa, muhtemelen o kullanıcıyı kara listeleyebilirsiniz. Siyah listelenen bir kullanıcı bir istek yaptığında, yanıtdaki hata mesajı onları sorunları işe almak için e-postaya teşvik eder. Sonra, sadece bir senaryoyu bir seferde yönetmelerini ve senaryolarını senaryolarında düzeltmelerini teşvik edebilirsiniz. (e.g., verileri zamanlamadan önce yanıtlanmamış uzaktan bir veri setinden talep edin) . Görsün&lt;İstek Blacklist&gt; in your yourdatasets.xmlDosya) (/docs /server-admin/datasets#request Blacklist) .

Aşırı koşullarda,JavaTam bir çöp koleksiyonu yaparken bir dakika veya iki kez donabilir, ancak sonra geri döner. Bu yüzden bir dakika veya iki dakika beklemek iyiJava/ERDDAP™Gerçekten donmuş veya sadece uzun bir çöp koleksiyonu yapıyorsa. (Çöp koleksiyonu ortak bir problemse,[Tomcat'a daha fazla hafıza](/docs/server-admin/deploy-install#memory).) 

If if if if if if if if if if if if if if if if if if if if if if if if if if if if ifERDDAP™Yavaş ya da dondurulur ve sorun zahmetli bir kullanıcı veya uzun çöp koleksiyonu değildir, genellikle sorunu problemle çözebilirsiniz[Yeniden yeniden başlamakERDDAP™](#shut-down-and-restart). Benim tecrübem şu ki,ERDDAP™Bir yeniden başlatmaya gerek kalmadan aylarca sürebilir.
     

### Monitor{#monitor} 
Sizi izleyebilirsinizERDDAP‘Yeryüzüne bakarak[/erddap/status.htmlSayfa sayfası](#status-page)Özellikle üst bölümdeki istatistikler. If if if if if if if if if if if if if if if if if if if if if if if if if if if if ifERDDAP™Yavaş veya dondurulur ve sorun sadece son derece ağır bir kullanım değildir, genellikle sorunu problemi çözebilirsiniz[Yeniden yeniden başlamakERDDAP™](#shut-down-and-restart). Prometheus entegrasyonu ile /erddap /metriklerde mevcut ek ölçümler var.

Benim tecrübem şu ki,ERDDAP™Bir yeniden başlatmaya gerek kalmadan aylarca sürebilir. Sadece bunu yeniden başlatmanız gerekir, eğer yaptığınız bazı değişiklikleri uygulamak istiyorsanızERDDAP's kurulum.xml veya yeni versiyonları yüklemeniz gerektiğindeERDDAP™,JavaTomcat veya işletim sistemi. Yeniden başlatmanız gerekiyorsaERDDAP™Sık sık, bir şey yanlış. Bak,[ERDDAP's log file](#log)Nedeni anlamaya çalışın. Eğer yapamıyorsanız lütfen ayrıntıları ekleyin ve bizi gör[Bölüm almak için ek destek](/docs/intro#support). Geçici bir çözüm olarak, kullanmayı deneyebilirsiniz[Monit](https://mmonit.com/monit/)Seni izlemek içinERDDAP™Ve gerekirse yeniden başlayın. Ya da yeniden başlamak için bir cron işi yapabilirsinizERDDAP™  (proaktif olarak proaktif olarak proaktif olarak proaktif olarak proaktif olarak) periyodik olarak. Bir senaryoyu otomatik izleme ve yeniden başlatmaya yazmak için biraz zor olabilirERDDAP. Yardımcı olabilecek bazı ipuçları:

* Tomcat süreci hala grep ile geçiş yaparak test edebilirsiniz:
ps -u *tomcat Kullanıcı Kullanıcı*  |grep -c java
Bu, çıktıyı "1"ye indirecektir, eğer tomcat süreci hala hayattaysa veya "0" işlemi durdurur.
     
* Eğer gawk ile iyiyseniz, işlemID'yi sonuçlardan çıkarabilirsiniz
ps -u *tomcat Kullanıcı Kullanıcı*  |grep java ve senaryonun diğer hatlarında işlemID'i kullanın.
     

Monit ya da bir cron işi kurduysanız, ayrıntıları paylaşabilseydiniz harika olurdu, böylece diğerleri bize fayda görebilir[Bölüm almak için ek destek](/docs/intro#support)Nerede paylaşabileceğiniz için.

#### Permgen{#permgen} 
Tomcat Manager'ı yeniden yüklemeye defalarca kullanıyorsanız (Dur ve Başlayın)  ERDDAP™,ERDDAP™Başlamak ve java.lang atmak için başarısız olabilir. OutOfMemoryError: PermGen. Çözüm periyodik olarak periyodik olarak yapılır (Ya da her seferinde?)  [Kapat ve yeniden tomcat veERDDAP™](#shut-down-and-restart)Bunun yerine sadece yeniden yükleniyorERDDAP.
\\[Güncelleme: Bu problem büyük ölçüde en azalandı veya sabitlendiERDDAP™1.24.\\]  
     
#### Log Log Log{#log} 
*    **[Giriş.txt](#log)**   
If if if if if if if if if if if if if if if if if if if if if if if if if if if if ifERDDAP™Başlamıyor veya bir şey beklendiği gibi çalışmıyorsa, hata ve teşhis mesajlarına bakmak çok kullanışlıdır.ERDDAP™log dosyası.
    * Giriş dosyasıdır *Büyük Parent Yönetmeny* /loglar /log.txt
         ( *Büyük Parent Yönetmeny* belirtilmiştir.[Kurulum.xml](/docs/server-admin/deploy-install#setupxml)) . Eğer bir log yoksa. txt dosyası veya eğer giriş. txt dosyası yeniden başlatdığınızdan beri güncellenmediERDDAP™, bak[Tomcat Log Files](#tomcat-logs)Orada bir hata mesajı olup olmadığını görmek için.
    * Giriş dosyasında tanılama mesajlarının türleri:
        * Bir şeyin o kadar yanlış gittiği zaman “terör” kelimesi kullanılır ki, prosedür tamamlanmadı. Bir hata almak için can sıkıcı olsa da, problemle başa çıkmak için hata kuvvetleri. Bizim düşüncemiz, bir hata atmak daha iyidir, sahip olmak yerineERDDAP™Boyunca, beklemediğiniz bir şekilde çalışmak.
        * Bir şey ters gittiğinde “savaş” kelimesi kullanılır, ancak prosedür tamamlanabilirdi. Bunlar oldukça nadir.
        * Başka bir şey sadece bilgilendirici bir mesajdır. Bilginin ne kadar giriş olduğunu kontrol edebilirsiniz [&lt;logLevel&gt; (/docs /server-admin/datasets#log level)  datasets.xml.
        * Dataset reloads ve kullanıcı yanıtları &gt;10 saniyeyi bitirmek için (başarıyla veya başarısız olarak) " ile işaretlenir" (&gt;10s&#33;) ". Böylece, kayıt için yavaş olan veri setlerini bulmak için bu cümle için log.txt dosyasını arayabilirsiniz ya da bitirmek için yavaş olan istek numaraları. Daha sonra veri kümesi sorununun ne olduğunu veya kullanıcının isteğinin ne olduğunu ve kim olduğunu görmek için log.txt dosyasında daha yüksek görünebilirsiniz. Bu yavaş veri kümesi yükleri ve kullanıcı istekleri bazen vergilendirilirERDDAP. Bu talepleri hakkında daha fazla bilgi, problemleri tanımlamanıza ve çözmenize yardımcı olabilir.
    * Bilgi, disk sürücüsündeki log dosyasına oldukça büyük chunkste yazılır. avantaj bu çok verimli olmasıdır -ERDDAP™Bilginin günlük dosyaya yazılması için asla engel olmayacaktır. dezavantajlılık, girişin neredeyse her zaman kısmi bir mesajla biteceğini, bir sonraki chunk yazıya kadar tamamlanmayacağını gösteriyor. Bunu güncelleyebilirsiniz (Bir an için) Görmek içinERDDAP's durumu web sayfası at https://*your.domain.org*/erddap/status.html   (veyahttp://if if if if if if if if if ifhttpsetkinleştirilmedi) .
    * Giriş.txt dosyaları 20 MB'ye ulaştığında,
Dosya yeniden adlandırılır. txt.previous ve yeni bir log.txt dosyası oluşturulur. Yani log dosyaları bir araya gelmiyor.
        
Kurulumda.xml, MegaBytes'te log dosyası için farklı bir maksimum boyut belirtebilirsiniz. En az izin verilen 1 (MB MB MB) . Maksimum izin 2000 (MB MB MB) . varsayılan 20'dir. (MB MB MB) . Örneğin:
```
        <logMaxSizeMB>20</logMaxSizeMB>
```

    * Ne zaman yeniden başlatılırsanERDDAP™,
        ERDDAP™Giriş.txt ve logun bir arşiv kopyasını yapar. txt.previous files with a time pul in the file's name. Yeniden başlatmadan önce sorun olsaydı, bu arşivlenmiş dosyaları problemin ne olduğu konusunda analiz etmek faydalı olabilir. Artık gerekli değilse arşiv dosyalarını silebilirsiniz.
         
##### Giriş yapın.txt{#parsing-logtxt} 
ERDDAP's log. txt dosyası parsing için tasarlanmamıştır (İstenilen bilgileri üreten düzenli ifadeler oluşturabilir olsanız da,) . Bir insanın yanlış gittiğinde neyin yanlış gittiğini anlamasına yardımcı olmak için tasarlanmıştır. Bir hata veya problem raporu gönderdiğinizdeERDDAP™Geliştiriciler, mümkün olduğunda, lütfen tüm bilgileri problemli istekle ilgili log.txt dosyasından ekleyin.

Verimlilik nedenleri için,ERDDAP™Sadece kayıt için bilgi yazıyor. Büyük bir bilgiden sonra txt bir araya geldi. Eğer log ziyaret ederseniz. Bir hata gerçekleştiğinden hemen sonra, hatayla ilgili bilgi henüz log.txt için yazılmamış olabilir. Kayıttan mükemmel bir şekilde güncel bilgi almak için.txt, ziyaret etERDDAP"[Durum.html sayfası](#status-page). When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When WhenERDDAP™Bu talep eden süreçler, tüm bekleyen bilgileri log.txt'e döküyor.

For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For ForERDDAP™Kullanım istatistikleri, lütfen kullanın[Apache ve/veya Tomcat günlük dosyaları](#tomcat-logs)Bunun yerine,ERDDAP's log.txt. Not that Not that Note that NotERDDAP"[Durum.html sayfası](#status-page)  (Bazı bazıları bazıları bazıları bazıları) ve[Günlük Rapor](#daily-report)  (Daha fazla daha fazlası) Sizin için önceden hesaplanan çok sayıda kullanım istatistikleri var.
    
### Tomcat Logs{#tomcat-logs} 
If if if if if if if if if if if if if if if if if if if if if if if if if if if if ifERDDAP™Başlamıyor çünkü bir hata çok erken meydana geldiERDDAP"Başlangıç, hata mesajı Tomcat'ın günlük dosyalarında ortaya çıkacak ( *tomcat* /loglar/catalina. *Bugün bugün bugün bugün bugün bugün bugün* .log veya *tomcat* /loglar/catalina.out) İçinde değil[ERDDAP's log.txt file](#log).

Kullanım İstatistiki: İnsanların bir günlük dosyadan toplamak istediği bilgilerin çoğu için (e.g., kullanım istatistikleri) Lütfen Apache ve / veya Tomcat log dosyalarını kullanın. Güzel biçimlendirilmiş ve bu tür bilgilere sahipler. Onları analiz etmek için çok sayıda araç var, örneğin,[AWStats](https://www.awstats.org),[Elastic Search's Kibana](https://www.elastic.co/products/kibana)Ve[JMeter](https://jmeter.apache.org)Ancak web'i sizin amaçlarınız için doğru aracı bulmak için arayın.

Kayıt dosyalarının yalnızca IP adresleri olarak tanımladığını unutmayın. Belirli bir IP adresi, e.g ile ilgili bilgi edinmenize yardımcı olmak için web siteleri vardır.[WhatIs myIPAddress](https://whatismyipaddress.com/ip-lookup)Ancak normalde kullanıcının adını bulamadınız.

Ayrıca, çünkü[DHCP](https://en.wikipedia.org/wiki/Dynamic_Host_Configuration_Protocol)Verilen bir kullanıcının IP adresi farklı günlerde farklı olabilir veya farklı kullanıcılar farklı zamanlarda aynı IP adresine sahip olabilir.

Alternatif olarak, gibi bir şey kullanabilirsiniz[Google Analytics](https://analytics.google.com/analytics/web/provision/?authuser=0#/provision). Ancak dikkat edin: Google Analytics gibi dış hizmetleri kullandığınızda, Google’a Google’a tam erişim sağlayarak Google’ın gizliliğini veriyorsunuz. (Ve diğerleri?) Sonsuza dek tutabilir ve herhangi bir amaç için kullanılabilir (Belki teknik olarak değil, ama muhtemelen pratikte) . Kullanıcılarınız buna onay vermedi ve muhtemelen web sitenizde takip edileceklerini bilmiyorlar, çünkü muhtemelen neredeyse tüm web sitelerinde takip ettikleri ölçüde farkında değiller. Bu günlerde, birçok kullanıcı web'de yaptıkları her şeyin bu büyük şirketler tarafından izlendiği konusunda çok endişeli. (Google, Facebook, vb.) Ve hükümet tarafından ve bu, cansız bir saldırıyı hayatlarının içine bulurlar. (Kitapta olduğu gibi 1984) . Bu, ürünleri yüklemek için birçok kullanıcıyı tahrik etti[Gizlilik](https://www.eff.org/privacybadger/faq)Takip etmek, alternatif tarayıcıları kullanmak[Tor Browser](https://www.torproject.org/)  (veya geleneksel tarayıcılarda takip etmek) , ve alternatif arama motorlarını kullanmak[Duck Git](https://duckduckgo.com/). Google Analytics gibi bir hizmet kullanıyorsanız, lütfen en azından kullanımını ve sonuçlarını değiştirerek kullanın&lt;standartPrivacyPolicy&gt; etiketiERDDAP"
\\[tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messajlar.xml dosyası.
    
### E-Mail Log{#e-mail-log} 
*    **e-postaLogYEAR-MM-D.txt**   
    ERDDAP™Her zaman mevcut gün e-posta mesajlarının tüm metinlerini yazar LogYEAR-MM-DD.txt dosyası in *Büyük Parent Yönetmeny* /loglar ( *Büyük Parent Yönetmeny* belirtilmiştir.[Kurulum.xml](/docs/server-admin/deploy-install#setupxml)) .
    * Eğer sunucu e-posta mesajlarını gönderemezse veya yapılandırdıysanızERDDAP™E-posta mesajları göndermemek ya da sadece merak ediyorsanız, bu dosya gönderilen tüm e-posta mesajlarını görmek için uygun bir yoldur.
    * Artık ihtiyaç duyulmamışlarsa önceki gün e-posta log dosyalarını silebilirsiniz.
         
### Günlük Rapor{#daily-report} 
Günlük Raporun birçok yararlı bilgisi vardır - tüm bilgiler sizinkindenERDDAP"[/erddap/status.htmlSayfa sayfası](#status-page)ve daha fazlası.
    * Bu senin en tam özetidirERDDAP“Dün durumu.
    * Diğer istatistikler arasında, yüklenmeyen bir veri setlerinin listesini ve yarattığı istisnaları içerir.
    * Başlarken oluşturulurERDDAP™  (Sadece hemen sonraERDDAP™Tüm veri kümelerini yüklemeye çalışmayı bitirin) 7'den kısa bir süre sonra her sabah yerel olarak üretilir.
    * Ne zaman oluşturulursa, yazılır[ERDDAP's log.txt file](#log).
    * Ne zaman oluşturulursa, e-postalılır&lt;e-postaDailyReportsTo&gt; ve&lt;Her e-posta To&gt; (Hangi belirtilmektedir[Kurulum.xml](/docs/server-admin/deploy-install#setupxml)) E-posta sistemini kurdunuz (Kurulumda.xml) .

### Durum Sayfa{#status-page} 
Sizin durumunuzu görebilirsinizERDDAP™Herhangi bir tarayıcıdan&lt;BaseUrl&gt;/erddap/status.html
* Bu sayfa dinamik olarak yaratılır, bu yüzden her zaman sizin için yenilenen istatistiklere sahiptir.ERDDAP.
* İstek sayısına ilişkin istatistikler içerir, bellek kullanımı, thread yığını izler, görevThread, vs.
* Çünkü Stat Page herkes tarafından görülebilir, oldukça fazla bilgi içermiyor[Günlük Rapor](#daily-report).
         
### Add/Changing Datasets{#addingchanging-datasets} 
ERDDAP™Genellikle rereadsdatasets.xmlHer her şey her her her her *loadDatasetsMinMinutes*   (belirtilmiş durumda belirtilen[Kurulum.xml](/docs/server-admin/deploy-install#setupxml)) . Bu yüzden değişiklikler yapabilirsinizdatasets.xmlHerhangi bir zaman bile olsaERDDAP™Koşuyor.
Yeni bir veri kümesi yakında tespit edilecek, genellikle içeride *loadDatasetsMinMinutes* .
Değişen bir veri kümesi, ne zaman yeniden yüklenecek *Reload EveryNMinutes* yaşlı yaşlı yaşlı yaşlı yaşlı yaşlı yaşlı yaşlı yaşlı yaşlı yaşlı yaşlı (belirtildiği gibi,datasets.xml) .
    
#### Bayrak Bayrak{#flag} 
*    **[Bir Bayrak Dosyası](#flag)SöyleyinERDDAP™Yakında Mümkün olduğunca bir Dataset yeniden yüklemeye çalışın** 
    
    *   ERDDAP™Bir veri kümesinde herhangi bir değişiklik fark etmeyecektirdatasets.xmlolana kadarERDDAP™Veri setini yeniden yükler.
         
    * Söylemek içinERDDAP™Bir veri kümesini mümkün olduğunca kısa sürede yeniden yüklemek için (Veriset'in başlamadan önce)&lt;Reload EveryNMinutes&gt; yeniden yüklenmesine neden olur), bir dosyayı bir dosyayı içine sokacaktır. *Büyük Parent Yönetmeny* /flag ( *Büyük Parent Yönetmeny* belirtilmiştir.[Kurulum.xml](/docs/server-admin/deploy-install#setupxml)) Bu, veri kümesinin aynı adı vardırdatasetID.
Bu anlatıyorERDDAP™Bu veri kümesi ASAP'ı yeniden yüklemeye çalışın.
Veri setinin eski versiyonu, yeni sürüm mevcut olana kadar kullanıcılar için kullanılabilir ve atomik olarak yerine getirilir.
For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For ForEDDGridFromFiles and EDDTableFiles'ten, yeniden yükleme veri kümesi yeni veya değiştirilmiş dosyaları arar ve bunları veri kümesine dahil eder. Böylece yeniden yükleme zamanı yeni veya değiştirilmiş dosyaların sayısına bağlıdır.
Eğer veri kümesi aktif="false" varsa,ERDDAP™Veri setini kaldıracaktır.
         
##### Bad Files Flag Flag{#bad-files-flag} 
* /flag directory'in bir çeşidi, /badFilesFlag rehberidir. (Eklenenlere eklendiERDDAP™v2.12.)   
Bir dosya koyarsanız *Büyük Parent Yönetmeny* /badFilesFlag directory with adatasetIDDosya adı olarak (Dosya içeriği önemli değil) Sonra en kısa süredeERDDAP™Kötülüğü görür Bayrak dosyası,ERDDAP™Will:
    
    1. KötüFilesFlag dosyasını hazırlayın.
    2. KötüFiles.ncDosya dosyası (Eğer bir tane varsa) Bu veri kümesi için kötü dosyaların listesine sahiptir.
Veri setleri gibiEDDGridSideBySide bu çocukDatasets'e sahip, bu aynı zamanda badFiles'i de siliyor.ncTüm çocuk veri kümeleri için dosya.
    3. Dataset ASAP'ı yeniden yükleyin.
    
Böylece, bu sebeplerERDDAP™Daha önce dosyaları ile çalışmak için tekrar denemek (Açıkçası?) Kötü olarak işaretlendi.
         
##### Hard Flag{#hard-flag} 
* /flag directory'in başka bir çeşidi, /hardFlag rehberidir. (Eklenenlere eklendiERDDAP™v1.74.)   
Bir dosyayı koyarsanız *Büyük Parent Yönetmeny* /hardFlag with adatasetIDDosya adı olarak (Dosya içeriği önemli değil) Sonra en kısa süredeERDDAP™Sert görmek zor Bayrak dosyası,ERDDAP™Will:
    
    1. SertFlag dosyasını temizleyin.
    2. Dataset'i iptal edinERDDAP.
    3. Tüm bilgileri, tüm bilgileri,ERDDAP™Bu veri kümesi hakkında depolandı.
For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For ForEDDGridFromFiles and EDDTableFiles subclasses'ten bu, veri dosyalarının iç veritabanını ve içeriklerini silir.
Veri setleri gibiEDDGridSideBySide bu çocukDatasets'e sahip, bu aynı zamanda veri dosyalarının iç veritabanını ve tüm çocuk veri setleri için içeriklerini silmektedir.
    4. Veri kümesini yeniden yükleyin.
For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For ForEDDGridFromFiles and EDDTable FromFiles subclasses, bu nedenlerERDDAP™Yeniden hazırlanmak için **Bütün hepsi** Veri dosyalarının. Böylece, reload zamanı veri kümesindeki toplam veri dosyalarına bağlıdır. Çünkü veri kümesi kaldırıldıERDDAP™SertFlag fark edildiğinde, veri seti yeniden yüklenmeye kadar veri seti kullanılamaz. Sabırlı olun. Bak,[Giriş.txt](#log)Dosya, neler olup bittiğini görmek istiyorsanız.
    
SertFlag varyantı, veri kümesinin şu anda yüklenmediği halde veri setinin depolanan bilgileri siliyor.ERDDAP.
    
Hard Hard Hard Bayraklar, bir değişiklike neden olan bir şey yaptığınızda çok yararlıdırERDDAP™Kaynak verilerini okur ve yorumlar, örneğin, yeni bir sürüm yüklerkenERDDAP™veya bir veri kümesinin tanımına bir değişiklik yaptığınızdadatasets.xml
    
* Bayrak, badFilesFlag'nın içeriği ve sert dosyalar irrelevant.ERDDAP™Sadece dosya adı almak için görünüyordatasetID.
     
* Büyük veri kümesi reloads arasında,ERDDAP™Bayrak, badFilesFlag ve hardFlag dosyaları için sürekli görünüyor.
     
* Bir veri kümesi yeniden yüklendiği zaman, tüm dosyalar *Büyük Parent Yönetmeny* /[Önbelli önbelli önbelli önbelli önbelli önbelli önbelli önbelli önbelli önbelli önbelli](#cached-responses)/ *datasetID* Rehber silinir. Bu da içerir.ncNormalde ~ 15 dakika boyunca önbellek olan görüntü dosyaları.
     
* Not if the dataset's xml contains[Aktif="false"](/docs/server-admin/datasets#active)Bir bayrak, veri kümesinin aktif hale getirilmesine neden olacaktır (Aktif ise) Ve herhangi bir durumda, yeniden yüklenemez.
     
* Herhangi bir zamanERDDAP™LoadDatasets to do a major reload (zamanlı yeniden yük kontrol edilir)&lt;loadDatasetsMinMinutes&gt;) veya küçük bir reload (Dış veya iç bayrak sonucu) ,ERDDAP™Tüm okurlar okur&lt;DecomedCacheMaxGB&gt;&lt;DecomedCacheMaxMinutesOld&gt;,&lt;kullanıcı&gt;&lt;Blacklist&gt;,&lt;YavaşDownTroubleMillis&gt; ve&lt;AbonelikEmailBlacklist&gt; Yeni ayarlara etiketler ve anahtarlar. Bu yüzden almak için bir bayrak kullanabilirsinizERDDAP™Bu etiketlere değişiklikler fark etmek ASAP.

##### Set Dataset Flag{#set-dataset-flag} 
*  ERDDAP™Bir web hizmeti var, böylece bayraklar URL üzerinden ayarlanabilir.
    
    * Örneğin,
         https://coastwatch.pfeg.noaa.gov/erddap/setDatasetFlag.txt?datasetID=rPmelTao&flagKey=123456789   
         (Bu sahte bir bayrak Anahtar Anahtar Anahtar) rPmelTao dataset için bir bayrak ayarlayacaktır.
    * Her biri için farklı bir bayrak vardatasetID.
    * Yöneticiler tüm veri kümeleri için bayrak URL’lerinin listesini görebilirler, onların altlarına bakarak[Günlük Rapor](#daily-report)e-posta.
    * Yöneticiler bu URL'leri gizli olarak tedavi etmelidir, çünkü bir veri kümesini sıfırlama hakkını verirler.
    * Eğer bayrakKeys'in onları rahatsız eden birinin eline düştüğünü düşünüyorsanız, değiştirebilirsiniz&lt;BayrakKeyKey&gt; içinde[Kurulum.xml](/docs/server-admin/deploy-install#setupxml)Ve yeniden başlayınERDDAPzorlamak için zorlamakERDDAP™Farklı bir bayrakKeys seti oluşturmak ve kullanmak.
    * Eğer değiştirirseniz&lt;BayrakKeyKey&gt;, tüm eski abonelikleri sil. (Günlük Raporunuzdaki listeyi görmek) Ve yeni URL'leri onlara sahip olmak istediğiniz insanlara göndermeyi unutmayın.
    
Bayrak sistemi daha verimli bir mekanizma için temel olarak hizmet edebilirERDDAP™Bir veri kümesini yeniden yüklemek için. Örneğin, bir veri kümesi ayarlayabilirsiniz&lt;HerNMinutes&gt; büyük bir sayıya yeniden yükleniyor (e.g., 10080 = 1 hafta) . Sonra, veri kümesinin değiştiğini bildiğiniz zaman değişti (Belki de veri kümesinin veri setine bir dosya eklediniz) Ancak, veri kümesinin mümkün olduğu kadar kısa sürede yeniden yüklendiği için bir bayrak ayarlayın. Bayraklar genellikle hızla görülür. Ancak YükDatasets thread zaten meşgulse, bayrak üzerinde hareket etmek için mevcut olduğu bir süre olabilir. Ancak bayrak sistemi, ayarlanmadan çok daha duyarlı ve çok daha verimlidir&lt;HerNMinutes&gt; küçük bir sayıya yeniden yükleyin.
    
#### Datasets{#removing-datasets} 
Bir veri kümesi aktifseERDDAP™Ve bunu geçici veya kalıcı olarak devre dışı bırakmak istiyorsunuz:
1. In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In Indatasets.xmlDataset için, set[Aktif="false"](/docs/server-admin/datasets#active)Dataset etiketinde.
2. BekleyinERDDAP™Bir sonraki büyük geri yükleme veya yükleme sırasında veri kümesini kaldırmak için[Bir bayrak](#flag)Dataset'in anlatmak içinERDDAP™Bu değişikliği mümkün olduğunca çabuk fark etmek. Bunu yaptığınızda,ERDDAP™Veri kümesi hakkında depolanan herhangi bir bilgiyi atmıyor ve kesinlikle gerçek verilere hiçbir şey yapmıyor.
3. O zaman aktif="false" veri setini terk edebilirsinizdatasets.xmlveya kaldır.
         
#### Datasets Reloaded ne zaman?{#when-are-datasets-reloaded} 
RunLoadDatasets adlı bir iplik, veri setlerinin yeniden yüklendiği zaman kontrol eden usta iplikdir. RunLoad Datasets sonsuza kadar döngüler:

1. RunLoadDatasets mevcut zamanı not eder.
2. RunLoadDatasets bir "majorLoad" yapmak için bir LoadDatasets thread başlatır. Mevcut/previous majorLoad ile ilgili bilgileri sizin tarafınızdan görebilirsinizERDDAP"
    [/erddap/status.htmlSayfa sayfası](#status-page)  (Örneğin,[Durum sayfası örneği](https://coastwatch.pfeg.noaa.gov/erddap/status.html)) .
    
    1. LoadDatasets bir kopyasını yapardatasets.xml.
    2. LoadDatasets, kopyası ile okurdatasets.xmlVe her veri kümesi için, veri setinin olması gerekiyorsa bakın (yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden) Yükleniyor veya kaldırıldı.
        * Eğer[Bayrak bayrağı](#flag)Dosya bu veri kümesi için mevcuttur, dosya silinir ve veri kümesi aktif="false kaldırılırsa kaldırılır. (yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden) Aktif="Real'e yükleniyorsa (Veri kümesinin yaşı ne olursa olsun) .
        * Veri kümesinin veri kümesi.xml chunk aktif="false" ve dataset şu anda yüklenir. (aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif) Ama bu yüklenemez (kaldırıldı Kaldır kaldırıldı) .
        * Dataset aktif="Real" ve veri seti zaten yüklenemezse, yüklenir.
        * Dataset aktif="Real" ve dataset zaten yükleniyorsa, veri seti veri setinin yaşı yeniden yükleniyor (O zamandan beri son yük yükü) Onunkinden daha büyük&lt;reload HerNMinutes&gt; (varsayılan = 10080 dakika) Aksi takdirde, veri kümesi yalnız bırakılır.
    3. LoadDatasets bitiyor.
    
RunLoadDatasets thread, bitirmek için LoadDatasets thread için bekliyor. LoadDatasets yükDatasets'ten daha uzun sürerse MinMinutes (Kurulumda belirtildiği gibi.xml) RunLoadDatasets, LoadDatasets threadini kesintiye uğrattı. İdeal olarak, LoadDatasets kesmeyi fark eder ve bitirir. Ama bir dakika içinde kesmeyi fark etmezse RunLoadDatasets yükDatasets çağırır. Dur Dur Dur Dur Dur () Ama bu istenmeyen.
3. Son büyükLoad'ın başlamasından bu yana zaman, Datasets'in yüklerinden daha az. MinMinutes (Kurulumda belirtildiği gibi.xml, e.g., 15 dakika) RunLoadDatasets defalarca görünüyor[Bayrak bayrağı](#flag)dosyaların içindeki dosyaları *Büyük Parent Yönetmeny* /flag directory. Bir veya daha fazla bayrak dosyaları bulunursa, silinir ve RunLoadDatasets bir "minorLoad" yapmak için bir LoadDatasets iplik başlatır. (majorLoad=false) . KüçükLoad bilgilerini senin hakkında göremezsinERDDAP"[/erddap/status.htmlSayfa sayfası](#status-page).
    1. LoadDatasets bir kopyasını yapardatasets.xml.
    2. LoadDatasets, kopyası ile okurdatasets.xmlVe her veri kümesi için bir bayrak dosyası vardı:
        * Veri kümesinin veri kümesi.xml chunk aktif="false" ve dataset şu anda yüklenir. (aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif aktif) Ama bu yüklenemez (kaldırıldı Kaldır kaldırıldı) .
        * Veri setinin aktif="Real'e sahipse, veri kümesidir. (yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden) Yükleniyor, yaşına bakılmaksızın. Yanlış olmayan veri setleri görmezden gelinir.
    3. LoadDatasets bitiyor.
4. RunLoad Datasets adıma geri dönüyor 1.

Notlar:
* Startup Startup
Yeniden başlatdığınızdaERDDAP™Aktif="Real ile her veri kümesi yükleniyor.
* Önbellek
Bir veri kümesi ne zaman (yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden) Yükleniyor, önbellek (Herhangi bir veri yanıt dosyaları ve / veya görüntü dosyaları dahil) Boşluktır.
* Birçok Datasets
Birçok veri kümesiniz ve / veya bir veya daha fazla veri setleri varsa yavaş yavaştır (yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden) Yük, bir LoadDatasets thread işini bitirmek için uzun zaman alabilir, belki de yüklemeDatasets'ten daha uzun sürebilir. MinMinutes.
* One LoadDatasets Thread
Bir zamanlar çalışan bir LoadDatasets thread daha fazla yoktur. LoadDatasets zaten çalıştırıldığında bir bayrak ayarlandığında, bayrak muhtemelen bu LoadDatasets threadin tükenmesine kadar fark edilmez veya hareket etmez. “Bu aptal. Neden sadece veri setlerini yüklemek için bir sürü yeni iplik başlatmıyorsunuz?” Ancak bir uzaktan sunucudan veri alan birçok veri kümesiniz varsa, bir LoadDatasets thread bile uzaktan sunucuda önemli bir stres getirecektir. Aynısı, bir RAID dosyalarından veri alan birçok veri kümesiniz varsa doğrudur. Birden fazla LoadDatasets parçasına sahip olmaktan hızla azalır.
* Bayrak = ASAP
Bir bayrak sadece veri kümesinin olması gereken sinyalleri ayarlayın (yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden) Mümkün olduğu kadar kısa sürede yüklenemez. LoadDatasets thread şu anda çalışıyorsa, dataset birkaç saniye içinde yeniden yüklenecek. Ancak bir LoadDatasets thread şu anda çalışıyorsa, veri seti muhtemelen bu YükDatasets thread bitinceye kadar yeniden yüklenemez.
* Flag File Deleteded
Genel olarak, bir bayrak dosyası koyarsanız *Büyük Parent Yönetmeny* /erddap /flag directory (Dataset'in bayrağını ziyaret ederek Url veya orada gerçek bir dosya koymak) Ancak veri kümesi genellikle bu bayrak dosyası silindikten sonra çok yakında yeniden yüklenecektir.
* Bayrak, küçük reload HerNMinutes
Bir veri kümesinin yeniden yüklenmesi gerektiğinden başka bir dış yolu varsa ve sizin için uygunsa, bir veri kümesinin her zaman güncel olduğundan emin olmanın en iyi yolu, yeniden yüklenmesini sağlamaktır. HerNMinutes to a large number (10080?) Ve bir bayrak ayarla (Bir senaryo aracılığıyla?) Ne zaman yeniden yüklenmelidir. Bu sistemdir ki,EDDGridErddap ve EDDTableErddap kullanımı, veri setinin yeniden yüklenmesi gereken mesajları alır.
* Girişe bakın.txt
Birçok ilgili bilgi yazılıdır. *Büyük Parent Yönetmeny* /loglar /log.txt dosyası. Eğer şeyler beklediğiniz gibi çalışmıyorsa, oturum açın. txt sorunu tam olarak ne bulmakla teşhis etmenizi sağlarERDDAP™Yaptı.
    
    * Büyük YükDataset ipliklerinin başlaması için "majorLoad=gerçek" için arayın.
    * Küçük YükDatasets ipliklerinin başlaması için "majorLoad=false" arayın.
    * Belirli bir veri kümesi için aramadatasetIDBu hakkında bilgi için (yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden) Yükleniyor veya queried.
        
          
         
#### Önleyici Yanıtlar{#cached-responses} 
Genel olarak,ERDDAP™Önbellekli değil (mağaza mağazası) Kullanıcı isteklerine cevap verin. rasyonel olan çoğu talebin biraz farklı olmasıydı, böylece önbellek çok etkili olmazdı. En büyük istisnalar görüntü dosyaları için talepler (Bu tarayıcılar ve programlar gibi önbelleklendiGoogle EarthSık sık re-request görüntüleri) ve talepler için.ncdosyaları dosyaları dosyaları dosyaları (Çünkü onlar üzerinde yaratılamazlar.) .ERDDAP™Her veri kümesinin önbellek dosyaları farklı bir dizide depolar: *Büyük Parent Yönetmeny* / *datasetID* Tek bir önbellek rehberi erişmek için yavaş olabilecek çok sayıda dosyaya sahip olabilir.
Dosyalar üç nedenden biri için önbellekten kaldırıldı:
* Bu önbellekteki tüm dosyalar silindiğinde silinir.ERDDAP™Yeniden başlatılır.
* Termik olarak, herhangi bir dosya daha fazla&lt;Önbellekler&gt; yaşlı (belirtildiği gibi,[Kurulum.xml](/docs/server-admin/deploy-install#setupxml)) silinecektir. Önbellekteki dosyaları yaşlanmaya dayanan (Least-Recently-Used) dosyaların önbellek çok uzun kalmamasını sağlar. Verilen bir istek gibi görünse de her zaman aynı cevabı geri getirmelidir, bu doğru değil. Örneğin, birtabledapİstek hangi içerir &time&gt; *Bazı bazıları bazıları bazıları bazıları Zaman Zamanı* Yeni veriler veri kümesi için geldiğinde değişecektir. Ve içeren bir griddap isteği\\[Son son son son\\]Zaman boyutu, yeni veriler veri kümesi için geldiğinde değişecektir.
* Hata koşullarını gösteren görüntüler önbelleklenir, ancak sadece birkaç dakika için (Bu zor bir durum) .
* Her zaman bir veri kümesi yeniden yüklenir, bu veri setinin önbelleğindeki tüm dosyalar silinir. Çünkü talepler için olabilir"last"Bir ızgara veri kümesinde indeks, önbellekteki dosyalar bir veri kümesi yeniden yüklendiğinde geçersiz olabilir.
         
#### Stored Dataset Information{#stored-dataset-information} 
Tüm veri kümeleri türleri için,ERDDAP™Bir veri kümesi yüklenirken birçok bilgi toplar ve bunu hafızada tutar. Bu izin verirERDDAP™Bir veri kümesi hakkında bilgi için aramalar, veri setlerinin listeleri için talepler ve talepler için çok hızlı yanıt vermek.

Birkaç veri kümesi için (Özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikle özellikleEDDGridCopy, EDDTableCopy,EDDGridFrom From From From From From From From From From From From From From From From From From From From From From From From From *640* Dosyalar ve EDDTable From *640* Dosyalar) ,ERDDAP™Dataset yeniden yüklendiği zaman tekrarlanan veri setleri hakkında bazı bilgiler depolanır. Bu büyük ölçüde reloading işlemi hızlandırır.

* Bazı dataset bilgi dosyaları insan hazırlanabilir.jsondosyalarda ve depolanır *Büyük Parent Yönetmeny* /dataset / *Son2LettersOfDatasetID /datasetID* .
*   ERDDAP™Sadece bu dosyaları olağandışı durumlarda siller, e.g., eğer veri kümesinden bir değişken eklerseniz veya silsenizdatasets.xmlchunk.
* Bir veri kümesinin çoğu değişirdatasets.xmlchunk (e.g., global bir özellik veya değişken bir özellik değiştirmek) Bu dosyaları sildiğinize gerek yok. Düzenli bir veri kümesi reload bu tür değişiklikleri halledecektir. Size söyleyebilirsinERDDAP™Bir veri kümesi ASAP'ı yeniden kurmak için[Bayrak bayrağı](#flag)Dataset için.
* Benzer şekilde, veri dosyalarının eklenmesi veya değiştirilmesi ele alınacaktırERDDAP™Bir veri kümesi yükler. AmaERDDAP™Bu tür değişikliği yakında fark edecek ve otomatik olarak veri setini kullanıyorsa [&lt;HerNMillis&gt; (/docs /server-admin/datasets #update allnmillis) Sistem.
* Bu dosyaları silmek için sadece nadiren gerekli olmalıdır. Güçlendirmeniz gereken en yaygın durumERDDAP™Depolama bilgilerini silmek için (Çünkü güncel /ncorrect ve otomatik olarak sabit olmayacakERDDAP) Veri setinin değişiklikleri yaptığınızdadatasets.xmlchunk bu nasıl etkilerERDDAP™Örneğin, kaynak veri dosyalarındaki verileri yorumlar, zaman değişkeninin biçimini değiştirir.
* Bir veri kümesinin depolanan bilgi dosyalarını bir kaynaktan silmekERDDAP™Bu çalışıyor (Dataset şu anda yüklenemezse bile) , set a[Sert zor zor zor zor zor Bayrak Bayrak](#hard-flag)Bu veri kümesi için. Bir veri kümesinin çok sayıda dosyanın kısaltılması durumunda, veri kümesinin yeniden yüklenmesi önemli bir zaman alabilir.
* Bir veri kümesinin depolanan bilgi dosyalarını silmek içinERDDAP™çalışmıyor, koşmak[DasDds](/docs/server-admin/datasets#dasdds)Bu veri kümesi için (Bu, bilgiyi hangi dizinin bulunduğu ve dosyaları elle kapatıldığı konusunda daha kolaydır.) . Bir veri kümesinin çok sayıda dosyanın kısaltılması durumunda, veri kümesinin yeniden yüklenmesi önemli bir zaman alabilir.
         
### Hafıza Durumu{#memory-status} 
ERDDAP™Hiç çarpmamalı veya donmamalıdır. Eğer yaparsa, büyük olasılıkla en büyük sebeplerden biri hafıza yetersizliğidir. Duruma bakarak hafıza kullanımını izleyebilirsin.html web sayfasına bakın, bu da bir çizgi içeriyor

0 gc çağrıları, 0 talepler dökülüyor ve 0 tehlikeli MemoryEmails since last major LoadDatasets

 (Bunlar ilerici daha ciddi olaylar)   
MB inUse and gc Calls columns in the table of istatistikler. Hafızanın nasıl yorumlandığını söyleyebilirsinERDDAP™Bu sayıları izleyerek. Yüksek sayılar daha fazla stres göstermektedir.

* MB inUse her zaman yarıdan daha az olmalıdır[\\-Xmx bellek ayarı](/docs/server-admin/deploy-install#memory). Büyük sayılar kötü bir işarettir.
* gc aramaları zaman sayısını gösterirERDDAP™Çöp toplayıcısı yüksek hafıza kullanımını hafifletmeye çalışmak istedi. Eğer bu &gt;100 olacaksa, bu ciddi bir problemin işareti.
* Çökme, döküldüğü gelen taleplerin sayısını gösterir (HTTP hata numarası 503, Service Un available) Çünkü hafıza kullanımı zaten çok yüksekti. İdeal olarak, hiçbir istek yok olmalıdır. Birkaç istek dökülüyorsa iyi olur, ancak birçok kişi dökülse ciddi bir problemin işareti.
* tehlikeli tehlikeli tehlikeli MemoryEmails - Eğer bellek kullanımı tehlikeli bir şekilde yüksekse,ERDDAP™Listelenen e-posta adreslerine bir e-posta gönderir&lt;Her e-posta To&gt; (Kurulumda.xml) Aktif kullanıcı isteklerinin bir listesi ile. E-postanın dediği gibi, lütfen bu e-postaları Chris'e gönderin. John in noaaa. gov böylece gelecekteki sürümlerini geliştirmek için bilgiyi kullanabilirizERDDAP.
     

Eğer seninERDDAP™bellek-stresed:
* sunucunuzun hafızasını daha fazla hayal edinERDDAP™Tomcat'ı değiştirerek[-Xmx bellek ayarı](/docs/server-admin/deploy-install#memory).
* Zaten olabildiğince fazla hafıza ayırdıysanız,ERDDAP™via -Xmx, sunucunuz için daha fazla hafıza almayı düşünün. Memory ucuz (Yeni bir sunucu veya zamanınız fiyatına kıyasla) &#33; Sonra artış -Xmx.
* In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In Indatasets.xml, set&lt;nGridThreads&gt; to 1, set&lt;nTableThreads&gt; to 1, and set&lt;ipAddressMaxRequestsActive&gt; 1.
* İsteklere günlük olarak bakın.txt for in effective or troublesome (Ancak meşru değil) Talepler. IP adreslerini eklemek için&lt;Blacklist&gt; in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in indatasets.xml. Siyah liste hatası mesajı, The blacklist error message contains the blacklist error message contains the blacklist error message contains the blacklist error message contains the blacklist error message contains the blacklist error message contains the blacklist error message contains the blacklist error message contains the blacklist error message contains the blacklist error message contains the blacklist error message contains the blacklist error message contains the blacklist error message contains the blacklist error message contains the blacklist the blacklist error message contains the blacklist error message contains the blacklist error message contains the blacklist error message contains the blacklist error message contains the blacklist error message contains the blacklist error message contains the blacklist error message contains the blacklist error message contains the blacklist error message contains the blacklist the blacklist error message contains the blacklist error message contains the blacklist error message contains the blacklist error message contains the blacklist error message contains the blacklist error message contains the blacklist the blacklist error message contains the blacklist error message contains the blacklist error message contains the blacklist error message contains the blacklist error message contains the blacklist error message contains the blacklist error message contains the blacklist error message contains the blacklist error message contains the blacklist error message contains the blackERDDAP™Yöneticinin e-posta adresi, bu kullanıcıların sizinle iletişim kurabilmesi için onlarla birlikte çalışabileceğinizi umuyoruzERDDAP™Daha verimli. Bir IP listesi sizi kara listeye tutmak ve neden, bu yüzden sizinle temas halindeki kullanıcılarla çalışabilirsiniz.
* Kötü niyetli kullanıcılardan talepler için günlük.txt'e bakın. IP adreslerini eklemek için&lt;Blacklist&gt; in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in indatasets.xml. Benzer istekler birden benzer IP adresinden geliyorsa, kim hizmetleri kullanan bazı hizmetleri kullanabilirsiniz. (E.g.,[ https://www.whois.com/whois/ ](https://www.whois.com/whois/)) IP adreslerini bu kaynaktan ve tüm aralığı siyah listeden öğrenmek. Görün ki,&lt;Talep Blacklist&gt; Belgeler] (/docs /server-admin/datasets#request Blacklist) .
         
#### OutOfMemoryError{#outofmemoryerror} 
Ne zaman ayağa kalktınERDDAP™, en fazla hafıza miktarını belirtiyorsunuz ki,Javaaracılığıyla kullanılabilir[\\-Xmx ayar](/docs/server-admin/deploy-install#memory). If if if if if if if if if if if if if if if if if if if if if if if if if if if if ifERDDAP™Hiç bundan daha fazla hafızaya ihtiyacı var, bir java atacaktır. lang. OutOfMemoryError.ERDDAP™Bu hatayı mükemmel bir şekilde idare etmesini sağlamak için çok fazla kontrol eder (e.g., bu yüzden rahatsız edici bir istek başarısız olacaktır, ancak sistem bütünlüğünü korur) . Ancak bazen hata sistemi bütünlüğüne zarar verir ve yeniden başlamak zorundasınızERDDAP. Umarım bu nadir.

OutOfMemoryError için hızlı ve kolay bir çözüm, artırmaktır[\\-Xmx ayar](/docs/server-admin/deploy-install#memory)Ancak, sunucudaki fiziksel hafızanın %80'inden fazlasını artırmamalısınız. (E.g., 10GB sunucusu için, set almayın - 8GB'nin üzerinde) . Memory nispeten ucuzdur, bu yüzden sunucudaki hafızayı artırmak için iyi bir seçenek olabilir. Ancak sunucudaki hafızayı ya da başka nedenlerle artırdıysanız, OutOfMemoryError'un nedeni ile doğrudan daha doğrudan ilgilenmeniz gerekir.

Eğer bakarsanız bakın[Giriş.txt](#log)Dosyayı görmek için neERDDAP™Hata ortaya çıktığında, genellikle OutOfMemoryError'un nedeni olarak iyi bir ipucu alabilirsiniz. dahil olmak üzere birçok olası neden var:

* Tek büyük bir veri dosyası OutOfMemoryError'a neden olabilir, özellikle de büyük ASCII veri dosyaları. Eğer bu sorunsa, açık olmalıdır çünküERDDAP™Veri setini yükleyemez (Tellar için datasets) veya bu dosyadan verileri okuyun (gridded datasets için) . Çözüm, mümkünse, dosyayı birden fazla dosyayı bölmek. İdeal olarak, dosyayı mantıksal kıvrımlara ayırabilirsiniz. Örneğin, dosyanın 20 aylık veri değeri varsa, her biri 1 aylık veri değerinde 20 dosyaya bölün. Ancak ana dosyanın hakem olarak bölünmüş olmasına rağmen avantajları vardır. Bu yaklaşımın birden çok faydası vardır: a) Bu, veri dosyalarını 1/20'ye okumak için gerekli hafızayı azaltacaktır, çünkü sadece bir dosya bir seferde okunur. b) Genellikle,ERDDAP™İsteklerle çok daha hızlı başa çıkabilir, çünkü yalnızca belirli bir istek için verileri bulmak için bir veya birkaç dosyayı aramak zorundadır. c) Veri koleksiyonu devam ederse, mevcut 20 dosya değişmeden kalabilir ve sadece bir, küçük, yeni dosyanın bir sonraki ayın veri kümesine eklenmesi gerekir.
* Tek büyük bir istek OutOfMemoryError'a neden olabilir. Özellikle, bazılarıorderBySeçeneklerin ikinci bir saniye için hafızadaki tüm cevabı vardır (E.g., bir çeşit yapmak) . Cevap büyükse, hataya yol açabilir. Her zaman çeşitli şekillerde çok büyük olan bazı istekler olacaktır. Problemi arttırarak çözebilirsin -Xmx ayarı. Ya da, kullanıcının bir dizi küçük istek yapmasını teşvik edebilirsiniz.
* Çok sayıda dosyanın dosya indeksine neden olacağını tahmin edilemezERDDAP™Bu dosyanın hataya neden olacağını çok büyük oluşturur. Her dosyanın 300 tane oyuncak kullandığı varsayılırsak, 1.000.000 dosya sadece 300MB alır. Ancak çok sayıda veri dosyası ile veri kümeleri diğer sorunlara neden olurERDDAPÖzellikle, uzun bir süre alırERDDAP™Bir kullanıcı isteğine yanıt verirken tüm bu veri dosyaları açmak için. Bu durumda, çözüm dosyaları toplamak olabilir, böylece daha az veri dosyaları vardır. Tellar veri setleri için, verileri mevcut veri setinden kurtardığınızda genellikle harikadır[CF Discrete Sampling Geometries (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Tartışma verileri dosyaları (istek talep talep talep talep talep talep talep talep talep talep talep talep.ncCF dosyalarındanERDDAP) Ve sonra yeni bir veri kümesi yapın. Bu dosyalar çok verimli bir şekilde ele alınabilirERDDAP"[EDDTable FromNcCFFiles](/docs/server-admin/datasets#eddtablefromnccffiles). Eğer mantıksal olarak organize edilirlerse (Her biri bir uzay ve zaman için bir chunk için verilerle) ,ERDDAP™Onlardan verileri çok hızlı bir şekilde çıkarabilir.
* Tellar için kullanılan veri setleri için&lt;subsetVariables&gt;) (/docs /server-admin/datasets#subsetables) Özellikler,ERDDAP™Bu değişkenlerin değerlerinin eşsiz kombinasyonlarının bir masasını oluşturur. Büyük veri kümeleri veya ne zaman&lt;subsetVariables&gt; yanlış yapılandırılmıştır, bu masa OutOfMemoryErrors'a neden olmak için yeterince büyük olabilir. Çözüm, değişkenleri listeden çıkarmaktır&lt;subsetVariables&gt; Bu tablonun büyüklüğü makul olana kadar çok sayıda değer var veya değişkenleri kaldır. BölümlerERDDAP™Bu kullanımı kullanırsubsetVariablesSistem iyi çalışmıyor (e.g., web sayfaları çok yavaş yükler) O masada 100.000'den fazla sıra olduğunda.
* Her zaman birkaç eşzamanlı büyük isteğin mümkün olduğunu (Gerçekten meşgul bir şekildeERDDAP) hafıza problemine neden olmak için bir araya gelebilir. Örneğin, 8 talep, her biri 1GB kullanıyor, bir -Xmx=8GB kurulumu için sorunlara neden olur. Ancak her istek aynı anda hafıza kullanımının zirvesinde olması nadirdir. Ve kolayca onu görebileceksinERDDAP™Gerçekten büyük taleplerle meşgul. Ama bu mümkün. Bu problemle daha da başa çıkmak zor -Xmx ayarı.
* Başka senaryolar var. Eğer bakarsanız bakın[Giriş.txt](#log)Dosyayı görmek için neERDDAP™Hata ortaya çıktığında, genellikle neden olduğu kadar iyi bir ipucu alabilirsiniz. Çoğu durumda, bu sorunu en aza indirmek için bir yol var (Yukarıda bakınız) Ama bazen sadece daha fazla hafızaya ve daha yüksek bir -Xmx ayarına ihtiyacınız var.
         
### Çok fazla Open Files{#too-many-open-files} 
Starting with withERDDAP™v2.12,ERDDAP™Açık dosyaları izlemek için bir sistem var (Hangi soketleri ve diğer şeyleri içerir, sadece dosyaları değil) Tomcat on Linux bilgisayarlarda. Bazı dosyalar yanlışlıkla asla kapanmıyorsa (Bir "resource sızıntı") Ancak açık dosyaların sayısı, işletim sistemi tarafından en fazla izin verilene kadar artabilir ve birçok gerçekten kötü şey olur. Şimdi Linux bilgisayarlarda (Çünkü bilgi Windows için mevcut değildir) :

* statüsün sağ tarafında "Open Files" sütunu var.html web sayfası max dosyaların yüzdesini açık gösteriyor. Windows'da, sadece "" gösteriyor.
* When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When WhenERDDAP™Bu bilgiyi her büyük veri setinin yeniden yük sonunda üretir, girişe yazdıracaktır. txt dosyası:
openFileCount = *Mevcut mevcut mevcut mevcut mevcut mevcut mevcut mevcut mevcut* max = *max max max max* %= *Yüzde yüzde yüzde yüzde yüzde yüzde yüzde yüzde yüzde yüzde yüzde yüzde yüzde yüzde yüzde yüzde* 
* Yüzde &gt;50 ise, bir e-posta gönderilirERDDAP™yönetici ve e-posta Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey Her Şey E-posta adresleri için.

Yüzde% 100 ise,ERDDAP™Korkunç bir problemde. Bunun gerçekleşmesine izin vermeyin.
Eğer yüzde &gt;75% ise,ERDDAP™Korkunç bir probleme yakın. Bu iyi değil.
Yüzde &gt;50% ise, bir artış 100 vurmak için yüzdeye neden olacaktır.
Yüzde her zaman &gt;50% ise:
* Ayrıca izin verilen en yüksek sayıda açık dosyayı artırın:
    * Bu değişiklikleri her seferinde tomcat başlamadan önce yapın (Onları Tomcat startup.sh dosyasına mı koydu?) :
ulimit -Hn 16384
ulimit -Sn 16384
    * Ya da düzenleme ile kalıcı bir değişiklik yapmak (Kök olarak) / v / güvenlik / güvenlik hatları ekledi:
tomcat soft nofile 16384
tomcat hard nofile 16384
Bu komutlar, Tomcat çalışan kullanıcının "tomcat" olarak adlandırıldığını varsayıyor.
Birçok Linux çeşidinde, sunucuyu bu değişiklikleri uygulamak için yeniden başlatmanız gerekir. Her iki seçenek için, yukarıdaki "16384" bir örnek. Düşündüğünüz numarayı en iyisidir.
* RestartERDDAP. İşletim sistemi herhangi bir açık dosyayı kapatacaktır.
         
### Başarısız İstekler{#failed-requests} 
*    **Unusual Activity: &gt;% 25 talep başarısız**   
Her reloadDatasets parçası olarak, genellikle her 15 dakika,ERDDAP™Son reloadDatasets'ten bu yana başarısız olan taleplerin yüzdesine bak. Eğer% 25 ise,ERDDAP™Bir e-posta gönderirERDDAP™Konuyla yönetici "Unusual Activity: &gt;% 25'i başarısız oldu". Bu e-posta, alt hakkın "Requester's IP Address" yakınlarında uzun bir süre içerir. (Başarısızlık)   (En son Major LoadDatasets) ". Bunun için arayın. Size en başarısız talepleri yapan bilgisayarların IP adresini anlatıyor. Daha sonra bu IP adreslerini arayabilirsiniz\\[Büyük Parent Yönetmeny\\]/loglar /[Giriş.txt](#log)Dosya ve onların ne tür istekleri yaptıklarını görün.
    
Kullanıcının IP numarasını kullanabilirsiniz (Örneğin, ile[ https://whatismyipaddress.com/ip-lookup ](https://whatismyipaddress.com/ip-lookup)) Kullanıcının kim veya ne olduğunu anlamaya çalışın. Bazen bu size kullanıcının kim olduğunu oldukça doğru anlatacak (e.g., bir arama motorunun web taramacısı) . Çoğu zaman size bir ipucu verir (E.g., bu bir Amazonaws bilgisayar, bazı üniversiteden biri, bazı özel şehirde biri) .
    
Gerçek isteke bakarak IP numarası ve hata mesajı (Hepsi ondan[Giriş.txt](#log)) Bir dizi hata için, genellikle neyin yanlış gittiğini anlayabilirsiniz. Benim tecrübemde, birçok başarısız talebin dört ortak nedeni vardır:
    
1) İstekler kötü niyetli (e.g., güvenlik zayıflıklarını arıyor veya istekler yapıyor ve sonra tamamlanmadan önce iptal ediyorlar.) . Kullanmalısınız&lt;Blacklist&gt; in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in indatasets.xmlBu IP adreslerine kara liste.
    
2) Bir arama motoru naif olarak URL'leri listelediERDDAP™Web sayfaları ve ISO 19115 belgeleri. Örneğin, üssü listeleyen birçok yer varOPeNDAPURL, örneğin, https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST Kullanıcının bir dosya türü eklemek zorunda olduğu için (E.g., .das, .dds, .html) . Ancak arama motoru bunu bilmiyor. Ve temel URL'ye istek başarısız olur. İlgili bir durum, arama motoru garip istekler ürettiğinde veya "gizli" web sayfalarına ulaşmak için form doldurmaya çalışır. Ancak arama motorları genellikle bunun kötü bir işi yapar, başarısızlıklara yol açar. Çözüm şu: Bir yaratmak[Robotlar.txt](#robotstxt)Dosya.
    
3) Bazı kullanıcı defalarca orada olmayan bir şey sormak isteyen bir senaryo çalışıyor. Belki var olmak için kullanılan bir veri kümesidir, ama şimdi gitti (Geçici veya kalıcı olarak kalıcı olarak) . Senaryolar genellikle bunu beklemeyin ve bu yüzden akıllıca bir şekilde uğraşmaz. Bu yüzden senaryo sadece istekler yapmaya devam eder ve istekler başarısız kalır. Kullanıcının kim olduğunu tahmin edebilirseniz (Yukarıdaki IP numarasından) Onlara ulaşın ve veri kümesinin artık mevcut olmadığını söyleyin ve senaryolarını değiştirmelerini isteyin.
    
4) Bazı dataset ile gerçekten yanlış bir şey. Genellikle, genellikle,ERDDAP™sorunlu veri setini aktif hale getirecek. Bazen öyle değil, bu yüzden tüm istekler sadece hatalara yol açıyor. Eğer öyleyse, problemi veri kümesi veya (Eğer yapamıyorsanız) Veri setini veri kümesine ayarlayın[Aktif="false"](/docs/server-admin/datasets#active). Tabii ki, bu sorun #2'e yol açabilir.
    
Bazen hatalar çok kötü değil, özellikle de, eğer eğerERDDAP™Hatayı tespit edebilir ve çok hızlı yanıt verebilir (&lt;=1ms). Bu yüzden hiçbir eylem yapmamaya karar verebilirsiniz.
    
Eğer tüm diğer başarısız olursa, evrensel bir çözüm vardır: Kullanıcının IP numarasını [Ins IP numarasını] ekleyin.&lt;Blacklist&gt;) (/docs /server-admin/datasets#request Blacklist) . Bu, göründüğü kadar kötü veya sert bir seçenek olarak değil. Kullanıcı daha sonra s/he'nin kara listelenmiş olduğunu söyleyen bir hata mesajı alacak ve onlara anlatacaktır (The the the theERDDAP™yöneticisin) e-posta adresi. Bazen kullanıcı sizinle iletişim kuracaktır ve sorunu çözebilirsiniz. Bazen kullanıcı sizinle iletişim kurmuyor ve ertesi gün farklı bir IP numarasından gelen tam aynı davranışı göreceksiniz. Blacklist the new IP number and hope that they will going the message. (Ya da bu senin Groundhog Günü, asla kaçmayacaksın. Üzgünüm.) 
    
### Robotlar.txt{#robotstxt} 
Arama motoru şirketleri web tarayıcılarını kullanıyor (e.g., Google Bot Bot Bot) Webdeki tüm sayfaları arama motorlarına eklemek için incelemek. For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For ForERDDAP™Bu temelde iyi.ERDDAP™Sayfalar arasında birçok bağlantı var, bu yüzden taramacılar tüm web sayfalarını bulacak ve onları arama motorlarına ekleyecek. Ardından, arama motorlarının kullanıcıları veri setlerini sizin üzerinizde bulabilirlerERDDAP.
    
Ne yazık ki, bazı web taramacılar (e.g., Google Bot Bot Bot) Şimdi ek içeriği bulmak için formları dolduruyor ve gönderiyoruz. Web ticaret siteleri için, bu harika. Ama bu korkunçERDDAP™Çünkü sadece bir şeye yol açar **sonsuza dek sonsuza dek sonsuza dek** Gerçek verileri taramak için istenmeyen ve anlamsız girişimler. Bu, diğer tüm kullanıcılardan daha fazla talepe yol açabilir. Ve arama motorunu goofy ile doldurur, gerçek verilerin anlamsız alt kümelerini doldurur.
    
Web taramacılara formları doldurmayı bırakmalarını ve sadece genel olarak bakmaları gereken web sayfalarına bakmalarını sağlamak için, denilen bir metin dosyası oluşturmanız gerekir[Robotlar.txt](https://en.wikipedia.org/wiki/Robots_exclusion_standard)Web sitenizin belge hiyerarşisinin kök rehberinde, böylece herkes tarafından e.g olarak görülebilir. http://*www.your.domain*/robots.txt .
Yeni bir robot yaratıyorsanız. txt dosyası, bu iyi bir başlangıç:
```
    User-Agent: \\*
    Disallow: /erddap/files/ 
    Disallow: /files/ 
    Disallow: /images/ 
    Disallow: /\\*?
    Disallow: /\\*?\\*
    Disallow: /\\*.asc\\*
    Disallow: /\\*.csv\\*
    Disallow: /\\*.dods\\*
    Disallow: /\\*.esriAscii\\*
    Disallow: /\\*.esriCsv\\*
    Disallow: /\\*.geoJson\\*
    Disallow: /\\*.htmlTable\\*
    Disallow: /\\*.json\\*
    Disallow: /\\*.mat\\*
    Disallow: /\\*.nc\\*
    Disallow: /\\*.odvTxt\\*
    Disallow: /\\*.tsv\\*
    Disallow: /\\*.xhtml\\*
    Disallow: /\\*.geotif\\*
    Disallow: /\\*.itx\\*
    Disallow: /\\*.kml\\*
    Disallow: /\\*.pdf\\*
    Disallow: /\\*.png\\*
    Disallow: /\\*.large\\*
    Disallow: /\\*.small\\*
    Disallow: /\\*.transparentPng\\*
    Sitemap: http://***your.institutions.url***/erddap/sitemap.xml
```
     (Ama yerini değiştir *your.institutions.url* Seninle birlikteERDDAP's base URL.)   
Arama motorları için birkaç gün sürebilir ve etkilenecek değişiklikler için.
     
### sitemap.xml{#sitemapxml} 
As the As the[ https://www.sitemaps.org ](https://www.sitemaps.org/)Web sitesi diyor:

> Sitemaps are an easy way for webmasters to inform search engines about pages on their sites that are available for crawling. In its simplest form, a Sitemap is an XML file that lists URLs for a site along with additional metadata about each URL (when it was last updated, how often it usually changes, and how important it is, relative to other URLs on the site) so that search engines can more intelligently crawl the site.
> 
> Web crawlers usually discover pages from links within the site and from other sites. Sitemaps supplement this data to allow crawlers that support Sitemaps to pick up all URLs in the Sitemap and learn about those URLs using the associated metadata. Using the Sitemap protocol does not guarantee that web pages are included in search engines, but provides hints for web crawlers to do a better job of crawling your site.

Aslında, o zamandan beriERDDAP™Is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is is isRESTfularama motoru örümcekleri kolayca tarayabiliyorERDDAP. Ama bunu daha sık yapmaya eğilimlidirler (Günlük&#33;) Gerekli olduğundan (Aylık?) .

* Her arama motorunun tamamını tarayabileceğine göreERDDAP™Her gün, bu çok fazla gereksiz taleplere yol açabilir.
* Bu yüzdenERDDAP™Bir sitemap.xml dosyası sizin içinERDDAP™Hangi arama motorlarını size anlatıyorERDDAP™Sadece her ay taranmalıdır.
* Bir referans eklemelisinizERDDAP's sitemap.xml to your your your your[Robotlar.txt](https://en.wikipedia.org/wiki/Robots_exclusion_standard)Dosya:
Site: http://**www.yoursite.org**/erddap/sitemap.xml
 
* Eğer bu tarayıcılara mesajı almak gibi görünmüyorsa, bu URL'leri ziyaret ederek sitemap.xml dosyası hakkında çeşitli arama motorlarını söyleyebilirsiniz. (Ama değişim **YourInstitution** kurumunuzun acronym veya kısaltması ve **www.yoursite.org** Senin içinERDDAP's URL) :
    *    https://www.bing.com/webmaster/ping.aspx?siteMap=http://**www.yoursite.org**/erddap/sitemap.xml
 
    *    https://www.google.com/ping?sitemap=http://**www.yoursite.org**/erddap/sitemap.xml(I Düşün) Sadece her arama motorunu bir kez yapmak zorundasınız, çünkü her zaman. Arama motorları daha sonra sitemap.xml değişiklikleri periyodik olarak algılayacaktır.
     
### Data Dissemination / Data Distribution Ağlar:PushvePullTeknoloji Teknolojisi{#data-dissemination--data-distribution-networks-push-and-pull-technology} 
* Normalde,ERDDAP™Bir aracı olarak hareket eder: bir kullanıcıdan bir istek alır; uzak bir veri kaynağından veri alır; verileri reform; ve kullanıcıya gönderir.
*   [PullTeknoloji Teknolojisi](https://en.wikipedia.org/wiki/Pull_technology):ERDDAP™Ayrıca mevcut tüm verileri uzaktan bir veri kaynağından aktif olarak alma yeteneğine sahiptir ve[Verilerin yerel bir kopyasını depolamak](/docs/server-admin/datasets#eddgridcopy).
*   [PushTeknoloji Teknolojisi](https://en.wikipedia.org/wiki/Push_technology): KullanarakERDDAP"[abonelik hizmetleri abonelik hizmetleri](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions)Diğer veri sunucuları yakında yeni veriler olarak bilgilendirilebilir, böylece verileri talep edebilirler (Verilere bakarak) .
*   ERDDAP"[EDDGridFromErddap](/docs/server-admin/datasets#eddfromerddap)ve[EDDTable FromErddap](/docs/server-admin/datasets#eddfromerddap)kullanımı kullanımı kullanımı kullanımı kullanımıERDDAP‘ abonelik hizmetleri ve[Bayrak sistemi](#flag)Bu nedenle, yeni veriler mevcut olduğunda hemen bilgilendirilecektir.
* Bunları büyük bir etkiyle birleştirebilirsiniz: Eğer bir tane diksenizEDDGridBir şekilde kopyalayınEDDGridErddap veri setinden (EDDTableCopy etrafında bir EDDTable FromErddap dataset) ,ERDDAP™Otomatik olarak oluşturulacak ve başka bir kopyasını koruyacakERDDAP's dataset.
* Çünkü abonelik hizmetleri yeni veriler mevcut olduğu kadar kısa sürede çalışır, teknoloji verileri çok hızlı dağıtır (Birkaç saniye içinde) .

Bu mimari her şeyi koyarERDDAP™Yönetici, verileri onun /her için nerede belirlemeden sorumluERDDAP™Geliyor.

* Diğer Diğer Diğer DiğerERDDAP™Yöneticiler aynı şeyi yapabilirler. Yöneticiler arasında koordinasyona gerek yoktur.
* Birçok kişiERDDAP™yöneticiler birbirleriyle bağlantı kuruyorERDDAPs, bir veri dağıtım ağı oluşturulur.
* Veriler hızla, verimli ve otomatik olarak veri kaynaklarından dağıtılacaktır (ERDDAPs ve diğer sunucular) Veriler yeniden dağıtım siteleri (ERDDAPs) Ağda her yerde.
* A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A givenERDDAP™Bazı veri kümeleri ve diğer veri setleri için yeniden dağıtım sitesi için her iki veri kaynağı olabilir.
* Elde edilen ağ, programlarla oluşturulan veri dağıtım ağlarına kabaca benzerdir[Unidata" IDD /IDM](https://www.unidata.ucar.edu/projects/index.html#idd)Ancak daha az katı yapılandırılmış.
         
### Güvenlik, kimliklendirme ve Yetkilendirme{#security-authentication-and-authorization} 
Varsayılan olarak,ERDDAP™Tamamen bir kamu sunucusu olarak çalışır (using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using using usinghttpve/veyahttps) Hiçbir giriş olmadan ([kimlik doğrulama kimlik doğrulama kimlik doğrulama kimlik doğrulama kimlik doğrulama kimlik doğrulama kimlik doğrulama kimlik doğrulama kimlik doğrulama kimlik doğrulama kimlik doğrulama kimlik doğrulama kimlik doğrulama kimlik doğrulama kimlik doğrulama kimlik doğrulama kimlik doğrulama kimlik doğrulama kimlik doğrulama kimlik doğrulama kimlik doğrulama kimlik doğrulama kimlik doğrulama kimlik doğrulama kimlik doğrulama kimlik doğrulama kimlik doğrulama kimlik doğrulama kimlik doğrulama kimlik doğrulama kimlik doğrulama kimlik doğrulama kimlik doğrulama kimlik doğrulama](https://en.wikipedia.org/wiki/Authentication)) Sistem ve veri erişimine kısıtlama yok ([yetkilendirme izni](https://en.wikipedia.org/wiki/Authorization)) .

#### Güvenlik Güvenliği{#security} 
Bazı kullanıcılara erişim kısıtlamak istiyorsanız, kullanabilirsiniz.ERDDAP“Yapılmış güvenlik sistemi. Güvenlik sistemi kullanımda olduğunda:

*   ERDDAP™kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım kullanım[rol tabanlı erişim kontrolü](https://en.wikipedia.org/wiki/Role-based_access_control).
    * The The The The The The The TheERDDAP™Yönetici kullanıcıları [kullanıcı” ile tanımlar.&lt;kullanıcı&gt; (/docs /server-admin/datasets#user) etiketdatasets.xml. Her kullanıcının bir kullanıcı adı vardır, bir şifre (Eğer doğrulama=custom) Ve bir veya daha fazla rol.
    * The The The The The The The TheERDDAP™Yönetici hangi rollerin belirli bir veri kümesine erişimi olduğunu [[değiştir | kaynağı değiştir]&lt;erişilebilirTo&gt; (/docs /server-admin/datasets #accessibleto) etiketdatasets.xmlHalk erişimine sahip olmayan herhangi bir veri kümesi için.
* Kullanıcının giriş durumu (ve giriş için bir bağlantı / oturum) Her web sayfasının başında gösterilecektir. (Ancak kullanıcıda bir giriş görünürERDDAP™Eğer bir kullanırsa giriş yapmamakhttpURL.) 
* Eğer&lt;BaseUrl&gt; Kurulumunuzda belirttiğiniz anlamına gelir.xml bir an **http** URL, giriş olmayan kullanıcılar kullanabilirERDDAP" **http** URL'ler. If if if if if if if if if if if if if if if if if if if if if if if if if if if if if&lt;BaseHtttpsUrl&gt; ayrıca belirtilmektedir, giriş olmayan kullanıcılar da kullanabilirhttpsURL'ler.
* HTTPS Sadece - Eğer&lt;BaseUrl&gt; Kurulumunuzda belirttiğiniz anlamına gelir.xml bir an **https** URL, giriş yapılmayan kullanıcılar teşvik edilir (zorlanamadı) kullanmak için kullanmakERDDAP" **https** URL'ler - tüm bağlantılarERDDAP™Web sayfaları web sayfalarına atıfta bulunacaktırhttpsURL'ler.
    
Kullanıcıları kullanmak için zorlamak istiyorsanızhttpsURL, içinde bir Emekli daimi çizgi ekleyin&lt;VirtualHost \\*:80&gt; Apache'nin yapılandırma dosyasında bölüm (Genellikle genellikle genellikle genellikle genelliklehttpd.conf) E.g.,
    
```
    <VirtualHost \\*:80>
        \\[...\\]
        ServerName example.com
        Redirect permanent / https://example.com/
    </VirtualHost>
```

Eğer istersen, kullanımı zorlamak için ek bir yöntem varhttps: [HTTP Strict Transport Security (HSTS) ](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security). Bunu kullanmak için:
    
    1. Enable the Apache Headers Modül: a2enmod Titles
    2. HTTPS VirtualHost yönergesine ek başlık ekleyin. Max-age saniyede ölçülür ve bazı uzun değere ayarlanabilir.
        
```
        <VirtualHost \\*:443>
            # Guarantee HTTPS for 1 Year including Sub Domains 
            Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
```
    
Lütfen bu başlığın sadece bir HTTPS VirtualHost üzerinde geçerli olduğunu unutmayın.
    
Kullanıcıları kullanmak için zorlamak için bir nedenhttpsURL'ler şunlardır: altta SSL/TLS bağlantı kurmak için zaman alır ve sonra kullanıcı ve sunucu arasındaki tüm bilgileri şifrelemek için zaman alır. Ancak bazı kurumlar gerektirirhttpsSadece.
    
* MUST kullanımında giriş yapan kullanıcılarERDDAP" **https** URL'ler. Eğer kullanırlarsahttpURL'ler, görünürlerERDDAP™İçeri girilemez. Bu, iletişimin gizliliğini sağlar ve önlemeye yardımcı olur[Oturum atıp kaçtı](https://en.wikipedia.org/wiki/Session_hijacking).
* Giriş yapamayan herkes halk veri setlerini kullanabilir ve kullanabilir. Varsayılan olarak, özel veri setleri bir kullanıcı giriş yapmazsa veri setlerinin listelerinde görünmüyor. Yönetici ayarlandığında.xml's&lt;ListeÖzelDatasets&gt; gerçek olarak görünecekler. Özel veri kümelerinden veri talep etmeye çalışır (Kullanıcı URL'yi bilirse) Giriş sayfasına yönlendirilecektir.
* Giriş yapan herkes, herhangi bir kamu veri setinden ve herhangi bir özel veri kümesinden veri isteyebilir ve hangi rollerine erişmelerini sağlar. Varsayılan olarak, bir kullanıcının erişemediği özel veri setleri veri setleri listesinde görünmüyor. Yönetici ayarlandığında.xml's&lt;ListeÖzelDatasets&gt; gerçek olarak görünecekler. Kullanıcının erişime sahip olmadığı özel veri setlerinden veri talep etme girişimleri giriş sayfasına yönlendirilecektir.
* The The The The The The The TheRSSTamamen özel veri setleri için bilgi sadece kullanıcılar için mevcuttur (veRSSokuyucular) Kim girişte ve bu veri kümesini kullanmaya yetkilidir. Bu yaparRSSTamamen özel veri setleri için çok yararlı değil.
    
Bir veri kümesi özel ise ama onun [&lt;Grafikler AccessibleTo&gt; (/docs /server-admin/datasets#graphsaccessibleto) Halka ayarlanmış, veri setininRSSHerkes için erişilebilir.
    
* E-posta abonelikleri yalnızca bir kullanıcının bir veri kümesine eriştiğinde ayarlanabilir. Bir kullanıcı özel bir veri kümesine aboneyse, abonelik kullanıcı giriş yaptıktan sonra çalışmaya devam eder.

##### Güvenlik Duvarı{#setup-security} 
Güvenlik / sınıflandırma sistemi kurmak için:

* StandartERDDAP™ [İlk kurulum](/docs/server-admin/deploy-install).
* In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In[Kurulum.xml](/docs/server-admin/deploy-install#setupxml),
    * Add/change the the the the add/change the the the&lt;Gerçekleştirme&gt; Hiçbir şeyden özel değer (Bunu kullanma) e-posta (Bunu kullanma) , google (önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen) Ya da (önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen) Ya da oauth2 (Hangi google+orcid, önerilen) . Aşağıdaki bu seçenekler hakkında yorumları görün.
    * Add/change the the the the add/change the the the&lt;BaseHtttpsUrl&gt; değer.
    * Ekle/uncomment&loginInfo;in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in&lt;StartBodyHtml&gt; kullanıcının her web sayfasının başında / kayıt bilgilerini görüntülemek için.
* Kişisel bilgisayarınızdaki test amaçları için,[SSL'yi desteklemek için tomcat oluşturmak için bu talimatları takip edin](https://tomcat.apache.org/tomcat-8.0-doc/ssl-howto.html)  (Temel içinhttpsbağlantılar bağlantıları) Bir anahtar mağazası yaratarak[Kendi kendine imzalanmış sertifika](https://en.wikipedia.org/wiki/Self-signed_certificate)ve değiştirerek *tomcat* /conf /server.xml bağlantıyı 8443 port için teşvik etmek. Windows'da, "c.TONUsers Sand'dan .keystore taşımak gerekebilir. *sen sen sen sensin sen* "c: OakUsers SandDefault User Sand.keystore" veya "c: Oakkeystore" (see see see see see see *tomcat* /loglar/catalina. *Bugün bugün bugün bugün bugün bugün bugün* .log eğer uygulama yükmezse veya kullanıcılar sayfadaki logu göremez) . .keystore sertifikasının giriş yaptığınızda sertifikayı inceleyerek sona ereceğini görebilirsiniz.
    
Açık erişilebilir bir sunucu için, kendi imzalı bir sertifika kullanmak yerine, satın aldığınız ve imzaladığınız bir sertifikayı satın aldığınızı şiddetle tavsiye edilir[Sertifika yetki belgesi](https://en.wikipedia.org/wiki/Certificate_authority)Çünkü müşterilerinize gerçekten bağlantı kurduğunu daha fazla güvence veriyorERDDAP™Ama bir erkek-in-the- orta'nın versiyonu değilERDDAP. Birçok satıcı dijital sertifika satıyor. (Web için arama.) Pahalı değiller.
    
* Linux bilgisayarlarda, eğer Tomcat Apache'de çalışıyorsa, / etc / / / / / /httpd/conf.d /sl.conf dosyası HTTPS trafiğine / HTTPS trafiğinden /ERDDAP™URL'de 3843 port numarası gerektirmez:
    1. Mevcutları Değiştirin&lt;VirtualHost&gt; etiketi (Eğer bir tane varsa) Dosyanın sonunda bir tane ekleyin, böylece en azından bu hatları vardır:
```
        <VirtualHost \\_default\\_:443>
            SSLEngine on
            SSLProxyEngine On
            ProxyPass /erddap http://localhost:8443/erddap
            ProxyPassReverse /erddap http://localhost:8443/erddap
        </VirtualHost>
```

    2. Sonra Apache'yi yeniden başlatın: /usr/sbin/apachectl -k lütufkâr (Ama bazen farklı bir dizide) .
* In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In *tomcat* /conf /server.xml, port =8443&lt;Link&gt; etiketi:
```
    <Connector port="8443" 
        protocol="org.apache.coyote.http11.Http11NioProtocol"
        maxThreads="150" SSLEnabled="true">
        <SSLHostConfig>
        <Certificate certificateKeystoreFile="conf/localhost-rsa.jks" 
            type="RSA" />
        </SSLHostConfig>
    </Connector>
```
SertifikaKeystoreFile'nin yerini değiştirin.
##### Authorization{#authorization} 
*   [In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In Indatasets.xml, bir yaratır](#authorization)[&lt;kullanıcı&gt; (/docs /server-admin/datasets#user) Her kullanıcı için kullanıcı adı, şifre (Eğer izniniz=custom) Ve roller bilgi. Bu, izinin bir parçasıdırERDDAP“Güvenlik sistemi.
     
* In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In Indatasets.xmlBir ekleyin&lt;erişilebilirTo&gt; (/docs /server-admin/datasets #accessibleto) Kamu erişimine sahip olmayan her veri kümesine etiket.&lt;erişilebilirTo&gt; hangi rollerin bu veri kümesine eriştiğini belirtmenize izin verir.
     
* Restart Tomcat. Sorun? Tomcat loglarını kontrol edin.
     
* İşinize karşı çık&#33; Herhangi bir hata bir güvenlik kusuruna yol açabilir.
     
* Giriş sayfasının kullandığı kontrol edinhttps  (Değil değilhttp) . Deneme girişimlerihttpOtomatik olarak otomatik olarak yönlendirilmelidirhttpsve port 8443 (Liman numarası bir Apache proxy ile gizlenmiş olsa da) . Ağ yöneticinizle, sunucunuzdaki 8443 port'a erişmek için dış web isteklerine izin vermeniz gerekebilir.
     
* Değiştirebilirsiniz&lt;kullanıcı&gt;&lt;erişilebilirTo&gt; herhangi bir zamanda etiketler. Değişiklikler herhangi bir veri kümesi veya ASAP'ın bir sonraki normal yeniden yüklerinde uygulanacaktır.[Bayrak bayrağı](#flag).

##### Kimlik Doğrulama{#authentication} 
[ **Kimlik Doğrulama (Giriş yapın) ** ](#authentication)  
Kullanıcıların giriş yapmasına izin vermek istemiyorsanız, bir değer belirtmeyin&lt;&gt; Kurulumda doğrulama.xml.
Kullanıcıların giriş yapmasına izin vermek istiyorsanız, bir değer belirtmeniz gerekir&lt;&gt; Şu anda,ERDDAP™destek desteği destek desteği
[Özel özel özel özel](#custom)  (Bunu kullanma) ,
[e-posta e-posta e-posta e-posta](#email)  (Bunu kullanma) ,
[google google google](#google)  (önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen) ,
[veya](#orcid)  (önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen) Ve
[1.](#oauth2)  (önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen) Kimlik doğrulama yöntemi için.
Giriş yapmak istiyorsanız, Google veyacid veya oauth2 seçeneklerini güçlü bir şekilde tavsiye ederiz, çünkü kullanıcı şifrelerini depolamak ve işlemekten özgürsünüz. (Özelliğe ihtiyaç duyulması gerekiyordu) Ve e-posta seçeneğinden daha güvenlidir. Kullanıcıların genellikle farklı sitelerde aynı şifreyi kullandıklarını unutmayın. Bu yüzden aynı şifreyi sizin için kullanabilirlerERDDAP™Bankalarında yaptıkları gibi. Bu, parolalarını çok değerli yapar - sadece talep ettikleri verilerden daha değerli. Bu yüzden şifreleri özel tutmak için yapabileceğiniz kadar yapmanız gerekir. Bu büyük bir sorumluluk. E-posta, google, orcid ve oauth2 seçenekleri parolaları önemsiyor, bu yüzden onlarla birlikte toplanmanız veya çalışmak zorunda değilsiniz. Bu sorumluluktan özgürsünüz.

Bütün Hepsi&lt;&gt; kimlik doğrulama seçenekleri bir kullanır[kurabiye](https://en.wikipedia.org/wiki/HTTP_cookie)Kullanıcının bilgisayarında, bu yüzden kullanıcının tarayıcısı kurabiyeye izin vermek için ayarlanmalıdır. Bir kullanıcı yapılırsaERDDAP™Bir bilgisayar programından talep (Bir tarayıcı değil) , kurabiye ve kimlik doğrulama ile çalışmak zordur. Bu, tüm kimlik doğrulama sistemleri ile ortak bir problemdir. Üzgünüm.

Detaylar&lt;&gt; seçenekler şunlardır:

###### Özel Özel Özel Özel{#custom} 
Özellik özeldirERDDAPKullanıcıların kullanıcı adı ve şifrelerine bir web sayfasında bir şekilde girerek giriş yapmalarına izin vermek için özel sistem. Bir kullanıcı 10 dakika içinde 3 kez oturum açmazsa, kullanıcı 10 dakika boyunca giriş yapmaya çalışmaktan engellenir. Bu, hackerların sadece doğru olanı bulana kadar milyonlarca şifre denemelerini engelliyor.

Bu biraz güvenlidir çünkü Kullanıcı adı ve şifreler ile gönderilirhttps  (Değil değilhttp) Ancak kimlik doğrulama=google, orcid, ya da oauth2 daha iyidir çünkü şifreleri işlemek zorunda değilsiniz. Özel yaklaşım, bir kullanıcının adını ve şifrelerini toplamanızı gerektirir (Telefonunuzu kullanın&#33; e-posta güvenli değil&#33;) Ve onları içeri koyundatasets.xml[İçinde]&lt;kullanıcı&gt; (/docs /server-admin/datasets#user) Etiketler.

Özel seçenekle, kimse size kadar giriş yapamaz (The the the theERDDAP™yönetici yönetici yönetici) Bir yaratmak&lt;Kullanıcı için kullanıcı etiketi, kullanıcının adını kullanıcı adı olarak belirtmek, şifre olarak parolalarını sindirmek ve rolleri.

Öneri Değil
Kullanıcının parolasının ve ilişkili riskler nedeniyle üretmenin ve iletmenin garipliği nedeniyle ve kullanıcının şifresini sindirme ve ilişkili riskler nedeniyleERDDAP™Şifrelerin acılarını tutan bu seçenek tavsiye edilmez.

Bu seçeneğin güvenliğini artırmak için:

* Diğer kullanıcıların sunucuda olduğundan emin olabilirsiniz (i.e., Linux kullanıcıları, değilERDDAP™Kullanıcılar) Tomcat directory dosyalarında okuyamıyor (Özellikle özellikle dedatasets.xmlDosya&#33;) veyaERDDAP“Büyük ParentYönetmen.
Linux'ta, kullanıcı=tomcat olarak, kullanın:
chmod -R g-rwx *Büyük Parent Yönetmeny*   
chmod -R o-rwx *Büyük Parent Yönetmeny*   
chmod -R g-rwx *Tomcat Yönetmeny*   
chmod -R o-rwx *Tomcat Yönetmeny*   
     
* UEPSHA256'ı kullanın&lt;passwordEncoding&gt; Kurulum.xml.
     
* Kullanıcının şifresini kullanıcının kullanıcıdan gelen şifreyi geçmek için bir as-secure-as-possible yöntemi kullanınERDDAP™yönetici yönetici yönetici (telefon?) .
         
###### e-posta e-posta e-posta e-posta{#email} 
E-posta doğrulama seçeneği, kullanıcının e-posta hesabını kullanıcıyı özgünleştirmek için kullanır (Onlara bir e-posta göndererek, oturum açmaları için erişmeleri gereken özel bir bağlantı ile gönder) . Diğer e-postaların aksine,ERDDAP™gönderir, gönderir,ERDDAP™Bu davet e-posta log dosyasına bu davet e-postalarını yazmıyor çünkü gizli bilgiler içeriyorlar.
Teoride, bu çok güvenli değil, çünkü e-postalar her zaman şifreli değildir, bu yüzden e-postaları engelleme yeteneğine sahip kötü bir adam bu sistemi geçerli bir kullanıcının e-posta adresini kullanarak kötüye kullanabilir ve davet e-postasını ele geçirebilir.
Uygulamada, ayarlarsanızERDDAP™Bir Google e-posta hesabı e-posta göndermek için kullanmak ve bağlantı için TLS seçeneklerinden birini kullanmak için ayarlarsanız ve kullanıcının Google e-posta hesabı varsa, bu biraz güvenlidir çünkü e-postalar tüm yol şifrelenirERDDAP™Kullanıcıya.

Bu seçeneğin güvenliğini artırmak için:

* Diğer kullanıcıların sunucuda olduğundan emin olun. (i.e., Linux kullanıcıları, değilERDDAP™Kullanıcılar) Tomcat rehberinde dosyaları okuyamıyor veyaERDDAP“Büyük ParentYönetmen.
Linux'ta, kullanıcı=tomcat olarak, kullanın:
chmod -R g-rwx *Büyük Parent Yönetmeny*   
chmod -R o-rwx *Büyük Parent Yönetmeny*   
chmod -R g-rwx *Tomcat Yönetmeny*   
chmod -R o-rwx *Tomcat Yönetmeny*   
     
* Gönderilen e-postalar için son derece güvenlik almak için işler ayarlayınERDDAP™Kullanıcılara. Örneğin, sadece yaratarak Google merkezli bir sistem yapabilirsiniz&lt;Google-managed e-posta adresleri için kullanıcı&gt; etiketler ve ayarlayarakERDDAP™Bir Google e-posta sunucusu güvenli/TLS bağlantısı aracılığıyla kullanmak için: kurulumunuzda.xml, e.g.,
```
    <emailSmtpHost>smtp.gmail.com</emailSmtpHost>  
    <emailSmtpPort>587</emailSmtpPort>  
    <emailProperties>mail.smtp.starttls.enable|true</emailProperties>
```

Öneri Değil
E-posta doğrulama seçeneği tavsiye edilmez. Lütfen bunun yerine Google, orcid veya oauth2 seçeneği kullanın.

Google, orcid ve oauth2 seçenekleri ile olduğu gibi, e-posta çok uygunERDDAP™yöneticiler - asla parola veya onların sindirmeleriyle uğraşmak zorunda değilsiniz. Yaratmanız gereken tek şey bir [&lt;kullanıcı&gt; (/docs /server-admin/datasets#user) Bir kullanıcı için etiketdatasets.xmlKullanıcının e-posta adresi, hangisiERDDAP™Kullanıcının adı olarak kullanılır. (Şifre özelliği doğrulama=email, google, orcid veya oauth2 olarak kullanılmaz.) 

E-posta seçeneği ile, sadece bir kullanıcı var&lt;kullanıcı&gt; etiketidatasets.xmlGiriş yapmaya çalışabilirERDDAP™e-posta adresini sağlayarak ve e-postadaki bağlantıya tıklayarak,ERDDAP™Onları gönderir.

ERDDAP™E-posta adreslerine davaya duyarlı olarak davranır. Bu, girdiğiniz e-posta adreslerini dönüştürmekle ilgilidir (in&lt;kullanıcı&gt; etiketler) veya kullanıcılar girer (Giriş formunda) Tüm düşük sürümlerine.

Kimlik doğrulama = e-posta:

1. Kurulumunuzda.xml, değiştirir&lt;BaseHtttpsUrl&gt; etiketin değeri.
Kişisel bilgisayarınızda deney yapmak / çalışmak için, kullanın
     https://localhost:8443   
Halkınız içinERDDAP™, kullanımı
     https://*your.domain.org*:8443   
veya olmadan:8443 Eğer bir Apache kullanıyorsanız[passpasspasspasspass](/docs/server-admin/deploy-install#proxypass)Böylece port numarası gerekli değildir.
     
2. Kurulumunuzda.xml, değiştirir&lt;&gt; Etiket e-postaya değer:
```
    <authentication>email</authentication>  
```

3. Kurulumunuzda.xml, e-posta sisteminin tüm aracılığıyla kurulduğundan emin olun.&lt;e-posta...&gt; etiketler, bu yüzdenERDDAP™e-posta gönderebilir. Mümkünse, bunu güvenli bir bağlantı kurmak için ayarlayın (SSL / TLS) e-posta sunucusuna.
     
4. Sizin içindatasets.xml ,&lt;kullanıcı&gt; (/docs /server-admin/datasets#user) Özel veri kümelerine erişimi olan her kullanıcı için etiketler.
Kullanıcının e-posta adresini etiketdeki kullanıcı adı olarak kullanın.
Kullanıcı etiketindeki şifre özelliklerini belirtmeyin.
     
5. RestartERDDAP™Bu nedenle, yapılandırma değişiklikleri.xml vedatasets.xmlEtkisi al.
         
###### Google, orcid, oauth2{#google-orcid-oauth2} 
*   [ **google google google** ](#google),[ **veya** ](#orcid)Ve[ **1.** ](#oauth2)   (önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen)   
Bu seçeneklerin üçü tavsiye edilirERDDAP™doğrulama seçenekleri. Hepsi en güvenli seçeneklerdir. Diğer seçenekler önemli ölçüde daha zayıf güvenliklere sahiptir.
     
###### Google Google Google{#google} 
* Google kimlik doğrulama seçeneği kullanır[Sign Sign Sign Google ile](https://developers.google.com/identity/gsi/web/guides/overview)Bu, hangi bir uygulamadır[OAuth 2.0 doğrulama protokolü](https://oauth.net/2/).ERDDAP™Kullanıcılar Google-managed hesapları da dahil Google e-posta hesabına imza atıyor@noaa.govhesaplar. Bu izin verirERDDAP™Kullanıcının kimliğini doğrulamak için (adı ve e-posta adresi) Ve profil imajına erişin, ama vermiyorERDDAP™e-postalarına, Google Drivelarına veya başka herhangi bir özel bilgiye erişim.
    
For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For ForERDDAP™v2.22 ve aşağıda,ERDDAP™"Google Sign-In". Google, sistemin 31 Mart 2023'ten sonra ele alındığını söylüyor. Zaten yapmadıysanız, lütfen geçiş yapınERDDAP™v2.23+ yeni "Sign In with Google" tabanlı doğrulama sistemini kullanmak için.
    
For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For ForERDDAP™Google Authentication kullanarak bir içerik-Güvenlik-Policy ile v2.23 örneği, Google Authentication'ı kullanarak, eklemeniz gerekir https://accounts.google.com İzin verilen script-src listesine (veya senaryo-src-elem) .ERDDAP™Artık artık kullanılmıyor https://apis.google.com Bu yüzden izin verdiyseniz, şimdi onu kaldırabilirsiniz.
    
For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For For ForERDDAP™v2.24+ Ayrıca eklemek gerekebilir https://accounts.google.com/gsi/style  st https://accounts.google.com/gsi/ Bağ-src bağlanmak için. script-src için artık kullanabilirsiniz https://accounts.google.com/gsi/client.
 
    
Daha fazla bilgi için gidebilirsin[Google sayfası](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#content_security_policy)CSP konfigürasyonu hakkında. Herhangi bir sorunuz varsa, noaaa.gov'da chris.john ile iletişime geçin.
         
###### Ya da{#orcid} 
* orcid kimlik doğrulama seçeneği kullanır[Veya](https://members.orcid.org/api/integrate/orcid-sign-in)Bu, hangi bir uygulamadır[OAuth 2.0 doğrulama protokolü](https://oauth.net/2/).ERDDAP™Kullanıcılar imza atıyor[Ya dacid hesabı](https://members.orcid.org/api/integrate/orcid-sign-in)Araştırmacılar tarafından kendilerini tanımlamak için yaygın olarak kullanılır. Bu izin verirERDDAP™Kullanıcının Orcid kimliğini doğrulamak ve Orcid hesap numarasını almak için, ancak vermeyinERDDAP™Diğer Orcid hesap bilgilerine erişim.

###### Oauth2{#oauth2} 
* Oauth2 seçeneği, kullanıcıların Google hesabı veya Orcid hesabı ile imzalanmasını sağlar.

Google, orcid ve oauth2 seçenekleri, açık seçeneğine geri döndükten sonra durduruldu.ERDDAP™1.68 sürüm ve hangi açık bir sürüme dayanıyordu Şu anda güncel olan kimlik. Lütfen google, orcid veya oauth2 seçeneğine geçiş yapın.

Bu seçenekler çok uygunERDDAP™yöneticiler - asla parola veya onların sindirmeleriyle uğraşmak zorunda değilsiniz. Yaratmanız gereken tek şey bir [&lt;kullanıcı&gt; (/docs /server-admin/datasets#user) Bir kullanıcı için etiketdatasets.xmlHangi kullanıcının Google e-posta adresini veya Orcid hesap numarasını kullanıcı özellikleri olarak belirtir. (Şifre özelliği doğrulama=email, google, orcid veya oauth2 olarak kullanılmaz.) 

Bu seçeneklerle, herkes oturum açabilirERDDAP™Google e-posta hesabına veya Orcid hesabına kaydolarak, ancak kimse size özel veri setlerine erişme hakkına sahip olmayacak. (The the the theERDDAP™yönetici yönetici yönetici) Bir yaratmak&lt;kullanıcı&gt; etiketi, Google e-posta adresini veya Orcid hesap numarasını kullanıcı adı olarak belirtir ve rollerini belirtir.

ERDDAP™E-posta adreslerine davaya duyarlı olarak davranır. Bu, girdiğiniz e-posta adreslerini dönüştürmekle ilgilidir (in&lt;kullanıcı&gt; etiketler) veya kullanıcılar girer (Giriş formunda) Tüm düşük sürümlerine.

Google'ı kurmak veya kararsız veya oauth2 doğrulama:

* Kurulumunuzda.xml, değiştirir&lt;BaseHtttpsUrl&gt; etiketin değeri.
Kişisel bilgisayarınızda deney yapmak / çalışmak için, kullanın
     https://localhost:8443   
Halkınız içinERDDAP™, kullanımı
     https://*your.domain.org*:8443   
Ya da daha iyi, olmadan:8443 bir Apache kullanıyorsanız[passpasspasspasspass](/docs/server-admin/deploy-install#proxypass)Böylece port numarası gerekli değildir.
     
* Kurulumunuzda.xml, değiştirir&lt;&gt; Örneğin: etiketin google, orcid veya oauth2 değeri:
```
    <authentication>oauth2</authentication>  
```
###### Google kurulumu{#google-setup} 
* Google ve oauth2 seçenekleri için:
Google kimlik doğrulamasını sağlamak için aşağıdaki talimatları izleyinERDDAP.
     
    1. Google e-posta hesabınız yoksa,[Bir tane yaratmak](https://www.google.com/intl/en_us/mail/help/about.html)  
         
    2. Takip Takip Takip[Bu talimatlar](https://developers.google.com/identity/sign-in/web/devconsole-project)Bir Google Developers Console projesi oluşturmak ve bir müşteri kimlik almak.
        
Google formu yetkili olarak sorulduğundaJavaSenaryo kökenleri, değere değerden girin&lt;BaseHtttpsUrl&gt; kişisel bilgisayarınızdanERDDAP™Kurulum.xml, e.g.,
         https://localhost:8443   
İkinci bir çizgide, ekleyin&lt;BaseHtttpsUrl&gt; halkındanERDDAP™Kurulum.xml, e.g.,
         https://*your.domain.org*:8443
 
        
Yetkili bir yönlendirme URIs belirtmeyin.
        
Müşteri kimliğinizi bu proje için gördüğünüzde, kopyalayın ve kurulumunuza yapıştırın.xml (genellikle sadece aşağıda aşağıdakiler altında).&lt;Teknik olarak, ancak yerleştirme aslında önemli değildir), durumda&lt;googleClientID&gt; etiketi, e.g.,
        &lt;googleClientID&gt; *yourClientID* &lt;/googleClientID&gt;
Müşteri kimliği yaklaşık 75 karakterin bir dizesi olacak, muhtemelen birkaç basamakla başlayacak ve .apps.googleusercontent.com ile sona erecek.
         
        
    3. Sizin içindatasets.xml(Bir)&lt;kullanıcı&gt; (/docs /server-admin/datasets#user) Özel veri setlerine erişecek her kullanıcı için etiket. Başlıktaki kullanıcı özellikleri için:
        
        * Google ile imzalayacak kullanıcılar için, kullanıcının Google e-posta adresini kullanın.
        * Ya dacid ile imzalayacak kullanıcılar için, kullanıcının Orcid hesap numarasını kullanın (ile) .
        
Kullanıcı etiketi için şifre özelliklerini belirtmeyin.
         
    4. RestartERDDAP™Bu nedenle, yapılandırma değişiklikleri.xml vedatasets.xmlEtkisi al.
         
###### Orcid kurulum{#orcid-setup} 
* Orcid ve oauth2 seçenekleri için:
Aşağıdaki talimatları takip et Orcid doğrulamayı sizin içinERDDAP.
     (Detaylar için, bakınız[Orcid'in doğrulama API belgeleri](https://members.orcid.org/api/integrate/orcid-sign-in).)   
     
    1. Bir Orcid hesabınız yoksa,[Bir tane yaratmak](https://orcid.org/signin)  
         
    2. Giriş yapın veya[ https://orcid.org/signin ](https://orcid.org/signin)Kişisel Orcid hesabınızı kullanarak.
         
    3. Click on "De Geliştirme Araçları" (“For Araştırmacılar için” altında) .
         
    4. Click on "Register for the free ORCID public API". Bu bilgiyi girin:
Ad:ERDDAP™At içeri at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at at\\[Organizasyonunuz\\]  
Web sitesi:\\[SeninERDDAP's domain\\]  
Açıklama:ERDDAP™Bilimsel bir veri sunucusudur. Kullanıcılar, kamu dışı veri setlerine erişmek için Google veya Orcid ile kimliklendirmelidir.
Emekli URIs:\\[SeninERDDAP's domain\\]/erddap /loginOrcid.html
         
    5. Save icon üzerinde tıklayın (3.5" disk gibi görünüyor&#33;) .
ORCID APP Müşteri Kimlik ve ORCID Müşteri Gizli'inizi görebilirsiniz.
         
    6. ORCID APP Müşteri kimliklerini kopyalayın ve yapıştırın (Hangi "APP-" ile başlayacak) Kurulum.xml in the installation.&lt;orcidClientID&gt; etiketi, e.g.,
```
        <orcidClientID>APP-*ALPHANUMERICCHARACTERS*</orcidClientID>
```
    7. ORCID Müşteri Gizliliğini Kopyalayın (Daha düşük Alfa-numeric karakterler) Kurulum.xml in the installation.&lt;veyacidClientGizlilik&gt; etiketi, e.g.,
```
        <orcidClientSecret>*alpha-numeric-characters-with-dashes*</orcidClientSecret>
```

    8. Sizin içindatasets.xml(Bir)&lt;kullanıcı&gt; (/docs /server-admin/datasets#user) Özel veri setlerine erişecek her kullanıcı için etiket. Başlıktaki kullanıcı özellikleri için:
        
        * Google ile imzalayacak kullanıcılar için, kullanıcının Google e-posta adresini kullanın.
        * Ya dacid ile imzalayacak kullanıcılar için, kullanıcının Orcid hesap numarasını kullanın (ile) .
        
Kullanıcı etiketi için şifre özelliklerini belirtmeyin.
         
    9. RestartERDDAP™Bu nedenle, yapılandırma değişiklikleri.xml vedatasets.xmlEtkisi al.
             

###### Giriş Yap{#log-in-either-way} 
Google, orcid veya oauth2 kimlik doğrulama seçenekleri kullanıyorsanız ve Google Sign-In veya Orcid'in Kimlik Doğrulama API aniden iş yapmaktan vazgeçilir (Her ne sebeple olursa olsun) Ya da çalışmayı durdururERDDAP™Bekleyin, kullanıcılar giriş yapamayacakERDDAP. Geçici olarak geçici olarak (veya kalıcı) Çözüm, kullanıcıların diğer sistemle işaret etmesini isteyebilirsiniz. (Bir Google e-posta hesabı alın veya Orcid hesabı alın) . Bunu yapmak için:

1. Değişimi Değiştirin&lt;Kontrol etiketi, diğer kimlik doğrulama sistemine izin verir. Oauth2 seçeneği, kullanıcıların her iki sistemle oturum açmasını sağlar.
2. Her birini karıştırın&lt;kullanıcı&gt; etiketler ve kullanıcı özelliklerini Google e-posta adresinden gelen Orcid hesap numarasına değiştirin (veya tersi) Ancak roller aynı özelliği taşır.

###### OpenId{#openid} 
ERDDAP™Artık açık kimlik doğrulama seçeneği desteklemiyor, bu da açık bir sürüme dayanıyordu. Şu anda güncel olan kimlik. Lütfen google, orcid veya oauth2 seçeneklerini kullanın.

###### BASIC{#basic} 
ERDDAP™BASIC doğrulamasını desteklemez çünkü:
* BASIC, önceden tanımlanmış web sayfaları için tüm siteye güvenli erişim veya battaniyeye ihtiyaç duyuyor gibi görünüyor, ancakERDDAP™İzin sağlar izin verir izin verir (sınırlı erişim sınırlı erişim) Datasets to be added on-the-fly.
* BASIC kimlik doğrulama, kullanıcıların giriş yapması için bir yol sunmuyor&#33;
* BASIC doğrulama güvenli olmadığı bilinmektedir.

##### Güvenli Veri Kaynağı{#secure-data-sources} 
Bir veri kümesi sınırlı erişime sahipseERDDAP™Kullanıcılar, veri kaynağı (Nereden?ERDDAP™Verileri alır) Açık olarak erişilebilir olmamalıdır. Peki nasıl olabilirERDDAP™Sınırlı erişim veri setleri için verileri elde edin? Bazı seçenekler şunlardır:

*   ERDDAP™Yerel dosyalardan veri servis edebilir (Örneğin, EDDTable aracılığıyla FromFiles orEDDGridFromFiles) .
     
*   ERDDAP™Olabilir[DMZ](https://en.wikipedia.org/wiki/Demilitarized_zone_(computing)) ve veri kaynağı (E.g., anOPeNDAPsunucu veya bir veritabanı) Arkanızda olabilir[Güvenlik Duvarı](https://en.wikipedia.org/wiki/Firewall)nerede erişilebilirERDDAP™Ama halk için değil.
     
* Veri kaynağı kamu web sitesinde olabilir, ancak verileri almak için bir giriş gerektirir. Veri kümesinin iki türü,ERDDAP™erişmek için oturum açılabilir[EDDTable FromDatabase](/docs/server-admin/datasets#eddtablefromdatabase)ve[EDDTable FromCassandra](/docs/server-admin/datasets#eddtablefromcassandra). Bu datasets destek (Ve her zaman kullanılmalıdır) kullanıcı isimleri (Bir yaratmakERDDAP™Sadece okuduğum kullanıcı sadece ayrıcalıkları olan kullanıcı) , parolalar, SSL bağlantıları ve diğer güvenlik önlemleri.
    
Ama genel olarak, şu anda,ERDDAP™Bu veri kaynaklarıyla başa çıkamaz, çünkü veri kaynağına giriş için bir hüküm yoktur. Bu, erişimin neden erişimin[EDDGridErddap ve EDDTable FromErddap](/docs/server-admin/datasets#eddfromerddap)Datasets sınırlı olamaz. Şu anda, yerelERDDAP™Uzaktan gelen metadata bilgilerini giriş ve erişmenin bir yolu yokERDDAP. Ve "remote" koymakERDDAP™Güvenlik duvarınızın arkasında ve bu veri setinin erişilebilirliğini ortadan kaldırın kısıtlamalar sorunu çözmez: EDXxx için kullanıcı talepleriErddap verilerinden uzaklara yönlendirilmesi gerekiyorERDDAP™UzakERDDAP™erişilebilir olmalıdır.
    
#### Hackerlara Karşı Savunmalar{#defenses-against-hackers} 
Güvenlik zayıflıklarını sunucu yazılımlarında kullanmaya çalışan kötü adam hackerları varERDDAP.ERDDAP™Birkaç savunma katmanına sahip ortak güvenlik tavsiyelerini takip edin:

* Restricted Privileges - En önemli savunmalardan biri, tomcat adında bir kullanıcı aracılığıyla Tomcat çalıştırmaktır ki bu bir şifreye sahip değildir. (Bu nedenle kimse o kullanıcı olarak giriş yapamaz) Ve sınırlı dosya sistemi ayrıcalıkları vardır (e.g., sadece verilere erişim) . See See See SeeERDDAP'In talimatları[Tomcat](/docs/server-admin/deploy-install#tomcat).
* Ağır Kullanım - Genel olarak,ERDDAP™On binlerce istek yapan senaryolar da dahil olmak üzere ağır kullanım için inşa edilir, bir başkasından sonra. Bu zor çünküERDDAP™Aynı anda kendini ağır yasal kullanıma açın ve kendini istismardan korur. Bazen ağır meşru kullanımları, aşırı meşru kullanımları ayırt etmek zordur ve kötü niyetli kullanım (Ve bazen gerçekten kolay) . Diğer savunmalar arasında,ERDDAP™Bilinçli olarak, sistemin kaynaklarının kaynaklarının koordineli bir kısmını kullanmak için tek bir isteke izin vermez. (Sistem aksi takdirde aktif değildir) .
* Sorunlu Kullanıcılar Tanımlayın - EğerERDDAP™Yavaşlamak veya dondurmak (Belki de naif bir kullanıcı veya bir bot aynı anda veya belki de kötü bir adamın kötü bir adamın yüzünden birden fazla senaryo yayınlıyor.[Denial-of-service](https://en.wikipedia.org/wiki/Denial-of-service_attack)Saldırı saldırısı) Ama bakabilirsiniz[Günlük Rapor e-posta](#daily-report)  (Ve daha sık aynı bilgiler içinde[ERDDAP™günlük dosya](#log)) Hangi istek sayısını en aktif kullanıcılar tarafından gösterir ("Requester's IP Address (İzinli İzin Verilmiş İzin Verilmiş İzin Verilmiş İzin Verilmiş) " " "") .ERDDAP™Ayrıca e-postaları yöneticiye ne zaman orada olduğunda gönderir["Unusual activity: &gt;25% of requests başarısız"](#failed-requests). Daha sonra bakabilirsinERDDAP™İsteklerinin doğasını görmek için günlük dosya. Birisinin çok fazla talep yaptığını düşünüyorsanız, garip istekler (Ne gördüğüme inanmayacaksınız, belki de öyle olurdun) , veya saldırı tipi talepleri, IP adresini kara listeye ekleyebilirsiniz.
* Blacklist – Sorunlu kullanıcıların IP adresini, botları ve[Denial-of-service](https://en.wikipedia.org/wiki/Denial-of-service_attack)SaldırıcılaraERDDAP [Blacklist](/docs/server-admin/datasets#requestblacklist)Bu nedenle onlardan gelecek talepler derhal reddedilecektir. Bu ayar içeridedirdatasets.xmlBu yüzden listeye bir IP adresini hızlıca ekleyebilir ve sonra[Bayrak bayrağı](#flag)Bir veri kümesi bu yüzdenERDDAP™Hemen fark eder ve değişikliği uygular. Siyah listelenen kullanıcılara gönderilen hata mesajı onları temasa geçmeye teşvik ederERDDAP™Yönetici eğer siyah listeye yanlışlıkla koyduğunu hissederler. (Deneyimimizde, birkaç kullanıcı aynı anda birden çok senaryo çalıştırdıklarını veya senaryolarının saçmalık talepler yaptığını habersizdi.) 
* Dataset Security - Bazı veri kümeleri türleri (Özellikle, EDDTable FromDatabase) Mevcut ek güvenlik riskleri (e.g., SQL enjeksiyonu) Ve kendi güvenlik önlemleri var. Bu tür veri kümeleri için bilgileri görün[Çalışmak ile çalışmakdatasets.xmlDosya](/docs/server-admin/datasets)Özellikle,[EDDTable FromDatabase security](/docs/server-admin/datasets#database-security).
* Güvenlik Denetimi – Her ne kadar olsa da olsa da olsa da olsa da rağmenNOAAIT güvenliği yıllardır tarama taleplerimizi reddetti, şimdi rutin olarak beni taradılar (Bob's)  ERDDAP™kurulum. İlk taramalar daha sonra düzeltilebileceğim bazı sorunlar bulmuş olsa da, sonraki taramalar problemleri bulamadıERDDAP. Taramalar birçok şey hakkında endişeleniyor: özellikle de, çünkütabledapTalepler SQL istekleri gibi görünüyor, SQL enjeksiyon güvenlikleri konusunda endişeleniyorlar. Ama bu endişeler ortaya çıkıyor çünküERDDAP™Her zaman parslar ve sorguları onaylar ve sonra enjeksiyon açıklarından kaçınan bir şekilde SQL sorgusunu ayrı olarak inşa eder. Bazen şikayet ettikleri diğer şey, bizim içinJavasürüm veya Tomcat versiyonları istedikleri gibi güncel değildir, bu yüzden onları yanıt olarak güncelliyoruz. Daha önce insanlara güvenlik raporlarını göstermek için teklif ettim, ama şimdi bunu yapamıyorum.

#### Sorular? Öneriler?{#questions-suggestions} 
Herhangi bir sorunuz varsaERDDAP“Güvenlik sistemi veya herhangi bir soru, şüpheler, endişeler veya bunun nasıl belirleneceği konusunda öneriler var, bizi gör[Bölüm almak için ek destek](/docs/intro#support).
    

## Bilmeniz Gereken Şeyler{#things-you-dont-need-to-know} 

Bunlar, ihtiyaç ortaya çıkana kadar bilmeniz gereken detaylardır.

### İkincisiERDDAP™ {#second-erddap} 
*    **AyarlayınERDDAP™Test / Geliştirme**   
Bunu yapmak istiyorsanız, iki yaklaşım vardır:
    *    (Best Best Best Best Best Best Best Best Best Best Best Best Best Best Best Best Best Best Best Best Best Best Best Best Best Best Best Best Best Best Best Best Best Best Best Best Best Best Best Best Best Best Best Best Best Best Best Best Best Best Best Best Best Best Best Best Best) Tomcat'ı yükleyin veERDDAP™Diğer bir bilgisayarda, sizin kamuoyunuza sahip olan bilgisayardanERDDAP. Kişisel bilgisayarınızı kullanıyorsanız:
        1. Bir seferde bir adım at. Tomcat up alın ve ilk önce koşuyor.
Tomcat çalışıyorsa, Tomcat Manager atılmalıdır
            [ http://127.0.0.1:8080/manager/html/ ](http://127.0.0.1:8080/manager/html/)  (Ya da belki[ http://localhost:8080/manager/html/ ](http://localhost:8080/manager/html/)) 
        2. YüklemeERDDAP.
        3. Liman numarasını liman numarasını ortadan kaldırmak için ProxyPass kullanmayınERDDAP™URL.
        4. In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In[Kurulum.xml](/docs/server-admin/deploy-install#setupxml), set baseUrl to http://127.0.0.1:8080
 
        5. Bunu başlattıktan sonraERDDAP™Ama bunu görebilmelisin
            [ http://127.0.0.1:8080/erddap/status.html ](http://127.0.0.1:8080/erddap/status.html)  (Ya da belki[ http://localhost:8080/erddap/status.html ](http://localhost:8080/erddap/status.html)) 
#### İkincisi Tomcat{#second-tomcat} 
*    (İkincisi En İyi İkincisi) Diğer Tomcat'ı halkınız olarak aynı bilgisayarda yükleyinERDDAP.
    1. Bir seferde bir adım at. Tomcat up alın ve ilk önce koşuyor.
İkinci Tomcat ile ilişkili tüm liman numaralarını değiştirin (e.g., 8080 ila 8081)   (Görmeyi gör[Birden fazla Tomcat Instances section](https://tomcat.apache.org/tomcat-8.0-doc/RUNNING.txt)Yarısı bu belge aracılığıyla) .
    2. YüklemeERDDAP™Yeni Tomcat'ta.
    3. Liman numarasını liman numarasını ortadan kaldırmak için ProxyPass kullanmayınERDDAP™URL.
    4. In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In In[Kurulum.xml](/docs/server-admin/deploy-install#setupxml), set baseUrl to http://www.*yourDomainName*:8081
 
    5. Bunu başlattıktan sonraERDDAP™Ama bunu görebilmelisin
         http://www.*yourDomainName*:8081/erddap/status.html   
             
### Solid State Drives{#solid-state-drives} 
*    **Solid State Drives (SSDs) Harika&#33;**   
En hızlı, en kolay ve en ucuz yolu hızlandırmak içinERDDAP“Pilar verilere erişim, bir Solid State Drive üzerindeki veri dosyalarını koymaktır (SSD) . Çoğu tabut veri setleri nispeten küçük, bu yüzden 1 veya 2 TB SSD muhtemelen tüm tabu veri kümeleriniz için veri dosyalarını tutmak için yeterlidir. SSD'nin sonunda bir hücreye veri yazsanız, onu silip bu hücreye çok fazla kez yeni veriler yaz. Yani sadece bir kez verileri yazmak ve birçok kez okumak için SSD'nizi kullanıyorsanız, bir tüketici sınıfı SSD çok uzun bir süre son vermeli, muhtemelen herhangi bir Hard Disk Drive Drive Drive Drive Drive Drive Drive Drive Drive Drive Drive'dan çok daha uzun bir süre önce. (HDD) . Tüketici-grad SSD’ler artık ucuz (2018 - 1 TB veya - 2 TB için 400 $) Ve fiyatlar hala hızlı düşüyor. When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When WhenERDDAP™Bir veri dosyasına erişim, bir SSD hem daha kısa gecikme sunar (~0.1ms, bir HDD için ~3ms karşı, karşı ~10 (??) Bir RAID için, Amazon S3 için $) ve daha yüksek (~500 MB/S, bir HDD için -75 MB /s karşı, bir RAID için -500 MB /s) . Bu yüzden büyük bir performans artışı elde edebilirsiniz (10X'e karşı bir HDD) 200 $&#33; Sisteminize en olası değişikliklerle karşılaştırıldığında (10.000 $ için yeni bir sunucu? 35,000 $ için yeni bir RAID? 5000 $ için yeni bir ağ geçişi mi? vs.) Bu, Yatırım Üzerindeki En İyi Geri Dönüş (ROI) . Eğer / SSD öldüğünde (1, 2, ... 8 yıl) Bunun yerine. Uzun vadede olduğu gibi güvenmeyin, verilerin arşiv depolama, sadece verilerin ön uç kopyası için.\\[SSD'nin ızgara verileri için harika olurdu, ancak çoğu grid veri setleri çok daha büyük, SSD'yi çok pahalı hale getiriyor.\\]
    
Eğer sunucunuz hafıza ile yüklenemezse, sunucunuz için ek bellek aynı zamanda tüm yönleri hızlandırmak için harika ve nispeten ucuz bir yoldur.ERDDAP.
     
    
### [Heavy Loads / Constraints](#heavy-loads--constraints) **  {#heavy-loads--constraints} 
Ağır kullanımla, bir standaloneERDDAP™Çeşitli sorunlarla kısıtlanabilir. Daha fazla bilgi için, bakınız[kısıtlamaların ve çözümlerin listesi](/docs/server-admin/scaling#heavy-loads--constraints).
     
### Grids, Clusters ve Federasyonlar{#grids-clusters-and-federations} 
Çok ağır kullanım altında, tek bir standaloneERDDAP™Bir veya daha fazla kısıtlamaya girecek ve önerilen çözümler bile yetersiz olacaktır. Böyle durumlarda,ERDDAP™ölçeklenebilir ızgaralar inşa etmek kolay hale getiren özellikler vardır (Ayrıca kümeler veya federasyonlar olarak da adlandırılır) Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of OfERDDAPSistemin çok ağır kullanımı yönetmesine izin verenler (e.g., büyük bir veri merkezi için) . Daha fazla bilgi için, bakınız[Ağlar, kümeler ve federasyonlarERDDAPs](/docs/server-admin/scaling).
     
### Cloud Computing{#cloud-computing} 
Birkaç şirket teklif etmeye başlıyor[bulut bilişim hizmetleri hizmetleri](https://en.wikipedia.org/wiki/Cloud_computing)  (E.g.,[Amazon Web Services](https://aws.amazon.com/)) .[Web hosting şirketleri](https://en.wikipedia.org/wiki/Web_hosting_service)1990'ların ortalarından beri daha basit hizmetler teklif etti, ancak "bulut" hizmetleri, sunulan sistemlerin esnekliğini ve sunulan hizmetleri büyük ölçüde genişletti. Bu hizmetleri tek bir tek kurmak için kullanabilirsinizERDDAP™veya bir ızgara /ERDDAPÇok ağır kullanımı işlemek için. Daha fazla bilgi için, bakınız[Bulut bilişimi ileERDDAP™](/docs/server-admin/scaling#cloud-computing).

### Amazon Amazon Amazon{#amazon} 
*    **[Amazon Web Services (AWS) EC2 Kurulum Genel Bakış](#amazon)**   
    [Amazon Web Services (AWS) ](https://aws.amazon.com/)Bir şeydir[bulut bilişim hizmeti](https://en.wikipedia.org/wiki/Cloud_computing)Bu, saatte kiralayabileceğiniz geniş bir bilgisayar altyapısı sunar. Yükleme yapabilirsinizERDDAP™Üzerine[Elastic Compute Cloud (EC2) ](https://aws.amazon.com/ec2/)Örnek örnek örneği (Bir bilgisayar için onların adı, saatte kiralayabilirsiniz) . AWS mükemmel bir şeye sahiptir[AWS Kullanıcı Kılavuzu](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html)Ve sahip olabileceğiniz belirli sorulara cevap bulmak için Google'ı kullanabilirsiniz. Brace kendiniz - başlamak için adil bir çalışma miktarı. Ama bir kez bir sunucu alıp çalıştırdığınızda, birçok ek kaynak olarak kolayca kiralayabilirsiniz (sunucular, veritabanılar, SSD-space vs.) İhtiyacınız olduğu gibi, makul bir fiyata.\\[Bu Amazon Web Hizmetleri'nin tavsiye veya onayı değildir. Diğer bulut sağlayıcıları var.\\]
    
Yapmanız gereken şeylerin bir genel bakışıERDDAP™AWS'de çalışmak:
    
    * Genel olarak, tarif edilen tüm şeyleri yapacaksınız[AWS Kullanıcı Kılavuzu](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html).
    * Bir AWS hesabı oluşturun.
    * Bu hesapta yönetici ayrıcalıklarla bir AWS kullanıcısı oluşturun. Log in as this user to do all the following steps.
    * Elastik Blok Depolama (EBS) AWS sunucunuza bağlı sert bir sürücü eşdeğerdir. Bazı EBS alanı ilk olarak bir EC2 örneği yarattığınızda tahsis edilecektir. Kalıcı depolamadır - bilgi EC2 örneğinizi durdurdığınızda kaybolmaz. Ve örnek tiplerini değiştirirseniz, EBS alanınız otomatik olarak yeni örneke bağlanır.
    * Bir elastik IP adresi oluşturun, böylece EC2 örneğinizin istikrarlı, genel URL'si var (Sadece özel bir URL’ye karşı olduğu gibi, her seferinde değiştirirsiniz) .
    * Create and start up an EC2 örnek (bilgisayar bilgisayar bilgisayar) . Çok geniş bir aralığı var[Örnek türleri](https://aws.amazon.com/ec2/instance-types/)Her biri farklı bir fiyatta. Bir m4.large veya m4.xlarge örneği güçlü ve muhtemelen çoğu kullanım için uygundur, ancak ihtiyaçlarınızı karşılayan her şeyi seçin. Muhtemelen Amazon'un Linux'unu işletim sistemi olarak kullanmak isteyeceksiniz.
    * masaüstü/laptop bilgisayarınız bir Windows bilgisayarsa, kullanabilirsiniz[PuTTY](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/putty.html)Windows için ücretsiz bir SSH müşteri, EC2 örneğinin komut satırına erişmek için. Ya da tercih ettiğiniz bazı SSH programına sahip olabilirsiniz.
    * EC2 örneğinize giriş yaptığınızda, kullanıcı adı "ec2-user" ile idari kullanıcı olarak giriş yapacaksınız. ec2-user'in sudo ayrıcalıkları vardır. Yani, kök kullanıcısı olarak bir şey yapmanız gerektiğinde, kullanın: sudo *SomeCommand* 
    * masaüstü/laptop bilgisayarınız bir Windows bilgisayarsa, kullanabilirsiniz[FileZilla](https://stackoverflow.com/questions/16744863/connect-to-amazon-ec2-file-directory-using-filezilla-and-sftp), ücretsiz bir SFTP programı, dosyaları EC2 örneğinden / transfer etmek. Ya da tercih ettiğiniz başka SFTP programına sahip olabilirsiniz.
    *   [Apache yükleme Apache](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/install-LAMP.html)EC2 örneğinde.
    * Standartları takip edin[ERDDAP™yükleme talimatları](/docs/server-admin/deploy-install).
         
### WaitOTryAgain Exception{#waitthentryagain-exception} 
Bir kullanıcı bir hata mesajı alabilir
WaitOTryAgainException:
Orada bir tane vardı (Geçici?) Sorun. Bir dakika bekleyin, sonra tekrar deneyin. (Bir tarayıcıda, Reload düğmesine tıklayın.)   
Detaylar: GridDataAccessor.increment: kısmiResults\\[0 0 0 0\\]url23542730 "123532800" olması bekleniyordu.

WaitO zamanTryAgainException'ın genel açıklaması:
When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When WhenERDDAP™Bir kullanıcı isteğine cevap vermek, veri kümesi ile beklenmedik bir hata olabilir (e.g., dosyadan verileri okurken bir hata veya uzaktan bir veri kümesine erişim hatası) . WaitOTryAgain sinyalleriERDDAP™Bu istek başarısız oldu (Şimdiye kadar) ama buERDDAP™Veri kümesini hızla yeniden yüklemeye çalışmalıdır (Bu aramalar[İstekReloadASAP](#requestreloadasap)) ve isteği yeniden deneyin. Genellikle, bu başarılılar ve kullanıcı sadece isteke yanıtın yavaş olduğunu görür. Diğer zamanlarda, reload başarısız olur veya çok yavaştır veya istekle uğraşmak için sonraki girişim de başarısız olur ve başka bir WaitOTryAgain atar. Eğer bu olursa,ERDDAP™Reloading için veri kümesini işaret eder, ancak kullanıcıyı söyler (Bir WaitThenTryAgain Exception) İsteke cevap verirken bir başarısızlık oldu.

Bu normal davranıştır. Bu sistem birçok ortak problemle başa çıkabilir.
Ancak bu sistem aşırı tetiklenen almak mümkündür. En yaygın nedeni, bunun olmasıdırERDDAP'Veri setinin yüklenmesi bir problem görmüyor, amaERDDAP“Veriler için bir isteke yanıt sorun görür. Sebep ne olursa olsun, çözüm, veri kümesi ile yanlış olan her şeyle uğraşmak içindir. Gerçek hata mesajlarını görmek ve sorunlarla uğraşmak için log.txt'e bakın. Bir sürü dosyanın geçerli başlıkları varsa ancak geçersiz veriler (yozlaşmış bir dosya) , dosyaların bozulmamış dosyaları ile değiştirilmesi. Bir RAID'in bağlantısı flakey ise, düzeltin. Uzak bir servise olan bağlantı flakey ise, uzak kaynaktan tüm dosyaları indirmenin veya indirmenin bir yolunu bulun ve yerel dosyalardan verilere hizmet edin.

Bu özel hatanın ayrıntılı açıklaması (Yukarıda yukarıda yukarıda yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda Yukarıda) :
Her biri içinEDDGriddataset,ERDDAP™Radar değişken değerlerini hafızada tutar. Örneğin, "Aptal değerleri" kullanan talep edilen eksen değerlerini dönüştürmek için kullanılırlar. () "Form sayılarına format. Örneğin, eksen değerleri "10, 15, 20, 25" ise, bir istek " (20 20) index #2 için bir istek olarak yorumlanacaktır. (0 tabanlı indeksler) . When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When When WhenERDDAP™Veriler için bir istek alın ve veriler kaynaktan alır, kaynağından aldığı eksen değerlerinin hafızadaki eksen değerlerini eşleştirdiğini belirtir. Normalde, yaparlar. Ancak bazen veri kaynağı önemli bir şekilde değişti: örneğin, eksen değişkeninin başlangıcından gelen indeks değerleri kaldırılabilir. (E.g., "10, 15, 20, 25" "20, 25, 30" olabilir.) . Eğer bu olursa, açık kiERDDAPİstekin yorumlanması (E.g., " (20 20) "The index #2) Şimdi yanlış. Bu yüzdenERDDAP™Bir istisna atar ve RequestReloadASAP'ı çağırır.ERDDAP™Yakında veri kümesini güncelleyecek (Genellikle birkaç saniye içinde, genellikle bir dakika içinde) . Diğer, benzer sorunlar da WaitOTryAgain istisnaını atmaktadır.
    
#### İstekReloadASAP{#requestreloadasap} 
İstekReloadASAP'ı bir hata mesajından sonra ve genellikle bir hata mesajının yakınında görebilirsiniz[WaitOTryAgain Exception](#waitthentryagain-exception). Temel olarak iç, programmatik bir yoldurERDDAP™kurmak için[Bayrak bayrağı](#flag)Dataset'in ASAP'ı yeniden yüklemesi gerektiğini işaret etmek.
     
### Dosyalar Deletedilmedi{#files-not-being-deleted} 
Birkaç kişi içinERDDAP™Kurulumlar, tarafından yaratılan bazı geçici dosyalarla ilgili bir sorun olmuşturERDDAP™Açık kalmak (yanlışlıkla yanlışlıkla yanlış) Ve böylece silinme. Birkaç durumda, bu dosyaların çoğu bir araya geldi ve önemli miktarda disk alanı aldı.

Umarım, bu sorunlar sabitlenir (SankiERDDAP™v2.00) . Bu sorunu görürseniz, lütfen Chris'e suçlu dosyaların dizilerini e-postalayın. John at noaa.gov. Sorunla uğraşmak için birkaç seçeneğiniz var:

* Eğer dosyalar büyük değilse ve disk alanı dışına çıkmanıza neden olmaz, sorunu görmezden gelebilirsiniz.
* En basit çözüm tomcat /ERDDAP™  (saatlerden sonra daha az kullanıcı etkileniyor) . Kapalı sırasında, işletim sistemi dosyaları silmezse, onları el ile sil. Sonra yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden başladı.ERDDAP.
         
### JSON-ld{#json-ld} 
*    **[Semantic Datasets with json-ld (JSON Linked Data) ](#json-ld)**   
    ERDDAP™Şimdi kullanımları kullanın[json-ld (JSON Linked Data) ](https://json-ld.org)Veri katalogunuzu ve veri kümelerinizi oluşturmak için[semantic web](https://en.wikipedia.org/wiki/Semantic_Web)Tim Berners-Lee'nin web içeriğini daha fazla makine okunabilir ve makine "korkunabilir". json-ld içerik kullanır[şema.org](https://schema.org/)Şartlar ve tanımlar. Arama motorları ([Google özellikle Google](https://developers.google.com/search/docs/data-types/datasets)) Ve diğer semantik araçlar, keşif ve indekslemeyi kolaylaştırmak için bu yapılandırılmış işaret kullanabilir. json-ld yapılandırılmış işaret, görünmez-insanlar olarak görünür&lt;script&gt; Kod https://.../erddap/info/index.html web sayfası (Hangi bir semantic web[DataCatalog](https://schema.org/DataCatalog)) Ve her şeyde ve https://.../erddap/info/*datasetID*/index.html web sayfası (Hangi bir semantic web[Dataset](https://schema.org/Dataset)) . (Adam Leadbetter ve Rob Fuller of the Marine Institute in İrlanda'daki işin bu bölümünü yapmak için işin zor kısımlarını yapmak için özel teşekkürler.ERDDAP.)   
     
### Out-Of-Date URLs{#out-of-date-urls} 
Yavaşça ama kesinlikle, veri sağlayıcılarının veri dosyalarına yazdığı URL'ler güncelleniyor. (Örneğin,http“httpsAncak, web siteleri yeniden düzenlenmiştir ve NODC/NGDC/NCDC gibi örgütler yeniden NCEI olarak yeniden düzenlenmiştir.) . Ortaya çıkan kırık bağlantılar, tüm web siteleri tarafından karşı karşıya olan her zaman temsil eden bir problemdir. bununla uğraşmak için,ERDDAP™Şimdi otomatik olarak güncel URL'leri güncellemek için bir sistem var. GenrateDatasets X ml güncel URL'yi görür, güncel URL'yi güncel URL'yi güncel URL'yi ekliyor&lt;addAttributes&gt;. Ayrıca, bir veri kümesi yükleri olduğunda, eğerERDDAP™Geçerli bir URL'yi görüyor, sessizce güncel URL'ye değiştiriyor. Değişiklikler bir dizi arama için / yer için kontrol edilir çiftlerle&lt;UpdateUrls&gt; in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in inERDDAP"
\\[tomcat\\]/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messajlar.xml dosyası. Orada değişiklikler yapabilirsiniz. Değişiklikler için önerileriniz varsa veya bunun bir hizmete dönüşeceğini düşünüyorsanız (Paketler gibi) Lütfen e-posta Chris. John at noaa.gov.
     
### KURUMSAL{#cors} 
* KURUMSAL ([Cross-Origin Kaynak Paylaşımı](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing))   
“ Sınırlı kaynakları kısıtlayan bir mekanizma (e.g. fontlar veyaERDDAP™Data data data data data data) Bir web sayfasında, ilk kaynağın servis edildiği alan dışında başka bir alandan talep edilecek.” (Arun Ranganathan) . Temel olarak, KORS, bir yanıtın HTTP başlığına koyabilecek bir mesajdır, aslında, “bu siteyle başka sitelerle tamam mı, bazı diğer sitelerle tamam mı? (Belirli olanlar veya hepsi) Kaynakları ele alın (e.g., data) Bu siteden ve onların sitesinde mevcut yapın.” Böylece, bu bir alternatiftir[JSONP](https://en.wikipedia.org/wiki/JSONP).
    
GeliştiricilerERDDAP™Güvenlik uzmanları olduğunu iddia etmeyin. KURUMSALS ile ilgili güvenlik sorunları hakkında tamamen açık değiliz. Güvenlik azaltan bir eylemi sonlandırmak istemiyoruz. Bu yüzden sadece tarafsız kalacağız ve her birine bırakacağızERDDAP™Bir CORS başlığının risklere değeceğine karar vermek için yönetici. Her zaman olduğu gibi, eğer seninERDDAP™Herhangi bir özel veri kümesi vardır, güvenlik konusunda ekstra dikkatli olmak iyi bir fikirdir.
    
KORS'i sizin için etkinleştirmek istiyorsanızERDDAP™Ama orada var[kolayca kullanılabilir talimatlar](https://enable-cors.org/index.html)Web sitesi yöneticilerinin daha düşük seviyeli sunucu yazılım yazılımları aracılığıyla bir KURUMSALS başlığı nasıl etkinleştirebileceğini tanımlamak (E.g., Apache veya nginx) .
    
### Yakıtlar{#palettes} 
* Yakıtlar tarafından kullanılırERDDAP™Grafikler ve haritalar yaparken bir dizi veri değeri dönüştürmek.
    
Her palet bir .cpt-style palette kullanılan bir dosyada tanımlanır[GMT GMT](https://www.soest.hawaii.edu/gmt/). Bütün HepsiERDDAP™.cpt dosyaları geçerli GMT .cpt dosyalarıdır, ancak tersi doğru değildir. Kullanımı içinERDDAP™, .cpt dosyaları vardır:
    
    * Dosyanın başlangıcında, "#" ile başlayın.
    * Trackte segmentlerinin bir açıklaması ile ana bölüm, çizgi başına bir segment. Her segment açıklaması hattının 8 değeri vardır:
start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start start Değer, Red'e başlayın, başlayın Yeşil, başlayın Blue, endValue, endRed, endGreen, son Blue.
Bir dizi segment olabilir.ERDDAP™BaşlangıçRed/Green / Blue arasındaki lineer interpolasyon kullanır ve her segmentin Red/Green/Mavi'yi sonlandırır.
        
Her segmentin farklı bir başlangıç ve son renkte belirtilmesini ve her segmentin başlangıç renginin önceki segmentin son rengi olarak aynı olmasını tavsiye ederiz, böylece palet sürekli bir renk karışımı açıklar.ERDDAP™Sürekli renklerle bir paletten ayrı renkler bir palet oluşturmak için bir sistem vardır. An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An AnERDDAP™Kullanıcı, paletin sürekli olmasını isterlerse belirtebilir (Orijinal orijinali) veya Discrete (Orijinalden elde edilen orijinal) . Ancak bazı paletler için bu önerileri takip etmek için meşru nedenler var.
        
    * BaşValue ve endValues tamsayı olmalıdır.
İlk segment Value=0 ve endValue=1 başlamalıdır.
İkinci segment Value=1 ve endValue=2 başlamalıdır.
Etc.
    * Kırmızı, yeşil ve mavi değerler 0'dan tam anlamıyla olmalıdır. (Hiçbir kimse hiçbir şey yok) ... 255 (Tam olarak) .
    * Dosyanın sonu 3 satır olmalıdır:
        1. Veri değerleri için renk çubuğu minimum, e.g.: B 128 128 128 128 128
Genellikle başlangıç kırmızı, başlangıçGreen ve ilk segmentin Blue'ya başlıyor.
        2. Veri değerleri için bir foreground rgb rengi, maksimum, e.g.: F 128 0 0 0 0 0
Genellikle son Red, endGreen ve son segmentin mavisidir.
        3. NaN veri değerleri için bir rgb rengi, e.g., N 128 128 128 128
Genellikle orta gri (128 128 128 128) .
    * Her çizgideki değerler sekmeler tarafından ayrı olmalıdır, ekstra alanlar olmadan.
    
Örnek bir .cpt dosyası BlueWhiteRed.cpt:
    
\\# Bu Blue White Red.cpt.
0 0 0 128 1 0 0 255
1 0 255 2 0 255 255 255 255
2 0 255 255 255 3 255 255 255 255 255
3 255 255 255 4 255 255 255 0
4 255 255 0 5 255 0 0 0
5 255 0 0 6 128 0 0 0
B 0 0 128
F 128 0 0 0
N 128 128 128 128 128
    
Diğer örnekler için mevcut .cpt dosyaları görün. Bir .cpt dosyası ile sorun varsa,ERDDAP™Muhtemelen .cpt dosyası parsed olduğunda bir hata atacaktır (Bu, bilgiyi yanlışlaştırmaktan daha iyidir) .
    
Ek paletler ekleyebilirsinERDDAP. Onları kendiniz yapabilir veya web'de bulabilirsiniz (Örneğin, örneğin,[cpt-city](http://soliton.vm.bytemark.co.uk/pub/cpt-city/)) Muhtemelen formatlarını biraz düzenlemeniz gerekecek olsa da, uyum sağlamak içinERDDAP's .cpt requirements. almak içinERDDAP™Yeni bir .cpt dosyasını kullanmak için, dosyayı içeri girin *tomcat* /webapps/erddap /WEB-INF/cptfiles (Bunu her yeni versiyonu için yapmanız gerekecekERDDAP) Ya da:
    
    * Varsayılan mesajları kullanırsanız.xml dosyası: Dosya adını dosya adı ekleyin&lt;Tracktes&gt; etiketi
         *tomcat* /webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messajlar.xml.
Bunu yaparsanız, her seferinde yükseltmeniz gerekirERDDAP.
    * Özel mesajlar kullanırsanız.xml dosyası: Dosya adını dosya adı ekleyin&lt;Tracktes&gt; etiketi özel mesajlarınızda.xml dosyası: *tomcat* /content/erddap/messages.xml . Bunu yaparsanız, sadece bir kez yapmanız gerekir (Ancak özel mesajları korumak için başka bir iş var.xml file) .
    
Sonra yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden yeniden başladı.ERDDAP™Bu yüzdenERDDAP™Değişiklikleri fark eder. Bu yaklaşımın bir avantajı, kullanıcılara sunulan listedeki paletlerin siparişini belirtebileceğinizdir. Bir koleksiyon eklerseniz, yazarların başlangıçları ile önceden bir ek eklemenizi teşvik ederiz. (E.g., "KT\\_" " "") Koleksiyonu tanımlamak için her paletin adına ve böylece başka türlü aynı adı olan birden fazla palet olabilir.
    
Lütfen standart paletlerden herhangi birini kaldırma veya değiştirme. Hepsi standart bir özelliktirERDDAP™Kurulumlar. Bir palet veya palet koleksiyonunun standart olarak dahil edilmesi gerektiğini düşünüyorsanızERDDAP™Dağıtım çünkü genel kullanım olurdu, lütfen Chris'e e-posta gönderin. John at noaa.gov.
    
### Colorbars{#colorbars} 
*    **Nasıl yapılırERDDAP™Renkleri bir renk çubuğunda mı üretir?** 
    
    1. Kullanıcı önceden tanımlanmışlardan birini seçer[paletler](#palettes)Ya da varsayılan, e.g., Rainbow. Sattes, GMT-style .cpt Color Pickte Table dosyalarında depolanır/ tanımlanabilir. Her birinin her biriERDDAP‘Ölmüş paletler basit tam tam tam bir aralığı vardır, e.g., 0 to 1 (Eğer palette sadece bir bölüm varsa) , veya 0 ila 4 (Eğer palette dört bölüm varsa) . Dosyadaki her segment n+1'i kapsar, n=0'da başlayın.
    2.  ERDDAP™Yeni bir .cpt file on-the-fly, önceden tanımlanmış palet sayısını ölçeklendirmek için (e.g., 0 to 4) Kullanıcı tarafından gerekli olan palet aralığına (e.g., 0.1 ila 50) Ve sonra yeni palette yeni bir bölüm oluşturmak yeni paletin her bölümü için (e.g., 0.1, 0,5, 1, 5, 10, 50 numaralı akışlarla bir günlük ölçek 5 bölüm olacak) . Her bölümün son noktası için renk, .cpt dosyasında paletin ilgili bölümünü bulmakla üretilir, sonra lineer olarak R, G ve B değerleri arayır. (Bu, GMT'nin Renk Emisyon Masa dosyalarından renkler nasıl ürettiğiyle aynıdır.) Bu sistem izin verirERDDAP™Genel paletlerle başlamak (E.g., 8 segmentle Rainbow, toplam 0 ila 8) ve özel paletler oluşturun (E.g., hangi haritalar 0.1 ila 50 mg/L'yi gökkuşağı renklere taşır) .
    3.  ERDDAP™Daha sonra renk barındaki her farklı renkli piksel için renk oluşturmak için yeni .cpt dosyasını kullanır. (ve daha sonra her veri noktası bir grafik veya haritada veri arsadığı zaman veya haritada) Yine, paletin ilgili bölümünü .cpt dosyasında bulmakla, o zaman R, G ve B değerlerini lineer olarak sorgulayın.
    
Bu süreç gereksiz derecede karmaşık görünebilir. Ancak diğer yolları çözmek zor olan günlük ölçeklerle ilgili sorunları çözer.
    
Bu yüzden ne hakkında ne söyleyebilirsiniz?ERDDAP™Yapar mı? Bu kolay değil. Temel olarak, süreci tekrarlamanız gerekirERDDAP™Kullanımı. Eğer biriniz varsaJavaProgramr, aynı şeyi kullanabilirsinizJavaSınıf:ERDDAP™Tüm bunları yapmak için kullanılır:
     *tomcat* /webapps/erddap/WEB-INF/classes/gov/noaa/pfel/coastwatch/sgt/Compound ColorMap.java.
    
### Data Dağıtım Sistemleri için Kılavuz{#guidelines-for-data-distribution-systems} 
Veri dağıtım sistemlerinin tasarımı ve değerlendirilmesi hakkında daha genel fikirler bulunabilir[İşte burada burada](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html).
     
### ArchiveADataset{#archiveadataset} 
Dahil olunERDDAP™Kurulum ArchiveADataset adı verilen bir komut hattı aracıdır ve bir arşiv oluşturmanıza yardımcı olabilir (Birbiri.zipveya.tar.gzDosya dosyası) Bir dizi netcdf-3 içinde depolanan bir veri kümesinin parçası veya hepsi ile.ncBir dosya formatındaki veri dosyaları, teslim için uygunNOAA's NCEI archive (.ncHubded datasets veya[.ncCFMA](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA)tabular veri setleri için, belirtildiği gibi[NCEINetCDFŞablonlar v2.0](https://www.ncei.noaa.gov/data/oceans/ncei/formats/netcdf/v2.0/index.html)) .

ArchiveA Dataset iki farklı arşiv formatı yapabilir:

* "orijin" formatı bu şekilde takip eder[NCEI Archiving Guidelines](https://www.ncdc.noaa.gov/atrac/guidelines.html)Bu kılavuz için[Verinizi NCEI](https://sites.google.com/a/noaa.gov/ncei-ioos-archive/cookbook?pli=1), ve ilgili[Ensuring Data Integrity için uygulamalar](https://sites.google.com/a/noaa.gov/ncei-ioos-archive/cookbook/data-integrity).
* "BagIt" formatı yapar[BagIt dosyaları](https://en.wikipedia.org/wiki/BagIt)ABD Kongre Kütüphanesi tarafından desteklenen standart bir arşiv formatı, belirtildiği gibi,[BagIt v0.97 spesifikasyon](https://tools.ietf.org/html/draft-kunze-bagit-14).NOAA's NCEI, BagIt dosyalarına arşivlere teslim için standartleştirebilir.

Şaşırtıcı değil, şaşırtıcı değil,[Global ve değişken metadata](/docs/server-admin/datasets#global-attributes)İşte buERDDAP™teşvik/requires neredeyse tam olarak aynı In-file CF ve ACD metadata'dır, bu yüzden tüm veri setleriniz NCEI'ye teslim edilmek için hazır olmalıdır.[Send2NCEI](https://www.nodc.noaa.gov/s2n/)veya[ATRAC](https://www.ncdc.noaa.gov/atrac/index.html)  (Archive Collections için Gelişmiş İzleme ve Kaynak Aracı) .

Eğersen (The the the theERDDAP™yönetici yönetici yönetici) ArşivADataset verileri NCEI'ye sunmak için, o zaman siz (NCEI) Yeni veriler olduğunda ve bu chunk'un ne olacağının bir veri sunacağını belirleyecektir, çünkü bu chunk'un ne olacağını ve bu chunk'un nasıl belirteceğinizi bileceksiniz. (Ve NCEI won't) . Böylece, ArchiveADataset, NCEI'ye göndermek için bir paket oluşturmak için kullanmak için bir araçtır.

ArchiveA Dataset diğer durumlarda faydalı olabilir, örneğin, örneğin,ERDDAP™Bir veri kümesini dönüştürmeye ihtiyaç duyan yöneticiler (Özel bir özeldeERDDAP) Ana dosya formatından bir setine[.ncCF dosyaları](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA)Bu yüzden bir halkERDDAP™Verilere buradan hizmet edebilir.ncOrijinal dosyaları yerine CF dosyaları.

Bir kez ayağa kalktınERDDAP™Ve onu çalıştırın (En azından bir kez) , ArchiveADataset'ı bulabilirsiniz ve kullanabilirsiniz *tomcat* /webapps/erddap /WEB-INF rehberi. Bir kabuk senaryosu var (ArchiveADataset.sh) Linux/Unix ve bir toplu dosya (ArchiveADataset.bat) Windows için.

Windows'ta, ArchiveADataset çalıştırdığınız ilk kez, ArchiveADataset'i düzenlemeniz gerekiyor. Bir metin editörü ile yaralanan dosyayı java'a değiştirmek için. exe file böylece Windows bulabilirJava.

ArchiveADataset çalıştırdığınızda, size bir dizi soru soracaktır. Her soru için, bir cevap yazın, sonra basın girin. Ya da basın ^C herhangi bir zamanda bir program çıkmak.

Veya, cevapları sorulara, sırayla, komut satırına koyabilirsiniz. Bunu yapmak için, programı bir kez çalıştırın ve yanıtlarınızı yazın. Sonra, tek bir komut satırı oluşturabilirsiniz (Referanslarla parametreler olarak) Hangi programı çalışır ve tüm soruları yanıtlar.
Belirli bir parametre için varsayılan değeri kullanmak istiyorsanız kelimeyi varsayılan olarak kullanın.
"" kullanın" (İki çift alıntı) Boş bir dize için yer sahibi olarak.
komut satırındaki parametrelerin çok uygun olması, örneğin, ArchiveADataset'i ayda bir kez bir kez veri değerinde arşivlemek için kullanabilirsiniz. Emir hattını parametrelerle oluşturduktan ve notlarınızda veya bir kabuk senaryosunda kurtardıktan sonra, bu ayın arşivini yapmak için her ay küçük değişiklikler yapmanız gerekir.

ArchiveADataset'in sorduğu sorular size izin verir:

* Orijinal veya Bagit dosya ambalajını belirtin. NCEI için Bagit kullanın.
* zip veya tar.gzPaket için sıkıştırma. NCEI için, tarı kullanın.gz.
* Bu arşiv için bir iletişim e-posta adresini belirtin (Arşivde D\\_ME.txt dosyasında yazılacak.) .
* Konaklamayı paylaşındatasetIDArşiv yapmak istediğiniz veri kümesinden.
* Hangi veri değişkenlerini arşivlemek istediğinizi belirtin (Genellikle hepsi genellikle tüm) .
* Arşiv yapmak istediğiniz veri kümesinin hangi alt setini belirtin. Aynı şekilde alt kümesini bir veri isteği için alt kümesi formatlandırmanız gerekir, bu yüzden tabular veri setleri için ızgara için farklı olacaktır.
    * Kafeded veri setleri için, sol en boyutta bir dizi değer belirtebilirsiniz, genellikle bu bir zaman aralığıdır. ArchiveADataset ayrı bir istek yapacak ve değer aralığında her değer için ayrı bir veri dosyası üretecektir. Kafeded veri setleri genellikle büyük olduğundan, tüm veri kümesinin büyüklüğüne göre küçük bir alt kümesi belirtmek zorundasınız.
Örneğin,\\[ (2015-12-01) : (2015-12-31) \\]\\[\\]\\[\\]\\[\\]
    * Tellar veri setleri için, herhangi bir kısıtlama koleksiyonu belirtebilirsiniz, ancak genellikle bir dizi zaman. Tellar veri setleri genellikle küçük olduğundan, genellikle hiçbir kısıtlamayı belirtmek mümkündür, böylece tüm veri kümesi arşivlenmiştir.
Örneğin, &time&gt;=2015-12-01&time&gt; =&lt;2016-01-01
* Tellar veri setleri için: arşivlenmiş verilerin farklı veri dosyalarına nasıl daha ayrıntılı olduğunu belirleyecek olan 0 veya daha fazla değişkenin bir listesini belirtin. Veri setleri için sahip olan
    [cdm\\_data\\_type](/docs/server-admin/datasets#cdm_data_type)\\ =TimeSeries|Zaman serisiProfile|Trajectory|TrajectoryProfile
Neredeyse her zaman cf\\_role=time Series\\_id sahip değişkenleri belirtmelisiniz (E.g.,stationID) veya cf\\_role=trajectory\\_id özelliği. ArchiveADataset ayrı bir istek yapacaktır ve bu değişkenlerin değerlerinin her kombinasyonu için ayrı bir veri dosyası üretecektir, e.g., her biri için e.g.stationID.
Diğer tüm tabular veri setleri için, muhtemelen bu amaç için herhangi bir değişken belirtmeyeceksiniz.
Uyarı: Veri setinin alt seti ise arşivleme çok büyük (&gt;2GB) Ve bu amaç için uygun bir değişken yoktur, sonra ArchiveADataset bu veri kümesi ile kullanılabilir değildir. Bu nadir olmalıdır.
* Oluşturulan veri dosyaları için dosya formatını belirtin.
Ağlanmış veri setleri için, NCEI için, kullanın.nc.
Prolar datasets için, NCEI için, kullanın[.ncCFMA](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA)Eğer bir seçenek ise; aksi takdirde kullanın.nc.
* Her veri dosyası için ve tüm arşiv paketi için oluşturulmak için dosya sindirme türü: MD5, SHA-1 veya SHA-256. Dosya sindirimi müşteri için bir yol sunar (E.g., NCEI) Veri dosyasının bozuk olup olmadığını test etmek. Geleneksel olarak, bunlarydı[.md5 dosyaları](https://en.wikipedia.org/wiki/MD5)Ama şimdi daha iyi seçenekler var. NCEI için SHA-256 kullanın.

Tüm soruları cevapladıktan sonra, ArchiveADataset olacaktır:

1. Elde edilen veri dosyalarının veri kümesine ve aşamasına bir dizi istek yapın *Büyük Parent Yönetmeny* /ArchiveADataset / *datasetID\\_timestamp* /.
Kafeded veri setleri için, solun her değeri için bir dosya olacaktır. (e.g., zaman) . Dosyanın adı bu değer olacaktır (e.g., zaman değeri) .
Tellar veri setleri için, her değer için bir dosya olacaktır ... değişken değişken (s) . Dosyanın adı bu değer olacaktır. Birden fazla değişken varsa, sol değişken alt yönlendirme isimleri yapmak için kullanılacaktır ve en doğru değişken dosya isimleri yapmak için kullanılacaktır.
Her veri dosyası olmalıdır&lt;2GB (En fazla izin verilen.ncsürüm 3 dosyaları) .
2. Veri dosyasının sindirimi ile ilgili her veri dosyası ile ilgili bir dosya yapın. Örneğin, veri dosyası 46088.ncVe sindirim türü .sha256, sonra sindirim dosyası 46088 adı olacak.nc.sha256.
3. Bu arşiv oluşturmak için belirttiğiniz tüm ayarların listesini içeren arşiv hakkında bilgi sahibi bir D\\_ME.txt dosyası yapın.
4. 3 dosyayı içinde yapın *Büyük Parent Yönetmeny* /ArchiveADataset / :
    
    * A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A.zipveya.tar.gzArşiv dosyası adı verilen arşiv dosyası *datasetID\\_timestamp* .zip  (veya.tar.gz) Tüm sahnelenen veri dosyaları ve dosyaları içeren. Bu dosya sadece disk alanı ile sınırlı olabilir.
    * Örneğin, arşiv dosyası için bir sindirim dosyası, *datasetID\\_timestamp* .zip.sha256.txt
    * "orijin" tür bir arşiv için, adı verilen bir metin dosyası *datasetID\\_timestamp* .zip.listOfFiles.txt (veya.tar.gz) Hangi dosyaların hepsini listeler.zip  (veya.tar.gz) Dosya.
    
Eğer NCEI için arşiv hazırlarsanız, bunlar NCEI’ye gönderilecek dosyalardır, belki de NCEI’ye gönderileceksiniz.[Send2NCEI](https://www.nodc.noaa.gov/s2n/)veya[ATRAC](https://www.ncdc.noaa.gov/atrac/index.html)  (Archive Collections için Gelişmiş İzleme ve Kaynak Aracı) .
5. Tüm sahnelenen dosyaları sil, böylece sadece arşiv dosyası (E.g.,.zip) , (e.g., .sha256.txt) Arşiv, ve (Seçmeli olarak) .listOfFiles.txt dosyaları kalır.

#### ISO 19115 .xml Metadata Files{#iso-19115-xml-metadata-files} 
ArchiveADataset arşiv paketi, veri kümesi için ISO 19115 .xml metadata dosyasını içermez. Bir ISO 19115 dosyasını veri setiniz için NCEI'ye göndermek istiyorsanız, onları ISO 19115 .xml metadata dosyasını gönderebilirsiniz.ERDDAP™Dataset için yaratılan (Ama ama amaNMFSİnsanlar ISO 19115 dosyasını InPort'den veri setleri için almalıERDDAP™Bu dosyaya zaten hizmet etmiyor) .

Sorunlar? Öneriler? ArchiveADataset yeni. Sorunlarınız veya önerileriniz varsa, bakınız[Bölüm almak için ek destek](/docs/intro#support).
     
