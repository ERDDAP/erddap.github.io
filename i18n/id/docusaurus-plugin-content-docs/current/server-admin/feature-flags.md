# Flag Fitur

Halaman ini mendokumentasikan tanda konfigurasi yang tersedia di sistem. Bendera ini mengendalikan berbagai fitur, kemampuan eksperimental, dan perilaku warisan.

##  **Legenda Lifecycle Flag** 

*  **Stabil:** Dijadikan sebagai bendera jangka panjang untuk memungkinkan admin untuk mengubah fungsionalitas. Aman untuk produksi.
*  **Pengujian:** Fitur yang siap untuk pengujian. Ini akan baik lulus ke "Stabil" atau akhirnya ditetapkan ke nilai target mereka dan memiliki bendera dihapus.
*  **Di bawah Konstruksi:** Saat ini dikodekan untuk false dalam kode, terlepas dari konfigurasi. Fitur belum siap digunakan.

##  **♫ Optimisasi dalam pengujian** 

Ini adalah bendera kemungkinan akan dihapus di masa depan.

###  **toucheThreadlyWhenItems** 

Deskripsi
Bendera optimisasi. Jika bernilai benar (true), benang sentuh hanya berjalan ketika ada item untuk diproses.

 | Properti | Rincian | 
 | : ---- | : ---- | 
 |   **Lifecycle**   | Pengujian | 
 |   **Baku Kini**   | benar | 
 |   **Tujuan jangka panjang**   | benar | 
 |   **Riwayat**   | Ditambahkan dalam 2.29.0 | 

###  **taskCacheClear** 

Deskripsi
Aktifkan tugas latar belakang yang membersihkan butir kadaluarsa dari cache.

 | Properti | Rincian | 
 | : ---- | : ---- | 
 |   **Lifecycle**   | Stabil | 
 |   **Baku Kini**   | benar | 
 |   **Tujuan jangka panjang**   | benar | 
 |   **Riwayat**   | Ditambahkan dalam 2.27,0 | 

###  **NcHeaderMakeFile** 

Deskripsi
Bila true server akan menghasilkan seluruh berkas nc sebelum membuat hasil ncheader. Yang baru (disukai) perilaku ketika salah adalah untuk secara langsung menghasilkan hasil ndeader.

 | Properti | Rincian | 
 | : ---- | : ---- | 
 |   **Lifecycle**   | Pengujian | 
 |   **Baku Kini**   | salah | 
 |   **Tujuan jangka panjang**   | salah | 
 |   **Riwayat**   | Ditambahkan dalam 2.29.0 | 

###  **Use EddReflection** 

Deskripsi
Mengaktifkan penggunaan Java Refleksi untuk segera EDD ( ERDDAP Dataset) kelas.

 | Properti | Rincian | 
 | : ---- | : ---- | 
 |   **Lifecycle**   | Pengujian | 
 |   **Baku Kini**   | benar | 
 |   **Tujuan jangka panjang**   | benar | 
 |   **Riwayat**   | Default berubah menjadi benar dalam 2.28.0, ditambahkan dalam 2.25 | 

###  **backgroundCreateSubsettables** 

Deskripsi
Memungkinkan tabel subset dibuat dalam thread latar belakang untuk meningkatkan waktu pemuatan data.

 | Properti | Rincian | 
 | : ---- | : ---- | 
 |   **Lifecycle**   | Pengujian | 
 |   **Baku Kini**   | benar | 
 |   **Tujuan jangka panjang**   | benar | 
 |   **Riwayat**   | Ditambahkan dalam 2.29.0 | 

###  **Use Metadata ForFileTable** 

Deskripsi
Uses NetCDF metadata untuk populasi tampilan tabel berkas. Secara khusus jika sebuah berkas nc termasuk aktual _ range untuk setiap variabel, pemuatan data dapat melewatkan membaca seluruh berkas.

 | Properti | Rincian | 
 | : ---- | : ---- | 
 |   **Lifecycle**   | Stabil | 
 |   **Baku Kini**   | benar | 
 |   **Tujuan jangka panjang**   | benar | 
 |   **Riwayat**   | Ditambahkan dalam 2.29.0 | 

##  **Sistem & Perilaku Inti** 

###  **surel Aktif** 

