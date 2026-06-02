Bu içerik bir şeye dayanıyor [Roy Mendelssohn'dan gelen mesaj ERDDAP kullanıcılar grubu](https://groups.google.com/g/erddap/c/H-vJoGP42TI) .

Koşu Koşu ERDDAP™ Bulutta sıcak bir konu haline geldi. Bunu not etmeliyim ki ERDDAP™ Bulutta her zaman koşmuştur, sadece bir ticari bulut sağlayıcısı tarafından sağlanan bir sunucuda değil, koşmak için büyük bir engel. ERDDAP™ Bir ticari bulut sağlayıcısı S3 depolama kullanıyorsanız, normal Linux blok erişime izin vermez. Ticari bulut sağlayıcınız tarafından sağlanan blok erişim seçeneklerini kullanmak için daha fazla ödemeye istekliyseniz, ticari bir bulut sunucusu üzerinde çalışmak, elbette maliyet dışında kendi ekipmanınızda çalışan olarak aynıdır.

Bunu 1 Aralık 2025'te “rclone ve S3” bir yazı yazdım ve bu bir takip. O e-postada GOES17 swathes'ı monte ettim ve bir dosyayı kontrol ettim, ama hepsini bu şekilde almadım ERDDAP™ Her şeyin sorunsuz çalıştığını görmek. Ve evet çocukdos, bunu evde deneyebilir ve bir avukat veya tıbbi danışmanla danışmanız gerekmez, hepsi güvenli olmalıdır. İşte NCDC OI sst AWS'de olan avhrr v2.1, onu ayarlar ERDDAP™ Ve sonuçları gösterir.

- Adım 1: rclone'daki son noktayı tanımlar

rclone  configure oi sst s3
Sağlayıcı AWS \\
Bölge us-east-1 \\
Konum_constraint us-east-1 \\
Env_auth false \\
anonim gerçek


- 2. Adım: Veri set noktası oluşturun

Sudo mkdir -p /mnt /oi sst 
Sudo "$USER:$USER" /mnt/oi sst 

- 3. Adım: S3 depolamayı Dağın noktasına taşıdı

İzinler, izinler, izinler, izinler... (Steve Ballmer'e özür dilerim, biliyorsan) ,

Dağın yapılması gerekir, böylece her kullanıcının tomcatını çalıştırdığı, genellikle kullanıcı “tomcat”, verilere erişebilir. 'rclone', dağıtım komutunu yürüten ve kullanıcının ev rehberinde bilgi depolamak isteyen kullanıcının sahibi ve grubu ile veri setini birleştirir. (Bu muhtemelen bunu bir sistem seviyesi süreci olarak ayarlarsanız - aşağıda aşağıda bakınız) . Bu nedenle, eğer dağ komutunu ’tomcat olarak yürütürseniz, ama eğer bizim tomcatınız farklı bir kullanıcı olarak yüklemeniz gereken bir ev rehberine sahip değilse. Bunu yapmak için füzyonu düzenler. conf dosyası:

1. Sudo vi / etc /

2. Uncomment veya eklemek:

user_allow_other

3. Kaydet ve çıkış.


Gerçek veriler birkaç tabaka derindir ve ben veri seviyesinde monte ediyorum, üst düzeyde değil ve bir tmux terminalinde komut uyguluyorum, böylece komut koşmaya devam ediyor:

rclone -v, oi sst :noa-cdr-sea-surface-temp-optimum-interpolasyon-pds/data/v2.1/avhrrr /mnt /oi sst \\
-read-only \\
-allow-other \\
-vfs-cache-mode full \\
-vfs-cache-max-size 1G \\
-vfs-cache-poll-intervalval 1m
-vfs-read-chunk-size 64M \\
-vfs-read-chunk-size-limit 1G \\
-vfs-read-ahead 256M \\
-buffer-size 64M \\
-dir-cache-time 24h \\
-attr-timeout 1s \\
-no-modtime


- Adım 4: GenrateDatasets kullanın X ml sadece normal gibi,

Use Use Use Use Use EDDGrid NcFiles'ten veri tipi olarak ve dizinin /mnt/oi sst /. İlk geçiş oldukça iyiydi ve sorunlar olmadan çalıştı. GenerateDatasets çalışırken yapılabilecek xml parçalarına üç değişiklik yaptım X ml ve bunlardı:

1. Datasetid'i oi sst _rclone

2. Kılavuz, bazı son dosyaların bir karışımı içerir “ .nc " ve diğerleri "preliminary .nc " ve sadece eski arzu edilir. Bu, dosya adı regex'i değiştirmek için:

 <fileNameRegex> Oi sst -avhrr-v02r01\\.\\d&#123;8&#125;\\ .nc  </fileNameRegex> 

Çoğu zaman yaşamın gizemlerinden biri olmak için regex bulduğumu söyledim ve regex’i yapmanın daha iyi yolları olabilir. Ama bu işe yaradı

3. ioos_category ayarlanmadı, bunları ekledim.

Kalıcı üretim için xml parçaları daha tam olmak için biraz daha düzenleme kullanabilir.

- Adım 5: xml parçalarına Ekle datasets.xml Ve bayrakları ayarlayın

Bu ilk geçiş için uzun bir zaman alır, bu yüzden günün geri kalanı için başka şeyler bulmaya gidin.

Son sonuç:

 https://upwell.pfeg.noaa.gov/erddap/griddap/oisst_rclone.graph
 

Şimdi bunun çok acı verici olmadığını görün&#33;

Sonuç ile oynarsanız, öncelikle rclone ayarlarının ilk tahmin olduğunu unutmayın ve optimizasyon için test edilmelidir. Grupümüz Jonathan Sherman bu kişiye baktı ve IOOS DMAC toplantısında konuşmasıyla ilgili konuşabilir. Ayrıca, GCP'de daha hızlı ve sadece biraz daha pahalı olan bir hierarşik bir alana sahip olmak için VM'nin kurulumunu nasıl organize edeceğiniz gibi Google Cloud Platform'da kurmakla ilgili çok daha fazla konu kapsayacaktır ve eğer verileri VM'nin kurulumuna hazırlamak için, S3 kovayı ayarlayın. ERDDAP™ Buları nasıl ayarlar. Bu konu sizi ilgilendirirse, konuşmalarını dinlemenizi teşvik ediyorum. The The The The The The The The ERDDAP™ yukarı ve koşu, sadece şu anda dışarıdan erişilebilir değil NMFS ağ.

İkincisi bu, AWS S3 kovasını güçlendiren bir AWS VM değil, bu gün sunucularımızdan ve borularımızdan biri tamamen doygundur, bu yüzden eski kurulumun yaptığım şeyden daha hızlı olmasını beklersiniz. (İyi borumuz çok büyük değil - teşekkürler NMFS &#33; - ama her zaman doygunuz - veriler için talep fenomenler oldu) .

Son olarak merak edebilirsiniz - Kendimi yuvarlamak istiyorum, bunun dışında nereden başlayacağım? LLM'lerin iyi olduğu bir şey buldum, iyi bilinen ve iyi belgelenmiş olan bilgiler ve kontrol ettiğim AIs. (Tüm jetonlarım var&#33;&#33;) Her şey rclone ve AWS ve GCP'yi oldukça iyi tanıyor ve sizin için kurulumun çoğunu yapabiliyor. Aslında, demo için iyi olacak bir veri kümesi arıyordum ve bir AI bana yukarıdakilerin çoğunu verdi, ancak kendi kurulumum için bazı düzenlemeler yaptım.

Ayrıca, Seth'in mevcut sürüm için yeni bir S3 yazdı (2.30) Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of ERDDAP™ - hızları kıyaslamamıştım ve her birinin yaptığına bağlı olarak hayal ediyorum. Mevcut bir liman için ERDDAP™ Kurulum, rclone kullanarak süreci basitleştirebilir.

-Roy

PS - Ve rclone’nin geniş bir satıcılar üzerinde çalıştığını hatırlayın, bu AWS ile sınırlı değildir ve sadece farklı bir satıcı için gerekli olan bazı değişikliklerdir.


Sistem servisine girin (Kullanıcı için uygun olarak değişiklik) :
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

[Unit]
Açıklama =Rclone için NOAA OISST on AWS
Wants =network-online .tar alın
After=network-online .tar alın

[Hizmet]
Type=notify
User = YourUser
Grup =Group

ExecStart=/usr/bin/rclone a oi sst :noa-cdr-sea-surface-temp-optimum-interpolasyon-pds/data/v2.1/avhrrr /mnt /oi sst \\
-read-only \\
-allow-other \\
-dir-perms 0755 \\
-file-perms 0644 \\
-vfs-cache-mode full \\
-vfs-cache-max-size 1G \\
-vfs-cache-poll-intervalval 1m
-vfs-read-chunk-size 64M \\
-vfs-read-chunk-size-limit 1G \\
-vfs-read-ahead 256M \\
-buffer-size 64M \\
-dir-cache-time 24h \\
-attr-timeout 1s \\
-no-modtime

Exec Dur = /bin / -uz /mnt /oi sst 
Restart=on-failure
RestartSec=10

[Install]
=multi-user .tar alın
