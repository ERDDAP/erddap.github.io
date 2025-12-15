Tento obsah je založen na [Zpráva od Roye Mendelssohna ERDDAP skupina uživatelů](https://groups.google.com/g/erddap/c/zZUt6PKfkoI/m/expZ3UkkBAAJ) .

Nedávno jsme dostali řadu dotazů, které hledají pomoc s přístupem k souborům na AWS S3 v ERDDAP™ . Zaprvé, ERDDAP™ verze 2.29 bude mít lepší S3 přístup, který by měl pracovat i s non-AWS objekty obchody. (Díky, Sethe&#33;) . Ale už jsem se zmínil o použití systému FUSE, aby se obchod S3 objevil jako souborový systém na vašem serveru nebo VM.

Jedním ze způsobů, jak toho dosáhnout, je použít ? (https://rclone.org/) . rclone pracuje na mnoha různých systémech S3 a má mnoho různých nastavení pro optimalizaci výkonu, včetně nastavení velikosti cache, které, doufejme, může vyrovnat některé z pokut rychlosti z provozu FUSE. Výhoda použití rclone s ERDDAP TM je, že rclone zpracovává všechny interakce s S3, takže typy souborů dat jako EDDGrid FromNcFiles lze použít přímo, jako by tam byly místní soubory. To znamená, že stačí přijít na to, jak nastavit rclone pro přístup k obchodu s objekty, a zbytek je jen normální nastavení typu Linux.

Byl bych nedbalý, kdybych to nechal být a nedával příklad. V následujícím budu anonymně připojit NOAA Goes17 data, která je na veřejně přístupném AWS S3 úložiště na jednom z našich Ubuntu serverů, V počáteční nastavení bude rclone proces běží v popředí, aby bylo jednodušší testovat, že všechno funguje, a pak budu diskutovat, jak proměnit ii v službu běží v pozadí. Všimněte si, že v tom, co je níže, je cache nastaven na 1GB. Výkon může být dobře posílen tím, že cache mnohem větší, řekněme 5GB-10GB nebo ještě větší. Také nastavení jsou moje odhady o tom, co může optimalizovat výkon, ale nemusí být optimální pro ERDDAP™ .


1. Nainstalujte potřebný software:
?

sudo apt update
sudo apt install rclone fuse3 - y

2. Vytvořit anonymní ovladač S3
?

rclone konfigurovat vytvořit goes17 s3 \\
poskytovatel AWS \\
region us-east-1 \\
lokace_konstrikt us-east-1 \\
env_auth false \\
anonymní pravda

3. Otestuj to.
?

Rclone Isd goes17:noaa-goes17 | hlava

4. Vytvořit místo připojení pro data
?

sudo mkdir -p /mnt/goes17
$USER:$USER /mnt/goes17

5. Připojte data. (Všimněte si, že tento proces běží v popředí, takže to ukáže nějaký výstup a sedět tam) 
?

rclone -vv mount goes17:noaa-goes17 /mnt/goes17 \\
--přečteno pouze \\
--vfs-cache-mode full \\
--vfs-cache-max velikost 1G \\
--vfs-cache-poll-interval 1m \\
--vfs-read-chunk-size 64M \\
--vfs-read-chunk-size-limit 1G \\
--vfs-read-bead 256M \\
--buffer velikost 64M \\
-- dir-cache-time 24h \\
--attr-timeout 1s \\
--no-modtime

6. Otevřít novou kartu na serveru a zkontrolovat
?

ls /mnt/goes17 | hlava

7. Zkontrolujte, zda lze přistupovat k údajům
?
cd /mnt/goes17/ABI-L1b-RadC/2023/010/15
ncdump - H OR_ABI-L1b-RadC-M6C16_G17_s2023010153138_e2023010153138_c20230101541461 .nc 
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
Výsledek se vrátil překvapivě rychle, zejména proto, že naše instalace nemá nejrychlejší potrubí na světě.

8. Vytvořit systémovou službu (upravit podle potřeby pro uživatele atd.) :
?

a. Vytvořit systémovou jednotku:

sudo nano /etc/systemd/system/rclone-goes17.service

A zadejte:

[Jednotka]
Popis=Rclone mount for GOES17 public S3
After=network-online .tar get

[Služba]
Type=simple
Uživatel=ubuntu
ExecStart=/usr/bin/rclone mount goes17:noaa-goes17 /mnt/goes17 \\
--přečteno pouze \\
--vfs-cache-mode full \\
--vfs-cache-max velikost 1G \\
--vfs-cache-poll-interval 1m \\
--vfs-read-chunk-size 64M \\
--vfs-read-chunk-size-limit 1G \\
--vfs-read-bead 256M \\
--buffer velikost 64M \\
-- dir-cache-time 24h \\
--attr-timeout 1s \\
--no-modtime \\
--s3-ne-check-bucket
ExecStop=/bin/fusermount3 -u /mnt/goes17
Restart = vždy
RestartSec=10

[Instalovat]
WantedBy=multi-user .tar get

b. Povolit službu a spustit:

sudo systemctl daemon-reload
sudo systemctl enable --now rclone-goes17

c. Zkouška

status systémuctl rclone-goes17
ls /mnt/goes17 | hlava



Doufejme, že to bude lidem k užitku. Testujeme pomocí gcsfuse na Google Cloud Platform s kbelíkem, který má hierarchické jméno prostor s určitým úspěchem. Jedna výhoda rclonu (Kromě toho, že není konkrétní prodejce) je, že má více nastavení pro optimalizaci výkonu. Zejména pokud se pohybujete místní ERDDAP™ To může učinit přechod téměř bezproblémovým.
