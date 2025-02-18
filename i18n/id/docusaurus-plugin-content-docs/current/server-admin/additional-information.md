---
sidebar_position: 4
---
ERDDAP™- Mengatur SendiriERDDAP™    

## Hal-hal yang perlu Anda ketahui{#things-you-need-to-know} 
     
###    **[Kesalahan Proxy](#proxy-errors)**  {#proxy-errors} 
Kadang-kadang, permintaanERDDAP™akan mengembalikan Kesalahan Proxy, Kesalahan HTTP 502 Bad Gateway, atau beberapa kesalahan serupa. Kesalahan ini dibuang oleh Apache atau Tomcat, tidakERDDAP™sendiri. Meme it
* Jika setiap permintaan menghasilkan kesalahan ini, terutama ketika Anda mengatur pertama AndaERDDAP™, maka mungkin adalah kesalahan proxy atau gateway yang buruk, dan solusinya mungkin untuk memperbaiki[ERDDAPSitemap](/docs/server-admin/deploy-install#proxypass)Sitemap Ini mungkin juga menjadi masalah ketika didirikanERDDAP™tiba-tiba mulai membuang kesalahan ini untuk setiap permintaan.
* Jika tidak, kesalahan "proxy" biasanya benar-benar waktu keluar kesalahan dibuang oleh Apache atau Tomcat. Bahkan ketika mereka terjadi relatif cepat, itu adalah semacam tanggapan dari Apache atau Tomcat yang terjadi ketikaERDDAP™sangat sibuk, memori-limited, atau terbatas oleh beberapa sumber daya lainnya. Dalam kasus ini, lihat saran di bawah untuk berurusan dengan[ERDDAP™merespons perlahan](#responding-slowly)Sitemap
        
Permintaan untuk rentang waktu yang lama (&gt;30 poin waktu) dari dataset gridded rentan terhadap kegagalan waktu, yang sering muncul sebagai Kesalahan Proxy, karena membutuhkan waktu yang signifikan untukERDDAP™untuk membuka semua file data satu demi satu. SitemapERDDAP™tidak sibuk selama permintaan, masalahnya lebih cenderung terjadi. Jika file dataset dikompresi, masalahnya lebih cenderung terjadi, meskipun sulit bagi pengguna untuk menentukan apakah file dataset dikompresi.
Solusinya adalah membuat beberapa permintaan, masing-masing dengan rentang waktu yang lebih kecil. Bagaimana kecil rentang waktu? Saya menyarankan mulai benar-benar kecil (~ 30 poin waktu?) Sitemap (Sitemap) dua kali rentang sampai permintaan gagal, kemudian kembali satu kali lipat. Kemudian buat semua permintaan (setiap untuk chunk waktu yang berbeda) diperlukan untuk mendapatkan semua data.
LoginERDDAP™administrator dapat mengurangi masalah ini dengan meningkatkan[Pengaturan waktu Apache](/docs/server-admin/deploy-install#apache-timeout)Sitemap
        
### Login{#monitoring} 
Kami semua ingin layanan data kami untuk menemukan audiens mereka dan banyak digunakan, tetapi kadang-kadang AndaERDDAP™mungkin digunakan terlalu banyak, menyebabkan masalah, termasuk respons super lambat untuk semua permintaan. Rencana kami untuk menghindari masalah adalah:

* LoginERDDAP™Sitemap[status.html halaman web](#status-page)Sitemap
Memiliki banyak informasi yang berguna. Jika Anda melihat bahwa sejumlah besar permintaan akan datang, atau ton memori yang digunakan, atau ton permintaan gagal, atau setiap BebanDataset Utama memakan waktu lama, atau melihat tanda apa pun dari hal-hal yang bogged turun dan merespon perlahan-lahan, lalu lihat diERDDAPSitemap[Login](#log)untuk melihat apa yang terjadi. Meme it
    
Ini juga berguna untuk hanya mencatat seberapa cepat halaman status merespons. Jika merespons perlahan-lahan, itu adalah indikator penting yangERDDAP™sangat sibuk.
    
* LoginERDDAP™Sitemap[Laporan harian](#daily-report)Sitemap
     
* Watch for out-of-date dataset melalui *Login* /erddap/outOfDateDatasets.htmlhalaman web yang didasarkan pada opsional[testOutOfDate](/docs/server-admin/datasets#testoutofdate)atribut global.
     
#### Monitor eksternal{#external-monitors} 
Metode yang tercantum di atasERDDAP's cara pemantauan itu sendiri. Meme it Hal ini juga memungkinkan untuk membuat atau menggunakan sistem eksternal untuk memantau AndaERDDAPSitemap Satu proyek untuk melakukan ini[Proyek erddap-metrik Axiom](https://github.com/axiom-data-science/erddap-metrics)Sitemap Sistem eksternal tersebut memiliki beberapa keunggulan:
* Mereka dapat disesuaikan untuk memberikan informasi yang Anda inginkan, ditampilkan dengan cara yang Anda inginkan.
* Mereka dapat memasukkan informasi tentangERDDAP™LoginERDDAP™tidak dapat mengakses dengan mudah atau sama sekali (misalnya, penggunaan CPU, ruang bebas disk,ERDDAP™waktu respons seperti yang terlihat dari perspektif pengguna,ERDDAP™Sitemap
* Mereka dapat memberikan peringatan (email, panggilan telepon, teks) untuk administrator ketika masalah melebihi beberapa ambang.
             
### Beberapa simultan Sitemap{#multiple-simultaneous-requests} 
*    **Pengguna Blacklist membuat beberapa permintaan simultan&#33;** 
Jika jelas bahwa beberapa pengguna membuat lebih dari satu permintaan simultan, berulang kali dan terus menerus, kemudian tambahkan alamat IP mereka keERDDAPSitemap&lt;Login (/docs/server-admin/datasets#requestblacklist) Andadatasets.xmlLogin Terkadang permintaan dari satu alamat IP. Kadang-kadang mereka dari beberapa alamat IP, tetapi jelas pengguna yang sama. Anda juga dapat daftar hitam orang yang membuat ton permintaan tidak valid atau ton permintaan yang tidak efisien.
    
Kemudian, untuk setiap permintaan yang mereka buat,ERDDAP™kembali:
    
    > HTTP ERROR 403 - Access Forbidden --  
    > Your IP address is on this ERDDAP's request blacklist.  
    > Did you often submit more than one request at a time?  
    > Did you often submit identical requests in a short period of time?  
    > Did you submit a large number of invalid requests?  
    > If you are ready to avoid these problems, please email \\[ERDDAP™ administrator's email address\\] to request to be taken off of the blacklist.
    
Mudah-mudahan pengguna akan melihat pesan ini dan menghubungi Anda untuk mengetahui cara memperbaiki masalah dan menyingkirkan daftar hitam. Kadang-kadang, mereka hanya beralih alamat IP dan mencoba lagi.
    
Ini seperti keseimbangan kekuatan antara senjata ofensif dan defensif dalam perang. Di sini, senjata defensif (ERDDAP) memiliki kapasitas tetap, terbatas pada jumlah core dalam CPU, bandwidth akses disk, dan bandwidth jaringan. Tapi senjata yang menyinggung (pengguna, skrip tidak mungkin) memiliki kapasitas tak terbatas:
    
    * Satu permintaan data dari banyak poin waktu dapat menyebabkanERDDAPuntuk membuka sejumlah besar file (dalam urutan atau sebagian multi-threaded) Sitemap Dalam kasus ekstrem, satu permintaan "sederhana" dapat dengan mudah mengikat RAID melekatERDDAP™untuk satu menit, secara efektif menghalangi penanganan permintaan lain.
         
    * Satu permintaan dapat mengkonsumsi chunk besar memori (meskipunERDDAP™dikodekan untuk meminimalkan memori yang diperlukan untuk menangani permintaan besar) Sitemap
         
    * Login Login
Sangat mudah bagi pengguna yang cerdas untuk memadukan tugas besar dengan menghasilkan banyak benang, masing-masing yang mengajukan permintaan terpisah (yang mungkin besar atau kecil) Sitemap Perilaku ini didorong oleh komunitas ilmu komputer sebagai cara yang efisien untuk menghadapi masalah besar (dan paralelisasi efisien dalam keadaan lain) Sitemap Kembali ke analogi perang: pengguna dapat membuat jumlah permintaan simultan yang sangat tidak terbatas dengan biaya setiap yang pada dasarnya nol, tetapi biaya setiap permintaan datang keERDDAP™bisa besar danERDDAPKemampuan responsnya terbatas. SitemapERDDAP™akan kehilangan pertempuran ini, kecualiERDDAP™pengguna blacklist administrator yang membuat beberapa permintaan simultan yang tidak adil memperbesar pengguna lain.
         
    * Beberapa Script -
Sekarang berpikir tentang apa yang terjadi ketika ada beberapa pengguna pintar setiap menjalankan skrip paralel. Jika satu pengguna dapat menghasilkan begitu banyak permintaan yang pengguna lain ramai, maka beberapa pengguna tersebut dapat menghasilkan begitu banyak permintaan yangERDDAP™menjadi luar biasa dan tampaknya tidak responsif. Secara efektif[serangan DDOS](https://en.wikipedia.org/wiki/Denial-of-service_attack)Lagi, satu-satunya pertahanan untuk Meme itERDDAP™adalah pengguna daftar hitam yang membuat beberapa permintaan simultan yang tidak adil memperbesar pengguna lain.
         
    * Ekspektasi yang Dikembang -
Di dunia ini perusahaan teknologi besar (Amazon, Google, Facebook, Twitter) pengguna harus mengharapkan kemampuan tak terbatas pada penyedia. Karena perusahaan-perusahaan ini adalah operasi pembuatan uang, semakin banyak pengguna yang mereka miliki, semakin banyak pendapatan mereka harus memperluas infrastruktur TI mereka. Jadi mereka mampu memberikan infrastruktur TI besar untuk menangani permintaan. Dan mereka membatasi jumlah permintaan dan biaya setiap permintaan dari pengguna dengan membatasi jenis permintaan yang pengguna dapat membuat sehingga tidak ada permintaan tunggal yang membebani, dan tidak ada alasan (atau cara) untuk pengguna untuk membuat beberapa permintaan simultan. Jadi perusahaan teknologi besar ini mungkin memiliki lebih banyak pengguna daripada Meme itERDDAP™tetapi mereka memiliki lebih banyak sumber daya dan cara yang cerdas untuk membatasi permintaan dari setiap pengguna. Ini adalah situasi yang dapat dikelola untuk perusahaan TI besar (dan mereka kaya&#33; Meme it) tapi tidak untuk Meme itERDDAP™Login Lagi, satu-satunya pertahanan untuk Meme itERDDAP™adalah pengguna daftar hitam yang membuat beberapa permintaan simultan yang tidak adil memperbesar pengguna lain.
         
    
Jadi pengguna: Jangan membuat beberapa permintaan simultan atau Anda akan berwarna hitam&#33;
     

Jelas, yang terbaik jika server Anda memiliki banyak core, banyak memori (sehingga Anda dapat mengalokasikan banyak memori untuk Meme itERDDAP™Lebih dari kebutuhannya) , dan koneksi internet bandwidth tinggi. Kemudian, memori jarang atau tidak pernah membatasi faktor, tetapi bandwidth jaringan menjadi faktor pembatasan yang lebih umum. Pada dasarnya, karena ada lebih banyak permintaan simultan, kecepatan untuk setiap pengguna yang diberikan berkurang. Itu secara alami memperlambat jumlah permintaan yang datang jika setiap pengguna hanya mengirimkan satu permintaan pada waktu.
    
### ERDDAP™Mendapatkan Data dari THREDDS{#erddap-getting-data-from-thredds} 
SitemapERDDAP™mendapatkan beberapa data dari THREDDS di situs Anda, ada beberapa keuntungan untuk membuat salinan file data THREDDS (setidaknya untuk dataset paling populer) di RAID lainERDDAP™memiliki akses ke sehinggaERDDAP™dapat melayani data dari file secara langsung. SitemapERDKami melakukannya untuk set data kami yang paling populer.

*   ERDDAP™bisa mendapatkan data langsung dan tidak harus menunggu THREDDS untuk memuat ulang dataset atau ...
*   ERDDAP™dapat melihat dan menggabungkan file data baru segera, sehingga tidak perlu menimbulkan THREDDS sering untuk melihat apakah dataset telah berubah. Sitemap&lt;Login (/docs/server-admin/dataset#updateeverynmillis) Sitemap
* Beban dibagi antara 2 RAIDS dan 2 server, bukan permintaan yang sulit di keduaERDDAP™dan THREDDS.
* Anda menghindari masalah ketidakcocokan yang disebabkan oleh THREDDS memiliki sedikit (Sitemap) ukuran permintaan maksimum.ERDDAP™memiliki sistem untuk menangani ketidakcocokan, tetapi menghindari masalah lebih baik.
* Anda memiliki salinan cadangan data yang selalu ide yang baik.

Dalam kasus apapun, tidak pernah menjalankan THREDDS danERDDAP™di Tomcat yang sama. Jalankan mereka di Tomcats terpisah, atau lebih baik, pada server terpisah.

Kami menemukan bahwa THREDDS secara berkala mendapat dalam keadaan di mana permintaan hanya hang. SitemapERDDAP™mendapatkan data dari THREDDS dan THREDDS dalam keadaan ini,ERDDAP™memiliki pertahanan (itu mengatakan dataset berbasis THREDDS tidak tersedia) tapi masih kesulitan untuk Meme itERDDAP™SitemapERDDAP™harus menunggu sampai waktu setiap kali mencoba untuk memuat ulang dataset dari THREDDS lapar. Beberapa kelompok (SitemapERD) menghindari ini dengan restart secara proaktif THREDDS sering (e.g., nightly dalam pekerjaan tanaman) Sitemap

### Menjawab Slowly{#responding-slowly} 
*    **SitemapERDDAP™Menjawab Slowly** atau jika hanya permintaan tertentu merespon perlahan-lahan,
Anda dapat mencari tahu apakah kelangsungan hidup masuk akal dan sementara Meme it (misalnya, karena banyak permintaan dari skrip atauWMSLogin) , atau jika sesuatu yang tidak jelas dan Anda perlu Meme it[menutup dan restart Tomcat danERDDAP™](#shut-down-and-restart)Sitemap
    
SitemapERDDAP™merespons perlahan-lahan, lihat saran di bawah untuk menentukan penyebabnya, yang dengan harapan akan memungkinkan Anda untuk memperbaiki masalah.
Anda mungkin memiliki titik awal tertentu (e.g., URL permintaan tertentu) atau titik awal vague (LoginERDDAP™lambat) Sitemap
Anda mungkin tahu pengguna yang terlibat (e.g., karena mereka mengirim email Anda) atau tidak.
Anda mungkin memiliki klues lain, atau tidak.
Karena semua situasi ini dan semua kemungkinan penyebab masalah kabur bersama-sama, saran di bawah ini mencoba untuk menangani semua kemungkinan titik awal dan semua kemungkinan masalah yang berkaitan dengan respon lambat.
    
    *    **Cari petunjuk[ERDDAPLogin](#log)**   ( *Login* WordPress.org) Sitemap
        \\[Pada kesempatan yang jarang terjadi, ada petunjuk dalam[File log Tomcat](#tomcat-logs)  ( *Login* WordPress.org) Sitemap\\]  
Cari pesan kesalahan.
Carilah sejumlah besar permintaan yang datang dari satu (atau beberapa) pengguna dan mungkin berharap banyak sumber daya server Anda (memori, waktu CPU, akses disk, bandwidth internet) Sitemap
        
Jika masalah diikat ke **satu pengguna** Anda sering bisa mendapatkan petunjuk tentang siapa pengguna melalui layanan web seperti Meme it[ https://whatismyipaddress.com/ip-lookup ](https://whatismyipaddress.com/ip-lookup)yang dapat memberikan informasi yang terkait dengan alamat IP pengguna (yang dapat Anda temukan diERDDAPSitemap[Login](#log)Login) Sitemap
        
        * Jika pengguna tampaknya menjadi **Login** berperilaku buruk (tidak bisa, mesin pencari mencoba mengisiERDDAP™bentuk dengan setiap perhitungan nilai entri yang mungkin) Pastikan Anda telah mengatur server Anda dengan benar[WordPress.org](#robotstxt)Login
        * Jika pengguna tampaknya menjadi **Login (Login) ** yang membuat beberapa permintaan simultan, hubungi pengguna, menjelaskan bahwa AndaERDDAP™memiliki sumber daya terbatas (e.g., memori, waktu CPU, akses disk, bandwidth internet) dan meminta mereka untuk mempertimbangkan pengguna lain dan hanya membuat satu permintaan pada waktu. Anda mungkin juga menyebutkan bahwa Anda akan daftar hitam mereka jika mereka tidak kembali. Meme it
        * Jika pengguna tampaknya menjadi **Login** membuat sejumlah besar permintaan memakan waktu, meminta pengguna untuk mempertimbangkan pengguna lain dengan menempatkan jeda kecil (2 detik?) di script antara permintaan.
        *    **WMSsoftware klien** bisa sangat menuntut. Satu klien sering akan meminta 6 gambar kustom pada waktu. Jika pengguna tampaknya menjadiWMSklien yang membuat permintaan yang sah, Anda dapat:
            * Login (dianjurkan, karena mereka akan bergerak segera) 
            * Matikan server AndaWMSSitemapERDDAPfile setup.html. (tidak disarankan) 
        * Jika permintaan tampaknya **stupid, gila, berlebihan, atau jahat,** atau jika Anda tidak dapat menyelesaikan masalah dengan cara lain, pertimbangkan sementara atau secara permanen menambahkan alamat IP pengguna ke [&lt;permintaanBlacklist&gt; di Andadatasets.xmlLogin (/docs/server-admin/datasets#requestblacklist) Sitemap
             
    *    **Coba duplikat masalah sendiri, dari komputer Anda.**   
Gambar jika masalahnya adalah dengan satu dataset atau semua dataset, untuk satu pengguna atau semua pengguna, untuk hanya jenis permintaan tertentu, dll.
Jika Anda dapat menggandakan masalah, cobalah untuk mempersempit masalah.
Jika Anda tidak dapat menggandakan masalah, maka masalah dapat diikat ke komputer pengguna, koneksi internet pengguna, atau koneksi internet institusi Anda.
         
    * Sitemap **satu dataset** merespon perlahan-lahan (mungkin hanya untuk **satu jenis permintaan** dari satu pengguna) , masalah mungkin:
        *   ERDDAP's akses ke data sumber dataset (tidak dapat dari database terkait, Cassandra, dan dataset jarak jauh) dapat sementara atau lambat secara permanen. Coba periksa kecepatan sumber independenERDDAPSitemap Jika lambat, mungkin Anda dapat meningkatkannya.
        * Apakah masalah yang terkait dengan permintaan spesifik atau jenis permintaan umum?
Semakin besar subset yang diminta dari dataset, semakin mungkin permintaan akan gagal. Jika pengguna membuat permintaan besar, minta pengguna untuk membuat permintaan yang lebih kecil yang lebih cenderung mendapatkan respons yang cepat dan sukses.
            
Hampir semua set data lebih baik dalam menangani beberapa jenis permintaan daripada jenis lain permintaan. Misalnya, ketika toko dataset berbeda waktu chunks dalam file yang berbeda, permintaan data dari sejumlah besar poin waktu mungkin sangat lambat. Jika permintaan saat ini adalah jenis yang sulit, mempertimbangkan menawarkan varian dataset yang dioptimalkan untuk permintaan ini. Atau jelaskan kepada pengguna bahwa jenis permintaan sulit dan memakan waktu, dan meminta kesabaran mereka.
            
        * Dataset mungkin tidak dikonfigurasi secara optimal. Anda dapat membuat perubahan datasetdatasets.xmlLoginERDDAP™menangani dataset lebih baik. Sitemap
            
            *   EDDGridDariNFiles dataset yang mengakses data dari file nc4/hdf5 terkompresi lambat ketika mendapatkan data untuk seluruh rentang geografis (e.g., untuk peta dunia) karena seluruh file harus terdekompresi. Anda dapat mengonversi file ke file yang tidak terkompresi, tetapi kemudian persyaratan ruang disk akan jauh, jauh lebih besar. Mungkin lebih baik hanya menerima bahwa dataset tersebut akan lambat dalam keadaan tertentu.
            * Konfigurasi [&lt;subsetVariablesSitemap (/docs/server-admin/datasets#subsetvariables) tag memiliki pengaruh besar pada bagaimanaERDDAP™menangani dataset EDDTable.
            * Anda dapat meningkatkan[WordPress.org](/docs/server-admin/datasets#database-speed)Login
            * Banyak dataset EDDTable dapat disalin[menyimpan salinan data dalamNetCDFBertindak file Array](/docs/server-admin/datasets#eddtablefromfiles)SitemapERDDAP™bisa membaca dengan sangat cepat.
            
Jika Anda ingin membantu mempercepat dataset tertentu, termasuk deskripsi masalah dan chunk datasetdatasets.xmlSitemap[bagian untuk mendapatkan dukungan tambahan](/docs/intro#support)Sitemap
             
    * Sitemap **Sitemap** SitemapERDDAP™Sitemap **Sitemap** lambat, masalah mungkin:
        * Komputer yang berjalanERDDAP™mungkin tidak memiliki daya memori atau pemrosesan yang cukup. Sangat bagus untuk dijalankanERDDAP™di server multi-core modern. Untuk penggunaan berat, server harus memiliki sistem operasi 64-bit dan 8 GB atau lebih memori.
        * Komputer yang berjalanERDDAP™mungkin juga menjalankan aplikasi lain yang mengkonsumsi banyak sumber daya sistem. Jika demikian, Anda bisa mendapatkan dedicated server untukERDDAPSitemap Sitemap (ini bukan dukungan) Anda bisa mendapatkan quad-core Mac Mini Server dengan 8 GB memori untuk ~ $ 1100.
             
    * Sitemap **Sitemap** SitemapERDDAP™Sitemap **sementara** lambat, lihatERDDAPSitemap[ **/erddap/status.htmlLogin** ](#status-page)di browser Anda.
        * LoginERDDAP™halaman status gagal dimuat?
Sitemap[LoginERDDAP™](#shut-down-and-restart)Sitemap
        * SitemapERDDAP™halaman status memuat perlahan-lahan (e.g., &gt; 5 detik) Sitemap
Itu adalah tanda bahwa segala sesuatu dalam Meme itERDDAP™berjalan perlahan-lahan, tetapi tidak tentu kesulitan.ERDDAP™mungkin benar-benar sibuk. Meme it
        * Untuk "Response Waktu Gagal (sejak lama besar LoadDataset) ", n= jumlah besar?
Itu menunjukkan ada banyak permintaan gagal baru-baru ini. Itu mungkin masalah atau awal masalah. Meme it Waktu media untuk kegagalan sering besar (g., 210000 ms) Login
yang berarti bahwa ada Meme it (Sitemap) banyak benang aktif.
yang mengikat banyak sumber daya (seperti memori, file terbuka, soket terbuka, ...) Login
yang tidak baik. Meme it
        * Untuk "Response Succeed Time (sejak lama besar LoadDataset) ", n= jumlah besar?
Itu menunjukkan ada banyak permintaan sukses baru-baru ini. Ini bukan masalah. Ini hanya berarti Anda Meme itERDDAP™mendapatkan penggunaan berat.
        * Apakah "Number benang non-Tomcat-waiting" dua nilai khas?
Ini sering masalah serius yang akan menyebabkan Meme itERDDAP™untuk memperlambat dan akhirnya membekukan. Jika persis ini selama berjam-jam, Anda mungkin ingin proaktif[LoginERDDAP™](#shut-down-and-restart)Sitemap
        * Di bagian bawah daftar "Memory Use Ringkasan", adalah "Memory terakhir: saat ini menggunakan" nilai sangat tinggi?
Itu mungkin hanya menunjukkan penggunaan tinggi, atau mungkin tanda masalah.
        * Lihat daftar benang dan status mereka. Apakah jumlah yang tidak biasa dari mereka melakukan sesuatu yang tidak biasa?
             
    * Login **koneksi internet institusi Anda** saat ini lambat?
Cari internet untuk tes kecepatan antarnet" dan gunakan salah satu tes online gratis, seperti[ https://www.speakeasy.net/speedtest/ ](https://www.speakeasy.net/speedtest/)Sitemap Jika koneksi internet institusi Anda lambat, maka koneksi antaraERDDAP™dan sumber data jarak jauh akan lambat, dan koneksi antaraERDDAP™dan pengguna akan lambat. Kadang-kadang, Anda dapat memecahkan ini dengan menghentikan penggunaan internet yang tidak perlu (e.g., orang menonton video streaming atau panggilan konferensi video) Sitemap
         
    * Login **koneksi internet pengguna** saat ini lambat?
Memiliki pengguna mencari internet untuk "tes kecepatan internet" dan menggunakan salah satu tes online gratis, seperti[ https://www.speakeasy.net/speedtest/ ](https://www.speakeasy.net/speedtest/)Sitemap Jika koneksi internet pengguna lambat, itu memperlambat akses mereka keERDDAPSitemap Kadang-kadang, mereka dapat memecahkan ini dengan menghentikan penggunaan internet yang tidak perlu di institusi mereka (e.g., orang menonton video streaming atau panggilan konferensi video) Sitemap
         
    *    **Login**   
Sitemap[bagian untuk mendapatkan dukungan tambahan](/docs/intro#support)Sitemap

### Shut Turun dan Restart{#shut-down-and-restart} 
*    **Cara Shut Down dan Restart Tomcat danERDDAP™**   
Anda tidak perlu mematikan dan restart Tomcat danERDDAPSitemapERDDAP™sementara lambat, lambat untuk beberapa alasan yang diketahui (seperti banyak permintaan dari script atauWMSLogin) atau untuk menerapkan perubahandatasets.xmlLogin
    
Anda perlu mematikan dan restart Tomcat danERDDAP™jika Anda perlu menerapkan perubahan pada file setup.xml, atau jikaERDDAP™membekukan, menggantung, atau mengunci. Dalam keadaan ekstrem,Javamungkin membekukan selama satu menit atau dua sementara itu melakukan koleksi sampah penuh, tetapi kemudian pulih. Jadi bagus untuk menunggu satu menit atau dua untuk melihat apakah Meme itJavaSitemapERDDAP™benar-benar beku atau jika itu hanya melakukan koleksi garbage panjang. (Jika pengumpulan sampah adalah masalah umum,[mengalokasikan lebih banyak memori untuk Tomcat](/docs/server-admin/deploy-install#memory)Sitemap) 
    
Saya tidak menyarankan menggunakan Tomcat Web Application Manager untuk memulai atau menutup Tomcat. Jika Anda tidak sepenuhnya shutdown dan startup Tomcat, lebih cepat atau lambat Anda akan memiliki masalah memori PermGen.
    
Untuk shutdown dan restart Tomcat danERDDAPSitemap
    
    * Jika Anda menggunakan Linux atau Mac:
         (Jika Anda telah membuat pengguna khusus untuk menjalankan Tomcat, misalnya, tomcat, ingat untuk melakukan langkah-langkah berikut sebagai pengguna.)   
         
        1. Gunakan cd *Login* Login
             
        2. Gunakan ps -ef|grep tomcat untuk menemukan proses java/tomcat Login (semoga, hanya satu proses yang akan terdaftar) kita akan panggilan *Login* Sitemap
             
        3. SitemapERDDAP™beku/hung/dikunci, gunakan membunuh -3 *Login* SitemapJava  (yang menjalankan Tomcat) untuk melakukan dump benang ke file log Tomcat: *Login* /logs/catalina.out Setelah Anda reboot, Anda dapat mendiagnosis masalah dengan menemukan informasi dump benang (dan informasi berguna lainnya di atasnya Meme it) Sitemap *Login* /logs/catalina.out dan juga dengan membaca bagian yang relevan dari[ERDDAP™Login](#log)Sitemap Jika Anda ingin, Anda dapat menyertakan informasi dan melihat informasi kami[bagian untuk mendapatkan dukungan tambahan](/docs/intro#support)Sitemap
             
        4. Gunakan ./shutdown. Login
             
        5. Gunakan ps -ef|grep tomcat berulang kali sampai proses java/tomcat tidak terdaftar.
            
Kadang-kadang, proses java/tomcat akan memakan waktu hingga dua menit. Alasannya adalah:ERDDAP™mengirim pesan ke benang latar belakangnya untuk memberitahu mereka untuk berhenti, tetapi kadang-kadang mengambil benang ini lama untuk sampai ke tempat penghentian yang baik.
            
        6. Jika setelah satu menit atau begitu, java/tomcat tidak berhenti sendiri, Anda dapat menggunakan
membunuh -9 *Login*   
untuk memaksa proses java/tomcat untuk berhenti segera. Jika memungkinkan, gunakan ini hanya sebagai resor terakhir. Sakelar -9 kuat, tetapi dapat menyebabkan berbagai masalah.
             
        7. Untuk restartERDDAP™./startup.sh
             
        8. LoginERDDAP™di browser Anda untuk memeriksa restart berhasil. (Kadang-kadang, Anda perlu menunggu 30 detik dan mencoba memuatERDDAP™lagi di browser Anda untuk berhasil.)   
             
    * Jika Anda menggunakan Windows:
         
        1. Gunakan cd *Login* Login
             
        2. Sitemapshutdown.bat  
             
        3. Anda mungkin ingin/digunakan untuk menggunakan Windows Task Manager (diakses melalui Ctrl Alt Del) untuk memastikan bahwaJavaLoginERDDAP™proses/application telah sepenuhnya berhenti.
Kadang-kadang, proses/applikasi akan memakan waktu hingga dua menit. Alasannya adalah:ERDDAP™mengirim pesan ke benang latar belakangnya untuk memberitahu mereka untuk berhenti, tetapi kadang-kadang mengambil benang ini lama untuk sampai ke tempat penghentian yang baik.
             
        4. Untuk restartERDDAP™, gunakan startup.bat
             
        5. LoginERDDAP™di browser Anda untuk memeriksa restart berhasil. (Kadang-kadang, Anda perlu menunggu 30 detik dan mencoba memuatERDDAP™lagi di browser Anda untuk berhasil.)   
             
### Sering Kecelakaan atau Beku{#frequent-crashes-or-freezes} 
SitemapERDDAP™menjadi lambat, crash atau beku, sesuatu yang salah. Sitemap[ERDDAPLogin](#log)untuk mencoba mencari penyebab. Jika Anda tidak bisa, silakan masukkan detail dan lihat kami[bagian untuk mendapatkan dukungan tambahan](/docs/intro#support)Sitemap

Masalah yang paling umum adalah pengguna yang kesulitan yang menjalankan beberapa skrip sekaligus dan/atau seseorang membuat sejumlah besar permintaan tidak valid. Jika ini terjadi, Anda mungkin harus daftar hitam yang pengguna. Ketika pengguna blacklisted membuat permintaan, pesan kesalahan dalam respons mendorong mereka untuk mengirim email Anda untuk mengerjakan masalah. Kemudian, Anda dapat mendorong mereka untuk menjalankan hanya satu skrip pada waktu dan untuk memperbaiki masalah dalam skrip mereka (e.g., meminta data dari dataset jarak jauh yang tidak dapat merespon sebelum waktu keluar) Sitemap Sitemap&lt;permintaanBlacklist&gt; di Andadatasets.xmlLogin (/docs/server-admin/datasets#requestblacklist) Sitemap

Dalam keadaan ekstrem,Javamungkin membekukan selama satu menit atau dua sementara itu melakukan koleksi sampah penuh, tetapi kemudian pulih. Jadi bagus untuk menunggu satu menit atau dua untuk melihat apakah Meme itJavaSitemapERDDAP™benar-benar beku atau jika itu hanya melakukan koleksi garbage panjang. (Jika pengumpulan sampah adalah masalah umum,[mengalokasikan lebih banyak memori untuk Tomcat](/docs/server-admin/deploy-install#memory)Sitemap) 

SitemapERDDAP™menjadi lambat atau membekukan dan masalah bukan pengguna yang bermasalah atau koleksi sampah yang panjang, Anda biasanya dapat memecahkan masalah dengan[LoginERDDAP™](#shut-down-and-restart)Sitemap Pengalaman saya adalahERDDAP™dapat berjalan selama berbulan-bulan tanpa perlu restart.
     

### Login{#monitor} 
Anda dapat memantau AndaERDDAPstatus dengan melihat Meme it[/erddap/status.htmlLogin](#status-page)Tidak ada statistik di bagian atas. SitemapERDDAP™menjadi lambat atau membekukan dan masalah tidak hanya penggunaan yang sangat berat, Anda biasanya dapat memecahkan masalah dengan[LoginERDDAP™](#shut-down-and-restart)Sitemap Ada metrik tambahan yang tersedia melalui integrasi Prometheus di /erddap / metrik.

Pengalaman saya adalahERDDAP™dapat berjalan selama berbulan-bulan tanpa perlu restart. Anda hanya perlu me-restart jika Anda ingin menerapkan beberapa perubahan yang Anda buatERDDAP's setup.xml atau ketika Anda perlu menginstal versi baru dariERDDAP™LoginJava, Tomcat, atau sistem operasi. Jika Anda perlu restartERDDAP™sering, sesuatu yang salah. Meme it Sitemap[ERDDAPLogin](#log)untuk mencoba mencari penyebab. Jika Anda tidak bisa, silakan masukkan detail dan lihat kami[bagian untuk mendapatkan dukungan tambahan](/docs/intro#support)Sitemap Sebagai solusi sementara, Anda mungkin mencoba menggunakan[Login](https://mmonit.com/monit/)untuk memantau AndaERDDAP™dan restart jika diperlukan. Atau, Anda bisa membuat pekerjaan tanaman untuk restartERDDAP™  (proaktif) Sitemap Mungkin sedikit menantang untuk menulis skrip untuk mengotomatisasi pemantauan dan restartERDDAPSitemap Beberapa tips yang mungkin membantu:

* Anda dapat menyederhanakan pengujian jika proses Tomcat masih berjalan dengan menggunakan sakelar -c dengan nat:
Login *Login Login*  |Login
Itu akan mengurangi output ke "1" jika proses tomcat masih hidup, atau "0" jika proses telah berhenti.
     
* Jika Anda baik dengan gawk, Anda dapat mengekstrak prosesID dari hasil
Login *Login Login*  |grep java, dan menggunakan prosesID di baris lain dari script.
     

Jika Anda mengatur pekerjaan Monit atau tanaman, itu bagus jika Anda dapat berbagi rincian sehingga orang lain bisa mendapatkan manfaat melihat kami[bagian untuk mendapatkan dukungan tambahan](/docs/intro#support)di mana Anda dapat berbagi. Meme it

#### Login{#permgen} 
Jika Anda berulang kali menggunakan Tomcat Manager untuk Reload (atau Berhenti dan Mulai)  ERDDAP™LoginERDDAP™mungkin gagal untuk memulai dan membuang java.lang. Login Solusinya secara berkala (atau setiap kali?)  [mematikan dan restart tomcat danERDDAP™](#shut-down-and-restart), bukan hanya reloadingERDDAPSitemap
\\[Sitemap Masalah ini sangat diminimalkan atau diperbaikiERDDAP™versi 1.24.\\]  
     
#### Login{#log} 
*    **[Login](#log)**   
SitemapERDDAP™tidak mulai atau jika sesuatu tidak bekerja seperti yang diharapkan, sangat berguna untuk melihat kesalahan dan pesan diagnostik diERDDAP™Login
    * File login *Login* WordPress.org
         ( *Login* ditentukan dalam[WordPress.org](/docs/server-admin/deploy-install#setupxml)) Sitemap Jika tidak ada log. txt file atau jika log. txt file belum diperbarui karena Anda restartERDDAP™Sitemap[Login](#tomcat-logs)untuk melihat apakah ada pesan kesalahan di sana. Meme it
    * Jenis pesan diagnostik dalam file log:
        * Kata "teror" digunakan ketika sesuatu pergi begitu salah bahwa prosedur gagal untuk menyelesaikan. Meskipun menjengkelkan untuk mendapatkan kesalahan, kesalahan memaksa Anda untuk menghadapi masalah. pemikiran kami adalah bahwa lebih baik untuk membuang kesalahan, daripada harusERDDAP™hobble sepanjang, bekerja dengan cara yang tidak Anda harapkan.
        * Kata "warning" digunakan ketika sesuatu yang salah, tetapi prosedurnya dapat diselesaikan. Ini cukup langka.
        * Apa pun yang lain hanyalah pesan informatif. Anda dapat mengontrol berapa banyak informasi yang login dengan [&lt;Login (/docs/server-admin/datasets#loglevel)  datasets.xmlSitemap
        * Beban dataset dan respons pengguna yang mengambil &gt; 10 detik untuk menyelesaikan (berhasil atau tidak berhasil) ditandai dengan " (Sitemap) Sitemap Dengan demikian, Anda dapat mencari file log.txt untuk frasa ini untuk menemukan dataset yang lambat untuk memuat ulang atau jumlah permintaan yang lambat selesai. Anda kemudian dapat melihat lebih tinggi dalam file log.txt untuk melihat apa masalah dataset atau apa permintaan pengguna dan siapa itu dari. Ini lambat dataset beban dan permintaan pengguna kadang-kadang pajak padaERDDAPSitemap Jadi tahu lebih banyak tentang permintaan ini dapat membantu Anda mengidentifikasi dan memecahkan masalah.
    * Informasi ditulis ke file log pada drive disk di chunks yang cukup besar. Keuntungannya adalah bahwa ini sangat efisien --ERDDAP™tidak akan pernah memblokir menunggu informasi yang akan ditulis ke file log. Kerugian adalah bahwa log akan hampir selalu berakhir dengan pesan parsial, yang tidak akan selesai sampai chunk berikutnya ditulis. Anda dapat membuatnya terbaru (Sitemap) dengan melihatERDDAP's status halaman web di https://*your.domain.org*/erddap/status.html   (Sitemaphttp://Sitemaphttpstidak diaktifkan) Sitemap
    * Ketika file log.txt sampai 20 MB,
file ini berganti nama. txt.previous dan file log.txt baru diciptakan. Jadi file log tidak menumpuk.
        
Dalam setup.xml, Anda dapat menentukan ukuran maksimum yang berbeda untuk file log, di MegaBytes. Minimum diperbolehkan adalah 1 (Login) Sitemap Maksimum diperbolehkan adalah 2000 (Login) Sitemap default adalah 20 (Login) Sitemap Contoh:
```
        <logMaxSizeMB>20</logMaxSizeMB>
```

    * Kapan pun Anda restartERDDAP™Login
        ERDDAP™membuat salinan arsip log.txt dan log. txt.previous file dengan cap waktu dalam nama file. Jika ada masalah sebelum restart, mungkin berguna untuk menganalisis file arsip ini untuk menggiling seperti apa masalahnya. Anda dapat menghapus file arsip jika tidak diperlukan lagi.
         
##### Login{#parsing-logtxt} 
ERDDAPLogin txt file tidak dirancang untuk parsing (meskipun Anda mungkin dapat membuat ekspresi rutin yang mengekstrak informasi yang diinginkan) Sitemap Ini dirancang untuk membantu manusia mengetahui apa yang salah ketika sesuatu yang salah. Ketika Anda menyerahkan bug atau laporan masalah untuk Meme itERDDAP™pengembang, bila memungkinkan, masukkan semua informasi dari file log.txt terkait dengan permintaan yang bermasalah.

Untuk alasan efisiensi,ERDDAP™hanya menulis informasi ke log. txt setelah sebagian besar informasi telah terakumulasi. Jadi jika Anda mengunjungi log. Meme it txt benar setelah kesalahan telah terjadi, informasi yang terkait dengan kesalahan mungkin belum telah ditulis ke log.txt. Untuk mendapatkan informasi terkini yang sempurna dari log.txt, kunjungi AndaERDDAPSitemap[status.html halaman](#status-page)Sitemap SitemapERDDAP™proses yang meminta, itu menyiram semua informasi pending untuk log.txt.

SitemapERDDAP™Statistik penggunaan, silakan gunakan[Apache dan / atau file log Tomcat](#tomcat-logs)SitemapERDDAP's login.txt. LoginERDDAPSitemap[status.html halaman](#status-page)  (Sitemap) Login[Laporan harian](#daily-report)  (Sitemap) memiliki sejumlah besar statistik penggunaan yang telah ditentukan untuk Anda.
    
### Login{#tomcat-logs} 
SitemapERDDAP™tidak mulai karena kesalahan terjadi sangat awalERDDAP's startup, pesan kesalahan akan muncul di file log Tomcat ( *Login* Login *Sitemap* Login *Login* WordPress.org) Sitemap[ERDDAPfile log.txt](#log)Sitemap

Statistik penggunaan: Untuk sebagian besar informasi yang ingin dikumpulkan orang dari file log (e.g., statistik penggunaan) , silakan gunakan file log Apache dan / atau Tomcat. Mereka diformat dengan baik dan memiliki jenis informasi. Ada banyak alat untuk menganalisis mereka, misalnya,[Login](https://www.awstats.org)Login[Kibana - Kibana](https://www.elastic.co/products/kibana)Sitemap[Login](https://jmeter.apache.org)tapi mencari web untuk menemukan alat yang tepat untuk tujuan Anda.

Perhatikan bahwa file log hanya mengidentifikasi pengguna sebagai alamat IP. Ada situs web untuk membantu Anda mendapatkan informasi yang terkait dengan alamat IP yang diberikan, misalnya,[Login](https://whatismyipaddress.com/ip-lookup)tetapi Anda biasanya tidak akan dapat menemukan nama pengguna.

Juga, karena[Login](https://en.wikipedia.org/wiki/Dynamic_Host_Configuration_Protocol)Alamat IP pengguna yang diberikan mungkin berbeda pada hari yang berbeda, atau pengguna yang berbeda mungkin memiliki alamat IP yang sama pada waktu yang berbeda.

Atau, Anda dapat menggunakan sesuatu seperti[Analisis Google](https://analytics.google.com/analytics/web/provision/?authuser=0#/provision)Sitemap Tapi waspada: ketika Anda menggunakan layanan eksternal seperti Google Analytics, Anda memberikan privasi pengguna Anda dengan memberikan akses penuh Google ke aktivitas mereka di situs Anda yang Google (dan orang lain?) dapat menjaga selamanya dan menggunakan untuk tujuan apa pun (mungkin tidak teknis, tetapi mungkin dalam praktek) Sitemap Pengguna Anda tidak menyetujui ini dan mungkin tidak menyadari bahwa mereka akan dilacak di situs web Anda, karena mereka mungkin tidak menyadari sejauh mereka dilacak di hampir semua situs web. Hari-hari ini, banyak pengguna sangat peduli bahwa semua yang mereka lakukan di web sedang dipantau oleh perusahaan besar ini (Google, Facebook, dll.) dan oleh pemerintah, dan menemukan intrusi yang tak terjalin ini ke dalam hidup mereka (di buku, 1984) Sitemap Ini telah mendorong banyak pengguna untuk menginstal produk seperti[Login](https://www.eff.org/privacybadger/faq)untuk meminimalkan pelacakan, untuk menggunakan browser alternatif seperti[Mozilla Firefox](https://www.torproject.org/)  (atau mematikan pelacakan di browser tradisional) , dan untuk menggunakan mesin pencari alternatif seperti[Bebek Duck](https://duckduckgo.com/)Sitemap Jika Anda menggunakan layanan seperti Google Analytics, silakan setidaknya dokumen penggunaannya dan konsekuensinya dengan mengubah&lt;standarPrivacyPolicy&gt; tag diERDDAPSitemap
\\[Login\\]/webapps/erddap/WEB-INF/classes/gov/noa/pfel/erddap/util/messages.xml file.
    
### Login{#e-mail-log} 
*    **EmailLogYEAR-MM-DD.txt**   
    ERDDAP™selalu menulis teks dari semua pesan email keluar di email hari ini Login *Login* Login ( *Login* ditentukan dalam[WordPress.org](/docs/server-admin/deploy-install#setupxml)) Sitemap
    * Jika server tidak dapat mengirim pesan email, atau jika Anda telah dikonfigurasiERDDAP™tidak mengirim pesan email, atau jika Anda hanya penasaran, file ini adalah cara yang mudah untuk melihat semua pesan email yang telah dikirim.
    * Anda dapat menghapus file log email hari sebelumnya jika tidak diperlukan lagi.
         
### Laporan harian{#daily-report} 
Laporan Harian memiliki banyak informasi yang berguna -- semua informasi dari AndaERDDAPSitemap[/erddap/status.htmlLogin](#status-page)Sitemap
    * Ini adalah ringkasan yang paling lengkap dari AndaERDDAPLogin
    * Di antara statistik lain, termasuk daftar dataset yang tidak memuat dan pengecualian yang dihasilkan.
    * Ini dihasilkan ketika Anda mulaiERDDAP™  (SitemapERDDAP™selesai mencoba untuk memuat semua dataset) dan dihasilkan segera setelah 7 pagi waktu setempat setiap pagi.
    * Kapan pun dihasilkan, itu ditulis untuk[ERDDAPfile log.txt](#log)Sitemap
    * Kapan pun dihasilkan, email ke&lt;Sitemap&lt;Login Sitemap (yang ditentukan dalam[WordPress.org](/docs/server-admin/deploy-install#setupxml)) disediakan Anda telah mengatur sistem email (di setup.xml) Sitemap

### Login{#status-page} 
Anda dapat melihat statusERDDAP™dari setiap browser dengan pergi ke Meme it&lt;Login/erddap/status.html
* Halaman ini dihasilkan secara dinamis, sehingga selalu memiliki statistik up-to-the-moment untuk AndaERDDAPSitemap
* Ini termasuk statistik mengenai jumlah permintaan, penggunaan memori, jejak tumpukan benang, tugasThread, dll.
* Karena halaman Status dapat dilihat oleh siapa pun, tidak mencakup cukup banyak informasi sebagai[Laporan harian](#daily-report)Sitemap
         
### Menambahkan / Mengubah Dataset{#addingchanging-datasets} 
ERDDAP™biasanya dibacadatasets.xmlSitemap *Login*   (ditentukan dalam[WordPress.org](/docs/server-admin/deploy-install#setupxml)) Sitemap Jadi Anda dapat melakukan perubahandatasets.xmlsetiap saat, meskipunERDDAP™berjalan.
Dataset baru akan terdeteksi segera, biasanya dalam *Login* Sitemap
Dataset berubah akan diisi ulang ketika itu *Login* Login (sebagaimana ditentukandatasets.xml) Sitemap
    
#### Login{#flag} 
*    **[File Bendera](#flag)LoginERDDAP™Mencoba Mengembalikan Dataset Sebagai Soon Seperti Mungkin** 
    
    *   ERDDAP™tidak akan melihat perubahan pada pengaturan dataset dalamdatasets.xmlSitemapERDDAP™isi ulang dataset.
         
    * SitemapERDDAP™untuk memuat ulang dataset sesegera mungkin (karena dataset&lt;reloadEveryNMinutes&gt; akan menyebabkannya dimuat kembali), masukkan file dalam *Login* Login ( *Login* ditentukan dalam[WordPress.org](/docs/server-admin/deploy-install#setupxml)) yang memiliki nama yang sama dengan datasetdatasetIDSitemap
SitemapERDDAP™untuk mencoba untuk memuat ulang dataset ASAP.
Versi lama dari dataset akan tetap tersedia untuk pengguna sampai versi baru tersedia dan ditukarkan secara atom ke tempat.
SitemapEDDGridDari File dan EDDTable DariFiles, dataset reloading akan mencari file baru atau berubah, membaca mereka, dan menggabungkannya ke dalam dataset. Jadi waktu untuk memuat ulang tergantung pada jumlah file baru atau berubah.
Jika dataset telah aktif="false",ERDDAP™akan menghapus dataset.
         
##### File Folder{#bad-files-flag} 
* Salah satu varian direktori /flag adalah direktori /badFilesFlag. (SitemapERDDAP™v2.12.)   
Jika Anda menempatkan file di Meme it *Login* /badsFlag direktori dengandatasetIDsebagai nama file (konten file tidak masalah) SitemapERDDAP™Login file bendera,ERDDAP™Sitemap
    
    1. Hapus file badsFlag.
    2. Hapus File bads.ncLogin (jika ada satu) , yang memiliki daftar file buruk untuk dataset tersebut.
Untuk dataset sepertiEDDGridSideBySide yang memiliki sonDatasets, ini juga menghapus badFiles.ncfile untuk semua dataset anak.
    3. Muat ulang dataset ASAP.
    
Dengan demikian, penyebab iniERDDAP™untuk mencoba lagi untuk bekerja dengan file sebelumnya (Sitemap) ditandai sebagai buruk.
         
##### Bendera keras{#hard-flag} 
* Varietas lain dari direktori /flag adalah direktori /hardFlag. (SitemapERDDAP™g)   
Jika Anda menempatkan file di *Login* /hardFlag dengandatasetIDsebagai nama file (konten file tidak masalah) SitemapERDDAP™melihat keras file bendera,ERDDAP™Sitemap
    
    1. Hapus file hardFlag.
    2. Hapus dataset dariERDDAPSitemap
    3. Hapus semua informasi yangERDDAP™dataset
SitemapEDDGridDari File dan EDDTable Dari Files subclasses, ini menghapus database internal file data dan konten mereka.
Untuk dataset sepertiEDDGridSideBySide yang memiliki dataset anak, ini juga menghapus database internal file data dan konten mereka untuk semua dataset anak.
    4. Muat ulang dataset.
SitemapEDDGridDari File dan EDDTable Dari subklas Files, penyebab iniERDDAP™Login **Sitemap** dari file data. Dengan demikian, waktu reload tergantung pada jumlah total file data dalam dataset. Karena dataset dihapus dariERDDAP™ketika hardFlag dipandang, dataset akan tidak tersedia sampai dataset selesai reloading. Promo Sitemap[Login](#log)file jika Anda ingin melihat apa yang terjadi. Meme it
    
Varietas hardFlag menghapus informasi disimpan dataset bahkan jika dataset tidak saat ini dimuatERDDAPSitemap
    
Login Bendera sangat berguna ketika Anda melakukan sesuatu yang menyebabkan perubahan dalam bagaimanaERDDAP™membaca dan menafsirkan data sumber, misalnya, ketika Anda menginstal versi baru dariERDDAP™atau ketika Anda telah membuat perubahan pada definisi datasetdatasets.xml
    
* Isi bendera, file badFilesFlag, dan hardFlag tidak relevan.ERDDAP™hanya melihat nama file untuk mendapatkan Meme itdatasetIDSitemap
     
* Di antara reload dataset utama,ERDDAP™terlihat terus menerus untuk file bendera, badFilesFlag, dan hardFlag.
     
* Perhatikan bahwa ketika dataset diisi ulang, semua file di Meme it *Login* Sitemap[Login](#cached-responses)Sitemap *datasetID* direktori dihapus. Ini termasuk.ncdan file gambar yang biasanya disimpan selama ~ 15 menit.
     
* Catatan bahwa jika xml dataset termasuk[aktif="false"](/docs/server-admin/datasets#active), bendera akan menyebabkan dataset dibuat tidak aktif (jika aktif) , dan dalam kasus apapun, tidak dimuat kembali.
     
* SitemapERDDAP™menjalankan LoadDatasets untuk melakukan reload utama (reload timed dikendalikan oleh&lt;loadDatasetMinutes&gt;) atau reload kecil (sebagai akibat dari bendera eksternal atau internal) LoginERDDAP™baca semua&lt;dekompressedCacheMaxGB&gt;,&lt;decompressedCacheMaxMinutesOld&gt;,&lt;Login&lt;Login&lt;Login&lt;berlanggananEmailBlacklist&gt; tag dan beralih ke pengaturan baru. Jadi Anda dapat menggunakan bendera sebagai cara untuk mendapatkan Meme itERDDAP™untuk melihat perubahan pada tag ASAP.

##### Mengatur Bendera Dataset{#set-dataset-flag} 
*  ERDDAP™memiliki layanan web sehingga bendera dapat diatur melalui URL.
    
    * Sitemap
         https://coastwatch.pfeg.noaa.gov/erddap/setDatasetFlag.txt?datasetID=rPmelTao&flagKey=123456789   
         (itu bendera palsu Login) akan mengatur bendera dataset rPmelTao.
    * Ada flagKey yang berbeda untuk setiapdatasetIDSitemap
    * Administrator dapat melihat daftar URL bendera untuk semua dataset dengan melihat bagian bawah dari mereka[Laporan harian](#daily-report)Sitemap
    * Administrator harus memperlakukan URL ini sebagai rahasia, karena mereka memberi seseorang hak untuk mengatur ulang data yang akan.
    * Jika Anda berpikir flagKeys telah jatuh ke tangan seseorang yang menyalahgunakan mereka, Anda dapat mengubah&lt;flagKeyKey&gt; di[WordPress.org](/docs/server-admin/deploy-install#setupxml)dan restartERDDAPkekuatanERDDAP™untuk menghasilkan dan menggunakan set yang berbeda dari flagKeys.
    * Jika Anda berubah&lt;flagKey&gt;, hapus semua langganan lama (lihat daftar dalam Laporan Harian Anda) dan ingat untuk mengirim URL baru kepada orang-orang yang ingin Anda miliki.
    
Sistem bendera dapat berfungsi sebagai dasar untuk mekanisme yang lebih efisien untuk memberi tahuERDDAP™saat mengisi ulang dataset. Misalnya, Anda bisa mengatur dataset&lt;reloadEveryNMinutes&gt; untuk sejumlah besar (10080 = 1 minggu) Sitemap Kemudian, ketika Anda tahu dataset telah berubah (mungkin karena Anda menambahkan file ke direktori dataset) menetapkan bendera sehingga dataset diisi ulang sesegera mungkin. Bendera biasanya terlihat cepat. Tetapi jika benang LoadDatasets sudah sibuk, mungkin saat sebelum tersedia untuk bertindak di bendera. Tapi sistem bendera jauh lebih responsif dan jauh lebih efisien daripada pengaturan&lt;reloadEveryNMinutes&gt; untuk nomor kecil.
    
#### Menghapus Dataset{#removing-datasets} 
Jika dataset aktifERDDAP™dan Anda ingin menonaktifkannya sementara atau permanen:
1. Sitemapdatasets.xmluntuk dataset, set[aktif="false"](/docs/server-admin/datasets#active)dalam tag dataset.
2. LoginERDDAP™untuk menghapus dataset selama reload utama berikutnya atau[set bendera](#flag)untuk dataset untuk memberitahukanERDDAP™untuk melihat perubahan ini sesegera mungkin. Ketika Anda melakukan ini,ERDDAP™tidak membuang informasi apa pun yang dapat disimpan tentang dataset dan tentu tidak melakukan apa pun pada data aktual.
3. Kemudian Anda dapat meninggalkan dataset="false" aktif didatasets.xmlatau menghapusnya.
         
#### Kapan Dataset Reloaded?{#when-are-datasets-reloaded} 
Sebuah benang yang disebut RunLoadDatasets adalah benang master yang mengontrol ketika dataset diisi ulang. Login Dataset loop selamanya:

1. RunLoadDataset mencatat waktu saat ini.
2. RunLoadDataset memulai benang LoadDatasets untuk melakukan "majorLoad". Anda dapat melihat informasi tentang beban utama saat ini/previous di bagian atas AndaERDDAPSitemap
    [/erddap/status.htmlLogin](#status-page)  (Sitemap[contoh halaman status](https://coastwatch.pfeg.noaa.gov/erddap/status.html)) Sitemap
    
    1. LoadDataset membuat salinandatasets.xmlSitemap
    2. LoadDataset membaca melalui salinandatasets.xmldan, untuk setiap dataset, melihat apakah dataset perlu (Sitemap) dimuat atau dihapus.
        * Sitemap[Login](#flag)file ada untuk dataset ini, file dihapus dan dataset dihapus jika aktif="false" atau (Sitemap) dimuat jika aktif="true" (terlepas dari usia dataset) Sitemap
        * Jika dataset dataset.xml chunk telah aktif="false" dan dataset saat ini dimuat (Sitemap) , dibongkar (Sitemap) Sitemap
        * Jika dataset telah aktif="true" dan dataset belum dimuat, dimuat.
        * Jika dataset telah aktif="true" dan dataset sudah dimuat, set data diisi ulang jika usia dataset (waktu sejak beban terakhir) lebih besar dari&lt;Login Login (default = 10080 menit) , jika tidak, dataset tersisa saja.
    3. BebanDataset selesai.
    
Benang RunLoadDatasets menunggu benang LoadDatasets untuk selesai. Jika LoadDataset membutuhkan lebih lama dari loadDataset Login (seperti yang ditentukan dalam setup.xml) , RunLoadDataset mengganggu benang LoadDatasets. Idealnya, LoadDatasets melihat gangguan dan selesai. Tapi jika tidak melihat gangguan dalam satu menit, RunLoadDatasets panggilan loadDataset. Login () , yang tidak diinginkan.
3. Sementara waktu sejak awal dari beban utama terakhir kurang dari loadDataset Login (seperti yang ditentukan dalam setup.xml, misalnya, 15 menit) , RunLoadDatasets berulang kali mencari[Login](#flag)file dalam *Login* Catalog Jika satu atau lebih file bendera ditemukan, mereka dihapus, dan RunLoadDatasets memulai benang LoadDatasets untuk melakukan "minorLoad" (Login) Sitemap Anda tidak dapat melihat informasi minorLoad pada AndaERDDAPSitemap[/erddap/status.htmlLogin](#status-page)Sitemap
    1. LoadDataset membuat salinandatasets.xmlSitemap
    2. LoadDataset membaca melalui salinandatasets.xmldan, untuk setiap dataset yang ada file bendera:
        * Jika dataset dataset.xml chunk telah aktif="false" dan dataset saat ini dimuat (Sitemap) , dibongkar (Sitemap) Sitemap
        * Jika dataset telah aktif="true", dataset (Sitemap) dimuat, terlepas dari usianya. Dataset yang tidak terbakar diabaikan.
    3. BebanDataset selesai.
4. Login Dataset kembali ke langkah 1.

Catatan:
* Login
Ketika Anda restartERDDAP™, setiap dataset dengan aktif="true" dimuat.
* Login
Ketika dataset adalah (Sitemap) dimuat, cachenya (termasuk file respons data dan / atau file gambar) dikosongkan.
* Database
Jika Anda memiliki banyak dataset dan/atau satu atau lebih dataset lambat (Sitemap) beban, benang LoadDatasets dapat memakan waktu lama untuk menyelesaikan pekerjaannya, mungkin bahkan lebih lama dari loadDatasets Login
* Satu LoadDataset Thread
Tidak ada lagi dari satu benang LoadDatasets berjalan sekaligus. Jika bendera ditetapkan ketika LoadDatasets sudah berjalan, bendera mungkin tidak akan terlihat atau bertindak sampai selesai benang LoadDatasets berjalan. Anda mungkin mengatakan: "That's stupid. Mengapa Anda tidak hanya memulai sekelompok benang baru untuk memuat dataset?" Tetapi jika Anda memiliki banyak dataset yang mendapatkan data dari satu server jarak jauh, bahkan satu benang LoadDatasets akan menempatkan stres substansial pada server jarak jauh. Hal yang sama berlaku jika Anda memiliki banyak dataset yang mendapatkan data dari file pada satu RAID. Ada pengembalian berkurang dengan cepat dari memiliki lebih dari satu benang LoadDatasets.
* Bendera = ASAP
Menyiapkan bendera hanya menandakan bahwa dataset harus (Sitemap) dimuat sesegera mungkin, tidak selalu segera. Jika tidak ada benang LoadDatasets saat ini berjalan, dataset akan mulai diisi ulang dalam beberapa detik. Tetapi jika benang LoadDatasets saat ini berjalan, dataset mungkin tidak akan diisi ulang sampai setelah benang LoadDatasets selesai.
* File Bendera Dihapus
Secara umum, jika Anda menempatkan file bendera di *Login* WordPress.org (dengan mengunjungi bendera dataset atau menempatkan file aktual di sana) Dataset biasanya akan dimuat kembali segera setelah file bendera dihapus.
* Bendera versus Beban kecil Login
Jika Anda memiliki beberapa cara eksternal untuk mengetahui ketika dataset perlu diisi ulang dan jika nyaman bagi Anda, cara terbaik untuk memastikan bahwa dataset selalu up-to-date adalah untuk mengatur ulangnya SetiapNMinutes ke sejumlah besar (100 g) dan set bendera (melalui script?) setiap kali perlu diisi ulang. Itu adalah sistem yang Meme itEDDGridDariErddap dan EDDTableDariErddap menggunakan menerima pesan bahwa dataset perlu diisi ulang.
* Login
Banyak informasi yang relevan ditulis ke *Login* /logs/log.txt Jika hal tidak bekerja seperti yang Anda harapkan, cari log. txt memungkinkan Anda mendiagnosis masalah dengan mengetahui persis apaERDDAP™Login
    
    * Cari "majorLoad=true" untuk awal benang LoadDataset utama.
    * Cari "majorLoad=false" untuk awal benang LoadDatasets minor.
    * Cari dataset yang diberikandatasetIDuntuk informasi tentang hal itu (Sitemap) Sitemap
        
          
         
#### Tanggapan Cached{#cached-responses} 
Secara umumERDDAP™tidak ada cache (Login) tanggapan atas permintaan pengguna. rasional adalah bahwa sebagian besar permintaan akan sedikit berbeda sehingga cache tidak akan sangat efektif. Pengecualian terbesar adalah permintaan untuk file gambar (yang tersimpan sejak browser dan program-program sepertiGoogle Earthseringkali re-pertanyaan gambar) dan permintaan.ncLogin (karena mereka tidak dapat diciptakan di atas) SitemapERDDAP™menyimpan setiap file cache dataset di direktori yang berbeda: *Login* Login *datasetID* karena satu direktori cache mungkin memiliki sejumlah besar file yang mungkin menjadi lambat untuk mengakses.
File dihapus dari cache untuk salah satu dari tiga alasan:
* Semua file cache ini dihapus ketika Meme itERDDAP™direstart.
* Secara berkala, setiap file lebih dari&lt;cacheMinutes&gt; tua (sebagaimana ditentukan[WordPress.org](/docs/server-admin/deploy-install#setupxml)) akan dihapus. Menghapus file dalam cache berdasarkan usia (bukan Least-Recently-Used) memastikan bahwa file tidak akan tinggal di cache sangat panjang. Meskipun mungkin tampak seperti permintaan yang diberikan harus selalu mengembalikan respon yang sama, itu tidak benar. Misalnya, contohtabledappermintaan yang mencakup & waktu&gt; *Sitemap Sitemap* akan berubah jika data baru tiba untuk dataset. Dan permintaan griddap yang mencakup\\[Sitemap\\]untuk dimensi waktu akan berubah jika data baru tiba untuk dataset.
* Gambar yang menunjukkan kondisi kesalahan yang tersimpan, tetapi hanya untuk beberapa menit (itu situasi yang sulit) Sitemap
* Setiap kali dataset diisi ulang, semua file dalam cache dataset dihapus. Karena permintaan mungkin untuk Meme it"last"indeks dalam dataset gridded, file dalam cache dapat menjadi tidak valid ketika dataset diisi ulang.
         
#### Database{#stored-dataset-information} 
Untuk semua jenis dataset,ERDDAP™mengumpulkan banyak informasi ketika dataset dimuat dan menjaga memori. Hal ini memungkinkanERDDAP™untuk menanggapi dengan sangat cepat untuk mencari, permintaan untuk daftar dataset, dan permintaan informasi tentang dataset.

Untuk beberapa jenis dataset (SitemapEDDGridWordPress.orgEDDGridSitemap *Login* File, dan EDDTableDari *Login* Login) LoginERDDAP™menyimpan pada disk beberapa informasi tentang dataset yang digunakan kembali ketika dataset dimuat kembali. Ini sangat mempercepat proses reloading.

* Beberapa file informasi dataset dapat dibaca manusia.jsonfile dan disimpan dalam *Login* Login *SitemapdatasetID* Sitemap
*   ERDDAP™hanya menghapus file ini dalam situasi yang tidak biasa, misalnya, jika Anda menambahkan atau menghapus variabel dari datasetdatasets.xmlLogin
* Kebanyakan perubahan pada datasetdatasets.xmlLogin (misalnya, mengubah atribut global atau atribut variabel) Anda tidak perlu menghapus file ini. Meme it Reload dataset reguler akan menangani jenis perubahan ini. Anda dapat memberitahukanERDDAP™untuk memuat ulang ASAP dataset dengan mengatur[Login](#flag)dataset.
* Demikian pula, penambahan, penghapusan, atau perubahan file data akan ditangani ketikaERDDAP™memuat ulang dataset. LoginERDDAP™akan melihat jenis perubahan segera dan otomatis jika dataset menggunakan [&lt;Login (/docs/server-admin/dataset#updateeverynmillis) sistem.
* Perlu hanya jarang diperlukan untuk menghapus file ini. Situasi paling umum di mana Anda perlu memaksa Meme itERDDAP™menghapus informasi yang tersimpan (karena itu tidak benar-benar / tidak akan secara otomatis diperbaikiERDDAP) adalah ketika Anda melakukan perubahan pada datasetdatasets.xmlchunk yang mempengaruhi bagaimanaERDDAP™menafsirkan data dalam file data sumber, misalnya, mengubah string format variabel waktu.
* Untuk menghapus file informasi tersimpan dataset dariERDDAP™yang berjalan (bahkan jika dataset tidak saat ini dimuat) Sitemap[Login Login](#hard-flag)dataset. Ingat bahwa jika dataset adalah agregasi sejumlah besar file, mengisi ulang dataset dapat memakan waktu yang cukup.
* Untuk menghapus file informasi disimpan dataset ketika menghapus file informasi datasetERDDAP™tidak berjalan, berjalan[Login](/docs/server-admin/datasets#dasdds)dataset (yang lebih mudah daripada mencari di direktori mana info terletak dan menghapus file dengan tangan) Sitemap Ingat bahwa jika dataset adalah agregasi sejumlah besar file, mengisi ulang dataset dapat memakan waktu yang cukup.
         
### Status Memori{#memory-status} 
ERDDAP™seharusnya tidak pernah crash atau membekukan. Jika tidak, salah satu penyebab yang paling mungkin tidak mencukupi memori. Anda dapat memantau penggunaan memori dengan melihat status.html halaman web, yang mencakup garis seperti

0 gc panggilan, 0 permintaan gudang, dan 0 berbahaya MemoryEmails sejak lama besar LoadDatasets

 (peristiwa yang lebih serius)   
dan MB inUse dan kolom panggilan gc di tabel statistik. Anda dapat memberi tahu bagaimana mengencangkan memori AndaERDDAP™adalah dengan melihat angka ini. Nomor lebih tinggi menunjukkan lebih banyak stres.

* MB inUse harus selalu kurang dari setengah dari[Pengaturan memori \\-Xmx](/docs/server-admin/deploy-install#memory)Sitemap Jumlah yang lebih besar adalah tanda yang buruk.
* panggilan gc menunjukkan jumlah kaliERDDAP™disebut kolektor sampah untuk mencoba untuk mengurangi penggunaan memori tinggi. Jika ini akan menjadi &gt; 100, itulah tanda masalah serius.
* shed menunjukkan jumlah permintaan masuk yang gudang (dengan nomor kesalahan HTTP 503, Layanan Tidak tersedia) karena penggunaan memori sudah terlalu tinggi. Idealnya, tidak ada permintaan yang harus disembuhkan. Tidak apa-apa jika beberapa permintaan gudang, tetapi tanda masalah serius jika banyak gudang.
* Login MemoryEmails - Jika penggunaan memori menjadi berbahaya tinggi,ERDDAP™mengirim email ke alamat email yang tercantum dalam&lt;Login Sitemap (di setup.xml) dengan daftar permintaan pengguna aktif. Sebagai email mengatakan, ke depan email ini ke Chris. John di noaaa. gov sehingga kami dapat menggunakan informasi untuk meningkatkan versi masa depan dariERDDAPSitemap
     

SitemapERDDAP™ditekan memori:
* Pertimbangkan mengalokasikan lebih banyak memori server Anda untukERDDAP™dengan mengubah Tomcat[Pengaturan memori ‐Xmx](/docs/server-admin/deploy-install#memory)Sitemap
* Jika Anda sudah dialokasikan sebanyak memori yang bisa Anda lakukanERDDAP™melalui -Xmx, pertimbangkan membeli lebih banyak memori untuk server Anda. Memori murah (dibandingkan dengan harga server baru atau waktu Anda) Sitemap Promo
* Sitemapdatasets.xmlSitemap&lt;nGridThreads&gt; untuk 1, set&lt;nTableThreads&gt; untuk 1, dan set&lt;Login
* Lihat permintaan di log.txt untuk inefisien atau bermasalah (tapi sah) Sitemap Tambahkan alamat IP mereka untuk&lt;Login Sitemapdatasets.xmlSitemap Pesan kesalahan daftar hitam termasukERDDAP™alamat email administrator dengan harapan bahwa pengguna akan menghubungi Anda sehingga Anda dapat bekerja dengan mereka untuk menggunakanERDDAP™lebih efisien. Ini bagus untuk menyimpan daftar alamat IP Anda daftar hitam dan mengapa, sehingga Anda dapat bekerja dengan pengguna jika mereka menghubungi Anda.
* Lihat permintaan di log.txt untuk permintaan dari pengguna jahat. Tambahkan alamat IP mereka ke&lt;Login Sitemapdatasets.xmlSitemap Jika permintaan serupa berasal dari beberapa alamat IP serupa, Anda dapat menggunakan beberapa layanan yang-is (Login[ https://www.whois.com/whois/ ](https://www.whois.com/whois/)) untuk mengetahui berbagai alamat IP dari sumber itu dan daftar hitam seluruh jangkauan. Sitemap&lt;Login (/docs/server-admin/datasets#requestblacklist) Sitemap
         
#### Login{#outofmemoryerror} 
Ketika Anda mengaturERDDAP™Anda menentukan jumlah memori maksimum yangJavadapat menggunakan melalui[Pengaturan \\-Xmx](/docs/server-admin/deploy-install#memory)Sitemap SitemapERDDAP™pernah membutuhkan lebih banyak memori daripada itu, itu akan membuang java. Meme it Login LoginERDDAP™melakukan banyak pemeriksaan untuk mengaktifkannya untuk menangani kesalahan dengan anggun (misalnya, jadi permintaan yang kesulitan akan gagal, tetapi sistem mempertahankan integritasnya) Sitemap Tapi kadang-kadang, kesalahan kerusakan integritas sistem dan Anda harus restartERDDAPSitemap Mudah-mudahan, yang jarang.

Solusi cepat dan mudah untuk OutOfMemoryError adalah untuk meningkatkan[Pengaturan \\-Xmx](/docs/server-admin/deploy-install#memory)Tapi Anda tidak boleh meningkatkan pengaturan -Xmx ke lebih dari 80% memori fisik di server (e.g., untuk server 10GB, jangan set -Xmx di atas 8GB) Sitemap Memori relatif murah, sehingga mungkin menjadi pilihan yang baik untuk meningkatkan memori di server. Tetapi jika Anda telah memaksimalkan memori di server atau karena alasan lain tidak dapat meningkatkannya, Anda perlu menangani lebih langsung dengan penyebab OutOfMemoryError.

Jika Anda melihat[Login](#log)file untuk melihat apaERDDAP™dilakukan ketika kesalahan muncul, Anda biasanya bisa mendapatkan petunjuk yang baik seperti penyebab OutOfMemoryError. Ada banyak penyebab yang mungkin, termasuk:

* Sebuah file data besar tunggal dapat menyebabkan OutOfMemoryError, terutama, file data ASCII besar. Jika ini adalah masalah, itu harus jelas karena Meme itERDDAP™akan gagal untuk memuat dataset (untuk set data tabel) atau membaca data dari file tersebut (untuk dataset gridded) Sitemap Solusinya, jika layak, adalah membagi file ke beberapa file. Idealnya, Anda dapat membagi file menjadi chunks logis. Misalnya, jika file memiliki 20 bulan bernilai data, membaginya menjadi 20 file, masing-masing dengan 1 bulan bernilai data. Tapi ada kelebihan bahkan jika file utama dibagi sewenang-wenang. Pendekatan ini memiliki beberapa manfaat: a) Ini akan mengurangi memori yang diperlukan untuk membaca file data ke 1 / 20th, karena hanya satu file dibaca pada waktu. g Sering,ERDDAP™dapat menangani permintaan lebih cepat karena hanya perlu melihat dalam satu atau beberapa file untuk menemukan data untuk permintaan yang diberikan. g Jika pengumpulan data sedang berlangsung, maka 20 file yang ada dapat tetap tidak berubah, dan Anda hanya perlu memodifikasi satu, file kecil, baru untuk menambahkan sepadan bulan berikutnya data ke dataset.
* Satu permintaan besar dapat menyebabkan OutOfMemoryError. Secara khusus, beberapaorderByopsi memiliki seluruh respons dalam memori untuk detik (misalnya, untuk melakukan semacam) Sitemap Jika respon besar, itu dapat menyebabkan kesalahan. Akan ada beberapa permintaan yang, dengan berbagai cara, terlalu besar. Anda dapat memecahkan masalah dengan meningkatkan pengaturan -Xmx. Atau, Anda dapat mendorong pengguna untuk membuat serangkaian permintaan yang lebih kecil.
* Tidak mungkin bahwa sejumlah besar file akan menyebabkan indeks file yangERDDAP™membuat begitu besar bahwa file akan menyebabkan kesalahan. Jika kita menganggap bahwa setiap file menggunakan 300 byte, maka 1,000,000 file hanya akan mengambil 300MB. Tapi dataset dengan sejumlah besar file data menyebabkan masalah lain untukERDDAPtidak bisa, butuh waktu yang lama untuk Meme itERDDAP™untuk membuka semua file data tersebut ketika menanggapi permintaan pengguna untuk data. Dalam hal ini, solusi dapat mengatur file sehingga ada beberapa file data. Untuk dataset tabular, seringkali bagus jika Anda menyimpan data dari dataset saat ini[Login Sitemap (Login) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Bertindak file data Array (Sitemap.ncfile CF dariERDDAP) dan kemudian membuat dataset baru. File ini dapat ditangani dengan sangat efisien denganERDDAPSitemap[Sitemap](/docs/server-admin/datasets#eddtablefromnccffiles)Sitemap Jika mereka diatur secara logis (setiap data untuk chunk ruang dan waktu) LoginERDDAP™dapat mengekstrak data dari mereka dengan sangat cepat.
* Untuk dataset tabular yang menggunakan [&lt;subsetVariablesSitemap (/docs/server-admin/datasets#subsetvariables) atribut,ERDDAP™membuat tabel kombinasi unik dari nilai-nilai variabel tersebut. Untuk dataset besar atau ketika&lt;subsetVariables&gt; disalahpahamkan, tabel ini bisa cukup besar untuk menyebabkan OutOfMemoryErrors. Solusinya adalah menghapus variabel dari daftar daftar&lt;subsetVariables&gt; yang ada sejumlah besar nilai, atau menghapus variabel sesuai kebutuhan sampai ukuran tabel itu masuk akal. BagianERDDAP™yang menggunakansubsetVariablessistem tidak bekerja dengan baik (e.g., halaman web memuat sangat lambat) ketika ada lebih dari 100.000 baris di tabel itu.
* Ini selalu mungkin bahwa beberapa permintaan besar simultan (benar-benar sibukERDDAP) dapat menggabungkan untuk menyebabkan masalah memori. Misalnya, 8 permintaan, masing-masing menggunakan 1GB masing-masing, akan menyebabkan masalah untuk setup -Xmx=8GB. Tapi jarang bahwa setiap permintaan akan berada di puncak penggunaan memorinya secara bersamaan. Dan Anda akan dengan mudah dapat melihat Meme itERDDAP™benar-benar sibuk dengan permintaan besar. Tapi, mungkin. Meme it Ini sulit untuk berurusan dengan masalah ini selain dengan meningkatkan pengaturan -Xmx.
* Ada skenario lain. Jika Anda melihat[Login](#log)file untuk melihat apaERDDAP™dilakukan ketika kesalahan muncul, Anda biasanya bisa mendapatkan petunjuk yang baik seperti penyebabnya. Dalam kebanyakan kasus, ada cara untuk meminimalkan masalah itu (lihat di atas) Tapi kadang-kadang Anda hanya perlu lebih banyak memori dan pengaturan xmx yang lebih tinggi.
         
### Too Banyak File Terbuka{#too-many-open-files} 
SitemapERDDAP™v2.12,ERDDAP™memiliki sistem untuk memantau jumlah file terbuka (yang mencakup soket dan beberapa hal lain, tidak hanya file) di Tomcat di komputer Linux. Jika beberapa file tidak pernah ditutup (Sebuah "kebocoran sumber daya") , jumlah file terbuka dapat meningkat sampai melebihi maksimum diperbolehkan oleh sistem operasi dan banyak hal yang benar-benar buruk terjadi. Sekarang, di komputer Linux (karena informasi tidak tersedia untuk Windows) Sitemap

* Ada kolom "Open File" di sebelah kanan status.html halaman web menunjukkan persen dari file maks terbuka. Di Windows, itu hanya menunjukkan "?".
* SitemapERDDAP™menghasilkan informasi pada akhir setiap reload dataset utama, itu akan mencetak log. txt file:
openFileCount= *Sitemap* di max= *Login* Sitemap *Sitemap* 
* Jika persentasenya adalah &gt;50%, email dikirim keERDDAP™administrator dan email Sitemap Untuk alamat email.

Jika persentase 100%,ERDDAP™adalah dalam masalah yang mengerikan. Jangan biarkan ini terjadi. Meme it
Jika persentasenya adalah &gt; 75%,ERDDAP™dekat dengan masalah yang mengerikan. Itu tidak oke. Meme it
Jika persentase adalah &gt;50%, sangat mungkin bahwa lonjakan akan menyebabkan persentase untuk mencapai 100.
Jika persentase yang pernah &gt;50%, Anda harus:
* Meningkatkan jumlah maksimum file terbuka yang diperbolehkan oleh keduanya:
    * Membuat perubahan ini setiap kali sebelum Anda mulai kemcat (menempatkan mereka di file Tomcat startup.sh?) Sitemap
aneh -Hn 16384
ulimit -Sn 16384
    * Atau membuat perubahan permanen dengan mengedit (sebagai akar) /etc/security/limits.conf dan menambahkan garis:
tomcat nofile lembut 16384
tomcat keras nofile 16384
Perintah tersebut menganggap bahwa pengguna menjalankan Tomcat disebut "tomcat".
Banyak varian Linux, Anda harus me-restart server untuk menerapkan perubahan tersebut. Untuk kedua pilihan, "16384" di atas adalah contoh. Anda memilih nomor yang Anda pikirkan terbaik.
* LoginERDDAPSitemap Sistem operasi akan menutup file terbuka.
         
### Permintaan yang gagal{#failed-requests} 
*    **Aktivitas Tidak Biasa: &gt; 25% permintaan gagal**   
Sebagai bagian dari setiap reloadDataset, yang biasanya setiap 15 menit,ERDDAP™terlihat pada persentase permintaan yang gagal sejak reloadDataset terakhir. Jika itu &gt; 25%,ERDDAP™mengirim email ke Meme itERDDAP™administrator dengan subjek "Kegiatan Tidak Biasa: &gt; 25% permintaan gagal". Email itu termasuk secara tally dekat bagian bawah berjudul "Pertanyaan Alamat IP (Login)   (sejak akhir besar loaddataset) Sitemap Sitemap Ini memberi tahu Anda alamat IP komputer yang membuat permintaan yang paling gagal. Anda kemudian dapat mencari alamat IP mereka di Meme it\\[Login\\]Login[Login](#log)file dan melihat apa jenis permintaan yang mereka buat.
    
Anda dapat menggunakan nomor IP pengguna (misalnya, dengan[ https://whatismyipaddress.com/ip-lookup ](https://whatismyipaddress.com/ip-lookup)) untuk mencoba mencari tahu siapa atau apa yang pengguna. Kadang-kadang yang akan memberitahu Anda cukup akurat bahwa pengguna Meme it (e.g., itu crawler web mesin pencari) Sitemap Sebagian besar waktu itu hanya memberi Anda petunjuk (e.g., itu adalah komputer amazonaws, itu dari beberapa universitas, itu seseorang di beberapa kota tertentu) Sitemap
    
Dengan melihat permintaan aktual, nomor IP, dan pesan kesalahan (Sitemap[Login](#log)) untuk serangkaian kesalahan, Anda biasanya dapat mengetahui pada dasarnya apa yang akan salah. Dalam pengalaman saya, ada empat penyebab umum dari banyak permintaan gagal:
    
1) permintaan berbahaya (misalnya, mencari kelemahan keamanan, atau membuat permintaan dan kemudian membatalkannya sebelum selesai) Sitemap Anda harus menggunakan&lt;Login Sitemapdatasets.xmluntuk daftar hitam alamat IP mereka.
    
2) Mesin pencari secara naif mencoba URL yang tercantum dalamERDDAP™Halaman web dan dokumen ISO 19115. Misalnya, ada banyak tempat yang mencantumkan dasarOPeNDAPURL, misalnya, https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST , dimana pengguna seharusnya menambahkan jenis file (g., .das, .dds, Login) Sitemap Tapi mesin pencari tidak tahu ini. Dan permintaan ke URL dasar gagal. Situasi terkait adalah ketika mesin pencari menghasilkan permintaan yang aneh atau mencoba mengisi formulir untuk mendapatkan halaman web "hidden". Tapi mesin pencari sering melakukan pekerjaan yang buruk dari ini, menyebabkan kegagalan. Solusinya adalah: buat[WordPress.org](#robotstxt)Login
    
3) Beberapa pengguna menjalankan skrip yang berulang kali meminta sesuatu yang tidak ada. Mungkin itu adalah dataset yang digunakan untuk ada, tetapi sekarang (sementara atau permanen) Sitemap Script sering tidak mengharapkan ini dan jadi jangan berurusan dengan itu cerdas. Jadi script hanya membuat permintaan dan permintaan tetap gagal. Jika Anda dapat menebak siapa pengguna Meme it (dari nomor IP di atas) Hubungi mereka dan beri tahu mereka dataset tidak lagi tersedia dan meminta mereka untuk mengubah skrip mereka.
    
4) Sesuatu benar-benar salah dengan beberapa dataset. SitemapERDDAP™akan membuat dataset yang rusak tidak aktif. Kadang-kadang tidak, sehingga semua permintaan untuk itu hanya menyebabkan kesalahan. Jika demikian, perbaiki masalah dengan dataset atau (jika Anda tidak bisa Meme it) mengatur dataset untuk[aktif="false"](/docs/server-admin/datasets#active)Sitemap Tentu saja, ini dapat menyebabkan masalah #2.
    
Kadang-kadang kesalahan tidak begitu buruk, tidak bisa, jikaERDDAP™dapat mendeteksi kesalahan dan merespon dengan sangat cepat (&lt;100 g Jadi Anda dapat memutuskan untuk tidak mengambil tindakan.
    
Jika semua gagal lain, ada solusi universal: tambahkan nomor IP pengguna ke [&lt;Login (/docs/server-admin/datasets#requestblacklist) Sitemap Ini bukan sebagai pilihan yang buruk atau drastis karena mungkin tampak. Pengguna kemudian akan mendapatkan pesan kesalahan mengatakan s/he telah daftar hitam dan memberitahu mereka (LoginERDDAP™Login) Alamat email. Terkadang pengguna akan menghubungi Anda dan Anda dapat menyelesaikan masalah. Kadang-kadang pengguna tidak menghubungi Anda dan Anda akan melihat perilaku yang sama persis yang berasal dari nomor IP yang berbeda hari berikutnya. Blacklist nomor IP baru dan berharap bahwa mereka akhirnya akan mendapatkan pesan. (Atau ini adalah Hari Groundhog Anda, dari mana Anda tidak akan pernah melarikan diri. Login) 
    
### WordPress.org{#robotstxt} 
Perusahaan mesin pencari menggunakan crawler web (Sitemap Login) untuk memeriksa semua halaman di web untuk menambahkan konten ke mesin pencari. SitemapERDDAP™, itu pada dasarnya baik. Meme itERDDAP™memiliki banyak tautan antara halaman, sehingga crawler akan menemukan semua halaman web dan menambahkannya ke mesin pencari. Kemudian, pengguna mesin pencari akan dapat menemukan dataset di AndaERDDAPSitemap
    
Sayangnya, beberapa crawler web (Sitemap Login) sekarang mengisi dan mengirimkan formulir untuk menemukan konten tambahan. Untuk situs web perdagangan, ini sangat bagus. Tapi ini mengerikan untuk Meme itERDDAP™karena itu hanya mengarah ke Meme it **Login** jumlah upaya yang tidak diinginkan dan tak terhitung guna merangkak data yang sebenarnya. Ini dapat menyebabkan lebih banyak permintaan data dari semua pengguna lain yang digabungkan. Dan mengisi mesin pencari dengan goofy, subset tanpa titik data sebenarnya.
    
Untuk memberi tahu crawler web untuk menghentikan mengisi formulir dan hanya umumnya tidak melihat halaman web mereka tidak perlu melihat, Anda perlu membuat file teks yang disebut[WordPress.org](https://en.wikipedia.org/wiki/Robots_exclusion_standard)dalam direktori akar hierarki dokumen situs web Anda sehingga dapat dilihat oleh siapa pun, misalnya, http://*www.your.domain*/robots.txt Sitemap
Jika Anda membuat robot baru. txt file, ini adalah awal yang baik:
```
    User-Agent: \\*
    Disallow: /erddap/files/ 
    Disallow: /files/ 
    Disallow: /images/ 
    Disallow: /\\*?
    Disallow: /\\*?\\*
    Disallow: /\\*.asc\\*
    Disallow: /\\*.csv\\*
    Disallow: /\\*.dods\\*
    Disallow: /\\*.esriAscii\\*
    Disallow: /\\*.esriCsv\\*
    Disallow: /\\*.geoJson\\*
    Disallow: /\\*.htmlTable\\*
    Disallow: /\\*.json\\*
    Disallow: /\\*.mat\\*
    Disallow: /\\*.nc\\*
    Disallow: /\\*.odvTxt\\*
    Disallow: /\\*.tsv\\*
    Disallow: /\\*.xhtml\\*
    Disallow: /\\*.geotif\\*
    Disallow: /\\*.itx\\*
    Disallow: /\\*.kml\\*
    Disallow: /\\*.pdf\\*
    Disallow: /\\*.png\\*
    Disallow: /\\*.large\\*
    Disallow: /\\*.small\\*
    Disallow: /\\*.transparentPng\\*
    Sitemap: http://***your.institutions.url***/erddap/sitemap.xml
```
     (Tapi ganti *WordPress.org* LoginERDDAPURL dasar.)   
Ini mungkin diperlukan beberapa hari untuk mesin pencari untuk melihat dan untuk perubahan untuk mengambil efek.
     
### Login{#sitemapxml} 
Sitemap[ https://www.sitemaps.org ](https://www.sitemaps.org/)situs web mengatakan:

> Sitemaps are an easy way for webmasters to inform search engines about pages on their sites that are available for crawling. In its simplest form, a Sitemap is an XML file that lists URLs for a site along with additional metadata about each URL (when it was last updated, how often it usually changes, and how important it is, relative to other URLs on the site) so that search engines can more intelligently crawl the site.
> 
> Web crawlers usually discover pages from links within the site and from other sites. Sitemaps supplement this data to allow crawlers that support Sitemaps to pick up all URLs in the Sitemap and learn about those URLs using the associated metadata. Using the Sitemap protocol does not guarantee that web pages are included in search engines, but provides hints for web crawlers to do a better job of crawling your site.

Sebenarnya, sejakERDDAP™SitemapRESTful, laba-laba mesin pencari dapat dengan mudah merangkakERDDAPSitemap Tapi mereka cenderung melakukannya lebih sering Meme it (Sitemap) Sitemap (bulanan?) Sitemap

* Mengingat bahwa setiap mesin pencari dapat merangkak seluruh AndaERDDAP™setiap hari, ini dapat menyebabkan banyak permintaan yang tidak perlu.
* LoginERDDAP™menghasilkan file sitemap.xml untuk AndaERDDAP™yang memberitahukan mesin pencari yang AndaERDDAP™hanya perlu merangkak setiap bulan.
* Anda harus menambahkan referensi keERDDAP's sitemap.xml untuk Anda[WordPress.org](https://en.wikipedia.org/wiki/Robots_exclusion_standard)file:
Sitemap http://**www.yoursite.org**/erddap/sitemap.xml
 
* Jika itu tidak tampaknya mendapatkan pesan ke crawler, Anda dapat memberitahu berbagai mesin pencari tentang file sitemap.xml dengan mengunjungi URL ini (tapi perubahan **Login** ke akronim atau singkatan institusi Anda **www.facebook.com** AndaERDDAPURL) Sitemap
    *    https://www.bing.com/webmaster/ping.aspx?siteMap=http://**www.yoursite.org**/erddap/sitemap.xml
 
    *    https://www.google.com/ping?sitemap=http://**www.yoursite.org**/erddap/sitemap.xml(I berpikir) Anda hanya perlu ping setiap mesin pencari sekali, untuk semua waktu. Mesin pencari kemudian akan mendeteksi perubahan ke sitemap.xml secara berkala.
     
### Database Jaringan:PushLoginPullSitemap{#data-dissemination--data-distribution-networks-push-and-pull-technology} 
* SitemapERDDAP™bertindak sebagai perantara: dibutuhkan permintaan dari pengguna; mendapatkan data dari sumber data jarak jauh; memformat data; dan mengirimkannya ke pengguna.
*   [PullSitemap](https://en.wikipedia.org/wiki/Pull_technology)SitemapERDDAP™juga memiliki kemampuan untuk secara aktif mendapatkan semua data yang tersedia dari sumber data jarak jauh dan[menyimpan salinan lokal data](/docs/server-admin/datasets#eddgridcopy)Sitemap
*   [PushSitemap](https://en.wikipedia.org/wiki/Push_technology)Sitemap Dengan menggunakanERDDAPSitemap[Layanan berlangganan](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions)server data lain dapat diberitahu segera setelah data baru tersedia sehingga mereka dapat meminta data (dengan menarik data) Sitemap
*   ERDDAPSitemap[EDDGridLogin](/docs/server-admin/datasets#eddfromerddap)Login[Login](/docs/server-admin/datasets#eddfromerddap)SitemapERDDAPLayanan berlangganan dan[sistem bendera](#flag)sehingga akan segera diberitahukan ketika data baru tersedia.
* Anda dapat menggabungkan ini dengan efek besar: jika Anda membungkusEDDGridFotokopiEDDGridDariErddap dataset (atau membungkus EDDTableCopy di sekitar dataset EDDTableDariErddap) LoginERDDAP™akan secara otomatis membuat dan memelihara salinan lokal lainERDDAPdataset.
* Karena layanan berlangganan bekerja segera setelah data baru tersedia, mendorong teknologi menyebarkan data dengan sangat cepat (dalam detik) Sitemap

Arsitektur ini menempatkan setiapERDDAP™administrator dalam mengisi determining di mana data untuk nyaERDDAP™Sitemap

* SitemapERDDAP™administrator dapat melakukan hal yang sama. Tidak perlu koordinasi antara administrator.
* SitemapERDDAP™administrator link ke masing-masingERDDAPJaringan distribusi data terbentuk.
* Data akan cepat, efisien, dan secara otomatis menyebar dari sumber data (ERDDAPWeb server) ke situs redistribusi data (ERDDAPLogin) di mana saja di jaringan.
* SitemapERDDAP™dapat menjadi sumber data untuk beberapa dataset dan situs redistribusi untuk dataset lain.
* Jaringan yang dihasilkan kira-kira mirip dengan jaringan distribusi data yang ditetapkan dengan program-program seperti[UnidataIDD/IDM](https://www.unidata.ucar.edu/projects/index.html#idd)tetapi kurang terstruktur.
         
### Keamanan, Otentikasi, dan Otorisasi{#security-authentication-and-authorization} 
LoginERDDAP™berjalan sebagai server publik sepenuhnya (Loginhttpdan/atauhttps) Login ([Sitemap](https://en.wikipedia.org/wiki/Authentication)) sistem dan tidak ada batasan akses data ([Login](https://en.wikipedia.org/wiki/Authorization)) Sitemap

#### Login{#security} 
Jika Anda ingin membatasi akses ke beberapa atau semua dataset ke beberapa pengguna, Anda dapat menggunakanERDDAPSistem keamanan bawaan. Ketika sistem keamanan digunakan:

*   ERDDAP™Login[kontrol akses berbasis peran](https://en.wikipedia.org/wiki/Role-based_access_control)Sitemap
    * LoginERDDAP™administrator mendefinisikan pengguna dengan [&lt;pengguna&gt; (/docs/server-admin/datasets#user) Logindatasets.xmlSitemap Setiap pengguna memiliki nama pengguna, kata sandi (jika otentikasi = kustom) , dan satu atau lebih peran.
    * LoginERDDAP™administrator mendefinisikan peran yang memiliki akses ke dataset yang diberikan melalui [&lt;Login (/docs/server-admin/dataset#accessibleto) Logindatasets.xmluntuk setiap dataset yang seharusnya tidak memiliki akses publik.
* Status login pengguna (dan tautan untuk masuk / keluar) akan ditampilkan di bagian atas setiap halaman web. (Tapi login pengguna akan munculERDDAP™tidak masuk jika dia menggunakan Meme ithttpURL) 
* Sitemap&lt;baseUrl&gt; yang Anda tentukan dalam setup Anda.xml adalah **http** URL, pengguna yang tidak masuk dapat digunakanERDDAPSitemap **http** URL Sitemap&lt;baseHttpsUrl&gt; juga ditentukan, pengguna yang tidak masuk juga dapat menggunakanhttpsURL
* HTTPS Hanya -- Sitemap&lt;baseUrl&gt; yang Anda tentukan dalam setup Anda.xml adalah **https** URL, pengguna yang tidak login didorong (tidak dipaksa) SitemapERDDAPSitemap **https** URL -- semua link diERDDAP™halaman web akan merujuk kehttpsURL
    
Jika Anda ingin memaksa pengguna untuk menggunakanhttpsURL, tambahkan garis permanen Redirect di dalam&lt;VirtualHost \\ *:80&gt; bagian dalam file konfigurasi Apache Anda (SitemaphttpLogin) Sitemap
    
```
    <VirtualHost \\*:80>
        \\[...\\]
        ServerName example.com
        Redirect permanent / https://example.com/
    </VirtualHost>
```

Jika Anda ingin, ada metode tambahan untuk memaksa penggunaanhttps: [Keamanan Transportasi HTTP (Login) ](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security)Sitemap Untuk menggunakannya:
    
    1. Aktifkan Modul Header Apache: header a2enmod
    2. Tambahkan header tambahan ke arah arah HTTPS VirtualHost. Max-age diukur dalam detik dan dapat diatur ke beberapa nilai panjang.
        
```
        <VirtualHost \\*:443>
            # Guarantee HTTPS for 1 Year including Sub Domains 
            Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
```
    
Harap dicatat bahwa header ini hanya berlaku di HTTPS VirtualHost.
    
Alasan tidak memaksa pengguna untuk menggunakanhttpsURL adalah: link SSL/TLS yang mendasari diperlukan waktu untuk menetapkan dan kemudian mengambil waktu untuk mengenkripsi dan mengenkripsi semua informasi yang dikirimkan antara pengguna dan server. Tapi beberapa lembaga memerlukanhttpsSitemap
    
* Pengguna yang masuk dalam penggunaan MUSTERDDAPSitemap **https** URL Jika mereka menggunakanhttpURL, mereka munculERDDAP™tidak masuk. Ini memastikan privasi komunikasi dan membantu mencegah[sesi pembajak dan pembajak](https://en.wikipedia.org/wiki/Session_hijacking)Sitemap
* Siapa pun yang tidak masuk dapat mengakses dan menggunakan dataset publik. Secara default, dataset pribadi tidak muncul dalam daftar dataset jika pengguna tidak masuk. Jika administrator telah mengatur setup.xml's&lt;Login Tempts untuk meminta data dari dataset pribadi (jika pengguna mengetahui URL) akan diarahkan ke halaman login.
* Siapa pun yang masuk akan dapat melihat dan meminta data dari dataset publik dan dataset pribadi mana peran mereka memungkinkan mereka mengakses. Secara default, dataset pribadi yang pengguna tidak memiliki akses tidak muncul dalam daftar dataset. Jika administrator telah mengatur setup.xml's&lt;Login Untuk meminta data dari dataset pribadi yang pengguna tidak memiliki akses akan diarahkan ke halaman login.
* LoginRSSinformasi untuk set data pribadi sepenuhnya hanya tersedia untuk pengguna (LoginRSSLogin) yang masuk dan berwenang untuk menggunakan dataset. Ini membuatRSStidak berguna untuk set data pribadi sepenuhnya.
    
Jika dataset adalah pribadi tetapi [&lt;Login (/docs/server-admin/dataset#graphsaccessibleto) diatur ke publik, datasetRSSdapat diakses oleh siapa pun.
    
* Langganan email hanya dapat diatur ketika pengguna memiliki akses ke dataset. Jika pengguna berlangganan dataset pribadi, berlangganan terus berfungsi setelah pengguna telah login.

##### Pengaturan Keamanan{#setup-security} 
Untuk mengatur sistem keamanan/pengobatan/penerahan:

* Apakah standarERDDAP™ [pengaturan awal](/docs/server-admin/deploy-install)Sitemap
* Sitemap[WordPress.org](/docs/server-admin/deploy-install#setupxml)Login
    * Tambahkan/ubah&lt;Sitemap nilai dari apa-apa untuk kustom (tidak menggunakan ini Meme it) Sitemap (tidak menggunakan ini Meme it) Login (Sitemap) Login (Sitemap) , atau oauth2 (yang google+orcid, dianjurkan) Sitemap Lihat komentar tentang opsi ini di bawah ini.
    * Tambahkan/ubah&lt;baseHttpsUrl&gt; nilai.
    * Login&loginInfo;Sitemap&lt;startBodyHtml&gt; untuk menampilkan log pengguna di / keluar info di bagian atas setiap halaman web.
* Untuk tujuan pengujian pada komputer pribadi Anda,[ikuti petunjuk ini untuk mcat untuk mendukung SSL](https://tomcat.apache.org/tomcat-8.0-doc/ssl-howto.html)  (dasarhttpsLogin) dengan membuat toko kunci dengan[sertifikat mandiri](https://en.wikipedia.org/wiki/Self-signed_certificate)dan dengan memodifikasi *Login* /conf/server.xml untuk uncomment konektor untuk port 8443. Pada Windows, Anda mungkin perlu memindahkan .keystore dari "c:\\Users\\ *Login* \\.keystore" untuk "c:\\Users\\Default User\\.keystore" atau "c:\\.keystore" (Login *Login* Login *Sitemap* .log jika aplikasi tidak memuat atau pengguna tidak dapat melihat log di halaman) Sitemap Anda dapat melihat ketika sertifikat .keystore akan berakhir dengan memeriksa sertifikat ketika Anda masuk.
    
Untuk server yang dapat diakses secara publik, bukan menggunakan sertifikat yang ditetapkan sendiri, sangat dianjurkan bahwa Anda membeli dan menginstal sertifikat yang ditandatangani oleh sebuah[otoritas sertifikat](https://en.wikipedia.org/wiki/Certificate_authority)karena memberikan jaminan lebih banyak klien Anda bahwa mereka memang terhubung ke Anda Meme itERDDAP™bukan versi man-in-the-middle dari AndaERDDAPSitemap Banyak vendor jual sertifikat digital. (Login) Mereka tidak mahal.
    
* Pada komputer Linux, jika Tomcat berjalan di Apache, memodifikasi /etc/httpd/conf.d/ssl.conf file untuk memungkinkan lalu lintas HTTPS ke/dariERDDAP™tanpa memerlukan nomor port:8443 di URL:
    1. Modifikasi yang ada&lt;VirtualHost&gt; tag (jika ada satu) atau tambahkan satu di akhir file sehingga setidaknya memiliki garis-garis ini:
```
        <VirtualHost \\_default\\_:443>
            SSLEngine on
            SSLProxyEngine On
            ProxyPass /erddap http://localhost:8443/erddap
            ProxyPassReverse /erddap http://localhost:8443/erddap
        </VirtualHost>
```

    2. Kemudian restart Apache: /usr/sbin/apachectl Login (tetapi kadang-kadang dalam direktori yang berbeda) Sitemap
* Sitemap *Login* /conf/server.xml, uncomment port=8443&lt;Konektor&gt; tag:
```
    <Connector port="8443" 
        protocol="org.apache.coyote.http11.Http11NioProtocol"
        maxThreads="150" SSLEnabled="true">
        <SSLHostConfig>
        <Certificate certificateKeystoreFile="conf/localhost-rsa.jks" 
            type="RSA" />
        </SSLHostConfig>
    </Connector>
```
dan mengubah lokasi sertifikatKeystoreFile.
##### Login{#authorization} 
*   [Sitemapdatasets.xml, buat](#authorization)Sitemap&lt;pengguna&gt; (/docs/server-admin/datasets#user) tag untuk setiap pengguna dengan username, password (jika otorisasi = kustom) , dan peran informasi. Ini adalah bagian otorisasiERDDAP's sistem keamanan.
     
* Sitemapdatasets.xmlPromo&lt;Login (/docs/server-admin/dataset#accessibleto) tag untuk setiap dataset yang seharusnya tidak memiliki akses publik.&lt;dapat diakses&gt; memungkinkan Anda menentukan peran yang memiliki akses ke dataset tersebut.
     
* Login Login Cek log Tomcat.
     
* LIHAT KERJA ANDA&#33; Setiap kesalahan dapat menyebabkan kekurangan keamanan.
     
* Periksa bahwa halaman login menggunakanhttps  (Loginhttp) Sitemap Loginhttpharus secara otomatis diarahkan ke Meme ithttpsdan port 8443 (meskipun nomor port dapat disembunyikan melalui proxy Apache) Sitemap Anda mungkin perlu bekerja dengan administrator jaringan Anda untuk memungkinkan permintaan web eksternal untuk mengakses port 8443 di server Anda.
     
* Anda dapat mengubah&lt;pengguna&gt; dan&lt;dapat diakses&gt; tag setiap saat. Perubahan akan diterapkan pada beban rutin berikutnya dari setiap dataset, atau ASAP jika Anda menggunakan[Login](#flag)Sitemap

##### Sitemap{#authentication} 
[ **Sitemap (login) ** ](#authentication)  
Jika Anda tidak ingin memungkinkan pengguna untuk masuk, tidak menentukan nilai untuk&lt;otentikasi&gt; dalam setup.xml.
Jika Anda ingin memungkinkan pengguna untuk masuk, Anda harus menentukan nilai untuk&lt;Sitemap SitemapERDDAP™Login
[Sitemap](#custom)  (tidak menggunakan ini Meme it) Login
[Sitemap](#email)  (tidak menggunakan ini Meme it) Login
[Login](#google)  (Sitemap) Login
[Login](#orcid)  (Sitemap) Sitemap
[Login](#oauth2)  (Sitemap) untuk metode otentikasi.
Jika Anda ingin mengaktifkan penebangan, kami sangat menyarankan google, orcid, atau opsi oauth2 karena mereka membebaskan Anda dari menyimpan dan menangani kata sandi pengguna (diperlukan untuk kustom) dan lebih aman daripada opsi email. Ingat bahwa pengguna sering menggunakan kata sandi yang sama di situs yang berbeda. Jadi mereka dapat menggunakan kata sandi yang sama untuk AndaERDDAP™sebagai bank mereka. Meme it Itu membuat password mereka sangat berharga - jauh lebih berharga bagi pengguna daripada hanya data yang mereka minta. Jadi Anda perlu melakukan sebanyak yang Anda dapat menyimpan kata sandi pribadi. Itu adalah tanggung jawab besar. Email, google, orcid, dan pilihan oauth2 mengurus password, sehingga Anda tidak harus mengumpulkan, menyimpan, atau bekerja dengan mereka. Jadi Anda dibebaskan dari tanggung jawab tersebut.

Sitemap&lt;otentikasi&gt; pilihan menggunakan[Login](https://en.wikipedia.org/wiki/HTTP_cookie)di komputer pengguna, jadi browser pengguna harus diatur untuk mengizinkan cookie. Jika pengguna membuatERDDAP™permintaan dari program komputer (bukan browser) , cookie dan otentikasi sulit untuk bekerja dengan. Itu masalah umum dengan semua sistem otentikasi. Login

Detail dari&lt;Sitemap pilihan:

###### Sitemap{#custom} 
SitemapERDDAPSistem kustom untuk memungkinkan pengguna masuk dengan memasukkan Nama Pengguna dan Sandi mereka dalam bentuk di halaman web. Jika pengguna mencoba dan gagal masuk 3 kali dalam 10 menit, pengguna diblokir dari mencoba masuk selama 10 menit. Ini mencegah peretas dari hanya mencoba jutaan kata sandi sampai mereka menemukan yang tepat.

Ini agak aman karena Nama Pengguna dan Sandi ditransmisikan melaluihttps  (Loginhttp) tapi otentikasi=google, orcid, atau oauth2 lebih baik karena mereka membebaskan Anda dari harus menangani password. Pendekatan kustom mengharuskan Anda mengumpulkan nama pengguna dan pencernaan kata sandi mereka (gunakan ponsel Anda&#33; email tidak aman&#33;) dan menyimpannya di Meme itdatasets.xmldi [&lt;pengguna&gt; (/docs/server-admin/datasets#user) Login

Dengan opsi kustom, tidak ada yang bisa masuk sampai Anda (LoginERDDAP™Login) Sitemap&lt;pengguna&gt; tag untuk pengguna, menentukan nama pengguna sebagai nama pengguna, pencernaan kata sandi mereka sebagai kata sandi, dan peran mereka.

Sitemap
Karena kelemahan menghasilkan dan mentransmisikan hash pencernaan kata sandi pengguna dan karena risiko yang terkait denganERDDAP™menahan pencernaan kata sandi, opsi ini tidak dianjurkan.

Untuk meningkatkan keamanan opsi ini:

* Anda MUST memastikan bahwa pengguna lain di server (i.e., pengguna Linux, tidakERDDAP™Login) tidak dapat membaca file di direktori Tomcat (terutamadatasets.xmlLogin) SitemapERDDAPSitemap
Pada Linux, sebagai user=tomcat, gunakan:
g-rwx *Login*   
Login *Login*   
g-rwx *Login*   
Login *Login*   
     
* Gunakan UEPSHA256 untuk&lt;passwordEncoding&gt; dalam setup.xml.
     
* Gunakan metode yang mudah digunakan untuk melewati gangguan hash dari kata sandi pengguna dari pengguna ke penggunaERDDAP™Login (Login) Sitemap
         
###### Sitemap{#email} 
Opsi otentikasi email menggunakan akun email pengguna untuk mengotentikasikan pengguna (dengan mengirimkan email dengan link khusus yang harus mereka akses untuk masuk) Sitemap Tidak seperti email lain yang Meme itERDDAP™SitemapERDDAP™tidak menulis email undangan ini ke file log email karena berisi informasi rahasia.
Secara teori, ini tidak sangat aman, karena email tidak selalu dienkripsi, jadi pria buruk dengan kemampuan untuk mencegat email dapat menyalahgunakan sistem ini dengan menggunakan alamat email pengguna yang valid dan mencegat email undangan.
Dalam praktek, jika Anda mengaturERDDAP™untuk menggunakan akun email Google untuk mengirim email, dan jika Anda mengaturnya untuk menggunakan salah satu opsi TLS untuk koneksi, dan jika pengguna memiliki akun email Google, ini agak aman karena email dienkripsi semua cara dariERDDAP™kepada pengguna.

Untuk meningkatkan keamanan opsi ini:

* Pastikan pengguna lain di server (i.e., pengguna Linux, tidakERDDAP™Login) tidak dapat membaca file di direktori Tomcat atauERDDAPSitemap
Pada Linux, sebagai user=tomcat, gunakan:
g-rwx *Login*   
Login *Login*   
g-rwx *Login*   
Login *Login*   
     
* Mengatur hal-hal untuk mendapatkan keamanan end-to-end untuk email yang dikirim dariERDDAP™kepada pengguna. Misalnya, Anda bisa membuat sistem yang tersentris Google hanya dengan membuat&lt;pengguna&gt; tag untuk alamat email yang dikelola Google dan dengan mengatur AndaERDDAP™untuk menggunakan server email Google melalui koneksi yang aman/TLS: di setup Anda.xml, gunakan misalnya,
```
    <emailSmtpHost>smtp.gmail.com</emailSmtpHost>  
    <emailSmtpPort>587</emailSmtpPort>  
    <emailProperties>mail.smtp.starttls.enable|true</emailProperties>
```

Sitemap
Opsi otentikasi email tidak dianjurkan. Silahkan gunakan opsi google, orcid, atau oauth2.

Seperti dengan google, orcid, dan pilihan oauth2, email sangat nyaman untukERDDAP™administrator -- Anda tidak pernah harus berurusan dengan password atau pencernaan hash mereka. Yang perlu Anda buat adalah [&lt;pengguna&gt; (/docs/server-admin/datasets#user) tag untuk pengguna dalamdatasets.xmladalah alamat email pengguna, yangERDDAP™menggunakan nama pengguna. (Atribut kata sandi tidak digunakan ketika otentikasi=email, google, orcid, atau oauth2.) 

Dengan opsi email, hanya pengguna yang memiliki&lt;pengguna&gt; tag didatasets.xmldapat mencoba untuk masuk keERDDAP™dengan menyediakan alamat email dan mengklik tautan di email yangERDDAP™mengirimkannya.

ERDDAP™memperlakukan alamat email sebagai case-insensitif. Ini melakukan ini dengan mengkonversi alamat email Anda masukkan (dalam&lt;pengguna&gt; tag) atau pengguna masuk (Login) untuk semua versi yang lebih rendah. Meme it

Untuk mengatur otentikasi=email:

1. Di setup.xml Anda, ubah&lt;baseHttpsUrl&gt; nilai tag.
Untuk bereksperimen / bekerja pada komputer pribadi Anda, gunakan
     https://localhost:8443   
Untuk publik AndaERDDAP™Sitemap
     https://*your.domain.org*:8443   
atau tanpa :8443 jika Anda menggunakan Apache[Login](/docs/server-admin/deploy-install#proxypass)sehingga nomor port tidak diperlukan. Meme it
     
2. Di setup.xml Anda, ubah&lt;Sitemap nilai tag ke email:
```
    <authentication>email</authentication>  
```

3. Dalam setup.xml Anda, pastikan sistem email diatur melalui semua&lt;email...&gt; tag, sehinggaERDDAP™dapat mengirim email. Jika memungkinkan, atur ini untuk menggunakan koneksi yang aman (SSL / TLS) ke server email.
     
4. Sitemapdatasets.xmlSitemap&lt;pengguna&gt; (/docs/server-admin/datasets#user) tag untuk setiap pengguna yang akan memiliki akses ke dataset pribadi.
Gunakan alamat email pengguna sebagai nama pengguna dalam tag.
Jangan menentukan atribut kata sandi dalam tag pengguna.
     
5. LoginERDDAP™sehingga perubahan pada setup.xml dandatasets.xmlmengambil efek.
         
###### Facebook Twitter{#google-orcid-oauth2} 
*   [ **Login** ](#google)Login[ **Login** ](#orcid)Sitemap[ **Login** ](#oauth2)   (Sitemap)   
Semua tiga opsi ini direkomendasikanERDDAP™Opsi otentikasi. Mereka adalah semua pilihan yang paling aman. Pilihan lain memiliki keamanan yang lebih lemah.
     
###### Login{#google} 
* Opsi otentikasi google menggunakan[Login Sitemap](https://developers.google.com/identity/gsi/web/guides/overview), yang merupakan implementasi[protokol otentikasi OAuth 2.0](https://oauth.net/2/)SitemapERDDAP™pengguna masuk ke akun email Google mereka, termasuk akun yang dikelola Google seperti@noaa.govLogin Hal ini memungkinkanERDDAP™untuk memverifikasi identitas pengguna (nama dan alamat email) dan mengakses gambar profil mereka, tetapi tidak memberikanERDDAP™akses ke email mereka, Google Drive mereka, atau informasi pribadi lainnya.
    
SitemapERDDAP™v2.22 dan di bawah ini,ERDDAP™"Google Sign-In". Google mengatakan bahwa sistem didepresi setelah 31 Maret 2023. Jika Anda belum selesai, silakan beralih ke Meme itERDDAP™v2.23 + untuk menggunakan sistem otentikasi berbasis Google.
    
SitemapERDDAP™v2.23 contoh dengan Content-Security-Policy dikonfigurasi dan menggunakan Google Authentication, Anda perlu menambahkan https://accounts.google.com ke daftar script-src yang diperbolehkan (atau script-src-elem) SitemapERDDAP™tidak lagi digunakan https://apis.google.com Jika Anda memiliki yang diperbolehkan, Anda dapat menghapusnya sekarang.
    
SitemapERDDAP™v2.24 + Anda mungkin juga perlu menambahkan https://accounts.google.com/gsi/style untuk stlye-src dan https://accounts.google.com/gsi/ untuk menghubungkan-src. Untuk script-src Anda sekarang dapat menggunakan https://accounts.google.com/gsi/client.
 
    
Untuk informasi lebih lanjut, Anda dapat pergi ke[Sitemap](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#content_security_policy)tentang konfigurasi CSP. Jika Anda memiliki pertanyaan, hubungi chris.john di noaaaa.gov.
         
###### Login{#orcid} 
* Opsi otentikasi orcid menggunakan[Orcid otentikasi](https://members.orcid.org/api/integrate/orcid-sign-in), yang merupakan implementasi[protokol otentikasi OAuth 2.0](https://oauth.net/2/)SitemapERDDAP™pengguna masuk ke[Login](https://members.orcid.org/api/integrate/orcid-sign-in), yang biasa digunakan oleh para peneliti untuk mengidentifikasi diri mereka sendiri. Hal ini memungkinkanERDDAP™untuk memverifikasi identitas Orcid pengguna dan mendapatkan nomor akun Orcid mereka, tetapi tidak memberikanERDDAP™akses ke informasi akun Orcid lainnya.

###### Login{#oauth2} 
* Opsi oauth2 memungkinkan pengguna masuk dengan akun Google atau akun Orcid mereka.

Opsi google, orcid, dan oauth2 adalah penerus untuk opsi openid, yang dihentikan setelahERDDAP™versi 1.68, dan yang didasarkan pada versi terbuka Login Silakan beralih ke opsi google, orcid, atau oauth2.

Pilihan ini sangat nyaman untukERDDAP™administrator -- Anda tidak pernah harus berurusan dengan password atau pencernaan hash mereka. Yang perlu Anda buat adalah [&lt;pengguna&gt; (/docs/server-admin/datasets#user) tag untuk pengguna dalamdatasets.xmlyang menentukan alamat email Google pengguna atau nomor akun Orcid sebagai atribut username. (Atribut kata sandi tidak digunakan ketika otentikasi=email, google, orcid atau oauth2.) 

Dengan opsi ini, siapa pun bisa masuk keERDDAP™dengan menandatangani akun email atau akun Orcid Google mereka, tetapi tidak ada yang akan memiliki hak untuk mengakses dataset pribadi sampai Anda (LoginERDDAP™Login) Sitemap&lt;pengguna&gt; tag, menentukan alamat email Google atau nomor akun Orcid mereka sebagai username, dan menentukan peran mereka.

ERDDAP™memperlakukan alamat email sebagai case-insensitif. Ini melakukan ini dengan mengkonversi alamat email Anda masukkan (dalam&lt;pengguna&gt; tag) atau pengguna masuk (Login) untuk semua versi yang lebih rendah. Meme it

Untuk mengatur otentikasi google, orcid, atau oauth2:

* Di setup.xml Anda, ubah&lt;baseHttpsUrl&gt; nilai tag.
Untuk bereksperimen / bekerja pada komputer pribadi Anda, gunakan
     https://localhost:8443   
Untuk publik AndaERDDAP™Sitemap
     https://*your.domain.org*:8443   
atau, lebih baik, tanpa :8443 jika Anda menggunakan Apache[Login](/docs/server-admin/deploy-install#proxypass)sehingga nomor port tidak diperlukan. Meme it
     
* Di setup.xml Anda, ubah&lt;Sitemap nilai tag ke google, orcid, atau oauth2, misalnya:
```
    <authentication>oauth2</authentication>  
```
###### Pengaturan Google{#google-setup} 
* Untuk pilihan google dan oauth2:
Ikuti petunjuk di bawah ini untuk mengatur otentikasi Google untuk AndaERDDAPSitemap
     
    1. Jika Anda tidak memiliki akun email Google,[membuat satu](https://www.google.com/intl/en_us/mail/help/about.html)  
         
    2. Sitemap[petunjuk ini](https://developers.google.com/identity/sign-in/web/devconsole-project)untuk membuat proyek Google Developers Console dan mendapatkan ID klien.
        
Ketika formulir Google meminta untuk resmiJavaAsal-usul script, masukkan nilai dari&lt;baseHttpsUrl&gt; dari komputer pribadi AndaERDDAP™WordPress.org
         https://localhost:8443   
Pada garis kedua, tambahkan&lt;baseHttpsUrlERDDAP™WordPress.org
         https://*your.domain.org*:8443
 
        
Jangan menentukan URIs yang diarahkan.
        
Ketika Anda melihat ID Klien Anda untuk proyek ini, menyalin dan menempelkannya ke dalam setup Anda.xml (biasanya di bawah ini&lt;autentikasi&gt; untuk diurutkan, tetapi penempatan tidak benar-benar masalah), di&lt;googleClientID&gt; tag, e.g.,
        &lt;Login *Login* &lt;Login
ID klien akan menjadi string dari sekitar 75 karakter, mungkin dimulai dengan beberapa digit dan berakhir dengan .apps.googleusercontent.com .
         
        
    3. Sitemapdatasets.xmlmembuat [&lt;pengguna&gt; (/docs/server-admin/datasets#user) tag untuk setiap pengguna yang akan memiliki akses ke dataset pribadi. Untuk atribut username dalam tag:
        
        * Untuk pengguna yang akan masuk ke google, gunakan alamat email Google pengguna.
        * Untuk pengguna yang akan masuk dengan orcid, gunakan nomor akun Orcid pengguna (dengan dasbor) Sitemap
        
Jangan menentukan atribut kata sandi untuk tag pengguna.
         
    4. LoginERDDAP™sehingga perubahan pada setup.xml dandatasets.xmlmengambil efek.
         
###### Pengaturan Orcid{#orcid-setup} 
* Untuk pilihan orcid dan oauth2:
Ikuti petunjuk di bawah ini untuk mengatur otentikasi Orcid untuk AndaERDDAPSitemap
     (Untuk detail, lihat[Dokumentasi API orcid](https://members.orcid.org/api/integrate/orcid-sign-in)Sitemap)   
     
    1. Jika Anda tidak memiliki akun Orcid,[membuat satu](https://orcid.org/signin)  
         
    2. Login[ https://orcid.org/signin ](https://orcid.org/signin)menggunakan akun Orcid pribadi Anda.
         
    3. Klik pada "Developer Tools" (di bawah "Untuk peneliti" di bagian atas) Sitemap
         
    4. Klik pada "Daftar API publik ORCID gratis". Masukkan informasi ini:
Nama:ERDDAP™Sitemap\\[organisasi Anda\\]  
Web:\\[LoginERDDAPdomain\\]  
Deskripsi:ERDDAP™adalah server data ilmiah. Pengguna perlu otentikasi dengan Google atau Orcid untuk mengakses dataset non-publik.
Login:\\[LoginERDDAPdomain\\]/erddap/loginOrcid.html
         
    5. Klik ikon Save (itu terlihat seperti disk 3,5 "&#33;) Sitemap
Anda kemudian dapat melihat ID Klien ORCID APP Anda dan ORCID Klien Rahasia.
         
    6. Copy dan paste ID Klien Aplikasi ORCID (yang akan dimulai dengan "APP-") ke dalam setup.xml di&lt;e.g.,
```
        <orcidClientID>APP-*ALPHANUMERICCHARACTERS*</orcidClientID>
```
    7. Salin dan tempel Klien ORCID Rahasia (huruf kecil karakter alfa-numerik dengan dasbor) ke dalam setup.xml di&lt;orcidClientSecret&gt; tag, misalnya,
```
        <orcidClientSecret>*alpha-numeric-characters-with-dashes*</orcidClientSecret>
```

    8. Sitemapdatasets.xmlmembuat [&lt;pengguna&gt; (/docs/server-admin/datasets#user) tag untuk setiap pengguna yang akan memiliki akses ke dataset pribadi. Untuk atribut username dalam tag:
        
        * Untuk pengguna yang akan masuk ke google, gunakan alamat email Google pengguna.
        * Untuk pengguna yang akan masuk dengan orcid, gunakan nomor akun Orcid pengguna (dengan dasbor) Sitemap
        
Jangan menentukan atribut kata sandi untuk tag pengguna.
         
    9. LoginERDDAP™sehingga perubahan pada setup.xml dandatasets.xmlmengambil efek.
             

###### Login{#log-in-either-way} 
Jika Anda menggunakan opsi otentikasi google, orcid, atau oauth2, dan API Authentication Google Sign-In atau Orcid tiba-tiba berhenti bekerja (untuk alasan apa pun) atau berhenti bekerjaERDDAP™mengharapkan, pengguna tidak akan dapat masuk ke AndaERDDAPSitemap Sebagai sementara (atau permanen) solusi, Anda dapat meminta pengguna untuk mendaftar dengan sistem lain (Dapatkan akun email Google, atau dapatkan akun Orcid) Sitemap Untuk melakukannya:

1. Login&lt;otentikasi&gt; tag sehingga memungkinkan sistem otentikasi lainnya. Opsi oauth2 memungkinkan pengguna untuk masuk dengan sistem.
2. Duplikat masing-masing&lt;pengguna&gt; tag dan mengubah atribut username dari alamat email Google ke nomor akun Orcid yang sesuai (atau sebaliknya) tapi tetap peran atribut sama. Meme it

###### Login{#openid} 
ERDDAP™tidak lagi mendukung opsi otentikasi terbuka, yang didasarkan pada versi terbuka Login Silahkan gunakan opsi google, orcid, atau oauth2.

###### Login{#basic} 
ERDDAP™tidak mendukung otentikasi BASIC karena:
* BASIC tampaknya diarahkan ke halaman web yang telah ditentukan membutuhkan akses yang aman atau akses selimut di / off ke seluruh situs, tetapiERDDAP™Sitemap (akses terbatas) dataset untuk ditambahkan pada-the-fly.
* otentikasi BASIC tidak menawarkan cara bagi pengguna untuk masuk&#33;
* otentikasi BASIC diketahui tidak aman.

##### Database{#secure-data-sources} 
Jika set data harus memiliki akses terbatas keERDDAP™pengguna, sumber data (di manaERDDAP™Login) tidak dapat diakses secara publik. Jadi bagaimana bisaERDDAP™mendapatkan data untuk membatasi dataset akses? Beberapa pilihan adalah:

*   ERDDAP™dapat melayani data dari file lokal (misalnya, melalui EDDTable SitemapEDDGridLogin) Sitemap
     
*   ERDDAP™Sitemap[Login](https://en.wikipedia.org/wiki/Demilitarized_zone_(computing)) dan sumber data (SitemapOPeNDAPserver atau database) bisa di belakang[Login](https://en.wikipedia.org/wiki/Firewall)Di mana dapat diaksesERDDAP™tapi tidak ke publik. Meme it
     
* Sumber data dapat ada di situs publik, tetapi memerlukan login untuk mendapatkan data. Dua jenis dataset yangERDDAP™dapat masuk ke akses[Login](/docs/server-admin/datasets#eddtablefromdatabase)Login[Login](/docs/server-admin/datasets#eddtablefromcassandra)Sitemap Dukungan dataset ini (dan harus selalu menggunakan) nama pengguna (SitemapERDDAP™pengguna yang hanya memiliki hak istimewa yang membaca) , password, koneksi SSL, dan langkah-langkah keamanan lainnya.
    
Tapi secara umum, saat ini,ERDDAP™tidak dapat menangani sumber data ini karena tidak memiliki ketentuan untuk masuk ke sumber data. Inilah alasan mengapa akses ke[EDDGridDariErddap dan EDDTable Login](/docs/server-admin/datasets#eddfromerddap)dataset tidak dapat dibatasi. Saat ini, penduduk setempatERDDAP™tidak memiliki cara untuk login dan mengakses informasi metadata dari remoteERDDAPSitemap Dan menempatkan "remote"ERDDAP™di balik firewall Anda dan menghapus dataset yang dapat diakses Untuk pembatasan tidak memecahkan masalah: karena permintaan pengguna untuk EDDXxx Dari data Erddap perlu diarahkan ke remoteERDDAP™, jarak jauhERDDAP™harus dapat diakses.
    
#### Pertahanan Hacker Sekali Lagi{#defenses-against-hackers} 
Ada peretas pria yang buruk yang mencoba untuk mengeksploitasi kelemahan keamanan dalam perangkat lunak server sepertiERDDAPSitemapERDDAP™mengikuti saran keamanan umum untuk memiliki beberapa lapisan pertahanan:

* Privileges yang dibatasi -- Salah satu pertahanan yang paling penting adalah menjalankan Tomcat melalui pengguna yang disebut tomcat yang tidak memiliki kata sandi (jadi tidak ada yang bisa masuk sebagai pengguna Meme it) dan memiliki hak istimewa sistem file terbatas (e.g., akses langsung ke data) Sitemap SitemapERDDAP's instruksi untuk[Login](/docs/server-admin/deploy-install#tomcat)Sitemap
* Penggunaan Berat - Secara umumERDDAP™dibangun untuk penggunaan berat, termasuk oleh skrip yang membuat puluhan ribu permintaan, satu setelah yang lain. SulitERDDAP™untuk secara bersamaan membuka diri untuk penggunaan dan perisai yang sah berat itu sendiri dari penyalahgunaan. kadang-kadang sulit untuk membedakan penggunaan yang sah berat, penggunaan yang berlebihan sah, dan penggunaan illegitimate (dan kadang-kadang sangat mudah) Sitemap Di antara pertahanan lain,ERDDAP™secara sadar tidak memungkinkan permintaan tunggal untuk menggunakan fraksi inordinat dari sumber daya sistem (kecuali sistem tidak aktif) Sitemap
* Identify Troublesome Pengguna - JikaERDDAP™memperlambat atau membekukan (mungkin karena pengguna naif atau bot menjalankan beberapa skrip untuk mengirimkan beberapa permintaan secara bersamaan atau mungkin karena seorang pria yang buruk[Sitemap](https://en.wikipedia.org/wiki/Denial-of-service_attack)Login) Anda dapat melihat[Sitemap](#daily-report)  (dan informasi yang lebih identik di[ERDDAP™Login](#log)) yang menampilkan jumlah permintaan yang dibuat oleh pengguna yang paling aktif (Lihat alamat IP Requester (Sitemap) Sitemap) SitemapERDDAP™juga mengirim email ke administrator setiap kali ada Meme it["Kegiatan tidak biasa: &gt; 25% permintaan gagal"](#failed-requests)Sitemap Anda kemudian dapat melihat Meme itERDDAP™file log untuk melihat sifat permintaan mereka. Jika Anda merasa bahwa seseorang membuat terlalu banyak permintaan, permintaan aneh (Anda tidak akan percaya apa yang saya lihat, baik, mungkin Anda Meme it) , atau permintaan tipe serangan, Anda dapat menambahkan alamat IP mereka ke daftar hitam.
* Login Anda dapat menambahkan alamat IP pengguna yang bermasalah, bot, dan[Sitemap](https://en.wikipedia.org/wiki/Denial-of-service_attack)penyerang keERDDAP [Login](/docs/server-admin/datasets#requestblacklist), sehingga permintaan masa depan dari mereka akan segera ditolak. Pengaturan ini adadatasets.xmlsehingga Anda dapat dengan cepat menambahkan alamat IP ke daftar dan kemudian Meme it[Login](#flag)dataset sehinggaERDDAP™segera melihat dan menerapkan perubahan. Pesan kesalahan yang dikirim ke pengguna daftar hitam mendorong mereka untuk menghubungiERDDAP™administrator jika mereka merasa mereka telah salah menempatkan pada daftar hitam. (Dalam pengalaman kami, beberapa pengguna telah menyadari bahwa mereka menjalankan beberapa skrip secara bersamaan, atau skrip mereka membuat permintaan nonsense.) 
* Keamanan Dataset - Beberapa jenis dataset (Sitemap) memberikan risiko keamanan tambahan (e.g., SQL injeksi) dan memiliki langkah-langkah keamanan mereka sendiri. Lihat informasi untuk jenis dataset tersebut[Bekerja dengandatasets.xmlLogin](/docs/server-admin/datasets)Sitemap[EDDTableDari Database keamanan](/docs/server-admin/datasets#database-security)Sitemap
* Audit Keamanan -- LoginNOAAKeamanan TI menolak permintaan pemindaian selama bertahun-tahun, mereka sekarang secara rutin memindai saya (Login)  ERDDAP™Login Meskipun pemindaian awal menemukan beberapa masalah yang saya tetapkan, pemindaian berikutnya tidak menemukan masalah denganERDDAPSitemap Pemindaian khawatir tentang banyak hal: tidak dapat, karenatabledappermintaan terlihat seperti permintaan SQL, mereka khawatir tentang kerentanan injeksi SQL. Tetapi masalah-masalah tersebut tidak berdasar karena Meme itERDDAP™selalu parses dan memvalidasi kueri dan kemudian secara terpisah membangun query SQL dengan cara yang menghindari kerentanan injeksi. Hal lain mereka kadang-kadang mengeluh tentang adalah bahwa kitaJavaversi atau versi Tomcat tidak seperti up-to-date karena mereka ingin, jadi kami memperbaruinya dalam menanggapi. Saya sebelumnya ditawarkan untuk menunjukkan laporan keamanan, tapi saya sekarang mengatakan saya tidak bisa melakukannya.

#### Pertanyaan? Saran?{#questions-suggestions} 
Jika Anda memiliki pertanyaan tentangERDDAP'Sistem keamanan atau memiliki pertanyaan, keraguan, kekhawatiran, atau saran tentang bagaimana diatur, lihat kami[bagian untuk mendapatkan dukungan tambahan](/docs/intro#support)Sitemap
    

## Hal yang Anda Tidak Perlu Tahu{#things-you-dont-need-to-know} 

Ini adalah rincian bahwa Anda tidak perlu tahu sampai kebutuhan muncul.

### SitemapERDDAP™ {#second-erddap} 
*    **Menyiapkan KeduaERDDAP™untuk Pengujian / Pengembangan**   
Jika Anda ingin melakukan ini, ada dua pendekatan:
    *    (Login) Menginstal Tomcat danERDDAP™di komputer selain komputer yang memiliki publik AndaERDDAPSitemap Jika Anda menggunakan komputer pribadi Anda:
        1. Lakukan satu langkah instalasi pada satu waktu. Dapatkan Tomcat dan berjalan terlebih dahulu.
Ketika Tomcat berjalan, Tomcat Manager harus berada di
            [ http://127.0.0.1:8080/manager/html/ ](http://127.0.0.1:8080/manager/html/)  (atau mungkin[ http://localhost:8080/manager/html/ ](http://localhost:8080/manager/html/)) 
        2. LoginERDDAPSitemap
        3. Jangan gunakan ProxyPass untuk menghilangkan nomor port dariERDDAP™URL
        4. Sitemap[WordPress.org](/docs/server-admin/deploy-install#setupxml)set baseUrl ke http://127.0.0.1:8080
 
        5. Setelah Anda memulai iniERDDAP™Anda harus dapat melihatnya di Meme it
            [ http://127.0.0.1:8080/erddap/status.html ](http://127.0.0.1:8080/erddap/status.html)  (atau mungkin[ http://localhost:8080/erddap/status.html ](http://localhost:8080/erddap/status.html)) 
#### Login{#second-tomcat} 
*    (Terbaik Kedua) Instal Tomcat lain di komputer yang sama seperti publik AndaERDDAPSitemap
    1. Lakukan satu langkah instalasi pada satu waktu. Dapatkan Tomcat dan berjalan terlebih dahulu.
Mengubah semua nomor port yang terkait dengan Tomcat kedua (g., ubah 8080 hingga 8081)   (Login[Beberapa Tomcat Bagian Instances](https://tomcat.apache.org/tomcat-8.0-doc/RUNNING.txt)setengah arah melalui dokumen itu) Sitemap
    2. LoginERDDAP™di Tomcat baru.
    3. Jangan gunakan ProxyPass untuk menghilangkan nomor port dariERDDAP™URL
    4. Sitemap[WordPress.org](/docs/server-admin/deploy-install#setupxml)set baseUrl ke http://www.*yourDomainName*:8081
 
    5. Setelah Anda memulai iniERDDAP™Anda harus dapat melihatnya di Meme it
         http://www.*yourDomainName*:8081/erddap/status.html   
             
### Drive Negara Padat{#solid-state-drives} 
*    **Drive Negara Padat (Login) bagus&#33;**   
Cara tercepat, termudah, dan termurah untuk mempercepatERDDAP's akses ke data tabel adalah untuk menempatkan file data pada Solid State Drive (Login) Sitemap Sebagian besar set data tabel relatif kecil, sehingga SSD 1 atau 2 TB mungkin cukup untuk menahan semua file data untuk semua set data tabel Anda. SSD akhirnya memakai apakah Anda menulis data ke sel, menghapusnya, dan menulis data baru ke sel itu terlalu banyak kali. Jadi jika Anda hanya menggunakan SSD Anda untuk menulis data sekali dan membaca banyak kali, bahkan SSD kelas konsumen harus bertahan lama, mungkin jauh lebih lama dari hard Disk Drive (Login) Sitemap SSD kelas konsumen sekarang murah (di 2018, ~ $ 200 untuk 1 TB atau ~ $ 400 untuk 2 TB) dan harga masih jatuh cepat. SitemapERDDAP™mengakses file data, SSD menawarkan latency yang lebih pendek (~0.1ms, versus ~ 3ms untuk HDD, versus ~ 10 (Sitemap) ms untuk RAID, versus ~ 55ms untuk Amazon S3) dan throughput lebih tinggi (~ 500 MB / S, versus ~ 75 MB / s untuk HDD, versus ~ 500 MB / s untuk RAID) Sitemap Jadi Anda bisa mendapatkan dorongan kinerja yang besar (hingga 10X versus HDD) di $200&#33; Dibandingkan dengan sebagian besar perubahan yang mungkin untuk sistem Anda (server baru untuk $ 10.000? RAID baru untuk $ 35,000? switch jaringan baru untuk $ 5000? Sitemap) , ini sejauh pengembalian investasi terbaik (Login) Sitemap Jika / ketika SSD mati (di 1, 2, ... 8 tahun) , gantinya. Jangan mengandalkannya untuk jangka panjang, penyimpanan arsip data, hanya untuk salinan front-end data.\\[SSD akan sangat bagus untuk data gridded, juga, tetapi kebanyakan dataset gridded jauh lebih besar, membuat SSD sangat mahal.\\]
    
Jika server Anda tidak dimuat dengan memori, memori tambahan untuk server Anda juga merupakan cara yang bagus dan relatif murah untuk mempercepat semua aspekERDDAPSitemap
     
    
### [Beban Berat / Kontras](#heavy-loads--constraints) **  {#heavy-loads--constraints} 
Dengan penggunaan berat, berdiri sendiriERDDAP™mungkin dibatasi oleh berbagai masalah. Untuk informasi lebih lanjut, lihat[daftar kendala dan solusi](/docs/server-admin/scaling#heavy-loads--constraints)Sitemap
     
### Jaringan, Cluster, dan Federasi{#grids-clusters-and-federations} 
Di bawah penggunaan yang sangat berat, satu standaloneERDDAP™akan berjalan menjadi salah satu atau lebih kendala dan bahkan solusi yang disarankan tidak mencukupi. Untuk situasi seperti itu,ERDDAP™memiliki fitur yang memudahkan membangun grid yang dapat diukur (juga disebut cluster atau federasi) LoginERDDAPyang memungkinkan sistem untuk menangani penggunaan yang sangat berat (e.g., untuk pusat data besar) Sitemap Untuk informasi lebih lanjut, lihat[grid, cluster, dan federasiERDDAPLogin](/docs/server-admin/scaling)Sitemap
     
### Login{#cloud-computing} 
Beberapa perusahaan mulai menawarkan[layanan komputasi cloud](https://en.wikipedia.org/wiki/Cloud_computing)  (Login[Layanan Web Amazon](https://aws.amazon.com/)) Sitemap[Web hosting perusahaan](https://en.wikipedia.org/wiki/Web_hosting_service)telah menawarkan layanan yang lebih sederhana karena layanan mid-1990, tetapi layanan "cloud" telah sangat memperluas fleksibilitas sistem dan berbagai layanan yang ditawarkan. Anda dapat menggunakan layanan ini untuk mengatur satuERDDAP™atau grid / klusterERDDAPs untuk menangani penggunaan yang sangat berat. Untuk informasi lebih lanjut, lihat[komputasi cloud denganERDDAP™](/docs/server-admin/scaling#cloud-computing)Sitemap

### Login{#amazon} 
*    **[Layanan Web Amazon (Login) Ikhtisar Instalasi EC2](#amazon)**   
    [Layanan Web Amazon (Login) ](https://aws.amazon.com/)Sitemap[layanan komputasi cloud](https://en.wikipedia.org/wiki/Cloud_computing)yang menawarkan berbagai infrastruktur komputer yang dapat Anda sewakan per jam. Anda dapat menginstalERDDAP™Sitemap[Awan Compute Elastis (Login) ](https://aws.amazon.com/ec2/)Sitemap (nama mereka untuk komputer yang dapat Anda sewa oleh jam) Sitemap AWS memiliki sangat baik[Panduan Pengguna AWS](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html)dan Anda dapat menggunakan Google untuk menemukan jawaban atas pertanyaan tertentu yang mungkin Anda miliki. Brace sendiri -- itu adalah jumlah kerja yang adil untuk memulai. Tapi setelah Anda mendapatkan satu server dan berjalan, Anda dapat dengan mudah menyewakan banyak sumber daya tambahan (server, database, SSD-space, dll.) Anda perlu, dengan harga yang wajar.\\[Ini bukan rekomendasi atau dukungan Layanan Web Amazon. Ada penyedia cloud lainnya.\\]
    
Gambaran keseluruhan hal yang perlu Anda lakukan untuk mendapatkanERDDAP™berjalan di AWS adalah:
    
    * Secara umum, Anda akan melakukan semua hal yang dijelaskan dalam[Panduan Pengguna AWS](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html)Sitemap
    * Mengatur akun AWS.
    * Mengatur pengguna AWS dalam akun tersebut dengan hak istimewa administrator. Masuk sebagai pengguna ini untuk melakukan semua langkah-langkah berikut.
    * Penyimpanan Blok Elastis (Login) adalah setara AWS dari hard drive yang melekat pada server Anda. Beberapa ruang EBS akan dialokasikan ketika Anda pertama kali membuat instance EC2. Penyimpanan terus-menerus - informasi tidak hilang ketika Anda menghentikan instance EC2 Anda. Dan jika Anda mengubah jenis instance, ruang EBS Anda secara otomatis terlampir ke instance baru.
    * Buat alamat IP elastis sehingga instance EC2 Anda memiliki URL yang stabil, publik (bertentangan dengan hanya URL pribadi yang berubah setiap kali Anda restart instance Anda) Sitemap
    * Membuat dan memulai instance EC2 (Login) Sitemap Ada berbagai macam[jenis contoh](https://aws.amazon.com/ec2/instance-types/), masing-masing dengan harga yang berbeda. Contoh m4.besar atau m4.xlarge kuat dan mungkin cocok untuk sebagian besar kegunaan, tetapi pilih apa pun yang memenuhi kebutuhan Anda. Anda mungkin ingin menggunakan Amazon Linux sebagai sistem operasi.
    * Jika komputer desktop/laptop Anda adalah komputer Windows, Anda dapat menggunakan[Login](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/putty.html)Klien SSH gratis untuk Windows, untuk mendapatkan akses ke baris perintah EC2 Anda. Atau, Anda mungkin memiliki beberapa program SSH lainnya yang Anda sukai.
    * Ketika Anda masuk ke instance EC2 Anda, Anda akan login sebagai pengguna administratif dengan nama pengguna "ec2-user". ec2-user memiliki hak istimewa sudo. Jadi, ketika Anda perlu melakukan sesuatu sebagai pengguna akar, gunakan: sudo *Login* 
    * Jika komputer desktop/laptop Anda adalah komputer Windows, Anda dapat menggunakan[Login](https://stackoverflow.com/questions/16744863/connect-to-amazon-ec2-file-directory-using-filezilla-and-sftp)Program SFTP gratis, untuk mentransfer file ke / dari instance EC2 Anda. Atau, Anda mungkin memiliki beberapa program SFTP lain yang Anda sukai.
    *   [Instal Apache](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/install-LAMP.html)pada instance EC2 Anda.
    * Ikuti standar[ERDDAP™instruksi instalasi](/docs/server-admin/deploy-install)Sitemap
         
### Login{#waitthentryagain-exception} 
Pengguna mungkin mendapatkan pesan kesalahan seperti Meme it
Login
Ada (sementara?) Sitemap Tunggu satu menit, lalu coba lagi. (Di browser, klik tombol Reload.)   
Detail: GridDataAccessor.increment: parsial\\[Sitemap\\]="123542730" diharapkan menjadi "123532800".

Penjelasan umum dari WaitThenTryAgainException adalah:
SitemapERDDAP™menanggapi permintaan pengguna, mungkin ada kesalahan yang tidak terduga dengan dataset (e.g., kesalahan saat membaca data dari file, atau kesalahan mengakses dataset jarak jauh) Sitemap Sinyal WaitThenTryAgain untukERDDAP™bahwa permintaan gagal (Sitemap) tapiERDDAP™harus mencoba untuk memuat ulang dataset dengan cepat (panggilan[Login](#requestreloadasap)) dan mencoba permintaan. Seringkali, ini berhasil, dan pengguna hanya melihat bahwa tanggapan atas permintaan lambat. Kali-waktu lain, reload gagal atau terlalu lambat, atau upaya berikutnya untuk menghadapi permintaan juga gagal dan membuang WaitThenTryAgain lain. Jika terjadi,ERDDAP™menandai dataset untuk memuat ulang tetapi memberitahu pengguna (melalui pengecualian WaitThenTryAgain) bahwa ada kegagalan sambil menanggapi permintaan. Meme it

Itu adalah perilaku normal. Sistem ini dapat menangani banyak masalah umum.
Tetapi dimungkinkan untuk sistem ini untuk dipicu secara berlebihan. Penyebab paling umum adalahERDDAPpemuatan dataset tidak melihat masalah, tetapiERDDAPrespon atas permintaan data tidak melihat masalah. Tidak peduli apa penyebabnya, solusinya adalah untuk Anda berurusan dengan apa pun yang salah dengan dataset. Lihat log.txt untuk melihat pesan kesalahan dan kesepakatan yang sebenarnya dengan masalah. Jika banyak file memiliki header yang valid tetapi data yang tidak valid (file yang rusak) , ganti file dengan file yang tidak rusak. Jika koneksi ke RAID adalah flakey, memperbaikinya. Jika koneksi ke layanan jarak jauh flakey, temukan cara untuk membuatnya tidak flakey atau mengunduh semua file dari sumber jarak jauh dan melayani data dari file lokal.

Penjelasan rinci tentang kesalahan tertentu (Sitemap) Sitemap
Untuk setiapEDDGridLoginERDDAP™menjaga nilai variabel sumbu dalam memori. Mereka digunakan, misalnya, untuk mengkonversi nilai sumbu yang diminta yang menggunakan " () "format ke nomor indeks. Misalnya, jika nilai sumbu "10, 15, 20, 25", permintaan (20 g) akan ditafsirkan sebagai permintaan indeks #2 (indeks berbasis 0) Sitemap SitemapERDDAP™mendapat permintaan data dan mendapatkan data dari sumber, itu memverifikasi bahwa nilai sumbu yang diperoleh dari sumber sesuai dengan nilai sumbu dalam memori. Biasanya, mereka melakukannya. Tapi kadang-kadang sumber data telah berubah dengan cara yang signifikan: misalnya, nilai indeks dari awal variabel sumbu dapat dihapus (e.g., "10, 15, 20, 25" mungkin telah menjadi "20, 25, 30") Sitemap Jika terjadi, jelas bahwa Meme itERDDAPPenafsiran atas permintaan (Sitemap (20 g) " adalah indeks #2) sekarang salah. LoginERDDAP™membuang pengecualian dan panggilan RequestReloadASAP.ERDDAP™akan memperbarui dataset segera (sering dalam beberapa detik, biasanya dalam satu menit) Sitemap Masalah lain yang serupa juga membuang pengecualian WaitThenTryAgain.
    
#### Login{#requestreloadasap} 
Anda dapat melihat RequestReloadASAP dalam file log.txt tepat setelah pesan kesalahan dan sering di dekat[Login](#waitthentryagain-exception)Sitemap Ini pada dasarnya adalah cara internal, programmatik untukERDDAP™untuk mengatur[Login](#flag)untuk sinyal bahwa dataset harus diisi ulang ASAP.
     
### File Tidak Dihapus{#files-not-being-deleted} 
Untuk beberapaERDDAP™instalasi, ada masalah dengan beberapa file sementara yang diciptakan olehERDDAP™tetap terbuka (Sitemap) dan dengan demikian tidak dihapus. Dalam beberapa kasus, banyak file ini telah mengumpulkan dan mengambil jumlah ruang disk yang signifikan.

Mudah-mudahan, masalah ini tetap (SitemapERDDAP™g) Sitemap Jika Anda melihat masalah ini, silakan email direktori+ nama file offending ke Chris. John di noaaa.gov. Anda memiliki beberapa pilihan untuk berurusan dengan masalah:

* Jika file tidak besar dan tidak menyebabkan Anda untuk menjalankan ruang disk, Anda dapat mengabaikan masalah.
* Solusi paling sederhana adalah mematikan tomcat/ERDDAP™  (setelah jam sehingga pengguna yang lebih sedikit dipengaruhi) Sitemap Selama shutdown, jika sistem operasi tidak menghapus file, menghapusnya dengan tangan. Kemudian restartERDDAPSitemap
         
### Login{#json-ld} 
*    **[Semantic Markup Dataset dengan json-ld (Login Database) ](#json-ld)**   
    ERDDAP™Sitemap[Login (Login Database) ](https://json-ld.org)untuk membuat katalog data dan bagian dataset Anda[web semantik](https://en.wikipedia.org/wiki/Semantic_Web), yang merupakan ide Tim Berners-Lee untuk membuat konten web lebih mudah dibaca dan mesin "tertahan". Penggunaan konten json-ld[Login](https://schema.org/)syarat dan definisi. mesin pencari ([Google khususnya](https://developers.google.com/search/docs/data-types/datasets)) dan alat semantik lainnya dapat menggunakan markup terstruktur ini untuk memudahkan penemuan dan mengindeks. Penandaan terstruktur json-ld muncul sebagai tak terlihat-ke-humans&lt;Login kode pada https://.../erddap/info/index.html Sitemap (yang merupakan web semantik[Catalog](https://schema.org/DataCatalog)) dan masing-masing https://.../erddap/info/*datasetID*/index.html Sitemap (yang merupakan web semantik[Login](https://schema.org/Dataset)) Sitemap (Terima kasih khusus kepada Adam Leadbetter dan Rob Fuller dari Marine Institute di Irlandia untuk melakukan bagian keras dari pekerjaan untuk membuat bagian ini dariERDDAPSitemap)   
     
### URL{#out-of-date-urls} 
Slowly tapi pasti, URL yang penyedia data telah ditulis ke dalam file data menjadi out-of-date (SitemaphttpSitemaphttps, situs web diatur ulang, dan organisasi seperti NODC / NGDC / NCDC diatur ke NCEI) Sitemap Hasil tautan yang rusak adalah masalah yang pernah dihadapi oleh semua situs web. Berurusan dengan ini,ERDDAP™sekarang memiliki sistem untuk secara otomatis memperbarui URL terbaru. Sitemap Xml melihat URL kedaluwarsa, menambahkan URL terkini ke&lt;addAttributesSitemap Juga, ketika beban dataset, jikaERDDAP™melihat URL kedaluwarsa, secara diam-diam mengubahnya ke URL terbaru. Perubahan dikontrol oleh serangkaian pencarian-untuk/ganti-dengan pasangan yang didefinisikan&lt;Login SitemapERDDAPSitemap
\\[Login\\]/webapps/erddap/WEB-INF/classes/gov/noa/pfel/erddap/util/messages.xml file. Anda dapat melakukan perubahan di sana. Jika Anda memiliki saran untuk perubahan, atau jika Anda berpikir ini harus berubah menjadi layanan (seperti Konverter) Email Chris. John di noaaa.gov.
     
### Login{#cors} 
* Login ([Berbagi Sumber Daya Lintas-Origin](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing))   
"ada mekanisme yang memungkinkan sumber daya terbatas (SitemapERDDAP™Sitemap) di halaman web yang diminta dari domain lain di luar domain dari mana sumber daya pertama disajikan" (Arun Ranganathan) Sitemap Pada dasarnya, CORS adalah pesan yang dapat dimasukkan ke dalam header HTTP respon, mengatakan pada dasarnya, "baik saja dengan situs ini jika situs lain tertentu (yang spesifik, atau semua) ambil sumber daya (Sitemap) dari situs ini dan membuatnya tersedia di situs mereka. Jadi, itu adalah alternatif untuk Meme it[Login](https://en.wikipedia.org/wiki/JSONP)Sitemap
    
Para pengembangERDDAP™tidak mengklaim sebagai ahli keamanan. Kami tidak sepenuhnya jelas tentang masalah keamanan yang berkaitan dengan CORS. Kami tidak ingin membuat pernyataan yang membahayakan keamanan. Jadi kita hanya akan tetap netral dan meninggalkannya ke setiap Meme itERDDAP™admin untuk memutuskan apakah manfaat atau mengaktifkan header CORS bernilai risiko. Seperti biasa, jika AndaERDDAP™memiliki dataset pribadi, itu adalah ide yang baik untuk berhati-hati ekstra tentang keamanan.
    
Jika Anda ingin mengaktifkan CORS untuk AndaERDDAP™, ada[instruksi yang tersedia](https://enable-cors.org/index.html)menjelaskan bagaimana administrator situs web dapat mengaktifkan header CORS melalui perangkat lunak server tingkat bawah mereka (Login Apache atau nginx) Sitemap
    
### Login{#palettes} 
* Palet digunakan olehERDDAP™untuk mengubah berbagai nilai data menjadi berbagai warna ketika membuat grafik dan peta.
    
Setiap palet didefinisikan dalam file palet .cpt-style yang digunakan oleh[Login](https://www.soest.hawaii.edu/gmt/)Sitemap SitemapERDDAP™.cpt file valid GMT .cpt file, tapi sebaliknya tidak benar. Untuk digunakanERDDAP™file .cpt memiliki:
    
    * Garis komentar opsional pada awal file, dimulai dengan "#".
    * Bagian utama dengan deskripsi segmen palet, satu segmen per garis. Setiap lini deskripsi segmen memiliki nilai 8:
Sitemap Nilai, startRed, mulai Hijau, mulai Biru, endValue, endRed, endGreen, endBlue.
Ada sejumlah segmen.ERDDAP™menggunakan interpolasi linier antara startRed / Hijau / Biru dan endRed / Hijau / Biru dari setiap segmen.
        
Kami merekomendasikan bahwa setiap segmen menentukan warna awal dan akhir yang berbeda, dan bahwa warna awal setiap segmen sama dengan warna akhir segmen sebelumnya, sehingga palet menggambarkan campuran warna terus menerus.ERDDAP™memiliki sistem untuk membuat on-the-fly palet warna diskrit dari palet dengan campuran terus menerus warna. LoginERDDAP™pengguna dapat menentukan apakah mereka ingin palet untuk terus menerus (asli) atau Diskrit (berasal dari aslinya) Sitemap Tapi ada alasan yang sah untuk tidak mengikuti rekomendasi ini untuk beberapa palet.
        
    * StartValue dan endValues harus masuk.
Segmen pertama harus memiliki startValue=0 dan endValue=1.
Segmen kedua harus memiliki startValue=1 dan endValue=2.
Sitemap
    * Nilai merah, hijau, dan biru harus masuk dari 0 (Login) ... 255 (Sitemap) Sitemap
    * Akhir dari file harus memiliki 3 baris dengan:
        1. Warna rgb latar belakang untuk nilai data kurang dari bar warna minimum, misalnya: B 128 128 128
Ini sering startRed, startGreen, dan startBlue dari segmen pertama.
        2. Warna rgb foreground untuk nilai data lebih dari bar warna maksimum, misalnya: F 128 0
Ini sering endRed, endGreen, dan endBlue dari segmen terakhir.
        3. Warna rgb untuk nilai data NaN, misalnya, N 128 128 128
Ini sering abu-abu tengah (128 g) Sitemap
    * Nilai pada setiap baris harus dipisahkan oleh tab, tanpa ruang yang luar biasa.
    
Contoh file .cpt adalah BlueWhiteRed.cpt:
    
g Ini adalah BlueWhiteRed.cpt.
0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 255 255
2 0 255 255 3 255 255 255
3 255 255 255 4 255 255 0
4 255 255 0 5 255 0 0
0 0 0 0 0 0 0 0 0 0
G 0 0 0
G 1 0 0
N 128 128 128
    
Lihat file .cpt yang ada untuk contoh lain. Jika ada masalah dengan file .cpt,ERDDAP™mungkin akan membuang kesalahan ketika file .cpt parsed (yang lebih baik dari penyalahgunaan informasi) Sitemap
    
Anda dapat menambahkan palet tambahan untukERDDAPSitemap Anda dapat membuat mereka sendiri atau menemukan mereka di web (misalnya, pada[Login](http://soliton.vm.bytemark.co.uk/pub/cpt-city/)) meskipun Anda mungkin harus mengedit format mereka sedikit sesuai dengan Meme itERDDAPPersyaratan .cpt. SitemapERDDAP™untuk menggunakan file .cpt baru, menyimpan file di *Login* /webapps/erddap/WEB-INF/cptfiles (Anda harus melakukan itu untuk setiap versi baru dariERDDAP) dan keduanya:
    
    * Jika Anda menggunakan pesan default.xml file: tambahkan nama file ke&lt;palet&gt; tag dalam
         *Login* /webapps/erddap/WEB-INF/classes/gov/noa/pfel/erddap/util/messages.xml.
Jika Anda melakukan ini, Anda perlu melakukannya setiap kali Anda meningkatkanERDDAPSitemap
    * Jika Anda menggunakan pesan kustom.xml file: tambahkan nama file ke&lt;palet&gt; tag dalam pesan kustom Anda.xml file: *Login* WordPress.org Jika Anda melakukan ini, Anda hanya perlu melakukannya sekali (tapi ada pekerjaan lain untuk menjaga pesan kustom.xml file) Sitemap
    
Kemudian restartERDDAP™SitemapERDDAP™melihat perubahan. Keuntungan dari pendekatan ini adalah Anda dapat menentukan urutan palet dalam daftar yang disajikan kepada pengguna. Jika Anda menambahkan koleksi, kami mendorong Anda untuk menambahkan awalan dengan penulis awal (SitemapKT\\_Sitemap) untuk nama setiap palet untuk mengidentifikasi koleksi dan sehingga dapat ada beberapa palet yang akan memiliki nama yang sama.
    
Jangan menghapus atau mengubah palet standar. Mereka adalah fitur standar dari semuaERDDAP™Login Jika Anda berpikir palet atau koleksi palet harus disertakan dalam standarERDDAP™distribusi karena itu /mereka akan digunakan umum, silakan email mereka ke Chris. John di noaaa.gov.
    
### Login{#colorbars} 
*    **SitemapERDDAP™menghasilkan warna di bilah warna?** 
    
    1. Pengguna memilih salah satu yang telah ditentukan[Login](#palettes)atau menggunakan default, misalnya, Rainbow. Palet disimpan / didefinisikan dalam file Meja Palet Warna GMT-style.cpt. SitemapERDDAPpalet yang telah ditentukan memiliki kisaran bilangan bulat sederhana, misalnya, 0 hingga 1 (jika ada satu bagian dalam palet) , atau 0 sampai 4 (jika ada empat bagian dalam palet) Sitemap Setiap segmen dalam file mencakup n ke + 1, mulai pada n=0.
    2.  ERDDAP™menghasilkan file .cpt baru on-the-fly, dengan menyesali kisaran palet yang ditentukan (g., 0) ke kisaran palet yang diperlukan oleh pengguna (g.) dan kemudian menghasilkan bagian dalam palet baru untuk setiap bagian palet baru (misalnya, skala log dengan centang di 0,1, 0,5, 1, 5, 10, 50 akan memiliki 5 bagian) Sitemap Warna untuk titik akhir setiap bagian dihasilkan dengan menemukan bagian yang relevan dari palet dalam file .cpt, kemudian secara linear mengganggu nilai R, G, dan B. (Itu sama dengan bagaimana GMT menghasilkan warna dari file Meja Warna.) Sistem ini memungkinkanERDDAP™untuk memulai dengan palet generik (e.g., Rainbow dengan 8 segmen, dalam rentang total 0 hingga 8) dan membuat palet kustom on-the-fly (e.g., Rainbow kustom, yang peta 0,1 hingga 50 mg / L ke warna pelangi) Sitemap
    3.  ERDDAP™kemudian menggunakan file .cpt baru untuk menghasilkan warna untuk setiap pixel berwarna yang berbeda di bilah warna (dan kemudian untuk setiap titik data saat merencanakan data pada grafik atau peta) , lagi dengan menemukan bagian yang relevan dari palet dalam file .cpt, kemudian secara linear mencemari nilai R, G, dan B.
    
Proses ini mungkin tampak sangat rumit. Tetapi memecahkan masalah yang berkaitan dengan skala log yang sulit untuk memecahkan cara lain.
    
Jadi bagaimana Anda bisa meniru apaERDDAP™lakukan? Itu tidak mudah. Pada dasarnya Anda perlu menggandakan proses yang Meme itERDDAP™menggunakan. Jika Anda adalahJavaprogrammer, Anda dapat menggunakan yang samaJavakelasERDDAP™menggunakan untuk melakukan semua ini:
     *Login* /webapps/erddap/WEB-INF/classes/gov/noa/pfel/coastwatch/sgt/CompoundColorMap.java.
    
### Panduan untuk Sistem Distribusi Data{#guidelines-for-data-distribution-systems} 
Lebih banyak pendapat umum tentang desain dan evaluasi sistem distribusi data dapat ditemukan[Sitemap](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html)Sitemap
     
### Login{#archiveadataset} 
SitemapERDDAP™instalasi adalah alat baris perintah yang disebut ArsipADataset yang dapat membantu Anda membuat arsip (Sitemap.zipSitemap.tar.gzLogin) dengan bagian atau semua dataset disimpan dalam serangkaian netcdf-3.ncfile data dalam format file yang cocok untuk pengajuanNOAA's NCEI arsip (.ncuntuk dataset gridded atau[.ncLogin](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA)untuk set data tabel, sebagaimana ditentukan oleh[LoginNetCDFTemplate v2.0](https://www.ncei.noaa.gov/data/oceans/ncei/formats/netcdf/v2.0/index.html)) Sitemap

Login Dataset dapat membuat dua format arsip yang berbeda:

* Format "asli" berikut ini[Sitemap](https://www.ncdc.noaa.gov/atrac/guidelines.html), panduan ini untuk[Mengumpulkan Data Anda di NCEI](https://sites.google.com/a/noaa.gov/ncei-ioos-archive/cookbook?pli=1)dan terkait[Praktik untuk Memastikan Integritas Data](https://sites.google.com/a/noaa.gov/ncei-ioos-archive/cookbook/data-integrity)Sitemap
* Format "BagIt" membuat[File Folder](https://en.wikipedia.org/wiki/BagIt)Format arsip standar yang dipromosikan oleh Perpustakaan Kongres AS, sebagaimana ditentukan oleh[Spesifikasi BagIt v0.97](https://tools.ietf.org/html/draft-kunze-bagit-14)SitemapNOAA's NCEI dapat menstandardisasi file BagIt untuk mengirimkan arsip.

Tidak heran,[metadata global dan variabel](/docs/server-admin/datasets#global-attributes)LoginERDDAP™mendorong/pertanyaan hampir persis yang sama dalam file CF dan ACDD metadata yang NCEI mendorong/pertanyaan, sehingga semua dataset Anda harus siap untuk dikirim ke NCEI melalui[Login](https://www.nodc.noaa.gov/s2n/)Sitemap[Login](https://www.ncdc.noaa.gov/atrac/index.html)  (Alat Pelacakan dan Sumber Daya Lanjutan NCEI untuk Koleksi Arsip) Sitemap

Sitemap (LoginERDDAP™Login) menggunakan ArsipADataset untuk mengirimkan data ke NCEI, maka Anda (tidak NCEI) akan menentukan ketika mengirimkan chunk data ke NCEI dan apa yang chunk akan, karena Anda akan tahu ketika ada data baru dan bagaimana menentukan bahwa chunk (dan NCEI tidak akan) Sitemap Oleh karena itu, ArsipADataset adalah alat untuk Anda gunakan untuk membuat paket untuk mengirimkan ke NCEI.

Login Dataset mungkin berguna dalam situasi lain, misalnya, untukERDDAP™administrator yang perlu mengkonversi subset dataset (SitemapERDDAP) dari format file asli menjadi satu set[.ncfile CF](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA)sehingga publikERDDAP™dapat melayani data dari.ncFile CF bukan file asli.

Setelah Anda menyiapkanERDDAP™dan menjalankannya (setidaknya satu kali) Anda dapat menemukan dan menggunakan ArsipADataset di *Login* /webapps/erddap/WEB-INF direktori. Ada skrip shell (ArsipADataset.sh) untuk Linux / Unix dan file batch (Database) untuk Windows.

Pada Windows, pertama kalinya Anda menjalankan ArsipADataset, Anda perlu mengedit ArsipADataset. bat file dengan editor teks untuk mengubah jalan ke java. exe file sehingga Windows dapat menemukanJavaSitemap

Ketika Anda menjalankan ArsipADataset, itu akan meminta Anda serangkaian pertanyaan. Untuk setiap pertanyaan, ketik respons, lalu tekan Enter. Atau tekan ^C untuk keluar program setiap saat.

Atau, Anda dapat menempatkan jawaban atas pertanyaan, untuk memesan, di baris perintah. Untuk melakukan ini, menjalankan program sekali dan mengetik dan menulis jawaban Anda. Kemudian, Anda dapat membuat baris perintah tunggal (dengan jawaban sebagai parameter) yang menjalankan program dan menjawab semua pertanyaan.
Gunakan kata default jika Anda ingin menggunakan nilai default untuk parameter yang diberikan.
Gunakan "" (dua kutipan ganda) sebagai placeholder untuk string kosong.
Menentukan parameter pada baris perintah dapat sangat nyaman, misalnya, jika Anda menggunakan ArsipADataset sekali sebulan untuk menarsipkan sepadan data bulan. Setelah Anda telah menghasilkan baris perintah dengan parameter dan disimpan bahwa dalam catatan Anda atau dalam skrip shell, Anda hanya perlu membuat perubahan kecil setiap bulan untuk membuat arsip bulan itu.

Pertanyaan yang diajukan oleh ArsipADataset memungkinkan Anda untuk:

* Tentukan kemasan file asli atau Bagit. Untuk NCEI, gunakan Bagit.
* Spesifikasi zip atau tar.gzkompresi untuk paket. Untuk NCEI, gunakan tar.gzSitemap
* Tentukan alamat email kontak untuk arsip ini (READ\\_ME.txt) Sitemap
* TentukandatasetIDdataset yang ingin Anda arsip.
* Tentukan variabel data yang ingin Anda arsip (biasanya semua) Sitemap
* Tentukan subset dataset yang ingin Anda arsip. Anda perlu memformat subset dengan cara yang sama Anda akan memformat subset untuk permintaan data, sehingga akan berbeda untuk gridded daripada untuk dataset tabular.
    * Untuk dataset gridded, Anda dapat menentukan berbagai nilai dimensi paling kiri, biasanya itu adalah berbagai waktu. ArsipADataset akan membuat permintaan terpisah dan menghasilkan file data terpisah untuk setiap nilai dalam kisaran nilai. Karena dataset gridded biasanya besar, Anda hampir selalu harus menentukan kerabat subset kecil dengan ukuran seluruh dataset.
Sitemap\\[ (2015-12-01) Sitemap (2015-12-31) \\]\\[\\]\\[\\]\\[\\]
    * Untuk set data tabel, Anda dapat menentukan koleksi batasan, tetapi seringkali rentang waktu. Karena dataset tabular biasanya kecil, seringkali untuk menentukan tidak ada batasan, sehingga seluruh dataset diarsipkan.
Misalnya, & waktu&gt; = 2015-12-01 & waktu&lt;2016-01-01
* Untuk dataset tabular: tentukan daftar terpisah comma 0 atau lebih variabel yang akan menentukan bagaimana data yang diarsipkan lebih lanjut ke file data yang berbeda. Untuk dataset yang memiliki
    [cdm\\_data\\_type](/docs/server-admin/datasets#cdm_data_type)Sitemap|Profil|Login|Catalog
Anda harus hampir selalu menentukan variabel yang memiliki cf\\_role=timeseries\\_id (LoginstationID) atau cf\\_role=trajectory\\_id atribut. ArsipADataset akan membuat permintaan terpisah dan menghasilkan file data terpisah untuk setiap kombinasi nilai variabel ini, misalnya, untuk setiapstationIDSitemap
Untuk semua set data tabular lainnya, Anda mungkin tidak menentukan variabel untuk tujuan ini.
Sitemap Jika subset dataset Anda melengkung sangat besar (Datasheet) dan tidak ada variabel yang cocok untuk tujuan ini, maka ArsipADataset tidak dapat digunakan dengan dataset ini. Ini harus jarang.
* Tentukan format file untuk file data yang akan dibuat.
Untuk dataset gridded, untuk NCEI, gunakan.ncSitemap
Untuk set data tabel, untuk NCEI, gunakan[.ncLogin](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA)jika itu adalah pilihan; jika tidak menggunakan.ncSitemap
* Tentukan jenis file pencernaan untuk dibuat untuk setiap file data dan untuk seluruh paket arsip: MD5, SHA-1, atau SHA-256. pencernaan file menyediakan cara untuk klien (Sitemap) untuk menguji apakah file data telah menjadi rusak. Secara tradisional, ini[.md5 file](https://en.wikipedia.org/wiki/MD5)tapi sekarang ada pilihan yang lebih baik. Meme it Untuk NCEI, gunakan SHA-256.

Setelah Anda menjawab semua pertanyaan, ArsipADataset akan:

1. Membuat serangkaian permintaan dataset dan tahap file data yang dihasilkan dalam *Login* Sitemap *datasetIDLogin* Sitemap
Untuk dataset gridded, akan ada file untuk setiap nilai dimensi paling kiri (Sitemap) Sitemap Nama file akan menjadi nilai Meme it (e.g., nilai waktu) Sitemap
Untuk set data tabel, akan ada file untuk setiap nilai dari variabel ... (Login) Sitemap Nama file akan menjadi nilai itu. Jika ada lebih dari satu variabel, variabel kiri akan digunakan untuk membuat nama subdirectory, dan variabel paling tepat akan digunakan untuk membuat nama file.
Setiap file data harus&lt;2 g (maksimum diperbolehkan oleh.ncversi 3 file) Sitemap
2. Membuat file yang terkait dengan setiap file data dengan pencernaan file data. Misalnya, jika file data adalah 46088.ncdan jenis pencernaan adalah .sha256, maka file pencernaan akan memiliki nama 46088.nc.sha256 .
3. Buat file READ\\_ME.txt dengan informasi tentang arsip, termasuk daftar semua pengaturan yang Anda tentukan untuk menghasilkan arsip ini.
4. Membuat 3 file dalam *Login* /ArchiveADataset/ :
    
    * Login.zipSitemap.tar.gzarsip file bernama *datasetIDLogin* .zip  (Sitemap.tar.gz) berisi semua file data tahapan dan file pencernaan. File ini mungkin ukuran apa pun, hanya terbatas oleh ruang disk.
    * Sebuah file pencernaan untuk file arsip, misalnya, *datasetIDLogin* .zip.sha256.txt
    * Untuk jenis arsip, file teks bernama *datasetIDLogin* .zip.listOfFiles.txt (Sitemap.tar.gz) yang daftar semua file di Meme it.zip  (Sitemap.tar.gz) Login
    
Jika Anda menyiapkan arsip untuk NCEI, ini adalah file yang akan Anda kirim ke NCEI, mungkin melalui[Login](https://www.nodc.noaa.gov/s2n/)Sitemap[Login](https://www.ncdc.noaa.gov/atrac/index.html)  (Alat Pelacakan dan Sumber Daya Lanjutan NCEI untuk Koleksi Arsip) Sitemap
5. Hapus semua file yang ditahap sehingga hanya file arsip (Login.zip) , pencernaan (e.g., .sha256.txt) arsip, dan (Sitemap) .listOfFiles.txt file tetap.

#### Facebook Twitter Google Plus Pinterest Email Metadata File{#iso-19115-xml-metadata-files} 
Paket arsip ArsipADataset tidak termasuk file metadata ISO 19115.xml untuk dataset. Jika Anda ingin/digunakan untuk mengirimkan file ISO 19115 untuk dataset Anda ke NCEI, Anda dapat mengirimkan file metadata ISO 19115 .xml yangERDDAP™dibuat untuk dataset (LoginNMFSorang harus mendapatkan file ISO 19115 untuk dataset mereka dari InPort jikaERDDAP™belum melayani file tersebut) Sitemap

Masalah? Saran? ArsipADataset baru. Jika Anda memiliki masalah atau saran, Lihat kami[bagian untuk mendapatkan dukungan tambahan](/docs/intro#support)Sitemap
     