Deskripsi
Mengendalikan apakah sistem mencoba untuk mengirim email aktual (Misalnya, untuk update atau laporan kesalahan subscription) melalui server SMTP yang dikonfigurasi.

 | Properti | Rincian | 
 | : ---- | : ---- | 
 |   **Lifecycle**   | Stabil | 
 |   **Baku Kini**   | salah | 
 |   **Tujuan jangka panjang**   | benar (Dependent pada config admin)   | 
 |   **Riwayat**   | Warisan | 

::: info Logika
Bendera ini dihitung secara dinamis pada startup. Baku ke false kecuali semua kredensial SMTP yang diperlukan (host, port, user, password, dari -address) disediakan secara ketat di setuppxml.
:::

###  **show LoadErrorsOnStatusPage** 

Deskripsi
Menentukan apakah kesalahan beban dataset rinci ditampilkan di halaman status.

 | Properti | Rincian | 
 | : ---- | : ---- | 
 |   **Lifecycle**   | Stabil | 
 |   **Baku Kini**   | benar | 
 |   **Tujuan jangka panjang**   | set sesuai keinginan | 
 |   **Riwayat**   | Ditambahkan dalam 2.25 | 

###  **navaultAccessibleViaFiles** 

Deskripsi
Tata perilaku baku untuk apakah berkas data yang mendasari dapat diakses dalam layanan berkas.

 | Properti | Rincian | 
 | : ---- | : ---- | 
 |   **Lifecycle**   | Stabil | 
 |   **Baku Kini**   | salah | 
 |   **Tujuan jangka panjang**   | salah | 
 |   **Riwayat**   | Ditambahkan dalam 2.10 | 

##  **Datasets:** 

###  **restart cepat** 

Deskripsi
Jika diaktifkan, sistem mencoba untuk memulai lebih cepat dengan melewatkan pemeriksaan validasi tertentu pada dataset selama inisialisasi.

 | Properti | Rincian | 
 | : ---- | : ---- | 
 |   **Lifecycle**   | Stabil | 
 |   **Baku Kini**   | benar | 
 |   **Tujuan jangka panjang**   | benar | 
 |   **Riwayat**   | Ditambahkan dalam 1.38 | 

###  **enableEnvParsing** 

