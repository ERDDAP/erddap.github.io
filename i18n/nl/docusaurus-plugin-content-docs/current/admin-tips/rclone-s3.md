Deze inhoud is gebaseerd op een [bericht van Roy Mendelssohn aan de ERDDAP gebruikersgroep](https://groups.google.com/g/erddap/c/zZUt6PKfkoI/m/expZ3UkkBAAJ) .

Onlangs hebben we een aantal vragen op zoek naar hulp met toegang tot bestanden op AWS S3 in ERDDAP™ . Ten eerste: ERDDAP™ versie 2.29 zal hebben verbeterd S3 toegang die zou moeten werken met niet-AWS object winkels ook. (Bedankt Seth&#33;) . Maar ik heb eerder gezegd over het gebruik van een FUSE gebaseerd systeem om de S3 store te laten verschijnen als een bestandssysteem op uw server of VM.

Een manier om dit te doen is gebruik maken van  (https://rclone.org/) . rclone werkt op veel verschillende S3 systemen, en heeft veel verschillende instellingen om de prestaties te optimaliseren, waaronder het instellen van een cache grootte, die hopelijk een deel van de snelheid te compenseren van het uitvoeren van FUSE. Het voordeel van het gebruik van rclone met ERDDAP TM is dat rclone behandelt alle interactie met S3, dus dataset types zoals EDDGrid FromNcFiles kan direct worden gebruikt alsof er lokale bestanden zijn. Dit betekent dat je alleen hoeft uit te zoeken hoe je rclone instelt om toegang te krijgen tot je object store, en de rest is gewoon normale Linux type setups.

Nu zou ik nalatig zijn als ik het daar gewoon bij liet, en geen voorbeeld zou geven. In het volgende ga ik anoniem de NOAA Goes17 gegevens die op een openbare toegankelijke AWS S3 winkel op een van onze Ubuntu servers, In de eerste setup het rclone proces zal worden uitgevoerd in de voorgrond om het gemakkelijker te maken om te testen dat alles werkt, en dan zal ik bespreken hoe om te zetten ii in een dienst die op de achtergrond. Merk op dat in wat hieronder staat, de cache is ingesteld op 1GB. De prestaties kunnen goed worden verbeterd door het maken van de cache veel groter, zeg 5GB-10GB of nog groter. Ook de instellingen zijn mijn gok op wat de prestaties kan optimaliseren, maar misschien niet de optimale voor ERDDAP™ .


1. Installeer de benodigde software:
Wat?

sudo apt update
sudo apt installatie rclone zekering3 -y

2. Een anonieme S3-afstandsbediening aanmaken
Wat?

rclone config create goes17 s3 \\
aanbieder AWS \\
regio ons-oost-1 \\
location_contraint us-east-1 \\
env_auth vals \\
anoniem waar

3. Test dat.
Wat?

rclone lsd goes17:noaa-goes17 | kop

4. Een aankoppelpunt aanmaken voor de data
Wat?

sudo mkdir -p /mnt/goes17
sudo clown $USER:$USER /mnt/goes17

5. Mount de data. (Merk op dat dit proces draait in de voorgrond, dus het zal wat uitvoer tonen en daar zitten) 
Wat?

rclone -vv mount goes17:noaa-goes17 /mnt/goes17 \\
--read-only \\
--vfs-cache-modus vol \\
--vfs-cache-max-size 1G \\
--vfs-cache-poll-interval 1m
--vfs-read-chunk-size 64M\\
--vfs-read-chunk-size-limit 1G \\
--vfs-read-ahead 256M
--buffer-grootte 64M \\
--dir-cache-time 24h \\
--attr-timeout 1s \\
--no-modtime

6. Open een nieuw tabblad op de server en controleer
Wat?

ls /mnt/goes17 | kop

7. Controleer of gegevens kunnen worden geraadpleegd
Wat?
cd /mnt/goes17/ABI-L1b-RadC/2023/010/15
ncdump -h OR_ABI-L1b-RadC-M6C16_G17_s20230101536138_e20230101536138_c20230101541461 .nc 
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
Het resultaat werd verrassend snel teruggegeven, vooral omdat onze installatie niet de snelste pijp ter wereld heeft.

8. Maak gebruik van een systeemdienst (wijzigen naar gelang van het geval voor gebruiker enz.) :
Wat?

a. Maak een systeemeenheid aan:

sudo nano /etc/systemd/system/rclone-goes17.service

En voer in:

[Eenheid]
Beschrijving=Rclone mount voor GOES17 public S3
Na=network-online .tar krijgen

[Dienst]
Type=eenvoudig
Gebruiker=ubuntu
ExecStart=/usr/bin/rclone mount goes17:noaa-goes17 /mnt/goes17 \\
--read-only \\
--vfs-cache-modus vol \\
--vfs-cache-max-size 1G \\
--vfs-cache-poll-interval 1m
--vfs-read-chunk-size 64M\\
--vfs-read-chunk-size-limit 1G \\
--vfs-read-ahead 256M
--buffer-grootte 64M \\
--dir-cache-time 24h \\
--attr-timeout 1s \\
--no-modtime \\
--s3-no-check-bucket
ExecStop=/bin/fusermount3 -u /mnt/goes17
Herstart altijd
HerstartSec=10

[Installeren]
GezochtBy=multi-user .tar krijgen

b. Activeer de service en start:

sudo systemctl daemon-herladen
sudo systemctl inschakelen --nu rclone-goes17

c. Test

systeemctl-status rclone-goes17
ls /mnt/goes17 | kop



Hopelijk is dit nuttig voor mensen. We hebben getest met behulp van gcsfuse op Google Cloud Platform met een emmer die hiërarchische naamruimte met enig succes heeft. Een voordeel van rclon (Bovendien is het niet leverancier specifiek) is dat het meer instellingen heeft om de prestaties te optimaliseren. Vooral als u een lokale ERDDAP™ naar de cloud, dit kan de overgang bijna naadloos maken.
