Ta zawartość jest oparta na [wiadomość od Roy Mendelssohn do ERDDAP grupa użytkowników](https://groups.google.com/g/erddap/c/zZUt6PKfkoI/m/expZ3UkkBAAJ) .

Ostatnio otrzymujemy wiele zapytań, szukając pomocy w dostępie do plików na AWS S3 w ERDDAP™ . Po pierwsze, ERDDAP™ Wersja 2.29 będzie miała lepszy dostęp do S3, który powinien działać również ze sklepami obiektów non-AWS. (Dzięki Seth&#33;) . Ale wspomniałem wcześniej o użyciu systemu opartego na FUSE, aby sklep S3 wyglądał jak system plików na serwerze lub VM.

Jednym ze sposobów jest użycie "rclone". (https://rclone.org/) . rclone działa na wielu różnych systemach S3, i ma wiele różnych ustawień w celu optymalizacji wydajności, w tym ustawienie wielkości pamięci podręcznej, które, miejmy nadzieję, mogą zrekompensować niektóre z kar prędkości od uruchomienia FUSE. Zaletą korzystania z rclone z ERDDAP ™ jest to, że rclone obsługuje wszystkie interakcje z S3, więc typy danych jak EDDGrid Pliki FromNcFiles mogą być używane bezpośrednio tak, jakby istniały pliki lokalne. Oznacza to, że trzeba tylko dowiedzieć się, jak skonfigurować rclone, aby uzyskać dostęp do sklepu z obiektami, a reszta to zwykłe ustawienia typu Linux.

Byłbym niedbały, gdybym to tak zostawił i nie dał przykładu. Następnie zamierzam anonimowo zamontować NOAA Goes17 danych, które są na publicznie dostępnym sklepie AWS S3 na jednym z naszych serwerów Ubuntu, W początkowej konfiguracji proces rclone będzie uruchomiony na pierwszym planie, aby ułatwić testowanie, że wszystko działa, a następnie przedyskutuję, jak zmienić ii w usługę działa w tle. Zauważ, że w tym, co jest poniżej, cache jest ustawiony na 1GB. Wydajność może być również zwiększona przez zwiększenie pamięci podręcznej, powiedzmy 5GB- 10GB lub nawet większe. Również ustawienia są moje przypuszczenia co może zoptymalizować wydajność, ale może nie być optymalne dla ERDDAP™ .


1. Zainstaluj niezbędne oprogramowanie:
- - - - - - - - - - - - -

sudo apt update
sudo apt install rclone fuse3 -y

2. Utwórz anonimowy pilot S3
- - - - - - - - - - - - - -

rclone config create goes17 s3\\
dostawca AWS\\
region us- east-1\\
location _ limit us- east-1\\
env _ auth false\\
Anonimowa prawda

3. Sprawdź to.
-

rclone lsd goes17: noaa- goes17 | głowa

4. Utwórz punkt montowania danych
- - - - - - - - - - - - - -

sudo mkdir -p / mnt / goes17
sudo chown $USER: $USER / mnt / goes17

5. Zamontuj dane. (Zauważcie, że ten proces jest uruchomiony na pierwszym planie, więc pokaże jakieś wyjście i usiądzie tam) 
-

rclone -vv mount goes17: noaa- goes17 / mnt / goes17\\
-- read- only\\
--vfs- cache- mode full\\
-- vfs- cache- max- size 1G\\
-- vfs- cache- interval 1m\\
-- vfs- read- chunk- size 64M\\
-- vfs- read- chunk- size- limit 1G\\
-- vfs- read- forward 256M\\
-- buffer-size 64M\\
-- dir- cache- time 24h\\
-- attr- timeout 1s\\
--no-modtime

6. Otwórz nową kartę na serwerze i sprawdź
- - - - - - - - - - - - - - - -

Ls / mnt / gos17 | głowa

7. Sprawdź, czy dostępne są dane
- - - - - - - - - - - - - -
cd / mnt / goes17 / ABI- L1b- RadC / 2023 / 010 / 15
ncdump - h OR _ ABI- L1b- RadC- M6C16 _ G17 _ s20230101536138 _ e20230101536138 _ c20230101541461 .nc 
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
Wynik został zwrócony zaskakująco szybko, zwłaszcza, że nasza instalacja nie ma najszybszej rury na świecie.

8. Zrobić usługę systemową (modyfikować odpowiednio dla użytkownika itp.) :
- - - - - - - - - - -

"Oprogramowanie" specjalnie zaprojektowane lub zmodyfikowane do "użytkowania" urządzeń wyszczególnionych w pozycji 1C010.a. Utwórz jednostkę systemową:

sudo nano / etc / systemd / system / rclone-goes17.service

I wprowadź:

[Jednostka]
Opis = Rclone mount for GOES17 public S3
After = sieci- online .tar dostać

[Usługa]
Typ = prosty
Użytkownik = ubuntu
ExecutiStart = / usr / bin / rclone mount goes17: noaa- goes17 / mnt / goes17\\
-- read- only\\
--vfs- cache- mode full\\
-- vfs- cache- max- size 1G\\
-- vfs- cache- interval 1m\\
-- vfs- read- chunk- size 64M\\
-- vfs- read- chunk- size- limit 1G\\
-- vfs- read- forward 256M\\
-- buffer-size 64M\\
-- dir- cache- time 24h\\
-- attr- timeout 1s\\
--no-modtime\\
-- s3- no- check- bucket
ExecStop = / bin / fusermount3 -u / mnt / goes17
Uruchom = zawsze
RestartSec = 10

[Install]
WantedBy = multi- user .tar dostać

b. posiadające wszystkie niżej wymienione cechy: Włącz usługę i uruchom:

sudo systemctl daemon- reload
sudo systemctl włącza -- now rclone-goes17

"Oprogramowanie" specjalnie zaprojektowane lub zmodyfikowane do "użytkowania" urządzeń wyszczególnionych w pozycji 1C001.b.3. Badanie

systemctl status rclone-goes17
Ls / mnt / gos17 | głowa



Miejmy nadzieję, że będzie to przydatne dla ludzi. Testowaliśmy przy użyciu gcsfuse na platformie Google Cloud z wiadrem, które posiada hierarchiczną przestrzeń nazw z pewnym sukcesem. Jedna zaleta rclone (poza tym, że nie jest specyficzny dla sprzedawcy) jest to, że ma więcej ustawień do optymalizacji wydajności. Zwłaszcza, jeśli przeprowadzasz się lokalnie ERDDAP™ do chmury, to może sprawić, że przejście prawie bez szwu.
