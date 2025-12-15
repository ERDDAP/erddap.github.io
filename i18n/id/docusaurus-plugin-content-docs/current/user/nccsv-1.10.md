---
title: "NCCSV 1.10"
---

# Login
Login NetCDF -Compatible ASCII CSV File Spesifikasi,
Versi 1.10

Bob Simons dan Steve Hankin
"NCCSV" oleh Bob Simons dan Steve Hankin berlisensi di bawah [GND 4.0](https://creativecommons.org/licenses/by/4.0/) 

##  [Sitemap](#introduction)  {#introduction} 

Dokumen ini menentukan format file teks CSV ASCII yang dapat berisi semua informasi (metadata dan data) yang dapat ditemukan dalam NetCDF   .nc file yang berisi tabel data seperti CSV-file. Ekstensi file untuk file teks CSV ASCII mengikuti spesifikasi ini harus .csv sehingga dapat dibaca dengan mudah dan benar menjadi program spreadsheet seperti Excel dan Google Sheets. Bob Simons akan menulis perangkat lunak untuk mengkonversi file NCCSV ke dalam NetCDF Login (dan mungkin juga NetCDF Login)   .nc file, dan terbalik, tanpa kehilangan informasi. Bob Simons telah dimodifikasi [ ERDDAP™ ](https://coastwatch.pfeg.noaa.gov/erddap/index.html) untuk mendukung membaca dan menulis file jenis ini.

Format NCCSV dirancang sehingga perangkat lunak spreadsheet seperti Excel dan Google Sheets dapat mengimpor file NCCSV sebagai file csv, dengan semua informasi dalam sel spreadsheet siap untuk mengedit. Atau, spreadsheet dapat dibuat dari awal setelah konvensi NCCSV. Terlepas dari sumber spreadsheet, jika kemudian diekspor sebagai file .csv, itu akan sesuai dengan spesifikasi NCCSV dan tidak ada informasi yang akan hilang. Satu-satunya perbedaan antara file NCCSV dan file spreadsheet analog yang mengikuti Konvensi ini adalah:

* file NCCSV memiliki nilai pada garis dipisahkan oleh kommas.
Spreadsheet memiliki nilai pada garis dalam sel yang berdekatan.
* String dalam file NCCSV sering dikelilingi oleh kutipan ganda.
String dalam spreadsheet tidak pernah dikelilingi oleh kutipan ganda.
* Kutipan ganda internal (Sitemap) dalam Strings dalam file NCCSV muncul sebagai 2 kutipan ganda.
Kutipan ganda internal dalam spreadsheet muncul sebagai 1 kutipan ganda.

Sitemap [Login](#spreadsheets) bagian di bawah ini untuk informasi lebih lanjut.

### Login{#streamable} 
Seperti file CSV secara umum, file NCCSV dapat streaming. Jadi, jika NCSV dihasilkan di atas-the-fly oleh server data seperti [ ERDDAP™ ](https://coastwatch.pfeg.noaa.gov/erddap/index.html) , server dapat mulai merampingkan data ke requester sebelum semua data telah dikumpulkan. Ini adalah fitur yang berguna dan diinginkan. NetCDF file, dengan kontras, tidak dapat streaming.

###  ERDDAP™  {#erddap} 
Spesifikasi ini dirancang sehingga file NCCSV dan .nc file yang dapat dibuat dari mereka dapat digunakan oleh [ ERDDAP™ server data](https://coastwatch.pfeg.noaa.gov/erddap/index.html)   (Sitemap [Login](/docs/server-admin/datasets#eddtablefromnccsvfiles) Login [Login](/docs/server-admin/datasets#eddtablefromncfiles) jenis dataset) , tetapi spesifikasi ini eksternal untuk ERDDAP Sitemap ERDDAP™ memiliki beberapa atribut global yang diperlukan dan banyak atribut global dan variabel yang disarankan, sebagian besar berdasarkan atribut CF dan ACDD (lihat
 [/docs/server-admin/dataset#global-attributes](/docs/server-admin/datasets#global-attributes) Sitemap

### Login{#balance} 
Desain format NCCSV adalah keseimbangan beberapa persyaratan:

* File harus berisi semua data dan metadata yang akan ada di tabular NetCDF file, termasuk jenis data tertentu.
* File harus dapat dibaca dan kemudian ditulis dari spreadsheet tanpa kehilangan informasi.
* File harus mudah bagi manusia untuk membuat, mengedit, membaca, dan memahami.
* File harus dapat diserang dengan program komputer.

Jika beberapa persyaratan dalam dokumen ini tampaknya aneh atau acar, mungkin diperlukan untuk memenuhi salah satu persyaratan ini.

### Spesifikasi Lainnya{#other-specifications} 
Spesifikasi ini mengacu pada beberapa spesifikasi dan perpustakaan lain yang dirancang untuk bekerja dengan, tetapi spesifikasi ini bukan bagian dari salah satu spesifikasi lain, atau tidak perlu perubahan pada mereka, atau tidak bertentangan dengan mereka. Jika detail terkait dengan salah satu standar ini tidak ditentukan di sini, lihat spesifikasi terkait. Tidak mungkin, ini termasuk:

* Konvensi Menarik untuk Penemuan Dataset (Login) standar metadata:
     [https://wiki.esipfed.org/Attribute\\_Convention\\_for\\_Data\\_Discovery\\_1-3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) Sitemap
* Iklim dan Prakiraan (Login) standar metadata:
     [https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html) Sitemap
* Login NetCDF Panduan Pengguna (Login) Sitemap
     [https:///docs.unidata.ucar.edu/netcdf-java/current/userguide/index.html](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/index.html) Sitemap
* Login NetCDF pustaka perangkat lunak seperti NetCDF Login NetCDF Login
     [https://www.unidata.ucar.edu/software/netcdf/](https://www.unidata.ucar.edu/software/netcdf/) Sitemap Perpustakaan ini tidak dapat membaca file NCCSV, tetapi mereka dapat membaca .nc file yang dibuat dari file NCCSV.
* Login [https://www.json.org/](https://www.json.org/) 

### Login{#notation} 
Dalam spesifikasi ini, kurung, \\[   \\] , menunjukkan item opsional.

##  [Struktur file](#file-structure)  {#file-structure} 

File NCCSV lengkap terdiri dari dua bagian: bagian metadata, diikuti oleh bagian data.

File NCCSV harus hanya mengandung karakter ASCII 7-bit. Karena ini, set karakter atau pengkodean yang digunakan untuk menulis dan membaca file mungkin set karakter atau pengkodean yang kompatibel dengan set karakter ASCII 7-bit, misalnya, ISO-8859-1. ERDDAP™ membaca dan menulis file NCCSV dengan charset ISO-8859-1.

file NCCSV dapat menggunakan garis baru ( \\n )   (yang umum pada Linux dan Mac OS X komputer) atau keretaReturn plus newline ( \\r\\n )   (yang umum pada komputer Windows) sebagai penanda akhir-of-line, tetapi tidak keduanya.

###  .nccsv Login{#nccsvmetadata} 
Ketika kedua pencipta dan pembaca mengharapkannya, itu juga mungkin dan kadang-kadang berguna untuk membuat varian dari file NCCSV yang berisi hanya bagian metadata (Sitemap\\*Login\\*Login) Sitemap Hasilnya menyediakan deskripsi lengkap atribut file, nama variabel, dan jenis data, sehingga melayani tujuan yang sama dengan .das plus .dds tanggapan dari OPeNDAP Login ERDDAP™ akan mengembalikan variasi ini jika Anda meminta file Login .nccsv Metadata ERDDAP™ Login

##  [Bagian Metadata](#the-metadata-section)  {#the-metadata-section} 

Dalam file NCCSV, setiap baris bagian metadata menggunakan format
 [Login Login](#variablename) Login [Login Login](#attributename) Login [nilai1](#value)  \\[ Login \\]  \\[ Login \\]  \\[ Login \\]  \\[ Login \\]   
Ruang sebelum atau setelah item tidak diperbolehkan karena mereka menyebabkan masalah ketika mengimpor file ke program spreadsheet.

### Login{#conventions} 
Garis pertama dari file NCCSV adalah baris pertama dari bagian metadata dan harus memiliki [\\*Login\\*](#global) Konvensi atribut daftar semua Konvensi yang digunakan dalam file sebagai String yang berisi daftar CSV, misalnya:
\\*Login\\*Login COARDS  Endereço:No.169,Changyang East Road,Jiangbei,Ningbo,China, Ningbo, Zhejiang
Salah satu Konvensi yang tercantum harus NCCSV-1.1, yang mengacu pada versi spesifikasi ini.

### Login{#end_metadata} 
Ujung bagian metadata dari file NCCSV harus didebukan dengan satu-satunya
\\*Login\\*

Disarankan tetapi tidak diperlukan bahwa semua atribut untuk variabel yang diberikan muncul pada garis yang berdekatan dari bagian metadata. Jika file NCCSV diubah menjadi NetCDF file, urutan variabelNames pertama muncul di bagian metadata akan menjadi urutan variabel dalam NetCDF Login

Garis kosong opsional diperbolehkan di bagian metadata setelah baris pertama yang diperlukan dengan [\\*Login\\*](#global)   [Login](#conventions) Sitemap (Sitemap) dan sebelum garis terakhir yang diperlukan dengan\\*Login\\*Sitemap

Jika spreadsheet dibuat dari file NCCSV, bagian data metadata akan muncul dengan nama variabel di kolom A, nama atribut di kolom B, dan nilai dalam kolom C.

Jika spreadsheet mengikuti konvensi ini disimpan sebagai file CSV, seringkali akan kommas tambahan pada akhir garis di bagian metadata. Perangkat lunak yang mengubah file NCCSV menjadi .nc file akan mengabaikan kommas tambahan.

###  [Login Login](#variablename)  {#variablename} 

 *Login Login* adalah nama yang sensitif dari variabel dalam file data. Semua nama variabel harus dimulai dengan surat ASCII 7-bit atau underscore dan terdiri dari huruf ASCII 7-bit, underscores, dan digit ASCII 7-bit.
#### Login{#global} 
Nama variabel khusus [\\*Login\\*](#global) digunakan untuk menunjukkan metadata global.

###  [Login Login](#attributename)  {#attributename} 

 *Login Login* adalah nama sensitif dari atribut yang terkait dengan variabel atau [\\*Login\\*](#global) Sitemap Semua nama atribut harus dimulai dengan surat ASCII 7-bit atau underscore dan terdiri dari huruf ASCII 7-bit, underscores, dan digit ASCII 7-bit.

#### Login{#scalar} 
Atribut khusus Login\\*Login\\*dapat digunakan untuk membuat variabel data scalar dan menentukan nilainya. Jenis data dari\\*Login\\*mendefinisikan jenis data untuk variabel, sehingga tidak menentukan\\*DATA\\_TYPE\\*atribut untuk variabel scalar. Perhatikan bahwa tidak harus ada data untuk variabel scalar di Bagian Data dari file NCCSV.

Misalnya, untuk membuat variabel scalar bernama "ship" dengan nilai "Okeanos Explorer" dan atribut cf\\_role, gunakan:
kapal,\\*Login\\*"Okeanos Explorer"
kapal,cf\\_role,trajectory\\_id
Ketika variabel data scalar dibaca ke ERDDAP™ Nilai scalar diubah menjadi kolom di tabel data dengan nilai yang sama pada setiap baris.

###  [Login](#value)  {#value} 

 *Login* adalah nilai atribut metadata dan harus menjadi array dengan satu atau lebih dari baik, ubyte, pendek, ushort, int, uint, panjang, ulong, mengapung, ganda, String, atau char. Tidak ada jenis data lain yang didukung. Atribut tanpa nilai akan diabaikan. Jika ada lebih dari satu nilai sub, nilai sub harus semua jenis data yang sama dan dipisahkan oleh kommas, misalnya:
 sst Login actual\\_range ,0.17f,23.58f
Jika ada beberapa nilai String, gunakan String tunggal dengan \\n   (Login) karakter memisahkan substring.

Definisi jenis data atribut adalah:

#### Login{#byte} 
* nilai atribut byte (8-bit, ditandatangani) harus ditulis dengan suffix 'b', misalnya, -7b, 0b, 7b. Kisaran nilai byte yang valid adalah -128 ke 127. Sejumlah yang terlihat seperti byte tetapi tidak valid Meme it (g.) akan dikonversi menjadi nilai yang hilang atau menghasilkan pesan kesalahan.
    
#### Login{#ubyte} 
* Nilai atribut ubyte (8-bit, unsigned) harus ditulis dengan suffix 'ub', misalnya, 0ub, 7ub, 250ub. Kisaran nilai byte yang valid adalah 0 hingga 255. Sejumlah yang terlihat seperti ubyte tetapi tidak valid (e.g.) akan dikonversi menjadi nilai yang hilang atau menghasilkan pesan kesalahan. Bila memungkinkan, gunakan byte bukan ubyte, karena banyak sistem tidak mendukung byte yang tidak ditentukan (e.g., atribut di NetCDF -3 file) Sitemap
    
#### Sitemap{#short} 
* nilai atribut pendek (16-bit, ditandatangani) harus ditulis dengan suffix 's', misalnya, -30000s, 0s, 30000s. Kisaran nilai pendek yang valid adalah -32768 ke 32767. Sejumlah yang terlihat seperti pendek tetapi tidak valid Meme it (g., 32768s) akan dikonversi menjadi nilai yang hilang atau menghasilkan pesan kesalahan.
     
#### Login{#ushort} 
* ushort atribut nilai (16-bit, unsigned) harus ditulis dengan suffix 'us', misalnya, 0us, 30000us, 60000us. Kisaran nilai pendek yang valid adalah 0 hingga 65535. Sejumlah yang terlihat seperti ushort tetapi tidak valid Meme it (g., 65536us) akan dikonversi menjadi nilai yang hilang atau menghasilkan pesan kesalahan. Ketika mungkin, gunakan pendek bukan ushort, karena banyak sistem tidak mendukung byte yang tidak ditentukan (e.g., atribut di NetCDF -3 file) Sitemap
     
#### Login{#int} 
* nilai atribut int (32-bit, ditandatangani) harus ditulis sebagai ints JSON tanpa titik desimal atau exponent, tetapi dengan suffix 'i', misalnya, -12067978i, 0i, 12067978i. Kisaran nilai int yang valid adalah -2147483648 ke 2147483647. Sejumlah yang terlihat seperti int tetapi tidak valid Meme it (g., 2147483648i) akan dikonversi menjadi nilai yang hilang atau menghasilkan pesan kesalahan.
     
#### Login{#uint} 
* nilai atribut uint (32-bit, unsigned) harus ditulis sebagai ints JSON tanpa titik desimal atau exponent, tetapi dengan suffix 'ui', misalnya, 0ui, 12067978ui, 4123456789ui. Kisaran nilai int yang valid adalah 0 hingga 4967295. Sejumlah yang terlihat seperti uint tetapi tidak valid Meme it (g., 2147483648ui) akan dikonversi menjadi nilai yang hilang atau menghasilkan pesan kesalahan. Ketika mungkin, gunakan tidak bukan uint, karena banyak sistem tidak mendukung byte yang tidak ditentukan (e.g., atribut di NetCDF -3 file) Sitemap
     
#### Login{#long} 
* nilai atribut panjang (64-bit, ditandatangani, saat ini didukung oleh NUG dan ERDDAP™ tapi belum didukung oleh CF) harus ditulis tanpa titik desimal dan dengan suffix 'L', misalnya, -12345678987654321L, 0L, 12345678987654321L. Jika Anda menggunakan perangkat lunak konversi untuk mengkonversi file NCCSV dengan nilai panjang menjadi NetCDF -3 file, nilai panjang akan dikonversi ke nilai ganda. Kisaran nilai panjang yang valid adalah -9223372036854775808 ke 9223372036854775807. Sejumlah yang terlihat seperti panjang tetapi tidak valid Meme it (Artikelnr.: 9223372036854775808L) akan dikonversi menjadi nilai yang hilang atau menghasilkan pesan kesalahan. Ketika mungkin, gunakan dua kali bukan ulong, karena banyak sistem tidak mendukung panjang (Login NetCDF -3 file) Sitemap
     
#### Login{#ulong} 
* ulong atribut nilai (64-bit, unsigned, saat ini didukung oleh NUG dan ERDDAP™ tapi belum didukung oleh CF) harus ditulis tanpa titik desimal dan dengan suffix 'uL', misalnya, 0uL, 12345678987654321uL, 9007199254740992uL. Jika Anda menggunakan perangkat lunak konversi untuk mengkonversi file NCCSV dengan nilai panjang menjadi NetCDF -3 file, nilai panjang akan dikonversi ke nilai ganda. Kisaran nilai panjang yang valid adalah 0 hingga 18446744073709551615. Sejumlah yang terlihat seperti ulong tetapi tidak valid Meme it (Di., 184467440737095516uL) akan dikonversi menjadi nilai yang hilang atau menghasilkan pesan kesalahan. Ketika mungkin, gunakan dua kali bukan ulong, karena banyak sistem tidak mendukung yang ditandatangani atau unsigned panjang (Login NetCDF -3 file) Sitemap
     
#### Login{#float} 
* nilai atribut float (32-bit) harus ditulis dengan suffix 'f' dan mungkin memiliki titik desimal dan / atau exponent, misalnya, 0f, 1f, 12.34f, 1e12f, 1.23e + 12f, 1.23e12f, 1.87E-7f. Gunakan NaNf untuk mengapung NaN (Login) Sitemap Kisaran pelampung sekitar +/-3.40282347E + 38f (~7 signifikan digit desimal) Sitemap Sejumlah yang terlihat seperti pelampung tetapi tidak valid (g., 1.0e39f) akan dikonversi menjadi nilai yang hilang atau menghasilkan pesan kesalahan.
     
#### Sitemap{#double} 
* nilai atribut ganda (64-bit) harus ditulis dengan suffix 'd' dan mungkin memiliki titik desimal dan / atau exponent, misalnya, 0d, 1d, 12.34d, 1e12d, 1.23e + 12d, 1.23e12d, 1.87E-7d. Gunakan NaNd untuk NaN ganda (Login) Sitemap Kisaran ganda sekitar +/-1.79769313486231570E + 308d (~ 15 digit desimal yang signifikan) Sitemap Sejumlah yang terlihat seperti ganda tetapi tidak valid (g., 1.0e309d) akan dikonversi menjadi nilai yang hilang atau menghasilkan pesan kesalahan.
     
#### Login{#string} 
* Nilai atribut string adalah urutan karakter UCS-2 (i.e., 2-byte Unicode karakter, seperti dalam Java ) , yang harus ditulis sebagai 7-bit ASCII, JSON-seperti string sehingga karakter non-ASCII dapat ditentukan.
    * Kutipan ganda (Sitemap) harus dikodekan sebagai dua kutipan ganda (Sitemap) Sitemap Itu program spreadsheet apa yang diperlukan ketika membaca file .csv. Itu apa program spreadsheet menulis ketika Anda menyimpan spreadsheet sebagai file .csv.
    * Karakter JSON backslash-encoded khusus harus dikodekan seperti di JSON (tidak boleh \\n (newline), tetapi juga \\\ (backslash), \\f (formfeed), \\t (tab), \\r (carriage return) atau dengan [Login *Login* ](#uhhhh) Login Dalam spreadsheet, jangan gunakan Alt Enter untuk menentukan garis baru dalam sel teks; bukan, gunakan \\n   (2 karakter: backslash dan 'n Sitemap) untuk menunjukkan garis baru.
#####  uhhhh  {#uhhhh} 
    * Login *hhhhh - Semua karakter kurang dari karakter #32 atau lebih besar dari karakter #126, dan tidak dikodekan, harus dikodekan dengan sintaks \\u* hhhhh*, di mana hhhhhh adalah angka heksadecimal 4-digit karakter, misalnya, tanda Euro adalah \\ u20AC. Lihat halaman kode yang direferensikan di [https://en.wikipedia.org/wiki/Unicode](https://en.wikipedia.org/wiki/Unicode) untuk menemukan angka heksadecimal yang terkait dengan karakter Unicode tertentu, atau menggunakan perpustakaan perangkat lunak.
    * Jika String memiliki ruang di awal atau berakhir, atau termasuk " (kutipan ganda) atau komma, atau mengandung nilai-nilai yang akan diinterpretasikan sebagai beberapa jenis data lainnya (Sitemap) , atau kata "null", seluruh String harus ditutup dalam kutipan ganda; jika tidak, tidak seperti JSON, kutipan ganda enclosing adalah opsional. Kami merekomendasikan: ketika ragu, tutup seluruh String dalam kutipan ganda. Ruang pada awal atau akhir dari String sangat terkecil.
    * Untuk saat ini, penggunaan karakter lebih besar dari #255 didiskusikan. NCCSV mendukung mereka. ERDDAP™ mendukung mereka secara internal. Beberapa jenis file output mendukung mereka (Login .json Login .nccsv ) Sitemap Tapi banyak jenis file output tidak mendukung mereka. Sitemap NetCDF -3 file tidak mendukung karakter tersebut karena NetCDF file menggunakan karakter 1-byte dan CF saat ini tidak memiliki sistem untuk menentukan bagaimana karakter Unicode dikodekan dalam NetCDF Login (Sitemap) Sitemap Ini mungkin akan meningkatkan waktu.
         
#### Login{#char} 
* nilai atribut char adalah karakter UCS-2 tunggal (i.e., 2-byte Unicode karakter, seperti dalam Java ) , yang harus ditulis sebagai karakter seperti 7-bit ASCII, JSON sehingga karakter lain dapat ditentukan (melihat definisi String di atas untuk pengkodean karakter khusus, dengan penambahan pengkodean kutipan tunggal sebagai \\ Sitemap) Sitemap Nilai atribut Char harus ditutup dalam kutipan tunggal (kutipan dalam) dan kutipan ganda (kutipan luar) "'a'", "'" (karakter kutipan ganda) "'\'" (satu karakter kutipan) "'\t'" (tab) "'\\u20AC'" (Euro karakter) Sitemap Sistem ini menggunakan kutipan tunggal dan ganda aneh dan kunyit, tetapi itu adalah cara untuk membedakan nilai char dari String dengan cara yang bekerja dengan spreadsheet. Nilai yang terlihat seperti char tetapi tidak valid akan menghasilkan pesan kesalahan. Seperti dengan String, penggunaan karakter lebih besar dari #255 saat ini didiskusikan.

### Login{#suffix} 
Perhatikan bahwa di bagian atribut dari file NCCSV, semua nilai atribut numerik harus memiliki huruf suffix (Sitemap) untuk mengidentifikasi jenis data numerik (Sitemap) Sitemap Tapi di bagian data dari file NCCSV, nilai data numerik tidak boleh memiliki huruf suffix ini (dengan pengecualian 'L' untuk integer panjang dan 'uL' untuk ulong integers) — jenis data ditentukan oleh\\*DATA\\_TYPE\\*atribut untuk variabel.

### DATA_TYPE{#data_type} 
Jenis data untuk setiap non- [Login](#scalar) variabel harus ditentukan oleh\\*DATA\\_TYPE\\*atribut yang dapat memiliki nilai byte, ubyte, short, ushort, int, uint, long, ulong, float, double, String, atau char (kasus tidak sensitif) Sitemap Sitemap
Sitemap\\*DATA\\_TYPE\\*Login
PERINGATAN: Tentukan kebenaran\\*DATA\\_TYPE\\*adalah tanggung jawab Anda. Menentukan jenis data yang salah (e.g., int ketika Anda harus memiliki mengapung yang ditentukan) tidak akan menghasilkan pesan kesalahan dan dapat menyebabkan informasi hilang (e.g., nilai pelampung akan bulat ke ints) ketika file NCCSV dibaca oleh ERDDAP™ atau diubah menjadi NetCDF Login

### Login{#char-discouraged} 
Penggunaan nilai data char didiskusikan karena tidak didukung secara luas dalam jenis file lainnya. nilai char dapat ditulis dalam bagian data sebagai karakter tunggal atau sebagai String (tidak bisa, jika Anda perlu menulis karakter khusus) Sitemap Jika String ditemukan, karakter pertama String akan digunakan sebagai nilai char. String panjang nol dan nilai-nilai yang hilang akan dikonversi ke karakter \\uFF. Login NetCDF file hanya mendukung chars byte tunggal, sehingga setiap chars lebih besar dari char #255 akan dikonversi ke '?' ketika menulis NetCDF Login Tanpa atribut charset digunakan untuk menentukan charset yang berbeda untuk variabel char, charset ISO-8859-1 akan digunakan.

### Pengosongan Panjang dan Unsigned{#long-and-unsigned-discouraged} 
Meskipun banyak jenis file (Login NetCDF -4 dan json) Login ERDDAP™ dukungan panjang dan tidak ditugaskan (ubyte, ushort, uint, ulong) nilai-nilai, penggunaan nilai-nilai yang lama dan tidak ditetapkan dalam file NCCSV saat ini didiskusikan karena saat ini tidak didukung oleh Excel, CF dan NetCDF -3 file. Jika Anda ingin menentukan nilai panjang atau tidak ditentukan dalam file NCCSV (atau dalam spreadsheet Excel yang sesuai) Anda harus menggunakan suffix 'L' sehingga Excel tidak memperlakukan angka sebagai nomor titik mengambang dengan presisi lebih rendah. Saat ini, jika file NCCSV diubah menjadi NetCDF Login .nc file, nilai data panjang dan ulong akan dikonversi menjadi nilai ganda, menyebabkan hilangnya presisi untuk nilai yang sangat besar (kurang dari -2^53 untuk panjang, atau lebih dari 2^53 untuk panjang dan ulong) Sitemap Sitemap NetCDF Login .nc file, ubyte, ushort, dan variabel uint muncul sebagai byte, short, dan int dengan atribut metadata \\_Unsigned=true. Sitemap NetCDF Login .nc file, ubyte, ushort, dan atribut uint muncul sebagai atribut byte, pendek, dan int yang mengandung nilai dua komplement yang sesuai (e.g., 255ub muncul sebagai -1b) Sitemap Hal ini jelas masalah, sehingga tandatangani jenis data harus digunakan bukan jenis data yang tidak ditentukan setiap kali memungkinkan.

### CF, ACDD, dan ERDDAP™ Login{#cf-acdd-and-erddap-metadata} 
Karena diwujudkan bahwa sebagian besar file NCCSV, atau .nc file yang dibuat dari mereka, akan dibaca ke ERDDAP , sangat dianjurkan bahwa file NCCSV termasuk atribut metadata yang diperlukan atau direkomendasikan oleh ERDDAP™ Login
 [/docs/server-admin/dataset#global-attributes](/docs/server-admin/datasets#global-attributes) Sitemap Atribut hampir semua dari standar metadata CF dan ACDD dan melayani dengan benar menggambarkan dataset (yang, apa, ketika, di mana, mengapa, bagaimana) untuk seseorang yang tidak tahu apa-apa tentang dataset. Pentingnya tertentu, hampir semua variabel numerik harus memiliki atribut unit dengan UDUNITS - Nilai yang kompatibel, misalnya,
 sst ,units, derajat\\_C

Baik untuk menyertakan atribut tambahan yang tidak dari standar CF atau ACDD atau dari ERDDAP Sitemap

##  [Bagian Data](#the-data-section)  {#the-data-section} 

###  [Struktur](#structure)  {#structure} 

Garis pertama dari bagian data harus memiliki daftar yang sensitif, koma-separated dari nama variabel. Semua variabel dalam daftar ini harus dijelaskan di bagian metadata, dan sebaliknya (Sitemap [\\*Login\\*](#global) atribut dan [\\*Login\\*](#scalar) variabel) Sitemap

Kedua melalui garis-garis penghinaan dari bagian data harus memiliki daftar nilai yang dipisahkan. Setiap baris data harus memiliki jumlah nilai yang sama dengan daftar nama variabel yang dipisahkan. Ruang sebelum atau setelah nilai tidak diperbolehkan karena mereka menyebabkan masalah ketika mengimpor file ke program spreadsheet. Setiap kolom di bagian ini harus mengandung hanya nilai dari\\*DATA\\_TYPE\\*ditentukan untuk variabel itu oleh\\*DATA\\_TYPE\\*atribut untuk variabel itu. Tidak seperti di bagian atribut, nilai numerik di bagian data tidak harus memiliki huruf suffix untuk menunjukkan jenis data. Tidak seperti di bagian atribut, nilai char di bagian data dapat mengomit enclosing kutipan tunggal jika mereka tidak diperlukan untuk ambiguasi (demikian, ',' dan '\' harus dikutip seperti yang ditunjukkan di sini) Sitemap Mungkin ada sejumlah baris data ini dalam file NCCSV, tetapi saat ini ERDDAP™ hanya dapat membaca file NCCSV dengan hingga sekitar 2 miliar baris. Secara umum, dianjurkan bahwa Anda membagi data set besar ke beberapa file data NCCSV dengan lebih dari 1 juta baris setiap.

#### Login{#end_data} 
Ujung bagian data harus diuraikan dengan garis hanya
\\*Login\\*

Jika ada konten tambahan dalam file NCCSV setelah\\*Login\\*baris, itu akan diabaikan ketika file NCCSV diubah menjadi .nc Login Konten seperti itu dibedakan.

Dalam spreadsheet mengikuti konvensi ini, nama variabel dan nilai data akan dalam beberapa kolom. Lihat contoh di bawah.

###  [Nilai hilang](#missing-values)  {#missing-values} 

Nilai hilang numerik dapat ditulis sebagai nilai numerik yang diidentifikasi oleh missing\\_value atau \\_FillValue atribut untuk variabel itu. Misalnya, lihat nilai kedua pada baris data ini:
 Address:No.169,Changyang East Road,Jiangbei,Ningbo,China, Ningbo, Zhejiang
Ini adalah cara yang disarankan untuk menangani nilai yang hilang untuk byte, ubyte, pendek, ushort, int, uint, panjang, dan variabel ulong.

mengapung atau nilai NaN ganda dapat ditulis sebagai NaN. Misalnya, lihat nilai kedua pada baris data ini:
 Endereço:No.169,Changyang East Road,Jiangbei,Ningbo,China, Ningbo, Zhejiang

String dan nilai hilang numerik dapat diindikasikan oleh lapangan kosong. Misalnya, lihat nilai kedua pada baris data ini:
 Tel:86-312-6925260 Email:bdjd@bdjd.com.cn

Untuk byte, ubyte, pendek, ushort, int, uint, panjang, dan variabel ulong, utilitas konverter NCCSV dan ERDDAP™ akan mengubah kolom kosong menjadi nilai maksimum yang diizinkan untuk jenis data (e.g., 127 untuk byte) Sitemap Jika Anda melakukan ini, pastikan untuk menambahkan missing\\_value atau \\_FillValue atribut untuk variabel itu untuk mengidentifikasi nilai ini, misalnya,
 *Login Login* ,\\_FillValue,127b
Untuk variabel float dan ganda, lapangan kosong akan dikonversi ke NaN.

###  [Nilai tanggal](#datetime-values)  {#datetime-values} 

Nilai tanggal (termasuk nilai tanggal yang tidak memiliki komponen waktu) mungkin diwakili sebagai angka atau sebagai String dalam file NCCSV. Variabel tanggal yang diberikan hanya mungkin memiliki nilai String atau hanya nilai numerik, tidak keduanya. Perangkat lunak NCCSV akan mengubah nilai tanggal String menjadi tanggal numerik Nilai waktu saat membuat .nc Login (seperti yang diperlukan oleh CF) Sitemap Nilai tanggal Stringtime memiliki keuntungan yang mudah dibaca oleh manusia.

Nilai DateTime diwakili sebagai nilai numerik harus memiliki atribut unit yang menentukan " *Login* Sitemap *Sitemap Sitemap* "seperti yang diperlukan oleh CF dan ditentukan oleh UDUNITS Sitemap
waktu, unit, detik sejak 1970-01T00:00Z

Nilai DateTime diwakili sebagai nilai String harus memiliki String\\*DATA\\_TYPE\\*atribut dan atribut unit yang menentukan tanggal Pola waktu sebagaimana ditentukan oleh Java Sitemap
 ( [https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html) ) Sitemap Sitemap
waktu, unit, yyyy-MM-dd 'T'HH:mm:sZ
Semua nilai tanggalTime untuk variabel data yang diberikan harus menggunakan format yang sama.
Dalam kebanyakan kasus, pola tanggal yang Anda butuhkan untuk atribut unit akan menjadi variasi salah satu format ini:

*    yyyy-MM-dd 'T'HH:mm:s. SSSZ — yang merupakan ISO 8601:2004 (Login) Sitemap Format waktu. Anda mungkin perlu versi pendek dari ini, misalnya, yyyy-MM-dd 'T'HH:mm:sZ (satu-satunya format yang disarankan) Sitemap yyyy-MM-dd Sitemap Jika Anda mengubah format nilai tanggal Anda, NCCSV sangat menyarankan Anda mengubah format ini (mungkin dipersingkat) Sitemap Ini adalah format yang ERDDAP™ akan digunakan ketika menulis file NCCSV.
* yyMMddHHmmss.SSS — yang merupakan versi kompak ISO 8601:2004 tanggal Format waktu. Anda mungkin perlu versi pendek dari ini, misalnya, yyMMdd.
* Login H: mm: s. SSS — yang menangani tanggal dan tanggal gaya AS seperti "3/23/2017 16:22:03.000". Anda mungkin perlu versi pendek dari ini, misalnya, M/d/yyyy .
* Login (e.g, 001 = Jan 1, 365 = 31 Desember dalam setahun non-leap; ini kadang-kadang erroneously disebut tanggal Julian) Sitemap Anda mungkin perlu versi pendek dari ini, misalnya, yyDDD.

#### Sitemap{#precision} 
Ketika perpustakaan perangkat lunak mengkonversi sebuah .nc file ke file NCCSV, semua tanggal Nilai waktu akan ditulis sebagai String dengan ISO 8601:2004 (Login) Sitemap Format waktu, misalnya, 1970-01T00:00Z. Anda dapat mengontrol presisi dengan ERDDAP - atribut khusus time\\_precision Sitemap Sitemap
 [/docs/server-admin/datasets# time\\_precision ](/docs/server-admin/datasets#time_precision) Sitemap

#### Zona waktu{#time-zone} 
Zona waktu default untuk tanggal Nilai waktu adalah Zulu   (Login) zona waktu, yang tidak memiliki periode waktu hemat siang hari. Jika variabel dateTime memiliki nilai dateTime dari zona waktu yang berbeda, Anda harus menentukan ini dengan ERDDAP - atribut khusus time\\_zone Sitemap Ini adalah persyaratan untuk ERDDAP™ Login
 [/docs/server-admin/datasets# time\\_zone ](/docs/server-admin/datasets#time_zone) Sitemap

###  [Nilai Derajat](#degree-values)  {#degree-values} 

Seperti yang diperlukan oleh CF, semua nilai tingkat (e.g., untuk longitude dan lintang) harus ditentukan sebagai nilai ganda desimal-derajat, bukan sebagai string derajat ° min atau sebagai variabel terpisah untuk derajat, menit, detik. Penunjuk arah N, S, E, dan W tidak diperbolehkan. Gunakan nilai negatif untuk bujur barat dan untuk lintang Selatan.

##  [Login Jenis Fitur](#dsg-feature-types)  {#dsg-feature-types} 

File NCCSV dapat mengandung CF Discrete Sampling Geometry
 ( [https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) ) Sitemap Ini adalah atribut yang membuat pekerjaan ini:

1. Seperti yang diperlukan oleh CF, file NCCSV harus mencakup garis di bagian metadata mengidentifikasi [\\*Login\\*](#global)   featureType atribut, misalnya,
    \\*Login\\*Login featureType Login
2. Untuk digunakan ERDDAP™ , file NCCSV harus mencakup garis atau garis di bagian metadata mengidentifikasi variabel cf\\_role=...\\_id, misalnya,
kapal,cf\\_role,trajectory\\_id
Ini adalah opsional untuk CF, tetapi diperlukan di NCCSV.
3. Untuk digunakan ERDDAP™ , file NCCSV harus mencakup garis atau garis di bagian metadata yang mengidentifikasi variabel yang terkait dengan setiap timeSeries, trajectory, atau profil yang diperlukan oleh ERDDAP™ Login
     [/docs/server-admin/datasets#cdm\\_data\\_type](/docs/server-admin/datasets#cdm_data_type) ), g.,
    \\*Login\\*,cdm\\_trajectory\\_variables,"ship"
Sitemap
    \\*Login\\*,cdm\\_timeseries\\_variables,"station\\_id,lat,lon"

##  [Contoh File](#sample-file)  {#sample-file} 

Berikut adalah file sampel yang menunjukkan banyak fitur file NCCSV:
```
\\*GLOBAL\\*,Conventions,"COARDS, CF-1.6, ACDD-1.3, NCCSV-1.1"
\\*GLOBAL\\*,cdm\\_trajectory\\_variables,"ship"
\\*GLOBAL\\*,creator\\_email,erd.data@noaa.gov
\\*GLOBAL\\*,creator\\_name,Bob Simons
\\*GLOBAL\\*,creator\\_type,person
\\*GLOBAL\\*,creator\\_url,https://www.pfeg.noaa.gov
\\*GLOBAL\\*,featureType,trajectory
\\*GLOBAL\\*,infoUrl,https://erddap.github.io/docs/user/nccsv-1.10
\\*GLOBAL\\*,institution,"NOAA NMFS SWFSC ERD, NOAA PMEL"
\\*GLOBAL\\*,license,"""NCCSV Demonstration"" by Bob Simons and Steve Hankin is
    licensed under CC BY 4.0, https://creativecommons.org/licenses/by/4.0/ ."
\\*GLOBAL\\*,keywords,"NOAA, sea, ship, sst, surface, temperature, trajectory"
\\*GLOBAL\\*,standard\\_name\\_vocabulary,CF Standard Name Table v55
\\*GLOBAL\\*,subsetVariables,"ship"
\\*GLOBAL\\*,summary,"This is a paragraph or two describing the dataset."
\\*GLOBAL\\*,title,"NCCSV Demonstration"
ship,\\*DATA\\_TYPE\\*,String
ship,cf\\_role,trajectory\\_id
time,\\*DATA\\_TYPE\\*,String
time,standard\\_name,time
time,units,"yyyy-MM-dd'T'HH:mm:ssZ"
lat,\\*DATA\\_TYPE\\*,double
lat,units,degrees\\_north
lon,\\*DATA\\_TYPE\\*,double
"lon","units","degrees\\_east"
status,\\*DATA\\_TYPE\\*,char
status,comment,"From http://some.url.gov/someProjectDocument , Table C"
testByte,\\*DATA\\_TYPE\\*,byte
testByte,units,1
testUByte,\\*DATA\\_TYPE\\*,ubyte
testUByte,units,1
testLong,\\*DATA\\_TYPE\\*,long
testLong,units,1
testULong,\\*DATA\\_TYPE\\*,ulong
testULong,units,1
sst,\\*DATA\\_TYPE\\*,float
sst,standard\\_name,sea\\_surface\\_temperature
sst,actual\\_range,0.17f,23.58f
sst,units,degree\\_C
sst,missing\\_value,99f
sst,testBytes,-128b,0b,127b
sst,testShorts,-32768s,0s,32767s
sst,testInts,-2147483648i,0i,2147483647i
sst,testLongs,-9223372036854775808L,0L,9223372036854775807L
sst,testFloats,-3.40282347e38f,0f,3.40282347E+38f
sst,testDoubles,-1.79769313486231570e308d,0d,1.79769313486231570E+308d
sst,testChars,"','","'""'","'\\u20AC'"
sst,testStrings," a~,\\n'z""\\u20AC"
sst,testUBytes,0ub,127ub,255ub
sst,testUInts,0ui,2147483647ui,4294967295ui
sst,testULongs,0uL,9223372036854775807uL,18446744073709551615uL
sst,testUShorts,0us,32767us,65535us

\\*END\\_METADATA\\*
ship,time,lat,lon,status,testByte,testUByte,testLong,testULong,sst
Bell M. Shimada,2017-03-23T00:45:00Z,28.0002,-130.2576,A,-128, 0,-9223372036854775808L,0uL,10.9
Bell M. Shimada,2017-03-23T01:45:00Z,28.0003,-130.3472,\\u20AC,0,127,-9007199254740992L,9223372036854775807uL,10.0
"Bell M. Shimada","2017-03-23T02:45:00Z",28.0001,-130.4305,"'\\t'",126,254,9223372036854775806L,18446744073709551614uL,99
"Bell M. Shimada",2017-03-23T12:45:00Z,27.9998,-131.5578,"'""'",127,255,9223372036854775807L,18446744073709551615uL,NaN
```
Catatan:

* File sampel ini mencakup banyak kasus sulit (e.g., char dan variabel panjang dan nilai string yang sulit) Sitemap Kebanyakan file NCCSV akan jauh lebih sederhana.
* Garis lisensi rusak menjadi dua baris di sini, tetapi hanya satu baris dalam file sampel.
* \\u20AC adalah pengkodean karakter euro dan \\u00FC adalah pengkodean ü.
* Login String dalam contoh ditutupi oleh kutipan ganda meskipun mereka tidak harus, misalnya, banyak atribut global termasuk judul, atribut unit lon, dan garis data ke-3.)
* Ini akan lebih jelas dan lebih baik jika atribut unit untuk variabel TestLong ditulis dalam kutipan ganda yang menunjukkan itu adalah nilai String. Tapi representasi saat ini (1, tanpa kutipan) akan ditafsirkan dengan benar sebagai String, bukan bilangan bulat, karena tidak ada suffix 'i'.
* Tidak seperti jenis data numerik lainnya, nilai panjang di bagian data memiliki suffix (Login) yang mengidentifikasi jenis data numerik mereka. Hal ini diperlukan untuk mencegah spreadsheet dari menafsirkan nilai sebagai nomor titik mengambang dan dengan demikian kehilangan presisi.

##  [Login](#spreadsheets)  {#spreadsheets} 

Dalam spreadsheet, seperti dalam file NCCSV:

* Tulis nilai atribut numerik sebagaimana ditentukan untuk file NCCSV (e.g., dengan surat suffix, misalnya, 'f', untuk mengidentifikasi jenis data atribut) Sitemap
* Dalam String, menulis semua karakter kurang dari karakter ASCII #32 atau lebih besar dari karakter #126 sebagai karakter backslashed seperti JSON (Login \\n Login) atau sebagai nomor karakter Unicode heksadecimal (kasus tidak sensitif) dengan sintaks [Login *Login* ](#uhhhh)   (e.g., \\u20AC untuk tanda euro) Sitemap Sitemap \\n   (2 karakter: backslash dan 'n Sitemap) untuk menunjukkan garis baru, tidak Alt Enter.

Satu-satunya perbedaan antara file NCCSV dan spreadsheet analog yang mengikuti Konvensi ini adalah:

* file NCCSV memiliki nilai pada garis dipisahkan oleh kommas.
Spreadsheet memiliki nilai pada garis dalam sel yang berdekatan.
* String dalam file NCCSV sering dikelilingi oleh kutipan ganda.
String dalam spreadsheet tidak pernah dikelilingi oleh kutipan ganda.
* Kutipan ganda internal (Sitemap) dalam Strings dalam file NCCSV muncul sebagai 2 kutipan ganda.
Kutipan ganda internal dalam spreadsheet muncul sebagai 1 kutipan ganda.

Jika spreadsheet mengikuti konvensi ini disimpan sebagai file CSV, seringkali akan kommas tambahan pada akhir banyak garis. Perangkat lunak yang mengubah file NCCSV menjadi .nc file akan mengabaikan kommas tambahan.

###  [Login](#excel)  {#excel} 

Untuk mengimpor file NCCSV ke Excel:

1. Pilih File : Buka.
2. Mengubah jenis file ke File Teks (\\*Login\\*.txt; \\*.csv) Sitemap
3. Cari direktori dan klik pada file NCCSV.csv.
4. Klik Buka.

Untuk membuat file NCCSV dari spreadsheet Excel:

1. Pilih File : Simpan Sebagai .
2. Mengubah Simpan sebagai jenis: menjadi CSV (Login)   (Login) Sitemap
3. Dalam menanggapi peringatan kompatibilitas, klik Ya .
4. File .csv yang dihasilkan akan memiliki kommas tambahan pada akhir semua baris selain baris CSV. Anda dapat mengabaikan mereka. Meme it

Di Excel, file NCCSV sampel di atas muncul

![Login](/img/sampleExcel.png)

###  [Google Login](#google-sheets)  {#google-sheets} 

Untuk mengimpor file NCCSV ke Google Sheets:

1. Pilih File : Buka.
2. Pilih Unggah file dan klik Upload file dari komputer Anda. Pilih file, lalu klik Buka.
      
Atau, pilih My Drive dan ubah jenis file turun seleksi ke Semua jenis file. Pilih file, lalu klik Buka.

Untuk membuat file NCCSV dari spreadsheet Google Sheets:

1. Pilih File : Simpan Sebagai .
2. Mengubah Simpan sebagai jenis: menjadi CSV (Login)   (Login) Sitemap
3. Dalam menanggapi peringatan kompatibilitas, klik Ya .
4. File .csv yang dihasilkan akan memiliki kommas tambahan pada akhir semua baris selain baris CSV. Mengabaikan mereka.

##  [Sitemap](#problemswarnings)  {#problemswarnings} 

* Jika Anda membuat file NCCSV dengan editor teks atau jika Anda membuat spreadsheet analog dalam program spreadsheet, editor teks atau program spreadsheet tidak akan memeriksa bahwa Anda mengikuti Konvensi ini dengan benar. Anda dapat mengikuti konvensi ini dengan benar.
* Konversi spreadsheet mengikuti konvensi ini ke file csv (sehingga, file NCCSV) akan menyebabkan kommas tambahan pada akhir semua baris selain baris data CSV. Mengabaikan mereka. Perangkat lunak kemudian mengkonversi file NCCSV ke .nc file akan mengabaikan mereka.
* Jika file NCCSV memiliki kelebihan kommas pada akhir baris, Anda dapat menghapusnya dengan mengubah file NCCSV menjadi NetCDF file dan kemudian mengkonversi file NetCDF file kembali ke file NCCSV.
* Ketika Anda mencoba untuk mengonversi file NCCSV ke dalam NetCDF file, beberapa kesalahan akan terdeteksi oleh perangkat lunak dan akan menghasilkan pesan kesalahan, menyebabkan konversi gagal. Masalah lain sulit atau tidak mungkin untuk menangkap dan tidak akan menghasilkan pesan kesalahan atau peringatan. Masalah lain (e.g., kelebihan kommas pada akhir baris) akan diabaikan. Meme it Konverter file hanya akan melakukan pemeriksaan minimal kebenaran hasil NetCDF file, misalnya, sehubungan dengan kepatuhan CF. Ini adalah tanggung jawab pengguna file dan file untuk memeriksa bahwa hasil konversi yang diinginkan dan benar. Dua cara untuk memeriksa adalah:
    * Cetak konten .nc file dengan ncdump
         ( [https://linux.die.net/man/1/ncdump](https://linux.die.net/man/1/ncdump)  ) Sitemap
    * Lihat isi data dalam ERDDAP Sitemap

##  [Login](#changes)  {#changes} 

* Login Memperkenalkan v1.10 (Oktober 2020) Sitemap
    * Ditambahkan dukungan untuk ubyte, ushort, uint, ulong.
