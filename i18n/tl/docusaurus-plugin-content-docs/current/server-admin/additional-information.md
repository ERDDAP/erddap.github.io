ERDDAP™- Iayos ang Iyong SariliERDDAP™    

## Mga Bagay na Kailangan Mong Malaman{#things-you-need-to-know} 
     
###    **[Mga Pagkakamali sa Error](#proxy-errors)**  {#proxy-errors} 
Kung minsan, isang kahilinganERDDAP™ay magbabalik ng error sa Error, HTTP 502 Bad Gateway Error, o ilang katulad na pagkakamali. Ang mga pagkakamaling ito ay itinatapon ng Apache o Tomcat, hindiERDDAP™mismo.
* Kung ang bawat kahilingan ay lumilikha ng mga pagkakamaling ito, lalo na kapag ginagawa mo muna ang iyong mga pagkakamaliERDDAP™, kung gayon ito marahil ay isang proxy o masamang pagkakamali sa pintuang - daan, at malamang na ang solusyon ay ayusin[ERDDAP' Mga proxy setting](/docs/server-admin/deploy-install#proxypass). Maaari ring ito ang problema kapag naitatag naERDDAP™Biglang - biglang inihagis ang mga pagkakamaling ito para sa bawat kahilingan.
* Kung hindi, ang mga pagkakamaling "proxy" ay karaniwang aktuwal na naglalabas ng mga pagkakamaling inihagis ng Apache o Tomcat. Kahit na kung ito ay mabilis na mangyari, ito ay isang uri ng pagtugon mula sa Apache o Tomcat na nangyayari kapag ito ay nangyariERDDAP™ay napaka-abala, memory-limited, o nililimitahan ng ilang mga mapagkukunan. Sa mga kasong ito, tingnan ang payo sa ibaba na dapat pakitunguhan[ERDDAP™mabagal na pagtugon](#responding-slowly).
        
Matagal na mga kahilingan (&gt;30 puntos ng oras) mula sa isang nakatiklop na dataset ay malamang na i - time ang mga kabiguan, na kadalasang lumilitaw bilang mga pagkakamali, sapagkat nangangailangan ng malaking panahon para ritoERDDAP™upang buksan ang lahat ng data files one-by-one. KungERDDAP™sa panahon ng kahilingan, ang problema ay malamang na mangyari. Kung ang mga file ng dataset ay siksik, ang problema ay mas malamang na mangyari, bagaman mahirap para sa gumagamit na malaman kung ang mga file ng dataset ay siksik.
Ang solusyon ay gumawa ng ilang kahilingan, na bawat isa ay may mas maliit na time range. Gaano kaliit ang panahon? Iminumungkahi ko ang pagsisimula na talagang maliit (~30 time points?) , pagkatapos (Mga bandang) Madoble ang haba ng panahon hanggang sa mabigo ang kahilingan, pagkatapos ay ulitin ang isa na doble. Pagkatapos ay gawin ang lahat ng kahilingan (bawat isa sa iba't ibang haba ng panahon) Kailangang makuha ang lahat ng impormasyon.
IsaERDDAP™Maaaring bawasan ng administrador ang problemang ito sa pamamagitan ng pagdaragdag ng[Mga timeout setting ng Apache](/docs/server-admin/deploy-install#apache-timeout).
        
### Pagsusuri{#monitoring} 
Nais naming lahat na hanapin ang aming mga data service upang makita ang kanilang mga tagapakinig at magamit nang malawakan, subalit kung minsan ang inyongERDDAP™ay maaaring gamitin nang labis, na nagiging sanhi ng mga problema, pati na ang napakamabagal na pagtugon sa lahat ng kahilingan. Ang plano nating iwasan ang mga problema ay:

* MonitorERDDAP™sa pamamagitan ng[status.html web page](#status-page).
Mayroon itong tone - toneladang kapaki - pakinabang na impormasyon. Kung makita mo na maraming kahilingan ang dumarating, o tone - toneladang memorya ang ginagamit, o tone - toneladang bigong mga kahilingan, o ang bawat isa ay kumukuha ng mahabang panahon, o nakikita mo ang anumang tanda ng mga bagay na nahuhulog at tumutugon nang dahan - dahan, pagkatapos ay tumitingin kaERDDAP'[log.txt file](#log)upang alamin kung ano ang nangyayari.
    
Kapaki - pakinabang din na pansinin kung gaano kabilis tumutugon ang status page. Kung ito'y tutugon nang dahan - dahan, iyan ay isang mahalagang palatandaan naERDDAP™ay totoong magawain.
    
* MonitorERDDAP™sa pamamagitan ng[Pang - araw - araw na Report](#daily-report)email.
     
* Bantayan ang mga out-of-date dataset sa pamamagitan ng *base Url* /erddap/outOfDateDatasets.htmlweb page na batay sa opsyonal na pahina[testOutOfDate](/docs/server-admin/datasets#testoutofdate)pangglobong katangian.
     
#### Iba Pang mga Monitor{#external-monitors} 
Ang mga pamamaraang nakatala sa itaas ayERDDAP'Ang mga paraan ng pagsubaybay sa sarili. Posible rin na gumawa o gumamit ng panlabas na mga sistema upang subaybayan ang iyong mga sistemaERDDAP. Ang isang proyekto upang gawin ito ay[Ang proyektong erddap-metrics ni Axiom](https://github.com/axiom-data-science/erddap-metrics). Ang gayong panlabas na mga sistema ay may ilang bentaha:
* Ang mga ito ay maaaring baguhin upang maglaan ng impormasyon na nais mo, na ipinakikita sa paraan na nais mo.
* Maaaring kasama rito ang impormasyon tungkol saERDDAP™yaon pangERDDAP™Hindi madaling ma-access o kaya (halimbawa, paggamit ng CPU, disk free space,ERDDAP™oras ng pagtugon gaya ng makikita sa pangmalas ng gumagamit,ERDDAP™oras,
* Makapagbibigay ito ng babala (Mga email, tawag sa telepono, teksto) sa mga administrador kapag ang mga problema ay nakahihigit sa ilang bagay.
             
### Maraming Simula Mga Kahilingan{#multiple-simultaneous-requests} 
*    **Ang mga gumagamit ng Blacklist ay sabay - sabay na humihiling&#33;** 
Kung maliwanag na ang ilang gumagamit ay gumagawa ng mahigit sa isang sabay - sabay na kahilingan, nang paulit - ulit at patuluyan, saka idagdag ang kanilang direksiyon ng IPERDDAP[ Mga]&lt;[Talaksan] (/docs/server-admin/datasets#requestblacklist) sa iyongdatasets.xmltalaksan. Kung minsan ang mga kahilingan ay mula sa isang direksiyon ng IP. Kung minsan ang mga ito ay mula sa multiple IP addresss, subalit maliwanag na iisa ang gumagamit nito. Maaari ka ring maging blacklist na mga tao na gumagawa ng tone - toneladang walang bisang mga kahilingan o tone - toneladang mental-numerong mga kahilingan.
    
Pagkatapos, sa bawat kahilingan nila,ERDDAP™ay nagbabalik:
    
    > HTTP ERROR 403 - Access Forbidden --  
    > Your IP address is on this ERDDAP's request blacklist.  
    > Did you often submit more than one request at a time?  
    > Did you often submit identical requests in a short period of time?  
    > Did you submit a large number of invalid requests?  
    > If you are ready to avoid these problems, please email \\[ERDDAP™ administrator's email address\\] to request to be taken off of the blacklist.
    
Sana'y makita ng gumagamit ang mensaheng ito at makipag - ugnayan sa inyo upang malaman kung paano aayusin ang problema at makawala sa talaan ng mga itim. Kung minsan, inililipat lamang nila ang mga IP address at sinusubukang muli.
    
Ito'y tulad ng balanse ng kapangyarihan sa pagitan ng nakasasakit at defensive na mga sandata sa digmaan. Dito, ang mga sandatang pandepensa (ERDDAP) may nakatakdang kapasidad, limitado sa dami ng core sa CPU, ang disk access bandwidth, at ang network bandwidth. Subalit ang nakayayamot na mga sandata (gumagamit, partikular na ang mga iskrip) may walang takdang kapasidad:
    
    * Ang isang kahilingan para sa datos mula sa maraming time point ay maaaring maging sanhiERDDAPupang magbukas ng napakaraming files (sa pagkakasunud-sunod o bahagyang multi-threaded) . Sa sukdulang mga kaso, ang isang "simpleng" kahilingan ay maaaring madaling magtali ng RAID na nakakabit sa RAIDERDDAP™sa loob ng isang minuto, mabisang hinahadlangan ang pangangasiwa sa iba pang mga kahilingan.
         
    * Ang isang kahilingan ay maaaring umubos ng maraming alaala (bagamanERDDAP™ay may kodigo upang bawasan ang memoryang kailangan upang matugunan ang malalaking kahilingan) .
         
    * Pagkakatulad -
Madali para sa isang matalinong gumagamit na ihanay ang isang malaking gawain sa pamamagitan ng paggawa ng maraming sinulid, na bawat isa ay may hiwalay na kahilingan (na maaaring malaki o maliit) . Ang paggawing ito ay pinasisigla ng komunidad ng siyensiya sa computer bilang isang mahusay na paraan ng paglutas sa isang malaking problema (at ang paghahambing ay mabisa sa ibang kalagayan) . Pagbabalik sa paghahambing sa digmaan: ang mga gumagamit ay maaaring gumawa ng halos walang takdang bilang ng sabay - sabay na mga kahilingan na ang halaga ng bawat isa ay sero, subalit ang halaga ng bawat kahilingan ay pumapasokERDDAP™ay maaaring malaki atERDDAP'Ang kakayahang tumugon ay may hangganan. Maliwanag,ERDDAP™ay matatalo sa labanang ito, malibang angERDDAP™Ang mga gumagamit ng administrator blacklists na gumagawa ng maramihang sabay - sabay na mga kahilingan na di - makatarungang sumisira sa ibang gumagamit.
         
    * Maraming Eskripts -
Ngayon ay pag - isipan kung ano ang nangyayari kapag may ilang matatalinong tagagamit na ang bawat isa'y tumatakbo nang magkakaagapay. Kung ang isang gumagamit ay maaaring lumikha ng napakaraming kahilingan anupa't ang ibang gumagamit ay nasasakal na, kung gayon ang maraming gumagamit nito ay maaaring lumikha ng napakaraming kahilingan anupa't ang iba ay gumagamit nitoERDDAP™ay nadaraig at waring hindi tumutugon. Ito ay mabisang isang[Pagsalakay ng DDOS](https://en.wikipedia.org/wiki/Denial-of-service_attack)Muli, ang tanging depensa para saERDDAP™ay sa mga gumagamit ng blacklist na gumagawa ng maramihang sabay - sabay na mga kahilingan na di - makatarungang sumasakop sa ibang gumagamit.
         
    * Mga Inaasahan
Sa daigdig na ito ng malalaking kompanya ng teknolohiya (Amazon, Google, Facebook, ...) , ang mga gumagamit ay umaasa ng walang - takdang mga kakayahan mula sa mga tagapaglaan. Yamang ang mga kompanyang ito ay gumagawa ng salapi sa paggawa ng mga operasyon, mientras mas maraming gumagamit nito, mas maraming kita ang kailangan nila upang palawakin ang kanilang IT imprastraktura. Kaya makabibili sila ng napakalaking imprastrakturang ITIL upang matugunan ang mga kahilingan. At may katalinuhang tinatakdaan nila ang bilang ng mga kahilingan at halaga ng bawat kahilingan mula sa mga gumagamit sa pamamagitan ng pagtatakda sa mga uri ng kahilingan na magagawa ng mga gumagamit upang walang isa mang kahilingan ang maging pabigat, at walang dahilan kailanman (o isang paraan) upang ang mga gumagamit ay makagawa ng maraming sabay - sabay na mga kahilingan. Kaya ang pagkalaki - laking mga kompaniyang ito ng teknolohiya ay maaaring mas maraming gumagamit kaysa mga gumagamit nitoERDDAP™, ngunit mas marami silang kakayahan at matatalinong paraan upang limitahan ang mga kahilingan mula sa bawat gumagamit. Ito'y isang maalwang kalagayan para sa malalaking kompanyang IT (at sila'y yumayaman&#33;) ngunit hindi para saERDDAP™mga instalasyon. Muli, ang tanging depensa para saERDDAP™ay sa mga gumagamit ng blacklist na gumagawa ng maramihang sabay - sabay na mga kahilingan na di - makatarungang sumasakop sa ibang gumagamit.
         
    
Kaya't mga gumagamit: Huwag gumawa ng maraming sabay - sabay na mga kahilingan o ikaw ay ililista&#33;
     

Maliwanag, pinakamabuti kung ang iyong server ay maraming ubod, maraming alaala (upang makapag - ukol ka ng maraming alaalaERDDAP™, higit kaysa kinakailangan nito) , at isang mataas na koneksiyon ng bandwidth internet. Pagkatapos, ang memorya ay bihira o hindi kailanman isang limitadong salik, subalit ang network bandwidth ay nagiging ang mas karaniwang salik na nagtatakda. Karaniwan na, habang parami nang parami ang sabay - sabay na humihiling, ang bilis sa sinumang gumagamit ay umuunti. Iyan ay natural na nagpapabagal sa dami ng mga kahilingan na dumarating kung bawat gumagamit ay isa - isang humihiling.
    
### ERDDAP™Pagkuha ng Data sa THEDDS{#erddap-getting-data-from-thredds} 
Kung ikaw ayERDDAP™ang ilan sa mga impormasyon nito mula sa THREDDS sa inyong site, may ilang bentaha sa paggawa ng isang kopya ng THEDDS data files (Sa paano man para sa pinakapopular na datasets) sa isa pang RAID na iyonERDDAP™magagamit upangERDDAP™ay maaaring tuwirang magsilbi ng datos mula sa mga file. NasaERD, ginagawa natin iyan para sa ating pinakapopular na datasets.

*   ERDDAP™ay maaaring direktang makuha ang datos at hindi na kailangang maghintay pa ng THEDDS upang muling maikarga ang dataset o ...
*   ERDDAP™ay maaaring makapansin at maglakip agad ng bagong data files, kaya hindi na kailangang madalas na pambalana ng THEDDS upang makita kung nagbago na ang dataset. Tingnan [&lt;update EveryNMillis&gt;] (/docs/server-admin/datasets#update percentillis) .
* Ang karga ay nahahati sa pagitan ng 2 RAIDS at 2 servers, sa halip na ang kahilingan ay matigas sa dalawang itoERDDAP™at MGA THED.
* Iniiwasan mo ang problema sa di - kanais - nais na sakit na dulot ng THEDDS na may maliit na anak (sa pamamagitan ng default) Napakalaking kahilingan.ERDDAP™ay may sistema upang lutasin ang pagkakamali, subalit ang pag - iwas sa problema ay mas mabuti.
* Mayroon kang backup na kopya ng datos na laging isang mabuting ideya.

Sa anumang kaso, huwag kailanman tatakbo ng THEDDS atERDDAP™sa Tomcat ding iyon. Itakbo ang mga ito sa magkahiwalay na Tomcats, o mas mabuti, sa magkahiwalay na servers.

Nasusumpungan natin na ang THEDDS ay paminsan - minsang napapauwi sa kalagayan kung saan ang mga kahilingan ay basta na lamang nakabitin. Kung ikaw ayERDDAP™Nakakakuha ng datos mula sa THEDDS at ang THEDDS ay nasa estadong ito,ERDDAP™may depensa (sabi nito na ang THREDS-based dataset ay hindi magagamit) , subalit mahirap pa rin ito para saERDDAP™sapagkatERDDAP™ay kailangang maghintay hanggang sa oras sa tuwing sisikapin nitong ikarga muli ang isang dataset mula sa isang nakabiting THEDDS. Ilang grupo (kasamaERD) Iwasan ito sa pamamagitan ng madalas na pagdaragdag ng THEDDS (e.g., panggabi sa isang trabaho) .

### Dahan - dahang Tumugon{#responding-slowly} 
*    **KungERDDAP™Ang Pagtugon ay Mabagal** o kung ang ilang kahilingan ay tumutugon nang dahan - dahan,
maaaring malaman mo kung ang kabagalan ay makatuwiran at pansamantala (e.g., dahil sa maraming kahilingan mula sa mga iskrip oWMSgumagamit) , o kung may di - maipaliwanag na pagkakamali at kailangan mong gawin[isara at ulitin ang Tomcat atERDDAP™](#shut-down-and-restart).
    
KungERDDAP™ay ang mabagal na pagtugon, tingnan ang payo sa ibaba upang alamin ang sanhi, na inaasahang tutulong sa iyo na malutas ang problema.
Maaaring mayroon kang espesipikong pasimula (e.g., isang espesipikong kahilingan sa URL) o isang malabong pasimula (e.g.,ERDDAP™ay mabagal) .
Maaaring kilala mo ang gumagamit na nasasangkot (e.g., sapagkat sila'y nag - email sa iyo) , o hindi.
Maaaring mayroon kang ibang himaton, o wala.
Yamang ang lahat ng mga kalagayang ito at ang lahat ng posibleng sanhi ng mga problema ay malabo sa isa't isa, ang payo sa ibaba ay nagsisikap na harapin ang lahat ng posibleng panimulang mga punto at lahat ng posibleng mga problema na nauugnay sa mabagal na pagtugon.
    
    *    **Hanapin ang mga clue[ERDDAP's log file](#log)**   ( *Malaking Direktoryo* /log/log.txt) .
        \\[Sa bihirang mga okasyon, may mga himaton sa[log file ni Tomcat](#tomcat-logs)  ( *tomcat* /logs/catalina.out) .\\]  
Hanapin ang maling mga mensahe.
Humanap ng maraming kahilingan mula sa isa (o ilan) mga gumagamit at marahil dino - hogging ang karamihan ng mga gamit ng iyong server (memory, CPU panahon, disk access, internet bandwidth) .
        
Kapag may problema **isang gumagamit** , madalas na makakakuha ka ng pahiwatig kung sino ang gumagamit nito sa pamamagitan ng mga serbisyong web gaya ng[ https://whatismyipaddress.com/ip-lookup ](https://whatismyipaddress.com/ip-lookup)na makapagbibigay sa inyo ng impormasyong may kaugnayan sa direksiyon ng IP ng gumagamit (na makikita moERDDAP'[log.txt](#log)talaksan) .
        
        * Kung ang gumagamit ay waring isang tagagamit **bot** Masamang paggawi (Kapansin - pansin, isang search engine na nagsisikap na punuin ang makinaERDDAP™ay nabubuo sa bawat posibleng permutasyon ng mga pagpapahalaga sa pagpasok) , tiyakin na tama ang pagkakalagay mo sa iyong server[Mga robot.txt](#robotstxt)talaksan.
        * Kung ang gumagamit ay waring isang tagagamit **Sulat (s) ** na gumagawa ng maraming sabay - sabay na paghiling, makipag - ugnayan sa gumagamit, ipaliwanag na ang iyong mga kahilinganERDDAP™may limitadong kakayahan (e.g., alaala, oras ng CPU, disk access, internet bandwidth) , at hilingin sa kanila na sila'y maging makonsiderasyon sa iba pang gumagamit at hilingin lamang ang isang pagkakataon. Puwede mo ring banggitin na i - blacklist mo sila kapag hindi sila umatras.
        * Kung ang gumagamit ay waring isang tagagamit **Sulat** gumagawa ng malaking bilang ng time-consuming na mga kahilingan, hilingin sa gumagamit na maging makonsiderasyon sa iba pang mga gumagamit sa pamamagitan ng paglalagay ng isang maliit na paghinto (2 segundo?) sa iskrip sa pagitan ng mga kahilingan.
        *    **WMSsoftware ng kliyente** ay maaaring maging napakahirap. Ang isang kliyente ay kadalasang hihingi ng 6 na mga larawang pang - kaugalian sa isang panahon. Kung ang gumagamit ay waring isang tagagamitWMSAng kliyente na gumagawa ng lehitimong mga kahilingan, maaari mong sabihin:
            * Huwag itong pansinin. (mungkahi, sapagkat sila'y kikilos agad) 
            * Patayin ang iyong serverWMSserbisyo sa pamamagitan ngERDDAP'Ang setup.html file. (hindi inirerekomenda) 
        * Kung waring may mga kahilingan **Katanga, baliw, labis - labis, o may masamang hangarin,** o kung hindi mo malutas ang problema sa ibang paraan, isaalang - alang pansamantala o permanenteng idagdag ang IP address ng gumagamit sa [&lt;kahilingan ng blacklist&gt; sa inyongdatasets.xmltalaksan] (/docs/server-admin/datasets#requestblacklist) .
             
    *    **Sikaping tularan mismo ang problema, mula sa iyong computer.**   
Tingnan kung ang problema ay may isang dataset o lahat ng dataset, para sa isang user o lahat ng gumagamit, para sa ilang uri lamang ng mga kahilingan, atbp.
Kung matutularan mo ang problema, sikaping bawasan ang problema.
Kung hindi mo magaya ang problema, kung gayon ang problema ay maaaring nakatali sa computer ng gumagamit, sa koneksiyon ng internet ng gumagamit, o sa koneksiyon ng internet ng inyong institusyon.
         
    * Kung basta **isang dataset** ang mabagal na pagtugon (marahil para lamang sa **isang uri ng kahilingan** mula sa isang gumagamit) , ang problema ay maaaring:
        *   ERDDAP'access ang source data' (Partikular na mula sa mga kaugnay na database, Cassandra, at mga remote dataset) ay maaaring pansamantala o permanenteng mabagal. Sikaping suriin ang bilis ng pinagmumulan nito nang hiwalay saERDDAP. Kung ito ay mabagal, marahil ay mapasusulong mo pa ito.
        * May kaugnayan ba ang problema sa espesipikong kahilingan o pangkalahatang uri ng kahilingan?
Mientras mas malaki ang hinihiling na subset ng isang dataset, mas malamang na mabigo ang kahilingan. Kung ang gumagamit ay gumagawa ng malalaking kahilingan, hilingin sa gumagamit na gumawa ng mas maliliit na kahilingan na mas malamang na makakuha ng mabilis at matagumpay na pagtugon.
            
Halos lahat ng mga data set ay mas mahusay sa paghawak ng ilang uri ng mga kahilingan kaysa sa iba uri ng mga kahilingan. Halimbawa, kapag ang isang dataset ay nag - iimbak ng iba't ibang time crew sa iba't ibang file, ang mga kahilingan para sa impormasyon mula sa napakaraming time point ay maaaring napakabagal. Kung mahirap ang kasalukuyang mga kahilingan, isaalang - alang ang pag - aalok ng iba't ibang impormasyon na tamang - tama para sa mga kahilingang ito. O basta ipaliwanag sa gumagamit na ang gayong uri ng kahilingan ay mahirap at umuubos ng panahon, at hilingin ang kanilang pagtitiis.
            
        * Ang dataset ay maaaring hindi maganda ang pagkakaayos. Maaari kang gumawa ng mga pagbabago sa dataset'sdatasets.xmlHumingi ng tulongERDDAP™Mas mabuting hawakan ang dataset. Halimbawa,
            
            *   EDDGridMula saNcFiles datasets na nag-access ng datos mula sa siksik na nc4/hdf5 files ay mabagal kapag nakuha ang datos para sa buong heograpikong saklaw (e.g., para sa mapa ng daigdig) sapagkat ang buong talaksan ay dapat na i - decompressed. Maaari mong ikumberte ang mga files sa mga talaksang hindi nai-compressed, ngunit pagkatapos ang disk space kahilingan ay magiging mas malaki, mas malaki. Malamang na mas mabuting tanggapin na ang gayong mga dataset ay magiging mabagal sa ilang kalagayan.
            * Ang kaayusan ng [&lt;subsetVariables&gt;] (/docs/server-admin/datasets#subsetvariables) Malaki ang impluwensiya ng tag sa kung paanoERDDAP™humahawak ng EDDTable datasets.
            * Maaari mong dagdagan ang[Bilis ng Isang EDDTable FromDatabase](/docs/server-admin/datasets#database-speed)datos.
            * Maraming EDDTTable datasets ay maaaring pabilisin ng[pag - iimbak ng isang kopya ng impormasyon saNetCDFKombinatorikang mga talaksang Array](/docs/server-admin/datasets#eddtablefromfiles), naERDDAP™ay madaling basahin.
            
Kung nais mo ng tulong upang pabilisin ang isang espisipikong dataset, isama ang paglalarawan ng problema at ang dataset's scoredatasets.xmlat tingnan ang ating[sa pagkuha ng karagdagang suporta](/docs/intro#support).
             
    * Kung **lahat** sa loobERDDAP™ay **Lagi** mabagal, ang problema ay maaaring:
        * Ang computer na tumatakboERDDAP™ay maaaring walang sapat na memorya o lakas ng pagpoproseso. Mabuting tumakboERDDAP™sa isang moderno at multi-core server. Para sa mabigat na paggamit, ang server ay dapat magkaroon ng 64-bit operating system at 8 GB o higit pa na memorya.
        * Ang computer na tumatakboERDDAP™ay maaaring nagpapatakbo rin ng iba pang mga aplikasyon na umuubos ng maraming yaman ng sistema. Kung gayon, makakakuha ka ba ng isang nakaalay na server para saERDDAP? Halimbawa (ito ay hindi isang pagsang - ayon) , makakakuha ka ng quad-core Mac Mini Server na may 8 GB ng memorya para sa ~$1100.
             
    * Kung **lahat** sa loobERDDAP™ay **pansamantalang** mabagal, malasin ang iyong sariliERDDAP'[ **/erddap/status.htmlpahina** ](#status-page)sa iyong browser.
        * Gawin angERDDAP™hindi maikarga ang status page?
Kung oo,[restartERDDAP™](#shut-down-and-restart).
        * Ginawa NiyaERDDAP™kalagayan sa pahina marahang pagkarga (e.g., &gt;5 segundo) ?
Iyan ay isang tanda na ang lahat ng naroroonERDDAP™ay mabagal tumakbo, subalit hindi naman ito mapanganib.ERDDAP™ay maaaring maging abala lamang.
        * Para sa "Gumanti ng Bigong Panahon (mula noong huling pangunahing mga PackDataset) ", malaki ba ang bilang ng n=?
Ipinahihiwatig niyan na maraming bigong mga kahilingan kamakailan. Iyan ay maaaring maging problema o pasimula ng problema. Ang median time para sa mga kabiguan ay kadalasang malaki (e.g., 2100 ms) ,
na nangangahulugang may (gayon nga?) maraming aktibong sinulid.
na nagkakabit ng maraming gamit (tulad ng memory, bukas na files, bukas na mga saket, ...) ,
Na hindi mabuti.
        * Para sa "Natagumpay na Panahon " (mula noong huling pangunahing mga PackDataset) ", malaki ba ang bilang ng n=?
Ipinakikita niyan na maraming matagumpay na mga kahilingan kamakailan. Hindi ito problema. Nangangahulugan lamang ito ng iyongERDDAP™ay malakas na ginagamit.
        * Ang "Numero ba ng mga hindi-Tomcat- naghihintay na sinulid" ay doble ng karaniwang halaga?
Ito ay kadalasang malubhang problema na magiging sanhiERDDAP™na maghinay - hinay at sa wakas ay magyeyelo. Kung magpapatuloy ito sa loob ng ilang oras, baka naisin mong maging aktibo[restartERDDAP™](#shut-down-and-restart).
        * Sa ibaba ng talaang "Memory Use Smarcied", ang huli ba ay "Memory: kasalukuyang ginagamit ang "halagang napakataas"?
Baka iyan ay nagpapahiwatig lamang ng madalas na paggamit, o maaaring ito'y isang tanda ng problema.
        * Tingnan ang talaan ng mga sinulid at ang kanilang katayuan. Ang di - pangkaraniwang bilang ba nila ay gumagawa ng isang bagay na di - pangkaraniwan?
             
    * Ay **Ang koneksiyon ng inyong institusyon sa internet** kasalukuyang mabagal?
Hanapin ang internet para sa "internet speed test" at gamitin ang isa sa mga libreng online tests, tulad ng[ https://www.speakeasy.net/speedtest/ ](https://www.speakeasy.net/speedtest/). Kung ang koneksiyon sa internet ng inyong institusyon ay mabagal, kung gayon ang mga koneksiyon sa pagitan ng mga itoERDDAP™at ang mga mapagkukunan ng impormasyon sa malayo ay magiging mabagal, at ang mga koneksiyon sa pagitan ngERDDAP™at ang gumagamit ay magiging mabagal. Kung minsan, malulutas mo ito sa pamamagitan ng paghinto sa di - kinakailangang paggamit ng internet (e.g., mga taong nanonood ng mga video o ng mga video conference) .
         
    * Ay **koneksyon ng gumagamit ng internet** kasalukuyang mabagal?
Ipahanap sa user ang internet para sa "internet speed test" at gamitin ang isa sa mga libreng online tests, tulad ng[ https://www.speakeasy.net/speedtest/ ](https://www.speakeasy.net/speedtest/). Kung mabagal ang koneksiyon ng internet ng gumagamit, nagpapabagal ito sa kanilang pagpasokERDDAP. Kung minsan, malulutas nila ito sa pamamagitan ng paghinto sa di - kinakailangang paggamit ng internet sa kanilang institusyon (e.g., mga taong nanonood ng mga video o ng mga video conference) .
         
    *    **Natulala?**   
Tingnan ang[sa pagkuha ng karagdagang suporta](/docs/intro#support).

### Itapon at Ipahinga{#shut-down-and-restart} 
*    **Kung Paano Patatahimikin at Ipahinga ang Tomcat atERDDAP™**   
Hindi mo kailangang magsara at mag - restart ng Tomcat atERDDAPkung gayonERDDAP™ay pansamantalang mabagal, mabagal sa ilang kilalang kadahilanan (gaya ng maraming kahilingan mula sa mga iskrip oWMSgumagamit) , o ikapit ang mga pagbabago sadatasets.xmltalaksan.
    
Kailangan mo talagang magsara at mag - restart Tomcat atERDDAP™kung kailangan mong maglagay ng mga pagbabago sa setup.xml file, o kung kailangan mong maglagay ngERDDAP™Nagyeyelo, nakabitin, o nakakandado. Sa sukdulang mga kalagayan,Javaay maaaring magyeyelo sa loob ng isa o dalawang minuto habang ginagawa nito ang isang ganap na koleksiyon ng basura, subalit pagkatapos ay gagaling. Kaya makabubuting maghintay ng isa o dalawang minuto upang makita kungJava/ERDDAP™ay talagang nagyeyelo o kung ito ay gumagawa lamang ng mahabang koleksiyon ng basura. (Kung ang pangongolekta ng basura ay isang karaniwang problema,[Maglaan ng higit na memorya kay Tomcat](/docs/server-admin/deploy-install#memory).) 
    
Hindi ko inirerekomenda ang paggamit ng Tomcat Web Rescription Manler upang simulan o sirain ang Tomcat. Kung hindi mo lubusang aalisin at sisimulan ang Tomcat, sa malao't madali ay magkakaroon ka ng mga isyu sa memorya ng PermGen.
    
Pag - alis at Muling Pag - aayos ng Tomcat atERDDAP:
    
    * Kung gumagamit ka ng Linux o ng isang Mac:
         (Kung nakalikha ka na ng isang pantanging tagagamit upang patakbuhin ang Tomcat, e.g., tomcat, tandaan na gawin ang sumusunod na hakbang bilang gumagamit na iyon.)   
         
        1. Gumamit ng cd *tomcat* /bin
             
        2. Gumamit ng ps -ef|Tumugtog upang hanapin ang java/tomcat ID (Inaasahan, isang proseso lamang ang nakatala) , na tatawagin natin *javaProcessID* sa ibaba.
             
        3. KungERDDAP™ay frozen/hung/locked up, gamitin ang kill -3 *javaProcessID* upang magsumbongJava  (na tumatakbo sa Tomcat) upang gawin ang pagtapon ng sinulid sa log file ng Tomcat: *tomcat* /logs/catalina.out . Pagkatapos mong mag - reboot, maaari mong suriin ang problema sa pamamagitan ng paghanap sa sinulid na magtambak ng impormasyon (at iba pang kapaki - pakinabang na impormasyon sa itaas nito) sa loob *tomcat* /logs/catalina.out at pati na rin sa pagbabasa ng mga kaugnay na bahagi ng[ERDDAP™arkibo ng troso](#log). Kung nais mo, maaari mong isama ang impormasyong iyan at tingnan ang ating[sa pagkuha ng karagdagang suporta](/docs/intro#support).
             
        4. Gamitin ang ./shutdown. sh
             
        5. Gumamit ng ps -ef|Ang grep tomcat ay paulit-ulit hanggang ang java/tomcat proseso ay hindi nakalista.
            
Kung minsan, ang java/tomcat proseso ay gugugol ng hanggang dalawang minuto upang lubusang magsara. Ang dahilan ay:ERDDAP™ay nagpapadala ng mensahe sa likuran nito upang sabihin sa kanila na huminto, subalit kung minsan ay inaabot ng mahabang panahon ang mga sinulid na ito upang makarating sa isang mabuting dakong pahingahan.
            
        6. Kung pagkalipas ng mga isang minuto, ang java/tomcat ay hindi humihinto sa ganang sarili, magagamit mo ito
-9 *javaProcessID*   
upang pilitin ang java/tomcat proseso na huminto kaagad. Kung maaari, gamitin lamang ito bilang huling paraan. Ang -9 switch ay malakas, ngunit ito ay maaaring magdulot ng iba't ibang problema.
             
        7. Upang makapagpahingang muliERDDAP™, gamitin ang ./startup.sh
             
        8. PangmalasERDDAP™sa inyong browser upang tiyakin na ang natitirang bahagi ay nagtagumpay. (Kung minsan, kailangan mong maghintay ng 30 segundo at sikaping magkargaERDDAP™sa iyong browser upang ito ay magtagumpay.)   
             
    * Kung gumagamit ka ng Windows:
         
        1. Gumamit ng cd *tomcat* /bin
             
        2. Gamitinshutdown.bat  
             
        3. Baka gusto mo/kailangan mong gamitin ang Windows Task Manler (Makukuha sa pamamagitan ng Ctrl Alt Del) upang tiyakin na angJava/Tomcat/ERDDAP™Ang proseso/application ay lubos na tumigil.
Kung minsan, ang proseso/application ay gugugol ng hanggang dalawang minuto upang magsara. Ang dahilan ay:ERDDAP™ay nagpapadala ng mensahe sa likuran nito upang sabihin sa kanila na huminto, subalit kung minsan ay inaabot ng mahabang panahon ang mga sinulid na ito upang makarating sa isang mabuting dakong pahingahan.
             
        4. Upang makapagpahingang muliERDDAP™, gamitin ang startup.bat
             
        5. PangmalasERDDAP™sa inyong browser upang tiyakin na ang natitirang bahagi ay nagtagumpay. (Kung minsan, kailangan mong maghintay ng 30 segundo at sikaping magkargaERDDAP™sa iyong browser upang ito ay magtagumpay.)   
             
### Madalas na Pagbagsak o Pagkalaya{#frequent-crashes-or-freezes} 
KungERDDAP™ay nagiging mabagal, bumabagsak o nagyeyelo, isang bagay na mali. Tingnan[ERDDAP's log file](#log)upang malaman ang dahilan. Kung hindi, pakisuyong isama ang mga detalye at tingnan ang ating mga anak[sa pagkuha ng karagdagang suporta](/docs/intro#support).

Ang pinakakaraniwang problema ay ang isang maligalig na gumagamit ng ilang iskrip nang sabay-sabay at/o isa na gumagawa ng malaking bilang ng mga walang bisang kahilingan. Kung mangyari ito, malamang na i - blacklist mo ang gumagamit na iyon. Kapag ang isang gumagamit ng blacklist ay humiling, ang maling mensahe sa pagtugon ay humihimok sa kanila na mag - email sa iyo upang lutasin ang mga problema. Pagkatapos, maaari mo silang himukin na tumakbo nang isa lamang iskrip at ayusin ang mga problema sa kanilang iskrip (e.g., humihingi ng impormasyon mula sa isang remote dataset na hindi maaaring tumugon bago i - set) . Tingnan [&lt;kahilingan ng blacklist&gt; sa inyongdatasets.xmltalaksan] (/docs/server-admin/datasets#requestblacklist) .

Sa sukdulang mga kalagayan,Javaay maaaring magyeyelo sa loob ng isa o dalawang minuto habang ginagawa nito ang isang ganap na koleksiyon ng basura, subalit pagkatapos ay gagaling. Kaya makabubuting maghintay ng isa o dalawang minuto upang makita kungJava/ERDDAP™ay talagang nagyeyelo o kung ito ay gumagawa lamang ng mahabang koleksiyon ng basura. (Kung ang pangongolekta ng basura ay isang karaniwang problema,[Maglaan ng higit na memorya kay Tomcat](/docs/server-admin/deploy-install#memory).) 

KungERDDAP™ay mabagal o nagyeyelo at ang problema ay hindi isang maligalig na gumagamit o isang mahabang koleksiyon ng basura, karaniwan nang malulutas mo ang problema sa pamamagitan ng[Muling pag - uusapERDDAP™](#shut-down-and-restart). Ang karanasan ko ay naERDDAP™ay maaaring tumakbo sa loob ng mga buwan nang hindi nangangailangan ng isang restart.
     

### Monitor{#monitor} 
Maaari mong subaybayan ang iyongERDDAP' kalagayan sa pamamagitan ng pagtingin sa kalagayan[/erddap/status.htmlpahina](#status-page), partikular na ang mga estadistika sa itaas na seksiyon. KungERDDAP™nagiging mabagal o nagyeyelo at ang problema ay hindi lamang masyadong mabigat na gamit, karaniwan nang malulutas mo ang problema sa pamamagitan ng[Muling pag - uusapERDDAP™](#shut-down-and-restart). May karagdagang mga metrikong makukuha sa pamamagitan ng pagsasanib na Prometheus sa /erddap/metrics.

Ang karanasan ko ay naERDDAP™ay maaaring tumakbo sa loob ng mga buwan nang hindi nangangailangan ng isang restart. Kailangan mo lamang ulitin ito kung nais mong ikapit ang ilang pagbabago na ginawa moERDDAP'S setup.xml o kapag kailangan mong maglagay ng mga bagong bersyon ngERDDAP™,Java, Tomcat, o ang operating system. Kung kailangan mong magpahingaERDDAP™Kadalasan, may problema. Tingnan[ERDDAP's log file](#log)upang malaman ang dahilan. Kung hindi, pakisuyong isama ang mga detalye at tingnan ang ating mga anak[sa pagkuha ng karagdagang suporta](/docs/intro#support). Bilang pansamantalang solusyon, maaari mong subuking gamitin[Monit](https://mmonit.com/monit/)upang subaybayan ang iyongERDDAP™at ulitin ito kung kinakailangan. O, maaari kang gumawa ng trabahong cron upang mag - restartERDDAP™  (sa paraang aktibo) Sa pana - panahon. Baka medyo isang hamon na sumulat ng isang iskrip sa paggamit ng makina sa pagsubaybay at pagre - restartERDDAP. Ilang tip na makatutulong:

* Maaari mong gawing simple ang pagsubok kung ang prosesong Tomcat ay tumatakbo pa rin sa pamamagitan ng paggamit ng -c switch na may grep:
ps -u *tomcat User*  |grep -c juva
Babawasan niyan ang output sa "1" kung ang proseso ng tomcat ay buhay pa, o "0" kung ang proseso ay tumigil.
     
* Kung mahusay ka sa gawk, makukuha mo ang processID mula sa mga resulta ng
ps -u *tomcat User*  |grep java, at gamitin ang processID sa ibang linya ng iskrip.
     

Kung magtatayo ka ng Monit o ng isang trabahong cron, makabubuti kung maibabahagi mo ang mga detalye upang makinabang ang iba[sa pagkuha ng karagdagang suporta](/docs/intro#support)kung saan ka maaaring makibahagi.

#### Permgen{#permgen} 
Kung paulit - ulit mong gagamitin ang Tomcat managerer sa Reload (o Huminto at Magsimula)  ERDDAP™,ERDDAP™ay maaaring hindi magsimula at maghagis ng juva.lang. OffMemoryErr: PermGen. Ang lunas ay sa pana - panahon (o sa bawat pagkakataon?)  [isara at ulitin ang tomacat atERDDAP™](#shut-down-and-restart), sa halip na basta muling magkargaERDDAP.
\\[Update: Ang problemang ito ay lubhang nabawasan o naayosERDDAP™bersyon 1.24.\\]  
     
#### Log{#log} 
*    **[log.txt](#log)**   
KungERDDAP™ay hindi nagsisimula o kung ang isang bagay ay hindi gumagana na gaya ng inaasahan, lubhang kapaki - pakinabang na tingnan ang pagkakamali at suriin ang mga mensahe saERDDAP™log file.
    * Ang log file ay *Malaking Direktoryo* /log/log.txt
         ( *Malaking Direktoryo* ay nakatakda[setup.xml](/docs/server-admin/deploy-install#setupxml)) . Kung walang logo. Text file o kung log. Ang talaksang txt ay hindi binago mula nang ikaw ay muling mag - aralERDDAP™, Tingnan ang[Mga Bunton ng Tomcat](#tomcat-logs)upang makita kung may maling mensahe roon.
    * Uri ng mga mensahe sa log file:
        * Ang salitang "error" ay ginagamit kapag ang isang bagay ay labis na nagkamali kaya hindi natapos ang pamamaraan. Bagaman nakayayamot na magkamali, ang pagkakamali ang pumipilit sa iyo na harapin ang problema. Iniisip namin na mas mabuti pang gumawa ng pagkakamali, kaysa sa magkamaliERDDAP™Naglakad - lakad, gumagawa sa paraang hindi mo inaasahan.
        * Ginagamit ang salitang "pagpuna" kapag may nangyaring mali, ngunit nagawang matapos ang pamamaraan. Bihirang - bihira ang mga ito.
        * Anumang bagay ay isa lamang nakapagtuturong mensahe. Makokontrol mo kung gaano karaming impormasyon ang taglay [&lt;logLevel&gt;] (/docs/server-admin/datasets#loglevel)  datasets.xml.
        * Muling pagkarga ng Dataset at mga tugon ng gumagamit na nangangailangan ng &gt;10 segundo upang matapos (Matagumpay o Matagumpay) ay minarkahan ng " (&gt;10s&#33;) ". Sa gayon, mahahanap mo ang log.txt file para sa pariralang ito upang mahanap ang mga dataset na mabagal na muling maikarga o ang request number ng mga kahilingan na mabagal matapos. Pagkatapos ay maaari kang tumingin nang mas mataas sa log.txt file upang makita kung ano ang problema sa dataset o kung ano ang kahilingan ng gumagamit at kung sino ito. Ang mabagal na dataset na mga karga at mga kahilingan ng gumagamit ay kung minsan nagbabayad ng buwisERDDAP. Kaya ang pagkaalam nang higit tungkol sa mga kahilingang ito ay makatutulong sa iyo na makilala at malutas ang mga problema.
    * Ang impormasyon ay isinusulat sa log file sa disk drive sa malalaking tipak. Ang bentaha ay na ito ay napakahusay --ERDDAP™ay hindi kailanman hahadlangan ang paghihintay na isulat ang impormasyon sa log file. Ang disbentaha ay na ang troso ay halos laging magtatapos sa pamamagitan ng bahagyang mensahe, na hindi matatapos hanggang sa isulat ang susunod na bahagi. Maaari mo itong gawing up-to-date (sa isang iglap) sa pamamagitan ng pagmamasid sa iyong sariliERDDAP' status web page sa https://*your.domain.org*/erddap/status.html   (ohttp://kung gayonhttpsay hindi magawa) .
    * Kapag umabot na sa 20 MB ang log.txt files,
ang pangalang logo ng talaksan. Ang txt.previous at isang bagong log.txt file ay nalilikha. Kaya ang mga file na log ay hindi naiipon.
        
Sa setup.xml, maaari mong tiyakin ang iba't ibang sukdulang sukat para sa log file, sa Mega Bytes. Ang minimum na ipinahihintulot ay 1 (MB) . Ang pinakamataas na ipinahihintulot ay 2000 (MB) . Ang default ay 20 (MB) . Halimbawa:
```
        <logMaxSizeMB>20</logMaxSizeMB>
```

    * Kailanma't ikaw ay nagpapahingaERDDAP™,
        ERDDAP™gumawa ng arkibong kopya ng log.txt at log. Txt. previous files na may time selyo sa pangalan ng file. Kung may problema bago ang restart, maaaring kapaki - pakinabang na suriin ang mga arkibong file na ito para sa mga himaton kung ano ang problema. Maaari mong alisin ang mga arkibong file kung hindi na kailangan.
         
##### Paggawa ng log.txt{#parsing-logtxt} 
ERDDAP'tala. Hindi dinisenyo ang talaksang txt para sa parsing (Bagaman maaari kang lumikha ng regular na mga pananalita na kumukuha ng ninanais na impormasyon) . Dinisenyo ito upang tulungan ang isang tao na malaman kung ano ang nangyayari kapag may nangyayaring mali. Kapag naglalagay ka ng isang bug o problema sa reportERDDAP™Kung maaari, isama sa mga developer ang lahat ng impormasyon mula sa log.txt file na may kaugnayan sa nakayayamot na kahilingan.

Dahil sa kahusayan,ERDDAP™ay nagsusulat lamang ng impormasyon. Buwagin pagkatapos magtipon ng maraming impormasyon. Kaya kung dadalaw ka ng log. Text pagkatapos na maganap ang isang pagkakamali, ang impormasyon na may kaugnayan sa pagkakamali ay maaaring hindi pa naisusulat sa log.txt. Upang makakuha ng ganap na up-to-date na impormasyon mula sa log.txt, dalawin ang iyongERDDAP'[status.html pahina](#status-page). KailanERDDAP™Ang mga prosesong humihiling nito ay nag - iiwan ng lahat ng patiunang impormasyon na i - log.txt.

SapagkatERDDAP™paggamit ng estadistika, pakisuyong gamitin ang[Ang Apache at/o Tomcat log files](#tomcat-logs)sa halipERDDAP's log.txt. Pansinin naERDDAP'[status.html pahina](#status-page)  (ilan) at[Pang - araw - araw na Report](#daily-report)  (higit pa) ay may malaking bilang ng mga estadistikang ginagamit na patiunang itinakda para sa iyo.
    
### Mga Log ng Tomcat{#tomcat-logs} 
KungERDDAP™ay hindi nagsisimula sapagkat ang isang pagkakamali ay nangyari nang napakaagaERDDAP'Ang startup, ang maling mensahe ay lilitaw sa log files ni Tomcat ( *tomcat* /log/catalina. *ngayon* .log o kaya *tomcat* /logs/catalina.out) , wala sa[ERDDAP's log.txt file](#log).

Estadistika sa Paggamit: Para sa karamihan ng impormasyon na nais tipunin ng mga tao mula sa isang log file (e.g., mga estadistika sa paggamit) , pakisuyong gamitin ang Apache at/o Tomcat log files. Ang mga ito ay maganda ang pagkakaayos at may ganiyang uri ng impormasyon. Halimbawa, maraming kasangkapan sa pagsusuri sa mga ito[Mga AWState](https://www.awstats.org),[Kibana ng Elastic Search](https://www.elastic.co/products/kibana), at[JMeter](https://jmeter.apache.org), ngunit hanapin ang web upang mahanap ang tamang kasangkapan para sa iyong mga layunin.

Pansinin na ang mga log file ay nagpapakilala lamang sa mga gumagamit bilang mga IP address. May mga website na tutulong sa iyo na makakuha ng impormasyong nauugnay sa isang ibinigay na IP address, e.g.,[Ang Aking IPAdress](https://whatismyipaddress.com/ip-lookup), ngunit karaniwan nang hindi ninyo makikita ang pangalan ng gumagamit.

Gayundin, dahil sa[DHCP](https://en.wikipedia.org/wiki/Dynamic_Host_Configuration_Protocol), ang isang ibinigay na IP address ng gumagamit ay maaaring iba-iba sa iba't ibang araw, o ang iba't ibang gumagamit ay maaaring may parehong IP address sa iba't ibang panahon.

Puwede mo ring gamitin ang mga ito[Google Analytics](https://analytics.google.com/analytics/web/provision/?authuser=0#/provision). Subalit mag - ingat: kapag ginagamit mo ang panlabas na mga paglilingkod na gaya ng Google Analytics, isinusuko mo ang pribadong buhay ng iyong mga gumagamit sa pamamagitan ng pagbibigay sa Google ng kanilang gawain sa iyong site na Google (at iba pa?) ay maaaring manatili magpakailanman at gamitin sa anumang layunin (Marahil ay hindi teknikal, subalit marahil ay isinasagawa) . Hindi ito sinang - ayunan ng iyong mga gumagamit at marahil ay hindi nila alam na ang mga ito ay susuriin sa inyong website, kung paanong malamang na hindi nila alam kung hanggang saan sila sinusubaybayan sa halos lahat ng website. Sa ngayon, maraming gumagamit ang nababahala na ang lahat ng ginagawa nila sa web ay sinusubaybayan ng malalaking kompanyang ito (Google, Facebook, atbp.) at ng pamahalaan, at nasumpungan ito na isang di - makatuwirang panghihimasok sa kanilang buhay (gaya sa aklat, 1984) . Ito ang nagtulak sa maraming gumagamit na maglagay ng mga produktong gaya ng[Pribadong Buhay](https://www.eff.org/privacybadger/faq)upang bawasan ang pagsubaybay, upang gumamit ng mapagpipiliang mga browser na gaya ng[Browser ng Toro](https://www.torproject.org/)  (o patayin ang tradisyunal na mga browser) , at gamitin ang mga alternatibong search engine tulad ng[Pumunta sa Duck](https://duckduckgo.com/). Kung gumagamit ka ng serbisyong gaya ng Google Analytics, pakisuyong isulat sa paano man ang gamit nito at ang mga resulta sa pamamagitan ng pagbabago sa mga ito&lt;Pamantayang tag ng PrivacyPOlicy&gt; saERDDAP'
\\[tomcat\\]/webapps/erddap/WEB-INF/class/gov/noa/pfel/erddap/util/messages.xml file.
    
### E-Mail Log{#e-mail-log} 
*    **PROLOGYEAR-MM-DD.txt**   
    ERDDAP™laging isulat ang teksto ng lahat ng out-ing email message sa email ngayon logyEAR-MM-DD.txt file sa *Malaking Direktoryo* / Mga sawikain ( *Malaking Direktoryo* ay nakatakda[setup.xml](/docs/server-admin/deploy-install#setupxml)) .
    * Kung ang server ay hindi makapagpadala ng mga mensaheng email, o kung nakapagsaayos ka naERDDAP™hindi upang magpadala ng mga mensahe sa email, o kung ikaw ay nag - uusyoso lamang, ang file na ito ay isang kombinyenteng paraan upang makita ang lahat ng mensahe ng email na ipinadala.
    * Maaari mong alisin ang mga file ng email kung hindi na kailangan.
         
### Pang - araw - araw na Report{#daily-report} 
Ang Daily Report ay maraming kapaki - pakinabang na impormasyon - - lahat ng impormasyon mula sa iyoERDDAP'[/erddap/status.htmlpahina](#status-page)at higit pa.
    * Ito ang pinakakumpletong buod moERDDAP' katayuan.
    * Kabilang sa iba pang mga estadistika, kabilang dito ang isang talaan ng mga datos na hindi nagkarga at ang mga eksepsiyon na kanilang nilikha.
    * Nalilikha ito kapag nagsimula kaERDDAP™  (Pagkatapos lamang ngERDDAP™Tapusin ang lahat ng datasets) at nalilikha pagkatapos ng 7 ay lokal na panahon tuwing umaga.
    * Kailanma't ito ay nililikha, ito ay isinusulat sa[ERDDAP's log.txt file](#log).
    * Kailanma't ito'y nililikha, ito'y nilalagyan ng email&lt;Mga EmailDaily Reports to&gt; at&lt;I-mail ang lahat ng bagay Sa&gt; (na itinakda[setup.xml](/docs/server-admin/deploy-install#setupxml)) kung naitayo mo na ang sistema ng email (sa setup.xml) .

### Katayuan Pahina{#status-page} 
Maaari mong malasin ang kalagayan ng iyong buhayERDDAP™mula sa sinumang browser sa pamamagitan ng pagpunta sa&lt;baseUrl&gt;/erddap/status.html
* Ang pahinang ito ay nalilikha sa dinamikong paraan, kaya lagi itong may up-to-the-moment statistics para sa iyongERDDAP.
* Kalakip dito ang mga estadistika hinggil sa dami ng mga kahilingan, paggamit ng memorya, pagsasalansan ng sinulid, ang taskThread, atbp.
* Dahil sa ang Status Page ay maaaring malasin ng sinuman, hindi nito isinasama ang gayunding impormasyon na gaya ng sa[Pang - araw - araw na Report](#daily-report).
         
### Pagdaragdag/Changing Datasets{#addingchanging-datasets} 
ERDDAP™karaniwang muling pagbabasadatasets.xmlbawat isa *mga loadDatasetsMinMinute*   (Itinakda[setup.xml](/docs/server-admin/deploy-install#setupxml)) . Kaya makagagawa ka ng mga pagbabagodatasets.xmlanumang panahon, kahit na noong panahonERDDAP™ay tumatakbo.
Malapit nang makita ang isang bagong dataset, karaniwan nang nasa loob nito *mga loadDatasetsMinMinute* .
Ang isang binagong dataset ay muling ididiskarga kapag ito ay na-publish *Muling Pagkarga sa Bawat IMinuto* matanda na (na itinakdadatasets.xml) .
    
#### Bandila{#flag} 
*    **[Isang Bandila ng Bandila](#flag)Mga KasabihanERDDAP™sikaping Muling Ilulan ang Isang Daket sa Madaling Panahon** 
    
    *   ERDDAP™ay hindi mapapansin ang anumang pagbabago sa setup ng datasetdatasets.xmlhanggangERDDAP™Muling ikarga ang dataset.
         
    * Ang sabihinERDDAP™upang muling magkarga ng dataset sa lalong madaling panahon (bago ang dataset's&lt;Muling ikarga ang EveryNMinutes&gt; ay magpapangyari rito na muling maikarga), ilagay ang isang file *Malaking Direktoryo* /flag ( *Malaking Direktoryo* ay nakatakda[setup.xml](/docs/server-admin/deploy-install#setupxml)) na may kaparehong pangalan ng dataset'datasetID.
Ito ay nagsasabiERDDAP™upang muling maikarga ang dataset na ASAP.
Ang lumang bersyon ng dataset ay mananatiling makukuha ng mga tagagamit hanggang sa makuha ang bagong bersyon at palitan ng atomikong salit-salit.
SapagkatEDDGridMula sa mga Latian at Uso Mula saFiles, ang muling pagkarga ng dataset ay maghahanap ng bago o binagong mga file, babasahin ang mga iyon, at isasama ang mga ito sa dataset. Kaya ang panahon ng muling pagkarga ay nakasalalay sa bilang ng bago o binagong mga file.
Kung ang dataset ay may active=" false",ERDDAP™ang dataset.
         
##### Masamang Bandila{#bad-files-flag} 
* Ang isang variety ng /flag directory ay ang /badFilesFlag directory. (IdagdagERDDAP™v2.12.)   
Kung maglagay ka ng file *Malaking Direktoryo* /badFilesFlag directory na may isangdatasetIDbilang pangalan ng talaksan (hindi mahalaga ang nilalaman ng talaksan) , pagkatapos sa lalong madaling panahonERDDAP™tingnan ang mga bading Bolag file,ERDDAP™ay:
    
    1. Itanggal ang badFilesFlag file.
    2. Itapon ang mga Masamang Labi.nctalaksan (kung may isa) , na may listahan ng mga masamang file para sa dataset na iyon.
Para sa datos tulad ngEDDGridSide Byside na may childDatasets, ito rin ang nagreresulta sa mga badFile.nctalaksan para sa lahat ng mga child datasets.
    3. I-upload muli ang dataset ASAP.
    
Kaya, ito ang mga sanhiERDDAP™upang muling ayusin ang mga files na nauna (Mali ba?) Namarkang masama.
         
##### Matigas na Bandila{#hard-flag} 
* Ang isa pang uri ng direktoryo ng /flag ay ang direktoryo ng /hardFlag. (IdagdagERDDAP™v1.74.)   
Kung maglalagay ka ng file *Malaking Direktoryo* /hardFlag na may kasamangdatasetIDbilang pangalan ng talaksan (hindi mahalaga ang nilalaman ng talaksan) , pagkatapos sa lalong madaling panahonERDDAP™tingnan ang matigas Bolag file,ERDDAP™ay:
    
    1. Tanggalin ang hardFlag file.
    2. Alisin ang datasetERDDAP.
    3. Alisin ang lahat ng impormasyon naERDDAP™ang tungkol sa dataset na ito.
SapagkatEDDGridMula sa mga Latian at Uso Mula sa mga subclass ngFiles, ito ay nagreresulta sa panloob na database ng mga data file at ang mga nilalaman nito.
Para sa datos tulad ngEDDGridSide Byside na may childDatasets, ito rin ang nagdededeta sa panloob na database ng mga data file at ang nilalaman nito para sa lahat ng mga child datasets.
    4. I-upload muli ang dataset.
SapagkatEDDGridMula sa mga Latian at Uso Mula sa mga subclass ngFiles, ito ang mga sanhiERDDAP™upang muling basahin **lahat** ng mga data file. Kaya, ang oras ng muling pagkarga ay nakasalalay sa kabuuang bilang ng mga data file sa dataset. Dahil ang dataset ay inalis saERDDAP™kapag napansin ang hardFlag, ang dataset ay hindi makukuha hanggang sa matapos ang dataset na muling magkarga. Maging matiyaga. Tingnan ang[log.txt](#log)talaksan kung nais mong makita kung ano ang nangyayari.
    
Tinatanggal ng hardFlag variant ang nakaimbak na impormasyon ng dataset kahit na ang dataset ay hindi kasalukuyang nakakargaERDDAP.
    
Mahirap Ang mga bandila ay lubhang kapaki - pakinabang kapag gumagawa ka ng isang bagay na nagpapangyari ng pagbabago sa kung paanoERDDAP™basahin at ipaliwanag ang pinagkunang impormasyon, halimbawa, kapag naglagay ka ng bagong bersiyon ngERDDAP™o kapag nagawa mo nang baguhin ang kahulugan ng datasetdatasets.xml
    
* Walang kaugnayan ang nilalaman ng watawat, badFilesFlag, at hardFlag files.ERDDAP™tingnan lamang ang pangalan ng talaksan upang makuha angdatasetID.
     
* Sa pagitan ng mga pangunahing dataset reload,ERDDAP™Patuloy na maghanap ng bandila, badilesFlag, at hardFlag files.
     
* Pansinin na kapag ang isang dataset ay muling ikarga, lahat ng files sa *Malaking Direktoryo* /[cache](#cached-responses)/ *datasetID* Inalis ang directory. Kasali na rito ang.ncat mga files ng larawan na karaniwang nilalagyan ng cause sa loob ng ~15 minuto.
     
* Pansinin na kung isasama sa dataset ang xml[aktibo="mali"](/docs/server-admin/datasets#active), ang isang watawat ay magpapangyari sa dataset na gawing hindi aktibo (kung ito ay aktibo) , at sa anumang kaso, huwag muling magkarga.
     
* Anumang orasERDDAP™overdyDatasets upang gawin ang isang malaking reload (ang timed reload na kontrolado ng&lt;loadDatasetsMinMinutes&gt;) o isang maliit na reload (bunga ng isang panlabas o panloob na watawat) ,ERDDAP™basahin ang lahat&lt;decompressedCachemaxGB&gt;,&lt;Mga decompressedCachumaxMinutes Lumang&gt;,&lt;gumagamit&gt;,&lt;requestBlacklist&gt;,&lt;Mabagal na DownTrobleMillis&gt;, at&lt;Ang subscriptionEmailBlacklist&gt; tags at lumipat sa bagong settings. Kaya maaari mong gamitin ang isang watawat bilang isang paraan upang makakuhaERDDAP™upang mapansin ang mga pagbabago sa mga tag na iyon na ASAP.

##### Maglagay ng Bandila ng Dateset{#set-dataset-flag} 
*  ERDDAP™ay may serbisyong web upang ang mga bandila ay maitakda sa pamamagitan ng mga URL.
    
    * Halimbawa,
         https://coastwatch.pfeg.noaa.gov/erddap/setDatasetFlag.txt?datasetID=rPmelTao&flagKey=123456789   
         (na pekeng watawat Susi) ay maglalagay ng watawat para sa rPmeltao dataset.
    * May ibang flagKey para sa bawat isadatasetID.
    * Makikita ng mga administrador ang isang talaan ng mga flag URL para sa lahat ng mga dataset sa pamamagitan ng pagtingin sa ilalim ng kanilang mga datos[Pang - araw - araw na Report](#daily-report)email.
    * Dapat ituring ng mga Administrador ang mga URL na ito bilang kompidensiyal, yamang binibigyan nila ang isa ng karapatang ayusin ang isang dataset sa testamento.
    * Kung inaakala mong ang mga watawat ay nahulog sa mga kamay ng isa na nang - aabuso sa kanila, maaari kang magbago&lt;flagKeyKey&gt; sa[setup.xml](/docs/server-admin/deploy-install#setupxml)at muling pag - uusapERDDAPlakasERDDAP™upang lumikha at gumamit ng ibang set ng mga flagKey.
    * Kung magbabago ka&lt;flagKey&gt;, alisin ang lahat ng lumang suskripsiyon (tingnan ang talaan sa iyong Daily Report) at tandaang ipadala ang mga bagong URL sa mga taong gusto mong magkaroon nito.
    
Ang sistema ng bandila ay maaaring magsilbing saligan para sa isang mas mahusay na mekanismo sa pagsasabiERDDAP™kung kailan ididiskarga muli ang isang dataset. Halimbawa, maaari kang magtakda ng dataset&lt;Muling ikarga ang EveryNMinutes&gt; sa malaking bilang (e.g., 10080 = 1 linggo) . Pagkatapos, kapag alam mong nagbago na ang dataset (Marahil dahil sa idinagdag mo ang isang file sa dataset's data directory) , maglagay ng watawat upang muling maikarga ang dataset sa lalong madaling panahon. Ang mga bandila ay karaniwang mabilis na nakikita. Subalit kung ang sinulid na may kargangDatasets ay abala na, maaaring matagal pa bago ito magamit upang kumilos sa bandila. Subalit ang sistema ng bandila ay mas tumutugon at mas mahusay kaysa sa pagtatakda&lt;Ikarga muli ang EveryNMinutes&gt; sa maliit na bilang.
    
#### Pag - aalis ng mga Date{#removing-datasets} 
Kung aktibo ang datasetERDDAP™at nais mong ipagwalang - bahala ito nang pansamantala o permanente:
1. Sa loobdatasets.xmlpara sa datos, set[aktibo="mali"](/docs/server-admin/datasets#active)sa tag ng dataset.
2. MaghintayERDDAP™upang alisin ang dataset sa susunod na major reload o[maglagay ng watawat](#flag)para sa datos na sasabihinERDDAP™upang mapansin ang pagbabagong ito sa lalong madaling panahon. Kapag ginagawa mo ito,ERDDAP™ay hindi naglalabas ng anumang impormasyon na maaaring naimbak nito tungkol sa dataset at tiyak na hindi gumagawa ng anumang bagay sa aktuwal na impormasyon.
3. Kung gayon ay maaari mong iwan ang active=" false" dataset indatasets.xmlo alisin ito.
         
#### Kailan Binabawi ang mga Dateset?{#when-are-datasets-reloaded} 
Ang sinulid na tinatawag na RunLoadDatasets ay ang master sinulid na kumokontrol kapag muling nakarga ang mga dataset. " RunLoad " Mga silo ng datos magpakailanman:

1. Binabanggit ng RunLoadDatasets ang kasalukuyang panahon.
2. Ang RunLoadDatasets ay nagsisimula ng isang sinulid na pandyDatasets upang gawin ang isang "majorLoad". Makikita mo ang impormasyon tungkol sa kasalukuyang/dating majorLoad sa tuktok ng iyong katawanERDDAP'
    [/erddap/status.htmlpahina](#status-page)  (Halimbawa,[status pahina halimbawa](https://coastwatch.pfeg.noaa.gov/erddap/status.html)) .
    
    1. Gumagawa ng isang kopya ng mga loadDatasetsdatasets.xml.
    2. Binabasa ng mga pakete ang kopya ngdatasets.xmlat, sa bawat dataset, tingnan kung kailangan ang dataset (muli) na may karga o tinanggal.
        * Kung mayroon[bandila](#flag)Ang talaksan ay umiiral para sa dataset na ito, ang file ay inalis at ang dataset ay inalis kung aktibo=" false" o (muli) load kung aktibo="tunay" (Anuman ang edad ng dataset) .
        * Kung ang dataset ng dataset.xml function ay may active=" false" at ang dataset ay kasalukuyang naka-load (aktibo) , ito ay idinidiskarga (tanggalin) .
        * Kung ang dataset ay may active="tunay" at ang dataset ay hindi pa naka-load, ito ay may karga.
        * Kung ang dataset ay may active= "tunay" at ang dataset ay naka-load na, ang set ng datos ay muling i-load kung ang edad ng dataset (panahon mula noong huling pasan) mas dakila kaysa rito&lt;Muling pagkarga Bawat INMinutes&gt; (default = 10080 minuto) , kung hindi, ang dataset ay naiiwang mag-isa.
    3. Nagtatapos ang mga pakete.
    
Ang sinulid na RunLoadDatasets ay naghihintay na matapos ang sinulid na pandyDatasets. Kung mas matagal ang mga packDataset kaysa sa mga loadDataset Mga Mininuto (gaya ng itinakda sa setup.xml) , ang RunLoadDatasets ay sumasabad sa sinulid na pandyDatasets. Tamang - tama, napapansin ng mga pandDataset ang paghinto at pagtatapos. Ngunit kung hindi nito mapapansin ang pagkagambala sa loob ng isang minuto, ang RunLoadDatasets ay tinatawag na loadDatasets. hihinto () , na hindi kanais-nais.
3. Samantalang ang panahon mula nang magsimula ang huling majorLoad ay mas mababa sa mga loadDatasets Mga Mininuto (gaya ng itinakda sa setup.xml, e.g., 15 minuto) , ang RunLoadDatasets ay paulit-ulit na naghahanap ng mga[bandila](#flag)sa mga talaksan *Malaking Direktoryo* /flag directory. Kapag may natagpuang isa o higit pang mga talaksan ng watawat, inaalis ang mga ito, at sinisimulan ng mga RunLoadDataset ang isang sinulid na may kargangDatasets upang gumawa ng isang "minorLoad". (majorLoad=bulaan) . Hindi mo makita ang menor de edad na impormasyon tungkol sa iyong sariliERDDAP'[/erddap/status.htmlpahina](#status-page).
    1. Gumagawa ng isang kopya ng mga loadDatasetsdatasets.xml.
    2. Binabasa ng mga pakete ang kopya ngdatasets.xmlAt, sa bawa't dataset na may talaksang watawat:
        * Kung ang dataset ng dataset.xml function ay may active=" false" at ang dataset ay kasalukuyang naka-load (aktibo) , ito ay idinidiskarga (tanggalin) .
        * Kung ang dataset ay may active= "tunay", ang dataset ay (muli) karga, anuman ang edad nito. Ang mga hindi-flagged dataset ay hindi pinapansin.
    3. Nagtatapos ang mga pakete.
4. " RunLoad " Ang mga impormasyon ay bumabalik sa baitang 1.

Mga Paunawa:
* Pagsisimula
Kapag ikaw ay namahingaERDDAP™, bawat dataset na may active= "tunay" ay may karga.
* Sakit
Kapag ang dataset ay (muli) karga, ang cache nito (kasama ang anumang data response files at/o mga talaksan ng imahe) ay walang laman.
* Maraming Data
Kung marami kang datasets at/o isa o higit pang datasets ay mabagal sa (muli) karga, ang isang sinulid na may kargangDatasets ay maaaring gumugol ng mahabang panahon upang tapusin ang trabaho nito, marahil mas mahaba pa kaysa sa mga loadDataset Mga MinMinuto.
* Isang Hugis ng mga Pasan
Walang hihigit sa isang sinulid na may kargangDatasets ang tumatakbo kaagad. Kung ang isang watawat ay nakalagay na kapag tumatakbo na ang mga fellowDataset, malamang na hindi na mapapansin o makukumpas ang watawat hanggang sa matapos ang pagtakbo ng sinulid na iyon na may kargangDatasets. Puwede mong sabihin: "Kalokohan iyan. Bakit hindi ka na lang magsimula ng isang grupo ng mga bagong sinulid para magkarga ng datasets?" Subalit kung marami kang datasets na kumukuha ng impormasyon mula sa isang malayong server, kahit na ang isang sinulid na packDatasets ay maglalagay ng matinding kaigtingan sa remote server. Totoo rin ito kung marami kang datasets na kumukuha ng impormasyon mula sa mga file sa isang RAID. May mabilis na bumababang mga pagbabalik mula sa pagkakaroon ng higit sa isang sinulid na pandDatasets.
* Bandila = ASAP
Ang paglalagay ng bandila ay hudyat lamang na ang dataset ay dapat (muli) sa lalong madaling panahon hangga't maaari, hindi naman kailangan. Kung walang fellowDatasets sinulid ang kasalukuyang tumatakbo, ang dataset ay sisimulang ikarga muli sa loob ng ilang segundo. Subalit kung isang sinulid na may kargangDatasets ang kasalukuyang tumatakbo, ang dataset ay malamang na hindi na muling ididiskarga hanggang matapos ang sinulid na iyon na may kargangDatasets.
* Naalis ang Bandila ng Bandila
Sa pangkalahatan, kung ilalagay mo ang isang talaksan ng bandila *Malaking Direktoryo* /erddap/flag directory (sa pamamagitan ng pagdalaw sa bandila ng dataset Url o paglalagay ng aktuwal na talaksan doon) , ang dataset ay karaniwang muling ididiskarga sa lalong madaling panahon pagkatapos na alisin ang talaksan ng bandilang iyon.
* Bandila laban sa Maliit na reload Lahat ng Bagay
Kung mayroon kang panlabas na paraan ng pag-alam kung kailan kailangang i-reload muli ang isang dataset at kung ito ay kombinyente para sa iyo, ang pinakamahusay na paraan upang matiyak na ang isang dataset ay laging up-to-date ay i-set ang reload nito Bawat UNMinutos sa isang malaking bilang (10080?) at nilagyan ng watawat (sa pamamagitan ng iskrip?) kailanma't kailangan itong ikargang muli. Iyan ang sistema naEDDGridMula saErddap at EDDTable FromErddap ay tumatanggap ng mga mensahe na ang dataset ay kailangang muling ikarga.
* Tingnan sa log.txt
Maraming kaugnay na impormasyon ang isinulat sa *Malaking Direktoryo* /log/log.txt file. Kung ang mga bagay ay hindi gumagana gaya ng inaasahan mo, tingnan ang log. Txt na masuri mo ang problema sa pamamagitan ng pag - alam kung ano talaga ang problemaERDDAP™Gayon nga.
    
    * Paghahanap ng "majorLoad=gre" para sa pagsisimula ng mga pangunahing sinulid na pandaket.
    * Paghahanap ng "majorLoad= false" para sa simula ng mga menor de edad na mga sinulid ng mga porsyento.
    * Hanapin ang ibinigay na datosset'sdatasetIDpara sa impormasyon tungkol dito (muli) na may karga o tanong.
        
          
         
#### Mga Sagot na Kapos{#cached-responses} 
Sa pangkalahatan,ERDDAP™hindi cache (ng tindahan) ang mga kahilingan ng gumagamit. Ang katuwiran ay na ang karamihan sa mga kahilingan ay medyo naiiba upang ang cache ay hindi maging napakabisa. Ang pinakamalalaking eksepsiyon ay ang mga kahilingan para sa mga talaksan ng larawan (na nakatago mula pa noong mga browser at mga programang gaya ngGoogle Earthkadalasang re-request na mga imahe) at mga kahilingan.ncmga talaksan (dahil hindi sila maaaring likhain sa-the-fly) .ERDDAP™ay nag - iimbak ng bawat talaksan ng dataset na nakalagay sa ibang directory: *Malaking Direktoryo* /cache/ *datasetID* yamang ang isang cache directory ay maaaring may napakaraming salansan na maaaring maging mabagal na makuha.
Ang mga talaksan ay inaalis sa cache sa isa sa tatlong dahilan:
* Ang lahat ng file sa cache na ito ay inaalis kapagERDDAP™ay muling ginaganap.
* Sa pana - panahon, ang anumang file ay higit pa kaysa anumang file&lt;Mga cacheMinute&gt; matatanda (na itinakda[setup.xml](/docs/server-admin/deploy-install#setupxml)) ay aalisin. Pag - aalis ng mga file sa cache batay sa edad (hindi List-Recently-Used) Tinitiyak ng mga file na hindi magtatagal sa cache. Bagaman parang iyon din ang dapat na maging tugon, hindi iyan totoo. Halimbawa, isangtabledapkahilingan na may kalakip na &time&gt; *ilan Panahon* magbabago ang impormasyon kapag dumating ang dataset. At ang kahilingang griddap na kasama rito\\[huli\\]para sa sukat ng panahon ay magbabago kung bagong impormasyon ang darating para sa dataset.
* Ang mga larawan na nagpapakita ng maling mga kalagayan ay kinakupkop, subalit sa loob lamang ng ilang minuto (mahirap na sitwasyon) .
* Sa tuwing muling magkarga ng dataset, ang lahat ng files sa cache ng dataset ay inaalis. Sapagkat ang mga kahilingan ay maaaring para sa"last"index sa isang grided dataset, ang mga files sa cache ay maaaring maging hindi tanggap kapag ang isang dataset ay muling nakarga.
         
#### Nakaimbak na Impormasyon{#stored-dataset-information} 
Para sa lahat ng uri ng datos,ERDDAP™ay nagtitipon ng maraming impormasyon kapag ang isang dataset ay kinakarga at iniingatan iyon sa memorya. Ito'y nagpapahintulot ngERDDAP™na mabilis na tumugon sa mga pagsaliksik, mga kahilingan para sa listahan ng mga datos, at mga kahilingan para sa impormasyon tungkol sa isang dataset.

Para sa ilang uri ng datos (Partikular naEDDGridKopya, Kawili - wiling Kopya,EDDGridMula sa *Xxx* Mga Pawi, at Mapagkakatiwalaan Mula sa *Xxx* Mga Bunton) ,ERDDAP™ay nag-iimbak sa disk ng ilang impormasyon tungkol sa dataset na muling ginagamit kapag ang dataset ay muling nakarga. Lubha nitong pinabibilis ang proseso ng muling pagkarga.

* Ilan sa mga dataset information files ay human-readable.jsonmga talaksan at nakatago *Malaking Direktoryo* /dataset/ *Huling2Letters OfDatasetID/datasetID* .
*   ERDDAP™ang mga file na ito sa kakaibang sitwasyon, e.g., kung iaadd o i-delete ang isang variable mula sa dataset'sdatasets.xmlLarawan.
* Karamihan sa mga pagbabago sa dataset'datasets.xmlLUNSOD (e.g., binabago ang isang pangglobong katangian o iba't ibang katangian) Huwag mong i - delete ang mga file na ito. Isang regular na dataset reload ang mangangasiwa sa ganitong mga uri ng pagbabago. Masasabi moERDDAP™upang muling magkarga ng dataset ASAP sa pamamagitan ng pagtatakda ng isang[bandila](#flag)para sa dataset.
* Sa katulad na paraan, ang pagdaragdag, deleksiyon, o pagbabago ng mga data files ay pangangasiwaan kapag ang mga ito'y gaganapinERDDAP™muling magkarga ng dataset. SubalitERDDAP™ay mapapansin ang uring ito ng pagbabago sa lalong madaling panahon at kusa kung ang dataset ay gumagamit ng [&lt;update EveryNMillis&gt;] (/docs/server-admin/datasets#update percentillis) sistema.
* Bihira lamang na kailanganin mong alisin ang mga talaksang ito. Ang pinakakaraniwang kalagayan kung saan kailangan mong pilitinERDDAP™upang alisin ang nakaimbak na impormasyon (dahil ito ay out-of-date/ituwid at hindi kusang maiaayos ngERDDAP) ay kapag gumawa ka ng mga pagbabago sa dataset'sdatasets.xmlAng tipak na iyan ay nakaaapekto sa kung paanoERDDAP™ang mga datos sa source data files, halimbawa, ang pagbabago ng format string ng time variable.
* Upang alisin ang nakaimbak na mga impormasyon mula sa isang datasetERDDAP™iyan ay tumatakbo (kahit na ang dataset ay hindi kasalukuyang naka-load) , magtakda ng[mahirap Bandila](#hard-flag)para sa dataset na iyon. Tandaan na kung ang isang dataset ay isang agregasyon ng isang malaking bilang ng mga file, ang muling pagkarga ng dataset ay maaaring mangailangan ng malaking panahon.
* Upang alisin ang nakaimbak na mga impormasyon sa dataset kapagERDDAP™ay hindi tumatakbo, tumatakbo[Mga Dasd](/docs/server-admin/datasets#dasdds)para sa dataset na iyon (na mas madali kaysa sa pag - alam kung saan matatagpuan ang info sa directory at inaalis ang mga file sa pamamagitan ng kamay) . Tandaan na kung ang isang dataset ay isang agregasyon ng isang malaking bilang ng mga file, ang muling pagkarga ng dataset ay maaaring mangailangan ng malaking panahon.
         
### Kalagayan ng Alaala{#memory-status} 
ERDDAP™ay hindi dapat bumagsak o magyelo. Kung gayon, isa sa malamang na sanhi ay ang kakulangan ng memorya. Maaari mong subaybayan ang paggamit ng memorya sa pamamagitan ng pagtingin sa status.html web page, na kinabibilangan ng isang linyang katulad ng

0 gc calls, 0 requests, at 0 mapanganib Mga "memoryEmail " sapol noong huling malalaking Dataset

 (ang mga pangyayaring iyon ay unti - unting nagiging mas seryoso)   
at MB inUse at gc Calks columns sa talaan ng mga estadistika. Masasabi mo kung paanong ang memory-s ay nakapaglalaman ng iyong memoryaERDDAP™ay sa pamamagitan ng pagmamasid sa mga bilang na ito. Ang mas mataas na bilang ay nagpapahiwatig ng higit na kaigtingan.

* Ang MB inUse ay dapat na laging wala pang kalahati ng[\\-Xmx memory seting](/docs/server-admin/deploy-install#memory). Ang mas malalaking numero ay isang masamang palatandaan.
* Ang mga tawag sa gc ay nagpapahiwatig ng dami ng besesERDDAP™ang tawag sa kolektor ng basura upang maibsan ang paggamit ng mataas na memorya. Kung ito ay magiging &gt;100, iyan ay tanda ng malubhang problema.
* ay nagpapahiwatig ng maraming di - dumarating na mga kahilingan na binanggit (na may HTTP error number 503, Service Unavailable) sapagkat ang paggamit ng memorya ay napakataas na. Sa pinakamainam na paraan, walang mga kahilingan ang dapat alisin. Okay kung ang ilang kahilingan ay naihinga, subalit isang tanda ng malubhang problema kung marami ang hindi nasunod.
* mapanganib MemoryEmails - Kung ang paggamit ng memorya ay nagiging mapanganib,ERDDAP™nagpapadala ng email sa adres ng email na nakatala sa&lt;I-mail ang lahat ng bagay Sa&gt; (sa setup.xml) na may listahan ng mga kahilingan ng aktibong gumagamit. Gaya ng sabi ng email, pakisuyong ipadala ang mga email na ito kay Chris. Juan sa noa. gov upang magamit natin ang impormasyon upang mapasulong ang hinaharap na mga bersiyon ngERDDAP.
     

Kung ikaw ayERDDAP™ay memory-stensive:
* Isaalang - alang ang higit pang pagbabago sa memorya ng iyong serverERDDAP™sa pamamagitan ng pagbabago sa Tomcat[Nagkakaroon ng alaalang ‐Xmx](/docs/server-admin/deploy-install#memory).
* Kung nakapag - iskedyul ka na ng maraming alaala hangga't maaariERDDAP™via -Xmx, isaalang - alang ang pagbili ng higit na memorya para sa iyong server. Ang memorya ay mura (Kung ihahambing sa presyo ng isang bagong server o ng iyong panahon) &#33; Pagkatapos ay dagdagan -Xmx.
* Sa loobdatasets.xml, set&lt;MnGridThreads&gt; to 1, set&lt;ITableThreads&gt; sa 1, at set&lt;EPAAdddressMaxRequestsActive&gt; sa 1.
* Tingnan ang mga kahilingan sa log.txt para sa hindi epektibo o magulong (ngunit matuwid) tanong. Idagdag ang kanilang IP adress&lt;requestBlacklist&gt; sa loobdatasets.xml. Kabilang sa mensahe ng blacklist error angERDDAP™Ang adres ng administrador ay may pag - asang makipag - ugnayan sa iyo ang mga gumagamit nito para makasama ka nila sa trabahoERDDAP™mas mahusay. Makabubuting mag - ingat ng isang listahan ng mga IP adress sa inyo bilang mga blacklist at kung bakit, upang makasama ninyo ang mga gumagamit nito kung sila'y makikipag - ugnayan sa inyo.
* Tingnan ang mga kahilingan sa log.txt para sa mga kahilingan mula sa mga may malisyang tagagamit. Idagdag ang kanilang IP adress&lt;requestBlacklist&gt; sa loobdatasets.xml. Kung ang katulad na mga kahilingan ay galing sa multiple na kahawig ng IP address, maaari mong gamitin ang ilang who-is services (e.g.,[ https://www.whois.com/whois/ ](https://www.whois.com/whois/)) upang malaman ang lawak ng mga IP address mula sa pinagmumulang iyon at blacklist ang buong range. Tingnan ang [&lt;[Talaksan] (/docs/server-admin/datasets#requestblacklist) .
         
#### Labas ng MemoryError{#outofmemoryerror} 
Kapag ikaw ay nagtayoERDDAP™, itinakda mo ang pinakamaraming memorya naJavamagagamit sa pamamagitan ng[\\-Xmx setting](/docs/server-admin/deploy-install#memory). KungERDDAP™ay nangangailangan ng higit na alaala kaysa riyan, ito'y maghahagis ng juva. Bang. OffMemoryError.ERDDAP™ay gumagawa ng maraming pagsusuri upang makayanan nito ang pagkakamaling iyon (e.g., sa gayo'y mabibigo ang isang nakayayamot na kahilingan, subalit napananatili ng sistema ang katapatan nito) . Subalit kung minsan, sinisira ng pagkakamali ang katapatan sa sistema at kailangan mong ulitin ang iyong pagkakamaliERDDAP. Sana'y bihira na lamang iyan.

Ang mabilis at madaling solusyon sa isang OutOfMemoryEror ay dagdagan ang[\\-Xmx setting](/docs/server-admin/deploy-install#memory), ngunit hindi mo dapat dagdagan ang -Xmx setting sa higit sa 80% ng pisikal na memorya sa server (e.g., para sa 10GB server, huwag magtakda ng -Xmx sa itaas ng 8GB) . Ang memorya ay medyo mura, kaya maaaring isang mabuting mapagpipilian na dagdagan ang memorya sa server. Ngunit kung nabura mo na ang memorya sa server o sa iba pang kadahilanan ay hindi ito mapalago, kailangan mong lutasin nang tuwiran ang sanhi ng OutOfMemoryError.

Kung titingnan mo ang[log.txt](#log)talaksan upang makita kung anoERDDAP™ay ginagawa kapag bumangon ang pagkakamali, karaniwan nang makakakuha ka ng mabuting himaton tungkol sa sanhi ng OutOfMemoryEror. Maraming posibleng dahilan, pati na:

* Ang isang napakalaking data file ay maaaring maging sanhi ng OutOfMemoryEror, lalo na, napakalaking files ng ASCII data. Kung ito ang problema, dapat na maging maliwanag ito sapagkatERDDAP™hindi makarga ang dataset (para sa mga tabular dataset) o basahin ang datos mula sa talaksang iyon (para sa nakatiklop na mga datos) . Ang solusyon, kung posible, ay hatiin ang talaksan sa maraming salansan. Sa pinakamabuting paraan, maaari mong hatiin ang salansan sa lohikal na mga tipak. Halimbawa, kung ang file ay may 20 buwang halaga ng datos, hatiin ito sa 20 file, na bawat isa ay may 1 buwang halaga ng datos. Subalit may mga bentaha kahit na kung ang pangunahing talaksan ay nahahati nang hindi makatuwiran. Ang pamamaraang ito ay may maraming pakinabang: a) Babawasan nito ang memory na kailangan upang mabasa ang mga data files sa 1/20th, dahil isa lamang file ang binabasa sa isang panahon. b) Kadalasan,ERDDAP™ay mas mabilis na makahaharap sa mga kahilingan sapagkat kailangan lamang tingnan ang isa o ilang files upang mahanap ang data para sa isang ibinigay na kahilingan. c) Kung ang koleksiyon ng impormasyon ay nagpapatuloy, kung gayon ang umiiral na 20 file ay maaaring manatiling hindi nagbabago, at kailangan mo lamang baguhin ang isa, maliit, bagong talaksan upang idagdag ang halaga ng impormasyon sa susunod na buwan sa dataset.
* Ang isang napakalaking kahilingan ay maaaring maging sanhi ng OutOfMemoryEror. Sa partikular, ang ilan sa mga itoorderByAng mga mapagpipilian ay may buong pagtugon sa alaala sa loob ng isang segundo (e.g., gumawa ng isang uri) . Kung napakalaki ng pagtugon, maaari itong humantong sa pagkakamali. Laging may mga kahilingan na, sa iba't ibang paraan, ay napakalaki. Malulutas mo ang problema sa pamamagitan ng pagdaragdag ng -Xmx setting. O, maaari mong himukin ang gumagamit na gumawa ng sunud - sunod na mas maliliit na kahilingan.
* Malamang na maraming file index ang hindi magdudulot ng file indexERDDAP™Nalilikha na napakalaki kaya't ang talaksang iyon ang magiging sanhi ng pagkakamali. Kung ipapalagay natin na ang bawat file ay gumagamit ng 300 byte, 1,000,000 files ang kukuha lamang ng 300MB. Subalit ang mga dataset na may napakaraming data file ay nagdudulot ng iba pang problemaERDDAP, lalo na, ito'y nangangailangan ng mahabang panahonERDDAP™upang buksan ang lahat ng data file na iyon kapag tumutugon sa isang gumagamit ay humihiling ng datos. Sa kasong ito, ang solusyon ay maaaring upang i-gregate ang mga file upang magkaroon ng mas kaunting data files. Para sa mga tabular datasets, kadalasang malaki kung iyong ililigtas ang data mula sa kasalukuyang dataset sa[CF Mga Sampling Geometriya (DSG) ](https://cfconventions.org/Data/cf-conventions/cf-conventions-1.8/cf-conventions.html#discrete-sampling-geometries)Contiguous Raged Array data files (humiling.ncMga file ng CF mula saERDDAP) at pagkatapos ay gumawa ng bagong dataset. Ang mga file na ito ay maaaring hawakan nang mahusayERDDAP'[Mga EDDTable Mula sa mga Latian](/docs/server-admin/datasets#eddtablefromnccffiles). Kung sila ay makatuwirang organisado (bawat isa ay may datos para sa isang tipak ng espasyo at panahon) ,ERDDAP™ay madaling makakuha ng impormasyon mula sa mga ito.
* Para sa mga tabular dataset na gumagamit ng [&lt;subsetVariables&gt;] (/docs/server-admin/datasets#subsetvariables) Halimbawa,ERDDAP™ay gumagawa ng isang mesa ng natatanging mga kombinasyon ng mga halaga ng mga pagbabagong iyon. Para sa malalaking dataset o kailan&lt;subsetVariables&gt; ang mesang ito ay mali ang pagkakaayos, kaya sapat ang laki nito upang maging sanhi ng Out OfMemoryErrors. Ang solusyon ay alisin ang mga variable mula sa talaan ng&lt;subsetVariables&gt; na may malaking bilang ng mga halaga, o nag-aalis ng mga variables kung kinakailangan hanggang sa ang sukat ng mesang iyon ay makatuwiran. Ang mga bahagi ngERDDAP™na gumagamit ngsubsetVariableshindi gumagana nang mahusay ang sistema (e.g., mabagal ang pagkarga ng mga web page) gayong may mahigit na 100,000 hanay sa mesang iyon.
* Laging posible na maraming sabay - sabay na malalaking kahilingan (sa isang talagang abalaERDDAP) ay maaaring magsama upang maging sanhi ng problema sa memorya. Halimbawa, 8 requests, bawat isa ay gumagamit ng 1GB bawat isa, ay magdudulot ng problema para sa isang -Xmx=8GB settup. Subalit bihira na ang bawat kahilingan ay nasa tugatog ng paggamit nito sa memorya nang sabay - sabay. At madali mong makikita na ang iyongERDDAP™ay talagang abala sa malalaking kahilingan. Ngunit, posible ito. Mahirap pakitunguhan ang problemang ito maliban sa pagdaragdag ng -Xmx setting.
* May iba pang mga senaryo. Kung titingnan mo ang[log.txt](#log)talaksan upang makita kung anoERDDAP™ay ginagawa kapag bumangon ang pagkakamali, karaniwan nang makakakuha ka ng mabuting himaton tungkol sa sanhi. Kadalasan, may paraan upang mabawasan ang problemang iyan (Tingnan ang nasa itaas) , ngunit kung minsan kailangan mo lamang ng mas maraming memorya at mas mataas na -Xmx setting.
         
### Napakaraming Buksan na Filipina{#too-many-open-files} 
Pasimula saERDDAP™v2.12,ERDDAP™may sistema upang subaybayan ang bilang ng bukas na mga file (na kinabibilangan ng mga tungtungan at iba pang mga bagay, hindi lamang mga talaksan) sa Tomcat sa mga computer ng Linux. Kung ang ilang file ay mali ang pagkakasara (isang "resourced") , ang bilang ng mga bukas na file ay maaaring tumaas hanggang sa ito ay lumampas sa sukdulang pinapayagan ng operating system at maraming talagang masamang bagay ang nangyayari. Kaya ngayon, sa Linux computer (sapagkat ang impormasyon ay hindi makukuha ng Windows) :

* May isang "Open Files" column sa dulong kanan ng status.html web page na nagpapakita ng porsyento ng mga talaksang max na bukas. Sa Windows, nagtatanghal lamang ito "?".
* KailanERDDAP™Ay gumagawa ng impormasyon na sa dulo ng bawat pangunahing dataset reload, ito ay mag-print sa log. talaksang tinggil:
openFile CRE= *kasalukuyang* ng max= *max* %= *porsiyento* 
* Kung ang persentahe ay &gt;50%, isang email ang ipinadadala saERDDAP™Ang administrador at ang email Lahat Sa email addresss.

Kung ang persentahe ay 100%,ERDDAP™ay nasa kakila - kilabot na problema. Huwag hayaang mangyari ito.
Kung ang persentahe ay &gt;75%,ERDDAP™ay malapit sa kakila - kilabot na problema. Hindi maganda yun.
Kung ang persentahe ay &gt;50%, posible na ang isang tulis ay magpapangyari sa persentahe na umabot sa 100.
Kung ang persentahe ay &gt;50%, dapat mong gawin:
* Dagdagan ang pinakamaraming bilang ng open files na pinapayagan ng alinman:
    * Ginagawa ang mga pagbabagong ito sa bawat pagkakataon bago mo simulan ang tomcat (ilagay ang mga ito sa talaksang Tomcat startup.sh?) :
Elimit -Hn 16384
Elimit -Sn 16384
    * O gumawa ng permanenteng pagbabago sa pamamagitan ng pag - aayos (bilang ugat) /etc/security/limits.conf at magdagdag ng mga linya:
tomcat soft nofile 16384
tomcat nang walang profile 16384
Ipinapalagay ng mga utos na iyon na ang gumagamit na nagpapatakbo ng Tomcat ay tinatawag na "tomcat".
Sa maraming uri ng Linux, kailangan mong ulitin ang server upang ikapit ang mga pagbabagong iyon. Para sa parehong opsyon, ang "16384" sa itaas ay isang halimbawa. Pinipili mo ang numero na inaakala mong pinakamabuti.
* Muling Pag - aaralERDDAP. Isasara ng operating system ang anumang bukas na files.
         
### Bigong mga Kahilingan{#failed-requests} 
*    **Kakaibang Gawain: &gt;25% ng mga kahilingan ay nabigo**   
Bilang bahagi ng bawat reloadDatasets, na karaniwang tuwing 15 minuto,ERDDAP™Tingnan ang persentahe ng mga kahilingan na nabigo mula noong huling muling maikarga ang mga data. Kung ito ay &gt;25%,ERDDAP™nagpapadala ng emailERDDAP™Ang administrador na may paksang "Unuswal na Gawain: &gt;25% ng mga kahilingan ay nabigo". Kabilang sa email na iyon ang isang mataas na lugar malapit sa ibaba na pinamagatang "Requester's IP Address (Bigo)   (mula noong huling malalaking Pasan) ". Hanapin iyan. Sinasabi nito sa inyo ang direksiyon ng IP ng mga computer na gumagawa ng lubhang bigong mga kahilingan. Pagkatapos ay maaari mong hanapin ang mga IP address na iyon sa\\[Malaking Direktoryo\\]/logs/[log.txt](#log)salansanin at tingnan kung anong uri ng mga kahilingan ang kanilang ginagawa.
    
Maaari ninyong gamitin ang numero ng IP ng gumagamit nito (Halimbawa, kasama ang[ https://whatismyipaddress.com/ip-lookup ](https://whatismyipaddress.com/ip-lookup)) upang malaman kung sino o ano ang gumagamit. Kung minsan ay sasabihin niyan sa iyo kung sino ang gumagamit nito (e.g., ito ay isang web crender ng search engine) . Kadalasan ito'y nagbibigay sa iyo ng himaton (E.g., ito ay isang amazonaws computer, ito ay mula sa ilang unibersidad, ito ay isa sa ilang espisipikong lungsod) .
    
Sa pamamagitan ng pagtingin sa aktuwal na kahilingan, sa numero ng IP, at sa maling mensahe (lahat mula sa[log.txt](#log)) para sa sunud - sunod na pagkakamali, karaniwan nang mauunawaan mo kung ano ang nangyayari. Sa aking karanasan, may apat na karaniwang sanhi ng maraming bigong kahilingan:
    
1) Masama ang mga kahilingan (e.g., naghahanap ng mga kahinaan sa seguridad, o gumagawa ng mga kahilingan at pagkatapos ay ikansela ang mga ito bago matapos ang mga ito) . Dapat mong gamitin&lt;requestBlacklist&gt; sa loobdatasets.xmlsa mga direksiyon ng IP.
    
2) Isang search engine ang walang muwang na sumusubok sa mga URL na nakatala saERDDAP™web page at mga dokumento ng ISO 19115. Halimbawa, maraming lugar ang nagtatala ng pinaka - baseOPeNDAPHalimbawa, ang URL https://coastwatch.pfeg.noaa.gov/erddap/griddap/jplMURSST , kung saan ang gumagamit ay dapat na magdagdag ng isang uri ng talaksan (e.g., .das, .dds, .html) . Subalit hindi ito nalalaman ng makinang panghanap. At nabigo ang kahilingan sa base URL. Ang isang kaugnay na sitwasyon ay kapag ang search engine ay lumilikha ng mga kakaibang kahilingan o sumusubok na punan ang mga porma upang makapunta sa "nakatagong" web page. Subalit ang mga search engine ay kadalasang gumagawa ng masamang gawain nito, na humahantong sa mga kabiguan. Ang lunas ay: lumikha ng isang[Mga robot.txt](#robotstxt)talaksan.
    
3) Ang ilang gumagamit ay gumagawa ng iskrip na paulit - ulit na humihiling ng isang bagay na wala roon. Marahil ito ay isang dataset na dati'y umiiral, subalit wala na ngayon (Pansamantala o permanente) . Kadalasang hindi ito inaasahan ng mga skripto kaya't huwag itong pakitunguhan nang may katalinuhan. Kaya ang iskrip ay patuloy na gumagawa ng mga kahilingan at ang mga kahilingan ay patuloy na nabibigo. Kung mahuhulaan mo kung sino ang gumagamit nito (mula sa numero ng IP sa itaas) , makipag-ugnayan sa kanila at sabihin sa kanila na ang dataset ay hindi na makukuha at hilingin sa kanila na baguhin ang kanilang script.
    
4) Talagang may mali sa ilang dataset. Karaniwan na,ERDDAP™ang magulong dataset. Kung minsan hindi ito nangyayari, kaya lahat ng kahilingan rito ay humahantong lamang sa mga pagkakamali. Kung gayon, ayusin ang problema sa pamamagitan ng dataset o (kung hindi mo magawa) ilagay ang datos[aktibo="mali"](/docs/server-admin/datasets#active). Mangyari pa, ito ay maaaring humantong sa problema #2.
    
Kung minsan ang mga pagkakamali ay hindi gaanong masama, lalo na, kungERDDAP™ay maaaring makahalata ng pagkakamali at tumugon nang napakabilis (&lt;=1ms). Kaya maaaring magpasiya kang huwag kumilos.
    
Kung ang lahat ay mabigo, may pansansinukob na lunas: idagdag ang numero ng IP ng gumagamit sa [&lt;[Talaksan] (/docs/server-admin/datasets#requestblacklist) . Hindi naman ito masama o waring mahigpit na mapagpipilian. Pagkatapos ang gumagamit ay makakakuha ng maling mensahe na nagsasabi ng s/siya ay na-blacklist at sasabihin sa kanila ang iyong (angERDDAP™Ang administrador) adres ng email. Kung minsan ay makikipag - ugnayan sa iyo ang gumagamit at malulutas mo ang problema. Kung minsan ay hindi kayo kinakausap ng gumagamit nito at makikita ninyo ang iisang paggawi na nagmumula sa ibang numero ng IP kinabukasan. Blacklist ang bagong numero ng IP at umasang makukuha nila sa dakong huli ang mensahe. (O ito ang iyong Groundhog Day, kung saan hindi ka kailanman makatatakas. Ikinalulungkot mo.) 
    
### Mga robot.txt{#robotstxt} 
Ang mga kompanya ng search engine ay gumagamit ng mga web crender (e.g., Google Pakuluan) upang suriin ang lahat ng pahina sa web upang idagdag ang nilalaman sa mga search engine. SapagkatERDDAP™, iyan ay pangunahin nang mabuti.ERDDAP™ay maraming kawing sa pagitan ng mga pahina, kaya masusumpungan ng mga gumagapang ang lahat ng mga pahina ng web at idaragdag ang mga ito sa mga search engine. Pagkatapos, ang mga gumagamit ng mga search engine ay makasusumpong ng mga dataset sa iyong mga sekwensiyaERDDAP.
    
Nakalulungkot, may ilang gagamba na gumagapang (e.g., Google Pakuluan) ay pinupunan at sumasailalim ngayon ng mga porma upang makasumpong ng karagdagang nilalaman. Para sa mga web commerce site, ito ay malaki. Subalit ito ay kakila - kilabot para saERDDAP™sapagkat humahantong lamang ito sa isang **Walang hanggan** bilang ng di - kanais - nais at walang - saysay na mga pagtatangkang gumapang sa aktuwal na impormasyon. Ito ay maaaring humantong sa mas maraming mga kahilingan para sa datos kaysa sa lahat ng iba pang mga gumagamit na pinagsama. At pinupuno nito ang search engine ng madugo, walang - saysay na mga subset ng aktuwal na impormasyon.
    
Upang sabihin sa mga gagambang gumagapang na huwag nang punuin ang mga porma at sa pangkalahatan ay huwag tingnan ang mga web page na hindi nila kailangang tingnan, kailangan mong lumikha ng isang file ng teksto na tinatawag na[Mga robot.txt](https://en.wikipedia.org/wiki/Robots_exclusion_standard)sa root directory ng dokumentong herarkiya ng inyong website upang ito'y malasin ng sinuman na, e.g., http://*www.your.domain*/robots.txt .
Kung gumagawa ka ng bagong mga robot. Txt file, ito ay isang mabuting pasimula:
```
    User-Agent: \\*
    Disallow: /erddap/files/ 
    Disallow: /files/ 
    Disallow: /images/ 
    Disallow: /\\*?
    Disallow: /\\*?\\*
    Disallow: /\\*.asc\\*
    Disallow: /\\*.csv\\*
    Disallow: /\\*.dods\\*
    Disallow: /\\*.esriAscii\\*
    Disallow: /\\*.esriCsv\\*
    Disallow: /\\*.geoJson\\*
    Disallow: /\\*.htmlTable\\*
    Disallow: /\\*.json\\*
    Disallow: /\\*.mat\\*
    Disallow: /\\*.nc\\*
    Disallow: /\\*.odvTxt\\*
    Disallow: /\\*.tsv\\*
    Disallow: /\\*.xhtml\\*
    Disallow: /\\*.geotif\\*
    Disallow: /\\*.itx\\*
    Disallow: /\\*.kml\\*
    Disallow: /\\*.pdf\\*
    Disallow: /\\*.png\\*
    Disallow: /\\*.large\\*
    Disallow: /\\*.small\\*
    Disallow: /\\*.transparentPng\\*
    Sitemap: http://***your.institutions.url***/erddap/sitemap.xml
```
     (Subalit palitan *inyong mga institute.url* kasama ng iyongERDDAP's base URL.)   
Maaaring kumuha ng ilang araw upang mapansin ng mga makinang naghahanap at upang ang mga pagbabago ay mangyari.
     
### sitemap.xml{#sitemapxml} 
Bilang ang[ https://www.sitemaps.org ](https://www.sitemaps.org/)ang sabi ng website:

> Sitemaps are an easy way for webmasters to inform search engines about pages on their sites that are available for crawling. In its simplest form, a Sitemap is an XML file that lists URLs for a site along with additional metadata about each URL (when it was last updated, how often it usually changes, and how important it is, relative to other URLs on the site) so that search engines can more intelligently crawl the site.
> 
> Web crawlers usually discover pages from links within the site and from other sites. Sitemaps supplement this data to allow crawlers that support Sitemaps to pick up all URLs in the Sitemap and learn about those URLs using the associated metadata. Using the Sitemap protocol does not guarantee that web pages are included in search engines, but provides hints for web crawlers to do a better job of crawling your site.

Ang totoo, mula noonERDDAP™ayRESTful, madaling makagapang sa iyo ang mga gagambang pang - makinaERDDAP. Subalit mas madalas nilang ginagawa ito (araw - araw&#33;) kaysa kinakailangan (buwan?) .

* Kung ang bawat search engine ay maaaring gumagapang sa iyong buong katawanERDDAP™Araw - araw, maaari itong humantong sa maraming di - kinakailangang kahilingan.
* KayaERDDAP™Gumawa ng sitemap.xml file para sa iyongERDDAP™na nagsasabi sa mga search engine na hinahanap moERDDAP™ay kailangan lamang gapangin buwan - buwan.
* Dapat mong idagdag ang isang reperensiyaERDDAP''s sitemap.xml to you[Mga robot.txt](https://en.wikipedia.org/wiki/Robots_exclusion_standard)talaksan:
Sitemap: http://**www.yoursite.org**/erddap/sitemap.xml
 
* Kung iyan ay waring hindi naghahatid ng mensahe sa mga gumagapang, masasabi mo sa iba't ibang search engine tungkol sa sitemap.xml file sa pamamagitan ng pagdalaw sa mga URL na ito (pero nagbago **Ang Iyong Pagkakatawan** sa acronym o daglat ng iyong institusyon **www.yosite.org** sa iyongERDDAP'URL ') :
    *    https://www.bing.com/webmaster/ping.aspx?siteMap=http://**www.yoursite.org**/erddap/sitemap.xml
 
    *    https://www.google.com/ping?sitemap=http://**www.yoursite.org**/erddap/sitemap.xml(I sa pag - iisip) Kailangan mo lamang isahigin ang bawat makinang panhanap, nang minsanan. Sa gayon ay mapapansin ng mga search engine ang mga pagbabago tungo sa sitemap.xml sa pana - panahon.
     
### Pamamahagi ng Data / Data Mga Network:PushatPullTeknolohiya{#data-dissemination--data-distribution-networks-push-and-pull-technology} 
* Karaniwan na,ERDDAP™nagsisilbing tagapamagitan: kumukuha ito ng kahilingan mula sa gumagamit; kumukuha ng impormasyon mula sa isang malayong pinagmumulan ng impormasyon; binabago ang impormasyon; at ipinadadala ito sa gumagamit.
*   [PullTeknolohiya](https://en.wikipedia.org/wiki/Pull_technology):ERDDAP™Mayroon ding kakayahan na aktibong makuha ang lahat ng makukuhang impormasyon mula sa isang malayong pinagkukunan ng impormasyon at[ng isang lokal na kopya ng datos](/docs/server-admin/datasets#eddgridcopy).
*   [PushTeknolohiya](https://en.wikipedia.org/wiki/Push_technology): Sa paggamitERDDAP'[serbisyo ng suskripsiyon](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions), ang ibang mga server ng datos ay maaaring patalastasan sa sandaling may bagong datos upang sila ay makahingi ng datos (sa pamamagitan ng paghila ng impormasyon) .
*   ERDDAP'[EDDGridMula sa Erddap](/docs/server-admin/datasets#eddfromerddap)at[Mapagkakatiwalaang Mula sarddap](/docs/server-admin/datasets#eddfromerddap)gamitinERDDAP' Mga serbisyo sa suskripsiyon at[sistema ng bandila](#flag)upang ito ay masabihan kaagad kapag may bagong impormasyon.
* Maaari mong pagsamahin ang mga ito sa malaking epekto: kung binabalot moEDDGridKopya sa paligid ng isangEDDGridMula sa Erddap dataset (o ibalot ang EDDTableCopy sa isang EDDTable FromErddap dataset) ,ERDDAP™kusang lilikha at mag - iingat ng isang lokal na kopya ng ibaERDDAP''s dataset.
* Dahil sa ang mga serbisyo ng suskripsiyon ay gumagana sa sandaling magkaroon ng bagong impormasyon, napakabilis na ipinadadala ng teknolohiya ang impormasyon (sa loob ng ilang segundo) .

Ang arkitekturang ito ay naglalagay ng bawat isaERDDAP™Tagapangasiwa na nangangasiwa sa pagtiyak kung saan ang datos para sa kanyang/herERDDAP™ay nagmumula.

* Iba PaERDDAP™Magagawa rin ito ng mga administrador. Hindi na kailangan ang koordinasyon sa pagitan ng mga administrador.
* Kung maramiERDDAP™Ang mga administrador ay nag - uugnay sa isa't isaERDDAPS, nabubuo ang isang data distribution network.
* Ang impormasyon ay mabilis, mahusay, at kusang ilalathala mula sa mga pinagmumulan ng impormasyon (ERDDAPmga s at iba pang server) sa mga data republishion site (ERDDAPs) Saan man sa network.
* Isang ibinigayERDDAP™ay parehong mapagkukunan ng datos para sa ilang datasets at isang relature site para sa iba pang datasets.
* Ang resultang network ay halos katulad ng mga data distribution network na binuo sa mga programang tulad ng[Unidata'Ang IDD/IDM](https://www.unidata.ucar.edu/projects/index.html#idd), ngunit hindi gaanong mahigpit ang pagkakaayos.
         
### Seguridad, Pagiging Totoo, at Awtorisasyon{#security-authentication-and-authorization} 
Sa pamamagitan ng default,ERDDAP™ay isang ganap na pangmadlang server (paggamithttpat/ohttps) walang login ([Pagiging Totoo](https://en.wikipedia.org/wiki/Authentication)) sistema at walang pagbabawal sa pag-akses ng datos ([Pinahintulutan](https://en.wikipedia.org/wiki/Authorization)) .

#### Katiwasayan{#security} 
Kung gusto mong limitahan ang pagkuha ng ilan o lahat ng datasets sa ilang gumagamit nito, magagamit mo itoERDDAP'Ang itinayong-in security system. Kapag ginagamit ang sistema ng seguridad:

*   ERDDAP™gumamit[bahaging-based na control](https://en.wikipedia.org/wiki/Role-based_access_control).
    * AngERDDAP™Binibigyang - kahulugan ng administrador ang mga gumagamit nito&lt;gumagamit&gt;] (/docs/server-admin/datasets#user) tag indatasets.xml. Ang bawat gumagamit ay may username, isang password (kung totoo ang= customer) , at isa o higit pang mga papel.
    * AngERDDAP™Binibigyang - katuturan ng administrador kung aling papel ang may hawak sa ibinigay na dataset sa pamamagitan ng [&lt;Makarating sa&gt;] (/docs/server-admin/datasets#accessibleto) tag indatasets.xmlpara sa anumang dataset na hindi dapat ipagamit sa publiko.
* Ang login na katayuan ng gumagamit (at isang link sa log sa/out) ay ipapalabas sa itaas ng bawat web page. (Subalit ang isang loged sa gumagamit ay lilitawERDDAP™hindi dapat ipasok kung gumagamit siya ng isanghttpURL.) 
* Kung gayon&lt;baseUrl&gt; na itinakda mo sa iyong setup.xml ay isang **http** URL, maaaring gamitin ng mga gumagamit nito na hindi naka - logedERDDAP' **http** URLs. Kung&lt;Itinakda rin ang baseHtpsUrl&gt;, magagamit din ang mga gumagamit na hindi loged inhttpsURLs.
* HTTPS Lamang -- Kung gayon&lt;baseUrl&gt; na itinakda mo sa iyong setup.xml ay isang **https** URL, ang mga gumagamit na hindi naipupuslit ay pinasisigla (hindi sapilitan) ng paggamitERDDAP' **https** URLs -- ang lahat ng linkERDDAP™Mga pahinang web ay tumutukoy sahttpsURLs.
    
Kung nais mong pilitin ang mga gumagamit na gamitinhttpsURL, magdagdag ng isang Redirect na permanenteng linya sa loob ng&lt;HalosHost `*:80&gt; section sa talaksang pagkaayos ng iyong Apache (karaniwanghttpd.conf) , e.g.,
    
```
    <VirtualHost \\*:80>
        \\[...\\]
        ServerName example.com
        Redirect permanent / https://example.com/
    </VirtualHost>
```

Kung gusto mo, may karagdagang paraan upang sapilitang gamitin anghttps: [Mahigpit na Seguridad ng Transportasyon sa HTTP (MGA HIMALA) ](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security). Upang gamitin ito:
    
    1. Nakadaragdag sa mga Tagapangulo ng Apache Module: a2enmod na mga header
    2. Idagdag ang karagdagang header sa HTTPSS VirtualHost Direction. Ang Max-age ay sinusukat sa mga segundo at maaaring itakda sa ilang mahabang halaga.
        
```
        <VirtualHost \\*:443>
            # Guarantee HTTPS for 1 Year including Sub Domains 
            Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
```
    
Pakisuyong pansinin na ang header na ito ay may bisa lamang sa isang HTTPS VirtualHost.
    
Isang dahilan upang huwag pilitin ang mga gumagamit nito na gamitinhttpsAng URLs ay: ang saligang link ng SSL/TLS ay nangangailangan ng panahon upang maitatag at pagkatapos ay nangangailangan ng panahon upang i-crypt at i-crypt ang lahat ng impormasyon na inihatid sa pagitan ng gumagamit at ng server. Subalit hinihiling ng ilang institusyonhttpsTanging.
    
* Mga gumagamit ng logo sa MUSTERDDAP' **https** URLs. Kung gagamitin nilahttpURLs, ito ay mukhangERDDAP™upang huwag makapasok. Tinitiyak nito ang pribadong komunikasyon at tumutulong upang maiwasan ang[Pag - hijack ng mga sesyon at sidejacking](https://en.wikipedia.org/wiki/Session_hijacking).
* Ang sinumang hindi naitala ay maaaring ma-access at magamit ang mga pampublikong dataset. Sa pamamagitan ng default, ang mga pribadong datasets ay hindi lumilitaw sa mga listahan ng datasets kung ang isang user ay hindi loged in. Kung ang administrador ay naglagay ng setup.xml's&lt;ListPrivateDatasets&gt; sa totoo, ito ay lilitaw. Mga pagtatangkang humiling ng impormasyon mula sa pribadong mga dataset (kung kilala ng gumagamit ang URL) ay ibaling sa login page.
* Ang sinumang maipasok ay makakakita at makahihingi ng datos mula sa anumang pampublikong dataset at anumang pribadong dataset kung saan ang kanilang papel ay nagpapahintulot sa kanila na makapasok. Sa pamamagitan ng default, pribadong datasets kung saan ang isang gumagamit ay walang access ay hindi lumilitaw sa mga listahan ng datasets. Kung ang administrador ay naglagay ng setup.xml's&lt;ListPrivateDatasets&gt; sa totoo, ito ay lilitaw. Ang mga pagtatangkang humiling ng datos mula sa mga pribadong dataset kung saan walang access ang gumagamit ay ireredirect sa login page.
* AngRSSng impormasyon para sa ganap na pribadong mga dataset ay makukuha lamang ng mga gumagamit (atRSSmambabasa) na inilakip at awtorisadong gamitin ang dataset na iyon. Ito ang gumagawaRSSay hindi gaanong kapaki-pakinabang para sa ganap na pribadong datos ng datos.
    
Kung ang isang dataset ay pribado ngunit ang [nito]&lt;grapsAccessible To&gt;] (/docs/server-admin/datasets#graphsactosibleto) ay nakatakda sa publiko, ang dataset'sRSSay maaaring makuha ng sinuman.
    
* Ang mga subscription ng email ay maaari lamang buuin kapag ang isang gumagamit ay may access sa isang dataset. Kung ang isang gumagamit ay magsuskribe sa isang pribadong dataset, ang suskrisyon ay patuloy na gumagana pagkatapos na ang gumagamit ay makakuha ng log out.

##### Katiwasayan sa Pagtatakda{#setup-security} 
Upang itatag ang sistemang seguridad/authentication/authorization:

* Gawin ang pamantayanERDDAP™ [Unang setup](/docs/server-admin/deploy-install).
* Sa loob[setup.xml](/docs/server-admin/deploy-install#setupxml),
    * Idagdag/palitin ang&lt;Tunay na&gt; halaga mula sa wala hanggang sa kaugalian (hindi ito ginagamit) , email (hindi ito ginagamit) , google (mungkahi) , orcid (mungkahi) , o oauth2 (na google+orcid, inirerekomenda) . Tingnan ang mga komento tungkol sa mga mapagpipiliang ito sa ibaba.
    * Idagdag/palitin ang&lt;halaga ng baseHtpsUrl&gt;.
    * Pagkahibang/di - kaugnay&loginInfo;sa loob&lt;SimulaBodyHtml&gt; upang ipakita ang log ng gumagamit sa/out info sa tuktok ng bawat web page.
* Para sa pagsubok sa iyong personal na computer,[Sundin ang mga tagubiling ito na magsaayos ng tomcat upang suportahan ang SSL](https://tomcat.apache.org/tomcat-8.0-doc/ssl-howto.html)  (saligan nghttpskoneksyon) sa pamamagitan ng paglikha ng isang keytore sa pamamagitan ng isang[sariling-signed sertipiko](https://en.wikipedia.org/wiki/Self-signed_certificate)at sa pamamagitan ng pagbabago *tomcat* /conf/server.xml upang i-uncord ang connektor para sa port 8443. Sa Windows, baka kailanganin mong lumipat ng .keystore mula sa "c:\\Users\\ *ikaw* \\.keystore" to "c:\\Users\\Defauult User\\.keystore" o "c:\\.keystore" (tingnan *tomcat* /log/catalina. *ngayon* .log kung hindi maikarga ang aplikasyon o hindi makita ng mga gumagamit ang log sa pahina) . Makikita mo kung kailan mamamatay ang sertipiko ng .keystore sa pamamagitan ng pagsusuri sa sertipiko kapag ikaw ay pumasok.
    
Para sa isang publicable server, sa halip na gumamit ng isang self-signed sertipiko, mahigpit na inirerekomenda na ikaw ay bumili at mag-install ng sertipiko na nilagdaan ng isang[awtoridad sa sertipiko](https://en.wikipedia.org/wiki/Certificate_authority), sapagkat binibigyan nito ang iyong mga kliyente ng higit na katiyakan na sila nga ay nagdurugtong sa iyoERDDAP™, hindi man-in-the-middle's bersyon ng iyongERDDAP. Maraming nagtitinda ang nagbebenta ng digital na sertipiko. (Hanapin ang web.) Hindi magastos ang mga ito.
    
* Sa Linux computer, kung si Tomcat ay tumatakbo sa Apache, baguhin ang /etc/httpAng talaksang d/conf.d/ssl.conf upang payagan ang trapiko ng HTTPS sa/mula sa/mula sa HTTPSERDDAP™nang hindi nangangailangan ng :8443 port number sa URL:
    1. Bigyang - diin ang umiiral&lt;HalosHost&gt; tag (kung may isa) , o idagdag ang isa sa dulo ng talaksan upang sa paano man ay mayroon itong ganitong mga linya:
```
        <VirtualHost \\_default\\_:443>
            SSLEngine on
            SSLProxyEngine On
            ProxyPass /erddap http://localhost:8443/erddap
            ProxyPassReverse /erddap http://localhost:8443/erddap
        </VirtualHost>
```

    2. Pagkatapos ay restart Apache: /usr/sbin/apachectl -k Maganda (ngunit kung minsan ito ay nasa ibang directory) .
* Sa loob *tomcat* /conf/server.xml, uncomment ang port=8443&lt;tag ng koneksyon&gt;:
```
    <Connector port="8443" 
        protocol="org.apache.coyote.http11.Http11NioProtocol"
        maxThreads="150" SSLEnabled="true">
        <SSLHostConfig>
        <Certificate certificateKeystoreFile="conf/localhost-rsa.jks" 
            type="RSA" />
        </SSLHostConfig>
    </Connector>
```
at palitan ang lokasyon ng sertipikoKeystoreFile.
##### Pag - awtorisasyon{#authorization} 
*   [Sa loobdatasets.xml, lumikha ng](#authorization)[&lt;gumagamit&gt;] (/docs/server-admin/datasets#user) tag para sa bawat gumagamit na may username, password (kung aaprobahan= customer) , at papel na ginagampanan ng impormasyon. Ito ang awtorisadong bahagi ngERDDAP'sistema ng seguridad.
     
* Sa loobdatasets.xml, magdagdag ng [&lt;Makarating sa&gt;] (/docs/server-admin/datasets#accessibleto) tag sa bawat dataset na hindi dapat ma-access ng publiko.&lt;Makukuha sa&gt; ang espesipikong mga papel na makukuha sa dataset na iyon.
     
* Restart Tomcat. Suliranin? Tingnan ang mga trosong Tomcat.
     
* TUKIN ANG IYONG GAWAIN&#33; Anumang pagkakamali ay maaaring humantong sa isang depekto sa seguridad.
     
* Tingnan kung ginagamit ang login pahinahttps  (hindihttp) . Mga pagsisikap na mag - loginhttpdapat na awtomatikong ibaling sahttpsat daungan 843 (Bagaman ang numerong port ay maaaring itago sa pamamagitan ng isang proxy na Apache) . Baka kailanganin mong magtrabaho kasama ng iyong administrador ng network upang pahintulutan ang panlabas na mga kahilingan sa web na makapasok sa daungang 8443 sa iyong server.
     
* Maaari mong baguhin ang&lt;gumagamit&gt; at&lt;Madaling makuhang mga tag sa&gt; anumang oras. Ang mga pagbabago ay ikakapit sa susunod na regular na muling pagkarga ng anumang dataset, o ASAP kung gagamit ka ng isang[bandila](#flag).

##### Pagiging Totoo{#authentication} 
[ **Pagiging Totoo (pagtotroso) ** ](#authentication)  
Kung ayaw mong payagan ang mga gumagamit na mag - log in, huwag magtakda ng halaga para sa&lt;Trueation&gt; sa setup.xml.
Kung gusto mong makapasok ang mga gumagamit nito, kailangan mong magtakda ng halaga para sa&lt;Kumpil&gt;. Sa kasalukuyan,ERDDAP™suporta
[kaugalian](#custom)  (hindi ito ginagamit) ,
[email](#email)  (hindi ito ginagamit) ,
[google](#google)  (mungkahi) ,
[oksido](#orcid)  (mungkahi) , at
[oauth2](#oauth2)  (mungkahi) para sa tunay na paraan.
Kung nais mong makapasok ang pagtotroso, mahigpit naming inirerekomenda ang mga mapagpipiliang google, orcid, o oauth2 sapagkat pinalalaya ka nito sa pag - iimbak at paghawak ng mga password ng gumagamit nito (kailangan para sa kaugalian) at mas tiwasay kaysa mapagpipiliang email. Tandaan na madalas gamitin ng mga gumagamit nito ang iisang password sa iba't ibang site. Kaya maaaring ginagamit nila ang iisang password para sa iyoERDDAP™gaya ng ginagawa nila sa kanilang bangko. Iyan ang dahilan kung bakit napakahalaga ng kanilang password -- mas mahalaga sa gumagamit kaysa sa impormasyong hinihiling nila. Kaya kailangan mong gawin ang lahat ng magagawa mo upang panatilihing pribado ang mga password. Iyan ay isang malaking pananagutan. Ang email, google, ocid, at oauth2 opsiyon ang nag - iingat sa mga password, kaya hindi mo na kailangang tipunin, itago, o pagtrabahuhin ang mga ito. Kaya malaya ka na sa pananagutang iyan.

Lahat&lt;Totosyon&gt; Mga opsyon ay gumagamit ng opsyon[cookie](https://en.wikipedia.org/wiki/HTTP_cookie)sa computer ng gumagamit, kaya ang browser ng gumagamit ay dapat na itakda upang pahintulutan ang mga cookies. Kung ang gumagamit ay gumagawaERDDAP™mga kahilingan mula sa isang programa sa computer (hindi browser) , mahirap pagtrabahuin ang mga cookies at reality. Iyan ay isang karaniwang problema sa lahat ng sistema ng pagtitiyak. Ikinalulungkot mo.

Ang mga detalye ng&lt;Kakaibang&gt; Ang mga opsyon ay:

###### Kaugalian{#custom} 
ang kaugalianERDDAPSistema ng kaugalian para sa pagpapapasok ng log sa mga gumagamit nito sa pamamagitan ng pagpasok sa kanilang User Name at Password sa isang anyo sa isang web page. Kung ang isang gumagamit ay sumubok at hindi nakapagtala sa loob ng 3 beses sa loob ng 10 minuto, ang gumagamit nito ay hinahadlangang magtala sa loob ng 10 minuto. Hinahadlangan nito ang mga hacker na subukin ang milyun - milyong password hanggang sa masumpungan nila ang tamang password.

Ito'y medyo ligtas sapagkat ang User Name and Password ay inihahatid sa pamamagitan nghttps  (hindihttp) , ngunit ang realityation=google, ocid, o oauth2 ay mas mabuti dahil pinalalaya ka ng mga ito sa paggamit ng mga password. Ang kinaugaliang pamamaraan ay humihiling sa iyo na tipunin ang Pangalan ng gumagamit at tunawin ang kanilang Password (gamitin ang iyong telepono&#33; HINDI ligtas ang email&#33;) at itago ang mga itodatasets.xmlsa [&lt;gumagamit&gt;] (/docs/server-admin/datasets#user) Mga tag.

Sa mapagpipiliang kaugalian, walang sinuman ang maaaring pumasok hanggang sa ikaw (angERDDAP™Tagapangasiwa) lumilikha ng&lt;user&gt; tag para sa gumagamit, na nagtatakda sa pangalan ng gumagamit bilang username, ang hashed ng kanilang password bilang password, at ang kanilang mga papel.

Hindi Inirerekomenda
Dahil sa pagkaasiwa ng paglikha at paghahatid ng hashished ng password ng gumagamit at dahil sa mga panganib na nauugnay saERDDAP™Habang hawak ang hash pagtunaw ng mga password, ang opsiyon na ito ay hindi inirerekomenda.

Upang dagdagan ang seguridad ng mapagpipiliang ito:

* Tinitiyak ninyo na ang ibang gumagamit ng server (I.e., gumagamit ng Linux, hindiERDDAP™gumagamit) hindi mabasa ang mga file sa Tomcat directory (lalo na angdatasets.xmltalaksan&#33;) oERDDAP'Pangunahing Direktoryo.
Sa Linux, bilang user=tomcat, gamitin:
chmod -R g-rwx *Malaking Direktoryo*   
chmod -R o-rwx *Malaking Direktoryo*   
chmod -R g-rwx *Direktoryo ng mga Bagay - bagay*   
chmod -R o-rwx *Direktoryo ng mga Bagay - bagay*   
     
* Gamitin ang UEPHA256 para sa&lt;passwordEncoding&gt; sa setup.xml.
     
* Gumamit ng as-fix-as-possible na pamamaraan upang maipasa ang hashish ng password ng gumagamit mula sa gumagamit patungo sa userERDDAP™Tagapangasiwa (telepono?) .
         
###### email{#email} 
Ang opsiyon sa email ay gumagamit ng account sa email para matiyak kung totoo ang gumagamit (sa pamamagitan ng pagpapadala sa kanila ng isang email na may pantanging kawing na kailangan nilang gamitin upang makapasok) . Di - gaya ng ibang emailERDDAP™Sumulat,ERDDAP™ay hindi isinusulat ang paanyayang ito sa email log file sapagkat ito'y naglalaman ng kompidensiyal na impormasyon.
Sa teoriya, ito ay hindi gaanong matatag, sapagkat ang mga email ay hindi laging naka-crypt, kaya ang isang masamang tao na may kakayahang harangan ang mga email ay maaaring mag-abuso sa sistemang ito sa pamamagitan ng paggamit ng isang tanggap na adres sa email at pagharang sa imbitasyong email.
Sa aktuwal, kung ikaw ay nagtayoERDDAP™upang gamitin ang isang account sa Google email upang magpadala ng email, at kung ilalagay mo ito upang gamitin ang isa sa mapagpipilian ng TLS para sa koneksyon, at kung ang gumagamit ay may account sa Google email, medyo ligtas ito sapagkat ang mga email ay naka-crypted mula sa lahat ng bagayERDDAP™sa gumagamit.

Upang dagdagan ang seguridad ng mapagpipiliang ito:

* Tiyakin na ang ibang gumagamit ng server (I.e., gumagamit ng Linux, hindiERDDAP™gumagamit) hindi mabasa ang mga file sa Tomcat directory oERDDAP'Pangunahing Direktoryo.
Sa Linux, bilang user=tomcat, gamitin:
chmod -R g-rwx *Malaking Direktoryo*   
chmod -R o-rwx *Malaking Direktoryo*   
chmod -R g-rwx *Direktoryo ng mga Bagay - bagay*   
chmod -R o-rwx *Direktoryo ng mga Bagay - bagay*   
     
* Iayos ang mga bagay upang makakuha ng end-to-end security para sa mga email na ipinadala mula saERDDAP™sa mga gumagamit. Halimbawa, magagawa mo ang isang Google-centric system sa pamamagitan lamang ng paglikha ng&lt;user&gt; tag para sa Google-maned email addresss at sa pamamagitan ng pag-ayos ng iyongERDDAP™upang gumamit ng isang Google email server sa pamamagitan ng isang secure/TLS connection: sa inyong setup.xml, gamitin ang e.g.,
```
    <emailSmtpHost>smtp.gmail.com</emailSmtpHost>  
    <emailSmtpPort>587</emailSmtpPort>  
    <emailProperties>mail.smtp.starttls.enable|true</emailProperties>
```

Hindi Inirerekomenda
Ang opsiyon ng email ay hindi inirerekomenda. Pakisuyong gamitin ang google, ocid, o oauth2 opsiyon sa halip.

Katulad ng google, ocid, at oauth2 opsiyon, napakakombinyente ng emailERDDAP™Mga administrador - hindi mo na kailangang pakitunguhan ang mga password o ang kanilang mga hashished. Ang kailangan mo lamang likhain ay isang [&lt;gumagamit&gt;] (/docs/server-admin/datasets#user) tag para sa gumagamit sadatasets.xmlang adres ng gumagamit ng email, naERDDAP™ginagamit bilang pangalan ng tagagamit. (Ang password attribute ay hindi ginagamit kapag realityation=email, google, ocid, o oauth2.) 

Sa opsyon ng email, ang mga gumagamit lamang ng email&lt;user&gt; tag sadatasets.xmlmaaaring subukang mag - log inERDDAP™sa pamamagitan ng pagbibigay ng kanilang adres sa email at pag - i - click sa link ng emailERDDAP™ang nagpadala sa kanila.

ERDDAP™ituring ang mga address ng email bilang case-insensitive. Ginagawa ito sa pamamagitan ng pagkumberte sa mga direksiyon ng email na iyong pinapasok (sa loob&lt;user&gt; tags) o ang mga gumagamit ay pumapasok (sa anyong login) sa kanilang buong bersiyon na may mababang sukat.

Upang magtatag ng aktwal na=email:

1. Sa iyong setup.xml, palitan ang setup&lt;halaga ng baseHtpsUrl&gt; tag.
Para sa pag - eeksperimento/paggawa sa iyong personal na computer, gamitin
     https://localhost:8443   
Para sa iyong publikoERDDAP™, gamitin
     https://*your.domain.org*:8443   
o wala ng :8443 kung ikaw ay gumagamit ng Apache[proxypas](/docs/server-admin/deploy-install#proxypass)upang hindi kailangan ang numero ng port.
     
2. Sa iyong setup.xml, palitan ang setup&lt;Kakaibang&gt; Halaga ng tag sa email:
```
    <authentication>email</authentication>  
```

3. Sa iyong setup.xml, tiyakin na ang sistema ng email ay naka-set sa pamamagitan ng lahat ng mga email&lt;Mga tag ng email...&gt;, kayaERDDAP™ay maaaring magpadala ng email. Kung maaari, itatag ito upang gamitin ang isang matatag na koneksiyon (SOL / TLS) sa server ng email.
     
4. Sa iyong sarilidatasets.xml, lumikha [&lt;gumagamit&gt;] (/docs/server-admin/datasets#user) Mga tag para sa bawat gumagamit na makakakuha ng pribadong datasets.
Gamitin ang adres ng user bilang username sa tag.
Huwag magtakda ng password attribute sa user tag.
     
5. Muling Pag - aaralERDDAP™upang ang mga pagbabago ay maging setup.xml atdatasets.xmlay nagkabisa.
         
###### Google, ocid, oauth2{#google-orcid-oauth2} 
*   [ **google** ](#google),[ **oksido** ](#orcid), at[ **oauth2** ](#oauth2)   (mungkahi)   
Ang tatlong ito ang inirerekomendaERDDAP™Mga mapagpipiliang mapagkakatiwalaan. Ito ang lahat ng pinakamabuting mapagpipilian. Ang iba pang mapagpipilian ay may mas mahinang seguridad.
     
###### Google{#google} 
* Ginagamit ang google awtentation option[Tanda Sumama sa Google](https://developers.google.com/identity/gsi/web/guides/overview), na isang pagpapatupad ng[OAuth 2.0 protocol ng realityation](https://oauth.net/2/).ERDDAP™Nagsesenyas ang mga gumagamit sa kanilang account sa Google email, kasama na ang mga account ng Google-managed tulad ng@noaa.govang ulat. Ito'y nagpapahintulot ngERDDAP™upang tiyakin kung sino ang gumagamit nito (Pangalan at adres ng email) at i-execure ang kanilang imahe, ngunit hindi nagbibigayERDDAP™Makakakuha ng kanilang email, ang kanilang Google Drive, o iba pang pribadong impormasyon.
    
SapagkatERDDAP™0.2 at sa ibaba,ERDDAP™ginamit ang "Gogle Sign-In". Sinasabi ng Google na ang sistema ay na-deprecated pagkatapos ng Marso 31, 2023. Kung hindi mo pa nagagawa iyon, pakisuyong bumalingERDDAP™v2.23+ upang gamitin ang bagong "Sign In kasama ang Google"-based realityation system.
    
SapagkatERDDAP™0.23 mga pagkakataon na may Content-Security-Policy na nakaayos at ginagamit ang Google Reservation, kailangan mong magdagdag https://accounts.google.com sa talaan ng pinapayagang script-src (o script-src-elem) .ERDDAP™hindi na ginagamit https://apis.google.com , kaya kung mayroon kang gayong pahintulot, maaari mo na itong alisin ngayon.
    
SapagkatERDDAP™0.24+ Baka kailangan mo ring magdagdag https://accounts.google.com/gsi/style sa stlye-src at https://accounts.google.com/gsi/ upang mag-konekta-src. Para sa script-src maaari mo na ngayong gamitin https://accounts.google.com/gsi/client.
 
    
Para sa higit pang impormasyon maaari kang magtungo sa[Google pahina](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#content_security_policy)tungkol sa pagsasaayos ng CSP. Kung may mga tanong ka, makipag-ugnayan sa ch.john sa noaa.gov.
         
###### Orcid{#orcid} 
* Ang orcid realation option ay gumagamit ng[Totoo](https://members.orcid.org/api/integrate/orcid-sign-in), na isang pagpapatupad ng[OAuth 2.0 protocol ng realityation](https://oauth.net/2/).ERDDAP™ang senyas ng mga gumagamit nito[Ortodoksiyang ulat](https://members.orcid.org/api/integrate/orcid-sign-in), na karaniwang ginagamit ng mga mananaliksik upang makilala ang kanilang sarili. Ito'y nagpapahintulot ngERDDAP™upang tiyakin ang Orcid identity ng gumagamit at makuha ang kanilang numero ng account na Orcid, subalit hindi ito nagbibigayERDDAP™Makakakuha ng impormasyon tungkol sa kanilang iba pang ulat sa Orcid.

###### Oauth2{#oauth2} 
* Ang oauth2 opsiyon ay nagpapahintulot sa mga gumagamit na pumirma sa pamamagitan ng alinman sa kanilang Google account o kanilang Orcid account.

Ang google, orcid, at oauth2 opsiyon ay ang mga kahalili sa openidong opsiyon, na itinigil pagkatapos ng pag-aalsaERDDAP™bersyon 1.68, at batay sa bersyon ng open ID na ngayon ay out-of-date. Pakisuyong lumipat sa google, ocid, o oauth2 opsiyon.

Ang mga mapagpipiliang ito ay totoong kombinyente para saERDDAP™Mga administrador - hindi mo na kailangang pakitunguhan ang mga password o ang kanilang mga hashished. Ang kailangan mo lamang likhain ay isang [&lt;gumagamit&gt;] (/docs/server-admin/datasets#user) tag para sa gumagamit sadatasets.xmlna bumabanggit sa adres ng Google email o Orcid account number ng gumagamit nito bilang attribute. (Ang password attribute ay hindi ginagamit kapag realityation=email, google, ocid o oauth2.) 

Taglay ang mga mapagpipiliang ito, ang sinuman ay maaaring pumasokERDDAP™sa pamamagitan ng pagsesenyas sa kanilang account sa Google email o Orcid account, subalit walang sinuman ang may karapatang gumamit ng pribadong mga dataset hanggang sa ikaw (angERDDAP™Tagapangasiwa) lumilikha ng&lt;user&gt; tag, nagtatakda ng kanilang Google email address o Orcid account number bilang username, at nagtatakda ng kanilang mga papel.

ERDDAP™ituring ang mga address ng email bilang case-insensitive. Ginagawa ito sa pamamagitan ng pagkumberte sa mga direksiyon ng email na iyong pinapasok (sa loob&lt;user&gt; tags) o ang mga gumagamit ay pumapasok (sa anyong login) sa kanilang buong bersiyon na may mababang sukat.

Upang makabuo ng google, ocid, o oauth2 na mapagkakatiwalaan:

* Sa iyong setup.xml, palitan ang setup&lt;halaga ng baseHtpsUrl&gt; tag.
Para sa pag - eeksperimento/paggawa sa iyong personal na computer, gamitin
     https://localhost:8443   
Para sa iyong publikoERDDAP™, gamitin
     https://*your.domain.org*:8443   
o, mas mabuti pa, kung wala ang :8443 kung gumagamit ka ng Apache[proxypas](/docs/server-admin/deploy-install#proxypass)upang hindi kailangan ang numero ng port.
     
* Sa iyong setup.xml, palitan ang setup&lt;Kakaibang&gt; Ang halaga ng tag sa google, ocid, o oauth2, halimbawa:
```
    <authentication>oauth2</authentication>  
```
###### Pagtatakda ng Google{#google-setup} 
* Para sa mga pagpipiliang google at oauth2:
Sundin ang mga tagubilin sa ibaba na gumawa ng Google annitution para sa inyongERDDAP.
     
    1. Kung wala kang account sa Google email,[lumikha ng isa](https://www.google.com/intl/en_us/mail/help/about.html)  
         
    2. Sundan[Ang mga tagubiling ito](https://developers.google.com/identity/sign-in/web/devconsole-project)upang lumikha ng proyektong Google Developers Console at makakuha ng kliyenteng ID.
        
Kapag humingi ng pahintulot ang anyong GoogleJavaMga pinagmulan ng script, pumasok sa halaga mula sa&lt;baseHtpsUrl&gt; mula sa iyong personal na computerERDDAP™setup.xml, e.g.,
         https://localhost:8443   
Sa ikalawang linya, idagdag ang&lt;baseHtpsUrl&gt; mula sa inyong publikoERDDAP™setup.xml, e.g.,
         https://*your.domain.org*:8443
 
        
Huwag magtakda ng anumang Authorized redirect URIs.
        
Kapag nakita mo ang iyong Client ID para sa proyektong ito, kopyahin at ihalo ito sa iyong setup.xml (karaniwang sa ibaba lamang.&lt;Tiniyak ang&gt; na maayos, ngunit ang paglalagay ay hindi naman talagang mahalaga), sa loob&lt;tag ng googleClientID&gt;, e.g.,
        &lt;googleClientID&gt; *ANG iyong KALIBAPI* &lt;/gogleClientID&gt;
Ang kliyenteng ID ay magiging striktong binubuo ng mga 75 karakter, na malamang ay nagsisimula sa ilang mga digit at nagtatapos sa .apps.googleusercont.com .
         
        
    3. Sa iyong sarilidatasets.xml, lumikha ng isang [&lt;gumagamit&gt;] (/docs/server-admin/datasets#user) tag sa bawat user na makakakuha ng pribadong datasets. Para sa username attribute sa tag:
        
        * Para sa mga gumagamit na pipirma sa google, gamitin ang Google email address ng gumagamit.
        * Para sa mga gumagamit na pipirma sa orcid, gamitin ang numero ng account ng tagagamit (na may mga gatlang) .
        
Huwag magtakda ng password attribute para sa user tag.
         
    4. Muling Pag - aaralERDDAP™upang ang mga pagbabago ay maging setup.xml atdatasets.xmlay nagkabisa.
         
###### Orcid setup{#orcid-setup} 
* Para sa oksido at oauth2 na mapagpipilian:
Sundin ang mga tagubilin sa ibaba na gumawa ng Oricon annitution para sa iyongERDDAP.
     (Para sa mga detalye, tingnan[Ang dokumentasyon ng Orcid sa API](https://members.orcid.org/api/integrate/orcid-sign-in).)   
     
    1. Kung wala kang account na Orcid,[lumikha ng isa](https://orcid.org/signin)  
         
    2. Ilagay sa Orcid[ https://orcid.org/signin ](https://orcid.org/signin)Ginagamit ang iyong personal na ulat ng Orcid.
         
    3. Klick on "Developer Tools" (sa ilalim ng "For researchers" sa itaas) .
         
    4. Click on "Regist for the free ORCID public API". Ipasok ang impormasyong ito:
Pangalan:ERDDAP™sa\\[iyong organisasyon\\]  
Website:\\[ng iyongERDDAP'Ang sakop\\]  
Paglalarawan:ERDDAP™ay isang siyentipikong tagapagsilbi ng impormasyon. Kailangang tiyakin ng mga gumagamit ang Google o Orcid upang ma-akses ang mga hindi-public dataset.
Mga hostname:\\[ng iyongERDDAP'Ang sakop\\]/erddap/loginOrcid.html
         
    5. Kicket sa Icon ng Save (ito ay mukhang 3.5" disk&#33;) .
Pagkatapos ay makikita mo ang iyong ORCID APP Client ID at ORCID Client Secret.
         
    6. Kopya at paste ang ORCID APP Client ID (na magsisimula sa "APP-") ilagay sa setup.xml&lt;orcidClientID&gt; tag, e.g.,
```
        <orcidClientID>APP-*ALPHANUMERICCHARACTERS*</orcidClientID>
```
    7. Pagkopya at paste Ang Lihim ng ORCID (mga titik na alpha-numeric na may mga gatla) ilagay sa setup.xml&lt;orcidClientSecret&gt; tag, e.g.,
```
        <orcidClientSecret>*alpha-numeric-characters-with-dashes*</orcidClientSecret>
```

    8. Sa iyong sarilidatasets.xml, lumikha ng isang [&lt;gumagamit&gt;] (/docs/server-admin/datasets#user) tag sa bawat user na makakakuha ng pribadong datasets. Para sa username attribute sa tag:
        
        * Para sa mga gumagamit na pipirma sa google, gamitin ang Google email address ng gumagamit.
        * Para sa mga gumagamit na pipirma sa orcid, gamitin ang numero ng account ng tagagamit (na may mga gatlang) .
        
Huwag magtakda ng password attribute para sa user tag.
         
    9. Muling Pag - aaralERDDAP™upang ang mga pagbabago ay maging setup.xml atdatasets.xmlay nagkabisa.
             

###### Sa Anumang Paraan{#log-in-either-way} 
Kung gagamitin mo ang google, ocid, oauth2 annitation opsiyon, at ang Google Sign-In o Orcid's realation API ay biglang humihinto sa paggawa (sa anumang dahilan) o huminto sa pagtatrabaho na gaya ngERDDAP™Inaasahan, ang mga gumagamit ay hindi maaaring mag - log in sa inyongERDDAP. Bilang isang pansamantala (o permanente) Ang solusyon, maaari mong hilingin sa mga gumagamit nito na pumirma sa ibang sistema (Kumuha ng account sa Google email, o kumuha ng account) . Upang gawin ito:

1. Palitan ang&lt;Trueation&gt; tag upang pahintulutan nito ang iba pang sistema ng pag - iral. Ang oauth2 opsiyon ay pumapayag sa mga gumagamit na mag-interno sa alinmang sistema.
2. Isa - isahin ang bawat isa&lt;user&gt; tags at palitan ang username attribute mula sa address ng Google email hanggang sa katumbas na numero ng account ng Orcid (o bisyo-versa) , ngunit panatilihin ang mga papel na iyon na pareho.

###### Binuksan{#openid} 
ERDDAP™ay hindi na sumusuporta sa openid realityation option, na batay sa isang bersiyon ng open ID na ngayon ay out-of-date. Pakisuyong gamitin ang google, ocid, o oauth2 na mapagpipilian sa halip.

###### BASIC{#basic} 
ERDDAP™ay hindi sumusuporta sa BASIC realityation sapagkat:
* Ang BASIC ay para bang dinisenyo sa mga pahina ng web na patiunang binigyan ng kahulugan na nangangailangan ng ligtas na pag-access o kumot sa/off access sa buong site, ngunitERDDAP™pinapayagan (limitadong access) mga datos na idadagdag sa-the-fly.
* ANG pagiging totoo ng BASIC ay hindi nagbibigay ng paraan upang ang mga gumagamit nito ay mag - log out&#33;
* ANG pagpapatunay sa katotohanan ay kilala bilang hindi matatag.

##### Matatag na Pinagmumulan ng Data{#secure-data-sources} 
Kung ang set ng datos ay may limitadong accessERDDAP™gumagamit, ang pinagmulan ng datos (mula sa kung saanERDDAP™kinuha ang datos) ay hindi dapat kunin sa publiko. Kaya paano?ERDDAP™makuha ang datos para sa limitadong pag-akses ng datos? Ang ilang mapagpipilian ay:

*   ERDDAP™ay maaaring magsilbi ng datos mula sa lokal na mga file (Halimbawa, sa pamamagitan ng EDDTable Mula sa mga Lamok oEDDGridMula sa mga Labi) .
     
*   ERDDAP™ay maaaring nasa loob ng isang[DMZ](https://en.wikipedia.org/wiki/Demilitarized_zone_(computing)) at ang pinagmulang datos (e.g., isangOPeNDAPserver o database) ay maaaring nasa likuran ng isang[pader ng apoy](https://en.wikipedia.org/wiki/Firewall), kung saan ito makukuhaERDDAP™ngunit hindi sa publiko.
     
* Ang mapagkukunan ng datos ay maaaring nasa isang pampublikong website, ngunit nangangailangan ng login upang makuha ang datos. Ang dalawang uri ng dataset naERDDAP™ay maaaring kumuha ng log sa magagamit[EDDTable Mula sa Didabasa](/docs/server-admin/datasets#eddtablefromdatabase)at[EDDTable Mula saCassandra](/docs/server-admin/datasets#eddtablefromcassandra). Ang mga dataset na ito ay sumusuporta (at dapat na laging gamitin) mga pangalan ng gumagamit (lumilikha ngERDDAP™gumagamit na mayroon lamang mga pagbasa-lamang na pribilehiyo) , mga password, koneksiyon ng SSL, at iba pang mga hakbang sa seguridad.
    
Subalit sa pangkalahatan, sa kasalukuyan,ERDDAP™ay hindi maaaring harapin ang mga pinagkukunang ito ng datos dahil wala itong mga probisyon para sa pagtotroso sa pinagkukunan ng datos. Ito ang dahilan kung bakit maaari kang makapasok[EDDGridMula sa Erddap at Mapagkakatiwalaan Mula sa Erddap](/docs/server-admin/datasets#eddfromerddap)Hindi maaaring limitahan ang datasets. Sa kasalukuyan, ang mga tagaroonERDDAP™walang paraan upang maitala at makuha ang impormasyong metadata mula sa malayoERDDAP. At ang paglalagay ng "remote"ERDDAP™sa likod ng iyong firewall at pag - aalis ng madaling makuhang dataset Hindi nalulutas ng mga pagbabawal ang problema: yamang hinihiling ng gumagamit ang EDDXxx Mula sa Erddap na datos ay kailangang ibaling sa malayoERDDAP™, ang liblibERDDAP™ay kailangang madaling marating.
    
#### Mga Depensa Laban sa mga Manlalasing{#defenses-against-hackers} 
May masasamang tao na nagsasamantala sa mga kahinaang panseguridad na gaya ng server softwareERDDAP.ERDDAP™sundin ang payo ng karaniwang seguridad na magkaroon ng ilang uri ng depensa:

* Mahigpit na mga Pribilehiyo -- Isa sa pinakamahalagang depensa ay patakbuhin ang Tomcat sa pamamagitan ng isang gumagamit na tinatawag na tomcat na walang password (upang walang makapasok na gaya ng gumagamit na iyon) at may limitadong mga pribilehiyo sa file system (e.g., basahin-lamang ang datos) . TingnanERDDAPMga tagubilin para sa[Pagtatayo ng tomcat](/docs/server-admin/deploy-install#tomcat).
* Mabigat na Paggamit Sa pangkalahatan,ERDDAP™ay itinatayo para sa malawakang paggamit, kasali na ang mga iskrip na humihiling ng sampu - sampung libong kahilingan, nang sunud - sunod. Mahirap itong abutinERDDAP™upang sabay na buksan ang sarili hanggang sa mabigat na lehitimong gamit at ipagsanggalang ang sarili nito mula sa pag - abuso. Kung minsan mahirap makilala ang mabigat na lehitimong paggamit, labis - labis na legal na paggamit, at di - nararapat na paggamit (at kung minsan ito ay talagang madali) . Kabilang sa iba pang depensa,ERDDAP™Sadyang hindi pinahihintulutan ang isang kahilingan na gumamit ng labis na bahagi ng yaman ng sistema (malibang ang sistema ay hindi aktibo) .
* Alamin ang Mapanguluhang mga Manggagamit - KungERDDAP™ay bumabagal o nagyeyelo (Marahil dahil sa ang isang walang muwang na gumagamit o bot ay gumagawa ng maraming iskrip upang magsumite ng maramihang kahilingan nang sabay - sabay o marahil dahil sa isang masamang tao[Pagkakaila-of-service](https://en.wikipedia.org/wiki/Denial-of-service_attack)pagsalakay) , maaari mong tingnan ang[Araw - araw na Report email](#daily-report)  (at mas madalas na magkatulad na impormasyon sa[ERDDAP™talaksang troso](#log)) na nagtatanghal ng bilang ng mga kahilingan ng pinakaaktibong mga gumagamit (tingnan ang "Tinig ng mga Tagatanong (Pinayagan) ") .ERDDAP™nagpapadala rin ng email sa administrador kailanma't mayroon["Unuswal na aktibidad: &gt;25% ng mga kahilingan ay nabigo"](#failed-requests). Pagkatapos ay maaari mong tingnan angERDDAP™log file upang makita ang kalikasan ng kanilang mga hiling. Kung sa palagay mo'y napakaraming hinihiling ang isang tao, kakatwang mga kahilingan (Hindi ka maniniwala sa nakita ko, bueno, marahil ay paniniwalaan mo) , o attack-type requests, maaari mong idagdag ang kanilang IP address sa blacklist.
* Blacklist -- Maaari mong idagdag ang direksiyon ng IP ng magugulong gumagamit, mga bit, at mga IP[Pagkakaila-of-service](https://en.wikipedia.org/wiki/Denial-of-service_attack)sa mga sumasalakayERDDAP [" blacklist "](/docs/server-admin/datasets#requestblacklist), upang ang mga kahilingan sa hinaharap mula sa kanila ay agad na tanggihan. Ang tagpong ito ay nasadatasets.xmlupang mabilis na maidagdag mo sa listahan ang isang direksiyon ng IP at pagkatapos ay saka[bandila](#flag)isang dataset upangERDDAP™at ikapit agad ang pagbabago. Ang maling mensahe na ipinadala sa mga gumagamit ng blacklisted ay humihimok sa kanila na makipag - ugnayan saERDDAP™Tagapangasiwa kung inaakala nilang nagkamali sila ng paglalagay sa talaan ng mga itim. (Sa aming karanasan, maraming gumagamit nito ang walang kamalay - malay na sila'y sabay - sabay na gumagawa ng maraming iskrip, o na ang kanilang mga iskrip ay gumagawa ng walang saysay na mga kahilingan.) 
* Talaan ng mga Nilalaman (Partikular, ang EDDTable FromDatabase) ay naghaharap ng karagdagang mga panganib sa seguridad (e.g., iniksiyon ng SQL) at magkaroon ng sarili nilang mga hakbang sa seguridad. Tingnan ang impormasyon para sa mga uring iyon ng datasets[Paggawang kasama ng mga kapatiddatasets.xmlLarawan](/docs/server-admin/datasets), lalo na[Kagustuhan Mula sa Katiwasayan ng Database](/docs/server-admin/datasets#database-security).
* Seguridad Audit -- BagamanNOAAAyaw ng seguridad na ito ang aming mga kahilingan para sa mga scan sa loob ng maraming taon, regular na nilang sinusuri ngayon ang aking mga gamit (Bob's)  ERDDAP™pagluluklok. Bagaman nasumpungan ng panimulang mga scan ang ilang problema na saka ko naayos, ang kasunod na mga scan ay hindi nakasumpong ng mga problemaERDDAP. Ang mga scan ay nag - aalala sa maraming bagay: lalo na, yamangtabledapAng mga kahilingan ay mukhang mga kahilingan ng SQL, sila ay nag-aalala tungkol sa SQL injection vulnerability. Subalit ang mga pagkabahalang iyon ay walang batayan sapagkatERDDAP™ay laging nag-parse at nagpapatunay sa mga querie at pagkatapos ay hiwalay na nagtatayo ng query ng SQL sa paraang hindi nag-iniksiyon ng mga vulnerabilidad. Ang isa pang bagay na kanilang inirereklamo kung minsan ay na ang ating sariliJavabersyon o Tomcat bersyon ay hindi up-to-date ayon sa gusto nila, kaya i-update natin ito bilang tugon. Dati akong nag - alok na ipakita sa mga tao ang mga ulat tungkol sa seguridad, subalit ngayon ay sinasabi sa akin na hindi ko magagawa iyon.

#### Mga tanong? Mga mungkahi?{#questions-suggestions} 
Kung may mga tanong ka tungkol saERDDAPAng sistemang panseguridad o may anumang mga katanungan, pag - aalinlangan, pagkabahala, o mga mungkahi tungkol sa kung paano ito itinatayo, tingnan ang ating mga katanungan[sa pagkuha ng karagdagang suporta](/docs/intro#support).
    

## Mga Bagay na Hindi Mo Kailangang Malaman{#things-you-dont-need-to-know} 

Ito ang mga detalye na hindi mo kailangang malaman hangga't hindi bumabangon ang pangangailangan.

### IkalawaERDDAP™ {#second-erddap} 
*    **Paghahanda ng IkalawaERDDAP™para sa Pagsubok/Paglutas**   
Kung nais mong gawin ito, may dalawang paraan:
    *    (Pinakamagaling) Iluklok ang Tomcat atERDDAP™sa isang computer maliban sa computer na kinaroroonan ng iyong publikoERDDAP. Kung gagamitin mo ang iyong personal na computer:
        1. Gawin ang instalasyon nang isa-isa. Paunahin si Tomcat at tumakbo muna.
Kapag tumatakbo si Tomcat, dapat na ang Tomcat Maler
            [ http://127.0.0.1:8080/manager/html/ ](http://127.0.0.1:8080/manager/html/)  (o marahil[ http://localhost:8080/manager/html/ ](http://localhost:8080/manager/html/)) 
        2. IluklokERDDAP.
        3. Huwag gumamit ng akses upang alisin ang numero ng port mula saERDDAP™URL.
        4. Sa loob[setup.xml](/docs/server-admin/deploy-install#setupxml), ilagay ang base Url sa http://127.0.0.1:8080
 
        5. Pagkatapos mong simulan itoERDDAP™, dapat ay makita mo ito
            [ http://127.0.0.1:8080/erddap/status.html ](http://127.0.0.1:8080/erddap/status.html)  (o marahil[ http://localhost:8080/erddap/status.html ](http://localhost:8080/erddap/status.html)) 
#### Ikalawang Tomcat{#second-tomcat} 
*    (Ikalawang Pinakamagaling) Ikabit ang isa pang Tomcat sa computer na gaya ng iyong publikoERDDAP.
    1. Gawin ang instalasyon nang isa-isa. Paunahin si Tomcat at tumakbo muna.
Palitan ang lahat ng mga numero ng port na may kaugnayan sa ikalawang Tomcat (e.g., baguhin ang 8080 tungo sa 8081)   (tingnan ang[Maraming Tomcat Bahagi ng Instances](https://tomcat.apache.org/tomcat-8.0-doc/RUNNING.txt)kalagitnaan ng dokumentong iyon) .
    2. IluklokERDDAP™sa bagong Tomcat.
    3. Huwag gumamit ng akses upang alisin ang numero ng port mula saERDDAP™URL.
    4. Sa loob[setup.xml](/docs/server-admin/deploy-install#setupxml), ilagay ang base Url sa http://www.*yourDomainName*:8081
 
    5. Pagkatapos mong simulan itoERDDAP™, dapat ay makita mo ito
         http://www.*yourDomainName*:8081/erddap/status.html   
             
### Nag - uudyok ang Matatag na Estado{#solid-state-drives} 
*    **Nag - uudyok ang Matatag na Estado (Mga SSD) ay napakaganda&#33;**   
Ang pinakamadali, pinakamadali, at pinakamurang paraan ng pagpapabilisERDDAP'Makakakuha ng taskular data ay ilagay ang mga data file sa isang Solid State Drive (SSD) . Karamihan ng mga tabular datasets ay maliit lamang, kaya ang 1 o 2 TB SSD ay malamang na sapat na upang makuha ang lahat ng data files para sa lahat ng iyong tabular datasets. Sa wakas ang SSD ay humihina kung ikaw ay sumusulat ng impormasyon sa isang selula, inaalis ito, at isinusulat ang bagong impormasyon sa selulang iyon nang maraming ulit. Kaya kung gagamitin mo lamang ang iyong SSD upang isulat minsan ang datos at basahin ito nang maraming beses, kahit na ang isang mamimili-grade SSD ay dapat tumagal ng napakahabang panahon, marahil mas matagal pa kaysa sa anumang Hard Disk Drive (HDDD) . Ang Consumer-grade SSD ngayon ay mura (sa 2018, ~$200 para sa 1 TB o ~$400 para sa 2 TB) at mabilis pa ring bumababa ang presyo. KailanERDDAP™Nag-access ng data file, isang SSD ay nag-aalok ng parehong mas maikling latency (~0.1ms, laban sa ~3ms para sa isang HDD, laban sa ~10 (?) Mga m para sa isang RAID, laban sa ~55m para sa Amazon S3) at mas mataas na underput (~500 MB/S, versus ~75 MB/s para sa isang HDD, versus ~500 MB/s para sa isang RAID) . Kaya makakakuha ka ng malaking pampasigla sa paggawa (hanggang 10X laban sa HDDD) sa halagang $200&#33; Kung ihahambing sa karamihan ng iba pang posibleng pagbabago sa iyong sistema (isang bagong server sa halagang $10,000? isang bagong RAID sa halagang $35,000? isang bagong network sa halagang $5000? Atbp.) , ito ang pinakamahusay na Pagbabalik sa Investment (ROI) . Kung/kapag namatay ang SSD (sa 1, 2, ... 8 taon) , palitan ito. Huwag kang umasa rito na para sa pangmatagalan, archival storage ng datos, para lamang sa harapang-end na kopya ng datos.\\[Ang SSD's ay magiging mahusay din para sa grided data, ngunit ang karamihan ng mga grided datasets ay mas malaki, ginagawang napakamahal ang SSD.\\]
    
Kung ang iyong server ay hindi punô ng memorya, ang karagdagang memorya para sa iyong server ay isa ring malaki at hindi magastos na paraan upang pabilisin ang lahat ng aspekto ng iyong serverERDDAP.
     
    
### [Mabibigat na Pasan / Pagsugpo](#heavy-loads--constraints) **  {#heavy-loads--constraints} 
Sa pamamagitan ng malakas na paggamit, isang standaleERDDAP™ay maaaring hadlangan ng iba't ibang problema. Para sa higit pang impormasyon, tingnan ang[listahan ng mga pagbabawal at solusyon](/docs/server-admin/scaling#heavy-loads--constraints).
     
### Mga Grid, Cluster, at mga Pederasyon{#grids-clusters-and-federations} 
Sa ilalim ng napakalakas na gamit, isang solong standaleERDDAP™ang isa o higit pang mga pagbabawal at maging ang iminungkahing mga lunas ay hindi sapat. Para sa gayong mga kalagayan,ERDDAP™ay may mga katangian na nagpapangyaring madaling makagawa ng mga grid na madaling patagin (Tinatawag ding kumpol o pederasyon) ngERDDAPna nagpapahintulot sa sistema na pangasiwaan ang labis na paggamit (e.g., para sa isang malaking sentro ng datos) . Para sa higit pang impormasyon, tingnan ang[Mga grid, kumpol, at pederasyon ngERDDAPs](/docs/server-admin/scaling).
     
### Pagbuo ng Ulap{#cloud-computing} 
Maraming kompanya ang nagsisimulang mag - alok[serbisyo sa pagpupuslit ng ulap](https://en.wikipedia.org/wiki/Cloud_computing)  (e.g.,[Mga Web Serbisyo ng Amazon](https://aws.amazon.com/)) .[Web hosting company](https://en.wikipedia.org/wiki/Web_hosting_service)ay nag-aalok ng mas simpleng mga serbisyo mula noong mid-1990's, ngunit ang mga serbisyong "ulap" ay malaking pinalawak ang pag-aangkop ng mga sistema at ang saklaw ng mga serbisyong inaalok. Magagamit mo ang mga paglilingkod na ito upang magtayo ng isa lamangERDDAP™o isang grid/cluster ngERDDAPs upang pangasiwaan ang labis na paggamit. Para sa higit pang impormasyon, tingnan ang[kasama ng ulapERDDAP™](/docs/server-admin/scaling#cloud-computing).

### Amazon{#amazon} 
*    **[Mga Web Serbisyo ng Amazon (MGA AW) Malaking Overview ng EC2](#amazon)**   
    [Mga Web Serbisyo ng Amazon (MGA AW) ](https://aws.amazon.com/)ay isang[serbisyo sa pagpupuslit ng ulap](https://en.wikipedia.org/wiki/Cloud_computing)na nagbibigay ng iba't ibang imprastraktura sa computer na maaari mong upahan sa oras. Maaari kang magluklokERDDAP™sa isang[Maningning at Matibay na Ulap (EC2) ](https://aws.amazon.com/ec2/)Halimbawa (pangalan nila para sa isang computer na maaari mong upahan sa oras) . Mahusay ang AWS[AWS User Guide](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html)at maaari mong gamitin ang Google upang hanapin ang mga sagot sa espesipikong mga tanong na maaaring taglay mo. Subaybayan ang sarili -- sapat na dami ng trabahong dapat simulan. Subalit minsang makakuha ka ng isang server at tumakbo, madali kang makaupa ng karagdagang yaman (Mga server, database, SSD-space, atbp.) kung ano ang kailangan mo, sa makatuwirang halaga.\\[Hindi ito isang rekomendasyon o pagsang - ayon ng Amazon Web Services. May iba pang mga tagapaglaan ng ulap.\\]
    
Isang sumaryo ng mga bagay na kailangan mong gawin upang makuhaERDDAP™Ang pagtakbo sa AWS ay:
    
    * Sa pangkalahatan, gagawin mo ang lahat ng bagay na inilarawan sa[AWS User Guide](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html).
    * Maglagay ng ulat ng WAS.
    * Maglagay ng isang gumagamit ng AWS sa loob ng account na iyon na may mga pribilehiyong administrador. Hango sa bilang ng gumagamit na ito na gawin ang lahat ng sumusunod na hakbang.
    * Paglitaw ng Elastic Block (EBS) ay katumbas ng hard drive na nakakabit sa iyong server. Ang ilang espasyo sa EBS ay itatabi kapag una kang lumikha ng isang EC2 halimbawa. Ito'y patuloy na pag - iimbak - ang impormasyon ay hindi nawawala kapag itinigil mo ang iyong EC2 halimbawa. At kung ikaw ay magbago ng mga uri ng halimbawa, ang iyong espasyo sa EBS ay awtomatikong napapamahal sa bagong pagkakataon.
    * Gumawa ng Elastic IP address upang ang iyong EC2 ay magkaroon ng isang matatag, pampublikong URL (taliwas sa isang pribadong URL lamang na nagbabago tuwing babalik ka sa iyong pagkakataon) .
    * Gumawa at simulan ang EC2 (computer) . Napakaraming iba't ibang[Halimbawa ng mga uri](https://aws.amazon.com/ec2/instance-types/), bawat isa sa iba't ibang presyo. Ang isang m4.lar o m4.xlarge na pangyayari ay malakas at marahil ay angkop para sa karamihan ng gamit, ngunit pumili ng anumang bagay na nakatutugon sa iyong mga pangangailangan. Malamang na gusto mong gamitin ang Linux ng Amazon bilang operating system.
    * Kung ang iyong desktop/laptop computer ay isang Windows computer, maaari mong gamitin[KARAPATAN](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/putty.html), isang malayang kliyente ng SH para sa Windows, upang ma-access ang command line ng EC2. O, baka mayroon ka pang ibang programa ng SSH na gusto mo.
    * Kapag ikaw ay nakapasok sa iyong EC2 halimbawa, ikaw ay ipupugay bilang ang administratibong tagagamit na may pangalang user na "ec2-user". Ang ec2-user ay may mga pribilehiyong sudo. Kaya, kapag kailangan mong gawin ang isang bagay bilang tagagamit ng ugat, gamitin: sudo *NG KABALITAAN NG GUMISING.* 
    * Kung ang iyong desktop/laptop computer ay isang Windows computer, maaari mong gamitin[FileZilla](https://stackoverflow.com/questions/16744863/connect-to-amazon-ec2-file-directory-using-filezilla-and-sftp), isang libreng programa ng SFTP, upang ilipat ang mga files sa/mula sa inyong EC2 na pagkakataon. O, baka may iba ka pang programa ng SFTP na gusto mo.
    *   [Iluklok na Apache](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/install-LAMP.html)sa iyong EC2 halimbawa.
    * Sundin ang pamantayan[ERDDAP™maglagay ng mga tagubilin](/docs/server-admin/deploy-install).
         
### Maghintay Pagkatapos ng Muling Pagpapainit{#waitthentryagain-exception} 
Ang isang gumagamit ay maaaring makatanggap ng maling mensahe na gaya ng isang taong gumagamit nito
Maghintay Pagkatapos ng Tren:
Nagkaroon ng (Pansamantala?) problema. Sandali lang, subukan mo uli. (Sa isang browser, i - click ang Reload button.)   
Mga Detalye: GridDataAccessor.\\[0\\]= "12352730" inaasahang "123532800".

Ang panlahat na paliwanag tungkol sa WaitHowTry RemainException ay:
KailanERDDAP™ay tumutugon sa kahilingan ng gumagamit, maaaring may di - inaasahang pagkakamali sa dataset (e.g., error habang nagbabasa ng datos mula sa file, o error sa pagkuha ng remote dataset) . Maghintay Pagkatapos ay Muling HudyatanERDDAP™bigo ang kahilingan (Hanggang dito) ngunit iyonERDDAP™Dapat sikaping muling i -load ang dataset (ang tawag nito[Kahilingan](#requestreloadasap)) at suriing muli ang kahilingan. Kadalasan, nagtatagumpay ito, at nakikita lamang ng gumagamit na mabagal ang pagtugon sa kahilingan. Sa ibang pagkakataon naman, ang muling pagkarga ay nabibigo o masyadong mabagal, o ang kasunod na pagtatangka na harapin ang kahilingan ay nabibigo rin at nagtatapon ng isa pang WaitHowTry reunced. Kapag nangyari iyan,ERDDAP™markahan ang dataset para sa muling pagkarga ngunit sabihin sa gumagamit (Sa pamamagitan ng Isang WaitHowTry Reunction) na nabigo samantalang sinasagot ang kahilingan.

Iyan ang normal na paggawi. Maaaring harapin ng sistemang ito ang maraming karaniwang problema.
Subalit posible na ang sistemang ito ay labis na mapukaw. Ang pinakakaraniwang sanhi ay naERDDAP'Ang pagkarga ng dataset ay hindi nakakakita ng problema, ngunitERDDAPAng pagtugon sa isang kahilingan para sa impormasyon ay nagpapatunay sa problema. Anuman ang dahilan, ang solusyon ay kung ano ang mali sa dataset. Tingnan sa log.txt upang makita ang aktuwal na maling mensahe at harapin ang mga problema. Kung ang maraming file ay may tanggap na headers ngunit hindi tanggap na datos (sirang talaksan) , palitan ang mga files ng mga di-opisyal na files. Kung ang kaugnayan sa isang RAID ay malabo, ayusin ito. Kung ang koneksyon sa isang remote service ay flakey, humanap ng paraan upang hindi ito ma-flakey o mai-download ang lahat ng files mula sa malayong source at ihain ang datos mula sa mga lokal na files.

Ang detalyadong paliwanag sa espesipikong pagkakamaling iyon (sa itaas) ay:
Para sa bawat isaEDDGriddatos,ERDDAP™ang iba't ibang halaga ng axis. Halimbawa, ginagamit ang mga ito upang ikumberte ang hiniling na mga pamantayan ng axis na gumagamit ng " () " Gumawa ng mga index number. Halimbawa, kung ang halaga ng axis ay "10, 15, 20, 25", isang kahilingan para sa (20) ay bibigyang - kahulugan bilang isang kahilingan para sa index #2 (0-based na mga indiks) . KailanERDDAP™ay humihiling ng impormasyon at nakukuha ang impormasyon mula sa pinagmulan, ipinakikita nito na ang mga pagpapahalaga sa axis na nakuha nito mula sa pinagmulan ay katugma ng halaga ng axis sa memorya. Karaniwan na, gayon nga. Subalit kung minsan ang pinagmumulan ng impormasyon ay nagbago sa isang mahalagang paraan: halimbawa, ang mga halaga ng indise mula sa pasimula ng axis variable ay maaaring inalis (e.g., "10, 15, 20, 25" ay maaaring naging "20, 25, 30") . Kung mangyari iyan, maliwanag naERDDAPAng interpretasyon ng kahilingan (e.g., " (20) " ay index #2) ngayon ay mali. KayaERDDAP™Maghagis ng eksepsiyon at tumawag ng RequestReloadAP.ERDDAP™ang update sa dataset sa lalong madaling panahon (sa loob ng ilang segundo, karaniwan nang sa loob ng isang minuto) . Ang iba pa, kahawig na mga problema ay nag - aalis din ng eksepsiyon sa WaitHowTry.
    
#### Kahilingan{#requestreloadasap} 
Maaaring makita mo ang RequestionRESAP sa log.txt file sa mismong sandaling matapos ang isang mensahe ng pagkakamali at kadalasan ay malapit sa isang error[Maghintay Pagkatapos ng Muling Pagpapainit](#waitthentryagain-exception). Ito ay pangunahin nang isang panloob, programmatic na paraan para saERDDAP™upang magtakda ng[bandila](#flag)upang ipahiwatig na ang dataset ay dapat muling ikarga sa ASAP.
     
### Mga Larawang Hindi Naaalis{#files-not-being-deleted} 
Para sa ilanERDDAP™Mga instalasyon, nagkaroon ng problema sa ilang pansamantalang talaksan na nililikha ngERDDAP™pananatiling bukas (nagkakamali) at sa gayo'y hindi inaalis. Sa ilang kaso, marami sa mga file na ito ang naipon at nakaipon ng maraming disk space.

Inaasahan, ang mga problemang ito ay naayos na (kung paanoERDDAP™v2.00) . Kung nakikita mo ang problemang ito, pakisuyong i - email ang directory+names ng nakapipinsalang mga files kay Chris. John sa noaa.gov. May ilang mapagpipilian ka sa pagharap sa problema:

* Kung ang mga files ay hindi malaki at hindi ikaw ay naubusan ng disk space, maaari mong ipagwalang bahala ang problema.
* Ang pinakasimpleng solusyon ay isara ang tomcat/ERDDAP™  (pagkatapos ng mga oras mas kakaunting gumagamit ang apektado) . Sa panahon ng pag - aalis, kung hindi inaalis ng operating system ang mga file, i - delete ito nang manu - mano. Pagkatapos ay magpahingaERDDAP.
         
### JSON-ld{#json-ld} 
*    **[Semantic Markup of Datasets na may json-ld (JON Maugnay na Data) ](#json-ld)**   
    ERDDAP™gamit ngayon[json-ld (JON Maugnay na Data) ](https://json-ld.org)upang gawing bahagi ng talaan ng impormasyon at datasets[" semantic web "](https://en.wikipedia.org/wiki/Semantic_Web), na siyang ideya ni Tim Berners-Lee na gawing mas madaling basahin ang web content at makina na "mauunawaan". Ginagamit ang nilalamang json-ld[schema.org](https://schema.org/)Mga termino at kahulugan. Paghahanap ng mga makina ([Moogle lalo na](https://developers.google.com/search/docs/data-types/datasets)) at iba pang mga kasangkapang semantiko ay maaaring gumamit ng organisadong markup na ito upang mapadali ang pagtuklas at indexing. Ang json-ld na naka-ayos na markup ay lumilitaw bilang hindi nakikitang-to-humans&lt;&gt; ng Sulat kodigo sa https://.../erddap/info/index.html web pahina (na isang semantikong web[Datatal](https://schema.org/DataCatalog)) at sa bawat isa https://.../erddap/info/*datasetID*/index.html web pahina (na isang semantikong web[Talaan ng mga Nilalaman](https://schema.org/Dataset)) . (Partikular na salamat kay Adam Lead mas mahusay at Rob Fuller ng Marine Institute sa Ireland dahil sa paggawa ng mahihirap na bahagi ng gawain upang gawin ang bahaging ito ng Marine InstituteERDDAP.)   
     
### Mga URL{#out-of-date-urls} 
Dahan-dahan ngunit tiyak, ang mga URL na isinulat ng mga data provider sa mga data file ay nagiging out-of-date (Halimbawa,httpmaginghttps, ang mga website ay muling binuo, at ang mga organisasyong tulad ng NDC/NGDC/NCDC ay muling binuo sa NCEI) . Ang resultang sirang mga link ay isang laging-kasalukuyang problema na kinakaharap ng lahat ng mga website. Upang maharap ito,ERDDAP™ngayon ay may sistema na awtomatikong mag-apruba ng out-of-date URLs. Kung mga GenerateDataset Xml ay nakakakita ng out-of-date URL, ito ay nagdaragdag ng up-to-date URL sa&lt;addAttributes&gt;. Gayundin, kapag isang dataset na karga, kungERDDAP™Tingnan ang isang out-of-date URL, tahimik nitong binabago ito sa up-to-date URL. Ang mga pagbabago ay kinokontrol ng isang serye ng search-for/replace-na may mga pares na itinakda sa&lt;Mga updateUrls&gt; sa loobERDDAP'
\\[tomcat\\]/webapps/erddap/WEB-INF/class/gov/noa/pfel/erddap/util/messages.xml file. Maaari kang gumawa ng mga pagbabago roon. Kung ikaw ay may mga mungkahi para sa mga pagbabago, o kung inaakala mo na ito ay dapat na gawing isang paglilingkod (gaya ng mga nakukumberte) , Please email Chris. John sa noaa.gov.
     
### MGA COR{#cors} 
* MGA COR ([Pagbabahagi ng Cross-Origin](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing))   
" ay isang mekanismo na nagpapahintulot ng limitadong yaman (e.g. fonts o fontsERDDAP™datos) sa isang web page na hihilingin mula sa isa pang domain sa labas ng nasasakupan na pinagsilbihan ng unang yaman". (Arun Ranganathan) . Sa simpleng pananalita, ang CORS ay isang mensahe na maaaring ilagay sa HTTP header ng isang tugon, na ang sabi, "mahusay ito sa lugar na ito kung may ibang lugar (espesipikong mga katangian, o lahat) Kumuha ng pera (e.g., datos) mula sa lugar na ito at ipagamit ito sa kanilang site". Kaya, ito ay isang mapagpipilian[HONP](https://en.wikipedia.org/wiki/JSONP).
    
Ang mga developer ngERDDAP™ay hindi nag - aangking mga dalubhasa sa seguridad. Hindi tayo lubusang maliwanag tungkol sa mga usaping panseguridad na may kaugnayan sa CORS. Ayaw nating gumawa ng anumang pangungusap na nagpapatunay sa isang pagkilos na nakababawas sa seguridad. Kaya mananatili lamang kaming neutral at ipinauubaya ito sa bawat isaERDDAP™Admin upang magpasiya kung ang mga pakinabang o kakayahan ng isang tagapangulo ng CORS ay sulit sa mga panganib. Gaya ng dati, kung ang iyongERDDAP™ay may anumang pribadong datasets, mabuting ideya na maging higit na maingat tungkol sa seguridad.
    
Kung nais mong magkaroon ng COR para sa iyong sariliERDDAP™, mayroon[handang tumanggap ng mga tagubilin](https://enable-cors.org/index.html)Inilalarawan kung paano magagawa ng mga administrador ng website ang isang STS header sa pamamagitan ng kanilang mas mababang antas na server software (e.g., Apache o nginx) .
    
### Mga Palete{#palettes} 
* Ang mga palette ay ginagamit ngERDDAP™upang gawing iba't ibang kulay ang iba't ibang halaga ng impormasyon kapag gumagawa ng mga graph at mapa.
    
Ang bawat paleta ay binibigyang kahulugan sa isang .cpt-style palender file na ginagamit ng[GMT](https://www.soest.hawaii.edu/gmt/). LahatERDDAP™.cpt files ay tanggap na GMT .cpt files, ngunit ang kabaligtaran ay hindi totoo. Para magamitERDDAP™, may mga talaksang .cpt:
    
    * Ang mga opsyonal na komento ay nakahanay sa simula ng file, simula sa "#".
    * Isang pangunahing seksiyon na may paglalarawan sa mga bahagi ng paleta, isang bahagi sa bawat linya. Ang bawat bahagi ng linya ng paglalarawan ay may 8 pamantayan:
magsimula Halaga, simulan, magsimula Berde, magsimula Blue, endValue, endRed, endGreen, endBlue.
Maaaring maraming bahagi.ERDDAP™ay gumagamit ng linear interpolation sa pagitan ng startRed/Green/Blue at endRed/Green/Blue ng bawat bahagi.
        
Iminumungkahi namin na ang bawat bahagi ay magtakda ng isang pasimula at pangwakas na kulay na naiiba, at na ang panimulang kulay ng bawat bahagi ay katulad ng dulong kulay ng naunang bahagi, kung kaya't ang paleta ay naglalarawan ng isang patuloy na pagsasama ng mga kulay.ERDDAP™ay may sistema para sa paglikha ng on-the-fly isang paleta ng mga kulay na discrete mula sa isang paleta na may tuloy-tuloy na paghahalo ng mga kulay. IsaERDDAP™Masasabi ng gumagamit nito kung gusto nilang maging Continuous ang paleta (orihinal) o Lumihis (hango sa orihinal) . Subalit may makatuwirang mga dahilan sa hindi pagsunod sa mga rekomendasyong ito para sa ilang paleta.
        
    * Ang simulangValue at endValues ay dapat integers.
Ang unang bahagi ay dapat magkaroon ng simulaValue=0 at endValue=1.
Ang ikalawang bahagi ay dapat magkaroon ng simulangValue=1 at endValue=2.
Etc.
    * Ang pula, berde, at asul na mga pamantayan ay dapat na mula 0 (wala ni isa) ... 255 (tapos) .
    * Ang dulo ng talaksan ay dapat may 3 linya na may:
        1. Isang background rgb na kulay para sa data na hindi gaanong mahalaga sa colorbar minimum, e.g.: B 128 128 128 128
Ito ay kadalasang ang startRed, startGreen, at startBlue ng unang segment.
        2. Mas matingkad na kulay ng rugb para sa data value kaysa sa colorbar maximum, e.g.: F 128 0 0 0 0
Kadalasang ito ang endRed, endGreen, at endBlue ng huling bahagi.
        3. Isang kulay na rgb para sa halaga ng datos ng NaN, e.g., N 128 128 128 128
Kadalasang nasa gitnang abuhin ito (128 128 128) .
    * Ang mga halaga sa bawat linya ay dapat na ihiwalay ng mga tab, na walang mga espasyong extranic.
    
Ang isang sampol .cpt file ay Blue WhiteRed.cpt:
    
\\# Ito ay Blue WhiteRed.cpt.
0 0 128 1 0 255
1 0 255 2 0 255 255
2 0 255 255 3 255 255 255 255
3 255 255 255 4 255 255 0
4 255 255 0 5 255 0 0
5 255 0 6 128 0 0
B 0 128
F 128 0 0 0
N 128 128 128
    
Tingnan ang umiiral na mga talaksang .cpt para sa ibang halimbawa. Kung may problema sa talaksang .cpt,ERDDAP™ay malamang na maghagis ng error kapag ang .cpt file ay naka-parsed (na mas mabuti kaysa sa maling paggamit ng impormasyon) .
    
Maaari kang magdagdag ng karagdagang mga paletaERDDAP. Puwede mo itong gawin o hanapin sa web (halimbawa, sa[cpt-city](http://soliton.vm.bytemark.co.uk/pub/cpt-city/)) Kahit na kailangan mong i - edit nang bahagya ang format nito para makaayon itoERDDAP' s mga kahilingan. Upang makuhaERDDAP™upang gamitin ang bagong talaksang .cpt, ilagay ang file sa *tomcat* /webapps/erddap/WEB-INF/ctfiles (kailangan mong gawin iyan para sa bawat bagong bersiyon ngERDDAP) at alin sa dalawa:
    
    * Kung gagamitin mo ang default message.xml file: idagdag ang filename sa file&lt;Mga Pale&gt; tag sa
         *tomcat* /webapps/erddap/WEB-INF/class/gov/noa/pfel/erddap/util/messages.xml.
Kung gagawin mo ito, kailangan mong gawin ito sa tuwing mag - aupgrade kaERDDAP.
    * Kung gumagamit ka ng mga mensahe ng kaugalian.xml file: idagdag ang pangalan sa pangalan&lt;Mga pale&gt; tag sa inyong mga mensaheng pang-ugali. talaksangxml: *tomcat* /content/erddap/messages.xml . Kung gagawin mo ito, minsan mo lamang gagawin ito (ngunit may ibang gawain upang mapanatili ang mga mensaheng pang-ugali.xml file) .
    
Pagkatapos ay magpahingaERDDAP™gayo'yERDDAP™Pansinin ang mga pagbabago. Ang isang bentaha ng pamamaraang ito ay na maaari mong tiyakin ang pagkakasunud - sunod ng mga paleta sa talaan na iniharap sa mga gumagamit. Kung magdaragdag ka ng koleksiyon, hinihimok ka naming idagdag ang isang unlapi sa mga awtor na nauna (e.g., "KT\\_") sa pangalan ng bawat paleta upang makilala ang koleksiyon at upang magkaroon ng maraming paleta na magkakaroon ng iisang pangalan.
    
Pakisuyong huwag alisin o baguhin ang anumang pamantayang paleta. Ang mga ito ay isang pamantayang katangian ng lahatERDDAP™mga instalasyon. Kung inaakala mong ang isang paleta o koleksiyon ng mga paleta ay dapat na isama sa pamantayanERDDAP™pamamahagi dahil ito/ang mga ito ay magiging pangkalahatang gamit, pakisuyong i-upload sila kay Chris. John sa noaa.gov.
    
### Mga blackbar{#colorbars} 
*    **Paano?ERDDAP™na lumilikha ng mga kulay sa isang colorbar?** 
    
    1. Pinipili ng gumagamit ang isa sa patiunang pagpapakahulugan[Mga Paleta](#palettes)o gamitin ang default, e.g., Rainbow. Ang mga Palette ay iniimbak/binibigkas sa GMT-style .cpt Color Palette Table files. Bawat isaERDDAPAng preflusioned paleta ay may simpleng integer range, e.g., 0 hanggang 1 (kung may isa lamang bahagi sa paleta) , o 0 hanggang 4 (kung may apat na bahagi sa paleta) . Ang bawat bahagi sa talaksan ay sumasaklaw sa n hanggang n+1, simula sa n=0.
    2.  ERDDAP™Gumawa ng bagong .cpt file on-the-fly, sa pamamagitan ng pag-scaping sa prefluential na range ng paleta (e.g., 0 hanggang 4) sa hanay ng paleta na kailangan ng gumagamit (e.g., 0.1 hanggang 50) at pagkatapos ay gumagawa ng isang bahagi sa bagong paleta para sa bawat bahagi ng bagong paleta (e.g., isang log scale na ang mga garapata ay 0.1, 0.5, 1, 5, 10, 50 ang magkakaroon ng 5 bahagi) . Ang kulay para sa dulong bahagi ng bawat seksiyon ay nalilikha sa pamamagitan ng paghanap sa kaugnay na bahagi ng paleta sa .cpt file, pagkatapos ay ang halos pag - uugnay ng halaga ng R, G, at B. (Katulad din iyan ng kung paano lumilikha ang GMT ng mga kulay mula sa mga Color Palette Table file nito.) Pinapayagan ng sistemang itoERDDAP™upang simulan sa mga primadong paleta (e.g., Rainbow na may 8 bahagi, sa kabuuang sukat na 0 hanggang 8) at lumilikha ng mga paleta ng kaugalian sa-the-fly (e.g., isang kaugalian Rainbow, na naglalarawan ng 0.1 hanggang 50 mg/L sa mga kulay bahaghari) .
    3.  ERDDAP™Pagkatapos ay gamitin ang bagong talaksang iyan na .cpt upang lumikha ng kulay para sa bawat iba't ibang kulay na pixel sa color bar (at sa dakong huli para sa bawat puntong data kapag gumagawa ng impormasyon sa isang graph o mapa) , muli, sa pamamagitan ng paghanap ng kaugnay na bahagi ng paleta sa .cpt file, pagkatapos ay ang halos pag - uugnay ng halaga ng R, G, at B.
    
Ang prosesong ito ay waring masalimuot. Subalit nilulutas nito ang mga problemang may kaugnayan sa timbangan ng troso na mahirap lutasin sa ibang paraan.
    
Kaya paano mo matutularan ang mga bagay naERDDAP™gayon nga ba? Hindi ito madali. Kailangan mong tularan ang prosesong itoERDDAP™ang ginagamit. Kung ikaw ay isang SaksiJavaprogrammer, magagamit mo rin itoJavaklase naERDDAP™upang gawin ang lahat ng ito:
     *tomcat* /webapps/erddap/WEB-INF/classes/gov/noa/pfel/coastwatch/sgt/CompoundColorMap.java.
    
### Mga Tuntunin sa Pamamahagi ng Date{#guidelines-for-data-distribution-systems} 
Masusumpungan ang mas pangkalahatang mga opinyon tungkol sa disenyo at pagsusuri ng mga sistema ng pamamahagi ng impormasyon[dito](https://coastwatch.pfeg.noaa.gov/erddap/images/erddapTalk/erdData.html).
     
### Archive{#archiveadataset} 
Kabilang sa iyongERDDAP™Ang pagkakabit ay isang kasangkapang command line na tinatawag na ArchiveADataset na makatutulong sa iyo na gumawa ng arkibo (a.zipo.tar.gztalaksan) na may bahagi o lahat ng dataset na nakaimbak sa isang serye ng netcdf-3.ncmga talaksang datos sa isang format ng talaksan na angkop sa pagsumiteNOAA'Ang arkibo ng NCEI (.ncpara sa nakatiklop na mga dataset o[.ncCFMA](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA)para sa tabular datasets, gaya ng tinitiyak ng[NCEINetCDFMga template v2.0](https://www.ncei.noaa.gov/data/oceans/ncei/formats/netcdf/v2.0/index.html)) .

Archive Maaaring gumawa ng dalawang magkaibang arkibong format ang Dataset:

* Ang "orihinal" na format ay sumusunod sa mga ito[Mga Pamantayan ng NCEI](https://www.ncdc.noaa.gov/atrac/guidelines.html), ito gabay para sa[Pag - iimprenta ng Iyong Date sa NCEI](https://sites.google.com/a/noaa.gov/ncei-ioos-archive/cookbook?pli=1), at ang kaugnay nito[Mga Kaugalian Para sa Pagpapaunlad ng Katapatan](https://sites.google.com/a/noaa.gov/ncei-ioos-archive/cookbook/data-integrity).
* Gumagawa ng "Bag Ito" formation[Bag It files](https://en.wikipedia.org/wiki/BagIt), isang pamantayang arkibong format na itinataguyod ng Aklatan ng Kongreso ng E.U., gaya ng binanggit ng[Bag It v0.97 speciation](https://tools.ietf.org/html/draft-kunze-bagit-14).NOAA'Ang NCEI ay maaaring magkonsepto sa mga files ng Bag It para sa mga pagsumite sa arkibo.

Hindi kataka - taka, ang[Pangglobong at iba't ibang metadata](/docs/server-admin/datasets#global-attributes)yaon pangERDDAP™Ang himok/requires ay halos eksaktong pareho ng in-file CF at ACD metadata na hinihimok ng NCEI/requires, kaya ang lahat ng iyong datasets ay dapat handa para sa pagpapasakop sa NCEI via[Sent2NCEI](https://www.nodc.noaa.gov/s2n/)o[ATRAC](https://www.ncdc.noaa.gov/atrac/index.html)  (Ang Progressive tracking and Resource tool ng NCEI para sa mga Active Collection) .

Kung ikaw (angERDDAP™Tagapangasiwa) gumamit ng ArchiveADataset upang magsumite ng datos sa NCEI, pagkatapos ikaw (hindi NCEI) ay magpapasiya kung kailan magsumite ng isang piraso ng impormasyon sa NCEI at kung ano ang magiging detalyeng iyon, sapagkat malalaman mo kung kailan magkakaroon ng bagong impormasyon at kung paano bibigyang - katuturan ang hulang iyon (at ang NCEI ay hindi) . Sa gayon, ang ArchiveADataset ay isang kasangkapan para sa iyo upang magamit upang lumikha ng isang pakete upang isumite sa NCEI.

Archive Halimbawa, ang pagpepetsa ay maaaring maging kapaki - pakinabang sa ibang kalagayanERDDAP™Mga administrador na kailangang magpakumberte ng isang subset ng isang dataset (sa pribadoERDDAP) mula sa katutubong talaksan nito tungo sa isang set ng[.ncMga file ng CF](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA), kung kaya't isang publikoERDDAP™ay maaaring magsilbi sa impormasyon mula sa.ncCF files sa halip ng orihinal na files.

Minsang naitayo mo naERDDAP™at patakbuhin ito (Minsan) , makikita at magagamit mo ang ArchiveADataset sa *tomcat* /webapps/erddap/WEB-INF directory. May iskrip na yari sa kabibi (ArchiveADataset.sh) para sa Linux/Unix at isang talaksan (ArchiveADataset.bat) para sa Windows.

Sa Windows, ang unang pagkakataon na tumakbo ka ng ArchiveADataset, kailangan mong ayusin ang ArchiveADataset. Ang talaksan ng paniki na may editor ng teksto upang baguhin ang landas patungo sa java. Exe file upang makahanap ng WindowsJava.

Kapag nagpapatakbo ka ng ArchiveADataset, magtatanong ito sa iyo. Para sa bawat tanong, mag-uri ng tugon, pagkatapos ay pindutin ang Enter. O pindutin ang ^C upang lumabas sa isang programa anumang oras.

O, maaari mong ilagay ang mga sagot sa mga tanong, ayon sa pagkakasunud - sunod, sa command line. Upang magawa ito, patakbuhin ang programa minsan at uriin at isulat ang iyong mga sagot. Pagkatapos, makagagawa ka ng isang command line (ang mga sagot bilang mga parameter) na nagpapatakbo ng programa at sumasagot sa lahat ng tanong.
Gamitin ang salitang default kung nais mong gamitin ang default na halaga para sa isang ibinigay na parameter.
Gamitin ang "" (dalawang dobleng pagsipi) bilang isang tagahawak ng lugar para sa isang walang laman na strando.
Halimbawa, ang paglalagay ng mga parameter sa command line ay maaaring maging napakakombinyente kung gagamit ka ng ArchiveADataset minsan sa isang buwan upang i - archive ang halaga ng isang buwan na datos. Kapag nagawa mo na ang command line sa pamamagitan ng mga parameter at naitago mo na sa iyong mga nota o sa isang sulat, kailangan mo lamang gumawa ng maliliit na pagbabago bawat buwan upang gawin ang arkibo sa buwang iyon.

Ang mga tanong na itinatanong sa iyo ni ArchiveADataset ay magpapahintulot sa iyo na:

* Iayos ang orihinal o Bagit file package. Para sa NCEI, gamitin ang Bagit.
* Tuusin ang sizing o alkitran.gzcompression para sa pakete. Para sa NCEI, gumamit ng tar.gz.
* I - type ang adres ng contact email para sa arkibong ito (ito ay isusulat sa CRE\\_ME.txt file sa arkibo) .
* Kilalanin ang mgadatasetIDng dataset na gusto mong i - archive.
* I - type kung aling data variable ang gusto mong i - archive (Karaniwan nang lahat) .
* I - type kung aling subset ng dataset ang gusto mong i - archive. Kailangan mong buuin ang subset sa katulad na paraan na makabuo ka ng isang subset para sa isang kahilingan ng datos, kaya ibang - iba ito para sa grided kaysa sa tabular datasets.
    * Para sa magkakaugnay na mga dataset, maaari mong tiyakin ang iba't ibang halaga ng pinakakaliwang dimensiyon, karaniwan nang iyan ay isang haba ng panahon. Ang ArchiveADataset ay gagawa ng hiwalay na kahilingan at lilikha ng hiwalay na data file para sa bawat halaga sa saklaw ng mga halaga. Yamang karaniwan nang malaki ang nakatiklop na mga dataset, halos sa tuwina'y kailangan mong magtakda ng isang maliit na subset na may kaugnayan sa laki ng buong dataset.
Halimbawa,\\[ (2015-12-01) : (2015-12-31) \\]\\[\\]\\[\\]\\[\\]
    * Para sa mga tabular dataset, maaari mong tiyakin ang anumang koleksiyon ng mga bagay na ipinagbabawal, subalit kadalasang ito'y isang haba ng panahon. Yamang ang mga tabular dataset ay karaniwang maliit, kadalasang posibleng magtakda ng mga notent, upang ang buong dataset ay ma - archive.
Halimbawa, &time&gt;=2015-12-01&time&lt;2016-01-01
* Para sa mga tabular datasets: magtakda ng isang comma hiwalay na listahan ng 0 o higit pang mga variables na titiyak kung paanong ang arkibong datos ay karagdagang subseted sa iba't ibang data files. Para sa datos na may
    [cdm\\_data\\_type](/docs/server-admin/datasets#cdm_data_type)\\=Times|Profile ng mga Kumperensiya|Trajectory|TrajectoryProfile
dapat na lagi mong tiyakin ang variable na may cf\\_role=timeseries\\_id (e.g.,stationID) o cf\\_role=trajectory\\_id attribute. Ang ArchiveADataset ay gagawa ng hiwalay na kahilingan at lilikha ng hiwalay na data file para sa bawat kombinasyon ng mga halaga ng mga variable na ito, e.g., para sa bawat isa.stationID.
Sa lahat ng iba pang taskular datasets, malamang na hindi mo na itatakda ang anumang pagbabago sa layuning ito.
Babala: Kung ang subset ng dataset na iyong inarko ay napakalaki (&gt;2GB) at walang angkop na variable para sa layuning ito, pagkatapos ang ArchiveADataset ay hindi magagamit sa pamamagitan ng dataset na ito. Ito'y bihira.
* I-specified ang file format para sa mga data files na gagawin.
Para sa nakatiklop na mga dataset, para sa NCEI, gamitin.nc.
Para sa taskular datasets, para sa NCEI, gamitin[.ncCFMA](https://coastwatch.pfeg.noaa.gov/erddap/tabledap/documentation.html#ncCFMA)kung ito ay opsyon; kung hindi ay gamitin.nc.
* I-specified ang uri ng talaksan na tinutunaw upang malikha para sa bawat data file at para sa buong arkibo pakete: MD5, SHA-1, o SHA-256. Ang pagtunaw ng talaksan ay nagbibigay ng daan para sa kliyente (e.g., NCEI) upang subukin kung ang data file ay naging sira. Karaniwan na, ang mga ito ay mga[.md5 files](https://en.wikipedia.org/wiki/MD5), ngunit ngayon mayroong mas mabuting mga mapagpipilian. Para sa NCEI, gamitin ang SHA-256 .

Pagkatapos mong sagutin ang lahat ng tanong, ganito ang sabi ng ArchiveADataset:

1. Gumawa ng isang serye ng mga kahilingan sa dataset at simulahin ang resultang mga data file *Malaking Direktoryo* /ArchiveADataset/ *datasetID\\_timestamp* /.
Para sa nakatiklop na mga dataset, magkakaroon ng talaksan para sa bawat halaga ng pinakakaliwang dimensiyon (e.g., oras) . Ang pangalan ng talaksan ay ang halagang iyon (e.g., ang halaga ng panahon) .
Para sa taskular datasets, magkakaroon ng file para sa bawat halaga ng ... variable (s) . Ang pangalan ng talaksan ay ang halagang iyon. Kung may higit sa isang variable, ang kaliwang variables ay gagamitin sa paggawa ng subdirectory na mga pangalan, at ang right object ay gagamitin sa paggawa ng mga files.
Ang bawat talaksang datos ay dapat na maging&lt;2GB (ang pinakamatagal na ipinahihintulot.ncbersyon 3 files) .
2. Gumawa ng talaksang may kaugnayan sa bawat talaksang datos na may pagtunaw ng talaksang datos. Halimbawa, kung ang talaksang datos ay 46088.ncat ang uri ng pagtunaw ay .sha256, pagkatapos ang talaksang pagtunaw ay magkakaroon ng pangalan na 46088.nc.sha256 .
3. Gumawa ng isang adaptation\\_ME.txt file na may impormasyon tungkol sa arkibo, pati na ang listahan ng lahat ng setting na tinukoy mo upang lumikha ng arkibong ito.
4. Gumawa ng 3 files sa *Malaking Direktoryo* /ArchiveADataset/ :
    
    * A.zipo.tar.gzpangalan ng talaksang arkibo *datasetID\\_timestamp* .zip  (o.tar.gz) naglalaman ng lahat ng naka - excate na mga data file at mga talaksang pagtunaw. Ang talaksang ito ay maaaring anumang sukat, limitado lamang sa pamamagitan ng disk space.
    * Halimbawa, ang talaksang pagtunaw ng arkibo *datasetID\\_timestamp* .zip.sha256.txt
    * Para sa "orihinal" na uri ng arkibo, isang talaksang teksto na pinangalanang *datasetID\\_timestamp* .zip.listOFiles.txt (o.tar.gz) na nagtatala ng lahat ng files sa.zip  (o.tar.gz) talaksan.
    
Kung inihahanda mo ang arkibo para sa NCEI, ito ang mga file na ipapadala mo sa NCEI, marahil sa pamamagitan ng[Sent2NCEI](https://www.nodc.noaa.gov/s2n/)o[ATRAC](https://www.ncdc.noaa.gov/atrac/index.html)  (Ang Progressive tracking and Resource tool ng NCEI para sa mga Active Collection) .
5. I - delete ang lahat ng naka - excate na mga file para lamang sa arkibo (e.g.,.zip) , ang pagtunaw (e.g., .sha256.txt) ng arkibo, at ng (Hindi sapilitan) ang natitirang mga talaksan ng .listFiles.txt.

#### ISO 19115 .xml Mga Larawan ng Metadata{#iso-19115-xml-metadata-files} 
Hindi kasama sa pakete ng arkibong ArchiveADataset ang ISO 19115 .xml metadata para sa dataset. Kung nais mo/kailangang magsumite ng isang ISO 19115 file para sa inyong dataset sa NCEI, maaari mong ipadala sa kanila ang ISO 19115 .xml metadata file na maaari mong ipadala sa NCEI.ERDDAP™nilikha para sa dataset (ngunitNMFSdapat makuha ng mga tao ang ISO 19115 file para sa kanilang datasets mula sa InPort kungERDDAP™ay hindi na nagsisilbi sa talaksang iyon) .

Mga Problema? Mga mungkahi? Bago ang ArchiveADataset. Kung ikaw ay may mga problema o mga mungkahi, tingnan ang aming[sa pagkuha ng karagdagang suporta](/docs/intro#support).
     
