---
title: "ERDDAP™ - Changes"
---
#  ERDDAP™ Login

 ERDDAP™ adalah contoh besar [Inovasi Pengguna](https://en.wikipedia.org/wiki/User_innovation) , di mana inovasi produk sering berasal dari konsumen ( ERDDAP™ Login) Tidak hanya produsen ( ERDDAP™ Login) Sitemap Selama bertahun-tahun, sebagian besar ide untuk fitur baru dan perubahan dalam ERDDAP™ datang dari pengguna. Pengguna yang dikreditkan di bawah ini untuk ide-ide hebat mereka. Sitemap Silahkan menyimpan saran-spesan besar yang datang&#33;

Berikut adalah perubahan yang terkait dengan masing-masing ERDDAP™ Sitemap

## Versi 2.28.1{#version-2281} 
 (dirilis 2025-09-05) 

*    **Sitemap ERDDAP™ Administrator Perlu Tahu dan Lakukan:** 
    * Dukungan ditambahkan untuk X-Forwarded-Prefix. Ini adalah kepentingan tertentu untuk admin menjalankan server di subpati. Silahkan baca dokumentasi terbaru kami untuk [Login](/docs/server-admin/deploy-install#apache) Login [Login](/docs/server-admin/deploy-install#nginx) Informasi lebih lanjut

Sitemap [Login](https://github.com/srstsavage) 

## Versi 2.28.0{#version-2280} 
 (dirilis 2025-08-29) 

*    **Fitur dan Perubahan Baru (untuk pengguna) Sitemap** 
    *    [Login](https://docs.mlcommons.org/croissant/docs/croissant-spec.html) sekarang tersedia. Admin dapat mengontrol apakah metadata default menggunakan Croissant, tetapi mulai dengan 2.28.0 Anda dapat meminta definisi Croissant untuk dengan jenis file ekspor baru ".croissant" (yang menyediakan file jsonld) Sitemap

*    **Sitemap ERDDAP™ Administrator Perlu Tahu dan Lakukan:** 
    * Docker Baru Gambar yang dibuat pada setiap permintaan tarik gabungan. Ini adalah build alfa, mereka tidak versi rilis. Mereka akan memiliki tag seperti "20250814T034025", yang menunjukkan ketika dibangun. Jika Anda ingin mencoba fitur terbaru yang dapat Anda gunakan ini. Jika Anda ingin menggunakan rilis kami dengan tag versi semantik (g. 2.28.0) Sitemap Kami selalu bertujuan untuk memiliki rilis alfa dapat digunakan, tetapi ada kurang pengujian bagi mereka dari rilis versi kami. Kami selalu merekomendasikan Anda menggunakan sesuatu setidaknya seperti rilis "latest" kami yang akan menjadi rilis versi semantik terbaru.

    * Login Gambar sekarang tersedia [Login](https://github.com/ERDDAP/erddap/pkgs/container/erddap) selain [Login](https://hub.docker.com/r/erddap/erddap) Sitemap

Sitemap [Login](https://github.com/ocefpaf) Login [Login](https://github.com/abkfenris) Login [Login](https://github.com/srstsavage) Sitemap [Login](https://github.com/MathewBiddle) untuk kontribusi mereka di sekitar Docker Images. Ini termasuk kontribusi pertama dari mereka kecuali @ststsavage&#33;
    
    * Sekarang dukungan untuk menghasilkan [Login](https://docs.mlcommons.org/croissant/docs/croissant-spec.html) Login Secara default. Anda dapat menonaktifkan skema Croissant di setup Anda.xml dengan (TIDAK MEMBUAT- Silahkan hubungi atau mengajukan masalah di GitHub jika Anda perlu melakukan ini) Sitemap
    ```
        <generateCroissantSchema>false</generateCroissantSchema>
    ```

    * Beberapa pengaturan memiliki nilai default mereka berubah. useHeadersForUrl dan useEddReflection sekarang baik default untuk benar. Jika mereka menyebabkan masalah dan Anda perlu mengatur mereka untuk palsu, silakan buat masalah. Tujuannya adalah untuk menghapusnya dalam rilis masa depan.

    * Beberapa pengaturan telah dihapus. useSharedWatchService dan redirectDocumentation ToGitHubIo telah ditetapkan untuk benar secara default untuk beberapa rilis dan cukup baik diuji pada titik ini. Menghapus ini diperbolehkan untuk beberapa pembersihan kode.

    * Beberapa perubahan kecil, perbaikan bug, dan optimasi.

*    **Sitemap ERDDAP™ Pengembang:** 
    * Banyak kode mati dihapus. Banyak peringatan tetap.

## Versi 2.27.0{#version-2270} 
 (dirilis 2025-06-11) 

*    **Fitur dan Perubahan Baru (untuk pengguna) Sitemap** 
    * Data baru untuk converter warnabar pada server di /erddap/convert/color.html

*    **Sitemap ERDDAP™ Administrator Perlu Tahu dan Lakukan:** 
    * Default behavoir adalah bahwa cache sekarang akan dibersihkan independen dari tugas dataset beban utama. Ini akan memungkinkan untuk menghapus file cache yang lebih andal dan teratur. Ada pekerjaan tambahan untuk meningkatkan server berperilaku ketika rendah di ruang disk (mengembalikan kesalahan untuk permintaan mungkin untuk membuat server keluar dari ruang, dan membersihkan cache lebih sering dalam keadaan disk rendah untuk mencoba untuk mencegah kesalahan) Sitemap Sitemap datasets.xml   (atau setup.xml) Anda dapat menambahkan / mengatur cache baru Jelaskan parameter untuk mengontrol seberapa sering server memeriksa untuk menghapus cache. Catatan, parameter cacheMinutes yang ada mengontrol usia file yang akan disimpan, cache baru ClearMinutes adalah untuk seberapa sering melakukan kekacauan.
    ```
        <cacheClearMinutes>15</cacheClearMinutes>
    ```
Anda dapat menonaktifkan cek yang jelas cache baru dengan mengatur tugasCacheClear untuk palsu dalam setup.xml, meskipun itu tidak dianjurkan.
Login ClearMinutes juga di [Database](/docs/server-admin/datasets#cacheclearminutes) Sitemap
    
    * Dukungan metadata dataset lokal. Ini mendukung lokalisasi nilai dalam addAttributes Sitemap Cukup tambahkan atribut dengan tag xml tambahan: lang. Misalnya untuk menambahkan judul Prancis ke dataset Anda addAttributes bagian akan mencakup:
    ```
        <att name="title">Data from a local source.</att>
        <att name="title" xml:lang="fr">Donn&#xE9;es provenant d'une source locale.</att>
    ```
Rincian tambahan yang tersedia di [Metadata database](/docs/server-admin/localized-metadata) Sitemap

    * Docker Baru Menentukan file dengan pilihan untuk SSL dan barebones Prometheus server. Berkat Shane St. Savage untuk SSL dan Jiahui Hu untuk Prometheus.

    * Dukungan untuk menggunakan informasi di header untuk menentukan URL server alih-alih mengandalkan file konfigurasi. Ini akan memungkinkan server untuk diakses oleh beberapa nama dan dapat menyederhanakan konfigurasi tertentu. Harap aktifkan dan kirim umpan balik.
    ```
        <useHeadersForUrl>true</useHeadersForUrl>
    ```

    * Beberapa perubahan kecil, perbaikan bug, dan optimasi.

*    **Sitemap ERDDAP™ Pengembang:** 
    * Refactor untuk bagaimana jenis file output didefinisikan dalam kode. Ini harus membuatnya sehingga jenis file dapat ditambahkan tanpa perlu menyentuh banyak tempat kode.

## Versi 2.26{#version-226} 
 (dirilis 2025-03-31) 

*    **Untuk Semua:** 
    * Pembaruan besar ke situs dokumentasi kami:https://erddap.github.io/
Selain tampilan yang diperbarui ada navigasi yang lebih baik, pencarian, terjemahan, dan harus lebih mudah untuk menjaga ke depan&#33;

*    **Fitur dan Perubahan Baru (untuk pengguna) Sitemap** 
    * Langganan dan RSS pembaruan harus terjadi lebih andal untuk dataset yang sering diperbarui dari perubahan file.

*    **Sitemap ERDDAP™ Administrator Perlu Tahu dan Lakukan:** 
    * Rilis default memerlukan / mendukung Java versi 21. Kembali dalam rilis ini dapat dengan mudah membuat Java 17 biner kompatibel.

    * Fitur baru untuk menyesuaikan informasi yang ditampilkan tentang set data di UI. Kami berharap ini sangat berguna untuk menambahkan hal-hal seperti eksitasi dataset. Untuk detail lebih lanjut, Anda dapat membaca [dokumentasi baru](/docs/server-admin/display-info) Sitemap Terima kasih kepada Ayush Singh untuk kontribusi&#33;

    * metrik Prometheus tambahan. Yang terbesar adalah ` http _request_duration_seconds` yang mencakup waktu respon permintaan rusak oleh: "request_type", "dataset_id", "dataset_type", "file_type", "lang_code", "status_code"
Format yang dapat dibaca mesin ini akan memungkinkan pengumpulan metrik yang lebih baik untuk memahami bagaimana pengguna menggunakan server.

    * Cara baru untuk menghasilkan file XML ISO19115. Menggunakan Apache SIS dan merupakan pilihan baru dalam rilis ini. Harap aktifkan dan kirim umpan balik.
    ```
        <useSisISO19115>true</useSisISO19115>
    ```

    * UI sekarang akan membuat tautan individual untuk setiap url di bidang seperti infoUrl dan ringkasan.

    * Langganan dan RSS pembaruan harus terjadi lebih andal untuk dataset yang sering diperbarui dari perubahan file. Jika ini menyebabkan masalah, silakan hubungi GitHub dan menonaktifkan fungsi dengan menambahkan bendera di bawah ini ke setup Anda.xml.
Sitemap
    ```
        <updateSubsRssOnFileChanges>false</updateSubsRssOnFileChanges>
    ```

    * Subset variabel tidak akan lagi dihasilkan secara otomatis untuk jenis dataset EDDTableDariNcCFFiles. Jika Anda mengandalkan perilaku, Anda dapat baik Meme it (solusi yang lebih disukai) Login subsetVariables untuk definisi dataset Anda datasets.xml , atau tambahkan bendera di bawah ini ke setup.xml Anda. Jika Anda merasa perlu untuk mengubah ini, silakan hubungi GitHub sehingga kami dapat lebih baik mendukung kasus penggunaan Anda bergerak maju.
Sitemap
    ```
    <includeNcCFSubsetVariables>true</includeNcCFSubsetVariables>
    ```

    * Server sekarang akan mengarahkan permintaan dokumentasi (di bawah download / yang merupakan dokumentasi yang telah dimigrasi) ke situs dokumentasi baru. Jika diperlukan Anda dapat menonaktifkan ini dengan bendera di setup.xml:
Sitemap
    ```
        <redirectDocumentationToGitHubIo>false</redirectDocumentationToGitHubIo>
    ```

    * Beberapa perubahan kecil dan perbaikan bug.

*    **Sitemap ERDDAP™ Pengembang:** 
    * Peningkatan kualitas kode dan pembersihan kode mati. Ini termasuk optimasi kecil, penanganan sumber daya yang lebih baik, dan memigrasikan jauh dari jenis data usang panjang (seperti vektor) Sitemap

    * Refactoring besar untuk EDStatic untuk menarik sebagian besar konfigurasi, pesan, dan kode metrik. Ini juga lebih enkapsulatisasi dan penanganan jalur direktori (2 terakhir ini lebih harus dilakukan.) 

    * Banyak kemajuan menuju Gambar Docker yang didukung secara resmi. Rencananya adalah untuk menyelesaikan dan melepaskan setelah ERDDAP™ 2.26 rilis tersedia.

## Versi 2.25{#version-225} 
 (dirilis 2024-10-31) 

*    **Fitur dan Perubahan Baru (untuk pengguna) Sitemap** 
    * EDDTableDaris sekarang dapat mendukung pertanyaan dengan hanya output yang berasal (global, skrip jexl, atau variabel) Sitemap
         
*    **Sitemap ERDDAP™ Administrator Perlu Tahu dan Lakukan:** 
    * Versi 2.25 membutuhkan Java 21 atau lebih baru. Ini adalah versi LTS dan telah tersedia selama lebih dari setahun.
         
    * The SharedWatchService sekarang default. Jika Anda perlu menonaktifkannya, silakan hubungi chris. john di noaa.gov untuk membiarkan saya tahu, jadi saya dapat meningkatkannya dalam versi masa depan dan menambahkan:
        &lt;Sitemap&lt;/useSharedWatchService&gt; untuk setup Anda.xml.
         
    * Login ERDDAP™ servlet sekarang akan mulai di server startup. Yang berarti dataset akan mulai memuat segera daripada menunggu sampai permintaan dibuat.
         
    * Parameter removeMVRows di EDDTableDariMultidimNcFiles sekarang akan memiliki efek. Menyiapkannya ke palsu mungkin secara signifikan mempercepat beberapa pertanyaan, tetapi ini mungkin tidak cocok untuk semua set data. Untuk informasi lebih lanjut [Deskripsi parameter](/docs/server-admin/datasets#removemvrows) Sitemap
         
    * Login (EDDTableDariNcFiles dan EDDGrid Login) menggunakan file zarr sekarang didukung. Mereka harus menyertakan "zarr" dalam fileNameRegex atau pathRegex. Sitemap [detik zarr dalam dokumentasi dataset](/docs/server-admin/datasets#zarr) untuk informasi lebih lanjut.
         
    * Jenis dataset baru, EDDTableDariParquetFiles sekarang didukung. Sitemap [EDDTableDariParquetFiles secion dalam dokumentasi dataset](/docs/server-admin/datasets#eddtablefromparquetfiles) untuk informasi lebih lanjut.
         
    *    [Prometheus metrik](https://prometheus.io/) sekarang tersedia di /erddap/metrik.
         
    * Implementasi parser XML baru tersedia. Parser baru ini memungkinkan menggunakan XInclude in datasets.xml Sitemap Berkat Ayush Singh untuk fitur.
         
    * parameter baru dalam datasets.xml untuk mengontrol email aktivitas yang tidak biasa. Sitemap Kegagalan default untuk nilai lama 25%. Berkat Ayush Singh untuk fitur.
         
    * Parameter baru dalam setup.xml yang mengontrol jika kesalahan pemuatan dataset ditampilkan pada halaman status.html. Secara default untuk benar, untuk menonaktifkan kesalahan dataset pada halaman status, set showLoadErrorsOnStatusPage untuk palsu:&lt;showLoadErrorsOnStatusPage&gt;false&lt;/showLoadErrorsOnStatusPage&gt;
         
    * Beberapa perubahan kecil dan perbaikan bug.
         
*    **Sitemap ERDDAP™ Pengembang:** 
    * Pengujian dipisahkan ke unit dan integrasi (Login) Sitemap Juga lebih banyak tes diaktifkan dan tes telah dibuat kurang flaky.
         
    * Prone Kesalahan (beberapa cek masih dinonaktifkan) dan Spot Bugs terintegrasi melalui Maven.
         
    * Basis kode penuh diformat untuk mencocokkan Panduan Gaya Google.
         

## Versi 2.24{#version-224} 
 (dirilis 2024-06-07) 

*    **Fitur dan Perubahan Baru (untuk pengguna) Sitemap** 
    * Palet warna baru EK80 untuk dataset akustik tersedia. Terima kasih kepada Rob Cermak untuk ini.
         
    * Memperbaiki masalah di mana EDDTableAggregateRows tidak menunjukkan kisaran yang tepat dari semua anak-anak. Berkat Marco Alba untuk laporan perbaikan dan bug.
         
*    **Sitemap ERDDAP™ Administrator Perlu Tahu dan Lakukan:** 
    * TO DO: CHANGE SECURITAS: Google Authentication mungkin memerlukan perubahan pada CSP Anda.
        
Secara spesifik, Anda mungkin juga perlu menambahkanhttps://accounts.google.com/gsi/styleuntuk stlye-src danhttps://accounts.google.com/gsi/untuk menghubungkan-src. Untuk script-src Anda sekarang dapat menggunakanhttps://accounts.google.com/gsi/client.
        
Untuk informasi lebih lanjut, Anda dapat pergi ke [Sitemap](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#content_security_policy) tentang konfigurasi CSP.
         
        
    * Layanan Watch Bersama Baru. Ini adalah pilihan baru untuk menonton direktori untuk pembaruan. Ini memiliki satu benang untuk setiap sistem file bukan satu benang per dataset. Kemungkinan besar ini akan secara drastis mengurangi jumlah benang yang digunakan untuk melihat perubahan. Ini berarti semua dataset diperbarui bersama-sama daripada setiap dataset memiliki frekuensi pembaruan sendiri. Kemungkinan besar ini akan berarti lebih sering update untuk sebagian besar dataset.
        
Untuk mengaktifkan add ini&lt;Sitemap&lt;/useSharedWatchService&gt; untuk setup Anda.xml.
        
          
Silahkan coba ini dan laporan kembali bagaimana bekerja untuk Anda untuk chris. WordPress.org
         
    * Perbaiki nama var yang salah dalam log. Berkat Ayush Singh untuk perbaikan.
         
    * Beberapa perubahan kecil dan perbaikan bug.
         
*    **Peningkatan ERDDAP™ pengembang:** 
    * Dukungan untuk pembangunan lokal menggunakan Docker. Terima kasih Matt Hopson dan Roje.
         
    * Dukungan untuk pengembangan lokal menggunakan perbaikan Jetty dan dokumentasi. Dan Wengren
         
    * Perubahan untuk menguji untuk mengurangi masalah lintas platform. Sitemap Mr. Victor Yang
         

## Versi 2.23{#version-223} 
 (dirilis 2023-02-27) 

Perhatikan bahwa rilis ini dilakukan oleh Bob Simons, sehingga menunjukkan bahwa dia masih sekitar dan aktif selama transisi ke Chris John, penerusnya. Bersantai dengan rilis ini, semua perubahan kode dilakukan oleh Chis John, kecuali ditentukan sebaliknya.

*    **Fitur dan Perubahan Baru (untuk pengguna) Sitemap** 
    *    (Login)   
         
*    **Sitemap ERDDAP™ Administrator Perlu Tahu dan Lakukan:** 
    * TO DO: CHANGE SECURITAS: Google Authentication sekarang dicapai melalui perpustakaan Layanan Identitas Google baru yang merupakan bagian dari "Sign In with Google". Dukungan Google untuk sistem "Google Sign In" lama akan dihentikan 2023-03-31. Jadi jika Anda menggunakan Google Authentication di Anda ERDDAP™ instalasi, Anda pembaruan MUST untuk ERDDAP™ v2.23+ sebelum itu. (Bob maaf untuk pemberitahuan singkat. Ini adalah kesalahan Bob.)   
         
    * IMPROVED: NCCSV sekarang v1.2. Perubahan adalah bahwa file sekarang UTF-8-encoded (mereka adalah ASCII) dan sekarang dapat menyertakan karakter Unicode seperti, tanpa pengkodean sebagai \\ u_hhhh_, meskipun itu masih diperbolehkan.
Saat menulis file NCCSV, ERDDAP™ sekarang menulis file v1.2.
         ERDDAP™ masih akan membaca file NCCSV yang mengikuti spesifikasi v1.0 dan v1.1.
Berkat Pauline-Chauvet, n-a-t-e, dan thogar-komputer untuk menyarankan ini dan melakukan tes untuk memastikan berbagai program spreadsheet dapat mengimpor file UTF-8. Berkat Bob Simons untuk perubahan kode ini.
         
    * BARU: Halaman web status.html sekarang memiliki garis di dekat bagian atas yang menunjukkan bahwa loadDataset dataset saat ini memuat dan statistik terkait, atau tidak ada dataset sedang dimuat. Ini bisa sangat membantu ERDDAP™ administrator mencoba mencari tahu mengapa beban Dataset memakan waktu lama. Juga, nGridDatasets, nTableDatasets, dan nTotalDatasets dihitung di bawah ini yang sekarang sesaat (sebelumnya, mereka adalah sebagai akhir dari beban utama terakhir Login) Sitemap
Perubahan ini untuk Roy Mendelssohn. Berkat Bob Simons untuk perubahan kode ini.
         
    * IMPROVED: GenerateDataset Xml sekarang berubah menjadi CF-1.10 (adalah CF-1.6) dalam atribut "Conventions".
Berkat Bob Simons untuk perubahan kode ini.
         
    * Beberapa perubahan kecil dan perbaikan bug.
         

## Versi 2.22{#version-222} 
 (dirilis 2022-12-08) 

Perhatikan bahwa rilis ini dilakukan oleh Bob Simons, sehingga menunjukkan bahwa dia masih sekitar dan aktif selama transisi ke penerusnya.

*    **Fitur dan Perubahan Baru (untuk pengguna) Sitemap** 
    *    (Login)   
         
*    **Sitemap ERDDAP™ Administrator Perlu Tahu dan Lakukan:** 
    * DILAKUKAN: tidak ada.
         
    * SECURITAS BUG FIX: Ada bug terkait Scripting Cross Site dalam kode untuk pemilihan bahasa turun. Sitemap NOAA pemindaian keamanan untuk menangkap ini. Ini menunjukkan bahwa NOAA keamanan aktif dan secara rutin mencari kelemahan keamanan dalam ERDDAP Sitemap
         
    * SECURITAS FIX: Banyak perpustakaan yang digunakan oleh ERDDAP™ diperbarui, seperti biasa, sebagai bagian dari rilis ini. Kali ini, ini termasuk memperbarui driver PostgreSQL (yang memiliki bug keamanan) ke 42.5.1.
         
    * IMPROVED: Lebih banyak perubahan kecil untuk ERDDAP Sistem manajemen memori harus mengurangi kemungkinan permintaan yang diberikan gagal karena kurangnya memori yang tersedia.
         
    * Beberapa perubahan kecil dan perbaikan bug.
         

## Versi 2.21{#version-221} 
 (dirilis 2022-10-09) 

*    **Fitur dan Perubahan Baru (untuk pengguna) Sitemap** 
    *    (Login)   
         
*    **Sitemap ERDDAP™ Administrator Perlu Tahu dan Lakukan:** 
    * TO DO: Untuk Java 17, Anda tidak boleh menggunakan \\-d64 di JAVA\\_OPTS dalam setenv.bat atau setenv.sh. Jadi jika ada, silakan hapus. Meme it Saya pikir mode 64 bit sekarang dipilih ketika Anda mengunduh versi 64 bit Java Sitemap Berkat Sam Woodman.
         
    * Login: Kadang-kadang, sistem email baru mencoba masuk terlalu sering, yang menyebabkan server Google Email untuk menolak semua log masa depan dalam upaya. Sekarang, sistem email menghindari masalah ini dan terkait.
         

## Versi 2.20{#version-220} 
 (dirilis 2022-09-30) 

*    **Jangan gunakan v2.20. Ini sempurna.** Tapi administrator masih perlu melakukan barang-barang TO DO yang tercantum di bawah ini ketika upgrade ke v2.21+.
     
*    **Fitur dan Perubahan Baru (untuk pengguna) Sitemap** 
    *    (Login)   
         
*    **Sitemap ERDDAP™ Administrator Perlu Tahu dan Lakukan:** 
    * IMPROVED: Kami dapat kembali sistem manajemen memori lama (Math. & Trigonom.) dan memodifikasi sistem manajemen memori baru (Login) bekerja lebih baik dengan itu. Meme it Sitemap [Status Memori](/docs/server-admin/additional-information#memory-status) Sitemap
         
    * CHANGED: default untuk&lt;Login Sitemap datasets.xml meningkat dari 7 sampai 15. Jelas bahwa beberapa sah Meme it WMS klien dapat menghasilkan lebih dari 7 permintaan simultan.
         

## Versi 2.19{#version-219} 
 (dirilis 2022-09-01) 

*    **Jangan gunakan v2.19. Ini sempurna.** Tapi administrator masih perlu melakukan TO DO item yang tercantum di bawah ini ketika upgrade ke v2.20+.
     
*    **Fitur dan Perubahan Baru (untuk pengguna) Sitemap** 
    * BARU: Ada fungsi sisi server baru, orderBy Descending, yang bekerja seperti orderBy tapi menyortir urutan turun. Terima kasih kepada Adam Leadbetter.
         
    * IMPROVED: Sekarang, grafik (tapi tidak peta) akan memperluas untuk mengisi ruang yang tersedia di kanvas, yaitu, ruang tidak digunakan oleh legenda. Anda bisa mendapatkan grafik tinggi, grafik persegi, atau grafik lebar dengan menambahkan dan memanipulasi & ukuran=_lebar_ | Sitemap (di mana lebar dan tinggi menentukan ukuran kanvas, dalam piksel) URL permintaan. (Ini bukan pilihan di halaman web .graph. Anda harus menambahkannya ke URL secara manual.) Jika Anda tidak menentukan parameter & ukuran, permintaan untuk .smallPng, .png, .bigPng, .smallPdf, .pdf, dan .large.pdf memiliki ukuran kanvas yang telah ditentukan, sehingga grafik Anda akan memperluas untuk mengisi ruang yang tersedia, tetapi biasanya akan kira-kira persegi. Terima kasih kepada Bob Fleming.
         
*    **Sitemap ERDDAP™ Administrator Perlu Tahu dan Lakukan:** 
    * Sitemap ERDDAP™ Sitemap Java 17 dan Tomcat terkait 10. Anda harus mengikuti ERDDAP™ instruksi instalasi (atau e.g yang setara, untuk Docker) untuk menginstal Java 17 dan Tomcat 10 dan salin Anda \\[ Login \\] /content direktori dari Tomcat 8 instalasi ke baru \\[ Login \\] Login Tidak ada perubahan lain yang perlu Anda buat ERDDAP instalasi yang berkaitan dengan perubahan ini. Dengan kata lain, ERDDAP™ bekerja seperti sebelumnya.
        
Jangan lupa untuk membuat Meme it ERDDAP - perubahan terkait ke server Tomcat.xml dan konteks.xml ketika Anda meningkatkan Tomcat. Sitemap ERDDAP Sitemap [Petunjuk instalasi Tomcat](/docs/server-admin/deploy-install#tomcat) Sitemap
        
Kesan saya Java 17 adalah bahwa lebih memilih daya pemrosesan dan memori untuk aplikasi yang panjang, lebih besar seperti ERDDAP™ sehingga bekerja sedikit lebih lambat daripada Meme it Java 8 dengan komputer daya rendah (e.g., 2 core dan RAM minimal) dan bekerja sedikit lebih cepat daripada Java 8 dengan komputer daya yang lebih tinggi (e.g., 4+ core dan RAM yang penuh kasih) Sitemap Jadi jika Anda melihat kinerja yang buruk, gunakan program seperti Linux [Login](https://www.howtogeek.com/668986/how-to-use-the-linux-top-command-and-understand-its-output/) untuk memeriksa penggunaan sumber daya dan mempertimbangkan memberikan ERDDAP™ lebih banyak sumber daya, cukup banyak memori. Memori murah&#33; Kebanyakan ponsel memiliki lebih banyak prosesor dan memori daripada server yang beberapa yang Anda gunakan untuk menjalankan ERDDAP Sitemap
Terima kasih kepada Erin Turnbull.
         
        
    * TO DO: Jika Anda menggunakan ERDDAP™ untuk mengakses Cassandra, untuk Cassandra, Anda perlu terus menggunakan versi Java yang Anda gunakan untuk menjalankan Cassandra. Cukup beralih ke Java 17 untuk menjalankan Tomcat+ ERDDAP Sitemap
         
    * TO DO: Direkomendasikan: Jika CPU server Anda memiliki 4+ core dan 8 + GB RAM, pertimbangkan perubahan pada pengaturan ini datasets.xml file:
```
          <nGridThreads>3</nGridThreads>  
          <nTableThreads>3</nTableThreads>  
```

Jika server Anda memiliki sumber daya yang lebih sedikit, tempelkan ke "1" untuk pengaturan tersebut.
Sistem nThreads untuk EDDGrid Dari File dan EDDTable Dari File secara signifikan ditingkatkan. Perubahan ini menyebabkan peningkatan kecepatan yang besar (e.g., kecepatan 2X ketika nThreads diatur ke 2 atau lebih) untuk permintaan yang paling menantang (ketika sejumlah besar file harus diproses untuk mengumpulkan hasilnya) Sitemap Beberapa perubahan terkait dari Chris John juga akan menyebabkan kecepatan umum sepanjang ERDDAP Sitemap Kode untuk perubahan ini berkontribusi oleh Chris John. Terima kasih, Login
         
    * PERINGATAN: hyphens dalam datasetID 's diuraikan dan tidak lagi didukung (meskipun teknis masih diperbolehkan) Sitemap Mereka mungkin akan diizinkan dalam rilis berikutnya. Jika Anda menggunakan hyphens, beralih ke core sekarang untuk menghindari masalah. Jika Anda membuat perubahan sekarang, itu pada kecepatan Anda sendiri. Jika Anda menunggu sampai rilis berikutnya, Anda akan berada di panik dan harus berurusan dengan itu hari itu.
         
    * BARU: Sekarang, untuk .htmlTable respon data, jika data dalam sel String mengandung data: gambar/png; base64, diikuti oleh gambar dasar64 yang dikodekan.png, ERDDAP™ akan menampilkan ikon (sehingga pengguna dapat melihat gambar jika mereka menggigit Meme it) dan tombol untuk menyimpan teks atau gambar ke clipboard. Terima kasih kepada Marco Alba (yang berkontribusi pada kode) dan Bob Simon (yang memodifikasinya sedikit) Sitemap
         
    * BARU: -doNotAddStandardNames
Jika Anda menyertakan \\-doNotAddStandardNames sebagai parameter baris perintah ketika Anda menjalankan menghasilkan Login Xml, menghasilkan Login Xml tidak akan menambah standard\\_name Login addAttributes untuk variabel apa pun selain variabel bernama latitude, longitude, ketinggian, kedalaman atau waktu (yang sudah jelas standard\\_name Login) Sitemap Ini dapat berguna jika Anda menggunakan output dari menghasilkan Login Login ERDDAP™ tanpa mengedit output, karena menghasilkan Login Xml sering menebak standard\\_name Sitemap (Perhatikan bahwa kita selalu merekomendasikan bahwa Anda mengedit output sebelum menggunakannya ERDDAP Sitemap) Menggunakan parameter ini akan memiliki efek terkait kecil lainnya karena ditebak standard\\_name sering digunakan untuk tujuan lain, misalnya, untuk membuat baru long\\_name , dan untuk membuat pengaturan warnaBar. Kevin O'Brien
         
    * BARU: Sekarang Anda dapat menempatkan&lt;WordPress.org&lt;Login Sitemap datasets.xml   (dengan pengaturan lain di dekat bagian atas) untuk mengubah jumlah maksimum perubahan file (default=10) yang akan diproses oleh sistem updateEveryNMillis. Jumlah yang lebih besar (100 g) mungkin berguna ketika sangat penting bahwa dataset disimpan selalu terbaru. Sitemap [WordPress.org](/docs/server-admin/datasets#updatemaxevents) Sitemap Terima kasih kepada John Maurer.
         
    * BARU: Menambahkan dukungan untuk global " real\\_time Login | palsu" atribut String.
Jika ini salah (Login) dan jika dataset tidak menggunakan pembaruan Login ERDDAP™ akan melihat tanggapan untuk permintaan untuk jenis file di mana seluruh file harus dibuat sebelum ERDDAP™ dapat mulai mengirim tanggapan kepada pengguna dan menggunakannya untuk sampai sekitar 15 menit (Login .nc Login) Sitemap
Jika ini ditetapkan untuk benar atau jika dataset menggunakan pembaruan Login ERDDAP™ tidak akan pernah cache file respons dan akan selalu kembali file yang baru dibuat.
Terima kasih kepada John Maurer.
         
    * BARU: Email sekarang dikirim dalam email yang terpisah. Ini membuat dataset pemuatan dan tindakan lain yang menghasilkan email lebih cepat karena loadDatasets tidak perlu menunggu email yang dikirim, yang kadang-kadang membutuhkan waktu yang lama. Sistem baru dapat mengirim beberapa email per sesi email, sehingga mengurangi jumlah login server email dan mengurangi risiko yang gagal karena mereka terlalu sering. Ada statistik untuk emailThread pada status.html halaman dan pesan diagnostik di log.txt - mencari "emailThread". Perhatikan bahwa tally nEmailsPerSession=0, menunjukkan masalah, yaitu, sesi email tidak dapat mengirim email apa pun.
Berkat Bob Simons.
         
    * CHANGED: Email sekarang dikirim dengan sedikit kode yang berbeda (Sitemap Java 17 dan perubahan ke emailThread) Sitemap Jika Anda kesulitan mengirim email, silakan email erd.data at noaa.gov Sitemap
         
    * NEW: Tindakan berlangganan yang "sentuh" URL jarak jauh sekarang ditangani dalam sentuhan terpisah. Ini membuat memuat dataset dan tindakan lain yang menyentuh URL lebih cepat karena loadDatasets tidak perlu menunggu sentuhan selesai, yang kadang-kadang membutuhkan waktu yang lama. Ada statistik untuk touchThread pada status.html halaman dan pesan diagnostik di log.txt - mencari "touchThread".
Berkat Bob Simons.
         
    * BARU: Pada halaman status.html, di "Major LoadDatasets Time Series", ada kolom "shed" baru yang menunjukkan jumlah permintaan yang disembuhkan karena saat ini ERDDAP™ penggunaan memori terlalu tinggi. Permintaan yang akan kembali kode status HTTP 503 "Layanan Tersedia". Permintaan tersebut tidak tentu masalah. Mereka hanya tiba di waktu sibuk. Meme it Ini adalah bagian dari revisi bagaimana ERDDAP™ penawaran dengan penggunaan memori tinggi.
         
    * BARU: Pada komputer Unix/Linux, sekarang ada garis "OS Info" pada status.html halaman web dengan informasi sistem operasi saat ini termasuk beban CPU dan penggunaan memori.
         
    * IMPROVED: Sekarang, ketika ERDDAP™ direstart dan quickRestart=true, EDDTableDariFiles dataset akan digunakan kembali .nc dan berbeda .nc Sitemap Untuk beberapa dataset, ini sangat mengurangi waktu untuk memuat dataset (e.g., dari 60 detik hingga 0,3 detik) Sitemap Seiring dengan emailThread baru dan taskThread (lihat di atas) , ini harus sangat mempercepat restart ERDDAP™ untuk banyak ERDDAP™ Login Terima kasih kepada Ben Adams dan John Kerfoot.
         
    * CHANGED: Sebelumnya, set data yatim (dataset yang hidup dalam ERDDAP™ tapi tidak datasets.xml ) hanya dicatat status. Meme it html dan di log.txt setelah setiap loadDataset utama. Sekarang, mereka secara otomatis dihapus dari ERDDAP™ dan mencatat status.html dan di log.txt, dan email ke email Sitemap Jadi jika Anda ingin menghapus dataset dari Meme it ERDDAP™ Sekarang semua yang harus Anda lakukan adalah menghapus chunk xml di datasets.xml dan itu akan dihapus dalam beban utama berikutnyaDataset. Berkat Bob Simons.
         
    * KNOWN BUG di netcdf-java v5.5.2 dan v5.5.3: Login EDDGrid Sitemap Pilihan katalog di GenerateDatasets Xml digunakan untuk bekerja untuk katalog THREDDS yang mencakup referensi ke dataset di katalog THREDDS jarak jauh. Sekarang tidak. Saya telah melaporkan masalah kepada pengembang netcdf-java.
         
    * BUG FIX: Untuk pengguna Docker mengatur parameter setup.xml melalui ERDDAP \\__paramName_: untuk parameter int dan boolean (Sitemap Login) Login ERDDAP™ benar-benar mencari hanya _paramName_. Sitemap ERDDAP Login Alessandro De Donno
         
    * Login ERDDAP™ sistem pengujian sekarang menggunakan sistem otomatis untuk memeriksa bahwa gambar tes baru dibuat persis seperti yang diharapkan. Terima kasih kepada Chris John untuk saran dan Bob Simons untuk implementasi.
         

## Versi 2.18{#version-218} 
 (dirilis 2022-02-23) 

*    **Fitur dan Perubahan Baru (untuk pengguna) Sitemap** 
    * Login
*    **Sitemap ERDDAP™ Administrator Perlu Tahu dan Lakukan:** 
    * Login: .nc file tidak ditutup dalam beberapa keadaan. Sitemap Berkat Marco Alba, Roland Schweitzer, John Maurer, dan lain-lain.
         

## Versi 2.17{#version-217} 
 (dirilis 2022-02-16) 

*    **Fitur dan Perubahan Baru (untuk pengguna) Sitemap** 
    * Login: Setelah perubahan orderBy sistem beberapa tahun lalu, Tabledap's Make A Graph tidak benar menangani banyak pertanyaan yang digunakan orderBy Login Sitemap Terima kasih kepada Maurice Libes.
         
    * CHANGE: Sebelumnya, ERDDAP™ menolak permintaan untuk . Login Png saat nilai latitude dan/atau longitude sebagian atau full out-of-range. ( ERDDAP™ GitHub · Instragram · Pinterest · LiveJournal · 500px · Flickr · Dribbble · DeviantArt) Sekarang kembali pixel transparan untuk area yang luar biasa dari gambar. Ini berguna untuk banyak aplikasi klien. Perubahan kode untuk membuat perubahan ini dilakukan sepenuhnya oleh Chris John. Terima kasih banyak, Chris&#33;
         
    * CHANGE: Sebelumnya, ERDDAP™ menolak permintaan griddap di mana nilai indeks untuk dimensi tertentu \\[ tinggi: rendah \\] Sitemap Sekarang itu membuat permintaan tersebut valid dengan menukar nilai rendah dan tinggi. Ini memecahkan masalah lama bagi pengguna dan untuk program eksternal seperti xtracto yang harus melacak beberapa dataset yang memiliki nilai lintang yang berkisar dari tinggi hingga rendah untuk membuat permintaan seperti \\[  (50 g) Sitemap (20 g)  \\] sehingga permintaan di ruang indeks \\[ rendah: tinggi \\] Sitemap Sitemaphttps://coastwatch.pfeg.noaa.gov/erddap/griddap/jplAquariusSSS3MonthV5.htmlSekarang, permintaan seperti \\[  (20 g) Sitemap (50 g)  \\] untuk salah satu dataset ini secara otomatis ditafsirkan sebagai \\[  (50 g) Sitemap (20 g)  \\] Sitemap
         
    * CHANGED: permintaan .esriAscii sekarang memicu "File : Save As" kotak dialog di browser pengguna. Terima kasih kepada Joel Van Noord.
         
    * Login: Sekarang, jika variabel longitude dari dataset anak EDDGrid LonPM180 atau EDDGrid Lon0360 dataset memiliki valid\\_min dan/atau valid\\_max atribut, mereka dihapus dalam EDDGrid LonPM180 atau EDDGrid Lon0360 dataset. Terima kasih kepada Roy Mendelssohn.
         
*    **Sitemap ERDDAP™ Administrator Perlu Tahu dan Lakukan:** 
    * TO DO: Jika Anda telah mengatur&lt;DataProviderFormActive&gt; untuk berurusan sementara dengan kerentanan XSS, silakan atur kembali ke true.
         
    * SECURITY BUG FIX: Memperbaiki kerentanan XSS dalam Formulir Penyedia Data. Genaro Contreras Gutiérrez
         
    * Login: Ketika dirctory AWS S3 memiliki lebih dari 10000 file, ERDDAP™ melemparkan "Konten internal". Ini sekarang tetap. Terima kasih kepada Andy Ziegler.
         
    * Login: EDDGrid SideBySide tidak memungkinkan untuk variabel sourceName s dalam set data anak yang berbeda untuk sama. Sitemap Terima kasih kepada Stanford Joshua.
         

## Versi 2.16{#version-216} 
 (dirilis 2021-12-17) 

*    **Fitur dan Perubahan Baru (untuk pengguna) Sitemap** 
    * CHANGES/BUG FIXES: Banyak perubahan kecil ke sistem terjemahan berkat saran dari editor khusus bahasa. Berkat Melanie Abecassis, Marco Alba, Jessy Barrette, Filipe Fernandes, Etienne Godin, Jennifer Sevadjian, dan Mike Smit.
         
    * Terletak disclaimer dan atribusi yang tepat untuk Google Translate, sebagaimana diperlukan oleh ketentuan Google Translate. Juga,&lt;html&gt; tag di HTML untuk setiap halaman web sekarang benar mengidentifikasi halaman web non-Inggris karena telah diterjemahkan oleh mesin. Terima kasih kepada Mike Smit.
         
    * Login: Halaman web login sekarang bekerja dengan pengaturan bahasa yang berbeda. Terima kasih kepada Mike Smit.
         
    * Login orderBy Login Dan Periksa Baru Semua dan Hapus Semua tombol pada EDDGrid Database Terima kasih atas kontribusi kode oleh Marco Alba.
         
*    **Sitemap ERDDAP™ Administrator Perlu Tahu dan Lakukan:** 
    * TO DO: Jika Anda memiliki
        &lt;Sitemap&lt;Login
di file setup.xml Anda, Anda perlu menghapus seluruh tag (direkomendasikan, sehingga file default digunakan) atau mengubahnya menjadi:
        &lt;Sitemap&lt;Login
         
    * CHANGE: Jadi Anda tahu, [Login](https://adoptium.net/?variant=openjdk8) telah menggantikan AdopsiOpenJDK sebagai sumber utama / diubah Java   (Login) Sitemap
         
    * CHANGE: File log dari ERDDAP™ Login Xml, dan DasDds sekarang UTF-8, bukan set karakter default komputer. Saya melakukan banyak pemeriksaan dan membuat beberapa perubahan untuk memastikan bahwa ERDDAP™ selalu menentukan set karakter yang tepat ketika membaca atau menulis semua jenis file, dan tidak lagi (dalam beberapa kasus) bergantung pada set karakter default komputer. Ini benar beberapa kesalahan dan pindah sedekat aku bisa dengan tujuan menggunakan UTF-8 untuk sebanyak mungkin jenis file sebanyak mungkin (.g., .log, .xml .json Login .json g .nc Login) Sitemap Perhatikan bahwa banyak jenis file yang lebih tua diperlukan untuk menggunakan ISO-8859-1 (Login OPeNDAP .das, .dds, .csv .tsv Login .nc 3, .nccsv Login) Sitemap Saya sebelumnya mencoba bekerja dengan kelompok CF dan dengan Unidata untuk menambahkan dukungan untuk UTF-8 di .nc 3 file; keduanya tahan.
         
    * NEW: Saat mengunduh file dari AWS S3, ERDDAP Login Dari sistemUrl di EDDGrid Dari File dan EDDTable Dari File sekarang menggunakan AWS Transfer Manager baru untuk mengunduh file melalui chunks paralel (sehingga sangat cepat) Sitemap Throughput target diatur ke 20 Gbps, per file, sehingga karya ini baik dengan semua jenis instance AWS, tetapi terutama yang memiliki kinerja "Networking". Dengan perubahan ini ERDDAP Login Dari sistemUrl sekarang menawarkan kecepatan yang sebanding dengan pendekatan xarray dari unduhan paralel dari file pra-potongan, tetapi tanpa perlu mengonversi file sumber dari .nc Login .hdf ke dalam file xarray chunked. Sitemap ERDDAP sistem 's lebih baik jika ada permintaan berikutnya untuk membaca dari file yang sama, karena ERDDAP™ sekarang memiliki salinan lokal dari file. Komunitas kami telah menghabiskan bertahun-tahun standarisasi .nc Login .hdf Login Sekarang kita tidak perlu untuk mendapatkan kinerja yang baik ketika menyimpan data di AWS S3. Terima kasih kepada Rich Signell.
         
    * CHANGE: searchEngine=Lucene adalah, untuk sekarang, dideprecated. Ini adalah sistem kompleks yang sering menghasilkan hasil yang sedikit berbeda dari perilaku yang lebih diinginkan dari searchEngine=ori. Untuk hampir semua ERDDAP™ instalasi, penghematan waktu Lucene tidak mengimbangi perbedaan dalam hasil. Silahkan gunakan searchEngine=ori bukan jika mungkin. Jika itu menyebabkan masalah, silakan email Bob.
         
    * CHANGE: The Lucene searchEngine sekarang berperilaku lebih seperti searchEngine asli. Tidak ada lagi kasus di mana lucene berpikir set data pertandingan dan asli tidak. Juga, peringkat lucene sekarang peringkat asli yang sama (karena asli sekarang selalu digunakan untuk menghitung peringkat) Sitemap
         
    * Login: Mulai rilis terbaru, ERDDAP™ berhenti melihat lebih dari 1000 benda pertama dalam ember AWS S3 yang diberikan. Sitemap ERDDAP™ lagi melihat semua objek. Meme it Terima kasih kepada Andy Ziegler.
         
    * BUG FIX: Sekarang EDDTableAggregate Baris menghapus actual\\_range atribut setiap kali satu atau lebih dari set data anak tidak pernah tahu variabelnya Sitemap actual\\_range   (e.g., EDDTableDariDatabase) Sitemap Erik Geletti
         

## versi 2.15{#version-215} 
 (Dipublikasikan 2021-11-19) 

*    **Fitur dan Perubahan Baru (untuk pengguna) Sitemap** 
    *    ERDDAP™ memiliki sistem baru untuk memungkinkan pengguna menentukan bahasa yang akan digunakan untuk semua halaman web. Sitemap ERDDAP™ instalasi diatur untuk menggunakannya, daftar bahasa akan muncul di sudut kanan atas setiap halaman web. ERDDAP™ URL dari sebelum versi ini terus bekerja dan selalu kembali konten Inggris, seperti sebelumnya.
        
Tidak semua teks atau semua halaman web diterjemahkan. Ada batasan waktu pada proyek ini yang mencegah Qi dan Bob dari mendapatkan 100%.
        
Pertanyaan yang jelas adalah: mengapa kami menempatkan begitu banyak usaha dalam hal ini ketika Chrome akan menerjemahkan halaman web di-the-fly? Jawabannya adalah: cara ini, kami mendapatkan lebih banyak kontrol atas bagaimana terjemahan dilakukan. Tidak mungkin, ada banyak kata yang tidak boleh diterjemahkan di halaman web, misalnya, judul dan ringkasan dataset, nama variabel, parameter, unit, dan organisasi. Banyak upaya terjemahan mengidentifikasi kata-kata dan frasa yang tidak boleh diterjemahkan. Juga, terjemahan mesin yang ditujukan untuk membentangkan jenis penandaan HTML tertentu. Mengelola terjemahan memungkinkan kita untuk meminimalkan masalah ini.
        
Program terjemahan dilakukan oleh Qi Zeng (Mozilla Firefox) dan Bob Simons menggunakan layanan web Terjemahan Google. Ini adalah proyek besar. Sitemap Login
        
    * Login: ERDDAP™ sekarang memungkinkan ORCID ID untuk memiliki X sebagai digit terakhir. Terima kasih kepada Maurice Libes.
         
*    **Sitemap ERDDAP™ Administrator Perlu Tahu dan Lakukan:** 
    * Sitemap
        
        * Anda perlu membuat beberapa perubahan yang berkaitan dengan ERDDAP Sistem baru untuk memungkinkan pengguna menentukan bahasa untuk halaman web.
            * Pada baris pertama dari setup.xml dan datasets.xml file, perubahan ke: encoding="UTF-8" dan mengubah pengkodean dokumen dalam editor teks Anda sehingga disimpan sebagai file UTF-8. Login Xml sekarang mengasumsikan bahwa datasets.xml adalah file UTF-8.
            * Programmer yang menyusun ERDDAP Sitemap Sitemap ERDDAP™ .java file harus diperlakukan sebagai file UTF-8 secara default. Anda mungkin perlu menambahkan "-encoding UTF-8" ke garis perintah javac. (Sitemap) 
            * Untuk mengaktifkan sistem ini (sangat dianjurkan) Sitemap&lt;startBodyHtml5&gt; tag yang Anda tentukan datasets.xml "&amp&#33;loginInfo;" ke "&amp&#33;loginInfo; | &amp&#33;language;" sehingga daftar bahasa muncul di sudut kanan atas setiap ERDDAP™ Login
            *    ERDDAP™ hanya menggunakan&lt;startBodyHtml5&gt; tag yang Anda tentukan datasets.xml untuk menentukan konten HTML untuk spanduk di bagian atas setiap ERDDAP™ halaman web, tidak peduli bahasa apa yang dipilih pengguna. Jika Anda mengubah tag tersebut untuk digunakan
Sitemap &EasierAccessToScientificData; " alih-alih akses ke data ilmiah" dan
Sitemap &BroughtToYouBy; " alih-alih "Karena Anda oleh", ERDDAP™ akan menggunakan versi diterjemahkan dari frasa tersebut dalam spanduk.
            * Demikian pula, standar baru&lt;Login datasets.xml Sitemap
                
```
                <theShortDescriptionHtml><!\\[CDATA\\[ 
                <h1>ERDDAP</h1>
                &erddapIs;
                &thisParticularErddap;
                \\[standardShortDescriptionHtml\\]
                \\]\\]></theShortDescriptionHtml>
```
3 baris terakhir konten adalah hal-hal yang akan diganti dengan teks diterjemahkan. Jika Anda mengonversikan salah satu dari mereka (Sitemap Sitemap) atau semua dari mereka untuk teks eksplisit di Meme it datasets.xml   (yang memiliki prioritas, jika ada) atau pesan.xml, bahwa teks tidak akan muncul bahasa apa yang dipilih pengguna. Ini tidak sempurna, tetapi saya mencari bahwa beberapa administrator ingin mengedit&lt;theShortDescriptionHtml&gt; dalam 35 file yang berbeda untuk menyediakan 35 versi diterjemahkan yang berbeda dari tag itu.
        
          
         
    * CHANGED: Beberapa kesalahan sekarang ditangani sedikit berbeda dan sehingga dapat ditambahkan ke tally of "Failed Requests" pada status.html dan di Email Laporan Harian. Jadi angka-angka tersebut mungkin agak lebih besar dari sebelumnya.
         
    * Login Login EDDGrid Lon0360 dan EDDGrid LonPM180 sekarang tidak termasuk dataset sumber dengan datasetID Sitemap\\*\\_LonPM180" dan datasetID Sitemap\\*\\_Lon0360, masing-masing.
         

## Versi 2.14{#version-214} 
 (Dikirim 2021-07-02) 

*    **Fitur dan Perubahan Baru (untuk pengguna) Sitemap** 
    *    (Login)   
         
*    **Sitemap ERDDAP™ Administrator Perlu Tahu dan Lakukan:** 
    * Sitemap EDDGrid Lon0360 yang membuat dataset gridded dengan nilai longitude & gt;=0 dan&lt;= 360 dari dataset gridded dengan nilai longitude & gt;=-180 dan&lt;=180. Sitemap [ EDDGrid Lon0360 dokumentasi](/docs/server-admin/datasets#eddgridlon0360) Sitemap Terima kasih Dale Robinson.
         
    * Sitemap ERDDAP™ administrator sekarang dapat menimpa nilai apa pun dalam setup.xml melalui variabel lingkungan bernama ERDDAP \\__valueName_ sebelum berjalan ERDDAP Sitemap Misalnya, gunakan ERDDAP Login&lt;baseUrl&gt; nilai. Ini dapat berguna ketika menyebarkan ERDDAP™ dengan wadah, karena Anda dapat menempatkan pengaturan standar dalam setup.xml dan kemudian menyediakan pengaturan khusus melalui variabel lingkungan. Jika Anda menyediakan informasi rahasia untuk ERDDAP™ melalui metode ini, pastikan untuk memeriksa informasi tersebut akan tetap rahasia. ERDDAP™ hanya membaca variabel lingkungan setelah per startup, di kedua startup pertama, jadi satu cara untuk menggunakan ini adalah: mengatur variabel lingkungan, mulai ERDDAP™ Sitemap ERDDAP™ dimulai, kemudian menetapkan variabel lingkungan. Berkat Marc Portier.
         
    * IMPROVED: Sekarang, jika beberapa file di EDDTableDari... File dataset dengan banyak file memiliki beberapa nilai String yang sangat panjang, dataset akan memuat jauh lebih cepat dan menanggapi permintaan jauh lebih cepat. Sitemap ERDDAP™ akan mengalokasikan banyak ruang untuk nilai min dan max String dalam file yang disimpan dengan informasi file untuk set data tersebut. File yang dihasilkan sangat besar, menyebabkannya ditulis dan membaca perlahan. OBIS
         
    * IMPROVED: Sekarang, ERDDAP™ melakukan pekerjaan yang lebih baik dari menafsirkan urutan karakter yang tidak biasa dan tidak valid dalam file CSV. OBIS
         
    * FIX: Setelah tahun kesulitan dengan Cassandra, saya akhirnya berhasil menginstal Cassandra (Login) lagi dan sehingga mampu menjalankan tes dengan Cassandra v2. Sekarang saya bisa lebih percaya bahwa Meme it ERDDAP™ Cassandra v2 dan v3. Berkat ONC.
         

## Versi 2.12{#version-212} 
 (Dikirim 2021-05-14) 

*    **Fitur dan Perubahan Baru (untuk pengguna) Sitemap** 
    * Login: Jika Anda berada di daftar hitam berlangganan, Anda sekarang tidak dapat meminta daftar langganan Anda.
         
*    **Sitemap ERDDAP™ Administrator Perlu Tahu dan Lakukan:** 
    * TO DO: BARU: sistem untuk secara otomatis membatasi kemampuan pengguna jahat dan pengguna sah yang terlalu agresif untuk membuat sejumlah besar permintaan simultan yang akan menurunkan kinerja sistem untuk pengguna lain. Ada 3 tag opsional baru di datasets.xml yang dapat Anda tambahkan langsung setelah&lt;grafikBackgroundColor&gt;:
```
        <ipAddressMaxRequests></ipAddressMaxRequests>  <!-- current default=7 -->
        <ipAddressMaxRequestsActive></ipAddressMaxRequestsActive>  <!-- current default=2 -->
        <ipAddressUnlimited></ipAddressUnlimited>  <!-- default=empty -->  
```

Untuk informasi lebih lanjut, lihat [Login](/docs/server-admin/datasets#ipaddressmaxrequests) Sitemap ERDDAP™ juga sekarang mencetak "Number pengguna unik (Sitemap) " di halaman status.html.
Berkat orang di Cina menyerang saya ERDDAP™ Login
         
    * CHANGE ke perilaku driver Postgresql: Ketika saya memperbarui driver Postgresql, nama kolom di daftar tabel yang dihasilkan oleh Postgresql dan GenerateDatasetsXml kembali semua huruf besar, bukan semua huruf kecil, seperti sebelumnya. Saya tidak tahu apakah itu akan mempengaruhi hal-hal lain karena database sering menganggap nama-nama tersebut menjadi tidak sensitif. Dataset tes saya masih bekerja dengan benar. Tetapi jika dataset Anda berhenti bekerja dengan ini ERDDAP™ update, ini adalah penyebab yang mungkin untuk mengejar pertama.
         
    * Login: ERDDAP™ sekarang juga menangani file AWS S3 pribadi dengan benar. Ada perbaikan terkait lainnya untuk penanganan file AWS S3. Terima kasih kepada Michael Gangl dan Dylan Pugh.
         
    * Sitemap EDDGrid Sitemap EDDGrid Login Unpacked sekarang dapat membaca data dari "struktur" di .nc 4 dan .hdf 4 file. Untuk mengidentifikasi variabel yang berasal dari struktur,&lt; sourceName Sitemap harus menggunakan format: _fullStructureName_ | _memberName_, misalnya kelompok1/myStruct | Login NRL
         
    * CHANGED: Sekarang, jika penggunaan memori saat ini ditambah permintaan ini bahkan sedikit tinggi, set griddap nThreads untuk permintaan ini untuk 1. Sitemap ERDDAP™ mengamati memori ketika memori langka. Berkat orang di Cina menyerang saya ERDDAP™ Login
         
    * Sistem baru untuk memantau jumlah file terbuka (yang mencakup soket dan beberapa hal lain, tidak hanya file) di Tomcat di komputer Linux. Jika beberapa file tidak pernah ditutup, jumlah file terbuka dapat meningkat sampai melebihi maksimum diperbolehkan dan banyak hal yang benar-benar buruk terjadi. Sekarang, di komputer Linux (informasi tidak tersedia untuk Windows) Sitemap
        
        * Ada kolom "Open File" baru di sebelah kanan status.html halaman web menunjukkan persen dari file max terbuka. Di Windows, itu hanya menunjukkan "?".
        * Sitemap ERDDAP™ menghasilkan informasi pada akhir setiap reload dataset utama, itu akan mencetak log. txt file:
openFileCount=_current_max=_max_ %=_percent_
        * Jika persentasenya adalah &gt;50%, email dikirim ke ERDDAP™ administrator dan email Sitemap Untuk alamat email.
        
Untuk mengetahui lebih banyak, atau jika Anda melihat masalah ini pada Anda ERDDAP™ Sitemap [Too Banyak File Terbuka](/docs/server-admin/additional-information#too-many-open-files) Sitemap
Berkat orang di Cina menyerang saya ERDDAP™ Login
         
    * BARU: Saya menambahkan banyak pemeriksaan untuk dan penanganan "O banyak file terbuka", sehingga tugas hanya berhenti dan pengguna melihat pesan kesalahan. File data tidak akan lagi ditandai dengan buruk jika membacanya menghasilkan kesalahan "Too banyak file terbuka".
         
    * Login \\[ Login \\] Catalog
Jika Anda menempatkan file di direktori ini dengan datasetID sebagai nama file (konten file tidak masalah) Login ERDDAP™ akan menghapus file buruk .nc file untuk dataset (Sitemap) dan reload dataset ASAP. Penyebab ini ERDDAP™ untuk mencoba lagi untuk bekerja dengan file sebelumnya (Sitemap) ditandai sebagai buruk. Terima kasih kepada Marco Alba.
         
    * CHANGED: Pada startup, jika sebuah EDDGrid Dari...Files atau EDDTableDari... File dataset awalnya memiliki 0 file dalam daftar file valid yang diketahui (e.g., dataset baru) Sitemap ERDDAP™ defers memuat dan menetapkan bendera sehingga akan dimuat ASAP setelah loadDataset utama selesai. Ini mempercepat startup awal ketika ada set data baru.
         
    * FileVisitorDNLS.testAWSS3 () dan FileVisitorSubdir.testAWSS3 () ; sekarang menggunakan AWS v2 (tidak v1) SDK. Sekarang Git ERDDAP™ distribusi sekarang termasuk semua file yang diperlukan dan Anda tidak perlu lagi untuk menambahkan file jar v1 AWS SDK besar.
         
    * CHANGED: Saya beralih menggunakan Maven untuk mendeteksi / mengurangi ketergantungan (file .jar di /lib) Sitemap Perubahan untuk v2 dari AWS SDK membutuhkan ini. Ini akan diperlukan untuk kode impor lainnya di masa depan. Terima kasih besar untuk Kyle Wilcox yang menyediakan pom.xml dia menciptakan dan menggunakan, yang memecahkan beberapa masalah untuk saya.
         
    * CHANGED: Parameter kelas (Login) digunakan dalam GenerateDatasetXml, DasDds dan program kecil lainnya yang datang dengan ERDDAP™ , dan dalam saran untuk programmer sekarang jauh lebih sederhana dan seharusnya tidak pernah berubah lagi karena mengacu pada direktori, bukan file individu:
\\-cp kelas;C:\\program\\\_tomcat\\lib\\\servlet-api.jar;lib\\\\*
         (atau ':' bukan ';' untuk Linux dan Mac) Sitemap
         (Saya harus melakukan tahun-tahun ini yang lalu ketika menjadi pilihan.)   
         
    * Sitemap Xml memiliki opsi utilitas baru: findDuplicateTime yang akan mencari melalui koleksi gridded .nc   (dan terkait) file untuk menemukan file dengan nilai waktu duplikat. Sitemap [Login Sitemap](/docs/server-admin/datasets#findduplicatetime)   
         
    * Sitemap datasets.xml Sitemap&lt;palet&gt; tag yang menimpa&lt;palet&gt; nilai tag dari pesan.xml (atau mengubah pesan.xml nilai jika kosong) Sitemap Ini memungkinkan Anda mengubah daftar palet yang tersedia sementara Meme it ERDDAP™ berjalan. Juga, jika Anda memiliki subdirectory cptfiles di ERDDAP™ Catalog ERDDAP™ akan menyalin semua file \\ *.cpt di direktori itu ke \\[ Login \\] /webapps/erddap/WEB-INF/cptfiles direktori setiap kali ERDDAP™ Sitemap Bersama-sama, perubahan ini memungkinkan Anda menambahkan palet dan memiliki perubahan bertahan ketika Anda menginstal versi baru dari ERDDAP Sitemap Sitemap [Dokumentasi palet](/docs/server-admin/datasets#palettes)   
Berkat Jennifer Sevadjian, Melanie Abecassis, dan mungkin orang CoastWatch lainnya.
         
    * Login&lt;Login (/docs/server-admin/datasets#slowdowntroublemillis) sekarang digunakan untuk semua permintaan gagal, tidak hanya beberapa jenis.
         
    * CHANGED: RunLoadDatasets thread sekarang mengganggu benang LoadDatasets pada 3/4 LoadDatasets MaxMinutes sehingga ada lebih banyak waktu untuk LoadDatasets untuk melihat gangguan dan keluar anggun. Juga ada pesan diagnostik yang lebih baik untuk ini.
         
    * CHANGED dari versi lama Lucene untuk v8.7.0.
         
    * CHANGE: Email dikirim oleh ERDDAP™ sekarang muncul dengan font lebar tetap.
         
    * Login EDDGrid DariFiles sekarang mendapat nilai sumbu serta atribut dari FIRST | File LAST, sebagaimana ditentukan&lt;metadataDari&gt;. Sitemap (Login) to Ken Casey, et al.
         
    * Didukung dukungan untuk unit yang tidak valid "degree\\_North" dan "degree\\_East" yang erronely digunakan oleh file baru-baru ini (Juni 2019) dalam Versi AVHRR Pathfinder 5.3 L3-Collated (Login) SST dataset (maksimka215 sst d1day dan nceiPH53 sst Sitemap) Sitemap ERDDAP™ sekarang dapat menstandardisasi mereka ke unit yang valid. Sitemap (Login) to Ken Casey, et al.
         

## Versi 2.11{#version-211} 
 (Oktober 2019) 

*    **Fitur dan Perubahan Baru (untuk pengguna) Sitemap** 
    * BUG FIX: OrderByMean melemparkan NullPointerException jika variabel hanya memiliki salah satu \\_FillValue atau hilang\\_ Nilai yang ditentukan. Sekarang menangani situasi dengan benar. Terima kasih kepada Marco Alba.
         
    * Login: Ada masalah dengan file teks ODV yang dibuat oleh ERDDAP™ di v2.10. Masalah-masalah tersebut tetap. Terima kasih kepada Shaun Bell.
         
    * Login: Sitemap ERDDAP™ v2.10: Jika batas lat lon ditentukan di URL, kotak yang terikat tidak ditarik di peta dunia. Sekarang lagi. Terima kasih kepada John Maurer.
         
*    **Sitemap ERDDAP™ Administrator Perlu Tahu dan Lakukan:** 
    * Login: Sitemap ERDDAP™ v2.10: File skrip untuk ArsipADataset, HasilDataset Xml dan DasDds tidak bekerja karena mereka tidak memiliki perubahan ke classpath yang ditambahkan dengan ERDDAP™ v2.10. Sekarang mereka lakukan. Terima kasih kepada Marco Alba.
         
    * Sitemap datasets.xml Anda sekarang dapat memiliki tag:
```
        <emailDiagnosticsToErdData></emailDiagnosticsToErdData> <!-- true (the default) or false -->  
```

Saat ini, jika benar (atau jika tag kosong, atau jika tag tidak dalam file) , ketika permintaan pengguna mengarah ke NullPointerException, ERDDAP™ akan mengirim email jejak stack ke erd.data at noaa.gov   (Login ERDDAP™ tim pengembangan) Sitemap Ini harus aman dan aman karena tidak ada informasi rahasia (Sitemap) disertakan dalam email. Ini harus memungkinkan untuk menangkap bug yang tidak jelas, benar-benar tak terduga yang menyebabkan NullPointerExceptions. Jika tidak, pengguna melihat pengecualian, tetapi ERDDAP™ pengembang tidak tahu ada masalah yang perlu diperbaiki.
        
Mungkin bahwa tag ini akan menyebabkan informasi diagnostik lainnya yang serupa diemail erd.data at noaa.gov di masa depan. Konten email akan selalu minimal dan terkait bug, dan tidak, misalnya, penggunaan informasi. Terima kasih kepada Marco Alba.
         
        
    * CHANGED: Sekarang, jenis file terkompresi umum ( .bz2 Login .gz Login .gzip Login .tar Login .tgz Login .z Login .zip ) juga dilarang untuk permintaan rentang byte. Ini ditentukan melalui&lt;ekstensiNoRangeRequests&gt; dalam pesan.xml.
         
    * KNOWN PROBLEM: Sitemap ERDDAP™ 2.10, .nc file gm yang mencoba mengubah atribut, tidak mengubah atribut. Ini adalah bug yang dikenal di netcdf-java yang saya telah melaporkan dan mereka mengatakan akan tetap dalam rilis berikutnya netcdf-java.
         

## Versi 2.10{#version-210} 
 (Dipublikasikan 2020-11-05) 

*    **Fitur dan Perubahan Baru (untuk pengguna) Sitemap** 
    * BARU: Baru [Login](https://coastwatch.pfeg.noaa.gov/erddap/convert/interpolate.html) converter efisien mencemari nilai dari nilai dataset gridded. Seperti itu, sangat berguna bagi para peneliti yang bekerja dengan data trek hewan. Konverter ini diperlukan dalam tabel dengan lintang, bujur, dan kolom waktu (dan mungkin kolom lain) dan mengembalikan tabel dengan kolom tambahan dengan nilai yang diserbuki. Jadi, ini mirip dengan yang populer [Login](https://coastwatch.pfeg.noaa.gov/xtracto) script awalnya diciptakan oleh Dave Foley, tetapi menawarkan keuntungan pemrosesan hingga 100 poin per permintaan. Terima kasih untuk Dave Foley dan Jordan Watson ( NMFS ) Sitemap
         
    * IMPROVED: Pencarian lanjutan sekarang ketat untuk permintaan non-.html. Sekarang akan membuang pengecualian untuk permintaan yang memiliki kesalahan permanen (e.g., permintaan di mana minLat &gt; maxLat) atau kesalahan sementara (e.g., permintaan untuk standard\\_name tidak ada) Sitemap Untuk permintaan .html, Pencarian Lanjutan tidak berubah: seperti dengan pencarian Google, itu melakukan yang terbaik dan diam-diam memperbaiki atau mengabaikan kesalahan. Terima kasih kepada Rich Signell.
         
    * IMPROVED: Peta di halaman Pencarian Lanjutan sekarang lebih besar (Anda masih harus merobek, tetapi kurang) dan lebih akurat (tapi masih tidak sempurna) Sitemap Terima kasih kepada John Maurer.
         
    * IMPROVED: The "Draw tanah masker" pengaturan pada Membuat halaman web Graph dan &.land=... pengaturan di URL yang meminta peta sekarang mendukung dua opsi lebih:
"outline" hanya menarik garis besar topeng tanah, batas politik, danau dan sungai.
"off" tidak menarik apa pun.
Sitemap [&.land=... dokumentasi](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands) Sitemap
Terima kasih kepada John Maurer.
         
    * IMPROVED: Grafik dan peta yang dibuat oleh ERDDAP™ sekarang dapat menggunakan tiga jenis penanda baru: Borderless Filled Square, Borderless Filled Circle, Borderless Filled Up Triangle. Kode untuk ini berkontribusi oleh Marco Alba ETT / EMODnet Fisika. Terima kasih kepada Marco Alba.
         
    * Sitemap "files" sistem sekarang mendukung polos respon tipe file (Login .htmlTable Login .itx Login .json Login .jsonlCSV1 Login .jsonlCSV Login .jsonlKVP Login .mat Login .nc Login .nccsv Login .tsv Sitemap .xhtml Sitemap) Sitemap [https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv) Sitemap
Kyle Wilcox
         
    * IMPROVED: URL yang dihasilkan ketika pengguna menggunakan Formulir Akses Data (Login) Sitemap (Login) halaman web sekarang benar persen-mengkode karakter \\[ Login \\] Sitemap Ini membuat URL sedikit lebih sulit bagi manusia untuk membaca, tetapi lebih baik dari sudut pandang keamanan web. Administrator sekarang memiliki pilihan pengaturan santaiedQueryChars= Sitemap \\[  \\]  | ' di file Tomcat.xml (kurang aman) atau tidak (lebih aman) Sitemap
Terima kasih kepada Antoine Queric, Dominika Fuller-Rowell, dan lainnya.
         
    * BARU: Jika permintaan pada dataset EDDTable termasuk & tambah Login Sitemap (Login Nama, atribut Login) Login ERDDAP™ akan menambahkan semua variabel yang memiliki _attribute Nama=attribute Nilai_ ke daftar variabel yang diminta.
Sitemap [Login Login Di mana dokumentasi](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#addVariablesWhere) Sitemap Terima kasih kepada Aurelie Briand, et al.
         
    * Sitemap ERDDAP™ sekarang menolak permintaan rentang byte ke / file / .nc Sitemap .hdf Login Jangan mencoba untuk terhubung ke jarak jauh .nc Sitemap .hdf file seolah-olah file lokal. Ini tidak efisien dan sering menyebabkan masalah lain. Sitemap
        * Sitemap(OPeN)DAPsoftware klien untuk terhubung ke ERDDAP Sitemap DAP Layanan untuk dataset ini (yang memiliki /griddap / atau / tabledap URL) Sitemap Itulah DAP Sitemap
        * Gunakan formulir akses dataset untuk meminta subset data.
        * Jika Anda membutuhkan seluruh file atau akses berulang selama jangka waktu yang lama, gunakan curl Login wget , atau browser Anda untuk mengunduh seluruh file, kemudian mengakses data dari salinan file lokal Anda.
             
    * Login Opsi output Txt telah ditulis kembali untuk mendukung versi baru dari ODV .txt file dan untuk mendukung representasi yang tepat dari trajectory, timeseries, dan data profil.
         
    * IMPROVED: Sekarang, istilah pencarian dalam kutipan ganda ditafkan sebagai string json, sehingga mereka dapat memiliki \\ karakter yang dikodekan. Di antara lain, ini memungkinkan Anda mencari pertandingan yang tepat untuk atribut, misalnya, "lembaga= NOAA  \\n " tidak akan cocok dengan dataset dengan institusi= NOAA   NMFS Sitemap Dan Nowacki.
         
    * IMPROVED: Di tempat tambahan, nomor titik mengambang (terutama mengapung dikonversi ke dua kali lipat) sekarang muncul sebagai versi yang sedikit lebih bulat dari jumlah di tempat tambahan, misalnya float sebelumnya ditampilkan sebagai ganda seperti 32.27979296875, mungkin sekarang muncul sebagai 32.28. Kyle Wilcox
         
    * BUG FIX: unsigned file audio integer membaca sedikit salah. Sekarang mereka membaca dengan benar.
         
*    **Sitemap ERDDAP™ Administrator Perlu Tahu dan Lakukan:** 
    * PERINGATAN: Pertama kali Anda menjalankan ERDDAP™ v2.10, beberapa dataset berdasarkan file data lokal akan memuat **Sitemap** Sitemap ERDDAP™ perlu membuat ulang database informasi file. Setelah beban awal lambat, mereka akan memuat dengan cepat, seperti sebelumnya. Promo
         
    * MENINGGALKAN ANDA:
        * Ketika Anda pertama menjalankan v2.10, beberapa set data mungkin tidak memuat karena ERDDAP™ sekarang lebih ketat tentang beberapa metadata. Seperti sebelumnya, ERDDAP™ akan mengirim email kepada Anda Laporan Harian ketika beban pertama naik. Itu akan mencakup pesan kesalahan untuk setiap set data yang tidak dimuat. Baca pesan kesalahan untuk mengetahui masalah. Dalam kebanyakan kasus, Anda hanya perlu membuat perubahan kecil ke metadata dataset untuk memecahkan masalah.
             
        * Sitemap datasets.xml Login&lt; sourceName Login (Login '=' tanda, yang mengidentifikasi [nilai tetap sourceName ](/docs/server-admin/datasets#fixed-value-sourcenames) ) Sitemap Untuk sebagian besar ERDDAP™ setup, ini jarang. Jika ada nilai setelah '=' Sitemap (Sitemap) Anda MUST sekarang mencakup string dalam kutipan ganda. Sitemap
Sitemap&lt; sourceName &gt;=KZ401&lt;Sitemap sourceName Sitemap
Sitemap&lt; sourceName &gt;="KZ401"&lt;Sitemap sourceName Sitemap
             
        * NEW: Ada pengaturan opsional baru dalam setup.xml,&lt;defaultAccessibleViaFiles&gt;, yang menetapkan default&lt;Sitemap Default untuk tag baru ini palsu, yang meniru sebelumnya ERDDAP™ perilaku. Pengaturan tingkat bawah ini dapat dilalui oleh dataset yang diberikan&lt;Sitemap
            
Sitemap (karena ada pengguna yang ingin ini Meme it) Sitemap
Jika Anda ingin membuat... Dari Files dataset dapat diakses melalui sistem file, kemudian
            
            1. Tambahkan tag ini ke file setup.xml Anda:
```
                <defaultAccessibleViaFiles>true</defaultAccessibleViaFiles>
```
            2.   (Sitemap) Hapus semua
```
                <accessibleViaFiles>true</accessibleViaFiles>
```
Sitemap datasets.xml sejak default sekarang benar. Meme it
                 
        * Tambahkan \\_FillValue Attributes:
             ERDDAP™ digunakan untuk memiliki default \\_FillValue untuk semua variabel integer: nilai maksimum dari jenis data (e.g., 127 untuk variabel byte) Sitemap Sekarang tidak. Untuk menghindari memiliki nilai-nilai ini ditampilkan sebagai nilai data (tidak hilang nilai) Anda perlu untuk secara eksplisit menyatakan ini melalui atribut \\_FillValue. Dari sekarang, setiap kali Anda mulai ERDDAP™ , itu akan mengirim administrator email dengan tabel .csv dengan daftar variabel sumber integer yang tidak memiliki \\_FillValue atau missing\\_value atribut, dan atribut \\_FillValue yang disarankan. Sitemap [Login Atribut Nilai](/docs/server-admin/datasets#add-_fillvalue-attributes) untuk informasi dan instruksi lebih lanjut.
             
        * Sitemap ERDDAP™ , Anda perlu memodifikasi parameter classpath pada baris perintah javac untuk menambahkan referensi ke stoples baru ini: lib/commons-jexl.jar;lib/aws-java-sdk.jar; lib/jackson-annotations.jar; lib/jackson-core.jar;lib/jackson-databind.jar Sitemap
             
    * CHANGED: Tomcat 9 sekarang versi Tomcat yang disarankan untuk ERDDAP Sitemap Versi terbaru Tomcat 8.5+ juga bagus untuk sekarang. Kami dibersihkan ERDDAP Sitemap [Petunjuk instalasi Tomcat](/docs/server-admin/deploy-install#tomcat) Sitemap
        
Versi terbaru dari Java Sitemap (Login Java 10, 10, 11 ...) Sitemap [Login](https://adoptopenjdk.net/) tetap versi yang disarankan Java Sitemap ERDDAP Sitemap Java 8 memiliki Dukungan Jangka Panjang dari AdopsiOpenJDK sehingga tetap aman digunakan, tetapi ingat untuk mendapatkan versi terbaru dari secara berkala untuk alasan keamanan.
        
    * BARU: Script SourceNames / Derived Variabel di Tabular Dataset
EDDTableDariFileNames, EDDTableDariDatabase, dan EDDTableDariFileNames dataset sekarang termasuk ekspresi dan skrip di sourceName Sitemap Ini memungkinkan Anda membuat variabel baru berdasarkan variabel yang ada dalam file sumber. Perhitungan untuk variabel baru yang diberikan dilakukan dalam satu baris hasil, berulang kali untuk semua baris. Misalnya, untuk membuat variabel longitude dengan nilai dalam kisaran -180 - 180 ° dari variabel dengan nilai dalam kisaran 0 - 360 °:
        &lt; sourceName &gt;=Math2.anglePM180 (baris.columnDouble (Login) ) &lt;Sitemap sourceName Sitemap
Untuk detail, lihat [Login](/docs/server-admin/datasets#script-sourcenamesderived-variables)   
Berkat Bob Simons (yang merencanakan ini sebelum ERDDAP™ v1.0 dan akhirnya menemukan cara untuk mengimplementasikannya) , Kevin O'Brien, Roland Schweitzer, John Maurer, dan perpustakaan Apache JEXL untuk melakukan bagian yang sangat keras (dan melakukannya dengan baik Meme it) Sitemap
         
    * BARU: Unsigned jenis data integer (ubyte, ushort, uint, ulong) sekarang didukung. Perhatikan bahwa banyak jenis file (g., .das, .dds, .nc Sitemap) tidak mendukung semua jenis data baru ini. Sitemap [Login Dokumentasi](/docs/server-admin/datasets#data-types) untuk rincian tentang bagaimana ERDDAP™ penawaran dengan perbedaan ini. Tidak bisa, karena(OPeN)DAPTidak ada respons .dds, tidak mendukung ketepatan yang ditandatangani, panjang, atau ulongs, Anda mungkin ingin menggunakan ERDDAP 's representasi tabular dari .das dan .das seperti yang terlihat di http Login **Sitemap** Login datasetID Login (Sitemap [https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html](https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html)  ) yang dapat Anda dapatkan di jenis file lain atau .nccsv Metadata (Sitemap [https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata)  ) keduanya mendukung semua jenis data dalam semua situasi.
        
PERINGATAN: Untuk dataset yang dipengaruhi oleh perubahan ini, dimungkinkan bahwa Anda akan melihat masalah dengan dataset karena data yang ERDDAP™ membaca dari sumber mungkin berbeda (misalnya, variabel yang sebelumnya dibaca sebagai integer yang ditandatangani sekarang dapat dibaca sebagai integer yang tidak ditugaskan) Sitemap Masalah yang dihasilkan termasuk: file baru tidak ditambahkan ke dataset, dan/atau kesalahan ketika Anda mencoba mengakses data. Jika dataset memiliki masalah, hal pertama yang harus dicoba adalah [set keras Login](/docs/server-admin/additional-information#hard-flag) dataset. Jika itu tidak menyelesaikan masalah, maka Anda harus melihat log. txt untuk melihat pesan kesalahan, menyelam ke dalam datasets.xml untuk dataset, dan/atau mungkin kembali menghasilkanDataset.xml untuk dataset.
Netcdf-java 5.x (yang memaksa masalah) dan yang akan datang CF 1.9.
        
    * IMPROVED: Sekarang [dokumentasi / iklan yang lebih baik](/docs/server-admin/datasets#s3-buckets) untuk bagaimana membuat dataset dari file di ember AWS S3. Michal Wengren
         
    * CHANGED: Ada beberapa perubahan yang berkaitan dengan "files" sistem.
        * Kode untuk menangani ini ditulis ulang untuk dapat digunakan oleh lebih kelas.
             
        * BARU: Permintaan pengguna untuk daftar direktori sekarang dapat meminta tanggapan adalah salah satu jenis tabel standar biasa dengan menerapkan ekstensi file yang diinginkan: .csv, .htmlTable Login .itx Login .json Login .jsonlCSV1 Login .jsonlCSV Login .jsonlKVP Login .mat Login .nc Login .nccsv Login .tsv Sitemap .xhtml Sitemap Sitemap
             [https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv)   
Berkat Kyle Wilcox dan Shane St Savage.
             
        * IMPROVED: Sekarang, Hasil Login Xml tidak akan termasuk&lt;dapat diaksesVias&gt; tag dalam output. Asumsi adalah bahwa dataset akan mengandalkan nilai baru&lt;defaultAccessibleViaFiles&gt; WordPress.org Sitemap [Sitemap Login](/docs/server-admin/datasets#accessibleviafiles) Sitemap
             
        * IMPROVED: Jenis dataset tambahan sekarang mendukung dapat diakses Login EDDGrid Login EDDGrid Sitemap EDDGrid DariErddap, EDDTableDariErddap, EDDGrid DariEDDTable, EDDTableDari EDDGrid Sitemap EDDGrid Login Untuk ini, file dari dataset jarak jauh / anak yang diberikan hanya akan dapat diakses jika orang tua dan dataset jarak jauh / anak dapat diakses ViaFiles set ke true (mungkin melalui&lt;defaultAccessibleViaFiles&gt;). Terima kasih kepada Damian Smyth dan Rob Fuller.
             
        * TO DO / RECOMMENDASI: Kami merekomendasikan membuat semua dataset yang relevan dapat diakses melalui sistem file dengan mengatur&lt;defaultAccessibleViaFiles&gt; untuk benar dalam setup.xml karena ada sekelompok pengguna untuk siapa ini adalah cara yang disukai untuk mendapatkan data. Di antara alasan lain, "files" sistem memudahkan pengguna untuk melihat file mana yang tersedia dan ketika mereka diubah terakhir, sehingga memudahkan pengguna untuk mempertahankan salinan mereka sendiri dari seluruh dataset. Jika Anda umumnya tidak ingin membuat dataset dapat diakses melalui sistem file, set&lt;defaultAccessibleViaFiles&gt; untuk palsu. Dalam kasus baik, hanya gunakan&lt;dapat diaksesVias&gt; untuk beberapa dataset yang terkecuali pada kebijakan umum yang ditetapkan oleh&lt;defaultAccessibleViaFiles&gt; (misalnya, ketika penggunaan dataset .nc file g) Sitemap
             
    * IMPROVED: Sekarang, jika dataset sumber memiliki grid CF\\_mapping informasi, menghasilkan Login Xml for gridded dataset akan menambahkan informasi ke global&lt;addAtts&gt;, dan informasi akan ditambahkan ke global&lt;sumberAtts&gt; setiap kali data dibaca dari file. Informasi akan muncul di atribut global dataset sebagai set atribut dengan grid awal \\_mapping\\_.
         
    * IMPROVED: Dukungan untuk kelompok saat membaca .nc 4 Artikel (dan beberapa sejauh .hdf 5 g) Login Umumnya, ERDDAP™ dataset akan dibangun dari variabel dalam salah satu kelompok file. Juga, GenerateDataset Login EDDGrid Sitemap EDDGrid Login Unpacked sekarang meminta "kelompok" (e.g., "" untuk setiap kelompok, "someGroup", "someGroup /someSubGroup", atau " \\[ Login \\] "hanya kelompok akar) Sitemap Terima kasih kepada Charles Carleton dan Jessica Hausman.
         
    * IMPROVED: GenerateDataset Login EDDGrid Sitemap EDDGrid Login Unpacked sekarang mendukung parameter "DimensisCSV" opsional yang memungkinkan Anda menentukan nama sumber dimensi yang ingin dataset ini digunakan. Gunakan "" untuk mendapatkan variabel yang menggunakan dimensi paling, seperti sebelumnya. Juga, bug kecil terkait yang terjadi dengan jenis file ini sekarang tetap. Sujal Manandhar
         
    * Login Xml sekarang daftar yang benar "EDDTableDariJsonlCSVFiles" (tidak "EDDTableDariJsonlCSV") sebagai salah satu opsi EDDType. Terima kasih kepada Andy Ziegler.
         
    * Sitemap EDDGrid Login Unpacked sekarang menstandardisasi atribut "units" standar / "kanonical" (metode yang sama sebagai konverter Unit) Sitemap Sitemap "meter per second" Login "meters/second" Login "m.s^-1" Sitemap "m s-1" Sitemap "m s-1" Sitemap Terima kasih kepada Andy Ziegler.
        
PERINGATAN: Mungkin ini akan menyebabkan masalah untuk beberapa set data yang ada (e.g., menyebabkan file baru dilabeli "buruk") Sitemap Sitemap [set keras Login](/docs/server-admin/additional-information#hard-flag) untuk dataset sehingga semua file sumber akan dibaca kembali dengan sistem baru.
        
    * IMPROVED: Sekarang, variabel&lt; sourceName &gt; dapat menentukan nilai tetap = NaN dan variabel dapat memiliki actual\\_range atribut yang menentukan kisaran terbatas. Ini kadang-kadang berguna sehingga dataset (tidak dapat di EDDTableDariFileNames dataset) dapat memiliki variabel dummy (Login)   (e.g., lintang, longitude, waktu) dengan nilai tetap NaN, tetapi dengan valid actual\\_range   (sebagaimana diatur oleh atribut) Sitemap Kemudian, dalam pencarian lanjutan pengguna dapat mencari dataset yang memiliki data dalam lintang tertentu, longitude, rentang waktu dan dataset ini akan dapat mengatakan itu tidak memiliki data yang relevan (meskipun semua baris data yang sebenarnya akan menunjukkan NaN) Sitemap Sitemap [Dokumentasi nilai tetap](/docs/server-admin/datasets#fixed-value-sourcenames) Sitemap
Berkat Mathew Biddle.
         
    * BARU: Sekarang, datasets.xml chunk untuk EDDTableDariAsciiFiles atau EDDTableDariColumnarAsciiFiles dataset dapat mencakup tag yang memberitahukan ERDDAP™ untuk mengabaikan semua garis di bagian atas file hingga dan termasuk garis yang sesuai dengan ekspresi reguler yang ditentukan. Sitemap
        &lt;Login\\*Login\\*Login\\*Login\\*&lt;Login
akan mengabaikan semua garis hingga dan termasuk garis yang dimulai dengan "\\*\\*Sitemap Sitemap&lt;WordPress.org (/docs/server-admin/dataset#skipheader) Sitemap
Terima kasih kepada Eli Hunter
         
    * BARU: Sekarang, datasets.xml chunk untuk EDDTableDariAsciiFiles atau EDDTableDariColumnarAsciiFilesdataset dapat mencakup tag yang memberitahukan ERDDAP™ untuk mengabaikan semua garis dalam file yang sesuai dengan ekspresi reguler yang ditentukan. Sitemap
```
        <skipLinesRegex>#.\\*</skipLinesRegex>  
```

akan melewatkan semua garis yang dimulai dengan "#". Sitemap&lt;WordPress.org (/docs/server-admin/dataset#skiplinesregex) Sitemap
Terima kasih kepada Eli Hunter.
         
    * Sitemap datasets.xml chunk untuk setiap dataset EDDTable sekarang termasuk & add Login Sitemap (Login) Sitemap Jika tidak, ERDDAP™ akan menambahkan widget untuk setiap atribut yang ditentukan Nama Formulir Akses Data yang ditetapkan (.html halaman web) untuk memudahkan pengguna untuk menambahkan & menambahkan Login Sitemap (Login Nama, atribut Login) atas permintaan.
Sitemap [Login Login Di mana dokumentasi](/docs/server-admin/datasets#addvariableswhere) Sitemap
Terima kasih kepada Aurelie Briand, et al.
         
    * Login Alat Pihak Ketiga: ERDDAP Login
         ERDDAP -lint adalah program dari Rob Fuller dan Adam Leadbetter dari Institut Laut Irlandia yang dapat Anda gunakan untuk meningkatkan metadata dari Anda ERDDAP™ Login ERDDAP -lint "mendapatkan aturan dan aplikasi web statis sederhana untuk menjalankan beberapa tes verifikasi terhadap Anda ERDDAP™ Login Semua tes berjalan di browser web." Sitemap [Unix/Linux lint tool](https://en.wikipedia.org/wiki/Lint_(software) ), Anda dapat mengedit aturan yang ada atau menambahkan aturan baru. Sitemap [ ERDDAP Login](https://github.com/IrishMarineInstitute/erddap-lint) Informasi lebih lanjut
        
Alat ini sangat berguna untuk dataset yang Anda buat beberapa waktu yang lalu dan sekarang ingin membawa up-to-date dengan preferensi metadata saat ini. Contohnya, versi awal GenerateDatasets Xml tidak memberikan upaya untuk menciptakan global creator\\_name Login creator\\_email , pencipta\\_type, atau creator\\_url Login Anda bisa menggunakan ERDDAP -lint untuk mengidentifikasi dataset yang tidak memiliki atribut metadata.
        
Berkat Rob dan Adam untuk membuat alat ini dan membuatnya tersedia untuk ERDDAP™ Sitemap
        
    * BARU: Sekarang oke jika beberapa file dalam EDDGrid Dari Files dataset tidak memiliki semua variabel dataset. File akan disertakan jika mereka memiliki variabel (dengan semua nilai yang hilang) Sitemap
Terima kasih kepada Dale Robinson dan Doug Latornell.
         
    * BARU: Ada statistik penggunaan baru dalam file log dan Laporan Harian untuk membantu administrator mengidentifikasi pengguna yang menyebabkan masalah memori. Statistik dinamakan "OutOfMemory (Ukuran Array) Login (Login) ", dan "OutOfMemory (Cara Too Besar) Sitemap Mereka menunjukkan alamat IP pengguna yang membuat permintaan dalam kategori ini dan jumlah permintaan yang mereka buat. Jika tidak ada permintaan yang kesulitan, statistik ini tidak akan muncul. Login (Ukuran Array) "dan "OutOfMemory (Cara Too Besar) " permintaan biasanya bukan masalah karena permintaan begitu besar bahwa Meme it ERDDAP™ menangkap mereka dengan cepat dan mengembalikan pesan kesalahan. Login (Login) " permintaan lebih berbahaya karena ERDDAP™ membuat beberapa upaya sebelum menyadari tidak ada cukup memori saat ini tersedia untuk menangani permintaan (meskipun masalah mungkin permintaan lain tepat sebelum permintaan ini) Sitemap
        
Ada juga statistik baru bernama "Pertanyaan Besar, alamat IP" yang menunjukkan alamat IP pengguna yang membuat permintaan besar (Saat ini, gridded .nc Sitemap 1 g) Sitemap
        
Juga, tabel seri waktu di halaman status.html sekarang termasuk kolom "memFail" menunjukkan jumlah permintaan yang gagal dengan "OutOfMemory (Login) " kesalahan karena dataset Beban utama terakhir. Setiap nomor selain 0 di sini setidaknya beberapa penyebab untuk perhatian.
Berkat Bob Simons.
        
    * BARU: Versi baru dari Hyrax menampilkan daftar direktori berbeda dari sebelumnya. ERDDAP™ sekarang dapat membaca daftar direktori lama dan baru.
         
    * BARU: Beban dataset dan respons pengguna yang mengambil &gt; 10 detik untuk menyelesaikan (berhasil atau tidak berhasil) ditandai dengan " (Sitemap) Sitemap Dengan demikian, Anda dapat mencari file log.txt untuk frasa ini untuk menemukan dataset yang lambat untuk memuat ulang atau jumlah permintaan yang lambat selesai. Anda kemudian dapat melihat lebih tinggi dalam file log.txt untuk melihat apa masalah dataset atau apa permintaan pengguna dan siapa itu dari. Ini lambat dataset beban dan permintaan pengguna kadang-kadang pajak pada ERDDAP Sitemap Jadi tahu lebih banyak tentang permintaan ini dapat membantu Anda mengidentifikasi dan memecahkan masalah.
    * IMPROVED: Ketika memvalidasi dataset CF DSG, ERDDAP™ sekarang memastikan bahwa variabel dengan atribut cf\\_role berada di cdm yang sesuai\\_...\\_variables list dan tidak dalam cdm lain\\_...\\_variables list. Sebagai contoh, jika dataset Profil memiliki variabel "station\\_id" yang memiliki atribut cf\\_role=timeseries\\_id, maka "station\\_id" harus berada di cf\\_timeseries\\_variables list, tetapi tidak boleh berada dalam cf\\_profile\\_variables list.
Michal Wengren
         
    * IMPROVED: 'Simplify' sekarang lebih cepat, menggunakan memori kurang, dan dapat mengembalikan LongArray. Sitemap Unidata Sitemap
         
    * IMPROVED: quickRestart sekarang secara signifikan lebih cepat untuk EDDTableDari (Login) Login (kecuali EDDTableDariNcCFFiles dan EDDTableDariInvalidCRAFiles) Sitemap Sitemap (dan tempat lain) sekarang hanya membaca metadata file sampel bukan membaca semua data. Terima kasih kepada Jessica Austin.
         
    * IMPROVED: Sekarang ada dukungan untuk string waktu dengan presisi lebih besar daripada to-the-millisecond jika digit tambahan adalah semua 0's, misalnya, "2020-05-22T01:02:03.456000000Z". Yibo Jiang
         
    * IMPROVED: GenerateDatasetsXml's EDD.suggestDestinationName digunakan untuk menghapus '(' dan segalanya setelah. Sekarang menghapus (.\\*) hanya jika itu akhir sourceName Sitemap Sekarang juga menghapus \\[ Sitemap\\* \\] hanya jika itu berakhir Meme it sourceName Sitemap Julien Paul
         
    * IMPROVED: GenerateDataset Xml sekarang membuat variabel destinationName s unik dengan menambahkan \\_2, \\_3, ..., sesuai kebutuhan. Julien Paul
         
    * IMPROVED: Ketika Kalender2.parseDateTime parses dd, hh, atau HH, 'digit pertama sekarang bisa menjadi ruang.
    * KNOWN PROBLEM: Sitemap ERDDAP™ 2.10, .nc file gm yang mencoba mengubah atribut, tidak mengubah atribut. Ini adalah bug yang dikenal di netcdf-java yang saya telah melaporkan dan mereka mengatakan akan tetap dalam rilis berikutnya netcdf-java.
         
    * Login Saya membuat sistem yang tepat untuk pengujian untuk tautan yang rusak di ERDDAP™ halaman web, jadi sekarang harus ada beberapa tautan yang rusak (setidaknya satu dari setiap tanggal rilis - baru link rusak muncul sering) Sitemap
         
    * BUG FIX: EDDTableDariHttpGet gagal dengan jenis permintaan tertentu. Sekarang tidak. Terima kasih kepada Emma di BODC.
         
    * Login: Untuk menangani beberapa permintaan, EDDTable membuat file sementara untuk setiap variabel yang diminta, dengan nama file yang berakhir dalam nama variabel. Jika nama variabel juga merupakan jenis kompresi (Sitemap) Login ERDDAP Sitemap (dan gagal) untuk menghapus file sementara. Sekarang nama file sementara berakhir dalam ".temp". Berkat Mathew Biddle.
         
    * Facebook Twitter Google Plus Pinterest Email Java Sitemap Format sekarang jauh lebih cenderung membuat perubahan yang salah ketika mencoba memperbaiki format waktu tanggal yang mungkin tidak valid. Tidak ada format tanggal yang disarankan secara otomatis akan dimodifikasi. Berkat Mathew Biddle.
         
    * Login: Jika ada kesalahan saat mendapatkan konten dari URL jarak jauh, dan jika konten errorStream dikompresi, ERDDAP™ sekarang dengan benar menekan pesan kesalahan. Berkat Bob Simons.
         
    * Login:&lt;berlanggananToRemoteErddapDataset&gt; tidak diterapkan ketika EDD ... Dari dataset Erddap adalah dataset anak. Sitemap Chris Romsos
         
    * Login Xml tidak lagi berpikir nama variabel sumber dimulai dengan "latin" mungkin lintang. Terima kasih kepada Vincent Luzzo
         
    * BUG FIX: Sekarang, OutOfMemoryError sambil membaca file data sambil memproses permintaan pengguna bukan alasan untuk menambahkan file ke daftar BadFiles. Berkat Bob Simons.
         

## Versi 2.02{#version-202} 
 (dirilis 2019-08-21) 

*    **Fitur dan Perubahan Baru (untuk pengguna) Sitemap** 
    * BARU: Sekarang ada dua cara untuk mencari dataset di beberapa ERDDAP Sitemap Mereka bekerja sedikit berbeda dan memiliki antarmuka dan opsi yang berbeda.
        
        *    [Sitemap ERDDAP Login](/SearchMultipleERDDAPs.html) dari Bob Simons / NOAA   NMFS   SWFSC   ERD Sitemap
        *    [http://erddap.com](http://erddap.com) dari Rob Fuller / Institut Laut Irlandia.
        
Berkat Tylar Murray untuk permintaan asli.
         
    * IMPROVED: permintaan untuk Meme it "files" sistem untuk men-download file yang sebenarnya di situs jarak jauh (e.g., AWS S3) sekarang mengarah ke pengalihan, sehingga pengguna akan benar-benar mengunduh data dari sumber, bukan menggunakan ERDDAP™ sebagai perantara. Terima kasih kepada Andy Ziegler dan NOAA Sitemap
         
    * BARU: Sebagai contoh fitur yang berhubungan dengan AWS S3 baru, dan untuk memudahkan siapa pun untuk menelusuri dan mengunduh file dari ember AWS S3 publik, kami telah menciptakan
         [~ 110 set data sampel](https://registry.opendata.aws/) yang memungkinkan siapa pun untuk menelusuri konten hampir semua Meme it
         [AWS S3 Open Data ember](https://registry.opendata.aws/) Sitemap Jika Anda mengklik "files" tautan untuk setiap set data sampel tersebut, Anda dapat menjelajahi pohon direktori dan file di ember S3. Karena cara kerja set data ini, daftar direktori ini selalu diperbaharui dengan sempurna karena ERDDAP™ mendapatkan mereka on-the-fly. Meme it Jika Anda mengklik pohon direktori ke nama file yang sebenarnya dan klik pada nama file, ERDDAP™ akan mengarahkan permintaan Anda ke AWS S3 sehingga Anda dapat mengunduh file langsung dari AWS. ERDDAP™ administrator dapat
         [baca petunjuk untuk cara melakukan ini untuk ember S3 lainnya](/docs/server-admin/datasets#working-with-aws-s3-files) Sitemap Terima kasih kepada Andy Ziegler dan NOAA Sitemap
         
*    **Sitemap ERDDAP™ Administrator Perlu Tahu dan Lakukan:** 
    * MENINGGALKAN ANDA MEMILIKI: tidak ada
         
    * Sitemap ERDDAP Metode menyimpan array string (Login) sekarang jauh lebih efisien memori. Login Array digunakan selama ERDDAP™ Tidak dapat membaca file data tabular ASCII. Juga, perubahan lain membuat membaca CSV / TSV / SSV ASCII, kolom ASCII, dan file data tabular jsonlCSV lebih cepat dan lebih efisien memori. Hasilnya adalah: untuk file uji data ASCII 764 MB (tetapi dikompresi ke 52MB .gz Login) dengan 3,503,266 baris dan 33 kolom, penggunaan memori maksimum turun dari 10GB ke 0,6GB (di puncak) Sitemap Waktu untuk membacanya dari ~ 7 menit (tapi bervariasi sangat dengan berapa banyak memori fisik di komputer) hingga ~ 36 detik (termasuk 10s untuk menyederhanakan () yang hanya digunakan oleh GenerateDatasets Login) Sitemap Banyak tempat lain di ERDDAP™ akan mendapat manfaat dari peningkatan efisiensi memori ini. Berkat Tylar Murray dan Mathew Biddle.
        
Saya menjelajahi solusi yang berbeda (menyimpan string di StringArray sebagai array byte UTF-8-encoded) Sitemap Itu mengurangi penggunaan memori lain ~ 33%, tetapi pada biaya perlambatan ~ 33%. Dibandingkan dengan sistem yang sekarang sedang digunakan, yang tampak seperti perdagangan yang buruk. Lebih mudah memberikan memori komputer lebih (beli lebih banyak memori untuk ~ $ 200) daripada membuat lebih cepat (membeli seluruh komputer baru) Sitemap
        
Jika nyaman, itu masih selalu ide yang baik untuk membagi file data tabular besar menjadi beberapa file yang lebih kecil berdasarkan beberapa kriteria seperti stationID dan/atau waktu. ERDDAP™ seringkali hanya perlu membuka salah satu file kecil dalam menanggapi permintaan pengguna, dan dengan demikian dapat merespon lebih cepat.
        
    * IMPROVED: Sekarang [ ERDDAP™ AWS S3 Datasheet](/docs/server-admin/datasets#working-with-aws-s3-files) yang menggambarkan cara mendapatkan ERDDAP™ untuk bekerja dengan file data di ember AWS S3.
Sitemap ERDDAP™ sekarang menggunakan fitur baru di AWS S3 Java API
Sitemap ERDDAP™ sekarang memungkinkan AWS S3 URL untuk menyertakan karakter tambahan (periode, hyphen, underscore) dalam nama ember.
Sitemap ERDDAP™ sekarang membutuhkan URL bucket AWS S3 diidentifikasi dengan cara tertentu:
          https://_bucketName_.s3._aws-region._amazonaws.com/_prefix_/  
di mana prefix adalah opsional.
Terima kasih kepada Andy Ziegler dan NOAA Sitemap
         
    * IMPROVED: GenerateDataset Xml sekarang memperlakukan tambahan umum missing\\_value s stand-ins sebagai nilai yang hilang dan lebih mungkin untuk mengkonversi kolom ke jenis data numerik. Juga, PrimitiveArray.simplify () sekarang log yang nilai data tertentu yang disebabkan untuk mengobati kolom tertentu sebagai kolom string. Berkat Mathew Biddle.
         
    * Sitemap&lt;permintaanBlacklist&gt; sekarang mendukung.\\*Sitemap\\*  (Sitemap\\*Sitemap\\*untuk IPv6) di akhir alamat IP sehingga Anda dapat daftar hitam alamat IP yang lebih besar, misalnya, 110.52.\\*Sitemap\\*  (Cina Unicom Tianjin) Sitemap Lihat dokumentasi untuk [&lt;Login (/docs/server-admin/datasets#requestblacklist) Cina Unicom dan China Telecom.
         
    * IMPROVED: Jika sumber dataset tidak menentukan "institution" atribut, GenerateDataset Xml dan loadDataset sekarang mendapatkannya dari atribut "creator\\_lembagaion" (Sitemap) Sitemap Michal Wengren
         
    * BUG FIX: standar Apa yang tidak selalu diterapkan pada file data ASCII.
Juga, EDDTable tidak benar menangani batasan pada nilai waktu ketika sumber memiliki nilai waktu String dan standarisasi Apa yang digunakan.
Terima kasih kepada Blaze de la Vallee.
        
Saya tidak jelas menyatakan sebelum: Anda hanya harus menggunakan standarisasi Fitur apa ketika Anda benar-benar perlu mereka Meme it (misalnya, ketika file sumber yang berbeda menyimpan nilai waktu dengan cara yang berbeda) karena beberapa permintaan untuk dataset yang menggunakan standarisasi Apa yang akan diproses sedikit lebih lambat.
        
    * Login: Bug dalam kode yang digunakan oleh EDDGrid DariNcFiles menyebabkan gagal dengan .nc 4 dan .hdf 5 file yang memiliki "panjang" (dit64) variabel. Ini sekarang tetap. Berkat Friedemann Wobus.
         
    * Login: Perubahan kecil ke ISO 19115 file untuk membuat validator yang berbeda senang. Terima kasih kepada Chris MacDermaid dan Anna Milan.
         

## Versi 2.01{#version-201} 
 (Oktober 2019) 

*    **Fitur dan Perubahan Baru (untuk pengguna) Sitemap** 
    * Login
*    **Sitemap ERDDAP™ Administrator Perlu Tahu dan Lakukan:** 
    * Login: Bug dalam kode yang menghasilkan Formulir Akses Data untuk tabledap dataset menyebabkan halaman web kosong untuk beberapa dataset. Juga, saya meningkatkan penanganan kesalahan tak terduga di semua halaman HTML sehingga mereka akan (Sitemap) menampilkan pesan kesalahan. Terima kasih kepada Marco Alba.
    * IMPROVED: GenerateDataset Xml tidak lagi mencetak peringatan panjang di bagian atas output. Sebaliknya, lihat [Mengedit Hasil Login Keluaran Xml](/docs/server-admin/datasets#you-need-to-edit-the-output-from-generatedatasetsxml-to-make-it-better) Sitemap Nick Baum
    * IMPROVED: GenerateDataset Xml sekarang membuat sedikit rekomendasi yang berbeda dalam situasi yang berbeda untuk&lt;updateEveryNMillis&gt; untuk EDD ...Dari...Files dataset. Juga, GenerateDataset Xml sekarang menyuguhkan sistem "ekstrak" asli untuk dataset EDDTableDariFiles.

## Versi 2.00{#version-200} 
 (Oktober 2019) 

*    ** ERDDAP™ v2.00 akhirnya di sini&#33; Login**   
     
    * Kami meminta maaf atas penundaan panjang yang diperlukan untuk menyelesaikan versi ini.
Terima kasih atas kesabaran Anda.
         
    * Kabar baik adalah bahwa waktu tambahan digunakan untuk menambahkan lebih banyak fitur yang telah diminta pengguna. Berita buruk adalah bahwa bahkan dengan penundaan, tidak semua fitur yang diminta ditambahkan. Kami maaf, tetapi tampaknya lebih penting untuk mendapatkan rilis ini daripada untuk menunda lebih (Sitemap) terus menambahkan fitur baru. Kami berjanji untuk kembali ke rilis yang lebih sering di masa depan.
         
    * "Versi 2?&#33; Apakah ada perubahan besar dan ketidaksabaran?"
Fitur baru besar? Login
Kepuasan besar atau perubahan untuk administrator atau pengguna? Sitemap
Kami melompat dari v1.82 untuk v2.00:
        * sebagian untuk merayakan 10 tahun (sekarang 11) sejak rilis publik pertama ERDDAP™   (v1.00 pada 2008-05-06, yang luar biasa terlihat seperti v2.00) Sitemap Pada saat itu, ERDDAP™ telah pergi dari satu instalasi hingga hampir 100 instalasi setidaknya 12 negara (Australia, Belgia, Kanada, Prancis, India, Irlandia, Italia, Afrika Selatan, Spanyol, Thailand, Inggris, Amerika Serikat) Sitemap
        * sebagian untuk menandai tambahan utama dalam arah yang sepenuhnya baru: ERDDAP™ sekarang memiliki sistem ingest data untuk pergi dengan layanan server data yang ada (Login [Login](#eddtablefromhttpget) ) Login
        * dan sebagian karena itu bukan lompatan besar dari 1.82 ke 2,00 numerik, sehingga ini tampak seperti waktu yang tepat.
             
    * Kabar baik lainnya adalah bahwa sekarang ada dua kelompok lain yang berkontribusi kode untuk ERDDAP™   (dalam versi ini dan dengan indikasi mereka akan terus) : Rob Fuller dan Adam Leadbetter dari Institut Laut Irlandia, dan Roland Schweitzer dari PMEL dan Weathertop Consulting. Terima kasih banyak. Ini benar bahwa mereka bekerja pada proyek memilih mereka sendiri, tetapi itu model pengembangan open-source klasik - kelompok berkontribusi kode untuk fitur yang paling ingin mereka lihat ditambahkan. Manfaat tambahan untuk kontributor: mereka mendapatkan untuk menggunakan fitur baru segera setelah mereka selesai; mereka tidak harus menunggu rilis berikutnya ERDDAP Sitemap Kelompok Anda dipersilahkan untuk berkontribusi, juga&#33; Sitemap [ ERDDAP™ Panduan Programmer](/docs/contributing/programmer-guide) Sitemap
         
    * Kami berharap Anda suka ERDDAP™ v2.00. Kami berharap 10 tahun ke depan ERDDAP™ pembangunan dan semakin banyak digunakan di seluruh dunia.
         
*    **Fitur dan Perubahan Baru (untuk pengguna) Sitemap**   
     
    * Sitemap orderByMean Login
Sitemap tabledap dataset akan menghitung cara untuk kelompok yang ditentukan. Juga, semua Meme it orderBy pilihan sekarang mendukung cara tambahan kelompok mendefinisikan: _numerikVariable \\[ Login \\[ Sitemap \\]  \\[ Login \\]  \\] _, misalnya, waktu/1hari atau kedalaman/10:5. Sitemap stationID Sitemap orderByMean  (Sitemap stationID Sitemap) akan memilah hasil dengan stationID dan waktu, kemudian menghitung dan mengembalikan maksud airTemp untuk setiap stationID setiap hari. Ini sangat berguna dan fitur baru yang kuat. Kode baru untuk fitur ini dan perubahan kode lama berkontribusi oleh Rob Fuller dan Adam Leadbetter dari Institut Laut Irlandia dan diserahkan melalui Git. Terima kasih, Dan Adam&#33;
         
    * BARU: output file jenis untuk tabular dataset: [.data Login](https://developers.google.com/chart/interactive/docs/reference#dataparam) Login
file JSON diformat untuk digunakan dengan Google Visualization perpustakaan klien ( Google Charts ) Sitemap Kode untuk ini berkontribusi oleh Roland Schweitzer dan diserahkan melalui Git. Terima kasih, Login
         
    * BARU: output file jenis untuk tabular dataset: [ .jsonlCSV1 ](https://jsonlines.org/examples/) Login
yang seperti yang ada .jsonlCSV opsi, tetapi dengan nama kolom di baris pertama. Selamat datang di Eugene Burger.
         
    * BARU: Jika administrator memungkinkan, pengguna sekarang dapat masuk dengan mereka Meme it [Login](https://orcid.org) Login
Ini adalah sistem otentikasi OAuth 2.0, seperti otentikasi Google. ORCID banyak digunakan oleh peneliti untuk mengidentifikasi diri mereka sendiri. Akun ORCID gratis dan tidak memiliki masalah privasi yang dimiliki akun Google. Sitemap ERDDAP Sitemap [Orcid otentikasi instruksi](/docs/server-admin/additional-information#orcid) Sitemap BCO-DMO (Danie Kinkade) Sitemap
         
    * NEW: Konverter URL baru mengkonversi URL terbaru ke URL terbaru.
Lihat .../erddap/convert/urls.html pada setiap ERDDAP™ instalasi, misalnya,
         [link ini ke converter di ERD   ERDDAP ](https://coastwatch.pfeg.noaa.gov/erddap/convert/urls.html) Sitemap Ini harus berguna untuk manajer data. Ini juga digunakan secara internal oleh GenerateDatasetsXml. Terima kasih kepada Bob Simons dan Sharon Mesick.
         
    * Sitemap [Konverter](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) sekarang memiliki pilihan untuk mengkonversi waktu string umum ke waktu string ISO8601, atau mengubah UDUNITS -seperti unit waktu string menjadi yang tepat UDUNITS string unit waktu. Ini juga harus berguna untuk Meme it ERDDAP™ administrator yang perlu tahu format apa untuk menentukan atribut "units" untuk variabel waktu string. Ini juga digunakan secara internal oleh GenerateDatasetsXml dan standarisasi fitur apa dari EDDTableDariFiles. Berkat Bob Simons.
         
    * Sitemap [Konverter Unit](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) memiliki opsi "Standardize UDUnits".
Sebagai contoh, "deg\\_C/m" dan "degrees\\_C meter-1" keduanya dikonversi ke
"url": "https://www.facebook.com/ Fitur ini juga digunakan oleh standarisasi fitur apa dari EDDTableDariFiles. Berkat Bob Simons.
         
    * BARU: Untuk grafik (selain grafik permukaan) di griddap dan tabledap 's Membuat halaman web Graph, ketika sumbu x bukan sumbu waktu, jika hanya subset dari rentang variabel sumbu x terlihat, sekarang ada tombol di atas grafik untuk menggeser X Axis ke kiri atau kanan. Berkat Carrie Wall Bell / proyek hidrofon.
         
    * NEW: Untuk grafik, sumbu X dan / atau Y sekarang dapat menggunakan skala Log.
Pengguna dapat mengontrol Skala Axis Y melalui widget drop-down baru di griddap dan tabledap Membuat halaman web Graph. Sitemap [Sitemap Dokumentasi yRange](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#xRange) Sitemap Berkat Carrie Wall Bell / proyek hidrofon.
         
    * Sitemap ERDDAP™ sekarang menggunakan berbagai kode kesalahan HTTP dan sekarang kembali(OPeN)DAPv2.0-format pesan kesalahan payload. Sitemap [Sitemap](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#Errors) Sitemap Terima kasih kepada Antoine Queric dan Aurelie Briand.
         
    * IMPROVED: Jangan gunakan alat Netcdf-java/c atau perangkat lunak lainnya untuk terhubung ke .nc Sitemap .hdf file yang dilayani oleh ERDDAP 's /file/system seolah-olah file lokal. ERDDAP™ sekarang menolak permintaan ini. Ini tidak efisien dan sering menyebabkan masalah lain. Sitemap
        
        * Sitemap(OPeN)DAPsoftware klien untuk terhubung ke ERDDAP Sitemap DAP Layanan untuk dataset (yang memiliki /griddap / atau / tabledap URL) Sitemap Itulah DAP dan baik. Meme it
        * Atau, gunakan Formulir Akses Data yang ditetapkan untuk meminta subset data.
        * Atau, jika Anda membutuhkan seluruh file atau akses berulang selama jangka waktu yang lama, gunakan curl Login wget , atau browser Anda untuk mengunduh seluruh file, kemudian mengakses data dari salinan file lokal Anda.
        
          
         
    * IMPROVED: Di ERDDAP™ Halaman depan, Pencarian Teks Penuh sekarang di atas "Lihat Daftar Semua Dataset" karena merupakan titik awal terbaik bagi sebagian besar pengguna. Berkat Didier Mallarino dan Maurice Libes.
         
    * IMPROVED: DataProviderForm3.html sekarang daftar dropdown umum standard\\_name Sitemap Berkat seseorang di pertemuan DMAC IOOS.
         
    * IMPROVED: Pada halaman /file/web, sekarang ada tautan ke "Apa yang bisa saya lakukan dengan file ini?" bagian dari /file/dokumentasi. Bagian itu menjelaskan berbagai jenis file dan memberikan saran untuk cara bekerja dengan mereka. Terima kasih kepada Maurice Libes.
         
    * IMPROVED: Hampir setiap permintaan untuk ERDDAP™ harus setidaknya sedikit lebih cepat, dan kadang-kadang jauh lebih cepat.
         
    * Login: Dalam beberapa keadaan, ketika dataset yang tersimpan di beberapa jenis .nc file, atribut "id" global diatur ke nama yang disarankan file, yang mencakup hash untuk membuatnya unik untuk permintaan itu. Sekarang "id" benar tidak berubah (jika ditentukan) atau set ke dataset datasetID   (jika tidak ditentukan) Sitemap Terima kasih kepada John Maurer.
         
*    **Sitemap ERDDAP™ Administrator Perlu Tahu dan Lakukan:**   
     
    * TO DO: Rilis ini akan memakan waktu dan bekerja dari Anda. Silakan bersabar dan merencanakan beberapa jam untuk melakukan perubahan yang diperlukan dan beberapa jam untuk bereksperimen dengan fitur baru.
         
    * TO DO: Untuk keamanan, buat salinan cadangan dari setup Anda saat ini.xml dan datasets.xml file sehingga Anda dapat mengalihkan mereka dalam kasus yang tidak mungkin di mana Anda perlu untuk mengalihkan ERDDAP™ v1.82.
         
    * TO DO: direkomendasikan Java OpenJDK Sitemap (Login) Sitemap
Ini adalah varian sumber terbuka Java yang tidak memiliki pembatasan atas penggunaannya (Sitemap Oracle Sitemap Java Login) Sitemap Ini berasal dari Oracle Sitemap Java dengan cara yang sedang bepergian, dengan Oracle 's berkah. Untuk alasan keamanan, penting untuk menjaga Anda Java versi terbaru. Sitemap ERDDAP Sitemap [ Java instruksi instalasi](/docs/server-admin/deploy-install#java) Sitemap
         
    * Facebook Twitter Google Plus Pinterest Email Java perlu tambahan kecil untuk instalasi Tomcat Anda: lihat [Instruksi Cache Sumber Daya](/docs/server-admin/deploy-install#contentxml) Sitemap Saya pikir ini adalah pengganti -XX: Pengaturan MaxPermSize, yang (Sitemap) BukaJDK tidak lagi mendukung.
         
    * TO DO: Standar baru dan merekomendasikan&lt;fontFamily&gt; pengaturan di setup.xml adalah
DejaVu Sans yang dibangun ke dalam AdopsiOpenJDK Java Sitemap Sitemap
         [instruksi instalasi font yang direvisi](/docs/server-admin/deploy-install#fonts) Sitemap
         
    * TO DO: Banyak tag yang bergerak dari setup.xml ke datasets.xml Sitemap Keuntungannya adalah bahwa Anda dapat mengubah nilai-nilai mereka sementara Meme it ERDDAP™ berjalan, tanpa restart ERDDAP Sitemap Tidak mungkin, Anda dapat dengan mudah berubah&lt;startBodyHtml5&gt; untuk menampilkan pesan sementara di ERDDAP™ Login (e.g., "Periksa JPL MUR SST v4.1 dataset ..." atau "Ini ERDDAP™ akan offline untuk pemeliharaan 2019-05-08T17:00 PDT melalui 2019-05-08T20:00 PDT.") Sitemap Jika/ketika Anda mengubah tag ini datasets.xml , perubahan akan berpengaruh pada waktu berikutnya ERDDAP™ Login datasets.xml Sitemap
         
        
        1. Salin konten ini ke dalam Anda datasets.xml file (mana di dekat awal file, setelah&lt;Login
```
            <!-- The tags below are described in setupDatasetsXml.html.
                 The defaults listed below are as of ERDDAP™ v2.00. -->
            <cacheMinutes></cacheMinutes>                                     <!-- default=60 --> 
            <decompressedCacheMaxGB></decompressedCacheMaxGB>                 <!-- default=10 --> 
            <decompressedCacheMaxMinutesOld></decompressedCacheMaxMinutesOld> <!-- default=15 --> 
            <drawLandMask></drawLandMask>                                     <!-- "over" or "under" (default) -->
            <graphBackgroundColor></graphBackgroundColor>                     <!-- 0xAARRGGBB, default is 0xffccccff -->
            <loadDatasetsMinMinutes></loadDatasetsMinMinutes>                 <!-- usually=default=15 -->
            <loadDatasetsMaxMinutes></loadDatasetsMaxMinutes>                 <!-- default=60 -->
            <logLevel></logLevel> <!-- "warning" (fewest messages), "info" (default), or "all" (most messages) -->
            <nGridThreads></nGridThreads>                                     <!-- default=1 -->
            <nTableThreads></nTableThreads>                                   <!-- default=1 -->
            <partialRequestMaxBytes></partialRequestMaxBytes>                 <!-- default=490000000 -->
            <partialRequestMaxCells></partialRequestMaxCells>                 <!-- default=10000000 -->
            <slowDownTroubleMillis></slowDownTroubleMillis>                   <!-- default=1000 -->
            <unusualActivity></unusualActivity>                               <!-- default=10000 -->
            <!-- The defaults for the following tags are in messages.xml. -->
            <startHeadHtml5></startHeadHtml5>                                
            <startBodyHtml5></startBodyHtml5>                                 <!-- This is often customized. -->
            <theShortDescriptionHtml></theShortDescriptionHtml>               <!-- This is often customized. -->
            <endBodyHtml5></endBodyHtml5>
            <standardLicense></standardLicense>
            <standardContact></standardContact>
            <standardDataLicenses></standardDataLicenses>
            <standardDisclaimerOfEndorsement></standardDisclaimerOfEndorsement>
            <standardDisclaimerOfExternalLinks></standardDisclaimerOfExternalLinks>
            <standardGeneralDisclaimer></standardGeneralDisclaimer>
            <standardPrivacyPolicy></standardPrivacyPolicy>
```

        2. One-by-one, salin nilai (Sitemap) untuk setiap tag dari file setup.xml Anda ke tag baru yang Anda barukan (Sitemap) Sitemap datasets.xml Sitemap Misalnya, jika Anda telah menggunakan nilai 30 untuk&lt;Login di setup.xml, Anda harus menyalin nilai itu ke baru&lt;cacheMinutes&gt; tag di datasets.xml   (meskipun jika nilainya sama dengan nilai default baru, yang terbaik adalah meninggalkan tag di datasets.xml Login) Sitemap
            
Jika nilai Anda berbeda dari default yang disarankan baru (lebih dari untuk&lt;Login&lt;theShortDescriptionHtml&gt;, yang berguna untuk menyesuaikan Anda ERDDAP™ instalasi), mempertimbangkan beralih ke nilai default baru. Ini sangat benar&lt;WordPress.org&lt;sebagianRequestMaxCells&gt;, di mana nilai default / disarankan telah berubah secara signifikan selama bertahun-tahun.
            
Setelah Anda menyalin setiap nilai, menghapus tag dan deskripsinya dari setup.xml. Lebih baik memiliki tag ini dalam Meme it datasets.xml Sitemap Dan sekarang ada deskripsi yang lebih baik di Meme it [Login](/docs/server-admin/datasets#the-basic-structure-of-the-datasetsxml-file) Sitemap
            
        
Kuis sistem baru adalah halaman web pertama ketika Anda mulai ERDDAP akan menjadi default ERDDAP™ Login Setiap halaman web berikutnya akan menggunakan konten ...Html yang Anda tentukan datasets.xml Sitemap
        
    * PERINGATAN: Pertama kali Anda menjalankan ERDDAP™ v2.0, dataset berdasarkan file data lokal akan memuat **Sitemap** Sitemap ERDDAP™ perlu membuat ulang database file dalam format yang sedikit berbeda. Setelah beban awal lambat, mereka akan memuat dengan cepat, seperti sebelumnya. Promo
         
#### Login{#eddtablefromhttpget} 
    *    [FITUR BARU BIG: EDDTableDariHttpGet](#eddtablefromhttpget)   
Sitemap ERDDAP™ hanya membaca data dan membuatnya tersedia untuk pengguna. Sitemap ERDDAP™ memiliki sistem yang sederhana dan efisien untuk ingesting data real time dari sensor. Di antara fitur lain, dataset ini menawarkan versi berbutir halus: itu ingat setiap perubahan yang dibuat pada dataset, ketika dibuat, dan oleh siapa. Biasanya, pengguna hanya akan menginginkan versi terbaru dari dataset, dengan semua perubahan yang diterapkan. Tapi ada opsi untuk pengguna untuk meminta data dari dataset seperti itu ada pada setiap saat. Ini memfasilitasi ilmu reproduksi. Dengan demikian, tidak seperti dataset waktu dekat lainnya, dataset ini memenuhi syarat untuk [ DOI Login](https://en.wikipedia.org/wiki/Digital_object_identifier) Sitemap karena mereka bertemu Meme it DOI persyaratan bahwa dataset tidak berubah, kecuali dengan agregasi. Sitemap [Login](/docs/server-admin/datasets#eddtablefromhttpget) Sitemap Terima kasih kepada OOI (dari lama yang lalu dan sekarang) untuk berbicara tentang kebutuhan ini dan Eugene Burger untuk pengingat tentang bekerja pada apa yang penting.
         
    * FITUR BARU BESAR: ERDDAP™ sekarang dapat melayani data langsung dari file data yang terkompresi secara eksternal, termasuk .tgz Login .tar  .gz Login .tar  .gzip Login .gz Login .gzip Login .zip Login .bz2 , atau .Z. Dataset dapat mencakup campuran file yang terkompresi secara eksternal (mungkin file data yang lebih tua?) dan non-externally-compressed file, dan Anda dapat mengompreskan/menekan file setiap saat.
        
Ini bekerja hebat&#33;
Dalam kebanyakan kasus, perlambatan yang terkait dengan menekan file kecil. Kami sangat mendorong Anda untuk mencoba ini, terutama untuk set data dan / atau file data yang jarang digunakan.
        
Ini dapat menyimpan Anda $ 30.000 atau lebih&#33;
Ini adalah salah satu dari beberapa ERDDAP™ fitur yang dapat menghemat banyak uang - jika Anda mengompres banyak file data, Anda akan membutuhkan lebih sedikit RAIDs / hard drive untuk menyimpan data, atau sebaliknya, Anda dapat melayani jauh lebih banyak data (hingga 10x) dengan RAID yang sudah Anda miliki. Meme it Jika fitur ini menyimpan Anda dari membeli RAID lain, maka telah menyelamatkan Anda sekitar $ 30.000.
        
Sitemap [Dokumentasi File Terkompresi secara eksternal](/docs/server-admin/datasets#externally-compressed-files) Sitemap Berkat Benoit Perrimond dan Blaze de la Vallee.
        
    * FITUR BARU BESAR: Sitemap EDDGrid DariFiles dan semua dataset EDDTableDariFiles mendukung&lt;cacheDariUrl&gt; tag dan&lt;cacheSizeGB&gt; tag. Jika cacheSizeGB tidak ditentukan, ini akan mengunduh dan memelihara salinan lengkap dari file dataset jarak jauh. Jika cacheSizeGB ditentukan dan adalah &gt; 0, ini akan mengunduh file dari dataset jarak jauh, sesuai kebutuhan, ke cache lokal dengan ukuran terbatas, yang berguna ketika bekerja dengan berbasis cloud (g., S3) file data. Sitemap [Login Sitemap](/docs/server-admin/datasets#cachefromurl) Sitemap Terima kasih kepada Bob Simons dan Roy Mendelssohn (yang selama bertahun-tahun telah menulis script untuk menangani membuat salinan lokal file dataset jarak jauh) , John Cotten (ketika dia di Amazon Web Services) Google Cloud Platform
         
    * BARU: EDDTable baruDariJsonlCSV kelas dapat membaca data tabular dari
         [Login Garis file CSV](https://jsonlines.org/examples/)   ("Better dari CSV") Sitemap Berkat orang-orang di Marine Institute of Irlandia untuk memberitahu saya tentang format ini dan untuk Eugene Burger dan PMEL untuk meminta untuk mendukungnya sebagai jenis input.
         
    * Sitemap EDDGrid dan semua EDDTableDariFiles dataset mendukung&lt;nThreads&gt; pengaturan, yang memberi tahu ERDDAP™ berapa banyak benang untuk digunakan ketika menanggapi permintaan. Sitemap [nThreads dokumentasi](/docs/server-admin/datasets#nthreads) Sitemap Berkat Rob Bochenek Ilmu Data Axiom, Eugene Burger, Conor Delaney (ketika dia di Amazon Web Services) Google Cloud Platform
         
    * Standar baru Apa untuk semua kelas EDDTableDariFiles -
Sebelumnya, jika untuk variabel tertentu, nilai atribut penting (Login scale\\_factor Login add\\_offset Login missing\\_value , \\_FillValue, unit) tidak konsisten, EDDTableDariFiles akan memilih satu nilai untuk setiap atribut menjadi "valid" dan menandai file dengan nilai atribut lain sebagai "Bad Files". Sekarang, ada sistem untuk menstandardisasi file segera setelah EDDTableDariFiles membaca file. Sitemap [EDDTableDari standarisasi Sitemap](/docs/server-admin/datasets#standardizewhat) Sitemap Sitemap ERDDAP Tujuan utama adalah untuk membuat file data dan dataset dapat diakses dengan cara yang konsisten. Login Apa alat baru yang penting untuk membuat kenyataan. Terima kasih kepada Marco Alba, Margaret O'Brien (dan pengguna EML lainnya) , BCO-DMO, dan pengguna InPort.
         
    * NEW EDDTableDariInvalidCRAFiles memungkinkan Anda untuk membuat dataset dari koleksi NetCDF   (v3 atau v4)   .nc file yang menggunakan khusus, tidak valid, varian CF DSG Contiguous Ragged Array (Login) Login File sampel untuk jenis dataset ini dapat ditemukan dihttps://data.nodc.noaa.gov/thredds/catalog/ncei/wod/  \\[ 2020-10-21 Server ini sekarang tidak tersedia \\] Sitemap Login ERDDAP™ mendukung jenis file ini, itu adalah jenis file yang tidak valid yang tidak ada yang harus mulai menggunakan. Kelompok yang saat ini menggunakan jenis file ini sangat didorong untuk digunakan ERDDAP™ untuk menghasilkan file CF DSG CRA yang valid dan berhenti menggunakan file ini. Terima kasih kepada Ajay Krishnan dan Tim Boyer.
         
    * EDDTableDariThreddsFiles dan EDDTableDari Hyrax File sekarang diuraikan. Silahkan beralih ke EDDTableDariNcFiles (atau varian) Sitemap&lt;Login Jika tidak bekerja untuk beberapa alasan, email erd.data at noaa.gov Sitemap Jika tidak ada keluhan sebelum 2020, jenis dataset ini dapat dihapus.
         
    * Login Sistem untuk secara otomatis mengkonversi non-ISO 8601 kali menjadi ISO 8601 kali (diperkenalkan dalam v1.82) telah sangat diperluas untuk menangani sejumlah besar format tambahan. Ini mempengaruhi GenerateDatasetXml dan ERDDAP 's penanganan metadata sumber.
         
    * Login Dengan revisi utama ketiga dari sistem parsing waktu String (dan semoga yang terakhir) Login ERDDAP™ tidak lagi digunakan Java 's DateTimeFormatter karena bug yang kadang-kadang mempengaruhi waktu ekstrem (tahun&lt;Login ERDDAP™ sekarang menggunakan sistem sendiri untuk mengatur string waktu.
         
    * PERINGATAN: Sistem parsing waktu String baru agak ketat. Jika salah satu dataset Anda tiba-tiba hanya memiliki nilai yang hilang untuk nilai waktu, penyebabnya hampir pasti bahwa string format waktu sedikit salah. Harus ada pesan kesalahan dalam log. txt terkait dengan nilai waktu yang tidak sesuai dengan format waktu -- yang harus membantu Anda memperbaiki string format waktu untuk dataset. Jika Anda memerlukan bantuan, gunakan opsi dalam ERDDAP 's Time Converter yang "Convert \\[ Login \\] setiap waktu string umum ke waktu string ISO 8601" -- itu menunjukkan format yang digunakan converter untuk membuat string sumber.
         
    * RECOMMENDASI: Cara tercepat, termudah, dan termurah untuk mempercepat ERDDAP 's akses ke data tabel adalah untuk menempatkan file data pada Solid State Drive (Login) Sitemap Sebagian besar set data tabel relatif kecil, sehingga SSD 1 atau 2 TB mungkin cukup untuk menahan semua file data untuk semua set data tabel Anda. SSD akhirnya memakai apakah Anda menulis data ke sel, menghapusnya, dan menulis data baru ke sel itu terlalu banyak kali. Sebagai gantinya, saya sarankan (sebanyak mungkin) Anda hanya menggunakan SSD Anda untuk menulis data sekali dan membacanya banyak kali. Kemudian, bahkan SSD kelas konsumen harus bertahan lama, mungkin jauh lebih lama dari hard disk drive (Login) Sitemap SSD kelas konsumen sekarang murah (di 2018, ~ $ 200 untuk 1 TB atau ~ $ 400 untuk 2 TB) dan harga masih jatuh cepat. Sitemap ERDDAP™ mengakses file data, SSD menawarkan keduanya
        
        * latensi lebih pendek (~0.1ms, versus ~ 3ms untuk HDD, versus ~ 10 (Sitemap) ms untuk RAID, versus ~ 55ms untuk Amazon S3) Sitemap
        * throughput lebih tinggi (~ 500 MB / S, versus ~ 75 MB / s untuk HDD versus ~ 500 MB / s untuk RAID) Sitemap
        
Jadi Anda bisa mendapatkan peningkatan kinerja ~ 10X (Login) di $200&#33; Dibandingkan dengan sebagian besar perubahan yang mungkin untuk sistem Anda (server baru untuk $ 10.000? RAID baru untuk $ 35,000? switch jaringan baru untuk $ 5,000? Sitemap) , ini sejauh pengembalian investasi terbaik (Login) Sitemap Jika server Anda tidak dimuat dengan memori, memori tambahan untuk server Anda juga merupakan cara yang bagus dan relatif murah untuk mempercepat semua aspek ERDDAP Sitemap
         \\[ SSD akan sangat bagus untuk data gridded, juga, tetapi kebanyakan dataset gridded jauh lebih besar, membuat SSD sangat mahal. \\]   
         
    * BARU: Semua orang yang masuk ke dalam mendapat peran = \\[ Login Sitemap \\] , bahkan jika tidak ada&lt;pengguna&gt; tag untuk mereka di Meme it datasets.xml Sitemap Jika Anda mengatur dataset&lt;Login \\[ Login Sitemap \\] , maka siapa pun yang masuk ke ERDDAP™   (e.g., melalui akun Gmail atau Orcid mereka) akan dilegalkan untuk mengakses dataset, bahkan jika Anda belum menentukan&lt;pengguna&gt; tag untuk mereka di Meme it datasets.xml Sitemap Terima kasih kepada Maurice Libes.
         
    * Sitemap UDUNITS Konverter unit UCUM secara luas ditingkatkan.
Ini menangani string unit yang tidak valid lebih baik (dimulai dengan penekanan pada informasi pelestarian, bukan validitas yang memaksa) Sitemap Juga, hasilnya sekarang memiliki sintaks standar.
         
    * Sitemap UDUNITS /UCUM unit converter memiliki opsi baru untuk menstandardisasikan UDUNITS Login
Ini bekerja dengan baik untuk valid UDUNITS string dan cukup baik untuk non-standar / tidak valid UDUNITS Login Misalnya, misalnya, UDUNITS ="meter per detik", "meter / detik", "m.s^-1" Sitemap "m s-1" akan kembali "m.s-1". Ini diperlukan untuk standarisasi baru Sistem apa yang dijelaskan di atas. Terima kasih kepada Marco Alba, Margaret O'Brien (dan pengguna EML lainnya) , BCO-DMO, dan pengguna InPort.
         
    * BARU: EDDTableDari MultidimNcFiles sekarang memiliki [Login](/docs/server-admin/datasets#treatdimensionsas) opsi, yang memberitahukan ERDDAP™ untuk mengobati dimensi tertentu (Sitemap) seolah-olah mereka dimensi lain (Sitemap) Sitemap Ini berguna untuk beberapa file yang salah yang menggunakan dimensi yang berbeda untuk variabel yang berbeda ketika mereka harus menggunakan hanya satu dimensi (Sitemap) Sitemap Berkat Marco Alba dan Maurice Libes.
         
    * BARU: Sekarang, semua EDDGrid Dari...Files dataset mendukung sumbu khusus baru sourceName yang memberitahukan ERDDAP™ untuk mengekstrak informasi dari fileName (Login) dan gunakan nilai untuk **Login** nilai sumbu kiri yang ada. Format ini
        \\*\\*\\*replaceDariFile,_dataType_,_extractRegex_,_captureGroupNumber_
Sitemap [dokumentasi ini](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata) Sitemap Sitemap NOAA Pathfinder Dataset agregasi Harian.
         
    * BARU: Sekarang, semua EDDGrid Dari...Files dataset mendukung sumbu khusus baru sourceName yang memberitahukan ERDDAP™ untuk mengekstrak informasi dari pathName file (filename.ext)   
        \\*\\*\\*pathName,_dataType_,_extractRegex_,_captureGroupNumber_
Untuk ini, nama jalan selalu menggunakan '/' sebagai karakter pemisah direktori, tidak pernah '\'.
Sitemap [dokumentasi ini](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata) Sitemap Terima kasih kepada Blaze de la Vallee.
         
    * BARU: Sekarang, semua EDDTableDari... File dataset mendukung variabel pseudo tambahan sourceName s yang mengekstrak informasi dari fileName file (Login)   (Login [\\*\\*Login](/docs/server-admin/datasets#filename-sourcenames) ) atau dari pathName penuh file (/dir1/dir2/filename.ext)   (Login [\\*\\*Login](/docs/server-admin/datasets#pathname-sourcenames) ) Sitemap Terima kasih kepada Blaze de la Vallee.
         
    * Sitemap EDDGrid dataset memiliki satu atau lebih besar dimensi (misalnya, jutaan nilai) yang mengambil banyak memori, Anda dapat mengatur baru [&lt;dimensiNilaiInMemory&gt; (/docs/server-admin/datasets#dismensionvaluesinmemory) pengaturan untuk palsu (default benar) , yang menyebabkan dataset untuk menyimpan nilai pada disk dan mengambil mereka ketika diperlukan. Terima kasih kepada David Rodriguez dan Rich Signell (Sitemap EDDGrid Sitemap) Sitemap
         
    * IMPROVED: Sebelumnya, jika Anda memesan ulang dataVariable s untuk dataset EDDTableDariFiles dan isi ulang dataset, EDDTableDariFiles akan membaca semua datafiles. Sekarang, itu dapat berurusan dengan reordering tanpa membaca semua file data. About Roland Schweitzer
         
    * IMPROVED: Sekarang, ketika ERDDAP™ membaca ASCII, NCCSV, dan JSON Garis file data tabel CSV, jika menemukan kesalahan pada garis tertentu (e.g., jumlah item yang salah) , itu log pesan peringatan ("WARNING: Garis lompatan #" ... " jumlah item yang tidak terduga ...") Login [Login](/docs/server-admin/additional-information#log) dan kemudian terus membaca sisa file data. Dengan demikian, tanggung jawab Anda untuk melihat secara berkala (atau menulis script untuk melakukannya Meme it) untuk pesan itu di log. Meme it txt sehingga Anda dapat memperbaiki masalah dalam file data. ERDDAP™ mengatur cara ini sehingga pengguna dapat terus membaca semua data valid yang tersedia meskipun beberapa baris file memiliki kekurangan. Sitemap ERDDAP™ menandai file sebagai "buruk" dan menghapusnya dari dataset.
         
    * IMPROVED: Ketika waktu yang tepat (e.g.) disimpan di sumber sebagai "meninjak ..." (atau unit yang lebih besar) Login ERDDAP™ sekarang membaginya dengan mili detik terdekat saat membaca nilai menjadi ERDDAP Sitemap Jika tidak, nomor titik mengambang diarsipkan dan meminta data pada waktu tertentu (e.g.,&time=2018-06-15T01:30:00) akan gagal. Sebelumnya, dihitung mereka sesegera mungkin (dan masih jika unitnya e.g., "detik sejak ..." atau "ketiga sejak ...") Sitemap Ini terbaik untuk menghindari masalah ini dengan tidak menggunakan unit besar (Sitemap) untuk menyimpan nilai waktu yang tepat (e.g., mikrodetik) -- komputer melakukan pekerjaan yang buruk dari penanganan digit desimal. Terima kasih kepada Marco Alba.
         
    * CHANGES untuk EDDTableDari EDDGrid yang membuatnya jauh lebih baik. Meme it Login EDDGrid memungkinkan pengguna query gridded dataset seolah-olah mereka tabular dataset ("query by nilai") Sitemap
        
        * Sekarang mendukung&lt;maxAxis0&gt; tag (default=10) yang menentukan jumlah sumbu maksimum \\[ Sitemap \\]   (Sitemap "time" ) nilai-nilai yang dapat ditanyakan sekaligus. Ini mencegah permintaan naif dari mendapatkan EDDTableDari EDDGrid untuk mencari melalui seluruh dataset gridded (yang akan gagal dengan kesalahan waktu) Sitemap
        * Login Xml sekarang memiliki pilihan untuk menghasilkan EDDTableDari EDDGrid dataset untuk semua dataset gridded yang diberikan ERDDAP™ yang cocok dengan regex yang ditentukan (menggunakan .\\* untuk mencocokkan semua dataset) Sitemap Dataset yang menciptakan memiliki informasi tambahan dalam atribut ringkasan yang menunjukkan bahwa ini adalah versi tabel dari dataset gridded. Dan mereka datasetID Sitemap datasetID dataset gridded, ditambah "\\_AsATable".
        * Ada kecepatan besar untuk setup yang paling umum: ketika dataset gridded adalah EDDGrid Dari dataset Erddap yang sama ERDDAP Sitemap
        
Terima kasih kepada James Gallagher dan Ed Armstrong.
         
    * BARU: menghasilkan Login Xml untuk semua jenis dataset sekarang jauh lebih mungkin untuk menambahkan \\_FillValue atau missing\\_value atribut ke variabel numerik addAttributes Sitemap Misalnya, ini terjadi ketika penanda nilai hilang string (g., "", ".", "?", "NA", "th", "NaN") untuk variabel itu dalam file sampel dikonversi ke ERDDAP Nilai hilang asli (127 di kolom byte, 32767 dalam kolom pendek, 2147483647 kolom int, 9223372036854775807 dalam kolom panjang, dan NaN dalam mengapung dan variabel ganda) Sitemap Hal ini juga terjadi untuk nilai NaN dalam mengapung dan variabel ganda. Juga, "th" ditambahkan ke daftar penanda nilai yang hilang umum di kolom data numerik yang ERDDAP™ harus mencari. Berkat Matt Biddle dari BCO-DMO.
         
    * IMPROVED: opsi ncdump dalam menghasilkan Login Xml sekarang lebih seperti ncdump (tapi masih menggunakan versi netcdf-java ncdump) Sitemap Sekarang, mencetak daftar opsi baru. Sitemap .nc file ml, mencetak output ncdump untuk hasil .nc perubahan file g .nc Sitemap .hdf Login
         
    * Login: Ada kebocoran pegangan file (akhirnya menyebabkan ERDDAP™ Sitemap) disebabkan ketika membuat beberapa jenis file output, misalnya, .geotif, tidak mungkin ketika kesalahan terjadi selama penciptaan. Saya pikir/hope ini sekarang semua tetap. Jika Anda masih melihat masalah, silakan beri tahu saya jenis dataset (grid atau tabel) dan jenis file yang menyebabkan masalah. Meme it Terima kasih kepada Steven Beale, Lynn DeWitt, Jibei Zhao, dan lainnya.
         
    * Login: Login WMS   Leaflet demo tidak sepenuhnya / tidak mengubah sumbu "depth" untuk "tinggi". Sekarang, itu tidak, dan permintaan legenda yang rusak tetap. Juga, semua opsi sumbu dalam daftar drop-down selalu dalam urutan yang diurutkan. Terima kasih kepada Antoine Queric dan Aurelie Briand.
         
    * BUG FIX: EDDTableDariFiles sekarang mendukung batasan pada variabel String yang dibuat dari variabel char dalam file data. Terima kasih kepada Antoine Queric dan Aurelie Briand.
         
    * Login: Sekarang, ketika dataset menjadi tidak tersedia, dataset mencoba untuk memberitahukan (dengan pesan "Dataset ini saat ini tidak tersedia.") pelanggannya, tindakan yang terdaftar, rss, dan lonPM180 dataset yang mengandalkannya. Terima kasih kepada Roy Mendelssohn dan Bob Simons.
         
    * Login: Dua bug yang berkaitan dengan EDDTableCopy. Sam McClatchie
         
    * IMPROVED: Jumlah permintaan gagal yang ditunjukkan pada status.html halaman akan meningkat karena lebih banyak hal dihitung sebagai kegagalan dari sebelumnya.
         
    * Sitemap ERDDAP 's status.html sekarang menunjukkan "Permintaan (median kali di ms) " dalam seri waktu. Sebelumnya, itu menunjukkan waktu median yang ditimbulkan untuk menginteger detik.
         
    * IMPROVED: Dalam output jsonld, jsonld "nama" sekarang berasal dari dataset "title" Sitemap ERDDAP , dan jsonld "headline" sekarang berasal dari "dataset" datasetID Sitemap ERDDAP Sitemap Sebelumnya, dibalik. Ini tampaknya salah bagi saya karena dalam penggunaan bahasa Inggris normal, "nama" biasanya singkat, (Sitemap) pengidentifikasi unik yang jarang/tidak pernah berubah (e.g., Robert nama Middle Simons) , bukan deskripsi yang tidak unik dan yang dapat dengan mudah dan sering berubah (e.g., "Seorang pria yang menulis perangkat lunak untuk NOAA " vs. "Seorang pria tinggi yang menulis perangkat lunak untuk NOAA Sitemap) Sitemap Gee, itu akan bagus jika definisi schema.org [Login](https://schema.org/name) , dalam konteks Dataset, lebih spesifik. Pengembang perangkat lunak harus dapat menulis implementasi spesifikasi berdasarkan spesifikasi saja, tanpa panduan dari ahli. Tapi saya defer untuk Google (annal Natasha Login) Login (Mr. Victor Yang) , dan Rob Fuller.
         
    * IMPROVED: Dalam output jsonld, empat nilai "spatialCoverage GeoShape box" sekarang minLat minLon maxLat maxLon. Sebelumnya, posisi lat dan lon terbalik. Gee, itu akan bagus jika definisi schema.org [Login](https://schema.org/GeoShape) menentukan urutan yang benar. Pengembang perangkat lunak harus dapat menulis implementasi spesifikasi berdasarkan spesifikasi saja, tanpa panduan dari ahli. Terima kasih kepada Natasha Noy dan Rob Fuller.

## Versi 1.82{#version-182} 
 (Dikirim 2018-01-26) 

*    **Fitur Baru (untuk pengguna) Sitemap**   
     
    * Perubahan halus numerik ke tampilan-dan-kaki ERDDAP™ halaman web.
        * Sitemap ERDDAP™ sekarang menggunakan HTML 5 dan menggunakan CSS yang lebih baik.
        * IMPROVED: Halaman web telah sedikit dimodifikasi untuk membuat mereka lebih bersih dan kurang "busy". (Mereka masih padat dan masih ada hal-hal yang bisa mengeluh, tetapi semoga jauh lebih sedikit daripada sebelumnya.) Berkat John Kerfoot untuk beberapa komentar.
        * IMPROVED: Halaman web sekarang terlihat jauh lebih baik di ponsel dan perangkat kecil lainnya, terutama jika Anda menggunakannya dalam orientasi lansekap. Mereka juga terlihat lebih baik di jendela yang sangat kecil dan sangat besar di browser desktop.
        * IMPROVED: Untuk meningkatkan keamanan dan alasan lain, penggunaan versi Openlayer yang terbaru untuk WMS halaman demonstrasi telah digantikan oleh Leaflet Sitemap
        * BARU: dukungan untuk pratinjau gambar, audio, dan file video di "files" sistem (Sitemap [set data uji ini](https://coastwatch.pfeg.noaa.gov/erddap/files/testMediaFiles/ShouldWork/) ) dan .htmlTable respons ketika sel memiliki URL gambar, file audio atau video (Sitemap [permintaan ini](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/testMediaFiles.htmlTable?url%2Cname%2ClastModified%2Csize%2CfileType%26url=~%22.*ShouldWork.*%22) ) Sitemap Jika Anda menginjak ikon '?', Anda harus melihat gambar, audio, atau pratinjau file video. Anda juga dapat mengklik tautan file untuk melihat layar penuh file di browser Anda. Sitemap [Media Database](/docs/server-admin/datasets#media-files) Sitemap Perhatikan bahwa browser yang berbeda mendukung berbagai jenis file, sehingga contoh tidak dapat bekerja di browser Anda.
Berkat orang / tautan ini untuk ide dan kode sampel untuk template alat gambar CSS-only (Sitemaphttps://codepen.io/electricalbah/pen/eJRLVd) dan pemuatan gambar yang rusak (Sitemaphttps://varvy.com/pagespeed/defer-images.html)   (meskipun kode dimodifikasi sebelum digunakan ERDDAP ) Sitemap
Berkat Cara Wilson, Matthew Austin, dan Adam Shepherd / BCO-DMO untuk penawaran untuk dukungan gambar.
Berkat Jim Potemra, Rich Signell, OOI, dan Carrie Wall Bell untuk meminta dukungan file audio/hidrophone.
Berkat OOI untuk menunjukkan kebutuhan dukungan video.
        * BARU: Subset data dari setiap ERDDAP™ Login (tetapi biasanya dataset dari file audio) sekarang dapat disimpan dalam file audio .wav. ( [Sitemap](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#wav) ) Berkat Jim Potemra, Rich Signell, OOI, dan Carrie Wall Bell untuk meminta dukungan file audio/hidrophone.
        * IMPROVED: Format untuk Folder Web Accessible (Login)   (e.g., folder /file/) telah diperbarui untuk menggunakan tabel HTML. Format baru meniru versi terbaru dari daftar direktori halaman web yang dibuat oleh versi terbaru dari Apache. Manusia akan menemukan bahwa perubahan membuat informasi lebih mudah dibaca. Software yang membuat dokumen ini (e.g., software yang memanen dokumen ISO 19115 dari ERDDAP ) harus direvisi, tetapi format baru akan lebih mudah untuk membuat daripada format sebelumnya. (Perhatian, Anna Milan.) 
        * Login outOfDateDatasets.html Sitemap ( [Sitemap](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html) ) Halaman web ini menunjukkan tabel dengan semua dataset waktu dekat yang memiliki&lt; testOutOfDate Sitemap (Sitemap) , peringkat oleh bagaimana kedaluwarsa dataset. Dasbor ini harus berguna untuk ERDDAP™ administrator dan pengguna akhir ketika mereka ingin tahu bahwa dataset tidak terbaru. Untuk dataset kedaluwarsa, ada masalah dengan sumber data, sehingga ERDDAP™ tidak dapat melihat/mendapatkan data dari lebih banyak poin waktu.
Administrator: Jika Anda tidak ingin halaman web Out-Of-Date Datasets, tambahkan ini ke setup Anda.xml:
            &lt;Sitemap&lt;Login
Sitemap testOutOfDate Sitemap Kolom OfDate di kolom allDatasets Login
Berkat Bob Simons, yang telah menginginkan ini selama bertahun-tahun, dan kepada orang-orang yang cerdas dari Institut Laut Irlandia yang memberi saya inspirasi melalui Raspberry Pi dan monitor khusus mereka yang selalu menunjukkan layar seperti ini di kantor mereka.
        * Sitemap .htmlTable Login .xhtml respon sekarang lebih baik diformat, lebih kompak, dan dengan demikian memuat lebih cepat. HTML5 & CSS
    * Jenis file output baru untuk set data griddap: .time. Ini menunjukkan daftar kesenjangan dalam nilai waktu yang lebih besar dari kesenjangan media. ( [Sitemap](https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMHchla8day.timeGaps) ) Ini berguna untuk ERDDAP™ administrator dan pengguna akhir ketika mereka ingin tahu apakah ada kesenjangan yang tak terduga dalam nilai waktu untuk dataset yang diharapkan memiliki nilai waktu secara teratur. Berkat Bob Simons dan Roy Mendelssohn yang membutuhkan fitur ini.
    * IMPROVED: Grafik default untuk allDatasets dataset sekarang peta dengan x=maxLon dan y=maxLat. Berkat John Kerfoot, Rich Signell, dan OOI-CI.
    * Sitemap [Login](https://github.com/ioos/erddapy) Sitemap ERDDAP™ fitur, tetapi akan menarik bagi banyak orang ERDDAP™ pengguna. Login ( ERDDAP™ Sitemap Python ) Sitemap Python perpustakaan yang diciptakan oleh Filipe Fernandes bahwa "mendapatkan keuntungan dari ERDDAP Sitemap RESTful layanan web dan menciptakan layanan web ERDDAP™ URL untuk setiap permintaan seperti mencari dataset, memperoleh metadata, mengunduh data, dll. " Terima kasih kepada Filipe Fernandes.
    * Saya harus disebutkan sebelumnya: Ada paket R pihak ketiga yang dirancang untuk memudahkan bekerja dengan ERDDAP™ dari dalam R: [Login](https://github.com/ropensci/rerddap#rerddap) Sitemap Sitemap [Login](https://ropensci.org/) Dan Mendelssohn.
         
*    **Sitemap ERDDAP™ Administrator Perlu Tahu dan Lakukan:**   
     
    * TO DO: Dalam setup.xml, tepat di bawah&lt;adminInstitution&gt;, tambahkan&lt;adminInstitutionUrl&gt; tag yang menentukan URL untuk institusi Anda (atau grup) Sitemap
    * TO DO: 3 tag ini dalam setup.xml tidak lagi digunakan:
        &lt;Sitemap Login&lt;Login&lt;Login Mereka digantikan oleh
        &lt;Login&lt;Login&lt;endBodyHtml5&gt;, yang memiliki nilai default yang ditentukan dalam pesan.xml (dan ditampilkan di bawah ini) Sitemap
        
Kami merekomendasikan menggunakan default&lt;Login&lt;Login
Kami merekomendasikan: Jika Anda melakukan perubahan pada aslinya&lt;startBodyHtml&gt; dan/atau ingin menyesuaikan Anda ERDDAP™ sekarang, silakan salin baru&lt;WordPress.org (Sitemap) ke dalam setup.xml Anda dan memodifikasinya untuk menyesuaikan Anda ERDDAP™ Sitemap ERDDAP Halaman web mencerminkan organisasi Anda, tidak NOAA   ERD Sitemap Tidak bisa, mohon ubah "Karena Anda" ke organisasi Anda (Login) Sitemap Jika Anda memerlukan bantuan, silakan email erd.data at noaa.gov Sitemap (Jika Anda tidak ingin menyesuaikan Anda ERDDAP™ sekarang, gunakan default&lt;Login
        
Kemudian hapus tag lama 3 di setup.xml yang tidak lagi digunakan.

```
        <startBodyHtml5><!\\[CDATA\\[ 
        <body>
        <table class="compact nowrap" style="width:100%; background-color:#128CB5;"> 
          <tr> 
            <td style="text-align:center; width:80px;"><a rel="bookmark"
              href="https://www.noaa.gov/"><img 
              title="National Oceanic and Atmospheric Administration" 
              src="&erddapUrl;/images/noaab.png" alt="NOAA"
              style="vertical-align:middle;"></a></td> 
            <td style="text-align:left; font-size:x-large; color:#FFFFFF; ">
              <strong>ERDDAP</strong>
              <br><small><small><small>Easier access to scientific data</small></small></small>
              </td> 
            <td style="text-align:right; font-size:small;"> 
              &loginInfo; &nbsp; &nbsp;
              <br>Brought to you by 
              <a title="National Oceanic and Atmospheric Administration" rel="bookmark"
              href="https://www.noaa.gov">NOAA</a>  
              <a title="National Marine Fisheries Service" rel="bookmark"
              href="https://www.fisheries.noaa.gov">NMFS</a>  
              <a title="Southwest Fisheries Science Center" rel="bookmark"
              href="https://www.fisheries.noaa.gov/about/southwest-fisheries-science-center">SWFSC</a> 
              <a title="Environmental Research Division" rel="bookmark"
              href="https://www.fisheries.noaa.gov/about/environmental-research-division-southwest-fisheries-science-center">ERD</a>  
              &nbsp; &nbsp;
              </td> 
          </tr> 
        </table>
        \\]\\]></startBodyHtml5>
```

Ada cara tambahan yang bisa Anda [Login ERDDAP™ ](/docs/server-admin/deploy-install#customize) Sitemap ERDDAP 's halaman web mencerminkan organisasi Anda daripada Meme it NOAA   ERD Sitemap
        
    * Sitemap&lt; EDDGrid ... Example & gt; tag (mulai dengan&lt; EDDGrid IdExample&gt;&lt;Login Contoh & gt; tag (mulai dengan&lt;EDDTableIdExample&gt;) dalam file setup.xml Anda digunakan untuk membuat contoh di griddap dan tabledap Sitemap html halaman web di Anda ERDDAP Sitemap
        
Jika Anda tidak menyesuaikan tag tersebut, silakan hapus dari file setup.xml Anda. Sekarang mereka semua memiliki default dalam pesan.xml yang merujuk pada dataset di Bob ERDDAP™ Sitemaphttps://coastwatch.pfeg.noaa.gov/erddap/index.htmlSitemap Jadi Anda tidak perlu lagi memiliki dataset tertentu di Anda Meme it ERDDAP Sitemap Jika Anda ingin menimpa default, menyalin beberapa atau semua tag tersebut ke dalam setup Anda.xml dan mengubah nilai-nilai mereka.
Jika Anda ingin contoh untuk menunjuk ke Anda ERDDAP™ , metode termudah adalah:
        
        1. Sertakan dua dataset ini di ERDDAP™ dengan menambahkan ini ke Anda datasets.xml Sitemap
```
            <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>
            </dataset>
            <dataset type="EDDTableFromErddap" datasetID="pmelTaoDySst" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst</sourceUrl>
            </dataset>
```

        2. Tambahkan tag ini ke setup Anda.xml, tetapi ubah URL ke Anda ERDDAP Sitemap ( https Sitemap) URL:
```
            <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
            <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```
        
Jika Anda menyesuaikan tag tersebut, biarkan mereka dan tambahkan 2 tag baru ini ke setup Anda.xml untuk menentukan ERDDAP™ URL untuk dataset ini, tetapi mengubah URL ke dataset Anda ERDDAP Sitemap ( https Sitemap) URL:
```
        <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
        <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```

    * Sitemap ERDDAP™ sekarang menggunakan file css bernama erddap2.css. Jika Anda membuat perubahan \\[ Login \\] WordPress.org (di direktori yang sama) Sitemap
    * Sitemap ERDDAP 's halaman web sekarang memiliki sejumlah besar tautan internal hampir tak terlihat (teks berwarna hitam dan tidak diuraikan) Sitemap Jika Anda menginjak lebih dari satu tautan ini (biasanya beberapa kata judul dan paragraf pertama) , kursor menjadi tangan. Jika Anda mengklik tautan, URL adalah tautan internal ke bagian dokumen tersebut. Ini memudahkan untuk merujuk pada bagian dokumentasi tertentu. Terima kasih kepada Bob Simons, yang telah menginginkan ini selama bertahun-tahun.
    * Sitemap ERDDAP™ Sitemap [Rentang Byte / Accept-Ranges](https://en.wikipedia.org/wiki/Byte_serving) permintaan untuk bagian / file / file. Ini diperlukan untuk mendukung pemirsa audio dan video di browser.
    * TO DO: Sekarang, untuk meningkatkan keamanan, jika Anda ditentukan&lt;WordPress.org (dan dengan demikian dukungan https ) , bendera yang disarankan url https URL dengan flagKey yang lebih aman. Jika demikian, setiap flagUrls/flagKeys sebelumnya akan menjadi tidak valid. Admin: Jika perubahan ini berlaku untuk Anda ERDDAP™ dan jika Anda Meme it ERDDAP™ Login EDDGrid DariErddap dan EDDTable DariErddap yang berlangganan jarak jauh ERDDAP s, kemudian, setelah Anda memperbarui ERDDAP Login ERDDAP™ akan secara otomatis mencoba berlangganan dengan flagUrl baru, sehingga Anda harus menghapus langganan lama dan memvalidasi langganan baru ketika Anda mendapatkan email validasi berlangganan baru.
    * DILAKUKAN: Jika Anda ERDDAP™ Login EDDGrid Dari dataSet Erddap untuk dataset erdVH3 pada jam tangan pantai Bob ERDDAP™ , mohon gantinya untuk merujuk pada dataset erdVH2018 baru.
    * TO DO: Jika Anda memasukkan data set sampel jplAquariusSSS di Anda ERDDAP™ , ubah "V4" di datasetID 's to "V5".
    * Sitemap actual\\_range sekarang atribut standar CF (seperti CF-1.7) dan jelas mengatakan bahwa jika penggunaan variabel add\\_offset dan/atau scale\\_factor untuk mengemas nilai data, maka actual\\_range nilai-nilai yang harus menggunakan jenis data yang tidak terpaket dan nilai-nilai yang tidak terpaket. Sayangnya, konflik ini dengan saran kami sebelumnya. Login Xml sekarang unpacks dikemas actual\\_range nilai-nilai, tetapi tidak akan memperbaiki set data yang ada di Anda Meme it datasets.xml Login
        
Jadi, silakan periksa dataset Anda: jika nilai variabel dikemas dan jika actual\\_range ditentukan sebagai nilai data yang dikemas, tambahkan&lt; addAttributes Sitemap actual\\_range nilai untuk menentukan nilai yang tidak dipaketkan. Jika tidak, dataset tidak akan dimuat ERDDAP Sitemap Cara sederhana dan hampir sempurna untuk melakukan ini adalah untuk mencari Anda datasets.xml untuk sumber Atribut yang memiliki
```
        <att name="actual\\_range" type="shortList">  
        or <att name="actual\\_range" type="intList">  
```
dan scale\\_factor selain 1.0. Mereka adalah Meme it actual\\_range atribut yang mungkin harus Anda perbaiki.
        
Untuk variabel sumbu dalam EDDGrid Login ERDDAP™ selalu menetapkan actual\\_range atribut untuk menjadi kisaran nilai yang sebenarnya karena mengetahui nilai-nilai tersebut.
        
Untuk variabel sumbu dengan nilai turun (e.g., beberapa variabel lintang) Login ERDDAP™ Login actual\\_range Login \\[ Sitemap \\] Login \\[ Sitemap \\] nilai, yang tinggi ... rendah. Sekarang selalu menggunakan nilai-nilai tinggi untuk membuat definisi CF baru.
        
Perbaiki actual\\_range nilai-nilai sangat penting untuk dataset EDDTable, karena ERDDAP™ akan dengan cepat menolak permintaan pengguna untuk nilai data yang kurang dari actual\\_range nilai minimum atau yang lebih besar dari actual\\_range Nilai maksimum.
        
Terkait: sebenarnya \\_min, aktual\\_max, data\\_min Login data\\_max atribut sekarang diuraikan. Silakan konversi dataset Anda untuk digunakan actual\\_range Sitemap
        
    * Sitemap (opsional, tetapi dianjurkan) Sitemap Untuk setiap dataset dekat waktu dan perkiraan di Anda ERDDAP™ Promo&lt; testOutOfDate Sitemap (/docs/server-admin/datasets#testoutofdate) tag dengan nilai dalam bentuk now- Sitemap now- Sitemap Jika nilai waktu maksimum untuk dataset lebih tua dari nilai itu, dataset dianggap kedaluwarsa dan akan ditandai seperti pada [ outOfDateDatasets.html ](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html) Login Ini memberikan cara mudah bagi Anda untuk melihat ketika sesuatu yang salah dengan sumber dataset.
    *    [BARU: Penandaan Semantik Dataset dengan json-ld (Login Database) ](/docs/server-admin/additional-information#json-ld)   
         ERDDAP™ Sitemap [Login (Login Database) ](https://json-ld.org) untuk membuat katalog data dan bagian dataset Anda [web semantik](https://en.wikipedia.org/wiki/Semantic_Web) , yang merupakan ide Tim Berners-Lee untuk membuat konten web lebih mudah dibaca dan mesin "tertahan". mesin pencari ( [Google khususnya](https://developers.google.com/search/docs/data-types/datasets) ) dan alat semantik lainnya dapat menggunakan markup terstruktur ini untuk memudahkan penemuan dan mengindeks. Penandaan terstruktur json-ld muncul sebagai tak terlihat-ke-humans&lt;Login kode padahttp://.../erddap/info/index.htmlSitemap (yang merupakan web semantik [Catalog](https://schema.org/DataCatalog) ) dan masing-masinghttp://.../erddap/info/_datasetID_/index.htmlSitemap (yang merupakan web semantik [Login](https://schema.org/Dataset) ) Sitemap (Terima kasih khusus kepada Adam Leadbetter dan Rob Fuller dari Marine Institute di Irlandia untuk melakukan bagian keras dari pekerjaan untuk membuat bagian ini dari ERDDAP Sitemap) 
    * BARU: Ada jenis dataset baru yang dapat membaca data dari file audio:
         [ EDDGrid Sitemap](/docs/server-admin/datasets#eddfromaudiofiles) , yang memperlakukan data audio sebagai data gridded.
         [Datasheet](/docs/server-admin/datasets#eddfromaudiofiles) , yang memperlakukan data audio sebagai data tabel. Berkat Jim Potemra, Rich Signell, OOI, dan Carrie Wall Bell untuk meminta dukungan file audio/hidrophone.
    * Perubahan Hasil Dataset Login (dan perubahan terkait) Sitemap
        * Sitemap ERDDAP™ sekarang memiliki sistem untuk secara otomatis [memperbarui URL terbaru](/docs/server-admin/additional-information#out-of-date-urls) di GenerateDataset Xml dan ketika memuat dataset. Jika Anda memiliki saran untuk URL tambahan yang harus ditangkap dan diperbarui, atau jika Anda berpikir ini harus berubah menjadi layanan (seperti Konverter) Sitemap erd.data at noaa.gov Sitemap
        * BARU: Sekarang, jika GenerateDatasets Xml melihat CF standard\\_name   (yang harus semua huruf kecil) dengan karakter huruf besar, menambahkan semua versi huruf kecil untuk&lt; addAttributes Sitemap Juga, ketika beban dataset, jika ERDDAP™ melihat CF standard\\_name dengan karakter huruf besar, ia diam-diam mengubahnya ke standard\\_name Sitemap Terima kasih kepada Rich Signell.
        * BARU: Sekarang, jika GenerateDatasets Xml melihat atribut dengan waktu yang tidak dalam format ISO 8601, itu menambahkan waktu format ISO 8601 ke&lt; addAttributes Sitemap Sitemap ERDDAP™ tidak mengenali format, itu meninggalkan nilai waktu yang tidak berubah. Jika Anda melihat format yang Meme it ERDDAP™ tidak mengenali dan memperbaiki, silakan email ke erd.data at noaa.gov Sitemap
        * IMPROVED: Kode tingkat rendah untuk EDDGrid Sitemap Catalog Xml sekarang bergantung pada Unidata netcdf-java katalog kode crawler (Login Katalog) sehingga dapat menangani semua katalog THREDDS (yang bisa sangat kompleks) Sitemap Berkat Roland Schweitzer untuk menyarankan perubahan ini dan terima kasih untuk Unidata untuk kode.
        * Sitemap Login EDDGrid DariDap sekarang menambahkan ", startYear-EndYear" untuk mengakhiri judul berdasarkan nilai sumbu waktu sebenarnya. EndYear="present" jika data ada dalam 150 hari terakhir.
        * Sitemap Login EDDGrid DariDap sekarang menambahkan ", \\[ Sitemap \\] °" ke judul jika dataset bahkan disampingkan dan sama untuk lat dan lon.
        * IMPROVED: Konverter waktu sekarang memiliki fitur tambahan, terutama kemampuan untuk mengubah waktu string dalam berbagai format umum ke dalam string ISO 8601 atau menjadi nomor yang kompatibel UDUnits. Semua fitur yang didukung sebelumnya terus bekerja, tidak berubah.
        * Login Xml dan Konverter Kata kunci sekarang termasuk "Bina Sains &gt; " pada awal Kata-kunci Ilmu GCMD. Ketika dataset dimuat ERDDAP™ Login ERDDAP™ sekarang memperbaiki kata kunci GCMD dalam atribut kata kunci yang tidak dimulai dengan "Barang Bumi &gt; " atau yang menggunakan apa pun selain kasus judul (di mana huruf pertama setiap kata dimodalkan) Sitemap
        * IMPROVED: Ketika menyarankan&lt; destinationName Sitemap Xml untuk EDDTableDariAsciiFiles hanya digunakan ujung ekor sourceName Sitemap '/'   (beberapa nama file-seperti) Sitemap Sekarang menggunakan seluruh sourceName (misalnya, "blahblahblah (m/s)". Perubahan ini akan baik untuk beberapa set data dan tidak untuk orang lain, tetapi perilaku yang lebih aman. Terima kasih kepada Maurice Libes.
        * Login Xml dan konstruktor dataset sekarang memastikan tidak ada nama kolom duplikat. Terima kasih kepada Maurice Libes.
        * Login Xml untuk EDDTableDariAsciiFiles tidak menulis&lt;kolomSeparator&gt; ke output. Sitemap Terima kasih kepada Maurice Libes.
    * BARU: Alat DasDds sekarang mencetak informasi gap waktu (Login [Info](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#timeGaps) ) jika dataset adalah dataset gridded.
    * BARU: Lanjutan Cari sekarang menerima "sekarang_\\-nUnits_" nilai waktu. Terima kasih kepada Rich Signell.
    * IMPROVED: Untuk meningkatkan keamanan, ketika alamat email dalam metadata dataset atau data ditulis ke halaman web html, "@" diganti dengan " di ". Ini hanya menangkap alamat email yang merupakan seluruh metadata atau nilai data, bukan alamat email yang tertanam dalam nilai lebih lama.
    * IMPROVED: Untuk meningkatkan keamanan, RSS informasi untuk dataset pribadi sekarang hanya tersedia untuk pengguna (Login RSS Login) yang masuk dan berwenang untuk menggunakan dataset.
    * BARU: Sekarang, ketika dataset dimuat, jika date\\_created Login date\\_issued Login date\\_modified , atau tanggal\\_metadata\\_informasi atribut memiliki nilai waktu yang tidak dalam format ISO 8601, ERDDAP™ mengubahnya ke waktu berformat ISO 8601. Sitemap ERDDAP™ tidak mengenali format, itu meninggalkan nilai waktu yang tidak berubah. Jika Anda melihat format yang Meme it ERDDAP™ tidak mengenali dan memperbaiki, silakan email ke erd.data at noaa.gov Sitemap
    * IMPROVED: .dods tanggapan dari EDDGrid dataset sekarang harus secara signifikan lebih cepat. Terima kasih kepada Rich Signell.
    * Perubahan terkait ERDDAP Pembuatan dokumen ISO 19115:
        * BUG FIX: saat membuat dokumen ISO 19115, dataVariable Unit tidak dikodekan HTML Attribute dan dikodekan persen. Sitemap Berkat validator ISO 19115 NGDC.
        * BUG FIX: saat membuat dokumen ISO 19115, date\\_created digunakan sebagai, jadi sering adalah format yang salah. Sekarang dikonversi ke string ISO 8601 Z. Berkat validator ISO 19115 NGDC.
        * BUG FIX: saat membuat dokumen ISO 19115, ERDDAP™ sekarang lagi menulis tanggal dengan tahun=0000 (as with climatology dataset) , karena skema ISO 19115 tidak memungkinkan tanggal dengan tahun=0000. Berkat validator ISO 19115 NGDC.
    * BARU: Seperti sebelum permintaan untuk http .../erddap/version akan kembali hanya jumlah versi (Sitemap) g. ERDDAP \\_versi=1.82.
Sekarang, permintaan http .../erddap/version\\_string akan mengembalikan jumlah dan suffix opsional dari '\\_' plus teks ASCII (tidak ada ruang atau karakter kontrol) g. ERDDAP \\_version\\_string=1.82\\_JohnsFork. Orang yang melakukan garpu akan menentukan ini dengan mengubah EDStatic.erddapVersion. Cara ini tidak menyebabkan masalah versi versi sebelumnya ERDDAP Sitemap Terima kasih kepada Axiom (tidak dapat, Kyle Wilcox) dan Institut Laut Irlandia (tidak dapat, Rob Penuh) Sitemap
    * Login: Untuk versi wms=1.3.0, permintaan= GetMap , crs=EPSG:4326 (tidak CRS:84) permintaan: pesanan bbox harus minLat, minLon, maxLat, maxLon. Untuk CRS: 84 permintaan, seperti sebelumnya, pesanan bbox harus minLon, minLat, maxLon, maxLat. Ini dapat memperbaiki menggunakan ERDDAP Sitemap WMS 1.3.0 layanan di ArcGIS   (terima kasih kepada Paola Arce) Sitemap Sitemap (Login) Login OGC untuk membuat ini sangat rumit. Meme it Sitemap Leaflet untuk menangani ini dengan benar dan untuk memberi saya cara untuk menguji ini.
    * IMPROVED: Sebelumnya, link yang disarankan untuk RSS dan berlangganan email memiliki Meme it http URL ERDDAP Sitemap Sekarang https URL, jika aktif.
    * Sitemap EDDGrid Copy sekarang mendukung tag opsional&lt;hanyaSince&gt;_someValue_&lt;/onlySince&gt;, di mana nilainya adalah waktu berformat ISO-8601 tertentu atau now- Login (Login now- 2 tahun) Sitemap Sitemap [Sitemap Sitemap](/docs/server-admin/datasets#onlysince) Sitemap Terima kasih kepada Drew P.
    * IMPROVED: Jika tersedia, ERDDAP™ akan menunjukkan https URL&lt;baseHttpsUrl&gt;, jika tersedia) bukan http URL ketika memberitahu pengguna URL untuk menambahkan/validate/remove/list berlangganan.
    * Login: ERDDAP™ sekarang memungkinkan tindakan berlangganan untuk memulai dengan "https://"Sitemap (Bob tumpang tindih kepalanya.) Thanks to Jennifer Sevadjian.
    * Login: .jsonlKVP sekarang menggunakan ':' antara setiap kunci dan nilai, bukan '=' Sitemap (Bob tumpang tindih kepalanya.) Berkat Alexander Barth.
    * Login: Sebelumnya, jika Anda restart ERDDAP™ dengan cepatRestart=true, dan jika, sebelum dataset diisi ulang biasanya, Anda membuat panggilan ke dataset EDDTableDariFiles yang digunakan pembaruanEveryNMillis, dan jika file data baru saja diubah, permintaan akan gagal dengan kesalahan pointer null. Sekarang permintaan akan berhasil. Terima kasih kepada John Kerfoot.
    * BARU: Ketika dataset dimuat dalam ERDDAP™ , kata kunci sekarang diatur ke urutan yang diurutkan dan karakter garis baru dihapus.
    * IMPROVED: Sekarang, jika .geoJson, .json Sitemap .nc permintaan oJson memiliki .json parameter p, jenis mime respons adalah aplikasi / javascript. Login .json p tidak didukung .jsonlCSV Sitemap .jsonlKVP , karena tidak akan bekerja. Meme it Terima kasih kepada Rob Fuller.
    * IMPROVED: Jenis mime untuk json baris fileType options sekarang "application/x-jsonlines". Ini adalah aplikasi / jsonl. Saat ini, tidak ada pilihan yang benar definitif.
    * IMPROVED: Jumlah permintaan gagal yang ditunjukkan pada status.html halaman akan meningkat karena lebih banyak hal dihitung sebagai kegagalan dari sebelumnya, misalnya, KlienAbortException.
    * IMPROVED: Sekarang, jika respons dari ERDDAP™ tidak terkompresi, maka header respon akan mencakup "Content-Encoding"="identitas".
    * IMPROVED: atribut "license" tidak diperlukan. Sekarang, jika tidak ditentukan, standarLicense dari pesan.xml (atau dari setup.xml jika ada) digunakan sebagai default.
    * BARU: Sekarang ada pilihan [fileAccessSuffix atribut](/docs/server-admin/datasets#fileaccessbaseurl) . yang dapat digunakan dengan yang ada [API Reference](/docs/server-admin/datasets#fileaccessbaseurl) Sitemap
    * IMPROVED: Untuk meningkatkan keamanan, versi ini dikompilasi dengan terbaru Java JDK v8u162.
    * BARU: Untuk meningkatkan keamanan, beberapa domain umum yang menawarkan alamat email sementara (www.mailinator.com) sekarang pada daftar hitam email permanen untuk sistem berlangganan.
    * BARU: Untuk meningkatkan keamanan, semakin tinggi dalam Laporan Harian sekarang termasuk:
Login Alamat IP Bendera Gagal (sejak laporan harian terakhir)   
Login Alamat IP Bendera Gagal (Sitemap)   
Login Alamat IP Bendera Diserang (sejak laporan harian terakhir)   
Login Alamat IP Bendera Diserang (Sitemap)   
Tinggi "Failed" memungkinkan Anda melihat siapa (peretas?) mencoba mengatur bendera, tetapi gagal.
    * IMPROVED: Untuk meningkatkan keamanan, alamat email di&lt;berlanggananEmailBlacklist&gt; di Anda datasets.xml sekarang dianggap sensitif terhadap kasus. Meme it
         

## Versi 1.80{#version-180} 
 (Dipublikasikan 2017-08-04) 

*    **Fitur Baru (untuk pengguna) Sitemap**   
     
    * Login orderByCount  () filter memungkinkan Anda menentukan bagaimana tabel hasil akan diurutkan (atau tidak) dan hanya mengembalikan satu baris untuk setiap kelompok penyortiran, dengan jumlah nilai non-pembantaian untuk setiap variabel.
Sitemap orderByCount  (Sitemap stationID Sitemap) Sitemap stationID dan kembali satu baris untuk setiap stationID , dengan jumlah nilai non-missing untuk setiap variabel.
Jika Anda hanya menentukan orderByCount  (Sitemap) respon hanya akan satu baris dengan jumlah nilai non-pembeban untuk setiap variabel data.
Sitemap [ orderBy ... dokumentasi](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#orderBy) Berkat Ben Adams.
    * Login .nc oJson file Pilihan tipe untuk dataset gridded dan tabular. Pilihan ini membuat NCO lvl=2 "pedantic" JSON file dengan semua informasi biasanya ditemukan dalam .nc Login Sitemap [http://nco.sourceforge.net/nco.html#json](https://nco.sourceforge.net/nco.html#json) Terima kasih kepada Charlie Zender.
    * Login: Login orderBy Login () opsi pada halaman web Make A Graph sekarang ditangani dengan benar.
    * BUG FIX: output .geoJson sekarang tidak mencetak baris di mana nilai lat atau lon hilang. Juga, nilai ketinggian (Sitemap) sekarang termasuk dalam koordinat, bukan sebagai nilai data. Terima kasih kepada Jonathan Wilkins.
         
*    **Sitemap ERDDAP™ Administrator Perlu Tahu dan Lakukan:**   
     
    * SECURITAS ISSUE: pustaka protokol.js digunakan untuk OpenLayers demo di WMS Sitemap ERDDAP™ kedaluwarsa dan memiliki bug yang berpotensi memungkinkannya untuk disalahgunakan. (Sayangnya, memperbarui OpenLayers dan protokol. js tidak mudah.) Itu membuka kemungkinan bahwa perpustakaan dapat diatur untuk memungkinkan kerentanan lintas tempat. Namun, sejak ERDDAP™ hanya menggunakan OpenLayers dengan cara pra-set-up tertentu dan hanya dengan spesifik ERDDAP - sumber data berbasis, kami percaya tidak ada kerentanan lintas tempat di ERDDAP Sitemap OpenLayers dan protokol.js. Namun, jika Anda tidak percaya ini, Anda sekarang dapat menonaktifkan penggunaan OpenLayers demo di WMS halaman Anda ERDDAP™ dengan menambahkan
```
        <openLayersActive>false</openLayersActive>  
```
ke file setup.xml Anda. default adalah "true". Berkat Charles Carleton dan NCEI.
    * SECURITY CHANGES: Unused .jar file dan duplikat .jar file (karena mereka juga di netcdfAll.jar) telah dihapus dari Meme it ERDDAP™ Login Out-of-date .jar file telah diperbarui. Berkat Charles Carleton dan NCEI.
    * PERUBAHAN SECURITAS: NetcdfAll.jar file didistribusikan dengan ERDDAP™ adalah versi terbaru (saat ini 4.6.10) , tetapi masih mengandung jackson internal .jar file yang diketahui kedaluwarsa dan memiliki kerentanan keamanan, terutama perpustakaan Jackson yang hanya digunakan ketika mengakses sumber data Amazon S3. Jika Anda tidak mengakses data melalui Amazon S3 (Anda akan tahu apakah Anda Meme it) kerentanan ini tidak relevan.
        
Pengembang netcdf-java mempertahankan kerentanan ini tidak relevan karena cara kode netcdf menggunakan perpustakaan ini dan dalam kasus apa pun hanya akan relevan ketika mengakses Amazon S3. Sitemap [https://github.com/Unidata/thredds/issues/866](https://github.com/Unidata/thredds/issues/866) Sitemap Saya percaya mereka. Jika Anda masih memiliki kekhawatiran tentang ini, silakan hubungi pengembang netcdf-java. (Perhatikan bahwa jika Anda tidak percaya pengembang netcdf-java dan tidak menggunakan ERDDAP™ karena ini, Anda tidak boleh menggunakan THREDDS baik, karena THREDDS menggunakan netcdf-java lebih mendasar dan lebih luas daripada ERDDAP Sitemap) 
        
Sitemap Masalah kode dan peringatan kerentanan adalah:
netcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-databind/pom.xml
Sitemaphttps://nvd.nist.gov/vuln/detail/CVE-2016-7051Login Sitemap
netcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.dataformat/jackson-dataformat-cbor/pom.xml
Sitemaphttps://nvd.nist.gov/vuln/detail/CVE-2016-7051Login Sitemap
netcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-annotations/pom.xml
Sitemaphttps://nvd.nist.gov/vuln/detail/CVE-2016-7051Login Sitemap
Sitemaphttps://nvd.nist.gov/vuln/detail/CVE-2016-3720Sitemap
netcdfAll-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-core/pom.xml
Sitemaphttps://nvd.nist.gov/vuln/detail/CVE-2016-7051Login Sitemap
Sitemaphttps://nvd.nist.gov/vuln/detail/CVE-2016-3720Sitemap
"Untuk versi 4.6.10, aws-java-sdk-core menarik dalam versi 2.6.6 dari jackson-\\* artefak." (email dari netcdf-java orang) Sitemap
Berkat Charles Carleton dan NCEI.
        
    * PERUBAHAN KOMILER: Sitemap ERDDAP™ Catatan bahwa parameter kelas -cp diperlukan untuk baris perintah sekarang jauh lebih pendek daripada sebelumnya. Lihat pengaturan baru -cp di [dokumentasi ini](/docs/contributing/programmer-guide#development-environment) Sitemap Berkat Charles Carleton dan NCEI.
    * OPTION BARU di GenerateDataset Xml: EDDTableDariBcodmo, yang hanya untuk penggunaan internal di BCO-DMO.
Terima kasih kepada Adam Shepherd dan BCODMO.
    * NEW ATTRIBUTE dan FITUR: Jika kolom EDDTable memiliki nama file yang dapat diakses web (e.g., gambar, video, atau file audio) Anda dapat menambahkan
```
        <att name="fileAccessBaseUrl">_someBaseURL_</a>  
```
untuk menentukan URL dasar (berakhir dengan /) diperlukan untuk membuat nama file menjadi URL lengkap. Sitemap .htmlTable Sitemap ERDDAP™ akan menunjukkan nama file sebagai link ke URL gabungan (dasar url) Sitemap
Jika Anda ingin ERDDAP™ untuk melayani file terkait, membuat dataset EDDTableFromFileNames terpisah untuk file-file tersebut (dataset pribadi) Sitemap
Terima kasih kepada Adam Shepherd dan BCODMO.
    * RECOMMENDASI ATTRIBUTE BARU: Jika kolom EDDTable memiliki nama file dari file web yang dapat diakses (e.g., gambar, video, atau file audio) yang dapat diakses melalui arsip (Login .zip Login) dapat diakses melalui URL, gunakan
```
        <att name="fileAccessArchiveUrl">_theURL_</att>  
```
untuk menentukan URL untuk arsip.
Jika Anda ingin ERDDAP™ untuk melayani file arsip, membuat dataset EDDTableFromFileNames terpisah untuk file itu (dataset pribadi) Sitemap
Terima kasih kepada Adam Shepherd dan BCODMO.
    * IMPROVEMENT Xml untuk menghilangkan penyebab tidak valid / buruk&lt; subsetVariables &gt; saran dan duplikat/bad menyarankan nama variabel, dll. Terima kasih kepada Rich Signell, Adam Shepherd, dan BCO-DMO.
    * OPTION BARU: Informasi batas politik yang didistribusikan dengan ERDDAP adalah dari pihak ketiga dan agak kedaluwarsa. Juga, ada batas perselisihan di beberapa tempat di dunia, di mana orang yang berbeda akan memiliki ide yang berbeda tentang apa yang benar. KAMI MEMILIKI KETENTUAN DATA BOUNDARY CORRECTNESS YANG KOMESISI DENGAN ERDDAP Sitemap Jika Anda tidak menyukai informasi batas politik yang hadir ERDDAP™ Anda sekarang dapat memberitahukan ERDDAP™ tidak pernah menarik batas politik dengan menambahkan
```
        <politicalBoundariesActive>false</politicalBoundariesActive>  
```
ke file setup.xml Anda. default adalah "true". Berkat Raju Devender.
    * NEW METADATA TAG: Sitemap datasets.xml untuk dataset, Anda sekarang dapat menentukan jumlah default warna Bar bagian untuk dataVariable di grafik dan peta dengan
```
        <att name="colorBarNSections">_anInteger_</att>  
```
         (default=-1, yang mengatakan untuk membiarkan Meme it ERDDAP™ Login) Sitemap Sitemap [Login Pengaturan Bar](/docs/server-admin/datasets#color-bar-attributes) Sitemap
    * IMPROVED: warna batas negara pada peta ungu (Deep Purple untuk Anda Baby Boomers) Sitemap Sekarang abu-abu (di antara abu-abu batas nasional dan abu-abu tanah) Sitemap
    * Login:&lt;iso19File115&gt; dan&lt;fgFiledc&gt; di datasets.xml tidak selalu ditangani dengan benar. Meme it Sitemap BCO-DMO

## Versi 1.78{#version-178} 
 (Dipublikasikan 2017-05-27) 

*    **Fitur Baru (untuk pengguna) Sitemap**   
     
    *    (Login)   
         
*    **Sitemap ERDDAP™ Administrator Perlu Tahu dan Lakukan:**   
     
    * IMPROVED: urutan garis dalam "Major LoadDatasets Time Series" pada status.html halaman sekarang terbaru di atas ke tertua di bagian bawah.
    * Login: ERDDAP™ Sitemap .nccsv file dengan variabel waktu actual\\_range sebagai waktu String ISO-8601. Itu memperbaiki bug dengan info parsing EDDTableDariErddap dari dataset jarak jauh dan dari file QuickRestart untuk semua dataset EDDTableDari...Files. (Sitemap actual\\_range akan salah satu waktu pertama beban dataset di v1.78 tetapi benar setelah dimuat kembali, misalnya, jika Anda menandai dataset.) 

## Versi 1.76{#version-176} 
 (Dipublikasikan 2017-05-12) 

*    **Fitur Baru (untuk pengguna) Sitemap**   
     
    * Login: Untuk permintaan ERDDAP™ datang dari perangkat lunak selain browser web (Login curl , R, Matlab Login Python Login Java ) Sitemap
Seperti perubahan sebelumnya dalam versi Tomcat (perangkat lunak tingkat bawah yang berjalan ERDDAP ) sejak awal 2016, semakin banyak karakter di bagian query dari URL permintaan harus [ **Sitemap** ](/docs/server-admin/datasets#infourl) untuk alasan keamanan. Browser mengurus pengkodean persen untuk Anda. sehingga menggunakan ERDDAP™ di browser tidak terpengaruh kecuali permintaan akan diarahkan ke yang lain ERDDAP Sitemap
    * IMPROVED: Sebelumnya, ERDDAP™ Login **variabel char** lebih seperti bilangan bulat pendek dari karakter. Sekarang memperlakukan mereka lebih seperti 1-character-long UCS-2 (Login) Login Sitemap [Dokumentasi char](/docs/server-admin/datasets#char) Sitemap Berkat proyek Robinie Briand dan Argo.
    * IMPROVED: Sebelumnya, ERDDAP™ dukungan kecil yang ditawarkan untuk **Unicode karakter** karakter di atas #255 dalam Strings. Sekarang, internal, ERDDAP™ dukungan penuh 2byte UCS-2 chars (karakter nomor 0 melalui 65535) di Strings. Ketika String data ditulis ke berbagai jenis file, ERDDAP™ Apakah yang terbaik dapat mendukung amal 2-byte. Contoh lain adalah file .csv yang ERDDAP™ menulis dengan aset ISO-8859-1 (a 1-byte charset) Sitemap ERDDAP™ menulis karakter di atas #255 dengan JSON-like \\u_hhhhh_ sintaks. Sitemap [String data](/docs/server-admin/datasets#string) Sitemap
    * Sitemap .nc file yang ditulis oleh ERDDAP™ , variabel char untuk ditafsirkan sebagai String akan memiliki atribut
         **\\_Encoding=ISO-8859-1**   
Sitemap .nc file dibaca oleh ERDDAP™ variabel char dengan "\\_Encoding" akan ditafsirkan sebagai String dengan charset yang ditentukan.
    * Login: ERDDAP™ Login **JSON-seperti backslash-encoding** karakter khusus ketika Anda menentukan batasan variabel char dan String. Dengan demikian Anda dapat meminta sesuatu seperti &myString="\\u20ac" ketika Anda ingin baris data di mana myString=€ sejak 20ac adalah versi heksadesimal dari titik kode untuk simbol Euro. Beberapa sumber di web menunjukkan nomor titik kode untuk simbol Unicode, misalnya, [https://en.wikipedia.org/wiki/Unicode](https://en.wikipedia.org/wiki/Unicode) Sitemap
    * IMPROVED: Sebelumnya, ERDDAP™ dukungan terbatas yang ditawarkan untuk **integer panjang** variabel. Sitemap ERDDAP™ mendukung panjang secara internal dan melakukan yang terbaik ketika menulis data panjang ke berbagai jenis file. Sitemap [dokumentasi panjang](/docs/server-admin/datasets#long) Sitemap Berkat Institut Laut Irlandia, Craig Risien, Rich Signell, Christopher Wingard dan OOI.
    * BARU: jenis file output untuk griddap dan tabledap Sitemap ** .nccsv ** , yang membuat NetCDF -seperti, ASCII, file CSV yang juga mengandung semua metadata yang akan sebanding .nc Login Sitemap [Login Sitemap](/docs/user/nccsv-1.00) Sitemap Steve Hankin
    * Sitemap ** orderByClosest Login** memungkinkan Anda menentukan bagaimana tabel hasil akan diurutkan dan interval (g., 2 jam) Sitemap Dalam setiap kelompok penyortiran, hanya baris yang paling dekat dengan interval akan disimpan. Sitemap orderByClosest  (Sitemap stationID waktu, 2 jam") Sitemap stationID dan waktu, tetapi hanya mengembalikan baris untuk setiap Meme it stationID di mana orderBy Login (Sitemap) paling dekat dengan interval 2 jam. Ini adalah hal paling dekat dalam Meme it tabledap untuk meningkatkan nilai dalam permintaan griddap. Pilihan ini dapat ditentukan melalui tabledap halaman web .html dataset, halaman web .graph, dan melalui URL yang Anda buat sendiri. Berkat Institut Laut Irlandia dan Jaringan Laut Kanada.
    * Sitemap ** orderByLimit Login** memungkinkan Anda menentukan bagaimana tabel hasil akan diurutkan dan nomor batas (g., 100) Sitemap Dalam setiap kelompok penyortiran, hanya baris 'limit' pertama akan disimpan. Sitemap orderByMax  (Sitemap stationID 100 g) Sitemap stationID tapi hanya mengembalikan 100 baris pertama untuk setiap stationID Sitemap Ini mirip dengan klausul LIMIT SQL. Pilihan ini dapat ditentukan melalui tabledap halaman web .html dataset, halaman web .graph, dan melalui URL yang Anda buat sendiri. Berkat Institut Laut Irlandia dan Jaringan Laut Kanada.
    * BARU: Dua jenis file respons baru, ** .jsonlCSV Login .jsonlKVP ** tersedia untuk permintaan untuk dataset gridded, dataset tabular dan banyak tempat lain ERDDAP   (e.g., permintaan informasi tentang dataset) Sitemap File adalah file JSON Lines ( [https://jsonlines.org/](https://jsonlines.org/) ) di mana setiap garis memiliki objek JSON yang terpisah. .jsonlCSV hanya memiliki nilai dalam format CSV. .jsonlKVP memiliki Kunci: Nilai pasangan. Setiap garis berdiri sendiri. Garis tidak tertutup dalam array atau objek JSON yang lebih besar. Sebagai contoh, lihat [permintaan sampel ini](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst.jsonlKVP?longitude%2Clatitude%2Ctime%2Cstation%2Cwmo_platform_code%2CT_25%26time%3E=2015-05-23T12:00:00Z%26time%3C=2015-05-31T12:00:00Z) Sitemap Berkat Damian Smyth, Rob Fuller, Adam Leadbetter, dan Institut Laut Irlandia.
    * BARU: Ada dokumentasi baru yang menggambarkan [ **Cara Mengakses Dataset Pribadi di ERDDAP™ Login** ](/docs/user/AccessToPrivateDatasets) Sitemap Terima kasih kepada Lynn DeWitt.
    * IMPROVED: Sejauh minimum ** OpenLayers ** peta adalah 2 derajat dan sekarang 4 piksel data. Terima kasih kepada Rusty Holleman.
    * IMPROVED: Dalam beberapa kasus umum, permintaan yang mencakup **ekspresi reguler** kendala akan diproses lebih cepat.
         
*    **Sitemap ERDDAP™ Administrator Perlu Tahu dan Lakukan:**   
     
    *    **SLOW FIRST STARTUP:** Pertama kali Anda memulai versi baru ini, akan memakan waktu lama untuk ERDDAP™ untuk memuat semua dataset karena perlu dibaca kembali semua datafile sumber (meskipun hanya header untuk file data gridded) Sitemap Jika Anda melihat log Anda mungkin melihat pesan kesalahan mengatakan "old/unsupported EnhancedVersion" dari beberapa file internal -- itu oke -- ERDDAP™ akan membuat versi baru dari file internal. Promo
    * Login ERDDAP™ sekarang menggunakan baru **Login** Sitemap (juga dikenal sebagai JSR 310) bukan Joda untuk parse String kali ke zaman numerik. Catatan:
        * Sitemap ERDDAP™ tiba-tiba memiliki masalah parsing String kali untuk dataset tertentu dan dengan demikian hanya mengkonversi sebagian besar atau semua kali ke NaN (nilai hilang) masalah hampir selalu dengan tanggal Format waktu string yang Anda tentukan sebagai "unit" variabel. Sistem baru kadang-kadang membutuhkan string format tanggal yang sedikit berbeda.
        * Jika bulan numerik dan hari-hari dalam string dateTime tidak 0-padded (g., "3/7/2016") memastikan format hanya memiliki M tunggal dan d (g., "M/d/yy", tidak "MM/dd/yyyy") Sitemap
        * Mengubah spesifikasi detik fraksional yang menggunakan huruf kecil (Sitemap yyyy-MM-dd 'T'HH:mm:s.sss) modal Sitemap (Login yyyy-MM-dd 'T'HH:mm:ss.SSS) Sitemap
        *    ERDDAP™ tidak lagi mendukung tanggal string Format waktu dengan dua digit tahun (Login) dengan abad tersirat (g., 1900 atau 2000) Sitemap Bisnis menghabiskan miliaran dolar memperbaiki masalah ini pada akhir 1990. Para ilmuwan tidak boleh menggunakan dua digit tahun. Silahkan memperbaiki file sumber (Login) dengan mengkonversi ke 4-digit tahun, lalu gunakan yyyy di tanggal Format waktu.
        * Anda dapat menggunakan yyyy atau YYYYYY (Sitemap ERDDAP™ uuuu) untuk parse 4 digit tahun, termasuk tahun-tahun negatif, misalnya, -4712 (4713 SM) Sitemap Terima kasih kepada SeaDataNet, Thomas Gardner, dan BODC.
        * Silahkan terus menggunakan Z dalam format dateTime untuk mendapatkan ERDDAP untuk membuat offset waktu (g., Z, +0200, -08, -0800, -08:30) Sitemap
        *    **Pastikan Anda menggunakan Java versi 1.8.0\\_21 atau lebih tinggi.** 
        * Login Login Jika Anda menulis Java program yang menjalankan ERDDAP™ Kode, Anda perlu menghapus referensi ke joda-time. top SiteMap LocalNav MainNav
    * Sitemap ERDDAP Sitemap [Login Alat dataset](/docs/server-admin/additional-information#archiveadataset) sekarang membuat [ **File Folder** ](https://en.wikipedia.org/wiki/BagIt) Sitemap NCEI dapat menstandardisasi format ini. Berkat Scott Cross dan John Relph.
    * IMPROVED: Tautan untuk mengunduh erddap. perang pada ERDDAP™ halaman web sekarang menunjuk ke **Login** Sitemap (Mereka adalah tautan publik, sehingga Anda tidak perlu bergabung dengan GitHub.) Ini berarti banyak unduhan lebih cepat (hingga 12Mb/s versus 1Mb/s) dan beberapa masalah dengan unduhan. Berkat Damian Smyth, Rob Fuller, Adam Leadbetter, Conor Delaney, dan Institut Laut Irlandia.
    * Sitemap **status.html halaman dan email Laporan Status harian** sekarang termasuk bagian "Major LoadDatasets Time Series" yang menunjukkan statistik tentang ERDDAP™ sebagai akhir dari setiap beban utamaDataset untuk 100 terakhir besar loadDatasets. Terima kasih kepada kami kesulitan RAID.
    * BARU: baru, opsional (tapi disarankan) parameter untuk EDDTableDariCassandra dataset: [ ** &lt;Login ** Sitemap (/docs/server-admin/dataset#partitionkeycsv) Sitemap Berkat Ocean Networks Kanada.
    * BARU: EDDTableDariAsciiFiles sekarang mendukung ** &lt;Sitemap ** parameter. Jika null atau "", kelas akan menebak, seperti sebelumnya, Jika tidak, karakter pertama akan digunakan sebagai pemisah kolom ketika membaca file. Terima kasih kepada Sky Bristol dan Abigail Benson.
    * Baru: jenis dataset baru, [ **Login** ](/docs/server-admin/datasets#eddtablefromnccsvfiles) , dapat membuat dataset dengan agregasi [.csv file](/docs/user/nccsv-1.00) Sitemap Steve Hankin
    * Sitemap **Login** Sitemap .nccsv untuk mendapatkan informasi dari jarak jauh ERDDAP s dan untuk arsip lokal info metadata itu. Ini memungkinkan dukungan penuh untuk jenis data char dan panjang, dan untuk Unicode (Login) charset untuk chars dan string. Berkat Rob Fuller dan Institut Laut Irlandia.
    * IMPROVED: EDDTableDariErddap dan EDDGrid Mulai sekarang dukungan ** &lt;Login&lt;Login ** yang memberitahukan ERDDAP™ tidak pernah mengarahkan permintaan ke remote ERDDAP Sitemap default benar. Ini berguna ketika remote ERDDAP™ adalah pribadi ERDDAP Sitemap Berkat Damian Smyth, Rob Fuller, dan Institut Laut Irlandia.
    * Sitemap ERDDAP™ Sitemap **Permintaan pengguna dibatalkan** Sitemap Dan ERDDAP™ sekarang ditutup lebih cepat karena benang tingkat rendah ditutup lebih cepat. Terima kasih kepada kami kesulitan RAID.
    *    **Login Login** 
        * BARU: EDDType "ncdump" baru mencetak [Login](https://linux.die.net/man/1/ncdump) \\-seperti printout dari header dari .nc Login Anda juga dapat mencetak nilai data untuk variabel yang ditentukan (atau masukkan "tidak ada" untuk tidak mencetak nilai data apa pun) Sitemap Ini berguna karena, tanpa ncdump itu sulit untuk mengetahui apa yang ada dalam file dan dengan demikian EDDType yang harus Anda tentukan untuk GenerateDatasetsXml. Terima kasih kepada Craig Risien, Rich Signell, Christopher Wingard dan OOI.
        * BARU: Untuk SeaData Data bersih:
Ketika tepat, GenerateDataset Xml sekarang melakukan konversi semantik tertentu menggunakan query SPARQL jarak jauh: jika metadata sumber variabel termasuk sdn\\_parameter\\_urn, misalnya, sdn\\_parameter\\_urn = "SDN: P01::PSLTZZ01", GenerateDatasets Xml akan menambahkan atribut P02 yang sesuai, misalnya, sdn\\_P02\\_urn = "SDN:P02::PSAL". Jika Anda memiliki dataset yang menggunakan atribut ini, dan jika Anda ERDDAP Sitemap&lt; categoryAttributes &gt; di setup.xml termasuk sdn\\_parameter\\_urn dan sdn\\_P02\\_urn, pengguna akan dapat menggunakan ERDDAP™ Kategori sistem pencarian untuk mencari dataset dengan nilai-nilai tertentu dari atribut ini. Terima kasih kepada BODC dan Alexandra Kokkinaki.
        * IMPROVED: GenerateDataset Xml sekarang berubah banyak http:// referensi dalam metadata untuk https:// Sitemap
        * IMPROVED: GenerateDataset Xml sekarang mencoba untuk menebak pembuat\\_type dan penerbit\\_type.
        * IMPROVED: DataTypes variabel yang disarankan oleh GenerateDatasets Xml sekarang akan sedikit lebih baik. Berkat Margaret O'Brien, LTER, dan EML.
        * IMPROVED: GenerateDataset Xml lebih baik dalam menentukan&lt;cdm\\_data\\_type&gt;, dan menambahkan atribut terkait, diperlukan (misalnya,&lt;cdm\\_timeseries\\_variables&gt;), sehingga Anda dapat menyediakan informasi tersebut. Terima kasih kepada Rich Signell.
        * IMPROVED: Di GenerateDataset Xml, untuk dataset EDDTable, saran untuk&lt; subsetVariables &gt; sekarang lebih konservatif. Terima kasih kepada John Kerfoot.
        * Sitemap datasets.xml untuk dataset menentukan featureType tapi tidak cdm\\_data\\_type, featureType akan digunakan sebagai cdm\\_data\\_type. Terima kasih kepada Rich Signell.
        * BUG FIX Login Xml sekarang menyarankan yang benar&lt;dataType&gt; untuk variabel data yang memiliki scale\\_factor Login add\\_offset dan / atau \\_Unsigned atribut.
    * IMPROVED: Saat ERDDAP™ membuka .nc file yang **Login** daripada seharusnya (e.g., tidak mendapatkan sepenuhnya disalin ke tempat) Login ERDDAP™ sekarang memperlakukan file sebagai buruk. Sitemap ERDDAP™ kembali nilai hilang untuk bagian file yang hilang karena perilaku default untuk netcdf-java. ERDDAP™ ucar .nc 2.iosp.netcdf3.N3header.disallowFileTruncation = benar; Terima kasih kepada kami kesulitan RAID dan Kristen Ward-Garrison.
    * IMPROVED: penulis ISO 19115 sekarang menggunakan **Login** Sitemap
    * Sitemap ERDDAP™ sekarang menggunakan jarf-java v4.6.9 terbaru yang dapat membaca jenis tambahan **netcdf-4 file** Sitemap Terima kasih kepada Craig Risien, Rich Signell, Christopher Wingard dan OOI.
    * BUG FIX: hindari masalah jika file sumber yang berbeda memiliki jenis data yang berbeda untuk variabel yang diberikan. Terima kasih kepada Roy Mendelssohn dan Eugene Burger.
    * Login: **Konversi format waktu** sekarang lebih terlindungi dengan nilai waktu yang buruk. Berkat NDBC.
    * Login: EDDGrid Login Unpacked sekarang menangani nilai waktu dengan **"bulan sejak ..." dan "tahun sejak ..."** Sitemap (dengan meningkatkan bulan atau tahun, bukan dengan menambahkan e.g., 30days berulang kali) Sitemap Terima kasih kepada Soda3.3.1.
    * BUG FIX: hanya dalam v1.74, **Login** diperlukan tindakan (Login http:// Login) dan harus opsional.
    * Login: EDDGrid Login () tidak menambahkan atribut global. Sitemap
         

## Versi 1.74{#version-174} 
 (Oktober 2016) 

*    **Fitur Baru (untuk pengguna) Sitemap**   
     
    * Sekarang, ketika Daftar Dataset (Semua, atau dari pencarian) ditampilkan pada halaman web, judul panjang ditampilkan pada beberapa baris. Sebelumnya, tengah-tengah judul panjang diganti oleh " ... ". Berkat Margaret O'Brien, LTER, dan EML.
         
*    **Sitemap ERDDAP™ Administrator Perlu Tahu dan Lakukan:**   
     
    * TO DO: Di komputer Linux, mengubah pengaturan waktu Apache sehingga permintaan pengguna yang memakan waktu tidak (dengan apa yang sering muncul sebagai kesalahan "Proxy" atau "Bad Gateway") Sitemap Sebagai pengguna akar:
        
        1. Modifikasi Apache http d.conf file (biasanya dalam / dll / http Sitemap) Sitemap
Mengubah yang ada&lt;Sitemap (atau tambahkan satu di akhir file) ke 3600 (Sitemap) , bukan default 60 atau 120 detik.
Mengubah yang ada&lt;Login Login (atau tambahkan satu di akhir file) ke 3600 (Sitemap) , bukan default 60 atau 120 detik.
        2. Restart Apache: /usr/sbin/apachectl Login (tetapi kadang-kadang dalam direktori yang berbeda) Sitemap
        
Terima kasih kepada Thomas Oliver.
         
    * Sitemap \\[ Login Katalog
Ini bekerja seperti direktori bendera, tetapi versi hardFlag juga menghapus semua informasi dataset yang tersimpan. Tidak ada URL untuk mengatur hardFlag. Ini hanya dapat digunakan dengan menempatkan file di direktori itu.
Login Bendera sangat berguna ketika Anda melakukan sesuatu yang menyebabkan perubahan dalam bagaimana ERDDAP™ membaca dan menafsirkan data sumber, misalnya, ketika Anda menginstal versi baru dari ERDDAP™ atau ketika Anda telah membuat jenis perubahan tertentu untuk definisi dataset dalam datasets.xml Sitemap Sitemap [dokumentasi ini](/docs/server-admin/additional-information#hard-flag) Sitemap Berkat John Kerfoot dan semua kelompok Argo.
         
    * Sitemap Xml sekarang memiliki opsi EDDTableFromEML
yang membaca deskripsi dataset dalam Bahasa Metadata Ekologi (Login) file, mengunduh file data terkait, dan menghasilkan potongan datasets.xml sehingga dataset dapat ditambahkan ke ERDDAP Sitemap Ada juga EDDTableDariEMLBatch yang melakukan hal yang sama untuk semua file EML di direktori. Ini bekerja dengan sangat baik karena EML melakukan pekerjaan yang sangat baik untuk menggambarkan dataset dan karena KNB dan LTER membuat file data yang sebenarnya tersedia.
Login ERDDAP™ bisa menjadi kombinasi yang bagus, karena ERDDAP™ dapat memberikan akses langsung kepada kekayaan data KNB dan LTER dan membantu proyek-proyek tersebut memenuhi pemerintah AS [Akses Umum untuk Hasil Penelitian (Login) Sitemap](https://nosc.noaa.gov/EDMC/PD.DSP.php) dengan membuat data yang tersedia melalui layanan web.
Sitemap [dokumentasi ini](/docs/server-admin/EDDTableFromEML) Sitemap Berkat Margaret O'Brien, LTER, dan EML.
         
    * Sitemap Xml sekarang memiliki opsi EDDTableFromInPort
yang membaca deskripsi dataset dalam file InPort XML dan mencoba menghasilkan potongan datasets.xml sehingga dataset dapat ditambahkan ke ERDDAP Sitemap Ini jarang membuat chunk siap pakai XML untuk datasets.xml tapi itu akan membuat draft kasar yang baik yang merupakan titik awal yang baik untuk mengedit oleh manusia.
Ini akan sangat bagus jika orang menggunakan InPort untuk mendokumentasikan dataset mereka juga akan digunakan ERDDAP™ untuk membuat data aktual yang tersedia melalui ERDDAP Layanan web dan dengan demikian bertemu pemerintah AS dan Meme it NOAA Sitemap [Akses Umum untuk Hasil Penelitian (Login) Sitemap](https://www.whitehouse.gov/blog/2013/02/22/expanding-public-access-results-federally-funded-research) dengan membuat data yang tersedia melalui layanan web. Ini adalah solusi yang bisa digunakan sekarang. ( erd.data at noaa.gov senang membantu.)   
Sitemap [dokumentasi ini](/docs/server-admin/datasets#eddtablefrominport) Sitemap Terima kasih kepada Evan Howell dan Melanie Abecassis.
         
    * Sitemap ERDDAP™ sekarang menggunakan netcdf-java 4.6.6.
Dengan versi sebelumnya, netcdf-java membaca beberapa nilai pengisian (mungkin, hanya dalam file netcdf-4) g Sekarang membaca beberapa dari mereka sebagai nilai pengisian standar netcdf: -127 untuk byte, -32767 untuk celana pendek, -2147483647 untuk ints. Unidata mengatakan perilaku baru adalah perilaku yang tepat. Jika variabel dalam dataset mulai menunjukkan salah satu nilai-nilai ini di mana mereka digunakan untuk menunjukkan 0, Anda dapat menambahkan, misalnya,
```
        <att name="\\_FillValue" type="short">-32767</att>  
```
ke variabel addAttributes Sitemap ERDDAP™ untuk mengobati nilai itu sebagai missing\\_value Login Nilai. Namun, dalam banyak kasus, itu tidak akan menghasilkan hasil yang diinginkan: 0's. Jika demikian, pertimbangkan memodifikasi file dengan NCO atau menulis ulang file. Login Sitemap Unidata Sitemap
         
    * TO DO: Palet Topografi Baru
Saya mendorong Anda untuk beralih semua dataset yang menggunakan palet OceanDepth untuk menggunakan palet TopografiDepth baru, yang seperti Topografi kecuali dengan warna yang dibalik, sehingga cocok untuk nilai kedalaman (positif=down) , bukan nilai ketinggian (Sitemap) Sitemap Pengaturan yang disarankan untuk palet ini adalah:
```
            <att name="colorBarMaximum" type="double">8000.0</att>
            <att name="colorBarMinimum" type="double">-8000.0</att>
            <att name="colorBarPalette">TopographyDepth</att> 
```

    * FITUR BARU: Login missing\\_value dan/atau \\_FillValue
Jika variabel String mendefinisikan missing\\_value dan/atau \\_FillValue, ERDDAP™ sekarang akan menghapus nilai-nilai dari data dan menggantinya dengan string kosong, sehingga nilai-nilai yang hilang muncul sebagai string kosong, seperti dengan set data lainnya ERDDAP Sitemap Berkat Margaret O'Brien, LTER, dan EML.
         
    * FITUR BARU: Dukungan untuk Waktu Lokal
variabel kalitamp dengan data sumber dari String sekarang dapat menentukan zona waktu melalui " time\\_zone " atribut yang mengarah ERDDAP™ untuk mengubah waktu-waktu sumber zona lokal (beberapa dalam Waktu Standar, beberapa dalam Waktu Hemat Daylight) Login Zulu Sitemap Daftar nama zona waktu yang valid mungkin identik dengan daftar di kolom TZ di [tabel ini](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) Sitemap default adalah " Zulu Sitemap Zona waktu AS umum adalah: US / Hawaii, US / Alaska, US / US / US / Mountain, US / Arizona, AS / Tengah, AS / Timur. Untuk variabel kalitamp dengan data sumber numerik, Anda dapat menentukan " time\\_zone " atribut, tetapi nilai harus " Zulu " atau "UTC". Berkat Margaret O'Brien, LTER, dan EML.
         
    * FITUR BARU: EDDTableDariAsciiFiles sekarang mendukung file semicolon-separated
dan lebih cerdas tentang mencari pemisah. Berkat Margaret O'Brien, LTER, dan EML.
         
    * FITUR BARU: Jika ada kesalahan yang signifikan dalam loadDataset (besar atau kecil, misalnya, hilang atau tidak valid datasets.xml Sitemap) Login ERDDAP™ sekarang akan menunjukkannya dalam status.html, tepat di bawah "n Datasets Gagal Untuk Beban" sebagai ERROR: sementara pemrosesan datasets.xml : lihat log.txt untuk rincian.
         
    * FITUR BARU: ERDDAP™ mencari anak yatim.
Sitemap ERDDAP™ Apakah beban utama Dataset, sekarang terlihat untuk set data yatim (dataset yang ada di ERDDAP™ tapi tidak datasets.xml ) Sitemap Jika ditemukan, mereka terdaftar dalam status.html, tepat di bawah "n Dataset Gagal Untuk Beban" sebagai ERROR: n Orphan Datasets (dataset ERDDAP™ tapi tidak datasets.xml ) Login
Jika Anda ingin menghapus (Login) anak yatim dari ERDDAP™ Anda perlu menambahkan
        &lt;dataset type="_anyValidType_" datasetID ="_theDatasetID_" aktif="false" /&gt;
Login datasets.xml sampai dataset dibongkar selama loadDataset utama berikutnya.
         
    * Login: Jika dataset memiliki variabel timestamp numerik dengan unit selain "seconds since 1970-01-01T00:00:00Z" dan dengan&lt;updateEveryNMillis&gt; sistem aktif, rentang variabel timestamp diatur secara tidak benar ketika dataset diperbarui. Terima kasih kepada John Kerfoot.
         
    * BUG FIX&lt;QuickRestart&gt; benar dalam setup.xml dan Anda meminta data dari EDDTableDari... File dataset yang digunakan&lt;updateEveryNMillis&gt;, permintaan pertama ke dataset akan gagal, tetapi permintaan berikutnya akan berhasil. Sekarang permintaan pertama tidak akan gagal. Terima kasih kepada John Kerfoot.
         
    * BUG FIX: GenerateDatasetsXml.sh dan .bat tidak bekerja dengan parameter &gt; 9 pada baris perintah. Sekarang mereka lakukan. Terima kasih kepada John Kerfoot.
         
    * Login: EDDTable baruDari MultidimNcFiles tidak secara konsisten menghapus ruang trailing dari string. Sitemap Tidak mungkin, file ARGO yang terkena ini. Kevin O'Brien dan Roland Schweitzer.
         
    * Login: Semua akses remote DAP Layanan sekarang diprakarsai oleh kode yang lebih modern. Ini memperbaiki kesalahan "koneksi tertutup" ketika mengakses beberapa dataset EDDTableDariErddap. Kevin O'Brien
         
    * Login: Penanganan orderBy Login () dan berbeda () sekarang kembali ke jalan mereka sebelum perubahan terbaru: permintaan yang diberikan mungkin memiliki beberapa orderBy Login () dan/atau yang berbeda () filter; ERDDAP™ akan menangani mereka dalam urutan mereka ditentukan. Meme it David Karuga
         
    * Login: Jika dataset adalah EDDTableDariDatabase dan query memiliki [WordPress.org](/docs/server-admin/datasets#sourcecanorderby) dan/atau [Login](/docs/server-admin/datasets#sourcecandodistinct) Database (tergantung pada pengaturan datasets.xml ) sebagian atau benar-benar menangani **hanya yang pertama**   orderBy Sitemap () atau berbeda () Sitemap David Karuga
         
    * Login: Pengkodean ekstra persen terbaru yang disebabkan masalah dengan beberapa pertanyaan untuk .nc file CF, e.g., "HTTP Status 500 - Kesalahan Query: variabel=station tercantum dua kali dalam daftar variabel hasil. Kevin O'Brien
         
    * BUG FIX: EDDTableDariFiles memiliki kesulitan mengisi ulang dataset ketika salah satu kolom adalah kolom char sejati. About Roland Schweitzer
         
    * Login: EDDGrid Login Tidak dikemas sekarang juga mengkonversi missing\\_value dan \\_FillValue untuk nilai standar sehingga file dengan nilai yang berbeda dapat digregat. Karena perubahan ini, setelah Anda menginstal versi baru ini ERDDAP™ Sitemap [Login Login](/docs/server-admin/additional-information#hard-flag) untuk setiap EDDGrid Login Unpacked dataset di Anda ERDDAP Sitemap
         
    * IMPROVED: EDDTableDariNcCFFiles sekarang dapat menangani file yang memiliki beberapa sampel\\_dimension. Dataset yang diberikan hanya boleh menggunakan variabel yang menggunakan salah satu contoh\\_dimensions. Ajay Krishnan
         
    * IMPROVED: Untuk EDDTableDari...Files,&lt;sortFilesBySourceNames&gt; Sitemap (Sitemap) atau daftar terpisah dari nama sumber variabel. Dalam kasus, nama variabel individu dapat dikelilingi oleh kutipan ganda, misalnya, jika nama memiliki ruang internal.

## Versi 1.72{#version-172} 
 (Juli 2016-05-12) 

*    **Fitur Baru (untuk pengguna) Sitemap** Login
     
*    **Sitemap ERDDAP™ Administrator Perlu Tahu dan Lakukan:** 
    * NEW EDDTableDariMultidimNcFiles [Sitemap](/docs/server-admin/datasets#eddtablefrommultidimncfiles) adalah alternatif baru untuk EDDTableDariNcFiles. Ini dirancang untuk menangani kelompok file dengan beberapa variabel dengan dimensi bersama, misalnya, var1 \\[ Sitemap \\]  \\[ Login \\] Login \\[ Sitemap \\] Login \\[ Login \\] Sitemap Terima kasih kepada Proyek Argo, Aurélie Briand, dan Roland Schweitzer.
    * Login: ERDDAP™   (melalui kelas FileVisitorDNLS dan FileVistorSubdir) sekarang mengikuti tautan simbolik di Linux. ERDDAP™ masih tidak mengikuti .lnk pada Windows.
    * BUG FIX bug diperkenalkan pada 1.70: berbeda + orderBy tidak diperbolehkan dalam satu permintaan. Sekarang mereka lagi. Mereka tidak saling eksklusif / redundansi. David Karuga
    * Login datasets.xml daftar hitam alamat IP:
Alamat IP v4 muncul ERDDAP™ sebagai 4 nomor hex yang dipisahkan periode.
Saya pikir alamat IP v6 muncul sebagai 8 nomor hex usus besar.
Login ERDDAP™ sekarang mendukung koloni di alamat IP dalam daftar dan :\\* pada akhir daftar untuk memblokir berbagai alamat.
    * Sitemap ERDDAP™ sekarang menggunakan NetcdfWFileriter untuk menulis .nc file bukan NetcdfFileWriteable. Tidak ada perubahan yang dapat disengaja pada file yang dihasilkan. Ini membuka kemungkinan membuat besar .nc file yang menggunakan .nc 3 64bit ekstensi. Jika Anda ingin/mendapatkan itu, silakan kirim permintaan untuk erd.data at noaa.gov Sitemap
    * IMPROVED: Banyak tautan ke situs web jarak jauh yang terbaru. Sekarang mereka up-to-date dan digunakan https: Sitemap http : setiap saat.
    * Banyak perubahan kecil.

## Versi 1.70{#version-170} 
 (dirilis 2016-04-15) 

*    **Fitur Baru (untuk pengguna) Sitemap** Login
     
*    **Sitemap ERDDAP™ Administrator Perlu Tahu dan Lakukan:** Di bawah ini, ada beberapa perubahan yang disarankan untuk dokumentasi dalam file setup.xml Anda.
Silahkan lakukan perubahan ini sekarang.
30 menit kerja sekarang dapat menghemat jam kebingungan di masa depan.
    * Perbaikan bug: Masalahnya adalah bahwa permintaan yang diarahkan ke remote ERDDAP gagal dengan karakter yang tidak valid ' | Sitemap Ini hanya terjadi dengan versi terbaru dari Tomcat. Terima kasih kepada Rusty Holleman, Conor Delaney, dan Roy Mendelssohn.
    * Perbaikan bug: ERDDAP™ sekarang menggunakan versi up-to-date netcdf-java (cerita panjang) yang mencakup dukungan terbaru untuk NcML, yang memperbaiki masalah dengan NcML LogicalReduce tidak bekerja seperti yang diharapkan. Ada beberapa perubahan kecil pada metadata yang Meme it ERDDAP™ netcdf-java .nc Login .hdf .grib, dan file .bufr. Favio Medrano
    * Login [Login](/docs/server-admin/datasets#eddtableaggregaterows) memungkinkan Anda untuk membuat dataset EDDTable yang digabungkan dari dua atau lebih dataset EDDTable yang memiliki variabel data yang sama menggunakan unit yang sama. Berkat Kevin O'Brien.
    * Opsi baru untuk EDDTableDariDatabase ( [WordPress.org](/docs/server-admin/datasets#sourcecanorderby) Login [Login](/docs/server-admin/datasets#sourcecandodistinct) ) Pastikan Anda menentukan apakah Meme it ERDDAP™ , database, atau keduanya, menangani berbeda dan orderBy   (dan semua varian) Login David Karuga
    * Anda sekarang dapat membuat grafik dataset pribadi dan metadata yang tersedia untuk publik melalui yang baru [&lt;GrafikAccessibleTo&lt;Login (/docs/server-admin/dataset#graphsaccessibleto) Login Berkat Emanuele Lombardi.
    * Sekarang, jika string dilewatkan ke GenerateDataset Xml atau DasDds dikelilingi oleh kutipan ganda, tidak dikutip (seolah-olah itu adalah string JSON) Sitemap Terima kasih kepada John Kerfoot dan Melanie Abecassis.
    * Login Xml sekarang mendukung "default" untuk mendapatkan default dan "tidak ada" untuk mendapatkan string kosong (mereka bekerja dengan atau tanpa kutipan) Sitemap Ini memecahkan beberapa masalah yang berkaitan dengan melewati string kosong.
    * Sekarang, di GenerateDataset Login EDDGrid Dari File dan EDDTable DariFiles dataset, jika sampel FileName Anda menentukan "" (string kosong) , itu akan menggunakan fileName pencocokan terakhir dari direktori + regex + recursive=true.
    * Diperbarui: The displayInBrowser code yang digunakan untuk menampilkan hasil GenerateDatasetsXml dan DasDds pada komputer Linux adalah out-of-date dan memberikan pesan aneh tentang Netscape. Sekarang, ini menggunakan alat Linux modern: xdg-open. Berkat Melanie Abecassis.
    * Login allDatasets dataset sekarang memiliki "files" kolom, yang menunjukkan URL dasar link /file (jika ada satu) dataset.
    * Meningkatkan keamanan umum Anda ERDDAP™ dengan mengubah izin yang terkait dengan direktori tomcat dan huruf besar:
         (Perintah aktual di bawah ini adalah untuk Linux. Untuk OS lain, lakukan perubahan analog.) 
        * Mengubah "kelompok" menjadi tomcat, nama pengguna Anda, atau nama kelompok kecil yang mencakup tomcat dan semua administrator Tomcat/ ERDDAP Sitemap
Facebook Twitter Google Plus Pinterest Email
Login Facebook Twitter Google Plus Pinterest Email
        * Mengubah izin sehingga tomcat dan kelompok telah membaca, menulis, melaksanakan hak istimewa, misalnya,.
chmod -R ug+rwx apache-tomcat-_8.0.23_
Facebook Twitter Google Plus Pinterest Email
        * Hapus izin pengguna "lain" untuk membaca, menulis, atau melaksanakan:
chmod -R o-rwx apache-tomcat-_8.0.23_
Facebook Twitter Google Plus Pinterest Email
Hal ini penting, karena mencegah pengguna lain dari membaca mungkin informasi sensitif dalam ERDDAP™ file setup, file log, dan file dengan informasi tentang dataset pribadi.
    * Sistem otentikasi/login direvisi. Berkat Thomas Gardner, Emanuele Lombardi, dan baru pemerintah AS [HTTPS-Only Standar](https://home.dotgov.gov/management/preloading/dotgovhttps/) Sitemap
        * Otentikasi = opsi terbuka dihapus. Sudah kedaluwarsa.
        * Baru, direkomendasikan, [otentikasi=google](/docs/server-admin/additional-information#google) opsi menggunakan Google Login (di OAuth 2.0) untuk memungkinkan siapa pun dengan akun email Google (Sitemap Akun yang dikelola Google seperti @noaa.gov ) login
        * Login [otentikasi=email](/docs/server-admin/additional-information#email) opsi adalah cadangan untuk otentikasi=google. Ini memungkinkan pengguna dengan&lt;pengguna&gt; tag di datasets.xml untuk masuk dengan mengirimkan email dengan tautan khusus.
        * Di setup.xml Anda, mohon ubah deskripsi untuk&lt;otentikasi&gt;
```
            <!-- If you want to restrict access to some datasets, 
            you need to specify the method used for logging on (authentication).
            See the info at 
            https://erddap.github.io/setup.html#security
            Currently, the options are: "" (logins not supported, the default), 
            "custom", "email", and "google" (recommended).  
            \\[No longer supported: "basic", "openid"\\]
            -->
```

        * Di setup.xml Anda, tambahkan hak ini di bawah&lt;Sitemap Login
```
            <!-- If authentication=google, you must supply your Google Client ID. 
            See
            https://developers.google.com/identity/sign-in/web/devconsole-project
            When setting this up, for Authorized JavaScript origins, 
            for testing on your computer, use the domain "localhost" 
            (e.g., origin=https://localhost:8443), 
            not "127.0.0.1" (because Google Sign-In doesn't work with anything 
            at that domain).
            This will be a string of about 75 characters, probably starting with
            several digits and ending with .apps.googleusercontent.com .
            -->
            <googleClientID></googleClientID>
```

        * Sekarang, pengguna yang tidak masuk dapat digunakan http Sitemap https URL (jika Anda telah mengatur&lt;baseHttpsUrl&gt; di setup Anda.xml). Terima kasih kepada baru pemerintah AS [HTTPS-Only Standar](https://https.cio.gov/) Sitemap
        * Sekarang, Anda dapat mendorong semua pengguna untuk menggunakan https   (Login http ) Sitemap&lt;Login https URL Untuk memaksa pengguna untuk menggunakan hanya https Anda juga harus melakukan perubahan pada pengaturan Apache/Tomcat Anda untuk memblokir non- https Login Terima kasih kepada baru pemerintah AS [HTTPS-Only Standar](https://https.cio.gov/) Sitemap
            
Di setup.xml Anda, mohon ubah deskripsi untuk&lt;Login
```
            <!-- baseUrl is the start of the public URL, to which "/erddap" 
            is appended. For example:
            For running/testing on your personal computer:
              <baseUrl>http://localhost:8080</baseUrl>     
              (127.0.0.1 doesn't work with authentication=google).
            If you want to encourage all users to use https (not http), 
              make the baseUrl the same as the baseHttpsUrl (see below).
            For ERD releases, we used to use
              <baseUrl>http://coastwatch.pfeg.noaa.gov</baseUrl>    
            For ERD releases, we now use
              <baseUrl>https://coastwatch.pfeg.noaa.gov</baseUrl>    
            -->
```

        * Pilihan&lt;Sitemap Login Di setup.xml Anda, mohon ubah deskripsi untuk&lt;passwordEncoding&gt; untuk menjadi
```
            <!-- For "custom" authentication, this specifies how you have 
            stored passwords in the roles tags in datasets.xml.
            If you aren't storing any passwords, this is irrelevant.
            The options (in order of increasing security) are: 
            "MD5", "UEPMD5" (MD5(UserName:ERDDAP:Password)), 
            "SHA256", "UEPSHA256" (SHA256(UserName:ERDDAP:Password), 
            the default).
            You should only use "MD5" or "SHA256" if you need to match 
            values stored that way in an external password database.
            See the info at 
            https://erddap.github.io/setup.html#security
            --> 
```

        * Di setup.xml Anda, mohon ubah deskripsi untuk&lt;Login
```
            <!-- This is a variant of <baseUrl> which is used when 
            authentication is active and the user is logged in.
            In general, you take the <baseUrl>, change "http" to "https", 
            and change/add ":8443". This must begin with "https://".
            If you make a proxy so that ":8443" isn't needed, 
            then don't use ":8443" here.
            This is relevant even if <authentication> is "".
            See the instructions at 
            https://erddap.github.io/setup.html#security
            For example:
            For running/testing on your personal computer:
              <baseHttpsUrl>https://localhost:8443</baseHttpsUrl>                  
            For releases at ERD, we use:
              <baseHttpsUrl>https://coastwatch.pfeg.noaa.gov</baseHttpsUrl>  
            If you want to encourage all users to use https (not http), 
              make the baseUrl (see above) the same as the baseHttpsUrl.
            --> 
```

        * Sekarang, jika listPrivateDatasets=true dalam setup.xml, bahkan kurang informasi akan ditampilkan tentang dataset bahwa pengguna tidak memiliki akses ke.
    * Sekarang, terutama untuk ketika Anda awalnya mengatur Anda Meme it ERDDAP Anda sekarang dapat memberitahukan ERDDAP™ tidak mencoba berlangganan jarak jauh ERDDAP™ Login Filipina Rocha Freire
Di setup Anda.xml, tepat sebelum&lt;fontFamily&gt;, silakan tambahkan
```
        <!-- Normally, if you have a EDDGridFromErddap or EDDTableFromErddap 
        dataset in your datasets.xml, it will try to subscribe to the remote 
        ERDDAP™ dataset so that the local dataset is kept perfectly up-to-date.
        If this ERDDAP™ is not publicly accessible (http://localhost), or its
        IP address will change soon, or you have some other reason, 
        you can tell this ERDDAP™ to not try to subscribe to the remote 
        ERDDAP™ datasets by setting this to false. (default=true) 
        This is the overall setting for this ERDDAP. It can be overridden by
        the same tag (with a different value) in the datasets.xml chunk for 
        a given EDD...FromErddap dataset. 
        For each fromErddap dataset that doesn't subscribe to the remote 
        ERDDAP™ dataset, you should set <reloadEveryNMinutes> to a smaller 
        number so that the local dataset stays reasonably up-to-date. -->
        <subscribeToRemoteErddapDataset>true</subscribeToRemoteErddapDataset>
```

    * Dalam setup.xml Anda, dalam instruksi di atas&lt;emailDariAddress&gt;, masukkan:
Jika memungkinkan, atur ini untuk menggunakan koneksi yang aman (SSL / TLS) ke server email.
Jika pengaturan Anda tidak menggunakan koneksi yang aman ke server email, silakan lakukan perubahan untuk membuatnya begitu.
    * Sitemap datasets.xml , tambahkan garis ini ke deskripsi&lt;berlanggananEmailBlacklist&gt; di Anda datasets.xml Sitemap
Anda dapat menggunakan nama "\\*" untuk daftar hitam seluruh domain, misalnya,\\*Sitemap
    * Karena perubahan sistem penebangan dalam v1.66, file log tidak pernah terbaru. Selalu ada pesan atau bagian pesan yang menunggu untuk ditulis ke file log. Sekarang, Anda dapat membuatnya terbaru (Sitemap) dengan melihat ERDDAP 's status halaman web dihttp://_your.domain.org_/erddap/status.htmlSitemap
    * Login
    * Perubahan kecil (ke String2.canonical) yang harus membantu menjaga hal-hal bergerak cepat ketika Meme it ERDDAP™ sangat sibuk dan juga kesepakatan yang lebih baik dengan sejumlah besar dataset.
    * Sitemap Disarankan: berhenti menggunakan&lt;Login Sitemap datasets.xml untuk mengkonversi nomor IP dalam dataset&lt; sourceUrl Sitemap (Loginhttp://192.168.#.#/) nama domain (Login http :my.domain.org/) Sitemap Mulai sekarang, berlangganan baru hinggahttp://localhostLoginhttp://127.0.0.1Sitemaphttp://192.168.#.#URL tidak akan diperbolehkan untuk alasan keamanan. Jadi, selalu menggunakan nama domain publik di Meme it&lt; sourceUrl Sitemap (jika diperlukan karena masalah DNS) Anda dapat menggunakan [/etc/hosts tabel di server Anda](https://linux.die.net/man/5/hosts) untuk memecahkan masalah dengan mengkonversi nama domain lokal ke nomor IP tanpa menggunakan server DNS. Anda dapat menguji apakah nama domain tertentu diselesaikan dengan benar dengan menggunakan
ping _some.domain.name_
    * Dalam menghasilkanDataset.xml, untuk dataset jarak jauh (Web server) , dihasilkan secara otomatis datasetID s tidak berubah untuk sebagian besar domain. Untuk beberapa domain, bagian pertama (i.e., nama) secara otomatis dihasilkan datasetID akan sedikit berbeda. Meme it Tidak mungkin, nama yang memiliki satu bagian sekarang lebih cenderung memiliki dua bagian. Sebagai contoh, dataset darihttp://oos.soest.hawaii.edusebelumnya menyebabkan datasetID s yang dimulai dengan hawaii\\_, tapi sekarang mengarah ke datasetID hawaii\\_soest\\_ Jika ini menyebabkan masalah bagi Anda, silakan email saya. Mungkin ada pekerjaan.
    * Driver Cassandra diperbarui untuk cassandra-driver-core-3.0.0.jar dan dengan demikian untuk Cassandra v3. EDDTableDariCassandra tidak mengambil keuntungan dari fitur baru di Cassandra Sitemap Indeks di Cassandra sekarang bisa lebih kompleks, tetapi ERDDAP™ masih menggunakan model indeks Cassandra v2, yang mengasumsikan bahwa kolom yang diindeks dapat langsung ditanyakan dengan '=' Login Login Xml untuk EDDTableDariCassandra tidak lagi mendeteksi kolom dengan indeks; jika indeks sederhana, Anda perlu menentukannya dalam datasets.xml Sitemap Jika Anda memerlukan dukungan untuk indeks yang lebih kompleks atau fitur baru lainnya, silakan email erd.data at noaa.gov Sitemap
Login Jika Anda masih menggunakan Cassandra 2.x, silakan terus menggunakan ERDDAP™ v1.68 sampai Anda upgrade untuk menggunakan Cassandra 3.x.
    * Jars dan Classpath - Hampir semua file .jar pihak ketiga yang disertakan diperbarui ke versi terbaru mereka.
        * slf4j.jar ditambahkan ke /lib dan kelas.
        * Login jar dan tsik. jar dihapus dari /lib dan kelas.
        * Jika Anda mendapatkan pesan kesalahan tentang kelas tidak ditemukan ketika Anda mengkompilasi atau menjalankan ERDDAP™ atau salah satu alatnya, bandingkan kelas baris perintah Anda untuk Meme it ERDDAP Sitemap [kelas saat ini](/docs/contributing/programmer-guide#development-environment) untuk mengetahui mana .jars hilang dari kelas Anda.

## Versi 1.68{#version-168} 
 (FacebookTwitterGoogle+) 

*    **Fitur Baru (untuk pengguna) Sitemap** Login
     
*    **Sitemap ERDDAP™ Administrator Perlu Tahu dan Lakukan:** 
    *    [ EDDGrid DariFiles Aggregation melalui Nama File atau Metadata Global](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata) Login
Semua variasi EDDGrid Dari File sekarang dapat mengumpulkan sekelompok file dengan menambahkan dimensi paling kiri baru, biasanya waktu, berdasarkan nilai yang berasal dari setiap nama file atau dari nilai atribut global yang ada di setiap file.
    * IMPROVED: Kami sebelumnya menyarankan bahwa Anda mungkin ingin membuat EDDGrid Dari dataSet Erddap di Anda datasets.xml jplMU RSS T dataset di kami ERDDAP Sitemap Karena sekarang ada versi yang lebih baru dari dataset itu, dataset sekarang dideprecated. Jadi jika Anda memiliki dataset di Anda Meme it ERDDAP™ mohon tambahkan dataset baru ini
```
        <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">  
          <!-- Multi-scale Ultra-high Resolution (MUR) SST analysis fv04.1, Global, 0.011 Degree, Daily -->  
          <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>  
        </dataset>  
```
Jika Anda ingin menghapus jplMU lama RSS T dataset dari Anda ERDDAP™   (itu pilihan Anda) mengubah pengaturan aktif dari "true" menjadi "false".
    * Perbaikan bug: Silakan periksa bigParentDirectory yang Anda tentukan dalam setup Anda.xml. Jika Anda tidak menaruh bulu mata pada akhir&lt;bigParentDirectory&gt; nama, kemudian ERDDAP™ akan membuat beberapa direktori dengan menerapkan kata-kata langsung ke nama yang Anda tentukan, bukan membuat subdirectories. Mulai dengan versi 1.68, ERDDAP™ menambahkan bulu mata pada akhir nama direktori jika Anda tidak menentukan satu. Jadi jika Anda sebelumnya tidak menentukan bulu mata di akhir, maka ketika Anda menginstal ERDDAP™ v1.68 Anda perlu memindahkan dan mengganti nama direktori tersebut **Sitemap** Anda mematikan lama Meme it ERDDAP™ Login **Sitemap** Anda memulai ERDDAP Sitemap Sebagai contoh, jika Anda benar-benar menentukan besarParentDirectory sebagai /home/erddapBPD (tidak ada garis bulu mata) Login ERDDAP™ telah membuat direktori seperti Meme it
Facebook Twitter Google Plus Pinterest Email
/home/erddapBPDcopy
Facebook Twitter Google Plus Pinterest Email
/home/erddapBPDflag
Login
/home/erddapBPDlucene
dan file bernama /home/erddapBPDsubscriptionsV1.txt,
maka Anda perlu memindahkan dan mengganti nama mereka untuk menjadi Meme it
WordPress.org
/home/erddapBPD/copy
Facebook Twitter Google Plus Pinterest Email
/home/erddapBPD/flag
/home/erddapBPD/log
/home/erddapBPD/lucene
dan /home/erddapBPD/subscriptionsV1.txt
    * Perbaikan bug: Ada bug di EDDGrid LonPM180 di ERDDAP™ v1.66 yang terjadi ketika dataset anak adalah EDDGrid Login
    * Perbaikan bug: Ada bug di EDDGrid Dari File dan EDDTable DariFiles di ERDDAP™ v1.66 yang disebabkan&lt;updateEveryNMillis&gt; untuk mengabaikan pertama kalinya dataset dimuat setelah restart.
    * Perbaikan bug / Fitur Baru: Jika dataset anak dalam EDDGrid Sitemap EDDGrid Fotokopi EDDGrid Sitemap EDDGrid LonPM180, EDDGrid SideBySide, EDDTableCopy, atau EDDTableDari EDDGrid adalah dataset ...DariErddap, bahwa dataset induk sekarang berlangganan ke bawah ERDDAP™ Login Sitemap ERDDAP™ dataset adalah dalam yang sama ERDDAP™ berlangganan dan validasinya dilakukan secara langsung; Anda tidak akan mendapatkan email meminta Anda untuk memvalidasi berlangganan. Jika sistem berlangganan untuk Anda ERDDAP™ dimatikan, set&lt;reloadEveryNMinutes&gt; pengaturan dataset induk ke nomor kecil (60?) sehingga tetap terbaru. Meme it
    * Perbaikan bug / Fitur Baru: Jika dataset anak dalam EDDGrid Sitemap EDDGrid Fotokopi EDDGrid Sitemap EDDGrid LonPM180, EDDGrid SideBySide, EDDTableCopy, atau EDDTableDari EDDGrid memiliki aktif="false", bahwa dataset anak sekarang skipped.

## Versi 1.66{#version-166} 
 (dirilis 2016-01-19) 

*    **Fitur Baru (untuk pengguna) Sitemap** 
    * Login (Sitemap) sekarang memiliki nilai turun pada kapak. Meme it Untuk mendapatkan ini ketika menggunakan halaman web Make A Graph, mengubah sumbu Y baru: pengaturan akhir (Login) turun. Atau, dalam URL yang meminta grafik, gunakan 3rd opsional baru ' | Parameter [Login Sitemap yRange switch](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands) , yang tidak bisa (Login) , benar, atau t untuk mendapatkan nilai akhir, atau menggunakan palsu atau f untuk mendapatkan nilai turun. Sitemap | nilai-nilai palsu tidak sensitif. Berkat Chris Fullilove, John Kerfoot, Lukas Campbell, dan Cara Wilson.
    * Pengguna sekarang dapat menentukan warna latar belakang untuk grafik dengan menambahkan &.bgColor=0x_ AARRGGBB_ beralih ke URL yang meminta grafik. Lihat .bgColor di bagian Perintah Grafik [Login](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands) Login [ tabledap ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#GraphicsCommands) Sitemap Terima kasih kepada John Kerfoot dan Lukas Campbell.
    * Untuk set data tabel, batasan sekarang dapat merujuk ke min (_someVariableName_) atau maks (_someVariableName_) Sitemap Sitemap [Login () dan maks () ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#min) Sitemap Terima kasih kepada John Kerfoot.
    * Untuk set data tabel, batasan waktu yang digunakan [Sitemap](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now) sekarang dapat menentukan unit waktu mili detik atau milis.
    * Permintaan untuk gambar dataset tabular sekarang membuat peta (bukan grafik) jika variabel x dan y longitude-like dan variabel seperti latitude (unit yang kompatibel) Sitemap Terima kasih kepada Rich Signell.
    * Perbaikan bug: Label dan kutu sumbu waktu kadang-kadang memiliki penyimpangan aneh ketika meminta beberapa grafik secara bersamaan (e.g., di halaman web) Sitemap Masalahnya adalah bug di perpustakaan grafis SGT yang ERDDAP™ Login (satu variabel adalah "statis" yang seharusnya tidak) Sitemap Terima kasih kepada Bradford Butman.
         
*    **Sitemap ERDDAP™ Administrator Perlu Tahu dan Lakukan:** 
    * Ini adalah risiko keamanan untuk menempatkan kata sandi email Anda dalam file teks biasa seperti setup.xml. Untuk mengurangi masalah itu, kami sangat menyarankan Anda:
        1. Mengatur akun email hanya untuk ERDDAP 's use, misalnya, erddap@yourInstitution.org . Itu memiliki manfaat lain juga; sangat baik, lebih dari satu ERDDAP™ administrator kemudian dapat diberikan akses ke akun email itu.
        2. Membuat izin dari file setup.xml rw (Login) untuk pengguna yang akan menjalankan Tomcat dan ERDDAP™   (user=tomcat?) dan tidak ada izin (tidak membaca atau menulis) untuk kelompok dan pengguna lain. Filipina Rocha Freire
    * Login [Login](/docs/server-admin/additional-information#archiveadataset) alat menyederhanakan membuat .tar  .gz arsip dengan subset dataset dalam format yang cocok untuk pengarsipan (Sitemap NOAA Login) Sitemap Ini harus berguna untuk banyak ERDDAP™ administrator dalam banyak situasi, tetapi terutama untuk kelompok dalam NOAA Sitemap
    * Jenis dataset baru [ EDDGrid DariNcFilesUnpacked](/docs/server-admin/datasets#eddgridfromncfilesunpacked) adalah varian EDDGrid Login Perbedaannya adalah bahwa kelas ini membongkar setiap file data sebelum EDDGrid DariFiles melihat file:
        
        * Ini membongkar variabel dikemas yang digunakan scale\\_factor dan/atau add\\_offset Sitemap
        * Ini mempromosikan variabel integer yang memiliki atribut \\_Unsigned=true ke jenis data integer yang lebih besar sehingga nilai-nilai muncul sebagai nilai yang belum ditentukan. Misalnya, \\_Unsigned=true byte (8 g) variabel menjadi pendek yang ditandatangani (16 g) variabel.
        * Ini mengkonversi \\_FillValue dan missing\\_value nilai menjadi NaN (atau MAX\\_VALUE untuk jenis data integer) Sitemap
        
Keuntungan besar dari kelas ini adalah bahwa ia memberikan cara untuk berurusan dengan nilai yang berbeda scale\\_factor Login add\\_offset , \\_FillValue, atau missing\\_value dalam file yang berbeda dalam koleksi. Jika tidak, Anda harus menggunakan alat seperti Meme it [Login](/docs/server-admin/datasets#ncml-files) Sitemap [ NCO ](/docs/server-admin/datasets#netcdf-operators-nco) untuk memodifikasi setiap file untuk menghapus perbedaan sehingga file dapat ditangani oleh EDDGrid Login Untuk kelas ini untuk bekerja dengan benar, file harus mengikuti standar CF untuk atribut terkait. Terima kasih kepada Philippe Makowski.
    * Jenis dataset baru [ EDDGrid LonPM180](/docs/server-admin/datasets#eddgridlonpm180) memungkinkan Anda mengubah dataset yang memiliki beberapa nilai longitude lebih dari 180 (e.g., kisaran 0 hingga 360) ke dalam dataset dengan nilai longitude dalam kisaran -180 hingga 180 (Longitude Plus atau Minus 180, maka nama) Sitemap Keuntungan besar untuk menawarkan set data dengan nilai longitude dalam kisaran -180 hingga 180 adalah bahwa OGC Sitemap (Login WMS ) membutuhkan nilai longitude dalam kisaran ini. Terima kasih kepada Lynne Tablewski, Fabien Guichard, Philippe Makowski, dan Martin Spel.
2016-01-26 Update: Eeek&#33; Ini memiliki bug yang terjadi ketika dataset anak adalah EDDGrid DariErddap yang merujuk pada dataset yang sama ERDDAP Sitemap Bug ini tetap ERDDAP™ v1.68.
    * Sitemap [Login](/docs/server-admin/datasets#generatedatasetsxml) , jenis dataset khusus baru, EDDGrid LonPM180DariErddapKatalog, memungkinkan Anda menghasilkan datasets.xml Sitemap EDDGrid LonPM180 dataset dari semua EDDGrid dataset dalam sebuah ERDDAP yang memiliki nilai longitude lebih dari 180.
    * Untuk semua EDDGrid Login datasets.xml Anda sekarang dapat menggunakan opsional
Sitemap&lt;Sitemap Login WMS Sitemap | Login&lt;Sitemap Login WMS Sitemap (/docs/server-admin/dataset#accessibleviawms)   (default=true) Sitemap Menyiapkan ini untuk palsu menonaktifkan Meme it WMS Layanan untuk dataset ini. Jika benar, dataset masih tidak dapat diakses melalui WMS untuk alasan lain (e.g., tidak ada lat atau lon axes) Sitemap Ini sangat berguna untuk dataset yang ada pada mereka sendiri dan dibungkus dengan EDDGrid LonPM180, sehingga hanya versi LonPM180 dapat diakses melalui WMS Sitemap
    * Dalam setup.xml, Anda dapat menentukan warna default yang berbeda untuk latar belakang grafik. Warna ditentukan sebagai nilai heksadecimal 8 digit dalam bentuk 0x_AARRGGBB_, di mana AA, RR, GG, dan BB adalah opacity, komponen merah, hijau dan biru, masing-masing, ditentukan sebagai nomor heksadecimal 2-digit. Perhatikan bahwa kanvas selalu putih buram, jadi (Login Login) transparan grafik latar belakang warna campuran ke kanvas putih. default adalah biru muda:
```
        <graphBackgroundColor>0xffccccff</graphBackgroundColor>  
```
Terima kasih kepada John Kerfoot dan Lukas Campbell.
    * Dalam setup.xml, Anda sekarang dapat menentukan ukuran maksimum untuk [Login](/docs/server-admin/additional-information#log)   (ketika berganti nama menjadi log. Meme it Login sebelumnya dan log baru. txt dibuat) MegaBytes Minimal diperbolehkan adalah 1. Maksimum diperbolehkan adalah 2000. default adalah 20 (Login) Sitemap Contoh:
```
        <logMaxSizeMB>20</logMaxSizeMB>
```
    * Sitemap datasets.xml Sitemap&lt;Login (/docs/server-admin/datasets#fgdcfile) Sitemap&lt;iso19File115&gt;] (/docs/server-admin/datasets#iso19115file) sekarang file lokal (Sitemap) URL (yang akan diunduh sehingga terdapat salinan lokal) Sitemap Sitemap ERDDAP™ tidak bisa mengunduh file, pemuatan dataset akan terus tetapi dataset tidak akan memiliki file fgdc atau iso19115.
    *    EDDGrid Dari File dan EDDTable Dari Files dataset sekarang dapat melakukan QuickRestart (sistem yang ERDDAP™ mencoba untuk menggunakan ketika dataset pertama dimuat ketika ERDDAP™ direstart) Sitemap Ini mempercepat restart ERDDAP Sitemap
2016-01-26 Update: Eeek&#33; Ini memiliki bug yang menyebabkan&lt;updateEveryNMillis&gt; untuk mengabaikan pertama kalinya dataset dimuat setelah restart. Bug ini tetap ERDDAP™ v1.68.
    * Peningkatan umum pada sistem QuickRestart memungkinkan ERDDAP™ untuk memuat dataset lebih cepat ketika ERDDAP™ direstart.
    * Sitemap EDDGrid Dari File dan EDDTable Dari Files subclasses sekarang menerima baru&lt;pathRegex&gt; tag, biasanya ditentukan tepat di bawah ini&lt;Sitemap Jika berulang adalah "true", hanya jalur subdirectory penuh yang sesuai dengan pathRegex (default=".\\*") Sitemap Demikian pula,&lt; sourceUrl s&gt; tag dalam sebuah EDDGrid AggregateExistingDimensi sekarang termasuk atribut pathRegex (default=".\\*") Sitemap
    * Login&lt;sebagianRequestMaxBytes&gt; dalam setup.xml sekarang 490000000 (490 g) Sitemap Ini menghindari beberapa masalah / waktu yang berkaitan dengan mendapatkan data dari server data THREDDS. Terima kasih kepada Leslie Thorne.
    * Perubahan kecil pada sistem log harus memungkinkan ERDDAP™ menjadi lebih responsif ketika sangat, sangat sibuk. Informasi sekarang ditulis ke file log di drive disk di chunks yang cukup besar. Keuntungannya adalah bahwa ini sangat efisien -- ERDDAP™ tidak akan pernah memblokir menunggu informasi yang akan ditulis ke file log. Kerugian adalah bahwa log akan hampir selalu berakhir dengan pesan parsial, yang tidak akan selesai sampai chunk berikutnya ditulis.
    * Perbaikan bug yang berkaitan dengan inotify dan [&lt;Login (/docs/server-admin/dataset#updateeverynmillis) sistem untuk EDDGrid Dari File dan EDDTable DariFiles dataset: Tidak perlu lagi untuk menentukan besar fs.inotify.max\\_user\\_watches atau fs.inotify.max\\_user\\_instances. Ada bug di Java yang menyebabkan beberapa bagian Java Sistem inotify/WatchDirectory untuk tidak sampah yang dikumpulkan ketika mereka selesai; akhirnya, jumlah jam tangan atau kasus zombie akan melebihi jumlah maksimum yang ditentukan. ERDDAP™ sekarang bekerja di sekitar ini Java Login
Juga, jumlah benang inotify tercantum pada halaman web status.html, sehingga Anda dapat mengawasi penggunaannya. Biasanya, ada 1 inotify benang per EDDGrid Dari File dan EDDTable DariFiles dataset.
    * Perbaikan bug: di banyak tempat, bukan kesalahan yang dihadapi kembali, kesalahan baru dihasilkan yang hanya menyertakan versi singkat dari pesan kesalahan asli dan tanpa jejak tumpukan. Sekarang, ketika kesalahan baru dihasilkan, itu benar termasuk seluruh e.g terkecuali asli, lempar pengecualian baru ("beberapa pesan baru", e) Sitemap
Terima kasih kepada Susan Perkins.
    * Perbaikan bug: sampai baru-baru ini (v1.64?) Sitemap datasetID URL diminta, ERDDAP™ akan menambahkan .html ke URL. Dalam v1.64, ini gagal (URL format yang salah dihasilkan dan kemudian gagal) Sitemap Sekarang ini bekerja lagi. Terima kasih kepada Chris Fullilove.

## Versi 1.64{#version-164} 
 (dirilis 2015-08-19) 

*    **Fitur Baru (untuk pengguna) Sitemap** 
    * Sekarang ada panduan untuk mengakses pribadi yang dilindungi kata sandi ERDDAP™ Login ( https:// ) Sitemap curl Login Python Sitemap Sitemap [ curl ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#curl) Login [ Python ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#Python) Login
Berkat Walikota Emilio NANOOS dan Paul Janecek dari Spyglass Technologies.
         
*    **Sitemap ERDDAP™ Administrator Perlu Tahu dan Lakukan:** 
    *    ERDDAP™ Sitemap Java 1 Artikel
         Java 1.7 mencapai [akhir kehidupan](https://www.oracle.com/technetwork/java/eol-135779.html)   (tidak ada lagi pembaruan keamanan) di April 2015. Versi ini ERDDAP™ tidak akan bekerja dengan versi Java di bawah 1.8. Jika Anda memperbarui Java Login (Sitemap) Anda juga harus memperbarui Tomcat. Sitemap [ ERDDAP™ Mengatur Instruksi](/docs/server-admin/deploy-install) untuk mengunduh tautan dan saran.
    * Formulir Penyedia Data Baru.
Ketika penyedia data datang ke Anda berharap untuk menambahkan beberapa data ke Anda ERDDAP™ dapat sulit dan memakan waktu untuk mengumpulkan semua metadata yang diperlukan untuk menambahkan dataset ke dalam ERDDAP Sitemap Banyak sumber data (misalnya, file .csv, File Excel, database) tidak memiliki metadata internal, sehingga ERDDAP™ memiliki Formulir Penyedia Data baru yang mengumpulkan metadata dari penyedia data dan memberikan penyedia data beberapa panduan lain, termasuk panduan yang luas untuk Data In Database. Informasi yang diajukan diubah menjadi datasets.xml format dan kemudian diemail ke ERDDAP™ Login (Login) dan tulisan (Sitemap) to bigParentDirectory/logs/dataProviderForm.log . Dengan demikian, bentuk semi-otomatis proses mendapatkan dataset menjadi ERDDAP™ tapi ERDDAP™ administrator masih harus menyelesaikan datasets.xml chunk dan kesepakatan dengan mendapatkan file data (Login) dari penyedia atau menghubungkan ke database. Untuk informasi lebih lanjut, lihat [Database Deskripsi bentuk](/docs/server-admin/datasets#data-provider-form) Sitemap
    * Login&lt;Login
dapat digunakan oleh EDDGrid Login (dan dengan demikian dariNcFiles dan dariMergeIRFiles) Login EDDGrid Sitemap EDDGrid Fotokopi EDDGrid Dataset SideBySide untuk menentukan seberapa tepat nilai sumbu dalam file yang berbeda harus (berapa banyak digit) : 0=tidak memeriksa (jangan gunakan ini&#33;) 1-18 untuk meningkatkan presisi, atau 20 (Login) untuk kualitas yang tepat. Untuk n=1-18, ERDDAP™ memastikan bahwa angka pertama nilai ganda (Sitemap (Sitemap) div 2 untuk nilai float) sama.
        &lt;Sitemap&lt;memastikanAxisValuesAreEqual&gt;, yang sekarang diuraikan. Nilai 'true' akan dikonversi menjadi matchAxisNDigits=20. Nilai 'false' (tidak melakukan ini&#33;) akan dikonversi ke pertandingan Login
    *    EDDGrid Dari File dan EDDTable DariFiles akan memuat sangat lambat kali pertama Anda menggunakan versi ini ERDDAP Sitemap
         ERDDAP™ sekarang menyimpan informasi file internal sedikit berbeda, sehingga tabel file internal untuk setiap set data ini harus dibangun kembali. Jadi jangan khawatir. Tidak ada yang salah. Ini adalah satu kali hal. Meme it
    * Database
         EDDGrid DariNcFiles, EDDTableDariNcFiles, EDDTableDariNcCFFiles sekarang memungkinkan file untuk menjadi file jarak jauh di direktori yang dapat diakses oleh http://   (dan mungkin https:// dan ftp://, tapi mereka tidak teruji) jika server remote mendukung [Sitemap](https://en.wikipedia.org/wiki/Byte_serving) di header permintaan. THREDDS dan Amazon S3 dukungan Rentang Permintaan, Hyrax tidak. Sistem ini memungkinkan Anda untuk mengakses data dalam file jarak jauh tanpa mengunduh file (yang membantu jika file jarak jauh terlalu voluminous) tetapi akses ke file ini akan jauh lebih lambat daripada akses ke file lokal atau bahkan ke remote OPeNDAP Login
Ini termasuk "files" di ember Amazon S3 karena dapat diakses melalui http:// Sitemap Jika nama objek S3 seperti nama file (dengan internal / seperti pohon direktori Linux) Login ERDDAP™ juga dapat membuat file yang dapat diakses melalui ERDDAP Sitemap "files" sistem. Untuk ini untuk bekerja, kredensial S3 Anda harus berada di ~ /.aws/credentials (di Linux, OS X, atau Unix) , atau C:\\Users\\USERNAME\\.aws\\credentials (di Windows) di server dengan ERDDAP Sitemap Sitemap [Amazon SDK](https://docs.aws.amazon.com/sdk-for-java/?id=docs_gateway#aws-sdk-for-java,-version-1) Sitemap
    * Login Xml memiliki opsi baru yang tidak biasa: EDDsFromFiles.
Ini akan melalui sistem file (bahkan sistem jarak jauh seperti Amazon S3 jika objek memiliki nama seperti file) dan menciptakan datasets.xml chunks untuk serangkaian dataset. Mileage Anda dapat bervariasi. Ini bekerja dengan baik jika file diatur sehingga semua file data dalam direktori tertentu (dan subdirectories) cocok untuk satu dataset (e.g., semua komposit 1 hari SST) Sitemap Sitemap (e.g., jika sebuah direktori berisi beberapa file SST dan beberapa file Chlorophyll-a) ini bekerja dengan buruk tetapi mungkin masih berguna.
    * Programmer: file baru / lib .jar.
Sitemap ERDDAP™ , harap perhatikan file .jar baru dalam parameter classpath -cp yang tercantum dalam ERDDAP™   [Panduan Programmer](/docs/contributing/programmer-guide) Sitemap
    * laut\\_water\\_practical\\_salinity
Jika Anda menggunakan nama standar CF laut\\_water\\_salinity untuk variabel apa pun, saya mendorong Anda untuk beralih ke laut\\_water\\_practical\\_salinity yang tersedia dalam [versi 29 dari Tabel Nama Standar CF](https://cfconventions.org/Data/cf-standard-names/29/build/cf-standard-name-table.html)   (dan beberapa versi sebelumnya -- Saya tidak tahu bahwa Meme it) Sitemap Nama ini menunjukkan bahwa ini memang nilai praktis menggunakan Practical Salinity Units   ( PSU ) , bertentangan dengan nilai g / kg yang lebih tua. Unit kanonik berbeda, tetapi masih sangat tidak membantu: 1 Artikel (sangat menyiratkan PSU /PSS-78) , bertentangan dengan 1e-3 (g/kg) untuk laut\\_water\\_salinity. \\[ Login Unidata dan CF: Kami mengidentifikasi nilai-nilai yang menggunakan skala lain, misalnya Fahrenheit atau Celcius, melalui string unit yang merupakan nama skala atau beberapa variasi. Mengapa kita tidak dapat mengidentifikasi unit salinitas melalui skala mereka, misalnya, PSS-78? Saya tahu: nilai PSS-78 adalah "satu", tetapi ada skala yang tidak tersirat, tidak ada? Jika saya menemukan skala salinitas praktis baru di mana nilainya adalah 0,875 kali nilai PSS-78, harus unit kanal masih "1"? Bagaimana pengguna bisa memberitahu mereka terpisah? Unit 1e-3 dan 1 tidak deskriptif atau membantu pengguna yang mencoba untuk mengetahui apa angka yang ditunjukkan. \\] 

## Versi 1.62{#version-162} 
 (dirilis 2015-06-08) 

*    **Fitur Baru (untuk pengguna) Sitemap** 
    * Sitemap EDDGrid set data, pengguna sekarang dapat membuat Jenis Graf: Grafik permukaan dengan kombinasi kapak numerik, tidak hanya longitude versus latitude. Ini memungkinkan Anda membuat x versus y (Sitemap) grafik dan berbagai [Hovmöller Diagram](https://en.wikipedia.org/wiki/Hovm%C3%B6ller_diagram) misalnya, merangkak longitude versus kedalaman, atau waktu versus kedalaman. \\[ Catatan: jika kedalaman berada di Axis Y, mungkin akan dibalik dari apa yang Anda inginkan. Maaf, un-flipping itu belum pilihan. \\] Terima kasih kepada Cara Wilson dan Lynn DeWitt.
    * Sitemap [Oceanic / Amosfir Konverter](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericAcronyms.html) yang memungkinkan Anda mengonversi akronim laut / atmosfir umum ke / dari nama penuh.
    * Sitemap [Oceanic/Amos Konverter Nama Variabel](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericVariableNames.html) yang memungkinkan Anda mengonversikan nama variabel laut / atmosfer umum ke / dari nama penuh.
*    **Sitemap ERDDAP™ Administrator Perlu Tahu dan Lakukan:** 
    *    Java Sitemap
         Oracle tidak lagi mendukung (menyediakan perbaikan bug keamanan untuk)   Java Sitemap ERDDAP™ tetap mendukung Java 7, tapi silahkan pindah ke Java 8. Rilis berikutnya ERDDAP™ mungkin diperlukan Meme it Java Sitemap
    *    valid\\_min Login
Sebelumnya dan sekarang, jika dataVariable Login scale\\_factor Login add\\_offset metadata ERDDAP™ membongkar nilai data dan menghapus metadata. Sitemap ERDDAP™ tidak memodifikasi / membongkar valid\\_range Login valid\\_min Login valid\\_max Login (yang biasanya / harus mengandung nilai dikemas) Sitemap scale\\_factor Login add\\_offset Sitemap Sitemap Cari ERDDAP™ untuk "valid\\_" dan pastikan bahwa semua variabel yang memiliki valid\\_range Login valid\\_min Sitemap valid\\_max memiliki nilai yang benar ketika dataset muncul dalam versi baru dari ERDDAP Sitemap Sitemap [ valid\\_range Login](/docs/server-admin/datasets#valid_range) Sitemap
    * Login
Sitemap ERDDAP™   (Sitemap Login) digunakan/meningkatkan asli (Login) versi [ NetCDF Konvensi Menarik untuk Penemuan Dataset](https://wiki.esipfed.org/ArchivalCopyOfVersion1) yang disebut sebagai " Unidata Dataset Discovery v1.0" dalam Konvensi global dan Metadata\\_Conventions Sitemap Sitemap [Versi ACDD 1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) yang dikukur pada awal 2015 dan disebut sebagai "ACDD-1.3". Untungnya, ACDD-1.3 sangat kompatibel dengan versi 1.0. Kami RECOMMEND bahwa Anda Meme it [beralih ke ACDD-1.3](/docs/server-admin/datasets#switch-to-acdd-13) Sitemap Tidak sulit.
    * Login Login
Ada sejumlah besar perubahan untuk meningkatkan&lt; addAttributes &gt; nilai yang disarankan oleh GenerateDatasets Xml untuk Konvensi global, creator\\_name /email/url, kata kunci, ringkasan, dan atribut judul dan untuk variabel long\\_name Login Beberapa perubahan terkait dengan penggunaan baru ACDD-1.3.
    * Login SOS Login
Dengan penambahan sesekali dari jenis baru SOS server dan perubahan pada server lama, semakin sulit untuk ERDDAP™ untuk secara otomatis mendeteksi jenis server dari respons server. Penggunaan [&lt;Login (/docs/server-admin/dataset#eddtablefromsos-skeleton-xml)   (IOOS\\_NDBC, IOOS\\_NOS, OOSTethys Sitemap) sekarang STRONGLY RECOMMENDED. Jika ada dataset dari jenis ini memiliki masalah dalam versi baru dari ERDDAP GenerateDatasets Xml untuk SOS server untuk menghasilkan chunk baru datasets.xml dataset. Login Xml akan membiarkan Anda mencoba yang berbeda&lt;sosServerType&gt; pilihan sampai Anda menemukan yang tepat untuk server yang diberikan. Jika Anda masih memiliki masalah, silakan beri tahu masalah yang Anda lihat dan URL server dan saya akan mencoba untuk membantu.
    * EDDTableDariNames dataset
Beberapa atribut yang dianjurkan addAttributes Sitemap Anda mungkin tidak perlu mengubah apa pun untuk set data yang ada di Anda datasets.xml Sitemap
    * Perbaikan bug terkait dengan permintaan tertentu untuk dataset EDDTableDariNcCFFiles.
Saya juga menambahkan sejumlah besar tes unit ke sejumlah besar tes unit dari metode yang mendasari (ada 100 skenario) Sitemap Terima kasih kepada Eli Hunter.
    * Perbaikan bug / perubahan kecil untuk EDDGrid Login
Terima kasih kepada Jonathan Lafite dan Philippe Makowski
    * Perbaikan bug: EDDGrid DariErddap sekarang bekerja bahkan jika dataset jarak jauh tidak memiliki ioos\\_category atribut variabel.
Kevin O'Brien
    * Perbaikan bug di halaman web .graph untuk EDDGrid dataset ketika hanya ada satu variabel sumbu dengan lebih dari satu nilai.
Terima kasih kepada Charles Carleton.
    * Ada perbaikan kecil lainnya, perubahan, dan perbaikan bug.

## Versi 1.60{#version-160} 
 (dirilis 2015-03-12) 

*    **Fitur Baru (untuk pengguna) Sitemap** Login
*    **Sitemap ERDDAP™ Administrator Perlu Tahu dan Lakukan:** 
    * STRONGLY RECOMMENDED: Memperbarui server Anda [WordPress.org](/docs/server-admin/additional-information#robotstxt) file untuk menyertakan:
Login WordPress.org
    * Mengintip Masalah dan Solusi:
Di komputer Linux, jika Anda menggunakan&lt;WordPress.org dengan set data dengan tipe= EDDGrid DariFiles, EDDTableDariFiles, EDDGrid Copy, EDDTableCopy, atau subklas mereka, Anda dapat melihat masalah di mana dataset gagal untuk memuat (sesekali atau konsisten) dengan pesan kesalahan: "IOException: Batas pengguna dari inotify instance mencapai atau terlalu banyak file terbuka". Jika demikian, Anda dapat memperbaiki masalah ini dengan memanggil (sebagai akar) Sitemap
gs.inotify.max\\_user\\_watches=65536 | tee -a /etc/sysctl.conf
echo fs.inotify.max\\_user\\_instances=1024 | tee -a /etc/sysctl.conf
Login
Atau, gunakan angka yang lebih tinggi jika masalah berlanjut. Default untuk jam tangan adalah 8192. default untuk instance adalah 128. \\[ UPDATE: Ada bug dalam Java yang menyebabkan inotify instances untuk tidak mengumpulkan sampah. Masalah ini dihindari ERDDAP™ v1.66 dan lebih tinggi. Jadi solusi yang lebih baik adalah beralih ke versi terbaru dari ERDDAP Sitemap \\] 
    * Login Perbaikan bug:
Ada bug yang bisa menyebabkan dataset tipe= EDDGrid DariFiles, EDDTableDariFiles, EDDGrid Copy, EDDTableCopy, atau subklas mereka untuk tidak memuat sesekali dengan kesalahan "NoSuchFileException: _someFileName_". bug terkait dengan penggunaan FileVisitor dan diperkenalkan di ERDDAP™ v1.56. Masalahnya langka dan kemungkinan besar mempengaruhi dataset dengan sejumlah besar file data yang sering berubah.
    * Ada beberapa perbaikan kecil, perubahan, dan perbaikan bug.

## Versi 1.58{#version-158} 
 (dirilis 2015-02-25) 

*    **Fitur Baru (untuk pengguna) Sitemap** 
    * Login [ "files" ](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) sistem memungkinkan Anda menelusuri sistem file virtual dan mengunduh file data sumber dari banyak ERDDAP™ Login Login "files" sistem aktif secara default, tetapi ERDDAP™ administrator dapat menonaktifkannya dengan menempatkan Meme it
```
        <filesActive>false</filesActive>  
```
Sitemap ERDDAP™ setup.xml file. Terima kasih khusus kepada Philippe Makowski, yang bertahan ketika saya lambat untuk menghargai keindahan ide ini.
    * tujuan waktu Login Sebelumnya, variabel waktu dataset EDDTable dengan data real time dekat memiliki tujuanMax of NaN, yang menyiratkan bahwa nilai waktu maksimum untuk dataset baru-baru ini, tetapi tidak tepat diketahui dan berubah sering. Sekarang, tujuanMax memiliki nilai nyata, menunjukkan waktu terakhir yang terkenal saat ini. Banyak dataset telah terus diperbarui data. ERDDAP™ mendukung mengakses data terbaru, bahkan jika setelah waktu terakhir yang terkenal saat ini. Catatan bahwa yang baru [&lt;Login (/docs/server-admin/dataset#updateeverynmillis) dukungan EDDGrid Dari File dan EDDTable DariFiles dataset memperbarui waktu variabel tujuanMax. Kekurangan lain dari perubahan ini adalah bahwa datasetID Sitemap allDatasets dataset sekarang termasuk waktu terakhir yang terkenal di kolom maxTime. Terima kasih kepada John Kerfoot.
*    **Sitemap ERDDAP™ Administrator Perlu Tahu dan Lakukan:** 
    * STRONGLY RECOMMENDED: Memperbarui server Anda [WordPress.org](/docs/server-admin/additional-information#robotstxt) file untuk menyertakan:
Login Login
Login WordPress.org
    * Sitemap datasets.xml Login Tahun lalu, kami merekomendasikan beberapa set data yang sangat baik di jam tangan pantai ERDDAP™ Anda dapat menambahkan ke Anda Meme it ERDDAP™ hanya dengan menambahkan beberapa baris ke Anda Meme it datasets.xml Sitemap Jika Anda menambahkan dataset erdVH, silakan beralih ke dataset erdVH2 yang lebih baru:
        * Membuat salinan semua dataset erdVH dan mengubah data yang disalin datasetID 's dari erdVH ... untuk erdVH2 ... dan mengubah referensi sourceUrl dari erdVH ... untuk erdVH2....
        * Mengatur erdVH ... data set ke aktif="false".
    * Sitemap EDDGrid Dari File dan EDDTable Dari Files subclasses sekarang mendukung [&lt;Login (/docs/server-admin/dataset#accessibleviafiles) untuk membuat file data sumber dapat diakses melalui "files" sistem. Secara default, sistem ini dimatikan untuk setiap dataset. Anda perlu menambahkan tag untuk mengaktifkannya. Terima kasih kepada Philippe Makowski.
    * Sitemap EDDGrid Dari File dan EDDTable Dari Files subclasses sekarang mendukung [&lt;Login (/docs/server-admin/dataset#updateeverynmillis) Sitemap Secara default, sistem ini dimatikan untuk setiap dataset. Anda perlu menambahkan tag untuk mengaktifkannya. Terima kasih kepada Dominika Fuller-Rowell dan NGDC.
    * Login [Login](/docs/server-admin/datasets#eddtablefromfilenames) membuat dataset dari informasi tentang sekelompok file dalam sistem file server, tetapi tidak melayani data dari dalam file. Misalnya, ini berguna untuk mendistribusikan koleksi file gambar, file audio, file video, file proses kata, dan file spreadsheet. Ini bekerja dengan tangan dengan yang baru [ "files" ](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) sistem, sehingga pengguna dapat mengunduh file. Terima kasih khusus kepada Philippe Makowski, yang bertahan ketika saya lambat untuk menghargai keindahan ide ini.
    * Login [ EDDGrid Sitemap](/docs/server-admin/datasets#eddgridfromeddtable) memungkinkan Anda mengonversikan dataset tabular ke dataset gridded. Berkat Ocean Networks Kanada.
    * Login [ EDDGrid Login](/docs/server-admin/datasets#eddgridfrommergeirfiles) agregat data dari kelompok MergeIR lokal .gz Login EDDGrid DariMergeIRFiles memiliki perbedaan menjadi chunk pertama kode berkontribusi untuk ERDDAP Sitemap Hal ini dilakukan sepenuhnya tanpa bantuan kami. Tiga cheers dan terima kasih khusus untuk Jonathan Lafite dan Philippe Makowski of R.Tech Engineering.
    * Ada yang baru, opsional setup.xml tag,&lt;unitTestDataDir&gt;, yang menentukan direktori dengan file data uji unit yang tersedia melalui repositori GitHub baru: [https://github.com/ERDDAP/erddapTest](https://github.com/ERDDAP/erddapTest) Sitemap Contoh:
```
        <unitTestDataDir>/erddapTest/</unitTestDataDir>  
```
Ini tidak berguna namun, tetapi merupakan bagian dari bergerak menuju membuat banyak tes unit yang dapat dijalankan oleh orang lain mungkin. Terima kasih kepada Terry Rankine.
    * Ada banyak perbaikan kecil, perubahan, dan perbaikan bug.

## Versi 1.56{#version-156} 
 (Dipublikasikan 2014-12-16) 

*    **Fitur Baru (untuk pengguna) Sitemap**   (Login) 
*    **Sitemap ERDDAP™ Administrator Perlu Tahu dan Lakukan:** 
    * Anda mungkin sudah tahu tentang Meme it [ EDDGrid Login](/docs/server-admin/datasets#eddfromerddap) Login [Login](/docs/server-admin/datasets#eddfromerddap) yang memungkinkan Anda menghubungkan ke dataset di lain Meme it ERDDAP dan telah mereka muncul di Anda Meme it ERDDAP Sitemap Permintaan pengguna untuk data aktual dari dataset ini mendapatkan rute secara tidak dapat dikunjungi ke sumber ERDDAP™ sehingga data tidak mengalir melalui sistem atau menggunakan bandwidth Anda. Sekarang ada daftar besar dataset yang disarankan dalam sampel datasets.xml Sitemap .zip Sitemap Untuk memasukkan mereka di Anda ERDDAP™ , semua yang harus Anda lakukan adalah menyalin dan menempelkan yang Anda inginkan datasets.xml Sitemap Terima kasih kepada Conor Delaney.
    * Sitemap ERDDAP™ Anda perlu menambahkan beberapa baru. Meme it file jar untuk Anda [phpBB SEO](/docs/contributing/programmer-guide#development-environment) untuk javac dan java.
    * Login [Login](/docs/server-admin/datasets#eddtablefromcassandra) menangani mendapatkan data dari [Login](https://cassandra.apache.org/) Sitemap Berkat Ocean Networks Kanada.
    * Login [Sitemap](/docs/server-admin/datasets#eddtablefromcolumnarasciifiles) menangani mendapatkan data dari file data ASCII dengan kolom tetap lebar. Terima kasih kepada Philippe Makowski.
    * Sitemap EDDGrid Dari File dan EDDTable Dari Files subclasses sekarang menggunakan metode baru, FileVisitor (Sitemap Java di 1,7) untuk mengumpulkan informasi tentang file. Ini mungkin tidak memiliki manfaat untuk pertemuan pertama informasi file untuk dataset tertentu tetapi tampaknya memiliki manfaat besar untuk pertemuan berikutnya jika dilakukan segera, sementara OS masih memiliki informasi yang tersimpan. Berkat NGDC.
        
Kami masih merekomendasikan: Jika dataset memiliki sejumlah besar file (g., &gt; 1,000) , sistem operasi (dan EDDGrid DariFiles dan EDDTableDariFiles) akan beroperasi lebih efisien jika Anda menyimpan file dalam serangkaian subdirectories (satu per tahun, atau satu per bulan untuk dataset dengan file yang sangat sering) , sehingga tidak pernah ada sejumlah besar file dalam direktori tertentu.
        
    * Beberapa perbaikan kecil untuk EDDTableDariAsciiFiles.
    * Beberapa perbaikan untuk EDDTableDariAsciiServiceNOS, tidak dapat mendapatkan beberapa kolom tambahan informasi dari sumber. Terima kasih kepada Lynn DeWitt.
    * Beberapa perbaikan bug kecil yang berkaitan dengan ISO 19115 yang ERDDAP™ Sitemap Terima kasih kepada Anna Milan.

## Versi 1.54{#version-154} 
 (dirilis 2014-10-24) 

*    **Fitur Baru (untuk pengguna) Sitemap** 
    * Beberapa variabel sekarang bekerja dengan waktu pada ketepatan mili detik, misalnya, 2014-10-24T16:41:22.485Z. Terima kasih kepada Dominika Fuller-Rowell.
*    **Perubahan kecil / Perbaikan Bug:** 
    * Perbaikan bug: dengan kombinasi keadaan tertentu, EDDGrid DariNFile dataset kembali data pada pengurangan presisi (e.g., mengapung bukan ganda) Sitemap Ini hanya dapat mempengaruhi nilai data dengan &gt; 8 angka signifikan. apologi saya. (Dan itu adalah bug pemrograman komputer klasik: satu karakter yang salah.) Terima kasih kepada Dominika Fuller-Rowell.
    * Banyak perubahan kecil.
*    **Sitemap ERDDAP™ Administrator Perlu Tahu dan Lakukan:** 
    * Dataset griddap sekarang mendukung variabel sumbu kalitamp dan variabel data (i.e., variabel dengan nilai waktu, tetapi destinationName Sitemap "time" ) Sitemap Terima kasih kepada Dominika Fuller-Rowell.
    *    ERDDAP™ sekarang benar mendukung mili detik time\\_precision "1970-01-01T00:00:00.000Z". Satu kuis niat: ketika menulis kali ke file berorientasi manusia (Sitemap .tsv Login .json Login .xhtml ) Login ERDDAP™ menggunakan yang ditentukan time\\_precision jika termasuk detik dan / atau detik desimal; jika tidak, menggunakan detik time\\_precision "1970-01-01T00:00:00Z" (untuk konsistensi dan mundur kompatibilitas) Sitemap Terima kasih kepada Dominika Fuller-Rowell.
    *    EDDGrid DariNcFiles sekarang mendukung membaca String dataVariable Sitemap
    *    .nc file yang ditulis oleh griddap sekarang dapat memiliki String dataVariable Sitemap
    * Login Xml sekarang termasuk lebih banyak flush () panggilan untuk menghindari masalah informasi tidak ditulis ke file. Terima kasih kepada Thierry Valero.
    * Dokumentasi untuk GenerateDatasetsXml ditingkatkan, tidak dapat menunjukkan bahwa switch -i hanya bekerja jika Anda menentukan semua jawaban pada baris perintah (e.g., modus script) Sitemap Dan mode skrip dijelaskan. Terima kasih kepada Thierry Valero.
    *    ERDDAP™ tidak lagi memungkinkan dua variabel dalam dataset untuk memiliki sama sourceName Sitemap (Jika seseorang melakukannya sebelum, mungkin menyebabkan pesan kesalahan.) Seperti sebelumnya, ERDDAP™ tidak memungkinkan dua variabel dalam dataset untuk memiliki sama destinationName Sitemap

## Versi 1.52{#version-152} 
 (dirilis 2014-10-03) 

*    **Fitur Baru:**   (Login) 
*    **Perubahan kecil / Perbaikan Bug:** 
    * Sitemap (Login) perubahan untuk membuat ERDDAP™ Sitemap
    * Peningkatan ISO 19115 file yang dihasilkan oleh ERDDAP Sitemap&lt;gmd:protocol & gt; nilai (informasi, pencarian, OPeNDAP Sitemap OPeNDAP Login ERDDAP Login ERDDAP Sitemap tabledap ) Sitemap&lt;gmd:CI\\_OnlineResource&gt;. Berkat Derrick Snowden dan John Maurer.
    * Banyak perubahan kecil.
*    **Sitemap ERDDAP™ Administrator Perlu Tahu dan Lakukan:** 
    * Perbaikan bug: GenerateDatasetsXml.sh dan DasDds.sh tidak dalam erddap.war untuk 1.48 dan 1.50. Sitemap Terima kasih kepada Thierry Valero.
    * Perubahan kecil untuk beberapa tes kecepatan di TestAll untuk membuat mereka kurang rentan untuk kesempatan. Terima kasih kepada Terry Rankine.

## Versi 1.50{#version-150} 
 (dirilis 2014-09-06) 

*    **Fitur Baru:**   (Login) 
*    **Perubahan kecil / Perbaikan Bug:** 
    * Sitemap ERDDAP™ harus jauh lebih cepat daripada versi terbaru. Meme it
*    **Sitemap ERDDAP™ Administrator Perlu Tahu dan Lakukan:**   (Sitemap) 

## Versi 1.48{#version-148} 
 (dirilis 2014-09-04) 

*    **Fitur Baru:** 
    *    ERDDAP™ sekarang selalu membuat dataset tabular, datasetID Sitemap allDatasets yang memiliki tabel informasi tentang semua dataset dalam hal ini ERDDAP Sitemap Bisa dikuasai seperti dataset tabular lainnya. Ini adalah alternatif yang berguna untuk sistem saat ini untuk mendapatkan informasi tentang program dataset.
    * Ada dua jenis file output baru untuk EDDTable dan EDDGrid .csv0 dan .tsv Sitemap Mereka adalah comma- dan tab-separated-value file yang tidak memiliki garis dengan nama kolom atau unit. Data dimulai pada baris pertama. Mereka sangat berguna untuk skrip yang hanya ingin satu bagian informasi dari ERDDAP Sitemap
*    **Perubahan kecil / Perbaikan Bug:** 
    * Peta sekarang dapat dibuat untuk longitudes dalam kisaran -720 ke 720.
    * Login .nc Jenis File respons galat tersedia untuk semua EDDGrid Login Ini mengembalikan [Login](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/ncml_overview.html) \\-format deskripsi dataset (mirip dengan gabungan .dds + .das) Sitemap
    * Perbaikan bug: Menyimpan data tabular ke .nc file terbatas pada nilai 100.000 per variabel. Sekarang hanya terbatas pada ukuran file total 2 GB. Kevin O'Brien
    * Perbaikan bug: saveAs Matlab metode sekarang memastikan bahwa datasetID s dikonversi ke aman Matlab nama variabel. Tapi saya masih sangat merekomendasikan bahwa Anda membuat Meme it datasetID s yang nama variabel yang valid: dimulai dengan surat dan kemudian hanya menggunakan A-Z, a-z, 0-9, dan \\_. Sitemap [ datasetID ](/docs/server-admin/datasets#datasetid) Sitemap Lukas Campbell.
    * Perbaikan bug di EDDTableDariDatabase: Dengan beberapa jenis database, NO\\_ respon data dari database yang dipimpin ke penundaan 30 detik tanpa titik ERDDAP Sitemap Salam Williams
    * Perbaikan bug: EDDGrid Membuat Grafik dengan Jenis Graf = garis (atau penanda atau penanda dan garis) variabel sumbu x dipaksa untuk menjadi waktu. Sekarang bisa menjadi sumbu. Terima kasih kepada Lynn DeWitt.
*    **Sitemap ERDDAP™ Administrator Perlu Tahu dan Lakukan:** 
    * STRONGLY RECOMMENDED: Update Java   
Versi ini ERDDAP™ Login Java 7 atau lebih tinggi, tetapi Java 7 akan mencapai akhir-of-life di April 2015 (Sitemap) , jadi sekarang adalah waktu yang baik untuk beralih ke Java 8. Jadi Java 8 adalah RECOMMENDED STRONGLY. Sitemap Java 8. Perhatikan bahwa Java 6 mencapai akhir-of-life pada Februari 2013 (tidak ada lagi perbaikan bug keamanan&#33;) Sitemap
    * STRONGLY RECOMMENDED: Memperbarui Tomcat
Jika Anda menggunakan Tomcat, silakan beralih ke versi terbaru Tomcat. Tomcat 8 dirancang untuk bekerja dengan Java Sitemap
    * Sitemap ERDDAP " tidak lagi akronim. Meme it Sekarang hanya nama. Saya tidak ingin nama untuk menyoroti ERD Sitemap Login ERDDAP™ untuk menyoroti institusi Anda dan data Anda.
    * Login [menyesuaikan penampilan Anda ERDDAP™ instalasi untuk menyoroti institusi Anda dan data Anda](/docs/server-admin/deploy-install#customize) Sitemap Dengan pekerjaan jam, Anda dapat membuat perbaikan yang bagus yang akan bertahan selamanya.
    * Di setup.xml,&lt;displayDiagnosticInfo&gt; pilihan sekarang selalu diabaikan dan diperlakukan seolah-olah nilainya palsu.
RECOMMENDED: Hapus&lt;displayDiagnosticInfo&gt; tag dan info terkait dari setup Anda.xml.
    * Dalam setup.xml, default untuk&lt; drawLandMask &gt; "lebih", tetapi sekarang "di bawah", yang merupakan standar umum yang lebih baik (bekerja dengan baik dengan semua dataset) Sitemap
    * GenerateDatasetsXml.sh dan DadDds.sh Linux scripts sekarang menggunakan bash bukan csh, dan memiliki ekstensi .sh. Terima kasih kepada Emilio Mayorga
    * Login Xml dan DasDds sekarang membuat file log mereka sendiri (WordPress.org) dan file output (GenerateDatasetXml.out dan DadDds.out) di _bigParentDirectory_/logs/, dan tidak pernah menempatkan hasil mereka di clipboard.
    * Login Xml sekarang mendukung parameter baris perintah -i yang memasukkan output ke file yang ditentukan di tempat yang ditentukan. Sitemap [Sitemap](/docs/server-admin/datasets#generatedatasetsxml) Sitemap Terima kasih kepada Terry Rankine.
    * EDDTableDariDatabase sekarang mendukung&lt;Sitemap&lt;/columnNameQuotes&gt;, dengan nilai yang valid " (Login) , ', atau tidak ada. Karakter (Sitemap) akan digunakan sebelum dan sesudah nama kolom di pertanyaan SQL. Berbagai jenis database, mengatur dengan cara yang berbeda, akan membutuhkan tanda kutip nama kolom yang berbeda.
    * Tabular latitude dan variabel longitude sekarang dapat disesuaikan long\\_name 's, e.g., Profil depo. Sebelumnya, mereka hanya bisa menjadi Depo dan Longitude.
    * Mulai sekarang, tentukan "defaultDataQuery" dan "defaultGraphQuery" sebagai atribut dalam metadata global dataset (yaitu,&lt;addAtts&gt;), tidak terpisah&lt;Login&lt;defaultGraphQuery&gt; tag. (Meskipun, jika Anda masih menentukannya melalui tag, ERDDAP™ akan secara otomatis menciptakan atribut global dengan informasi.) 

## Versi 1.46{#version-146} 
 (Dikirim 2013-07-09) 

*    **Fitur Baru:** 
    *    (Login) 
*    **Perubahan kecil / Perbaikan Bug:** 
    * Perbaikan bug: Di EDDTableDariDatabase, dalam versi 1.44 hanya, ERDDAP™ tidak benar-benar mengutip nama tabel database dalam pernyataan SQL. Sekarang tetap. Kevin O'Brien
*    **Sitemap ERDDAP™ Administrator Perlu Tahu dan Lakukan:** 
    *    ** Jika Anda tidak memodifikasi pesan standar dalam pesan.xml,
Login \\[ Login \\] WordPress.org **   
File default.xml sekarang ada di erddap. file perang, tidak erddapContent .zip Sitemap Jadi, Anda tidak perlu lagi untuk memperbarui pesan secara manual.xml .
    * Jika Anda mengubah pesan dalam pesan.xml, dari saat ini, setiap kali Anda memperbarui ERDDAP™ Sitemap
        * Membuat perubahan yang sama yang Anda buat sebelum baru
             \\[ Login \\] /webapps/erddap/WEB-INF/classes/gov/noa/pfel/erddap/util/messages.xml.
Dan satu kali ini: menghapus \\[ Login \\] WordPress.org
        * Atau, cari tahu apa yang telah berubah dalam pesan baru.xml (Sitemap) dan memodifikasi Anda
             \\[ Login \\] /content/erddap/messages.xml file sesuai.

## Versi 1.44{#version-144} 
 (dirilis 2013-05-30) 

*    **Fitur Baru:** 
    * Kueri ke dataset EDDTable sekarang mendukung & orderBy Login (Login) Sitemap orderByMinMax  (Login)   (yang mengembalikan dua baris di setiap kelompok, dengan minimum dan maksimum terakhir orderBy Login) Sitemap Terima kasih kepada Lynn DeWitt.
    * Ada dua baru tabledap jenis file: .nc Login .nc Login (yang mengembalikan header mirip ncdump sesuai .nc Login .nc Jenis file CFMA) Sitemap Steve Hankin
*    **Perubahan kecil / Perbaikan Bug:** 
    * Perbaikan bug: memuat halaman web .graph dan .html untuk dataset dengan banyak nilai waktu lambat karena ERDDAP™ lambat ketika menghasilkan opsi slider waktu. Sekarang selalu cepat. Terima kasih kepada Michael Barry, OOICI, dan Kristian Sebastian Blalid.
    * Perbaikan bug: Dalam beberapa jenis dataset EDDTable, batasan waktu tidak selalu ditangani dengan benar. Sitemap Terima kasih kepada John Maurer dan Kevin O'Brien.
    * Perbaikan bug: dataset tidak akan dimuat ketika semua subsetVariables adalah variabel nilai tetap. Sekarang mereka akan. Terima kasih kepada Lynn DeWitt dan John Peterson.
    * IMPROVED: sekarang, semua pertanyaan hanya variabel subset bertindak seolah-olah &distinct () adalah bagian dari query.
    * IMPROVED: sekarang, untuk pertanyaan yang mencakup & .json p=_functionName_, _fungsi Name_ MUST sekarang menjadi serangkaian 1 atau lebih (Sitemap) kata. Setiap kata harus dimulai dengan surat ISO 8859 atau "\\_" dan diikuti oleh 0 atau lebih ISO 8859 huruf, digit, atau "\\_". Ya, ini lebih membatasi daripada Meme it Java Persyaratan script untuk nama fungsi.
    * Sumbu waktu pada grafik sekarang bekerja dengan baik untuk rentang waktu yang lebih lama (80 - 10000 tahun) dan rentang waktu yang lebih pendek (0.003 - 180 detik) Sitemap
    *    ERDDAP™ sekarang lebih banyak membuktikan ketika melakukan variasi data waktu ISO-8601-format.
    * Ada banyak perubahan kecil dan perbaikan bug lainnya.
*    **Sitemap ERDDAP™ Administrator Perlu Tahu dan Lakukan:** 
    *    **Anda MUST memperbarui ke versi terbaru untuk aman.**   
         ERDDAP™ Memahami audit keamanan. Ada beberapa bug dan kelemahan. Versi 1.44 termasuk beberapa perbaikan bug keamanan penting dan beberapa perubahan untuk meningkatkan keamanan dan aksesibilitas (e.g., untuk pengguna yang terganggu penglihatan) Sitemap Versi 1.44 telah lulus audit keamanan tindak lanjut. Berkat semua orang yang baik di USGS dan Acunetix yang memungkinkan ini. (Sitemap NOAA melakukan ini?) 
    * Login [Login WFS Login](/docs/server-admin/datasets#eddtablefromwfsfiles) membuat salinan lokal dari semua data dari ArcGIS Login WFS server dan data kemudian dapat diakses kembali dengan cepat ERDDAP™ pengguna. Berkat Christy Caudill.
    * Login [Login EDDGrid ](/docs/server-admin/datasets#eddtablefromeddgrid) memungkinkan Anda membuat dataset EDDTable dari EDDGrid Login Beberapa alasan umum untuk melakukan ini adalah:
        * Ini memungkinkan dataset untuk ditanyakan dengan Meme it OPeNDAP kontratraints pemilihan (mana pengguna mungkin diminta Meme it) Sitemap
        * Dataset melekat pada dataset tabular. Berkat OOICI, Jim Potemra, Roy Mendelssohn.
    * Nama variabel "depth" sekarang merupakan alternatif khusus untuk "altitude". Unit harus beberapa varian "meter". Nilai data harus positif = mundur. ERDDAP™ sekarang sepenuhnya menyadari makna "depth" dan mendukungnya di mana pun ketinggian didukung (e.g., sebagai komponen CDm CF DSG\\_data\\_type=profile dataset) Sitemap Dataset tidak harus memiliki variabel "depth" dan "altitude".
    * Sitemap datasets.xml Untuk menghapus penggunaan apa pun&lt;Nama att="cdm\\_altitude\\_proxy"&gt;depth&lt;/att&gt; sejak kedalaman sekarang merupakan alternatif khusus untuk ketinggian dan tidak perlu diidentifikasi secara khusus.
    * Sitemap datasets.xml Untuk menghapus penggunaan apa pun&lt;altitudeMetersPerSourceUnit&gt;, kecuali untuk EDDTable Sitemap SOS Sitemap
Ketika nilainya adalah 1, cukup hapus. Meme it
Ketika nilai -1, pertimbangkan mengubah nama variabel menjadi kedalaman.
Untuk nilai lain, tambahkan&lt; addAttributes &gt;, misalnya,:
```
        <att name="scale\\_factor" type="float">-1</att>
```

    * Semua dataset sekarang mendukung
        
        *   &lt;defaultDataQuery&gt; yang digunakan jika .html diminta tanpa pertanyaan.
            * Anda mungkin jarang perlu menggunakan ini. Meme it
            * Untuk dataset griddap, penggunaan umum ini adalah untuk menentukan nilai dimensi kedalaman atau ketinggian yang berbeda (Login \\[ Sitemap \\] Sitemap \\[ Sitemap \\] ) Sitemap
Dalam hal apapun, Anda harus selalu mencantumkan semua variabel, selalu menggunakan nilai dimensi yang sama untuk semua variabel, dan hampir selalu menggunakan \\[ Sitemap \\] Login \\[ Sitemap \\] Sitemap \\[ 0: terakhir \\] untuk nilai dimensi.
Contoh:
```
                <defaultDataQuery>u\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\],v\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]</defaultDataQuery>
```

            * Sitemap tabledap dataset, penggunaan yang paling umum dari ini adalah untuk menentukan rentang waktu default yang berbeda (relatif sekarang, misalnya, & waktu & gt;= now- Sitemap) Sitemap
Ingat bahwa meminta tidak ada variabel data sama dengan menentukan semua variabel data, jadi biasanya Anda hanya dapat menentukan batasan waktu baru.
Contoh:
```
                <defaultDataQuery>&amp;time&gt;=now-1day</defaultDataQuery>
```

        *   &lt;defaultGraphQuery&gt; yang digunakan jika .graph diminta tanpa pertanyaan.
            * Anda mungkin jarang perlu menggunakan ini. Meme it
            * Untuk dataset griddap, penggunaan yang paling umum dari ini adalah untuk menentukan nilai dimensi kedalaman atau ketinggian yang berbeda (Login \\[ Sitemap \\] Sitemap \\[ Sitemap \\] ) dan/atau untuk menentukan bahwa variabel tertentu di graphed.
Dalam kasus apapun, Anda akan hampir selalu menggunakan \\[ Sitemap \\] Login \\[ Sitemap \\] Sitemap \\[ 0: terakhir \\] untuk nilai dimensi.
Contoh:
```
                <defaultGraphQuery>temp\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]&amp;.draw=surface&amp;.vars=longitude|latitude|temp</defaultGraphQuery>
```

            * Sitemap tabledap dataset, penggunaan yang paling umum dari ini adalah untuk menentukan variabel yang berbeda untuk digraf, rentang waktu default yang berbeda (relatif sekarang, misalnya, & waktu & gt;= now- Sitemap) dan / atau pengaturan grafis default yang berbeda (e.g., tipe penanda) Sitemap
Contoh:
```
                <defaultGraphQuery>longitude,latitude,seaTemperature&amp;time&gt;=now-1day&amp;.marker=1|5</defaultGraphQuery>
```

Ingat bahwa Anda perlu untuk XML-encode atau persen-encode (baik satu, tapi tidak baik Meme it) Pertanyaan default karena mereka dalam dokumen XML. Misalnya, & menjadi &amp; sampel;,&lt;menjadi &amp;lt;, dan &gt; menjadi &amp; gt; .
Dan silakan periksa pekerjaan Anda. Sangat mudah untuk membuat kesalahan dan tidak mendapatkan apa yang Anda inginkan.
Berkat Charles Carleton, Kevin O'Brien, Lukas Campbell, dan lain-lain.
    *    EDDGrid Login EDDGrid DariErddap, dan EDDTableDari EDDGrid memiliki sistem baru untuk menangani dataset yang sering berubah (sering kira-kira setiap 0,5 s) Sitemap Sitemap ERDDAP 'Sistem reguler, proaktif untuk sepenuhnya mengisi ulang setiap dataset, sistem tambahan opsional ini reaktif (dipicu oleh permintaan pengguna) dan inkremental (memperbarui informasi yang perlu diperbarui) Sitemap Misalnya, jika permintaan EDDGrid DariDap dataset terjadi lebih dari jumlah mili detik yang ditentukan sejak pembaruan terakhir, ERDDAP™ akan melihat apakah ada nilai baru untuk kiri (Sitemap "time" ) dimensi dan, jika demikian, cukup unduh nilai baru sebelum menangani permintaan pengguna. Sistem ini sangat baik dalam menjaga dataset up-to-date dengan tuntutan minimal pada sumber data, tetapi dengan biaya sedikit memperlambat pemrosesan beberapa permintaan pengguna. Sitemap&lt;Login (/docs/server-admin/dataset#updateeverynmillis)   
Terima kasih kepada Michael Barry dan OOICI.
    *    EDDGrid DariNcFiles, EDDTableDariNcFiles, dan EDDTableDariNcCFFiles sekarang mendukung [Login .nc Login](/docs/server-admin/datasets#ncml-files) file sumber di tempat .nc Login Terima kasih kepada Jose B Rodriguez Rueda.
    * Sitemap EDDGrid Sitemap ERDDAP™ mendukung opsi serverType="dodsindex" baru untuk atribut serverType dari&lt; sourceUrl s&gt; tag. Ini bekerja dengan halaman web yang memiliki daftar file dalam&lt;Sitemap&lt;/pre&gt; dan sering di bawah OPeNDAP logo. Contohnya [https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html](https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html) Sitemap
    * Sitemap SOS sekarang mendukung tag opsional
```  
        <sosServerType>_serverType_</sosServerType>  
```
sehingga Anda dapat menentukan jenis SOS Login (Sitemap ERDDAP™ tidak perlu mencarinya Meme it) Sitemap Nilai valid&lt;_serverType_\\&gt; adalah IOOS\\_NDBC, IOOS\\_NOS, OOSTethys Sitemap (server baru didukung Login) Sitemap Sitemap [Login SOS ](/docs/server-admin/datasets#eddtablefromsos) Sitemap Derrick Snowden dan Janet Fredericks.
    * Sitemap EDDGrid Dari...Files, EDDTableDari...Files, EDDGrid Fotokopi, dan EDDTable Copy sekarang mendukung tag opsional
```
        <fileTableInMemory>true</fileTableInMemory> (The default is false.)  
```
yang dapat memberitahukan ERDDAP™ menyimpan file Login (dengan informasi tentang setiap file data sumber) dalam memori bukan hanya pada disk (Login) Sitemap Menyimpan fileTable dalam kecepatan memori atas permintaan untuk data (terutama jika ada &gt; 1000 file data sumber) tetapi menggunakan lebih banyak memori. Jika Anda mengatur ini untuk benar untuk setiap dataset, simpan mata di Memori: saat ini menggunakan garis di _yourDomain_ /erddap/status.html untuk memastikan bahwa ERDDAP™ masih memiliki banyak memori gratis. Fredrik Stray
    * EDDTableDariASCIIFiles sekarang mendukung&lt;Login Dua charset paling umum (kasus sensitif&#33;) ISO-8859-1 Datasheet (Login) dan UTF-8.
    * Direkomendasikan: dalam setup.xml, dalam&lt;Login&lt;Login Login
        &lt;html lang="en-US"&gt; (atau berbeda [kode bahasa](https://www.w3schools.com/tags/ref_language_codes.asp) jika Anda telah diterjemahkan pesan.xml) Sitemap
    * setup.xml memiliki tag opsional baru untuk bagian menonaktifkan ERDDAP Sitemap
        *   &lt;konverterActive&gt;false&lt;Login&lt;&#33;-- default benar --&gt;
        *   &lt;slideSorterActive&gt;false&lt;Login&lt;&#33;-- default benar --&gt;
        *   &lt;Login&lt;Login&lt;&#33;-- default benar --&gt; Secara umum, kami merekomendasikan untuk mengatur salah satu dari ini untuk palsu.
    * Login Xml sekarang menulis hasilnya ke _bigParentDirectory_/logs/generateDatasetsXmlLog.txt, tidak log.txt. Terima kasih kepada Kristian Sebastian Blalid.
    * Login Xml sekarang membuat saran yang baik untuk&lt;Login Login Sitemap NOAA Proyek UAF.
    * Banyak perbaikan kecil untuk GenerateDatasetsXml. Sitemap NOAA Proyek UAF.

## Versi 1.42{#version-142} 
 (dirilis 2012-11-26) 

*    **Fitur Baru:** 
    *    (Tidak ada fitur baru utama.) 
*    **Sitemap ERDDAP™ Administrator Perlu Tahu dan Lakukan:** 
    * Apabila Anda mengupgrade dari ERDDAP™ 1.38 atau 1.40, tidak ada perubahan yang mengharuskan Anda untuk membuat perubahan pada file konfigurasi Anda (tapi Anda harus menggunakan pesan baru.xml file) Sitemap
    *    ERDDAP™ sekali lagi bisa berjalan dengan Java 1.6. ( ERDDAP™ v1.40 diperlukan Java 1 Artikel) Kami masih sangat merekomendasikan menggunakan versi terbaru dari Java 1 Artikel
    * Jenis dataset baru, [Login Login](/docs/server-admin/datasets#eddtablefromawsxmlfiles) , dapat membaca data dari satu set Stasiun Cuaca Otomatis (Login) XML API Terima kasih kepada Lynn Dewitt dan Exploratorium.
*    **Perubahan kecil / Perbaikan Bug:** 
    * Menyesuaikan perubahan NDBC SOS server data sumber.
    * Menyesuaikan perubahan layanan NOS COOPS ASCII.
    * Dibuat beberapa perubahan kecil dan perbaikan bug.

## Versi 1.40{#version-140} 
 (dirilis 2012-10-25) 

*    **Fitur Baru:** 
    * Ada format file output baru untuk tabledap Sitemap .nc CFMA, yang menyimpan data yang diminta dalam .nc file yang sesuai dengan CF [Sitemap](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Pilihan Array Multidimensional, dan yang oleh karena itu sesuai dengan templat NODC \\[ 2020: sekarang [Template NCEI](https://www.ncei.noaa.gov/netcdf-templates)  \\] untuk menyimpan data jenis ini. Berkat NODC.
    *    tabledap permintaan sekarang dapat mencakup batasan waktu seperti & waktu&gt; now- Sitemap Sitemap [Sitemap](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now) Sitemap Terima kasih kepada James Gosling.
*    **Sitemap ERDDAP™ Administrator Perlu Tahu dan Lakukan:** 
    * Apabila Anda mengupgrade dari ERDDAP™ 1.38, tidak ada perubahan yang mengharuskan Anda untuk membuat perubahan pada file konfigurasi Anda (tapi Anda harus menggunakan pesan baru.xml file) Sitemap
    *    ERDDAP™ rilis publik dan tonggak internal tersedia melalui [ ERDDAP™ di GitHub](https://github.com/ERDDAP) Sitemap Untuk informasi lebih lanjut, lihat [Login](https://github.com/ERDDAP/erddap/wiki) Sitemap ERDDAP™ proyek serta lebih umum [ ERDDAP™ Panduan Programmer](/docs/contributing/programmer-guide) Sitemap (Ini diumumkan secara terpisah beberapa minggu setelah ERDDAP™ 1.38 rilis.) 
    * Login Xml telah ditingkatkan.
        * Script direvisi sehingga harus bekerja dengan benar di semua komputer Linux (tidak hanya beberapa) Sitemap
        * Sekarang tambahkan creator\\_name Login creator\\_email Sitemap creator\\_url kapan saja.
        * Banyak perbaikan kecil lainnya.
    * Mencermin bagaimana ERDDAP™ penawaran dengan waktu.
        * Sitemap ERDDAP™ sekarang menangani waktu pada ketepatan mili detik (Sitemap) Sitemap
        * Sekarang Anda dapat menentukan presisi waktu untuk dataset tertentu, lihat [ time\\_precision ](/docs/server-admin/datasets#time_precision) Sitemap Misalnya, Anda mungkin mengatur dataset untuk menampilkan nilai waktu dengan presisi tanggal (g., 1970-01-01) Sitemap
        * Dataset Anda saat ini akan menggunakan pengaturan default, sehingga mereka tidak terpengaruh oleh perubahan ini dan akan terus menampilkan waktu dengan presisi detik. Terima kasih kepada Servet Cizmeli dan Philip Goldstein.
    *    [Sitemap](/docs/server-admin/datasets#eddtablefromnccffiles) adalah jenis dataset baru yang dapat Anda gunakan di Anda datasets.xml Login Ini dapat membaca data dari berbagai format file yang didefinisikan oleh [Login Sitemap](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) konvensi. Berkat NODC dan terima kasih khusus untuk Kyle Wilcox untuk membuat file sampel untuk sejumlah besar format file DSG yang valid dan untuk membuat mereka tersedia secara publik.
*    **Perubahan kecil / Perbaikan Bug:** 
    * Diperlukan [Login](#quick-restart) sistem untuk semua relevan EDDGrid dan kelas EDDTable.
    * Dokumentasi yang ditingkatkan, terutama terkait dengan cara menggunakan [Login](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType) Login [ tabledap ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#fileType) dari berbagai perangkat lunak klien.
    * Mengubah pencarian lanjutan untuk mendukung minTime dan/atau maxTime dinyatakan sebagai epochSeconds. Terima kasih kepada Lynn Dewitt.
    * Login .htmlTable output untuk menampilkan url dan alamat email sebagai tautan.
    * Ditambahkan "rel=" dan "rev=" untuk relevan&lt;a href&gt; tag. Terima kasih kepada Pat Cappelaere dari OGC   REST Sitemap
    * Peningkatan perlindungan terhadap permintaan data besar yang tidak realistis, terutama dalam tabledap , di mana itu adalah masalah yang lebih sulit.
    * Menyiapkan lebih banyak pesan ke pesan.xml.
    * Peningkatan kecepatan yang dibuat.
    * Login EDDGrid DariFiles untuk memungkinkan turunan berurutan. Maricel Etchegaray
    * Dihapus referensi ke iGoogle karena akan dihentikan.
    * Dibuat beberapa perubahan kecil dan perbaikan bug.

## Versi 1.38{#version-138} 
 (dirilis 2012-04-21) 

*    **Fitur Baru:** 
    * ISO 19115 dan FGDC -- ERDDAP™ dapat secara otomatis menghasilkan file metadata ISO 19115 dan FGDC XML untuk setiap dataset. Tautan ke file terlihat pada setiap daftar dataset (e.g., dari Pencarian Teks Penuh) dan juga di Web folder yang dapat diakses (Login)   (Login [FGDC WAF](https://coastwatch.pfeg.noaa.gov/erddap/metadata/fgdc/xml/) Login [ISO 19115 WAF](https://coastwatch.pfeg.noaa.gov/erddap/metadata/iso19115/xml/) ) Sitemap Terima kasih kepada Ted Habermann, Dave Neufeld, dan banyak lainnya.
    * Pencarian Teks Penuh untuk Dataset sekarang mendukung \\-_ excludedWord _ dan \\- "_ tidak termasuk frasa_" . Terima kasih kepada Rich Signell.
    * Cari dataset sekarang kembali menghasilkan halaman pada waktu. Default menggunakan string parameter: halaman=1&itemsPerPage=1000, tetapi Anda dapat mengubah nilai dalam URL permintaan Anda. Terima kasih kepada Steve Hankin dan proyek UAF.
    *    OpenSearch Login ERDDAP™ sekarang mendukung [ OpenSearch Login](https://coastwatch.pfeg.noaa.gov/erddap/opensearch1.1/index.html) standar untuk mencari dataset. Di antara lain, ini memungkinkan situs-situs agregasi katalog untuk melakukan pencarian terdistribusi (melewati permintaan pencarian untuk setiap katalog yang tahu tentang Meme it) Sitemap
    * Comma Terpisah Login (Login) Login ERDDAP™ sekarang menghasilkan file CSV dengan hanya koma antara nilai (mana Excel lebih suka) , bukan komma + ruang. Terima kasih kepada Jeff deLaBeaujardiere.
    * Dataset -- Beberapa perubahan dilakukan untuk mendukung ERDDAP memiliki sejumlah besar dataset, mungkin bahkan satu juta. Terima kasih kepada Steve Hankin dan proyek UAF.
*    **Sitemap ERDDAP™ Administrator Perlu Tahu dan Lakukan:** 
#### Restart cepat{#quick-restart} 
*    [Login](#quick-restart) sistem restart cepat memungkinkan ERDDAP™ untuk restart jauh lebih cepat.
     **Silahkan tambahkan ini ke file setup.xml Anda** Sitemap&lt;Login
```
              <!-- If true, when you start up ERDDAP™, some types of datasets (e.g., 
              EDDGridFromDap) will used cached information (.dds, .das, etc.) to reload
              very quickly, without contacting the remote server.  The dataset's age 
              will be based on when the dataset was reloaded last.  Normally this 
              should be true (the default), but set it to false if you want to bypass 
              the cached information.
              <quickRestart>true</quickRestart>
```

    * Pencarian teks penuh untuk set data sekarang dapat dilakukan dengan mesin pencari Lucene (meskipun kami merekomendasikan mesin pencari asli jika Anda memiliki lebih dari 10.000 set data) atau sistem pencarian asli.
         **Silahkan tambahkan ini ke file setup.xml Anda** Sitemap&lt;/displayDiagnosticInfo&gt;:
```
              <!-- ERDDAP™ lets you choose between two search engines for full text searches:
              \\* original (the default) -- is the best choice if your ERDDAP™ has fewer 
                than about 10,000 datasets.  It is very robust and trouble free. 
              \\* lucene -- is the best choice for more than about 10,000 datasets.
                The advantages are that with any number of datasets it works fast 
                and uses very little memory.
                But there are many things that might go wrong with individual 
                queries and with the whole system. 
                And although its behaviour (the datasets it finds and the order that
                it ranks them) is almost identical to the original search engine,
                it has a few quirky, subtle, small differences.
              -->
              <searchEngine>original</searchEngine>
```

    * Dalam setup.xml, Anda dapat/menuntut sekarang menambahkan dua kategori baru ke daftar koma-separated&lt; categoryAttributes Sitemap
        * global:katalog (menambahkannya tepat setelah global: lembaga) - kasus khusus baru yang membuat daftar kata kunci yang dipisahkan dari kata kunci global atribut untuk membuat entri terpisah untuk setiap kata kunci.
        * Login Login (tambahkan di akhir) - kasus khusus baru yang mengkategorikan masing-masing dataVariable   destinationName Sitemap
    * Dalam setup.xml, Anda dapat (tapi mengapa?) Sitemap ERDDAP™ tidak menawarkan FGDC dan / atau metadata ISO 19115 untuk setiap dataset dengan termasuk
```
        <fgdcActive>false</fgdcActive>  
        <iso19115Active>false</iso19115Active>
```

Nilai default untuk pengaturan ini benar.
    * Sitemap datasets.xml mohon mempertimbangkan meningkatkan metadata untuk dataset Anda. ERDDAP™ sekarang secara otomatis menghasilkan file metadata ISO 19115 dan FGDC XML untuk setiap dataset berdasarkan metadata dataset.
Sitemap **metadata dataset yang baik mengarah ke baik ERDDAP -generasi ISO 19115 dan metadata FGDC.**   
         **Lihat dokumentasi baru untuk banyak RECOMMENDED [Atribut global](/docs/server-admin/datasets#global-attributes) Sitemap** 
    * Sitemap datasets.xml jika Anda ingin memberitahukan ERDDAP™ untuk menggunakan file FGDC dan/atau ISO 19115 yang dibuat di suatu tempat pada sistem file server, bukan memiliki ERDDAP™ menghasilkan file ini, gunakan:
```
        <fgdcFile>_fullFileName_</fgdcFile>  
        <iso19115File>_fullFileName_</iso19115File>
```
Jika _FilefullName_\\="" atau file tidak ditemukan, dataset tidak akan memiliki FGDC dan / atau metadata ISO 19115. Jadi ini juga berguna jika Anda ingin menekan FGDC dan/atau metadata ISO 19115 untuk dataset tertentu.
    * Sitemap datasets.xml , untuk semua EDDGrid Sitemap EDDGrid AggregateExistingDimensi dataset, membuat dataset anak memiliki berbeda datasetID Dari dataset induk mereka dan dari anak-anak lain. (Misalnya, Anda bisa mengikuti sistem sederhana George Foreman untuk mencerahkan anak-anaknya.) Jika ada nama dalam keluarga persis sama, dataset akan gagal dimuat (dengan pesan kesalahan yang nilai-nilai sumbu agregat tidak diurutkan) Sitemap
    * Sitemap datasets.xml Ada beberapa perubahan pada daftar valid ioos\\_category nilai metadata:
        * "pCO2" diubah menjadi "CO2".
        * "Physical Oceanography" ditambahkan.
        * "Soils" ditambahkan.
    * Sitemap datasets.xml Login ERDDAP™ tidak lagi memungkinkan '.' dalam Meme it datasetID Sitemap Hal ini diperbolehkan tetapi tidak teratur. (Login) 
    * Sitemap datasets.xml , setup untuk EDDTableDariThreddsFiles dan EDDTableDari Hyrax File telah berubah sedikit karena kedua kelas hanya ditulis kembali menjadi lebih efisien (kedua kelas sekarang selalu membuat salinan lokal dari semua file data jarak jauh) Sitemap Lihat dokumentasi untuk mengatur kelas ini: [Login Hyrax Login](/docs/server-admin/datasets#eddtablefromhyraxfiles) Login [Sitemap](/docs/server-admin/datasets#eddtablefromthreddsfiles) Sitemap Secara khusus, lihat komentar yang direvisi tentang&lt;Login (Sitemap) Login&lt; sourceUrl Sitemap (sekarang penting) Sitemap Juga, Anda tidak boleh membungkus kelas ini di EDDTableCopy untuk efisiensi.
    * Sitemap datasets.xml , jika Anda menggunakan EDDTableDariDatabase dengan Oracle database, Anda harus menyertakan koneksi Properti seperti
```
        <connectionProperty name="defaultRowPrefetch">4096</connectionProperty>  
```
untuk menentukan berapa banyak baris data untuk mengambil pada satu waktu karena default adalah 10, yang sangat tidak efisien. Sitemap [ Oracle Sitemap](https://docs.oracle.com/cd/B10501_01/java.920/a96654/basic.htm) Sitemap MySql dan PostgreSQL tampaknya memiliki standar yang lebih baik untuk pengaturan ini. Kevin O'Brien
    * Jika Anda menggunakan EDDTableDariDatabase, lihat peningkatan [Dokumentasi "Speed"](/docs/server-admin/datasets#eddtablefromdatabase) untuk saran tambahan untuk meningkatkan kinerja. Kevin O'Brien
    * Sitemap datasets.xml , untuk semua EDDTable... dataset, dalam Konvensi dan Metadata\\_Conventions atribut global, silakan lihat CF-1.6 (tidak CF-1.0, 1.1, 1.2, 1.3, 1.4, atau 1.5) Karena CF-1.6 adalah versi pertama untuk menyertakan perubahan yang terkait dengan Geometry Sampling Diskrit.
    * Programmer yang menyusun ERDDAP™ kode perlu menambahkan lib/lucene-core.jar ke daftar file jar di jalur baris perintah javac dan java mereka.
    *    ERDDAP™ Sitemap [layanan baru](https://coastwatch.pfeg.noaa.gov/erddap/convert/keywords.html) untuk mengkonversi Nama Standar CF ke / dari Kata kunci Ilmu GCMD. Anda dapat menemukan ini berguna ketika menghasilkan metadata kata kunci global untuk dataset di Anda ERDDAP Sitemap
    * Berurusan dengan Bots -- Silahkan baca saran ini untuk [mencegah bot dari merangkak Anda ERDDAP™ dengan cara yang sangat baik](/docs/server-admin/additional-information#robotstxt) Sitemap
    * Sitemap Teks di ERDDAP 's halaman web sekarang sebagian besar dalam pesan.xml dan sangat cocok untuk terjemahan ke bahasa yang berbeda (e.g., Jerman, Prancis) Sitemap Pesan sekarang sering menggunakan MessageFormat untuk format, juga untuk membantu dalam membuat terjemahan. Jika Anda tertarik untuk melakukan terjemahan, silakan email erd dot data at noaa dot gov Sitemap
    * Sitemap datasets.xml Login Ada beberapa kesalahan kecil tetapi signifikan dalam sampel datasets.xml Sitemap Jika Anda menggunakan dataset, silakan dapatkan versi yang lebih baru dari sampel baru datasets.xml di erddapContent baru .zip Login Berkat James Wilkinson.
    * Login Saya akan mencoba keras untuk membuat Meme it ERDDAP™ proyek GitHub ASAP setelah rilis ini.
*    **Perubahan kecil / Perbaikan Bug:** 
    * Palet baru, OceanDepth, berguna untuk nilai kedalaman (positif) g., 0 (Login) untuk 8000 (Login) Sitemap
    * Login .kml output dari tabledap menggunakan ikon penanda yang lebih baik (itu tidak fuzzy) Sitemap Dan melaju lebih penanda sekarang membuatnya lebih besar.
    * Login Dalam peningkatan terakhir, perpustakaan netcdf-java baru memiliki pembatasan yang lebih ketat untuk nama variabel .nc Login Itu menyebabkan masalah untuk EDDTableDariFiles jika variabel sourceName memiliki karakter tanda baca tertentu. EDDTableDaris sekarang dimodifikasi untuk menghindari masalah itu. Terima kasih kepada Thomas Holcomb.
    * Halaman .subset sekarang mendukung 0/10/100/1000/10000/100000 bukan kotak cek untuk Data Terkait. Tooltip memperingatkan bahwa 100000 dapat menyebabkan browser Anda crash. Terima kasih kepada Annette DesRochers, Richard (Login) Batuk, dan Proyek Biologi IOOS.
    * Facebook Twitter Google Plus Pinterest Email datasetID _/index.html halaman web sekarang menunjukkan url dan alamat email sebagai link yang dapat diklik. Terima kasih kepada Richard (Login) Batuk dan Proyek Biologi IOOS.
    * Perbaikan bug: Dalam tabledap dataset dengan ketinggian Sitemap&lt;0, pertanyaan dengan batasan ketinggian ditangani dengan benar. Kyle Wilcox
    * Perbaikan bug: EDDGrid AggregateDariExistingDimensi sekarang mendukung URL TDS yang lebih beragam. Terima kasih?

## Versi 1.36{#version-136} 
 (dirilis 2011-08-01) 

*    **Fitur Baru:** 
    * Tidak ada perubahan signifikan dari sudut pandang pengguna.
*    **Sitemap ERDDAP™ Administrator Perlu Tahu dan Lakukan:** 
    * Dataset amelTao yang sering digunakan sebagai dataset sampel untuk tabledap   
dokumentasi tidak lagi tersedia. ERDDAP™ administrator MUST membuat perubahan ini:
        * Sitemap datasets.xml jika Anda memiliki datasetID ="pmelTao" dataset, tambahkan
aktif="false" tepat sebelum "&gt;" di akhir garis itu.
        * Di setup.xml Anda, jika Anda&lt;Login adalah amelTao, kemudian:
            * Sitemap datasets.xml tidak memiliki dataset dengan Meme it datasetID ="erdGlobecBottle", tambahkan
```
                <dataset type="EDDTableFromErddap" datasetID="erdGlobecBottle" active="true">  
                  <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGlobecBottle</sourceUrl>  
                </dataset>
```
            * Di setup Anda.xml, ganti semua tag dari&lt;Login Sitemap
                &lt;Login Matlab Login Login
```
                <!-- Tabledap Examples
                This group of settings is used to make examples for the tabledap documentation 
                that appears at \\[baseUrl\\]/erddap/tabledap/documentation.html and elsewhere.
                If you include the erdGlobecBottle dataset in your datasets.xml (recommended), 
                you don't need to change these.
                If you don't, you MUST change these before you make your ERDDAP™ public; 
                otherwise, none of the examples will work!
                The new settings should be very similar to the defaults.
                If your ERDDAP™ won't serve any tabular datasets, use "NOT\\_APPLICABLE" for all of the entities.
                In .xml files like this, ampersand, lessThan, and greaterThan have to be 
                HTML encoded as "&amp;", "&lt;", "&gt;".
                -->
                <!-- This is the datasetID for an EDDTable dataset that is served by your ERDDAP.
                     This dataset is used as the basis for all of the EDDGrid examples below. 
                     Ideally, it is a dataset that has longitude, latitude, and time variables (among others). 
                     ('time' allows for making a time series graph. 'latitude' and 'longitude' allow for making a map.)
                     The dataset can have longitude values -180 to 180, or 0 to 360. -->
                <EDDTableIdExample>erdGlobecBottle</EDDTableIdExample>
                <!-- This is a comma-separated list of variables from the dataset.
                     It is useful if it is "longitude,latitude,time," plus a data variable name. -->
                <EDDTableVariablesExample>longitude,latitude,time,bottle\\_posn,temperature1</EDDTableVariablesExample>
                <!-- This is the constraints example which is appended to EDDTableVariablesExample. -->
                <EDDTableConstraintsExample>&amp;time&gt;=2002-08-17T00:00:00Z&amp;time&lt;=2002-08-19T20:18:00Z</EDDTableConstraintsExample>
                <!-- This is an example data query using an ISO-formatted time. 
                     You could generate your example via your dataset's Data Access Form in ERDDAP.  -->
                <EDDTableDataTimeExample>longitude,latitude,time,bottle\\_posn,temperature1&amp;time&gt;=2002-08-17T00:00:00Z&amp;time&lt;=2002-08-19T20:18:00Z</EDDTableDataTimeExample>
                <!-- This is an equivalent example data query, but which specifies time as seconds-since-1970-01-01. 
                     If you need to convert a date/time to "seconds since 1970-01-01", use
                     https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html -->
                <EDDTableDataValueExample>longitude,latitude,time,bottle\\_posn,temperature1&amp;time&gt;=1029542400&amp;time&lt;=1029788280</EDDTableDataValueExample>
                <!-- This is an example query which generates a graph. 
                     You could generate your example via your dataset's Make A Graph form in ERDDAP.  -->
                <EDDTableGraphExample>bottle\\_posn,temperature1&amp;time=2002-08-19T10:06:00Z&amp;.draw=lines</EDDTableGraphExample>
                <!-- This is an example query which generates a map. 
                     In the default mapExample, temperature1, time, bottle\\_posn are useful 
                     because they appear in GoogleEarth with the .kml example 
                     and are ignored by the other image file types. -->
                <EDDTableMapExample>longitude,latitude,temperature1,time,bottle\\_posn&amp;time&gt;=2002-08-13T00:00:00Z&amp;time&lt;=2002-08-20T00:00:00Z&amp;bottle\\_posn=1&amp;.draw=markers&amp;.marker=5|5</EDDTableMapExample>
                <!-- This is a Matlab example which uses data from the EDDTableGraphExample.
                     Note the Matlab notation datasetName.variableName.  -->
                <EDDTableMatlabPlotExample>plot(erdGlobecBottle.bottle\\_posn, erdGlobecBottle.temperature1)</EDDTableMatlabPlotExample>
```
                
    * Untuk dataset di mana jenis adalah subkelas EDDTableDariFiles, Anda sekarang dapat membuat data dari metadata.
Secara spesifik, Anda sekarang dapat membuat variabel dari nilai atribut dari salah satu variabel asli.
Sebagai contoh, dalam datasets.xml Sitemap&lt; dataVariable &gt; Tag, jika Anda menggunakan
```
        <sourceName>variable:cruise:PI</sourceName>  
```
         ERDDAP™ akan membuat variabel dengan nilai atribut PI dari variabel pesiar.
Terima kasih kepada WOD.
*    **Perubahan:** 
    * Perubahan kecil

## Versi 1.34{#version-134} 
 (dirilis 2011-06-15) 

*    **Perubahan:** 
    * Perbaikan bug: Memperbaiki kebocoran memori yang terjadi pada beberapa 64-bit Java Login
    * Perbaikan bug: ERDDAP™ sekarang benar mengatur atribut global ini ketika nilai dimensi latitude berkisar dari tinggi ke rendah: geospatial\\_lat\\_min, geospatial\\_lat\\_max, Southernmost\\_Northing, Northmost\\_Northing.
        
Login actual\\_range tidak berubah: mungkin memiliki nilai rendah, tinggi atau nilai rendah, karena dimaksudkan untuk menunjukkan kisaran dan urutan penyimpanan.
        
    * Perubahan kecil.
    *    ERDDAP™ administrator tidak perlu melakukan perubahan pada setup mereka.xml atau datasets.xml Sitemap

## Versi 1.32{#version-132} 
 (dirilis 2011-05-20) 

*    **Perubahan:** 
    * Dukungan untuk geometris Sampling yang baru dipulihkan, CF Discrete Sampling (yang sayangnya belum tersedia secara online) , yang menggantikan Konvensi Observasi Titik CF yang diusulkan.
         ERDDAP™ pengguna akan melihat bahwa cdm\\_feature\\_type=Station diganti oleh TimeSeries dan ada perubahan kecil pada file yang dibuat untuk .nc Jenis file CF (flat\\_dimension sekarang disebut sampel\\_dimension) Sitemap
         ERDDAP™ administrator harus membuat perubahan ini dalam Meme it datasets.xml Sitemap
        * cdm\\_data\\_type=Station harus diubah ke cdm\\_data\\_type=TimeSeries.
        * cdm\\_data\\_type=StationProfile harus diubah ke cdm\\_data\\_type=TimeSeriesProfile.
        * cdm\\_station\\_variables harus diubah ke cdm\\_timeseries\\_variables.
        * cf\\_role=station\\_id harus diubah ke cf\\_role=timeseries\\_id.
    * Login ioos\\_category opsi: "Colored Dissolved Organic Matter", "pCO2", "Stream Flow", "Total Suspended Matter".
    * Solusi yang mungkin kebocoran memori pada 64-bit Java Sitemap \\[ Tidak berfungsi. \\] 
    * Perubahan kecil.

## Versi 1.30{#version-130} 
 (Dikirim 2011-04-29) 

*    **Fitur Baru:** 
    * Dukungan untuk 64-bit Java Sitemap Ketika digunakan dengan 64 bit Java Login ERDDAP™ sekarang dapat menggunakan lebih banyak heap memori dan menangani banyak permintaan simultan.
    * Sitemap .nc permintaan file hingga 2GB (bahkan tanpa 64-bit Java ) melalui penggunaan yang lebih baik ERDDAP 's penanganan data di chunks.
    * Banyak peningkatan kecepatan 2X dalam kode dan kecepatan 2X dari Java 1.6 membuat ERDDAP™ 2X ke 4X lebih cepat dari sebelumnya.
    * Peningkatan penghematan memori secara signifikan lebih rendah ERDDAP Penggunaan memori dasar.
    * Untuk set data tabel, ERDDAP™ sekarang sepenuhnya menyadari cdm dataset\\_data\\_type, dan bagaimana peta data ke tipe CDM. Sitemap [Login Mengikat spesifikasi geometris](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Sitemap Mungkin beberapa hari segera, file Word akan dikonversi ke .html dan mengganti informasi "OBSOLETE" saat ini di halaman web itu. Sitemap NOAA Proyek UAF.
    * Untuk dataset yang paling EDDTable, opsi jenis file output baru, .nc CF, menciptakan Array yang terus-menerus .nc file yang sesuai dengan versi terbaru dari [Login Mengikat Konvensi Geometris](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Sitemap File-file ini terstruktur untuk mencerminkan jenis data CDM dari dataset. Karena Konvensi yang diusulkan hanya berubah, seperti tulisan ini, perpustakaan netcdf-java belum mendukung membaca format file yang dibuat oleh ERDDAP dan menafsirkan mereka sebagai file data CDM. Mungkin akan segera. Sitemap NOAA Proyek UAF.
    * Tampilan : Opsi Data Distinct di halaman web .subset sekarang daftar drop-down yang memungkinkan pengguna menentukan jumlah baris maksimum data yang berbeda untuk dilihat (standar = 1000) Sitemap Perubahan ini, dan lain-lain, memungkinkan ERDDAP™ untuk bekerja dengan dataset yang memiliki sejumlah besar baris data yang berbeda. (Jumlah nilai unik untuk setiap variabel tunggal masih menjadi masalah, tetapi dapat cukup tinggi (20,000?) sebelum .subset dan halaman web lain memuat benar-benar perlahan.) Sitemap NOAA Proyek UAF.
    * .subset halaman web memiliki opsi baru: Lihat Counts Data Distinct. Berkat proyek GTOPP.
    * Untuk membantu pengguna, nilai yang berbeda (e.g., nama stasiun) sekarang ditunjukkan pada Formulir Make-A-Graph dan Data Access. Sitemap NOAA Proyek UAF.
    * Login Permintaan Png sekarang mendukung semua jenis grafik dan representasi data. Ini menarik hanya data - tidak ada kapak, legenda, masker tanah, atau apa pun. Ini memungkinkan untuk membuat gambar sebagai lapisan transparanPngs. Sitemap | _height_ ditentukan dalam pertanyaan (Sitemap) , itu dihormati. default adalah 360x360 piksel. Satu-satunya pengecualian adalah EDDGrid &.draw=surface, di mana default (Sitemap) adalah gambar dengan ~ 1 / piksel per titik data (hingga 3000 x dan y piksel) Sitemap Terima kasih kepada Fred Hochstaedter.
    * Login WMS halaman web sekarang menunjukkan bilah warna untuk variabel dataset (Login) Sitemap Berkat Walikota Emilio dan lain-lain.
*    **Sitemap ERDDAP™ Administrator Perlu Tahu dan Lakukan:** 
    * Rilis ini melibatkan banyak perubahan. Mereka semua penting. Meme it Silahkan menjadi pasien dan bekerja melalui semua perubahan yang tercantum di bawah ini.
    * Versi ini didorong sebelumnya daripada dimaksudkan untuk berurusan dengan beberapa Java bug keamanan. Sayangnya, beberapa fitur / perbaikan dimaksudkan untuk ini ERDDAP™ versi tidak dalam versi ini. Login Mudah-mudahan, versi berikutnya akan relatif segera (dan lebih mudah untuk meningkatkan) Sitemap
    * Untuk menghindari beberapa bug keamanan Java 6 update 23 dan di bawah ini, unduh dan instal versi terbaru dari Java   ( Java 6 update 24 atau lebih tinggi) Sitemap Jika Anda memiliki sistem operasi 64-bit, silakan mendapatkan versi 64-bit dari Java Sitemap
    * Jika Anda menggunakan Tomcat 5, Anda MUST upgrade ke Tomcat 6 atau 7 (Login) Sitemap Jika Anda menggunakan Tomcat 6, pertimbangkan upgrade ke versi Tomcat 7.
    * Silakan ikuti semua instruksi untuk [pengaturan baru ERDDAP™ ](/docs/server-admin/deploy-install) tetapi di mana relevan, Anda akan menyalin file dari instalasi lama Anda ke instalasi baru, terutama \\[ Login \\] /content/erddap direktori dan file. Sebagai bagian dari itu, perhatikan [rekomendasi pengaturan Tomcat baru](/docs/server-admin/deploy-install#tomcat) Sitemap
    * erddap.css default sekarang termasuk dalam file erddap.war.
        * Untuk menggunakan erddap.css default, **Login** lama \\[ Login \\] /content/erddap/images/erddap.css
        * Jika Anda dimodifikasi \\[ Login \\] /content/erddap/images/erddap.css, dan ingin terus menggunakannya: hanya meninggalkannya di tempat dan mengganti&lt;input&gt; bagian dengan:
```
            /\\* Small input items let more be shown on one screen  
            (esp. Chrome and Safari). Google Chrome and Safari have  
            default margin 2px, while others are 0. This sets all to 0.  
            .skinny is used e.g., for the buttons above the image on  
            a Make A Graph page. \\*/  
            input\\[type=button\\], input\\[type=submit\\], button {  
              margin:0px; padding:0px 3px; }  
            input\\[type=checkbox\\], input\\[type=password\\],  
              input\\[type=text\\], select, textarea {  
              margin:0px; padding:0px; }  
            input\\[type=radio\\] {margin:0px 2px; padding:0px; }  
            input.skinny {padding:0px 1px; }
```

    * Sitemap \\[ Login \\] WordPress.org
        * Ganti komentar dan tag terkait&lt;WordPress.org&lt;WordPress.org Login
```
            <!-- When possible (and it isn't always possible),  
            ERDDAP™ breaks source data requests into chunks to  
            conserve memory. See the description of these tags in  
            messages.xml. You can override the default chunk sizes  
            here with  
            For grids:  
             <partialRequestMaxBytes>100000000</partialRequestMaxBytes>  
            For tables:  
             <partialRequestMaxCells>100000</partialRequestMaxCells>  
            \\-->
```
        * Ganti komentar terkait&lt; categoryAttributes &gt; dan mempertimbangkan memodifikasi nilai tag:
```
            <!-- This is the comma-separated list (recommended:  
            in alphabetical order) of the global attribute and  
            variable attribute names which will be used to  
            categorize the datasets and shown to clients at urls  
            like .../erddap/categorize/ioos\\_category/index.html  
            (ioos\\_category is unusual, but is used at ERD).  
            If an attribute is a global attribute, identify it by  
            prefixing it with "global:".  
            \\-->  
            <categoryAttributes>global:institution, ioos\\_category,  
            long\\_name, standard\\_name</categoryAttributes>  
```

Sitemap&lt; categoryAttributes Atribut global sekarang MUST diidentifikasi melalui awal global: (e.g., global: lembaga) Sitemap Atribut lain diasumsikan menjadi atribut variabel (Login standard\\_name ) Sitemap Juga, nilai institusi (satu-satunya) ditinggalkan dalam kasus asli. Sekarang semua nilai kategori dikonversi menjadi lebih rendah.
    * Sitemap \\[ Login \\] Login datasets.xml Sitemap
        * TERBAIK besar: ERDDAP™ memiliki persyaratan baru yang berkaitan dengan cdm tabular dataset\\_data\\_type. Tidak mungkin, setiap dataset MUST memiliki metadata dan variabel yang benar yang berkaitan dengan cdm\\_data\\_type. Jika tidak, dataset tidak akan memuat dan akan membuang kesalahan. Lihat dokumentasi untuk [cdm\\_data\\_type](/docs/server-admin/datasets#cdm_data_type) Sitemap
        * FYI: Ada jenis dataset baru: EDDTableDariAsciiServiceNOS.
        * FYI: Ada tiga yang baru diizinkan ioos\\_category opsi: Hidrologi, Kualitas (e.g., untuk bendera kualitas) Statistik (Sitemap) Sitemap
        * Untuk EDDTableDari... File dataset, menghapus&lt;nDimensis&gt; tag. Mereka tidak lagi diperlukan atau digunakan.
        * Untuk variabel dengan destinationName = ketinggian, ERDDAP™ tidak lagi memaksa Meme it long\\_name menjadi Altitude. Sitemap datasets.xml dan pencarian berulang untuk&lt; destinationName &gt; ketinggian dan tambahkan ke variabel yang&lt; addAttributes Sitemap
```
              <att name="long\\_name">Altitude</att>  
```
             (atau sedikit berbeda long\\_name dalam kasus khusus) Sitemap
        * Opsional: Semua EDDTableDariFiles subclasses mendukung variabel [ sourceName Login](/docs/server-admin/datasets#global-sourcenames) untuk mengubah metadata global dari setiap file menjadi variabel data. Terima kasih kepada Lynn DeWitt.
    * EDDTableDariDatabase pengguna -- ERDDAP™ datang dengan driver JDBC 4 baru untuk Postgres. Untuk database lain, periksa web untuk file JDBC .jar terbaru untuk database Anda. Sitemap ERDDAP™ Sitemap Java 1.6+, JDBC 4 (tidak 3) mungkin dianjurkan.
    * Login
        *    EDDGrid Dari...Files dan EDDTable Sitemap File dataset sekarang menyimpan informasi fileTable di
             \\[ Login \\] Login Sitemap \\[  datasetID  \\] Login .nc Login
Juga, dataset EDDTable sekarang menyimpan informasi subset di
             \\[ Login \\] Login Sitemap \\[  datasetID  \\] Login .nc Login File ini digunakan untuk
             \\[ Login \\] Login Sitemap \\[  datasetID  \\] Login .json Login
File lama akan dihapus secara otomatis ketika Meme it ERDDAP™ Sitemap Atau, Anda dapat menghapus semua file (tapi meninggalkan subdirectories kosong) Sitemap \\[ Login \\] Login
        * Saya bekerja pada EDDTableDariNcCFFiles baru yang akan membaca data dari file lokal dan jarak jauh menggunakan Konvensi Observasi Titik CF baru. Tapi itu tidak dalam rilis ini. Meme it Ada masalah di perpustakaan netcdf-java yang berkaitan dengan beberapa metode untuk membaca file ini. Dan ada beberapa perubahan terbaru ke Konvensi Observasi Titik CF yang diusulkan. Ketika perpustakaan netcdf-java tetap dan diperbarui ke proposal terbaru, saya akan melanjutkan bekerja pada ini.
        * Login ERDDAP™ di Windows mungkin memiliki masalah: tidak dapat, Anda dapat melihat di Meme it \\[ bigParentDirectory/logs/log.txt file yang ERDDAP™ kadang-kadang tidak bisa menghapus dan/atau mengubah nama file dengan cepat. Ini karena perangkat lunak antivirus (e.g., dari McAfee dan Norton) yang memeriksa file untuk virus. Jika Anda menjalankan masalah ini (yang dapat dilihat oleh pesan kesalahan dalam file log.txt seperti "Tidak dapat dihapus ...") mengubah pengaturan perangkat lunak antivirus mungkin sebagian mengurangi masalah.
Sitemap ERDDAP™ di Windows hanya tes yang berjalan di desktop Anda, ini hanya gangguan.
Sitemap ERDDAP™ di Windows adalah publik Anda ERDDAP™ , pertimbangkan beralih ke server Linux.
    * Sitemap Pertama kali Anda menjalankan ERDDAP™ setelah upgrade, ERDDAP™ mungkin lambat untuk memuat dataset. Cara ERDDAP™ menyimpan informasi tentang file agregat telah berubah, sehingga ERDDAP™ harus membaca kembali beberapa info dari semua file tersebut. Itu akan memakan waktu. Meme it
    * Kesalahan pada Startup -- Mengingat perubahan yang terkait dengan cdm\\_data\\_type, kemungkinan bahwa beberapa dataset Anda tidak akan memuat dan akan membuang kesalahan. Silakan baca email Laporan Harian yang ERDDAP™ mengirim Anda kapan ERDDAP™ selesai dimulai. Ini akan memiliki daftar dataset yang tidak dimuat (di atas) dan alasan mereka tidak memuat Meme it (dekat bagian bawah) Sitemap
    * Jika Anda terjebak atau memiliki pertanyaan lain, email rincian kepada saya: erd.data at noaa.gov Sitemap
    * Login Login Jika Anda menulis Java program yang menjalankan ERDDAP™ kode, Anda perlu mengubah beberapa referensi parameter baris perintah:
        * Ubah joda-time-1.6.2.jar untuk joda-time. Login
        * Ubah referensi Postgres JDBC .jar ke postgresql.jdbc.jar
*    **Perubahan Kecil dan Perbaikan Bug:** 
    
    * Penanganan koneksi yang ditingkatkan untuk menghindari benang lapar.
    * Peningkatan praktek-praktek concurrency untuk menangani hampir permintaan identik simultan lebih efisien.
    *    ERDDAP™ sekarang menggunakan netcdfAll-4.2.jar (berganti nama menjadi netcdfAll-latest. Login) Sitemap Switch ini membutuhkan beberapa perubahan internal dan menyebabkan beberapa perubahan eksternal kecil, misalnya, perubahan bagaimana file grib dibaca dan perubahan kecil ke perubahan .nc Output header.
    * Fitur baru: \\[ Login \\] /convert/fipscounty.html konversi FIPS kode daerah ke/dari nama daerah.
    * Pada peta, batas-batas negara sekarang gelap ungu, sehingga mereka menonjol lebih baik pada semua warna latar belakang.
    * Login .kml output lagi menggunakan ikon melingkar untuk menandai poin (bukan ikon pesawat Google baru beralih ke) Sitemap
    * Dataset erdCalcofi diatur ulang dan sekarang dilayani dari file lokal (Sitemap) Sitemap
    * Login Login Login Katalog sekarang membuat file hasil:
         \\[ Login \\] /webapps/erddap/WEB-INF/temp/ EDDGrid WordPress.org Kevin O'Brien
    * Login Login Login Katalog sekarang mencoba untuk menghapus nomor port yang tidak perlu dari URL sumber (e.g., : 8080 dan : 8081 kadang-kadang bisa dihapus) Sitemap Sitemap NOAA tim keamanan pusat.
    * Untuk halaman web .subset, Peta Data Distinct sekarang memiliki rentang lat variabel.
    * Beberapa daftar dalam ERDDAP™   (misalnya, tabel yang menunjukkan semua dataset) diurutkan sehingga A.Z diurutkan sebelum a. .z Sitemap Sekarang mereka menyortir dengan cara yang tidak sensitif.
    * Perubahan kecil ke halaman web .subset, termasuk: unit sekarang ditunjukkan.
    * Login Xml dan DasDds tidak lagi membuang pengecualian jika tidak dapat menempatkan hasil pada clipboard sistem atau displayInBrowser. Terima kasih kepada Eric Bridger dan Greg Williams.
    * Perbaikan bug: Ketika dataset dimuat, ERDDAP™ sekarang menghapus atau menyesuaikan atribut global geospasial. Terima kasih kepada Charles Carleton.
    * Perbaikan bug: String2.getClassPath () sekarang benar persen-decode kelas Login (tidak dapat, di Windows, ruang dalam nama file muncul sebagai %20) Sitemap Ini dipengaruhi ERDDAP™ Email: info@ids-imaging.com () dan menemukan konten / erddap. Berkat Abe Coughlin.
    * Perbaikan bug: di EDDTableDariFiles terkait untuk mendapatkanDataForDapQuery penanganan yang berbeda () Sitemap Berkat Eric Bridger.
    * Perbaikan bug: tabledap permintaan tidak benar menangani hambatan ketinggian ketika ketinggian dataset MeterPerSourceUnit -1. Berkat Eric Bridger.
    * Perbaikan bug: EDDTableDari... File dataset sekarang benar menangani permintaan yang meliputi = NaN dan &#33;=NaN.
    
## Versi 1.28{#version-128} 
 (dirilis 2010-08-27) 

*    **Fitur Baru:** Sitemap
*    **Sitemap ERDDAP™ Administrator Perlu Tahu dan Lakukan:** Sitemap
*    **Perbaikan bug:** Memperbaiki kesalahan pemrograman (hanya dalam ver 1.26) yang dibuat ERDDAP™ sangat lambat.
     

## Versi 1.26{#version-126} 
 (dirilis 2010-08-25) 

*    **Fitur Baru:** Sitemap
*    **Sitemap ERDDAP™ Administrator Perlu Tahu dan Lakukan:** 
    * Dari Anda \\[ Login \\] WordPress.org
        * Sitemap&lt;legal&gt;, pada baris baru di bawah ini \\[ Sitemap Login \\] Login \\[ Login \\] Sitemap \\[ Login \\] Login&lt;adminEmail&gt; ditentukan lebih tinggi di setup.xml.
        * Login&lt;tabelCommonBGColor&gt; dan&lt;tabelHighlightBGColor&gt;.
        * Sitemap Login&lt;Login
```
            <endBodyHtml><!\\[CDATA\\[  
            <br>&nbsp;  
            <hr>  
            ERDDAP, Version &erddapVersion;  
            <br><a href="&erddapUrl;/legal.html">Disclaimers</a> |  
            <a href="&erddapUrl;/legal.html#privacyPolicy">Privacy Policy</a> |  
            <a href="&erddapUrl;/legal.html#contact">Contact</a>  
            </body>  
            \\]\\]></endBodyHtml>
```

    * Sitemap Login \\[ Login \\] /content/erddap/images/erddap.css dan erddapAlt.css, tambahkan di bagian bawah:
```
        /\\* This is used on the /info/\\[datasetID\\]/index.html pages to highlight a row or cell. \\*/  
        tr.highlightBGColor {background-color:#cceecc; }  
        td.highlightBGColor {background-color:#cceecc; }
```
*    **Perbaikan Bug dan Perubahan Kecil:** 
    
    * Perbaikan bug: dalam beberapa situasi, bentuk tidak bekerja dalam beberapa versi Internet Explorer. Terima kasih banyak untuk Greg Williams.
    * Perbaikan bug: Membuat tombol Graph tidak bekerja jika dataset dari jarak jauh ERDDAP Sitemap
    * Perbaikan bug: WMS kadang-kadang tidak bekerja jika dataset dari jarak jauh ERDDAP Sitemap
    * Banyak perubahan kecil dan perbaikan bug.
    

## Versi 1.24{#version-124} 
 (dirilis 2010-08-06) 

*    **Fitur Baru:** 
    * Login [Sitemap](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/index.html) menggunakan pencarian yang dihadapi untuk memilih subset dataset tabel. Terima kasih kepada POST.
    * Login [Pencarian Lanjutan](https://coastwatch.pfeg.noaa.gov/erddap/search/advanced.html) menggabungkan semua pilihan pencarian lainnya dan menambahkan garis bujur, lintang, dan kotak waktu yang terikat. Berkat Ellyn Montgomery. (Maaf untuk penundaan.) 
    * Login [Mengkonversi Waktu](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) halaman web dan layanan memungkinkan Anda mengonversikan waktu numerik ke / dari waktu string ISO.
    * Login [Mengkonversi Unit](https://coastwatch.pfeg.noaa.gov/erddap/convert/units.html) halaman web dan layanan memungkinkan Anda mengkonversi UDUNITS ke/dari unit UCUM. Sitemap NOAA Login SOS Sitemap
    * Sitemap tabledap permintaan termasuk & unit ("UCUM") nama unit akan dikonversi dari nama asli (Sitemap UDUNITS ) Login [Login](https://unitsofmeasure.org/ucum.html) nama unit. Ini hanya mempengaruhi unit\\*Sitemap\\*Tidak ada nilai data. Sitemap NOAA Login SOS Sitemap
    * Perbaikan untuk Membuat halaman web Graph dan grafik dan peta:
        * Jika grafik adalah peta, ada tombol Make A Graph baru untuk memperbesar in/out dan opsi baru untuk klik untuk mengubah titik pusat peta. Terima kasih kepada POST.
        * Pengaturan filter ditambahkan di bawah. Salam Williams
        * Dibangun dalam file data garis pantai diperbarui ke GSHHS v2.0. Terima kasih kepada POST.
        * Peta sekarang termasuk danau dan sungai. Terima kasih kepada POST. (Maaf, Delta Sungai Sacramento hilang karena data garis pantai atau danau/river penawaran dataset dengan itu.) 
        * Dibangun di file negara/negara yang telah ditentukan oleh pscoast. Terima kasih kepada POST.
        * Topografi.cpt dimodifikasi sedikit. (Maaf jika ini mempengaruhi Anda. Meme it) Terima kasih kepada POST.
        * Dalam griddap Membuat Grafik, jika pengguna mengubah variabel, bentuknya secara otomatis disubsuran sehingga axisVariable s' showStartAndStop selalu mencerminkan variabel grafik. Berkat Joaquin Trinanes.
        * Untuk URL gambar png dan pdf:
            * New &.land=_value_, di mana _value_ bisa "di bawah" (Tampilkan topografi) atau "lebih" (hanya menunjukkan bathymetri) Sitemap Jika tidak ditentukan, default ditetapkan oleh [ drawLandMask ](/docs/server-admin/datasets#global-drawlandmask) Sitemap datasets.xml atau setup.xml. Terima kasih kepada POST.
            * Baru: garis-garis di legenda yang terlalu panjang secara otomatis rusak ke beberapa garis. Terima kasih kepada POST.
        * Untuk URL gambar png:
            * New &.legend=_value_, di mana _value_ bisa "Bottom" (Login) "Menawarkan" atau "Hanya". Ini memungkinkan Anda memasukkan legenda, termasuk legenda, atau hanya mendapatkan legenda. Cara Wilson
            * Sitemap Pixels_ meninggalkan perbatasan nPixel (g., 10) di bagian bawah gambar. Ini diterapkan setelah .legend=Off. Cara Wilson
            * Facebook Twitter Google Plus Pinterest Email | _height_ memungkinkan Anda menentukan lebar dan tinggi untuk gambar, dalam piksel.
    * Format file output baru:
        * Sitemap .tsv p -- seperti .csv dan .tsv tapi dengan " (Sitemap) "ditandai nama kolom di baris pertama.
        * .odvTxt -- membuat file .txt yang menyederhanakan mendapatkan data ke [data laut Login (Login) ](https://odv.awi.de/) Sitemap
        * .esriCsv -- membuat file .csv cocok untuk impor di ESRI ArcGIS Sitemap (tabular dataset hanya) Terima kasih kepada Jan Mason, Jeff de La Beaujardiere, dan NOAA Login SOS Sitemap
    * Peningkatan GUI ke [Login](https://coastwatch.pfeg.noaa.gov/erddap/categorize/index.html) halaman web. Juga, nilai kategori (selain institusi) sekarang semua huruf kecil. permintaan non-lowercase diterima (Sitemap) untuk kompatibilitas mundur. Terima kasih kepada Roy Mendelssohn.
    * Pesan kesalahan sekarang bahkan lebih pendek dan lebih berorientasi kepada pengguna. Salam Williams
    * Perubahan internal yang sangat mengurangi ERDDAP Penggunaan memori dasar.
    * Banyak fitur baru yang hanya relevan dengan proyek POST.
*    **Sitemap ERDDAP™ Administrator Perlu Tahu dan Lakukan:** Ada banyak perubahan. Login Tapi setiap satu membawa beberapa manfaat bagus.
    * Perubahan besar untuk GenerateDatasetXml -- sekarang sering mengajukan lebih banyak pertanyaan (lihat relevan [Login Login](/docs/server-admin/datasets#detailed-descriptions-of-dataset-types) Sitemap) dan sekarang selalu menghasilkan konten siap pakai yang sangat penting untuk datasets.xml Sitemap Anda masih bertanggung jawab atas penyiapan, sehingga Anda masih harus meninjau datasets.xml konten sebelum menggunakannya. Menempatkan upaya manusia ke dalam proyek akan selalu lebih baik daripada program komputer. Berkat proyek UAF.
    * REQUIRED: Dalam setup.xml, Anda harus merevisi WMS Sitemap Sekarang harus menyertakan tag ini (tetapi jangan ragu untuk mengubah nilai) Sitemap
```
        <!-- These default accessConstraints, fees, and keywords are used 
        by the SOS, WCS, and WMS services.
        They can be overridden by "accessConstraints", "fees", "keywords" 
        attributes in a dataset's global metadata.
        If a dataset that has an "accessibleTo" tag doesn't override 
        "accessConstraints", then the default for "accessConstraints" is the
        "accessRequiresAuthorization" value.  
        -->
        <accessConstraints>NONE</accessConstraints>
        <accessRequiresAuthorization>only accessible to authorized
        users</accessRequiresAuthorization>
        <fees>NONE</fees>
        <keywords>Earth science, oceans</keywords> 
        
        <!-- This appears on the erddap/legal.html web page after the 
        General Disclaimer. 
        You can replace any of the \\[standardParts\\] with your own HTML. -->
        <legal><!\\[CDATA\\[
        \\[standardDisclaimerOfEndorsement\\]
        \\[standardDisclaimerOfExternalLinks\\]
        \\[standardPrivacyPolicy\\]
        \\[standardDataLicenses\\]
        \\]\\]></legal>
        
        <!-- Specify the default units standard (e.g., "UDUNITS" 
        (the default) or "UCUM") that you (the ERDDAP™ admin) are using to 
        specify units.  The value is case-sensitive.
        This is used by ERDDAP's SOS server to determine if the units need to
        be converted to UCUM units for WMS and SOS GetCapabilities responses. 
        -->
        <units\\_standard>UDUNITS</units\\_standard>
        
        <!-- For the wms examples, pick one of your grid datasets that has
        longitude and latitude axes.
        The sample variable must be a variable in the sample grid dataset.
        The bounding box values are minx,miny,maxx,maxy.
        -->
        <wmsSampleDatasetID>erdBAssta5day</wmsSampleDatasetID>
        <wmsSampleVariable>sst</wmsSampleVariable>
        <!-- The bounding box values are 
           minLongitude,minLatitude,maxLongitude,maxLatitude.
           Longitude values within -180 to 180, or 0 to 360, are now okay. -->
        <wmsSampleBBox>0,-75,360,75</wmsSampleBBox>
```

    * REQUIRED: Dalam setup.xml, menyalin dan menempel yang baru ini disarankan&lt;startHeadHtml&gt; untuk mengganti versi lama Anda. Tapi jangan ragu untuk membuat perubahan untuk preferensi Anda.
```
        <!-- startHeadHtml has the start of the HTML document and the 
        'head' tags (starting at "<!DOCTYPE>", but not including 
        "</head>") for all HTML web pages. 
        This may include &erddapUrl;, which is expanded to be 
          \\[baseUrl\\]/erddap (or \\[baseUttpsUrl\\]/erddap if the user is logged in).
        If your ERDDAP™ allows users to log in, all referenced image files, 
          css files, etc. must be in \\[tomcat\\]/content/erddap/images or a 
          subdirectory and must be referenced here with 
          &erddapUrl;/images/\\[fileName\\].
        
        favicon.ico is the image that browsers associate with your website.
        For more information, see https://en.wikipedia.org/wiki/Favicon .
        You can use your own favicon.ico file by putting it in 
          \\[tomcat\\]/content/erddap/images. 
        
        \\*\\*\\* Optional: you can change the appearance of all of your 
        ERDDAP's HTML pages by changing the CSS <style> settings below.
        
        For an example of a very different style, change the import reference
        to <tomcat>/content/erddap/images/erddapAlt.css
        
        \\*\\*\\* If your CSS style includes links to files (e.g., images), that 
        style information must be inline in the style tag below, after the
        'import' line, not in the .css file.  
        Put all of the (e.g., image) files in the 
        \\[tomcat\\]/content/erddap/images directory (or a subdirectory) and 
        reference them below starting with &erddapUrl;.
        Why? On ERDDAP™ https: web pages, \\*all\\* links should use "https:" 
        (not "http:"); otherwise, most browsers consider the web page not 
        fully secure.  Because ERDDAP™ would use the same .css file for 
        http: and https: web pages, the links within the .css file wouldn't 
        switch between http: and https:.  There doesn't seem to be a way 
        around this other than using inline style information.
        -->
        <startHeadHtml><!\\[CDATA\\[ 
        <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
          "http://www.w3.org/TR/html4/loose.dtd">
        <html>
        <head>
        <title>ERDDAP</title>
        <link rel="shortcut icon" href="&erddapUrl;/images/favicon.ico">
        <style type="text/css">
        <!--
          @import "&erddapUrl;/images/erddap.css";
        -->
        </style>
        \\]\\]></startHeadHtml>
        
        <!-- The tableCommonBGColor MUST be the same color as the 
           table.commonBGColor in erddap.css above. Suggested is #f1ecd8. 
           But if you use erddapAlt.css, change this to #e7dec5. -->
        <tableCommonBGColor>#f1ecd8</tableCommonBGColor>
        
        <!-- This is used, e.g., for the type=variable rows on the metadata
          info tables. -->
        <tableHighlightBGColor>#cceecc</tableHighlightBGColor>
```

Terima kasih kepada POST, Hans Vedo, dan Rick Blair.
    * REQUIRED: Dalam setup.xml, dalam&lt;Login&lt;tubuh&gt; tag untuk hanya Meme it&lt;erddap.css
    * REQUIRED: Dalam setup.xml, perubahan ini&lt;Login (tetapi mengubah alamat email ke alamat email Anda dan merasa bebas untuk membuat perubahan lain) Sitemap
```
        <!-- The end of the body of the HTML code for all HTML web pages
          (with "</body>" at the end). 
        This may include &erddapUrl;, which is expanded to be 
          \\[baseUrl\\]/erddap (or \\[baseUttpsUrl\\]/erddap if the user is logged in).
        If your ERDDAP™ allows users to log in, all referenced image files, etc. 
          must be in \\[tomcat\\]/content/erddap/images or a subdirectory
          and must be referenced here with &erddapUrl;/images/\\[fileName\\].
        
        You can change this, but please keep "ERDDAP, Version &erddapVersion;"
        and these references to the Disclaimers and Privacy Policy. -->
        <endBodyHtml><!\\[CDATA\\[ 
        <br>&nbsp;
        <hr>
        ERDDAP, Version &erddapVersion;
        <br><font class="subduedColor">Questions, comments, 
          suggestions?  Please send an email to 
          <tt>erd dot data at noaa dot gov</tt>
        <br>and include the ERDDAP™ URL directly related to your question
          or comment.
        <br>
          <a href="&erddapUrl;/legal.html">Disclaimers</a> | 
          <a href="&erddapUrl;/legal.html#privacyPolicy">Privacy 
            Policy</a>
        </font>
        </body>
        \\]\\]></endBodyHtml>
```

    * TINGGI RECOMMENDED: Dalam setup.xml, direkomendasikan&lt;Sitemap
```
        <theShortDescriptionHtml><!\\[CDATA\\[ 
        <h1>ERDDAP</h1>
        This website (the Environmental Research Division's Data Access 
        Program) aggregates scientific data from diverse local and remote 
        sources and offers you a simple, consistent way to download subsets 
        of the data in common file formats and make graphs and maps.
        This particular ERDDAP™ installation has oceanographic data
        (for example, data from satellites and buoys).
        
        \\[standardShortDescriptionHtml\\]
        \\]\\]></theShortDescriptionHtml>
```

Jangan ragu untuk mengubah kalimat ini, terutama kalimat terakhir dalam paragraf pertama.
    * In setup.xml, emailEverythingTo dan emailDailyReport Untuk sekarang dapat menjadi daftar alamat email yang terpisah. Sitemap Untuk khusus, misalnya, berlangganan EDDXxxxDariErddap dataset menggunakan alamat email itu. Terima kasih kepada John Maurer.
    * Kesalahan Email sekarang masuk ke \\[ Login \\] /logs/emailLogYY-MM-DD.txt file.
    * Dalam setup.xml, ada parameter baru, opsional untuk mengatur properti akun email (biasanya tepat setelah&lt;Login
```
          <emailProperties>_propertyName1_|_propertyValue1_|_propertyName2_| _propertyValue2_|...</emailProperties>  
        For example, gmail accounts need  
          <emailProperties>mail.smtp.starttls.enable|true</emailProperties>  
```

default tidak ada. Terima kasih kepada Rich Signell.
    * REQUIRED: Jika Anda menggunakan EDDTableCopy atau EDDGrid Copy, Anda harus DELETE semua \\[ Login \\] /copy / direktori dan file yang mengandung "xh" di direktori atau nama file setelah menghentikan lama ERDDAP™ dan sebelum memulai yang baru ERDDAP™ sehingga file-file tersebut akan dibatalkan kembali. Meme it Saya sangat maaf, tetapi penting untuk membuat perubahan dan semoga mempengaruhi beberapa admin dan beberapa file.
Di Linux, Anda dapat menemukan file ini dengan, cd \\[ Login \\] Login
Sitemap\\*Login\\*  
Di Windows, Anda dapat menemukan file ini dengan, Mulai | Login
Apa yang ingin Anda cari: Dokumen
Semua atau bagian dari nama file: xh
Lihat di: Jelajahi -&gt; \\[ Login \\] Login
Klik pada 'Pilihan'
^A untuk memilih mereka semua
Del untuk menghapus mereka semua
    * PERSYARATAN: Dalam datasets.xml , untuk dataset EDDTableDariDatabase, untuk variabel tanggal dan timestamp, mengubah data Jenis untuk ganda dan unit untuk detik sejak 1970-01T00:00Z. Kami MEMBUTUHKAN bahwa Anda menyimpan data timestamp di database\\*Login\\*zona waktu. Tanpa informasi zona waktu, pertanyaan yang Meme it ERDDAP™ mengirim ke database dan hasil yang Meme it ERDDAP™ mendapatkan dari database melalui JDBC adalah ambiguous dan kemungkinan akan salah. Kami mencoba, tetapi tidak menemukan cara yang andal untuk menangani data "timestamp tanpa timezone". Kami pikir ini adalah praktik yang baik pula. Setelah semua, data "timestamp tanpa zona waktu" memiliki zona waktu yang tidak tersirat. Meskipun sangat bagus bahwa zona waktu jelas ke admin database, masuk akal untuk menentukannya secara eksplisit sehingga perangkat lunak lain dapat berinteraksi dengan database Anda. Terima kasih/sorry Michael Urzen.
    * RECOMMENDED TINGGI: Dalam datasets.xml Untuk mengaktifkan halaman web .subset untuk mencari dataset tabel Anda, Anda perlu menambahkan [&lt; subsetVariables Sitemap (/docs/server-admin/datasets#subsetvariables) untuk atribut global dataset.
    * Sitemap datasets.xml jika Anda memiliki dataset dengan Meme it datasetID ="pmelGtsppp", mohon gantinya
```
          <dataset type="EDDTableFromDapSequence" datasetID="pmelGtsppp" active="false">  
        Whether or not you had that dataset, feel free to add this new GTSPP dataset:  
          <dataset type="EDDTableFromErddap" datasetID="erdGtsppBest">  
            <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGtsppBest</sourceUrl>  
          </dataset>
```
    * Sitemap datasets.xml , ada opsi valid baru untuk [&lt;cdm\\_data\\_type&gt;] (/docs/server-admin/datasets#cdm_data_type) atribut global, jadi Anda harus meninjau/ mengubah nilai untuk dataset Anda.
    * Sitemap datasets.xml Sitemap&lt;sumberNeedsExpandedFP\\_EQ&gt;] (/docs/server-admin/datasets#internet) membantu jika server sumber tidak ditangani secara konsisten &_variable_\\=_value_ menguji dengan benar (karena [kesulitan umum pengujian kualitas nomor titik mengambang](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/) ) Sitemap WordPress.org diatur untuk benar secara default (pengaturan paling aman) Anda tidak perlu melakukan perubahan.
    * Login [Login](/docs/server-admin/datasets#eddtablefromasciifiles) Sitemap Terima kasih kepada Jerry Yun Pan.
    * Login [Sitemap](/docs/server-admin/datasets#eddtablefromthreddsfiles) Sitemap Terima kasih kepada Roy Mendelssohn.
    * Perubahan [Login](/docs/server-admin/datasets#eddtablefromncfiles) biarkan digunakan dengan berbagai file yang lebih luas.
    * EDDTableDariBMDE telah dinonaktifkan. Tidak ada lagi sumber data aktif, tepat,.
    * Di GenerateDatasetXml, yang baru EDDGrid Sitemap Katalog memanen seluruh katalog THREDDS (atau subset) dan menghasilkan datasets.xml Login Berkat proyek UAF.
    * Login Xml dan DasDds sekarang juga menempatkan hasil mereka dalam \\[ Login \\] Login Berkat Rich Signell dan Charles Carleton.
    * Banyak perbaikan ke sistem login. Terima kasih kepada POST.
*    **Sitemap ERDDAP™ Login Perlu Tahu dan Lakukan:** 
    * Ada perubahan di direktori /WEB-INF/lib/. Silakan ubah pengaturan javac dan java classpath Anda sesuai.
    * Sitemap \\[ Login Sitemap \\] Layanan /erddap/versi untuk menentukan versi dari ERDDAP Sitemap Jawabannya adalah teks, misalnya, ERDDAP \\_versi=1.24 Jika Anda mendapatkan pesan kesalahan HTTP 404 Not-Found, memperlakukan ERDDAP™ sebagai versi 1.22 atau lebih rendah. Terima kasih kepada POST.
*    **Perubahan Kecil dan Perbaikan Bug:** 
    
    * Login Jadi perubahan:
        * dukungan Dropped untuk membaca IOOS SOS Login
        * Dukungan tambahan untuk membaca IOOS SOS Sitemap (Sitemap SOS server saat ini tidak didukung.) 
        * Banyak perubahan yang berkaitan dengan IOOS SOS Login
        * Dukungan tambahan untuk pertanyaan BBOX untuk IOOS SOS Login OOSTethys   SOS server. Perubahan ini menghasilkan kecepatan besar untuk permintaan data yang relevan. Terima kasih IOOS SOS Sitemap
    * Teks .mat file data tabel sekarang disimpan dengan benar. Terima kasih kepada Roy Mendelssohn.
    *    WMS 
        *    OpenLayers sekarang dibundel dengan ERDDAP™ untuk digunakan pada WMS halaman web. Ini memperbaiki masalah yang disebabkan ketika OpenLayers mengubah beberapa bulan yang lalu dan mencegah masalah masa depan.
        * Sitemap WMS   GetCapabilities respon,&lt;Sitemap URL WMS Sitemap Charlton Galvarino
        * Legenda ditampilkan di WMS halaman web untuk menunjukkan bilah warna. Berkat Walikota Emilio.
    *    EDDGrid Konstruktor AggregateExistingDimensi memiliki masalah jika sumber sumbu Nilai tidak sama dengan tujuan mereka Nilai, misalnya, jika waktu sumber adalah sesuatu selain "seconds since 1970-01-01" Sitemap Sitemap Todd Login
    * Di TableWriterGeoJson, kelebihan ',' setelah bbox \\[ Login \\] telah dihapus. Salam Williams
    * Banyak perubahan kecil dan perbaikan bug.
    
## Versi 1.22{#version-122} 
 (dirilis 2009-07-05) 

* Bug SlideSorter diperkenalkan pada tahun 1.20 tetap.
* bug OBIS diperkenalkan di 1.20 tetap.
* Referensi ke Jasonset data pada gambar/gadgets/GoogleGadgets halaman dihapus.
     
## Versi 1.20{#version-120} 
 (dirilis 2009-07-02) 

*    ERDDAP™ administrator, tambahkan ini ke file setup.xml Anda:
```
    <!-- If you want to restrict access to some datasets, you need to 
    specify the method used for logging on (authentication). See the info 
    at https://erddap.github.io/setup.html#security
    Currently, the options are: "" (logins not supported, the default),
    "custom", "openid". Note that openid login doesn't work when testing 
    with localhost (https://127.0.0.1:8443).
    -->
    <authentication></authentication>
    
    <!-- This specifies how you have stored passwords in the roles tags 
    in datasets.xml. If you aren't storing any passwords this is irrelevant.
    The options (in order of increasing security) are: "plaintext", "MD5", 
    or "UEPMD5" (MD5(UserName:ERDDAP:Password), the default).
    You should only use "plaintext" or "MD5" if you need to match values 
    stored that way in an external password database.  See the info at
    https://erddap.github.io/setup.html#security
    -->
    <passwordEncoding>UEPMD5</passwordEncoding>
    
    <!-- This determines whether datasets that the user doesn't currently
    have access to (because he isn't logged in or because his roles don't
    allow access) should be shown on lists of data sets 
    (e.g., from full text search, categorize, view all datasets, ...).
    The options are: "true", or "false" (the default).
    If false, no information about the dataset (even its existence) is 
      shown to users who don't have access to it.
    If true, some information about the dataset (title, summary, etc) is
      shown to users who don't have access to it.  
      If the user clicks on a link to a dataset he doesn't have access to,
      he will get an error message and be prompted to log in.
    -->
    <listPrivateDatasets>false</listPrivateDatasets>
    
    <!-- If the number of requests between two runs of LoadDatasets 
    exceeds unusualActivity, an email is sent to emailEverythingTo.
    The default is 10000.
    -->
    <unusualActivity>10000</unusualActivity>
```

* Jenis dataset baru [ EDDGrid Login](/docs/server-admin/datasets#eddgridcopy) Login [Login](/docs/server-admin/datasets#eddtablecopy) membuat dan memelihara salinan lokal lain EDDGrid atau dataset EDDTable dan melayani data dari salinan lokal. Ini sangat mudah digunakan dan sangat efektif **solusi untuk beberapa masalah terbesar dengan melayani data dari sumber data jarak jauh:** 
    
    * Mengakses data dari sumber data jarak jauh dapat lambat (untuk berbagai alasan) Sitemap
    * Dataset jarak jauh kadang-kadang tidak tersedia (lagi, untuk berbagai alasan) Sitemap
    * Mengandalkan satu sumber untuk data tidak skala dengan baik (e.g., ketika banyak pengguna dan banyak ERDDAP memanfaatkannya) Sitemap
    
Plus, salinan lokal adalah cadangan asli, yang berguna dalam hal sesuatu terjadi pada aslinya.
    
Tidak ada yang baru tentang membuat salinan lokal dataset. Apa yang baru di sini adalah bahwa kelas-kelas ini membuatnya Meme it\\*Sitemap\\*untuk membuat dan\\*Login\\*salinan lokal data dari\\*Login\\*jenis sumber data jarak jauh dan\\*metadata\\*sementara menyalin data.
    
Jenis dataset ini adalah bagian dari serangkaian fitur lengkap yang menyederhanakan penciptaan [grids/clusters/federasi ERDDAP Login](/docs/server-admin/scaling) untuk menangani beban yang sangat berat (e.g., di pusat data) Sitemap
    
* Jenis dataset baru [Login](/docs/server-admin/datasets#eddtablefromdatabase) mendapatkan data dari tabel database lokal atau jarak jauh.
*    ERDDAP™ Sitemap [Login](/docs/server-admin/additional-information#security) sistem yang mendukung otentikasi (membiarkan pengguna masuk) dan otorisasi (memberikan akses ke dataset pribadi tertentu) Sitemap
* Sitemap [dua, baru, alat baris perintah](/docs/server-admin/datasets#tools) Sitemap ERDDAP™ administrator menghasilkan XML untuk dataset baru dalam datasets.xml Sitemap
    * Login Xml dapat menghasilkan draft kasar dari XML dataset untuk hampir semua jenis dataset.
    * DasDds membantu Anda mengulangi tes dan memperbaiki XML untuk dataset. ERDDAP Sitemap Halaman web Xml telah dihapus. Untuk alasan keamanan, mereka hanya mendukung beberapa jenis dataset. Alat baris perintah baru adalah solusi yang lebih baik.
* Login [halaman status](/docs/server-admin/additional-information#status-page) memungkinkan siapa pun (tetapi administrator yang tidak mungkin) melihat status ERDDAP™ dari setiap browser dengan pergi ke Meme it \\[ Login \\]  /erddap/status.html Sitemap
* Tabledap sekarang mendukung [fungsi server-side](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#functions) Sitemap
    * Login () menghapus baris duplikat dari meja respons,
    * Login orderBy  (Login) memungkinkan Anda menentukan bagaimana tabel respons harus diurutkan,
    * Login orderByMax  (Login) memungkinkan Anda menentukan bagaimana tabel respons harus diurutkan dan menghapus semua baris kecuali untuk baris dengan nilai maksimum dalam kolom tertentu terakhir. Ini dapat digunakan, misalnya, untuk mendapatkan data yang tersedia terakhir untuk setiap stasiun.
* Tabular dataset sekarang dapat mencakup variabel tanggal waktu tambahan yang tidak dinamakan "time" Sitemap Variabel ini diakui oleh metadata "units" mereka, yang harus mengandung " since "   (untuk tanggal numerik Login) atau "yy" atau "YY" (untuk diformat String dateTimes) Sitemap Tapi jangan gunakan destinationName   "time" untuk tanggal utama variabel waktu.
*    ERDDAP™ sekarang menghasilkan [Login](/docs/server-admin/additional-information#sitemapxml) file, yang memberitahukan mesin pencari yang Anda ERDDAP hanya perlu merangkak setiap bulan. ERDDAP™ administrator, ikuti [petunjuk ini](/docs/server-admin/additional-information#sitemapxml) untuk memberitahukan mesin pencari tentang file sitemap.xml baru.
*    ERDDAP Pesan kesalahan sekarang jauh lebih pendek dan diarahkan kepada klien (Login) Sitemap Salam Williams
* Sitemap&lt;Login (/docs/server-admin/datasets#requestblacklist) sekarang juga mendukung alamat IP di mana nomor terakhir telah diganti dengan \\ *.
* Permintaan .json dan file .geoJson sekarang dapat mencakup opsional [Login](https://niryariv.wordpress.com/2009/05/05/jsonp-quickly/) permintaan dengan menambahkan "& .json p=_functionName_" untuk akhir query. Pada dasarnya, ini hanya memberitahu Meme it ERDDAP™ untuk menambahkan "_functionName_ (" untuk awal respons dan ") " untuk akhir respons. Jika awalnya tidak ada query, meninggalkan "&" di pertanyaan Anda. Salam Williams
* Banyak statistik baru ditambahkan ke [Laporan harian](/docs/server-admin/additional-information#daily-report) Sitemap
* Di halaman web dengan daftar dataset, institusi, dan id sekarang di sebelah kanan. Ini bergerak berlangganan dan kolom lain yang lebih berguna untuk melihat pada layar komputer sempit.
* Di semua halaman web, judul halaman (berdasarkan halaman&lt;judul&gt; di&lt;startHeadHtml&gt; yang Anda tentukan dalam setup.xml) dimodifikasi untuk menyertakan deskripsi yang lebih baik dari halaman web (misalnya, dengan menyertakan judul dan institusi dataset saat ini) Sitemap
* Informasi Xmx sekarang disertakan dengan informasi memori yang dicetak dalam log.txt, Laporan Harian, dan status.html. Berkat Ellyn Montgomery.
*    ERDDAP™ memiliki perlindungan tujuan umum terhadap semua kesalahan (Login) Sitemap Terima kasih kepada Charles Carleton.
* Peningkatan penanganan kesalahan jika respons telah dilakukan.
* IMPROVED: EDDTableDariFiles dan EDDGrid DariFiles sekarang hanya memungkinkan&lt;metadataDari&gt; pertama atau terakhir. tidak lagi didukung. Dan pertama dan terakhir sekarang didasarkan pada terakhirModifiedTime file.
* Perbaikan bug: di EDDTableDari SOS Informasi yang tidak valid untuk satu stasiun melemparkan pengecualian dan menyebabkan seluruh dataset ditolak. Sekarang, stasiun tersebut hanya diabaikan (dan pesan kesalahan masuk ke log.txt) Sitemap Terima kasih kepada Rick Blair.
     

## Versi 1.18{#version-118} 
 (dirilis 2009-04-08) 

* Perbaikan bug: Mulai dari 1.14, Formulir Akses Data EDDTable dan Membuat halaman web Graph tidak benar menangani batasan yang dikutip.
* Perbaikan bug: Mulai dari 1.14, EDDTableDariDapSequence tidak menangani batasan waktu dengan benar jika unit waktu sumber tidak "detik sejak 1970-01T00:00".
     

## Versi 1.16{#version-116} 
 (dirilis 2009-03-26) 

*    ERDDAP™ administrator:
    * Ini adalah rilis penting karena memperbaiki bug yang meninggalkan ERDDAP™ thread berjalan jika Anda menggunakan Tomcat Manager untuk Stop/Start atau Reload ERDDAP Sitemap Jadi ketika Anda menginstal 1.16, jangan hanya menggunakan manajer Tomcat untuk menganggur lama ERDDAP™ dan menyebarkan baru ERDDAP Sitemap Sitemap **undeploy tua ERDDAP™ , restart Tomcat (atau server) , kemudian menyebarkan baru ERDDAP Sitemap** Ini selalu ide yang baik untuk melakukannya ketika menginstal versi baru.
    * Promo&lt;Login&lt;Login (/docs/server-admin/datasets#requestblacklist) Anda datasets.xml Sitemap Ini dapat digunakan untuk menentukan daftar alamat IP klien untuk diblokir (e.g., untuk mengeluarkan Denial serangan Layanan atau robot web yang terlalu zealous) Sitemap
* Sitemap \\[ Login \\] /log direktori untuk memegang ERDDAP™ Login Ketika Anda mulai ERDDAP™ , itu membuat salinan arsip log.txt dan log. txt.previous file dengan cap waktu. Jika ada masalah sebelum restart, mungkin berguna untuk menganalisis file ini.
*    ERD Sitemap ERDDAP™ sekarang memiliki sistem berlangganan menyala.
*    ERDDAP™ sekali lagi memungkinkan (tapi masih tidak merekomendasikan Meme it) "%26" pengkodean "&" di URL permintaan (Login [perubahan v1.14 terkait](#percent26) ) Sitemap
* Beberapa tambahan baru ke bagian Tally [Laporan harian](/docs/server-admin/additional-information#daily-report) Sitemap
* Perbaikan bug kecil dalam menghasilkanDatasetXml.
* Beberapa perbaikan bug kecil.
     

## Versi 1.14{#version-114} 
 (dirilis 2009-03-17) 

* Perubahan untuk pengguna:
    * Dalam permintaan data grid, ERDDAP™ dukungan sekarang: [Login](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#last) di mana n adalah bilangan integer indeks dan [ (Sitemap) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#lastInParentheses) di mana d adalah nilai numerik (untuk waktu, dalam beberapa detik) Sitemap
    * Dalam permintaan data tabel, kontratraints String sekarang memerlukan [kutipan ganda](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#QuoteStrings) di sekitar nilai, misalnya, &id="NDBC40121" Ini diperlukan oleh Meme it DAP protokol.
    * Dalam permintaan data tabel, ERDDAP™ sekarang membutuhkan Meme it [semua kendala menjadi benar persen dikodekan](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#PercentEncode) Sitemap Browser melakukan ini secara otomatis, sehingga sebagian besar mempengaruhi program komputer/script yang mengakses ERDDAP Sitemap
#### Persentase26{#percent26} 
*    [Sitemap](#percent26) Login [Sitemap](https://coastwatch.pfeg.noaa.gov/erddap/images/embed.html) dan [ ERDDAP™ Google Login](https://coastwatch.pfeg.noaa.gov/erddap/images/gadgets/GoogleGadgets.html) mengatakan untuk menggantikan "&" di URL gambar dengan "% 26". Dari saat ini, Anda harus mengganti "&" di URL gambar dengan "&amp;". Jadi Anda perlu mengganti "% 26" di halaman web yang ada dan Google Gadgets dengan "&amp;". (Login) 
*    ERDDAP™ administrator, silahkan:
    * Tambahkan berikut ke Anda [WordPress.org](/docs/server-admin/deploy-install#setupxml) Login (dan mengubah bendera Nilai KeyKey) Sitemap
```
        <!-- ERDDAP™ has a service that lets remote users set a flag
        to notify ERDDAP™ to try to reload a dataset.
        These requests use a key which is generated based
        on baseUrl/warName, a datasetID, and flagKeyKey.
        \\*\\*\\* Change this once, to any text (a favorite quote? random text? 
        It doesn't matter). Normally, you won't ever change this again.
        But if you think someone is abusing the flag system,
        change this text again, restart ERDDAP™, and send
        all of the users of the flag system the relevant new flagKeys
        (see the list in the Daily Report). -->
        <flagKeyKey>A stitch in time saves nine. CHANGE THIS!!!</flagKeyKey>
        
        <!-- ERDDAP™ has an email/URL subscription system which sends a user
        an email or pings a url whenever a dataset of interest changes.
        (This is different from the RSS system, which is always active.)
        The system relies on the server being able to send out 
        emails to people to validate their subscription requests.
        The emails appear to come from the emailFromAddress below.
        So if your server can't send out emails, don't make this system active.
        You may choose (for whatever reason) to make this system active or not, 
        so valid values below are "true" (the default) and "false".
        Note that if you change this and restart ERDDAP™, the list of 
        subscriptions (in \\[bigParentDirectory\\]/subscriptionsV1.txt) isn't
        affected. See also the subscriptionEmailBlacklist in datasets.xml.
        -->
        <subscriptionSystemActive>true</subscriptionSystemActive>  
```

    * Di garis setelah&lt;Login [WordPress.org](/docs/server-admin/deploy-install#setupxml) file, tambahkan
```
        <emailPassword>_myPassword_</emailPassword> <!-- optional; if absent, emails can't be sent to non-local addresses -->  
```
dan masukkan kata sandi Anda.
    * Anda dapat mengubah&lt;wmsSampleBBox [WordPress.org](/docs/server-admin/deploy-install#setupxml) file untuk menyertakan nilai longitude hingga 360, misalnya,
```
        <!-- The bounding box values are 
           minLongitude,minLatitude,maxLongitude,maxLatitude.
           Longitude values within -180 to 180, or 0 to 360, are now okay. -->
        <wmsSampleBBox>0,-75,360,75</wmsSampleBBox>  
```

    * Sitemap datasets.xml file, nama ulang jenis dataset EDDTableDariNc4DFiles ke EDDTableDariNcFiles (yang sekarang mendukung file dengan sejumlah dimensi) Sitemap Jika Anda memiliki dataset EDDTableDariNc4DFiles:
        
        1. Anda HARUS berubah menjadi tipe="EDDTableDariNcFiles" di dataset Anda. XML API
        2. Anda MUST menambahkan&lt;Sitemap 4 Artikel&lt;/nDimensi&gt; tag ke XML dataset.
        3. Anda dapat menambahkan yang baru&lt;sortFilesBySourceNames&gt; tag untuk menentukan urutan internal untuk file, yang menentukan urutan keseluruhan data yang dikembalikan.
        
Untuk detail, lihat [Login](/docs/server-admin/datasets#eddtablefromfiles) Sitemap
    * Di masa lalu, untuk EDDTableDariDapSequence, untuk OPeNDAP Server DRDS, di datasets.xml , kami digunakan&lt;sourceCanConstrainStringsRegex&gt; ~=&lt;Login Tapi kita sekarang melihat bahwa dukungan regex DRDS lebih terbatas daripada ERDDAP 's, jadi kami merekomendasikan&lt;Login&lt;/sourceCanConstrainStringRegex&gt; sehingga kendala regex tidak dilewati ke sumber, tetapi bukan ditangani oleh ERDDAP Sitemap
    * Revamped penanganan sumberCanConstrain ... Sitemap datasets.xml Sitemap [Login](/docs/server-admin/datasets#eddtablefromdapsequence) Login (Sitemap) semua jenis dataset EDDTable. Sistem baru lebih sederhana dan lebih mencerminkan variabilitas sumber data yang berbeda. Anda mungkin perlu memodifikasi XML untuk set data Anda datasets.xml Sitemap
* Ada beberapa fitur baru yang berguna oleh diri mereka sendiri, tetapi ketika dikombinasikan, juga memfasilitasi penciptaan [grids/clusters/federasi ERDDAP Login](/docs/server-admin/additional-information#grids-clusters-and-federations) Sitemap
    * Jenis dataset baru:
        *    [ EDDGrid Login](/docs/server-admin/datasets#eddfromerddap) Login [Login](/docs/server-admin/datasets#eddfromerddap) yang memungkinkan seseorang Meme it ERDDAP™ menyertakan dataset dari yang lain ERDDAP™ dengan cara yang sangat sederhana dan sangat efisien.
        *    [ EDDGrid Login](/docs/server-admin/datasets#eddgridfromfiles)   (dan kelasnya, [ EDDGrid Login](/docs/server-admin/datasets#eddgridfromncfiles) yang dapat dibaca NetCDF   .nc GRIB .grb, dan HDF   .hdf Login) Sitemap
        *    [Login](/docs/server-admin/datasets#eddtablefromncfiles) yang dapat dibaca NetCDF   .nc yang memiliki struktur seperti meja.
    * RunLoadDataset dan LoadDatasets direvisi sehingga ERDDAP™ sangat responsif untuk memuat ulang dataset berdasarkan file di [Login](/docs/server-admin/additional-information#flag) Login&lt;5 detik jika loadDataset utama saat ini dilakukan).
    * Layanan baru untuk memungkinkan [URL untuk membuat file bendera](/docs/server-admin/additional-information#set-dataset-flag) untuk dataset tertentu, misalnya,
    ```
        https://coastwatch.pfeg.noaa.gov/erddap/setDatasetFlag.txt?datasetID=rPmelTao&flagKey=123456789  
    ```
membuat file bendera di direktori bendera untuk rPmelTao (meskipun bendera Kunci di sini salah) Sitemap
    * Login [Login](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions) layanan sehingga setiap klien dapat menentukan tindakan yang akan dilakukan ketika dataset tertentu dibuat (Sitemap ERDDAP™ direstart) dan setiap kali perubahan dataset dengan cara apapun. Sistem ini dapat dinonaktifkan melalui&lt;berlanggananSystemActive&gt; di Anda [WordPress.org](/docs/server-admin/deploy-install#setupxml) Login Login ERDDAP™   [Laporan harian](/docs/server-admin/additional-information#daily-report) sekarang daftar semua langganan dan termasuk URL yang diperlukan untuk membatalkan setiap satu, jika Anda merasa sistem disalahgunakan. Sitemap datasets.xml , ada yang baru, opsional [&lt;Login Login (/docs/server-admin/datasets#subscriptionemailblacklist) tag sehingga administrator dapat menentukan daftar alamat email yang dipisahkan comma yang segera didaftarkan dari sistem berlangganan.
    * Sitemap&lt;Login (/docs/server-admin/dataset#onchange) atribut datasets.xml Sitemap ERDDAP™ administrator menentukan tindakan yang akan dilakukan ketika dataset tertentu diciptakan (Sitemap ERDDAP™ direstart) dan setiap kali perubahan dataset dengan cara apapun.
    * Peningkatan pencarian teks penuh: menyimpan string pencarian untuk setiap dataset sekarang menggunakan 1/2 memori. Algoritme pencarian (Boyer-Moore-seperti) sekarang 3X lebih cepat.
    * Sitemap ERDDAP™ sekarang selalu menunda subjek dan konten dengan Meme it \\[ Login Sitemap \\] sehingga akan jelas yang Meme it ERDDAP™ ini datang dari (jika Anda memberikan beberapa ERDDAP Login) Sitemap
    * Pengambilan statistik yang lebih luas untuk [Laporan harian](/docs/server-admin/additional-information#daily-report) Sitemap
    * Login \\[ Login \\] /emailLogYEAR-MM-DD.txt log semua email yang dikirim oleh ERDDAP™ setiap hari. Ini sangat berguna jika server Anda tidak dapat benar-benar mengirim email -- Anda setidaknya dapat membacanya di log.
    *    ERDDAP™ Sitemap \\[ Login \\] Login ( datasetID ) direktori untuk setiap dataset karena mungkin ada banyak file yang tersimpan.
* Login [ RSS 1 Artikel](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions) feed untuk setiap dataset (cari oranye RSS ikon pada daftar dataset, Formulir Akses Data, dan Buat halaman web Graph) Sitemap
*    EDDGrid   .kml respon sekarang menggunakan gambar ubin ("superoverlays" - gambar quadtree yang dihasilkan secara dinamis) Sitemap Gambar awal memuat ke GoogleEarth jauh lebih cepat daripada sebelumnya. Resolusi peta meningkat saat Anda memperbesar, hingga resolusi penuh dataset. Rekomendasi: pengguna harus meminta .kml untuk satu titik waktu, tetapi seluruh dataset, rentang ketinggian. Sayangnya, dukungan untuk rentang waktu dihapus (Saya berharap itu akan kembali Meme it) Sitemap
*    ERDDAP™ Sitemap [Kedaluwarsa dan header max-age Cache-Control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control) untuk semua file yang diminta dari direktori / gambar. Ini sangat mengurangi jumlah permintaan file statis yang dikirim ke ERDDAP dan dengan demikian sangat mempercepat ERDDAP™ Sitemap Juga, banyak Java Referensi file Script pindah ke bagian bawah halaman HTML mereka, yang juga mempercepat banyak ERDDAP™ Sitemap Berkat buku "High Performance Web Sites" oleh Steve Souders dan ySlow tambahan untuk FireBug plugin di FireFox.
*    ERDDAP™ beralih dari netcdf-java 2.2.22 ke netcdf-java 4.0. Di antara lain, ini memungkinkan EDDGrid DariNcFiles untuk membaca HDF   .hdf GRIB .grb dan NetCDF   .nc Login
*    EDDGrid Sitemap EDDGrid DariNcFiles sekarang juga mendukung DArray (serta DGrid)   dataVariable Sitemap Jika dimensi tidak memiliki variabel koordinat yang sesuai, ERDDAP™ menciptakan variabel sumbu dengan nilai indeks (g., 0, 1, 2, ..., 311, 312) Sitemap Jadi semua aspek lain EDDGrid tetap sama:
Sitemap Ini masih melayani semua set data sebagai Grid, dengan variabel sumbu untuk setiap dimensi.
Sitemap Kueri masih dapat meminta nilai dari variabel sumbu.
Terima kasih kepada Charles Carleton, Thomas Im, Dorian Raymer, dan lainnya.
* Login WMS   OpenLayers halaman sekarang memiliki garis bujur default, rentang ketinggian yang sedikit lebih besar daripada rentang dataset (tidak rentang yang tepat, sehingga konteks set data kecil lebih jelas) Sitemap Kisaran default mungkin sekarang juga 0 sampai 360, yang memungkinkan berbagai macam dataset untuk ditampilkan sekarang. Sitemap Todd Login
* Slider baru pada beberapa Formulir Akses Data dan Membuat halaman web Graph. Mereka menyederhanakan (Login) spesifikasi data yang diinginkan dan menawarkan umpan balik visual yang baik.
* Pilihan baru untuk&lt;Login Sitemap datasets.xml Sitemap [aktif="false"](/docs/server-admin/datasets#active) Sitemap
* Indeks ERD Sitemap ERDDAP™ JPG PNG BMP GIF 3 MB (masih bekerja melalui proxy) ke wallwatch.pfeg (Login) Sitemap
* Dukungan baru untuk [ data\\_min Login data\\_max ](/docs/server-admin/datasets#data_min-and-data_max) atribut metadata variabel.
* Solusi parsial untuk [WaitThenTryAgain / Pengecualian Hasil Partial](/docs/server-admin/additional-information#waitthentryagain-exception) Sitemap Sekarang, beberapa permintaan yang sebelumnya gagal ketika perubahan sumber data terdeteksi akan berhasil karena ERDDAP™ akan mengisi ulang dataset dan mengubah data secara otomatis, semua dalam konteks permintaan asli.
* Perbaikan bug: menghasilkan Login Xml dinonaktifkan dalam ERDDAP™ versi 1.12. Berkat Ellyn Montgomery untuk menunjukkan ini.
* Perubahan kecil untuk penanganan kesalahan.
* Banyak perbaikan untuk menghindari/deal dengan kondisi ras yang mungkin (i.e., kemungkinan masalah yang timbul dari sifat bertingkat multi ERDDAP ) yang menyebabkan masalah kecil, jarang terjadi.
* Sekarang, jika pesan kesalahan ditulis pada gambar, gambar hanya akan tinggal di cache untuk ~ 5-10 menit (tidak 60) Sitemap Cara Wilson
* Pesan standar ketika tidak ada data sekarang "kuis Anda diproduksi tidak ada hasil yang cocok.", yang lebih pendek, lebih akurat, dan cocok OPeNDAP server.
*    EDDGrid tidak lagi memungkinkan nilai sumbu terikat.
* Perubahan kecil untuk permintaan .ver dan .help.
* Banyak perubahan kecil dan perbaikan bug.
     

## Versi 1.12{#version-112} 
 (dirilis 2008-10-31) 

* Login SOS sekali lagi bekerja dengan NDBC SOS dan bekerja dengan NOS baru SOS Sitemap
* EDDTableDariBMDE sekarang membutuhkan ERDDAP™ admin untuk menentukan dataVariable Sitemap
*    EDDGrid tidak lagi membutuhkan lat dan lon secara merata untuk . Login Login .kml Sitemap Sitemap Todd Login
* Beberapa perubahan kecil.
     

## Versi 1.10{#version-110} 
 (dirilis 2008-10-14) 

* metadata "colorBar" baru untuk variabel data dalam datasets.xml mendefinisikan pengaturan bar warna default untuk grafik dan peta. Sitemap [Sitemap](/docs/server-admin/datasets#color-bar-attributes) Sitemap Hal ini penting karena sangat meningkatkan penampilan grafik dan peta default yang diproduksi oleh Membuat Grafik dan karena grafik dan peta default sekarang memiliki bar warna yang konsisten bahkan ketika klien mengubah waktu yang diminta atau rentang geografis. Juga, ini diperlukan untuk Meme it WMS Sitemap
*    ERDDAP™ sekarang melayani sebagian besar data grid melalui WMS Sitemap Hal ini penting karena menunjukkan bahwa, selain mendapatkan data dari banyak jenis server data, ERDDAP™ dapat mendistribusikan data melalui protokol yang berbeda ( DAP Login WMS ... lebih di masa depan) Sitemap Sitemap [Dokumentasi klien](https://coastwatch.pfeg.noaa.gov/erddap/wms/documentation.html) Sitemap Sitemap [dokumentasi untuk administrator](/docs/server-admin/datasets#wms) Sitemap Sitemap [coba](https://coastwatch.pfeg.noaa.gov/erddap/wms/index.html) Sitemap
* Dukungan baru untuk nilai longitude &gt; 180 in .kml Login
* New cdm\\_data\\_type: .
*    ERDDAP™ sekarang mendukung "boolean" sumber dataType. Sitemap [Sitemap](/docs/server-admin/datasets#boolean-data) Ini akan menjadi berguna untuk EDDTableDariDatabase masa depan.
* New EDDTableDariBMDE mendukung sumber data DiGIR/BMDE.
* EDVGridAxis sekarang memungkinkan turun nilai yang diurutkan. Dataset pmelOscar diperlukan ini.
*    ERDDAP™ sekarang kembali kesalahan HTTP (e.g., "404 untuk sumber daya / halaman tidak ditemukan") dalam situasi lebih, bukan halaman HTML dengan pesan kesalahan.
* Banyak perubahan/tunjuk ke ERDDAP™ Sitemap
* Banyak perubahan kecil.
* Beberapa perbaikan bug.
*    **Sitemap ERDDAP™ administrator harus melakukan upgrade ke versi ini:** 
    * Sitemap datasets.xml , untuk setiap EDDTableDari SOS dataset, perubahan "observedProperty" metadata ke "sourceObservedProperty".
    * Aturan untuk aturan axisVariable Sitemap dataVariable Sitemap destinationName Sitemap [Login](/docs/server-admin/datasets#datavariable-addattributes) Sitemap Anda perlu memeriksa nama variabel Anda valid. Baik memeriksa mereka dengan tangan, atau menjalankan Meme it ERDDAP™ dan melihat pesan kesalahan dalam laporan yang dikirimkan ke administrator.
    * Sitemap datasets.xml Jika Anda ingin variabel data grid dapat diakses melalui WMS , Anda perlu menambahkan metadata warnaBar. setidaknya, misalnya,&lt;nama att=" colorBarMinimum "tik="double"&gt;0&lt;Login
```
          <att name="colorBarMaximum" type="double">32</att>  
```
Sitemap [Sitemap](/docs/server-admin/datasets#wms) Sitemap
    * Tambahkan berikut ke Anda [WordPress.org](/docs/server-admin/deploy-install#setupxml) Login (tetapi menyesuaikannya dengan informasi Anda) Sitemap

```
        <!-- drawLand specifies the default Make A Graph setting for 
        whether the landmask should be drawn "over" (the default) or "under" 
        surface data on maps. "over" is recommended for primarily 
        oceanographic data (so that grid data over land is obscured by the 
        landmask). "under" is recommended for all other data.
        -->
        <drawLand>over</drawLand>  
        
        <!-- Information about the ERDDAP™ administrator is used for the 
        SOS and WMS servers. You MUST CHANGE these to describe your 
        installation. 
        -->
        <adminInstitution>NOAA Environmental Research 
        Division</adminInstitution>
        <adminIndividualName>Your Name</adminIndividualName>
        <adminPosition>Webmaster</adminPosition>
        <adminPhone>your-phone-number</adminPhone>
        <adminAddress>99 Pacific St, Suite 255A</adminAddress>
        <adminCity>Monterey</adminCity>
        <adminStateOrProvince>CA</adminStateOrProvince>
        <adminPostalCode>93940</adminPostalCode>
        <adminCountry>USA</adminCountry>
        <adminEmail>yourName@yourSite</adminEmail>
        
        <!-- Information about the ERDDAP™ administrator is used for ERDDAP's
        SOS server. You MUST CHANGE these to describe your installation. 
        -->
        <sosTitle>NOAA Environmental Research Division SOS</sosTitle>
        <sosAbstract>NOAA Environmental Research Division's ERDDAP™ makes 
          data from multiple sources available via the SOS 
          protocol.</sosAbstract>
        <sosKeywords>Weather, Ocean Currents, Temperature, 
          Salinity</sosKeywords>
        <sosAccessConstraints>NONE</sosAccessConstraints>
        <sosFees>NONE</sosFees>
        
        <!-- Information about the ERDDAP™ administrator is used for 
        ERDDAP's WMS server. You MUST CHANGE these to describe your 
        installation. -->
        <wmsTitle>NOAA Environmental Research Division 
        WMS</wmsTitle>
        <wmsAbstract>NOAA Environmental Research Division's ERDDAP™ makes
        data from multiple sources available via the WMS 
        protocol.</wmsAbstract>
        <wmsKeywords>Weather, Ocean Currents, Temperature, 
          Salinity</wmsKeywords> 
        <wmsAccessConstraints>NONE</wmsAccessConstraints>
        <wmsFees>NONE</wmsFees>
        <!-- For the wms examples, pick one of your grid datasets that has 
        longitude and latitude axes. The sample variable must be a variable 
        in the sample grid dataset.  The bounding box values are 
        minx,miny,maxx,maxy.
        -->
        <wmsSampleDatasetID>erdBAssta5day</wmsSampleDatasetID>
        <wmsSampleVariable>sst</wmsSampleVariable>
        <wmsSampleBBox>0,-75,180,75</wmsSampleBBox>
```

## Versi 1.08{#version-108} 
 (dirilis 2008-07-13) 

* Layanan web baru di ERDDAP™ Sitemap Login Xml, bantuan ERDDAP™ administrator dengan membuat draft kasar dari XML yang diperlukan untuk menggambarkan dataset dalam datasets.xml 
* Beberapa perubahan/bug perbaikan yang terkait dengan memungkinkan griddap untuk dilihat oleh netcdf-java sebagai server opendap, termasuk: metadata global sekarang label "NC\\_GLOBAL" (bukan "GLOBAL") Sitemap
* Login EDDGrid dan Formulir Akses Data EDDTable sekarang menggunakan informasi query di URL. Jadi, misalnya, jika pengguna pergi dari bentuk Make A Graph ke Formulir Akses Data, batasan sekarang ditransfer dengan benar.
*    tabledap 's Membuat Grafik sekarang memungkinkan batasan pada variabel String.
* EDDTable's Membuat Sebuah Grafik sekarang memungkinkan kontratraint NaN. Steve Hankin
* Perbaikan bug: Hemat EDDTable AsImage tidak benar mengenali nilai .colorbar min dan maks. Terima kasih kepada Steve Hankin
* Banyak perbaikan untuk setupDatasetsXml. Berkat Ellyn Montgomery.
* Permintaan griddap sekarang memungkinkan () - gaya meminta sedikit di luar rentang sumbu yang sebenarnya. Hal ini tepat karena () - nilai dibulatkan pada nilai aktual terdekat. Terima kasih kepada Cindy Bessey
* Saya membuat tes FloatArray dan DoubleArray lebih canggih. Ini akan selalu sempurna (karena pengujian harus disesuaikan untuk setiap dataset) tapi harus lebih baik. Meme it Berkat Ellyn Montgomery.
* Saya pindah setup.html dan setupDatasets Xml.html erddap's / download direktori dan hard coded semua link ke mereka. Sekarang, saya dapat melakukan perubahan dan memperbarui informasi pengaturan segera.
* Banyak perubahan kecil. Beberapa perbaikan bug kecil.
*    **Sitemap ERDDAP™ administrator harus melakukan upgrade ke versi ini:** 
    * Login&lt;Login Html&gt; dari pesan Anda.xml ke Anda [WordPress.org](/docs/server-admin/deploy-install#setupxml) Login Ini menentukan teks yang muncul di tengah sisi kiri ERDDAP™ Login Juga, tambahkan&lt;h1&gt; ERDDAP &lt;/h1&gt; (atau judul lain) ke bagian atasnya. Meme it **Sitemap** Login&lt;theShortDescriptionHtml [WordPress.org](/docs/server-admin/deploy-install#setupxml) Login (dari erddapContent baru .zip ) ke setup Anda.xml.
         

## Versi 1.06{#version-106} 
 (dirilis 2008-06-20) 

* Dukungan baru untuk IOOS DIF SOS sumber data.
* Banyak perubahan kecil. Beberapa perbaikan bug kecil.
     

## Versi 1.04{#version-104} 
 (dirilis 2008-06-10) 

* Fitur Slide Sorter baru.
* Halaman dan contoh Google Gadgets baru.
* Perbaikan bug dalam EDDGrid .saveAsNc untuk variabel dengan skala dan addOffset.
     

## Versi 1.02{#version-102} 
 (dirilis 2008-05-26) 

* Login EDDGrid SideBySide memungkinkan untuk berbeda axisVariable Login \\[ Sitemap \\] Login Nilai.
* Semua arus dan angin dataset digabungkan ke EDDGrid Dataset SideBySide.
* Gambar dari permintaan gambar sekarang disimpan selama 1 jam.
     

## Versi 1.00{#version-100} 
 (dirilis 2008-05-06) 

* Membuat halaman web Graph dan perintah grafis di URL.
* Dukungan untuk file bendera untuk memaksa reloading dataset.
* Jenis dataset baru: EDDTableDari4DFiles (subclass pertama EDDTableDariFiles) Sitemap
