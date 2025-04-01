---
sidebar_position: 3
---
# ERDDAP™Proses Rilis
* Pastikan file perbandingan gambar tersedia (ini mungkin berarti menjalankan `mvn verifikasi`, jika Anda ingin mempercepat bahwa hanya kelompok ImageComparison meskipun catatan bahwa masih membutuhkan tes Jetty yang berjalan) 
* Ketergantungan pembaruan
```
mvn versions:display-dependency-updates   // (displays updates)
mvn versions:use-latest-versions  // (updates dependencies, though sometimes we don’t want to do all of them)
mvn versions:update-properties // (updates versions in the property block)
```
* Update plugin
```
mvn versions:display-plugin-updates // (displays updates, need to manually update)
```
* Menjalankan tes untuk memastikan pembaruan ketergantungan tidak melanggar apa pun untuk semua konfigurasi utama (dataset parsing khususnya, meskipun pengaturan lain yang signifikan serta) 
```
mvn verify
```
* Menggunakan TranslateMessages.translate () untuk memperbarui terjemahan jika diperlukan
* EDStatic.java set pembangunan Mode untuk palsu, mengubah nomor versi dan menentukan tanggal rilis.
* Sitemap
```
mvn clean
mvn compile
mvn package
```
## Login
Kirim file perang untuk distribusi pada server Coastwatch atau beberapa server lain yang menggunakan sebagian besar jenis dataset dan menerima banyak lalu lintas.
Kami ingin mencoba untuk menemukan kesalahan sebelum distribusi yang lebih luas dari build.

Sertakan pesan ketika memberitahu tentang rilis baru.

Prosedur standar adalah:
* Unggah file .war ke jam tangan pantai\\[Login\\]Login
* Sebagai pengguna=tomcat:
  * Sitemap\\[Login\\]Login
./shutdown.sh //use "ps -fu tomcat" untuk memastikan ia telah berhenti
  * Sitemap\\[Login\\]Login
rm -rf erddap
Login Login
Login ../content/erddap/erddap2.22.war erddap.war //atau berapa pun jumlahnya
  * Sitemap\\[Login\\]Login
./startup.sh
  * SitemapERDDAPtelah kembali halaman web, di\\[Login\\]Login
Login
Login
Login

## Rilis GitHub
Draft rilis GitHub, termasuk erddap.war dan erddapContent.zip  (tidak ada nomor versi) 

title: The official v2.25 version
Sitemap Lihat daftar perubahan di
       https://erddap.github.io/changes#version-225
 

## Database
* Memperbarui nomor versi dalam file docusaurus.config.ts (di bagian footer) Sitemap
* Edit halaman dokumentasi (use-install.md dan deploy-update.md) Sitemap
  * Sitemap\\[Login\\] 
  * Salin informasi yang ada (sedikit diformat) ke daftar instalasi sebelumnya 2. di
  * Mengubah informasi rilis saat ini untuk erddap. perang\\[Login\\]
* Jalankan terjemahan untuk situs dokumentasi.
* Membuat pull request dan menggabungkan perubahan.
* Menyebarkan situs dokumentasi (Login) Sitemap

## Pastikan repos lain hingga tanggal sesuai kebutuhan
Terutama ini berarti ErddapContent dan ErddapTest, tetapi mereka harus disimpan hingga tanggal selama perubahan pembangunan.

## Berita
Pertama memberitahukan setiap pengguna yang meminta perubahan (atau bug yang tetap) Sitemap Memberikan waktu untuk memverifikasi perubahan dan/atau meningkatkan masalah.

ERDDAPversi 2.25 sekarang tersedia&#33;

Anda dapat membaca perubahan
 https://erddap.github.io/changes#version-225
 

Beberapa perubahan yang Anda rekomendasikan. Terima kasih banyak atas saran Anda. Cari nama Anda dalam daftar perubahan untuk melihat rincian. Ini akan bagus jika Anda bisa mencoba fitur baru segera, sebelum saya mengumumkan versi baru ini ke audiens yang lebih luas.

Jika Anda adalahERDDAPadministrator, instruksi untuk peningkatan adalah
 https://erddap.github.io/docs/server-admin/deploy-update
 

Jika Anda memiliki masalah, pertanyaan, saran, silakan email saya.

Terima kasih untuk menggunakanERDDAPSitemap

### Sitemap
Kirim pengumuman ke daftar Mailing Pengumuman.
