---
sidebar_position: 7
---
#  `Login Sitemap` Login `Login` Login

## Sitemap
Fitur ini memungkinkan Anda untuk menampilkan atribut global dari pilihan Anda di halaman dataset di `Sitemap` Login

## Instruksi penggunaan
Tag ini hanya dapat digunakan dengan `Login` Sitemap Untuk mengaktifkan dan menggunakannya, ikuti langkah-langkah ini:

1.  **Aktifkan Parser SAX** Sitemap
Tambahkan garis berikut untuk Anda `WordPress.org` file:
   ```xml
   <useSaxParser>true</useSaxParser>
   ```

2.  **Tambahkan Tag di ` datasets.xml ` ** Sitemap
Sitemap ` datasets.xml ` file, termasuk dua tag tingkat atas:
   ```xml
   <displayInfo></displayInfo>
   <displayAttribute></displayAttribute>
   ```

3.  **Behavior default** Sitemap
   - Jika tag ini tidak ditambahkan atau kiri kosong di Meme it ` datasets.xml ` file, nilai default diterapkan sebagai berikut:
     -  `Login Sitemap` Sitemap `Sitemap` 
     -  `Login` Sitemap `ringkasan, lisensi` 

4.  **Pastikan Konsistensi** Sitemap
Jumlah nilai yang dipisahkan koma di kedua `Login Sitemap` Login `Login` tag harus sama.

## Cara Kerja
- Login `Login` tag menentukan atribut global (didefinisikan dalam&lt; ` addAttributes ` &gt; tag) untuk ditampilkan untuk setiap dataset.
- Nilai yang sesuai dalam `Login Sitemap` tag ditampilkan sebagai label di `Sitemap` baris UI.
- Ketika pengguna menelusuri label yang ditampilkan, tooltip akan muncul, menunjukkan nilai atribut global.

## Sitemap
```xml
<displayInfo>Display1,Display2</displayInfo>
<displayAttribute>att1,att2</displayAttribute>
```

### Dataset Global Attributes Contoh:
```xml
<att name="att1">This is att1</att>
<att name="att2">This is att2</att>
```

### Email:
- Sitemap `Tampilan1` Login `Tampilan2` akan ditampilkan di `Sitemap` baris di UI.
- Ketika hovered, tooltips akan menampilkan nilai atribut yang sesuai:
  -  `Tampilan1` : Tooltip menunjukkan _ Ini adalah att1_
  -  `Tampilan2` : Tooltip menunjukkan _ Ini adalah att2_

## Login
- Pastikan nama atribut yang ditentukan dalam `Login` tag mencocokkan atribut global yang didefinisikan dalam dataset.
- Atribut yang tidak benar atau hilang akan mencatat pesan kesalahan.

Dengan mengikuti langkah-langkah ini, Anda dapat menyesuaikan `Sitemap` baris di halaman dataset untuk menampilkan atribut global yang relevan dengan tooltip yang sesuai.
