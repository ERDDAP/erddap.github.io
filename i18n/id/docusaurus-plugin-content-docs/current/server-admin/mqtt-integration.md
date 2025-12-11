#  ERDDAP API Integration

 ERDDAP sekarang termasuk dukungan untuk protokol MQTT untuk memfasilitasi ingessi data real-time dan pemberitahuan. Fungsi ini didukung oleh sumber terbuka [ **Klien MQTT HiveMQ** ](https://github.com/hivemq/hivemq-mqtt-client) Login [ **Home &gt; Sitemap** ](https://github.com/hivemq/hivemq-community-edition) pustaka broker.

 ERDDAP dapat memanfaatkan MQTT dalam dua cara utama:

1.   **Sebagai Klien MQTT:**    ERDDAP dapat berlangganan topik pada broker MQTT yang ada untuk data ingest dan membuat dataset real-time.
    
2.   **Sebagai Broker MQTT:**    ERDDAP dapat menghosting broker MQTT tertanam sendiri, memungkinkan klien eksternal untuk mempublikasikan data langsung ke dalamnya.
    

Login

##  ERDDAP sebagai Klien MQTT

 ERDDAP dapat bertindak sebagai klien MQTT untuk berlangganan topik di broker MQTT eksternal atau tertanam sendiri. Ini dicapai dengan menggunakan yang baru `Login` jenis dataset, yang berfungsi mirip dengan yang ada `Login` Login

Saat ini, implementasi klien hanya mendukung **Login** untuk topik.

## Konfigurasi: `Login` 

Untuk mengkonfigurasi dataset untuk berlangganan broker MQTT, mendefinisikan dataset jenis `Login` Anda ` datasets.xml ` Login Tag konfigurasi berikut tersedia dalam ` <dataset> ` blok:

```
<!-- Example configuration for an EDDTableFromMqtt dataset in datasets.xml -->
<dataset type="EDDTableFromMqtt" datasetID="mqtt_realtime_data" active="true">

    <!-- The hostname or IP address of the MQTT broker. -->
    <serverHost>broker.example.com</serverHost>

    <!-- The port number of the MQTT broker. -->
    <serverPort>1883</serverPort>

    <!-- A unique identifier for this MQTT client. -->
    <clientId>erddap-subscriber-1</clientId>

    <!-- The username for broker authentication (optional). -->
    <username>user</username>

    <!-- The password for broker authentication (optional). -->
    <password>secret</password>

    <!-- A comma-separated list of MQTT topics to subscribe to. -->
    <topics>sensor/+/data, another/topic</topics>

    <!-- Set to 'true' to use a secure SSL/TLS connection. Default is 'false'. -->
    <useSsl>false</useSsl>

    <!-- The session expiry interval in seconds. -->
    <sessionExpiryInterval>3600</sessionExpiryInterval>

    <!-- The connection timeout in seconds. -->
    <connectionTimeout>10</connectionTimeout>

    <!-- Set to 'true' to enable automatic reconnection. Default is 'true'. -->
    <automaticReconnect>true</automaticReconnect>

</dataset>
```

Login

##  ERDDAP sebagai Broker MQTT

 ERDDAP dapat menjalankan broker MQTT tertanam, yang melayani dua tujuan utama:

1.   **Data Ingestion:** Untuk menerima data yang diterbitkan oleh klien MQTT eksternal untuk membuat dataset real-time.
    
2.   **Pemberitahuan:** Untuk mempublikasikan pemberitahuan tentang perubahan dataset.
    

## Mengaktifkan Broker Tertanam

Broker MQTT tertanam dinonaktifkan secara default. Untuk mengaktifkannya, tambahkan bendera berikut untuk `WordPress.org` Sitemap

 ` <!-- Enables the embedded HiveMQ broker. Default is 'false'. -->   <enableMqttBroker> Login </enableMqttBroker> `  

## Konfigurasi Broker & Direktori Data

Anda dapat menentukan direktori kustom untuk konfigurasi broker dan file data dalam `WordPress.org` Sitemap Jika tag ini tersisa kosong, ERDDAP akan menggunakan direktori default yang ditentukan oleh perpustakaan HiveMQ. Untuk detail konfigurasi yang lebih canggih, termasuk penebangan dan ekstensi, silakan lihat resmi [ **HiveMQ Wiki** ](https://github.com/hivemq/hivemq-community-edition/wiki) Sitemap
```
<!-- The parent directory for all MQTT-related files. -->
<bigParentDirectory>/opt/erddap/mqtt/</bigParentDirectory>

<!-- The path to the embedded MQTT broker's configuration folder. -->
<mqttConfigFolder>/opt/erddap/mqtt/conf/</mqttConfigFolder>

<!-- The path to the embedded MQTT broker's data folder. -->
<mqttDataFolder>/opt/erddap/mqtt/data/</mqttDataFolder>
```

## Gunakan Kasus 1: Menginduksi Data dari Klien MQTT

Untuk membangun dataset real-time menggunakan broker tertanam, Anda dapat mengkonfigurasi `Login` Login (seperti yang dijelaskan di atas) di _same_ ERDDAP Contoh untuk terhubung ke broker lokal sendiri. Klien MQTT eksternal kemudian dapat mempublikasikan data ke ini ERDDAP broker, yang `Login` dataset akan berlangganan dan ingest.

## Gunakan Kasus 2: Penerbitan Pemberitahuan Perubahan Dataset

 ERDDAP dapat dikonfigurasi untuk mempublikasikan pemberitahuan tentang perubahan dataset (e.g., update atau reload) untuk topik pada broker MQTT. Pertama, pastikan broker diaktifkan atau yang eksternal tersedia. Kemudian, aktifkan fitur notifikasi di `WordPress.org` Sitemap

 ` <!-- Set to 'true' to publish dataset change notifications via MQTT. Default is 'false'. -->   <publishMqttNotif> Login </publishMqttNotif> `  

Ketika fitur ini diaktifkan, ERDDAP menggunakan klien MQTT internal untuk menerbitkan pesan. Pengaturan koneksi untuk klien ini dapat disesuaikan dalam `WordPress.org` Sitemap Tabel di bawah daftar pengaturan yang tersedia dan nilai default mereka.

 | Login | Login | Nilai default | Sitemap | 
 | Sitemap | Sitemap | Sitemap | Sitemap | 
 |   ` <mqttServerHost> `           | Login |   `Login`         | Broker host untuk mempublikasikan pemberitahuan kepada. | 
 |   ` <mqttServerPort> `           | Login |   `1883`              | Pelabuhan broker pemberitahuan. | 
 |   ` <mqttClientId> `             | Login |   `Sitemap`     | ID klien untuk penerbit pemberitahuan. | 
 |   ` <mqttUserName> `             | Login |   `Sitemap`   | Nama pengguna penerbit pemberitahuan. | 
 |   ` <mqttPassword> `             | Login |   `Sitemap`   | Kata sandi penerbit pemberitahuan. | 
 |   ` <mqttSsl> `                  | Login |   `Login`             | Gunakan SSL / TLS untuk koneksi pemberitahuan. | 
 |   ` <mqttKeepAlive> `            | Login |   `60 g`                | Interval terus-menerus dalam detik. | 
 |   ` <mqttCleanStart> `           | Login |   `Login`             | Mulai dengan sesi bersih (tidak ada keadaan sesi yang bertahan) Sitemap | 
 |   ` <mqttSessionExpiry> `        | Login |   `10 g`                | Sesi interval kedaluwarsa dalam detik. | 
 |   ` <mqttConnectionTimeout> `    | Login |   `10 g`                | Waktu koneksi dalam detik. | 
 |   ` <mqttAutomaticReconnect> `   | Login |   `Login`              | Secara otomatis menghubungkan jika koneksi hilang. | 


Login

## Lingkungan Variabel Parsing di ` datasets.xml ` 

Fitur baru telah diperkenalkan yang memungkinkan penggunaan variabel lingkungan dalam ` datasets.xml ` Sitemap Sitemap **diaktifkan secara default** Sitemap

Untuk menonaktifkan fungsi ini, tambahkan bendera berikut untuk `WordPress.org` Sitemap

Login

 ` <enableEnvParsing> Login </enableEnvParsing> ` 
