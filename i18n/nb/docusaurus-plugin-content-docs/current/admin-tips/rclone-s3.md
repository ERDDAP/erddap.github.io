Dette innholdet er basert på en [melding fra Roy Mendelssohn til ERDDAP brukergruppe](https://groups.google.com/g/erddap/c/zZUt6PKfkoI/m/expZ3UkkBAAJ) ..

Nylig har vi fått en rekke henvendelser som søker hjelp med å få tilgang til filer på AWS S3 i ERDDAP™ .. Først, ERDDAP™ versjon 2.29 vil ha forbedret S3-tilgang som bør fungere med ikke-AWS-objektbutikker også. (Takk Seth&#33;) .. Men jeg har tidligere nevnt om bruk av et FUSE-basert system for å få S3-butikken til å vises som et filsystem på serveren eller VM.

En måte å gjøre dette på er å bruke \"Rocklone\". (https://rclone.org/) . rclone fungerer på mange forskjellige S3-systemer, og har mange forskjellige innstillinger for å optimalisere ytelsen, inkludert å sette en cachestørrelse, som forhåpentligvis kan kompensere for noen av hastighetsstraffene fra å kjøre FUSE. Fordelen ved å bruke rclone med ERDDAP TM er at rclone håndterer all samhandling med S3, så datasett typer som EDDGrid FraNcFiles kan brukes direkte som om det er lokale filer. Dette betyr at du bare trenger å finne ut hvordan du konfigurerer rclone for å få tilgang til objektbutikken din, og resten er bare normale Linux-typeoppsett.

Nå ville jeg bli savnet hvis jeg bare forlot det på det, og ikke gi et eksempel. I det følgende skal jeg anonymt montere NOAA Goes17 data som er på en offentlig tilgjengelig AWS S3-butikk på en av våre Ubuntu-servere, i den første oppsettet vil rclone-prosessen kjøres i forgrunnen for å gjøre det lettere å teste at alt fungerer, og så vil jeg diskutere hvordan du gjør ii til en tjeneste som kjører i bakgrunnen. Merk at i det som er under, er cache satt til 1 GB. Ytelse kan forbedres ved å gjøre cache mye større, sier 5GB-10GB eller enda større. Også innstillingene er mine gjetninger på hva som kan optimalisere ytelsen, men kan ikke være de optimale for ERDDAP™ ..


1. Installer den nødvendige programvaren:
———————————————————

sudo apt-oppdatering
sudo apt installere rclone sikring3 -y

2. Opprett en anonym S3-fjerning
——————————————————————

Rclone oppsett oppretter goes17 s3 \\
leverandør AWS-
Region us-east-1 \\
location_begrense oss-øst-1 \\
Env_auth falsk \\
anonym sann

3. Test det.
——————

rclone lsd goes17:noaa-goes17 | hodet

4. Opprett et monteringspunkt for dataene
——————————————————————

sudo mkdir -p /mnt/goes17
sudo chown $USER: $USER /mnt/goes17

5. Monter dataene. (Merk at prosessen kjører i forgrunnen, slik at den vil vise noe utdata og sitte der) 
——————————

rclone -vv mount goes17:noaa-goes17 /mnt/goes17 \\
--lesbar -
--vfs-cache-mode full \\
--vfs-cache-max-størrelse 1G \\
--vfs-cache-poll-interval 1m
--vfs-les-chunk-størrelse 64M \\
--vfs-les-chunk-size-limit 1G \\
--vfs-read-ahead 256M
--buffer-størrelse 64M \\
--dir-cache-tid 24h \\
--attr-timeout 1s \\
--no-modtime

6. Åpne en ny fane på serveren og sjekk
———————————————————————

is /mnt/goes17 | hodet

7. Sjekk at data kan nås
—————————————————
cd /mnt/goes17/ABI-L1b-RadC/2023/010/15
ncdump -h OR_ABI-L1b-RadC-M6C16_G17_s20230101536138_e20230101536138_c202301151461 .nc 
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
Resultatet ble returnert overraskende raskt, spesielt siden installasjonen vår ikke har det raskeste røret i verden.

8. Ta i bruk en systemtjeneste (endres etter behov for bruker etc) :)
————————————————

a. Opprette en systemenhet:

sudo nano /etc/system/system/rclone-goes17.service

Og skriv inn:

[Eining]
Beskrivelse=Rclone montering for GOES17 offentlig S3
After=network-online .tar Få

[Service]
Type=simpel
Bruker=ubuntu
ExecStart=/usr/bin/rclone mount goes17:noaa-goes17 /mnt/goes17 \\
--lesbar -
--vfs-cache-mode full \\
--vfs-cache-max-størrelse 1G \\
--vfs-cache-poll-interval 1m
--vfs-les-chunk-størrelse 64M \\
--vfs-les-chunk-size-limit 1G \\
--vfs-read-ahead 256M
--buffer-størrelse 64M \\
--dir-cache-tid 24h \\
--attr-timeout 1s \\
--no-modtime-
--s3-no-check-buket
ExecStop=/bin/fusermount3 -u /mnt/goes17
Start om = alltid
Start omSec=10

[Installer]
Wantedby=fleirtynner .tar Få

b. Aktiver tjenesten og start:

sudo systemctl nissen- reload
sudo systemctl aktivere --now rclone-goes17

C. Test

systemktl status rclone-goes17
is /mnt/goes17 | hodet



Forhåpentligvis vil dette være til bruk for mennesker. Vi har testet med gcsfuse på Google Cloud Platform med en bøtte som har hierarkisk navneplass med en viss suksess. En fordel med rclone (Foruten at det ikke er leverandørspesifikk) Det har flere innstillinger for å optimalisere ytelsen. Spesielt hvis du flytter lokal ERDDAP™ Til skyen kan det gjøre overgangen nesten sømløs.
