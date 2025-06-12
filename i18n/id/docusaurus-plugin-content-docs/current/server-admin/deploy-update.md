---
sidebar_position: 2
---
# Sitemap
Bagaimana Cara Melakukan PembaruanERDDAP™Login

## Login{#changes} 
1. Membuat perubahan yang tercantum dalam[Login](/changes)di bagian berjudul "Mereka Meme itERDDAP™Administrator Perlu Tahu dan Lakukan" untuk semuaERDDAP™versi karena versi yang Anda gunakan.
     
## Java {#java} 
2. Apabila Anda mengupgrade dariERDDAP™versi 2.18 atau di bawah ini, Anda perlu beralih keJava20 g (Sitemap) dan Tomcat terkait 10. SitemapERDDAP™instruksi instalasi untuk[Java](/docs/server-admin/deploy-install#java)Login[Login](/docs/server-admin/deploy-install#tomcat)Sitemap Anda juga harus menyalin Anda Meme it_tomcat_/content/erddapdirektori dari instalasi Tomcat lama Anda ke instalasi Tomcat baru Anda.

## Login{#download} 
3. Login[Login](https://github.com/ERDDAP/erddap/releases/download/v2.27.0/erddap.war)ke _tomcat_/webapps.
     (versi 2.27.0, 620,554,403 byte, MD5=3b2086c659eee4145ca2dff447bf4ef7, tanggal 06-11-2025) 
     
## Login{#messagesxml} 
4. 
    * Sitemap Apabila Anda mengupgrade dariERDDAP™versi 1.46 (atau di atas) dan Anda hanya menggunakan pesan standar, pesan standar baru.xml akan diinstal secara otomatis (diantara file .class melalui erddap. Login) Sitemap
         
    * Login Apabila Anda mengupgrade dariERDDAP™versi 1.44 (Sitemap) Login
Anda MUST menghapus pesan lama.xml file:
        _tomcat_/content/erddapWordPress.org
Pesan standar baru.xml akan diinstal secara otomatis (diantara file .class melalui erddap. Login) Sitemap
         
    * Login Jika Anda selalu membuat perubahan pada pesan standar.xml file (di tempat) Login
Anda perlu membuat perubahan pada pesan baru.xml file (yang merupakan
Web-INF/classes/gov/noaa/pfel/erddap/util/messages.xml setelah erddap.war ditekan oleh Tomcat).
         
    * Login Jika Anda mempertahankan file kustom.xml di_tomcat_/content/erddapSitemap
Anda perlu mencari tahu Meme it (Sitemap) perubahan apa yang telah dilakukan pada pesan default.xml (yang ada di erddap baru. perang
Web-INF/classes/gov/noaa/pfel/erddap/util/messages.xml) dan memodifikasi pesan kustom Anda.xml file sesuai.
         
## Login{#install} 
5. Instal baruERDDAP™di Tomcat:
Sitemap Jangan gunakan Tomcat Manager. Sooner atau kemudian akan ada masalah memori PermGen. Lebih baik untuk benar-benar shutdown dan startup Tomcat.
\\ * Mengganti referensi ke _tomcat_ di bawah dengan direktori Tomcat yang sebenarnya di komputer Anda.
     
### Linux dan Macs{#linux-and-macs} 
1. Login: Dari baris perintah, gunakan: _tomcat_/bin/shutdown.sh
Dan gunakan ps -ef|benep tomcat untuk melihat apakah/ketika proses telah dihentikan. (Ini mungkin memakan waktu satu menit atau dua.) 
2. Hapus dekompresiERDDAP™instalasi: Di _tomcat_/webapps, penggunaan
rm -rf erddap
3. Hapus erddap lama. file perang: Dalam _tomcat_/webapps, gunakan rm erddap. Login
4. Salin erddap baru. file perang dari direktori sementara ke _tomcat_/webapps
5. Kembali ke Tomcat danERDDAP: gunakan _tomcat_/bin/startup.sh
6. LoginERDDAP™di browser Anda untuk memeriksa restart berhasil.
     (Seringkali, Anda harus mencoba beberapa kali dan menunggu satu menit sebelum Anda melihatERDDAP™Sitemap)   
             
### Login{#windows} 
1. Login: Dari baris perintah, gunakan: _tomcat_\bin\\shutdown.bat
2. Hapus dekompresiERDDAP™instalasi: Di _tomcat_/webapps, penggunaan
WordPress.org
3. Hapus erddap lama. file perang: Di _tomcat_\\webapps, gunakan del erddap. Login
4. Salin erddap baru. file perang dari direktori sementara ke _tomcat_\\webapps
5. Kembali ke Tomcat danERDDAP: gunakan _tomcat_\bin\\startup.bat
6. LoginERDDAP™di browser Anda untuk memeriksa restart berhasil.
     (Seringkali, Anda harus mencoba beberapa kali dan menunggu satu menit sebelum Anda melihatERDDAP™Sitemap) 

SitemapERDDAPSitemap Sitemap[bagian untuk mendapatkan dukungan tambahan](/docs/intro#support)Sitemap
