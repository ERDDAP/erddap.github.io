Dette indhold er baseret på en [besked fra Roy Mendelssohn til te ERDDAP Brugere gruppe](https://groups.google.com/g/erddap/c/zZUt6PKfkoI/m/expZ3UkkBAAJ) .

For nylig har vi fået en række forespørgsler, der søger hjælp med at få adgang til filer på AWS S3 i ERDDAP™ . Først, ERDDAP™ version 2.29 vil have forbedret S3 adgang, som skal arbejde med ikke-AWS objekt butikker også. (Tak Seth&#33;) . Men jeg har tidligere nævnt om at bruge et FUSE-baseret system til at gøre S3-butikken vises som et filsystem på din server eller VM.

En måde at gøre dette på er at bruge "rclone". (https://rclone.org/) . Fordelen ved at bruge rclone med ERDDAP TM er, at rclone håndterer alle samspillet med S3, så datasæt typer som EDDGrid FraNcFiles kan bruges direkte, som hvis der er lokale filer. Det betyder, at du kun skal finde ud af, hvordan du opsætter rclone for at få adgang til din objekt butik, og resten er bare normale Linux type opsætninger.

Nu ville jeg blive genkaldt, hvis jeg lige forlod det på det, og ikke give et eksempel. I det følgende vil jeg anonymt montere følgende NOAA Goes17 data, der er på en offentlig tilgængelig AWS S3 butik på en af vores Ubuntu-servere, I den første opsætning vil rclone-processen køre i forgrunden for at gøre det lettere at teste, at alt fungerer, og så vil jeg diskutere, hvordan man forvandler i en tjeneste, der kører i baggrunden. Bemærk, at i hvad der er nedenfor, cachen er indstillet til 1 GB. Forestillingen kan godt forbedres ved at gøre cachen meget større, sige 5 GB-10 GB eller endnu større. Også indstillingerne er mine gætter på, hvad der kan optimere ydeevnen, men kan ikke være de optimale for dem for ERDDAP™ .


1. Installer den nødvendige software:
——————————————————————————

sudo apt opdatering
sudo apt installation rclone sikring3 -y

2. Opret en anonym S3 fjernbetjening
—————————————————————————————————

rclone config skaber går17 s3 \\
udbyder AWS \\
region us-øst-1 \\
Beliggenhed_constraint us-øst-1 \\
env_auth falsk \\
anonym sand

3. Test det.
————————

rclone lsd går17:noaa-goes17 | Hovedhoved

4. Opret et monteringspunkt for dataene
—————————————————————————————————

sudo mkdir -p /mnt/goes17
Sudo kjole $USER:$USER /mnt/goes17

5. Montering af data. (Bemærk denne proces kører i forgrunden, så det vil vise nogle output og sidde der) 
————————————

rclone -vvv mount går17:noaa-goes17 /mnt/goes17 \\
--læs kun \\
--vfs-cache-mode fuld \\
--vfs-cache-max-size 1G \\
--vfs-cache-poll-interval 1m \\
--vfs-read-chunk-size 64M \\
--vfs-read-chunk-size-grænse 1G \\
--vfs-read-ahead 256M \\
--buffer-size 64M \\
--dir-cache-time 24h \\
--attr-timeout 1s \\
--no-modtime

6. Åbn en ny fane på serveren og kontroller
——————————————————————————————————————

l/mnt/goes17 | Hovedhoved

7. Tjek, at data kan tilgås
———————————————————————————————
CD/mnt/goes17/ABI-L1b-RadC/2023/010/15
ncdump -h Supplerende oplysninger om OR_ABI-L1b-RadC-M6C16_G17_s20230101536138_e20230101536138_c20230101541461 .nc 
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
Resultatet blev vendt overraskende hurtigt, især da vores installation ikke har det hurtigste rør i verden.

8. Gør dig i en systemtjeneste (Ændre som passende for brugeren osv) :
————————————————————————

a. Opret en systemeret enhed:

sudo nano /etc/systemd/system/rclone-goes17.service

Og indtast:

[Unit]
Beskrivelse=Rclone mount til GOES17 offentlige S3
Efter=netværk-online .tar få få få

[Service]
Type=simple
Bruger=ubuntu
Udførelse Start=/usr/bin/rclone mount går17:noaa-goes17 / mnt/goes17 \\
--læs kun \\
--vfs-cache-mode fuld \\
--vfs-cache-max-size 1G \\
--vfs-cache-poll-interval 1m \\
--vfs-read-chunk-size 64M \\
--vfs-read-chunk-size-grænse 1G \\
--vfs-read-ahead 256M \\
--buffer-size 64M \\
--dir-cache-time 24h \\
--attr-timeout 1s \\
--no-modtime \\
--s3-no-check-bucket
UdførelseStop=/bin/fusermount3 -u /mnt/goes17
Genstart=always
GenstartSec=10

[Install]
Ønsket By=multi-bruger .tar få få få

b. Aktivér tjenesten og start:

sudo systemctl daemon-reload
sudo systemctl muliggør --nu rclone-goes17

c. Test af test

Systemctl status rclone-goes17
l/mnt/goes17 | Hovedhoved



Forhåbentlig vil det være at bruge til mennesker. Vi har været test ved hjælp af gcsfuse på Google Cloud Platform med en spand, der har hierarkisk navneplads med nogle succes. En fordel ved rclone (Desuden er det ikke sælger specifik) er, at det har flere indstillinger til at optimere ydeevnen. Især hvis du flytter en lokal ERDDAP™ til skyen, kan dette gøre overgangen næsten sømløs.
