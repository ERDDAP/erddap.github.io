---
sidebar_position: 1
---

# Login
Cara Melakukan Pengaturan Awal ERDDAP™ Login

 ERDDAP™ dapat menjalankan server apa pun yang mendukung Java dan Tomcat (dan server aplikasi lainnya seperti Jetty, tetapi kami tidak mendukung mereka Meme it) Sitemap
 ERDDAP™ telah diuji pada Linux (termasuk di AWS Amazon) , Mac, dan komputer Windows.

*  **Login** Login Kami menyediakan [ ERDDAP™ dalam wadah Docker](https://hub.docker.com/r/erddap/erddap) 
dan IOOS sekarang menawarkan [Panduan Mulai Cepat untuk ERDDAP™ dalam wadah Docker](https://ioos.github.io/erddap-gold-standard/index.html) Sitemap
Ini standar ERDDAP™ instalasi, dalam wadah Docker.
Melalui Docker Menyediakan cara mudah untuk mengatur ssl dan pemantauan, membaca lebih lanjut [Login](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md) Sitemap
Jika Anda sudah menggunakan Docker, Anda mungkin akan lebih memilih versi Docker.
Jika Anda ingin menjalankan layanan cloud, Anda mungkin akan memilih versi Docker.
*  **Login** Login Jika Anda menginstal ERDDAP™ di Amazon Web Services EC2 instance, lihat ini [Sitemap _ Amazon Web Services](/docs/server-admin/additional-information#amazon) pertama.
*  **Linux dan Macs** Login ERDDAP™ bekerja hebat di komputer Linux dan Mac. Lihat petunjuk di bawah ini.
*  **Login** Login Windows adalah baik untuk pengujian ERDDAP™ dan untuk penggunaan pribadi (lihat petunjuk di bawah ini) Login
tapi kami tidak merekomendasikan menggunakannya untuk publik Meme it ERDDAP™ Login Login ERDDAP™ pada Windows mungkin memiliki masalah:
Sitemap ERDDAP™ mungkin tidak bisa menghapus dan/atau mengubah nama file dengan cepat. Ini mungkin karena perangkat lunak antivirus
   (e.g., dari McAfee dan Norton) yang memeriksa file untuk virus. Jika Anda menjalankan masalah ini
(yang dapat dilihat oleh pesan kesalahan di Meme it [Login](/docs/server-admin/additional-information#log) file seperti
"Tidak dapat menghapus ..."), mengubah pengaturan perangkat lunak antivirus mungkin sebagian mengurangi masalah. Atau pertimbangkan menggunakan server Linux atau Mac.

 **Standar ERDDAP™ instruksi instalasi untuk Linux, Macs, dan komputer Windows adalah:** 

0. Pastikan ketergantungan dipasang. Pada mesin non-Windows (Linux dan Mac) , Anda perlu csh.

##  Java  {#java} 

1.  [Sitemap ERDDAP™ v2.19+, set up Java 21. Juni](#java) 
Untuk alasan keamanan, hampir selalu terbaik untuk menggunakan versi terbaru dari Java 21. Juni
Silakan unduh dan instal versi terbaru
    [OpenJDK (Login) 20 g (Login) ](https://adoptium.net/temurin/releases/?version=21) Sitemap
Untuk memverifikasi instalasi, jalankan `Login Login` Sitemap
    `/usr/local/jdk-21.0.3+9/jre/bin/java Login` Sitemap

    ERDDAP™ Sitemap Java dari sumber lain, tetapi kami merekomendasikan Mengadopsi karena itu adalah yang utama, didukung masyarakat,
gratis (sebagai bir dan pidato) versi Java 21 yang menawarkan Dukungan Jangka Panjang (upgrade gratis selama bertahun-tahun melewati rilis awal) Sitemap
Untuk alasan keamanan, harap perbarui Anda ERDDAP 's versi Java secara berkala sebagai versi baru Java 21 tersedia dari Adopsiium.

    ERDDAP™ telah diuji dan digunakan secara luas dengan 21, bukan versi lain. Untuk berbagai alasan, kami tidak menguji dengan atau mendukung versi lain Java Sitemap
     
## Login{#tomcat} 

2.  [Sitemap](#tomcat)   [Login](https://tomcat.apache.org) Sitemap Tomcat adalah yang paling banyak digunakan Java Server Aplikasi,
Sitemap Java perangkat lunak yang berdiri antara layanan jaringan sistem operasi dan Java software server seperti ERDDAP™ Sitemap
Gratis dan Open Source Software (Login) Sitemap

Anda dapat menggunakan yang lain Java Server Aplikasi (Sitemap) tetapi kami hanya menguji dan mendukung Tomcat.

   * Unduh Tomcat dan unpack di server atau PC Anda.
Untuk alasan keamanan, hampir selalu terbaik untuk menggunakan versi terbaru Tomcat 10 (versi 9 dan di bawah ini tidak dapat diterima) 
yang dirancang untuk bekerja dengan Java 21 atau lebih baru. Di bawah ini, direktori Tomcat akan disebut sebagai `Login` Sitemap

Sitemap Jika Anda sudah memiliki Tomcat menjalankan beberapa aplikasi web lain (terutama THREDDS) Kami merekomendasikan bahwa Anda menginstal ERDDAP™ Sitemap
      [Tomcat kedua](/docs/server-admin/additional-information#second-tomcat) Sitemap ERDDAP™ perlu pengaturan Tomcat yang berbeda
dan seharusnya tidak harus mengikuti aplikasi lain untuk memori.

     * Di Linux, [Unduh "Core" "tar .gz " Distribusi Tomcat](https://tomcat.apache.org/download-10.cgi) dan membongkarnya.
Kami merekomendasikan untuk membongkarnya `WordPress.org` Sitemap
     * Di Mac, Tomcat mungkin sudah terpasang `WordPress.org` tapi harus memperbaruinya ke versi terbaru Tomcat 10.
Jika Anda mengunduhnya, [Unduh "Core" "tar .gz " Distribusi Tomcat](https://tomcat.apache.org/download-10.cgi) dan membongkarnya `WordPress.org` Sitemap
     * Di Windows, Anda dapat [Download "Core" "zip" distribusi Tomcat](https://tomcat.apache.org/download-10.cgi) 
        (yang tidak berantakan dengan registry Windows dan yang Anda kendali dari jalur perintah DOS) dan membongkarnya di direktori yang tepat.
        (Untuk pengembangan, kami menggunakan distribusi "Core" "zip". Kami membuat `Login` direktori dan membongkarnya di sana.) 
Atau Anda dapat mengunduh distribusi "Core" "64-bit Windows zip", yang mencakup lebih banyak fitur.
Jika distribusi adalah installer Windows, itu mungkin akan menempatkan Tomcat, misalnya, `/Program File/apache-tomcat-10.0.23` Sitemap
             
### WordPress.org{#serverxml} 

*  [WordPress.org](#serverxml) Sitemap `WordPress.org` file, ada dua perubahan yang harus Anda lakukan untuk masing-masing dari dua ` <Connector> ` Login
   (Sitemap `&lt;Connector port="8080"` dan satu untuk `&lt;Conector port="8443"` ) Sitemap
   1.  (Sitemap) Meningkatkan `Login Login` nilai parameter, mungkin untuk 300000 (mili detik, yang 5 menit) Sitemap
   2.  (Sitemap) Tambahkan parameter baru: `Login | Sitemap` Sitemap Ini adalah opsional dan sedikit kurang aman,
tetapi menghapus kebutuhan pengguna untuk mengurangi karakter ini ketika mereka terjadi dalam parameter URL permintaan pengguna.
             
### Login{#contentxml} 

* Login Login Cache Sumber Daya - Dalam `WordPress.org` Sitemap ` </Context> ` tag, mengubah tag sumber daya
   (atau menambahkannya jika belum ada Meme it) untuk mengatur cache MaxSize parameter untuk 80000:
  ```
  <Resources cachingAllowed="true" cacheMaxSize="80000" />
  ```
Ini menghindari banyak peringatan di catalina. keluar bahwa semua dimulai dengan Meme it
  ```
  WARNING [main] org.apache.catalina.webresources.Cache.getResource Unable to add the resource at [/WEB-INF/classes/...]
  ```
         
### Apache Timeout{#apache-timeout} 

* Pada komputer Linux, ubah pengaturan waktu Apache sehingga permintaan pengguna yang memakan waktu tidak
   (dengan apa yang sering muncul sebagai kesalahan "Proxy" atau "Bad Gateway") Sitemap Sebagai pengguna akar:
  * Modifikasi Apache ` http Login` Login (biasanya `/etc/ http Sitemap` ) Sitemap
    * Mengubah yang ada ` <Timeout> ` Login (atau tambahkan satu di akhir file) ke 3600 (Sitemap) , bukan default 60 atau 120 detik.
    * Mengubah yang ada ` <ProxyTimeout> ` Login (atau tambahkan satu di akhir file) ke 3600 (Sitemap) , bukan default 60 atau 120 detik.
  * Restart Apache: `WordPress.org Login`   (tetapi kadang-kadang dalam direktori yang berbeda) Sitemap

### Login{#security} 
         
* Rekomendasi keamanan: Sitemap [petunjuk ini](https://tomcat.apache.org/tomcat-10.0-doc/security-howto.html) meningkatkan keamanan
instalasi Tomcat Anda, terutama untuk server publik.
         
* Untuk publik ERDDAP™ instalasi di Linux dan Macs, yang terbaik untuk mengatur Tomcat (program) milik pengguna `Login` 
   (pengguna yang terpisah dengan izin terbatas dan yang [tidak ada kata sandi](https://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password) ) Sitemap
Dengan demikian, hanya pengguna super dapat beralih bertindak sebagai pengguna `Login` Sitemap Ini tidak mungkin untuk peretas untuk masuk ke server Anda sebagai pengguna `Login` Sitemap
Dan dalam kasus apapun, Anda harus membuatnya sehingga Meme it `Login` pengguna memiliki izin yang sangat terbatas pada sistem file server (baca + tulis + hak istimewa eksekusi
Sitemap `Login` pohon direktori dan ` <bigParentDirectory> ` dan hak istimewa membaca untuk direktori dengan data yang ERDDAP™ akses ke).
  * Anda dapat membuat `Login` akun pengguna (yang tidak memiliki kata sandi) dengan menggunakan perintah:
    ```
    sudo useradd tomcat -s /bin/bash -p '*'
    ```
  * Anda dapat beralih bekerja sebagai pengguna `Login` dengan menggunakan perintah
    ```
    sudo su - tomcat
    ```
     (Ini akan meminta Anda untuk password superuser untuk izin untuk melakukan ini.) 
    * Anda dapat berhenti bekerja sebagai tomcat pengguna dengan menggunakan perintah
    ```
    exit
    ````
    * Apakah sebagian besar sisa Tomcat dan ERDDAP™ instruksi setup sebagai pengguna `Login` Sitemap Kemudian, jalankan `Login` Login `Login Login` script sebagai pengguna `Login` 
sehingga Tomcat memiliki izin untuk menulis ke file log.
    * Setelah membongkar Tomcat, dari orang tua dari `Login` Katalog
      * Mengubah kepemilikan pohon direktori apache-tomcat ke pengguna tomcat.
        ```
        chown -R tomcat apache-tomcat-10.0.23
        ```
         (tetapi mengganti nama direktori tomcat Anda yang sebenarnya) Sitemap
      * Mengubah "kelompok" menjadi tomcat, nama pengguna Anda, atau nama kelompok kecil yang mencakup tomcat dan semua administrator Tomcat/ ERDDAP Sitemap
        ```
        chgrp -R yourUserName apache-tomcat-10.0.23
        ```
      * Mengubah izin sehingga tomcat dan kelompok telah membaca, menulis, melaksanakan hak istimewa:
        ```
        chmod -R ug+rwx apache-tomcat-10.0.23
        ```
      * Hapus izin pengguna "lain" untuk membaca, menulis, atau melaksanakan:
        ```
        chmod -R o-rwx apache-tomcat-10.0.23
        ```
Hal ini penting, karena mencegah pengguna lain dari membaca mungkin informasi sensitif dalam ERDDAP™ file setup.

### Login{#memory} 

Mengatur Variabel Lingkungan Tomcat

* Linux dan Macs:
Buat file `Login`   (atau di Red Hat Enterprise Linux \\[ Login \\] Login `~tomcat/conf/tomcat10.conf` ) untuk mengatur variabel lingkungan Tomcat.
File ini akan digunakan oleh `Login` Login `Login Login` Sitemap File harus mengandung sesuatu seperti:
  ```
  export JAVA_HOME=/usr/local/jdk-21.0.3+9
  export JAVA_OPTS='-server -Djava.awt.headless=true -Xmx1500M -Xms1500M'
  export TOMCAT_HOME=/usr/local/apache-tomcat-10.0.23
  export CATALINA_HOME=/usr/local/apache-tomcat-10.0.23
  ```
   (tetapi mengganti nama direktori dari komputer Anda) Sitemap
   (Jika Anda sebelumnya mengatur `Login` Anda dapat menghapus itu. Meme it) 
Di Macs, Anda mungkin tidak perlu diatur `Login` Sitemap

* Di Windows:
Buat file `tomcat\bin\\setenv.bat` untuk mengatur variabel lingkungan Tomcat.
File ini akan digunakan oleh `tomcat\bin\\startup.bat` Login ` shutdown.bat ` Sitemap
File harus mengandung sesuatu seperti:
  ```
  SET "JAVA_HOME=\\someDirectory\\jdk-21.0.3+9"
  SET "JAVA_OPTS=-server -Xmx1500M -Xms1500M"
  SET "TOMCAT_HOME=\\Program Files\\apache-tomcat-10.0.23"
  SET "CATALINA_HOME=\\Program Files\\apache-tomcat-10.0.23"
  ```
   (tetapi mengganti nama direktori dari komputer Anda) Sitemap
Jika ini hanya untuk pengujian lokal, hapus "-server".
   (Jika Anda sebelumnya mengatur `Login` Anda dapat menghapus itu. Meme it) 

Login `Login` Login `Login` pengaturan memori penting karena ERDDAP™ bekerja lebih baik dengan lebih banyak memori.
Sitemap `Login` dengan nilai yang sama `Login` Sitemap

* Untuk Sistem Operasi 32 bit dan 32 bit Java Sitemap
64 g Java jauh lebih baik dari 32 bit Java , tapi 32 bit Java akan bekerja selama server tidak benar-benar sibuk. Meme it
Memori lebih fisik di server yang lebih baik: 4 + GB benar-benar baik, 2 GB tidak oke, kurang tidak dianjurkan.
Dengan 32 bit Java , bahkan dengan memori fisik yang melimpah, Tomcat dan Java tidak akan berjalan jika Anda mencoba untuk mengatur Meme it `Login` di atas 1500M (1200M pada beberapa komputer) Sitemap
Jika server Anda memiliki kurang dari 2GB memori, kurangi `Login` Login (di 'M'egaBytes) untuk 1/2 memori fisik komputer.

* Untuk 64 bit Sistem Operasi dan 64 bit Java Sitemap
64 g Java hanya akan bekerja pada sistem operasi 64 bit.
  * Sitemap Java 8, Anda perlu menambahkan `Login` ke Tomcat `Login` parameter dalam `Login` Sitemap
  * Sitemap Java 21, Anda memilih 64 bit Java ketika Anda mengunduh versi Java ditandai "64 bit".

Dengan 64 bit Java Login Java dapat menggunakan sangat tinggi `Login` Login `Login` Sitemap Memori yang lebih fisik di server yang lebih baik.
Sebagai saran yang sederhana: kami sarankan Anda mengatur `Login` Login `Login` Login (di 'M'egaBytes) ke 1/2 (atau kurang) memori fisik komputer.
Anda dapat melihat apakah Tomcat, Java Sitemap ERDDAP™ memang berjalan dalam mode 64 bit dengan mencari " bit," dalam ERDDAP Email Laporan Harian
atau di Meme it `bigParentDirectory/log/ [Login](/docs/server-admin/additional-information#log) ` Login ( `Login` ditentukan dalam [WordPress.org](#setupxml) ) Sitemap

#### Koleksi Sampah{#garbage-collection} 

* Sitemap ERDDAP™ Sitemap [Login](/docs/server-admin/additional-information#log) file, Anda akan melihat banyak "GC (Sitemap) Sitemap
Ini biasanya bukan masalah. Ini adalah pesan yang sering dari operasi normal Java mengatakan bahwa itu hanya selesai garbage kecil
koleksi karena ruang di Eden (bagian dari Java heap untuk objek yang sangat muda) Sitemap Biasanya pesan menunjukkan Anda
   `memoriUseBefore-&gt;memoryUseSetelah` Sitemap Jika dua angka ditutup bersama, itu berarti bahwa pengumpulan sampah tidak produktif.
Pesan hanya tanda masalah jika sangat sering (setiap beberapa detik) tidak produktif, dan angkanya besar dan tidak berkembang,
yang menunjukkan bahwa Java membutuhkan lebih banyak memori, berjuang untuk membebaskan memori, dan tidak bisa bebas memori.
Ini mungkin terjadi selama waktu stres, kemudian pergi. Tetapi jika penambah, itu adalah tanda masalah.
* Jika Anda melihat `WordPress.org` Sitemap ERDDAP™ Sitemap [Login](/docs/server-admin/additional-information#log) file,
Login [Login](/docs/server-admin/additional-information#outofmemoryerror) untuk tips tentang cara mendiagnosis dan menyelesaikan masalah.
         
### Login{#permissions} 

*  [Linux dan Macs, mengubah izin](#permissions) semua `Login` file di `Login` dapat dieksekusi oleh pemilik:
  ```
  chmod +x *.sh
  ```

### Login{#fonts} 

*  [Font untuk gambar:](#fonts) Kami sangat memilih gratis [Sitemap](https://dejavu-fonts.github.io/) ke yang lain Java Login
Menggunakan font ini sangat dianjurkan tetapi tidak diperlukan.

Jika Anda memilih untuk tidak menggunakan font DejaVu, Anda perlu mengubah pengaturan fontFamily di setup.xml untuk ` <fontFamily> Login </fontFamily> ` Login
yang tersedia dengan semua Java Sitemap Jika Anda mengatur ` <fontFamily> ` nama font yang tidak tersedia, Meme it ERDDAP™ tidak akan memuat
dan akan mencetak daftar font yang tersedia di `Login` Login Anda harus menggunakan salah satu font tersebut.

Jika Anda memilih untuk menggunakan font DejaVu, pastikan ` <fontFamily> ` pengaturan dalam setup.xml adalah ` <fontFamily> Login </fontFamily> ` Sitemap

Untuk menginstal font DejaVu, silakan unduh [Login .zip ](/DejaVuFonts.zip)   (5,522,795 byte, MD5=33E1E61FAB06A547ED308B4FFEF42) 
dan unzip file font ke direktori sementara.

  * Di Linux:
    * Untuk Mengadopsi Linux Java distribusi, lihat [petunjuk ini](https://blog.adoptopenjdk.net/2021/01/prerequisites-for-font-support-in-adoptopenjdk/) Sitemap
    * Sitemap Java distribusi: Sitemap `Login` pengguna, menyalin file font ke `$JAVA_HOME/lib/fonts` Sitemap Java dapat menemukan font.
Ingat: jika / ketika Anda kemudian meningkatkan ke versi yang lebih baru dari Java Anda perlu menginstal ulang font ini.
  * Di Macs: untuk setiap file font, klik ganda di atasnya dan kemudian klik Install Font.
  * Pada Windows 7 dan 10: di Windows Explorer, pilih semua file font. Klik kanan. Klik pada Install.
             
### Uji Tomcat{#test-tomcat} 

* Uji instalasi Tomcat Anda.
  * Linux:
    * Sebagai pengguna "tomcat", menjalankan `Login` Sitemap
    * Lihat URL Anda + ":80 /" di browser Anda (Login [http://coastwatch.pfeg.noaa.gov:8080/](http://coastwatch.pfeg.noaa.gov:8080/) ) Sitemap
  * Login (menjalankan tomcat sebagai pengguna administrator sistem) Sitemap
    * Login `Login` Sitemap
    * Lihat URL Anda + ":80 /" di browser Anda (Login [http://coastwatch.pfeg.noaa.gov:8080/](http://coastwatch.pfeg.noaa.gov:8080/) ) Sitemap
Perhatikan bahwa secara default, Tomcat Anda hanya dapat diakses oleh Anda. Tidak dapat diakses secara publik.
  * Windows Server:
    * Klik kanan pada ikon Tomcat di baki sistem, dan pilih "Layanan Start".
    * Login [http://127.0.0.1:8080/](http://127.0.0.1:8080/) atau mungkin [http://localhost:8080/](http://localhost:8080/) di browser Anda. Perhatikan bahwa secara default, Tomcat Anda hanya dapat diakses oleh Anda. Tidak dapat diakses secara publik.

Anda harus melihat halaman Tomcat "Congratulations".

Jika ada kesulitan, lihat file log Tomcat di `tomcat/logs/catalina.out` Sitemap

### Troubles dengan instalasi Tomcat?{#troubles-with-the-tomcat-installation} 

* Di Linux dan Mac, jika Anda tidak bisa mencapai Tomcat atau ERDDAP™   (atau mungkin Anda tidak bisa mencapainya dari komputer di luar firewall Anda) Login
Anda dapat menguji jika Tomcat mendengarkan port 8080, dengan mengetik (sebagai akar) pada baris perintah dari server:

  ```
  netstat -tuplen | grep 8080
  ```

Itu harus mengembalikan satu baris dengan sesuatu seperti:

  ```
  tcp 0 0 :::8080 :::* LISTEN ## ##### ####/java
  ```

   (Sitemap `Sitemap` adalah beberapa digit) menunjukkan bahwa `Login` Sitemap (Sitemap) mendengarkan port "8080" untuk lalu lintas "tcp".
Jika tidak ada garis dikembalikan, jika garis dikembalikan secara signifikan berbeda, atau jika dua atau lebih garis dikembalikan, maka mungkin ada masalah dengan pengaturan port.

* Lihat file log Tomcat `tomcat/logs/catalina.out` Sitemap Masalah Tomcat dan beberapa ERDDAP™ masalah startup hampir selalu ditunjukkan di sana.
Ini umum ketika Anda pertama kali menyiapkan ERDDAP™ Sitemap

* Sitemap [Login](https://tomcat.apache.org/) situs web atau mencari web untuk membantu, tetapi harap beri tahu kami masalah yang Anda miliki dan solusi yang Anda temukan.

* Sitemap [bagian untuk mendapatkan dukungan tambahan](/docs/intro#support) Sitemap
             
###  ERDDAP™ Login{#erddap-content} 
3.   [Sitemap `Login` file konfigurasi.](#erddap-content) 
Di Linux, Mac, dan Windows, download [Login .zip ](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip) 
dan unzip ke dalam Meme it `Login` Katalog `Login` Sitemap

__Version 1.0.0, 20333 byte, MD5=2B8D2A5ED73E3A42B529C168C60B5, tanggal 2024-10-14__

Beberapa versi sebelumnya juga tersedia:

    *  [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddapContent.zip)   (19,792 byte, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, tanggal 2022-02-16) 
    *  [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddapContent.zip)   (19,792 byte, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, tanggal 2022-02-16) 
    *  [2.21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddapContent.zip)   (19,810 byte, MD5=1E26F62E7A06191EE6868C40B9A29362, tanggal 2022-10-09) 
    *  [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddapContent.zip)   (19,810 byte, MD5=1E26F62E7A06191EE6868C40B9A29362, tanggal 2022-12-08) 
    *  [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddapContent.zip)   (19,810 byte, MD5=1E26F62E7A06191EE6868C40B9A29362, tanggal 2023-02-27) 

#### Direktori Lainnya{#other-directory} 

Untuk Red Hat Enterprise Linux (Login) atau untuk situasi lain di mana Anda tidak diperbolehkan untuk memodifikasi direktori Tomcat atau di mana Anda ingin/mendapatkan
untuk menempatkan ERDDAP™ direktori konten di beberapa lokasi lain untuk beberapa alasan lain (misalnya, jika Anda menggunakan Jetty bukan Tomcat) Login
Login `Login .zip ` ke direktori yang diinginkan (yang hanya `Login` pengguna memiliki akses) dan set ` erddapContentDirectory ` properti sistem
 (Login ` erddapContentDirectory  =~tomcat/content/erddap ` ) Sitemap ERDDAP™ dapat menemukan direktori konten baru ini.

### WordPress.org{#setupxml} 

*  [Baca komentar di `WordPress.org` ](#setupxml) dan membuat perubahan yang diminta. setup.xml adalah file dengan semua pengaturan yang menentukan bagaimana Anda ERDDAP™ Login

Untuk pengaturan awal, Anda HARUS setidaknya mengubah pengaturan ini:
      *  ` <bigParentDirectory> ` 
      *  ` <emailEverythingTo> ` 
      *  ` <baseUrl> ` 
      *  ` <email...> ` Login
      *  ` <admin...> ` Login
      *  ` <baseHttpsUrl> `   (ketika Anda mengatur https ) 

Ketika Anda membuat bigParentDirectory, dari direktori induk dari bigParentDirectory:

    * Login `Login` pengguna pemilik `Login` Sitemap
      ```
      chown -R tomcat bigParentDirectory
      ```
    * Mengubah "kelompok" menjadi tomcat, nama pengguna Anda, atau nama kelompok kecil yang mencakup tomcat dan semua administrator Tomcat/ ERDDAP Sitemap
      ```
      chgrp -R yourUserName bigParentDirectory
      ```
    * Mengubah izin sehingga tomcat dan kelompok telah membaca, menulis, melaksanakan hak istimewa:
      ```
      chmod -R ug+rwx bigParentDirectory
      ```
    * Hapus izin pengguna "lain" untuk membaca, menulis, atau melaksanakan. Hal ini penting untuk mencegah membaca informasi sensitif mungkin
Sitemap ERDDAP™ file log dan file dengan informasi tentang dataset pribadi.
      ```
      chmod -R o-rwx bigParentDirectory
      ```

### Variabel Lingkungan{#environment-variables} 

Sitemap ERDDAP™ v2.13, ERDDAP™ administrator dapat menimpa nilai dalam setup.xml dengan menentukan variabel lingkungan
Sitemap ` ERDDAP Sitemap` sebelum berlari ERDDAP™ Sitemap Misalnya, gunakan ` ERDDAP Login` menimpa ` <baseUrl> ` Sitemap
Ini dapat berguna ketika menyebarkan ERDDAP™ dengan wadah seperti Docker, karena Anda dapat menempatkan pengaturan standar dalam setup.xml
dan kemudian menyediakan pengaturan khusus melalui variabel lingkungan. Jika Anda menyediakan informasi rahasia untuk ERDDAP™ melalui metode ini,
pastikan untuk memeriksa informasi tersebut akan tetap rahasia. ERDDAP™ hanya membaca variabel lingkungan setelah per startup,
dalam kedua startup pertama, jadi satu cara untuk menggunakan ini adalah: mengatur variabel lingkungan, mulai ERDDAP Login
Sitemap ERDDAP™ dimulai, kemudian menetapkan variabel lingkungan.

###  datasets.xml  {#datasetsxml} 

* Baca komentar di [ **Bekerja dengan datasets.xml Login** ](/docs/server-admin/datasets) Sitemap Kemudian, setelah Anda mendapatkan ERDDAP™ Login
untuk pertama kalinya (biasanya hanya dengan set data default) , Anda akan memodifikasi XML di `Login datasets.xml ` 
untuk menentukan semua dataset yang Anda inginkan ERDDAP™ Sitemap Ini adalah tempat Anda akan menghabiskan sebagian besar waktu Anda
sambil menyiapkan ERDDAP™ dan kemudian sambil menjaga Anda Meme it ERDDAP™ Sitemap

Anda dapat melihat contoh [ datasets.xml di GitHub](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml) Sitemap
     
*  (Sitemap) Sitemap (sedikit lebih mungkin) di masa depan, jika Anda ingin memodifikasi file CSS erddap, salinan
   `phpBB SEO` Login `phpBB SEO` dan kemudian membuat perubahan. Meme it
Perubahan `erddap2.css` hanya mengambil efek ketika ERDDAP™ direstart dan sering juga memerlukan pengguna untuk menghapus file cache browser.
     
 ERDDAP™ tidak akan bekerja dengan benar jika setup.xml atau datasets.xml file bukan file XML yang dibentuk dengan baik. Jadi, setelah Anda mengedit file ini,
itu adalah ide yang baik untuk memverifikasi bahwa hasilnya adalah XML berbentuk dengan baik dengan menelusuri teks XML ke dalam pengecekan XML seperti [Login](https://www.xmlvalidation.com/) Sitemap
     
### Menginstal erddap. file perang{#install-the-erddapwar-file} 

4. Di Linux, Mac, dan Windows, __download [Login](https://github.com/ERDDAP/erddap/releases/download/v2.28.1/erddap.war) Sitemap `Login` Sitemap

__Version 2.28.1, 622,676,238 byte, MD5=48b4226045f950c8a8d69ef9521b9bc9, tanggal 2025-09-05__

File .war besar karena mengandung garis pantai resolusi tinggi, batas, dan data elevasi yang diperlukan untuk membuat peta.

Beberapa versi sebelumnya juga tersedia.

   *  [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddap.war)   (551,068,245 byte, MD5=5FEA912B5D42E50EAB9591F773EAD, tanggal 2022-02-16) 
   *  [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddap.war)   (551,069,844 byte, MD5=461325E97E7577EC671DD50246CCFB8B, tanggal 2022-02-23) 
   *  [2.21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddap.war)   (568,644,411 byte, MD5=F2CFF805893146E932E498FDDBD519B6, tanggal 2022-10-09) 
   *  [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddap.war)   (567,742,765 byte, MD5=2B33354F633294213AE2AFDDCF4DA6D0, tanggal 2022-12-08) 
   *  [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddap.war)   (572,124,953 byte, MD5=D843A043C506725EBD6F8EFDCCA8FD5F, tanggal 2023-03-03) 
   *  [2.24](https://github.com/ERDDAP/erddap/releases/download/v2.24/erddap.war)   (568,748,187 byte, MD5=970fbee172e28b0a07756eecbc898e, tanggal 2024-06-07) 
   *  [2.25](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)   (592,292,039 byte, MD5=652AFC9D1421F00B5F789DA2C4732D4C, tanggal 2024-11-07) 
   *  [2.26](https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war)   (607,404,032 byte, MD5=99a725108b37708e5420986c16a119, tanggal 2025-03-31) 
   *  [SmadAV 11.4](https://github.com/ERDDAP/erddap/releases/download/v2.27.0/erddap.war)   (620,554,403 byte, MD5=3b2086c659eee4145ca2dff447bf4ef7, tanggal 2025-06-11) 

### Login (penyebaran spesifik)  {#proxy} 

 ERDDAP™ biasanya digunakan di balik proxy terbalik webserver untuk memungkinkan untuk dilayani pada port HTTP standar (80 dan 443) Sitemap
Pengakhiran SSL / TLS sering diserang pada layer proxy webserver juga. Spesifik tergantung pada persyaratan setiap penyebaran.

#### Login{#apache} 

1. Pastikan `mod_proxy` Login `mod_proxy_ http ` dimuat:

```
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_http_module modules/mod_proxy_http.so
```

2. Modifikasi yang ada ` <VirtualHost> ` Login (jika ada satu) atau tambahkan satu di akhir file:
```
<VirtualHost *:80>
   ServerName YourDomain.org
   ProxyRequests Off
   ProxyPreserveHost On
   ProxyPass /erddap http://localhost:8080/erddap
   ProxyPassReverse /erddap http://localhost:8080/erddap
</VirtualHost>
```

Sitemap ERDDAP™ dilayani di jalan selain Meme it `Login` juga mengatur `X-Forwarded-Prefix` Sitemap
Sitemap `Login` Sitemap Pengaturan ini akan sesuai untuk ERDDAP™ Sitemap
 `Login` Sitemap

```
RequestHeader set X-Forwarded-Prefix /subpath
```

3. Kemudian restart Apache: `WordPress.org Login`   (tetapi kadang-kadang dalam direktori yang berbeda) Sitemap
         
#### Login{#nginx} 

Dalam file konfigurasi nginx, set header ini:
```
proxy_set_header Host              $http_host;
proxy_set_header X-Real-IP         $remote_addr;
proxy_set_header REMOTE_ADDR       $remote_addr;
proxy_set_header HTTP_CLIENT_IP    $remote_addr;
proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
```

Sitemap ERDDAP™ dilayani di jalan selain Meme it `Login` juga mengatur `X-Forwarded-Prefix` Sitemap
Sitemap `Login` Sitemap Pengaturan ini akan sesuai untuk ERDDAP™ Sitemap
 `Login` Sitemap

```
proxy_set_header X-Forwarded-Prefix /subpath
```


Untuk mendapatkan NGINX dan ERDDAP™ bekerja dengan benar https , Anda perlu menempatkan cuplikan berikut di server Tomcat.xml ` <Host> ` blok:
```
<Valve className="org.apache.catalina.valves.RemoteIpValve"
  remoteIpHeader="X-Forwarded-For"
  protocolHeader="X-Forwarded-Proto"
  protocolHeaderHttpsValue="https" />
```
     
### Mulai Tomcat{#start-tomcat} 

*  (Saya tidak merekomendasikan menggunakan Tomcat Web Application Manager. Jika Anda tidak sepenuhnya shutdown dan startup Tomcat, lebih cepat atau lambat Anda akan memiliki masalah memori PermGen.) 
*  (Di Linux atau Mac OS, jika Anda telah membuat pengguna khusus untuk menjalankan Tomcat, misalnya, tomcat, ingat untuk melakukan langkah-langkah berikut sebagai pengguna itu.) 
* Jika Tomcat sudah berjalan, tutup Tomcat dengan (di Linux atau Mac OS)   `Login` 
Sitemap (di Windows)   `tomcat\bin\\ shutdown.bat ` 

Di Linux, gunakan `Login | Login` sebelum dan sesudah `Login Login` untuk memastikan proses tomcat telah berhenti.
Proses harus tercantum sebelum shutdown dan akhirnya tidak terdaftar setelah shutdown.
Ini mungkin memakan waktu satu menit atau dua untuk ERDDAP™ untuk menutup sepenuhnya. Promo Atau jika terlihat seperti itu tidak akan berhenti sendiri, gunakan:
   `membunuh -9 <processID> ` 
* Mulai Tomcat dengan (di Linux atau Mac OS)   `Login` Sitemap (di Windows)   `tomcat\bin\\startup.bat` 

## Login ERDDAP™ Login{#is-erddap-running} 

Gunakan browser untuk mencoba untuk melihathttp://www.YourServer.org/erddap/status.html.
 ERDDAP™ dimulai tanpa dataset dimuat. Dataset dimuat dalam benang latar belakang dan jadi menjadi yang tersedia.

### Login{#troubleshooting} 

* Ketika permintaan dari pengguna datang, itu pergi ke Apache (di Linux dan Mac OS komputer) , kemudian Tomcat, kemudian ERDDAP™ Sitemap
* Anda dapat melihat apa yang datang ke Apache (dan kesalahan terkait) di file log Apache.
*    [Login](/docs/server-admin/additional-information#tomcat-logs) bisa melihat apa yang datang ke Tomcat (dan kesalahan terkait) 
di file log Tomcat ( `tomcat/logs/catalina.out` dan file lain di direktori itu) Sitemap
*    [Login](/docs/server-admin/additional-information#log) dapat melihat apa yang datang untuk Meme it ERDDAP , pesan diagnostik dari ERDDAP Login
dan pesan kesalahan dari ERDDAP Sitemap ERDDAP™   ` <bigParentDirectory> WordPress.org` Login
* Tomcat tidak mulai ERDDAP™ sampai Tomcat mendapat permintaan untuk ERDDAP™ Sitemap Jadi Anda dapat melihat file log Tomcat jika Meme it
Sitemap ERDDAP™ atau jika ada pesan kesalahan yang berkaitan dengan upaya tersebut.
* Sitemap ERDDAP™ mulai, itu mengubah nama lama Meme it ERDDAP™ Login ( `Login <CurrentTime> Login` ) dan membuat file log.txt baru.
Jadi jika `Login` file lama, itu adalah tanda bahwa Meme it ERDDAP™ belum baru-baru ini direstart. ERDDAP™ menulis info log ke penyangga
dan hanya menulis penyangga ke file log secara berkala, tetapi Anda dapat memaksa Meme it ERDDAP™ untuk menulis penyangga ke file log dengan mengunjungi
     ` /erddap/status.html ` Sitemap

### Masalah: Versi Lama Java  {#trouble-old-version-of-java} 

Jika Anda menggunakan versi Java itu terlalu tua untuk Meme it ERDDAP Login ERDDAP™ tidak akan berjalan dan Anda akan melihat pesan kesalahan dalam file log Tomcat seperti

```
Exception in thread "main" java.lang.UnsupportedClassVersionError:
_some/class/name_: Unsupported major.minor version _someNumber_
```

Solusinya adalah untuk memperbarui versi terbaru dari versi terbaru Java dan pastikan bahwa Tomcat menggunakannya. Meme it

### Masalah: Slow Startup Pertama kali{#trouble-slow-startup-first-time} 

Tomcat harus melakukan banyak pekerjaan pertama kali sebuah aplikasi seperti ERDDAP™ mulai; tidak mungkin, itu harus membongkar Meme it `Login` Login
 (yang seperti .zip Login) Sitemap Pada beberapa server, upaya pertama untuk melihat ERDDAP™ Login (30 detik?) sampai pekerjaan ini selesai.
Pada server lain, upaya pertama akan segera gagal. Tetapi jika Anda menunggu 30 detik dan mencoba lagi, itu akan berhasil jika ERDDAP™ dipasang dengan benar.

Tidak ada perbaikan untuk ini. Ini hanyalah cara kerja Tomcat. Tapi itu hanya terjadi pertama kalinya setelah Anda menginstal versi baru dari Meme it ERDDAP™ Sitemap

## Shut ke bawah dan restart{#shut-down-and-restart} 

Di masa depan, untuk menutup (dan restart)   ERDDAP™ Sitemap [Cara Shut Down dan Restart Tomcat dan ERDDAP ](/docs/server-admin/additional-information#shut-down-and-restart) Sitemap

## Login{#trouble} 

Troubles menginstal Tomcat atau ERDDAP™ Sitemap Sitemap [bagian untuk mendapatkan dukungan tambahan](/docs/intro#support) Sitemap

## Pemberitahuan Email Versi Baru ERDDAP  {#email-notification-of-new-versions-of-erddap} 

Jika Anda ingin menerima email kapan pun versi baru ERDDAP™ tersedia atau penting lainnya ERDDAP™ pengumuman,
Anda dapat bergabung dengan ERDDAP™ Sitemap [Sitemap](https://groups.google.com/g/erddap-announce) Sitemap Daftar rata-rata sekitar satu email setiap tiga bulan.

## Login{#customize} 

*  [Sesuaikan Anda ERDDAP™ untuk menyoroti organisasi Anda (Login NOAA   ERD ) Sitemap](#customize) 
* Mengubah spanduk yang muncul di bagian atas semua ERDDAP™ .html halaman dengan mengedit ` <startBodyHtml5> ` Tag di Anda ` datasets.xml ` Login
(Jika tidak ada satu, salin default dari ERDDAP™ Sitemap `tomcat/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml` Login
Login ` datasets.xml ` dan mengeditnya.) Misalnya, Anda bisa:
  * Gunakan gambar yang berbeda (i.e., logo organisasi Anda) Sitemap
  * Mengubah warna latar belakang.
  * Login ERDDAP™ " untuk "_YourOrganisasi_'s ERDDAP™ Sitemap
  * Ubah "Penyakit akses ke data ilmiah" ke "Kontenan lebih lanjut ke _Data AndaOrganisasi_'s".
  * Ubah tautan "Karena Anda oleh" untuk menjadi tautan ke organisasi Anda dan sumber pendanaan.
* Mengubah informasi di sisi kiri halaman rumah dengan mengedit ` <theShortDescriptionHtml> ` Tag di Anda ` datasets.xml ` Login
(Jika tidak ada satu, salin default dari ERDDAP™ Sitemap `tomcat/webapps/erddap/WEB-INF/classes/gov/noaa/pfel/erddap/util/messages.xml` Login
Login ` datasets.xml ` dan mengeditnya.) Misalnya, Anda bisa:
  * Jelaskan apa organisasi dan/atau kelompok Anda.
  * Jelaskan apa jenis data ini ERDDAP™ Login
  * Untuk mengubah ikon yang muncul di tab browser, masukkan favicon organisasi Anda. Login `Login` Sitemap
Sitemaphttps://en.wikipedia.org/wiki/Favicon.
