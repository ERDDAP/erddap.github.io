# Mahahalagang Bandila

Pinatutunayan ng pahinang ito ang mga bandila ng pagsasaayos na makukuha sa sistema. Kontrolado ng mga bandilang ito ang iba't ibang bahagi, kakayahan sa eksperimento, at mga paggawing pamana.

##  **Alamat ng Flag Lifecycle** 

*  **Matatag:** Inuuri bilang long-term flags upang payagan ang mga admin na baguhin ang functionity. Ligtas para sa produksiyon.
*  **Pagsubok:** Mga katangian na handa na para sa pagsubok. Ang mga ito ay alin sa magtatapos sa "Stable" o sa huli ay itatakda sa kanilang target na halaga at ipatanggal ang watawat.
*  **Sa Ilalim ng Konstruksiyon:** Sa kasalukuyan ay nahihirapang magsinungaling sa kodigo, anuman ang kaayusan. Ang bahaging ito ay hindi pa handang gamitin.

##  **🚀 Mga Optimisasyon sa pagsubok** 

Ang mga bandilang ito ay malamang na alisin sa hinaharap.

###  **Paggising Lamang sa mga Bagay - bagay** 

Paglalarawan
Optimisasyon bandila. Kung totoo, ang sinulid na panghipo ay tumatakbo lamang kapag may mga bagay na gagawin.

 | Mga ari - arian | Mga Detalye | 
 | :-- | :-- | 
 |   **Buhay**   | Pagsubok | 
 |   **Kasalukuyang Pagbagsak**   | totoo | 
 |   **Matagal na Tunguhin**   | totoo | 
 |   **Kasaysayan**   | Idinagdag noong 2.29.0 | 

###  **finishCachClear** 

Paglalarawan
Ilakip ang background na atas na nag - aalis ng mga bagay mula sa cache.

 | Mga ari - arian | Mga Detalye | 
 | :-- | :-- | 
 |   **Buhay**   | Katatagan | 
 |   **Kasalukuyang Pagbagsak**   | totoo | 
 |   **Matagal na Tunguhin**   | totoo | 
 |   **Kasaysayan**   | Idinagdag noong 2.27.0 | 

###  **Gumawa ng Bahid ang NcHader** 

Paglalarawan
Kung totoo na lilikhain ng server ang buong talaksang nc bago likhain ang resultang ncheader. Ang bago (mas gusto) pag-aasal kapag mali ang direktang paglikha ng ncheader resulta.

 | Mga ari - arian | Mga Detalye | 
 | :-- | :-- | 
 |   **Buhay**   | Pagsubok | 
 |   **Kasalukuyang Pagbagsak**   | bulaan | 
 |   **Matagal na Tunguhin**   | bulaan | 
 |   **Kasaysayan**   | Idinagdag noong 2.29.0 | 

###  **Ginagamit na Repleksiyon** 

Paglalarawan
Ang paggamit ng Java Pagbubulay - bulay sa Konstanteng EDD ( ERDDAP Talaan ng mga Nilalaman) sa mga klase.

 | Mga ari - arian | Mga Detalye | 
 | :-- | :-- | 
 |   **Buhay**   | Pagsubok | 
 |   **Kasalukuyang Pagbagsak**   | totoo | 
 |   **Matagal na Tunguhin**   | totoo | 
 |   **Kasaysayan**   | Ang Default ay nagbago tungo sa pagiging totoo noong 2.28.0, na idinagdag noong 2.25 | 

###  **Mga larawan sa likuran** 

Paglalarawan
Pinapahintulutan ang mga subset table na malikha sa mga background na sinulid upang mapabuti ang mga dataset na nag-eeeload ng oras.

 | Mga ari - arian | Mga Detalye | 
 | :-- | :-- | 
 |   **Buhay**   | Pagsubok | 
 |   **Kasalukuyang Pagbagsak**   | totoo | 
 |   **Matagal na Tunguhin**   | totoo | 
 |   **Kasaysayan**   | Idinagdag noong 2.29.0 | 

