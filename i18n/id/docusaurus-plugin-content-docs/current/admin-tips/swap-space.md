Konten ini didasarkan pada [Pesan dari Mendelssohn ke ERDDAP grup pengguna](https://groups.google.com/g/erddap/c/1U0OByOasu4/m/JM39reEsBAAJ) Sitemap

Banyak permintaan bantuan yang kami dapatkan melibatkan masalah dengan penggunaan memori ERDDAP™ Sitemap Beberapa ini berasal dari perubahan dalam manajemen memori dalam Java , dan juga interaksi dengan manajemen memori OS Linux. Mulai saya percaya Java Login Java menggunakan lebih banyak memori daripada apa yang dimasukkan ke dalam pengaturan heap. Anda dapat melihat ini jika Anda melihat pengaturan heap Anda dan kemudian menggunakan perintah seperti atas, htop, atau btop untuk memeriksa penggunaan memori aplikasi. Jadi misalnya kami banyak digunakan ERDDAP™ memiliki ruang heap set pada 21GB, tetapi sebenarnya penggunaan memori dapat berjalan ke 28GB-30GB, kadang-kadang lebih tinggi. Nilai ini dapat lonjakan jika ada banyak permintaan besar simultan ke sistem.

Pada kebanyakan sistem Linux, setelah penggunaan memori di atas sekitar 50%, OS akan mulai menukar memori. Selain itu, untuk sebagian besar ruang swap sistem tidak mengumpulkan sampah sampai benar-benar diperlukan, yang untuk ERDDAP™ terlalu terlambat, dan dapat menyebabkan ERDDAP™ Login Dan ruang swap lambat, yang untuk besar datasets.xml dapat menyebabkan pembaruan utama tidak lengkap, yang kemudian senyawa masalah.

Apa yang bisa Anda lakukan tentang ini. Pertama, temukan penggunaan memori sejati atau sistem Anda, dan memiliki cukup RAM sehingga penggunaan memori tidak melebihi 50%. Tapi ada juga dua pengaturan yang dapat mengubah perilaku ini, vm.swappiness. dan vm.vfs_cache_tekan.

vm.swappiness mengontrol bagaimana agresif kernel Linux menggunakan ruang swap. Anda dapat memeriksa nilai saat ini dengan:

> cat /proc/sys/vm/swappiness
>
Sitemap Standar biasanya 60 (pada skala 0 hingga 100) Sitemap
Sitemap Nilai yang lebih rendah membuat sistem kurang mungkin untuk swap.
Sitemap Nilai 10 atau 1 sering digunakan untuk sistem dengan banyak RAM.


Untuk mengubah nilai hingga reboot, katakan pada 10:

> sudo sysctl vm.swappiness=10
>

Dan untuk mengubah secara permanen:

> sudo nano /etc/sysctl.conf
>

Dan edit nilai untuk vm.swappiness. Kemudian untuk menerapkan perubahan:

> sudo sysctl -p
>

vm.vfs_cache_tekan. memberitahu sistem bagaimana agresif untuk mendapatkan memori. Nilai yang lebih tinggi. (100 atau lebih) memberitahukan sistem menjadi lebih agresif, Untuk memeriksa nilai saat ini:

> cat /proc/sys/vm/vfs_cache_pressure
>

Untuk mengubah nilai hingga reboot berikutnya:

> sudo sysctl vm.vfs_cache_pressure=150
>

Untuk mengubah nilai secara permanen:

> sudo nano /etc/sysctl.conf
>

Dan kemudian tambahkan atau memperbarui garis:

> vm.vfs_cache_pressure = 100
>

Dan kemudian menerapkan perubahan:

> sudo sysctl -p
>


Apa yang dapat Anda lakukan jika Anda memantau penggunaan ruang swap Anda dan Anda memperhatikan bahwa penggunaan swap mulai meningkat? Ada perintah yang akan kosong ruang swap dan memindahkan konten ke memori. Sebelum menggunakan ini, Anda perlu membuat memori tertentu yang tersedia lebih besar daripada penggunaan swap. Saya mengatakan memori yang tersedia karena dalam sistem Linux dengan penggunaan disk yang berat " memori yang dicached" dapat cukup tinggi, jadi " memori gratis" akan menunjukkan sebagai sangat rendah, tetapi " memori cachecache" akan tersedia jika diperlukan untuk perintah seperti ini.

> sudo swapoff -a && sudo swapon -a
>

Hanya untuk menjadi tertentu Saya suka memaksa koleksi sampah juga setelah melakukan ini:

> sudo jcmd $(pgrep java) GC.run
>

Sekali lagi saya berharap beberapa orang menemukan informasi ini berguna. Kami ingin membuat ERDDAP™ sekuriti mungkin, dan untuk bekerja sekurang mungkin dengan bagaimana orang benar-benar bekerja.
