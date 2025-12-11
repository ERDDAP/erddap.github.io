Konten ini didasarkan pada [Pesan dari Mendelssohn ke ERDDAP grup pengguna](https://groups.google.com/g/erddap/c/JWoS_y3cygg/m/zCpcNTxNAAAJ) Sitemap

1. Mengoptimalkan file netcdf untuk cloud
————————————————

a. repacking dan ukuran halaman

Baru-baru ini dalam melakukan beberapa penelitian saya menemukan artikel yang sangat menarik ini:

https://nsidc.github.io/cloud-optimized-icesat2/

Tidak seperti inflame gairah seperti diskusi bahasa pemrograman, editor, dan format file, dan ini bukan rekomendasi dari format apa (Login) Anda harus menggunakan, tetapi lebih untuk memahami apa yang ada di kertas itu dan untuk melihat berapa banyak perbaikan yang bisa ( ERDDAP™ selalu mencoba untuk menjadi agnostik tentang banyak masalah ini, agak memilih untuk mencoba dan bekerja dengan bagaimana orang benar-benar bekerja dengan data) Sitemap

Kertas ini terutama ditujukan pada situasi di mana data disimpan di toko objek seperti Amazon S3. Toko objek diakses melalui jaringan menggunakan http  (Login) perintah, sehingga dibandingkan dengan penyimpanan dengan koneksi langsung ke (Login) server, ada latency yang lebih panjang karena permintaan harus melakukan perjalanan bulat. Untuk objek menyimpan Anda ingin membuat beberapa permintaan mungkin, tetapi jika Anda hanya membuat permintaan yang benar-benar besar untuk mengurangi jumlah panggilan, Anda mungkin mengakses cara lebih banyak data daripada yang Anda butuhkan, yang dapat sama lambat jika tidak lebih. Jadi trik adalah untuk mencapai keseimbangan antara dua faktor ini. Dan meskipun akses ke data di toko objek telah sangat ditingkatkan, sehingga memiliki akses ke penyimpanan langsung terpasang. Dalam meneliti beberapa perkiraan ini adalah:

Disk lokal:
Sitemap Waktu tampilan: 0.1ms
• 6 mencari: 0.6ms (Login) 
Sitemap Membaca metadata tersebar cepat
Login
Sitemap Permohonan latency: 100-200ms
• 6 permintaan: 600-1200ms (sangat lambat&#33;) 
Sitemap Setiap permintaan memiliki waktu round-trip jaringan

Hal kedua untuk memahami adalah bahwa file netcdf4/hdf5 disimpan dalam chunks dan kembali di halaman, sehingga ukuran relatif dari masing-masing ini benar-benar dapat mempengaruhi kecepatan akses ketika akses dari toko objek, dan bahwa secara default metadata tentang file tersebar di seluruh file, sehingga mendapatkan metadata dapat mengambil beberapa permintaan. Titik utama kertas adalah bahwa ukuran halaman default untuk file netcdf4 /hdf5 adalah 4096 byte (4KB) Login (yang mengerikan untuk cloud&#33;) karena ukuran metadata sendiri cenderung lebih besar dari ini dan lebih dari kemungkinan ukuran chunk Anda juga lebih besar dari ini. Jadi ekstrak akan membutuhkan banyak round-trip yang lambat. Apa yang ingin Anda lakukan adalah membongkar file sehingga semua metadata berada di "top" file, dan bahwa ukuran halaman setidaknya seukuran metadata ditambah ukuran satu chunk. Juga secara default ukuran halaman tidak tetap, tetapi menggunakan strategi yang bervariasi. Apa yang ditemukan kertas menggunakan ukuran halaman tetap menghasilkan hasil yang lebih baik.

Jadi bagaimana saya bisa menentukan ukuran metadata file?

> h5stat yourfile.nc | grep "File metadata" # metadata size
>

Dan bagaimana saya bisa menentukan ukuran chunk:

> h5dump -pH MUR41_file.nc | grep -A3 CHUNKED
>

Sitemap

> ncdump -sh MUR41_file.nc | grep ChunkSizes
>

Dan bagaimana saya dapat menentukan strategi ukuran halaman:

> h5stat yourfile.nc | grep "File space management strategy"
>

Kemungkinan besar perintah ini akan kembali “H5F_FSPACE_STRATEGY_FSM_AGGR” yang merupakan strategi default dan apa yang kita inginkan adalah “H5F_FSPACE_STRATEGY_PAGE”

Bagaimana cara mengubah file netcdf saya sehingga semua metadata berada di depan, dan mengubah strategi sehingga ukuran halaman tetap digunakan, dan ukuran halaman apa yang harus digunakan? Aturan thumb yang saya temukan adalah:

Pemilihan ukuran halaman:
Sitemap Harus ≥ ukuran metadata file total (Login) 
Sitemap Harus menjadi kekuatan 2 (4MB, 8MB, 16MB, dll.) 
Sitemap Jangan pergi gila besar - 32MB biasanya max praktis
Sitemap Pertimbangkan ukuran chunk - ukuran halaman harus mengakomodasi chunks terbesar

Seperti yang dikatakan di atas, idealnya ukuran harus lebih besar dari ukuran metadata ditambah ukuran satu chunk. Apa yang ditemukan penelitian adalah bahwa untuk banyak dataset ukuran halaman 8MB adalah tradeoff yang baik, mungkin lebih besar dari ukuran metadata + ukuran chunk, dan tidak menarik cara lebih banyak data daripada yang Anda butuhkan. Untuk menyelesaikan ini:

JPG PNG BMP GIF 3 MB .nc Login .nc 

Berikut adalah nilai untuk digunakan untuk mendapatkan ukuran halaman yang berbeda:

4194304 (Login) 
Di. 08.00 - 12.00/13.30 - 17.30 (Login) 
Mobil: +420 777 602 (Login) 
Mobil: +420 777 602 (Login) 

Login Apakah ada manfaat jika menggunakan file secara lokal juga?

Kertas dan hal-hal lain yang saya temukan menunjukkan bahwa bahkan lokal bisa mendapatkan kecepatan di mana saja dari 10%-30%. Dalam hal-hal saya tetapi tes knalpot saya menemukan keuntungan kecepatan sekitar 10% ketika permintaan relatif kecil dibandingkan dengan ukuran file keseluruhan, dan peningkatan kecepatan berkurang sebagai permintaan mendapatkan lebih besar, tetapi saya tidak pernah menemukannya menjadi lebih lambat.

Login Login

Ah tapi ada banyak yang menangkap suatu tempat, ini tampak seperti makan siang gratis. Dan tangkapan adalah bahwa ukuran halaman tetap meningkatkan ukuran file. Untuk beberapa kasus yang saya coba:

617M g1 .nc 
632M mur1_dioptimalkan .nc 
608M mur2 .nc 
616M mur2_optimalkan .nc 
29M g .nc 
40M chla1_dioptimalkan .nc 
30M g .nc 
40M chla2_dioptimalkan .nc 

Jadi tradeoff ada peningkatan tidak signifikan dalam ukuran file.

Sitemap Tapi jika saya harus memproses ulang file pula ...?

Pertanyaan yang baik adalah jika saya harus menulis skrip untuk memproses ulang file, mengapa tidak hanya menulis skrip untuk menerjemahkan ke format seperti mengatakan zarr? zarr memiliki banyak proponents dan jika Anda tertarik dengan zarr hanya melakukan pencarian bebek cepat dan ada banyak posting yang baik, tampilan yang mungkin lebih seimbang adalah dihttps://www.youtube.com/watch?v=IEAcCmcOdJs  (menarik bahwa banyak poin yang dia maksud adalah apa format eschunk mencoba untuk mengatasi) Sitemap Jadi mengapa Anda tidak ingin menerjemahkan file Anda ke sesuatu seperti zarr, Pertama, jika Anda membuat file netcdf secara teratur, Anda dapat mulai mengoptimalkan file dari saat ini, yang seiring waktu akan melihat kenaikan kecepatan dan Anda tidak harus memformat file masa lalu, dan ERDDAP™ akan tetap dapat agregat di atas file meskipun beberapa pengaturan internal berbeda. Kedua, Anda mungkin memiliki banyak perkakas yang tergantung pada file netcdf, dan pendekatan ini berarti tidak harus membangun kembali apa yang bisa menjadi sejumlah besar kode. Titiknya adalah menyadari pilihan dan memilih apa yang terbaik untuk situasi Anda. Sama seperti pengingat, jika Anda memilih untuk menggunakan file zarr dengan ERDDAP™ zarr format v2 file.

Sitemap Big data - sisi

Data besar dibicarakan tentang banyak, tetapi bagaimana besar adalah data yang paling banyak digunakan orang dan bagaimana yang membandingkan dengan kemampuan laptop modern (ya laptop, bukan server) Sitemap Mengambil yang menarik adalah di:

https://www.youtube.com/watch?v=GELhdezYmP0Mulai sekitar menit 37 meskipun seluruh pembicaraan menarik

Studi ia menyebutkan di:

https://motherduck.com/blog/redshift-files-hunt-for-big-data/

Jadi ada persentase pengguna yang relatif kecil yang benar-benar perlu engkol daya, tetapi sebagian besar pengguna dapat melakukan analisis mereka di laptop, drive eksternal 26TB sekarang di bawah $ 300 dan rumor adalah bahwa drive eksternal 60TB akan tersedia pada akhir tahun. Sesuatu yang berpikir tentang.

2. Sitemap ERDDAP™ dengan Google Cloud Platform atau penyedia cloud lainnya selain AWS
-------------------------------------------------------------------------------------

Saat ini ERDDAP™ dikenal hanya untuk bekerja dengan toko objek AWS (S3) meskipun meningkatkan dan generalisasi ERDDAP™ dukungan toko objek ’s adalah pada daftar todo (Loginhttps://github.com/ERDDAP/erddap/issues/158) Sitemap Jadi apa yang harus Anda lakukan jika Anda mengatakan Anda harus menjalankan Anda Meme it ERDDAP™ di Google Cloud Platform (Login) atau platform serupa? Platform cloud pertama menawarkan tingkat penyimpanan yang berbeda, biasanya termasuk salah satu yang mirip dengan penyimpanan lokal dan diakui oleh sistem operasi, salah satu yang terhubung melalui jaringan biasanya menggunakan NFS untuk akses (lagi langsung diakses oleh OS) , dan satu yang merupakan toko objek. Solusi pertama tidak menggunakan toko objek, dan Anda akan bagus untuk pergi. Tapi seperti biasa, TANSTAAFL dan kelemahan dalam kasus ini adalah saat Anda pergi dari toko objek -&gt; Akses NFS -&gt; toko lokal biaya Anda juga naik. (Saya akan menambahkan NFS juga diakses melalui jaringan, dan memiliki masalah latensi sendiri, ini juga akan mendapat manfaat dari optimasi file) Sitemap

Jika Anda harus menggunakan toko objek, atau hanya dapat membeli toko objek, jawabannya adalah sistem file FUSE (https://github.com/libfuse/libfuse) Sitemap Di GCP, ini disebut gcsfuse, dan langkah-langkah untuk menginstalnya:

• Instal gcsfuse pada gambar Linux GCP Anda:
sudo apt update
sudo apt install gcsfuse
• Otentikasi ke GCP (Sitemap) Sitemap
Pastikan Anda memiliki kredensial yang tepat, biasanya melalui akun layanan atau dengan menjalankan login auth gcloud.
Sitemap Pasang ember GCS ke direktori lokal:
Pasang ember GCS Anda ke direktori lokal menggunakan gcsfuse. Ini memungkinkan instance GCP Anda untuk mengakses data seolah-olah bagian dari sistem file lokal.
gcsfuse your-bucket-name/path/to/mount/directory

Dan sekarang toko objek Anda dapat diakses seperti itu adalah bagian dari sistem file Linux, sehingga akan bekerja dengan ERDDAP™ Sitemap Ini tampak seperti sihir, mendapatkan yang terbaik dari kedua dunia, harus ada tangkapan. Dan ada. Sistem file FUSE adalah sedikit lebih lambat daripada mengakses toko objek secara langsung (pada dasarnya Anda telah menambahkan lapisan lain ke akses) Sitemap Dalam perkiraan penelitian saya tentang seberapa jauh lebih lambat di peta, jadi saya tidak tahu berapa lebih lambat. Tetapi jika Anda berada dalam situasi di mana Anda harus berjalan di GCP menggunakan toko objek, Anda memiliki solusi untuk sekarang yang akan bekerja dengan ERDDAP™ Sitemap

3. Apa yang bisa Anda lakukan sekarang untuk membantu.
——————————————————

Jika Anda memiliki waktu dan kemampuan untuk menguji beberapa hal dan laporan ini kembali pada hasil Anda, yang akan sangat bagus. Terutama jika Anda memiliki akses ke GCP atau mirip dan melihat berapa lebih lambat ERDDAP™ akses menggunakan FUSE (benar-benar Anda dapat menguji ini di AWS juga) Sitemap Jika penalti kecepatan tidak terlalu besar, itu akan menjadi luar biasa, karena saya memiliki alasan untuk percaya beberapa orang akan segera harus menjalankan mereka ERDDAP™ s di GCP dengan toko objek. jadi ini bukan hanya masalah kepentingan teoritis.
