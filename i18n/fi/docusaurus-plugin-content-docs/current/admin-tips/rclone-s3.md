Tämä sisältö perustuu a [Kirjoittanut Roy Mendelssohn ERDDAP Käyttäjäryhmä](https://groups.google.com/g/erddap/c/zZUt6PKfkoI/m/expZ3UkkBAAJ) .

Äskettäin olemme saaneet useita tutkimuksia, jotka etsivät apua AWS S3:n tiedostojen käyttämiseen. ERDDAP™ . Ensinnäkin, ERDDAP™ versio 2.29 on parantanut S3-yhteyttä, joka toimii myös muiden kuin AWS-objektikauppojen kanssa. (Kiitos Seth&#33;) . Olen kuitenkin aiemmin maininnut FUSE-pohjaisen järjestelmän käytöstä, jotta S3-myymälä näyttäisi palvelimellesi tai VM:lle tiedostojärjestelmältä.

Yksi tapa tehdä tämä on käyttää rclone. (https://rclone.org/) Rclone toimii monissa eri S3-järjestelmissä ja sillä on paljon erilaisia asetuksia suorituskyvyn optimoimiseksi, mukaan lukien välimuistin koon asettaminen, mikä toivottavasti voi kompensoida joitakin FUSE: n juoksemisen nopeusrangaistuksia. Hyödynnä rclone ERDDAP TM on, että rclone käsittelee kaiken vuorovaikutuksen S3: n kanssa, joten aineistotyypit, kuten EDDGrid FromNcFiles-tiedostoja voidaan käyttää suoraan kuin paikallisia tiedostoja. Tämä tarkoittaa, että sinun tarvitsee vain selvittää, miten asentaa rclone, jotta voit käyttää objektikauppaa, ja loput ovat vain tavallisia Linux-tyypin asetuksia.

Nyt olisin väheksynyt, jos jättäisin sen, enkä antaisi esimerkkiä. Seuraavassa aion nousta anonyymisti NOAA Goes17-tiedot, jotka ovat julkisesti saatavilla olevassa AWS S3 -myymälässä yhdelle Ubuntu-palvelimellemme, Käynnistetään rclone-prosessi etualalla, jotta kaikki toimii helpommin ja sitten keskustelen siitä, miten muuntaa ii taustalla toimivaksi palveluksi. Huomaa, että alla oleva välimuisti on 1GB. Suorituskykyä voidaan parantaa tekemällä välimuisti paljon suurempi, kuten 5GB-10GB tai jopa suurempi. Myös asetukset ovat arvaukseni, mikä voi optimoida suorituskyvyn, mutta eivät ehkä ole optimaalisia. ERDDAP™ .


1. Asenna tarvittavat ohjelmistot:
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

Sudo Apt päivitys
Sudo apt asennus Rclone Fuse3 -y

2. Anonyymi S3 etäisyys
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

Rclone-konfigilla luodaan 17 s3
Toimittaja AWS
Itä-Euroopan alue 1
Sijainti / Constraint us-east-1
_auth false \\
Anonyymi totuus

3. Testaa tämä.
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

Rclone lsd: 17:noaa-goes | Pää

4. Luo piste datalle
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

Sudo mkdir -p /mnt / Goes17
Sudo chown - USD / Mnt / Goes17

5. Vuoren tiedot. (Huomaa, että tämä prosessi etenee etualalla, joten se näyttää ulostulon ja istuu siellä.) 
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

rclone -vv vuori kulkee 17:noaa-goes17 /mnt / goes17
Lukeminen vain \\
-vfs-cache-mode täynnä
-vfs-cache-max-size 1G
Vvfs-cache-poll-interval 1 m \\
vfs-read-chunk-koko 64 m
-vfs-read-chunk-size-limit 1G
vfs-read-ahead 256 m
Buffer-size 64M
dir-cache-time 24h
-attr-timeout 1s
Ei-modtime

6. Avaa uusi välilehti palvelimelle ja tarkista
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

l/mnt/goes 17 | Pää

7. Tarkista, että tietoja voidaan käyttää
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
cd/mnt/goes17/ABI-L1b-RadC/2023/010/15
ncdump h OR_ABI-L1b-RadC-M6C16_G17_s202301536138_e2023015338_c2023015414 .nc 
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
Tulos palautettiin yllättävän nopeasti, varsinkin kun asennus ei ole maailman nopein putki.

8. Tehdään järjestelmäpalvelu (Muutokset käyttäjän mukaan jne.) :
-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

A. Luo järjestelmällinen yksikkö:

sudo nano/etc/järjestelmä/rclone-goes17.

Sisälle:

[Yhdessä]
Rclone Mount for GOES17 Public S3
Lähde: Network-online .tar Get

[Palvelu]
Tyyppi = yksinkertainen
Käyttäjä =ubuntu
ExecStart=/käyttäjä/bin/rclone-vuori kulkee 17:noaa-goes17 /mnt/goes17
Lukeminen vain \\
-vfs-cache-mode täynnä
-vfs-cache-max-size 1G
Vvfs-cache-poll-interval 1 m \\
vfs-read-chunk-koko 64 m
-vfs-read-chunk-size-limit 1G
vfs-read-ahead 256 m
Buffer-size 64M
dir-cache-time 24h
-attr-timeout 1s
Ei-modtime
3-no-check-bucket
ExecStop=/bin/fusermount3 -u/mnt/goes17
Restart = aina
Restartsec = 10

[Asennus]
WantedBy=multi-käyttäjä .tar Get

b. Käynnistä palvelu ja aloita:

Sudo systemctl daemon-reload
Sudo Systemctl – nyt rclone-goes

c. Testit

rclone-goes 17
l/mnt/goes 17 | Pää



Toivottavasti tämä hyödyttää ihmisiä. Olemme testanneet gcsfusea Google Cloud Platformilla, jossa on hierarkkinen nimitila. Yksi etu rclone (Lisäksi se ei ole myyjäkohtainen) Siinä on enemmän asetuksia suorituskyvyn optimoimiseksi. Varsinkin, jos siirrät paikallista ERDDAP™ Pilvi voi tehdä siirtymisestä lähes saumattoman.
