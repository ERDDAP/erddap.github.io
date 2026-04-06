---
sidebar_position: 3
---
#  ERDDAP™ Rilis Proses
* Pastikan berkas perbandingan gambar tersedia (ini mungkin berarti berjalan `mvn verify` , jika Anda ingin mempercepat bahwa sampai membatasi hanya kelompok Imageoparison meskipun catatan yang masih membutuhkan menjalankan tes Jetty) 
* Mutakhirkan ketergantungan
```
mvn versions:display-dependency-updates   // (displays updates)
mvn versions:use-latest-versions  // (updates dependencies, though sometimes we don’t want to do all of them)
mvn versions:update-properties // (updates versions in the property block)
```
* Mutakhirkan plugin
```
mvn versions:display-plugin-updates // (displays updates, need to manually update)
```
* Jalankan tes untuk memastikan pembaruan ketergantungan tidak melanggar apa pun untuk semua konfigurasi utama (dataset parsing khususnya, meskipun ada konfigurasi signifikan lainnya juga) . Perhatikan bahwa suite tes eksternal bisa sangat mencolok. Tes suite yang lambat bisa memakan waktu yang sangat lama.
```
mvn verify
mvn verify -P external
mvn verify -P slowAWS
```
* Gunakan `python terjemahan / translate.py` untuk memperbarui terjemahan jika diperlukan.
* EDStatic.java mengatur pengembangan Mode ke false, ubah nomor versi dan tentukan tanggal rilis.
* Lakukan membangun.
```
mvn clean
mvn compile
mvn package
```
## Canary
Kirim berkas perang untuk distribusi pada server Coastwatch atau beberapa server lain yang menggunakan sebagian besar jenis data dan menerima banyak lalu lintas.
Kami ingin mencoba untuk menemukan kesalahan sebelum distribusi lebih lebar dari pembangunan.

Sertakan pesan ketika menceritakan rilis baru.

Prosedur standar adalah:
* Unggah berkas .war ke penjaga pantai \\[ tomcat \\] / isi / erddap /
* Sebagai pengguna = tomcat:
  * Masuk \\[ tomcat \\] / bin /:
. / shutdown.sh / / gunakan "ps -fu tomcat" untuk memastikan itu telah berhenti
  * Masuk \\[ tomcat \\] / webapps /:
rm -rf erddap
Aku erddap. perang
cp.. / isi / erddap / erddap2.22.war erddap.war / / atau apapun nomornya
  * Masuk \\[ tomcat \\] / bin /:
. / startup.sh
  * Setelah ERDDAP telah mengembalikan halaman web, dalam \\[ tomcat \\] / webapps /:
chgrp -R erddap erddap
chmod -R g + rw erddap
chmod -R o- rwx erddap

## Rilis GitHub
Draft the GitHub release, including erdtap.war and erdlapContent .zip   (tidak ada nomor versi) 

title: The official v2.25 version
deskripsi: Lihat daftar perubahan pada
       https://erddap.github.io/changes#version-225
 

## Pemutakhiran Dokumentasi
* Mutakhirkan nomor versi dalam berkas docusaurus.config.ts (di bagian kaki) .
* Sunting halaman dokumentasi (Ganti-install.md dan Depaly- update.md) .
  * Cari \\[ erddap.war \\]  
  * Salin informasi yang telah ada (sedikit diformat ulang) ke daftar instalasi sebelumnya 2.
  * Ubah informasi rilis saat ini untuk erddap. perang di \\[ erddap.war \\] 
* Jalankan terjemahan untuk situs dokumentasi.
* Buat permintaan tarik dan gabungkan perubahan.
* Sebarkan situs dokumentasi (lihat baca) .

## Pastikan repos lain up to date seperti yang dibutuhkan
Terutama ini berarti ErddapContent dan ErddapTest, tetapi mereka harus tetap up to date selama perubahan pembangunan.

## Beritahu Pengguna
Pertama beritahu setiap pengguna yang meminta perubahan (atau yang bug diperbaiki) . Beri mereka waktu untuk memverifikasi perubahan dan / atau meningkatkan masalah.

 ERDDAP versi 2.25 sekarang tersedia&#33;

Anda dapat membaca tentang perubahan di
 https://erddap.github.io/changes#version-225
 

Beberapa perubahan adalah perubahan yang Anda sarankan. Terima kasih banyak atas saran Anda. Cari nama Anda dalam daftar perubahan untuk melihat rincian. Ini akan menjadi besar jika Anda bisa mencoba fitur baru segera, sebelum saya mengumumkan versi baru ini ke audiens yang lebih luas.

Jika Anda adalah ERDDAP administrator, instruksi untuk peningkatan berada di
 https://erddap.github.io/docs/server-admin/deploy-update
 

Jika Anda memiliki masalah, pertanyaan, saran, silakan email saya.

Terima kasih telah menggunakan ERDDAP .

### Umumkan rilis
Kirim pengumuman ke daftar Pengumuman.
