---
sidebar_position: 2
---

# Panduan Programmer

Ini adalah hal-hal yang hanya seorang programmer yang berniat bekerja denganERDDAPSitemapJavakelas perlu diketahui.

###  **Mendapatkan Kode Sumber**  {#getting-the-source-code} 
   

  - Via Kode Sumber di GitHub
Kode sumber untuk versi publik terbaru dan versi in-development juga tersedia melalui[Login](https://github.com/ERDDAP)Sitemap Sitemap[Login](https://github.com/ERDDAP/erddap/wiki)untuk proyek itu. Jika Anda ingin memodifikasi kode sumber (dan mungkin memiliki perubahan yang dimasukkan ke dalam standarERDDAP™Login) , ini adalah pendekatan yang disarankan.

###  **ERDDAP™Login**  {#erddap-dependencies} 
ERDDAP™menggunakan Maven untuk memuat dependensi kode serta beberapa file referensi statis (Login) Sitemap Hal ini dilakukan untuk menghindari menyimpan banyak file besar di repositori.
Anda dapat menggunakan `mvn kompilasi` dan itu akan mengambil dependensi dan mengisi file. Anda juga dapat menggunakan paket `mvn` untuk menghasilkan file perang.
Anda dapat secara manual mengunduh file ref:

  - [etopo1\\_ice\\_g\\_i2.zip](https://github.com/ERDDAP/ERDDAPRefFiles/releases/download/1.0.0/etopo1_ice_g_i2.zip)dan unzip ke /WEB-INF/ref/ .

  - [Login.zip](https://github.com/ERDDAP/ERDDAPRefFiles/releases/download/1.0.0/ref_files.zip)dan unzip ke /WEB-INF/ref/ .

  - [Login.zip](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip)  (versi 1.0.0, 20333 byte, MD5=2B8D2A5AE5ED73E3A42B529C168C60B5, tanggal 2024-10-14) dan unzip ke _tomcat_, menciptakan_tomcat_/content/erddapSitemap

CATATAN: Secara default Maven akan menyimpan referensi statis dan menguji unduhan arsip data dan hanya mengekstraknya ketika versi baru diunduh. Untuk mendownload skip sepenuhnya, Anda dapat mengatur `skipResourceDownload` dan / atau `skipTestResourceDownload` properti untuk Maven (e.g. `mvn -DskipResourceDownload paket Sitemap) Sitemap Untuk memaksa ekstraksi, set `-Ddownload.unpack=true` dan `-Ddownload.unpackDayChanged=false`.

- ERDDAP™dan subkomponennya memiliki sumber terbuka yang sangat liberal,[Login](/license)Anda dapat menggunakan dan memodifikasi kode sumber untuk tujuan apapun, untuk-profit atau nirlaba. LoginERDDAP™dan banyak subkomponen memiliki lisensi yang mengharuskan Anda mengakui sumber kode yang Anda gunakan. Sitemap[Login](/credits)Sitemap Apakah diperlukan atau tidak, itu hanya bentuk yang baik untuk mengakui semua kontributor ini.
  

-  **Gunakan Kode untuk Proyek Lainnya** 

Meskipun Anda dipersilakan untuk menggunakan bagian dariERDDAP™kode untuk proyek lain, memperingatkan bahwa kode dapat dan akan berubah. Kami tidak berjanji untuk mendukung penggunaan kode kami. Git dan GitHub akan menjadi solusi utama Anda untuk berurusan dengan ini -- Git memungkinkan Anda untuk menggabungkan perubahan kami ke dalam perubahan Anda.
   **Untuk banyak situasi di mana Anda mungkin tergoda untuk menggunakan bagianERDDAP™dalam proyek Anda, kami pikir Anda akan menemukan lebih mudah untuk menginstal dan menggunakanERDDAP™Sitemap** dan kemudian menulis layanan lain yang digunakanERDDAPSitemap Anda dapat mengatur Anda sendiriERDDAP™instalasi hancur dalam satu jam atau dua. Anda dapat mengatur Anda sendiriERDDAP™instalasi dengan cara yang dipoles dalam beberapa hari (tergantung pada jumlah dan kompleksitas dataset Anda) Sitemap Tapi hacking keluar bagian dariERDDAP™untuk proyek Anda sendiri cenderung mengambil minggu (dan bulan untuk menangkap seluk) dan Anda akan kehilangan kemampuan untuk menggabungkan perubahan dan perbaikan bug dari berikutnyaERDDAP™Sitemap Sitemap (Sitemap) berpikir ada banyak manfaat untuk menggunakanERDDAP™dan membuat AndaERDDAP™instalasi publik dapat diakses. Namun, dalam beberapa keadaan, Anda mungkin tidak ingin membuat Anda Meme itERDDAP™instalasi publik dapat diakses. Kemudian, layanan Anda dapat mengakses dan menggunakan pribadi AndaERDDAP™dan klien Anda tidak tahu tentang Meme itERDDAP™Sitemap

  ####  **Login** 

Atau, ada pendekatan lain yang mungkin Anda temukan berguna yang setengah jalan di antara mahir keERDDAP'kode dan menggunakanERDDAP™sebagai layanan web mandiri: Dalam kelas EDD, ada metode statis yang memungkinkan Anda membuat contoh dataset (berdasarkan spesifikasi dalamdatasets.xml) Sitemap
Sitemap Login (WordPress.org) 
`Ini mengembalikan instance dari EDDTable atauEDDGridLogin Mengingat bahwa instance, Anda dapat memanggil\\
Sitemap (String userDapQuery, String dir, String fileName, String file Login) 
`to memberitahukan contoh untuk membuat file data, dari fileType tertentu, dengan hasil dari query pengguna. Dengan demikian, ini adalah cara sederhana untuk digunakanERDDAP's metode untuk meminta data dan mendapatkan file dalam menanggapi, hanya sebagai klien akan menggunakanERDDAP™aplikasi web. Tapi pendekatan ini bekerja dalam AndaJavaprogram dan memotong kebutuhan server aplikasi seperti Tomcat. Kami menggunakan pendekatan ini untuk banyak tes unit EDDTable danEDDGridsubklas, sehingga Anda dapat melihat contoh ini dalam kode sumber untuk semua kelas tersebut.

###  **Lingkungan Pembangunan**  {#development-environment} 

  - Ada konfigurasi untuk[Login](https://github.com/ERDDAP/erddap/blob/main/development/jetty)Login[Login](https://github.com/ERDDAP/erddap/blob/main/development/docker)di GitHub, meskipun rilis diharapkan dapat berjalan di Tomcat.

  -  **Login** Sitemap SitemapERDDAP™di Tomcat\\
SitemapERDDAP™terutama dimaksudkan untuk menjadi servlet berjalan di Tomcat, kami sangat menyarankan Anda mengikuti standar[instruksi instalasi](/docs/server-admin/deploy-install)untuk menginstal Tomcat, dan kemudian menginstalERDDAP™di direktori webapps Tomcat. Di antara lain,ERDDAP™dirancang untuk dipasang di struktur direktori Tomcat dan mengharapkan Tomcat untuk menyediakan beberapa file .jar.

  - ERDDAP™tidak memerlukan IDE tertentu (Chris terutama menggunakan Visual Studio Code, Bob digunakan EditPlus) Sitemap Kami tidak menggunakan Eclipse, Ant, dll.; atau kami menawarkanERDDAP- dukungan terkait untuk mereka. Proyek ini tidak menggunakan Maven.

  - Kami menggunakan file batch yang menghapus semua file .class di pohon sumber untuk memastikan bahwa kami memiliki kompilasi bersih (dengan javac) Sitemap

  - Saat ini kami menggunakan javac adopsis jdk-21.0.3+9 untuk mengkompilasi gov.noa.pfeg.coastwatch.TestAll (memiliki link ke beberapa kelas yang tidak akan dikompilasi jika Meme it) dan menjalankan tes. Untuk alasan keamanan, hampir selalu terbaik untuk menggunakan versi terbaru dariJava21 dan Tomcat 10.

    - Ketika kita menjalankan javac atau java, direktori saat ini adalah _tomcat_/webapps/erddap/WEB-INF.

    - Our javac dan java classpath adalah
`classes;./././lib/servlet-api.jar;lib/*`

    - Jadi baris perintah javac Anda akan menjadi sesuatu seperti\\
`javac -encoding UTF-8 -cp kelas;./.././lib/servlet-api.jar;lib/* kelas/gov/noaaa/pfel/coastwatch/TestAll.java`

    - Dan baris perintah java Anda akan menjadi sesuatu seperti\\
`java -cp kelas;./../lib/servlet-api.jar;lib/* -Xmx4000M -Xms4000M kelas/gov/noaa/pfel/coastwatch/TestAll
`Optional: Anda dapat menambahkan `-verbose: gc`, yang memberitahukanJavauntuk mencetak statistik pengumpulan sampah.

    - Sitemap Semua kompila, semuanyaERDDAP™kebutuhan telah dikompilasi. Beberapa kelas disusun yang tidak diperlukan untukERDDAP™Sitemap Jika membandingkan TestAll berhasil tetapi tidak mengkompilasi beberapa kelas, kelas itu tidak diperlukan. (Ada beberapa kelas yang belum selesai/digunakan.) 

  - Dalam beberapa kasus, kami menggunakan kode sumber pihak ke-3 daripada file .jar (SitemapDODS) dan telah memodifikasi mereka sedikit untuk menghindari masalah mematuhi Meme itJava21. Kami sering membuat modifikasi sedikit lainnya (SitemapDODS) untuk alasan lain.

  - Sebagian besar kelas memiliki metode pengujian dalam file src/test yang terkait. Anda dapat menjalankan tes JUnit dengan perintah `mvn test`. Ini akan men-download beberapa file zip data yang tes bergantung dari rilis terbaru dari[ERDDAPLogin Sitemap](https://github.com/ERDDAP/erddapTest/releases/)Login
     
CATATAN: cache Maven download tetapi akan unzip arsip download pada setiap eksekusi, yang membutuhkan waktu. Untuk mengunduh skip
dan arsip data tes unzipping, Anda dapat menentukan properti `skipTestResourceDownload` ke Maven (e.g. `mvn -DskipTestResourceDownload paket Sitemap) Sitemap

###   **Kelas Penting**  {#important-classes} 

Jika Anda ingin melihat kode sumber dan mencoba untuk mengetahui bagaimanaERDDAP™bekerja, silahkan lakukan.

  - Kode memilikiJavaDoc komentar, tapiJavaDocs belum dihasilkan. Jangan ragu untuk menghasilkan mereka.

  - Kelas yang paling penting (termasuk yang disebutkan di bawah ini) Sitemap

  - LoginERDDAP™kelas memiliki metode tingkat tertinggi. Ini memperpanjang HttpServlet.

  - ERDDAP™melewati permintaan untuk contoh subklas dariEDDGridatau EDDTable, yang mewakili dataset individu.

  - EDStatic memiliki sebagian besar informasi dan pengaturan statis (e.g., dari setup.xml dan pesan.xml file) dan menawarkan layanan statis (e.g., mengirim email) Sitemap

  - EDDGriddan subklas EDDTable parse permintaan, mendapatkan data dari metode subklasifikasi, kemudian memformat data untuk respons.

  - EDDGridsubclasses mendorong data ke GridDataAccessor (wadah data internal untuk data gridded) Sitemap

  - subklas EDDTable mendorong data ke subklas MejaWriter, yang menulis data ke jenis file tertentu pada-the-fly.

  - Kelas lain (e.g., kelas tingkat rendah) juga penting, tetapi kurang kemungkinan bahwa Anda akan bekerja untuk mengubahnya.
     

###  **Kontribusi Kode**  {#code-contributions} 

- Masalah GitHub
Jika Anda ingin berkontribusi tetapi tidak memiliki proyek, lihat daftar[Masalah GitHub](https://github.com/ERDDAP/erddap/issues)Banyak proyek yang bisa Anda ambil. Jika Anda ingin bekerja pada masalah, mohon mohon tunjuk kepada diri Anda untuk menunjukkan kepada orang lain yang Anda kerjakan di atasnya. Masalah GitHub adalah tempat terbaik untuk mendiskusikan pertanyaan untuk bagaimana melanjutkan dengan bekerja pada masalah itu.

- Jika perubahan yang ingin Anda lakukan adalah salah satu kasus umum di bawah ini, silakan buat[Masalah GitHub](https://github.com/ERDDAP/erddap/issues)menunjukkan perubahan yang ingin Anda buat. Kemudian setelah perubahan selesai, buat pull request untuk meminta merge. Perubahan umum termasuk:

  - Anda ingin menulis subclass lain dari Meme itEDDGridatau EDDTable untuk menangani jenis sumber data lain. Jika demikian, kami merekomendasikan bahwa Anda menemukan subklas yang ada dan menggunakan kode sebagai titik awal.

  - Anda ingin menulis metode saveAs_FileType_ lain. Jika demikian, kami sarankan Anda menemukan metode saveAs_FileType_ yang paling dekatEDDGridatau EDDTable dan gunakan kode sebagai titik awal.

Situasi tersebut memiliki keunggulan bahwa kode yang Anda tulis adalah mandiri. Anda tidak perlu tahu semua rincianERDDAP's internal. Dan itu akan mudah bagi kami untuk memasukkan kode AndaERDDAPSitemap Perhatikan bahwa jika Anda mengirimkan kode, lisensi akan perlu kompatibel denganERDDAP™ [Login](/license)  (Login[Login](https://www.apache.org/licenses/)Login[Login](https://www.opensource.org/licenses/bsd-license.php)Sitemap[Login](https://www.opensource.org/licenses/mit-license.php)) Sitemap Kami akan mencantumkan kontribusi Anda di[Login](/credits)Sitemap

- Jika Anda memiliki fitur yang tidak tercakup di atas yang ingin Anda tambahkanERDDAP, disarankan untuk pertama-tama membuat utas diskusi di[Diskusi GitHub](https://github.com/ERDDAP/erddap/discussions/categories/ideas)Sitemap Untuk fitur yang signifikan/perubahan Dewan Teknis akan membahas mereka dan memutuskan apakah untuk menyetujui menambahkannya untukERDDAP™Sitemap

###  **Memberikan Kontribusi Kode Anda**  {#judging-your-code-contributions} 
Jika Anda ingin mengirimkan kode atau perubahan lain yang akan disertakanERDDAP, itu bagus. Kontribusi Anda harus memenuhi kriteria tertentu untuk diterima. Jika Anda mengikuti panduan di bawah ini, Anda sangat meningkatkan kemungkinan kontribusi Anda diterima.
   

  - LoginERDDAP™proyek dikelola oleh NATD (NOAADirektur Teknis yang ditunjuk) dengan masukan dari Dewan Teknis.
Dari 2007 (awalERDDAP) melalui 2022, yaitu Bob Simons (juga Pendiri-Leader) Sitemap Dimulai pada Januari 2023, yaitu Chris John. Pada dasarnya, NATD bertanggung jawab atasERDDAPs/he memiliki kata akhir tentang keputusan tentangERDDAP™kode, terutama tentang desain dan apakah permintaan tarik yang diberikan akan diterima atau tidak. Perlu cara ini sebagian karena alasan efisiensi (ia bekerja bagus untuk Linus Torvalds dan Linux) dan sebagian untuk alasan keamanan: Seseorang harus memberi tahu orang-orang keamanan TI yang bertanggung jawab atas keamanan dan integritas kode.
     

  - NATD tidak menjamin bahwa s/he akan menerima kode Anda.
Jika sebuah proyek tidak bekerja sama seperti yang kita harapkan dan jika itu tidak bisa rusak, NATD tidak akan menyertakan proyek diERDDAP™Login Jangan merasa buruk. Kadang-kadang proyek tidak bekerja dan berharap. Kebetulan semua pengembang perangkat lunak. Jika Anda mengikuti panduan di bawah ini, Anda sangat meningkatkan peluang kesuksesan Anda.
     

  - Yang terbaik jika perubahan adalah kepentingan umum dan kegunaan.
Jika kode spesifik untuk organisasi Anda, mungkin terbaik untuk mempertahankan cabang terpisahERDDAP™untuk penggunaan Anda. Axiom melakukan ini. Untungnya, Git membuat ini mudah dilakukan. NATD ingin mempertahankan visi yang konsisten untukERDDAPTidak memungkinkan untuk menjadi proyek wastafel dapur di mana semua orang menambahkan fitur kustom untuk proyek mereka.
     

  - SitemapJavaKonvensi Kode.
Secara umum, kode Anda harus berkualitas baik dan harus mengikuti aslinya[JavaKonvensi Kode](https://www.oracle.com/technetwork/java/codeconventions-150003.pdf): menempatkan file .class di tempat yang tepat di struktur direktori, memberikan file .class nama yang tepat, termasuk yang tepatJavaKomentar Doc, termasuk //komment pada awal setiap ayat kode, indent dengan 4 ruang (tidak tab) , hindari garis &gt; 80 karakter, dll. Perubahan Konvensi dan kode sumber tidak selalu sepenuhnya sampai saat ini. Ketika ragu, kode pertandingan untuk konvensi dan tidak ada kode.

- Gunakan kelas deskriptif, metode dan nama variabel.
Itu membuat kode lebih mudah bagi orang lain untuk membaca.
   

- Hindari kode mewah.
Dalam jangka panjang, Anda atau orang lain harus mencari kode untuk mempertahankannya. Jadi gunakan metode pengkodean sederhana yang sangat mudah bagi orang lain (termasuk Anda di masa depan) Sitemap Jelas, jika ada keuntungan nyata untuk menggunakan beberapa mewahJavafitur pemrograman, menggunakannya, tetapi dokumen secara luas apa yang Anda lakukan, mengapa, dan bagaimana bekerja.
   

- Bekerja dengan Dewan Teknis sebelum Anda memulai.
Jika Anda berharap untuk mendapatkan perubahan kode Anda ditarik keERDDAP™Dewan Teknis pasti akan ingin berbicara tentang apa yang akan Anda lakukan dan bagaimana Anda akan melakukannya sebelum Anda melakukan perubahan pada kode. Dengan cara itu, kita dapat menghindari perubahan bahwa NATD, pada akhirnya, tidak menerima. Ketika Anda melakukan pekerjaan, Dewan NATD dan Teknis bersedia menjawab pertanyaan untuk membantu Anda mengetahui kode yang ada dan (Sitemap) Bagaimana cara mengatasi proyek Anda.
   

- Bekerja secara mandiri (sebanyak mungkin) setelah Anda memulai.
Berbeda dengan "Perkerjaan dengan Dewan Teknis", setelah Anda memulai proyek, NATD mendorong Anda untuk bekerja secara mandiri mungkin. Jika NATD harus memberitahu Anda hampir segala sesuatu dan menjawab banyak pertanyaan (terutama yang Anda dapat menjawab dengan membaca dokumentasi atau kode) , maka upaya Anda tidak menghemat waktu untuk NATD dan s / dia mungkin juga melakukan pekerjaan mereka sendiri. Sitemap[Mythical Man Bulan](https://en.wikipedia.org/wiki/The_Mythical_Man-Month)Sitemap Tentu saja, kita masih harus berkomunikasi. Ini akan sangat bagus untuk melihat pekerjaan Anda secara berkala dalam kemajuan untuk memastikan proyek sedang dilacak. Tapi semakin banyak Anda dapat bekerja secara mandiri (setelah Dewan Teknis setuju pada tugas di tangan dan pendekatan umum) Sitemap
   

- Hindari bug.
Jika bug tidak tertangkap sebelum rilis, itu menyebabkan masalah bagi pengguna (terbaik) , mengembalikan informasi yang salah (di worst) , adalah blot di Meme itERDDAP's reputasi, dan akan bertahan pada tanggal keluarERDDAP™instalasi selama bertahun-tahun. Bekerja sangat sulit untuk menghindari bug. Bagian dari ini menulis kode bersih (sehingga lebih mudah untuk melihat masalah) Sitemap Bagian dari ini adalah tes unit tulisan. Bagian dari ini adalah sikap konstan dari menghindari bug ketika Anda menulis kode. Jangan membuat regret NATD menambahkan kode Anda keERDDAP™Sitemap
   

- Tulis tes atau tes unit.
Untuk kode baru, Anda harus menulis tes JUnit dalam file uji.
Silahkan menulis setidaknya satu metode tes individu yang secara menyeluruh menguji kode yang Anda tulis dan tambahkan ke file uji JUnit kelas sehingga dijalankan secara otomatis. Login (dan terkait) tes adalah salah satu cara terbaik untuk menangkap bug, awalnya, dan dalam jangka panjang (sebagai hal lain berubahERDDAP™) Sitemap Seperti Bob berkata, "Unit tes adalah apa yang memungkinkan saya tidur di malam hari."
   

- Mudah untuk NATD untuk memahami dan menerima perubahan permintaan tarik Anda.
Bagian yang menulis metode uji unit (Login) Sitemap Bagian yang membatasi perubahan pada satu bagian kode (atau satu kelas) Sitemap NATD tidak akan menerima permintaan tarik dengan ratusan perubahan sepanjang kode. NATD memberi tahu orang-orang keamanan TI yang s / ia bertanggung jawab atas keamanan dan integritas kode. Jika ada terlalu banyak perubahan atau mereka terlalu sulit untuk mencari tahu, maka itu hanya terlalu sulit untuk memverifikasi perubahan benar dan tidak memperkenalkan bug atau masalah keamanan.
   

- Tetap sederhana.
Tema keseluruhan yang baik untuk kode Anda adalah: Jauhkan sederhana. Kode sederhana mudah bagi orang lain (termasuk Anda di masa depan) membaca dan memelihara. Sangat mudah untuk NATD untuk memahami dan dengan demikian menerima.
   

- Menilai tanggung jawab jangka panjang untuk kode Anda.
Dalam jangka panjang, yang terbaik jika Anda mengasumsikan tanggung jawab berkelanjutan untuk menjaga kode Anda dan menjawab pertanyaan tentang hal itu (SitemapERDDAP™Google Login) Sitemap Sebagai beberapa catatan penulis, kode adalah tanggung jawab serta aset. Jika bug ditemukan di masa depan, yang terbaik jika Anda memperbaikinya karena tidak ada yang tahu kode Anda lebih baik daripada Anda (juga sehingga ada insentif untuk menghindari bug di tempat pertama) Sitemap NATD tidak meminta komitmen perusahaan untuk memberikan perawatan berkelanjutan. NATD hanya mengatakan bahwa melakukan perawatan akan sangat dihargai.
