---
title: "ERDDAP™ - Changes"
---
#  ERDDAP™ Mga pagbabago

 ERDDAP™ isang magandang halimbawa [User-Driven Innovation](https://en.wikipedia.org/wiki/User_innovation) , kung saan ang pagbabago ng produkto ay kadalasang nanggagaling sa mga mamimili ( ERDDAP™ gumagamit) , hindi lamang ang mga prodyuser ( ERDDAP™ mga developer) . Sa paglipas ng mga taon, karamihan sa mga ideya para sa bagong mga katangian at pagbabago sa ERDDAP™ mula sa mga gumagamit. Ang mga gumagamit na iyon ay binibigyan ng kredito sa ibaba dahil sa kanilang dakilang mga ideya. Salamat&#33; Pakisuyong ipagpatuloy ninyo ang mga dakilang mungkahing iyon&#33;

Narito ang mga pagbabagong nauugnay sa bawat isa ERDDAP™ paglaya.

## Bersiyong 2.30.0{#version-2300} 
 (inilabas noong 2026-04-07) 

Ang Version v2.30.0 ay pangunahing nakatuon sa mga bug fix, mga update para sa katatagan at seguridad, at pagsubok sa mga pagpapabuti ng pagtakbo.

*    **Bagong mga Katangian at Pagbabago (para sa mga gumagamit) :** 
      * Nakulong [Kroissant](https://mlcommons.org/working-groups/data/croissant/) pagkakasama ng metadata at pagpapakita ng suporta, pati na [Malcroissant](https://pypi.org/project/mlcroissant/) Di - pagkakasundo.
      * Pinahusay na suporta para sa mga pararquet boolean.

*    **Mga Bagay ERDDAP™ Kailangang Malaman at Gawin ng mga Administrador:** 
      * Ang mga hindi ginagamit na mga kasangkapang command line at kaugnay na kodigo ay inalis sa codebase upang mabawasan ang teknikal na utang. Tingnan https://github.com/ERDDAP/erddap/pull/432.
 
      * Isang bagong bandila `Pag - aayos ng puwersa` ay idinagdag upang pawalang - saysay ang default ipinagpaliban na pag - uulat ng dataset na nag - a - load ng impormasyon. Ito'y bihirang kailanganin, at ginagamit lamang sa mga kaso kung saan ang pagpapaliban ng pagbuhat ay nagdudulot ng mga isyu. Tingnan ang [pahina ng bandila](/docs/server-admin/feature-flags#forcesynchronousloading) para sa mga detalye.

## Bersiyong 2.29.0{#version-2290} 
 (inilabas 2025-12-15) 

Kailangan ang pagkilos.

 ERDDAP™ Ang bersyong 2.29.0 ay nangangailangan ng jdk 25 o mamaya. Pakisuyong i-update ang inyong jdk na bersyon. Kung iyan ay isang problema, maaari kang magtayo ERDDAP™ para sa mas lumang jdk (pabalik sa di - kukulanging 17) sa pamamagitan ng pagpapalit ng talaksang pom.xml. Ang JDK 25 ay isang palabas ng LTS Java at kasali rito ang maraming pagsulong, lalo na ang pinagbuting pagtatanghal.

*    **Bagong mga Katangian at Pagbabago (para sa mga gumagamit) :** 
    * Mga bersyon ng ISO 19115: Tingnan ang ibaba para sa admin info. Para sa mga gumagamit nito, maaari ka na ngayong humiling ng espesipikong mga bersiyon ng ISO 19115 metadata. Gawin ito mula sa griddap/ tabledap pahina para sa isang dataset na ang file type ay bumababa. Ang mga bersyong ito ay magiging independiyente sa sign default.

*    **Mga Bagay ERDDAP™ Kailangang Malaman at Gawin ng mga Administrador:** 
    * Bagong tampok, suporta ng MQTT. Para sa mga detalye iminumungkahi ko ang pagbabasa ng [bagong pahina tungkol dito.](/docs/server-admin/mqtt-integration) Kasama rito ang paggawa ng mga dataset mula sa mga mensaheng MQT, at paglalathala ng mga mensaheng MQTTT kapag nagbago ang isang dataset. Ito'y hindi mabisa, kaya kung nais mong gamitin ito, kailangan mong gawin ito.

Salamat kay Ayush Singh sa pagtatrabaho sa MQTT&#33;

    * S3 pagpapabuti: Pagdagdag ng suporta para sa S3 URIs bilang cache FromUrl halaga. Magpapahintulot ito ERDDAP upang suportahan ang mga pribadong timba sa mga amazonaw.com Isaalang - alang din ang isyu ng S3 na tumatagas na memorya.

Salamat sa @SethChamagneNRL para sa gawain sa S3&#33;

    * Mga bersyon ng ISO 19115: Mayroon na ngayong suporta para sa 3 iba't ibang bersyon ng ISO 19115 metadata. Ang default na bersyon ay kinokontrol ng settings sa iyong setup.xml. Kung mali ang gamit na SISISO19115, ang server ay magbibigay sa pamamagitan ng default NOAA Binagong ISO19115_2. Kung totoo ang paggamit ng SISISO19115, ang server ay gagamit ng ibang bersyon depende sa halaga ng paggamit ng SSisiSO19139. Kung totoo ang paggamit ng SISISO19139, ang default ay iSO19139_2007, kung ang paggamit ng SISISO19139 ay mali ang default ay iSO19115_3_2016. Inirirekomenda namin ang paggamit ng usersiISO19115=Greature at paggamit ng SISISO19139= false. Maaaring kailanganin ng inyong organisasyon ang iba't ibang kalagayan.

    * Nandayuhan sa java. aklatan (Sa halip na java.util. GregorianCalendar) . Ito ay dapat magbigay ng mga pagpapabuti sa pagganap sa mga queries na kinasasangkutan ng mga kolumna ng petsa/panahon. Hindi dapat magkaroon ng kapansin - pansing epekto sa karamihan ng mga dataset. Ang kilalang kaso na sanhi ng pagbabago ay kung ang dataset ay gumagamit `araw simula 0000-01-01` o katulad nito. Kung ito ay isang problema para sa isang pagbabago, maaari mong idagdag ` <att name="legacy_time_adjust"> totoo </att> ` sa addAttributes bahagi ng alinman sa isang dataVariable o axisVariable .
    
    *    datasets.xml ay pinoproseso na ngayon ng isang [Pampalaking Patutot](https://commons.apache.org/proper/commons-text/apidocs/org/apache/commons/text/StringSubstitutor.html) . Marami itong gamit kabilang ang pagtatakda ng mga pribadong pamantayan (tulad ng mga password) na gumagamit ng iba't ibang kapaligiran. Ito ay maaaring mabalda sa pamamagitan ng pagtatakda ay nagpapangyari sa EnvParsing na magsinungaling sa setup.xml.

    * Mga Epekto ng Panggigipit: Dagdag pa ang isang espesyal na kaso para sa mga taas na itinakda ng presyon. Ito ay pangunahing ginagamit sa Meteorology datasets na nagbibigay kahulugan sa mga patayong taas sa mga antas na isobariko. TALA: Ang mas maliliit na presyo ay nangangahulugan ng mas mataas na lugar, kaya ang axis ay nasa tapat ng normal na taas na mga metro o talampakan.

Salamat [SetChammagneNRL](https://github.com/ERDDAP/erddap/pull/373) 

    *    EDDGrid Mula sa mga NNcFile na may iba't ibang sukat: Mayroon (Pag - eeksperimento) suporta EDDGrid Mula saNcFiles datasets magkaroon ng mga variables na hindi gumagamit ng parehong set ng mga palakol. Pakisuyong iulat mo kung paano ito gumagana sa iyo, o kung ang paggawi ay waring hindi tama.

    * Mayroong koleksiyon ng mga optimisasyon na dapat ay ligtas, ngunit may mga watawat na ibabalik sa dating gawi kung kinakailangan. Kung masumpungan mo ang pangangailangang magtakda ng alinman sa mga bandila, pakisuyong magsalansan ka ng isang bug. Kung wala tayong maririnig na mga isyu na karamihan sa mga ito ay aalisin na may bagong kabiguan sa paggawi sa hinaharap. Meron [bagong pahina tungkol sa mga bandila](/docs/server-admin/feature-flags) kung saan mababasa mo ang tungkol dito at sa iba pang mga bandila.

      * Paghipo Hugis Tanging ang Kapag Items: Ito ay pagbabago upang ang touchThread ay tumatakbo lamang kapag may mga bagay sa queue upang hawakan. Ang mas kaunting sinulid sa pagtakbo ay isang maliit na pagbabago subalit kapaki - pakinabang pa rin. Ang totoo'y hindi.

      * Paggamit ng NNcMetadata Walang Kapintasan: Ang pagbabagong ito ay pumapayag sa panloob na file table na gumamit ng mga katangiang nc, partikular na ang isang variable aktwal_range attribute upang maiwasan ang pagbasa ng buong talaksang nc. Ito ay maaaring lubhang mapabilis ang simulang pagkarga ng mga datasets batay sa mga nc file kung ang aktwal na_range para sa bawat variable sa bawat file ay isama bilang isang attribute. Pansinin na ito ay nagtitiwala sa halaga, kaya kung ito ay mali, ang panloob na file table ay magkakaroon ng maling impormasyon. Ang totoo'y hindi.

      * Tagapagpagaling Gumawa ng Mabuti: Ang pagbabagong ito ay pumapayag sa mga talaksang nc header na malikha nang hindi muna lumilikha ng kinatawang talaksang nc. Ito ay isang maliit na optimisasyon para sa EDDTable, ngunit isang napakalaking optimisasyon para sa marami EDDGrid tanong. Mga Alitan sa Kasinungalingan (gaya ng huwad ay ang intensiyong maging optimente) .

      * background Lumikha ng mga Bagay - bagay Talaan: Ang pagbabagong ito ay naglilipat ng ilan sa paunang pagpoproseso ng mga datasets sa isang background sinulid. Ito ay dapat mapahusay ang oras ng pagkarga ng mga dataset. Espesipikong ang naantalang bahagi ay subset tables, na ginagawa rin kapag kinakailangan kung ang naantalang pagpoproseso ay hindi pa nangyayari. Totoo naman ang mga hula.

    * Ilang maliliit na pagbabago, mga bug fix (Salamat kay Italo Borrelli para sa fix para sa EDDTable FromAggregateRows, Salamat @SethChampagneNRL para sa pagpapainam ng mga longhitud na mas malaki sa 360 in EDDGrid LonPM180, at ilan pang mga bug fix) , at mga optimisasyon.

*    **Sapagkat ERDDAP™ Mga Nagpapaunlad:** 
    * Ang karagdagang mga optimisasyon, kabilang ang pagbabawas ng pagsusulit ay tumatakbo ng kalahati ng oras.

    * Bagong mga profile ng pagsubok para sa napakalabo (panlabas) o lubhang mabagal (MGA ABAW) pagsubok.

## Bersiyong 2.28.1{#version-2281} 
 (inilabas 2025-09-05) 

*    **Mga Bagay ERDDAP™ Kailangang Malaman at Gawin ng mga Administrador:** 
    * Idinagdag ang suporta para sa X-Forwarded-Prefix. Ito ay partikular na kawili-wili sa mga admin na tumatakbong servers sa isang subpath. Pakisuyong basahin ang aming bagong mga dokumento para sa [Apache](/docs/server-admin/deploy-install#apache) at [Nginx](/docs/server-admin/deploy-install#nginx) para sa higit pang impormasyon.

Salamat [Waltzsrstsavage](https://github.com/srstsavage) 

## Bersiyong 2.28.0{#version-2280} 
 (inilabas 2025-08-29) 

*    **Bagong mga Katangian at Pagbabago (para sa mga gumagamit) :** 
    *    [Croissant schema](https://docs.mlcommons.org/croissant/docs/croissant-spec.html) ay makukuha na ngayon. Ang mga admin ay maaaring kumontrol kung ang default metadata ay gumagamit ng Croissant, ngunit simula 2.28.0 maaari mong hilingin ang kahulugang Croissant para sa bagong talaksang panluwas na ".croissant". (na nagbibigay ng talaksang jsonld) .

*    **Mga Bagay ERDDAP™ Kailangang Malaman at Gawin ng mga Administrador:** 
    * Bagong Docker Ang larawan na nilikha sa bawat pinagsanib na kahilingan ng hila. Ang mga ito ay mga gusaling alpha, ang mga ito ay hindi mga inilabas na bersyon. Magkakaroon sila ng tag tulad ng "20250814T034025", na nagpapakita kung kailan ito itinayo. Kung nais mong subukin ang pinakabagong mga katangian na magagamit mo sa mga ito. Kung nais mo ng isang bagay na mas matatag na gamitin ang ating mga labas na may semantikong tag ng bersyon (e.g. 2.28.0) . Lagi naming layon na ang mga inilabas na alpha ay maging magagamit, subalit mas kaunti ang pagsubok para sa mga ito kaysa aming mga inilabas na bersyon. Sa tuwina'y inirerekomenda namin na gamitin ninyo ang isang bagay na bago na gaya ng aming "latest" release na siyang magiging pinakabumentang semantic versioned release.

    * Docker Ang mga imahen na makukuha ngayon sa [GitHub](https://github.com/ERDDAP/erddap/pkgs/container/erddap) bukod pa sa [DockerHub](https://hub.docker.com/r/erddap/erddap) .

Salamat [@ocefpaf](https://github.com/ocefpaf) , [@abkfenris](https://github.com/abkfenris) , [Waltzsrstsavage](https://github.com/srstsavage) , at [MathewBiddle](https://github.com/MathewBiddle) sa kanilang mga kontribusyon sa paligid ng Docker Images. Kasali na rito ang unang mga abuloy buhat sa lahat ng ito maliban sa Waltzstsavage&#33;
    
    * Mayroon na ngayong suporta sa paggawa [Croissant schema](https://docs.mlcommons.org/croissant/docs/croissant-spec.html) mga file. Ito ay sa pamamagitan ng default. Maaari mong sirain ang Croissant schema sa iyong setup.xml sa pamamagitan ng (HINDI RECOMMENDED- Paki-abot o mag-salansan ng isyu tungkol sa GitHub kung kailangan mong gawin ito) :
    ```
        <generateCroissantSchema>false</generateCroissantSchema>
    ```

    * Binago ng ilang kalagayan ang kanilang default na mga pamantayan. paggamit ng HeadersForUrl at paggamit ng eddReflection ngayon ay parehong hindi natupad. Kung ang mga ito ay nagiging sanhi ng isang problema at kailangan mo silang pasinungalingan, pakisuyong lumikha ng isang isyu. Ang layon ay alisin ang mga ito sa hinaharap na paglaya.

    * Ang ilang kalagayan ay inalis na. paggamit ng SharedWatchService at Pagredirect ng Dokumentasyon Ang ToGitHubIo ay naitalagang totoo sa pamamagitan ng default para sa multiple releases at mahusay na nasubukan sa puntong ito. Ang pag - aalis sa mga ito ay nagpapahintulot ng paglilinis ng ilang kodigo.

    * Ilang maliliit na pagbabago, mga bug fix, at optimisasyon.

*    **Sapagkat ERDDAP™ Mga Nagpapaunlad:** 
    * Maraming patay na kodigo ang inalis. Maraming babala ang ibinigay.

## Bersiyong 2.27.0{#version-2270} 
 (inilabas 2025-06-11) 

*    **Bagong mga Katangian at Pagbabago (para sa mga gumagamit) :** 
    * Bagong datos sa colorbar converter sa mga server sa /erddap/convert/color.html

*    **Mga Bagay ERDDAP™ Kailangang Malaman at Gawin ng mga Administrador:** 
    * Ang paggawing default ay na ang cache ay aalisin na ngayon nang hiwalay sa malaking trabahong datasets. Magpapahintulot ito ng mas maaasahan at regular na pag - aalis ng lumang mga salansan ng cache. May karagdagang gawain upang mapabuti ang pag-uugaling server kapag mababa sa disk space (Ang pagbabayad ng pagkakamali sa mga kahilingan ay malamang na magpangyari sa server na maubusan ng lugar, at ang pag - aalis ng cache nang mas madalas sa mababang kalagayan ng disk upang maiwasan ang mga pagkakamali) . Nasa datasets.xml   (o setup.xml) maaari mong idagdag/set ang bagong cache Ang mga clearMinute ay naghahanda upang kontrolin kung gaano kadalas na sinusuri ng server ang cache. Pansinin, kinokontrol ng umiiral na mga cacheMinutes parameter ang panahon ng pag - iimbak ng mga file, ang bagong cache Ang ClearMinutes ay para sa kung gaano kadalas gawin ang isang chache maliwanag.
    ```
        <cacheClearMinutes>15</cacheClearMinutes>
    ```
Maaari mong sirain ang bagong cache na malinaw na mga tseke sa pamamagitan ng paglalagay sa taskCachClear na mali sa setup.xml, bagaman iyan ay hindi inirerekomenda.
cache Ang mga ClearMinute ay nasa [dokumentasyon ng datos](/docs/server-admin/datasets#cacheclearminutes) .
    
    * Localized dataset metadata support. Sinusuportahan nito ang lokalisasyon para sa mga pamantayan sa isang lugar addAttributes seksiyon. Lagyan lamang ng attribute ang karagdagang xml:lang tag. Halimbawa upang magdagdag ng isang pamagat sa wikang Pranses sa isang dataset na ibinigay sa iyo addAttributes kalakip sa seksiyong ito ang:
    ```
        <att name="title">Data from a local source.</att>
        <att name="title" xml:lang="fr">Donn&#xE9;es provenant d'une source locale.</att>
    ```
Karagdagang mga detalye na makukuha sa [lokal na ginawang dokumentong metadata](/docs/server-admin/localized-metadata) .

    * Bagong Docker Compose file na may opsyon para sa SSL at isang unbones Prometheus server. Salamat kay Shane St. Savage para sa SSL at Jihui Hu para sa Prometheus.

    * Suporta sa paggamit ng impormasyon sa mga header upang alamin ang server URL sa halip na umasa sa talaksang pagkaayos. Ito'y magpapangyari sa isang server na makuha ang maraming pangalan at maaaring gawing simple ang ilang mga kaayusan. Pakisuyong gawin ito at magpadala ng impormasyon.
    ```
        <useHeadersForUrl>true</useHeadersForUrl>
    ```

    * Ilang maliliit na pagbabago, mga bug fix, at optimisasyon.

*    **Sapagkat ERDDAP™ Mga Nagpapaunlad:** 
    * Refactor kung paano binibigyang kahulugan ang mga uri ng output file sa code. Ito ay dapat gumawa nito kaya ang mga tipo ng talaksan ay maaaring idagdag nang hindi na kailangang hawakan ang maraming code place.

## Bersiyong 2.26{#version-226} 
 (inilabas 2025-03-31) 

*    **Para sa Lahat:** 
    * Malaking update sa ating dokumentasyon: https://erddap.github.io/
 
Bukod sa binagong hitsura roon ay mayroon pang pinahusay na nabigasyon, paghahanap, pagsasalin, at ito'y dapat na mas madaling panatilihing pasulong&#33;

*    **Bagong mga Katangian at Pagbabago (para sa mga gumagamit) :** 
    * Mga Suskripsiyon at Suskripsiyon RSS Ang mga update ay dapat na mangyari nang mas tiyak para sa datasets na madalas na nai-update mula sa mga pagbabago ng file.

*    **Mga Bagay ERDDAP™ Kailangang Malaman at Gawin ng mga Administrador:** 
    * Ang default release ay nangangailangan ng/suporta Java bersyon 21. Back sa release na ito ay madaling makagawa ng isang Java 17 Magkasundong binary.

    * Bagong tampok upang gawing maayos ang impormasyon na ipinakikita tungkol sa mga dataset sa UI. Inaasahan namin na ito'y lalo nang kapaki - pakinabang upang magdagdag ng mga bagay na gaya ng dataset scripts. Para sa higit pang detalye mababasa mo [bagong dokumentasyon](/docs/server-admin/display-info) . Salamat kay Ayush Singh sa kontribusyon&#33;

    * Karagdagang mga metrikong Prometheus. Ang pinakamalaki ay ang ` http _Magtanong_duriation_seconds` na kinabibilangan ng mga oras ng request_type", "dataset_id", "dataset_type", "file_type", "lang_code", "status_code".
Ang nababasang format ng makinang ito ay tutulong sa mas mabuting koleksiyon ng mga metriko na maunawaan kung paano ginagamit ng mga gumagamit ang server.

    * Bagong paraan ng paglikha ng ISO19115 XML files. Gumagamit ito ng Apache SIS at isang bagong opsiyon sa pagpapalabas na ito. Pakisuyong gawin ito at magpadala ng impormasyon.
    ```
        <useSisISO19115>true</useSisISO19115>
    ```

    * Ang UI ngayon ay lilikha ng isahang kawing para sa bawat url sa mga larangang gaya ng infoUrl at buod.

    * Mga Suskripsiyon at Suskripsiyon RSS Ang mga update ay dapat na mangyari nang mas tiyak para sa datasets na madalas na nai-update mula sa mga pagbabago ng file. Kung ito ay nagiging sanhi ng mga isyu, pakisuyong abutin ang GitHub at sirain ang functionality sa pamamagitan ng pagdaragdag ng ilalim na watawat sa iyong setup.xml.
HINDI NATATANDAAN
    ```
        <updateSubsRssOnFileChanges>false</updateSubsRssOnFileChanges>
    ```

    * Ang mga subset variable ay hindi na awtomatikong lilikhain para sa tipo ng datos na EDDTable FromNcCFililes. Kung umaasa ka sa paggawing ito, magagawa mo rin ito (piniling solusyon) idagdag ang subsetVariables sa kahulugan ng dataset datasets.xml , o idagdag ang ilalim na watawat sa iyong setup.xml. Kung inaakala mong kailangan mo itong buksan, pakisuyong abutin mo ang GitHub upang mas higit naming suportahan ang iyong kaso na ginagamit mo na sumusulong.
HINDI NATATANDAAN
    ```
    <includeNcCFSubsetVariables>true</includeNcCFSubsetVariables>
    ```

    * Itutuwid ngayon ng server ang mga kahilingan ng dokumento (sa ilalim ng mga download/ na siyang dokumentasyon na niraranggo) sa bagong dokumentasyon. Kung kinakailangan maaari mo itong sirain sa pamamagitan ng bandila sa setup.xml:
HINDI NATATANDAAN
    ```
        <redirectDocumentationToGitHubIo>false</redirectDocumentationToGitHubIo>
    ```

    * Ilang maliliit na pagbabago at bug fix.

*    **Sapagkat ERDDAP™ Mga Nagpapaunlad:** 
    * Higit pang mga pagpapabuti sa kalidad ng kodigo at paglilinis ng patay na kodigo. Kasali rito ang maliliit na pagbabago, mas mahusay na pangangasiwa sa madaling mawalang yaman, at pandarayuhan malayo sa matagal nang mga uri ng data (gaya ni Vector) .

    * Malaking pagbabago sa EDstatic upang ilabas ang karamihan ng mga impormasyon, mensahe, at kodigong metriko. Mas mabuti rin itong mag - encapsule sa simula at paghawak sa mga landas ng directory (Ang huling 2 ito ay marami pang dapat gawin.) 

    * Maraming pagsulong tungo sa isang opisyal na suportadong Docker Image. Ang plano ay tapusin at ilabas pagkatapos ng ERDDAP™ 2.26 ang makukuhang release.

## Bersiyong 2.25{#version-225} 
 (inilabas 2024-10-31) 

*    **Bagong mga Katangian at Pagbabago (para sa mga gumagamit) :** 
    * Ang EDDTable FromFiles ay maaari na ngayong sumuporta sa mga queries na mayroon lamang nakuhang output (Mga globo, sulat jaxl, o mga variable) .
         
*    **Mga Bagay ERDDAP™ Kailangang Malaman at Gawin ng mga Administrador:** 
    * Bersiyong 2.25 ay nangangailangan Java 21 o mas bago. Ito ang bersiyon ng LTS at makukuha na sa loob ng mahigit isang taon.
         
    * Ang kabahagingWatchService ang siya ngayong default. Kung kailangan mong sirain ito, pakisuyong makipag - ugnayan sa chris. john sa noaa.gov upang ipaalam sa akin, upang mapabuti ko pa ito sa hinaharap na mga bersiyon at idagdag pa:
        &lt;gumagamit ng "SharedWatchService&gt; false "&lt;/useSharedWatchService&gt; sa iyong setup.xml.
         
    * Ang ERDDAP™ Ang servlet ay magsisimula na ngayon sa server startup. Na nangangahulugang ang datasets ay magsisimulang magkarga agad sa halip na maghintay hanggang sa ang isang hiling ay magawa.
         
    * Ang tinanggal naMVRows parameter sa EDDTable FromMultidimNcFiles ay magkakaroon ngayon ng epekto. Ang paglalagay nito sa huwad ay maaaring lubhang mapabilis ang ilang mga queries, ngunit maaaring hindi ito angkop sa lahat ng mga dataset. Para sa higit pang impormasyon tingnan ang [paglalarawan sa parameter](/docs/server-admin/datasets#removemvrows) .
         
    * Mga Data (Mga EDDTable Mula sa mga Liwasan at mga Latian EDDGrid Mga Ulila) gamit ang mga talaksang zarr ay suportado na ngayon. Dapat nilang isama ang "zarr" sa alinman sa fileNameRegex o pathRegex. Tingnan ang [Larawan sa datasets dokumentasyon](/docs/server-admin/datasets#zarr) para sa higit pang detalye.
         
    * Bagong dataset type, EDDTable FromParquetFiles ay suportado ngayon. Tingnan ang [EDDTable FromParquetFiles seleksiyon sa datasets dokumentasyon](/docs/server-admin/datasets#eddtablefromparquetfiles) para sa higit pang detalye.
         
    *    [Mga metrikong prometheus](https://prometheus.io/) ay makukuha na ngayon sa /erddap/metrics.
         
    * May makukuhang bagong XML parser parsation. Ang bagong parser na ito ay nagpapahintulot sa paggamit ng XInclude datasets.xml . Salamat kay Ayush Singh sa tampok.
         
    * Bagong parametro sa datasets.xml upang kontrolin ang di - pangkaraniwang mga email. Di - pangkaraniwang Akastibidad Bigong mga default sa lumang halaga ng 25%. Salamat kay Ayush Singh sa tampok.
         
    * Ang bagong parameter sa setup.xml na kumokontrol kung ang dataset na nagkarga ng mga pagkakamali ay ipinapakita sa status.html page. Ito ay hindi tumutupad, upang sirain ang mga pagkakamali sa dataset sa status page, ay nagtakda ng showLoadErsors na OnStatusPage sa mali:&lt;palabas naLoadErors OnStatusPAge&gt; Kasinungalingan&lt;/showLoadErsors OnStatusPAge&gt;
         
    * Ilang maliliit na pagbabago at bug fix.
         
*    **Sapagkat ERDDAP™ Mga Nagpapaunlad:** 
    * Naghiwalay ang pagsubok at ang pagsasama - sama (mabagal) pagsubok. Mas marami ring mga pagsubok na nagawa at ang mga pagsusuri ay ginawa nang hindi gaanong mahusay.
         
    * Error (ang ilang tseke na may kapansanan pa rin) at Ang Spot Bugs ay nagsanib sa pamamagitan ng Maven.
         
    * Buong code base form ay naka-publish upang tumugma sa Google Style Guide.
         

## Bersiyong 2.24{#version-224} 
 (inilabas 2024-06-07) 

*    **Bagong mga Katangian at Pagbabago (para sa mga gumagamit) :** 
    * Bagong kulay na paleta EK80 para sa akustikong datos na makukuha. Salamat kay Rob Cermak dahil dito.
         
    * Itakda ang isang isyu kung saan ang EDDTableAggregateRows ay hindi nagpakita ng wastong pagkakaiba mula sa lahat ng mga bata. Salamat kay Marco Alba sa ulat ng fix at bug.
         
*    **Mga Bagay ERDDAP™ Kailangang Malaman at Gawin ng mga Administrador:** 
    * PAGTANGGAP: BINAGO NG PAGTUWID: Ang Google Rescrimination ay maaaring mangailangan ng mga pagbabago sa iyong CSP.
        
Sa espesipikong paraan, baka kailangan mo ring magdagdag https://accounts.google.com/gsi/style sa stlye-src at https://accounts.google.com/gsi/ upang mag-ugnay-src. Para sa script-src maaari mo na ngayong gamitin https://accounts.google.com/gsi/client.
 
        
Para sa higit pang impormasyon maaari kang magtungo sa [Google pahina](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#content_security_policy) tungkol sa pagsasaayos ng CSP.
         
        
    * Bagong Bahaging Serbisyo ng Pagbabantay. Ito ay isang bagong opsiyon sa panonood ng mga directories para sa mga updates. Mayroon itong isang sinulid para sa bawat filesystem sa halip na isang sinulid kada dataset. Malamang na lubhang bawasan nito ang bilang ng mga sinulid na ginagamit upang bantayan ang mga pagbabago. Nangangahulugan ito na ang lahat ng datasets ay nagkakaroon ng updated sa halip ng bawat dataset na may sarili nitong update frequency. Malamang na ito'y mangahulugan ng mas madalas na mga update para sa karamihan ng mga dataset.
        
Upang makaragdag ito&lt;gumagamit ng sharedWatchService&gt; True&lt;/useSharedWatchService&gt; sa iyong setup.xml.
        
          
Pakisuyong subukan mo ito at iulat kung paano ito naging mabisa para sa iyo na chris. john sa noaa.gov.
         
    * Ilagay sa di - wastong pangalan ang mga troso. Salamat kay Ayush Singh para sa fix.
         
    * Ilang maliliit na pagbabago at bug fix.
         
*    **Mga Pagsulong Para sa ERDDAP™ mga developer:** 
    * Suporta sa lokal na pag-unlad gamit ang Docker. Salamat kay Matt Hopson at Roje.
         
    * Suporta sa lokal na pag-unlad gamit ang Jetty at dokumentasyon pagpapabuti. Salamat kay Mikas Wengren.
         
    * Mga pagbabago upang mabawasan ang mga isyu cross platform. Salamat Shane St. Savage.
         

## Bersiyong 2.23{#version-223} 
 (inilabas noong 2023-02-27) 

Pansinin na ang pagpapalayang ito ay ginawa ni Bob Simons, sa gayo'y ipinakikita na siya ay nasa paligid pa at aktibo sa panahon ng pagbabago kay Chris John, ang kaniyang kahalili. Kasabay ng paglalabas na ito, ang lahat ng pagbabago sa kodigo ay ginagawa ni Chis John, maliban sa iba pang binanggit.

*    **Bagong mga Katangian at Pagbabago (para sa mga gumagamit) :** 
    *    (Wala)   
         
*    **Mga Bagay ERDDAP™ Kailangang Malaman at Gawin ng mga Administrador:** 
    * PAGTANGGAP: BINAGO NG SIKRYE: Ang Google Resertation ay naisasagawa ngayon sa pamamagitan ng bagong Google Identity Services library na bahagi ng "Sign In with Google". Ang suporta ng Google para sa lumang "Google Sign In" system ay itigil 2023-03-31. Kaya kung gagamitin mo ang Google Resentation sa iyong Google ERDDAP™ installation, ikaw MUST update to ERDDAP™ −223+ bago nito. (Ikinalulungkot ni Bob ang maikling patalastas. Kasalanan ito ni Bob.)   
         
    * IMPROVED: NCSV ngayon ay v1.2. Ang pagbabago ay na ang mga files ngayon UTF-8-encoded files (Sila ay mga ASCII) at gayundin ngayon maaaring isama ang anumang tauhan ng Unicode na gaya ng, nang walang aksesorya bilang \\u_hhh_, bagaman ipinahihintulot pa rin iyan.
Kapag sumusulat ng mga talaksang NCSV, ERDDAP™ ngayon ay sumusulat ng v1.2 files.
         ERDDAP™ ay magbabasa pa rin ng NCCSV files na sumusunod sa v1.0 at v1.1 speciation.
Dahil sa Pauline-Chauvet, n-a-t-e, at thogar-computer dahil sa pagmumungkahi nito at paggawa ng mga pagsubok upang matiyak ang iba't ibang mga programa ng disheet ay maaaring mag-angkat ng UTF-8 files. Salamat kay Bob Simons sa pagbabagong ito ng kodigo.
         
    * BAGO: Ang status.html web page ngayon ay may linya na malapit sa tuktok na nagpapakita kung aling dataset loadDatasets ay kasalukuyang may karga at kaugnay na statistics, o wala kung walang dataset na nakakarga. Ito'y makatutulong nang malaki sa ERDDAP™ Pinag - iisipan ng mga administrador kung bakit may pananagutan Ang mga Dakets ay kumukuha ng mahabang panahon. Gayundin, ang nGridDatasets, nTableDatasets, at nTotalDatasets ay mahalaga sa ibaba na ngayo'y biglaang nangyayari (Dati, ang mga ito ay wakas ng huling malaking pasan Mga Data) .
Ang pagbabagong ito ay para kay Roy Mendelssohn. Salamat kay Bob Simons sa pagbabagong ito ng kodigo.
         
    * IMPROVED: GenerateDatasets Xml ay nagbabago ngayon sa CF-1.10. (ay CF-1.6.) sa mga "Convention" na katangian.
Salamat kay Bob Simons sa pagbabagong ito ng kodigo.
         
    * Ilang maliliit na pagbabago at bug fix.
         

## Bersiyong 2.22{#version-222} 
 (inilabas noong 2022-12-08) 

Pansinin na ang pagpapalayang ito ay ginawa ni Bob Simons, sa gayo'y ipinakikita na siya ay naroroon pa at aktibo sa panahon ng pagbabago sa kaniyang kahalili.

*    **Bagong mga Katangian at Pagbabago (para sa mga gumagamit) :** 
    *    (Wala)   
         
*    **Mga Bagay ERDDAP™ Kailangang Malaman at Gawin ng mga Administrador:** 
    * PAGGAWA: wala.
         
    * SEKRITY BUG FIX: Nagkaroon ng Cross Site Scripting-related bug sa code para sa pili ng wika pababa. Salamat NOAA Nag - scan ang seguridad para mahuli ito. Ipinakikita nito na NOAA Ang katiwasayan ay aktibo at laging naghahanap ng mga kahinaan sa seguridad ERDDAP .
         
    * SEKRITY FIX: Ang maraming aklatan na ginagamit ng ERDDAP™ ay binago, gaya ng dati, bilang bahagi ng paglalabas na ito. Sa pagkakataong ito, kasali rito ang pag - upgrade sa tsuper ng PostgreSQL (na may security bug) hanggang 42.5.1.
         
    * IMPROBLE: Mas maliit na pagbabago sa ERDDAP 'Ang sistema ng pamamahala ng memorya ay dapat bawasan ang tsansa ng isang ibinigay na kahilingan na bumabagsak dahil sa kakulangan ng magagamit na memorya.
         
    * Ilang maliliit na pagbabago at bug fix.
         

## Bersiyong 2.21{#version-221} 
 (inilabas noong 2022-10-09) 

*    **Bagong mga Katangian at Pagbabago (para sa mga gumagamit) :** 
    *    (Wala)   
         
*    **Mga Bagay ERDDAP™ Kailangang Malaman at Gawin ng mga Administrador:** 
    * MAGGAWA: Sapagkat Java 17, hindi mo dapat gamitin ang `-d64 sa JAVA\\_OPTS sa setenv.bat o setenv.sh. Kaya kung ito ay naroroon, pakisuyong alisin ito. Sa palagay ko, 64 na bit mode na ngayon ang napili kapag nag - download ka ng 64 na bit version Java . Salamat kay Sam Woodman.
         
    * BUG FIX: Kung minsan, ang bagong sistema ng email ay madalas na nagtatangkang mag - log in, na naging dahilan upang tanggihan ng Google Email servers ang lahat ng susunod na log sa mga pagtatangka. Ngayon, iniiwasan ito at ang kaugnay na mga problema ng sistema ng email.
         

## Bersiyong 2.20{#version-220} 
 (inilabas noong 2022-09-30) 

*    **Huwag gumamit ng v2.0. Ito'y may depekto.** Ngunit kailangan pa ring gawin ng mga administrador ang mga bagay na DO na nakatala sa ibaba kapag nag-ebolb hanggang v2.41+.
     
*    **Bagong mga Katangian at Pagbabago (para sa mga gumagamit) :** 
    *    (Wala)   
         
*    **Mga Bagay ERDDAP™ Kailangang Malaman at Gawin ng mga Administrador:** 
    * IMPROVED: Muli naming tinanggap ang dating sistema ng pangangasiwa sa memorya (Math2.ensureMemoryAvailable) at binago ang bagong sistema ng pangangasiwa sa memorya (EDStatic.Pasyak Itong Request) upang mapasulong ito. Tingnan [Kalagayan ng Alaala](/docs/server-admin/additional-information#memory-status) para sa mga detalye.
         
    * BINAGO: Ang default para sa&lt;EPAdddressMaxRequests&gt; sa loob datasets.xml ay nadagdagan mula 7 tungo sa 15. Maliwanag na ang ilan ay lehitimo WMS Ang mga kliyente ay maaaring lumikha ng mahigit na 7 sabay - sabay na mga kahilingan.
         

## Bersiyong 2.19{#version-219} 
 (inilabas noong 2022-09-01) 

*    **Huwag gumamit ng v2.19. Ito'y may depekto.** Ngunit kailangan pa ring gawin ng mga administrador ang mga bagay na DO na nakatala sa ibaba kapag nag-ebolb hanggang v2.20+.
     
*    **Bagong mga Katangian at Pagbabago (para sa mga gumagamit) :** 
    * BAGO: May bagong gawaing server-side, orderBy Pagbaba, na gumaganang gaya ng orderBy , ngunit parang pababa. Salamat na lamang kay Adan na Lalong mabuti.
         
    * IMPROVE: Ngayon, mga graph (ngunit hindi ang mga mapa) ay lalawak upang punan ang magagamit na espasyo sa kanbas, i.e., espasyo na hindi ginagamit ng alamat. Makakakuha ka ng matataas na grap, parisukat na mga grap, o malapad na mga grap sa pamamagitan ng pagdaragdag at pagmamanipula ng &.ize=_width_ | _Itaas ang_ parameter (kung saan ang lapad at taas ay nagtatakda sa laki ng kanbas, sa mga pixel) tungkol sa kahilingan ng URL. (Hindi ito opsyon sa .graph web page. Kailangan mong idagdag ito sa URL nang manu - mano.) Kung hindi mo idetalye ang &.size parameter, mga kahilingan para sa . singlePng, .png, .larPng, . singlePdf, .pdf, at .ge.pdf ay may prefified canvas na sukat, kaya ang iyong graph ay lalawak upang punan ang magagamit na espasyo, ngunit karaniwang magiging halos parisukat. Salamat kay Bob Fleming.
         
*    **Mga Bagay ERDDAP™ Kailangang Malaman at Gawin ng mga Administrador:** 
    * PAGGAWA: ERDDAP™ kailangan ngayon Java 17 at ang kaugnay na Tomcat 10. Dapat mong sundin ERDDAP™ maglagay ng mga tagubilin (o katumbas na e.g., para sa Docker) iluluklok Java 17 at Tomcat 10 at kopyahin ang iyong \\[ tomcat \\] / Kontent directory mula sa iyong Tomcat 8 na instalasyon sa bagong \\[ tomcat \\] directory. Wala nang iba pang pagbabago na kailangan mong gawin sa iyo ERDDAP Pagluluklok na may kaugnayan sa pagbabagong ito. Sa ibang salita, ERDDAP™ ay gumagana na gaya ng dati.
        
Huwag kalimutang gumawa nito ERDDAP - Kaugnay na mga pagbabago sa server ni Tomcat.xml at konteksto.xml kapag ina-upgrade mo ang Tomcat. Tingnan ERDDAP ' [Mga instruksiyon sa pagkakabit ng Tomcat](/docs/server-admin/deploy-install#tomcat) .
        
Ang impresyon ko Java 17 ay mas gusto nito ang mas maraming lakas sa pagpoproseso at memorya para sa long-running, mas malaking mga aplikasyon tulad ng ERDDAP™ , kaya medyo mabagal ito kaysa Java 8 na may mababang lakas na mga computer (e.g., 2 core at kaunting RAM) At gumagawang mas mabilis ng kaunti kaysa sa Java 8 na may mas malalakas na computer (e.g., 4+ core at maraming RAM) . Kaya kung makakita ka ng mahinang pagganap, gumamit ng mga programang gaya ng sa Linux [itaas](https://www.howtogeek.com/668986/how-to-use-the-linux-top-command-and-understand-its-output/) upang suriin ang paggamit ng likas na yaman at isaalang - alang ang pagbibigay ERDDAP™ higit pang yaman, lalo na ang higit na memorya. Ang memorya ay mura&#33; Karamihan sa mga telepono ay mas maraming processor at memory kaysa sa mga server na ginagamit ng ilan sa inyo para tumakbo ERDDAP &#33;
Salamat kay Erin Turnbull.
         
        
    * GINAGAWA: Kung ginagamit mo ERDDAP™ Upang makapasok sa Cassandra, para kay Cassandra, kailangan mong patuloy na gamitin ang bersiyon ng Java na ginagamit mo sa pagpapatakbo ng Cassandra. Basta bumaling sa Java 17 para sa pagpapatakbo Tomcat+ ERDDAP .
         
    * PARA MAGAMIT: Inirerekomenda: Kung ang CPU ng iyong server ay may 4+ core at 8+ GB ng RAM, pag - isipang baguhin ang mga setting na ito sa iyong mga setting datasets.xml talaksan:
```
          <nGridThreads>3</nGridThreads>  
          <nTableThreads>3</nTableThreads>  
```

Kung ang iyong server ay may kaunting yaman, manatili sa "1" para sa parehong settings.
Ang mga sistemang nThreads para sa EDDGrid Mula sa mga Latian at Uso Malaki ang isinulong ng mga FromFile. Ang mga pagbabagong ito ay umakay sa mabilis na pagsulong (e.g., 2X speed-up kapag ang nThreads ay nakatakda sa 2 o higit pa) para sa pinakamahirap na mga kahilingan (kapag ang malaking bilang ng mga file ay kailangang iproseso upang tipunin ang mga resulta) . Ang ilang mga kaugnay na pagbabago mula kay Chris John ay hahantong din sa isang pangkalahatang speed-up sa buong mundo ERDDAP . Ang kodigo para sa mga pagbabagong ito ay ginawa ni Chris John. Salamat, Chris&#33;
         
    * BABALA: uso datasetID ''s ay na-deprecated at hindi na suportado (bagaman teknikal na ipinahihintulot pa rin) . Ang mga ito ay malamang na masira sa susunod na paglaya. Kung gumagamit ka ng hyphiens, bumaling ka upang bigyang - diin ngayon ang pag - iwas sa gulo. Kung ikaw ang gagawa ng pagbabago ngayon, ito ang iyong bilis. Kung maghihintay ka hanggang sa susunod na paglaya, malilito ka at haharapin mo ito sa araw na iyon.
         
    * BAGO: Ngayon, para sa .htmlTable mga tugon ng datos, kung ang datos sa isang selulang String ay naglalaman ng datos: region/png;base64, na sinundan ng base64 na kodigo .png imahe, ERDDAP™ magpapakita ng imahen (upang makita ng gumagamit ang larawan kung sila ay aali - aligid dito) at mga butones upang itago ang teksto o ang larawan sa clipboard. Salamat kay Marco Alba (na nagbigay ng kodigo) at si Bob Simons (na bahagyang bumago nito) .
         
    * BAGO: -do Hindi Soded StandardNames
Kung isasama mo ang \\-do Not Address StandardNames bilang command line parameter kapag ikaw ay tumakbo na lumilikha Mga Data Xml, lumikha Mga Data Xml ay hindi magdadagdag standard\\_name sa addAttributes para sa anumang mga variables maliban sa mga variable na pinangalanang latitud, longhitud, altitud, lalim o panahon (na maliwanag standard\\_name s) . Ito'y maaaring maging kapaki - pakinabang kung ginagamit mo ang output mula sa produksiyon Mga Data Diretso sa Xml ERDDAP™ nang hindi inaayos ang output, sapagkat lumilikha Mga Data Ang Xml ay kadalasang humuhula standard\\_name ay mali. (Pansinin na lagi naming inirerekomenda na ayusin ninyo ang output bago gamitin ito ERDDAP .) Ang paggamit sa parameter na ito ay magkakaroon ng iba pang maliliit na nauugnay na epekto dahil sa hula standard\\_name ay kadalasang ginagamit para sa ibang gamit, e.g., upang lumikha ng isang bagong long\\_name , at upang lumikha ng colorBar settings. Salamat kay Kevin O'Brien.
         
    * BAGO: Puwede mo na ngayong ilagay&lt;updateMax Advents&gt;10&lt;/updateMax ults&gt; sa loob datasets.xml   (kasama ng iba pang mga tagpo malapit sa itaas) upang baguhin ang pinakamaraming bilang ng mga pagbabago sa talaksan (default=10) na ipoproseso ng sistemang update EveryNMillis. Mas malaking bilang (100?) ay maaaring kapaki-pakinabang kapag napakahalaga na ang dataset ay laging panatilihin up-to-date. Tingnan ang [Dokumentasyon ng updateMax](/docs/server-admin/datasets#updatemaxevents) . Salamat kay John Maurer.
         
    * BAGO: Karagdagang suporta para sa pangglobo " real\\_time = Totoo | bulaang"Sring attribute.
Kung ito ay mali (ang default) at kung ang dataset ay hindi gumagamit ng update BawatNMillis, ERDDAP™ ang mga tugon ng cache sa mga kahilingan para sa mga uri ng talaksan kung saan ang buong file ay dapat na likhain bago ang ERDDAP™ ay maaaring magsimulang magpadala ng tugon sa gumagamit at muling gamitin ito sa loob ng mga 15 minuto (e.g., .nc , .png) .
Kung ito ay nakatakdang magkatotoo o kung ang dataset ay gumagamit ng update BawatNMillis, ERDDAP™ ay hindi kailanman tatama sa mga talaksan ng pagtugon at laging magbabalik ng bagong gawang mga file.
Salamat kay John Maurer.
         
    * BAGO: Ipinadadala ngayon ang mga email sa hiwalay na emailTHread. Ito ay gumagawa sa pagkarga ng mga dataset at iba pang mga aksiyon na mas mabilis na lumilikha ng mga email dahil ang mga loadDataset ay hindi kailangang maghintay na ipadala ang email, na kung minsan ay nangangailangan ng mahabang panahon. Ang bagong sistema ay maaaring magpadala ng multiple email sa bawat sesyon ng email, sa gayon ay nababawasan ang bilang ng mga email server logins at mabawasan ang panganib ng mga bumabagsak dahil sila ay masyadong madalas. May mga estadistika para sa emailThread sa status.html page at diagnosis na mga mensahe sa log.txt -- hanapin ang "emailThread". Pansinin na ang isang tangkad ng nEmailsPerSession=0, ay nagpapahiwatig ng gulo, i.e., ang isang sesyon ng email ay hindi nakapagpadala ng anumang email.
Salamat kay Bob Simons.
         
    * BINAGO: Ang mga email ay ipinadadala ngayon na may kaunting naiibang kodigo (dahil sa Java 17 at ang pagbabago tungo sa emailThread) . Kung nahihirapan kang magpadala ng email, pakisuyong email erd.data at noaa.gov .
         
    * BAGO: Ang mga aksiyong subscription na "touch" isang malayong URL ay pinangangasiwaan ngayon sa isang hiwalay na touchThread. Ito ay gumagawa sa pagkarga ng mga datasets at iba pang mga aksiyon na mas mabilis na umapekto sa mga URL dahil ang mga loadDataset ay hindi kailangang maghintay na matapos ang paghipo, na kung minsan ay nangangailangan ng mahabang panahon. May mga estadistika para sa touchThread sa status.html page at diagnosis na mga mensahe sa log.txt -- hanapin ang "touchThread".
Salamat kay Bob Simons.
         
    * BAGO: Sa status.html page, sa "Major PackDatasets Time Series", may isang bagong "shed" column na nagpapakita ng bilang ng mga kahilingan na inilabas dahil sa kasalukuyang pag-iral ERDDAP™ Ang paggamit ng memorya ay napakataas. Ang mga kahilingan na direksyon ay magbabalik ng HTTP status code 503 "Service available". Hindi naman problema ang mga kahilingang iyon. Kararating lamang nila sa isang abalang panahon. Ito'y bahagi ng pagbabago kung paano ERDDAP™ ay tumatalakay sa madalas na paggamit ng memorya.
         
    * BAGO: On Unix/Linux computers, mayroon na ngayong isang "OS Info" linya sa status.html web page na may kasalukuyang operating system information kabilang ang CPU load at memory na gamit.
         
    * IMPROVE: Ngayon, kailan ERDDAP™ ay muling inere at agarang Restart= True, EDDTable FromFiles datasets ay muling gagamitin ang subset .nc at kakaiba .nc . Para sa ilang datasets, lubhang nababawasan nito ang panahon upang ilulan ang dataset (e.g., mula 60 segundo hanggang 0.3s) . Kasama ang bagong emailThread at taskThread (Tingnan ang nasa itaas) , ito ay dapat na lubhang pabilisin ang muling pag - uusap ERDDAP™ para sa marami ERDDAP™ mga instalasyon. Salamat kina Ben Adams at John Kerfoot.
         
    * BINAGO: Dati, ulilang datos (mga dataset na nakatira sa ERDDAP™ ngunit wala sa datasets.xml ) ay basta napansin sa katayuan. html at sa log.txt matapos ang bawat pangunahing loadDatasets. Ngayon, kusang inaalis ang mga ito ERDDAP™ at binanggit sa status.html at sa log.txt, at email Lahat. Kaya kung nais mong alisin ang isang dataset sa ERDDAP™ , ngayon wala ka nang gagawin kundi alisin ang tipak ng xml datasets.xml at ito ay aalisin sa susunod na pangunahing loadDatasets. Salamat kay Bob Simons.
         
    * KILALANG BUG sa netcdf-java v5.5.2 at v5.5.3: Ang EDDGrid Mga Mula sa Thred Catalog opsyon sa GenerateDatasets Ang Xml ay ginamit upang magtrabaho sa mga katalogo ng THEDDS na kinabibilangan ng mga reperensiya sa mga dataset sa mga remote THEDDS katalogo. Ngayon ay hindi na. Naiulat ko ang problema sa mga netcdf-java developer.
         
    * BUG FIX: Para sa mga gumagamit ng Docker settingup.xml parameters sa pamamagitan ng ERDDAP \\_paramName_: para sa int at boole parameter (e.g., email SmtpPort) , ERDDAP™ ay maling hinahanap lamang ang _paramName_. Ngayon ay hinahanap nito _ ERDDAP \\_paramName_. Salamat kay Alessandro De Donno.
         
    * Pagbabago: Ang ERDDAP™ Ang sistema ng pagsubok ngayon ay gumagamit ng isang sistemang automated upang suriin na ang bagong gawang mga larawan sa pagsubok ay kagayang - kagaya ng inaasahan. Salamat kay Chris John para sa mungkahi at Bob Simons para sa pagpapatupad.
         

## Bersiyong 2.18{#version-218} 
 (inilabas noong 2022-02-23) 

*    **Bagong mga Katangian at Pagbabago (para sa mga gumagamit) :** 
    * NON
*    **Mga Bagay ERDDAP™ Kailangang Malaman at Gawin ng mga Administrador:** 
    * BUG FIX: .nc ang mga talaksan ay hindi isinara sa ilang kalagayan. Ngayon ay gayon nga. Salamat kina Marco Alba, Roland Schweitzer, John Maurer, at iba pa.
         

## Bersiyong 2.17{#version-217} 
 (inilabas noong 2022-02-16) 

*    **Bagong mga Katangian at Pagbabago (para sa mga gumagamit) :** 
    * BUG FIX: Pagkatapos magbago orderBy sistema Mga ilang taon na ang nakalipas, ang Tabledap's Make A Graph ay hindi wastong humawak ng maraming queries na ginamit orderBy _Xx_. Ngayon ay gayon nga. Salamat kay Maurice Libes.
         
    * Palitan: Dati, ERDDAP™ Tinanggihan ang mga kahilingan para sa . Maaninag Png's nang ang latitud at/o mga halaga ng longhitud ay bahagya o ganap na hindi-of-ranggang. ( ERDDAP™ Mga Isyu ng GitHub #19, ipinapaskil ni Rob Fuller -- salamat sa pag-paskil na ginawa ni Rob na iyon) Ngayon ay bumabalik ito ng mga naaaninag na pixels para sa anumang mga out-of-range area ng imahen. Kapaki - pakinabang ito sa maraming aplikasyon ng kliyente. Ang mga pagbabago sa kodigo upang gawin ang pagbabagong ito ay lubusang ginawa ni Chris John. Maraming salamat, Chris&#33;
         
    * Palitan: Dati, ERDDAP™ Tumanggi sa mga kahilingan ng griddap kung saan ang mga halaga ng index para sa isang ibinigay na dimensiyon \\[ Itaas: mababa \\] . Ngayon ay binibigyang - bisa nito ang mga kahilingang iyon sa pamamagitan ng pagpapalitan ng mababa at matataas na pamantayan. Nilulutas nito ang isang matagal na umiiral na problema para sa mga gumagamit at para sa mga panlabas na programa tulad ng xtracto na kailangang subaybayan ang ilang mga dataset na may mga halaga ng latitud na mula mataas hanggang mababa upang makagawa ng kahilingan tulad ng \\[  (50) : (20)  \\] kung kaya ang kahilingan sa index space ay \\[ mababa: mataas \\] . Tingnan https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplAquariusSSS3MonthV5.html Ngayon, isang kahilingan na gaya ng \\[  (20) : (50)  \\] para sa isa sa mga dataset na ito ay awtomatikong pinapakahulugan bilang \\[  (50) : (20)  \\] .
         
    * BINAGOD: .esriAscii requests Ang mga kahilingan ngayon ay sanhi ng isang "File : Save As" dialog box sa browser ng gumagamit. Salamat kay Joel Van Noord.
         
    * BUG FIX: Ngayon, kung iba't iba ang longhitud ng bata EDDGrid LonPM180 o EDDGrid Ang Lon0360 dataset ay may isang valid\\_min at/o valid\\_max Sabihin pa, inaalis ang mga ito EDDGrid LonPM180 o EDDGrid Lon0360 dataset. Salamat kay Roy Mendelssohn.
         
*    **Mga Bagay ERDDAP™ Kailangang Malaman at Gawin ng mga Administrador:** 
    * KUNG ikaw ay naglagay ng&lt;Ang data ReviderFormactive&gt; upang pansamantalang harapin ang XS ay mahina, pakisuyong ibalik ito sa katotohanan.
         
    * SEKURY BUG FIX: Fixed XS Desible in Data Movider Form. Salamat kay Genaro Contreras Gutiérrez.
         
    * BUG FIX: Nang magkaroon ng mahigit 10000 files ang isang WAS S3 directory, ERDDAP™ ay naghagis ng "Internal Error". Ito ay nakapirme na ngayon. Salamat kay Andy Ziegler.
         
    * BUG FIX: EDDGrid Side Byside ay hindi pumayag sa variable's sourceName sa iba't ibang bata datasets upang maging pareho. Ngayon ay gayon nga. Salamat kay Joshua Stanford.
         

## Bersiyong 2.16{#version-216} 
 (inilabas 2021-12-17) 

*    **Bagong mga Katangian at Pagbabago (para sa mga gumagamit) :** 
    * MGA BULTA/BUG FIXO: Maraming maliliit na pagbabago sa sistema ng pagsasalin dahil sa mga mungkahi mula sa mga language-specific editor. Dahil kina Melanie Abecassis, Marco Alba, Jessy Barrette, Filipe Fernandes, Etienne Godin, Jennifer Sevadjian, at Mike Smit.
         
    * ISINULAT ang isang wastong disclaimer at bayad para sa Google Translate, gaya ng kinakailangan sa mga termino ng Google Translate. Gayundin, ang&lt;Ang html&gt; tag sa HTML para sa bawat web page ngayon ay tumpak na nagpapakilala sa mga hindi-English na web page bilang ang mga makina na isinalin. Salamat kay Mike Smit.
         
    * BUG FIX: Ang mga pahinang login web ay gumagana ngayon nang wasto sa iba't ibang wika. Salamat kay Mike Smit.
         
    * BAGO orderBy Sum filter. At bagong Pagsuri sa Lahat at Pag - aalis sa Lahat ng buton EDDGrid Data Access Form web page. Salamat sa kontribusyong kodigo ni Marco Alba.
         
*    **Mga Bagay ERDDAP™ Kailangang Malaman at Gawin ng mga Administrador:** 
    * MAGGAWA: Kung mayroon ka
        &lt;tanong ni MarkkImageFile&gt;Question Markk.jpg&lt;/question Marka ImageFile&gt;
sa iyong setup.xml file, kailangan mong alisin ang buong tag (inirerekomenda, kaya ang default file ay ginagamit) o baguhin ito:
        &lt;tanong ni MarkkImageFile&gt;Question Markk.png&lt;/question Marka ImageFile&gt;
         
    * Palitan: Alam mo, [Pag - aampon](https://adoptium.net/?variant=openjdk8) ay pinalitan ang AppopenJDK bilang pangunahing/recommented na pinagmulan ng Java   (OpenJDK) .
         
    * Palitan: Ang log files mula sa ERDDAP™ , GenerateDatasets Xml, at ang mga DasDd ngayon ay UTF-8, hindi ang default character ng kompyuter. Gumawa ako ng maraming pagsusuri at gumawa ng ilang pagbabago upang tiyakin na ERDDAP™ ay laging nagsasabi ng wastong karakter kapag nagbabasa o sumusulat ng lahat ng uri ng files, at hindi na ngayon (sa ilang kaso) Umasa sa default character ng computer. Itinutuwid nito ang ilang pagkakamali at agad na lumipat sa tunguhing gamitin ang UTF-8 para sa pinakamaraming uri ng file hangga't maaari (e.g., .log, .xml, .html, .json , .json l, .nc Ulo) . Pansinin na maraming mas lumang uri ng talaksan ang kailangan upang magamit ang ISO-8859-1 (e.g., OPeNDAP .das, .dds, .csv, .tsv , .nc 3, .nccsv , .cpt) . Dati'y sinikap kong gumawang kasama ng grupo ng CF at kasama ng Unidata upang magdagdag ng suporta para sa UTF-8 .nc 3 files; parehong hindi tinatablan.
         
    * BAGO: Kapag nag-download ng files mula sa AWS S3, ERDDAP 's cache Mula sa sistemang Url sa EDDGrid Mula sa mga Latian at Uso Ginagamit ngayon ng mga FromFile ang bagong AWS Transfer Manler upang mag - download ng mga file sa pamamagitan ng parallelized na mga tipak (sa gayon ay napakabilis) . Ang target sa pamamagitan ngput ay nakatakda sa 20 Gbps, bawat file, kaya ito ay mahusay na gumagana sa lahat ng mga uri ng AWS instance, ngunit lalo na yaong may mahusay na "Networking Performance". Dahil sa pagbabagong ito ERDDAP 's cache Ang sistemang mula sa Url ay nag-aalok ngayon ng kahalintulad na bilis sa pamamaraang xarray ng mga kahilerang download ng mga pre-chunked file, ngunit nang walang pangangailangan na i-transport ang mga source file mula sa mga source files .nc at .hdf sa mga talaksang xarray. Sa katunayan, ERDDAP Mas mabuti ang 's system kung may kasunod na kahilingan na basahin mula sa parehong file, dahil ERDDAP™ ngayon ay may lokal na kopya ng file. Ang aming pamayanan ay gumugol ng mga taon sa pag - aayos ng pamantayan .nc at .hdf mga file. Ngayon ay hindi na natin kailangang ibunton ang lahat ng iyan upang makakuha lamang ng mahusay na pagtatanghal kapag nag - iimbak ng impormasyon sa AWS S3. Salamat sa Mayamang Signell.
         
    * BINAGO: searchEngine=Lucene ay, sa ngayon, ay deprecated. Isa itong masalimuot na sistema na kadalasang nagbubunga ng mga resulta na bahagyang naiiba sa mas kanais-nais na gawi ng searchEngine=orihinal. Para sa halos lahat ERDDAP™ Ang mga instalasyon, ang panahong natitipid ni Lucene ay hindi nagpapagaan sa mga pagkakaiba bilang resulta. Pakisuyong gamitin ang searchEngine=orihinal sa halip na hangga't maaari. Kung iyan ay nagiging sanhi ng mga problema, pakisuyong email Bob.
         
    * Pagbabago: Ang Lucene searchEngine ngayon ay mas gumagawi tulad ng orihinal na searchEngine. Wala nang mga kaso kung saan ang lucene ay nag-iisip ng isang dataset na posporo at ang orihinal ay hindi. Gayundin, ang mga ranggo ng lucene ngayon ay katumbas ng orihinal na mga ranggo (sapagkat ang orihinal ay laging ginagamit ngayon upang i - compute ang mga ranggo) .
         
    * BUG FIX: Nagsisimula sa isang bagong labas, ERDDAP™ Itigil ang pagkakita ng higit sa unang 1000 bagay sa isang ibinigay na AWS S3 back. Ngayon, ERDDAP™ ang lahat ng bagay. Salamat kay Andy Ziegler.
         
    * BUG FIX: Ngayon ay EDDTTableAggregate Inaalis ng mga hanay ang actual\\_range attribute kailanma't hindi nalalaman ng isa o higit pa sa mga dataset ng bata ang mga pagkakaiba nito ' actual\\_range   (e.g., EDDTable FromDatabase) . Salamat kay Erik Geletti.
         

## bersyon 2.15{#version-215} 
 (inilabas 2021-11-19) 

*    **Bagong mga Katangian at Pagbabago (para sa mga gumagamit) :** 
    *    ERDDAP™ ay may bagong sistema upang hayaan ang gumagamit na magtakda ng wika na gagamitin para sa lahat ng mga pahinang web. Kung mayroon ERDDAP™ Itinatakda ang instalasyon upang gamitin ito, ang talaan ng mga wika ay lilitaw sa itaas na kanang sulok ng bawat web page. ERDDAP™ URL's mula bago ang bersyong ito ay patuloy na gumana at palaging ibalik ang nilalamang Ingles, tulad ng dati.
        
Hindi lahat ng teksto o lahat ng web page ay isinalin. May mga restriksiyon sa oras sa proyektong ito na pumipigil sa Qi at Bob na umabot sa 100%.
        
Ang maliwanag na tanong ay: bakit kami puspusang nagsikap dito nang isalin ni Chrome ang mga web page sa-the-fly? Ang sagot ay: sa ganitong paraan, mas nakokontrol namin kung paano ginagawa ang pagsasalin. Kapansin - pansin, maraming salita na hindi dapat isalin sa web page, e.g., mga titulo at buod ng mga dataset, pangalan ng mga variable, parameter, unit, at organisasyon. Ang karamihan sa mga pagsisikap na isalin ay ang pagkilala sa mga salita at parirala na hindi dapat isalin. Gayundin, ang mga salin ng makina ay waring gumagawa ng ilang uri ng HTML markup. Ang pangangasiwa sa salin ay nagpangyari sa amin na mabawasan ang problemang ito.
        
Ang proyekto ng pagsasalin ay ginawa ni Qi Zeng (Isang Google Summer of Code intern) at Bob Simons gamit ang serbisyong websayt ng Google. Napakalaking proyekto nito. Salamat, Qi&#33;
        
    * BUG FIX: ERDDAP™ ay nagpapahintulot ngayon sa ORCID ID na magkaroon ng X bilang huling numero. Salamat kay Maurice Libes.
         
*    **Mga Bagay ERDDAP™ Kailangang Malaman at Gawin ng mga Administrador:** 
    * PAGGAWA:
        
        * Kailangan mong gumawa ng ilang pagbabago may kaugnayan sa ERDDAP 'bagong sistema upang hayaan ang mga gumagamit na magtakda ng wika para sa mga web page.
            * Sa unang linya ng iyong setup.xml at datasets.xml mga talaksan, palitan sa:  encoding="UTF-8" at palitan ang ekwasyon ng dokumento sa inyong editor ng teksto kaya ito ay naligtas bilang isang talaksang UTF-8. Mga GenerateDataset Ipinalalagay ngayon ni Xml na ang datasets.xml ay isang talaksang UTF-8.
            * Mga Programme na Nagtitipon ERDDAP : Lahat ERDDAP™ .java files ay dapat gamutin bilang UTF-8 files sa pamamagitan ng default. Baka kailangan mong idagdag ang "-encoding UTF-8" sa javac command line. (Gayon nga ang ginawa ko.) 
            * Upang matulungan ang sistemang ito (matinding mungkahi) , nasa&lt;simulaBodyHtml5&gt; tag na itinakda mo datasets.xml , palitan ang "Hamp&#33;login Info;" sa "Hamp&#33;login Info; | &amp&#33;wika;" upang ang talaan ng mga wika ay lumitaw sa itaas na kanang sulok ng bawat isa ERDDAP™ web pahina.
            *    ERDDAP™ gamitin lamang ang&lt;simulaBodyHtml5&gt; tag na itinakda mo datasets.xml upang tiyakin ang nilalamang HTML para sa baner sa itaas ng bawat isa ERDDAP™ web page, anumang wika ang piliin ng gumagamit. Kung babaguhin mo ang tag na iyon upang gamitin
" &EasierAccessToScientificData; "Sa halip na "Mas madaling makuha ang siyentipikong impormasyon" at
" &BroughtToYouBy; "Sa halip na "Pagsalita sa Iyo sa pamamagitan ng", ERDDAP™ ay gagamit ng isinaling mga bersiyon ng mga pariralang iyon sa baner.
            * Sa katulad na paraan, ang bagong default&lt;Ang ShortDescriptionHtml&gt; sa datasets.xml ay
                
```
                <theShortDescriptionHtml><!\\[CDATA\\[ 
                <h1>ERDDAP</h1>
                &erddapIs;
                &thisParticularErddap;
                \\[standardShortDescriptionHtml\\]
                \\]\\]></theShortDescriptionHtml>
```
Ang huling 3 linya ng nilalaman ay mga bagay na papalitan ng isinaling teksto. Kung makukumberte mo ang alinman sa kanila (Partikular na ParticularErddap;) o ang lahat ng ito ay mula sa detalyadong teksto datasets.xml   (na may priyoridad, kung naroroon) o mga mensahe.xml, ang tekstong iyon ay lilitaw anumang wika ang piliin ng gumagamit. Hindi ito perpekto, pero naisip ko na iilang administrador lamang ang gustong mag - edit&lt;ang ShortDescriptionHtml&gt; sa 35 iba't ibang files upang magbigay ng 35 iba't ibang isinaling bersyon ng tag na iyon.
        
          
         
    * BINAGOD: Ang ilang mga pagkakamali ngayon ay bahagyang naaasikaso nang kakaiba kaya maaaring idagdag sa tangkad ng "Failed requests" sa katayuan.html at sa Daily Report Email. Kaya ang mga bilang na iyon ay maaaring mas malaki kaysa dati.
         
    * BUG FIX: GenerateDatasets Xml para sa EDDGrid Si Lon0360 at si EDDGrid Hindi na ngayon isinasama ng LonPM180 ang mga source datasets sa datasetID =imperyo".\\*\\_LonPM180" at datasetID =imperyo".\\*\\_Lon0360", ayon sa pagkakasunod.
         

## Bersiyong 2.14{#version-214} 
 (inilabas 2021-07-02) 

*    **Bagong mga Katangian at Pagbabago (para sa mga gumagamit) :** 
    *    (wala ni isa)   
         
*    **Mga Bagay ERDDAP™ Kailangang Malaman at Gawin ng mga Administrador:** 
    * BAGO: EDDGrid Lon0360 na gumagawa ng isang grided dataset na may longhitudng halaga &gt;=0 at&lt;=360 mula sa isang grid na dataset na may longhitudng halaga &gt;=-180 at&lt;=180. Tingnan ang [ EDDGrid Lon0360 dokumentasyon](/docs/server-admin/datasets#eddgridlon0360) . Salamat kay Dale Robinson.
         
    * BAGO: ERDDAP™ Maaari na ngayong daigin ng mga administrador ang anumang halaga sa setup.xml sa pamamagitan ng isang kapaligiran na iba - iba ang pangalan ERDDAP \\__halaga Naname_ bago tumakbo ERDDAP . Halimbawa, gamitin ERDDAP \\ Pinawawalang - saysay ng_baseUrl ang&lt;halaga ng baseUrl&gt;. Ito'y maaaring makatulong kapag naglalagay ERDDAP™ na may lalagyan, yamang maaari mong ilagay ang pamantayang mga setting sa setup.xml at pagkatapos ay magtustos ng pantanging mga setting sa pamamagitan ng iba't ibang kapaligiran. Kung magbibigay ka ng lihim na impormasyon sa ERDDAP™ Sa pamamagitan ng paraang ito, tiyaking tiyakin na ang impormasyon ay mananatiling lihim. ERDDAP™ basahin lamang ang kapaligiran na pabagu - bago minsan sa bawat startup, sa unang segundo ng startup, kaya ang isang paraan upang gamitin ito ay: itakda ang iba't ibang kapaligiran, magsimula ERDDAP™ , maghintay hanggang sa ERDDAP™ ay sinisimulan, pagkatapos ay hindi pa kumpleto ang kapaligiran. Salamat kay Marc Portier.
         
    * IMPROVED: Ngayon, kung ang ilang file sa isang EDDTable Mula... Ang mga dataset ng talaksan na may maraming file ay may ilang napakahabang String na halaga, ang dataset ay mas mabilis na magkarga at tutugon sa mga kahilingan ng mas mabilis. Dati, ERDDAP™ ay maglalaan ng maraming espasyo para sa mga mon at max String na halaga sa mga file na iniimbak na may file information para sa gayong mga datasets. Napakalaki ng resultang talaksan, anupat ito'y naisulat at unti - unting binasa. Salamat sa OBIS.
         
    * IMPROBLE: Ngayon, ERDDAP™ ay mas mabuting trabaho ng pag-interpret ng mga hindi karaniwan at hindi tanggap na karakter sequences sa CSV files. Salamat sa OBIS.
         
    * FIX: Pagkatapos ng isang taon ng kaguluhan kay Cassandra, sa wakas ay matagumpay kong nailuklok si Cassandra (v2) muli at sa gayon ay muling natakbo ang mga pagsubok kasama si Cassandra v2. Kaya ngayon ay mas may pagtitiwalang masasabi ko iyan ERDDAP™ ay nagtatrabaho sa Cassandra v2 at v3. Salamat sa ONC.
         

## Bersiyong 2.12{#version-212} 
 (inilabas 2021-05-14) 

*    **Bagong mga Katangian at Pagbabago (para sa mga gumagamit) :** 
    * BUG FIX: Kung ikaw ay nasa subscription blacklist, ngayon ay hindi ka maaaring humiling ng isang listahan ng iyong mga suskripsiyon.
         
*    **Mga Bagay ERDDAP™ Kailangang Malaman at Gawin ng mga Administrador:** 
    * DOKO: BAGO: sistema na awtomatikong limitahan ang kakayahan ng masasamang gumagamit at masyadong agresibong mga lehitimong gumagamit na gumawa ng maraming sabay - sabay na kahilingan na magpapahina sa paggawa ng sistema para sa ibang gumagamit. May 3 bagong opsyonal na tag sa datasets.xml na maaari/dapat idagdag pagkatapos ng&lt;Larawan ng graphBlackgroundCor&gt; :
```
        <ipAddressMaxRequests></ipAddressMaxRequests>  <!-- current default=7 -->
        <ipAddressMaxRequestsActive></ipAddressMaxRequestsActive>  <!-- current default=2 -->
        <ipAddressUnlimited></ipAddressUnlimited>  <!-- default=empty -->  
```

Para sa higit pang impormasyon, tingnan ang [Mga EPAddressMaxRequest](/docs/server-admin/datasets#ipaddressmaxrequests) . ERDDAP™ ngayon ay inililimbag din ang "Numero ng mga walang - katulad na tagagamit (mula noong magsimula) " sa status.html page.
Salamat sa tao sa Tsina na sumasalakay sa akin ERDDAP™ pagluluklok.
         
    * Palitan ang paggawi ng tsuper na Postgresql: Nang baguhin ko ang driver ng Postgresql, ang mga pangalan ng tudling sa talaan ng mesa na ginawa nina Postgresql at GenerateDatasetsXml ay nagbalik sa lahat ng itaas, sa halip na sa lahat ng mas mababang case, gaya ng dati. Hindi ko alam kung iyan ay makaaapekto sa ibang bagay yamang kadalasang itinuturing ng mga database ang mga pangalang iyon na hindi sensitibo. Ang aking test dataset ay gumagana pa rin nang tama. Subalit kung ang iyong dataset ay hihinto sa paggawa nito ERDDAP™ update, ito ang posibleng dahilan upang maunang ipagpatuloy.
         
    * BUG FIX: ERDDAP™ ang pribadong talaksan ng AWS S3 sa tamang paraan. May iba pang mga kaugnay na pagpapabuti sa paghawak ng mga talaksang AWS S3. Salamat kina Michael Gangl at Dylan Pugh.
         
    * BAGO: EDDGrid Mula sa mga LancFile at EDDGrid Mga Ulila Maaari na ngayong bumasa ng datos mula sa mga "istruktura" sa .nc 4 at .hdf 4 files. Upang makilala ang isang variable na mula sa isang istraktura, ang&lt; sourceName &gt; kailangang gamitin ang format: _fullStructureName_ | _MemberName_, halimbawa group1/myStruct | ang aking Member . Salamat sa NRL.
         
    * BINAGO: Ngayon, kung ang kasalukuyang gamit sa memorya pati na ang kahilingang ito ay medyo mataas pa, ang mga set ng griddap nThreads para sa kahilingang ito sa 1. Kaya, ERDDAP™ Naiingatan ang memorya kapag kakaunti ang memorya. Salamat sa tao sa Tsina na sumasalakay sa akin ERDDAP™ pagluluklok.
         
    * BAGONG sistema upang subaybayan ang bilang ng bukas na mga file (na kinabibilangan ng mga tungtungan at iba pang mga bagay, hindi lamang mga file) sa Tomcat sa mga computer ng Linux. Kung ang ilang file ay may kamaliang hindi masasarhan, ang bilang ng mga bukas na file ay maaaring tumaas hanggang sa ito ay lumampas sa sukdulang pinapayagan at maraming talagang masamang bagay ang nangyayari. Kaya ngayon, sa Linux computer (ang impormasyon ay hindi available para sa Windows) :
        
        * Mayroong bagong "Open Files" column sa dulong kanan ng status.html web page na nagpapakita ng porsyento ng mga talaksang max na bukas. Sa Windows, ito ay nagtatanghal lamang "?".
        * Kailan ERDDAP™ Ay gumagawa ng impormasyon na sa dulo ng bawat pangunahing dataset reload, ito ay mag-print sa log. talaksang tinggil:
openFile CRE=_current_=_max_ %=_percent_
        * Kung ang persentahe ay &gt;50%, isang email ang ipinadadala sa ERDDAP™ Ang administrador at ang email Lahat Sa email addresss.
        
Upang malaman ang higit pa, o kung nakikita mo ang problemang ito sa iyong problema ERDDAP™ , tingnan [Napakaraming Opsiyon](/docs/server-admin/additional-information#too-many-open-files) .
Salamat sa tao sa Tsina na sumasalakay sa akin ERDDAP™ pagluluklok.
         
    * BAGO: Marami akong idinagdag na pagsusuri at paghawak ng "Too maraming bukas na files", kaya ang gawain ay humihinto lamang at nakikita ng gumagamit ang maling mensahe. Ang mga talaksang Data ay hindi na imarka bilang masama kung ang pagbasa sa mga ito ay nagbubunga ng isang "Too maraming bukas na files" error.
         
    * BAGO \\[ Malaking Direktorya \\] /badFilesFlag directory:
Kung maglalagay ka ng file sa directory na ito datasetID bilang pangalan ng talaksan (hindi mahalaga ang nilalaman ng talaksan) , ERDDAP™ ay mag - aalis ng mga bakterya .nc talaksan para sa dataset na iyon (kung mayroon) at muling ikarga ang dataset ASAP. Ito ang mga sanhi ERDDAP™ subukang ayusin muli ang mga files (Mali ba?) Namarka bilang masama. Salamat kay Marco Alba.
         
    * BINAGO: Sa simula, kung mayroon EDDGrid Mula sa... Ang talaksang dataset sa simula ay may 0 file sa listahan nito ng kilalang talaksang susi (e.g., ito ay isang bagong dataset) , pagkatapos ERDDAP™ Ang mga defensiya na nagkarga nito at naglalagay ng watawat upang ito ay maikarga ASAP matapos ang pangunahing loadDatasets. Ito ay nagpapabilis sa panimulang simulang pag-aaral kapag may mga bagong dataset.
         
    * BINAGO: FileVisitorDNLS.STAWS3 () at FileVisitorSubdir. tesTAWS3 () ; gamitin ngayon ang AWS v2 (hindi v1) SDK. Kaya ngayon ang Git ERDDAP™ Kasama na ngayon sa pamamahagi ang lahat ng kinakailangang file at hindi mo na kailangang manu - manong idagdag ang napakalaking v1 AWS SDK jary file.
         
    * BINAGO: Ginamit ko ang Maven para makita/tipunin ang dependencies (ng .jar files sa /lib) . Ang pagbabago tungo sa v2 ng AWS SDK ay nangailangan nito. Kakailanganin ito para sa iba pang inangkat na kodigo sa hinaharap. Isang malaking pasasalamat kay Kyle Wilcox na nagbigay ng pom.xml na nilikha at ginamit niya, na lumutas ng ilang problema para sa akin.
         
    * BINAGO: Ang classpath parameter (-p) ginagamit sa GenerateDatasetXml, DasDds at iba pang mga maliit na programa na kasama ang ERDDAP™ , at sa payo sa mga programmer ay mas simple ngayon at hindi na dapat magbagong muli yamang ito ay tumutukoy sa directory, hindi sa indibiduwal na mga file:
\\-cp classs;C:\\programs\\_tomcat\\lib\\servlet-api.jar; limb\\*−*
         (o ':' sa halip na ';' para sa Linux at Macs) .
         (Dapat sana'y nagawa ko na ito mga ilang taon na ang nakalipas nang ito'y maging isang mapagpipilian.)   
         
    * BAGO: GenerateDatasets Ang Xml ay may bagong opsiyon sa kagamitan: ang searchDuplicate Time na maghahanap sa pamamagitan ng isang koleksiyon ng mga grided .nc   (at nauugnay) upang mahanap ang mga files na may nadobleng halaga ng oras. Tingnan [mahanap Panahon](/docs/server-admin/datasets#findduplicatetime)   
         
    * BAGO: datasets.xml ay maaaring maglakip ngayon ng&lt;Pale&gt; tag na nangingibabaw sa&lt;Mga palect&gt; na halaga mula sa mga mensahe. (O bumabalik sa mga mensahe.xml value kung ito ay walang laman) . Ito'y nagpapangyari sa iyo na baguhin ang listahan ng makukuhang mga paleta samantalang ERDDAP™ ay tumatakbo. Gayundin, kung mayroon kang subdirectory sa cpfile ERDDAP™ directory, ERDDAP™ ang lahat ng \\*.pt files sa directory na iyon \\[ tomcat \\] /webapps/erddap/WEB-INF/ctfiles directory sa bawat pagkakataon ERDDAP™ magsimula. Magkasama, ang mga pagbabagong ito ay magpapangyari sa iyo na magdagdag ng mga paleta at magpatuloy ang mga pagbabago kapag nagkabit ka ng isang bagong bersiyon ng ERDDAP . Tingnan ang [Mga Dokumento](/docs/server-admin/datasets#palettes)   
Salamat kay Jennifer Sevadjian, Melanie Abecassis, at marahil sa iba pang CoastWatch.
         
    * BINAGO: [&lt;Mabagal na DownTroubleMillis&gt;] (/docs/server-admin/datasets#slowdown Romaillis) ay ginagamit ngayon para sa lahat ng bigong mga kahilingan, hindi lamang ng ilang uri.
         
    * BINAGO: Ang sinulid na RunLoadDatasets ay sumasabat ngayon sa sinulid na pandDatasets sa 3/4 na mga honodaset MaxMinutes kaya may higit na panahon para sa mga lickDataset upang mapansin ang pagkagambala at paglabas nang maganda. Mayroon ding higit at mas mabuting mga mensahe para rito.
         
    * BINAGO mula sa lumang bersyon ng Lucene hanggang v8.7.0.
         
    * Palitan: Mga email na ipinadala ng ERDDAP™ ngayon ay lumilitaw na may di - nagbabagong lapad.
         
    * Palitan: EDDGrid Sa ngayon, nakukuha na ng mga taga -File ang mga pamantayan ng axis pati na ang mga katangiang galing pa noong una | HULING talaksan, gaya ng itinakda&lt;metadata Mula&gt;. Salamat (hindi) kay Ken Casey, et al.
         
    * MAHIRAP na suporta para sa mga hindi tanggap na yunit na "degree\\_North" at "degree\\_East" na may kamaliang ginagamit ng kamakailang mga files (mula 2020-10-01) sa AVHR Pathfinder Version 5.3 L3-Collated (L3C) SST datasets (PsiPH53 sst d1day at cniPH53 sst n1 araw) . ERDDAP™ ay maaari na ngayong gawing pamantayan ang mga ito sa makatuwirang mga yunit. Salamat (hindi) kay Ken Casey, et al.
         

## Bersiyong 2.11{#version-211} 
 (inilabas 2020-12-04) 

*    **Bagong mga Katangian at Pagbabago (para sa mga gumagamit) :** 
    * BUG FIX: Inihagis ng Order byMean ang NullPointerException kung ang isang variable ay mayroon lamang isa ng \\_FillValue o nawawala ang\\_ Ang kahulugan ng pagpapahalaga. Ngayon ay wasto ang pakikitungo nito sa kalagayan. Salamat kay Marco Alba.
         
    * BUG FIX: May mga problema sa mga file ng teksto ng ODV na nilikha ng ERDDAP™ sa v2.10. Nalulutas ang mga problemang iyon. Salamat kay Shaun Bell.
         
    * BUG FIX: Sa loob lamang ERDDAP™ v2.10: Kung ang mga hangganan ng lat lon ay itinakda sa URL, ang kahon ng pagtatali ay hindi iginuhit sa mapa ng daigdig. Ngayon ay muli na naman. Salamat kay John Maurer.
         
*    **Mga Bagay ERDDAP™ Kailangang Malaman at Gawin ng mga Administrador:** 
    * BUG FIX: Sa loob lamang ERDDAP™ v2.10: Ang script files para sa ArchiveADataset, GenerateDatasets Hindi nagtagumpay sina Xml at DasDds dahil wala silang mga pagbabago sa komparatibo ng klase na idinagdag sa ERDDAP™ v2.10. Ngayon ay ginagawa nila. Salamat kay Marco Alba.
         
    * BAGO: Sa loob datasets.xml , maaaring mayroon ka na ngayong tag:
```
        <emailDiagnosticsToErdData></emailDiagnosticsToErdData> <!-- true (the default) or false -->  
```

Sa kasalukuyan, kung totoo (o kung ang tag ay walang laman, o kung ang tag ay wala sa talaksan) , kapag ang kahilingan ng gumagamit ay humantong sa NullPointerException, ERDDAP™ i-mail ang nakasalansang bakas sa erd.data at noaa.gov   (ang ERDDAP™ development team) . Ito'y dapat na ligtas at tiwasay yamang walang kompidensiyal na impormasyon (e.g., ang kahilingan) ay kasama sa email. Dapat gawin nitong posible na mahuli ang anumang malabo, ganap na di - inaasahang mga insekto na hahantong sa NullPointerException. Kung hindi, nakikita ng gumagamit ang mga eksepsiyon, subalit nakikita naman ito ng gumagamit ERDDAP™ Hindi, kaya hindi namin alam na may problema na kailangang ayusin.
        
Posible na ang tag na ito ay hahantong sa iba pa, katulad na impormasyon sa pagsusuri na ipinadadala sa koreo erd.data at noaa.gov sa hinaharap. Ang nilalaman ng email ay laging kakaunti at may kaugnayan sa mga bug, at hindi, halimbawa, gagamit ng impormasyon. Salamat kay Marco Alba.
         
        
    * BINAGO: Ngayon, karaniwang siksik na mga uri ng file ( .bz2 , .gz , .gzip , .tar , .tgz , .z , .zip ) ay ipinagbabawal din para sa mga kahilingang range. Ito ay tinitiyak sa pamamagitan ng&lt;Ang mga extension na NORangeRequests&gt; sa mga mensahe.xml.
         
    * KAALAMAN: Katulad ng sa ERDDAP™ 2.10, .nc Ang mga talaksang ml na sumusubok na palitan ang isang attribute, ay huwag baguhin ang attribute. Ito ay isang kilalang bug sa netcdf-java na iniulat ko at ayon sa kanila ay itatakda sa susunod na release ng netcdf-java.
         

## Bersiyong 2.10{#version-210} 
 (inilabas 2020-11-05) 

*    **Bagong mga Katangian at Pagbabago (para sa mga gumagamit) :** 
    * BAGO: Ang bago [Interpolate](https://coastwatch.pfeg.noaa.gov/erddap/convert/interpolate.html) Ang converter ay mahusay na nag - uugnay ng mga halaga mula sa mga halaga ng isang grided dataset. Bilang gayon, ito ay lalo nang kapaki - pakinabang sa mga mananaliksik na gumagawa ng impormasyon tungkol sa mga hayop. Ang converter na ito ay nasa isang mesa na may mga hanay ng latitud, longhitud, at panahon (at marahil ang iba pang haligi) at ibabalik ang isang mesa na may karagdagang mga haligi na may interpolated na mga halaga. Kaya, kahawig ito ng popular [Xtraktomatic](https://coastwatch.pfeg.noaa.gov/xtracto) Ang script na orihinal na nilikha ni Dave Foley, ngunit nagbibigay ng kalamangan sa pagpoproseso ng hanggang 100 puntos kada kahilingan. Salamat kina Dave Foley at Jordan Watson ( NMFS ) .
         
    * IMPROVED: Ang Advanced Search ngayon ay mahigpit para sa mga non-.html requests. Maghahagis na ito ngayon ng mga eksepsiyon sa mga kahilingan na may permanenteng mga pagkakamali (e.g., mga kahilingan kung saan ang mainLat &gt; maxLat) o pansamantalang mga pagkakamali (e.g., humiling ng isang standard\\_name na hindi umiiral) . Para sa mga kahilingan ng .html, ang Advanced Search ay hindi nagbabago: tulad ng sa mga pagsaliksik ng Google, ginagawa nito ang pinakamahusay at tahimik na mga fix o hindi pinapansin ang mga pagkakamali. Salamat sa Mayamang Signell.
         
    * IMPROVED: Ang mapa sa Advanced Search page ay mas malaki na ngayon (kailangan mo pa ring mag - usisa, ngunit bawasan ang pag - inom) at mas tumpak (ngunit hindi pa rin sakdal) . Salamat kay John Maurer.
         
    * IMPROVED: The "Lear land mask" setting on Make A Graph web page and the &.land=... setting in URLs na humihiling ng mapa ngayon ay sumusuporta sa dalawa pang opsyon:
"outline" lamang ang humihila sa balangkas ng landmask, mga hangganang pampolitika, lawa at ilog.
"off" ay walang naguguhit na anuman.
Tingnan ang [&.land=... dokumentasyon](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands) .
Salamat kay John Maurer.
         
    * IMPROVE: Mga Graph at mapa na nilikha ng ERDDAP™ ay maaari na ngayong gumamit ng tatlong bagong uri ng marker: Ang Liwasang Walang Hangganan, Walang Hanggan na Puno, ay Di - Balutan ng Hangganan. Ang kodigo para dito ay naiabuloy ni Marco Alba ng ENT / EMODnet Physics. Salamat kay Marco Alba.
         
    * BAGO: "files" ang simple lamang Mga tugon ng tipo ng talaksan (.csv, .htmlTable , .itx , .json , .jsonlCSV1 , .jsonlCSV , .jsonlKVP , .mat , .nc , .nccsv , .tsv , o .xhtml .) , e.g., [ https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv ](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv) .
Salamat kay Kyle Wilcox.
         
    * IMPROVED: Ang mga URL na nililikha kapag gumagamit ang gumagamit ng isang Date Access Form (.html) o Isang Make-A-Graph (.grap) web page ngayon ay wastong porsyento-encode ng mga character \\[ at \\] . Ito ay gumagawa sa mga URL na medyo mahirap basahin ng mga tao, ngunit mas mainam mula sa isang web-security perspektibo. Ang mga administrador ngayon ay may opsiyon na maglagay ng relaks naQueryChars= ' \\[  \\]  | ' sa talaksang Tomcat server.xml (hindi gaanong tiwasay) o hindi (mas tiwasay) .
Salamat kay Antoine Queric, Dominic Fuller-Rowell, at iba pa.
         
    * BAGO: Kung ang isang kahilingan sa isang EDDTable datasets ay kinabibilangan ng &add Iba - iba Saan (_atribute Pangalan, attribute Halaga_) , ERDDAP™ ay magdadagdag ng lahat ng mga variable na may _attribute Pangalan=atribute Halaga_ sa talaan ng mga hiniling na variables.
Tingnan ang [&add Iba - iba Kung Saan ang mga Dokumento](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#addVariablesWhere) . Salamat kay Aurelie Briand, et al.
         
    * BINAGO: ERDDAP™ ngayo'y tumatanggi sa mga kahilingan sa /file/ .nc o .hdf mga file. Huwag sikaping makipag - ugnayan sa malayo .nc o .hdf mga talaksan na para bang ang mga ito ay lokal na mga file. Ito ay kakila - kilabot sa kawalang - kakayahan at kadalasang nagiging sanhi ng iba pang problema. Sa halip:
        * Gamitin(OPeN)DAPsoftware ng kliyente para makipag-ugnayan ERDDAP ' DAP mga serbisyo para sa dataset na ito (na may /griddap/ o / tabledap / sa URL) . Iyan ang dahilan DAP ay para sa.
        * Gamitin ang dataset's Date Access Form upang humiling ng isang subset ng datos.
        * Kung kailangan mo ang buong file o paulit-ulit na pag-akses sa loob ng mahabang panahon, gamitin curl , wget , o ang iyong browser upang i - download ang buong file, pagkatapos ay kunin ang impormasyon mula sa iyong lokal na kopya ng file.
             
    * IMPROVE: ang .odv Ang option ng Txt output ay muling isinulat upang suportahan ang bagong bersyon ng ODV .txt ang mga file at upang suportahan ang tamang representasyon ng trajectory, timeseries, at profile data.
         
    * IMPROVED: Ngayon, ang mga termino sa paghahanap sa dobleng mga sinipi ay binibigyang - kahulugan bilang isang json string, kaya maaari silang magkaroon ng mga titik na nag - uugnay. Bukod sa iba pang mga bagay, ito'y nagpapangyari sa iyo na maghanap ng eksaktong posporo para sa isang katangian, e.g., "institutation= NOAA  \\n "Hindi makatugma ng dataset ang institusyon= NOAA   NMFS . Salamat kay Dan Nowacki.
         
    * IMPROVED: Sa iba pang lugar, ang lumulutang na mga numero ng puntos (lalo na ang mga palutang na ginawang doble) ay lumilitaw ngayon bilang isang bahagyang mas bilog na bersyon ng bilang sa karagdagang mga lugar, e.g. isang lumulutang na dating ipinapakita bilang isang dobleng katulad ng 32.279987796875, ay maaaring lumitaw ngayon bilang 32.28. Salamat kay Kyle Wilcox.
         
    * BUG FIX: hindi tama ang pagbasa sa mga di-pirmadong audio file. Ngayon ang mga ito ay binabasa nang wasto.
         
*    **Mga Bagay ERDDAP™ Kailangang Malaman at Gawin ng mga Administrador:** 
    * BABALA: Sa unang pagkakataon na tumakbo ka ERDDAP™ v2.10, ang ilang datasets batay sa lokal na data files ay magkarga ng **ang mismong** mabagal sapagkat ERDDAP™ Kailangang baguhin ang database ng file information nito. Pagkatapos ng mabagal na muling pagkarga, mabilis silang magkarga, gaya ng dati. Pakisuyong maging matiyaga.
         
    * MGA TUNGUHIN MONG MABUTI:
        * Kapag unang tumakbo ka ng v2.10, ang ilang datasets ay maaaring hindi magkarga dahil ERDDAP™ ay mas mahigpit ngayon tungkol sa ilang metadata. Gaya ng dati, ERDDAP™ Mag - e - e - mail ka ng Daily Report kung kailan ito unang mag - a - up. Kasama riyan ang mga maling mensahe para sa bawat datos na hindi nagkakarga. Basahin ang maling mga mensahe upang alamin ang mga problema. Kadalasan, kailangan mo lamang gumawa ng kaunting pagbabago sa metadata ng dataset upang malutas ang problema.
             
        * Nasa datasets.xml , paghahanap&lt; sourceName [=] (pansinin ang '=' sign, na nagpapakilala sa isang [nakatakdang-halaga sourceName ](/docs/server-admin/datasets#fixed-value-sourcenames) ) . Para sa karamihan ERDDAP™ Mga setup, bihira ang mga ito. Kung alinman sa mga pamantayan pagkatapos '=' ang mga kuwerdas (hindi numero) , ngayon ay nakapaloob mo na ang kuwerdas sa dobleng mga sinipi. Halimbawa,
Bago:&lt; sourceName &gt;=KZ401&lt;/ sourceName &gt;
Pagkatapos:&lt; sourceName &gt;="KZ401"&lt;/ sourceName &gt;
             
        * BAGO: May bagong opsyonal na tagpo sa setup.xml,&lt;defaultAccessibleViaFiles&gt;, na nagtatakda ng default&lt;MaaccessViaFiles&gt; para sa bawat isa sa mga datasets. Mali ang default para sa bagong tag na ito, na gumagaya sa dating tag ERDDAP™ paggawi. Ang mas mababang level setting na ito ay maaaring labis na mapamahalaan ng ibinigay na dataset's&lt;Madaling makuhang mga "ViaFile "&gt; setting.
            
PINAHAHALAGAHAN (sapagkat may mga gumagamit na nagnanais nito) :
Kung nais mong gawin ang lahat ng EDD... Mula sa mga dataset na makukuha sa pamamagitan ng sistema ng files, pagkatapos ay mula saFiles
            
            1. Idagdag ang tag na ito sa iyong setup.xml file:
```
                <defaultAccessibleViaFiles>true</defaultAccessibleViaFiles>
```
            2.   (Mapagpipilian) Alisin ang lahat ng
```
                <accessibleViaFiles>true</accessibleViaFiles>
```
sa loob datasets.xml yamang ang default ay totoo na ngayon.
                 
        * Idagdag ang \\_FillValue Attributes:
             ERDDAP™ dating may default \\_FillValue para sa lahat ng integer variables: ang pinakamalaking halaga ng uri ng datos (e.g., 127 para sa byte variables) . Ngayon ay hindi na. Upang maiwasang ipakita ang mga pamantayang ito bilang mga data values (hindi nawawalan ng mga pamantayan) , kailangang malinaw na banggitin mo ang mga ito sa pamamagitan ng \\_FillValue na mga katangian. Mula ngayon, sa tuwing magsisimula ka ERDDAP™ , ito ay magpapadala sa administrador ng email na may .csv table na may listahan ng integer source variables na walang \\_FillValue o missing\\_value Mga katangian, at ang iminungkahing bagong \\_FillValue na mga katangian. Tingnan [Idagdag ang \\_Fill Mahalagang mga Katangian](/docs/server-admin/datasets#add-_fillvalue-attributes) para sa higit pang impormasyon at mga tagubilin.
             
        * Kung magtitipon ka ERDDAP™ , kailangan mong baguhin ang classpath parameter sa javac command lines upang magdagdag ng reperensiya sa mga bagong jack na ito's: lib/commons-jexl.jar;lib/aws-java-sdk.jar; lib/jackson-annotations.jar;lib/jackson-core.jar;lib/jackson-dabind. .
             
    * BINAGOD: Ang Tomcat 9 ngayon ang iminungkahing bersiyon ng Tomcat para sa ERDDAP . Ang pinakabagong bersyon ng Tomcat 8.5+ ay mainam din para sa ngayon. Naglinis kami ERDDAP ' [Mga instruksiyon sa pagkakabit ng Tomcat](/docs/server-admin/deploy-install#tomcat) .
        
Ang pinakabagong bersiyon ng Java 8 (hindi Java 9, 10, 11, ...) mula sa [PAG - Aampon](https://adoptopenjdk.net/) nananatiling inirerekomendang bersiyon ng Java para sa ERDDAP . Java 8 ay may Long Terme Support mula sa AmponJDK kaya nananatiling ligtas na gamitin, ngunit tandaan na makuha paminsan-minsan ang pinakabagong bersyon nito para sa seguridad kadahilanan.
        
    * BAGO: Script SourceNames / Derived Variables in Tabiular Datasets
Ang EDDTable FromFiles, EDDTable FromDatabase, at EDDTable FromFileNames datasets ay maaari na ngayong isama ang mga ekspresyon at mga iskrip sa mga sourceName . Dahil dito ay nakagagawa ka ng mga bagong variable batay sa umiiral na mga variable sa source files. Ang kalkulasyon para sa isang bagong variable ay ginagawa sa loob ng isang hanay ng mga resulta, paulit - ulit para sa lahat ng hanay. Halimbawa, upang gumawa ng longhitud na iba - iba ang halaga sa range -180 - 180° mula sa iba't ibang pamantayan sa 0 - 360°:
        &lt; sourceName &gt;=Math2.anglePM180 (hanay.columnDouble ("lon") ) &lt;/ sourceName &gt;
Para sa mga detalye, tingnan [Mga Script SourceName](/docs/server-admin/datasets#script-sourcenamesderived-variables)   
Salamat kay Bob Simons (sino ang nagplano nito noon ERDDAP™ v1.0 at sa wakas ay nakasumpong ng paraan upang ipatupad ito) , Kevin O'Brien, Roland Schweitzer, John Maurer, at ang aklatan ng Apache JEXL sa paggawa ng talagang mahirap na bahagi (at ginagawa ito nang mahusay) .
         
    * BAGO: Walang lagdang mga uri ng datos (ubyte, umikli, uint, ulong) ngayon ay suportado. Pansinin na maraming uri ng talaksan (e.g., .das, .dds, .nc 3) Huwag suportahan ang lahat ng bagong uri ng datos na ito. Tingnan ang [Talaan ng mga Nilalaman Uring Dokumento](/docs/server-admin/datasets#data-types) para sa mga detalye kung paano ERDDAP™ ang mga pagkakaibang ito. Kapansin - pansin, yamang(OPeN)DAP, lalo na ang .dds tugon, ay hindi sumusuporta sa nilagdaang mga byte, longs, o mga ulong, maaaring nais mong gamitin ERDDAP ''s tabular representasyon ng .das at .das gaya ng makikita sa . http .../erddap/ **Loob** /_ datasetID _html web page (Halimbawa, [ https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html ](https://coastwatch.pfeg.noaa.gov/erddap/info/cwwcNDBCMet/index.html)  ) na makukuha mo rin sa ibang uri ng talaksan o sa .nccsv Ang tugon ng Metadata (Halimbawa, [ https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/cwwcNDBCMet.nccsvMetadata)  ) , parehong sumusuporta sa lahat ng mga uri ng datos sa lahat ng mga sitwasyon.
        
BABALA: Para sa mga dataset na apektado ng pagbabagong ito, posibleng makita mo ang mga problema sa dataset sapagkat ang datos na ito ERDDAP™ maaaring iba ang galing sa babasahin (e.g., ang mga variable na dating binabasa bilang mga pirmadong integers ay maaari na ngayong basahin bilang mga hindi napirmahang integers) . Kabilang sa mga resultang problema ang: mga bagong file na hindi nadadagdagan sa dataset, at/o pagkakamali kapag sinubukan mong i-akses ang datos. Kung may problema ang dataset, ang unang dapat subukin ay ang [maglagay ng isang mahirap Bandila](/docs/server-admin/additional-information#hard-flag) para sa dataset. Kung hindi nito malutas ang problema, kung gayon kailangan mong tingnan ang log. Tawag upang makita ang maling mga mensahe, saliksikin ang mga maling mensahe datasets.xml para sa dataset, at/o marahil ay rerun lumilikha ngDatasets.xml para sa dataset.
Dahil sa netcdf-java 5.x (na nagtulak sa isyu) at ang darating na CF 1.9.
        
    * IMPROBLE: Mayroon na ngayon [mas mabuting dokumentasyon/advice](/docs/server-admin/datasets#s3-buckets) kung paano lilikha ng isang dataset mula sa mga file sa AWS S3 backs. Salamat kay Mikas Wengren.
         
    * BINAGO: May ilang pagbabagong nauugnay sa "files" sistema.
        * Ang kodigo upang pangasiwaan ito ay muling isinulat upang magamit ng mas maraming klase.
             
        * BAGO: Ang mga kahilingan para sa mga listahan ng directory ay maaari na ngayong humiling na ang tugon ay isa sa mga pamantayang simpleng uri ng mesa sa pamamagitan ng paglalagay sa ninanais na extension ng file: .csv, .htmlTable , .itx , .json , .jsonlCSV1 , .jsonlCSV , .jsonlKVP , .mat , .nc , .nccsv , .tsv , o .xhtml ). Halimbawa,
             [ https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv ](https://coastwatch.pfeg.noaa.gov/erddap/files/jplMURSST41/.csv)   
Salamat kina Kyle Wilcox at Shane St Savage.
             
        * IMPROVE: Ngayon, Generate Mga Data Hindi kasama ang Xml&lt;MaaccessViaFiles&gt; tag sa output. Ang palagay ay ang dataset ay aasa sa halaga ng bago&lt;defaultAccessibleViaFiles&gt; tag sa setup.xml. Tingnan [Makukuha Mga ViaFile](/docs/server-admin/datasets#accessibleviafiles) .
             
        * IMPROVED: Karagdagang mga uri ng dataset na ngayo'y sumusuporta sa makukuhang impormasyon ViaFiles: EDDGrid Side Side, EDDGrid Pag-aalsa ng Aggregate, EDDGrid Mula saErddap, Ang EDDTable Mula saErddap, EDDGrid Mula sa Mapagkakatiwalaan, Mapagkakatiwalaan Mula sa EDDGrid , at EDDGrid Mula sa Etopo. Para sa mga ito, ang mga file mula sa isang ibinigay na remote/child dataset ay makukuha lamang kung ang parehong magulang at ang remote/child dataset ay nakuha na Ang mga ViaFile ay nagkatotoo (marahil sa pamamagitan ng&lt;defaultAccessibleViaFiles&gt;). Salamat kina Damian Smyth at Rob Fuller.
             
        * DO / RECOMMENDATION: Iminumungkahi namin na gawing madaling makuha ang lahat ng kaugnay na mga dataset sa pamamagitan ng sistema ng mga file&lt;defaultAccessibleViaFiles&gt; upang magkatotoo sa setup.xml dahil may isang grupo ng mga gumagamit na ito ang mas gustong paraan upang makuha ang data. Kabilang sa iba pang mga dahilan, ang "files" Ginagawang madali ng sistema para sa mga gumagamit na makita kung aling files ang makukuha at kapag ito ay huling nagbago, sa gayon ay ginagawa itong madali para sa isang gumagamit na panatilihin ang kanilang sariling kopya ng buong dataset. Kung karaniwan nang ayaw mong gumawa ng mga dataset na makukuha sa pamamagitan ng sistema ng mga file, magtakda ng&lt;defaultAccessibleViaFiles&gt; upang magsinungaling. Sa alinmang kaso, gamitin lamang&lt;Madaling makuhang "ViaFiles&gt; " para sa ilang datasets na mga eksepsiyon sa pangkalahatang patakaran na itinakda ng&lt;defaultAccessibleViaFiles&gt; (Halimbawa, kapag ginamit ang dataset .nc Mga file, na talagang hindi kapaki - pakinabang sa mga gumagamit) .
             
    * IMPROVED: Ngayon, kung ang isang source dataset ay may CF grid\\_mapping information, lumikha ng Mga Data Ang Xml para sa naka - grid datasets ay magdaragdag ng impormasyon sa buong daigdig&lt;idagdag ang Atts&gt;, at ang impormasyon ay idaragdag sa globo&lt;source Atts&gt; Tuwing magbasa ng datos mula sa file. Ang impormasyon ay lilitaw sa pandaigdig na mga katangian ng dataset bilang isang set ng mga katangian na may prefix grid\\_mapping\\_ .
         
    * IMPROVE: Suportahan ang mga grupo kapag nagbabasa .nc 4 (at sa isang antas .hdf 5) mga file. Karaniwan na, isang ERDDAP™ Ang dataset ay itatayo mula sa mga variable sa isa sa mga grupo ng file. Gayundin, ang GenerateDatasets Xml para sa EDDGrid Mula sa mga LancFile at EDDGrid Mga Ulila Hindi pa nakabuklat ngayon ay humihiling ng isang "grupo" (e.g., "para sa kahit anong/lahat ng grupo, "SomeGroup", "SomeGroup/someSubGroup", o "ilan" \\[ root \\] " para lamang sa grupong ugat) . Salamat kina Charles Carleton at Jessica Hausman.
         
    * IMPROVED: GenerateDatasets Xml para sa EDDGrid Mula sa mga LancFile at EDDGrid Mga Ulila Ang hindi pa nakabuklat ngayon ay sumusuporta sa isang opsyonal na "DimensionsCSV" parameter na nagpapahintulot sa iyo na magtakda ng mga pinagkunang pangalan ng dimensiyon na nais mong gamitin ng dataset na ito. Gamitin ang "" upang makuha ang mga variables na gumagamit ng pinaka dimensiyon, tulad ng dati. Gayundin, isang kaugnay na maliit na bug na nangyari sa ganitong uri ng talaksan ay nakapirme na ngayon. Salamat kay Sujal Manandhar.
         
    * BUG FIX: GenerateDatasets Xml ay wastong nagtatala ngayon ng "EDDTable FromJsonlCSVFiles". (hindi "Mabibilis Mula saJsonlCSV".) bilang isa sa mga pagpipilian ng EDDType. Salamat kay Andy Ziegler.
         
    * IMPROBLE: EDDGrid Mga Ulila Hindi pa nakabuklat ngayon ang mga "units" na katangian sa pamantayan/"canonical" na mga udunit (Ang paraang katulad ng Units converter) . Halimbawa, "meter per second" , "meters/second" , "m.s^-1" , at "m s-1" lahat ay magiging "m s-1" . Salamat kay Andy Ziegler.
        
BABALA: Posibleng magdulot ito ng mga problema sa ilang umiiral na dataset (e.g., ay sanhi ng mga bagong files na may tatak na "masama") . Kung oo, [maglagay ng isang mahirap Bandila](/docs/server-admin/additional-information#hard-flag) para sa dataset upang ang lahat ng mga source file ay muling basahin sa bagong sistema.
        
    * IMPROVE: Ngayon, isang variable'&lt; sourceName &gt; ay maaaring magtakda ng tiyak na halaga ng =NaN at ang variable ay maaaring magkaroon ng isang actual\\_range Sabihin kung alin ang espesipikong range. Ito kung minsan ay kapaki - pakinabang upang magkaroon ng dataset (Partikular na ang EDDTable FromFileNames dataset) maaaring magkaroon ng dummy variable (s)   (e.g., latitud, longhitud, panahon) taglay ang permanenteng mga pamantayan ng NaN, subalit may bisa actual\\_range   (na itinakda ng attribute) . Pagkatapos, sa Advanced Search ang isang gumagamit ay maaaring maghanap ng datos na may datos sa isang espesipikong latitud, longhitud, time range at ang dataset na ito ay makapagsasabing ito ay may kaugnay na datos (bagaman lahat ng aktuwal na hanay ng datos ay magpapakita ng NaN) . Tingnan ang [nakapirmeng dokumento hinggil sa halaga](/docs/server-admin/datasets#fixed-value-sourcenames) .
Salamat sa Biddle ng Mathew.
         
    * BAGO: Ngayon, ang datasets.xml Tala ng Isang EDDTable FromAsciiFiles o EDDTable FromColumnarAsciiFiles dataset ay maaaring isama ang isang tag na nagsasabi ng ERDDAP™ upang ipagwalang-bahala ang lahat ng mga linya sa itaas ng talaksan hanggang at kasama ang linya na tumutugma sa espesipikong regular na ekspresyon. Halimbawa,
        &lt;Hindi Mag-Header toRegex&gt;\\*\\*\\*HEADER.\\*&lt;/skipHeader toRegex&gt;
ay magwawalang - bahala sa lahat ng linya hanggang sa at kasali na ang isang linya na nagsisimula "\\*\\*\\* ALAS NI HEADER". Tingnan ang [&lt;Katataposan Header toRegex&gt; dokumentasyon] (/docs/server-admin/datasets#skipheadereogex) .
Salamat kay Eli Hunter
         
    * BAGO: Ngayon, ang datasets.xml Tala ng Isang EDDTable FromAsciiFiles o EDDTable FromColumnarAsciiFilesdaset ay maaaring isama ang isang tag na nagsasabi ng ERDDAP™ upang ipagwalang - bahala ang lahat ng mga linya sa salansan na katugma ng espesipikong regular na ekspresyon. Halimbawa,
```
        <skipLinesRegex>#.\\*</skipLinesRegex>  
```

ang lahat ng linya na nagsisimula sa "#". Tingnan ang [&lt;TriplesRegex&gt; dokumentasyon] (/docs/server-admin/datasets#skiplinesregex) .
Salamat kay Eli Hunter.
         
    * BAGO: Ang datasets.xml Maaring isama na ngayon ang &add para sa anumang EDDTable dataset Iba - iba Saan (_attributeNamesCSV_) . Kung gayon, ERDDAP™ ay magdaragdag ng isang widget para sa bawat isa sa espesipikong attribute Mga pangalan ng dataset's Date Access Form (.html web page) na gawing madali para sa mga gumagamit na magdagdag ng &add Iba - iba Saan (_atribute Pangalan, attribute Halaga_) sa kahilingan.
Tingnan ang [&add Iba - iba Kung Saan ang mga Dokumento](/docs/server-admin/datasets#addvariableswhere) .
Salamat kay Aurelie Briand, et al.
         
    * BAGO Ikatlong-Party Kasangkapan: ERDDAP -lint
         ERDDAP -lint ay isang programa mula sa Rob Fuller at Adam Leader na mas mabuti sa Irish Marine Institute na magagamit mo upang pagbutihin ang metadata ng iyong katawan ERDDAP™ mga datos. ERDDAP -lint "mga tuntunin at isang simpleng static web application para sa pagtakbo ng ilang pagsubok laban sa iyong beripikasyon ERDDAP™ server. Lahat ng mga pagsubok ay pinapatakbo sa web browser." Tulad ng [Walangix/Linux lint tool](https://en.wikipedia.org/wiki/Lint_(software) ), maaari mong baguhin ang umiiral na mga tuntunin o magdagdag ng bagong mga tuntunin. Tingnan [ ERDDAP -lint](https://github.com/IrishMarineInstitute/erddap-lint) para sa higit pang impormasyon.
        
Ang kasangkapang ito ay lalo nang kapaki-pakinabang sa mga dataset na nilikha mo mga ilang panahon na ang nakaraan at ngayon ay nais mag-up-to-date na may iyong kasalukuyang metadata na mga kagustuhan. Halimbawa, ang unang mga bersiyon ng GenerateDatasets Hindi nagsikap si Xml na lumikha ng buong mundo creator\\_name , creator\\_email , manlilikha\\_type, o creator\\_url metadata. Puwede mong gamitin ERDDAP -lint upang matukoy ang datasets na kulang sa mga metadata attributes na iyon.
        
Salamat kina Rob at Adam sa paglikha ng kasangkapang ito at sa pagpapagamit nito ERDDAP™ pamayanan.
        
    * BAGO: Ngayon ay okay na kung ang ilan sa mga files ay nasa loob ng isang file EDDGrid Mula saFiles ang dataset ay walang lahat ng dataset's variables. Ang mga file ay isasama na parang may variables (na may lahat ng nawawalang pamantayan) .
Salamat kina Dale Robinson at Doug Latornell.
         
    * BAGO: May bagong mga estadistika sa paggamit sa log file at sa Daily Report upang tulungan ang mga administrador na makilala ang mga gumagamit na nagiging sanhi ng mga problema sa memorya. Ang mga estadistika ay pinanganlang "OutOutMemory (Laki ng Array) ", "OutMemory (Napakalaki) ", at "OutMemory (Napakalaki) ". Ipinapakita nito ang mga IP adres ng mga gumagamit na gumawa ng mga kahilingan sa mga kategoryang ito at ang bilang ng mga kahilingan nila. Kung walang mahihirap na kahilingan, ang mga estadistikang ito ay hindi lilitaw. "OutMemory (Laki ng Array) " at "OutMemory (Napakalaki) " Ang mga kahilingan ay karaniwang hindi problema sapagkat ang mga kahilingan ay napakalaki anupa't ang mga kahilingan ERDDAP™ ang mabilis na nakahuli sa kanila at nagbalik ng maling mensahe. Ang "OutMemory (Napakalaki) " Ang mga kahilingan ay mas mapanganib sapagkat ERDDAP™ ay gumawa ng ilang pagsisikap bago nito natanto na walang sapat na memorya na makukuha sa kasalukuyan upang pangasiwaan ang kahilingan (Bagaman ang problema ay maaaring iba pang kahilingan bago ang mga kahilingang ito) .
        
Mayroon ding mga bagong statistics na pinangalanang "Large Request, IP address" na nagpapakita ng IP adress ng mga gumagamit na gumawa ng malalaking kahilingan (Sa kasalukuyan, nakaklad .nc &gt; mga talaksan 1GB) .
        
Gayundin, ang time series table sa status.html page ngayon ay kinabibilangan ng isang "memFail" column na nagpapakita ng bilang ng mga kahilingan na nabigo sa "Out OfMemory (Napakalaki) " Mga pagkakamali sapol nang huling pangunahing mga Daket ng Pasan. Anumang bilang maliban sa 0 dito ay sa paano man isang dahilan na dapat ikabahala.
Salamat kay Bob Simons.
        
    * BAGO: Ang bagong bersiyon ng Hyrax ang mga talaan ng directory na iba kaysa dati. ERDDAP™ ay maaari na ngayong basahin ang luma at bagong mga talaan ng directory.
         
    * BAGO: Muling magkarga ang Dataset at ang mga tugon ng gumagamit nito na nangangailangan ng &gt;10 segundo bago matapos (Matagumpay o Matagumpay) ay minarkahan ng " (&gt;10s&#33;) ". Sa gayon, mahahanap mo ang log.txt file para sa pariralang ito upang mahanap ang mga dataset na mabagal na muling maikarga o ang request number ng mga kahilingan na mabagal matapos. Pagkatapos ay maaari kang tumingin nang mas mataas sa log.txt file upang makita kung ano ang problema sa dataset o kung ano ang kahilingan ng gumagamit at kung sino ito. Ang mabagal na dataset na mga karga at mga kahilingan ng gumagamit ay kung minsan nagbabayad ng buwis ERDDAP . Kaya ang pagkaalam nang higit tungkol sa mga kahilingang ito ay makatutulong sa iyo na makilala at malutas ang mga problema.
    * IMPROVED: Kapag nagbibigay ng bisa sa isang CF DSG dataset, ERDDAP™ ay tumitiyak ngayon na ang mga variable na may cf\\_role na mga katangian ay nasa katumbas na cdm\\_...\\_variables list at wala sa ibang cdm\\_...\\_variables lists. Halimbawa, kung ang isang timeseriesProfile dataset ay may "station\\_id" variable na may cf\\_role=timeseries\\_id attribute, kung gayon ang "station\\_id" ay dapat na nasa listahan ng cf\\_timeseries\\_variables, ngunit hindi dapat na nasa cf\\_profile\\_variables.
Salamat kay Mikas Wengren.
         
    * IMPROVED: 'Simplify' ay mas mabilis ngayon, gumagamit ng mas kaunting memorya, at maaaring bumalik sa LongArray. Salamat Unidata .
         
    * IMPROBLE: Ang mabilis na restart ngayon ay lubhang mas mabilis para sa EDDTE From (Hinango) Mga Boses (Maliban sa EDDTable FromNcCFililes at EDDTable Mula sa mga InvalidCRAFile) sapagkat ginawa Inaasahan (at ibang lugar) ngayo'y basahin lamang ang metadata ng sampol na talaksan sa halip na basahin ang lahat ng impormasyon. Salamat kay Jessica Austin.
         
    * IMPROVED: Mayroon ngayong suporta para sa mga strando ng oras na may prekwensiya na mas malaki kaysa sa-the-milled kung ang karagdagang mga numero ay ang lahat ng 0's, e.g., "2020-05-22T01:02:03.45600000000Z". Salamat kay Yibo Jiang.
         
    * IMPROVED: GenerateDatasetsXml's EDD. enclusiveDestinationName na ginagamit upang alisin '('' at ang lahat pagkatapos. Ngayon ito ay nag-aalis (.\\*) tangi lamang kung iyan ang wakas ng ) sourceName . Ngayon ay inaalis din ito \\[ .\\* \\] Tangi lamang kung iyon ang wakas ng sourceName . Salamat kay Julien Paul.
         
    * IMPROVED: GenerateDatasets Ginagawa ngayon ng Xml ang iba't ibang bagay destinationName ang kakaiba sa pamamagitan ng pagdaragdag ng \\_2, \\_3, ..., kung kinakailangan. Salamat kay Julien Paul.
         
    * IMPROVED: Kapag ang Calendar2.parseDateTime parsecs dd, hh, o HH, ang unang 'digit' ay maaari na ngayong isang espasyo.
    * KAALAMAN: Pasimula sa ERDDAP™ 2.10, .nc Ang mga talaksang ml na sumusubok na palitan ang isang attribute, ay huwag baguhin ang attribute. Ito ay isang kilalang bug sa netcdf-java na iniulat ko at ayon sa kanila ay itatakda sa susunod na release ng netcdf-java.
         
    * MAHIRAP NA MGA LIKSIKTA: Gumawa ako ng wastong sistema para sa pagsubok para sa nasirang mga kawing sa loob ERDDAP™ web page, kaya dapat ay kakaunti na lamang ang sirang link (Kahit na lamang sa bawat release date - bagong sirang link ay madalas na lumilitaw) .
         
    * BUG FIX: Ang EDDTable FromHttp Get ay nabigo sa ilang uri ng mga kahilingan. Ngayon ay hindi na. Salamat kay Emma sa BODC.
         
    * BUG FIX: Upang matugunan ang ilang mga kahilingan, ang EDDTable ay gumawa ng isang pansamantalang talaksan para sa bawat hiniling na variable, na may pangalan ng talaksan na nagtatapos sa pangalan ng variable. Kung ang pangalan ng variable ay isa ring uri ng compression (e.g., .Z) , ERDDAP Subukan (at nabibigo) upang i-decompress ang temporary file. Ngayon ang mga pansamantalang pangalan ng talaksan ay nagtatapos sa ".temp". Salamat sa Biddle ng Mathew.
         
    * BUG FIX: GenerateDatasetsXml at Calendar2.convertTo Java Petsa Mas malamang ngayon na hindi na makagawa ng maling pagbabago ang Format kapag sinisikap na ayusin ang isang posibleng hindi tanggap na format ng oras ng petsa. Kapansin-pansin, walang auto-nagpapahiwatig na dateTime format ay babaguhin. Salamat sa Biddle ng Mathew.
         
    * BUG FIX: Kung may pagkakamali habang nakukuha ang nilalaman mula sa isang malayong URL, at kung ang error saStream ay siksik, ERDDAP™ ang maling mensahe. Salamat kay Bob Simons.
         
    * BUG FIX:&lt;Ang subscriptoTRemoteErddapDataset&gt; ay hindi ikinapit nang ang EDD... Mula saErddap dataset ay isang child dataset. Ngayon ay gayon nga. Salamat kay Chris Romsos.
         
    * BUG FIX: GenerateDatasets Ang Xml ay hindi na nag-iisip ng isang pinagmulang iba't ibang pangalan na nagsisimula sa "latin" ay maaaring latitud. Salamat kay Vincent Luzzo.
         
    * BUG FIX: Ngayon, isang OutOfMemoryErdor habang nagbabasa ng isang data file habang nagpoproseso ng kahilingan ng gumagamit ay hindi dahilan upang magdagdag ng file sa talaan ng BadFiles. Salamat kay Bob Simons.
         

## Bersiyong 2.02{#version-202} 
 (inilabas noong 2019-08-21) 

*    **Bagong mga Katangian at Pagbabago (para sa mga gumagamit) :** 
    * BAGO: Mayroon na ngayong dalawang paraan upang hanapin ang maraming impormasyon ERDDAP s. Ang mga ito ay nagtatrabaho ng bahagyang naiiba at may iba't ibang mga interface at mga pagpipilian.
        
        *    [SearchMultiple ERDDAP s.html](/SearchMultipleERDDAPs.html) mula kay Bob Simons/ NOAA   NMFS   SWFSC   ERD .
        *    [ http://erddap.com ](http://erddap.com) mula kay Rob Fuller/Ang Marine Institute of Ireland.
        
Salamat kay Tylar Murray para sa orihinal na kahilingan.
         
    * IMPROVE: isang kahilingan sa "files" sistema upang makuha ang isang file na nasa isang liblib na site (e.g., AWS S3) ay patungo sa isang redirect, kaya aktuwal na kukunin ng gumagamit ang impormasyon mula sa pinagmumulan, sa halip na gamitin ito ERDDAP™ bilang tagapamagitan. Dahil kina Andy Ziegler at NOAA .
         
    * BAGO: Bilang halimbawa ng bagong AWS S3-related na mga tampok, at upang gawing mas madali para sa sinuman na mag- browse at mag-download ng mga file mula sa pampublikong AWS S3 backs, tayo ay nakalikha ng mga bucks
         [~110 sample](https://registry.opendata.aws/) na nagpapangyari sa sinuman na suriin ang nilalaman ng halos lahat ng
         [Buksan ng AWS S3 ang mga balde ng Data](https://registry.opendata.aws/) . Kung i - click mo ito "files" link para sa alinman sa mga sampol na datasets na iyon, maaari mong browse ang directory tree at files sa bucket na iyon ng S3. Dahil sa paraan ng paggawa ng mga datos na ito, ang mga talaang ito ng directory ay laging ganap na up-to-date dahil ERDDAP™ makuha ang mga ito on-the-fly. Kung tutupi mo ang puno ng directory sa aktuwal na pangalan ng talaksan at tuldik sa pangalan ng talaksan, ERDDAP™ ang iyong kahilingan sa AWS S3 upang mai - download mo ang file nang tuwiran mula sa AWS. ERDDAP™ Ang mga administrador ay maaaring
         [basahin ang mga tagubilin kung paano gagawin ito para sa iba pang mga timba ng S3](/docs/server-admin/datasets#working-with-aws-s3-files) . Dahil kina Andy Ziegler at NOAA .
         
*    **Mga Bagay ERDDAP™ Kailangang Malaman at Gawin ng mga Administrador:** 
    * MGA TANONGNG KAILANGAN MONG GAWIN: wala ni isa
         
    * IMPROBLE: ERDDAP 'Ang paraan ng pag - iimbak ng mga hanay ng kuwerdas (Pag - aalinlangan) ngayon ay mas mahusay sa memorya. Pagpiga Ginagamit ang mga array sa buong mundo ERDDAP™ , lalo na kapag nagbabasa ng tabular ASCII data files. Gayundin, ang iba pang mga pagbabago ay gumagawa sa pagbabasa ng CSV/TSV/SSSV ASCII, kolumr ASCII, at jsonlCSV tabular data files mas mabilis at mas mahusay sa memorya. Ang resulta ay: para sa 764 MB ASCII data test file (ngunit siksik sa 52MB .gz talaksan) na may 3,503,266 na hanay at 33 kolumna, ang pinakamaraming gamit sa memorya ay mula 10GB pababa tungo sa 0.6GB (sa tugatog) . Ang panahon upang basahin ito ay mula sa ~7 minuto (ngunit lubhang nagkakaiba - iba sa kung gaano karaming pisikal na memorya ang nasa computer) hanggang ~36 segundo (kasama ang 10 para sa pagpapasimple () na ginagamit lamang ng mga GenerateDataset Xml) . Marami pang ibang dako sa ERDDAP™ ang higit na kahusayan ng memorya. Dahil sa Tylar Murray at Mathew Biddle.
        
Nag - isip ako ng ibang solusyon (nag-iimbak ng mga strando sa StringArray bilang UTF-8-encoded byte array) . Iyan ay nagbabawas sa paggamit ng memorya ng isa pang ~33%, ngunit sa halaga ng ~33% mabagal na pag-ikot. Kung ihahambing sa sistema na ginagamit ngayon, iyan ay waring isang masamang hanapbuhay. Mas madaling magbigay ng mas maraming memory sa computer (bumili ng mas maraming memory para sa ~$200) sa halip na gawin itong mas mabilis (Bumili ng isang bagong computer) .
        
Kung ito'y kombinyente, lagi pa ring mabuting ideya na hatiin ang pagkalaki - laking taskular data files sa ilang mas maliliit na file batay sa ilang batayan na gaya ng stationID at/o panahon. ERDDAP™ Kadalasan ay kailangan lamang buksan ang isa sa maliliit na file bilang tugon sa kahilingan ng gumagamit, at sa gayo'y mas mabilis na tumugon.
        
    * IMPROBLE: Mayroon na ngayon [ ERDDAP™ WAS S3 dokumentasyon](/docs/server-admin/datasets#working-with-aws-s3-files) , na naglalarawan kung paano makukuha ERDDAP™ sa paggawa ng mga data files sa AWS S3 backs.
Gayundin, ERDDAP™ ngayon ay gumagamit ng bagong mga katangian sa AWS S3 Java API.
Gayundin, ERDDAP™ ngayon ay pinapayagan ng AWS S3 URLs na isama ang karagdagang mga karakter (yugto ng panahon, hyphen, diin) sa mga pangalan ng timba.
Gayundin, ERDDAP™ ay humihiling ngayon na ang mga timba ng AWS S3 URL ay makilala sa espesipikong paraan:
           https://_bucketName_.s3._aws-region._amazonaws.com/_prefix_/   
kung saan ang unlapi ay hindi sapilitan.
Dahil kina Andy Ziegler at NOAA .
         
    * IMPROVED: GenerateDatasets Si Xml ngayon ay gumagamot ng karagdagang karaniwan missing\\_value mga stand-in bilang mga nawawalang halaga kaya't mas malamang na makomberte ang isang kolum sa isang numerikong data type. Gayundin, PistaArray. () ngayon ang mga troso na may partikular na halaga ng impormasyon ang nagpangyari rito na ituring ang isang ibinigay na kolum bilang isang hanay ng mga kuwerdas. Salamat sa Biddle ng Mathew.
         
    * IMPROBLE:&lt;ang tanong ngayon niBlacklist&gt; ay sumusuporta sa .\\*.\\*  (o :\\*:\\*para sa IPv6) sa dulo ng IP addresss upang maitala mo ang mas malaking tipak ng IP adress, e.g., 120.52.\\*.\\*  (Di - pangkaraniwang Tianjin ng Tsina) . Tingnan ang dokumentasyon para sa [&lt;[[Talaksan] (/docs/server-admin/datasets#requestblacklist) Salamat sa China Unicom at China Telecom.
         
    * IMPROVED: Kung ang pinagkunan ng dataset ay hindi nagtatakda ng isang "institution" attribute, GenerateDatasets Ang Xml at loadDataset ngayon ay kumukuha nito mula sa isang "creator\\_institution" attribute (kung mayroon) . Salamat kay Mikas Wengren.
         
    * BUG FIX: maging pamantayan Ang hindi laging nilalapat sa ASCII data files.
Gayundin, ang EDDTable ay hindi wastong humawak ng mga limitasyon sa panahon kung kailan ang pinagmumulan ay nagtataglay ng mga pamantayan at pamantayan sa panahon Kung ano ang ginagamit.
Salamat sa Paloma de la Vallee.
        
Hindi ko malinaw na sinabi noon: Dapat mo lamang gamitin ang pamantayan Anong mga katangian kung talagang kailangan mo ang mga ito (e.g., kapag ang iba't ibang source files ay nag-iimbak ng mga halaga ng oras sa iba't ibang paraan) , dahil ang ilang mga kahilingan sa datasets na gumagamit ng standardize Kung ano ang gagawin ay medyo mas mabagal.
        
    * BUG FIX: Isang bug sa code na ginagamit ng EDDGrid Ang mga FromNcFile ang dahilan ng hindi nito pag-usbong .nc 4 at .hdf 5 files na may "haba" (noong64) Iba't iba. Ito ay nakapirme na ngayon. Salamat kay Friedemann Wobus.
         
    * BUG FIX: Ang mga maliliit na pagbabago sa ISO 19115 files upang maging iba-ibang adaptasyon na masaya. Salamat kina Chris MacDermaid at Anna Milan.
         

## Bersiyong 2.01{#version-201} 
 (inilabas 2019-07-02) 

*    **Bagong mga Katangian at Pagbabago (para sa mga gumagamit) :** 
    * Wala.
*    **Mga Bagay ERDDAP™ Kailangang Malaman at Gawin ng mga Administrador:** 
    * BUG FIX: Isang bug sa code na gumagawa sa Date Access Form para sa tabledap Ang mga dataset ang naging dahilan kung bakit ang web page na iyon ay binura para sa ilang datasets. Gayundin, pinahusay ko ang paghawak ng di - inaasahang mga pagkakamali sa lahat ng mga pahina ng HTML upang ang mga ito'y makagawa ng gayon (karaniwang) ay nagpapakita ng maling mensahe. Salamat kay Marco Alba.
    * IMPROVED: GenerateDatasets Ang Xml ay hindi na naglilimbag ng mahabang babala sa ibabaw ng output. Sa halip, pakisuyong tingnan [Pag - aayos ng Generate Mga Data Xml output](/docs/server-admin/datasets#you-need-to-edit-the-output-from-generatedatasetsxml-to-make-it-better) . Salamat kay Steven Baum.
    * IMPROVED: GenerateDatasets Ang Xml ngayon ay gumagawa ng bahagyang naiibang mga rekomendasyon sa iba't ibang kalagayan para sa&lt;update EveryNMillis&gt; para sa EDD...Mula sa...Files datasets. Gayundin, ang GenerateDatasets Hinahadlangan ngayon ni Xml ang orihinal na "extract" system para sa EDDTable FromFiles datasets.

## Bersiyong 2.00{#version-200} 
 (inilabas 2019-06-26) 

*    ** ERDDAP™ Ang v2.00 sa wakas ay narito na&#33; Oo&#33;**   
     
    * Humihingi kami ng paumanhin sa mahabang pagkaantala na kailangan upang matapos ang bersiyong ito.
Salamat sa inyong pagtitiis.
         
    * Ang mabuting balita ay na ang ekstrang panahon ay ginamit upang dagdagan pa ang mga bahagi na hiniling ng mga gumagamit. Ang masamang balita ay na kahit na sa pagkaantala, hindi lahat ng hiniling na bahagi ay idinagdag. Ikinalulungkot namin, subalit waring mas mahalaga na ilabas ito kaysa magpaliban nang higit (magpakailanman?) Patuloy na nagdaragdag ng bagong mga katangian. Nangangako kaming babalik sa mas madalas na paglalabas sa hinaharap.
         
    * "Version 2? Mayroon bang malalaking pagbabago at di-pagbabago?"
Malalaking bagong katangian? Mayroon.
Malalaking kawalang - kakayahan o pagbabago para sa mga administrador o mga gumagamit? Hindi.
Kami'y tumalon mula sa v1.82 tungo sa v2.00:
        * ng 10 taon upang ipagdiwang (ngayon ay 11) mula noong unang paglabas sa publiko ERDDAP™   (v1.00 Noong 2008-05-06, na panlabas na mukhang kapansin-pansing v2.00) . Nang panahong iyon, ERDDAP™ mula sa isang instalasyon tungo sa halos 100 instalasyon sa hindi kukulanging 12 bansa (Australia, Belgium, Canada, Pransiya, India, Ireland, Italya, Timog Aprika, Espanya, Thailand, UK, USA) .
        * upang markahan ang isang malaking karagdagan sa isang ganap na bagong direksiyon: ERDDAP™ ngayon ay may sistema ng data feeds upang sumama sa umiiral na mga serbisyo ng data server (tingnan [ANG EDDTTable FromHttp](#eddtablefromhttpget) ) ,
        * at bahagyang dahil ito ay hindi isang malaking pagtalon mula 1.82 hanggang 2.00 numero, kaya ito ay parang tamang panahon.
             
    * Ang isa pang mabuting balita ay na mayroon na ngayong dalawa pang grupo na nagbibigay ng kodigo ERDDAP™   (sa bersiyong ito at may mga pahiwatig na magpapatuloy ang mga ito) : Sina Rob Fuller at Adam Leader ay mas mahusay sa Marine Institute ng Ireland, at si Roland Schweitzer ng PMEL at Weathertop Consulting. Maraming salamat. Totoo na sila ay gumagawa sa mga proyekto ng kanilang sariling pagpili, ngunit iyon ay ang klasikong open-source development model-mga grupo ay nag-aabuloy ng code para sa mga tampok na nais nilang makita ang idinagdag. Ang karagdagang pakinabang sa mga nag - abuloy: magagamit nila ang bagong mga bahagi sa sandaling matapos ang mga ito; hindi na nila kailangang hintayin ang susunod na paglalabas ERDDAP . Ang inyong grupo ay tinatanggap din na mag - abuloy&#33; Tingnan ang [ ERDDAP™ Patnubay ng Programmer](/docs/contributing/programmer-guide) .
         
    * Sana magustuhan niyo ERDDAP™ Inaasam - asam namin ang susunod na 10 taon ERDDAP™ Pag - unlad at higit pang paggamit sa buong daigdig.
         
*    **Bagong mga Katangian at Pagbabago (para sa mga gumagamit) :**   
     
    * BAGO: orderByMean filter
para sa tabledap Tatantiyahin ng mga dataset ang paraan para sa espesipikong mga grupo. Gayundin, lahat ng ito orderBy Ang mga mapagpipilian ngayon ay sumusuporta sa karagdagang paraan ng pagbibigay - kahulugan sa mga grupo: __numericVariable \\[ /number \\[ MgaUlit ng Panahon \\]  \\[ : Naka-offset \\]  \\] _, e.g., oras/1day o lalim/10:5. Halimbawa, stationID , panahon, waterTemp — orderByMean  (" stationID , oras/1 araw") ang resulta sa pamamagitan ng stationID at panahon, pagkatapos ay kalkulahin at ibalik ang kahulugan ng waterTempt para sa bawat isa stationID para sa bawat araw. Ang mga ito ay lubhang kapaki - pakinabang at mabisang bagong mga katangian. Ang bagong kodigo para sa mga katangiang ito at ang mga pagbabago sa lumang kodigo ay iniambag nina Rob Fuller at Adam Lead na mas mabuti sa Marine Institute ng Ireland at isinumite sa pamamagitan ng Git. Salamat, Si Rob at si Adan&#33;
         
    * BAGO: tipo ng talaksang output para sa mga tabular datasets: [.data Talaan](https://developers.google.com/chart/interactive/docs/reference#dataparam) ,
isang anyo ng talaksang JONS para sa gamit Google Visualization Aklatan ng kliyente ( Google Charts ) . Ang kodigo para dito ay iniabuloy ni Roland Schweitzer at isinumite sa pamamagitan ni Git. Salamat, Roland&#33;
         
    * BAGO: tipo ng talaksang output para sa mga tabular datasets: [ .jsonlCSV1 ](https://jsonlines.org/examples/) ,
na gaya ng umiiral .jsonlCSV Opsiyon, ngunit may mga pangalan ng kolum sa unang linya. Salamat kay Eugene Burger.
         
    * BAGO: Kung magagawa ito ng administrador, maaari na ngayong pumasok ang mga gumagamit sa kanilang bahay [ORCID](https://orcid.org) ulat.
Ito ay isang sistemang OAuth 2.0 annitution, katulad na katulad ng Google realityation. Ang ORCID ay malawakang ginagamit ng mga mananaliksik upang itangi ang kanilang mga sarili. Ang mga ORCID account ay libre at walang mga isyung pribado na gaya ng sa mga account ng Google. Tingnan ERDDAP ' [Mga tagubilin hinggil sa pag - iral](/docs/server-admin/additional-information#orcid) . Salamat sa BCO-DMO (Adam Shepard, Danie Kinkade, atbp.) .
         
    * BAGO: Isang bagong URL converter ang nangumberte ng out-of-date URLs sa up-to-date URLs.
Tingnan ang .../erddap/convert/urls.html sa kahit anong ERDDAP™ pagluklok, e.g.,
         [ang kawing na ito sa converter sa ERD   ERDDAP ](https://coastwatch.pfeg.noaa.gov/erddap/convert/urls.html) . Ito'y dapat na maging kapaki - pakinabang sa mga manedyer ng data. Ito ay ginagamit din sa internasyunal ng GenerateDatasetsXml. Salamat kina Bob Simons at Sharon Mesick.
         
    * IMPROBLE: Ang [Tagapagkumberte ng Panahon](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) ngayon ay may mapagpipilian na gawing isang ISO8601 string time ang anumang karaniwang oras, o baguhin ang isang karaniwang strando UDUNITS - Tulad ng oras na mga yunit ay nakakabit sa tamang UDUNITS string ng time units. Dapat na kapaki - pakinabang din ito sa ERDDAP™ Ang mga administrador na kailangang malaman kung ano ang format upang magtakda para sa "units" na attribute para sa string time variables. Ito ay ginagamit din sa internasyunal ng GenerateDatasetsXml at ang standardize na What feature of EDDTable FromFiles. Salamat kay Bob Simons.
         
    * BAGO: Ang [Tagapagkumberte ng mga Unit](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) ay may bagong "standardize UDUnits" opsiyon.
Halimbawa, ang "deg\\_C/m" at "degrees\\_C metro-1" ay parehong kinokonberte
"degree\\_C m-1". Ang tampok na ito ay ginagamit din ng standardize What tampok ng EDDTable FromFiles. Salamat kay Bob Simons.
         
    * BAGO: Para sa mga graph (maliban sa pang - ibabaw na mga graph) sa griddap's at tabledap 'Make A Graph web page, kapag ang x axis ay hindi isang time axis, kung ang isang subset lamang ng x axis variable's range ay nakikita, ngayon ay may mga butones sa itaas ng graph upang i-reft ang X Axis kaliwawards o kanangwards. Salamat kay Carrie Wall Bell / ang proyektong Hydrophone.
         
    * BAGO: Para sa mga graph, ang X at/o Y axis ay maaari na ngayong gumamit ng Log scale.
Maaaring kontrolin ng mga gumagamit nito ang Y Axis Scap sa pamamagitan ng isang bagong drop-down widget sa griddap at tabledap Gumawa ng mga web page ng A Graph. Tingnan ang [.xRange at . yRange dokumentasyon](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#xRange) . Salamat kay Carrie Wall Bell / ang proyektong Hydrophone.
         
    * IMPROBLE: ERDDAP™ ngayon ay mas mabuting gamitin ang iba't ibang kodigo ng pagkakamali ng HTTP at ngayon ay ibabalik ang isang(OPeN)DAPv2.0- format error payloaded. Tingnan [ang mga detalye](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#Errors) . Salamat kina Antoine Queric at Aurelie Briand.
         
    * IMPROVED: Huwag gumamit ng Netcdf-java/c o iba pang kasangkapang software upang makipag-ugnayan sa .nc o .hdf mga talaksang pinaglilingkuran ng ERDDAP 'Mga /file/ sistema na parang mga lokal na files. ERDDAP™ ang mga kahilingang ito. Ito ay kakila - kilabot sa kawalang - kakayahan at kadalasang nagiging sanhi ng iba pang problema. Sa halip:
        
        * Gamitin(OPeN)DAPsoftware ng kliyente para makipag-ugnayan ERDDAP ' DAP mga serbisyo para sa dataset (na may /griddap/ o / tabledap / sa URL) . Iyan ang dahilan DAP ay para sa at mabisa.
        * O, gamitin ang dataset's Date Access Form upang humiling ng isang subset ng datos.
        * O, kung kailangan mo ang buong file o paulit-ulit na pag-akses sa loob ng mahabang panahon, gamitin curl , wget , o ang iyong browser upang i - download ang buong file, pagkatapos ay kunin ang impormasyon mula sa iyong lokal na kopya ng file.
        
          
         
    * IMPROBLE: On the ERDDAP™ Homepahina, Full Text Search ay ngayon sa itaas ng "View a List of All Dakets" dahil ito ang pinakamahusay na simulang punto para sa karamihan ng mga gumagamit. Salamat kina Didier Mallarino at Maurice Libes.
         
    * IMPROVED: On Data DefierForm3.html sa ngayon ay may mga talaan ng karaniwang pagbaba ng bilang standard\\_name s. Salamat sa isa sa pulong ng IOS DMAC.
         
    * IMPROVED: On the /files/ web page, mayroon na ngayong kawing sa bagong "Ano ang magagawa ko sa mga file na ito?" seksiyon ng /files/ dokumentasyon. Ang bahaging iyon ay naglalarawan ng iba't ibang uri ng file at nagbibigay ng mga mungkahi kung paano ito gagawin. Salamat kay Maurice Libes.
         
    * IMPROVE: Halos lahat ng kahilingan ERDDAP™ ay dapat na mas mabilis nang kaunti, at kung minsan ay mas mabilis.
         
    * BUG FIX: Sa ilalim ng ilang kalagayan, nang ang isang EDDTable dataset ay mag - ipon ng impormasyon sa ilang uri ng .nc mga talaksan, ang global na "id" attribute ay itinakda sa iminungkahing pangalan ng file, na kinabibilangan ng isang hash upang gawin itong natatangi sa kahilingan na iyon. Ngayon ang "id" ay wastong iniiwang hindi nagbabago (kung itinakda) o nakatakda sa dataset's datasetID   (hindi binanggit) . Salamat kay John Maurer.
         
*    **Mga Bagay ERDDAP™ Kailangang Malaman at Gawin ng mga Administrador:**   
     
    * DO: Ang paglayang ito ay mangangailangan ng panahon at trabaho mula sa iyo. Pakisuyong maging matiyaga at magplanong gumugol ng ilang oras upang gawin ang kinakailangang mga pagbabago at ilang oras pa upang mag - eksperimento sa bagong mga katangian.
         
    * DO: Para sa kaligtasan, gumawa ng backup na kopya ng iyong kasalukuyang setup.xml at datasets.xml mga file upang maibalik sa mga ito sa di - inaasahang kalagayan kung saan kailangan mong bumalik ERDDAP™ v1.82.
         
    * PAGGAWA: Ang inirerekomenda Java ngayon ay ang OpenJDK ng AppiopenJDK 8 (MGA LTS) + HotSpot.
Ito ay isang bukas na pinagmumulan ng iba't ibang impormasyon Java na walang pagbabawal sa paggamit nito (Di - tulad ng Oracle ' Java pamamahagi) . Nagmula ito sa Oracle ' Java sa isang parating na paraan, Oracle 'Ang pagpapala. Sa mga kadahilanang panseguridad, mahalaga na panatilihin ang iyong Java bersyon up-to-date. Tingnan ERDDAP ' [ Java maglagay ng mga tagubilin](/docs/server-admin/deploy-install#java) .
         
    * PAGGAWA: Mga pag - aampon Java Kailangan ang maliit na karagdagan sa iyong instalasyon ng Tomcat: tingnan ang [Mga tagubilin sa Kache](/docs/server-admin/deploy-install#contentxml) . Sa palagay ko ito ang kapalit ng -XX:MaxPermSize setting, na (Pag - ampon) Ang OpenJDK ay hindi na sumusuporta.
         
    * PAGGAWA: Ang bagong default at inirerekomenda&lt;font Camily&gt; setting sa setup.xml ay
DejaVu Sans na itinayo sa AptopenJDK's Java . Tingnan ang
         [Binagong mga instruksiyon sa instalasyon](/docs/server-admin/deploy-install#fonts) .
         
    * DO: Maraming tag ang lumilipat mula sa setup.xml tungo sa datasets.xml . Ang bentaha ay na mababago mo ang kanilang mga pamantayan samantalang ERDDAP™ tumatakbo, nang hindi naggu - restart ERDDAP . Kapansin - pansin, madali kang magbago&lt;simulaBodyHtml5&gt; upang ipakita ang isang pansamantalang mensahe sa ERDDAP™ pantahanang pahina (e.g., "Ilabas ang bagong JPL MUR SST v4.1 dataset ..." o "Itong" ERDDAP™ ay magiging offline para sa pagpapanatili 2019-05-08T17:00:00 PDT hanggang 2019-05-08T20:00:00 PDT.") . Kung/kapag pinalitan mo ang mga tag na ito sa datasets.xml , ang mga pagbabago ay mangyayari sa susunod na pagkakataon ERDDAP™ basahin datasets.xml .
         
        
        1. Ikopya ang nilalamang ito sa iyo datasets.xml talaksan (kung saan malapit sa simula ng talaksan, pagkatapos&lt;ErddapDatasets&gt;):
```
            <!-- The tags below are described in setupDatasetsXml.html.
                 The defaults listed below are as of ERDDAP™ v2.00. -->
            <cacheMinutes></cacheMinutes>                                     <!-- default=60 --> 
            <decompressedCacheMaxGB></decompressedCacheMaxGB>                 <!-- default=10 --> 
            <decompressedCacheMaxMinutesOld></decompressedCacheMaxMinutesOld> <!-- default=15 --> 
            <drawLandMask></drawLandMask>                                     <!-- "over" or "under" (default) -->
            <graphBackgroundColor></graphBackgroundColor>                     <!-- 0xAARRGGBB, default is 0xffccccff -->
            <loadDatasetsMinMinutes></loadDatasetsMinMinutes>                 <!-- usually=default=15 -->
            <loadDatasetsMaxMinutes></loadDatasetsMaxMinutes>                 <!-- default=60 -->
            <logLevel></logLevel> <!-- "warning" (fewest messages), "info" (default), or "all" (most messages) -->
            <nGridThreads></nGridThreads>                                     <!-- default=1 -->
            <nTableThreads></nTableThreads>                                   <!-- default=1 -->
            <partialRequestMaxBytes></partialRequestMaxBytes>                 <!-- default=490000000 -->
            <partialRequestMaxCells></partialRequestMaxCells>                 <!-- default=10000000 -->
            <slowDownTroubleMillis></slowDownTroubleMillis>                   <!-- default=1000 -->
            <unusualActivity></unusualActivity>                               <!-- default=10000 -->
            <!-- The defaults for the following tags are in messages.xml. -->
            <startHeadHtml5></startHeadHtml5>                                
            <startBodyHtml5></startBodyHtml5>                                 <!-- This is often customized. -->
            <theShortDescriptionHtml></theShortDescriptionHtml>               <!-- This is often customized. -->
            <endBodyHtml5></endBodyHtml5>
            <standardLicense></standardLicense>
            <standardContact></standardContact>
            <standardDataLicenses></standardDataLicenses>
            <standardDisclaimerOfEndorsement></standardDisclaimerOfEndorsement>
            <standardDisclaimerOfExternalLinks></standardDisclaimerOfExternalLinks>
            <standardGeneralDisclaimer></standardGeneralDisclaimer>
            <standardPrivacyPolicy></standardPrivacyPolicy>
```

        2. One-by-one, kopyahin ang halaga (kung mayroon) para sa bawat tag na iyon mula sa iyong setup.xml file tungo sa bagong tag na katatapos mo lamang (sa itaas) sa loob datasets.xml . Halimbawa, kung nagamit mo ang halagang 30 para sa&lt;Mga cacheMinute&gt; sa setup.xml, dapat mong kopyahin ang halagang iyan sa bagong kopya&lt;Mga cacheMinute&gt; tag sa datasets.xml   (Bagaman ang halaga ay katulad ng bagong default na halaga, pinakamabuting iwan na lamang ang tag datasets.xml kulang) .
            
Kung ang iyong halaga ay naiiba sa bagong iminungkahing default (iba pa para sa bagong iminumungkahi&lt;simulaBodyHtml5&gt; at&lt;Ang ShortDescriptionHtml&gt;, na kapaki - pakinabang sa pag - aayos ng iyong katawan ERDDAP™ installation), pakisuyong isaalang - alang ang pagbaling sa bagong default na mga pamantayan. Totoo ito lalo na sa&lt;bahaging RequestMax Bytes&gt; at&lt;partialRequestMaxCells&gt;, kung saan ang default/nagpapahiwatig na halaga ay lubhang nagbago sa paglipas ng mga taon.
            
Matapos kopyahin ang bawat halaga, i-delete ang tag at ang paglalarawan nito mula sa setup.xml. Mas mabuting ipasok ang mga tag na ito datasets.xml . At ngayon ay mayroon nang mas mabuting paglalarawan sa [setyupDatasetsXml.html](/docs/server-admin/datasets#the-basic-structure-of-the-datasetsxml-file) .
            
        
Isang kakaibang bagay sa bagong sistema ay na ang kauna - unahang web page kapag nagsimula ka ERDDAP ang magiging default ERDDAP™ web pahina. Ang bawat kasunod na webpahina ay gagamit ng ...Html content na itinakda mo datasets.xml .
        
    * BABALA: Sa unang pagkakataon na tumakbo ka ERDDAP™ v2.0, datasets batay sa lokal na data files ay magkarga **ang mismong** mabagal sapagkat ERDDAP™ Kailangang ayusing muli ang database ng mga file nito sa medyo naiibang format. Pagkatapos ng mabagal na muling pagkarga, mabilis silang magkarga, gaya ng dati. Pakisuyong maging matiyaga.
         
#### ANG EDDTTable FromHttp{#eddtablefromhttpget} 
    *    [BIG BAGONG KASANAYAN: MAHALAGANG ULO](#eddtablefromhttpget)   
Hanggang sa ngayon, ERDDAP™ basahin lamang ang datos at ipagamit ito sa mga gumagamit. Ngayon, ERDDAP™ ay may simple, mahusay na sistema sa pag - inom ng totoong time data mula sa mga sensor. Kabilang sa iba pang mga katangian, ang dataset na ito ay nag-aalok ng pinong-grained versioning: inaalala nito ang bawat pagbabagong ginawa sa dataset, kapag ito ay ginawa, at sa pamamagitan nino. Karaniwan na, nanaisin lamang ng mga gumagamit ang pinakabagong bersiyon ng dataset, na ang lahat ng mga pagbabago ay inilalapat. Ngunit may opsiyon para sa mga gumagamit na humiling ng datos mula sa dataset gaya ng ito ay nasa anumang puntos sa panahon. Pinadadali nito ang muling pagbabago ng siyensiya. Kaya, hindi tulad ng karamihan ng iba pang mga malapit-real-time datasets, ang mga dataset na ito ay maaaring makuha [ DOI s](https://en.wikipedia.org/wiki/Digital_object_identifier) . sapagkat nakasalubong nila ang DOI na ang dataset ay hindi nagbabago, maliban sa pamamagitan ng agregation. Tingnan [ANG EDDTTable FromHttp](/docs/server-admin/datasets#eddtablefromhttpget) . Salamat sa OOI (noon at ngayon) para sa pag-uusap tungkol sa pangangailangan para dito at Eugene Burger para sa paalaala tungkol sa paggawa ng kung ano ang mahalaga.
         
    * BIGLANG BAGONG KASALAMAN: ERDDAP™ ay maaari ngayong magsilbi ng datos nang tuwiran mula sa panlabas na-compressed data files, kasama ang .tgz , .tar  .gz , .tar  .gzip , .gz , .gzip , .zip , .bz2 , o .Z. Datasets ay maaaring kabilangan ng halo ng panlabas na mga talaksang pang-compressed (marahil ang mas lumang mga data file?) at mga non-externally-compressed file, at maaari mong i-comp/decompress ang isang file sa anumang oras.
        
Napakahusay nito&#33;
Sa karamihan ng mga kaso, ang mabagal na pag-ikot na may kaugnayan sa decompressing ng mga file ay menor de edad. Pinasisigla ka namin nang husto na subukin ito, lalo na para sa mga dataset at/o mga data file na bihirang gamitin.
        
Maaaring makatipid ka ng $30,000 o higit pa&#33;
Isa ito sa iilan ERDDAP™ na maaaring mag - ipon sa iyo ng maraming pera - - kung ika'y maglalagay ng maraming data file, kakailanganin mo ang mas kaunting RAID/hard drives upang itago ang impormasyon, o makipag - usap, maaari kang magsilbi ng mas maraming impormasyon (hanggang 10x) na taglay mo na ang mga RAID. Kung ang bahaging ito ay nagliligtas sa iyo sa pagbili ng isa pang RAID, kung gayon nailigtas ka nito ng halos $30,000.
        
Tingnan ang [Ang Externally Compressed File Dokuments](/docs/server-admin/datasets#externally-compressed-files) . Dahil sa Benoit Perrimond at Paloma de la Vallee.
        
    * BIGLANG BAGONG KASALAMAN: Lahat EDDGrid Ang mga FromFile at ang lahat ng EDDTable FromFiles datasets ay sumusuporta sa isang&lt;Oche mula sa Url&gt; tag at isang&lt;IscachesizeGB&gt; tag. Kung ang cacheSizeGB ay hindi nakatakda, ito ay mag-download at mag-iingat ng isang kumpletong kopya ng isang remote dataset's files. Kung ang cacheSizeGB ay nakatakda at ito ay &gt;0, ito ay mag-download ng mga file mula sa remote dataset, ayon sa kinakailangan, sa isang lokal na cache na may limitadong laki, na kapaki-pakinabang kapag gumagana sa ulap-based (e.g., S3) mga talaksan ng datos. Tingnan ang [cache Mula sa Ekumenikal na Dokumento](/docs/server-admin/datasets#cachefromurl) para sa mga detalye. Salamat kina Bob Simons at Roy Mendelssohn (na sa loob ng maraming taon ay sumusulat upang pangasiwaan ang paggawa ng lokal na mga kopya ng remote dataset files) , Lloyd Cotten, Eugene Burger, Conor Delaney (Nang siya ay nasa Web Services ng Amazon) , at ang Google Cloud Platform.
         
    * BAGO: Ang bagong EDDTable FromJsonlCSV maaaring basahin ng klase ang tabular data mula sa
         [JON Mga file ng Lines CSV](https://jsonlines.org/examples/)   ("Mas Mabuti sa CSV".) . Salamat sa mga tao sa Marine Institute of Ireland sa pagsasabi sa akin tungkol sa format na ito at kay Eugene Burger at PMEL para sa kahilingan na suportahan ito bilang isang input type.
         
    * BAGO: Lahat EDDGrid at lahat ng EDDTable FromFiles datasets ay sumusuporta sa isang&lt;IThreads&gt; setting, na nagsasabi ERDDAP™ kung ilang sinulid ang gagamitin kapag tumutugon sa isang kahilingan. Tingnan ang [Nagbabasa ng dokumento](/docs/server-admin/datasets#nthreads) para sa mga detalye. Salamat kay Rob Bochenek ng Axiom Data Science, Eugene Burger, Conor Delaney (Nang siya ay nasa Web Services ng Amazon) , at Google Cloud Platform.
         
    * Bagong Pamantayan Ano sa Lahat ng EDDTable FromFiles subclass -
Dati, kung iba - iba ang ibinigay, ang mga pamantayan ng mahahalagang katangian (e.g., scale\\_factor , add\\_offset , missing\\_value \\_FillValue, mga yunit) ay hindi tugma, ang EDDTable FromFiles ay pipili ng isang halaga para sa bawat attribute na maging "valid" at magmarka ng mga files na may iba pang mga halaga ng attribute bilang "Bad Files". Ngayon, may sistema na gawing pamantayan ang mga file sa sandaling basahin ng EDDTable FromFiles ang mga files. Tingnan [Mapagkakatiwalaan Mula sa Pagiging Pamantayan ng Elemento Ano](/docs/server-admin/datasets#standardizewhat) . Isa sa mga ERDDAP 'Ang mga pangunahing tunguhin ay ang paggawa ng mga data file at datasets na magagamit sa isang hindi pabagu-bagong paraan. Maging limitado Isang mahalagang bagong kasangkapan upang magkatotoo iyan. Salamat kay Marco Alba, Margaret O'Brien (at iba pang gumagamit ng EML) , BCO-DMO, at mga gumagamit ng InPort.
         
    * Ang BAGOng EDDTable From InvalidCRAFiles ay nagpapangyari sa iyo na gumawa ng isang dataset mula sa koleksiyon ng NetCDF   (v3 o v4)   .nc mga talaksan na gumagamit ng espesipiko, hindi tanggap, at iba't ibang uri ng CF DSG Contiguous Ragged Array (CRA) mga file. Sample files para sa dataset type na ito ay matatagpuan sa https://data.nodc.noaa.gov/thredds/catalog/ncei/wod/   \\[ 2020-10-21 Ang server na ito ay hindi na maaasahang makukuha ngayon \\] . Bagaman ERDDAP™ ay sumusuporta sa uring ito ng talaksan, ito ay isang hindi tanggap na uri ng talaksan na hindi dapat simulan ng sinuman na gamitin. Ang mga grupo na kasalukuyang gumagamit ng uring ito ng talaksan ay lubhang hinihimok na gamitin ERDDAP™ upang lumikha ng mga tanggap na talaksang CF DSG CRA at tumigil sa paggamit ng mga file na ito. Salamat kina Ajay Krishnan at Tim Boyer.
         
    * Ang mga EDDTTable FromThreddsFile at ang EDDTTable Mula sa Hyrax Ang mga talaksan ngayon ay inalisan ng halaga. Pakisuyong lumipat sa EDDTable FromNcFiles (o isang pagkakaiba) plus&lt;Hache Mula sa Url&gt;. Kung hindi ito gumana sa ilang kadahilanan, email erd.data at noaa.gov . Kung walang mga reklamo bago ang 2020, ang mga dataset type na ito ay maaaring alisin.
         
    * IMPROVE -- Ang sistema para sa awtomatikong pagbago ng hindi-ISO ng 8601 beses sa ISO 8601 beses (Ipinakilala noong v1.82) ay lubhang pinalawak upang harapin ang maraming karagdagang format. Ito ay nakakaapekto sa GenerateDatasetsXml at ERDDAP Ang pangangasiwa ng source metadata.
         
    * IMPROVE -- Sa ikatlong malaking rebisyon ng sistema ng String time parsing (at sana ang huli) , ERDDAP™ hindi na ginagamit Java " DateTime Forrmatter " dahil sa mga insekto na kung minsan ay nakaaapekto sa sukdulang mga panahon (mga taon&lt;=0000). ERDDAP™ ngayon ay gumagamit ng sarili nitong sistema para sa paglalagay ng mga kuwerdas para sa panahon.
         
    * BABALA: Ang bagong String time parsing system ay medyo mahigpit. Kung ang isa sa iyong datasets ay biglang may kulang lamang na halaga para sa mga halaga ng panahon, ang sanhi ay halos tiyak na ang time formation string ay bahagyang mali. Dapat may mga maling mensahe sa logo. Ang txt na nauugnay sa mga halaga ng panahon na hindi tumutugma sa format ng oras - na dapat tumulong sa iyo na ayusin ang time format na string para sa dataset na iyon. Kung kailangan mo ng tulong, gamitin ang opsyon ERDDAP Ang Tagakumberte ng Panahon na "Nag - iingat \\[ s \\] anumang karaniwang string time sa isang ISO 8601 string time" - ito ay nagpapakita ng format na ginagamit ng converter upang i-parse ang source string.
         
    * RECOMMENDATION: Ang pinakamadali, pinakamadali, at pinakamurang paraan ng pagpapabilis ERDDAP Ang pag-access sa taskular data ay ang paglalagay ng data files sa isang Solid State Drive (SSD) . Karamihan ng mga taskular datasets ay maliit lamang, kaya ang 1 o 2 TB SSD ay malamang sapat na upang hawakan ang lahat ng data files para sa lahat ng iyong tabular datasets. Ang SSD ay humihina sa wakas kung ikaw ay sumusulat ng impormasyon sa isang selula, inaalis ito, at isinusulat ang bagong impormasyon sa selulang iyon nang maraming ulit. Sa halip, inirerekomenda ko iyan (hangga't maaari) Ginagamit mo lamang ang iyong SSD upang isulat nang minsan ang impormasyon at basahin ito nang maraming ulit. Pagkatapos, kahit na ang isang konsumer-grade SSD ay dapat tumagal ng napakahabang panahon, marahil mas matagal pa kaysa sa anumang Hard Disk Drive (HDDD) . Ang Consumer-grade SSD ngayon ay mura na (sa 2018, ~$200 para sa 1 TB o ~$400 para sa 2 TB) at mabilis pa ring bumababa ang presyo. Kailan ERDDAP™ Nag-akses ng talaksang datos, isang SSD ay nag-aalok ng kapwa
        
        * mas maikling huli (~0.1ms, laban sa ~3ms para sa isang HDD, laban sa ~10 (?) Mga m para sa isang RAID, laban sa ~55ms para sa Amazon S3) , at
        * mas mataas na underput (~500 MB/S, versus ~75 MB/s para sa isang HDD laban sa ~500 MB/s para sa isang RAID) .
        
Kaya makakarating ka sa ~10X performance (vs a HDD) sa halagang $200&#33; Kung ihahambing sa karamihan ng iba pang posibleng pagbabago sa iyong sistema (isang bagong server sa halagang $10,000? isang bagong RAID sa halagang $35,000? isang bagong network switch ng $5,000? Atbp.) , ito ang pinakamahusay na Pagbabalik sa Investment (ROI) . Kung ang iyong server ay hindi punô ng memorya, ang karagdagang memorya para sa iyong server ay isa ring malaki at hindi magastos na paraan upang pabilisin ang lahat ng aspekto ng iyong server ERDDAP .
         \\[ Ang SSD's ay magiging mahusay din para sa mga grocked data, ngunit ang karamihan ng mga grided datasets ay mas malaki, na gumagawa sa SSD na napakamahal. \\]   
         
    * BAGO: Ang lahat ng naka-tala sa papel na= \\[ SINIRA ang EL Nasa \\] , kahit na walang&lt;user&gt; tag para sa kanila datasets.xml . Kung magtatakda ka ng dataset's&lt;Makarating sa&gt; \\[ SINIRA ang EL Nasa \\] , pagkatapos ang sinuman na pumasok ERDDAP™   (e.g., sa pamamagitan ng kanilang Gmail o Orcid account) ay awtorisadong gamitin ang dataset, kahit na hindi mo pa natukoy ang isang set&lt;user&gt; tag para sa kanila datasets.xml . Salamat kay Maurice Libes.
         
    * IMPROBLE: Ang UDUNITS Ang /UCUM units converter ay malawakang napabuti.
Mas mahusay nitong hawakan ang mga hindi tanggap na mga yunit na kuwerdas (pasimula sa pagdiriin sa pag - iingat ng impormasyon, sa halip na ipatupad ang katotohanan) . Gayundin, ang mga resulta ngayon ay may standardized conclusion.
         
    * BAGO: Ang UDUNITS /UCUM units converter ay may bagong mapagpipilian upang gawing pamantayan ang isang UDUNITS string.
Mabisa ito UDUNITS Ang mga kuwerdas at makatuwiran para sa non-standard / hindi tanggap UDUNITS de kuwerdas. Halimbawa, halimbawa, UDUNITS = "meters kada segundo", "meter/second", "m.s^-1" , at "m s-1" lahat ay babalik na "m.s-1". Kailangan ito para sa bagong pamantayan Anong sistema ang inilarawan sa itaas. Salamat kay Marco Alba, Margaret O'Brien (at iba pang gumagamit ng EML) , BCO-DMO, at mga gumagamit ng InPort.
         
    * BAGO: Ang mga EDDTable FromMultidimNcFile ngayon ay mayroon nang isang bidyo [dumadanas na mga Dimensiyon](/docs/server-admin/datasets#treatdimensionsas) Opsiyon, iyan ang nagsasabi ERDDAP™ upang gamutin ang ilang dimensiyon (e.g., LAT at LON) na para bang ang mga ito ay ibang dimensiyon (e.g., PANAHON) . Ito ay kapaki - pakinabang sa ilang di - wastong mga file na gumagamit ng iba't ibang dimensiyon para sa iba't ibang variables gayong ang mga ito ay dapat na gumamit lamang ng isang dimensiyon (e.g., PANAHON) . Salamat kina Marco Alba at Maurice Libes.
         
    * BAGO: Ngayon, lahat EDDGrid Mula sa... mga datasets ay sumusuporta sa isang bagong pantanging axis sourceName na nagsasabi ERDDAP™ upang makakuha ng impormasyon mula sa fileName (pangalan lamang.) at gamitin ang halaga sa **Palitan** ang natitirang pinakamataas na halaga ng axis. Ang format ay
        \\*\\*\\*replace FromFileName,_dataType_,_extractRegex_,_captureGroupNumber_
Tingnan [ang dokumentong ito](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata) . Salamat sa NOAA Pathfinder Daily agregation dataset.
         
    * BAGO: Ngayon, lahat EDDGrid Mula sa... mga datasets ay sumusuporta sa isang bagong pantanging axis sourceName na nagsasabi ERDDAP™ upang makakuha ng impormasyon mula sa pathName ng talaksan (mga direktoryo + pangalan.ext)   
        \\*\\*\\*pathName,_datatype_,_extractRegex_,_captureGroupNumber_
Para rito, ang pangalan ng landas ay laging ginagamit '/' bilang directory separator character, hindi kailanman '\'.
Tingnan [ang dokumentong ito](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata) . Salamat sa Paloma de la Vallee.
         
    * BAGO: Ngayon, lahat ay Maaasahan... Ang mga talaksang datasets ay sumusuporta sa karagdagang pseudo variable sourceName na kumukuha ng impormasyon mula sa talaksang Naname (pangalan lamang.)   (tingnan [\\*\\*\\*fileName](/docs/server-admin/datasets#filename-sourcenames) ) o mula sa buong landas ng talaksan (/dir1/dir2/filename.ext)   (tingnan [\\*\\*\\*pathName](/docs/server-admin/datasets#pathname-sourcenames) ) . Salamat sa Paloma de la Vallee.
         
    * BAGO: Kung mayroon EDDGrid Ang dataset ay may isa o higit pang napakalaking dimensiyon (e.g., milyun - milyong pamantayan) na kumukuha ng maraming alaala, maitatatag mo ang bago [&lt;Mga dimensiyonValue SaMemory&gt;] (/docs/server-admin/datasets#dimension valuessinmemory) pagsisinungaling (ang default ay totoo) , na nagpapangyari sa dataset na itago ang mga halaga sa disk at kunin ito kung kinakailangan. Salamat kay David Rodriguez at sa Mayamang Signell (muli: EDDGrid Mula sa AudioFiles) .
         
    * IMPROBLE: Dati, kung isasaayos mong muli ang dataVariable s para sa isang EDDTable FromFiles dataset at muling nagkarga ng dataset, ang EDDTable FromFiles ay muling babasa ng lahat ng datafile. Ngayon, maaari nitong harapin ang muling pagsasaayos nang hindi muling binabasa ang lahat ng data files. Salamat kay Roland Schweitzer.
         
    * IMPROVE: Ngayon, kailan ERDDAP™ basahin ang ASCII, NCSV, at JSON Lines CSV tabular data files, kung makakita ito ng error sa isang ibinigay na linya (e.g., maling bilang ng mga bagay) , nilalagyan nito ang isang babalang mensahe ("WARNING: Skipping line #"... "di inaasahang bilang ng mga bagay...") sa [log.txt file](/docs/server-admin/additional-information#log) at pagkatapos ay patuloy na babasahin ang natitirang bahagi ng data file. Kaya pananagutan mong tumingin paminsan - minsan (o sumulat ng iskrip upang gawin iyon) para sa mensaheng iyon sa troso. Tsext upang maayos mo ang mga problema sa mga data file. ERDDAP™ ay inilalagay sa ganitong paraan upang patuloy na mabasa ng mga gumagamit ang lahat ng makukuhang mabisang impormasyon bagaman ang ilang linya ng talaksan ay may mga depekto. Dati, ERDDAP™ Minarkahan ang talaksan bilang "masama" at inalis ito sa dataset.
         
    * IMPROBLE: Kapag eksaktong panahon (e.g., sa pinakamalapit na ikalawa o millisecond) ay nakatago sa pinagkunan bilang "minutos mula ..." (o mas malalaking yunit) , ERDDAP™ ngayo'y dinadala sila sa pinakamalapit na millisecond kapag binabasa ang mga halaga ERDDAP . Kung hindi, ang lumulutang na mga numero ng punto ay susugatan at hinihiling ang impormasyon sa espesipikong mga panahon (e.g., &time=2018-06-15T01:30:00) ay mabibigo. Dati, kinakalkula nito ang mga ito nang eksakto hangga't maaari (at ginagawa pa rin kung ang mga yunit ay e.g., "mga segundo mula noong ..." o "mga segundo mula noong ...") . Pinakamabuting iwasan ang problemang ito sa pamamagitan ng hindi paggamit ng malalaking yunit (e.g., minuto o oras) mag - imbak ng eksaktong mga halaga ng panahon (e.g., mga microsecond) -- Ang mga computer ay hindi mahusay sa paggamit ng mga numerong may kinalaman sa numero. Salamat kay Marco Alba.
         
    * Pagbabago Tungo sa Pagiging EDDTable EDDGrid na gumagawa ritong mas mabuti. Maaasahan Mula sa EDDGrid hinahayaan ang mga gumagamit nito na mag - query grided datasets na para bang ang mga ito ay mga tabular dataset ("Tanong sa halaga") .
        
        * Ito ngayon ay sumusuporta sa isang&lt;tag ng maxAxis0&gt; (default=10) na nagsasaad sa pinakamaraming bilang ng axis \\[ 0 \\]   (karaniwang "time" ) Mga pamantayan na maaaring kaagad na suriin. Hinahadlangan nito ang walang muwang na mga kahilingan sa pagkuha ng EDDTable From EDDGrid upang hanapin sa pamamagitan ng isang buong grided dataset (na mabibigo sa isang pagkakamali sa timeout) .
        * Mga GenerateDataset Ang Xml ngayon ay may mapagpipilian na gumawa ng EDDTable From EDDGrid mga dataset para sa lahat ng grid na datasets sa isang ibinigay ERDDAP™ na katugma ng espesipikong regex (gamitin ang .\\* upang itugma ang lahat ng datasets) . Ang mga dataset na nililikha nito ay may karagdagang impormasyon sa buod na attribute na nagpapahiwatig na ito ay isang tabular na bersyon ng isang grid na dataset. At ang kanilang datasetID ang siyang datasetID ng grid dataset, at "\\_ASATable".
        * May malaking bilis na pataas para sa pinakakaraniwang setup: kapag ang gridded dataset ay isang sekwensiya EDDGrid Mula sa Erddap dataset na pareho ERDDAP .
        
Salamat kina James Gallagher at Ed Armstrong.
         
    * BAGO: Mga Data Xml para sa lahat ng uri ng datasets ay mas malamang ngayong magdagdag ng \\_FillValue o missing\\_value Ilagay sa numerong variable' addAttributes . Halimbawa, ito ay nangyayari kapag ang string ay nawawalang mga marker ng halaga (e.g., ",", "", "?", "NA", "nd", "NaN".) para sa pagbabagong iyan sa sampol na talaksan ay ginagawa ERDDAP 'Ang katutubong nawawalang mga pamantayan (127 sa mga haliging byte, 32767 sa mga maiikling tudling, 2147483647 sa mga tudling, 9223372036854775807 sa mahahabang tudling, at ang NaN sa lumulutang at dobleng variables) . Nagaganap din ito para sa mga halaga ng NaN sa mga lumulutang at dobleng variables. Gayundin, ang "nd" ay idinagdag sa listahan ng mga karaniwang nawawalang mga marker ng halaga sa mga numerong hanay ng data na ERDDAP™ dapat hanapin. Salamat kay Matt Biddle ng BCO-DMO.
         
    * IMPROVED: ang opsiyon ng ncrup Mga Data Ang Xml ngayon ay mas tulad ng ncdump (ngunit ginagamit pa rin ang netcdf-java na bersyon ng ncdump) . Ngayon, naglilimbag ito ng bagong listahan ng mga mapagpipilian. Ngayon, para sa .nc Mga talaksang ml, inililimbag nito ang nicdump output para sa resulta ng .nc Ang talaksang ml ay nagbabago sa ilalim .nc o .hdf talaksan.
         
    * BUG FIX: Nagkaroon ng butas sa hawakan ng talaksan (sa wakas ay nagpangyari ERDDAP™ upang magpayelo) na sanhi kapag lumilikha ng ilang uri ng mga talaksan ng output, e.g., .geotif, lalo na kapag may mga pagkakamaling naganap sa panahon ng paglikha. Sa palagay ko/pag-asa ito ngayon ay lahat na nakapirme. Kung makakita ka pa rin ng mga problema, pakisuyong sabihin mo sa akin ang uri ng dataset (Pidyo o mesa) at ang uri ng talaksan na nagiging sanhi ng problema. Dahil kina Steven Beale, Lynn DeWitt, Jibei Zhao, at iba pa.
         
    * BUG FIX: Ang WMS   Leaflet Ang demo ay hindi lubusan/tamang nagkumberte ng "depth" axis sa "elevation". Ngayon, gayon nga, at ang nasirang mga kahilingan ng alamat ay naiayos na. Gayundin, lahat ng mga opsyon ng axis sa mga listahan ng drop-down ay palaging naka-akyat sa subdecated order. Salamat kina Antoine Queric at Aurelie Briand.
         
    * BUG FIX: Ang EDDTable FromFiles ngayon ay tamang sumusuporta sa mga limitasyon sa String variables na nilikha mula sa char variables sa data files. Salamat kina Antoine Queric at Aurelie Briand.
         
    * BUG FIX: Ngayon, kapag hindi na makuha ang isang dataset, sinisikap ng dataset na alamin ang impormasyon (na may mensaheng "Ang dataset na ito ay kasalukuyang hindi makukuha.") Ang mga kripto nito, ay nagtala ng mga aksiyon, rs, at anPM180 datasets na umaasa dito. Salamat kina Roy Mendelssohn at Bob Simons.
         
    * BUG FIX: Dalawang bug na may kaugnayan sa EDDTableCopy. Salamat kay Sam McClatchie.
         
    * IMPROVED: Ang bilang ng nabigong mga kahilingan na ipinakita sa status.html page ay tataas dahil mas maraming bagay ang nabibilang bilang mga kabiguan kaysa dati.
         
    * IMPROBLE: ERDDAP ' s status.html ay nagpapakita ngayon ng "Requests (Mahilig sa media) " sa serye ng panahon. Dati, ipinakikita nito ang mga panahon ng media na hanggang sa mga segundo ng integer.
         
    * IMPROVED: Sa jsonld output, ang jsonld "name" ngayon ay nagmula sa dataset's "title" sa loob ERDDAP , at ang jsonld "headline" ay nagmula ngayon sa dataset's " datasetID " sa loob ERDDAP . Dati, ito ay nabaligtad. Ito ay tila mali sa akin dahil sa sa normal na gamit sa Ingles, ang "pangalan" ay karaniwang maikli, (Napakahusay) Natatanging identifier na bihira/hindi nagbabago (e.g., Robert Middlename Simons) , hindi isang paglalarawan na hindi natatangi at na madaling baguhin at kadalasang nagbabago (e.g., "Isang lalaki na sumusulat ng software para sa NOAA " Isang matangkad na lalaki na sumusulat ng software para sa mga software NOAA ") . Gee, magiging maganda kung ang schema.org na kahulugan ng schema. [Pangalan](https://schema.org/name) , sa konteksto ng isang Daket, ay mas espisipiko. Ang mga gumagawa ng software ay dapat na makapagsulat ng isang pagpapatupad ng isang kumplikasyon batay sa propesiya lamang, nang walang patnubay mula sa mga dalubhasa. Subalit iniaantala Ko ang Google (Partikular na si Natasha Hindi) , NCEI (Partikular na si Juan Relph) , at Rob Fuller.
         
    * IMPROVED: Sa jsonld output, ang apat na "spatialCoverage GeoShape box" na mga halaga ngayon ay mainLat monLon maxLat maxLon. Dati, ang mga posisyong lat at lon ay nabaligtad. Gee, magiging maganda kung ang schema.org kahulugan ng schema. [GeroShape](https://schema.org/GeoShape) ang tamang pagkakasunud - sunod. Ang mga gumagawa ng software ay dapat na makapagsulat ng isang pagpapatupad ng isang kumplikasyon batay sa propesiya lamang, nang walang patnubay mula sa mga dalubhasa. Salamat kina Natasha Noy at Rob Fuller.

## Bersiyong 1.82{#version-182} 
 (inilabas noong 2018-01-26) 

*    **Bagong mga Katangian (para sa mga gumagamit) :**   
     
    * Maraming mga tusong pagbabago sa hitsura-and-pandama ng ERDDAP™ web pahina.
        * IMPROBLE: ERDDAP™ ngayon ay gumagamit ng HTML 5 at ginagamit nang mas mabuti ang CSS.
        * IMPROVED: Ang mga web page ay bahagyang binago upang gawin itong mas malinis at hindi gaanong "busy". (Makapal pa rin ang mga ito at mayroon pang mga bagay na maaaring ireklamo ng isa, subalit umaasa na hindi na gaanong gayon kaysa dati.) Salamat kay John Kerfoot dahil sa ilang komento.
        * IMPROVED: Mas maganda ngayon ang hitsura ng mga web page sa mga cellphone at iba pang maliliit na device, lalo na kung ginagamit mo ito sa landscape oryentation. Mas maganda rin ang kanilang hitsura sa napakaliit at napakalaking mga bintana sa mga desktop browser.
        * IMPROVED: Upang mapabuti ang seguridad at iba pang dahilan, ang paggamit ng isang out-of-date Openlayers na bersyon para sa WMS Ang mga pahina ng demonstrasyon ay pinalitan ng Leaflet .
        * BAGO: suporta sa mga preview ng imahe, audio, at video files "files" sistema (Halimbawa, [ang test data set](https://coastwatch.pfeg.noaa.gov/erddap/files/testMediaFiles/ShouldWork/) ) at saka .htmlTable mga tugon kapag ang isang selula ay may URL ng isang imahe, audio o video file (Halimbawa, [ang kahilingang ito](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/testMediaFiles.htmlTable?url%2Cname%2ClastModified%2Csize%2CfileType%26url=~%22.*ShouldWork.*%22) ) . Kung ikaw ay aali - aligid sa isang '?' icon, dapat mong makita ang isang larawan, audio, o video file preview. Maaari mo ring i - click ang link ng file para makita ang buong screen ng file sa browser mo. Tingnan ang [Filipina ng Media](/docs/server-admin/datasets#media-files) . Pansinin na sinusuportahan ng iba't ibang browser ang iba't ibang uri ng file, kaya ang mga halimbawa ay maaaring hindi gumagana sa iyong browser.
Dahil sa mga taong ito/links para sa mga ideya at sampol code para sa CSS-lamang image toolts (noon https://codepen.io/electricalbah/pen/eJRLVd ) at ipinagpaliban na larawan (noon https://varvy.com/pagespeed/defer-images.html )   (bagaman binago ang kodigo bago gamitin ERDDAP ) .
Salamat kay Cara Wilson, Matthew Austin, at Adam Shepherd/BCO-DMO dahil sa mga kahilingan para sa suporta ng imahen.
Salamat kina Jim Potemra, Rich Signell, OOI, at Carrie Wall Bell para sa mga kahilingan para sa audio/hydrophone file support.
Salamat sa OOI sa pagpapakita ng pangangailangan para sa suporta ng video.
        * BAGO: Isang subset ng datos mula sa anumang bagay ERDDAP™ datos (ngunit karaniwang isang dataset mula sa mga audio files) ay maaari na ngayong mailigtas sa isang .wav audio file. ( [Mga dokumento](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#wav) ) Salamat kina Jim Potemra, Rich Signell, OOI, at Carrie Wall Bell para sa mga kahilingan para sa audio/hydrophone file support.
        * IMPROVE: Ang format para sa Web Accessable Folders (WAF)   (e.g., ang /files/ folders) ay binago upang gamitin ang isang mesa ng HTML. Ang bagong format ay gumagaya sa mas bagong bersiyon ng directory na nagtatala ng mga web page na nilikha ng mas bagong mga bersiyon ng Apache. Masusumpungan ng mga tao na ang mga pagbabago ay gumagawa sa impormasyon na mas madaling basahin. Software na nag-parse ng mga dokumentong ito (e.g., software na nag-aani ng ISO 19115 dokumento mula sa ISO 19115 ERDDAP ) Kailangang baguhin, subalit ang bagong format ay mas madaling i-parse kaysa sa dating format. (Atensiyon, Anna Milan.) 
        * BAGO outOfDateDatasets.html pahina. ( [halimbawa](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html) ) Ang web page na ito ay nagpapakita ng isang mesa na may lahat ng mga malapit-real-time datasets na may isang table na may isang&lt; testOutOfDate &gt; tag (Tingnan ang ibaba) , inihanay sa kung paano out-of-date ang mga datasets. Ang dashboard na ito ay dapat na maging kapaki - pakinabang para sa ERDDAP™ Mga administrador at nagtatapos sa mga gumagamit kapag nais nilang malaman kung aling datasets ang out-of-date. Para sa mga out-of-date datasets, malamang na may problema sa pinagmulan ng datos, kung kaya't ERDDAP™ ay hindi makita/kuha ng datos mula sa mas kamakailang puntos ng oras.
Mga koordinado: Kung ayaw mo ng isang Out-Of-Date Datasets web page, idagdag ito sa iyong setup.xml:
            &lt;Maling anyo ng OfDateDatasetsActive&gt;&lt;/outofDateDatasetsActive&gt;
Mayroon na ngayon testOutOfDate at palabas Mga haligi ng Otydate sa allDatasets datos.
Salamat kay Bob Simons, na matagal nang nagnanais nito, at sa matatalinong tao ng Marine Institute ng Ireland na nagbigay sa akin ng inspirasyon sa pamamagitan ng kanilang dedikadong Raspberry Pi at monitor na laging nagpapakita ng iskrin na gaya nito sa kanilang opisina.
        * IMPROBLE: .htmlTable at .xhtml Ang pagtugon ngayon ay mas mainam ang pagkakaayos, mas siksik, at sa gayo'y mas mabilis ang pagbuhat. Salamat sa HTML5 at CSS.
    * BAGOng output file na tipo para sa mga griddap datasets: .timeGaps. Ito ay nagpapakita ng isang talaan ng mga puwang sa mga halaga ng panahon na mas malaki sa median gap. ( [halimbawa](https://coastwatch.pfeg.noaa.gov/erddap/griddap/erdMHchla8day.timeGaps) ) Ito ay kapaki - pakinabang para sa ERDDAP™ Ang mga administrador at nagtatapos sa mga tagagamit kapag nais nilang malaman kung may hindi inaasahang mga puwang sa mga halaga ng panahon para sa isang dataset na inaasahang regular na may espasyo ng mga halaga ng oras. Dahil kina Bob Simons at Roy Mendelssohn na nangangailangan ng tampok na ito.
    * IMPROBED: Ang default graph para sa allDatasets Ang dataset ay isa na ngayong mapa na may x=maxLon at y=maxLat. Salamat kay John Kerfoot, Rich Signell, at OOI-CI.
    * BAGO: [Pag - aayos](https://github.com/ioos/erddapy) -- hindi isang ERDDAP™ sa ngayon, pero marami ang magiging interesado ERDDAP™ ay gumagamit. Pagkakagulo ( ERDDAP™ + Python ) ay isang Python aklatan na nilikha ni Filipe Fernandes na "nagsasamantala sa ERDDAP ' RESTful Mga serbisyong web at lumilikha ng ERDDAP™ URL para sa anumang kahilingan tulad ng paghahanap ng datasets, pagkuha ng metadata, pag-download ng datos, atbp." Salamat kay Filipe Fernandes.
    * Dapat sana'y nabanggit ko na: Mayroong third-party R na pakete na dinisenyo upang mas madaling gumana kasama ng ERDDAP™ mula sa loob ng R: [tumbong](https://github.com/ropensci/rerddap#rerddap) . Salamat [PAGTUBOS](https://ropensci.org/) at Roy Mendelssohn.
         
*    **Mga Bagay ERDDAP™ Kailangang Malaman at Gawin ng mga Administrador:**   
     
    * DO: Sa setup.xml, sa ibaba mismo&lt;Admin Institutation&gt;, pakisuyong magdagdag ng&lt;admin InstitutionUrl&gt; tag na nagsasaad ng isang URL para sa inyong institusyon (o grupo) .
    * DO: Ang 3 tag na ito sa setup.xml ay hindi na ginagamit:
        &lt;magsimula HeadHtml&gt;,&lt;simulaBodyHtml&gt; at&lt;duloBodyHtml&gt;. Pinapalitan ang mga ito ng
        &lt;Nagsimula ngHtml5&gt;,&lt;simulaBodyHtml5&gt; at&lt;deBodyHtml5&gt;, na may default na halaga na itinakda sa mga mensahe.xml (at ipinakikita sa ibaba) .
        
Iminumungkahi namin ang paggamit ng default&lt;Simula ng HeadHtml5&gt; at&lt;duloBodyHtml5&gt;.
Aming inirerekomenda: Kung kayo'y gumawa ng mga pagbabago sa orihinal&lt;mag-umpisaBodyHtml&gt; at/o nais gawing maayos ang iyong ERDDAP™ ngayon, pakisuyong kopyahin ang bago&lt;simulaBodyHtml5&gt; tag (mula sa ibaba) sa iyong setup.xml at baguhin ito upang gawing maayos ang iyong kalagayan ERDDAP™ nang sa gayon ERDDAP 'Ipinababanaag ng mga pahinang web ang inyong organisasyon, hindi ang inyong organisasyon NOAA   ERD . Kapansin - pansin, pakisuyong baguhin ang "Isinilang sa iyo sa pamamagitan ng" iyong organisasyon (s) . Kung kailangan mo ng tulong, pakisuyong mag - email erd.data at noaa.gov . ( Kung ayaw mong baguhin ang iyong kaugalian ERDDAP™ ngayon, gamitin ang default&lt;simulaBodyHtml5&gt;.)
        
Pagkatapos ay i-delete ang 3 lumang tag sa inyong setup.xml na hindi na ginagamit.

```
        <startBodyHtml5><!\\[CDATA\\[ 
        <body>
        <table class="compact nowrap" style="width:100%; background-color:#128CB5;"> 
          <tr> 
            <td style="text-align:center; width:80px;"><a rel="bookmark"
              href="https://www.noaa.gov/"><img 
              title="National Oceanic and Atmospheric Administration" 
              src="&erddapUrl;/images/noaab.png" alt="NOAA"
              style="vertical-align:middle;"></a></td> 
            <td style="text-align:left; font-size:x-large; color:#FFFFFF; ">
              <strong>ERDDAP</strong>
              <br><small><small><small>Easier access to scientific data</small></small></small>
              </td> 
            <td style="text-align:right; font-size:small;"> 
              &loginInfo; &nbsp; &nbsp;
              <br>Brought to you by 
              <a title="National Oceanic and Atmospheric Administration" rel="bookmark"
              href="https://www.noaa.gov">NOAA</a>  
              <a title="National Marine Fisheries Service" rel="bookmark"
              href="https://www.fisheries.noaa.gov">NMFS</a>  
              <a title="Southwest Fisheries Science Center" rel="bookmark"
              href="https://www.fisheries.noaa.gov/about/southwest-fisheries-science-center">SWFSC</a> 
              <a title="Environmental Research Division" rel="bookmark"
              href="https://www.fisheries.noaa.gov/about/environmental-research-division-southwest-fisheries-science-center">ERD</a>  
              &nbsp; &nbsp;
              </td> 
          </tr> 
        </table>
        \\]\\]></startBodyHtml5>
```

May iba pang paraan na magagawa mo [Pag - aayos ERDDAP™ ](/docs/server-admin/deploy-install#customize) gayo'y ERDDAP 'Ipinababanaag ng mga web page ang inyong organisasyon sa halip na ang mga web page NOAA   ERD .
        
    * PAGGAWA: Ang&lt; EDDGrid ...Examplegt; tags (nagsisimula sa&lt; EDDGrid IdExamplegt; at ang&lt;Nakakain... Mga tag ng Halimbawa (nagsisimula sa&lt;EDDTable IdExamplecgt;) sa iyong setup.xml file ay ginagamit upang lumikha ng mga halimbawa sa griddap at tabledap Mga dokumento. html web page sa iyong web page ERDDAP .
        
Kung hindi mo pinasadya ang mga tag na iyon, pakisuyong alisin ito sa iyong setup.xml file. Ngayon silang lahat ay may mga default sa mga mensahe.xml na tumutukoy sa mga dataset sa Bob's ERDDAP™ sa https://coastwatch.pfeg.noaa.gov/erddap/index.html . Kaya hindi mo na kailangang magkaroon ng espesipikong mga dataset sa iyong katawan ERDDAP . Kung nais mong daigin ang mga default, kopyahin ang ilan o ang lahat ng mga tag na iyon sa iyong setup.xml at baguhin ang kanilang mga pamantayan.
Kung gusto mong banggitin sa iyo ang mga halimbawa ERDDAP™ , ang pinakamadaling paraan ay:
        
        1. Isama ang dalawang datasets na ito sa inyong ERDDAP™ sa pamamagitan ng pagdaragdag nito sa iyong sarili datasets.xml :
```
            <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>
            </dataset>
            <dataset type="EDDTableFromErddap" datasetID="pmelTaoDySst" active="true">
                <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst</sourceUrl>
            </dataset>
```

        2. Ihulog ang tag na ito sa iyong setup.xml, ngunit palitan ang URL sa iyong URL ERDDAP ' ( https ?) URL:
```
            <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
            <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```
        
Kung nasanay mo ang mga tag na iyon, iwan mo na ang mga ito at pakisuyong idagdag ang 2 bagong tag na ito sa iyong setup.xml upang tiyakin ang mga ito ERDDAP™ URL para sa mga dataset na ito, subalit palitan ang URL sa iyong sarili ERDDAP ' ( https ?) URL:
```
        <EDDGridErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDGridErddapUrlExample>
        <EDDTableErddapUrlExample>https://coastwatch.pfeg.noaa.gov/erddap/</EDDTableErddapUrlExample>
```

    * PAGGAWA: ERDDAP™ ngayon ay gumagamit ng talaksang css na tinatawag na erddap2.cs. Kung gagawa ka ng mga pagbabago \\[ tomcat \\] /webapps/erddap/images/erddap.cs, isaalang-alang ang paggawa ng katulad na mga pagbabago sa erddap2.cs (sa directory ring iyon) .
    * BAGO: ERDDAP Ang mga pahinang web ngayon ay may malaking bilang ng halos di - nakikitang panloob na mga kawing (itim ang teksto at hindi underlined) . Kung aali - aligid ka sa isa sa mga kawing na ito (Karaniwan nang ang unang mga salitang paulo at parapo) , ang cluster ay nagiging isang kamay. Kung tutuldukan mo ang kawing, ang URL ang panloob na kawing sa bahaging iyon ng dokumento. Ginagawa nitong madali na tukuyin ang espesipikong mga bahagi ng dokumento. Salamat kay Bob Simons, na matagal nang nagnanais nito.
    * BAGO: ERDDAP™ sumusuporta ngayon [Byte Range / Pagtanggap-Ranges](https://en.wikipedia.org/wiki/Byte_serving) mga kahilingan para sa mga bahagi ng /file/ files. Ito ay kinakailangan upang suportahan ang mga manonood ng audio at video sa mga browser.
    * DO: Ngayon, upang pagbutihin ang katiwasayan, kung ikaw ay espisipikong gagawa&lt;baseHtpsUrl&gt; sa setup.xml (at sa gayo'y suportahan https ) , ang iminumungkahing bandila Ang Url ay isang https URL na may mas matatag na flagKey. Kung gayon, anumang nakaraang mga flagUrls/flagKeys ay magiging imbalido. Mga Admin: Kung kapit sa iyo ang mga pagbabagong ito ERDDAP™ at kung ikaw ERDDAP™ mayroon EDDGrid Mula sa Erddap at sa EDDTable Mula sa Erddap's na umaayon sa malayo ERDDAP kung gayon, pagkatapos mong mag - update ERDDAP , ang iyong ERDDAP™ kusang tatangkain mong magsuskribe ng bagong flagUrl, kaya dapat mong alisin ang lumang mga suskripsiyon at patunayan ang bagong mga suskripsiyon kapag nakakuha ka ng bagong mga email ng suskripsiyon.
    * PARA MAGAMIT: Kung ERDDAP™ mayroon EDDGrid Mula sa mga datasets ng Erddap para sa mga erdVH3 dataset sa coastwatch ni Bob ERDDAP™ , pakisuyong baguhin ang mga ito upang tukuyin ang bagong erdVH2018 datasets.
    * DO: Kung isasama mo ang alinman sa mga sampol ng jplaAquariusSSSS sa inyong mga dataset ERDDAP™ , palitan ng "V4" sa datasetID ' s to "V5".
    * PAGGAWA: actual\\_range ay isa na ngayong pamantayang attribute ng CF (noong CF-7.) at maliwanag na sabihin na kung iba - iba ang gamit add\\_offset at/o scale\\_factor upang ilagay ang mga halaga ng datos, pagkatapos ang actual\\_range Ang mga halaga ay dapat na gumamit ng di-packed data type at i-blocked na mga halaga. Nakalulungkot, salungat ito sa ating dating payo. Mga GenerateDataset Xml na ngayon ay nakabuklat na actual\\_range mga pamantayan, subalit hindi niyan aayusin ang umiiral na mga dataset sa iyong mga datasets.xml talaksan.
        
Kaya, pakisuyong suriin ang inyong datasets: kung ang mga halaga ng isang variable ay siksik at kung ang actual\\_range ay nakatakda bilang nakaimpakeng halaga ng datos, pakisuyong magdagdag ng isang&lt; addAttributes &gt; actual\\_range na magtakda ng mga halagang hindi nabuklat. Kung hindi, ang dataset ay hindi magpapasok ERDDAP . Ang simple at halos sakdal na paraan upang gawin ito ay saliksikin ang iyong buhay datasets.xml para sa pinagmumulan Attributes na mayroon
```
        <att name="actual\\_range" type="shortList">  
        or <att name="actual\\_range" type="intList">  
```
at a scale\\_factor iba pa kaysa 1.0. Iyon ang mga actual\\_range Mga katangian na baka kailangan mong ayusin.
        
Para sa mga pagkakaiba - iba ng axis EDDGrid mga datos, ERDDAP™ laging itakda ang actual\\_range Ipagpalagay nang ito ang aktuwal na saklaw ng mga pamantayan yamang alam nito ang mga pamantayang iyon.
        
Para sa axis ay iba - iba na may bumababang mga pamantayan (e.g., iba - iba ang latitud) , ERDDAP™ Nilalang actual\\_range kasama ng \\[ 0 \\] ... \\[ huli \\] Mga pamantayan, na mataas... mababa. Ngayon ito ay palaging gumagamit ng mababang...mataas na mga pagpapahalaga upang gawin ang bagong kahulugan ng CF.
        
Ang kawastuan ng actual\\_range Ang mga halaga ay partikular na mahalaga para sa EDDTable datasets, dahil ERDDAP™ ay mabilis na tatanggihan ang mga kahilingan ng gumagamit para sa mga data values na mas mababa kaysa sa mga actual\\_range Katamtamang halaga o alin ang mas malaki kaysa sa actual\\_range Napakalaking halaga.
        
Kaugnay: ang aktuwal na\\_min, aktuwal na\\_max, data\\_min at data\\_max Ang mga katangian ay nawawala na ngayon. Pakisuyong ikumberte ang inyong datasets upang magamit actual\\_range sa halip.
        
    * MAGGAWA (Hindi sapilitan, subalit inirekomenda) : Para sa bawat malapit-tunay-panahon at paghula ng dataset sa iyong ERDDAP™ , pakisuyong magdagdag ng isang [&lt; testOutOfDate &gt;] (/docs/server-admin/datasets#tesoutofdate) tag na may halaga sa anyo now- _Units_, e.g., now- 2 araw. Kung ang sukdulang halaga ng oras para sa dataset ay mas matanda sa halagang iyon, ang dataset ay itinuturing na out-of-date at mamarkahan bilang gayon sa dataset [ outOfDateDatasets.html ](https://coastwatch.pfeg.noaa.gov/erddap/outOfDateDatasets.html) web pahina. Ito ay nagbibigay ng madaling paraan upang makita mo kung ang isang bagay ay mali sa pinagmulan ng dataset.
    *    [BAGO: Semantic Markup of Datasets na may json-ld (JON Maugnay na Data) ](/docs/server-admin/additional-information#json-ld)   
         ERDDAP™ ginagamit ngayon [json-ld (JON Maugnay na Data) ](https://json-ld.org) upang gawing bahagi ng talaan ng datos at datasets [" semantic web "](https://en.wikipedia.org/wiki/Semantic_Web) , na siyang ideya ni Tim Berners-Lee na gawing mas madaling basahin ang web content at machine "mauunawaan". Paghahanap ng mga makina ( [Ang Google lalo na](https://developers.google.com/search/docs/data-types/datasets) ) at iba pang kasangkapang semantiko ay maaaring gumamit ng naka-ayos na markup na ito upang mapadali ang pagtuklas at indexing. Ang json-ld seted markup ay lumilitaw bilang hindi nakikitang-to-humans&lt;&gt; ng Sulat kodigo sa http://.../erddap/info/index.html web pahina (na isang semantikong web [Datatong](https://schema.org/DataCatalog) ) at sa bawat isa http://.../erddap/info/_datasetID_/index.html web pahina (na isang semantikong web [Talaan ng mga Nilalaman](https://schema.org/Dataset) ) . (Partikular na salamat kay Adam Lead mas mahusay at Rob Fuller ng Marine Institute sa Ireland sa paggawa ng mahihirap na bahagi ng gawain upang gawin ang bahaging ito ng Marine Institute ERDDAP .) 
    * BAGO: May mga bagong dataset type na puwedeng basahin mula sa audio files:
         [ EDDGrid Mula sa AudioFiles](/docs/server-admin/datasets#eddfromaudiofiles) , na nagsasaalang-alang sa mga audio data bilang mga linked data.
         [Mga EDDTable Mula sa AudioFile](/docs/server-admin/datasets#eddfromaudiofiles) , na tinatrato ang audio data bilang tabular data. Salamat kina Jim Potemra, Rich Signell, OOI, at Carrie Wall Bell para sa mga kahilingan para sa audio/hydrophone file support.
    * Mga Pagbabago sa GenerateDatasets Xml (at kaugnay na mga pagbabago) :
        * BAGO: ERDDAP™ ngayon ay may sistema na awtomatiko [update out-of-date URLs](/docs/server-admin/additional-information#out-of-date-urls) kapuwa sa GenerateDatasets Xml at kapag nagkarga ng datasets. Kung may mga mungkahi ka para sa karagdagang mga URL na dapat mahuli at baguhin, o kung inaakala mong ito ay dapat na gawing isang serbisyo (gaya ng mga Tagapagkumberte) , Please email erd.data at noaa.gov .
        * BAGO: Ngayon, kung GenerateDatasets Nakita ni Xml ang CF standard\\_name   (na dapat ay mas mababa pa) na may itaas na karakter, idinaragdag nito ang lahat ng mas mababang bersyon&lt; addAttributes &gt;. Gayundin, kapag may dataset na karga, kung ERDDAP™ tingnan ang CF standard\\_name taglay ang isang itaas na karakter, tahimik na binabago nito ang katawan tungo sa standard\\_name . Salamat sa Mayamang Signell.
        * BAGO: Ngayon, kung GenerateDatasets Xml ay nakakakita ng isang attribute na may isang panahon na wala sa ISO 8601 format, ito ay nagdaragdag ng ISO 8601 na anyong bidyo sa&lt; addAttributes &gt;. Kung ERDDAP™ ay hindi nakikilala ang format, ito ay nag-iiwan ng halaga ng oras na hindi nagbabago. Kung may makita kang format na ERDDAP™ ay hindi nakakakilala at nag - aayos, pakisuyong i-mail ito erd.data at noaa.gov .
        * IMPROBED: Ang mababang antas na kodigo para sa EDDGrid Mga Mula sa Thred Catalog opsyon sa GenerateDatasets Ang Xml ngayon ay umaasa sa Unidata " netcdf-java katalogo " na kodigong gumagapang (thredds. uri ng katalogo) upang pangasiwaan nito ang lahat ng katalogo ng THEDS (na maaaring maging nakagugulat at masalimuot) . Salamat kay Roland Schweitzer sa pagmumungkahi ng pagbabagong ito at salamat sa kaniya Unidata para sa kodigo.
        * BAGO: GenerateDatasets Xml para sa EDDGrid Idinaragdag ngayon ng FromDap ", simulan ang Tyear-EndTaon" upang tapusin ang pamagat batay sa aktuwal na mga halaga ng axis sa panahon. EndYear="present" kung ang datos ay umiiral sa huling 150 araw.
        * BAGO: GenerateDatasets Xml para sa EDDGrid Idinagdag ngayon ng FromDap ", \\[ resolusyon \\] °" sa pamagat kung ang dataset ay pantay na naka-link at pareho para sa lat at lon.
        * IMPROVED: Ang panahong converter ngayon ay may karagdagang mga katangian, lalo na ang kakayahan na baguhin ang mga strandong panahon sa isang malawak na iba't ibang karaniwang format sa ISO 8601 strando o sa isang UDUnits-compatible number. Lahat ng dating suportadong mga bahagi ay patuloy na gumagana, hindi nagbabago.
        * BUG FIX: GenerateDatasets Ang Xml at ang Keywords converter ay kinabibilangan ngayon ng "Linyang Siyensiya &gt;" sa simula ng GCMD Science Keywords. Kapag may dataset ERDDAP™ , ERDDAP™ ang anumang susing salita ng GCMD sa keywords na hindi nagsisimula sa "Liham na Siyensiya &gt; " o na gumagamit ng anumang bagay maliban sa kaso ng titulo (kung saan ang unang titik ng bawat salita ay ginawang kabisera) .
        * IMPROBLE: Kapag nagmumungkahi&lt; destinationName &gt;'s, GenerateDatasets Xml para sa EDDTable FromAsciiFiles ay ginamit lamang ang dulo ng buntot sourceName mga s na may '/'   (ang ilan ay pangalan-tulad ng talaksan) . Ngayon ay ginagamit nito ang buong sourceName (e.g., "blahlahlah (m/s)". Ang pagbabagong ito ay magiging mabuti para sa ilang datasets at hindi para sa iba, ngunit ito ay mas ligtas na pag-uugali. Salamat kay Maurice Libes.
        * BUG FIX: GenerateDatasets Ang Xml at ang dataset constructionors ay tumitiyak ngayon na walang kopyang mga pangalan sa hanay. Salamat kay Maurice Libes.
        * BUG FIX: GenerateDatasets Xml para sa EDDTable FromAsciiFiles ay hindi sumulat&lt;columnSeparator&gt; sa output. Ngayon ay gayon nga. Salamat kay Maurice Libes.
    * BAGO: Ang kasangkapang DasDds ay naglilimbag ngayon ng impormasyon tungkol sa agwat ng oras (ang [.timeGaps impormasyon](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#timeGaps) ) kung ang dataset ay isang grided dataset.
    * BAGO: Ang patiunang Paghahanap ay tumatanggap ngayon ng "ngayon_\\-nUnits_" na mga pamantayan sa oras. Salamat sa Mayamang Signell.
    * IMPROVED: Upang mapabuti ang seguridad, kapag ang adres ng email sa metadata ng dataset o datos ay isinulat sa isang html web page, ang "@" ay pinapalitan ng " at" sa ". Hinuhuli lamang nito ang mga direksiyon ng email na siyang buong metadata o halaga ng datos, hindi ang mga adres ng email na nasa mas mahahabang halaga.
    * IMPROBLE: Upang dagdagan ang seguridad, ang RSS ang mga pribadong dataset na makukuha na ngayon ng mga gumagamit (at RSS mambabasa) na inilakip at awtorisadong gamitin ang dataset na iyon.
    * BAGO: Ngayon, kapag may dataset, kung may data date\\_created , date\\_issued , date\\_modified , o date\\_metadata\\_modified attribute ay may halaga ng panahon na hindi nasa ISO 8601 format, ERDDAP™ Ipalit ito sa ISO 8601 na anyo ng panahon. Kung ERDDAP™ ay hindi nakikilala ang format, ito ay nag-iiwan ng halaga ng oras na hindi nagbabago. Kung may makita kang format na ERDDAP™ ay hindi nakakakilala at nag - aayos, pakisuyong i-mail ito erd.data at noaa.gov .
    * IMPROVED: .dods mga tugon mula sa EDDGrid Ang mga dataset ay dapat na lubhang mas mabilis ngayon. Salamat sa Mayamang Signell.
    * Mga pagbabagong may kaugnayan sa ERDDAP Ang paglikha ng ISO 19115 dokumento:
        * BUG FIX: kapag lumilikha ng mga dokumentong ISO 19115, dataVariable ang mga yunit ay hindi HTML Attribute na naka-install at ang mga porsyento ay naka-edukasyon. Ngayon ay gayon nga. Salamat sa ISO 19115 ng NGDC.
        * BUG FIX: kapag lumilikha ng mga dokumentong ISO 19115, date\\_created ay ginamit na gaya ng, kadalasang mali ang format. Ngayon ito ay ginagawang ISO 8601 Z string. Salamat sa ISO 19115 ng NGDC.
        * BUG FIX: kapag lumilikha ng mga dokumentong ISO 19115, ERDDAP™ ay sumusulat ngayon ng mga petsa na may taóng=0000 (gaya ng mga climatology dataset) , dahil hindi pinapayagan ng ISO 19115 schema ang mga petsa na may taong=0000. Salamat sa ISO 19115 ng NGDC.
    * BAGO: Gaya ng hiniling mo http .../erddap/bersyon ay ibabalik lamang ang numero ng bersyon (bilang teksto) , e.g., " ERDDAP \\_bersyon=1.82".
Ngayon, isang kahilingan http .../erddap/bersion\\_string ay ibabalik ang numero at isang opsyonal na hulapi ng '\\_' plus ASCII text (walang puwang o control characters) , e.g., " ERDDAP \\_bersion\\_ string=1.82\\_JuansFork". Ang mga taong gumagawa ng fork ay magbibigay ng espesipikong kahulugan nito sa pamamagitan ng pagbabago ng EDStatic.erdapVersion. Ang ganitong paraan ng paggawa nito ay hindi nagdudulot ng problema sa mga naunang bersyon ng ERDDAP . Salamat sa Axiom (Lalo na, si Kyle Wilcox) at ang Marine Institute ng Ireland (Partikular, si Rob Fuller) .
    * BUG FIX: Para sa wms version=1.3.0, humiling ng= GetMap , crs=EPSG:4326 (hindi CRS:84) mga kahilingan: ang bbox order ay dapat mainLat,minLon, maxLat, maxLon. Para sa CRS:84 request, tulad ng dati, ang bbox order ay dapat na mainLon,minLat, maxLon, maxLat. Maaaring iayos nito ang paggamit ERDDAP ' WMS 1.3.0 serbisyo ArcGIS   (Salamat kay Paola Arce) . Salamat (hindi) hanggang sa OGC para sa paggawa nito na napakasalimuot. Salamat Leaflet sa paggamit nito nang wasto at sa pagbibigay sa akin ng paraan upang subukin ito.
    * IMPROVE: Dati, ang iminungkahing kawing para sa RSS at ang mga suskripsiyon sa email ay may http URL para sa iyong sarili ERDDAP . Ngayon ito na ang https URL, kung iyan ay aktibo.
    * BAGO: EDDGrid Sinusuportahan ngayon ng kopya ang isang opsyonal na tag&lt;Mula lamang noong&gt;_UNoValue_&lt;/ Tanging mula noong&gt;, kung saan ang halaga ay isang espesipikong ISO-8601-pormad na panahon o a now- Mga Pag - aari (e.g., now- 2 Taon) panahon. Tingnan ang [yaon lamang Mula Noong Dokumento](/docs/server-admin/datasets#onlysince) . Salamat kay Drew P.
    * IMPROBLE: Kung mayroon, ERDDAP™ ay magpapakita ng https URL (mula sa&lt;baseHtpsUrl&gt;, kung mayroon) sa halip na ang http URL kapag sinasabi nito sa mga gumagamit nito sa URL na idagdag/validate/remove/list ang isang suskrisyon.
    * BUG FIX: ERDDAP™ ay nagpapahintulot ngayon sa isang suskripsiyon na magsimula sa " https://" . (Tinampal ni Bob ang kanyang noo.) Salamat kay Jennifer Sevadjian.
    * BUG FIX: .jsonlKVP ginagamit ngayon ':' sa pagitan ng bawat susi at halaga, sa halip na '=' . (Tinampal ni Bob ang kanyang noo.) Salamat kay Alexander Barth.
    * BUG FIX: Dati, kung ikaw ay nagre - restar ERDDAP™ na may quickRestart=greal, at kung, bago muling maikarga ang dataset nang normal, tumawag ka sa isang EDDTable FromFiles dataset na gumagamit ng update EveryNMillis, at kung ang isang data file ay binago lamang, ang kahilingan ay mabibigo sa pamamagitan ng isang null pointer error. Ngayon ang kahilingan ay magtatagumpay. Salamat kay John Kerfoot.
    * BAGO: Kapag may dataset ERDDAP™ , ang mga susing salita ay binabago na ngayon upang uriin at alisin ang anumang bagong titik.
    * IMPROVED: Ngayon, kung isang .geoJson, .json o .nc May kahilingan ang oJson .json p parameter, ang tugon na mime type ay application/javascript. Pansinin na .json Hindi suportado ang mga symbolic link .jsonlCSV o .jsonlKVP , dahil hindi ito gagana. Salamat kay Rob Fuller.
    * IMPROVED: Ang mime type para sa mga json line fileType opsyons ngayon ay "application/x-jsonlines". Ito ay aplikasyon/jsonl. Sa kasalukuyan, walang tiyak na tamang pagpili.
    * IMPROVED: Ang bilang ng mga bigong kahilingan na ipinakita sa status.html page ay tataas dahil mas maraming bagay ang nabibilang bilang mga kabiguan kaysa dati, e.g., ClientAbortException.
    * IMPROBLE: Ngayon, kung isang tugon mula ERDDAP™ ay hindi siksik, kung gayon ang tagapangulo ng tugon ay isasama ang "Content-Encoding"="identidad".
    * IMPROVED: Ang "lisensiya" na attribute ay hindi kailangan. Ngayon, kung hindi ito tiyak, ang standardLicense mula sa mga mensahe.xml (o mula sa setup.xml kung naroroon) ay ginagamit bilang default.
    * BAGO: Mayroon na ngayong opsyonal [pangalan ng talaksang Accesssuxi](/docs/server-admin/datasets#fileaccessbaseurl) . na maaaring gamitin kasama ng umiiral [attribute ng talaksangAccessBaseUrl](/docs/server-admin/datasets#fileaccessbaseurl) .
    * IMPROBLE: Upang dagdagan ang seguridad, ang bersiyong ito ay tinipon na may pinakabagong bersiyon Java JDK v8u162.
    * BAGO: Para madagdagan ang seguridad, ilang karaniwang domain na nag - aalok ng pansamantalang adres ng email (e.g., @mailinator.com) ngayon ay nasa isang permanenteng mail blacklist para sa sistema ng mga suskripsiyon.
    * BAGO: Upang dagdagan ang seguridad, kasali sa mga matatangkad sa Daily Report ngayon ang:
Itakda Bigo ang Pag - uusap ng Bandila IP (mula noong huling araw - araw na report)   
Itakda Bigo ang Pag - uusap ng Bandila IP (mula noong magsimula)   
Itakda Nagtagumpay ang Pag - uusap Tungkol sa Bandila (mula noong huling araw - araw na report)   
Itakda Nagtagumpay ang Pag - uusap Tungkol sa Bandila (mula noong magsimula)   
Ang "Failed" na mga matataas na tao ay makikita mo kung sino ang (isang hacker?) ay nagsisikap na maglagay ng watawat, subalit ito'y nabibigo.
    * IMPROBLE: Upang dagdagan ang seguridad, mga direksiyon ng email sa mga direksiyon&lt;subscriptionEmailBlacklist&gt; sa inyong lugar datasets.xml ay itinuturing ngayon na case-insensitive.
         

## Bersiyong 1.80{#version-180} 
 (inilabas noong 2017-08-04) 

*    **Bagong mga Katangian (para sa mga gumagamit) :**   
     
    * BAGO orderByCount  () filter ay nagbibigay sa iyo ng katiyakan kung paano ibukud - bukod ang mga resulta (o hindi) at babalik lamang ng isang hanay para sa bawat grupo ng mga uri, na may bilang ng mga hindi-missing-halaga para sa bawat variable.
Halimbawa, orderByCount  (" stationID ") sa pamamagitan ng stationID at ibalik ang isang hanay para sa bawat isa stationID , na may bilang ng bilang ng mga hindi-missing-halaga para sa bawat variable.
Kung ikaw ay tiyak orderByCount  ("") , ang tugon ay magiging isa lamang hanay na may bilang ng mga hindi-missing-halaga para sa bawat data variable.
Tingnan ang [ orderBy ... dokumentasyon](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#orderBy) Salamat kay Ben Adams.
    * BAGO .nc talaksang oJson Ang uri ng opsyon para sa grided at tabular datasets. Ang mapagpipiliang ito ay gumagawa ng isang NCO lvl=2 "pediantic" na talaksan ng JSON na may lahat ng impormasyon na karaniwang matatagpuan sa isang .nc talaksan. Tingnan [ http://nco.sourceforge.net/nco.html#json ](https://nco.sourceforge.net/nco.html#json) Salamat kay Charlie Zender.
    * BUG FIX: Ang orderBy ... () Ang mga mapagpipilian sa pahinang web ng Make A Graph ay napangangasiwaan ngayon nang wasto.
    * BUG FIX: .geoJson output Ngayon ay hindi naglilimbag ng mga hanay kung saan ang mga halaga ng lat o lon ay nawawala. Gayundin, ang mga pamantayan sa altitud (kung mayroon) ay kasama na ngayon sa mga coordinate, hindi bilang mga data values. Salamat kay Jonathan Wilkins.
         
*    **Mga Bagay ERDDAP™ Kailangang Malaman at Gawin ng mga Administrador:**   
     
    * SEKSIYA SA ISYU: Ang protocols.js library na ginamit para sa OpenLayers demo on WMS sa mga pahina ERDDAP™ ay out-of-date at may bug na maaaring pumayag na ito ay magamit sa maling paraan. (Nakalulungkot, ang pag - aalsa OpenLayers at mga protocol. hindi madali ang js.) Ito ay nagbubukas ng posibilidad na ang aklatan ay maaaring buuin upang payagan ang isang cross-site na kahinaan. Gayunman, mula noon ERDDAP™ gamitin lamang ang OpenLayers sa espesipikong paraang pre-set-up at may espesipiko lamang ERDDAP -based data sources, naniniwala kami na walang cross-site na kahinaan sa ERDDAP 'Ang paggamit ng OpenLayers At protocols.js. Gayunman, kung hindi ka maniniwala rito, maaari mo nang sirain ang paggamit ng OpenLayers demo on WMS ng iyong mga pahina ERDDAP™ sa pamamagitan ng pagdaragdag
```
        <openLayersActive>false</openLayersActive>  
```
sa iyong setup.xml file. Ang default ay "tunay". Salamat kina Charles Carleton at NCEI.
    * SEKURY Refusion: Mga talaksang hindi ginagamit .jar at mga talaksang pangkopya .jar (Dahil sila rin ay nasa netcdf All.jar) ay inalis sa ERDDAP™ pamamahagi. Ang mga out-of-date .jar files ay ini-apdeyt. Salamat kina Charles Carleton at NCEI.
    * PAGTUWID: Ang netcdf All.jar file na ipinamamahagi kasama ang ERDDAP™ ang pinakabagong bersiyon (kasalukuyang 4.6.10) , ngunit ito ay naglalaman pa rin ng mga panloob na jackson .jar files na alam na out-of-date at may mga seguridad volnerabilidad, partikular na ang mga Jackson aklatan na ginagamit lamang kapag na-access ang Amazon S3 data sources. Kung hindi mo makuha ang impormasyon sa pamamagitan ng Amazon S3 (malalaman mo kung ikaw nga) , ang mga kakayahang ito ay hindi mahalaga.
        
Iginigiit ng mga netcdf-java developer na ang mga vulnerabilidad na ito ay hindi mahalaga dahil sa paraan ng paggamit ng netcdf code sa mga aklatan na ito at sa anumang kaso ay magiging mahalaga lamang kapag na-access ang Amazon S3. Tingnan [ https://github.com/Unidata/thredds/issues/866 ](https://github.com/Unidata/thredds/issues/866) . Naniniwala ako sa kanila. Kung nababahala ka pa rin tungkol dito, pakisuyong makipag - ugnayan sa mga gumagawa ng netcdf-java. (Pansinin na kung hindi ka naniniwala sa mga netcdf-java developer at pinag - iisipan mong huwag gamitin ERDDAP™ Dahil dito, hindi ka rin dapat gumamit ng THEDDS, dahil ang THEDDS ay gumagamit ng netcdf-java ng mas pangunahin at mas malawak kaysa sa urbano ERDDAP .) 
        
Mga Detalye: Ang nakayayamot na kodigo at ang mahihinang babala ay:
netcdf All-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-databind/pom.xml.
Tingnan https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Mataas
netcdf All-latest.jar/META-INF/maven/com.fasterxml.jackson.dataformat/jackson-dataformat-cbor/pom.xml
Tingnan https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Mataas
netcdf All-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-annotations/pom.xml
Tingnan https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Mataas
Tingnan https://nvd.nist.gov/vuln/detail/CVE-2016-3720 -- Mapanganib
netcdf All-latest.jar/META-INF/maven/com.fasterxml.jackson.core/jackson-core/pom.xml
Tingnan https://nvd.nist.gov/vuln/detail/CVE-2016-7051 -- Mataas
Tingnan https://nvd.nist.gov/vuln/detail/CVE-2016-3720 -- Mapanganib
"For version 4.6.10, aws-java-sdk-core draws in bersyon 2.6.6 ng jackson-\\* artifacts." (email mula sa mga taong netcdf-java) .
Salamat kina Charles Carleton at NCEI.
        
    * BINAGO NG COMPILE: Kung magre - recompile ka ERDDAP™ , pansinin na ang -cp classpath para sa command line ay mas maikli na ngayon kaysa dati. Tingnan ang bagong - eksenang tagpo [ang dokumentong ito](/docs/contributing/programmer-guide#development-environment) . Salamat kina Charles Carleton at NCEI.
    * BAGONG OPSYON sa GenerateDatasets Xml: EDDTable FromBcodmo, na para lamang sa internasyunal na gamit sa BCO-DMO.
Salamat kay Adam Shepherd at BCODMO.
    * BAGONG PAG - AABULOY at PAG - AABULOY: Kung ang isang EDDTable column ay may mga file ng web canccess files (e.g., larawan, video, o audio files) , maaari mong idagdag
```
        <att name="fileAccessBaseUrl">_someBaseURL_</a>  
```
upang tiyakin ang himpilang URL (dulo ng /) Kailangang gawing kumpletong URL ang mga files. Pagkatapos ay para sa .htmlTable sagot, ERDDAP™ ay magpapakita ng pangalan bilang kawing sa pinagsamang URL (ang himpilan Url pati na ang pangalan) .
Kung gusto mo ERDDAP™ upang ihain ang mga kaugnay na file, gumawa ng hiwalay na EDDTable FromFileNames dataset para sa mga file na iyon (ito ay maaaring isang pribadong dataset) .
Salamat kay Adam Shepherd at BCODMO.
    * BAGONG ANTRIYE RECOMMENDATION: Kung ang isang EDDTable column ay may mga file ng web available na file (e.g., larawan, video, o audio files) na makukuha sa pamamagitan ng arkibo (e.g., .zip talaksan) Makukuha sa pamamagitan ng URL, gamitin
```
        <att name="fileAccessArchiveUrl">_theURL_</att>  
```
upang magtakda ng URL para sa arkibo.
Kung gusto mo ERDDAP™ Upang maglingkod sa arkibo file, gumawa ng hiwalay na EDDTable FromFileNames dataset para sa talaksang iyon (ito ay maaaring isang pribadong dataset) .
Salamat kay Adam Shepherd at BCODMO.
    * IMPROVEMENTS to GenerateDatasets Xml upang alisin ang mga sanhi ng hindi tanggap/masama&lt; subsetVariables &gt; ang mga mungkahi at paggaya/masama ay nagmungkahi ng iba't ibang pangalan, atbp. Salamat sa Mayamang Signell, Adam Shepherd, at BCO-DMO.
    * BAGONG OPSYON: Ang pulitikal na hangganang impormasyon na ipinamahagi ERDDAP ay mula sa ikatlong partido at medyo out-of-date. Gayundin, may pinagtatalunang mga hangganan sa ilang dako sa daigdig, kung saan ang iba't ibang tao ay magkakaroon ng iba't ibang ideya tungkol sa kung ano ang tama. HINDI TAYO NAG - AABULOY TUNGKOL SA KARUNUNGAN NG POLITIKAL NA BOLUNDARY DATA NA NAGMUMUMUMUHAY ERDDAP . Kung hindi mo gusto ang pulitikal na hangganang impormasyon na dala ng ERDDAP™ , masasabi mo na ngayon ERDDAP™ upang huwag makabuo ng pulitikal na mga hangganan sa pamamagitan ng pagdaragdag
```
        <politicalBoundariesActive>false</politicalBoundariesActive>  
```
sa iyong setup.xml file. Ang default ay "tunay". Salamat sa Raju Devender.
    * BAGONG METADA TAG: Nasa datasets.xml para sa dataset, maaari mo ngayong tiyakin ang default number ng kulay Bar sections para sa isang dataVariable sa mga graph at mapa na may kasamang
```
        <att name="colorBarNSections">_anInteger_</att>  
```
         (default=-1, na nagsasabing pabayaan ERDDAP™ magpasiya) . Tingnan ang [kulay Paglalagay ng Barya](/docs/server-admin/datasets#color-bar-attributes) .
    * IMPROVE: ang hangganang kulay ng estado sa mga mapa ay lila (Napakadalisay Para sa Iyong mga Baby Bomer) . Ngayon ay abuhin na ito (sa pagitan ng pambansang hangganang abuhin at ng lupaing abuhin) .
    * BUG FIX:&lt;iso19115File&gt; at&lt;fgdcFile&gt; sa datasets.xml ay hindi laging wasto ang pangangasiwa. Ngayon ay gayon nga. Salamat sa BCO-DMO.

## Bersiyong 1.78{#version-178} 
 (inilabas noong 2017-05-27) 

*    **Bagong mga Katangian (para sa mga gumagamit) :**   
     
    *    (wala ni isa)   
         
*    **Mga Bagay ERDDAP™ Kailangang Malaman at Gawin ng mga Administrador:**   
     
    * IMPROVED: Ang pagkakasunud-sunod ng mga linya sa "MajorLdDatasets Time Series" sa status.html page ay ngayon pinakabago sa tuktok hanggang pinakamatanda sa ilalim.
    * BUG FIX: ERDDAP™ ngayon ay sumulat .nccsv mga talaksan na may iba't ibang oras actual\\_range bilang isang ISO-8601 String time. Na nagaayos sa bug ng EDDTable FromErddap parsing info mula sa isang remote dataset at mula sa quickRestart file para sa lahat ng EDDTable From...Files datasets. (Ang panahon actual\\_range ay magiging mali sa unang pagkakataon ang dataset na mga karga sa v1.78 ngunit tama pagkatapos na ito ay muling maikarga, e.g., kung ika'y magsasampa ng dataset.) 

## Bersiyong 1.76{#version-176} 
 (inilabas noong 2017-05-12) 

*    **Bagong mga Katangian (para sa mga gumagamit) :**   
     
    * Pagbabago sa Tomcat: Para hilingin ERDDAP™ mula sa software maliban sa mga web browser (e.g., curl , R, Matlab , Python , Java ) :
Katulad ng mga nakaraang pagbabago sa mga bersyon ng Tomcat (ang ibabang-level software na tumatakbo ERDDAP ) magmula noong unang bahagi ng 2016, higit at higit sa mga karakter sa query na bahagi ng kahilingan na URL ay dapat na maging URL [ **Naimpluwensiyahan** ](/docs/server-admin/datasets#infourl) sa mga kadahilanang panseguridad. Mga browser ang nag - aalaga sa iyo ng mga porsiyentong kagamitan. kaya ang paggamit ERDDAP™ sa browser ay hindi apektado malibang ibaling ang kahilingan ERDDAP .
    * IMPROBLE: Dati, ERDDAP™ ginagamot **Iba't Ibang Uri** mas gusto ang mga hindi naka-sign na short integers kaysa sa mga character. Ngayon ay tinatrato sila nito na parang 1-character-long UCS-2 (Hindi Nakikita) Mga tali. Tingnan ang [Mga dokumentong char](/docs/server-admin/datasets#char) . Salamat kay Aurelie Briand at sa proyektong Argo.
    * IMPROBLE: Dati, ERDDAP™ nag - alok ng kaunting suporta **Mga karakter ng Unicode** sa itaas ng karakter #255 sa Strings. Ngayon, sa loob, ERDDAP™ ganap na sumusuporta sa 2-byte UCS-2 chars (bilang 0 hanggang 65535) sa Strings. Kapag ang sting data ay isinulat sa iba't ibang uri ng file, ERDDAP™ gawin ang lahat ng magagawa nito upang suportahan ang 2-byte chars. Isa pang halimbawa ang mga talaksang .csv na . ERDDAP™ kasama ng ISO-8859-1 charset (isang 1-byte na charset) , kaya ERDDAP™ sulat ng anumang mga character sa itaas character #255 kasama ang JSON-tulad \\u_hhhh_publish. Tingnan [Paglalagay ng data](/docs/server-admin/datasets#string) .
    * IMPROBLE: Sa .nc mga file na isinulat ng ERDDAP™ , char variables na bibigyang kahulugan bilang Strings ay magkakaroon ng attribute
         **\\_Encoding=ISO-8859-1**   
Nasa .nc mga talaksang binasa ng ERDDAP™ , char variables na may "\\_Encoding" ay bibigyang kahulugan bilang Strings na may nakatakdang charset.
    * TANGGALIN: ERDDAP™ suporta **JSON-tulad ng backslash-encoding** ng mga espesyal na karakter kapag itinakda mo ang mga limitasyon ng mga char at String variables. Kaya maaari kang humiling ng isang bagay na gaya ng &myString="\\u20ac" kapag nais mo ng mga hanay ng datos kung saan ang myString=€mula noong 20ac ay ang hexadecimal na bersyon ng code point para sa Euro symbol. Ilang sources sa web ay nagpapakita ng code point numbers para sa mga simbolo ng Unicode, e.g., [ https://en.wikipedia.org/wiki/Unicode ](https://en.wikipedia.org/wiki/Unicode) .
    * IMPROBLE: Dati, ERDDAP™ nag - alok ng limitadong suporta **matagal na integer** Iba't iba. Ngayon ERDDAP™ ay lubos na sumusuporta ng mahaba at panloob at ginagawa ang pinakamahusay kapag nagsusulat ng mahabang datos sa iba't ibang uri ng talaksan. . Tingnan ang [mahabang dokumentasyon](/docs/server-admin/datasets#long) . Dahil sa Marine Institute ng Ireland, sina Craig Risien, Risell, Rich Signell, Christopher Wingard at OOI.
    * BAGO: uring output para sa griddap at tabledap : ** .nccsv ** , na gumagawa ng NetCDF - Tulad ng ASCII, CSV file na naglalaman din ng lahat ng metadata na sa katulad na paraan .nc talaksan. Tingnan ang [NCSV Espesipikong Pagpapakahulugan](/docs/user/nccsv-1.00) . Salamat kay Steve Hankin.
    * BAGO: ** orderByClosest filter** Hayaan mong sabihin mo kung paano ibubukud - bukod ang mesa at isang pagitan (e.g., 2 oras) . Sa loob ng bawat uri ng grupo, tanging ang mga hanay na pinakamalapit sa pagitan ang mapananatili. Halimbawa, orderByClosest  (" stationID , oras, 2 oras") sa pamamagitan ng stationID at panahon, subalit ibalik lamang ang mga hanay para sa bawat isa stationID kung saan ang huli orderBy kolum (panahon) ay pinakamalapit sa 2 oras na pagitan. Ito ang pinakamalapit na bagay sa tabledap upang bawasan ang mga pagpapahalaga sa isang kahilingan ng griddap. Ang opsyon na ito ay maaaring tiyakin sa pamamagitan ng anumang paraan tabledap dataset's .html web page, .graph web page, at ng anumang URL na nililikha mo sa iyong sarili. Salamat sa Marine Institute and Ocean Networks Canada ng Ireland.
    * BAGO: ** orderByLimit filter** Hayaan mong magtakda ka kung paano ibubukud - bukod ang mesa at isang takdang numero (e.g., 100) . Sa loob ng bawat uri ng grupo, tanging ang unang mga hanay na 'limit' ang iingatan. Halimbawa, orderByMax  (" stationID , 100") sa pamamagitan ng stationID , ngunit ibalik lamang ang unang 100 hanay sa bawat isa stationID . Ito ay katulad ng LIMIT sugnay ng SQL. Ang opsyon na ito ay maaaring tiyakin sa pamamagitan ng anumang paraan tabledap dataset's .html web page, .graph web page, at ng anumang URL na nililikha mo sa iyong sarili. Salamat sa Marine Institute and Ocean Networks Canada ng Ireland.
    * BAGO: Dalawang bagong uri ng pagtugon, ** .jsonlCSV at .jsonlKVP ** ay maaaring gamitin para sa mga kahilingan na i - grid ang mga dataset, tabular datasets at marami pang ibang lugar sa ERDDAP   (e.g., mga kahilingan para sa impormasyon tungkol sa mga datos) . Ang mga file ay JSON Lines files ( [ https://jsonlines.org/ ](https://jsonlines.org/) ) kung saan ang bawat linya ay may hiwalay na JSON object. .jsonlCSV ay mayroon lamang mga pamantayan sa isang CSV format. .jsonlKVP ay may susi: Ang halagang pares. Ang bawat linya ay nakatayo sa ganang sarili. Ang mga linya ay hindi nakapaloob sa mas malaking hanay ng JSON o bagay. Halimbawa, tingnan ang [ang kahilingan ng sampol na ito](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/pmelTaoDySst.jsonlKVP?longitude%2Clatitude%2Ctime%2Cstation%2Cwmo_platform_code%2CT_25%26time%3E=2015-05-23T12:00:00Z%26time%3C=2015-05-31T12:00:00Z) . Salamat kay Damian Smyth, Rob Fuller, Adam Lead mas mahusay, at sa Marine Institute ng Ireland.
    * BAGO: May bagong dokumento na naglalarawan [ **Kung Paano Makakakuha ng Pribadong mga Date ERDDAP™ sa pamamagitan ng mga Script** ](/docs/user/AccessToPrivateDatasets) . Salamat kay Lynn DeWitt.
    * IMPROBLE: Ang pinakamababang lawak ng ** OpenLayers ** Ang mapa ay 2 digri at ngayon ay 4 na data pixels. Salamat kay Rusty Holleman.
    * IMPROVED: Sa ilang karaniwang kaso, ang mga kahilingan na may kalakip na mga kahilingan **Palagiang pagpapahayag** Mas mabilis na maproseso ang mga limitasyon.
         
*    **Mga Bagay ERDDAP™ Kailangang Malaman at Gawin ng mga Administrador:**   
     
    *    **SLOW UNANG PANGANGARAL:** Sa unang pagkakataong simulan mo ang bagong bersiyong ito, mangangailangan ng mahabang panahon ERDDAP™ upang maikarga ang lahat ng datasets dahil kailangan nitong muling basahin ang lahat ng source datafiles (bagama't ang header lamang para sa nakatiklop na mga data file) . Kung titingnan mo ang mga troso ay maaaring makakita ka ng mga maling mensahe na nagsasabing "luma/walang suportang extension" ng ilang panloob na file -- iyon ay okay -- ERDDAP™ ang mga bagong bersyon ng panloob na mga file. Pakisuyong maging matiyaga.
    * PAG - ASA: ERDDAP™ ginagamit ngayon ang bago **java. panahon** mga klase (Kilala rin bilang JSR 310) sa halip na Joda na parsehin ang mga panahong String sa mga panahong numberiko. Mga Paunawa:
        * Kung ERDDAP™ Walang anu - ano ay nagkaroon ng mga problema sa paglalagay ng mga panahong String para sa isang ibinigay na dataset at sa gayo'y kinumberte lamang ang karamihan o lahat ng panahon sa NaN's (kulang na mga pamantayan) , ang problema ay halos laging sa petsa Time format string na tinukoy mo bilang ang "units" ng variable. Ang bagong sistema kung minsan ay nangangailangan ng medyo naiibang dateTime format string.
        * Kung ang mga numerong buwan at araw sa mga dateTimes string ay hindi 0-padded (e.g., "3/7/2016") , tiyakin na ang format ay may isa lamang M at d (e.g., "M/d/yyay", hindi "MM/dd/yyy") .
        * Palitan ang anumang seleksiyong seleksiyon na gumagamit ng mas mababangcase s' (e.g., ang .ss in yyyy-MM-dd 'T'H:mm:ss.) , sa kabisera Hindi, (e.g., yyyy-MM-dd 'T'H:mm:s.SSSS) .
        *    ERDDAP™ hindi na sinusuportahan ang petsa ng string Mga format ng oras na may dalawang-digit na taon (y) na may ipinahiwatig na siglo (e.g., 1900 o 2000) . Ang mga negosyo ay gumugol ng bilyun - bilyong dolyar sa paglutas sa problemang ito sa pagtatapos ng 1990's. Hindi dapat gumamit ang mga siyentipiko ng dalawang numerong taon. Pakisuyong ayusin ang source file (s) sa pamamagitan ng pagkumberte sa 4-digit na taon, pagkatapos ay gamitin ang yayay sa petsa Time format.
        * Maaari kang gumamit ng yay o YYY (alin ERDDAP™ mga kumberte sa uuuu) upang parsehin ang 4 na numerong taon, pati na ang negatibong mga taon, e.g., -4712. (na 4713 BC) . Dahil sa SeaDataNet, Thomas Gardner, at BODC.
        * Pakisuyong patuloy na gamitin ang Z sa loob ng isang dateTime format upang makuha ERDDAP upang parsehin ang isang panahon (e.g., Z, +0200, -08, -0800, -08:30) .
        *    **Tiyaking ginagamit mo Java bersyon 1.8.0\\_21 o mas mataas.** 
        * Mga Programme -- Kung magsusulat ka Java mga programa na tumatakbo ERDDAP™ code, kailangan mong alisin ang reference sa joda-time. banga sa path parameter ng klase.
    * BAGO: ERDDAP ' [Archive Kagamitan ng datos](/docs/server-admin/additional-information#archiveadataset) makalilikha ngayon [ **Bag It files** ](https://en.wikipedia.org/wiki/BagIt) . Ang NCEI ay maaaring maging pamantayan sa format na ito. Salamat kina Scott Cross at John Relph.
    * IMPROVED: Ang mga link upang i-download ang erddap. digmaan sa ERDDAP™ Mga pahinang web ang ngayo'y nakaturo sa **GitHub** . (Sila ay mga public link, kaya hindi mo kailangang sumali sa GitHub.) Ito'y nangangahulugan ng mas mabilis na mga download (hanggang 12Mb/s laban sa 1Mb/s) at iilang problema lamang sa mga download. Salamat kay Damian Smyth, Rob Fuller, Adam Lead mas mahusay, Conor Delaney, at ang Marine Institute ng Ireland.
    * IMPROBLE: Ang **status.html page at ang pang - araw - araw na Status Report email** ay kinabibilangan ngayon ng isang "Major PackDatasets Time Series" section na nagpapakita ng estadistika tungkol sa ERDDAP™ bilang ng dulo ng bawat pangunahing mga loadDataset para sa huling 100 major loadDatasets. Salamat sa aming magulong RAID.
    * BAGO: bago, opsyonal (ngunit inirekomenda) para sa EDDTable FromCassandra datasets: [ ** &lt;particularKeyCSV&gt; ** ] (/docs/server-admin/datasets#partitionkeycsv) . Salamat sa Ocean Networks Canada.
    * BAGO: Ang mga EDDTable FromAsciiFile ay sumusuporta ngayon ** &lt;composeparator&gt; ** Parame. Kung null o "", ang klase ay maghuhula, gaya ng nauna, kung hindi, ang unang karakter ay gagamitin bilang kolum separator kapag binabasa ang mga files. Salamat sa Sky Bristol at Abigail Benson.
    * Bago: ang bagong dataset type, [ **Mapagkakatiwalaang mga Latian** ](/docs/server-admin/datasets#eddtablefromnccsvfiles) , ay maaaring gumawa ng dataset sa pamamagitan ng aggregation [NCCSV .csv files](/docs/user/nccsv-1.00) . Salamat kay Steve Hankin.
    * IMPROBLE: **Mapagkakatiwalaang Mula sarddap** ginagamit ngayon .nccsv upang makakuha ng impormasyon mula sa malayo ERDDAP s at para sa lokal na arkibo ng metadata info. Ito ay nagdudulot ng buong suporta sa mga uri ng char at mahabang datos, at para sa Unicode (UCS-2) Palamutian para sa mga char at String. Salamat kay Rob Fuller at sa Marine Institute ng Ireland.
    * IMPROBLE: Ang EDDTable FromErddap at EDDGrid Ang suporta ngayon ni FromErddap ** &lt;I-redirect ang&gt; false&lt;/redirect&gt; ** na nagsasabi ERDDAP™ Huwag kailanman ibaling ang kahilingan sa malayo ERDDAP . Totoo ang default. Kapaki - pakinabang ito kapag ang malayo ERDDAP™ ay pribado ERDDAP . Salamat kay Damian Smyth, Rob Fuller, at sa Marine Institute ng Ireland.
    * IMPROBLE: ERDDAP™ huli **Tinanggal na mga kahilingan ng gumagamit** Mas madali. At ERDDAP™ ngayon ay mas mabilis na nagsasara sapagkat ang mababang mga hibla ay mas mabilis na nagsasara. Salamat sa aming magulong RAID.
    *    **Mga GenerateDataset Xml:** 
        * BAGO: Ang bagong espesyal na EDDType "ncdump" ay naglilimbag ng isang bagong espesyal na manga [umere](https://linux.die.net/man/1/ncdump) \\-tulad ng printout ng header ng isang .nc talaksan. Maaari mo ring ilimbag ang mga halaga ng datos para sa espesipikong mga variable (o pumasok sa "wala" upang huwag mag-print ng anumang mga halaga ng datos) . Ito'y kapaki - pakinabang sapagkat, kung walang ncdump mahirap malaman kung ano ang nasa isang file at sa gayo'y dapat kang magtakda ng EDDType para sa GenerateDatasetsXml. Dahil kina Craig Risien, Mayamang Signell, Christopher Wingard at OOI.
        * BAGO: Para sa SeaData Impormasyon ng basura:
Kapag angkop, GenerateDatasets Ang Xml ngayon ay gumagawa ng isang espesipikong semantikong konbersiyon gamit ang isang malayong SPARQL query: kung ang isang variable's source metadata ay kinabibilangan ng isang sadn\\_parameter\\_urn, e.g., sadn\\_parameter\\_urn = "SDN:P01:PSLTZZ01", GenerateDatasets" Xml ang magdadagdag ng katumbas na P02 attribute, e.g., sdn\\_P02\\_urn = "SDN:P02:PSAL". Kung may datos ka na gumagamit ng mga katangiang ito, at kung mayroon ka ERDDAP '&lt; categoryAttributes &gt; sa setyup.xml ay kinabibilangan ng sdn\\_parameter\\_urn at sdn\\_P02\\_urn, magagamit ng mga gumagamit nito ang mga ito ERDDAP™ Kategoryang search system upang hanapin ang mga dataset na may espesipikong mga halaga ng mga katangiang ito. Salamat sa BODC at Alexandra Kokkinaki.
        * IMPROVED: GenerateDatasets Binabago ngayon ni Xml ang marami http:// Mga reperensiya sa metadata https:// kung angkop.
        * IMPROVED: GenerateDatasets Sinisikap ngayon ni Xml na hulaan ang tungkol sa manlilikha na si\\_type at mamamahayag na si\\_type.
        * IMPROVED: The variable's dataTypes na iminungkahi ng GenerateDatasets Mas mabuti na ngayon ang Xml. Salamat kina Margaret O'Brien, LTER, at EML.
        * IMPROVED: GenerateDatasets Mas mainam ang Xml sa pagtatakda ng&lt;cdm\\_data\\_type&gt; at pagdaragdag ng mga kaugnay, ay nangangailangan ng mga katangian (hal.,&lt;cdm\\_timeseries\\_variables&gt;), kaya maibibigay mo ang impormasyong iyon. Salamat sa Mayamang Signell.
        * IMPROVED: Sa GenerateDatasets Xml, para sa EDDTable datasets, ang mungkahi para sa&lt; subsetVariables &gt; ay mas konserbatibo na ngayon. Salamat kay John Kerfoot.
        * IMPROBLE: Kung datasets.xml para sa datos featureType ngunit hindi cdm\\_data\\_type, ang featureType ay gagamitin bilang cdm\\_data\\_type. Salamat sa Mayamang Signell.
        * BUG FIX: paglikha Mga Data Iminungkahi ngayon ni Xml ang tama&lt;dataType&gt; para sa mga data variable na may scale\\_factor , add\\_offset at/o \\_Unsigned na mga katangian.
    * IMPROBLE: Kailan ERDDAP™ nagbubukas ng a .nc talaksang iyon **mas maikli** kaysa nararapat (e.g., hindi ito lubusang kinopya) , ERDDAP™ ngayon ay tinatrato ang file na masama. Dati, ERDDAP™ ay ibinalik ang nawawalang mga halaga sa anumang nawawalang bahagi ng file dahil iyan ang default na pag-aasal para sa netcdf-java. ERDDAP™ ngayon ay gumagamit ng ucar .nc 2.iosp.netcdf3.N3header.dislowFileTruncation = totoo; Salamat sa aming magulong RAID at Christian Ward-Garrison.
    * IMPROVED: ginagamit ngayon ng manunulat na ISO 19115 **manlilikha\\_type** , kung naroroon.
    * IMPROBLE: ERDDAP™ ngayon ay ginagamit ang pinakabagong netcdf-java v4.6.9 na maaaring magbasa ng karagdagang mga uri ng karagdagang mga uri ng **mga talaksang netcdf-4** . Dahil kina Craig Risien, Mayamang Signell, Christopher Wingard at OOI.
    * BUG FIX: iwasan ang gulo kung ang iba't ibang source files ay may iba't ibang data type para sa isang ibinigay na variable. Dahil kina Roy Mendelssohn at Eugene Burger.
    * BUG FIX: **Mga Pagbabago sa Oras** ay mas naipagsasanggalang ngayon laban sa masasamang pamantayan sa panahon. Salamat sa NDBC.
    * BUG FIX: EDDGrid Mga Ulila Inaasikaso na ngayon ng mga hindi pa nakabuklat ang mga pamantayan ng panahon **"Mgamonto mula noong ..." at "mga taon mula noong ..."** tama (sa pamamagitan ng pag - alaala sa buwan o taon, hindi sa pamamagitan ng basta pagdaragdag ng e.g., 30 araw nang paulit - ulit) . Salamat sa Soda3.3.1.
    * BUG FIX: nasa 0.74 lamang, **mga suskripsiyon** kailangan ang pagkilos (e.g., http:// ...) , na noon at dapat ay opsyonal.
    * BUG FIX: EDDGrid Mula sa mga "MergeIRFile".low GetSourceMetadata () ay hindi nagdagdag ng anumang pangglobong mga katangian. Ngayon ay gayon nga.
         

## Bersiyong 1.74{#version-174} 
 (inilabas noong 2016-10-07) 

*    **Bagong mga Katangian (para sa mga gumagamit) :**   
     
    * Ngayon, kapag Isang Talaan ng mga Data (Lahat, o mula sa paghahanap) ay nakadispley sa isang web page, ang mahahabang titulo ay nakadispley sa maraming linya. Dati, ang gitna ng isang mahabang pamagat ay pinalitan ng " ...". Salamat kina Margaret O'Brien, LTER, at EML.
         
*    **Mga Bagay ERDDAP™ Kailangang Malaman at Gawin ng mga Administrador:**   
     
    * DO: Sa Linux computers, baguhin ang mga timeout setting ng Apache upang ang time-consumping user requests ay huwag mag-timeout (na kadalasang lumilitaw bilang isang "Proxy" o "Bad Gateway" error) . Bilang tagagamit ng ugat:
        
        1. Pagpapain sa Apache http d.conf file (Karaniwang nasa /etc/ http d/conf/) :
Palitan ang umiiral&lt;Orasang&gt; setting (o magdagdag ng isa sa dulo ng talaksan) hanggang 3600 (mga segundo) , sa halip ng default 60 o 120 segundo.
Palitan ang umiiral&lt;EXTimout&gt; tagpo (o magdagdag ng isa sa dulo ng talaksan) hanggang 3600 (mga segundo) , sa halip ng default 60 o 120 segundo.
        2. Restarty Apache: /usr/sbin/apachectl -k Maganda (ngunit kung minsan ito ay nasa ibang directory) .
        
Salamat kay Thomas Oliver.
         
    * BAGO: \\[ Malaking Direktoryo/hard Bolag directory
Ito ay gumaganang tulad ng flag directory, ngunit ang hardFlag na bersyon ay nagdededeta din sa lahat ng cached dataset information. Walang mga URL na maglalagay ng hardFlag. Ito'y magagamit lamang sa paglalagay ng isang file sa directory na iyon.
mahirap Ang mga bandila ay lubhang kapaki - pakinabang kapag gumagawa ka ng isang bagay na nagpapangyari ng pagbabago sa kung paano ERDDAP™ basahin at ipaliwanag ang pinagkunang impormasyon, halimbawa, kapag naglagay ka ng bagong bersiyon ng ERDDAP™ o kapag nakagawa ka na ng ilang uri ng pagbabago sa katuturan ng dataset datasets.xml . Tingnan [ang dokumentong ito](/docs/server-admin/additional-information#hard-flag) . Dahil kay John Kerfoot at sa lahat ng grupong Argo.
         
    * BAGO: GenerateDatasets Ang Xml ngayon ay may EDDTable FromEML option
na kababasahan ng paglalarawan ng dataset sa isang Ekolohikal na Wikang Metadata (EML) talaksan, i-download ang kaugnay na talaksan ng datos, at lumikha ng isang tipak ng datasets.xml upang maidagdag ang dataset ERDDAP . Mayroon ding EDDTable FromEMLBatch na pareho ang ginagawa para sa lahat ng mga file ng EML sa isang directory. Ito ay mahusay na gumagana dahil ang EML ay gumagawa ng mahusay na trabaho ng paglalarawan ng dataset at dahil ang KNB at LTER ay gumagawa sa aktuwal na data files na makukuha.
EML plus ERDDAP™ ay maaaring maging isang malaking kombinasyon, yamang ERDDAP™ ay maaaring magbigay sa mga gumagamit ng mas direktang access sa kayamanan ng KNB at LTER data at tulungan ang mga proyektong iyon na matugunan ang US na pamahalaan [Resulta ng Pangmadlang Pag - aaral (HANDA) mga kahilingan](https://nosc.noaa.gov/EDMC/PD.DSP.php) sa pamamagitan ng paggawa ng data na makukuha sa pamamagitan ng isang web service.
Tingnan [ang dokumentong ito](/docs/server-admin/EDDTableFromEML) . Salamat kina Margaret O'Brien, LTER, at EML.
         
    * BAGO: GenerateDatasets Ang Xml ngayon ay may EDDTable From InPort option
na kababasahan ng paglalarawan ng dataset sa isang talaksan ng InPort XML at nagsisikap na lumikha ng isang tipak ng mga larawan datasets.xml upang maidagdag ang dataset ERDDAP . Ito ay bihirang lumikha ng isang handa-to-use stage ng XML para sa datasets.xml , ngunit ito ay lilikha ng isang mahusay na magaspang na draft na isang mabuting simula para sa pagsasaayos ng isang tao.
Magiging dakila kung gagamitin din ng mga taong gumagamit ng InPort upang i-record ang kanilang mga datasets ERDDAP™ upang makuha ang aktuwal na impormasyon sa pamamagitan ng ERDDAP 'Mga serbisyong web at sa gayon ay matugunan ang mga serbisyo ng pamahalaan ng US' at NOAA ' [Resulta ng Pangmadlang Pag - aaral (HANDA) mga kahilingan](https://www.whitehouse.gov/blog/2013/02/22/expanding-public-access-results-federally-funded-research) sa pamamagitan ng paggawa ng data na makukuha sa pamamagitan ng isang web service. Ito ay isang solusyon na maaaring gamitin ngayon mismo. ( erd.data at noaa.gov ay maligayang tumutulong.)   
Tingnan [ang dokumentong ito](/docs/server-admin/datasets#eddtablefrominport) . Dahil kina Evan Howell at Melanie Abecassis.
         
    * IMPROBLE: ERDDAP™ ngayon ay gumagamit ng netcdf-java 4.6.6.
Gamit ang naunang mga bersiyon, binasa ni netcdf-java ang ilang mahahalagang bagay (Marahil, sa loob lamang ng netcdf-4 files) gaya ng 0's. Ngayon ay binabasa nito ang ilan sa mga ito bilang ang pamantayang netcdf na naglaman ng halaga: -127 para sa mga byte, -32767 para sa mga maiikli, -2147483647 para sa mga int. Unidata ang tamang paggawi. Kung ang isang variable sa isang dataset ay magsimulang magpakita ng isa sa mga halaga na ito kung saan ito ay dating nagpapakita ng 0's, maaari mong idagdag, e.g.,
```
        <att name="\\_FillValue" type="short">-32767</att>  
```
sa variable addAttributes sabihin sa ERDDAP™ upang ituring ang halagang iyan bilang isang missing\\_value /\\_Fill Halaga. Gayunman, sa maraming kaso, hindi iyan magbubunga ng hinahangad na resulta: 0's. Kung gayon, isaalang - alang ang pagbabago sa mga file kasama ng NCO o muling isulat ang mga file. Mga reklamo? Pakisuyong makipag - ugnayan Unidata ;-)
         
    * DO: Bagong TopographyDepth Paleo
Hinihimok ko kayo na palitan ang lahat ng datasets na gumagamit ng OceanDepth paleta upang gamitin ang bagong TopographyDepth Paleta, na gaya ng Topography maliban sa mga kulay na nabaligtad, upang ito ay angkop para sa malalalim na halaga (positibo=down) , sa halip ng mga halaga ng altitud (positibo=up) . Ang iminumungkahing mga tagpo para sa paleta na ito ay:
```
            <att name="colorBarMaximum" type="double">8000.0</att>
            <att name="colorBarMinimum" type="double">-8000.0</att>
            <att name="colorBarPalette">TopographyDepth</att> 
```

    * BAGONG HALAGA: Pagpiga missing\\_value at/o \\_FillValue
Kung binibigyang - kahulugan ng String variable ang isang missing\\_value at/o \\_FillValue, ERDDAP™ ay aalisin na ngayon ang mga halagang iyon mula sa datos at papalitan ito ng walang laman na strando, upang ang nawawalang mga halaga ay lumitaw bilang walang laman na mga strando, gaya ng ibang datasets sa ERDDAP . Salamat kina Margaret O'Brien, LTER, at EML.
         
    * BAGONG HALAGA: Tulong sa Lokal na mga Panahon
ay maaari na ngayong magtakda ng sona ng oras sa pamamagitan ng isang " time\\_zone " Sabihin kung alin ang nangunguna ERDDAP™ upang makomberte ang lokal-time-zone source times (ang ilan ay nasa karaniwang panahon, ang ilan ay nasa Daylight Saving time) sa loob Zulu kung minsan. Ang talaan ng tanggap na mga pangalan ng sona ng oras ay malamang na katulad ng talaan sa hanay ng TZ [mesa](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) . Ang default ay " Zulu ". Ang mga karaniwang sona ng oras ng US ay: US/Hawaii, US/Alaska, US/Pacific, US/American, US/Arizona, US/Central, US/Eastern. Para sa mga timestamp variable na may numeromeric source data, maaari mong tiyakin ang " time\\_zone " Sabihin pa, ngunit ang halaga ay tiyak na " Zulu " o "UTC". Salamat kina Margaret O'Brien, LTER, at EML.
         
    * BAGONG KASALANAN: Ang mga EDDTable FromAsciiFile ngayon ay sumusuporta sa semikolonyle-expressed files
at mas matalino tungkol sa pag - alam sa separator. Salamat kina Margaret O'Brien, LTER, at EML.
         
    * BAGONG HALAGA: Kung may malaking pagkakamali sa mga loadDataset (Malaki o menor, e.g., isang nawawala o hindi tanggap datasets.xml dokumento) , ERDDAP™ ay ipapahiwatig na ito ngayon sa katayuan.html, sa ibaba mismo ng "n Dakets Bigot To Pasan" bilang EROR: habang nagpoproseso datasets.xml : tingnan ang log.txt para sa mga detalye.
         
    * BAGONG HALAGA: ERDDAP™ Hanapin ang mga ulila.
Kailan ERDDAP™ malaking pasan Datsets, ito ngayon ay naghahanap ng ulilang datasets (mga dataset na nasa ERDDAP™ ngunit hindi sa datasets.xml ) . Kung matatagpuan, ang mga ito ay nakatala sa katayuan.html, sa ibaba mismo ng "n Dakets Bigot To Pasan" bilang EROR: n n n  Orphan  Orphan (mga datos sa loob ng ERDDAP™ ngunit hindi sa datasets.xml ) = ....
Kung nais mong alisin (naka-load) ulila mula sa ERDDAP™ , kailangan mong magdagdag
        &lt;datos na tipo="_anyValidType_" datasetID = "_theDatasetID_" active=" false" /&gt;
hanggang sa datasets.xml hanggang sa maidiskarga ang dataset sa susunod na pangunahing loadDatasets.
         
    * BUG FIX: Kung ang isang dataset ay may numerikong timestamp na iba - iba sa mga yunit maliban sa mga yunit "seconds since 1970-01-01T00:00:00Z" at kasama ng&lt;Ang update EveryNMillis&gt; system na aktibo, ang timestamp variable's range ay mali ang pagkakatakda kapag ang dataset ay ina-apdeyt. Salamat kay John Kerfoot.
         
    * BUG FIX: Kung&lt;Ang agarang Restart&gt; ay totoo sa setup.xml at humiling ka ng datos mula sa isang EDDTTable Mula sa... Mga talaksang dataset na ginamit&lt;Ang update EveryNMillis&gt;, ang unang kahilingan sa dataset ay mabibigo, ngunit ang mga kasunod na kahilingan ay magtatagumpay. Ngayon ang unang kahilingan ay hindi mabibigo. Salamat kay John Kerfoot.
         
    * BUG FIX: Ang GenerateDatasetsXml.sh at .bat ay hindi gumagana na may &gt;9 parameter sa command line. Ngayon ay gayon nga. Salamat kay John Kerfoot.
         
    * BUG FIX: Ang bagong EDDTable FromMultidimNcFiles ay hindi palaging nag-aalis ng mga linya sa mga strando. Ngayon ay gayon nga. Kapansin-pansin, ito ay nakaapekto sa mga files ng ARGO. Salamat kina Kevin O'Brien at Roland Schweitzer.
         
    * BUG FIX: Lahat ng akses ng remote DAP Ang mga serbisyo ay sinisimulan ngayon ng mas modernong kodigo. Ito ay nag-aayos sa "ugnayang nakasara" na pagkakamali kapag na-access ang ilang EDDTable FromErddap datasets. Salamat kay Kevin O'Brien.
         
    * BUG FIX: Ang pangangasiwa orderBy ... () at kakaiba () ay bumabalik na ngayon sa dating kalagayan bago ang kamakailang mga pagbabago: ang isang ibinigay na kahilingan ay maaaring magkaroon ng maraming - marami orderBy ... () at/o kakaiba () pansala; ERDDAP™ ang mga ito ayon sa pagkakasunud - sunod. Salamat kay David Karuga.
         
    * BUG FIX: Kung ang dataset ay EDDTable FromDatabase at ang isang query ay may [Tagalathala sa Pamamagitan ng](/docs/server-admin/datasets#sourcecanorderby) at/o [Ang sourceCanDistinct](/docs/server-admin/datasets#sourcecandodistinct) , pagkatapos ang database ay maaaring (depende sa mga tagpo datasets.xml ) bahagya o lubusang pangasiwaan **ang una lamang**   orderBy ... () o naiiba () . Salamat kay David Karuga.
         
    * BUG FIX: Ang kamakailang ekstrang porsyento-encoding ay nagdulot ng mga problema sa ilang mga queries para sa .nc Mga file ng CF, e.g., "HTP Status 500 - Query error: Ang variable=station ay nakatala ng dalawang beses sa mga resultang variables list." Salamat kay Kevin O'Brien.
         
    * BUG FIX: Ang EDDTable FromFiles ay nagkaroon ng problema sa muling pagkarga ng isang dataset nang ang isa sa mga kolumn ay isang tunay na char column. Salamat kay Roland Schweitzer.
         
    * BUG FIX: EDDGrid Mga Ulila Nakumberte na rin ngayon missing\\_value at \\_FillValue sa pamantayang halaga kaya ang mga file na may iba't ibang halaga ay maaaring i-gregated. Dahil sa pagbabagong ito, matapos mong i-install ang bagong bersyong ito ng ERDDAP™ , Mangyaring magtakda ng [mahirap Bandila](/docs/server-admin/additional-information#hard-flag) sa bawat isa EDDGrid Mga Ulila Walang packed dataset sa loob mo ERDDAP .
         
    * IMPROVED: Ang mga EDDTable FromNcCFFililes ay maaari na ngayong humawak ng mga file na may multiple sampol\\_dimension's. Ang isang ibinigay na dataset ay dapat lamang gumamit ng mga variable na gumagamit ng isa sa sampol na\\_dimensions. Salamat kay Ajay Krishnan.
         
    * IMPROVE: Para sa EDDTable Mula sa...Files,&lt;" undyFiles bySourceNames&gt; " ay nagpapahintulot ngayon sa komma-nahiwalay (mungkahi) o puwang na hiwalay na mga talaan ng iba't ibang pinagmulang pangalan. Sa alinmang kaso, ang indibiduwal na iba't ibang pangalan ay maaaring napalilibutan ng dobleng mga sinipi, e.g., kung ang pangalan ay may panloob na espasyo.

## Bersiyong 1.72{#version-172} 
 (inilabas noong 2016-05-12) 

*    **Bagong mga Katangian (para sa mga gumagamit) :** Wala.
     
*    **Mga Bagay ERDDAP™ Kailangang Malaman at Gawin ng mga Administrador:** 
    * BAGONG EDDTable Mula sa mga "MultidimNcFile " [EDDTable Mula sa mga MultidimNcFile](/docs/server-admin/datasets#eddtablefrommultidimncfiles) ay isang bagong alternatibo sa EDDTable FromNcFiles. Dinisenyo ito upang makitungo sa mga pangkat ng mga talaksan na may ilang mga variable na may kabahaging dimensiyon, e.g., var1. \\[ a \\]  \\[ b \\] , var2 \\[ a \\] , var3 \\[ b \\] , scalarVar. Salamat sa Proyektong Argo, Aurélie Briand, at Roland Schweitzer.
    * BUG FIX: ERDDAP™   (sa pamamagitan ng mga klaseng FileVisitorDNLS at FileVistorSubdir) ang makasagisag na mga kawing sa Linux. ERDDAP™ ay hindi pa rin sumusunod sa .lnk's sa Windows.
    * BUG FIX ng bug ipinakilala noong 1.70: natatanging + orderBy ay hindi pinapayagang magkasama sa isang kahilingan. Ngayon ay muli na naman sila. Ang mga ito ay hindi parehong eksklusibo/redundant. Salamat kay David Karuga.
    * Palitan datasets.xml IP adress:
Lumilitaw ang IP v4 addresss ERDDAP™ 4 period-nahating numerong hex.
Sa palagay ko ang IP v6 addresss ay lumilitaw bilang 8 colon-based hex numbers.
Kaya ERDDAP™ ay sumusuporta ngayon sa mga colon sa IP adress sa listahang iyon at :\\* sa dulo ng listahan upang harangin ang mga direksiyon.
    * IMPROBLE: ERDDAP™ ngayon ay gumagamit ng NetcdfFile Writinger upang sumulat .nc sa halip na i - deprecated NetcdfFile Rescribeable. Hindi dapat malaman ang pagbabago sa mga naturang file. Ito'y nagbubukas sa posibilidad ng paglaki .nc mga talaksan na gumagamit ng .nc 3 64bit na pagpapalawig. Kung nais mo/kailangan mo iyon, pakisuyong magpadala ng kahilingan erd.data at noaa.gov .
    * IMPROVED: Marami sa mga link sa mga remote website ay out-of-date. Ngayon ang mga ito ay up-to-date at ginagamit https: sa halip na http : kailanma't maaari.
    * Maraming maliliit na pagbabago.

## Bersiyong 1.70{#version-170} 
 (inilabas noong 2016-04-15) 

*    **Bagong mga Katangian (para sa mga gumagamit) :** Wala.
     
*    **Mga Bagay ERDDAP™ Kailangang Malaman at Gawin ng mga Administrador:** Sa ibaba, may ilang iminungkahing pagbabago sa dokumentasyon sa iyong setup.xml file.
Pakisuyong gawin ngayon ang mga pagbabagong ito.
30 minutong pagtatrabaho ngayon ay maaaring magligtas sa iyo ng mga oras ng kalituhan sa hinaharap.
    * Pag - aayos ng baka: Ang problema ay na ang mga kahilingan ay iniayon sa isang liblib na lugar ERDDAP bigo sa hindi tanggap na karakter ' | Maling mensahe. Nangyari lamang ito sa mga bagong bersyon ng Tomcat. Salamat kina Rusty Holleman, Conor Delaney, at Roy Mendelssohn.
    * Pag - aayos ng baka: ERDDAP™ ngayon ay gumagamit ng up-to-date na bersyon ng netcdf-java (mahabang kuwento ito) na kinabibilangan ng up-to-date support para sa NcML, na nagreresulta sa problema sa NcML LogicalReduce na hindi gumagana gaya ng inaasahan. Maaaring may ilang maliliit na pagbabago sa metadata na ERDDAP™ basahin sa pamamagitan ng netcdf-java mula sa .nc , .hdf , .grib, at .bufr files. Salamat kay Favio Medrano.
    * Ang bago [EDDTableAggregateRows](/docs/server-admin/datasets#eddtableaggregaterows) ay nagpapahintulot sa iyo na gumawa ng pinagsamang EDDTable dataset mula sa dalawa o higit pang EDDTable datasets na may parehong data variables gamit ang parehong units. Salamat kay Kevin O'Brien.
    * Bagong mapagpipilian para sa EDDTable FromDatabase ( [Tagalathala sa Pamamagitan ng](/docs/server-admin/datasets#sourcecanorderby) at [Ang sourceCanDistinct](/docs/server-admin/datasets#sourcecandodistinct) ) Hayaan mong magtakda kung ERDDAP™ , ang database, o ang dalawang ito, ang humahawak ng magkaiba at orderBy   (at lahat ng mga pagkakaiba) Mga pagbabawal. Salamat kay David Karuga.
    * Maaari ka na ngayong gumawa ng isang pribadong dataset's graph at metadata na makukuha ng publiko sa pamamagitan ng bagong [&lt;grapsAccessible To&gt; Pangmadla&lt;/graphsAccessible To&gt;] (/docs/server-admin/datasets#graphsactosibleto) tag. Salamat kay Emanuele Lombardi.
    * Ngayon, kapag dumaan ang isang kuwerdas sa GenerateDatasets Ang mga Xml o DasDd ay napaliligiran ng mga dobleng quote, ito ay hindiquoted (na para bang ito ay isang string ng JSON) . Salamat kina John Kerfoot at Melanie Abecassis.
    * Mga GenerateDataset Sinusuportahan ngayon ni Xml ang "default" upang makuha ang default at "walang" upang makakuha ng walang laman na string (sila'y gumagawang kasama o walang mga sinipi) . Ito ang lulutas sa ilang problemang may kaugnayan sa pagpapasa ng mga kuwerdas na walang laman.
    * Ngayon, sa GenerateDatasets Xml, para sa lahat EDDGrid Mula sa mga Latian at Uso Mula saFiles datasets, kung ang sampol FileName Itinakda mo ay "" (ang walang laman na string) , gagamitin nito ang huling katugmang fileName mula sa directory + regex + revisive=tunay.
    * Updated: Ang display InBrowser code na ginagamit upang ipakita ang mga resulta ng GenerateDatasetsXml at DasDds sa Linux computers ay out-of-date at nagbigay ng kakaibang mensahe tungkol sa Netscape. Ngayon, gumagamit ito ng makabagong kasangkapang Linux: xdg-bukas. Salamat kay Melanie Abecassis.
    * Ang allDatasets Ang dataset ngayon ay may "files" kolum, na nagpapahiwatig ng baseng URL ng kawing /files (kung may isa) para sa dataset.
    * Dagdagan ang pangkalahatang seguridad ng iyong ERDDAP™ sa pamamagitan ng pagbabago ng mga pahintulot na nauugnay sa tomcat directory at sa malakihang Direktoryo:
         (Ang aktuwal na mga utos sa ibaba ay para sa Linux. Para sa ibang OS, gumawa ng analogous na mga pagbabago.) 
        * Palitan ang "grupo" upang maging tomacat, ang inyong username, o ang pangalan ng isang maliit na grupo na kinabibilangan ng tomcat at lahat ng administrador ng Tomcat/ ERDDAP , e.g.,
chgrp-R _WourUserName_ apache-tomcat-_8.0.23_
ch ch UserName bigParent Direktory_
        * Pagbabago ng pahintulot upang ang tomcat at ang grupo ay makabasa, makasulat, makapaggawad ng mga pribilehiyo, e.g,.
chmod -R ug+rwx apache-tomcat-_8.0.23_
chhmod -R ug+rwx _bigParent Direktory_
        * Tanggalin ang "iba pang" pahintulot ng gumagamit na bumasa, sumulat, o pumatay:
chmod -R o-rwx apache-tomcat-_8.0.23_
chhmod -R o-rwx _bigParent Direktory_
Mahalaga ito, sapagkat hinahadlangan nito ang ibang gumagamit na magbasa ng posibleng sensitibong impormasyon ERDDAP™ Mga setup file, log files, at files na may impormasyon tungkol sa mga pribadong dataset.
    * Ang sistemang reality/login ay revimped. Salamat kay Thomas Gardner, Emanuele Lombardi, at sa bagong pamahalaan ng E.U. [HTTPS- Only Standard](https://home.dotgov.gov/management/preloading/dotgovhttps/) .
        * Ang reality=openid opsyon ay tinanggal. Ito ay out-of-date.
        * Ang bago, iminungkahi, [Tunay na=gogle](/docs/server-admin/additional-information#google) Mga opsyon na gamit Google Sign-In (batay sa OAuth 2.0) upang pahintulutan ang sinuman na may account sa Google email (kasama Pinangasiwaan ng Google ang mga account tulad ng @noaa.gov ) upang pumasok.
        * Ang bago, [Tunay na=email](/docs/server-admin/additional-information#email) Ang opsyon ay back up para sa realation=google. Pinahihintulutan nito ang mga gumagamit na may isang&lt;user&gt; tag sa loob datasets.xml sa pamamagitan ng pagpapadala sa kanila ng email na may pantanging kawing.
        * Sa iyong setup.xml, pakisuyong baguhin ang paglalarawan para sa&lt;Trueation&gt; na magiging
```
            <!-- If you want to restrict access to some datasets, 
            you need to specify the method used for logging on (authentication).
            See the info at 
            https://erddap.github.io/setup.html#security
            Currently, the options are: "" (logins not supported, the default), 
            "custom", "email", and "google" (recommended).  
            \\[No longer supported: "basic", "openid"\\]
            -->
```

        * Sa inyong setup.xml, pakisuyong idagdag ito sa ibaba mismo&lt;Kakaibang&gt; tag
```
            <!-- If authentication=google, you must supply your Google Client ID. 
            See
            https://developers.google.com/identity/sign-in/web/devconsole-project
            When setting this up, for Authorized JavaScript origins, 
            for testing on your computer, use the domain "localhost" 
            (e.g., origin=https://localhost:8443), 
            not "127.0.0.1" (because Google Sign-In doesn't work with anything 
            at that domain).
            This will be a string of about 75 characters, probably starting with
            several digits and ending with .apps.googleusercontent.com .
            -->
            <googleClientID></googleClientID>
```

        * Ngayon, ang mga gumagamit na hindi maaaring mag - log in http o https Mga URL (kung naitayo mo&lt;baseHttpsUrl&gt; sa iyong setup.xml). Salamat sa bagong pamahalaan ng E.U. [HTTPS- Only Standard](https://https.cio.gov/) .
        * Ngayon, maaari ninyong himukin ang lahat ng gumagamit na gamitin https   (hindi http ) sa pamamagitan ng tagpo&lt;base-Url&gt; upang maging isang https URL. Upang pilitin ang mga gumagamit nito na gumamit lamang https , dapat ka ring gumawa ng mga pagbabago sa iyong Apache/Tomcat setup upang harangin ang non- https access. Salamat sa bagong pamahalaan ng E.U. [HTTPS- Only Standard](https://https.cio.gov/) .
            
Sa iyong setup.xml, pakisuyong baguhin ang paglalarawan para sa&lt;base-Url&gt; magiging
```
            <!-- baseUrl is the start of the public URL, to which "/erddap" 
            is appended. For example:
            For running/testing on your personal computer:
              <baseUrl>http://localhost:8080</baseUrl>     
              (127.0.0.1 doesn't work with authentication=google).
            If you want to encourage all users to use https (not http), 
              make the baseUrl the same as the baseHttpsUrl (see below).
            For ERD releases, we used to use
              <baseUrl>http://coastwatch.pfeg.noaa.gov</baseUrl>    
            For ERD releases, we now use
              <baseUrl>https://coastwatch.pfeg.noaa.gov</baseUrl>    
            -->
```

        * Ang mapagpipilian&lt;passwordEncoding&gt; ay nagbago. Sa iyong setup.xml, pakisuyong baguhin ang paglalarawan para sa&lt;password
```
            <!-- For "custom" authentication, this specifies how you have 
            stored passwords in the roles tags in datasets.xml.
            If you aren't storing any passwords, this is irrelevant.
            The options (in order of increasing security) are: 
            "MD5", "UEPMD5" (MD5(UserName:ERDDAP:Password)), 
            "SHA256", "UEPSHA256" (SHA256(UserName:ERDDAP:Password), 
            the default).
            You should only use "MD5" or "SHA256" if you need to match 
            values stored that way in an external password database.
            See the info at 
            https://erddap.github.io/setup.html#security
            --> 
```

        * Sa iyong setup.xml, pakisuyong baguhin ang paglalarawan para sa&lt;baseHtpsUrl&gt; na magiging
```
            <!-- This is a variant of <baseUrl> which is used when 
            authentication is active and the user is logged in.
            In general, you take the <baseUrl>, change "http" to "https", 
            and change/add ":8443". This must begin with "https://".
            If you make a proxy so that ":8443" isn't needed, 
            then don't use ":8443" here.
            This is relevant even if <authentication> is "".
            See the instructions at 
            https://erddap.github.io/setup.html#security
            For example:
            For running/testing on your personal computer:
              <baseHttpsUrl>https://localhost:8443</baseHttpsUrl>                  
            For releases at ERD, we use:
              <baseHttpsUrl>https://coastwatch.pfeg.noaa.gov</baseHttpsUrl>  
            If you want to encourage all users to use https (not http), 
              make the baseUrl (see above) the same as the baseHttpsUrl.
            --> 
```

        * Ngayon, kung ang listahan ng mgaPrivateDatasets=tunay sa set-up.xml, mas kaunting impormasyon pa nga ang ipapalabas tungkol sa mga dataset na hindi makukuha ng gumagamit.
    * Ngayon, lalo na kapag sa simula ay inihahanda mo ang iyong sarili ERDDAP , masasabi mo na ngayon ERDDAP™ upang huwag magsuskribe sa malayo ERDDAP™ mga datos. Salamat kay Filipe Rocha Freire.
Sa iyong setup.xml, bago&lt;Ilagay ang Camily&gt;, pakisuyong idagdag
```
        <!-- Normally, if you have a EDDGridFromErddap or EDDTableFromErddap 
        dataset in your datasets.xml, it will try to subscribe to the remote 
        ERDDAP™ dataset so that the local dataset is kept perfectly up-to-date.
        If this ERDDAP™ is not publicly accessible (http://localhost), or its
        IP address will change soon, or you have some other reason, 
        you can tell this ERDDAP™ to not try to subscribe to the remote 
        ERDDAP™ datasets by setting this to false. (default=true) 
        This is the overall setting for this ERDDAP. It can be overridden by
        the same tag (with a different value) in the datasets.xml chunk for 
        a given EDD...FromErddap dataset. 
        For each fromErddap dataset that doesn't subscribe to the remote 
        ERDDAP™ dataset, you should set <reloadEveryNMinutes> to a smaller 
        number so that the local dataset stays reasonably up-to-date. -->
        <subscribeToRemoteErddapDataset>true</subscribeToRemoteErddapDataset>
```

    * Sa iyong setup.xml, sa mga instruksiyon sa itaas&lt;Pmail Mula saAddress&gt;, pakisuyong ipasok:
Kung maaari, itatag ito upang gamitin ang isang matatag na koneksiyon (SOL / TLS) sa server ng email.
Kung ang iyong setup ay hindi gumagamit ng matatag na koneksyon sa server ng email, pakisuyong gumawa ng mga pagbabago upang gawin ito.
    * Sa iyong sarili datasets.xml , pakisuyong idagdag ang linyang ito sa paglalarawan ng&lt;subscriptionEmailBlacklist&gt; sa inyong lugar datasets.xml :
Magagamit mo ang pangalan "\\*" upang maitala ang isang buong nasasakupan, e.g.,\\*@xample.com .
    * Mula noong palitan ang sistema ng pagtotroso noong v1.66, ang log file ay hindi kailanman up-to-date. Laging may mga mensahe o bahagi ng mensahe na naghihintay na maisulat sa log file. Ngayon, maaari mo itong gawing up-to-date (sa isang iglap) sa pamamagitan ng pagmamasid sa iyong sarili ERDDAP ' status web page sa http://_your.domain.org_/erddap/status.html .
    * HashDigest ....
    * Isang maliit na pagbabago (sa String2.canonicol) na dapat tumulong upang mabilis na kumilos ang mga bagay - bagay kapag ERDDAP™ ay abalang - abala at mas marami ring datasets.
    * Malakas Inirerekomenda: Huminto sa paggamit&lt;Pagkumberte Upang IpublicSourceUrl&gt; sa loob datasets.xml upang ikumberte ang isang numero ng IP sa isang dataset'&lt; sourceUrl &gt; (e.g., http://192.168.#.#/ ) sa pangalan ng nasasakupan (e.g., http :my.domain.org/) . Mula ngayon, mga bagong suskripsiyon tungo sa http://localhost , http://127.0.0.1 , at http://192.168.#.# Ang URLS ay hindi papayagan sa mga kadahilanang panseguridad. Kaya pakisuyong laging gamitin ang pangalan ng public domain sa publiko&lt; sourceUrl &gt; tag (kung kinakailangan dahil sa mga problema ng DNS) , magagamit mo ang [/etc/hosts table sa iyong server](https://linux.die.net/man/5/hosts) upang lutasin ang problema sa pamamagitan ng pagkumberte ng mga pangalan ng lokal na nasasakupan sa mga numero ng IP nang hindi gumagamit ng isang DNS server. Maaari mong subukin kung ang isang ibinigay na pangalan sa nasasakupan ay maayos nang wasto sa pamamagitan ng paggamit
Ping _some.domain.name_
    * Sa adapsiyong Datasets.xml, para sa mga remote dataset (e.g., mula sa isang server ng THREDS) , ang kusang lumilikha datasetID Ang mga s ay hindi nagbabago para sa karamihan ng mga nasasakupan. Para sa ilang lugar, ang unang bahagi (I.e., ang pangalan) ng kusang nalikha datasetID ay medyo naiiba. Kapansin - pansin, ang mga pangalan na may isang bahagi ay mas malamang na magkaroon ngayon ng dalawang bahagi. Halimbawa, mga dataset mula sa http://oos.soest.hawaii.edu na naunang naakay datasetID mga s na nagsimula sa hawaii\\_, ngunit ngayon ay humahantong sa datasetID Mga s na nagsisimula sa hawaii\\_soest\\_ . Kung ito'y maging sanhi ng mga problema mo, pakisuyong mag - email ka. Maaaring may work-round.
    * Ang drayber ng Cassandra ay ini-apruba sa cassandra-driver-core-3.0.jar at sa gayon ay sa Cassandra v3. EDDTable FromCassandra ay hindi sinasamantala ang anumang bagong katangian sa Cassandra v3. Ang mga Index sa Cassandra ay maaari na ngayong maging mas masalimuot, subalit ERDDAP™ Ginagamit pa rin ang modelong Cassandra v2 index, na nagpapalagay na ang isang indiseng kolum ay maaaring tuwirang tanungin '=' Mga pagbabawal. Mga GenerateDataset Xml para sa EDDTable FromCassandra ay hindi na nakakakita ng mga hanay na may mga indise; kung ang isang indise ay simple, kailangan mong tiyakin ito datasets.xml sa pamamagitan ng kamay. Kung kailangan mo ng suporta para sa mas masalimuot na mga indise o iba pang bagong katangian, pakisuyong mag - email erd.data at noaa.gov .
&#33;&#33; Kung gumagamit ka pa rin ng Cassandra 2.x, pakisuyong patuloy na gamitin ERDDAP™ v1.68 hanggang sa maka-upgrade ka sa paggamit ng Cassandra 3.x.
    * Mga Jar at ang Classpath - Halos lahat ng kabilang na ikatlong-partido .jar files ay ini-update sa kanilang mga pinakabagong bersyon.
        * Ang slf4j.jar ay idinagdag sa /lib at ang classpath.
        * Tuwang - tuwa. banga at tsik. Ang banga ay inalis mula sa /lib at ang classpath.
        * Kung makatanggap ka ng maling mga mensahe tungkol sa mga klase na hindi masusumpungan kapag ikaw ay nagtitipon o tumatakbo ERDDAP™ o isa sa mga kasangkapan nito, ihambing ang empatiya ng iyong command line sa klase ERDDAP ' [kasalukuyang may empatiya sa klase](/docs/contributing/programmer-guide#development-environment) upang malaman kung aling .jars ang nawawala sa iyong klase.

## Bersiyong 1.68{#version-168} 
 (inilabas noong 2016-02-08) 

*    **Bagong mga Katangian (para sa mga gumagamit) :** Wala.
     
*    **Mga Bagay ERDDAP™ Kailangang Malaman at Gawin ng mga Administrador:** 
    *    [ EDDGrid Mula sa mga Latian Agregasyon sa Pamamagitan ng mga Pangalan ng File o Pangglobong Metadata](/docs/server-admin/datasets#aggregation-via-file-names-or-global-metadata) --
Lahat ng pagkakaiba - iba EDDGrid Maaari na ngayong i-gregate ng mga taga-File ang isang grupo ng mga file sa pamamagitan ng pagdaragdag ng isang bagong kaliwang dimensiyon, karaniwang panahon, batay sa isang halaga na hinango mula sa bawat file o mula sa halaga ng isang global attribute na nasa bawat file.
    * IMPROBED: Dati, sinabi namin na baka gusto mong lumikha ng isang bagay EDDGrid MulaErddap dataset sa iyong sarili datasets.xml na tinukoy at muling naglingkod sa jplMU RSS Talaan ng mga Nilalaman ERDDAP . Yamang mayroon na ngayong mas bagong bersiyon ng dataset na iyon, ang dataset na iyon ay hindi na ginagamit ngayon. Kaya kung mayroon kang gayong dataset ERDDAP™ , pakisuyong idagdag ang bagong dataset na ito
```
        <dataset type="EDDGridFromErddap" datasetID="jplMURSST41" active="true">  
          <!-- Multi-scale Ultra-high Resolution (MUR) SST analysis fv04.1, Global, 0.011 Degree, Daily -->  
          <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST41</sourceUrl>  
        </dataset>  
```
Kung nais mong alisin ang lumang jplMU RSS Talaan ng mga Nilalaman ERDDAP™   (Ikaw ang magpapasiya) , baguhin ang aktibong kapaligiran nito mula sa "tunay" tungo sa "bulaan".
    * Pag - aayos ng baka: Pakisuyong tingnan ang malaking Direktoryo ng Party na tinukoy mo sa iyong setup.xml. Kung hindi ka pa nahihiwa sa dulo&lt;Malaking Directory&gt; na pangalan, pagkatapos ERDDAP™ ang ilang direktoryo sa pamamagitan ng tuwirang paglalagay ng mga salita sa pangalan na tinukoy mo, sa halip na lumikha ng mga subdirectory. Simula sa bersyon 1.68, ERDDAP™ ang sabi pa sa dulo ng pangalang directory kung hindi mo espesipikong pangalan. Kaya kung dati'y hindi mo espesipikong tinukoy ang dulo, kung gayon kapag ikaw ay naglagay ERDDAP™ v1.68 Kailangan mong lumipat at baguhin ang pangalan ng mga direktor na iyon **pagkatapos** binibitiwan mo ang luma ERDDAP™ at **bago** ang bago ERDDAP . Halimbawa, kung mali ang pagkakatukoy mo sa bigParent Direktory bilang /home/erddapBPD (walang guhit - guhit) at ERDDAP™ ay may kamaliang lumikha ng mga direktoryo na gaya ng
/home/erddapBPDcache
/home/erddapBPDcopy
/home/erddapBPDdataset
/home/erddapBPDflag
/home/erddapBPDlogs
/home/erddapBPDlucene
at isang file na pinangalanang /home/erdapBPDsubscriptionsV1.txt,
kung gayon ay kailangan mong ilipat at muling bigyan ng pangalan ang mga ito
/home/erddapBPD/coche
/home/erddapBPD/copy
/home/erddapBPD/dataset
/home/erddapBPD/flag
/home/erddapBPD/logs
/home/erddapBPD/lucene
at /home/erddapBPD/subscriptionsV1.txt
    * Pag - aayos ng baka: Mayroon doong mga insekto EDDGrid LonPM180 sa ERDDAP™ v1.66 na nangyari nang ang child dataset ay isang child dataset EDDGrid MulaErddap.
    * Pag - aayos ng baka: May bug sa EDDGrid Mula sa mga Latian at Uso Mula sa mga Latian sa Loob ERDDAP™ v1.66 na naging sanhi ng&lt;update EveryNMillis&gt; upang ipagwalang-bahala sa unang pagkakataon ang dataset ay nakarga pagkatapos ng isang restart.
    * Paglutas ng Bug/Bagong Katangian: Kung ang isang bata ay may datos sa loob EDDGrid Pag-aalsa ng Aggregate, EDDGrid Kopya, EDDGrid Posible, EDDGrid LonPM180, EDDGrid Side bySide, EDDTable Copy, o EDDTable From EDDGrid ay isang ... FromErddap dataset, na sinasang - ayunan ngayon ng magulang na dataset ERDDAP™ datos. Kung sa ilalim ERDDAP™ ang dataset ay pareho ERDDAP™ , ang suskrisyon at ang bisa nito ay ginagawa nang tuwiran; hindi ka makakakuha ng email na humihiling sa iyo na patunayan ang suskrisyon. Kung hindi, kung ang sistema ng suskripsiyon para sa iyo ERDDAP™ patayin, itakda ang&lt;Ikarga muli ang EveryNMinutes&gt; setting para sa magulang dataset sa maliit na numero (60?) Kung kaya't nananatili itong up-to-date.
    * Paglutas ng Bug/Bagong Katangian: Kung ang isang bata ay may datos sa loob EDDGrid Pag-aalsa ng Aggregate, EDDGrid Kopya, EDDGrid Posible, EDDGrid LonPM180, EDDGrid Side bySide, EDDTable Copy, o EDDTable From EDDGrid ay may aktwal na="mali", na ang child dataset ay hindi na umiiral ngayon.

## Bersiyong 1.66{#version-166} 
 (inilabas noong 2016-01-19) 

*    **Bagong mga Katangian (para sa mga gumagamit) :** 
    * Mga Graph (hindi mga mapa) ay maaari na ngayong bumaba ang halaga ng mga palakol. Upang makuha ito kapag gumagamit ng Make A Graph web page, baguhin ang bagong Y Axis : Pag-akyat na setting (ang default) tungo sa pagbaba. O, sa isang URL na humihiling ng isang graph, gamitin ang bagong opsyonal na 3rd ' | 'Paraan para sa [&.x Range at/o &. Mga switch ng yRange](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands) , na hindi maaaring maging ano (ang default) , totoo, o t upang tumaas ang mga halaga, o gumamit ng huwad o f upang makakuha ng bumababang mga pamantayan. Ang totoo | Ang maling mga pamantayan ay mga kasong walang pakiramdam. Salamat kina Chris Fultilove, John Kerfoot, Luke Campbell, at Cara Wilson.
    * Maaari na ngayong tiyakin ng mga gumagamit nito ang kulay ng background para sa mga grap sa pamamagitan ng pagdaragdag ng isang &.bgCoror=0x_ Ang ARRRGGB_ ay lumilipat sa URL na humihiling ng grap. Tingnan ang .bgCoror sa bahaging Graphics Commands [" griddap "](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#GraphicsCommands) at [ tabledap ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#GraphicsCommands) Mga dokumento. Salamat kina John Kerfoot at Luke Campbell.
    * Para sa mga taskular datasets, ang mga limitasyon ay maaari na ngayong tumukoy sa main (_ParehoVariableName_) o max (_ParehoVariableName_) . Tingnan [Main () at max () ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#min) . Salamat kay John Kerfoot.
    * Para sa mga taskular datasets, mga limitasyon sa oras na ginagamit [ngayon](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now) ay maaari na ngayong magtakda ng mga yunit ng oras ng mga millisecond o millis.
    * Isang kahilingan para sa isang larawan ng taskular dataset ang gumagawa ngayon ng isang mapa (hindigrap) kung ang x at y variables ay longhitud-tulad at latitud-tulad na variables (Magkasundong mga yunit) . Salamat sa Mayamang Signell.
    * Pag - aayos ng Bug: Kung minsan ang mga etiketa ng axis at garapata ng Time ay may kakaibang mga depekto kapag humihiling ng maraming graph nang sabay - sabay (e.g., sa isang web page) . Ang problema ay isang bug sa aklatan ng SGT graphics na ERDDAP™ gamitin (isang variable ay "statiko" na hindi dapat sana ay) . Salamat kay Bradford Butman.
         
*    **Mga Bagay ERDDAP™ Kailangang Malaman at Gawin ng mga Administrador:** 
    * Isang panganib ang paglalagay ng password sa iyong email sa isang simpleng text file na gaya ng setup.xml. Upang malutas ang problemang iyan, mahigpit naming inirerekomenda na kayo ay:
        1. Magtakda ng account sa email para lang sa ERDDAP 'Gumamit ng, e.g., erddap you Institution.org . Mayroon din itong iba pang mga pakinabang; lalo na, higit sa isa ERDDAP™ Pagkatapos, ang administrador ay maaari nang bigyan ng account sa email na iyon.
        2. Gawin ang mga pahintulot ng setup.xml file rw (basahin ang+write) para sa gumagamit na tatakbo ng Tomcat at ERDDAP™   (gumagamit ng=Tomcat?) at walang pahintulot (hindi nagbabasa o sumusulat) para sa grupo at iba pang gumagamit. Salamat kay Filipe Rocha Freire.
    * Ang bago [Archive](/docs/server-admin/additional-information#archiveadataset) ay nagpapasimple sa paggawa ng isang bagay .tar  .gz archive na may subset ng dataset sa format na angkop sa archiving (Partikular, sa NOAA ' NCEI ') . Dapat na kapaki - pakinabang ito sa marami ERDDAP™ Ang mga administrador sa maraming kalagayan, subalit lalo na sa mga grupo sa loob NOAA .
    * Ang bagong dataset type [ EDDGrid Mula sa mga Liwasang Hindi Nabuklat](/docs/server-admin/datasets#eddgridfromncfilesunpacked) ay iba't iba EDDGrid Mula sa NNcFiles. Ang pagkakaiba ay na binubuksan ng klaseng ito ang bawat talaksang datos bago pa man EDDGrid Mula saFiles tingnan ang mga files:
        
        * Ito'y nagdibuklat ng siksik na mga variable na ginagamit scale\\_factor at/o add\\_offset .
        * Ito ay nagtataguyod ng mga integer variables na may \\_Unsigned= True attributes sa isang mas malaking integer data type upang ang mga halaga ay lumitaw bilang ang mga hindi naka-sign na mga halaga. Halimbawa, `_Unsigned=tunay byte (8 bit) Ang mga variable ay nagiging pirmadong maikli (16 bit) Iba - iba.
        * Nakukumberte nito ang \\_FillValue at missing\\_value Mga pamantayang dapat sa NaN (o MAX\\_VALUE para sa mga uri ng integer data) .
        
Ang malaking bentaha ng klaseng ito ay na naglalaan ito ng paraan upang pakitunguhan ang iba't ibang pamantayan ng klaseng ito scale\\_factor , add\\_offset \\_FillValue, o missing\\_value sa iba't ibang salansan sa isang koleksiyon. Kung hindi, kailangan mong gumamit ng kagamitang gaya ng [NcML](/docs/server-admin/datasets#ncml-files) o [ NCO ](/docs/server-admin/datasets#netcdf-operators-nco) upang baguhin ang bawat file upang alisin ang mga pagkakaiba upang ang mga file ay maaaring hawakan ng EDDGrid Mula sa NNcFiles. Upang gumana nang maayos ang klaseng ito, dapat sundin ng mga file ang pamantayan ng CF para sa mga kaugnay na katangian. Salamat kay Philippe Makowski.
    * Ang bagong dataset type [ EDDGrid LonPM180](/docs/server-admin/datasets#eddgridlonpm180) Pinapalitan mo ang datasets na may mga halagang longhitud na mas malaki sa 180 (e.g., ang range 0 hanggang 360) sa mga dataset na may halaga ng longhitud sa loob ng range -180 hanggang 180 (Longitude Plus o Minus 180, kaya ang pangalan) . Ang malaking bentaha sa pag-aalok ng mga datasets na may mga halagang longhitúd sa range -180 hanggang 180 ay na OGC serbisyo (e.g., WMS ) ay nangangailangan ng halaga ng longhitud sa antas na ito. Salamat kina Lynne Tablewski, Fabien Guichard, Philippe Makowski, at Martin Spel.
2016-01-26 Update: Eeek&#33; Ito ay may bug na nangyayari kapag ang bata ay dataset EDDGrid Mula sa Erddap na tumutukoy sa isang dataset sa parehong larawan ERDDAP . Nakapirme ang bug na ito ERDDAP™ v1.68.
    * Nasa [GenerateDatasetsXml](/docs/server-admin/datasets#generatedatasetsxml) , bagong espesyal na dataset type, EDDGrid LonPM180 Mula sarddapCatalog, hayaan mong lumikha ka ng datasets.xml para sa EDDGrid LonPM180 datasets mula sa lahat ng mga EDDGrid datos sa loob ng isang ERDDAP na may anumang halaga ng longhitud na higit pa sa 180.
    * Para sa lahat EDDGrid ipinasok ang datos datasets.xml magagamit mo ngayon ang opsyonal
[&lt;Makukuha Via WMS &gt; Totoo | bulaan&lt;/accessible Via WMS &gt;] (/docs/server-admin/datasets#accessibleviawms)   (default=tunay) . Ang pagsisinungaling nito ay sapilitang pumipinsala sa WMS serbisyo para sa dataset na ito. Kung totoo, ang dataset ay maaaring hindi pa rin makuha sa pamamagitan ng WMS sa iba pang mga dahilan (e.g., walang palakol na lat o lon) . Ito ay partikular na kapaki-pakinabang sa mga dataset na umiiral sa kanilang sariling at nakabalot sa pamamagitan ng EDDGrid LonPM180, kung kaya't tanging ang bersiyong LonPM180 lamang ang mararating sa pamamagitan ng WMS .
    * Sa setup.xml, maaari mong magtakda ng ibang default na kulay para sa background ng mga graph. Itinakda ang kulay bilang isang 8 digit na hexadecimal na halaga sa anyong 0x_AARRRGGB_, kung saan ang AA, RR, GG, at BB ay ang opacity, pula, berde at asul na bahagi, ayon sa pagkakasunud-sunod, na tinukoy bilang 2-digit na mga numerong hexadecimal. Pansinin na ang kanbas ay laging puti, gayon nga (semi -) Ang malinaw na graph background color ay nagiging puting kambas. Ang default ay mapusyaw na asul:
```
        <graphBackgroundColor>0xffccccff</graphBackgroundColor>  
```
Salamat kina John Kerfoot at Luke Campbell.
    * Sa setup.xml, maaari mo ngayong tiyakin ang pinakamalaking sukat para sa [talaksang troso](/docs/server-admin/additional-information#log)   (kapag ito ay muling pinangalanang logo. tuxt. Dati at isang bagong logo. Nalilikha ang txt) , sa Mega Bytes. Ang minimum na pinapayagan ay 1. Ang pinakamatagal na ipinahihintulot ay 2000. Ang default ay 20 (MB) . Halimbawa:
```
        <logMaxSizeMB>20</logMaxSizeMB>
```
    * Nasa datasets.xml , [&lt;fgdcFile&gt;] (/docs/server-admin/datasets#fgdcfile) o [&lt;ayo19115File&gt;] (/docs/server-admin/datasets#iso19115file) ngayon ay maaaring maging isang lokal na talaksan (gaya ng dati) o isang URL (na ida - download upang may lokal na kopya) . Kung ERDDAP™ ay hindi ma-download ang file, ang pagkarga ng dataset ay magpapatuloy ngunit ang dataset ay hindi magkakaroon ng fgdc o iso19115 file.
    *    EDDGrid Mula sa mga Latian at Uso Ang mga dataset ng FromFiles ay maaari na ngayong gumawa ng mabilis na Restart (sistema na ERDDAP™ na gamitin kapag ang datasets ay unang nakakarga kapag ERDDAP™ ay muling naka-arte) . Pinabilis nito ang muling pag - uugnay ERDDAP .
2016-01-26 Update: Eeek&#33; Ito ay may bug na sanhi&lt;update EveryNMillis&gt; upang ipagwalang-bahala sa unang pagkakataon ang dataset ay nakakarga pagkatapos ng isang restart. Nakapirme ang bug na ito ERDDAP™ v1.68.
    * Ang pangkalahatang pagpapabuti sa sistemang quickRestart ERDDAP™ sa pagkarga ng datasets nang mas mabilis kapag ERDDAP™ ay muling ginaganap.
    * Lahat EDDGrid Mula sa mga Latian at Uso Ang mga subclass ng FromFiles ay tumatanggap ngayon ng isang bagong&lt;PathRegex&gt; tag, karaniwang espesipikong nasa ibaba mismo&lt;Ibalik ang&gt;. Kung ang pag-uulit ay "tunay", tanging ang buong mga daang subdirectory na tumutugma sa pathRegex (default=".\\*") ay tatanggapin. Sa katulad na paraan, ang isang&lt; sourceUrl tag ng &gt; sa isang EDDGrid Ang AggregateExing Dimension ay maaari na ngayong isama ang isang pathRegex attribute (default=".\\*") .
    * Ang default para sa&lt;bahaging RequestMax Bytes&gt; sa setup.xml ay ngayon 49000000000000000000000000000000000000000000000000000000000000000000000000000000000 (~490 MB) . Iniiwasan nito ang ilang mga problema/timeouts na may kaugnayan sa pagkuha ng datos mula sa THREDS data servers. Salamat kay Leslie Thorne.
    * Isang maliit na pagbabago sa sistema ng troso ang dapat na magbigay - daan ERDDAP™ upang maging higit na tumutugon kung ito ay lubhang abala. Ang impormasyon ay isinusulat ngayon sa log file sa disk drive sa malalaking tipak. Ang bentaha ay na ito ay napakahusay -- ERDDAP™ ay hindi kailanman hahadlangan ang paghihintay na isulat ang impormasyon sa log file. Ang disbentaha ay na ang troso ay halos laging matatapos sa pamamagitan ng bahagyang mensahe, na hindi matatapos hanggang sa isulat ang susunod na bahagi.
    * Bug fix na may kaugnayan sa kawalang - katiyakan at sa [&lt;update EveryNMillis&gt;] (/docs/server-admin/datasets#update royllis) sistema para sa EDDGrid Mula sa mga Latian at Uso Mula sa mga dataset: Hindi na kailangan pang magtakda ng isang malaking f.inotafy.max\\_user\\_watches o fs.inotafy.max\\_user\\_instances. May bug sa Java na sanhi ng ilang bahagi ng Java Ang 'di-malinaw/WatchDirektory system upang hindi makolekta ang basura kapag ang mga ito ay finalized; sa huli, ang bilang ng zombie intoficify relos o mga pagkakataon ay lalampas sa pinakamaraming bilang na tinukoy. ERDDAP™ ay gumagana sa palibot nito Java bug.
Gayundin, ang bilang ng mga sinulid na intolify ay nakatala sa status.html web page, kaya maaari mong tingnan ang gamit nito. Karaniwan na, may 1 sinulid na hindi gumagalaw sa bawat isa EDDGrid Mula sa mga Latian at Uso Mula saFiles dataset.
    * Bug fix: sa maraming lugar, sa halip na isang pagkakamali ang muling ihagis, isang bagong pagkakamali ang nagawa na kinabibilangan lamang ng isang maikling bersiyon ng orihinal na maling mensahe at walang tatak. Ngayon, kapag nalikha ang isang bagong pagkakamali, wastong isinasama nito ang buong orihinal na eksepsiyong e.g., maghagis ng bagong eksepsiyon. ("ilang bagong mensahe", e) ;
Salamat kay Susan Perkins.
    * Pag - aayos ng Bug: hanggang kamakailan (v1.64?) , kung .../ datasetID Hiniling ang URL, ERDDAP™ .html sa URL. Noong v1.64, ito ay nabigo (isang maling anyo ang nilikha at pagkatapos ay nabigo) . Ngayon ito ay muling gumagana. Salamat kay Chris Fultilove.

## Bersiyong 1.64{#version-164} 
 (inilabas noong 2015-08-19) 

*    **Bagong mga Katangian (para sa mga gumagamit) :** 
    * Mayroon na ngayong patnubay para sa pag-access ng password-proteksiyon pribado ERDDAP™ datos ( https:// ) gagamitin curl at Python . Tingnan ang [ curl ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#curl) at [ Python ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#Python) mga tagubilin.
Dahil kina Emilio Mayorga ng NANOOS at Paul Janecek ng Spyglass Technologies.
         
*    **Mga Bagay ERDDAP™ Kailangang Malaman at Gawin ng mga Administrador:** 
    *    ERDDAP™ kailangan ngayon Java 1.8+.
         Java 1.7 ang umabot sa opisyal nito [katapusan ng buhay](https://www.oracle.com/technetwork/java/eol-135779.html)   (wala nang mga update sa seguridad) noong Abril 2015. Ang bersiyong ito ng ERDDAP™ ay hindi gagana sa mga bersiyon ng Java sa ibaba 1.8. Kung mag - update ka mula sa Java 1.7x (o mas maaga) , dapat mo ring i-update ang Tomcat. Tingnan ang [ ERDDAP™ Maglagay ng mga Tagubilin](/docs/server-admin/deploy-install) para sa pagkuha ng mga link at payo.
    * Bagong Data ang Tagapaglaang Form.
Kapag lumapit sa iyo ang isang data provider sa pag - asang magdagdag ng ilang impormasyon sa iyo ERDDAP™ , ito ay maaaring maging mahirap at oras na nauubos upang tipunin ang lahat ng metadata na kinakailangan upang idagdag ang dataset sa ERDDAP . Maraming pinagmulang datos (Halimbawa, .csv files, Mga file, database) walang panloob na metadata, kaya ERDDAP™ ay may bagong Data Provider Form na nagtitipon ng metadata mula sa data provider at nagbibigay sa provider ng datos ng ilang iba pang patnubay, kabilang ang malawak na patnubay para sa Data In Databases. Ang impormasyon na isinumite ay ginagawang ang datasets.xml format at pagkatapos ay email ERDDAP™ Tagapangasiwa (ikaw) at isinulat (Pinalitan) sa malalaking Direktory/log/data DividerForm.log . Kaya, ang anyong semi-automates ang proseso ng pagkuha ng dataset ERDDAP™ , ngunit ang ERDDAP™ Kailangan pa ring tapusin ng administrador ang datasets.xml Ayusin at pakitunguhan ang pagkuha ng data file (s) mula sa tagapaglaan o nagdurugtong sa database. Para sa higit pang impormasyon, tingnan ang [Tagapaglaan ng mga Data Inilalarawan ng Anyo](/docs/server-admin/datasets#data-provider-form) .
    * Bago&lt;&gt; ng posporo
magagamit ng EDDGrid Mula sa mga Labi (at sa gayo'y mula sa NNcFiles at mula saMergeIRFiles) , EDDGrid Pag-aalsa ng Aggregate, EDDGrid Kopya, at EDDGrid Side Byside datasets upang tiyakin kung gaano kaeksakto ang halaga ng axis sa iba't ibang file (kung gaano karaming numero) : 0= Huwag tingnan (Huwag mong gamitin ito&#33;) , 1-18 para sa lumalaking prekwensiya, o 20 (ang default) para sa eksaktong pagkakapantay - pantay. Para sa n=1-18, ERDDAP™ Tinitiyak na ang unang numero ng dobleng halaga (o (n+1) div 2 para sa floating values) ay pantay - pantay.
        &lt;Palitan ng mga patchAxisNDigits&gt;&lt;Tiniyak ng AxisValues AreEqual&gt;, na ngayo'y wala nang halaga. Ang isang halaga ng 'tunay' ay babaguhin upang magrecord ng AxisNDigits=20. Isang halaga ng 'bulaan' (Huwag mong gawin ito&#33;) ay babaguhin upang magtugma AxisNDhigits=0.
    *    EDDGrid Mula sa mga Latian at Uso Ang mga FromFile ay marahang magkakarga sa unang pagkakataon na gamitin mo ang bersiyong ito ng ERDDAP .
         ERDDAP™ ay nag - iimbak ngayon ng impormasyon mula sa loob ng file nang kaunti, kaya ang panloob na file table para sa bawat isa sa mga dataset na ito ay kailangang itayong muli. Kaya huwag kang mag - alala. Walang masama. Isa itong minsang bagay.
    * Malayong Pinagmulan
         EDDGrid Mula saNcFiles, EDDTable FromNcFiles, EDDTable FromNcCFpiles ay pinapayagan ngayon ang mga file na maging remote files sa isang directory na mararating ng http://   (at marahil https:// at ftp:/, ngunit hindi ito sinusubok) kung ang remote server ay sumusuporta [Mga Kahilingan sa Pag - aalaga ng Hayop](https://en.wikipedia.org/wiki/Byte_serving) sa kahilingan. MGA THEDD at Amazon S3 support Range requests, Hyrax ay hindi. Ang sistemang ito ay nagpapangyari sa iyo na ma-access ang datos sa mga remote file nang hindi nai-download ang mga file (na nakatutulong kung ang mga remote file ay masyadong maningning) , subalit ang pagkuha ng mga file na ito ay magiging mas mabagal kaysa sa pagkuha ng lokal na mga file o kahit na sa isang remote OPeNDAP pinagmumulan.
Kasali na rito ang "files" sa isang timba ng Amazon S3 mula nang marating ang mga ito http:// . Kung ang mga pangalan ng S3 bagay ay parang mga file (na may panloob na /'s tulad ng isang puno ng directory ng Linux) , ERDDAP™ ay maaari ring gumawa sa mga file na madaling makuha sa pamamagitan ng ERDDAP ' "files" sistema. Upang gumana ito, ang inyong S3 kredensiyal ay dapat nasa ~/.aws/credentials (sa Linux, OS X, o Unix) , o C:\\Users\\USERNAME\\.aws\\credents (sa Windows) sa server kasama ng ERDDAP . Tingnan ang [Dokumento ng Amazon SDK](https://docs.aws.amazon.com/sdk-for-java/?id=docs_gateway#aws-sdk-for-java,-version-1) .
    * Mga GenerateDataset Ang Xml ay may bago at kakaibang opsiyon: EDDs FromFiles.
Ito ay daraan sa sistema ng talaksan (kahit na ang isang remote system tulad ng Amazon S3 kung ang mga bagay ay may file-tulad ng mga pangalan) at lumikha ng datasets.xml Mga tipak para sa isang serye ng mga datos. Maaaring iba - iba ang iyong milyahe. Mabisa ito kung ang mga file ay organisado para lahat ng data files sa isang ibinigay na directory (at ang mga direksiyon nito) ay angkop sa isang dataset (e.g., lahat ng SST 1-araw na elemento) . Kung hindi (e.g., kung ang isang directory ay naglalaman ng ilang files ng SST at ilang file ng Chlorophyll-a) , mahina ito ngunit maaari pa ring maging kapaki-pakinabang.
    * Programmers: new /lib .jar files.
Kung magtitipon ka ERDDAP™ , pakisuyong pansinin ang bagong talaksan ng .jar sa classpath -cp parameter na nakatala sa bagong .jar ERDDAP™   [Patnubay ng Programmer](/docs/contributing/programmer-guide) .
    * dagat\\_water\\_praktikal\\_salinidad
Kung gagamitin mo ang karaniwang pangalan ng CF na\\_water\\_salinity para sa anumang bagay na iba't iba, hinihimok kita na lumipat sa dagat\\_water\\_praktikal na\\_asin [bersyon 29 ng CF Standard Name Table](https://cfconventions.org/Data/cf-standard-names/29/build/cf-standard-name-table.html)   (at ilang naunang bersyon -- hindi ko alam) . Ipinahihiwatig ng pangalang ito na talagang ito'y isang Praktikal na Salinidad na ginagamit Practical Salinity Units   ( PSU ) , taliwas sa mas lumang g/kg na halaga. Ang kanonikal na mga yunit ay naiiba, subalit hindi pa rin kapani - paniwalang nakatutulong: 1 (Malamang na Ipinahihiwatig PSU /PS-78) , bilang salungat sa 1e-3 (Malamang na nagpapahiwatig ng g/kg) para sa dagat\\_water\\_salinidad. \\[ Hey, Unidata at CF: Nakikilala natin ang mga pamantayan na gumagamit ng ibang mga kaliskis, halimbawa ang Fahrenheit o Celsius, sa pamamagitan ng isang tali ng yunit na siyang pangalan ng sukatan o iba't ibang kulay. Bakit hindi natin matukoy ang mga yunit ng asin sa pamamagitan ng kanilang sukatan, e.g., PS-78? Alam ko: Ang mga pagpapahalagang PS-78 ay "unitless", ngunit may ipinahihiwatig na sukatan, hindi ba? Kung ako'y umimbento ng isang bagong praktikal na antas ng alat kung saan ang mga pamantayan ay 0.87 ulit ng halaga ng PS-78, ang kanonikal na mga yunit ba ay dapat pa ring "1"? Paano masasabi ng gumagamit na sila'y magkahiwalay? Ang mga Unit ng 1e-3 at 1 ay hindi naglalarawan o nakatutulong sa mga gumagamit na nagsisikap na malaman kung ano ang ipinakikita ng mga numero. \\] 

## Bersiyong 1.62{#version-162} 
 (inilabas noong 2015-06-08) 

*    **Bagong mga Katangian (para sa mga gumagamit) :** 
    * Sapagkat EDDGrid datasets, ang mga gumagamit ay maaari na ngayong gumawa ng Graph Type: Surface graphs na may anumang kombinasyon ng mga numerikong palakol, hindi lamang longhitud laban sa latitud. Ito ay nagpapahintulot sa iyo na gumawa ng x laban sa y (inaasahang) Mga grap at iba't iba [Mga Dayagram ng Hovmöller](https://en.wikipedia.org/wiki/Hovm%C3%B6ller_diagram) Halimbawa, balakin ang longhitud laban sa lalim, o panahon laban sa lalim. \\[ Pansinin: Kung ang lalim ay nasa Y Axis, malamang na ito'y maalis sa kung ano ang nais mo. Ikinalulungkot mo, hindi pa ito opsyon. \\] Salamat kina Cara Wilson at Lynn DeWitt.
    * May bago [Oceanic/Isang Atmospheric Acronym na Tagapagkumberte](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericAcronyms.html) na nagpapahintulot sa iyo na gawing/mula sa buong pangalan ang isang karaniwang oceanic/atrogenic acronym.
    * May bago [Karagatanic/Isang Atmospera May Iba't Ibang Pangalang Nakumberte](https://coastwatch.pfeg.noaa.gov/erddap/convert/oceanicAtmosphericVariableNames.html) na nagpapahintulot sa iyo na gawing/mula sa buong pangalan ang isang karaniwang oceanic/abox variable.
*    **Mga Bagay ERDDAP™ Kailangang Malaman at Gawin ng mga Administrador:** 
    *    Java 7/8
         Oracle hindi na sumusuporta (nagbibigay ng security bug fix para sa)   Java 7. ERDDAP™ sumusuporta pa rin Java 7, ngunit pakisuyong lumipat Java 8. ERDDAP™ marahil ay kakailanganin Java 8.
    *    valid\\_min /max/ranggo
Dati at ngayon, kung mayroon dataVariable nagkaroon scale\\_factor at add\\_offset metadata, ERDDAP™ Binubuklat ang mga halaga ng datos at inaalis ang metadata. Dati, ERDDAP™ ay hindi nagbago/walang packed valid\\_range , valid\\_min , valid\\_max metadata (na karaniwang/dapat na maglaman ng siksik na mga halaga) sunod scale\\_factor at add\\_offset . Ngayon ay gayon nga. Pakisuyong saliksikin ang inyong ERDDAP™ para sa "valid\\_" at tiyakin na ang lahat ng mga variables na meron valid\\_range , valid\\_min , o valid\\_max may tamang mga pamantayan kapag lumitaw ang mga dataset sa bagong bersiyon ng ERDDAP . Tingnan [ valid\\_range /min/max dokumentasyon](/docs/server-admin/datasets#valid_range) .
    * ACDD-1.3
Dati, ERDDAP™   (Partikular na ang mga GenerateDataset Xml) ginamit/recommented ang orihinal (1.0.) bersiyon ng [ NetCDF Attribute Convention for Dataset Discovery](https://wiki.esipfed.org/ArchivalCopyOfVersion1) na tinukoy na " Unidata Dataset Discovery v1.0" sa mga global Conventions at mga global Conventions Metadata\\_Conventions mga katangian. Ngayon, aming inirerekomenda [bersyong ACDD 1.3](https://wiki.esipfed.org/Attribute_Convention_for_Data_Discovery_1-3) na pinagtibay noong unang bahagi ng 2015 at tinukoy bilang "ACDD-1.3". Sa kabutihang palad, ang ACDD-1.3 ay labis na paatras na tumutugma sa bersyon 1.0. BINUGOD namin na ikaw [lumipat sa ACDD-1.3](/docs/server-admin/datasets#switch-to-acdd-13) . Hindi ito mahirap.
    * Mga GenerateDataset Mga Xml Attributes
Nagkaroon ng maraming pagbabago upang pagbutihin ang&lt; addAttributes &gt; mga pamantayang iminungkahi ng mga GenerateDataset Xml para sa pangglobong mga Kombensiyon, creator\\_name /email/url, keywords, buod, at mga katangian sa pamagat at para sa variable long\\_name Sabihin pa. Ang ilang mga pagbabago ay nauugnay sa bagong paggamit ng ACDD-1.3.
    * Maaasahan Mula sa SOS datos
Sa paminsan-minsang pagdaragdag ng mga bagong uri ng SOS Ang mga server at mga pagbabago tungo sa dating mga server, ito ay nagiging mas mahirap para sa ERDDAP™ upang awtomatikong makita ang uri ng server mula sa mga tugon ng server. [ Talababa]&lt;Sos ProserType&gt;] (/docs/server-admin/datasets#eddtable fromsos-skeleton-xml)   (na may halaga ng IOOS\\_NDBC, IOS\\_NOS, OOSTethys , o WHOI) ngayon ay SONGAL NA RECOMENDED. Kung ang alinman sa iyong mga dataset ng uring ito ay may mga problema sa bagong bersiyon ng uring ito ERDDAP , subukan ang re-running GenerateDatasets Xml para sa SOS server upang lumikha ng bagong tipak ng datasets.xml para sa dataset na iyon. Mga GenerateDataset Xml ay hahayaan mong subukin mo ang kakaiba&lt;Mga mapagpipiliang sosserType&gt; hanggang sa masumpungan mo ang tamang sukat para sa isang ibinigay na server. Kung may mga problema ka pa rin, pakisuyong ipaalam sa akin ang problemang nakikita mo at ang URL ng server at sisikapin kong tumulong.
    * EDDTable Mula saFileNames datasets
Ilang katangian na inirekomenda addAttributes ngayon ay mga source Attributes. Marahil ay hindi mo na kailangang baguhin ang anumang bagay para sa umiiral na mga dataset sa iyong katawan datasets.xml .
    * Bug fix na may kaugnayan sa ilang kahilingan sa EDDTable FromNcCFililes datasets.
Idinagdag ko rin ang isang malaking bilang ng mga unit test sa umiiral na malaking bilang ng mga unit test ng mga pamamaraan sa ilalim (100 tagpo) . Salamat kay Eli Hunter.
    * Iayos ang Bug/maliit na pagbabago sa EDDGrid Mula saMergeIR.
Salamat kina Jonathan Lafite at Philippe Makowski
    * Pag - aayos ng baka: EDDGrid Mula saErddap ay gumagana ngayon kahit na ang isang remote dataset ay wala ioos\\_category Iba't ibang katangian.
Salamat kay Kevin O'Brien.
    * Bug fix sa .grap web page para sa EDDGrid ang mga datos kapag iisa lamang ang axis na may higit sa isang halaga.
Salamat kay Charles Carleton.
    * May iba pang maliliit na pagbabago, pagbabago, at mga bug fix.

## Bersiyong 1.60{#version-160} 
 (inilabas noong 2015-03-12) 

*    **Bagong mga Katangian (para sa mga gumagamit) :** wala ni isa
*    **Mga Bagay ERDDAP™ Kailangang Malaman at Gawin ng mga Administrador:** 
    * MAHIRAP NA RECOMMENDE: Ibago ang iyong server [Mga robot.txt](/docs/server-admin/additional-information#robotstxt) Kabilang ang talaksan:
Panghihina ng loob: /erddap/file/
    * Ipinakikilala ang Problema at Lunas:
Sa mga computer na Linux, kung ginagamit mo&lt;update EveryNMillis&gt; na may datos na may tipo= EDDGrid Mula sa mga Latian, Kagustuhan Mula sa mga Latian, EDDGrid Kopya, EDDTableCopy, o ang kanilang mga subclass, maaaring makita mo ang isang problema kung saan ang isang dataset ay hindi nakakarga (Paminsan - minsan o walang pagbabago) na may maling mensahe: "IOException: Gumamit ng hangganan ng hindi maayos na mga pagkakataon na naabot o labis na maraming bukas na files". Kung gayon, malulutas mo ang problemang ito sa pamamagitan ng pagtawag (bilang ugat) :
echin fs.inotafy.max\\_user\\_watches=65536 | tee -a /etc/sysctl.conf
echin fs.inotafy.max\\_user\\_instances=1024 | tee -a /etc/sysctl.conf
sysctl -p
O, gumamit ng mas mataas na bilang kung ang problema ay nagpapatuloy. Ang default para sa relos ay 8192. Ang default para sa mga pagkakataon ay 128. \\[ UPDATE: May bug sa Java na nagpapangyari sa mga pagkakataon na huwag makolekta ang basura. Iniiwasan ang problemang ito ERDDAP™ v1.66 pataas. Kaya ang mas mabuting solusyon ay bumaling sa pinakabagong bersiyon ng ERDDAP . \\] 
    * Walang Gayong Pag - asa Bog Fix:
May bug na maaaring magdulot ng datasets ng type= EDDGrid Mula sa mga Latian, Kagustuhan Mula sa mga Latian, EDDGrid Kopya, EDDTableCopy, o ang kanilang mga subclass upang huwag magkarga paminsan-minsan ng pagkakamali "No tsexFileException: _SomeFileName_". Ang bug ay nauugnay sa mga gamit ng FileVisitor at ipinakilala sa ERDDAP™ v1.56. Ang problema ay bihira at pinakamalamang na makaapekto sa datasets na may malaking bilang ng madalas na nagbabagong data files.
    * May ilang maliliit na pagsulong, pagbabago, at mga bug fix.

## Bersiyong 1.58{#version-158} 
 (inilabas noong 2015-02-25) 

*    **Bagong mga Katangian (para sa mga gumagamit) :** 
    * Ang bago [ "files" ](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) Ipinadadala ng sistemang ito ang iyong birtwal na sistema ng talaksan at i-download ang mga source data file mula sa marami ERDDAP™ mga datos. Ang "files" Ang sistema ay gumagana sa pamamagitan ng default, ngunit ERDDAP™ Maaari itong sirain ng mga administrador sa pamamagitan ng paglalagay nito
```
        <filesActive>false</filesActive>  
```
sa loob ERDDAP™ Pagtatakda.xml file. Partikular na salamat kay Philippe Makowski, na nanatili noong ako'y mabagal sa pagpapahalaga sa kagandahan ng ideyang ito.
    * destinasyon Max -- Dati, ang time variable ng EDDTable datasets na may malapit na real time data ay may destinasyon Max ng NaN, na nagpapahiwatig na ang pinakamalaking halaga ng oras para sa dataset ay kamakailan lamang, ngunit hindi eksaktong alam at nagbabago nang madalas. Ngayon, ang destinasyong Max ay may tunay na halaga, na nagpapahiwatig ng kasalukuyang-kilalang huling pagkakataon. Maraming datasets ay may patuloy na updated data. ERDDAP™ ay sumusuporta sa pag-access ng pinakabagong datos, kahit na ito ay pagkatapos ng kasalukuyang-kilalang huling pagkakataon. Pansinin na ang bago [&lt;update EveryNMillis&gt;] (/docs/server-admin/datasets#update royllis) suporta EDDGrid Mula sa mga Latian at Uso Mula saFiles datasets ang update sa time variable's destinasyonMax. Ang isa pang resulta ng pagbabagong ito ay na ang datasetID = allDatasets Ang dataset ngayon ay kinabibilangan ng kasalukuyang-kilalang huling pagkakataon sa maxTime column. Salamat kay John Kerfoot.
*    **Mga Bagay ERDDAP™ Kailangang Malaman at Gawin ng mga Administrador:** 
    * MAHIRAP NA RECOMMENDE: Ibago ang iyong server [Mga robot.txt](/docs/server-admin/additional-information#robotstxt) Kabilang ang talaksan:
Panghihina ng loob: / Mgafile/
Panghihina ng loob: /erddap/file/
    * Sample datasets.xml -- Noong nakaraang taon, inirekomenda namin ang ilang mahuhusay na dataset sa coastwatch ERDDAP™ na puwede mong idagdag sa ERDDAP™ Sa pamamagitan lamang ng pagdaragdag ng ilang linya sa iyong katawan datasets.xml . Kung idaragdag mo ang mga dataset ng erdVH, pakisuyong lumipat sa mas bagong mga dataset ng erdVH2:
        * Gumawa ng kopya ng lahat ng erdVH datasets at baguhin ang kinopya datasetID ''s mula sa erdVH... hanggang sa erdVH2... at baguhin ang reperensiya sourceUrl mula sa erdVH... hanggang sa erdVH2....
        * Itakda ang erdVH... datasets to active=" false".
    * Lahat EDDGrid Mula sa mga Latian at Uso Ang mga subclass ng FromFiles ay sumusuporta ngayon [&lt;Madaling puntahan [[Talaksan] (/docs/server-admin/datasets#accessibleviafiles) upang ang source data files ay makuha sa pamamagitan ng "files" mga sistema. Sa pamamagitan ng default, ang sistemang ito ay nasa labas para sa bawat dataset. Kailangan mong idagdag ang tag upang gawin ito. Salamat kay Philippe Makowski.
    * Lahat EDDGrid Mula sa mga Latian at Uso Ang mga subclass ng FromFiles ay sumusuporta ngayon [&lt;update EveryNMillis&gt;] (/docs/server-admin/datasets#update royllis) . Sa pamamagitan ng default, ang sistemang ito ay nasa labas para sa bawat dataset. Kailangan mong idagdag ang tag upang gawin ito. Salamat sa Dominic Fuller-Rowell at NGDC.
    * Ang bago [Mapagkakatiwalaan Mula sa mga Bilibini](/docs/server-admin/datasets#eddtablefromfilenames) Lumilikha ng dataset mula sa impormasyon tungkol sa isang grupo ng mga file sa sistemang server's file, ngunit hindi ito nagsisilbi ng datos mula sa loob ng mga file. Halimbawa, ito ay kapaki-pakinabang para sa pamamahagi ng mga koleksiyon ng mga talaksan ng imahe, mga file na audio, mga file ng video, mga file na word-processing, at mga talaksang distribusyon. Ito ay gumagawa ng hand-in-hand kasama ng bago [ "files" ](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html) sistema, upang ma-download ng mga gumagamit ang mga file. Partikular na salamat kay Philippe Makowski, na nanatili noong ako'y mabagal sa pagpapahalaga sa kagandahan ng ideyang ito.
    * Ang bago [ EDDGrid Mapagkakatiwalaan](/docs/server-admin/datasets#eddgridfromeddtable) Hayaan mong gawing grided dataset ang isang taskular dataset. Salamat sa Ocean Networks Canada.
    * Ang bago [ EDDGrid Mula sa mga GamergeIRFile](/docs/server-admin/datasets#eddgridfrommergeirfiles) Ang aggregates data mula sa isang grupo ng lokal na MergeIR .gz mga file. EDDGrid Ang mga FromMergeIRFile ay may pagkakakilanlan bilang ang unang kalipunan ng kodigo na nakatulong sa pagkakaroon ng malaking halaga ERDDAP . Ginawa ito nang walang tulong. Tatlong tuwa at espesyal na pasasalamat kina Jonathan Lafite at Philippe Makowski ng R.Tech Engineering.
    * May bago at opsyonal na setup.xml tag,&lt;unitTataDir&gt;, na nagpapaliwanag sa directory sa pamamagitan ng unit test data files na makukuha sa pamamagitan ng isang bagong institusyon ng GitHub: [ https://github.com/ERDDAP/erddapTest ](https://github.com/ERDDAP/erddapTest) . Halimbawa:
```
        <unitTestDataDir>/erddapTest/</unitTestDataDir>  
```
Hindi pa ito kapaki - pakinabang, subalit bahagi ito ng pagkilos tungo sa paggawa sa hangga't maaari'y marami sa mga pagsubok sa yunit. Salamat kay Terry Rankine.
    * Maraming maliliit na mga pagpapabuti, pagbabago, at mga bug fix.

## Bersiyong 1.56{#version-156} 
 (inilabas noong 2014-12-16) 

*    **Bagong mga Katangian (para sa mga gumagamit) :**   (Wala) 
*    **Mga Bagay ERDDAP™ Kailangang Malaman at Gawin ng mga Administrador:** 
    * Marahil ay alam mo na ang tungkol sa [ EDDGrid Mula sa Erddap](/docs/server-admin/datasets#eddfromerddap) at [Mapagkakatiwalaang Mula sarddap](/docs/server-admin/datasets#eddfromerddap) na magdurugtong sa mga dataset sa iba ERDDAP mga s at palitawin ang mga ito sa iyong mukha ERDDAP . Ang mga kahilingan ng User para sa aktuwal na impormasyon mula sa mga dataset na ito ay hindi nakikita sa pinagmumulan ERDDAP™ , kaya ang datos ay hindi dumadaloy sa iyong sistema o ginagamit ang iyong bandwidth. Mayroon na ngayong malaking listahan ng inirerekomendang mga dataset sa sampol datasets.xml sa erddapCont .zip . Upang ilakip ito sa iyong sarili ERDDAP™ , ang kailangan mo lamang gawin ay kopyahin at ihalo ang gusto mong gawin sa iyo datasets.xml . Salamat kay Conor Delaney.
    * Kung magtitipon ka ERDDAP™ , kailangan mong magdagdag ng mga bagong . mga file sa iyong sisidlan [switch ng classpath -cp](/docs/contributing/programmer-guide#development-environment) para sa javac at java.
    * Ang bago [Mapagkakatiwalaan Mula sa Cassandra](/docs/server-admin/datasets#eddtablefromcassandra) humahawak ng impormasyon mula sa [Cassandra](https://cassandra.apache.org/) . Salamat sa Ocean Networks Canada.
    * Ang bago [Kawili - wili Mula sa mga Labi ngColumnarAsciiFile](/docs/server-admin/datasets#eddtablefromcolumnarasciifiles) humahawak ng datos mula sa mga talaksang datos ng ASCII na may nakapirmeng-width column. Salamat kay Philippe Makowski.
    * Lahat EDDGrid Mula sa mga Latian at Uso Ang mga subclass ng FromFiles ay gumagamit ngayon ng bagong pamamaraan, ang FileVisitor (idinagdag Java sa 1.7) upang makakuha ng impormasyon tungkol sa mga file. Ito ay maaaring walang pakinabang para sa unang pagtitipon ng impormasyon ng talaksan para sa isang ibinigay na dataset ngunit tila may malaking pakinabang para sa mga sumunod na pagtitipon kung gagawin sa lalong madaling panahon, habang ang OS pa rin ang may tatak ng impormasyon. Salamat sa NGDC.
        
Iminumungkahi pa rin namin: Kung ang isang dataset ay may malaking bilang ng mga file (e.g., &gt;1,000) , ang operating system (at sa gayon EDDGrid Mula sa mga Latian at mga EDDTable Mula sa mga Latian) higit na mahusay ang pagpapatakbo kung iimbak mo ang mga file sa isang serye ng subdirectories (isang taon, o isang buwan para sa mga dataset na may napakadalas na mga file) , kung kaya't wala pang isang malaking bilang ng mga file sa isang ibinigay na directory.
        
    * Ilang maliliit na pagpapabuti sa EDDTable FromAsciiFiles.
    * Ang ilang pagpapabuti sa EDDTable FromAsciiServiceNOS, lalo na upang makakuha ng ilang karagdagang hanay ng impormasyon mula sa pinagmumulan. Salamat kay Lynn DeWitt.
    * Ilang maliliit na bug fix na may kaugnayan sa ISO 19115 na ERDDAP™ ang lumilikha. Salamat kay Anna Milan.

## Bersiyong 1.54{#version-154} 
 (inilabas noong 2014-10-24) 

*    **Bagong mga Katangian (para sa mga gumagamit) :** 
    * Ang ilang mga variable ngayon ay gumagana na may oras sa milliseconds prepektura, e.g., 2014-10-24T16:41:22.485Z. Salamat sa Dominic Fuller-Rowell.
*    **Maliliit na pagbabago/Bug Fixes:** 
    * Paglutas ng Bug: na may tiyak na kombinasyon ng mga kalagayan, EDDGrid Mula sa NNcFile datasets ibinalik ang datos sa nabawasang prekwensiya (e.g., lumutang sa halip na magdoble) . Ito'y makaaapekto lamang sa halaga ng datos na may &gt; 8 mahahalagang bilang. Humingi ako ng tawad. (At ito ay isang klasikong computer programming bug: isang maling karakter.) Salamat sa Dominic Fuller-Rowell.
    * Maraming maliliit na pagbabago.
*    **Mga Bagay ERDDAP™ Kailangang Malaman at Gawin ng mga Administrador:** 
    * Sinusuporta ngayon ng mga dataset ng Griddap ang timestamp axis variables at data variables (I.e., iba - iba ang halaga ng panahon, subalit isang destinationName maliban sa iba "time" ) . Salamat sa Dominic Fuller-Rowell.
    *    ERDDAP™ ay tamang sumusuporta sa mga millisecond time\\_precision "1970-01-01T00:00.000Z". Isang sinadyang pag-ikot: kapag sumusulat ng mga panahon sa mga human-oriented files (e.g., .csv, .tsv , .json , .xhtml ) , ERDDAP™ gamitin ang espesipikong time\\_precision kung ito'y may kasamang mga segundo at/o mga segundo ng pag - aaral; kung hindi, gumagamit ito ng mga segundo time\\_precision "1970-01-01T00:00:00Z". (para sa pabagu - bago at paatras na pagkakatulad) . Salamat sa Dominic Fuller-Rowell.
    *    EDDGrid Sinusuportahan ngayon ng mga FromNcFile ang pagbabasa ng String dataVariable s.
    *    .nc Ang mga file na isinulat ng griddap ay maaari na ngayong magkaroon ng String dataVariable s.
    * Mga GenerateDataset Kabilang ngayon sa Xml ang higit pang flush () upang maiwasan ang problema ng impormasyon na hindi nasusulat sa mga file. Salamat kay Thierry Valero.
    * Ang dokumentasyon para sa GenerateDatasetsXml ay napabuti, partikular na upang banggitin na ang -i switch ay gumagana lamang kung ang lahat ng sagot sa command line (e.g., script mode) . At ipinaliliwanag ang istilo ng pagsulat. Salamat kay Thierry Valero.
    *    ERDDAP™ ay hindi na nagpapahintulot sa dalawang variable sa isang dataset na magkaroon ng magkatulad na dataset sourceName . (Kung may gumawa nito noon, malamang na ito'y umakay sa maling mga mensahe.) Gaya ng dati, ERDDAP™ ay hindi nagpapahintulot sa dalawang bagay sa isang dataset na magkaroon ng magkatulad na impormasyon destinationName .

## Bersiyong 1.52{#version-152} 
 (inilabas noong 2014-10-03) 

*    **Bagong mga Katangian:**   (wala ni isa) 
*    **Maliliit na pagbabago/Bug Fixes:** 
    * Isa Pa (mas maliit) pagbabago upang gawin ERDDAP™ mas mabilis.
    * Paghusay sa ISO 19115 files na ginawa ng ERDDAP : idinagdag na bagong inirekomenda&lt;Mga pamantayan (impormasyon, paghahanap, OPeNDAP : OPeNDAP , ERDDAP : graddap, at ERDDAP : tabledap ) sa loob&lt;gmd:CI\\_OnlineResource&gt). Salamat kina Derrick Snowden at John Maurer.
    * Maraming maliliit na pagbabago.
*    **Mga Bagay ERDDAP™ Kailangang Malaman at Gawin ng mga Administrador:** 
    * Bugsual: GenerateDatasetsXml.sh at DasDds.sh ay hindi nasa erddap.war para sa 1.48 at 1.50. Ngayon ay gayon nga. Salamat kay Thierry Valero.
    * Ang maliliit na pagbabago sa ilang mga pagsubok ng bilis sa Test All upang gawin itong hindi gaanong makikipagsapalaran. Salamat kay Terry Rankine.

## Bersiyong 1.50{#version-150} 
 (inilabas noong 2014-09-06) 

*    **Bagong mga Katangian:**   (wala ni isa) 
*    **Maliliit na pagbabago/Bug Fixes:** 
    * Ito ERDDAP™ ay dapat na mas mabilis kaysa kamakailang mga bersiyon.
*    **Mga Bagay ERDDAP™ Kailangang Malaman at Gawin ng mga Administrador:**   (walang anuman) 

## Bersiyong 1.48{#version-148} 
 (inilabas noong 2014-09-04) 

*    **Bagong mga Katangian:** 
    *    ERDDAP™ ay laging lumilikha ng tabular dataset, datasetID = allDatasets , na may isang talaan ng impormasyon tungkol sa lahat ng datasets sa ito ERDDAP . Maaari itong i-queried tulad ng ibang tabular dataset. Ito ay isang kapaki-pakinabang na alternatibo sa kasalukuyang sistema sa pagkuha ng impormasyon tungkol sa datasets programmatly.
    * May dalawang bagong uri ng output file para sa EDDTable at EDDGrid , .csv0 at .tsv 0. Ang mga ito ay mga comma- at tab-expressd-halagang file na walang mga linya na may mga pangalan o yunit ng hanay. Nagsisimula ang datos sa unang linya. Ang mga ito ay lalo nang kapaki - pakinabang sa mga iskrip na nagnanais lamang ng isang piraso ng impormasyon mula sa ERDDAP .
*    **Maliliit na pagbabago/Bug Fixes:** 
    * Maaari na ngayong gawin ang mga mapa sa mga longhitud sa loob ng 720 hanggang 720.
    * Ang bago .nc Ang talaksan ng tugon ay makukuha ng lahat EDDGrid mga datos. Ibinalik nito ang [NCML](https://docs.unidata.ucar.edu/netcdf-java/current/userguide/ncml_overview.html) \\- format na paglalarawan sa dataset (katulad ng pinagsamang .dds + .) .
    * Paglutas ng Bug: Pagtitipid ng impormasyong tabular sa isang datos .nc Ang talaksan ay limitado sa 100,000 halaga sa bawat variable. Ngayon ito ay limitado lamang sa 2 GB kabuuang laki ng talaksan. Salamat kay Kevin O'Brien.
    * Pag - aayos ng Bug: ang pag - iipon Matlab Tinitiyak ngayon ng mga pamamaraan na datasetID ang ginagawang ligtas Matlab Iba't ibang pangalan. Subalit mariin ko pa ring inirerekomenda na lumikha kayo datasetID Mga tanggap na variable na pangalan: simula sa isang titik at pagkatapos ay gumagamit lamang ng A-Z, a-z, 0-9, at \\_. Tingnan [ datasetID ](/docs/server-admin/datasets#datasetid) . Salamat kay Luke Campbell.
    * Bug fix sa EDDTable FromDatabase: Sa ilang uri ng database, may NO\\_ Ang pagtugon ng DATA mula sa database ay humantong sa walang saysay na 30 segundong pagkaantala ERDDAP . Salamat kay Greg Williams.
    * Pag - aayos ng baka: EDDGrid Gumawa ng Graph na may Graph Type = mga linya (o mga pananda o mga pananda at mga linya) pwersahin ang x axis na iba-iba upang maging panahon. Ngayon ito ay maaaring maging anumang axis. Salamat kay Lynn DeWitt.
*    **Mga Bagay ERDDAP™ Kailangang Malaman at Gawin ng mga Administrador:** 
    * MAHABANG RECOMMENDE: Update Java   
Ang bersiyong ito ng ERDDAP™ kailangan Java 7 o mas mataas pa, ngunit Java 7 ay aabot sa dulo-of-life nito sa Abril 2015 (Malapit na&#33;) , kaya ngayon ay isang mabuting panahon upang bumaling Java Kaya 8. Java 8 ay SONGAL NA RECOMENDED. Sinubukan ko Java 8. Java 6 ay umabot sa dulong-of-life nito noong Pebrero 2013 (wala nang mga security bug fix&#33;) .
    * MAHABANG RECOMMENDE: Update Tomcat
Kung gagamitin mo ang Tomcat, pakisuyong bumaling sa pinakabagong bersiyon ng Tomcat. Ang Tomcat 8 ay dinisenyo upang gumawang kasama niya Java 8.
    * " ERDDAP " ay hindi na isang acronym. Ngayon ay isa na lamang itong pangalan. Ayaw kong itampok ang pangalan ERD . Gusto ko ERDDAP™ upang itampok ang iyong institusyon at ang iyong impormasyon.
    * PAKISUYONG PAKISUYO [Ibagay ang hitsura ng iyong hitsura ERDDAP™ installation upang itampok ang iyong institusyon at ang iyong impormasyon](/docs/server-admin/deploy-install#customize) . Sa isang oras na trabaho, makagagawa ka ng magagandang pagsulong na mananatili magpakailanman.
    * Sa setup.xml, ang&lt;Ang mapagpipiliang displayDiagnostic Info&gt; ay laging ipinagwawalang - bahala at tinatrato ngayon na para bang mali ang halaga.
RECOMMENDE: Alisin ang mga Ito&lt;displayDiagnostic Info&gt; tag at kaugnay na info mula sa iyong setup.xml.
    * Sa setup.xml, ang default para sa&lt; drawLandMask &gt; ay "over", ngunit ngayon ito ay "under", na mas mahusay na pangkalahatang default (mahusay sa lahat ng datasets) .
    * Ang GenerateDatasetsXml.sh at DadDds.sh Linux scripts ngayon ay gumagamit ng bash sa halip na csh, at may karugtong na .sh. Salamat kay Emilio Mayorga
    * Mga GenerateDataset Ang mga Xml at DasDd ngayon ay lumilikha ng kanilang sariling mga file na log (GenerateDatasetsXml.log at DasDds.log.) at output files (GenerateDatasetsXml.out at DadDds.out) sa _bigParent Direktory_/logs/, at hindi kailanman inilagay ang kanilang mga resulta sa clipboard.
    * Mga GenerateDataset Sinusuportahan ngayon ng Xml ang isang -i command line parameter na nagpapasok ng output sa espesipikong talaksan sa isang tiyak na lugar. Tingnan ang [Mga dokumento](/docs/server-admin/datasets#generatedatasetsxml) . Salamat kay Terry Rankine.
    * Ang EDDTable FromDatabase ngayon ay sumusuporta&lt;kolumnananameQuotes&gt;&lt;/columnNameQuotes&gt;, na may makatuwirang mga pamantayan " (ang default) , ' o wala. Ang karakter na ito (kung mayroon) ay gagamitin bago at pagkatapos ng mga pangalan ng kolum sa mga queries ng SQL. Ang iba't ibang uri ng database, na binuo sa iba't ibang paraan, ay mangangailangan ng iba't ibang kolum na pangalan ng quota.
    * Maaari na ngayong gawing kaugalian ang mga pagbabago sa latitud at longhitud long\\_name ' s, e.g., Profile Latude. Dati, ang mga ito ay maaari lamang maging Litwal at Katagalugan.
    * Mula ngayon, ang espesipikong "defaultDataQuery" at "defaultGraphQuery" bilang mga katangian sa global metadata (i.e., sa mga dataset).&lt;Addy Atts&gt;), hindi bilang hiwalay&lt;defaultDataQuery&gt; at&lt;Mga tag ng defaultGraphQuery&gt;. (Bagaman, kung itatakda mo pa rin ang mga ito sa pamamagitan ng mga tag, ERDDAP™ ay kusang lilikha ng pangglobong mga katangian taglay ang impormasyon.) 

## Bersiyong 1.46{#version-146} 
 (inilabas noong 2013-07-09) 

*    **Bagong mga Katangian:** 
    *    (Wala) 
*    **Maliliit na pagbabago/Bug Fixes:** 
    * Bug fix: Sa EDDTable FromDatabase, sa bersyon 1.44 lamang, ERDDAP™ Hindi wastong sinipi ang pangalan ng mesa ng database sa mga pangungusap ng SQL. Iyan ay itinakda na ngayon. Salamat kay Kevin O'Brien.
*    **Mga Bagay ERDDAP™ Kailangang Malaman at Gawin ng mga Administrador:** 
    *    ** Kung hindi mo babaguhin ang pamantayang mga mensahe sa mga mensahe.
tanggalin \\[ tomcat \\] /content/erddap/messages.xml . **   
Ang default na mensahe.xml file ay nasa erddap na ngayon. Wikang pandigma, hindi erddapCont .zip . Kaya, hindi mo na kailangan ang manu-manong update na mga mensahe.xml .
    * Kung babaguhin mo ang mga mensahe sa mga mensahe.xml, mula ngayon, tuwing maga - update ka ERDDAP™ , alinman sa:
        * Gawin ang gayunding mga pagbabago na ginawa mo bago ang bago
             \\[ tomcat \\] /webapps/erddap/WEB-INF/class/gov/noa/pfel/erddap/util/messages.xml.
At ito ang minsan: Alisin \\[ tomcat \\] /content/erddap/messages.xml .
        * O, alamin kung ano ang nagbago sa bagong mga mensahe. (sa pamamagitan ng diff) , at baguhin ang iyong
             \\[ tomcat \\] /content/erddap/messages.xml file alinsunod dito.

## Bersiyong 1.44{#version-144} 
 (inilabas noong 2013-05-30) 

*    **Bagong mga Katangian:** 
    * Queries to EDDTable datasets suportado ngayon & orderBy Min (...) at & orderByMinMax  (...)   (Na nagbabalik ng dalawang hanay sa bawat grupo, na may pinakakaunti at pinakamarami sa huli orderBy halaga) . Salamat kay Lynn DeWitt.
    * May dalawang bago tabledap Mga uri ng talaksan: .nc CFHeader at .nc CFMAHeader (na nagbabalik sa ncdump-tulad ng header ng katumbas .nc CF at .nc Mga uri ng talaksang CFMA) . Salamat kay Steve Hankin.
*    **Maliliit na pagbabago/Bug Fixes:** 
    * Bug fix: ang pagkarga ng .graph at .html web page para sa datasets na may maraming halaga ng panahon ay mabagal dahil sa ang maraming halaga ng panahon ay mabagal ERDDAP™ ay mabagal kapag gumagawa ng mapagpipiliang oras. Ngayon ito ay laging mabilis. Salamat kina Michael Barry, OOCI, at Kristian Sebastian Blalid.
    * Pag - aayos ng baka: Sa ilang uring EDDTable dataset, ang mga limitasyon sa oras ay hindi laging napangangasiwaan nang wasto. Ngayon ay gayon nga. Salamat kina John Maurer at Kevin O'Brien.
    * Paglutas ng Bug: ang datasets ay hindi magkakarga kapag lahat ng mga ito ay subsetVariables ay permanenteng mga pagbabago sa halaga. Ngayon ay gagawin nila ito. Salamat kina Lynn DeWitt at John Peterson.
    * IMPROVE: ngayon, lahat ng mga queries para sa mga subset variables ay kumikilos na parang & malabo () ay bahagi ng query.
    * IMPROVE: ngayon, para sa mga queries na kinabibilangan ng & .json p=_functionName_, _function Ang Name_UST ngayon ay isang seryeng 1 o higit pa (period-Nahahati) mga salita. Ang bawat salita ay dapat magsimula sa isang ISO 8859 na titik o "\\_" at susundan ng 0 o higit pang ISO 8859 na titik, digit, o "\\_". Oo, ito ay mas mahigpit kaysa Java Mga kahilingan ni Script para sa mga pangalan ng function.
    * Ang time axis sa mga graph ay gumagana na ngayon sa loob ng mas mahabang panahon (80 - 10000 taon) at mas maikling oras (0.003 - 180 segundo) .
    *    ERDDAP™ ay mas mapagpatawad ngayon kapag nagreresulta ng mga pagkakaiba-iba ng ISO-8601-format time data.
    * Marami pang ibang maliliit na pagbabago at mga bug fix.
*    **Mga Bagay ERDDAP™ Kailangang Malaman at Gawin ng mga Administrador:** 
    *    **You MUST update sa pinakabagong bersyon upang maging matatag.**   
         ERDDAP™ ay sumailalim sa isang audit ng seguridad. May ilang insekto at mga kahinaan. Ang Bersiyong 1.44 ay kinabibilangan ng ilang mahahalagang mga sekwensiya ng security bug at ilang mga pagbabago upang dagdagan ang seguridad at accessable (e.g., para sa may diperensiya sa paningin) . Bersyon 1.44 ang sumusunod na-up na security audit. Dahil sa lahat ng mabubuting tao sa USGS at Acunetix na naging posible ito. (Hindi dapat NOAA ang gumagawa nito?) 
    * Ang bago [Maaasahan Mula sa WFS Mga Boses](/docs/server-admin/datasets#eddtablefromwfsfiles) ay gumagawa ng lokal na kopya ng lahat ng impormasyon mula sa isang kopya ArcGIS Mapser WFS server at kaya ang data ay maaaring mabilis na i-serve ERDDAP™ ay gumagamit. Salamat kay Christy Caudill.
    * Ang bago [Maaasahan Mula sa EDDGrid ](/docs/server-admin/datasets#eddtablefromeddgrid) Nais mong lumikha ng isang EDDTable dataset mula sa isang EDDGrid datos. Ang ilang karaniwang dahilan sa paggawa nito ay:
        * Ito ay pumapayag sa dataset na i-queried sa OPeNDAP Mga Panggigipit sa Pagpili (na maaaring hiniling ng isang gumagamit) .
        * Ang dataset ay likas na isang tabular dataset. Salamat sa OOCI, Jim Potemra, Roy Mendelssohn.
    * Ang pabagu-bagong pangalan na "depth" ay isa na ngayong espesyal na alternatibo sa "alitude". Ang mga yunit ay dapat na iba-iba ng mga "metro". Ang mga halaga ng datos ay dapat positibo=down. ERDDAP™ ay ganap na alam na ngayon ang kahulugan ng "depth" at sinusuportahan ito kahit saan sinusuportahan ang taas (e.g., bilang isang bahagi ng CF DSG cdm\\_data\\_type=profile dataset) . Ang isang dataset ay hindi dapat magkaroon ng parehong "depth" at "altude" variables.
    * Sa iyong sarili datasets.xml , Mangyaring alisin ang anumang gamit ng&lt;Pangalang= "cdm\\_alitude\\_proxy"&gt;depth&lt;/att&gt; Yamang ang lalim ay isa na ngayong pantanging alternatibo sa altitud at sa gayo'y hindi na kailangan pang makilala.
    * Sa iyong sarili datasets.xml , Mangyaring alisin ang anumang gamit ng&lt;GrealMetersPerSourceUnit&gt;, maliban sa EDDTable Mula sa SOS .
Kapag ang halaga ay 1, alisin lamang ito.
Kapag ang halaga ay -1, isaalang - alang ang pagpapalit ng iba't ibang pangalan sa lalim.
Para sa ibang mga pamantayan, magdagdag&lt; addAttributes &gt; Halimbawa:
```
        <att name="scale\\_factor" type="float">-1</att>
```

    * Lahat ng datasets ngayon ay sumusuporta
        
        *   &lt;defaultDataQuery&gt; na ginagamit kung .html ay hinihiling na walang query.
            * Malamang na bihira mong gamitin ito.
            * Para sa mga griddap datasets, ang karaniwang gamit nito ay upang magtakda ng ibang default na lalim o taas na dimensiyonal na halaga (e.g., \\[ 0 \\] sa halip na \\[ huli \\] ) .
Sa paano man, dapat na lagi mong itala ang lahat ng mga variable, laging gamitin ang magkatulad na mga pagpapahalaga sa dimensiyon para sa lahat ng mga variable, at halos laging gamitin \\[ 0 \\] , \\[ huli \\] , o \\[ 0: Huli \\] para sa dimensiyong mga halaga.
Halimbawa:
```
                <defaultDataQuery>u\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\],v\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]</defaultDataQuery>
```

            * Sapagkat tabledap datasets, ang pinakakaraniwang gamit nito ay magtakda ng iba't ibang default time range (kamag-anak ngayon, e.g., &timegit;= now- 1 araw) .
Tandaan na ang hindi paghiling ng mga data variable ay katulad ng pagtiyak sa lahat ng iba't ibang impormasyon, kaya karaniwan nang maaari mo lamang tiyakin ang bagong limitasyon sa oras.
Halimbawa:
```
                <defaultDataQuery>&amp;time&gt;=now-1day</defaultDataQuery>
```

        *   &lt;defaultGraphQuery&gt; na ginagamit kung ang .graph ay hinihiling na walang query.
            * Malamang na bihira mong gamitin ito.
            * Para sa mga dataset na griddap, ang pinakakaraniwang gamit nito ay upang magtakda ng ibang default na lalim o taas na dimensiyonal na halaga (e.g., \\[ 0 \\] sa halip na \\[ huli \\] ) at/o magtakda na ang isang espesipikong variable ay i-grap.
Sa paano man, halos lagi mong magagamit \\[ 0 \\] , \\[ huli \\] , o \\[ 0: Huli \\] para sa dimensiyong mga halaga.
Halimbawa:
```
                <defaultGraphQuery>temp\\[last\\]\\[0\\]\\[0:last\\]\\[0:last\\]&amp;.draw=surface&amp;.vars=longitude|latitude|temp</defaultGraphQuery>
```

            * Sapagkat tabledap mga dataset, ang pinakakaraniwang gamit nito ay ang magtakda ng iba't ibang variable upang i-graped, isang iba't ibang default time range (kamag-anak ngayon, e.g., &timegit;= now- 1 araw) at/o iba't ibang default graphics settings (e.g., tipo ng titik) .
Halimbawa:
```
                <defaultGraphQuery>longitude,latitude,seaTemperature&amp;time&gt;=now-1day&amp;.marker=1|5</defaultGraphQuery>
```

Tandaan na kailangan mong XML-encode o porcent-encode (alinman sa dalawa, ngunit hindi kapuwa) ang default requeries mula nang ito ay nasa isang dokumento ng XML. Halimbawa, & be &amp;amp; ,&lt;maging &amp;lt; , at &gt; maging &ammp.g. .
At pakisuyong suriin ang iyong trabaho. Madaling magkamali at hindi makuha ang gusto mo.
Dahil kina Charles Carleton, Kevin O'Brien, Luke Campbell, at iba pa.
    *    EDDGrid Mula sa Dap, EDDGrid Mula sa Erddap, at Mula sa EDDTE EDDGrid may bagong sistema upang pakitunguhan ang mga dataset na madalas magbago (Kahit na halos tuwing 0.5 s) . Di - tulad ERDDAP 'regular, proactive system para sa ganap na muling pagkarga ng bawat dataset, ang opsyonal na karagdagang sistemang ito ay reactivity (udyok ng isang kahilingan ng gumagamit) at hindi makatuwiran (ang impormasyon na kailangang baguhin) . Halimbawa, kung ikaw ay humiling EDDGrid Mula sa Dap dataset ay nangyayari ng higit pa sa espesipikong bilang ng mga millisecond mula noong huling update, ERDDAP™ kung may anumang bagong pamantayan para sa kaliwa (karaniwang "time" ) Sapat at, kung gayon, basta i - download ang bagong mga pamantayang iyon bago pangasiwaan ang kahilingan ng gumagamit. Ang sistemang ito ay napakahusay upang panatilihin ang isang mabilis na nagbabagong dataset up-to-date na may kaunting mga pangangailangan sa data source, ngunit sa halaga ng bahagyang pagpapabagal sa pagpoproseso ng ilang mga kahilingan ng gumagamit. Tingnan [&lt;update EveryNMillis&gt;] (/docs/server-admin/datasets#update royllis)   
Salamat kina Michael Barry at OOICI.
    *    EDDGrid Sinusuportahan ngayon ng mga FromNcFile, EDDTable FromNcFile, at mga EDDTable FromNcCFpile [NcML .nc ml](/docs/server-admin/datasets#ncml-files) mga source file kapalit ng .nc mga file. Salamat kay Jose B Rodriguez Rueda.
    * Sapagkat EDDGrid Pag-aalsa ng Aggregate, ERDDAP™ ay sumusuporta sa isang bagong serType="dodsindex" opsiyon para sa serverType attribute ng server&lt; sourceUrl tag ng&gt;. Ito ay gumagana sa mga web page na may listahan ng mga file sa loob&lt;pre&gt;&lt;/pre&gt; at kadalasan sa ilalim ng isang OPeNDAP logo. Ang isang halimbawa ay [ https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html ](https://opendap.jpl.nasa.gov/opendap/GeodeticsGravity/tellus/L3/mascon/RL06/JPL/v02/CRI/netcdf/contents.html) .
    * Para sa mga Madaling Tablan SOS sumusuporta ngayon sa opsyonal na tag
```  
        <sosServerType>_serverType_</sosServerType>  
```
para matiyak ang uri ng SOS server (gayo'y ERDDAP™ hindi kailangang malaman ito) . Makatuwirang mga pamantayan&lt;_sertrType_\\THTgt; is IOOS\\_NDBC, IOOS\\_NOS, OOSTethys , at WHOI (bagong suportadong server Uri) . Tingnan [Maaasahan Mula sa SOS ](/docs/server-admin/datasets#eddtablefromsos) . Salamat kina Derrick Snowden at Janet Fredericks.
    * Lahat EDDGrid Mula sa...Files, EDDTable Mula sa...Files, EDDGrid Kopya, at Kapani - paniwala Sinusuportahan ngayon ng kopya ang isang opsyonal na tag
```
        <fileTableInMemory>true</fileTableInMemory> (The default is false.)  
```
na makapagsasabi ERDDAP™ upang itago ang talaksan Talaan (na may impormasyon tungkol sa bawat source data file) sa memorya sa halip na sa disk lamang (ang default) . Ang pagpapanatili sa fileTable sa memory ay nagpapabilis sa mga kahilingan para sa datos (lalo na kung may &gt;1000 source data files) , ngunit gumagamit ng mas maraming memorya. Kung gagawin mo ito sa anumang dataset, tingnan ang Alaala: kasalukuyang gumagamit ng linya sa _YouDouin_ /erddap/status.html upang tiyakin iyan ERDDAP™ ay marami pang libreng memorya. Salamat kay Fredrik Stray.
    * Ang EDDTable FromASCIFiles ay sumusuporta ngayon&lt;I-charset&gt;. Ang dalawang pinakakaraniwang charsets (na sensitibo&#33;) ay ISO-8859-1 (ang default) at UTF-8.
    * Inirerekomenda: sa setup.xml, sa loob&lt;Sinimulan ang HEadHtml&gt;, pakisuyong magbago&lt;html&gt; sa loob
        &lt;html lang= "en-US"&gt; (o kakaiba [kodigo ng wika](https://www.w3schools.com/tags/ref_language_codes.asp) kung ikaw ay nagsalin ng mga mensahe.) .
    * Ang setup.xml ay may bagong opsyonal na mga tag upang sirain ang mga bahagi ng katawan ERDDAP :
        *   &lt;Pag - aayos&gt; Mali&lt;/ ConvertersActive&gt;&lt;&#33;- ang default ay totoo-&gt;
        *   &lt;Padulas na "Sorteractive&gt; Mali&lt;/slideSorteractive&gt;&lt;&#33;- ang default ay totoo-&gt;
        *   &lt;Huwad na "WmsActing&gt; "&lt;/wmsActive&gt;&lt;&#33;-- ang default ay totoo-&gt; Sa pangkalahatan, inirerekomenda namin laban sa pag-aalsa ng alinman sa mga ito.
    * Mga GenerateDataset Si Xml ngayon ay sumusulat ng mga resulta sa _bigParent Direktory_/logs/generateDatasetsXmlLog.txt, hindi log.txt. Salamat kay Kristian Sebastian Blalid.
    * Mga GenerateDataset Si Xml ngayon ay gumagawa ng mabuting mungkahi para sa&lt;reload EveryNMinutes&gt;. Salamat sa NOAA project ng UAF.
    * Maraming maliliit na pagpapabuti sa GenerateDatasetsXml. Salamat sa NOAA project ng UAF.

## Bersiyong 1.42{#version-142} 
 (inilabas noong 2012-11-26) 

*    **Bagong mga Katangian:** 
    *    (Walang mga pangunahing bagong katangian.) 
*    **Mga Bagay ERDDAP™ Kailangang Malaman at Gawin ng mga Administrador:** 
    * Kung ikaw ay lumalayo ERDDAP™ 1.38 o 1.40, walang mga pagbabago na humihiling sa iyo na gumawa ng mga pagbabago sa iyong mga salansan ng pagsasaayos (ngunit kailangang gamitin mo ang bagong mga mensahe.xml file) .
    *    ERDDAP™ Minsan pa ay maaaring tumakbo na kasama ng Java 1.6. ( ERDDAP™ Kailangan ang v1.40 Java 1.7.) Mahigpit pa rin naming inirerekomenda ang paggamit ng pinakabagong bersiyon ng Java 1.7.
    * Isang bagong dataset type, [Maaasahan Mula sa Mga HawsXmlFile](/docs/server-admin/datasets#eddtablefromawsxmlfiles) , mababasa ang impormasyon mula sa isang set ng Automatic Weather Station (MGA AW) XML data files. Salamat kay Lynn Dewitt at sa Explorerium.
*    **Maliliit na pagbabago/Bug Fixes:** 
    * Nakabagay sa mga pagbabago sa NDBC SOS source data servers.
    * Nakabagay sa mga pagbabago sa mga serbisyo ng NOS COOPS ASCII.
    * Gumawa ng ilang maliliit na pagbabago at mga bug fix.

## Bersiyong 1.40{#version-140} 
 (inilabas noong 2012-10-25) 

*    **Bagong mga Katangian:** 
    * May bagong format ng output file para sa tabledap mga datos: .nc CFMA, na nagliligtas sa hiniling na impormasyon sa isang .nc talaksan na naaayon sa CF [Mga Sampling Geometriya](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Multidimensional Array mapagpipilian, at samakatuwid ay naaayon sa mga template ng NODC \\[ 2021: ngayon ang [Mga template ng NCEI](https://www.ncei.noaa.gov/netcdf-templates)  \\] para sa pag-iimbak ng ganitong uri ng datos. Salamat sa NEDC.
    *    tabledap Maaari na ngayong isama sa mga kahilingan ang mga limitasyon sa panahon na gaya ng &time&gt; now- 5 araw. Tingnan ang [Mga dokumento](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#now) . Salamat kay James Gosling.
*    **Mga Bagay ERDDAP™ Kailangang Malaman at Gawin ng mga Administrador:** 
    * Kung ikaw ay lumalayo ERDDAP™ 1.38, walang mga pagbabago na humihiling sa iyo na gumawa ng mga pagbabago sa iyong mga salansan ng pagsasaayos (ngunit kailangang gamitin mo ang bagong mga mensahe.xml file) .
    *    ERDDAP™ May makukuhang mga pahayag pangmadla at internasyunal na mga pangyayari sa pamamagitan ng [ ERDDAP™ tungkol sa GitHub](https://github.com/ERDDAP) . Para sa higit pang impormasyon, tingnan ang [Wiki](https://github.com/ERDDAP/erddap/wiki) para sa ERDDAP™ proyekto gayundin ang mas pangkalahatan [ ERDDAP™ Patnubay ng Programmer](/docs/contributing/programmer-guide) . (Ito ay inihayag nang hiwalay ilang linggo pagkatapos ng ERDDAP™ 1.38 paglaya.) 
    * Mga GenerateDataset Ang Xml ay napabuti.
        * Ang iskrip ay nirebisa upang gumana ito nang wasto sa lahat ng Linux computer (hindi lamang ang ilan) .
        * Idinagdag pa nito ngayon creator\\_name , creator\\_email , at creator\\_url kailanma't maaari.
        * Marami pang maliliit na pagsulong.
    * Pagdalisay Kung Paano ERDDAP™ tungkol sa panahon.
        * Panloob, ERDDAP™ ay humahawak ngayon ng mga panahon sa millisecond eksaktung - eksakto (hindi mga segundo) .
        * Maaari mo na ngayong tiyakin ang eksaktong oras para sa ibinigay na dataset, tingnan [ time\\_precision ](/docs/server-admin/datasets#time_precision) . Halimbawa, maaari kang magtakda ng dataset upang ipakita ang mga halaga ng oras nang may eksaktong petsa (e.g., 1970-01-01) .
        * Ang inyong kasalukuyang datasets ay gagamit ng default settings, kaya ang mga ito ay hindi apektado ng mga pagbabagong ito at patuloy na magpapakita ng oras na may prekwensiya ng segundo. Dahil sa Servet Cizmeli at Philip Goldstein.
    *    [Mga EDDTable Mula sa mga Labag](/docs/server-admin/datasets#eddtablefromnccffiles) ay isang bagong dataset na uri na magagamit mo sa iyong datasets.xml talaksan. Maaari nitong basahin ang datos mula sa alinman sa maraming format ng talaksan na binigyang - kahulugan ng [CF Mga Sampling Geometriya](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) Mga kombensiyon. Dahil sa NDC at espesyal na pasasalamat kay Kyle Wilcox dahil sa paggawa ng mga sampol na files para sa malaking bilang ng mga tanggap na DSG file formats at sa paggawa nito sa publiko.
*    **Maliliit na pagbabago/Bug Fixes:** 
    * Pinalawak ang [Mabilis Maulit](#quick-restart) sistema sa lahat ng nauugnay EDDGrid at EDDTable subclass.
    * Pinahusay na mga dokumento, lalo na may kaugnayan sa kung paano gagamitin [" griddap "](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#fileType) at [ tabledap ](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#fileType) mula sa iba't ibang client software.
    * Nagbagong advanced na paghahanap upang suportahan ang mga monTime at/o maxTime na ipinahayag bilang epochSeconds. Salamat kay Lynn Dewitt.
    * Nagbago .htmlTable output upang ipakita ang mga url at email address bilang links.
    * Magdagdag ng "rel=" at "rev=" upang mag-uugnay&lt;isang href&gt; tags. Salamat kay Pat Cappelaere mula sa OGC   REST proyekto.
    * Pinahusay na proteksiyon laban sa di - makatotohanang malalaking kahilingan ng datos, lalo na sa loob tabledap , kung saan ito ay mas mahirap na problema.
    * Naglipat pa ng mga mensahe.xml.
    * Gumawa ng mga pagsulong sa bilis.
    * Nakatakda EDDGrid Mula saFiles upang pahintulutan ang pababang inuuring palakol. Salamat kay Maricel Etchegaray.
    * Tinanggal ang mga pagtukoy sa iGoogle dahil ito ay ihihinto.
    * Gumawa ng ilang maliliit na pagbabago at mga bug fix.

## Bersiyong 1.38{#version-138} 
 (inilabas noong 2012-04-21) 

*    **Bagong mga Katangian:** 
    * ISO 19115 at FGDC -- ERDDAP™ ay maaaring awtomatikong lumikha ng ISO 19115 at FGDC XML metadata files para sa bawat dataset. Ang mga kawing sa mga file ay makikita sa bawat listahan ng mga dataset (e.g., mula sa Full Text Search) at Gayundin sa Web Accessable Folders (WAF)   (tingnan ang [FGDC WAF](https://coastwatch.pfeg.noaa.gov/erddap/metadata/fgdc/xml/) at [ISO 19115 WAF](https://coastwatch.pfeg.noaa.gov/erddap/metadata/iso19115/xml/) ) . Salamat kay Ted Habermann, Dave Neufeld, at marami pang iba.
    * Buong Text Searches for Datasets ay sumusuporta ngayon sa \\-_ excludedWord _ at \\-"_excluded  phrase_" . Salamat sa Mayamang Signell.
    * Ang paghahanap ng mga datasets ngayon ay nagbabalik ng resulta sa isang pahina sa isang panahon. Ang default ay gumagamit ng string ng parameter: pahina=1&guitemsPerPAge=1000, ngunit mababago mo ang mga halaga sa URL ng iyong kahilingan. Dahil kay Steve Hankin at sa proyektong UAF.
    *    OpenSearch -- ERDDAP™ sumusuporta ngayon [ OpenSearch 1.1](https://coastwatch.pfeg.noaa.gov/erddap/opensearch1.1/index.html) pamantayan sa paghahanap ng datos. Bukod sa iba pang mga bagay, ito'y nagpapangyari sa katalogo na gumawa ng mga talaan ng mga pananaliksik (pagpapasa ng isang kahilingan sa paghahanap sa bawat katalogo na nalalaman nito) .
    * Hiwalay ang Comma Halaga (CSV) Mga talaksan -- ERDDAP™ ay gumagawa ngayon ng CSV files na may isang komma lamang sa pagitan ng mga halaga (na mas gusto ng Excel) , sa halip na comma+space. Salamat kay Jeff deLaBeaujardiere.
    * Milyong mga Data -- Gumawa ng ilang pagbabago upang sumuporta ERDDAP na may napakaraming datasets, marahil isang milyon pa nga. Dahil kay Steve Hankin at sa proyektong UAF.
*    **Mga Bagay ERDDAP™ Kailangang Malaman at Gawin ng mga Administrador:** 
#### Mabilis na Pagre - restart{#quick-restart} 
*    [A](#quick-restart) Ang mabilis na sistema ng pagre - restart ay nagpapahintulot ERDDAP™ upang mas mabilis na makipag - usap.
     **Pakisuyong idagdag ito sa inyong setup.xml file** Pagkatapos ng ilang sandali&lt;/datasetsRegex&gt;:
```
              <!-- If true, when you start up ERDDAP™, some types of datasets (e.g., 
              EDDGridFromDap) will used cached information (.dds, .das, etc.) to reload
              very quickly, without contacting the remote server.  The dataset's age 
              will be based on when the dataset was reloaded last.  Normally this 
              should be true (the default), but set it to false if you want to bypass 
              the cached information.
              <quickRestart>true</quickRestart>
```

    * Ang kumpletong paghahanap ng teksto para sa datasets ay maaari na ngayong gawin sa Lucene search engine (Bagaman inirerekomenda namin ang orihinal na search engine kung mayroon kang wala pang 10,000 datasets) o ang orihinal na sistema ng paghahanap.
         **Pakisuyong idagdag ito sa inyong setup.xml file** Pagkatapos ng ilang sandali&lt;/displayDiagnostic Info&gt;:
```
              <!-- ERDDAP™ lets you choose between two search engines for full text searches:
              \\* original (the default) -- is the best choice if your ERDDAP™ has fewer 
                than about 10,000 datasets.  It is very robust and trouble free. 
              \\* lucene -- is the best choice for more than about 10,000 datasets.
                The advantages are that with any number of datasets it works fast 
                and uses very little memory.
                But there are many things that might go wrong with individual 
                queries and with the whole system. 
                And although its behaviour (the datasets it finds and the order that
                it ranks them) is almost identical to the original search engine,
                it has a few quirky, subtle, small differences.
              -->
              <searchEngine>original</searchEngine>
```

    * Sa setup.xml, ikaw ay maaari/dapat ngayon magdagdag ng dalawang bagong kategorya sa comma-weaded list ng comma-weadd&lt; categoryAttributes &gt;:
        * Pambuong - mundo: Mga kasabihan sakey (idagdag ito karaka - raka pagkatapos ng pangglobo: ang pagtatanim) - isang bagong espesyal na kaso na nag-parse ng isang comma-hiwalay na listahan ng mga keywords mula sa global keywords na attribute upang gumawa ng hiwalay na pagpasok para sa bawat keyword.
        * Iba - iba Pangalan (idagdag sa dulo) - isang bagong espesyal na kaso na bumubuo sa bawat isa dataVariable   destinationName s.
    * Sa setup.xml, maaari kang (ngunit bakit?) mukha ERDDAP™ hindi mag-aalok ng FGDC at/o ISO 19115 metadata para sa anumang dataset sa pamamagitan ng paglalakip
```
        <fgdcActive>false</fgdcActive>  
        <iso19115Active>false</iso19115Active>
```

Totoo ang default na mga pamantayan para sa mga setting na ito.
    * Nasa datasets.xml , pakisuyong isaalang - alang ang pagpapabuti ng metadata para sa iyong datasets. ERDDAP™ ngayon ay awtomatikong gumagawa ng ISO 19115 at FGDC XML metadata files para sa bawat dataset batay sa metadata ng dataset.
Kaya, **maganda ang resulta ng mahusay na dataset metadata ERDDAP - Hinango ISO 19115 at FGDC metadata.**   
         **Tingnan ang bagong dokumento para sa maraming bagong RECOMEND [Pangglobong mga Attribo](/docs/server-admin/datasets#global-attributes) .** 
    * Nasa datasets.xml , kung gusto mong sabihin ERDDAP™ upang gumamit ng pre-made FGDC at/o ISO 19115 file na nasa lugar sa sistemang file ng server sa halip na magkaroon ng ERDDAP™ ng mga file na ito, gamitin ang:
```
        <fgdcFile>_fullFileName_</fgdcFile>  
        <iso19115File>_fullFileName_</iso19115File>
```
Kung _fullFileName_\\=" o ang file ay hindi matatagpuan, ang dataset ay hindi magkakaroon ng FGDC at/o ISO 19115 metadata. Kaya kapaki-pakinabang din ito kung nais mong sugpuin ang FGDC at/o ISO 19115 metadata para sa isang espesipikong dataset.
    * Nasa datasets.xml , para sa lahat EDDGrid Side Byside at side EDDGrid AggregateExing Dimension datasets, tiyakin na ang mga dataset ng bata ay may iba't ibang datos datasetID s kaysa kanilang magulang datasets at kaysa sa ibang mga bata. (Halimbawa, maaari mong sundin ang simple ngunit mabisang sistema ni George Foreman sa pagpapangalan sa kaniyang mga anak.) Kung ang anumang pangalan sa isang pamilya ay parehong - pareho, ang dataset ay hindi magkakarga (sa maling mensahe na ang mga pamantayan ng aggregadong axis ay hindi inuuri) .
    * Nasa datasets.xml , nagkaroon ng ilang mga pagbabago sa talaan ng tama ioos\\_category Mga pamantayang metadata:
        * Ang "pCO2" ay binago sa "CO2".
        * "Physical Oceanography" ay idinagdag.
        * Idinagdag ang "Soils".
    * Nasa datasets.xml , ERDDAP™ hindi na ipinahihintulot '.' sa loob ng isang datasetID . Pinahintulutan ito ngunit nasiraan ng loob. (Ikinalulungkot Ko) 
    * Nasa datasets.xml , ang setup para sa EDDTTable FromThreddsFiles at EDDTTable Mula sa Hyrax Ang mga talaksan ay bahagyang nagbago dahil ang dalawang klase ay kasusulat lamang upang maging mas mahusay (sa tuwina'y gumagawa ang dalawang klase ng lokal na kopya ng lahat ng remote data files) . Tingnan ang dokumento sa pagtatatag ng mga klaseng ito: [Maaasahan Mula sa Hyrax Mga Boses](/docs/server-admin/datasets#eddtablefromhyraxfiles) at [Nakapagtuturong mga Talento](/docs/server-admin/datasets#eddtablefromthreddsfiles) . Tingnan lalo na ang nirebisang mga komento tungkol sa&lt;fileDir&gt; (walang kaugnayan ngayon) at&lt; sourceUrl &gt; (mahalaga ngayon) . Gayundin, hindi mo dapat ibalot ang klaseng ito sa EDDTableCopy para sa kahusayan.
    * Nasa datasets.xml , kung gagamitin mo ang EDDTable FromDatabase na may kasamang isang EDDTable Oracle database, may koneksyon Mga ari - arian na gaya ng
```
        <connectionProperty name="defaultRowPrefetch">4096</connectionProperty>  
```
upang tiyakin kung ilang hanay ng impormasyon ang makukuha sa isang panahon sapagkat ang default ay 10, na lubhang hindi mabisa. Tingnan ang [ Oracle Mga dokumento](https://docs.oracle.com/cd/B10501_01/java.920/a96654/basic.htm) . Ang MySql at PostgresQL ay tila may mas mabuting mga default para sa ganitong tagpo. Salamat kay Kevin O'Brien.
    * Kung gumagamit ka ng EDDTable FromDatabase, tingnan ang pinahusay ["Speed" dokumentasyon](/docs/server-admin/datasets#eddtablefromdatabase) para sa karagdagang mga mungkahi upang mapasulong ang paggawa. Salamat kay Kevin O'Brien.
    * Nasa datasets.xml , para sa lahat ng mga EDDTable... datasets, sa mga Kombensiyon at sa Metadata\\_Conventions Mga katangiang pangglobo, pakisuyong tumukoy sa CF-1.6 (hindi CF-1.0, 1.1, 1.2, 1.3, 1.4, o 1.5) , dahil ang CF-1.6 ang unang bersyon na kinabibilangan ng mga pagbabagong may kaugnayan sa Discrete Sampling Geometry.
    * Mga Programme na nagtitipon ng mga ito ERDDAP™ Kailangang idagdag ng code ang lib/lucene-core.jar sa talaan ng mga talaksan ng banga sa kanilang mga landas ng javac at juva command line.
    *    ERDDAP™ ay may a [bagong paglilingkod](https://coastwatch.pfeg.noaa.gov/erddap/convert/keywords.html) upang gawing/mula sa isang GCMD Science Keyword ang isang CF Standard Name. Masusumpungan mong kapaki - pakinabang ito kapag gumagawa ka ng pangglobong keywords metadata para sa mga dataset sa iyong mga dataset ERDDAP .
    * Pakikitungo sa mga Bot -- Pakisuyong basahin ang payong ito [hadlangan ang paggapang ng mga bot ERDDAP™ sa paraang hangal](/docs/server-admin/additional-information#robotstxt) .
    * Salin -- Ang teksto sa ERDDAP Karamihan sa mga web page ngayon ay nasa mga mensahe.xml at angkop na angkop para isalin sa iba't ibang wika (e.g., Aleman, Pranses) . Ang mga mensahe ngayon ay kadalasang gumagamit ng MessageFormat para sa formatting, upang makatulong din sa paggawa ng mga salin. Kung interesado kang magsalin, pakisuyong mag - email erd dot data at noaa dot gov .
    * Sample datasets.xml -- May ilang maliliit ngunit malalaking pagkakamali sa sampol datasets.xml . Kung gagamitin mo ang mga dataset na iyon, pakisuyong kunin ang mas bagong mga bersiyon mula sa bagong sampol datasets.xml sa bagong erddapCont .zip talaksan. Salamat kay James Wilkinson.
    * Git -- Sisikapin kong mabuti na gawin ERDDAP™ isang proyektong GitHub na ASAP pagkatapos ng pagpapalabas na ito.
*    **Maliliit na pagbabago/Bug Fixes:** 
    * Ang isang bagong paleta, ang OceanDepth, ay kapaki - pakinabang para sa malalalim na pamantayan (ay bigo) , e.g., 0 (mababaw) hanggang 8000 (malalim) .
    * Ang .kml output mula tabledap gumagamit ng mas mahusay na marker icon (hindi ito malabo) . At ang pag - aali - aligid sa isang marker ay gumagawa ngayon na mas malaki.
    * Nakasusuyang mga Latian -- Sa huling upgrade, ang bagong aklatan ng netcdf-java ay nagkaroon ng mas mahigpit na mga paghihigpit para sa iba't ibang pangalan sa .nc mga file. Na nagdulot ng mga problema sa EDDTable FromFiles kung ang isang variable's sourceName ay may ilang tauhan sa bantas. Ang EDDTable FromFiles ay binabago na ngayon upang maiwasan ang problemang iyan. Salamat kay Thomas Holcomb.
    * Ang .subset na pahina ngayon ay sumusuporta 0/10/100/1000/10000/1000000000 sa halip ng isang kahon ng tseke para sa Related Data. Ang dulo ng kagamitan ay nagbababala na 100000 ang maaaring maging sanhi ng pagbagsak ng iyong browser. Salamat kay Annette DesRochers, Richard (Aba) Coughlin, at ang IOS Biological Project.
    * .../erddap/info/_ datasetID _/index.html web page ay nagpapakita ngayon ng mga url at email address bilang mga matrikula na link. Salamat kay Richard (Aba) Coughlin at ang IOS Biological Project.
    * Pag - aayos ng Bug: Sa tabledap , para sa datos na may altitud MetersPerSourceUnti&lt;0, mali ang pangangasiwa sa mga queries na may mga limitasyon sa altitud. Salamat kay Kyle Wilcox.
    * Pag - aayos ng baka: EDDGrid Ang Aggregate FromExisting Dimension ay sumusuporta ngayon sa mas magkakaibang mga TDS URL. Salamat sa ?

## Bersiyong 1.36{#version-136} 
 (inilabas noong 2011-08-01) 

*    **Bagong mga Katangian:** 
    * Walang malaking pagbabago sa pangmalas ng gumagamit.
*    **Mga Bagay ERDDAP™ Kailangang Malaman at Gawin ng mga Administrador:** 
    * Ang pmeltao dataset na kadalasang ginagamit bilang sampol na dataset para sa tabledap   
Wala nang makukuhang dokumento. ERDDAP™ ANG mga administrador ay gumagawa ng ganitong mga pagbabago:
        * Sa iyong sarili datasets.xml , kung mayroon kang a datasetID = "pmelTao" dataset, idagdag
aktibo="mali" sa mismong harap ng "&gt;" sa dulo ng linyang iyon.
        * Sa iyong setup.xml, kung ang iyong setup&lt;EDDTable IdExample&gt; ay pmeltao, pagkatapos:
            * Kung ikaw ay datasets.xml walang dataset datasetID = "erdGlobecBottle", idagdag
```
                <dataset type="EDDTableFromErddap" datasetID="erdGlobecBottle" active="true">  
                  <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGlobecBottle</sourceUrl>  
                </dataset>
```
            * Sa iyong setup.xml, palitan ang lahat ng tag mula sa&lt;EDDTable IdExample&gt; sa pamamagitan ng
                &lt;Mapagkakatiwalaan Matlab PlotExample&gt; kasama
```
                <!-- Tabledap Examples
                This group of settings is used to make examples for the tabledap documentation 
                that appears at \\[baseUrl\\]/erddap/tabledap/documentation.html and elsewhere.
                If you include the erdGlobecBottle dataset in your datasets.xml (recommended), 
                you don't need to change these.
                If you don't, you MUST change these before you make your ERDDAP™ public; 
                otherwise, none of the examples will work!
                The new settings should be very similar to the defaults.
                If your ERDDAP™ won't serve any tabular datasets, use "NOT\\_APPLICABLE" for all of the entities.
                In .xml files like this, ampersand, lessThan, and greaterThan have to be 
                HTML encoded as "&amp;", "&lt;", "&gt;".
                -->
                <!-- This is the datasetID for an EDDTable dataset that is served by your ERDDAP.
                     This dataset is used as the basis for all of the EDDGrid examples below. 
                     Ideally, it is a dataset that has longitude, latitude, and time variables (among others). 
                     ('time' allows for making a time series graph. 'latitude' and 'longitude' allow for making a map.)
                     The dataset can have longitude values -180 to 180, or 0 to 360. -->
                <EDDTableIdExample>erdGlobecBottle</EDDTableIdExample>
                <!-- This is a comma-separated list of variables from the dataset.
                     It is useful if it is "longitude,latitude,time," plus a data variable name. -->
                <EDDTableVariablesExample>longitude,latitude,time,bottle\\_posn,temperature1</EDDTableVariablesExample>
                <!-- This is the constraints example which is appended to EDDTableVariablesExample. -->
                <EDDTableConstraintsExample>&amp;time&gt;=2002-08-17T00:00:00Z&amp;time&lt;=2002-08-19T20:18:00Z</EDDTableConstraintsExample>
                <!-- This is an example data query using an ISO-formatted time. 
                     You could generate your example via your dataset's Data Access Form in ERDDAP.  -->
                <EDDTableDataTimeExample>longitude,latitude,time,bottle\\_posn,temperature1&amp;time&gt;=2002-08-17T00:00:00Z&amp;time&lt;=2002-08-19T20:18:00Z</EDDTableDataTimeExample>
                <!-- This is an equivalent example data query, but which specifies time as seconds-since-1970-01-01. 
                     If you need to convert a date/time to "seconds since 1970-01-01", use
                     https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html -->
                <EDDTableDataValueExample>longitude,latitude,time,bottle\\_posn,temperature1&amp;time&gt;=1029542400&amp;time&lt;=1029788280</EDDTableDataValueExample>
                <!-- This is an example query which generates a graph. 
                     You could generate your example via your dataset's Make A Graph form in ERDDAP.  -->
                <EDDTableGraphExample>bottle\\_posn,temperature1&amp;time=2002-08-19T10:06:00Z&amp;.draw=lines</EDDTableGraphExample>
                <!-- This is an example query which generates a map. 
                     In the default mapExample, temperature1, time, bottle\\_posn are useful 
                     because they appear in GoogleEarth with the .kml example 
                     and are ignored by the other image file types. -->
                <EDDTableMapExample>longitude,latitude,temperature1,time,bottle\\_posn&amp;time&gt;=2002-08-13T00:00:00Z&amp;time&lt;=2002-08-20T00:00:00Z&amp;bottle\\_posn=1&amp;.draw=markers&amp;.marker=5|5</EDDTableMapExample>
                <!-- This is a Matlab example which uses data from the EDDTableGraphExample.
                     Note the Matlab notation datasetName.variableName.  -->
                <EDDTableMatlabPlotExample>plot(erdGlobecBottle.bottle\\_posn, erdGlobecBottle.temperature1)</EDDTableMatlabPlotExample>
```
                
    * Para sa mga dataset kung saan ang tipo ay isang subclass ng EDDTable FromFiles, maaari ka na ngayong gumawa ng datos mula sa metadata.
Ang totoo, maaari ka na ngayong gumawa ng pagbabago mula sa mga pamantayan ng isang katangian ng isa sa orihinal na mga variables.
Halimbawa, sa datasets.xml , sa loob ng isang&lt; dataVariable &gt; tag, kung gagamitin mo
```
        <sourceName>variable:cruise:PI</sourceName>  
```
         ERDDAP™ ay gagawa ng pagbabago sa mga halaga ng PI attribute ng cruise variable.
Salamat sa WOD.
*    **Mga pagbabago:** 
    * Maliliit na pagbabago

## Bersiyong 1.34{#version-134} 
 (inilabas noong 2011-06-15) 

*    **Mga pagbabago:** 
    * Pag - aayos ng baka: Naglagay ng butas sa memorya na nangyari sa mga 64-bit Java mga instalasyon.
    * Pag - aayos ng baka: ERDDAP™ ay wastong nagtatakda ng pangglobong mga katangiang ito kapag ang mga halaga ng latitud ay mula sa itaas hanggang sa mababa: geospatial\\_lat\\_min, geospatial\\_lat\\_max, Southern endemy\\_Northing, Northernmost\\_Northing.
        
Pansinin na actual\\_range ay hindi nagbabago: ito ay maaaring may mababa, mataas na halaga o mataas, mababang halaga, yamang ito ay nilayon upang ipakita ang saklaw at ang pagkakasunud - sunod ng pag - iimbak.
        
    * Maliliit na pagbabago.
    *    ERDDAP™ Ang mga administrador ay hindi kailangang gumawa ng anumang pagbabago sa kanilang setup.xml o datasets.xml .

## Bersiyong 1.32{#version-132} 
 (inilabas noong 2011-05-20) 

*    **Mga pagbabago:** 
    * Tulong para sa bagong pinagtibay, ang CF Discrete Sampling Geometries (na sa kasamaang palad ay hindi pa makukuha online) , na pumapalit sa iminungkahing CF Point Observation Conventions.
         ERDDAP™ makikita ng mga gumagamit na ang cdm\\_feature\\_type=Station ay pinapalitan ng TimeSeries at may maliliit na pagbabago sa mga file na nilikha para sa .nc Uri ng CF (Ang flat\\_dimension ay tinatawag na ngayong sampol\\_dimension) .
         ERDDAP™ Kailangang gawin ng mga administrador ang mga pagbabagong ito datasets.xml :
        * cdm\\_data\\_type= Ang estasyon ay dapat baguhin sa cdm\\_data\\_type=TimeSeries.
        * cdm\\_data\\_type=StationProfile ay dapat baguhin sa cdm\\_data\\_type=TimeseriesProfile.
        * ang cdm\\_station\\_variables ay dapat palitan sa cdm\\_timeseries\\_variables.
        * f_role=station\\_id ay dapat palitan sa cf\\_role=timeseries\\_id.
    * Bago ioos\\_category Mga pagpipilian: "Koored Dissolved Organic Matter", "pCO2", "Stream Sweak", "Total Sutong Matter".
    * Posibleng solusyon sa posibleng tulo ng memorya sa 64-bit Java . \\[ Hindi ito gumana. \\] 
    * Maliliit na pagbabago.

## Bersiyong 1.30{#version-130} 
 (inilabas noong 2011-04-29) 

*    **Bagong mga Katangian:** 
    * Suporta sa 64-bit Java . Kapag ginamit na may 64 bit Java , ERDDAP™ ay maaari na ngayong gumamit ng mas maraming nakabuntong memorya at pangasiwaan ang mas maraming sabay - sabay na mga kahilingan.
    * Tulong .nc Hinihiling ng talaksan hanggang 2GB (nang walang 64-bit Java ) sa pamamagitan ng mas mainam na paggamit ERDDAP 'Ang paghawak ng mga datos sa mga tipak.
    * Maraming 2X na mga pagpapabuti ng bilis sa code at 2X speeds mula sa Java 1.6 ang laki ERDDAP™ 2X hanggang 4X na mas mabilis kaysa dati.
    * Lubhang mas mababa ang mga pagsulong sa memorya ERDDAP 'saligang paggamit ng memorya.
    * Para sa taskular datasets, ERDDAP™ ay ganap na nababatid ngayon ang cdm\\_data\\_type ng isang dataset, at kung paano ang mga mapa ng data sa tipo ng CDM. Tingnan ang [CF Espesipikong Pagpapakahulugan sa Sampling Geometries](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) . Marahil balang araw, ang Word file na iyon ay gagawing .html at papalitan ang kasalukuyang "OBSOLE" na impormasyon sa web page na iyon. Salamat sa NOAA project ng UAF.
    * Para sa karamihan ng EDDTable datasets, isang bagong output file type option, .nc CF, lumikha ng Di - kanais - nais na Array .nc mga talaksan na naaayon sa pinakabagong bersyon ng [CF Mga Kombensiyon ng Sampling Geometries](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries) . Ang mga file na ito ay binuo upang isalamin ang CDM data type ng dataset. Yamang ang iminungkahing mga kombensiyon ay nagbago lamang, kung tungkol sa pagsulat na ito, ang aklatan ng netcdf-java ay hindi pa sumusuporta sa pagbasa ng mga format ng file na nilikha ng ERDDAP at pinapakahulugan ang mga ito bilang CDM data files. Malamang na malapit na. Salamat sa NOAA project ng UAF.
    * Ang View : Distinct Data opsyon sa .subset web page ay isa na ngayong drop-down list na pumapayag sa mga gumagamit na magtakda ng pinakamaraming hanay ng mga natatanging datos na titingnan (default = 1000) . Ang pagbabagong ito, at iba pa, ay nagpapahintulot ERDDAP™ sa paggawa ng mga dataset na may napakaraming hanay ng magkakaibang impormasyon. (Ang bilang ng natatanging mga pamantayan para sa anumang isang bagay na nagkakaiba - iba ay isa pa ring isyu, subalit ito'y maaaring napakataas (20,000?) bago ang .subset at iba pang mga web page ay talagang dahan-dahan.) Salamat sa NOAA project ng UAF.
    * May bagong opsyon ang mga web page: Tingnan ang Distinct Data Counts. Salamat sa proyektong GTOPP.
    * Upang tulungan ang mga gumagamit, ang natatanging mga pamantayan (e.g., pangalan ng istasyon) ay ipinapakita ngayon sa Make-A-Graph at Data Access Forms. Salamat sa NOAA project ng UAF.
    * .transparent Ang mga kahilingan ngayon ng Png ay sumusuporta sa lahat ng uri ng mga grap at mga representasyon ng datos. Kinuha lamang nito ang datos - walang palakol, alamat, landmak, o anupaman. Ginagawa nitong posible ang paggawa ng mga imahe bilang mga patong ng mga naaaninag na PPng. If &. -=_width_ | Ang _ight_ ay tinukoy sa query (mungkahi) , ito ay pinararangalan. Ang default ay 360x360 pixels. Ang tanging eksepsiyon ay EDDGrid &.draw=surface, kung saan ang default (gaya ng dati) ay isang larawan na may ~1/pixel sa bawat punto ng datos (hanggang 3000 x at y pixels) . Salamat kay Fred Hochstaedter.
    * Ang WMS Ipinakikita ngayon ng mga pahinang web ang kulay na bar para sa variable ng dataset (s) . Salamat kay Emilio Mayorga at sa iba pa.
*    **Mga Bagay ERDDAP™ Kailangang Malaman at Gawin ng mga Administrador:** 
    * Ang paglalabas na ito ay nagsasangkot ng maraming pagbabago. Ang mga ito ay pawang mahalaga. Pakisuyong maging matiyaga at gumawa sa lahat ng pagbabago na nakatala sa ibaba.
    * Ang bersiyong ito ay inilalabas nang mas maaga kaysa nilayon upang pakitunguhan ang ilan Java Mga insektong panseguridad. Sa kasamaang palad, ilang katangian/fix na nilayon para dito ERDDAP™ Wala sa bersyong ito. Ikinalulungkot ko. Sana ang susunod na bersiyon ay malapit na (at mas madaling mag-upgrade) .
    * Upang maiwasan ang ilang security bug Java 6 update 23 at ibaba, download at i-install ang pinakabagong bersyon ng Java   ( Java 6 update 24 o mas mataas) . Kung mayroon kang 64-bit operating system, pakisuyong kumuha ng 64-bit na bersyon ng Java .
    * Kung ginagamit mo ang Tomcat 5, upgrade mo ang Tomcat 6 o 7 (mas gusto) . Kung ginagamit mo ang Tomcat 6, isaalang - alang ang pag - upgrade sa bersiyong Tomcat 7.
    * Pakisuyong sundin ang lahat ng tagubilin para sa [Pagtatatag ng isang bagong ERDDAP™ ](/docs/server-admin/deploy-install) , subalit kung may kaugnayan dito, ikaw ay magkokopya ng mga file mula sa iyong lumang instalasyon tungo sa bagong instalasyon, lalo na ang \\[ tomcat \\] /content/erdap directory at files. Bilang bahagi nito, pansinin ang [bagong mga rekomendasyon ng Tomcat](/docs/server-admin/deploy-install#tomcat) .
    * Ang default erddap.cs ay kasama na ngayon sa erddap.war file.
        * Upang magamit ang default erddap.cs, **tanggalin** iyong lumang \\[ tomcat \\] /content/erddap/images/erddap.cs .
        * Kung ikaw ay nagbago \\[ tomcat \\] /content/erddap/images/erddap.cs, at nais na patuloy na gamitin ito: iwan na lamang ito sa lugar at palitan ang mga ito&lt;bahaging input&gt; na may:
```
            /\\* Small input items let more be shown on one screen  
            (esp. Chrome and Safari). Google Chrome and Safari have  
            default margin 2px, while others are 0. This sets all to 0.  
            .skinny is used e.g., for the buttons above the image on  
            a Make A Graph page. \\*/  
            input\\[type=button\\], input\\[type=submit\\], button {  
              margin:0px; padding:0px 3px; }  
            input\\[type=checkbox\\], input\\[type=password\\],  
              input\\[type=text\\], select, textarea {  
              margin:0px; padding:0px; }  
            input\\[type=radio\\] {margin:0px 2px; padding:0px; }  
            input.skinny {padding:0px 1px; }
```

    * Sa iyong sarili \\[ tomcat \\] /content/erddap/setup.xml:
        * Palitan ang mga komento at tag na may kaugnayan sa&lt;bahaging RequestMax Bytes&gt; at&lt;bahaging RequestMaxCells&gt; kasama
```
            <!-- When possible (and it isn't always possible),  
            ERDDAP™ breaks source data requests into chunks to  
            conserve memory. See the description of these tags in  
            messages.xml. You can override the default chunk sizes  
            here with  
            For grids:  
             <partialRequestMaxBytes>100000000</partialRequestMaxBytes>  
            For tables:  
             <partialRequestMaxCells>100000</partialRequestMaxCells>  
            \\-->
```
        * Palitan ang mga komentong may kaugnayan sa&lt; categoryAttributes &gt; at isaalang - alang ang pagbabago sa halaga ng tag:
```
            <!-- This is the comma-separated list (recommended:  
            in alphabetical order) of the global attribute and  
            variable attribute names which will be used to  
            categorize the datasets and shown to clients at urls  
            like .../erddap/categorize/ioos\\_category/index.html  
            (ioos\\_category is unusual, but is used at ERD).  
            If an attribute is a global attribute, identify it by  
            prefixing it with "global:".  
            \\-->  
            <categoryAttributes>global:institution, ioos\\_category,  
            long\\_name, standard\\_name</categoryAttributes>  
```

Isahan&lt; categoryAttributes &gt; na pangglobong mga katangian na ngayo'y MUST ay makikilala sa pamamagitan ng unlaping pangglobo: (e.g., global:institution) . Ang iba pang mga katangian ay ipinalalagay na iba't ibang katangian (e.g., standard\\_name ) . Gayundin, ang mga pamantayan ng institusyon (ang tanging mga) ay naiwan sa orihinal na kaso. Ngayon ang lahat ng mga halaga ng kategorya ay ginagawang mas mababang sukat.
    * Sa iyong sarili \\[ tomcat \\] /content/erdap/ datasets.xml :
        * Big IMPROVE: ERDDAP™ ay may bagong mga kahilingan na may kaugnayan sa cdm ng taskular dataset na\\_data\\_type. Kapansin - pansin, ang bawat dataset na MUST ay may tamang metadata at mga variable na nauugnay sa cdm\\_data\\_type. Kung hindi, ang dataset ay hindi magkakarga at maghahagis ng pagkakamali. Tingnan ang dokumentasyon para sa [cdm\\_data\\_type](/docs/server-admin/datasets#cdm_data_type) .
        * FYI: May bagong dataset type: EDDTable FromAsciiServiceNOS.
        * FYI: May tatlong bagong pinapayagan ioos\\_category Option: Hydrolohiya, Katangian (e.g., para sa de - kalidad na mga bandila) , at Estadistika (e.g., ibig sabihin) .
        * Para sa May Katatagan Mula sa... Mga talaksang datos, alisin ang anuman&lt;Mga tagong&gt;. Hindi na kailangan o ginagamit ang mga ito.
        * Sari - sari destinationName Paglalarawan, ERDDAP™ hindi na ang puwersa long\\_name maging makatuwiran. Pakisuyong suriin ang inyong datasets.xml at paulit - ulit na paghahanap&lt; destinationName &gt;alture at magdagdag sa variable na iyon&lt; addAttributes &gt;:
```
              <att name="long\\_name">Altitude</att>  
```
             (o bahagyang naiiba long\\_name sa pantanging mga kaso) .
        * Optional: Lahat ng EDDTable FromFiles subclass ay sumusuporta sa variable [ sourceName = Pananakop:...](/docs/server-admin/datasets#global-sourcenames) upang baguhin ang pangglobong metadata mula sa bawat file tungo sa isang data variable. Salamat kay Lynn DeWitt.
    * EDDTable Mula sa mga gumagamit ngDatabase -- ERDDAP™ kasama ang isang bagong drayber ng JDBC 4 para sa Postgres. Para sa ibang database, tingnan ang web para sa pinakabagong JDBC .jar file para sa iyong database. Mula Noon ERDDAP™ ginagamit ngayon Java 1.6+, JDBC 4 (hindi 3) marahil ay inirerekomenda.
    * FYI
        *    EDDGrid Mula sa... mga Latian at Kagustuhan Mula sa... Ang mga talaksang datasets ay nag - iimbak ngayon ng impormasyon na maaaring makuha
             \\[ Malaking Direktorya \\] /dataset Info/ \\[  datasetID  \\] /\\* .nc mga file.
Gayundin, ang EDDTable datasets ay nag - iimbak ngayon ng subset na impormasyon
             \\[ Malaking Direktorya \\] /dataset Info/ \\[  datasetID  \\] /\\* .nc mga file. Dating mga talaksang ito
             \\[ Malaking Direktorya \\] /dataset Info/ \\[  datasetID  \\] .\\* .json mga file.
Ang lumang mga file ay awtomatikong aalisin kapag ERDDAP™ magsimula. O, maaari mong alisin ang lahat ng files (ngunit iwan ang walang laman na mga subdirectory) sa loob \\[ Malaking Direktorya \\] /dataset Info/.
        * Nagtrabaho ako sa isang bagong EDDTable FromNcCFFililes na magbabasa ng mga datos mula sa lokal at malayong mga files gamit ang iminungkahi, bagong CF Point Observation Conventions. Subalit wala ito sa labas na ito. May mga problema sa mga aklatan ng netcdf-java na may kaugnayan sa ilang mga pamamaraan sa pagbasa ng mga file na ito. At kamakailan lamang ay nagkaroon ng ilang pagbabago sa iminungkahing CF Point Observation Conventions. Kapag ang aklatan ng netcdf-java ay nakapirme na at binago sa pinakabagong panukala, muli kong gagawin ito.
        * Pagtakbo ERDDAP™ sa Windows ay maaaring may mga problema: lalo na, maaaring makita mo sa Windows \\[ Malaking Direktory/log/log.txt file na ERDDAP™ kung minsan ay hindi agad matanggal ang mga talaksang delete at/o magkaroon ng maling pangalan. Ito ay dahil sa antivirus software (e.g., mula sa McAfee at Norton) na sumusuri sa mga file para sa mga virus. Kung mapaharap ka sa problemang ito (na makikita sa pamamagitan ng mga maling mensahe sa log.txt file tulad ng "Unable sa delete ...") , ang pagbabago sa settings ng antivirus software ay maaaring bahagyang maibsan ang problema.
Kung gayon ERDDAP™ sa Windows ay isa lamang pagsubok na tumatakbo sa iyong desktop, ito ay isa lamang pagkayamot.
Kung gayon ERDDAP™ sa Windows ang iyong publiko ERDDAP™ , isaalang - alang ang paglipat sa isang Linux server.
    * Mabagal na Unang Simula -- Sa unang pagkakataon na tumakbo ka ERDDAP™ pag-upgrade, ERDDAP™ ay maaaring mabagal sa pagkarga ng datasets. Ang daan ERDDAP™ nag - iimbak ng impormasyon tungkol sa mga talaksang aggregated, kaya't nagbago ERDDAP™ ay kakailanganing muling basahin ang ilang info mula sa lahat ng mga file na iyon. Iyan ay mangangailangan ng panahon.
    * Mga Pagkakamali sa Simula -- Kung isasaalang - alang ang mga pagbabagong may kaugnayan sa cdm\\_data\\_type, malamang na ang ilan sa iyong mga dataset ay hindi magkakarga at maghahagis ng mga pagkakamali. Maingat na basahin ang Daily Report email na iyon ERDDAP™ ipadala sa iyo kapag ERDDAP™ ay tapos nang magsimula. Magkakaroon ito ng listahan ng mga datos na hindi nakarga (sa itaas) at ang dahilan kung bakit hindi sila nagkarga (malapit sa ibaba) .
    * Kung maipit ka o magkaroon ng iba pang mga tanong, i - e - mail sa akin ang mga detalye: erd.data at noaa.gov .
    * Mga Programme -- Kung magsusulat ka Java mga programa na tumatakbo ERDDAP™ code:
        * Palitan ang joda-time-1.6.2.jar hanggang joda-time. banga
        * Palitan ang Postgres JDBC .jar ng reperensiyang postgresql.jdbc.jar.
*    **Maliliit na Pagbabago at mga Finto ng Bug:** 
    
    * Pinahusay na mga koneksiyon na humahawak upang maiwasan ang nakabiting mga sinulid.
    * Mas mahusay na mga gawain ng pagsang - ayon upang mas mabisang pangasiwaan ang halos sabay - sabay na magkaparehong kahilingan.
    *    ERDDAP™ ngayon ay gumagamit ng netcdf All-4.2.jar. (Ipinangalan sa netcdf All-latest. banga) . Ang switch na ito ay nangailangan ng ilang panloob na pagbabago at naging sanhi ng ilang maliliit na pagbabago sa labas, e.g., mga pagbabago sa kung paano binabasa ang mga talaksan ng grib at maliliit na pagbabago sa mga pagbabago .nc Ang header output.
    * Bagong pitak: \\[ erddap \\] /convert/fipscounty.html na mga kumberte FIPS Mga kodigo ng county hanggang/mula sa mga pangalan ng county.
    * Sa mga mapa, ang mga hangganan ng estado ngayon ay matingkad na lila, kaya ang mga ito ay mas litaw sa lahat ng mga kulay sa likuran.
    * Tablar .kml Ang output ay muling gumagamit ng bilog na icon upang markahan ang mga puntos (hindi ang larawan ng eroplano Ang Google ay bumaling kamakailan sa) .
    * Ang mga dataset ng erdCalcofi ay binago at ngayon ay inihahain mula sa lokal na mga file (mas mabilis) .
    * Mga GenerateDataset Xml mula sa Mga Panday Ang Catalog ngayon ay lumilikha ng isang talaksan ng resulta:
         \\[ tomcat \\] /webapps/erddap/WEB-INF/temp/ EDDGrid Mula saThredsCatalog.xml . Salamat kay Kevin O'Brien.
    * Mga GenerateDataset Xml mula sa Mga Panday Sinisikap ngayon ng Catalog na alisin ang di - kinakailangang numero ng port mula sa pinagmumulang URLs (e.g., :8080 at :8081 kung minsan ay maaaring alisin) . Salamat NOAA Ang koponang panseguridad sa gitna.
    * Para sa mga web page na .subset, ang Mapa ng Distinct Data ngayon ay may variable lat lon range.
    * Ilang listahan ERDDAP™   (e.g., ang mesa na nagpapakita ng lahat ng datasets) ay ibinukod upang ang A.Z ay ibukod sa harap ng a. .z . Ngayon sila ay nag-uuri sa isang case-insensitive paraan.
    * Ang mga maliliit na pagbabago sa .subset web page, kabilang ang: mga yunit ay ipinapakita ngayon.
    * Mga GenerateDataset Ang mga Xml at DasDd ay hindi na nagreresulta kung hindi maglalagay ng mga resulta sa system clipboard o display InBrowser. Salamat kina Eric Bridger at Greg Williams.
    * Pag - aayos ng baka: Kapag may laman na datos, ERDDAP™ ay nag - aalis o nag - aayos ngayon ng mga katangian ng daigdig. Salamat kay Charles Carleton.
    * Pagayos ng Bug: String2.getClassPath () ngayon ay wastong porsiyento-decodes ang klase Landas (Lalo na, sa Windows, ang mga espasyo sa pangalan ay lumabas bilang %20) . Naapektuhan ito ERDDAP™ EDstatic na tumatawag sa SSR.getContext Direktory () at paghahanap ng nilalaman/erddap. Salamat kay Abe Coughlin.
    * Paglutas ng Bug: sa EDDTable FromFiles na may kaugnayan sa GetDataForDapQuery na may natatanging pangangasiwa () tanong. Salamat kay Eric Bridger.
    * Pag - aayos ng baka: tabledap Ang mga kahilingan ay hindi wastong humahawak ng mga limitasyon sa altitud kapag ang taas ng dataset Ang MetersPerSourceUnit ay -1. Salamat kay Eric Bridger.
    * Pag - aayos ng Bug: Mapagkakatiwalaan Mula sa... Mga datos ng talaksan na ngayon ay tama nang hawakan ang mga kahilingan na kinabibilangan ng =NaN at &#33;=NaN.
    
## Bersiyong 1.28{#version-128} 
 (inilabas noong 2010-08-27) 

*    **Bagong mga Katangian:** wala.
*    **Mga Bagay ERDDAP™ Kailangang Malaman at Gawin ng mga Administrador:** wala.
*    **Bog Fix:** Magtakda ng pagkakamali sa programming (sa ver 1.26 lamang) na ginawa ERDDAP™ Napakamabagal.
     

## Bersiyong 1.26{#version-126} 
 (inilabas noong 2010-08-25) 

*    **Bagong mga Katangian:** wala.
*    **Mga Bagay ERDDAP™ Kailangang Malaman at Gawin ng mga Administrador:** 
    * Mula sa iyong sarili \\[ tomcat \\] /content/erddap/setup.xml,
        * Nasa&lt;legal&gt;, sa bagong linya sa ibaba \\[ Pamantayan Mga Talento \\] , ipasok \\[ Pamantayang Kontrata \\] . \\[ Pamantayang Kontrata \\] tumutukoy sa&lt;adminEmail&gt; na mas mataas sa setup.xml.
        * Alisin&lt;PlateCommonBGCoror&gt; at&lt;mesa HighlightBGCOR&gt;.
        * Iminumungkahi: Pagbabago&lt;duloBodyHtml&gt; to
```
            <endBodyHtml><!\\[CDATA\\[  
            <br>&nbsp;  
            <hr>  
            ERDDAP, Version &erddapVersion;  
            <br><a href="&erddapUrl;/legal.html">Disclaimers</a> |  
            <a href="&erddapUrl;/legal.html#privacyPolicy">Privacy Policy</a> |  
            <a href="&erddapUrl;/legal.html#contact">Contact</a>  
            </body>  
            \\]\\]></endBodyHtml>
```

    * Kailangan: Sa iyong sarili \\[ tomcat \\] /content/erddap/images/erddap.cs at erddapAlt.cs, idagdag sa ibaba:
```
        /\\* This is used on the /info/\\[datasetID\\]/index.html pages to highlight a row or cell. \\*/  
        tr.highlightBGColor {background-color:#cceecc; }  
        td.highlightBGColor {background-color:#cceecc; }
```
*    **Mga Bug Fix at Maliliit na Pagbabago:** 
    
    * Bug fix: Sa ilang mga sitwasyon, ang mga anyo ay hindi gumagana sa ilang mga bersyon ng Internet Explorer. Maraming salamat kay Greg Williams.
    * Pag - aayos ng baka: Ang Make A Graph buton ay hindi gumagana kung ang dataset ay mula sa malayo ERDDAP .
    * Pag - aayos ng baka: WMS Kung minsan ay hindi gumagana kung ang dataset ay mula sa malayo ERDDAP .
    * Maraming maliliit na pagbabago at bug fix.
    

## Bersiyong 1.24{#version-124} 
 (inilabas noong 2010-08-06) 

*    **Bagong mga Katangian:** 
    * Bago [Ilagay ang web pahina](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/index.html) ay gumagamit ng mukhaang paghahanap upang pumili ng mga subset ng tabular datasets. Salamat sa POST.
    * Bago [Patiunang Paghahanap](https://coastwatch.pfeg.noaa.gov/erddap/search/advanced.html) Pinagsasama - sama ang lahat ng iba pang mapagpipilian sa paghahanap at dinaragdagan ng longhitud, latitud, at mga kahon sa paglalagay ng panahon. Salamat kay Ellyn Montgomery. (Ikinalulungkot ang pagkaantala.) 
    * Bago [Panahon ng Pagkumberte](https://coastwatch.pfeg.noaa.gov/erddap/convert/time.html) web page at serbisyo ay hayaan mong makomberte mo ang mga numerong panahon tungo/mula sa ISO string times.
    * Bago [Mga Unit ng Komberti](https://coastwatch.pfeg.noaa.gov/erddap/convert/units.html) web page at serbisyo ay magpakumberte sa iyo UDUNITS hanggang/mula sa mga yunit ng UCUM. Salamat NOAA MGA IOO SOS .
    * Kung mayroon tabledap kasama ang &units ("UCUM") , ang mga pangalan ng yunit ay babaguhin mula sa orihinal na mga pangalan (karaniwang UDUNITS ) hanggang sa [UCUM](https://unitsofmeasure.org/ucum.html) pangalan. Apektado lamang nito ang mga yunit\\*Mga pangalan\\*, hindi ang data values. Salamat NOAA MGA IOO SOS .
    * Mga Pagpapasulong sa Paggawa ng A Graph web page at mga graph at mapa:
        * Kung ang graph ay isang mapa, may mga bagong Make A Graph buton upang mag-ebolb sa/out at isang bagong opsiyon upang baguhin ang gitnang punto ng mapa. Salamat sa POST.
        * Nagdagdag ang mga ilter setting malapit sa ilalim. Salamat kay Greg Williams.
        * Ang itinayo sa mga file ng datos sa baybayin ay ini-apruba sa GSHS v2.0. Salamat sa POST.
        * Kabilang na ngayon sa mga mapa ang mga lawa at ilog. Salamat sa POST. (Nakalulungkot, nawawala ang Sacramento River Delta dahil hindi ito tinatalakay ng mga impormasyon sa baybayin ni ng lawa/ilog dataset.) 
        * Ang mga itinayo sa mga pscoast-derived na mga county/state files ay inaapruba. Salamat sa POST.
        * Ang Topography.cpt ay bahagyang binago. (Ikinalulungkot mo kung ito'y may masamang epekto sa iyo.) Salamat sa POST.
        * Sa Make A Graph ng griddap, kung ang gumagamit ay magbagong - anyo, ang anyo ay awtomatikong naililipat upang ang axisVariable s' showStart And Stop laging sumasalamin sa mga graph variables. Salamat kay Joaquin Trinanes.
        * Para sa mga pong at pdf image na URL:
            * New &.land=_halaga___, kung saan ang _45_ ay maaaring "under" (ipakita ang topograpiya) o "over" (magpaligo lamang) . Kung hindi tiyak, ang default ay nakatakda [ drawLandMask ](/docs/server-admin/datasets#global-drawlandmask) sa loob datasets.xml o setup.xml. Salamat sa POST.
            * Bago: mga guhit sa alamat na napakahaba ay awtomatikong nahahati sa maraming linya. Salamat sa POST.
        * Para sa larawang pang-URLs:
            * New &.legend=_halaga_, kung saan ang _45_ ay maaaring maging "Bottom". (default) , "Off" o "Tangi lamang". Ito'y nagpapangyari sa iyo na isama ang alamat, ipuwera ang alamat, o kumuha lamang ng alamat. Salamat kay Cara Wilson.
            * Bagong &.trim=_n Ang mga Pixels_ ay nag-iiwan ng hangganan ng mga nPixel (e.g., 10) sa ibaba ng larawan. Ito ay nilalapat pagkatapos ng .legend=Off. Salamat kay Cara Wilson.
            * Bagong &.ize=_width_ | _Hight_ ay hinahayaang itukoy mo ang lapad at taas para sa imahen, sa pixels.
    * Bagong mga format ng output:
        * .csvp at .tsv p - tulad ng .csv at .tsv , ngunit kasama " (_Talaksan ang_) " Inilakip sa mga pangalan ng tudling sa unang linya.
        * .odvTxt - gumagawa ng talaksang .txt na nagreresulta sa pagkuha ng datos sa .txt [Ocean Data Pangmalas (ODV) ](https://odv.awi.de/) .
        * .esriCsv - ginagawa ang isang .csv file na angkop para sa pag-angkat sa ESRI's ArcGIS . (Mga pakete ng datos lamang) Salamat kay Jan Mason, Jeff de La Beaujardie, at NOAA MGA IOO SOS proyekto.
    * Paghusay ng GUI sa mga [Kategorya](https://coastwatch.pfeg.noaa.gov/erddap/categorize/index.html) web pahina. Gayundin, ang mga pamantayang moral (maliban sa institusyon) ay pawang mababa na ngayon. Tinatanggap ang mga kahilingan ng non-lowercase (Muling Binago) para sa patalikod. Salamat kay Roy Mendelssohn.
    * Ang mga mensahe ng pagkakamali ay mas maikli at mas nakatuon ngayon sa mga gumagamit. Salamat kay Greg Williams.
    * Isang panloob na pagbabago na lubhang nakababawas ERDDAP 'saligang paggamit ng memorya.
    * Maraming mga bagong katangian na may kaugnayan lamang sa proyektong POST.
*    **Mga Bagay ERDDAP™ Kailangang Malaman at Gawin ng mga Administrador:** Maraming pagbabago. Ikinalulungkot ko. Subalit ang bawat isa ay nagdudulot ng ilang mabubuting pakinabang.
    * Malalaking pagbabago sa GenerateDatasettXml - ito ngayon ay kadalasang nagbabangon ng higit pang mga katanungan (tingnan ang kaugnay [datos Mga Uri](/docs/server-admin/datasets#detailed-descriptions-of-dataset-types) impormasyon) at ngayon ay laging gumagawa ng talagang handa-to-use na nilalaman para sa datasets.xml . Ikaw pa rin ang may pananagutan sa setup, kaya dapat mong repasuhin ang setup datasets.xml bago gamitin ito. Ang pagsisikap ng isang tao sa proyekto ay laging mas mabuti kaysa isang programa sa computer. Salamat sa proyektong UAF.
    * REREURILE: Sa setup.xml, dapat mong baguhin ang kalagayan WMS seksiyon. Dapat na kasali rito ngayon ang mga tag na ito (ngunit malayang magbago ng mga pamantayan) :
```
        <!-- These default accessConstraints, fees, and keywords are used 
        by the SOS, WCS, and WMS services.
        They can be overridden by "accessConstraints", "fees", "keywords" 
        attributes in a dataset's global metadata.
        If a dataset that has an "accessibleTo" tag doesn't override 
        "accessConstraints", then the default for "accessConstraints" is the
        "accessRequiresAuthorization" value.  
        -->
        <accessConstraints>NONE</accessConstraints>
        <accessRequiresAuthorization>only accessible to authorized
        users</accessRequiresAuthorization>
        <fees>NONE</fees>
        <keywords>Earth science, oceans</keywords> 
        
        <!-- This appears on the erddap/legal.html web page after the 
        General Disclaimer. 
        You can replace any of the \\[standardParts\\] with your own HTML. -->
        <legal><!\\[CDATA\\[
        \\[standardDisclaimerOfEndorsement\\]
        \\[standardDisclaimerOfExternalLinks\\]
        \\[standardPrivacyPolicy\\]
        \\[standardDataLicenses\\]
        \\]\\]></legal>
        
        <!-- Specify the default units standard (e.g., "UDUNITS" 
        (the default) or "UCUM") that you (the ERDDAP™ admin) are using to 
        specify units.  The value is case-sensitive.
        This is used by ERDDAP's SOS server to determine if the units need to
        be converted to UCUM units for WMS and SOS GetCapabilities responses. 
        -->
        <units\\_standard>UDUNITS</units\\_standard>
        
        <!-- For the wms examples, pick one of your grid datasets that has
        longitude and latitude axes.
        The sample variable must be a variable in the sample grid dataset.
        The bounding box values are minx,miny,maxx,maxy.
        -->
        <wmsSampleDatasetID>erdBAssta5day</wmsSampleDatasetID>
        <wmsSampleVariable>sst</wmsSampleVariable>
        <!-- The bounding box values are 
           minLongitude,minLatitude,maxLongitude,maxLatitude.
           Longitude values within -180 to 180, or 0 to 360, are now okay. -->
        <wmsSampleBBox>0,-75,360,75</wmsSampleBBox>
```

    * REREUREPINS: Sa setup.xml, kopyahin at ihalo ang bagong mungkahing ito&lt;Mag-umpisangHtml&gt; upang palitan ang iyong lumang bersyon. Subalit huwag mag - atubiling gumawa ng mga pagbabago para sa iyong mga kagustuhan.
```
        <!-- startHeadHtml has the start of the HTML document and the 
        'head' tags (starting at "<!DOCTYPE>", but not including 
        "</head>") for all HTML web pages. 
        This may include &erddapUrl;, which is expanded to be 
          \\[baseUrl\\]/erddap (or \\[baseUttpsUrl\\]/erddap if the user is logged in).
        If your ERDDAP™ allows users to log in, all referenced image files, 
          css files, etc. must be in \\[tomcat\\]/content/erddap/images or a 
          subdirectory and must be referenced here with 
          &erddapUrl;/images/\\[fileName\\].
        
        favicon.ico is the image that browsers associate with your website.
        For more information, see https://en.wikipedia.org/wiki/Favicon .
        You can use your own favicon.ico file by putting it in 
          \\[tomcat\\]/content/erddap/images. 
        
        \\*\\*\\* Optional: you can change the appearance of all of your 
        ERDDAP's HTML pages by changing the CSS <style> settings below.
        
        For an example of a very different style, change the import reference
        to <tomcat>/content/erddap/images/erddapAlt.css
        
        \\*\\*\\* If your CSS style includes links to files (e.g., images), that 
        style information must be inline in the style tag below, after the
        'import' line, not in the .css file.  
        Put all of the (e.g., image) files in the 
        \\[tomcat\\]/content/erddap/images directory (or a subdirectory) and 
        reference them below starting with &erddapUrl;.
        Why? On ERDDAP™ https: web pages, \\*all\\* links should use "https:" 
        (not "http:"); otherwise, most browsers consider the web page not 
        fully secure.  Because ERDDAP™ would use the same .css file for 
        http: and https: web pages, the links within the .css file wouldn't 
        switch between http: and https:.  There doesn't seem to be a way 
        around this other than using inline style information.
        -->
        <startHeadHtml><!\\[CDATA\\[ 
        <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
          "http://www.w3.org/TR/html4/loose.dtd">
        <html>
        <head>
        <title>ERDDAP</title>
        <link rel="shortcut icon" href="&erddapUrl;/images/favicon.ico">
        <style type="text/css">
        <!--
          @import "&erddapUrl;/images/erddap.css";
        -->
        </style>
        \\]\\]></startHeadHtml>
        
        <!-- The tableCommonBGColor MUST be the same color as the 
           table.commonBGColor in erddap.css above. Suggested is #f1ecd8. 
           But if you use erddapAlt.css, change this to #e7dec5. -->
        <tableCommonBGColor>#f1ecd8</tableCommonBGColor>
        
        <!-- This is used, e.g., for the type=variable rows on the metadata
          info tables. -->
        <tableHighlightBGColor>#cceecc</tableHighlightBGColor>
```

Salamat sa POST, Hans Vedo, at Rick Blair.
    * REREUSTIN: Sa setup.xml, sa&lt;SimulaBodyHtml&gt;, palitan ang&lt;body&gt; tag na maging makatarungan&lt;body&gt;, dahil ang istilo ay itinakda na ngayon ng erddap.cs.
    * REREURILE: Sa setup.xml, baguhin ito&lt;duloBodyHtml&gt; (pero palitan ang adres ng email at maging malayang gumawa ng iba pang pagbabago) :
```
        <!-- The end of the body of the HTML code for all HTML web pages
          (with "</body>" at the end). 
        This may include &erddapUrl;, which is expanded to be 
          \\[baseUrl\\]/erddap (or \\[baseUttpsUrl\\]/erddap if the user is logged in).
        If your ERDDAP™ allows users to log in, all referenced image files, etc. 
          must be in \\[tomcat\\]/content/erddap/images or a subdirectory
          and must be referenced here with &erddapUrl;/images/\\[fileName\\].
        
        You can change this, but please keep "ERDDAP, Version &erddapVersion;"
        and these references to the Disclaimers and Privacy Policy. -->
        <endBodyHtml><!\\[CDATA\\[ 
        <br>&nbsp;
        <hr>
        ERDDAP, Version &erddapVersion;
        <br><font class="subduedColor">Questions, comments, 
          suggestions?  Please send an email to 
          <tt>erd dot data at noaa dot gov</tt>
        <br>and include the ERDDAP™ URL directly related to your question
          or comment.
        <br>
          <a href="&erddapUrl;/legal.html">Disclaimers</a> | 
          <a href="&erddapUrl;/legal.html#privacyPolicy">Privacy 
            Policy</a>
        </font>
        </body>
        \\]\\]></endBodyHtml>
```

    * MAHABANG RECOMMENDE: Sa setup.xml, ang inirerekomenda&lt;Ang ShortDescriptionHtml&gt; ngayon
```
        <theShortDescriptionHtml><!\\[CDATA\\[ 
        <h1>ERDDAP</h1>
        This website (the Environmental Research Division's Data Access 
        Program) aggregates scientific data from diverse local and remote 
        sources and offers you a simple, consistent way to download subsets 
        of the data in common file formats and make graphs and maps.
        This particular ERDDAP™ installation has oceanographic data
        (for example, data from satellites and buoys).
        
        \\[standardShortDescriptionHtml\\]
        \\]\\]></theShortDescriptionHtml>
```

Malayang baguhin ito, lalo na ang huling pangungusap sa unang parapo.
    * Sa setup.xml, email allyTo at emailDailyReport Upang ngayon ay maging comma-weaded list ng email addresss. Ang unang email Upang maging espesyal, e.g., ang mga suskripsiyon sa EDDXxx MulaErddap datasets ay gumagamit ng adres na iyon ng email. Salamat kay John Maurer.
    * Ang mga pagkakamali sa email ay isinisingit na ngayon sa \\[ Malaking Direktorya \\] /logs/emailLogYYY-MM-D.txt file.
    * Sa setup.xml, may isang bago, opsyonal na parameter upang magtakda ng mga katangian ng email account (karaniwan pagkatapos pagkatapos ng pagkatapos ng pagkatapos ng&lt;Publishword&gt;):
```
          <emailProperties>_propertyName1_|_propertyValue1_|_propertyName2_| _propertyValue2_|...</emailProperties>  
        For example, gmail accounts need  
          <emailProperties>mail.smtp.starttls.enable|true</emailProperties>  
```

Ang default ay wala. Salamat sa Mayamang Signell.
    * REUPIN: Kung Gumagamit ka ng EDDTableCopy o EDDGrid Kopyahin, dapat mong ipakita ang lahat \\[ Malaking Direktorya \\] /copy/ directories at files na naglalaman ng "xh" sa directory o files pagkatapos na ihinto ang luma ERDDAP™ at bago simulan ang bago ERDDAP™ kaya't ang mga file na iyon ay muling i-copied. Ikinalulungkot ko, ngunit mahalaga na gumawa ng pagbabago at sana'y apektado nito ang iilang admin at iilang file.
Sa Linux, makikita mo ang mga talaksang ito na may, cd \\[ Malaking Direktorya \\] / Larawan
. .\\*xh\\*  
Sa Windows, makikita mo ang mga talaksang ito na may, Magsimula | Paghahanap
Ano ang gusto mong hanapin: Mga dokumento
Lahat o bahagi ng pangalan: xh
Tingnan sa: Browse -&gt; \\[ Malaking Direktorya \\] / Larawan
Click on 'Maghanap'
^A upang piliin silang lahat
Del upang alisin ang lahat ng ito
    * PAGTANGGAP: Sa datasets.xml , para sa EDDTable FromDatabase datasets, para sa petsa at timestamp variables, baguhin ang data Type to double at the units to segundo simula 1970-01-01T00:00:00Z. BINUHIGO namin na nag - iimbak ka ng impormasyon tungkol sa timestamp sa database\\*kasama\\*isang timezone. Walang impormasyon tungkol sa panahon, ang mga tanong na nagtatanong ERDDAP™ ipadala sa database at sa mga resulta ERDDAP™ mula sa database sa pamamagitan ng JDBC ay malabo at malamang na mali. Sinubukan namin, ngunit wala kaming mahanap na maaasahang paraan upang harapin ang "timestamp nang walang timezone" data. Sa palagay namin ito ay mabuting gawain. Tutal, ang "timestamp na walang timezone" data ay may ipinahihiwatig na timezone. Bagaman malaki na ang sona ng panahon ay maliwanag sa database admin, makabubuting tiyakin ito nang malinaw upang ang ibang software ay wastong makipagtalastasan sa iyong database. Salamat/sorry Michael Urzen.
    * MAHAL NA REKOMENDE: Sa datasets.xml , upang magkaroon ng .subset web page para sa pagharap sa paghahanap ng iyong mga tabular datasets, kailangan mong magdagdag [&lt; subsetVariables &gt;] (/docs/server-admin/datasets#subsetvariables) sa pangglobong mga katangian ng dataset.
    * RECOMMENDE: Sa datasets.xml , kung meron kang dataset datasetID = "pmelGtsppp", pakisuyong baguhin ito upang maging
```
          <dataset type="EDDTableFromDapSequence" datasetID="pmelGtsppp" active="false">  
        Whether or not you had that dataset, feel free to add this new GTSPP dataset:  
          <dataset type="EDDTableFromErddap" datasetID="erdGtsppBest">  
            <sourceUrl>https://coastwatch.pfeg.noaa.gov/erddap/tabledap/erdGtsppBest</sourceUrl>  
          </dataset>
```
    * RECOMMENDE: Sa datasets.xml , may bagong makatuwirang mapagpipilian para sa [&lt;cdm\\_data\\_type&gt;] (/docs/server-admin/datasets#cdm_data_type) pangglobong katangian, kaya dapat mong repasuhin/baguhin ang halaga ng iyong datasets.
    * Nasa datasets.xml , ang bago [&lt;[[Talaksan] (/docs/server-admin/datasets#sourceneedsexpandedfp_eq) ay nakatutulong kung ang source server ay hindi palaging humahawak ng &_variable_\\=_halaga_ tests nang tama (dahil sa [pangkalahatang kahirapan ng pagsubok sa pagkakapantay-pantay ng mga lumulutang na punto number](https://randomascii.wordpress.com/2012/02/25/comparing-floating-point-numbers-2012-edition/) ) . sourceNeedsExpandFP\\_EQ ay nakatakdang magkatotoo sa pamamagitan ng default (pinakaligtas na tagpo) , kaya hindi mo kailangang gumawa ng anumang pagbabago.
    * Bago [Mapagkakatiwalaan Mula sa mga AsiciiFile](/docs/server-admin/datasets#eddtablefromasciifiles) . Salamat kay Jerry Yun Pan.
    * Bago [Nakapagtuturong mga Talento](/docs/server-admin/datasets#eddtablefromthreddsfiles) . Salamat kay Roy Mendelssohn.
    * Mga Pagbabago [Mapagkakatiwalaan Mula sa mga Uso](/docs/server-admin/datasets#eddtablefromncfiles) ay nagagamit na may mas malawak na saklaw ng mga talaksan.
    * Ang EDDTable FromBMDE ay may kapansanan. Wala nang anumang aktibo, angkop, na pinagmumulan ng impormasyon.
    * Sa GenerateDatasettXml, ang bago EDDGrid Mga Mula sa Thred Umaani ang Catalog ng isang buong katalogo ng THEDS (o isang subset) at lumilikha datasets.xml ay kontento na. Salamat sa proyektong UAF.
    * Mga GenerateDataset Sina Xml at DasDds ngayon ay naglagay rin ng kanilang mga resulta \\[ Malaking Direktorya \\] /log/log.txt. Dahil sa Mayamang Signell at Charles Carleton.
    * Maraming pagpapabuti sa sistemang login. Salamat sa POST.
*    **Mga Bagay ERDDAP™ Mga Programme Kailangang Malaman at Gawin:** 
    * Nagkaroon ng mga pagbabago sa /WEB-INF/lib/ directory. Pakisuyong baguhin ang inyong javac at juva classpath settings alinsunod dito.
    * May bago \\[ ng iyong Url \\] /erddap/version service upang malaman ang bersyon ng isang ERDDAP . Ang tugon ay teksto, e.g., ERDDAP \\_bersyon=1.24 Kung makakuha ka ng HTTP 404 Not-Found error message, gamutin ang ERDDAP™ bilang bersyon 1.22 o mas mababa. Salamat sa POST.
*    **Maliliit na Pagbabago at mga Finto ng Bug:** 
    
    * Maaasahan Mula sa Mga pagbabago:
        * Bumabang suporta sa pagbabasa ng IOOS SOS XML ang tugon.
        * Karagdagang suporta sa pagbabasa ng IOOS SOS teksto/csv. (Kaya MGA NO SOS Ang mga server sa kasalukuyan ay hindi suportado.) 
        * Gumawa ng maraming pagbabago may kaugnayan sa IOOS SOS Mga detalye ng server.
        * Karagdagang suporta para sa mga queries ng BBOX para sa IOOS SOS at OOSTethys   SOS Mga server. Ang mga pagbabagong ito ay nagbubunga ng malaking pagbilis para sa kaugnay na mga kahilingan ng datos. Salamat sa IOOS SOS .
    * Teksto sa .mat Tamang - tama na ngayon ang pagkakatipid ng mga taskular data file. Salamat kay Roy Mendelssohn.
    *    WMS 
        *    OpenLayers ay binibigkisan na ngayon ERDDAP™ para magamit sa WMS web pahina. Nilulutas nito ang problema kapag ito ay nangyari OpenLayers ay nagbago mga ilang buwan na ang nakalipas at hinadlangan ang mga problema sa hinaharap.
        * Nasa WMS   GetCapabilities tugon,&lt;Online Resource&gt; Ang halaga ngayon ay URL ng WMS paglilingkod. Salamat kay Charlton Galvarino.
        * Isang alamat ang makikita sa WMS web page upang ipakita ang colorbar. Salamat kay Emilio Mayorga.
    *    EDDGrid Ang AggregateExing Dimension buildingor ay may problema kung ang pinagmulan ng axis Ang mga pamantayan ay hindi kapantay ng kanilang patutunguhan Mga pamantayan, e.g., kung ang panahon ng pagkukunan ay hindi lamang isang bagay "seconds since 1970-01-01" . Salamat Todd Spindler.
    * Sa Table WriterGeoJson, ang labis ',' pagkatapos ng bbox \\[ ... \\] ay naalis na. Salamat kay Greg Williams.
    * Maraming maliliit na pagbabago at bug fix.
    
## Bersiyong 1.22{#version-122} 
 (inilabas noong 2009-07-05) 

* Ang SlideSorter bug na ipinakilala noong 1.20 ay nakatakda.
* Ang bug ng OBIS na ipinakilala noong 1.20 ay nakatakda.
* Ang mga pagtukoy kay Jason datasets sa mga imahe/gadgets/GogleGadgets page ay tinanggal.
     
## Bersiyong 1.20{#version-120} 
 (inilabas noong 2009-07-02) 

*    ERDDAP™ Mga administrador, pakisuyong idagdag ito sa inyong talaksang setup.xml:
```
    <!-- If you want to restrict access to some datasets, you need to 
    specify the method used for logging on (authentication). See the info 
    at https://erddap.github.io/setup.html#security
    Currently, the options are: "" (logins not supported, the default),
    "custom", "openid". Note that openid login doesn't work when testing 
    with localhost (https://127.0.0.1:8443).
    -->
    <authentication></authentication>
    
    <!-- This specifies how you have stored passwords in the roles tags 
    in datasets.xml. If you aren't storing any passwords this is irrelevant.
    The options (in order of increasing security) are: "plaintext", "MD5", 
    or "UEPMD5" (MD5(UserName:ERDDAP:Password), the default).
    You should only use "plaintext" or "MD5" if you need to match values 
    stored that way in an external password database.  See the info at
    https://erddap.github.io/setup.html#security
    -->
    <passwordEncoding>UEPMD5</passwordEncoding>
    
    <!-- This determines whether datasets that the user doesn't currently
    have access to (because he isn't logged in or because his roles don't
    allow access) should be shown on lists of data sets 
    (e.g., from full text search, categorize, view all datasets, ...).
    The options are: "true", or "false" (the default).
    If false, no information about the dataset (even its existence) is 
      shown to users who don't have access to it.
    If true, some information about the dataset (title, summary, etc) is
      shown to users who don't have access to it.  
      If the user clicks on a link to a dataset he doesn't have access to,
      he will get an error message and be prompted to log in.
    -->
    <listPrivateDatasets>false</listPrivateDatasets>
    
    <!-- If the number of requests between two runs of LoadDatasets 
    exceeds unusualActivity, an email is sent to emailEverythingTo.
    The default is 10000.
    -->
    <unusualActivity>10000</unusualActivity>
```

* Mga bagong dataset type [ EDDGrid Kopya](/docs/server-admin/datasets#eddgridcopy) at [Kawili - wiling Pag - aaral](/docs/server-admin/datasets#eddtablecopy) gumawa at mag - ingat ng isang lokal na kopya ng iba EDDGrid o EDDTable dataset's data at server ang datos mula sa lokal na kopya. Napakadaling gamitin at napakabisa ng mga ito **Mga solusyon sa ilan sa pinakamalaking problema sa pagbibigay ng impormasyon mula sa malalayong mapagkukunan ng impormasyon:** 
    
    * Maaaring maging mabagal ang pagkuha ng datos mula sa isang malayong pinagkukunan ng datos (sa iba't ibang kadahilanan) .
    * Ang remote dataset kung minsan ay hindi makuha (sa iba't ibang kadahilanan) .
    * Ang pagtitiwala sa isang pinagmumulan ng impormasyon ay hindi sapat (e.g., kapag maraming gumagamit at marami ang gumagamit ERDDAP ginagamit ito ng mga s) .
    
Isa pa, ang lokal na kopya ay backup ng orihinal, na kapaki - pakinabang sakaling may mangyari sa orihinal.
    
Walang bago sa paggawa ng lokal na kopya ng isang dataset. Ang bago rito ay na ginagawa ito ng mga klaseng ito\\*Madali\\*upang lumikha at\\*tagapangalaga\\*isang lokal na kopya ng impormasyon mula sa isang\\*pagkakasari - sari\\*ng mga uri ng remote data source at\\*idagdag ang metadata\\*habang kinokopya ang impormasyon.
    
Ang mga uri ng dataset na ito ay bahagi ng kumpletong set ng mga katangian na nagpapasimple sa paglikha ng [Mga grid/clusters/federation ng ERDDAP s](/docs/server-admin/scaling) ng mabibigat na pasan (e.g., sa isang data center) .
    
* Bagong datos na uri [EDDTable FromDatabase](/docs/server-admin/datasets#eddtablefromdatabase) nakakakuha ng impormasyon mula sa isang lokal o malayong talaan ng database.
*    ERDDAP™ ngayon ay may [katiwasayan](/docs/server-admin/additional-information#security) sistema na sumusuporta sa pagiging totoo (Pinapapasok ang mga gumagamit nito) at autorisado (Pagpapahintulot sa kanila na makakuha ng ilang pribadong datasets) .
* Meron [dalawa, bago, mga kasangkapang command-line](/docs/server-admin/datasets#tools) tumulong ERDDAP™ Ang mga administrador ay lumilikha ng XML para sa isang bagong dataset sa datasets.xml :
    * Mga GenerateDataset Ang Xml ay maaaring lumikha ng isang magaspang na draft ng dataset XML para sa halos anumang uri ng datasets.
    * Ang mga DasDd ay tumutulong sa iyo na paulit - ulit na suriin at dalisayin ang XML para sa isang dataset. ERDDAP 'Mga GenerateDataset Inalis na ang mga Xml web page. Para sa mga kadahilanang panseguridad, sinusuportahan lamang nila ang ilang mga uri ng dataset. Ang bagong mga kasangkapan sa command line ay mas mabuting solusyon.
* Ang bago [status pahina](/docs/server-admin/additional-information#status-page) hinahayaan ang sinuman (ngunit Partikular na mga administrador) tingnan ang kalagayan ng isang tao ERDDAP™ mula sa sinumang browser sa pamamagitan ng pagpunta sa \\[ base Url \\]  /erddap/status.html .
* Ang Tabledap ngayon ay sumusuporta [gawaing server-side](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#functions) :
    * Hindi alam () ay nag-aalis ng mga nagayang hanay mula sa table ng tugon,
    * & orderBy  (...) Kung paano dapat pagbukud - bukurin ang mesa,
    * & orderByMax  (...) Hayaan mong tiyakin mo kung paano pagbubukud - bukurin at aalisin ang lahat ng hanay maliban sa mga hanay na may pinakamataas na halaga sa huling itinakdang tudling. Ito ay maaaring gamitin, halimbawa, upang makuha ang huling makukuhang datos para sa bawat istasyon.
* Ang mga tabular datasets ay maaari na ngayong isama ang karagdagang dateTime variables na hindi binanggit ang pangalan "time" . Ang mga variable na ito ay kinikilala ng kanilang mga "unit" metadata, na dapat na naglalaman ng " since "   (para sa petsa ng numero Panahon) o "ay" o "YY" (para sa format) . Subalit pakisuyong gamitin pa rin ang destinationName   "time" para sa pangunahing petsa Iba - iba ang oras.
*    ERDDAP™ gumagawa ngayon ng isang [sitemap.xml](/docs/server-admin/additional-information#sitemapxml) talaksan, na nagsasabi sa mga search engine na ang iyong ERDDAP ay kailangan lamang gapangin buwan - buwan. ERDDAP™ Mga administrador, pakisuyong sumunod [Ang mga tagubiling ito](/docs/server-admin/additional-information#sitemapxml) upang ipaalam sa mga search engine ang tungkol sa bagong sitemap.xml file.
*    ERDDAP Ang mga maling mensahe ngayon ay mas maikli at para sa mga kliyente (hindi mga programmer) . Salamat kay Greg Williams.
* [&lt;[[Talaksan] (/docs/server-admin/datasets#requestblacklist) ngayon ay sumusuporta rin sa IP adress kung saan ang huling numero ay pinalitan ng \\*.
* Mga Kahilingan .json at ang mga talaksang .geoJson ay maaari na ngayong maglakip ng opsyonal [jsonp](https://niryariv.wordpress.com/2009/05/05/jsonp-quickly/) humiling sa pamamagitan ng pagdaragdag ng "balo. .json p=_functionName_" hanggang sa katapusan ng query. Unang - una, sinasabi lamang nito ang ERDDAP™ idagdag ang "_functionName_ (" sa pasimula ng pagtugon at ") " hanggang sa katapusan ng pagtugon. Kung sa simula ay walang query, iwan ang "bag" sa iyong query. Salamat kay Greg Williams.
* Maraming bagong estadistika ang idinagdag sa [Pang - araw - araw na Report](/docs/server-admin/additional-information#daily-report) .
* Sa mga web page na may listahan ng mga dataset, ang institusyon at id ay nasa dulong kanan na ngayon. Ito'y nag - uudyok sa mga suskrisyon at iba pang mas kapaki - pakinabang na mga tudling na makita sa makikitid na iskrin ng computer.
* Sa lahat ng pahina ng web, ang pamagat ng pahina (sa ibaba ng pahina&lt;pamagat&gt; sa&lt;Ang startHadHtml&gt; na binibigyang kahulugan mo sa setup.xml) ay binago upang isama ang mas mabuting paglalarawan ng web page (Halimbawa, sa pamamagitan ng paglakip ng kasalukuyang pamagat at institusyon ng dataset) .
* Ang impormasyong Xmx ay kasama na ngayon sa impormasyong pang-alaala na inilimbag sa log.txt, Daily Report, at sa katayuan.html. Salamat kay Ellyn Montgomery.
*    ERDDAP™ ay may karagdagan, pangkalahatang-layunin na proteksiyon laban sa lahat ng mga pagkakamali (e.g., Labas ng MemoryError) . Salamat kay Charles Carleton.
* Paghusay sa maling paghawak kung ang tugon ay nagawa na.
* IMPROBED: EDDTable FromFiles at EDDGrid Payagan na lamang ngayon ng mga FromFile&lt;metadata Mula&gt; una o huli. Ang penultimate ay hindi na suportado. At ang una at huli ay batay ngayon sa hulingModifiedTime ng mga file.
* Pag - aayos ng Bug: sa EDDTable Mula sa SOS , ang hindi tanggap na info para sa isang istasyon ay nagtapon ng eksepsiyon at nagpangyaring tanggihan ang buong dataset. Ngayon, ang mga istasyong iyon ay basta ipinagwawalang - bahala (at ang maling mensahe ay isinusulat upang i - log.txt) . Salamat kay Rick Blair.
     

## Bersiyong 1.18{#version-118} 
 (inilabas noong 2009-04-08) 

* Bug fix: Simula noong 1.14, ang EDDTable Data Access Form at Make A Graph web page ay hindi tamang tumatalakay sa mga siniping demand.
* Bug fix: Simula noong 1.14, ang EDDTable FromDapSequence ay hindi humawak ng mga limitasyong oras nang tama kung ang mga source time units ay hindi "pangalawa mula 1970-01-01T00:00:00".
     

## Bersiyong 1.16{#version-116} 
 (inilabas noong 2009-03-26) 

*    ERDDAP™ Mga administrador:
    * Mahalagang release ito dahil nag-aayos ito ng bug na nag-iwan ng bug ERDDAP™ Pagtakbo ng sinulid kung ginamit mo ang Tomcat Maler to Stop/Start o Reload ERDDAP . Kaya kapag naka-install ka ng 1.16, huwag mo lang gamitin ang Tomcat manager para i-undeploy ang dati ERDDAP™ at ang paglalagay ng bago ERDDAP . Sa halip: **tanggalin ang luma ERDDAP™ , restart Tomcat (o ang server) , pagkatapos ay gamitin ang bago ERDDAP .** Sa tuwina'y isang mabuting ideya na gawin iyan kapag nagkakabit ng isang bagong bersiyon.
    * Pakisuyong idagdag [&lt;requestBlacklist&gt;&lt;/requestBlacklist&gt;] (/docs/server-admin/datasets#requestblacklist) sa iyong datasets.xml . Ito ay magagamit upang magtakda ng isang listahan ng mga kliente IP address upang harangin (e.g., upang hadlangan ang pagtanggi sa pag - atake sa Paglilingkod o ang labis na masigasig na web robot) .
* Mayroon na ngayong isang \\[ Malaking Direktorya \\] /logs directory upang hawakan ang ERDDAP™ log files. Kapag nagsimula ka ERDDAP™ , gumagawa ito ng arkibong kopya ng log.txt at log. Txt. previous files na may time selyo. Kung may problema bago ang restart, maaaring kapaki - pakinabang na suriin ang mga file na ito.
*    ERD ' ERDDAP™ ngayon ang sistema ng suskripsiyon.
*    ERDDAP™ Minsan pang ipinahihintulot (ngunit hindi pa rin inirerekomenda) ang "%26"[kailangan ng sanggunian] ng "V" sa kahilingan ng mga URL (tingnan ang [kaugnay na pagbabagong v1.14](#percent26) ) .
* Ilang bagong mga karagdagan sa bahaging Tally ng [Pang - araw - araw na Report](/docs/server-admin/additional-information#daily-report) .
* Ang maliliit na bug fixes sa paglikha ngDatasetsXml.
* May ilang maliliit na bug fix.
     

## Bersiyong 1.14{#version-114} 
 (inilabas noong 2009-03-17) 

* Mga pagbabago para sa mga gumagamit:
    * Sa mga kahilingan ng grid data, ERDDAP™ ngayon ay sumusuporta: [Huling-n](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#last) Kung saan ang n ay isang integral na bilang ng mga indicate at [ (huling-d) ](https://coastwatch.pfeg.noaa.gov/erddap/griddap/documentation.html#lastInParentheses) kung saan ang d ay isang halaga ng numero (para sa panahon, ito ay sa loob ng mga segundo) .
    * Sa mga kahilingan ng taskular data, ang mga string demand ngayon ay nangangailangan [dobleng mga pagsipi](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#QuoteStrings) paligid ng halaga, halimbawa, &id="NDBC40121"". Ito ay hinihiling ng DAP protocol.
    * Sa mga kahilingan ng tabular data, ERDDAP™ ay nangangailangan niyan [lahat ng mga pagbabawal ay wastong porsiyentong naka-sign](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#PercentEncode) . Awtomatikong ginagawa ito ng mga browser, kaya ito ay karaniwang umaapekto sa mga programang pangkompyuter/skripto na naka-access ERDDAP .
#### Percent26{#percent26} 
*    [Dati,](#percent26) ang [Isang graph web page](https://coastwatch.pfeg.noaa.gov/erddap/images/embed.html) at ang [ ERDDAP™ Google Gadget web page](https://coastwatch.pfeg.noaa.gov/erddap/images/gadgets/GoogleGadgets.html) na sinasabing papalit sa "&" sa URL ng imahen ng "%26". Mula ngayon, dapat mong palitan ang "Fellow" sa URL ng imahen ng "Fiamp;". Kaya kailangan mong palitan ang anumang "%26" sa mga umiiral na web page at Google Gadgets ng "Biamp;". (Ikinalulungkot Ko) 
*    ERDDAP™ Mga administrador, pakisuyo:
    * Idagdag ang sumusunod [setup.xml](/docs/server-admin/deploy-install#setupxml) talaksan (at palitan ang watawat Halaga ng KeyKey) :
```
        <!-- ERDDAP™ has a service that lets remote users set a flag
        to notify ERDDAP™ to try to reload a dataset.
        These requests use a key which is generated based
        on baseUrl/warName, a datasetID, and flagKeyKey.
        \\*\\*\\* Change this once, to any text (a favorite quote? random text? 
        It doesn't matter). Normally, you won't ever change this again.
        But if you think someone is abusing the flag system,
        change this text again, restart ERDDAP™, and send
        all of the users of the flag system the relevant new flagKeys
        (see the list in the Daily Report). -->
        <flagKeyKey>A stitch in time saves nine. CHANGE THIS!!!</flagKeyKey>
        
        <!-- ERDDAP™ has an email/URL subscription system which sends a user
        an email or pings a url whenever a dataset of interest changes.
        (This is different from the RSS system, which is always active.)
        The system relies on the server being able to send out 
        emails to people to validate their subscription requests.
        The emails appear to come from the emailFromAddress below.
        So if your server can't send out emails, don't make this system active.
        You may choose (for whatever reason) to make this system active or not, 
        so valid values below are "true" (the default) and "false".
        Note that if you change this and restart ERDDAP™, the list of 
        subscriptions (in \\[bigParentDirectory\\]/subscriptionsV1.txt) isn't
        affected. See also the subscriptionEmailBlacklist in datasets.xml.
        -->
        <subscriptionSystemActive>true</subscriptionSystemActive>  
```

    * Sa sunud - sunod na linya&lt;mailUserName&gt; sa inyong lugar [setup.xml](/docs/server-admin/deploy-install#setupxml) talaksan, idagdag
```
        <emailPassword>_myPassword_</emailPassword> <!-- optional; if absent, emails can't be sent to non-local addresses -->  
```
at ipasok sa iyong tunay na password.
    * Maaari kang magbago&lt;wms SampleBox&gt; sa inyong lugar [setup.xml](/docs/server-admin/deploy-install#setupxml) talaksan upang isama ang mga halagang longhitud hanggang 360, e.g.,
```
        <!-- The bounding box values are 
           minLongitude,minLatitude,maxLongitude,maxLatitude.
           Longitude values within -180 to 180, or 0 to 360, are now okay. -->
        <wmsSampleBBox>0,-75,360,75</wmsSampleBBox>  
```

    * Sa iyong sarili datasets.xml file, palitan ng pangalan ang dataset type na EDDTable FromNc4DFiles hanggang EDDTable FromNcFiles (na sumusuporta ngayon sa mga file na may iba't ibang dimensiyon) . Kung mayroon kang EDDTable FromNc4DFiles dataset:
        
        1. You MUST change to type="EDDTable FromNcFiles" sa inyong datasets. XML file.
        2. WALANG - TANGGAP na magdagdag&lt;Mga Dimensiyon&gt; 4&lt;/nDimensions&gt; tag sa dataset's XML.
        3. Maaari mong idagdag ang bago&lt;Ang "Files BySourceNames&gt; tag" upang magtakda ng internasyunal na pagkakasunud-sunod para sa mga files, na nagtatakda sa kabuuang pagkakasunud-sunod ng datos ay bumalik.
        
Para sa mga detalye, tingnan [Mapagkakatiwalaan Mula sa mga Bakod](/docs/server-admin/datasets#eddtablefromfiles) .
    * Noon, para sa EDDTable FromDapSequence, para sa OPeNDAP Mga server ng DRDS, sa loob datasets.xml , ginamit namin&lt;Ang sourceCanConstrainStringsRegex&gt;&gt;=&lt;/sourceCanConstrainStringRegex&gt;. Subalit ngayon ay nakikita namin na ang suportang regex ng DRDS ay mas limitado kaysa basta ERDDAP ' s, kaya inirerekomenda namin&lt;Ang sourceCanConstrainStringsRegex&gt;&lt;/sourceCanConstrainStringRegex&gt; upang ang mga regex demand ay hindi maipasa sa pinagmulan, kundi sa halip ay hawakan sa pamamagitan ng ERDDAP .
    * Muling paghawak ng sourceCanConstrain... sa loob datasets.xml sunod [Mapagkakatiwalaan Mula sa Pagiging Mapagkakatiwalaan](/docs/server-admin/datasets#eddtablefromdapsequence) at (panloob) Lahat ng EDDTable dataset types. Ang bagong sistema ay mas simple at mas mainam na sumasalamin sa pagiging madaling makuha ng iba't ibang mga mapagkukunan ng datos. Baka kailanganin mong baguhin ang XML para sa iyong mga datasets datasets.xml .
* May ilang bagong katangian na kapaki - pakinabang sa ganang sarili, subalit kapag pinagsama, pinadadali rin nito ang paglikha [Mga grid/clusters/federation ng ERDDAP s](/docs/server-admin/additional-information#grids-clusters-and-federations) .
    * Mga bagong datos:
        *    [ EDDGrid Mula sa Erddap](/docs/server-admin/datasets#eddfromerddap) at [Mapagkakatiwalaang Mula sarddap](/docs/server-admin/datasets#eddfromerddap) na hayaang isa ERDDAP™ ng datos mula sa iba ERDDAP™ sa isang napakasimple at napakabisang paraan.
        *    [ EDDGrid Mula sa mga Labi](/docs/server-admin/datasets#eddgridfromfiles)   (at ang mga subclass nito, [ EDDGrid Mga Ulila](/docs/server-admin/datasets#eddgridfromncfiles) na mababasa NetCDF   .nc , GRIB .grb, at HDF   .hdf mga talaksan) .
        *    [Mapagkakatiwalaan Mula sa mga Uso](/docs/server-admin/datasets#eddtablefromncfiles) na mababasa NetCDF   .nc Na may kayariang parang dulang.
    * Ang mga "runLoadDataset " at ang mga "backDatasets " ay muling binago upang ang mga ito'y muling maisama ERDDAP™ ay lubhang tumutugon sa muling pagkarga ng mga dataset batay sa mga file sa [bandila](/docs/server-admin/additional-information#flag) directory (kadalasan&lt;5 segundo kung ang pangunahing loadDatasets ay kasalukuyang ginagawa).
    * Bagong serbisyo na maaaring ipahintulot [isang URL upang lumikha ng isang talaksan ng bandila](/docs/server-admin/additional-information#set-dataset-flag) para sa ibinigay na dataset, e.g.,
    ```
        https://coastwatch.pfeg.noaa.gov/erddap/setDatasetFlag.txt?datasetID=rPmelTao&flagKey=123456789  
    ```
Lumilikha ng isang talaksan ng watawat sa direktoryo ng bandila para sa rPmeltao (bagaman ang bandila Ang susi rito ay mali) .
    * Bago [ng suskripsiyon](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions) serbisyo upang matiyak ng sinumang kliyente ang isang pagkilos na gagawin kapag nalikha ang isang espesipikong dataset (kapag ERDDAP™ ay muling naka-arte) at kailanma't magbago ang dataset sa anumang paraan. Ang sistemang ito ay maaaring mabalda sa pamamagitan ng&lt;subscription&gt; sa inyong [setup.xml](/docs/server-admin/deploy-install#setupxml) talaksan. Ang ERDDAP™   [Pang - araw - araw na Report](/docs/server-admin/additional-information#daily-report) ay nagtatala ngayon ng lahat ng suskripsiyon at kasali ang URL na kinakailangan upang kanselahin ang bawat isa, kung inaakala mong ang sistema ay inaabuso. Nasa datasets.xml , may bago, opsyonal [&lt;ng suskripsiyon EmailBlacklist&gt;] (/docs/server-admin/datasets#subscriptionemailblacklist) tag upang maitukoy ng mga administrador ang isang comma-nahiwalay na listahan ng mga direksiyon ng email na agad na blacklist mula sa sistema ng suskripsiyon.
    * Bago [&lt;onChange&gt;] (/docs/server-admin/datasets#onchange) Makipagkaibigan datasets.xml hinahayaan ang ERDDAP™ Itinakda ng administrador ang isang pagkilos na gagawin kapag nilikha ang isang espesipikong dataset (kapag ERDDAP™ ay muling naka-arte) at kailanma't magbago ang dataset sa anumang paraan.
    * Ang mga pagpapabuti sa ganap na paghahanap ng teksto: ang pag-iimbak ng strando para sa bawat dataset ay gumagamit ngayon ng 1/2 ng memorya. Ang paghahanap na algorithm (Boyer-More-tulad ng) ngayon ay 3X mas mabilis.
    * Mga email mula sa ERDDAP™ ngayon ang paksa at nilalaman ng paksa \\[ erddap Url \\] , upang maging malinaw kung alin ang ERDDAP™ galing ito (sakaling ikaw ay mag - abuloy ng marami ERDDAP s) .
    * Mas malawak na pagtitipon ng estadistika para sa [Pang - araw - araw na Report](/docs/server-admin/additional-information#daily-report) email.
    * Bagong talaksang log \\[ Malaking Direktorya \\] /emailLOgYEAR-MM-DD.txt troso lahat ng email na ipinadala ng ERDDAP™ araw - araw. Ito ay lalo nang kapaki-pakinabang kung ang iyong server ay hindi aktuwal na makapagpadala ng emails - sa paano man ay mababasa mo ang mga ito sa log.
    *    ERDDAP™ ngayon ay gumagawa ng isang \\[ Malaking Direktorya \\] /cache/ ( datasetID ) directory para sa bawat dataset yamang maaaring maraming talaksan ang nakalagay.
* Bago [ RSS 2.01](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions) pagkain sa bawat dataset (Hanapin ang kahel RSS Mga larawan sa listahan ng mga dataset, Data Access Forms, at Make A Graph web page) .
*    EDDGrid   .kml mga tugon ngayon ang gumagamit ng mga larawang may baldosa ("superoverlays" -- dynamic na lumilikha ng mga larawang quad tree) . Ang unang mga larawan ay mas mabilis kaysa rati. Ang resolusyon ng mapa ay dumarami habang ikaw ay nagsasagawa ng zoo, hanggang sa ganap na resolusyon ng dataset. Mungkahi: Dapat humiling .kml para sa isang punto ng panahon, subalit ang buong longhitúd ng dataset, ay depende. Sa kasamaang palad, ang suporta sa haba ng panahon ay inalis (Sana'y bumalik ito) .
*    ERDDAP™ sabi pa ngayon [Sina Expires at Cache-Control max-age headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control) sa lahat ng files na hiniling mula sa directory ng /imes. Lubhang binabawasan nito ang bilang ng mga kahilingan sa talaksang static na ipinadala sa ERDDAP at sa gayo'y lubhang bumibilis ERDDAP™ sa pahina. Gayundin, marami Java Ang mga reperensiya sa talaksang Script ay lumipat sa ibaba ng kanilang mga pahinang HTML, na nagpapabilis din ng marami ERDDAP™ sa pahina. Dahil sa aklat na "High Performance Web Sites" ni Steve Souders at ang ySlow na idinagdag sa FireBug plugin sa FireFox.
*    ERDDAP™ Nagbago mula netcdf-java 2.2.22 hanggang netcdf-java 4.0. Bukod sa iba pang mga bagay, ito'y nagpapahintulot ng EDDGrid Mga FromNcFile na Binabasa HDF   .hdf , pati na rin ang GRIB .grb at NetCDF   .nc mga file.
*    EDDGrid Mula sa Dap at EDDGrid Sinusuportahan din ngayon ng mga FromNcFile ang DArray (gayundin ang DGrid)   dataVariable s. Kung ang isang dimensiyon ay walang katumbas na coordinate variable, ERDDAP™ Lumilikha ng axis na iba - iba ang sukat ng index (e.g., 0, 1, 2, ..., 311, 312) . Kaya lahat ng iba pang aspekto ng EDDGrid manatiling gayon:
\\* Ito ay nagsisilbi pa rin sa lahat ng datasets bilang Grids, na may axis variable para sa bawat dimensiyon.
\\* Ang mga Queries ay maaari pa ring humiling ng mga pagpapahalaga mula sa axis variables.
Salamat kina Charles Carleton, Thomas Im, Dorian Raymer, at iba pa.
* Ang WMS   OpenLayers ang mga pahinang ito ay may default longhitúd, na mas malaki nang kaunti kaysa sa dataset (hindi ang eksaktong range, kaya ang konteksto ng maliliit na datasets ay mas maliwanag) . Ang default range ay maaari na ring 0 hanggang 360, na nagpapahintulot sa buong saklaw ng maraming datasets na maipakita ngayon. Salamat Todd Spindler.
* Mga bagong slinder sa ilang Data Access Forms at Make A Graph web page. Pinasimple Nila (krudo) Ang detalye ng nais na impormasyon at nagbibigay ng mahusay na impormasyon sa paningin.
* Isang bagong mapagpipilian para sa&lt;datos&gt; Mga tag sa loob ng datasets.xml : [aktibo="mali"](/docs/server-admin/datasets#active) .
* Mga Tumutukoy ERD ' ERDDAP™ nagbago mula sa coastwatch.pfel (gumagawa pa rin sa pamamagitan ng proxy) sa coastwatch.pfeg (mas gusto) .
* Bagong suporta para sa [ data\\_min at data\\_max ](/docs/server-admin/datasets#data_min-and-data_max) Iba't ibang katangiang metadata.
* Isang bahagyang solusyon sa [Maghintay Nang Paulit - ulit / Hindi Bahaging mga Resulta Maliban](/docs/server-admin/additional-information#waitthentryagain-exception) : Ngayon, ang ilang kahilingan na dati'y nabigo nang matuklasan ang pagbabago ng pinagkunan ng impormasyon ay magtatagumpay sapagkat ERDDAP™ ay muling idudugtong ang dataset at muling i-request ang datos nang kusa, lahat sa konteksto ng orihinal na kahilingan.
* Bug fix: lumikha Mga Data Si Xml ay may kapansanan ERDDAP™ bersyon 1.12. Salamat kay Ellyn Montgomery sa pagbanggit nito.
* Maliliit na pagbabago sa maling paghawak.
* Maraming mga pagpapabuti upang maiwasan/makitungo sa posibleng mga kondisyon ng lahi (I.e., posibleng mga problema mula sa multi-threaded na kalikasan ng ERDDAP ) na nagdulot ng maliliit at madalang na mga problema.
* Ngayon, kung ang isang maling mensahe ay nakasulat sa isang imahe, ang imahe ay mananatili lamang sa cache sa loob ng ~5-10 minuto (hindi 60) . Salamat kay Cara Wilson.
* Ang pamantayang mensahe kapag walang datos ay ngayon ay "Ang iyong query ay walang nagawang tugmang resulta.", na mas maikli, mas tumpak, at posporo. OPeNDAP Mga server.
*    EDDGrid ay hindi na nagpapahintulot ng nakataling mga pagpapahalaga sa axis.
* Maliit na pagbabago sa .ver at .help mga kahilingan.
* Maraming maliliit na pagbabago at bug fix.
     

## Bersiyong 1.12{#version-112} 
 (inilabas noong 2008-10-31) 

* Maaasahan Mula sa SOS Minsan pang nagtatrabaho sa NDBC SOS at nagtatrabaho sa bagong NOS SOS .
* Kailangan ngayon ang EDDTable FromBMDE ERDDAP™ admin upang magtakda dataVariable s.
*    EDDGrid ay hindi na kinakailangan na ang lat at lon ay pantay na i-release para sa . Maaninag Png o .kml . Salamat Todd Spindler.
* Ilang maliliit na pagbabago.
     

## Bersiyong 1.10{#version-110} 
 (inilabas noong 2008-10-14) 

* Bagong "colorBar" metadata para sa mga variable ng datos sa datasets.xml ang default color bar settings para sa mga graph at mapa. Tingnan [higit pang impormasyon](/docs/server-admin/datasets#color-bar-attributes) . Ito ay mahalaga dahil ito ay lubhang nagpapabuti sa paglitaw ng mga default graph at mapa na ginawa ng Make A Graph at dahil ang default na mga grap at mapa ay mayroon na ngayong di-nagbabagong kulay bareta kahit na binabago ng kliyente ang hinihinging oras o heograpikong saklaw. Kailangan din ito para sa WMS .
*    ERDDAP™ ay nagsisilbi ngayon sa karamihan ng mga grid data sa pamamagitan ng isang WMS paglilingkod. Ito ay mahalaga dahil ito ay nagpapakita na, bukod sa pagkuha ng datos mula sa maraming uri ng mga server ng datos, ERDDAP™ ay maaaring mamahagi ng impormasyon sa pamamagitan ng iba't ibang protocol ( DAP , WMS , ... marami pa sa hinaharap) . Tingnan ang [Dokumento ng kliyente](https://coastwatch.pfeg.noaa.gov/erddap/wms/documentation.html) . O ang [Dokumento Para sa mga Tagapangasiwa](/docs/server-admin/datasets#wms) . O [Subukin ito](https://coastwatch.pfeg.noaa.gov/erddap/wms/index.html) .
* Bagong suporta sa halaga ng longhitud &gt;180 sa .kml mga file.
* Bagong cdm\\_data\\_type: Ibang .
*    ERDDAP™ ngayon ay sumusuporta sa "boolean" source dataType. Tingnan [higit pang impormasyon](/docs/server-admin/datasets#boolean-data) Ito ay magiging kapakipakinabang sa hinaharap na EDDTable FromDatabase.
* Ang bagong EDDTable FromBMDE ay sumusuporta sa DiGIR/BMDE data sources.
* Ang EDVGridaxis ngayon ay nagpapahintulot ng pagbaba ng mga naibukod na halaga. Kailangan ito ng pmelOscar datasets.
*    ERDDAP™ ang mga pagkakamali ng HTTP (e.g., "404 para sa yaman/pahinang hindi natagpuan") sa mas maraming kalagayan, sa halip na mga pahinang HTML na may maling mga mensahe.
* Maraming pagbabago/dagdag sa ERDDAP™ Mga dokumento.
* Maraming maliliit na pagbabago.
* May mga bug fix.
*    **Mga Bagay ERDDAP™ Ang mga administrador ay dapat na gumawa ng pagbabago sa bersiyong ito:** 
    * Nasa datasets.xml , para sa anumang Mapagkakatiwalaan Mula sa SOS datasets, pagbabago ng "naobserbahang Property" metadata sa "source revised Property".
    * Ang mga tuntunin para sa isang tao axisVariable o dataVariable ' destinationName ngayon [mas mahigpit](/docs/server-admin/datasets#datavariable-addattributes) . Kailangan mong suriin na ang iyong iba't ibang pangalan ay tama. Itsek ang mga ito nang manu - mano, o tumakbo ERDDAP™ at tingnan ang maling mga mensahe sa report na ipinadadala sa administrador.
    * Nasa datasets.xml , kung nais mong gamitin ang isang grid data WMS , kailangan mong magdagdag ng colorBar metadata. Halimbawa, sa paanuman,&lt;pangalan=" colorBarMinimum "uring=" doble"&gt;0&lt;/att&gt;
```
          <att name="colorBarMaximum" type="double">32</att>  
```
Tingnan [higit pang impormasyon](/docs/server-admin/datasets#wms) .
    * Idagdag ang sumusunod [setup.xml](/docs/server-admin/deploy-install#setupxml) talaksan (ngunit iangkop ito sa iyong impormasyon) :

```
        <!-- drawLand specifies the default Make A Graph setting for 
        whether the landmask should be drawn "over" (the default) or "under" 
        surface data on maps. "over" is recommended for primarily 
        oceanographic data (so that grid data over land is obscured by the 
        landmask). "under" is recommended for all other data.
        -->
        <drawLand>over</drawLand>  
        
        <!-- Information about the ERDDAP™ administrator is used for the 
        SOS and WMS servers. You MUST CHANGE these to describe your 
        installation. 
        -->
        <adminInstitution>NOAA Environmental Research 
        Division</adminInstitution>
        <adminIndividualName>Your Name</adminIndividualName>
        <adminPosition>Webmaster</adminPosition>
        <adminPhone>your-phone-number</adminPhone>
        <adminAddress>99 Pacific St, Suite 255A</adminAddress>
        <adminCity>Monterey</adminCity>
        <adminStateOrProvince>CA</adminStateOrProvince>
        <adminPostalCode>93940</adminPostalCode>
        <adminCountry>USA</adminCountry>
        <adminEmail>yourName@yourSite</adminEmail>
        
        <!-- Information about the ERDDAP™ administrator is used for ERDDAP's
        SOS server. You MUST CHANGE these to describe your installation. 
        -->
        <sosTitle>NOAA Environmental Research Division SOS</sosTitle>
        <sosAbstract>NOAA Environmental Research Division's ERDDAP™ makes 
          data from multiple sources available via the SOS 
          protocol.</sosAbstract>
        <sosKeywords>Weather, Ocean Currents, Temperature, 
          Salinity</sosKeywords>
        <sosAccessConstraints>NONE</sosAccessConstraints>
        <sosFees>NONE</sosFees>
        
        <!-- Information about the ERDDAP™ administrator is used for 
        ERDDAP's WMS server. You MUST CHANGE these to describe your 
        installation. -->
        <wmsTitle>NOAA Environmental Research Division 
        WMS</wmsTitle>
        <wmsAbstract>NOAA Environmental Research Division's ERDDAP™ makes
        data from multiple sources available via the WMS 
        protocol.</wmsAbstract>
        <wmsKeywords>Weather, Ocean Currents, Temperature, 
          Salinity</wmsKeywords> 
        <wmsAccessConstraints>NONE</wmsAccessConstraints>
        <wmsFees>NONE</wmsFees>
        <!-- For the wms examples, pick one of your grid datasets that has 
        longitude and latitude axes. The sample variable must be a variable 
        in the sample grid dataset.  The bounding box values are 
        minx,miny,maxx,maxy.
        -->
        <wmsSampleDatasetID>erdBAssta5day</wmsSampleDatasetID>
        <wmsSampleVariable>sst</wmsSampleVariable>
        <wmsSampleBBox>0,-75,180,75</wmsSampleBBox>
```

## Bersiyong 1.08{#version-108} 
 (inilabas noong 2008-07-13) 

* Isang bagong web service sa ERDDAP™ , lumilikha Mga Data Xml, mga tulong ERDDAP™ Ang mga administrador sa pamamagitan ng paglikha ng isang magaspang na draft ng XML na kinakailangan upang ilarawan ang isang dataset datasets.xml 
* Ang ilang mga pagbabago/bug fixs na nauugnay sa pagpahintulot sa griddap na makita ng netcdf-java bilang isang opendap server, kabilang ang: global metadata ay ngayon ay binansagan bilang "NC\\_GLOBAL". (Sa halip ng "GLOBAL") .
* Ang EDDGrid at EDDTable Data Access Forms Ginagamit na ngayon ang query information sa URL. Halimbawa, kung ang isang gumagamit ay magmula sa anyong Make A Graph tungo sa isang Date Access Form, ang mga limitasyon ay wastong inililipat ngayon.
*    tabledap Ipinahihintulot ngayon ng 'Make A Graph ang mga pagbabawal sa String variables.
* Ang EDDTable's Make A Graph ay nagpapahintulot ngayon sa mga NaN demandts. Salamat kay Steve Hankin.
* Pag - aayos ng Bug: Maaring mag - ipon Hindi tumpak na kinilala ng asImage ang .colorbar min at mga halaga ng max. Salamat kay Steve Hankin
* Maraming mga pagpapabuti sa setupDatasetsXml. Salamat kay Ellyn Montgomery.
* Mga kahilingan ng Griddap ay ipinahihintulot ngayon () -style ay humihiling nang bahagya sa labas ng aktuwal na linya ng axis. Angkop ito yamang () - Ang mga halaga ay bilog sa pinakamalapit na aktuwal na halaga. Salamat kay Cindy Bessey
* Ginawa kong mas sopistikado ang pagsusulit sa FloratArray at DoubleArray. Lagi itong magiging di - sakdal (sapagkat ang pagsubok ay kailangang baguhin para sa bawat dataset) , ngunit dapat na mas mabuti ito. Salamat kay Ellyn Montgomery.
* Ako'y lumipat ng setup.html at setyupDatasets Xml.html erddap's /download directory at hard code ang lahat ng mga link sa mga ito. Ngayon, maaari akong gumawa ng mga pagbabago at i - update agad ang impormasyon sa setup.
* Maraming maliliit na pagbabago. May ilang maliliit na bug fix.
*    **Mga Bagay ERDDAP™ Ang mga administrador ay dapat na gumawa ng pagbabago sa bersiyong ito:** 
    * Lumipat&lt;Ang IShort Description Html&gt; mula sa iyong mga mensahe. [setup.xml](/docs/server-admin/deploy-install#setupxml) talaksan. Binabanggit nito ang teksto na lumilitaw sa gitna ng kaliwang panig ERDDAP™ Pampamilyang pahina. Gayundin, magdagdag&lt;h1&gt; ERDDAP &lt;/h1&gt; (o iba pang ulong - balita) hanggang sa tuktok nito. **O,** kopya&lt;Ang ShortDescriptionHtml&gt; sa bago [setup.xml](/docs/server-admin/deploy-install#setupxml) talaksan (mula sa bagong erddapCont .zip ) sa iyong setup.xml.
         

## Bersiyong 1.06{#version-106} 
 (inilabas noong 2008-06-20) 

* Bagong suporta para sa IOOS DIF SOS pinagmumulan ng impormasyon.
* Maraming maliliit na pagbabago. May ilang maliliit na bug fix.
     

## Bersiyong 1.04{#version-104} 
 (inilabas noong 2008-06-10) 

* Bagong Uri ng Slide.
* Bagong Google Gadgets page at mga halimbawa.
* Ilagay ang Bug EDDGrid .saveASNc para sa variable na may scale at addOffset.
     

## Bersiyong 1.02{#version-102} 
 (inilabas noong 2008-05-26) 

* Bago EDDGrid Ang Side Byside ay nagpapahintulot sa iba't ibang paraan axisVariable s \\[ 0 \\] pinagmulan Mga pamantayan.
* Ang lahat ng daloy ng hangin at mga dataset ay pinagsama - sama EDDGrid Side Byside datasets.
* Ang mga imahen mula sa mga kahilingan ng imahen ay nakalagay na ngayon sa loob ng 1 oras.
     

## Bersiyong 1.00{#version-100} 
 (inilabas noong 2008-05-06) 

* Gumawa ng A Graph web page at graphics commands sa URLs.
* Suportahan ang mga talaksang flag upang pilitin ang muling pagkarga ng isang dataset.
* Bagong uri ng dataset: EDDTable From4DFiles (ang unang subclass ng EDDTable FromFiles) .
