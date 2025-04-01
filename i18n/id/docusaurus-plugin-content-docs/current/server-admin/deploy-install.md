---
sidebar_position: 1
---

# Login
Cara Melakukan Pengaturan AwalERDDAP™Login


ERDDAP™dapat menjalankan server apa pun yang mendukungJavadan Tomcat (dan server aplikasi lainnya seperti Jetty, tetapi kami tidak mendukung mereka Meme it) SitemapERDDAP™telah diuji pada Linux (termasuk di AWS Amazon) , Mac, dan komputer Windows.

*    **Login** Login Jika Anda menginstalERDDAP™di Amazon Web Services EC2 instance, lihat ini[Sitemap _ Amazon Web Services](/docs/server-admin/additional-information#amazon)pertama.
*    **Login** Login Axiom[ERDDAP™dalam wadah Docker](https://hub.docker.com/u/axiom/)dan IOOS sekarang menawarkan[Panduan Mulai Cepat untukERDDAP™dalam wadah Docker](https://ioos.github.io/erddap-gold-standard/index.html)Sitemap
Ini standarERDDAP™instalasi, tetapi Axiom telah menempatkannya dalam wadah docker.
Jika Anda sudah menggunakan Docker, Anda mungkin akan lebih memilih versi Docker.
Jika Anda belum menggunakan Docker, kita umumnya tidak merekomendasikan ini.
Jika Anda memilih untuk menginstalERDDAP™melalui Docker, kami tidak menawarkan dukungan untuk proses instalasi.
Kami belum bekerja dengan Docker belum. Jika Anda bekerja dengan ini, silakan kirim komentar Anda.
*    **Linux dan Macs** LoginERDDAP™bekerja hebat di komputer Linux dan Mac. Lihat petunjuk di bawah ini.
*    **Login** Login Windows adalah baik untuk pengujianERDDAP™dan untuk penggunaan pribadi (lihat petunjuk di bawah ini) tapi kami tidak merekomendasikan menggunakannya untuk publikERDDAPSitemap LoginERDDAP™pada Windows mungkin memiliki masalah: tidak dapat,ERDDAP™mungkin tidak bisa menghapus dan/atau mengubah nama file dengan cepat. Ini mungkin karena perangkat lunak antivirus (e.g., dari McAfee dan Norton) yang memeriksa file untuk virus. Jika Anda menjalankan masalah ini (yang dapat dilihat oleh pesan kesalahan di Meme it[Login](/docs/server-admin/additional-information#log)file seperti "Tidak dapat dihapus ...") mengubah pengaturan perangkat lunak antivirus mungkin sebagian mengurangi masalah. Atau pertimbangkan menggunakan server Linux atau Mac.

 **StandarERDDAP™instruksi instalasi untuk Linux, Macs, dan komputer Windows adalah:** 

0. Pastikan ketergantungan dipasang. Pada mesin non-Windows (Linux dan Mac) , Anda perlu csh.
## Java {#java} 
1.  [SitemapERDDAP™v2.19+, set upJava21. Juni](#java)
Untuk alasan keamanan, hampir selalu terbaik untuk menggunakan versi terbaru dariJava21. Juni
Silakan unduh dan instal versi terbaru
    [OpenJDK (Login) 20 g (Login) ](https://adoptium.net/temurin/releases/?version=21)Sitemap Untuk memverifikasi instalasi, ketik "/_javaJreBinDirectory_/java -version", misalnya
/usr/local/jdk-21.0.3+9/jre/bin/java Login
    
    ERDDAP™SitemapJavadari sumber lain, tetapi kami merekomendasikan Mengadopsi karena itu adalah yang utama, didukung masyarakat, gratis (sebagai bir dan pidato) versiJava21 yang menawarkan Dukungan Jangka Panjang (upgrade gratis selama bertahun-tahun melewati rilis awal) Sitemap Untuk alasan keamanan, harap perbarui AndaERDDAP's versiJavasecara berkala sebagai versi baruJava21 tersedia dari Adopsiium.
    
    ERDDAP™telah diuji dan digunakan secara luas dengan 21, bukan versi lain. Untuk berbagai alasan, kami tidak menguji dengan atau mendukung versi lainJavaSitemap
     
## Login{#tomcat} 
2.  [Sitemap](#tomcat) [Login](https://tomcat.apache.org)Sitemap
Tomcat adalah yang paling banyak digunakanJavaServer Aplikasi, yangJavaperangkat lunak yang berdiri antara layanan jaringan sistem operasi danJavasoftware server sepertiERDDAP™Sitemap Gratis dan Open Source Software (Login) Sitemap
    
Anda dapat menggunakan yang lainJavaServer Aplikasi (Sitemap) tetapi kami hanya menguji dan mendukung Tomcat.
     
    
    * Unduh Tomcat dan unpack di server atau PC Anda.
Untuk alasan keamanan, hampir selalu terbaik untuk menggunakan versi terbaru Tomcat 10 (versi 9 dan di bawah ini tidak dapat diterima) yang dirancang untuk bekerja denganJava21 atau lebih baru. Di bawah ini, direktori Tomcat akan disebut sebagai _tomcat_.
        
Login Jika Anda sudah memiliki Tomcat menjalankan beberapa aplikasi web lain (terutama THREDDS) Kami merekomendasikan bahwa Anda menginstalERDDAP™Sitemap[Tomcat kedua](/docs/server-admin/additional-information#second-tomcat)SitemapERDDAP™perlu pengaturan Tomcat yang berbeda dan seharusnya tidak harus masuk dengan aplikasi lain untuk memori.
        
        * Di Linux,[Unduh "Core" "tar.gz" Distribusi Tomcat](https://tomcat.apache.org/download-10.cgi)dan membongkarnya. Kami merekomendasikan unpacking di /usr/local.
        * Pada Mac, Tomcat mungkin sudah dipasang di /Library/Tomcat, tetapi harus memperbaruinya ke versi terbaru Tomcat 10.
Jika Anda mengunduhnya,[Unduh "Core" "tar.gz" Distribusi Tomcat](https://tomcat.apache.org/download-10.cgi)dan membongkarnya di /Library/Tomcat.
        * Di Windows, Anda dapat[Download "Core" "zip" distribusi Tomcat](https://tomcat.apache.org/download-10.cgi)  (yang tidak berantakan dengan registry Windows dan yang Anda kendali dari jalur perintah DOS) dan membongkarnya di direktori yang tepat. (Untuk pengembangan, kami menggunakan distribusi "Core" "zip". Kami membuat direktori / program dan membongkarnya di sana.) Atau Anda dapat mengunduh distribusi "Core" "64-bit Windows zip", yang mencakup lebih banyak fitur. Jika distribusi adalah installer Windows, itu mungkin akan menempatkan Tomcat di, misalnya, /Program File/apache-tomcat-10.0.23 .
             
### WordPress.org{#serverxml} 
*   [WordPress.org](#serverxml)- Dalam file _tomcat_/conf/server.xml, ada dua perubahan yang harus Anda lakukan untuk setiap dari dua&lt;Konektor & gt; tag- satu untuk
```
        <Connector port="8080" 
```
dan satu untuk
```
        <Conector port="8443"
```
    1.   (Sitemap) Meningkatkan nilai parameter koneksiTimeout, mungkin untuk 300000 (Login)   (yang 5 menit) Sitemap
    2.   (Sitemap) Tambahkan parameter baru: santaiedQueryChars="\\[\\]|Sitemap Ini adalah opsional dan sedikit kurang aman, tetapi menghilangkan kebutuhan bagi pengguna untuk mengurangi kode karakter ini ketika mereka terjadi dalam parameter URL permintaan pengguna.
             
### Login{#contentxml} 
* Login Cache Sumber Daya - In _tomcat_/conf/context.xml, kanan sebelum&lt;/Context&gt; tag, mengubah tag Sumber Daya (atau menambahkannya jika belum ada Meme it) untuk mengatur cache MaxSize parameter untuk 80000:
    &lt;Sumber daya cachingAllowed="true" cacheMaxSize="80000" / & gt;
Ini menghindari banyak peringatan di catalina. keluar bahwa semua dimulai dengan Meme it
Login\\[Login\\]org.apache.catalina.webresources.Cache Tidak dapat menambahkan sumber daya di\\[Login
         
### Apache Timeout{#apache-timeout} 
* Pada komputer Linux, ubah pengaturan waktu Apache sehingga permintaan pengguna yang memakan waktu tidak (dengan apa yang sering muncul sebagai kesalahan "Proxy" atau "Bad Gateway") Sitemap Sebagai pengguna akar:
    1. Modifikasi Apachehttpd.conf file (biasanya dalam / dll /httpSitemap) Sitemap
Mengubah yang ada&lt;Timeout & gt; pengaturan (atau tambahkan satu di akhir file) ke 3600 (Sitemap) , bukan default 60 atau 120 detik.
Mengubah yang ada&lt;ProxyTimeout & gt; pengaturan (atau tambahkan satu di akhir file) ke 3600 (Sitemap) , bukan default 60 atau 120 detik.
    2. Restart Apache: /usr/sbin/apachectl Login (tetapi kadang-kadang dalam direktori yang berbeda) Sitemap
             
    * Rekomendasi keamanan: Sitemap[petunjuk ini](https://tomcat.apache.org/tomcat-10.0-doc/security-howto.html)untuk meningkatkan keamanan instalasi Tomcat Anda, terutama untuk server publik.
         
    * Untuk publikERDDAP™instalasi di Linux dan Macs, yang terbaik untuk mengatur Tomcat (program) seperti milik pengguna "tomcat" (pengguna yang terpisah dengan izin terbatas dan yang[tidak ada kata sandi](https://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password)) Sitemap Dengan demikian, hanya pengguna super dapat beralih bertindak sebagai tomcat pengguna. Ini tidak mungkin untuk peretas untuk masuk ke server Anda sebagai tomcat pengguna. Dan dalam kasus apa pun, Anda harus melakukannya sehingga pengguna tomcat memiliki izin yang sangat terbatas pada sistem file server (read +write + hak istimewa eksekusi untuk pohon direktori apache-tomcat dan&lt;bigParentDirectory&gt; dan hak istimewa membaca untuk direktori dengan data yangERDDAP™akses ke).
        * Anda dapat membuat akun pengguna tomcat (yang tidak memiliki kata sandi) dengan menggunakan perintah
sudo useradd tomcat Sitemap
        * Anda dapat beralih bekerja sebagai tomcat pengguna dengan menggunakan perintah
WordPress.org
             (Ini akan meminta Anda untuk password superuser untuk izin untuk melakukan ini.) 
        * Anda dapat berhenti bekerja sebagai tomcat pengguna dengan menggunakan perintah
Login
        * Apakah sebagian besar sisa Tomcat danERDDAP™instruksi pengaturan sebagai pengguna "tomcat". Kemudian, jalankan startup.sh dan shutdown.sh script sebagai pengguna "tomcat" sehingga Tomcat memiliki izin untuk menulis ke file log.
        * Setelah membongkar Tomcat, dari induk direktori apache-tomcat:
            
            * Mengubah kepemilikan pohon direktori apache-tomcat ke pengguna tomcat.
phpBB SEO
                 (tetapi mengganti nama direktori tomcat Anda yang sebenarnya) Sitemap
            * Mengubah "kelompok" menjadi tomcat, nama pengguna Anda, atau nama kelompok kecil yang mencakup tomcat dan semua administrator Tomcat/ERDDAPSitemap
Login Facebook Twitter Google Plus Pinterest Email
            * Mengubah izin sehingga tomcat dan kelompok telah membaca, menulis, melaksanakan hak istimewa, misalnya,.
chmod -R ug+rwx apache-tomcat-_10.0.23_
            * Hapus izin pengguna "lain" untuk membaca, menulis, atau melaksanakan:
chmod -R o-rwx apache-tomcat-_10.0.23_
Hal ini penting, karena mencegah pengguna lain dari membaca mungkin informasi sensitif dalamERDDAP™file setup.
            
              
### Login{#memory} 
* Mengatur Variabel Lingkungan Tomcat
    
Linux dan Macs:
WordPress.org (atau di Red Hat Enterprise Linux\\[Login\\], edit ~tomcat/conf/tomcat10.conf) untuk mengatur variabel lingkungan Tomcat. File ini akan digunakan oleh _tomcat_/bin/startup.sh dan shutdown.sh. File harus mengandung sesuatu seperti:
```
    export JAVA\\_HOME=/usr/local/jdk-21.0.3+9  
    export JAVA\\_OPTS='-server -Djava.awt.headless=true -Xmx1500M -Xms1500M'  
    export TOMCAT\\_HOME=/usr/local/apache-tomcat-_10.0.23_  
    export CATALINA\\_HOME=/usr/local/apache-tomcat-_10.0.23_
```
 (tetapi mengganti nama direktori dari komputer Anda) Sitemap
 (Jika Anda sebelumnya mengatur JRE\\_HOME, Anda dapat menghapus itu.)   
Di Macs, Anda mungkin tidak perlu mengatur JAVA\\_HOME.

Di Windows:
Buat file _tomcat_\bin\bin\\setenv.bat untuk mengatur variabel lingkungan Tomcat. File ini akan digunakan oleh _tomcat_\bin\\startup.bat danshutdown.batSitemap File harus mengandung sesuatu seperti:
```
    SET "JAVA\\_HOME=\\_someDirectory_\\jdk-21.0.3+9"  
    SET "JAVA\\_OPTS=-server -Xmx1500M -Xms1500M"  
    SET "TOMCAT\\_HOME=\\Program Files\\apache-tomcat-_10.0.23_"  
    SET "CATALINA\\_HOME=\\Program Files\\apache-tomcat-_10.0.23_"
```
 (tetapi mengganti nama direktori dari komputer Anda) Sitemap
Jika ini hanya untuk pengujian lokal, hapus "-server".
 (Jika Anda sebelumnya mengatur JRE\\_HOME, Anda dapat menghapus itu.) 

Pengaturan memori -Xmx dan -Xms penting karenaERDDAP™bekerja lebih baik dengan lebih banyak memori. Selalu set -Xms ke nilai yang sama seperti -Xmx.

* Untuk Sistem Operasi 32 bit dan 32 bitJavaSitemap
64 gJavajauh lebih baik dari 32 bitJava, tapi 32 bitJavaakan bekerja selama server tidak benar-benar sibuk. Memori lebih fisik di server yang lebih baik: 4 + GB benar-benar baik, 2 GB tidak oke, kurang tidak dianjurkan. Dengan 32 bitJava, bahkan dengan memori fisik yang melimpah, Tomcat danJavatidak akan berjalan jika Anda mencoba untuk mengatur -Xmx lebih dari 1500M (1200M pada beberapa komputer) Sitemap Jika server Anda memiliki kurang dari 2GB memori, kurangi nilai -Xmx (di 'M'egaBytes) untuk 1/2 memori fisik komputer.
* Untuk 64 bit Sistem Operasi dan 64 bitJavaSitemap
64 gJavahanya akan bekerja pada sistem operasi 64 bit.
    
    * SitemapJava8, Anda perlu menambahkan \\-d64 ke parameter Tomcat CATALINA\\_OPTS dalam setenv.bat
    * SitemapJava21, Anda memilih 64 bitJavaketika Anda mengunduh versiJavaditandai "64 bit".
    
Dengan 64 bitJavaLoginJavadapat menggunakan pengaturan -Xmx dan -Xms yang sangat tinggi. Memori yang lebih fisik di server yang lebih baik. Sebagai saran sederhana: kami sarankan Anda mengatur -Xmx dan -Xms untuk (di 'M'egaBytes) ke 1/2 (atau kurang) memori fisik komputer. Anda dapat melihat apakah Tomcat,JavaSitemapERDDAP™memang berjalan dalam mode 64 bit dengan mencari " bit," dalamERDDAP's Daily Report email atau di _bigParentDirectory_/logs/[Login](/docs/server-admin/additional-information#log)Login (_bigParentDirectory_ ditentukan dalam[WordPress.org](#setupxml)) Sitemap
#### Koleksi Sampah{#garbage-collection} 
* SitemapERDDAP™Sitemap[Login](/docs/server-admin/additional-information#log)file, Anda akan melihat banyak "GC (Sitemap) Sitemap
Ini biasanya bukan masalah. Ini adalah pesan yang sering dari operasi normalJavamengatakan bahwa itu hanya selesai koleksi garbage kecil karena itu kehabisan ruangan di Eden (bagian dariJavaheap untuk objek yang sangat muda) Sitemap Biasanya pesan menunjukkan kepada Anda _memoryUseBefore_\\-&gt;_memoryUse After_. Jika dua angka ditutup bersama, itu berarti bahwa pengumpulan sampah tidak produktif. Pesan hanya tanda masalah jika sangat sering (setiap beberapa detik) tidak produktif, dan angkanya besar dan tidak berkembang, yang bersama-sama menunjukkan bahwaJavamembutuhkan lebih banyak memori, berjuang untuk membebaskan memori, dan tidak bisa bebas memori. Ini mungkin terjadi selama waktu stres, kemudian pergi. Tetapi jika penambah, itu adalah tanda masalah.
* Jika Anda melihat java.lang.OutOfMemoryError diERDDAP™Sitemap[Login](/docs/server-admin/additional-information#log)file, lihat[Login](/docs/server-admin/additional-information#outofmemoryerror)untuk tips tentang cara mendiagnosis dan menyelesaikan masalah.
         
### Login{#permissions} 
*   [Linux dan Macs, mengubah izin](#permissions)semua\\*.shfile di _tomcat_/bin/ untuk dapat dieksekusi oleh pemilik, misalnya, dengan
```
    chmod +x \\*.sh  
```
### Login{#fonts} 
*   [Font untuk gambar:](#fonts)Kami sangat memilih gratis[Sitemap](https://dejavu-fonts.github.io/)ke yang lainJavaLogin Menggunakan font ini sangat dianjurkan tetapi tidak diperlukan.
    
Jika Anda memilih untuk tidak menggunakan font DejaVu, Anda perlu mengubah pengaturan fontFamily di setup.xml untuk&lt;fontFamily&gt;SansSerif&lt;/fontFamily&gt;, yang tersedia dengan semuaJavaSitemap Jika Anda mengatur fontFamily ke nama font yang tidak tersedia,ERDDAP™tidak akan memuat dan akan mencetak daftar font yang tersedia di file log.txt. Anda harus menggunakan salah satu font tersebut.
    
Jika Anda memilih untuk menggunakan font DejaVu, pastikan pengaturan fontFamily di setup.xml adalah&lt;Login Family&gt;DejaVu Sans&lt;/fontFamily&gt;.
    
Untuk menginstal font DejaVu, silakan unduh[Login.zip](/DejaVuFonts.zip)  (5,522,795 byte, MD5=33E1E61FAB06A547ED308B4FFEF42) dan unzip file font ke direktori sementara.
    
    * Di Linux:
        * Untuk Mengadopsi LinuxJavadistribusi, lihat[petunjuk ini](https://blog.adoptopenjdk.net/2021/01/prerequisites-for-font-support-in-adoptopenjdk/)Sitemap
        * SitemapJavadistribusi: Sebagai pengguna Tomcat, menyalin file font ke _ JAVA\\_HOME_/lib/fonts sehinggaJavadapat menemukan font. Ingat: jika / ketika Anda kemudian meningkatkan ke versi yang lebih baru dariJavaAnda perlu menginstal ulang font ini.
    * Di Macs: untuk setiap file font, klik ganda di atasnya dan kemudian klik Install Font.
    * Pada Windows 7 dan 10: di Windows Explorer, pilih semua file font. Klik kanan. Klik pada Install.
             
### Uji Tomcat{#test-tomcat} 
* Uji instalasi Tomcat Anda.
    * Linux:
        * Sebagai pengguna "tomcat", jalankan _tomcat_/bin/startup.sh
        * Lihat URL Anda + ":80 /" di browser Anda (Login[ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/)) Sitemap
        * Anda harus melihat halaman Tomcat "Congratulations".
Jika ada kesulitan, lihat file log Tomcat _tomcat_/logs/catalina.out.
    * Login (menjalankan tomcat sebagai pengguna administrator sistem) Sitemap
        * WordPress.org
        * Lihat URL Anda + ":80 /" di browser Anda (Login[ http://coastwatch.pfeg.noaa.gov:8080/ ](http://coastwatch.pfeg.noaa.gov:8080/)) Sitemap Perhatikan bahwa secara default, Tomcat Anda hanya dapat diakses oleh Anda. Tidak dapat diakses secara publik.
        * Anda harus melihat halaman Tomcat "Congratulations".
Jika ada kesulitan, lihat file log Tomcat _tomcat_/logs/catalina.out.
    * Windows Server:
        
        * Klik kanan pada ikon Tomcat di baki sistem, dan pilih "Layanan Start".
        * Login[ http://127.0.0.1:8080/ ](http://127.0.0.1:8080/)atau mungkin[ http://localhost:8080/ ](http://localhost:8080/)di browser Anda. Perhatikan bahwa secara default, Tomcat Anda hanya dapat diakses oleh Anda. Tidak dapat diakses secara publik.
        * Anda harus melihat halaman Tomcat "Congratulations".
Jika ada kesulitan, lihat file log Tomcat _tomcat_/logs/catalina.out.
            
### Troubles dengan instalasi Tomcat?{#troubles-with-the-tomcat-installation} 
* Di Linux dan Mac, jika Anda tidak bisa mencapai Tomcat atauERDDAP™  (atau mungkin Anda tidak bisa mencapainya dari komputer di luar firewall Anda) , Anda dapat menguji apakah Tomcat mendengarkan port 8080, dengan mengetik (sebagai akar) pada baris perintah dari server:
```  
    netstat -tuplen | grep 8080  
```
Itu harus mengembalikan satu baris dengan sesuatu seperti:
``` 
    tcp 0 0 :::8080 :::\\* LISTEN ## ##### ####/java
``` 
     (di mana '#' adalah beberapa digit) , menunjukkan bahwa proses "java" (Sitemap) mendengarkan port "8080" untuk lalu lintas "tcp". Jika tidak ada garis dikembalikan, jika garis dikembalikan secara signifikan berbeda, atau jika dua atau lebih garis dikembalikan, maka mungkin ada masalah dengan pengaturan port.
* Lihat file log Tomcat _tomcat_/logs/catalina.out. Masalah Tomcat dan beberapaERDDAP™masalah startup hampir selalu ditunjukkan di sana. Ini umum ketika Anda pertama kali menyiapkanERDDAP™Sitemap
* Sitemap[Login](https://tomcat.apache.org/)situs web atau mencari web untuk membantu, tetapi harap beri tahu kami masalah yang Anda miliki dan solusi yang Anda temukan.
* Sitemap[bagian untuk mendapatkan dukungan tambahan](/docs/intro#support)Sitemap
             
### ERDDAP™Login{#erddap-content} 
3.  [Sitemap_tomcat_/content/erddapfile konfigurasi.](#erddap-content)  
Di Linux, Mac, dan Windows, download[Login.zip](https://github.com/ERDDAP/erddapContent/releases/download/content1.0.0/erddapContent.zip)  (versi 1.0.0, 20333 byte, MD5=2B8D2A5AE5ED73E3A42B529C168C60B5, tanggal 2024-10-14) dan unzip ke _tomcat_, menciptakan_tomcat_/content/erddapSitemap

    \\[Beberapa versi sebelumnya juga tersedia:
    [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddapContent.zip)  (19,792 byte, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, tanggal 2022-02-16)   
    [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddapContent.zip)  (19,792 byte, MD5=8F892616BAEEF2DF0F4BB036DCB4AD7C, tanggal 2022-02-16)   
    [2.21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddapContent.zip)  (19,810 byte, MD5=1E26F62E7A06191EE6868C40B9A29362, tanggal 2022-10-09)   
    [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddapContent.zip)  (19,810 byte, MD5=1E26F62E7A06191EE6868C40B9A29362, tanggal 2022-12-08) 
    [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddapContent.zip)  (19,810 byte, MD5=1E26F62E7A06191EE6868C40B9A29362, tanggal 2023-02-27) 
dan unzip ke _tomcat_, menciptakan_tomcat_/content/erddapSitemap\\]
    
#### Direktori Lainnya{#other-directory} 
Untuk Red Hat Enterprise Linux (Login) atau untuk situasi lain di mana Anda tidak diperbolehkan untuk memodifikasi direktori Tomcat atau di mana Anda ingin/digunakan untuk menempatkanERDDAP™direktori konten di beberapa lokasi lain untuk beberapa alasan lain (misalnya, jika Anda menggunakan Jetty bukan Tomcat) erddapContent.zipke direktori yang diinginkan (yang hanya user=tomcat memiliki akses) dan seterddapContentDirectoryproperti sistem (LoginerddapContentDirectory=~tomcat/content/erddap) SitemapERDDAP™dapat menemukan direktori konten baru ini.
    
### WordPress.org{#setupxml} 
*   [Baca komentar di_tomcat_/content/erddapSitemap **WordPress.org** ](#setupxml)dan membuat perubahan yang diminta. setup.xml adalah file dengan semua pengaturan yang menentukan bagaimana AndaERDDAP™Login
Untuk pengaturan awal, Anda HARUS setidaknya mengubah pengaturan ini:
```
    <bigParentDirectory>, <emailEverythingTo>, <baseUrl>, <email.\\*>, <admin.\\*> (and <baseHttpsUrl> when you set up https).
```
    
Ketika Anda membuat bigParentDirectory, dari direktori induk dari bigParentDirectory:
    
    * Membuat pengguna=tomcat pemilik besarParentDirectory, misalnya,
```
        chown -R tomcat _bigParentDirectory_
```
    * Mengubah "kelompok" menjadi tomcat, nama pengguna Anda, atau nama kelompok kecil yang mencakup tomcat dan semua administrator Tomcat/ERDDAPSitemap
```
        chgrp -R _yourUserName_ _bigParentDirectory_
```
    * Mengubah izin sehingga tomcat dan kelompok telah membaca, menulis, melaksanakan hak istimewa, misalnya,.
```
        chmod -R ug+rwx _bigParentDirectory_
```
    * Hapus izin pengguna "lain" untuk membaca, menulis, atau melaksanakan. Hal ini penting untuk mencegah membaca informasi yang mungkin sensitif dalamERDDAP™file log dan file dengan informasi tentang dataset pribadi.:
```
        chmod -R o-rwx _bigParentDirectory_
```

### Variabel Lingkungan{#environment-variables} 
SitemapERDDAP™v2.13,ERDDAP™administrator dapat menimpa nilai apapun dalam setup.xml dengan menentukan variabel lingkungan bernamaERDDAP\\__valueName_ sebelum berjalanERDDAP™Sitemap Misalnya, gunakanERDDAPLogin&lt;baseUrl&gt; nilai. Ini dapat berguna ketika menyebarkanERDDAP™dengan wadah seperti Docker, karena Anda dapat menempatkan pengaturan standar di setup.xml dan kemudian menyediakan pengaturan khusus melalui variabel lingkungan. Jika Anda menyediakan informasi rahasia untukERDDAP™melalui metode ini, pastikan untuk memeriksa informasi tersebut akan tetap rahasia.ERDDAP™hanya membaca variabel lingkungan setelah per startup, di kedua startup pertama, jadi satu cara untuk menggunakan ini adalah: mengatur variabel lingkungan, mulaiERDDAPSitemapERDDAP™dimulai, kemudian menetapkan variabel lingkungan.
    
### datasets.xml {#datasetsxml} 
* Baca komentar di[ **Bekerja dengandatasets.xmlLogin** ](/docs/server-admin/datasets)Sitemap Kemudian, setelah Anda mendapatkanERDDAP™berjalan untuk pertama kalinya (biasanya hanya dengan set data default) , Anda akan memodifikasi XML di_tomcat_/content/erddapSitemap **datasets.xml** untuk menentukan semua dataset yang Anda inginkanERDDAP™Sitemap Di sinilah Anda akan menghabiskan banyak waktu Anda sambil menyiapkanERDDAP™dan kemudian sambil menjaga Anda Meme itERDDAP™Sitemap

Anda dapat melihat contoh[datasets.xmldi GitHub](https://github.com/ERDDAP/erddap/blob/main/development/jetty/config/datasets.xml)Sitemap
     
*    (Sitemap) Sitemap (sedikit lebih mungkin) di masa depan, jika Anda ingin memodifikasi file CSS erddap, membuat salinan_tomcat_/content/erddap/images/erddapStart2.css disebut erddap2.css dan kemudian membuat perubahan. Perubahan ke erddap2.css hanya berlaku ketikaERDDAP™direstart dan sering juga memerlukan pengguna untuk menghapus file cache browser.
     
ERDDAP™tidak akan bekerja dengan benar jika setup.xml ataudatasets.xmlfile bukan file XML yang dibentuk dengan baik. Jadi, setelah Anda mengedit file-file ini, itu adalah ide yang baik untuk memverifikasi bahwa hasilnya adalah XML berbentuk dengan baik dengan menelusuri teks XML ke dalam pemeriksa XML seperti[Login](https://www.xmlvalidation.com/)Sitemap
     
### Instal file erddap.war{#install-the-erddapwar-file} 
4. Di Linux, Mac, dan Windows, download[Login](https://github.com/ERDDAP/erddap/releases/download/v2.26.0/erddap.war)ke _tomcat_/webapps.
     (versi 2.26, 607,404,032 byte, MD5=99a725108b37708e5420986c16a119, tanggal 03-31-2025) 
    
File .war besar karena mengandung garis pantai resolusi tinggi, batas, dan data elevasi yang diperlukan untuk membuat peta.
    
    \\[Beberapa versi sebelumnya juga tersedia.
    [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.17/erddap.war)  (551,068,245 byte, MD5=5FEA912B5D42E50EAB9591F773EAD, tanggal 2022-02-16)   
    [2.18](https://github.com/ERDDAP/erddap/releases/download/v2.18/erddap.war)  (551,069,844 byte, MD5=461325E97E7577EC671DD50246CCFB8B, tanggal 2022-02-23)   
    [2.21](https://github.com/ERDDAP/erddap/releases/download/v2.21/erddap.war)  (568,644,411 byte, MD5=F2CFF805893146E932E498FDDBD519B6, tanggal 2022-10-09)   
    [2.22](https://github.com/ERDDAP/erddap/releases/download/v2.22/erddap.war)  (567,742,765 byte, MD5=2B33354F633294213AE2AFDDCF4DA6D0, tanggal 2022-12-08) 
    [2.23](https://github.com/ERDDAP/erddap/releases/download/v2.23/erddap.war)  (572,124,953 byte, MD5=D843A043C506725EBD6F8EFDCCA8FD5F, tanggal 2023-03-03) 
    [2.24](https://github.com/ERDDAP/erddap/releases/download/v2.24/erddap.war)  (568,748,187 byte, MD5=970fbee172e28b0a07756eecbc898e, tanggal 2024-06-07) 
    [2.25](https://github.com/ERDDAP/erddap/releases/download/v2.25.1/erddap.war)  (592,292,039 byte, MD5=652AFC9D1421F00B5F789DA2C4732D4C, tanggal 2024-11-07) 
    \\]
    
#### Login{#proxypass} 
5. Gunakan Proxy Pass sehingga pengguna tidak perlu menempatkan nomor port, misalnya, : 8080, di URL.
Pada komputer Linux, jika Tomcat berjalan di Apache, harap ubah Apachehttpd.conf file (biasanya dalam / dll /httpSitemap) untuk mengizinkan lalu lintas HTTP ke/dariERDDAP™tanpa memerlukan nomor port, misalnya, : 8080, di URL. Sebagai pengguna akar:
    1. Modifikasi yang ada&lt;VirtualHost & gt; tag (jika ada satu) atau tambahkan satu di akhir file:
```
        <VirtualHost \\*:80>
           ServerName _YourDomain.org_
           ProxyRequests Off
           ProxyPreserveHost On
           ProxyPass /erddap http://localhost:8080/erddap
           ProxyPassReverse /erddap http://localhost:8080/erddap
        </VirtualHost>
```
    2. Kemudian restart Apache: /usr/sbin/apachectl Login (tetapi kadang-kadang dalam direktori yang berbeda) Sitemap
         
### Login{#nginx} 
 (LoginNCOLogin) Jika Anda menggunakan[Login](https://www.nginx.com/)  (Web server dan load balancer) Sitemap
untuk mendapatkan NGINX danERDDAP™bekerja dengan benarhttps, Anda perlu menempatkan cuplikan berikut di server Tomcat.xml&lt;Host&gt; blok:
```
    &lt;Valve className="org.apache.catalina.valves.RemoteIpValve"  
      remoteIpHeader="X-Forwarded-For"  
      protocolHeader="X-Forwarded-Proto"  
      protocolHeaderHttpsValue="https" /&gt; 
```
Dan dalam file konfigurasi nginx, Anda perlu mengatur header ini:
```
      proxy\\_set\\_header Host              $host;
      proxy\\_set\\_header X-Real-IP         $remote\\_addr;
      proxy\\_set\\_header REMOTE\\_ADDR       $remote\\_addr;
      proxy\\_set\\_header HTTP\\_CLIENT\\_IP    $remote\\_addr;
      proxy\\_set\\_header X-Forwarded-For   $proxy\\_add\\_x\\_forwarded\\_for;
      proxy\\_set\\_header X-Forwarded-Proto $scheme;
```
 (Kyle Wilcox)   
     
### Mulai Tomcat{#start-tomcat} 
*    (Saya tidak merekomendasikan menggunakan Tomcat Web Application Manager. Jika Anda tidak sepenuhnya shutdown dan startup Tomcat, lebih cepat atau lambat Anda akan memiliki masalah memori PermGen.)   
     
*    (Di Linux atau Mac OS, jika Anda telah membuat pengguna khusus untuk menjalankan Tomcat, misalnya, tomcat, ingat untuk melakukan langkah-langkah berikut sebagai pengguna itu.)   
     
* Jika Tomcat sudah berjalan, tutup Tomcat dengan (di Linux atau Mac OS) _tomcat_/bin/shutdown.sh
Sitemap (di Windows) Loginshutdown.bat
    
Di Linux, gunakan ps -ef|grep tomcat sebelum dan sesudah shutdown.sh untuk memastikan proses tomcat telah berhenti. Proses harus tercantum sebelum shutdown dan akhirnya tidak terdaftar setelah shutdown. Ini mungkin memakan waktu satu menit atau dua untukERDDAP™untuk menutup sepenuhnya. Promo Atau jika terlihat seperti itu tidak akan berhenti sendiri, gunakan:
Facebook Twitter Youtube
    
* Mulai Tomcat dengan (di Linux atau Mac OS) Login
Sitemap (di Windows) Login

## LoginERDDAP™Login{#is-erddap-running} 
Gunakan browser untuk mencoba untuk melihat http://_www.YourServer.org_/erddap/status.html   
ERDDAP™dimulai tanpa dataset dimuat. Dataset dimuat dalam benang latar belakang dan jadi menjadi yang tersedia.

### Login{#troubleshooting} 
* Ketika permintaan dari pengguna datang, itu pergi ke Apache (di Linux dan Mac OS komputer) , kemudian Tomcat, kemudianERDDAP™Sitemap
* Anda dapat melihat apa yang datang ke Apache (dan kesalahan terkait) di file log Apache.
*   [Login](/docs/server-admin/additional-information#tomcat-logs)bisa melihat apa yang datang ke Tomcat (dan kesalahan terkait) di file log Tomcat (_tomcat_/logs/catalina.out dan file lain di direktori itu) Sitemap
*   [Login](/docs/server-admin/additional-information#log)dapat melihat apa yang datang untuk Meme itERDDAP, pesan diagnostik dariERDDAP, dan pesan kesalahan dariERDDAPSitemapERDDAP™ &lt;bigParentDirectory&gt;logs/log.txt file.
* Tomcat tidak mulaiERDDAP™sampai Tomcat mendapat permintaan untukERDDAP™Sitemap Jadi Anda dapat melihat di file log Tomcat jika dimulaiERDDAP™atau jika ada pesan kesalahan yang berkaitan dengan upaya tersebut.
* SitemapERDDAP™mulai, itu mengubah nama lama Meme itERDDAP™Login (Login) dan membuat file log.txt baru. Jadi jika log. Meme it txt file lama, itu adalah tanda bahwa Meme itERDDAP™belum baru-baru ini direstart.ERDDAP™menulis info log ke penyangga dan hanya menulis penyangga ke file log secara berkala, tetapi Anda dapat memaksaERDDAP™untuk menulis penyangga ke file log dengan mengunjungi .../erddap/status.htmlSitemap

### Masalah: Versi LamaJava {#trouble-old-version-of-java} 
Jika Anda menggunakan versiJavaitu terlalu tua untuk Meme itERDDAPLoginERDDAP™tidak akan berjalan dan Anda akan melihat pesan kesalahan dalam file log Tomcat seperti
Exception di thread "main" java.lang.UnsupportedClassVersionError:
_some/class/name_: Unsupported besar.minor versi _someNumber_
Solusinya adalah untuk memperbarui versi terbaru dari versi terbaruJavadan pastikan bahwa Tomcat menggunakannya. Meme it

### Masalah: Slow Startup Pertama kali{#trouble-slow-startup-first-time} 
Tomcat harus melakukan banyak pekerjaan pertama kali sebuah aplikasi sepertiERDDAP™dimulai; tidak mungkin, itu harus membongkar erddap. file perang (yang seperti.zipLogin) Sitemap Pada beberapa server, upaya pertama untuk melihatERDDAP™Login (30 detik?) sampai pekerjaan ini selesai. Pada server lain, upaya pertama akan segera gagal. Tetapi jika Anda menunggu 30 detik dan mencoba lagi, itu akan berhasil jikaERDDAP™dipasang dengan benar.
Tidak ada perbaikan untuk ini. Ini hanyalah cara kerja Tomcat. Tapi itu hanya terjadi pertama kalinya setelah Anda menginstal versi baru dari Meme itERDDAP™Sitemap

## Shut ke bawah dan restart{#shut-down-and-restart} 
Di masa depan, untuk menutup (dan restart)  ERDDAPSitemap[Cara Shut Down dan Restart Tomcat danERDDAP](/docs/server-admin/additional-information#shut-down-and-restart)Sitemap
## Login{#trouble} 
Troubles menginstal Tomcat atauERDDAPSitemap Sitemap[bagian untuk mendapatkan dukungan tambahan](/docs/intro#support)Sitemap
## Pemberitahuan Email Versi BaruERDDAP {#email-notification-of-new-versions-of-erddap} 
Jika Anda ingin menerima email kapan pun versi baruERDDAP™tersedia atau penting lainnyaERDDAP™pengumuman, Anda dapat bergabung denganERDDAP™Sitemap[Sitemap](https://groups.google.com/g/erddap-announce)Sitemap Daftar rata-rata sekitar satu email setiap tiga bulan.
## Login{#customize} 
[Sesuaikan AndaERDDAP™untuk menyoroti organisasi Anda (LoginNOAA ERD) Sitemap](#customize)
    * Mengubah spanduk yang muncul di bagian atas semuaERDDAP™.html halaman dengan mengedit&lt;startBodyHtml5&gt; tag di Andadatasets.xmlLogin (Jika tidak ada satu, salin default dariERDDAPSitemap
        \\[Login\\]/webapps/erddap/WEB-INF/classes/gov/noa/pfel/erddap/util/messages.xml file kedatasets.xmldan mengeditnya.) Misalnya, Anda bisa:
        * Gunakan gambar yang berbeda (i.e., logo organisasi Anda) Sitemap
        * Mengubah warna latar belakang.
        * LoginERDDAP" untuk "_YourOrganisasi_'sERDDAPSitemap
        * Ubah "Penyakit akses ke data ilmiah" ke "Kontenan lebih lanjut ke _Data AndaOrganisasi_'s".
        * Ubah tautan "Karena Anda oleh" untuk menjadi tautan ke organisasi Anda dan sumber pendanaan.
    * Mengubah informasi di sisi kiri halaman rumah dengan mengedit&lt;theShortDescriptionHtml&gt; tag di Andadatasets.xmlLogin (Jika tidak ada satu, salin default dariERDDAPSitemap
        \\[Login\\]/webapps/erddap/WEB-INF/classes/gov/noa/pfel/erddap/util/messages.xml file kedatasets.xmldan mengeditnya.) Misalnya, Anda bisa:
        * Jelaskan apa organisasi dan/atau kelompok Anda.
        * Jelaskan apa jenis data iniERDDAP™Login
    * Untuk mengubah ikon yang muncul di tab browser, masukkan favicon organisasi Anda. Login_tomcat_/content/erddapLogin Sitemap[ https://en.wikipedia.org/wiki/Favicon ](https://en.wikipedia.org/wiki/Favicon)Sitemap
