Questo contenuto si basa su un [messaggio da Roy Mendelssohn a ERDDAP utenti di gruppo](https://groups.google.com/g/erddap/c/zZUt6PKfkoI/m/expZ3UkkBAAJ) .

Recentemente, abbiamo ricevuto una serie di richieste di aiuto per accedere ai file su AWS S3 in ERDDAP™ . Prima, ERDDAP™ versione 2.29 avrà migliorato l'accesso S3 che dovrebbe funzionare anche con gli oggetti non-AWS. (Grazie Seth&#33;) . Ma ho accennato in precedenza sull'utilizzo di un sistema basato su FUSE per far apparire il negozio S3 come un filesystem sul server o sulla VM.

Un modo per farlo è usare “rclone”. (https://rclone.org/) . rclone funziona su molti sistemi S3 diversi, e ha un sacco di impostazioni diverse per ottimizzare le prestazioni, tra cui l'impostazione di una dimensione della cache, che si spera possa compensare alcune della penalità di velocità da eseguire FUSE. Il vantaggio di utilizzare rclone con ERDDAP TM è che rclone gestisce tutta l'interazione con S3, così i tipi di dataset come EDDGrid DaNcFiles può essere utilizzato direttamente come se ci sono file locali. Questo significa che devi solo capire come configurare rclone per accedere al tuo negozio di oggetti, e il resto è solo normali configurazioni di tipo Linux.

Ora verrei respinta se l'avessi lasciata a questo, e non dare un esempio. Nel seguente modo introdurrò anonimamente il NOAA Goes17 dati che è su un negozio AWS S3 accessibile al pubblico su uno dei nostri server Ubuntu, Nella configurazione iniziale il processo rclone sarà in esecuzione in primo piano per rendere più facile da testare che tutto funziona, e poi discutere come trasformare ii in un servizio in esecuzione in background. Si noti che in quello che è sotto, la cache è impostata su 1GB. Le prestazioni possono essere migliorate rendendo la cache molto più grande, diciamo 5GB-10GB o anche più grande. Anche le impostazioni sono le mie ipotesi a ciò che può ottimizzare le prestazioni, ma potrebbe non essere quelle ottimali per ERDDAP™ .


1. Installare il software necessario:
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

sudo apt aggiornamento
sudo apt install rclone fuse3 - Sì.

2. Crea un telecomando S3 anonimo
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

rclone config creare go17 s3 \\
fornitore AWS \\
regione us-east-1 \\
posizione_constraint us-east-1 \\
errato.
anonimo vero

3. Provalo.
——————————

rclone lsd goes17:noaa-goes17 | testa

4. Creare un punto di montaggio per i dati
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

Sudo mkdir -p /mnt/goes17
sudo chown $USER:$USER /mnt/goes17

5. Montare i dati. (Nota che questo processo funziona in primo piano, in modo che mostrerà alcuni output e sedersi lì) 
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

rclone -vv mount goes17:noaa-goes17 /mnt/goes17 \\
--read-only \\
--vfs-cache-mode full \\
--vfs-cache-max-size 1G \\
--vfs-cache-poll-interval 1 m
--vfs-read-chunk-size 64.
--vfs-read-chunk-size-limit 1G \\
--vfs-read-ahead 256M
--buffer-size 64M \\
--dir-cache-time 24h \\
--a tempo libero 1s
--no-modtime

6. Aprire una nuova scheda sul server e controllare
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

ls /mnt/goes17 | testa

7. Controllare che i dati possano essere accessibili
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
cd/mnt/goes17/ABI-L1b-RadC/2023/010/15
N. - Cosa? OR_ABI-L1b-RadC-M6C16_G17_s20230101536138_e202301536138_c20230101541461 .nc 
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
Il risultato è stato restituito sorprendentemente rapidamente, soprattutto perché la nostra installazione non ha il tubo più veloce al mondo.

8. Fare un servizio di sistema (modificare come appropriato per l'utente ecc) :
————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

a. Creare un'unità systemd:

sudo nano /etc/systemd/system/rclone-goes17.service

E entrate:

[Unit]
Descrizione=Rclone mount per GOES17 public S3
Dopo=network-online .tar ♪

[Servizio]
Tipo = campione
Traduzione:
ExecStart=/usr/bin/rclone mount goes17:noaa-goes17 /mnt/goes17 \\
--read-only \\
--vfs-cache-mode full \\
--vfs-cache-max-size 1G \\
--vfs-cache-poll-interval 1 m
--vfs-read-chunk-size 64.
--vfs-read-chunk-size-limit 1G \\
--vfs-read-ahead 256M
--buffer-size 64M \\
--dir-cache-time 24h \\
--a tempo libero 1s
--no-modtime \\
--s3-no-check-bucket
ExecStop=/bin/fusermount3 -u /mnt/goes17
Riavviare
Revisione:

[Install]
WantedBy=multi-user .tar ♪

b. Abilitare il servizio e iniziare:

sudo systemctl daemon-reload
sudo systemctl abilita --ora rclone-goes17

C. Test

stato del sistema rclone-goes17
ls /mnt/goes17 | testa



Speriamo che questo sia utile alle persone. Stiamo testando utilizzando gcsfuse su Google Cloud Platform con un secchio che ha spazio di nome gerarchico con un certo successo. Un vantaggio di rclone (inoltre che non è specifica del venditore) è che ha più impostazioni per ottimizzare le prestazioni. Soprattutto se si sta muovendo un locale ERDDAP™ al cloud, questo può rendere la transizione quasi senza soluzione di continuità.
