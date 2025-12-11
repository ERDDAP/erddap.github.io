Konten ini didasarkan pada [Pesan dari Mendelssohn ke ERDDAP grup pengguna](https://groups.google.com/g/erddap/c/zZUt6PKfkoI/m/expZ3UkkBAAJ) Sitemap

Baru-baru ini, kami telah mendapatkan sejumlah pertanyaan yang mencari bantuan dengan mengakses file di AWS S3 di ERDDAP™ Sitemap Pertama, ERDDAP™ versi 2.29 akan meningkatkan akses S3 yang harus bekerja dengan toko objek non-AWS juga. (Terima kasih&#33;) Sitemap Tapi saya telah menyebutkan sebelumnya tentang menggunakan sistem berbasis FUSE untuk membuat toko S3 muncul seperti sistem file pada server atau VM.

Satu cara untuk melakukan ini adalah menggunakan "rclone". (https://rclone.org/) . rclone bekerja pada banyak sistem S3 yang berbeda, dan memiliki banyak pengaturan yang berbeda untuk mengoptimalkan kinerja, termasuk mengatur ukuran cache, yang semoga dapat mengimbangi beberapa hukuman kecepatan dari menjalankan FUSE. Keuntungan menggunakan rclone dengan ERDDAP TM adalah bahwa rclone menangani semua interaksi dengan S3, sehingga jenis dataset seperti EDDGrid DariNcFiles dapat digunakan langsung seolah-olah ada file lokal. Ini berarti bahwa Anda hanya perlu mencari tahu cara mengatur rclone untuk mengakses toko objek Anda, dan sisanya hanya pengaturan tipe Linux normal.

Sekarang saya akan diizinkan jika saya hanya meninggalkannya di itu, dan tidak memberikan contoh. Dalam hal berikut saya akan secara anonim me-mount Meme it NOAA Data Goes17 yang berada di toko AWS S3 yang dapat diakses publik di salah satu server Ubuntu kami, Dalam pengaturan awal proses rclone akan berjalan di latar depan untuk memudahkan untuk menguji segala sesuatu yang bekerja, dan kemudian saya akan membahas cara mengubah ii menjadi layanan yang berjalan di latar belakang. Perhatikan bahwa dalam apa di bawah ini, cache diatur ke 1GB. Kinerja dapat ditingkatkan dengan membuat cache jauh lebih besar, katakanlah 5GB-10GB atau bahkan lebih besar. Juga pengaturan kira-kira saya pada apa yang dapat mengoptimalkan kinerja, tetapi mungkin tidak menjadi yang optimal untuk ERDDAP™ Sitemap


1. Instal perangkat lunak yang diperlukan:
—————————————————————

sudo apt update
sudo apt install rclone sekering3 Login

2. Buat remote S3 anonim
————————————————————————

rclone config membuat pergi17 s3 \\
penyedia AWS \\
wilayah kita-east-1 \\
Lokasi_mengerti kita-east-1 \\
Sitemap
anonim

3. Sitemap
————————

rclone lsd go17:noaa-goes17 | Login

4. Buat titik mount untuk data
————————————————————————

sudo mkdir -p/mnt/goes17
sudo nyanyi $USER:$USER /mnt/goes17

5. Login (Perhatikan proses ini berjalan di latar depan, sehingga akan menunjukkan beberapa output dan duduk di sana) 
————————————

rclone -vvv gunung pergi17:noaa-goes17 /mnt/goes17 \\
Login
--vfs-cache-mode penuh \\
--vfs-cache-max-size 1G \\
--vfs-cache-poll-interval 1m \\
--vfs-read-chunk-size 64M \\
--vfs-read-chunk-size-limit 1G \\
Login 256M \\
- ukuran-buffer-size 64M \\
--dir-cache-time 24h \\
--attr-timeout 1s \\
Login

6. Buka tab baru di server dan cek
—————————————————————————

ls/mnt/goes17 | Login

7. Cek data tersebut dapat diakses
———————————————————————
cd /mnt/goes17/ABI-L1b-RadC/2023/010/15
Login Login OR_ABI-L1b-RadC-M6C16_G17_s20230101536138_e20230101536138_c20230101541461 .nc 
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
Hasilnya dikembalikan dengan sangat cepat, terutama karena instalasi kami tidak memiliki pipa tercepat di dunia.

8. Masuk ke layanan sistem (memodifikasi sesuai untuk pengguna dll) Sitemap
——————————————————

Sitemap Buat unit sistem:

sudo nano /etc/systemd/systemd/rclone-goes17.service

Dan masukkan:

[Unit]
Deskripsi=Rclone mount untuk GOES17 publik S3
WordPress.org .tar Sitemap

Sitemap
Jenis = sederhana
Login
ExecStart=/usr/bin/rclone mount pergi17:noa-goes17/mnt/goes17 \\
Login
--vfs-cache-mode penuh \\
--vfs-cache-max-size 1G \\
--vfs-cache-poll-interval 1m \\
--vfs-read-chunk-size 64M \\
--vfs-read-chunk-size-limit 1G \\
Login 256M \\
- ukuran-buffer-size 64M \\
--dir-cache-time 24h \\
--attr-timeout 1s \\
--no-modtime \\
--s3-no-check-bucket
ExecStop=/bin/fusermount3 -u/mnt/goes17
Login
RestartSec=10

[Install]
Login .tar Sitemap

Login Aktifkan layanan dan mulai:

WordPress.org
sudo sistemctl mengaktifkan --now rclone-goes17

Login Sitemap

status sistemctl rclone-goes17
ls/mnt/goes17 | Login



Semoga ini akan digunakan untuk orang. Kami telah menguji menggunakan gcsfuse di Google Cloud Platform dengan bucket yang memiliki ruang nama hirarkis dengan beberapa keberhasilan. Satu keuntungan dari rclone (selain itu bukan vendor spesifik Meme it) memiliki lebih banyak pengaturan untuk mengoptimalkan kinerja. Meme it Terutama jika Anda bergerak lokal ERDDAP™ ke cloud, ini dapat membuat transisi hampir mulus.