Deskripsi
Aktifkan pemrosesan datasets.xml berkas dengan [StringSubstitutor](https://commons.apache.org/proper/commons-text/apidocs/org/apache/commons/text/StringSubstitutor.html) . Ini memiliki banyak penggunaan termasuk pengaturan nilai pribadi (seperti sandi) menggunakan variabel lingkungan.

 | Properti | Rincian | 
 | : ---- | : ---- | 
 |   **Lifecycle**   | Stabil | 
 |   **Baku Kini**   | benar | 
 |   **Tujuan jangka panjang**   | set sesuai keinginan | 
 |   **Riwayat**   | Ditambahkan dalam 2.29.0 | 

###  **usuaxParser** 

Deskripsi
Tukar mesin parsing XML internal untuk menggunakan SAX (API sederhana bagi XML) parser daripada parser DOM. Hal ini memungkinkan beberapa fitur lanjutan baru seperti XInclude, dan [atribut tampilan gubahan](https://erddap.github.io/docs/server-admin/display-info?_highlight=usesaxparser#usage-instructions) .

 | Properti | Rincian | 
 | : ---- | : ---- | 
 |   **Lifecycle**   | Pengujian | 
 |   **Baku Kini**   | salah | 
 |   **Tujuan jangka panjang**   | benar | 
 |   **Riwayat**   | Ditambahkan dalam 2.25 | 

###  **listPrivateDatasets** 

Deskripsi
Menentukan apakah dataset privat (yang membutuhkan otentikasi) muncul dalam daftar data utama.

 | Properti | Rincian | 
 | : ---- | : ---- | 
 |   **Lifecycle**   | Stabil | 
 |   **Baku Kini**   | salah | 
 |   **Tujuan jangka panjang**   | salah | 
 |   **Riwayat**   | Ditambahkan dalam 1.20 | 

###  **PosicalBoundariesActive** 

Deskripsi
Mengendalikan apakah batas politik dapat ditarik pada peta.

 | Properti | Rincian | 
 | : ---- | : ---- | 
 |   **Lifecycle**   | Stabil | 
 |   **Baku Kini**   | benar | 
 |   **Tujuan jangka panjang**   | benar | 
 |   **Riwayat**   | Ditambahkan dalam 1.80 | 

###  **Force Synchronousloading** 

Deskripsi
Muat data secara sinkron daripada menunda pemuatan latar belakang.

 | Properti | Rincian | 
 | : ---- | : ---- | 
 |   **Lifecycle**   | Stabil | 
 |   **Baku Kini**   | salah | 
 |   **Tujuan jangka panjang**   | salah | 
 |   **Riwayat**   | Ditambahkan dalam 2.30 | 

##  **Metadata & Standar** 

###  **fgdcActive** 

Deskripsi
Generasi dan melayani FGDC (Geographic Federal Komite Data) metadata.

 | Properti | Rincian | 
 | : ---- | : ---- | 
 |   **Lifecycle**   | Stabil | 
 |   **Baku Kini**   | benar | 
 |   **Tujuan jangka panjang**   | benar | 
 |   **Riwayat**   | Ditambahkan dalam 1.38 | 

###  **iso19115 Aktif** 

Deskripsi
Generasi dan melayani ISO 19115 metadata.

 | Properti | Rincian | 
 | : ---- | : ---- | 
 |   **Lifecycle**   | Stabil | 
 |   **Baku Kini**   | benar | 
 |   **Tujuan jangka panjang**   | benar | 
 |   **Riwayat**   | Ditambahkan dalam 1.38 | 

###  **useSisISO19115** 

Deskripsi
Menggunakan pustaka SIS Apache untuk menghasilkan ISO 19115 metadata bukan generator warisan. Jika ini aktif dan useSisISO19139 tidak aktif, IOS baku 19115 metadata akan dalam format ISO19115 _ 3 _ 2016. Jika ini salah, format baku akan berada dalam format ISO19115 _ 2 yang dimodifikasi oleh warisan.

 | Properti | Rincian | 
 | : ---- | : ---- | 
 |   **Lifecycle**   | Pengujian | 
 |   **Baku Kini**   | salah | 
 |   **Tujuan jangka panjang**   | benar | 
 |   **Riwayat**   | Ditambahkan dalam 2.26 | 

###  **useSisISO19139** 

Deskripsi
Menggunakan pustaka SIS Apache untuk menghasilkan metadata ISO19139 _ 2007.

 | Properti | Rincian | 
 | : ---- | : ---- | 
 |   **Lifecycle**   | Pengujian | 
 |   **Baku Kini**   | salah | 
 |   **Tujuan jangka panjang**   | salah | 
 |   **Riwayat**   | Ditambahkan dalam 2.29.0 | 

###  **jsondActive** 

Deskripsi
Generasi dan melayani JSON- LD (Data Terkait) metadata.

 | Properti | Rincian | 
 | : ---- | : ---- | 
 |   **Lifecycle**   | Stabil | 
 |   **Baku Kini**   | benar | 
 |   **Tujuan jangka panjang**   | benar | 
 |   **Riwayat**   | Warisan | 

###  **GenerateCroissantSkema** 

Deskripsi
Menghasilkan skema metadata "Croissant" sebagai skema baku untuk kesiapan pembelajaran mesin.

 | Properti | Rincian | 
 | : ---- | : ---- | 
 |   **Lifecycle**   | Pengujian | 
 |   **Baku Kini**   | benar | 
 |   **Tujuan jangka panjang**   | benar | 
 |   **Riwayat**   | Ditambahkan dalam 2.28,0 | 

###  **variablesHARUS HaveIoosKategori** 

Deskripsi
Paksa variabel yang harus memiliki atribut kategori IOOS.

 | Properti | Rincian | 
 | : ---- | : ---- | 
 |   **Lifecycle**   | Stabil | 
 |   **Baku Kini**   | benar | 
 |   **Tujuan jangka panjang**   | set sesuai keinginan | 
 |   **Riwayat**   | Warisan | 

###  **AdcludeNcFSubsetVariabel** 

Deskripsi
Perilaku Legacy adalah untuk menghasilkan variabel subset hanya untuk data data EDDTableFromNCFFIles. Ini ditambahkan ke perilaku baku untuk EDDTableFromNCFFIles agar konsisten dengan tipe data lain. Jika Anda membutuhkan warisan otomatis subsetVariables Anda dapat mengaktifkan ini. Solusi yang lebih baik akan menambahkan subsetVariables ke definisi data.

 | Properti | Rincian | 
 | : ---- | : ---- | 
 |   **Lifecycle**   | Pengujian | 
 |   **Baku Kini**   | salah | 
 |   **Tujuan jangka panjang**   | salah | 
 |   **Riwayat**   | Ditambahkan dalam 2.26 | 

##  **Keterangan dan Pemberitahuan** 

###  **subscription SystemActive** 

Deskripsi
Aktifkan sistem langganan surel bagi pemutakhiran dataset.

 | Properti | Rincian | 
 | : ---- | : ---- | 
 |   **Lifecycle**   | Stabil | 
 |   **Baku Kini**   | benar | 
 |   **Tujuan jangka panjang**   | benar | 
 |   **Riwayat**   | Ditambahkan dalam 1.14 | 

###  **subscribe ToRemoteErddapDatet** 

Deskripsi
Memungkinkan ini ERDDAP contoh untuk berlangganan ke remote ERDDAP dataset untuk pembaruan.

 | Properti | Rincian | 
 | : ---- | : ---- | 
 |   **Lifecycle**   | Stabil | 
 |   **Baku Kini**   | benar | 
 |   **Tujuan jangka panjang**   | benar | 
 |   **Riwayat**   | Ditambahkan dalam 1.70 | 

###  **updateSubsRssOnFilechanges** 

Deskripsi
Triggers berlangganan dan RSS pemutakhiran ketika mendasari perubahan berkas. Perilaku warisan hanya untuk melakukan pemutakhiran pada reload data (yang beberapa server memiliki sebagai jarang sebagai mingguan) .

 | Properti | Rincian | 
 | : ---- | : ---- | 
 |   **Lifecycle**   | Stabil | 
 |   **Baku Kini**   | benar | 
 |   **Tujuan jangka panjang**   | benar | 
 |   **Riwayat**   | Ditambahkan dalam 2.26 | 

###  **aktifkan MqttBroker** 

Deskripsi
Memulai broker MQTT internal dalam aplikasi untuk menangani pesan.

 | Properti | Rincian | 
 | : ---- | : ---- | 
 |   **Lifecycle**   | Pengujian | 
 |   **Baku Kini**   | salah | 
 |   **Tujuan jangka panjang**   | set sesuai keinginan | 
 |   **Riwayat**   | Ditambahkan dalam 2.29.0 | 

###  **publishMqttNoaf** 

Deskripsi
Aktifkan penerbitan pemberitahuan (seperti perubahan data) ke broker MQTT.

 | Properti | Rincian | 
 | : ---- | : ---- | 
 |   **Lifecycle**   | Pengujian | 
 |   **Baku Kini**   | salah | 
 |   **Tujuan jangka panjang**   | set sesuai keinginan | 
 |   **Riwayat**   | Ditambahkan dalam 2.29.0 | 

##  **Tajuk Web / Konfigurasi** 

###  **useHeader For Url** 

Deskripsi
Memungkinkan memakai header HTTP untuk menentukan rincian URL permintaan (berguna dibelakang proksi) .

 | Properti | Rincian | 
 | : ---- | : ---- | 
 |   **Lifecycle**   | Stabil | 
 |   **Baku Kini**   | benar | 
 |   **Tujuan jangka panjang**   | benar | 
 |   **Riwayat**   | Baku berubah menjadi benar dalam 2.28,0, ditambahkan dalam 2.27,0 | 

###  **aktifkan Cors** 

Deskripsi
Mengaktifkan Cross- Origin Resource Sharing (CORS) tajuk pada respon HTTP.

 | Properti | Rincian | 
 | : ---- | : ---- | 
 |   **Lifecycle**   | Stabil | 
 |   **Baku Kini**   | salah | 
 |   **Tujuan jangka panjang**   | set sesuai keinginan | 
 |   **Riwayat**   | Ditambahkan dalam 2.26 | 

##  **Pencarian** 

###  **Use LuceneSearchEngine** 

Deskripsi
Mengubah mesin pencari internal menggunakan Apache Lucene.

 | Properti | Rincian | 
 | : ---- | : ---- | 
 |   **Lifecycle**   | Pengujian | 
 |   **Baku Kini**   | salah | 
 |   **Tujuan jangka panjang**   | ? | 
 |   **Riwayat**   | Warisan | 

##  **Layanan & Protokol** 

###  **fileAktif** 

Deskripsi
Aktifkan tampilan peramban "Files" untuk tata data yang mendukungnya.

 | Properti | Rincian | 
 | : ---- | : ---- | 
 |   **Lifecycle**   | Stabil | 
 |   **Baku Kini**   | benar | 
 |   **Tujuan jangka panjang**   | benar | 
 |   **Riwayat**   | Ditambahkan dalam 1.58 | 

###  **konversi Aktif** 

Deskripsi
Aktifkan alat konversi di UI.

 | Properti | Rincian | 
 | : ---- | : ---- | 
 |   **Lifecycle**   | Stabil | 
 |   **Baku Kini**   | benar | 
 |   **Tujuan jangka panjang**   | benar | 
 |   **Riwayat**   | Ditambahkan dalam 1.44 | 

###  **slideSorterActive** 

Deskripsi
Aktifkan Slide Sorter.

 | Properti | Rincian | 
 | : ---- | : ---- | 
 |   **Lifecycle**   | Stabil | 
 |   **Baku Kini**   | benar | 
 |   **Tujuan jangka panjang**   | benar | 
 |   **Riwayat**   | Ditambahkan dalam 1.44 | 

###  **dataProviderFormActive** 

Deskripsi
Mengaktifkan formulir yang memungkinkan penyedia data ke metadata masukan.

 | Properti | Rincian | 
 | : ---- | : ---- | 
 |   **Lifecycle**   | Stabil | 
 |   **Baku Kini**   | benar | 
 |   **Tujuan jangka panjang**   | benar | 
 |   **Riwayat**   | Warisan | 

###  **OUT DateDatasetsActive** 

Deskripsi
Aktifkan pelaporan dari data-of-date.

 | Properti | Rincian | 
 | : ---- | : ---- | 
 |   **Lifecycle**   | Stabil | 
 |   **Baku Kini**   | benar | 
 |   **Tujuan jangka panjang**   | benar | 
 |   **Riwayat**   | Ditambahkan dalam 1.82 | 

###  **wmsActive** 

Deskripsi
Aktifkan Layanan Peta Web ( WMS ) antarmuka.

 | Properti | Rincian | 
 | : ---- | : ---- | 
 |   **Lifecycle**   | Stabil | 
 |   **Baku Kini**   | benar | 
 |   **Tujuan jangka panjang**   | benar | 
 |   **Riwayat**   | Ditambahkan dalam 1.44 | 

###  **wmsClientActive** 

Deskripsi
Mengaktifkan internal WMS fitur klien.

 | Properti | Rincian | 
 | : ---- | : ---- | 
 |   **Lifecycle**   | Stabil | 
 |   **Baku Kini**   | benar | 
 |   **Tujuan jangka panjang**   | benar | 
 |   **Riwayat**   | Warisan | 

###  **geoServivesReactive** 

Deskripsi
Mengaktifkan RESTful antarmuka untuk Layanan Geospasial. Tidak sepenuhnya diimplementasikan.

 | Properti | Rincian | 
 | : ---- | : ---- | 
 |   **Lifecycle**   | Di bawah Konstruksi | 
 |   **Baku Kini**   | salah (Hardcode)   | 
 |   **Tujuan jangka panjang**   | benar | 

###  **wcsActive** 

Deskripsi
Mengaktifkan Layanan Coverage Web ( WCS ) antarmuka. Tidak sepenuhnya diimplementasikan.

 | Properti | Rincian | 
 | : ---- | : ---- | 
 |   **Lifecycle**   | Di bawah Konstruksi | 
 |   **Baku Kini**   | salah (Hardcode)   | 
 |   **Tujuan jangka panjang**   | benar | 

###  **sosactive** 

Deskripsi
Mengaktifkan Layanan Pengamatan Sensor ( SOS ) antarmuka.

 | Properti | Rincian | 
 | : ---- | : ---- | 
 |   **Lifecycle**   | Di bawah Konstruksi | 
 |   **Baku Kini**   | salah (Hardcode)   | 
 |   **Tujuan jangka panjang**   | benar | 
