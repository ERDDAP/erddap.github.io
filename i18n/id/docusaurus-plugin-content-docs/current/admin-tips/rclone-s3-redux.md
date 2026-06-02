Konten ini didasarkan pada [Pesan dari Mendelssohn ke ERDDAP grup pengguna](https://groups.google.com/g/erddap/c/H-vJoGP42TI) Sitemap

Login ERDDAP™ di cloud telah menjadi topik panas. Saya harus dicatat bahwa Meme it ERDDAP™ selalu berjalan di cloud, hanya sebagian besar waktu tidak pada server yang disediakan oleh penyedia cloud komersial, dan hambatan utama untuk berjalan ERDDAP™ pada penyedia cloud komersial adalah jika Anda menggunakan penyimpanan S3, yang tidak memungkinkan akses blok Linux normal. Jika Anda bersedia untuk membayar lebih banyak untuk menggunakan opsi akses blok yang disediakan oleh penyedia cloud komersial Anda, daripada berjalan pada server cloud komersial pada dasarnya sama dengan berjalan pada peralatan Anda sendiri, kecuali tentu saja biaya.

Setelah mengatakan bahwa, pada Dec. 1, 2025 saya menulis posting "rclone dan S3" dan ini adalah tindak lanjut. Dalam email itu saya memasang swathes GOES17 dan memeriksa file, tetapi saya tidak mengambil semua cara ke ERDDAP™ untuk melihat bahwa semuanya bekerja dengan lancar. Meme it Dan ya kiddos, Anda dapat mencoba ini di rumah dan Anda tidak perlu berkonsultasi dengan pengacara atau penasihat medis, itu harus semua aman. Di sini saya memasang NCDC OI sst avhrr v2.1 yang ada di AWS, mengaturnya di ERDDAP™ dan menunjukkan hasilnya.

- Langkah 1: Tentukan endpoint di rclone

rclone config membuat oi sst s3 \\
penyedia AWS \\
wilayah kita-east-1 \\
Lokasi_mengerti kita-east-1 \\
Sitemap
anonim


- Langkah 2: Buat titik mount untuk dataset

sudo mkdir -p/mnt/oi sst 
wget http://www.mnt/oi.com/ sst 

- Langkah 3: pasang penyimpanan S3 ke titik gunung

Izin, izin, izin, izin.... (Dengan maaf ke Steve Ballmer, jika Anda tahu Anda) Login

Gunung harus dilakukan sehingga setiap pengguna menjalankan tomcat, biasanya pengguna “tomcat”, dapat mengakses data. 'rclone' me-mount dataset dengan pemilik dan kelompok pengguna yang mengeksekusi perintah gunung dan ingin menyimpan informasi di direktori rumah pengguna (ini mungkin mitigated jika Anda mengatur ini sebagai proses tingkat sistem - lihat di bawah ini) Sitemap Jadi jika Anda dapat, mengeksekusi perintah gunung sebagai ’tomcat’, tetapi jika seperti kita tomcat Anda tidak memiliki direktori rumah yang Anda butuhkan untuk mengeksekusi perintah gunung sebagai pengguna yang berbeda. Untuk melakukannya mengedit sekering. file conf:

1. sudo vi /etc/lem.conf

2. Uncomment atau tambahkan:

Facebook Twitter

3. Simpan dan keluar.


Data aktual adalah beberapa lapisan dalam, dan saya dipasang di tingkat data, tidak di tingkat atas, dan mengeksekusi perintah di terminal tmux sehingga perintah terus berjalan:

rclone -vvv gunung oi sst :noa-cdr-sea-surface-temp-optimum-interpolation-pds/data/v2.1/avhrr Login sst Login
Login
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


- Langkah 4: Gunakan GenerateDatasets Xml seperti normal,

Sitemap EDDGrid DariNcFiles sebagai jenis data, dan direktorinya adalah / mnt/oi sst Sitemap Pass awal cukup bagus dan bekerja tanpa masalah. Saya membuat tiga perubahan pada cuplikan xml yang bisa dilakukan saat menjalankan GenerateDataset Xml dan mereka adalah:

1. Mengubah datasetid menjadi oi sst Login

2. Direktori berisi campuran file beberapa berakhir di " .nc "dan yang lain berakhir di "preliminary .nc "dan hanya yang diinginkan. Meme it Untuk melakukan perubahan nama file regex:

 <fileNameRegex> Login sst -avhrr-v02r01\\.\\d&#123;8&#125;\\ .nc  </fileNameRegex> 

Saya sering mengatakan bahwa saya menemukan regex untuk menjadi salah satu misteri kehidupan, dan mungkin ada cara yang lebih baik untuk melakukan regex. Tapi ini bekerja

3. ioos_kategori tidak diatur, saya menambahkan mereka.

Untuk produksi permanen bekerja xml snippet dapat menggunakan sedikit lebih banyak pengeditan menjadi lebih lengkap.

- Langkah 5: Tambahkan cuplikan xml ke datasets.xml dan set bendera

Ini membutuhkan waktu lama untuk memuat lulus pertama, jadi temukan hal lain yang harus dilakukan untuk sisa hari.

Hasil akhir adalah:

 https://upwell.pfeg.noaa.gov/erddap/griddap/oisst_rclone.graph
 

Sekarang lihat itu tidak terlalu menyakitkan&#33;

Jika Anda bermain dengan hasilnya, perhatikan terlebih dahulu bahwa pengaturan rclone adalah kira pertama, dan harus diuji untuk optimasi. Jonathan Sherman dari kelompok kami telah melihat beberapa ini dan mungkin berbicara tentang hal itu dalam pembicaraannya di pertemuan DMAC IOOS. Dia juga akan mencakup lebih banyak topik yang terkait dengan pengaturan di Google Cloud Platform, seperti bagaimana cara mengoreksi pengaturan VM, menyiapkan ember S3 untuk memiliki ruang nama hirarkis yang di GCP lebih cepat dan hanya sedikit lebih mahal, dan jika Anda menjalankan skrip pemrosesan untuk memperbarui data yang disajikan oleh ember ERDDAP™ bagaimana mengatur mereka. Meme it Jika topik ini menarik Anda saya mendorong Anda untuk mendengarkan pembicaraannya. Login ERDDAP™ dan berjalan, hanya tidak dapat diakses saat-saat dari luar NMFS Login

Kedua ini bukan pemasangan AWS VM dari bucket AWS S3, ini adalah salah satu server kami dan pipa kami hari-hari ini benar-benar jenuh, sehingga Anda akan mengharapkan mantan setup menjadi lebih cepat daripada apa yang telah saya lakukan (baik pipa kami tidak sangat besar - terima kasih NMFS &#33; - tapi kita pernah jenuh - permintaan untuk data telah fenomenal) Sitemap

Akhirnya Anda mungkin bertanya-tanya - Saya ingin menggulung sendiri, di mana saya mulai selain ini? Saya telah menemukan satu hal LLM baik di adalah informasi yang terkenal dan didokumentasikan dengan baik, dan AIs saya telah diperiksa (ada semua token saya&#33;) semua tahu rclone dan AWS dan GCP cukup baik, dan dapat melakukan sebagian besar setup untuk Anda. Bahkan saya mencari dataset yang baik untuk demo, dan AI memberi saya beberapa saran dan dihasilkan sebagian besar dari apa di atas, meskipun saya membuat beberapa edit untuk pengaturan saya sendiri.

Juga, ingat Seth menulis S3 baru untuk versi sekarang (2.30 g) Login ERDDAP™ - Saya tidak memiliki kecepatan, dan saya membayangkan tergantung pada apa yang Anda lakukan setiap akan memiliki kelebihannya. Untuk port di atas yang ada ERDDAP™ instalasi, menggunakan rclone dapat menyederhanakan proses.

Login

PS - Dan ingat rclone bekerja di atas berbagai vendor, ini tidak dibatasi ke AWS dan hanya beberapa perubahan pada pengaturan "rclone config" diperlukan untuk vendor yang berbeda.


Masuk ke layanan sistem (memodifikasi sesuai untuk pengguna dll) Sitemap
——————————————————

[Unit]
Deskripsi=Rclone mount untuk NOAA OISST di AWS
WordPress.org .tar Sitemap
WordPress.org .tar Sitemap

Sitemap
Login
Login
Sitemap

ExecStart=/usr/bin/rclone oi sst :noa-cdr-sea-surface-temp-optimum-interpolation-pds/data/v2.1/avhrr Login sst Login
Login
Login
--dir-perms 0755 \\
--file-perms 0644 \\
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

ExecStop=/bin/fusermount Login sst 
Restart=on-failure
RestartSec=10

[Install]
Login .tar Sitemap
