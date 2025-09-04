---
sidebar_position: 1
---

# Pasang
Bagaimana Melakukan Penyiapan Awal ERDDAP™ pada Server Anda

 ERDDAP™ dapat berjalan pada server apapun yang mendukung Java dan Tomcat (dan server aplikasi lainnya seperti Jetty, tapi kami tidak mendukung mereka) .
 ERDDAP™ telah diuji pada Linux (termasuk di Amazon AWS) , Mac, dan Windows komputer.

*  **Docker** -- Kami menyediakan [ ERDDAP™ dalam wadah Docker](https://hub.docker.com/r/erddap/erddap) 
dan IOOS sekarang menawarkan [Panduan Awal Cepat untuk ERDDAP™ dalam kontainer Docker](https://ioos.github.io/erddap-gold-standard/index.html) .
Ini adalah standar ERDDAP™ instalasi, dalam Docker kontainer.
Melalui Docker Komposisi kami menyediakan cara-cara mudah untuk mengatur ssl dan pemantauan, membaca lebih banyak keluar [Dokumentasi dok](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md) .
Jika Anda sudah menggunakan Docker, Anda mungkin akan lebih suka versi Docker.
Jika Anda mencari untuk menjalankan pada layanan awan Anda mungkin akan lebih suka versi Docker.
*  **Amazon** -- Jika Anda memasang ERDDAP™ pada eC2 Layanan Web Amazon, lihat ini [Tampilan Layanan Web Amazon](/docs/server-admin/additional-information#amazon) pertama.
*  **Linux dan Mac** -- ERDDAP™ Bekerja dengan baik di komputer Linux dan Mac. Lihat petunjuk di bawah ini.
*  **Jendela** -- Windows baik-baik saja untuk pengujian ERDDAP™ dan untuk penggunaan pribadi (lihat instruksi di bawah) ,
tapi kami tidak menyarankan menggunakannya untuk umum ERDDAP™ Penyebaran. Berjalan ERDDAP™ pada Windows mungkin memiliki masalah:
Bisa dibilang, ERDDAP™ mungkin tidak dapat menghapus dan / atau mengubah nama berkas dengan cepat. Ini mungkin karena perangkat lunak antivirus
   (mis., dari McAfee dan Norton) yang memeriksa file untuk virus. Jika Anda mengalami masalah ini
(Yang dapat dilihat oleh pesan kesalahan dalam [log.txt](/docs/server-admin/additional-information#log) berkas seperti
"Tidak dapat menghapus"...), mengubah pengaturan perangkat lunak antivirus mungkin sebagian mengurangi masalah. Atau mempertimbangkan menggunakan sebuah Linux atau Mac server sebagai gantinya.

 **Standar ERDDAP™ instruksi instalasi untuk Linux, Mac, dan Windows komputer adalah:** 

0. Pastikan ketergantungan apapun terpasang. Pada mesin non-Windows (Linux dan Mac) , Anda perlu csh.

##  Java  {#java} 

1.  [Untuk ERDDAP™ v2.19 +, atur Java 21.](#java) 
Untuk alasan keamanan, hampir selalu terbaik untuk menggunakan versi terbaru Java 21.
Silakan unduh dan instal versi terbaru dari
    [Adoptium 's OpenJDK (Temarin) 21 (LTS) ](https://adoptium.net/temurin/releases/?version=21) .
Untuk memverifikasi instalasi, jalankan '/ javajBinDirektori / java', misalnya
'/ usr / local / jdk-21.0.3 + 9 / jre / bin / java -versi'.

    ERDDAP™ bekerja dengan Java dari sumber lain, tapi kami merekomendasikan Adoptium karena itu adalah, komunikasi utama didukung,
bebas (seperti dalam bir dan pidato) versi Java 21 yang menawarkan Dukungan Jangka Panjang (upgrade bebas selama bertahun-tahun melewati rilis awal) .
Untuk alasan keamanan, tolong perbarui ERDDAP versi dari Java berkala sebagai versi baru dari Java 21 tersedia dari Adoptium.

    ERDDAP™ telah diuji dan digunakan secara ekstensif dengan 21, bukan versi lain. Untuk berbagai alasan, kita tidak menguji dengan atau mendukung versi lain dari Java .
     
## Tomcat{#tomcat} 

2.  [Atur](#tomcat)   [Tomcat](https://tomcat.apache.org) . Tomcat adalah yang paling banyak digunakan Java Server Aplikasi,
yang mana Java perangkat lunak yang berdiri antara layanan jaringan sistem operasi dan Java perangkat lunak server seperti ERDDAP™ .
Perangkat Lunak Free and Open Source (FOSS) .

Anda dapat menggunakan lain Java Server Aplikasi (mis., Jetty) , tapi kami hanya menguji dengan dan mendukung Tomcat.

   * Unduh Tomcat dan bongkar di server atau PC Anda.
Untuk alasan keamanan, hampir selalu terbaik untuk menggunakan versi terbaru Tomcat 10 (versi 9 dan di bawah tidak dapat diterima) 
yang dirancang untuk bekerja dengan Java 21 atau lebih baru. Di bawah, direktori Tomcat akan disebut sebagai 'tomcat'.

Peringatan&#33; Jika Anda sudah memiliki Tomcat menjalankan beberapa aplikasi web lain (terutama THREDDS) , kami menyarankan agar Anda memasang ERDDAP™ in
      [Tomcat kedua](/docs/server-admin/additional-information#second-tomcat) , karena ERDDAP™ kebutuhan pengaturan Tomcat berbeda
dan tidak harus bersaing dengan aplikasi lain untuk memori.

     * Pada Linux, [unduh "Core" "tar .gz "Sumbangan Tomcat](https://tomcat.apache.org/download-10.cgi) dan membongkar itu.
Kami menyarankan membongkar dalam '/ usr / local'.
     * Pada Mac, Tomcat mungkin sudah terpasang dalam '/ Library / Tomcat', tetapi harus memperbarui ke versi terbaru Tomcat 10.
Jika kau mengunduhnya, [unduh "Core" "tar .gz "Sumbangan Tomcat](https://tomcat.apache.org/download-10.cgi) dan membongkar dalam '/ Library / Tomcat'.
     * Pada Windows, Anda dapat [unduh distribusi "Core" "zip" Tomcat](https://tomcat.apache.org/download-10.cgi) 
        (yang tidak main-main dengan daftar Windows dan yang Anda kontrol dari baris perintah DOS) Dan bongkar itu dalam direktori yang sesuai.
        (Untuk pengembangan, kami menggunakan distribusi "Core" "zip". Kami membuat direktori '/ program' dan membongkar di sana.) 
Atau Anda dapat mengunduh distribusi "Core" "64-bit Windows zip", yang memuat lebih banyak fitur.
Jika distribusi ini adalah instalasi Windows, itu mungkin akan menempatkan Tomcat sebagai contoh, '/ Program Files / apache- tom.10.0.23'.
             
### server.xml{#serverxml} 

*  [server.xml](#serverxml) - Dalam berkas 'tomcat / conf / server.xml', ada dua perubahan yang harus Anda buat untuk masing-masing dari dua ' <Connector> 'tag
   (satu untuk '&lt; Conektor port = "8080"' dan satu untuk '&lt; Conektor port = "8443"') .
   1.  (Disarankan) Meningkatkan nilai parameter 'connectionTimeout', mungkin hingga 300.000 (milidetik, yaitu 5 menit) .
   2.  (Disarankan) Tambahkan parameter baru: 'relaxedQueryChars = "[] | "'. Ini opsional dan sedikit kurang aman,
tetapi menghapus kebutuhan bagi pengguna untuk persentase-encode karakter ini ketika mereka terjadi dalam parameter dari permintaan URL pengguna.
             
### content.xml{#contentxml} 

* kontekt.xml -- Sumber Daya Cache - Dalam 'tomcat / conf / context.xml', tepat sebelum ' </Context> 'tag, ubah tag Sumber Daya
   (atau tambahkan jika belum ada) untuk mengatur cache Parameter MaxUkuran ke 80000:
  ```
  <Resources cachingAllowed="true" cacheMaxSize="80000" />
  ```
Ini menghindari berbagai peringatan di Catalina. bahwa semua dimulai dengan
  ```
  WARNING [main] org.apache.catalina.webresources.Cache.getResource Unable to add the resource at [/WEB-INF/classes/...]
  ```
         
### Timeout Apache{#apache-timeout} 

* Pada komputer Linux, ubah pengaturan waktu habis Apache sehingga waktu memakan permintaan pengguna tidak habis waktu
   (dengan apa yang sering muncul sebagai kesalahan "Proxy" atau "Bad Gateway") . Sebagai pengguna root:
  * Ubah Apache ' http berkas d.conf ' (biasanya dalam '/ etc / http d / conf / ') :
    * Ubah yang ada ' <Timeout> 'pengaturan (atau tambahkan satu di akhir berkas) ke 3600 (detik) , daripada baku 60 atau 120 detik.
    * Ubah yang ada ' <ProxyTimeout> 'pengaturan (atau tambahkan satu di akhir berkas) ke 3600 (detik) , daripada baku 60 atau 120 detik.
  * Mulai ulang Apache: '/ usr / sbin / apachectl -k anggun' (tetapi kadang-kadang dalam direktori yang berbeda) .

### Keamanan{#security} 
         
* Rekomendasi keamanan: Lihat [instruksi ini](https://tomcat.apache.org/tomcat-10.0-doc/security-howto.html) Untuk meningkatkan keamanan
instalasi Tomcat Anda, terutama untuk server publik.
         
* Untuk publik ERDDAP™ instalasi pada Linux dan Mac, adalah yang terbaik untuk mengatur Tomcat (program) sebagai milik tomcat pengguna '
   (pengguna terpisah dengan izin terbatas dan yang [tidak memiliki kata sandi](https://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password) ) .
Dengan demikian, hanya pengguna super yang bisa berubah menjadi 'tomcat'. Hal ini membuat mustahil bagi hacker untuk masuk ke server Anda sebagai pengguna 'tomcat'.
Dan dalam hal apapun, anda harus membuatnya sehingga pengguna 'tomcat' memiliki hak akses yang terbatas pada sistem berkas server (baca + write + executive
untuk pohon 'apache -tomcat' direktori dan ' <bigParentDirectory> 'dan hak baca-saja untuk direktori dengan data yang ERDDAP™ membutuhkan akses ke).
  * Anda dapat membuat akun pengguna 'tomcat' (yang tidak memiliki password) dengan menggunakan perintah:
    ```
    sudo useradd tomcat -s /bin/bash -p '*'
    ```
  * Anda dapat beralih ke bekerja sebagai pengguna 'tomcate' dengan menggunakan perintah
    ```
    sudo su - tomcat
    ```
     (Ini akan meminta Anda untuk password superuser untuk izin untuk melakukan hal ini.) 
    * Anda dapat berhenti bekerja sebagai tomcat pengguna dengan menggunakan perintah
    ```
    exit
    ````
    * Apakah sebagian besar dari sisa Tomcat dan ERDDAP™ setup instruksi sebagai pengguna 'tomcat'. Kemudian, jalankan 'startup.sh' dan 'shutdown.sh' script sebagai pengguna 'tomcat'
sehingga Tomcat memiliki izin untuk menulis ke file log nya.
    * Setelah membongkar Tomcat, dari orang tua 'apache - tomcat' direktori:
      * Ubah kepemilikan pohon apache - tomcat direktori ke pengguna tomcat.
        ```
        chown -R tomcat apache-tomcat-10.0.23
        ```
         (tetapi mengganti nama sebenarnya dari direktori tomcat Anda) .
      * Ubah "kelompok" menjadi tomcat, nama pengguna Anda, atau nama kelompok kecil yang termasuk tomcat dan semua administrator Tomcat / ERDDAP :
        ```
        chgrp -R yourUserName apache-tomcat-10.0.23
        ```
      * Ubah perizinan sehingga tomcat dan grup telah membaca, menulis, mengeksekusi hak:
        ```
        chmod -R ug+rwx apache-tomcat-10.0.23
        ```
      * Hapus izin "lain" untuk membaca, menulis, atau mengeksekusi:
        ```
        chmod -R o-rwx apache-tomcat-10.0.23
        ```
Hal ini penting, karena mencegah pengguna lain membaca informasi yang mungkin sensitif dalam ERDDAP™ setup file.

### Memori{#memory} 

Atur Variabel Lingkungan Tomcat

* Pada Linux dan Mac:
Buat berkas 'tomcat / bin / setenv.sh' (atau di Red Hat Enterprise Linux \\[ RHEL \\] , edit '~ tomcat / conf / tomcat10.conf') untuk mengatur variabel lingkungan Tomcat.
Berkas ini akan digunakan oleh 'tomcat / bin / startup.sh' dan 'shutdown'. Berkas harus berisi sesuatu seperti:
  ```
  export JAVA_HOME=/usr/local/jdk-21.0.3+9
  export JAVA_OPTS='-server -Djava.awt.headless=true -Xmx1500M -Xms1500M'
  export TOMCAT_HOME=/usr/local/apache-tomcat-10.0.23
  export CATALINA_HOME=/usr/local/apache-tomcat-10.0.23
  ```
   (tetapi mengganti nama direktori dari komputer Anda) .
   (Jika Anda sebelumnya set 'JRE _ HOME', Anda dapat menghapus itu.) 
Di Mac, Anda mungkin tidak perlu mengatur 'JAVA _ HOME'.

* Pada Windows:
Buat berkas 'tomcat' bin\\ setenv.bat 'untuk mengatur variabel lingkungan Tomcat.
Berkas ini akan digunakan oleh 'tomcat\\ bin\\ startup.bat' dan ' shutdown.bat '.
Berkas harus berisi sesuatu seperti:
  ```
  SET "JAVA_HOME=\\someDirectory\\jdk-21.0.3+9"
  SET "JAVA_OPTS=-server -Xmx1500M -Xms1500M"
  SET "TOMCAT_HOME=\\Program Files\\apache-tomcat-10.0.23"
  SET "CATALINA_HOME=\\Program Files\\apache-tomcat-10.0.23"
  ```
   (tetapi mengganti nama direktori dari komputer Anda) .
Jika ini hanya untuk pengujian lokal, hapus "-server".
   (Jika Anda sebelumnya set 'JRE _ HOME', Anda dapat menghapus itu.) 

Pengaturan memori '-Xmx' dan '-Xms' sangat penting karena ERDDAP™ Bekerja lebih baik dengan lebih banyak memori.
Selalu menata '-Xms' ke nilai yang sama seperti '-Xmx'.

* Untuk 32 bit Sistem Operasi dan 32 bit Java :
64 bit Java jauh lebih baik dari 32 bit Java , tapi 32 bit Java akan bekerja selama server tidak terlalu sibuk.
Semakin banyak memori fisik di server semakin baik: 4 + GB benar-benar bagus, 2 GB baik-baik saja, kurang tidak direkomendasikan.
Dengan 32 bit Java , bahkan dengan memori fisik berlimpah, Tomcat dan Java tidak akan berjalan jika Anda mencoba untuk mengatur '-Xmx' jauh di atas 1500 M (1200M pada beberapa komputer) .
Jika server Anda memiliki kurang dari 2GB memori, kurangi nilai '-Xmx' (dalam 'M' egaBytes) sampai 1 / 2 memori fisik komputer.

* Untuk 64 bit Sistem Operasi dan 64 bit Java :
64 bit Java hanya akan bekerja pada sistem operasi 64 bit.
  * Dengan Java 8, Anda perlu menambahkan '-d64' ke Tomcat 'CATALINA _ OPTS' parameter dalam 'setenv.bat'.
  * Dengan Java 21, Anda memilih 64 bit Java ketika Anda mengunduh versi Java ditandai "64 bit".

Dengan 64 bit Java , Tomcat dan Java dapat menggunakan pengaturan '-Xmx' yang sangat tinggi dan '-Xms'. Semakin banyak memori fisik di server semakin baik.
Sebagai saran sederhana: kami sarankan anda menata '-Xmx' dan '-Xms' ke (dalam 'M' egaBytes) ke 1 / 2 (atau kurang) memori fisik komputer.
Anda dapat melihat apakah Tomcat, Java , dan ERDDAP™ memang berjalan dalam mode 64 bit dengan mencari "bit", dalam ERDDAP Email Daily Report
atau dalam 'bigParentDirectory / log / [log.txt](/docs/server-admin/additional-information#log) 'berkas ('bigly ParentDirektori' dinyatakan dalam [setup.xml](#setupxml) ) .

#### Koleksi Sampah{#garbage-collection} 

* Masuk ERDDAP™ ' [log.txt](/docs/server-admin/additional-information#log) berkas, anda akan melihat banyak "GC (Kegagalan alokasi) "Pesan.
Ini biasanya bukan masalah. Ini adalah pesan sering dari operasi normal Java Mengatakan bahwa itu hanya menyelesaikan sampah kecil
koleksi karena kehabisan ruang di Eden (bagian dari Java stack untuk sangat muda objek) . Biasanya pesan menunjukkan Anda
'Ingat UseBefore- &gt; mengingat Useafter'. Jika kedua angka itu berdekatan, artinya koleksi sampah tidak produktif.
Pesan hanya tanda masalah jika sangat sering (setiap beberapa detik) , tidak produktif, dan jumlah yang besar dan tidak tumbuh,
yang bersama-sama menunjukkan bahwa Java membutuhkan lebih banyak memori, berjuang untuk membebaskan memori, dan tidak dapat membebaskan memori.
Ini mungkin terjadi selama masa stres, kemudian pergi. Tapi jika itu terus berlanjut, itu adalah tanda masalah.
* Jika Anda melihat 'Java.lang.OutOf MemoryError' di ERDDAP™ ' [log.txt](/docs/server-admin/additional-information#log) berkas,
lihat [OutOf MemoryError](/docs/server-admin/additional-information#outofmemoryerror) untuk tips tentang bagaimana mendiagnosa dan menyelesaikan masalah.
         
### Hak{#permissions} 

*  [Pada Linux dan Mac, ubah perizinan](#permissions) dari semua berkas '* .sh' dalam 'tomcat / bin /' untuk dieksekusi oleh pemilik:
  ```
  chmod +x *.sh
  ```

### Fonta{#fonts} 

*  [Fonta untuk gambar:](#fonts) Kami sangat suka yang bebas [Fonta DejaVu](https://dejavu-fonts.github.io/) ke yang lain Java Fonta.
Menggunakan fonta ini sangat direkomendasikan tapi tidak diperlukan.

Jika Anda memilih untuk tidak menggunakan fonta DejaVu, Anda perlu mengubah pengaturan Keluarga Sopan dalam setuppxml ke ' <fontFamily> SansSerif </fontFamily> ',
yang tersedia dengan semua Java Penyebaran. Jika Anda set ' <fontFamily> 'dengan nama fonta yang tidak tersedia, ERDDAP™ tidak akan memuat
dan akan mencetak daftar fonta yang tersedia dalam berkas 'log.txt'. Anda harus menggunakan salah satu font.

Jika Anda memilih untuk menggunakan font DejaVu, pastikan ' <fontFamily> 'setting in setup.xml is' <fontFamily> DejaVu Sans Name </fontFamily> '.

Untuk memasang fonta DejaVu, silakan unduh [DejaVuFonts .zip ](/DejaVuFonts.zip)   (5.522.795 bytes, MD5 = 33E1E61FAB 654785ED308B4FFEF42) 
dan lepaskan berkas fonta ke direktori sementara.

  * Pada Linux:
    * Untuk Linux Adoptium Java distribusinya, lihat [instruksi ini](https://blog.adoptopenjdk.net/2021/01/prerequisites-for-font-support-in-adoptopenjdk/) .
    * Dengan yang lain Java distribusi: Sebagai pengguna 'tomcat', salin berkas fonta ke dalam '$JAVA _ HOME / lib / font' jadi Java dapat menemukan font.
Ingat: jika / ketika Anda kemudian upgrade ke versi yang lebih baru dari Java , Anda perlu menginstal ulang font ini.
  * Pada Mac: untuk setiap berkas fonta, klik ganda di atasnya dan kemudian klik Pasang Fonta.
  * Pada Windows 7 dan 10: di Windows Explorer, pilih semua berkas fonta. Klik kanan. Klik Pasang.
             
### Uji Tomcat{#test-tomcat} 

* Uji instalasi Tomcat Anda.
  * Linux:
    * Sebagai pengguna "tomcat", jalankan 'tomcat / bin / startup.sh'.
    * Lihat URL Anda + ": 8080 /" dalam peramban Anda (mis., [http://coastwatch.pfeg.noaa.gov:8080/](http://coastwatch.pfeg.noaa.gov:8080/) ) .
  * Mac (jalankan tomcat sebagai pengguna administrator sistem) :
    * Jalankan 'tomcat / bin / startup.sh'.
    * Lihat URL Anda + ": 8080 /" dalam peramban Anda (mis., [http://coastwatch.pfeg.noaa.gov:8080/](http://coastwatch.pfeg.noaa.gov:8080/) ) .
Perhatikan bahwa secara default, Tomcat Anda hanya dapat diakses oleh Anda. Hal ini tidak dapat diakses publik.
  * Penginapan Windows:
    * Klik kanan pada ikon Tomcat di baki sistem, dan pilih "Mulai layanan".
    * Tilik [http://127.0.0.1:8080/](http://127.0.0.1:8080/) , atau mungkin [http://localhost:8080/](http://localhost:8080/) , dalam browser Anda. Perhatikan bahwa secara default, Tomcat Anda hanya dapat diakses oleh Anda. Hal ini tidak dapat diakses publik.

Anda harus melihat Tomcat "Selamat" halaman.

Jika ada masalah, lihat file log Tomcat di 'tomcat / log / catalina.out'.

### Masalah dengan instalasi Tomcat?{#troubles-with-the-tomcat-installation} 

* Pada Linux dan Mac, jika Anda tidak dapat mencapai Tomcat atau ERDDAP™   (atau mungkin Anda hanya tidak dapat mencapai mereka dari komputer di luar firewall Anda) ,
Anda dapat menguji apakah Tomcat mendengarkan port 8080, dengan mengetik (sebagai root) pada baris perintah server:

  ```
  netstat -tuplen | grep 8080
  ```

Itu harus kembali satu baris dengan sesuatu seperti:

  ```
  tcp 0 0 :::8080 :::* LISTEN ## ##### ####/java
  ```

   (dimana '#' adalah beberapa digit) , mengindikasikan bahwa proses 'java' (Mungkin Tomcat) adalah mendengarkan di pelabuhan "8080" untuk "tcp" lalu lintas.
Jika tidak ada baris yang dikembalikan, jika baris dikembalikan secara signifikan berbeda, atau jika dua atau lebih baris dikembalikan, maka mungkin ada masalah dengan pengaturan port.

* Lihat file log Tomcat 'tomcat / log / catalina.out'. Tomcat masalah dan beberapa ERDDAP™ Masalah awal hampir selalu ditunjukkan di sana.
Ini adalah umum ketika Anda pertama kali pengaturan up ERDDAP™ .

* Lihat [Tomcat](https://tomcat.apache.org/) situs web atau pencarian web untuk bantuan, tapi tolong beritahu kami masalah yang Anda miliki dan solusi yang Anda temukan.

* Lihat kami [daerah saat memperoleh dukungan tambahan](/docs/intro#support) .
             
###  ERDDAP™ Isi{#erddap-content} 
3.   [Atur berkas konfigurasi 'tomcat / content / erddap'.](#erddap-content) 
Pada Linux, Mac, dan Windows, unduh [erddapContent .zip ](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip) 
dan membukanya ke direktori 'tomcat', membuat 'tomcat / content / erddap'.

_ Versi 1.0.0, 20333 bytes, MD5 = 2B8D2A5E73E3A42B59C168C60B5, tanggal 2024- 10- 14 _ _

Beberapa versi sebelumnya juga tersedia:

    *  [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddapContent.zip)   (19,792 bytes, MD5 = 8F892616BAEF2F2F4BB036DC4AD7C, tanggal 2022- 02- 16) 
    *  [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddapContent.zip)   (19,792 bytes, MD5 = 8F892616BAEF2F2F4BB036DC4AD7C, tanggal 2022- 02- 16) 
    *  [2.21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddapContent.zip)   (19,810 bytes, MD5 = 1E26F62E7A06191 EE6868C40B9A2362, tanggal 2022- 10- 09) 
    *  [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddapContent.zip)   (19,810 bytes, MD5 = 1E26F62E7A06191 EE6868C40B9A2362, tanggal 2022- 12- 08) 
    *  [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddapContent.zip)   (19,810 bytes, MD5 = 1E26F62E7A06191 EE6868C40B9A2362, tanggal 2023- 02-27) 

#### Direktori Lain{#other-directory} 

Untuk Red Hat Enterprise Linux (RHEL) atau untuk situasi lain di mana Anda tidak diizinkan untuk memodifikasi direktori Tomcat atau di mana Anda ingin / perlu
untuk menempatkan ERDDAP™ direktori isi di beberapa lokasi lain untuk beberapa alasan lain (misalnya, jika Anda menggunakan Jetty bukan Tomcat) ,
unzip 'erddapContent .zip 'kedalam direktori yang diinginkan (ke mana hanya pengguna 'tomcat' memiliki akses) dan menetapkan (apa yang dikehendaki-Nya), erddapContentDirectory 'properti sistem
 (mis. ' erddapContentDirectory  =~tomcat/content/erddap ') jadi ERDDAP™ dapat menemukan direktori isi baru ini.

### setup.xml{#setupxml} 

*  [Baca komentar dalam 'tomcat / content / erddap / setupp.xml'](#setupxml) dan membuat perubahan yang diminta. setup.xml adalah berkas dengan semua pengaturan yang menentukan bagaimana Anda ERDDAP™ Berperilaku.

Untuk persiapan awal, Anda HARUS setidaknya mengubah pengaturan ini:
      * ' <bigParentDirectory> '
      * ' <emailEverythingTo> '
      * ' <baseUrl> '
      * ' <email...> 'pengaturan
      * ' <admin...> 'pengaturan
      * ' <baseHttpsUrl> ' (dan apabila kamu telah selesai (dari sesuatu), https ) 

Ketika Anda membuat Big ParentDirectory, dari direktori induk dari BigParentDirektori:

    * Membuat pengguna 'tomcat' pemilik 'bigParentDirectory':
      ```
      chown -R tomcat bigParentDirectory
      ```
    * Ubah "kelompok" menjadi tomcat, nama pengguna Anda, atau nama kelompok kecil yang termasuk tomcat dan semua administrator Tomcat / ERDDAP :
      ```
      chgrp -R yourUserName bigParentDirectory
      ```
    * Ubah perizinan sehingga tomcat dan grup telah membaca, menulis, mengeksekusi hak:
      ```
      chmod -R ug+rwx bigParentDirectory
      ```
    * Hapus izin "lain" untuk membaca, menulis, atau mengeksekusi. Ini penting untuk mencegah membaca informasi yang mungkin sensitif
in ERDDAP™ berkas log dan berkas dengan informasi tentang dataset privat.
      ```
      chmod -R o-rwx bigParentDirectory
      ```

### Variabel Lingkungan{#environment-variables} 

Dimulai dengan ERDDAP™ V2.13, ERDDAP™ administrator dapat menimpa nilai apapun dalam setup.xml dengan menspesifikasikan sebuah variabel lingkungan
bernama ' ERDDAP _ Nama Penting sebelum berjalan ERDDAP™ . Misalnya, gunakan ' ERDDAP _ BaseUrl 'menimpa' <baseUrl> 'nilai.
Hal ini dapat berguna ketika menyebarkan ERDDAP™ dengan wadah seperti Docker, karena Anda dapat menempatkan pengaturan standar dalam setup.xml
dan kemudian memasok pengaturan khusus melalui variabel lingkungan. Jika Anda memasok informasi rahasia untuk ERDDAP™ Melalui metode ini,
pastikan untuk memeriksa bahwa informasi akan tetap rahasia. ERDDAP™ hanya membaca variabel lingkungan sekali setiap startup,
pada detik pertama startup, jadi salah satu cara untuk menggunakan ini adalah: mengatur variabel lingkungan, mulai ERDDAP ,
tunggu sampai ERDDAP™ dimulai, kemudian unset variabel lingkungan.

###  datasets.xml  {#datasetsxml} 

* Baca komentar di [ **Bekerja dengan datasets.xml Berkas** ](/docs/server-admin/datasets) . Kemudian, setelah Anda mendapatkan ERDDAP™ berjalan
untuk pertama kalinya (biasanya hanya dengan data baku) , anda akan memodifikasi XML dalam 'tomcat / content / erddap / datasets.xml '
untuk menspesifikasikan semua data yang anda inginkan ERDDAP™ untuk melayani. Di sinilah Anda akan menghabiskan sebagian besar waktu Anda
ketika menyetel ERDDAP™ dan demi rembulan di waktu purnama, bahwa kalian benar-benar akan melalui beberapa masa yang semakin lama semakin dahsyat: kematian, kebangkitan dan petaka kiamat. ERDDAP™ .

Anda dapat melihat contoh [ datasets.xml di GitHub](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml) .
     
*  (Tidak mungkin) Sekarang atau (sedikit lebih mungkin) di masa depan, jika anda ingin memodifikasi berkas CSS erddap, salin
'tomcat / content / erddap / images / erdlapStart2.css' ke 'tomcat / content / erddap / images / erddap2.css' dan kemudian membuat perubahan untuk itu.
Perubahan ke 'erddap2.css' hanya berpengaruh ketika ERDDAP™ dijalankan ulang dan sering juga memerlukan pengguna untuk menghapus berkas cache peramban.
     
 ERDDAP™ tidak akan bekerja dengan benar jika setup.xml atau datasets.xml berkas bukan berkas XML yang terbentuk dengan baik. Jadi, setelah Anda mengedit file-file ini,
ide yang bagus untuk memastikan bahwa hasilnya adalah XML yang terbentuk baik dengan menempelkan teks XML ke dalam checker XML seperti [xmlvalidation](https://www.xmlvalidation.com/) .
     
### Pasang erddap. berkas perang{#install-the-erddapwar-file} 

4. Pada Linux, Mac, dan Windows, _ _ unduh [erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.28.0/erddap.war) _ ke 'tomcat / webapps':

_ Versi 2.28,0, 620,824.288 bytes, MD5 = f948b2ba623f 65a87af43da9e4c2, tertanggal 2025.08- 29 _

Berkas .war besar karena berisi resolusi tinggi garis pantai, batas, dan elevasi data yang diperlukan untuk membuat peta.

Beberapa versi sebelumnya juga tersedia.

   *  [2.17](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddap.war)   (551.068.245 bytes, MD5 = 5Fea912B5D42E5EAB951F73EA848D, tertanggal 2022-02-16) 
   *  [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddap.war)   (551.069.844 bytes, MD5 = 461325E97E7777EC671DCFB8B, tertanggal 20222- 0223) 
   *  [2.21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddap.war)   (568.644.411 bytes, MD5 = F2CFF805934E49FDB5B6, tertanggal 202222- 10- 09) 
   *  [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddap.war)   (567.742.765 bytes, MD5 = 2B334F6332421AE2CF4DA6D0, tertanggal 202222-12-08) 
   *  [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddap.war)   (572.124.953 bytes, MD5 = D843A043C506725EB6F8EFDCCA8FD5F, tanggal 2023-03-03-03) 
   *  [2.24](https://github.com/ERDDAP/erddap/releases/download/v2.24/erddap.war)   (568.748.187 bytes, MD5 = 970fbee172e8b8a0756ec8888, tanggal 2024-06-07) 
   *  [2.25](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)   (592,292,039 bytes, MD5 = 652AFC9D1421F00B5789DA2C4732D4C, tanggal 2024-11- 07) 
   *  [2.26](https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war)   (607.404.032 bytes, MD5 = 99a725108b377708542096616a119, tanggal 2025- 03- 31) 
   *  [2.27,0](https://github.com/ERDDAP/erddap/releases/download/v2.27.0/erddap.war)   (620,54.403 bytes, MD5 = 3b2086659ee4145ca2d47bf4ef7, tanggal 2025- 06-11) 

### Atur proksi (spesifik penyebaran)  {#proxy} 

 ERDDAP™ Biasanya digunakan di belakang proksi terbalik server web untuk memungkinkannya untuk disajikan pada port standar HTTP (80 dan 443) .
Pemusnahan SSL / TLS sering dilakukan pada lapisan proksi server web juga. Specifics tergantung pada persyaratan masing-masing penyebaran.

#### Apache{#apache} 

1. Pastikan bahwa 'mod _ proxy' dan 'mod _ proxy _ http 'dimuat:

```
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_http_module modules/mod_proxy_http.so
```

2. Ubah yang ada ' <VirtualHost> 'tag (jika ada satu) , atau tambahkan satu di akhir berkas:
```
<VirtualHost *:80>
   ServerName YourDomain.org
   ProxyRequests Off
   ProxyPreserveHost On
   ProxyPass /erddap http://localhost:8080/erddap
   ProxyPassReverse /erddap http://localhost:8080/erddap
</VirtualHost>
```

Jika ERDDAP™ disajikan pada path selain '/ erddap', juga mengatur header 'X-Forwarded- Prefix' ke
bagian jalur _ sebelum _ '/ erddap'. Pengaturan ini akan sesuai untuk ERDDAP™ dilayani di
'/ subpath / erddap':

```
RequestHeader set X-Forwarded-Prefix /subpath
```

3. Kemudian jalankan Apache: '/ usr / sbin / apachectl -k anggun' (tetapi kadang-kadang dalam direktori yang berbeda) .
         
#### NGINX{#nginx} 

Dalam berkas konfigurasi nginx, atur header ini:
```
proxy_set_header Host              $http_host;
proxy_set_header X-Real-IP         $remote_addr;
proxy_set_header REMOTE_ADDR       $remote_addr;
proxy_set_header HTTP_CLIENT_IP    $remote_addr;
proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
```

Jika ERDDAP™ disajikan pada path selain '/ erddap', juga mengatur header 'X-Forwarded- Prefix' ke
bagian jalur _ sebelum _ '/ erddap'. Pengaturan ini akan sesuai untuk ERDDAP™ dilayani di
'/ subpath / erddap':

```
proxy_set_header X-Forwarded-Prefix /subpath
```


Untuk mendapatkan NGINX dan ERDDAP™ bekerja dengan benar https , Anda perlu menempatkan snippet berikut di dalam server.xml Tomcat ' <Host> 'block:
```
<Valve className="org.apache.catalina.valves.RemoteIpValve"
  remoteIpHeader="X-Forwarded-For"
  protocolHeader="X-Forwarded-Proto"
  protocolHeaderHttpsValue="https" />
```
     
### Mulai Tomcat{#start-tomcat} 

*  (Aku tidak menyarankan menggunakan Manajer Aplikasi Web Tomcat. Jika Anda tidak sepenuhnya shutdown dan mulai Tomcat, cepat atau lambat Anda akan memiliki PermGen masalah memori.) 
*  (Dalam Linux atau Mac OS, jika Anda telah menciptakan pengguna khusus untuk menjalankan Tomcat, misalnya, tomcat, ingat untuk melakukan langkah-langkah berikut sebagai pengguna itu.) 
* Jika Tomcat sudah berjalan, menutup Tomcat dengan (dalam Linux atau Mac OS) 'Tomcat / bin / shutdown.'
atau (dalam Windows) 'Tomcat' bin shutdown.bat '

Pada Linux, gunakan 'ps -ef | grep tomcat 'sebelum dan setelah' shutdown.sh 'untuk memastikan proses tomcat telah berhenti.
Proses harus didaftarkan sebelum shutdown dan akhirnya tidak terdaftar setelah shutdown.
Mungkin butuh satu atau dua menit untuk ERDDAP™ untuk sepenuhnya ditutup. Bersabarlah. Atau jika terlihat seperti itu tidak akan berhenti sendiri, gunakan:
'Bunuh -9 <processID> '
* Mulai Tomcat dengan (dalam Linux atau Mac OS) 'tomcat / bin / startup.sh' atau (dalam Windows) 'tomcat\\ bin\\ startup.bat'

## Apakah ERDDAP™ lari?{#is-erddap-running} 

Gunakan peramban untuk mencoba melihathttp://www.YourServer.org/erddap/status.html.
 ERDDAP™ dimulai tanpa data yang dimuat. Dataset dimuat dalam thread latar belakang dan jadi tersedia satu per satu.

### Penelusuran masalah{#troubleshooting} 

* Ketika permintaan dari pengguna datang, ia pergi ke Apache (di komputer Linux dan Mac OS) , kemudian Tomcat, kemudian ERDDAP™ .
* Anda dapat melihat apa yang datang ke Apache (kesalahan dan terkait) dalam berkas log Apache.
*    [Anda](/docs/server-admin/additional-information#tomcat-logs) dapat melihat apa yang datang ke Tomcat (kesalahan dan terkait) 
dalam berkas log Tomcat ('Tomcat / log / catalina.out' dan berkas lain dalam direktori itu) .
*    [Anda](/docs/server-admin/additional-information#log) dapat melihat apa yang datang ke ERDDAP , pesan diagnostik dari ERDDAP ,
dan pesan kesalahan dari ERDDAP , di ERDDAP™ ' <bigParentDirectory> berkas / log / log.txt '.
* Tomcat tidak mulai ERDDAP™ sampai Tomcat mendapat permintaan untuk ERDDAP™ . Sehingga Anda dapat melihat dalam file log Tomcat jika
dimulai ERDDAP™ atau jika ada pesan kesalahan yang berhubungan dengan percobaan itu.
* Kapan ERDDAP™ start up, it renames the old ERDDAP™ berkas log.txt ('Arsip Log Pada <CurrentTime> .txt ') dan membuat berkas log.txt baru.
Jadi jika berkas 'log.txt' sudah lama, itu adalah tanda bahwa ERDDAP™ tidak baru-baru ini dimulai kembali. ERDDAP™ menulis info log ke buffer
dan hanya menulis buffer ke berkas log secara berkala, tetapi Anda dapat memaksa ERDDAP™ untuk menulis buffer ke berkas log dengan mengunjungi
' /erddap/status.html '.

### Masalah: Versi Lama Java  {#trouble-old-version-of-java} 

Jika Anda menggunakan versi Java yang terlalu tua untuk ERDDAP , ERDDAP™ tidak akan berjalan dan Anda akan melihat pesan kesalahan dalam berkas log Tomcat seperti

```
Exception in thread "main" java.lang.UnsupportedClassVersionError:
_some/class/name_: Unsupported major.minor version _someNumber_
```

Solusinya adalah untuk memperbarui ke versi terbaru dari Java dan pastikan Tomcat menggunakannya.

### Masalah: Startup Lambat Pertama Waktu{#trouble-slow-startup-first-time} 

Tomcat harus melakukan banyak pekerjaan pertama kalinya aplikasi seperti ERDDAP™ dimulai; terutama, itu harus membongkar berkas 'erddap.war'
 (yang seperti .zip berkas) . Pada beberapa server, usaha pertama untuk melihat ERDDAP™ stalls (30 detik?) sampai pekerjaan ini selesai.
Di server lain, usaha pertama akan gagal segera. Tetapi jika Anda menunggu 30 detik dan mencoba lagi, itu akan berhasil jika ERDDAP™ dipasang dengan benar.

Tidak ada perbaikan untuk ini. Ini hanya bagaimana Tomcat bekerja. Tapi itu hanya terjadi pertama kalinya setelah Anda menginstal versi baru ERDDAP™ .

## Matikan dan restart{#shut-down-and-restart} 

Di masa depan, untuk mematikan (dan restart)   ERDDAP™ , lihat [How to Shut Down and Restart Tomcat and ERDDAP ](/docs/server-admin/additional-information#shut-down-and-restart) .

## Masalah?{#trouble} 

Masalah memasang Tomcat atau ERDDAP™ ? Lihat kami [daerah saat memperoleh dukungan tambahan](/docs/intro#support) .

## Pemberitahuan Email dari Versi Baru ERDDAP  {#email-notification-of-new-versions-of-erddap} 

Jika Anda ingin menerima email kapanpun versi baru dari ERDDAP™ tersedia atau penting lainnya ERDDAP™ Pengumuman,
Anda dapat bergabung dengan ERDDAP™ daftar pengumuman [sini](https://groups.google.com/g/erddap-announce) . Daftar ini rata-rata sekitar satu email setiap tiga bulan.

## Ubahan{#customize} 

*  [Ubahkanlah ERDDAP™ untuk menyoroti organisasi Anda (tidak NOAA   ERD ) .](#customize) 
* Ubah spanduk yang muncul di atas semua ERDDAP™ .html halaman dengan mengedit ' <startBodyHtml5> 'tag dalam Anda' datasets.xml 'file.
(Jika tidak ada, salin baku dari ERDDAP™ 'tomcat / webapps / erddap / WEB-INF / classes / gov / noaa / pfel / erddap / util / messages.xml' berkas
ke dalam ' datasets.xml 'Dan mengeditnya.) Sebagai contoh, Anda bisa:
  * Pakai gambar lain (yaitu, logo organisasi Anda) .
  * Ubah warna latar belakang.
  * Ubah... ERDDAP™ "to" YourOrganization _ s ERDDAP™ "
  * Ubah "Lebih mudah akses ke data ilmiah" ke "Lebih mudah akses ke data _ YourOrganization _ s".
  * Mengubah link "Dipersembahkan kepada Anda" untuk dihubungkan dengan organisasi dan sumber pendanaan Anda.
* Ubah informasi pada sisi kiri halaman rumah dengan mengedit ' <theShortDescriptionHtml> 'tag dalam Anda' datasets.xml 'file.
(Jika tidak ada, salin baku dari ERDDAP™ 'tomcat / webapps / erddap / WEB-INF / classes / gov / noaa / pfel / erddap / util / messages.xml' berkas
ke dalam ' datasets.xml 'Dan mengeditnya.) Sebagai contoh, Anda bisa:
  * Jelaskan apa yang organisasi Anda dan / atau kelompok tidak.
  * Jelaskan jenis data apa ini ERDDAP™ telah.
  * Untuk mengubah ikon yang muncul pada tab peramban, letakkan favicon organisasi Anda. Meksiko dalam 'tomcat / content / erddap / images /'.
Lihathttps://en.wikipedia.org/wiki/Favicon.
