"use strict";(self.webpackChunkdocumentation=self.webpackChunkdocumentation||[]).push([[9907],{28453:(a,n,e)=>{e.d(n,{R:()=>l,x:()=>r});var i=e(96540);const t={},d=i.createContext(t);function l(a){const n=i.useContext(d);return i.useMemo((function(){return"function"==typeof a?a(n):{...n,...a}}),[n,a])}function r(a){let n;return n=a.disableParentContext?"function"==typeof a.components?a.components(t):a.components||t:l(a.components),i.createElement(d.Provider,{value:n},a.children)}},87625:(a,n,e)=>{e.r(n),e.d(n,{assets:()=>s,contentTitle:()=>r,default:()=>k,frontMatter:()=>l,metadata:()=>i,toc:()=>m});const i=JSON.parse('{"id":"server-admin/EDDTableFromEML","title":"EDDTableFromEML","description":"\\\\\\\\[Halaman web ini hanya akan menarik minat untuk Meme itERDDAP\u2122administrator yang bekerja dengan file EML.","source":"@site/i18n/id/docusaurus-plugin-content-docs/current/server-admin/EDDTableFromEML.md","sourceDirName":"server-admin","slug":"/server-admin/EDDTableFromEML","permalink":"/id/docs/server-admin/EDDTableFromEML","draft":false,"unlisted":false,"editUrl":"https://github.com/erddap/erddap.github.io/tree/main/docs/server-admin/EDDTableFromEML.md","tags":[],"version":"current","sidebarPosition":6,"frontMatter":{"title":"EDDTableFromEML","sidebar_position":6},"sidebar":"docSidebar","previous":{"title":"Scaling","permalink":"/id/docs/server-admin/scaling"},"next":{"title":"displayInfo and displayAttribute","permalink":"/id/docs/server-admin/display-info"}}');var t=e(74848),d=e(28453);const l={title:"EDDTableFromEML",sidebar_position:6},r="EDDTableDariEML dan EDDTableDariEMLBatch Pilihan di GenerateDataset Login",s={},m=[{value:"Sitemap",id:"questions",level:2},{value:"Detail Desain",id:"design-details",level:2},{value:"Satu dataTable Menjadi SatuERDDAP\u2122Login",id:"one-datatable-becomes-one-erddap-dataset",level:3},{value:"EML versus CF+ACDD",id:"eml-versus-cfacdd",level:3},{value:"Perubahan kecil",id:"small-changes",level:3},{value:"Login",id:"docbook",level:3},{value:"Database",id:"data-files",level:3},{value:".zipDatabase",id:"zipd-data-files",level:3},{value:"Jenis Penyimpanan",id:"storagetype",level:3},{value:"Login",id:"units",level:3},{value:"OpenOffice 4.1.1",id:"eml-version-211",level:3},{value:"Masalah dengan File EML",id:"issues-with-the-eml-files",level:2},{value:"Tanggal Terpisah dan Kolom Waktu",id:"separate-date-and-time-columns",level:3},{value:"Nama Kolom yang tidak konsisten",id:"inconsistent-column-names",level:3},{value:"Pesanan Kolom yang Berbeda",id:"different-column-order",level:3},{value:"Sitemap",id:"incorrect-numheaderlines",level:3},{value:"numHeaderLines = 0",id:"numheaderlines--0",level:3},{value:"Format Tanggal String",id:"datetime-format-strings",level:3},{value:"Tanggal Waktu Tapi Tidak ada Zona Waktu",id:"datetime-but-no-time-zone",level:3},{value:"Loginmissing\\_value",id:"missing-missing_value",level:3},{value:"Masalah kecil",id:"small-problems",level:3},{value:"Karakter Unicode yang tidak valid",id:"invalid-unicode-characters",level:3},{value:"Unit Kolom yang Berbeda] (Sitemap)",id:"different-column-unitsdifferentcolumnunits",level:3},{value:"Versi yang berbeda dari EML",id:"different-versions-of-eml",level:3},{value:"Trouble Membuat File Data",id:"trouble-parsing-the-data-file",level:3}];function u(a){const n={a:"a",br:"br",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,d.R)(),...a.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"eddtabledarieml-dan-eddtabledariemlbatch-pilihan-di-generatedataset-login",children:"EDDTableDariEML dan EDDTableDariEMLBatch Pilihan di GenerateDataset Login"})}),"\n",(0,t.jsx)(n.p,{children:"\\[Halaman web ini hanya akan menarik minat untuk Meme itERDDAP\u2122administrator yang bekerja dengan file EML.\r\nDokumen ini awalnya diciptakan pada tahun 2016. Terakhir diedit pada 2020-11-30.\\]"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsxs)(n.a,{href:"https://coastwatch.pfeg.noaa.gov/erddap/index.html",children:[" ",(0,t.jsx)(n.strong,{children:"ERDDAP\u2122"})," "]}),"adalah server data yang memberi pengguna cara sederhana, konsisten untuk mengunduh subset data ilmiah gridded dan tabular dalam format file umum dan membuat grafik dan peta.ERDDAP\u2122bekerja dengan dataset tertentu sebagai kelompok variabel gridded multidimensi (e.g., data satelit atau model) atau sebagai tabel seperti database (dengan kolom untuk setiap jenis informasi dan baris untuk setiap pengamatan) SitemapERDDAP\u2122Gratis dan Open Source Software, sehingga siapa pun bisa",(0,t.jsx)(n.a,{href:"/docs/server-admin/deploy-install",children:"download dan menginstalERDDAP\u2122"}),"untuk melayani data mereka."]}),"\n",(0,t.jsxs)(n.p,{children:["Untuk menambahkan dataset ke sebuahERDDAP\u2122instalasi,ERDDAP\u2122administrator harus menambahkan chunk dari XML menggambarkan dataset ke file yang disebutdatasets.xmlSitemap (Sitemap",(0,t.jsx)(n.a,{href:"/docs/server-admin/datasets",children:"dokumentasi menyeluruh untukdatasets.xml"}),"Sitemap) Meskipun dimungkinkan untuk menghasilkan chunk XML untukdatasets.xmlsepenuhnya dengan tangan,ERDDAP\u2122datang dengan alat yang disebut",(0,t.jsxs)(n.a,{href:"/docs/server-admin/datasets#tools",children:[" ",(0,t.jsx)(n.strong,{children:"Login"})," "]}),"yang dapat menghasilkan draft kasar dari chunk XML yang diperlukan untuk dataset tertentu berdasarkan beberapa sumber informasi tentang dataset."]}),"\n",(0,t.jsxs)(n.p,{children:["Hal pertama GenerateDatasets Xml meminta adalah jenis dataset yang ingin Anda buat. Login Xml memiliki opsi khusus, ",(0,t.jsx)(n.strong,{children:"Login"})," yang menggunakan informasi dalam sebuah",(0,t.jsx)(n.a,{href:"https://knb.ecoinformatics.org/external//emlparser/docs/index.html",children:"Bahasa Metadata Ekologi (Login) "}),"XML file untuk menghasilkan chunk XML untukdatasets.xmluntuk membuat",(0,t.jsx)(n.a,{href:"/docs/server-admin/datasets#eddtablefromasciifiles",children:"Login"}),"dataset dari setiap tabel data dalam file EML. Ini bekerja dengan sangat baik untuk sebagian besar file EML, sebagian besar karena file EML melakukan pekerjaan yang sangat baik untuk menyimpan semua metadata yang diperlukan untuk dataset dalam format yang mudah digunakan. Informasi yang GenerateDatasetsXml perlu membuat dataset berada dalam file EML, termasuk URL untuk file data, yang GenerateDatasetsXml download, parses, dan membandingkan deskripsi dalam file EML. (Banyak kelompok akan melakukannya dengan baik untuk beralih ke EML, yang merupakan sistem yang bagus untuk mendokumentasikan dataset ilmiah tabular, tidak hanya data ekologis. Dan banyak kelompok yang membuat schemas XML akan dilakukan dengan baik untuk menggunakan EML sebagai studi kasus untuk penjadwal XML yang jelas, ke titik, tidak terlalu dalam (i.e., terlalu banyak tingkat) , dan mudah bagi manusia dan komputer untuk bekerja dengan.)"]}),"\n",(0,t.jsx)(n.h2,{id:"questions",children:"Sitemap"}),"\n",(0,t.jsx)(n.p,{children:"Berikut adalah semua pertanyaan GenerateDatasets Xml akan meminta, dengan komentar tentang bagaimana Anda harus menjawab jika Anda ingin memproses hanya satu file EML atau batch file EML:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"EDDType?\r\nJika Anda ingin memproses hanya satu file, jawaban: EDDTableDariEML\r\nJika Anda ingin memproses sekelompok file, jawaban: EDDTableDariEMLBatch"}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Direktori untuk menyimpan file?\r\nMasukkan nama direktori yang akan digunakan untuk menyimpan file EML dan/atau data yang diunduh.\r\nJika direktori tidak ada, itu akan dibuat."}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"(Untuk EDDTableDariEML Sitemap) EML URL atau fileName lokal?\r\nMasukkan URL atau nama file lokal dari file EML."}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["(Untuk EDDTableDariEMLBatch hanya) Login (URL atau lokal) Sitemap\r\nMasukkan nama direktori dengan file EML (URL atau dir lokal) Sitemap\r\nContoh: ",(0,t.jsx)(n.a,{href:"http://sbc.lternet.edu/data/eml/files/",children:"http://sbc.lternet.edu/data/eml/files/"})]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"(Untuk EDDTableDariEMLBatch hanya) URL:\r\nMasukkan ekspresi reguler yang akan digunakan untuk mengidentifikasi file EML yang diinginkan di direktori EML.\r\nContoh: knb-lter-sbc\\.\\d+"}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Gunakan file lokal jika ada (Login|Login) Sitemap\r\nMasukkan benar untuk menggunakan file EML lokal yang ada dan file data, jika mereka ada.\r\nMasukkan palsu untuk selalu mengunduh file EML dan/atau file data."}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:['Sitemap Sitemap\r\nJika Anda ingin dataset baru untuk menjadi dataset pribadi diERDDAPmenentukan nama kelompok (Login) yang akan diperbolehkan akses.\r\nDirekomendasikan untuk kelompok LTER: menggabungkan "lter" plus grup, misalnya, lter Login\r\nJika Anda memasukkan "null", tidak akan ada<Sitemap To> tag dalam output.\r\nSitemap',(0,t.jsx)(n.a,{href:"/docs/server-admin/datasets#accessibleto",children:"Sitemap Sitemap"}),"Sitemap"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:["Login Login (Sitemap) Sitemap\r\nJika variabel waktu menunjukkan bahwa memiliki nilai waktu setempat, zona waktu ini akan ditugaskan.\r\nIni harus menjadi nilai dari",(0,t.jsx)(n.a,{href:"https://en.wikipedia.org/wiki/List_of_tz_database_time_zones",children:"Daftar kolom TZ dari nama zona waktu"}),'Sitemap\r\nPerhatikan semua nama "US/..." yang mudah digunakan di akhir daftar.\r\nJika Anda kemudian menemukan bahwa menjadi salah, Anda dapat mengubahtime\\_zonedi chunk daridatasets.xmlSitemap']}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["LoginERDDAP\u2122adalah kombinasi yang bagus, karenaERDDAP\u2122dapat memberikan akses langsung ke kekayaan",(0,t.jsx)(n.a,{href:"https://knb.ecoinformatics.org/",children:"Jaringan Pengetahuan untuk Biokomplexitas (Login) "}),"Login",(0,t.jsx)(n.a,{href:"https://lternet.edu/",children:"Penelitian Ekologi Jangka Panjang (Login) "}),"data dan membantu proyek-proyek tersebut bertemu dengan pemerintah AS",(0,t.jsx)(n.a,{href:"https://nosc.noaa.gov/EDMC/PD.DSP.php",children:"Akses Umum untuk Hasil Penelitian (Login) Sitemap"}),"dengan membuat data yang tersedia melalui layanan web. Juga, EML plusERDDAP\u2122tampaknya seperti jembatan besar antara ilmuwan di realm akademis / NSF-funded dan ilmuwan di agen federal (NOAA, NASA, USGS) Login"]}),"\n",(0,t.jsxs)(n.p,{children:["Sitemap",(0,t.jsx)(n.a,{href:"/docs/intro#support",children:"bagian untuk mendapatkan dukungan tambahan"}),"Sitemap\r\n\xa0"]}),"\n",(0,t.jsx)(n.h2,{id:"design-details",children:"Detail Desain"}),"\n",(0,t.jsx)(n.p,{children:"Berikut adalah rincian desain dari opsi EDDTableFromEML di GenerateDatasetsXml.\r\nBeberapa berhubungan dengan perbedaan dalam bagaimana EML danERDDAP\u2122melakukan hal-hal dan bagaimana GenerateDatasets Penawaran Xml dengan masalah ini."}),"\n",(0,t.jsx)(n.h3,{id:"one-datatable-becomes-one-erddap-dataset",children:"Satu dataTable Menjadi SatuERDDAP\u2122Login"}),"\n",(0,t.jsxs)(n.p,{children:["Satu file EML mungkin memiliki beberapa<Sitemap Tabel & gt;ERDDAP\u2122membuat satuERDDAP\u2122dataset per data EML. LogindatasetIDuntuk dataset\r\n",(0,t.jsx)(n.em,{children:"Login"})," Login ",(0,t.jsx)(n.em,{children:"Login"}),"   (EMLname) Sitemap\r\n",(0,t.jsx)(n.em,{children:"sistem\\_EMLName"})," Login ",(0,t.jsx)(n.em,{children:"Login"}),"   (EMLname) Sitemap\r\nSebagai contoh, tabel #1 dalam file knb-lter-sbc.28, menjadiERDDAP\u2122 datasetID=knb\\_lter\\_sbc\\_28\\_t1,\r\n\xa0"]}),"\n",(0,t.jsx)(n.h3,{id:"eml-versus-cfacdd",children:"EML versus CF+ACDD"}),"\n",(0,t.jsxs)(n.p,{children:["Hampir semua metadata dalam file EML masuk keERDDAPtetapi dalam format yang berbeda.ERDDAP\u2122menggunakan",(0,t.jsx)(n.a,{href:"https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html",children:"Login"}),"Login",(0,t.jsx)(n.a,{href:"https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3",children:"Login"}),"standar metadata. Mereka melengkapi sistem metadata yang menggunakan key=value pair untuk metadata global dan untuk setiap metadata variabel.\r\nYa, representasi EML metadata lebih bagus daripada representasi CF + ACDD. Saya tidak menyarankan menggunakan representasi CF + ACDD sebagai pengganti EML. Silahkan pikir CF + ACDD sebagai bagian dari jembatan dari dunia EML keOPeNDAPSitemap\r\n\xa0"]}),"\n",(0,t.jsx)(n.h3,{id:"small-changes",children:"Perubahan kecil"}),"\n",(0,t.jsx)(n.p,{children:"ERDDAP\u2122membuat banyak perubahan kecil. SitemapERDDAP\u2122menggunakan EML non-DOILogin Identifier ditambah nomor dataTable sebagaiERDDAP\u2122 datasetIDtapi sedikit perubahan alternatif Identifier untuk membuat nama variabel yang valid dalam kebanyakan bahasa komputer, misalnya, knb-lter-sbc.33 data Tabel #1 menjadi knb\\_lter\\_sbc\\_33\\_t1.\r\n\xa0"}),"\n",(0,t.jsx)(n.h3,{id:"docbook",children:"Login"}),"\n",(0,t.jsx)(n.p,{children:"EML menggunakan sistem markup DocBook untuk menyediakan struktur untuk memblokir teks dalam file EML. CF dan ACDD memerlukan bahwa metadata menjadi teks biasa. Login Xml mengubah teks yang ditandai menjadi teks biasa yang terlihat seperti versi teks yang diformat. Tag inline dihiasi dengan braket persegi, misalnya,\\[Sitemap\\], dan kiri dalam teks biasa.\r\n\xa0"}),"\n",(0,t.jsx)(n.h3,{id:"data-files",children:"Database"}),"\n",(0,t.jsx)(n.p,{children:"Karena data EMLTable mencakup URL file data aktual, HasilkanDataset Sitemap"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsx)(n.li,{children:"Unduh file data."}),"\n",(0,t.jsx)(n.li,{children:"Simpan di direktori yang sama dengan file EML."}),"\n",(0,t.jsx)(n.li,{children:"Baca data."}),"\n",(0,t.jsx)(n.li,{children:"Bandingkan deskripsi data di EML dengan data aktual dalam file."}),"\n",(0,t.jsx)(n.li,{children:"Sitemap Xml menemukan perbedaan, ia berurusan dengan mereka, atau meminta operator jika perbedaannya oke, atau mengembalikan pesan kesalahan. Detail dalam berbagai item di bawah ini.\r\n\xa0"}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"zipd-data-files",children:".zipDatabase"}),"\n",(0,t.jsxs)(n.p,{children:["Jika file data referensi adalah.zipfile, harus berisi hanya satu file. File itu akan digunakan untukERDDAP\u2122Login Jika ada lebih dari 1 file.ERDDAP\u2122akan menolak dataset. Jika diperlukan, ini bisa dimodifikasi. (Dalam prakteknya, semua file zip SBC LTER hanya memiliki satu file data.)",(0,t.jsx)(n.br,{}),"\n","\xa0"]}),"\n",(0,t.jsx)(n.h3,{id:"storagetype",children:"Jenis Penyimpanan"}),"\n",(0,t.jsx)(n.p,{children:"Jika penyimpanan kolom Jenis tidak ditentukan,ERDDAP\u2122menggunakan kira terbaik berdasarkan data dalam file data. Ini bekerja cukup baik.\r\n\xa0"}),"\n",(0,t.jsx)(n.h3,{id:"units",children:"Login"}),"\n",(0,t.jsxs)(n.p,{children:["ERDDAP\u2122Login",(0,t.jsx)(n.a,{href:"https://www.unidata.ucar.edu/software/udunits/",children:"UDUNITSformat untuk unit"}),'Sitemap Login Xml mampu mengonversi unit EML keUDUNITSbersih sekitar 95% dari waktu. Hasil sisa 5% dalam deskripsi unit yang dapat dibaca, misalnya, "biomassDensityUnitPerAbundanceUnit" di EML menjadi "unit kepadatan biomass per unit kelimpahan" dalamERDDAPSitemap Secara teknis ini tidak diperbolehkan. Saya tidak berpikir itu sangat buruk dalam keadaan. Meme it\\[Jika perlu, unit yang tidak dapat dibuatUDUNITSkompatibel dapat dipindahkan ke atribut komentar variabel.\\]',(0,t.jsx)(n.br,{}),"\n","\xa0"]}),"\n",(0,t.jsx)(n.h3,{id:"eml-version-211",children:"OpenOffice 4.1.1"}),"\n",(0,t.jsx)(n.p,{children:"Dukungan ini untuk file EML v2.1.1 ditambahkan ke GenerateDatasets Xml di 2016 dengan harapan bahwa akan ada beberapa uptake di komunitas EML. Pada tahun 2020, belum terjadi. LoginERDDAP\u2122pengembang akan senang menambahkan dukungan untuk versi terbaru dari EML, tetapi hanya jika fitur baru akan benar-benar digunakan. Sitemaperd.data at noaa.govjika Anda ingin mendukung versi terbaru dari EML dan akan benar-benar menggunakan fitur ini.\r\n\xa0"}),"\n",(0,t.jsx)(n.h2,{id:"issues-with-the-eml-files",children:"Masalah dengan File EML"}),"\n",(0,t.jsx)(n.p,{children:"Ada beberapa masalah / masalah dengan file EML yang menyebabkan masalah ketika klien perangkat lunak (seperti opsi EDDTableDariEML di GenerateDatasetsXML) mencoba untuk menafsirkan/ memproses file EML."}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Meskipun ada beberapa isu yang tercantum di sini, mereka sebagian besar masalah kecil yang layak. Secara umum, EML adalah sistem yang bagus dan telah menjadi kesenangan saya untuk bekerja dengan itu."}),"\n",(0,t.jsx)(n.li,{children:"Ini kira-kira diurutkan dari worst / paling umum untuk setidaknya buruk / kurang umum."}),"\n",(0,t.jsx)(n.li,{children:"Kebanyakan terkait dengan masalah kecil dalam file EML tertentu (yang bukan kesalahan EML) Sitemap"}),"\n",(0,t.jsx)(n.li,{children:"Kebanyakan dapat diperbaiki dengan perubahan sederhana ke file EML atau file data."}),"\n",(0,t.jsx)(n.li,{children:"Mengingat bahwa orang-orang LTER membangun pemeriksaan EML untuk menguji validitas file EML, saya telah menambahkan beberapa saran di bawah tentang fitur yang dapat ditambahkan ke checker."}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"Berikut isu-isu:"}),"\n",(0,t.jsx)(n.h3,{id:"separate-date-and-time-columns",children:"Tanggal Terpisah dan Kolom Waktu"}),"\n",(0,t.jsx)(n.p,{children:"Beberapa file data memiliki kolom yang terpisah untuk tanggal dan untuk waktu, tetapi tidak ada tanggal + kolom waktu yang ditentukan. Sitemap Xml membuat dataset dengan kolom terpisah ini, tetapi tidak ideal karena:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:'Ini terbaik jika dataset dalamERDDAP\u2122memiliki kolom tanggal gabungan + waktu yang disebut"time"Sitemap'}),"\n",(0,t.jsx)(n.li,{children:'Seringkali dataset tidak akan memuatERDDAP\u2122Sitemap"time"kolom tidak memiliki data tanggal + waktu.'}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"Ada dua solusi yang mungkin:"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsx)(n.li,{children:"Edit file data sumber untuk menambahkan kolom baru dalam file data (dan menggambarkannya di EML) di mana kolom tanggal dan waktu digabungkan menjadi satu kolom. Sitemap Xml sehingga menemukan kolom baru."}),"\n",(0,t.jsxs)(n.li,{children:["Login",(0,t.jsx)(n.a,{href:"/docs/server-admin/datasets#script-sourcenamesderived-variables",children:"Variabel Derifd"}),"SitemapERDDAP\u2122untuk mendefinisikan variabel baru dalamdatasets.xmlyang dibuat dengan menyusun tanggal dan kolom waktu. Salah satu contoh penawaran khusus dengan situasi ini.\r\n\xa0"]}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"inconsistent-column-names",children:"Nama Kolom yang tidak konsisten"}),"\n",(0,t.jsx)(n.p,{children:"File EML daftar kolom file data dan nama mereka. Sayangnya, mereka sering berbeda dari nama kolom dalam file data yang sebenarnya. Biasanya, urutan kolom dalam file EML sama dengan urutan kolom dalam file data, bahkan jika nama bervariasi sedikit, tetapi tidak selalu. Login Xml mencoba untuk mencocokkan nama kolom. Kapan tidak bisa (yang umum) , itu akan berhenti, tunjukkan pasangan nama file EML / data, dan bertanya apakah mereka benar selaras. Jika Anda memasukkan 's' untuk melewatkan tabel, GeneratedDatasetsXml akan mencetak pesan kesalahan dan pergi ke tabel berikutnya.\r\nSolusinya adalah mengubah nama kolom erron di file EML untuk mencocokkan nama kolom dalam file data.\r\n\xa0"}),"\n",(0,t.jsx)(n.h3,{id:"different-column-order",children:"Pesanan Kolom yang Berbeda"}),"\n",(0,t.jsx)(n.p,{children:"Ada beberapa kasus di mana EML menentukan kolom dalam urutan yang berbeda daripada yang ada dalam file data. Login Xml akan berhenti dan meminta operator jika pencocokan tidak oke atau jika dataset harus selesai. Jika selesai, akan ada pesan kesalahan dalam file hasil, misalnya,:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"      &lt;-- SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN\r\n      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):\r\n      datasetID=knb\\\\_lter\\\\_sbc\\\\_17\\\\_t1\r\n      dataFile=all\\\\_fish\\\\_all\\\\_years\\\\_20140903.csv\r\n      The data file and EML file have different column names.\r\n      ERDDAP\u2122 would like to equate these pairs of names:\r\n        SURVEY\\\\_TIMING        = notes\r\n        NOTES                = survey\\\\_timing\r\n      --&gt;\n"})}),"\n",(0,t.jsx)(n.p,{children:"Solusinya adalah untuk memperbaiki urutan kolom dalam file EML ini sehingga mereka mencocokkan pesanan dalam file data."}),"\n",(0,t.jsx)(n.p,{children:"Ini akan bagus jika pemeriksaan EML memeriksa bahwa kolom dan urutan kolom dalam file sumber cocok kolom dan urutan kolom dalam file EML."}),"\n",(0,t.jsx)(n.h3,{id:"incorrect-numheaderlines",children:"Sitemap"}),"\n",(0,t.jsx)(n.p,{children:"Database Tabel dengan benar keadaan numHeaderLines=1, misalnya, ...sbc.4011. Penyebab iniERDDAP\u2122membaca baris pertama data sebagai nama kolom. Saya mencoba untuk secara manual SKIP semua dataTables ini. Mereka jelas karena nama col sumber yang tak tertandingi adalah semua nilai data. Dan jika ada file yang salah memiliki numHeaderLines=0, sistem saya tidak membuatnya jelas. Berikut ini contoh dari file kegagalan SBC LTER:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"      &lt;-- SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN\r\n      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):\r\n       datasetID=knb\\\\_lter\\\\_sbc\\\\_3017\\\\_t1\r\n      dataFile=MC06\\\\_allyears\\\\_2012-03-03.txt\r\n      The data file and EML file have different column names.\r\n      ERDDAP\u2122 would like to equate these pairs of names:\r\n        2008-10-01T00:00     = timestamp\\\\_local\r\n        2008-10-01T07:00     = timestamp\\\\_UTC\r\n        2.27                 = discharge\\\\_lps\r\n        -999.0               = water\\\\_temperature\\\\_celsius\r\n      --&gt;\n"})}),"\n",(0,t.jsx)(n.p,{children:"Jadi kesalahan dapat muncul seolah-olah GenerateDataset Xml berpikir bahwa baris pertama dengan data dalam file (e.g., dengan 2008-10-01T00:00 dll.) adalah garis dengan nama kolom (seolah-olah 2008-10-01T00:00 adalah nama kolom) Sitemap"}),"\n",(0,t.jsx)(n.p,{children:"Ini akan bagus jika pemeriksaan EML memeriksa nilai numHeaderLines."}),"\n",(0,t.jsx)(n.h3,{id:"numheaderlines--0",children:"numHeaderLines = 0"}),"\n",(0,t.jsx)(n.p,{children:"Beberapa file sumber tidak memiliki nama kolom.ERDDAP\u2122menerima bahwa jika EML menggambarkan jumlah kolom yang sama."}),"\n",(0,t.jsx)(n.p,{children:"Menurut pendapat saya: ini tampak sangat berbahaya. Ada kolom dalam urutan yang berbeda atau dengan unit yang berbeda (Sitemap) dan tidak ada cara untuk menangkap masalah tersebut. Meme it Ini jauh lebih baik jika semua file data ASCII memiliki baris dengan nama kolom."}),"\n",(0,t.jsx)(n.h3,{id:"datetime-format-strings",children:"Format Tanggal String"}),"\n",(0,t.jsxs)(n.p,{children:["EML memiliki cara standar untuk menggambarkan format waktu tanggal. tetapi ada variasi yang cukup dalam penggunaannya dalam file EML. (Aku sebelumnya salah tentang ini. Meme it Saya melihat dokumentasi EML untuk formatString yang muncul untuk mencocokkan",(0,t.jsx)(n.a,{href:"https://docs.oracle.com/javase/8/docs/api/index.html?java/time/format/DateTimeFomatter.html",children:"JavaSpesifikasi DateTimeFormatter"}),", tetapi yang tidak memiliki pedoman penting tentang penggunaannya, dengan hasilnya formatString sering / biasanya tidak digunakan.) Ada beberapa kasus dengan kasus yang salah, dan/atau duplikasi yang salah dari surat, dan/atau format non-standar. Itu menempatkan beban yang tidak masuk akal pada klien, terutama klien perangkat lunak seperti GenerateDatasetsXml. Login Xml mencoba untuk mengubah format yang benar didefinisikan dalam file EML menjadi\r\n",(0,t.jsx)(n.a,{href:"/docs/server-admin/datasets#string-time-units",children:"format tanggal/waktu yangERDDAP\u2122Login"}),"yang hampir identik denganJavaspesifikasi format waktu / Joda, tetapi sedikit lebih menonjol."]}),"\n",(0,t.jsx)(n.p,{children:"Itu akan bagus jika pemeriksaan EML diperlukan kepatuhan yang ketat untukJavaLoginERDDAPspesifikasi unit waktu dan diverifikasi bahwa nilai waktu tanggal di tabel data dapat dibuat dengan benar dengan format yang ditentukan."}),"\n",(0,t.jsx)(n.h3,{id:"datetime-but-no-time-zone",children:"Tanggal Waktu Tapi Tidak ada Zona Waktu"}),"\n",(0,t.jsx)(n.p,{children:'Login Xml mencari kolom dengan tanggal Waktu dan zona waktu tertentu (SitemapZulu: dari unit waktu berakhir di \'Z\' atau nama kolom atau definisi atribut yang mencakup "gmt" atau "utc", atau lokal: dari "local" dalam nama kolom atau definisi atribut) Sitemap Juga dapat diterima adalah file dengan kolom tanggal tetapi tidak ada kolom waktu. Juga dapat diterima adalah file tanpa informasi tanggal atau waktu.'}),"\n",(0,t.jsx)(n.p,{children:'Login Xml memperlakukan semua "lokal" kali seperti berada dari zona waktu yang dapat Anda tentukan untuk batch file tertentu, misalnya, untuk SBC LTER, gunakan US/Pasifik. Informasi ini kadang-kadang dalam komentar, tetapi tidak dalam bentuk yang mudah untuk program komputer untuk mengetahui.'}),"\n",(0,t.jsx)(n.p,{children:'File yang tidak memenuhi kriteria ini ditolak dengan pesan "NO GOOD DATE (Sitemap) Login Masalah umum adalah:'}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Ada kolom dengan tanggal dan kolom dengan waktu, tetapi tidak tanggal Kolom waktu."}),"\n",(0,t.jsx)(n.li,{children:"Ada unit waktu, tetapi zona waktu tidak ditentukan."}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:['Komentar lain:\r\nJika ada tanggal yang baik + waktu dengan kolom zona waktu, kolom itu akan dinamakan"time"SitemapERDDAPSitemapERDDAP\u2122memerlukan data kolom waktu dapat dimengerti / tidak dapat dikonversikanZulu/UTC/GMT tanggal zona waktu.\\[Keyakinan saya adalah: menggunakan waktu lokal dan format tanggal / waktu yang berbeda (2-digit tahun! mm/dd/yy vs dd/mm/yy) dalam file data memaksa pengguna akhir untuk melakukan konversi yang rumit untukZuluwaktu untuk membandingkan data dari satu dataset dengan data dari yang lain. LoginERDDAP\u2122standardisasi semua data waktu: Untuk waktu string,ERDDAP\u2122selalu menggunakan ISO 8601:2004 (Login) format standar, misalnya, 1985-01-02T00:00Z. Untuk waktu numerik,ERDDAP\u2122selalu menggunakan"seconds since 1970-01-01T00:00:00Z"SitemapERDDAP\u2122selalu menggunakanZulu  (UTC, Bursa) zona waktu untuk menghilangkan kesulitan bekerja dengan zona waktu yang berbeda dan waktu standar versus waktu hemat siang hari. Login Xml mencari kolom dataTable EML dengan tanggal + waktuZuluSitemap Hal ini sulit karena EML tidak menggunakan vocabulary/system resmi (Login',(0,t.jsx)(n.a,{href:"https://www.joda.org/joda-time/apidocs/org/joda/time/format/DateTimeFormat.html",children:"Java/Joda format waktu"}),') untuk menentukan data Format waktu:\r\nJika ada col dengan nilai waktu numerik (LoginMatlabSitemap) LoginZuluLogin (atau hanya tanggal, tanpa kolom waktu) , digunakan sebagai"time"Sitemap\r\nJika ada col dengan data tanggal dan waktu, gunakanZuluzona waktu, digunakan sebagai"time"dan kolom tanggal atau waktu lainnya dihapus.\r\nElse jika col dengan informasi tanggal hanya ditemukan, digunakan sebagai"time"Login (tanpa zona waktu) Sitemap\r\nJika ada kolom data dan kolom waktu dan tidak ada tanggal gabungan Kolom waktu, dataset REJECTED \u2014 tetapi dataset dapat dibuat dapat digunakan dengan menambahkan tanggal gabungan Kolom waktu (SitemapZuluzona waktu) ke datafile dan menambahkan deskripsinya dalam file EML.\r\nEXAMPLE dari SBC LTER:',(0,t.jsx)(n.a,{href:"https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/",children:" https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/ "}),"dataTable #2."]}),"\n",(0,t.jsxs)(n.p,{children:["Ini akan bagus jika EML / LTER diperlukan inklusi kolom denganZulu  (UTC, Bursa) waktu zona kali dalam semua file data sumber yang relevan. Yang terbaik adalah menambahkan sistem ke EML untuk menentukantime\\_zoneatribut menggunakan nama standar (dari",(0,t.jsx)(n.a,{href:"https://en.wikipedia.org/wiki/List_of_tz_database_time_zones",children:"kolom TZ"}),") Sitemap"]}),"\n",(0,t.jsx)(n.h3,{id:"missing-missing_value",children:"Loginmissing\\_value"}),"\n",(0,t.jsx)(n.p,{children:"Beberapa kolom menggunakanmissing\\_valuetapi jangan daftar di metadata EML, misalnya, presipitasi\\_mm di knb-lter-sbc.5011 menggunakan -999. Jika tidak ada nilai yang hilang ditentukan dalam EML, GenerateDatasetsXml secara otomatis mencari nilai yang hilang umum (g., 99, -99, 999, -999, 9999, -9999, dll) dan menciptakan metadata. Tapi yang lain hilangmissing\\_valuetidak tertangkap. Meme it"}),"\n",(0,t.jsx)(n.p,{children:"Akan bagus jika checker EML mencari hilangmissing\\_valueSitemap"}),"\n",(0,t.jsx)(n.h3,{id:"small-problems",children:"Masalah kecil"}),"\n",(0,t.jsx)(n.p,{children:"Ada banyak masalah kecil (ejaan, tanda baca) yang mungkin hanya akan ditemukan oleh pemeriksaan manusia setiap dataset."}),"\n",(0,t.jsx)(n.p,{children:"Akan bagus jika pemeriksaan EML mencari kesalahan ejaan dan tata bahasa. Ini adalah masalah yang sulit karena kata-kata dalam ilmu sering ditandai dengan pengecekan mantra. Pengeditan manusia mungkin diperlukan."}),"\n",(0,t.jsx)(n.h3,{id:"invalid-unicode-characters",children:"Karakter Unicode yang tidak valid"}),"\n",(0,t.jsx)(n.p,{children:"Beberapa konten EML mengandung karakter Unicode yang tidak valid. Ini mungkin karakter dari charset Windows yang tidak disalin dan disisipkan ke file UTF-8 EML. Login Xml menghangatkan karakter ini untuk misalnya,\\[#128\\]sehingga mereka mudah untuk mencari di Meme itERDDAP\u2122 datasets.xmlLogin"}),"\n",(0,t.jsx)(n.p,{children:"Ini akan bagus jika checker EML diperiksa untuk ini. Mudah ditemukan dan mudah diperbaiki."}),"\n",(0,t.jsx)(n.h3,{id:"different-column-unitsdifferentcolumnunits",children:"Unit Kolom yang Berbeda] (Sitemap)"}),"\n",(0,t.jsx)(n.p,{children:'Beberapa data EMLTables mendefinisikan kolom yang tidak konsisten dengan kolom dalam file data, terutama karena mereka memiliki unit yang berbeda. Login Xml bendera ini. Hal ini hingga operator untuk memutuskan apakah perbedaannya baik atau tidak. Ini muncul dalam file kegagalan sebagai data "SKIPPED". EXAMPLE di file kegagalan SBC LTER:'}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"      < SKIPPED (USUALLY BECAUSE THE COLUMN NAMES IN THE DATAFILE ARE IN\r\n      A DIFFERENT ORDER OR HAVE DIFFERENT UNITS THAN IN THE EML file):\r\n       datasetID=knb\\\\_lter\\\\_sbc\\\\_3\\\\_t1\r\n      dataFile=SBCFC\\\\_Precip\\\\_Daily\\\\_active\\\\_logger.csv\r\n      The data file and EML file have different column names.\r\n      ERDDAP\u2122 would like to equate these pairs of names:\r\n        Daily\\\\_Precipitation\\\\_Total\\\\_mm = Daily\\\\_Precipitation\\\\_Total\\\\_inch\r\n        Flag\\\\_Daily\\\\_Precipitation\\\\_Total\\\\_mm = Flag\\\\_Daily\\\\_Precipitation\\\\_Total\\\\_inch\r\n      --\x3e\n"})}),"\n",(0,t.jsx)(n.p,{children:"Ini akan bagus jika pemeriksaan EML diperiksa bahwa unit cocok. Sayangnya, ini mungkin tidak mungkin untuk menangkap dan kemudian tidak mungkin untuk menyelesaikan tanpa menghubungi pembuat dataset, mengingat bahwa file sumber tidak termasuk unit. Perbedaan misalnya di atas hanya terlihat karena unit dimasukkan dalam nama kolom sumber dan nama kolom EML. Berapa banyak dataTables lain memiliki masalah ini tetapi tidak terdeteksi?"}),"\n",(0,t.jsx)(n.h3,{id:"different-versions-of-eml",children:"Versi yang berbeda dari EML"}),"\n",(0,t.jsx)(n.p,{children:"Login Xml dirancang untuk bekerja dengan EML 2.1.1. Versi lain dari EML akan bekerja sejauh yang mereka cocok 2.1.1 atau GenerateDatasetsXml memiliki kode khusus untuk menanganinya. Ini adalah masalah yang langka. Ketika terjadi, solusinya adalah untuk mengonversi file Anda ke EML 2.1.1, atau mengirim file EML keerd.data at noaa.gov, jadi saya bisa melakukan perubahan GenerateDatasets Xml untuk menangani perbedaan."}),"\n",(0,t.jsx)(n.p,{children:"Bob menambahkan dukungan untuk file EML untuk GenerateDatasets Xml di 2016 dengan harapan bahwa akan ada beberapa uptake di komunitas EML. Pada tahun 2020, belum terjadi. Bob senang menambahkan dukungan untuk versi terbaru dari EML, tetapi hanya jika fitur baru akan benar-benar digunakan. Sitemaperd.data at noaa.govjika Anda ingin mendukung versi terbaru dari EML dan akan benar-benar menggunakan fitur ini."}),"\n",(0,t.jsx)(n.h3,{id:"trouble-parsing-the-data-file",children:"Trouble Membuat File Data"}),"\n",(0,t.jsxs)(n.p,{children:['Rarely, dataTable dapat ditolak dengan kesalahan "jumlah item yang tidak terinfeksi di baris #120 (diamati=52, diharapkan=50) Sitemap Pesan kesalahan seperti ini berarti bahwa garis dalam file data memiliki sejumlah nilai yang berbeda dari garis lain. Ini mungkin masalah dalam Meme itERDDAP\u2122  (e.g., tidak membuat file dengan benar) atau dalam file. EXAMPLE dari SBC LTER:\r\n',(0,t.jsx)(n.a,{href:"https://sbclter.msi.ucsb.edu/external/InformationManagement/eml_2018_erddap/",children:" https://sbclter.msi.ucsb.edu/external/InformationManagement/eml\\_2018\\_erddap/ "}),"dataTable #3, lihat datafile=LTER\\_monthly\\_bottledata\\_registered\\_stations\\_20140429.txt"]})]})}function k(a={}){const{wrapper:n}={...(0,d.R)(),...a.components};return n?(0,t.jsx)(n,{...a,children:(0,t.jsx)(u,{...a})}):u(a)}}}]);