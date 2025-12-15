---
sidebar_position: 9
---
# Login

 [Prometheus metrik](https://prometheus.io/) tersedia di /erddap/metrik. JVM inti metrik ditambahkan dalam 2.25 dengan banyak ERDDAP™ metrik ditambahkan dalam versi 2.26. Jika Anda ingin menggunakan metrik pastikan Anda setidaknya versi 2.26. Mereka default untuk diaktifkan, Anda dapat menonaktifkan mereka dengan menambahkan
```xml
<usePrometheusMetrics>false</usePrometheusMetrics>
```
ke setup Anda.xml.

metrik ini dirancang untuk menjadi mesin yang dapat dibaca. Meskipun Anda dapat memeriksa halaman metrik secara manual, untuk pemantauan kedalaman dianjurkan untuk menggunakan server Prometheus. Server Prometheus akan menyimpan metrik historis yang memungkinkan pemantauan lebih mendalam (seperti tarif dan perubahan dari nilai masa lalu) , dan juga sering dijalankan dengan server Grafana. Kami menyediakan beberapa dasbor prebuilt yang admin dapat menemukan berguna untuk memulai memantau server mereka.

## Web Server

Dokumentasi terbaik untuk menjalankan tumpukan pemantauan (WordPress.org) di Prometheus [Login](https://github.com/ERDDAP/erddap/blob/main/docker/prometheus/README.md) Sitemap

##  ERDDAP™ metrik

### Login

 ERDDAP™ ekspor sejumlah metrik yang mungkin Anda temukan (Sitemap ERDDAP™ 2.25) Sitemap Untuk pemantauan umum kesehatan JVM kita menggunakan metrik yang dikumpulkan oleh klien Prometheus. Ini termasuk data tentang pengumpulan sampah, penggunaan memori, benang, dan banyak lagi. Untuk informasi lebih lanjut [Login Java Klien JVM dokumentasi](https://prometheus.github.io/client_java/instrumentation/jvm/) Sitemap

###  ERDDAP™ Sitemap

Kami juga mengekspor sejumlah ERDDAP™ metrik spesifik (Sitemap ERDDAP™ 2.26) Sitemap Jika Anda ingin menggali kode, Anda dapat menemukan metrik yang dikumpulkan dalam [Login](https://github.com/ERDDAP/erddap/blob/main/WEB-INF/classes/gov/noaa/pfel/erddap/util/Metrics.java) Sitemap

####  ERDDAP _build_info

Ini adalah info build untuk ERDDAP™ Login Ini termasuk versi (Login) versi_full (WordPress.org) Sitemap (digunakan untuk menunjukkan bagaimana server digunakan, seperti 'Docker Sitemap) Sitemap

#### Login

Ini adalah metrik info yang menunjukkan keadaan saat ini dari bendera fitur. Kebanyakan opsi konfigurasi boolean dianggap bendera fitur.

#### Login Login

Ini adalah metrik info yang menunjukkan apakah akselerasi grafis tersedia.

####  http _request_duration_detik

Ini adalah histogram dari durasi respon permintaan dalam hitungan detik. Label adalah tipe request_ (misalnya griddap, tabledap file, wms) Dataset_id (jika berlaku, jika tidak mengulangi jenis permintaan) Login (format output untuk permintaan e.g. '.html', '.csv', '.iso19115 Sitemap) lang_kode (bahasa untuk permintaan, atau string kosong jika default) status_kode ( http Kode status permintaan misalnya 200, 302, 404) Sitemap

Ini dapat digunakan untuk melacak permintaan dengan dataset id untuk menentukan dataset populer server. Hal ini juga dapat membantu mengidentifikasi apakah ada jenis permintaan tertentu yang lambat pada server Anda.

#### WordPress.org

Histogram durasi tugas benang sentuh. Mereka dilabeli dengan sukses (Sitemap) Sitemap

#### tugas_thread_duration_detik

Sebuah histogram durasi ulir tugas. Mereka dilabeli dengan sukses (Sitemap) dan tugas_jenis (Login) Sitemap

#### load_datasets_duration_detik

Sebuah histogram durasi untuk tugas dataset beban. Mereka dilabeli dengan besar (Sitemap) Sitemap

#### email_thread_duration_detik

Histogram durasi tugas benang email. Mereka dilabeli dengan sukses (Sitemap) Sitemap

#### email_count_distribusi

Sebuah histogram email per tugas.

#### dataset_count

Pengukur data set, set setelah setiap panggilan dataset beban. Ini dilabeli dengan kategori (grid, tabel) Sitemap

#### Facebook Twitter Google Plus Pinterest Email

Pengukur dataset yang gagal dimuat, ditetapkan setelah setiap panggilan dataset beban.

#### shed_requests_total

Kontra permintaan yang gudang. Server akan menduga permintaan ketika percaya server rendah pada memori (Login) dan permintaan akan menyebabkan masalah. Ini tidak termasuk permintaan bahwa kesalahan karena RAM atau ruang disk rendah selama penanganan permintaan.

#### berbahaya_memory_email_total

Kontra kali server mencoba mengirim email ke admin yang memori berbahaya rendah.

#### berbahaya_memory_failures_total

Kontra permintaan yang gagal karena mesin keluar dari memori. Seringkali kali ini karena mesin menerima banyak permintaan mahal atau permintaan individu sangat besar.

#### Login

Kontra permintaan untuk data topo. Ini adalah cache yang label (cached/not_cached) Sitemap

#### Penghitung Boundary

Ada juga koleksi counter untuk permintaan untuk batas:

 - Facebook Twitter Google Plus Pinterest Email
 - state_boundaries_request_total
 - Facebook Twitter Pinterest
 - gshhs_request_total

Ini dilabeli dengan status (kasar, sukses, jari-jari kaki) Sitemap