###  **Ginagamit ang NNcMetadata ForFileTable** 

Paglalarawan
Mga Gamit NetCDF metadata upang punuin ang view ng file table. Sa partikular kung ang isang nc file ay kinabibilangan ng aktwal_range para sa bawat variable, ang dataset loading ay maaaring hindi basahin ang buong file.

 | Mga ari - arian | Mga Detalye | 
 | :-- | :-- | 
 |   **Buhay**   | Katatagan | 
 |   **Kasalukuyang Pagbagsak**   | totoo | 
 |   **Matagal na Tunguhin**   | totoo | 
 |   **Kasaysayan**   | Idinagdag noong 2.29.0 | 

##  **Sistema ng Eksperimento at Paggawi ng Core** 

###  **email Pag - iisip** 

Paglalarawan
Mga kontrol kung sinisikap ng sistema na magpadala ng aktuwal na email (e.g., para sa mga update ng suskripsiyon o maling ulat) sa pamamagitan ng nakaayos na SMTP server.

 | Mga ari - arian | Mga Detalye | 
 | :-- | :-- | 
 |   **Buhay**   | Katatagan | 
 |   **Kasalukuyang Pagbagsak**   | bulaan | 
 |   **Matagal na Tunguhin**   | totoo (Depende sa pagsasaayos ng admin)   | 
 |   **Kasaysayan**   | Pamana | 

:: Info Logic
Ang watawat na ito ay kinakalkula nang dinamiko sa startup. Hindi ito nagkakamali malibang lahat ay nangangailangan ng SMTP na mga kredensiyal (host, port, user, password, mula sa-address) ay mahigpit na inilalaan sa setup.xml.
:::

###  **palabas naLoadErrors OnStatusPage** 

Paglalarawan
Mga katiyakan kung ang detalyadong dataset na mga pagkakamali sa karga ay hayagang ipinakikita sa status page.

 | Mga ari - arian | Mga Detalye | 
 | :-- | :-- | 
 |   **Buhay**   | Katatagan | 
 |   **Kasalukuyang Pagbagsak**   | totoo | 
 |   **Matagal na Tunguhin**   | magtakda ayon sa nais | 
 |   **Kasaysayan**   | Idinagdag noong 2.25 | 

###  **Hindi Kapani - paniwalang mga Imbakan** 

Paglalarawan
Itakda ang default na pag-uugali kung ang mga talaksang pang-ilalim ng dataset ay maaaring ma-access sa serbisyo ng files.

 | Mga ari - arian | Mga Detalye | 
 | :-- | :-- | 
 |   **Buhay**   | Katatagan | 
 |   **Kasalukuyang Pagbagsak**   | bulaan | 
 |   **Matagal na Tunguhin**   | bulaan | 
 |   **Kasaysayan**   | Idinagdag noong 2.10 | 

##  **🗃️ Mga Daket** 

###  **Mabilis na Pag - alaala** 

Paglalarawan
Kung magagawa, ang sistema ay nagtatangkang magsimula nang mas mabilis sa pamamagitan ng pag - iwas sa ilang malalim na mga pagsusuri sa datasets sa panahon ng panimulang paggawa.

 | Mga ari - arian | Mga Detalye | 
 | :-- | :-- | 
 |   **Buhay**   | Katatagan | 
 |   **Kasalukuyang Pagbagsak**   | totoo | 
 |   **Matagal na Tunguhin**   | totoo | 
 |   **Kasaysayan**   | Idinagdag noong 1.38 | 

###  **pag - aayos ng ngipin** 

