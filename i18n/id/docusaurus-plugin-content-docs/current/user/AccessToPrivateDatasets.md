---
title: "Access to Private Datasets"
---
# Akses ke Dataset Pribadi ERDDAP™ 

Login ERDDAP™ instalasi tidak memiliki otentikasi diaktifkan dan dengan demikian tidak memberikan cara untuk pengguna untuk login, atau apakah mereka memiliki dataset pribadi.

Sitemap ERDDAP™ instalasi memiliki otentikasi diaktifkan. Sitemap ERDDAP™ hanya mendukung otentikasi melalui akun email yang dikelola Google, yang mencakup akun email di NOAA dan banyak universitas. Sitemap ERDDAP™ memiliki otentikasi diaktifkan, siapa pun dengan akun email yang dikelola Google dapat masuk, tetapi mereka hanya akan memiliki akses ke set data pribadi yang ERDDAP™ administrator telah secara eksplisit memberi wewenang kepada mereka untuk mengakses.

## Instruksi yang diperbarui{#updated-instructions} 

Beberapa informasi di bawah ini adalah dari tanggal. Sampai saat ini diperbarui Anda dapat menggunakan [posting blog ini](https://shospital.github.io/blog/posts/blog-post/erddap_private_dataset.html) untuk langkah-langkah terbaru untuk mendapatkan data dari dataset pribadi dengan script.

## Manusia Dengan Browser{#humans-with-browsers} 

Pengguna manusia ERDDAP™ login ERDDAP™ di browser untuk mendapatkan akses ke dataset pribadi yang mereka berwenang untuk mengakses.

Untuk masuk:

1. Klik pada log di link di sebelah kiri atas ERDDAP™ Login
Jika tidak ada log di link, ERDDAP™ instalasi tidak memiliki otentikasi diaktifkan dan tidak ada dataset pribadi.
     
2. Klik pada tombol Masuk ke akun Google Anda.
Teks tombol harus berubah menjadi "Signed in".
     
3. Klik di Log ke ERDDAP Login
Halaman web harus berubah untuk mengatakan Anda login *Login Login* Sitemap
Jika tidak, tunggu 5 detik dan klik di Log ke ERDDAP tombol lagi.
Dalam kasus ekstrem, Anda mungkin harus menunggu dan kemudian mencoba lagi beberapa kali.
     
4. Jangan gunakan tombol Back browser Anda. Gunakan " ERDDAP " link di bagian atas, kemudian gunakan tautan lain untuk pergi ke ERDDAP™ halaman yang Anda minati. Jika halaman web cache mengatakan Anda tidak masuk, isi ulang halaman.
     

## Login{#scripts} 

 \\[ Ini sedikit dimodifikasi dari informasi yang disediakan oleh Lynn DeWitt, yang melakukan pekerjaan keras dari mencari ini. lynn, terima kasih banyak&#33;
Jika Anda memiliki koreksi atau saran, silakan email erd.data @ noaaaa.gov . \\] 

Hal ini juga mungkin untuk masuk ke Meme it ERDDAP™ dan mengakses dataset pribadi melalui script. Berikut adalah contoh yang digunakan curl Sitemap

1. Instruksi ini mengasumsikan Anda menggunakan alamat gmail di mana otentikasi 2-faktor tidak menyala. Jika alamat gmail utama Anda memiliki otentikasi 2-faktor menyala, pertimbangkan membuat alamat gmail lain dengan otentikasi 2-faktor mematikan.
     
2. Login ERDDAP™ secara manual dengan alamat gmail yang Anda inginkan menggunakan skrip Anda dan menerima izin yang diperlukan, kemudian log sepenuhnya kembali.
     
3. Buka alat pengembang browser, dan buka tab Jaringan.
     
4. Klik di ERDDAP™ "log in" link, kemudian tombol "Sign in" dan pilih alamat email yang tepat jika diminta.
     
5. Setelah tombol "Sign in" berubah menjadi "Signed in", tab Jaringan Alat Pengembang akan menunjukkan dua entri yang terlihat seperti berikut (Mozilla Firefox) Sitemap
```
    iframerpc?action=issueToken&response loginGoogle.html  
```
Gunakan menu konteks klik kanan mouse ke "copy as cURL" kedua dari url ini dan menempelkannya ke editor teks biasa
     
6. Klik pada "Log ke ERDDAP " tombol dan "copy as cURL" link yang terlihat seperti:
```
    login.html  
```
dan paste ketiga ini curl perintah ke dalam file teks.
     
7. Dalam file teks, Anda sekarang akan memiliki 3 baris seperti berikut, di mana Anda telah masuk ke dalam ERDDAP™ server di ' *https://host.somewhere.com/erddap* Sitemap Pertama curl perintah mendapat profil pengguna Anda di "login\\_hint" dan menghasilkan "id\\_token". Yang kedua menggunakan id \\_token untuk masuk ke Google, dan ketiga kemudian masuk ke ERDDAP Sitemap
```
    curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' --2.0 -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive' curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=HUGELONGIDTOKEN' curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1'
```
    
8. 3 baris di atas, ketika berjalan sequentially dari baris perintah, akan log Anda ke ERDDAP Sitemap Untuk menggunakan ini dalam skrip Anda perlu menangkap id \\_token dari baris pertama, memberi makan ke garis kedua, dan menulis cookie untuk dibaca oleh garis berikutnya.
     
9. Untuk mengembangkan skrip, menjalankan yang pertama (Sitemaphttps://accounts.google.com)   curl garis persis seperti disalin dari alat pengembang, dan menangkap respons (Anda mungkin mendapatkan Meme it curl kesalahan tentang bendera "-2.0" hanya menghapusnya Meme it) Sitemap Dalam php terlihat seperti berikut:
```
    $gcurlstuff="curl 'https://accounts.google.com/o/oauth2/iframerpc?action=issueToken&response\\_type=token%20id\\_token&scope=openid%20profile%20email&client\\_id=ABCDEFG.apps.googleusercontent.com&login\\_hint=XXXXXXXXXX&ss\\_domain=https%3A%2F%2Fhost.somewhere.com&origin=https%3A%2F%2Fhost.somewhere.com' -H 'Host: accounts.google.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://accounts.google.com/o/oauth2/iframe' -H 'Cookie: lotsofcookiestuff' -H 'Connection: keep-alive'"; //execute the curl command: exec($gcurlstuff,$output,$status); //the response is a json array in $output $response=json\\_decode($output\\[0\\],true); //the part you need is in "id\\_token": $id\\_token=$response\\["id\\_token"\\];
```
Masuk ke Google dengan mengeksekusi garis kedua menggunakan $id\\_token, pertama-tama menghapus "-H 'Cookie: hal'" parameter dan bukan memberitahu curl menulis cookie:
```
    $glcurlstuff="curl 'https://host.somewhere.com/erddap/loginGoogle.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: \\*/\\*' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Content-Type: application/x-www-form-urlencoded' -H 'Cookie: cookiestuff' -H 'Connection: keep-alive' --data 'idtoken=".$id\\_token."' -b cookies.txt -c cookies.txt" exec($glcurlstuff,$output1,$status);
```
Login ERDDAP™ , kembali menghapus parameter "-H 'Cookie: hal'", dan menggunakan cookie tertulis sebelumnya:
```
    $ecurlstuff="curl 'https://host.somewhere.com/erddap/login.html' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: https://host.somewhere.com/erddap/login.html' -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1 -b cookies.txt"' exec($ecurlstuff,$output2,$status);
```
Sekarang Anda harus dapat meminta data dari server, menggunakan cookie yang sama:
```
    $curlstuff="curl -s 'https://host.somewhere.com/erddap/tabledap/datasetid.csv?variablelist' -H 'Host: host.somewhere.com' -H 'User-Agent: useragentstuff' -H 'Accept: typeacceptstuff' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Connection: keep-alive' -H 'Upgrade-Insecure-Requests: 1' -b cookies.txt"; exec($curlstuff,$output3,$status); //$output3 will be data in csv!
```
