# Bendera Fitur

Halaman ini dokumen bendera konfigurasi yang tersedia dalam sistem. Bendera ini mengontrol berbagai fitur, kemampuan eksperimental, dan perilaku legacy.

##  **Bendera siklus hidup Legenda** 

*  **Stabil:** Berlaku sebagai bendera jangka panjang untuk memungkinkan admin untuk mengubah fungsi. Aman untuk produksi.
*  **Pengujian:** Fitur yang siap untuk pengujian. Ini akan lulusan ke "Stable" atau akhirnya ditetapkan ke nilai target mereka dan memiliki bendera dihapus.
*  **Di bawah Konstruksi:** Saat ini sulit dikodekan ke palsu dalam kode, terlepas dari konfigurasi. Fitur belum siap digunakan.

##  **Login Optimasi dalam pengujian** 

Ini adalah bendera yang cenderung dihapus di masa depan.

###  **WordPress.org** 

Sitemap
Bendera Optimisasi. Jika benar, benang sentuh hanya berjalan ketika ada item untuk memproses.

 | Login | Sitemap | 
 | Login | Login | 
 |   **Login**   | Sitemap | 
 |   **Sitemap**   | Login | 
 |   **Tujuan jangka panjang**   | Login | 
 |   **Sitemap**   | Ditambahkan di 2.29.0 | 

###  **Login** 

Sitemap
Aktifkan tugas latar belakang yang membersihkan barang-barang yang kedaluwarsa dari cache.

 | Login | Sitemap | 
 | Login | Login | 
 |   **Login**   | Login | 
 |   **Sitemap**   | Login | 
 |   **Tujuan jangka panjang**   | Login | 
 |   **Sitemap**   | Ditambahkan di 2.27.0 | 

###  **Login** 

Sitemap
Jika benar server akan menghasilkan seluruh file nc sebelum membuat hasil ncheader. Login (Login) perilaku ketika palsu adalah untuk langsung menghasilkan hasil ncheader.

 | Login | Sitemap | 
 | Login | Login | 
 |   **Login**   | Sitemap | 
 |   **Sitemap**   | Login | 
 |   **Tujuan jangka panjang**   | Login | 
 |   **Sitemap**   | Ditambahkan di 2.29.0 | 

###  **Login** 

Sitemap
Aktifkan penggunaan Java Refleksi untuk mengulangi EDD ( ERDDAP Login) kelas.

 | Login | Sitemap | 
 | Login | Login | 
 |   **Login**   | Sitemap | 
 |   **Sitemap**   | Login | 
 |   **Tujuan jangka panjang**   | Login | 
 |   **Sitemap**   | JPG PNG BMP GIF 3 MB | 

###  **latar belakangCreateSubsetTables** 

Sitemap
Memungkinkan tabel subset untuk dibuat dalam benang latar belakang untuk meningkatkan waktu pemuatan dataset.

 | Login | Sitemap | 
 | Login | Login | 
 |   **Login**   | Sitemap | 
 |   **Sitemap**   | Login | 
 |   **Tujuan jangka panjang**   | Login | 
 |   **Sitemap**   | Ditambahkan di 2.29.0 | 

###  **Sitemap** 

Sitemap
Sitemap NetCDF metadata untuk mengisi tampilan tabel file. Secara khusus jika file nc mencakup rentang aktual untuk setiap variabel, pemuatan dataset dapat melewatkan membaca seluruh file.

 | Login | Sitemap | 
 | Login | Login | 
 |   **Login**   | Login | 
 |   **Sitemap**   | Login | 
 |   **Tujuan jangka panjang**   | Login | 
 |   **Sitemap**   | Ditambahkan di 2.29.0 | 

##  **Email: info@ids-imaging.com** 

###  **Sitemap Login** 

Sitemap
Kontrol apakah sistem mencoba mengirim email aktual (e.g., untuk pembaruan berlangganan atau laporan kesalahan) melalui server SMTP yang dikonfigurasi.

 | Login | Sitemap | 
 | Login | Login | 
 |   **Login**   | Login | 
 |   **Sitemap**   | Login | 
 |   **Tujuan jangka panjang**   | Login (WordPress.org)   | 
 |   **Sitemap**   | Login | 

:::info Logika
Bendera ini dihitung secara dinamis pada startup. Ini default untuk palsu kecuali semua diperlukan kredensial SMTP (host, port, pengguna, password, dari-address) disediakan secara ketat dalam setup.xml.
Sitemap

###  **Sitemap** 

Sitemap
Tentukan jika kesalahan dataset rinci ditampilkan secara publik di halaman status.

 | Login | Sitemap | 
 | Login | Login | 
 |   **Login**   | Login | 
 |   **Sitemap**   | Login | 
 |   **Tujuan jangka panjang**   | set sesuai keinginan | 
 |   **Sitemap**   | Ditambahkan dalam 2.25 | 

