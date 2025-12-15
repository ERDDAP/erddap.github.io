---
title: "ERDDAP™ Documentation"
---
## Son Son Son Son Son Son Son Son ERDDAP™ sürüm sürüm sürüm sürüm sürüm sürüm sürüm sürüm sürüm versiyonu{#latest-erddap-version} 

2.29.0, bakınız [Değişiklikler](/changes#version-2290) ve [indir](https://github.com/ERDDAP/erddap/releases/tag/v2.29.0) .

##  ERDDAP™ Bilgi Bilgileri{#erddap-information} 

 ERDDAP™ Kullanıcıların alt setlerini indirmek için basit, tutarlı bir yol veren bilimsel bir veri sunucusudur
Ortak dosya formatlarında şebeke ve tabular bilimsel veri setleri ve grafikler ve haritalar oluşturun.
 ERDDAP™ Free ve Open Source (Apache ve Apache-like)   Java Servlet from NOAA   NMFS   SWFSC Çevre Araştırma Bölümü ( ERD ) .

* Görmek / kullanmak ERDDAP™ Kurulum: [https://coastwatch.pfeg.noaa.gov/erddap/index.html](https://coastwatch.pfeg.noaa.gov/erddap/index.html) 
* Bir yükleme okuma ile başlamak için [Dağıtım yükleme rehberi](/docs/server-admin/deploy-install) .
* Koda katkıda bulunmak için, kodu görmek [Programr's guide](/docs/contributing/programmer-guide) .


Aşağıda soru sormak ve nasıl katkıda bulunmak için ilgili bağlantılar bulacaksınız.
* Tartışmalar ve sorular sor [https://groups.google.com/g/erddap](https://groups.google.com/g/erddap) veya [https://github.com/erddap/erddap/discussions](https://github.com/erddap/erddap/discussions) 
* İnceleme ve sorunları rapor etmek [https://github.com/erddap/erddap/issues](https://github.com/erddap/erddap/issues) 
* Özel istekler önermek için, bu rehberliği takip edin: [ ERDDAP Tartışmalar #93 (Yorum) ](https://github.com/ERDDAP/erddap/discussions/93#discussion-4920427) 


## Birden çok arama ERDDAP™ s
Birden fazla aramanın iki yolu vardır ERDDAP™ Datasets için s: [Birden çok arama ERDDAP™ s](/SearchMultipleERDDAPs.html) ve [ ERDDAP™ Dataset Discovery](http://erddap.com/) .


## Set Up Your Own ERDDAP™  {#set-up-your-own-erddap} 

 ERDDAP™ Bir şeydir [Ücretsiz ve Açık Kaynak](https://en.wikipedia.org/wiki/Free_and_open-source_software) Tüm - Java   (servlet) , bir web uygulama sunucusunda çalışan web uygulaması (Örneğin, Tomcat (önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen önerilen) Ya da Jetty (işe yarıyor ama onu desteklemiyoruz) ) . Bu web sayfası çoğunlukla insanlar içindir (" " "" ERDDAP™ Yöneticiler") Kim kendilerini kurmak istiyor ERDDAP™ Kendi web sitesinde yükleme.

Bir yükleme okuma ile başlamak için [Dağıtım yükleme rehberi](/docs/server-admin/deploy-install) .

### Neden kullanım ERDDAP™ Verilerinizi dağıtmak için?{#why-use-erddap-to-distribute-your-data} 

Çünkü küçük çaba kurmak için ERDDAP™ Birçok fayda getirir.

* Verilerinizi dağıtmak için zaten bir web hizmetiniz varsa,
Oluşturabilirsiniz ERDDAP™ Mevcut hizmet aracılığıyla verilerinize erişmek için.
Ya da, kurulabilirsin ERDDAP™ Verilere doğrudan yerel dosyalardan erişmek için.
* Her veri kümesi için sadece XML'in küçük bir chunk yazmak zorundasınız ERDDAP™ Veri kümesine nasıl erişilir.
* Bir kez sahip olduktan sonra ERDDAP™ verilerinize hizmet etmek, son kullanıcılar şunları yapabilir:
    * Verileri çeşitli şekillerde talep edin ( DAP , WMS Ve gelecekte daha fazlası) .
    * Çeşitli dosya formatlarında veri yanıtını alın. (Bu muhtemelen en büyük sebep&#33;) 
    * Grafikler ve haritalar yapın. (Herkes güzel resimleri seviyor.) 
    * Diğer kullanışlı ve ilginç şeyler üst üst kısmında ERDDAP 's web hizmetleri - görmek [ Awesome ERDDAP TM TM](https://github.com/IrishMarineInstitute/awesome-erddap) Harika bir liste ERDDAP - ilgili projeler.

Yapabilirsiniz [özelleştirme özelleştirme özelleştirme özelleştirme özelleştirme özelleştirme özelleştirme](/docs/server-admin/deploy-install#customize) Senin ERDDAP “Bu yüzden görünüş ERDDAP™ Organizasyonunuzu yansıtır ve web sitenizin geri kalanı ile uyumludur.

## Kurulum prosedürü zor mu? Bunu yapabilir miyim?{#is-the-installation-procedure-hard-can-i-do-it} 

İlk yükleme biraz zaman alır, ancak çok zor değil. Bunu yapabilirsiniz. Eğer sıkıştıysanız, e-postada erd dot data at noaa dot gov . Size yardım edeceğim.
Ya da, katılabilirsin [ ERDDAP™ Google Group / Mailing Listesi](https://groups.google.com/g/erddap) Sorunuzu orada yayınlayın.

## Kim kullanır ERDDAP™  {#who-uses-erddap} 

 ERDDAP™ En az 17 ülkede yaklaşık 100 kuruluş tarafından kuruldu.

 (Avustralya, Belçika, Kanada, Çin, Fransa, Hindistan, İrlanda, İtalya, Yeni Zelanda, Rusya, Güney Afrika, İspanya, Sri Lanka, İsveç, Tayland, İngiltere, ABD) Ayrıca:

*    [APDRC](https://apdrc.soest.hawaii.edu/erddap/index.html)   (Asya-Pacific Data-Research Center, International Pacific Research Center) Hawaii Üniversitesi'nde (UHH)  
*    [BCO-DMO, WHOI](https://erddap.bco-dmo.org/erddap/index.html)   (Biyolojik ve Kimyasal Okyanusografi Data Management Office at Woods Hole Oceanografik Kurumsal Kurumsal Kurumlar)  
*    [CanWIN ERDDAP™ ](https://canwinerddap.ad.umanitoba.ca/erddap/index.html)   (Kanada Sushed Information Network) Dünya Gözlem Bilimi Merkezi'nde (CEOS) , University of Manitoba
*    [CDIP](https://erddap.cdip.ucsd.edu/erddap/index.html)   (Coastal Data Information Program at UCSD)  
*    [CNR-ISP](https://data.iadc.cnr.it/erddap/index.html)   (İtalya Ulusal Araştırma Konseyi, Polar Bilimleri Enstitüsü)  
* CSIRO ve IMOS (Avustralya'nın Commonwealth Bilimsel ve Endüstriyel Araştırma Örgütü ve Entegre Deniz Observing System) 
*    [DIVER ( NOAA VEYA) ](https://pub-data.diver.orr.noaa.gov/erddap/index.html)   ( NOAA Cevap ve Restorasyon Ofisi)  
*    [EMODnet Fizik](https://erddap.emodnet-physics.eu/erddap/index.html)   (Avrupa Deniz Gözlem ve Veri Ağı – Fizik)  
*    [GoMRI](https://erddap.griidc.org/erddap/index.html)   (Gulf of Mexico Research Initiative)  
*    [Hakai Enstitüsü](https://catalogue.hakai.org/erddap/index.html)   (The Hakai Institute on the Central Coast of British Columbia, Kanada) 
*    [Yüksek Okul Teknolojisi Hizmetleri](https://myhsts.org) Bu, öğrenciler ve yetişkinler için kodlama ve teknoloji eğitimi sunar
*    [ICHEC](https://erddap.ichec.ie/erddap/index.html)   (High-Bitiş için İrlandalı Merkez) 
*    [I I I I I I I I I I I I I I I I I I I I I I NCO IS IS IS IS](https://erddap.incois.gov.in/erddap/index.html)   (Ocean Information Services için Hint Ulusal Merkezi)  
* IRD (Institut de Recherche le Dé Developmentpement, Fransa)   
CNRS (Merkezi National de la Recherche Scientifique, Fransa)   
UPMC (Université Pierre et Marie CURIE, Paris, Fransa Fransa)   
UCAD (Université Cheikh Anta Diop de Dakar, Sénégal)   
UGB (Université Gaston – Berger Saint-Louis du Sénégal)   
UFHB (Université Félix HOUPHOUHOT-BOIGNY, Abidjan, Côte d'Ivoire)   
IPSL (Institut Pierre Simon Laplace des science de l'environnement, Paris, Fransa Fransa)   
LMI ECLAIRS (Workatoire Mixte International «Etude du Climat en Afrique de l'Ouest et de voice Interactions avec l'Environnement Régional, et appui aux services climateiques») 
* JRC (Avrupa Komisyonu - Ortak Araştırma Merkezi, Avrupa Birliği) 
*    [Deniz Enstitüsü](https://erddap.marine.ie/erddap/index.html)   (İrlanda İrlanda İrlanda)  
* Marine Instruments S.A. (İspanya İspanya İspanya) 
* NCI (Avustralya Ulusal Computational Altyapısı) 
*    [ NOAA CoastWatch](https://coastwatch.noaa.gov/erddap/index.html)   (merkezi merkezi merkezi merkezi merkezi merkezi)  
*    [ NOAA CoastWatch CGOM](https://cwcgom.aoml.noaa.gov/erddap/index.html)   (Karayipler / Meksika'nın Mezarları)  
*    [ NOAA SahilWatch GLERL](https://coastwatch.glerl.noaa.gov/erddap/index.html)   (Büyük Göller Node)  
*    [ NOAA CoastWatch West Coast](https://coastwatch.pfeg.noaa.gov/erddap/index.html) Hangi ile ortaktır ve birlikte çalışır
     [ NOAA   ERD ](https://coastwatch.pfeg.noaa.gov/erddap/index.html)   (Çevre Araştırma Bölümü SWFSC Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of Of NMFS ) 
*    [ NOAA IOOS Sensörleri](https://erddap.sensors.ioos.us/erddap/index.html)   (Entegre Ocean Observing System)  
*    [ NOAA IOOS Ce NCO OS OS OS](https://erddap.axiomdatascience.com/erddap/index.html)   (Orta ve Kuzey Kaliforniya Ocean Observing System, Axiom Data Science tarafından yönetilen)  
*    [ NOAA IOOS GCOOS Atmospheric and Oceanographic Data: Observing System](https://erddap.gcoos.org/erddap/index.html)   
     [ NOAA IOOS GCOOS Atmospheric and Oceanographic Data: Historical Collections](https://gcoos5.geos.tamu.edu/erddap/index.html)   
     [ NOAA IOOS GCOOS Biyoloji ve Socioeconomics](https://gcoos4.tamu.edu/erddap/index.html)   (Gulf Coast Ocean Observing System) 
*    [ NOAA IOOS NERACOOS](http://www.neracoos.org/erddap/index.html)   (Kuzey Doğu Bölge Sahil ve Okyanus Observing Sistemleri Derneği)  
*    [ NOAA IOOS NGDAC](https://data.ioos.us/gliders/erddap/index.html)   (Ulusal Glider Data Assembly Center)  
*    NOAA IOOS NANOOS (Güney Networked Ocean Observing Systems) 
*    [ NOAA IOOS PacIOOS](https://pae-paha.pacioos.hawaii.edu/erddap/index.html)   (Pasifik Adaları Ocean Observing System) Hawaii Üniversitesi'nde (UHH)  
*    NOAA IOOS SCCOOS (South California Coastal Ocean Observing System) 
*    [ NOAA IOOS SECOORA](https://erddap.secoora.org/erddap/index.html)   (Güneydoğu Sahil Okyanusu Bölgesel Birliği Korumak)  
*    [ NOAA NCEI](https://www.ncei.noaa.gov/erddap/index.html)   (Çevre Bilgileri için Ulusal Merkezler)    
*    NOAA NGDC STP (Ulusal Jeofizik Data Center, Solar - Terrestrial Physics) 
*    NOAA   NMFS NEFSC (Kuzeydoğu Balıkçılık Bilim Merkezi) 
*    [ NOAA NOS CO-OPS](https://opendap.co-ops.nos.noaa.gov/erddap/index.html)   (Operasyonel Oceanografik Ürünler ve Hizmetler Merkezi)  
*    [ NOAA OSMC](http://osmc.noaa.gov/erddap/index.html)   (Observing System Watch Center)  
*    [ NOAA PIFSC](https://oceanwatch.pifsc.noaa.gov/erddap/index.html)   (Pasifik Adaları Balıkçılık Bilimi Merkezi)  
*    [ NOAA PMEL](https://data.pmel.noaa.gov/pmel/erddap/index.html) 
*    [ NOAA PolarWatch](https://polarwatch.noaa.gov/erddap/index.html) 
*    [ NOAA UAF](https://upwell.pfeg.noaa.gov/erddap/index.html)   (Birleşik Access Framework Framework)  
*    [Ocean Networks Kanada](http://dap.onc.uvic.ca/erddap/index.html)  
*    [Ocean Takip Ağı](https://members.oceantrack.org/erddap/index.html)  
*    [OOI / All Data](https://erddap-goldcopy.dataexplorer.oceanobservatories.org/erddap/index.html)   (Ocean Observatories Initiative)   
OOI / Uncabled Data
* Princeton, Hidrometeoroloji Araştırma Grubu
* R.Tech Engineering, Fransa
*    [Rutgers University, Marine ve Coastal Sciences Bölüm](https://tds.marine.rutgers.edu/erddap/index.html)   
* San Francisco Estuary Institute
*    [Scripps Oceanography Enstitüsü, Polywater Gliders](https://spraydata.ucsd.edu/erddap/index.html)  
*    [Akıllı Atlantik](https://www.smartatlantic.ca/erddap/index.html) Memorial Newfoundland
* Güney Afrika Çevre Gözlem Ağı
* Spycam Teknolojileri Teknolojisi
* Stanford Üniversitesi, Hopkins Marine Station
*    [UNESCO IODE](https://erddap.oa.iode.org/erddap/index.html)   (Uluslararası Oceanografik ve Bilgi Data Exchange)  
*    [British Columbia Üniversitesi, Earth, Ocean & Atmospheric Bilimleri Bölümü](https://salishsea.eos.ubc.ca/erddap/index.html)  
*    [California Üniversitesi Davis, Bodega Marine Laboratory](http://bmlsc.ucdavis.edu:8080/erddap/index.html)  
*    [University of Delaware, Uydu Reggle Station](https://basin.ceoe.udel.edu/erddap/index.html)  
* University of Washington, Applied Physics Laboratory
*    [USGS CMGP](https://geoport.usgs.esipfed.org/erddap/index.html)   (Sahil ve Deniz Jeoloji Programı)  
*    [VOTO](https://erddap.observations.voiceoftheocean.org/erddap/index.html)   (The Ocean'ın sesi, İsveç)  

Bu, sadece bazı organizasyonların bir listesidir. ERDDAP™ Bazı bireysel veya bazı grup tarafından kuruldu. Bireysel, grubun veya organizasyonun tavsiye ettiği veya onayladığı anlamına gelmez. ERDDAP .

###  ERDDAP™ içeride tavsiye edilir NOAA ve CNRS{#erddap-is-recommended-within-noaa-and-cnrs} 
 [ NOAA 'In Data Access Procedural Yönerge](https://www.ngdc.noaa.gov/wiki/index.php/Data_Access_Technical_Recommendations#Software_implementations) içerir içerir dahil içerir ERDDAP™ Listesinde önerilen veri sunucularının gruplar tarafından kullanılması için NOAA . ERDDAP™ 4.2.3 bölümünde açıkça bahsedilir.
[Guide de bonnes pratiques real la gestion des données de la recherche
 (Araştırma Data Management En İyi Uygulama Kılavuzları) ] (https://mi-gt-donnees.pages.math.unistra.fr/guide/04-traiter.html#deposer-et-structurer-dans-des-plateformes-de-gestion-de-donnees-locales) Merkez Ulusal de la Recherche Scientifique (CNRS) Fransa'da.

## Slide Shows{#slide-shows} 

İşte bazı PowerPoint kaydırakları ve Bob Simons'ın ilgili yarattığı belgeler ERDDAP .

 **DISCLAIMER: Bu belgelerde ifade edilen içerik ve görüşler Bob Simons'ın kişisel görüşleridir ve hükümetin veya hükümetin herhangi bir konumunu yansıtmaz. National Oceanic and Atmospheric Administration .** 

Four Main Documents:

*    [Ana giriş ERDDAP™   (Versiyon 5) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erddapTalk5.pptx) .
Ayrıca yapabilirsiniz [Bob'un bu videoyu izlemek![YouTube YouTube YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=H541G1XXZrU&t=4) .
*    [A One Page Description of ERDDAP™   (.pdf) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ERDDAP_OnePage.pdf) 
*    [ ERDDAP : Ağır Yükler, Grids, Clusters, Federasyonlar ve Cloud Computing](/docs/server-admin/scaling) 
*    [Bob'un Data Distribution Systems için Kılavuzları](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html) 

Diğer Sunumlar:

*    [2020 EDM: Yeni Özellikler ERDDAP™ v2.10](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapFeatures2.10.pptx) 
*    [2020-05-19 DMIT: Data Ingest](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapDataIngest.pptx)   (Ya da [Bob'un bu videoyu izlemek](https://www.youtube.com/watch?v=9ArYxgwON2k) .) 
*    [2019 IOOS DMAC: Yeni Özellikler ERDDAP™ v2.0](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/Erddapv2Features.pptx) 
*    [2018 2018 2018 Yaz ESIP: Subcept In ERDDAP™ ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapSubset2018.pptx) 
*    [2018 2018 2018 Yaz ESIP: JSON Destek In ERDDAP™ ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsErddapJson2018.pptx) 
*    [2018 EDM: Web Hizmetlerinin Dağıtılmış Sistemi (Faster, Easier, Daha Az Pahalı)   (Ya da neden 4 yıl önce mutlu oldum.) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/10P.04_Simons_DistributedWebServices2018.pptx) 
*    [2018 EDM: ERDDAP™ 2018 yılında](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/7A4_Simons_ErddapSession2018.pptx) 
*    [2018 EDM: Yeni Özellikler ERDDAP™ Görüntü, Audio ve Video Data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/4D4_Simons_ErddapMediaFiles2018.pptx) 
*    [2018 EDM: UAF ve ERDDAP™ Data Integration için Çözümler](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/3D3_Simons_DataIntegration2018.pptx) 
*    [2017 EDM: Hızlı Giriş ERDDAP ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapIntro.pptx) 
*    [2017 EDM ve 2017 IOOS: Yeni veya Küçük Bilinen ERDDAP™ Özellikler Özellikler Özellikler Özellikler Özellikler (Kullanıcılar için) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapUserFeatures2017.pptx) 
*    [2017 EDM ve 2017 IOOS: Yeni veya Küçük Bilinen ERDDAP™ Özellikler Özellikler Özellikler Özellikler Özellikler (Yöneticiler için) ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/ErddapAdminFeatures2017.pptx) 
*    [2017 EDM: EML, KNB ve ERDDAP ](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/eml_knb_erddap.pptx) 
*    [2017 2017 2017 2017 EDM: Veriler kaynaktan son kullanıcıya nasıl ulaşır? Eski Okul Yeni Okula Karşı](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OldSchoolNewSchool.pptx) 
*    [2016 Yaz ESIP: Büyük Resim: PARR, OPeNDAP , ERDDAP™ Ve Veri Dağıtımı](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheBigPicture.pptx) 
*    [2016 EDM: One And Done](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/OneAndDone.pptx) 
*    [2016 Gov API: Next Generation Data Servers](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/NextGeneration.pptx) 
*    [2015 2015 Yaz ESIP: Tabular Aggregation](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularAggregation.pptx) 
*    [2014 EDM: Bob's Do's and Don't for Tabular Data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/SimonsDosDontsTabular.pptx) 
*    [2014 EDM: İdeal Kullanıcı Interface](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TheIdealUserInterface.pptx) 
*    [2014 2014 2014 2014 Yaz ESIP: Tabular Data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TabularData.pptx) 
*    [2013: In-Situ ve Tabular Data Like Gridded Data](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/TablesAndGrids.html) 
*    [2013 EDM: Daha Az Daha Fazla Yapmak](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/DoMoreWithLess.ppt) 
*    [2012 EDM: Data Dağıtım Sistemleri için Kılavuz](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/guidelines3.ppt) 

Diğer İnsanlar Tarafından Sunumlar:

*    [Global Data paylaşımı için bir FAIR tabanlı bir araç![YouTube YouTube YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=kdBTgNEp5TA&ab_channel=GOOSIOC)   
Kevin O'Brien tarafından Global Ocean Observing System (GOOS) Webinar / Gözlem Koordinasyon Grubu (OCG) Series / 1 Kasım 12, 2020.
*    [Kendi Hava Uygulamanızı Yapın NOAA Açık Veri ve Jupyter Defterleri![YouTube YouTube YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=MF-WH01Qw0g)   
Filipe Fernandes ve Rich Signell tarafından SciPy 2018 Temmuz 13, 2018.
*    [OOI kullanarak ERDDAP ![YouTube YouTube YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=tj4M9hodTG0)   
Rich Signell tarafından Şubat 2018.
*    [ESIP Tech Dive: " ERDDAP Lightning Talks"![YouTube YouTube YouTube](/img/youtube.png)](https://youtu.be/2-ydBByYB0M?t=160)   
İlginç Şeyler Hakkında Sekiz 5 Dakika Konuşması İnsanlarla Doing ERDDAP Jenn Sevadjian, Jim Potemra, Conor Delaney, Kevin O'Brien, John Kerfoot, Stephanie Petillo, Charles Carleton ve Eli Hunter 31 Ağustos 2017 tarihinde ESIP Tech Dive olarak sunuldu.
*    [Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using Using ERDDAP™ Access Tabular Data![YouTube YouTube YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=_BwMHRh7CS8)   
Rich Signell tarafından, Ağustos 2015
*    [Test Kullanımı ERDDAP™ Blue Carbon Data için![YouTube YouTube YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=TbOhElC_-qU)   
Rich Signell tarafından, Ağustos 2015
*    [Data From Using Data From ERDDAP™ in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in in NOAA " GNOME Yazılım![YouTube YouTube YouTube](/img/youtube.png)](https://www.youtube.com/watch?v=18xZoXu1USM) .
Bu videoda, Rich Signell okyanus akımlarının tahmin verilerini okyanustan indiriyor ERDDAP™ Okyanusta toksik bir döküntü modellemek için [ NOAA " GNOME Yazılım yazılım yazılımı](https://response.restoration.noaa.gov/oil-and-chemical-spills/oil-spills/response-tools/gnome.html)   (5 dakika içinde&#33;) . (Videoda küçük bir hata: veri setleri ararken, arama terimleri arasında kullanmayın ve kullanmayın. Bu kapalıdır.) Rich Signell tarafından 8 Nisan 2011
