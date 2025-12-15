Ang nilalamang ito ay batay sa isang [mensahe mula kay Roy Mendelssohn hanggang sa ERDDAP grupong gumagamit](https://groups.google.com/g/erddap/c/zZUt6PKfkoI/m/expZ3UkkBAAJ) .

Kamakailan, kami'y nakakakuha ng maraming tanong na humihingi ng tulong sa paglalagay ng mga file sa WAS S3 ERDDAP™ . Una, ERDDAP™ Ang bersyong 2.29 ay magpapabuti ng S3 access na dapat ay gumagana rin sa mga tindahang non-AWS object. (Salamat sa kaniya&#33;) . Subalit nabanggit ko na kanina ang tungkol sa paggamit ng isang sistemang nakabase sa FUSE upang ang tindahan ng S3 ay lumitaw na parang isang filesystem sa iyong server o VM.

Ang isang paraan upang magawa ito ay ang paggamit ng “rclone”. (https://rclone.org/) . rclone ay nagtatrabaho sa maraming iba't ibang sistema ng S3, at maraming iba't ibang setting upang maging kapaki - pakinabang ang paggawa, pati na ang pagtatakda ng sukat ng cache, na inaasahang makababawas sa ilang mabilis na parusa mula sa pagtakbo ng FUSE. Ang bentaha ng paggamit ng rclone ERDDAP TM na pinangangasiwaan ng rclone ang lahat ng interaksiyon sa S3, kaya ang mga uri ng dataset tulad ng EDDGrid Ang mga FromNcFile ay maaaring tuwirang gamitin na parang may mga lokal na file. Ibig sabihin, kailangan mo lang malaman kung paano mag-setup rclone para ma-access ang iyong object store, at ang natitira ay normal lang na Linux type settups.

Ngayon ako ay nagkakamali kung iiwan ko lamang iyon, at hindi ako magbibigay ng halimbawa. Sa mga sumusunod ako'y pupunta sa bundok na walang pangalan NOAA Goes17 data na nasa pampublikong madaling makuhang AWS S3 store sa isa sa ating Ubuntu servers, Sa panimulang setup ang proseso ng rclone ay tatakbo upang gawing mas madali ang pagsubok na ang lahat ng bagay ay gumagana, at pagkatapos ay tatalakayin ko kung paano gawin ang ii na isang serbisyo na tumatakbo sa likuran. Pansinin na sa nasa ibaba, ang cache ay inilalagay sa 1GB. Ang performance ay maaaring pagandahin sa pamamagitan ng paggawa sa cache na mas malaki, sabi ng 5GB-10GB o mas malaki pa. Ang mga tagpo ay mga hula ko rin sa kung ano ang maaaring maging kapaki - pakinabang na pagtatanghal, subalit maaaring hindi siyang pinakamabuti para sa ERDDAP™ .


1. Iluklok ang kinakailangang software:
— Eigitorisensiyailerićićixićixixixić

sudo apt update
sudo apt i-install ang ruclone fuse3 -y

2. Gumawa ng isang di - kilalang S3 na Malayo
— Eiperifimixićićixićixixisićixixisić

Ang rclone confision ay lumilikha ng we17 s3 \\
tagapaglaan AWS \\
rehiyon ng we-east-1 \\
kinaroroonan_constraint amin-east-1 \\
env_auth false \\
Hindi kilalang totoo

3. Subukin iyan.
— Eipioxisensiya

Ang rclone lsd go17:noa-goes17 | ulo

4. Gumawa ng mas malaking punto para sa impormasyon
— Eiperifimixićićixićixixisićixixisić

sudo mkdir -p /mnt/goes17
sudo chown $USER:$USER /mnt/goes17

5. Ilagay ang datos. (Pansinin na ang prosesong ito ay nasa unahan, kaya magpapakita ito ng kaunting output at uupo roon) 
— Eipioxisensiya

rclone–vv mount go17:noa-goes17 /mnt/goes17 \\
-- Basahin-lamang \\
--vfs-cache-mode puno \\
-vfs-cache-max-size 1G \\
-vfs-cache-poll-interval 1m \\
-vfs-read-chunk-size 64M \\
-vfs-read-chunk-size-limit 1G \\
-vfs-read-ahead 256M \\
--buffer-size 64M \\
-dir-cache-time 24h \\
-atr-timeout 1s \\
--no-modtime

6. Buksan ang isang bagong task sa server at tingnan
— Eiperiximanixićixićixiićixixisićixisićixić

ls /mnt/goes17 | ulo

7. Suriin na maaaring ma-access ang datos
— Eiperifimixićićixićixixixićixixixić
cd /mnt/goes17/ABI-L1b-RadC/2023/010/15
Iprito -h O_ABI-L1b-RadC-M6C16_G17_s20230101536138_e20230101536138_c20230101541461 .nc 
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
Ang resulta ay biglang ibinalik, lalo na yamang ang aming instalasyon ay walang pinakamabilis na tubo sa daigdig.

8. Gawing isang serbisyo ang sistema (Pagbabago bilang angkop para sa gumagamit atbp) :
— Eipioximanificitificitixić

isa. Gumawa ng isang sistemadong yunit:

sudo nano /etc/sistemad/sistema/rclone-goes17.service

At pumasok:

[ Talababa]
Exposure=Rclone mount para sa GES17 pampubliko S3
Pagkatapos ng=network-online .tar tumatanggap

[ Talababa]
Type=simple
User=ubuntu
PROPESYSET=/usr/bin/rclone mount gob17:noa-goes17 /mnt/goes17 \\
-- Basahin-lamang \\
--vfs-cache-mode puno \\
-vfs-cache-max-size 1G \\
-vfs-cache-poll-interval 1m \\
-vfs-read-chunk-size 64M \\
-vfs-read-chunk-size-limit 1G \\
-vfs-read-ahead 256M \\
--buffer-size 64M \\
-dir-cache-time 24h \\
-atr-timeout 1s \\
--no-modtime \\
-s3-no-check-bucket
PROPS top=/bin/fusermount3 -u /mnt/goes17
Restaurant= Lagi
RestartSec=10

[Install]
Gusto Sa Pamamagitan ng=Russ-user .tar tumatanggap

b. Masiyahan sa paglilingkod at magsimula:

sudo systemctl daemon-reload
Ang sudo systemctl ay nagpapangyari --ngayon rclone-goes17

c. Pagsubok

systemctl status rclone-goes17
ls /mnt/goes17 | ulo



Sana'y magamit ito ng mga tao. Kami'y sumusubok na gumamit ng gcsfise sa Google Cloud Platform sa pamamagitan ng isang timba na may pangalang espasyo na may ilang tagumpay. Isang bentaha ng rclone (Bukod pa riyan ito ay hindi espisipikong nagtitinda) ay na ito'y may higit na mga pagkakataon upang gawin ang pinakamahusay na pagtatanghal. Lalo na kung ikaw ay lumilipat sa isang lugar ERDDAP™ sa ulap, ito'y maaaring gumawa sa pagbabago na halos walang pag - aatubili.
