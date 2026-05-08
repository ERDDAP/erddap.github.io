---
sidebar_position: 2
---
# Perbarui
How To Do an Update of an Existing ERDDAP™ pada Server Anda

## Perubahan{#changes} 
1. Membuat perubahan terdaftar [Perubahan](/changes) dalam bagian berjudul "Things ERDDAP™ Administrator Perlu Tahu dan Lakukan "untuk semua ERDDAP™ Versi sejak versi yang Anda gunakan.
     
##  Java  {#java} 
2. Jika Anda meningkatkan dari ERDDAP™ versi 2.18 atau di bawah, Anda perlu beralih ke Java 25 (atau lebih baru) dan Tomcat 10 yang terkait. Lihat yang biasa ERDDAP™ instruksi instalasi untuk [ Java ](/docs/server-admin/deploy-install#java) dan [Tomcat](/docs/server-admin/deploy-install#tomcat) . Anda juga harus menyalin Anda _tomcat_/content/erddap direktori dari instalasi Tomcat lama Anda ke instalasi Tomcat baru Anda.

## Unduh{#download} 
3. Unduh [erddap.war](https://github.com/ERDDAP/erddap/releases/download/v2.30.0/ERDDAP-2.30.0.war) dalam _ tomcat _ / webapps.
     (versi 2.30.0, 706,939.130 bytes, MD5 = D95A02A22DA2C1C1A F12710A4F09E, tanggal 2026-04-06) 
     
## messages.xml{#messagesxml} 
4. 
    * Umum: Jika Anda meningkatkan dari ERDDAP™ versi 1.46 (atau diatas) dan Anda hanya menggunakan pesan standar, standar baru messages.xml akan dipasang secara otomatis (di antara berkas .class melalui erddap. perang) .
         
    * Langka: Jika Anda meningkatkan dari ERDDAP™ versi 1.44 (atau di bawah) ,
Anda HARUS menghapus berkas messages.xml lama:
         _tomcat_/content/erddap / messages.xml.
Standar messages.xml baru akan dipasang secara otomatis (di antara berkas .class melalui erddap. perang) .
         
    * Langka: Jika Anda selalu membuat perubahan ke berkas standar messages.xml (di tempat) ,
Anda perlu membuat perubahan tersebut ke berkas messages.xml baru (yaitu
WEB-INF / classes / gov / noaa / pfel / erddap / util / messages.xml setelah erdap.war dikompresi oleh Tomcat).
         
    * Langka: Jika Anda memelihara berkas ubahan messages.xml di _tomcat_/content/erddap /,
Anda perlu mencari tahu (via diff) apa yang berubah telah dibuat ke default messages.xml (yang dalam erddap baru. perang sebagai
WEB-INF / classes / gov / noaa / pfel / erddap / util / messages.xml) dan memodifikasi berkas messages.xml gubahan anda sesuai dengan file.
         
## Pasang{#install} 
5. Pasang yang baru ERDDAP™ di Tomcat:
\\ * Jangan gunakan Tomcat Manager. Cepat atau lambat akan ada masalah memori PermGen. Lebih baik untuk benar-benar mematikan dan mulai Tomcat.
\\ * Ganti referensi ke _ tomcat _ di bawah dengan direktori Tomcat sebenarnya di komputer Anda.
     
### Linux dan Mac{#linux-and-macs} 
1. Shutdown Tomcat: Dari baris perintah, gunakan: _ tomcat _ / bin / shutdown.sh
Dan gunakan ps -ef | grep tomcat untuk melihat apakah proses telah dihentikan. (Mungkin butuh satu atau dua menit.) 
2. Hapus yang tak dikompresi ERDDAP™ instalasi: Dalam _ tomcat _ / webapps, gunakan
rm -rf erddap
3. Hapus erddap tua. berkas perang: In _ tomcat _ / webapps, gunakan rm erddap. perang
4. Salin erddap baru. berkas perang dari direktori sementara ke _ tomcat _ / webapps
5. Restart Tomcat dan ERDDAP : use _ tomcat _ / bin / startuppsh
6. Tilik ERDDAP™ dalam browser Anda untuk memeriksa apakah restart berhasil.
     (Seringkali, Anda harus mencoba beberapa kali dan menunggu sebentar sebelum Anda melihat ERDDAP™ .)   
             
### Jendela{#windows} 
1. Shutdown Tomcat: Dari baris perintah, gunakan: _ tomcat _\\ bin\\ shutdown.bat 
2. Hapus yang tak dikompresi ERDDAP™ instalasi: Dalam _ tomcat _ / webapps, gunakan
del / S / Q erddap
3. Hapus erddap tua. berkas perang: In _ tomcat _\\ webapps, use del erddap. perang
4. Salin erddap baru. berkas perang dari direktori sementara ke _ tomcat _\\ webapps
5. Restart Tomcat dan ERDDAP : use _ tomcat _\\ bin\\ startup.bat
6. Tilik ERDDAP™ dalam browser Anda untuk memeriksa apakah restart berhasil.
     (Seringkali, Anda harus mencoba beberapa kali dan menunggu sebentar sebelum Anda melihat ERDDAP™ .) 

Masalah memperbaharui ERDDAP ? Lihat kami [daerah saat memperoleh dukungan tambahan](/docs/intro#support) .
