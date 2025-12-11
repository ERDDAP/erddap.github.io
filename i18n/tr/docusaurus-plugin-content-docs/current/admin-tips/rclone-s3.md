Bu içerik bir şeye dayanıyor [Roy Mendelssohn'dan gelen mesaj ERDDAP kullanıcılar grubu](https://groups.google.com/g/erddap/c/zZUt6PKfkoI/m/expZ3UkkBAAJ) .

Son zamanlarda, AWS S3'teki dosyalara erişmek için yardım isteyen bir dizi soruşturma alıyoruz. ERDDAP™ . İlk olarak, ERDDAP™ 2.29, AWS nesne mağazalarda da çalışmalı olan S3 erişimi geliştirdi. (Teşekkürler Seth&#33;) . Ama daha önce S3 mağazasını sunucunuzda veya VM'nizde bir dosya sistemi gibi görünmesi için bir FUSE tabanlı sistem kullanmak hakkında bahsetmiştim.

Bunu yapmanın bir yolu “rclone”. (https://rclone.org/) . rclone birçok farklı S3 sistemi üzerinde çalışır ve önbellek boyutu belirlemek için performans optimize etmek için birçok farklı ayara sahiptir, bu da FUSE'yi çalıştırmadan bazı hız cezasını dengeleyebilir. rclone kullanımı avantaj ile ERDDAP TM rclone, S3 ile olan tüm etkileşimi ele alıyor, bu yüzden dataset türleri gibi EDDGrid NcFiles, yerel dosyalar varsa doğrudan kullanılabilir. Bu, nesne mağazanıza erişmek için rclone'yi nasıl ayarlamanız gerektiği anlamına gelir ve geri kalanı sadece normal Linux tipi kurulumlardır.

Şimdi bunu sadece terk edersem yeniden izin vereceğim ve bir örnek vermeyeceğim. Aşağıdakide anonim olarak dağacağım NOAA Ubuntu sunucularımızdan birinde halka açık bir AWS S3 mağazasında bulunan 17 veri, ilk kurulumda rclone işlemi her şeyin çalıştığını test etmek daha kolay olacaktır ve sonra ii'yi arka planda çalışan bir hizmete nasıl dönüştüreceğim. Aşağıdakilerde önbellek 1GB'ye ayarlanıyor. Performans, önbellek çok daha büyük hale getirerek iyi geliştirilebilir, 5GB-10GB veya daha büyük. Ayrıca ayarlar performansı optimize edebilecekleri tahminlerimdir, ancak optimal olanlar olmayabilir ERDDAP™ .


1. Gerekli yazılımı yükleyin:
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

Sudo apt update
Sudo apt install rclone füzyon3 -

2. Anonim bir S3 uzaktan oluşturun
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

rclone  configure create goes17 s3 \\
Sağlayıcı AWS \\
Bölge us-east-1 \\
Konum_constraint us-east-1 \\
Env_auth false \\
anonim gerçek

3. Bunu test edin.
–———————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

rclone lsd 17:noa-goes17 | Baş kafa başı

4. Veriler için bir dağ noktası oluşturun
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

Sudo mkdir -p /mnt /goes17
Sudo $USER:$USER /mnt/goes17

5. Verilerin Dağı. (Bu süreç Foreground'da çalışır, bu yüzden bazı çıktı gösterecektir ve orada oturacaktır.) 
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

rclone -vbu 17:noa-goes17 /mnt /goes17 \\
-read-only \\
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

6. Sunucuda yeni bir sekme açın ve kontrol edin
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

ls /mnt/goes17 | Baş kafa başı

7. Bu verilerin erişilebilir olabileceğini kontrol edin
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
cd /mnt/goes17/ABI-L1b-RadC/2023/010/15
ncdump -h OR_ABI-L1b-RadC-M6C16_G17_s20230101536138_e202301015414_c20230101541461 .nc 
```
netcdf OR_ABI-L1b-RadC-M6C16_G17_s20230101536138_e20230101536138_c20230101541461 {
dimensions:
y = 1500 ;
x = 2500 ;
number_of_time_bounds = 2 ;
band = 1 ;
number_of_image_bounds = 2 ;
num_star_looks = 24 ;
variables:
short Rad(y, x) ;
Rad:_FillValue = 1023s ;
Rad:long_name = "ABI L1b Radiances" ;
Rad:standard_name = "toa_outgoing_radiance_per_unit_wavenumber" ;
Rad:_Unsigned = "true" ;
Rad:sensor_band_bit_depth = 10b ;
Rad:valid_range = 0s, 1022s ;
Rad:scale_factor = 0.1760585f ;
Rad:add_offset = -5.2392f ;
Rad:units = "mW m-2 sr-1 (cm-1)-1" ;
Rad:resolution = "y: 0.000056 rad x: 0.000056 rad" ;
Rad:coordinates = "band_id band_wavelength t y x" ;
Rad:grid_mapping = "goes_imager_projection" ;
Rad:cell_methods = "t: point area: point" ;
Rad:ancillary_variables = "DQF" ;
.
.
.
.
```
Sonuç şaşırtıcı bir şekilde geri döndü, özellikle de kurulumumuz dünyadaki en hızlı boruya sahip değil.

8. Sistem servisine girin (Kullanıcı için uygun olarak değişiklik) :
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

a. Sistemli bir birim oluşturun:

Sudo nano / etc/systemd/system/rclone-goes17.service

Ve girin:

[Unit]
Açıklama =Rclone Mount for GOES17 public S3
After=network-online .tar alın

[Hizmet]
Tür =simple
User =ubuntu
ExecStart=/usr/bin/rclone Mount 17:noa-goes17 /mnt/goes17 \\
-read-only \\
-vfs-cache-mode full \\
-vfs-cache-max-size 1G \\
-vfs-cache-poll-intervalval 1m
-vfs-read-chunk-size 64M \\
-vfs-read-chunk-size-limit 1G \\
-vfs-read-ahead 256M \\
-buffer-size 64M \\
-dir-cache-time 24h \\
-attr-timeout 1s \\
-no-modtime \\
-s3-no-check-bucket
Exec Dur =/bin/getrven3 -u /mnt /goes17
Restart=always
RestartSec=10

[Install]
=multi-user .tar alın

b. Hizmeti enable ve başlayın:

Sudo systemctl daemon-reload
Sudo sistemik etkinleştirin -şimdi rclone-goes17

c. Test Testi

sistemik durum rclone-goes17
ls /mnt/goes17 | Baş kafa başı



Umarım bu insanlar için kullanım olacaktır. Google Cloud Platform'da bazı başarılarla hiyerarşik bir isim alanı olan bir kovayla ölçüm yapıyoruz. Bir rclone avantajı (Bunun yanı sıra, satıcı spesifik olmayan) Performansı optimize etmek için daha fazla ayara sahip olmasıdır. Özellikle yerel bir yerel hareket ediyorsanız ERDDAP™ Buluta göre, bu geçiş neredeyse sorunsuz hale getirebilir.
