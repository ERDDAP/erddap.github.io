---
sidebar_position: 2
---

# Programr's Guide

Bunlar sadece bir programcı ile çalışmak isteyen şeylerdirERDDAP"JavaSınıfların bilmesi gerekir.

###  **Kaynak Kodu**  {#getting-the-source-code} 
   

  - Via Source Code on GitHub
Son halk versiyonları için kaynak kodu ve gelişim versiyonları da mevcuttur[GitHub](https://github.com/ERDDAP). Lütfen okuyun[Wiki Wiki Wiki](https://github.com/ERDDAP/erddap/wiki)Bu proje için. Kaynak kodunu değiştirmek istiyorsanız (Ve muhtemelen standart olarak dahil edilen değişiklikler varERDDAP™dağıtım dağıtım dağıtım dağıtım) Ancak bu önerilen yaklaşımdır.

###  **ERDDAP™bağımlılıklara bağlı**  {#erddap-dependencies} 
ERDDAP™Maven'yı kod yüklemesi, bazı statik referans dosyalarına bağlı olarak da kullanılır (WEB-INF /ref) . Bu, depodaki birçok büyük dosyayı depolamaktan kaçınmak için yapılır.
"mvn der" kullanabilirsiniz ve bu bağımlılıkları ve ref dosyalarını getirecektir. Ayrıca bir savaş dosyası oluşturmak için “mvn paketi” kullanabilirsiniz.
Para dosyalarını manuel olarak indirebilirsiniz:

  - [etopo1\\_ice\\_g\\_i2.zip](https://github.com/ERDDAP/ERDDAPRefFiles/releases/download/1.0.0/etopo1_ice_g_i2.zip)Ve bunu /WEB-INF /ref / .

  - [ref\\_files.zip](https://github.com/ERDDAP/ERDDAPRefFiles/releases/download/1.0.0/ref_files.zip)Ve bunu /WEB-INF /ref / .

  - [HeddapContent.zip](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip)  (1.0.0, 20333 bytes, MD5=2B8D2A5AE5ED73E3A42B529C168C60B5, 2024-10-14) Ve bunu _tomcat_'a dönüştürdüm, yaratmak_tomcat_/content/erddap.

NOT: Varsayılan olarak Maven statik referansları önleyecek ve veri arşiv indirmelerini test edecek ve sadece yeni bir sürüm indirildiğinde onları çıkaracaktır. Tamamen indirmek için, "skipKaynakDownload" ve / veya "skipTestKaynakDownload" özelliklerini Maven'in özelliklerini Maven (e.g. "mvn -DskipKaynakDownload paketi ") . Çıkarmak için, "-Ddownload.unpack = gerçek" ve "-Ddownload.unpack WhenChanged=false'.

- ERDDAP™Ve onun altkomponentleri çok liberal, açık kaynaklar var[Lisanslar](/license)Bu yüzden kaynak kodunu herhangi bir amaç için kullanabilirsiniz, kâr için veya kâr amacı gütmeyen değildir. Not that Not that Note that NotERDDAP™Ve birçok alt sorumlu, kullandığınız kodun kaynağını kabul etmenizi gerektiren lisanslara sahiptir. See See See See[Krediler](/credits). Gerekirse veya olmasın, tüm bu katkıda bulunanları kabul etmek için sadece iyi bir form.
  

-  **Diğer Projeler için Kod Kullanın** 

Eğer parçaları kullanmak için hoş geldiniz ikenERDDAP™Diğer projeler için kod, kodun değişebilir ve değişecektir. Kodumuzun diğer kullanımlarını desteklemeye söz vermiyoruz. Git ve GitHub, bununla başa çıkmak için ana çözümleriniz olacak - Git değişikliklerinizi değişikliklerinize birleştirmenize izin verir.
   **Birçok durumda nerede parçaları kullanmak cazip olabilirERDDAP™Projenizde, yüklemek ve kullanmak için çok daha kolay bulacağınızı düşünüyoruzERDDAP™olduğu gibi,** Ve sonra kullanılan diğer hizmetleri yazınERDDAP“Hizmetler. Kendini kurabilirsinERDDAP™Bir saat veya iki saatte sıkı bir şekilde kurulum. Kendini kurabilirsinERDDAP™Birkaç gün içinde parlatılmış bir şekilde kurulum (Veri kümelerinizin sayısına ve karmaşıklığına bağlı olarak) . Ama parçalarını hackleERDDAP™Kendi projesiniz için önümüzdeki haftalar almak olasıdır (ve aylar incelikleri yakalamak için) Ve sonraki değişiklikler ve hata düzeltmeleri dahil etme yeteneğini kaybedeceksinizERDDAP™Yayınları. Biz Biz Biz (Açıkçası açıkça açıkça açıkça açıkça belli ki) Düşünmek için birçok fayda varERDDAP™SankiERDDAP™Açık olarak erişilebilir kurulum. Ancak, bazı durumlarda, senin yapmak istemeyebilirsinizERDDAP™Açık olarak erişilebilir kurulum. Sonra, hizmetiniz özel erişimine erişebilir ve kullanabilirERDDAP™Ve müşterilerinizin bilmeniz gerekenlerERDDAP™.

  ####  **Halfway** 

Ya da, delving arasında yarısının delving arasında olan yararlı bulabileceğiniz başka bir yaklaşım var.ERDDAP's code and usingERDDAP™Bir stand-alone web hizmeti olarak: EDD sınıfında, bir veri kümesi örneği yapmanıza izin veren bir statik yöntem var (Tanıma dayalı olarakdatasets.xml) :
"One FromDataset X ml (String tDatasetID) 
“Bir EDDTable veya bir örnek döndürür.EDDGriddataset. Bu örneği göz önünde bulundurabilirsiniz,
"NewFileForDapQuery (String userDapQuery, String dir, String fileName, String fileName TypeName) 
“Örneğin belirli bir dosyaType'ın, bir kullanıcı sorgusından gelen sonuçlarla bir veri dosyası yapmasını söyleyin. Böylece, bu kullanmak için basit bir yoldurERDDAP“Veri talep etmek ve yanıt olarak bir dosya almak için yöntemler, tıpkı bir müşteri olarakERDDAP™Web uygulaması. Ama bu yaklaşım sizin içinizde çalışırJavaProgram ve Tomcat gibi bir uygulama sunucusu için ihtiyacı atlar. Bu yaklaşımı EDDTable ve ünite testlerinin birçoğu için kullanıyoruz.EDDGridAlt sınıflar, bu yüzden tüm bu sınıflar için kaynak kodunda örnek görebilirsiniz.

###  **Geliştirme Çevresi**  {#development-environment} 

  - için konfigürasyonlar var[Jetty](https://github.com/ERDDAP/erddap/blob/main/development/jetty)ve[Docker](https://github.com/ERDDAP/erddap/blob/main/development/docker)GitHub'da, ancak sürümler Tomcat'ta koşmak bekleniyor.

  -  **Seçmeli Seçmeli Seçmeli Seçmeli** : Set up upERDDAP™Tomcat'da
O zamandan beriERDDAP™Temel olarak Tomcat'ta çalışan bir servlet olmak amaçlanmıştır, standartı takip etmenizi şiddetle tavsiye ederiz[yükleme talimatları](/docs/server-admin/deploy-install)to install Tomcat, and then installERDDAP™Tomcat'ın webapps directory'te. Diğer şeyler arasında,ERDDAP™Tomcat'ın dizisinde yüklenmek ve Tomcat'ın bazı jar dosyaları sağlamasını bekliyordu.

  - ERDDAP™Belirli bir IDE gerektirmez (Chris öncelikle Visual Studio Code kullanıyor, Bob EditPlus) . Eclipse, Ant, vb. kullanmıyoruz; ne de sunuyoruzERDDAP- onlar için ilgili destek. Proje Maven'i kullanıyor.

  - Tüm .class dosyalarını kaynak ağacında silen bir toplu dosyayı kullanıyoruz, böylece temiz bir derleyicimiz olmasını sağlamak için (javac ile) .

  - Şu anda, Impium'un javac jdk-21.0.3+9'u gov.noaa.pfeg.coastwatch.AllTest. (Aksi halde derlemeyecek birkaç sınıfla bağlantı vardır.) Ve testleri çalıştırın. Güvenlik nedenleri için, neredeyse her zaman en son versiyonlarını kullanmak en iyisidirJava21 ve Tomcat 10.

    - javac veya java çalıştırdığımızda, mevcut dizi _tomcat_/webapps/erddap/WEB-INF .

    - Bizim javac ve java sınıfı sempatimizdir
Sınıflar;././lib/servlet-api.jar;lib/*'

    - Bu nedenle, javac komut satırınız, gibi bir şey olacak
"javac -encoding UTF-8 -cp sınıflar;./lib/servlet-api.jar;lib/* sınıflar/gov/noaa/pfel/coastwatch/TestAll.java'nın

    - Ve java komut hattınız, gibi bir şey olacak
"java -cp sınıfları;./lib/servlet-api.jar;lib/* -Xmx4000M -Xms4000M Sınıflar/gov/noaa/pfel/coastwatch/TestAll
"Okul: "-sözlü:gc" ekleyebilirsiniz, bu da diyor.JavaÇöp toplama istatistikleri yazdırmak.

    - Test ederseniz Tüm derlemeler, her şeyERDDAP™İhtiyaçlar derlenmiştir. Birkaç sınıf, gerekli olmayan bir şekilde derlenirERDDAP™. TestAll başarılı olursa ancak bazı sınıfları derlemez, bu sınıf gerekli değildir. (Bazı tamamlanmamış / kullanılmış sınıflar var.) 

  - Birkaç durumda, .jar dosyaları yerine 3. parti kaynak kodu kullanıyoruz. (Özellikle özellikle içinDODS) Ve onları, problemleri çözmek için biraz değiştirdilerJava21. Sık sık diğer hafif değişiklikler yaptık (Özellikle özellikle de özellikle deDODS) Diğer nedenlerle.

  - Çoğu sınıf ilişkili src/test dosyasında test yöntemleri vardır. JUnit testlerini “mvn testi” komutuyla çalıştırabilirsiniz. Bu, testlerin en son serbest bırakılmasına güvendiği birkaç zip dosyalarını indirecektir.[ERDDAP/erddap Test Testi](https://github.com/ERDDAP/erddapTest/releases/).\\
     
NOT: Maven önbellekleri indirmek ancak her infazda indirilen arşivleri kabul etmeyecek, bu zaman alır. indirmek için indirmek için
ve unzipping test veri arşivleri, "skipTestKaynakDownload" mülkünü Maven (e.g. "mvn -DskipTestKaynakDownload paketi ") .

###   **Önemli Sınıflar**  {#important-classes} 

Kaynak koduna bakmak istiyorsanız ve nasıl anlamaya çalışırsınızERDDAP™çalışır, lütfen yapın.

  - Koda sahipJavaDoc yorumlar, ama theJavaDocs yaratılmadı. Onları üretmek için özgür hissedin.

  - En önemli sınıflar (Aşağıdakiler de aşağıda belirtilenler) gov/noaa/pfel/erddap içinde.

  - The The The The The The The TheERDDAP™Sınıf en yüksek seviye yöntemlerine sahiptir. HtttpServlet genişletir.

  - ERDDAP™Alt sınıfların örneklerine geçilirEDDGridveya EDDTable, bireysel veri setlerini temsil eden.

  - EDStat statik bilgi ve ayarların çoğuna sahiptir (e.g., kurulum.xml ve mesajlardan.xml dosyaları) Ve statik hizmetler sunar (e.g., e-posta gönderme) .

  - EDDGridve EDDTable alt sınıfları isteği parlıyor, alt sınıf özel yöntemlerden veri alın, sonra yanıt için verileri formatlayın.

  - EDDGridAlt sınıflar verileri GridDataAccessor'a itiyor (Ağlanmış veriler için iç veri konteyneri) .

  - EDDTable alt sınıfları verileri MasaYazar alt sınıflarına itiyor, bu da belirli bir dosya türünde veri yazıyor.

  - Diğer sınıflar (e.g., düşük seviyeli sınıflar) Ayrıca önemlidir, ancak onları değiştirmek için çalışacağınız daha az olasıdır.
     

###  **Kod Contributions**  {#code-contributions} 

- GitHub Issues
Eğer katkıda bulunmak istiyorsanız ama bir projeniz yoksa, listesini görün[GitHub Issues](https://github.com/ERDDAP/erddap/issues)Ancak, hangi projelerde yapabileceğiniz birçok proje var. Bir konuda çalışmak istiyorsanız, lütfen bunu üzerinde çalıştığınız başkalarına göstermek için kendiniz tayin edin. GitHub sorunu, bu konuda nasıl çalışacaklarını tartışmak için en iyi yerdir.

- Yapmak istediğiniz değişiklik aşağıdaki ortak durumlardan biridirse, lütfen bir tane oluşturun[GitHub Issue](https://github.com/ERDDAP/erddap/issues)Yapmayı düşündüğünüz değişikliği gösterir. Sonra değişiklik tamamlandıktan sonra, birleşmeyi talep etmek için bir çekme isteği yapın. Ortak değişiklikler şunlardır:

  - Başka bir alt sınıf yazmak istiyorsunuzEDDGridveya EDDTable başka bir veri kaynağı türü işlemek için. Eğer öyleyse, mevcut alt sınıfı bulmanızı ve bu kodu başlangıç noktası olarak kullanmanızı öneririz.

  - Başka bir kurtarmaAs_FileType_ yöntemi yazmak istiyorsunuz. Eğer öyleyse, mevcut kurtarmaAs_FileType_ yöntemi bulmanızı öneririzEDDGridveya EDDTable ve bu kodu başlangıç noktası olarak kullanın.

Bu durumlar, yazdığınız kodun kendi kendine ait olduğu avantajına sahiptir. Tüm ayrıntıları bilmeniz gerekmezERDDAP“İçleri. Ve kodunuzu dahil etmek bizim için kolay olacakERDDAP. Kod gönderirseniz, lisansın uyumlu olması gerekirERDDAP™ [Lisans lisansı](/license)  (E.g.,[Apache Apache](https://www.apache.org/licenses/),[BSD](https://www.opensource.org/licenses/bsd-license.php)Ya da[MIT-X](https://www.opensource.org/licenses/mit-license.php)) . Katkınızı listeleyeceğiz[Kredi kredi kredileri kredi kredileri](/credits).

- Yukarıda kapsamadığınız bir özellik varsa, eklemek istersinizERDDAP, ilk olarak bir tartışma parçası oluşturmak tavsiye edilir[GitHub Tartışmaları](https://github.com/ERDDAP/erddap/discussions/categories/ideas). Önemli özellikler için / Teknik Kurulu bunları tartışacak ve eklemeyi onaylamaya karar verecekERDDAP™.

###  **Kodunuzun Contributions**  {#judging-your-code-contributions} 
Kod veya diğer değişiklikleri dahil etmek istiyorsanız dahil olmak içinERDDAPBu harika. Katkınız kabul edilmek için belirli kriterleri karşılamalıdır. Aşağıdaki yönergeleri takip ederseniz, katkınızın kabul edilme olasılığını büyük ölçüde artırırsınız.
   

  - The The The The The The The TheERDDAP™Proje bir NATD tarafından yönetilir (NOAAYetkili Teknik Müdür) Teknik Kurul'dan giriş ile.
2007 yılından itibaren (En başından itibarenERDDAP) 2022'den bu yana, Bob Simons (Ayrıca Kurucu-Leader) . Ocak 2023'te başlayarak, bu Chris John. Temel olarak, NATD sorumluERDDAPYani s/he’nin kararlarla ilgili son sözü varERDDAP™Kod, özellikle tasarım hakkında ve verilen çekme talebinin kabul edilebilir veya kabul edilmeyecektir. Bu şekilde kısmen verimlilik nedenleri için olması gerekiyor (Linus Torvalds ve Linux için harika çalışıyor) ve kısmen güvenlik nedenleri için: Birisi, kodun güvenliği ve bütünlüğü için sorumluluk alan BT güvenliği halkına anlatmak zorundadır.
     

  - NATD, s/he'nin kodunuzu kabul edeceğini garanti etmez.
Eğer bir proje sadece umduğumuz kadar çalışmazsa ve eğer selamlanamazsa, NATD projesini içermeyecektir.ERDDAP™dağıtım. Lütfen kötü hissetmeyin. Bazen projeler de umut gibi çalışmıyor. Tüm yazılım geliştiricileri için gerçekleşir. Aşağıdaki yönergeleri takip ederseniz, başarı şansınızı büyük ölçüde artırırsınız.
     

  - Değişiklikler genel ilgi ve kullanışlılıksa en iyisidir.
Kod kuruluşunuza özel ise, muhtemelen ayrı bir şube korumak en iyisidirERDDAP™Kullanımınız için. Axiom bunu yapar. Neyse ki, Git bunu yapmak kolaylaşır. NATD, tutarlı bir vizyonu korumak istiyorERDDAPAncak herkesin proje için özel bir özellik getirdiği bir mutfak lavabo projesi olmasına izin vermeyin.
     

  - Takip etJavaKod Konvansiyonları.
Genel olarak, kodunuz iyi kalitede olmalı ve orijinali takip etmelidir[JavaKod Sözleşmeleri](https://www.oracle.com/technetwork/java/codeconventions-150003.pdf): Dizi yapısında uygun yerde sınıf dosyaları koyun, .class dosyaları uygun bir isim verin, uygun bir isim ekleyin.JavaDoc yorumları, kodun her paragrafının başlangıcında //comments içerir, 4 alanla indent (değil sekme) Ancak satırlardan kaçının &gt;80 karakterleri, vs. Konvansiyonlar değişir ve kaynak kodu her zaman güncel değildir. Şüphelendiği zaman, kongrelere maç kodu ve mevcut kodu değil.

- Descriptive sınıfı, yöntem ve değişken isimleri kullanın.
Bu, kodu başkalarına okumak için daha kolay hale getirir.
   

- fantezi kodu kaçının.
Uzun vadede, siz veya diğer insanlar onu korumak için kodu bulmak zorunda kalacaklar. Bu nedenle, başkaları için daha kolay olan basit kodlama yöntemleri kullanın (Gelecekte de dahil olmak üzere) to figure out. Açıkçası, bazı fantezileri kullanmak için gerçek bir avantaj varsaJavaProgramlama özelliği, onu kullanın, ancak ne yaptığını, neden ve nasıl çalıştığını kapsamlı bir şekilde belgeleyin.
   

- Başlamadan önce Teknik Kurulu ile çalışın.
Kod değişikliklerini almayı umuyorsanız,ERDDAP™Teknik Kurul kesinlikle ne yapacağını ve bunu koda herhangi bir değişiklik yapmadan önce nasıl yapacaksınız hakkında konuşmak isteyecektir. Bu şekilde, NATD’nin sonunda kabul etmediği değişiklikleri yapmaktan kaçınabiliriz. Çalışmayı yaptığınızda NATD ve Technical Board, mevcut kodu ve kodu anlamanıza yardımcı olmak için soruları cevaplamaya hazırdır ve (Genel genel genel genel genel genel genel genel genel genel genel genel genel genel genel genel genel genel genel genel genel genel genel) Projenizi nasıl ele almak.
   

- Bağımsız olarak çalışma (Mümkün olduğu kadar) Başlamadan sonra.
Yukarıdaki "Teknik Kurul ile Çalışma" aksine, projeye başladıktan sonra, NATD sizi mümkün olduğunca bağımsız olarak çalışmaya teşvik eder. NATD neredeyse her şeyi anlatmak ve birçok soruya cevap vermek zorundaysa (Özellikle belgeyi okuyarak veya kodu okuyarak cevaplayabileceğiniz kişiler) Daha sonra çabalarınız NATD ve s/he için bir zaman tasarrufu değil, aynı zamanda onları kendiniz de yapabilir. Bu[Mitical Man Ay](https://en.wikipedia.org/wiki/The_Mythical_Man-Month)Sorun. Elbette hala iletişim kurmalıyız. Projenin yolda olduğundan emin olmak için işinizi periyodik olarak görmek harika olacaktır. Ama daha fazlası bağımsız olarak çalışabilirsiniz (Teknik Kurul, görevde el ve genel yaklaşımla aynı fikirdedir.) Daha iyi.
   

- Böceklerden kaçının.
Bir boğa bir salıverilmeden önce yakalanmazsa, kullanıcılar için sorunlara neden olur (En iyisi) , yanlış bilgileri döndürür (En kötüsü) , bir blotERDDAP“Şeref, ve devam edecekERDDAP™Yıllarca kurulumlar. Böceklerden kaçınmak için çok zor çalışın. Bunun bir kısmı temiz kod yazmaktadır (Bu yüzden sorunları görmek daha kolaydır) . Bunun bir kısmı birim testleri yazıyor. Bunun bir kısmı, kod yazarken sürekli bir hata tavrıdır. NATD pişmanlığını kodunuzu eklemek için yapmayınERDDAP™.
   

- Bir birim testi veya testleri yazın.
Yeni kod için, bir test dosyasında JUnit testleri yazmalısınız.
Lütfen yazdığınız kodu tam olarak test eden ve sınıf JUnit test dosyasına eklediğiniz en az bir bireysel test yöntemi yazın, böylece otomatik olarak çalıştırın. Unit Unit Unit Unit Unit (ve ilgili) Testler, başlangıçta ve uzun vadede böcekleri yakalamak için en iyi yollardan biridir. (Diğer şeyler olarak değişirERDDAP™) . Bob’un dediği gibi, “Unit testleri gece uyuma izin veren şeydir.”
   

- NATD'nin çekme isteğinizdeki değişiklikleri anlaması ve kabul etmesi kolaylaşır.
Bunun bir kısmı bir birim test yöntemi yazmaktır (s) . Bunun bir kısmı, değişikliklerinizi bir kod bölümüne sınırlamaktır (veya bir sınıf) Mümkünse. NATD, kod boyunca yüzlerce değişiklikle herhangi bir çekme talebini kabul etmeyecektir. NATD, BT güvenliğini insanlara kodun güvenliği ve bütünlüğü için sorumluluk aldığını söylüyor. Çok fazla değişiklik varsa ya da anlamak çok zorsa, o zaman değişiklikleri doğrulamak için çok zor ve böcekleri veya güvenlik sorunlarını tanıtmıyor.
   

- Basit tutun.
Kodunuz için iyi bir genel tema: Basit tutun. Basit kod başkaları için kolaydır (Gelecekte de dahil olmak üzere) Okumak ve korumak için. NATD'nin anlaması ve kabul edilmesi kolaydır.
   

- Kodunuz için uzun vadeli sorumluluk olarak.
Uzun vadede, kodunuzu korumak ve bununla ilgili soruları cevaplamak için devam eden sorumluluğu varsayarsanız en iyisidir. (E.g., içindeERDDAP™Google Group) . Bazı yazarların notu olarak, kod bir varlık olarak da sorumluluktur. Eğer bir boğa gelecekte keşfedildiyse, bunu düzeltseniz en iyisi çünkü kimse kodunuzu sizden daha iyi bilmiyor (Ayrıca, ilk etapta böceklerden kaçınmak için bir teşvik vardır.) . NATD, devam eden bakım sağlamak için bir firma taahhüdü sormayın. NATD sadece bakım yapmanın büyük takdir olacağını söylüyor.
