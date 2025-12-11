Detta innehåll är baserat på en [från Roy Mendelssohn till ERDDAP användare grupp](https://groups.google.com/g/erddap/c/zZUt6PKfkoI/m/expZ3UkkBAAJ) .

Nyligen har vi fått ett antal undersökningar som söker hjälp med att komma åt filer på AWS S3 i ERDDAP™ . Först, ERDDAP™ version 2.29 kommer att ha förbättrat S3-åtkomst som bör fungera med icke-AWS-objektbutiker. (Tack Seth&#33;) . Men jag har nämnt tidigare om att använda ett FUSE-baserat system för att göra S3-butiken verkar som ett filsystem på din server eller VM.

Ett sätt att göra detta är att använda "rclone". (https://rclone.org/) rclone fungerar på många olika S3-system, och har många olika inställningar för att optimera prestanda, inklusive att ställa in en cache-storlek, vilket förhoppningsvis kan kompensera några av hastighetsstraffet från att köra FUSE. Fördelen med att använda rclone med ERDDAP TM är att rclone hanterar all interaktion med S3, så datasettyper som EDDGrid FrånNcFiles kan användas direkt som om det finns lokala filer. Detta innebär att du bara behöver räkna ut hur du ställer in klon för att komma åt din objektbutik, och resten är bara vanliga Linux-typinställningar.

Nu skulle jag vara remiss om jag bara lämnade den där, och inte ge ett exempel. I följande ska jag anonymt montera NOAA Goes17 data som finns på en allmänt tillgänglig AWS S3-butik på en av våra Ubuntu-servrar, I den första installationen kommer rclone-processen att köras i förgrunden för att göra det lättare att testa att allt fungerar, och sedan kommer jag att diskutera hur man gör ii till en tjänst som körs i bakgrunden. Observera att i vad som är under, är cache inställd på 1 GB. Prestanda kan mycket väl förbättras genom att göra cache mycket större, säger 5GB-10GB eller ännu större. Även inställningarna är mina gissningar på vad som kan optimera prestanda, men kanske inte är de optimala för ERDDAP™ .


1. Installera den nödvändiga programvaran:
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

sudo apt update
sudo apt installera rclone fuse3 -Y

2. Skapa en anonym S3-fjärrkontroll
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

Rclone config skapar går 17 s3
Leverantör AWS
regionen us-east-1
place_constraint us-east-1
Env_auth falsk \\
anonym sann

3. Testa det.
——————————

rclone lsd går 17:noaa-goes17 | huvudet

4. Skapa en monteringspunkt för data
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

sudo mkdir -p /mnt/goes17
Sudo chown $USER:$USER /mnt/goes17

5. Montera data. (Observera att denna process går i förgrunden, så det kommer att visa lite utgång och sitta där) 
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

rclone -vv montering går17:noaa-goes17 /mnt / goes17
Läs-bara \\
vfs-cache-mode full \\
Vfs-cache-max-storlek 1G
vfs-cache-poll-intervall 1m \\
Vfs-read-chunk-size 64M \\
Vfs-read-chunk-size-limit 1G
Vfs-read-ahead 256M \\
Buffertstorlek 64M
Dir-cache-time 24h
-attr-timeout 1s
Ingen-modtime

6. Öppna en ny flik på servern och kontrollera
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

Ls /mnt/goes17 | huvudet

7. Kontrollera att data kan nås
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
cd/mnt/goes17/ABI-L1b-RadC/2023/010/15
ncdump -H OR_ABI-L1b-RadC-M6C16_G17_s202301536138_e20230101536138_c2023010101541461 .nc 
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
Resultatet returnerades överraskande snabbt, särskilt eftersom vår installation inte har världens snabbaste rör.

8. Gör till en systemtjänst (ändra efter behov för användaren etc.) Från:
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

a. Skapa en systemad enhet:

sudo nano /etc/systemd/system/rclone-goes17.service

Och gå in:

[Unit]
Beskrivning=Rclone montering för GOES17 offentliga S3
After=network-online .tar Få

[Service]
Typ=simple
Användare=ubuntu
ExecStart=/usr/bin/rclone montering går 17:noaa-goes17/mnt/goes17
Läs-bara \\
vfs-cache-mode full \\
Vfs-cache-max-storlek 1G
vfs-cache-poll-intervall 1m \\
Vfs-read-chunk-size 64M \\
Vfs-read-chunk-size-limit 1G
Vfs-read-ahead 256M \\
Buffertstorlek 64M
Dir-cache-time 24h
-attr-timeout 1s
Ingen-modtime \\
S3-no-check-bucket
ExecStop=/bin/fusermount3 -u/mnt/goes17
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user .tar Få

b. Aktivera service och start:

Sudo Systemctl daemon-reload
sudo systemctl möjliggör - nu rclone-goes17

c. c. Testa test

Systemctl status rclone-goes17
Ls /mnt/goes17 | huvudet



Förhoppningsvis kommer detta att vara till nytta för människor. Vi har testat med hjälp av gcsfuse på Google Cloud Platform med en hink som har hierarkiskt namnutrymme med viss framgång. En fördel med rclone (Förutom att det inte är leverantörsspecifikt) är att den har fler inställningar för att optimera prestanda. Särskilt om du flyttar en lokal ERDDAP™ till molnet kan detta göra övergången nästan sömlös.
