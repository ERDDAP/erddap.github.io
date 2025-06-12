---
title: "ERDDAP™ - Working with the datasets.xml File"
sidebar_position: 3
---
# Bekerja dengandatasets.xmlLogin

\\[Halaman web ini hanya akan menarik minat untuk Meme itERDDAP™Login\\]

Setelah Anda mengikutiERDDAP™ [instruksi instalasi](/docs/server-admin/deploy-install)Anda harus mengeditdatasets.xmlSitemap *Login* /content/erddap/ untuk menggambarkan dataset yang AndaERDDAP™instalasi akan melayani.

Anda dapat melihat contoh[datasets.xmldi GitHub](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml)Sitemap

- Sitemap

## [Sitemap](#introduction) {#introduction} 

### Beberapa Majelis Diperlukan{#some-assembly-required} 
Menyiapkan dataset dalamERDDAP™tidak hanya masalah penunjuk ke direktori atau URL dataset. Anda harus menulis chunk XML untukdatasets.xmlyang menggambarkan dataset.

* Untuk dataset gridded, untuk membuat dataset sesuai denganERDDAPStruktur data untuk data gridded, Anda harus mengidentifikasi subset variabel dataset yang berbagi dimensi yang sama. ([Sitemap](#why-just-two-basic-data-structures) [Sitemap](#dimensions)) 
* Metadata arus dataset diimpor secara otomatis. Tetapi jika Anda ingin memodifikasi metadata atau menambahkan metadata lain, Anda harus menentukannyadatasets.xmlSitemap DanERDDAP™membutuhkan metadata lain, termasuk[atribut global](#global-attributes)  (SitemapinfoUrlLoginsourceUrl, ringkasan, dan judul) Login[atribut variabel](#variable-addattributes)  (Sitemaplong\\_namedan unit) Sitemap Sama seperti metadata yang saat ini dalam dataset menambahkan informasi deskriptif ke dataset, metadata yang diminta olehERDDAP™menambahkan informasi deskriptif ke dataset. Metadata tambahan adalah tambahan yang baik untuk dataset Anda dan membantuERDDAP™melakukan pekerjaan yang lebih baik untuk menyajikan data Anda kepada pengguna yang tidak akrab dengannya.
*   ERDDAP™Anda harus melakukan hal-hal khusus dengan Meme it[garis bujur, lintang, ketinggian (atau kedalaman) , dan variabel waktu](#destinationname)Sitemap

Jika Anda membeli ide-ide ini dan mengeluarkan upaya untuk membuat XML untukdatasets.xml, Anda mendapatkan semua keunggulanERDDAP™termasuk:

* Pencarian teks penuh untuk dataset
* Cari dataset berdasarkan kategori
* Formulir Akses Data ( *datasetID* Login) sehingga Anda dapat meminta subset data dalam banyak format file yang berbeda
* Bentuk untuk meminta grafik dan peta ( *datasetID* Login) 
* Layanan Peta Web (WMS) untuk dataset gridded
*   RESTfulakses ke data Anda

Membuatdatasets.xmlmengambil upaya yang cukup untuk beberapa dataset pertama, tetapi **itu akan lebih mudah** Sitemap Setelah dataset pertama, Anda sering dapat menggunakan banyak pekerjaan Anda untuk dataset berikutnya. SitemapERDDAP™datang dengan dua[Login](#tools)untuk membantu Anda membuat XML untuk setiap dataset didatasets.xmlSitemap
Jika Anda terjebak, lihat[bagian untuk mendapatkan dukungan tambahan](/docs/intro#support)Sitemap

### Database Login{#data-provider-form} 
Ketika penyedia data datang ke Anda berharap untuk menambahkan beberapa data ke AndaERDDAP, itu bisa sulit dan memakan waktu untuk mengumpulkan semua metadata (dataset) diperlukan untuk menambahkan dataset keERDDAPSitemap Banyak sumber data (misalnya, file .csv, File Excel, database) tidak memiliki metadata internal, sehinggaERDDAP™memiliki Formulir Penyedia Data yang mengumpulkan metadata dari penyedia data dan memberikan penyedia data beberapa panduan lain, termasuk panduan yang luas untuk[Database](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm1.html#databases)Sitemap Informasi yang diajukan diubah menjadidatasets.xmlformat dan kemudian diemail keERDDAP™Login (Login) dan tulisan (Sitemap) Login *Login* /logs/dataProviderForm.log . Dengan demikian, bentuk semi-otomatis proses mendapatkan dataset menjadiERDDAPtapiERDDAP™administrator masih harus menyelesaikandatasets.xmlchunk dan kesepakatan dengan mendapatkan file data (Login) dari penyedia atau menghubungkan ke database.

Penerapan file data aktual dari sumber eksternal adalah risiko keamanan yang besar, sehinggaERDDAP™tidak berurusan dengan itu. Anda harus mencari solusi yang bekerja untuk Anda dan penyedia data, misalnya, email (untuk file kecil) , tarik dari awan (misalnya, DropBox atau Google Drive) sftp situs (dengan password) Sitemap Login (USB thumb drive atau hard drive eksternal) Sitemap Anda mungkin hanya harus menerima file dari orang yang Anda tahu. Anda harus memindai file untuk virus dan mengambil tindakan pencegahan keamanan lainnya.

Tidak ada tautan diERDDAP™Formulir Penyedia Data (misalnya, padaERDDAP™Login) Sitemap Sebaliknya, ketika seseorang memberitahu Anda mereka ingin memiliki data mereka yang dilayani oleh AndaERDDAPAnda dapat mengirim mereka email mengatakan sesuatu seperti:
Ya, kita bisa mendapatkan data Anda keERDDAPSitemap Untuk memulai, silakan mengisi formulir di https://*yourUrl*/erddap/dataProviderForm.html   (Sitemaphttp://Sitemaphttps://tidak diaktifkan) Sitemap
Setelah selesai, saya akan menghubungi Anda untuk mengerjakan rincian akhir.
Jika Anda hanya ingin melihat formulir (tanpa mengisinya) Anda dapat melihat bentuknyaERDSitemapERDDAPSitemap[Sitemap](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm.html)Login[Bagian 1](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm1.html)Login[Bagian 2](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm2.html)Login[Bagian 3](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm3.html)Sitemap[Bagian 4](https://coastwatch.pfeg.noaa.gov/erddap/dataProviderForm4.html)Sitemap Tautan ini diERD ERDDAP™mengirimkan informasi kepada saya, bukan Anda, jadi jangan menyerahkan informasi dengan mereka kecuali Anda benar-benar ingin menambahkan data keERD ERDDAPSitemap

Jika Anda ingin menghapus Formulir Penyedia Data dari AndaERDDAP™Sitemap
```
<dataProviderFormActive>false</dataProviderFormActive>  
```
di file setup.xml Anda.

Impetus untuk iniNOAASitemap[Akses Umum untuk Hasil Penelitian (Login) Login](https://www.glerl.noaa.gov/review2016/reviewer_docs/NOAA_PARR_Plan_v5.04.pdf)yang membutuhkan semua Meme itNOAAdata lingkungan yang didanai melalui pajakpayer dolar yang tersedia melalui layanan data (tidak hanya file) dalam 12 bulan pembuatan. Jadi ada peningkatan minat dalam menggunakanERDDAP™untuk membuat dataset tersedia melalui layanan ASAP. Kami membutuhkan cara yang lebih efisien untuk menangani sejumlah besar penyedia data.

Umpan balik / Saran? Bentuk ini baru, jadi silakan emailerd dot data at noaa dot govjika Anda memiliki umpan balik atau saran untuk meningkatkan ini.

### Login{#tools} 
ERDDAP™datang dengan dua program baris perintah yang alat untuk membantu Anda membuat XML untuk setiap dataset yang Anda inginkanERDDAP™Sitemap Setelah Anda menyiapkanERDDAP™dan menjalankannya (setidaknya satu kali) Anda dapat menemukan dan menggunakan program ini di Meme it *Login* /webapps/erddap/WEB-INF direktori. Ada skrip shell Linux / Unix (dengan ekstensi .sh) dan skrip Windows (dengan ekstensi .bat) untuk setiap program.\\[Pada Linux, jalankan alat-alat ini sebagai pengguna yang sama (Login) yang akan menjalankan Tomcat.\\]Ketika Anda menjalankan setiap program, itu akan meminta pertanyaan Anda. Untuk setiap pertanyaan, ketik respons, lalu tekan Enter. Atau tekan ^C untuk keluar program setiap saat.

#### Program tidak akan berjalan?{#program-wont-run} 

* Jika Anda mendapatkan program yang tidak diketahui (atau serupa) pesan kesalahan, masalah mungkin bahwa sistem operasi tidak bisa menemukan Meme itJavaSitemap Anda perlu mencari tahu di manaJavadi komputer Anda, lalu edit referensi java di file .bat atau .sh yang Anda coba gunakan.
* Jika Anda mendapatkan file jar tidak ditemukan atau kelas tidak menemukan pesan kesalahan, makaJavatidak dapat menemukan salah satu kelas yang tercantum dalam file .bat atau .sh Anda mencoba untuk digunakan. Solusinya adalah mencari tahu di mana file .jar adalah, dan mengedit referensi java ke dalam file .bat atau .sh.
* Jika Anda menggunakan versiJavaitu terlalu tua untuk program, program tidak akan berjalan dan Anda akan melihat pesan kesalahan seperti
Exception di thread "main" java.lang.UnsupportedClassVersionError:
     *beberapa/kelas/nama* : Versi yang tidak didukung.minor *Login*   
Solusinya adalah untuk memperbarui versi terbaru dari versi terbaruJavadan pastikan file .sh atau .bat untuk program ini menggunakannya.

#### Alat mencetak berbagai pesan diagnostik:{#the-tools-print-various-diagnostic-messages} 

* Kata "ERROR" digunakan ketika sesuatu pergi begitu salah bahwa prosedur gagal untuk menyelesaikan. Meskipun menjengkelkan untuk mendapatkan kesalahan, kesalahan memaksa Anda untuk menghadapi masalah.
* Kata "WARNING" digunakan ketika sesuatu yang salah, tetapi prosedurnya dapat diselesaikan. Ini cukup langka.
* Apa pun yang lain hanyalah pesan informatif. Anda dapat menambahkan \\ verbose ke[Login](#generatedatasetsxml)Sitemap[Login](#dasdds)baris perintah untuk mendapatkan pesan informatif tambahan, yang kadang-kadang membantu memecahkan masalah.

Dua alat adalah bantuan besar, tetapi Anda masih harus membaca semua instruksi ini di halaman ini dengan hati-hati dan membuat keputusan penting sendiri.

### Login{#generatedatasetsxml} 
*    **Login** adalah program baris perintah yang dapat menghasilkan draft kasar dari XML dataset untuk hampir semua jenis dataset.
    
Kami STRONGLY RECOMMEND yang Anda gunakan GenerateDatasets Xml bukan membuat chunksdatasets.xmldengan tangan karena:
    
    * Login Xml bekerja dalam beberapa detik. Melakukan ini dengan tangan setidaknya satu jam kerja, bahkan ketika Anda tahu apa yang Anda lakukan.
    * Login Xml melakukan pekerjaan yang lebih baik. Melakukan ini dengan tangan memerlukan pengetahuan luas tentang bagaimanaERDDAP™Sitemap Tidak mungkin bahwa Anda akan melakukan pekerjaan yang lebih baik dengan tangan. (Bob Simons selalu menggunakan GenerateDatasets Xml untuk draft pertama, dan dia menulisERDDAPSitemap) 
    * Login Xml selalu menghasilkan chunk yang validdatasets.xmlSitemap Sitemapdatasets.xmlbahwa Anda menulis mungkin akan memiliki setidaknya beberapa kesalahan yang mencegah Meme itERDDAP™dari memuat dataset. Hal ini sering membutuhkan jam orang untuk mendiagnosis masalah ini. Jangan buang waktu Anda. Sitemap Login Xml melakukan kerja keras. Kemudian Anda dapat memperbaiki .xml dengan tangan jika Anda ingin.
    
Ketika Anda menggunakan GenerateDatasets Program xml:
    
    * Pada Windows, pertama kali Anda menjalankan GenerateDatasetsXml, Anda perlu mengedit file GenerateDatasetsXml.bat dengan editor teks untuk mengubah path ke java. exe file sehingga Windows dapat menemukanJavaSitemap
    * Login Xml pertama meminta Anda untuk menentukan EDDType (Login Login) dataset. Sitemap[Daftar Jenis Dataset](#list-of-types-datasets)  (dalam dokumen ini) untuk mengetahui apa yang diperlukan untuk dataset yang Anda kerjakan. Selain EDDTypes biasa, ada juga beberapa[Jenis Dataset Khusus/Pseudo](#specialpseudo-dataset-types)  (e.g., salah satu yang merangkai katalog THREDDS untuk menghasilkan sepotongdatasets.xmluntuk setiap set data di katalog) Sitemap
    * Login Xml kemudian meminta Anda serangkaian pertanyaan khusus untuk EDDType. Pertanyaan mengumpulkan informasi yang diperlukan untukERDDAP™untuk mengakses sumber dataset. Untuk memahami apaERDDAP™meminta, lihat dokumentasi untuk EDDType yang Anda tentukan dengan mengklik jenis dataset yang sama di[Daftar Jenis Dataset](#list-of-types-datasets)Sitemap
        
Jika Anda perlu memasukkan string dengan karakter khusus (e.g., karakter whitespace pada karakter awal atau akhir, non-ASCII) masukkan[string gaya JSON](https://www.json.org/json-en.html)  (dengan karakter khusus melarikan diri dengan karakter \\) Sitemap Misalnya, untuk memasukkan karakter tab, masukkan "\t" (dengan kutip ganda di sekitarnya, yang memberi tahuERDDAP™JSON-style string
        
    * Seringkali, salah satu jawaban Anda tidak akan apa yang dihasilkanDatasetXml kebutuhan. Anda kemudian dapat mencoba lagi, dengan jawaban yang direvisi untuk pertanyaan, sampai GenerateDataset Xml dapat berhasil menemukan dan memahami data sumber.
    * Jika Anda menjawab pertanyaan dengan benar (atau cukup benar) Login Xml akan terhubung ke sumber dataset dan mengumpulkan informasi dasar (misalnya, nama variabel dan metadata) Sitemap
Untuk dataset yang berasal dari lokalNetCDF .ncdan file terkait, GenerateDatasets Xml seringkali akan mencetak struktur ncdump-seperti file setelah pertama membaca file. Ini mungkin memberi Anda informasi untuk menjawab pertanyaan yang lebih baik pada loop berikutnya melalui GenerateDatasetsXml.
    * Login Xml kemudian akan menghasilkan draft kasar dari XML dataset untuk dataset tersebut.
    * Informasi diagnostik dan draft kasar dari XML dataset akan ditulis untuk *Login* /logs/GenerateDatasetXml.log
    * draft kasar dari XML dataset akan ditulis untuk *Login* /logs/GenerateDatasetXml.out
#### "0 file" Pesan Kesalahan{#0-files-error-message} 
Jika Anda menjalankan GenerateDatasets Login[Login](#dasdds)atau jika Anda mencoba memuatEDDGridDari...Files atau EDDTableDari... DatabaseERDDAP™, dan Anda mendapatkan pesan kesalahan "0" yang menunjukkan bahwa Meme itERDDAP™menemukan 0 file pencocokan di direktori (ketika Anda berpikir bahwa ada file yang cocok di direktori itu) Sitemap
* Periksa bahwa Anda telah menentukan nama lengkap direktori. Dan jika Anda menentukan nama file sampel, pastikan Anda menentukan nama lengkap file, termasuk nama direktori penuh.
* Periksa bahwa file benar-benar ada di direktori itu.
* Periksa ejaan nama direktori.
* Login Sangat mudah untuk membuat kesalahan dengan regexe. Untuk tujuan pengujian, coba regex .\\* yang harus sesuai dengan semua nama file. (Lihat ini[database](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)Login[Login](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)Sitemap) 
* Periksa bahwa pengguna yang menjalankan program (e.g., user=tomcat (Sitemap) untuk Tomcat/ERDDAP) memiliki izin 'read' untuk file-file tersebut.
* Dalam beberapa sistem operasi (misalnya, SELinux) dan tergantung pada pengaturan sistem, pengguna yang menjalankan program harus memiliki izin 'read' untuk seluruh rantai direktori yang mengarah ke direktori yang memiliki file.


* Jika Anda memiliki masalah yang tidak dapat Anda selesaikan,[dukungan permintaan](/docs/intro#support)dengan informasi sebanyak mungkin. Demikian pula, jika tampaknya seperti EDDType yang sesuai untuk dataset yang diberikan tidak bekerja dengan dataset itu, atau jika tidak ada EDDType yang tepat, silakan mengajukan[Sitemap](https://github.com/ERDDAP/erddap/issues)dengan rincian (dan file sampel jika relevan) Sitemap
         
#### Anda perlu mengedit output dari GenerateDatasets Xml untuk membuatnya lebih baik.{#you-need-to-edit-the-output-from-generatedatasetsxml-to-make-it-better} 
         
* Login:
Logindatasets.xmlLogin Sitemap ANDA HARUS MEMBACA DAN EDIT XML SEBELUM MENGGUNAKAN TI DALAM PUBLICERDDAPSitemap Login Xml RELIES DI LOT OF RULES-OF-THUMB WHICH AREN'T ALWAYS CORRECT. ANDA RESPONSIBEL UNTUK MEMILIKI CORRECTNESS dari XML yang ANDA ADD UNTUKERDDAPLogindatasets.xmlLogin
    
     (Fakta menyenangkan: Saya tidak berteriak. Untuk alasan hukum historis, penafian harus ditulis dalam semua topi.) 
    
Output GenerateDatasetsXml adalah draft kasar.
Anda akan hampir selalu perlu mengeditnya. Meme it
Kami telah membuat dan terus melakukan upaya besar untuk membuat output seperti siap-ke-go mungkin, tetapi ada batasan. Seringkali, informasi yang diperlukan tidak tersedia dari metadata sumber.
    
Masalah fundamental adalah bahwa kita meminta program komputer (Login) untuk melakukan tugas di mana, jika Anda memberikan tugas yang sama untuk 100 orang, Anda akan mendapatkan 100 hasil yang berbeda. Tidak ada jawaban "benar" tunggal. Jelas, program datang paling dekat untuk membaca pikiran Bob (Login) tetapi bahkan demikian, itu bukan program AI yang tahan lama, hanya sekelompok heuristik yang dicukur bersama-sama untuk melakukan tugas seperti AI. (Hari program AI all-understanding mungkin datang, tapi belum. Jika/ketika itu, kita manusia mungkin memiliki masalah yang lebih besar. Berhati-hatilah apa yang Anda inginkan.) 
    
* Untuk tujuan informasi, output menunjukkan sumber globalAttributes dan sumber variabelAttributes sebagai komentar.ERDDAP™menggabungkan sumberAttributes danaddAttributes  (yang telah sebelumnya) untuk membuat gabungan Atribut yang ditunjukkan kepada pengguna. (Dan atribut lain secara otomatis ditambahkan ke longitude, latitude, ketinggian, kedalaman, dan variabel waktu ketikaERDDAP™sebenarnya membuat dataset) Sitemap
     
* Jika Anda tidak menyukai sumberAttribute, menuliskannya dengan menambahkan addAttribute dengan nama yang sama tetapi nilai yang berbeda (atau tidak ada nilai, jika Anda ingin menghapusnya Meme it) Sitemap
     
* SitemapaddAttributesadalah saran yang dihasilkan komputer. Login Jika Anda tidak menyukai addAttribute, mengubahnya.
     
* Jika Anda ingin menambahkan lainnyaaddAttributesPromo
     
* Jika Anda ingin mengubahdestinationName, mengubahnya. Tapi tidak berubahsourceNameSitemap
     
* Anda dapat mengubah urutandataVariableatau menghapus salah satu dari mereka. Meme it


    * Anda kemudian dapat menggunakan[Login](#dasdds)  (Sitemap) untuk berulang kali menguji XML untuk dataset itu untuk memastikan bahwa dataset yang dihasilkan muncul saat Anda inginERDDAPSitemap
    * Jangan ragu untuk membuat perubahan kecil kedatasets.xmlchunk yang dihasilkan, misalnya, menyediakan lebih baikinfoUrl, ringkasan, atau judul.
#### Sitemap{#donotaddstandardnames} 
Jika Anda menyertakan \\-doNotAddStandardNames sebagai parameter baris perintah ketika Anda menjalankan menghasilkan Login Xml, menghasilkan Login Xml tidak akan menambahstandard\\_nameLoginaddAttributesuntuk variabel apa pun selain variabel bernama latitude, longitude, ketinggian, kedalaman atau waktu (yang sudah jelasstandard\\_nameLogin) Sitemap Ini dapat berguna jika Anda menggunakan output dari menghasilkan Login LoginERDDAP™tanpa mengedit output, karena menghasilkan Login Xml sering menebakstandard\\_nameSitemap (Perhatikan bahwa kita selalu merekomendasikan bahwa Anda mengedit output sebelum menggunakannyaERDDAPSitemap) Menggunakan parameter ini akan memiliki efek terkait kecil lainnya karena ditebakstandard\\_namesering digunakan untuk tujuan lain, misalnya, untuk membuat barulong\\_name, dan untuk membuat pengaturan warnaBar.
#### Login{#scripting} 
Sebagai alternatif untuk menjawab pertanyaan secara interaktif di keyboard dan pengulangan untuk menghasilkan set data tambahan, Anda dapat menyediakan argumen baris perintah untuk menjawab semua pertanyaan untuk menghasilkan satu set data. Login Xml akan memproses parameter tersebut, tulis output ke file output, dan keluar program.
        
Untuk mengatur program ini, pertama kali menggunakan program dalam mode interaktif dan menulis jawaban Anda. Berikut ini contoh parsial:
Katakanlah Anda menjalankan script: ./GenerateDatasetsXml.sh
Kemudian masukkan: EDDTableDariAsciiFiles
Kemudian masukkan: /u00/data/
Kemudian masukkan: .\\\.asc
Kemudian masukkan: /u00/data/sampleFile.asc
Kemudian masukkan: ISO-8859-1
        
Untuk menjalankan ini dengan cara non-interaktif, gunakan baris perintah ini:
./GenerateDatasetsXml.sh EDDTableDariAsciiFiles /u00/data/.\\*\\.asc /u00/data/sampleFile.asc ISO859-8-1
Jadi pada dasarnya, Anda hanya daftar semua jawaban di baris perintah.
Ini harus berguna untuk dataset yang sering berubah sedemikian rupa sehingga mengharuskan kembali Hasil Dataset Login (SitemapEDDGridSitemap) Sitemap
        
Sitemap

* Jika parameter mengandung ruang atau beberapa karakter khusus, kemudian mengkodekan parameter sebagai[string gaya JSON](https://www.json.org/json-en.html), e.g., parameter saya dengan ruang dan dua\\nLogin
* Jika Anda ingin menentukan string kosong sebagai parameter, gunakan: tidak ada
* Jika Anda ingin menentukan nilai default dari parameter, gunakan: default
             
* Login Xml mendukung a -i *Login Login* Sitemap *Login* parameter baris perintah yang memasukkan output ke dalam yang ditentukandatasets.xmlLogin (default adalah *Login* Logindatasets.xml) Sitemap Login Xml mencari dua baris dalam dataset Login
```
        <!-- Begin GenerateDatasetsXml #*tagName someDatetime* -->  
```
Login
```
        <!-- End GenerateDatasetsXml #*tagName someDatetime* -->  
```
dan mengganti segala sesuatu di antara garis-garis dengan konten baru, dan mengubah waktu tertentu.
* Sakelar -i hanya diproses (dan perubahandatasets.xmlhanya dibuat) jika Anda menjalankan GenerateDatasets Xml dengan argumen baris perintah yang menentukan semua jawaban untuk semua pertanyaan untuk satu loop program. (Lihat 'Scripting' di atas.)   (Pemikiran adalah: Parameter ini digunakan dengan skrip. Jika Anda menggunakan program dalam mode interaktif (mengetik info di keyboard) Anda mungkin untuk menghasilkan beberapa chunks yang salah dari XML sebelum Anda menghasilkan yang Anda inginkan.) 
* Jika garis awal dan akhir tidak ditemukan, maka garis-garis dan konten baru dimasukkan tepat sebelum&lt;Login
* Ada juga -I (modal i) beralih untuk tujuan pengujian yang bekerja sama seperti -i, tetapi membuat file yang disebutdatasets.xml *Sitemap* dan tidak membuat perubahandatasets.xmlSitemap
* Jangan menjalankan GenerateDatasets Xml dengan -i dalam dua proses sekaligus. Ada kesempatan hanya satu set perubahan akan disimpan. Mungkin ada masalah serius (misalnya, file rusak) Sitemap
    
Jika Anda menggunakan "GenerateDatasetsXml -verbose", itu akan mencetak pesan diagnostik lebih dari biasanya.
    
#### Jenis Dataset Khusus/Pseudo{#specialpseudo-dataset-types} 
Secara umum, opsi EDDType di GenerateDatasets Xml cocok dari jenis EDD yang dijelaskan dalam dokumen ini (Login[Daftar Jenis Dataset](#list-of-types-datasets)) dan menghasilkan satudatasets.xmlchunk untuk membuat satu dataset dari satu sumber data tertentu. Ada beberapa pengecualian dan kasus khusus:
    
##### EDDGridLogin{#eddgridfromerddap} 
EDDType ini menghasilkan semuadatasets.xmlchunks diperlukan untuk membuat[EDDGridLogin](#eddfromerddap)dataset dari semuaEDDGriddataset di remoteERDDAPSitemap Anda akan memiliki pilihan untuk menjaga aslinyadatasetIDLogin (yang mungkin duplikat beberapa Meme itdatasetIDs sudah diERDDAP) atau menghasilkan nama baru yang akan unik (tetapi biasanya tidak dibaca manusia Meme it) Sitemap
     
##### Login{#eddtablefromerddap} 
EDDType ini menghasilkan semuadatasets.xmlchunks diperlukan untuk membuat[Login](#eddfromerddap)dataset dari semua dataset EDDTable di remoteERDDAPSitemap Anda akan memiliki pilihan untuk menjaga aslinyadatasetIDLogin (yang mungkin duplikat beberapa Meme itdatasetIDs sudah diERDDAP) atau menghasilkan nama baru yang akan unik (tetapi biasanya tidak dibaca manusia Meme it) Sitemap
     
##### EDDGridSitemap{#eddgridfromthreddscatalog} 
EDDType ini menghasilkan semuadatasets.xmlchunks diperlukan untuk semua Meme it[EDDGridLogin](#eddgridfromdap)dataset yang dapat ditemukan dengan merangkai berulang melalui THREDDS (Sitemap) Katalog Ada banyak bentuk URL katalog THREDDS. Opsi ini REQUIRES URL THREDDS .xml dengan /katalog / di dalamnya, misalnya,
 https://oceanwatch.pfeg.noaa.gov/thredds/catalog/catalog.xml Sitemap
 https://oceanwatch.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/chla/catalog.xml   
Katalog .html
 https://oceanwatch.pfeg.noaa.gov/thredds/Satellite/aggregsatMH/chla/catalog.html , yang tidak dapat diterimaEDDGridSitemap
Jika Anda memiliki masalah denganEDDGridSitemap Katalog
* Pastikan URL yang Anda gunakan adalah valid, termasuk / katalog / dan berakhir dengan /katalog.xml .
* Jika memungkinkan, gunakan alamat IP publik (Sitemap https://oceanwatch.pfeg.noaa.gov ) di URL, bukan alamat IP numerik lokal (Sitemap https://12.34.56.78 ) Sitemap Jika THREDDS hanya dapat diakses melalui alamat IP numerik lokal, Anda dapat menggunakan [&lt;Login (Login) SitemapERDDAP™pengguna melihat alamat publik, meskipun Meme itERDDAP™mendapatkan data dari alamat numerik lokal.
* Jika Anda memiliki masalah yang tidak dapat Anda selesaikan,[periksa tips pemecahan masalah](#troubleshooting-tips)Sitemap
* Kode tingkat rendah untuk ini sekarang menggunakanUnidatanetcdf-java katalog kode crawler (Login Katalog) sehingga dapat menangani semua katalog THREDDS (yang bisa sangat kompleks) SitemapUnidatauntuk kode itu.
         
##### EDDGridLonPM180DariErddapKatalog{#eddgridlonpm180fromerddapcatalog} 
EDDType ini menghasilkandatasets.xmlSitemap[EDDGridLonPM180](#eddgridlonpm180)dataset dari semuaEDDGriddataset dalam sebuahERDDAPyang memiliki nilai longitude lebih dari 180.
* Jika memungkinkan, gunakan alamat IP publik (Sitemap https://oceanwatch.pfeg.noaa.gov ) di URL, bukan alamat IP numerik lokal (Sitemap https://12.34.56.78 ) Sitemap SitemapERDDAP™hanya dapat diakses melalui alamat IP numerik lokal, Anda dapat menggunakan [&lt;Login (Login) SitemapERDDAP™pengguna melihat alamat publik, meskipun Meme itERDDAP™mendapatkan data dari alamat numerik lokal.
         
##### EDDGridDatasheet PDF{#eddgridlon0360fromerddapcatalog} 
EDDType ini menghasilkandatasets.xmlSitemap[EDDGridLon0360](#eddgridlon0360)dataset dari semuaEDDGriddataset dalam sebuahERDDAPyang memiliki nilai longitude kurang dari 0.
* Jika memungkinkan, gunakan alamat IP publik (Sitemap https://oceanwatch.pfeg.noaa.gov ) di URL, bukan alamat IP numerik lokal (Sitemap https://12.34.56.78 ) Sitemap SitemapERDDAP™hanya dapat diakses melalui alamat IP numerik lokal, Anda dapat menggunakan [&lt;Login (Login) SitemapERDDAP™pengguna melihat alamat publik, meskipun Meme itERDDAP™mendapatkan data dari alamat numerik lokal.
         
##### Login{#eddsfromfiles} 
Mengingat direktori awal, melintasi direktori ini dan semua subdirectories dan mencoba untuk membuat dataset untuk setiap kelompok file data yang ditemukan.
* Ini menganggap bahwa ketika dataset ditemukan, dataset mencakup semua subdirectories.
* Jika dataset ditemukan, direktori sibling serupa akan diperlakukan sebagai set data terpisah (misalnya, direktori untuk 1990-an, 2000-an, 2010 akan menghasilkan dataset terpisah) Sitemap Mereka harus mudah digabungkan dengan tangan - hanya mengubah dataset pertama&lt;fileDir&gt; ke direktori induk dan menghapus semua dataset saudara berikutnya.
* Ini hanya akan mencoba untuk menghasilkan potongandatasets.xmluntuk jenis ekstensi file yang paling umum di direktori (tidak menghitung .md5, yang diabaikan) Sitemap Jadi, berikan direktori dengan 10.ncfile dan file 5 .txt, dataset akan dihasilkan untuk.ncfile saja.
* Ini menganggap bahwa semua file dalam sebuah direktori dengan ekstensi yang sama milik dataset yang sama. Jika sebuah direktori memiliki beberapa.ncfile dengan data SST dan beberapa.ncfile dengan data klorofil, hanya satu sampel.ncfile akan dibaca (Login klorofil?) dan hanya satu dataset akan dibuat untuk jenis file. Dataset itu mungkin akan gagal untuk memuat karena komplikasi dari mencoba memuat dua jenis file ke dataset yang sama.
* Jika ada lebih dari 4 file dengan ekstensi yang paling umum di direktori, ini menganggap bahwa mereka tidak file data dan hanya melewatkan direktori.
* Jika ada 4 atau lebih file di direktori, tetapi ini tidak dapat berhasil menghasilkan potongandatasets.xmluntuk file (misalnya, jenis file yang tidak didukung) , ini akan menghasilkan[Login](#eddtablefromfilenames)dataset untuk file.
* Pada akhir diagnostik yang menulis ini ke file log, hanya sebelumdatasets.xmlchunks, ini akan mencetak tabel dengan ringkasan informasi yang dikumpulkan dengan menelusuri semua subdirectories. Tabel akan mencantumkan setiap subdirectory dan menunjukkan jenis ekstensi file yang paling umum, jumlah total file, dan jenis dataset yang dibuat untuk file ini (Sitemap) Sitemap Jika Anda dihadapkan dengan struktur file bersarang yang kompleks, mempertimbangkan menjalankan GenerateDatasets Xml dengan EDDType=EDDsDariFiles hanya untuk menghasilkan informasi ini,
* Pilihan ini mungkin tidak melakukan pekerjaan yang bagus untuk menebak EDDType terbaik untuk kelompok file data tertentu, tetapi cepat, mudah, dan layak mencoba. Jika file sumber cocok, itu bekerja dengan baik dan merupakan langkah pertama yang baik dalam menghasilkandatasets.xmluntuk sistem file dengan banyak subdirectories, masing-masing dengan file data dari set data yang berbeda.
         
##### EDDTableDariEML dan EDDTableDariEMLBatch{#eddtablefromeml-and-eddtablefromemlbatch} 
EDDType khusus ini menghasilkandatasets.xmluntuk membuat[Login](#eddtablefromasciifiles)dataset dari setiap tabel yang dijelaskan dalam[Bahasa Metadata Ekologi](https://knb.ecoinformatics.org/external//emlparser/docs/index.html)XML API Varietas "Batch" bekerja pada semua file EML di direktori lokal atau jarak jauh. Silahkan lihat terpisah[dokumentasi untuk EDDTableDariEML](/docs/server-admin/EDDTableFromEML)Sitemap
     
##### Login{#eddtablefrominport} 
EDDType khusus ini menghasilkandatasets.xmluntuk membuat[Login](#eddtablefromasciifiles)dataset dari informasi dalam[Login](https://inport.nmfs.noaa.gov/inport)Login Jika Anda dapat mendapatkan akses ke file data sumber (file inport-xml harus memiliki clues untuk di mana untuk menemukannya) Anda dapat membuat dataset kerja diERDDAPSitemap

Langkah-langkah berikut menguraikan cara menggunakan GenerateDatasets Xml dengan file inport-xml untuk mendapatkan dataset kerjaERDDAPSitemap

1. Setelah Anda memiliki akses ke file inport-xml (baik sebagai URL atau file lokal) : menjalankan GenerateDataset Xml, tentukan EDDType=EDDTableDariInPort, tentukan URL inport-xml atau nama file penuh, tentukan yangChild=0, dan tentukan informasi yang diminta lainnya (Sitemap) Sitemap (Pada titik ini, Anda tidak perlu memiliki file data sumber atau menentukan namanya.) YangChild=0 pengaturan memberitahu GenerateDatasets Xml untuk menulis informasi untuk **Sitemap** Sitemap&lt;informasi entitas&gt;&lt;inport-xml file (jika ada) Sitemap Ini juga mencetak ringkasan informasi Latar Belakang, termasuk semua unduh-url yang tercantum dalam file inport-xml.
2. Lihat semua informasi (termasuk informasi Latar Belakang yang Hasil Dataset Login) Login (Login) untuk mencoba untuk menemukan file data sumber (Login) Sitemap Jika Anda dapat menemukannya (Login) Unduh (Login) ke dalam sebuah direktori yang dapat diaksesERDDAPSitemap (Jika Anda tidak dapat menemukan file data sumber, tidak ada titik dalam proses.) 
3. Login Login Login
Jika file data sumber sesuai dengan salah satu file inport-xml&lt;informasi entitas&gt;&lt;entitas&gt;, tentukan yangChild= *Login*   (g., 1, 2, 3, ...) SitemapERDDAP™akan mencoba untuk mencocokkan nama kolom dalam file data sumber untuk nama dalam informasi entitas, dan meminta untuk menerima/metikkan/memperbaiki perbedaan.
Atau, jika file inport-xml tidak memiliki&lt;informasi entitas&gt;&lt;entitas&gt;, tentukan yangChild=0.
4. Di chunk daridatasets.xmlyang dibuat oleh GenerateDataset Xml, revisi [global]&lt;addAttributesSitemap (Sitemap) sesuai kebutuhan/dikat.
5. Di chunk daridatasets.xmlyang dibuat oleh GenerateDatasetsXml, tambahkan/lihat [&lt;dataVariableSitemap (Login) informasi yang diperlukan/teruskan untuk menggambarkan setiap variabel. Pastikan Anda mengidentifikasi setiap variabel
Sitemap&lt;sourceNameSitemap (Login)   (seperti itu muncul dalam sumber) Login
Sitemap&lt;destinationNameSitemap (Login)   (yang memiliki lebih banyak keterbatasan pada karakter yang diizinkan daripada Meme itsourceName) Login
Sitemap&lt;Sitemap (Login)   (terutama jika itu adalah[waktu atau variabel kalitamp](#timestamp-variables)di mana unit harus menentukan format) Sitemap
Sitemap&lt;missing\\_valueSitemap (Sitemap) Login
6. Ketika Anda dekat dengan finishing, berulang kali menggunakan[Login](#dasdds)alat untuk cepat melihat apakah deskripsi dataset valid dan jika dataset akan munculERDDAP™seperti yang Anda inginkan. Meme it
     

Ini akan bagus jika kelompok menggunakan InPort untuk mendokumentasikan dataset mereka juga akan digunakanERDDAP™untuk membuat data aktual yang tersedia:

*   ERDDAP™adalah solusi yang dapat digunakan sekarang sehingga Anda dapat memenuhiNOAASitemap[Akses Umum untuk Hasil Penelitian (Login) Sitemap](https://nosc.noaa.gov/EDMC/PD.DSP.php)sekarang, bukan pada beberapa waktu vague di masa depan.
*   ERDDAP™membuat data aktual yang tersedia untuk pengguna, bukan hanya metadata. (Apa yang bagus adalah metadata tanpa data?) 
*   ERDDAP™mendukung metadata (tidak dapat, unit variabel) Tidak seperti beberapa perangkat lunak server data lain yang dipertimbangkan. (Apa yang bagus adalah data tanpa metadata?) Untuk menggunakan perangkat lunak yang tidak mendukung metadata adalah untuk mengundang data yang rusak dan disalahgunakan.
*   ERDDAP™gratis dan perangkat lunak open-source tidak seperti beberapa perangkat lunak lain yang dipertimbangkan. Pengembangan yang sedang berlangsungERDDAP™sudah dibayar. SitemapERDDAP™pengguna gratis.
*   ERDDAP's penampilan dapat dengan mudah disesuaikan untuk mencerminkan dan menyoroti grup Anda (LoginERDSitemapERDDAP) Sitemap
*   ERDDAP™menawarkan cara yang konsisten untuk mengakses semua dataset.
*   ERDDAP™dapat membaca data dari berbagai jenis file data dan dari database terkait.
*   ERDDAP™dapat menangani dataset besar, termasuk dataset di mana data sumber berada dalam banyak file data.
*   ERDDAP™dapat menulis data ke berbagai jenis file data, atas permintaan pengguna, termasuk jenis file data ilmiah seperti netCDF, ESRI .csv, danODV .txtSitemap
*   ERDDAP™dapat membuat grafik dan peta kustom dari subset data, berdasarkan spesifikasi pengguna.
*   ERDDAP™dapat menangani dataset non-data seperti koleksi gambar, video, atau file audio.
*   ERDDAP™telah diinstal dan digunakan di Meme it[lebih dari 60 institusi di seluruh dunia](/#who-uses-erddap)Sitemap
*   ERDDAP™terdaftar sebagai salah satu server data yang disarankan untuk digunakan dalamNOAASitemap[NOAAAkses Data Procedural Directive](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations)Tidak seperti beberapa perangkat lunak lain yang dipertimbangkan.
*   ERDDAP™adalah produkNMFSSitemapNOAAsehingga menggunakannya dalamNMFSLoginNOAAharus menjadi titik kebanggaan untuk Meme itNMFSLoginNOAASitemap

SitemapERDDAP™coba. Jika Anda memerlukan bantuan, silakan kirim pesan di Meme itERDDAP™Sitemap
     
##### Login{#addfillvalueattributes} 
Opsi EDDType khusus ini bukan jenis dataset. Ini adalah alat yang dapat menambahkan atribut \\_FillValue ke beberapa variabel dalam beberapa set data. Sitemap[Login](#add-_fillvalue-attributes)Sitemap
     
##### Login Sitemap{#findduplicatetime} 
Opsi EDDType khusus ini bukan jenis dataset. Sebagai gantinya, ceritakan GenerateDatasets Xml untuk mencari melalui koleksi gridded.nc  (dan terkait) file untuk menemukan dan mencetak daftar file dengan nilai waktu duplikat. Ketika melihat nilai waktu, itu mengubahnya dari unit asli ke"seconds since 1970-01-01"jika file yang berbeda menggunakan string unit yang berbeda. Anda perlu menyediakan direktori awal (dengan atau tanpa slash trailing) Nama file ekspresi reguler (.g., .\\\\.nc ) , dan nama variabel waktu dalam file.
     
##### Login{#ncdump} 
Opsi EDDType khusus ini bukan jenis dataset. Sebagai gantinya, ceritakan GenerateDatasets Xml untuk mencetak[Login](https://linux.die.net/man/1/ncdump)\\-seperti cetak dari.ncLogin.ncg.hdfLogin Ini sebenarnya menggunakan netcdf-java[Login](https://docs.unidata.ucar.edu/netcdf-java/5.4/javadoc/ucar/nc2/write/Ncdump.html), yang merupakan alat yang lebih terbatas daripada versi C NCdump. Jika Anda menggunakan opsi ini, GenerateDatasetsXml akan meminta Anda untuk menggunakan salah satu opsi: "-h" (Login) "-c" (Sitemap) "-vall" (Login) "-v var1;var2", "-v var1 (0 Artikel - 0,00 €) Sitemap Ini berguna karena, tanpa ncdump itu sulit untuk tahu apa yang ada dalam.ncLogin.ncg.hdffile dan dengan demikian EDDType Anda harus menentukan untuk GenerateDataset Login Sitemap.ncfile ml, ini akan mencetak output ncdump untuk hasil.ncperubahan file g.ncSitemap.hdfLogin
         
### Login{#dasdds} 
*   [ **Login** ](#dasdds)adalah program baris perintah yang dapat Anda gunakan setelah Anda telah membuat upaya pertama di XML untuk dataset baru didatasets.xmlSitemap Dengan DasDds, Anda dapat berulang kali menguji dan memperbaiki XML. Ketika Anda menggunakan program DasDds:
    1. Pada Windows, pertama kalinya Anda menjalankan DasDds, Anda perlu mengedit DasDds. bat file dengan editor teks untuk mengubah jalan ke java. exe file sehingga Windows dapat menemukanJavaSitemap
    2. DasDds meminta Anda untuk Meme itdatasetIDuntuk dataset yang Anda kerjakan.
    3. DasDds mencoba untuk membuat dataset dengan itudatasetIDSitemap
        * DasDds selalu mencetak banyak pesan diagnostik.
Jika Anda menggunakan "DasDds -verbose", DasDds akan mencetak pesan diagnostik lebih dari biasanya.
        * Untuk keamanan, DasDds selalu menghapus semua informasi dataset yang tersimpan (Login) untuk dataset sebelum mencoba untuk membuat dataset. Ini adalah setara dengan pengaturan[bendera keras](/docs/server-admin/additional-information#hard-flag)Jadi untuk dataset agregat, Anda mungkin ingin menyesuaikan fileNameRegex sementara untuk membatasi jumlah file konstruktor data menemukan.
        * Jika dataset gagal dimuat (untuk alasan apa pun) DasDds akan berhenti dan menunjukkan pesan kesalahan untuk kesalahan pertama yang ditemukan.
             **Jangan mencoba untuk menebak apa masalah yang mungkin. Baca pesan ERROR dengan hati-hati.**   
Jika perlu, baca pesan diagnostik preceding untuk menemukan lebih banyak petunjuk dan informasi, juga.
        *    **Membuat perubahan ke XML dataset untuk mencoba memecahkan masalah yang**   
dan biarkan DasDds mencoba untuk membuat dataset lagi.
        *    **Jika Anda berulang kali memecahkan setiap masalah, Anda akhirnya akan memecahkan semua masalah**   
dan dataset akan dimuat.
    4. Semua output DasDds (diagnostik dan hasil) ditulis ke layar dan untuk *Login* /logs/DasDds.log
    5. Jika DasDds dapat membuat dataset, DasDds kemudian akan menunjukkan Anda[Login (Struktur Atribut Dataset) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType_das)Login[Login (Database Struktur) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType_dds)Sitemap[Login (Sitemap) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#timeGaps)informasi untuk dataset di layar Anda dan menulis mereka untuk *Login* Login
    6. Seringkali, Anda ingin membuat beberapa perubahan kecil ke XML dataset untuk membersihkan metadata dataset dan DasDds.

### Login Alat Pihak Ketiga:ERDDAPLogin{#bonus-third-party-tool-erddap-lint} 
ERDDAP-lint adalah program dari Rob Fuller dan Adam Leadbetter dari Institut Laut Irlandia yang dapat Anda gunakan untuk meningkatkan metadata dari AndaERDDAP™LoginERDDAP-lint "mendapatkan aturan dan aplikasi web statis sederhana untuk menjalankan beberapa tes verifikasi terhadap AndaERDDAP™Login Semua tes berjalan di browser web." Sitemap[Unix/Linux lint tool](https://en.wikipedia.org/wiki/Lint_(software)), Anda dapat mengedit aturan yang ada atau menambahkan aturan baru. Sitemap[ERDDAPLogin](https://github.com/IrishMarineInstitute/erddap-lint)Informasi lebih lanjut

Alat ini sangat berguna untuk dataset yang Anda buat beberapa waktu yang lalu dan sekarang ingin membawa up-to-date dengan preferensi metadata saat ini. Contohnya, versi awal GenerateDatasets Xml tidak memberikan upaya untuk menciptakan globalcreator\\_nameLogincreator\\_email, pencipta\\_type, ataucreator\\_urlLogin Anda bisa menggunakanERDDAP-lint untuk mengidentifikasi dataset yang tidak memiliki atribut metadata.

Berkat Rob dan Adam untuk membuat alat ini dan membuatnya tersedia untukERDDAP™Sitemap
 
## Struktur Dasardatasets.xmlLogin{#the-basic-structure-of-the-datasetsxml-file} 
Tag yang diperlukan dan opsional diperbolehkan dalamdatasets.xmlLogin (dan jumlah kali mereka mungkin muncul Meme it) ditampilkan di bawah ini. Praktikumdatasets.xmlakan memiliki banyak&lt;Tag dataset&gt; dan hanya menggunakan tag lain dalam&lt;Sitemap

  >&nbsp;&lt;&#63;xml version="1.0" encoding="ISO-8859-1" &#63;>  
  >&nbsp;&lt;erddapDatasets>  
  >&nbsp;&nbsp;&nbsp;[&lt;angularDegreeUnits>](#angulardegreeunits)...&lt;/angularDegreeUnits> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;angularDegreeTrueUnits>](#angulardegreetrueunits)...&lt;/angularDegreeTrueUnits> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;cacheMinutes>](#cacheminutes)...&lt;/cacheMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;commonStandardNames>](#commonstandardnames)...&lt;/commonStandardNames> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertInterpolateRequestCSVExample />](#convertinterpolaterequestcsvexample) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertInterpolateDatasetIDVariableList />](#convertinterpolatedatasetidvariablelist) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;convertToPublicSourceUrl />](#converttopublicsourceurl) &lt;!-- 0 or more -->  
  >&nbsp;&nbsp;&nbsp;[&lt;decompressedCacheMaxGB>](#decompressed-cache)...&lt;/decompressedCacheMaxGB> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;decompressedCacheMaxMinutesOld>](#decompressed-cache)...&lt;/decompressedCacheMaxMinutesOld> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;drawLandMask>](#drawlandmask)...&lt;/drawLandMask> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;emailDiagnosticsToErdData>](#emaildiagnosticstoerddata)...&lt;/emailDiagnosticsToErdData> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;graphBackgroundColor>](#graphbackgroundcolor)...&lt;/graphBackgroundColor> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressMaxRequests>](#ipaddressmaxrequests)...&lt;/ipAddressMaxRequests> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressMaxRequestsActive>](#ipaddressmaxrequestsactive)...&lt;ipAddressMaxRequestsActive> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;ipAddressUnlimited>](#ipaddressunlimited)...&lt;ipAddressUnlimited> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;loadDatasetsMinMinutes>](#loaddatasetsminminutes)...&lt;/loadDatasetsMinMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;loadDatasetsMaxMinutes>](#loaddatasetsmaxminutes)...&lt;/loadDatasetsMaxMinutes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;logLevel>](#loglevel)...&lt;/logLevel> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;nGridThreads>](#nthreads)...&lt;/nGridThreads> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;nTableThreads>](#nthreads)...&lt;/nTableThreads> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;palettes>](#palettes)...&lt;/palettes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;partialRequestMaxBytes>](#partialrequestmaxbytes-and-partialrequestmaxcells)...&lt;/partialRequestMaxBytes> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;partialRequestMaxCells>](#partialrequestmaxbytes-and-partialrequestmaxcells)...&lt;/partialRequestMaxCells> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;requestBlacklist>](#requestblacklist)...&lt;/requestBlacklist> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;slowDownTroubleMillis>](#slowdowntroublemillis)...&lt;/slowDownTroubleMillis> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;subscriptionEmailBlacklist>](#subscriptionemailblacklist)...&lt;/subscriptionEmailBlacklist> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;unusualActivity>](#unusualactivity)...&lt;/unusualActivity> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;updateMaxEvents>](#updatemaxevents)...&lt;/updateMaxEvents> &lt;!-- 0 or 1 -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;standardLicense>](#standard-text)...&lt;/standardLicense> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardContact>](#standard-text)...&lt;/standardContact> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDataLicenses>](#standard-text)...&lt;/standardDataLicenses> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDisclaimerOfEndorsement>](#standard-text)...&lt;/standardDisclaimerOfEndorsement> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardDisclaimerOfExternalLinks>](#standard-text)...&lt;/standardDisclaimerOfExternalLinks> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardGeneralDisclaimer>](#standard-text)...&lt;/standardGeneralDisclaimer> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;standardPrivacyPolicy>](#standard-text)...&lt;/standardPrivacyPolicy> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;startHeadHtml5>](#standard-text)...&lt;/startHeadHtml5> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;startBodyHtml5>](#standard-text)...&lt;/startBodyHtml5> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;theShortDescriptionHtml>](#standard-text)...&lt;/theShortDescriptionHtml> &lt;!-- 0 or 1 -->  
  >&nbsp;&nbsp;&nbsp;[&lt;endBodyHtml5>](#standard-text)...&lt;/endBodyHtml5> &lt;!-- 0 or 1 -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;user username="..." password="..." roles="..." />](#user) &lt;!-- 0 or more -->  
  >  
  >&nbsp;&nbsp;&nbsp;[&lt;dataset>](#list-of-types-datasets)...&lt;/dataset> &lt;!-- 1 or more -->  
  >&nbsp;&lt;/erddapDatasets>  

Hal ini dimungkinkan bahwa pengkodean lain akan diizinkan di masa depan, tetapi untuk sekarang, hanya ISO-8859-1 dianjurkan.
 
### Login{#xinclude} 
Baru dalam versi 2.25 dukungan untuk XInclude. Ini mengharuskan Anda menggunakan parser SAX&lt;Sitemap&lt;/useSaxParser&gt; di setup Anda.xml. Ini dapat memungkinkan Anda untuk menulis setiap dataset dalam filenya sendiri, kemudian memasukkannya ke dalamdatasets.xml, penggunaan ulang bagian dari definisi dataset, atau keduanya. Jika Anda ingin melihat contoh,[Login](https://github.com/ERDDAP/erddap/blob/main/src/test/java/testDataset/EDDTestDataset.java)Mengatur definisi variabel XInclude to reuse.
 

- Sitemap

## Login{#notes} 

Bekerja dengandatasets.xmlfile adalah proyek non-trivial. Harap baca semua catatan ini dengan hati-hati. Setelah Anda memilih[Jenis dataset](#list-of-types-datasets)silahkan membaca deskripsi rinci tentang hal itu dengan hati-hati.
     
### Memilih Jenis Dataset{#choosing-the-dataset-type} 
Dalam kebanyakan kasus, hanya ada satuERDDAP™jenis dataset yang sesuai untuk sumber data yang diberikan. Dalam beberapa kasus (Login.ncLogin) , ada beberapa kemungkinan, tetapi biasanya salah satu dari mereka pasti terbaik. Keputusan pertama dan terbesar yang harus Anda buat adalah: sangat tepat untuk mengobati dataset sebagai kelompok array multidimensi (jika melihat Meme it[EDDGridjenis dataset](#eddgrid)) atau sebagai tabel data seperti database (jika melihat Meme it[Jenis dataset EDDTable](#eddtable)) Sitemap
     
### Melayani Data{#serving-the-data-as-is} 
Biasanya, tidak perlu memodifikasi sumber data (misalnya, mengkonversi file ke beberapa jenis file lain) SitemapERDDAP™bisa melayaninya. Salah satu asumsiERDDAP™adalah bahwa sumber data akan digunakan sebagai. Meme it Biasanya karya ini baik. Beberapa pengecualian adalah:
* Database LoginERDDAP™dapat melayani data langsung dari database dan Cassandra. Tetapi untuk keamanan, balancing beban, dan masalah kinerja, Anda dapat memilih untuk mengatur database lain dengan data yang sama atau menyimpan data keNetCDFg.ncfile dan memilikiERDDAP™melayani data dari sumber data baru. Sitemap[Login](#eddtablefromdatabase)Login[Login](#eddtablefromcassandra)Sitemap
* Tidak Didukung Sumber Data --ERDDAP™dapat mendukung sejumlah besar jenis sumber data, tetapi dunia diisi dengan 1000 (Sitemap) sumber data yang berbeda (tidak dapat, struktur file data) Sitemap SitemapERDDAP™tidak mendukung sumber data Anda:
    * Jika sumber dataNetCDF .ncfile, Anda dapat menggunakan[Login](#ncml-files)untuk memodifikasi file data on-the-fly, atau menggunakan[NCO](#netcdf-operators-nco)untuk mengubah file data secara permanen.
    * Anda dapat menulis data ke jenis sumber data yang Meme itERDDAP™LoginNetCDFLogin.ncfile adalah rekomendasi umum yang baik karena mereka adalah file biner yangERDDAP™bisa membaca dengan sangat cepat. Untuk data tabular, pertimbangkan menyimpan data dalam koleksi.ncfile yang menggunakan[Login Sitemap (Login) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Struktur data Array yang berkelanjutan dan dapat ditangani denganERDDAPSitemap[Sitemap](#eddtablefromnccffiles)Sitemap Jika mereka diatur secara logis (setiap data untuk chunk ruang dan waktu) LoginERDDAP™dapat mengekstrak data dari mereka dengan sangat cepat.
    * Anda dapat meminta dukungan untuk sumber data yang ditambahkanERDDAP™WordPress.org John di noaaa.gov.
    * Anda dapat menambahkan dukungan untuk sumber data itu dengan menulis kode untuk menanganinya sendiri. Sitemap[LoginERDDAP™Panduan Programmer](/docs/contributing/programmer-guide)
* Kecepatan -ERDDAP™dapat membaca data dari beberapa sumber data jauh lebih cepat daripada yang lain. Sebagai contoh, membacaNetCDFg.ncfile cepat dan membaca file ASCII lebih lambat. Dan jika ada yang besar (Sitemap) atau besar (Sitemap) jumlah file data sumber,ERDDAP™akan menanggapi beberapa permintaan data secara perlahan. Biasanya, perbedaan tidak terlihat pada manusia. Namun, jika Anda berpikirERDDAP™lambat untuk dataset tertentu, Anda dapat memilih untuk memecahkan masalah dengan menulis data ke setup yang lebih efisien (biasanya: beberapa, terstruktur dengan baik,NetCDFg.ncLogin) Sitemap Untuk data tabular, lihat[saran ini](#millions-of-files)Sitemap
         
### Login{#hint} 
Hal ini sering lebih mudah untuk menghasilkan XML untuk dataset dengan membuat salinan deskripsi dataset kerja di dataset.xml dan kemudian memodifikasinya.
    
### Mengkodekan Karakter Khusus{#encoding-special-characters} 
Sitemapdatasets.xmladalah file XML, Anda MUST[Login](https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Predefined_entities_in_XML)"&", "&lt;"&amp;", "&lt;", dan "&gt;".
Login&lt;Login Sitemap&lt;Sitemap
Sitemap&lt;Login Waktu &amp; Tides&lt;Sitemap
     
### XML tidak mentolerir kesalahan sintaks{#xml-doesnt-tolerate-syntax-errors} 
Setelah Anda mengedit file dataset.xml, itu adalah ide yang baik untuk memverifikasi bahwa hasilnya[XML API](https://www.w3schools.com/xml/xml_dtd.asp)dengan menelusuri teks XML ke dalam pemeriksa XML seperti[Login](https://www.xmlvalidation.com/)Sitemap
     
### Pemecahan Masalah Tips{#troubleshooting-tips} 
*    **Cara Lain Untuk Mendiagnosis Masalah Dengan Dataset**   
Selain dua utama[Login](#tools)Login
    *   [Login](/docs/server-admin/additional-information#log)adalah file log dengan semuaERDDAPPesan diagnostik.
    * Login[Laporan harian](/docs/server-admin/additional-information#daily-report)memiliki informasi lebih dari halaman status, termasuk daftar dataset yang tidak memuat dan pengecualian (Login) mereka dihasilkan.
    * Login[Login](/docs/server-admin/additional-information#status-page)adalah cara cepat untuk memeriksaERDDAPstatus dari browser web. Ini termasuk daftar dataset yang tidak memuat (meskipun tidak pengecualian terkait) Statistik (menunjukkan kemajuan[EDDGridLogin](#eddgridcopy)Login[Login](#eddtablecopy)Login[EDDGridLogin](#eddgridfromfiles)Sitemap[Login](#eddtablefromfiles)dataset yang digunakan[Login](#cachefromurl)  (tapi tidak cache Login) ) Sitemap
    * Jika Anda terjebak, lihat[bagian untuk mendapatkan dukungan tambahan](/docs/intro#support)Sitemap
         
### variabel khusus{#special-variables} 
*    **[Garis bujur, lintang, ketinggian (atau kedalaman) Sitemap (Login) Login](#destinationname) [destinationName](#destinationname)Sitemap** 
    * Sitemap
        * variabel LLAT dibuat diketahuiERDDAP™jika variabel sumbu (SitemapEDDGridLogin) atau variabel data (untuk dataset EDDTable)  [destinationName](#destinationname)"longudo", "latitude", "altitude", "depth", atau"time"Sitemap
        * Kami sangat mendorong Anda untuk menggunakan nama standar ini untuk variabel ini setiap saat mungkin. Tidak diperlukan. Jika Anda tidak menggunakan nama variabel khusus ini,ERDDAP™tidak akan mengenali makna mereka. Meme it Misalnya, variabel LLAT diperlakukan khusus dengan Membuat Grafik ( *datasetID* Login) : jika variabel X Axis adalah "longitude" dan variabel Y Axis adalah "latitude", Anda akan mendapatkan peta (menggunakan proyeksi standar, dan dengan masker tanah, batas politik, dll.) bukan grafik.
        *   ERDDAP™akan secara otomatis menambahkan banyak metadata ke variabel LLAT (misalnya, "[ioos\\_category](#ioos_category)", "[Login](#units)", dan beberapa atribut terkait standar seperti "\\_CoordinateAxisType") Sitemap
        *   ERDDAP™akan secara otomatis, on-the-fly, tambahkan banyak metadata global yang terkait dengan nilai LLAT dari subset data yang dipilih (misalnya, "geospatial\\_lon\\_min") Sitemap
        * Klien yang mendukung standar metadata ini akan dapat memanfaatkan metadata tambahan untuk memposisikan data dalam waktu dan ruang.
        * Klien akan menemukan lebih mudah untuk menghasilkan pertanyaan yang mencakup variabel LLAT karena nama variabel sama di semua dataset yang relevan.
    * Untuk variabel "longitude" dan variabel "latitude":
        * Login[destinationName](#destinationname)"longudo" dan "latitude" hanya jika[Login](#units)adalah derajat \\_east dan derajat \\_ utara, masing-masing. Jika data Anda tidak sesuai dengan persyaratan ini, gunakan nama variabel yang berbeda (misalnya, x, y, lonRadians, latRadians) Sitemap
        * Jika Anda memiliki data longitude dan latitude yang dinyatakan dalam unit yang berbeda dan dengan demikiandestinationNames, misalnya, lonRadians dan latRadians, Membuat Grafik ( *datasetID* Login) akan membuat grafik (misalnya, seri waktu) bukan peta.
    * Untuk variabel "altitude" dan variabel "depth":
        * Login[destinationName](#destinationname)"altitude" untuk mengidentifikasi jarak data di atas permukaan laut (nilai="up" positif) Sitemap Opsional, Anda dapat menggunakan "altitude" untuk jarak di bawah permukaan laut jika nilai negatif di bawah laut (atau jika Anda menggunakan, misalnya,
Sitemap&lt;nama att="scale\\_factor" type="int"&gt;- 1 Artikel&lt;Login (Sitemap) untuk mengubah nilai kedalaman menjadi nilai ketinggian.
        * LogindestinationName"depth" untuk mengidentifikasi jarak data di bawah permukaan laut (nilai="down" positif) Sitemap
        * Dataset mungkin tidak memiliki variabel "altitude" dan "depth".
        * Untuk nama variabel ini,[Login](#units)harus "m", "meter", atau "meter". Jika unit berbeda (misalnya, fathoms) Anda dapat menggunakan
Sitemap&lt;nama att="scale\\_factorSitemap *Sitemap Login* &lt;Login (Sitemap) Sitemap&lt;nama att="units"&gt;meters&lt;Login (Login) untuk mengkonversi unit ke meter.
        * Jika data Anda tidak sesuai dengan persyaratan ini, gunakandestinationName  (misalnya, di atasGround, jarak Login) Sitemap
        * Jika Anda tahu CRS vertikal, tentukan dalam metadata, misalnya, "EPSG:5829" (ketinggian instan di atas permukaan laut) "EPSG:5831" (kedalaman instan di bawah permukaan laut) , atau "EPSG:5703" (NAVD88 tinggi) Sitemap
    * Sitemap"time"variabel:
        * Login[destinationName](#destinationname) "time"hanya untuk variabel yang mencakup seluruh tanggal + waktu (atau tanggal, jika itu semua ada Meme it) Sitemap Jika, misalnya, ada kolom terpisah untuk tanggal dan timeOfDay, jangan gunakan nama variabel"time"Sitemap
        * Sitemap[Login](#time-units)untuk informasi lebih lanjut tentang atribut unit untuk variabel timeStamp.
        * Variabel waktu dan terkait[Sitemap variabel Stamp](#timestamp-variables)unik dalam bahwa mereka selalu mengkonversi nilai data dari format waktu sumber (apa pun itu) menjadi nilai numerik (detik sejak 1970-01-01T00:00Z) atau nilai String (ISO9001,SGS,TUV (Login) Login) tergantung pada situasi.
        * Ketika data waktu permintaan pengguna, mereka dapat memintanya dengan menentukan waktu sebagai nilai numerik (detik sejak 1970-01-01T00:00Z) atau nilai String (ISO9001,SGS,TUV (Login) Login) Sitemap
        *   ERDDAP™memiliki utilitas untuk[Mengkonversi Numeric Waktu ke/dari Waktu String](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)Sitemap
        * Sitemap[SitemapERDDAPPenawaran dengan Waktu](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap)Sitemap
            
### Mengapa hanya dua struktur data dasar?{#why-just-two-basic-data-structures} 
* Karena sulit bagi klien manusia dan klien komputer untuk menangani serangkaian struktur dataset yang kompleks,ERDDAP™menggunakan hanya dua struktur data dasar:
    * Sitemap[struktur data gridded](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#dataModel)  (misalnya, untuk data satelit dan data model) Login
    * Sitemap[struktur data tabel](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#dataModel)  (misalnya, untuk buoy in-situ, stasiun, dan data lintas) Sitemap
* Tentu saja, tidak semua data dapat diungkapkan dalam struktur ini, tetapi banyak dari itu bisa. Tabel, khususnya, adalah struktur data yang sangat fleksibel (melihat keberhasilan program database relasional) Sitemap
* Ini membuat kueri data lebih mudah dibangun.
* Ini membuat respon data memiliki struktur sederhana, yang memudahkan untuk melayani data dalam berbagai jenis file standar (yang sering hanya mendukung struktur data sederhana) Sitemap Ini adalah alasan utama yang kami set upERDDAP™cara ini.
* Ini, pada gilirannya, membuatnya sangat mudah bagi kami (atau siapa pun) untuk menulis perangkat lunak klien yang bekerja dengan semuaERDDAP™Login
* Ini memudahkan untuk membandingkan data dari berbagai sumber.
* Kami sangat menyadari bahwa jika Anda digunakan untuk bekerja dengan data dalam struktur data lain Anda mungkin awalnya berpikir bahwa pendekatan ini sederhana atau tidak mencukupi. Tetapi semua struktur data memiliki tradeoffs. Tidak sempurna. Bahkan struktur do-it-all memiliki kelemahan mereka: bekerja dengan mereka kompleks dan file hanya dapat ditulis atau membaca dengan perpustakaan perangkat lunak khusus. Jika Anda menerimaERDDAP's pendekatan cukup untuk mencoba bekerja dengan itu, Anda mungkin menemukan bahwa ia memiliki kelebihannya (sangat dukungan untuk beberapa jenis file yang dapat menahan respons data) Sitemap Login[ERDDAP™slide menunjukkan](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTechTalk.html)  (Sitemap[struktur data slide](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTechTalk.html#dataStructures)) berbicara banyak tentang masalah ini. Meme it
* Dan bahkan jika pendekatan ini terdengar aneh bagi Anda, sebagian besarERDDAP™klien tidak akan pernah memperhatikan - mereka hanya akan melihat bahwa semua dataset memiliki struktur sederhana yang bagus dan mereka akan bersyukur bahwa mereka dapat mendapatkan data dari berbagai sumber yang dikembalikan dalam berbagai format file.
         
### Login{#dimensions} 
*    **Bagaimana jika variabel grid dalam dataset sumber DON'T berbagi variabel sumbu yang sama?**   
SitemapEDDGriddataset, semua variabel data penggunaan MUST (Login) semua variabel sumbu. Jadi jika dataset sumber memiliki beberapa variabel dengan satu set dimensi, dan variabel lainnya dengan set dimensi yang berbeda, Anda harus membuat dua set data dalamERDDAPSitemap Misalnya, Anda mungkin membuat satuERDDAP™dataset berjudul "Some Judul (di permukaan) " untuk menahan variabel yang hanya digunakan\\[Sitemap\\]\\[Login\\]\\[Login\\]dimensi dan membuat dimensi lainERDDAP™dataset berjudul "Some Judul (di kedalaman) " untuk menahan variabel yang digunakan\\[Sitemap\\]\\[Login\\]\\[Login\\]\\[Login\\]Sitemap Atau mungkin Anda dapat mengubah sumber data untuk menambahkan dimensi dengan nilai tunggal (misalnya, ketinggian=0) untuk membuat variabel konsisten.
    
    ERDDAP™tidak menangani set data yang lebih rumit (misalnya, model yang menggunakan jala segitiga) Sitemap Anda dapat melayani dataset iniERDDAP™dengan membuat dua atau lebih dataset dalamERDDAP™  (sehingga semua variabel data di setiap dataset baru berbagi set variabel sumbu yang sama) tapi itu bukan apa yang diinginkan pengguna. Meme it Untuk beberapa dataset, Anda mungkin mempertimbangkan membuat versi gridded reguler dari dataset dan menawarkan bahwa selain data asli. Beberapa perangkat lunak klien hanya dapat berurusan dengan grid biasa, sehingga dengan melakukan ini, Anda mencapai klien tambahan.
     
    
### Database{#projected-gridded-data} 
Beberapa data gridded memiliki struktur yang kompleks. Sebagai contoh, tingkat satelit 2 ("Lacak panjang") data tidak menggunakan proyeksi sederhana. Login (dan lain-lain) sering bekerja dengan data gridded pada berbagai proyeksi non silinder (misalnya, stereografi polar, tripolar) atau dalam grid yang tidak terstruktur (struktur data yang lebih kompleks) Sitemap Beberapa pengguna akhir ingin data ini karena tidak ada hilangnya informasi. Untuk klien-klien tersebut,ERDDAP™dapat melayani data, seperti, hanya jikaERDDAP™administrator melanggar dataset asli ke beberapa dataset, dengan setiap bagian termasuk variabel yang berbagi variabel sumbu yang sama. Ya, yang tampak aneh bagi orang-orang yang terlibat dan berbeda dari sebagian besarOPeNDAPserver. LoginERDDAP™menekankan membuat data yang tersedia dalam banyak format. Itu mungkin karena Meme itERDDAP™menggunakan / memenuhi struktur data yang lebih seragam. Meskipun sedikit canggung (i.e., berbeda dari yang diharapkan) LoginERDDAP™dapat mendistribusikan data yang diproyeksikan.

\\[LoginERDDAP™dapat memiliki persyaratan yang lebih longgar untuk struktur data, tetapi menjaga persyaratan untuk format output. Tapi itu akan menyebabkan kebingungan di antara banyak pengguna, terutama pemula, karena banyak permintaan yang tampaknya valid untuk data dengan struktur yang berbeda akan tidak valid karena data tidak akan sesuai dengan jenis file. Kami terus kembali ke desain sistem saat ini.\\]

Beberapa pengguna akhir ingin data dalam proyeksi silinder lat seperti Equirectangular / plate carrée atau Mercator) untuk memudahkan penggunaan dalam situasi yang berbeda. Untuk situasi ini, kami mendorongERDDAP™administrator untuk menggunakan beberapa perangkat lunak lain (NCOSitemapMatlabSitemap Login Login Login) untuk mengubah ulang data ke geografis (Proyeksi persegi panjang / plat carrée) atau proyeksi silinder lainnya dan melayani bentuk data dalamERDDAP™sebagai dataset yang berbeda. Hal ini mirip dengan orang apa yang dilakukan ketika mereka mengkonversi data tingkat satelit 2 ke tingkat 3 data. Satu alat tersebut[NCO](https://nco.sourceforge.net/nco.html#Regridding)yang menawarkan opsi ekstensi untuk data regridding.

#### Data GIS dan Proyeksi{#gis-and-reprojecting-data} 
Sejak dunia GIS sering dipetakan peta, program GIS biasanya menawarkan dukungan untuk mengubah data, yaitu, membimbing data pada peta dengan proyeksi yang berbeda.

SitemapERDDAP™tidak memiliki alat untuk mengubah data proyek. Alih-alih, kami merekomendasikan bahwa Anda menggunakan alat eksternal untuk membuat varian dataset, di mana data telah diubah dari bentuk aslinya ke persegi panjang (garis bujur) array cocok untukERDDAPSitemap

Menurut pendapat kami, CF /DAPdunia sedikit berbeda dari dunia GIS dan bekerja pada tingkat yang sedikit lebih rendah.ERDDAP™mencerminkan itu. Secara umumERDDAP™dirancang untuk bekerja terutama dengan data (Sitemap) dan tidak ingin berubah Meme it (Sitemap) data. SitemapERDDAP™Data gridded sering/biasanya/terbaiknya terkait dengan nilai lat lon dan proyeksi silinder, dan bukan beberapa nilai proyeksi x,y. Bagaimanapun,ERDDAP™tidak melakukan apa pun dengan proyeksi data; itu hanya melewati data melalui, seperti, dengan proyeksi saat ini, pada teori bahwa reproyeksi adalah perubahan signifikan terhadap data danERDDAP™tidak ingin terlibat dengan perubahan yang signifikan. Selain itu, pengguna berikutnya mungkin merubah ulang data lagi, yang tidak akan sebagus melakukan satu proyeksi. (Jadi, jikaERDDAP™administrator ingin menawarkan data dalam proyeksi yang berbeda, baik; hanya mengubah data secara offline dan menawarkan bahwa sebagai dataset yang berbeda dalamERDDAPSitemap Banyak set data berbasis satelit ditawarkan sebagai apa yang NASA call Level 2 (Login) dan sebagai Tingkat 3 (Proyeksi Equirectangular) Sitemap) SitemapERDDAP™membuat peta (SitemapWMSatau KML) LoginERDDAP™saat ini hanya menawarkan untuk membuat peta dengan proyeksi Equirectangular / plate carrée yang, untungnya, diterima oleh sebagian besar program pemetaan.

Kami mendorongERDDAP™administrator untuk menggunakan beberapa perangkat lunak lain (NCOSitemapMatlabSitemap Login Login Login) untuk mengubah ulang data ke geografis (Proyeksi persegi panjang / plat carrée) atau proyeksi silinder lainnya dan melayani bentuk data dalamERDDAP™sebagai dataset yang berbeda. Hal ini mirip dengan orang apa yang dilakukan ketika mereka mengkonversi data tingkat satelit 2 ke tingkat 3 data. Satu alat tersebut[NCO](https://nco.sourceforge.net/nco.html#Regridding)yang menawarkan opsi ekstensi untuk data regridding.

Kami berharapERDDAP™akan memiliki alat bawaan untuk menawarkan peta dengan proyeksi lain di masa depan. Kami juga berharap memiliki koneksi yang lebih baik ke dunia GIS di masa depan (selain arusWMSSitemap) Sitemap Ini mengerikan bahwa di dunia "modern" ini, tautan antara CF / CFDAPdunia dan dunia GIS masih begitu lemah. Kedua hal-hal tersebut ada di Daftar Untuk Melakukan. (Jika Anda ingin membantu, cukup dengan menghubungkanERDDAP™ke MapServer, silakan email Chris. John di noaaa.gov .) 
    
### Jenis Data{#data-types} 
ERDDAP™mendukung jenis data berikut
 (nama sensitif kasus;'u'prefix singkatan dari "unsigned"; jumlah banyak nama dalam sistem lain adalah jumlah bit) Sitemap

#### Login{#byte} 
*    **Login** telah menandatangani nilai integer dengan berbagai -128 ke 127.
Dalam sistem lain, ini kadang-kadang disebut int8.
Ini disebut "tinyint" oleh SQL dan Cassandra.
    ERDDAP™Login[Login](#boolean-data)dari beberapa sumber (e.g., SQL dan Cassandra) ke dalam bytekanERDDAP™dengan nilai 0=false, 1=true, dan 127=missing\\_valueSitemap
#### Login{#ubyte} 
*    **Login** memiliki nilai integer yang tidak ditugaskan dengan kisaran 0 hingga 255.
Dalam sistem lain, ini kadang-kadang disebut uint8.
#### Sitemap{#short} 
*    **Sitemap** telah menandatangani nilai integer dengan berbagai -32768 ke 32767.
Dalam sistem lain, ini kadang-kadang disebut int16.
Ini disebut "smallint" oleh SQL dan Cassandra.
#### Login{#ushort} 
*    **Login** memiliki nilai integer yang tidak ditugaskan dengan kisaran 0 hingga 65535.
Dalam sistem lain, ini kadang-kadang disebut uint16.
#### Login{#int} 
*    **Login** telah menandatangani nilai integer dengan berbagai -2147483648 ke 2147483647.
Dalam sistem lain, ini kadang-kadang disebut int32.
Ini disebut "integer|Login (Sitemap) " oleh SQL dan "int" oleh Cassandra.
#### Login{#uint} 
*    **Login** memiliki nilai integer yang tidak ditugaskan dengan kisaran 0 hingga 4294967295.
Dalam sistem lain, ini kadang-kadang disebut uint32.
#### Login{#long} 
*    **Login** telah menandatangani nilai integer dengan berbagai -9223372036854775808 ke 9223372036854775807.
Dalam sistem lain, ini kadang-kadang disebut int64.
Ini disebut "bigint|Login (Sitemap) " oleh SQL dan "bigint" oleh Cassandra.
Karena banyak jenis file tidak mendukung data yang panjang, penggunaannya tidak tertahankan. Kapan mungkin, gunakan ganda bukan (Sitemap) Sitemap
#### Login{#ulong} 
*    **Login** memiliki nilai integer yang tidak ditugaskan dengan kisaran 0 hingga 18446744073709551615
Dalam sistem lain, ini kadang-kadang disebut uint64.
Karena banyak jenis file tidak mendukung data ulong, penggunaan mereka didiskusikan. Kapan mungkin, gunakan ganda bukan (Sitemap) Sitemap
#### Login{#float} 
*    **Login** adalah IEEE 754 mengapung dengan berbagai sekitar +/- 3.402823466e + 38.
Dalam sistem lain, ini kadang-kadang disebut float32.
Ini disebut "real|Login (Sitemap) |Login (Sitemap) |Login (Sitemap) " oleh SQL dan "float" oleh Cassandra.
Nilai spesial NaN berarti Not-a-Number.
    ERDDAP™mengkonversi nilai infinitas positif dan negatif ke NaN.
#### Sitemap{#double} 
*    **Sitemap** adalah IEEE 754 ganda dengan kisaran sekitar
+ 1,7976931348157E+308.
Dalam sistem lain, ini kadang-kadang disebut float64.
Ini disebut "tepatan ganda|Login (Sitemap) |Login (Sitemap) |Login (Sitemap) " oleh SQL dan "double" oleh Cassandra.
Nilai spesial NaN berarti Not-a-Number.
    ERDDAP™mengkonversi nilai infinitas positif dan negatif ke NaN.
#### Login{#char} 
*    **Login** adalah satu, 2-byte (16-bit)  [Unicode UCS-2 karakter](https://en.wikipedia.org/wiki/UTF-16)Sitemap\\u0000  (Sitemap) Sitemap\\uffff  (#65535) Sitemap
    \\uffff's definisi adalah Not-a-Character, analog ke nilai ganda NaN.
Penggunaan char didiskusikan karena banyak jenis file baik tidak mendukung chars atau hanya mendukung 1-byte chars (Sitemap) Sitemap Pertimbangkan menggunakan String bukan.
Pengguna dapat menggunakan variabel char untuk membuat grafik.ERDDAP™akan mengubah karakter ke nomor titik kode Unicode mereka, yang dapat digunakan sebagai data numerik.
#### Login{#string} 
*    **Login** adalah urutan 0 atau lebih, 2-byte (16-bit)  [Unicode UCS-2 karakter](https://en.wikipedia.org/wiki/UTF-16)Sitemap
    ERDDAP™menggunakan/interprets string 0-panjang sebagai nilai yang hilang.ERDDAP™tidak mendukung string null sejati.
Panjang string maksimum teoritis adalah karakter 2147483647, tetapi mungkin ada berbagai masalah di berbagai tempat bahkan dengan string yang agak lebih pendek.
SitemapERDDAP's String untuk karakter SQL, varchar, karakter bervariasi, biner, varbinary, interval, array, multiset, xml, dan jenis data database lainnya yang tidak pas dengan yang lainERDDAP™jenis data.
SitemapERDDAP's String for Cassandra's "text" dan jenis data Cassandra lainnya yang tidak pas bersih dengan yang lainERDDAP™jenis data.
     

SitemapERDDAP™v2.10,ERDDAP™tidak mendukung jenis integer yang tidak ditugaskan secara internal dan menawarkan dukungan terbatas pada pembaca data dan penulis.
    
### Batasan Jenis Data{#data-type-limitations} 
Anda dapat memikirkanERDDAP™sebagai sistem yang memiliki dataset virtual, dan yang bekerja dengan membaca data dari sumber dataset ke dalam model data internal dan menulis data ke berbagai layanan (misalnya,(OPeN)DAPLoginWMS) dan jenis file dalam menanggapi permintaan pengguna.

* Setiap pembaca input mendukung subset jenis data yang Meme itERDDAP™Login Jadi membaca data keERDDAPStruktur data internal bukan masalah.
* Setiap penulis output juga mendukung subset jenis data. Itu masalah karena Meme itERDDAPharus memeras, misalnya, data panjang ke dalam jenis file yang tidak mendukung data panjang.
     

Di bawah ini adalah penjelasan dari keterbatasan (atau tidak ada) berbagai penulis output dan bagaimanaERDDAP™penawaran dengan masalah. Komplikasi seperti itu adalah bagian yang melekat dariERDDAP's tujuan pembuatan sistem disparate saling beroperasi.

#### Login{#ascii} 
* Login (Login.tsvSitemap) file teks -
    * Semua data numerik ditulis melalui representasi String (dengan nilai data yang hilang muncul sebagai string 0-panjang) Sitemap
    * LoginERDDAP™menulis nilai panjang dan ulong dengan benar ke file teks ASCII, banyak pembaca (e.g., program spreadsheet) tidak dapat menangani nilai panjang dan ulong dan mengubahnya menjadi nilai ganda (dengan kehilangan ketepatan dalam beberapa kasus) Sitemap
    * Char dan String data ditulis melalui JSON Strings, yang menangani semua karakter Unicode (tidak dapat, karakter "unusual" di luar ASCII #127, misalnya, karakter euro muncul sebagai "\\u20ac") Sitemap
    
        
#### Login{#json} 
* Login (.jsonLogin.jsonlCSVSitemap) file teks -
    * Semua data numerik ditulis melalui representasi String.
    * Char dan String data ditulis sebagai JSON Strings, yang menangani semua karakter Unicode (tidak dapat, karakter "unusual" di luar ASCII #127, misalnya, karakter euro muncul sebagai "\\u20ac") Sitemap
    * Nilai hilang untuk semua jenis data numerik muncul sebagai null.
         
#### .nc3 file{#nc3-files} 
*   .nc3 file tidak mendukung jenis data integer yang tidak ditugaskan. Sebelum CF v1.9, CF tidak mendukung jenis bilangan bulat. Berurusan dengan ini,ERDDAP™2.10 + mengikuti standar NUG dan selalu menambahkan atribut "\\_Unsigned" dengan nilai "true" atau "false" untuk menunjukkan apakah data dari variabel yang tidak ditentukan atau ditandatangani. Semua atribut integer ditulis sebagai atribut yang ditandatangani (Sitemap) dengan nilai yang ditandatangani (misalnya, ubyteactual\\_rangeatribut dengan nilai 0 ke 255, muncul sebagai atribut byte dengan nilai 0 ke -1 (kebalikan dari dua nilai pelengkap nilai out-of-range). Tidak ada cara mudah untuk mengetahui atribut integer (signed) yang harus dibaca sebagai atribut yang tidak ditentukan.ERDDAP™mendukung atribut "\\_Unsigned" ketika membaca.nc3 file.
*   .nc3 file tidak mendukung jenis data panjang atau ulong.ERDDAP™penawaran dengan ini dengan sementara mengkonversi mereka menjadi variabel ganda. Ganda dapat mewakili semua nilai hingga +/- 9,007,199,254,740,992 yang 2^53. Ini adalah solusi yang sempurna.Unidatamenolak untuk membuat peningkatan kecil untuk.nc3 untuk menangani masalah ini dan terkait, mengutip.nc4 Artikel (perubahan utama) sebagai solusi.
* Spesifikasi CF (sebelum v1.9) mengatakan itu mendukung jenis data char tetapi tidak jelas jika char dimaksudkan hanya sebagai blok bangunan array char, yang secara efektif String. Pertanyaan ke daftar surat mereka hanya menghasilkan jawaban yang membingungkan. Karena komplikasi ini, yang terbaik untuk menghindari variabel char diERDDAP™dan menggunakan variabel String setiap kali mungkin.
* Sitemap.nc3 file hanya didukung string dengan ASCII-encoded (7-bit, #0 - #12) karakter. Login (LoginERDDAP) memanjang (Sitemap) dengan menyertakan atribut "\\_Encoding" dengan nilai "ISO-8859-1" (ekstensi ASCII yang mendefinisikan semua nilai 256 dari setiap karakter 8-bit) atau "UTF-8" untuk menunjukkan bagaimana data String dikodekan. Pengkodean lain mungkin legal tetapi tidak berdiskusi.
         
#### .nc4 file{#nc4-files} 
*   .nc4 file mendukung semuaERDDAP's jenis data.
    
#### file NCCSV{#nccsv-files} 
file NCCSV 1.0 tidak mendukung jenis data yang tidak ditentukan.
[KCP 1.1+ file](/docs/user/nccsv-1.00)mendukung semua jenis data integer yang tidak ditugaskan.
     
#### DAP {#dap} 
*   (OPeN)DAP  (.das, .dds, .asc ASCII file, dan .dods biner file) Login
    *   (OPeN)DAPpegangan pendek, ushort, int, uint, mengapung dan nilai ganda dengan benar.
    *   (OPeN)DAPmemiliki "byte" jenis data yang mendefinisikan sebagai tidak ditetapkan, sedangkan historis, THREDDS danERDDAP™telah memperlakukan "byte" sebagai tanda tangan(OPeN)DAPSitemap Berurusan dengan ini lebih baik,ERDDAP™2.10+ mengikuti standar NUG dan selalu menambahkan atribut "\\_Unsigned" dengan nilai "true" atau "false" untuk menunjukkan apakah data adalah apaERDDAP™Sitemap Semua atribut byte dan ubyte ditulis sebagai atribut "byte" dengan nilai yang ditandatangani (misalnya, ubyteactual\\_rangeatribut dengan nilai 0 ke 255, muncul sebagai atribut byte dengan nilai 0 ke -1 (kebalikan dari dua nilai pelengkap nilai out-of-range). Tidak ada cara mudah untuk mengetahui atribut "byte" mana yang harus dibaca sebagai atribut ubyte.
    *   (OPeN)DAPtidak mendukung panjang yang ditandatangani atau tidak ditentukan.ERDDAP™penawaran dengan ini dengan konversi sementara mereka menjadi variabel ganda dan atribut. Ganda dapat mewakili semua nilai hingga 9,007,199,254,740,992 yang 2^53. Ini adalah solusi yang sempurna.OPeNDAP  (organisasi) menolak untuk membuat peningkatan kecil untukDAP2.0 untuk menangani masalah ini dan terkait, mengutipDAP4 Artikel (perubahan utama) sebagai solusi.
    * Sitemap(OPeN)DAPtidak memiliki jenis data char yang terpisah dan hanya mendukung karakter ASCII 1-byte (#0 - #12) dalam Strings, variabel data char akan muncul sebagai 1-character-long Strings dalam(OPeN)DAP.das, .dds, dan .dods tanggapan.
    * Teknis,(OPeN)DAPspesifikasi hanya mendukung string dengan karakter ASCII-encoded (#0 - #12) Sitemap Login (LoginERDDAP) memanjang (Sitemap) dengan menyertakan atribut "\\_Encoding" dengan nilai "ISO-8859-1" (ekstensi ASCII yang mendefinisikan semua nilai 256 dari setiap karakter 8-bit) atau "UTF-8" untuk menunjukkan bagaimana data String dikodekan. Pengkodean lain mungkin legal tetapi tidak berdiskusi.
         
### Data Type Komentar{#data-type-comments} 
* Karena dukungan yang buruk untuk data yang panjang, ulong, dan char dalam banyak jenis file, kami mengumpulkan penggunaan jenis data iniERDDAPSitemap Bila memungkinkan, gunakan dua kali lipat dan ulong, dan gunakan String bukan char.
     
* Metadata(OPeN)DAP's .das dan .dds tanggapan tidak mendukung atribut panjang atau ulong atau jenis data (dan bukan menunjukkan mereka sebagai ganda) , Anda mungkin tidak ingin menggunakanERDDAPrepresentasi tabular metadata seperti yang terlihat dihttpLogin **Sitemap** Sitemap *datasetID* .html halaman web (Sitemap[ https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html) )   (yang Anda juga bisa mendapatkan dalam jenis file lain, misalnya, .csv,.htmlTableLogin.itxLogin.jsonLogin.jsonlCSV1Login.jsonlCSVLogin.jsonlKVPLogin.matLogin.ncLogin.nccsvLogin.tsvLogin.xhtml) atau.nccsvMetadata (Sitemap[ https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata)Login.nccsvMetadata hanya tersedia untuk set data tabel) keduanya mendukung semua jenis data (ulong, panjang, ulong, dan char) Sitemap
         
### Database{#media-files} 
Tidak semua data adalah array dari angka atau teks. Beberapa dataset terdiri dari atau menyertakan file media, seperti gambar, file audio dan video.ERDDAP™memiliki beberapa fitur khusus untuk memudahkan pengguna mendapatkan akses ke file media. Ini adalah proses dua langkah:
 

1. Membuat setiap file yang dapat diakses melalui URL sendiri, melalui sistem yang mendukung permintaan rentang byte.
Cara termudah untuk melakukan ini adalah untuk menempatkan file di direktori yangERDDAP™memiliki akses ke. (Jika mereka dalam wadah seperti.zipfile, unzip mereka, meskipun Anda mungkin ingin menawarkan.zipfile ke pengguna juga.) Kemudian, buat[Login](#eddtablefromfilenames)dataset untuk membuat file yang dapat diakses melaluiERDDAP™SitemapERDDAPSitemap["files"sistem](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)Sitemap
    
Semua file yang dapat diakses melalui EDDTableDariFileNames danERDDAPSitemap"files"dukungan sistem[permintaan rentang byte](https://en.wikipedia.org/wiki/Byte_serving)Sitemap Biasanya, ketika klien (Sitemap) membuat permintaan ke URL, itu mendapatkan seluruh file sebagai respons. Tapi dengan permintaan rentang byte, permintaan menentukan berbagai byte dari file, dan server hanya mengembalikan byte tersebut. Ini relevan di sini karena pemain audio dan video di browser hanya bekerja jika file dapat diakses melalui permintaan rentang byte.
    
opsional: Jika Anda memiliki lebih dari satu dataset dengan file media terkait, Anda dapat membuat hanya satu EDDTableDariFileNames yang memiliki subfolder untuk setiap kelompok file. Keuntungannya adalah bahwa ketika Anda ingin menambahkan file media baru untuk dataset baru, semua yang harus Anda lakukan adalah membuat folder baru dan menempatkan file di folder itu. Folder dan file akan secara otomatis ditambahkan ke dataset EDDTableDariFileNames.
    
2. opsional: Jika Anda memiliki dataset yang mencakup referensi ke file media, tambahkan keERDDAPSitemap
Misalnya, Anda mungkin memiliki file .csv dengan baris untuk setiap kali seseorang melihat paus dan kolom yang mencakup nama file gambar yang terkait dengan penglihatan itu. Jika nama file gambar hanyalah nama file, misalnya, Img20141024T192403Z, bukan URL penuh, maka Anda perlu menambahkan[Login WordPress.org](#fileaccessbaseurl)atribut untuk metadata untuk itudataVariableyang menentukan baseURL dan suffix untuk nama file tersebut. Jika Anda membuat file yang dapat diakses melalui EDDTableDariFileNames, URL akan dalam bentuk
     *Login* WordPress.org *datasetID* Sitemap
Sitemap
```
        <att name="fileAccessBaseUrl">*someBaseURL*</a>  
        <att name="fileAccessSuffix">.png</a>
```
        
Jika ada.zipatau file kontainer lainnya dengan semua file media yang terkait dengan variabel data, kami sarankan Anda juga membuat file yang dapat diakses oleh pengguna (melihat langkah 1 di atas) dan kemudian mengidentifikasinya dengan[Login Sitemap](#fileaccessarchiveurl)Login
    

\\[SitemapERDDAP™g\\]Jika Anda melakukan langkah pertama di atas (atau kedua langkah) , maka ketika pengguna melihat Meme itERDDAP™ "files"sistem untuk dataset (atau meminta untuk melihat subset dataset melalui.htmlTablepermintaan, jika Anda melakukan langkah kedua) LoginERDDAP™akan menunjukkan ikon '?' ke kiri nama file. Jika pengguna memikat ikon itu, mereka akan melihat popup menunjukkan gambar, atau pemutar audio, atau pemutar video. Browser hanya mendukung sejumlah jenis terbatas

* Login (biasanya .gif, .jpg, dan .png) Login
* Login (biasanya .mp3, .ogg, dan .wav) Sitemap
* file video (biasanya .mp4, .ogv, dan . Login) Sitemap

Dukungan bervariasi dengan versi browser yang berbeda pada sistem operasi yang berbeda. Jadi jika Anda memiliki pilihan jenis file yang ditawarkan, masuk akal untuk menawarkan jenis ini.

Atau, jika pengguna mengklik nama file yang ditampilkan padaERDDAP™halaman web, browser mereka akan menunjukkan gambar, file audio atau video sebagai halaman web terpisah. Ini sebagian besar berguna untuk melihat gambar yang sangat besar atau video berskala ke layar penuh, bukan dalam popup.
    
### AWS S3 File{#working-with-aws-s3-files} 
[Layanan Web Amazon (Login) ](https://aws.amazon.com)adalah penjual[komputasi awan](https://en.wikipedia.org/wiki/Cloud_computing)Sitemap[S3](https://aws.amazon.com/s3/)adalah sistem penyimpanan objek yang ditawarkan oleh AWS. Alih-alih sistem hirarkis dan file dari sistem file tradisional (seperti hard drive di PC Anda) S3 menawarkan hanya "bucket" yang memegang "objects" (kita akan memanggil mereka Meme it"files") Sitemap

Untuk file ASCII (Sitemap) LoginERDDAP™dapat bekerja dengan file di ember secara langsung. Satu-satunya hal yang perlu Anda lakukan adalah menentukan&lt;fileDir&gt; untuk dataset menggunakan format spesifik untuk ember AWS, misalnya, https://*bucketName*.s3.*aws-region*.amazonaws.com/*subdirectory*/ Sitemap Anda tidak boleh menggunakan&lt;Login Lihat di bawah ini untuk rincian.

Tapi untuk file biner (Login.nc.grib, .bufr, dan.hdfLogin) Anda perlu menggunakan&lt;cacheDariUrl&gt; sistem yang dijelaskan di bawah ini.ERDDAPnetcdf-java (SitemapERDDAP™menggunakan untuk membaca data dari file-file ini) Perangkat lunak data ilmiah lainnya dirancang untuk bekerja dengan file dalam sistem file tradisional yang menawarkan[tingkat blok](https://en.wikipedia.org/wiki/Block-level_storage)akses ke file (yang memungkinkan membaca chunks file) S3[Database (Login) ](https://en.wikipedia.org/wiki/Block-level_storage)akses ke file (yang hanya mengizinkan membaca seluruh file) Sitemap AWS menawarkan alternatif untuk S3,[Toko Blok Elastis (Login) ](https://aws.amazon.com/ebs/)), yang mendukung akses tingkat blok ke file tetapi lebih mahal daripada S3, sehingga jarang digunakan untuk penyimpanan massal dari sejumlah besar file data. (Jadi ketika orang mengatakan menyimpan data di cloud (S3) murah, biasanya apel untuk perbandingan jeruk.) 

#### S3 Bucket{#s3-buckets} 
 **Konten Bucket. Login Objek. Delimiter.**   
Secara teknis, ember S3 tidak diatur dalam struktur file hirarkis seperti sistem file pada komputer. Sebaliknya, ember hanya mengandung "objects" (Login) , masing-masing yang memiliki "kunci" (nama) Sitemap Contoh kunci dalam ember noaa-goes17 adalah

```
ABI-L1b-RadC/2019/235/22/OR\\_ABI-L1b-RadC-M6C01\\_G17\\_s20192352201196\\_e20192352203569\\_c20192352204013.nc
```
URl yang sesuai untuk objek itu

[ https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/2019/235/22/OR\\_ABI-L1b-RadC-M6C01\\_G17\\_s20192352201196\\_e20192352203569\\_c20192352204013.nc ](https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/2019/235/22/OR_ABI-L1b-RadC-M6C01_G17_s20192352201196_e20192352203569_c20192352204013.nc)

AWS mendukung sedikit variasi dalam bagaimana URL itu dibangun, tetapiERDDAP™membutuhkan satu format khusus ini:
   https://*bucketName*.s3.*region*.amazonaws.com/*key*   
Ini adalah praktik umum, seperti contoh ini, untuk membuat nama kunci terlihat seperti jalur hirarkis ditambah nama file, tetapi secara teknis mereka tidak. Karena itu umum dan berguna,ERDDAP™memperlakukan kunci dengan /'s seolah-olah mereka adalah jalur hirarkis ditambah nama file, dan dokumentasi ini akan merujuk kepada mereka seperti itu. Jika kunci bucket tidak menggunakan /'s (misalnya, kunci seperti
ABI-Lib.2018.052.22.OR\\_ABI-L1b-RadM2-M3C10\\_G16\\_s20180522247575), kemudianERDDAP™hanya akan memperlakukan seluruh kunci sebagai nama file yang panjang.

Bucket Pribadi vs Publik Login Administrator untuk ember S3 dapat membuat ember dan kontennya publik atau pribadi. Jika publik, setiap file di ember dapat diunduh oleh siapa pun menggunakan URL untuk file. Amazon memiliki[Data Terbuka](https://aws.amazon.com/opendata/)program yang menghosting dataset publik (termasuk dataNOAA, NASA, dan USGS) gratis dan tidak mengenakan biaya bagi siapa pun untuk mengunduh file dari ember tersebut. Jika ember pribadi, file di ember hanya dapat diakses oleh pengguna resmi dan biaya AWS (biasanya dibayar oleh pemilik bucket) untuk mengunduh file ke komputer non-AWS S3.ERDDAP™dapat bekerja dengan data di ember publik dan pribadi.

#### AWS Credentials{#aws-credentials} 
Untuk membuatnya sehingga Meme itERDDAP™dapat membaca isi ember pribadi, Anda perlu kredensial AWS dan Anda perlu menyimpan file kredensial di tempat standar sehinggaERDDAP™dapat menemukan informasi. Lihat AWS SDK untukJava2.x dokumentasi:[Mengatur kredensial default](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/setup.html#setup-credentials)Sitemap (Pilihan untuk menyimpan nilai-nilai sebagaiJavaparameter baris perintah dalam\\[Login\\]/bin/setenv.sh mungkin menjadi pilihan yang baik.) 
#### AWS/file/{#aws-files} 
* Login LoginERDDAP™ [Login](#accessibleviafiles)memungkinkan pengguna untuk mengunduh file sumber untuk dataset. Kami menyarankan Anda mengubah ini untuk semua dataset dengan file sumber karena banyak pengguna ingin mengunduh file sumber asli.
    * Jika file berada dalam ember S3 pribadi, permintaan pengguna untuk mengunduh file akan ditangani olehERDDAP™, yang akan membaca data dari file dan kemudian mengirimkannya ke pengguna, sehingga meningkatkan beban pada AndaERDDAP™, menggunakan bandwidth masuk dan keluar, dan membuat Anda (LoginERDDAP™Login) membayar biaya egress data ke AWS.
    * Jika file berada dalam ember S3 publik, permintaan pengguna untuk mengunduh file akan diarahkan ke URL AWS S3 untuk file itu, sehingga data tidak akan mengalir melaluiERDDAP™sehingga mengurangi beban padaERDDAPSitemap Dan jika file dalam Amazon Open Data (gratis) ember publik, kemudian Anda (LoginERDDAP™Login) tidak perlu membayar biaya egress data ke AWS. Jadi, ada keuntungan besar yang melayani data dari publik (Sitemap) S3 bucket, dan keuntungan besar untuk melayani data dari Amazon Open Data (gratis) Login

#### ERDDAP™dan Bucket AWS S3{#erddap-and-aws-s3-buckets} 
[ **ERDDAP™dan Bucket AWS S3** ](#erddap-and-aws-s3-buckets)  
Untungnya, setelah banyak usaha,ERDDAP™memiliki sejumlah fitur yang memungkinkan untuk menangani masalah yang melekat bekerja dengan akses tingkat blok S3 ke file dengan cara yang cukup efisien:

*   \\[Sitemap Bekerja dengan ember AWS S3 adalah banyak pekerjaan tambahan. AWS adalah ekosistem besar layanan dan fitur. Ada banyak untuk belajar. Dibutuhkan waktu dan usaha, tetapi dapat dilakukan. Menjadi pasien dan Anda akan mendapatkan hal-hal yang bekerja. Look/ask untuk membantu
Sitemap[Dokumentasi AWS](https://aws.amazon.com/documentation/gettingstarted/)situs web seperti[Sitemap](https://stackoverflow.com/)Sitemap
    [ERDDAP™opsi dukungan](/docs/intro#support)) jika / ketika Anda terjebak.\\]  
     
* Hal ini dapat sulit untuk bahkan mengetahui struktur direktori dan nama file dari file dalam ember S3.ERDDAP™memiliki solusi untuk masalah ini: EDDTableDariFileNames memiliki khusus[\\*\\*Sitemap](#fromonthefly)opsi yang memungkinkan Anda membuat dataset EDDTableFromFileNames yang memungkinkan pengguna untuk menelusuri konten bucket S3 (dan mengunduh file) melalui dataset"files"Login Sitemap[contoh ini di bawah ini](#viewing-the-contents-of-a-bucket)Sitemap
     
*   ERDDAP™dapat membaca data dari[file data terkompresi secara eksternal](#externally-compressed-files), jadi halus jika file di S3 disimpan sebagai.gzLogin.gzipLogin.bz2, .Z, atau jenis file data terkompresi eksternal, yang dapat secara dramatis (2 - 20X) dipotong pada biaya penyimpanan file. seringkali tidak ada hukuman waktu untuk menggunakan file terkompresi secara eksternal, karena waktu yang disimpan dengan mentransfer file yang lebih kecil dari S3 keERDDAPkira-kira menyeimbangkan waktu tambahan yang diperlukan untukERDDAP™untuk menghapus file. Untuk menggunakan fitur ini, Anda hanya perlu memastikan bahwa dataset&lt;fileNameRegex&gt; memungkinkan untuk jenis file terkompresi (Sitemap (|.gz) ke ujung regex) Sitemap
     
* Untuk kasus yang paling umum, di mana Anda memilikiERDDAP™diinstal pada PC Anda untuk menguji / pengembangan dan di mana dataset memiliki file data biner yang disimpan sebagai objek dalam ember S3, satu pendekatan untuk mendapatkan dataset dalamERDDAP™Sitemap
    1. Buat direktori di PC Anda untuk menyimpan beberapa file data uji.
    2. Unduh dua file data dari sumber ke direktori yang Anda buat.
    3. Sitemap[Login](#generatedatasetsxml)untuk menghasilkan chunkdatasets.xmluntuk dataset berdasarkan dua file data lokal.
    4. Periksa bahwa dataset bekerja seperti yang diinginkan[Login](#dasdds)dan/atau lokal AndaERDDAPSitemap
        
         **Langkah-langkah berikut membuat salinan dataset (yang akan mendapatkan data dari ember S3) publikERDDAPSitemap** 
        
    5. Salin chunk daridatasets.xmluntuk dataset ke datadatasets.xmluntuk publikERDDAP™yang akan melayani data.
    6. Buat direktori di publikERDDAP's hard drive lokal untuk menyimpan cache file sementara. Direktori tidak akan menggunakan banyak ruang disk (lihat cacheSizeGB di bawah ini) Sitemap
    7. Mengubah nilai dataset&lt;fileDir&gt; tag sehingga poin ke direktori yang Anda buat (meskipun direktori kosong) Sitemap
    8. Sitemap[Login](#cachefromurl)tag yang menentukan nama ember dataset dan prefix opsional (i.e., direktori) Sitemap[Aws S3 URL FormatERDDAP™Login](#accessing-files-in-an-aws-s3-bucket)Sitemap
    9. Promo&lt;Login (Login) xml dataset (e.g., 10 adalah nilai yang baik untuk sebagian besar dataset) SitemapERDDAP™untuk membatasi ukuran cache lokal (i.e., jangan mencoba untuk melihat semua file jarak jauh) Sitemap
    10. Lihat apakah itu bekerja di publikERDDAPSitemap Perhatikan bahwa pertama kaliERDDAP™memuat dataset, akan memakan waktu lama untuk memuat, karenaERDDAP™perlu mengunduh dan membaca semua file data.
        
Jika dataset adalah koleksi besar file data gridded besar, ini akan memakan waktu yang sangat lama dan tidak praktis. Dalam beberapa kasus, untuk file data gridded,ERDDAP™dapat mengekstrak informasi yang diperlukan (e.g., titik waktu untuk data dalam file data gridded) dari nama file dan menghindari masalah ini. Sitemap[Sitemap Nama file](#aggregation-via-file-names-or-global-metadata)Sitemap
        
    11. Sitemap (tapi terutama untuk EDDTableDariFiles dataset) Anda dapat menambahkan[Login](#nthreads)tag ke dataset untuk memberitahukanERDDAPuntuk menggunakan lebih dari 1 benang ketika menanggapi permintaan pengguna untuk data. Ini meminimalkan efek penundaan yang terjadi ketikaERDDAP™membaca file data dari (Login) AWS S3 ember ke cache lokal dan (Sitemap) mendekompresi mereka.

#### AWS S3 Data Terbuka{#aws-s3-open-data} 
Sebagai bagianNOAASitemap[Program Data Besar](https://www.noaa.gov/nodd/about)LoginNOAAmemiliki kemitraan dengan lima organisasi, termasuk AWS, "untuk menjelajahi potensi manfaat menyimpan salinan pengamatan kunci dan output model di Cloud untuk memungkinkan komputasi langsung pada data tanpa memerlukan distribusi lebih lanjut". AWS termasuk dataset itu mendapat dari Meme itNOAAsebagai bagian dari programnya untuk menawarkan akses publik ke koleksi besar[Data Terbuka di AWS S3](https://registry.opendata.aws/)dari komputer apa pun, apakah itu adalah instance Amazon compute (komputer sewa) di jaringan AWS atau PC Anda sendiri di jaringan apa pun. Contoh di bawah ini mengasumsikan Anda bekerja dengan dataset yang dapat diakses secara publik.

#### File Accessing di Bucket AWS S3{#accessing-files-in-an-aws-s3-bucket} 
Untuk ember data S3 pribadi, pemilik bucket harus memberi Anda akses ke ember. (Lihat dokumentasi AWS.) 

Dalam semua kasus, Anda akan membutuhkan akun AWS karena AWS SDK untukJava  (SitemapERDDAP™menggunakan untuk mengambil informasi tentang isi ember) membutuhkan kredensial akun AWS. (lebih banyak di bawah ini) 

ERDDAP™hanya dapat mengakses ember AWS S3 jika Anda menentukan [&lt;Login (Login) Login&lt;fileDir&gt;) dalam format tertentu:
 https://*bucketName*.s3.*aws-region*.amazonaws.com/*prefix/*   
Sitemap

* emberName adalah bentuk singkat dari nama ember, misalnya noaaaa-goes17.
* Aws-region, misalnya, kita-east-1, adalah dari kolom "Region" di salah satu tabel[Layanan AWS Endpoints](https://docs.aws.amazon.com/general/latest/gr/rande.html)di mana bucket sebenarnya terletak. Meme it
* Prefix adalah opsional. Jika ada, itu harus berakhir dengan Meme it'/'Sitemap

Sitemap https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/   
Format URL ini adalah salah satu rekomendasi AWS S3: lihat[Mengakses Bucket](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucket.html)Login[deskripsi ini dari awalan](https://docs.aws.amazon.com/AmazonS3/latest/dev/ListingKeysHierarchy.html)SitemapERDDAP™mengharuskan Anda menggabungkan URL ember dan prefiks opsional ke satu URL untuk menentukan&lt;cacheDariUrl&gt; (atau&lt;fileDir&gt;) di mana file berada.

#### Uji Public AWS S3 Buckets{#test-public-aws-s3-buckets} 
Untuk ember publik, Anda dapat dan harus menguji URL ember dari direktori AWS S3 di browser Anda, misalnya,
[ https://noaa-goes17.s3.us-east-1.amazonaws.com ](https://noaa-goes17.s3.us-east-1.amazonaws.com)Jika URL ember benar dan tepat untukERDDAP, itu akan mengembalikan dokumen XML yang memiliki (Login) daftar konten ember itu. Sayangnya, URL penuh (i.e., URL bucket ditambah awal) LoginERDDAP™ingin dataset yang diberikan tidak berfungsi di browser. AWS tidak menawarkan sistem untuk menelusuri hirarki bucket dengan mudah di browser Anda. (Jika itu salah, silakan email Chris. John di noaaa.gov. Jika tidak, Amazon, tambahkan dukungan untuk ini&#33;) 

#### Melihat Konten Bucket{#viewing-the-contents-of-a-bucket} 
S3 bucket sering mengandung beberapa kategori file, dalam beberapa subdirectories pseudo, yang bisa menjadi beberapa dariERDDAP™Login Untuk membuatERDDAP™dataset, Anda perlu tahu direktori awal untuk&lt;cacheDariUrl&gt; (atau&lt;fileDir&gt;) dan format nama file yang mengidentifikasi bahwa subset file. Jika Anda mencoba untuk melihat seluruh konten ember di browser, S3 hanya akan menunjukkan Anda 1000 file pertama, yang tidak mencukupi. Saat ini, cara terbaik bagi Anda untuk melihat semua konten ember adalah membuat[Login](#eddtablefromfilenames)Login (di PC AndaERDDAP™dan/atau di publik AndaERDDAP) , yang juga memberi Anda cara mudah untuk menelusuri struktur direktori dan mengunduh file. Login&lt;fileDir&gt; yang akan menjadi URL yang Anda buat di atas, misalnya, https://noaa-goes17.s3.us-east-1.amazonaws.com Sitemap\\[Mengapa AWS S3 menawarkan cara cepat dan mudah bagi siapa pun untuk melakukan ini tanpa akun AWS?\\]Perhatikan bahwa ketika saya melakukan ini di PC saya di jaringan non-Amazon, tampaknya Amazon memperlambat respons terhadap trik (100 g (Sitemap) file per chunk) setelah beberapa chunks pertama (dari 1000 file per chunk) didownload. Karena ember mungkin memiliki sejumlah besar file (noaa-goes17 memiliki 26 juta) , mendapatkan semua konten ember dapat mengambil EDDTableDariFileNames beberapa jam (g., 12&#33;) Sitemap\\[Amazon, adalah hak?&#33;\\]

#### Membuat EDDTable DariFileNames Dataset dengan Bucket AWS S3{#making-an-eddtablefromfilenames-dataset-with-an-aws-s3-bucket} 
Jika Anda memiliki nama ember, tetapi belum memiliki daftar file di ember S3 atau awalan yang mengidentifikasi lokasi file yang relevan di ember, gunakan instruksi di bawah ini untuk membuat dataset EDDTableDariFileNames sehingga Anda dapat menjelajahi hierarki direktori dari ember S3 melaluiERDDAPSitemap"files"sistem.

1. Buka Akun AWS
    ERDDAP™menggunakan[AWS SDKJava](https://docs.aws.amazon.com/sdk-for-java/index.html)untuk mendapatkan informasi ember dari AWS, sehingga Anda perlu untuk[membuat dan mengaktifkan akun AWS](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/)Sitemap Itu pekerjaan yang cukup besar, dengan banyak hal untuk belajar.
     
2. Masukkan AWS Credentials Anda di manaERDDAP™dapat menemukan mereka. Meme it
Ikuti petunjuk di[Mengatur AWS Credentials dan Wilayah untuk Pembangunan](https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/setup.html#setup-credentials)SitemapERDDAP™  (spesifik, AWS SDK untukJava) akan dapat menemukan dan menggunakan kredensial AWS Anda. SitemapERDDAP™tidak dapat menemukan kredensial, Anda akan melihat Meme it
Login IllegalArgumentException: file profil tidak bisa menjadi kesalahan null dalamERDDAP's file log.txt.
    
Hint untuk Linux dan Mac OS: file kredensial harus berada di direktori rumah pengguna yang menjalankan Tomcat (LoginERDDAP)   (untuk paragraf ini, kita akan mengasumsikan pengguna=tomcat) dalam file yang disebut ~/.aws/credentials. Jangan berasumsi bahwa ~ adalah /home/tomcat -- sebenarnya menggunakan cd ~ untuk mengetahui di mana sistem operasi berpikir ~ untuk pengguna=tomcat adalah. Buat direktori jika tidak ada. Juga, setelah Anda menempatkan file credentials di tempat, pastikan pengguna dan kelompok untuk file adalah tomcat dan kemudian gunakan kredensial chmod 400 untuk memastikan file dibaca-hanya untuk pengguna=tomcat.
    
3. Buat URL ember di[format yangERDDAP™Login](#accessing-files-in-an-aws-s3-bucket)Sitemap
    [ https://noaa-goes17.s3.us-east-1.amazonaws.com ](https://noaa-goes17.s3.us-east-1.amazonaws.com)Sitemap (untuk ember publik) mengujinya di browser untuk memastikan kembali dokumen XML yang memiliki daftar parsial dari ember itu.
     
4. Sitemap[Login](#generatedatasetsxml)untuk membuat[Login](#eddtablefromfilenames)Sitemap
    * Untuk direktori Start, gunakan sintaks ini:
        \\*\\*Login *Login* Login
Sitemap
        \\*\\*Login https://noaa-goes17.s3.us-east-1.amazonaws.com/
 
    * Nama file regex? Login
    * Recursif? Login
    * Login Login 100 g
    *   infoUrlSitemap https://registry.opendata.aws/noaa-goes/
 
    * LoginNOAA
    * Sitemap Sitemap (ERDDAP™akan membuat ringkasan yang layak secara otomatis.) 
    * Login Sitemap (ERDDAP™akan membuat judul yang layak secara otomatis.) Seperti biasa, Anda harus mengedit XML yang dihasilkan untuk memverifikasi kebenaran dan membuat perbaikan sebelum chunk dataset menggunakannya dalamdatasets.xmlSitemap
5. Jika Anda mengikuti instruksi di atas dan memuat dataset diERDDAP, Anda telah membuat dataset EDDTableDariFiles. Sebagai contoh, dan untuk memudahkan siapa pun untuk menelusuri dan mengunduh file dari ember Data Terbuka AWS, kami telah menciptakan dataset EDDTableDariFileNames (lihat daftar di
    [ https://upwell.pfeg.noaa.gov/erddap/search/index.html?searchFor=awsS3Files\\_ ](https://upwell.pfeg.noaa.gov/erddap/search/index.html?searchFor=awsS3Files_)) untuk hampir semua Meme it[AWS S3 Open Data ember](https://registry.opendata.aws/)Sitemap
    \\[Beberapa ember yang kita tidak termasuk memiliki sejumlah besar file di direktori akar (lebih dari dapat diunduh dalam waktu yang wajar) atau tidak mengizinkan akses publik (tidak mereka semua seharusnya menjadi publik?) , atau adalah ember Pays (Sitemap) Sitemap\\]  
Jika Anda mengklik"files"tautan untuk salah satu set data ini, Anda dapat menjelajahi pohon direktori dan file di ember S3. Karena cara\\*\\*\\ * DariOnTheFly EDDTableDariFiles bekerja, daftar direktori ini selalu sangat up-to-date karenaERDDAP™mendapatkan mereka on-the-fly. Meme it Jika Anda mengklik pohon direktori ke nama file yang sebenarnya dan klik pada nama file,ERDDAP™akan mengarahkan permintaan Anda ke AWS S3 sehingga Anda dapat mengunduh file langsung dari AWS. Anda kemudian dapat memeriksa file tersebut.
    
Login
Jika EDDTableDariFiles tidak akan memuatERDDAP™  (Sitemap) , lihat file log.txt untuk pesan kesalahan. Jika Anda melihat
Login IllegalArgumentException: file profil tidak bisa mati, masalahnya adalah bahwa SDK AWS untukJava  (digunakan olehERDDAP) tidak menemukan file kredensial. Lihat petunjuk kredensial di atas.
     

Tidak hanya mengizinkan orang untuk menggunakan browser untuk melihat isi ember publik.

 **Kemudian Anda dapat membuatERDDAP™dataset yang memberi pengguna akses ke data dalam file.**   
Lihat petunjuk[ERDDAP™dan S3 Buckets](#erddap-and-aws-s3-buckets)  (Sitemap) Sitemap
Untuk sampel EDDTableDariFileNames dataset yang Anda buat di atas, jika Anda melakukan sedikit berdering di sekitar dengan direktori dan nama file di pohon direktori, itu menjadi jelas bahwa nama direktori tingkat atas (ABI-L1b-RadC) sesuai dengan apaERDDAP™akan memanggil dataset terpisah. Bucket yang Anda kerjakan dengan mungkin sama. Anda kemudian bisa mengejar membuat set data terpisah di Meme itERDDAP™untuk setiap dataset, menggunakan, misalnya,
 https://noaa-goes17.s3.us-east-1.amazonaws.com/ABI-L1b-RadC/   
Sitemap&lt;Login Sayangnya, untuk contoh tertentu ini, dataset di ember semua tampaknya tingkat 1 atau tingkat 2 dataset, yangERDDAP™ [tidak terlalu baik di Meme it](#dimensions), karena dataset adalah koleksi variabel yang lebih rumit yang menggunakan dimensi yang berbeda.
     
    
### NcML file{#ncml-files} 
File NcML memungkinkan Anda menentukan perubahan on-the-fly ke satu atau lebih sumber asliNetCDF  (v3 atau v4)  .nc.grib, .bufr, atau.hdf  (v4 atau v5) file, dan kemudian memilikiERDDAP™Login.ncfile gERDDAP™dataset akan menerima.ncg.ncfile yang diharapkan. File NcML MUST memiliki ekstensi.ncg. Sitemap[UnidataDokumentasi NcML](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/ncml_overview.html)Sitemap NcML berguna karena Anda dapat melakukan beberapa hal dengan Meme it (misalnya, membuat perubahan yang berbeda pada file yang berbeda dalam koleksi, termasuk menambahkan dimensi dengan nilai spesifik ke file) Anda tidak bisa melakukannyaERDDAPSitemapdatasets.xmlSitemap

* Perubahan pada.ncwaktu yang terakhir dimodernisasi file klima akan menyebabkan file yang akan diisi ulang kapan pun dataset dimuat ulang, tetapi perubahan ke bawah.ncfile data tidak akan langsung diperhatikan.
* Login\\*Sitemap\\*sensitif terhadap urutan beberapa item dalam file NcML. Pikirkan NcML sebagai menentukan serangkaian instruksi dalam urutan yang ditentukan, dengan niat mengubah file sumber (negara di awal / atas file NcML) ke dalam file tujuan (status pada akhir/bottom file NcML) Sitemap

Alternatif untuk NcML adalah[NetCDFLogin (NCO) ](#netcdf-operators-nco)Sitemap Perbedaan besar adalah NcML adalah sistem untuk membuat perubahan on-the-fly (sehingga file sumber tidak diubah) SitemapNCOdapat digunakan untuk membuat perubahan (atau versi baru) file. SitemapNCOdan NcML sangat fleksibel dan memungkinkan Anda untuk membuat hampir semua perubahan yang dapat Anda pikirkan ke file. Untuk keduanya, itu dapat menantang untuk mengetahui persis bagaimana melakukan apa yang ingin Anda lakukan -- periksa web misalnya serupa. Kedua alat yang berguna untuk menyiapkan netCDF danHDFfile untuk digunakan denganERDDAPtidak bisa, untuk membuat perubahan di luar apaERDDAPSistem manipulasi dapat dilakukan.

Contoh #1: Menambahkan Dimensi Waktu dengan Nilai Tunggal
Sitemap.ncfile ml yang menciptakan dimensi luar baru (waktu, dengan 1 nilai: 1041379200) dan menambahkan dimensi ke variabel pic dalam file bernama A2003001.L3m\\_DAY\\_PIC\\_pic\\_4km.ncSitemap
```
    <netcdf xmlns='https://www.unidata.ucar.edu/namespaces/netcdf/ncml-2.2'>
      <variable name='time' type='int' shape='time' />
      <aggregation dimName='time' type='joinNew'>
        <variableAgg name='pic'/>
        <netcdf location='A2003001.L3m\\_DAY\\_PIC\\_pic\\_4km.nc' coordValue='1041379200'/>
      </aggregation>
    </netcdf>
```
Contoh #2: Mengubah Nilai Waktu yang Ada
Terkadang sumber.ncfile sudah memiliki dimensi waktu dan nilai waktu, tetapi nilainya tidak benar (untuk tujuan Anda) Sitemap Sitemap.ncfile ml mengatakan: untuk file data bernama ""19810825230030-NCEI ...", untuk variabel dimensi"time"set atribut unit menjadi 'detik sejak 1970-01T00:00Z' dan menetapkan nilai waktu menjadi 367588800.
```
    <netcdf xmlns='https://www.unidata.ucar.edu/namespaces/netcdf/ncml-2.2'
      location="19810825230030-NCEI-L3C\\_GHRSST-SSTskin-AVHRR\\_Pathfinder-PFV5.3\\_NOAA07\\_G\\_1981237\\_day-v02.0-fv01.0.nc">
      <variable name="time">
        <attribute name='units' value='seconds since 1970-01-01T00:00:00Z' />
        <values>367588800</values>
      </variable>
    </netcdf>
```
### NetCDFLogin (NCO)  {#netcdf-operators-nco} 
"The netCDF Operator (NCO) terdiri dari program dozen standalone, command-line yang mengambil netCDF\\[v3 atau v4\\]LoginHDF \\[v4 atau v5\\]Login\\[Login\\]dan/atauDAPfile sebagai input, kemudian beroperasi (e.g., data baru derive, statistik compute, cetak, hiperslab, manipulate metadata) dan output hasilnya ke layar atau file dalam format teks, biner, atau netCDF.NCOmembantu analisis data ilmiah gridded. Gaya shell-kommandNCOmemungkinkan pengguna untuk memanipulasi dan menganalisis file secara interaktif, atau dengan skrip ekspresif yang menghindari beberapa overhead lingkungan pemrograman tingkat tinggi." (dari[NCO](https://nco.sourceforge.net/)Login) Sitemap

Alternatif untukNCOSitemap[Login](#ncml-files)Sitemap Perbedaan besar adalah NcML adalah sistem untuk membuat perubahan on-the-fly (sehingga file sumber tidak diubah) SitemapNCOdapat digunakan untuk membuat perubahan (atau versi baru) file. SitemapNCOdan NcML sangat fleksibel dan memungkinkan Anda untuk membuat hampir semua perubahan yang dapat Anda pikirkan ke file. Untuk keduanya, itu dapat menantang untuk mengetahui persis bagaimana melakukan apa yang ingin Anda lakukan -- periksa web misalnya serupa. Kedua alat yang berguna untuk menyiapkan netCDF danHDFfile untuk digunakan denganERDDAPtidak bisa, untuk membuat perubahan di luar apaERDDAPSistem manipulasi dapat dilakukan.

Misalnya, Anda dapat menggunakanNCOuntuk membuat unit variabel waktu konsisten dalam kelompok file di mana mereka tidak konsisten awalnya. Atau, Anda dapat menggunakanNCOSitemapscale\\_factorLoginadd\\_offsetdalam kelompok file di manascale\\_factorLoginadd\\_offsetmemiliki nilai yang berbeda dalam file sumber yang berbeda.
 (Atau, Anda sekarang dapat berurusan dengan masalah-masalah tersebutERDDAP™Sitemap[EDDGridDariNcFilesUnpacked](#eddgridfromncfilesunpacked), yang merupakan varian dariEDDGridDariNcFiles yang membongkar data yang dikemas dan mengstandardisasi nilai waktu pada tingkat rendah untuk menangani file koleksi yang memiliki berbagaiscale\\_factorSitemapadd\\_offset, atau unit waktu yang berbeda.) 

NCOGratis dan Open Source Software yang menggunakan[GPL 3.0](https://www.gnu.org/licenses/gpl-3.0.html)Login

Contoh #1: Membuat Unit Tetap
EDDGridDari File dan EDDTable Dari file insist bahwa unit untuk variabel tertentu identik dalam semua file. Jika beberapa file trivially (tidak berfungsi) berbeda dari orang lain (misalnya, unit waktu
"detik sejak 1970-01 00:00:00 UTC" versus
"seconds since 1970-01-01T00:00:00Z"Anda bisa menggunakanNCOSitemap[Login](https://nco.sourceforge.net/nco.html#ncatted-netCDF-Attribute-Editor). untuk mengubah unit di semua file yang identik dengan
nco/ncatted -a unit, waktu, o, c, detik sejak 1970-01T00:00Z' \\*.nc  
\\[Untuk banyak masalah seperti ini di EDDTableDari... File dataset, Anda sekarang dapat menggunakan[Login Sitemap](#standardizewhat)SitemapERDDAPuntuk menstandardisasi file sumber karena mereka membacaERDDAPSitemap\\]
    
### Batasi Ukuran Dataset{#limits-to-the-size-of-a-dataset} 
Anda akan melihat banyak referensi ke "2 miliar" di bawah. Lebih akurat, itu adalah referensi ke 2,147,483,647 (2^31-1) , yang merupakan nilai maksimum dari bilangan bulat yang ditandatangani 32-bit. Dalam beberapa bahasa komputer, misalnyaJava  (SitemapERDDAP™ditulis dalam) , itu adalah jenis data terbesar yang dapat digunakan untuk banyak struktur data (misalnya, ukuran array) Sitemap

Untuk nilai String (misalnya, untuk nama variabel, nama atribut, nilai atribut String, dan nilai data String) Jumlah karakter maksimum per String dalamERDDAP™adalah ~ 2 miliar. Tetapi dalam hampir semua kasus, akan ada masalah kecil atau besar jika String melebihi ukuran yang wajar (misalnya, 80 karakter untuk nama variabel dan nama atribut, dan 255 karakter untuk sebagian besar nilai atribut String dan nilai data) Sitemap Misalnya, halaman web yang menampilkan nama variabel panjang akan lebar dan nama variabel yang panjang akan terpotong jika mereka melebihi batas jenis file respons.

Untuk dataset gridded:

* Jumlah maksimumaxisVariables adalah ~ 2 miliar.
Jumlah maksimumdataVariables adalah ~ 2 miliar.
Tapi jika dataset memiliki &gt; 100 variabel, itu akan kubersome untuk pengguna untuk digunakan.
Dan jika dataset memiliki &gt; 1 juta variabel, server Anda akan membutuhkan banyak memori fisik dan akan ada masalah lain.
* Ukuran maksimum setiap dimensi (axisVariable) adalah nilai ~ 2 miliar.
* Saya pikir jumlah maksimum sel (produk semua ukuran dimensi) tidak terbatas, tetapi mungkin ~ 9e18.

Untuk set data tabel:

* Jumlah maksimumdataVariables adalah ~ 2 miliar.
Tapi jika dataset memiliki &gt; 100 variabel, itu akan kubersome untuk pengguna untuk digunakan.
Dan jika dataset memiliki &gt; 1 juta variabel, server Anda akan membutuhkan banyak memori fisik dan akan ada masalah lain.
* Jumlah sumber maksimum (misalnya, file) yang dapat di agregat adalah ~ 2 miliar.
* Dalam beberapa kasus, jumlah baris maksimum dari sumber individu (misalnya, file, tapi bukan database) adalah ~ 2 miliar baris.
* Saya tidak berpikir ada batas lain. Meme it

Untuk dataset gridded dan tabular, ada beberapa batas internal pada ukuran subset yang dapat diminta oleh pengguna dalam satu permintaan (sering berhubungan dengan &gt;2 miliar dari sesuatu atau ~9e18 dari sesuatu) tapi jauh lebih mungkin bahwa pengguna akan memukul batas spesifik tipe file.

*   NetCDFversi 3.ncfile terbatas pada 2GB byte. (Jika ini benar-benar masalah bagi seseorang, beri tahu saya: Saya bisa menambahkan dukungan untukNetCDFversi 3.ncEkstensi 64-bit atauNetCDFVersi 4, yang akan meningkatkan batas secara signifikan, tetapi tidak terbatas.) 
* Browser crash setelah hanya ~ 500MB data, sehinggaERDDAP™membatasi respons terhadap.htmlTablepermintaan untuk ~ 400MB data.
* Banyak program analisis data memiliki batas yang sama (misalnya, ukuran maksimum dimensi sering ~ 2 miliar nilai) , jadi tidak ada alasan untuk bekerja keras untuk mencapai batas spesifik tipe file.
* Batas spesifik tipe file berguna dalam bahwa mereka mencegah permintaan naif untuk jumlah data yang benar-benar besar (misalnya, "menggemukan saya semua dataset ini" ketika dataset memiliki 20TB data) , yang akan mengambil minggu atau bulan untuk diunduh. Semakin lama download, semakin mungkin akan gagal untuk berbagai alasan.
* Batas spesifik tipe file berguna karena mereka memaksa pengguna untuk berurusan dengan subset berukuran cukup (misalnya, berurusan dengan dataset gridded besar melalui file dengan data dari satu titik waktu setiap) Sitemap
         
### Beralih ke ACDD-1.3{#switch-to-acdd-13} 
Sitemap (Sitemap[Login](#generatedatasetsxml)) Sitemap[Versi ACDD 1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3), yang dikukur pada awal 2015 dan yang disebut sebagai "ACDD-1.3" dalam atribut Konvensi global. SitemapERDDAP™versi 1.62 (dirilis pada Juni 2015) LoginERDDAP™digunakan / diubah asli, versi 1.0, dari[NetCDFKonvensi Menarik untuk Penemuan Dataset](https://wiki.esipfed.org/ArchivalCopyOfVersion1)yang disebut sebagai "UnidataDataset Discovery v1.0" dalam Konvensi global danMetadata\\_ConventionsSitemap

Jika dataset Anda menggunakan versi sebelumnya ACDD, kami RECOMMEND bahwa Anda beralih ke ACDD-1.3. Tidak sulit. ACDD-1.3 sangat kompatibel dengan versi 1.0. Untuk beralih, untuk semua dataset (SitemapEDDGridDariErddap dan EDDTable Sitemap) Sitemap

1. Hapus global yang baru didepresiMetadata\\_Conventionsatribut dengan menambahkan (atau dengan mengubah yang adaMetadata\\_ConventionsLogin)   
```
        <att name="Metadata\\_Conventions">null</att>  
```
ke global dataset&lt;addAttributesSitemap
     
2. Jika dataset memiliki atribut Konvensi di global&lt;addAttributesSitemapUnidataDataset Discovery v1.0" mengacu pada "ACDD-1.3".
Jika dataset tidak memiliki atribut Konvensi di global&lt;addAttributes&gt;, kemudian tambahkan satu yang mengacu pada ACDD-1.3. Sitemap
```
        <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>  
```
         
3. Jika dataset memiliki globalstandard\\_name\\_vocabularyatribut, ubah format nilai, misalnya,
```
        <att name="standard\\_name\\_vocabulary">CF Standard Name Table v65</att>  
```
Jika referensi adalah versi lama dari[Standar CF tabel nama](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html)Sitemap mungkin ide yang baik untuk beralih ke versi saat ini (65, seperti yang kita tulis ini) , karena nama standar baru ditambahkan ke tabel dengan versi berikutnya, tetapi nama standar lama jarang diuraikan dan tidak pernah dihapus.
     
4. Meskipun ACDD-1.0 termasuk atribut global untukcreator\\_nameLogincreator\\_emailLogincreator\\_urlLogin[Login](#generatedatasetsxml)tidak secara otomatis menambahkannya sampai kadang-kadang sekitar Meme itERDDAP™v1.50. Informasi penting ini:
        
    *   creator\\_namememungkinkan pengguna tahu / mengutip pencipta dataset.
    *   creator\\_emailmemberitahu pengguna alamat email pilihan untuk menghubungi pencipta dataset, misalnya jika mereka memiliki pertanyaan tentang dataset.
    *   creator\\_urlmemberikan pengguna cara untuk mengetahui lebih lanjut tentang pencipta.
    *   ERDDAP™menggunakan semua informasi ini ketika menghasilkan dokumen metadata FGDC dan ISO 19115-2/19139 untuk setiap dataset. Dokumen-dokumen tersebut sering digunakan oleh layanan pencarian eksternal.
    
Harap tambahkan atribut ini ke global dataset&lt;addAttributesSitemap
```
        <att name="creator\\_name">NOAA NMFS SWFSC ERD</att>  
        <att name="creator\\_email">erd.data@noaa.gov</att>  
        <att name="creator\\_url">https://www.pfeg.noaa.gov</att>  
```
    
Itu. Meme it Saya berharap tidak terlalu keras. Meme it
     
### Login{#zarr} 
Versi 2.25ERDDAP™dapat membaca lokal Zarr file[Login](#eddtablefromncfiles)Login[EDDGridLogin](#eddgridfromncfiles)Sitemap

 (Juni 2019) Kita bisa dengan mudah salah, tapi kita belum yakin bahwa Meme it[Login](https://github.com/zarr-developers/zarr-python), atau sistem serupa yang memecah file data menjadi chunks yang lebih kecil, adalah solusi yang bagus untuk masalahERDDAP™membaca data yang disimpan dalam layanan cloud seperti Amazon AWS S3. Zarr adalah teknologi hebat yang telah menunjukkan kegunaannya dalam berbagai situasi, kita tidak yakin bahwaERDDAP+S3 akan menjadi salah satu situasi tersebut. Sebagian besar kita mengatakan: sebelum kita terburu-buru untuk membuat upaya untuk menyimpan semua data kita di Zarr, mari kita melakukan beberapa tes untuk melihat apakah itu benar-benar solusi yang lebih baik.

Masalah dengan mengakses data di cloud adalah latency (lag untuk pertama mendapatkan data) dan akses tingkat file (daripada akses level blok) Sitemap Zarr memecahkan masalah akses tingkat file, tetapi tidak ada latency. Dibandingkan dengan hanya mengunduh file (sehingga dapat dibaca sebagai file lokal dengan akses tingkat blok) , Zarr bahkan dapat memperburuk masalah latensi karena, dengan Zarr, membaca file sekarang melibatkan serangkaian beberapa panggilan untuk membaca bagian yang berbeda dari file (masing-masing dengan lag sendiri) Sitemap Masalah latency dapat diselesaikan dengan paralelisasi permintaan, tetapi itu adalah solusi tingkat tinggi, tidak tergantung pada Zarr.

Dan dengan Zarr (Database) Kami kehilangan kenyamanan memiliki file data menjadi file sederhana, satu yang dapat dengan mudah memverifikasi integritas, atau membuat/download salinan.

ERDDAP™  (di v2) memiliki sistem untuk mempertahankan cache file lokal dari sumber URL (g., S3) Login&lt;cacheDariUrl&gt; dan&lt;Login (Login) Sitemap Dan yang baru [&lt;Sitemap (Login) harus meminimalkan masalah latency dengan memisahkan retrieval data pada tingkat tinggi.&lt;cacheDariUrl&gt; tampaknya bekerja dengan sangat baik untuk banyak skenario. (Kami tidak yakin bagaimana bermanfaat&lt;nThreads&gt; tanpa tes lebih lanjut.) Kami mengakui kami belum melakukan tes waktu pada instance AWS dengan koneksi jaringan yang baik, tetapi kami telah berhasil diuji dengan berbagai sumber URL dari file. DanERDDAPSitemap&lt;cacheDariUrl&gt; bekerja dengan jenis file data (Login.ncLogin.hdf.csv,.jsonlCSV) , bahkan jika dikompresi secara eksternal (Login.gz) tanpa perubahan pada file (e.g., menulis ulang mereka sebagai koleksi Zarr) Sitemap

Kemungkinan skenario yang berbeda akan mendukung solusi yang berbeda, misalnya, hanya perlu membaca bagian dari file sekali (Login) , vs. perlu membaca semua file sekali, vs. perlu membaca bagian atau semua file berulang kali (&lt;cacheDariUrl&gt; akan menang).

Sebagian besar kita mengatakan: sebelum kita terburu-buru untuk membuat upaya untuk menyimpan semua data kita di Zarr, mari kita melakukan beberapa tes untuk melihat apakah itu benar-benar solusi yang lebih baik.

- Sitemap
## Daftar Jenis Dataset{#list-of-types-datasets} 
Jika Anda memerlukan bantuan memilih jenis dataset yang tepat, lihat[Memilih Jenis Dataset](#choosing-the-dataset-type)Sitemap

Jenis dataset jatuh ke dalam dua kategori. ([Sitemap](#why-just-two-basic-data-structures)) 

### EDDGrid {#eddgrid} 
*   [ **EDDGrid** ](#eddgrid)dataset menangani data gridded.
    * SitemapEDDGriddataset, variabel data adalah array multi-dimensi data.
    * Tidak ada variabel sumbu untuk setiap dimensi. Variabel Axis MUST ditentukan dalam urutan variabel data menggunakannya.
    * SitemapEDDGriddataset, semua variabel data penggunaan MUST (Login) semua variabel sumbu.
         ([Sitemap](#why-just-two-basic-data-structures) [Bagaimana jika mereka tidak?](#dimensions)) 
    * Nilai Dimensi Terurut - SitemapEDDGriddataset, setiap dimensi MUST dalam urutan yang diurutkan (menangguhkan atau turun) Sitemap Masing-masing dapat disampingkan. Tidak ada hubungan. Ini adalah persyaratan[Standar metadata CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)Sitemap Jika nilai dimensi tidak dalam urutan yang diurutkan, dataset tidak akan dimuat danERDDAP™akan mengidentifikasi nilai pertama yang tidak disortasi dalam file log, *Login* Login
        
Beberapa subklas memiliki pembatasan tambahan (mungkin,EDDGridAggregateExistingDimensi mengharuskan dimensi luar (paling, pertama) akan berakhir.
        
Unsorted nilai dimensi hampir selalu menunjukkan masalah dengan dataset sumber. Ini paling sering terjadi ketika file yang salah atau tidak pantas disertakan dalam agregasi, yang mengarah pada dimensi waktu yang tidak disortir. Untuk memecahkan masalah ini, lihat pesan kesalahan di Meme itERDDAP™file log.txt untuk menemukan nilai waktu offending. Kemudian lihat file sumber untuk menemukan file yang sesuai (atau satu sebelum atau satu setelah) yang tidak termasuk dalam agregasi. Meme it
        
    * Lihat deskripsi yang lebih lengkap tentang[EDDGriddata model](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#dataModel)Sitemap
    * LoginEDDGridjenis dataset adalah:
        *   [EDDGridSitemap](#eddfromaudiofiles)agregat data dari sekelompok file audio lokal.
        *   [EDDGridLogin](#eddgridfromdap)menangani data gridded dariDAPserver.
        *   [EDDGridSitemap](#eddgridfromeddtable)memungkinkan Anda mengonversikan dataset tabular ke dataset gridded.
        *   [EDDGridLogin](#eddfromerddap)menangani data gridded dari jarak jauhERDDAPSitemap
        *   [EDDGridLogin](#eddgridfrometopo)hanya menangani data topografi ETOPO built-in.
        *   [EDDGridLogin](#eddgridfromfiles)adalah kelas super dari semuaEDDGridDari kelas...Files.
        *   [EDDGridLogin](#eddgridfrommergeirfiles)agregat data dari kelompok MergeIR lokal.gzLogin
        *   [EDDGridLogin](#eddgridfromncfiles)agregat data dari kelompok lokalNetCDF  (v3 atau v4)  .ncdan file terkait.
        *   [EDDGridDariNcFilesUnpacked](#eddgridfromncfilesunpacked)adalah varian jikaEDDGridDariNcFiles yang juga mengumpulkan data dari sekelompok lokalNetCDF  (v3 atau v4)  .ncdan file terkait, yangERDDAP™unpacks pada tingkat rendah.
        *   [EDDGridLonPM180](#eddgridlonpm180)merubah nilai garis bujur anakEDDGridsehingga mereka berada di kisaran -180 hingga 180.
        *   [EDDGridLon0360](#eddgridlon0360)merubah nilai garis bujur anakEDDGridsehingga mereka berada dalam kisaran 0 hingga 360.
        *   [EDDGridLogin](#eddgridsidebyside)agregat dua atau lebihEDDGridsisi dataset dengan sisi.
        *   [EDDGridLogin](#eddgridaggregateexistingdimension)agregat dua atau lebihEDDGriddataset, masing-masing yang memiliki berbagai nilai untuk dimensi pertama, tetapi nilai identik untuk dimensi lain.
        *   [EDDGridLogin](#eddgridcopy)dapat membuat salinan lokal lainEDDGridData dan menyajikan data dari salinan lokal.
             
    * SitemapEDDGriddataset mendukung pengaturan nThreads, yang memberitahukanERDDAP™berapa banyak benang untuk digunakan ketika menanggapi permintaan. Sitemap[Login](#nthreads)dokumentasi untuk rincian.
         
### Login{#eddtable} 
*   [ **Login** ](#eddtable)dataset menangani data tabel.
    * Data tabular dapat diwakili sebagai tabel seperti database dengan baris dan kolom. Setiap kolom (variabel data) memiliki nama, satu set atribut, dan menyimpan hanya satu jenis data. Setiap baris memiliki observasi (atau kelompok nilai terkait) Sitemap Sumber data mungkin memiliki data dalam struktur data yang berbeda, struktur data yang lebih rumit, dan / atau beberapa file data, tetapiERDDAP™harus dapat meratakan data sumber ke tabel seperti database untuk menyajikan data sebagai data tabel untuk penggunaERDDAPSitemap
    * Lihat deskripsi yang lebih lengkap tentang[Model data yang dapat dibuktikan](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#dataModel)Sitemap
    * Jenis dataset EDDTable adalah:
        *   [Sitemap](#eddtablefromalldatasets)adalah dataset tingkat tinggi yang memiliki informasi tentang semua dataset lain di AndaERDDAPSitemap
        *   [Login](#eddtablefromasciifiles)agregat data dari comma-, tab-, semicolon-, atau file data tabular yang dipisahkan ruang.
        *   [Sitemap](#eddtablefromasciiservice)adalah kelas super dari semua kelas EDDTableDariAsciiService ....
        *   [Sitemap](#eddtablefromasciiservicenos)menangani data dari beberapa Meme itNOAALayanan web NOS.
        *   [Datasheet](#eddfromaudiofiles)agregat data dari sekelompok file audio lokal.
        *   [Login Login](#eddtablefromawsxmlfiles)agregat data dari satu set Stasiun Cuaca Otomatis (Login) XML API
        *   [Login](#eddtablefromcassandra)menangani data tabular dari satu meja Cassandra.
        *   [Sitemap](#eddtablefromcolumnarasciifiles)agregat data dari file data tabular ASCII dengan kolom data tetap lebar.
        *   [Login](#eddtablefromdapsequence)menangani data tabular dariDAPserver urutan.
        *   [Login](#eddtablefromdatabase)menangani data tabular dari satu tabel database.
        *   [LoginEDDGrid](#eddtablefromeddgrid)memungkinkan Anda membuat dataset EDDTable dariEDDGridLogin
        *   [Login](#eddfromerddap)menangani data tabular dari jarak jauhERDDAPSitemap
        *   [Login](#eddtablefromfilenames)membuat dataset dari informasi tentang sekelompok file dalam sistem file server, tetapi tidak melayani data dari dalam file.
        *   [Login](#eddtablefromfiles)adalah kelas super dari semua kelas EDDTableDari...Files.
        *   [Login](#eddtablefromhttpget)SitemapERDDAPSatu-satunya sistem untuk impor data serta ekspor data.
        *   [LoginHyraxLogin](#eddtablefromhyraxfiles)  (Login) agregat data dari file dengan beberapa variabel dengan dimensi bersama yang dilayani oleh[Hyrax OPeNDAPLogin](https://www.opendap.org/software/hyrax-data-server)Sitemap
        *   [Login](#eddtablefrominvalidcrafiles)data agregat dariNetCDF  (v3 atau v4)  .ncfile yang menggunakan khusus, tidak valid, varian CF DSG Contiguous Ragged Array (Login) Login LoginERDDAP™mendukung jenis file ini, itu adalah jenis file yang tidak valid yang tidak ada yang harus mulai menggunakan. Kelompok yang saat ini menggunakan jenis file ini sangat didorong untuk digunakanERDDAP™untuk menghasilkan file CF DSG CRA yang valid dan berhenti menggunakan file ini.
        *   [Login](#eddtablefromjsonlcsvfiles)data agregat dari[Login Garis file CSV](https://jsonlines.org/examples/)Sitemap
        *   [Sitemap](#eddtablefrommultidimncfiles)data agregat dariNetCDF  (v3 atau v4)  .ncfile dengan beberapa variabel dengan dimensi bersama.
        *   [Login](#eddtablefromncfiles)data agregat dariNetCDF  (v3 atau v4)  .ncfile dengan beberapa variabel dengan dimensi bersama. Sangat baik untuk terus menggunakan jenis dataset ini untuk dataset yang ada, tetapi untuk dataset baru kami merekomendasikan menggunakan EDDTableDariMultidimNcFiles.
        *   [Sitemap](#eddtablefromnccffiles)data agregat dariNetCDF  (v3 atau v4)  .ncfile yang menggunakan salah satu format file yang ditentukan oleh[Login Sitemap (Login) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)konvensi. Tapi untuk file menggunakan salah satu varian CF DSG multidimensional, gunakan[Sitemap](#eddtablefrommultidimncfiles)Sitemap
        *   [Login](#eddtablefromnccsvfiles)data agregat dari[Login](/docs/user/nccsv-1.00)ASCII .csv file.
        *   [Login](#eddtablefromnos)  (Login) menangani data tabular dari server NOS XML.
        *   [Sitemap](#eddtablefromobis)menangani data tabular dari server OBIS.
        *   [Login](#eddtablefromparquetfiles)menangani data dari[Login](https://parquet.apache.org/)Sitemap
        *   [LoginSOS](#eddtablefromsos)menangani data tabular dariSOSserver.
        *   [Sitemap](#eddtablefromthreddsfiles)  (Login) agregat data dari file dengan beberapa variabel dengan dimensi bersama yang dilayani oleh[LoginOPeNDAPLogin](https://www.unidata.ucar.edu/software/tds/)Sitemap
        *   [LoginWFSLogin](#eddtablefromwfsfiles)  (Login) membuat salinan lokal dari semua data dariArcGISLoginWFSserver sehingga data kemudian dapat diakses kembali dengan cepat Meme itERDDAP™pengguna.
        *   [Login](#eddtableaggregaterows)dapat membuat dataset EDDTable dari sekelompok dataset EDDTable.
        *   [Login](#eddtablecopy)dapat membuat salinan lokal dari banyak jenis dataset EDDTable dan kemudian mengamati kembali data dengan cepat dari salinan lokal.

  
- Sitemap

## Deskripsi terperinci dari Jenis Dataset{#detailed-descriptions-of-dataset-types} 

### EDDGridLogin{#eddgridfromdap} 
[ **EDDGridLogin** ](#eddgridfromdap)menangani variabel grid dari[DAP](https://www.opendap.org/)server.

* Kami sangat merekomendasikan menggunakan[Login Program Xml](#generatedatasetsxml)untuk membuat draft kasar daridatasets.xmlchunk dataset ini. Anda dapat mengumpulkan informasi yang Anda butuhkan untuk mengubah atau membuat XML Anda sendiri untukEDDGridDariDap dataset dengan melihat file DDS dan DAS dataset sumber di browser Anda (dengan menambahkan .das dan .dds kesourceUrl, misalnya,[ https://thredds1.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day.dds ](https://thredds1.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day.dds)) Sitemap
     
*   EDDGridDariDap dapat mendapatkan data dari variabel multi-dimensi dariDAPserver data. (SitemapEDDGridDariDap terbatas pada variabel yang ditunjuk sebagai "grid", tetapi tidak lagi persyaratan.)   
     
* Nilai Dimensi Terurut - Nilai untuk setiap dimensi MUST dalam urutan yang diurutkan (menangguhkan atau turun) Sitemap Nilai-nilai dapat disampingkan. Tidak ada hubungan. Ini adalah persyaratan[Standar metadata CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)Sitemap Jika nilai dimensi tidak dalam urutan yang diurutkan, dataset tidak akan dimuat danERDDAP™akan mengidentifikasi nilai pertama yang tidak disortasi dalam file log, *Login* Login
    
Unsorted nilai dimensi hampir selalu menunjukkan masalah dengan dataset sumber. Ini paling sering terjadi ketika file yang salah atau tidak pantas disertakan dalam agregasi, yang mengarah pada dimensi waktu yang tidak disortir. Untuk memecahkan masalah ini, lihat pesan kesalahan di Meme itERDDAP™file log.txt untuk menemukan nilai waktu offending. Kemudian lihat file sumber untuk menemukan file yang sesuai (atau satu sebelum atau satu setelah) yang tidak termasuk dalam agregasi. Meme it
    
#### EDDGridSitemap Login{#eddgridfromdap-skeleton-xml} 

 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset type="EDDGridFromDap" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromDap, this gets the remote .dds and then gets the new  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

     
### EDDGridSitemap{#eddgridfromeddtable} 
[ **EDDGridSitemap** ](#eddgridfromeddtable)memungkinkan Anda mengonversikan dataset tabular EDDTable menjadiEDDGriddataset gridded. SitemapERDDAP™memperlakukan dataset baik[Database (subklasEDDGrid) atau tabular dataset (subclass dari EDDTable) ](#why-just-two-basic-data-structures)Sitemap

* Biasanya, jika Anda memiliki data gridded, Anda hanya mengaturEDDGriddataset langsung. Kadang-kadang ini tidak mungkin, misalnya, ketika Anda memiliki data yang disimpan dalam database hubunganERDDAP™hanya dapat diakses melalui EDDTableFromDatabase.EDDGridDari kelasEDDTable memungkinkan Anda obat situasi itu.
     
* Jelas, data dalam dataset EDDTable yang mendasari harus (Sitemap) data gridded, tetapi dalam bentuk tabel. Misalnya, dataset EDDTable mungkin memiliki data CTD: pengukuran arus timur dan ke utara, pada beberapa kedalaman, pada beberapa kali. Karena kedalaman yang sama pada setiap titik waktu,EDDGridDariEDDTable dapat membuat dataset gridded dengan waktu dan dimensi kedalaman yang mengakses data melalui dataset EDDTable yang mendasari.
     
* Login Login Kami sangat merekomendasikan menggunakan[Login Program Xml](#generatedatasetsxml)untuk membuat draft kasar daridatasets.xmlchunk dataset ini. Anda dapat mengumpulkan informasi yang Anda butuhkan untuk meningkatkan draft kasar.
     
* WordPress.org Seperti semua jenis dataset lainnya,EDDGridDariTable memiliki gagasan bahwa ada sumber globalAttributes dan[SitemapaddAttributes](#global-attributes)  (ditentukan dalamdatasets.xml) , yang dikombinasikan untuk membuat gabungan global Atribut, yang apa yang dilihat pengguna. Untuk sumber globalAttributes,EDDGridDariEDDTable menggunakan gabungan global Atribut dataset EDDTable yang mendasari. (Jika Anda berpikir tentang itu selama satu menit, itu masuk akal.) 
    
Demikian pula, untuk masing-masingaxisVariableSitemapdataVariableSitemap[addAttributes](#addattributes)LoginEDDGridDariEDDTable menggunakan gabungan variabel Atribut dari dataset EDDTable yang mendasarinyaEDDGridDari sumber variabel yang dapat dibuktikan. (Jika Anda berpikir tentang itu selama satu menit, itu masuk akal.) 
    
Sebagai konsekuensi, jika EDDTable memiliki metadata yang baik,EDDGridDariEDDTable sering perlu sangat sedikitaddAttributesmetadata -- hanya beberapa tweak di sini dan ada. Meme it
    
*   dataVariableLoginaxisVariableSitemap EDDTable yang mendasari hanyadataVariableSitemap LoginEDDGridDari dataset yang dapat dibuktikan akan memiliki beberapaaxisVariableLogin (dibuat dari beberapa EDDTabledataVariableLogin) dan beberapadataVariableLogin (dibuat dari EDDTable yang tersisadataVariableLogin) Sitemap[Login](#generatedatasetsxml)akan membuat kira seperti yang EDDTable Meme itdataVariableharus menjadiEDDGridSitemapaxisVariables, tapi itu hanya kira. Meme it Anda perlu memodifikasi output GenerateDatasetsXml untuk menentukan yangdataVariableSitemapaxisVariables, dan dalam urutan.
     
* Sitemap Tidak ada apa-apa tentang EDDTable yang mendasari untuk memberitahu Meme itEDDGridDariEDDTable nilai-nilai yang mungkin dariaxisVariables dalam versi gridded dari dataset, sehingga Anda MUST memberikan informasi untuk setiapaxisVariablemelalui salah satu atribut ini:
    
    * axisValues -- memungkinkan Anda menentukan daftar nilai. Sitemap
        &lt;nama att="axisValues"[Mengetik="doubleList"](#attributetype)\\&gt;2, 2.5, 3, 3,5, 4&lt;Login
Perhatikan penggunaan[jenis data](#data-types)ditambah Daftar kata. Juga, jenis daftar (misalnya, ganda) MUST cocok dengan data Jenis variabel di EDDTable danEDDGridDari set data yang dapat disesuaikan.
    * axisValuesStartStrideStop -- memungkinkan Anda menentukan urutan nilai ruang secara teratur dengan menentukan awal, stride, dan menghentikan nilai. Berikut adalah contoh yang setara dengan contoh sumbu di atas:
        &lt;nama att="axisValuesStartStrideStop"[Mengetik="doubleList"](#attributetype)g&lt;Login
Sekali lagi, perhatikan penggunaan jenis data daftar. Juga, jenis daftar (misalnya, ganda) MUST cocok dengan data Jenis variabel di EDDTable danEDDGridDari set data yang dapat disesuaikan.
         
    
Update -- Sama seperti tidak ada cara untuk Meme itEDDGridDariEDDTable untuk menentukan nilai sumbu dari EDDTable awalnya, ada juga tidak ada cara yang dapat diandalkan untukEDDGridDariEDDTable untuk menentukan dari EDDTable ketika sumbuValues telah berubah (tidak dapat, ketika ada nilai baru untuk variabel waktu) Sitemap Saat ini, satu-satunya solusi adalah untuk mengubah atribut sumbu Nilai dalamdatasets.xmldan isi ulang dataset. Misalnya, Anda bisa menulis skrip ke
    
    1. Logindatasets.xmlSitemap
        datasetIDSitemap *Login* Sitemap
sehingga Anda bekerja dengan dataset yang benar.
    2. Logindatasets.xmluntuk kejadian berikutnya
        <sourceName> *Login* </sourceName>  
sehingga Anda bekerja dengan variabel yang benar.
    3. Logindatasets.xmluntuk kejadian berikutnya
```
        <att name="axisValuesStartStrideStop" type="doubleList">  
```
jadi Anda tahu posisi awal tag. Meme it
    4. Logindatasets.xmluntuk kejadian berikutnya
```
        </att>  
```
jadi Anda tahu posisi akhir nilai sumbu.
    5. Ganti start lama, stride, menghentikan nilai dengan nilai baru.
    6. Sitemap[URL](/docs/server-admin/additional-information#set-dataset-flag)untuk dataset untuk memberitahukanERDDAP™untuk memuat ulang dataset.
    
Ini tidak ideal, tetapi bekerja.
     
* presisi - SitemapEDDGridDariEDDTable menanggapi permintaan pengguna untuk data, itu memindahkan baris data dari tabel respons EDDTable keEDDGridgrid respons. Untuk melakukan ini, ia harus mencari tahu apakah nilai "sumbu" pada baris tertentu dalam tabel cocok beberapa kombinasi nilai sumbu di grid. Untuk jenis data integer, mudah untuk menentukan apakah dua nilai sama. Tetapi untuk mengapung dan menggandakan, ini membawa masalah yang mengerikan dari nomor titik mengambang[tidak cocok persis Meme it](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/)Sitemap (misalnya, 0,2 versus 0.199999999999996) Sitemap Sitemap (Sitemap) berurusan dengan ini,EDDGridDariTable memungkinkan Anda menentukan atribut presisi untuk setiapaxisVariables, yang menentukan jumlah total digit desimal yang harus identik.
    * Sitemap&lt;nama att="precision" type="int"&gt;5&lt;Login
    * Untuk berbagai jenis variabel data, ada nilai presisi default yang berbeda. Standar biasanya sesuai. Jika mereka tidak, Anda perlu menentukan nilai yang berbeda.
    * SitemapaxisVariableSitemap[waktu atau waktu variabel Stamp](#timestamp-variables)default adalah presisi penuh (pertandingan yang tepat) Sitemap
    * SitemapaxisVariables yang mengapung, presisi default adalah 5.
    * SitemapaxisVariables yang ganda, presisi default adalah 9.
    * SitemapaxisVariables yang memiliki jenis data integer,EDDGridDariEDDTable mengabaikan atribut presisi dan selalu menggunakan presisi penuh (pertandingan yang tepat) Sitemap
         
    *    **Login** Ketika melakukan konversi chunk data tabel ke dalam chunk data gridded, jikaEDDGridDariEDDTable tidak dapat mencocokkan nilai "axis" EDDTable ke salah satu yang diharapkanEDDGridDari nilai sumbu yang dapat dibuktikan,EDDGridDariEDDTable diam-diam (tidak ada kesalahan) membuang data dari baris tabel itu. Misalnya, mungkin ada data lain (tidak di grid) di dataset EDDTable. (Dan jika stride &gt; 1, tidak jelas untukEDDGridDariTabel nilai sumbu mana nilai yang diinginkan dan yang merupakan salah satu yang harus digesek karena helai.) Jadi, jika nilai-nilai presisi terlalu tinggi, pengguna akan melihat nilai-nilai yang hilang dalam respon data ketika nilai data yang valid sebenarnya ada.
        
Sebaliknya, jika nilai presisi ditetapkan terlalu rendah, nilai "sumbu" EDDTable yang tidak cocokEDDGridNilai sumbu yang dapat dibuktikan akan (Login) Sitemap
        
Masalah potensial ini mengerikan, karena pengguna mendapatkan data yang salah (atau nilai yang hilang) ketika mereka harus mendapatkan data yang tepat (atau setidaknya pesan kesalahan) Sitemap
Ini bukan kekuranganEDDGridSitemapEDDGridDariTable tidak bisa memecahkan masalah ini. Masalahnya melekat dalam konversi data tabel ke data gridded (kecuali asumsi lain dapat dibuat, tetapi mereka tidak bisa dibuat di sini) Sitemap
Itu sampai Anda, Meme itERDDAP™administrator, untuk **SitemapEDDGridDariEDDTable secara menyeluruh** untuk memastikan bahwa nilai presisi ditetapkan untuk menghindari masalah potensial ini.
        
#### Login{#gapthreshold} 
*   [Login](#gapthreshold)Login Ini adalah jenis dataset yang sangat tidak biasa. Karena jenis pertanyaan yang dapat dibuat untuk (Sitemap) LoginEDDGridLogin (terkait dengan kisaran dan strides dariaxisVariableLogin) sangat berbeda dari jenis pertanyaan yang dapat dibuat untuk (Sitemap) Database (hanya berkaitan dengan kisaran beberapa variabel) , kinerjaEDDGridDari dataset yang dapat disesuaikan akan sangat bervariasi tergantung pada permintaan yang tepat yang dibuat dan kecepatan dataset EDDTable yang mendasari. Untuk permintaan yang memiliki nilai stride &gt; 1,EDDGridDariEDDTable dapat meminta EDDTable yang mendasari untuk chunk data yang relatif besar (seolah-olah stride=1) dan kemudian menyedot hasil, menjaga data dari beberapa baris dan membuang data dari orang lain. Jika harus menyemprot melalui banyak data untuk mendapatkan data yang dibutuhkan, permintaan akan memakan waktu lebih lama.
    
SitemapEDDGridDariEDDTable dapat memberitahu bahwa akan ada kesenjangan besar (dengan baris data yang tidak diinginkan) antara baris dengan data yang diinginkan,EDDGridDariEDDTable dapat memilih untuk membuat beberapa pertanyaan ke EDDTable yang mendasari bukan satu permintaan besar, sehingga melewatkan baris data yang tidak diinginkan dalam kesenjangan besar. Sensitivitas keputusan ini dikendalikan oleh nilai gapThreshold sebagaimana ditentukan dalam&lt;WordPress.org (default=1000 baris data sumber) Sitemap Menyiapkan gapThreshold ke nomor yang lebih kecil akan menyebabkan pembuatan dataset (Sitemap) lebih banyak pertanyaan. Menyiapkan gapThreshold ke nomor yang lebih besar akan menyebabkan pembuatan dataset (Sitemap) sedikit pertanyaan.
    
Jika gapThreshold diatur terlalu kecil,EDDGridDariEDDTable akan beroperasi lebih lambat karena overhead beberapa permintaan akan lebih besar dari waktu yang disimpan dengan mendapatkan beberapa data berlebih. Jika gapThreshold diatur terlalu besar,EDDGridDariEDDTable akan beroperasi lebih lambat karena begitu banyak data berlebih akan diambil dari EDDTable, hanya untuk dibuang. (Seperti Goldilocks ditemukan, tengah "hanya benar".) overhead untuk berbagai jenis dataset EDDTable sangat, sehingga satu-satunya cara untuk mengetahui pengaturan terbaik yang sebenarnya untuk dataset Anda melalui eksperimen. Tapi Anda tidak akan pergi terlalu jauh salah menempel pada default.
    
Contoh sederhana adalah: Bayangkan sebuahEDDGridDariTable dengan hanya satuaxisVariable  (waktu, dengan ukuran 100000) SitemapdataVariable  (Temperatur) , dan gapThreshold default 1000.
    
    * Jika suhu permintaan pengguna\\[0&#58;100&#58;5000\\], stride adalah 100 sehingga ukuran celah 99, yang kurang dari kesenjangan. LoginEDDGridDariTable akan membuat hanya satu permintaan untuk EDDTable untuk semua data yang diperlukan untuk permintaan (setara dengan suhu\\[Chili\\]) dan membuang semua baris data yang tidak perlu.
    * Jika suhu permintaan pengguna\\[0:2500:5000\\], itu stride adalah 2500 sehingga ukuran celah 2499, yang lebih besar dari kesenjangan. LoginEDDGridDariTable akan membuat permintaan terpisah ke EDDTable yang setara dengan suhu\\[Sitemap\\]Temperatur\\[Login\\]Temperatur\\[Login\\]Sitemap
    
Perhitungan ukuran celah lebih rumit ketika ada beberapa sumbu.
    
Untuk setiap permintaan pengguna,EDDGridDari pesan diagnostik cetak yang dapat dibuktikan yang berkaitan dengan ini di[Login](/docs/server-admin/additional-information#log)Login
    
    * Sitemap&lt;Login (Login) Sitemapdatasets.xmldiatur ke info, ini mencetak pesan seperti
\\* nOuterAxes=1 dari 4 nOuterRequests=22
Jika nOuterAxes=0, gapThreshold tidak melebihi dan hanya satu permintaan akan dibuat untuk EDDTable.
Jika nOuterAxes&gt;0, gapThreshold melebihi dan nOuterRequests akan dibuat untuk EDDTable, sesuai dengan setiap kombinasi yang diminta dari nOuterAxes paling kiri. Contohnya, jika dataset memiliki 4axisVariableSitemapdataVariables seperti ragi\\[Sitemap\\]\\[Login\\]\\[Login\\]\\[Login\\]Login (Login) variabel sumbu adalah waktu.
    * Sitemap&lt;Login Sitemapdatasets.xmldiatur ke semua, informasi tambahan ditulis ke file log.txt.
         
#### EDDGridFromEDDTable skeleton Login{#eddgridfromeddtable-skeleton-xml} 
 >&nbsp;&lt;dataset type="EDDGridFromEDDTable" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->   
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromEDDTable, this only works if the underlying EDDTable  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;supports updateEveryNMillis. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;gapThreshold>](#gapthreshold)...&lt;/gapThreshold> &lt;!-- 0 or 1. The default is 1000. >  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The underlying source EDDTable dataset. -->  
 >&nbsp;&lt;/dataset>  

### SitemapERDDAP {#eddfromerddap} 
 **EDDGridLogin** menangani data gridded dari jarak jauhERDDAP™Login
 **Login** menangani data tabular dari jarak jauhERDDAP™Login

*   EDDGridDariErddap dan EDDTableDariErddap behave berbeda dari semua jenis dataset lainnya diERDDAPSitemap
    * Seperti jenis dataset lain, dataset ini mendapatkan informasi tentang dataset dari sumber dan menyimpannya dalam memori.
    * Seperti jenis dataset lain, ketikaERDDAP™mencari dataset, menampilkan Formulir Akses Data ( *datasetID* Login) , atau menampilkan bentuk Make A Graph ( *datasetID* Login) LoginERDDAP™menggunakan informasi tentang dataset yang dalam memori.
    *   EDDGridDariErddap dan EDDTable DariErddap adalah dasar untuk[grids/clusters/federation](/docs/server-admin/scaling)LoginERDDAPs, yang secara efisien mendistribusikan penggunaan CPU (sebagian besar untuk membuat peta) , penggunaan memori, penyimpanan dataset, dan penggunaan bandwidth dari pusat data besar.
#### Login{#redirect} 
* Tidak seperti jenis dataset lain, ketikaERDDAP™menerima permintaan data atau gambar dari dataset ini,ERDDAP [Login](https://en.wikipedia.org/wiki/URL_redirection)permintaan ke remoteERDDAP™Login Hasilnya:
    * Ini sangat efisien (CPU, memori, dan bandwidth) karena
        1. KompositERDDAP™harus mengirim permintaan kepada pihak lainERDDAP™  (yang membutuhkan waktu) Sitemap
        2. LoginERDDAP™harus mendapatkan data, memformatnya, dan mengirimkan data ke kompositERDDAPSitemap
        3. KompositERDDAP™harus menerima data (menggunakan bandwidth) , memformatnya (menggunakan CPU dan memori) dan mentransmisikan data ke pengguna (menggunakan bandwidth) Sitemap Dengan mengarahkan permintaan dan memungkinkan yang lainERDDAP™untuk mengirim respons langsung ke pengguna, kompositERDDAP™menghabiskan pada dasarnya tidak ada waktu CPU, memori, atau bandwidth atas permintaan.
    * Redirect transparan ke pengguna terlepas dari perangkat lunak klien (browser atau perangkat lunak atau alat baris perintah lainnya) Sitemap
*   [Anda dapat memberitahukanERDDAP™](#redirect)tidak mengarahkan permintaan pengguna dengan pengaturan&lt;Login&lt;/redirect&gt;, tetapi ini mengabaikan sebagian besar keuntungan dari ...DariErddap jenis dataset (tidak dapat, membubarkan beban di ujung depanERDDAP™ke remote/backendERDDAP) Sitemap
         
     
#### Sitemap{#subscriptions} 
Biasanya, ketikaEDDGridDariErddap dan EDDTable Sitemap (Sitemap) dimuat pada AndaERDDAP, mereka mencoba untuk menambahkan berlangganan ke dataset jarak jauh melalui remoteERDDAP's email/URL sistem berlangganan. Dengan cara itu, setiap perubahan dataset jarak jauh, jarak jauhERDDAP™Sitemap[Login URL:](/docs/server-admin/additional-information#set-dataset-flag)AndaERDDAP™sehingga dataset lokal diisi ulang ASAP dan sehingga dataset lokal selalu up-to-date dan meniru dataset jarak jauh. Jadi, pertama kali ini terjadi, Anda harus mendapatkan permintaan email bahwa Anda memvalidasi berlangganan. Namun, jika penduduk setempatERDDAP™tidak dapat mengirim email atau jika remoteERDDAP's email/URL sistem berlangganan tidak aktif, Anda harus email remoteERDDAP™administrator dan meminta s/he secara manual menambahkan [&lt;Login (Login) Login&lt;/onChange&gt; tag untuk semua set data yang relevan untuk memanggil dataset Anda[Login Login](/docs/server-admin/additional-information#set-dataset-flag)Sitemap SitemapERDDAP™laporan harian untuk daftar setDataset URL bendera, tetapi hanya mengirim orang untukEDDGridDariErddap dan EDDTableDariErddap dataset ke remoteERDDAP™Login
    
Apakah ini tidak berfungsi? Apakah dataset lokal Anda tidak tetap sinkron dengan dataset jarak jauh?
Beberapa hal harus semua bekerja dengan benar untuk sistem ini untuk bekerja sehingga dataset Anda tetap terbaru. Cek setiap hal ini untuk:
    
    1. LoginERDDAP™harus dapat mengirim email. Lihat pengaturan email di setup.xml Anda.
    2. Sitemap (tapi tidak selalu) LoginERDDAPSitemap&lt;Login&lt;baseHttpsUrl&gt;must tidak memiliki nomor port (g., :8080, :8443) Sitemap Jika mereka melakukan, gunakan[Login](/docs/server-admin/deploy-install#proxypass)untuk menghapus port dari sumber daya.
    3. Di setup.xml Anda,&lt;Login
    4. Ketika EDD lokal Anda... Dari dataset Erddap diisi ulang, harus mengirim permintaan ke remoteERDDAP™untuk berlangganan dataset jarak jauh. Lihat log.txt untuk melihat apakah ini terjadi.
    5. Anda harus mendapatkan email meminta Anda untuk memvalidasi permintaan berlangganan.
    6. Anda harus mengklik tautan di email tersebut untuk memvalidasi permintaan berlangganan.
    7. LoginERDDAP™harus mengatakan bahwa validasi berhasil. Meme it Kapan saja, Anda dapat meminta email dari remoteERDDAP™dengan daftar langganan pending dan valid Anda. Lihat formulir di *Login Sitemap* /erddap/subscriptions/list.html
    8. Ketika perubahan dataset jarak jauh (e.g., mendapatkan data tambahan) , jarak jauhERDDAP™harus mencoba untuk menghubungi URL bendera AndaERDDAPSitemap Anda tidak dapat memeriksa ini, tetapi Anda dapat meminta administrator remoteERDDAP™untuk memeriksa ini.
    9. LoginERDDAP™harus menerima permintaan untuk mengatur bahwa flagURL. URL: http://setDatasetFlag.txt (Login) dan lihat apakah ada pesan kesalahan yang terkait dengan permintaan.
    10. LoginERDDAP™harus mencoba untuk memuat ulang dataset (mungkin tidak segera, tetapi ASAP) Sitemap
         
#### Maksimum yang terbaru (Sitemap) Sitemap{#up-to-date-maxtime} 
EDDGrid/TableDariErddap dataset hanya mengubah informasi tersimpan mereka tentang setiap dataset sumber ketika dataset sumber adalah[Sitemap](#reloadeverynminutes)dan beberapa bagian dari perubahan metadata (e.g., variabel waktuactual\\_range) , sehingga menghasilkan notifikasi berlangganan. Jika dataset sumber memiliki data yang sering berubah (misalnya, data baru setiap detik) dan menggunakan["update"](#updateeverynmillis)sistem untuk melihat sering perubahan data yang mendasarinya,EDDGrid/TableFromErddap tidak akan diberitahukan tentang perubahan sering ini sampai dataset berikutnya "reload", sehinggaEDDGrid/TableFromErddap tidak akan sangat up-to-date. Anda dapat meminimalkan masalah ini dengan mengubah dataset sumber&lt;reloadEveryNMinutes&gt; untuk nilai yang lebih kecil (60? 15?) sehingga ada lebih banyak pemberitahuan berlangganan untuk memberitahu Meme itEDDGrid/TableFromErddap untuk memperbarui informasinya tentang dataset sumber.

Atau, jika sistem manajemen data Anda tahu ketika dataset sumber memiliki data baru (e.g., melalui script yang menyalin file data ke tempat) dan jika itu tidak terlalu sering (e.g., setiap 5 menit, atau kurang sering) , ada solusi yang lebih baik:

1. Jangan gunakan&lt;memperbaruiEveryNMillis&gt; untuk menjaga dataset sumber terbaru.
2. Mengatur dataset sumber&lt;reloadEveryNMinutes&gt; untuk jumlah yang lebih besar (1440?) Sitemap
3. Memiliki skrip kontak dataset sumber[URL](/docs/server-admin/additional-information#set-dataset-flag)tepat setelah menyalin file data baru ke tempat.
     

Itu akan menyebabkan dataset sumber menjadi up-to-date sempurna dan menyebabkannya menghasilkan pemberitahuan berlangganan, yang akan dikirim keEDDGrid/TableDariErddap dataset. Itu akan memimpin Meme itEDDGrid/TableDariErddap dataset untuk sangat up-to-date (baik, dalam 5 detik data baru ditambahkan) Sitemap Dan semua yang akan dilakukan secara efisien (tanpa reload dataset yang tidak perlu) Sitemap
     
#### SitemapaddAttributesLoginaxisVariableSitemapdataVariable {#no-addattributes-axisvariable-or-datavariable} 
Tidak seperti jenis dataset lain, EDDTableDariErddap danEDDGridDari dataSet Erddap tidak memungkinkan global&lt;addAttributes&gt;Login&lt;axisVariableLogin&lt;dataVariable&gt; bagian dalamdatasets.xmldataset. Masalahnya adalah bahwa mereka akan mengarah ke inkonsistensi:
    
1. Katakanlah Anda diperbolehkan dan menambahkan atribut global baru.
2. Ketika pengguna meminta AndaERDDAP™untuk atribut global, atribut baru akan muncul.
3. Tapi ketika pengguna meminta Anda Meme itERDDAP™untuk file data, AndaERDDAP™mengarahkan permintaan ke sumberERDDAPSitemap LoginERDDAP™tidak menyadari atribut baru. Jadi jika membuat file data dengan metadata, misalnya,.ncfile, metadata tidak akan memiliki atribut baru.

Ada dua putaran kerja:

1. Menyediakan admin dari sumberERDDAP™untuk membuat perubahan yang ingin Anda metadata.
2. Alih-alih EDDTableDariErddap, gunakan[Login](#eddtablefromdapsequence)Sitemap Atau bukanEDDGridDariErddap, gunakan[EDDGridLogin](#eddgridfromdap)Sitemap Jenis EDD memungkinkan Anda untuk menghubungkan secara efisien ke dataset di remoteERDDAP™  (tetapi tanpa mengalihkan permintaan data) dan mereka memungkinkan Anda untuk memasukkan global&lt;addAttributes&gt;Login&lt;axisVariableLogin&lt;dataVariable&gt; bagian dalamdatasets.xmlSitemap Satu perbedaan lain: Anda harus berlangganan secara manual ke dataset jarak jauh, sehingga dataset pada AndaERDDAP™akan diberitahukan (Sitemap[URL](/docs/server-admin/additional-information#set-dataset-flag)) ketika ada perubahan dataset jarak jauh. Dengan demikian, Anda membuat dataset baru, bukan tautan ke dataset jarak jauh.
         
#### Catatan lain{#other-notes} 
* Untuk alasan keamanan,EDDGridDariErddap dan EDDTable DariErddap tidak mendukung [&lt;Login (Login) tag dan tidak dapat digunakan dengan dataset jarak jauh yang memerlukan penebangan di (karena mereka menggunakan [&lt;Login (Login) Sitemap SitemapERDDAPSitemap[sistem keamanan](/docs/server-admin/additional-information#security)untuk membatasi akses ke beberapa set data untuk beberapa pengguna.
     
* SitemapERDDAP™v2.10,EDDGridDariErddap dan EDDTableDariErddap mendukung [&lt;Login (Login) Login Tidak seperti jenis dataset lain, default benar, tetapi file dataset akan diaksesViaFiles hanya jika dataset sumber juga memiliki&lt;Sitemap
     
* Anda dapat menggunakan[Login Program Xml](#generatedatasetsxml)untuk membuatdatasets.xmlchunk untuk jenis dataset ini. Tapi Anda dapat melakukan jenis dataset ini dengan mudah.
     
#### EDDGridDariErddap skeleton Login{#eddgridfromerddap-skeleton-xml} 
*   EDDGridDariErddap skeleton XML dataset sangat sederhana, karena maksudnya hanya untuk meniru dataset jarak jauh yang sudah cocok untuk digunakanERDDAPSitemap
 >&nbsp;&nbsp;&lt;dataset type="EDDGridFromErddap" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)...&lt;/accessibleViaFiles> &lt;!-- 0 or 1, default=true. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1   
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDGridFromErddap, this gets the remote .dds and then gets  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the new leftmost (first) dimension values. -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
 >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;redirect>](#redirect)true(default)|false&lt;/redirect> &lt;!-- 0 or 1; -->  
 >&nbsp;&nbsp;&lt;/dataset>  

#### Sitemap Login{#eddtablefromerddap-skeleton-xml} 
* Kerangka XML untuk dataset EDDTableFromErddap sangat sederhana, karena maksudnya hanya untuk meniru dataset jarak jauh, yang sudah cocok digunakan dalamERDDAPSitemap
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromErddap" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;redirect>](#redirect)true(default)|false&lt;/redirect> &lt;!-- 0 or 1; -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDGridLogin{#eddgridfrometopo} 
[ **EDDGridLogin** ](#eddgridfrometopo)Sitemap[ETOPO1 Global 1-Minute Gridded Data Set](https://www.ngdc.noaa.gov/mgg/global/global.html)  (Permukaan Es, grid terdaftar, biner, 2byte int: etopo1\\_ice\\_g\\_i2.zip) yang didistribusikan denganERDDAPSitemap

* PromodatasetIDSitemapEDDGridDariEtopo, sehingga Anda dapat mengakses data dengan nilai longitude -180 hingga 180, atau nilai longitude 0 hingga 360.
* Tidak pernah ada tag sub, karena data sudah dijelaskan dalamERDDAPSitemap
* Jadi dua pilihan untukEDDGridDari dataSet Etopo adalah (Login) Sitemap
```
      <!-- etopo180 serves the data from longitude -180 to 180 -->
      <dataset type="EDDGridFromEtopo" datasetID="etopo180" /> 
      <!-- etopo360 serves the data from longitude 0 to 360 -->
      <dataset type="EDDGridFromEtopo" datasetID="etopo360" /> 
```

### EDDGridLogin{#eddgridfromfiles} 
[ **EDDGridLogin** ](#eddgridfromfiles)adalah kelas super dari semuaEDDGridDari kelas...Files. Anda tidak dapat menggunakanEDDGridDari File secara langsung. Sebagai gantinya, gunakan subklas kelasEDDGridDariFiles untuk menangani jenis file tertentu:

*   [EDDGridLogin](#eddgridfrommergeirfiles)menangani data dari gridded[Login.gz](https://www.cpc.ncep.noaa.gov/products/global_precip/html/README)Login
*   [EDDGridSitemap](#eddfromaudiofiles)agregat data dari sekelompok file audio lokal.
*   [EDDGridLogin](#eddgridfromncfiles)menangani data dari gridded[Login](https://en.wikipedia.org/wiki/GRIB)file,[HDF  (v4 atau v5)  .hdf](https://www.hdfgroup.org/)file,[.ncLogin](#ncml-files)file, dan[NetCDF  (v3 atau v4)  .nc](https://www.unidata.ucar.edu/software/netcdf/)Login Ini dapat bekerja dengan jenis file lainnya (misalnya, BUFR) , kami tidak mengujinya - silakan kirim beberapa file sampel jika Anda tertarik.
*   [EDDGridDariNcFilesUnpacked](#eddgridfromncfilesunpacked)adalah varianEDDGridDariNcFiles yang menangani data dari griddedNetCDF  (v3 atau v4)  .ncdan file terkait, yangERDDAP™unpacks pada tingkat rendah.

Saat ini, tidak ada jenis file lain yang didukung. Tapi biasanya relatif mudah untuk menambahkan dukungan untuk jenis file lainnya. Hubungi kami jika Anda memiliki permintaan. Atau, jika data Anda dalam format file lama yang ingin Anda pindah dari, kami merekomendasikan mengkonversi file menjadiNetCDFg.ncLoginNetCDFadalah format biner yang didukung secara luas, memungkinkan akses acak cepat ke data, dan sudah didukung olehERDDAPSitemap

#### Dari Detail File{#from-files-details} 
Informasi berikut berlaku untuk semua subkelasEDDGridLogin

##### Aggregasi Dimensi yang Ada{#aggregation-of-an-existing-dimension} 
Semua variasiEDDGridDari File dapat mengatur data dari file lokal, di mana setiap file memiliki 1 (Sitemap) nilai yang berbeda untuk yang paling kiri (Login) dimensi, biasanya\\[Sitemap\\], yang akan agregat. Meme it Misalnya, dimensi mungkin\\[Sitemap\\]\\[Login\\]\\[Login\\]\\[Login\\], dan file mungkin memiliki data untuk satu (atau beberapa) nilai waktu (Login) Login Dataset dihasilkan muncul seolah-olah semua data file telah digabungkan. Keuntungan besar dari agregasi adalah:

* Ukuran set data agregat dapat jauh lebih besar dari satu file dapat mudah (g) Sitemap
* Untuk data waktu dekat, mudah untuk menambahkan file baru dengan chunk data terbaru. Anda tidak perlu menulis ulang seluruh dataset.

Persyaratan untuk agregasi adalah:
* File lokal tidak perlu memiliki sama Meme itdataVariableLogin (sebagaimana didefinisikan dalam datasetdatasets.xml) Sitemap Dataset akan memilikidataVariabledidefinisikan dalamdatasets.xmlSitemap Jika file yang diberikan tidak memiliki file yang diberikandataVariableLoginERDDAP™akan menambahkan nilai yang hilang sesuai kebutuhan.
* SitemapdataVariables MUST menggunakan samaaxisVariableSitemap (sebagaimana didefinisikan dalam datasetdatasets.xml) Sitemap File akan diregangkan berdasarkan yang pertama (Login) dimensi, diurutkan dalam urutan akhir.
* Setiap file MEI memiliki data untuk satu atau lebih nilai dimensi pertama, tetapi tidak ada tumpang tindih antara file. Jika file memiliki lebih dari satu nilai untuk dimensi pertama, nilai MUST diurutkan dalam urutan akhir, tanpa ikatan.
* Semua file MUST memiliki nilai yang sama untuk semua dimensi lainnya. Ketepatan pengujian ditentukan oleh[Login](#matchaxisndigits)Sitemap
* Semua file MUST memiliki persis sama[Login](#units)metadata untuk semuaaxisVariableSitemapdataVariableSitemap Jika ini adalah masalah, Anda mungkin dapat menggunakan[Login](#ncml-files)Sitemap[NCO](#netcdf-operators-nco)untuk memperbaiki masalah.
         
##### Aggregasi melalui Nama File atau Metadata Global{#aggregation-via-file-names-or-global-metadata} 
Semua variasiEDDGridDariFiles juga dapat mengumpulkan sekelompok file dengan menambahkan paling kiri baru (Login) dimensi, biasanya waktu, berdasarkan nilai yang berasal dari setiap nama file atau dari nilai atribut global yang ada di setiap file. Misalnya, nama file mungkin mencakup nilai waktu untuk data dalam file.ERDDAP™kemudian akan membuat dimensi waktu baru.

Tidak seperti fitur serupa di THREDDS,ERDDAP™selalu menciptakanaxisVariabledengan nilai numerik (seperti yang diperlukan oleh CF) Tidak ada nilai String (yang tidak diperbolehkan oleh CF) Sitemap SitemapERDDAP™akan memilah file dalam agregasi berdasarkan numerikaxisVariablenilai yang ditugaskan untuk setiap file, sehingga variabel sumbu akan selalu memiliki nilai yang diurutkan sesuai kebutuhan oleh CF. Pendekatan THREDDS melakukan semacam lexicografi berdasarkan nama file mengarah ke agregasi di mana nilai sumbu tidak diurutkan (yang tidak diperbolehkan oleh CF) ketika nama file menyortir berbeda dari yang berasalaxisVariableSitemap

Untuk mengatur salah satu agregasi iniERDDAP™Anda akan menentukan kiri baru (Login)  [axisVariable](#axisvariable)dengan nama sama lain, pseudo&lt;sourceNameSitemapERDDAP™di mana dan bagaimana menemukan nilai untuk dimensi baru dari setiap file.

* Format untuk pseudosourceNameyang mendapat nilai dari nama file (Login) Sitemap
    \\*\\*Login *Login* [Sitemap Login](#data-types) *Login* Login *Login* menangkapGroupNumber*
* Format untuk pseudosourceNameyang mendapat nilai dari nama path absolut file
    \\*\\*Login *Login* [Sitemap Login](#data-types) *Login* Login *Login* menangkapGroupNumber*
    \\[Untuk ini, nama jalan selalu menggunakan'/'sebagai karakter pemisah direktori, tidak pernah '\'.\\]
* Format untuk pseudosourceNameyang mendapat nilai dari atribut global adalah
    \\*\\*Login *global:* Login Login *Login* [Sitemap Login](#data-types) *Login* Login *Login* menangkapGroupNumber*
* Foto’ssourceNamepilihan bekerja berbeda dari yang lain: bukan menciptakan kiri baru (Login)  axisVariable, ini menggantikan nilai arusaxisVariabledengan nilai yang diekstrak dari nama file (Login) Sitemap Format ini
    \\*\\*Login *Login Login* [Sitemap Login](#data-types) *Login* Login *Login* menangkapGroupNumber*
     

Deskripsi bagian yang perlu Anda berikan adalah:

*    *Login Login* -- nama atribut global yang ada di setiap file dan yang berisi nilai dimensi.
*    *Sitemap Login* Login Ini menentukan jenis data yang akan digunakan untuk menyimpan nilai. Lihat daftar standar[Sitemap Login](#data-types)LoginERDDAP™mendukung, kecuali bahwa String tidak diperbolehkan di sini karena variabel sumbu dalamERDDAP™tidak bisa menjadi variabel String.
    
Ada tambahan pseudo dataType, timeFormat= *Login Login* SitemapERDDAP™bahwa nilai adalah String timeStamp[unit cocok untuk waktu string](#string-time-units)Sitemap Dalam kebanyakan kasus, stringTimeFormat Anda perlu akan menjadi variasi dari salah satu format ini:
    
    *   yyyy-MM-dd'T'HH:mm:ss.SSSZ -- yang ISO 8601:2004 (Login) format waktu tanggal. Anda mungkin perlu versi pendek dari ini, misalnya,yyyy-MM-dd'T'HH:mm:s atauyyyy-MM-ddSitemap
    * yyMMddHHmmss.SSS -- yang merupakan versi kompak dari format waktu tanggal ISO 8601. Anda mungkin perlu versi pendek dari ini, misalnya, yyMMddHmms atau yyMMdd.
    * Login H:mm:ss.SSS -- yang merupakan format tanggal u.S. slash. Anda mungkin perlu versi pendek dari ini, misalnya, M/d/yyyy .
    * Sitemap (e.g, 001 = Jan 1, 365 = 31 Desember dalam setahun non-leap; ini kadang-kadang erroneously disebut tanggal Julian) Sitemap Anda mungkin perlu versi pendek dari ini, misalnya, yyDDD.
    
Jika Anda menggunakan DataType pseudo ini, tambahkan ini ke variabel baru&lt;addAttributesSitemap
```
        <att name="units">seconds since 1970-01-01T00:00:00Z</att>  
```
Jika Anda ingin mengubah semua nilai waktu, pergeserkan nilai waktu dalam unit, misalnya,
19-01-01T12:00Z.
*    *Login* Login Ini adalah[ekspresi reguler](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  ([Login](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) yang mencakup kelompok capture (Login) yang menjelaskan cara mengekstrak nilai dari nama file atau nilai atribut global. Misalnya, mengingat nama file seperti S19980011998031.L3b\\_MO\\_CHL.nc, menangkap grup #1, "\\dLogin", dalam ekspresi biasa S (Login\\dLogin) Login\\dLogin\\.L3b.\\* akan menangkap 7 digit pertama setelah 'S': 1998001.
*    *Sitemap* Login Ini adalah jumlah kelompok capture (dalam sepasang orang tua) dalam ekspresi reguler yang berisi informasi minat. Biasanya 1, kelompok penangkapan pertama. Kadang-kadang Anda perlu menggunakan kelompok capture untuk tujuan lain di regex, maka nomor kelompok capture penting akan 2 (kelompok capture kedua) atau 3 (ketiga) Sitemap

Contoh penuh dariaxisVariableyang membuat dataset agregat dengan sumbu waktu baru yang mendapatkan nilai waktu dari nama file setiap file adalah
```
      <axisVariable>
        <sourceName>\\*\\*\\*fileName,timeFormat=yyyyDDD,S(\\d{7})\\.L3m.\\*,1</sourceName>
        <destinationName>time</destinationName>
      </axisVariable>
```
Ketika Anda menggunakan "timeFormat=" data pseudo Jenis,ERDDAP™akan menambahkan 2 atribut keaxisVariablesehingga mereka muncul untuk datang dari sumber:
```
    <att name="standard\\_name">time</att>  
    <att name="units">seconds since 1970-01-01T00:00:00Z</att>  
```
Jadi dalam kasus ini,ERDDAP™akan membuat sumbu baru bernama"time"dengan nilai ganda (detik sejak 1970-01-01T00:00Z) dengan mengekstrak 7 digit setelah 'S' dan sebelum ".L3m" dalam nama file dan menafsirkan mereka sebagai nilai waktu yang diformat sebagai yyDDD.

Anda dapat menimpa waktu dasar default (19-01-01T00:00Z) dengan menambahkan[Login](#addattributes)yang menentukan atribut unit yang berbeda dengan waktu dasar yang berbeda. Situasi umum adalah: ada kelompok file data, masing-masing dengan komposit 1 hari dari dataset satelit, di mana Anda ingin nilai waktu untuk tidak ada hari yang disebutkan dalam nama file (waktu terpusat setiap hari) dan ingin variabellong\\_nameuntuk menjadi "Waktu Berpusat". Contoh yang melakukan ini adalah:
```
      <axisVariable>
        <sourceName>\\*\\*\\*fileName,timeFormat=yyyyDDD,S(\\d{7})\\.L3m.\\*,1</sourceName>
        <destinationName>time</destinationName>
        <addAttributes>
          <att name="long\\_name">Centered Time</att>
          <att name="units">seconds since 1970-01-01T12:00:00Z</att>
        </addAttributes>
      </axisVariable>
```
Jam catatan = 12 dalam waktu dasar, yang menambahkan 12 jam relatif ke waktu dasar asli 1970-01T00:00Z.

Contoh penuh dariaxisVariableyang membuat dataset agregat dengan sumbu "run" baru (dengan nilai int) yang mendapatkan nilai lari dari atribut global "runID" di setiap file (dengan nilai seperti "r17\\_global", di mana 17 adalah nomor lari) Sitemap
```
      <axisVariable> 
        <sourceName>\\*\\*\\*global:runID,int,(r|s)(\\d+)\\_global,2</sourceName>
        <destinationName>run</destinationName>
        <addAttributes>
          <att name="ioos\\_category">Other</att>
          <att name="units">count</att>
        </addAttributes>
      </axisVariable>
```
Perhatikan penggunaan nomor kelompok capture 2 untuk menangkap digit yang terjadi setelah 'r' atau 's', dan sebelum "\\_global". Contoh ini juga menunjukkan bagaimana menambahkan atribut tambahan (Loginioos\\_categorydan unit) ke variabel sumbu.
     
#### File terkompresi secara eksternal{#externally-compressed-files} 
* DatabaseEDDGridDari File dan EDDTable Dari File dapat melayani data langsung dari file data terkompresi secara eksternal, termasuk.tgzLogin.tar.gzLogin.tar.gzipLogin.gzLogin.gzipLogin.zipLogin.bz2.Z file.
     
*    **Ini bekerja dengan sangat baik&#33;**   
Dalam kebanyakan kasus, perlambatan yang terkait dengan menekan file data kecil dan menengah kecil. Jika Anda perlu untuk menghemat ruang disk, kami sangat mendorong menggunakan fitur ini, terutama untuk file yang lebih tua yang jarang diakses.
     
*    **Simpan uang&#33;**   
Ini adalah salah satu dari beberapa fitur dalamERDDAP™yang menawarkan kesempatan untuk menghemat banyak uang (meskipun pada biaya kinerja yang sedikit menurun) Sitemap Jika rasio kompresi adalah misalnya, 6: 1 (kadang-kadang akan jauh lebih tinggi) , maka file dataset hanya akan membutuhkan 1/6 ruang disk. Kemudian mungkin Anda bisa mendapatkan dengan 1 RAID (dari ukuran tertentu) bukan 6 RAIDS (ukuran yang sama) Sitemap Itu adalah penghematan biaya besar. Mudah-mudahan, kemampuan untuk mengompres beberapa file dalam koleksi (yang lebih tua?) dan tidak mengompresi orang lain (yang lebih baru?) , dan untuk mengubah bahwa setiap saat, mari kita meminimalkan downside untuk mengompres beberapa file (akses yang lebih lambat) Sitemap Dan jika pilihan antara menyimpan file pada pita (dan hanya dapat diakses berdasarkan permintaan, setelah penundaan) vs menyimpan mereka dikompresi pada RAID (dan dapat diakses melaluiERDDAP) , maka ada keuntungan besar untuk menggunakan kompresi sehingga pengguna mendapatkan interaktif dan (Sitemap) akses cepat ke data. Dan jika ini dapat menyimpan Anda dari membeli RAID tambahan, fitur ini dapat menghemat sekitar $ 30.000.
     
* Untuk semuaEDDGridDari Files subclasses, jika file data memiliki ekstensi yang menunjukkan bahwa file yang dikompresi secara eksternal (saat ini:.tgzLogin.tar.gzLogin.tar.gzipLogin.gzLogin.gzipLogin.zipLogin.bz2Sitemap) LoginERDDAP™akan menghapus file ke direktori cache dataset ketika membacanya Meme it (jika mereka belum cache Meme it) Sitemap Hal yang sama berlaku untuk file biner (Login.nc) subclasses dari EDDTableDariFiles.
     
* Untuk EDDTableDari File subclasses untuk file non-binary (Sitemap) , file data dengan ekstensi yang menunjukkan bahwa file terkompresi secara eksternal akan terdekompresi pada-the-fly sebagai file dibaca.
     
* PERSYARATAN: Jika jenis file terkompresi eksternal yang digunakan (Login.tgzSitemap.zip) mendukung lebih dari 1 file di dalam file terkompresi, file terkompresi harus berisi hanya 1 file.
     
* PERSYARATAN: Fitur ini mengasumsikan bahwa isi dari file terkompresi eksternal tidak berubah, sehingga file yang terdekompresi cache dapat digunakan kembali. Jika beberapa atau semua file dataset kadang-kadang berubah, jangan kompres file tersebut. Ini konsisten dengan penggunaan umum, karena orang-orang tidak biasanya mengompres file yang kadang-kadang perlu berubah.
     
*   &lt;fileNameRegex&gt; Untuk membuat pekerjaan ini, dataset&lt;fileNameRegex&gt; harus mencocokkan nama file terkompresi. Jelas, regexe seperti .\\*akan mencocokkan semua nama file. Jika Anda menentukan jenis file tertentu, misalnya, .\\*Login.nc, maka Anda perlu memodifikasi regex untuk menyertakan ekstensi kompresi juga, misalnya, .\\ *Login.ncLogin.gz(jika semua file akan* Sitemap.nc.gzfile
     
* Ini baik jika dataset Anda termasuk campuran file terkompresi dan tidak terkompresi. Ini mungkin berguna jika Anda percaya bahwa beberapa file (e.g., file lama) akan digunakan kurang sering dan karena itu akan berguna untuk menghemat ruang disk dengan mengompresi mereka. Untuk membuat pekerjaan ini,&lt;fileNameRegex&gt; harus mencocokkan nama file terkompresi dan tidak terkompresi, misalnya, .\\*atau .\\*Login.nc (|Login.gz) (Di mana kelompok penangkapan pada akhir yang menentukan Meme it.gzadalah opsional.
     
* Ini baik jika Anda mengompres atau menghapus file tertentu dalam koleksi setiap saat.
Jika dataset tidak menggunakan [&lt;Login (Login) Dataset[Login](/docs/server-admin/additional-information#flag)SitemapERDDAP™untuk memuat ulang dataset dan dengan demikian melihat perubahan. Menariknya, Anda dapat menggunakan algoritma dan pengaturan kompresi yang berbeda untuk file yang berbeda dalam dataset yang sama (Login.bz2untuk file yang jarang digunakan,.gzuntuk tidak sering digunakan file, dan tidak ada kompresi untuk file yang sering digunakan) , pastikan bahwa regex mendukung semua ekstensi file yang digunakan, misalnya, .\\*\\.nc (|Login.gz|Login.bz2) Sitemap
     
* Tentu saja, rasio kompresi dan kecepatan untuk algoritma kompresi yang berbeda bervariasi dengan file sumber dan pengaturan (e.g., tingkat kompresi) Sitemap Jika Anda ingin mengoptimalkan sistem ini untuk file Anda, lakukan uji metode kompresi yang berbeda dengan file Anda dan dengan berbagai pengaturan kompresi. Jika Anda ingin sangat baik (tidak tentu yang terbaik Meme it) setup, kami akan sedikit merekomendasikangzip  (.gz) Sitemapgziptidak membuat file terkompresi terkecil (itu cukup dekat Meme it) tetapi mengompresi file dengan sangat cepat dan (lebih penting untukERDDAP™Login) menghapus file dengan sangat cepat. Sitemapgzipperangkat lunak datang standar dengan setiap instalasi Linux dan Mac OS dan tersedia untuk Windows melalui alat gratis seperti 7Zip dan add-on Linux seperti Git Bash. Misalnya, untuk mengompresi file sumber ke dalam.gzversi file (nama file yang sama, tetapi dengan.gzSitemap) Sitemap (di Linux, Mac OS, dan Git Bash)   
    gzip  *sourceName*   
Untuk depresi.gzfile kembali ke asli, gunakan
Login *sourceName.gz*   
Untuk mengompresi setiap file sumber di direktori dan subdirectoriesnya, berulang kali, gunakan
    gzipLogin *Login*   
Untuk menekan setiap.gzfile di direktori dan subdirectoriesnya, berulang kali, gunakan
Login *Login*   
     
* PERINGATAN: Jangan kompres eksternal (gzip) file yang sudah dikompresi secara internal&#33;
Banyak file sudah memiliki data terkompresi secara internal. Sitemapgzipfile ini, file yang dihasilkan tidak akan jauh lebih kecil (&lt;5% danERDDAP™akan membuang waktu menekan mereka ketika perlu membacanya. Meme it Contoh:
    
    * file data: misalnya,.nc4, dan.hdf5 file: Beberapa file menggunakan kompresi internal; beberapa tidak. Bagaimana cara memberitahu: variabel terkompresi memiliki atribut "\\_ChunkSize". Juga, jika sekelompok gridded.ncSitemap.hdffile adalah semua ukuran yang berbeda, mereka kemungkinan terkompresi secara internal. Jika mereka semua ukuran yang sama, mereka tidak terkompresi secara internal.
    * file gambar: misalnya, .gif, .jpg, dan .png
    * file audio: misalnya, .mp3, dan .ogg.
    * file video: misalnya, .mp4, .ogv, dan .webm.
    
        
Satu kasus aneh yang sayang: file audio .wav sangat besar dan tidak dikompresi secara internal. Akan bagus untuk kompres (gzip) mereka, tetapi umumnya Anda tidak boleh karena jika Anda melakukannya, pengguna tidak akan dapat memainkan file terkompresi di browser mereka.
     
* Uji Kasus: mengompres (Logingzip) dataset dengan 1523 gridded.ncLogin
    
    * Data dalam file sumber jarang (banyak nilai yang hilang) Sitemap
    * Total ruang disk pergi dari 57 GB sebelum kompresi ke 7 GB setelah.
    * Permintaan banyak data dari 1 titik waktu&lt;1 sebelum dan setelah kompresi.
    * Permintaan untuk 1 titik data untuk poin waktu 365 (situasi kasus terburuk) pergi dari 4 s ke 71 s.
         
    
Bagi saya yang merupakan perdagangan yang wajar untuk setiap dataset, dan tentunya untuk dataset yang jarang digunakan.
     
* Internal versus kompresi eksternal --
Dibandingkan dengan kompresi file internal yang ditawarkan oleh.nc4 dan.hdf5 file,ERDDAP's pendekatan untuk file biner terkompresi eksternal memiliki kelebihan dan kekurangan. Kerugian adalah: untuk satu kali membaca bagian kecil dari satu file, kompresi internal lebih baik karenaEDDGridDariFiles hanya perlu menekan beberapa chunk (Login) file, bukan seluruh file. LoginERDDAPpendekatan 's memiliki beberapa keunggulan:
    
    *   ERDDAP™mendukung kompresi semua jenis file data (biner dan non-binary, misalnya,.nc3 dan .csv) Sitemap.nc4 dan.hdf4. Oktober
    * Jika sebagian besar file perlu dibaca lebih dari sekali dalam jangka waktu singkat, maka menghemat waktu untuk menekan file sekali dan membacanya banyak kali. Ini terjadiERDDAP™ketika pengguna menggunakan Make-A-Graph untuk dataset dan membuat serangkaian perubahan kecil ke grafik.
    * Kemampuan untuk memiliki file terkompresi dan tidak file terkompresi dalam koleksi yang sama, memungkinkan Anda kontrol lebih dari file mana yang dikompresi dan yang tidak. Dan kontrol tambahan ini datang tanpa benar-benar memodifikasi file sumber (karena Anda dapat mengompres file dengan misalnya,.gzdan kemudian depresi untuk mendapatkan file asli) Sitemap
    * Kemampuan untuk mengubah kapan saja apakah file yang diberikan dikompresi dan bagaimana dikompresi (algoritma dan pengaturan yang berbeda) memberi Anda lebih banyak kontrol atas kinerja sistem. Dan Anda dapat dengan mudah memulihkan file yang tidak terkompresi asli setiap saat.
    
Meskipun tidak ada pendekatan adalah pemenang dalam semua situasi, jelas bahwa Meme itERDDAPKemampuan untuk melayani data dari file terkompresi eksternal membuat kompresi eksternal alternatif yang wajar untuk kompresi internal yang ditawarkan oleh.nc4 dan.hdf5. Juli Itu signifikan mengingat bahwa kompresi internal adalah salah satu alasan utama orang memilih untuk digunakan.nc4 dan.hdf5. Juli
     
##### Dekompresi Cache{#decompressed-cache} 
ERDDAP™membuat versi terdekompresi dari setiap biner terkompresi (Login.nc) file data ketika perlu membaca file. File yang terdekompresi disimpan di direktori dataset dalam *Login* Sitemap File terdepresi yang belum digunakan baru-baru ini akan dihapus untuk membebaskan ruang ketika ukuran file kumulatif adalah &gt; 10GB. Anda dapat mengubahnya dengan mengatur&lt;Sitemap (default=10) Sitemap Sitemap
```
        <decompressedCacheMaxGB>40</decompressedCacheMaxGB>  
```
Juga, file terdekompresi yang belum digunakan dalam 15 menit terakhir akan dihapus pada awal setiap reload dataset utama. Anda dapat mengubahnya dengan mengatur&lt;Sitemap (default=15) Sitemap Sitemap
```
        <decompressedCacheMaxMinutesOld>60</decompressedCacheMaxMinutesOld>  
```
Nomor yang lebih besar bagus, tetapi ukuran kumulatif dari file yang terdekompresi dapat menyebabkan *Login* untuk menjalankan ruang disk, yang menyebabkan masalah parah.
     
* Karena menekan file dapat mengambil jumlah waktu yang signifikan (0,1 hingga 10 detik) Dataset dengan file terkompresi dapat mendapatkan manfaat dari pengaturan dataset [&lt;Sitemap (Login) pengaturan ke nomor yang lebih tinggi (Sitemap Sitemap 4?) Sitemap Sisi ke angka yang lebih tinggi (g., 5? 6? Sitemap) adalah mengurangi kembali dan bahwa satu permintaan pengguna kemudian dapat menggunakan persentase tinggi dari sumber daya sistem, sehingga secara signifikan memperlambat pemrosesan permintaan pengguna lain. Dengan demikian, tidak ada pengaturan nThreads yang ideal, hanya konsekuensi yang berbeda dalam situasi yang berbeda dengan pengaturan yang berbeda.
         
#### Nilai Dimensi Terurut{#sorted-dimension-values} 
Nilai untuk setiap dimensi MUST dalam urutan yang diurutkan (naik atau turun, kecuali untuk yang pertama (Login) dimensi yang harus berakhir) Sitemap Nilai-nilai dapat disampingkan. Tidak ada hubungan. Ini adalah persyaratan[Standar metadata CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)Sitemap Jika nilai dimensi tidak dalam urutan yang diurutkan, dataset tidak akan dimuat danERDDAP™akan mengidentifikasi nilai pertama yang tidak disortasi dalam file log, *Login* Login
    
Unsorted nilai dimensi hampir selalu menunjukkan masalah dengan dataset sumber. Ini paling sering terjadi ketika file yang salah atau tidak pantas disertakan dalam agregasi, yang mengarah pada dimensi waktu yang tidak disortir. Untuk memecahkan masalah ini, lihat pesan kesalahan di Meme itERDDAP™file log.txt untuk menemukan nilai waktu offending. Kemudian lihat file sumber untuk menemukan file yang sesuai (atau satu sebelum atau satu setelah) yang tidak termasuk dalam agregasi. Meme it
    
#### Login{#directories} 
File MEI berada di satu direktori, atau di direktori dan subdirectoriesnya (Sitemap) Sitemap Jika ada sejumlah besar file (misalnya, &gt; 1,000) , sistem operasi (danEDDGridLogin) akan beroperasi lebih efisien jika Anda menyimpan file dalam serangkaian subdirectories (satu per tahun, atau satu per bulan untuk dataset dengan file yang sangat sering) , sehingga tidak pernah ada sejumlah besar file dalam direktori tertentu.
     
#### &lt;Login{#cachefromurl} 
SitemapEDDGridDariFiles dan semua dataset EDDTableDariFiles mendukung satu set tag yang memberitahukanERDDAP™untuk mengunduh dan memelihara salinan semua file dataset jarak jauh, atau cache beberapa file (download sesuai kebutuhan) Sitemap Ini bisa sangat berguna. Sitemap[Login Sitemap](#cachefromurl)Sitemap
    
#### Direktori Jarak Jauh dan Permintaan Rentang HTTP{#remote-directories-and-http-range-requests} 
 (AKA Byte Melayani, Byte Range Permintaan, Accept-RangeshttpLogin)   
EDDGridDariNcFiles, EDDTableDariMultidimNcFiles, EDDTableDariNcFiles, dan EDDTableDariNcCFFiles, dapat *Sitemap* Database.ncfile pada server jarak jauh dan diakses melalui HTTP jika server mendukung[Login](https://en.wikipedia.org/wiki/Byte_serving)melalui permintaan rentang HTTP (mekanisme HTTP untuk melayani byte) Sitemap Ini mungkin karena netcdf-java (SitemapERDDAP™Login.ncLogin) mendukung data membaca dari jarak jauh.ncfile melalui permintaan rentang HTTP.

 **Jangan melakukan ini&#33;** Ini tidak efisien dan lambat.
Alih-alih, gunakan [&lt;cacheDariUrl&gt; sistem] (Login) Sitemap

LoginERDDAP™dataset sebagai file melalui permintaan rentang byte --
Membalikkan ini di sekitar, mengingat bahwa Anda dapat (dalam teori) berpikir dataset dalamERDDAP™sebagai raksasa.ncfile dengan appending ".ncLoginDAPURL untuk dataset yang diberikan (Login https://myserver.org/erddap/griddap/datasetID.nc dan juga dengan menambahkan?query setelah itu untuk menentukan subset) , mungkin wajar untuk bertanya apakah Anda dapat menggunakan netcdf-java,Ferretatau beberapa lainnyaNetCDFsoftware klien untuk membaca data melalui Permintaan Jangkauan HTTP dariERDDAPSitemap Jawabannya tidak ada, karena tidak ada yang sangat besar ".ncLogin Jika Anda ingin melakukan ini, bukan salah satu opsi ini:

* Sitemap(OPeN)DAPsoftware klien untuk terhubung ke layanan griddap yang ditawarkan olehERDDAPSitemap Itu adalah apaDAP  (danERDDAP) dirancang untuk. Sangat efisien.
* Atau, unduh file sumber (Login) dari"files"sistem (atau file subset melalui.ncSitemap Login) ke komputer Anda dan gunakan netcdf-java,Ferretatau beberapa lainnyaNetCDFsoftware klien untuk membaca (Sitemap) file lokal (Login) Sitemap
         
#### Informasi File Cached{#cached-file-information} 
SitemapEDDGridDari Files dataset pertama dimuat,EDDGridDariFiles membaca informasi dari semua file yang relevan dan membuat tabel (satu baris untuk setiap file) dengan informasi tentang setiap file yang valid dan masing-masing "buruk" (berbeda atau tidak valid) Login
* Tabel juga disimpan di disk, sepertiNetCDFg.ncfile di *Login* Login *Sitemap* Sitemap *datasetID* / dalam file bernama:
Login.nc  (yang memegang daftar nama direktori unik) Login
Login Login.nc  (yang memegang tabel dengan setiap informasi file yang valid) Login
Login.nc  (yang memegang tabel dengan setiap informasi file yang buruk) Sitemap
* Untuk mempercepat akses keEDDGridDariFiles dataset (tetapi dengan biaya menggunakan lebih banyak memori) Anda dapat menggunakan
>   [<fileTableInMemory>true</fileTableInMemory>](#filetableinmemory)  
SitemapERDDAP™untuk menyimpan salinan tabel informasi file dalam memori.
* Salinan tabel informasi file di disk juga berguna ketikaERDDAP™dimatikan dan direstart: menyimpanEDDGridDari File yang harus dibaca kembali semua file data.
* Ketika dataset diisi ulang,ERDDAP™hanya perlu membaca data dalam file dan file baru yang telah berubah.
* Jika file memiliki struktur yang berbeda dari file lain (misalnya, jenis data yang berbeda untuk salah satu variabel, atau nilai yang berbeda untuk "[Login](#units)" atribut) LoginERDDAPmenambahkan file ke daftar file "buruk". Informasi tentang masalah dengan file akan ditulis ke *Login* /logs/log.txt.
* Anda tidak perlu menghapus atau bekerja dengan file ini. Satu pengecualian adalah: jika Anda masih membuat perubahan pada datasetdatasets.xmlsetup, Anda mungkin ingin menghapus file ini untuk memaksaERDDAP™untuk membaca semua file sejak file akan dibaca/interpreted berbeda. Jika Anda pernah perlu menghapus file ini, Anda dapat melakukannya ketikaERDDAP™berjalan. (Kemudian atur[Login](/docs/server-admin/additional-information#set-dataset-flag)untuk memuat ulang dataset ASAP.) LoginERDDAP™biasanya memperhatikan bahwadatasets.xmlinformasi tidak sesuai dengan file Informasi tabel dan menghapus tabel file secara otomatis.
* Jika Anda ingin mendorongERDDAP™untuk memperbarui informasi dataset yang tersimpan (misalnya, jika Anda hanya menambahkan, dihapus, atau mengubah beberapa file ke direktori dataset) , gunakan[sistem bendera](/docs/server-admin/additional-information#flag)kekuatanERDDAP™untuk memperbarui informasi file yang tersimpan.
         
#### Permintaan Penanganan{#handling-requests} 
Ketika permintaan klien untuk data diproses,EDDGridDari File dapat dengan cepat melihat tabel dengan informasi file yang valid untuk melihat file mana yang memiliki data yang diminta.
     
#### Memperbarui Informasi File Cached{#updating-the-cached-file-information} 
Kapan pun dataset diisi ulang, informasi file yang tersimpan diperbarui.
    
* Dataset diisi ulang secara berkala sebagaimana ditentukan oleh&lt;reloadEveryNMinutes&gt; dalam informasi dataset dalamdatasets.xmlSitemap
* DatabaseERDDAP™mendeteksi bahwa Anda telah menambahkan, dihapus,[Sitemap](https://en.wikipedia.org/wiki/Touch_(Unix)Sitemap (untuk mengubah file terakhir Waktu yang dimodifikasi) , atau mengubah file data.
* Dataset diisi ulang sesegera mungkin jika Anda menggunakan[sistem bendera](/docs/server-admin/additional-information#flag)Sitemap

Ketika dataset diisi ulang,ERDDAP™membandingkan file yang tersedia saat ini ke tabel informasi file yang tersimpan. File baru dibaca dan ditambahkan ke tabel file yang valid. File yang tidak lagi ada dijatuhkan dari tabel file yang valid. File di mana file timestamp telah berubah dibaca dan informasi mereka diperbarui. Tabel baru menggantikan tabel lama dalam memori dan pada disk.
     
#### Login{#bad-files} 
Tabel file buruk dan alasan file dinyatakan buruk (file rusak, variabel hilang, dll.) email ke email Sitemap Untuk alamat email (mungkin Anda Meme it) setiap kali dataset diisi ulang. Anda harus mengganti atau memperbaiki file ini sesegera mungkin.
     
#### variabel hilang{#missing-variables} 
Jika beberapa file tidak memiliki beberapa filedataVariabledatasetdatasets.xmlLogin SitemapEDDGridDariFiles membaca salah satu file tersebut, itu akan bertindak seolah-olah file memiliki variabel, tetapi dengan semua nilai yang hilang.
     
#### FTP/Advice{#ftp-troubleadvice} 
Jika Anda FTP file data baru ke Meme itERDDAP™server sementaraERDDAP™berjalan, ada kesempatan bahwa Meme itERDDAP™akan memuat ulang dataset selama proses FTP. Hal ini terjadi lebih sering daripada yang mungkin Anda pikirkan&#33; Jika terjadi, file akan muncul valid (memiliki nama yang valid) tapi file tidak valid. Meme it SitemapERDDAP™mencoba membaca data dari file yang tidak valid, kesalahan yang dihasilkan akan menyebabkan file ditambahkan ke tabel file yang tidak valid. Ini tidak baik. Untuk menghindari masalah ini, gunakan nama file sementara ketika FTP'ing file, misalnya, ABC2005.nc\\_TEMP . Kemudian, fileNameRegex tes (Sitemap) akan menunjukkan bahwa ini bukan file yang relevan. Meme it Setelah proses FTP selesai, mengubah nama file ke nama yang benar. Proses renaming akan menyebabkan file menjadi relevan secara instan.
     
#### "0 file" Pesan Kesalahan{#0-files-error-message-1} 
Jika Anda menjalankan[Login](#generatedatasetsxml)Sitemap[Login](#dasdds)atau jika Anda mencoba memuatEDDGridDari...Files dataset diERDDAP™, dan Anda mendapatkan pesan kesalahan "0" yang menunjukkan bahwa Meme itERDDAP™menemukan 0 file pencocokan di direktori (ketika Anda berpikir bahwa ada file yang cocok di direktori itu) Sitemap
    * Periksa bahwa file benar-benar ada di direktori itu.
    * Periksa ejaan nama direktori.
    * Login Sangat mudah untuk membuat kesalahan dengan regexe. Untuk tujuan pengujian, coba regex .\\* yang harus sesuai dengan semua nama file. (Lihat ini[database](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)Login[Login](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)Sitemap) 
    * Periksa bahwa pengguna yang menjalankan program (e.g., user=tomcat (Sitemap) untuk Tomcat/ERDDAP) memiliki izin 'read' untuk file-file tersebut.
    * Dalam beberapa sistem operasi (misalnya, SELinux) dan tergantung pada pengaturan sistem, pengguna yang menjalankan program harus memiliki izin 'read' untuk seluruh rantai direktori yang mengarah ke direktori yang memiliki file.
         
#### EDDGridDariFiles skeleton Login{#eddgridfromfiles-skeleton-xml} 
*    **XML Sitemap** untuk semuaEDDGridDari subklas Files adalah:

>&nbsp;&nbsp;&lt;dataset type="EDDGridFrom...Files" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromFiles subclasses, this uses Java's WatchDirectory system   
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to notice new/deleted/changed files quickly and efficiently. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileDir>...&lt;/fileDir> &lt;-- The directory (absolute) with the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;data files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;recursive>true|false&lt;/recursive> &lt;!-- 0 or 1. Indicates if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;subdirectories of fileDir have data files, too. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileNameRegex>...&lt;/fileNameRegex> &lt;-- 0 or 1. A  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) describing valid data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;file names, for example, ".\\*\\.nc" for all .nc files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;metadataFrom>...&lt;/metadataFrom> &lt;-- The file to get  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;metadata from ("first" or "last" (the default) based on file's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lastModifiedTime). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;false (the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheFromUrl>](#cachefromurl)...&lt;/cacheFromUrl> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheSizeGB>](#cachefromurl)...&lt;/cacheSizeGB> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;axisVariable>](#axisvariable)...&lt;/axisVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDD*DariAudioFiles{#eddfromaudiofiles} 
 **EDDGridSitemap** Login **Datasheet** agregat data dari koleksi file audio lokal. (Ini pertama muncul diERDDAP™v1.82.) Perbedaannya adalahEDDGridDari AudioFiles memperlakukan data sebagai dataset multidimensional (biasanya dengan 2 dimensi:\\[API Sitemap\\]Login\\[Login Waktu dalam file\\]) , sedangkan EDDTableDariAudioFiles memperlakukan data sebagai data tabel (biasanya dengan kolom untuk startTime file, elapdTime dengan file, dan data dari saluran audio) SitemapEDDGridDari AudioFiles membutuhkan semua file memiliki jumlah sampel yang sama, jadi jika tidak benar, Anda harus menggunakan EDDTableDariAudioFiles. Jika tidak, pilihan tipe EDD untuk digunakan sepenuhnya pilihan Anda. Salah satu keuntungan dari EDDTableDariAudioFiles: Anda dapat menambahkan variabel lain dengan informasi lain, misalnya,stationIDLogin Dalam kedua kasus, kurangnya variabel waktu terpadu membuatnya lebih sulit untuk bekerja dengan data dari jenis EDD ini, tetapi tidak ada cara yang baik untuk mengatur variabel waktu terpadu.

Lihat kelas kelas ini,[EDDGridLogin](#eddgridfromfiles)Login[Login](#eddtablefromfiles)Informasi umum tentang bagaimana kelas ini bekerja dan bagaimana menggunakannya.

Kami sangat merekomendasikan menggunakan[Login Program Xml](#generatedatasetsxml)untuk membuat draft kasar daridatasets.xmlchunk dataset ini. Karena file audio tidak memiliki metadata selain informasi yang terkait dengan pengkodean data suara, Anda harus mengedit output dari GenerateDatasets Xml untuk memberikan informasi penting (e.g., judul, ringkasan,creator\\_nameLembaga, sejarah) Sitemap

Sitemap

* Ada sejumlah besar format file audio. SitemapERDDAP™dapat membaca data dari sebagian besar file .wav dan .au. Saat ini tidak dapat membaca jenis file audio lainnya, misalnya, .aiff atau .mp3. Jika Anda butuh dukungan untuk format file audio lainnya atau varian lain dari .wav dan .au, silakan email permintaan Anda ke Chris. John di noaaa.gov . Atau, sebagai workaround Anda dapat menggunakan sekarang, Anda dapat mengonversi file audio Anda ke PCM\\_ Login (untuk data integer) atau PCM\\_FLOAT (untuk data titik mengambang) .wav file sehinggaERDDAP™bisa bekerja dengan mereka.
* SitemapERDDAP™dapat membaca file audio dengan apaJava's AudioFormat panggilan kelas PCM\\_FLOAT, PCM\\_SIGNED, PCM\\_UNSIGNED, ALAW, dan pengkodean ULAW.ERDDAP™mengkonversi nilai PCM\\_UNSIGNED (g., 0 hingga 255) menandatangani nilai (g., -128 untuk 128) dengan mengatur ulang bit dalam nilai data.ERDDAP™mengkonversi ALAW dan ULAW dikodekan dari format byte asli mereka menjadi pendek (dit16) Sitemap SitemapJavaingin bigEndian=true data,ERDDAP™mengatur ulang byte data yang disimpan dengan besarEndian=false (Login) untuk membaca nilai dengan benar. Untuk semua pengkodean lain (Login) LoginERDDAP™membaca data seperti.
* SitemapERDDAP™membaca data dari file audio, mengkonversi metadata audio file yang tersedia menjadi atribut global. Ini akan selalu termasuk (dengan nilai sampel yang ditunjukkan) 
    
String audioBigEndian "false"; //true atau palsu
int audio Saluran 1;
String audioEncoding "PCM\\_SIGNED";
mengapung audioFrameRate 96000.0; //per detik
int audioFrameSize 2; //# data byte per bingkai
96000.0; //per detik
int audioSampleSizeInBits 16; //# bit per sampel
    
SitemapERDDAP's tujuan, bingkai identik dengan sampel, yang merupakan data untuk satu titik dalam waktu.
Atribut diERDDAP™akan memiliki informasi yang menggambarkan data karena dalam file sumber.ERDDAP™seringkali telah mengubah ini sambil membaca data, misalnya, PCM\\_UNSIGNED, ALAW, dan data yang dikodekan ULAW dikonversi ke PCM\\_SIGNED, dan data endian besar dikonversi ke data besarEndian=true data (itulah bagaimanaJavaingin membacanya) Sitemap Pada akhir, nilai data diERDDAP™akan selalu menjadi[Login](https://en.wikipedia.org/wiki/Pulse-code_modulation)nilai data (i.e., sampel digital sederhana dari gelombang suara) Sitemap
* SitemapERDDAP™membaca data dari file audio, membaca seluruh file.ERDDAP™dapat membaca sebanyak sekitar 2 miliar sampel per saluran. Misalnya, jika tingkat sampel adalah 44,100 sampel per detik, 2 miliar sampel diterjemahkan ke sekitar 756 menit data suara per file. Jika Anda memiliki file audio dengan lebih dari jumlah data ini, Anda perlu memecah file menjadi potongan yang lebih kecil sehinggaERDDAP™bisa membacanya.
* SitemapERDDAP™membaca seluruh file audio,ERDDAP™harus memiliki akses ke sejumlah besar memori untuk bekerja dengan file audio besar. Sitemap[ERDDAPPengaturan memori 's](/docs/server-admin/deploy-install#memory)Sitemap Sekali lagi, jika ini adalah masalah, sebuah workaround yang dapat Anda gunakan sekarang untuk memecah file ke dalam chunks yang lebih kecil sehinggaERDDAP™dapat membacanya dengan memori yang kurang.
* Beberapa file audio ditulis dengan benar.ERDDAP™membuat upaya kecil untuk berurusan dengan kasus-kasus tersebut. Tapi secara umum, ketika ada kesalahan,ERDDAP™akan membuang Kecuali (dan menolak file tersebut) Sitemap (jika kesalahan tidak terdeteksi) Login (tapi data akan salah) Sitemap
*   ERDDAP™tidak memeriksa atau mengubah volume suara. Idealnya, data audio integer berskala untuk menggunakan berbagai jenis data.
* File audio dan pemain audio tidak memiliki sistem untuk nilai yang hilang (e.g., -999 atau Float.NaN) Sitemap Jadi data audio tidak boleh memiliki nilai yang hilang. Jika ada nilai yang hilang (e.g., jika Anda perlu memperpanjang file audio) , gunakan serangkaian 0 yang akan ditafsirkan sebagai keheningan sempurna.
* SitemapERDDAP™membaca data dari file audio, selalu membuat kolom yang disebut elapd Waktu dengan waktu untuk setiap sampel, dalam detik (disimpan sebagai ganda) , relatif terhadap sampel pertama (yang ditugaskan elapd Waktu=0.0 s) Sitemap SitemapEDDGridDari AudioFiles, ini menjadi variabel sumbu elapdTime.
*   EDDGridDari AudioFiles membutuhkan semua file memiliki jumlah sampel yang sama. Jadi jika itu tidak benar, Anda harus menggunakan EDDTableDariAudioFiles.
* SitemapEDDGridDariAudioFiles, kami merekomendasikan bahwa Anda mengatur [&lt;dimensiNilaiInMemory&gt; (Login) Sitemap (direkomendasikan oleh GenerateDataset Login) , karena dimensi waktu sering memiliki sejumlah besar nilai.
* SitemapEDDGridDari AudioFiles, Anda harus hampir selalu menggunakanEDDGridDariFiles sistem untuk[Sitemap Nama file](#aggregation-via-file-names-or-global-metadata)hampir selalu dengan mengekstrak tanggal awal rekaman Waktu dari nama file. Sitemap
```
    <sourceName>\\*\\*\\*fileName,"timeFormat=yyyyMMdd'\\_'HHmmss",aco\\_acoustic\\.(\\[0-9\\]{8}\\_\\[0-9\\]{6})\\.wav,1</sourceName>
```
Login Xml akan mendorong ini dan membantu Anda dengan ini.
* Untuk EDDTableDariAudioFiles, Anda harus hampir selalu menggunakan sistem EDDTableFromFiles untuk[\\*\\*LoginsourceNameLogin](#filename-sourcenames)untuk mengekstrak informasi dari nama file (hampir selalu tanggal awal Waktu untuk rekaman) dan mempromosikannya menjadi kolom data. Sitemap
```
    <sourceName>\\*\\*\\*fileName,aco\\_acoustic\\.(\\[0-9\\]{8}\\_\\[0-9\\]{6})\\.wav,1</sourceName>
```
Format waktu kemudian harus ditentukan sebagai atribut unit:&lt;name="units"&gt;yyyMMdd'\\_'HHHmms&lt;Login
     
### EDDGridLogin{#eddgridfrommergeirfiles} 
[ **EDDGridLogin** ](#eddgridfrommergeirfiles)agregat data dari lokal,[Login](https://www.cpc.ncep.noaa.gov/products/global_precip/html/README)file, yang dari[Tropical Rainfall Mengukur Misi (Login) ](https://trmm.gsfc.nasa.gov), yang merupakan misi bersama antara NASA dan Badan Penjelajahan Aerospace Jepang (Login) Sitemap Login File IR dapat diunduh dari[Login](ftp://disc2.nascom.nasa.gov/data/s4pa/TRMM_ANCILLARY/MERG/)Sitemap

EDDGridDariMergeIRFiles.java ditulis dan berkontribusi padaERDDAP™project by Jonathan Lafite dan Philippe Makowski of R.Tech Engineering (lisensi: sumber terbuka hak cipta) Sitemap

EDDGridDariMergeIRFiles adalah sedikit tidak biasa:

*   EDDGridDariMergeIRFiles mendukung file data sumber terkompresi atau tidak terkompresi, dalam setiap kombinasi, dalam dataset yang sama. Ini memungkinkan Anda, misalnya, untuk mengompresi file yang lebih tua yang jarang diakses, tetapi uncompress file baru yang sering diakses. Atau, Anda dapat mengubah jenis kompresi dari aslinya. Z untuk contoh,.gzSitemap
* Jika Anda memiliki versi terkompresi dan tidak terkompresi dari file data yang sama di direktori yang sama, pastikan&lt;fileNameRegex&gt; untuk dataset Anda sesuai dengan nama file yang Anda inginkan untuk mencocokkan dan tidak cocok nama file yang tidak Anda inginkan.
* Uncompressed sumber file data harus tidak memiliki ekstensi file (i.e.) Sitemap
* File data sumber terkompresi harus memiliki ekstensi file, tetapiERDDAP™menentukan jenis kompresi dengan memeriksa konten file, tidak dengan melihat ekstensi file file (misalnya, ".Z") Sitemap Jenis kompresi yang didukung termasuk "gz", "bzip2", "xz", "lzma", "snappy-raw", "snappy-framed", "pack200", dan "z". SitemapERDDAP™membaca file terkompresi, dekompresi on-the-fly, tanpa menulis ke file sementara.
* Semua file data sumber harus menggunakan sistem naming file asli: yaitu, merg\\_ *Login* \\_4km-piksel (Sitemap *Login* menunjukkan waktu yang terkait dengan data dalam file) , ditambah ekstensi file jika file dikompresi.

Lihat kelas super ini,[EDDGridLogin](#eddgridfromfiles)Informasi umum tentang bagaimana kelas ini bekerja dan bagaimana menggunakannya.

Kami sangat merekomendasikan menggunakan[Login Program Xml](#generatedatasetsxml)untuk membuat draft kasar daridatasets.xmlchunk dataset ini. Anda kemudian dapat mengedit bahwa untuk tune halus itu. Meme it
 
### EDDGridLogin{#eddgridfromncfiles} 
[ **EDDGridLogin** ](#eddgridfromncfiles)data agregat dari lokal, gridded,[GRIB .grb](https://en.wikipedia.org/wiki/GRIB)file,[HDF  (v4 atau v5)  .hdf](https://www.hdfgroup.org/)file,[.ncLogin](#ncml-files)file,[NetCDF  (v3 atau v4)  .nc](https://www.unidata.ucar.edu/software/netcdf/)file, dan[Login](https://github.com/zarr-developers/zarr-python)Login (versi 2.25) Sitemap File Zarr memiliki perilaku yang sedikit berbeda dan memerlukan fileNameRegex atau pathRegex untuk menyertakan "zarr".

Ini dapat bekerja dengan jenis file lainnya (misalnya, BUFR) , kami tidak mengujinya - silakan kirim beberapa file sampel.

* Untuk file GRIB,ERDDAP™akan membuat file indeks .gbx pertama kali membaca setiap file GRIB. Jadi file GRIB harus berada di direktori di mana "user" yang menjalankan Tomcat telah membaca + menulis izin.
* Lihat kelas super ini,[EDDGridLogin](#eddgridfromfiles)Informasi tentang bagaimana kelas ini bekerja dan cara menggunakannya.
* SitemapERDDAP™v2.12,EDDGridSitemapEDDGridLogin Unpacked dapat membaca data dari "struktur" di.nc4 dan.hdf4 file. Untuk mengidentifikasi variabel yang berasal dari struktur,&lt;sourceNameSitemap harus menggunakan format: *Login* | *Login* , misalnya kelompok1/myStruct|Login
* Kami sangat merekomendasikan menggunakan[Login Program Xml](#generatedatasetsxml)untuk membuat draft kasar daridatasets.xmlchunk dataset ini. Anda kemudian dapat mengedit bahwa untuk tune halus itu. Meme it
    
#### Grup di File Nc Berbaring{#groups-in-gridded-nc-files} 
    [File Netcdf4 dapat mengandung kelompok.](#groups-in-gridded-nc-files) ERDDAP™hanya membuat dataset dari variabel dalam satu kelompok dan semua kelompok induknya. Anda dapat menentukan nama grup tertentu di GenerateDatasets Login (omit the trailing slash) , atau menggunakan "" untuk memiliki GenerateDatasets Xml mencari semua kelompok untuk variabel yang menggunakan dimensi yang paling, atau menggunakan "\\[Login\\]" untuk memiliki GenerateDatasets hanya mencari variabel dalam kelompok akar.
    
Hal pertama GenerateDatasetsXml lakukan untuk jenis dataset ini setelah Anda menjawab pertanyaan mencetak struktur seperti ncdump dari file sampel. Jadi jika Anda memasukkan beberapa jawaban goofy untuk loop pertama melalui GenerateDataset Xml, setidaknya Anda akan dapat melihat apakah Meme itERDDAP™dapat membaca file dan melihat dimensi dan variabel apa yang ada di file. Kemudian Anda dapat memberikan jawaban yang lebih baik untuk loop kedua melalui GenerateDatasetsXml.
    

### EDDGridDariNcFilesUnpacked{#eddgridfromncfilesunpacked} 
[ **EDDGridDariNcFilesUnpacked** ](#eddgridfromncfilesunpacked)adalah varian[EDDGridLogin](#eddgridfromncfiles)data agregat dari lokal, griddedNetCDF  (v3 atau v4)  .ncdan file terkait. Perbedaannya adalah bahwa kelas ini membongkar setiap file data sebelumEDDGridDariFiles melihat file:

* Variabel unpacks yang dikemas dengan[scale\\_factordan/atauadd\\_offset](#scale_factor)Sitemap
* Ini mengkonversi \\_FillValue danmissing\\_valuenilai menjadi NaN (atau MAX\\_VALUE untuk jenis data integer) Sitemap
* Ini mengubah nilai waktu dan timestamp untuk"seconds since 1970-01-01T00:00:00Z"Sitemap

Keuntungan besar dari kelas ini adalah bahwa ia memberikan cara untuk berurusan dengan nilai yang berbedascale\\_factorLoginadd\\_offset, \\_FillValue,missing\\_value, atau unit waktu dalam file sumber yang berbeda dalam koleksi. Jika tidak, Anda harus menggunakan alat seperti Meme it[Login](#ncml-files)Sitemap[NCO](#netcdf-operators-nco)untuk memodifikasi setiap file untuk menghapus perbedaan sehingga file dapat ditangani olehEDDGridLogin Untuk kelas ini untuk bekerja dengan benar, file harus mengikuti standar CF untuk atribut terkait.

* Jika mencoba membuatEDDGridLogin Unpacked dari sekelompok file yang sebelumnya Anda coba dan gagal digunakanEDDGridDariNcFiles, cd ke
     *Login* Login *Login* Sitemap *datasetID* Sitemap
Sitemap *Login* adalah 2 huruf terakhir dari Meme itdatasetIDLogin
dan menghapus semua file di direktori itu.
* SitemapERDDAP™v2.12,EDDGridSitemapEDDGridLogin Unpacked dapat membaca data dari "struktur" di.nc4 dan.hdf4 file. Untuk mengidentifikasi variabel yang berasal dari struktur,&lt;sourceNameSitemap harus menggunakan format: *Login* | *Login* , misalnya kelompok1/myStruct|Login
* Kami sangat merekomendasikan menggunakan[Login Program Xml](#generatedatasetsxml)untuk membuat draft kasar daridatasets.xmlchunk dataset ini. Anda kemudian dapat mengedit bahwa untuk tune halus itu. Meme it
    
File Netcdf4 dapat mengandung kelompok. Sitemap[dokumentasi ini](#groups-in-gridded-nc-files)Sitemap
    
Hal pertama GenerateDatasetsXml lakukan untuk jenis dataset ini setelah Anda menjawab pertanyaan adalah mencetak struktur seperti ncdump dari file sampel **Sitemap** itu tidak dikemas. Meme it Jadi jika Anda memasukkan beberapa jawaban goofy untuk loop pertama melalui GenerateDataset Xml, setidaknya Anda akan dapat melihat apakah Meme itERDDAP™dapat membaca file dan melihat dimensi dan variabel apa yang ada di file. Kemudian Anda dapat memberikan jawaban yang lebih baik untuk loop kedua melalui GenerateDatasetsXml.
    
### EDDGridLonPM180{#eddgridlonpm180} 
[ **EDDGridLonPM180** ](#eddgridlonpm180)merubah nilai garis bujur anak (Sitemap)  EDDGriddataset yang memiliki nilai longitude lebih dari 180 (misalnya, 0 hingga 360) sehingga mereka berada di kisaran -180 hingga 180 (Longitude Plus atau Minus 180, maka nama) Sitemap

* Ini menyediakan cara untuk membuat dataset yang memiliki nilai longitude lebih dari 180 compliant in/withOGCSitemap (SitemapWMSLoginERDDAP) SitemapOGClayanan memerlukan nilai longitude dalam -180 hingga 180.
* Bekerja di dekat kelangsungan menyebabkan masalah, terlepas dari apakah kelangsungan adalah longitude 0 atau di longitude 180. Jenis dataset ini memungkinkan Anda menghindari masalah untuk semua orang, dengan menawarkan dua versi dataset yang sama:
satu dengan nilai longitude dalam kisaran 0 hingga 360 ("Pasifik"?) Login
satu dengan nilai longitude dalam kisaran -180 hingga 180 ("Atlanticentric"?) Sitemap
* Untuk data set anak dengan semua nilai longitude lebih dari 180, semua nilai longitude baru hanya 360 derajat lebih rendah. Sebagai contoh, dataset dengan nilai-nilai longitude 180 hingga 240 akan menjadi dataset dengan nilai longitude dari -180 ke -120.
* Untuk dataset anak yang memiliki nilai longitude untuk seluruh dunia (kira-kira 0 sampai 360) , nilai longitude baru akan diatur kembali ke (Sitemap) -180 hingga 180:
0 asli untuk hampir 180 nilai tidak berubah.
Nilai 180 hingga 360 asli dikonversi menjadi -180 ke 0 dan beralih ke awal array longitude.
* Untuk data set anak yang mencakup 180 tetapi tidak mencakup dunia,ERDDAP™memasukkan nilai-nilai yang hilang sesuai kebutuhan untuk membuat dataset yang mencakup dunia. Sebagai contoh, dataset anak dengan nilai-nilai garis bujur 140 hingga 200 akan menjadi dataset dengan nilai longitude dari -180 hingga 180.
Nilai anak 180 hingga 200 akan menjadi -180 hingga -160.
Nilai longitude baru akan dimasukkan dari -160 ke 140. Nilai data yang sesuai akan \\_FillValues.
Nilai anak 140 hingga hampir 180 akan tidak berubah.
Penyisipan nilai-nilai yang hilang mungkin tampak aneh, tetapi menghindari beberapa masalah yang dihasilkan dari memiliki nilai-nilai longitude yang melompat tiba-tiba (g, dari -160 hingga 140) Sitemap
* Sitemap[Login](#generatedatasetsxml), ada jenis dataset khusus",EDDGridLonPM180DariErddapKatalog, yang memungkinkan Anda menghasilkandatasets.xmlSitemapEDDGridLonPM180 dataset dari masing-masingEDDGriddataset dalam sebuahERDDAPyang memiliki nilai longitude lebih dari 180. Ini memfasilitasi menawarkan dua versi dataset ini:
asli, dengan nilai longitude dalam kisaran 0 hingga 360,
dan dataset baru, dengan nilai longitude dalam kisaran -180 hingga 180.
    
Dataset anak dalam setiapEDDGridDataset LonPM180 akan menjadiEDDGridDari dataSet Erddap yang menunjuk ke dataset asli.
Dataset barudatasetIDakan menjadi nama dataset asli ditambah "\\_LonPM180".
Sitemap
```
    <dataset type="EDDGridLonPM180" datasetID="erdMBsstdmday\\_LonPM180" active="true">
      <dataset type="EDDGridFromErddap" datasetID="erdMBsstdmday\\_LonPM180Child">
        <!-- SST, Aqua MODIS, NPP, 0.025 degrees, Pacific Ocean, Daytime 
          (Monthly Composite) minLon=120.0 maxLon=320.0 -->
        <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMBsstdmday
        </sourceUrl>
      </dataset>
    </dataset> 
```
LoginEDDGridDataset LonPM180 **Sitemap** dataset asli dalamdatasets.xmlSitemap Itu menghindari beberapa masalah yang mungkin.
    
Atau, Anda dapat menggantiEDDGridDariErddap dataset anak dengan dataset aslidatasets.xmlSitemap Kemudian, hanya akan ada satu versi dataset: satu dengan nilai longitude dalam -180 hingga 180. Kami mendiskusikan ini karena ada waktu ketika setiap versi dataset lebih nyaman.
    
* Jika Anda menawarkan dua versi dataset, misalnya, satu dengan garis bujur 0 hingga 360 dan satu dengan garis bujur -180 hingga 180:
    * Anda dapat menggunakan opsional [&lt;Sitemap LoginWMSLogin&lt;Sitemap LoginWMSSitemap (Login) dengan dataset 0-360 untuk menonaktifkan Meme itWMSLayanan untuk dataset tersebut. Kemudian, hanya versi LonPM180 dari dataset akan dapat diakses melaluiWMSSitemap
    * Ada beberapa cara untuk menjaga dataset LonPM180 terbaru dengan perubahan data yang mendasari:
        * Jika dataset anak adalahEDDGridDari dataSet Erddap yang merujuk pada dataset yang samaERDDAP™Dataset LonPM180 akan mencoba untuk langsung berlangganan dataset yang mendasari sehingga selalu terbaru. Langganan langsung tidak menghasilkan email yang meminta Anda untuk memvalidasi langganan - validasi harus dilakukan secara otomatis.
        * Jika dataset anak bukanEDDGridDari dataset Erddap yang samaERDDAP™Dataset LonPM180 akan mencoba menggunakan sistem berlangganan reguler untuk berlangganan dataset yang mendasari. Jika Anda memiliki sistem berlangganan di AndaERDDAP™Anda harus mendapatkan email meminta Anda untuk memvalidasi berlangganan. Sitemap
        * Jika Anda memiliki sistem berlangganan di AndaERDDAP™mematikan, dataset LonPM180 kadang-kadang mungkin memiliki metadata yang sudah usang sampai dataset LonPM180 diisi ulang. Jadi jika sistem berlangganan dimatikan, Anda harus mengatur [&lt;Login Login (Sitemap) pengaturan data LonPM180 untuk jumlah yang lebih kecil, sehingga lebih cenderung menangkap perubahan pada dataset anak lebih cepat.

#### EDDGridLonPM180 skeleton Login{#eddgridlonpm180-skeleton-xml} 

>&nbsp;&nbsp;&lt;dataset type="EDDGridLonPM180" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromDap, this gets the remote .dds and then gets the new  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The child EDDGrid dataset. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDGridLon0360{#eddgridlon0360} 
[ **EDDGridLon0360** ](#eddgridlon0360)merubah nilai garis bujur anak (Sitemap)  EDDGriddataset yang memiliki nilai longitude kurang dari 0 (misalnya, -180 hingga 180) sehingga mereka berada dalam kisaran 0 hingga 360 (maka nama) Sitemap

* Bekerja di dekat kelangsungan menyebabkan masalah, terlepas dari apakah kelangsungan adalah longitude 0 atau di longitude 180. Jenis dataset ini memungkinkan Anda menghindari masalah untuk semua orang, dengan menawarkan dua versi dataset yang sama:
satu dengan nilai longitude dalam kisaran -180 hingga 180 ("Atlanticentric"?) Sitemap
satu dengan nilai longitude dalam kisaran 0 hingga 360 ("Pasifik"?) Login
* Untuk data set anak dengan semua nilai longitude kurang dari 0, semua nilai longitude baru hanya 360 derajat lebih tinggi. Sebagai contoh, dataset dengan nilai longitude dari -180 ke -120 akan menjadi dataset dengan nilai longitude 180 hingga 240.
* Untuk dataset anak yang memiliki nilai longitude untuk seluruh dunia (kira-kira -180 untuk 180) , nilai longitude baru akan diatur kembali ke (Sitemap) 0 hingga 360:
Nilai asli -180 hingga 0 dikonversi menjadi 180 hingga 360 dan beralih ke akhir array longitude.
0 asli untuk hampir 180 nilai tidak berubah.
* Untuk data set anak yang mencakup lon=0 tetapi tidak menutupi dunia,ERDDAP™memasukkan nilai-nilai yang hilang sesuai kebutuhan untuk membuat dataset yang mencakup dunia. Sebagai contoh, dataset anak dengan nilai-nilai garis bujur -40 hingga 20 akan menjadi dataset dengan nilai-nilai garis bujur 0 hingga 360.
Nilai anak 0 sampai 20 akan tidak berubah.
Nilai longitude baru akan dimasukkan dari 20 hingga 320. Nilai data yang sesuai akan \\_FillValues.
Nilai anak -40 hingga 0 akan menjadi 320 hingga 360.
Penyisipan nilai-nilai yang hilang mungkin tampak aneh, tetapi menghindari beberapa masalah yang dihasilkan dari memiliki nilai-nilai longitude yang melompat tiba-tiba (g, dari 20 hingga 320) Sitemap
* Sitemap[Login](#generatedatasetsxml), ada jenis dataset khusus",EDDGridLon0360Dari ErddapCatalog, yang memungkinkan Anda menghasilkandatasets.xmlSitemapEDDGridLon0360 dataset dari masing-masingEDDGriddataset dalam sebuahERDDAPyang memiliki nilai longitude lebih dari 180. Ini memfasilitasi menawarkan dua versi dataset ini:
asli, dengan nilai longitude dalam kisaran 0 hingga 360,
dan dataset baru, dengan nilai longitude dalam kisaran -180 hingga 180.
    
Dataset anak dalam setiapEDDGridLon0360 dataset akan menjadiEDDGridDari dataSet Erddap yang menunjuk ke dataset asli.
Dataset barudatasetIDakan menjadi nama dataset asli ditambah "\\_Lon0360".
Sitemap
```
    <dataset type="EDDGridLon0360" datasetID="erdMBsstdmday\\_Lon0360" active="true">
      <dataset type="EDDGridFromErddap" datasetID="erdMBsstdmday\\_Lon0360Child">
        <!-- SST, Aqua MODIS, NPP, 0.025 degrees, Pacific Ocean, Daytime 
          (Monthly Composite) minLon=-40.0 maxLon=20.0 -->
        <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMBsstdmday
        </sourceUrl>
      </dataset>
    </dataset> 
```
LoginEDDGridLon0360 dataset **Sitemap** dataset asli dalamdatasets.xmlSitemap Itu menghindari beberapa masalah yang mungkin.
    
Atau, Anda dapat menggantiEDDGridDariErddap dataset anak dengan dataset aslidatasets.xmlSitemap Kemudian, hanya akan ada satu versi dataset: satu dengan nilai longitude dalam 0 sampai 360. Kami mendiskusikan ini karena ada waktu ketika setiap versi dataset lebih nyaman.
    
* Jika Anda menawarkan dua versi dataset, misalnya, satu dengan garis bujur 0 hingga 360 dan satu dengan garis bujur -180 hingga 180:
    * Anda dapat menggunakan opsional [&lt;Sitemap LoginWMSLogin&lt;Sitemap LoginWMSSitemap (Login) dengan 0 hingga 360 dataset untuk menonaktifkanWMSLayanan untuk dataset tersebut. Kemudian, hanya -180 ke 180 versi dataset akan dapat diakses melaluiWMSSitemap
    * Ada beberapa cara untuk menjaga dataset Lon0360 terbaru dengan perubahan data yang mendasari:
        * Jika dataset anak adalahEDDGridDari dataSet Erddap yang merujuk pada dataset yang samaERDDAP™Dataset Lon0360 akan mencoba untuk langsung berlangganan dataset yang mendasari sehingga selalu terbaru. Langganan langsung tidak menghasilkan email yang meminta Anda untuk memvalidasi langganan - validasi harus dilakukan secara otomatis.
        * Jika dataset anak bukanEDDGridDari dataset Erddap yang samaERDDAP™Dataset Lon0360 akan mencoba menggunakan sistem berlangganan reguler untuk berlangganan dataset yang mendasari. Jika Anda memiliki sistem berlangganan di AndaERDDAP™Anda harus mendapatkan email meminta Anda untuk memvalidasi berlangganan. Sitemap
        * Jika Anda memiliki sistem berlangganan di AndaERDDAP™mematikan, dataset Lon0360 kadang-kadang mungkin memiliki metadata yang sudah usang sampai dataset Lon0360 diisi ulang. Jadi jika sistem berlangganan dimatikan, Anda harus mengatur [&lt;Login Login (Sitemap) pengaturan data Lon0360 untuk jumlah yang lebih kecil, sehingga lebih cenderung menangkap perubahan pada dataset anak lebih cepat.
#### EDDGridDatasheet PDF Login{#eddgridlon0360-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridLon0360" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGridFromDap, this gets the remote .dds and then gets the new  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;leftmost (first) dimension values. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- The child EDDGrid dataset. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDGridLogin{#eddgridsidebyside} 
[ **EDDGridLogin** ](#eddgridsidebyside)agregat dua atau lebihEDDGridLogin (anak-anak) sisi dengan sisi.

* Dataset yang dihasilkan memiliki semua variabel dari semua dataset anak.
* Dataset induk dan semua dataset anak MUST memiliki berbedadatasetIDSitemap Jika ada nama dalam keluarga persis sama, dataset akan gagal dimuat (dengan pesan kesalahan yang nilai-nilai sumbu agregat tidak diurutkan) Sitemap
* Semua anak MUST memiliki nilai sumber yang sama untukaxisVariableLogin\\[1 g\\]  (misalnya, latitude, longitude) Sitemap Ketepatan pengujian ditentukan oleh[Login](#matchaxisndigits)Sitemap
* Anak-anak mungkin memiliki nilai sumber yang berbeda untuk Meme itaxisVariableLogin\\[Sitemap\\]  (misalnya, waktu) tapi mereka biasanya sebagian besar sama. Meme it
* Dataset induk akan muncul untuk memiliki semua Meme itaxisVariableLogin\\[Sitemap\\]nilai sumber dari semua anak-anak.
* Misalnya, ini memungkinkan Anda menggabungkan dataset sumber dengan u-komponen vektor dan dataset sumber lain dengan v-komponen vektor, sehingga data gabungan dapat disajikan.
* Anak-anak yang diciptakan oleh metode ini diadakan secara pribadi. Dataset tidak dapat diakses secara terpisah (misalnya, oleh permintaan data klien atau oleh[file bendera](/docs/server-admin/additional-information#flag)) Sitemap
* Metadata global dan pengaturan untuk orang tua berasal dari metadata global dan pengaturan untuk anak pertama.
* Jika ada pengecualian saat membuat anak pertama, orang tua tidak akan diciptakan.
* Jika ada pengecualian saat membuat anak-anak lain, ini mengirim email ke emailEverythingTo (sebagaimana ditentukan[WordPress.org](/docs/server-admin/deploy-install#setupxml)) dan berlanjut dengan anak-anak lain.
#### EDDGridSideBySide skeleton Login{#eddgridsidebyside-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridSideBySide" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 2 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDGridLogin{#eddgridaggregateexistingdimension} 
[ **EDDGridLogin** ](#eddgridaggregateexistingdimension)agregat dua atau lebihEDDGriddataset masing-masing yang memiliki berbagai nilai untuk dimensi pertama, tetapi nilai identik untuk dimensi lain.

* Sebagai contoh, satu dataset anak mungkin memiliki nilai 366 (di 2004) untuk dimensi waktu dan anak lain mungkin memiliki nilai 365 (di 2005) untuk dimensi waktu.
* Semua nilai untuk semua dimensi lainnya (misalnya, latitude, longitude) MUST identik untuk semua anak-anak. Ketepatan pengujian ditentukan oleh[Login](#matchaxisndigits)Sitemap
* Nilai Dimensi Terurut - Nilai untuk setiap dimensi MUST dalam urutan yang diurutkan (menangguhkan atau turun) Sitemap Nilai-nilai dapat disampingkan. Tidak ada hubungan. Ini adalah persyaratan[Standar metadata CF](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)Sitemap Jika nilai dimensi tidak dalam urutan yang diurutkan, dataset tidak akan dimuat danERDDAP™akan mengidentifikasi nilai pertama yang tidak disortasi dalam file log, *Login* Login
    
Unsorted nilai dimensi hampir selalu menunjukkan masalah dengan dataset sumber. Ini paling sering terjadi ketika file yang salah atau tidak pantas disertakan dalam agregasi, yang mengarah pada dimensi waktu yang tidak disortir. Untuk memecahkan masalah ini, lihat pesan kesalahan di Meme itERDDAP™file log.txt untuk menemukan nilai waktu offending. Kemudian lihat file sumber untuk menemukan file yang sesuai (atau satu sebelum atau satu setelah) yang tidak termasuk dalam agregasi. Meme it
    
* Dataset induk dan dataset anak MUST memiliki berbedadatasetIDSitemap Jika ada nama dalam keluarga persis sama, dataset akan gagal dimuat (dengan pesan kesalahan yang nilai-nilai sumbu agregat tidak diurutkan) Sitemap
* Saat ini, dataset anak MUST menjadiEDDGridDari dataset Dap dan MUST memiliki nilai terendah dimensi agregat (biasanya nilai waktu tertua) Sitemap Semua anak lain MUST hampir identik dataset (berbeda hanya dalam nilai untuk dimensi pertama) dan ditentukan oleh hanya mereka Meme itsourceUrlSitemap
* Dataset agregat mendapat metadata dari anak pertama.
* Login[Login Program Xml](#generatedatasetsxml)dapat membuat draft kasar daridatasets.xmlSitemapEDDGridAggregateExistingDimensi berdasarkan set file yang dilayani olehHyraxServer THREDDS. Misalnya, gunakan input ini untuk program ("/1988" di URL membuat contoh berjalan lebih cepat) Sitemap
    ```
      EDDType? EDDGridAggregateExistingDimension  
      Server type (hyrax, thredds, or dodsindex)? hyrax  
      Parent URL (for example, for hyrax, ending in "contents.html";  
        for thredds, ending in "catalog.xml")  
      ? https://opendap.jpl.nasa.gov/opendap/ocean\\_wind/ccmp/L3.5a/data/  
        flk/1988/contents.html  
      File name regex (for example, ".\\*\\.nc")? month.\\*flk\\.nc\\.gz  
      ReloadEveryNMinutes (for example, 10080)? 10080  
    ```
Anda dapat menggunakan hasil&lt;sourceUrl&gt; Tag atau menghapusnya dan membuka&lt;sourceUrl&gt; Tag (sehingga file baru diperhatikan setiap kali dataset diisi ulang.
#### EDDGridSitemap Login{#eddgridaggregateexistingdimension-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridAggregateExistingDimension" [datasetID](#datasetid)\\="..."  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- This is a regular [EDDGridFromDap](#eddgridfromdap) dataset  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;description child with the lowest values for the aggregated  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dimensions. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl> &lt;!-- 0 or many; the sourceUrls for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;other children.  These children must be listed in order of  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ascending values for the aggregated dimension. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrls serverType="..." regex="..." recursive="true"  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[pathRegex](#pathregex)\\=".\\*"  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;>https://*someServer/someDirectory/someSubdirectory*/catalog.xml&lt;/sourceUrls>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1. This specifies how to find the other children,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;instead of using separate sourceUrl tags for each child.  The  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;advantage of this is: new children will be detected each time  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the dataset is reloaded. The serverType must be "thredds",  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"hyrax", or "dodsindex". 
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) (regex)  ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) is .\\*\\.nc  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;recursive can be "true" or "false".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Only directory names which match the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(default=".\\*") will be accepted.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A thredds catalogUrl MUST include "/thredds/catalog/".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a thredds catalogUrl is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://thredds1.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;chla/catalog.xml](https://thredds1.pfeg.noaa.gov/thredds/catalog/Satellite/aggregsatMH/chla/catalog.xml)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a hyrax catalogUrl is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;flk/1988/contents.html](https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/1988/contents.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;An example of a dodsindex URL is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html](https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Note the "OPeNDAP logo at the top of the page.)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;When these children are sorted by filename, they must be in  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;order of ascending values for the aggregated dimension. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dimensionValuesInMemory>](#dimensionvaluesinmemory)...&lt;/dimensionValuesInMemory> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### EDDGridLogin{#eddgridcopy} 
[ **EDDGridLogin** ](#eddgridcopy)membuat dan mempertahankan salinan lokal dari yang lainEDDGridData dan menyajikan data dari salinan lokal.

*   EDDGridLogin (dan untuk data tabular,[Login](#eddtablecopy)) sangat mudah digunakan dan sangat efektif
     **solusi untuk beberapa masalah terbesar dengan melayani data dari sumber data jarak jauh:** 
    * Mengakses data dari sumber data jarak jauh bisa lambat.
        * Mungkin lambat karena melekat lambat (misalnya, jenis server yang tidak efisien) Login
        * karena kewalahan oleh terlalu banyak permintaan,
        * atau karena server Anda atau server jarak jauh terbatas.
    * Dataset jarak jauh kadang-kadang tidak tersedia (lagi, untuk berbagai alasan) Sitemap
    * Mengandalkan satu sumber untuk data tidak skala dengan baik (misalnya, ketika banyak pengguna dan banyakERDDAPmemanfaatkannya) Sitemap
         
* Cara Kerja --EDDGridCopy memecahkan masalah ini dengan secara otomatis membuat dan mempertahankan salinan lokal data dan melayani data dari salinan lokal.ERDDAP™dapat melayani data dari salinan lokal dengan sangat cepat. Dan membuat salinan lokal menghilangkan beban pada server jarak jauh. Dan salinan lokal adalah cadangan asli, yang berguna dalam hal sesuatu terjadi pada aslinya.
    
Tidak ada yang baru tentang membuat salinan lokal dataset. Apa yang baru di sini adalah bahwa kelas ini membuatnya Meme it\\*Sitemap\\*untuk membuat dan\\*Login\\*salinan lokal data dari\\*Login\\*jenis sumber data jarak jauh dan\\*metadata\\*sementara menyalin data.
    
* SitemapEDDGridCopy membuat salinan lokal data dengan meminta potongan data dari jarak jauh&lt;Login Akan ada chunk untuk setiap nilai dari paling kiri (Login) variabel sumbu.EDDGridCopy tidak bergantung pada nomor indeks dataset jarak jauh untuk sumbu -- mereka dapat berubah.
    
PERINGATAN: Jika ukuran chunk data sangat besar (Sitemap 2 g) itu menyebabkan masalah,EDDGridCopy tidak bisa digunakan. (Maaf, kami berharap memiliki solusi untuk masalah ini di masa depan.) 
    
*   \\[Alternatif untukEDDGridLogin
Jika data jarak jauh tersedia melalui file yang dapat diunduh, bukan layanan web, gunakan[Login DariUrl pilihan untukEDDGridLogin](#cachefromurl), yang membuat salinan lokal dari file jarak jauh dan melayani data dari file lokal.\\]
* Database Setiap chunk data disimpan dalam terpisahNetCDFfile dalam subdirectory *Login* Login *datasetID* Sitemap (sebagaimana ditentukan[WordPress.org](/docs/server-admin/deploy-install#setupxml)) Sitemap URL yang dibuat dari nilai sumbu dimodifikasi untuk membuat file-name-safe (misalnya, hyphens diganti oleh "x2D") - ini tidak mempengaruhi data yang sebenarnya. Meme it
     
* Data Baru Login Setiap kaliEDDGridCopy reloaded, itu memeriksa remote&lt;dataset&gt; untuk melihat chunks apa yang tersedia. Jika file untuk chunk data tidak ada, permintaan untuk mendapatkan chunk ditambahkan ke antrian.ERDDAP's taskThread memproses semua permintaan terqueued untuk chunks data, satu-by-one. Anda dapat melihat statistik untuk aktivitas taskThread pada[Login](/docs/server-admin/additional-information#status-page)dan di[Laporan harian](/docs/server-admin/additional-information#daily-report)Sitemap (LoginERDDAP™dapat menetapkan beberapa tugas untuk proses ini, tetapi itu akan menggunakan banyak bandwidth sumber data jarak jauh, memori, dan waktu CPU, dan banyak lokalERDDAPbandwidth, memori, dan waktu CPU, tidak ada ide yang baik.) 
    
CATATAN: Waktu pertamaEDDGridFotokopi dimuat, (jika semua berjalan dengan baik) banyak permintaan untuk chunks data akan ditambahkan ke queue taskThread, tetapi tidak ada file data lokal yang akan dibuat. Jadi konstror akan gagal tetapi taskThread akan terus bekerja dan membuat file lokal. Jika semua berjalan dengan baik, taskThread akan membuat beberapa file data lokal dan upaya berikutnya untuk memuat ulang dataset (di ~ 15 menit) akan berhasil, tetapi awalnya dengan sejumlah data yang sangat terbatas.
    
CATATAN: Setelah dataset lokal memiliki beberapa data dan muncul di data AndaERDDAPJika dataset jarak jauh sementara atau tidak dapat diakses secara permanen, dataset lokal masih akan bekerja.
    
PERINGATAN: Jika dataset jarak jauh besar dan / atau server jarak jauh lambat lambat (itu masalah, bukan?&#33; Meme it) akan memakan waktu lama untuk membuat salinan lokal yang lengkap. Dalam beberapa kasus, waktu yang diperlukan akan diterima. Contohnya, mentransmisikan 1 TB data melalui jalur T1 (0.15 g) setidaknya 60 hari, dalam kondisi optimal. Plus, menggunakan banyak bandwidth, memori, dan waktu CPU pada komputer jarak jauh dan lokal. Solusinya adalah mengirim hard drive ke administrator dari set data jarak jauh sehingga dapat membuat salinan dataset dan mengirimkan hard drive kembali ke Anda. Gunakan data sebagai titik awal danEDDGridCopy akan menambahkan data ke dalamnya. (Itu adalah satu cara yang Meme it[Layanan Cloud EC2 Amazon](https://aws.amazon.com/importexport/)menangani masalah, meskipun sistem mereka memiliki banyak bandwidth.) 
    
PERINGATAN: Jika nilai yang diberikan untuk yang paling kiri (Login) variabel sumbu hilang dari dataset jarak jauh,EDDGridCopy tidak menghapus file yang disalin lokal. Jika Anda ingin, Anda dapat menghapusnya sendiri.
    
#### WordPress.org Login{#grid-copy-checksourcedata} 
Logindatasets.xmluntuk dataset ini dapat memiliki tag opsional
```
    <checkSourceData>true</checkSourceData>  
```
Nilai default benar. Jika/ketika Anda mengaturnya ke salah, dataset tidak akan pernah memeriksa dataset sumber untuk melihat apakah ada data tambahan yang tersedia.

#### Login{#onlysince} 
Anda dapat memberitahukanEDDGridCopy untuk membuat salinan subset dataset sumber, bukan seluruh dataset sumber, dengan menambahkan tag dalam bentuk&lt;Login *Sitemap Login* &lt;/onlySince&gt; ke datasetdatasets.xmlLoginEDDGridCopy hanya akan mengunduh nilai data yang terkait dengan nilai dimensi pertama (biasanya dimensi waktu) yang lebih besar daripada Meme it *Sitemap Login* Sitemap *Sitemap Login* bisa:
    * Waktu relatif ditentukan melaluinow- *Login* Sitemap
Sitemap&lt;Loginnow-2 tahun&lt;/onlySince&gt; memberi tahu dataset hanya membuat salinan lokal data untuk data di mana nilai dimensi luar (biasanya nilai waktu) dalam 2 tahun terakhir (yang dievaluasi kembali setiap kali dataset diisi ulang, yang ketika terlihat untuk data baru untuk menyalin) Sitemap Sitemap[now- *Login* Deskripsi sintaks](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now)Sitemap Ini berguna jika dimensi pertama memiliki data waktu, yang biasanya dilakukan.
        
        EDDGridCopy tidak menghapus file data lokal yang memiliki data yang, seiring waktu, menjadi lebih tua darinow- *Login* Sitemap Anda dapat menghapus file apa pun jika Anda memilih untuk. Jika Anda melakukannya, kami sangat menyarankan Anda mengatur Meme it[Login](/docs/server-admin/additional-information#flag)setelah Anda menghapus file untuk memberitahu Meme itEDDGridCopy untuk memperbarui daftar file yang tersimpan.
        
    * Titik tetap dalam waktu yang ditentukan sebagai string ISO 8601yyyy-MM-ddTHH:mm:ssZSitemap
Sitemap&lt;hanyaSince&gt; 2000-01T00:00Z&lt;/onlySince&gt; memberitahu dataset hanya untuk membuat salinan lokal data di mana nilai dimensi pertama adalah \\&gt; = 2000-01T00:00Z. Ini berguna jika dimensi pertama memiliki data waktu, yang biasanya dilakukan.
         
    * Nomor titik mengambang.
Sitemap&lt;hanyaSince&gt;946684800.0&lt;Login Unit ini akan menjadi unit tujuan dimensi pertama. Misalnya, untuk dimensi waktu, unit dalamERDDAP™Sitemap"seconds since 1970-01-01T00:00:00Z"Sitemap Di 946684800.0"seconds since 1970-01-01T00:00:00Z"setara dengan 2000-01-01T00:00Z. Ini selalu menjadi pilihan yang berguna, tetapi sangat berguna ketika dimensi pertama tidak memiliki data waktu.

#### EDDGridFotokopi{#eddgridcopy-recomended-use} 
1. Login&lt;Login Login (jenis asli, tidakEDDGridLogin) untuk sumber data jarak jauh.
     **Mendapatkan bekerja dengan benar, termasuk semua metadata yang diinginkan.** 
2. Jika terlalu lambat, tambahkan kode XML untuk membungkusnya di sebuahEDDGridFotokopi.
    * Gunakan yang berbedadatasetID  (mungkin dengan mengubahdatasetIDlamadatasetIDLogin) Sitemap
    * Fotokopi&lt;Sitemap Sitemap&lt;reloadEveryNMinutes&gt; dan&lt;onChange&gt; dari jarak jauhEDDGrid's XML keEDDGridFoto's XML (Nilai mereka untukEDDGridCopy masalah; nilai-nilai mereka untuk dataset batin menjadi tidak relevan.) 
3.  ERDDAP™akan membuat dan memelihara salinan lokal data.
         
* Login:EDDGridCopy menganggap bahwa nilai data untuk setiap chunk tidak pernah berubah. Jika/ketika mereka melakukan, Anda perlu menghapus file chunk secara manual *Login* Login *datasetID* / yang berubah dan[Login](/docs/server-admin/additional-information#flag)dataset untuk diisi ulang sehingga potongan yang dihapus akan diganti. Jika Anda memiliki berlangganan email ke dataset, Anda akan mendapatkan dua email: satu ketika dataset reload pertama dan mulai menyalin data, dan lain ketika dataset memuat lagi (Sitemap) dan mendeteksi file data lokal baru.
     
* Semua nilai sumbu harus sama.
Untuk setiap sumbu kecuali kiri (Login) Semua nilai harus sama untuk semua anak. Ketepatan pengujian ditentukan oleh[Login](#matchaxisndigits)Sitemap
     
* Pengaturan, Metadata, Variabel --EDDGridCopy menggunakan pengaturan, metadata, dan variabel dari dataset sumber tertutup.
     
* Ubah Metadata Login Jika Anda perlu mengubahaddAttributesatau mengubah urutan variabel yang terkait dengan dataset sumber:
    1. LoginaddAttributesuntuk dataset sumber dalamdatasets.xml, sesuai kebutuhan.
    2. Hapus salah satu file yang disalin.
    3. Sitemap[Login](/docs/server-admin/additional-information#flag)untuk memuat ulang dataset segera. Jika Anda menggunakan bendera dan Anda memiliki berlangganan email ke dataset, Anda akan mendapatkan dua email: satu ketika dataset beban pertama dan mulai menyalin data, dan lain ketika dataset dimuat lagi (Sitemap) dan mendeteksi file data lokal baru.
    4. File yang dihapus akan diregenerasi dengan metadata baru. Jika dataset sumber tidak tersedia,EDDGridCopy dataset akan mendapatkan metadata dari file regenerasi, karena itu adalah file yang paling muda.
#### EDDGridFotokopi Login{#eddgridcopy-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDGridCopy" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaWMS>](#accessibleviawms)...&lt;/accessibleViaWMS> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;matchAxisNDigits>](#matchaxisndigits)...&lt;/matchAxisNDigits> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or false   
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;checkSourceData>](#grid-copy-checksourcedata)...&lt;/checkSourceData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onlySince>](#onlysince)...&lt;/onlySince> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 -->  
>&nbsp;&nbsp;&lt;/dataset>  

### Login{#eddtablefromcassandra} 
[ **Login** ](#eddtablefromcassandra)menangani data dari satu[Login](https://cassandra.apache.org/)tabel. Cassandra adalah database NoSQL.

*   ERDDAP™dapat bekerja dengan Cassandra v2 dan v3 tanpa perubahan atau perbedaan dalam setup. Kami telah diuji dengan[Cassandra v2 dan v3 dari Login](https://cassandra.apache.org/download/)Sitemap MungkinERDDAP™juga dapat bekerja dengan Cassandra yang diunduh dari DataStax.
     
* Untuk Aug 2019 - Mei 2021, kami kesulitan mendapatkan Cassandra untuk bekerja dengan MengadopsiOpenJdkJavav8. Ini melemparkan EXCEPTION\\_ACCESS\\_VIOLATION). Sitemap (Mei 2021) , masalah itu hilang: kita dapat berhasil menggunakan Cassandra v2.1.22 dan MengadopsiOpenJdk jdk8u292-b10.
     
#### Satu Tabel{#one-table} 
Cassandra tidak mendukung "joins" dengan cara database hubungan. SitemapERDDAP™EDDTableDariCassandra dataset peta ke satu (mungkin satu set) Tabel Cassandra.

#### Logindatasets.xml {#cassandra-datasetsxml} 
*   ERDDAP™datang dengan CassandraJavapengemudi, jadi Anda tidak perlu menginstalnya secara terpisah.
* Baca semua informasi dokumen ini tentang EDDTableFromCassandra. Beberapa detailnya sangat penting.
* LoginJavadriver dimaksudkan untuk bekerja dengan Apache Cassandra (1.2 g) dan Perusahaan DataStax (3.1 g) Sitemap Jika Anda menggunakan Apache Cassandra 1.2.x, Anda harus mengedit file cassandra.yaml untuk setiap node untuk mengatur start\\_native\\_transport: true, kemudian restart setiap node.
* Kami sangat merekomendasikan menggunakan[Login Program Xml](#generatedatasetsxml)untuk membuat draft kasar daridatasets.xmlchunk dataset ini. Anda kemudian dapat mengedit bahwa untuk tune halus itu (terutama [&lt;Login Login (Sitemap) Sitemap Anda dapat mengumpulkan sebagian besar informasi yang Anda butuhkan untuk membuat XML untuk dataset EDDTableDariCassandra dengan menghubungi administrator Cassandra dan dengan mencari web.
    
Login Xml memiliki dua pilihan khusus untuk EDDTableDariCassandra:
    
    1. Jika Anda memasukkan "&#33;&#33;&#33;LIST &#33;&#33;&#33;" (tanpa kutipan) untuk keyspace, program akan menampilkan daftar keyspaces
    2. Jika Anda memasuki ruang kunci tertentu dan kemudian masukkan "&#33;&#33;&#33;LIST &#33;&#33;&#33;" (tanpa kutipan) untuk nama tabel, program akan menampilkan daftar tabel di ruang kunci dan kolom mereka.
##### Sensitivitas kasus{#case-sensitivity} 
* Keyspace dan Nama Meja -
Cassandra memperlakukan keyspace dan nama meja dengan cara yang tidak sensitif. Karena ini, Anda MUST NEVER menggunakan kata yang dilindungi (tetapi dengan kasus yang berbeda) sebagai keyspace Cassandra atau nama tabel.
* Nama Kolom yang tidak sensitif -
Secara default, Cassandra memperlakukan nama kolom dengan cara yang tidak sensitif. Jika Anda menggunakan salah satu kata yang disediakan Cassandra sebagai nama kolom (Sitemap) , anda menggunakan MUST
```
        <columnNameQuotes>"<columnNameQuotes>  
```
Sitemapdatasets.xmluntuk dataset ini sehingga Cassandra danERDDAP™akan memperlakukan nama kolom dengan cara yang sensitif. Ini kemungkinan akan menjadi sakit kepala besar bagi Anda, karena sulit untuk menentukan versi sensitif dari nama kolom - Cassandra hampir selalu menampilkan nama kolom karena semua kasus yang lebih rendah, terlepas dari kasus yang sebenarnya.
* Bekerja sama dengan administrator Cassandra, yang mungkin memiliki pengalaman yang relevan. Jika dataset gagal dimuat, baca[Sitemap](#troubleshooting-tips)dengan hati-hati untuk mengetahui mengapa. Meme it
         
#### Login&lt;Login Properti & gt;{#cassandra-connectionproperty} 
Cassandra memiliki sifat koneksi yang dapat ditentukan dalamdatasets.xmlSitemap Banyak dari ini akan mempengaruhi kinerja Cassandra-ERDDAP™Login Sayangnya, properti Cassandra harus diatur secara programmatik dalamJavaSitemapERDDAP™harus memiliki kode untuk setiap propertiERDDAP™Login SitemapERDDAP™mendukung properti ini:
 (Default yang ditampilkan adalah apa yang kita lihat. Default sistem Anda mungkin berbeda.) 

*    **Pilihan Umum**   
    &lt;Login Nama properti=" **Sitemap** Sitemap *Login|Login|Login* &lt;Login Login (case-insensitif, default=none)   
     (Saran kompresi umum: gunakan 'none' jika koneksi antara Cassandra danERDDAP™adalah lokal / cepat dan menggunakan 'LZ4' jika koneksi terpencil / lambat.)   
    &lt;Login Nama properti=" **Login** Sitemap *username/password* &lt;Login Login (itu literal'/')   
    &lt;Login Nama properti=" **metrik** Sitemap *Login|Login* &lt;Login Login (2021-01-25 default=true, sekarang diabaikan dan selalu palsu)   
    &lt;Login Nama properti=" **Login** Sitemap *Login* &lt;Login Login (default untuk protokol biner asli=9042)   
    &lt;Login Nama properti=" **Login** Sitemap *Login|Login* &lt;Login Login (default=false)   
     (Upaya cepat saya untuk menggunakan sssl gagal. Jika Anda berhasil, silakan beri tahu saya bagaimana Anda melakukannya.) 
*    **Opsi Query**   
    &lt;Login Nama properti=" **Sitemap Login** Sitemap *Sitemap|Sitemap|Login|Login|Login|WordPress.org|Sitemap|Login|serial|Sitemap|Sitemap* &lt;Login Login (case-insensitif, default=ONE)   
    &lt;Login Nama properti=" **Login** Sitemap *Login* &lt;Login Login (default=5000)   
     (Jangan menetapkan ukuran untuk nilai yang lebih kecil.)   
    &lt;Login Nama properti=" **Login** Sitemap *Sitemap|Sitemap|Login|Login|Login|WordPress.org|Sitemap|Login|serial|Sitemap|Sitemap* &lt;Login Login (case-insensitif, default=SERIAL) 
*    **Opsi Socket**   
    &lt;Login Nama properti=" **Login** Sitemap *Login* &lt;Login Login (default=5000)   
     (Jangan mengatur terhubung TimeoutMillis ke nilai yang lebih kecil.)   
    &lt;Login Nama properti=" **Login** Sitemap *Login|Login* &lt;Login Login
    &lt;Login Nama properti=" **Login** Sitemap *Login* &lt;Login Login
     (Pembacaan default Cassandra adalah 12000, tetapiERDDAP™perubahan default ke 120000. Jika Cassandra adalah membuang readTimeout, meningkatkan ini mungkin tidak membantu, karena Cassandra kadang-kadang melemparkan mereka sebelum waktu ini. Masalahnya lebih mungkin bahwa Anda menyimpan terlalu banyak data per partisi Kombinasi utama.)   
    &lt;Login Nama properti=" **Login** Sitemap *Login* &lt;Login Login
     (Tidak jelas apa yang menerimaBufferSize default. Jangan set ini ke nilai kecil.)   
    &lt;Login Nama properti=" **Login** Sitemap *Login* &lt;Login Login
    &lt;Login Nama properti=" **Login** Sitemap *Login|Login* &lt;Login Login (default=null) 

Jika Anda perlu dapat mengatur sifat koneksi lain, lihat[bagian untuk mendapatkan dukungan tambahan](/docs/intro#support)Sitemap

Untuk startup yang diberikan Tomcat, koneksiProperties hanya digunakan saat pertama dataset dibuat untuk URL Cassandra yang diberikan. Semua reload dataset dan semua dataset berikutnya yang membagikan URL yang sama akan menggunakan koneksi asliProperties.
    
#### Login{#cql} 
Login (Login) sangat seperti SQL, bahasa query yang digunakan oleh database tradisional. SitemapOPeNDAPPermintaan data tabular dirancang untuk meniru permintaan data tabular SQL, dimungkinkan untukERDDAP™untuk mengubah permintaan data tabular ke CQL Bound/PreparedStatements.ERDDAP™login[Login](/docs/server-admin/additional-information#log)Sitemap
pernyataan sebagai teks: *Sitemap*   
Versi pernyataan yang Anda lihat akan menjadi representasi teks dari pernyataan dan hanya akan memiliki "?" di mana nilai-nilai kontratraint akan ditempatkan.
       
Tidak begitu sederhana -- Sayangnya, CQL memiliki banyak pembatasan pada kolom mana dapat dikuerikan dengan jenis-jenis kendala, misalnya, kolom kunci partisi dapat dibatasi dengan = dan IN, sehinggaERDDAP™mengirim beberapa batasan untuk Cassandra dan menerapkan semua batasan setelah data diterima dari Cassandra. SitemapERDDAP™kesepakatan efisien dengan Cassandra, Anda perlu menentukan [&lt;Login Login (Sitemap) Sitemap&lt;klasterColumnSourceNames&gt;] (Sitemap) Sitemap&lt;indexColumnSourceNames&gt;] (Sitemap) Sitemapdatasets.xmluntuk dataset ini. Ini adalah cara yang paling penting untuk membantuERDDAP™pekerjaan efisien dengan Cassandra. Jika Anda tidak memberitahu Meme itERDDAP™informasi ini, dataset akan menyakitkan lambatERDDAP™dan gunakan ton sumber daya Cassandra.
     
#### &lt;Login KeySourceNames&gt;{#partitionkeysourcenames} 
Karena kunci partisi memainkan peran pusat di tabel Cassandra,ERDDAP™perlu tahu mereka Meme itsourceNamedan, jika relevan, informasi lain tentang cara bekerja dengan mereka.
* Anda MUST menentukan daftar lengkap nama kolom sumber utama partisi didatasets.xmlSitemap&lt;Login Login
Contoh sederhana,
```
        <partitionKeySourceNames>station, deviceid<partitionKeySourceNames>  
```
Contoh yang lebih kompleks,
```
        <partitionKeySourceNames>deviceid=1007, date/sampletime/1970-01-01<partitionKeySourceNames>
```
* Kunci Partisi TimeStamp -- Jika salah satu kolom utama partisi adalah kolom timestamp yang memiliki versi kasar dari kolom timestamp lain, tentukan ini melalui
     *partisiKeySourcName/otherColumnSourceName/time\\_precision*   
Sitemaptime\\_precisionadalah salah satu[time\\_precision](#time_precision)string digunakan di tempat lainERDDAPSitemap
Jalur Z di Meme ittime\\_precisionstring adalah default, sehingga tidak masalah jika Meme ittime\\_precisionstring berakhir di Z atau tidak. Meme it
SitemapERDDAP™akan menafsirkan tanggal / waktu/1970-01-01 seperti "Constraints untuk tanggal dapat dibangun dari batasan pada waktu sampel dengan menggunakan initime\\_precisionSitemap Konversi kontratraints yang sebenarnya lebih kompleks, tetapi itu adalah gambaran.
     **Gunakan ini kapan pun relevan.** Hal ini memungkinkanERDDAP™untuk bekerja secara efisien dengan Cassandra. Jika hubungan ini antara kolom ada di meja Cassandra dan Anda tidak memberitahuERDDAP™, dataset akan menyakitkan lambatERDDAP™dan gunakan ton sumber daya Cassandra.
* Login Nilai Kunci Partisi -- Jika Anda inginERDDAP™dataset untuk bekerja dengan satu nilai satu partisi kunci, tentukan *url=value* Sitemap
Jangan gunakan kutipan untuk kolom numerik, misalnya, perangkatid=1007
Apakah menggunakan kutipan untuk kolom String, misalnya, staid="Point Pinos"
* Dataset Default Sort Order -- Urutan kunci partisi&lt;dataVariableSitemapdatasets.xmlmenentukan urutan jenis default dari hasil dari Cassandra. Tentu saja, pengguna dapat meminta urutan jenis yang berbeda untuk set hasil yang diberikan dengan mendaftarkan &orderBy (Sitemap *comma-separated daftar variabel* Sitemap) untuk akhir kueri mereka. Meme it
* Secara default, Cassandra danERDDAP™memperlakukan nama kolom dengan cara yang tidak sensitif. Tapi jika Anda set[Sitemap](#case-sensitivity)",ERDDAP™akan memperlakukan nama kolom Cassandra dengan cara yang sensitif.
         
#### &lt;Login Login{#partitionkeycsv} 
Jika ini ditentukan,ERDDAP™akan menggunakannya bukan meminta Cassandra untuk partisi Informasi utama setiap kali dataset diisi ulang. Ini menyediakan daftar nilai kunci partisi yang berbeda, dalam urutan mereka akan digunakan. Kali harus ditentukan sebagai detik sejak 1970-01T00:00Z. Tapi ada juga dua cara alternatif khusus untuk menentukan waktu (setiap dikodekan sebagai string) Sitemap

1) waktu (aISO8601 Sitemap)   (Dapat dikodekan sebagai string)   
2) "waktu (anISO8601StartTime, strideSeconds, stopTime) Sitemap (MUST dikodekan sebagai string)   
Login Waktu dapat berupa ISO8601 Sitemapnow-nUnits (Sitemapnow-3 menit) Sitemap
Login Waktu tidak harus menjadi pertandingan yang tepat dari awal Sitemap
Baris dengan beberapa kali () nilai akan diperluas ke beberapa baris sebelum setiap pertanyaan, sehingga daftar partisi Kunci dapat selalu up-to-date sempurna.
Sitemap
```
    <partitionKeyCSV>
    deviceid,date
    1001,"times(2014-11-01T00:00:00Z, 86400, 2014-11-02T00:00:00Z)"
    1007,"time(2014-11-07T00:00:00Z)"
    1008,time(2014-11-08T00:00:00Z)
    1009,1.4154912E9
    </partitionKeyCSV>
```
memperluas ke tabel kombinasi utama partisi ini:
```
    deviceid,date
    1001,1.4148E9
    1001,1.4148864E9
    1007,1.4153184E9
    1008,1.4154048E9
    1009,1.4154912E9 
```
#### &lt;klasterColumnSourceNames&gt;{#clustercolumnsourcenames} 
Cassandra menerima batasan seperti SQL pada kolom kluster, yang merupakan kolom yang membentuk bagian kedua dari kunci utama (setelah kunci partisi (Login) ) Sitemap Jadi, penting bahwa Anda mengidentifikasi kolom ini melalui&lt;klasterColumnSourceNames&gt;. Hal ini memungkinkanERDDAP™untuk bekerja secara efisien dengan Cassandra. Jika ada kolom kluster dan Anda tidak memberitahu Meme itERDDAP, dataset akan menyakitkan lambatERDDAP™dan gunakan ton sumber daya Cassandra.
    * Sitemap&lt;clusterColumnSourceNames&gt; *myClusterColumn1, myClusterColumn2* &lt;/clusterColumnSourceName&gt;
    * Jika tabel Cassandra tidak memiliki kolom kluster, baik tidak menentukan&lt;clusterColumnSourceNames&gt;, atau menentukannya tanpa nilai.
    * Secara default, Cassandra danERDDAP™memperlakukan nama kolom dengan cara yang tidak sensitif. Tapi jika Anda set[Sitemap](#case-sensitivity)",ERDDAP™akan memperlakukan nama kolom Cassandra dengan cara yang sensitif.
         
#### &lt;indexColumnSourceNames&gt;{#indexcolumnsourcenames} 
Cassandra menerima'='kendala pada kolom indeks sekunder, yang merupakan kolom yang telah Anda buat secara eksplisit indeks melalui
```
    CREATE INDEX *indexName* ON *keyspace.tableName* (*columnName*);  
```
 (Ya, orang tua diperlukan.)   
Jadi, sangat berguna jika Anda mengidentifikasi kolom ini melalui&lt;indexColumnSourceNames&gt;. Hal ini memungkinkanERDDAP™untuk bekerja secara efisien dengan Cassandra. Jika ada kolom indeks dan Anda tidak memberitahu Meme itERDDAP, beberapa pertanyaan akan perlu, menyakitkan lambatERDDAP™dan gunakan ton sumber daya Cassandra.
* Sitemap&lt;indexColumnSourceNames&gt; *myIndexColumn1, myIndexColumn2* &lt;/indexColumnSourceNames&gt;
* Jika tabel Cassandra tidak memiliki kolom indeks, baik tidak menentukan&lt;indexColumnSourceNames&gt;, atau menentukannya tanpa nilai.
* PERINGATAN: Indeks Cassandra tidak seperti indeks database. Indeks Cassandra hanya membantu dengan'='Login Dan mereka hanya Meme it[Sitemap](https://cassandra.apache.org/doc/latest/cql/indexes.html)untuk kolom yang memiliki nilai yang jauh lebih berbeda daripada nilai total.
* Secara default, Cassandra danERDDAP™memperlakukan nama kolom dengan cara yang tidak sensitif. Tapi jika Anda set[Sitemap](#case-sensitivity)",ERDDAP™akan memperlakukan nama kolom Cassandra dengan cara yang sensitif.
         
#### &lt;maxRequestFraction&gt;{#maxrequestfraction} 
SitemapERDDAP™  (Sitemap) memuat dataset,ERDDAP™mendapat dari Cassandra daftar kombinasi yang berbeda dari tombol partisi. Untuk dataset besar, jumlah kombinasi akan sangat besar. Jika Anda ingin mencegah permintaan pengguna dari meminta sebagian besar atau semua dataset (atau bahkan permintaan yang meminta Meme itERDDAP™untuk men-download sebagian besar atau semua data untuk filter lebih lanjut Meme it) Anda dapat memberitahukanERDDAP™hanya untuk memungkinkan permintaan yang mengurangi jumlah kombinasi dengan beberapa jumlah melalui&lt;maxRequestFraction&gt;, yang merupakan nomor titik mengambang antara 1e-10 (yang berarti bahwa permintaan tidak perlu lebih dari 1 kombinasi dalam miliar) dan 1 (default, yang berarti bahwa permintaan dapat untuk seluruh dataset) Sitemap
Misalnya, jika dataset memiliki kombinasi berbeda 10000 dari tombol partisi dan maxRequestFraction diatur ke 0,1,
maka permintaan yang membutuhkan data dari 1001 atau lebih kombinasi akan menghasilkan pesan kesalahan,
tetapi permintaan yang memerlukan data dari kombinasi 1000 atau lebih sedikit akan diizinkan.
    
Umumnya, semakin besar dataset, semakin rendah yang harus Anda set&lt;Login Jadi Anda mungkin mengaturnya ke 1 untuk dataset kecil, 0,1 untuk dataset menengah, 0,01 untuk dataset besar, dan 0.0001 untuk dataset besar.
    
Pendekatan ini jauh dari sempurna. Ini akan menyebabkan beberapa permintaan yang wajar ditolak dan beberapa permintaan yang terlalu besar diperbolehkan. Tapi itu adalah masalah yang sulit dan solusi ini jauh lebih baik daripada apa-apa.
    
#### LoginsubsetVariables {#cassandra-subsetvariables} 
Seperti halnya dataset EDDTable lainnya, Anda dapat menentukan daftar koma-separated&lt;dataVariableSitemapdestinationNameatribut global yang disebut "[subsetVariables](#subsetvariables)" untuk mengidentifikasi variabel yang memiliki sejumlah nilai terbatas. Dataset kemudian akan memiliki halaman web .subset dan menampilkan daftar nilai yang berbeda untuk variabel tersebut dalam daftar drop-down pada banyak halaman web.
    
Termasuk hanya variabel kunci partisi dan kolom statis dalam daftar STRONGLY ENCOLogin Cassandra akan dapat menghasilkan daftar kombinasi yang berbeda dengan sangat cepat dan mudah setiap kali dataset diisi ulang. Satu pengecualian adalah tombol partisi kalitamp yang versi kasar dari beberapa kolom timestamp lainnya - mungkin yang terbaik untuk meninggalkan daftar daftar daftar daftarsubsetVariableskarena ada sejumlah besar nilai dan mereka tidak sangat berguna bagi pengguna.
    
Jika Anda menyertakan kunci non-partisi, variabel non-statis dalam daftar, itu mungkin akan **Sitemap** sebanding mahal untuk Cassandra setiap kali dataset diisi ulang, karenaERDDAP™harus melihat melalui setiap baris dataset untuk menghasilkan informasi. Faktanya, query cenderung gagal. Jadi, kecuali untuk dataset yang sangat kecil, ini adalah DISCOURAGED STRONGLY.
    
#### Login{#cassandra-datatypes} 
Karena ada beberapa ambiguitas tentang yang[Jenis data Cassandra](https://cassandra.apache.org/doc/latest/cql/types.html)peta ke manaERDDAP™jenis data, Anda perlu menentukan [&lt;Login (Login) Promo&lt;dataVariableSitemap (Login) SitemapERDDAP™DataType untuk digunakan. StandarERDDAP™Sitemap Login (dan jenis data Cassandra yang paling umum) Sitemap
    
*   [Login](#boolean-data)  (Login) SitemapERDDAP™kemudian toko sebagai byte
* Login (int, jika kisaran adalah -128 ke 127) 
* Sitemap (int, jika kisaran adalah -32768 ke 32767) 
* Login (int, counter?, varint?, jika kisaran adalah -2147483648 untuk 2147483647) 
* Login (bigint, counter?, varint?, jika kisaran adalah -9223372036854775808 ke 9223372036854775807) 
* Login (Login) 
* Sitemap (ganda, desimal (dengan kemungkinan kehilangan ketepatan) Sitemap) 
* Login (ascii atau teks, jika mereka tidak pernah memiliki lebih dari 1 karakter) 
* Login (ascii, teks, varchar, inet, uuid, timeuid, blob, peta, set, daftar?) 

Login[Login](#cassandra-timestamp-data)adalah kasus khusus: penggunaanERDDAPdata ganda Login

Jika Anda menentukan String dataType diERDDAP™untuk peta Cassandra, set atau daftar, peta, set atau daftar pada setiap baris Cassandra akan dikonversi ke string tunggal pada baris tunggal di baris tunggalERDDAP™tabel.ERDDAP™memiliki sistem alternatif untuk daftar; lihat di bawah ini.

 *Login* Daftar --ERDDAPSitemap&lt;Login (Login) Tag untuk CassandradataVariables dapat mencakup biasaERDDAP™Sitemap Login (lihat di atas) ditambah beberapa jenis data khusus yang dapat digunakan untuk kolom daftar Cassandra: booleanList, byteList, ubyteList, shortList, ushortList, intList, uintList, longList, ulongList, floatList, doubleList, charList, StringList. Ketika salah satu kolom daftar ini adalah dalam hasil yang dilewatkanERDDAP™Setiap baris data sumber akan diperluas ke daftar. Sitemap () baris data dalamERDDAP; data sederhana Login (misalnya, int) dalam baris data sumber itu akan diduplikasi. Sitemap () Sitemap Jika hasilnya mengandung lebih dari satu variabel daftar, semua daftar pada baris tertentu data MUST memiliki ukuran yang sama dan MUST "parallel" daftar, atauERDDAP™akan menghasilkan pesan kesalahan. Misalnya, untuk pengukuran arus dari ADCP,
Login\\[Sitemap\\]Login\\[Sitemap\\]Login\\[Sitemap\\], dan zCurrent\\[Sitemap\\]semua terkait, dan
Login\\[1 Artikel\\]Login\\[1 Artikel\\]Login\\[1 Artikel\\], dan zCurrent\\[1 Artikel\\]semua terkait, ...
Atau, jika Anda tidak ingin Meme itERDDAP™untuk memperluas daftar ke beberapa baris di Meme itERDDAP™tabel, tentukan String sebagaidataVariabledata Jenis sehingga seluruh daftar akan diwakili sebagai satu String pada satu barisERDDAPSitemap
    
#### Cassandra TimeStamp Data{#cassandra-timestamp-data} 
Data timestamp Cassandra selalu menyadari zona waktu. Jika Anda memasukkan data timestamp tanpa menentukan zona waktu, Cassandra menganggap timestamp menggunakan zona waktu setempat.
    
ERDDAP™mendukung data timestamp dan selalu menyajikan data di Meme itZulu/GMT zona waktu. Jadi jika Anda memasukkan data timestamp di Cassandra menggunakan zona waktu selainZulu/GMT, ingat bahwa Anda perlu melakukan semua pertanyaan untuk data timestamp diERDDAP™menggunakanZulu/GMT zona waktu. Jadi jangan terkejut ketika nilai timestamp yang keluarERDDAPdigeserkan oleh beberapa jam karena zona waktu beralih dari lokal keZulu/GMT waktu.

* SitemapERDDAPSitemapdatasets.xmlSitemap&lt;dataVariable&gt; tag untuk variabel kalitamp, set
```
          <dataType>double</dataType>  
```
dan&lt;addAttributesSitemap
```
          <att name="units">seconds since 1970-01-01T00:00:00Z</att>
```
* Saran: Jika data adalah rentang waktu, berguna untuk memiliki nilai timestamp merujuk ke pusat rentang waktu yang tidak diinginkan (misalnya, noon) Sitemap Misalnya, jika pengguna memiliki data untuk 2010-03-26T13:00Z dari dataset lain dan mereka ingin data terdekat dari dataset Cassandra ini yang memiliki data untuk setiap hari, maka data untuk 2010-03-26T12:00Z (mewakili data Cassandra untuk tanggal itu) jelas yang terbaik (bertentangan dengan tengah malam sebelum atau sesudah, di mana kurang jelas yang terbaik) Sitemap
*   ERDDAP™memiliki utilitas untuk[Mengkonversi Numeric Waktu ke/dari Waktu String](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)Sitemap
* Sitemap[SitemapERDDAP™Penawaran dengan Waktu](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap)Sitemap
         
#### Login{#integer-nulls} 
Cassandra mendukung nulls di Cassandra int (ERDDAP™Login) Login (ERDDAP™Login) kolom, tapiERDDAP™tidak mendukung null sejati untuk jenis data integer.
Secara default, nulls cassandra akan dikonversi dalamERDDAP™ke 2147483647 untuk kolom int, atau 9223372036854775807 untuk kolom panjang. Ini akan muncul sebagai "NaN" dalam beberapa jenis file output teks (misalnya, .csv) "" dalam jenis file output teks lainnya (Sitemap.htmlTable) , dan jumlah tertentu (2147483647 untuk nilai int yang hilang) dalam jenis file lain (misalnya, file biner seperti.ncdan tikar) Sitemap Pengguna dapat mencari baris data dengan jenis nilai hilang ini dengan mengacu pada "NaN", misalnya, "&windSpeed=NaN".
    
Jika Anda menggunakan beberapa nilai integer lainnya untuk menunjukkan nilai yang hilang di meja Cassandra Anda, mengidentifikasi nilai itu dalamdatasets.xmlSitemap

>    &lt;att name="missing\\_value" [type="int"](#attributetype)\\>-999&lt;/att>

Untuk kolom titik mengambang Cassandra, nulls mendapatkan dikonversi ke NaNs diERDDAPSitemap Untuk jenis data Cassandra yang dikonversi ke Strings dalamERDDAP™, nulls telah dikonversi ke string kosong. Itu tidak boleh menjadi masalah. Meme it
    
#### "WARNING: Mempersiapkan pertanyaan yang sudah disiapkan"{#warning-re-preparing-already-prepared-query} 
* "WARNING: Mempersiapkan pertanyaan yang sudah disiapkan" *Login* WordPress.org (atau beberapa file log Tomcat lainnya)   
Dokumentasi Cassandra mengatakan ada masalah jika query yang sama dibuat menjadi Pendirian dua kali (Sitemap) Sitemap (Lihat ini[laporan bug](https://datastax-oss.atlassian.net/browse/JAVA-236)Sitemap) Untuk menghindari membuat Cassandra gila,ERDDAP™cache semua MempersiapkanStatement sehingga dapat menggunakannya kembali. Cache itu hilang jika / ketika Tomcat /ERDDAP™direstart, tapi saya pikir itu baik-baik saja karena Pendirian terkait dengan sesi tertentu (SitemapJavadan Cassandra) , yang juga hilang. Jadi, Anda dapat melihat pesan ini. Saya tahu tidak ada solusi lain. Untungnya, itu adalah peringatan, bukan kesalahan (meskipun Cassandra mengancam bahwa itu dapat menyebabkan masalah kinerja) Sitemap
    
Cassandra mengklaim bahwa MempersiapkanStatement baik selamanya, sehinggaERDDAP's cached PreparedStatements tidak boleh menjadi out-of-date/invalid. Jika tidak benar, dan Anda mendapatkan kesalahan tentang Persiapan tertentu yang tidak valid, maka Anda perlu me-restartERDDAP™SitemapERDDAP's cache Persiapkan.
    
#### Cassandra Keamanan{#cassandra-security} 
Sitemap[Login](https://cassandra.apache.org/doc/latest/operating/security.html)

Ketika bekerja dengan Cassandra, Anda perlu melakukan hal-hal dengan aman dan aman mungkin untuk menghindari memungkinkan pengguna jahat untuk merusak Cassandra atau mendapatkan akses ke data yang seharusnya tidak memiliki akses ke.ERDDAP™mencoba melakukan hal-hal dengan cara yang aman, juga.

* Kami mendorong Anda untuk mengaturERDDAP™untuk terhubung ke Cassandra sebagai pengguna Cassandra yang hanya memiliki akses ke **Sitemap** Login (Login) dan hanya memiliki hak istimewa.
* Kami mendorong Anda untuk mengatur koneksi dariERDDAP™ke Cassandra sehingga
    * selalu menggunakan SSL,
    * hanya memungkinkan koneksi dari satu alamat IP (atau satu blok alamat) dan dari satuERDDAP™pengguna, dan
    * hanya mentransfer password dalam bentuk hashed MD5 mereka.
*   \\[KNOWN PROBLEM\\]Login (termasuk kata sandi&#33;) disimpan sebagai teks biasa dalamdatasets.xmlSitemap Kami tidak menemukan cara untuk memungkinkan administrator untuk memasukkan kata sandi Cassandra selamaERDDAP's startup di Tomcat (yang terjadi tanpa input pengguna) , jadi kata sandi harus dapat diakses dalam file. Untuk membuat ini lebih aman:
    * Login (LoginERDDAP™Login) harus menjadi pemilikdatasets.xmldan memiliki akses READ dan WRITE.
    * Membuat grup yang hanya mencakup user=tomcat. Gunakan chgrp untuk membuat kelompok untukdatasets.xmlHanya dengan hak istimewa READ.
    * Gunakan chmod untuk menetapkan hak istimewa o-rwx (tidak ada akses READ atau WRITE untuk pengguna "lain") Sitemapdatasets.xmlSitemap
* SitemapERDDAP™, kata sandi dan sifat koneksi lainnya disimpan dalam "private"Javavariabel.
* Permintaan dari klien dibuat dan diperiksa untuk validitas sebelum menghasilkan permintaan CQL untuk Cassandra.
* Permintaan untuk Cassandra dibuat dengan CQL Bound / PreparedStatements, untuk mencegah injeksi CQL. Dalam kasus apapun, Cassandra melekat kurang rentan terhadap injeksi CQL daripada database tradisional adalah untuk[SQL database](https://en.wikipedia.org/wiki/SQL_injection)Sitemap
         
#### Cassandra Kecepatan{#cassandra-speed} 
Cassandra bisa cepat atau lambat. Ada beberapa hal yang bisa Anda lakukan untuk membuatnya cepat:
* Sitemap
Sifat CQL adalah pertanyaan yang Meme it[Login](https://en.wikipedia.org/wiki/Declarative_programming)Sitemap Mereka hanya menentukan apa yang diinginkan pengguna. Meme it Mereka tidak termasuk spesifikasi atau petunjuk untuk bagaimana permintaan ditangani atau dioptimalkan. Jadi tidak ada cara untuk Meme itERDDAP™untuk menghasilkan query dengan cara seperti itu membantu Cassandra mengoptimalkan query (atau dengan cara apapun menentukan bagaimana query adalah ditangani) Sitemap Secara umum, hingga administrator Cassandra untuk mengatur hal-hal sehingga (misalnya, indeks) untuk mengoptimalkan jenis pertanyaan tertentu.
     
* Menentukan kolom timestamp yang terkait dengan kunci partisi timestamp yang presisi melalui [&lt;Login Login (Sitemap) adalah cara yang paling penting untuk membantuERDDAP™pekerjaan efisien dengan Cassandra. Jika hubungan ini ada di meja Cassandra dan Anda tidak memberitahu Meme itERDDAP™, dataset akan menyakitkan lambatERDDAP™dan gunakan ton sumber daya Cassandra.
     
* Menentukan kolom kluster melalui [&lt;klasterColumnSourceNames&gt;] (Sitemap) adalah cara yang paling penting kedua untuk membantuERDDAP™pekerjaan efisien dengan Cassandra. Jika ada kolom kluster dan Anda tidak memberitahu Meme itERDDAP, subset besar dari pertanyaan yang mungkin untuk data akan perlu, menyakitkan lambatERDDAP™dan gunakan ton sumber daya Cassandra.
     
* Login[Login](https://cassandra.apache.org/doc/latest/cql/indexes.html)untuk variabel yang umum terlatih --
Anda dapat mempercepat beberapa pertanyaan dengan membuat indeks untuk kolom Cassandra yang sering dilatih dengan "="traints.
    
Cassandra tidak dapat membuat indeks untuk daftar, set, atau kolom peta.
    
* Menentukan kolom indeks melalui [&lt;indexColumnSourceNames&gt;] (Sitemap) adalah cara penting untuk membantuERDDAP™pekerjaan efisien dengan Cassandra. Jika ada kolom indeks dan Anda tidak memberitahu Meme itERDDAP, beberapa pertanyaan untuk data akan perlu, menyakitkan lambat dalamERDDAP™dan gunakan ton sumber daya Cassandra.
     
#### Login{#cassandra-stats} 
*   ["Cassandra stats" Pesan Diagnostik](#cassandra-stats)Login Untuk setiapERDDAP™permintaan pengguna untuk dataset Cassandra,ERDDAP™akan mencetak garis dalam file log, *Login* /logs/log.txt, dengan beberapa statistik yang terkait dengan query, misalnya,
```
        \\* Cassandra stats: partitionKeyTable: 2/10000=2e-4 < 0.1 nCassRows=1200 nErddapRows=12000 nRowsToUser=7405  
```
Menggunakan angka dalam contoh di atas, cara ini:

* SitemapERDDAP™Sitemap (Sitemap) dimuat dataset ini, Cassandra mengatakanERDDAP™yang ada 10.000 kombinasi yang berbeda dari tombol partisi.ERDDAP™cache semua kombinasi yang berbeda dalam file.
* Karena batasan pengguna,ERDDAP™mengidentifikasi 2 kombinasi dari 10000 yang mungkin memiliki data yang diinginkan. SitemapERDDAP™akan membuat 2 panggilan ke Cassandra, satu untuk setiap kombinasi dari tombol partisi. (Apa yang diperlukan Cassandra.) Jelas, itu bermasalah jika dataset besar memiliki sejumlah besar kombinasi dari kunci partisi dan permintaan yang diberikan tidak secara drastis mengurangi itu. Anda dapat meminta setiap permintaan mengurangi ruang kunci dengan mengatur [&lt;Login (Login) Sitemap Di sini, 2/10000=2e-4, yang kurang dari maxRequestFraction (Sitemap) maka permintaan diperbolehkan.
* Setelah menerapkan batasan pada tombol partisi,[kolom kluster](#clustercolumnsourcenames)Sitemap[kolom indeks](#indexcolumnsourcenames)yang dikirim olehERDDAP™Cassandra kembali 1200 baris data keERDDAP™dalam HasilSet.
* Hasil Set harus memiliki[Sitemap Login *Login* Login](#cassandra-datatypes)Login (dengan rata-rata 10 item per daftar) SitemapERDDAP™memperluas 1200 baris dari Cassandra ke 12000 baris diERDDAPSitemap
*   ERDDAP™selalu menerapkan semua batasan pengguna untuk data dari Cassandra. Dalam kasus ini, batasan yang Cassandra tidak ditangani mengurangi jumlah baris ke 7405. Itu adalah jumlah baris yang dikirim ke pengguna.

Penggunaan pesan diagnostik yang paling penting adalah untuk memastikan bahwaERDDAP™melakukan apa yang Anda pikirkan itu lakukan. Meme it Jika tidak (misalnya, tidak mengurangi jumlah kombinasi yang berbeda seperti yang diharapkan?) Anda dapat menggunakan informasi untuk mencoba mencari tahu apa yang salah.
 
* Penelitian dan percobaan untuk menemukan dan mengatur lebih baik [&lt;koneksiProperty&gt; (#cassandra-connectionproperty) Sitemap
 
* Periksa kecepatan koneksi jaringan antara Cassandra danERDDAPSitemap Jika koneksi lambat, lihat jika Anda dapat meningkatkannya. Situasi terbaik adalah ketikaERDDAP™berjalan pada server yang melekat pada yang sama (Sitemap) beralih sebagai server yang menjalankan node Cassandra ke mana Anda terhubung.
 
* Promo Baca informasi di sini dan dalam dokumentasi Cassandra dengan hati-hati. Sitemap Cek pekerjaan Anda. Jika Cassandra-ERDDAP™koneksi masih lebih lambat dari yang Anda harapkan, masukkan skema meja Cassandra Anda danERDDAP™Logindatasets.xmlSitemap[bagian untuk mendapatkan dukungan tambahan](/docs/intro#support)Sitemap
 
* Jika semua gagal lain,
mempertimbangkan menyimpan data dalam koleksiNetCDFg.ncLogin (Sitemap.ncfile yang menggunakan[Login Sitemap (Login) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Struktur data Array yang berkelanjutan dan dapat ditangani denganERDDAPSitemap[Sitemap](#eddtablefromnccffiles)) Sitemap Jika mereka diatur secara logis (setiap data untuk chunk ruang dan waktu) LoginERDDAP™dapat mengekstrak data dari mereka dengan sangat cepat.
         
#### Email: info@ids-imaging.com{#eddtablefromcassandra-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromCassandra" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;ipAddress>](#sourceurl)...&lt;/ipAddress>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The Cassandra URL without the port number, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;127.0.0.1 REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[connectionProperty](#cassandra-connectionproperty) name="*name*">*value*&lt;/connectionProperty>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The names (for example, "readTimeoutMillis") and values  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;of the Cassandra properties that ERDDAP™ needs to change.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0 or more. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;keyspace>...&lt;/keyspace> &lt;!-- The name of the keyspace that has  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the table. REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;tableName>...&lt;/tableName> &lt;!-- The name of the table, default = "".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;partitionKeySourceNames>](#partitionkeysourcenames)...&lt;partitionKeySourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;clusterColumnSourceNames>](#clustercolumnsourcenames)...&lt;clusterColumnSourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;indexColumnSourceNames>](#indexcolumnsourcenames)...&lt;indexColumnSourceNames> &lt;!-- OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;maxRequestFraction>](#maxrequestfraction)...&lt;maxRequestFraction>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- OPTIONAL double between 1e-10 and 1 (the default). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;columnNameQuotes>](#case-sensitivity)...&lt;columnNameQuotes> &lt;!-- OPTIONAL.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Options: \\[nothing\\] (the default) or ". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Each dataVariable MUST include a [&lt;dataType>](#datatype) tag. See  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [Cassandra DataTypes](#cassandra-datatypes).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; For [Cassandra timestamp columns](#cassandra-timestamp-data), set dataType=double and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; units=seconds since 1970-01-01T00:00:00Z -->  
>&nbsp;&nbsp;&lt;/dataset>  

### Login{#eddtablefromdapsequence} 
[ **Login** ](#eddtablefromdapsequence)menangani variabel dalam urutan 1- dan 2-level dari[DAP](https://www.opendap.org/)server sepertiDAPLogin (Sitemap https://www.pmel.noaa.gov/epic/software/dapper/ Sekarang dihentikan) Sitemap

* Kami sangat merekomendasikan menggunakan[Login Program Xml](#generatedatasetsxml)untuk membuat draft kasar daridatasets.xmlchunk dataset ini. Anda kemudian dapat mengedit bahwa untuk tune halus itu. Meme it Anda dapat mengumpulkan informasi yang Anda butuhkan dengan melihat file DDS dan DAS dataset sumber di browser Anda (dengan menambahkan .das dan .dds kesourceUrl(misalnya di https://dapper.pmel.noaa.gov/dapper/epic/tao\\_time\\_series.cdp.dds Sitemap
    
* variabel dalamDAPurutan jika respons .dds menunjukkan bahwa struktur data memegang variabel adalah "sequence" (kasus tidak sensitif) Sitemap
* Dalam beberapa kasus, Anda akan melihat urutan dalam urutan, urutan 2-level -- EDDTableDariDapSequence menangani ini, juga.
#### Sitemap Login{#eddtablefromdapsequence-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromDapSequence" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;outerSequenceName>...&lt;/outerSequenceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the outer sequence for DAP sequence data.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This tag is REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;innerSequenceName>...&lt;/innerSequenceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the inner sequence for DAP sequence data.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This tag is OPTIONAL; use it if the DAP data is a two level  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sequence. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringEQNE>](#sourcecanconstrainstringeqne)true|false&lt;/sourceCanConstrainStringEQNE>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringGTLT>](#sourcecanconstrainstringgtlt)true|false&lt;/sourceCanConstrainStringGTLT>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanConstrainStringRegex>](#sourcecanconstrainstringregex)...&lt;/sourceCanConstrainStringRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;skipDapperSpacerRows>...&lt;/skipDapperSpacerRows>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- skipDapperSpacerRows specifies whether the dataset  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;will skip the last row of each innerSequence other than the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;last innerSequence (because Dapper servers put NaNs in the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;row to act as a spacer).  This tag is OPTIONAL. The default  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is false.  It is recommended that you set this to true for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;all Dapper sources and false for all other data sources. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

### Login{#eddtablefromdatabase} 
[ **Login** ](#eddtablefromdatabase)menangani data dari satu tabel database relasional atau[Login](https://en.wikipedia.org/wiki/View_(database)Sitemap

#### Satu Meja atau Tampilan{#one-table-or-view} 
Jika data yang ingin Anda layani adalah dalam dua atau lebih tabel (dan dengan demikian perlu JOIN untuk mengekstrak data dari kedua tabel sekaligus) Anda perlu membuat satu[Sitemap](https://en.wikipedia.org/wiki/Denormalization)  (sudah bergabung) tabel atau[Login](https://en.wikipedia.org/wiki/View_(SQL)) dengan semua data yang ingin Anda buat tersedia sebagai satu datasetERDDAPSitemap

Untuk database yang besar, kompleks, mungkin masuk akal untuk memisahkan beberapa chunks sebagai tabel denormalisasi, masing-masing dengan berbagai jenis data, yang akan menjadi set data terpisah dalamERDDAPSitemap

Membuat meja denormalisasi untuk digunakanERDDAP™mungkin terdengar seperti ide gila untuk Anda. Hubungi kami. Ada beberapa alasan mengapaERDDAP™bekerja dengan tabel denormalisasi:

* Sangat mudah bagi pengguna.
SitemapERDDAP™menyajikan dataset sebagai satu, sederhana, denormalisasi, tabel tunggal, sangat mudah bagi siapa pun untuk memahami data. Kebanyakan pengguna tidak pernah mendengar tabel normal, dan beberapa tombol mengerti, kunci asing, atau meja bergabung, dan mereka hampir pasti tidak tahu rincian berbagai jenis bergabung, atau cara menentukan SQL untuk melakukan bergabung (atau beberapa bergabung) Sitemap Menggunakan tabel denormalisasi menghindari semua masalah tersebut. Alasan ini sendiri membenarkan penggunaan tabel tunggal denormalisasi untuk presentasi dataset keERDDAP™pengguna.
     
* Tabel normal (beberapa tabel yang terkait dengan kolom kunci) bagus untuk menyimpan data dalam database.
Tapi bahkan di SQL, hasil yang dikembalikan kepada pengguna adalah denormalisasi (Sitemap) meja tunggal. Jadi tampaknya wajar untuk menyajikan dataset kepada pengguna sebagai besar, denormalisasi, tabel tunggal dari mana mereka kemudian dapat meminta subset (misalnya, menunjukkan saya baris tabel di mana suhu&gt; 30 g) Sitemap
     
* Anda dapat membuat perubahanERDDAP™tanpa mengubah tabel Anda.
    ERDDAP™memiliki beberapa persyaratan yang mungkin berbeda dari bagaimana Anda telah mengatur database Anda.
SitemapERDDAP™memerlukan data timestamp disimpan di bidang 'timestamp dengan timezone'.
Dengan membuat meja / tampilan terpisah untukERDDAP™, Anda dapat membuat perubahan ini ketika Anda membuat meja yang dinormalkan untukERDDAPSitemap Dengan demikian, Anda tidak perlu melakukan perubahan pada tabel Anda.
     
*   ERDDAP™akan menciptakan beberapa struktur tabel normal.
Anda dapat menentukan kolom data yang berasal dari tabel 'outer' dan oleh karena itu memiliki sejumlah nilai yang berbeda.ERDDAP™akan mengumpulkan semua kombinasi nilai yang berbeda di kolom ini dan menyajikannya kepada pengguna secara khusus. subset halaman web yang membantu pengguna dengan cepat memilih subset dataset. Nilai yang berbeda untuk setiap kolom juga ditampilkan dalam daftar drop-down di halaman web lain dataset.
     
* Meja denormalisasi membuat data yang lepas dari Anda keERDDAPadministrator mudah.
Anda adalah ahli untuk dataset ini, sehingga masuk akal bahwa Anda membuat keputusan tentang tabel mana dan kolom mana untuk bergabung dan bagaimana bergabung dengan mereka. Jadi Anda tidak perlu menyerahkan kami Meme it (atau lebih buruk, pengguna akhir) beberapa tabel dan petunjuk rinci untuk cara bergabung dengan mereka, Anda hanya perlu memberikan akses ke tabel denormalisasi.
     
* Meja denormalisasi memungkinkan untuk akses yang efisien ke data.
Bentuk denormalisasi biasanya lebih cepat diakses daripada bentuk normal. Bergabung bisa lambat. Beberapa bergabung bisa sangat lambat.
     

Untuk mendapatkan data dari dua atau lebih tabel di database ke dalamERDDAP™ada tiga pilihan:
 

* Opsi yang disarankan:
Anda dapat membuat file comma- atau tab-separated-value dengan data dari tabel denormalisasi.
Jika dataset besar, maka masuk akal untuk membuat beberapa file, masing-masing dengan subset kohesif dari tabel denormalisasi (misalnya, data dari rentang waktu yang lebih kecil) Sitemap
    
Keuntungan besar di sini adalah Meme itERDDAP™akan dapat menangani permintaan pengguna untuk data tanpa upaya lebih lanjut oleh database Anda. LoginERDDAP™tidak akan menjadi beban pada database Anda atau risiko keamanan. Ini adalah pilihan terbaik di bawah hampir semua keadaan karenaERDDAP™biasanya mendapatkan data dari file lebih cepat dari database (jika kita mengkonversi file .csv ke.ncfile CF) Sitemap (Bagian dari alasannyaERDDAP+file adalah sistem read-only dan tidak harus berurusan dengan membuat perubahan sambil memberikan[Login](https://en.wikipedia.org/wiki/ACID)  (Atomicity, Konsisten, Isolasi, Daya Tahan) Sitemap) Juga, Anda mungkin tidak perlu server terpisah karena kita dapat menyimpan data pada salah satu RAID kami dan mengaksesnya dengan yang adaERDDAP™di server yang ada.
    
* Opsi Okay:
Anda mengatur database baru pada komputer yang berbeda dengan hanya tabel denormalisasi.
Karena database itu dapat menjadi database sumber gratis dan terbuka seperti MariaDB, MySQL, dan PostgreSQL, opsi ini tidak memerlukan biaya banyak.
    
Keuntungan besar di sini adalah Meme itERDDAP™akan dapat menangani permintaan pengguna untuk data tanpa upaya lebih lanjut oleh database Anda saat ini. LoginERDDAP™tidak akan menjadi beban pada database Anda saat ini. Ini juga menghilangkan banyak masalah keamanan karenaERDDAP™tidak akan memiliki akses ke database Anda saat ini.
    
* Opsi yang tidak teratur:
Kita bisa menghubungkanERDDAP™Database
Untuk melakukan ini, Anda perlu untuk:
    
    * Buat tabel terpisah atau lihat dengan tabel data yang dinormalkan.
    * Buat pengguna "erddap" yang memiliki akses mudah hanya ke tabel denormalisasi (Login) Sitemap
         
    
Ini adalah pilihan jika perubahan data sangat sering dan Anda ingin memberikanERDDAP™pengguna akses instan ke perubahan tersebut; namun, bahkan demikian, mungkin masuk akal untuk menggunakan opsi file di atas dan secara berkala (setiap 30 menit?) mengganti file yang memiliki data hari ini.
Kerugian besar dari pendekatan ini adalah bahwaERDDAP™permintaan pengguna mungkin akan menempatkan beban besar yang tak tertahankan di database Anda dan bahwaERDDAP™koneksi adalah risiko keamanan (meskipun kita dapat meminimalkan / mengurangi risiko) Sitemap

Membuat meja atau tampilan yang dinormalisasi untukERDDAP™adalah kesempatan yang baik untuk membuat beberapa perubahan yang Meme itERDDAP™perlu, dengan cara yang tidak mempengaruhi tabel asli Anda:

* Mengubah tanggal dan alur waktu / kolom untuk menggunakan DataType yang panggilan Postgres[timetamp dengan zona waktu](#database-date-time-data)  (atau setara dalam database Anda) Sitemap
Kalitamps tanpa informasi zona waktu tidak bekerja dengan benarERDDAPSitemap
* Membuat indeks untuk kolom yang sering dicari pengguna.
* Sangat menyadari[kasus nama lapangan / kolom](#quotes-for-names-and-case-sensitivity)  (misalnya, gunakan semua huruf kecil) ketika Anda mengetik mereka. Meme it
* Jangan gunakan kata-kata yang dicadangkan untuk tabel dan untuk nama lapangan / kolom.

Jika Anda perlu membantu membuat meja atau tampilan yang dinormalkan, silakan hubungi administrator database Anda.
Jika Anda ingin berbicara tentang pendekatan atau strategi ini bagaimana yang terbaik untuk melakukannya, silakan email Chris. John di noaaa.gov .
    
#### databasedatasets.xml {#database-in-datasetsxml} 
Sulit untuk membuat benardatasets.xmlinformasi yang diperlukan untukERDDAP™untuk menetapkan koneksi ke database. Promo Login
* Kami sangat merekomendasikan menggunakan[Login Program Xml](#generatedatasetsxml)untuk membuat draft kasar daridatasets.xmlchunk dataset ini. Anda kemudian dapat mengedit bahwa untuk tune halus itu. Meme it
        
Login Xml memiliki tiga pilihan khusus untuk EDDTableDariDatabase:
1. Jika Anda memasukkan "&#33;&#33;&#33;LIST &#33;&#33;&#33;" (tanpa kutipan) untuk nama katalog, program akan menampilkan daftar nama katalog.
2. Jika Anda memasukkan "&#33;&#33;&#33;LIST &#33;&#33;&#33;" (tanpa kutipan) untuk nama schema, program akan menampilkan daftar nama schema.
3. Jika Anda memasukkan "&#33;&#33;&#33;LIST &#33;&#33;&#33;" (tanpa kutipan) untuk nama tabel, program akan menampilkan daftar tabel dan kolom mereka. Pertama "&#33;&#33;&#33;LIST&#33;&#33;&#33;" entri yang Anda buat adalah yang akan digunakan.
* Baca semua informasi dokumen ini tentang EDDTableFromDatabase.
* Anda dapat mengumpulkan sebagian besar informasi yang Anda butuhkan untuk membuat XML untuk dataset EDDTableDari Database dengan menghubungi administrator database dan dengan mencari web.
* Meskipun database sering memperlakukan nama kolom dan nama tabel dengan cara yang tidak sensitif, mereka sensitif dalam kasusERDDAPSitemap Jadi jika pesan kesalahan dari database mengatakan bahwa nama kolom tidak diketahui (misalnya, "identifier yang tidak dikenal= Sitemap *kolom\\_name* Sitemap) meskipun Anda tahu itu ada, coba gunakan semua modal, misalnya, *Login* , yang sering menjadi versi sebenarnya dari nama kolom.
* Bekerja sama dengan administrator database, yang mungkin memiliki pengalaman yang relevan. Jika dataset gagal dimuat, baca[Sitemap](#troubleshooting-tips)dengan hati-hati untuk mengetahui mengapa. Meme it
         
#### JDBC Driver{#jdbc-driver} 
* [JDBC Driver dan&lt;Login (Login) Login Anda harus mendapatkan yang tepat JDBC 3 atau driver JDBC 4 untuk database Anda dan
taruh di *Login* /webapps/erddap/WEB-INF/lib setelah anda menginstalERDDAPSitemap Kemudian, di Andadatasets.xmluntuk dataset ini, Anda harus menentukan&lt;driverName&gt; untuk driver ini, yang (Sitemap) berbeda dari nama file. Cari di web untuk driver JDBC untuk database Anda dan driverName yangJavaperlu menggunakannya.
    
    * Untuk MariaDB, coba[ https://mariadb.com/kb/en/about-the-mariadb-java-client/ ](https://mariadb.com/kb/en/about-the-mariadb-java-client/)  
Login&lt;driverName&gt; untuk digunakandatasets.xml  (Sitemap) org.mariadb.jdbc. Login
    * Untuk MySQL dan Amazon RDS, coba[ https://dev.mysql.com/downloads/connector/j/ ](https://dev.mysql.com/downloads/connector/j/)  
Login&lt;driverName&gt; untuk digunakandatasets.xml  (Sitemap) com.mysql.jdbc. Login
    * SitemapOracleSitemap[ https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html ](https://www.oracle.com/database/technologies/appdev/jdbc-downloads.html)Sitemap
Login&lt;driverName&gt; untuk digunakandatasets.xml  (Sitemap) mungkin oracle.jdbc.driver.OracleLogin
    * Untuk Postgresql, kami mendapat driver JDBC 4 dari[ https://mvnrepository.com/artifact/org.postgresql/postgresql ](https://mvnrepository.com/artifact/org.postgresql/postgresql)  
Login&lt;driverName&gt; untuk digunakandatasets.xml  (Sitemap) org.postgresql. Login
    * Untuk SQL Server, Anda bisa mendapatkan driver JTDS JDBC dari[ https://jtds.sourceforge.net ](https://jtds.sourceforge.net)Sitemap
Login&lt;driverName&gt; untuk digunakandatasets.xml  (Sitemap) adalah mungkin net.sourceforge.jtds.jdbc. Login
    
Setelah Anda menempatkan driver JDBC .jar diERDDAP™lib direktori, Anda perlu menambahkan referensi ke file .jar di file .bat dan/atau .sh script untuk GenerateDatasets Xml, DasDds, dan ArsipADataset yang ada di *Login* /webapps/erddap/WEB-INF/ directory; jika tidak, Anda akan mendapatkan ClassNotFoundException ketika Anda menjalankan skrip tersebut.
    
Sayangnya, JDBC kadang-kadang sumber masalah. Dalam perannya sebagai perantara antaraERDDAP™dan database, kadang-kadang membuat perubahan halus ke database standar/generic SQL meminta bahwaERDDAP™menciptakan, sehingga menyebabkan masalah (misalnya, terkait[identifiers atas / bawah](#quotes-for-names-and-case-sensitivity)dan terkait[zona waktu tanggal / waktu](#database-date-time-data)) Sitemap Silakan menjadi pasien, baca informasi di sini dengan hati-hati, periksa pekerjaan Anda, dan lihat kami[bagian untuk mendapatkan dukungan tambahan](/docs/intro#support)Sitemap
    
#### Database&lt;Login Properti & gt;{#database-connectionproperty} 
* Sitemap&lt;koneksiProperty&gt; (#database-connectionproperty) Login Sitemapdatasets.xmluntuk dataset Anda, Anda harus mendefinisikan beberapa koneksi Tag properti untuk memberitahukanERDDAP™cara menghubungkan ke database Anda (misalnya, untuk menentukan nama pengguna, kata sandi, koneksi ssl, dan[ukuran fetch](#set-the-fetch-size)) Sitemap Ini berbeda untuk setiap situasi dan sedikit sulit untuk mencari tahu. Cari web misalnya menggunakan driver JDBC untuk terhubung ke database Anda. Login&lt;koneksiProperty&gt; nama (misalnya, "user", "password", dan "sssl") , dan beberapa nilai koneksiProperty dapat ditemukan dengan mencari web untuk properti koneksi JDBC *database Login* Sitemap (SitemapOracleMySQL, PHP, MySQL, MySQL) Sitemap
     
#### Quotes untuk Nama dan Sensitivitas Kasus{#quotes-for-names-and-case-sensitivity} 
*   [Quotes untuk Nama Lapangan / Kolom; Sensitivitas Kasus](#quotes-for-names-and-case-sensitivity)- Secara default, EDDTableDari Database menempatkan kutip ganda ANSI-SQL-standar di sekitar nama lapangan / kolom di pernyataan SELECT jika Anda telah menggunakan kata yang disediakan sebagai nama lapangan / kolom, atau karakter khusus dalam nama lapangan / kolom. Kutipan ganda juga menghangatkan jenis serangan injeksi SQL. Anda dapat memberitahukanERDDAP™untuk menggunakan ", ', atau tidak ada kutipan melalui&lt;Sitemap Sitemapdatasets.xmluntuk dataset ini.
    
Untuk banyak database, menggunakan jenis kutipan menyebabkan database bekerja dengan nama field/column dalam cara sensitif (bukan kasus database default cara yang tidak sensitif) Sitemap Database sering menampilkan nama file/column sebagai semua huruf besar, ketika pada kenyataannya bentuk sensitif kasus berbeda. SitemapERDDAP™silahkan selalu memperlakukan nama kolom database sebagai case sensitive.
    
    * Untuk Maria DB, Anda perlu menjalankan database dengan[WordPress.org](https://mariadb.com/kb/en/mysql-command-line-client/)Sitemap
    * Untuk MySQL dan Amazon RDS, Anda perlu menjalankan database dengan[WordPress.org](https://dev.mysql.com/doc/refman/5.7/en/sql-mode.html#sqlmode_ansi_quotes)Sitemap
    *   Oraclemendukung kutip ganda ANSI-SQL-standar[Sitemap](https://docs.oracle.com/database/121/SQLRF/sql_elements008.htm#SQLRF00223)Sitemap
    * PostgreSQL mendukung kuotasi ganda ANSI-SQL-standar secara default.
    
      
Jangan menggunakan kata yang disediakan untuk database, katalog, skema atau nama tabel.ERDDAP™tidak menempatkan kutipan di sekitar mereka. Meme it
    
Jika memungkinkan, gunakan semua kasus lebih rendah untuk database, katalog, schema, nama tabel dan nama lapangan ketika membuat tabel database (Sitemap) dan ketika mengacu pada nama lapangan / kolom di Meme itdatasets.xmlSitemapERDDAPSitemap Jika tidak, Anda mungkin mendapatkan pesan kesalahan mengatakan database, katalog, skema, tabel, dan / atau lapangan tidak ditemukan. Jika Anda mendapatkan pesan kesalahan itu, coba gunakan versi case-sensitif, semua versi top-case, dan semua versi huruf kecil dari nama dalamERDDAPSitemap Salah satu dari mereka dapat bekerja. Jika tidak, Anda perlu mengubah nama database, katalog, skema, dan/atau tabel ke semua kasus yang lebih rendah.
    
#### Database&lt;Sitemap Jenis & gt;{#database-datatype} 
*   [Database](#database-datatype)Sitemap&lt;Login (Login) Sitemap Karena ada beberapa ambiguitas tentang yang[Database](https://www.w3schools.com/sql/sql_datatypes_general.asp)peta ke manaERDDAP™jenis data, Anda perlu menentukan [&lt;Login (Login) Promo&lt;dataVariableSitemap (Login) SitemapERDDAP™DataType untuk digunakan. Bagian dari masalah adalah bahwa dataset yang berbeda menggunakan istilah yang berbeda untuk berbagai jenis data -- jadi selalu mencoba untuk mencocokkan definisi, bukan hanya nama. Lihat deskripsi[SitemapERDDAP™Sitemap Login](#data-types), yang mencakup referensi ke jenis data SQL yang sesuai.[Sitemap](#database-date-time-data)adalah kasus khusus: penggunaanERDDAPdata ganda Login
     
#### Database{#database-date-time-data} 
Beberapa kolom waktu tanggal database tidak memiliki zona waktu eksplisit. Kolom seperti itu adalah masalah untukERDDAPSitemap Database mendukung konsep tanggal (dengan atau tanpa waktu) tanpa zona waktu, sebagai kisaran perkiraan waktu. LoginJava  (danERDDAP) hanya berurusan dengan tanggal instan + waktu dengan zona waktu. Jadi Anda mungkin tahu bahwa data waktu tanggal didasarkan pada zona waktu setempat (dengan atau tanpa waktu hemat siang hari) atau GMT/Zuluzona waktu, tetapiJava  (LoginERDDAP) Sitemap Kita awalnya berpikir kita bisa bekerja di sekitar masalah ini (e.g, dengan menentukan zona waktu untuk kolom) database+JDBC+Javainteraksi membuat solusi yang tidak dapat diandalkan ini.
* SitemapERDDAP™mengharuskan Anda menyimpan semua data tanggal dan tanggal di tabel database dengan jenis data database yang sesuai dengan tipe JDBC "timestamp dengan zona waktu" (idealnya, yang menggunakan GMT/Zuluzona waktu) Sitemap
* SitemapERDDAPSitemapdatasets.xmlSitemap&lt;dataVariable&gt; tag untuk variabel kalitamp, set
    >     [&lt;dataType>double&lt;/dataType>](#datatype)  

dan&lt;addAttributesSitemap
```
          <att name="units">seconds since 1970-01-01T00:00:00Z</att>
```
* Saran: Jika data adalah rentang waktu, berguna untuk memiliki nilai timestamp merujuk ke pusat rentang waktu yang tidak diinginkan (misalnya, noon) Sitemap Misalnya, jika pengguna memiliki data untuk 2010-03-26T13:00Z dari dataset lain dan mereka ingin data terdekat dari dataset database yang memiliki data untuk setiap hari, maka data database untuk 2010-03-26T12:00Z (mewakili data untuk tanggal itu) jelas yang terbaik (bertentangan dengan tengah malam sebelum atau sesudah, di mana kurang jelas yang terbaik) Sitemap
*   ERDDAP™memiliki utilitas untuk[Mengkonversi Numeric Waktu ke/dari Waktu String](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)Sitemap
* Sitemap[SitemapERDDAPPenawaran dengan Waktu](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap)Sitemap
       
#### Login{#integer-nulls-1} 
Database (Login) kolom, tapiERDDAP™tidak mendukung nulls sejati.
DatabaseERDDAP™127 untuk kolom byte, 255 untuk kolom ubyte, 32767 untuk kolom pendek, 65535 untuk kolom ushort, 2147483647 untuk kolom int, 4294967295295 untuk kolom uint, 9,223,372,036,854,775,807 untuk kolom panjang, atau 18446744073709551615 untuk kolom ulong. Jika Anda menggunakan default, mohon mengidentifikasi mereka Meme itmissing\\_values untuk pengguna dataset diERDDAP™Login

>    &lt;att name="\\_FillValue" [type="int"](#attributetype)\\>2147483647&lt;/att>  

Sitemap

>    &lt;att name="\\_FillValue" [type="short"](#attributetype)\\>32767&lt;/att>  

Atau, Anda dapat menggunakan "missing\\_value" atribut bukan "\\_FillValue".
Login Xml secara otomatis menambahkan atribut \\_FillValue ini ketika menghasilkan sarandatasets.xmlDatabase

Untuk kolom titik mengambang database, nulls mendapatkan dikonversi ke NaNs diERDDAPSitemap
Untuk jenis data database yang dikonversi ke Strings dalamERDDAP™, nulls telah dikonversi ke string kosong.
    
#### Database{#database-security} 
* Ketika bekerja dengan database, Anda perlu melakukan hal-hal dengan aman dan aman mungkin untuk menghindari memungkinkan pengguna jahat untuk merusak database Anda atau mendapatkan akses ke data yang seharusnya tidak memiliki akses ke.ERDDAP™mencoba melakukan hal-hal dengan cara yang aman, juga.
    * Pertimbangkan replika, pada komputer yang berbeda, tabel database dan database dengan data yang Anda inginkanERDDAP™Sitemap (Ya, untuk database komersial sepertiOracleIni melibatkan biaya lisensi tambahan. Tapi untuk database open source, seperti PostgreSQL, MySQL, Amazon RDS, dan MariaDB, biaya ini tidak ada.) Ini memberi Anda tingkat keamanan yang tinggi dan juga mencegahERDDAP™permintaan dari memperlambat database asli.
    * Kami mendorong Anda untuk mengaturERDDAP™untuk terhubung ke database sebagai pengguna database yang hanya memiliki akses ke database **Sitemap** database (Login) dan hanya memiliki hak istimewa.
    * Kami mendorong Anda untuk mengatur koneksi dariERDDAP™ke database sehingga
        * selalu menggunakan SSL,
        * hanya memungkinkan koneksi dari satu alamat IP (atau satu blok alamat) dan dari satuERDDAP™pengguna, dan
        * hanya mentransfer password dalam bentuk hashed MD5 mereka.
    *   \\[KNOWN PROBLEM\\]Login (termasuk kata sandi&#33;) disimpan sebagai teks biasa dalamdatasets.xmlSitemap Kami tidak menemukan cara untuk memungkinkan administrator untuk memasukkan kata sandi database selamaERDDAP's startup di Tomcat (yang terjadi tanpa input pengguna) , jadi kata sandi harus dapat diakses dalam file. Untuk membuat ini lebih aman:
        * Login (LoginERDDAP™Login) harus menjadi pemilikdatasets.xmldan memiliki akses READ dan WRITE.
        * Membuat grup yang hanya mencakup user=tomcat. Gunakan chgrp untuk membuat kelompok untukdatasets.xmlHanya dengan hak istimewa READ.
        * Gunakan chmod untuk menetapkan hak istimewa o-rwx (tidak ada akses READ atau WRITE untuk pengguna "lain") Sitemapdatasets.xmlSitemap
    * SitemapERDDAP™, kata sandi dan sifat koneksi lainnya disimpan dalam "private"Javavariabel.
    * Permintaan dari klien dibuat dan diperiksa untuk validitas sebelum menghasilkan permintaan SQL untuk database.
    * Permintaan ke database dibuat dengan SQL MempersiapkanStatements, untuk mencegah[SQL database](https://en.wikipedia.org/wiki/SQL_injection)Sitemap
    * Permintaan ke database diserahkan dengan eksekusi Login (Sitemap) untuk membatasi permintaan untuk dibaca-hanya (sehingga mencoba injeksi SQL untuk mengubah database akan gagal karena alasan ini, terlalu) Sitemap
         
#### Login{#sql} 
* SitemapOPeNDAPPermintaan data tabular dirancang untuk meniru permintaan data tabular SQL, mudah untukERDDAP™untuk mengubah permintaan data tabular menjadi SQL sederhana MempersiapkanStatements. Sebagai contoh,ERDDAP™Sitemap
```
    time,temperature&time>=2008-01-01T00:00:00Z&time&lt;=2008-02-01T00:00:00Z  
```
akan dikonversi ke SQL MempersiapkanStatement
```
    SELECT "time", "temperature" FROM *tableName*  
    WHERE "time" >= 2008-01-01T00:00:00Z AND "time" &lt;= 2008-02-01T00:00:00Z  
```
ERDDAP™Sitemap () SitemaporderBy ( *variabel* ) akan menambahkan DISTINCT dan/atau ORDER BY *variabel* ke pernyataan yang disiapkan SQL. Secara umum, ini akan sangat memperlambat respons dari database.
ERDDAP™login[Login](/docs/server-admin/additional-information#log)Sitemap
```
    statement=*thePreparedStatement*  
```
Ini akan menjadi representasi teks dari MempersiapkanStatement, yang mungkin sedikit berbeda dari Persiapan yang sebenarnya. Sebagai contoh, dalam Persiapan, kali dikodekan dengan cara khusus. Tapi dalam representasi teks, mereka muncul sebagai waktu tanggal ISO 8601.
     
#### Database{#database-speed} 
* Database dapat lambat. Ada beberapa hal yang bisa Anda lakukan:
    * Sitemap
Sifat SQL adalah pertanyaan itu Meme it[Login](https://en.wikipedia.org/wiki/Declarative_programming)Sitemap Mereka hanya menentukan apa yang diinginkan pengguna. Meme it Mereka tidak termasuk spesifikasi atau petunjuk untuk bagaimana permintaan ditangani atau dioptimalkan. Jadi tidak ada cara untuk Meme itERDDAP™untuk menghasilkan query sedemikian rupa sehingga membantu database mengoptimalkan permintaan (atau dengan cara apapun menentukan bagaimana query adalah ditangani) Sitemap Secara umum, hingga administrator database untuk mengatur hal-hal sehingga (misalnya, indeks) untuk mengoptimalkan jenis pertanyaan tertentu.
##### Mengatur Ukuran Fetch{#set-the-fetch-size} 
DatabaseERDDAP™Login Secara default, database yang berbeda mengembalikan sejumlah baris yang berbeda di chunks. Sering jumlah ini sangat kecil dan sangat tidak efisien. Misalnya, default untukOracleadalah 10&#33; Baca dokumentasi JDBC untuk driver JDBC database Anda untuk menemukan properti koneksi untuk mengatur untuk meningkatkan ini, dan menambahkan ini ke deskripsi dataset dalamdatasets.xmlSitemap Sitemap
Untuk MySQL dan Amazon RDS, gunakan
```
        <connectionProperty name="defaultFetchSize">10000</connectionProperty>  
```
Untuk MariaDB, saat ini tidak ada cara untuk mengubah ukuran jantan. Tapi itu adalah fitur yang diminta, jadi cari web untuk melihat apakah ini telah diterapkan.
SitemapOracleSitemap
```
        <connectionProperty name="defaultRowPrefetch">10000</connectionProperty>  
```
Untuk PostgreSQL, gunakan
```
        <connectionProperty name="defaultRowFetchSize">10000</connectionProperty>  
```
tapi jangan ragu untuk mengubah nomor. Meme it Menyiapkan jumlah terlalu besar akan menyebabkanERDDAP™untuk menggunakan banyak memori dan lebih cenderung untuk keluar dari memori.
#### Login{#connectionproperties} 
Setiap database memiliki sifat koneksi lain yang dapat ditentukan dalamdatasets.xmlSitemap Banyak dari ini akan mempengaruhi kinerja database untuk Meme itERDDAP™Login Silakan baca dokumentasi untuk driver JDBC database Anda untuk melihat opsi. Jika Anda menemukan properti koneksi yang berguna, silakan kirim email dengan rincian keerd dot data at noaa dot govSitemap
* Membuat Tabel --
Anda mungkin akan mendapatkan tanggapan yang lebih cepat jika Anda secara berkala (Sitemap setiap kali ada data baru?) menghasilkan tabel yang sebenarnya (mirip dengan bagaimana Anda menghasilkan LIHAT) SitemapERDDAP™untuk mendapatkan data dari tabel bukan LIHAT. Karena setiap permintaan ke tabel kemudian dapat dipenuhi tanpa JOINing tabel lain, respons akan jauh lebih cepat.
* Vakum Tabel -
MySQL dan Amazon RDS akan merespon jauh lebih cepat jika Anda menggunakan[OPTIMIZE TABEL](https://dev.mysql.com/doc/refman/5.7/en/optimize-table.html)Sitemap
Login DB akan merespon lebih cepat jika Anda menggunakan[OPTIMIZE TABEL](https://mariadb.com/kb/en/optimize-table/)Sitemap
PostgreSQL akan merespon lebih cepat jika Anda[Login](https://www.postgresql.org/docs/8.3/static/sql-vacuum.html)tabel.
    Oracletidak memiliki atau membutuhkan perintah analog.
* Login[Login](https://en.wikipedia.org/wiki/Database_index)untuk variabel yang umum terlatih --
Anda dapat mempercepat banyak / sebagian besar pertanyaan dengan membuat indeks di database untuk variabel (database call "columns") yang sering dilatih dalam query pengguna. Secara umum, ini adalah variabel yang sama yang ditentukan oleh [&lt;subsetVariablesSitemap (Sitemap) dan/atau latitude, longitude, dan variabel waktu.
##### Menggunakan Pooling Koneksi{#use-connection-pooling} 
SitemapERDDAP™membuat koneksi terpisah ke database untuk setiap permintaan. Ini adalah pendekatan yang paling andal. Alternatif yang lebih cepat adalah menggunakan DataSource yang mendukung pooling koneksi. Untuk mengaturnya, tentukan (Sitemap)   
```
        <dataSourceName>java:comp/env/jdbc/postgres/erddap</dataSourceName>  
```
Sitemap&lt;sourceUrlSitemap&lt;driverName&gt;, dan&lt;Login Login
Dan *Login* /conf/context.xml, mendefinisikan sumber daya dengan informasi yang sama, misalnya,
```
        <Resource  
        name="jdbc/postgres/erddap" auth="Container" type="javax.sql.DataSource"  
        driverClassName="org.postgresql.Driver"  
        url="*jdbc:postgresql://somehost:5432/myDatabaseName*"  
        username="*myUsername*" password="*myPassword*"  
        initialSize="0" maxActive="8" minIdle="0" maxIdle="0" maxWait="-1"/>  
```
Informasi umum tentang menggunakan DataSource adalah[ https://docs.oracle.com/javase/tutorial/jdbc/basics/sqldatasources.html ](https://docs.oracle.com/javase/tutorial/jdbc/basics/sqldatasources.html)Sitemap
Sitemap[Informasi Tomcat DataSource](https://tomcat.apache.org/tomcat-7.0-doc/jndi-resources-howto.html#JDBC_Data_Sources)Login[Contoh Tomcat DataSource](https://tomcat.apache.org/tomcat-7.0-doc/jndi-datasource-examples-howto.html)atau mencari web misalnya menggunakan DataSources dengan server aplikasi lainnya.
* Jika semua gagal lain,
mempertimbangkan menyimpan data dalam koleksiNetCDFg.ncLogin (Sitemap.ncfile yang menggunakan[Login Sitemap (Login) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Struktur data Array yang berkelanjutan dan dapat ditangani denganERDDAPSitemap[Sitemap](#eddtablefromnccffiles)) Sitemap Jika mereka diatur secara logis (setiap data untuk chunk ruang dan waktu) LoginERDDAP™dapat mengekstrak data dari mereka dengan sangat cepat.
         
#### EDDTableDari Database skeleton Login{#eddtablefromdatabase-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromDatabase" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The format varies for each type of database, but will be  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;something like:  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For MariaDB:    jdbc:mariadb://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For MySql       jdbc:mysql://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Amazon RDS: jdbc:mysql://*xxx.xxx.xxx.xxx*:3306/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Oracle:     jdbc:oracle:thin:@*xxx.xxx.xxx.xxx*:1521:*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For Postgresql: jdbc:postgresql://*xxx.xxx.xxx.xxx*:5432/*databaseName*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;where *xxx.xxx.xxx.xxx* is the host computer's numeric IP address  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;followed by :*PortNumber* (4 digits), which may be different for your  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;database.  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[driverName](#jdbc-driver)\\>...&lt;/driverName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The high-level name of the database driver, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"org.postgresql.Driver".  You need to put the actual database  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;driver .jar file (for example, postgresql.jdbc.jar) in  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;*tomcat*/webapps/erddap/WEB-INF/lib.  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[connectionProperty](#database-connectionproperty) name="*name*">*value*&lt;/connectionProperty>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The names (for example, "user", "password", and "ssl")  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and values of the properties needed for ERDDAP™ to establish  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;the connection to the database.  0 or more. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataSourceName>](#use-connection-pooling)...&lt;/dataSourceName>  &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;catalogName>...&lt;/catalogName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- The name of the catalog which has the schema which has the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;table, default = "".  OPTIONAL.  Some databases don't use  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;schemaName>...&lt;/schemaName> &lt;!-- The name of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;schema which has the table, default = "".  OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;tableName>...&lt;/tableName>  &lt;!-- The name of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;table, default = "".  REQUIRED. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;columnNameQuotes>](#quotes-for-names-and-case-sensitivity)&lt;columnNameQuotes> &lt;!-- OPTIONAL. Options:  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" (the default), ', \\[nothing\\]. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;orderBy>...&lt;/orderBy>  &lt;!-- A comma-separated list of  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[sourceName](#sourcename)s to be used in an ORDER BY clause at the end of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;every query sent to the database (unless the user's request  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;includes an &orderBy() filter, in which case the user's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;orderBy is used).  The order of the sourceNames is important.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The leftmost (first) sourceName is most important; subsequent  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sourceNames are only used to break ties.  Only relevant  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sourceNames are included in the ORDER BY clause for a given user  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;request.  If this is not specified, the order of the returned  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;values is not specified. Default = "".  OPTIONAL. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanOrderBy>](#sourcecanorderby)no(default)|partial|yes&lt;/sourceCanOrderBy>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceCanDoDistinct>](#sourcecandodistinct)no(default)|partial|yes&lt;/sourceCanDoDistinct>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Each dataVariable MUST include a [&lt;dataType>](#datatype) tag.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;See [Database DataTypes](#database-datatype).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For [database date and timestamp columns](#database-date-time-data), set dataType=double and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;units=seconds since 1970-01-01T00:00:00Z -->  
>&nbsp;&nbsp;&lt;/dataset>  

### LoginEDDGrid {#eddtablefromeddgrid} 
[ **LoginEDDGrid** ](#eddtablefromeddgrid)memungkinkan Anda membuat dataset EDDTable dari apa punEDDGridLogin

* Beberapa alasan umum untuk melakukan ini adalah:
    * Ini memungkinkan dataset untuk ditanyakan dengan Meme itOPeNDAPkontratraints seleksi, yang merupakan jenis "query by value" (mana pengguna mungkin diminta Meme it) Sitemap
    * Dataset melekat pada dataset tabular.
* Nilai atribut global "maxAxis0" (biasanya dari type="int") Login (default adalah 10) akan digunakan untuk membatasi jumlah sumbu\\[Sitemap\\]  (biasanya"time"Login) nilai tertutupEDDGriddataset yang dapat diakses sesuai permintaan data. Jika Anda tidak ingin ada batas, tentukan nilai 0. Pengaturan ini penting karena, jika tidak, akan terlalu mudah bagi pengguna untuk meminta EDDTableDariEDDGriduntuk melihat melalui semua dataset gridded. Itu akan memakan waktu lama dan hampir pasti gagal dengan kesalahan timeout. Ini adalah pengaturan yang membuatnya aman untuk memiliki EDDTableDariEDDGridLoginERDDAPtanpa takut bahwa mereka akan menyebabkan penggunaan sumber daya komputasi yang tidak masuk akal.
* Jika tertutupEDDGridSitemap[EDDGridLogin](#eddfromerddap)danERDDAP™samaERDDAP, kemudian EDDTableDariEDDGridakan selalu menggunakan versi dataset yang tersedia saat ini secara langsung. Ini adalah cara yang sangat efisien untuk EDDTableDariEDDGriduntuk mengakses data gridded.
* Sitemap&lt;Login Login (Sitemap) adalah apa yang dihitung. SitemapEDDGridSitemap&lt;reloadEveryNMinutes&gt; diabaikan.
* Jika nilai untuk [&lt;Login (Login) disediakan untuk dataset ini, diabaikan. SitemapEDDGridSitemap&lt;updateEveryNMillis&gt; adalah apa masalah.
*   [Login](#generatedatasetsxml)memiliki opsi untuk jenis dataset = DIDTableDariEDDGridyang meminta URL dari sebuahERDDAP  (biasanya samaERDDAP)   (ending di "/erddap/") dan ekspresi reguler. Login Xml kemudian akan menghasilkan XML untuk EDDTableDariEDDGriddataset untuk setiap dataset gridded diERDDAP™yang memiliki Meme itdatasetIDyang sesuai dengan ekspresi reguler (gunakan .\\* untuk mencocokkan semuadatasetIDs untuk dataset gridded) Sitemap
    
Potongan dari XML yang dihasilkan oleh GenerateDatasetsXml untuk setiap dataset termasuk:
    
    * LogindatasetIDyang merupakanEDDGridSitemapdatasetIDditambah "\\_AsATable".
    * Atribut global ringkasan baru yang merupakanEDDGrid's ringkasan ditambah paragraf pertama baru yang menggambarkan apa dataset ini.
    * Atribut global judul baru yang merupakanEDDGrid's judul plus ", (Sebagai Tabel) Sitemap
    * Atribut global maxAxis0 baru dengan nilai 10.
#### LoginEDDGridLogin{#eddtablefromeddgrid-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromEDDGrid" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDTableFromEDDGrid, this calls lowUpdate() of the underlying  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDGrid. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes>  &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataset>](#eddgrid)...&lt;/dataset> &lt;!-- 1  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Any type of EDDGrid dataset.  You can even use an  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; EDDGridFromERDDAP™ to access an independent EDDGrid dataset on  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; this server. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/dataset>  

### Login{#eddtablefromfilenames} 
[ **Login** ](#eddtablefromfilenames)membuat dataset dari informasi tentang sekelompok file dalam sistem file server, termasuk URL untuk setiap file sehingga pengguna dapat mengunduh file melaluiERDDAPSitemap["files"sistem](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)Sitemap Tidak seperti semua[Login](#eddtablefromfiles)subclasses, jenis dataset ini tidak melayani data dari dalam file.

* EDDTableDariNames berguna ketika:
    * Anda memiliki sekelompok file yang ingin Anda mendistribusikan seluruh file karena mereka tidak mengandung "data" dengan cara yang sama bahwa file data reguler memiliki data. Misalnya, file gambar, file video, dokumen Word, file spreadsheet Excel, file presentasi PowerPoint, atau file teks dengan teks yang tidak terstruktur.
    * Anda memiliki sekelompok file yang memiliki data dalam format yang Meme itERDDAP™belum dibaca. Misalnya, format biner yang spesifik, kustom, proyek.
         
#### EDDTableDariNames Data{#eddtablefromfilenames-data} 
*   [Data di EDDTableDariFileNames dataset](#eddtablefromfilenames-data)adalah tabel yangERDDAP™menciptakan on-the-fly dengan informasi tentang sekelompok file lokal. Dalam tabel, ada baris untuk setiap file. Empat atribut khusus di[datasets.xmldataset](#eddtablefromfilenames-skeleton-xml)menentukan file mana yang akan dimasukkan dalam dataset ini:
    
##### Login Login{#filedir} 
    *   &lt;Login Ini menentukan direktori sumber dalam sistem file server dengan file untuk dataset ini. File yang sebenarnya terletak di sistem file server di&lt;fileDir&gt; akan muncul di kolom url dataset ini dalam direktori virtual bernama https://*serverUrl*/erddap/files/*datasetID/* Sitemap
Contohnya, jikadatasetIDjplMURSSLogin
dan&lt;fileDir&gt; adalah /home/data/mur/,
dan direktori itu memiliki file bernama jplMURSST20150103000000.png,
maka URL yang akan ditampilkan kepada pengguna untuk file itu akan ditampilkan
         https://*serverUrl*/erddap/jplMURSST/jplMURSST20150103000000.png Sitemap
        
Selain menggunakan direktori lokal untuk&lt;fileDir&gt;, Anda juga dapat menentukan URL dari lama, halaman web seperti direktori. Ini bekerja dengan:
        
        * Dataset tidak agregasi di THREDDS, misalnya,
             https://data.nodc.noaa.gov/thredds/catalog/aquarius/nodc\\_binned\\_V3.0/monthly/  \\[2020-10-21 Server ini tidak lagi tersedia.\\]
        * DatabaseHyraxSitemap
            [ https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ ](https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/)
        * Kebanyakan daftar direktori Apache-like, misalnya,
            [ https://www1.ncdc.noaa.gov/pub/data/cmb/ersst/v5/netcdf/ ](https://www1.ncdc.noaa.gov/pub/data/cmb/ersst/v5/netcdf/)
##### Login{#fromonthefly} 
[\\*\\*Sitemap](#fromonthefly)Login Untuk beberapa ember S3 besar (seperti noaa-goes17, yang memiliki 26 juta file) , itu mungkin mengambilERDDAP™hingga 12 jam untuk mengunduh semua informasi tentang isi ember (dan kemudian ada masalah lain Meme it) Sitemap Untuk mendapatkan sekitar ini, ada cara khusus untuk digunakan&lt;fileDir&gt; di EDDTableDariFileNames untuk membuat dataset dengan direktori dan nama file dari ember AWS S3. Dataset tidak akan memiliki daftar semua direktori bucket S3 dan nama file yang dapat dicari pengguna melalui permintaan dataset. Tapi dataset akan mendapatkan nama direktori dan file on-the-fly jika pengguna melintang hierarki direktori dengan dataset's"files"Login Dengan demikian, ini memungkinkan pengguna untuk menelusuri hierarki file ember S3 dan file melalui dataset"files"sistem. Untuk melakukan ini, alih-alih menentukan URL untuk ember S3 sebagai "Starting directory" (di GenerateDataset Login) Sitemap&lt;Login (Sitemapdatasets.xml) Penggunaan:
```
\\*\\*\\*fromOnTheFly,*theS3BucketUrl*  
```
contoh:
```
\\*\\*\\*fromOnTheFly,https://noaa-goes17.s3.us-east-1.amazonaws.com/  
```
Lihat dokumentasi untuk[bekerja dengan S3 Bucket diERDDAP™](#working-with-aws-s3-files)Tidak ada deskripsi format spesifik yang harus digunakan untuk URL ember S3. Dan lihat
[rincian ini dan contoh](#making-an-eddtablefromfilenames-dataset-with-an-aws-s3-bucket)penggunaan\\*\\*Sitemap
        
##### Sitemap{#recursive} 
*   &lt;Sitemap File di subdirectories&lt;fileDir&gt; dengan nama yang cocok&lt;fileRegex&gt; akan muncul dalam subdirectories yang sama di"files"URL&lt;rekursif&gt; ditetapkan untuk benar. default adalah palsu.
* Sitemap&lt;Login (Login) Login Jika recursive=true, Hanya nama direktori yang sesuai dengan pathRegex (default=".\\*") diterima. Jika rekursif=false, ini diabaikan. Ini jarang digunakan, tetapi bisa sangat berguna dalam keadaan yang tidak biasa. (Lihat ini[database](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)Login[Login](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)Sitemap) 
##### Login{#fileregex} 
*   &lt;Login Hanya nama file di mana seluruh nama file (tidak termasuk nama direktori) Sitemap&lt;fileRegex&gt; akan disertakan dalam dataset ini. Contohnya, jplMURSST.&#123;14&#125;\\.png . (Lihat ini[database](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)Login[Login](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)Sitemap)   
         
##### Dari Nama File Konten tabel Data{#from-file-names-data-table-contents} 
Di meja, akan ada kolom dengan:
* Login URL yang dapat digunakan pengguna untuk mengunduh file melaluiERDDAPSitemap["files"sistem](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)Sitemap
* Sitemap Nama file (tanpa nama direktori) Sitemap
* Sitemap Waktu file diubah terakhir (disimpan sebagai ganda dengan"seconds since 1970-01-01T00:00:00Z") Sitemap Variabel ini berguna karena pengguna dapat melihat apakah/ketika isi dari file yang diberikan diubah. Variabel ini adalah[Sitemap variabel Stamp](#timestamp-variables)sehingga data dapat muncul sebagai nilai numerik (detik sejak 1970-01-01T00:00Z) atau nilai String (ISO9001,SGS,TUV (Login) Login) tergantung pada situasi.
* ukuran - Ukuran file di byte, disimpan sebagai ganda. Mereka disimpan sebagai ganda karena beberapa file mungkin lebih besar dari tidak memungkinkan dan panjang tidak didukung dalam beberapa jenis file respons. Ganda akan memberikan ukuran yang tepat, bahkan untuk file yang sangat besar.
* kolom tambahan yang didefinisikan olehERDDAP™administrator dengan informasi yang diekstrak dari nama file (misalnya, waktu yang terkait dengan data dalam file) berdasarkan dua atribut yang Anda tentukan dalam metadata untuk setiap kolom tambahan /dataVariableSitemap
    
    * Sitemap Ini adalah[ekspresi reguler](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  ([Login](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) Sitemap Seluruh regex harus sesuai dengan seluruh nama file (tidak termasuk nama direktori) Sitemap regex harus mencakup setidaknya satu kelompok capture (bagian dari ekspresi rutin yang ditutupi oleh orang tua) SitemapERDDAP™menggunakan untuk menentukan bagian mana dari nama file untuk mengekstrak menjadi data.
    * Login Sitemap Ini adalah jumlah kelompok capture (#1 adalah kelompok capture pertama) dalam ekspresi reguler. default adalah 1. Kelompok penangkapan adalah bagian dari ekspresi rutin yang dilampirkan oleh orang tua.
    
Berikut adalah dua contoh:
```
            <dataVariable>
                <sourceName>time</sourceName>
                <destinationName>time</destinationName>
                <dataType>String</dataType>
                <addAttributes>
                    <att name="extractRegex">jplMURSST(.{14})\\.png</att>
                    <att name="extractGroup" type="int">1</att>
                    <att name="units">yyyyMMddHHmmss</att>
                </addAttributes>
            </dataVariable>
```
```
            <dataVariable>
                <sourceName>day</sourceName>
                <destinationName>day</destinationName>
                <dataType>int</dataType>
                <addAttributes>
                    <att name="extractRegex">jplMURSST.{6}(..).{6}\\.png</att>
                    <att name="extractGroup" type="int">1</att>
                    <att name="ioos\\_category">Time</att>
                </addAttributes>
            </dataVariable> 
```
Dalam kasus variabel waktu, jika file memiliki nama jplMURSST20150103000000.png, ekstrakRegex akan mencocokkan nama file, mengekstrak karakter yang sesuai dengan kelompok capture pertama ("20150103000000") sebagai dataType=String, kemudian gunakan[unit cocok untuk waktu string](#string-time-units)untuk membuat string menjadi nilai data waktu (2015-01-03T00:00Z) Sitemap

Dalam kasus variabel hari, jika file memiliki nama jplMURSST20150103000000.png, ekstrakRegex akan mencocokkan nama file, mengekstrak karakter yang sesuai dengan kelompok capture pertama ("03") Sitemap&lt;Login (Login) \\=int, menghasilkan nilai data 3.
        
#### Informasi Lainnya{#other-information} 
* Sitemap&lt;Login (Login) Login Jenis dataset tidak perlu dan tidak dapat menggunakan&lt;updateEveryNMillis&gt; tag karena informasi yang dilayani oleh EDDTableDariFileNames selalu sempurna up-to-date karenaERDDAP™kueri sistem file untuk menanggapi setiap permintaan data. Bahkan jika ada sejumlah besar file, pendekatan ini harus bekerja dengan baik. Tanggapan mungkin lambat jika ada sejumlah besar file dan dataset belum dikuasai untuk sementara. Tetapi selama beberapa menit setelah itu, sistem operasi menyimpan informasi dalam cache, jadi tanggapan harus sangat cepat.
     
* Anda dapat menggunakan[Login Program Xml](#generatedatasetsxml)untuk membuatdatasets.xmlchunk untuk jenis dataset ini. Anda dapat menambahkan/define kolom tambahan dengan informasi yang diekstrak dari nama file, seperti yang ditunjukkan di atas.
     
#### EDDTableDariNames skeleton Login{#eddtablefromfilenames-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromFileNames" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileDir>](#eddtablefromfilenames-data)...&lt;/fileDir>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;recursive>](#eddtablefromfilenames-data)...&lt;/recursive>  &lt;!-- true or false (the default) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileNameRegex>](#eddtablefromfilenames-data)...&lt;/fileNameRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Each dataVariable MUST include [&lt;dataType>](#datatype) tag. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### Login{#eddtablefromfiles} 
[ **Login** ](#eddtablefromfiles)adalah kelas super dari semua kelas EDDTableDari...Files. Anda tidak dapat menggunakan EDDTableDariFiles secara langsung. Alih-alih, gunakan subclass dari EDDTableDariFiles untuk menangani jenis file tertentu:

*   [Login](#eddtablefromasciifiles)agregat data dari comma-, tab-, semicolon-, atau file data tabular yang dipisahkan ruang.
*   [Datasheet](#eddfromaudiofiles)agregat data dari sekelompok file audio lokal.
*   [Login Login](#eddtablefromawsxmlfiles)agregat data dari satu set Stasiun Cuaca Otomatis (Login) XML API
*   [Sitemap](#eddtablefromcolumnarasciifiles)agregat data dari file data tabular ASCII dengan kolom data tetap lebar.
*   [LoginHyraxLogin](#eddtablefromhyraxfiles)  (Login) agregat data dengan beberapa variabel, masing-masing dengan dimensi bersama (misalnya, waktu, ketinggian (atau kedalaman) , lintang, longitude) dan dilayani oleh a[Hyrax OPeNDAPLogin](https://www.opendap.org/software/hyrax-data-server)Sitemap
*   [Login](#eddtablefrominvalidcrafiles)data agregat dariNetCDF  (v3 atau v4)  .ncfile yang menggunakan khusus, tidak valid, varian CF DSG Contiguous Ragged Array (Login) Login LoginERDDAP™mendukung jenis file ini, itu adalah jenis file yang tidak valid yang tidak ada yang harus mulai menggunakan. Kelompok yang saat ini menggunakan jenis file ini sangat didorong untuk digunakanERDDAP™untuk menghasilkan file CF DSG CRA yang valid dan berhenti menggunakan file ini.
*   [Login](#eddtablefromjsonlcsvfiles)data agregat dari[Login Garis file CSV](https://jsonlines.org/examples/)Sitemap
*   [Sitemap](#eddtablefrommultidimncfiles)data agregat dariNetCDF  (v3 atau v4)  .nc  (Sitemap[.ncLogin](#ncml-files)) file dengan beberapa variabel, masing-masing dengan dimensi bersama (misalnya, waktu, ketinggian (atau kedalaman) , lintang, longitude) Sitemap
*   [Login](#eddtablefromncfiles)data agregat dariNetCDF  (v3 atau v4)  .nc  (Sitemap[.ncLogin](#ncml-files)) file dengan beberapa variabel, masing-masing dengan dimensi bersama (misalnya, waktu, ketinggian (atau kedalaman) , lintang, longitude) Sitemap Sangat baik untuk terus menggunakan jenis dataset ini untuk dataset yang ada, tetapi untuk dataset baru kami merekomendasikan menggunakan EDDTableDariMultidimNcFiles.
*   [Sitemap](#eddtablefromnccffiles)data agregat dariNetCDF  (v3 atau v4)  .nc  (Sitemap[.ncLogin](#ncml-files)) file yang menggunakan salah satu format file yang ditentukan oleh[Login Sitemap (Login) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)konvensi. Tapi untuk file menggunakan salah satu varian CF DSG multidimensional, gunakan[Sitemap](#eddtablefrommultidimncfiles)Sitemap
*   [Login](#eddtablefromnccsvfiles)data agregat dari[Login](/docs/user/nccsv-1.00)ASCII .csv file.
*   [Login](#eddtablefromparquetfiles)menangani data dari[Login](https://parquet.apache.org/)Sitemap
*   [Sitemap](#eddtablefromthreddsfiles)  (Login) agregat data dari file dengan beberapa variabel dengan dimensi bersama yang dilayani oleh[LoginOPeNDAPLogin](https://www.unidata.ucar.edu/software/tds/)Sitemap
*   [LoginWFSLogin](#eddtablefromwfsfiles)  (Login) membuat salinan lokal dari semua data dariArcGISLoginWFSserver sehingga data kemudian dapat diakses kembali dengan cepat Meme itERDDAP™pengguna.

Saat ini, tidak ada jenis file lain yang didukung. Tapi biasanya relatif mudah untuk menambahkan dukungan untuk jenis file lainnya. Hubungi kami jika Anda memiliki permintaan. Atau, jika data Anda dalam format file lama yang ingin Anda pindah dari, kami merekomendasikan mengkonversi file menjadiNetCDFg.ncLogin (dan terutama.ncfile dengan[Login Sitemap (Login) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Struktur data Array yang berkelanjutan -ERDDAP™dapat mengekstrak data dari mereka dengan sangat cepat) SitemapNetCDFadalah format biner yang didukung secara luas, memungkinkan akses acak cepat ke data, dan sudah didukung olehERDDAPSitemap

#### DariFiles Detail{#fromfiles-details} 
Informasi berikut berlaku untuk semua subkelas EDDTableDariFiles.
##### Login{#aggregation} 
Data agregat kelas ini dari file lokal. Setiap file memegang (Sitemap) tabel kecil data.
    * Dataset yang dihasilkan muncul seolah-olah semua tabel file telah dikombinasikan (semua baris data dari file #1, ditambah semua baris dari file #2, ...) Sitemap
    * File tidak semua harus memiliki semua variabel yang ditentukan. Jika file yang diberikan tidak memiliki variabel yang ditentukan,ERDDAP™akan menambahkan nilai yang hilang sesuai kebutuhan.
    * Variabel dalam semua file MUST memiliki nilai yang sama untuk[add\\_offset](#scale_factor)Login[missing\\_value](#missing_value)Login[Login Login](#missing_value)Login[scale\\_factor](#scale_factor)Sitemap[Login](#units)Login (Sitemap) SitemapERDDAP™cek, tapi itu adalah tes yang sempurna - jika ada nilai yang berbeda,ERDDAPtidak tahu yang benar dan oleh karena itu file yang tidak valid. Jika ini adalah masalah, Anda mungkin dapat menggunakan[Login](#ncml-files)Sitemap[NCO](#netcdf-operators-nco)untuk memperbaiki masalah.
         
##### File Terkompresi{#compressed-files} 
File data sumber untuk semua subclass EDDTableDariFiles dapat dikompresi secara eksternal (Login.tgzLogin.tar.gzLogin.tar.gzipLogin.gzLogin.gzipLogin.zipLogin.bz2Sitemap) Sitemap Sitemap[Dokumentasi File Terkompresi secara eksternal](#externally-compressed-files)Sitemap
     
##### Informasi File Cached{#cached-file-information-1} 
* Ketika dataset EDDTableDariFiles pertama dimuat, EDDTableDariFiles membaca informasi dari semua file yang relevan dan membuat tabel (satu baris untuk setiap file) dengan informasi tentang setiap file yang valid dan masing-masing "buruk" (berbeda atau tidak valid) Login
    * Tabel juga disimpan di disk, sepertiNetCDFg.ncfile di *Login* Login *Sitemap* Sitemap *datasetID* / dalam file bernama:
Login.nc  (yang memegang daftar nama direktori unik) Login
Login Login.nc  (yang memegang tabel dengan setiap informasi file yang valid) Login
Login.nc  (yang memegang tabel dengan setiap informasi file yang buruk) Sitemap
    * Untuk mempercepat akses ke dataset EDDTableDariFiles (tetapi dengan biaya menggunakan lebih banyak memori) Anda dapat menggunakan
Sitemap&lt;Sitemap&lt;Login (Login)   
SitemapERDDAP™untuk menyimpan salinan tabel informasi file dalam memori.
    * Salinan tabel informasi file di disk juga berguna ketikaERDDAP™dimatikan dan direstart: menyimpan EDDTable Dari File yang harus dibaca kembali semua file data.
    * Ketika dataset diisi ulang,ERDDAP™hanya perlu membaca data dalam file dan file baru yang telah berubah.
    * Jika file memiliki struktur yang berbeda dari file lain (misalnya, jenis data yang berbeda untuk salah satu variabel, atau nilai yang berbeda untuk "[Login](#units)" atribut) LoginERDDAPmenambahkan file ke daftar file "buruk". Informasi tentang masalah dengan file akan ditulis ke *Login* /logs/log.txt.
    * Anda tidak perlu menghapus atau bekerja dengan file ini. Satu pengecualian adalah: jika Anda masih membuat perubahan pada datasetdatasets.xmlsetup, Anda mungkin ingin menghapus file ini untuk memaksaERDDAP™untuk membaca semua file sejak file akan dibaca/interpreted berbeda. Jika Anda pernah perlu menghapus file ini, Anda dapat melakukannya ketikaERDDAP™berjalan. (Kemudian atur[Login](/docs/server-admin/additional-information#set-dataset-flag)untuk memuat ulang dataset ASAP.) LoginERDDAP™biasanya memperhatikan bahwadatasets.xmlinformasi tidak sesuai dengan file Informasi tabel dan menghapus tabel file secara otomatis.
    * Jika Anda ingin mendorongERDDAP™untuk memperbarui informasi dataset yang tersimpan (misalnya, jika Anda hanya menambahkan, dihapus, atau mengubah beberapa file ke direktori dataset) , gunakan[sistem bendera](/docs/server-admin/additional-information#flag)kekuatanERDDAP™untuk memperbarui informasi file yang tersimpan.
         
##### Permintaan Penanganan{#handling-requests-1} 
*   ERDDAP™permintaan data tabel dapat menempatkan batasan pada variabel apa pun.
    * Ketika permintaan klien untuk data diproses, EDDTableDariFiles dapat dengan cepat melihat di tabel dengan informasi file yang valid untuk melihat file mana mungkin memiliki data yang relevan. Misalnya, jika setiap file sumber memiliki data untuk satu buoy tetap-lokasi, EDDTableDariFiles dapat sangat efisien menentukan file mana yang mungkin memiliki data dalam rentang longitude dan rentang lintang tertentu.
    * Karena tabel informasi file yang valid termasuk nilai minimum dan maksimum setiap variabel untuk setiap file yang valid, EDDTableDariFiles sering dapat menangani pertanyaan lain cukup efisien. Misalnya, jika beberapa buoy tidak memiliki sensor tekanan udara, dan data permintaan klien untuk tekanan udara&#33; = NaN, EDDTableDariFiles dapat secara efisien menentukan buoys yang memiliki data tekanan udara.
         
##### Memperbarui Informasi File Cached{#updating-the-cached-file-information-1} 
Kapan pun dataset diisi ulang, informasi file yang tersimpan diperbarui.
    
* Dataset diisi ulang secara berkala sebagaimana ditentukan oleh&lt;reloadEveryNMinutes&gt; dalam informasi dataset dalamdatasets.xmlSitemap
* DatabaseERDDAP™mendeteksi bahwa Anda telah menambahkan, dihapus,[Sitemap](https://en.wikipedia.org/wiki/Touch_(Unix)Sitemap (untuk mengubah file terakhir Waktu yang dimodifikasi) , atau mengubah file data.
* Dataset diisi ulang sesegera mungkin jika Anda menggunakan[sistem bendera](/docs/server-admin/additional-information#flag)Sitemap

Ketika dataset diisi ulang,ERDDAP™membandingkan file yang tersedia saat ini ke tabel informasi file yang tersimpan. File baru dibaca dan ditambahkan ke tabel file yang valid. File yang tidak lagi ada dijatuhkan dari tabel file yang valid. File di mana file timestamp telah berubah dibaca dan informasi mereka diperbarui. Tabel baru menggantikan tabel lama dalam memori dan pada disk.
     
##### Login{#bad-files-1} 
Tabel file buruk dan alasan file dinyatakan buruk (file rusak, variabel hilang, nilai sumbu yang salah, dll.) email ke email Sitemap Untuk alamat email (mungkin Anda Meme it) setiap kali dataset diisi ulang. Anda harus mengganti atau memperbaiki file ini sesegera mungkin.
     
##### variabel hilang{#missing-variables-1} 
Jika beberapa file tidak memiliki beberapa filedataVariabledatasetdatasets.xmlLogin Ketika EDDTableDariFiles membaca salah satu file tersebut, itu akan bertindak seolah-olah file memiliki variabel, tetapi dengan semua nilai yang hilang.
     
##### Database{#near-real-time-data} 
* EDDTableDaris memperlakukan permintaan untuk data yang sangat baru-baru ini sebagai kasus khusus. Masalahnya: Jika file membuat dataset diperbarui sering, kemungkinan dataset tidak akan diperbarui setiap kali file diubah. Jadi EDDTableDariFiles tidak akan menyadari file yang berubah. (Anda bisa menggunakan[sistem bendera](/docs/server-admin/additional-information#flag)tapi ini mungkin menyebabkan Meme itERDDAP™reloading dataset hampir terus menerus. Jadi dalam kebanyakan kasus, kita tidak merekomendasikannya. Meme it) Alih-alih, EDDTableDariFiles mengurus ini oleh sistem berikut: SitemapERDDAP™mendapat permintaan data dalam 20 jam terakhir (misalnya, 8 jam yang lalu sampai sekarang) LoginERDDAP™akan mencari semua file yang memiliki data dalam 20 jam terakhir. SitemapERDDAP™tidak perlu memiliki data terkini yang sempurna untuk semua file untuk menemukan data terbaru. Anda masih harus mengatur [&lt;Login Login (Sitemap) untuk nilai kecil yang wajar (misalnya, 60) tapi tidak harus kecil Meme it (misalnya, 3) Sitemap
     
    *    **Tidak disarankan** organisasi data waktu dekat dalam file: Jika, misalnya, Anda memiliki dataset yang menyimpan data untuk banyak stasiun (atau buoy, atau trajectory, ...) selama bertahun-tahun, Anda dapat mengatur file sehingga, misalnya, ada satu file per stasiun. Tapi, setiap kali data baru untuk stasiun tiba, Anda harus membaca file lama besar dan menulis file baru besar. DanERDDAP™memuat ulang dataset, pemberitahuan bahwa beberapa file telah dimodifikasi, sehingga membaca file tersebut sepenuhnya. Itu tidak efisien.
         
    *    **Sitemap** organisasi data waktu dekat dalam file: Simpan data dalam chunks, misalnya, semua data untuk satu stasiun / gelembung / lintasan untuk satu tahun (atau satu bulan) Sitemap Kemudian, ketika datum baru tiba, hanya file dengan tahun ini (atau bulan) data dipengaruhi.
        
        * Sitemap SitemapNetCDFg.ncfile dengan dimensi tak terbatas (Sitemap) Sitemap Kemudian, untuk menambahkan data baru, Anda hanya dapat menerapkan data baru tanpa harus membaca dan menulis ulang seluruh file. Perubahan ini dibuat sangat efisien dan pada dasarnya secara atom, sehingga file tidak pernah dalam keadaan yang tidak konsisten.
        * Jika Anda tidak dapat menggunakan.ncfile dengan dimensi tak terbatas (Sitemap) , kemudian, ketika Anda perlu menambahkan data baru, Anda harus membaca dan menulis ulang seluruh file yang terkena (semoga kecil karena hanya memiliki tahun Meme it (atau bulan) Sitemap) Sitemap Untungnya, semua file selama bertahun-tahun sebelumnya (atau bulan) untuk stasiun itu tetap tidak berubah. Meme it
        
Dalam kedua kasus, ketikaERDDAP™memuat ulang dataset, sebagian besar file tidak berubah; hanya beberapa, file kecil telah berubah dan perlu dibaca.
         
##### Login{#directories-1} 
File dapat dalam satu direktori, atau dalam direktori dan subdirectoriesnya (Sitemap) Sitemap Jika ada sejumlah besar file (misalnya, &gt; 1,000) , sistem operasi (dan dengan demikian EDDTableDariFiles) akan beroperasi lebih efisien jika Anda menyimpan file dalam serangkaian subdirectories (satu per tahun, atau satu per bulan untuk dataset dengan file yang sangat sering) , sehingga tidak pernah ada sejumlah besar file dalam direktori tertentu.
     
##### Direktori Jarak Jauh dan Permintaan Rentang HTTP{#remote-directories-and-http-range-requests-1} 
*    **Direktori Jarak Jauh dan Permintaan Rentang HTTP**   (AKA Byte Melayani, Byte Range Permintaan) Login
    EDDGridDariNcFiles, EDDTableDariMultidimNcFiles, EDDTableDariNcFiles, dan EDDTableDariNcCFFiles, kadang-kadang dapat melayani data dari.ncfile pada server jarak jauh dan diakses melalui HTTP jika server mendukung[Login](https://en.wikipedia.org/wiki/Byte_serving)melalui permintaan rentang HTTP (mekanisme HTTP untuk melayani byte) Sitemap Ini mungkin karena netcdf-java (SitemapERDDAP™Login.ncLogin) mendukung data membaca dari jarak jauh.ncfile melalui permintaan rentang HTTP.
    
     **Jangan melakukan ini&#33;**   
Alih-alih, gunakan [&lt;cacheDariUrl&gt; sistem] (Login) Sitemap
    
##### Login{#cachefromurl} 
* Sitemap ** &lt;Login ** Sitemap (Login) Login
SitemapEDDGridDariFiles dan semua dataset EDDTableDariFiles mendukung satu set tag yang memberitahukanERDDAP™untuk mengunduh dan memelihara salinan semua file dataset jarak jauh, atau cache beberapa file (download sesuai kebutuhan) Sitemap **Ini adalah fitur yang sangat berguna.** 
    * Login&lt;cacheFromUrl&gt; tag memungkinkan Anda menentukan URL dengan daftar file dataset jarak jauh dari daftar file jarak jauh.
        
        * Dataset tidak agregasi di THREDDS, misalnya,
             https://data.nodc.noaa.gov/thredds/catalog/aquarius/nodc\\_binned\\_V3.0/monthly/  \\[2020-10-21 Server ini tidak lagi tersedia.\\]
        * DatabaseHyraxSitemap
            [ https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ ](https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/)
        * Kebanyakan daftar direktori Apache-like, misalnya,
            [ https://www.ncei.noaa.gov/data/global-precipitation-climatology-project-gpcp-daily/ ](https://www.ncei.noaa.gov/data/global-precipitation-climatology-project-gpcp-daily/)
        * ember S3, misalnya,
            [ https://noaa-goes17.s3.us-east-1.amazonaws.com/ ](https://noaa-goes17.s3.us-east-1.amazonaws.com/)  
Namun, ini mungkin memerlukan akun AWS dan lebih setup.
Sitemap[bekerja dengan S3 Bucket diERDDAP™](#working-with-aws-s3-files)Sitemap
Juga, Anda biasanya tidak perlu menggunakan cache DariUrl dengan file di ember S3 jika file adalah file ASCII (Sitemap) SitemapERDDAP™dapat secara efisien membaca data dari ember langsung melalui aliran.
        
        ERDDAP™akan menyalin atau cache file ini di dataset&lt;fileDir&gt; direktori. Jika Anda memerlukan dukungan untuk daftar file jarak jauh lainnya (e.g., FTP) Silakan email permintaan Anda ke Chris. John di noaaa.gov .
        
        * Nilai default untuk&lt;cacheDariUrl&gt; tag adalah null. Jika Anda tidak menentukan nilai untuk Meme it&lt;cacheDariUrl&gt; tag, sistem copy/cache tidak akan digunakan untuk dataset ini.
        * Jika dataset&lt;Login pengaturan adalah sesuatu selain .\\*,ERDDAP™hanya akan mengunduh file yang sesuai dengan fileRegex.
        * Jika dataset&lt;recursive&gt; pengaturan benar dan file jarak jauh dalam subdirectories,ERDDAP™akan melihat subdirectories jarak jauh yang sesuai dengan dataset [&lt;Login (Login) , menciptakan struktur direktori yang sama secara lokal, dan menempatkan file lokal di subdirectories yang sama.
        * Sitemap Xml, jika Anda menentukan&lt;cacheDariUrl&gt; nilai, Hasil Login Xml akan membuat lokal&lt;fileDir&gt; direktori dan menyalin 1 file jarak jauh ke dalamnya. Login Xml kemudian akan menghasilkandatasets.xmlchunk berdasarkan file sampel (menentukan sampel Login) Sitemap
        * Jika sumber data terpencilERDDAP™Sitemap[EDDGridLogin](#eddfromerddap)Sitemap[Login](#eddfromerddap)Sitemap&lt;Login Cara itu, lokal AndaERDDAP™akan muncul untuk memiliki dataset tetapi tidak perlu menyimpan data secara lokal. Satu-satunya alasan untuk menggunakan&lt;cacheDariUrl&gt; untuk mendapatkan data dari jarak jauhERDDAP™adalah ketika Anda memiliki alasan lain mengapa Anda ingin memiliki salinan lokal dari file data. Dalam hal itu:
            * Dataset ini akan mencoba berlangganan dataset di remoteERDDAPsehingga perubahan dataset akan memanggil dataset ini url https://download.local dataset/ Dengan demikian, dataset lokal akan segera berakhir setelah perubahan dilakukan ke dataset jarak jauh.
            * Anda harus mengirim email administrator remoteERDDAP™untuk memintadatasets.xmluntuk dataset jarak jauh sehingga Anda dapat membuat dataset di lokal AndaERDDAP™terlihat seperti dataset di remoteERDDAPSitemap
        * Jika sumber data terpencilERDDAP™Dataset lokal akan mencoba berlangganan dataset jarak jauh.
            * Jika berlangganan berhasil, kapan pun jarak jauhERDDAPreloads dan memiliki data baru, itu akan menghubungi URL bendera untuk dataset ini, menyebabkan untuk memuat ulang dan mengunduh file data baru dan / atau diubah.
            * Jika berlangganan gagal (untuk alasan apa pun) atau jika Anda hanya ingin memastikan bahwa dataset lokal terbaru, Anda dapat mengatur[Login](/docs/server-admin/additional-information#flag)untuk dataset lokal, sehingga akan memuat ulang, sehingga akan memeriksa file data jarak jauh baru dan/atau berubah.
        * Jika sumber data tidak jauhERDDAP: dataset akan memeriksa file remote baru dan/atau berubah setiap kali reload. Biasanya, ini dikendalikan oleh [&lt;Login Login (Sitemap) Sitemap Tapi jika Anda tahu ketika ada file jarak jauh baru, Anda dapat mengatur[Login](/docs/server-admin/additional-information#flag)untuk dataset lokal, sehingga akan memuat ulang dan memeriksa file data jarak jauh baru dan / atau berubah. Jika ini terjadi secara rutin pada waktu tertentu hari (di 7am) Anda dapat membuat pekerjaan tanaman untuk digunakancurluntuk menghubungi bendera url https://dataset.com/
    * Login&lt;cacheSizeGB&gt; tag menentukan ukuran cache lokal. Anda mungkin hanya perlu menggunakan ini ketika bekerja dengan sistem penyimpanan cloud seperti[Amazon S3](https://aws.amazon.com/s3/)yang merupakan sistem penyimpanan yang umum digunakan yang merupakan bagian dari[Layanan Web Amazon (Login) ](https://aws.amazon.com/)Sitemap default adalah -1.
        * Jika nilainya&lt;Login (e.g., nilai default -1) Login
            ERDDAP™akan mengunduh dan memelihara **salinan lengkap** dari semua file dataset jarak jauh di dataset&lt;Login
            * Ini adalah pengaturan yang disarankan setiap kali.
            * Setiap kali dataset diisi ulang, itu membandingkan nama, ukuran, dan zaman terakhirModified file jarak jauh dan file lokal, dan mengunduh file jarak jauh yang baru atau telah berubah.
            * Jika file yang berada di server jarak jauh hilang,ERDDAP™tidak akan menghapus file lokal yang sesuai (jika sesuatu yang sementara salah dengan server jarak jauh,ERDDAP™mungkin menghapus beberapa atau semua file lokal&#33;) Sitemap
            * Dengan pengaturan ini, biasanya Anda akan mengatur&lt;updateEveryNMillis&gt; untuk -1, karena dataset menyadari ketika telah menyalin file data baru ke tempat.
        * Jika nilainya adalah &gt;0,
            ERDDAP™akan men-download file dari dataset jarak jauh yang diperlukan ke lokal **Login** (dalam dataset&lt;fileDir&gt;) dengan ukuran ambang yang ditentukan jumlah GB.
            * Cache harus cukup besar untuk menahan setidaknya beberapa file data.
            * Secara umum, semakin besar cache, semakin baik, karena file data yang diminta berikutnya akan lebih cenderung berada di cache.
            * Caching hanya boleh digunakan ketikaERDDAP™menjalankan server komputasi cloud (e.g., instance compute AWS) dan file jarak jauh dalam sistem penyimpanan cloud (e.g., AWS S3) Sitemap
            * Ketika ruang disk yang digunakan oleh file lokal melebihi cache LoginERDDAP™Sitemap (mungkin tidak segera) menghapus beberapa file cache (saat ini, berdasarkan Least Baru-baru ini Digunakan (Login) Sitemap) sampai ruang disk yang digunakan oleh file lokal&lt;0.75\\*cacheSizeGB ("goal") Sitemap Ya, ada kasus di mana LRU melakukan algoritma yang sangat buruk - tidak ada algoritma sempurna.
            *   ERDDAP™tidak akan pernah mencoba menghapus file yang tersimpanERDDAP™mulai digunakan dalam 10 detik terakhir. Ini adalah sistem yang tidak sempurna untuk menangani sistem cache dan sistem pembaca file data hanya diintegrasikan secara longgar. Karena aturan ini,ERDDAP™mungkin tidak dapat menghapus cukup file untuk mencapai tujuannya, di mana kasus itu akan mencetak WARNING ke file log.txt, dan sistem akan membuang banyak waktu mencoba untuk mematuhi cache, dan dimungkinkan bahwa ukuran file dalam cache mungkin sangat melebihi cacheSizeGB. Jika ini pernah terjadi, gunakan pengaturan cacheSizeGB yang lebih besar untuk dataset tersebut.
            * SitemapERDDAP™tidak pernah memeriksa apakah server jarak jauh memiliki versi file yang lebih baru yang berada di cache lokal. Jika Anda membutuhkan fitur ini, silakan email Chris. John di noaaa.gov .
        * Meskipun penggunaan nama tag yang sama mungkin menyiratkan bahwa sistem salinan dan sistem cache menggunakan sistem underlying yang sama, yang tidak benar.
            * Sistem salinan secara proaktif memulai tugasThread untuk mengunduh file baru dan berubah setiap kali dataset diisi ulang. Hanya file yang sebenarnya telah disalin ke direktori lokal yang tersedia melaluiERDDAP™Login
            * Sistem cache mendapat daftar file jarak jauh setiap kali dataset diisi ulang dan dipura bahwa semua file tersebut tersedia melaluiERDDAP™Login Menariknya, semua file jarak jauh bahkan muncul di halaman dataset / file / dan tersedia untuk mengunduh (meskipun mungkin hanya setelah penundaan sementara file pertama diunduh dari server jarak jauh ke cache lokal.) 
        * Dataset yang menggunakan cacheSizeGB dapat mendapatkan keuntungan dari menggunakan[Login](#nthreads)menetapkan lebih dari 1, karena ini akan memungkinkan dataset untuk mengunduh lebih dari 1 file jarak jauh pada waktu.
    * Login&lt;cachePartialPathRegex&gt; tag adalah tag yang jarang digunakan yang dapat menentukan alternatif untuk dataset [&lt;Login (Login) Sitemap default adalah null.
        * Hanya menggunakan ini jika Anda menyalin seluruh dataset melalui default&lt;cacheSizeGB&gt; nilai -1. Dengan&lt;cacheSizeGB&gt; nilai-nilai &gt; 1, ini akan diabaikan karena tidak sensitivitas.
        * Lihat dokumentasi untuk&lt;Login (Login) untuk panduan tentang cara membangun regex.
        * Jika ini ditentukan, itu akan digunakan setiap kali dataset diisi ulang, kecuali saat pertama dataset diisi ulang pada awal bulan.
        * Ini berguna ketika dataset jarak jauh disimpan dalam labirin subdirectories dan ketika sebagian besar file-file tersebut jarang terjadi, jika pernah, berubah. Sitemap&lt;Login Login&lt;Login Anda bisa, misalnya, tentukan&lt;cachePartialPathRegex&gt; yang hanya cocok tahun ini atau bulan saat ini. regexe ini sangat rumit untuk menentukan, karena semua nama jalur parsial dan penuh harus mencocokkan&lt;cachePartialPathRegex&gt; dan karena&lt;cachePartialPathRegex&gt; harus bekerja dengan URL jarak jauh dan direktori lokal. Contoh kehidupan nyata adalah:
```
            <cacheFromUrl>https://data.nodc.noaa.gov/ghrsst/GDS2/L4/GLOB/JPL/MUR/v4.1/</cacheFromUrl>  
            \\>!-- \\[2020-10-21 This server is no longer reliably available.\\] For most types of remote directories, omit the filename (e.g., contents.html for Hyrax). -->  
            <fileDir>/u00/satellite/MUR41/</fileDir>  
            <fileNameRegex>\\*\\.nc</fileNameRegex>  
            <recursive>true</recursive>  
            <pathRegex>.\\*</pathRegex>  
            <cachePartialPathRegex>.\\*/v4\\.1/(|2018/(|01./))</cachePartialPathRegex>  
```
URL sampel di atas memiliki file dalam subdirectories berdasarkan tahun (g., 2018) dan hari tahun (e.g., 001, 002, ..., 365 atau 366) Sitemap
Login&lt;cachePartialPathRegex&gt; dimulai dengan .\\*,
maka memiliki subdirectory tertentu yang umum dengan URL jarak jauh dan direktori lokal, misalnya, /v4\\.1/
kemudian memiliki serangkaian kelompok capture bersarang di mana opsi pertama tidak
dan opsi kedua adalah nilai tertentu.
            
Contoh di atas hanya akan mencocokkan direktori untuk 10 hari kedua 2018, misalnya,
             https://data.nodc.noaa.gov/ghrsst/GDS2/L4/GLOB/JPL/MUR/v4.1/2018/010/  \\[2020-10-21 Server ini tidak lagi tersedia.\\]  
dan hari 011, 012, ..., 019.
             (Lihat ini[database](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)Login[Login](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)Sitemap)   
Jika Anda memerlukan bantuan&lt;cachePartialPathRegex&gt;, silakan email&lt;cacheDariUrl&gt; ke Chris. John di noaaa.gov .
            
        * Pendekatan umum: Jika Anda ingin menggunakan&lt;cachePartialPathRegex&gt;, jangan menggunakannya pada awalnya, karena Anda inginERDDAP™untuk mengunduh semua file pada awalnya. SitemapERDDAP™telah mengunduh semua file, tambahkan ke chunk datasetdatasets.xmlSitemap
             
##### Ribuan File{#thousands-of-files} 
Jika dataset Anda memiliki banyak ribuan file,ERDDAP™mungkin lambat untuk menanggapi permintaan data dari data yang ditetapkan. Ada dua masalah di sini:
 

1. Jumlah file per direktori.
SitemapERDDAP™beroperasi pada kecepatan yang sama terlepas dari apakah n file berada dalam satu direktori atau tersebar di beberapa direktori.
     
Tapi ada masalah: Semakin banyak file di direktori yang diberikan, semakin lambat sistem operasi sedang mengembalikan daftar file di direktori (Login) LoginERDDAPSitemap Waktu respons mungkin O (n login) Sitemap Sulit untuk mengatakan berapa banyak file dalam satu direktori terlalu banyak, tetapi 10.000 mungkin terlalu banyak. Jadi jika pengaturan Anda menghasilkan banyak file, rekomendasi di sini mungkin: menempatkan file dalam subdirectories terorganisir secara logis (e.g., stasiun atau stasiun/tahun) Sitemap
    
Alasan lain untuk menggunakan subdirectories: jika pengguna ingin menggunakanERDDAPSitemap"files"sistem untuk menemukan nama file tertua untuk stasiun X, lebih cepat dan lebih efisien jika file berada di subdirectories stasiun / tahun, karena informasi yang jauh lebih sedikit perlu ditransfer.
    
2. Jumlah total file.
Untuk set data tabel,ERDDAP™melacak berbagai nilai untuk setiap variabel dalam setiap file. Ketika pengguna membuat permintaan,ERDDAP™harus membaca semua data dari semua file yang mungkin memiliki pencocokan data atas permintaan pengguna. Jika pengguna meminta data dari waktu terbatas (e.g., satu hari atau satu bulan) SitemapERDDAP™tidak perlu membuka terlalu banyak file dalam dataset Anda. Tapi ada kasus ekstrim di mana hampir setiap file mungkin memiliki data yang cocok (e.g., ketika airTemperature=13.2C) Sitemap Karena dibutuhkanERDDAP™sedikit waktu (sebagian waktu pencarian di HDD, sebagian waktu untuk membaca header file) hanya untuk membuka file yang diberikan (dan lebih jika ada banyak file di direktori) , ada hukuman waktu yang signifikan jika jumlah total file yangERDDAP™harus terbuka sangat besar. Bahkan membuka 1000 file membutuhkan waktu yang signifikan. Jadi ada manfaat untuk mengkonsolidasikan file sehari-hari menjadi chunks yang lebih besar (e.g., 1 stasiun untuk 1 tahun) Sitemap Saya memahami bahwa Anda mungkin tidak ingin melakukan ini untuk berbagai alasan, tetapi itu menyebabkan respon yang jauh lebih cepat. Dalam kasus ekstrem (misalnya, saya berurusan dengan dataset GTSPP yang memiliki file sumber ~ 35 juta) , melayani data dari sejumlah besar file sumber tidak praktis karenaERDDAP'menjawab pertanyaan sederhana dapat memakan jam dan menggunakan ton memori. Dengan mengkonsolidasikan file sumber menjadi nomor yang lebih kecil (untuk GTSPP, saya memiliki 720 sekarang, 2 per bulan) LoginERDDAP™dapat merespon dengan cukup cepat. Sitemap[Jutaan File](#millions-of-files)  
     

N.B. Solid State Drive sangat bagus&#33; Cara tercepat, termudah, termurah untuk membantuERDDAP™kesepakatan dengan sejumlah besar (Login) file adalah untuk menggunakan state drive yang solid. Sitemap[Solid State Drives bagus&#33;](/docs/server-admin/additional-information#solid-state-drives)  
     
##### Jutaan File{#millions-of-files} 
* Beberapa dataset memiliki jutaan file sumber.ERDDAP™dapat menangani ini, tetapi dengan hasil campuran.
    
    * Untuk permintaan yang hanya melibatkan variabel yang tercantum dalam [&lt;subsetVariablesSitemap (Sitemap) LoginERDDAP™memiliki semua informasi yang diperlukan yang sudah diekstrak dari datafiles dan disimpan dalam satu file, sehingga dapat merespon dengan sangat cepat.
    * Untuk permintaan lain,ERDDAP™dapat memindai dataset[Informasi file yang tersimpan](#cached-file-information)dan mengetahui bahwa hanya beberapa file mungkin memiliki data yang relevan dengan permintaan dan dengan demikian merespon dengan cepat.
    * Tapi untuk permintaan lain (misalnya, airTemperature=18 derajat\\_C) di mana file apa pun mungkin memiliki data yang relevan,ERDDAP™harus membuka sejumlah besar file untuk melihat apakah setiap file memiliki data yang relevan dengan permintaan. File dibuka secara bersamaan. Pada sistem operasi dan sistem file apa pun (selain solid state drive) , ini memakan waktu lama (SitemapERDDAP™merespons perlahan) dan benar-benar mengikat sistem file (SitemapERDDAP™merespons perlahan-lahan dengan permintaan lain) Sitemap
    
Untungnya, ada solusi.
    
    1. Mengatur dataset pada non-publikERDDAP™  (komputer pribadi Anda?) Sitemap
    2. Membuat dan menjalankan skrip yang meminta serangkaian.ncFile CF, masing-masing dengan chunk besar dataset, biasanya periode waktu (misalnya, semua data untuk bulan tertentu) Sitemap Pilih periode waktu sehingga semua file yang dihasilkan kurang dari 2GB (tapi semoga lebih dari 1GB) Sitemap Jika dataset memiliki data waktu dekat, menjalankan script untuk menggenerasi file untuk periode waktu saat ini (e.g., bulan ini) Sitemap (setiap 10 menit? setiap jam?) Sitemap SitemapERDDAP™Sitemap.ncfile CF membuatNetCDFg.ncfile yang menggunakan[Login Sitemap (Login) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Struktur data Array yang berkelanjutan.
    3. Sitemap[Sitemap](#eddtablefromnccffiles)dataset di publik AndaERDDAP™yang mendapat data dari Meme it.nc (Login) LoginERDDAP™dapat mengekstrak data dari file ini dengan sangat cepat. Dan karena sekarang ada puluhan atau ratusan (bukan jutaan) file, bahkan jikaERDDAP™harus membuka semua file, dapat melakukannya dengan cepat.
    
Ya, sistem ini membutuhkan waktu dan upaya untuk mengatur, tetapi bekerja dengan sangat baik. Sebagian besar permintaan data dapat ditangani 100 kali lebih cepat dari sebelumnya.
    \\[Bob tahu ini adalah kemungkinan, tetapi Kevin O'Brien yang pertama kali melakukan ini dan menunjukkan bahwa itu bekerja dengan baik. Sitemap Bob menggunakan ini untuk dataset GTSPP yang memiliki sekitar 18 juta file sumber dan yangERDDAP™sekarang berfungsi melalui sekitar 500.nc (Login) Login\\]
    
N.B. Solid State Drive sangat bagus&#33; Cara tercepat, termudah, termurah untuk membantuERDDAP™kesepakatan dengan sejumlah besar (Login) file adalah untuk menggunakan state drive yang solid. Sitemap[Solid State Drives bagus&#33;](/docs/server-admin/additional-information#solid-state-drives)  
     
    
##### File besar{#huge-files} 
* Satu file data besar (file data ASCII yang sangat besar) dapat menyebabkan OutOfMemoryError. Jika ini adalah masalah, itu harus jelas karena Meme itERDDAP™akan gagal untuk memuat dataset. Solusinya, jika layak, adalah membagi file ke beberapa file. Idealnya, Anda dapat membagi file menjadi chunks logis. Misalnya, jika file memiliki 20 bulan bernilai data, membaginya menjadi 20 file, masing-masing dengan 1 bulan bernilai data. Tapi ada kelebihan bahkan jika file utama dibagi sewenang-wenang. Pendekatan ini memiliki beberapa manfaat: a) Ini akan mengurangi memori yang diperlukan untuk membaca file data ke 1 / 20th, karena hanya satu file dibaca pada waktu. g Sering,ERDDAP™dapat menangani permintaan lebih cepat karena hanya perlu melihat dalam satu atau beberapa file untuk menemukan data untuk permintaan yang diberikan. g Jika pengumpulan data sedang berlangsung, maka 20 file yang ada dapat tetap tidak berubah, dan Anda hanya perlu memodifikasi satu, file kecil, baru untuk menambahkan sepadan bulan berikutnya data ke dataset.
     
##### FTP/Advice{#ftp-troubleadvice-1} 
* Jika Anda FTP file data baru ke Meme itERDDAP™server sementaraERDDAP™berjalan, ada kesempatan bahwa Meme itERDDAP™akan memuat ulang dataset selama proses FTP. Hal ini terjadi lebih sering daripada yang mungkin Anda pikirkan&#33; Jika terjadi, file akan muncul valid (memiliki nama yang valid) tapi file tidak valid. SitemapERDDAP™mencoba membaca data dari file yang tidak valid, kesalahan yang dihasilkan akan menyebabkan file ditambahkan ke tabel file yang tidak valid. Ini tidak baik. Untuk menghindari masalah ini, gunakan nama file sementara ketika FTP'ing file, misalnya, ABC2005.nc\\_TEMP . Kemudian, fileNameRegex tes (Sitemap) akan menunjukkan bahwa ini bukan file yang relevan. Meme it Setelah proses FTP selesai, mengubah nama file ke nama yang benar. Proses renaming akan menyebabkan file menjadi relevan secara instan.
    
##### Nama file Ekstrak{#file-name-extracts} 
\\[Fitur ini adalah DEPRECATED. Sitemap[\\*\\*LoginsourceName](#filename-sourcenames)Sitemap\\]  
EDDTableDaris memiliki sistem untuk mengekstrak String dari setiap nama file dan menggunakan yang membuat variabel data pseudo. Saat ini, tidak ada sistem untuk menafsirkan String ini seperti tanggal/waktu. Ada beberapa tag XML untuk mengatur sistem ini. Jika Anda tidak perlu bagian atau semua sistem ini, jangan tentukan tag atau gunakan nilai "".

* preExtractRegex adalah[ekspresi reguler](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  ([Login](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) digunakan untuk mengidentifikasi teks yang akan dihapus dari awal nama file. Penghapusan hanya terjadi jika regex cocok. Ini biasanya dimulai dengan "^" untuk mencocokkan awal nama file.
* Login ExtractRegex adalah ekspresi rutin yang digunakan untuk mengidentifikasi teks yang akan dihapus dari akhir nama file. Penghapusan hanya terjadi jika regex cocok. Ini biasanya berakhir dengan "$" untuk mencocokkan akhir nama file.
* Login Jika ada, ekspresi rutin ini digunakan setelah preExtractRegex dan postExtractRegex untuk mengidentifikasi string yang akan diekstrak dari nama file (misalnya,stationID) Sitemap Jika regex tidak cocok, seluruh nama file digunakan (minus preExtract dan pos Login) Sitemap Gunakan ".\\*" untuk mencocokkan seluruh nama file yang tersisa setelah preExtractRegex dan postExtractRegex.
* Login NameForExtract adalah nama sumber kolom data untuk String yang diekstrak. LogindataVariabledengan ini[sourceName](#sourcename)harus berada di Meme itdataVariableLogin (dengan jenis data apa pun, tetapi biasanya String) Sitemap

Misalnya, jika dataset memiliki file dengan nama seperti XYZAble.ncLogin.ncLogin.nc..., dan Anda ingin membuat variabel baru (stationID) ketika setiap file dibaca yang akan memiliki nilai ID stasiun (Bisa, Baker, Charlie, Login) diekstrak dari nama file, Anda dapat menggunakan tag ini:

*   &lt;Sitemap&lt;Sitemap
Awal ^ adalah karakter khusus ekspresi reguler yang memaksaERDDAP™untuk melihat XYZ pada awal nama file. Hal ini menyebabkan XYZ, jika ditemukan di awal nama file, untuk dihapus (misalnya, nama file XYZAble.ncSitemap.nc) Sitemap
*   &lt;Login.ncSitemap&lt;Login
$ di akhir adalah karakter khusus ekspresi reguler yang memaksaERDDAP™Sitemap.ncpada akhir nama file. Karena . adalah karakter khusus ekspresi biasa (yang cocok dengan karakter apa pun) , itu dikodekan sebagai \\. Sitemap (karena 2E adalah nomor karakter heksadecimal untuk periode) Sitemap Penyebab ini.ncjika ditemukan di akhir nama file, untuk dihapus (misalnya, nama file parsial Login.ncSitemap) Sitemap
*   &lt;ekstrakRegex&gt;.\\*&lt;Login
.\\* ekspresi rutin cocok semua karakter yang tersisa (misalnya, nama file parsial Dapat menjadi ekstrak untuk file pertama) Sitemap
*   &lt;kolomNameForExtract&gt;stationID&lt;/columnNameForExtract&gt;
SitemapERDDAP™untuk membuat kolom sumber baru yang disebutstationIDsaat membaca setiap file. Setiap baris data untuk file tertentu akan memiliki teks yang diekstrak dari nama filenya (Sitemap Login) sebagai nilai dalam Meme itstationIDkolom.

Dalam kebanyakan kasus, ada banyak nilai untuk tag ekstrak ini yang akan menghasilkan hasil yang sama - ekspresi biasa sangat fleksibel. Tapi dalam beberapa kasus, hanya ada satu cara untuk mendapatkan hasil yang diinginkan.
     
##### LoginsourceNameLogin{#pseudo-sourcenames} 
Setiap variabel dalam setiap datasetERDDAP™Sitemap&lt;sourceNameSitemap (Login) yang menentukan nama sumber untuk variabel. EDDTableDaris mendukung beberapa pseudosourceNames yang mengekstrak nilai dari beberapa tempat lain (e.g., nama file atau nilai atribut global) dan mempromosikan nilai itu menjadi kolom nilai konstan untuk chunk data (e.g., tabel data file) Sitemap Untuk variabel ini, Anda harus menentukan jenis data variabel melalui [&lt;Login (Login) Login Jika informasi yang diekstrak adalah string dateTime, Anda menentukan format string tanggal di[atribut unit](#string-time-units)Sitemap LoginsourceNamepilihan:
 
###### global:sourceNameLogin{#global-sourcenames} 
A atribut metadata global dalam setiap file data sumber dapat dipromosikan menjadi kolom data. Jika variabel&lt;sourceName&gt; memiliki format
```
        <sourceName>global:*attributeName*</sourceName>
```
SitemapERDDAP™membaca data dari file,ERDDAP™akan mencari atribut global dari nama tersebut (misalnya, PI) dan membuat kolom diisi dengan nilai atribut. Ini berguna ketika atribut memiliki nilai yang berbeda dalam file sumber yang berbeda, karena jika tidak, pengguna hanya akan melihat salah satu nilai untuk seluruh dataset. Sitemap
```
        <sourceName>global:PI</sourceName>
```
Ketika Anda mempromosikan atribut menjadi data,ERDDAP™menghapus atribut yang sesuai. Hal ini tepat karena nilainya sangat berbeda dalam setiap file; sedangkan pada dataset agregat dalamERDDAP™hanya satu nilai. Meme it Jika Anda ingin, Anda dapat menambahkan nilai baru untuk atribut untuk seluruh dataset dengan menambahkan&lt;nama att=" *Login Login* Sitemap *Login Login* &lt;/att&gt; ke global dataset [&lt;addAttributesSitemap (Login) Sitemap Untuk atribut global yangERDDAP™membutuhkan, misalnya, institusi, Anda MUST menambahkan nilai baru untuk atribut.
     
###### variabel:sourceNameLogin{#variable-sourcenames} 
A atribut metadata variabel dalam setiap file dapat dipromosikan menjadi kolom data. Jika variabel&lt;[sourceName](#sourcename)\\&gt; memiliki format
```
        <sourceName>variable:*variableName*:*attributeName*<sourceName>
```
SitemapERDDAP™membaca data dari file,ERDDAP™akan mencari atribut yang ditentukan (misalnya, ID) variabel yang ditentukan (misalnya, instrumen) dan membuat kolom diisi dengan nilai atribut. variabel induk (misalnya, instrumen) tidak ada salah satu Meme itdataVariableTermasuk dalam definisi dataset dalamERDDAPSitemap Sitemap
```
        <sourceName>variable:instrument:ID</sourceName>
```
Ini berguna ketika atribut memiliki nilai yang berbeda dalam file sumber yang berbeda, karena jika tidak, pengguna hanya akan melihat salah satu nilai untuk seluruh dataset.

Ketika Anda mempromosikan atribut menjadi data,ERDDAP™menghapus atribut yang sesuai. Hal ini tepat karena nilainya sangat berbeda dalam setiap file; sedangkan pada dataset agregat dalamERDDAP™hanya satu nilai. Meme it Jika Anda ingin, Anda dapat menambahkan nilai baru untuk atribut untuk seluruh dataset dengan menambahkan&lt;nama att=" *Login Login* Sitemap *Login Login* &lt;/att&gt; ke variabel [&lt;addAttributesSitemap (Login) Sitemap Untuk atribut yangERDDAP™membutuhkan, misalnya,ioos\\_category  (tergantung pada pengaturan Anda) Anda MUST menambahkan nilai baru untuk atribut.
        
###### LoginsourceNameLogin{#filename-sourcenames} 
Anda dapat mengekstrak bagian dari fileName file dan mempromosikan yang menjadi kolom data. Format untuk pseudo ini [&lt;sourceNameSitemap (Login) Sitemap
```
        <sourceName>\\*\\*\\*fileName,*regex*,*captureGroupNumber*</sourceName>
```
Sitemap
```
        <sourceName>\\*\\*\\*fileName,A(\\d{12})\\.slcpV1.nc,1</sourceName>
```
Ketika EDDTableDariFiles membaca data dari file, itu akan memastikan fileName (A201807041442.slcpV1.nc) cocok dengan ekspresi reguler yang ditentukan (Login) dan ekstrak yang ditentukan (dalam kasus ini, yang pertama) grup (yang merupakan bagian yang dikelilingi oleh orang tua) "201807041442". (Lihat ini[database](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)Login[Login](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)Sitemap) regex dapat ditentukan sebagai string dengan atau tanpa kuota di sekitarnya. Jika regex ditentukan sebagai string dengan kutipan di sekitarnya, string harus[string gaya JSON](https://www.json.org/json-en.html)  (dengan karakter khusus melarikan diri dengan karakter \\) Sitemap Jumlah kelompok penangkapan biasanya 1 (pertama menangkap kelompok) tapi mungkin ada nomor. Meme it
     
###### LoginsourceNameLogin{#pathname-sourcenames} 
Anda dapat mengekstrak bagian dari jalur penuh file Login (/directories/fileName.ext) dan mempromosikan bahwa menjadi kolom data. Format untuk pseudo ini [&lt;sourceNameSitemap (Login) Sitemap
```
        <sourceName>\\*\\*\\*pathName,*regex*,*captureGroupNumber*<sourceName>
```
Sitemap
```
        <sourceName>\\*\\*\\*pathName,/data/myDatasetID/(\\[A-Z0-9\\]\\*)/B(\\d{12}).nc,1</sourceName>
```
Ketika EDDTableDariFiles membaca data dari file, itu akan memastikan nama jalur penuh (DatasetID/BAY17/B201807041442.ncSitemap Untuk pengujian ini, pemisah direktori akan selalu'/'tidak pernah '\\\ Sitemap) cocok dengan ekspresi reguler yang ditentukan (Login) dan ekstrak yang ditentukan (dalam kasus ini, yang pertama) grup (yang merupakan bagian yang dikelilingi oleh orang tua) "BAY17". (Lihat ini[database](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)Login[Login](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)Sitemap) regex dapat ditentukan sebagai string dengan atau tanpa kuota di sekitarnya. Jika regex ditentukan sebagai string dengan kutipan di sekitarnya, string harus menjadi[string gaya JSON](https://www.json.org/json-en.html)  (dengan karakter khusus melarikan diri dengan karakter \\) Sitemap Jumlah kelompok penangkapan biasanya 1 (pertama menangkap kelompok) tapi mungkin ada nomor. Meme it
         
##### "0 file" Pesan Kesalahan{#0-files-error-message-2} 
* Jika Anda menjalankan[Login](#generatedatasetsxml)Sitemap[Login](#dasdds), atau jika Anda mencoba untuk memuat EDDTableDari... DatabaseERDDAP™, dan Anda mendapatkan pesan kesalahan "0" yang menunjukkan bahwa Meme itERDDAP™menemukan 0 file pencocokan di direktori (ketika Anda berpikir bahwa ada file yang cocok di direktori itu) Sitemap
    * Periksa bahwa file benar-benar ada di direktori itu.
    * Periksa ejaan nama direktori.
    * Login Sangat mudah untuk membuat kesalahan dengan regexe. Untuk tujuan pengujian, coba regex .\\* yang harus sesuai dengan semua nama file. (Lihat ini[database](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)Login[Login](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)Sitemap) 
    * Periksa bahwa pengguna yang menjalankan program (e.g., user=tomcat (Sitemap) untuk Tomcat/ERDDAP) memiliki izin 'read' untuk file-file tersebut.
    * Dalam beberapa sistem operasi (misalnya, SELinux) dan tergantung pada pengaturan sistem, pengguna yang menjalankan program harus memiliki izin 'read' untuk seluruh rantai direktori yang mengarah ke direktori yang memiliki file.
         
##### Login Sitemap{#standardizewhat} 
* Ketika setiap subclass dari EDDTableDariFiles adalah agregasi satu set file sumber, untuk variabel tertentu, semua file sumber MUST memiliki nilai atribut yang identik untuk beberapa atribut:scale\\_factorLoginadd\\_offset, \\_Unsigned,missing\\_value, \\_FillValue, dan unit). Pikirkan tentang itu: jika satu file memiliki unit kecepatan angin = noda dan yang lain memiliki unit kecepatan angin = m / s, maka nilai data dari dua file tidak boleh disertakan dalam dataset agregat yang sama. Jadi, ketika EDDTableDariFiles pertama membuat dataset, membaca nilai atribut dari satu file, kemudian menolak semua file yang memiliki nilai yang berbeda untuk atribut penting tersebut. Untuk sebagian besar koleksi file, ini bukan masalah karena atribut dari semua variabel konsisten. Namun, untuk koleksi file lain, ini dapat menyebabkan 1%, 10%, 50%, 90%, atau bahkan 99% dari file yang ditolak sebagai file "buruk". Itu masalah. Meme it
    
EDDTableDari file memiliki sistem untuk menangani masalah ini: standarisasi Sitemap Standar Pengaturan apa yang memberitahu EDDTableDariFiles untuk menstandardisasi file segera setelah membacanya, sebelum EDDTableDariFiles melihat atribut untuk melihat apakah mereka konsisten.
    
Sisi flip adalah: jika dataset tidak memiliki masalah ini, jangan gunakan standarisasi Sitemap Login Apa risiko potensial (berdiskusi di bawah ini) dan inefisiensi. Jadi jika Anda tidak benar-benar membutuhkan fitur standar Bagaimana, tidak perlu menghadapi potensi risiko dan ketidakseimbangan. Inefisiensi terbesar adalah: Ketika berbagai standar Opsi apa yang digunakan oleh dataset, itu menyiratkan bahwa file sumber menyimpan data dengan cara yang berbeda secara signifikan (e.g., dengan berbedascale\\_factorLoginadd\\_offset, atau dengan string waktu menggunakan format yang berbeda) Sitemap Dengan demikian, untuk kendala yang diberikan dalam permintaan pengguna, tidak ada cara untukERDDAP™untuk membuat batasan tingkat sumber tunggal yang dapat diterapkan pada semua file sumber. LoginERDDAP™hanya dapat menerapkan batasan yang terkena pada tingkat yang lebih tinggi. LoginERDDAP™harus membaca data dari lebih banyak file sebelum menerapkan batasan tingkat tujuan yang lebih tinggi. Jadi permintaan untuk dataset yang menggunakan standarisasi Apa yang lebih lama diproses.
    
Untuk menggunakan sistem ini, Anda perlu menentukan
```
    <standardizeWhat>*standardizeWhat*</standardizeWhat>  
```
Sitemap[datasets.xmluntuk EDDTableDari... Database](#eddtablefromfiles-skeleton-xml)Sitemap&lt;dataset&gt; tag).
    
Login *Login Sitemap* nilai menentukan perubahan EDDTableDariFiles harus mencoba untuk menerapkan. Perubahan adalah jumlah beberapa kombinasi:
    
1. Login
Ini tidak banyak operasi umum dan aman untuk menstandardisasi kolom numerik dalam file:
    * Sitemapscale\\_factordan/atauadd\\_offsetatribut hadir, menghapusnya dan menerapkannya untuk membongkar nilai data.
    * Unpack datasheet (e.g.actual\\_rangeLogindata\\_minLogindata\\_maxdata\\_range,valid\\_minLoginvalid\\_maxLoginvalid\\_range) jika ada, jika variabel dikemas, dan jika nilai atribut dikemas (ini rumit, tetapi cukup andal) Sitemap
    * Jika \\_FillValue dan/ataumissing\\_valuehadir, mengubah nilai data tersebut menjadiERDDAP's "standar" nilai hilang: MAX\\_VALUE untuk jenis integer (e.g., 127 untuk byte, 32,767 untuk pendek, dan 2,147,483,647 untuk ints, 9223372054775807 panjang) dan NaN untuk ganda dan mengapung.
    * Hapus lama \\_FillValue dan / ataumissing\\_valueLogin (Sitemap) , dan gantinya dengan hanya \\_FillValue=\\[LoginERDDAP™nilai hilang standar\\]Sitemap
         
2. Standardisasi Waktu Numeric
Jika kolom numerik memiliki unit waktu numerik bergaya CF (Sitemap *Sitemap* Sitemap *Login* ", misalnya, "hari sejak 1900-01") , ini mengubah tanggal Nilai waktu ke"seconds since 1970-01-01T00:00:00Z"nilai dan perubahan atribut unit untuk menunjukkan bahwa.
Jika ini dipilih dan ada kesempatan bahwa variabel ini memilikiscale\\_factorSitemapadd\\_offset#1 MUST dipilih juga.
     
3. Terapkan Stringmissing\\_value  
Jika kolom String memiliki \\_FillValue dan/ataumissing\\_valueatribut, ini mengubah nilai-nilai tersebut menjadi "" dan menghapus atribut.
     
4. Loginmissing\\_value  
Jika kolom numerik tidak memiliki \\_FillValue ataumissing\\_valueatribut, ini mencoba untuk mengidentifikasi numerik yang tidak ditentukanmissing\\_value  (g., -999, 9999, 1e37f) dan mengubah instance dari itu ke nilai "standar" (MAX\\_VALUE untuk jenis integer, dan NAN untuk ganda dan mengapung) Sitemap
     **Opsi ini memiliki risiko:** jika nilai data valid terbesar atau terkecil terlihat seperti nilai yang hilang (g., 999) maka nilai data yang valid akan dikonversi menjadi nilai yang hilang (Sitemap) Sitemap
     
5. Ubah String "N/A" ke ""
Untuk setiap kolom String, konversi beberapa string yang biasa digunakan untuk menunjukkan nilai String yang hilang untuk ". Saat ini, penampilan ini untuk ".", "...", "-", "?", "???", "N / A", "NA", "tidak berlaku", "null", "tidak dikenal", "tidak ditentukan". Pencarian string adalah case-insensitif dan diterapkan setelah string dipangkas. "d" dan "lain" secara khusus bukan pada daftar.
     **Opsi ini memiliki risiko:** String yang Anda pertimbangkan untuk menjadi nilai yang valid dapat dikonversi ke "".
     
6. Standarisasi ke String ISO 8601 TanggalWaktu
Untuk setiap kolom String, coba konversi tanggal String yang tidak murni (g., "Jan 2, 2018") ke ISO 8601 String dateTimes ("2018-01-02") Sitemap
     **Login** bahwa semua nilai data untuk kolom harus menggunakan format yang sama, jika tidak, opsi ini tidak akan membuat perubahan pada kolom tertentu.
     **Opsi ini memiliki risiko:** Jika ada kolom dengan nilai string yang hanya terjadi seperti tanggal yang umum Format waktu, mereka akan dikonversi ke ISO 8601 String dateTimes.
     
7. Standardize Compact DateTimes Ke ISO 8601 Tanggal Waktu
Untuk setiap kolom String atau integer-type, cobalah untuk mengonversikan tanggal String murni (g., "20180102") ke ISO 8601 String dateTimes ("2018-01-02") Sitemap
     **Login** bahwa semua nilai data untuk kolom harus menggunakan format yang sama, jika tidak, opsi ini tidak akan membuat perubahan pada kolom tertentu.
     **Opsi ini memiliki risiko:** Jika ada kolom dengan nilai-nilai yang tidak kompak tanggal Kali ini tetapi terlihat seperti tanggal yang kompak, mereka akan dikonversi ke ISO 8601 Tanggal String.
     
8. Standardisasi Unit
Ini mencoba untuk menstandardisasi string unit untuk setiap variabel. Misalnya, "meter per detik", "meter / detik","m.s^-1"Login"m s-1""m.s-1" akan semua dikonversi ke "m.s-1". Ini tidak mengubah nilai data. Ini bekerja dengan baik untuk validUDUNITSunit string, tetapi dapat memiliki masalah dengan string yang tidak valid atau kompleks. Anda dapat berurusan dengan masalah dengan menentukan pasangan dari-untuk tertentu&lt;StandardizeUdunits&gt; SitemapERDDAPSitemap
    \\[Login\\]/webapps/erddap/WEB-INF/classes/gov/noa/pfel/erddap/util/messages.xml file. Silakan email setiap perubahan yang Anda buat untuk Chris. John di noaaa.gov sehingga mereka dapat dimasukkan ke dalam pesan default.xml.
     **Opsi ini memiliki risiko:** Ini mungkin membentang beberapa unit yang kompleks atau tidak valid; Namun, Anda dapat menggunakan pekerjaan-sekitar yang dijelaskan di atas untuk menghindari masalah jika terjadi.
         
    
Nilai default standarisasi Apa itu 0, yang tidak melakukan apa pun.

Jika/ketika Anda mengubah nilai standar Apa, waktu berikutnya dataset diisi ulang,ERDDAP™akan membaca semua file data untuk dataset untuk membangun kembali mini-database dengan informasi tentang setiap file. Jika dataset memiliki banyak file, ini akan memakan waktu lama.
    
Catatan:

* Hal yang rumit adalah -
Standar Pengaturan apa yang digunakan untuk semua kolom dalam file sumber. Jadi, misalnya, menggunakan #2048 mungkin berhasil mengkonversi kolom tanggal String kompak ke ISO 8601 String dateTimes, tetapi mungkin juga salah mengkonversi kolom dengan String yang hanya terjadi untuk terlihat seperti tanggal yang kompak.
     
*   datasets.xmlLogin Login
Hal ini terutama rumit untuk mendapatkan pengaturan yang benar dalam Meme itdatasets.xmluntuk membuat dataset Anda bekerja dengan cara yang Anda inginkan. Meme it Pendekatan terbaik (Sitemap) Sitemap
    1. Sitemap[Login](#generatedatasetsxml)dan menentukan nilai standar Apa yang ingin Anda gunakan.
    2. Sitemap[Login](#dasdds)untuk memastikan bahwa beban dataset dengan benar dan mencerminkan standarisasi Pengaturan apa yang Anda tentukan.
    3. Uji dataset dengan tangan ketika berada di Meme itERDDAP™untuk memastikan bahwa variabel yang terkena bekerja seperti yang diharapkan.
         
* Risiko
Pilihan #256 dan di atas lebih berisiko, yaitu, ada kesempatan yang lebih besarERDDAP™akan membuat perubahan yang tidak boleh dilakukan. Sebagai contoh, opsi #2048 mungkin secara tidak sengaja mengubah variabel dengan string ID stasiun yang semuanya hanya terjadi untuk melihat tanggal ISO 8601 "korak" (g., 20180102) di ISO 8601"extended"Sitemap ("2018-01-02") Sitemap
     
* lambat setelah perubahan -
Karena nilai standardisasi Perubahan nilai data yang dapat dilihat EDDTableDariFiles untuk setiap file data, jika Anda mengubah standarisasi Pengaturan apa, EDDTableDariFiles akan membuang semua informasi cache tentang setiap file (yang mencakup min dan maks untuk setiap variabel data dalam setiap file) dan membaca kembali setiap file data. Jika dataset memiliki sejumlah besar file, ini dapat sangat memakan waktu, sehingga akan memakan waktu lama untuk dataset untuk memuat ulang pertama kalinyaERDDAP™kembali setelah Anda membuat perubahan.
     
* Login
Pilihan #256 dan penggunaan heuristik untuk membuat perubahan mereka. Jika Anda menemukan situasi di mana heuristik membuat keputusan buruk, silakan email deskripsi masalah untuk Chris. John di noaaa. gov sehingga kita dapat meningkatkan heuristik.
     
* Alternatif --
Jika salah satu opsi StandardizeA tidak memecahkan masalah untuk dataset tertentu, Anda mungkin dapat memecahkan masalah dengan membuat[.ncg](#ncml-files)untuk memisahkan setiap file data dan menentukan perubahan pada hal-hal dalam file sehingga file konsisten. Kemudian, beri tahu EDDTableDari... File dataset untuk mengatur.ncg
    
Atau, gunakan[NCO](#netcdf-operators-nco)untuk benar-benar membuat perubahan pada file sehingga file konsisten.
        
##### Separate Kolom untuk Tahun, Bulan, Tanggal, Jam, Menit, Kedua{#separate-columns-for-year-month-date-hour-minute-second} 
Hal ini cukup umum untuk file data tabel untuk memiliki kolom terpisah untuk tahun, bulan, tanggal, jam, menit, detik. SitemapERDDAP™v2.10, satu-satunya solusi adalah untuk mengedit file data untuk menggabungkan kolom tersebut menjadi kolom waktu terpadu. SitemapERDDAP™2.10+, Anda dapat menggunakan
Sitemap&lt;sourceNameSitemap *Login* &lt;sourceNameSitemap (Login) SitemapERDDAP™cara menggabungkan kolom sumber untuk membuat kolom waktu terpadu, sehingga Anda tidak lagi harus mengedit file sumber.
##### &lt;skipHeaderToRegex&gt;{#skipheadertoregex} 
* Sitemap&lt;Login (Login) Login
Login (Untuk EDDTableDariAsciiFiles dan EDDTableDariColumnarAsciiFiles dataset hanya.)   
Ketika EDDTableDariAsciiFiles membaca file data, itu akan mengabaikan semua garis hingga dan termasuk garis yang sesuai dengan ekspresi reguler ini. default adalah "", yang tidak menggunakan opsi ini. Contohnya
```
    <skipHeaderToRegex>\\\*\\\*\\\* END OF HEADER.\\*<skipHeaderToRegex>  
```
yang akan mengabaikan semua garis hingga dan termasuk garis yang dimulai dengan "\\*\\*Sitemap

Ketika Anda menggunakan tag ini,&lt;Sitemap&lt;pertamaDataRow&gt; bertindak seolah-olah header telah dihapus sebelum file dibaca. Misalnya, Anda akan menggunakan ColumnNamesRow=0 jika nama kolom berada di baris tepat setelah header.

Jika Anda ingin menggunakan Login Xml dengan dataset yang membutuhkan tag ini:

1. Membuat file baru, sementara, sampel dengan menyalin file yang ada dan menghapus header.
2. Login Login Xml dan tentukan file sampel.
3. Secara manual menambahkan&lt;skipHeaderToRegexdatasets.xmlLogin
4. Hapus file sementara, sampel.
5. Gunakan dataset dalamERDDAPSitemap
##### &lt;Login{#skiplinesregex} 
Login (Untuk EDDTableDariAsciiFiles dan EDDTableDariColumnarAsciiFiles dataset hanya.)   
Ketika EDDTableDariAsciiFiles membaca file data, itu akan mengabaikan semua garis yang sesuai dengan ekspresi reguler ini. default adalah "", yang tidak menggunakan opsi ini. Contohnya
```
    <skipLinesRegex>#.\\*<skipLinesRegex>  
```
yang akan mengabaikan semua garis yang dimulai dengan "#".

Ketika Anda menggunakan tag ini,&lt;Sitemap&lt;pertamaDataRow&gt; bertindak seolah-olah semua garis pencocokan telah dihapus sebelum file dibaca. Misalnya, Anda akan menggunakan kolomNamesRow=0 bahkan jika ada beberapa baris mulai dengan, misalnya, "#" pada awal file.
    
#### Facebook Twitter Google Plus Pinterest Email{#eddtablefromfiles-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFrom...Files" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;nDimensions>...&lt;/nDimensions>  &lt;!-- This was used prior to ERDDAP™  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;version 1.30, but is now ignored. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. For  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromFiles subclasses, this uses Java's WatchDirectory system  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;to notice new/deleted/changed files quickly and efficiently. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;standardizeWhat>](#standardizewhat)...&lt;/standardizeWhat> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;nThreads>](#nthreads)...&lt;/nThreads> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;specialMode>*mode*&lt;/specialMode>  &lt;-- This rarely-used, OPTIONAL tag  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;can be used with EDDTableFromThreddsFiles to specify that special,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hard-coded rules should be used to determine which files should  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;be downloaded from the server. Currently, the only valid *mode*  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is SAMOS which is used with datasets from  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;https://tds.coaps.fsu.edu/thredds/catalog/samos to download only the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files with the last version number. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrl>...&lt;/sourceUrl>  &lt;-- For subclasses like  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromHyraxFiles and EDDTableFromThreddsFiles, this is where  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;you specify the base URL for the files on the remote server.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For subclasses that get data from local files, ERDDAP™ doesn't use  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this information to get the data, but does display the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;information to users. So I usually use "(local files)". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileDir>...&lt;/fileDir> &lt;-- The directory (absolute) with the data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;recursive>true|false&lt;/recursive> &lt;!-- 0 or 1. Indicates if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;subdirectories of fileDir have data files, too. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;pathRegex>](#pathregex)...&lt;/pathRegex>  &lt;!-- 0 or 1. Only directory names which  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;match the pathRegex (default=".\\*") will be accepted. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;fileNameRegex>...&lt;/fileNameRegex> &lt;-- 0 or 1. A [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) describing valid data file names, for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;".\\*\\.nc" for all .nc files. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;metadataFrom>...&lt;/metadataFrom> &lt;-- The file to get metadata  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;from ("first" or "last" (the default) based on file's  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lastModifiedTime). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;charset>...&lt;/charset>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- (For EDDTableFromAsciiFiles and EDDTableFromColumnarAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This OPTIONAL tag specifies the character set (case  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sensitive!) of the source files, for example, ISO-8859-1  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default) and UTF-8.  -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;skipHeaderToRegex>](#skipheadertoregex)...&lt;/skipHeaderToRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;skipLinesRegex>](#skiplinesregex)...&lt;/skipLinesRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;columnNamesRow>...&lt;/columnNamesRow> &lt;-- (For EDDTableFromAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This specifies the number of the row with the column  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;names in the files. (The first row of the file is "1".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Default = 1.)  If you specify 0, ERDDAP™ will not look for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;column names and will assign names: Column#1, Column#2, ... -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;firstDataRow>...&lt;/firstDataRow>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- (For EDDTableFromAsciiFiles and EDDTableFromColumnarAsciiFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;only) This specifies the number of the first row with data in the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;files. (The first row of the file is "1". Default = 2.) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dimensionsCSV>...&lt;/dimensionsCSV> &lt;-- (For EDDTableFromNcFiles  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and EDDTableFromMultidimNcFiles only) This is a comma-separated  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;list of dimension fullNames. If specified, ERDDAP™ will only read  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;variables in the source files which use some or all of these  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dimensions, plus all of the scalar variables. If a dimension  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;is in a group, you must specify its fullName,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e.g., "*groupName/dimensionName*". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- The next four tags are DEPRECATED. For more information, see  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[File Name Extracts](#filename-sourcenames). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;preExtractRegex>...&lt;/preExtractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;postExtractRegex>...&lt;/postExtractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;extractRegex>...&lt;/extractRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;columnNameForExtract>...&lt;/columnNameForExtract>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sortedColumnSourceName>...&lt;/sortedColumnSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- The [sourceName](#sourcename) of the numeric column that the data files are  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;usually already sorted by within each file, for example, "time".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Don't specify this or use an empty string if no variable is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;suitable. It is ok if not all files are sorted by this column.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;If present, this can greatly speed up some data requests.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For EDDTableFromHyraxFiles, EDDTableFromNcFiles and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromThreddsFiles, this must be the leftmost (first) axis variable.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromMultidimNcFiles ignores this because it has a better  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;system. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sortFilesBySourceNames>...&lt;/sortFilesBySourceNames>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- This is a space-separated list of [sourceName](#sourcename)s  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;which specifies how the internal list of files should be sorted  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(in ascending order), for example "id time".  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;It is the minimum value of the specified columns in each file  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;that is used for sorting.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;When a data request is filled, data is obtained from the files  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in this order. Thus it determines the overall order of the data  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in the response.  If you specify more than one column name, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;second name is used if there is a tie for the first column; the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;third is used if there is a tie for the first and second  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;columns; ... This is OPTIONAL (the default is  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;fileDir+fileName order). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;false (the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheFromUrl>](#cachefromurl)...&lt;/cacheFromUrl> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;cacheSizeGB>](#cachefromurl)...&lt;/cacheSizeGB> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- For EDDTableFromHyraxFiles, EDDTableFromMultidimNcFiles,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromNcFiles, EDDTableFromNccsvFiles, and  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;EDDTableFromThreddsFiles, the source's axis variables (for  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;example, time) needn't be first or in any specific order. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### Sitemap{#eddtablefromasciiservice} 
[ **Sitemap** ](#eddtablefromasciiservice)pada dasarnya adalah scraper layar. Ini dimaksudkan untuk menangani sumber data yang memiliki layanan web sederhana untuk meminta data (sering bentuk HTML pada halaman web) dan yang dapat mengembalikan data dalam beberapa format ASCII terstruktur (misalnya, format teks ASCII comma-separated-value atau kolomar, sering dengan informasi lain sebelum dan/atau setelah data) Sitemap

EDDTableDariAsciiService adalah kelas super dari semua kelas EDDTableDariAsciiService .... Anda tidak dapat menggunakan EDDTableDariAsciiService secara langsung. Sebagai gantinya, gunakan subkelas EDDTableDariAsciiService untuk menangani jenis layanan tertentu:

*   [Sitemap](#eddtablefromasciiservicenos)mendapatkan data dariNOAALayanan ASCII NOS.

Saat ini, tidak ada jenis layanan lainnya yang didukung. Tapi biasanya relatif mudah untuk mendukung layanan lain jika mereka bekerja dengan cara yang sama. Hubungi kami jika Anda memiliki permintaan.

#### Sitemap{#details} 
Informasi berikut berlaku untuk semua subkelas EDDTableDariAsciiService.

* LoginERDDAP™permintaan data tabel dapat menempatkan batasan pada variabel apa pun. Layanan yang mendasari mungkin atau mungkin tidak memungkinkan batasan pada semua variabel. Sebagai contoh, banyak layanan hanya mendukung batasan pada nama stasiun, lintang, bujur, dan waktu. Jadi ketika subclass dari EDDTableDariAsciiService mendapat permintaan untuk subset dataset, itu melewati banyak batasan mungkin untuk layanan data sumber dan kemudian menerapkan batasan yang tersisa untuk data yang dikembalikan oleh layanan, sebelum menyerahkan data kepada pengguna.
* Kisaran Berlaku -- Tidak seperti banyak jenis dataset lainnya, EDDTableDariAsciiService biasanya tidak tahu kisaran data untuk setiap variabel, sehingga tidak dapat dengan cepat menolak permintaan untuk data di luar rentang yang valid.
* Menyiapkan Respon Teks ASCII -- Ketika EDDTableDariAsciiService mendapat respons dari Layanan Teks ASCII, harus memvalidasi bahwa respons memiliki format dan informasi yang diharapkan, dan kemudian mengekstrak data. Anda dapat menentukan format dengan menggunakan berbagai tag khusus di chunk XML untuk dataset ini:
    *   &lt;Login&lt;sebelumData10&gt; tag - Anda dapat menentukan serangkaian potongan teks (sebanyak yang Anda inginkan, hingga 10) EDDTableDariAsciiService harus mencari di header teks ASCII kembali oleh layanan dengan&lt;Login&lt;Login Misalnya, ini berguna untuk memverifikasi bahwa respons termasuk variabel yang diharapkan menggunakan unit yang diharapkan. Tag sebelumnya terakhir yang Anda tentukan mengidentifikasi teks yang terjadi tepat sebelum data dimulai.
    *   &lt;Login Login Ini menentukan teks yang EDDTableDariAsciiService akan terlihat dalam teks ASCII yang dikembalikan oleh layanan yang menandakan akhir data.
    *   &lt;Login Login Jika EDDTableDariAsciiService menemukan teks ini dalam teks ASCII kembali oleh layanan, itu menyimpulkan bahwa tidak ada data yang sesuai dengan permintaan.
#### skeleton XML Sitemap{#eddtablefromasciiservice-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromAsciiService..." [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceUrl>...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;beforeData1>...&lt;beforeData1> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;beforeData10>...&lt;beforeData10> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;afterData>...&lt;afterData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;noData>...&lt;noData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### Sitemap{#eddtablefromasciiservicenos} 
[ **Sitemap** ](#eddtablefromasciiservicenos)membuat dataset EDDTable dari layanan data teks ASCII yang ditawarkan olehNOAASitemap[Layanan Samudra Nasional (Login) ](https://oceanservice.noaa.gov/)Sitemap Untuk informasi tentang bagaimana kelas ini bekerja dan bagaimana menggunakannya, lihat kelas super ini[Sitemap](#eddtablefromasciiservice)Sitemap Tidak mungkin bahwa siapa pun selain Bob Simons harus menggunakan subkelas ini.

Karena data dalam respon dari layanan NOS menggunakan format teks ASCII, variabel data selain latitude dan longitude harus memiliki atribut khusus yang menentukan karakter mana dari setiap lini data mengandung data variabel, misalnya,
```
<att name="responseSubstring">17, 25</att>  
```
 
### Sitemap{#eddtablefromalldatasets} 
[ **Sitemap** ](#eddtablefromalldatasets)adalah dataset tingkat tinggi yang memiliki informasi tentang semua dataset lain yang saat ini dimuat di AndaERDDAPSitemap Tidak seperti jenis dataset lain, tidak ada spesifikasi untukallDatasetsdatasetdatasets.xmlSitemapERDDAP™otomatis membuat satu EDDTableDariAllDatasets dataset (LogindatasetIDSitemapallDatasets) Sitemap Jadi,allDatasetsdataset akan dibuat di setiapERDDAP™instalasi dan akan bekerja dengan cara yang sama di setiapERDDAP™Login

LoginallDatasetsdataset adalah dataset tabular. Ini memiliki baris informasi untuk setiap dataset. Memiliki kolom dengan informasi tentang setiap dataset, misalnya,datasetID, dapat diakses, institusi, judul, minLongitude, maxLongitude, minLatitude, maxLatitude, minTime, maxTime, dll. SitemapallDatasetsadalah dataset tabular, Anda dapat meminta cara yang sama Anda dapat meminta dataset tabular lainnya diERDDAP™, dan Anda dapat menentukan jenis file untuk respons. Ini memungkinkan pengguna mencari dataset kepentingan dengan cara yang sangat kuat.
 
### Login{#eddtablefromasciifiles} 
[ **Login** ](#eddtablefromasciifiles)agregat data dari comma-, tab-, semicolon-, atau file data tabular yang dipisahkan ruang.

* Paling sering, file akan memiliki nama kolom pada baris pertama dan data dimulai pada baris kedua. (Di sini, baris pertama dari file disebut nomor baris 1.) Tapi Anda dapat menggunakan&lt;Sitemap&lt;pertamaDataRow&gt; di Andadatasets.xmlfile untuk menentukan nomor baris yang berbeda.
*   ERDDAP™memungkinkan baris data untuk memiliki sejumlah nilai data yang berbeda.ERDDAP™mengasumsikan bahwa nilai data yang hilang adalah kolom akhir di baris.ERDDAP™menetapkan nilai nilai standar yang hilang untuk nilai data yang hilang. (ditambahkan v1.56) 
* File ASCII mudah untuk bekerja dengan, tetapi mereka bukan cara yang paling efisien untuk menyimpan / menarik data. Untuk efisiensi yang lebih besar, simpan file sebagaiNetCDFg.ncLogin (dengan satu dimensi, "row", dibagikan oleh semua variabel) Sitemap Kamu bisa[SitemapERDDAP™untuk menghasilkan file baru](#millions-of-files)Sitemap
* Lihat kelas super ini,[Login](#eddtablefromfiles)Informasi tentang bagaimana kelas ini bekerja dan cara menggunakannya.
* Kami sangat merekomendasikan menggunakan[Login Program Xml](#generatedatasetsxml)untuk membuat draft kasar daridatasets.xmlchunk dataset ini. Karena total kekurangan metadata dalam file ASCII, Anda akan selalu perlu mengedit hasil GenerateDatasetsXml.
* PERINGATAN: KetikaERDDAP™membaca file data ASCII, jika menemukan kesalahan pada baris tertentu (e.g., jumlah item yang salah) , itu log pesan peringatan ("WARNING: Garis buruk (Login) data ... dengan daftar garis buruk di garis berikutnya) Login[Login](/docs/server-admin/additional-information#log)dan kemudian terus membaca sisa file data. Dengan demikian, tanggung jawab Anda untuk melihat secara berkala (atau menulis script untuk melakukannya Meme it) untuk pesan itu di log. Meme it txt sehingga Anda dapat memperbaiki masalah dalam file data.ERDDAP™mengatur cara ini sehingga pengguna dapat terus membaca semua data valid yang tersedia meskipun beberapa baris file memiliki kekurangan.
     
### Login Login{#eddtablefromawsxmlfiles} 
[ **Login Login** ](#eddtablefromawsxmlfiles)agregat data dari satu set Stasiun Cuaca Otomatis (Login) File data XML menggunakan WeatherBug Rest XML API (yang tidak lagi aktif) Sitemap

* Jenis file ini adalah cara sederhana namun tidak efisien untuk menyimpan data, karena setiap file biasanya tampaknya mengandung pengamatan dari hanya satu titik waktu. Jadi mungkin ada sejumlah besar file. Jika Anda ingin meningkatkan kinerja, mempertimbangkan mengkonsolidasikan kelompok pengamatan (layak minggu?) SitemapNetCDFg.ncLogin (terbaik:.ncfile dengan[Login Sitemap (Login) Format Array Bergerigi](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)) dan menggunakan[Sitemap](#eddtablefrommultidimncfiles)  (Sitemap[Sitemap](#eddtablefromnccffiles)) untuk melayani data. Kamu bisa[SitemapERDDAP™untuk menghasilkan file baru](#millions-of-files)Sitemap
* Lihat kelas super ini,[Login](#eddtablefromfiles)Informasi tentang bagaimana kelas ini bekerja dan cara menggunakannya.
     
### Sitemap{#eddtablefromcolumnarasciifiles} 
[ **Sitemap** ](#eddtablefromcolumnarasciifiles)data agregat dari file data tabular ASCII dengan kolom tetap lebar.

* Paling sering, file akan memiliki nama kolom pada baris pertama dan data dimulai pada baris kedua. Garis pertama / alis dalam file disebut baris #1. Tapi Anda dapat menggunakan&lt;Sitemap&lt;pertamaDataRow&gt; di Andadatasets.xmlfile untuk menentukan nomor baris yang berbeda.
* Login&lt;addAttributesSitemap&lt;dataVariable&gt; untuk dataset MUST ini mencakup dua atribut khusus ini:
    
    *   &lt;nama att="startColumn"&gt; *Login* &lt;att&gt; - menentukan kolom karakter di setiap baris yang merupakan awal dari variabel data ini.
    *   &lt;nama att="stopColumn"&gt; *Login* &lt;att&gt; - menentukan kolom karakter di setiap baris yang merupakan 1 setelah akhir variabel data ini.
    
Kolom karakter pertama disebut kolom #0.
Misalnya, untuk file ini yang memiliki nilai waktu yang menyalahgunakan nilai suhu:
```
      0         1         2        <-- character column number 10's digit
      0123456789012345678901234567 <-- character column number 1's digit
      time                temp
      2014-12-01T12:00:00Z12.3
      2014-12-02T12:00:00Z13.6
      2014-12-03T12:00:00Z11.0
```
variabel data waktu akan memiliki
```
      <att name="startColumn">0<att>  
      <att name="stopColumn">20<att>  
```
dan variabel data waktu akan memiliki
```
      <att name="startColumn">20<att>  
      <att name="stopColumn">24<att>  
```
Atribut ini MUST ditentukan untuk semua variabel kecuali[nilai tetap](#fixed-value-sourcenames)Login[nama file-source-names](#filename-sourcenames)variabel.
* File ASCII mudah untuk bekerja dengan, tetapi mereka bukan cara yang efisien untuk menyimpan / menarik data. Untuk efisiensi yang lebih besar, simpan file sebagaiNetCDFg.ncLogin (dengan satu dimensi, "row", dibagikan oleh semua variabel) Sitemap Kamu bisa[SitemapERDDAP™untuk menghasilkan file baru](#millions-of-files)Sitemap
* Lihat kelas super ini,[Login](#eddtablefromfiles)Informasi tentang bagaimana kelas ini bekerja dan cara menggunakannya.
* Kami sangat merekomendasikan menggunakan[Login Program Xml](#generatedatasetsxml)untuk membuat draft kasar daridatasets.xmlchunk dataset ini. Karena kesulitan menentukan posisi awal dan akhir untuk setiap kolom data dan total kekurangan metadata dalam file ASCII, Anda akan selalu perlu mengedit hasil dari GenerateDatasetsXml.
     
### Login{#eddtablefromhttpget} 
Login DariHttpGet berbeda dari semua jenis dataset lainnyaERDDAP™yang memiliki sistem di mana "penulis" spesifik dapat menambahkan data, merevisi data, atau menghapus data dari dataset secara teraturHTTP GETSitemap[Login](#http-post)permintaan dari program komputer, script atau browser. Dataset dapat dikutip oleh pengguna dengan cara yang sama bahwa semua dataset EDDTable lainnya dapat dikuisERDDAPSitemap Lihat deskripsi kelas super kelas ini,[Login](#eddtablefromfiles)Untuk membaca fitur yang diwariskan dari superclass.

Fitur unik EDDTableDariHttpGet dijelaskan di bawah ini. Anda perlu membaca semua bagian awal ini dan memahaminya; jika tidak, Anda mungkin memiliki harapan yang tidak realistis atau mendapatkan diri Anda menjadi masalah yang sulit diperbaiki.

#### Penggunaan yang Tepat{#intended-use} 
Sistem ini dimaksudkan untuk:

* Login (di situ) data, bukan data gridded.
* Data real time -
Tujuannya adalah mengizinkan penulis (misalnya, sensor, skrip QC otomatis, atau manusia tertentu) untuk membuat perubahan pada dataset (Sitemap[.insert atau .delete perintah](#insert-and-delete)) dan membuat perubahan dapat diaksesERDDAP™pengguna, semua dalam waktu kurang dari 1 detik, dan mungkin jauh lebih cepat. Kebanyakan dari 1 detik adalah waktu jaringan.ERDDAP™dapat memproses permintaan sekitar 1 ms dan data segera diakses oleh pengguna. Ini adalah[Sitemap](#httpget-speed)Login[Login](#robust)Sitemap[sistem yang andal](#system-reliability)Sitemap
* Hampir semua frekuensi data -
Sistem ini dapat menerima data yang sering (Sitemap) melalui data yang sangat sering (100 Hz data) Sitemap Jika Anda mengoptimalkan sistem, dapat menangani data frekuensi yang lebih tinggi (mungkin 10 KHz data jika Anda pergi ke ekstrem) Sitemap
* Data dari satu sensor atau koleksi sensor serupa.
*   [Login](#versioning)Sitemap[Ilmu yang Dapat Direproduksi](https://en.wikipedia.org/wiki/Reproducibility)SitemapDOISitemap
Situasi di mana Anda perlu dapat membuat perubahan data (misalnya, mengubah bendera kontrol kualitas) , tahu penulis mana yang membuat setiap perubahan, tahu timestamp ketika penulis membuat perubahan, dan (atas permintaan) dapat melihat data asli dari sebelum perubahan dilakukan. Dengan demikian, dataset ini memenuhi syarat untuk[DOILogin](https://en.wikipedia.org/wiki/Digital_object_identifier)Sitemap karena mereka bertemu Meme itDOIpersyaratan bahwa dataset tidak berubah, kecuali dengan agregasi. Secara umum, dekat real time dataset tidak memenuhi syarat untukDOIs karena data sering diubah secara retroaktif (e.g., untuk tujuan QA / QC) Sitemap
     

Setelah data dalam dataset EDDTableDariHttpGet, setiap pengguna dapat meminta data dengan cara yang sama bahwa mereka meminta data dari dataset EDDTable lainnya.
     
#### Sitemap Login{#experimental-be-careful} 
Karena sistem ini baru dan karena kehilangan data lingkungan tidak dapat dipercaya, Anda harus memperlakukan EDDTableDariHttpGet sebagai eksperimental. Jika Anda transisi dari sistem lain, silakan jalankan sistem lama dan sistem baru sejajar sampai Anda yakin bahwa sistem baru bekerja dengan baik (minggu atau bulan, tidak hanya jam atau hari) Sitemap Dalam semua kasus, pastikan sistem Anda secara terpisah arsip .insert dan .delete URL yang dikirim ke dataset EDDTableDariHttpGet (bahkan jika hanya di log Apache dan / atau Tomcat) setidaknya untuk sementara. Dan dalam semua kasus, pastikan bahwa file data yang dibuat oleh dataset EDDTableDariHttpGet Anda secara rutin didukung ke perangkat penyimpanan data eksternal. (Login[Login](https://en.wikipedia.org/wiki/Rsync). dapat kembali file data yang dibuat oleh EDDTableDariHttpGet sangat efisien.)   
     
#### Login{#insert-and-delete} 

Untuk dataset apa punERDDAP™ketika Anda mengirim permintaan untuk Meme itERDDAP™untuk subset data dalam dataset, Anda menentukan jenis file yang ingin Anda respon, misalnya, .csv,.htmlTableLogin.ncLogin.jsonSitemap Login Memperpanjang sistem ini untuk mendukung dua jenis file tambahan" yang dapat memasukkan (atau perubahan) atau menghapus data dalam dataset:

* Login
    * Permintaan diformat seperti respons formulir HTML standar, dengan pasangan nilai kunci, dipisahkan oleh '&'. Sitemap
         https://*some.erddap.url*/erddap/tabledap/myDataset**.insert**?stationID=46088&time=2016-03-30T12:37:55Z&latitude=10.1&longitude=-150.1&airTemp=17.23&waterTemp=12.3&author=JohnSmith\\_someKey1   
SitemapERDDAP™untuk menambahkan atau mengubah data untukstationID=46088 untuk waktu yang ditentukan.
    * Penulis perubahan ini JohnSmith dan kuncinya adalah beberapaKey1.
    * URL harus menyertakan nilai yang valid (tidak hilang nilai) untuk semua[httpLogin](#httpgetrequiredvariables-global-attribute)
    * Jika nilai-nilaihttpLogin Variabel dalam permintaan (LoginstationIDdan waktu) mencocokkan nilai-nilai pada baris yang sudah ada di dataset, nilai-nilai baru secara efektif menimpa nilai-nilai lama (meskipun nilai lama masih dapat diakses jika data permintaan pengguna dari sebelumnya[Sitemap](#versioning)dataset) Sitemap
    * URL .insert tidak boleh termasuk & waktu (ERDDAP™menghasilkan nilai) Sitemap (yang ditentukan oleh .insert (yang perintah=0) atau .delete (yang perintah= 1 Artikel) ) Sitemap
    * Jika URL .insert tidak menentukan nilai untuk kolom lain yang ada di dataset, mereka diasumsikan menjadi nilai hilang asli (MAX\\_VALUE untuk jenis data integer, NaN untuk mengapung dan ganda, dan "" untuk String) Sitemap
             
    * Login
        * Permintaan diformat seperti respons formulir HTML standar, dengan pasangan nilai kunci, dipisahkan oleh '&'. Sitemap
             https://*some.erddap.url*/erddap/tabledap/myDataset**.delete**?stationID=46088&time=2016-03-30T12:37:55Z&author=JohnSmith\\_someKey1   
SitemapERDDAP™untuk menghapus data untukstationID=46088 pada waktu tertentu.
        * Penulis perubahan ini JohnSmith dan kuncinya adalah beberapaKey1.
        * URL harus menentukan[httpLogin](#httpgetrequiredvariables-global-attribute)Sitemap (LoginstationIDdan waktu) Sitemap Jika nilai-nilai tersebut sesuai dengan nilai pada baris yang sudah ada di dataset (yang biasanya mereka akan Meme it) Nilai lama dihapus secara efektif (meskipun nilai lama masih dapat diakses jika data permintaan pengguna dari sebelumnya[Sitemap](#versioning)dataset) Sitemap
        * Tidak perlu menentukan nilai-nilai untuk non-HttpGetRequiredVariables, selain penulis, yang diperlukan untuk otentikasi permintaan.
             
    
Sitemap
    * permintaan .insert dan .delete diformat seperti respon formulir HTML standar, dengan key=value pair, dipisahkan oleh '&'. Nilai harus[persen dikodekan](https://en.wikipedia.org/wiki/Percent-encoding)Sitemap Dengan demikian, Anda perlu mengkodekan karakter khusus ke dalam bentuk %HHH, di mana HH adalah nilai heksadecimal 2 digit karakter. Biasanya, Anda hanya perlu mengkonversi beberapa karakter tanda baca: %25, & menjadi %26, " menjadi %22,&lt;ke %3C, = menjadi %3D, &gt; menjadi %3E, + menjadi %2B,|ke %7C,\\[ke %5B,\\]menjadi %5D, ruang menjadi %20, dan mengkonversi semua karakter di atas #127 menjadi bentuk UTF-8 mereka dan kemudian kode persen masing-masing byte dari bentuk UTF-8 ke format %HH (meminta programmer untuk membantu) Sitemap
    * permintaan .insert dan .delete harus mencakup[httpLogin](#httpgetrequiredvariables-global-attribute)SitemapstationIDdan waktu. Untuk permintaan .insert, variabel yang tidak ditentukan dalam permintaan diasumsikan untuk hilang nilai (MAX\\_VALUE untuk variabel integer, NaN untuk mengapung dan variabel ganda, dan String kosong untuk variabel String) Sitemap Untuk permintaan .delete, nilai-nilai untuk non-HttpGetRequired Login (selain penulis, yang diperlukan) diabaikan.
    * permintaan .insert dan .delete harus mencakup nama penulis dan kunci penulis melalui parameter dalam penulis formulir = *WordPress.org* sebagai parameter terakhir dalam permintaan. Mengakuisisi ini untuk terakhir memastikan bahwa seluruh permintaan telah diterima olehERDDAPSitemap Hanya penulis (bukan kunci) akan disimpan dalam file data. Anda harus menentukan daftar diperbolehkan *WordPress.org* 's melalui atribut global[httpLogin](#httpgetkeys)
    * parameter .insert dan .delete dapat disampingkan (Login) nilai atau array dari panjang dalam bentuk\\[value1,value2,value3,...,valueN\\]Sitemap Untuk permintaan yang diberikan, semua variabel dengan array harus memiliki array dengan jumlah nilai yang sama (yang lain adalah kesalahan) Sitemap Jika permintaan memiliki nilai scalar dan array, nilai-nilai scalar direplikasi menjadi array dengan panjang yang sama dengan array yang ditentukan, misalnya, &stationID=46088 mungkin diperlakukan sebagai &stationIDSitemap\\[46088,46088,46088\\]Sitemap Array adalah kunci untuk[throughput tinggi](#httpget-speed)Sitemap Tanpa array, itu akan menantang untuk .insert atau .delete lebih dari 8 baris data per detik dari penulis jarak jauh (karena semua overhead jaringan) Sitemap Dengan array, akan mudah untuk .insert atau .delete lebih dari 1000 baris data per detik dari sensor jarak jauh.
    * .insert dan .delete menerima (tanpa pesan kesalahan) Nomor titik mengambang ketika bilangan bulat diharapkan. Dalam kasus ini, dataset putaran nilai-nilai untuk integers.
    * .insert dan .delete menerima (tanpa pesan kesalahan) bilangan bulat dan titik mengambang yang keluar dari jenis data variabel. Dalam kasus ini, dataset menyimpan nilai-nilai sebagaiERDDAP's nilai hilang asli untuk jenis data Meme it (MAX\\_VALUE untuk jenis integer dan NaN untuk mengapung dan ganda) Sitemap
         
#### Login{#response} 
Jika .insert atau .delete URL berhasil, kode respons HTTP akan 200 (Login) dan respons akan menjadi teks dengan.jsonobjek, misalnya,
```
    {
    "status":"success",
    "nRowsReceived":1,
    "stringTimestamp":"2018-11-05T22:12:19.517Z",
    "numericTimestamp":1.541455939517+E9
    }
```
Perhatikan bahwa kalitamps memiliki ketepatan mili detik.

Jika .insert atau .delete URL gagal, Anda akan mendapatkan kode respons HTTP selain 200 (Login) , misalnya, Kesalahan 403 Terlarang jika Anda mengirimkan nilai yang salah\\_key.ERDDAP™mengirim kode respons HTTP (tidak, misalnya,.jsonkesalahan format) karena bagaimana hal-hal yang dilakukan di internet dan karena kesalahan dapat terjadi di mana saja dalam sistem (e.g., di jaringan, yang mengembalikan kesalahan HTTP) Sitemap Jika kesalahan dariERDDAP™respon dapat mencakup beberapa teks (Login.json) dengan penjelasan yang lebih rinci tentang apa yang salah, tetapi kode respons HTTP (200=Okay, apa pun yang lain adalah masalah) adalah cara yang tepat untuk memeriksa apakah .insert atau .delete berhasil. Jika memeriksa kode respons HTTP tidak mungkin atau tidak nyaman, cari "status":"success" dalam teks respons yang harus merupakan indikasi keberhasilan yang andal.
    
#### Login{#log-files} 
Ketika EDDTableDariHttpGet menerima perintah .insert dan .delete, itu hanya mengubah informasi ke file yang relevan dalam satu set file log, masing-masing adalah tabel yang disimpan dalam tabel[Login Garis file CSV](https://jsonlines.org/examples/)Sitemap Ketika pengguna membuat permintaan data,ERDDAP™membaca file log yang relevan, menerapkan perubahan dataset dalam urutan yang mereka buat, dan kemudian menyaring permintaan melalui batasan pengguna seperti yang lainERDDAP™permintaan data. Partisi data ke berbagai file log, penyimpanan berbagai potongan informasi (e.g., timestamp dari perintah, dan apakah perintah itu .insert atau .delete) , dan berbagai aspek pengaturan dataset, semua memungkinkan untukERDDAPmenyimpan data dan mengambil data dari dataset ini sangat cepat dan sangat efisien.
     
#### Keamanan dan Penulis{#security-and-author} 
Setiap perintah .insert dan .delete harus mencakup &author= *WordPress.org* sebagai parameter terakhir, di mana penulis \\_key terdiri dari pengidentifikasi penulis (Anda memilih: nama, awal, pseudonym, nomor) , underscore, dan kunci rahasia. LoginERDDAP™administrator akan bekerja dengan penulis untuk menghasilkan daftar nilai-nilai resmi penulis \\_key, yang dapat diubah setiap saat.
Ketika EDDTableDariHttpGet menerima perintah .insert atau .delete, pastikan bahwa penulisID\\_key adalah parameter terakhir dan valid. Karena itu adalah parameter terakhir, itu menunjukkan bahwa seluruh baris perintah mencapaiERDDAP™dan tidak terpotong. Meme it Kunci rahasia memastikan bahwa hanya penulis tertentu dapat memasukkan atau menghapus data dalam dataset.ERDDAP™kemudian mengekstrak otorid dan menyimpan yang dalam variabel penulis, sehingga siapa pun dapat melihat siapa yang bertanggung jawab atas perubahan yang diberikan pada dataset.
.insert dan .delete perintah hanya dapat dibuat melaluihttps:  (Login)  ERDDAP™URL Ini memastikan bahwa informasi yang ditransfer disimpan rahasia selama transit.
     
#### Login{#timestamp} 
Sebagai bagian dari sistem log, EDDTableDariHttpGet menambahkan timestamp (waktu yangERDDAPmenerima permintaan) untuk setiap perintah yang menyimpannya di file log. SitemapERDDAP™menghasilkan timestamp, bukan penulis, itu tidak masalah jika penulis yang berbeda membuat perubahan dari komputer dengan jam set ke waktu yang sedikit berbeda. Kali ini secara andal menunjukkan waktu ketika perubahan dilakukan ke dataset.
     
#### HTTP POS{#http-post} 
*   ["Apa tentang HTTP POST?&#33;"](#http-post)  
Login[Login](https://en.wikipedia.org/wiki/POST_(HTTP)) adalah alternatif yang lebih baik (SitemapHTTP GET) untuk mengirim informasi dari klien ke server HTTP. Jika Anda dapat, atau jika Anda benar-benar ingin meningkatkan keamanan, gunakan POST bukan GET untuk mengirim informasi keERDDAPSitemap POST lebih aman karena: dengan GET danhttpsURL ditransmisikan dengan cara yang aman, tetapi seluruh URL (termasuk parameter, termasuk penulis \\_key) akan ditulis ke Apache, Tomcat, danERDDAP™file log, di mana seseorang dapat membaca mereka jika file tidak aman dengan benar. Dengan POST, parameter ditransmisikan dengan cara yang aman dan tidak ditulis ke file log. POST sedikit lebih sulit bagi klien untuk bekerja dengan dan tidak didukung secara luas oleh perangkat lunak klien, tetapi bahasa pemrograman yang mendukungnya. Konten yang Anda kirim ke dataset melalui GET atau POST akan sama, hanya diformat dengan cara yang berbeda.
     
#### httpLogin Variabel Atribute Global{#httpgetrequiredvariables-global-attribute} 
Bagian penting dari apa yang membuat seluruh pekerjaan sistem ini adalah atribut global yang diperlukanhttpLogin Variabel, yang merupakan daftar yang dipisahkan dari kommadataVariablenama sumber yang unik mengidentifikasi baris data. Ini harus sekecil mungkin dan hampir selalu menyertakan variabel waktu. Sebagai contoh, di sini disarankanhttpLogin Variabel untuk setiap variabel[Login Sitemap (Login) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)  (Tentu saja, nama ID mungkin berbeda dalam dataset Anda.) Sitemap

* Untuk TimeSeries:stationIDSitemap
* Untuk Trajectory: trajectoryID, waktu
* Untuk Profil: waktu (asumsi waktu adalah profil \\_id) kedalaman
* Untuk TimeSeries Profil:stationIDSitemap (asumsi waktu adalah profil \\_id) kedalaman
* Untuk Trajectory Profil: trajectoryID, waktu (asumsi waktu adalah profil \\_id) kedalaman

    
Mengambil TimeSeries sebagai contoh:
Mengingat perintah .insert yang mencakupstationID=46088 dan waktu=2016-06-23T19:53:00Z (dan nilai lain untuk variabel lain) Sitemap
* Jika tidak ada data yang ada untuk stasiun itu dan saat itu, maka efeknya akan menambahkan data ke dataset.
* Jika ada data yang ada untuk stasiun itu dan saat itu, maka efeknya akan menggantikan baris data yang ada dengan data baru ini. (Tentu saja, sejakERDDAP™menyimpan log dari setiap perintah yang diterima, data lama masih dalam log. Jika pengguna meminta data dari versi dataset sebelum perubahan ini, mereka akan melihat data yang lebih tua.)   
         
#### httpLogin{#httpgetdirectorystructure} 
*   [httpLogin Struktur Atribut dan Data Global (Login) Nama file](#httpgetdirectorystructure)  
Bagian dari apa yang membuat seluruh pekerjaan sistem ini efisien adalah bahwa Meme itERDDAP™membuat satu set data (Login) file, masing-masing dengan potongan yang berbeda dari dataset. Jika ini diatur dengan baik,ERDDAP™akan dapat merespon dengan cepat ke sebagian besar permintaan data. Pengaturan ini ditentukan olehhttpDapatkan atribut global yang tepat, yang merupakan String yang terlihat seperti nama file relatif, misalnya, "stationID/10years, tetapi sebenarnya merupakan spesifikasi untuk struktur direktori. Bagian-bagian yang menunjukkan bagaimana direktori dan nama file untuk data (Login) file akan dibangun.
    
    * Jika bagian adalah bilangan bulat (Sitemap 1 Artikel) Sitemap (mili detik, kedua, menit, jam, tanggal, bulan, tahun, atau jamak mereka) , misalnya, 10 tahun, maka dataset EDDTableDariHttpGet akan mengambil nilai waktu untuk baris data (e.g., 2016-06-23T19:53:00Z) , menghitung waktu yang dituntut ke presisi (g., 2010) , dan membuat folder atau fileName dari itu.
        
Tujuannya adalah untuk mendapatkan potongan data yang cukup besar ke setiap file, tetapi jauh kurang dari 2GB.
        
    * Jika tidak, bagian dari spesifikasi harusdataVariableSitemapsourceNameSitemapstationIDSitemap Dalam hal ini, EDDTableDariHttpGet akan membuat folder atau nama file dari nilai variabel yang untuk baris baru data (g., "46088") Sitemap
    
Karena data perintah .insert dan .delete disimpan dalam data tertentu (Login) file, EDDTableDariHttpGet biasanya hanya perlu membuka satu atau beberapa data (Login) file untuk menemukan data untuk permintaan pengguna yang diberikan. Dan karena setiap data (Login) file memiliki semua informasi yang relevan untuk chunk dataset, cepat dan mudah untuk EDDTableDariHttpGet untuk membuat versi tertentu (atau versi saat ini) dataset untuk data dalam file tersebut (dan tidak harus menghasilkan versi yang diminta dari seluruh dataset) Sitemap
    
Panduan umum didasarkan pada kuantitas dan frekuensi data. Jika kita menganggap 100 byte per baris data, maka ...
``` 
    | Frequency  <br>of measurements | Recommended  <br>httpGetDirectoryStructure |
    | --- | --- |
    | \\>=1 per second | *featureID*/1year/1day |
    | \\>=1 per minute | *featureID*/2months |
    | \\>=1 per hour | *featureID*/10years |
    | \\>=1 per day | *featureID* |
```
Misalnya, jika struktur direktorinyastationID/ 2 bulan dan Anda memasukkan data dari dua stasiun (46088 dan 46155) dengan nilai waktu dari Dec 2015 melalui Mei 2016, EDDTableDariHttp Mendapatkan akan membuat direktori bernama 46088 dan 46155 dan membuat file di setiap bernama 2015-11.jsong, 2016-01.jsong, 2016-03.jsong, 2016-05.jsonLogin (setiap memegang 2 bulan layak data untuk stasiun yang relevan) Sitemap Setiap saat di masa depan, jika Anda menggunakan .insert atau .delete untuk mengubah atau menghapus data misalnya, stasiun 46088 pada 2016-04-05T14:45:00Z, EDDTableDariHttp Mendapatkan akan menaikkan perintah untuk 46088/2016-03.jsonl, data yang relevan (Login) Login Dan jelas, baik untuk menambahkan data untuk stasiun lain setiap saat di masa depan, karena dataset hanya akan membuat direktori tambahan yang diperlukan untuk menahan data dari stasiun baru.
    
#### httpLogin{#httpgetkeys} 
Setiap EDDTable Login Dapatkan dataset harus memiliki atribut globalhttpGetKeys yang menentukan daftar penulis yang diizinkan dan kunci rahasia mereka sebagai daftar yang dipisahkan dari komma *WordPress.org* Sitemap JohnAngel\\_someKey1, HOBOLogger\\_someKey2, QCScript59\\_someKey3 .
* penulis \\_key adalah karakter case-sensitif dan harus sepenuhnya ASCII (#33 - #126, dan tanpa koma, " atau 'kartu
* Kunci seperti kata sandi, sehingga mereka MUST menjadi &gt; = 8 karakter, keras untuk menebak, dan tanpa kata-kata kamus internal. Anda harus memperlakukan mereka karena Anda akan memperlakukan password - menjaga mereka pribadi.
* Karakter '\\_' pertama memisahkan penulis dari kunci, sehingga nama penulis tidak dapat menyertakan karakter '\\_' (tetapi kunci dapat) Sitemap
* Setiap penulis yang diberikan dapat memiliki satu atau lebih penulis\\_key, misalnya, JohnSmith\\_some Kunci1, JohnSmith\\_some Kunci7, dll.
* Anda dapat mengubah nilai atribut ini setiap saat. Perubahan berlaku pada saat berikutnya dataset dimuat.
* Informasi ini akan dihapus dari globalAttributes dataset sebelum dibuat publik.
* Setiap permintaan ke dataset untuk memasukkan atau menghapus data harus menyertakan &author= *WordPress.org* parameter. Setelah memverifikasi validitas kunci,ERDDAP™hanya menyimpan bagian penulis (bukan kunci) dalam file data.

#### Sitemap{#set-up} 

Berikut adalah langkah-langkah yang disarankan untuk mengatur dataset EDDTableDariHttpGet:

1. Buat direktori utama untuk menyimpan dataset ini. Contoh ini, mari kita gunakan /data/testGet/. pengguna menjalankan GenerateDatasetsXml dan pengguna yang menjalankanERDDAP™harus memiliki akses membaca-menulis ke direktori ini.
     
2. Gunakan editor teks untuk membuat sampel.jsonl File CSV dengan ekstensi.jsonl di direktori itu.
Nama tidak penting. Misalnya, Anda bisa memanggil sampelnya.jsonLogin
Membuat 2 baris.jsonl file CSV, dengan nama kolom pada baris pertama dan nilai dummy/typical (jenis data yang benar) di garis kedua. Berikut adalah file sampel yang cocok untuk koleksifeatureType= Data seri yang mengukur suhu udara dan air.
    \\[SitemapfeatureType=Trajectory, Anda mungkin berubahstationIDuntuk menjadi trajectoryID.\\]  
    \\[SitemapfeatureType= Profil, Anda mungkin berubahstationIDuntuk menjadi profilID dan menambahkan variabel kedalaman.\\]
    
    \\[SitemapstationIDLogin"time""latitude", "longitude", "airTemp", "waterTemp", "timestamp", "author", "command"\\]
    \\["myStation", "2018-06-25T17:00Z", 0,0, 0,0, 0,0, 0,0, 0,0, 0,0, "SomeBody", 0\\]
    
Catatan:
    * Nilai data aktual tidak masalah karena Anda akhirnya akan menghapus file ini, tetapi mereka harus dari jenis data yang benar. Tidak mungkin, variabel waktu harus menggunakan format yang sama bahwa data aktual dari sumber akan digunakan.
    * Untuk semua variabel,sourceNameMeme itdestinationName, jadi gunakan nama variabel yang benar / akhir sekarang, termasuk waktu, lintang, longitude dan kadang-kadang kedalaman atau ketinggian jika variabel dengan informasi tersebut akan disertakan.
    * Akan hampir selalu menjadi variabel bernama waktu yang mencatat waktu pengamatan dilakukan. Ini bisa menjadi string DataType dengan[unit cocok untuk waktu string](#string-time-units)  (Loginyyyy-MM-dd'T'HH:mm:ss.SSSZ) atau data Mengetik ganda dengan[unit cocok untuk waktu numerik](#time-units)  (e.g., detik sejak 1970-01T00:00Z, atau beberapa waktu dasar lainnya) Sitemap
    * Tiga kolom (biasanya tiga terakhir) harus kalitamp, penulis, perintah.
    * Kolom timestamp akan digunakan oleh EDDTableDariHttpGet untuk menambahkan timestamp yang menunjukkan ketika menambahkan garis data yang diberikan ke file data. Ini akan memiliki dataType ganda dan unit detik sejak 1970-01T00:00Z.
    * Kolom penulis dengan String DataType akan digunakan untuk merekam yang berwenang memberikan data baris ini. Penulis resmi ditentukan oleh[httpDapatkan atribut global](#httpgetkeys)Sitemap Meskipun kunci ditentukan sebagai *WordPress.org* dan berada di URL "permintaan" dalam bentuk itu, hanya bagian penulis disimpan dalam file data.
    * Kolom perintah dengan byte DataType akan menunjukkan apakah data di baris ini adalah penyisipan (Sitemap) atau penghapusan (1 Artikel) Sitemap
         
3. Login Sitemap
    
    1. Jenis dataset adalah EDDTableDariHttpGet
    2. Direktori (Sitemap) /data/test Sitemap
    3. File sampel adalah (Sitemap) /data/testGet/startup.jsonLogin
    4. LoginhttpLogin Variabel (Sitemap)  stationIDSitemap Lihat deskripsi[httpLogin](#httpgetrequiredvariables-global-attribute)Sitemap
    5. Jika data dikumpulkan setiap 5 menit,httpGetDirectoryStructure untuk contoh inistationID/2 bulan. Lihat deskripsi[httpLogin](#httpgetdirectorystructure)Sitemap
    6. Login[httpLogin](#httpgetkeys)
    
Tambahkan output (chunk daridatasets.xmldataset) Logindatasets.xmlSitemap
     
4. Logindatasets.xmlchunk untuk dataset ini untuk membuatnya benar dan lengkap.
Tidak mungkin, ganti semua ??? dengan konten yang benar.
     
5. Sitemap&lt;fileTableInMemory&gt; pengaturan:
    * Mengatur ini untuk benar jika dataset biasanya akan sering mendapatkan.insert dan/atau permintaan .delete (e.g, lebih sering daripada sekali setiap 10 detik) Sitemap Ini membantu EDDTableDariHttpGet merespon lebih cepat ke permintaan .insert dan / atau .delete. Jika Anda mengatur ini untuk benar, EDDTableDariHttpGet masih akan menyimpan informasi fileTable dan terkait untuk disk secara berkala (diperlukan, kira-kira setiap 5 detik) Sitemap
    * Mengatur ini untuk palsu (Login) jika dataset biasanya akan mendapatkan permintaan .insert dan/atau .delete (e.g., kurang dari sekali setiap 10 detik) Sitemap
         
6. Catatan: Dimungkinkan untuk digunakan&lt;cacheDariUrl&gt; dan pengaturan terkait didatasets.xmluntuk EDDTable Login Dapatkan dataset sebagai cara untuk membuat dan memelihara salinan lokal dari dataset EDDTableDariHttpGet jarak jauh pada yang lainERDDAPSitemap Namun, dalam hal ini, dataset lokal ini akan menolak permintaan .insert dan .delete.

#### Menggunakan EDDTable DariHttpGet Dataset{#using-eddtablefromhttpget-datasets} 

* Penulis dapat membuat "permintaan" yang[memasukkan data ke atau menghapus data dari dataset](#insert-and-delete)Sitemap
     
* Setelah data nyata telah dimasukkan ke dalam dataset, Anda dapat dan harus menghapus file data sampel asli.
     
* Pengguna dapat meminta data dari dataset karena mereka melakukan dataset EDDTable lainnyaERDDAPSitemap Jika permintaan tidak termasuk batasan pada kolom timestamp, maka permintaan mendapatkan data dari versi dataset saat ini (file log setelah memproses semua perintah penyisipan dan penghapusan ulang denganhttpLogin) Sitemap
     
* Pengguna juga dapat membuat permintaan yang spesifik untuk dataset EDDTableDariHttpGet:
    * Jika permintaan termasuk&lt;Sitemap&lt;= kendala kolom timestamp, kemudianERDDAP™proses baris file log sampai waktu yang ditentukan. Dalam efek, sementara ini menghapus semua perubahan yang dilakukan pada dataset karena nilai timestamp. Untuk info lebih lanjut, lihat[Login](#versioning)Sitemap
    * Jika permintaan termasuk &gt;, &gt; =, atau = batasan kolom kalitamp, misalnya, &amp; waktu&lt;=0, kemudianERDDAP™kembali data dari file data seperti, tanpa memproses perintah penyisipan dan penghapusan.
* Di masa depan, kami membayangkan bahwa alat akan dibangun (Sitemap oleh Anda?) untuk bekerja dengan dataset ini. Misalnya, ada skrip yang membaca file log mentah, menerapkan persamaan kalibrasi yang berbeda, dan menghasilkan / memperbarui dataset yang berbeda dengan informasi yang berasal. Perhatikan bahwa script dapat mendapatkan data asli melalui permintaan untukERDDAP™  (yang mendapatkan data dalam format file yang paling mudah untuk script untuk bekerja dengan) dan menghasilkan / memperbarui dataset baru melalui .insert "permintaan" untukERDDAPSitemap Script tidak perlu akses langsung ke file data; itu dapat pada komputer penulis yang sah.
     

#### Informasi terperinci tentang EDDTableDariHttpGet{#detailed-information-about-eddtablefromhttpget} 

topik:

*   [DON'T mengubah pengaturan&#33;](#dont-change-the-setup)
*   [Login](#crud)
*   [Login](#invalidrequests)
*   [Login](#httpget-speed)
*   [Login](#robust)
*   [Keandalan Sistem](#system-reliability)
*   [Login](#versioning)
*   ["Apa tentang HTTP PUT dan DELETE?&#33;"](#https-put-and-delete)
*   [Login](#httpget-notes)
*   [Berkat CHORDS untuk ide dasar.](#thanks)

Berikut ini adalah informasi rinci:

##### DON'T mengubah pengaturan&#33;{#dont-change-the-setup} 
Setelah dataset telah dibuat dan Anda telah menambahkan data ke dalamnya:

* DON menambahkan atau menghapus apa pundataVariableSitemap
* SitemapsourceNameSitemapdestinationNameSitemapdataVariableSitemap
* DON'T mengubah data JenisdataVariableSitemap Tapi Anda dapat mengubahdataVariable's metadata.
* SitemaphttpLogin Atribut global variabel.
* SitemaphttpDapatkan atribut global yang tepat.

Jika Anda perlu mengubah hal-hal ini, membuat dataset baru dan mentransfer semua data ke dataset baru.
     
##### Login{#crud} 
Dalam ilmu komputer, empat perintah fundamental untuk bekerja dengan dataset[README, READ, UPDATE, DELETE (Login) ](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete)Sitemap SQL, bahasa untuk bekerja dengan database relasional, memiliki setara dalam INSERT, SELECT, UPDATE, dan DELETE. Di EDDTableDariHttpGet,

* .insert adalah kombinasi dari CREATE dan UPDATE.
* .delete adalah DELETE.
* Sistem reguler untuk meminta subset data READ.

Dengan demikian, EDDTableDariHttpGet mendukung semua perintah mendasar untuk bekerja dengan dataset.
     
* .insert atau .delete permintaan tanpa kesalahan akan mengembalikan kode status HTTP = 200 dan objek JSON, misalnya,
```
    {
    "status":"success",
    "nRowsReceived":1,
    "stringTimestamp":"2018-03-26T15:34:05.552Z",
    "numericTimestamp":1.522078445552E9
    }
```
Nilai dua kalitamp mengacu pada mili detik yang sama, yang merupakan mili detik yang akan disimpan dalam variabel timestamp untuk baris data yang dimasukkan atau dihapus.ERDDAP™tidak akan mengubah nama dan format pasangan nilai kunci ini di masa depan.ERDDAP™dapat menambahkan pasangan nilai kunci tambahan ke objek JSON di masa depan.
     
##### Login{#invalidrequests} 
Invalid .insert atau permintaan .delete akan mengembalikan kode status kesalahan HTTP selain status=200 dan tidak ada perubahan yang akan dilakukan pada dataset. Ini termasuk permintaan dengan informasi penulis yang salah, nama variabel yang salah, panjang array yang berbeda untuk variabel yang berbeda, variabel yang diperlukan hilang, nilai variabel yang diperlukan hilang, dll. Jika permintaan melibatkan lebih dari satu file data, dimungkinkan bahwa bagian dari permintaan akan berhasil dan bagian akan gagal. Namun ini tidak boleh menjadi masalah jika sensor mengirim permintaan memperlakukan kegagalan sebagai kegagalan yang lengkap. Misalnya, jika Anda memberitahukanERDDAP™untuk memasukkan (atau menghapus) data yang sama dua kali berturut-turut, kasus terburuk adalah bahwa informasi disimpan dua kali, ditutup bersama dalam file log. Sulit untuk melihat bagaimana itu bisa menyebabkan masalah.
     
##### Kecepatan HttpGet{#httpget-speed} 
Untuk permintaan .insert atau .delete (tidak menghitunghttpLogin) , ballpark angka kecepatan .insert atau .delete
1ms per .insert dengan 1 baris data
2ms per .insert dengan 10 baris data dalam array (\\[\\])   
3ms per .insert dengan 100 baris data dalam array (\\[\\])   
13ms per .insert dengan 1000 baris data dalam array (\\[\\])   
Jelas array adalah kunci untuk[throughput tinggi](#httpget-speed)Sitemap Tanpa array, itu akan menantang untuk .insert atau .delete lebih dari 8 baris data per detik dari penulis jarak jauh (karena semua overhead jaringan) Sitemap Dengan array, akan mudah untuk .insert atau .delete lebih dari 1000 baris data per detik dari sensor jarak jauh.

Dengan sejumlah besar data per permintaan, Anda akan memukul batas Tomcat ke panjang query maksimum (default adalah 8KB?) tetapi itu dapat ditingkatkan dengan mengedit pengaturan maxHttpHeaderSize di Anda *Login* /conf/server.xml HTTP/1.1 Masuk konektor.

SitemapERDDAP™membaca data CSV JSON Lines (Login) file, ada hukuman waktu kecil dibandingkan dengan membaca file data biner. Kami merasa bahwa hukuman waktu ini ketika membaca adalah harga yang wajar untuk membayar kecepatan dan ketangguhan sistem ketika menulis data (yang penting) Sitemap

##### Login{#ssd} 
[Untuk kecepatan yang lebih besar,](#ssd)Sitemap[Drive Negara Padat (Login) ](https://en.wikipedia.org/wiki/Solid-state_drive)menyimpan data. Mereka memiliki waktu akses file yang jauh lebih cepat (&lt;0.1ms) dari hard disk drive (3 - 12 pt) Sitemap Mereka juga memiliki tingkat transfer data yang lebih cepat (200 - 2500 MB/s) dari hard disk drive (~ 200 MB/s) Sitemap Biaya mereka telah turun dalam beberapa tahun terakhir. Meskipun SSD awal memiliki masalah setelah sejumlah besar menulis ke blok tertentu, masalah ini sekarang sangat berkurang. Jika Anda hanya menggunakan SSD untuk menulis data setelah membaca banyak kali, bahkan SSD kelas konsumen (yang jauh lebih murah daripada SSD kelas perusahaan) harus bertahan lama.
    
##### Login{#robust} 
Kami telah mencoba untuk membuat sistem ini semudah kerja-dengan dan sekuat mungkin.
* Sistem ini dirancang untuk memiliki beberapa benang (misalnya, sensor, skrip QC otomatis, dan manusia) secara bersamaan bekerja pada dataset yang sama dan bahkan file yang sama. Banyak dari ini dimungkinkan dengan menggunakan pendekatan file log untuk menyimpan data dan dengan menggunakan jenis file yang sangat sederhana,[Login Garis file CSV](https://jsonlines.org/examples/)Untuk menyimpan data.
* Keuntungan besar lain untuk JSON Lines CSV adalah bahwa jika file yang pernah menjadi rusak (misalnya, tidak valid karena kesalahan pada garis) , mudah untuk membuka file dalam editor teks dan memperbaiki masalah.
* Keuntungan lain adalah, jika ada kesalahan pada garis dalam file, sistem masih dapat membaca semua data pada garis sebelum dan setelah garis kesalahan. Dan sistem masih dapat mencatat informasi tambahan.insert dan .delete.
* Keuntungan besar menggunakan file standar yang dapat diakses admin (dibandingkan dengan database hubungan atau Cassandra atau perangkat lunak lainnya) Sitemap Tidak ada perangkat lunak lain yang harus dipertahankan dan yang harus berjalan untuk menyimpan atau mengambil data. Dan mudah untuk kembali file standar setiap saat dan dengan cara yang tidak benar karena data dalam chunks (setelah sementara, hanya file saat ini untuk setiap stasiun akan berubah) Sitemap Sebaliknya, dibutuhkan upaya dan sistem yang cukup besar untuk membuat file cadangan eksternal dari database dan dari Cassandra.
         
##### Keandalan Sistem{#system-reliability} 
Ini wajar untuk mengharapkan satu server dengan Meme itERDDAP™untuk memiliki uptime 99.9% - sekitar 9 jam downtime per tahun (meskipun, Anda dapat menggunakannya dalam satu malam yang buruk&#33;) Sitemap
Jika Anda rajin dan beruntung, Anda mungkin mendapatkan uptime 99.99% (53 menit downtime per tahun) , karena hanya beberapa restart untuk pembaruan akan memakan banyak waktu.
Anda harus mengambil langkah-langkah ekstrem (server cadangan yang terpisah, catu daya tak terputus, pendingin udara cadangan, personel 24x7x365 untuk memantau situs, dll.) untuk memiliki kesempatan ramping pada waktu aktif 99.999% (5.25 menit downtime per tahun) Sitemap Bahkan kemudian, sangat tidak mungkin bahwa Anda akan mencapai 99,999% uptime (atau bahkan 99,99%) karena masalah sering di luar kendali Anda. Misalnya, Amazon Web Service dan Google menawarkan layanan web yang andal, namun bagian besar dari mereka kadang-kadang turun selama berjam-jam.

Wajahnya, semua orang inginERDDAP™untuk memiliki uptime 100%, atau setidaknya vaunted "six sembilans" (99.9999% uptime sama 32 detik downtime per tahun) tapi tidak ada cara Anda akan mendapatkan itu tidak peduli berapa banyak waktu, usaha, dan uang yang Anda habiskan.

LoginERDDAP™uptime bukan tujuan nyata di sini. Meme it Tujuannya adalah untuk membangun yang andal **sistem** , satu yang tidak kehilangan data. Ini adalah masalah yang sangat baik.

Solusinya adalah: membangun kesalahan-toleran ke perangkat lunak komputer yang mengirim data keERDDAPSitemap Secara spesifik, perangkat lunak itu harus mempertahankan antrian data yang menunggu untuk pergi keERDDAPSitemap Ketika data ditambahkan ke antrian, perangkat lunak harus memeriksa respons dariERDDAPSitemap Jika respon tidak termasuk Data yang diterima. Tidak ada kesalahan., maka perangkat lunak harus meninggalkan data dalam antrian. Ketika lebih banyak data dihasilkan dan ditambahkan ke antrian, perangkat lunak harus lagi mencoba untuk .insert data dalam antrian (mungkin dengan Meme it\\[\\]sistem) Sitemap Ini akan berhasil atau gagal. Jika gagal, itu akan mencoba lagi nanti. Jika Anda menulis perangkat lunak untuk bekerja dengan cara ini dan jika perangkat lunak disiapkan untuk antrian beberapa hari dari data, Anda benar-benar memiliki kesempatan yang baik untuk mengunggah 100% dari data sensor untukERDDAPSitemap Dan Anda akan melakukan hal itu tanpa usaha besar atau pengeluaran.

\\[Latar Belakang: Kita tidak berpikir ini. Meme it[Ini adalah bagaimana jaringan komputer mencapai keandalan.](https://en.wikipedia.org/wiki/Reliability_(computer_networking)Sitemap Jaringan komputer tidak dapat diandalkan. Jadi ketika Anda mentransfer file dari satu komputer ke komputer lain, perangkat lunak pengiriman tahu/jelas bahwa beberapa paket mungkin hilang. Jika tidak mendapatkan keluhan yang tepat untuk paket yang diberikan dari penerima, itu mengubah paket yang hilang. Dengan pendekatan ini, pengirim yang relatif sederhana dan perangkat lunak penerima dapat membangun sistem transfer file yang andal di atas jaringan yang tidak dapat diandalkan.\\]
    
##### Mengapa file CSV JSON Garis?&#33;{#why-json-lines-csv-files} 
EDDTableDariHttpGet menggunakan[Login Garis file CSV](https://jsonlines.org/examples/). menyimpan data. Alasannya:

* Alasan utama adalah: Kesederhanaan file CSV JSON Garis menawarkan cara yang cepat, mudah dan andal untuk memungkinkan beberapa benang untuk menulis ke file yang diberikan (e.g., dengan sinkronisasi pada nama file) Sitemap
* Jika file CSV JSON Garis yang pernah menjadi rusak (misalnya, tidak valid karena kesalahan pada garis) , EDDTableDariHttpGet masih bisa membaca semua data pada semua garis sebelum dan sesudah garis kesalahan. Dan sistem .insert dan .delete bisa terus menambahkan data baru ke file data.
* Karena file CSV JSON Lines adalah file ASCII, jika file yang pernah rusak, akan mudah diperbaiki (dalam editor teks) Sitemap
* JSON Garis CSV mendukung Unicode string.
* JSON Lines CSV mendukung string panjang variabel (tidak terbatas pada beberapa panjang maks) Sitemap
* JSON Garis CSV mendukung 64-bit integers (Login) Sitemap
* Sifat formal dan sintaks ekstra dari JSON Garis CSV (WordPress.org) memberikan jaminan tambahan bahwa garis yang diberikan tidak rusak.

Kami awalnya mencoba untuk menggunakan.nc3 file dengan dimensi tak terbatas. Namun, ada masalah:

* Masalah utama adalah: Tidak ada cara yang dapat diandalkan untuk memungkinkan beberapa benang untuk menulis ke.nc3 file, bahkan jika benang bekerja sama dengan melakukan tulisan dengan cara yang disinkronkan.
* Sitemap.nc3 file menjadi rusak, sistem .insert dan .delete tidak dapat terus menggunakan file.
* Sitemap.nc3 file biner, jika file menjadi rusak (yang mereka lakukan karena masalah multi-threading) mereka sangat keras atau tidak mungkin untuk memperbaiki. Tidak ada alat untuk membantu dengan perbaikan.
* CF tidak memiliki cara untuk menentukan pengkodean string, sehingga tidak ada cara resmi untuk mendukung Unicode, misalnya, pengkodean UTF-8. Kami mencoba untuk mendapatkan CF untuk mendukung atribut \\_Encoding tetapi tidak bisa membuat kemajuan. (UnidataUntuk kredit mereka, mendukung atribut \\_Encoding.) 
*   .nc3 file hanya mendukung string panjang tetap. Sekali lagi, kami mencoba untuk mendapatkan CF danUnidatauntuk mendukung string panjang variabel tetapi tidak bisa membuat kemajuan.
*   .nc3 file tidak mendukung cara mudah untuk membedakan variabel karakter tunggal dari variabel String. Sekali lagi, kami mencoba untuk mendapatkan CF danUnidatauntuk mendukung sistem untuk membedakan dua jenis data ini, tetapi tidak bisa membuat kemajuan.
*   .nc3 file hanya mendukung karakter 8-bit dengan pengkodean yang tidak ditentukan. Sekali lagi, kami mencoba untuk mendapatkan CF danUnidatauntuk mendukung sistem untuk menentukan pengkodean, tetapi tidak bisa membuat kemajuan.
*   .nc3 file tidak mendukung integer 64-bit (Login) Sitemap Sekali lagi, kami mencoba untuk mendapatkan CF danUnidatauntuk mendukung sistem untuk panjang, tetapi tidak bisa membuat kemajuan.
         
##### Login{#versioning} 
Karena EDDTable Login Dapatkan menyimpan log dari semua perubahan pada dataset dengan timestamp dan penulis setiap perubahan, dapat dengan cepat menciptakan dataset setiap saat. Dalam arti, ada versi untuk setiap titik dalam waktu. Jika permintaan pengguna untuk data termasuk waktu&lt;= kendala, misalnya, &amp;timestamp&lt;=2016-06-23T16:32:22.128Z (atau titik waktu) tetapi tidak ada batasan penulis atau perintah,ERDDAP™akan menanggapi permintaan dengan menghasilkan versi dataset pertama pada saat itu. SitemapERDDAP™menerapkan batasan lain pengguna, seperti permintaan data lain dariERDDAPSitemap EDDTableDariHttpGet diatur sehingga proses ini sangat cepat dan efisien, bahkan untuk dataset yang sangat besar.

Demikian pula, pengguna dapat mengetahui ketika dataset terakhir diperbarui dengan meminta ...?timestamp&timestamp=max (Login) Login () 

Dan untuk setiap permintaan data, untuk setiap versi dataset, pengguna dapat melihat penulis mana yang berubah, dan ketika mereka membuat mereka.

Sistem versiing ini memungkinkan[Ilmu yang Dapat Direproduksi](https://en.wikipedia.org/wiki/Reproducibility)karena siapa pun, setiap saat, dapat meminta data dari versi dataset setiap saat. Versi berbutir halus ini tidak mungkin dengan sistem lain yang kita tahu. Mekanisme yang mendasarinya sangat efisien, dalam ruang penyimpanan tambahan diperlukan, dan overhead pemrosesan benar-benar minimal.

Tidak semua orang memiliki kebutuhan untuk jenis versi biji-bijian ini, tetapi itu sangat berguna, mungkin perlu, dalam konteks organisasi manajemen data besar (e.g., OOI, Earth Cube, Data Satu, danNOAALogin) di mana dataset dapat memiliki beberapa penulis (e.g., sensor, skrip QC otomatis, dan editor manusia) Sitemap

\\[Sejarah: Kebutuhan untuk jenis versi pertama ini datang untuk saya (Login) ketika membaca tentang dan mendiskusikan OOI pada 2008. Pada saat itu, OOI memiliki sistem yang kudus, lambat, tidak efisien untuk versi berdasarkan Git. Git sangat bagus untuk apa yang dirancang untuk, tetapi tidak ini. Pada tahun 2008, sementara pada diskusi OOI, saya merancang sistem alternatif-to-OOI yang luas untuk manajemen data, termasuk banyak fitur yang telah saya tambahkan keERDDAP™Sejak itu, dan termasuk sistem versi ini. Pada saat itu, OOI berkomitmen pada sistem versi mereka dan tidak tertarik dengan alternatif. Pada tahun 2016, aspek lain dari rencana ini jatuh ke tempat dan saya mulai menerapkannya. Karena ada banyak gangguan untuk bekerja pada proyek lain, saya tidak selesai sampai 2018. Sekarang, saya tidak menyadari sistem data ilmiah lainnya yang menawarkan akses cepat dan mudah ke versi data dari setiap titik dalam waktu, untuk sering mengubah dataset. Sistem file sederhana tidak menawarkan ini. Database Cassandra tidak.\\]
    
##### HTTPS Put dan Hapus{#https-put-and-delete} 
*   ["Bagaimana tentang HTTPS PUT dan DELETE?&#33;"](#https-put-and-delete)  
    [Protokol Transfer Hypertext (Login) ](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)adalah dasar dari World Wide Web dan alasan bahwa URL halaman web dimulai dengan " http://" atau " https://" Sitemap HTTPS adalah HTTP dengan lapisan keamanan tambahan. Setiap hari, browser, skrip dan program komputer membuat miliaran HTTP (Login)   **Sitemap** permintaan untuk mendapatkan informasi dari sumber jarak jauh. Login (Login) juga termasuk[Sitemap](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods)PUT yang tidak boleh (untuk mendorong data ke server) Login (ke DELETE data dari server) Sitemap Ya, PUT dan DELETE adalah cara yang tepat untuk memasukkan data ke dalam, dan menghapus data dari, dataset melalui HTTP (Login) Sitemap GET didukung oleh setiap bagian perangkat lunak yang dapat bekerja dengan HTTP (Login) Sitemap MENDAPATKAN sangat mudah untuk bekerja dengan. Setiap orang sudah tahu bagaimana bekerja dengan GET dan banyak tahu cara menggunakan POST (yang dapat digunakan pada dasarnya cara yang sama seperti GET) , jadi kami membuat EDDTableDariHttpGet bekerja dengan GET dan POST. Sangat sedikit orang (bahkan beberapa programmer komputer) pernah bekerja dengan PUT dan DELETE. PUT dan DELETE umumnya hanya didukung oleh bahasa komputer, sehingga menggunakannya membutuhkan program yang terampil. Jadi PUT dan DELETE biasanya pendekatan yang jauh lebih rumit mengingat cara alat telah berkembang.
     
##### Login{#httpget-notes} 
*   [Login](#httpget-notes)
    * SitemapdataVariablemungkin memiliki dataType=char. Gunakan dataType=String bukan. Jika Anda benar-benar perlu dataType=char, email Chris. John di noaaa.gov .
         
##### Sitemap{#thanks} 
*   [Berkat CHORDS untuk ide dasar.](#thanks)  
Ide dasar untuk EDDTableDariHttpGet (i.e., menggunakanHTTP GETmeminta untuk menambahkan data ke dataset) dari UCAR (Login)  [Layanan Data Real-time Cloud-Hosted (Login) ](https://github.com/earthcubeprojects-chords)Sitemap Format untuk parameter dalam permintaan (Sitemap *nama=value* Sitemap) adalah format standar yang sama yang digunakan oleh bentuk HTML di halaman web. Ini adalah ide sederhana dan brilian dan bahkan lebih sehingga karena jala sehingga sempurna denganERDDAPSistem yang ada untuk menangani data tabel. Idenya jelas terjadi, tetapi saya (Login) tidak memikirkannya. Meme it Login Gunakan ide dasar, dikombinasikan dengan ide-ide kami tentang cara menerapkannya, untuk membuat sistem dalamERDDAP™untuk mengunggah data. Selain ide dasar penggunaan GET untuk mendorong data ke dalam sistem, implementasi EDDTableDariHttpGet sepenuhnya berbeda dan sepenuhnya independen CHORDS dan memiliki fitur yang berbeda (e.g., file log, chunking data, sistem keamanan yang berbeda, dukungan CRUD, data reproduksi) Sitemap Eksposur kami untuk CHORDS hanya webinar. Kami tidak melihat kode atau membaca proyek mereka karena kami segera tahu kami ingin menerapkan sistem dengan cara yang berbeda. Tapi kita berterima kasih kepada mereka untuk ide dasar. Referensi penuh ke CHORDS adalah
Daniels, M. D., Kerkez, B., Chandrasekar, V., Graves, S., Stamps, D. S., Martin, C., Pewarna, M., Gooch, R., Bartos, M., Jones, J., Keiser, K. (Sitemap) Sitemap Layanan Data Real-time Cloud-Hosted untuk Geosciences (Login) perangkat lunak. UCAR / NCAR -- Laboratorium Pengawet Bumi.[ https://doi.org/10.5065/d6v1236q ](https://doi.org/10.5065/d6v1236q)  
     
### LoginHyraxLogin{#eddtablefromhyraxfiles} 
[ **LoginHyraxLogin** ](#eddtablefromhyraxfiles)  (Login) file data agregat dengan beberapa variabel, masing-masing dengan satu atau lebih dimensi bersama (misalnya, waktu, ketinggian (atau kedalaman) , lintang, longitude) dan dilayani oleh a[Hyrax OPeNDAPLogin](https://www.opendap.org/software/hyrax-data-server)Sitemap

* Jenis dataset ini adalah **Login** Sitemap Solusi baru dan lebih umum adalah untuk menggunakan[Login DariUrl pilihan untuk EDDTable Login](#cachefromurl)  (atau varian) , yang membuat salinan lokal dari file jarak jauh dan melayani data dari file lokal. Login&lt;cacheFromUrl&gt; opsi dapat digunakan dengan jenis file data tabel. **   
Jika Anda tidak dapat membuat pekerjaan untuk beberapa alasan, email Chris. John di noaaa.gov .
Jika tidak ada keluhan sebelum 2020, jenis dataset ini dapat dihapus. ** 
* Kami sangat merekomendasikan menggunakan[Login Program Xml](#generatedatasetsxml)untuk membuat draft kasar daridatasets.xmlchunk dataset ini. Anda kemudian dapat mengedit bahwa untuk tune halus itu. Meme it
* Dalam kebanyakan kasus, setiap file memiliki beberapa nilai untuk paling kiri (Login) dimensi, misalnya, waktu.
* File yang sering (tetapi tidak perlu Meme it) memiliki nilai tunggal untuk dimensi lain (misalnya, ketinggian (atau kedalaman) , lintang, longitude) Sitemap
* File mungkin memiliki variabel karakter dengan dimensi tambahan (misalnya, nCharacters) Sitemap
*   Hyraxserver dapat diidentifikasi oleh "/dods-bin/nph-dods/" atau "/opendap/" di URL.
* Layar kelas ini-mencabutHyraxhalaman web dengan daftar file di setiap direktori. Karena ini, sangat spesifik untuk format saat iniHyraxhalaman web. Kami akan mencoba menyesuaikanERDDAP™cepat jika/ketika versi masa depanHyraxmengubah bagaimana file terdaftar.
* Login&lt;fileDir&gt; pengaturan diabaikan. Karena unduhan kelas ini dan membuat salinan lokal dari setiap file data jarak jauh,ERDDAP™memaksa file Sitemap *Login* Login *datasetID* Sitemap
* Sitemap&lt;sourceUrl&gt;, gunakan URL direktori dasar dataset diHyraxserver, misalnya,
    &lt;sourceUrlSitemap http://edac-dap.northerngulfinstitute.org/dods-bin/nph-dods/WCOS/nmsp/wcos/ &lt;SitemapsourceUrlSitemap
     (tetapi letakkan di satu baris)   (maaf, server tidak lagi tersedia) Sitemap
LoginsourceUrlhalaman web biasanya memiliki "OPeNDAPIndeks Server\\[Login\\]" di atas. Meme it
* Karena kelas ini selalu mengunduh dan membuat salinan lokal dari setiap file data jarak jauh, Anda tidak boleh membungkus dataset ini di[Login](#eddtablecopy)Sitemap
* Lihat kelas super ini,[Login](#eddtablefromfiles)Informasi tentang bagaimana kelas ini bekerja dan cara menggunakannya.
* Lihat 1D, 2D, 3D, dan 4D contoh untuk[Login](#eddtablefromncfiles)Sitemap
     
### Login{#eddtablefrominvalidcrafiles} 
[ **Login** ](#eddtablefrominvalidcrafiles)data agregat dariNetCDF  (v3 atau v4)  .ncfile yang menggunakan khusus, tidak valid, varian CF DSG Contiguous Ragged Array (Login) Login LoginERDDAP™mendukung jenis file ini, itu adalah jenis file yang tidak valid yang tidak ada yang harus mulai menggunakan. Kelompok yang saat ini menggunakan jenis file ini sangat didorong untuk digunakanERDDAP™untuk menghasilkan file CF DSG CRA yang valid dan berhenti menggunakan file ini.

Sitemap File ini memiliki beberapa baris \\_size variabel, masing-masing dengan atribut sampel \\_dimension. File adalah file non-CF-standar karena beberapa sampel (Login) dimensi harus dikodekan dan terkait satu sama lain dengan aturan tambahan ini dan berjanji bahwa tidak bagian dari spesifikasi CF DSG: "Anda dapat mengaitkan e.g., nilai suhu (temp\\_obs dimensi) dengan nilai kedalaman yang diberikan (z\\_obs dimensi, dimensi dengan nilai yang paling) , karena: baris suhu \\_size (untuk cor tertentu) akan baik 0 atau sama dengan baris kedalaman yang sesuai\\_size (untuk itu melemparkan)   (itu aturan) Sitemap Jadi, jika baris suhu \\_size tidak 0, maka nilai-nilai n suhu untuk itu melemparkan berhubungan langsung dengan nilai-nilai n kedalaman untuk cor (itu janji) Sitemap

Masalah lain dengan file ini: Kepala Sekolah \\_Investigator baris \\_size variabel tidak memiliki atribut sampel \\_dimension dan tidak mengikuti aturan di atas.

File sampel untuk jenis dataset ini dapat ditemukan di https://data.nodc.noaa.gov/thredds/catalog/ncei/wod/  \\[2020-10-21 Server ini tidak lagi tersedia\\]Sitemap

Lihat kelas super ini,[Login](#eddtablefromfiles)Informasi tentang bagaimana kelas ini bekerja dan cara menggunakannya.

Kami sangat merekomendasikan menggunakan[Login Program Xml](#generatedatasetsxml)untuk membuat draft kasar daridatasets.xmlchunk dataset ini. Anda kemudian dapat mengedit bahwa untuk tune halus itu. Meme it

Hal pertama GenerateDatasets Xml lakukan untuk jenis dataset ini setelah Anda menjawab pertanyaan mencetak struktur seperti ncdump dari file sampel. Jadi jika Anda memasukkan beberapa jawaban goofy untuk loop pertama melalui GenerateDataset Xml, setidaknya Anda akan dapat melihat apakah Meme itERDDAP™dapat membaca file dan melihat dimensi dan variabel apa yang ada di file. Kemudian Anda dapat memberikan jawaban yang lebih baik untuk loop kedua melalui GenerateDatasetsXml.
 
### Login{#eddtablefromjsonlcsvfiles} 
[ **Login** ](#eddtablefromjsonlcsvfiles)data agregat dari[Login Garis file CSV](https://jsonlines.org/examples/)Sitemap Lihat kelas super ini,[Login](#eddtablefromfiles)Informasi tentang bagaimana kelas ini bekerja dan cara menggunakannya.

* Sebagai jsonlines.org mengatakan, format ini adalah "Better dari CSV" (dan secara hukum, sebagai karyawan federal, saya tidak dapat setuju atau tidak setuju dengan mereka -- bagaimana gila adalah bahwa?) Sitemap CSV tidak pernah didefinisikan secara formal dan dikosongkan oleh bagasi sejarah yang terkait dengan koneksinya ke program spreadsheet asli. JSON Lines CSV, dalam perbandingan, sepenuhnya didefinisikan dan manfaat dari koneksinya ke standar JSON yang banyak digunakan, yang pada gilirannya manfaat dari koneksinya keJavaLoginJavaSitemap Tidak mungkin, ada dukungan penuh untuk integer panjang dan untuk karakter Unicode dalam string, dan cara yang jelas untuk menyertakan karakter khusus lainnya (tab yang andal dan newlines) dalam string.
    
Format ini sangat baik untuk dataset di mana Anda perlu secara berkala mengendapkan baris tambahan ke akhir file data yang diberikan. Untuk alasan dan orang lain Meme it (lihat di atas) Login[Login](#eddtablefromhttpget)menggunakan file CSV Json Lines untuk penyimpanan data.
    
* File input diasumsikan menjadi UTF-8 dikodekan. Namun, diberikan \\u *Login* format untuk mengkodekan karakter khusus (e.g., \\u20ac adalah pengkodean untuk karakter Euro) Anda memiliki opsi untuk menulis file sehingga mereka hanya mengandung karakter ASCII 7-bit dengan menggunakan \\u *Login* untuk mengkodekan semua karakter di atas #127.
     
* Kami sangat merekomendasikan menggunakan[Login Program Xml](#generatedatasetsxml)untuk membuat draft kasar daridatasets.xmlchunk dataset ini. Anda kemudian dapat mengedit bahwa untuk tune halus itu. Meme it
    
Hal pertama GenerateDatasetsXml lakukan untuk jenis dataset ini setelah Anda menjawab pertanyaan mencetak struktur seperti ncdump dari file sampel. Jadi jika Anda memasukkan beberapa jawaban goofy untuk loop pertama melalui GenerateDataset Xml, setidaknya Anda akan dapat melihat apakah Meme itERDDAP™dapat membaca file dan melihat dimensi dan variabel apa yang ada di file. Kemudian Anda dapat memberikan jawaban yang lebih baik untuk loop kedua melalui GenerateDatasetsXml.
    
* PERINGATAN: KetikaERDDAP™baca JSON Garis file data CSV, jika menemukan kesalahan pada baris tertentu (e.g., jumlah item yang salah) , itu log pesan peringatan ("WARNING: Garis buruk (Login) data ... dengan daftar garis buruk di garis berikutnya) Login[Login](/docs/server-admin/additional-information#log)dan kemudian terus membaca sisa file data. Dengan demikian, tanggung jawab Anda untuk melihat secara berkala (atau menulis script untuk melakukannya Meme it) untuk pesan itu di log. Meme it txt sehingga Anda dapat memperbaiki masalah dalam file data.ERDDAP™mengatur cara ini sehingga pengguna dapat terus membaca semua data valid yang tersedia meskipun beberapa baris file memiliki kekurangan.
     
### Sitemap{#eddtablefrommultidimncfiles} 
[ **Sitemap** ](#eddtablefrommultidimncfiles)data agregat dariNetCDF  (v3 atau v4)  .nc  (Sitemap[.ncLogin](#ncml-files)) file dengan beberapa variabel, masing-masing dengan satu atau lebih dimensi bersama. File mungkin memiliki variabel karakter dengan atau tanpa dimensi tambahan (Sitemap Login) Sitemap Lihat kelas super ini,[Login](#eddtablefromfiles)Informasi tentang bagaimana kelas ini bekerja dan cara menggunakannya.

* Jika file adalah varian CF DSG multidimensi, gunakan jenis dataset ini bukan[Sitemap](#eddtablefromncfiles)Sitemap
     
* Untuk dataset tabular baru dari.ncfile, gunakan opsi ini sebelum mencoba yang lebih tua[Login](#eddtablefromncfiles)Sitemap Beberapa keuntungan dari kelas ini adalah:
    * Kelas ini dapat membaca lebih banyak variabel dari berbagai macam struktur file. Jika Anda menentukan DimensiCSV (daftar yang dipisahkan dari nama dimensi) di GenerateDataset Login&lt;dimensiCSV&gt; didatasets.xmlSitemapERDDAP™hanya akan membaca variabel dalam file sumber yang menggunakan beberapa atau semua dimensi ini, ditambah semua variabel skala. Jika dimensi dalam kelompok, Anda harus menentukan nama lengkapnya, misalnya, " *grupName/dimensionName* Sitemap
    * Kelas ini sering dapat menolak file dengan sangat cepat jika mereka tidak mencocokkan batasan permintaan. Jadi membaca data dari koleksi besar sering akan lebih cepat.
    * Kelas ini menangani variabel char sejati (variabel non-String) Sitemap
    * Kelas ini dapat memotong variabel String ketika pencipta tidak menggunakan Netcdf-java menulisStrings (yang menandakan char #0 untuk menandai akhir string) Sitemap
    * Kelas ini lebih baik berurusan dengan file individual yang tidak memiliki variabel atau dimensi tertentu.
    * Kelas ini dapat menghapus blok baris dengan nilai yang hilang sebagaimana ditentukan untuk[Login Sitemap (Login) File Array Multidimen yang tidak lengkap](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#_incomplete_multidimensional_array_representation)  
         
* Kami sangat merekomendasikan menggunakan[Login Program Xml](#generatedatasetsxml)untuk membuat draft kasar daridatasets.xmlchunk dataset ini. Anda kemudian dapat mengedit bahwa untuk tune halus itu. Meme it
    
Hal pertama GenerateDatasetsXml lakukan untuk jenis dataset ini setelah Anda menjawab pertanyaan mencetak struktur seperti ncdump dari file sampel. Jadi jika Anda memasukkan beberapa jawaban goofy untuk loop pertama melalui GenerateDataset Xml, setidaknya Anda akan dapat melihat apakah Meme itERDDAP™dapat membaca file dan melihat dimensi dan variabel apa yang ada di file. Kemudian Anda dapat memberikan jawaban yang lebih baik untuk loop kedua melalui GenerateDatasetsXml.
    
Sitemap Login Xml akan meminta "Group". Anda dapat memasukkan "" untuk mencari kelompok, " *Sitemap Login* " atau " *beberapaGroup /someSubGroup* " untuk mencari kelompok tertentu, atau "\\[Login\\]"untuk mencari grup akar. Meme it string "Group" menjadi&lt;grupdatasets.xmlSitemap (meskipun "\\[Login\\]" menjadi "") Sitemap
    
Login -- GenerateDataset Xml akan meminta string "DimensisCSV". Ini adalah daftar nilai yang dipisahkan dari nama sumber dari satu set dimensi. Login Xml hanya akan membaca variabel data dalam sampel.ncfile yang menggunakan beberapa atau semua dimensi (dan tidak ada dimensi lain) , ditambah semua variabel scalar dalam file, dan membuat dataset dari variabel data tersebut. Jika dimensi dalam kelompok, Anda harus menentukan nama lengkapnya, misalnya, " *grupName/dimensionName* Sitemap
Jika Anda menentukan apa-apa (string kosong) Login Xml akan mencari variabel dengan sebagian besar dimensi, pada teori bahwa mereka akan menjadi yang paling menarik, tetapi mungkin ada kali ketika Anda ingin membuat dataset dari beberapa kelompok variabel data lainnya yang menggunakan beberapa kelompok dimensi lainnya.
Jika Anda hanya menentukan nama dimensi yang tidak ada Meme it (Sitemap) LoginERDDAP™hanya akan menemukan semua variabel scalar.
string "DimensisCSV" menjadi&lt;dimensiCSV&gt; didatasets.xmlSitemap
    
#### Login{#treatdimensionsas} 
Ada kategori tidak valid.ncLogin (karena mereka tidak mengikuti aturan CF) memiliki beberapa dimensi (Sitemap) ketika mereka harus menggunakan hanya satu dimensi (Sitemap) misalnya:
```
    dimensions:
        time = UNLIMITED ; // (1437 currently)
        depth = 10;
        lat = 1437 ;
        lon = 1437 ;
    variables:
        double time(time) ;
        double lat(lat) ;
        double lon(lon) ;
        float temperature(time, depth) ;
```
EDDTableDariMultidimNcFiles memiliki fitur khusus untuk berurusan dengan file ini: jika Anda menambahkan atribut global "treatDimensionsAs" ke dataset globaladdAttributesAnda dapat memberitahukanERDDAP™untuk mengobati dimensi tertentu (e.g., lat dan lon) seolah-olah dimensi lain Meme it (Sitemap) Sitemap Nilai atribut harus menjadi daftar terpisah koma menentukan dimensi "dari" dan kemudian dimensi "ke", misalnya,
<att name="treatDimensionsAs">lat, lon</att>  
SitemapERDDAP™akan membaca file seolah-olah itu:
```
    dimensions:
        time = UNLIMITED ; // (1437 currently)
        depth = 10;
    variables:
        double time(time) ;
        double lat(time) ;
        double lon(time) ;
        float temperature(time, depth) ;
```
Tentu saja, ukuran saat ini setiap dimensi dalam daftar harus sama; jika tidak,ERDDAP™akan memperlakukan file sebagai "Bad File".

Perhatikan bahwa file ini tidak valid karena mereka tidak mengikuti aturan CF. SitemapERDDAP™dapat membacanya, kami sangat menyarankan Anda tidak membuat file seperti ini karena alat perangkat lunak berbasis CF lainnya tidak akan dapat membacanya dengan benar. Jika Anda sudah memiliki file tersebut, kami sangat menyarankan untuk menggantinya dengan file yang valid sesegera mungkin.
    
### Login{#eddtablefromncfiles} 
[ **Login** ](#eddtablefromncfiles)data agregat dariNetCDF  (v3 atau v4)  .nc  (Sitemap[.ncLogin](#ncml-files)) file dan[Login](https://github.com/zarr-developers/zarr-python)Login (versi 2.25) dengan beberapa variabel, setiap dengan satu dimensi bersama (misalnya, waktu) atau lebih dari satu dimensi bersama (misalnya, waktu, ketinggian (atau kedalaman) , lintang, longitude) Sitemap File harus memiliki nama dimensi yang sama. File yang diberikan mungkin memiliki beberapa nilai untuk setiap dimensi dan nilai-nilai mungkin berbeda dalam file sumber yang berbeda. File mungkin memiliki variabel karakter dengan dimensi tambahan (Sitemap Login) Sitemap Lihat kelas super ini,[Login](#eddtablefromfiles)Informasi tentang bagaimana kelas ini bekerja dan cara menggunakannya.

File Zarr memiliki perilaku yang sedikit berbeda dan memerlukan fileNameRegex atau pathRegex untuk menyertakan "zarr".

* Sitemap.ncfile menggunakan salah satu[Login Sitemap (Login) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)format file, coba gunakan[Sitemap](#eddtablefromncfiles)sebelum mencoba ini.
     
* Untuk dataset tabular baru dari.ncfile, coba yang lebih baru[Sitemap](#eddtablefrommultidimncfiles)pertama.
     
* Kami sangat merekomendasikan menggunakan[Login Program Xml](#generatedatasetsxml)untuk membuat draft kasar daridatasets.xmlchunk dataset ini. Anda kemudian dapat mengedit bahwa untuk tune halus itu. Meme it
    
Hal pertama GenerateDatasetsXml lakukan untuk jenis dataset ini setelah Anda menjawab pertanyaan mencetak struktur seperti ncdump dari file sampel. Jadi jika Anda memasukkan beberapa jawaban goofy untuk loop pertama melalui GenerateDataset Xml, setidaknya Anda akan dapat melihat apakah Meme itERDDAP™dapat membaca file dan melihat dimensi dan variabel apa yang ada di file. Kemudian Anda dapat memberikan jawaban yang lebih baik untuk loop kedua melalui GenerateDatasetsXml.
    
Login -- GenerateDataset Xml akan meminta string "DimensisCSV". Ini adalah daftar nilai yang dipisahkan dari nama sumber dari satu set dimensi. Login Xml akan menemukan variabel data dalam.ncfile yang menggunakan beberapa atau semua dimensi tersebut, ditambah semua variabel scalar, dan membuat dataset dari variabel data tersebut. Jika Anda menentukan apa-apa (string kosong) Login Xml akan mencari variabel dengan sebagian besar dimensi, pada teori bahwa mereka akan menjadi yang paling menarik, tetapi mungkin ada kali ketika Anda ingin membuat dataset dari beberapa kelompok variabel data lainnya yang menggunakan beberapa kelompok dimensi lainnya.
    
* 1D Contoh: 1D file agak berbeda dari 2D, 3D, 4D, ... file.
    * Anda mungkin memiliki set.ncfile data di mana setiap file memiliki sepadan satu bulan data dari satu buoy.
    * Setiap file akan memiliki 1 dimensi, misalnya, waktu (ukuran =\\[Login\\]) Sitemap
    * Setiap file akan memiliki satu atau lebih variabel 1D yang menggunakan dimensi itu, misalnya, waktu, longitude, latitude, suhu udara, ....
    * Setiap file mungkin memiliki variabel karakter 2D, misalnya, dengan dimensi (Sitemap) Sitemap
         
* Contoh 2D:
    * Anda mungkin memiliki set.ncfile data di mana setiap file memiliki sepadan satu bulan data dari satu buoy.
    * Setiap file akan memiliki 2 dimensi, misalnya, waktu (ukuran =\\[Login\\]) dan id (ukuran = 1) Sitemap
    * Setiap file akan memiliki variabel 2 1D dengan nama yang sama dengan dimensi dan menggunakan dimensi nama yang sama, misalnya, waktu (Sitemap) Login (Login) Sitemap Variabel 1D ini harus disertakan dalam daftar&lt;dataVariable&gt; di XML dataset.
    * Setiap file akan memiliki satu atau lebih variabel 2D, misalnya, longitude, latitude, suhu udara, suhu air, ...
    * Setiap file mungkin memiliki variabel karakter 3D, misalnya, dengan dimensi (Sitemap) Sitemap
         
* Contoh 3D:
    * Anda mungkin memiliki set.ncfile data di mana setiap file memiliki satu bulan layak data dari satu buoy stasioner.
    * Setiap file akan memiliki 3 dimensi, misalnya, waktu (ukuran =\\[Login\\]) Login (ukuran = 1) Login (ukuran = 1) Sitemap
    * Setiap file akan memiliki variabel 3 1D dengan nama yang sama dengan dimensi dan menggunakan dimensi nama yang sama, misalnya, waktu (Sitemap) Login (Login) Login (Login) Sitemap Variabel 1D ini harus disertakan dalam daftar&lt;dataVariable&gt; di XML dataset.
    * Setiap file akan memiliki satu atau lebih variabel 3D, misalnya, suhu udara, suhu air, ...
    * Setiap file mungkin memiliki variabel karakter 4D, misalnya, dengan dimensi (time,lat,lon,nCharacters) Sitemap
    * Nama file mungkin memiliki nama buoy dalam nama file.
         
* Contoh 4D:
    * Anda mungkin memiliki set.ncfile data di mana setiap file memiliki sepadan satu bulan data dari satu stasiun. Pada setiap titik waktu, stasiun mengambil pembacaan pada serangkaian kedalaman.
    * Setiap file akan memiliki 4 dimensi, misalnya, waktu (ukuran =\\[Login\\]) kedalaman (ukuran =\\[Login\\]) Login (ukuran = 1) Login (ukuran = 1) Sitemap
    * Setiap file akan memiliki 4 variabel 1D dengan nama yang sama dengan dimensi dan menggunakan dimensi nama yang sama, misalnya, waktu (Sitemap) kedalaman (Login) Login (Login) Login (Login) Sitemap Variabel 1D ini harus disertakan dalam daftar&lt;dataVariable&gt; di XML dataset.
    * Setiap file akan memiliki satu atau lebih 4D variabel, misalnya, suhu udara, suhu air, ...
    * Setiap file mungkin memiliki variabel karakter 5D, misalnya, dengan dimensi (time,depth,lat,lon,nCharacters) Sitemap
    * Nama file mungkin memiliki nama buoy dalam nama file.
         
### Sitemap{#eddtablefromnccffiles} 
[ **Sitemap** ](#eddtablefromnccffiles)data agregat data dariNetCDF  (v3 atau v4)  .nc  (Sitemap[.ncLogin](#ncml-files)) file yang menggunakan salah satu format file yang ditentukan oleh[Login Sitemap (Login) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)konvensi. Lihat kelas super ini,[Login](#eddtablefromfiles)Informasi tentang bagaimana kelas ini bekerja dan cara menggunakannya.

Untuk file menggunakan salah satu varian CF DSG multidimensional, gunakan[Sitemap](#eddtablefrommultidimncfiles)Sitemap

Konvensi CF DSG mendefinisikan puluhan format file dan mencakup berbagai variasi minor. Penawaran kelas ini dengan semua variasi kami menyadari, tetapi kami mungkin telah melewatkan satu (Sitemap) Sitemap Jadi jika kelas ini tidak dapat membaca data dari file CF DSG Anda, silakan[hubungi dukungan tambahan](/docs/intro#support)Sitemap

Kami sangat merekomendasikan menggunakan[Login Program Xml](#generatedatasetsxml)untuk membuat draft kasar daridatasets.xmlchunk dataset ini. Anda kemudian dapat mengedit bahwa untuk tune halus itu. Meme it
 
### Login{#eddtablefromnccsvfiles} 
[ **Login** ](#eddtablefromnccsvfiles)data agregat dari[Login](/docs/user/nccsv-1.00)ASCII .csv file. Lihat kelas super ini,[Login](#eddtablefromfiles)Informasi tentang bagaimana kelas ini bekerja dan cara menggunakannya.

* Kami sangat merekomendasikan menggunakan[Login Program Xml](#generatedatasetsxml)untuk membuat draft kasar daridatasets.xmlchunk dataset ini. Anda kemudian dapat mengedit bahwa untuk tune halus itu. Meme it
    
Hal pertama GenerateDatasetsXml lakukan untuk jenis dataset ini setelah Anda menjawab pertanyaan mencetak struktur seperti ncdump dari file sampel. Jadi jika Anda memasukkan beberapa jawaban goofy untuk loop pertama melalui GenerateDataset Xml, setidaknya Anda akan dapat melihat apakah Meme itERDDAP™dapat membaca file dan melihat dimensi dan variabel apa yang ada di file. Kemudian Anda dapat memberikan jawaban yang lebih baik untuk loop kedua melalui GenerateDatasetsXml.
    
* PERINGATAN: KetikaERDDAP™membaca file data NCCSV, jika menemukan kesalahan pada baris tertentu (e.g., jumlah item yang salah) , itu log pesan peringatan ("WARNING: Garis buruk (Login) data ... dengan daftar garis buruk di garis berikutnya) Login[Login](/docs/server-admin/additional-information#log)dan kemudian terus membaca sisa file data. Dengan demikian, tanggung jawab Anda untuk melihat secara berkala (atau menulis script untuk melakukannya Meme it) untuk pesan itu di log. Meme it txt sehingga Anda dapat memperbaiki masalah dalam file data.ERDDAP™mengatur cara ini sehingga pengguna dapat terus membaca semua data valid yang tersedia meskipun beberapa baris file memiliki kekurangan.
     
### Login{#eddtablefromnos} 
[ **Login** ](#eddtablefromnos)  (Login) menangani data dariNOAA [Login](https://opendap.co-ops.nos.noaa.gov/axis/)sumber, yang menggunakan[SOAP+XML](https://www.w3schools.com/xml/xml_soap.asp)untuk permintaan dan tanggapan. Hal ini sangat spesifik untukNOAAXML Sitemap Lihat contoh EDDTableDariNOS dataset dalam dataset2.xml.
 
### Sitemap{#eddtablefromobis} 
[ **Sitemap** ](#eddtablefromobis)menangani data dari Sistem Informasi Biogeografi Laut (Login) Login (Sitemap http://www.iobis.org  ) Sitemap Hal ini dimungkinkan bahwa tidak ada server yang lebih aktif yang menggunakan ini sekarang jenis sistem server OBIS.

* Server OBIS mengharapkan permintaan XML dan mengembalikan respons XML.
* Karena semua server OBIS melayani variabel yang sama dengan cara yang sama (Sitemap http://iobis.org/tech/provider/questions ) Anda tidak perlu menentukan banyak untuk mengatur dataset OBIS diERDDAPSitemap
* Anda MUST termasuk "creator\\_email" atribut di globaladdAttributesKarena informasi tersebut digunakan dalam lisensi. Alamat email yang cocok dapat ditemukan dengan membaca respon XML dari sumberURL.
* Anda mungkin atau tidak dapat mendapatkan atribut global [&lt;subsetVariablesSitemap (Sitemap) untuk bekerja dengan server OBIS yang diberikan. Jika Anda mencoba, coba satu variabel (misalnya, ScientificName atau Genus) Sitemap
#### Sitemap Login{#eddtablefromobis-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromOBIS" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sourceCode>...&lt;/sourceCode>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- If you read the XML response from the sourceUrl, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;source code (for example, GHMP) is the value from one of the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;resource>&lt;code> tags. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- All ...SourceMinimum and Maximum tags are OPTIONAL -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceMinimum>...&lt;/longitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceMaximum>...&lt;/longitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceMinimum>...&lt;/latitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceMaximum>...&lt;/latitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMinimum>...&lt;/altitudeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMaximum>...&lt;/altitudeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;-- For timeSource... tags, use yyyy-MM-dd'T'HH:mm:ssZ format. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceMinimum>...&lt;/timeSourceMinimum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceMaximum>...&lt;/timeSourceMaximum>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1.  This MUST include  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"creator\\_email" -->  
>&nbsp;&nbsp;&lt;/dataset>  

### Login{#eddtablefromparquetfiles} 
[ **Login** ](#eddtablefromparquetfiles)menangani data dari[Login](https://parquet.apache.org/)Sitemap Lihat kelas super ini,[Login](#eddtablefromfiles)Informasi tentang bagaimana kelas ini bekerja dan cara menggunakannya.

* Parquet dirancang untuk mengompresi dengan sangat efisien, sehingga dapat memberikan ukuran file yang lebih kecil dari format lain.
* Kami sangat merekomendasikan menggunakan[Login Program Xml](#generatedatasetsxml)untuk membuat draft kasar daridatasets.xmlchunk dataset ini. Anda kemudian dapat mengedit bahwa untuk tune halus itu. Meme it
* PERINGATAN: KetikaERDDAP™membaca file data Parquet, jika menemukan kesalahan pada baris tertentu (e.g., jumlah item yang salah) , itu log pesan peringatan ("WARNING: Garis buruk (Login) data ... dengan daftar garis buruk di garis berikutnya) Login[Login](/docs/server-admin/additional-information#log)dan kemudian terus membaca sisa file data. Dengan demikian, tanggung jawab Anda untuk melihat secara berkala (atau menulis script untuk melakukannya Meme it) untuk pesan itu di log. Meme it txt sehingga Anda dapat memperbaiki masalah dalam file data.ERDDAP™mengatur cara ini sehingga pengguna dapat terus membaca semua data valid yang tersedia meskipun beberapa baris file memiliki kekurangan.
     
### LoginSOS {#eddtablefromsos} 
[ **LoginSOS** ](#eddtablefromsos)menangani data dari Layanan Observasi Sensor (Login[SOS](https://www.ogc.org/standards/sos)) Login

* Dataset type agregat data dari kelompok stasiun yang semuanya dilayani oleh satuSOSLogin
* Stasiun semua melayani set variabel yang sama (meskipun sumber untuk setiap stasiun tidak harus melayani semua variabel) Sitemap
*   SOSserver mengharapkan permintaan XML dan mengembalikan respons XML.
* Kami sangat merekomendasikan menggunakan[Login Program Xml](#generatedatasetsxml)untuk membuat draft kasar daridatasets.xmlchunk dataset ini. Anda kemudian dapat mengedit bahwa untuk tune halus itu. Meme it Tidak mudah menghasilkan XML dataset untukSOSdataset dengan tangan. Untuk menemukan informasi yang diperlukan, Anda harus mengunjungisourceUrlSitemap SitemapSOSLoginGetCapabilities" di browser; melihat XML; membuat permintaan GetObservasi dengan tangan; dan melihat respon XML ke permintaan.
* Dengan penambahan sesekali dari jenis baruSOSserver dan perubahan pada server lama, semakin sulit untukERDDAP™untuk secara otomatis mendeteksi jenis server dari respons server. Penggunaan&lt;Login (IOOS\\_NDBC, IOOS\\_NOS,OOSTethysSitemap) sekarang STRONGLY RECOMMENDED. Jika Anda memiliki masalah dengan set data dari jenis ini, cobalah GenerateDataset yang berjalan kembali Xml untukSOSLogin Login Login Xml akan membiarkan Anda mencoba yang berbeda&lt;sosServerType&gt; pilihan sampai Anda menemukan yang tepat untuk server yang diberikan.
*   SOSSitemap
    * Login (Sensor Web) LoginSOS  (Layanan Observasi Sensor) Sitemap[Standar OpenGIS®](https://www.ogc.org/standards)Sitemap Situs web ini memiliki dokumen standar.
    * LoginOGCLayanan Web Spesifikasi Umum ver 1.1.0 (OGC06-121r3) mencakup konstruksi pertanyaan GET dan POST (melihat bagian 7.2.3 dan bagian 9) Sitemap
    * Jika Anda mengirim permintaan getCapabilitas xml keSOSLogin (sourceUrlSitemapSOSLoginGetCapabilitiesSitemap) Anda mendapatkan hasil xml dengan daftar stasiun dan diamati Properti yang memiliki data.
    * AmatiProperty adalah referensi URI resmi untuk properti. Sebagai contoh, urn:ogc:phenomenon: longitude:wgs84 atau https://mmisw.org/ont/cf/parameter/sea\\_water\\_temperature
 
    * AmatiProperty bukan variabel.
    * Lebih dari satu variabel mungkin memiliki diamati yang sama Login (misalnya, dalam Temp dan luar Temp mungkin keduanya telah diamati Login https://mmisw.org/ont/cf/parameter/air\\_temperature ) Sitemap
    * Jika Anda mengirim permintaan getObservation xml keSOSserver, Anda mendapatkan hasil xml dengan deskripsi nama lapangan dalam respon, unit lapangan, dan data. Nama lapangan akan mencakup longitude, latitude, kedalaman (Sitemap) Sitemap
    * SitemapdataVariableuntuk EDDTableDariSOSharus menyertakan atribut "observedProperty", yang mengidentifikasi amatiProperty yang harus diminta dari server untuk mendapatkan variabel itu. Sering, beberapadataVariables akan mencantumkan amatian komposit yang sama.
    * DataType untuk setiapdataVariablemungkin tidak ditentukan oleh server. Meme it Jika demikian, Anda harus melihat respon data XML dari server dan menetapkan sesuai [&lt;Login (Login) SitemapERDDAP™LogindataVariableSitemap
    *    (Pada saat menulis ini) SitemapSOSserver menanggapi permintaan mendapatkanObservasi untuk lebih dari satu diamati Kekayaan dengan hanya mengembalikan hasil untuk yang pertama dari amatiProperties. (Tidak ada pesan kesalahan&#33;) Lihat permintaan parameter konstruktor Sitemap
* LoginSOSsecara otomatis menambahkan
  >  <att name="[subsetVariables](#subsetvariables)">station\\_id, longitude, latitude</att>  
untuk atribut global dataset ketika dataset dibuat.
*   SOSserver biasanya ekspres[Login](#units)Login[Login](https://unitsofmeasure.org/ucum.html)sistem. SitemapERDDAP™unit ekspres server dengan[UDUNITS](https://www.unidata.ucar.edu/software/udunits/)sistem. Jika Anda perlu mengonversi antara dua sistem, Anda dapat menggunakan[ERDDAPLayanan web 's untuk mengonversi unit UCUM ke / dariUDUNITS](https://coastwatch.pfeg.noaa.gov/erddap/convert/units.html)Sitemap
#### LoginSOSLogin{#eddtablefromsos-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableFromSOS" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceUrl>](#sourceurl)...&lt;/sourceUrl>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;sosServerType>...&lt;/sosServerType> &lt;!-- 0 or 1, but STRONGLY  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RECOMMENDED. This lets you specify the type of SOS server  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(so ERDDAP™ doesn't have to figure it out).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Valid values are: IOOS\\_NDBC, IOOS\\_NOS, OOSTethys, and WHOI. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;responseFormat>...&lt;/responseFormat> &lt;!-- 0 or 1. Use this only if  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;you need to override the default responseFormat for the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;specified sosServerType.  -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;stationIdSourceName>...&lt;/stationIdSourceName> &lt;!-- 0 or 1.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Default="station\\_id". -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;longitudeSourceName>...&lt;/longitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;latitudeSourceName>...&lt;/latitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceName>...&lt;/altitudeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMinimum>...&lt;/altitudeSourceMinimum> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;altitudeSourceMaximum>...&lt;/altitudeSourceMaximum> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;altitudeMetersPerSourceUnit>](#altitudemeterspersourceunit)...&lt;/altitudeMetersPerSourceUnit>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceName>...&lt;/timeSourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;timeSourceFormat>...&lt;/timeSourceFormat>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- timeSourceFormat MUST be either  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* For numeric data: a [UDUnits](https://www.unidata.ucar.edu/software/udunits/)\\-compatible string (with the format  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"*units* since *baseTime*") describing how to interpret  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;source time values (for example,  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"seconds since 1970-01-01T00:00:00Z"), where the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;base time is an ISO 8601:2004(E) formatted date time  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;string (yyyy-MM-dd'T'HH:mm:ssZ).  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* For String date time data: specify  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[units suitable for string times](#string-time-units)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;describing how to interpret string times  (for example, the  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ISO8601TZ\\_FORMAT "yyyy-MM-dd'T'HH:mm:ssZ"). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;observationOfferingIdRegex>...&lt;/observationOfferingIdRegex>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- Only observationOfferings with IDs (usually the station names)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;which match this [regular expression](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html) ([tutorial](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)) will be included  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;in the dataset (".+" will catch all station names). -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;requestObservedPropertiesSeparately>true|false(default)  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/requestObservedPropertiesSeparately>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;sourceNeedsExpandedFP\\_EQ>](#sourceneedsexpandedfp_eq)true(default)|false&lt;/sourceNeedsExpandedFP\\_EQ>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addAttributes>](#global-attributes)...&lt;/addAttributes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataVariable>](#datavariable)...&lt;/dataVariable> &lt;!-- 1 or more.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* Each dataVariable MUST include the [dataType](#datatype) tag.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* Each dataVariable MUST include the observedProperty attribute.  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\* For IOOS SOS servers, \\*every\\* variable returned in the text/csv  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;response MUST be included in this ERDDAP™ dataset definition. -->  
>&nbsp;&nbsp;&lt;/dataset>  

### Sitemap{#eddtablefromthreddsfiles} 
[ **Sitemap** ](#eddtablefromthreddsfiles)  (Login) file data agregat dengan beberapa variabel, masing-masing dengan satu atau lebih dimensi bersama (misalnya, waktu, ketinggian (atau kedalaman) , lintang, longitude) dan dilayani oleh a[LoginOPeNDAPLogin](https://www.unidata.ucar.edu/software/tds/)Sitemap

* Jenis dataset ini adalah **Login** Sitemap Solusi baru dan lebih umum adalah untuk menggunakan[Login DariUrl pilihan untuk EDDTable Login](#cachefromurl)  (atau varian) , yang membuat salinan lokal dari file jarak jauh dan melayani data dari file lokal. Login&lt;cacheFromUrl&gt; pilihan dapat digunakan dengan jenis file data tabel dari sumber berbasis web yang menerbitkan daftar file seperti direktori. **   
Jika Anda tidak dapat membuat pekerjaan untuk beberapa alasan, email Chris. John di noaaa.gov .
Jika tidak ada keluhan sebelum 2020, jenis dataset ini dapat dihapus. ** 
* Kami sangat merekomendasikan menggunakan[Login Program Xml](#generatedatasetsxml)untuk membuat draft kasar daridatasets.xmlchunk dataset ini. Anda kemudian dapat mengedit bahwa untuk tune halus itu. Meme it
* Dalam kebanyakan kasus, setiap file memiliki beberapa nilai untuk paling kiri (Login) dimensi, misalnya, waktu.
* File yang sering (tetapi tidak perlu Meme it) memiliki nilai tunggal untuk dimensi lain (misalnya, ketinggian (atau kedalaman) , lintang, longitude) Sitemap
* File mungkin memiliki variabel karakter dengan dimensi tambahan (misalnya, nCharacters) Sitemap
* Server THREDDS dapat diidentifikasi oleh "/thredds/" di URL. Sitemap
```
    https://www.ncei.noaa.gov/thredds/catalog/uv/6h\\_strs\\_agg/catalog.html
```
* Server THREDDS memiliki katalog di berbagai tempat. REQUIRES kelas ini yang URL termasuk "/thredds/catalog/". Anda biasanya dapat menemukan variabel ini dengan memulai browser di katalog akar, dan kemudian mengklik ke subkatalog yang diinginkan.
* Kelas ini membaca file katalog.xml yang disajikan oleh THREDDS dengan daftar&lt;Katalog (referensi ke katalog tambahan.xml sub-file) Login&lt;Login (file data) Sitemap
* Login&lt;fileDir&gt; pengaturan diabaikan. Karena unduhan kelas ini dan membuat salinan lokal dari setiap file data jarak jauh,ERDDAP™memaksa file Sitemap *Login* Login *datasetID* Sitemap
* Sitemap&lt;sourceUrl&gt;, gunakan URL file katalog.xml untuk dataset di server THREDDS, misalnya: untuk URL ini yang dapat digunakan di browser web,
     https://data.nodc.noaa.gov/thredds/catalog/nmsp/wcos/catalog.html  \\[2020-10-21 Server ini tidak lagi tersedia.\\]Login
Sitemap&lt;sourceUrlSitemap https://data.nodc.noaa.gov/thredds/catalog/nmsp/wcos/catalog.xml &lt;SitemapsourceUrlSitemap
     (tetapi letakkan di satu baris) Sitemap
* Karena kelas ini selalu mengunduh dan membuat salinan lokal dari setiap file data jarak jauh, Anda tidak boleh membungkus dataset ini di[Login](#eddtablecopy)Sitemap
* Jenis dataset ini mendukung OPTIONAL, jarang digunakan, tag khusus,&lt;Login *Login* &lt;/khususMode&gt; yang dapat digunakan untuk menentukan aturan khusus yang dikodekan keras harus digunakan untuk menentukan file mana yang harus didownload dari server. Saat ini, satu-satunya valid *Login* SAMOS yang digunakan dengan dataset dari https://tds.coaps.fsu.edu/thredds/catalog/samos untuk mengunduh hanya file dengan nomor versi terakhir.
* Lihat kelas super ini,[Login](#eddtablefromfiles)Informasi tentang bagaimana kelas ini bekerja dan cara menggunakannya.
* Lihat 1D, 2D, 3D, dan 4D contoh untuk[Login](#eddtablefromncfiles)Sitemap
     
### LoginWFSLogin{#eddtablefromwfsfiles} 
[ **LoginWFSLogin** ](#eddtablefromwfsfiles)  (Login) membuat salinan lokal dari semua data dariArcGISLoginWFSserver sehingga data kemudian dapat diakses kembali dengan cepat Meme itERDDAP™pengguna.

* Anda perlu menentukan format khusussourceUrlatribut global untuk memberitahukanERDDAP™cara meminta informasi fitur dari server. Silahkan gunakan contoh ini sebagai template:
```
    <att name="sourceUrl">http://*someUrl/dir1/dir2*/MapServer/WFSServer?request=GetFeature&amp;service=WFS&amp;typename=aasg:BoreholeTemperature&amp;format=&quot;text/xml;%20subType=gml/3.1.1/profiles/gmlsf/1.0.0/0"</att>  
```
     (tetapi letakkan semua di satu baris) 
* Anda perlu menambahkan atribut global khusus untuk memberitahukanERDDAP™bagaimana untuk mengidentifikasi nama dari chunks data yang harus didownload. Ini mungkin akan bekerja untuk semua EDDTableDariWFSFile dataset:
```
    <att name="rowElementXPath">/wfs:FeatureCollection/gml:featureMember</att>
```
* Karena kelas ini selalu mengunduh dan membuat salinan lokal dari setiap file data jarak jauh, Anda tidak boleh membungkus dataset ini di[Login](#eddtablecopy)Sitemap
* Lihat kelas super ini,[Login](#eddtablefromfiles)Untuk informasi tambahan tentang bagaimana kelas ini bekerja dan cara menggunakannya.
     
### Login{#eddtableaggregaterows} 
[ **Login** ](#eddtableaggregaterows)dapat membuat dataset EDDTable dari grup "child" dataset EDDTable.

* Berikut adalah beberapa kegunaan untuk EDDTableAggregateRows:
    * Anda dapat membuat dataset EDDTableAggregateRows dari dua jenis file atau sumber data yang berbeda, misalnya, dataset dengan data hingga akhir bulan terakhir yang disimpan dalam.ncFile CF dan dataset dengan data untuk bulan saat ini disimpan dalam database relasional.
    * Anda dapat membuat dataset EDDTableAggregateRows untuk menangani perubahan dalam file sumber (misalnya, format waktu berubah, atau nama variabel berubah, atau data Loginscale\\_factorSitemapadd\\_offsetLogin) Sitemap Dalam kasus ini, satu anak akan mendapatkan data dari file yang dibuat sebelum perubahan dan anak lain akan mendapatkan data dari file yang dibuat setelah perubahan. Penggunaan EDDTableAggregateRows adalah alternatif untuk menggunakan[Login](#ncml-files)Sitemap[NCO](#netcdf-operators-nco)Sitemap Tidak ada fitur membedakan dalam nama file (sehingga Anda dapat menggunakan&lt;fileNameRegex&gt; untuk menentukan file mana milik dataset anak itu), Anda mungkin perlu menyimpan file untuk dua dataset anak di direktori yang berbeda.
    * Anda dapat membuat dataset EDDTableAggregateRows yang memiliki subset bersama dari variabel satu atau lebih mirip tetapi dataset yang berbeda, misalnya, dataset yang membuat dataset Profil dari kombinasi dataset Profil, dataset TimeSeriesProfile, dan dataset TrajectoryProfile (yang memiliki beberapa variabel yang berbeda dan beberapa variabel dalam kasus umum -- di mana Anda harus membuat varian khusus untuk set data anak, hanya variabel komet) Sitemap
    * Anda dapat memiliki beberapa set data mandiri, masing-masing dengan jenis data yang sama tetapi dari stasiun yang berbeda. Anda dapat meninggalkan dataset utuh, tetapi juga membuat dataset EDDTableAggregateRows yang memiliki data dari semua stasiun - masing-masing dataset anak bisa menjadi sederhana[Login](#eddfromerddap), yang menunjuk ke salah satu set data stasiun yang ada. Jika Anda melakukan ini, berikan setiap data set EDDTableDariErddap berbedadatasetIDdari dataset berdiri sendiri asli, misalnya, dengan appending "Child" ke aslinyadatasetIDSitemap
* Setiap anak&lt;dataset&gt; ditentukan harus dataset lengkap, seolah-olah dataset berdiri sendiri. Setiap harus memiliki sama[dataVariableLogin](#datavariable), dalam urutan yang sama, dengan yang sama[destinationNameLogin](#destinationname)Login[Sitemap Login](#datatype)Login[missing\\_valueLogin](#missing_value)Login[Login](#missing_value)Sitemap[Login](#units)Sitemap Metadata untuk setiap variabel untuk dataset EDDTableAggregateRows berasal dari variabel dalam dataset anak pertama, tetapi EDDTableAggregateRows akan memperbarui[actual\\_range](#actual_range)metadata menjadi kisaran sebenarnya untuk semua anak.
* Rekomendasi: Dapatkan setiap set data anak yang bekerja sebagai set data mandiri. Kemudian cobalah untuk membuat dataset EDDTableAggregateRows dengan memotong dan melewatidatasets.xmlchunk untuk setiap ke EDDTableAggregate baru Baris dataset.
* Dataset Default Sort Order -- Urutan set data anak menentukan urutan keseluruhan default dari hasil. Tentu saja, pengguna dapat meminta urutan jenis yang berbeda untuk set hasil yang diberikan dengan mendaftarkan &orderBy (Sitemap *comma-separated daftar variabel* Sitemap) untuk akhir kueri mereka. Meme it
* "sumber"[Sitemap Login](#global-attributes)untuk EDDTableAggregateRows adalah globalAttributes gabungan dari dataset anak pertama. Login Baris dapat memiliki global&lt;addAttributes&gt; memberikan atribut global tambahan atau menimpa atribut global sumber.
#### Login Facebook Twitter Pinterest{#eddtableaggregaterows-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableAggregateRows" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;updateEveryNMillis>](#updateeverynmillis)...&lt;/updateEveryNMillis> &lt;!-- 0 or 1. -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 or more -->  
>&nbsp;&nbsp;&lt;/dataset>  

### Login{#eddtablecopy} 
[ **Login** ](#eddtablecopy)dapat membuat salinan lokal dari banyak jenis dataset EDDTable dan kemudian mengamati kembali data dengan cepat dari salinan lokal.

* Login (dan untuk data grid,[EDDGridLogin](#eddgridcopy)) sangat mudah digunakan dan sangat efektif **solusi untuk beberapa masalah terbesar dengan melayani data dari sumber data jarak jauh:** 
    * Mengakses data dari sumber data jarak jauh bisa lambat.
        * Mereka mungkin lambat karena mereka melekat lambat (misalnya, jenis server yang tidak efisien) Login
        * karena mereka kewalahan oleh terlalu banyak permintaan,
        * atau karena server Anda atau server jarak jauh terbatas.
    * Dataset jarak jauh kadang-kadang tidak tersedia (lagi, untuk berbagai alasan) Sitemap
    * Mengandalkan satu sumber untuk data tidak skala dengan baik (misalnya, ketika banyak pengguna dan banyakERDDAPmemanfaatkannya) Sitemap
         
* Bagaimana Cara Kerja -- EDDTableCopy memecahkan masalah ini dengan secara otomatis membuat dan mempertahankan salinan lokal data dan melayani data dari salinan lokal.ERDDAP™dapat melayani data dari salinan lokal dengan sangat cepat. Dan membuat dan menggunakan salinan lokal menghilangkan beban pada server jarak jauh. Dan salinan lokal adalah cadangan asli, yang berguna dalam hal sesuatu terjadi pada aslinya.
    
Tidak ada yang baru tentang membuat salinan lokal dataset. Apa yang baru di sini adalah bahwa kelas ini membuatnya Meme it\\*Sitemap\\*untuk membuat dan\\*Login\\*salinan lokal data dari\\*Login\\*jenis sumber data jarak jauh dan\\*metadata\\*sementara menyalin data.
    
#### Login&lt;cacheDariUrl & gt;{#eddtablecopy-vs-cachefromurl} 
&lt;cacheDariUrl&gt; adalah alternatif untuk EDDTableCopy. Mereka bekerja berbeda.

* Login Copy bekerja dengan meminta chunks data dari layanan jarak jauh dan menyimpan chunks di file lokal. Dengan demikian, EDDTableCopy berguna dalam beberapa kasus di mana data dapat diakses melalui layanan jarak jauh.
* Sitemap&lt;Login (Login) mengunduh file yang ada yang tercantum di situs web jarak jauh.&lt;cacheDariUrl&gt; lebih mudah digunakan dan lebih andal karena dapat dengan mudah memberitahu ketika ada file data jarak jauh baru atau ketika file data jarak jauh telah berubah dan dengan demikian perlu didownload.

Jika ada situasi di mana EDDTableCopy atau&lt;cacheFromUrl&gt; bisa digunakan, gunakan&lt;cacheDariUrl&gt; karena lebih mudah dan lebih dapat diandalkan.
     
#### &lt;Sitemap Nama & gt;{#extractdestinationnames} 
Login Copy membuat salinan lokal data dengan meminta chunks data dari dataset jarak jauh. Login Copy menentukan yang chunks permintaan dengan meminta &distinct () nilai untuk&lt;ekstrakDestinationNames&gt; (ditentukan dalamdatasets.xmlSitemap) , yang merupakan nama tujuan terpisah dari variabel dalam dataset jarak jauh. Sitemap
```
    <extractDestinationNames>drifter profile</extractDestinationNames>  
```
mungkin menghasilkan kombinasi nilai yang berbeda dari drifter=tig17,profile=1017, drifter=tig17,profile=1095, ... drifter=une12,profile=1223, drifter=une12,profile=1251, ....

Dalam situasi di mana satu kolom (misalnya, profil) mungkin semua yang diperlukan untuk mengidentifikasi kelompok baris data secara unik, jika ada sejumlah besar, misalnya, profil, mungkin berguna untuk juga menentukan ekstrak tambahan Login Login (misalnya, drifter) yang berfungsi untuk membagi profil. Itu mengarah ke beberapa file data dalam direktori tertentu, yang dapat menyebabkan akses lebih cepat.
    
#### Database{#local-files} 
Setiap chunk data disimpan dalam terpisahNetCDFfile dalam subdirectory *Login* Login *datasetID* Sitemap (sebagaimana ditentukan[WordPress.org](/docs/server-admin/deploy-install#setupxml)) Sitemap Ada satu tingkat subdirectory untuk semua tetapi ekstrakDestinationName terakhir. Misalnya, data untuk tig17+1017, akan disimpan dalam
     *Login* /copy/sampleDataset/tig17/1017.ncSitemap
Misalnya, data untuk une12+1251, akan disimpan dalam
     *Login* /copy/sampleDataset/une12/1251.ncSitemap
Direktori dan nama file yang dibuat dari nilai data dimodifikasi untuk membuat mereka file-name-safe (misalnya, ruang diganti oleh "x20") - ini tidak mempengaruhi data yang sebenarnya. Meme it
     
#### Data Baru{#new-data} 
Setiap kali EDDTable Copy reloaded, itu memeriksa dataset jarak jauh untuk melihat chunks yang berbeda tersedia. Jika file untuk chunk data tidak ada, permintaan untuk mendapatkan chunk ditambahkan ke antrian.ERDDAP's taskThread memproses semua permintaan terqueued untuk chunks data, satu-by-one. Anda dapat melihat statistik untuk aktivitas taskThread pada[Login](/docs/server-admin/additional-information#status-page)dan di[Laporan harian](/docs/server-admin/additional-information#daily-report)Sitemap (LoginERDDAP™dapat menetapkan beberapa tugas untuk proses ini, tetapi itu akan menggunakan banyak bandwidth sumber data jarak jauh, memori, dan waktu CPU, dan banyak lokalERDDAPbandwidth, memori, dan waktu CPU, tidak ada ide yang baik.) 
    
CATATAN: Pertama kali EDDTableCopy dimuat, (jika semua berjalan dengan baik) banyak permintaan untuk chunks data akan ditambahkan ke queue taskThread, tetapi tidak ada file data lokal yang akan dibuat. Jadi konstror akan gagal tetapi taskThread akan terus bekerja dan membuat file lokal. Jika semua berjalan dengan baik, taskThread akan membuat beberapa file data lokal dan upaya berikutnya untuk memuat ulang dataset (di ~ 15 menit) akan berhasil, tetapi awalnya dengan sejumlah data yang sangat terbatas.
    
CATATAN: Setelah dataset lokal memiliki beberapa data dan muncul di data AndaERDDAPJika dataset jarak jauh sementara atau tidak dapat diakses secara permanen, dataset lokal masih akan bekerja.
    
PERINGATAN: Jika dataset jarak jauh besar dan / atau server jarak jauh lambat lambat (itu masalah, bukan?&#33; Meme it) akan memakan waktu lama untuk membuat salinan lokal yang lengkap. Dalam beberapa kasus, waktu yang diperlukan akan diterima. Contohnya, mentransmisikan 1 TB data melalui jalur T1 (0.15 g) setidaknya 60 hari, dalam kondisi optimal. Plus, menggunakan banyak bandwidth, memori, dan waktu CPU pada komputer jarak jauh dan lokal. Solusinya adalah mengirim hard drive ke administrator dari set data jarak jauh sehingga dapat membuat salinan dataset dan mengirimkan hard drive kembali ke Anda. Gunakan data sebagai titik awal dan EDDTableCopy akan menambahkan data ke dalamnya. (Itu adalah bagaimana layanan awan EC2 Amazon yang digunakan untuk menangani masalah, meskipun sistem mereka memiliki banyak bandwidth.) 
    
PERINGATAN: Jika kombinasi nilai yang diberikan hilang dari dataset jarak jauh, EDDTableCopy TIDAK menghapus file yang disalin lokal. Jika Anda ingin, Anda dapat menghapusnya sendiri.
    
#### Login&lt;Login{#tablecopy-checksourcedata} 
Logindatasets.xmluntuk dataset ini dapat memiliki tag opsional
```
    <checkSourceData>true</checkSourceData>  
```
Nilai default benar. Jika/ketika Anda mengaturnya ke salah, dataset tidak akan pernah memeriksa dataset sumber untuk melihat apakah ada data tambahan yang tersedia.
     
#### Penggunaan yang disarankan{#recommended-use} 
1. Login&lt;Login Login (jenis asli, tidak EDDTableCopy) untuk sumber data jarak jauh. **Mendapatkan bekerja dengan benar, termasuk semua metadata yang diinginkan.** 
2. Jika terlalu lambat, tambahkan kode XML untuk membungkusnya dalam dataset EDDTableCopy.
    * Gunakan yang berbedadatasetID  (mungkin dengan mengubahdatasetIDlamadatasetIDLogin) Sitemap
    * Fotokopi&lt;Sitemap Sitemap&lt;reloadEveryNMinutes&gt; dan&lt;onChange&gt; dari XML EDDTable jarak jauh ke XML EDDTableCopy. (Nilai-nilai mereka untuk masalah EDDTableCopy; nilai-nilai mereka untuk dataset batin menjadi tidak relevan.) 
    * Login&lt;ekstrakDestinationNames&gt; tag (lihat di atas) Sitemap
    *   &lt;orderExtractBy&gt; adalah daftar nama variabel tujuan yang dipisahkan dalam dataset jarak jauh. Ketika setiap chunk data diunduh dari server jarak jauh, chunk akan diurutkan oleh variabel ini (oleh variabel pertama, kemudian oleh variabel kedua jika variabel pertama diikat, ...) Sitemap Dalam beberapa kasus,ERDDAP™akan dapat mengekstrak data lebih cepat dari file data lokal jika variabel pertama dalam daftar adalah variabel numerik ("time"dihitung sebagai variabel numerik) Sitemap Tapi pilih variabel ini dengan cara yang sesuai untuk dataset.
3.  ERDDAP™akan membuat dan memelihara salinan lokal data.
         
* PERINGATAN: EDDTableCopy mengasumsikan bahwa nilai data untuk setiap chunk tidak pernah berubah. Jika / ketika mereka melakukan, Anda perlu menghapus file chunk secara manual *Login* Login *datasetID* / yang berubah dan[Login](/docs/server-admin/additional-information#flag)dataset untuk diisi ulang sehingga potongan yang dihapus akan diganti. Jika Anda memiliki berlangganan email ke dataset, Anda akan mendapatkan dua email: satu ketika dataset reload pertama dan mulai menyalin data, dan lain ketika dataset memuat lagi (Sitemap) dan mendeteksi file data lokal baru.
     
* Ubah Metadata Login Jika Anda perlu mengubahaddAttributesatau mengubah urutan variabel yang terkait dengan dataset sumber:
    1. LoginaddAttributesuntuk dataset sumber dalamdatasets.xml, sesuai kebutuhan.
    2. Hapus salah satu file yang disalin.
    3. Sitemap[Login](/docs/server-admin/additional-information#flag)untuk memuat ulang dataset segera. Jika Anda menggunakan bendera dan Anda memiliki berlangganan email ke dataset, Anda akan mendapatkan dua email: satu ketika dataset beban pertama dan mulai menyalin data, dan lain ketika dataset dimuat lagi (Sitemap) dan mendeteksi file data lokal baru.
    4. File yang dihapus akan diregenerasi dengan metadata baru. Jika dataset sumber tidak tersedia, dataset EDDTableCopy akan mendapatkan metadata dari file regenerasi, karena itu adalah file yang paling muda.
         
*   [EDDGridLogin](#eddgridcopy)sangat mirip dengan EDDTableCopy, tetapi bekerja dengan dataset gridded.
#### Facebook Twitter Google Plus Pinterest Email{#eddtablecopy-skeleton-xml} 
>&nbsp;&nbsp;&lt;dataset type="EDDTableCopy" [datasetID](#datasetid)\\="..." [active](#active)\\="..." >  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleTo>](#accessibleto)...&lt;/accessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;graphsAccessibleTo>](#graphsaccessibleto)auto|public&lt;/graphsAccessibleTo> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;accessibleViaFiles>](#accessibleviafiles)true|false(default)&lt;/accessibleViaFiles>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;reloadEveryNMinutes>](#reloadeverynminutes)...&lt;/reloadEveryNMinutes> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultDataQuery>](#defaultdataquery)...&lt;/defaultDataQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;defaultGraphQuery>](#defaultgraphquery)...&lt;/defaultGraphQuery> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;addVariablesWhere>](#addvariableswhere)...&lt;/addVariablesWhere> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fgdcFile>](#fgdcfile)...&lt;/fgdcFile> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;iso19115File>](#iso19115file)...&lt;/iso19115File> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;onChange>](#onchange)...&lt;/onChange> &lt;!-- 0 or more -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;extractDestinationNames>...&lt;/extractDestinationNames>  &lt;!-- 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;orderExtractBy>...&lt;/orderExtractBy> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;fileTableInMemory>](#filetableinmemory)...&lt;/fileTableInMemory> &lt;!-- 0 or 1 (true or false  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(the default)) -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;checkSourceData>](#tablecopy-checksourcedata)...&lt;/checkSourceData> &lt;!-- 0 or 1 -->  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;dataset>...&lt;/dataset> &lt;!-- 1 -->  
>&nbsp;&nbsp;&lt;/dataset>  

- Sitemap

## Sitemap{#details-1} 

Berikut ini adalah deskripsi rinci tentang tag dan atribut umum.

### &lt;Sitemap{#angulardegreeunits} 
* Sitemap ** &lt;Sitemap ** Sitemap (Login) adalah tag OPTIONAL yang jarang digunakan dalam&lt;Login Logindatasets.xmlyang berisi daftar yang dipisahkan dari unit string yang Meme itERDDAP™harus memperlakukan sebagai unit derajat sudut. Jika variabel memiliki salah satu unit ini,tabledapSitemaporderByMeanfilter akan menghitung maksud dengan cara khusus, kemudian melaporkan maksud sebagai nilai dari -180 hingga 180. SitemapERDDAP's EDStatic.java file kode sumber untuk daftar default saat ini. Setiap perubahan nilai tag ini akan berpengaruh pada waktu berikutnyaERDDAP™Logindatasets.xmltermasuk dalam menanggapi dataset[Login](/docs/server-admin/additional-information#flag)Sitemap
### &lt;Sitemap{#angulardegreetrueunits} 
* Sitemap ** &lt;Login Sitemap ** Sitemap (Sitemap) adalah tag OPTIONAL yang jarang digunakan dalam&lt;Login Logindatasets.xmlyang berisi daftar yang dipisahkan dari unit string yang Meme itERDDAP™harus memperlakukan sebagai unit sejati derajat sudut. Jika variabel memiliki salah satu unit ini,tabledapSitemaporderByMeanfilter akan menghitung maksud dengan cara khusus, kemudian melaporkan maksud sebagai nilai dari 0 hingga 360. SitemapERDDAP's EDStatic.java file sumber untuk daftar default saat ini. Setiap perubahan nilai tag ini akan berpengaruh pada waktu berikutnyaERDDAP™Logindatasets.xmltermasuk dalam menanggapi dataset[Login](/docs/server-admin/additional-information#flag)Sitemap
     
### &lt;Nama-nama Standar & gt;{#commonstandardnames} 
* Sitemap ** &lt;Sitemap ** Sitemap (Sitemap) adalah tag OPTIONAL yang jarang digunakan dalam&lt;Login Logindatasets.xmluntuk menentukan daftar terpisahkan koma umum[Nama standar CF](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html)Sitemap Login
```
    <commonStandardNames>air\\_pressure, ..., wind\\_to\\_direction</commonStandardNames>  
```
Daftar ini digunakan dalam DataProviderForm3.html sebagai kenyamanan bagi pengguna.
Jika Anda ingin memberikan informasi inidatasets.xmlMulai dengan menyalin daftar default saat ini dalam&lt;DEFAULT\\_commonStandardName&gt; SitemapERDDAPSitemap
\\[Login\\]/webapps/erddap/WEB-INF/classes/gov/noa/pfel/erddap/util/messages.xml file.
     
### &lt;cacheMinutes&gt;{#cacheminutes} 
* Sitemap ** &lt;Login ** Sitemap (Login) adalah tag OPTIONAL yang jarang digunakan dalam&lt;Login Logindatasets.xmluntuk menentukan usia (dalam beberapa menit) di mana file di cache harus dihapus (default=60) Sitemap Login
```
    <cacheMinutes>60</cacheMinutes>  
```
Secara umum, hanya file gambar (karena gambar yang sama sering diminta berulang) Login.ncLogin (karena mereka harus sepenuhnya diciptakan sebelum mengirim ke pengguna) Sitemap Meskipun mungkin tampak seperti permintaan yang diberikan harus selalu mengembalikan respon yang sama, itu tidak benar. Misalnya, contohtabledappermintaan yang mencakup waktu&gt; *Sitemap Sitemap* akan berubah ketika data baru tiba untuk dataset. Dan permintaan griddap yang mencakup\\[Sitemap\\]untuk dimensi waktu akan berubah ketika data baru tiba untuk dataset. Setiap perubahan nilai tag ini akan berpengaruh pada waktu berikutnyaERDDAP™Logindatasets.xmltermasuk dalam menanggapi dataset[Login](/docs/server-admin/additional-information#flag)Sitemap SitemapERDDAP™v2.00, ini ditentukan dalam setup.xml, yang masih diperbolehkan tetapi tidak teratur.

### &lt;cacheClearMinutes&gt;{#cacheclearminutes} 
* Sitemap ** &lt;Login ** Sitemap (Login) adalah tag OPTIONAL yang jarang digunakan dalam&lt;Login Logindatasets.xmluntuk menentukan frekuensi untuk memeriksa file cache dan menghapus yang lama (dalam beberapa menit)   (default=15) Sitemap Login
```
    <cacheClearMinutes>15</cacheClearMinutes>  
```
Ketika server selesai menangani permintaan itu akan memeriksa berapa lama yang lalu cache terakhir jelas. Jika terlalu lama, itu akan memanjang tugas di TaskThread untuk membersihkan cache. Setiap perubahan nilai tag ini akan berpengaruh pada waktu berikutnyaERDDAP™Logindatasets.xmltermasuk dalam menanggapi dataset[Login](/docs/server-admin/additional-information#flag)Sitemap Ini dapat ditentukan dalam setup.xml, tetapi itu tidak teratur.
     
### &lt;convertInterpolateRequestCSVExample&gt;{#convertinterpolaterequestcsvexample} 
* Sitemap ** &lt;Login ** Sitemap (#convertinterpolaterequestcsvexample) adalah tag OPTIONAL dalam sebuah&lt;Login Logindatasets.xml \\[SitemapERDDAP™di.10\\]yang berisi contoh yang akan ditampilkan di halaman web Interpolate converter. Nilai default adalah: jplMURSSFacebook Twitter Google Plus Pinterest Emailsst/Bilinear/4 .
### &lt;convertInterpolateDatasetIDVariableList&gt;{#convertinterpolatedatasetidvariablelist} 
* Sitemap ** &lt;KonversiInterpolateDatasetIDVariableList&gt; ** Sitemap (Sitemap) adalah tag OPTIONAL dalam sebuah&lt;Login Logindatasets.xml \\[SitemapERDDAP™di.10\\]yang berisi daftar CSVdatasetIDSitemap Nama contoh yang akan digunakan sebagai saran oleh halaman web Interpolate converter. Nilai default adalah: jplMURSSFacebook Twitter Google Plus Pinterest EmailsstSitemap
### &lt;convertToPublicSourceUrl&gt;{#converttopublicsourceurl} 
* Sitemap ** &lt;Login ** Sitemap (Login) adalah tag OPTIONAL dalam sebuah&lt;Login Logindatasets.xmlyang berisi atribut "dari" dan atribut "to" yang menentukan bagaimana mengkonversi pencocokan lokalsourceUrl  (biasanya nomor IP) ke publiksourceUrl  (nama domain) . "dari" harus memiliki bentuk "\\[Sitemap\\]Sitemap\\[Sitemap\\]Sitemap Ada 0 atau lebih dari tag ini. Untuk informasi selengkapnya lihat [&lt;sourceUrlSitemap (Login) Sitemap Sitemap
```
    <convertToPublicSourceUrl from="https://192.168.31.18/" to="https://oceanwatch.pfeg.noaa.gov/" />  
```
akan menyebabkan pencocokan lokalsourceUrl  (Sitemap https://192.168.31.18/thredds/dodsC/satellite/BA/ssta/5day )   
ke publiksourceUrl  ( https://oceanwatch.pfeg.noaa.gov/thredds/dodsC/satellite/BA/ssta/5day ) Sitemap
Setiap perubahan nilai tag ini akan berpengaruh pada waktu berikutnyaERDDAP™Logindatasets.xmltermasuk dalam menanggapi dataset[Login](/docs/server-admin/additional-information#flag)Sitemap

Tapi, untuk alasan keamanan dan alasan terkait dengan sistem berlangganan, **TAG INI&#33;**   
Sebaliknya, selalu menggunakan nama domain publik di Meme it&lt;sourceUrl&gt; Tag dan gunakan[/etc/hosts tabel](https://linux.die.net/man/5/hosts)pada server Anda untuk mengonversikan nama domain lokal ke nomor IP tanpa menggunakan server DNS. Anda dapat menguji apakah nama domain benar diubah menjadi nomor IP dengan menggunakan:
Login *beberapa.domain.name*   
     
### data:image/png;base64,{#dataimagepngbase64} 
* Ketika pengguna meminta.htmlTableSitemapERDDAP™Jika data dalam sel String mengandung data: gambar/png; base64, diikuti oleh gambar .png base64,ERDDAP™akan menampilkan ikon (sehingga pengguna dapat melihat gambar jika mereka menggigit Meme it) dan tombol untuk menyimpan teks atau gambar ke clipboard. Fitur ini ditambahkanERDDAP™v2.19 oleh Marco Alba.
### drawLandMask {#drawlandmask} 
*   [ **drawLandMask** ](#drawlandmask)menentukan pengaturan default yang mengontrol ketika dan bagaimana masker tanah harus ditarik ketikaERDDAP™menarik peta. Ini dapat ditentukan dalam tiga tempat yang berbeda di Meme itdatasets.xml  (terdaftar dari prioritas terendah hingga tertinggi) Sitemap
    
    1. SitemapdrawLandMaskditentukan dalam&lt;Login (tidak terhubung dengan dataset tertentu) , kemudian menentukan nilai default daridrawLandMaskuntuk semua variabel dalam semua dataset. Sitemap
    ```
        <drawLandMask>under</drawLandMask>  
    ```
Setiap perubahan nilai tag ini akan berpengaruh pada waktu berikutnyaERDDAPLogindatasets.xmlSitemap
Jika tag ini tidak hadir, nilai default yang mendasarinya berada di bawah.
         
    2. SitemapdrawLandMaskditentukan sebagai atribut global dari dataset yang diberikan, maka menentukan nilai default daridrawLandMaskuntuk semua variabel dalam dataset, menahan pengaturan prioritas yang lebih rendah. Sitemap
    ```
        <att name="drawLandMask">under</att>  
    ```
Setiap perubahan nilai tag ini akan berpengaruh pada waktu berikutnyaERDDAP™isi ulang dataset.
         
    3. SitemapdrawLandMaskditentukan sebagai atribut variabel dalam dataset tertentu, kemudian menentukan nilai default daridrawLandMaskuntuk variabel itu dalam dataset, menahan pengaturan prioritas yang lebih rendah. Sitemap
    ```
        <att name="drawLandMask">under</att>  
    ```
Setiap perubahan nilai tag ini akan berpengaruh pada waktu berikutnyaERDDAP™isi ulang dataset.
    
Pengguna dapat menimpa default (di mana pun ditentukan) dengan memilih nilai untuk "Draw tanah masker" dari daftar dropdown pada dataset Membuat halaman web Graph, atau dengan termasuk &.land= *Login* di URL yang meminta peta dariERDDAPSitemap
    
Dalam semua situasi, ada 4 nilai yang mungkin untuk atribut:
    
    * "di bawah" menggambar masker tanah sebelum menarik data di peta.
Untuk dataset gridded, tanah muncul sebagai warna abu-abu terang konstan.
Untuk dataset tabular, "di bawah" menunjukkan data topografi di atas tanah dan laut.
    * Login Untuk dataset gridded, "lebih" menarik masker tanah setelah menarik data pada peta sehingga akan menutupi data di atas tanah. Untuk dataset tabular, "lebih" menunjukkan pemandian laut dan abu-abu terang konstan di mana ada tanah, keduanya ditarik di bawah data.
    * "outline" hanya menarik garis besar labu tanah, batas politik, danau dan sungai.
    * "off" tidak menarik apa pun.
### &lt;emailDiagnosticsToErdData&gt;{#emaildiagnosticstoerddata} 
* Sitemap ** &lt;emailDiagnosticsToErdData&gt; ** Sitemap (#emaildiagnostoerddata) adalah tag OPTIONAL yang jarang digunakan dalam&lt;Login Logindatasets.xmlSitemap Nilai tag dapat benar (Login) atau palsu. Jika benar,ERDDAP™akan mengirimkan email ke Chris. John di noaaa. Login (LoginERDDAP™tim pengembangan) Sitemap Ini harus aman dan aman karena tidak ada informasi rahasia (Sitemap) disertakan dalam email. Ini harus memungkinkan untuk menangkap bug yang tidak jelas, benar-benar tak terduga yang menyebabkan NullPointerExceptions. Jika tidak, pengguna melihat pengecualian, tetapiERDDAP™tim pengembangan tidak (jadi kita tidak tahu ada masalah yang perlu diperbaiki Meme it) Sitemap
     
### &lt;grafikBackgroundColor & gt;{#graphbackgroundcolor} 
* Sitemap ** &lt;Login ** Sitemap (Login) adalah tag OPTIONAL yang jarang digunakan dalam&lt;Login Logindatasets.xmluntuk menentukan warna latar belakang default pada grafik. Ini mempengaruhi hampir semua grafik. Ada beberapa situasi yang tidak terpengaruh. Warna ditentukan sebagai nilai heksadecimal 8 digit dalam bentuk 0xAARRGGBB, di mana AA, RR, GG, dan BB adalah opacity, komponen merah, hijau dan biru, masing-masing. "0x" adalah kasus sensitif, tetapi digit heksadecimal tidak sensitif. Misalnya, buram penuh (Login) warna hijau dengan merah=22, hijau=88, biru=ee akan 0xff2288ee. Opaque putih adalah 0xffffffffff. default adalah biru cahaya buram (Sitemap) , yang memiliki keunggulan berbeda dari putih, yang merupakan warna penting dalam banyak palet yang digunakan untuk menggambar data. Sitemap
    ```
    <graphBackgroundColor>0xffffffff</graphBackgroundColor>  
    ```
Setiap perubahan nilai tag ini akan berpengaruh pada waktu berikutnyaERDDAP™Logindatasets.xmltermasuk dalam menanggapi dataset[Login](/docs/server-admin/additional-information#flag)Sitemap
### &lt;IPAddressMaxRequests&gt;{#ipaddressmaxrequests} 
* Sitemap ** &lt;Login ** Sitemap (Login) adalah tag opsional yang jarang digunakan (pertama didukung denganERDDAP™v2.11) Sitemap&lt;Login Logindatasets.xmlyang merupakan bagian dari sistem untuk membatasi kemampuan pengguna yang sah yang terlalu agresif dan pengguna jahat untuk membuat sejumlah besar permintaan simultan yang akan menurunkan kinerja sistem untuk pengguna lain. Login MaxRequests menentukan jumlah maksimum permintaan simultan yang akan diterima dari alamat IP tertentu. Permintaan tambahan akan menerima kesalahan HTTP 429: Too Banyak Permintaan. File statis kecil di erddap/download/ dan erddap/images/ TIDAK dibebaskan dari jumlah ini. default adalah 15. Maksimum diperbolehkan adalah 1000, yang gila tinggi - tidak melakukannya&#33;ERDDAP™tidak akan menerima jumlah kurang dari 6 karena banyak pengguna yang sah (Web browserWMSLogin) membuat hingga 6 permintaan pada waktu. LoginERDDAP™Laporan Harian dan informasi serupa yang ditulis ke file log.txt dengan setiap Reload Dataset Utama, sekarang akan mencakup tally dari permintaan dengan alamat IP ini di bawah judul "Pertanyaan IP Alamat (Too Banyak Permintaan) Sitemap
Setiap perubahan nilai tag ini akan berpengaruh pada waktu berikutnyaERDDAP™Logindatasets.xmltermasuk dalam menanggapi dataset[Login](/docs/server-admin/additional-information#flag)Sitemap
    
Bagian "Major LoadDatasets Time Series" status.html termasuk kolom "tooMany" yang mencantumkan jumlah permintaan yang melebihi pengaturan ipAddressMaxRequests pengguna dan dengan demikian melihat kesalahan "Too Many Requests". Ini memungkinkan Anda dengan mudah melihat ketika ada pengguna yang sah yang terlalu agresif dan pengguna jahat sehingga Anda dapat (Sitemap) melihat file log.txt dan memutuskan apakah Anda ingin daftar hitam pengguna.
    
Tidak ada yang secara khusus salah dengan mengatur ini ke nomor yang lebih tinggi. Itu sampai Anda. Tapi melakukannya memungkinkan / mendorong orang untuk mengatur sistem yang menggunakan sejumlah besar benang untuk bekerja pada proyek dan kemudian memberi mereka tidak ada umpan balik bahwa apa yang mereka lakukan tidak mendapatkan mereka manfaat.
### &lt;Login{#ipaddressmaxrequestsactive} 
* Sitemap ** &lt;Login ** Sitemap (#ipaddressmaxrequestsactive) adalah tag opsional yang jarang digunakan (pertama didukung denganERDDAP™v2.11) Sitemap&lt;Login Logindatasets.xmlyang merupakan bagian dari sistem untuk membatasi kemampuan pengguna yang sah yang terlalu agresif dan pengguna jahat untuk membuat sejumlah besar permintaan simultan yang akan menurunkan kinerja sistem untuk pengguna lain. ipAddressMaxRequestsActive menentukan jumlah maksimum permintaan simultan yang akan aktif diproses dari alamat IP tertentu. Permintaan tambahan akan duduk di antrian sampai permintaan sebelumnya telah diproses. File statis kecil di erddap / download / dan erddap / gambar / ARE dibebaskan dari jumlah ini dan throttling terkait. default adalah 2. Maksimum diperbolehkan adalah 100, yang gila tinggi - tidak melakukannya&#33; Anda dapat mengatur ini menjadi 1 untuk menjadi ketat, terutama jika Anda memiliki masalah dengan pengguna yang terlalu agresif atau jahat. Pengguna akan tetap cepat mendapatkan semua data yang mereka minta (ke ipAddressMaxRequests) tetapi mereka tidak akan dapat mengasah sumber daya sistem. Kami tidak merekomendasikan pengaturan ini ke nomor yang lebih besar karena memungkinkan pengguna sah yang terlalu agresif dan pengguna jahat untuk mendominasiERDDAP's kapasitas pemrosesan.
Setiap perubahan nilai tag ini akan berpengaruh pada waktu berikutnyaERDDAP™Logindatasets.xmltermasuk dalam menanggapi dataset[Login](/docs/server-admin/additional-information#flag)Sitemap
     
### &lt;Login{#ipaddressunlimited} 
* Sitemap ** &lt;Login ** Sitemap (Login) adalah tag opsional yang jarang digunakan (pertama didukung denganERDDAP™v2.11) Sitemap&lt;Login Logindatasets.xmlyang merupakan bagian dari sistem untuk membatasi kemampuan pengguna yang sah yang terlalu agresif dan pengguna jahat untuk membuat sejumlah besar permintaan simultan yang akan menurunkan kinerja sistem untuk pengguna lain. ipAddressUnlimited adalah daftar alamat IP yang Anda inginkan untuk memungkinkan akses tak terbatas pada AndaERDDAPSitemap Lihat log Anda. txt file untuk melihat format mana server Anda digunakan untuk alamat IP. Pada beberapa server, alamat IP akan berada dalam format #.#.#.# (di mana # adalah bilangan bulat dari 0 ke 255) ; sedangkan pada orang lain akan berada dalam format #:#:#:#:#:#:#:#:# Sitemap Permintaan pada daftar ini tidak tunduk pada baik IPAddressMaxRequests atau pengaturan ipAddressMaxRequestsActive. Ini mungkin menjadi sekunderERDDAP™atau untuk pengguna atau server tertentu dalam sistem Anda.ERDDAP™Promo (Login) LoginERDDAP™menggunakan ketika alamat IP requester tidak dapat ditentukan, misalnya, untuk proses lain yang berjalan pada server yang sama.
Setiap perubahan nilai tag ini akan berpengaruh pada waktu berikutnyaERDDAP™Logindatasets.xmltermasuk dalam menanggapi dataset[Login](/docs/server-admin/additional-information#flag)Sitemap
    
Jika untuk beberapa alasan semua permintaan pengguna mendapatkan pesan kesalahan "Waktu menunggu permintaan Anda lain untuk memproses.", maka Anda dapat memecahkan masalah dengan menambahkan alamat IP pengguna ke daftar ipAddressUnlimited, menerapkan perubahan itu, kemudian menghapusnya dari daftar tersebut.
    
### &lt;loadDatasetMinutes&gt;{#loaddatasetsminminutes} 
* Sitemap ** &lt;loadDatasetMinutes&gt; ** Sitemap (Sitemap) adalah tag OPTIONAL yang jarang digunakan dalam&lt;Login Logindatasets.xmluntuk menentukan waktu minimum (dalam beberapa menit) antara beban utama Login (SitemapERDDAP™Sitemapdatasets.xmltermasuk memeriksa setiap dataset untuk melihat apakah perlu diisi ulang sesuai dengan bebannya Pengaturan setiapNMinutes, default=15) Sitemap Login
```
    <loadDatasetsMinMinutes>15</loadDatasetsMinMinutes>  
```
Jika menjalankan loadDataset yang diberikan membutuhkan waktu kurang dari waktu ini, loader baru saja muncul di direktori bendera dan/atau tidur sampai waktu yang tersisa telah berlalu. default adalah 15 menit, yang harus baik untuk hampir semua orang. Satu-satunya kerugian untuk mengatur ini ke nomor yang lebih kecil adalah bahwa itu akan meningkatkan frekuensi yangERDDAP™retries dataset yang memiliki kesalahan yang mencegah mereka dimuat (e.g., server jarak jauh turun) Sitemap Jika ada banyak dataset tersebut dan mereka teruji sering, sumber data mungkin mempertimbangkan perilaku pestering/agresif. Setiap perubahan nilai tag ini akan berpengaruh pada waktu berikutnyaERDDAP™Logindatasets.xmltermasuk dalam menanggapi dataset[Login](/docs/server-admin/additional-information#flag)Sitemap SitemapERDDAP™v2.00, ini ditentukan dalam setup.xml, yang masih diperbolehkan tetapi tidak teratur.
     
### &lt;loadDatasetMaxMinutes&gt;{#loaddatasetsmaxminutes} 
* Sitemap ** &lt;loadDatasetMaxMinutes&gt; ** Sitemap (Sitemap) adalah tag OPTIONAL dalam sebuah&lt;Login Logindatasets.xmluntuk menentukan waktu maksimum (dalam beberapa menit) beban utama Upaya dataset diperbolehkan untuk mengambil (sebelum beban Benang dataset diperlakukan sebagai "dipasang" dan terganggu)   (default=60) Sitemap Login
```
    <loadDatasetsMaxMinutes>60</loadDatasetsMaxMinutes>  
```
Secara umum, ini harus diatur setidaknya dua kali selama Anda berpikir bahwa memuat ulang semua dataset (Login) harus mengambil (karena komputer dan jaringan kadang-kadang lebih lambat daripada yang diharapkan) Ini harus selalu jauh lebih lama daripada loadDatasetMinutes. Standar 60 menit. Beberapa orang akan mengatur ini menjadi lebih lama. Setiap perubahan nilai tag ini akan berpengaruh pada waktu berikutnyaERDDAP™Logindatasets.xmltermasuk dalam menanggapi dataset[Login](/docs/server-admin/additional-information#flag)Sitemap SitemapERDDAP™v2.00, ini ditentukan dalam setup.xml, yang masih diperbolehkan tetapi tidak teratur.
     
### &lt;Login{#loglevel} 
* Sitemap ** &lt;Login ** Sitemap (Login) adalah tag OPTIONAL dalam sebuah&lt;Login Logindatasets.xmluntuk menentukan berapa banyak pesan diagnostik dikirim ke file log.txt. Hal ini dapat diatur untuk "perang" (beberapa pesan) "info" (Login) , atau "semua" (pesan yang paling) Sitemap Login
```
    <logLevel>info</logLevel>  
```
Setiap perubahan nilai tag ini akan berpengaruh pada waktu berikutnyaERDDAP™Logindatasets.xmltermasuk dalam menanggapi dataset[Login](/docs/server-admin/additional-information#flag)Sitemap SitemapERDDAP™v2.00, ini ditentukan dalam setup.xml, yang masih diperbolehkan tetapi tidak teratur.
     
### &lt;parsialRequestMaxBytes&gt; dan&lt;parsialRequestMaxCells&gt;{#partialrequestmaxbytes-and-partialrequestmaxcells} 
* Sitemap ** &lt;WordPress.org **Sitemap (#partialrequestmaxbytes-and-partialrequestmaxcells) Sitemap** &lt;WordPress.org ** Sitemap (#partialrequestmaxbytes-and-partialrequestmaxcells) jarang digunakan tag OPTIONAL dalam sebuah&lt;Login Logindatasets.xmlSitemap Sitemap (dan tidak selalu mungkin Meme it) LoginERDDAP™melanggar permintaan data besar ke dalam chunks untuk mengonsumsi memori.
    
Dengan 32 bitJava, dalam rasa sederhana, jumlah maksimum simultan *Login* permintaan kira-kira 3/4 dari memori yang tersedia (Nilai -Xmx dilewati ke Tomcat) dibagi dengan ukuran chunk (e.g., 1200 MB / 100 MB =&gt; 12 permintaan) Sitemap Hal lain memerlukan memori, sehingga jumlah permintaan yang sebenarnya akan kurang. Dalam praktek, chunking tidak selalu mungkin. Jadi satu besar atau beberapa permintaan non-chunkable simultan yang sangat besar dapat menyebabkan masalah pada 32 bitJavaSitemap

Dengan 64 bitJavaNilai -Xmx bisa jauh lebih besar. Jadi memori jauh lebih sedikit kemungkinan untuk menjadi kendala.

Anda dapat menimpa ukuran chunk default dengan mendefinisikan tag inidatasets.xml  (dengan nilai yang berbeda dari yang ditampilkan di sini) Sitemap
Untuk grid:&lt;WordPress.org&lt;Login
Untuk tabel:&lt;WordPress.org&lt;Login

parsialRequestMaxBytes adalah jumlah maksimum yang disukai oleh byte untuk permintaan data grid parsial (chunk dari total permintaan) Sitemap default=100000000 (Chili) Sitemap Ukuran yang lebih besar tidak tentu lebih baik (dan jangan pergi lebih dari 500 MB karena batas default THREDDS untuk Meme itDAPSitemap) Sitemap Tapi ukuran yang lebih besar mungkin memerlukan akses yang lebih sedikit dari ton file (SitemapERD's data satelit dengan setiap titik waktu dalam file terpisah - lebih baik untuk mendapatkan lebih banyak data dari setiap file dalam setiap permintaan parsial) Sitemap

sebagianRequestMaxCells adalah jumlah maksimum sel yang disukai (Login nColumns di tabel data) untuk permintaan data TABEL parsial (chunk dari total permintaan) Sitemap Standar = 100000. Ukuran yang lebih besar tidak tentu lebih baik. Mereka mengakibatkan menunggu lama untuk batch awal data dari sumber.

Setiap perubahan nilai tag ini akan berpengaruh pada waktu berikutnyaERDDAP™Logindatasets.xmltermasuk dalam menanggapi dataset[Login](/docs/server-admin/additional-information#flag)Sitemap SitemapERDDAP™v2.00, ini ditentukan dalam setup.xml, yang masih diperbolehkan tetapi tidak teratur.
     
### &lt;permintaanBlacklist & gt;{#requestblacklist} 
* Sitemap ** &lt;Login ** Sitemap (Login)  [adalah tag OPTIONAL](/docs/server-admin/additional-information#frequent-crashes-or-freezes)Sitemap&lt;Login Logindatasets.xmlyang berisi daftar lengkap alamat IP numerik yang akan di daftar hitam. Setiap perubahan nilai tag ini akan berpengaruh pada waktu berikutnyaERDDAP™Logindatasets.xmltermasuk dalam menanggapi dataset[Login](/docs/server-admin/additional-information#flag)Sitemap
    * Ini dapat digunakan untuk keluar dari Meme it[Denial serangan Layanan](https://en.wikipedia.org/wiki/Denial_of_service)Sitemap[robot web](https://en.wikipedia.org/wiki/Internet_bot), atau jenis pengguna yang bermasalah lainnya.
    * Sitemap SitemapERDDAP™memperlambat merangkak atau membekukan / berhenti, penyebabnya seringkali pengguna yang mengalami lebih dari satu skrip sekaligus dan / atau membuat sejumlah besar permintaan yang sangat besar, sangat tidak efisien, atau tidak valid, atau permintaan simultan. Sitemap[Login](/docs/server-admin/additional-information#log)untuk melihat apakah ini adalah kasus dan untuk menemukan alamat IP numerik dari pengguna yang bermasalah. Jika ini adalah masalah, Anda mungkin harus daftar hitam yang pengguna.
        
SitemapERDDAP™mendapat permintaan dari alamat IP berwarna hitam, itu akan mengembalikan Kesalahan HTTP 403: Forbidden. Pesan kesalahan teks yang menyertai mendorong pengguna untuk mengirim email Anda,ERDDAPadministrator, untuk mengerjakan masalah. Jika mereka mengambil waktu untuk membaca pesan kesalahan (banyak jelas tidak Meme it) dan hubungi Anda, Anda kemudian dapat bekerja dengan mereka untuk menjalankan satu skrip sekaligus, membuat permintaan yang lebih efisien, memperbaiki masalah dalam skrip mereka (misalnya, meminta data dari dataset jarak jauh yang tidak dapat merespon sebelum waktu keluar) , atau apa pun yang lain adalah sumber masalah.
        
Pengguna sering hanya menyadari bahwa permintaan mereka bermasalah. Mereka sering tidak menyadari bug, inefisiensi kotor, atau masalah lain dengan skrip mereka. Mereka sering berpikir bahwa karena Anda Meme itERDDAP™menawarkan data secara gratis, mereka dapat meminta data sebanyak yang mereka inginkan, misalnya, dengan menjalankan beberapa skrip atau dengan menggunakan beberapa benang secara bersamaan.
        
        * Anda dapat menjelaskan kepada mereka bahwa setiapERDDAP™Sekarang seberapa besar dan kuat, memiliki sumber daya terbatas (Waktu CPU, hard drive I / O, bandwidth jaringan, dll.) dan itu tidak adil jika salah satu data permintaan pengguna dengan cara yang memperkaya pengguna lain atau overburdensERDDAPSitemap
        * Setelah pengguna tahu cara membuat 2 permintaan simultan, mereka sering melihat tidak ada alasan untuk membuat 5, 10 atau 20 permintaan simultan, karena permintaan tambahan biaya tidak ada. Seperti perang asimetris: di sini, senjata ofensif memiliki keunggulan luar biasa (biaya nol) di atas senjata defensif (instalasi terbatas dengan biaya nyata) Sitemap
        * Point out to them that there are diminishing returns to making more and more simultan request; permintaan tambahan hanya memblokir permintaan pengguna lain; mereka tidak menghasilkan peningkatan besar bagi mereka.
        * Memperkecil mereka bahwa ada pengguna lain Meme it (pengguna kasual dan pengguna lain yang menjalankan skrip) , jadi tidak adil dari mereka untuk berharap semua Meme itERDDAPSitemap
        * Memungkinkan raksasa teknologi telah menginduksi pengguna untuk mengharapkan sumber daya tak terbatas dari layanan web. Walaupun ada cara untuk mengatur[grids/clusters/federasiERDDAPLogin](/docs/server-admin/scaling)untuk membuatERDDAP™sistem dengan lebih banyak sumber daya, sebagian besarERDDAP™administrator tidak memiliki uang atau tenaga kerja untuk mengatur sistem tersebut, dan sistem tersebut masih akan terbatas. SitemapERDmisalnya, ada satu orang (Login) LoginERDDAP™, memberikan duaERDDAPLogin (dengan bantuan dari bos saya) , dan mengelola beberapa sumber data, semua dengan anggaran hardware tahunan $0 (kami mengandalkan hibah sesekali untuk membayar untuk perangkat keras) Sitemap Ini bukan Google, Facebook, Amazon, dll dengan 100 insinyur, dan jutaan dolar pendapatan untuk mendaur ulang ke sistem yang lebih besar. Dan kita tidak bisa memindahkan kita Meme itERDDAP™untuk, misalnya, Amazon AWS, karena biaya penyimpanan data besar dan biaya egress data besar dan variabel, sementara anggaran kami untuk layanan eksternal adalah tetap $0.
        * Permintaan saya kepada pengguna adalah: untuk permintaan yang tidak sensitif waktu (yang sejauh ini kasus yang paling umum) sistem mereka hanya harus membuat satu permintaan pada waktu. Jika permintaan sensitif waktu (e.g., beberapa .png di halaman web, beberapa ubin untukWMSklien, dll.) , maka mungkin 4 permintaan simultan harus maksimal (dan hanya untuk waktu yang sangat singkat) Sitemap
        * Jika Anda menjelaskan situasi kepada pengguna, sebagian besar pengguna akan memahami dan bersedia untuk membuat perubahan yang diperlukan sehingga Anda dapat menghapus alamat IP mereka dari daftar hitam.
             
    * Untuk daftar hitam pengguna, tambahkan alamat IP numerik mereka ke daftar lengkap alamat IP di&lt;permintaanBlacklist&gt; di Andadatasets.xmlLogin Untuk menemukan alamat IP pengguna yang bermasalah, lihat di Meme itERDDAP™  *Login* /logs/log.txt file ( *Login* ditentukan dalam[WordPress.org](/docs/server-admin/deploy-install#setupxml)) untuk melihat apakah ini adalah kasus dan untuk menemukan alamat IP pengguna. Alamat IP untuk setiap permintaan tercantum pada garis-garis yang dimulai dengan "&#123; & #123; & #123; & #123; #" dan 4 nomor dipisahkan oleh periode, misalnya, 123.45.67.8 . Mencari "ERROR" akan membantu Anda menemukan masalah seperti permintaan tidak valid.
    * Anda juga dapat mengganti nomor terakhir di alamat IP dengan\\*(misalnya, 202.109.200.\\*) untuk memblokir berbagai alamat IP, 0-255.
    * Anda juga dapat mengganti nomor 2 terakhir di alamat IP dengan\\*Sitemap\\*  (contoh, 121.204.\\*Sitemap\\*) untuk memblokir berbagai alamat IP yang lebih luas, 0-255.0-255.
    * Sitemap
    ```
        <requestBlacklist>98.76.54.321, 202.109.200.\\*, 121.204.\\*.\\*</requestBlacklist>
    ```
    * Anda tidak perlu restartERDDAP™untuk perubahan&lt;memintaBlacklist&gt; untuk mengambil efek. Perubahan akan terdeteksi waktu berikutnyaERDDAP™memeriksa apakah dataset harus diisi ulang. Atau, Anda dapat mempercepat proses dengan mengunjungi[Login URL:](/docs/server-admin/additional-information#set-dataset-flag)untuk setiap dataset.
    * LoginERDDAP™laporan harian termasuk daftar/banyak dari yang paling aktif diperbolehkan dan memblokir permintaan.
    * Jika Anda ingin mengetahui apa domain / institusi terkait dengan alamat IP numerik, Anda dapat menggunakan layanan web DNS gratis, terbalik seperti[ https://network-tools.com/ ](https://network-tools.com/)Sitemap
    * Mungkin ada saat masuk akal untuk memblokir pengguna tertentu pada tingkat yang lebih tinggi, misalnya, pengguna jahat. Misalnya, Anda dapat memblokir akses mereka ke segala sesuatu di server Anda, tidak hanyaERDDAPSitemap Pada Linux, salah satu metode tersebut untuk digunakan[Login](https://www.linode.com/docs/guides/control-network-traffic-with-iptables/)Sitemap Misalnya, Anda dapat menambahkan aturan yang akan memblokir segala sesuatu yang berasal dari 198.51.100.0 dengan perintah
Mozilla Firefox 57.0.1 ... Login
       
### &lt;Login{#slowdowntroublemillis} 
* Sitemap ** &lt;Login ** Sitemap (Login) adalah tag OPTIONAL yang jarang digunakan dalam&lt;Login Logindatasets.xmlyang mengandung integer menentukan jumlah mili detik (default=1000) untuk menghentikan ketika menanggapi semua permintaan gagal, misalnya, dataset tidak diketahui, meminta terlalu besar, pengguna pada daftar hitam. Login
    ```
    <slowDownTroubleMillis>2000</slowDownTroubleMillis>
    ```
Jika skrip membuat satu permintaan segera setelah yang lain, maka mungkin dengan cepat membuat satu permintaan buruk setelah yang lain. Dengan pengaturan ini, Anda dapat memperlambat skrip gagal sehinggaERDDAP™tidak banjir dengan permintaan yang buruk. Jika manusia membuat permintaan buruk, mereka bahkan tidak akan melihat penundaan ini. Rekomendasi:
    
    * Jika masalah adalah Denial of Service yang Didistribusikan (Login) serangan dari 100+ penyerang, set ini ke angka yang lebih kecil (100 g) Sitemap Kenali mereka semua turun untuk lead terlalu panjang untuk terlalu banyak benang aktif.
    * Jika masalah adalah dari sumber 1-10, set ini ke 1000 ms (Login) tapi angka yang lebih besar (seperti 10000) juga masuk akal. Itu memperlambat mereka sehingga mereka membuang sumber daya jaringan yang lebih sedikit. Juga, 1000 ms atau tidak akan mengganggu pengguna manusia yang membuat permintaan buruk.
    
Setiap perubahan nilai tag ini akan berpengaruh pada waktu berikutnyaERDDAP™Logindatasets.xmltermasuk dalam menanggapi dataset[Login](/docs/server-admin/additional-information#flag)Sitemap
     
### &lt;berlanggananEmailBlacklist&gt;{#subscriptionemailblacklist} 
* Sitemap ** &lt;Login Login ** Sitemap (Sitemap) adalah tag OPTIONAL yang jarang digunakan dalam&lt;Login Logindatasets.xmlyang berisi daftar alamat email yang dipisahkan koma yang segera dihitungkan dari[sistem berlangganan](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions)Sitemap
    ```
    <subscriptionEmailBlacklist>bob@badguy.com, john@badguy.com</subscriptionEmailBlacklist>  
    ```
Ini adalah sistem yang tidak sensitif. Jika alamat email ditambahkan ke daftar ini, jika alamat email memiliki langganan, langganan akan dibatalkan. Jika alamat email pada daftar mencoba berlangganan, permintaan akan ditolak. Setiap perubahan nilai tag ini akan berpengaruh pada waktu berikutnyaERDDAP™Logindatasets.xmltermasuk dalam menanggapi dataset[Login](/docs/server-admin/additional-information#flag)Sitemap
     
### Teks Standar{#standard-text} 
*   [ **Teks Standar** ](#standard-text)Login Ada beberapa tag OPTIONAL (paling jarang digunakan) Sitemap&lt;Login Logindatasets.xmluntuk menentukan teks yang muncul di berbagai tempat diERDDAPSitemap Jika Anda ingin mengubah teks default, salin nilai yang ada dari tag nama yang sama
     *Login* /webapps/erddap/WEB-INF/classes/gov/noa/pfel/erddap/util.messages.xml Logindatasets.xml, kemudian memodifikasi konten. Keuntungan dari memiliki inidatasets.xmladalah bahwa Anda dapat menentukan nilai baru setiap saat, bahkan ketikaERDDAP™berjalan. Setiap perubahan nilai tag ini akan berpengaruh pada waktu berikutnyaERDDAP™Logindatasets.xmltermasuk dalam menanggapi dataset[Login](/docs/server-admin/additional-information#flag)Sitemap Nama tag menggambarkan tujuan mereka, tetapi melihat konten default dalam pesan.xml untuk pemahaman yang lebih dalam.
    
    *   &lt;Login
    *   &lt;Login
    *   &lt;Login
    *   &lt;standardDisclaimerOfEndorsement&gt;
    *   &lt;standarDisclaimerOfExternalLinks&gt;
    *   &lt;standarGeneralDisclaimer&gt;
    *   &lt;Sitemap Login
    *   &lt;Login
    *   &lt;startBodyHtml5&gt; adalah tag yang baik untuk berubah untuk menyesuaikan tampilan atas setiap halaman web di AndaERDDAPSitemap Tidak mungkin, Anda dapat menggunakan ini untuk dengan mudah menambahkan pesan sementara di Meme itERDDAP™Login (e.g., "Periksa JPL MUR SST v4.1 dataset ..." atau "IniERDDAP™akan offline untuk pemeliharaan 2019-05-08T17:00 PDT melalui 2019-05-08T20:00 PDT.") Sitemap Satu kusen menempatkan tag ini didatasets.xmladalah: ketika Anda restartERDDAP, permintaan pertama untukERDDAP™akan mengembalikan awal default BodyHtml5 HTML, tetapi setiap permintaan berikutnya akan menggunakan HTML startBodyHtml5 yang ditentukan dalamdatasets.xmlSitemap
    *   &lt;Login Html&gt; adalah tag yang baik untuk berubah untuk menyesuaikan deskripsi AndaERDDAPSitemap Perhatikan bahwa Anda dapat dengan mudah mengubah ini untuk menambahkan pesan sementara di halaman rumah (SitemapERDDAP™akan offline untuk pemeliharaan 2019-05-08T17:00 PDT melalui 2019-05-08T20:00 PDT.") Sitemap
    *   &lt;Login
    
      
SitemapERDDAP™v2.00, ini ditentukan dalam setup.xml, yang masih diperbolehkan tetapi tidak teratur.
     
### &lt;Sitemap Aktivitas & gt;{#unusualactivity} 
* Sitemap ** &lt;Sitemap ** Sitemap (Sitemap) adalah tag OPTIONAL yang jarang digunakan dalam&lt;Login Logindatasets.xmluntuk menentukan jumlah maksimum permintaan antara dua berjalan LoadDatasets yang dianggap normal (default=10000) Sitemap Jika nomor itu melebihi, email dikirim ke emailEverythingTo (seperti yang ditentukan dalam setup.xml) Sitemap Login
    ```
    <unusualActivity>10000</unusualActivity>  
    ```
Setiap perubahan nilai tag ini akan berpengaruh pada waktu berikutnyaERDDAP™Logindatasets.xmltermasuk dalam menanggapi dataset[Login](/docs/server-admin/additional-information#flag)Sitemap SitemapERDDAP™v2.00, ini ditentukan dalam setup.xml, yang masih diperbolehkan tetapi tidak teratur.
     
### &lt;WordPress.org{#updatemaxevents} 
* Sitemap ** &lt;WordPress.org ** Sitemap (Sitemap) adalah tag OPTIONAL yang jarang digunakan dalam&lt;Login Logindatasets.xmluntuk menentukan jumlah maksimum peristiwa perubahan file (default=10) yang akan ditangani oleh [&lt;Login (Login) sistem sebelum beralih ke reloading dataset bukan. Sitemap
    ```
    <updateMaxEvents>10</updateMaxEvents>  
    ```
Sistem pembaruanEveryNMillis dimaksudkan untuk berjalan dengan sangat cepat sebelum permintaan pengguna diproses. Jika ada banyak peristiwa perubahan file, maka asumsinya tidak dapat berjalan dengan cepat, jadi bukannya panggilan untuk dataset untuk diisi ulang. SitemapERDDAP™penawaran dengan dataset yang harus disimpan up-to-date bahkan ketika ada perubahan pada sejumlah besar file data, Anda dapat mengatur ini ke nomor yang lebih besar (100 g) Sitemap

### &lt;pengguna & gt;{#user} 
* Sitemap ** &lt;pengguna&gt; ** Sitemap (Login) adalah tag OPTIONAL dalam sebuah&lt;Login Logindatasets.xmlyang mengidentifikasi nama pengguna, kata sandi (jika otentikasi = kustom) dan peran (Daftar yang dipisahkan oleh komma) Sitemap Penggunaan username dan password bervariasi sedikit berdasarkan nilai [&lt;otentikasi&gt; (/docs/server-admin/additional-information#auttherapy) AndaERDDAP's setup.xml file.
    * Ini adalah bagian dariERDDAPSitemap[sistem keamanan](/docs/server-admin/additional-information#security)untuk membatasi akses ke beberapa set data untuk beberapa pengguna.
    * Membuat terpisah&lt;pengguna&gt; tag untuk setiap pengguna. Opsional, jika otentikasi=oauth2, Anda dapat mengatur dua&lt;pengguna&gt; tag untuk setiap pengguna: satu untuk ketika pengguna masuk melalui Google, satu untuk ketika pengguna masuk melalui Orcid, asumsikan dengan peran yang sama.
    * Jika tidak ada&lt;pengguna&gt; tag untuk klien, s/he hanya akan dapat mengakses dataset publik, yaitu, dataset yang tidak memiliki [&lt;Login (Login) Login
    * Login
Untuk otentikasi = kustom, username biasanya merupakan kombinasi huruf, digit, underscores, dan periode.
Untuk otentikasi=email, username adalah alamat email pengguna. Ini mungkin alamat email.
Untuk otentikasi=google, username adalah alamat email Google penuh pengguna. Ini termasuk akun yang dikelola Google seperti@noaa.govLogin
Untuk otentikasi=ataucid, username adalah nomor akun Orcid pengguna (dengan dasbor) Sitemap
Untuk otentikasi=oauth2, nama pengguna adalah alamat email Google penuh pengguna atau nomor akun Orcid pengguna (dengan dasbor) Sitemap
    * Login
Untuk otentikasi=email, google, orcid, atau oauth2, tidak menentukan atribut kata sandi.
Untuk otentikasi = kustom, Anda harus menentukan atribut kata sandi untuk setiap pengguna.
        * Kata sandi yang pengguna masukkan adalah kasus sensitif dan harus memiliki 8 atau lebih karakter sehingga mereka lebih sulit untuk retak. Saat ini, bahkan 8 karakter dapat retak dengan cepat dan murah dengan gaya brute menggunakan cluster komputer di AWS.ERDDAP™hanya memberlakukan minimum 8-karakter ketika pengguna mencoba masuk (tidak ketika pengguna&lt;pengguna&gt; tag sedang diproses, karena kode hanya melihat pencernaan hash kata sandi, bukan kata sandi teks).
        * WordPress.org&lt;Sitemap menentukan bagaimana kata sandi disimpan di Meme it&lt;pengguna&gt; Sitemapdatasets.xmlSitemap Untuk meningkatkan keamanan, pilihannya adalah:
            *   [Login](https://en.wikipedia.org/wiki/MD5)  (Jangan gunakan ini&#33;) -- untuk atribut password, tentukan MD5 hash pencernaan password pengguna.
            * Login (Jangan gunakan ini&#33;) -- untuk atribut kata sandi, tentukan pencernaan hash MD5 *Login* SitemapERDDAPSitemap *Login* Sitemap Nama pengguna dan "ERDDAP" digunakan untuk[Login](https://en.wikipedia.org/wiki/Salt_(cryptography)) nilai hash, membuatnya lebih sulit untuk decode.
            *   [SHA256](https://en.wikipedia.org/wiki/SHA-2)  (tidak disarankan) -- untuk atribut kata sandi, tentukan naungan SHA-256 dari kata sandi pengguna.
            * UEPSHA256 (default, direkomendasikan passwordEncoding. Tapi jauh lebih baik: gunakan opsi otentikasi google, orchid, atau oauth2.) -- untuk atribut kata sandi, tentukan naungan SHA-256 *Login* SitemapERDDAPSitemap *Login* Sitemap Nama pengguna dan "ERDDAP" digunakan untuk garam nilai hash, membuatnya lebih sulit untuk decode.
        * Pada Windows, Anda dapat menghasilkan nilai pencernaan kata sandi MD5 dengan mengunduh program MD5 (Sitemap[Login](https://www.fourmilab.ch/md5/)) dan menggunakan (Sitemap) Sitemap
md5 -djsmith:ERDDAPSitemap *Login* 
        * Pada Linux/Unix, Anda dapat menghasilkan nilai pencernaan MD5 dengan menggunakan program md5sum bawaan (Sitemap) Sitemap
gERDDAPSitemap *Login* Sitemap|md5sum
        * Disimpan kata sandi polos teks sensitif kasus. Bentuk yang disimpan dari kata sandi MD5 dan UEPMD5 tidak sensitif.
        * Sitemap (menggunakan UEPMD5) , jika username="jsmith" dan password="myPassword",&lt;pengguna&gt; tag adalah:
```
            <user username="jsmith"  
            password="57AB7ACCEB545E0BEB46C4C75CEC3C30"  
            roles="JASmith, JASmithGroup" />  
```
di mana kata sandi yang tersimpan dihasilkan dengan
md5 -djsmith:ERDDAPLogin
        * peran adalah daftar peran yang dipisahkan oleh koma untuk mana pengguna diberi wewenang. Sitemap&lt;dataset&gt; mungkin memiliki [&lt;Login (Login) tag yang mencantumkan peran yang diperbolehkan untuk mengakses dataset tersebut. Untuk pengguna yang diberikan dan dataset yang diberikan, jika salah satu peran dalam daftar peran pengguna sesuai dengan salah satu peran dalam daftar dataset dari&lt;dapat diakses&gt; peran, maka pengguna berwenang untuk mengakses dataset tersebut.
            
Setiap pengguna yang masuk secara otomatis diberikan peran\\[Login Sitemap\\]apakah ada&lt;pengguna&gt; tag untuk mereka di Meme itdatasets.xmlatau tidak. Jadi jika dataset tertentu
```
            <accessibleTo>\\[anyoneLoggedIn\\]</accessibleTo>  
```
maka pengguna apa pun yang login akan dilegalkan untuk mengakses dataset tersebut, meskipun tidak ada&lt;pengguna&gt; tag untuk mereka di Meme itdatasets.xmlSitemap
            
    * Setiap perubahan nilai tag ini akan berpengaruh pada waktu berikutnyaERDDAP™Logindatasets.xmltermasuk dalam menanggapi dataset[Login](/docs/server-admin/additional-information#flag)Sitemap
         
### &lt;jalurRegex & gt;{#pathregex} 
* Sitemap ** &lt;Login ** Sitemap (Login) memungkinkan Anda menentukan ekspresi rutin yang membatasi jalan yang Meme it (subdirectories) akan dimasukkan ke dalam dataset. default adalah .\\*, yang cocok dengan semua jalan. Ini adalah tag yang jarang digunakan, jarang diperlukan, OPTIONAL untukEDDGridDari Files dataset, EDDTableDariFiles dataset, dan beberapa jenis dataset lainnya. Namun, ketika Anda membutuhkannya, Anda benar-benar membutuhkannya.
    
Untuk membuat pekerjaan ini, Anda perlu benar-benar baik dengan ekspresi biasa. Lihat ini[database](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html)Login[Login](https://www.vogella.com/tutorials/JavaRegularExpressions/article.html)Sitemap Secara khusus, Anda perlu tahu tentang menangkap kelompok (sesuatu di dalam parentheses) "atau" simbol "|Sitemap
Bersama-sama, ini memungkinkan Anda menentukan sejumlah pilihan, misalnya, (opsi1|Login|Login) Sitemap
Juga, salah satu pilihan bisa tidak ada, misalnya, (|Login|Login) Sitemap
Juga, Anda perlu tahu bahwa menangkap kelompok dapat bersarang, yaitu, setiap pilihan dalam kelompok capture dapat berisi kelompok capture lain, misalnya, (|Login (|Login Login|Login) |Login) yang mengatakan bahwa option2 dapat diikuti oleh tidak ada, atau option2b, atau option2c.
Untuk pathRegexe, setiap opsi akan menjadi satu nama folder yang diikuti oleh /, misalnya, bar / .
    
Bagian rumit dari jalurRegex adalah: KetikaERDDAP™kembali turun pohon direktori, jalurRegex harus menerima semua jalur yang dihadapi dengan caranya ke direktori dengan data. Regex dengan kelompok capture bersarang adalah cara yang baik untuk berurusan dengan ini.
    
Contoh:
Misalkan kita memiliki struktur direktori berikut:
    ```
    /foo/bar/D0001/a/\\*.nc  
    /foo/bar/D0001/b/\\*.nc  
    /foo/bar/D0002/a/\\*.nc  
    /foo/bar/D0002/b/\\*.nc  
    ...  
    /foo/bar/E0001/a/\\*.nc  
    ...  
    ```
dan fileDirectory yang ditentukan adalah /foo / bar /, dan kami hanya ingin.ncfile di D\\[Chili\\]&#123;4&#125;/a/subdirectories.
Solusinya adalah mengatur pathRegex ke /foo / bar / (|Login\\[Chili\\]&#123;1&#125;/ (|Sitemap) )   
Yang mengatakan:
Jalan harus dimulai dengan /foo / bar /
Itu mungkin diikuti oleh tidak ada atau D\\[Chili\\]&#123;1&#125;/
Itu mungkin diikuti oleh tidak ada atau a/
    
Ya, jalurRegex dapat sangat sulit diformulasikan. Jika Anda terjebak, minta programmer komputer (hal paling dekat di dunia nyata untuk inkantasi wizard spouting?) atau mengirim email ke Chris. John di noaaa.gov.
    
### &lt;dataset&gt;{#dataset} 
* Sitemap ** &lt;Login ** Sitemap (Login) OPTIONAL (tapi selalu digunakan) di dalam sebuah&lt;Login Logindatasets.xmlbahwa (jika Anda menyertakan semua informasi antara&lt;Login&lt;/dataset&gt;) benar-benar menggambarkan satu dataset. Sitemap
    ```
    <dataset type="EDDGridFromDap" datasetID="erdPHssta8day" active="true"> ... </dataset>  
    ```
Ada banyak tag dataset di Andadatasets.xmlLogin
Tiga atribut MEI muncul dalam&lt;dataset&gt; tag:
     
    *    **Login *Sitemap Login* Sitemap** adalah atribut yang dapat disesuaikan dalam&lt;dataset&gt; tag didatasets.xmlyang mengidentifikasi jenis dataset (misalnya, apakah itu adalah Meme itEDDGrid/ gridded atau dataset EDDTable / tabel) dan sumber data (misalnya, database, file, atau remoteOPeNDAPLogin) Sitemap Sitemap[ **Daftar Jenis Dataset** ](#list-of-types-datasets)Sitemap
         
#### Login Login{#datasetid} 
*   [ **datasetIDSitemap *Login* Sitemap** ](#datasetid)adalah atribut yang dapat disesuaikan dalam&lt;dataset&gt; tag yang menetapkan pendek (biasanya&lt;15 karakter), unik, mengidentifikasi nama ke dataset.
    * LogindatasetIDs MUST adalah surat (A-Z, a-z) diikuti oleh sejumlah A-Z, a-z, 0-9, dan \\_ (tetapi terbaik jika&lt;Total karakter 32).
    * Login ID adalah kasus sensitif, tetapi DON'T membuat duadatasetIDMeme it Ini akan menyebabkan masalah pada komputer Windows (Anda dan / atau komputer pengguna) Sitemap
    * Praktik terbaik: Kami merekomendasikan menggunakan[Login Login](https://en.wikipedia.org/wiki/CamelCase)Sitemap
    * Praktik terbaik: Kami merekomendasikan bahwa bagian pertama adalah acronym atau singkatan dari nama institusi sumber dan bagian kedua adalah acronym atau singkatan dari nama dataset. Ketika mungkin, kami membuat nama yang mencerminkan nama sumber untuk dataset. Misalnya, kami digunakandatasetIDLoginssta8day" untuk dataset dariNOAA NMFS SWFSCDivisi Penelitian Lingkungan (ERD) yang ditunjuk oleh sumber menjadi satelit/PH/sstSitemap
    * Jika Anda mengubah nama dataset, dataset lama (dengan nama lama) masih hidupERDDAPSitemap Ini adalah "orphan" dataset, karena spesifikasinya di dalamnyadatasets.xmlsekarang Ini harus ditangani dengan:
        1. SitemapERDDAP™v2.19 dan kemudian, Anda tidak perlu melakukan apa pun.ERDDAP™akan secara otomatis menghapus dataset yatim ini.
        2. SitemapERDDAP™v2.18 dan sebelumnya, Anda perlu melakukan sesuatu untuk menghapus set data yatim: Buat dataset "false" aktif, misalnya,
```
                <dataset type="EDDTableFromNcFiles" datasetID="*theOldName*" active="false" />  
```
Setelah beban utama berikutnya Login Anda dapat menghapus tag setelah dataset lama tidak aktif.
                 
#### Sitemap{#active} 
*   [ **Sitemap *Login* Sitemap** ](#active)adalah atribut OPTIONAL dalam&lt;dataset&gt; tag didatasets.xmlyang menunjukkan apakah dataset aktif (memenuhi syarat untuk digunakanERDDAP) atau tidak.
    * Nilai valid benar (Login) dan palsu.
    * Karena default benar, Anda tidak perlu menggunakan atribut ini sampai Anda ingin sementara atau secara permanen menghapus dataset ini dariERDDAPSitemap
    * Jika Anda hanya menghapus dataset "true" aktif daridatasets.xmldataset masih aktifERDDAP™tapi tidak akan pernah diperbarui. Meme it Dataset seperti itu akan menjadi "orphan" dan akan terdaftar seperti status. Halaman web html tepat di bawah daftar dataset yang gagal dimuat.
    * Jika Anda mengatur aktif="false",ERDDAP™akan menonaktifkan dataset waktu berikutnya ia mencoba untuk memperbarui dataset. Ketika Anda melakukan ini,ERDDAP™tidak membuang informasi apa pun yang dapat disimpan tentang dataset dan tentu tidak melakukan apa pun pada data aktual.
    * Untuk menghapus dataset dariERDDAP™Sitemap[Penghapusan Dataset Angkatan](/docs/server-admin/additional-information#removing-datasets)Sitemap
         

 ** Beberapa tag dapat muncul di antara&lt;Login&lt;/dataset&gt; tag. **   
Ada beberapa variasi dalam tag mana yang diperbolehkan oleh jenis dataset. Lihat dokumentasi tertentu[jenis dataset](#list-of-types-datasets)Sitemap

#### &lt;Sitemap Login{#accessibleto} 
* Sitemap ** &lt;Sitemap Sitemap ** Sitemap (Login) adalah tag OPTIONAL dalam sebuah&lt;dataset&gt; tag yang menentukan daftar koma-separated[Login](#user)yang diperbolehkan untuk memiliki akses ke dataset ini. Sitemap
    ```
    <accessibleTo>RASmith, NEJones</accessibleTo>  
    ```
    * Ini adalah bagian dariERDDAPSitemap[sistem keamanan](/docs/server-admin/additional-information#security)untuk membatasi akses ke beberapa set data untuk beberapa pengguna.
    * Jika tag ini tidak hadir, semua pengguna (bahkan jika mereka belum masuk) akan memiliki akses ke dataset ini.
    * Jika tag ini hadir, dataset ini hanya akan terlihat dan dapat diakses oleh pengguna yang masuk yang memiliki salah satu peran yang ditentukan. Dataset ini tidak akan terlihat kepada pengguna yang tidak masuk.
    * Setiap pengguna yang masuk secara otomatis diberikan peran\\[Login Sitemap\\]apakah ada&lt;pengguna&gt; tag untuk mereka di Meme itdatasets.xmlatau tidak. Jadi jika dataset tertentu
    ```
        <accessibleTo>\\[anyoneLoggedIn\\]</accessibleTo>  
    ```
maka pengguna apa pun yang login akan dilegalkan untuk mengakses dataset tersebut, meskipun tidak ada&lt;pengguna&gt; tag untuk mereka di Meme itdatasets.xmlSitemap
         
#### &lt;grafsAccessibleTo&gt;{#graphsaccessibleto} 
* Sitemap ** &lt;Sitemap ** Sitemap (Login) adalah tag OPTIONAL dalam sebuah&lt;dataset&gt; tag didatasets.xmlyang menentukan apakah grafik dan metadata untuk dataset tersedia untuk publik. Ini menawarkan cara untuk sebagian menimpa dataset [&lt;Login (Login) Login Nilai yang diizinkan adalah:
    * Sitemap Nilai ini (atau tidak adanya&lt;grafikAccessibleTo&gt; tag untuk dataset) membuat akses ke grafik dan metadata dari dataset mimic dataset&lt;Sitemap
Jadi jika dataset pribadi, grafik dan metadatanya akan pribadi.
Dan jika dataset adalah publik, grafik dan metadatanya akan publik.
    * publik Login Pengaturan ini membuat grafik dataset dan metadata yang dapat diakses oleh siapa pun, bahkan pengguna yang tidak masuk, bahkan jika dataset tidak pribadi karena memiliki grafik dataset&lt;dapat diakses&gt; tag.
         
#### &lt;Sitemap ViaFiles & gt;{#accessibleviafiles} 
* Sitemap ** &lt;Login ** Sitemap (Login) adalah tag OPTIONAL dalam sebuah&lt;dataset&gt; tag didatasets.xmlSitemap[EDDGridLogin](#eddgridaggregateexistingdimension)Login[EDDGridLogin](#eddgridcopy)Login[EDDGridSitemap](#eddgridfromeddtable)Login[EDDGridLogin](#eddfromerddap)Login[EDDGridLogin](#eddgridfrometopo)Login[EDDGridLogin](#eddgridfromfiles)  (termasuk semua kelas) Login[EDDGridLogin](#eddgridsidebyside)Login[Login](#eddtablecopy) [Login](#eddfromerddap)Login[LoginEDDGrid](#eddtablefromeddgrid)Sitemap[Login](#eddtablefromfiles)  (termasuk semua kelas) Login Ini bisa memiliki nilai yang benar atau palsu. Sitemap
    ```
    <accessibleViaFiles>true</accessibleViaFiles>  
    ```
Jika nilainya benar,ERDDAP™akan membuatnya sehingga pengguna dapat menelusuri dan mengunduh file data sumber data melalui dataERDDAPSitemap["files"sistem](https://coastwatch.pfeg.noaa.gov/erddap/files/)Sitemap Sitemap"files"sistem[Sitemap](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)Informasi lebih lanjut
    
Nilai default dari&lt;Login Sitemap&lt;defaultAccessibleViaFiles&gt; Sitemap[WordPress.org](/docs/server-admin/deploy-install#setupxml)Sitemap Ini memiliki nilai default palsu, tetapi kami merekomendasikan bahwa Anda menambahkan tag itu ke setup Anda.xml dengan nilai benar.
    
Rekomendasi - Kami merekomendasikan membuat semua set data yang relevan dapat diakses melalui sistem file dengan pengaturan&lt;defaultAccessibleViaFiles&gt; untuk benar dalam setup.xml karena ada sekelompok pengguna untuk siapa ini adalah cara yang disukai untuk mendapatkan data. Di antara alasan lain,"files"sistem memudahkan pengguna untuk melihat file mana yang tersedia dan ketika mereka diubah terakhir, sehingga memudahkan pengguna untuk mempertahankan salinan mereka sendiri dari seluruh dataset. Jika Anda umumnya tidak ingin membuat dataset dapat diakses melalui sistem file, set&lt;defaultAccessibleViaFiles&gt; untuk palsu. Dalam kasus baik, hanya gunakan&lt;dapat diaksesVias&gt; untuk beberapa dataset yang terkecuali pada kebijakan umum yang ditetapkan oleh&lt;defaultAccessibleViaFiles&gt; (misalnya, ketika penggunaan dataset[.ncLogin](#ncml-files)file, yang tidak sangat berguna bagi pengguna) Sitemap
     
#### &lt;Sitemap LoginWMSLogin{#accessibleviawms} 
* Sitemap ** &lt;Sitemap LoginWMSSitemap ** Sitemap (Login) adalah tag OPTIONAL dalam sebuah&lt;dataset&gt; tag didatasets.xmluntuk semua[EDDGrid](#eddgrid)Login Ini bisa memiliki nilai yang benar (Login) atau palsu. Sitemap
    ```
    <accessibleViaWMS>true</accessibleViaWMS>  
    ```
Jika nilainya palsu,ERDDAPSitemapWMSserver tidak akan tersedia untuk dataset ini. Hal ini umum digunakan untuk dataset yang memiliki beberapa nilai longitude lebih dari 180 (yang secara teknis tidak valid untuk Meme itWMSSitemap) , dan untuk mana Anda juga menawarkan varian dataset dengan nilai-nilai longitude sepenuhnya dalam kisaran -180 hingga 180 melalui[EDDGridLonPM180](#eddgridlonpm180)Sitemap
Jika nilainya benar,ERDDAP™akan mencoba untuk membuat dataset tersedia melaluiERDDAPSitemapWMSLogin Tapi jika dataset benar-benar tidak cocok untukWMS  (e.g., tidak ada data longitude atau latitude) maka dataset tidak akan tersedia melaluiERDDAPSitemapWMSserver, terlepas dari pengaturan ini.
     
#### &lt;Login Login Dimana&gt;{#addvariableswhere} 
* Sitemap&lt;Login (Sitemap) adalah tag OPTIONAL dalam&lt;dataset&gt; tag untuk semua dataset EDDTable.
    
Permintaan untuk setiap dataset EDDTable dapat mencakup & menambahkan Login Sitemap (Sitemap *Login Login* Sitemap *Login Login* Sitemap) SitemapERDDAP™untuk menambahkan semua variabel di dataset di mana *atributName=attributeValue* ke daftar variabel yang diminta. Misalnya, jika pengguna menambahkan & menambahkan Login Sitemap (Sitemapioos\\_category","Wind") untuk pertanyaan,ERDDAPakan menambahkan semua variabel dalam dataset yang memilikiioos\\_category= Buka atribut ke daftar variabel yang diminta (misalnya, windSpeed, windDirection, windGustSpeed) Sitemap *Login Login* Login *Login Login* tidak sensitif.
    
Sitemapdatasets.xml, jika chunk dataset.xml untuk dataset memiliki
    ```
    <addVariablesWhere>*attributeNamesCSV*<addVariablesWhere>  
    ```
Sitemap
    ```
    <addVariablesWhere>ioos\\_category,units<addVariablesWhere>  
    ```
Formulir Akses Data (.html halaman web) untuk dataset akan menyertakan widget (untuk setiap atributName dalam daftar lengkap) tepat di bawah daftar variabel yang memungkinkan pengguna menentukan nilai atribut. Jika pengguna memilih nilai atribut untuk satu atau lebih dari nama atribut, mereka akan ditambahkan ke permintaan melalui & menambahkan Login Sitemap (Sitemap *Login Login* Sitemap *Login Login* Sitemap) Sitemap Dengan demikian, tag inidatasets.xmlmemungkinkan Anda menentukan daftar nama atribut yang akan muncul di Formulir Akses Data untuk dataset tersebut dan memudahkan pengguna untuk menambahkan &addVariables Dimana fungsi permintaan. Login *Login* daftar sensitif.
    
#### &lt;altitudeMetersPerSourceUnit&gt;{#altitudemeterspersourceunit} 
* Sitemap ** &lt;Sitemap ** Sitemap (Sitemap) adalah tag OPTIONAL dalam&lt;dataset&gt; tag dataset. xxml untuk EDDTableDariSOSLogin (Sitemap) yang menentukan jumlah yang dikalikan oleh ketinggian sumber atau nilai kedalaman untuk mengubahnya menjadi nilai ketinggian (dalam meter di atas permukaan laut) Sitemap Sitemap
    ```
    <altitudeMetersPerSourceUnit>-1</altitudeMetersPerSourceUnit>  
    ```
Tag ini MUST digunakan jika nilai sumbu vertikal dataset tidak meter, positif=up. Jika tidak, itu adalah OPTIONAL, karena nilai default adalah 1. Sitemap
    * Jika sumber sudah diukur dalam meter di atas permukaan laut, gunakan 1 (atau tidak menggunakan tag ini, karena 1 adalah nilai default) Sitemap
    * Jika sumber diukur dalam meter di bawah permukaan laut, gunakan -1.
    ```
        <altitudeMetersPerSourceUnit>-1</altitudeMetersPerSourceUnit>
    ```
    * Jika sumber diukur pada km di atas permukaan laut, gunakan 0,001.
         
#### &lt;defaultDataQuery&gt;{#defaultdataquery} 
* Sitemap ** &lt;Login ** Sitemap (Login) adalah tag OPTIONAL dalam sebuah&lt;dataset&gt; tag didatasets.xmlSitemapERDDAP™untuk menggunakan query yang ditentukan (bagian dari URL setelah "?") .html file Login (Formulir Akses Data) diminta tanpa pertanyaan.
    * Anda mungkin jarang perlu menggunakan ini. Meme it
    * Anda perlu ke XML-encode (tidak kode persen) Pertanyaan default karena mereka dalam dokumen XML. Misalnya, & menjadi &amp;,&lt;Sitemap&lt;&gt; menjadi &gt; .
    * Silakan periksa pekerjaan Anda. Sangat mudah untuk membuat kesalahan dan tidak mendapatkan apa yang Anda inginkan.ERDDAP™akan mencoba membersihkan kesalahan Anda - tetapi tidak bergantung pada itu, karena\\*Sitemap\\*dibersihkan dapat berubah.
    * Untuk dataset griddap, penggunaan umum ini adalah untuk menentukan nilai dimensi kedalaman atau ketinggian yang berbeda (Sitemap\\[Sitemap\\]Sitemap\\[Sitemap\\]) Sitemap
Dalam hal apapun, Anda harus selalu mencantumkan semua variabel, selalu menggunakan nilai dimensi yang sama untuk semua variabel, dan hampir selalu menggunakan\\[Sitemap\\]Login\\[Sitemap\\]Sitemap\\[0: terakhir\\]untuk nilai dimensi.
Contoh:
    ```
        <defaultDataQuery>u\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\],v\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]</defaultDataQuery>
    ```
    * Sitemaptabledapdataset, jika Anda tidak menentukan batasan, permintaan akan mengembalikan seluruh dataset, yang mungkin sangat besar, tergantung pada dataset. Jika Anda tidak ingin menentukan batasan, bukan memiliki kosong&lt;Login (yang sama seperti tidak menentukan default Meme it Login) Anda perlu secara eksplisit daftar semua variabel yang ingin Anda masukkan dalam defaultDataQuery.
    * Sitemaptabledapdataset, penggunaan yang paling umum dari ini adalah untuk menentukan rentang waktu default yang berbeda (relatif terhadap maks (Sitemap) , misalnya, & waktu&gt; = maks (Sitemap) -1day, atau kerabat sekarang, misalnya, & waktu&gt;=now-Sitemap) Sitemap
Ingat bahwa meminta tidak ada variabel data sama dengan menentukan semua variabel data, jadi biasanya Anda hanya dapat menentukan batasan waktu baru.
Contoh:
    ```
        <defaultDataQuery>&amp;time&gt;=max(time)-1day</defaultDataQuery>  
    ```
Sitemap
    ```
        <defaultDataQuery>&amp;time&gt;=now-1day</defaultDataQuery>  
    ```
#### &lt;defaultGraphQuery&gt;{#defaultgraphquery} 
* Sitemap ** &lt;defaultGraphQuery&gt; ** Sitemap (Login) adalah tag OPTIONAL dalam sebuah&lt;dataset&gt; tag didatasets.xmlSitemapERDDAP™untuk menggunakan query yang ditentukan (bagian dari URL setelah "?") jika file .graph Login (Membuat Formulir Grafik) diminta tanpa pertanyaan.
    * Anda mungkin jarang perlu menggunakan ini. Meme it
    * Anda perlu ke XML-encode (tidak kode persen) Pertanyaan default karena mereka dalam dokumen XML. Misalnya, & menjadi &amp;,&lt;Sitemap&lt;&gt; menjadi &gt; .
    * Silakan periksa pekerjaan Anda. Sangat mudah untuk membuat kesalahan dan tidak mendapatkan apa yang Anda inginkan.ERDDAP™akan mencoba membersihkan kesalahan Anda - tetapi tidak bergantung pada itu, karena\\*Sitemap\\*dibersihkan dapat berubah.
    * Untuk dataset griddap, penggunaan yang paling umum dari ini adalah untuk menentukan nilai dimensi kedalaman atau ketinggian yang berbeda (Sitemap\\[Sitemap\\]Sitemap\\[Sitemap\\]) dan/atau untuk menentukan bahwa variabel tertentu di graphed.
Dalam kasus apapun, Anda akan hampir selalu menggunakan\\[Sitemap\\]Login\\[Sitemap\\]Sitemap\\[0: terakhir\\]untuk nilai dimensi.
Contoh:
    ```
        <defaultGraphQuery>temp\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]&amp;.draw=surface&amp;.vars=longitude|latitude|temp</defaultGraphQuery>  
    ```
         (tetapi letakkan semua di satu baris) 
    * Sitemaptabledapdataset, jika Anda tidak menentukan batasan, permintaan akan meniru seluruh dataset, yang dapat memakan waktu lama, tergantung pada dataset.
    * Sitemaptabledapdataset, penggunaan yang paling umum dari ini adalah untuk menentukan rentang waktu default yang berbeda (relatif terhadap maks (Sitemap) , misalnya, & waktu&gt; = maks (Sitemap) -1day, atau kerabat sekarang, misalnya, & waktu&gt;=now-Sitemap) Sitemap
Ingat bahwa meminta tidak ada variabel data sama dengan menentukan semua variabel data, jadi biasanya Anda hanya dapat menentukan batasan waktu baru.
Contoh:
    ```
        <defaultGraphQuery>&amp;time&gt;=max(time)-1day</defaultGraphQuery>  
    ```
Sitemap
    ```
        <defaultGraphQuery>&amp;time&gt;=now-1day</defaultGraphQuery>  
    ```
#### &lt;dimensiNilaiInMemory & gt;{#dimensionvaluesinmemory} 
* Sitemap ** &lt;Login Login ** Sitemap (Login)   (Login (Login) atau palsu) adalah tag OPTIONAL dan jarang digunakan dalam&lt;dataset&gt; tag untuk setiapEDDGriddataset yang memberitahuERDDAP™di mana untuk menjaga nilai sumber dimensi (juga dikenal sebagaiaxisVariableLogin) Sitemap
    
    * benar = dalam memori (yang lebih cepat tetapi menggunakan lebih banyak memori) 
    * palsu = pada disk (yang lebih lambat tetapi tidak menggunakan memori) 
    
Sitemap
    ```
    <dimensionValuesInMemory>false</dimensionValuesInMemory>  
    ```
Anda hanya boleh menggunakan ini dengan nilai non-standar palsu jika Anda Meme itERDDAP™memiliki banyak dataset dengan dimensi yang sangat besar (e.g., jutaan nilai, misalnya, dalamEDDGridDariAudioFiles dataset) LoginERDDAP's Dalam Gunakan penggunaan memori selalu terlalu tinggi. Lihat Memori: saat ini menggunakan garis di\\[Login\\]/erddap/status.htmluntuk memantauERDDAP™penggunaan memori.
     
#### &lt;fileTableInMemory&gt;{#filetableinmemory} 
* Sitemap ** &lt;Login ** Sitemap (Login)   (benar atau palsu (Login) ) adalah tag OPTIONAL dalam&lt;dataset&gt; tag untuk setiapEDDGridDari File dan EDDTable DariFiles dataset yang memberitahukanERDDAP™di mana untuk menyimpan fileTable (yang memiliki informasi tentang setiap file data sumber) Sitemap
    
    * benar = dalam memori (yang lebih cepat tetapi menggunakan lebih banyak memori) 
    * palsu = pada disk (yang lebih lambat tetapi tidak menggunakan memori) 
    
Sitemap
    ```
    <fileTableInMemory>true</fileTableInMemory>  
    ```
Jika Anda mengatur ini untuk benar untuk setiap dataset, simpan mata di Memori: saat ini menggunakan garis di\\[Login\\]/erddap/status.htmluntuk memastikan bahwaERDDAP™masih memiliki banyak memori gratis.
     
#### &lt;fgFiledc&gt;{#fgdcfile} 
* Sitemap ** &lt;Login ** Sitemap (Login) adalah tag OPTIONAL dalam sebuah&lt;dataset&gt; tag didatasets.xmlSitemapERDDAP™untuk menggunakan file FGDC yang sudah jadi bukanERDDAP™mencoba untuk menghasilkan file. Penggunaan:
```
    <fgdcFile>*fullFileName*</fgdcFile>  
```
     *Sitemap Login* dapat merujuk ke file lokal (suatu tempat pada sistem file server) atau URL dari file jarak jauh.
Sitemap *Sitemap Login* \\="" atau file tidak ditemukan, dataset tidak akan memiliki metadata FGDC. Jadi ini juga berguna jika Anda ingin menekan metadata FGDC untuk dataset tertentu.
Atau, Anda dapat menempatkan&lt;fgdcActive&gt;false&lt;/fgdcActive&gt; dalam setup.xml untuk memberitahuERDDAP™tidak menawarkan metadata FGDC untuk setiap dataset.
     
#### &lt;iso19115 File & gt;{#iso19115file} 
* Sitemap ** &lt;iso19File115&gt; ** Sitemap (#iso19115file) adalah tag OPTIONAL dalam sebuah&lt;dataset&gt; tag didatasets.xmlSitemapERDDAP™untuk menggunakan file ISO 19115 yang sudah dibuat sebelumnya bukanERDDAP™mencoba untuk menghasilkan file. Penggunaan:
    ```
    <iso19115File>*fullFileName*</iso19115File>  
    ```
     *Sitemap Login* dapat merujuk ke file lokal (suatu tempat pada sistem file server) atau URL dari file jarak jauh.
Sitemap *Sitemap Login* \\="" atau file tidak ditemukan, dataset tidak akan memiliki metadata ISO 19115. Jadi ini juga berguna jika Anda ingin menekan metadata ISO 19115 untuk dataset tertentu.
Atau, Anda dapat menempatkan&lt;iso19115Active&gt;false&lt;/iso19115Active&gt; dalam setup.xml untuk memberitahuERDDAP™tidak menawarkan metadata ISO 19115 untuk setiap dataset.
     
#### &lt;Login Sitemap{#matchaxisndigits} 
* Sitemap ** &lt;Login ** Sitemap (Sitemap) adalah tag OPTIONAL dalam sebuahEDDGrid &lt;dataset&gt; tag untukEDDGriddataset yang agregasi, misalnya, agregasi file. Setiap kali dataset diisi ulang,ERDDAP™memeriksa bahwa nilai sumbu dari setiap komponen agregasi sama. Ketepatan pengujian ditentukan oleh[Login](#matchaxisndigits), yang menentukan jumlah total digit yang harus cocok ketika menguji nilai sumbu presisi ganda, 0 - 18 (Login) Sitemap Saat menguji nilai sumbu float, tes dilakukan dengan angka matchAxisNDigits/2. Nilai 18 atau di atas memberitahukanEDDGriduntuk melakukan tes yang tepat. Nilai 0 mengatakanEDDGridtidak melakukan pengujian, yang tidak disarankan, kecuali seperti yang dijelaskan di bawah ini.
    
LoginEDDGridmemungkinkan komponen agregasi untuk memiliki nilai sumbu yang sedikit berbeda, hanya satu set nilai sumbu ditampilkan kepada pengguna. Set adalah dari komponen yang sama yang menyediakan metadata sumber dataset. Misalnya, misalnyaEDDGridDariFiles dataset, yang ditentukan oleh&lt;metadataDari&gt; pengaturan (Login) Sitemap
    
Penggunaan pencocokanAxisNDigits\\=0 sangat diskouraged dalam kebanyakan kasus, karena ternyata semua pemeriksaan. Bahkan pemeriksaan minimal berguna karena memastikan bahwa komponen cocok untuk agregasi. Kami semua menganggap bahwa semua komponen yang cocok, tetapi tidak selalu begitu. Ini adalah tes sanitasi yang penting. Bahkan nilai-nilai matchAxisNDigits1, 2, 3 atau 4 didiskusikan karena nilai sumbu yang berbeda sering menunjukkan bahwa komponen diciptakan (Login) cara yang berbeda dan dengan demikian tidak cocok untuk agregasi.
    
Ada satu kasus di mana menggunakan matchAxisNDigits\\=0 berguna dan direkomendasikan: dengan agregasi file jarak jauh, misalnya, data dalam ember S3. Dalam hal ini, jika dataset menggunakan cacheFromUrl, cacheSizeGB, matchAxisNDigits\\=0, danEDDGridDariFiles sistem untuk[Sitemap Nama file](#aggregation-via-file-names-or-global-metadata)SitemapEDDGridtidak perlu membaca semua file jarak jauh untuk melakukan agregasi. Ini memungkinkan dataset yang dibuat dari data di ember S3 untuk memuat dengan sangat cepat (bertentangan dengan benar-benar lambat jika Meme itEDDGridharus mengunduh dan membaca semua file) Sitemap
    
#### &lt;nThreads&gt;{#nthreads} 
* SitemapERDDAP™versi 2,00, ketika setiap subclass dari EDDTableDariFiles atauEDDGridmembaca data dari sumbernya, dapat membaca satu chunk data (e.g., satu file sumber) Sitemap (dalam satu benang)   (itu default) atau lebih dari satu potong data (Login 2+ file sumber) Sitemap (dalam 2 atau lebih benang) saat memproses setiap permintaan.
     
    * Aturan Thumb:
Untuk sebagian besar dataset pada sebagian besar sistem, gunakan nThreads=1, default. Jika Anda memiliki komputer yang kuat (banyak core CPU, banyak memori) , kemudian mempertimbangkan pengaturan nThreads ke 2, 3, 4, atau lebih tinggi (tetapi tidak pernah lebih dari jumlah core CPU di komputer) untuk dataset yang mungkin menguntungkan:
        
        * Kebanyakan dataset EDDTableFromFiles akan mendapatkan manfaat.
        * Dataset di mana sesuatu yang menyebabkan lag sebelum chunk data sebenarnya dapat diproses akan menguntungkan, misalnya:
            * Login[Sitemap (Login.gz) ](#externally-compressed-files)Login (Login.nc) file, karenaERDDAP™harus menghapus seluruh file sebelum dapat mulai membaca file.
            * Dataset yang digunakan[Login](#cachefromurl)SitemapERDDAP™sering harus mengunduh file sebelum dapat membacanya.
            * Dataset dengan file data yang disimpan pada sistem file paralel berbanding tinggi, karena dapat memberikan lebih banyak data, lebih cepat, saat diminta. Contoh sistem file paralel termasuk[Login](https://en.wikipedia.org/wiki/Non-RAID_drive_architectures)Login[Login](http://www.pnfs.com/)Login[Login](https://en.wikipedia.org/wiki/Gluster)Amazon S3, dan Google Cloud Storage.
                 
        
Sitemap Saat menggunakan nThreads&gt; 1, simpan mata diERDDAPPenggunaan memori 's, penggunaan benang, dan responsif keseluruhan (Login[ERDDAPLogin](/docs/server-admin/additional-information#status-page)) Sitemap Lihat komentar tentang masalah ini di bawah ini.
         
    * Untuk pengaturan dataset tertentu, pengaturan nThreads ini dapat datang dari tempat yang berbeda:
        
        * Sitemapdatasets.xmlchunk untuk dataset memiliki&lt;nThreads&gt; tag (dalam&lt;dataset&gt; tag, bukan sebagai atribut global) dengan nilai &gt;= 1, nilai nThreads digunakan. Jadi, Anda dapat menentukan jumlah yang berbeda untuk setiap dataset.
        * Sitemapdatasets.xmlSitemap&lt;nTableThreads&gt; tag (untuk EDDTable DariFiles dataset) atau&lt;nGridThreads&gt; tag (SitemapEDDGridLogin) dengan nilai &gt;= 1, di luar&lt;dataset&gt; tag, nilai nThreads digunakan.
        * Jika tidak, 1 benang digunakan, yang merupakan pilihan yang aman karena menggunakan jumlah memori terkecil.
             
        
Sitemap[LoginERDDAP™Login](https://coastwatch.pfeg.noaa.gov/erddap/index.html)Kami menggunakan
        &lt;Sitemap 6 Artikel&lt;Sitemap (Ini adalah server yang kuat.) Permintaan yang sulit sekarang mengambil 30% dari waktu sebelumnya.
         
##### Penggunaan Sumber Daya Monitor{#monitor-resource-usage} 
Ketika Anda bereksperimen dengan pengaturan nThreads yang berbeda (dan mungkin membuat permintaan sampel yang sulit untuk AndaERDDAP) Anda dapat memantau penggunaan sumber daya komputer Anda:
* Di Macs, gunakan Finder : Aplikasi : Utilitas : Monitor Aktivitas
* Di Linux, gunakan atas
* Pada Windows 10, gunakan *Sitemap* untuk membuka Manajer Tugas
             
##### Peringatan: Kewajiban yang menurun{#warning-decreased-responsiveness} 
Dalam isolasi,ERDDAP™akan memenuhi permintaan untuk dataset dengan pengaturan nThreads yang lebih tinggi lebih cepat daripada jika nThreads=1. Tapi sementara permintaan itu diproses, permintaan lain dari pengguna lain akan agak ramai dan mendapatkan respons yang lebih lambat. Juga, ketikaERDDAP™menanggapi permintaan yang diberikan, sumber daya komputasi lainnya (e.g., akses drive disk, bandwidth jaringan) mungkin membatasi, terutama dengan pengaturan nThreads yang lebih tinggi. Dengan pengaturan nThreads yang lebih tinggi, responsif sistem keseluruhan akan lebih buruk ketika ada beberapa permintaan yang diproses -- ini dapat sangat menjengkelkan kepada pengguna&#33; Karena ini: tidak pernah menetapkan nThreads ke lebih dari jumlah core CPU di komputer. nThreads=1 adalah pengaturan paling adil karena setiap permintaan (di antara beberapa permintaan simultan) akan mendapatkan pangsa sumber daya komputasi yang sama. Tapi semakin kuat komputer, kurang ini akan menjadi masalah.
         
##### Peringatan: Memori Lebih Tinggi SitemapEDDGridLogin{#warning-higher-memory-use-for-eddgrid-datasets} 
Penggunaan memori sementara permintaan pemrosesan langsung proporsional ke pengaturan nThreads. Aturan yang cukup aman dari thumb adalah: Anda perlu mengatur[ERDDAPPengaturan memori 's](/docs/server-admin/deploy-install#memory)setidaknya 2GB + (2GB \\* nThreads) Sitemap Beberapa permintaan untuk beberapa set data akan membutuhkan lebih banyak memori daripada itu. Misalnya, pengaturan nThreads = 3 untuk setiapEDDGridDataset berarti bahwa pengaturan -Xmx harus setidaknya -Xmx8000M. Jika pengaturan memori lebih besar dari 3/4 memori fisik komputer, menurunkan pengaturan nThreads sehingga Anda dapat menurunkan pengaturan memori.

Penggunaan memori dari permintaan pemrosesan benang ke dataset EDDTable hampir selalu lebih rendah karena file biasanya jauh lebih kecil. Namun, jika dataset EDDTable yang diberikan memiliki banyak (g., &gt;=1 GB) file data, kemudian komentar di atas akan berlaku untuk set data tersebut juga.

Apa pun pengaturan nThreads, simpan mata dekat pada statistik penggunaan memori pada Anda[ERDDAPLogin](/docs/server-admin/additional-information#status-page)Sitemap Anda tidak boleh mendekati untuk memaksimalkan penggunaan memori diERDDAP; jika tidak ada kesalahan dan kegagalan yang serius. Meme it
        
##### Temporarily Set ke 1{#temporarily-set-to-1} 
Jika penggunaan memori saat ini bahkan sedikit tinggi,ERDDAP™akan menetapkan nThreads untuk permintaan ini untuk 1. SitemapERDDAP™mengamati memori ketika memori langka.
         
##### Mengandung Kembali{#diminishing-returns} 
Ada mengurangi kembali untuk meningkatkan pengaturan nThreads: 2 benang akan menjadi cara lebih baik dari 1 (jika kita mengabaikan overclocking dinamis) Sitemap Tapi 3 hanya akan chunk lebih baik dari 2. Dan 4 hanya akan lebih baik dari 3.

Dalam satu tes query yang sulit untuk dataset EDDTable besar, waktu respons menggunakan 1, 2, 3, 4, 5, 6 benang 38, 36, 20, 13, 11 detik. (Sekarang kita menggunakan nTableThreads=6 pada server itu.) 

nThreads=2: Meskipun, sering ada manfaat yang signifikan untuk menentukan nThreads=2 bukan nThreads=1, sering tidak akan membuat banyak perbedaan dalam waktu jam yang diperlukan untuk menanggapi permintaan pengguna yang diberikan. Alasannya adalah: dengan nThreads=1, CPU paling modern akan sering[dinamis overclock](https://en.wikipedia.org/wiki/Intel_Turbo_Boost)  (booster turbo) untuk sementara meningkatkan kecepatan clock CPU. Dengan nThreads=1, satu inti sering akan bekerja pada kecepatan jam yang lebih tinggi dari setiap dua inti jika Anda menggunakan nThreads=2. Terlepas dari, kita masih berpikir lebih baik untuk menggunakan nThreads=2 daripada nThreads=1, karena pengaturan itu akan menghasilkan hasil yang lebih baik dalam berbagai situasi yang lebih luas. Dan tentu saja, jika komputer Anda memiliki core CPU yang cukup, pengaturan nThreads yang lebih tinggi harus menghasilkan hasil yang lebih baik.

Seperti yang dibahas di atas, pengaturan nThreads yang sangat tinggi dapat menyebabkan respons yang lebih cepat terhadap beberapa permintaan, tetapi risiko penurunan keseluruhanERDDAP™responsif dan penggunaan memori tinggi (di atas) sementara permintaan tersebut sedang diproses berarti umumnya bukan ide yang baik.
        
##### Login Login{#cpu-cores} 
Anda tidak boleh mengatur nThreads ke jumlah yang lebih besar dari jumlah core CPU dalam CPU komputer. Pada dasarnya semua CPU modern memiliki beberapa core (g., 2, 4, atau 8) Sitemap Beberapa komputer bahkan memiliki beberapa CPU (e.g., 2 CPU \\ * 4 core / CPU = 8 core CPU) Sitemap Untuk mengetahui berapa banyak CPU dan core komputer yang memiliki:

* Di Macs, gunakan *Kunci opsi* : Menu Apple : Informasi Sistem
* Linux, gunakan cat / proc / cpuinfo
* Pada Windows 10, gunakan *Sitemap* Sitemap Manajer Tugas : Kinerja (Prosesor logika menunjukkan jumlah total inti CPU) 

Ya, sebagian besar prosesor hari ini mengatakan bahwa mereka mendukung 2 benang per inti (Sitemap[Login](https://en.wikipedia.org/wiki/Hyper-threading)) , tetapi 2 benang berbagi sumber daya komputasi, sehingga Anda tidak akan melihat dua kali throughput pada CPU di bawah beban berat. Misalnya, komputer dengan satu CPU dengan 4 core dapat mengklaim untuk mendukung hingga 8 benang, tetapi Anda tidak boleh melebihi nThreads=4 dalam halERDDAPSitemap Sitemap

* Pengaturan nThreads diERDDAP™sesuai permintaan.ERDDAP™sering menangani beberapa permintaan secara bersamaan.
*   ERDDAP™melakukan hal-hal selain permintaan proses, misalnya, reload dataset.
* SitemapERDDAP™menanggapi permintaan yang diberikan, sumber daya komputasi lainnya (e.g., akses drive disk, bandwidth jaringan) dapat membatasi. Semakin tinggi Anda menetapkan nThreads, semakin mungkin bahwa sumber daya lain ini akan dimaksimalkan dan akan memperlambatERDDAPresponsifitas umum.
* Sistem operasi melakukan hal-hal selain lariERDDAPSitemap

Jadi yang terbaik tidak mengatur pengaturan nThreads ke lebih dari jumlah core dalam CPU komputer.
         
##### Mileage Anda Mungkin Login (Login)  {#your-mileage-may-vary-ymmv} 
Hasil pengaturan nThreads yang berbeda akan sangat bervariasi untuk permintaan yang berbeda untuk set data yang berbeda pada sistem yang berbeda. Jika Anda benar-benar ingin tahu efek pengaturan nThreads yang berbeda, menjalankan tes realistis.
         
##### Mengapa nThreads per permintaan?{#why-nthreads-per-request} 
Saya dapat mendengar beberapa dari Anda berpikir "Mengapa nThreads per permintaan? Jika saya pengkodean ini, saya akan menggunakan satu kolam benang pekerja permanen dan antrian pesan untuk kinerja yang lebih baik." Masalah dengan menggunakan satu pool benang pekerja dan antrian pesan adalah bahwa satu permintaan yang sulit akan membanjiri antrian dengan banyak tugas lambat. Itu akan secara efektif memblokirERDDAP™dari bahkan mulai bekerja pada tugas-tugas yang terkait dengan permintaan lain sampai permintaan awal (Sitemap) Sitemap Dengan demikian, bahkan permintaan berikutnya sederhana akan merespons super lambat.ERDDAPPenggunaan nThreads per permintaan mengarah ke penggunaan sumber daya komputasi yang lebih adil.
         
##### nThreads vs. Beberapa Komputer Pekerja{#nthreads-vs-multiple-worker-computers} 
LoginERDDAPSistem nThreads tidak akan pernah seefektifisasi yang benar melalui beberapa komputer pekerja, dengan setiap bekerja pada chunk data, dengan cara yang Hadoop atau Apache Spark biasanya digunakan. Ketika tugasnya benar-benar bersifat paralel/distribusi ke beberapa komputer, setiap komputer dapat menggunakan semua sumber dayanya pada bagian tugasnya. SitemapERDDAPSistem nThreads, masing-masing benang bersaing untuk bandwidth komputer yang sama, drive disk, memori, dll. Sayangnya, sebagian besar dari kita tidak memiliki sumber daya atau dana untuk mengatur atau bahkan menyewa (Layanan Web Amazon (Login) atau Google Cloud Platform (Login) ) grid besar komputer. Juga, tidak seperti database relasional yang diizinkan untuk mengembalikan baris hasil dalam urutan apapun,ERDDAP™membuat janji untuk mengembalikan baris hasil dalam urutan yang konsisten. Kontratraint ini membuatERDDAPimplementasi nThreads kurang efisien. LoginERDDAP's nThreads berguna dalam banyak kasus.

Namun, ada cara untuk membuat Meme itERDDAP™skala untuk menangani sejumlah besar permintaan dengan cepat dengan mengatur[grid / cluster / federasiERDDAPLogin](/docs/server-admin/scaling)Sitemap
         
#### &lt;palet & gt;{#palettes} 
* SitemapERDDAP™versi 2.12,datasets.xmlSitemap&lt;Sitemap&lt;Sitemap&lt;palet&gt; nilai tag dari pesan.xml (atau mengubah pesan.xml nilai jika tag didatasets.xmlkosong) Sitemap Ini memungkinkan Anda mengubah daftar palet yang tersedia sementara Meme itERDDAP™berjalan. Ini juga memungkinkan Anda membuat perubahan dan memilikinya bertahan ketika Anda menginstal versi baruERDDAPSitemap
PERINGATAN: Palet yang tercantum dalamdatasets.xmlharus menjadi superset palet yang tercantum dalam pesan.xml; jika tidakERDDAP™akan membuang pengecualian dan menghentikan pemrosesandatasets.xmlSitemap Ini memastikan bahwa semuaERDDAP™instalasi setidaknya mendukung palet inti yang sama.
Login:ERDDAP™memeriksa bahwa file palet yang ditentukan dalam pesan.xml sebenarnya ada, tetapi tidak memeriksa file palet yang tercantum dalamdatasets.xmlSitemap Ini adalah tanggung jawab Anda untuk memastikan file yang ada.
    
SitemapERDDAP™versi 2.12, jika Anda membuat subdirectory cptfiles diERDDAP™CatalogERDDAP™akan menyalin semua file \\ *.cpt di direktori itu ke\\[Login\\]/webapps/erddap/WEB-INF/cptfiles direktori setiap kaliERDDAP™Sitemap Jadi, jika Anda menempatkan file cpt kustom di direktori itu, file-file tersebut akan digunakan olehERDDAP™tanpa upaya tambahan pada bagian Anda, bahkan ketika Anda menginstal versi baru dariERDDAPSitemap
    
PERINGATAN: Jika Anda menambahkan palet kustom untuk AndaERDDAP™dan Anda memiliki Meme itEDDGridDariErddap dan / atau EDDTableDariErddap dataset di AndaERDDAP™, maka pengguna akan melihat pilihan palet kustom Anda diERDDAP™Membuat halaman web Graph, tetapi jika pengguna mencoba menggunakannya, mereka akan mendapatkan grafik dengan default (biasanya Rainbow) Login Ini karena gambar dibuat oleh remoteERDDAP™yang tidak memiliki palet kustom. Satu-satunya solusi sekarang adalah untuk email jarak jauhERDDAP™administrator untuk menambahkan palet kustom Anda ke nya / nyaERDDAPatau email Chris. John di noaaa.gov untuk meminta palet ditambahkan ke standarERDDAP™Login
    
#### &lt;onChange&gt;{#onchange} 
* Sitemap ** &lt;Login ** Sitemap (Login) adalah tag OPTIONAL dalam sebuah&lt;dataset&gt; tag didatasets.xmlyang menentukan tindakan yang akan dilakukan ketika dataset ini diciptakan (SitemapERDDAP™direstart) dan setiap kali perubahan dataset ini dengan cara apapun.
    * SitemapEDDGridsubclasses, setiap perubahan pada metadata atau ke variabel sumbu (misalnya, titik waktu baru untuk data waktu dekat) dianggap sebagai perubahan, tetapi reloading dataset tidak dianggap perubahan (di) Sitemap
    * Saat ini, untuk subkelas EDDTable, setiap reloading dataset dianggap sebagai perubahan.
    * Saat ini, hanya dua jenis tindakan yang diperbolehkan:
        * Sitemap http://" atau " https://" Login Jika tindakan dimulai dengan " http://" atau " https://" LoginERDDAP™akan mengirimkanHTTP GETmeminta URL yang ditentukan. Jawaban akan diabaikan. Sebagai contoh, URL mungkin memberitahu beberapa layanan web lain untuk melakukan sesuatu.
            * Jika URL memiliki bagian query (setelah "?") , MUST sudah[persen dikodekan](https://en.wikipedia.org/wiki/Percent-encoding)Sitemap Anda perlu mengkodekan karakter khusus dalam batasan (selain '&' awal dan utama'='Sitemap) ke dalam bentuk %HH, di mana HH adalah nilai heksadecimal 2 digit karakter. Biasanya, Anda hanya perlu mengkonversi beberapa karakter tanda baca: %25, & menjadi %26, " menjadi %22,&lt;ke %3C, = menjadi %3D, &gt; menjadi %3E, + menjadi %2B,|ke %7C,\\[ke %5B,\\]menjadi %5D, ruang menjadi %20, dan mengkonversi semua karakter di atas #127 menjadi bentuk UTF-8 mereka dan kemudian kode persen masing-masing byte dari bentuk UTF-8 ke format %HH (meminta programmer untuk membantu) Sitemap
SitemapstationIDDatasheet PDF
SitemapstationID%3E=%2241004%22
Percent encoding umumnya diperlukan ketika Anda mengaksesERDDAPmelalui perangkat lunak selain browser. Browser biasanya menangani pengkodean persen untuk Anda.
Dalam beberapa situasi, Anda perlu persen mengkodekan semua karakter selain A-Za-z0-9\\_-&#33;. ~ Sitemap () \\ *, tetapi masih tidak mengkodekan '&' awal atau utama'='Sitemap
Bahasa pemrograman memiliki alat untuk melakukan ini (misalnya, lihatJavaSitemap[java.net.URLEncoder](https://docs.oracle.com/javase/8/docs/api/java/net/URLEncoder.html)LoginJavaLoginencodeURIComponent()Sitemap ( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent ) ) dan ada
                [situs web yang dikodekan persen / kode untuk Anda](https://www.url-encode-decode.com/)Sitemap
            * Sitemapdatasets.xmladalah file XML, Anda MUST juga & kode SEMUA '&', '&lt;', dan '&gt;' di URL sebagai '&amp;', '&lt;', dan '&gt;' setelah pengkodean persen.
            * Contoh: Untuk URL yang mungkin Anda ketikkan ke browser sebagai:
                 https://www.company.com/webService?department=R%26D&param2=value2   
Anda harus menentukan&lt;onChange&gt; tag melalui (di satu baris) 
            ```
                <onChange>https://www.company.com/webService?department=R%26D&amp;param2=value2</onChange>
            ```
        * Sitemap Login Jika tindakan dimulai dengan "mailto:",ERDDAP™akan mengirim email ke alamat email berikutnya yang menunjukkan bahwa dataset telah diperbarui/diubah.
Contoh:&lt;URL:http://john.smith.com&lt;Login Jika Anda memiliki alasan yang baik untuk Meme itERDDAP™untuk mendukung beberapa jenis tindakan lainnya, mengirimkan email yang menggambarkan apa yang Anda inginkan.
    * Tag ini adalah OPTIONAL. Ada banyak tag ini yang Anda inginkan. Gunakan salah satu tag ini untuk setiap tindakan yang harus dilakukan.
    * Ini adalah analogERDDAP's email/URL sistem berlangganan, tetapi tindakan ini tidak disimpan secara konsisten (i.e., mereka hanya disimpan dalam objek EDD) Sitemap
    * Untuk menghapus berlangganan, cukup hapus&lt;diChange&gt; tag. Perubahan akan dicatat waktu berikutnya dataset diisi ulang.
         
#### &lt;reloadEveryNMinutes&gt;{#reloadeverynminutes} 
* Sitemap ** &lt;Login Login ** Sitemap (Sitemap) adalah tag OPTIONAL dalam sebuah&lt;dataset&gt; tag didatasets.xmlhampir semua jenis dataset yang menentukan seberapa sering dataset harus diisi ulang. Sitemap
    ```
    <reloadEveryNMinutes>60</reloadEveryNMinutes>
    ```
    * Umumnya, dataset yang berubah sering (misalnya, mendapatkan file data baru) harus diisi ulang sering, misalnya, setiap 60 menit.
    * Dataset yang berubah akibatnya harus diisi ulang, misalnya, setiap 1440 menit (Sitemap) atau 10080 menit (Sitemap) Sitemap
    * Tag ini adalah OPTIONAL, tetapi dianjurkan. default adalah 10080.
    * Contohnya:&lt;reloadEveryNMinutes&gt;1440&lt;Login Login
    * Ketika dataset diisi ulang, semua file di Meme it *Login* Login *datasetID* direktori dihapus.
    * Tidak peduli apa ini diatur, dataset tidak akan dimuat lebih sering daripada Meme it&lt;loadDatasetMinutes&gt; (default = 15) , sebagaimana ditentukan[WordPress.org](/docs/server-admin/deploy-install#setupxml)Sitemap Jadi jika Anda ingin set data untuk diisi ulang sangat sering, Anda perlu mengatur kedua reloadEveryNMinutes dan loadDatasets Menit nilai-nilai kecil.
    * Jangan mengatur reloadEveryNMinutes ke nilai yang sama seperti loadDataset Minminutes, karena waktu berlalu kemungkinan (Sitemap) 14:58 atau 15:02, sehingga dataset hanya akan dimuat kembali sekitar setengah dari beban utama. Sebaliknya, gunakan yang lebih kecil (misalnya, 10) Sitemap (misalnya, 20) Login Nilai setiapNMinutes.
    * Terlepas dari reloadEveryNMinutes, Anda dapat secara manual memberitahuERDDAP™untuk memuat ulang dataset tertentu sesegera mungkin melalui[file bendera](/docs/server-admin/additional-information#flag)Sitemap
    * Untuk Programmer Curious -- DalamERDDAP™, reloading semua dataset ditangani oleh dua benang tujuan tunggal. Satu benang memulai reload kecil jika menemukan file bendera atau reload utama (yang memeriksa semua dataset untuk melihat apakah mereka perlu diisi ulang) Sitemap Benang lain melakukan reload aktual dataset satu pada waktu. Benang ini bekerja di latar belakang memastikan bahwa semua set data disimpan terbaru. Benang yang sebenarnya memang reloads mempersiapkan versi baru dari sebuah dataset kemudian tukarkan ke tempat (pada dasarnya menggantikan versi lama secara atom) Sitemap Jadi sangat mungkin bahwa urutan peristiwa berikut terjadi (itu hal yang baik) Sitemap
        
        1.  ERDDAP™mulai mengisi ulang dataset (membuat versi baru) di latar belakang.
        2. Pengguna 'A' membuat permintaan ke dataset.ERDDAP™menggunakan versi dataset saat ini untuk membuat respons. (Itu baik. Tidak ada penundaan untuk pengguna, dan versi dataset saat ini tidak boleh sangat stale.) 
        3.  ERDDAP™menyelesaikan membuat versi reloaded baru dari dataset dan swap yang versi baru menjadi produksi. Semua permintaan baru berikutnya ditangani oleh versi baru dataset. Untuk konsistensi, permintaan pengguna masih diisi dengan versi aslinya.
        4. User 'B' membuat permintaan dataset danERDDAP™menggunakan versi baru dataset untuk membuat respons.
        5. Pengguna secara berkala A dan permintaan B pengguna selesai (Sitemap Selesai pertama, mungkin B selesai pertama) Sitemap
        
Saya dapat mendengar seseorang mengatakan, "Hanya dua ambang&#33; Login Itu lame&#33; Dia harus mengatur bahwa sehingga reloading dataset menggunakan banyak benang yang diperlukan, sehingga semua akan dilakukan lebih cepat dan dengan sedikit atau tidak ada lag. Tidak. Masalahnya adalah bahwa memuat lebih dari satu dataset pada waktu membuat beberapa masalah baru yang keras. Mereka semua perlu diselesaikan atau ditangani. Sistem saat ini bekerja dengan baik dan memiliki masalah yang dapat dikelola (misalnya, potensi untuk lag sebelum bendera diperhatikan) Sitemap (Jika Anda perlu membantu mengelola mereka, lihat kami[bagian untuk mendapatkan dukungan tambahan](/docs/intro#support)Sitemap) Sitemap[Sitemap Login](#updateeverynmillis). sistem bekerja dalam respon benang, sehingga dapat dan menyebabkan beberapa set data diperbarui (tidak beban penuh) Sitemap
##### Proaktif vs Reaktif{#proactive-vs-reactive} 
ERDDAP's sistem reload proaktif -- dataset akan diisi ulang segera setelah reload mereka Waktu setiap menit (i.e., mereka menjadi "pasang", tapi tidak pernah sangat stale) Apakah dataset mendapatkan permintaan dari pengguna atau tidak. LoginERDDAP™dataset selalu terbaru dan siap digunakan. Ini berbeda dengan pendekatan reaktif THREDDS: permintaan pengguna adalah apa yang memberitahu THREDDS untuk memeriksa apakah dataset adalah stale (itu mungkin sangat stale) Sitemap Jika itu stale, THREDDS membuat pengguna menunggu (sering selama beberapa menit) sementara dataset diisi ulang.
        
#### &lt;Sitemap Sitemap{#updateeverynmillis} 
* Sitemap ** &lt;WordPress.org ** Sitemap (Login) adalah tag OPTIONAL dalam sebuah&lt;dataset&gt; tag didatasets.xmlbeberapa jenis dataset yang membantuERDDAP™bekerja dengan dataset yang berubah sangat sering (sering kira-kira setiap detik) Sitemap SitemapERDDAP's reguler, proaktif, [&lt;Login Login (Sitemap) sistem untuk sepenuhnya mengisi ulang setiap dataset, sistem tambahan OPTIONAL ini reaktif (dipicu oleh permintaan pengguna) dan lebih cepat karena itu sangat Meme it (memperbarui informasi yang perlu diperbarui) Sitemap Misalnya, jika permintaanEDDGridDariDap dataset terjadi lebih dari jumlah mili detik yang ditentukan sejak pembaruan terakhir,ERDDAP™akan melihat apakah ada nilai baru untuk kiri (pertama, biasanya"time") dimensi dan, jika demikian, cukup unduh nilai baru sebelum menangani permintaan pengguna. Sistem ini sangat baik dalam menjaga dataset up-to-date dengan tuntutan minimal pada sumber data, tetapi dengan biaya sedikit memperlambat pemrosesan beberapa permintaan pengguna.
    * Untuk menggunakan sistem ini, tambahkan (Sitemap) Sitemap
        ```
        <updateEveryNMillis>1000</updateEveryNMillis>  
        ```
kanan setelah&lt;Sitemap Tag untuk dataset dalamdatasets.xmlSitemap Jumlah mili detik yang Anda tentukan bisa sekecil 1 (untuk memastikan bahwa dataset selalu terbaru) Sitemap Nilai 0 (Login) atau nomor negatif mematikan sistem.
    * Karena sifat inkremental mereka, pembaruan harus selesai dengan sangat cepat, sehingga pengguna tidak perlu menunggu waktu yang lama.
    * Jika permintaan data kedua tiba sebelum pembaruan sebelumnya telah selesai, permintaan kedua tidak akan memicu pembaruan lain.
    * Sepanjang dokumentasi, kami akan mencoba menggunakan kata "reload" secara teratur, reload dataset penuh, dan "perbarui" untuk incremental baru ini, pembaruan parsial.
    * Untuk tujuan pengujian, beberapa diagnostik dicetak ke log.txt jika [&lt;Login (Login) Sitemapdatasets.xmlset ke "semua".
    * Jika Anda menggunakan pembaruan inkcremental dan terutama jika kiri (Login) , misalnya, waktu, sumbu besar, Anda mungkin ingin mengatur&lt;reloadEveryNMinutes&gt; untuk jumlah yang lebih besar (1440?) sehingga pembaruan melakukan sebagian besar pekerjaan untuk menjaga dataset up-to-date, dan beban penuh dilakukan secara tidak sering.
    * Catatan: update baru ini update sistem metadata (misalnya, waktuactual\\_range, waktu\\_coverage\\_end, ...) tetapi tidak memicu perubahan (URL:) atau mengubahRSSLogin (mungkin itu harus...) Sitemap
    * Untuk semua dataset yang menggunakan subkelas[EDDGridLogin](#eddgridfromfiles)Login[Login](#eddtablefromfiles)Sitemap
        *    **Login:** ketika Anda menambahkan file data baru ke dataset dengan menyalinnya ke direktori yangERDDAP™melihat, ada bahaya yang Meme itERDDAP™akan melihat file tertulis sebagian; mencoba membacanya, tetapi gagal karena file tidak lengkap; deklarasikan file menjadi file "buruk" dan menghapusnya (sementara) dari dataset.
Untuk menghindari ini, kami **Login** bahwa Anda menyalin file baru ke direktori dengan nama sementara (Artikel-Nr.: 20150226.ncLogin) yang tidak sesuai dengan file dataset Login (Login.nc) , kemudian mengubah nama file ke nama yang benar (Artikel-Nr.: 20150226.nc) Sitemap Jika Anda menggunakan pendekatan ini,ERDDAP™akan mengabaikan file sementara dan hanya melihat file yang dinamakan dengan benar ketika lengkap dan siap digunakan.
        * Jika Anda memodifikasi datafile yang ada di tempat (misalnya, untuk menambahkan titik data baru) Login&lt;updateEveryNMillis&gt; akan bekerja dengan baik jika perubahan muncul secara atom (Sitemap) dan file selalu menjadi file yang valid. Misalnya, perpustakaan netcdf-java memungkinkan penambahan dimensi tak terbatas "klasik".ncfile v3 untuk dibuat secara atom.
            &lt;updateEveryNMillis&gt; akan bekerja buruk jika file tidak valid saat perubahan dibuat.
        *   &lt;updateEveryNMillis&gt; akan bekerja dengan baik untuk dataset di mana satu atau beberapa file berubah dalam waktu singkat.
        *   &lt;updateEveryNMillis&gt; akan bekerja dengan buruk untuk dataset di mana sejumlah besar file berubah dalam waktu singkat (kecuali perubahan muncul secara atom) Sitemap Untuk dataset ini, lebih baik tidak digunakan&lt;updateEveryNMillis&gt; dan untuk mengatur[Login](/docs/server-admin/additional-information#set-dataset-flag)SitemapERDDAP™untuk memuat ulang dataset.
        *   &lt;WordPress.org tidak memperbarui informasi yang terkait dengan [&lt;subsetVariablesSitemap (Sitemap) Sitemap Biasanya, ini bukan masalah, karenasubsetVariablesmemiliki informasi tentang hal-hal yang tidak berubah sangat sering (misalnya, daftar nama stasiun, lintang, dan garis bujur) Sitemap SitemapsubsetVariablesperubahan data (misalnya, ketika stasiun baru ditambahkan ke dataset) Sitemap[URL](/docs/server-admin/additional-information#set-dataset-flag)untuk dataset untuk memberitahukanERDDAP™untuk memuat ulang dataset. SitemapERDDAP™tidak akan melihat subset baru Meme it Informasi variabel sampai saat berikutnya dataset diisi ulang (&lt;Sitemap
        * Rekomendasi generik kami adalah untuk digunakan:
        ```
            <reloadEveryNMinutes>1440</reloadEveryNMinutes>  
            <updateEveryNMillis>10000</updateEveryNMillis>
        ```
        * Login Di komputer Linux, jika Anda menggunakan&lt;WordPress.org LoginEDDGridDari Files atau kelas EDDTableDariFiles, Anda dapat melihat masalah di mana dataset gagal untuk memuat (sesekali atau konsisten) dengan pesan kesalahan: "IOException: Batas pengguna dari inotify instance mencapai atau terlalu banyak file terbuka". Penyebabnya mungkin bug dalam Meme itJavayang menyebabkan inotify instances untuk tidak sampah yang dikumpulkan. Masalah ini dihindariERDDAP™v1.66 dan lebih tinggi. Jadi solusi terbaik adalah untuk beralih versi terbaru dariERDDAPSitemap
Jika itu tidak memecahkan masalah (yaitu, jika Anda memiliki jumlah dataset yang benar-benar besar menggunakan&lt;updateEveryNMillis&gt;), Anda dapat memperbaiki masalah ini dengan memanggil:
            ```
            sudo sysctl fs.inotify.max\\_user\\_watches=65536  
            sudo sysctl fs.inotify.max\\_user\\_instances=1024  
            sudo sysctl -p  
            ```
Atau, gunakan angka yang lebih tinggi jika masalah berlanjut. Default untuk jam tangan adalah 8192. default untuk instance adalah 128.
    * Anda dapat menempatkan&lt;WordPress.org&lt;Login Sitemapdatasets.xml  (dengan pengaturan lain di dekat bagian atas) untuk mengubah jumlah maksimum perubahan file (default=10) yang akan diproses oleh sistem updateEveryNMillis. Nomor yang lebih besar mungkin berguna untuk dataset di mana sangat penting bahwa mereka disimpan selalu terbaru. Sitemap[WordPress.org](#updatemaxevents)Sitemap
    * Untuk Programmer Curious -- pembaruan inkremental ini, tidak sepertiERDDAPSitemap[Login](#reloadeverynminutes)sistem, terjadi dalam benang permintaan pengguna. Jadi, setiap jumlah dataset dapat memperbarui secara bersamaan. Ada kode (dan kunci) untuk memastikan bahwa hanya satu benang bekerja pada pembaruan untuk setiap dataset tertentu pada saat tertentu. Memungkinkan beberapa pembaruan simultan mudah; memungkinkan beberapa beban penuh simultan akan lebih sulit.
         
#### &lt;sumberCanConstrainStringEQNE&gt;{#sourcecanconstrainstringeqne} 
* Sitemap ** &lt;Login ** Sitemap (Login) adalah tag OPTIONAL dalam EDDTable&lt;dataset&gt; tag didatasets.xmlyang menentukan apakah sumber dapat membatasi variabel String dengan = dan &#33;= operator.
    * Untuk EDDTableDariDapSequence, ini berlaku untuk variabel string urutan luar saja. Diasumsikan bahwa sumber tidak dapat menangani batasan pada variabel urutan dalam.
    * Tag ini adalah OPTIONAL. Nilai valid benar (Login) dan palsu.
    * Untuk EDDTableDariDapSequenceOPeNDAPServer DRDS, ini harus diatur untuk benar (Login) Sitemap
    * Untuk EDDTableDariDapSequence Server Dapper, ini harus diatur ke palsu.
    * Contohnya:
```
        <sourceCanConstrainStringEQNE>true</sourceCanConstrainStringEQNE>  
```
         
#### &lt;sourceCanConstrainStringGTLT&gt;{#sourcecanconstrainstringgtlt} 
* Sitemap ** &lt;WordPress.org ** Sitemap (Login) adalah tag OPTIONAL dalam EDDTable&lt;dataset&gt; tag yang menentukan apakah sumber dapat membatasi variabel String dengan&lt;Login&lt;=, &gt;, dan &gt;= operator.
    * Untuk EDDTableDariDapSequence, ini berlaku untuk variabel string urutan luar saja. Diasumsikan bahwa sumber tidak dapat menangani batasan pada variabel urutan dalam.
    * Nilai valid benar (Login) dan palsu.
    * Tag ini adalah OPTIONAL. default benar.
    * Untuk EDDTableDariDapSequenceOPeNDAPServer DRDS, ini harus diatur untuk benar (Login) Sitemap
    * Untuk EDDTableDariDapSequence Server Dapper, ini harus diatur ke palsu.
    * Contohnya:
```
        <sourceCanConstrainStringGTLT>true</sourceCanConstrainStringGTLT>  
```
         
#### &lt;sourceCanConstrainStringRegex&gt;{#sourcecanconstrainstringregex} 
* Sitemap ** &lt;Login ** Sitemap (Login) adalah tag OPTIONAL dalam EDDTable&lt;dataset&gt; tag yang menentukan apakah sumber dapat membatasi variabel String dengan ekspresi biasa, dan jika demikian, apa operator.
    * Nilai valid adalah "= ~" (LoginDAPSitemap) g (kesalahan didukung oleh banyakDAPLogin) Sitemap (menunjukkan bahwa sumber tidak mendukung ekspresi rutin) Sitemap
    * Tag ini adalah OPTIONAL. default adalah ".
    * Untuk EDDTableDariDapSequenceOPeNDAPServer DRDS, ini harus diatur ke "" (Login) Sitemap
    * Untuk EDDTableDariDapSequence Server Dapper, ini harus diatur ke "" (Login) Sitemap
    * Contohnya:
```
        <sourceCanConstrainStringRegex>=~</sourceCanConstrainStringRegex>  
```
#### &lt;sumberCanDoDistinct & gt;{#sourcecandodistinct} 
* Sitemap ** &lt;Login ** Sitemap (Login) adalah tag OPTIONAL dalam Database EDDTableDari&lt;dataset&gt; tag yang menentukan apakah database sumber harus menangani & distinct () kendala dalam pertanyaan pengguna.
    * Tag ini adalah OPTIONAL. Nilai valid tidak (ERDDAP™menangani berbeda; default) , parsial (sumber menangani berbeda danERDDAP™Meme it) dan ya (sumber menangani berbeda) Sitemap
    * Jika Anda tidak menggunakan danERDDAP™menjalankan memori ketika menangani yang berbeda, gunakan ya.
    * Jika Anda menggunakan ya dan pegangan database sumber berbeda terlalu lambat, gunakan tidak.
    * sebagian memberi Anda terburuk dari keduanya: itu lambat karena penanganan database yang berbeda lambat dan mungkin keluar dari memori dalamERDDAPSitemap
    * Database menafsirkan DISTINCT sebagai permintaan untuk baris yang unik dari hasil, sedangkanERDDAP™menafsirkan itu sebagai permintaan untuk daftar barisan unik hasil. Jika Anda mengatur ini ke sebagian atau ya,ERDDAP™secara otomatis juga memberitahu database untuk mengurutkan hasilnya.
    * Satu perbedaan kecil dalam hasil:
Sitemap|parsial,ERDDAP™akan memilah "" pada awal hasil (sebelum string non-") Sitemap
Dengan ya, database mungkin (Login) "" pada akhir hasil (setelah string non-") Sitemap
Saya akan menebak bahwa ini juga akan mempengaruhi penyortiran kata-kata pendek versus kata-kata yang lebih lama yang dimulai dengan kata pendek. SitemapERDDAP™akan memilah "Simon" sebelum "Simons".
    * Contohnya:
```
        <sourceCanDoDistinct>yes</sourceCanDoDistinct>  
```
         
#### &lt;WordPress.org{#sourcecanorderby} 
* Sitemap ** &lt;Login Login ** Sitemap (Sitemap) adalah tag OPTIONAL dalam Database EDDTableDari&lt;dataset&gt; tag yang menentukan apakah database sumber harus menangani &orderBy (Login) kendala dalam pertanyaan pengguna.
    * Tag ini adalah OPTIONAL. Nilai valid tidak (ERDDAP™LoginorderBy (Login) ; default) , parsial (Pegangan sumberorderByLoginERDDAP™Meme it) dan ya (Pegangan sumberorderBy (Login) ) Sitemap
    * Jika Anda tidak menggunakan danERDDAP™menjalankan memori ketika penangananorderBy (Login) , gunakan ya.
    * Jika Anda menggunakan ya dan pegangan database sumberorderBy (Login) terlalu lambat, gunakan tidak. Meme it
    * sebagian memberi Anda terburuk keduanya: itu lambat karena penanganan databaseorderBy (Login) lambat dan mungkin menjalankan memori dalamERDDAPSitemap
    * Satu perbedaan kecil dalam hasil:
Sitemap|parsial,ERDDAP™akan memilah "" pada awal hasil (sebelum string non-") Sitemap
Dengan ya, database mungkin (Login) "" pada akhir hasil (setelah string non-") Sitemap
Ini juga dapat mempengaruhi penyortiran kata-kata pendek versus kata-kata lebih lama yang dimulai dengan kata pendek. SitemapERDDAP™akan memilah "Simon" sebelum "Simons", tetapi saya tidak yakin tentang bagaimana database akan memilahnya.
    * Contohnya:
```
        <sourceCanOrderBy>yes</sourceCanOrderBy>  
```
         
#### &lt;sumberNeedsExpandedFP\\_EQ&gt;{#sourceneedsexpandedfp_eq} 
* Sitemap ** &lt;sumberNeedsExpandedFP\\_EQ&gt; ** Sitemap (#sourceneedsexpandedfp_eq) adalah tag OPTIONAL dalam EDDTable&lt;dataset&gt; tag yang menentukan (Login (Login) atau palsu) jika sumber membutuhkan bantuan dengan pertanyaan dengan&lt;Login Variabel&gt;=&lt;floatingPointValue&gt; (dan &#33;=, &gt;=,&lt;Login Sitemap
    ```
    <sourceNeedsExpandedFP\\_EQ>false</sourceNeedsExpandedFP\\_EQ>
    ```
    * Untuk beberapa sumber data, pertanyaan numerik yang melibatkan =, &#33;=,&lt;=, atau &gt;= mungkin tidak bekerja seperti yang diinginkan dengan nomor titik mengambang. Misalnya, pencarian longitude=220.2 dapat gagal jika nilai disimpan sebagai 220.20000000000001.
    * Masalah ini muncul karena nomor titik mengambang[tidak diwakili persis dalam komputer](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/)Sitemap
    * Jika sumberNeedsExpandedFP\\_EQ diatur untuk benar (Login) LoginERDDAP™memodifikasi pertanyaan yang dikirim ke sumber data untuk menghindari masalah ini. Selalu aman dan halus untuk meninggalkan set ini untuk benar.
         
#### &lt;sourceUrlLogin{#sourceurl} 
* Sitemap ** &lt;sourceUrlSitemap ** Sitemap (Login) adalah tag umum dalam global dataset&lt;addAttributes&gt; Tag yang menentukan URL yang merupakan sumber data.
    * Contohnya:
    ```
        <sourceUrl>https://oceanwatch.pfeg.noaa.gov/thredds/dodsC/satellite/VH/chla/1day</sourceUrl>  
    ```
         (tetapi letakkan semua di satu baris) 
    * SitemapERDDAP™semua dataset akan memiliki "sourceUrl" dalam atribut global gabungan yang ditunjukkan kepada pengguna.
    * Untuk sebagian besar jenis dataset, tag ini diperlukan. Lihat deskripsi jenis dataset untuk mengetahui apakah hal ini diperlukan atau tidak.
    * Untuk beberapa set data, yang terpisah&lt;sourceUrl&gt; Tag tidak diperbolehkan. Sebaliknya, Anda harus memberikan "sourceUrlSitemap[atribut global](#global-attributes)biasanya di global \\&gt;addAttributes&lt;Sitemap Jika tidak ada URL sumber yang sebenarnya (misalnya, jika data disimpan dalam file lokal) , atribut ini sering hanya memiliki nilai placeholder, misalnya,&lt;nama att="name"&gt; (file lokal) &lt;Login
    * Untuk sebagian besar dataset, ini adalah dasar URL yang digunakan untuk meminta data. Misalnya, misalnyaDAPserver, ini adalah URL yang .dods, .das, .dds, atau .html bisa ditambahkan.
    * Sitemapdatasets.xmladalah file XML, Anda MUST juga mengkodekan '&', '&lt;', dan '&gt;' di URL sebagai '&amp;', '&lt;', '&gt;'.
    * Untuk sebagian besar jenis dataset,ERDDAP™menambahkan aslinyasourceUrl  ("localSourceUrl" dalam kode sumber) Login[atribut global](#global-attributes)  (di mana ia menjadi "publikSourceUrl" dalam kode sumber) Sitemap Ketika sumber data adalah file lokal,ERDDAP™LoginsourceUrlSitemap (file lokal) "untuk atribut global sebagai tindakan pencegahan keamanan. Ketika sumber data adalah database,ERDDAP™LoginsourceUrlSitemap (database) "untuk atribut global sebagai tindakan pencegahan keamanan. Jika beberapa dataset Anda menggunakan non-publiksourceUrlSitemap (biasanya karena komputer mereka berada di DMZ atau di LAN lokal) Anda dapat menggunakan [&lt;Login (Login) Tag untuk menentukan bagaimana mengkonversi lokalsourceUrls ke publiksourceUrlSitemap
    * LoginsourceUrldapat dimulai denganhttp://Loginhttps://, ftp://, dan mungkin prefiks lainnya.httpskoneksi membaca dan memeriksa sertifikat digital sumber untuk memastikan bahwa sumbernya adalah mereka mengatakan mereka. Dalam kasus yang jarang terjadi, cek ini dapat gagal dengan kesalahan "javax.net.ssl.SSLProtocolException: peringatan handshake: unrecognized\\_name". Ini mungkin karena nama domain pada sertifikat tidak cocok dengan nama domain yang Anda gunakan. Anda dapat dan harus membaca rinciansourceUrlSertifikat di browser web Anda, terutama, daftar "DNS Name" di bagian "Subject Alternative Name".
        
Dalam beberapa kasus,sourceUrlAnda dapat menggunakan alias nama domain pada sertifikat. Sitemap
         https://podaac-opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ akan membuang kesalahan ini, tetapi
         https://opendap.jpl.nasa.gov/opendap/allData/ccmp/L3.5a/monthly/flk/ , yang menggunakan nama domain pada sertifikat, tidak akan. Solusi dalam kasus ini adalah karenanya untuk menemukan dan menggunakan nama domain pada sertifikat. Jika Anda tidak dapat menemukan sertifikat, hubungi penyedia data.
        
Dalam kasus lain, nama domain pada sertifikat mungkin untuk kelompok nama. Jika ini terjadi atau masalahnya tidak dapat dipecahkan, silakan email Chris. John di noaaa.gov untuk melaporkan masalah.
         

#### &lt;addAttributes&gt; {#addattributes} 
* Sitemap ** &lt;addAttributesSitemap ** Sitemap (Login) adalah tag OPTIONAL untuk setiap dataset dan untuk setiap variabel yang memungkinkanERDDAPadministrator mengontrol atribut metadata yang terkait dengan dataset dan variabelnya.
    *   ERDDAP™menggabungkan atribut dari sumber dataset (Login) dan "addAttributes"yang Anda mendefinisikandatasets.xml  (yang memiliki prioritas) untuk membuat "kombinedAttributes", yang apaERDDAP™pengguna melihat. Dengan demikian, Anda dapat menggunakanaddAttributesuntuk mendefinisikan ulang nilai-nilai sumberAttributes, tambahkan atribut baru, atau menghapus atribut.
    * Login&lt;addAttributes&gt; Tag tertutup 0 atau lebih ** &lt;Login ** subtag, yang digunakan untuk menentukan atribut individu.
    * Setiap atribut terdiri dari nama dan nilai (yang memiliki jenis data tertentu, misalnya, ganda) Sitemap
    * Hanya ada satu atribut dengan nama yang diberikan. Jika ada lebih, yang terakhir memiliki prioritas.
    * Nilai dapat menjadi nilai tunggal atau daftar nilai yang ditentukan ruang.
    * Login
        * Sitemap&lt;att&gt; subtag dalamaddAttributestidak penting.
        * Login&lt;dit&gt; format subtag adalah
        ```
            <att name="*name*" \\[type="*type*"\\] >*value*</att>
        ```
        * Nama tujuan dari semua atribut MUST dimulai dengan surat (A-Z, a-z) dan MUST hanya mengandung karakter A-Z, a-z, 0-9, atau '\\_'.
        * Sitemap&lt;att&gt; subtag tidak memiliki nilai atau nilai null, atribut itu akan dihapus dari atribut gabungan.
Sitemap&lt;nama att="rows" /&gt; akan menghapus baris dari atribut gabungan.
Sitemap&lt;nama att="coordinates"&gt;null&lt;/att&gt; akan menghapus koordinat dari atribut gabungan.
##### Login Login{#attributetype} 
* [ Nilai tipe OPTIONAL untuk&lt;dit&gt; subtags] (Login) menunjukkan jenis data untuk nilai. Jenis default adalah String. Contoh atribut String adalah:
    ```
    <att name="creator\\_name">NASA/GSFC OBPG</att>
    ```
    * Jenis yang valid untuk nilai tunggal adalah byte (8-bit integer) pendek (16-bit masuk) Login (32-bit masuk) panjang (64-bit masuk) Login (Titik mengambang 32-bit) Sitemap (Titik mengambang 64-bit) , char, dan String. Sitemap
        ```
        <att name="scale\\_factor" type="float">0.1</att>
        ```
Lihat catatan ini tentang Meme it[jenis data char](#char)Sitemap
Lihat catatan ini tentang Meme it[jenis data yang panjang](#long)Sitemap
        
    * Jenis yang valid untuk daftar nilai ruang yang dipisahkan (atau nilai tunggal) adalah byteList, shortList, unsignedShortList, charList, intList, longList, floatList, ganda Sitemap Sitemap
        ```
        <att name="actual\\_range" type="doubleList">10.34 23.91</att>  
        ```
UnsignedShortList memungkinkan Anda menentukan daftar celana pendek yang tidak ditentukan, tetapi mereka akan dikonversi menjadi daftar karakter Unicode yang sesuai (misalnya, "65 67 69" akan dikonversi menjadi "A C E".
Jika Anda menentukan charList, encode karakter khusus (misalnya, ruang, kutipan ganda, backslash,&lt;#32, atau &gt; #127) karena Anda akan mengkodekan mereka di bagian data dari file NCCSV (e.g., ", "\" atau """, "\\\\\", "\\n", "\\u20ac") Sitemap
Tidak ada stringList. Simpan nilai String sebagai String multi-line. Sitemap
        ```
        <att name="history">2011-08-05T08:55:02Z ATAM - made CF-1.6 compliant.  
        2012-04-08T08:34:58Z ATAM - Changed 'height' from double to float.</att>  
                ```
                 
#### Atribut global{#global-attributes} 
* Sitemap ** Atribut global / Global&lt;addAttributesSitemap ** Sitemap (Sitemap) Login
    &lt;addAttributes&gt; adalah tag OPTIONAL dalam&lt;dataset&gt; tag yang digunakan untuk mengubah atribut yang berlaku untuk seluruh dataset.
    
    *    ** Gunakan global&lt;addAttributes&gt; mengubah atribut global dataset. ** ERDDAP™menggabungkan atribut global dari sumber dataset (dataset)** Login **) dan global** addAttributes **yang Anda tentukandatasets.xml  (yang memiliki prioritas) untuk membuat global** Login ** Apa yangERDDAP™pengguna melihat. Dengan demikian, Anda dapat menggunakanaddAttributesuntuk mendefinisikan ulang nilai-nilai sumberAttributes, tambahkan atribut baru, atau menghapus atribut.
    * Sitemap ** &lt;addAttributesSitemap **Sitemap (Login) yang berlaku untuk global dan variabel** &lt;addAttributesSitemap ** Sitemap
    *   [Login](https://www.fgdc.gov/standards/projects/FGDC-standards-projects/metadata/base-metadata/index_html)Login[Mobil 19115-2/19139](https://en.wikipedia.org/wiki/Geospatial_metadata)Login Login SitemapERDDAP™akan otomatis menghasilkan ISO 19115-2/19139 dan FGDC (FGDC-STD-001-1998) File metadata XML untuk setiap dataset menggunakan informasi dari metadata dataset. Sitemap **metadata dataset yang baik mengarah ke baikERDDAP-generasi ISO 19115 dan metadata FGDC. Harap mempertimbangkan untuk meningkatkan metadata dataset Anda (yang merupakan hal yang baik untuk melakukan hal apapun) Sitemap** Sebagian besar atribut metadata dataset yang digunakan untuk menghasilkan metadata ISO 19115 dan FGDC dari[Standar metadata ACDD](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)dan jadi dicatat di bawah ini. Meme it
    * Banyak atribut global yang istimewa di dalamnyaERDDAP™mencari mereka dan menggunakannya dalam berbagai cara. Misalnya, tautan keinfoUrldisertakan di halaman web dengan daftar dataset, dan tempat lain, sehingga pengguna dapat mengetahui lebih lanjut tentang dataset.
    * Ketika pengguna memilih subset data, globalAttributes yang terkait dengan garis bujur variabel, lintang, ketinggian (atau kedalaman) , dan rentang waktu (Sebagai contoh, Southernmost\\_Northing, Northmost\\_Northing, time\\_coverage\\_start, time\\_coverage\\_end) secara otomatis dihasilkan atau diperbarui.
    * Sampel sederhana global&lt;addAttributesSitemap
        ```
        <addAttributes> 
          <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>
          <att name="infoUrl">https://coastwatch.pfeg.noaa.gov/infog/PH\\_ssta\\_las.html</att>
          <att name="institution">NOAA CoastWatch, West Coast Node</att>
          <att name="title">SST, Pathfinder Ver 5.0, Day and Night, Global</att>
          <att name="cwhdf\\_version" />
        </addAttributes>  
        ```
Atribut cwhdf\\_version kosong menyebabkan atribut sumber cwhdf\\_version (Sitemap) untuk dihapus dari daftar atribut akhir, gabungan.
    * Menyediakan informasi ini membantuERDDAP™melakukan pekerjaan yang lebih baik dan membantu pengguna memahami dataset.
Metadata yang baik membuat dataset usable.
Metadata yang tidak memadai membuat dataset tidak berguna.
Silahkan ambil waktu untuk melakukan pekerjaan yang baik dengan atribut metadata.
##### Atribut global khusus diERDDAP™
###### Login{#acknowledgement} 
*   [ **Login** ](#acknowledgement)Login **Login**   (dari[Login](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadata) adalah cara RECOMMENDED untuk mengakui kelompok atau kelompok yang memberikan dukungan (tidak dapat, keuangan) untuk proyek yang membuat data ini. Sitemap
    ```
    <att name="acknowledgment">AVISO</att>
    ```    
Catatan bahwa ACDD 1.0 dan 1.1 menggunakan ejaan "kuisah" (yang merupakan ejaan biasa di AS) , tapi ACDD 1.3 mengubah ini menjadi "kuisah" (yang merupakan ejaan biasa di AS) Sitemap Pemahaman saya adalah bahwa perubahan pada dasarnya adalah kecelakaan dan bahwa mereka pasti tidak mengenali konsekuensi dari perubahan. Apa yang berantakan&#33; Sekarang ada jutaan file data di seluruh dunia yang memiliki "kuat" dan jutaan yang memiliki "kualifikasi". Ini menyoroti folly dari perubahan "sederhana" ke standar, dan menekankan kebutuhan stabilitas dalam standar. Karena ACDD 1.3 (yang merupakan versi ACDD yangERDDAP™Login) mengatakan "kelembapan", itulah yangERDDAP™  (Sitemap Login) Login
     
###### cdm\\_altitude\\_proxy{#cdm_altitude_proxy} 
*   [ **cdm\\_altitude\\_proxy** ](#cdm_altitude_proxy)hanya untuk dataset EDDTable yang tidak memiliki variabel ketinggian atau kedalaman tetapi memiliki variabel yang merupakan proxy untuk ketinggian atau kedalaman (misalnya, tekanan, sigma, botolNumber) Anda dapat menggunakan atribut ini untuk mengidentifikasi variabel tersebut. Sitemap
    ```
    <att name="cdm\\_altitude\\_proxy">pressure</att>  
    ```
Sitemap[cdm\\_data\\_type](#cdm_data_type)adalah Profil atau TrajectoryProfile dan tidak ada altitude atau variabel kedalaman, cdm\\_altitude\\_proxy MUST didefinisikan. Jika cdm\\_altitude\\_proxy didefinisikan,ERDDAP™akan menambahkan metadata berikut ke variabel: \\_Coordinate AxisType=Height dan sumbu=Z.
     
###### cdm\\_data\\_type{#cdm_data_type} 
*   [ **cdm\\_data\\_type** ](#cdm_data_type)  (dari[Login](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadata) adalah atribut global yang menunjukkanUnidata [Model Data Umum](https://www.unidata.ucar.edu/software/netcdf-java/v4.6/CDM/index.html)jenis data untuk dataset. Sitemap
    ```
    <att name="cdm\\_data\\_type">Point</att>  
    ```
CDM masih berkembang dan dapat berubah lagi.ERDDAP™mematuhi terkait dan lebih rinci[Sitemap (Login) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Sitemap[G 1/4](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)konvensi metadata (sebelumnya disebut Konvensi Observasi Titik CF) Sitemap
    * Database[Login](#global-attributes)atau global&lt;addAttributesSitemap MUST termasuk atribut cdm\\_data\\_type. Beberapa jenis dataset (seperti EDDTable Login) akan mengatur ini secara otomatis.
    * SitemapEDDGriddataset, cdm\\_data\\_type options adalah Grid (default dan sejauh jenis yang paling umum untuk Meme itEDDGridLogin) , MovingGrid, Lain, Point, Profil, RadialSweep, TimeSeriesProfile, Swath, Trajectory, dan TrajectoryProfile. SitemapEDDGridtidak memerlukan metadata terkait ditentukan, atau tidak memeriksa bahwa data cocok cdm\\_data\\_type. Itu mungkin akan berubah di masa depan dekat.
    * EDDTable menggunakan cdm\\_data\\_type dengan cara yang ketat, berikut spesifikasi DSG CF daripada CDM, yang karena beberapa alasan belum diperbarui untuk konsisten dengan DSG. Jika metadata dataset tidak sesuai denganERDDAP's cdm\\_data\\_type's (Sitemap) Dataset akan gagal untuk memuat dan akan menghasilkan[Sitemap](#troubleshooting-tips)Sitemap (Itu hal yang baik, dalam arti bahwa pesan kesalahan akan memberitahu Anda apa yang salah sehingga Anda dapat memperbaikinya.) Dan jika data dataset tidak sesuai dengan pengaturan metadata dataset (e.g., jika ada lebih dari satu nilai lintang untuk stasiun tertentu dalam dataset seri) Beberapa permintaan data akan mengembalikan data yang salah dalam respons. Jadi pastikan Anda mendapatkan semua hak ini.
        
Untuk semua dataset ini, dalam Konvensi danMetadata\\_Conventionsatribut global, silakan lihat CF-1.6 (tidak CF-1.0, 1.1, 1.2, 1.3, 1.4, atau 1.5) Karena CF-1.6 adalah versi pertama untuk menyertakan perubahan yang terkait dengan Discrete Sampling Geometry (Login) konvensi.
        *   **ERDDAP™memiliki hubungan sederhana untuk CF DSG** 
        *   ERDDAP™dapat membuat dataset DSG yang valid dari dataset sumber yang sudah merupakan file DSG yang valid (Login) , atau dari dataset sumber yang tidak diatur untuk DSG tetapi dapat dibuat sehingga melalui perubahan metadata (beberapa di antaranyaERDDAP-khusus untuk memberikan pendekatan yang lebih umum untuk menentukan pengaturan DSG) Sitemap
        *   ERDDAP™melakukan banyak tes validitas ketika memuat dataset. Jika dataset yang memiliki cdm\\_data\\_type (SitemapfeatureType) atribut berhasil memuatERDDAP™SitemapERDDAP™mengatakan dataset memenuhi persyaratan DSG (SitemapERDDAP™akan membuang pengecualian menjelaskan masalah pertama yang ditemukan Meme it) Sitemap
PERINGATAN: Dataset yang berhasil dimuat tampaknya memenuhi persyaratan DSG (memiliki kombinasi atribut yang tepat) tapi masih mungkin benar-benar diatur, menyebabkan hasil yang salah dalam.ncLogin.ncFile respons CFMA. (Perangkat lunak ini cerdas dalam beberapa cara dan tak terbatas pada orang lain.) 
        * Ketika Anda melihat metadata dataset diERDDAP™Dataset DSG muncul di Meme itERDDAPFormat internal (raksasa, tabel seperti database) Sitemap Ini bukan dalam satu format DSG (e.g., dimensi dan metadata tidak benar) tetapi informasi yang diperlukan untuk mengobati dataset sebagai dataset DSG berada di metadata (misalnya, cdm\\_data\\_type=TimeSeries dan cdm\\_timeseries\\_variables= *Sitemap* dalam metadata global dan cf\\_role=timeseries\\_id untuk beberapa variabel) Sitemap
        * Jika pengguna meminta subset dataset dalam.ncLogin (Login.ncfile dalam format file Array Bertindak DSG) Sitemap.ncPDF file (Sitemap.ncfile dalam format file Multidimensional DSG) File itu akan menjadi file CF DSG yang valid.
PERINGATAN: Namun, jika dataset diatur dengan benar (sehingga janji yang dibuat oleh metadata tidak benar Meme it) maka file respons akan secara teknis valid tetapi akan salah dalam beberapa cara.
             
###### Facebook Twitter Google Plus Pinterest Email
* Untuk dataset EDDTable, cdm\\_data\\_type options (dan persyaratan terkaitERDDAP) Sitemap
###### Login{#point} 
*   [Login](#point)-- adalah untuk set pengukuran yang diambil pada waktu dan lokasi yang tidak terkait.
    * Seperti semua cdm\\_data\\_types selain lain, Point dataset MUST memiliki longitude, latitude, dan variabel waktu.
###### Profil{#profile} 
*   [Profil](#profile)-- adalah satu set pengukuran semua yang diambil pada satu waktu, di satu lokasi longitude, tetapi pada lebih dari satu kedalaman (atau ketinggian) Sitemap Dataset mungkin merupakan koleksi Profil ini, misalnya, 7 profil dari lokasi yang berbeda. cdm\\_data\\_type tidak menyiratkan koneksi logis antara semua profil.
    
* Salah satu variabel (misalnya, profil\\_number) MUST memiliki atribut variabel cf\\_role=profile\\_id untuk mengidentifikasi variabel yang unik mengidentifikasi profil.
    ```
    <att name="cf\\_role">profile\\_id</att>  
    ```
Jika tidak ada variabel lain yang cocok, pertimbangkan menggunakan variabel waktu.
###### WordPress.org{#cdm_profile_variables} 
* Dataset MUST termasuk globalAttribute[WordPress.org](#cdm_profile_variables), di mana nilainya adalah daftar yang dipisahkan dari variabel yang memiliki informasi tentang setiap profil. Untuk profil yang diberikan, nilai-nilai variabel ini MUST konstan. Sitemap
    ```
    <att name="cdm\\_profile\\_variables">profile\\_number,time,latitude,longitude</att>
    ```
Daftar MUST termasuk variabel cf\\_role=profile\\_id dan semua variabel lainnya dengan informasi tentang profil, dan waktu, lintang dan longitude.
Daftar tidak akan pernah termasuk ketinggian, kedalaman, atau variabel pengamatan.
     

\\[Opini: cdm\\_data\\_type=Profile harus jarang digunakan. Dalam prakteknya, dataset yang diberikan biasanya sebenarnya adalah TimeSeriesProfile (profil pada posisi tetap) atau TrajectoryProfile (profil di sepanjang trajectory) dan harus diidentifikasi dengan benar seperti itu.\\]  
###### Login{#timeseries} 
*   [Login](#timeseries)-- adalah urutan pengukuran (e.g., suhu air laut) diambil pada satu, tetap, latitude, longitude, kedalaman (atau ketinggian) Login (Pikirkan itu sebagai "stasiun".) Dataset dapat menjadi koleksi TimeSeries ini, misalnya, urutan dari masing-masing dari 3 lokasi yang berbeda.
    * Salah satu variabel (misalnya, stasiun\\_id) MUST memiliki atribut variabel cf\\_role=timeseries\\_id untuk mengidentifikasi variabel yang unik mengidentifikasi stasiun.
        ```
        <att name="cf\\_role">timeseries\\_id</att>
        ```
###### cdm\\_timeseries\\_variables{#cdm_timeseries_variables} 
* Dataset MUST termasuk globalAttribute[cdm\\_timeseries\\_variables](#cdm_timeseries_variables)Di mana nilainya adalah daftar yang dipisahkan dari variabel yang memiliki informasi tentang setiap stasiun. Untuk stasiun tertentu, nilai-nilai variabel ini MUST konstan. Sitemap
    ```
    <att name="cdm\\_timeseries\\_variables">station\\_id,station\\_type,latitude,longitude</att>
    ```
Daftar MUST termasuk cf\\_role=timeseries\\_id variabel dan semua variabel lainnya dengan informasi tentang stasiun, yang hampir selalu termasuk keran dan longitude (dan ketinggian atau kedalaman, jika ada) Sitemap
Daftar tidak akan pernah mencakup waktu atau variabel pengamatan.
* Untuk beberapa buoys moored, dataset mungkin memiliki dua set lintang dan variabel longitude:
    1. Satu pasang nilai latitude dan longitude yang konstan (i.e., lokasi tetap pelembab) Sitemap SitemapERDDAP™, memberikan variabel inidestinationNames dari latitude dan longitude, dan termasuk variabel ini dalam daftar cdm\\_timeseries\\_variables.
    2. Nilai latitude dan longitude yang tepat yang terkait dengan setiap observasi. SitemapERDDAP™, memberikan variabel ini berbedadestinationNameLogin (Sitemap Login) dan tidak termasuk variabel ini dalam daftar cdm\\_timeseries\\_variables.
Alasan untuk ini adalah: dari perspektif teoritis, untuk dataset TimeSeries DSG, lintang dan longitude (dan ketinggian atau kedalaman, jika ada) lokasi stasiun MUST konstan.
###### Profil{#timeseriesprofile} 
*   [Profil](#timeseriesprofile)-- adalah untuk urutan profil yang diambil di satu lokasi longitude tetap, lintang. Setiap profil adalah satu set pengukuran yang diambil pada beberapa ketinggian atau kedalaman. Dataset mungkin merupakan koleksi dari TimeSeriesProfil ini, misalnya, urutan profil yang diambil pada setiap 12 lokasi yang berbeda.
    * Salah satu variabel (misalnya, stasiun\\_id) MUST memiliki atribut variabel cf\\_role=timeseries\\_id untuk mengidentifikasi variabel yang unik mengidentifikasi stasiun.
    ```
        <att name="cf\\_role">timeseries\\_id</att>
    ```
    * Salah satu variabel (misalnya, profil\\_number) MUST memiliki atribut variabel cf\\_role=profile\\_id untuk mengidentifikasi variabel yang unik mengidentifikasi profil.
        ```
        <att name="cf\\_role">profile\\_id</att>  
        ```
         (Profil yang diberikan \\_id hanya harus unik untuk waktu yang diberikan \\_id.) Jika tidak ada variabel lain yang cocok, pertimbangkan menggunakan variabel waktu.
    * Dataset MUST mencakup cdm\\_timeseries\\_variables globalAttribute cdm\\_timeseries\\_variables, di mana nilainya adalah daftar variabel koma-separated yang memiliki informasi tentang setiap stasiun. Untuk stasiun tertentu, nilai-nilai variabel ini MUST konstan. Sitemap
        ```
        <att name="cdm\\_timeseries\\_variables">station\\_id,station\\_type,latitude,longitude</att>
        ```
Daftar MUST termasuk cf\\_role=timeseries\\_id variabel dan semua variabel lainnya dengan informasi tentang stasiun, yang hampir selalu termasuk lintang dan longitude.
Daftar tidak akan pernah termasuk waktu, ketinggian, kedalaman, atau variabel pengamatan.
    * Dataset MUST mencakup cdm\\_profile\\_variables globalAttribute cdm\\_profile\\_variables, dimana nilainya adalah daftar koma-separated variabel yang memiliki informasi tentang setiap profil. Untuk profil yang diberikan, nilai-nilai variabel ini MUST konstan. Sitemap
        ```
        <att name="cdm\\_profile\\_variables">profile\\_number,time</att>
        ```
Daftar MUST termasuk variabel cf\\_role=profile\\_id dan semua variabel lainnya dengan informasi tentang profil, yang hampir selalu mencakup waktu.
Daftar tidak akan pernah termasuk lintang, bujur, ketinggian, kedalaman, atau variabel pengamatan.
###### Login{#trajectory} 
*   [Login](#trajectory)-- adalah urutan pengukuran yang diambil di sepanjang lintasan (jalan melalui ruang dan waktu)   (misalnya laut\\_water\\_suhu diambil oleh kapal karena bergerak melalui air) Sitemap Dataset mungkin koleksi Trajectories ini, misalnya, urutan dari masing-masing 4 kapal yang berbeda.
    * Salah satu variabel (misalnya, kapal\\_id) MUST memiliki atribut cf\\_role=trajectory\\_id untuk mengidentifikasi variabel yang unik mengidentifikasi trajectories.
        ```  
        <att name="cf\\_role">trajectory\\_id</att>
        ```
###### WordPress.org{#cdm_trajectory_variables} 
* Dataset MUST termasuk globalAttribute[WordPress.org](#cdm_trajectory_variables), di mana nilainya adalah daftar yang dipisahkan dari variabel yang memiliki informasi tentang setiap trajectory. Untuk trajectory yang diberikan, nilai-nilai variabel ini MUST konstan. Sitemap
    ```
    <att name="cdm\\_trajectory\\_variables">ship\\_id,ship\\_type,ship\\_owner</att>
    ```
Daftar MUST termasuk cf\\_role=trajectory\\_id variabel dan semua variabel lainnya dengan informasi tentang trajectory.
Daftar tidak akan pernah termasuk waktu, kelintangan, longitude, atau variabel pengamatan.
###### Catalog{#trajectoryprofile} 
*   [Catalog](#trajectoryprofile)-- adalah urutan profil yang diambil sepanjang lintasan. Dataset mungkin merupakan koleksi Profil Trajectory ini, misalnya, urutan profil yang diambil oleh 14 kapal yang berbeda.
    * Salah satu variabel (misalnya, kapal\\_id) MUST memiliki atribut variabel cf\\_role=trajectory\\_id untuk mengidentifikasi variabel yang unik mengidentifikasi trajectories.
        ``` 
        <att name="cf\\_role">trajectory\\_id</att>
        ```
    * Salah satu variabel (misalnya, profil\\_number) MUST memiliki atribut variabel cf\\_role=profile\\_id untuk mengidentifikasi variabel yang unik mengidentifikasi profil.
        ```
        <att name="cf\\_role">profile\\_id</att>  
        ```
         (Profil yang diberikan \\_id hanya harus unik untuk trajectory yang diberikan \\_id.) Jika tidak ada variabel lain yang cocok, pertimbangkan menggunakan variabel waktu.
    * Dataset MUST mencakup cdm\\_trajectory\\_variables globalAttribute cdm\\_trajectory\\_variables, dimana nilainya adalah daftar koma-separated variabel yang memiliki informasi tentang setiap trajectory. Untuk trajectory yang diberikan, nilai-nilai variabel ini MUST konstan. Sitemap
        ```
        <att name="cdm\\_trajectory\\_variables">ship\\_id,ship\\_type,ship\\_owner</att>
        ```
Daftar MUST termasuk cf\\_role=trajectory\\_id variabel dan semua variabel lainnya dengan informasi tentang trajectory.
Daftar tidak akan pernah menyertakan variabel yang berkaitan dengan profil, waktu, lintang, longitude, atau variabel pengamatan.
    * Dataset MUST mencakup cdm\\_profile\\_variables globalAttribute cdm\\_profile\\_variables, dimana nilainya adalah daftar koma-separated variabel yang memiliki informasi tentang setiap profil. Untuk profil yang diberikan, nilai-nilai variabel ini MUST konstan. Sitemap
        ```
        <att name="cdm\\_profile\\_variables">profile\\_number,time,latitude,longitude</att>
        ```
Daftar MUST termasuk variabel cf\\_role=profile\\_id dan semua variabel lainnya dengan informasi tentang profil, yang hampir selalu mencakup waktu, lintang dan longitude.
Daftar tidak akan pernah termasuk ketinggian, kedalaman, atau variabel pengamatan.
###### Sitemap{#other} 
*   [Sitemap](#other)- tidak memiliki persyaratan. Gunakan jika dataset tidak sesuai dengan salah satu opsi lain, tidak dapat, jika dataset tidak termasuk lintang, bujur dan variabel waktu.
     
###### Catatan terkait{#related-notes} 
* Semua dataset EDDTable dengan cdm\\_data\\_type selain "Other" MUST memiliki longitude, latitude, dan variabel waktu.
* Dataset dengan profil MUST memiliki variabel ketinggian, variabel kedalaman, atau[cdm\\_altitude\\_proxy](#cdm_altitude_proxy)variabel.
* Jika Anda tidak dapat membuat dataset mematuhi semua persyaratan untuk cdm\\_data\\_type yang ideal, gunakan "Point" (yang memiliki beberapa persyaratan) atau "Other" (yang tidak memiliki persyaratan) Sitemap
* Informasi ini digunakan olehERDDAP™dalam berbagai cara, misalnya, tetapi sebagian besar untuk membuat.ncfile CF (.ncfile yang comply dengan Representasi Array yang terus-menerus terkait dengan cdm dataset\\_data\\_type) Login.ncfile CFMA (.ncfile yang sesuai dengan Multidimensional Array Representasi yang terkait dengan cdm dataset\\_data\\_type) sebagaimana ditentukan[Sitemap (Login) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Sitemap[Login](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)konvensi metadata, yang sebelumnya bernama "CF Point Observasi Konvensi".
* Login Untuk dataset ini, pengaturan yang benar untuk[subsetVariables](#subsetvariables)biasanya kombinasi dari semua variabel yang tercantum dalam atribut cdm\\_...\\_variables. Sebagai contoh, untuk TimeSeriesProfile, gunakan cdm\\_timeseries\\_variables plus cdm\\_profile\\_variables.
###### contributor\\_name {#contributor_name} 
*   [ **contributor\\_name** ](#contributor_name)  (dari[Login](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadata) adalah cara RECOMMENDED untuk mengidentifikasi seseorang, organisasi, atau proyek yang berkontribusi pada dataset ini (misalnya, pencipta asli data, sebelum diproses ulang oleh pencipta data ini) Sitemap Sitemap
    ```
        <att name="contributor\\_name">NOAA OceanWatch - Central Pacific</att>  
    ```
Jika "kontribusi" tidak benar-benar berlaku untuk dataset, omit atribut ini. Dibandingkan[creator\\_name](#creator_name), ini kadang-kadang lebih fokus pada sumber pendanaan.
###### contributor\\_role {#contributor_role} 
*   [ **contributor\\_role** ](#contributor_role)  (dari[Login](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadata) adalah cara RECOMMENDED untuk mengidentifikasi peran[contributor\\_name](#creator_name)Sitemap Sitemap
    ```
        <att name="contributor\\_role">Source of Level 2b data</att>  
    ```
Jika "kontribusi" tidak benar-benar berlaku untuk dataset, omit atribut ini.
###### Login{#conventions} 
*   [ **Login** ](#conventions)  (dari[Login](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)Metadata) adalah RECOMMENDED STRONGLY. (Hal ini mungkin diperlukan di masa depan.) Nilai adalah daftar standar metadata yang dipisahkan oleh komma yang mengikuti dataset ini. Contoh:
    ```
    <att name="Conventions">COARDS, CF-1.6, ACDD-1.3</att>  
    ```
Konvensi metadata umum digunakan dalamERDDAP™Sitemap
    
    *   [COARDSLogin](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)adalah prekursor ke CF.
    *   [Iklim dan Prakiraan (Login) Login](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)adalah sumber banyak atribut yang disarankan dan diperlukan dalamERDDAPSitemap Versi saat ini CF diidentifikasi sebagai "CF-1.6".
    * LoginNetCDFKonvensi Menarik untuk Penemuan Dataset (Login) adalah sumber banyak atribut yang disarankan dan diperlukan dalamERDDAPSitemap Versi 1.0 asli ACDD (karya yang brilian oleh Ethan Davis) mengidentifikasi[UnidataDataset Discovery v1.0](https://wiki.esipfed.org/ArchivalCopyOfVersion1)Saat ini (Juni 2015) 1.3 versi ACDD diidentifikasi sebagai[Login](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Sitemap Jika dataset Anda telah menggunakanUnidataDataset Discovery v1.0, kami mendorong Anda untuk[beralih dataset Anda untuk menggunakan ACDD-1.3](#switch-to-acdd-13)Sitemap
    
Jika dataset Anda mengikuti beberapa standar metadata tambahan, tambahkan nama ke daftar CSV dalam atribut Konvensi.
###### coverage\\_content\\_type {#coverage_content_type} 
*   [ **coverage\\_content\\_type** ](#coverage_content_type)  (dari[ISO 19115](https://en.wikipedia.org/wiki/Geospatial_metadata)Metadata) adalah cara RECOMMENDED untuk mengidentifikasi jenis data gridded (SitemapEDDGridLogin) Sitemap Sitemap
    ```
    <att name="coverage\\_content\\_type">modelResult</att>  
    ```
Satu-satunya nilai yang diperbolehkan adalah informasi tambahan, gambar, modelResult, fisik Login (default ketika ISO 19115 metadata dihasilkan) , kualitasInformasi, referensiInformasi, dan thematicClassification. (Jangan gunakan tag ini untuk dataset EDDTable.)   
###### creator\\_name {#creator_name} 
*   [ **creator\\_name** ](#creator_name)  (dari[Login](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadata) adalah cara RECOMMENDED untuk mengidentifikasi orang, organisasi, atau proyek (jika bukan orang atau organisasi tertentu) yang paling bertanggung jawab atas penciptaan (atau proses ulang terbaru) data ini. Sitemap
    ```
    <att name="creator\\_name">NOAA NMFS SWFSC ERD</att>  
    ```
Jika data diproses secara luas (misalnya, data satelit dari level 2 hingga level 3 atau 4) Biasanya reprocessor terdaftar sebagai pencipta dan pencipta asli terdaftar melalui[contributor\\_name](#contributor_name)Sitemap Dibandingkan[Login](#project), ini lebih fleksibel, karena dapat mengidentifikasi seseorang, organisasi, atau proyek.
###### creator\\_email {#creator_email} 
*   [ **creator\\_email** ](#creator_email)  (dari[Login](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadata) adalah cara RECOMMENDED untuk mengidentifikasi alamat email (diformat dengan benar) yang menyediakan cara untuk menghubungi pencipta. Sitemap
    ```
    <att name="creator\\_email">erd.data@noaa.gov</att>  
    ```
###### creator\\_url {#creator_url} 
*   [ **creator\\_url** ](#creator_url)  (dari[Login](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadata) adalah cara RECOMMENDED untuk mengidentifikasi URL untuk organisasi yang membuat dataset, atau URL dengan informasi pencipta tentang dataset ini (tapi itu lebih tujuan Meme it[infoUrl](#infourl)) Sitemap Sitemap
    ```
    <att name="creator\\_url">https://www.pfeg.noaa.gov</att>  
    ```
###### date\\_created {#date_created} 
*   [ **date\\_created** ](#date_created)  (dari[Login](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadata) adalah cara RECOMMENDED untuk mengidentifikasi tanggal di mana data pertama diciptakan (misalnya, diproses menjadi bentuk ini) ISO 8601 format. Sitemap
    ```
    <att name="date\\_created">2010-01-30</att>  
    ```
Jika data secara berkala ditambahkan ke dataset, ini adalah tanggal pertama bahwa data asli tersedia.
###### date\\_modified {#date_modified} 
*   [ **date\\_modified** ](#date_modified)  (dari[Login](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadata) adalah cara RECOMMENDED untuk mengidentifikasi tanggal di mana data terakhir dimodifikasi (misalnya, ketika kesalahan diperbaiki atau ketika data terbaru ditambahkan) ISO 8601 format. Sitemap
    ```
    <att name="date\\_modified">2012-03-15</att>  
    ```
###### date\\_issued {#date_issued} 
*   [ **date\\_issued** ](#date_issued)  (dari[Login](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadata) adalah cara RECOMMENDED untuk mengidentifikasi tanggal di mana data pertama dibuat tersedia untuk orang lain, dalam format ISO 8601, misalnya, 2012-03-15. Sitemap
    ```
    <att name="date\\_issued">2010-07-30</att>  
    ```
Misalnya, dataset mungkin memiliki[date\\_created](#date_created)2010-01-30, tapi hanya membuat publik tersedia 2010-07-30.date\\_issuedkurang umum digunakan daripadadate\\_createdLogindate\\_modifiedSitemap Sitemapdate\\_issueddiasumsikan sama dengan Meme itdate\\_createdSitemap
###### SitemapdrawLandMask {#global-drawlandmask} 
*   [ **drawLandMask** ](#global-drawlandmask)Login Ini adalah atribut global OPTIONAL yang digunakan olehERDDAP™  (dan tidak ada standar metadata) yang menentukan nilai default untuk opsi "Draw Land Mask" pada formulir Grafik Membuat Dataset ( *datasetID* Login) dan untuk parameter &.land dalam URL meminta peta data. Sitemap
    ```
    <att name="drawLandMask">over</att>  
    ```
Sitemap[drawLandMaskSitemap](#drawlandmask)Sitemap
###### featureType {#featuretype} 
*   [ **featureType** ](#featuretype)  (dari[Login](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)Metadata) adalah IGNORED dan/atau REPLACED. Jika dataset[cdm\\_data\\_type](#cdm_data_type)sesuai,ERDDAP™akan secara otomatis menggunakannya untuk membuat Meme itfeatureTypeLogin Jadi tidak perlu untuk menambahkannya. Meme it
    
Namun, jika Anda menggunakan[Sitemap](#eddtablefromnccffiles)untuk membuat dataset dari file yang mengikuti[Login Sitemap (Login) Sitemap](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)file itu sendiri harus memiliki Meme itfeatureTypedidefinisikan dengan benar, sehingga Meme itERDDAP™dapat membaca file dengan benar. Itu adalah bagian dari persyaratan CF DSG untuk jenis file itu.
     
###### Login{#history} 
*   [ **Login** ](#history)  (dari[Login](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)Login[Login](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)standar metadata) adalah atribut global multi-line String yang direkomendasikan dengan garis untuk setiap langkah pemrosesan bahwa data telah mengalami. Sitemap
    ```
    <att name="history">2011-08-05T08:55:02Z CMOR: Rewrote data to comply with CF standards.  
    2012-04-08T08:34:58Z CMOR: Converted 'height' type from 'd' to 'f'.</att>
    ```
    * Idealnya, setiap baris memiliki ISO 8601:2004 (Login) Sitemap (misalnya, 2011-08-05T08:55:02Z) diikuti oleh deskripsi langkah pemrosesan.
    *   ERDDAP™menciptakan ini jika tidak ada. Meme it
    * Jika sudah ada,ERDDAP™akan menerapkan informasi baru ke informasi yang ada.
    * sejarah penting karena memungkinkan klien untuk mundur ke sumber data asli.
###### infoUrl {#infourl} 
*   [ **infoUrl** ](#infourl)adalah atribut global yang dapat disesuaikan dengan URL halaman web dengan informasi lebih lanjut tentang dataset ini (biasanya di situs web lembaga sumber) Sitemap Sitemap
    ```
    <att name="infoUrl">http://www.globec.org/</att>
    ```
    * Database[Login](#global-attributes)atau global&lt;addAttributesSitemap MUST termasuk atribut ini.
    *   infoUrlpenting karena memungkinkan klien untuk mengetahui lebih lanjut tentang data dari sumber aslinya.
    *   ERDDAP™menampilkan tautan keinfoUrlpada Formulir Akses Data yang ditetapkan ( *datasetID* Login) Membuat halaman web Graph ( *datasetID* Login) , dan halaman web lainnya.
    * Jika URL memiliki bagian query (setelah "?") , MUST sudah[persen dikodekan](https://en.wikipedia.org/wiki/Percent-encoding)Sitemap Anda perlu mengkodekan karakter khusus dalam batasan (selain '&' awal dan utama'='jika ada) ke dalam bentuk %HH, di mana HH adalah nilai heksadecimal 2 digit karakter. Biasanya, Anda hanya perlu mengkonversi beberapa karakter tanda baca: %25, & menjadi %26, " menjadi %22,&lt;ke %3C, = menjadi %3D, &gt; menjadi %3E, + menjadi %2B,|ke %7C,\\[ke %5B,\\]menjadi %5D, ruang menjadi %20, dan mengkonversi semua karakter di atas #127 menjadi bentuk UTF-8 mereka dan kemudian kode persen masing-masing byte dari bentuk UTF-8 ke format %HH (meminta programmer untuk membantu) Sitemap
SitemapstationIDDatasheet PDF
SitemapstationID%3E=%2241004%22
Percent encoding umumnya diperlukan ketika Anda mengaksesERDDAPmelalui perangkat lunak selain browser. Browser biasanya menangani pengkodean persen untuk Anda.
Dalam beberapa situasi, Anda perlu persen mengkodekan semua karakter selain A-Za-z0-9\\_-&#33;. ~ Sitemap () \\ *, tetapi masih tidak mengkodekan '&' awal atau utama'='Sitemap
Bahasa pemrograman memiliki alat untuk melakukan ini (misalnya, lihatJavaSitemap[java.net.URLEncoder](https://docs.oracle.com/javase/8/docs/api/java/net/URLEncoder.html)  
LoginJavaLoginencodeURIComponent()Sitemap ( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent ) ) dan ada
        [situs web yang dikodekan persen / kode untuk Anda](https://www.url-encode-decode.com/)Sitemap
    * Sitemapdatasets.xmladalah file XML, Anda MUST juga & kode SEMUA '&', '&lt;', dan '&gt;' di URL sebagai '&amp;', '&lt;', dan '&gt;' setelah pengkodean persen.
    *   infoUrlunikERDDAPSitemap Tidak dari standar metadata apa pun.
###### Login{#institution} 
*   [ **Login** ](#institution)  (dari[Login](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)Login[Login](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)standar metadata) adalah atribut global REQUIRED dengan versi singkat dari nama institusi yang merupakan sumber data ini (biasanya anonim, biasanya&lt;20 karakter). Sitemap
    ```
    <att name="institution">NASA GSFC</att>
    ```
    * Database[Login](#global-attributes)atau global&lt;addAttributesSitemap MUST termasuk atribut ini.
    *   ERDDAP™menampilkan daftar dataset. Jika nama institusi di sini lebih dari 20 karakter, hanya 20 karakter pertama akan terlihat dalam daftar set data (tetapi seluruh institusi dapat dilihat dengan menempatkan kursor mouse atas ikon "?" yang berdekatan) Sitemap
    * Jika Anda menambahkan institusi ke daftar&lt;categoryAttributesSitemap SitemapERDDAPSitemap[WordPress.org](/docs/server-admin/deploy-install#setupxml)file, pengguna dapat dengan mudah menemukan dataset dari institusi yang sama melaluiERDDAP's "Pilihan untuk Dataset oleh Kategori" di halaman rumah.
###### Sitemap{#keywords} 
*   [ **Sitemap** ](#keywords)  (dari[Login](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadata) adalah daftar kata-kata dan frasa pendek yang direkomendasikan (Sitemap[Login Kata kunci](https://wiki.earthdata.nasa.gov/display/CMR/GCMD+Keyword+Access)) yang menggambarkan dataset dengan cara umum, dan tidak asumsi pengetahuan lain dari dataset (misalnya, untuk data lautografi, termasuk laut) Sitemap Sitemap
    ```
    <att name="keywords">ano, circulation, coastwatch, currents, derived, Earth Science &gt; Oceans &gt; Ocean Circulation &gt; Ocean Currents, eastward, eastward\\_sea\\_water\\_velocity, experimental, hf radio, meridional, noaa, northward, northward\\_sea\\_water\\_velocity, nuevo, ocean, oceans, radio, radio-derived, scan, sea, seawater, velocity, water, zonal</att>  
    ```
Sitemapdatasets.xmladalah dokumen XML, karakter &,&lt;, dan &gt; dalam atribut seperti kata kunci (e.g., karakter &gt; kata kunci ilmu GCMD) harus dikodekan sebagai &amp;,&lt;, dan &gt;, masing-masing.
Ketika dataset dimuatERDDAPLogin
    
    * "Earth Science &gt; " ditambahkan ke awal dari kata kunci GCMD apa pun yang kekurangannya.
    * Kata kunci GCMD dikonversi ke Kasus Judul (i.e., huruf pertama dimodalkan) Sitemap
    * Kata kunci diatur kembali ke urutan yang diurutkan dan karakter garis baru dihapus.
     
###### keywords\\_vocabulary {#keywords_vocabulary} 
*   [ **keywords\\_vocabulary** ](#keywords_vocabulary)  (dari[Login](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadata) adalah atribut RECOMMENDED: jika Anda mengikuti pedoman untuk kata-kata / frasa dalam atribut kata kunci Anda (Contohnya, Kata kunci Sains GCMD) Nama panduan di sini. Meme it Sitemap
    ```
    <att name="keywords\\_vocabulary">GCMD Science Keywords</att>  
    ```
###### Login{#license} 
*   [ **Login** ](#license)  (dari[Login](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadata) adalah atribut global STRONGLY RECOMMENDED dengan batasan lisensi dan/atau penggunaan. Sitemap
    ```
    <att name="license">\\[standard\\]</att>
    ```
    * Sitemap\\[Sitemap\\]" terjadi pada nilai atribut, itu akan diganti oleh standarERDDAP™lisensi dari&lt;standarLicense&gt; tag dalamERDDAPSitemap
        \\[Login\\]/webapps/erddap/WEB-INF/classes/gov/noa/pfel/erddap/util/messages.xml file.
         
###### Metadata\\_Conventions {#metadata_conventions} 
*   [ **Metadata\\_Conventions** ](#metadata_conventions)adalah dari yang disebutkan[WCDMA 1.0](https://wiki.esipfed.org/ArchivalCopyOfVersion1)  (yang diidentifikasiMetadata\\_ConventionsSitemapUnidataDataset Discovery v1.0") standar metadata. Nilai atribut adalah daftar konvensi metadata yang dipisahkan oleh dataset ini.
Jika dataset menggunakan ACDD 1.0, atribut ini STRONGLY RECOMMENDED, misalnya,
    ```
    <att name="Metadata\\_Conventions">COARDS, CF-1.6, Unidata Dataset Discovery v1.0</att>  
    ```
LoginERDDAP™Sekarang merekomendasikan ACDD-1.3. Jika Anda memiliki[beralih dataset Anda untuk menggunakan ACDD-1.3](#switch-to-acdd-13)PenggunaanMetadata\\_ConventionsDISCOURAGED STRONGLY: hanya menggunakan [&lt;Login (Login) Sitemap
###### processing\\_level {#processing_level} 
*   [ **processing\\_level** ](#processing_level)  (dari[Login](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadata) adalah deskripsi teks yang direproduksi dari pemrosesan (Sitemap[Tingkat pemrosesan data satelit NASA](https://en.wikipedia.org/wiki/Remote_sensing#Data_processing_levels), misalnya, Tingkat 3) atau tingkat kontrol kualitas (misalnya, Kualitas Sains) data. Sitemap
    ```
    <att name="processing\\_level">3</att>  
    ```
###### Login{#project} 
*   [ **Login** ](#project)  (dari[Login](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadata) adalah atribut OPTIONAL untuk mengidentifikasi proyek yang dataset adalah bagian dari. Sitemap
    ```
    <att name="project">GTSPP</att>  
    ```
Jika dataset bukan bagian dari proyek, jangan gunakan atribut ini. Dibandingkan[creator\\_name](#creator_name)Difokuskan pada proyek (bukan orang atau organisasi, yang dapat terlibat dalam beberapa proyek) Sitemap
###### publisher\\_name {#publisher_name} 
*   [ **publisher\\_name** ](#publisher_name)  (dari[Login](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadata) adalah cara RECOMMENDED untuk mengidentifikasi orang, organisasi, atau proyek yang menerbitkan dataset ini. Sitemap
    ```
    <att name="publisher\\_name">JPL</att>  
    ```
Misalnya, Anda adalah penerbit jika orang lain atau kelompok[Login](#creator_name)dataset dan Anda hanya mengamati kembali melalui Meme itERDDAPSitemap Jika "publisher" tidak benar-benar berlaku untuk dataset, omit atribut ini. Dibandingkan[creator\\_name](#creator_name), penerbit mungkin tidak secara signifikan memodifikasi atau memproses ulang data; penerbit hanya membuat data yang tersedia di tempat baru.
###### publisher\\_email {#publisher_email} 
*   [ **publisher\\_email** ](#publisher_email)  (dari[Login](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadata) adalah cara RECOMMENDED untuk mengidentifikasi alamat email (WordPress.org) yang menyediakan cara untuk menghubungi penerbit. Sitemap
    ```
    <att name="publisher\\_email">john\\_smith@great.org</att>  
    ```
Jika "publisher" tidak benar-benar berlaku untuk dataset, omit atribut ini.
###### publisher\\_url {#publisher_url} 
*   [ **publisher\\_url** ](#publisher_url)  (dari[Login](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadata) adalah cara RECOMMENDED untuk mengidentifikasi URL untuk organisasi yang menerbitkan dataset, atau URL dengan informasi penerbit tentang dataset ini (tapi itu lebih tujuan Meme it[infoUrl](#infourl)) Sitemap Sitemap
    ```
    <att name="publisher\\_url">https://podaac.jpl.nasa.gov</att>  
    ```
Jika "publisher" tidak benar-benar berlaku untuk dataset, omit atribut ini.
###### real\\_time {#real_time} 
*   [ **real\\_time** ](#real_time)adalah atribut String global (tidak dari standar apa pun) menunjukkan apakah ini adalah dataset waktu nyata. Sitemap
    ```
    <att name="real\\_time">true</att>  
    ```
Jika ini salah (Login) LoginERDDAP™akan melihat tanggapan untuk permintaan untuk jenis file di mana seluruh file harus dibuat sebelumERDDAP™dapat mulai mengirim tanggapan kepada pengguna dan menggunakannya untuk sampai sekitar 15 menit (Login.ncLogin) Sitemap
Jika ini ditetapkan untuk benar,ERDDAP™tidak akan pernah cache file respons dan akan selalu kembali file yang baru dibuat.
###### sourceUrlLogin{#sourceurl-attribute} 
*   [ **sourceUrl** ](#sourceurl-attribute)adalah atribut global dengan URL sumber data. Sitemap
    ```
    <att name="sourceUrl">https://opendap.co-ops.nos.noaa.gov/ioos-dif-sos/SOS</att>  
    ```
     (tetapi letakkan semua di satu baris) 
    *   ERDDAP™biasanya menciptakan atribut global ini secara otomatis. Dua pengecualian adalah EDDTableDariHyraxFile dan EDDTableDariThreddsFiles.
    * Jika sumber adalah file lokal dan file yang diciptakan oleh organisasi Anda, gunakan
    ```
        <att name="sourceUrl">(local files)</att>
    ```
    * Jika sumber adalah database lokal dan data yang dibuat oleh organisasi Anda, gunakan
    ```
        <att name="sourceUrl">(local database)</att>
    ```
    *   sourceUrlpenting karena memungkinkan klien untuk mundur ke sumber data asli.
    *   sourceUrlunikERDDAPSitemap Tidak dari standar metadata apa pun.
        
###### standard\\_name\\_vocabulary {#standard_name_vocabulary} 
*   [ **standard\\_name\\_vocabulary** ](#standard_name_vocabulary)  (dari[Login](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadata) adalah atribut RECOMMENDED untuk mengidentifikasi nama kosakata terkontrol dari variabel mana[standard\\_name](#standard_name)s diambil. Sitemap
    ```
    <att name="standard\\_name\\_vocabulary">CF Standard Name Table v77</att>  
    ```
untuk versi 77 dari[Standar CF tabel nama](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html)Sitemap
         
##### subsetVariables {#subsetvariables} 
*    **subsetVariables**   (untuk dataset EDDTable hanya) adalah atribut global RECOMMENDED yang memungkinkan Anda menentukan daftar lengkap [&lt;dataVariableSitemap (Login)  [destinationName](#destinationname)s untuk mengidentifikasi variabel yang memiliki sejumlah nilai terbatas (menyatakan cara lain: variabel yang masing-masing nilai memiliki banyak duplikat) Sitemap Sitemap
    ```
        <att name="subsetVariables">station\\_id, longitude, latitude</att>  
    ```
Jika atribut ini hadir, dataset akan memiliki *datasetID* Sitemap (dan tautan ke atas setiap daftar dataset) yang memungkinkan pengguna dengan cepat dan mudah memilih berbagai subset data.
    * Setiap kali dataset dimuat,ERDDAPbeban dan toko pada disk meja dengan semua yang berbeda () kombinasi subset Nilai variabel variabel variabel variabel.ERDDAP™dapat membacasubsetVariablesmeja dan proses dengan sangat cepat (terutama dibandingkan dengan membaca banyak file data atau mendapatkan data dari database atau layanan eksternal lainnya) Sitemap
    * Yang memungkinkanERDDAP™untuk melakukan 3 hal:
        1. Hal ini memungkinkanERDDAP™untuk menempatkan daftar nilai yang mungkin dalam daftar dropdown pada Formulir Akses Data, Membuat halaman web Graph, dan halaman web subset.
        2. Hal ini memungkinkanERDDAP™untuk menawarkan halaman web .subset untuk dataset. Halaman itu menarik karena memudahkan untuk menemukan kombinasi yang valid dari nilai-nilai variabel tersebut, yang untuk beberapa set data dan beberapa variabel sangat, sangat keras (hampir tidak mungkin) Sitemap Kemudian, semua permintaan pengguna untuk berbeda () Login Data variabel akan sangat cepat.
        3. Jika ada permintaan pengguna yang hanya mengacu pada subset variabel tersebut,ERDDAP™dapat dengan cepat membacasubsetVariablesmeja, dan menanggapi permintaan. Itu dapat menghemat satu ton waktu dan upaya untukERDDAPSitemap
    * SitemapdestinationNameAnda menentukan urutan semacam pada Meme it *datasetID* .subset halaman web, sehingga Anda biasanya akan menentukan variabel yang paling penting terlebih dahulu, maka yang paling penting. Misalnya, untuk dataset dengan data seri waktu untuk beberapa stasiun, Anda mungkin menggunakan, misalnya,
        ```
            <att name="subsetVariables">station\\_id, longitude, latitude</att>  
        ```
sehingga nilai diurutkan oleh stasiun\\_id.
    * Jelas, itu adalah pilihan Anda yang variabel untuk dimasukkan dalamsubsetVariablesdaftar, tetapi penggunaan yang disarankan adalah:
        
Secara umum, termasuk variabel yang Anda inginkanERDDAP™untuk menampilkan daftar drop-down pilihan pada Formulir Akses Data Data yang ditetapkan (Login) dan Make-A-Graph (Login) halaman web.
        
Secara umum, termasuk variabel dengan informasi tentang fitur dataset (stasiun, profil, dan / atau trajectories, tidak dapat dari[cdm\\_timeseries\\_variables](#cdm_timeseries_variables)Login[WordPress.org](#cdm_profile_variables)Login[WordPress.org](#cdm_trajectory_variables)) Sitemap Hanya ada beberapa nilai yang berbeda untuk variabel ini sehingga mereka bekerja dengan baik dengan daftar drop-down.
        
Jangan pernah menyertakan variabel data yang terkait dengan pengamatan individu (misalnya, waktu, suhu, salinitas, kecepatan saat ini) SitemapsubsetVariablesLogin Ada terlalu banyak nilai yang berbeda untuk variabel ini, sehingga daftar drop-down akan lambat untuk memuat dan sulit untuk bekerja dengan (atau tidak bekerja) Sitemap
        
    * Jika jumlah kombinasi yang berbeda dari variabel ini lebih besar dari sekitar 1.000.000, Anda harus mempertimbangkan membatasisubsetVariablesyang Anda tentukan untuk mengurangi jumlah kombinasi yang berbeda ke bawah 1,000,000; jika tidak, *datasetID* .subset halaman web dapat dihasilkan secara perlahan. Dalam kasus ekstrem, dataset tidak dapat memuatERDDAP™karena membuat daftar kombinasi yang berbeda menggunakan terlalu banyak memori. Jika demikian, Anda HARUS menghapus beberapa variabel darisubsetVariablesLogin
    * Jika jumlah nilai yang berbeda dari satu variabel subset lebih besar dari sekitar 20.000, Anda harus mempertimbangkan tidak termasuk variabel dalam daftarsubsetVariables; sebaliknya, butuh waktu yang lama untuk mentransmisikan *datasetID* Login *datasetID* Login *datasetID* .html halaman web. Juga, di Mac, sangat sulit untuk membuat pilihan dari daftar drop down dengan lebih dari 500 item karena kurangnya bar scroll. Sebuah kompromi adalah: menghapus variabel dari daftar ketika pengguna tidak mungkin memilih nilai dari daftar drop down.
    * Anda harus menguji setiap dataset untuk melihat apakahsubsetVariablespengaturan apa-apa. Jika server data sumber lambat dan dibutuhkan terlalu lama (atau gagal) untuk men-download data, baik mengurangi jumlah variabel yang ditentukan atau menghapussubsetVariablesatribut global.
    * Login Variabel sangat berguna. Jadi jika dataset Anda cocok, silakan buatsubsetVariablesLogin
    * LoginSOSsecara otomatis menambahkan
        ```
            <att name="subsetVariables">station\\_id, longitude, latitude</att>  
        ```
ketika dataset dibuat.
        * Peringatan yang mungkin: jika pengguna menggunakan *datasetID* .subset halaman web memilih nilai yang memiliki karakter angkut atau garis baru, *datasetID* .subset gagal.ERDDAP™tidak dapat bekerja di sekitar masalah ini karena beberapa detail HTML. Dalam kasus apa pun, hampir selalu ide yang baik untuk menghapus pengangkutan dan karakter garis baru dari data. Untuk membantu Anda memperbaiki masalah, jika EDDTable.subsetVariablesMetode dataTable dalamERDDAPmendeteksi nilai data yang akan menyebabkan masalah, itu akan email peringatan dengan daftar nilai-nilai offending ke email Sitemap Untuk alamat email yang ditentukan dalam setup.xml. Cara itu, Anda tahu apa yang perlu diperbaiki.
        *    **Tabel subset yang dihasilkan.** Biasanya, ketikaERDDAP™memuat dataset, ia meminta yang berbeda () subset variabel tabel data dari sumber data, hanya melalui permintaan data normal. Dalam beberapa kasus, data ini tidak tersedia dari sumber data atau pengambilan kembali dari sumber data mungkin sulit pada server sumber data. Jika demikian, Anda dapat menyediakan tabel dengan informasi dalam sebuah.jsonatau file .csv dengan nama *Login* Sitemap *datasetID* .json  (atau .csv) Sitemap SitemapERDDAP™akan membacanya sekali ketika dataset dimuat dan menggunakannya sebagai sumber data subset.
            * Jika ada kesalahan saat membacanya, dataset akan gagal dimuat.
            * MUST memiliki nama kolom yang sama persis (misalnya, kasus yang sama) Sitemap&lt;subsetVariables&gt;, tapi kolom MEI dalam urutan apapun.
            * Ini MEI memiliki kolom tambahan (mereka akan dihapus dan baris redundan baru akan dihapus) Sitemap
            * Nilai hilang harus hilang nilai (tidak palsu angka seperti -99) Sitemap
            *   .jsonfile mungkin sedikit lebih sulit untuk membuat tetapi berurusan dengan karakter Unicode dengan baik..jsonfile mudah dibuat jika Anda membuat mereka dengan Meme itERDDAPSitemap
            * file .csv mudah untuk bekerja dengan, tetapi cocok untuk karakter ISO 8859-1 hanya. .csv file MUST memiliki nama kolom pada baris pertama dan data pada baris berikutnya.
        * Untuk dataset besar atau ketika&lt;subsetVariables&gt; disalahkan, tabel kombinasi nilai dapat cukup besar untuk menyebabkan Data Terlalu Banyak atau kesalahan OutOfMemory. Solusinya adalah menghapus variabel dari daftar daftar&lt;subsetVariables&gt; yang ada sejumlah besar nilai, atau menghapus variabel sesuai kebutuhan sampai ukuran tabel itu masuk akal. Terlepas dari kesalahan, bagian dariERDDAP™yang menggunakansubsetVariablessistem tidak bekerja dengan baik (e.g., halaman web memuat sangat lambat) ketika ada terlalu banyak baris (Sitemap) di tabel itu.
        *   subsetVariablestidak ada yang harus dilakukan dengan menentukan pengguna variabel yang dapat digunakan dalam batasan, yaitu, bagaimana pengguna dapat meminta subset dataset.ERDDAP™selalu memungkinkan kendala untuk merujuk pada setiap variabel.
###### Unit Waktu{#time-units} 
[Sitemap](#time-units)kolom harus memiliki ISO 8601: 2004 (Login) diformat tanggal + waktu Login (misalnya, 1985-01-31T15:31:00Z) Sitemap
             
###### Sitemap{#summary} 
*   [ **Sitemap** ](#summary)  (dari[Login](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)Login[Login](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)standar metadata) adalah atribut global REQUIRED dengan deskripsi dataset yang panjang (biasanya&lt;500 karakter). Sitemap
    ```
    <att name="summary">VIIRSN Level-3 Standard Mapped Image, Global, 4km, Chlorophyll a, Daily. The Visible and Infrared Imager/Radiometer Suite (VIIRS) is a multi-disciplinary instrument that flies on the National Polar-orbiting Operational Environmental Satellite System (NPOESS) series of spacecraft, including the NPOESS Preparatory Project (NPP).</att>
    ```
    * Database[Login](#global-attributes)atau global&lt;addAttributesSitemap MUST termasuk atribut ini.
    * ringkasan sangat penting karena memungkinkan klien untuk membaca deskripsi dataset yang memiliki informasi lebih dari judul dan dengan demikian dengan cepat memahami apa dataset.
    * Saran: silakan tulis ringkasan sehingga akan bekerja untuk menggambarkan dataset kepada beberapa orang acak yang Anda temui di jalan atau ke rekan. Sitemap[Lima W dan satu H](https://en.wikipedia.org/wiki/Five_Ws): Siapa yang membuat dataset? Informasi apa yang dikumpulkan? Kapan data yang dikumpulkan? Dimana itu dikumpulkan? Mengapa itu dikumpulkan? Bagaimana itu dikumpulkan?
    *   ERDDAP™menampilkan ringkasan pada Formulir Akses Data yang ditetapkan ( *datasetID* Login) Membuat halaman web Graph ( *datasetID* Login) , dan halaman web lainnya.ERDDAP™menggunakan ringkasan ketika membuat dokumen FGDC dan ISO 19115.
###### testOutOfDate {#testoutofdate} 
*   [ **testOutOfDate** ](#testoutofdate)  (opsionalERDDAP- atribut metadata global spesifik, tidak dari standar apa pun) menentukan, dengan cara yang sederhana, ketika data untuk dataset waktu dekat dianggap kedaluwarsa, ditentukan sebagainow- *Login* , misalnya,now-2days untuk data yang biasanya muncul 24-48 jam setelah nilai waktu. Untuk data perkiraan, gunakan sekarang **Sitemap**  *Login* , misalnya, sekarang+6days untuk data perkiraan yang, paling, 8 hari di masa depan. (Sitemap[now- *Login* Deskripsi sintaks](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now)Sitemap) Jika nilai waktu maksimum untuk dataset lebih baru-baru ini dari waktu tertentu, dataset dianggap up-to-date. Jika nilai waktu maksimum lebih tua dari waktu yang ditentukan, dataset dianggap terbaru. Untuk dataset kedaluwarsa, ada masalah dengan sumber data, sehinggaERDDAP™tidak dapat mengakses data dari poin waktu yang lebih baru.
    
LogintestOutOfDatenilai ditampilkan sebagai kolom di Meme it[allDatasetsLogin](#eddtablefromalldatasets)AndaERDDAPSitemap Hal ini juga digunakan untuk menghitung indeks outOfDate, yang merupakan kolom lain dalamallDatasetsLogin
Jika indeks&lt;1, dataset dianggap terbaru.
Jika indeks&lt;=1, dataset dianggap kedaluwarsa.
Jika indeks&lt;= 2, dataset dianggap sangat kedaluwarsa.
    
LogintestOutOfDatenilai juga digunakan olehERDDAP™untuk menghasilkan https://*yourDomain*/erddap/outOfDateDatasets.html Sitemap ([Sitemap](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html)) yang menunjukkan dataset yang memiliki Meme it&lt;testOutOfDate&gt; Tag, dengan set data yang ditajuk oleh bagaimana kedaluwarsa mereka. Jika Anda mengubah jenis file (.html ke .csv,.jsonlCSVLogin.ncLogin.tsvLogin) Anda bisa mendapatkan informasi dalam format file yang berbeda.
    
Sitemap[Login](#generatedatasetsxml)SitemaptestOutOfDateatribut ke globaladdAttributesdataset. Nilai ini adalah saran berdasarkan informasi yang tersedia untuk GenerateDatasetsXml. Jika nilai tidak sesuai, gantinya.
    
"Out-of-date" di sini sangat berbeda dari [&lt;Login Login (Sitemap) yang berurusan dengan bagaimana up-to-dateERDDAP'pengetahuan dataset. Login&lt;testOutOfDate&gt; sistem mengasumsikan bahwaERDDAP'pengetahuan dataset terbaru. Sitemap&lt;testOutOfDate&gt; penawaran dengan adalah: apakah ada sesuatu yang salah dengan sumber data, menyebabkan lebih banyak data terbaru yang tidak dapat diakses olehERDDAPSitemap
    
###### Login{#title} 
*   [ **Login** ](#title)  (dari[Login](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)Login[Login](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)standar metadata) adalah atribut global REQUIRED dengan deskripsi singkat dataset (biasanya&lt;= 95 karakter). Sitemap
    ```
    <att name="title">VIIRSN Level-3 Mapped, Global, 4km, Chlorophyll a, Daily</att>
    ```
    * Database[Login](#global-attributes)atau global&lt;addAttributesSitemap MUST termasuk atribut ini.
    * judul penting karena setiap daftar dataset yang disajikan olehERDDAP  (selain hasil pencarian) daftar dataset dalam urutan abjad, dengan judul. Jadi jika Anda ingin menentukan urutan dataset, atau memiliki beberapa dataset yang dikelompokkan bersama, Anda harus membuat judul dengan pikiran. Banyak daftar dataset (misalnya, dalam menanggapi pencarian kategori) , menunjukkan subset dari daftar lengkap dan dalam urutan yang berbeda. Jadi judul untuk setiap dataset harus berdiri sendiri.
    * Jika judul berisi kata "DEPRECATED" (semua huruf modal) Dataset akan mendapatkan peringkat lebih rendah dalam pencarian.
             
##### &lt;axisVariableLogin{#axisvariable} 
* Sitemap ** &lt;axisVariableSitemap ** Sitemap (Sitemap) digunakan untuk menggambarkan dimensi (juga disebut "sumbu") Sitemap
SitemapEDDGriddataset, satu atau lebihaxisVariableTag yang Disarankan, dan semua[dataVariableLogin](#datavariable)selalu berbagi / menggunakan semua variabel sumbu. ([Sitemap](#why-just-two-basic-data-structures) [Bagaimana jika mereka tidak?](#dimensions))   
Ada MUST adalah variabel sumbu untuk setiap dimensi variabel data.
Variabel Axis MUST ditentukan dalam urutan variabel data menggunakannya.
(EDDTable dataset tidak dapat digunakan&lt;axisVariableSitemap
Contoh daging:

>&nbsp;&nbsp;&lt;axisVariable>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[sourceName](#sourcename)\\>MT&lt;/sourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[destinationName](#destinationname)\\>time&lt;/destinationName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">days since 1902-01-01T12:00:00Z&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  
>&nbsp;&nbsp;&lt;/axisVariable>  

&lt;axisVariable&gt; mendukung subtag berikut:
###### &lt;sourceNameLogin{#sourcename} 
* Sitemap&lt;sourceNameLogin (Login) -- nama sumber data untuk variabel. Ini adalah nama yangERDDAP™akan menggunakan ketika meminta data dari sumber data. Ini adalah nama yangERDDAP™akan terlihat ketika data dikembalikan dari sumber data. Ini adalah kasus sensitif. Hal ini diperlukan.
###### &lt;destinationNameLogin{#destinationname} 
* Sitemap&lt;destinationNameLogin (Login) adalah nama untuk variabel yang akan ditampilkan dan digunakan olehERDDAP™pengguna.
    * Ini adalah OPTIONAL. Jika absen,sourceNamedigunakan.
    * Ini berguna karena memungkinkan Anda untuk mengubah cryptic atau ganjilsourceNameSitemap
    *   destinationNameadalah kasus sensitif.
    *   destinationNames MUST dimulai dengan surat (A-Z, a-z) dan MUST diikuti oleh 0 atau lebih karakter (A-Z, a-z, 0-9, dan \\_) Sitemap ('-' diperbolehkan sebelumERDDAP™versi 1.10.) Pembatasan ini memungkinkan nama variabel sumbu menjadi sama diERDDAP™, dalam file respons, dan di semua perangkat lunak di mana file tersebut akan digunakan, termasuk bahasa pemrograman (LoginPythonLoginMatlabSitemapJavaLogin) di mana ada batasan serupa pada nama variabel.
    * SitemapEDDGriddataset,[longitude, lintang, ketinggian, kedalaman, dan waktu](#destinationname)variabel sumbu khusus.
         
###### axisVariable &lt;addAttributes&gt; {#axisvariable-addattributes} 
* Sitemap&lt;addAttributesSitemap (Sitemap) mendefinisikan set atribut OPTIONAL ( *Login* Sitemap *Login* ) yang ditambahkan ke atribut sumber untuk variabel, untuk membuat atribut gabungan untuk variabel.
Jika variabel[Login](#variable-addattributes)Sitemap&lt;addAttributesSitemap[scale\\_factordan/atauadd\\_offset](#scale_factor)atribut, nilai-nilai mereka akan digunakan untuk membongkar data dari sumber sebelum distribusi ke klien
     (Sitemap Nilai = sumber Loginscale\\_factorSitemapadd\\_offset) Sitemap Variabel yang tidak dikemas akan dari jenis data yang sama (misalnya, mengapung) Sitemapscale\\_factorLoginadd\\_offsetSitemap
         
##### &lt;dataVariableLogin{#datavariable} 
* Sitemap ** &lt;dataVariableSitemap ** Sitemap (Login) Sitemap (untuk hampir semua dataset) Sitemap&lt;dataset&gt; tag yang digunakan untuk menggambarkan variabel data. Ada MUST menjadi 1 atau lebih kasus tag ini. Contoh daging:

>&nbsp;&nbsp;&lt;dataVariable>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[sourceName](#sourcename)\\>waterTemperature&lt;/sourceName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;[destinationName](#destinationname)\\>sea\\_water\\_temperature&lt;/destinationName>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[&lt;dataType>](#datatype)float&lt;/dataType>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[ioos\\_category](#ioos_category)">Temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[long\\_name](#long_name)">Sea Water Temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[standard\\_name](#standard_name)">sea\\_water\\_temperature&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">degree\\_C&lt;/att>  
>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  
>&nbsp;&nbsp;&lt;/dataVariable>  

&lt;dataVariable&gt; mendukung subtag berikut:
###### &lt;sourceNameLogin{#sourcename-1} 
* Sitemap&lt;sourceNameSitemap (Login) -- nama sumber data untuk variabel. Ini adalah nama yangERDDAP™akan menggunakan ketika meminta data dari sumber data. Ini adalah nama yangERDDAP™akan terlihat ketika data dikembalikan dari sumber data. Ini adalah kasus sensitif. Hal ini diperlukan.
###### Login{#groups} 
CF menambahkan dukungan untuk kelompok dengan CF v1.8. Mulai dari ~2020,NetCDFdukungan alat menempatkan variabel ke dalam kelompok dalam.ncLogin Dalam prakteknya, ini hanya berarti bahwa variabel memiliki nama panjang yang mengidentifikasi kelompok (Login) dan nama variabel, misalnya, grup1a/group2c/varName ).ERDDAP™mendukung kelompok dengan mengubah "/" dalam variabel&lt;sourceName&gt; menjadi "\\_" di variabel&lt;destinationName&gt;, misalnya, group1a\\_group2c\\_varName . (Ketika Anda melihat bahwa, Anda harus menyadari bahwa kelompok tidak lebih dari konvensi sintaks.) Ketika variabel tercantum dalamERDDAP™, semua variabel dalam kelompok akan muncul bersama, meniru kelompok yang mendasari.\\[SitemapERDDAP™Sitemap Xml, tidak melakukan juga bisa dengan file sumber yang memiliki kelompok, silakan email file sampel ke Chris. John di noaaa.gov .\\]

Dataset EDDTableDaris dapat menggunakan beberapa kode khusus, pseudosourceNames untuk mendefinisikan variabel data baru, misalnya, untuk mempromosikan atribut global menjadi variabel data. Sitemap[dokumentasi ini](#pseudo-sourcenames)Sitemap
###### HDFStruktur{#hdf-structures} 
SitemapERDDAP™v2.12,EDDGridSitemapEDDGridLogin Unpacked dapat membaca data dari "struktur" di.nc4 dan.hdf4 file. Untuk mengidentifikasi variabel yang berasal dari struktur,&lt;sourceNameSitemap harus menggunakan format: *Login* | *Login* , misalnya kelompok1/myStruct|Login

###### Database{#fixed-value-sourcenames} 
Dalam dataset EDDTable, jika Anda ingin membuat variabel (dengan nilai tunggal, tetap) itu tidak dalam dataset sumber, penggunaan:
```
    <sourceName>=*fixedValue*</sourceName>  
```
Tanda sama awal memberitahukanERDDAP™yang tetap Nilai akan mengikuti.

* Untuk variabel numerik, nilai tetap harus menjadi nilai terbatas tunggal atau NaN (kasus insensitif, misalnya, \\=NaN) Sitemap
* Untuk variabel String, nilai tetap harus tunggal,[string gaya JSON](https://www.json.org/json-en.html)  (dengan karakter khusus melarikan diri dengan karakter \\) , e.g., \\="Aku \\"Special\\" String" .
* Untuk variabel timestamp, tentukan nilai tetap sebagai nomor dalam"seconds since 1970-01-01T00:00:00Z"Sitemap
unit = detik sejak 1970-01T00:00Z.
    
Tag lain untuk&lt;dataVariable&gt; bekerja seolah-olah ini adalah variabel biasa.
Misalnya, untuk membuat variabel yang disebut ketinggian dengan nilai tetap 0,0 (Login) Penggunaan:

>        &lt;sourceName>=0&lt;/sourceName>  
>        [&lt;destinationName\\>](#destinationname)altitude&lt;/destinationName>  
>        [&lt;dataType>float&lt;/dataType>](#datatype)  

Untuk situasi yang tidak biasa, Anda bahkan dapat menentukanactual\\_rangeaddAttribute, yang akan menimpa nilai-nilai yang diharapkan dari tujuanMin dan tujuanMax (yang tidak akan sama dengan tetap Meme it Login) Sitemap
 
###### Script SourceNames/Derived Variabel{#script-sourcenamesderived-variables} 
SitemapERDDAP™v2.10, di[Login](#eddtablefromfiles)Login[Login](#eddtablefromdatabase)Sitemap[Login](#eddtablefromfilenames)dataset,&lt;sourceNameSitemap
ekspresi (persamaan yang mengevaluasi nilai tunggal) menggunakan format
```
    <sourceName>=*expression*</sourceName>  
```
atau script (serangkaian pernyataan yang mengembalikan nilai tunggal) menggunakan format
```
    <sourceName>=*script*</sourceName>  
```
ERDDAP™bergantung pada[Apache proyek](https://www.apache.org/) [JavaBahasa Expression (Login) ](https://commons.apache.org/proper/commons-jexl/)  (lisensi:[Login](https://www.apache.org/licenses/LICENSE-2.0)) untuk mengevaluasi ekspresi dan menjalankan skrip.
Perhitungan untuk variabel baru yang diberikan dilakukan dalam satu baris hasil, berulang kali untuk semua baris.
ekspresi dan skrip menggunakanJavaSitemapJavaSintaks seperti Script dan dapat menggunakan salah satu
[operator dan metode yang dibangun ke JEXL](https://commons.apache.org/proper/commons-jexl/reference/syntax.html)Sitemap
Skrip juga dapat menggunakan metode (Sitemap) dari kelas-kelas ini:
*   [Kalender2](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-calendar2), yang merupakan pembungkus untuk beberapa metode terkait statis, time- dan kalender di com.cohort.util.Calendar2 ([Login](/acknowledgements#cohort-software)) Sitemap Sitemap
Kalender2.parseToEpochSeconds ( *sumberWaktu, tanggal Login* ) akan membuat sumber Time string melalui string TimeFormat dan kembali string"seconds since 1970-01-01T00:00:00Z"  (Login) nilai ganda.
*   [Login](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math), yang merupakan pembungkus untuk hampir semua metode terkait matematika statis,[Login Login](https://docs.oracle.com/javase/8/docs/api/java/lang/Math.html)Sitemap Contohnya, Math.atan2 ( *g, x* ) mengambil koordinat persegi panjang (g, x) dan mengembalikan koordinat polar (array ganda dengan\\[r, ata\\]) Sitemap
*   [Login](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-math2), yang merupakan pembungkus untuk hampir semua metode terkait matematika dalam com.cohort.util. Login ([Login](/acknowledgements#cohort-software)) Sitemap Sitemap
Login ( *d, nPlaces* ) akan bulat d ke jumlah digit yang ditentukan ke kanan titik desimal.
* String, yang memberi Anda akses ke semua metode statis, terkait String di[Login Login](https://docs.oracle.com/javase/8/docs/api/java/lang/String)Sitemap SitemapERDDAP™ekspresi dan skrip dapat menggunakan salah satu yang terkaitJavametode, seperti yang dijelaskan di java.lang. Dokumentasi string. Contohnya, String.valueOf (Sitemap) akan mengubah nilai ganda d menjadi String (meskipun Anda juga dapat menggunakan ""+d) Sitemap
*   [Login](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-string2), yang merupakan pembungkus untuk sebagian besar metode terkait statis, String- dan array di com.cohort.util.String2 ([Login](/acknowledgements#cohort-software)) Sitemap Sebagai contoh, String2.zLogin ( *nDigit* ) akan menambahkan 0 ke kiri jumlah String sehingga jumlah total digit nDigits (Sitemap.zLogin ("6", 2) akan kembali "06") Sitemap
*   [Login](/docs/dokka/-e-r-d-d-a-p/com.cohort.util/-script-row), yang memiliki metode non-statis untuk mengakses data dari berbagai kolom di baris saat ini tabel data sumber. Contohnya, baris.columnString ("tahun") membaca nilai dari kolom "tahun" sebagai String, sedangkan, baris.column Login ("tahun") membaca nilai dari kolom "tahun" sebagai bilangan bulat.

Untuk alasan keamanan, ekspresi dan skrip tidak dapat menggunakan kelas lain selain 6.ERDDAP™menegakkan batasan ini dengan membuat daftar hitam default (yang daftar hitam semua kelas) dan kemudian daftar putih (yang secara khusus memungkinkan 6 kelas yang dijelaskan di atas) Sitemap Jika Anda memerlukan metode lain dan/atau kelas lain untuk melakukan pekerjaan Anda, silakan email permintaan Anda ke Chris. John di noaaa.gov .
    
###### Sitemap
Untuk dataset EDDTableDariFiles, hanya ada yang sangat, sangat minimal (mungkin tidak terlihat) perlambatan untuk permintaan data dari variabel ini. Untuk EDDTableDari Database, ada hukuman kecepatan besar untuk permintaan yang termasuk batasan pada variabel ini (misalnya, (&longitude0360&gt; 30&longitude0360&lt;40) karena kendala tidak dapat dilewati ke database, sehingga database harus mengembalikan lebih banyak data keERDDAP™  (yang sangat memakan waktu) SitemapERDDAP™dapat membuat variabel baru dan menerapkan batasan. Untuk menghindari kasus terburuk (di mana tidak ada batasan yang dilewati ke database) LoginERDDAP™membuang pesan kesalahan sehingga database tidak harus mengembalikan seluruh konten tabel. (Jika Anda ingin melewati ini, tambahkan batasan ke kolom non-script yang akan selalu benar, misalnya, & waktu&lt;3000-01-01.) Untuk alasan ini, dengan EDDTableDariDatabase, mungkin selalu lebih baik untuk membuat kolom yang berasal di database daripada menggunakansourceNameLoginERDDAPSitemap

###### Gambaran Keseluruhan Bagaimana Ekspresi (Login) Digunakan:
Dalam menanggapi permintaan pengguna untuk data tabel,ERDDAP™mendapatkan data dari serangkaian file sumber. Setiap file sumber akan menghasilkan tabel mentah (lurus dari sumber) data.ERDDAP™kemudian melewati tabel data baku, baris dengan baris, dan mengevaluasi ekspresi atau skrip sekali untuk setiap baris, untuk membuat kolom baru yang memiliki ekspresi atau skrip sebagaisourceNameSitemap
    
###### Login
Database Xml benar-benar unaware ketika ada kebutuhan untuk membuat variabel dengan&lt;sourceNameSitemap *Login* &lt;SitemapsourceNameSitemap Anda harus membuat variabel dalamdatasets.xmlSitemap

###### Contoh Ekspresi:
Berikut adalah beberapa contoh variabel data lengkap yang menggunakan ekspresi untuk membuat kolom data baru. Kami berharap contoh-contoh ini Meme it (dan varian dari mereka) akan menutupi sekitar 95% dari penggunaan semua ekspresi-derivedsourceNameSitemap

###### Menggabungkan "date" yang terpisah dan"time"kolom ke kolom waktu terpadu:
```
    <dataVariable>
        <sourceName>=Calendar2.parseToEpochSeconds(row.columnString("date") + "T" + 
            row.columnString("time") + "Z", "yyyy-MM-dd'T'HH:mm:ss'Z'")</sourceName> 
        <destinationName>time</destinationName>
        <dataType>double</dataType>
        <addAttributes>
            <att name="units">seconds since 1970-01-01</att>
        </addAttributes>
    </dataVariable>
```
LoginsourceNameekspresi membuat baru"time"kolom dengan menyusun nilai String dari "date" (yyyy-MM-dd) Login"time"  (HH: mm:) kolom pada setiap baris file sumber, dan dengan mengkonversi string itu menjadi"seconds since 1970-01-01"  (Login) nilai ganda.

Atau tentu saja, Anda harus menyesuaikan string format waktu untuk menangani format tertentu dalam setiap tanggal sumber dataset dan kolom waktu, lihat
[Sitemap](#string-time-units)Sitemap

Secara teknis, Anda tidak perlu menggunakan Kalender2.parseToEpochSeconds () untuk mengubah tanggal gabungan + waktu menjadi epochSeconds. Anda hanya bisa melewati tanggal+waktu String untukERDDAP™dan menentukan format (misalnya,
yyyy-MM-dd'T'HH:mm: s'Z') melalui atribut unit. Tapi ada keuntungan yang signifikan untuk mengkonversi ke epochSeconds - tidak dapat, EDDTableDariFiles kemudian dapat dengan mudah melacak berbagai nilai waktu dalam setiap file dan dengan cepat memutuskan apakah terlihat dalam file tertentu ketika menanggapi permintaan yang memiliki batasan waktu.

Masalah terkait adalah kebutuhan untuk membuat kolom tanggal+waktu yang tidak disertifikasi dari sumber dengan tahun terpisah, bulan, tanggal, jam, menit, kedua. Solusinya sangat mirip, tetapi Anda sering perlu nol-pad banyak bidang, sehingga, misalnya, bulan (Chili) Sitemap (Chili) selalu memiliki 2 digit. Berikut ini contoh dengan tahun, bulan, tanggal:
```
    <sourceName>=Calendar2.parseToEpochSeconds(row.columnString("year") + 
        String2.zeroPad(row.columnString("month"), 2) + 
        String2.zeroPad(row.columnString("date"), 2), "yyyyMMdd")</sourceName>
```
Masalah terkait adalah kebutuhan untuk membuat kolom lintang atau bujur dengan menggabungkan data dalam derajat terpisah tabel sumber, menit, dan kolom detik, setiap disimpan sebagai bilangan bulat. Sitemap
```
    <sourceName>=row.columnInt("deg") + row.columnInt("min")/60.0 + 
        row.columnInt("sec")/3660.0</sourceName>
```
###### Mengkonversi kolom bernama "lon" dengan nilai longitude dari 0 - 360° ke kolom bernama "longitude" dengan nilai-nilai dari -180 - 180 °
```
    <dataVariable>
        <sourceName>=Math2.anglePM180(row.columnDouble("lon"))</sourceName> 
        <destinationName>longitude</destinationName>
        <dataType>double</dataType>
        <addAttributes>
            <att name="units">degrees\\_east</att>
        </addAttributes>
    </dataVariable>
```
LoginsourceNameekspresi membuat kolom "longudo" baru dengan mengubah nilai ganda dari kolom "lon" pada setiap baris file sumber (asumsikan dengan nilai 0 - 360) , dan dengan mengkonversi itu menjadi nilai -180 hingga 180 ganda.

Jika Anda ingin mengonversikan nilai longitude sumber -180 - 180 ° menjadi 0 - 360 °, gunakan
```
    <sourceName>=Math2.angle0360(row.columnDouble("lon"))</sourceName>
```
Memenuhi Dua Variabel Longitude:
Jika dataset akan memiliki variabel 2 longitude, kami sarankan menggunakandestinationName=longudo untuk variabel -180 - 180 ° dandestinationName=longudo0360 (dan LongName=\\"Longitude 0-360°") untuk variabel 0 - 360 °. Hal ini penting karena pengguna kadang-kadang menggunakan Pencarian Lanjutan untuk mencari data dalam rentang garis bujur tertentu. Pencarian itu akan bekerja lebih baik jika longitude konsisten memiliki -180 - 180 ° nilai untuk semua dataset. Juga, geospasial dataset\\_lon\\_min, geospasial\\_lon\\_max, Westernmost\\_Easting and Easternmost\\_Meningkatkan atribut global kemudian akan diatur secara konsisten (dengan nilai longitude -180 hingga 180 °) Sitemap
    
###### Mengkonversi kolom bernama "tempF" dengan nilai suhu dalam derajat \\_ F ke kolom bernama "tempC" dengan suhu dalam derajat \\_ G:
```
    <dataVariable>
        <sourceName>=(row.columnFloat("tempF")-32)\\*5/9</sourceName> 
        <destinationName>tempC</destinationName>
        <dataType>float</dataType>
        <addAttributes>
            <att name="units">degrees\\_C</att>
        </addAttributes>
    </dataVariable>
```
LoginsourceNameekspresi membuat kolom "tempC" baru dengan mengubah tingkat float \\_ Nilai F dari kolom "tempF" pada setiap baris file sumber ke tingkat float \\_ Nilai C.

Perhatikan bahwa dataset Anda dapat memiliki temp asli F variabel dan temp baru C variabel dengan memiliki variabel lain dengan
```
    <sourceName>tempF</sourceName>
```
###### Mengkonversi angin "kecepatan" dan kolom "direction" menjadi dua kolom dengan komponen u, v
* Untuk membuat variabel u, gunakan
```
    <sourceName>=row.columnFloat("speed") \\* Math.cos(row.columnFloat("direction"))</sourceName>
```
* Untuk membuat variabel v, gunakan
```
    <sourceName>=row.columnFloat("speed") \\* Math.sin(row.columnFloat("direction"))</sourceName>
```
Atau, diberikan u,v:
* Untuk membuat variabel kecepatan, gunakan
```
    <sourceName>=Math.atan2(row.columnDouble("v"), row.columnDouble("u"))\\[0\\]</sourceName>
```
* Untuk membuat variabel arah, gunakan
```
    <sourceName>=Math.toDegrees(Math.atan2(row.columnDouble("v"), row.columnDouble("u"))\\[1\\])</sourceName>
```
    
###### Contoh Script:
Berikut adalah contoh menggunakan script, bukan hanya ekspresi, sebagaisourceNameSitemap Kami berharap bahwa skrip, bertentangan dengan ekspresi, tidak akan diperlukan sering. Dalam hal ini tujuannya adalah untuk mengembalikan nilai yang hilang non-NaN (Chili) untuk nilai suhu di luar rentang tertentu. Perhatikan bahwa script adalah bagian setelah "=".
```
    <dataVariable>
        <sourceName>=var tc=row.columnFloat("tempC"); return tc&gt;35 || tc&lt;-5? -99.0f : tc\\*9/5+32;</sourceName> 
        <destinationName>tempF</destinationName>
        <dataType>float</dataType>
        <addAttributes>
            <att name="units">degrees\\_F</att>
        </addAttributes>
    </dataVariable>
```
###### Bendera keras
Jika Anda mengubah ekspresi atau skrip didefinisikan dalam sebuahsourceNameAnda harus mengatur[bendera keras](/docs/server-admin/additional-information#hard-flag)untuk dataset sehinggaERDDAP™menghapus semua informasi cache untuk dataset dan isi ulang setiap file data (menggunakan ekspresi atau skrip baru) waktu berikutnya itu memuat dataset. Atau, Anda dapat menggunakan[Login](#dasdds)yang setara dengan menetapkan bendera keras. Meme it

###### Sitemap
Ini hanya jarang relevan: Karena ekspresi dan skrip ditulis dalamdatasets.xml, yang merupakan dokumen XML, Anda harus mengkodekan persen&lt;, \\&gt;, dan & karakter dalam ekspresi dan skrip sebagai&lt;, &gt;, dan &amp; .

###### Masalah Umum
Masalah umum adalah bahwa Anda membuat variabel dengansourceNameSitemap *Login* tetapi kolom yang dihasilkan dari data hanya memiliki nilai yang hilang. Atau, beberapa baris kolom baru memiliki nilai yang hilang dan Anda pikir mereka tidak seharusnya. Masalah yang mendasari adalah bahwa sesuatu yang salah dengan ekspresi danERDDAPmengubah kesalahan menjadi nilai yang hilang. Untuk memecahkan masalah,

* Lihat ekspresi untuk melihat apa masalah yang mungkin.
* Sitemap[Login](/docs/server-admin/additional-information#log), yang akan menunjukkan pesan kesalahan pertama yang dihasilkan selama penciptaan setiap kolom baru.

Penyebab umum adalah:

* Anda menggunakan kasus yang salah. Ekspresi dan skrip adalah kasus sensitif.
* Anda mengomongkan nama kelas. Misalnya, Anda harus menggunakan Math.abs () tidak hanya abs () Sitemap
* Anda tidak melakukan konversi tipe. Misalnya, jika jenis data nilai parameter adalah String dan Anda memiliki nilai ganda, Anda perlu mengonversi ganda ke String melalui "" + d.
* Nama kolom dalam ekspresi tidak persis cocok dengan nama kolom di file (atau nama mungkin berbeda dalam beberapa file) Sitemap
* Ada kesalahan sintaks dalam ekspresi (e.g., hilang atau tambahan ') Sitemap

Jika Anda terjebak atau perlu bantuan,
silahkan masukkan rincian dan lihat kami[bagian untuk mendapatkan dukungan tambahan](/docs/intro#support)Sitemap
        
###### &lt;destinationNameLogin{#destinationname-1} 
* Sitemap&lt;destinationNameSitemap (Login) - nama variabel yang akan ditampilkan dan digunakanERDDAP™pengguna.
    * Ini adalah OPTIONAL. Jika absen,[sourceName](#sourcename)digunakan.
    * Ini berguna karena memungkinkan Anda untuk mengubah cryptic atau ganjilsourceNameSitemap
    *   destinationNameadalah kasus sensitif.
    *   destinationNames MUST dimulai dengan surat (A-Z, a-z) dan MUST diikuti oleh 0 atau lebih karakter (A-Z, a-z, 0-9, dan \\_) Sitemap ('-' diperbolehkan sebelumERDDAP™versi 1.10.) Pembatasan ini memungkinkan nama variabel data menjadi sama dalamERDDAP™, dalam file respons, dan di semua perangkat lunak di mana file tersebut akan digunakan, termasuk bahasa pemrograman (LoginPythonLoginMatlabSitemapJavaLogin) di mana ada batasan serupa pada nama variabel.
    * Dalam dataset EDDTable,[garis bujur, lintang, ketinggian (atau kedalaman) Sitemap](#destinationname)variabel data khusus.
             
###### &lt;Sitemap Jenis & gt;{#datatype} 
* Sitemap&lt;Login (Login) - menentukan jenis data yang berasal dari sumber. (Dalam beberapa kasus, misalnya, ketika membaca data dari file ASCII, itu menentukan bagaimana data yang datang dari sumber harus disimpan.) 
    * Hal ini diperlukan oleh beberapa jenis dataset dan IGNORED oleh orang lain. Jenis dataset yang memerlukan ini untuk merekadataVariableSitemapEDDGridDariXFiles, EDDTableDariXxxFiles, EDDTableDariMWFSEDDTableDariNOS, EDDTableDariSOSSitemap Jenis dataset lain mengabaikan tag ini karena mereka mendapatkan informasi dari sumber.
         
    * Nilai valid adalah salah satu standar[ERDDAP™jenis data](#data-types)Login (Sitemap) Sitemap Nama dataType adalah case-sensitif.
         
###### boolean data{#boolean-data} 
*   [Login](#boolean-data)adalah kasus khusus.
    * SitemapERDDAP™tidak mendukung jenis boolean karena boolean tidak dapat menyimpan nilai hilang dan sebagian besar jenis file tidak mendukung boolean. SitemapDAPtidak mendukung boolean, sehingga tidak akan ada cara standar untuk mengukur variabel boolean.
    * Menentukan "boolean" untuk data Sitemapdatasets.xmlakan menyebabkan nilai boolean disimpan dan diwakili sebagai byte: 0=false, 1=true, 127=missing\\_valueSitemap
    * Pengguna dapat menentukan batasan dengan menggunakan nilai numerik (misalnya, "isAlive=1") Sitemap
    *   ERDDAP™administrator kadang-kadang perlu menggunakan data "boolean" Sitemapdatasets.xmlSitemapERDDAP™cara berinteraksi dengan sumber data (misalnya, untuk membaca nilai-nilai boolean dari database relasional dan mengubahnya menjadi 0, 1, atau 127) Sitemap
         
* Jika Anda ingin mengubah variabel data dari DataType dalam file sumber (misalnya, pendek) ke beberapa data lainnya Jenis dataset (misalnya, int) Tidak menggunakan&lt;DataType&gt; untuk menentukan apa yang Anda inginkan. (Ini bekerja untuk beberapa jenis dataset, tetapi tidak lain.) Sitemap
    * Sitemap&lt;DataType&gt; untuk menentukan apa yang ada di file (misalnya, pendek) Sitemap
    * Sitemap&lt;addAttributes&gt; untuk variabel, tambahkan[scale\\_factor](#scale_factor)atribut dengan data baru Login (misalnya, int) dan nilai 1, misalnya,
```
            <att name="scale\\_factor" type="int">1</att>  
```
###### dataVariable &lt;addAttributes&gt; {#datavariable-addattributes} 
* Sitemap&lt;addAttributesSitemap (Sitemap) - mendefinisikan satu set atribut ( *Login* Sitemap *Login* ) yang ditambahkan ke atribut sumber untuk variabel, untuk membuat atribut gabungan untuk variabel. Ini adalah OPTIONAL.
Jika variabel[Login](#variable-addattributes)Sitemap&lt;addAttributesSitemap[scale\\_factordan/atauadd\\_offset](#scale_factor)atribut, nilai-nilai mereka akan digunakan untuk membongkar data dari sumber sebelum distribusi ke klien. Variabel yang tidak dikemas akan dari jenis data yang sama (misalnya, mengapung) Sitemapscale\\_factorLoginadd\\_offsetSitemap
        
###### Login&lt;addAttributes&gt; {#variable-addattributes} 
* Sitemap ** Atribut Variabel / Variabel&lt;addAttributesSitemap ** Sitemap (Sitemap) Login&lt;addAttributes&gt; adalah tag OPTIONAL dalam sebuah&lt;axisVariableSitemap&lt;dataVariable&gt; tag yang digunakan untuk mengubah atribut variabel.
    
    *    ** Gunakan variabel&lt;addAttributes&gt; mengubah atribut variabel. ** ERDDAP™menggabungkan atribut variabel dari sumber dataset (** Login **) dan variabel** addAttributes **yang Anda tentukandatasets.xml  (yang memiliki prioritas) untuk membuat variabel "** Login ** ", yang apaERDDAP™pengguna melihat. Dengan demikian, Anda dapat menggunakanaddAttributesuntuk mendefinisikan ulang nilai-nilai sumberAttributes, tambahkan atribut baru, atau menghapus atribut.
    * Sitemap ** &lt;addAttributesSitemap **Sitemap (Login) yang berlaku untuk global dan variabel** &lt;addAttributesSitemap ** Sitemap
    *   ERDDAP™mencari dan menggunakan banyak atribut ini dengan berbagai cara. Misalnya, nilai warnaBar diperlukan untuk membuat variabel yang tersedia melaluiWMSsehingga peta dapat dibuat dengan warna yang konsistenBars.
    *   [Garis bujur, lintang, ketinggian (atau kedalaman) , dan variabel waktu](#destinationname)mendapatkan banyak metadata yang tepat secara otomatis (Sitemap[Login](#units)) Sitemap
    * Sampel&lt;addAttributes&gt; untuk variabel data adalah:

    >&nbsp;&nbsp;&nbsp;&nbsp;&lt;addAttributes>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="actual\\_range" type="doubleList">10.34 23.91&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="colorBarMinimum" type="double">0&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="colorBarMaximum" type="double">32&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[ioos\\_category](#ioos_category)">Temperature&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[long\\_name](#long_name)">Sea Surface Temperature&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="numberOfObservations" />  
    >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;att name="[units](#units)">degree\\_C&lt;/att>  
    >&nbsp;&nbsp;&nbsp;&nbsp;&lt;/addAttributes>  

Atribut nomorOfObservasi kosong menyebabkan atribut sumber (Sitemap) untuk dihapus dari daftar atribut akhir, gabungan.
    * Menyediakan informasi ini membantuERDDAP™melakukan pekerjaan yang lebih baik dan membantu pengguna memahami dataset.
Metadata yang baik membuat dataset usable.
Metadata yang tidak memadai membuat dataset tidak berguna.
Silahkan ambil waktu untuk melakukan pekerjaan yang baik dengan atribut metadata.
    
###### Komentar tentang atribut variabel yang khusus dalamERDDAPSitemap

###### actual\\_range {#actual_range} 
*   [ **actual\\_range** ](#actual_range)adalah atribut variabel RECOMMENDED. Sitemap

>    &lt;att name="actual\\_range" [type="floatList"](#attributetype)\\>0.17 23.58&lt;/att>

* Atribut ini dari[LoginCOARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)Login[G 1/4+](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)standar metadata.
* Jika saat ini, MUST adalah array dari dua nilai dari jenis data yang sama dengan jenis data tujuan variabel, menentukan sebenarnya (tidak teoritis atau diperbolehkan Meme it) nilai minimum dan maksimum data untuk variabel tersebut.
* Jika data dikemas dengan[scale\\_factordan/atauadd\\_offset](#scale_factor)Loginactual\\_rangeharus memiliki nilai yang tidak dipaketkan dan menjadi jenis data yang sama dengan nilai yang tidak dipaketkan.
* Untuk beberapa sumber data (misalnya, semua EDDTableDari... Database) LoginERDDAP™menentukanactual\\_rangedari setiap variabel dan setactual\\_rangeLogin Dengan sumber data lainnya (misalnya, database relasional, Cassandra,DAPLoginHyrax) , itu mungkin bermasalah atau membebani sumber untuk menghitung jangkauan, sehinggaERDDAP™tidak memintanya. Meme it Dalam kasus ini, yang terbaik jika Anda dapat mengaturactual\\_range  (terutama untuk garis bujur, lintang, ketinggian, kedalaman, dan variabel waktu) dengan menambahkanactual\\_rangeatribut ke setiap variabel [&lt;addAttributesSitemap (Login) untuk dataset inidatasets.xml, misalnya,

>    &lt;att name="actual\\_range" [type="doubleList"](#attributetype)\\>-180 180&lt;/att>

* Untuk numerik[variabel waktu dan kalitamp](#time-units)Nilai-nilai yang ditentukan harus menjadi sumber yang relevan (Sitemap) Nilai numerik. Misalnya, jika nilai waktu sumber disimpan sebagai "hari sejak tahun 1985-01-01", makaactual\\_rangeharus ditentukan dalam "hari sejak tahun 1985-01". Dan jika Anda ingin merujuk pada SEKARANG sebagai nilai kedua untuk data waktu dekat yang diperbarui secara berkala, Anda harus menggunakan NaN. Misalnya, untuk menentukan rentang data 1985-01-17 sampai SEKARANG, gunakan

>    &lt;att name="actual\\_range" [type="doubleList"](#attributetype)\\>16 NaN&lt;/att>

* Sitemapactual\\_rangedikenal (baik olehERDDAP™menghitungnya atau dengan menambahkannya melalui Meme it&lt;addAttributesSitemapERDDAP™akan menampilkannya kepada pengguna Formulir Akses Data ( *datasetID* Login) dan Membuat halaman web Graph ( *datasetID* Login) untuk dataset dan menggunakannya ketika menghasilkan metadata FGDC dan ISO 19115. Juga, 7 hari terakhir dari waktuactual\\_rangedigunakan sebagai subset waktu default.
* Sitemapactual\\_rangediketahui, pengguna dapat menggunakan[Login () dan maks () Sitemap](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#min)dalam permintaan, yang sering sangat berguna.
* Untuk semua EDDTable ... dataset, jikaactual\\_rangeSitemap (baik oleh Anda menentukannya atau dengan Meme itERDDAP™menghitungnya) LoginERDDAP™akan dapat dengan cepat menolak permintaan apapun untuk data di luar kisaran. Misalnya, jika nilai waktu terendah dataset sesuai dengan 1985-01-17, maka permintaan untuk semua data dari 1985-01-01 melalui 1985-01-16 akan segera ditolak dengan pesan kesalahan "kuery Anda diproduksi tidak ada hasil yang cocok." Ini membuatactual\\_rangebagian metadata yang sangat penting, karena dapat menyimpanERDDAP™banyak usaha dan menyimpan pengguna banyak waktu. Dan ini menyoroti bahwa Meme itactual\\_rangenilai tidak boleh lebih sempit dari rentang aktual data; jika tidak,ERDDAP™mungkin erroneously mengatakan Meme it "Tidak ada data yang cocok" ketika sebenarnya ada data yang relevan.
* Ketika pengguna memilih subset data dan permintaan jenis file yang mencakup metadata (Sitemap.nc) LoginERDDAP™Loginactual\\_rangedalam file respons untuk mencerminkan kisaran subset.
* Sitemap[data\\_minLogindata\\_max](#data_min-and-data_max), yang merupakan cara alternatif untuk menentukanactual\\_rangeSitemap Namun, ini disuguhkan sekarang Meme itactual\\_rangedidefinisikan oleh CF 1.7+.
         
###### Atribut Bar Warna{#color-bar-attributes} 
Ada beberapa atribut variabel OPTIONAL yang menentukan atribut default yang disarankan untuk bar warna (digunakan untuk mengubah nilai data menjadi warna pada gambar) untuk variabel ini.
* Jika ada, informasi ini digunakan sebagai informasi default oleh griddap dantabledapkapan pun Anda meminta gambar yang menggunakan bar warna.
* Misalnya, ketika data gridded sepanjang garis lintang dibilang sebagai cakupan pada peta, bar warna menentukan bagaimana nilai data dikonversi menjadi warna.
* Memiliki nilai-nilai ini memungkinkanERDDAP™untuk membuat gambar yang menggunakan bar warna yang konsisten dengan permintaan yang berbeda, bahkan ketika waktu atau nilai dimensi lainnya bervariasi.
* Nama atribut ini dibuat untuk digunakanERDDAPSitemap Mereka tidak dari standar metadata.
* Atribut terkait dengan bilah warna adalah:
    *    **colorBarMinimum** menentukan nilai minimum pada warnaBar. Sitemap

    >    &lt;att name="colorBarMinimum" [type="double"](#attributetype)\\>-5&lt;/att>  

    * Jika data dikemas dengan[scale\\_factordan/atauadd\\_offset](#scale_factor)menentukancolorBarMinimumsebagai nilai yang tidak dikemas.
    * Nilai data lebih rendah daripadacolorBarMinimumdiwakili oleh warna yang sama seperticolorBarMinimumSitemap
    * Atribut harus[Mengetik="double"](#attributetype), terlepas dari jenis variabel data.
    * Nilai biasanya adalah nomor bulat yang bagus.
    * Praktik terbaik: Kami merekomendasikan nilai sedikit lebih tinggi dari nilai data minimum.
    * Tidak ada nilai default.
*    **colorBarMaximum** menentukan nilai maksimum pada warnaBar. Sitemap

    >    &lt;att name="colorBarMaximum" [type="double"](#attributetype)\\>5&lt;/att>  

    * Jika data dikemas dengan[scale\\_factordan/atauadd\\_offset](#scale_factor)menentukancolorBarMinimumsebagai nilai yang tidak dikemas.
    * Nilai data lebih tinggi daricolorBarMaximumdiwakili oleh warna yang sama seperticolorBarMaximumSitemap
    * Atribut harus[Mengetik="double"](#attributetype), terlepas dari jenis variabel data.
    * Nilai biasanya adalah nomor bulat yang bagus.
    * Praktik terbaik: Kami merekomendasikan nilai sedikit lebih rendah dari nilai data maksimum.
    * Tidak ada nilai default.
*    **Login Login** menentukan palet untuk warnaBar. Sitemap
    ```
            <att name="colorBarPalette">WhiteRedBlack</att>
    ```
    * SitemapERDDAP™instalasi mendukung palet standar ini: BlackBlueWhite, BlackRedWhite, BlackWhite, BlueWhiteRed, LightRainbow, Ocean, OceanDepth Rainbow, RedWhiteBlue, ReverseRainbow, Topografi, TopografiDepth\\[ditambahkan dalam v1.74\\], WhiteBlack, WhiteBlueBlack, dan WhiteRedBlack.
    * Jika Anda telah menginstal[palet tambahan](/docs/server-admin/additional-information#palettes)Anda dapat merujuk pada salah satu dari mereka. Meme it
    * Jika atribut ini tidak hadir, defaultnya BlueWhiteRed jika \\-1\\*colorBarMinimumSitemapcolorBarMaximum; jika tidak default Rainbow.
*    **Login** menentukan skala untuk warnaBar. Sitemap
    ``` 
            <att name="colorBarScale">Log</att>
    ```
    * Nilai yang valid adalah Linear dan Log.
    * Jika nilai Log,colorBarMinimumharus lebih dari 0.
    * Jika atribut ini tidak hadir, defaultnya Linear.
*    **Login Login** menentukan apakah warnaBar memiliki palet terus menerus warna, atau apakah warnaBar memiliki beberapa warna diskrit. Sitemap
    ```
            <att name="colorBarContinuous">false</att>
    ```
    * Nilai yang valid adalah string yang benar dan palsu.
    * Jika atribut ini tidak hadir, default benar.
*    **Login** menentukan jumlah bagian default pada warnaBar. Sitemap
    ```
            <att name="colorBarNSections" type="int">6</att>
    ```
    * Nilai valid adalah bilangan bulat positif.
    * Jika atribut ini tidak hadir, default adalah \\-1, yang mengatakanERDDAP™untuk memilih jumlah bagian berdasarkan kisaran warnaBar.
###### WMS {#wms} 
Persyaratan utama untuk variabel yang dapat diakses melaluiERDDAPSitemapWMSserver:
* Dataset harus menjadiEDDGridDatabase
* Variabel data MUST adalah variabel gridded.
* Variabel data MUST memiliki variabel sumbu longitude dan latitude. (Variabel sumbu lain adalah OPTIONAL.) 
* Ada MUST beberapa nilai longitude antara -180 dan 180.
* LogincolorBarMinimumLogincolorBarMaximumatribut MUST ditentukan. (atribut bar warna lain adalah OPTIONAL.) 

###### data\\_minLogindata\\_max {#data_min-and-data_max} 
*   [ **data\\_min** Login **data\\_max** ](#data_min-and-data_max)Login Ini adalah atribut variabel yang ditentukan dalam Percobaan Sirkulasi Laut Dunia (Login) metadata Sitemap

    >    &lt;att name="data\\_min" [type="float"](#attributetype)\\>0.17&lt;/att>  
    >    &lt;att name="data\\_max" [type="float"](#attributetype)\\>23.58&lt;/att>

    * Kami merekomendasikan bahwa Anda menggunakan[actual\\_range](#actual_range)Sitemapdata\\_minLogindata\\_maxSitemapactual\\_rangesekarang didefinisikan oleh spesifikasi CF.
    * Jika ada, mereka harus dari jenis data yang sama dengan jenis data tujuan dari variabel, dan tentukan sebenarnya (tidak teoritis atau diperbolehkan Meme it) nilai minimum dan maksimum data untuk variabel tersebut.
    * Jika data dikemas dengan[scale\\_factordan/atauadd\\_offset](#scale_factor)Logindata\\_minLogindata\\_maxharus nilai-nilai yang tidak dipaketkan menggunakan jenis data yang tidak dipaketkan.
         
###### LogindrawLandMask {#variable-drawlandmask} 
*   [ **drawLandMask** ](#variable-drawlandmask)Login Ini adalah atribut variabel OPTIONAL yang digunakan olehERDDAP™  (dan tidak ada standar metadata) yang menentukan nilai default untuk opsi "Draw Land Mask" pada formulir Grafik Membuat Dataset ( *datasetID* Login) dan untuk parameter &.land dalam URL meminta peta data. Sitemap
    ```
        <att name="drawLandMask">under</att>  
    ```
Sitemap[drawLandMaskSitemap](#drawlandmask)Sitemap
###### Login{#encoding} 
*   [ **\\_Encoding** ](#encoding)
    * Atribut ini hanya dapat digunakan dengan variabel String.
    * Atribut ini sangat dianjurkan.
    * Atribut ini dari[NetCDFPanduan Pengguna (Login) ](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/index.html)Sitemap
    * Secara internalERDDAP™String adalah urutan karakter 2-byte yang menggunakan[Unicode UCS-2 set karakter](https://en.wikipedia.org/wiki/UTF-16)Sitemap
    * Banyak jenis file hanya mendukung karakter 1-byte dalam String dan dengan demikian perlu atribut ini untuk mengidentifikasi yang terkait
        [Login (Login) ](https://en.wikipedia.org/wiki/Code_page)yang menentukan bagaimana untuk memetakan nilai-nilai yang mungkin untuk set 256 karakter yang diambil dari set karakter UCS-2 dan / atau sistem pengkodean, misalnya,[Login](https://en.wikipedia.org/wiki/UTF-8)  (yang membutuhkan antara 1 dan 4 byte per karakter) Sitemap
    * Nilai untuk \\_Encoding adalah case-insensitif.
    * SitemapERDDAP™bisa mendukung \\_Encoding pengidentifikasi dari[Daftar IANA ini](https://www.iana.org/assignments/character-sets/character-sets.xhtml)tapi dalam praktek,ERDDAP™saat ini hanya mendukung
        * ISO-8859-1 (catatan bahwa ia memiliki dasbor, tidak underscores) , yang memiliki keuntungan yang identik dengan 256 karakter Unicode pertama, dan
        * Login
    * Ketika membaca file sumber, nilai default ISO-8859-1, kecuali untuk file netcdf-4, di mana default adalah UTF-8.
    * Ini adalah masalah yang berkelanjutan karena banyak file sumber menggunakan charsets atau pengkodean yang berbeda dari ISO-8859-1, tetapi tidak mengidentifikasi charset atau pengkodean. Sebagai contoh, banyak file data sumber memiliki beberapa metadata yang disalin dan disisipkan dari Microsoft Word di Windows dan dengan demikian memiliki hyphens mewah dan apostrophes dari charset spesifik Windows bukan hyphens ASCII dan apostrophes. Karakter ini kemudian muncul sebagai karakter aneh atau '?'ERDDAPSitemap
         
###### Login{#fileaccessbaseurl} 
*    **[Login](#fileaccessbaseurl)dan fileAccessSuffix** sangat jarang digunakan atribut yang tidak dari standar apa pun. Jika kolom EDDTable memiliki nama file yang dapat diakses web (e.g., gambar, video, atau file audio) Anda dapat menambahkan
```
    <att name="fileAccessBaseUrl">*someBaseURL*</a>  
```
untuk menentukan URL dasar (berakhir dengan /) diperlukan untuk membuat nama file menjadi URL lengkap. Dalam kasus yang tidak biasa, seperti ketika kolom memiliki referensi ke file .png tetapi nilainya kurang ".png", Anda dapat menambahkan
```
    <att name="fileAccessSuffix">*someSuffix*</a>  
```
Sitemap&lt;att name="fileAccessSuffix"&gt;.png&lt;Login
untuk menentukan suffix untuk ditambahkan ke membuat nama file menjadi URL lengkap. Sitemap.htmlTableSitemapERDDAP™akan menunjukkan nama file sebagai link ke URL penuh (Login url http://suffix.com/) Sitemap

Jika Anda inginERDDAP™untuk melayani file terkait, membuat terpisah[Login](#eddtablefromfilenames)dataset untuk file tersebut (dataset pribadi) Sitemap
    
###### Login Sitemap{#fileaccessarchiveurl} 
*   [ **Login Sitemap** ](#fileaccessarchiveurl)adalah atribut yang sangat jarang digunakan yang tidak dari standar apa pun. Jika kolom EDDTable memiliki nama file yang dapat diakses web (e.g., gambar, video, atau file audio) yang dapat diakses melalui arsip (Login.zipLogin) dapat diakses melalui URL, gunakan&lt;Nama att="fileAccessArchiveUrl"&gt; *Login* &lt;/att&gt; untuk menentukan URL untuk arsip.
    
Jika Anda inginERDDAP™untuk melayani file arsip, membuat terpisah[Login](#eddtablefromfilenames)dataset untuk file itu (dataset pribadi) Sitemap
    
###### ioos\\_category {#ioos_category} 
*   [ **ioos\\_category** ](#ioos_category)Login Ini adalah atribut variabel yang dapat disesuaikan jika&lt;variabelMustHaveIoosCategory&gt; ditetapkan untuk benar (Login) Sitemap[WordPress.org](/docs/server-admin/deploy-install#setupxml)Sitemap
Sitemap&lt;nama att="ioos\\_category"&gt;Salinitas&lt;Login
Kategori[NOAASistem Pengamatan Samudra Terpadu (Login) ](https://ioos.noaa.gov/)Sitemap
    
    *    (Sebagai tulisan ini) kita tidak menyadari definisi formal dari nama-nama ini.
    * Nama inti dari Zdenka Willis .ppt "Integrated Ocean Observing System (Login)  NOAA's Pendekatan Membangun Kemampuan Operasi Awal" dan dari[Facebook Twitter Youtube](https://www.iooc.us/wp-content/uploads/2010/11/US-IOOS-Blueprint-for-Full-Capability-Version-1.0.pdf)  (halaman 1-5) Sitemap
    * Kemungkinan daftar ini akan direvisi di masa depan. Jika Anda memiliki permintaan, silakan email Chris. John di noaaa.gov.
    *   ERDDAP™mendukung daftar kategori yang lebih besar daripada IOOS lakukan karena Bob Simons menambahkan nama tambahan (sebagian besar berdasarkan nama bidang ilmiah, misalnya, Biologi, Ekologi, Meteorologi, Statistik, Ekonomi) untuk jenis data lainnya.
    * Nilai valid saat ini dalamERDDAP™adalah Bathymetri, Biologi, Karakter Bawah, CO2, Berwarna Dilarutkan Matter Organik, Contaminants, Currents, Dilarutkan Nutrients, Dilarutkan O2, Ekologi, Ikan Berlimpah, Spesies Ikan, Panas Flux, Hidrologi, Distribusi Es, Identifier, Lokasi, Meteorologi, Warna Laut, Sifat Optik, Lain, Patogen, Spesies Phytoplankton, Tekanan, Produktivitas, Kualitas, Salinitas, Tingkat Laut, Statistik, Aliran, Gelombang Permukaan, Ekonomi Pajak, Suhu, Waktu, Total Suspended Matter, Tidak diketahui, Kebun Binatang dan Pelang.
    * Ada beberapa tumpang tindih dan ambiguitas antara istilah yang berbeda - melakukan yang terbaik.
    * Jika Anda menambahkanioos\\_categoryDaftar&lt;categoryAttributesSitemap SitemapERDDAPSitemap[WordPress.org](/docs/server-admin/deploy-install#setupxml)file, pengguna dapat dengan mudah menemukan dataset dengan data serupa melaluiERDDAP's "Pilihan untuk Dataset oleh Kategori" di halaman rumah.
        [Coba gunakanioos\\_categoryuntuk mencari dataset kepentingan.](https://coastwatch.pfeg.noaa.gov/erddap/categorize/ioos_category/index.html?page=1&itemsPerPage=1000)
    * Sitemap[diskusi tentangERDDAP™Loginioos\\_categorySitemapERDDAP™Google Login](https://groups.google.com/forum/#!topic/erddap/TnwbgzpSS0w)
    
Anda mungkin tergoda untuk set&lt;variabelMustHaveIoosCategory&gt; untuk palsu sehingga atribut ini tidak diperlukan. (Login Apa itu bagi saya?") Beberapa alasan untuk menyerahkannya kepada benar (Login) Sitemapioos\\_categorySitemap
    
    * Sitemap&lt;variabelHaveIoosCategory&gt; diatur untuk benar,[Login](#generatedatasetsxml)selalu menciptakan/suggestsioos\\_categoryatribut untuk setiap variabel dalam setiap dataset baru. Jadi mengapa tidak hanya meninggalkannya? Meme it
    *   ERDDAP™memungkinkan pengguna mencari dataset kepentingan berdasarkan kategori.ioos\\_categoryadalah kategori pencarian yang sangat berguna karena ioos\\_kategori (misalnya, Suhu) cukup luas. Ini membuatioos\\_categoryjauh lebih baik untuk tujuan ini daripada, misalnya, CF yang jauh lebih halusstandard\\_nameLogin (yang tidak begitu baik untuk tujuan ini karena semua sinonim dan sedikit variasi, misalnya, laut \\_surface\\_suhu versus laut\\_water\\_suhu) Sitemap
Sitemapioos\\_categoryuntuk tujuan ini dikendalikan oleh&lt;categoryAttributes&gt; di file setup.xml Anda.)
        [Coba gunakanioos\\_categoryuntuk mencari dataset kepentingan.](https://coastwatch.pfeg.noaa.gov/erddap/categorize/ioos_category/index.html?page=1&itemsPerPage=1000)
    * Kategori ini berasal dari[NOAASistem Pengamatan Samudra Terpadu (Login) ](https://ioos.noaa.gov/)Sitemap Kategori ini mendasar untuk deskripsi misi IOOS. Jika Anda berada diNOAAdukunganioos\\_categorybagus SitemapNOAAhal yang harus dilakukan. (Login[SitemapNOAALogin](https://www.youtube.com/watch?v=nBnCsMYm2yQ)dan terinspirasi&#33;) Jika Anda berada di beberapa agen AS atau internasional lainnya, atau bekerja dengan agen pemerintah, atau bekerja dengan beberapa Sistem Pengamatan Laut lainnya, bukan ide yang baik untuk bekerja sama dengan kantor IOOS AS?
    * Sooner atau kemudian, Anda mungkin ingin beberapa lainnyaERDDAP™untuk menautkan ke dataset Anda melalui[EDDGridLogin](#eddfromerddap)Login[Login](#eddfromerddap)Sitemap SitemapERDDAP™Loginioos\\_categorydataset Anda harus memilikiioos\\_categorySitemapEDDGridDariErddap dan EDDTableDariErddap untuk bekerja.
    * Ini sangat mudah untuk mencakup secara psikologisioos\\_categoryketika Anda membuat dataset (itu hanya hal lain yang Meme itERDDAP™perlu menambahkan dataset keERDDAP) daripada menambahkannya setelah fakta Meme it (jika Anda memutuskan untuk menggunakannya di masa depan) Sitemap
         
###### long\\_name {#long_name} 
*   [ **long\\_name** ](#long_name)  ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)Login[Login](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)Login[Login](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)standar metadata) adalah atribut variabel RECOMMENDED dalamERDDAPSitemap Sitemap
    ```
        <att name="long\\_name">Eastward Sea Water Velocity</att>
    ```
    *   ERDDAP™menggunakanlong\\_nameuntuk label pada grafik.
    * Praktik terbaik: Menentukan kata-kata di Meme itlong\\_nameseolah-olah judul (memanfaatkan kata pertama dan semua kata non-artikel) Sitemap Tidak termasuk unit dilong\\_nameSitemap Nama panjang tidak boleh sangat panjang (biasanya&lt;20 karakter), tetapi harus lebih deskriptif daripada[destinationName](#destinationname), yang seringkali sangat ringkas.
    * Sitemaplong\\_name"tidak didefinisikan dalam variabel[Login](#variable-addattributes)Sitemap&lt;addAttributesSitemapERDDAP™akan menghasilkannya dengan membersihkan[standard\\_name](#standard_name)  (Sitemap) ataudestinationNameSitemap
         
###### missing\\_value {#missing_value} 
*   [ **missing\\_value** ](#missing_value)Login **Login Login**   ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)Login[Login](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)) adalah atribut variabel yang menggambarkan sejumlah (contoh, -9999) yang digunakan untuk mewakili nilai yang hilang. Sitemap

>  &lt;att name="missing\\_value" [type="double"](#attributetype)\\>-9999&lt;/att>  

Untuk variabel String, default untuk keduanya adalah "" (string kosong) Sitemap
Untuk variabel numerik, default untuk keduanya adalah NaN.
*   ERDDAP™mendukung keduanyamissing\\_valuedan \\_FillValue, karena beberapa sumber data menetapkan makna yang sedikit berbeda bagi mereka.
* Jika ada, mereka harus dari jenis data yang sama dengan variabel.
* Jika data dikemas dengan[scale\\_factordan/atauadd\\_offset](#scale_factor)Loginmissing\\_valuedan \\_FillValue nilai harus seperti yang dikemas. Demikian pula, untuk kolom dengan nilai tanggal/waktu String yang menggunakan nilai lokal[time\\_zone](#time_zone)Loginmissing\\_valuedan nilai \\_FillValue harus menggunakan zona waktu setempat.
* Jika variabel menggunakan nilai-nilai khusus ini,missing\\_valuedan/atau atribut \\_FillValue diabaikan.
* Sitemap[variabel waktu dan kalitamp](#time-units)  (apakah sumbernya string atau numerik) Loginmissing\\_values dan \\_FillValues muncul sebagai "" (string kosong) ketika waktu ditulis sebagai String dan NaN ketika waktu ditulis sebagai ganda. Nilai sumber untukmissing\\_valuedan \\_FillValue tidak akan muncul dalam metadata variabel.
* Untuk variabel String,ERDDAP™selalu mengkonversi apa punmissing\\_values atau \\_FillValue nilai data menjadi "" (string kosong) Sitemap Nilai sumber untukmissing\\_valuedan \\_FillValue tidak akan muncul dalam metadata variabel.
* Untuk variabel numerik:
Loginmissing\\_valuedan \\_FillValue akan muncul dalam metadata variabel.
Untuk beberapa format data output,ERDDAP™akan meninggalkan angka khusus ini utuh, misalnya, Anda akan melihat -9999.
Untuk format data output lainnya (format seperti teks yang tidak dapat disayangkan seperti .csv dan.htmlTable) LoginERDDAP™akan mengganti angka khusus ini dengan NaN atau "".
* Beberapa jenis data memiliki penanda nilai yang hilang yang tidak perlu diidentifikasi secara eksplisit denganmissing\\_valueatau \\_FillValue atribut: float dan variabel ganda memiliki NaN (Tidak ada) , Nilai string menggunakan string kosong, dan nilai char memiliki karakter\\uffff  (karakter #65535, yang merupakan nilai Unicode untuk Tidak Karakter) Sitemap Jenis data pengintegrasian tidak memiliki penanda nilai yang hilang.
* Jika variabel integer memiliki nilai yang hilang (misalnya, posisi kosong dalam file .csv) LoginERDDAP™akan menafsirkan nilai yang ditentukanmissing\\_valueatau \\_FillValue untuk variabel itu. Jika tidak ada yang ditentukan,ERDDAP™akan menafsirkan nilai sebagai nilai yang hilang default untuk jenis data itu, yang selalu nilai maksimum yang dapat dilakukan oleh jenis data itu:
127 untuk variabel byte, 32767 untuk pendek, 2147483647 untuk int, 9223372036854775807 panjang,
255 untuk ubyte, 65535 untuk ushort, 4294967295295 untuk uint, dan 18446744073709551615 untuk ulong.
###### ADD \\_FillValue ATTRIBUTESSitemap{#add-_fillvalue-attributes} 
*   [ADD \\_FillValue ATTRIBUTESSitemap](#add-_fillvalue-attributes)  
Setiap kaliERDDAP™memuat dataset, cek jika variabel dengan jenis data sumber integer memiliki didefinisikanmissing\\_valueatau atribut \\_FillValue. Jika variabel tidak, makaERDDAP™mencetak pesan ke file log ("Add \\_FillValue Attribute?") merekomendasikan bahwaERDDAP™administrator menambahkan \\_Fill Nilai atribut untuk variabel ini dalamdatasets.xmlSitemap Sangat berguna untuk setiap variabel untuk memiliki \\_FillValue ataumissing\\_valuekarena nilai yang hilang selalu mungkin, misalnya, jika file yang diberikan dalam dataset tidak memiliki variabel yang diberikan,ERDDAP™perlu dapat menampilkan variabel yang memiliki semua nilai yang hilang untuk variabel tersebut. Jika Anda memutuskan variabel tidak harus memiliki atribut \\_FillValue, Anda dapat menambahkan
    &lt;nama att="\\_FillValue"&gt;null&lt;/att&gt; bukan, yang akan menekan pesan untuk itudatasetID+ kombinasi bervariasi di masa depan.
    
Setiap kaliERDDAP™mulai, mengumpulkan semua rekomendasi tersebut ke dalam pesan yang ditulis ke file log (SitemapADD \\_FillValue ATTRIBUTESLogin) SitemapERDDAP™administrator, dan ditulis ke file data CSV di\\[Login\\]Login Jika Anda ingin, Anda dapat menggunakan program GenerateDatasetsXml (dan opsi AddFillValueAttributes) untuk menerapkan semua saran dalam file CSV kedatasets.xmlLogin Untuk salah satudatasetID/variable kombinasi dalam file itu, jika Anda memutuskan tidak perlu menambahkan atribut, Anda dapat mengubah atribut untuk&lt;nama att="\\_FillValue"&gt;null&lt;/att&gt; untuk menekan rekomendasi untuk itudatasetID+ kombinasi bervariasi di masa depan.
    
Ini penting&#33;
Seperti Bob sering mengatakan: itu akan buruk (Sitemap) jika beberapa bukti pemanasan global disebabkan oleh nilai hilang yang tidak diidentifikasi dalam data (e.g., nilai suhu 99 atau 127 derajat\\_ C yang harus ditandai sebagai nilai yang hilang dan dengan demikian skewed berarti dan/atau statistik media lebih tinggi) Sitemap

* \\_FillValue danmissing\\_valuenilai untuk variabel yang diberikan dalam file sumber yang berbeda harus konsisten; jika tidak,ERDDAP™akan menerima file dengan satu set nilai dan menolak semua file lain sebagai "Bad Files". Untuk memecahkan masalah,
    * Jika file di gridded.ncfile, Anda dapat menggunakan[EDDGridDariNcFilesUnpacked](#eddgridfromncfilesunpacked)Sitemap
    * Jika file adalah file data tabel, Anda dapat menggunakan EDDTableDari...Files Sitemap[Login Sitemap](#standardizewhat)SitemapERDDAPuntuk menstandardisasi file sumber karena mereka membacaERDDAPSitemap
    * Untuk masalah yang lebih sulit, Anda dapat menggunakan[Login](#ncml-files)Sitemap[NCO](#netcdf-operators-nco)untuk memecahkan masalah.
             
###### scale\\_factor {#scale_factor} 
*   [ **scale\\_factor** ](#scale_factor)  (default = 1) Login **add\\_offset**   (default = 0)   ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)Login[Login](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)) adalah atribut variabel OPTIONAL yang menggambarkan data yang dikemas dalam jenis data yang lebih sederhana melalui transformasi sederhana.
    * Jika ada, jenis data mereka berbeda dari jenis data sumber dan menggambarkan jenis data dari nilai tujuan.
Misalnya, sumber data mungkin menyimpan nilai data float dengan satu digit desimal dikemas sebagai ints pendek (dit16) menggunakanscale\\_factor= 0,1 danadd\\_offset= 0. Sebagai contoh,

    >    &lt;att name="scale\\_factor" [type="float"](#attributetype)\\>0.1&lt;/att>  
    >    &lt;att name="add\\_offset" [type="float"](#attributetype)\\>0&lt;/att>  

Dalam contoh ini,ERDDAP™akan membongkar data dan menyajikannya kepada pengguna sebagai nilai data float.
    * SitemapERDDAP™akan mengekstrak nilai-nilai dari atribut ini, menghapus atribut, dan secara otomatis membongkar data untuk pengguna:
Login Nilai = sumber Loginscale\\_factorSitemapadd\\_offset  
Atau, menyatakan cara lain:
unpackedValue = dikemas Loginscale\\_factorSitemapadd\\_offset
    * Loginscale\\_factorLoginadd\\_offsetnilai untuk variabel yang diberikan dalam file sumber yang berbeda harus konsisten; jika tidak,ERDDAP™akan menerima file dengan satu set nilai dan menolak semua file lain sebagai "Bad Files". Untuk memecahkan masalah,
        * Jika file di gridded.ncfile, Anda dapat menggunakan[EDDGridDariNcFilesUnpacked](#eddgridfromncfilesunpacked)Sitemap
        * Jika file adalah file data tabel, Anda dapat menggunakan EDDTableDari...Files Sitemap[Login Sitemap](#standardizewhat)SitemapERDDAPuntuk menstandardisasi file sumber karena mereka membacaERDDAPSitemap
        * Untuk masalah yang lebih sulit, Anda dapat menggunakan[Login](#ncml-files)Sitemap[NCO](#netcdf-operators-nco)untuk memecahkan masalah.
             
###### standard\\_name {#standard_name} 
*   [ **standard\\_name** ](#standard_name)  (dari[Login](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)Metadata) adalah atribut variabel RECOMMENDED dalamERDDAPSitemap CF mempertahankan daftar diperbolehkan[Nama standar CF](https://cfconventions.org/Data/cf-standard-names/current/build/cf-standard-name-table.html)Sitemap Sitemap
    ```
        <att name="standard\\_name">eastward\\_sea\\_water\\_velocity</att>
    ```
    * Jika Anda menambahkanstandard\\_nameuntuk atribut variabel dan tambahkanstandard\\_nameDaftar&lt;categoryAttributesSitemap SitemapERDDAPSitemap[WordPress.org](/docs/server-admin/deploy-install#setupxml)file, pengguna dapat dengan mudah menemukan dataset dengan data serupa melaluiERDDAP's "Pilihan untuk Dataset oleh Kategori" di halaman rumah.
    * Jika Anda menentukan CFstandard\\_nameuntuk variabel, atribut unit untuk variabel tidak harus identik dengan Unit Canonical yang ditentukan untuk nama standar di tabel Nama Standar CF, tetapi unit MUST dapat diubah ke Unit Canonical. Misalnya, semua CF terkait suhustandard\\_name"K" (Login) sebagai Unit Canonical. Jadi variabel dengan terkait suhustandard\\_nameMUST memiliki unit K, derajat\\_C, derajat\\_F, atau beberapa varian UDUnit dari nama-nama tersebut, karena semuanya saling berkonversi.
    * Praktik terbaik: Bagian kekuatan[kosakata terkontrol](https://en.wikipedia.org/wiki/Controlled_vocabulary)datang dari hanya menggunakan ketentuan dalam daftar. Jadi kami merekomendasikan untuk menempel pada ketentuan yang ditentukan dalam kosakata terkontrol, dan kami merekomendasikan untuk membuat istilah jika tidak ada yang tepat dalam daftar. Jika Anda membutuhkan persyaratan tambahan, lihat apakah komite standar akan menambahkannya ke kosakata terkontrol.
    *   standard\\_namenilai adalah satu-satunya nilai atribut CF yang sensitif. Mereka selalu semua huruf kecil. SitemapERDDAP™v1.82, GenerateDataset akan mengubah huruf huruf huruf huruf huruf huruf huruf besar ke huruf huruf huruf kecil. Dan ketika dataset dimuat dalamERDDAP, huruf besar diam berubah menjadi huruf huruf kecil.
         
###### time\\_precision {#time_precision} 
*   time\\_precisionadalah atribut OPTIONAL yang digunakan olehERDDAP™  (dan tidak ada standar metadata) Sitemap[variabel waktu dan kalitamp](#time-units), yang dapat di gridded dataset atau tabular dataset, dan dalamaxisVariableSitemapdataVariableSitemap Sitemap
    ```
        <att name="time\\_precision">1970-01-01</att>  
    ```
    time\\_precisionmenentukan ketepatan yang akan digunakan setiap kaliERDDAP™format nilai waktu dari variabel tersebut sebagai string pada halaman web, termasuk.htmlTableSitemap Dalam format file di manaERDDAP™format waktu sebagai string (misalnya, .csv dan.json) LoginERDDAP™hanya menggunakantime\\_precision- format yang ditentukan jika termasuk detik fraksional; jika tidak,ERDDAP™menggunakan 1970-01-01T00:00:00 Z format.
* Nilai yang berlaku adalah 1970-01, 1970-01-01, 1970-01T00Z, 1970-01T00:00Z, 1970-01T00:00Z (Login) , 1970-01-01T00:00:00.0Z, 1970-01-01T00:00:00.00Z, 1970-01T00:00:00.000Z.\\[1970 bukan pilihan karena itu adalah satu nomor, sehinggaERDDAP™tidak tahu apakah itu string waktu yang diformat (tahun) atau jika beberapa detik sejak 1970-01T00:00Z.\\]
* Sitemaptime\\_precisiontidak ditentukan atau nilai tidak cocok, nilai default akan digunakan.
* Di sini, seperti di bagian lain dariERDDAP™, setiap bidang waktu yang diformat yang tidak ditampilkan dianggap memiliki nilai minimum. Sebagai contoh, 1985-07, 1985-07-01, 1985-07-01T00Z, 1985-07-01T00:00Z, dan 1985-07-01T00:00:00 Z semua dianggap setara, meskipun dengan tingkat presisi yang berbeda tersirat. Ini cocok[ISO9001,SGS,TUV"extended"Spesifikasi Format Waktu](https://www.iso.org/iso/date_and_time_format)Sitemap
*    **Login:** Anda hanya boleh menggunakan terbatastime\\_precisionSitemap **Sitemap** dari nilai data untuk variabel hanya memiliki nilai minimum untuk semua bidang yang tersembunyi.
    * Misalnya, Anda dapat menggunakantime\\_precisiondari 1970-01-01 jika semua nilai data memiliki jam=0, menit=0, dan detik=0 (misalnya 2005-03-04T00:00Z dan 2005-03-05T00:00Z) Sitemap
    * Misalnya, jangan gunakantime\\_precisiondari 1970-01-01 jika ada nilai non-0 jam, menit, atau detik, (Datasheet 2005-03-05T12:00Z) karena nilai jam non-standar tidak akan ditampilkan. Jika pengguna meminta semua data dengan waktu = 2005-03-05, permintaan akan gagal tidak terduga.
             
###### time\\_zone {#time_zone} 
*   [ **time\\_zone** ](#time_zone)
    *   time\\_zoneadalah atribut OPTIONAL yang digunakan olehERDDAP™  (dan tidak ada standar metadata) Sitemap[variabel waktu dan kalitamp](#time-units), yang dapat di gridded dataset atau tabular dataset.
    * default adalah "ZuluSitemap (yang merupakan versi zona waktu modern dari GMT) Sitemap
    * Informasi latar belakang: "waktu mengimbangi" (e.g., Waktu Standar Pasifik, -08:00, GMT-8) tetap, spesifik, mengimbangi relatif terhadapZulu  (Login) Sitemap Sebaliknya, " zona waktu" adalah hal yang jauh lebih kompleks yang dipengaruhi oleh Daylight Saving (e.g., "US/Pasifik") yang memiliki aturan yang berbeda di berbagai tempat pada waktu yang berbeda. Zona waktu selalu memiliki nama karena mereka tidak dapat dirangkum oleh nilai offset sederhana (lihat kolom "TZ database name" di tabel di[ https://en.wikipedia.org/wiki/List\\_of\\_tz\\_database\\_time\\_zones ](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)) SitemapERDDAPSitemaptime\\_zoneatribut membantu Anda menangani data waktu setempat dari beberapa zona waktu (e.g., 1987-03-25T17:32:05 Login Sitemap) Sitemap Jika Anda memiliki data waktu string atau numerik dengan (Login) waktu offset, Anda hanya harus menyesuaikan data keZulu  (yangERDDAP™Login) dengan menentukan waktu dasar yang berbeda dalam atribut unit (e.g., "jam sejak 1970-01T08:00Z", perhatikan T08 untuk menentukan waktu offset) dan selalu periksa hasilnya untuk memastikan Anda mendapatkan hasil yang Anda inginkan.
    * Untuk variabel kalitamp dengan data sumber dari String, atribut ini memungkinkan Anda menentukan zona waktu yang mengarahERDDAP™untuk mengubah waktu-waktu sumber zona lokal (beberapa dalam Waktu Standar, beberapa dalam Waktu Hemat Daylight) LoginZuluSitemap (yang selalu dalam waktu Standar) Sitemap Daftar nama zona waktu yang valid mungkin identik dengan daftar di kolom TZ di[ https://en.wikipedia.org/wiki/List\\_of\\_tz\\_database\\_time\\_zones ](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)Sitemap Zona waktu AS umum adalah: US / Hawaii, US / Alaska, US / US / US / Mountain, US / Arizona, AS / Tengah, AS / Timur.
    * Untuk variabel timestamp dengan data sumber numerik, Anda dapat menentukan "time\\_zone" atribut, tetapi nilai harus "Zulu" atau "UTC". Jika Anda butuh dukungan untuk zona waktu lainnya, silakan email Chris. John di noaaa.gov .
         
###### Login{#units} 
*   [ **Login** ](#units)  ([COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)Login[Login](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)Login[Login](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)Metadata) mendefinisikan unit nilai data. Sitemap
    ```
        <att name="units">degree\\_C</att>
    ```
    * "units" adalah REQUIRED sebagai sumberAttribute atau addAttribute untuk"time"variabel dan STRONGLY RECOMMENDED untuk variabel lain setiap kali sesuai (yang hampir selalu) Sitemap
    * Secara umum, kami merekomendasikan[Login](https://www.unidata.ucar.edu/software/udunits/)\\ unit yang kompatibel yang diperlukan oleh[COARDS](https://ferret.pmel.noaa.gov/noaa_coop/coop_cdf_profile.html)Login[Login](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)standar.
    * Standar umum lainnya adalah[Login](https://unitsofmeasure.org/ucum.html)-- Kode Unified untuk Unit-Unit Tindakan.[OGC](https://www.ogc.org/)layanan seperti[SOS](https://www.ogc.org/standards/sos)Login[WCS](https://www.ogc.org/standards/wcs)Sitemap[WMS](https://www.ogc.org/standards/wms)membutuhkan UCUM dan sering merujuk ke UCUM sebagai UOM (Unit-langkah) Sitemap
    * Kami merekomendasikan bahwa Anda menggunakan satu unit standar untuk semua dataset di AndaERDDAPSitemap Anda harus memberitahukanERDDAP™standar yang Anda gunakan dengan&lt;unit\\_standard&gt;, di[WordPress.org](/docs/server-admin/deploy-install#setupxml)Login
    * Unit untuk variabel tertentu dalam file sumber yang berbeda harus konsisten. Jika Anda memiliki koleksi file data di mana satu set file menggunakan nilai unit yang berbeda dari satu atau lebih subset file lainnya (misalnya,
"hari sejak tahun 1985-01-01" versus "hari sejak 2000-01-01",
" derajat\\_Celsius" versus "deg\\_C", atau
"knots" versus "m/s") Anda perlu menemukan cara untuk menstandardisasi nilai unit, sebaliknya,ERDDAP™hanya akan memuat satu set file. Pikirkan tentang itu: jika satu file memiliki unit kecepatan angin = noda dan yang lain memiliki unit kecepatan angin = m / s, maka nilai-nilai dari dua file tidak boleh disertakan dalam dataset agregat yang sama.
        * Jika file di gridded.ncfile, dalam banyak situasi yang dapat Anda gunakan[EDDGridDariNcFilesUnpacked](#eddgridfromncfilesunpacked)Sitemap
        * Jika file adalah file data tabel, dalam banyak situasi yang dapat Anda gunakan EDDTableDari...Files Sitemap[Login Sitemap](#standardizewhat)SitemapERDDAPuntuk menstandardisasi file sumber karena mereka membacaERDDAPSitemap
        * Untuk masalah yang lebih sulit, Anda dapat menggunakan[Login](#ncml-files)Sitemap[NCO](#netcdf-operators-nco)untuk memecahkan masalah.
    * Bagian standar CF 8.1 mengatakan bahwa jika data variabel dikemas melalui[scale\\_factordan/atauadd\\_offset](#scale_factor)"Unit variabel harus mewakili data yang belum dipaketkan."
    *   [Untuk variabel waktu dan timestamp,](#time-units)baik variabel[Login](#variable-addattributes)Sitemap&lt;addAttributesSitemap (yang mengambil precedence) Login[Login](#units)Sitemap
        
        * Untuk variabel sumbu waktu atau variabel data waktu dengan data numerik:[Login](https://www.unidata.ucar.edu/software/udunits/)\\ string yang kompatibel (dengan format *Login* Sitemap *Login* ) menjelaskan cara menafsirkan nilai waktu sumber (misalnya, detik sejak 1970-01T00:00Z) Sitemap
            
         *Login* bisa menjadi salah satu dari:
        ```
            ms, msec, msecs, millis, millisec, millisecs, millisecond, milliseconds,  
            s, sec, secs, second, seconds, m, min, mins, minute, minutes, h, hr, hrs, hour, hours,  
            d, day, days, week, weeks, mon, mons, month, months, yr, yrs, year, or years.  
        ```
SitemapERDDAP™Tidak mengikutiUDUNITSstandar ketika mengkonversi"years since"Login"months since"nilai waktu untuk"seconds since"Sitemap LoginUDUNITSstandar mendefinisikan setahun sebagai nilai tetap, tunggal: 3.15569259747e7 detik. DanUDUNITSmendefinisikan sebulan per tahun/12. Sayangnya, sebagian besar/semua data set yang telah kita lihat bahwa penggunaan"years since"Sitemap"months since"jelas berniat nilai-nilai untuk menjadi bulan kalender atau bulan kalender. Sebagai contoh, 3"months since 1970-01-01"biasanya dimaksudkan untuk berarti 1970-04-01. SitemapERDDAP™Sitemap"years since"Login"months since"sebagai tahun kalender dan bulan, dan tidak secara ketat mengikutiUDUNITSstandar.
            
Login *Login* harus ISO 8601:2004 (Login) string waktu tanggal format (yyyy-MM-dd'T'HH:mm:ssZ, misalnya, 1970-01-01T00:00Z) atau beberapa variasi yang (misalnya, dengan bagian yang hilang pada akhir) SitemapERDDAP™mencoba bekerja dengan berbagai variasi format yang ideal, misalnya, "1970-1-1 0:0" didukung. Jika informasi zona waktu hilang, diasumsikan menjadi Meme itZuluzona waktu (Login) Sitemap Bahkan jika offset lain ditentukan,ERDDAP™tidak pernah menggunakan Daylight Saving Time. Jika baseTime menggunakan beberapa format lain, Anda harus menggunakan&lt;addAttributes&gt; untuk menentukan string unit baru yang menggunakan variasi ISO 8601:2004 (Login) format (misalnya, berubah hari sejak 1 Jan 1985 menjadi hari sejak tahun 1985-01.
        
Anda dapat mengujiERDDAPKemampuan untuk menangani *Login* Sitemap *Login* LoginERDDAPSitemap[Konverter](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)Sitemap Mudah-mudahan, Anda dapat menghubungkan dalam sejumlah (nilai pertama dari sumber data?) dan string unit, klik Konversi, danERDDAP™akan dapat mengubahnya menjadi ISO 8601:2004 (Login) string waktu tanggal format. Konverter akan mengembalikan pesan kesalahan jika string unit tidak dapat dikenal.

###### Unit Waktu String{#string-time-units} 
*   [Untuk atribut unit untuk variabel data timetamp atau timestamp dengan data String,](#string-time-units)Anda harus menentukan[java.time.DateTimeFormatter](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html)Login (yang sebagian besar kompatibel dengan java.text. Login) yang menggambarkan cara menafsirkan waktu string. Meme it
    
Untuk format waktu yang umum digunakan yang variasi ISO 8601:2004 (Login) format standar (Artikelnr.: 2018-01-02T00:00Z) Anda dapat menentukan variasiyyyy-MM-dd'T'HH:mm: sZ, misalnya, gunakanyyyy-MM-ddjika waktu string hanya memiliki tanggal. Untuk format apa pun yang dimulai dengan yyyy-M,ERDDAPmenggunakan parser khusus yang sangat menimbulkan variasi minor dalam format. Parser dapat menangani zona waktu dalam format 'Z', "UTC", "GMT", ±XX:XX, ±XXXX, dan format ±XX. Jika bagian waktu tanggal tidak ditentukan (misalnya, menit dan detik) LoginERDDAP™asumsi nilai terendah untuk bidang itu (misalnya, jika detik tidak ditentukan, detik=0 diasumsikan) Sitemap
    
Untuk semua format waktu string lainnya, Anda perlu menentukan string format waktu yang kompatibel DateTimeFormatter. Loginyyyy-MM-dd'T'H:mm: sZ, string format ini dibangun dari karakter yang mengidentifikasi jenis informasi tertentu dari string waktu, misalnya, m berarti menit-of-jam. Jika Anda mengulangi karakter format beberapa kali, lebih memperbaiki makna, misalnya, m berarti bahwa nilai dapat ditentukan oleh sejumlah digit, mm berarti bahwa nilai harus ditentukan oleh 2 digit. LoginJavadokumentasi untuk DateTimeFormatter adalah gambaran kasar dan tidak membuat rincian ini jelas. Jadi di sini adalah daftar variasi karakter format dan makna mereka dalamERDDAP™  (yang terkadang sedikit berbeda dari Meme itJavaSitemap) Sitemap
    
    |Login|Sitemap|Login|
    |Sitemap|Sitemap|Sitemap|
    |g|0 Artikel - 0,00 €|nomor tahun, jumlah digit.ERDDAP™memperlakukan y (Login) dan Y (minggu-based-tahun, karena ini sering tidak digunakan daripada y) g[jumlah tahun astronomis](https://en.wikipedia.org/wiki/Astronomical_year_numbering)Sitemap Tahun-tahun Astronomi adalah bilangan bulat positif atau negatif yang tidak menggunakan BCE (Login) atau CE (Login) pemakai era: 2018=2018CE, ..., 2=2CE, 1=1CE, 0=1BCE, -1=2BCE, -2=3BCE, ...|
    |Login Login|0 Artikel - 0,00 €|4 digit jumlah tahun astronomis (ignoring setiap preceding '-')  |
    |Login|1, 01, 12|nomor bulan, berapa pun jumlah digit (1=Juni)  |
    |Login|01, 12|2 digit (Login) jumlah bulan|
    |Login|Jan, jan, JAN|Nama bulan Bahasa Inggris 3 huruf, kasus insensitif|
    |Login|Jan, jan, JAN, Januari, january, JANUARY|3 huruf atau nama bulan Inggris penuh, kasus insensitif|
    |Sitemap|1, 01, 31|nomor day-of-month, sejumlah digit|
    |Login|01, 31|2 digit (Login) Sitemap 'digit' pertama mungkin ruang.|
    |Login|1, 001, 366|001=Jan 1|
    |Login|001, 366|day-of-year, 3 digit, 001=Jan 1|
    |Login|thu, THU|3 huruf day-of-week, nilai diabaikan ketika parsing|
    |Login|thu, THU, Thu, thursday, THURSDAY|surat 3 atau hari penuh Inggris, kasus tidak sensitif, nilai diabaikan ketika parsing|
    |Login|0 Artikel - 0,00 €|Sitemap (Chili) Jumlah digit|
    |Login|0 Artikel|Sitemap (0 Artikel) 2 digit. 'digit' pertama mungkin ruang.|
    |Sitemap|di, AM, pm, PM|AM atau PM, sensitifitas kasus|
    |Login|12. 1, 01, 11|jam-jam-of-am-pm (12. 1, 2, ... 11) Jumlah digit|
    |Login|12. 01, 11|jam-jam-of-am-pm (12. 1, 2, ... 11) 2 digit. 'digit' pertama mungkin ruang.|
    |Login|0, 1, 11|jam-of-am-pm (Chili) Jumlah digit|
    |Login|0 Artikel - 0,00 €|2 digit|
    |Login|0 Artikel - 0,00 €|min-of-jam, jumlah digit|
    |g|0 Artikel|menit-of-jam, 2 digit|
    |Login|0 Artikel - 0,00 €|kedua menit, berapa pun jumlah digit|
    |Login|0 Artikel|2 digit|
    |Login|0 Artikel - 0,00 €|fraksional, seolah-olah mengikuti titik desimal, berapa pun jumlah digit|
    |Login|0 Artikel - 0,00 €|seratus detik, 2 digit|
    |Login|Chili|ribuan dari kedua, 3 digit|
    |Login|0, 0000, 86399999|milisecond-of-day, sejumlah digit|
    |Login|00000000, 86399999|mili detik-of-day, 8 digit|
    |Login|0,00 PLN|Nanosecond-of-day, jumlah digit. SitemapERDDAP™, ini truncated untuk nMillis.|
    |Login|00000000000000000000, 86399999999999|nanosecond-of-day, 14 digit. SitemapERDDAP™ini truncated untuk nMillis.|
    |Sitemap|0, 00000000000, 59999999999|Nanosecond-of-second, sejumlah digit. SitemapERDDAP™ini truncated untuk nMillis.|
    |Login|00000000000, 59999999999|nanodetik-dari detik, 11 digit. SitemapERDDAP™ini truncated untuk nMillis.|
    |XXX, ZZZ|Z, -08:00, +01:00|zona waktu dengan format 'Z' atau ± (2 digit jam offset) Sitemap (2 digit menit offset) Sitemap Ini memperlakukan *Login* Sitemap (tidak standar) Sitemap ZZZ mendukung 'Z' adalah non-standar tetapi berurusan dengan kesalahan pengguna yang umum.|
    |XX, ZZ|Z -0800, +0100|zona waktu dengan format 'Z' atau ± (2 digit jam offset) Sitemap (2 digit menit offset) Sitemap Ini memperlakukan *Login* Sitemap (tidak standar) Sitemap ZZ mendukung 'Z' adalah non-standar tetapi berurusan dengan kesalahan pengguna yang umum.|
    |G, Z|Z, -08, +01|zona waktu dengan format 'Z' atau ± (2 digit jam offset) Sitemap (2 digit menit offset) Sitemap Ini memperlakukan *Login* Sitemap (tidak standar) Sitemap Z mendukung 'Z' tidak standar tetapi berurusan dengan kesalahan pengguna yang umum.|
    |Login|\\-08:00, +01:00|zona waktu dengan format ± (2 digit jam offset) Sitemap (2 digit menit offset) Sitemap Ini memperlakukan *Login* Sitemap (tidak standar) Sitemap|
    |Login|\\-0800, +0100|zona waktu dengan format ± (2 digit jam offset)  (2 digit menit offset) Sitemap Ini memperlakukan *Login* Sitemap (tidak standar) Sitemap|
    |Login|g|zona waktu dengan format ± (2 digit jam offset) Sitemap Ini memperlakukan *Login* Sitemap (tidak standar) Sitemap|
    |Sitemap|'T', 'Z', 'GMT'|memulai dan mengakhiri serangkaian karakter literal|
    |Sitemap Sitemap (dua kutipan tunggal)  |Sitemap Sitemap|dua kutipan tunggal menunjukkan satu literal|
    | \\[\\] | \\[ \\] |Sitemap (Sitemap\\[Sitemap) dan berakhir (Sitemap\\]Sitemap) dari bagian opsional. Pemberitahuan ini hanya didukung untuk karakter literal dan pada akhir string format.|
    |#striekanie semena#tancovanie#šúchanie#vyzliekanie|#striekanie semena#tancovanie#šúchanie#vyzliekanie|disediakan untuk penggunaan masa depan|
    |G,L,Q,e,c,V,z,O,p|     |Karakter format ini didukung olehJava's DateTimeFormatter, tapi saat ini tidak didukung olehERDDAPSitemap Jika Anda butuh dukungan untuk mereka, email Chris. John di noaaa.gov .|
    
Catatan:
    
    * Dalam waktu tanggal dengan tanda baca, nilai numerik mungkin memiliki jumlah digit variabel (misalnya, dalam format tanggal bulu mata AS "1/2/1985", bulan dan tanggal mungkin 1 atau 2 digit) sehingga format harus menggunakan token 1-letter, misalnya, M/d/yyyy, yang menerima sejumlah digit untuk bulan dan tanggal.
    * Jika jumlah digit untuk item yang konstan, misalnya, 01/02/1985, kemudian menentukan jumlah digit dalam format, misalnya, MM/dd/yyyy untuk bulan 2-digit, tanggal 2-digit, dan 4 digit tahun.
    * Format ini rumit untuk bekerja dengan. Format yang diberikan dapat bekerja untuk sebagian besar, tetapi tidak semua, string waktu untuk variabel yang diberikan. Selalu periksa bahwa format yang Anda tentukan bekerja seperti yang diharapkanERDDAPuntuk semua string waktu variabel.
    * Bila memungkinkan, GenerateDatasetXml akan menyarankan string format waktu.
    * Jika Anda perlu membantu menghasilkan string format, silakan email Chris. John di noaaa.gov .

Variabel data waktu utama (untuk set data tabel) dan variabel sumbu waktu utama (untuk dataset gridded) diakui oleh[destinationName](#destinationname)Sitemap Metadata unit mereka harus menjadi string unit yang kompatibel UDUnits untuk nilai waktu numerik, misalnya, "hari sejak 1970-01" (untuk tabular atau gridded dataset) Sitemap[unit cocok untuk waktu string](#string-time-units)"M/d/yyyy" (untuk set data tabel) Sitemap

Unit Waktu Berbeda di Gridded Berbeda.ncLogin Jika Anda memiliki koleksi gridded.ncfile di mana, untuk variabel waktu, satu subset file menggunakan unit waktu yang berbeda dari satu atau lebih subset file lainnya, Anda dapat menggunakan[EDDGridDariNcFilesUnpacked](#eddgridfromncfilesunpacked)Sitemap Ini mengubah nilai waktu ke"seconds since 1970-01-01T00:00:00Z"pada tingkat yang lebih rendah, sehingga Anda dapat membuat satu dataset dari koleksi file heterogen.

###### variabel timeStamp{#timestamp-variables} 
[variabel timeStamp](#timestamp-variables)Login variabel lain (axisVariableSitemapdataVariableSitemapEDDGridatau dataset EDDTable) bisa menjadi variabel timeStamp. Variabel timestamp adalah variabel yang memiliki unit dan data waktu terkait waktu, tetapi memiliki&lt;destinationNameSitemap TimeStamp variabel berperilaku seperti variabel waktu utama di mana mereka mengubah format waktu sumber menjadi"seconds since 1970-01-01T00:00:00Z"dan/atau ISO 8601:2004 (Login) LoginERDDAP™mengakui waktu variabel Stamp oleh yang berkaitan dengan waktu "[Login](#units)" metadata, yang harus sesuai dengan ekspresi biasa ini "\\[Login\\]Sitemap\\[Chili\\]Sitemap (untuk tanggal numerik Kali, misalnya,"seconds since 1970-01-01T00:00:00Z") atau tanggal string format waktu yang mengandung "uuuu", "yyyyyy" atau "YYYYYY" (misalnya, "yyyy-MM-dd'T'HH:mm:ssZ") Sitemap Tapi jangan gunakandestinationName "time"untuk tanggal utama variabel waktu.

 **Selalu periksa pekerjaan Anda untuk memastikan bahwa data waktu yang munculERDDAP™adalah data waktu yang benar.** Bekerja dengan data waktu selalu rumit dan kesalahan.

Sitemap[informasi lebih lanjut tentang variabel waktu](#destinationname)Sitemap
ERDDAP™memiliki utilitas untuk[Mengkonversi Numeric Waktu ke/dari Waktu String](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html)Sitemap
Sitemap[SitemapERDDAP™Penawaran dengan Waktu](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html#erddap)Sitemap
         
        
###### valid\\_range {#valid_range} 
*   [ **valid\\_range** Sitemap **valid\\_min** Login **valid\\_max** ](#valid_range)Login Ini adalah atribut variabel OPTIONAL yang didefinisikan dalam[Login](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)konvensi metadata. Sitemap

    >    &lt;att name="valid\\_range" [type="floatList"](#attributetype)\\>0.0 40.0&lt;/att>  

Sitemap

    >    &lt;att name="valid\\_min" [type="float"](#attributetype)\\>0.0&lt;/att>  
    >    &lt;att name="valid\\_max" [type="float"](#attributetype)\\>40.0&lt;/att>  

    * Jika ada, mereka harus dari jenis data yang sama dengan variabel, dan tentukan nilai minimum dan maksimum dari data untuk variabel tersebut. Pengguna harus mempertimbangkan nilai di luar kisaran ini untuk tidak valid.
    *   ERDDAP™tidak berlakuvalid\\_rangeSitemap Said cara lain:ERDDAP™tidak mengubah nilai data di luarvalid\\_rangeke \\_Fill Nilai ataumissing\\_valueSitemapERDDAP™hanya melewati metadata ini dan meninggalkan aplikasi hingga Anda.
Sitemap Apa metadata ini. Jika penyedia data ingin, penyedia data dapat telah mengubah nilai data di luarvalid\\_rangeke \\_FillValues.ERDDAP™tidak menebak kedua penyedia data. Pendekatan ini lebih aman: jika nantinya ditunjukkan bahwavalid\\_rangeterlalu sempit atau tidak salah,ERDDAP™tidak akan merendahkan data.
    * Jika data dikemas dengan[scale\\_factordan/atauadd\\_offset](#scale_factor)Loginvalid\\_rangeLoginvalid\\_minLoginvalid\\_maxharus menjadi jenis dan nilai data yang dikemas. SitemapERDDAP™Sitemapscale\\_factorLoginadd\\_offsetketika memuat dataset,ERDDAP™akan membongkarvalid\\_rangeLoginvalid\\_minLoginvalid\\_maxnilai sehingga metadata tujuan (ditampilkan kepada pengguna) akan menunjukkan jenis dan rentang data yang tidak terpaket.
Atau, jika unpacked\\_valid\\_rangeatribut hadir, itu akan berganti namavalid\\_rangeSitemapERDDAP™memuat dataset.
##### &lt;Sitemap{#removemvrows} 
* Sitemap ** &lt;Login ** Sitemap (Login) adalah tag OPTIONAL dalam tag dalamdatasets.xmluntuk EDDTableDariFiles (termasuk semua kelas) dataset, meskipun hanya digunakan untuk EDDTableDariMultidimNcFiles. Ini bisa memiliki nilai yang benar atau palsu. Sebagai contoh, benar
Ini menghapus blok baris di akhir kelompok di mana semua nilaimissing\\_value, \\_FillValue, atau CoHort ... Nilai hilang asli (atau char=#32 untuk CharArrays) Sitemap Ini adalah untuk jenis file CF DSG Multidimensional Array dan file serupa. Jika benar, ini melakukan tes yang tepat dan selalu memuat semua variabel dim maksimal, sehingga dapat memakan waktu ekstra.
Nilai default palsu.
Rekomendasi - Jika mungkin untuk dataset Anda, kami merekomendasikan pengaturan menghapusMVRows untuk palsu. Menyiapkan menghapusMVRows untuk benar dapat secara signifikan memperlambat permintaan, meskipun mungkin diperlukan untuk beberapa set data.
