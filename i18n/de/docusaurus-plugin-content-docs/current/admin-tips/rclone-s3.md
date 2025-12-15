Dieser Inhalt basiert auf einer [Nachricht von Roy Mendelssohn an die ERDDAP Benutzergruppe](https://groups.google.com/g/erddap/c/zZUt6PKfkoI/m/expZ3UkkBAAJ) .

Vor kurzem haben wir eine Reihe von Anfragen erhalten, die Hilfe beim Zugriff auf Dateien auf AWS S3 in ERDDAP™ . Erstens: ERDDAP™ Version 2.29 hat einen verbesserten S3-Zugang, der auch mit Nicht-AWS-Objektspeichern funktionieren sollte. (Danke Seth&#33;) . Aber ich habe zuvor über die Verwendung eines FUSE-basierten Systems gesprochen, um den S3 Speicher wie ein Dateisystem auf Ihrem Server oder VM erscheinen zu lassen.

Eine Möglichkeit, dies zu tun, ist die Verwendung “rclone”. (https://rclone.org/) . rclone arbeitet an vielen verschiedenen S3-Systemen und hat eine Menge von verschiedenen Einstellungen, um die Leistung zu optimieren, einschließlich der Einstellung einer Cache-Größe, die hoffentlich einige der Geschwindigkeitsstrafe vom FUSE zu kompensieren. Der Vorteil der Verwendung von Rclone mit ERDDAP TM ist, dass rclone behandelt alle Interaktion mit S3, so Datensatztypen wie EDDGrid FromNcFiles kann direkt verwendet werden, als ob es lokale Dateien gibt. Dies bedeutet, dass Sie nur herausfinden müssen, wie Sie rclone auf Ihren Objekt-Store zu installieren, und der Rest ist nur normale Linux-Typ-Setups.

Nun würde ich zurücktreten, wenn ich es einfach so gelassen hätte, und kein Beispiel. Im Folgenden werde ich anonym die NOAA Goes17-Daten, die auf einem öffentlich zugänglichen AWS S3 Speicher auf einem unserer Ubuntu-Server, In der ersten Einrichtung wird der Rclone-Prozess im Vordergrund laufen, um es einfacher zu testen, dass alles funktioniert, und dann werde ich diskutieren, wie ii in einen Dienst im Hintergrund läuft. Beachten Sie, dass in dem, was unten ist, der Cache auf 1GB gesetzt ist. Die Leistung kann durch die viel größere Cache erhöht werden, sagen 5GB-10GB oder sogar größer. Auch die Einstellungen sind meine Vermutungen, was die Leistung optimieren kann, aber möglicherweise nicht die optimalen für ERDDAP™ .


1. Installieren Sie die notwendige Software:
——————————

sudo apt update
sudo apt install rclone backup3 - Ja.

2. Erstellen Sie eine anonyme S3 Remote
——————————

rclone config create goes17 s3 \\
Anbieter AWS \\
region us-east-1 \\
Location_constraint us-east-1 \\
env_auth false \\
anonym wahr

3. Testen Sie das.
——————

rclone lsd goes17:noaa-goes17 | Kopf

4. Erstellen Sie einen Befestigungspunkt für die Daten
——————————

-p /mnt/gos17
sudo chown $USER:$USER /mnt/goes17

5. Die Daten anbringen. (Beachten Sie, dass dieser Prozess im Vordergrund läuft, so wird es einige Ausgabe zeigen und dort sitzen) 
————————

rclone -vv mount goes17:noaa-goes17 /mnt/gos17 \\
--nur lesen \\
--vfs-cache-mode voll \\
--vfs-cache-max-size 1G \\
--vfs-cache-poll-interval 1 m
--vfs-read-chunk-size 64M
--vfs-read-chunk-size-limit 1G \\
--vfs-read-ahead 256M
--buffer-ize 64M \\
--dir-cache-time 24h \\
--attr-timeout 1s \\
--kein-modtime

6. Öffnen Sie eine neue Registerkarte auf dem Server und überprüfen Sie
——————————

ls /mnt/gos17 | Kopf

7. Überprüfen Sie, ob auf Daten zugegriffen werden kann
——————————
cd/mnt/gos17/ABI-L1b-RadC/2023/010/15
ncdump -h ODER_ABI-L1b-RadCM6C16_G17_G17_20230101536138_e20230101536138_c20230101541461 .nc 
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
Das Ergebnis wurde überraschend schnell zurückgegeben, zumal unsere Installation nicht das schnellste Rohr der Welt hat.

8. Machen Sie einen Systemdienst (Modifizieren Sie sich entsprechend für Benutzer usw.) :
——————————

a. Erstellen Sie eine systemd unit:

sudo nano /etc/systemd/system/rclone-goes17.service

Und betreten:

(Unit)
Beschreibung=Rclone Halterung für GOES17 public S3
Nach=network-online .tar &#33;

[Service]
Typ = siple
Benutzername:
ExecStart=/usr/bin/rclon mount goes17:noaa-goes17 /mnt/goes17 \\
--nur lesen \\
--vfs-cache-mode voll \\
--vfs-cache-max-size 1G \\
--vfs-cache-poll-interval 1 m
--vfs-read-chunk-size 64M
--vfs-read-chunk-size-limit 1G \\
--vfs-read-ahead 256M
--buffer-ize 64M \\
--dir-cache-time 24h \\
--attr-timeout 1s \\
--no-modtime \\
--s3-no-check-bucket
ExecStop=/bin/fusermount3 -u /mnt/gos17
Zurück zur Übersicht
Neustart:

[Installieren]
WilledBy=multi-user .tar &#33;

B. Aktivieren Sie den Service und starten Sie:

sudo systemctl daemon-reload
sudo systemctl aktivieren --heute rclone-goes17

c. Prüfung

systemctl status rclone-gos17
ls /mnt/gos17 | Kopf



Hoffentlich wird dies den Menschen nützen. Wir haben mit gcsfuse auf der Google Cloud Platform mit einem Eimer getestet, der hierarchischen Namensraum mit etwas Erfolg hat. Ein Vorteil von Rclone (Außerdem ist es nicht herstellerspezifisch) ist, dass es mehr Einstellungen hat, um die Leistung zu optimieren. Vor allem, wenn Sie einen Ort bewegen ERDDAP™ in die Cloud, kann dies den Übergang fast nahtlos machen.
