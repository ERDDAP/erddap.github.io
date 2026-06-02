---
title: "ERDDAP™ and the Cloud"
---
#  ERDDAP™ Login

## Apa itu Cloud

Definisi paling sederhana bukan server lokal. Ini sangat luas dan dapat berarti banyak pengaturan yang berbeda. Misalnya, bisa menjadi server fisik khusus di pusat data, Virtual Private Server, server bersama, serverless, atau sesuatu yang lain.

### Mengapa Cloud

Ada banyak alasan organisasi yang ingin pindah ke cloud. Yang paling penting adalah fleksibilitas yang disediakan untuk compute / penyimpanan kebutuhan dibandingkan dengan membeli perangkat keras fisik.

Ini menghilangkan kebutuhan untuk mempertahankan ruang data center/server. Hal ini juga memungkinkan untuk menyebarkan sumber daya untuk kebutuhan Anda saat ini. Banyak seperti awan dapat berarti banyak hal yang berbeda, mampu meningkatkan sumber daya Anda juga. Ini bisa berarti membayar untuk lebih (atau kurang) sumber daya serverless. Ini bisa berarti bergerak dari server bersama ke server pribadi. Ini bisa berarti upgrade ke server fisik khusus yang lebih besar.

## Login ERDDAP™ berjalan di cloud?

Login

 ERDDAP™ dirancang untuk berjalan di Tomcat yang dapat dijalankan secara lokal atau di lingkungan cloud. Gambar Docker resmi tersedia di [Login](https://hub.docker.com/r/erddap/erddap) Sitemap Login `Sitemap` tag adalah build berdasarkan perubahan terbaru (sesuatu seperti rilis 'malam', [alpha-latest rincian](https://hub.docker.com/layers/erddap/erddap/alpha-latest/) ) Sitemap `Sitemap` adalah rilis terbaru ( [Sitemap](https://hub.docker.com/layers/erddap/erddap/latest/) ) Sitemap Anda juga dapat menelusuri rilis registry wadah GitHub di [Paket GitHub](https://github.com/ERDDAP/erddap/pkgs/container/erddap) Sitemap Anda dapat membaca lebih banyak tentang menggunakan ERDDAP™ Login [Login](https://github.com/ERDDAP/erddap/blob/main/DOCKER.md) Sitemap

Untuk penyebaran Kubernetes, lihat deploy-kubernetes baru [Sitemap](https://erddap.github.io/docs/server-admin/admin-tips/deploy-kubernetes) Sitemap

Yang mengatakan, ERDDAP™ dirancang pada waktu ketika server khusus adalah norma. Tidak serverless, dan akan sangat sulit jika tidak mungkin untuk membuatnya tanpa server.

### Login ERDDAP™ skala?

Login ERDDAP™ lebih rumit daripada hanya menggunakan lebih banyak sumber daya serverless. Kami memiliki beberapa dokumentasi hebat tentang [cara skala ERDDAP™ ](https://erddap.github.io/docs/server-admin/scaling) Sitemap Membuat lebih mudah untuk skala ERDDAP™ adalah sesuatu yang kita minati. Meme it

### Apa yang mencegah autoscaling?

 ERDDAP™ melakukan banyak hal termasuk menjaga dataset hingga tanggal, memberi tahu pelanggan perubahan pada dataset, data caching, menangani permintaan pengguna, dan banyak lagi. Untuk yang cukup besar ERDDAP™ server seperti [Login](https://coastwatch.pfeg.noaa.gov/erddap/index.html) Ini berarti terus melakukan sesuatu. Meme it Penggunaan berkelanjutan sebenarnya adalah situasi yang sangat mahal untuk opsi serverless (Anda membayar premium besar untuk compute ketika melakukan serverless dan begitu keuntungan utama adalah ketika Anda hanya kadang-kadang membuat panggilan) Sitemap Selain itu, mencoba untuk memindahkan semua ERDDAP™ Berbagai fungsi untuk versi serverless akan berakhir dengan pengaturan yang lebih rumit yang diperlukan untuk admin.

### Login ERDDAP™ menggunakan Penyimpanan Cloud?

Login

 ERDDAP™ mendukung penyimpanan cloud (termasuk AWS S3) dan meningkatkan dukungan ini (Contoh non-AWS S3) adalah prioritas tinggi pada ERDDAP™ Login ERDDAP™ juga mampu menarik data dari banyak layanan online yang ada. Untuk informasi lebih lanjut saya merekomendasikan mencari melalui kami [Database](https://erddap.github.io/docs/server-admin/datasets#detailed-descriptions-of-dataset-types) Sitemap
