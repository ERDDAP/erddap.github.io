---
sidebar_position: 7
---
# 'displayInfo' dan `displayAttribute` Login

## Sitemap
Fitur ini memungkinkan Anda untuk menampilkan atribut global dari pilihan Anda di halaman dataset di baris `Informasi`.

## Instruksi penggunaan
Tag ini hanya dapat digunakan dengan `Sax parser`. Untuk mengaktifkan dan menggunakannya, ikuti langkah-langkah ini:

1.  **Aktifkan Parser SAX** Sitemap
Tambahkan baris berikut ke file `setup.xml Anda:
   ```xml
   <useSaxParser>true</useSaxParser>
   ```

2.  **Tambahkan tag di `datasets.xmlSitemap** Sitemap
Sitemapdatasets.xml` file, termasuk dua tag tingkat atas:
   ```xml
   <displayInfo></displayInfo>
   <displayAttribute></displayAttribute>
   ```

3.  **Behavior default** Sitemap
   - Jika tag ini tidak ditambahkan atau kiri kosong di `datasets.xml` file, nilai default diterapkan sebagai berikut:
     - Sitemap Sitemap Sitemap
     - `displayAttribute`: `summary,license Sitemap

4.  **Pastikan Konsistensi** Sitemap
Jumlah nilai yang ditentukan dalam tag `displayInfo` dan `displayAttribute` harus sama.

## Cara Kerja
- Tag `displayAttribute` menentukan atribut global (didefinisikan dalam&lt;SitemapaddAttributes`&gt; tag) untuk ditampilkan untuk setiap dataset.
- Nilai yang sesuai dalam tag `displayInfo` ditampilkan sebagai label di baris `Informasi` UI.
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
- Kata-kata `Display1` dan `Display2` akan ditampilkan dalam baris `Informasi` di UI.
- Ketika hovered, tooltips akan menampilkan nilai atribut yang sesuai:
  - `Display1`: Tooltip menunjukkan _ Ini adalah att1_
  - `Display2`: Tooltip menunjukkan _ Ini adalah att2_

## Login
- Pastikan nama atribut yang ditentukan dalam tag `displayAttribute` sesuai dengan atribut global yang didefinisikan dalam dataset.
- Atribut yang tidak benar atau hilang akan mencatat pesan kesalahan.

Dengan mengikuti langkah-langkah ini, Anda dapat menyesuaikan baris `Informasi pada halaman dataset untuk menampilkan atribut global yang relevan dengan tooltip yang sesuai.
