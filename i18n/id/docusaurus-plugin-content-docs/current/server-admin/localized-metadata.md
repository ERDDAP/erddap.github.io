---
sidebar_position: 8
---
# Metadata

### Sitemap
Fitur ini memungkinkan Anda untuk menyertakan metadata lokal tentang dataset dan variabel Anda. Setiap atribut yang didefinisikan dalamaddAttributestag dapat dilokalkan. Ini dimaksudkan untuk digunakan untuk atribut string umum seperti judul, ringkasan, lisensi, instituion. Tidak disarankan untuk digunakan untuk numerik (Sitemap) atau nilai standar (e.g. "ioos_kategori") dan lokalisasi jenis nilai-nilai ini mungkin memiliki perilaku yang mengejutkan.

### Instruksi penggunaan
Untuk mengaktifkan dan menggunakannya, ikuti langkah-langkah ini:

1.  **Tambahkan tag di `datasets.xmlSitemap** Sitemap
Sitemapdatasets.xml` file, tambahkan metadata lokal Anda di bagian atribut tambahan:
   ```xml
   <addAttributes>
        <att name="title">Data from a local source.</att>
        <att name="title" xml:lang="fr">Donn&#xE9;es provenant d'une source locale.</att>
        <att name=\"title\" xml:lang=\"de\">Daten aus einer lokalen Quelle.</att>
    </addAttributes>
   ```

2.  **Behavior default** Sitemap
   - Jika tidak ada tag xml:lang disediakan, informasi yang disediakan akan ditampilkan untuk semua bahasa. Ini cocok dengan behavoir sebelumnya.
   - Jika beberapa tag xml:lang disediakan, nilai-nilai tersebut akan digunakan untuk permintaan dalam bahasa tersebut. Jika pengguna meminta bahasa yang tidak memiliki nilai xml: lang, nilai dari bahasa default (Login) akan digunakan.
