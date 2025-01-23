---
title: "EDDTableFromEML" 
---
# EDDTableDariEML dan EDDTableDariEMLBatch Pilihan di GenerateDataset Login

\\[Halaman web ini hanya akan menarik minat untuk Meme itERDDAP™administrator yang bekerja dengan file EML.
Dokumen ini awalnya diciptakan pada tahun 2016. Terakhir diedit pada 2020-11-30.\\]

[ **ERDDAP™** ](https://coastwatch.pfeg.noaa.gov/erddap/index.html)adalah server data yang memberi pengguna cara sederhana, konsisten untuk mengunduh subset data ilmiah gridded dan tabular dalam format file umum dan membuat grafik dan peta.ERDDAP™bekerja dengan dataset tertentu sebagai kelompok variabel gridded multidimensi (e.g., data satelit atau model) atau sebagai tabel seperti database (dengan kolom untuk setiap jenis informasi dan baris untuk setiap pengamatan) SitemapERDDAP™Gratis dan Open Source Software, sehingga siapa pun bisa[download dan menginstalERDDAP™](/docs/server-admin/deploy-install)untuk melayani data mereka.

Untuk menambahkan dataset ke sebuahERDDAP™instalasi,ERDDAP™administrator harus menambahkan chunk dari XML menggambarkan dataset ke file yang disebutdatasets.xmlSitemap (Sitemap[dokumentasi menyeluruh untukdatasets.xml](/docs/server-admin/datasets)Sitemap) Meskipun dimungkinkan untuk menghasilkan chunk XML untukdatasets.xmlsepenuhnya dengan tangan,ERDDAP™datang dengan alat yang disebut[ **Login** ](/docs/server-admin/datasets#tools)yang dapat menghasilkan draft kasar dari chunk XML yang diperlukan untuk dataset tertentu berdasarkan beberapa sumber informasi tentang dataset.

Hal pertama GenerateDatasets Xml meminta adalah jenis dataset yang ingin Anda buat. Login Xml memiliki opsi khusus, **Login** yang menggunakan informasi dalam sebuah[Bahasa Metadata Ekologi (Login) ](https://knb.ecoinformatics.org/external//emlparser/docs/index.html)XML file untuk menghasilkan chunk XML untukdatasets.xmluntuk membuat[Login](/docs/server-admin/datasets#eddtablefromasciifiles)dataset dari setiap tabel data dalam file EML. Ini bekerja dengan sangat baik untuk sebagian besar file EML, sebagian besar karena file EML melakukan pekerjaan yang sangat baik untuk menyimpan semua metadata yang diperlukan untuk dataset dalam format yang mudah digunakan. Informasi yang GenerateDatasetsXml perlu membuat dataset berada dalam file EML, termasuk URL untuk file data, yang GenerateDatasetsXml download, parses, dan membandingkan deskripsi dalam file EML. (Banyak kelompok akan melakukannya dengan baik untuk beralih ke EML, yang merupakan sistem yang bagus untuk mendokumentasikan dataset ilmiah tabular, tidak hanya data ekologis. Dan banyak kelompok yang membuat schemas XML akan dilakukan dengan baik untuk menggunakan EML sebagai studi kasus untuk penjadwal XML yang jelas, ke titik, tidak terlalu dalam (i.e., terlalu banyak tingkat) , dan mudah bagi manusia dan komputer untuk bekerja dengan.) 

## Sitemap{#questions} 

Berikut adalah semua pertanyaan GenerateDatasets Xml akan meminta, dengan komentar tentang bagaimana Anda harus menjawab jika Anda ingin memproses hanya satu file EML atau batch file EML:

* EDDType?
Jika Anda ingin memproses hanya satu file, jawaban: EDDTableDariEML
Jika Anda ingin memproses sekelompok file, jawaban: EDDTableDariEMLBatch
* Direktori untuk menyimpan file?
Masukkan nama direktori yang akan digunakan untuk menyimpan file EML dan/atau data yang diunduh.
Jika direktori tidak ada, itu akan dibuat.
*    (Untuk EDDTableDariEML Sitemap) EML URL atau fileName lokal?
Masukkan URL atau nama file lokal dari file EML.
*    (Untuk EDDTableDariEMLBatch hanya) Login (URL atau lokal) Sitemap
Masukkan nama direktori dengan file EML (URL atau dir lokal) Sitemap
Contoh: http://sbc.lternet.edu/data/eml/files/
 
*    (Untuk EDDTableDariEMLBatch hanya) URL:
Masukkan ekspresi reguler yang akan digunakan untuk mengidentifikasi file EML yang diinginkan di direktori EML.
Contoh: knb-lter-sbc\\.\\d+
* Gunakan file lokal jika ada (Login|Login) Sitemap
Masukkan benar untuk menggunakan file EML lokal yang ada dan file data, jika mereka ada.
Masukkan palsu untuk selalu mengunduh file EML dan/atau file data.
* Sitemap Sitemap
Jika Anda ingin dataset baru untuk menjadi dataset pribadi diERDDAPmenentukan nama kelompok (Login) yang akan diperbolehkan akses.
Direkomendasikan untuk kelompok LTER: menggabungkan "lter" plus grup, misalnya, lter Login
Jika Anda memasukkan "null", tidak akan ada&lt;Sitemap To&gt; tag dalam output.
Sitemap[Sitemap Sitemap](/docs/server-admin/datasets#accessibleto)Sitemap
* Login Login (Sitemap) Sitemap
Jika variabel waktu menunjukkan bahwa memiliki nilai waktu setempat, zona waktu ini akan ditugaskan.
Ini harus menjadi nilai dari[Daftar kolom TZ dari nama zona waktu](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)Sitemap
Perhatikan semua nama "US/..." yang mudah digunakan di akhir daftar.
Jika Anda kemudian menemukan bahwa menjadi salah, Anda dapat mengubahtime\\_zonedi chunk daridatasets.xmlSitemap

LoginERDDAP™adalah kombinasi yang bagus, karenaERDDAP™dapat memberikan akses langsung ke kekayaan[Jaringan Pengetahuan untuk Biokomplexitas (Login) ](https://knb.ecoinformatics.org/)Login[Penelitian Ekologi Jangka Panjang (Login) ](https://lternet.edu/)data dan membantu proyek-proyek tersebut bertemu dengan pemerintah AS[Akses Umum untuk Hasil Penelitian (Login) Sitemap](https://nosc.noaa.gov/EDMC/PD.DSP.php)dengan membuat data yang tersedia melalui layanan web. Juga, EML plusERDDAP™tampaknya seperti jembatan besar antara ilmuwan di realm akademis / NSF-funded dan ilmuwan di agen federal (NOAA, NASA, USGS) Login

Sitemap[bagian untuk mendapatkan dukungan tambahan](/docs/intro#support)Sitemap
 
## Detail Desain{#design-details} 

Berikut adalah rincian desain dari opsi EDDTableFromEML di GenerateDatasetsXml.
Beberapa berhubungan dengan perbedaan dalam bagaimana EML danERDDAP™melakukan hal-hal dan bagaimana GenerateDatasets Penawaran Xml dengan masalah ini.

### Satu dataTable Menjadi SatuERDDAP™Login{#one-datatable-becomes-one-erddap-dataset} 
Satu file EML mungkin memiliki beberapa&lt;Sitemap Tabel & gt;ERDDAP™membuat satuERDDAP™dataset per data EML. LogindatasetIDuntuk dataset
 *Login* Login *Login*   (EMLname) Sitemap
 *sistem\\_EMLName* Login *Login*   (EMLname) Sitemap
Sebagai contoh, tabel #1 dalam file knb-lter-sbc.28, menjadiERDDAP™ datasetID=knb\\_lter\\_sbc\\_28\\_t1,
     
### EML versus CF+ACDD{#eml-versus-cfacdd} 
Hampir semua metadata dalam file EML masuk keERDDAPtetapi dalam format yang berbeda.ERDDAP™menggunakan[Login](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html)Login[Login](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3)standar metadata. Mereka melengkapi sistem metadata yang menggunakan key=value pair untuk metadata global dan untuk setiap metadata variabel.
Ya, representasi EML metadata lebih bagus daripada representasi CF + ACDD. Saya tidak menyarankan menggunakan representasi CF + ACDD sebagai pengganti EML. Silahkan pikir CF + ACDD sebagai bagian dari jembatan dari dunia EML keOPeNDAPSitemap
     
### Perubahan kecil{#small-changes} 
ERDDAP™membuat banyak perubahan kecil. SitemapERDDAP™menggunakan EML non-DOILogin Identifier ditambah nomor dataTable sebagaiERDDAP™ datasetIDtapi sedikit perubahan alternatif Identifier untuk membuat nama variabel yang valid dalam kebanyakan bahasa komputer, misalnya, knb-lter-sbc.33 data Tabel #1 menjadi knb\\_lter\\_sbc\\_33\\_t1.
     
### Login{#docbook} 
EML menggunakan sistem markup DocBook untuk menyediakan struktur untuk memblokir teks dalam file EML. CF dan ACDD memerlukan bahwa metadata menjadi teks biasa. Login Xml mengubah teks yang ditandai menjadi teks biasa yang terlihat seperti versi teks yang diformat. Tag inline dihiasi dengan braket persegi, misalnya,\\[Sitemap\\], dan kiri dalam teks biasa.
     
### Database{#data-files} 
Karena data EMLTable mencakup URL file data aktual, HasilkanDataset Sitemap
1. Unduh file data.
2. Simpan di direktori yang sama dengan file EML.
3. Baca data.
4. Bandingkan deskripsi data di EML dengan data aktual dalam file.
5. Sitemap Xml menemukan perbedaan, ia berurusan dengan mereka, atau meminta operator jika perbedaannya oke, atau mengembalikan pesan kesalahan. Detail dalam berbagai item di bawah ini.
         
### .zipDatabase{#zipd-data-files} 
Jika file data referensi adalah.zipfile, harus berisi hanya satu file. File itu akan digunakan untukERDDAP™Login Jika ada lebih dari 1 file.ERDDAP™akan menolak dataset. Jika diperlukan, ini bisa dimodifikasi. (Dalam prakteknya, semua file zip SBC LTER hanya memiliki satu file data.)   
     
### Jenis Penyimpanan{#storagetype} 
Jika penyimpanan kolom Jenis tidak ditentukan,ERDDAP™menggunakan kira terbaik berdasarkan data dalam file data. Ini bekerja cukup baik.
     
### Login{#units} 
ERDDAP™Login[UDUNITSformat untuk unit](https://www.unidata.ucar.edu/software/udunits/)Sitemap Login Xml mampu mengonversi unit EML keUDUNITSbersih sekitar 95% dari waktu. Hasil sisa 5% dalam deskripsi unit yang dapat dibaca, misalnya, "biomassDensityUnitPerAbundanceUnit" di EML menjadi "unit kepadatan biomass per unit kelimpahan" dalamERDDAPSitemap Secara teknis ini tidak diperbolehkan. Saya tidak berpikir itu sangat buruk dalam keadaan. Meme it\\[Jika perlu, unit yang tidak dapat dibuatUDUNITSkompatibel dapat dipindahkan ke atribut komentar variabel.\\]  
     
### OpenOffice 4.1.1{#eml-version-211} 
Dukungan ini untuk file EML v2.1.1 ditambahkan ke GenerateDatasets Xml di 2016 dengan harapan bahwa akan ada beberapa uptake di komunitas EML. Pada tahun 2020, belum terjadi. LoginERDDAP™pengembang akan senang menambahkan dukungan untuk versi terbaru dari EML, tetapi hanya jika fitur baru akan benar-benar digunakan. Sitemaperd.data at noaa.govjika Anda ingin mendukung versi terbaru dari EML dan akan benar-benar menggunakan fitur ini.
     

## Masalah dengan File EML{#issues-with-the-eml-files} 

Ada beberapa masalah / masalah dengan file EML yang menyebabkan masalah ketika klien perangkat lunak (seperti opsi EDDTableDariEML di GenerateDatasetsXML) mencoba untuk menafsirkan/ memproses file EML.

* Meskipun ada beberapa isu yang tercantum di sini, mereka sebagian besar masalah kecil yang layak. Secara umum, EML adalah sistem yang bagus dan telah menjadi kesenangan saya untuk bekerja dengan itu.
* Ini kira-kira diurutkan dari worst / paling umum untuk setidaknya buruk / kurang umum.
* Kebanyakan terkait dengan masalah kecil dalam file EML tertentu (yang bukan kesalahan EML) Sitemap
* Kebanyakan dapat diperbaiki dengan perubahan sederhana ke file EML atau file data.
* Mengingat bahwa orang-orang LTER membangun pemeriksaan EML untuk menguji validitas file EML, saya telah menambahkan beberapa saran di bawah tentang fitur yang dapat ditambahkan ke checker.

Berikut isu-isu:

### Tanggal Terpisah dan Kolom Waktu{#separate-date-and-time-columns} 
Beberapa file data memiliki kolom yang terpisah untuk tanggal dan untuk waktu, tetapi tidak ada tanggal + kolom waktu yang ditentukan. Sitemap Xml membuat dataset dengan kolom terpisah ini, tetapi tidak ideal karena:

* Ini terbaik jika dataset dalamERDDAP™memiliki kolom tanggal gabungan + waktu yang disebut"time"Sitemap
* Seringkali dataset tidak akan memuatERDDAP™Sitemap"time"kolom tidak memiliki data tanggal + waktu.

Ada dua solusi yang mungkin:
1. Edit file data sumber untuk menambahkan kolom baru dalam file data (dan menggambarkannya di EML) di mana kolom tanggal dan waktu digabungkan menjadi satu kolom. Sitemap Xml sehingga menemukan kolom baru.
2. Login[Variabel Derifd](/docs/server-admin/datasets#script-sourcenamesderived-variables)SitemapERDDAP™untuk mendefinisikan variabel baru dalamdatasets.xmlyang dibuat dengan menyusun tanggal dan kolom waktu. Salah satu contoh penawaran khusus dengan situasi ini.
         
### Nama Kolom yang tidak konsisten{#inconsistent-column-names} 
File EML daftar kolom file data dan nama mereka. Sayangnya, mereka sering berbeda dari nama kolom dalam file data yang sebenarnya. Biasanya, urutan kolom dalam file EML sama dengan urutan kolom dalam file data, bahkan jika nama bervariasi sedikit, tetapi tidak selalu. Login Xml mencoba untuk mencocokkan nama kolom. Kapan tidak bisa (yang umum) , itu akan berhenti, tunjukkan pasangan nama file EML / data, dan bertanya apakah mereka benar selaras. Jika Anda memasukkan 's' untuk melewatkan tabel, GeneratedDatasetsXml akan mencetak pesan kesalahan dan pergi ke tabel berikutnya.
Solusinya adalah mengubah nama kolom erron di file EML untuk mencocokkan nama kolom dalam file data.
     
### Pesanan Kolom yang Berbeda{#different-column-order} 
Ada beberapa kasus di mana EML menentukan kolom dalam urutan yang berbeda daripada yang ada dalam file data. Login Xml akan berhenti dan meminta operator jika pencocokan tidak oke atau jika dataset harus selesai. Jika selesai, akan ada pesan kesalahan dalam file hasil, misalnya,:
```
      &lt;-- SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
      datasetID=knb\\_lter\\_sbc\\_17\\_t1
      dataFile=all\\_fish\\_all\\_years\\_20140903.csv
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        SURVEY\\_TIMING        = notes
        NOTES                = survey\\_timing
      --&gt;
```
Solusinya adalah untuk memperbaiki urutan kolom dalam file EML ini sehingga mereka mencocokkan pesanan dalam file data.

Ini akan bagus jika pemeriksaan EML memeriksa bahwa kolom dan urutan kolom dalam file sumber cocok kolom dan urutan kolom dalam file EML.
    
### Sitemap{#incorrect-numheaderlines} 
Database Tabel dengan benar keadaan numHeaderLines=1, misalnya, ...sbc.4011. Penyebab iniERDDAP™membaca baris pertama data sebagai nama kolom. Saya mencoba untuk secara manual SKIP semua dataTables ini. Mereka jelas karena nama col sumber yang tak tertandingi adalah semua nilai data. Dan jika ada file yang salah memiliki numHeaderLines=0, sistem saya tidak membuatnya jelas. Berikut ini contoh dari file kegagalan SBC LTER:
```
      &lt;-- SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
       datasetID=knb\\_lter\\_sbc\\_3017\\_t1
      dataFile=MC06\\_allyears\\_2012-03-03.txt
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        2008-10-01T00:00     = timestamp\\_local
        2008-10-01T07:00     = timestamp\\_UTC
        2.27                 = discharge\\_lps
        -999.0               = water\\_temperature\\_celsius
      --&gt;
```
Jadi kesalahan dapat muncul seolah-olah GenerateDataset Xml berpikir bahwa baris pertama dengan data dalam file (e.g., dengan 2008-10-01T00:00 dll.) adalah garis dengan nama kolom (seolah-olah 2008-10-01T00:00 adalah nama kolom) Sitemap

Ini akan bagus jika pemeriksaan EML memeriksa nilai numHeaderLines.
    
### numHeaderLines = 0{#numheaderlines--0} 
Beberapa file sumber tidak memiliki nama kolom.ERDDAP™menerima bahwa jika EML menggambarkan jumlah kolom yang sama.

Menurut pendapat saya: ini tampak sangat berbahaya. Ada kolom dalam urutan yang berbeda atau dengan unit yang berbeda (Sitemap) dan tidak ada cara untuk menangkap masalah tersebut. Meme it Ini jauh lebih baik jika semua file data ASCII memiliki baris dengan nama kolom.
    
### Format Tanggal String{#datetime-format-strings} 
EML memiliki cara standar untuk menggambarkan format waktu tanggal. tetapi ada variasi yang cukup dalam penggunaannya dalam file EML. (Aku sebelumnya salah tentang ini. Meme it Saya melihat dokumentasi EML untuk formatString yang muncul untuk mencocokkan[JavaSpesifikasi DateTimeFormatter](https://docs.oracle.com/javase/8/docs/api/index.html?java/time/format/DateTimeFomatter.html), tetapi yang tidak memiliki pedoman penting tentang penggunaannya, dengan hasilnya formatString sering / biasanya tidak digunakan.) Ada beberapa kasus dengan kasus yang salah, dan/atau duplikasi yang salah dari surat, dan/atau format non-standar. Itu menempatkan beban yang tidak masuk akal pada klien, terutama klien perangkat lunak seperti GenerateDatasetsXml. Login Xml mencoba untuk mengubah format yang benar didefinisikan dalam file EML menjadi
[format tanggal/waktu yangERDDAP™Login](/docs/server-admin/datasets#string-time-units)yang hampir identik denganJavaspesifikasi format waktu / Joda, tetapi sedikit lebih menonjol.

Itu akan bagus jika pemeriksaan EML diperlukan kepatuhan yang ketat untukJavaLoginERDDAPspesifikasi unit waktu dan diverifikasi bahwa nilai waktu tanggal di tabel data dapat dibuat dengan benar dengan format yang ditentukan.
    
### Tanggal Waktu Tapi Tidak ada Zona Waktu{#datetime-but-no-time-zone} 
Login Xml mencari kolom dengan tanggal Waktu dan zona waktu tertentu (SitemapZulu: dari unit waktu berakhir di 'Z' atau nama kolom atau definisi atribut yang mencakup "gmt" atau "utc", atau lokal: dari "local" dalam nama kolom atau definisi atribut) Sitemap Juga dapat diterima adalah file dengan kolom tanggal tetapi tidak ada kolom waktu. Juga dapat diterima adalah file tanpa informasi tanggal atau waktu.

Login Xml memperlakukan semua "lokal" kali seperti berada dari zona waktu yang dapat Anda tentukan untuk batch file tertentu, misalnya, untuk SBC LTER, gunakan US/Pasifik. Informasi ini kadang-kadang dalam komentar, tetapi tidak dalam bentuk yang mudah untuk program komputer untuk mengetahui.

File yang tidak memenuhi kriteria ini ditolak dengan pesan "NO GOOD DATE (Sitemap) Login Masalah umum adalah:

* Ada kolom dengan tanggal dan kolom dengan waktu, tetapi tidak tanggal Kolom waktu.
* Ada unit waktu, tetapi zona waktu tidak ditentukan.

Komentar lain:
Jika ada tanggal yang baik + waktu dengan kolom zona waktu, kolom itu akan dinamakan"time"SitemapERDDAPSitemapERDDAP™memerlukan data kolom waktu dapat dimengerti / tidak dapat dikonversikanZulu/UTC/GMT tanggal zona waktu.\\[Keyakinan saya adalah: menggunakan waktu lokal dan format tanggal / waktu yang berbeda (2-digit tahun&#33; mm/dd/yy vs dd/mm/yy) dalam file data memaksa pengguna akhir untuk melakukan konversi yang rumit untukZuluwaktu untuk membandingkan data dari satu dataset dengan data dari yang lain. LoginERDDAP™standardisasi semua data waktu: Untuk waktu string,ERDDAP™selalu menggunakan ISO 8601:2004 (Login) format standar, misalnya, 1985-01-02T00:00Z. Untuk waktu numerik,ERDDAP™selalu menggunakan"seconds since 1970-01-01T00:00:00Z"SitemapERDDAP™selalu menggunakanZulu  (UTC, Bursa) zona waktu untuk menghilangkan kesulitan bekerja dengan zona waktu yang berbeda dan waktu standar versus waktu hemat siang hari. Login Xml mencari kolom dataTable EML dengan tanggal + waktuZuluSitemap Hal ini sulit karena EML tidak menggunakan vocabulary/system resmi (Login[Java/Joda format waktu](https://www.joda.org/joda-time/apidocs/org/joda/time/format/DateTimeFormat.html)) untuk menentukan data Format waktu:
Jika ada col dengan nilai waktu numerik (LoginMatlabSitemap) LoginZuluLogin (atau hanya tanggal, tanpa kolom waktu) , digunakan sebagai"time"Sitemap
Jika ada col dengan data tanggal dan waktu, gunakanZuluzona waktu, digunakan sebagai"time"dan kolom tanggal atau waktu lainnya dihapus.
Else jika col dengan informasi tanggal hanya ditemukan, digunakan sebagai"time"Login (tanpa zona waktu) Sitemap
Jika ada kolom data dan kolom waktu dan tidak ada tanggal gabungan Kolom waktu, dataset REJECTED — tetapi dataset dapat dibuat dapat digunakan dengan menambahkan tanggal gabungan Kolom waktu (SitemapZuluzona waktu) ke datafile dan menambahkan deskripsinya dalam file EML.
EXAMPLE dari SBC LTER:[ https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/ ](https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/)dataTable #2.

Ini akan bagus jika EML / LTER diperlukan inklusi kolom denganZulu  (UTC, Bursa) waktu zona kali dalam semua file data sumber yang relevan. Yang terbaik adalah menambahkan sistem ke EML untuk menentukantime\\_zoneatribut menggunakan nama standar (dari[kolom TZ](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)) Sitemap
    
### Loginmissing\\_value {#missing-missing_value} 
Beberapa kolom menggunakanmissing\\_valuetapi jangan daftar di metadata EML, misalnya, presipitasi\\_mm di knb-lter-sbc.5011 menggunakan -999. Jika tidak ada nilai yang hilang ditentukan dalam EML, GenerateDatasetsXml secara otomatis mencari nilai yang hilang umum (g., 99, -99, 999, -999, 9999, -9999, dll) dan menciptakan metadata. Tapi yang lain hilangmissing\\_valuetidak tertangkap. Meme it

Akan bagus jika checker EML mencari hilangmissing\\_valueSitemap
    
### Masalah kecil{#small-problems} 
Ada banyak masalah kecil (ejaan, tanda baca) yang mungkin hanya akan ditemukan oleh pemeriksaan manusia setiap dataset.

Akan bagus jika pemeriksaan EML mencari kesalahan ejaan dan tata bahasa. Ini adalah masalah yang sulit karena kata-kata dalam ilmu sering ditandai dengan pengecekan mantra. Pengeditan manusia mungkin diperlukan.
    
### Karakter Unicode yang tidak valid{#invalid-unicode-characters} 
Beberapa konten EML mengandung karakter Unicode yang tidak valid. Ini mungkin karakter dari charset Windows yang tidak disalin dan disisipkan ke file UTF-8 EML. Login Xml menghangatkan karakter ini untuk misalnya,\\[#128\\]sehingga mereka mudah untuk mencari di Meme itERDDAP™ datasets.xmlLogin

Ini akan bagus jika checker EML diperiksa untuk ini. Mudah ditemukan dan mudah diperbaiki.
    
### Unit Kolom yang Berbeda] (Sitemap)  {#different-column-unitsdifferentcolumnunits} 
Beberapa data EMLTables mendefinisikan kolom yang tidak konsisten dengan kolom dalam file data, terutama karena mereka memiliki unit yang berbeda. Login Xml bendera ini. Hal ini hingga operator untuk memutuskan apakah perbedaannya baik atau tidak. Ini muncul dalam file kegagalan sebagai data "SKIPPED". EXAMPLE di file kegagalan SBC LTER:
```
      < SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN
      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):
       datasetID=knb\\_lter\\_sbc\\_3\\_t1
      dataFile=SBCFC\\_Precip\\_Daily\\_active\\_logger.csv
      The data file and EML file have different column names.
      ERDDAP™ would like to equate these pairs of names:
        Daily\\_Precipitation\\_Total\\_mm = Daily\\_Precipitation\\_Total\\_inch
        Flag\\_Daily\\_Precipitation\\_Total\\_mm = Flag\\_Daily\\_Precipitation\\_Total\\_inch
      -->
```
Ini akan bagus jika pemeriksaan EML diperiksa bahwa unit cocok. Sayangnya, ini mungkin tidak mungkin untuk menangkap dan kemudian tidak mungkin untuk menyelesaikan tanpa menghubungi pembuat dataset, mengingat bahwa file sumber tidak termasuk unit. Perbedaan misalnya di atas hanya terlihat karena unit dimasukkan dalam nama kolom sumber dan nama kolom EML. Berapa banyak dataTables lain memiliki masalah ini tetapi tidak terdeteksi?
    
### Versi yang berbeda dari EML{#different-versions-of-eml} 
Login Xml dirancang untuk bekerja dengan EML 2.1.1. Versi lain dari EML akan bekerja sejauh yang mereka cocok 2.1.1 atau GenerateDatasetsXml memiliki kode khusus untuk menanganinya. Ini adalah masalah yang langka. Ketika terjadi, solusinya adalah untuk mengonversi file Anda ke EML 2.1.1, atau mengirim file EML keerd.data at noaa.gov, jadi saya bisa melakukan perubahan GenerateDatasets Xml untuk menangani perbedaan.

Bob menambahkan dukungan untuk file EML untuk GenerateDatasets Xml di 2016 dengan harapan bahwa akan ada beberapa uptake di komunitas EML. Pada tahun 2020, belum terjadi. Bob senang menambahkan dukungan untuk versi terbaru dari EML, tetapi hanya jika fitur baru akan benar-benar digunakan. Sitemaperd.data at noaa.govjika Anda ingin mendukung versi terbaru dari EML dan akan benar-benar menggunakan fitur ini.
    
### Trouble Membuat File Data{#trouble-parsing-the-data-file} 
Rarely, dataTable dapat ditolak dengan kesalahan "jumlah item yang tidak terinfeksi di baris #120 (diamati=52, diharapkan=50) Sitemap Pesan kesalahan seperti ini berarti bahwa garis dalam file data memiliki sejumlah nilai yang berbeda dari garis lain. Ini mungkin masalah dalam Meme itERDDAP™  (e.g., tidak membuat file dengan benar) atau dalam file. EXAMPLE dari SBC LTER:
[ https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/ ](https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/)dataTable #3, lihat datafile=LTER\\_monthly\\_bottledata\\_registered\\_stations\\_20140429.txt
