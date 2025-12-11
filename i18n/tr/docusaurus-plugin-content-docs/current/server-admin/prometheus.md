---
sidebar_position: 9
---
# Prometheus

 [Prometheus metrics](https://prometheus.io/) /erddap /metriklerde mevcuttur. J VM çekirdeği metrikleri 225 yılında eklendi ERDDAP™ 2.26 sürümde ölçümler eklendi. metrikleri kullanmak istiyorsanız en azından 2.26 sürümde olduğundan emin olun. etkinleştirilmeleri için varsayılan olarak, onları eklenerek devre dışı bırakabilirsin
```xml
<usePrometheusMetrics>false</usePrometheusMetrics>
```
Kurulumunuz için.xml.

Bu ölçümler makine okunabilir olmak için tasarlanmıştır. metrik sayfayı manuel olarak kontrol edebilirsiniz, çünkü derinlikte bir Prometheus sunucusu kullanmak önerilir. Bir Prometheus sunucusu, derinlik izlemede daha fazla olanak sağlayan tarihi ölçümler depolayacaktır (Geçmiş değerlerden gelen fiyatlar ve değişiklikler gibi) Ve ayrıca genellikle bir Grafana sunucusu ile çalışır. Yöneticilerin sunucularını izlemeye başlamak için yararlı bulabileceği bazı önceden inşa edilmiş panolar sunuyoruz.

## Run Prometheus server

İzleme yığını koşmak için en iyi belge (Prometheus + Grafana) Prometheus'ta [readme](https://github.com/ERDDAP/erddap/blob/main/docker/prometheus/README.md) .

##  ERDDAP™ metrics

### JVM

 ERDDAP™ Yarayabileceğiniz bir dizi metrik ihracat (Başlangıç ERDDAP™ 2.25) . JVM'nin sağlığının genel izlemesi için Prometheus müşterisi tarafından toplanan ölçümleri kullanırız. Bu, çöp koleksiyonu, hafıza kullanımı, iplikler ve daha fazlası hakkında veriler içerir. Daha fazla bilgi için bakınız [Prometheus Java Müşteri JVM belgeleri](https://prometheus.github.io/client_java/instrumentation/jvm/) .

###  ERDDAP™ Belirli spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik spesifik özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel özel

Ayrıca bir dizi ihracat yapıyoruz ERDDAP™ Özel metrikler (Başlangıç ERDDAP™ 2.26) . Koda kazmak istiyorsanız, toplanan ölçümleri bulabilirsiniz [Metrikler.java](https://github.com/ERDDAP/erddap/blob/main/WEB-INF/classes/gov/noaa/pfel/erddap/util/Metrics.java) .

####  ERDDAP _build_info

Bu, inşa bilgileri için ERDDAP™ sunucu. Versiyonu içerir (Büyük.minor) , Version_full (Büyük.minor.patch) , ve dağıtım_info (Sunucunun nasıl dağıtıldığını göstermek için kullanılır, tıpkı ‘Docker ‘ ‘ ‘) .

#### feature_flags

Bu, mevcut özel bayrakların durumunu gösteren bir bilgi metriktir. Çoğu boolean yapılandırma seçeneği özel bayraklar olarak kabul edilir.

#### Bu Image Image Image

Bu, grafik hızlandırmanın mevcut olup olmadığını gösteren bir bilgi metriktir.

####  http _request_duration_seconds

Bu, saniyeler içinde istek yanıt süreleri histogramıdır. Etiketler istek_type (Örneğin griddap, tabledap dosyaları, wms) , dataset_id (Eğer uygulanabilirse, aksi takdirde istek tipini tekrarlar) , file_type (Talep Formu E.g. '.html', '.csv', '.iso19115 ‘ ‘ ‘) , lang_code (İstek için dil veya varsayılan olarak varsayılan) , durum_code ( http İstek e.g 200, 302, 404) .

Bu, sunucunun popüler veri setlerini belirlemek için veri kümesi id tarafından istekleri takip etmek için kullanılabilir. Ayrıca sunucunuzda yavaş olan özel istekler olup olmadığını tanımlamaya yardımcı olabilir.

#### touch_thread_duration_sans

Dokunuşu görevi süresine dokunma histogramı. Başarıyla etiketleniyorlar (Doğru /false) .

#### Görev_thread_duration_sans

Görev iplik sürelerinin histogramı. Başarıyla etiketleniyorlar (Doğru /false) Ve görev_type (Intetger) .

#### Yük_datasets_duration_sans

Veri set görevleri için süresi bir histogram. Onlar büyük ölçüde etiketleniyorlar (Doğru /false) .

#### e-posta_the_duration_sans

E-posta iplik görev süreleri histogramı. Başarıyla etiketleniyorlar (Doğru /false) .

#### e-posta_count_ dağıtım

Görev başına e-postaların histogramı.

#### dataset_count

Veri setlerinin bir göstergesi, her yük datasets çağrısından sonra ayarlanmıştır. Bu kategori ile etiketlendi (grid, masa) .

#### dataset_failed_load_count

Her yükleme datasets çağrısından sonra yükleme başarısız olan veri setlerinin bir göstergesi.

#### Kazım_requests_ total

Ölmüş olan istekler hariç. sunucu, sunucunun hafızada düşük olduğuna inandığında bir istek üzerine dökecektir. (RAM RAM) Ve istek sorunlara neden olacaktır. Bu, talebin uygulanması sırasında düşük RAM veya disk alanı nedeniyle bu hatayı gerektirmez.

#### tehlikeli_memory_email

Çoğu zaman sunucu hafızanın tehlikeli derecede düşük olduğu yöneticiye bir e-posta göndermeye çalışır.

#### tehlikeli_memory_failures_total

Hafızadan kaçan makine nedeniyle başarısız olan istekler. Çoğu zaman bu, makine çok pahalı bir istek alıyor veya bireysel istek olağanüstü büyük oldu.

#### topo_request_ total

Topo verileri için istekler. Bu etiketli önbellek (Önbellek / Not_cached) .

#### Boundary Counters

Sınırlar için taleplerin bir koleksiyonu da var:

 - Ulusal_boundaries_request_total
 - state_boundaries_request_ total
 - River_boundaries_request_ total
 - gshhs_request_ total

Bunlar statü ile etiketlendi (Coarse, başarı, tosed) .
