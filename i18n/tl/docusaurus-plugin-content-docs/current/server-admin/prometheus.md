---
sidebar_position: 9
---
# Prometheus

[Mga metrikong Prometheus](https://prometheus.io/)ay makukuha sa /erddap/metrics. Ang JVM core metriko ay idinagdag noong 2.25 sa maramiERDDAP™Idinagdag ang mga metriko sa bersyong 2.26. Kung nais mong gamitin ang mga metriko ay tiyakin na ikaw ay nasa kahit papaanong bersyon 2.26. Hindi nila nagawa, maaari mo silang sirain sa pamamagitan ng pagdaragdag
```xml
<usePrometheusMetrics>false</usePrometheusMetrics>
```
sa iyong setup.xml.

Ang mga metrikong ito ay dinisenyo upang mabasa ang makina. Bagaman maaari mong suriin nang manu - mano ang metrics page, sapagkat sa masusing pagsubaybay iminumungkahi na gumamit ng isang Prometheus server. Ang isang Prometheus server ay mag - iimbak ng makasaysayang mga metriko na nagpapangyari sa higit na masusing pagsubaybay (gaya ng bilang at pagbabago mula sa nakaraang mga pamantayan) , at madalas ding pinapatakbo gamit ang isang grafana server. Naglalaan tayo ng mga dashboard na magagamit ng mga admin sa pagsubaybay sa kanilang mga server.

## Pagtakbo sa Prometheus server

Ang pinakamahusay na dokumentasyon para sa pagpapatakbo ng salansan ng pagsubaybay (Prometheus + Gramana) nasa Prometheus[basahin](https://github.com/ERDDAP/erddap/blob/main/docker/prometheus/README.md).

## ERDDAP™metriko

### JVM

ERDDAP™Magluwas ng maraming metriko na maaaring masumpungan mong kapaki - pakinabang (pasimula saERDDAP™2.25) . Para sa pangkalahatang pagsubaybay sa kalusugan ng JVM ginagamit natin ang mga metrikong tinipon ng kliyenteng Prometheus. Kabilang dito ang mga datos tungkol sa pangongolekta ng basura, paggamit ng memorya, mga sinulid, at higit pa. Para sa higit pang impormasyon tingnan ang[PrometheusJavaClient JVM dokuments](https://prometheus.github.io/client_java/instrumentation/jvm/).

### ERDDAP™espesipiko

Iniluluwas din namin ang ilang bansaERDDAP™espesipikong mga metriko (pasimula saERDDAP™2.26) . Kung nais mong saliksikin ang kodigo, masusumpungan mo ang mga metriko na natipon[Mertrics.java](https://github.com/ERDDAP/erddap/blob/main/WEB-INF/classes/gov/noaa/pfel/erddap/util/Metrics.java).

#### ERDDAP_Magtayo ng_info

Ito ang info sa pagtatayo para saERDDAP™server. Kasama rito ang bersyon (Malaki.minor) , bersyon_full (Pangunahin.minor.patch) , at ang paglalagay ng_info (na ginagamit upang ipakita kung paano ginagamit ang server, gaya ng 'Docker ') .

#### tampok na mga_flag

Ito ay isang metric na info na nagpapakita ng kasalukuyang estado ng tampok na mga bandila. Ang karamihan sa mga mapagpipiliang pagsasaayos ng buto ay itinuturing na tampok na mga bandila.

#### Hinango Larawan

Ito ay isang metric na info na nagpapakita kung mayroon bang graphics spark.

#### http_Magtanong_duriation_seconds

Ito ay isang hitogram ng tugong request sa loob ng mga segundo. Ang mga etiketa ay humihiling ng_type (halimbawa ng griddap,tabledap, files, wms) , dataset_id (Kung angkop, ulitin ang uri ng hinihiling) , talaksan_type (anyo ng output para sa kahilingan e.g. '.html', '.csv', '.iso19115 ') , Bang_code (wika para sa kahilingan, o walang laman na string kung default) , kalagayan_code (httpstatus code ng request e.g. 200, 302, 404) .

Ito ay maaaring gamitin upang matunton ang mga kahilingan ng dataset id upang malaman ang mga popular na dataset ng server. Makatutulong din na malaman kung may partikular na mga uri ng kahilingan na mabagal sa iyong server.

#### touch_thread_duriation_seconds

Ang isang hestogram ng touch sinulid na gawain ay tumatagal. Ang mga ito ay tinatawag na matagumpay (tunay/mali) .

#### gawain_thread_duration_pangalawa

Isang hestogram na sinulid ang tumatagal. Ang mga ito ay tinatawag na matagumpay (tunay/mali) at gawain_type (integer) .

#### karga_datasets_duration_seconds

Isang histagram ng tagal para sa pagkarga ng mga gawaing dataset. Ang mga ito ay tinatagurian ng major (tunay/mali) .

#### Mga postmail_thread_duriation_seconds

Natagalan ang isang stagram ng gawaing email sinulid. Ang mga ito ay tinatawag na matagumpay (tunay/mali) .

#### Ibinibilang ang mail_untrasyon

Isang histagram ng mga email bawat gawain.

#### datos_bilang

Isang gauge ng datasets, na itinakda pagkatapos ng bawat load datasets call. Ito ay tinatagurian ng kategorya (Pidyo, mesa) .

#### datos_failed_load_count

Isang gauge ng datasets na hindi nakapagkarga, na itinakda pagkatapos ng bawat kargang datasets call.

#### na mga_requests_deady

Labag sa mga kahilingan. Ang server ay mag - aalis ng kahilingan kapag ito ay naniniwala na ang server ay mababa sa memorya (RAM) at ang kahilingan ay magdudulot ng mga problema. Hindi kabilang dito ang mga kahilingan na ang pagkakamaling iyon ay dahil sa mababang RAM o disk space sa panahon ng paghawak ng kahilingan.

#### Mapanganib na_memory_emails_Subject

Kontra ng mga beses sinusubukan ng server na magpadala ng email sa admin na ang memorya ay mapanganib na mababa.

#### Mapanganib na_memory_failures_Subject

Kontra ng mga kahilingan na nabigo dahil sa makina na nauubos sa memorya. Kadalasan ito'y dahil sa ang makina ay tumatanggap ng maraming mamahaling kahilingan o ang kahilingan ng indibiduwal ay napakalaki.

#### topo_request_Sential

Kontra ng mga kahilingan para sa data ng topo. Ito ay may tatak na cache (Hinango/hindi_cached) .

#### Mga Kontra sa Hangganan

Mayroon ding koleksiyon ng mga kontrasyo para sa mga kahilingan para sa mga hangganan:

 - Pambansang_Alvaries_request_Sentrequest
 - state_untries_request_diverse
 - Ilog_Lakas_Republies_request_Sential
 - gshhs_request_fix

Ang mga ito ay tinatagurian ng katayuan (magaspang, tagumpay, hagis) .