Paglalarawan
Mga kagamitang nagpoproseso ng datasets.xml talaksan na may isang [Kabigha - bighaning Patutot](https://commons.apache.org/proper/commons-text/apidocs/org/apache/commons/text/StringSubstitutor.html) . Marami itong gamit kabilang ang pagtatakda ng mga pribadong pamantayan (tulad ng mga password) na gumagamit ng iba't ibang kapaligiran.

 | Mga ari - arian | Mga Detalye | 
 | :-- | :-- | 
 |   **Buhay**   | Katatagan | 
 |   **Kasalukuyang Pagbagsak**   | totoo | 
 |   **Matagal na Tunguhin**   | magtakda ayon sa nais | 
 |   **Kasaysayan**   | Idinagdag noong 2.29.0 | 

###  **gumagamit ng SaxParser** 

Paglalarawan
Switchs ang panloob na makinang XML parsing upang gumamit ng SAX (Simpleng API Para sa XML) Parser sa halip ng DOM parser. Ito'y nagpapangyari ng ilang bagong makabagong katangian na gaya ng XInclude, at [kaugalian na nagpapakita ng mga katangian](https://erddap.github.io/docs/server-admin/display-info?_highlight=usesaxparser#usage-instructions) .

 | Mga ari - arian | Mga Detalye | 
 | :-- | :-- | 
 |   **Buhay**   | Pagsubok | 
 |   **Kasalukuyang Pagbagsak**   | bulaan | 
 |   **Matagal na Tunguhin**   | totoo | 
 |   **Kasaysayan**   | Idinagdag noong 2.25 | 

###  **ListPrivateDatasets** 

Paglalarawan
Mga katiyakan kung pribadong datos (yaong mga nangangailangan ng pagiging totoo) ay lumilitaw sa pangunahing listahan ng dataset.

 | Mga ari - arian | Mga Detalye | 
 | :-- | :-- | 
 |   **Buhay**   | Katatagan | 
 |   **Kasalukuyang Pagbagsak**   | bulaan | 
 |   **Matagal na Tunguhin**   | bulaan | 
 |   **Kasaysayan**   | Idinagdag sa 1.20 | 

###  **Pagkasangkot sa pulitika** 

Paglalarawan
Pagsupil kung ang mga hangganang pampolitika ay maaaring iguhit sa mga mapa.

 | Mga ari - arian | Mga Detalye | 
 | :-- | :-- | 
 |   **Buhay**   | Katatagan | 
 |   **Kasalukuyang Pagbagsak**   | totoo | 
 |   **Matagal na Tunguhin**   | totoo | 
 |   **Kasaysayan**   | Idinagdag noong 1.80 | 

##  **📂 Metadata & Standards** 

###  **pag - oopera** 

Paglalarawan
Generates at nagsisilbi FGDC (Federal Geographic Komite ng mga Data) metadata.

 | Mga ari - arian | Mga Detalye | 
 | :-- | :-- | 
 |   **Buhay**   | Katatagan | 
 |   **Kasalukuyang Pagbagsak**   | totoo | 
 |   **Matagal na Tunguhin**   | totoo | 
 |   **Kasaysayan**   | Idinagdag noong 1.38 | 

###  **iso19115 Aktibo** 

Paglalarawan
Generates at nagsisilbi sa ISO 19115 metadata.

 | Mga ari - arian | Mga Detalye | 
 | :-- | :-- | 
 |   **Buhay**   | Katatagan | 
 |   **Kasalukuyang Pagbagsak**   | totoo | 
 |   **Matagal na Tunguhin**   | totoo | 
 |   **Kasaysayan**   | Idinagdag noong 1.38 | 

###  **gamit** 

Paglalarawan
Ginagamit ang aklatan ng Apache SIS upang lumikha ng ISO 19115 metadata sa halip ng legacy generator. Kung ito ay nasa at ang paggamit ng Sisisisio19139 ay wala sa, ang default IOS 19115 metadata ay sa ISO19115_3_2016 format. Kung ito'y mali ang default format ay nasa binagong ISO19115_2 format.

 | Mga ari - arian | Mga Detalye | 
 | :-- | :-- | 
 |   **Buhay**   | Pagsubok | 
 |   **Kasalukuyang Pagbagsak**   | bulaan | 
 |   **Matagal na Tunguhin**   | totoo | 
 |   **Kasaysayan**   | Idinagdag noong 2.26 | 

###  **gamit** 

Paglalarawan
Ginagamit ang aklatan ng Apache SIS upang lumikha ng ISO19139_2007 metadata.

 | Mga ari - arian | Mga Detalye | 
 | :-- | :-- | 
 |   **Buhay**   | Pagsubok | 
 |   **Kasalukuyang Pagbagsak**   | bulaan | 
 |   **Matagal na Tunguhin**   | bulaan | 
 |   **Kasaysayan**   | Idinagdag noong 2.29.0 | 

###  **Pag - eehersisyo** 

Paglalarawan
Generates at nagsisilbi sa JSON-LD (Maugnay na Data) metadata.

 | Mga ari - arian | Mga Detalye | 
 | :-- | :-- | 
 |   **Buhay**   | Katatagan | 
 |   **Kasalukuyang Pagbagsak**   | totoo | 
 |   **Matagal na Tunguhin**   | totoo | 
 |   **Kasaysayan**   | Pamana | 

###  **Lumikha ng CroissantSchema** 

Paglalarawan
Generates "Croissant" metadata schema bilang default schema para sa pagkatuto ng makina.

 | Mga ari - arian | Mga Detalye | 
 | :-- | :-- | 
 |   **Buhay**   | Pagsubok | 
 |   **Kasalukuyang Pagbagsak**   | totoo | 
 |   **Matagal na Tunguhin**   | totoo | 
 |   **Kasaysayan**   | Idinagdag noong 2.28.0 | 

###  **Iba't ibang Uri ng Buhay** 

Paglalarawan
Ang mga inforce na variables ay dapat may isang IOOS kategorya attribute.

 | Mga ari - arian | Mga Detalye | 
 | :-- | :-- | 
 |   **Buhay**   | Katatagan | 
 |   **Kasalukuyang Pagbagsak**   | totoo | 
 |   **Matagal na Tunguhin**   | magtakda ayon sa nais | 
 |   **Kasaysayan**   | Pamana | 

###  **Kasama angNcCFSubsetVariables** 

Paglalarawan
Ang gawi ng legacy ay upang lumikha ng mga subset variables lamang para sa EDDTable FromNcCFililes datasets. Ito ay idinagdag sa default ang pag-aasal para sa EDDTable FromNcCFFililes upang maging tumutugma sa iba pang mga dataset types. Kung kailangan mo ang pamana nang kusa subsetVariables magagawa mo ito. Ang mas mabuting solusyon ay magdagdag subsetVariables sa kahulugan ng dataset.

 | Mga ari - arian | Mga Detalye | 
 | :-- | :-- | 
 |   **Buhay**   | Pagsubok | 
 |   **Kasalukuyang Pagbagsak**   | bulaan | 
 |   **Matagal na Tunguhin**   | bulaan | 
 |   **Kasaysayan**   | Idinagdag noong 2.26 | 

##  **Mga Suskripsiyon at mga Pahiwatig** 

###  **pag - aaral ng mga artikulo** 

Paglalarawan
Inilakip ang sistema ng suskripsiyon sa email para sa mga dataset update.

 | Mga ari - arian | Mga Detalye | 
 | :-- | :-- | 
 |   **Buhay**   | Katatagan | 
 |   **Kasalukuyang Pagbagsak**   | totoo | 
 |   **Matagal na Tunguhin**   | totoo | 
 |   **Kasaysayan**   | Idinagdag noong 1.14 | 

###  **subscripto SARemoteErddapDataset** 

Paglalarawan
Ipinahihintulot ito ERDDAP halimbawa ng pagsuskribe sa remote ERDDAP mga datos para sa mga update.

 | Mga ari - arian | Mga Detalye | 
 | :-- | :-- | 
 |   **Buhay**   | Katatagan | 
 |   **Kasalukuyang Pagbagsak**   | totoo | 
 |   **Matagal na Tunguhin**   | totoo | 
 |   **Kasaysayan**   | Idinagdag noong 1.70 | 

###  **mga updateSubsRsOFileChanges** 

Paglalarawan
Triggers suskripsiyon at RSS mga update kapag nagbabago ang mga saligang talaksan. Ang gawi sa pamana ay gawin lamang ang mga update sa dataset reload (na bihirang gawin linggu - linggo ng ilang server) .

 | Mga ari - arian | Mga Detalye | 
 | :-- | :-- | 
 |   **Buhay**   | Katatagan | 
 |   **Kasalukuyang Pagbagsak**   | totoo | 
 |   **Matagal na Tunguhin**   | totoo | 
 |   **Kasaysayan**   | Idinagdag noong 2.26 | 

###  **kakayahan MqttBroker** 

Paglalarawan
Sisimulan ang isang internasyunal na MQT broker na nasa loob ng aplikasyon upang pangasiwaan ang messaging.

 | Mga ari - arian | Mga Detalye | 
 | :-- | :-- | 
 |   **Buhay**   | Pagsubok | 
 |   **Kasalukuyang Pagbagsak**   | bulaan | 
 |   **Matagal na Tunguhin**   | magtakda ayon sa nais | 
 |   **Kasaysayan**   | Idinagdag noong 2.29.0 | 

###  **na inilathala ngMqtt Notif** 

Paglalarawan
Mga Kakayahan sa paglalathala ng mga patalastas (tulad ng mga pagbabago sa dataset) sa ahente ng MQTT.

 | Mga ari - arian | Mga Detalye | 
 | :-- | :-- | 
 |   **Buhay**   | Pagsubok | 
 |   **Kasalukuyang Pagbagsak**   | bulaan | 
 |   **Matagal na Tunguhin**   | magtakda ayon sa nais | 
 |   **Kasaysayan**   | Idinagdag noong 2.29.0 | 

##  **🌐 Web Headers/Configuration** 

###  **Gamitin ang mga Tagapagpagaling Para sa Url** 

Paglalarawan
Pahintulutang gumamit ng HTTP headers upang matiyak ang kahilingan na mga detalye ng URL (sa likod ng mga proxy) .

 | Mga ari - arian | Mga Detalye | 
 | :-- | :-- | 
 |   **Buhay**   | Katatagan | 
 |   **Kasalukuyang Pagbagsak**   | totoo | 
 |   **Matagal na Tunguhin**   | totoo | 
 |   **Kasaysayan**   | Ang Default ay nagbago tungo sa pagiging totoo noong 2.28.0, idinagdag noong 2.27.0 | 

###  **kakayahan Mga Cor** 

Paglalarawan
Mga Kalakip na Cross-Origin Resource Pagbabahagi (MGA COR) Mga header sa mga tugon ng HTTP.

 | Mga ari - arian | Mga Detalye | 
 | :-- | :-- | 
 |   **Buhay**   | Katatagan | 
 |   **Kasalukuyang Pagbagsak**   | bulaan | 
 |   **Matagal na Tunguhin**   | magtakda ayon sa nais | 
 |   **Kasaysayan**   | Idinagdag noong 2.26 | 

##  **🔍 Paghahanap** 

###  **paggamit ngLuceene SearchEngine** 

Paglalarawan
Switchs ang panloob na search engine upang gamitin Apache Lucene.

 | Mga ari - arian | Mga Detalye | 
 | :-- | :-- | 
 |   **Buhay**   | Pagsubok | 
 |   **Kasalukuyang Pagbagsak**   | bulaan | 
 |   **Matagal na Tunguhin**   | ? | 
 |   **Kasaysayan**   | Pamana | 

##  **Mga Serbisyo at mga Protocol** 

###  **Dumarami ang talaksan** 

Paglalarawan
Pinag-aaralan ang "Files" browser view para sa datasets na sumusuporta dito.

 | Mga ari - arian | Mga Detalye | 
 | :-- | :-- | 
 |   **Buhay**   | Katatagan | 
 |   **Kasalukuyang Pagbagsak**   | totoo | 
 |   **Matagal na Tunguhin**   | totoo | 
 |   **Kasaysayan**   | Idinagdag sa 1.58 | 

###  **Pag - opera ng mga converter** 

Paglalarawan
Mga kasangkapang pankumberte sa UI.

 | Mga ari - arian | Mga Detalye | 
 | :-- | :-- | 
 |   **Buhay**   | Katatagan | 
 |   **Kasalukuyang Pagbagsak**   | totoo | 
 |   **Matagal na Tunguhin**   | totoo | 
 |   **Kasaysayan**   | Idinagdag noong 1.44 | 

###  **Pagdulas** 

Paglalarawan
Pinagagaan ang Slide Urian.

 | Mga ari - arian | Mga Detalye | 
 | :-- | :-- | 
 |   **Buhay**   | Katatagan | 
 |   **Kasalukuyang Pagbagsak**   | totoo | 
 |   **Matagal na Tunguhin**   | totoo | 
 |   **Kasaysayan**   | Idinagdag noong 1.44 | 

###  **Pag - aalis ng datos** 

Paglalarawan
Pinag-aaralan ang anyo na nagpapahintulot sa mga data providers sa input metadata.

 | Mga ari - arian | Mga Detalye | 
 | :-- | :-- | 
 |   **Buhay**   | Katatagan | 
 |   **Kasalukuyang Pagbagsak**   | totoo | 
 |   **Matagal na Tunguhin**   | totoo | 
 |   **Kasaysayan**   | Pamana | 

###  **Walang - Hanggang Pag - aanak** 

Paglalarawan
Iniindorso ang pag-uulat ng mga out-of-date datasets.

 | Mga ari - arian | Mga Detalye | 
 | :-- | :-- | 
 |   **Buhay**   | Katatagan | 
 |   **Kasalukuyang Pagbagsak**   | totoo | 
 |   **Matagal na Tunguhin**   | totoo | 
 |   **Kasaysayan**   | Idinagdag noong 1.82 | 

###  **Pag - eehersisyo** 

Paglalarawan
Inilakip ang Palingkuran sa Web Mapa ( WMS ) interface.

 | Mga ari - arian | Mga Detalye | 
 | :-- | :-- | 
 |   **Buhay**   | Katatagan | 
 |   **Kasalukuyang Pagbagsak**   | totoo | 
 |   **Matagal na Tunguhin**   | totoo | 
 |   **Kasaysayan**   | Idinagdag noong 1.44 | 

###  **Pag - eehersisyo** 

Paglalarawan
Pinagagaan ang loob WMS Nagtatampok ang kliyente.

 | Mga ari - arian | Mga Detalye | 
 | :-- | :-- | 
 |   **Buhay**   | Katatagan | 
 |   **Kasalukuyang Pagbagsak**   | totoo | 
 |   **Matagal na Tunguhin**   | totoo | 
 |   **Kasaysayan**   | Pamana | 

###  **" geoservicesRestActive "** 

Paglalarawan
Inilakip ang RESTful Disface for Geospatial Services. Hindi lubusang ipinatupad.

 | Mga ari - arian | Mga Detalye | 
 | :-- | :-- | 
 |   **Buhay**   | Sa Ilalim ng Pagtatayo | 
 |   **Kasalukuyang Pagbagsak**   | bulaan (Matatag)   | 
 |   **Matagal na Tunguhin**   | totoo | 

###  **Pag - eehersisyo** 

Paglalarawan
Pinag - aaralan ang Serbisyo ng Web Pagtatakip ( WCS ) interface. Hindi lubusang ipinatupad.

 | Mga ari - arian | Mga Detalye | 
 | :-- | :-- | 
 |   **Buhay**   | Sa Ilalim ng Pagtatayo | 
 |   **Kasalukuyang Pagbagsak**   | bulaan (Matatag)   | 
 |   **Matagal na Tunguhin**   | totoo | 

###  **pag - abuso sa droga** 

Paglalarawan
Ang Sensor Observation Service ( SOS ) interface.

 | Mga ari - arian | Mga Detalye | 
 | :-- | :-- | 
 |   **Buhay**   | Sa Ilalim ng Pagtatayo | 
 |   **Kasalukuyang Pagbagsak**   | bulaan (Matatag)   | 
 |   **Matagal na Tunguhin**   | totoo | 
