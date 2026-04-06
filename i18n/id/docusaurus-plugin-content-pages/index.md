---
title: "ERDDAP™ Documentation"
---
## Terbaru ERDDAP™ versi{#latest-erddap-version} 

2.30.0, lihat [perubahan dokumentasi](/changes#version-2300) dan [unduh](https://github.com/ERDDAP/erddap/releases/tag/v2.30.0) .

##  ERDDAP™ informasi{#erddap-information} 

 ERDDAP™ adalah sebuah server data ilmiah yang memberikan pengguna cara sederhana, konsisten untuk mengunduh subset dari
gridded dan tabular data ilmiah dalam format berkas umum dan membuat grafik dan peta.
 ERDDAP™ adalah Free and Open Source (Apache dan Apache-seperti)   Java Hamba dari NOAA   NMFS   SWFSC Divisi Penelitian Lingkungan ( ERD ) .

* Untuk melihat / menggunakan ERDDAP™ instalasi: [ https://coastwatch.pfeg.noaa.gov/erddap/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/index.html) 
* Untuk memulai dengan pembacaan instalasi [the outset install guide](/docs/server-admin/deploy-install) .
* Untuk berkontribusi kode melihat [Panduan programmer](/docs/contributing/programmer-guide) .


Di bawah Anda akan menemukan link yang relevan untuk mengajukan pertanyaan dan bagaimana berkontribusi.
* Ulasan percakapan dan mengajukan pertanyaan di [ https://groups.google.com/g/erddap ](https://groups.google.com/g/erddap) atau pada [ https://github.com/erddap/erddap/discussions ](https://github.com/erddap/erddap/discussions) 
* Ulasan dan mengirimkan masalah ke [ https://github.com/erddap/erddap/issues ](https://github.com/erddap/erddap/issues) 
* Untuk mengajukan permintaan fitur, ikuti bimbingan ini: [ ERDDAP Diskusi # 93 (komentar) ](https://github.com/ERDDAP/erddap/discussions/93#discussion-4920427) 


## Cari Beberapa ERDDAP™ s
Ada dua cara untuk mencari banyak ERDDAP™ s untuk dataset: [Cari Beberapa ERDDAP™ s](/SearchMultipleERDDAPs.html) dan [ ERDDAP™ Dataset Discovery](http://erddap.com/) .


## Set Up Your Own ERDDAP™  {#set-up-your-own-erddap} 

 ERDDAP™ adalah [Sumber Terbuka dan Bebas](https://en.wikipedia.org/wiki/Free_and_open-source_software) , semua- Java   (serlet) , aplikasi web yang berjalan dalam server aplikasi web (misalnya, Tomcat (disarankan) , atau Jetty (Ini berhasil, tapi kami tidak mendukungnya) ) . Halaman web ini sebagian besar untuk orang (" ERDDAP™ administrator ") yang ingin mengatur sendiri ERDDAP™ instalasi di website mereka sendiri.

Untuk memulai dengan pembacaan instalasi [the outset install guide](/docs/server-admin/deploy-install) .

### Mengapa menggunakan ERDDAP™ untuk mendistribusikan datamu?{#why-use-erddap-to-distribute-your-data} 

Karena usaha kecil untuk mengatur ERDDAP™ membawa banyak keuntungan.

* Jika Anda sudah memiliki layanan web untuk mendistribusikan data Anda,
Anda dapat mengatur ERDDAP™ untuk mengakses data Anda melalui layanan yang ada.
Atau, Anda dapat mengatur ERDDAP™ untuk mengakses data Anda langsung dari berkas lokal.
* Untuk setiap data, Anda hanya perlu menulis sepotong kecil XML untuk memberitahu ERDDAP™ bagaimana mengakses data.
* Setelah Anda memiliki ERDDAP™ melayani data Anda, akhir pengguna dapat:
    * Meminta data dalam berbagai cara ( DAP , WMS , dan lebih di masa depan) .
    * Dapatkan balasan data dalam berbagai format berkas. (Itu mungkin alasan terbesar&#33;) 
    * Membuat grafik dan peta. (Semua orang suka gambar cantik.) 
    * Bangun hal-hal berguna dan menarik lainnya di atas ERDDAP layanan web - melihat [ Awesome ERDDAP ♪](https://github.com/IrishMarineInstitute/awesome-erddap) daftar mengagumkan ERDDAP - Proyek terkait.

Anda dapat [disesuaikan](/docs/server-admin/deploy-install#customize) Anda ERDDAP penampilan jadi ERDDAP™ mencerminkan organisasi Anda dan cocok dengan seluruh website Anda.

## Apakah prosedur instalasi sulit? Dapatkah saya melakukannya?{#is-the-installation-procedure-hard-can-i-do-it} 

Instalasi awal butuh waktu, tapi tidak terlalu sulit. Kau bisa melakukannya. Jika Anda terjebak, email saya di erd dot data at noaa dot gov . Aku akan membantumu.
Atau, Anda dapat bergabung dengan [ ERDDAP™ Daftar Grup Google / Mailing](https://groups.google.com/g/erddap) dan posting pertanyaan Anda di sana.

## Siapa Uses ERDDAP™  {#who-uses-erddap} 

 ERDDAP™ telah dipasang oleh sekitar 100 organisasi di setidaknya 17 negara

 (Australia, Belgia, Kanada, Cina, Perancis, India, Irlandia, Italia, Selandia Baru, Rusia, Afrika Selatan, Spanyol, Sri Lanka, Swedia, Thailand, Inggris, Amerika Serikat) , termasuk:

*    [APDRC](https://apdrc.soest.hawaii.edu/erddap/index.html)   (Asia- Pacific Data-Research Center, International Pacific Research Center) di Universitas Hawaii (UH)  
*    [BCO- DMO di wHOI](https://erddap.bco-dmo.org/erddap/index.html)   (Biologi dan Kimia Oceanografi Kantor Manajemen Data di Woods Hole Oceanographic Institusi)  
*    [CanWIN ERDDAP™ ](https://canwinerddap.ad.umanitoba.ca/erddap/index.html)   (Jaringan Informasi Air Terang Kanada) di Pusat Ilmu Pengamatan Bumi (CEOS) , Universitas Manitoba
*    [CDIP](https://erddap.cdip.ucsd.edu/erddap/index.html)   (Program Informasi Data Coastal di UCSD)  
*    [CNR-ISP](https://data.iadc.cnr.it/erddap/index.html)   (Dewan Penelitian Nasional Italia, Institut Ilmu Polar)  
* CSIRO dan IMOS (Australia Commonwealth Scientific and industrial Research Organisation and the Integrated Marine Observing System) 
*    [DIVER ( NOAA ORR) ](https://pub-data.diver.orr.noaa.gov/erddap/index.html)   ( NOAA Kantor Respon dan Restorasi)  
*    [Fisika Emodnet](https://erddap.emodnet-physics.eu/erddap/index.html)   (Pengamatan Laut Eropa dan Jaringan Data -- Fisika)  
*    [GoMRI](https://erddap.griidc.org/erddap/index.html)   (Teluk Mexico Research Initiative)  
*    [Institut Hakai](https://catalogue.hakai.org/erddap/index.html)   (Institut Hakai di Pantai Tengah British Columbia, Kanada) 
*    [Layanan Teknologi SMA](https://myhsts.org) , yang menawarkan coding dan pelatihan teknologi untuk siswa dan orang dewasa
*    [ICHEC](https://erddap.ichec.ie/erddap/index.html)   (Pusat Irlandia untuk High- End Computing) 
*    [Aku... NCO IS](https://erddap.incois.gov.in/erddap/index.html)   (Pusat Nasional India untuk Layanan Informasi Samudera)  
* IRD (Instaut de Recherche pour le Dévelopement, France)   
CNRS (Pusat Nasional de la Recherche Scientifique, Perancis)   
UMPC (Universté Pierre et Marie Curtis, Paris, Perancis)   
UCAD (Universté Cheikh Anta Diop de Dakar, Sénégal)   
UGB (Université Gaston Berger -- Saint--Louis du Sénégal)   
UFHB (Universté Félix HOUPHOUTE T- BOIGNY, Abidjan, Côte d 'Ivoire)   
IPSL (Invitut Pierre Simon Laplace des sciences de l 'envirenment, Paris, Perancis)   
LMI ECLAIRS (Laboratoire Mixte International "Etide du Climat en Afrique de l 'Ouest et de ses Interactions avec l' Environment Régional, et appui aux service climatiques") 
* JRC (Komisi Eropa - Pusat Penelitian Gabungan, Uni Eropa) 
*    [Institut Marinir](https://erddap.marine.ie/erddap/index.html)   (Irlandia)  
* Instrumen Marinir S.A. (Spanyol) 
* NCI (Infrastruktur Komputer Nasional Australia) 
*    [ NOAA CoastWatch](https://coastwatch.noaa.gov/erddap/index.html)   (tengah)  
*    [ NOAA CoastWatch CGOM](https://cwcgom.aoml.noaa.gov/erddap/index.html)   (Karibia / Teluk Meksiko Node)  
*    [ NOAA CoastWatch GLERL](https://coastwatch.glerl.noaa.gov/erddap/index.html)   (Great Lakes Node)  
*    [ NOAA Pantai Barat CoastWatch](https://coastwatch.pfeg.noaa.gov/erddap/index.html) yang co-located dengan dan bekerja dengan
     [ NOAA   ERD ](https://coastwatch.pfeg.noaa.gov/erddap/index.html)   (Divisi Penelitian Lingkungan SWFSC dari NMFS ) 
*    [ NOAA Loos Sensor](https://erddap.sensors.ioos.us/erddap/index.html)   (Sistem Pengamatan Samudera Terpadu)  
*    [ NOAA IOOS Ce NCO OS](https://erddap.axiomdatascience.com/erddap/index.html)   (Sistem Pengamatan Samudera Tengah dan Utara California, dijalankan oleh Ilmu Data Axiom)  
*    [ NOAA IOOS GCOOS Atmospheric and Oceanographic Data: Sistem Pengamatan](https://erddap.gcoos.org/erddap/index.html)   
     [ NOAA IOOS Atmosfer GCOOS dan Data Oceanographic: Koleksi Sejarah](https://gcoos5.geos.tamu.edu/erddap/index.html)   
     [ NOAA IOOS GCOOS Biologi dan Sosioekonomi](https://gcoos4.tamu.edu/erddap/index.html)   (Sistem Pengamatan Laut Teluk) 
*    [ NOAA LOOS NERACOOS](http://www.neracoos.org/erddap/index.html)   (Northeastern Regional Association of Coastal and Ocean Observing Systems)  
*    [ NOAA LOOS NGDAC](https://data.ioos.us/gliders/erddap/index.html)   (Glider Nasional Pusat Majelis Data)  
*    NOAA Tidak&#33; (Northwest Association of Networks Ocean Observing Systems) 
*    [ NOAA LOOS PANGGUS](https://pae-paha.pacioos.hawaii.edu/erddap/index.html)   (Sistem Pengamatan Samudera Kepulauan Pasifik) di Universitas Hawaii (UH)  
*    NOAA LOOS SCCOOS (Southern California Coastal Ocean Mengamati Sistem) 
*    [ NOAA LOOS SECOORA](https://erddap.secoora.org/erddap/index.html)   (Southeast Coastal Ocean Observing Regional Association)  
*    [ NOAA NCEI](https://www.ncei.noaa.gov/erddap/index.html)   (Pusat Nasional untuk Informasi Lingkungan)    
*    NOAA STP NGDC (Geophical Nasional Pusat Data, Solar -- Fisika Bumi) 
*    NOAA   NMFS NEFSC (Pusat Ilmu Perikanan Timur Laut) 
*    [ NOAA NOS CO-OPS](https://opendap.co-ops.nos.noaa.gov/erddap/index.html)   (Pusat untuk Operasional Oceanographic Products and Services)  
*    [ NOAA OSMC](http://osmc.noaa.gov/erddap/index.html)   (Pusat Pemantauan Sistem Pengamatan)  
*    [ NOAA PIFSC](https://oceanwatch.pifsc.noaa.gov/erddap/index.html)   (Pusat Ilmu Perikanan Kepulauan Pasifik)  
*    [ NOAA PMEL](https://data.pmel.noaa.gov/pmel/erddap/index.html) 
*    [ NOAA PolarWatch](https://polarwatch.noaa.gov/erddap/index.html) 
*    [ NOAA UAF](https://upwell.pfeg.noaa.gov/erddap/index.html)   (Framework Akses Terunified)  
*    [Ocean Networks Canada](http://dap.onc.uvic.ca/erddap/index.html)  
*    [Jaringan Pelacakan Lautan](https://members.oceantrack.org/erddap/index.html)  
*    [OOI / Semua Data](https://erddap-goldcopy.dataexplorer.oceanobservatories.org/erddap/index.html)   (Inisiatif Pengamatan Samudera)   
OOI / Data Uncabled
* Princeton, Grup Penelitian Hidrometeorologi
* R.Tech Engineering, Perancis
*    [Universitas Rutgers, Departemen Ilmu Kelautan dan Kelautan](https://tds.marine.rutgers.edu/erddap/index.html)   
* Institut Estuary San Francisco
*    [Scripps Institution of Oceanography, Spray Underwater Gliders](https://spraydata.ucsd.edu/erddap/index.html)  
*    [Smart Atlantic](https://www.smartatlantic.ca/erddap/index.html) Memorial University of Newfoundland
* Jaringan Pengamatan Lingkungan Afrika Selatan
* Technologies Spyglass
* Stanford University, Hopkins Marine Station
*    [UNESCO IODE](https://erddap.oa.iode.org/erddap/index.html)   (International Oceanographic and Information Pertukaran Data)  
*    [University of British Columbia, Earth, Ocean & Atmospheric Departemen Sains](https://salishsea.eos.ubc.ca/erddap/index.html)  
*    [Universitas California di Davis, Laboratorium Laut Bodega](http://bmlsc.ucdavis.edu:8080/erddap/index.html)  
*    [University of Delaware, Stasiun Penerimaan Satelit](https://basin.ceoe.udel.edu/erddap/index.html)  
* Universitas Washington, Laboratorium Fisika Terapan
*    [USGS CMGP](https://geoport.usgs.esipfed.org/erddap/index.html)   (Coastal dan Marine Geology Program)  
*    [VOTO](https://erddap.observations.voiceoftheocean.org/erddap/index.html)   (Suara Samudera, Swedia)  

Ini adalah daftar hanya beberapa organisasi di mana ERDDAP™ telah diinstal oleh beberapa individu atau beberapa kelompok. Ini tidak berarti bahwa individu, kelompok, atau organisasi merekomendasikan atau mendukung ERDDAP .

###  ERDDAP™ disarankan dalam NOAA dan CNRS{#erddap-is-recommended-within-noaa-and-cnrs} 
 [ NOAA 's Data Access Procedural Direktif](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations) termasuk ERDDAP™ dalam daftar server data yang direkomendasikan untuk digunakan oleh grup dalam NOAA . ERDDAP™ dapat disebutkan dalam bagian 4.2.3 dari
[Panduan de bonnes pratiques sur la traffic des données de la recherche
 (Manajemen Data Penelitian Panduan Praktek Terbaik) ] ( https://mi-gt-donnees.pages.math.unistra.fr/guide/04-traiter.html#deposer-et-structurer-dans-des-plateformes-de-gestion-de-donnees-locales ) Dari Pusat Nasional de la Recherche Scientifique (CNRS) di Perancis.

## Slide Tampilkan{#slide-shows} 

Berikut adalah beberapa tampilan slide PowerPoint dan dokumen yang dibuat Bob Simons terkait dengan ERDDAP .

 **DICLAIMER: Isi dan pendapat yang diungkapkan dalam dokumen ini adalah pendapat pribadi Bob Simons dan tidak selalu mencerminkan posisi apapun dari Pemerintah atau National Oceanic and Atmospheric Administration .** 

Empat Dokumen Utama:

*    [Perkenalan utama dengan ERDDAP™   (versi 5) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTalk5.pptx) .
Kau juga bisa. [menonton video Bob memberikan pembicaraan ini![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=H541G1XXZrU&t=4) .
*    [Keterangan Satu Halaman ERDDAP™   (.pdf) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ERDDAP_OnePage.pdf) 
*    [ ERDDAP : Heavy Loads, Grids, Clusters, Federation, and Cloud Computing](/docs/server-admin/scaling) 
*    [Buku Panduan Bob untuk Sistem Distribusi Data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html) 

Presentasi Lain:

*    [2020 EDM: Fitur baru di ERDDAP™ v2.10](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapFeatures2.10.pptx) 
*    [202005-19 DMIT: Data Ingest](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapDataIngest.pptx)   (Atau [menonton video Bob memberikan pembicaraan ini](https://www.youtube.com/watch?v=9ArYxgwON2k) .) 
*    [2019 LOOS DMAC: Fitur baru di ERDDAP™ v2.0](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/Erddapv2Features.pptx) 
*    [2018 Musim panas ESIP: subsetting Masuk ERDDAP™ ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapSubset2018.pptx) 
*    [2018 JSON Dukung Masuk ERDDAP™ ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapJson2018.pptx) 
*    [2018 EDM: Sebuah Sistem Distributed dari Layanan Web (Lebih cepat, lebih mudah, lebih murah.)   (Atau, mengapa aku bahagia 4 tahun yang lalu.) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/10P.04_Simons_DistributedWebServices2018.pptx) 
*    [2018 EDM: ERDDAP™ pada 2018](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/7A4_Simons_ErddapSession2018.pptx) 
*    [2018 EDM: Fitur baru di ERDDAP™ untuk Gambar, Audio, dan Data Video](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/4D4_Simons_ErddapMediaFiles2018.pptx) 
*    [2018 EDM: UAF dan ERDDAP™ Solusi untuk Integrasi Data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/3D3_Simons_DataIntegration2018.pptx) 
*    [2017 EDM: Perkenalan Cepat ke ERDDAP ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapIntro.pptx) 
*    [2017 EDM and 2017 LOOS: Baru atau Sedikit Dikenal ERDDAP™ Fitur (bagi Pengguna) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapUserFeatures2017.pptx) 
*    [2017 EDM and 2017 LOOS: Baru atau Sedikit Dikenal ERDDAP™ Fitur (bagi Administrator) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapAdminFeatures2017.pptx) 
*    [2017 EDM: EML, KNB, dan ERDDAP ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/eml_knb_erddap.pptx) 
*    [2017 EDM: Bagaimana data mendapatkan dari sumber ke pengguna akhir? Old School versus New School](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OldSchoolNewSchool.pptx) 
*    [2016 - The Big Picture: OPeNDAP , ERDDAP™ , dan Distribusi Data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheBigPicture.pptx) 
*    [2016 EDM: Satu Dan Selesai](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OneAndDone.pptx) 
*    [2016 Gov API: Generasi Berikutnya Server Data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/NextGeneration.pptx) 
*    [2015 Agregasi Tabular](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularAggregation.pptx) 
*    [2014 EDM: Bob 's Do and Don' t for Tabular Data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsDosDontsTabular.pptx) 
*    [EDM 2014: Interface Pengguna Ideal](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheIdealUserInterface.pptx) 
*    [2014 Data Tabular](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularData.pptx) 
*    [2013: Jangan Perlakukan Data In- Sidu dan Tabular Seperti Data Gridded](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TablesAndGrids.html) 
*    [2013 EDM: Lakukan Lebih Dengan Kurang](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/DoMoreWithLess.ppt) 
*    [2012 EDM: Panduan untuk Sistem Distribusi Data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/guidelines3.ppt) 

Presentasi Oleh Orang Lain:

*    [Alat berbasis FAIR untuk meningkatkan sharing Data Global![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=kdBTgNEp5TA&ab_channel=GOOSIOC)   
oleh Kevin O 'Brien di Global Ocean Observing System (GOOS) Webinar / Kelompok Koordinasi Pengamatan (OCG) Series / 1, 12 November, 2020.
*    [Membangun App Cuaca Sendiri Anda Menggunakan NOAA Buka Buku Catatan Data dan Jupyter![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=MF-WH01Qw0g)   
oleh Filipe Fernandes dan Rich Signgell di SciPy 2018, 13 Juli 2018.
*    [Menggunakan OOI ERDDAP ![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=tj4M9hodTG0)   
oleh Rich Signgell, Februari 2018.
*    [ESIP Tech Dive: " ERDDAP Lightning Talks "![YouTube](/img/youtube.png)](https://youtu.be/2-ydBByYB0M?t=160)   
Delapan Lima Menit Bicara Tentang Menarik Hal Orang Apakah Melakukan Dengan ERDDAP oleh Jenn Sevadjian, Jim Potemra, Conor Delaney, Kevin O 'Brien, John Kerfoot, Stephanie Petillo, Charles Carleton dan Eli Hunter disajikan sebagai ESIP Tech Dive pada 31 Agustus 2017.
*    [Menggunakan ERDDAP™ ke Akses Data Tabular![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=_BwMHRh7CS8)   
oleh Rich Signgell, Agustus 2015.
*    [Uji Penggunaan ERDDAP™ untuk Blue Carbon Data![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=TbOhElC_-qU)   
oleh Rich Signgell, Agustus 2015.
*    [Menggunakan Data Dari ERDDAP™ in NOAA ' GNOME Perangkat Lunak![YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=18xZoXu1USM) .
Dalam video ini, Rich Signgell download arus laut diperkirakan data dari ERDDAP™ untuk model tumpahan beracun di laut menggunakan [ NOAA ' GNOME perangkat lunak](https://response.restoration.noaa.gov/oil-and-chemical-spills/oil-spills/response-tools/gnome.html)   (dalam 5 menit&#33;) . (Satu kesalahan kecil dalam video: ketika mencari kumpulan data, jangan gunakan AND diantara istilah pencarian. Hal ini implisit.) Oleh Rich Signgell, 8 April 2011.
