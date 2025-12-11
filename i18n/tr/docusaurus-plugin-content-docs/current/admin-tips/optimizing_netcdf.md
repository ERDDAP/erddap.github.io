Bu içerik bir şeye dayanıyor [Roy Mendelssohn'dan gelen mesaj ERDDAP kullanıcılar grubu](https://groups.google.com/g/erddap/c/JWoS_y3cygg/m/zCpcNTxNAAAJ) .

1. Bulut için netcdf dosyaları optimize edin
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

A. repacking ve sayfa büyüklüğü

Son zamanlarda bu ilginç makalede rastladığım bazı araştırmalarda:

https://nsidc.github.io/cloud-optimized-icesat2/

Hiçbir şey programlama dilleri, editörler ve dosya formatları hakkındaki tartışmalar gibi inflame tutkuları gibi görünüyor ve bu, hangi formatta bir öneri değil. (s) Kullanmanız gerekir, ancak bu makalede ne olduğunu anlamak ve ne kadar iyileşmenin kazanılabileceğini görmek için ( ERDDAP™ Her zaman bu konularda çok şey hakkında agnostic olmaya çalıştı, bunun yerine insanların aslında verilerle nasıl çalıştığını denemek ve çalışmak yerine.) .

Kağıt esas olarak verilerin Amazon S3 gibi bir nesne mağazasında depolandığı durumlarda amaçlanmıştır. Object mağazaları ağ üzerinden erişilebilir http  (s) komutlar, böylece doğrudan bağlantı ile depolamaya kıyasla (Sanal Sanal Sanal) sunucu, istek bir tur yapmak zorunda olduğu kadar daha uzun bir gecikme var. nesneler için mümkün olduğunca az talep yapmak istersiniz, ancak arama sayısını daha az yükseltmek için gerçekten büyük talepler yaparsanız, ihtiyacınız olandan daha fazla veriye erişebilirsiniz. Bu yüzden hile bu iki faktör arasında bir denge elde etmektir. Ve nesne mağazalardaki verilere erişim büyük ölçüde gelişmiş olsa da, bu yüzden doğrudan ek depolamaya erişime sahiptir. Bu bazı tahminlerin araştırılması:

Yerel Disk:
• • • Seek zamanı: 0.1ms
• 6 arama: 0.6ms (Negable) 
• • • dağınık metadata okumak hızlı
Bulut HTTP:
• • • latency: 100-200ms
• 6 istek: 600-1200ms (Çok yavaş&#33;) 
• • • Her isteğin ağ yuvarlak zamanlaması vardır

Anlamanın ikinci şey, netcdf4/hdf5 dosyalarının chunks'ta depolandığı ve sayfalarda geri döndüğünüz, böylece her birinin erişim noktası bir nesne mağazasından eriştiğinde erişim hızını gerçekten etkileyebilir ve dosyanın tüm dosya boyunca dağınık olduğu için metadata'yı varsayılan olarak, bu yüzden çeşitli istekler alabilir. Kağıtın ana noktası, netcdf4/hdf5 dosyaları için varsayılan sayfa büyüklüğü 4096'dır. (4KB) - (Hangi bulut için korkunç&#33;) Metadata boyutu tek başına muhtemelen bundan daha büyük ve muhtemelen chunk boyutlarınız da bundan daha büyük. Bu yüzden bir ekstra, yavaş olan çok fazla tura ihtiyaç duyacaktır. Yapmak istediğiniz şey dosyayı yeniden paketliyor, böylece tüm metadata dosyanın “top”ta ve sayfa büyüklüğü en azından bir chunk büyüklüğü kadar büyük. Ayrıca sayfa boyutunu varsayılan olarak sabit değildir, ancak değişen bir strateji kullanır. Elde edilen kağıt, daha iyi sonuçlar üretilen sabit bir sayfa boyutunu kullanıyor.

Peki dosyayı metadata boyutunu nasıl belirleyebilirim?

> h5stat yourfile.nc | grep "File metadata" # metadata size
>

Ve chunk boyutunu nasıl belirleyebilirim:

> h5dump -pH MUR41_file.nc | grep -A3 CHUNKED
>

veya

> ncdump -sh MUR41_file.nc | grep ChunkSizes
>

Ve sayfa boyutlandırma stratejisini nasıl belirleyebilirim:

> h5stat yourfile.nc | grep "File space management strategy"
>

Büyük olasılıkla bu komut “H5F_FSPACE_STRATEGY_FSM_AGGR” geri dönecek ve geri dönmek istediğimiz şey “H5F_FSGY_STRATEGY_PAGE”

Netcdf dosyasını nasıl yeniden paketleyebilirim, böylece tüm metadata ön plandadır ve stratejiyi değiştirebilir, böylece sabit bir sayfa büyüklüğü kullanılır ve hangi sayfa boyutu kullanmak için? Bulduğumun kuralları:

Sayfa Boyut Seçimi:
• • • ≥ toplam dosya metadata büyüklüğü olmalıdır (eleştirel&#33;) 
• • • 2'nin gücü olmalıdır (4MB, 8MB, 16MB, vs.) 
• • • Büyük delirmeyin - 32MB genellikle pratik max
• • • chunk boyutlarını düşünün - sayfa büyüklüğü en büyük chunks karşılamalıdır

Yukarıda belirtildiği gibi, ideal olarak büyüklüğü metadata büyüklüğü artı bir chunk büyüklüğünden daha büyük olmalıdır. Çalışmanın bulduğu şey, 8MB sayfası büyüklüğünden çok fazla veri kümesinin iyi bir ticaret olması, muhtemelen metadata büyüklüğü + chunk büyüklüğünden daha büyük ve ihtiyacınız olandan daha fazla veri çekmemesidir. Bunu başarmak için:

h5repack -S Updated -G 83886 yourfile .nc yourfile_optested .nc 

İşte farklı sayfa boyutları almak için kullanım değerleri:

4194304 (4MB) 
8388608 (8MB) 
16777216 (16MB) 
33554432 (32MB) 

b. dosyaları yerel olarak kullanıyorsanız faydaları var mı?

Bulduğum kağıt ve diğer şeyler, yerel olarak% 10-30 oranında bir hız kazanabileceğini önerebilir. Her şeyimde ancak yorucu testler, taleplerin genel dosya büyüklüğüne kıyasla nispeten küçükken yaklaşık% 10 oranında hız kazanımlar buldum ve hız daha büyük hale geldiğinde azalır, ancak asla daha yavaş olduğunu öğrendim.

c. TANSTAAFL

Ah ama bir yerde bir yakalama var, bu ücretsiz bir öğle yemeği gibi görünüyor. Ve yakalama, sabit sayfa büyüklüğü dosyanın boyutunu artırır. Bazı durumlarda denedim:

617M mur1 .nc 
632M mur1_opted .nc 
608M mur2 .nc 
616M mur2_opted .nc 
29M chla1 .nc 
40M chla1_ested .nc 
30M chla2 .nc 
40M chla2_theopted .nc 

Yani ticaret, dosya büyüklüğünde önemsiz bir artış değildir.

d. Ama yine de dosyaları yeniden işlemem gerekiyorsa...?

İyi bir soru, dosyaları yeniden işlemek için bir senaryo yazmak zorundaysam, neden sadece bir senaryo yazmamak gibi bir formata tercüme etmek için? Phenr'in birçok savunucusu var ve sadece hızlı bir ördek arama yapıyorsanız ve çok sayıda iyi yazı var, belki daha dengeli bir görünüm belki de daha iyi bir görünüm dahahttps://www.youtube.com/watch?v=IEAcCmcOdJs  (Arttığı birçok noktanın buzchunk formatının ele almaya çalıştığı ilginçtir.) . Öyleyse neden dosyalarınızı somut gibi bir şeye dönüştürmek istemeyebilirsiniz, İlk olarak, netcdf dosyaları düzenli olarak yaratırsanız, dosyaları buradan optimize etmeye başlayabilirsiniz, hangi zaman hız kazançlarını görecek ve geçmiş dosyaları reform yapmanız gerekmez ve geçmiş dosyaları reform yapmanız gerekir. ERDDAP™ İç ayarlardan bazıları farklı olsa da hala dosyaların üzerinde toplanabilir. İkincisi, netcdf dosyalarına bağlı olan çok sayıda araç var olabilir ve bu yaklaşım, geniş bir kod miktarı olabilecekleri tekrarlamamak anlamına gelir. Nokta seçeneklerin farkında olmak ve durumunuz için neyin en iyi çalıştığını seçmek. Tıpkı bir hatırlatıcı olarak, eğer Zarr dosyalarını kullanarak kullanmayı seçerseniz ERDDAP™ Ancak, onlar klinis format v2 dosyaları olmalıdır.

e. Büyük veriler - bir kenara

Büyük veriler çok fazla konuşuluyor, ancak çoğu insanın kullandığı veriler ve modern dizüstü bilgisayarların yetenekleri ile nasıl karşılaştırılır? (Evet dizüstü bilgisayarlar, sunucular değil) . İlginç bir take şu anda:

https://www.youtube.com/watch?v=GELhdezYmP0Yaklaşık dakika 37, ama bütün konuşma ilginç

Bahsettiği çalışma şu anda:

https://motherduck.com/blog/redshift-files-hunt-for-big-data/

Bu nedenle, gerçekten güce girmek için ihtiyaç duyan kullanıcıların nispeten küçük bir yüzdesi var, ancak kullanıcıların ezici çoğunluğu analizlerini bir dizüstü bilgisayarlarda yapabilir, 26TB dış sürücüler şimdi 300 $ ve söylentilerin altında 60TB dış sürücüler yılın sonuna kadar kullanılabilir. Düşünmek için bir şey.

2. Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using ERDDAP™ Google Cloud Platform veya diğer bulut sağlayıcıları ile birlikte AWS Cloud Platform veya diğer bulut sağlayıcıları
--- De ki: ---------------

Şu anda ERDDAP™ Sadece AWS nesne depoları ile çalışmak bilinmektedir (S3) Ancak geliştirme ve genelleştirme rağmen ERDDAP™ 's object store support is on the todo list (see see see see see seehttps://github.com/ERDDAP/erddap/issues/158) . Öyleyse, size söylediğiniz gibi ne yapmalı ERDDAP™ Google Cloud Platform'da (GCP) veya benzer bir platform? İlk olarak, çoğu bulut platformu, genellikle yerel depolamaya benzer ve işletim sistemi tarafından tanınan biri dahil olmak üzere, ağ üzerinden genellikle erişim için NFS kullanan biri (Tekrar doğrudan OS tarafından erişilebilir) Ve bir nesne mağazası olan biri. İlk çözüm nesne mağazalarını kullanmamaktır ve gitmek için iyi olacaktır. Ama her zaman olduğu gibi, TANSTAAFL ve bu durumdaki dezavantajı nesne depolama -&gt; NFS Access -&gt; yerel maliyetlerinizi de saklar. (NFS'nin de ağ üzerinden eriştiğini ve kendi latency sorunları olduğunu ekleyeceğim, bu da dosya optimizasyonundan yararlanacaktır.) .

Eğer nesne dükkanı kullanmak zorundaysanız veya sadece bir nesne mağazası karşılayabilirseniz, cevap bir FUSE dosya sistemidir. (https://github.com/libfuse/libfuse) . GCP'de, bu jiyon denir ve yükleme adımları şunlardır:

• GCP Linux imajınıza gcsify:
Sudo apt update
Sudo apt install gcsfuse
• GCP'ye Kimlik (Eğer zaten otantik değilse) :
Doğru kimliklere sahip olmanızı sağlayın, genellikle servis hesabı aracılığıyla veya gcloud auth login çalıştırarak.
• • • GCS kovasını yerel bir diziye yerleştirin:
GCS kovanızı gcsget kullanarak yerel bir diziye yerleştirin. Bu, GCP örneğinizin yerel dosya sistemlerinin bir parçası olduğu gibi verilere erişmesine izin verir.
bücket-name /path/to / çok / yönlendirme

Ve şimdi nesne mağazanız Linux dosya sistemlerinin bir parçası gibi erişilebilir, bu yüzden birlikte çalışacak ERDDAP™ . Bu, sihir gibi görünüyor, her iki dünyanın en iyisini almak, bir yakalama olmalıdır. Ve orada. FUSE dosya sistemleri doğrudan nesne mağazasına erişmekten çok daha yavaştır (Temel olarak erişim için başka bir katman eklediniz) . Araştırmam haritada ne kadar yavaş olduğunu tahmin ediyor, bu yüzden ne kadar yavaş olduğu konusunda hiçbir fikrim yok. Ancak, nesne depoları kullanarak GCP üzerinde koşmanız gereken bir durumdaysanız, şu anda bu çalışacak bir çözümün var. ERDDAP™ .

3. Şimdi yardım etmek için ne yapabilirsiniz.
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

Bu şeylerin bazılarını test etme ve sonuçlarınızda rapor etme yeteneğine sahipseniz, bu harika olacaktır. Özellikle GCP'ye veya benzerine erişmişseniz ve ne kadar yavaş yavaş görün ERDDAP™ Erişim FUSE kullanıyor (Aslında bunu AWS’de de test edebilirsiniz) . Eğer hız cezası çok büyük değilse, bu harika olurdu, çünkü bazı insanların yakında onları çalıştırmak zorunda kalacağım ERDDAP™ s on GCP with object store. Bu yüzden sadece teorik ilgi meselesi değildir.