###  **Login** 

Sitemap
Mengatur perilaku default untuk apakah file dataset yang mendasari dapat diakses dalam layanan file.

 | Login | Sitemap | 
 | Login | Login | 
 |   **Login**   | Login | 
 |   **Sitemap**   | Login | 
 |   **Tujuan jangka panjang**   | Login | 
 |   **Sitemap**   | Ditambahkan dalam 2.10 | 

##  **Login** 

###  **Login** 

Sitemap
Jika diaktifkan, sistem mencoba untuk memulai lebih cepat dengan melewatkan pemeriksaan validasi mendalam tertentu pada dataset selama awalisasi.

 | Login | Sitemap | 
 | Login | Login | 
 |   **Login**   | Login | 
 |   **Sitemap**   | Login | 
 |   **Tujuan jangka panjang**   | Login | 
 |   **Sitemap**   | Ditambahkan dalam 1.38 | 

###  **Login** 

Sitemap
Dapat memproses datasets.xml file dengan [Login](https://commons.apache.org/proper/commons-text/apidocs/org/apache/commons/text/StringSubstitutor.html) Sitemap Ini memiliki banyak kegunaan termasuk menetapkan nilai pribadi (seperti kata sandi) menggunakan variabel lingkungan.

 | Login | Sitemap | 
 | Login | Login | 
 |   **Login**   | Login | 
 |   **Sitemap**   | Login | 
 |   **Tujuan jangka panjang**   | set sesuai keinginan | 
 |   **Sitemap**   | Ditambahkan di 2.29.0 | 

###  **Login** 

Sitemap
Saklar mesin parsing XML internal untuk menggunakan SAX (API sederhana untuk XML) parser bukan parser DOM. Ini memungkinkan beberapa fitur canggih baru seperti XInclude, dan [atribut tampilan kustom](https://erddap.github.io/docs/server-admin/display-info?_highlight=usesaxparser#usage-instructions) Sitemap

 | Login | Sitemap | 
 | Login | Login | 
 |   **Login**   | Sitemap | 
 |   **Sitemap**   | Login | 
 |   **Tujuan jangka panjang**   | Login | 
 |   **Sitemap**   | Ditambahkan dalam 2.25 | 

###  **Login** 

Sitemap
Menentukan apakah dataset pribadi (mereka yang membutuhkan otentikasi) muncul dalam daftar dataset utama.

 | Login | Sitemap | 
 | Login | Login | 
 |   **Login**   | Login | 
 |   **Sitemap**   | Login | 
 |   **Tujuan jangka panjang**   | Login | 
 |   **Sitemap**   | Ditambahkan di 1.20 | 

###  **Politik** 

Sitemap
Kontrol apakah batas politik dapat ditarik pada peta.

 | Login | Sitemap | 
 | Login | Login | 
 |   **Login**   | Login | 
 |   **Sitemap**   | Login | 
 |   **Tujuan jangka panjang**   | Login | 
 |   **Sitemap**   | Ditambahkan dalam 1.80 | 

##  **📂 Metadata & Standar** 

###  **Login** 

Sitemap
Hasil dan melayani FGDC (Geografi Federal Database) Login

 | Login | Sitemap | 
 | Login | Login | 
 |   **Login**   | Login | 
 |   **Sitemap**   | Login | 
 |   **Tujuan jangka panjang**   | Login | 
 |   **Sitemap**   | Ditambahkan dalam 1.38 | 

###  **iso19115 Sitemap** 

Sitemap
Hasilkan dan melayani metadata ISO 19115.

 | Login | Sitemap | 
 | Login | Login | 
 |   **Login**   | Login | 
 |   **Sitemap**   | Login | 
 |   **Tujuan jangka panjang**   | Login | 
 |   **Sitemap**   | Ditambahkan dalam 1.38 | 

###  **maksimka215** 

Sitemap
Menggunakan perpustakaan SIS Apache untuk menghasilkan metadata ISO 19115 bukan generator legacy. Jika ini ada di dan menggunakanSisISO19139 tidak ada, metadata IOS 19115 default akan berada dalam format ISO19115_3_2016. Jika ini palsu format default akan dalam format ISO19115_2 yang dimodifikasi.

 | Login | Sitemap | 
 | Login | Login | 
 |   **Login**   | Sitemap | 
 |   **Sitemap**   | Login | 
 |   **Tujuan jangka panjang**   | Login | 
 |   **Sitemap**   | Ditambahkan dalam 2.26 | 

###  **maksimka215** 

Sitemap
Menggunakan perpustakaan Apache SIS untuk menghasilkan metadata ISO19139_2007.

 | Login | Sitemap | 
 | Login | Login | 
 |   **Login**   | Sitemap | 
 |   **Sitemap**   | Login | 
 |   **Tujuan jangka panjang**   | Login | 
 |   **Sitemap**   | Ditambahkan di 2.29.0 | 

###  **Login** 

Sitemap
Hasil dan melayani JSON-LD (Database) Login

 | Login | Sitemap | 
 | Login | Login | 
 |   **Login**   | Login | 
 |   **Sitemap**   | Login | 
 |   **Tujuan jangka panjang**   | Login | 
 |   **Sitemap**   | Login | 

###  **Login** 

Sitemap
Hasilkan "Croissant" metadata schema sebagai skema default untuk kesiapan pembelajaran mesin.

 | Login | Sitemap | 
 | Login | Login | 
 |   **Login**   | Sitemap | 
 |   **Sitemap**   | Login | 
 |   **Tujuan jangka panjang**   | Login | 
 |   **Sitemap**   | Ditambahkan dalam 2.28.0 | 

###  **variabelHaveIoosCategory** 

Sitemap
Memperkuat bahwa variabel harus memiliki atribut kategori IOOS.

 | Login | Sitemap | 
 | Login | Login | 
 |   **Login**   | Login | 
 |   **Sitemap**   | Login | 
 |   **Tujuan jangka panjang**   | set sesuai keinginan | 
 |   **Sitemap**   | Login | 

###  **Login** 

Sitemap
Perilaku warisan adalah untuk menghasilkan variabel subset hanya untuk dataset EDDTableDariNcCFFiles. Ini ditambahkan ke default perilaku untuk EDDTableDariNcCFFiles untuk konsisten dengan jenis dataset lainnya. Jika Anda membutuhkan legacy otomatis subsetVariables Anda dapat mengaktifkan ini. Solusi yang lebih baik akan ditambahkan subsetVariables untuk definisi dataset.

 | Login | Sitemap | 
 | Login | Login | 
 |   **Login**   | Sitemap | 
 |   **Sitemap**   | Login | 
 |   **Tujuan jangka panjang**   | Login | 
 |   **Sitemap**   | Ditambahkan dalam 2.26 | 

##  **Sitemap** 

###  **Login** 

Sitemap
Aktifkan sistem berlangganan email untuk pembaruan dataset.

 | Login | Sitemap | 
 | Login | Login | 
 |   **Login**   | Login | 
 |   **Sitemap**   | Login | 
 |   **Tujuan jangka panjang**   | Login | 
 |   **Sitemap**   | Ditambahkan dalam 1.14 | 

###  **Login** 

Sitemap
Memungkinkan ini ERDDAP Contoh untuk berlangganan jarak jauh ERDDAP dataset untuk pembaruan.

 | Login | Sitemap | 
 | Login | Login | 
 |   **Login**   | Login | 
 |   **Sitemap**   | Login | 
 |   **Tujuan jangka panjang**   | Login | 
 |   **Sitemap**   | Ditambahkan dalam 1.70 | 

###  **Sitemap** 

Sitemap
Pemicu berlangganan dan RSS update ketika mendasari perubahan file. Perilaku legacy hanya untuk melakukan pembaruan pada reload dataset (yang memiliki beberapa server selama mingguan) Sitemap

 | Login | Sitemap | 
 | Login | Login | 
 |   **Login**   | Login | 
 |   **Sitemap**   | Login | 
 |   **Tujuan jangka panjang**   | Login | 
 |   **Sitemap**   | Ditambahkan dalam 2.26 | 

###  **Sitemap Login** 

Sitemap
Memulai broker MQTT internal dalam aplikasi untuk menangani pesan.

 | Login | Sitemap | 
 | Login | Login | 
 |   **Login**   | Sitemap | 
 |   **Sitemap**   | Login | 
 |   **Tujuan jangka panjang**   | set sesuai keinginan | 
 |   **Sitemap**   | Ditambahkan di 2.29.0 | 

###  **Login** 

Sitemap
Aktifkan penerbitan pemberitahuan (seperti perubahan dataset) ke broker MQTT.

 | Login | Sitemap | 
 | Login | Login | 
 |   **Login**   | Sitemap | 
 |   **Sitemap**   | Login | 
 |   **Tujuan jangka panjang**   | set sesuai keinginan | 
 |   **Sitemap**   | Ditambahkan di 2.29.0 | 

##  **Web Header** 

###  **Login Sitemap** 

Sitemap
Memungkinkan menggunakan header HTTP untuk menentukan rincian URL permintaan (berguna di balik proxy) Sitemap

 | Login | Sitemap | 
 | Login | Login | 
 |   **Login**   | Login | 
 |   **Sitemap**   | Login | 
 |   **Tujuan jangka panjang**   | Login | 
 |   **Sitemap**   | JPG PNG BMP GIF 3 MB | 

###  **Sitemap Login** 

Sitemap
Aktifkan Berbagi Sumber Daya Lintas-Origin (Login) header pada respon HTTP.

 | Login | Sitemap | 
 | Login | Login | 
 |   **Login**   | Login | 
 |   **Sitemap**   | Login | 
 |   **Tujuan jangka panjang**   | set sesuai keinginan | 
 |   **Sitemap**   | Ditambahkan dalam 2.26 | 

##  **Sitemap** 

###  **Login** 

Sitemap
Saklar mesin pencari internal untuk menggunakan Apache Lucene.

 | Login | Sitemap | 
 | Login | Login | 
 |   **Login**   | Sitemap | 
 |   **Sitemap**   | Login | 
 |   **Tujuan jangka panjang**   | Sitemap | 
 |   **Sitemap**   | Login | 

##  **Sitemap** 

###  **Login** 

Sitemap
Aktifkan tampilan browser "Files" untuk set data yang mendukungnya.

 | Login | Sitemap | 
 | Login | Login | 
 |   **Login**   | Login | 
 |   **Sitemap**   | Login | 
 |   **Tujuan jangka panjang**   | Login | 
 |   **Sitemap**   | Ditambahkan dalam 1,58 | 

###  **konverterActive** 

Sitemap
Memungkinkan alat konversi di UI.

 | Login | Sitemap | 
 | Login | Login | 
 |   **Login**   | Login | 
 |   **Sitemap**   | Login | 
 |   **Tujuan jangka panjang**   | Login | 
 |   **Sitemap**   | Ditambahkan dalam 1.44 | 

###  **Sitemap** 

Sitemap
Aktifkan Slide Sorter.

 | Login | Sitemap | 
 | Login | Login | 
 |   **Login**   | Login | 
 |   **Sitemap**   | Login | 
 |   **Tujuan jangka panjang**   | Login | 
 |   **Sitemap**   | Ditambahkan dalam 1.44 | 

###  **dataProviderFormActive** 

Sitemap
Aktifkan formulir yang memungkinkan penyedia data untuk memasukkan metadata.

 | Login | Sitemap | 
 | Login | Login | 
 |   **Login**   | Login | 
 |   **Sitemap**   | Login | 
 |   **Tujuan jangka panjang**   | Login | 
 |   **Sitemap**   | Login | 

###  **Sitemap** 

Sitemap
Aktifkan pelaporan dataset yang terbaru.

 | Login | Sitemap | 
 | Login | Login | 
 |   **Login**   | Login | 
 |   **Sitemap**   | Login | 
 |   **Tujuan jangka panjang**   | Login | 
 |   **Sitemap**   | Ditambahkan dalam 1.82 | 

###  **Login** 

Sitemap
Aktifkan Layanan Peta Web ( WMS ) Login

 | Login | Sitemap | 
 | Login | Login | 
 |   **Login**   | Login | 
 |   **Sitemap**   | Login | 
 |   **Tujuan jangka panjang**   | Login | 
 |   **Sitemap**   | Ditambahkan dalam 1.44 | 

###  **Login** 

Sitemap
Aktifkan internal WMS fitur klien.

 | Login | Sitemap | 
 | Login | Login | 
 |   **Login**   | Login | 
 |   **Sitemap**   | Login | 
 |   **Tujuan jangka panjang**   | Login | 
 |   **Sitemap**   | Login | 

###  **geoServicesRestAktif** 

Sitemap
Aktifkan RESTful antarmuka untuk Layanan Geospatial. Tidak sepenuhnya diimplementasikan.

 | Login | Sitemap | 
 | Login | Login | 
 |   **Login**   | Di bawah Konstruksi | 
 |   **Sitemap**   | Login (Login)   | 
 |   **Tujuan jangka panjang**   | Login | 

###  **Login** 

Sitemap
Aktifkan Layanan Web Cakupan ( WCS ) Login Tidak sepenuhnya diimplementasikan.

 | Login | Sitemap | 
 | Login | Login | 
 |   **Login**   | Di bawah Konstruksi | 
 |   **Sitemap**   | Login (Login)   | 
 |   **Tujuan jangka panjang**   | Login | 

###  **Login** 

Sitemap
Aktifkan Layanan Observasi Sensor ( SOS ) Login

 | Login | Sitemap | 
 | Login | Login | 
 |   **Login**   | Di bawah Konstruksi | 
 |   **Sitemap**   | Login (Login)   | 
 |   **Tujuan jangka panjang**   | Login | 
