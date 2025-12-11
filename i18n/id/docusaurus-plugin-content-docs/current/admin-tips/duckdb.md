Konten ini didasarkan pada [Pesan dari Mendelssohn ke ERDDAP grup pengguna](https://groups.google.com/g/erddap/c/6Hl024ZGkes/m/DS5WzsydAQAJ) Sitemap

 ERDDAP™ mencoba untuk menjadi agnostik tentang format data apa yang digunakan orang untuk data mereka, bukan mencoba bekerja dengan format data yang paling banyak digunakan untuk masyarakat yang terutama kami layani. Semakin banyak pekerjaan di cloud, dan ada banyak format data yang digunakan orang di cloud, itu akan bagus jika ERDDAP™ bisa mendukung banyak format ini. Login ERDDAP™ pengembangan dan pemeliharaan sudah terganggu, dan apa yang akan diinginkan adalah untuk memanfaatkan pekerjaan orang lain untuk mencapai tujuan ini, tanpa harus memodifikasi ERDDAP™ Sitemap

Login [Login](https://duckdb.org/) Login [Login](https://trino.io/) Sitemap Keduanya menyediakan koneksi ke berbagai format data, dan dapat diakses menggunakan JDBC. Dalam tulisan ini saya hanya akan melihat menggunakan DuckDB karena saya memiliki beberapa keakraban dengan itu, dan Trino setidaknya untuk pikiran saya, tampak sedikit lebih rumit untuk mengatur, dan sekarang saya hanya ingin bukti konsep. (A sementara punggung Damien Smythe telah menulis bahwa dia telah menangguhkan bagaimana menggunakan Trino dan saya menghubungi dia dan dia mendapatkannya untuk bekerja dan akan mengirimkan catatan saya - jadi lebih di ini di masa depan) Sitemap Juga saya apa pun tetapi ahli di salah satu ini, jadi ini belajar bersama dengan saya - biarkan saya tahu apakah Anda menemukan kesalahan, atau hal-hal yang jelas, atau jika ada cara yang lebih baik untuk melakukan hal-hal.

1. Photogallery
————————————

Untuk menggunakan DuckDB dalam ERDDAP™ Anda perlu menginstal duckDB ke komputer Anda, dan untuk menginstal konektor DuckDB JDBC ke ERDDAP™ Sitemap Instruksi untuk menginstal DuckDB sendiri Meme it

https://duckdb.org/docs/installation/?version=stable&environment=cli&platform=macos&download_method=direct

Konektor DuckDB JDBC dapat diunduh dari

https://duckdb.org/docs/stable/clients/java.html

Jika tomcat Anda terletak di $TOMCAT_HOME, maka Anda ingin menempatkan file ini di $TOMCAT_HOME/webapps/erddap/WEB-INF/lib.

2. Apa yang membuat trik ini:
——————————————————


setidaknya untuk DuckDB (seperti yang saya katakan aku belum melihat Trino secara rinci Meme it)   Java program hanya dapat mengakses DuckDB melalui konektor JDBC, dan konektor JDBC hanya dapat membaca data yang disimpan dalam format DuckDB.db. Meskipun DuckDB adalah alat yang bagus, harus menyalin data ke format ini mengalahkan seluruh tujuan, namun, DuckDB menyediakan fasilitas yang untuk banyak format file yang mendukung (ada daftar ekstensi yang berkembang) Anda dapat mengatur file virtual .db yang hanya membaca dalam metadata yang diperlukan. Saya telah menemukan .db yang diciptakan untuk cukup kecil dalam ukuran, dan memberikan apa yang muncul untuk akses cepat. Catatan yang menarik adalah bahwa tidak seperti kebanyakan sistem database (dan termasuk Trino) , dengan Bebek DB Anda tidak memiliki aplikasi yang terus berjalan di latar belakang, jadi harus ada beberapa lag dalam akses karena startup, tetapi seperti yang saya katakan dalam akses tes kecil saya tampaknya cepat.


3. Contoh sederhana:
———————————————

Untuk memulai, saya akan melihat bagaimana melakukan ini dengan file .csv. Benar, ini tidak menarik kasus penggunaan sebagai ERDDAP™ sudah menangani file .csv cukup baik, jadi tidak ada yang diperoleh dalam arti itu, tetapi file teks lebih mudah untuk bekerja dengan dan untuk debug dalam melihat apa yang terjadi, dan karena saya sedang belajar ini membuat hidup saya lebih mudah. Di bawah ini saya akan melihat kasus penggunaan yang lebih menarik setelah kita melihat apa yang diperlukan.

File yang saya kerjakan dengan disebut "detects.csv" yang merupakan file 305MB dari deteksi tag oleh sensor. Langkah pertama adalah membuat file .db yang menunjuk ke file ini (dalam hal ini dan apa yang berikut untuk kenyamanan saya akan selalu mengasumsikan Anda bekerja pada tingkat yang diperlukan sehingga saya tidak memberikan jalur penuh - dalam praktek Anda harus) Sitemap

```
duckdb detects.db <<EOF
CREATE VIEW detects_table AS
SELECT *
FROM read_csv_auto(
'detects.csv',
header=true,
sample_size=2147483647 -- scan whole file for schema (optional)
);
EOF
```

File "detects.db" adalah 268KB dalam ukuran. Kita dapat memeriksa bahwa ini benar-benar bekerja:

```
duckdb detects.db
DuckDB v1.3.1 (Ossivalis) 2063dda3e6
Enter ".help" for usage hints.
D SHOW TABLES;
┌───────────────┐
│ name │
│ varchar │
├───────────────┤
│ detects_table │
└───────────────┘
D SELECT * FROM detects_table LIMIT 5;
┌────────────────┬─────────┬──────────────┬───────┬──────────┬───┬──────────┬──────────────┬───────────────┬─────────┐
│ Study_ID │ TagCode │ DateTime_PST │ recv │ location │ … │ tag_life │ Rel_latitude │ Rel_longitude │ time │
│ varchar │ varchar │ timestamp │ int64 │ varchar │ │ int64 │ double │ double │ varchar │
├────────────────┼─────────┼──────────────┼───────┼──────────┼───┼──────────┼──────────────┼───────────────┼─────────┤
│ ButteSink_2024 │ 1B76 │ NULL │ NULL │ NULL │ … │ 52 │ 39.32663 │ -121.8847 │ -08 │
│ ButteSink_2024 │ 1B94 │ NULL │ NULL │ NULL │ … │ 52 │ 39.32663 │ -121.8847 │ -08 │
│ ButteSink_2024 │ 1BA5 │ NULL │ NULL │ NULL │ … │ 52 │ 39.35858 │ -121.8943 │ -08 │
│ ButteSink_2024 │ 1C55 │ NULL │ NULL │ NULL │ … │ 52 │ 39.33546 │ -121.8923 │ -08 │
│ ButteSink_2024 │ 1C95 │ NULL │ NULL │ NULL │ … │ 52 │ 39.33546 │ -121.8923 │ -08 │
├────────────────┴─────────┴──────────────┴───────┴──────────┴───┴──────────┴──────────────┴───────────────┴─────────┤
│ 5 rows 18 columns (9 shown) │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

dan ukuran mendeteksi. db tidak berubah dari melakukan operasi ini. Jadi langkah akhir adalah menghubungkan ini dengan ERDDAP™ Saya hanya menunjukkan bagian yang diperlukan untuk terhubung ke file, tidak semua informasi variabel:

```
<dataset type="EDDTableFromDatabase" datasetID="duckdb_test" active="true">
<!-- JDBC Connection Details -->
<sourceUrl>jdbc:duckdb:detects.db</sourceUrl>
<driverName>org.duckdb.DuckDBDriver</driverName>
<catalogName></catalogName>
<schemaName></schemaName>
<tableName>detects_table</tableName>
<columnNameQuotes></columnNameQuotes>
>
```

Dan ini adalah dataset dalam sebuah ERDDAP™ di laptop saya menggunakan konektor DuckDB:
