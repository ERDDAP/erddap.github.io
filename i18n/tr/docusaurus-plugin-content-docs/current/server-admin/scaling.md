---
title: "Scaling"
---
# Scaling
## ERDDAP™- Ağır Yükler, Grids, Clusters, Federasyonlar ve Cloud Computing{#erddap---heavy-loads-grids-clusters-federations-and-cloud-computing} 
 

# ERDDAP:

[ERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/index.html)Farklı yerel ve uzaktan kaynaklardan gelen bilimsel verileri toplayan bir web uygulaması ve verilerin alt setlerini ortak dosya formatlarında indirmenin basit, tutarlı bir yolu sunar ve grafikler ve haritalar oluşturun. Bu web sayfası ağırla ilgili sorunları tartışırERDDAP™Kullanım Yükleri ve ızgaralar, kümeler, federasyonlar ve bulut bilişim yoluyla son derece ağır yüklerle uğraşmak için olanaklar keşfedin.

Orijinal versiyon Haziran 2009'da yazılmıştır. Önemli değişiklikler yoktu. Bu son güncellenmiş 2019-04-15 idi.

## DISCLAIMER{#disclaimer} 

Bu web sayfasının içeriği Bob Simons kişisel görüşleridir ve mutlaka Hükümetin veya Hükümetin herhangi bir konumunu yansıtmaz.National Oceanic and Atmospheric Administration. Hesaplamalar basittir, ancak sonuçların doğru olduğunu düşünüyorum. Hatalı mantığı mı kullandım yoksa hesaplamalarımda bir hata mı yaptım? Eğer öyleyse, hata benim tek başına. Lütfen düzeltme ile bir e-posta gönderinerd dot data at noaa dot gov.
 

- - - -

## Heavy Loads / Constraints{#heavy-loads--constraints} 

Ağır kullanımla, bir standaloneERDDAP™Kısıtılacak (En azından muhtemelen) Tarafından:

### Uzak Kaynak Band genişliği{#remote-source-bandwidth} 
1. Uzak bir veri kaynağının bant genişliği – verimli bir bağlantı ile bile (E.g., via viaOPeNDAP) Uzak bir veri kaynağı çok yüksek bir bant internet bağlantısına sahip olmadıkça,ERDDAP“Sorular ne kadar hızlı bir şekilde kısıtlanacaktırERDDAP™Veri kaynağından veri alabilir. Bir çözüm, veri kümesini kopyalamakERDDAP“Zengin sürücü, belki de[EDDGridKopya kopya](/docs/server-admin/datasets#eddgridcopy)veya[EDDTableCopy](/docs/server-admin/datasets#eddtablecopy).
     
### ERDDAP's Server Band genişlik{#erddaps-server-bandwidth} 
2. Aksi takdirdeERDDAP's server'ın çok yüksek bantlı internet bağlantısı var,ERDDAP“Sorular ne kadar hızlı bir şekilde kısıtlanacaktırERDDAP™Veri kaynaklarından veri alabilir ve ne kadar hızlıERDDAP™Veriler müşterilere geri dönebilir. Tek çözüm daha hızlı bir internet bağlantısı elde etmektir.
     
### Hafıza{#memory} 
3. Birçok eşzamanlı istek varsa,ERDDAP™hafızadan çıkabilir ve geçici olarak yeni talepleri reddedebilir. (ERDDAP™Bunu önlemek ve olursa sonuçları en aza indirmek için birkaç mekanizma var.) Bu yüzden sunucudaki daha fazla bellek daha iyi. 32-bit sunucuda, 4+ GB gerçekten iyi, 2 GB tamam, daha az tavsiye edilmez. 64-bit sunucusunda, bir sürü hafıza alarak sorunu neredeyse tamamen kaçınabilirsiniz. Bakın,[\\-Xmx ve -Xms ayarları](/docs/server-admin/deploy-install)ÇünküERDDAP/ Tomcat. An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An AnERDDAP™64-bit sunucu ile bir bilgisayarda 8GB bellek ve -Xmx set to 4000M nadiren, eğer her zaman, hafıza tarafından kısıtlanırsa.
     
### Drive Band genişlik{#had-drive-bandwidth} 
4. Sunucunun zor sürücüsünde depolanan verilere erişmek uzaktan verilere erişmekten çok daha hızlıdır. Öyle olsa bile, eğerERDDAP™server'ın çok yüksek bant genişliği internet bağlantısı var, zor sürücüdeki verilere erişmenin bir şişenck olması mümkündür. Kısmi bir çözüm daha hızlı kullanmak (e.g., 10.000 RPM) Manyetik sert sürücüler veya SSD sürücüleri (Eğer bu mantıklı maliyet-bildirir) . Başka bir çözüm, farklı sürücülerde farklı veri setlerini depolamak, bu yüzden toplu sert sürücü bant genişliği çok daha yüksek.
     
### Too Many Files Cached{#too-many-files-cached} 
5. Çok fazla dosya[Önbelli önbelli önbelli önbelli önbelli önbelli önbelli önbelli önbelli önbelli önbelli](/docs/server-admin/additional-information#cached-responses)rehberi –ERDDAP™Tüm görüntüleri önbellekler, ancak yalnızca belirli veri talepleri için verileri önbellekler. Bir veri kümesi için önbellek dizinin geçici olarak çok sayıda dosya olması mümkündür. Bu, bir dosya önbellekte olup olmadığını görmek için yavaşlayacaktır. (Gerçekten&#33;) .&lt;Önbelli önbelli önbelli önbelli önbelli önbelli önbelli önbelli önbelli önbelli önbelli Dakikalar&gt; içinde[Kurulum.xml](/docs/server-admin/deploy-install#setupxml)Bir dosyanın silinmeden önce önbellekte ne kadar uzun olabileceğini ayarlamanıza izin verin. Daha küçük bir sayı kurmak bu sorunu en aza indirecektir.
     
### CPU CPU CPU{#cpu} 
6. Sadece iki şey çok fazla CPU zamanı alır:
    *   NetCDF4 ve 4HDF5 Şimdi verilerin iç sıkıştırmasını destekliyor. Büyük sıkıştırılmış bir baskıNetCDF4 / 4HDF5 veri dosyası 10 veya daha fazla saniye sürebilir. (Bu bir uygulama hatası değil. Bu, sıkıştırmanın doğasıdır.) Bu nedenle, sıkıştırılmış dosyalarda depolanan verilerle birden eş zamanlı istekler herhangi bir sunucuda ciddi bir gerginlik yaratabilir. Eğer bu bir problemse, çözüm, sıkıştırılmamış dosyalarda popüler veri setlerini depolamak veya daha çekirdekli bir CPU ile bir sunucu almaktır.
    * Grafikler yapmak (Ayrıca haritalar da dahil) : kabaca 0.2 - grafik başına 1 saniye. Yani grafikler için birçok eşzamanlı olarak benzersiz istek varsa (WMSMüşteriler genellikle 6 eşzamanlı istek yapar&#33;) Ancak CPU sınırlaması olabilir. Birden fazla kullanıcı çalışırkenWMSMüşteriler, bu bir problem haline gelir.
         

- - - -

## Çoklu IdenticalERDDAPYük Balancing ile mi?{#multiple-identical-erddaps-with-load-balancing} 

Soru sık sık ortaya çıkıyor: “ ağır yüklerle uğraşmak, birden fazla aynı şekilde ayarlanabilirim.ERDDAPYük dengelemesi ile mi? ” İlginç bir soru çünkü hızlı bir şekilde özüne alırERDDAP's design. Hızlı cevap "hayır". Bunun hayal kırıklığılı bir cevap olduğunu biliyorum, ancak birkaç doğrudan sebep var ve bazı daha büyük temel sebepler tasarladım nedenERDDAP™Farklı bir yaklaşım kullanmak (Bir federasyonERDDAPs, bu belgenin dökmesinde tarif edilen) İnandığım şey daha iyi bir çözüm.

Bazı doğrudan nedenler neden yapamıyorsunuz / birden fazla aynı şekilde ayarlayamıyorsunuzERDDAPs are:

* A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A given A givenERDDAP™Dosyadaki verilerin aralıklarını bulmak için ilk olarak mevcut olduğunda her veri dosyasını okur. O zaman bir indeks dosyasında bu bilgiyi depolar. Daha sonra, bir kullanıcı verileri talep geldiğinde,ERDDAP™İstenen verilere bakmak için hangi dosyaları bulmak için bu indeksi kullanın. Birden çok aynı olsaydıERDDAPs, her biri bu indeksleme yapacaklardı, ki bu boşa harcanıyor. Aşağıdaki tarif edilen besleyici sistemle, indeksleme sadece bir kez yapılır, biri tarafındanERDDAPs.
* Bazı kullanıcı istekleri için (E.g., çünkü.nc, .txt, .pdf dosyaları)  ERDDAP™Yanıt gönderilmeden önce tüm dosyayı yapmak zorunda. Bu yüzdenERDDAP™Bu dosyaları kısa bir süre için önbellekler. Aynı bir istek gelirse, (Çoğu zaman olduğu gibi, özellikle URL'nin bir web sayfasında yer aldığı görüntüler için) ,ERDDAP™Bu önbellek dosyasını yeniden kullanabilir. Birden çok aynı sistemdeERDDAPs, bu önbellek dosyaları paylaşılmıyor, bu yüzden her biri paylaşılmıyor.ERDDAP™gereksiz ve boşanmış bir şekilde yeniden yaratacaktır.nc, .txt veya .pdf dosyaları. Aşağıda açıklanan besleyici sistemle, dosyalar sadece bir kez yapılır, biri tarafındanERDDAPs, ve tekrarladı.
*   ERDDAP'In abonelik sistemi birden çok tarafından paylaşılacak şekilde ayarlanmamıştırERDDAPs. Örneğin, yük bakiyesi bir kullanıcıyı bir kişiye gönderirseERDDAP™Ve kullanıcı bir veri kümesine abone olur, sonra diğerERDDAPs bu abonelikten haberdar olmayacak. Daha sonra, yük bakiyesi kullanıcıyı farklı bir şekilde gönderirseERDDAP™Ve onun / aboneliklerinin bir listesini isteyin, diğeriERDDAP™Söyleyecek hiçbir şey yok (Onu / diğer ERED'de tekrarlanan bir abonelik yapmak içinDAP) . Aşağıda açıklanan besleyici sistemle, abonelik sistemi sadece ana, halk, kompozitERDDAP.

Evet, bu sorunların her biri için, yapabilirdim (Büyük çaba ile) Mühendis bir çözüm (Bilgiyi paylaşmak içinERDDAPs) Ama sanırım[federasyon-of-ERDDAPs yaklaşım](#grids-clusters-and-federations)  (Bu belgenin dökmesinde tarif edilen) Çok daha iyi bir genel çözüm, kısmen diğer sorunlarla birden-identical-ERDDAPs-a-load-balancer yaklaşımı, özellikle dünyadaki veri kaynaklarının merkezi olmayan doğasını ele almaya bile başlamaz.

Tasarımdığım basit gerçeği kabul etmek en iyisidirERDDAP™Birden çok aynı şekilde konuşlandırılmakERDDAPBir yük dengesi ile. Bilinçli olarak tasarlanmıştırERDDAP™Bir federasyon içinde iyi çalışmakERDDAPİnandığım birçok avantaja sahip. Ne yazık ki, bir federasyonERDDAPs, gerçek dünyada sahip olduğumuz veri merkezlerinin merkezi olmayan, dağıtılmış sistemi ile mükemmel bir şekilde uyumludur. (Farklı IOOS bölgeleri veya farklı CoastWatch bölgeleri veya NCEI'nin farklı bölgeleri veya 100 diğer veri merkezi hakkında düşünün.NOAAYa da farklı NASA DAACs veya dünya çapında 1000 veri merkezi) . Dünyanın tüm veri merkezlerinin, çabalarını terk etmeleri ve tüm verilerini merkezileştirilmiş bir "data gölü"ne koymaları gerektiğini söylemek yerine. (Mümkün olsa bile, sayısız nedenden dolayı korkunç bir fikir - çeşitli analizlerin sayısız avantajlarını gösteriyor[merkezi olmayan sistemler](https://en.wikipedia.org/wiki/Decentralised_system)) ,ERDDAP“ Tasarım, olduğu gibi dünya ile çalışır. Veriler üreten her veri merkezi, korumak, tedavi etmeye ve verilerine hizmet etmeye devam edebilir (Onlar olduğu gibi) Ama yine de,ERDDAP™Ancak veriler aynı zamanda merkezileştirilmiş bir merkezden anında kullanılabilir olabilirERDDAPAncak verileri merkeziize etmek için gerek kalmadanERDDAP™veya verilerin tekrar kopyalarını depolamak. Aslında, verilen bir veri kümesi aynı anda kullanılabilir olabilir
BirindenERDDAP™Üreten ve aslında üretilen organizasyonda verileri depolar (E.g., GoMOOS) ,
BirindenERDDAP™ebeveyn organizasyonunda (E.g., IOOS merkezi) ,
Her şeydenNOAA ERDDAP™,
Tüm ABD destekli bir hükümettenERDDAP™,
Küresel bir dünyadanERDDAP™  (GOOS) ,
ve özel olarakERDDAPs (E.g., anERDDAP™HAB araştırmalarına adanmış bir kurumda) ,
Tüm aslında anında ve verimli çünkü sadece metadata transfer edilirERDDAPs, veriler değil. En iyisi, başlangıçtan sonraERDDAP™Yaratılan organizasyonda, diğer tüm diğerERDDAPs hızla ayarlanabilir (Birkaç saat çalışması) En az kaynaklarla (Veri depolama için herhangi bir RAIDs'e ihtiyaç duymuyor çünkü yerel olarak veri depolamıyor) Ve böylece gerçekten en az maliyet. Bu, bir veri gölü ile merkezileştirilmiş bir veri merkezi kurma ve merkezileştirilmiş bir veri merkezi kurma maliyeti ve gerçekten büyük, gerçekten pahalı, internet bağlantısı, artı merkezileştirilmiş veri merkezinin tek bir başarısızlık noktası olma sorunu. Bana,ERDDAPOrtamsız, besleyici yaklaşım çok daha üstün.

Belirli bir veri merkezinin birden çok ihtiyacı olduğu durumlarda birden fazla veri merkezine ihtiyaç vardırERDDAPYüksek talep karşılamak için,ERDDAP“ Tasarım, birden çok-identical-in performansını tamamen eşleştirmeye veya aşmaya muktedirdir.ERDDAPs-with-a-load-balancer yaklaşımı. Her zaman ayarlanma seçeneğine sahipsiniz[Birden çok bileşikERDDAPs (Aşağıda tartışıldığı gibi) ](#multiple-composite-erddaps)Her biri tüm verilerini diğerlerinden alırERDDAPs, dengeleme olmadan. Bu durumda, her bir kompozite vermenin bir noktası yapmanızı öneririm.ERDDAPFarklı bir isim / kimlik ve onları dünyanın farklı bölgelerinde ayarlarsanız (e.g., farklı AWS bölgeleri) E.g.,ERD\\_US\\_ East,ERD\\_US\\_West,ERD\\_IE,ERD\\_FR,ERD\\_IT, böylece kullanıcılar bilinçli olarak, defalarca, belirli bir şeyle çalışırERDDAPBununla birlikte, riski tek bir başarısızlık noktasından kaldırdığınız ek fayda ile.
 

- - - -

## [ **Grids, Clusters ve Federasyonlar** ](#grids-clusters-and-federations) {#grids-clusters-and-federations} 

Çok ağır kullanım altında, tek bir standaloneERDDAP™Bir veya daha fazla koşacak[kısıtlamalar](#heavy-loads--constraints)Yukarıda listelenen ve hatta önerilen çözümler yetersiz olacaktır. Böyle durumlarda,ERDDAP™ölçeklenebilir ızgaralar inşa etmek kolay hale getiren özellikler vardır (Ayrıca kümeler veya federasyonlar olarak da adlandırılır) Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of OfERDDAPSistemin çok ağır kullanımı yönetmesine izin verenler (e.g., büyük bir veri merkezi için) .

Ben kullanıyorum[ağ ağı](https://en.wikipedia.org/wiki/Grid_computing)Genel bir terim olarak bir tür belirtmek için[bilgisayar kümesi](https://en.wikipedia.org/wiki/Computer_cluster)Tüm parçaların bir tesiste fiziksel olarak yer olmayabilir veya merkezi olarak yönetilmeyebilir. Eş konumlanmış, merkezi olarak sahip olunan ve uygulanan ızgaraların bir avantajı (Setler) ölçek ekonomilerinden faydalandıkları içindir. (Özellikle insan iş yükü) Sistemin parçalarını birlikte iyi hale getirmek ve basitleştirmek. non-ko-located gridlerin bir avantajı, merkezi olmayan olmayan ve uygulanan bir avantaj (Federasyonlar) İnsan iş yükünü ve maliyeti dağıttıkları ve bazı ek hata toleransı sağlayabilirler. Aşağıda önerdiğim çözüm tüm ağ, küme ve federasyon topografları için iyi çalışır.

Bir ölçeklenebilir bir sistem tasarlamanın temel fikri, potansiyel şişeleri tanımlamak ve sonra sistemi tasarlamaktır, böylece sistemin parçaları şişeleri hafifletmeye ihtiyaç duyulabilir. İdeal olarak, her çoğaltmalı kısım sistemin bu kısmının kapasitesini lineer olarak artırır. (ölçeklendirme verimliliği) . Sistem, her şişenck için ölçeklenebilir bir çözüm olmadığı sürece ölçeklenebilir değildir.[Scalability](https://en.wikipedia.org/wiki/Scalability)Verimlilikten farklıdır (Bir görev ne kadar çabuk yapılabilir - parçaların verimliliğini) . Scalability, sistemin herhangi bir talep seviyesini idare etmesini sağlar. **Verimlilik Verimliliği**   (ölçeklendirme ve parçaların) Birçok sunucunun, vs.'nin belirli bir talep seviyesine ulaşmak için nasıl gerekli olacağını belirler. Verimlilik çok önemlidir, ancak her zaman sınırları vardır. Scalability, idare edebilecek bir sistemi inşa etmek için tek pratik çözümdür. **çok çok çok çok çok çok çok çok çok** Ağır kullanım. İdeal olarak, sistem ölçeklenebilir ve verimli olacaktır.

### Hedef Hedef Hedef Hedef Hedef Hedef Hedef Hedef Hedef Hedef Hedef Hedef Hedef Hedef Hedef Hedef Hedef Hedef Hedef{#goals} 
Bu tasarımın hedefleri şunlardır:

* Bir ölçeklenebilir bir mimarlık yapmak (Herhangi bir bölümünü kopyalayarak kolayca silinemez olan bir kişi, aşırı yükleniyor) . Mevcut bilişim kaynaklarına verilen verilerin erişilebilirliğini ve bağlantılarını en üstlenen verimli bir sistem yapmak. (Maliyet neredeyse her zaman bir konudur.) 
* Sistemin bölümlerinin yeteneklerini dengelemek için, bu yüzden sistemin bir parçası başka bir parça abartmayacak.
* Basit bir mimari yapmak için, sistem kurmak ve yönetmek kolaydır.
* Tüm ızgara topograflarla iyi çalışan bir mimarlık yapmak.
* Herhangi bir bölümün aşırı yüklendiği bir sistem yapmak. (Büyük bir veri setlerini kopyalamak için gereken zaman, sistemin belirli bir veri kümesi için talepte aniden artışlarla başa çıkma yeteneğini her zaman sınırlayacaktır.) 
*    (Mümkünse) Herhangi bir özelliğe bağlı olmayan bir mimari yapmak[bulut bilişim](#cloud-computing)hizmet veya diğer dış hizmetler (Çünkü onlara ihtiyaç yok) .

### Tavsiyeler{#recommendations} 
Önerilerimiz bizim
![grid/cluster diagram](/img/cluster.png)

* Temel olarak, bir Kompozit ayarlamayı öneririmERDDAP™  ( **D D D** diyagramda) Ama bu normal bir şeydirERDDAP™Bunun dışında sadece diğerlerinden veri servis ederERDDAPs. Kafein mimarisi, mümkün olduğunca çok iş değiştirmek için tasarlanmıştır (CPU kullanımı, hafıza kullanımı, bant genişliği kullanımı) KompozittenERDDAP™DiğerineERDDAPs.
*   ERDDAP™İki özel veri kümesi tipi vardır,[EDDGridFromErddap](/docs/server-admin/datasets#eddfromerddap)ve[EDDTable FromErddap](/docs/server-admin/datasets#eddfromerddap)Ama bu, işaret eder
Diğer veri setleriERDDAPs.
* Şeker ne zamanERDDAP™Bu veri kümelerinden gelen veriler veya görüntüler için bir istek alın, kompozitERDDAP™ [yönlendirmeler](https://en.wikipedia.org/wiki/URL_redirection)Veri isteği diğerineERDDAP™sunucu. Sonuç:
    * Bu çok verimli (CPU, hafıza ve bant) Çünkü aksi takdirde
        1. KompozitERDDAP™Veri talebini diğerine göndermek zorundaERDDAP.
        2. DiğeriERDDAP™Veriler elde etmek, reform yapmak ve verileri kompozitiğe iletmek zorundadır.ERDDAP.
        3. KompozitERDDAP™Verileri almak zorunda (Ekstra bant genişliği kullanımı) Ama reform onu (Ekstra CPU zamanı ve hafıza) , ve verileri kullanıcıya iletir (Ekstra bant genişliği kullanımı) . Veri talebini yönlendirerek ve diğerine izin vererekERDDAP™Yanıtı doğrudan kullanıcıya göndermek için, kompozitERDDAP™Temel olarak CPU zamanı, bellek veya veri talepleri üzerinde bant genişliği harcamaz.
    * Yönlendirme, istemci yazılımlarından bağımsız olarak kullanıcıya şeffafdır. (Bir tarayıcı veya başka herhangi bir yazılım veya komut satırı aracı) .

### Grid Parçalar{#grid-parts} 
[Kafein parçaları şunlardır:](#grid-parts)

 **A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A** : Yüksek bant genişliğine sahip olan her uzaktan veri kaynağı içinOPeNDAPsunucu, doğrudan uzaktan sunucuya bağlanabilirsiniz. Uzak sunucu bir sunucu iseERDDAP™, kullanımıEDDGridErddap veya EDDTable FromERDDAPData in the CompositeERDDAP. Uzak sunucu başka bir tür iseDAPsunucu, e.g., THREDDS,Hyrax, veya GrADS, kullanınEDDGridFromDap.

 **B** : Her şey içinERDDAP-able data source (Bir veri kaynağı hangisindenERDDAPVerileri okuyabilebilir) Bu yüksek bant genişliği sunucusu var, başka bir tane daha kurduERDDAP™Verilere bu veri kaynağından hizmet etmekten sorumlu olan ızgarada.

* Eğer birkaç tane böyleyseERDDAPVeriler için birçok istek almıyor, onları bir kişiye birleştirebilirsinizERDDAP.
* EğerERDDAP™Bir uzaktan kaynaktan veri almak için adanmış çok fazla istek alıyor, ek eklemek için bir uyarı var.ERDDAPUzak veri kaynağına erişmek için. Özel durumlarda, bu mantıklı olabilir, ancak bunun uzaktan veri kaynağı kaynağı kaynağının sona ereceği daha olasıdır. (Bu, kendi kendine has bir şeydir) Ayrıca diğer kullanıcıların uzaktan veri kaynağına erişmesini de engeller (Hangi güzel değil) . Böyle bir durumda, başka bir şey kurmayı düşününERDDAP™Bu bir veri kümesine hizmet etmek ve verileri kopyalayınERDDAP“Zorlu araba (see see see see see see **C C C C** ) Belki de onunla birlikte[EDDGridKopya kopya](/docs/server-admin/datasets#eddgridcopy)ve/veya[EDDTableCopy](/docs/server-admin/datasets#eddtablecopy).
*    **B** sunucular halka açık olarak erişilebilir olmalıdır.

 **C C C C** : Her şey içinERDDAP- düşük bant genişliği bir sunucuya sahip olan veri kaynağı (Ya da diğer nedenlerle yavaş bir hizmettir) , başka bir şey kurmayı düşününERDDAP™Ve bu konuda veri kümesinin bir kopyasını depolayın veERDDAP“Zengin sürücüler, belki de[EDDGridKopya kopya](/docs/server-admin/datasets#eddgridcopy)ve/veya[EDDTableCopy](/docs/server-admin/datasets#eddtablecopy). Eğer birkaç tane böyleyseERDDAPVeriler için birçok istek almıyor, onları bir kişiye birleştirebilirsinizERDDAP.
 **C C C C** sunucular halka açık olarak erişilebilir olmalıdır.

#### Kompozit Kompozit KompozitERDDAP {#composite-erddap} 
 **D D D** : KompozitERDDAP™normaldirERDDAP™Bunun dışında sadece diğerlerinden veri servis ederERDDAPs.

* Çünkü kompozitERDDAP™Tüm veri kümeleri hakkında hafızada bilgi vardır, veri setlerinin listeleri için isteklere hızlıca cevap verebilir. (Tam metin aramaları, kategori aramaları, tüm veri kümelerinin listesi) , ve bireysel bir veri kümesinin Data Access Formu için talepler, bir Graph formu veya veyaWMSBilgi sayfası. Bunlar, hafızada tutulan bilgilere dayanan tüm küçük, dinamik olarak üretilen HTML sayfalarıdır. Bu yüzden cevaplar çok hızlı.
* Çünkü gerçek veriler için talepler hızla diğerine yönlendirilirERDDAPs, kompozitlerERDDAP™Herhangi bir CPU zamanı, hafıza veya bant kullanmadan gerçek veriler için taleplere hızlıca cevap verebilir.
* Mümkün olduğunca çok iş değiştirmek (CPU, bellek, bant genişliği) KompozittenERDDAP™DiğerineERDDAPs, kompozitlerERDDAP™Tüm veri kümelerinden gelen verilere hizmet edebilir ve hala çok sayıda kullanıcıdan gelen çok sayıda veri isteğiyle devam edebilir.
* Preliminary testleri, bileşiklerin gösteriyorERDDAP™CPU zamanında veya 1000 istek / saniyedeki çoğu isteke cevap verebilir. Bu yüzden 8 temel işlemci yaklaşık 8000 istek / saniyeye cevap verebilir. Yavaşlamalara neden olacak daha yüksek aktivite patlamalarını tahmin etmek mümkün olsa da, bu çok fazla bağlantı. Muhtemelen veri merkezi bant genişliği kompozitten uzun süre önce şişenck olacaktır.ERDDAP™Şişenck olur.
##### Up-to-date max (Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman Zaman) ??{#up-to-date-maxtime} 
The The The The The The The TheEDDGrid/Table FromErddap in the kompozitERDDAP™Kaynak veri kümesi olduğunda depolanan her kaynak veri kümesi hakkında sadece bilgilerini değiştirir.["reload"ed](/docs/server-admin/datasets#reloadeverynminutes)Ve bazı metadata değişiklikleri (e.g., zaman değişkeniactual\\_range) Böylece bir abonelik bildirimini oluşturun. Kaynak veri kümesi, değişiklikleri sık sık etkileyen veriler varsa (Örneğin, her saniye yeni veriler) ve kullanır["update"](/docs/server-admin/datasets#updateeverynmillis)Orta verilere sık sık değişiklikleri fark etmek için sistem, temel verilere,EDDGrid/Table FromErddap, bir sonraki veri setine "reload" olana kadar bu sık değişiklikler hakkında bilgilendirilmeyecek, bu yüzdenEDDGrid/Table FromErddap mükemmel bir şekilde güncel olmayacak. Bu sorunu kaynak veri kümesinin değiştirerek en aza edebilirsiniz&lt;HerNMinutes&gt; daha küçük bir değer için (60? 15?) Bu yüzden anlatmak için daha fazla abonelik bildirimleri varEDDGrid/Table FromErddap to update its information about the source dataset.

Ya da, veri yönetimi sisteminiz kaynak veri kümesinin yeni veri kümesinin ne zaman olduğunu biliyorsa (e.g., bir veri dosyasını yere kopyalayan bir senaryo aracılığıyla) Ve eğer bu süper sıkılmıyorsa (e.g., her 5 dakika veya daha az sık) Daha iyi bir çözüm var:

1. Don't use&lt;HerNMillis&gt güncelleme; kaynağı güncel tutmak.
2. Kaynağı dataset'in setlerini ayarlayın&lt;Reload EveryNMinutes&gt; daha büyük bir sayı için (1440?) .
3. Senaryo kaynağı veri kümesinin temasına geçti[Bayrak URL](/docs/server-admin/additional-information#set-dataset-flag)Hemen sonra yeni bir veri dosyasını yere kopyalar.
Bu, kaynak veri kümesine mükemmel bir şekilde devam edecek ve bir abonelik bildirim üretmesine neden olacaktır, bu da gönderilecek.EDDGrid/Table FromErddap dataset. Bu, liderlik edecekEDDGrid/Table FromErddap dataset to be perfect up-to-date (İyi, yeni verilerin 5 saniye içinde ekleniyor) . Ve tüm bunlar verimli bir şekilde yapılır (gereksiz veri kümesi reloads olmadan) .

#### Birden çok Kompozit Kompozit KompozitERDDAPs{#multiple-composite-erddaps} 
* Çok aşırı durumlarda, ya da hata toleransı için, bir kompozitörden fazla kurmak isteyebilirsinizERDDAP. Muhtemelen sistemin diğer bölümlerinin (Özellikle, veri merkezinin bant genişliği) Kompozitten uzun bir süre önce bir sorun olacakERDDAP™Bir şişenck olur. Dolayısıyla çözüm muhtemelen ek, coğrafi olarak çeşitli, veri merkezleri kurmaktır. (Aynalar) Her biri bir bileşikleERDDAP™ve sunucularERDDAPs ve (En azından) Yüksek talepte bulunan veri kümelerinin ayna kopyaları. Bu tür bir kurulum da hata toleransı ve veri yedekleme sağlar (Kopyalama yoluyla) . Bu durumda, eğer kompozit olursa en iyisidirERDDAPs have different URLs.
    
Gerçekten tüm kompozitleri istiyorsanızERDDAPAynı URL'ye sahip olmak için, verilen bir kullanıcıyı sadece kompozitlerden birine atan bir ön son sistemi kullanın.ERDDAPs (IP adresine dayanarak) Ancak kullanıcının tüm istekleri sadece kompozitlerden birine gidiyor.ERDDAPs. İki neden var:
    
    * Temel bir veri kümesi yeniden yüklendiği zaman ve metadata değişiklikleri (e.g., bir şebekeli veri kümesindeki yeni bir veri dosyası zaman değişkeninin nedenlerine neden olur.actual\\_rangedeğiştirmek için değiştirmek) , kompozitERDDAPs geçici olarak biraz senkronize edilecek, ancak ile[Kalıcı tutarlılık](https://en.wikipedia.org/wiki/Eventual_consistency). Normalde, 5 saniye içinde tekrar gelecekler, ancak bazen daha uzun olacaktır. Bir kullanıcı, güvenen otomatik bir sistem yaparsa[ERDDAP™Abonelik abonelikleri](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions/index.html)Bu tetikleyici eylemler, kısa senkronizasyon sorunları önemli olacaktır.
    * 2+ kompozitERDDAPHer biri kendi abonelik setlerini koruyor (Yukarıda açıklanan senkronizasyon problemi nedeniyle) .
    
Bu yüzden verilen bir kullanıcı sadece kompozitlerden birine yönlendirilmelidir.ERDDAPBu sorunları önlemek için. Eğer kompozitlerden biri varsaERDDAPs gider, ön son sistem bunu yönlendirebilirERDDAP“Kullanıcılar başka bir şeyeERDDAP™Bu yukarı. Ancak, ilk kompozitiğe neden olan bir kapasite sorunuysaERDDAP™Başarısız olmak için (Aşırı bir kullanıcı mı? Birbiri[inkâr-of-service saldırısı](https://en.wikipedia.org/wiki/Denial-of-service_attack)??) Ancak bu, kullanıcılarını diğer kompozitiğe yönlendirmek çok olasıdırERDDAPs bir sebep olacaktır[Kaliding başarısızlık](https://en.wikipedia.org/wiki/Cascading_failure). Böylece, en sağlam kurulumun kompozit olması gerekirERDDAPFarklı URL'ler ile.
    
Ya da belki daha iyi, birden fazla kompozit kurmakERDDAPdengeleme olmadan s. Bu durumda, her birini vermenin bir noktası yapmalısınızERDDAPFarklı bir isim / kimlik ve onları dünyanın farklı bölgelerinde ayarlarsanız (e.g., farklı AWS bölgeleri) E.g.,ERD\\_US\\_ East,ERD\\_US\\_West,ERD\\_IE,ERD\\_FR,ERD\\_IT, böylece kullanıcılar bilinçli olarak, defalarca belirli bir şeyle çalışırERDDAP.
    
*   \\[Bir sunucuda çalışan yüksek bir performans sisteminin büyüleyici bir tasarımı için, bunu gör[Mailinatorun ayrıntılı açıklaması](https://mailinator.blogspot.com/2007/01/architecture-of-mailinator.html).\\]

### Datasets in Very High Request{#datasets-in-very-high-demand} 
Gerçekten alışılmadık durumda, bunlardan biri **A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A** , **B** Ya da **C C C C**  ERDDAPs, bant sınırlamaları veya sert sürücü sınırlamaları nedeniyle taleplerle devam edemez, verileri kopyalamak mantıklıdır (Tekrar tekrar tekrar tekrar tekrar tekrar tekrar) Başka bir sunucu +hard Drive+ERDDAPBelki de onunla birlikte[EDDGridKopya kopya](/docs/server-admin/datasets#eddgridcopy)ve/veya[EDDTableCopy](/docs/server-admin/datasets#eddtablecopy). Orijinal veri kümesine sahip olmak için ideal görünebilir ve kopyalanan veri seti, kompozitte bir veri kümesi olarak sorunsuz görünür.ERDDAP™Bu zordur, çünkü iki veri kümesi farklı zamanlarda biraz farklı eyaletlerde olacaktır. (Özellikle, orijinal yeni veriler aldıktan sonra, ancak kopyalanan veri setinden önce kopyası kopyasını alır.) . Bu nedenle, veri kümelerinin biraz farklı başlıklara verildiğini öneririm (E.g., "... (kopya #1) " ve "... (kopya #2) ", ya da belki " (Ayna # *n n n* ) " veya " (server # *n n n* ) " " "") Ve kompozitlerde ayrı veri setleri olarak görünERDDAP. Kullanıcılar listelerini görmek için kullanılır[Ayna siteleri](https://en.wikipedia.org/wiki/Website#mirror_site)Popüler dosya indirme sitelerinde, bu yüzden sürpriz ya da hayal kırıklığına uğratmamalıdır. Verilen bir sitede bant sınırlamaları nedeniyle, başka bir sitede bulunan aynaya sahip olmak mantıklı olabilir. Ayna kopyası farklı bir veri merkezindeyse, sadece bu veri merkezinin kompozitiğine erişimERDDAP™Farklı başlıklar (E.g., "mirror #1) Gerekli değil.

### Düzenli Hard Drives karşı RAIDs{#raids-versus-regular-hard-drives} 
Büyük bir veri kümesi veya bir veri setleri grubu ağır kullanılmazsa, hata toleransı teklif ettiğinden ve başka bir sunucunun işleme gücüne veya bant genişliğine ihtiyacınız olmadığı için bir RAID üzerinde verileri depolamak mantıklı olabilir. Ancak bir veri kümesi ağır kullanılıyorsa, verileri başka bir sunucu + + +'da kopyalamak daha mantıklı olabilirERDDAP™+ sert sürücü (Benzer şekilde benzer[Google ne yapar](https://storagemojo.com/2007/02/19/googles-disk-failure-experience/)) Birden fazla veri setlerini depolamak için bir sunucu ve bir RAID kullanmak yerine, her iki sunucu +hardDrive+ERDDAPBunlardan biri başarısız olana kadar ızgarada.

### Başarısızlık Başarısızlık{#failures} 
Ne olur...

* Bir veri kümesi için bir talep patlaması var (e.g., bir sınıftaki tüm öğrenciler aynı anda benzer veriler talep ediyor) ??
Sadece sadeceERDDAP™Bu veri kümesine hizmet etmek boğulacak ve yavaşlayacak veya talepleri reddedecektir. KompozitERDDAP™Ve diğer veERDDAPs etkilenmeyecek. Sistem içindeki belirli bir veri kümesi için limit faktörü, verilerle zor sürücüdür (Değil değilERDDAP) , tek çözüm (Hemen hemen değil) Farklı bir sunucu +hardDrive+ üzerinde veri kümesinin bir kopyasını yapmakERDDAP.
* An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An An **A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A** , **B** Ya da **C C C C**  ERDDAP™Başarısızlık başarısız olmaz (E.g., sert sürücü başarısızlık) ??
Sadece dataset (s) Yemin ederim ki,ERDDAP™Etkileniyor. Eğer veri kümesi (s) Başka bir sunucu +hardDrive+ üzerinde aynalıERDDAPAncak etki minimumdur. Sorun 5 veya 6 RAID seviyesinde zor bir sürücü başarısızlığıysa, sadece sürücüyü değiştirir ve sürüşteki verileri yeniden inşa etmiş olursunuz.
* KompozitERDDAP™Başarısız mı?
Bir sistemi çok iyi yapmak istiyorsanız[yüksek kullanılabilirlik](https://en.wikipedia.org/wiki/High_availability), yukarı ayarlanabilir[Birden çok bileşikERDDAPs (Yukarıda tartışıldığı gibi) ](#multiple-composite-erddaps), gibi bir şey kullanarak[NGINX](https://www.nginx.com/)veya[Traefik](https://traefik.io/)Yük dengelemek için. Verilen bir kompozitinERDDAP™Çok sayıda kullanıcıdan çok fazla istekle başa çıkabilir çünkü birçok kullanıcıdan çok fazla talep alabilir çünkü
metadata için talepler küçüktür ve hafızada olan bilgiler tarafından ele alınır ve
Veriler için talepler (Hangi büyük olabilir) çocuğa yönlendirilirERDDAPs.

### Basit, Scalable{#simple-scalable} 
Bu sistem kurmak ve yönetmek kolaydır ve herhangi bir kısmının aşırı yüklendiği zaman kolayca silinebilir. Belirli bir veri merkezi için verilen tek gerçek sınırlama, veri merkezinin bant genişliği ve sistemin maliyetidir.

### Band Wide Band{#bandwidth} 
Sistemin yaygın olarak kullanılan bileşenlerin yaklaşık bant genişliğini unutmayın:

|Bilej|Approximate Band genişliği (GBytes /s)  |
|---|---|
|Krishna memory|2.5|
|SSD sürücüsü|1 1 1|
|Maske sert sürücü|0.3|
|Gigabit Ethernet|0.1 0.1 0.1|
|OC-12|0.06|
|OC-3|0.015|
|T1|0.0002|

  
Yani, bir tane sert sürücü (0.3GB/s) One server with one serverERDDAP™Muhtemelen bir Gigabit Ethernet LAN'ı satabilir (0.1GB/s) . Ve bir Gigabit Ethernet LAN (0.1GB/s) Muhtemelen OC-12 Internet bağlantısı saturate an OC-12 internet bağlantısı (0.06GB/s) . Ve en azından bir kaynak listesi OC-12 hatları ayda yaklaşık 100,000 dolara mal oluyor. (Evet, bu hesaplamalar sistemi sınırlarına itmeye dayanıyor, bu iyi değil çünkü çok zor cevaplara yol açıyor. Ancak bu hesaplamalar sistemin parçalarını planlamak ve dengelemek için faydalıdır.)   **Açıkçası, veri merkeziniz için uygun bir şekilde hızlı internet bağlantısı, sistemin en pahalı parçasıdır.** Bir düzine sunucu ile kolayca ve nispeten ucuz bir şekilde bir ızgara inşa edebilirsinizERDDAPÇok sayıda veriyi hızlı bir şekilde pompalayabilen s, ancak uygun bir hızlı internet bağlantısı çok pahalı olacaktır. Kısmi çözümler şunlardır:

* Encourage müşterileri, gerekli olan tüm verilerden alt setleri talep etmek için. Müşteri küçük bir bölge veya daha düşük bir karar için yalnızca verilere ihtiyaç duyarsa, talep etmeleri gereken şey budur. Subcept, protokollerin merkezi bir odak noktasıdırERDDAP™Veriler talep etmek için destekler.
* Encourage sıkıştırılmış verileri iletmektedir.ERDDAP™ [sıkıştırlar](https://coastwatch.pfeg.noaa.gov/erddap/information.html#compression)Bir veri iletimi eğer "kabul-encoding" bulursaHTTP GETTalep başlığı. Tüm web tarayıcıları "kabul-encoding" kullanıyor ve cevabı otomatik olarak bastırıyor. Diğer müşteriler (e.g., bilgisayar programları) Açıkça kullanmak zorunda.
* sunucularınızı, nispeten daha az pahalı bant maliyetleri sunan bir ISS veya başka bir sitede konumlandırın.
* sunuculara,ERDDAPFarklı kurumlara gelir, böylece maliyetler dağılır. Daha sonra kompozitlerinizi bağlayabilirsinizERDDAP™OnlaraERDDAPs.

Not that Not that Note that Not[Cloud Computing](#cloud-computing)ve web barındırma hizmetleri ihtiyacınız olan tüm internet bantlarını sunar, ancak fiyat problemini çözmeyin.

Ölçeklenebilir, yüksek kapasite, hata-tolerant sistemler hakkında genel bilgi için, Michael T. Nygard'ın kitabını görün[Konuşuyor](https://www.amazon.com/Release-Production-Ready-Software-Pragmatic-Programmers/dp/0978739213).

### Legos gibi{#like-legos} 
Yazılım tasarımcıları genellikle iyi kullanmaya çalışır[Yazılım tasarım modelleri](https://en.wikipedia.org/wiki/Software_design_pattern)Problemleri çözmek için. İyi desenler iyidir, çünkü iyi yaratmak ve çalışmak, iyi özelliklere yol açan genel amaçlı çözümler. Desen isimleri standart değildir, bu yüzden deseni çağıracağımERDDAP™Lego Desen kullanır. Her Lego (Her biri herERDDAP) Basit, küçük, standart, stand-alone, tuğla (Data server) Diğer legoslarla bağlantılı olmasına izin veren tanımlanmış bir arayüzle (ERDDAPs) . BölümlerERDDAP™Bu sistemi oluşturan: abonelik ve bayrakURL sistemleri (Hangi iletişim için izin verirERDDAPs) EDD...Erddap yönlendirme sistemi ve sistemRESTfulKullanıcılar veya diğer kullanıcılar tarafından oluşturulabilecek veriler için taleplerERDDAPs. Bu nedenle, iki veya daha fazla böfke verildi (ERDDAPs) , çok sayıda farklı şekil oluşturabilirsin (Ağ topolojileriERDDAPs) . Elbette, tasarım ve özellikleriERDDAP™Lego gibi değil, belki de belirli bir topoloji için mümkün ve optimize etmek için farklı bir şekilde yapılabilirdi. Ama bunu hissediyoruzERDDAP‘ Lego gibi tasarım, herhangi bir çözümü sağlayan iyi, genel amaçlı bir çözüm sunuyorERDDAP™yönetici yönetici yönetici (veya yönetici grubu) Her türlü farklı federasyon topolojilerini oluşturmak. Örneğin, tek bir organizasyon üç tane kurulabilir (veya daha fazla)  ERDDAPs as shown in the[ERDDAP™Grid/Cluster Diagram Yukarıda](#recommendations). Ya da dağıtılmış bir grup (IOOS? CoastWatch? NCEI? NWS?NOAA?? USGS? DataONE? NEON? LTER? OOI? BODC? ONC? JRC? WMO?) Bir tane kurmak olabilirERDDAP™Her küçük outpost (Böylece veriler kaynağa yakın kalabilir) Ve sonra bir kompozit kurmakERDDAP™Sanal veri setleriyle merkezi ofiste (Bu her zaman mükemmel bir şekilde güncelleniyor) Her birinden küçük outpostERDDAPs. Gerçekten de, hepsiERDDAPDünya çapında çeşitli kurumlarda kuruldu, bu da diğerlerinden veri alırERDDAPs ve/veya diğer verilere veri sağlarERDDAPs, dev bir ağ oluşturmakERDDAPs. Nasıl serin?&#33; Yani, Lego’nun olduğu gibi, olasılıklar sonsuzdur. Bu yüzden bu iyi bir model. Bu yüzden bu iyi bir tasarım çünküERDDAP.

### Farklı istek türleri{#different-types-of-requests} 
Veri sunucu topolojilerinin bu tartışmasının gerçek yaşam komplikasyonlarından biri, farklı talep türleri ve farklı talepleri optimize etmenin farklı yolları olmasıdır. Bu çoğunlukla ayrı bir konudur (Ne kadar hızlı olabilirERDDAP™Veriler için talepe cevap verir mi?) Topoloji tartışmalarından (Veri sunucuları ve hangi sunucunun gerçek verilere sahip olduğu ilişkilerle hangi anlaşmalara sahiptir) .ERDDAP™Elbette, her türlü istekle verimli bir şekilde başa çıkmaya çalışır, ancak diğerlerinden daha iyi davranır.

* Birçok istek basittir.
Örneğin: Bu veri kümesi için metadata nedir? Ya da: Bu ızgara veri kümesi için zaman boyutunun değerleri nedir?ERDDAP™Bunu mümkün olduğunca çabuk işlemek için tasarlanmıştır (genellikle içinde&lt;=2 ms) Bu bilgiyi hafızada tutmak.
     
* Bazı istekler oldukça zor.
Örneğin: Bana bir veri kümesinin bu alt setini verin (Hangi bir veri dosyasında) . Bu istekler nispeten hızlı bir şekilde ele alınabilir çünkü bu zor değil.
     
* Bazı istekler zordur ve böylece zaman alıcıdır.
Örneğin: Bana bir veri kümesinin bu alt setini verin (10.000+ veri dosyalarından herhangi birinde olabilir veya her birinin 10 saniyeden caydırıcı veri dosyalarından olabilir) .ERDDAP™v2.0, bu isteklerle başa çıkmak için bazı yeni, daha hızlı yollar tanıttı, özellikle de istek-çalışan iplerin talep edilen farklı alt setlerle başa çıkmalarına izin vererek. Ama bu probleme başka bir yaklaşım daha var ki bu problemeERDDAP™Henüz destek değil: verilen bir veri kümesi için veri dosyalarının alt setleri ayrı bilgisayarlarda depolanabilir ve analiz edilebilir ve sonra orijinal sunucuda yapılan sonuçlar. Bu yaklaşım denir[MapReduce](https://en.wikipedia.org/wiki/MapReduce)Ve abartılır[Hadoop](https://en.wikipedia.org/wiki/Apache_Hadoop)İlk önce, (??) Açık kaynak MapReduce programı, Google kağıtlarından fikirlere dayanıyordu. (MapReduce'ye ihtiyacınız varsaERDDAPLütfen bir e-posta isteği göndererd.data at noaa.gov.) Google'ın Google'ı[BigQuery](https://cloud.google.com/bigquery/)İlginçtir çünkü MapReduce'nin alt tabut veri setlerine uygulanan bir uygulama gibi görünüyor, bu da bir tanesidir.ERDDAP“Temel hedefler. Muhtemelen bir yaratabileceğinizdirERDDAP™BigQuery veri setinden veri kümesi aracılığıyla[EDDTable FromDatabase](/docs/server-admin/datasets#eddtablefromdatabase)Çünkü BigQuery JDBC arayüzü ile erişilebilir.

### Bunlar benim görüşlerim.{#these-are-my-opinions} 

Evet, hesaplamalar basit (Ve şimdi biraz tarihli) Ama bence sonuçlar doğru. Hatalı mantığı mı kullandım yoksa hesaplamalarımda bir hata mı yaptım? Eğer öyleyse, hata benim tek başına. Lütfen düzeltme ile bir e-posta gönderinerd dot data at noaa dot gov.

- - - -

## [ **Cloud Computing** ](#cloud-computing) {#cloud-computing} 

Birkaç şirket bulut bilişim hizmetleri sunuyor (E.g.,[Amazon Web Services](https://aws.amazon.com/)ve[Google Cloud Platform](https://cloud.google.com/)) .[Web hosting şirketleri](https://en.wikipedia.org/wiki/Web_hosting_service)1990'ların ortalarından beri daha basit hizmetler teklif etti, ancak "bulut" hizmetleri, sunulan sistemlerin esnekliğini ve sunulan hizmetleri büyük ölçüde genişletti. Çünkü o zamandan beriERDDAP™grid sadece ızgaradan oluşurERDDAPs ve o zamandan beriERDDAPs are are areJavaTomcat'da çalıştırılabilecek web uygulamaları (En yaygın uygulama sunucusu) veya diğer uygulama sunucuları, kurmak için nispeten kolay olmalıdırERDDAP™Bir bulut hizmeti veya web barındırma sitesi üzerinde ızgara. Bu hizmetlerin avantajları şunlardır:

* Çok yüksek bantlı internet bağlantılarına erişim sunarlar. Bu tek başına bu hizmetleri haklı çıkarabilir.
* Kullandığınız hizmetler için sadece sorumlular. Örneğin, çok yüksek bantlı bir internet bağlantısına erişim elde edersiniz, ancak yalnızca gerçek veriler transfer edilir. Bu nadiren boğulan bir sistem inşa etmenize izin verir (zirvede bile talep) Ancak nadiren kullanılan kapasiteye ödeme yapmadan.
* Kolayca silinemezler. Sunucu türlerini değiştirebilir veya istediğiniz kadar çok sunucu ekleyebilirsiniz, bir dakikadan daha az. Bu tek başına bu hizmetleri haklı çıkarabilir.
* Sizi sunucuları ve ağlarını çalıştırmanın birçok idari görevinden özgüryorlar. Bu tek başına bu hizmetleri haklı çıkarabilir.

Bu hizmetlerin dezavantajları şunlardır:

* Hizmetlerinden sorumlular, bazen çok fazla (mutlak anlamda; iyi bir değer değil) . Burada listelenen fiyatlar için[Amazon EC2](https://aws.amazon.com/ec2/pricing). Bu fiyatlar (Haziran 2015 itibariyle) aşağı gelecek.
Geçmişte fiyatlar daha yüksekti, ancak veri dosyaları ve istek sayısı daha küçüktü.
Gelecekte fiyatlar daha düşük olacak, ancak veri dosyaları ve istek sayısı daha büyük olacaktır.
Bu yüzden ayrıntılar değişir, ancak durum nispeten sabit kalır.
Ve hizmetin aşırı pahalı olduğu değil, çok fazla hizmeti kullandığımız ve satın aldığımızdır.
    * Data Transfer – Sisteme Veri transferleri artık ücretsizdir (Yea&#33;) .
Sistemden veri transferleri $ 0.909/GB'dir.
One Track hard drive (0.3GB/s) One server with one serverERDDAP™Muhtemelen bir Gigabit Ethernet LAN'ı satabilir (0.1GB/s) .
One Gigabit Ethernet LAN (0.1GB/s) Muhtemelen OC-12 Internet bağlantısı saturate an OC-12 internet bağlantısı (0.06GB/s) .
Bir OC-12 bağlantısı -150.000 GB / ay iletebilirse, Data Transfer maliyetleri 150.000 GB @ 009/GB = 13,500 / ay, bu önemli bir maliyettir. Açıkçası, eğer bir düzine çalışkanınız varsaERDDAPBir bulut hizmetinde, aylık Data Transfer ücretleriniz önemli olabilir ($ 162,000 / ay) . (Yine, hizmetin overpriced olduğu değil, hizmetin çoğunu kullandığımız ve satın aldığımızdır.) 
    * Data storage – Amazon TB başına 50 / ay öder. (4TB işletmesini satın almak için doğru bir şekilde kullanmakla karşılaştırıldığında - $50/TB, ancak RAID bunu koymak ve idari maliyetler toplam maliyete eklenir.) Yani bulutta birçok veri depolamanız gerekiyorsa, oldukça pahalı olabilir (e.g., 100TB 5000 $ / ay maliyeti) . Ancak gerçekten büyük miktarda veriniz yoksa, bu, bant/data transfer maliyetlerinden daha küçük bir konudur. (Yine, hizmetin overpriced olduğu değil, hizmetin çoğunu kullandığımız ve satın aldığımızdır.)   
         
### Subcept{#subsetting} 
* Alt tanımlayan problem: Veri dosyalarından verileri verimli bir şekilde dağıtmanın tek yolu, verileri dağıtan programa sahip olmaktır. (E.g.,ERDDAP) Yerel bir sert sürücüde depolanan verilere sahip bir sunucu üzerinde çalışan (veya aynı şekilde bir SAN veya yerel RAID'e hızlı erişim) . Yerel dosya sistemleri izin verirERDDAP™  (ve alt kütüphaneler, netcdf-javava gibi) dosyaların belirli aralıklarını istemek ve yanıtları çok çabuk almak. Birçok veri isteğindenERDDAP™Dosyaya (Özellikle, stride değerinin &gt; 1 1 1) Programın tüm dosyayı veya büyük bir dosyayı yerel olmayan bir dosyadan talep etmesi durumunda verimli bir şekilde yapılamaz. (Bu nedenle daha yavaş yavaş yavaş yavaş yavaş yavaş yavaş yavaş) veri depolama sistemi ve sonra bir alt set çıkarın. Eğer bulut kurulumu vermiyorsaERDDAP™dosyalara hızlı erişim (Yerel dosyalarla kadar hızlı) ,ERDDAP“Veriye erişim ciddi bir şişenck olacak ve bir bulut hizmeti kullanmanın diğer faydalarını ortadan kaldıracaktır.

### Hosted Data{#hosted-data} 
Yukarıdaki maliyet fayda analizine bir alternatif (Hangi veri sahibine dayanmaktadır (E.g.,NOAA) Veriler için bulutta saklanmak için ödeme) 2012 civarında geldi, Amazon (Ve daha az ölçüde, diğer bazı bulut sağlayıcıları) Bulutlarında bazı veri kümeleri barındırmaya başladı (AWS S3) ücretsiz (Muhtemelen, kullanıcıların bu verilerle çalışmak için AWS EC2 hesaplama örneklerini kiralayabilmelerini umuyor.) . Açıkçası, bu bulut bilişimi çok daha pahalı bir şekilde etkili hale getiriyor, çünkü zaman ve verileri yüklemeye ve barındırmaya şimdi sıfır. With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With With WithERDDAP™v2.0, koşmayı kolaylaştırmak için yeni özellikler varERDDAPBulutta:

* Şimdi, aEDDGridFiles veya EDDTable FromFiles dataset, internet üzerinden uzaktan ve erişilebilir olan veri dosyalarından oluşturulabilir. (e.g., AWS S3 kovas) kullanarak&lt;Url&gt önbellek; ve&lt;Önbelli GB&gt; seçenekler.ERDDAP™Son zamanlarda kullanılan veri dosyalarının yerel bir önbellekini koruyacaktır.
* Şimdi, herhangi bir EDDTableFiles kaynak dosyaları sıkıştırılırsa (E.g.,.tgz) ,ERDDAP™Onları okuduğunda otomatik olarak onları bastıracaktır.
* Şimdi,ERDDAP™Verilen bir isteke cevap veren iplik, talebin alt bölümler üzerinde çalışmak için spawn işçi ipleri kullanacak&lt;nThreads&gt; seçenekler. Bu paralelleştirme, zor taleplere daha hızlı cevap vermelidir.

Bu değişiklikler, AWS S3 problemini yerel, blok seviyesindeki dosya depolamasını ve blok seviyesindeki dosya depolamasını sağlamaz. (yaşlı yaşlı yaşlı yaşlı yaşlı yaşlı yaşlı yaşlı yaşlı yaşlı yaşlı yaşlı) S3'e erişim sorunu önemli bir gecikmeye sahip. (Yıllar önce yıl önce (~2014) Ama bu gecikme önemliydi, ama şimdi çok daha kısa ve çok önemli değil.) Hepsi her şeyde, bu ayarlanma anlamına gelirERDDAP™Bulutta şimdi çok daha iyi çalışıyor.

 **Teşekkürler teşekkürler** - Matthew Arrott ve grubu sayesinde orijinal OOI çabalarında onların çalışması için çaba gösteriyorERDDAP™Bulutta ve ortaya çıkan tartışmalarda.
 

- - - -

## [Datasets'in Uzaktan Replikasyonu](#remote-replication-of-datasets) {#remote-replication-of-datasets} 

Kafelerin ve federasyonların yukarıdaki tartışması ile ilgili ortak bir problem varERDDAPs: veri kümelerinin uzaktan replikasyonu. Temel problem şu: bir veri sağlayıcısı, bazen değişen bir veri kümesini koruyor ve bir kullanıcı bu veri setinin güncel yerel kopyasını korumak istiyor (Farklı nedenlerle) . Açıkçası, bunun çok sayıda varyasyonu var. Bazı değişiklikler diğerleriyle uğraşmak için çok daha zor.

* Hızlı Güncellemeler
Yerel veri kümesini güncel tutmak daha zor *Hemen hemen hemen hemen hemen hemen hemen hemen hemen hemen hemen*   (E.g., içinde 3 saniye) Örneğin, kaynağa her değişiklikten sonra, birkaç saat içinde.
     
* Frequent Değişiklikleri
Frequent değişiklikler, infrequent değişikliklerden daha zor. Örneğin, günlük değişiklikler her 0.1 saniyede değişikliklerle uğraşmak çok daha kolaydır.
     
* Küçük Değişiklikler
Bir kaynak dosyasına küçük değişiklikler tamamen yeni bir dosya ile uğraşmak daha zordur. Bu özellikle küçük değişiklikler dosyada herhangi bir yerde olabilirse doğrudur. Küçük değişiklikler tespit etmek ve çoğaltılması gereken verileri izole etmek zordur. Yeni dosyalar transfer etmek için algılama ve verimli.
     
* Entire Dataset
Tüm bir veri kümesini tutmak, güncel verileri korumaktan daha zordur. Bazı kullanıcılar sadece son verilere ihtiyaç duyuyor (E.g., son 8 gün değerinde) .
     
* Çok sayıda Copies
Farklı sitelerdeki birden çok uzaktan kopyaları korumak bir uzaktan kopya korumaktan daha zordur. Bu, ölçeklendirme problemidir.
     

Belli ki, olası değişikliklerin kaynağı veri kümesine ve kullanıcının ihtiyaçlarına ve beklentilerinin çok sayıda varyasyonu vardır. Çeşitliliklerin çoğu çözmek çok zordur. Bir durum için en iyi çözüm genellikle başka bir durum için en iyi çözüm değildir - henüz evrensel bir büyük çözüm yoktur.

### [ **İlgiliERDDAP™Araçlar** ](#relevant-erddap-tools) {#relevant-erddap-tools} 

ERDDAP™Bir veri kümesinin uzak bir kopyasını korumak isteyen bir sistemin parçası olarak kullanılabilir birkaç araç sunar:

*   ERDDAP"[RSS  (Rich Site Özeti?) servis hizmeti hizmeti hizmeti hizmeti hizmeti](https://en.wikipedia.org/wiki/RSS)  
Uzakta bir veri setini uzaktan kontrol etmek için hızlı bir yol sunarERDDAP™değişti.
     
*   ERDDAP"[abonelik hizmeti](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions)  
Daha verimlidir (Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than Than ThanRSS) Yaklaşım: Hemen bir e-posta gönderir veya bir URL ile her aboneye bir e-posta gönderir, veri kümesi güncellenir ve güncelleştirme bir değişiklikle sonuçlandı. ASAP'ı olduğu için verimlidir ve boşa harcanmış bir çaba yoktur (Ankete göreRSSservis hizmeti hizmeti hizmeti hizmeti hizmeti) . Kullanıcılar diğer araçları kullanabilir (Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like Like[IFTTT](https://ifttt.com/)) Abonelik sisteminden gelen e-posta bildirimlerine tepki vermek. Örneğin, bir kullanıcı uzaktan bir veri kümesine abone olabilirERDDAP™IFTTT'yi abonelik e-posta bildirimlerine tepki vermek ve yerel veri setini güncellemek için kullanın.
     
*   ERDDAP"[Bayrak sistemi](/docs/server-admin/additional-information#flag)  
Bir yol için bir yol sağlarERDDAP™Yönetici onun /herERDDAPASAP'ı yeniden kurmak. Bir bayrak URL formu senaryolarda kolayca kullanılabilir. Bir bayrak URL formu da bir abonelik için eylem olarak kullanılabilir.
     
*   ERDDAP"["files"Sistem sistemi sistemi sistemi sistemi sistemi sistemi sistemi sistemi sistemi](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)  
Verilen bir veri kümesi için kaynak dosyalarına erişim sunabilir, örneğin Apache tarzı bir dizi dosyayı listeleyebilir ("Web Accessible Folder") Her dosyanın URL'sini, son değiştirilmiş zamanı ve büyüklüğü vardır. One downside of using the using the"files"Sistem, kaynak dosyalarının farklı değişken isimleri ve farklı metadata'nın veri kümesinden göründüğü gibi görünmesidir.ERDDAP. Eğer bir uzaktanERDDAP™Dataset kaynak dosyalarına erişim sunar, bu kötü adamın rsync versiyonunu açar: Hangi uzaktan dosyaların değiştiğini ve indirilmesi gerektiğini görmek için yerel bir sistem için kolaydır. (Görün bakalım,[ÖnbelliUrl seçeneği](#cache-from-url)Aşağıdakiler bunu kullanabilir.)   
     

### [Çözümleri Çözümleri](#solutions) {#solutions} 

Soruna çok sayıda değişiklik olmasına rağmen ve sonsuz sayıda olası çözüm olmasına rağmen, çözümlere sadece birkaç temel yaklaşım var:

#### Özel, Brute Force Solutions{#custom-brute-force-solutions} 
Belirli bir çözüm, bu nedenle verilen bir durum için optimize edilmiş bir özel çözüm elde etmektir: hangi verilerin değiştiğini tespit eden bir sistem yapın ve bu bilgiyi kullanıcıya gönderir, böylece kullanıcı değişen verileri talep edebilir. Bunu yapabilirsiniz, ancak dezavantajlar vardır:

* Özel çözümler çok fazla iş.
* Özel çözümler genellikle belirli bir veri kümesine o kadar özelleştirilmiştir ve kullanıcıların kolayca yeniden kullanılamayacağı sistemi verilir.
* Özel çözümler sizin tarafından inşa edilmeli ve muhafaza edilmelidir. (Bu asla iyi bir fikir değil. Çalışmadan kaçınmak ve işi yapmak için her zaman iyi bir fikirdir&#33;) 

Bu yaklaşımı almaya cesaret ediyorum çünkü neredeyse her zaman genel çözümler aramak, başka biri tarafından inşa edilmiş ve muhafaza edilmiştir ve farklı durumlarda kolayca yeniden kullanılabilir.
     
#### rsync{#rsync} 
[rsync](https://en.wikipedia.org/wiki/Rsync)Mevcut, çarpıcı derecede iyi, genel amaç çözümü, bir kullanıcının uzak bilgisayarında bir kaynak bilgisayarında bir dosya koleksiyonu tutmak için. Bu şekilde çalışır:

1. Bazı olay (E.g., anERDDAP™abonelik sistemi etkinliği) Rit koşuyor,
     (Ya da, bir cron işi kullanıcının bilgisayarındaki belirli zamanlarda rsync'i çalışır) 
2. Hangi temaslar kaynak bilgisayarında kaybolur,
3. Bu, her dosyanın chunks için bir dizi hashes hesaplar ve kullanıcının rsync'e ait olanları iletirir,
4. Bu bilgiyi kullanıcının dosyaların kopyaları için benzer bilgilerle karşılaştırır,
5. Hangi zaman değişmiş olan dosyaların chunkslerini talep eder.

    
Yaptığı her şeyi düşünün, rsync çok hızlı çalışır (e.g., 10 saniye artı veri transferi zamanı) ve çok verimli. Orada orada vardır[Rsync varyasyonları](https://en.wikipedia.org/wiki/Rsync#Variations)Bu farklı durumlar için optimize (e.g., önceden hesaplayarak ve her kaynak dosyasının chunkslerinin incelikleri ile) .

rsync'in ana zayıflıkları şunlardır: kurmak için biraz çaba gerektirir (güvenlik sorunları) ; bazı ölçeklendirme sorunları var; ve NRT veri setlerini gerçekten güncel tutmak için iyi değil (e.g., her 5 dakikadan fazla rüt kullanmak garip) . Zayıf yönleriyle başa çıkabilirseniz veya durumunuzu etkilemezlerse, rsync mükemmel, genel bir amaç çözümü, herkesin şu anda veri kümelerinin uzaktan replikasyonunu içeren birçok senaryoyu çözmek için kullanabileceğiniz.

Bir öğe varERDDAP™Posta hizmetleri için destek eklemeye çalışmak için listesiERDDAP  (Muhtemelen oldukça zor bir görev) Bu yüzden herhangi bir müşteri rsync kullanabilir (veya bir değişken) Bir veri kümesinin güncel bir kopyasını korumak. Eğer herkes bu konuda çalışmak istiyorsa, lütfen e-postaerd.data at noaa.gov.

Daha fazla ya da daha az şey yapan başka programlar vardır, bazen dataset replication'a yöneliktir. (Çoğu zaman bir dosya-copy seviyesinde olsa da) E.g.,Unidata"[IDD](https://www.unidata.ucar.edu/projects/index.html#idd).
    
#### Url{#cache-from-url} 
[Önbellek FromUrl](/docs/server-admin/datasets#cachefromurl)ayar mevcuttur (Başlangıçla başlamakERDDAP™v2.0) Tüm içinERDDAP'In dataset types that make datasets from files (Temel olarak, tüm alt sınıfları[EDDGridFromFiles](/docs/server-admin/datasets#eddgridfromfiles)ve[EDDTable FromFiles](/docs/server-admin/datasets#eddtablefromfiles)) . Önbelli önbelli önbelli önbelli önbelli önbelli önbelli önbelli önbelli önbelli önbelli Url otomatik olarak indirmeye ve onları uzaktan bir kaynaktan önbellekle kopyalayarak yerel veri dosyalarını korumak için önemsiz yapar. Url ayarından. Uzak dosyalar Web Accessible Folder veya THREDDS tarafından sunulan bir dizi dosya listesinde olabilir,Hyrax, bir S3 kova, veyaERDDAP""files"Sistem.
    
Uzak dosyaların kaynağı uzaktan bir durumdurERDDAP™Kaynak dosyalarını kaynak dosyaları aracılığıyla sunan veri setiERDDAP™ "files"Sistem, sonra yapabilirsiniz[abone abone abone abone](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions)Uzak veri kümesine ve kullanın[Bayrak URL](/docs/server-admin/additional-information#flag)Yerel veri setiniz için abonelik için eylem olarak. Sonra, uzaktan veri kümesi değişiklikleri ne zaman, veri setiniz için bayrak URL ile irtibata geçecek, bu da ASAP'ı yeniden yükleyecek ve değişen uzaktan veri dosyalarını indirecek. Tüm bunlar çok hızlı bir şekilde gerçekleşir (Genellikle -5 saniye artı değişen dosyaları indirmek için gereken zaman) . Bu yaklaşım, kaynak veri kümesi değişikliklerinin periyodik olarak eklendiği ve mevcut dosyaların asla değişmeyeceği harika çalışır. Bu yaklaşım, verilerin sık sık her şeye uygun olup olmadığını iyi çalışmıyor (veya çoğu) Mevcut kaynak veri dosyalarından, çünkü o zaman yerel veri setiniz genellikle tüm uzaktan veri kümesini indirmektir. (Bu, bir rsync benzeri yaklaşımın gerekli olduğu yerdir.) 
    
#### ArchiveADataset{#archiveadataset} 
ERDDAP™"[ArchiveADataset](/docs/server-admin/additional-information#archiveadataset)Veriler sık sık bir veri kümesine eklendiğinde iyi bir çözümdür, ancak eski veriler asla değişmez. Temel olarak, bir anERDDAP™Yönetici ArchiveADataset (Belki bir senaryoda, belki de cron tarafından çalıştırın) ve çıkarmak istedikleri bir veri kümesinin bir alt kümesini belirtin (Belki birden fazla dosyada) ve bir paket.zipveya.tgzDosya, böylece insanlarla veya gruplarla ilgilenmek için dosyayı gönderebilirsiniz (E.g., NCEI for Archiving) veya indirmek için kullanılabilir hale getirin. Örneğin, her gün 12:10'da ArchiveADataset'i çalıştırabilirsiniz ve bir şeyler yapmak zorundasınız.zip12:00'dan gelen tüm veriler bugün 12:00'ye kadar önceki gün. (Ya da, bu haftalık, aylık veya yıllık olarak, ihtiyaç olduğu gibi.) Çünkü paketlenmiş dosya çevrimdışı olarak üretilir, standart bir süre veya çok fazla veri tehlikesi yoktur, çünkü standart bir dosya için olacaktır.ERDDAP™Talep.
     
#### ERDDAP™" standart istek sistemi{#erddaps-standard-request-system} 
ERDDAP™“ Standart istek sistemi, verilerin sık sık sık bir veri setine eklendiği zaman alternatif iyi bir çözümdür, ancak eski veriler asla değişmez. Temel olarak, herkes belirli bir süre için verileri almak için standart talepleri kullanabilir. Örneğin, 12:10'da her gün, tüm veriler için bugün 12:00'dan gelen uzaktan veri setinden bir istek yapabilirsiniz. Sınır sınırlaması (ArchiveADataset yaklaşımına kıyasla) Bir süre için risk veya tek bir dosya için çok fazla veri var. Daha küçük zaman dönemleri için daha sık istekler yaparak sınırlamadan kaçınabilirsiniz.
     
#### EDDTable FromHttpGet{#eddtablefromhttpget} 
\\[Bu seçenek henüz mevcut değil, ancak yakın gelecekte inşa etmek mümkün görünüyor.\\]  
Yeni The new[EDDTable FromHttpGet](/docs/server-admin/datasets#eddtablefromhttpget)dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type in dataset type inERDDAP™v2.0 başka bir çözümü mümkün kılar. Bu tür veri kümesi tarafından korunan alt dosyalar aslında veri kümesine yapılan kayıtların dosyalarıdır. Yerel bir veri kümesini periyodik olarak periyodik olarak koruyan bir sistem oluşturmak mümkün olmalıdır. (veya bir tetikleyiciye dayanarak) Son talepten bu yana uzaktan veri setine yapılan tüm değişiklikleri talep edin. Bu verimli olmalıdır (veya daha fazla) rsync'den ve birçok zor senaryoyu ele alacaktı, ancak sadece uzak ve yerel veri setleri EDTable FromHtpGet datasets ise çalışırdı.

Eğer herkes bu konuda çalışmak istiyorsa, lütfen temasa geçinerd.data at noaa.gov.
    
#### Dağıtılmış Data{#distributed-data} 
Yukarıdaki çözümlerin hiçbiri, sorunun zor varyasyonlarını çözmenin harika bir işi değildir, çünkü yakın gerçek zamanlı çoğaltma (NRT) Veri setleri çok zor, kısmen tüm olası senaryolar nedeniyle.

Büyük bir çözüm var: verileri çoğaltmaya bile çalışma.
Bunun yerine, bir yazara dayalı kaynak kullanın (One dataset on one dataset on one datasetERDDAP) , data sağlayıcı tarafından muhafaza edildi (E.g., bölgesel bir ofis) . Bu veri kümesinden gelen tüm kullanıcılar her zaman kaynaktan alır. Örneğin, tarayıcı tabanlı uygulamalar bir URL tabanlı istekten veri alır, bu nedenle istek uzaktan sunucudaki orijinal kaynağa değil. (ESM'e ev sahipliği yapan aynı sunucu değil) . Birçok insan bu Dağıtılmış Data yaklaşımı uzun süredir savunuyor (E.g., Roy Mendelssohn son 20+ yıldır) .ERDDAP's grid/federation model (Bu belgenin en iyi %80'i) Bu yaklaşıma dayanmaktadır. Bu çözüm Gordian Knot'a bir kılıç gibidir - tüm sorun gider.

* Bu çözüm çarpıcı derecede basittir.
* Bu çözüm çarpıcı bir şekilde verimlidir, çünkü hiçbir iş bir çoğaltma veri setini tutmak için yapılmaz (s) güncel.
* Kullanıcılar herhangi bir zamanda en son verileri alabilir (e.g., sadece bir geç kalmışlığı ile -0.5 ikinci) .
* Oldukça iyi ölçekleniyor ve ölçeklendirmeyi geliştirmek için yollar var. (Bu belgenin en iyi %80'inde tartışmayı görün.)   
     

Hayır, bu mümkün tüm durumlar için bir çözüm değil, ancak büyük çoğunluk için büyük bir çözüm. Bazı durumlarda bu çözümle ilgili sorunlar / sıkıntılar varsa, bu sorunların üstesinden gelmek veya bu çözümlerin çarpıcı avantajları nedeniyle bu zayıflıklarla yaşamak için genellikle çalışmaya değer. Bu çözüm gerçekten verilen bir durum için kabul edilemezse, e.g., verilerin yerel bir kopyasına sahip olmanız gerektiğinde, daha sonra yukarıda tartışılan diğer çözümleri düşünün.
     
### Sonuç Sonuç Sonuç Sonuç{#conclusion} 
Tek olmasa da, tüm senaryolardaki tüm sorunları mükemmel bir şekilde çözen basit bir çözüm (rsync ve Dağıtılmış Veriler neredeyse aynıdır) Umarım yeterli araçlar ve seçenekler vardır, böylece özel durumunuz için kabul edilebilir bir çözüm bulabilirsiniz.
