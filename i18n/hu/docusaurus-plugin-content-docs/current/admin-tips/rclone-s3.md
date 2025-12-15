Ez a tartalom egy [Roy Mendelssohn üzenete a ERDDAP felhasználók csoport](https://groups.google.com/g/erddap/c/zZUt6PKfkoI/m/expZ3UkkBAAJ) ...

Nemrégiben számos vizsgálatot kaptunk, amelyek segítséget kérnek az AWS S3 fájlokhoz való hozzáféréshez ERDDAP™ ... Először, ERDDAP™ A 2.29 verziója javította az S3 hozzáférést, amely nem AWS objektumboltokkal is működik. (Köszönöm Seth&#33;) ... De korábban már említettem, hogy FUSE alapú rendszert használok, hogy az S3 áruház olyan legyen, mint egy fájlrendszer a szerverén vagy a VM-en.

Az egyik módja annak, hogy ezt megtegyük, "kloni". (https://rclone.org/) . rclone számos különböző S3 rendszeren dolgozik, és sok különböző beállítással rendelkezik a teljesítmény optimalizálására, beleértve a gyors méret beállítását, amely remélhetőleg ellensúlyozhatja a gyors büntetést a FUSE futtatásától. A rclone használatának előnye ERDDAP TM az, hogy a rclone kezeli az összes interakciót az S3-val, így az adatkészlet típusai, mint például EDDGrid FromNcFiles lehet használni közvetlenül, mintha vannak helyi fájlokat. Ez azt jelenti, hogy csak meg kell találni, hogyan kell beállítani a riklont, hogy hozzáférjen az objektumbolthoz, és a többi csak normális Linux típusú beállítás.

Most visszautasítanám, ha csak erre hagynám, és nem adnék példát. Az alábbiakban anonim módon fogom felszerelni a NOAA Goes17 adatok, amelyek egy nyilvános hozzáférhető AWS S3 áruházban az egyik Ubuntu szerverünkön, A kezdeti beállításban a rclone folyamat fut az előtérben, hogy könnyebben tesztelje, hogy minden működik, majd megvitatom, hogyan kell fordítani ii. egy szolgáltatás fut a háttérben. Vegye figyelembe, hogy az alábbiakban a cache 1GB-ra van beállítva. A teljesítmény javítható azzal, hogy a gyorsítótár sokkal nagyobb, mondjuk 5GB-10GB vagy még nagyobb. A beállítások az én guesseim, hogy mi optimalizálja a teljesítményt, de nem lehet az optimális. ERDDAP™ ...


1. Telepítse a szükséges szoftvert:
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

sudo apt frissítés
sudo apt install rclone fuse3 - Igen

2. Hozzon létre egy anonim S3 távoli
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

Rune konfiguráció 17 s3 \\
szolgáltató AWS \\
régió us-east-1 \\
place_constraint us-east-1 \\
dalszöveg: Env_auth Hase
anonim igaz

3. Teszteld ezt&#33;
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

rclone lsd megy17:noa-goes17 | fejjel

4. Hozzon létre egy hegyi pontot az adatokhoz
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

sudo mkdir -p /mnt/goes17
sudo $USER: $USER /mnt / goes17

5. Hegyesítse az adatokat. (Ne feledje, hogy ez a folyamat az előtérben fut, így megmutatja néhány kimenetet és ott ül) 
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

rclone -vv hegy megy17:noa-goes17 /mnt/goes17 \\
- csak olvasni
--vfs-cache-mode teljes \\
--vfs-cache-max méret 1G \\
--vfs-cache-poll-interval 1m \\
--vfs-read-chunk méret 64M \\
Vfs-read-chunk-size-limit 1G \\
--vfs-read-ahead 256M \\
- puffer méretű 64M \\
- Dir-cache-time 24h \\
- attr-timeout 1s \\
- nem-modtime

6. Nyisson meg egy új lapot a szerveren, és ellenőrizze
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

ls /mnt/goes17 | fejjel

7. Ellenőrizze, hogy az adatok elérhetők
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
cd/mnt/goes17/ABI-L1b-RadC/2023/010/15
ncdump -h OR_ABI-L1b-RadC-M6C16_G17_s20230101536138_e20230101536138_c202301015461 .nc 
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
Az eredmény meglepően gyorsan tért vissza, különösen mivel a telepítésünk nem rendelkezik a világ leggyorsabb csőjével.

8. Készüljön be egy rendszer szolgáltatásba (a felhasználó számára megfelelő módosítás stb.) :
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

a. Hozzon létre egy rendszeres egységet:

sudo nano /etc/rendszerd/rendszer/rclone-goes17.service

Belépés:

[[szerkesztés]]]
Leírás = Rune Mount for GOES17 Public S3
After=hálózat-online .tar kap

[Szolgáltatás]
Type=simple
Felhasználó: Ununtu
ExecStart=/usr/bin/rclone hegy megy17:noa-goes17/mnt/goes17 \\
- csak olvasni
--vfs-cache-mode teljes \\
--vfs-cache-max méret 1G \\
--vfs-cache-poll-interval 1m \\
--vfs-read-chunk méret 64M \\
Vfs-read-chunk-size-limit 1G \\
--vfs-read-ahead 256M \\
- puffer méretű 64M \\
- Dir-cache-time 24h \\
- attr-timeout 1s \\
- nem-modtime \\
--s3-no-check-bucket
ExecStop=/bin/fusermount3 -u /mnt/goes17
Restart=mindig
RestartSec=10

[Install]
WantedBy=multi-user .tar kap

b) Engedélyezze a szolgáltatást és indítsa el:

sudo rendszerctl daemon-reload
sudo rendszerctl lehetővé teszi - most rclone-goes17

c. Test

rendszerctl status rclone-goes17
ls /mnt/goes17 | fejjel



Remélhetőleg ez lesz az emberek számára. Gcsfuse segítségével teszteltük a Google Cloud Platformot egy olyan vödörrel, amely hierarchikus névterülettel rendelkezik néhány sikerrel. Az egyik előnye a rclone (azon kívül, hogy nem áruló specifikus) az, hogy több beállítása van a teljesítmény optimalizálására. Különösen, ha egy helyiet mozgatsz ERDDAP™ A felhőbe ez szinte zökkenőmentessé teheti az átmenetet.
