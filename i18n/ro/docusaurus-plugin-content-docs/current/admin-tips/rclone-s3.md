Acest conţinut se bazează pe [mesaj de la Roy Mendelssohn la ERDDAP grupul de utilizatori](https://groups.google.com/g/erddap/c/zZUt6PKfkoI/m/expZ3UkkBAAJ) .

Recent, am primit o serie de anchete în căutarea de ajutor cu accesarea fișierelor pe AWS S3 în ERDDAP™ . În primul rând, ERDDAP™ versiunea 2.29 va avea acces S3 îmbunătățit, care ar trebui să lucreze cu magazine de obiecte non-AWS, de asemenea. (Mulţumesc Seth&#33;) . Dar am menționat anterior despre utilizarea unui sistem bazat pe FUSE pentru a face magazinul S3 să apară ca un sistem de fișiere pe server sau VM.

O modalitate de a face acest lucru este de a utiliza  (https://rclone.org/) . rclone funcționează pe mai multe sisteme diferite S3, și are o mulțime de setări diferite pentru a optimiza performanța, inclusiv stabilirea unei dimensiuni cache, care sperăm că poate compensa o parte din pedeapsa de viteză de funcționare FUSE. Avantajul utilizării rclonei cu ERDDAP TM este că rclone se ocupă de toate interacțiunile cu S3, astfel încât tipuri de seturi de date ca EDDGrid De laNcFiles pot fi folosite direct ca și în cazul în care există fișiere locale. Acest lucru înseamnă că trebuie doar să dau seama cum să setați rclone pentru a accesa magazinul de obiecte, iar restul este doar setup-uri normale Linux tip.

Acum, aș fi neglijent dacă l-am lăsat la asta, și nu dau un exemplu. În următoarele am de gând să monta anonim NOAA Goes17 date care este pe un magazin AWS S3 accesibil publicului pe unul dintre serverele noastre Ubuntu, În configurarea inițială procesul rclone va fi difuzate în prim-plan pentru a facilita testarea că totul este de lucru, și apoi voi discuta cum să se transforme ii într-un serviciu care rulează în fundal. Rețineți că în ceea ce este mai jos, cache-ul este setat la 1GB. Performanta poate fi imbunatatita prin facerea cache-ului mult mai mare, sa zicem 5GB-10GB sau chiar mai mare. De asemenea, setările sunt presupunerile mele la ceea ce poate optimiza performanța, dar nu pot fi cele optime pentru ERDDAP™ .


1. Instalați software-ul necesar:


sudo apt update
sudo apt instala rclone fitil3 -y

2. Creează o telecomandă S3 anonimă


RClone config create goes17 s3
furnizor AWS \\
regiunea ne-est-1
locație_constrânge-ne-est-1 \\
Env_auth fals
anonim adevărat

3. Testează asta.


Rclone lsd goes17:noaa-goes17 | cap

4. Creează un punct de montare pentru date


sudo mkdir -p/mnt/goes17
sudo chow $USER:$USER /mnt/goes17

5. Montează datele. (Observați acest proces rulează în prim-plan, astfel încât va arăta unele ieșire și stai acolo) 


Rclone -vv Mount goes17:noaa-goes17 /mnt/goes17 \\
--citeste-doar \\
--vFS-cache-mod complet \\
--vfs-cache-max-size 1G\\
--vfs-cache-poll-interval 1m
--vfs-read-chunk-size 64M \\
--vfs-read-chunk-size-limit 1G \\
--vfs-citire-force 256M
--Buffer-size 64M\\
--dir-cache-time 24h \\
--attr-timeout 1s \\
--no-modtime

6. Deschide o filă nouă pe server și verifică


Este/mnt/goes17 | cap

7. Verificați dacă datele pot fi accesate

cd/mnt/goes17/ABI-L1b-RadC/2023/010/15
ncdump -h OR_ABI-L1b-RadC-M6C16_G17_s20230011536138_e202301536138_c202330101541461 .nc 
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
Rezultatul a fost returnat surprinzător de repede, mai ales că instalarea noastră nu are cea mai rapidă conductă din lume.

8. Transformă într-un serviciu de sistem (se modifică după caz pentru utilizator etc.) :


a. Creează o unitate de sistem:

sudo nano /etc/sistem/sistem/rclone-goes17.service

Și introduceți:

[Unit]
Descriere=Rcone mount for GOES17 public S3
After=network-online .tar Ia

[Servicii]
Tip=simplu
Utilizator = ubuntu
ExecStart=/usr/bin/rclone mount goes17:noaa-goes17 /mnt/goes17 \\
--citeste-doar \\
--vFS-cache-mod complet \\
--vfs-cache-max-size 1G\\
--vfs-cache-poll-interval 1m
--vfs-read-chunk-size 64M \\
--vfs-read-chunk-size-limit 1G \\
--vfs-citire-force 256M
--Buffer-size 64M\\
--dir-cache-time 24h \\
--attr-timeout 1s \\
--no-modtime \\
--s3-no-check-bucket
ExecStop=/bin/fusermount3 -u /mnt/goes17
Restart=întotdeauna
RestartSec=10

[Install]
WantedBy=multi-user .tar Ia

b. Activează serviciul și începe:

sudo systemctl daemon-reload
sudo systemctl permite - acum rclone-goes17

c. Test

status sistemctl rclone-goes17
Este/mnt/goes17 | cap



Să sperăm că asta va fi de folos oamenilor. Am fost de testare folosind gcsfuse pe Google Cloud Platform cu o găleată care are spațiu nume ierarhic cu unele succes. Un avantaj al rclonei (În plus, nu este specific vânzătorului.) este că are mai multe setări pentru a optimiza performanța. Mai ales dacă mutați un local ERDDAP™ la nor, acest lucru poate face tranziția aproape fără sudură.
