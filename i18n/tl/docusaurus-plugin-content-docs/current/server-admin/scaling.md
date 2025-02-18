---
title: "Scaling"
sidebar_position: 5
---
# Pag - iiski
## ERDDAP™- Mabibigat na Pasan, Grids, Cluster, Pederasyon, at Pagkukot{#erddap---heavy-loads-grids-clusters-federations-and-cloud-computing} 
 

# ERDDAP:

[ERDDAP™](https://coastwatch.pfeg.noaa.gov/erddap/index.html)ay isang web application at isang web service na nagkokodigo ng mga siyentipikong datos mula sa iba't ibang lokal at malayong pinagmulan at nag-aalok ng simple at hindi pabagu-bago na paraan upang mag-download ng mga subset ng datos sa karaniwang mga format ng file at gumawa ng mga graph at mapa. Tinatalakay sa pahinang web na ito ang mga isyung may kaugnayan sa mabibigat na bagayERDDAP™Ginagamit ang mga pasan at sinusuri ang mga posibilidad para sa pakikitungo sa labis na mabibigat na pasan sa pamamagitan ng mga grid, kumpol, pederasyon, at pagpupuslit ng ulap.

Ang orihinal na bersyon ay isinulat noong Hunyo 2009. Walang malalaking pagbabago. Ito ay huling iniapruba noong 2019-04-15.

## DISKLAIMER{#disclaimer} 

Ang nilalaman ng pahinang web na ito ay Bob Simons personal na mga opinyon at hindi laging sumasalamin sa anumang posisyon ng Pamahalaan o ng PamahalaanNational Oceanic and Atmospheric Administration. Simple lamang ang mga kalkulasyon, subalit sa palagay ko ay tama ang mga konklusyon. Gumamit ba ako ng maling lohika o nagkamali sa aking mga kalkulasyon? Kung gayon, ako lamang ang may kasalanan. Pakisuyong padalhan ako ng email ng pagtutuwiderd dot data at noaa dot gov.
 

- - -

## Mabibigat na Pasan / Pagsugpo{#heavy-loads--constraints} 

Sa pamamagitan ng malakas na paggamit, isang standaleERDDAP™ay mapipilitan (malamang na mula sa) sa pamamagitan:

### Malayong Pinagmulan Bandwidth{#remote-source-bandwidth} 
1. Isang malayong data source's bandwidth — Kahit na may mahusay na koneksyon (e.g., viaOPeNDAP) , maliban na lamang kung ang isang malayong pinagkukunan ng impormasyon ay may napakataas na koneksiyon sa Internet,ERDDAPAng mga tugon ay mahahadlangan ng kung gaano kabilisERDDAP™ay makakakuha ng datos mula sa pinagkunan ng datos. Ang solusyon ay kopyahin ang dataset saERDDAP' hard drive, marahil kasama ng[EDDGridKopya](/docs/server-admin/datasets#eddgridcopy)o[Mapagkakatiwalaang Komponiya](/docs/server-admin/datasets#eddtablecopy).
     
### ERDDAP'Ang Server Bandwidth'{#erddaps-server-bandwidth} 
2. MalibangERDDAPAng 's server ay may napakataas na bandwidth Internet connection,ERDDAPAng mga tugon ay mahahadlangan ng kung gaano kabilisERDDAP™ay makakakuha ng impormasyon mula sa pinagmumulan ng impormasyon at gaano kabilisERDDAP™ay maaaring magsauli ng impormasyon sa mga kliyente. Ang tanging solusyon ay magkaroon ng mas mabilis na koneksiyon sa Internet.
     
### Alaala{#memory} 
3. Kung maraming sabay - sabay na kahilingan,ERDDAP™ay maaaring maubusan ng memorya at pansamantalang tanggihan ang bagong mga kahilingan. (ERDDAP™ay may dalawang mekanismo upang maiwasan ito at upang bawasan ang mga kahihinatnan kung mangyari ito.) Kaya mientras mas marami ang memorya sa server mas mabuti. Sa isang 32-bit server, 4+ GB ay talagang mabuti, 2 GB ay okay, kaunti ay hindi inirerekomenda. Sa isang 64-bit server, halos maiiwasan mo ang problema sa pamamagitan ng pagkuha ng maraming memorya. Tingnan ang[\\-Xmx at -Xms settings](/docs/server-admin/deploy-install)para saERDDAP/Tomcat. IsaERDDAP™Ang pagkuha ng mabigat na paggamit sa isang kompyuter na may 64-bit server na may 8GB ng memorya at -Xmx na itinakda sa 4000M ay bihira, kung mayroon man, na nalilimitahan ng memorya.
     
### May Bandwidth sa Pagmamaneho{#had-drive-bandwidth} 
4. Ang pagkuha ng impormasyong nakaimbak sa hard drive ng server ay lubhang mas mabilis kaysa sa pagkuha ng remote data. Magkagayunman, kung gayon ngaERDDAP™Ang server ay may napakataas na koneksiyon ng bandwidth Internet, posible na ang pag-access ng datos sa hard drive ay magiging bottleneck. Ang bahagyang solusyon ay ang mas mabilis na paggamit (e.g., 10,000 RPM) Magnetic hard drives o SSD drives (kung tama ang halaga-marunong) . Ang isa pang solusyon ay mag - imbak ng iba't ibang datasets sa iba't ibang drives, upang ang pinagsama - samang hard drive bandwidth ay mas mataas.
     
### Napakaraming Binibini{#too-many-files-cached} 
5. Napakaraming files sa loob ng isang[cache](/docs/server-admin/additional-information#cached-responses)directory —ERDDAP™Nilalagyan ng laman ang lahat ng larawan, subalit ang laman lamang nito ay ang impormasyon para sa ilang uri ng mga kahilingan ng datos. Posible para sa cache directory na ang isang dataset ay pansamantalang magkaroon ng malaking bilang ng mga file. Bababagalin nito ang mga kahilingan upang makita kung ang isang salansan ay nasa loob ng cache (Talaga&#33;) .&lt;cache Ilagay sa[setup.xml](/docs/server-admin/deploy-install#setupxml)Hayaan mong itakda mo kung gaano katagal ang isang file sa cache bago ito alisin. Ang pagtatakda ng mas maliit na bilang ay makababawas sa problemang ito.
     
### CPU{#cpu} 
6. Dalawang bagay lamang ang kumukuha ng maraming panahon sa CPU:
    *   NetCDF4 atHDF5 ngayon ang sumusuporta sa internal compression ng mga datos. Pag - aalis ng isang malaking compressNetCDF4 / 8HDF5 data file ay maaaring kumuha ng 10 o higit pang segundo. (Hindi kasalanan iyan. Ito ay katangian ng compression.) Kaya, ang maramihang sabay - sabay na paghiling sa mga dataset na may impormasyong nakaimbak sa mga talaksang siksik ay maaaring maglagay ng matinding kaigtingan sa anumang server. Kung ito ay isang problema, ang solusyon ay mag-imbak ng mga popular na datasets sa mga di-compressed files, o kumuha ng server na may isang CPU na may mas maraming core.
    * Paggawa ng mga graph (kasama ang mga mapa) : Mga 0.2 - 1 segundo sa bawat graph. Kaya kung maraming sabay - sabay na pambihirang mga kahilingan para sa mga graph (WMSAng mga kliyente ay kadalasang gumagawa ng 6 sabay - sabay na mga kahilingan&#33;) , maaaring may limitasyon ang CPU. Kapag maraming gumagamit ang tumatakboWMSMga kliyente, ito ay nagiging problema.
         

- - -

## Maraming IndiyaERDDAPs na may pabigat?{#multiple-identical-erddaps-with-load-balancing} 

Ang tanong ay kadalasang bumabangon: "Upang pakitunguhan ang mabibigat na pasan, maaari ba akong maglagay ng maraming magkatulad na mga pasanERDDAPs na may timbang na karga?" Ito'y isang kawili - wiling tanong sapagkat ito'y agad na nagiging pinaka - buodERDDAP'Magdisenyo. Ang mabilis na sagot ay "hindi". Alam kong iyan ay isang nakasisiphayong sagot, subalit may ilang tuwirang dahilan at ilang mas malalaking pangunahing dahilan kung bakit ako nagdisenyoERDDAP™gumamit ng ibang paraan (isang pederasyon ngERDDAP, na inilarawan sa malaking bahagi ng dokumentong ito) , na sa palagay ko ay mas mabuting solusyon.

Ang ilang tuwirang dahilan kung bakit hindi mo maaaring/hindi dapat magtatag ng multiple identicalERDDAPang mga ito:

* Isang ibinigayERDDAP™basahin ang bawat data file kapag una itong makukuha upang mahanap ang mga hanay ng datos sa file. Pagkatapos ay iniimbak nito ang impormasyon sa isang indise. Pagkatapos, kapag dumating ang isang gumagamit na humihiling ng impormasyon,ERDDAP™ang indiseng iyon upang malaman kung aling mga files ang hahanapin para sa hiniling na datos. Kung maraming magkatuladERDDAP, ginagawa nila ang indiseng ito, na nasayang lamang. Dahil sa sistemang airerated na inilalarawan sa ibaba, ang indise ay minsan lamang ginagawa, ng isa sa mga indiseERDDAPs.
* Para sa ilang uri ng mga kahilingan ng gumagamit (e.g., para sa.nc, .png, mga talaksang .pdf)  ERDDAP™kailangang gawin ang buong file bago ipadala ang tugon. KayaERDDAP™Mga cache sa loob ng maikling panahon. Kung may parehong kahilingan (gaya ng kadalasang ginagawa nito, lalo na para sa mga imahen kung saan ang URL ay nakapaloob sa isang web page) ,ERDDAP™ay maaaring gamiting muli ang talaksang iyan na may cache. Sa isang sistema ng multiple identicalERDDAPHindi pinagsasaluhan ang mga talaksang ito, kaya ang bawat isaERDDAP™ang di - kinakailangan at maaksayang muling pagbuhay sa.nc, .png, o .pdf files. Dahil sa sistemang airerated na inilalarawan sa ibaba, ang mga file ay minsan lamang ginagawa, ng isa sa mga itoERDDAPs, at muling ginamit.
*   ERDDAP'Ang sistema ng suskripsiyon ay hindi itinatag upang ibahagi ng multipleERDDAPs. Halimbawa, kung ang tagabalanse ng kargada ay nagpapadala sa gumagamit nitoERDDAP™at ang gumagamit ay umaayon sa isang dataset, pagkatapos ang isa namanERDDAPay hindi malalaman ang suskrisyong iyon. Pagkaraan, kapag ipinadala ng tagabalanse ng kargada ang gumagamit sa ibang paraanERDDAP™at humingi ng listahan ng kanyang/her subscriptions, ang isa paERDDAP™ay magsasabing walang sinuman (ay umaakay sa kaniya/her upang gumawa ng isang kopyang suskrisyon sa isa pang EEDDAP) . Dahil sa sistema ng mga tagapagpakain na inilalarawan sa ibaba, ang sistema ng suskripsiyon ay basta pinangangasiwaan ng pangunahin, publiko, elementoERDDAP.

Oo, para sa bawat isa sa mga problemang iyon, magagawa ko (nang may malaking pagsisikap) inhinyero ng solusyon (upang ibahagi ang impormasyon sa pagitan ngERDDAPs) , ngunit sa palagay ko'y ang[pederasyon-of-ERDDAPparaan ng paglapit](#grids-clusters-and-federations)  (na inilarawan sa malaking bahagi ng dokumentong ito) ay isang mas mainam na panlahatang solusyon, bahagyang dahil sa ito ay tumatalakay sa iba pang mga problema na ang multiple-identical-ERDDAPAng pamamaraang s-with-a-load-balancer ay hindi man lamang nagsisimulang makipag-ugnayan, partikular na ang desentralisadong kalikasan ng mga pinagkukunan ng datos sa mundo.

Pinakamabuting tanggapin ang simpleng katotohanan na hindi ako nagdisenyoERDDAP™ay gagamitin bilang multiple identicalERDDAPs na may timbang na karga. Sadyang dinisenyo koERDDAP™sa loob ng pederasyonERDDAP, na sa palagay ko'y maraming bentaha. Kapansin - pansin, isang pederasyon ngERDDAPAng s ay lubusang kasuwato ng desentralisado, ipinamamahaging sistema ng mga sentro ng impormasyon na taglay natin sa tunay na daigdig (isipin ang iba't ibang rehiyon ng IOS, o ang iba't ibang rehiyon ng CoastWatch, o ang iba't ibang bahagi ng NCEI, o ang 100 iba pang sentro ng impormasyon saNOAA, o ang iba't ibang NASA DAAC, o ang 1000's ng mga sentro ng impormasyon sa buong daigdig) . Sa halip na sabihin sa lahat ng mga sentro ng datos sa mundo na kailangan nilang iwanan ang kanilang mga pagsisikap at ilagay ang lahat ng kanilang datos sa isang sentralisadong "data lawa". (Kahit na posible, ito ay isang kakila - kilabot na ideya sa maraming kadahilanan - - tingnan ang iba't ibang pagsusuri na nagpapakita ng maraming bentaha ng[Mga sistemang ginawang disente](https://en.wikipedia.org/wiki/Decentralised_system)) ,ERDDAPAng disenyo ay gumagana sa mundo gaya ng dati. Ang bawat data center na gumagawa ng datos ay maaaring patuloy na magpanatili, mag - curte, at magsilbi sa kanilang data (kung ano ang dapat nilang gawin) , gayunman, kasamaERDDAP™, ang datos ay maaari ring madaling makuha mula sa isang sentralisadoERDDAP, nang hindi na kailangan pang ihatid ang impormasyon sa sentralisadoERDDAP™o mag - imbak ng kopya ng impormasyon. Oo, maaaring sabay - sabay na makuha ang isang ibinigay na dataset
mula sa isangERDDAP™sa organisasyon na gumagawa at aktuwal na nag - iimbak ng impormasyon (e.g., GOMOS) ,
mula sa isangERDDAP™sa organisasyon ng magulang (e.g., gitna) ,
mula sa isang All-NOAA ERDDAP™,
mula sa isang pamahalaan ng All-US-federalERDDAP™,
mula sa isang panggloboERDDAP™  (MGA GOO) ,
at mula sa pantangingERDDAPs (e.g., isangERDDAP™sa isang institusyon na nakatalaga sa pananaliksik ng HAB) ,
lahat ay biglaan, at mahusay sapagkat ang metadata lamang ang inililipat sa pagitanERDDAPs, hindi ang impormasyon. Higit sa lahat, pagkatapos ng panimulaERDDAP™sa pinagmulang organisasyon, lahat ng iba paERDDAPmabilis na maitatayo ang mga s (ilang oras na pagtatrabaho) , walang gaanong gamit (isang server na hindi nangangailangan ng anumang RAID para sa pag - iimbak ng impormasyon yamang ito'y hindi nag - iimbak ng impormasyon sa inyong lugar) , at sa gayo'y hindi gaanong magastos. Ihambing iyan sa halaga ng pagtatayo at pagpapanatili ng isang sentro ng sentralisadong impormasyon sa isang lawa ng datos at sa pangangailangan ng isang tunay na malaki, tunay na magastos, na koneksiyon ng Internet, pati na ang problema ng sentralisadong sentro ng data ay isang punto ng kabiguan. Para sa akin,ERDDAPAng desentralisado, pinapakain na pamamaraan ay lubhang nakahihigit.

Sa mga kalagayan kung saan ang isang ibinigay na sentro ng datos ay nangangailangan ng multipleERDDAPs upang matugunan ang mataas na pangangailangan,ERDDAP'Ang disenyo ay ganap na may kakayahang makatugma o mahigit sa pagganap ng multiple-identical--ERDDAPpamamaraang s-with-a-load-balancer. Lagi kang may mapagpipiliang gawin[Maraming - gamitERDDAPs (gaya ng tinalakay sa ibaba) ](#multiple-composite-erddaps), ang bawat isa ay kumukuha ng lahat ng kanilang datos mula sa ibaERDDAP, nang walang panimbang na pasan. Sa kasong ito, iminumungkahi ko na sikapin ninyong ibigay ang bawat isa sa mga elementoERDDAPiba't ibang pangalan / pagkakakilanlan at kung posible ay ang paglalagay ng mga ito sa iba't ibang bahagi ng daigdig (e.g., iba't ibang rehiyon ng AWS) , e.g.,ERD\\_US\\_East,ERD\\_US\\_West,ERD\\_IE,ERD\\_FR,ERD\\_IT, upang ang mga gumagamit nito ay sadyang makagawa, nang paulit - ulit, sa isang espesipikong paraanERDDAP, taglay ang karagdagang pakinabang na naalis mo ang panganib mula sa isang punto ng kabiguan.
 

- - -

## [ **Mga Grid, Cluster, at mga Pederasyon** ](#grids-clusters-and-federations) {#grids-clusters-and-federations} 

Sa ilalim ng napakalakas na gamit, isang solong standaleERDDAP™ay tatakbo sa isa o higit pa ng[Mga pagbabawal](#heavy-loads--constraints)Nakatala sa itaas at maging ang iminungkahing mga solusyon ay hindi sapat. Para sa gayong mga kalagayan,ERDDAP™ay may mga katangian na nagpapangyaring madaling makagawa ng mga grid na madaling patagin (Tinatawag ding kumpol o pederasyon) ngERDDAPna nagpapahintulot sa sistema na pangasiwaan ang labis na paggamit (e.g., para sa isang malaking sentro ng datos) .

Ginagamit ko[Pagkawag](https://en.wikipedia.org/wiki/Grid_computing)bilang pangkalahatang termino upang ipahiwatig ang isang uri ng[kumpol ng computer](https://en.wikipedia.org/wiki/Computer_cluster)Kung saan ang lahat ng bahagi ay maaaring pisikal o hindi pisikal na matatagpuan sa isang pasilidad at maaaring o maaaring hindi sentral na inilalapat. Isang bentaha ng co-located, sentral na pag-aari at pinangangasiwaang mga grids (mga kumpol) ay nakikinabang sa mga ekonomiya ng sukatan (lalo na ang trabaho ng tao) at gawing simple ang pagtutulungan ng mga bahagi ng sistema. Isang kalamangan ng mga hindi-co-located grid, hindi-gitnang pag-aari at pinangangasiwaan (Mga pederasyon) ay na kanilang ipinamamahagi ang gawain ng tao at ang halaga, at maaaring maglaan ng karagdagang pagpaparaya sa pagkakamali. Ang solusyon na iminungkahi ko sa ibaba ay gumaganang mainam para sa lahat ng mga topograpiyang grid, cluster, at pederasyon.

Ang saligang ideya ng pagdidisenyo ng isang sistemang maaaring daanan ay upang makilala ang potensiyal na mga bottleneck at saka idisenyo ang sistema upang ang mga bahagi ng sistema ay matularan kung kinakailangan upang maibsan ang mga bottleneck. Sa pinakamabuting paraan, ang bawat bahaging kinopya ay nakadaragdag sa kapasidad ng bahaging iyon ng sistema nang halos walang tulong (Bihasang pag - akyat) . Ang sistema ay hindi nasusukat maliban na lamang kung mayroong nakakalupkop na solusyon sa bawat bottleneck.[Madaling Ilabas](https://en.wikipedia.org/wiki/Scalability)ay naiiba sa kahusayan (kung gaano kabilis magagawa ang isang gawain — ang kahusayan ng mga piyesa) . Ang pagiging matatag ay nagpapangyari sa sistema na lumaki upang pangasiwaan ang anumang antas ng pangangailangan. **Kakayahan**   (ng pagtuka at ng mga bahagi nito) Alamin kung gaano karaming server, atbp., ang kakailanganin upang matugunan ang isang ibinigay na antas ng pangangailangan. Napakahalaga ng kahusayan, subalit laging may hangganan. Ang pagiging maayos ang tanging praktikal na solusyon sa pagtatayo ng isang sistema na makagagawa nito **ang mismong** Labis na paggamit. Sa pinakamabuting paraan, ang sistema ay magiging maayos at mahusay.

### Mga Tunguhin{#goals} 
Ang mga tunguhin ng disenyong ito ay:

* Upang makagawa ng isang maayos na arkitektura (isang bagay na madaling sabihin sa pamamagitan ng paggaya sa anumang bahagi na nagiging labis - labis na pabigat) . Upang makagawa ng mahusay na sistema na nagpapataas sa makukuha at sa pamamagitan ng pag - aalis ng mga impormasyon na ibinigay sa makukuhang mga yaman ng computer. (Ang halaga ay halos laging isang isyu.) 
* Ang pagbalanse sa mga kakayahan ng mga bahagi ng sistema upang ang isang bahagi ng sistema ay hindi manaig sa ibang bahagi.
* Upang makagawa ng isang simpleng arkitektura upang ang sistema ay madaling buuin at pangasiwaan.
* Upang makagawa ng isang arkitektura na mahusay sa lahat ng mga grid topography.
* Upang gumawa ng isang sistema na nabibigo nang maganda at sa isang limitadong paraan kung ang anumang bahagi ay nagiging over-based. (Ang panahong kinakailangan upang kopyahin ang isang malaking datasets ay palaging maglalagay sa kakayahan ng sistema na harapin ang biglaang pagtaas ng pangangailangan para sa isang espesipikong dataset.) 
*    (Kung maaari) Upang gumawa ng isang arkitektura na hindi nakatali sa anumang espisipiko[pagpupuslit ng ulap](#cloud-computing)paglilingkod o iba pang paglilingkod sa labas (sapagkat hindi nito kailangan ang mga ito) .

### Mga Mungkahi{#recommendations} 
Ang aming mga rekomendasyon ay
![Larawang grid/cluster](/img/cluster.png)

* Unang - una, iminumungkahi ko ang pagtatayo ng isang CompositeERDDAP™  ( **D** sa larawan) , na isang regularERDDAP™maliban na lamang na ito ay mag-serbisyo lamang ng datos mula sa ibaERDDAPs. Ang arkitektura ng grid ay dinisenyo upang baguhin ang trabaho hangga't maaari (Paggamit ng CPU, paggamit ng memorya, paggamit ng bandwidth) mula sa CompositeERDDAP™sa isa paERDDAPs.
*   ERDDAP™may dalawang pantanging uri ng datos,[EDDGridMula sa Erddap](/docs/server-admin/datasets#eddfromerddap)at[Mapagkakatiwalaang Mula sarddap](/docs/server-admin/datasets#eddfromerddap), na tumutukoy sa
sa iba pang mgasetsERDDAPs.
* Kapag ang elemento ay binubuoERDDAP™ay tumatanggap ng kahilingan para sa impormasyon o mga larawan mula sa mga dataset na ito, ang elementoERDDAP™ [Mga Direksiyon](https://en.wikipedia.org/wiki/URL_redirection)ang kahilingan ng datos sa isa paERDDAP™server. Ang resulta ay:
    * Napakahusay nito (CPU, memorya, at bandwidth) , sapagkat kung hindi gayon
        1. Ang kabuuang elementoERDDAP™kailangang ipadala ang kahilingan ng datos sa isa paERDDAP.
        2. Ang isa paERDDAP™kailangang kunin ang impormasyon, baguhin ito, at ihatid ang impormasyon sa elementoERDDAP.
        3. Ang kabuuang elementoERDDAP™kailangang tumanggap ng datos (paggamit ng ekstrang bandwidth) , repormahan ito (paggamit ng ekstrang panahon at memorya ng CPU) , at ihatid ang impormasyon sa gumagamit (paggamit ng ekstrang bandwidth) . Sa pamamagitan ng pagreredirect ng kahilingan ng datos at pagpapahintulot sa isa paERDDAP™upang tuwirang ipadala ang tugon sa gumagamit, ang elementoERDDAP™ay gumugugol ng halos walang CPU panahon, memorya, o bandwidth sa mga kahilingan ng datos.
    * Ang paglilihis ay nakikita ng gumagamit anuman ang klienteng software (browser o iba pang software o command line tool) .

### Giniling mga Bahagi{#grid-parts} 
[Ang mga bahagi ng grid ay:](#grid-parts)

 **A** : Sa bawat remote data source na may high-bandwidthOPeNDAPserver, maaari kang direktang makipag-ugnayan sa remote server. Kung ang remote server ay isangERDDAP™, gamitinEDDGridMula sa Erddap o Mapagkakatiwalaan Mula saERDDAPupang ihain ang impormasyon sa CompositeERDDAP. Kung ang remote server ay ibang uri ngDAPserver, e.g., THEDDS,Hyrax, o GADS, gamitinEDDGridMula saDap.

 **B** : Sa bawat isaERDDAP- magagamit na pinagmulan ng datos (isang pinagmulan ng datosERDDAPmababasa ang datos) Na may isang mataas na bandwidth server, ay nagtatag ng ibaERDDAP™sa grid na siyang dahilan ng pagbibigay ng impormasyon mula sa pinagmumulang ito ng impormasyon.

* Kung gayon ang ilanERDDAPHindi nakakakuha ng maraming kahilingan para sa impormasyon, maaari mo itong gawing isaERDDAP.
* Kung gayonERDDAP™Nakaalay sa pagkuha ng datos mula sa isang malayong pinagmulan ang pagkuha ng napakaraming kahilingan, may tukso na magdagdag paERDDAPs upang ma-serialize ang remote data source. Sa pantanging mga kaso ito ay maaaring makatuwiran, subalit malamang na madaig nito ang malayong pinagmumulan ng impormasyon (alin ang self-defluating) at humahadlang din sa ibang gumagamit na ma-secure ang remote data source (na hindi maganda) . Sa gayong kalagayan, isaalang - alang ang pagtatatag ng isa paERDDAP™upang isilbi ang isang dataset at kopyahin ang dataset tungkol diyanERDDAP' hard drive (tingnan **C** ) , marahil kasama ng[EDDGridKopya](/docs/server-admin/datasets#eddgridcopy)at/o[Mapagkakatiwalaang Komponiya](/docs/server-admin/datasets#eddtablecopy).
*    **B** Ang mga server ay dapat na madaling puntahan sa publiko.

 **C** : Sa bawat isaERDDAP- magagamit na pinagkukunan ng datos na may low-bandwidth server (o kaya ay mabagal na paglilingkod sa iba pang kadahilanan) , isaalang - alang ang pagtatayo ng isa paERDDAP™at pag - iimbak ng isang kopya ng dataset tungkol diyanERDDAP' hard drives, marahil kasama ng[EDDGridKopya](/docs/server-admin/datasets#eddgridcopy)at/o[Mapagkakatiwalaang Komponiya](/docs/server-admin/datasets#eddtablecopy). Kung gayon ang ilanERDDAPHindi nakakakuha ng maraming kahilingan para sa impormasyon, maaari mo itong gawing isaERDDAP.
 **C** Ang mga server ay dapat na madaling puntahan sa publiko.

#### KompositoERDDAP {#composite-erddap} 
 **D** : Ang kabuuang elementoERDDAP™regularERDDAP™maliban na lamang na ito ay mag-serbisyo lamang ng datos mula sa ibaERDDAPs.

* Sapagkat ang kabuuang elementoERDDAP™ay may impormasyon sa memorya tungkol sa lahat ng datasets, ito ay maaaring mabilis na tumugon sa mga kahilingan para sa listahan ng mga datos (Buong mga pagsasaliksik sa teksto, pagsasaliksik sa kategorya, talaan ng lahat ng mga dataset) , at mga kahilingan para sa isang indibiduwal na dataset's Date Access Form, Make A Graph form, oWMSLarawan sa loob ng pahina. Ang mga ito ay pawang maliliit, dinamikong nilikha, mga pahinang HTML na batay sa impormasyon na nasa memorya. Kaya napakabilis ng mga pagtugon.
* Sapagkat ang mga kahilingan para sa aktuwal na datos ay mabilis na inibabaling sa isa paERDDAP, ang elementoERDDAP™ay maaaring mabilis na tumugon sa mga kahilingan para sa aktuwal na datos nang hindi gumagamit ng anumang CPU panahon, memorya, o bandwidth.
* Sa pamamagitan ng paglipat ng pinakamaraming trabaho hangga't maaari (CPU, alaala, bandwidth) mula sa CompositeERDDAP™sa isa paERDDAP, ang elementoERDDAP™ay maaaring lumitaw upang i-serialize ang datos mula sa lahat ng datasets at gayunpaman ay patuloy pa rin sa napakalaking bilang ng mga kahilingan ng datos mula sa isang malaking bilang ng mga gumagamit.
* Ipinakikita ng panimulang mga pagsubok na ang elementoERDDAP™ay maaaring tumugon sa karamihan ng mga kahilingan sa ~1m ng panahon ng CPU, o 1000 kahilingan/pangalawa. Kaya ang isang 8 core processor ay dapat makakatugon sa mga 8000 request/pangalawa. Bagaman posible na gunigunihin ang mga silakbo ng mas mataas na gawain na magiging sanhi ng mga mabagal na pagkilos, iyan ay malaking bahagi ng paghinto. Malamang na ang data center bandwidth ang magiging bottleneck matagal pa bago ang elementoERDDAP™ay nagiging bottleneck.
##### Up-to-date max (panahon) ?{#up-to-date-maxtime} 
AngEDDGrid/ Maaring Mula sa Erddap sa kabuuanERDDAP™lamang baguhin ang nakaimbak na impormasyon nito tungkol sa bawat source dataset kapag ang source dataset ay["nakakarga"ed](/docs/server-admin/datasets#reloadeverynminutes)at ang ilang piraso ng pagbabago ng metadata (e.g., iba't ibang orasactual\\_range) , sa gayo'y lumilikha ng isang patalastas sa suskripsiyon. Kung ang source dataset ay may datos na madalas magbago (halimbawa, bagong datos sa bawat segundo) at gamitin ang["Supdate"](/docs/server-admin/datasets#updateeverynmillis)sistema upang mapansin ang madalas na mga pagbabago sa saligang impormasyon, angEDDGridAng /Table FromErddap ay hindi mapabatiran tungkol sa mga madalas na pagbabagong ito hanggang sa susunod na dataset na "reload", kaya't ang susunod na dataset "reload"EDDGridAng /Table FromErddap ay hindi ganap na up-to-date. Maaari mong bawasan ang problemang ito sa pamamagitan ng pagbabago ng source dataset's&lt;Ikarga muli ang EveryNMinutes pgt; sa mas maliit na halaga (60? 15?) upang magkaroon ng higit pang mga nota sa suskripsiyon upang sabihin saEDDGrid/Table FromErddap upang i-update ang impormasyon nito tungkol sa source dataset.

O, kung nalalaman ng iyong sistema ng pangangasiwa ng data kung kailan ang source dataset ay may bagong datos (e.g., sa pamamagitan ng isang iskrip na kumokopya sa isang talaksan ng datos na ilalagay) , at kung hindi naman masyadong madalas (e.g., tuwing 5 minuto, o mas madalang) , mayroong mas mabuting solusyon:

1. Huwag gamitin&lt;update EveryNMillis&gt; upang panatilihin ang source dataset up-to-date.
2. Itakda ang source dataset's&lt;Ikarga muli ang EveryNMinutes pgt; sa mas malaking bilang (1440?) .
3. Ipa - contact ang source dataset's[URL ng watawat](/docs/server-admin/additional-information#set-dataset-flag)Pagkatapos nito ay kinokopya ang isang bagong data file upang ilagay.
Iyan ay hahantong sa source dataset na ganap na up-to-date at ito ay magiging sanhi upang lumikha ng isang conscription notification, na ipadadala saEDDGrid/Table FromErddap dataset. Pangungunahan niyan angEDDGrid/Table FromErddap dataset upang maging ganap up-to-date (mabuti, sa loob ng 5 segundo ng bagong impormasyon na idinaragdag) . At lahat ng magagawa nang mahusay (walang kinakailangang dataset reload) .

#### Maraming GamitERDDAPs{#multiple-composite-erddaps} 
* Sa sukdulang mga kaso, o dahil sa maling pagpaparaya, baka nais mong magtatag ng mahigit sa isang elementoERDDAP. Malamang na ang ibang bahagi ng sistema (Lalo na, ang bandwidth ng data center) ay magiging problema matagal pa bago ang elementoERDDAP™ay nagiging barado. Kaya ang solusyon ay malamang na magtatag ng karagdagan, sarisari sa heograpiya, na mga sentro ng impormasyon (mga salamin) , bawat isa na may isang elementoERDDAP™at ng mga serverERDDAPmga s at (Sa paano man) isalamin ang mga kopya ng datasets na mataas ang pangangailangan. Ang gayong setup ay nagbibigay rin ng pagpaparaya sa pagkakamali at backup ng datos (sa pamamagitan ng pagkopya) . Sa kasong ito, pinakamabuti kung ang elementoERDDAPAng mga s ay may iba't ibang URL.
    
Kung talagang nais mo ang lahat ng elementoERDDAPAng mga s upang magkaroon ng parehong URL, ay gumagamit ng front end system na nag-aatas sa isang ibinigay na user sa isa lamang ng elementoERDDAPs (batay sa direksiyon ng IP) , upang ang lahat ng kahilingan ng gumagamit ay mapunta sa isa lamang sa elementoERDDAPs. May dalawang dahilan:
    
    * Kapag ang isang ilalim na dataset ay muling ikarga at ang metadata ay nagbabago (e.g., isang bagong data file sa isang grided dataset ang nagpapangyari sa time variable'sactual\\_rangepagbabago) , ang elementoERDDAPAng mga s ay pansamantalang mawawala sa synch, ngunit kasama ng[Sa wakas ay hindi ito nagbabago](https://en.wikipedia.org/wiki/Eventual_consistency). Karaniwan, ang mga ito ay mag-re-synch sa loob ng 5 segundo, ngunit kung minsan ay magiging mas mahaba. Kung ang gumagamit ay gumawa ng isang sistemang awtomatiko na umaasa sa sistema[ERDDAP™mga suskripsiyon](https://coastwatch.pfeg.noaa.gov/erddap/subscriptions/index.html)na pumupukaw ng mga pagkilos, ang panandaliang mga problema sa pagsasama ay magiging mahalaga.
    * Ang 2+ elementoERDDAPang bawat isa sa kanila ay nag - iingat ng kanilang sariling set ng mga suskripsiyon (dahil sa problema ng synch na inilarawan sa itaas) .
    
Kaya ang isang ibinigay na gumagamit ay dapat na ituon sa isa lamang sa elementoERDDAPs upang maiwasan ang mga problemang ito. Kung isa sa mga elementoERDDAPbumaba, ang sistema ng front end ay makapagtutuwid niyanERDDAP' yung mga gumagamit sa ibaERDDAP™iyan ay malapit na. Gayunman, kung ito ay isang problema sa kakayahan na siyang sanhi ng unang elementoERDDAP™bigo (labis na masigasig gumamit? a[pagkakaila-of-service atake](https://en.wikipedia.org/wiki/Denial-of-service_attack)?) , malamang na ginagawa nitong iba't ibang elemento ang mga gumagamit nitoERDDAPmga s ang magiging sanhi ng[Malaking kabiguan](https://en.wikipedia.org/wiki/Cascading_failure). Kaya, ang pinakamalakas na setup ay ang magkaroon ng elementoERDDAPs na may iba't ibang URL.
    
O, marahil mas mabuti, magtayo ng maraming elementoERDDAPKahit walang panimbang. Sa kasong ito, dapat mong sikaping ibigay ang bawat isaERDDAPiba't ibang pangalan / pagkakakilanlan at kung posible ay ang paglalagay ng mga ito sa iba't ibang bahagi ng daigdig (e.g., iba't ibang rehiyon ng AWS) , e.g.,ERD\\_US\\_East,ERD\\_US\\_West,ERD\\_IE,ERD\\_FR,ERD\\_IT, para sa mga gumagamit nito, paulit - ulit silang gumawa na may espesipikoERDDAP.
    
*   \\[Para sa isang kahali - halinang disenyo ng isang mataas na sistema ng pagtatanghal na tumatakbo sa isang server, tingnan ito[detalyadong paglalarawan sa Mailinador](https://mailinator.blogspot.com/2007/01/architecture-of-mailinator.html).\\]

### Napakalaking Pangangailangan ng mga Data{#datasets-in-very-high-demand} 
Sa totoong pambihirang kaso ang isa sa mga ito **A** , **B** , o **C**  ERDDAPHindi matugunan ng mga s ang mga kahilingan dahil sa mga limitasyon ng bandwidth o hard drive, makatuwiran na kopyahin ang data (muli) patungo sa isa pang server+hard Magmaneho+ERDDAP, marahil kasama ng[EDDGridKopya](/docs/server-admin/datasets#eddgridcopy)at/o[Mapagkakatiwalaang Komponiya](/docs/server-admin/datasets#eddtablecopy). Bagaman waring tamang - tama na magkaroon ng orihinal na dataset at ang kinopyang dataset ay lumilitaw na parang isang dataset sa elementoERDDAP™, mahirap ito dahil ang dalawang datasets ay nasa bahagyang magkaibang estado sa magkaibang panahon (Lalo na, pagkatapos makuha ng orihinal ang bagong impormasyon, subalit bago makuha ng kinopyang dataset ang kopya nito) . Kaya nga, iminumungkahi ko na ang mga dataset ay bigyan ng bahagyang naiibang mga titulo (e.g., "... (kopya #1) " at "... (kopya #2) ", o marahil " (salamin # *n* ) " o " (" server # *n* ) ") at lumilitaw bilang magkahiwalay na datos sa elementoERDDAP. Ang mga user ay ginagamit upang makita ang mga talaan ng mga[mga lugar ng salamin](https://en.wikipedia.org/wiki/Website#mirror_site)sa popular na mga site ng pag - download ng file, kaya hindi ito dapat ipagtaka o biguin. Dahil sa mga limitasyon ng bandwidth sa isang ibinigay na lugar, maaaring makatuwiran na ang salamin ay nasa ibang lugar. Kung ang kopya ng salamin ay nasa ibang data center, gumamit lamang ng elemento ng data center na iyonERDDAP™, ang iba't ibang pamagat (e.g., "miror #1) ay hindi kailangan.

### Mga RAID Laban sa Regular na Matigas na mga Pagmamaneho{#raids-versus-regular-hard-drives} 
Kung ang isang malaking dataset o isang grupo ng mga dataset ay hindi gaanong ginagamit, maaaring maging makatuwiran na imbakin ang datos sa isang RAID dahil ito ay nagbibigay ng fault tolerance at dahil hindi mo kailangan ang lakas ng pagpoproseso o bandwidth ng isa pang server. Ngunit kung ang isang dataset ay labis na ginagamit, maaaring mas makatuwiran na kopyahin ang impormasyon sa isa pang server +ERDDAP™+ hard drive (katulad ng[kung ano ang ginagawa ng Google](https://storagemojo.com/2007/02/19/googles-disk-failure-experience/)) Sa halip na gumamit ng isang server at isang RAID upang mag - imbak ng maraming dataset mula nang makuha mo ang dalawang server+hard Drive+ERDDAPMga s sa grid hanggang sa ang isa sa mga ito ay mabigo.

### Mga Kabiguan{#failures} 
Ano ang nangyayari kung...

* May biglang mga kahilingan para sa isang dataset (e.g., lahat ng estudyante sa isang klase ay sabay - sabay na humihiling ng gayunding impormasyon) ?
Ang tangingERDDAP™Ang pagbibigay ng dataset na iyon ay malilipos at magpapabagal o tatanggi sa mga kahilingan. Ang kabuuang elementoERDDAP™at iba paERDDAPhindi maaapektuhan ang mga s. Yamang ang limitasyong salik para sa isang ibinigay na dataset sa loob ng sistema ay ang hard drive na may datos (hindiERDDAP) , ang tanging lunas (hindi kaagad) ay upang gumawa ng isang kopya ng dataset sa ibang server+hard Drive+ERDDAP.
* Isa **A** , **B** , o **C**  ERDDAP™bigo (e.g., bigo sa pagmamaneho) ?
Tanging ang dataset (s) Dahil diyanERDDAP™ang apektado. Kung ang dataset (s) ay ipinababanaag sa isa pang server+hard Drive+ERDDAP, ang epekto ay kaunti. Kung ang problema ay ang hard drive failure sa antas 5 o 6 RAID, pinalitan mo lamang ang drive at ipa-record muli ng RAID ang data sa drive.
* Ang kabuuang elementoERDDAP™bigo?
Kung nais mong gumawa ng isang sistema na may mismong sistema[madaling makuha](https://en.wikipedia.org/wiki/High_availability), maaari kang magtayo[Maraming - gamitERDDAPs (gaya ng tinalakay sa itaas) ](#multiple-composite-erddaps), paggamit ng tulad ng[GAINX](https://www.nginx.com/)o[Traefik](https://traefik.io/)upang pangasiwaan ang pagkakatimbang ng pasan. Pansinin na isang ibinigay na elementoERDDAP™ay maaaring humawak ng napakaraming kahilingan mula sa maraming gumagamit sapagkat
Maliliit ang mga kahilingan para sa metadata at pinangangasiwaan ng impormasyong nasa memorya, at ng
mga kahilingan para sa datos (maaaring malaki) ay dinadala sa bataERDDAPs.

### Simple, Madaling Ilabas{#simple-scalable} 
Ang sistemang ito ay madaling buuin at ilapat, at madaling mag-iinvertensible kapag ang anumang bahagi nito ay nagiging over-bailed. Ang tanging tunay na limitasyon para sa isang ibinigay na sentro ng datos ay ang bandwidth ng data center at ang halaga ng sistema.

### Bandwidth{#bandwidth} 
Pansinin ang tinatayang bandwidth ng karaniwang ginagamit na mga bahagi ng sistema:

|Nakikipagtulungan|Aproximate Bandwidth (GByte/s)  |
|--|--|
|DDR memory|2.5|
|Ang SSD drive|1|
|MAHIRAP na pagmamaneho|0.3|
|Ethernet ng Gigabit|0.1|
|OC-12|0.06|
|OC-3|0.015|
|T1|0.0002|

  
Kaya, isang SATA mahirap na biyahe (0.3GB/s) sa isang server kasama ng isaERDDAP™marahil ay makakain ang isang Gigabit Ethernet LAN (0.1GB/s) . At isang Gigabit Ethernet LAN (0.1GB/s) ay malamang na magbabad sa isang koneksyon sa OC-12 Internet (0.06GB/s) . At hindi bababa sa isang pinagkukunan ng impormasyon ang nagtatala ng mga linya ng OC-12 na nagkakahalaga ng mga $100,000 bawat buwan. (Oo, ang mga kalkulasyong ito ay salig sa pagtulak sa sistema sa mga hangganan nito, na hindi mabuti sapagkat ito'y umaakay sa lubhang makupad na mga pagtugon. Subalit ang mga kalkulasyong ito ay kapaki - pakinabang sa pagpaplano at sa pagbalanse sa mga bahagi ng sistema.)   **Maliwanag, ang angkop na mabilis na koneksiyon ng Internet sa iyong data center ang pinakamahal na bahagi ng sistema.** Madali at mura ang magagawa mo na isang grid na may isang dosenang server na tumatakbo ng isang dosenaERDDAPMadaling makapagbomba ng maraming impormasyon, subalit ang napakabilis na koneksiyon sa Internet ay magiging napakamahal. Ang bahagyang lunas ay:

* Himukin ang mga kliyente na humiling ng mga subset ng impormasyon kung iyan lamang ang kailangan. Kung ang kliyente ay nangangailangan lamang ng impormasyon para sa isang maliit na rehiyon o sa mas mababang resolusyon, iyan ang dapat nilang hilingin. Ang Subsetting ay isang sentral na pokus ng mga protocolERDDAP™para sa paghiling ng impormasyon.
* Himukin ang paghahatid ng siksik na mga impormasyon.ERDDAP™ [mga compresses](https://coastwatch.pfeg.noaa.gov/erddap/information.html#compression)isang transaksyon ng datos kung matatagpuan nito ang "tanggapin-encoding" sa loob ngHTTP GETtanong ng header. Ang lahat ng mga web browser ay gumagamit ng "tanggapin-encoding" at awtomatikong nagpapawalang-bisa sa tugon. Iba Pang kliyente (e.g., mga programa sa computer) kailangang gamitin ito nang tuwiran.
* Itapon ang iyong mga server sa isang ISP o sa ibang lugar na hindi gaanong magastos ang halaga ng bandwidth.
* Itapon ang mga server kasama ngERDDAPsa iba't ibang institusyon upang ang halaga ay mapalaganap. Pagkatapos ay maaari mong iugnay ang iyong elementoERDDAP™sa kanilangERDDAPs.

Pansinin na[Pagbuo ng Ulap](#cloud-computing)at ang mga web hosting service ay nag - aalok ng lahat ng Internet bandwidth na kailangan mo, subalit huwag lutasin ang problema sa presyo.

Para sa pangkalahatang impormasyon sa pagdidisenyo ng mga sistemang scalable, mataas na kapasidad, fault-tolerant, tingnan ang aklat ni Michael T. Nygard[Paglaya Nito](https://www.amazon.com/Release-Production-Ready-Software-Pragmatic-Programmers/dp/0978739213).

### Tulad ng mga Lego{#like-legos} 
Kadalasang sinisikap ng mga nagdisenyo ng software na gamitin nang mahusay[disenyo ng software](https://en.wikipedia.org/wiki/Software_design_pattern)upang lutasin ang mga problema. Ang mga mahusay na padron ay mabuti dahil ang mga ito ay nagkokokodigong mabuti, madaling likhain at pagtrabahuin na may, pangkalahatang-layuning solusyon na humahantong sa mga sistemang may mabubuting katangian. Hindi ginawang pamantayan ang mga pangalan, kaya tatawagin ko ang parisan naERDDAP™ang ginagamit ng Lego Radience. Bawat Lego (bawat isaERDDAP) ay payak, maliit, pamantayan, stand-alone, ladrilyo (server ng datos) na may tiyak na interface na nagpapahintulot dito na maiugnay sa iba pang mga legos (ERDDAPs) . Ang mga bahagi ngERDDAP™na bumubuo sa sistemang ito ay: ang mga sistema ng suskripsiyon at flagURL (na nagpapahintulot ng pakikipagtalastasan sa pagitan ngERDDAPs) , ang EDD... Sistemang pang-redirect ng FromErddap, at ang sistema ngRESTfulmga kahilingan para sa impormasyon na maaaring gawin ng mga gumagamit o ng ibaERDDAPs. Kaya, bigyan ng dalawa o higit pang mga paa (ERDDAPs) , makagagawa ka ng napakaraming iba't ibang hugis (mga pangunahing teolohiya ng networkERDDAPs) . Tiyak, ang disenyo at mga katangian ngERDDAP™ay maaring iba ang ginawa, hindi Lego-tulad, marahil upang makagawa lamang at maging optimista para sa isang espesipikong topolohiya. Subalit nadarama namin iyonERDDAP'Ang disenyong Lego-tulad ng ay nag-aalok ng isang mabuti at pangkalahatang-layunin na solusyon na nakapagdurulot ng kahit anongERDDAP™Tagapangasiwa (o grupo ng mga administrador) upang lumikha ng lahat ng uri ng iba't ibang topolohiyang pederasyon. Halimbawa, maaaring magtatag ng tatlong organisasyon (o higit pa)  ERDDAPgaya ng ipinakikita sa[ERDDAP™Grid/Cluster Diagram sa itaas](#recommendations). O isang grupong ipinamamahagi (MGA IOO? Bantayog sa Baybayin? NCEI? NWS?NOAA? MGA USG? BATIL? NEON? LTER? OOI? BODC? ONC? JRC? WMO?) makapagtatayo ng isaERDDAP™sa bawat maliit na himpilan (Kaya ang impormasyon ay maaaring manatiling malapit sa pinagmumulan) at pagkatapos ay bumuo ng isang elementoERDDAP™sa gitnang tanggapan na may virtual datasets (na laging ganap na up-to-date) mula sa bawat maliit na himpilanERDDAPs. Oo, lahat ng ito ayERDDAP, inilagay sa iba't ibang institusyon sa buong daigdig, na kumukuha ng impormasyon mula sa ibaERDDAPs at/o magbigay ng datos sa ibaERDDAPs, bumuo ng isang dambuhalang network ngERDDAPs. Napakalamig nito&#33; Kaya, gaya ng kay Lego, ang mga posibilidad ay walang katapusan. Kaya ito ay isang mabuting parisan. Kaya magandang disenyo ito para saERDDAP.

### Iba't Ibang Uri ng Kahilingan{#different-types-of-requests} 
Isa sa mga real-life na komplikasyon ng pagtalakay na ito ng mga data server topologies ay ang pagkakaroon ng iba't ibang uri ng mga hiling at iba't ibang paraan upang maging perpekto para sa iba't ibang uri ng mga hiling. Ito ay halos hiwalay na isyu (Gaano kabilis maaaring gawin itoERDDAP™na ang datos ay tumutugon sa kahilingan ng impormasyon?) mula sa pagtalakay ng topolohiya (na tumatalakay sa kaugnayan ng mga server ng datos at kung aling server ang may aktuwal na datos) .ERDDAP™, mangyari pa, sikaping pakitunguhan nang mahusay ang lahat ng uri ng kahilingan, subalit mas mabuti ang pakikitungo kaysa iba.

* Simple lamang ang maraming kahilingan.
Halimbawa: Ano ang metadata para sa dataset na ito? O: Ano ang mga halaga ng sukat ng panahon para sa magkakaugnay na dataset na ito?ERDDAP™ay dinisenyo upang mabilis na pangasiwaan ang mga ito (karaniwan na sa&lt;=2 ms) sa pamamagitan ng pagmememorya sa impormasyong ito.
     
* Ang ilang kahilingan ay medyo mahirap.
Halimbawa: Ibigay sa akin ang subset na ito ng isang dataset (na nasa isang data file) . Ang mga kahilingang ito ay maaaring gawin agad sapagkat ang mga ito ay hindi naman ganoon kahirap.
     
* Ang ilang kahilingan ay mahirap at sa gayo'y umuubos ng panahon.
Halimbawa: Ibigay sa akin ang subset na ito ng isang dataset (na maaaring nasa alinman sa 10,000+ data files, o maaaring mula sa siksik na data files na ang bawat isa ay kumukuha ng 10 segundo hanggang sa decompress) .ERDDAP™Ipinakilala ng v2.0 ang ilang bago at mas mabilis na mga paraan upang matugunan ang mga kahilingang ito, partikular na sa pamamagitan ng pagpayag sa request-handling na sinulid na gumawa ng ilang mga hibla ng manggagawa na nagreresulta sa iba't ibang mga subset ng kahilingan. Subalit may isa pang paraan upang malutas ang problemang ito naERDDAP™ay hindi pa sumusuporta: ang mga subset ng data files para sa isang ibinigay na dataset ay maaaring itago at suriin sa hiwalay na mga computer, at pagkatapos ang mga resulta na pinagsama sa orihinal na server. Ang paraang ito ay tinatawag[Larawan sa Mapa](https://en.wikipedia.org/wiki/MapReduce)at inilalarawan ng[Hadoop](https://en.wikipedia.org/wiki/Apache_Hadoop), ang una (?) programang open-source MapReduce, na batay sa mga ideya mula sa isang papel na Google. (Kung kailangan mo ng Map Reduce saERDDAP, pakisuyong padalhan ako ng kahilingan sa emailerd.data at noaa.gov.) Ang Google[Pagkalalaki](https://cloud.google.com/bigquery/)ay kawili - wili sapagkat ito ay waring isang pagpapatupad ng MapReduce na ikinapit sa subsetting tabular datasets, na isa sa mga itoERDDAP'Ang pangunahing mga tunguhin. Malamang na makagagawa ka ng isang bagayERDDAP™datos mula sa BigQuery dataset sa pamamagitan ng[EDDTable Mula sa Didabasa](/docs/server-admin/datasets#eddtablefromdatabase)Dahil ang BigQuery ay maaaring ma-access sa pamamagitan ng isang JDBC interface.

### Ito ang aking mga opinyon.{#these-are-my-opinions} 

Oo, ang mga kalkulasyon ay napakasimple (at ngayon ay medyo pinetsahan) , subalit sa palagay ko ang mga konklusyon ay tama. Gumamit ba ako ng maling lohika o nagkamali sa aking mga kalkulasyon? Kung gayon, ako lamang ang may kasalanan. Pakisuyong padalhan ako ng email ng pagtutuwiderd dot data at noaa dot gov.

- - -

## [ **Pagbuo ng Ulap** ](#cloud-computing) {#cloud-computing} 

Ang ilang kompanya ay nag - aalok ng serbisyo sa pagpupuslit ng ulap (e.g.,[Mga Web Serbisyo ng Amazon](https://aws.amazon.com/)at[Google Cloud Platform](https://cloud.google.com/)) .[Web hosting company](https://en.wikipedia.org/wiki/Web_hosting_service)ay nag-aalok ng mas simpleng mga serbisyo mula noong mid-1990's, ngunit ang mga serbisyong "ulap" ay malaking pinalawak ang pag-aangkop ng mga sistema at ang saklaw ng mga serbisyong inaalok. Mula NoongERDDAP™Binubuo lamang ng gridERDDAPmga s at mula noonERDDAPmga s ayJavaMga aplikasyong web na maaaring tumakbo sa Tomcat (ang pinakakaraniwang aplikasyon na server) o iba pang aplikasyon, dapat na madaling magtayo ng isangERDDAP™Piprito sa isang serbisyo ng ulap o web hosting site. Ang mga bentaha ng mga paglilingkod na ito ay:

* Nag-aalok sila ng access sa napakataas na mga koneksiyon sa Internet. Ito lamang ay maaaring magbigay - katuwiran sa paggamit ng mga paglilingkod na ito.
* Sila'y nagbabayad lamang para sa mga paglilingkod na ginagamit mo. Halimbawa, makakonekta ka sa isang napakataas na koneksiyon sa Internet ng bandwidth, subalit binabayaran mo lamang ang aktuwal na impormasyong inilipat. Nagpapahintulot sa iyo na gumawa ng isang sistema na bihirang madaig (kahit na sa sukdulang pangangailangan) , hindi kailangang magbayad para sa kapasidad na bihirang gamitin.
* Madaling ihambing ang mga ito. Maaari mong baguhin ang mga uri ng server o dagdagan ang maraming server o ang dami ng nais mong itago, sa loob ng wala pang isang minuto. Ito lamang ay maaaring magbigay - katuwiran sa paggamit ng mga paglilingkod na ito.
* Pinalalaya ka nila mula sa maraming tungkuling administratibo ng pagpapatakbo ng mga server at network. Ito lamang ay maaaring magbigay - katuwiran sa paggamit ng mga paglilingkod na ito.

Ang mga disbentaha ng mga paglilingkod na ito ay:

* Sila ang nagbabayad para sa kanilang mga paglilingkod, kung minsan ay napakarami (sa ganap na kahulugan; hindi sa ito'y hindi isang mabuting halaga) . Ang mga presyong nakatala rito ay para sa[Amazon EC2](https://aws.amazon.com/ec2/pricing). Ang mga presyong ito (noong Hunyo 2015) ay bababa.
Noong nakaraan, mas mataas ang presyo, ngunit mas maliit ang mga data file at bilang ng mga kahilingan.
Sa hinaharap, ang mga presyo ay magiging mas mababa, ngunit ang mga data file at ang bilang ng mga kahilingan ay magiging mas malaki.
Kaya ang mga detalye ay nagbago, subalit ang kalagayan ay hindi nagbabago.
At hindi naman dahil sa sobra ang halaga ng serbisyo, kundi dahil sa ginagamit at binibili namin ang maraming serbisyo.
    * Data Transfer — Ang mga paglilipat ng Data sa sistema ay libre na ngayon (Oo&#33;) .
Ang mga paglipat ng Data mula sa sistema ay $0.09/GB.
Isang SATA mahirap na biyahe (0.3GB/s) sa isang server kasama ng isaERDDAP™marahil ay makakain ang isang Gigabit Ethernet LAN (0.1GB/s) .
ISANG Gigabit Ethernet LAN (0.1GB/s) ay malamang na magbabad sa isang koneksyon sa OC-12 Internet (0.06GB/s) .
Kung ang isang koneksyon ng OC-12 ay makapaghahatid ng ~150,000 GB/month, ang halaga ng Data Transfer ay maaaring umabot sa 150,000 GB @ $0.09/GB = $13,500/month, na isang mahalagang halaga. Maliwanag, kung mayroon kang isang dosenang hard-workingERDDAPs sa isang serbisyo sa ulap, ang iyong buwanang bayad sa Data Transfer (hanggang $162,000/month) . (Minsan pa, hindi naman ang serbisyo ay labis - labis, ang ginagamit namin at binibili ang maraming serbisyo.) 
    * Data storage – ang Amazon ay sumingil ng $50/month kada TB. (Ihambing iyan sa pagbili ng isang 4TB traditional drive nang tahasan para sa ~$50/TB, bagaman ang RAID upang ilagay ito at ang gastos sa pangangasiwa ay nakadaragdag sa kabuuang halaga.) Kaya kung kailangan mong mag - imbak ng maraming impormasyon sa ulap, maaaring ito'y magastos (e.g., 100TB ang magkakahalaga ng $5000/month) . Ngunit malibang mayroon kang talagang malaking datos, ito ay mas maliit na isyu kaysa sa bandwidth/data transfer gastos. (Minsan pa, hindi naman ang serbisyo ay labis - labis, ang ginagamit namin at binibili ang maraming serbisyo.)   
         
### Pag - aatas{#subsetting} 
* Ang problema ng subsetting: Ang tanging paraan upang mabisang maipamahagi ang impormasyon mula sa mga data file ay magkaroon ng programa na namamahagi ng data (e.g.,ERDDAP) tumatakbo sa isang server na may datos na nakaimbak sa isang lokal na hard drive (o kaya'y mabilis na daanan ang isang SAN o lokal na RAID) . Ang mga sistema ng lokal na talaksan ay nagpapahintulotERDDAP™  (at sa ilalim ng mga aklatan, gaya ng netcdf-java) upang humiling ng espesipikong mga numero ng byte ay mula sa mga salansan at napakabilis na makakuha ng mga pagtugon. Maraming uri ng mga kahilingan ng datos mula saERDDAP™sa talaksan (Partikular na magkakaugnay na mga kahilingan sa datos kung saan ang antas ng hakbang ay &gt; 1) hindi magawa nang mahusay kung kailangang hilingin ng programa ang buong talaksan o malalaking tipak ng isang file mula sa isang non-local (Kaya mas mabagal) data storage system at pagkatapos ay kumuha ng isang subset. Kung ang ulap ay hindi nagbibigayERDDAP™mabilisang daanan ang mga linya ng mga file (ay kasimbilis ng lokal na mga file) ,ERDDAPAng pag - alam sa impormasyon ay magiging isang matinding pag - aantok at pag - aalis ng ibang pakinabang sa paggamit ng isang serbisyo sa ulap.

### Pangunahing Data{#hosted-data} 
Isang mapagpipilian sa nabanggit na halaga ay ang pagsusuri ng pakinabang (na batay sa may-akda ng datos (e.g.,NOAA) pagbabayad ng kanilang datos na iiimbak sa ulap) noong mga 2012, nang dumating ang Amazon (at sa paano man, ang iba pang tagapaglaan ng ulap) nagsimulang mag - host ng ilang datasets sa kanilang ulap (WAWS S3) walang bayad (Malamang na taglay ang pag - asang maibabalik nila ang kanilang halaga kung ang mga gumagamit nito ay magpapaupa ng AWS EC2 compute na mga halimbawa upang gumana sa impormasyong iyon) . Maliwanag, ginagawa nitong mabisa ang ulap na mas malaki ang halaga, sapagkat ang panahon at gastos sa pag - iimbak ng impormasyon at pag - iimbak nito ay sero na ngayon. KasamaERDDAP™v2.0, may mga bagong katangian upang mapadali ang pagtakboERDDAPsa isang alapaap:

* Ngayon, isangEDDGridMula saFiles o EDDTable FromFiles dataset ay maaaring malikha mula sa mga data file na malayo at madaling makuha sa pamamagitan ng internet (e.g., AWS S3 timba) sa paggamit ng&lt;Ang cache Mula sa Urlg; at ang&lt;Gumawa ng caches GBgt; mga pagpipilian.ERDDAP™ay mag - iingat ng isang lokal na imbakan ng pinakabagong ginagamit na mga data file.
* Ngayon, kung ang anumang EDDTable FromFiles source files ay siksik (e.g.,.tgz) ,ERDDAP™ay awtomatikong magpapahina sa kanila kapag binabasa nito ang mga ito.
* Ngayon, angERDDAP™Ang sinulid na tumutugon sa isang ibinigay na kahilingan ay magluluwal ng mga sinulid ng manggagawa upang gumana sa mga subseksiyon ng kahilingan kung gagamitin mo ang mga ito&lt;n; opsyon. Ang pagkakatulad na ito ay dapat na magpahintulot ng mas mabilis na pagtugon sa mahihirap na kahilingan.

Ang mga pagbabagong ito ang lumutas sa problema ng AWS S3 na hindi nag-aalok ng lokal, block-level file storage at ang pag-iimbak ng file at ang (matanda na) problema ng pagkuha ng S3 data na may malaking lag. (Mga taon na ang nakalipas (~2014) , ang lag na iyon ay mahalaga, subalit ngayon ay mas maikli at hindi gaanong mahalaga.) Lahat - lahat, nangangahulugan iyan ng pagtatayoERDDAP™sa ulap ay gumagawa ng lalong mabuti ngayon.

 **Salamat** — Maraming salamat kay Matthew Arrott at sa kaniyang grupo sa orihinal na pagsisikap ng OOI para sa kanilang gawain sa paglalagayERDDAP™sa ulap at sa mga pag - uusap na bunga nito.
 

- - -

## [Liblib na Paglalarawan ng mga Data](#remote-replication-of-datasets) {#remote-replication-of-datasets} 

May karaniwang problema na nauugnay sa nabanggit na pagtalakay ng mga grid at pederasyon ngERDDAP: malayong replika ng mga datos. Ang pangunahing problema ay: ang isang data provider ay nagpapanatili ng isang dataset na nagbabago paminsan-minsan at ang isang tagagamit ay nagnanais na panatilihin ang isang up-to-date lokal na kopya ng dataset na ito (sa iba't ibang kadahilanan) . Maliwanag, napakaraming pagkakaiba - iba nito. Ang ilang pagkakaiba ay mas mahirap pakitunguhan kaysa iba.

* Mabilis na mga Update
Mas mahirap na panatilihin ang lokal na dataset up-to-date *kaagad*   (e.g., sa loob ng 3 segundo) pagkatapos ng bawat pagbabago tungo sa pinagmumulan, sa halip, halimbawa, sa loob ng ilang oras.
     
* Madalas na mga Pagbabago
Ang malimit na mga pagbabago ay mas mahirap pakitunguhan kaysa madalang na mga pagbabago. Halimbawa, mas madaling harapin ang mga pagbabagong minsan-a-araw kaysa sa mga pagbabago tuwing 0.1 segundo.
     
* Maliliit na Pagbabago
Ang maliliit na pagbabago sa isang source file ay mas mahirap pakitunguhan kaysa isang ganap na bagong file. Totoo ito lalo na kung ang maliliit na pagbabago ay maaaring saanman sa file. Ang maliliit na pagbabago ay mas mahirap makita at ginagawang mahirap na ibukod ang mga impormasyon na kailangang kopyahin. Ang mga bagong file ay madaling makita at mahusay ilipat.
     
* Buong Data
Ang pagpapanatili ng buong dataset up-to-date ay mas mahirap kaysa sa pagpapanatili lamang ng kamakailang datos. Kailangan lamang ng ilang gumagamit ng impormasyon kamakailan (e.g., ang halaga ng huling 8 araw) .
     
* Maraming Kopya
Ang pagpapanatili ng maraming kopya sa iba't ibang lugar ay mas mahirap kaysa sa pagpapanatili ng isang malayong kopya. Ito ang problemang nakalululan.
     

Maliwanag na napakaraming iba't ibang uri ng posibleng pagbabago sa source dataset at sa mga pangangailangan at inaasahan ng gumagamit. Marami sa mga pagkakaiba - iba ay napakahirap lutasin. Ang pinakamabuting solusyon sa isang situwasyon ay kadalasang hindi ang pinakamabuting solusyon para sa ibang situwasyon — wala pang pansansinukob na malaking lunas.

### [ **AngkopERDDAP™Mga Kasangkapan** ](#relevant-erddap-tools) {#relevant-erddap-tools} 

ERDDAP™ay nag - aalok ng ilang kasangkapan na maaaring gamitin bilang bahagi ng isang sistema na nagnanais panatilihin ang isang malayong kopya ng isang dataset:

*   ERDDAP'[RSS  (Sumaryo ba ang Mayamang Site?) paglilingkod](https://en.wikipedia.org/wiki/RSS)  
ay nag - aalok ng mabilis na paraan ng pagsusuri kung ang isang dataset sa isang remoteERDDAP™ay nagbago.
     
*   ERDDAP'[serbisyo ng suskripsiyon](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions)  
ay mas mahusay (kaysaRSS) paraan: agad itong magpapadala ng email o makipag-ugnayan sa isang URL sa bawat kripto kailanma't inaapruba ang dataset at ang update ay nagbunga ng pagbabago. Ito'y mahusay sa bagay na ito'y nangyayari sa ASAP at walang nasasayang na pagsisikap (gaya ng pagsusurbeyRSSpaglilingkod) . Maaaring gumamit ng ibang kasangkapan ang mga gumagamit nito (tulad ng[KUNG PAANO](https://ifttt.com/)) upang tumugon sa mga patalastas sa email mula sa sistema ng suskripsiyon. Halimbawa, ang isang gumagamit ay maaaring magskribe ng isang dataset sa isang remoteERDDAP™at gamitin ang IFTT upang tumugon sa mga nota ng subscription email at simulan ang pag-upgrade ng lokal na dataset.
     
*   ERDDAP'[sistema ng bandila](/docs/server-admin/additional-information#flag)  
nagbibigay ng daan para saERDDAP™administrador upang sabihin sa isang dataset ang kanyang/herERDDAPupang muling maikarga ang ASAP. Ang URL na anyo ng watawat ay madaling gamitin sa mga iskrip. Ang URL na anyo ng watawat ay maaari ring gamitin bilang aksiyon para sa isang suskrisyon.
     
*   ERDDAP'["files"sistema](https://coastwatch.pfeg.noaa.gov/erddap/files/documentation.html)  
ay maaaring mag-alok ng access sa source files para sa isang ibinigay na dataset, kabilang ang isang Apache-style directory listahan ng mga files (isang "Webable Folder") na may download na URL, huling binagong oras, at laki ng bawat file. Isang tabi ng paggamit ng"files"sistema na ang mga source files ay maaaring may iba't ibang mga iba't ibang pangalan at iba't ibang metadata kaysa sa dataset habang ito ay lumilitaw saERDDAP. Kung malayoERDDAP™Ang dataset ay nag-aalok ng access sa mga source file nito, na nagbubukas ng posibilidad ng isang mahinang-tao na bersyon ng rsync: nagiging madali para sa isang lokal na sistema na makita kung aling mga remote files ang nagbago at kailangang download. (Tingnan ang[Hache Mula sa Mapagpipilian](#cache-from-url)sa ibaba na magagamit ito.)   
     

### [Mga Lunas](#solutions) {#solutions} 

Bagaman napakaraming pagkakaiba - iba sa problema at sa napakaraming posibleng solusyon, iilan lamang ang pangunahing paraan upang malutas ito:

#### Kaugalian, Solusyon ng Hukbong Brute{#custom-brute-force-solutions} 
Ang isang maliwanag na solusyon ay ang paghango ng isang solusyong pang-ugali, na samakatuwid ay optimente para sa isang ibinigay na sitwasyon: gumawa ng isang sistema na nakakadetek/identipika kung aling datos ang nagbago, at magpadala ng impormasyon sa tagagamit upang ang gumagamit ay makahingi ng binagong datos. Buweno, magagawa mo ito, subalit may mga disbentaha:

* Maraming trabaho ang karaniwang mga solusyon.
* Ang mga solusyon sa kaugalian ay karaniwang ginagawang kaugalian sa isang ibinigay na dataset at ibinigay sa sistema ng gumagamit anupa't hindi ito madaling magamit muli.
* Ang tradisyunal na mga solusyon ay kailangang itayo at panatilihin mo. (Iyan ay hindi kailanman isang mabuting ideya. Sa tuwina'y isang mabuting ideya na iwasan ang trabaho at hilingin sa iba na gawin iyon&#33;) 

Ayaw kong gawin ito dahil mas mabuting humanap ng solusyon, na ginawa at pinananatili ng iba, na madaling gamitin sa iba't ibang situwasyon.
     
#### rsync{#rsync} 
[rsync](https://en.wikipedia.org/wiki/Rsync)ang umiiral, lubhang mahusay, pangkalahatang layunin na solusyon upang panatilihin ang isang koleksiyon ng mga file sa isang source computer sa pagsasama - sama sa remote computer ng gumagamit. Ang mabisang paraan nito ay:

1. pangyayari (e.g., isangERDDAP™pangyayari sa sistema ng suskripsiyon) rsync,
     (o, isang trabahong cron rsync sa espesipikong mga panahon araw - araw sa computer ng gumagamit nito) 
2. Na nakikipag-ugnayan sa source computer,
3. Na tumatantiya ng isang serye ng mga heshe para sa mga tipak ng bawat talaksan at naghahatid ng mga hasheng iyon sa rsync ng gumagamit,
4. Na inihahambing ang impormasyong yaon sa katulad na impormasyon sa kopya ng mga talaksan ng tagagamit,
5. na humihiling ng mga tipak ng talaksan na nagbago na.

    
Kung isasaalang - alang ang lahat ng ginagawa nito, napakabilis kumilos ng rsync (e.g., 10 segundo at oras ng paglilipat ng datos) at napakahusay. Meron[Mga pagkakaiba ng rsync](https://en.wikipedia.org/wiki/Rsync#Variations)na tamang - tama para sa iba't ibang kalagayan (e.g., sa pamamagitan ng pag - calculating at pag - ukit sa mga bache ng mga tipak ng bawat source file) .

Ang pangunahing mga kahinaan ng rsync ay: Nangangailangan ng pagsisikap upang maitatag (mga isyu sa seguridad) ; may ilang mga isyu sa pag-scaling; at hindi ito mabuti sa pagpapanatili ng NRT datasets talagang up-to-date (e.g., nakakaasiwang gamitin ang rsync nang higit sa bawat 5 minuto) . Kung mahaharap mo ang mga kahinaan, o kung hindi ito makaaapekto sa iyong kalagayan, ang rsync ay isang mahusay, pangkalahatang layunin na solusyon na magagamit ng sinuman ngayon upang lutasin ang maraming tagpo na nagsasangkot ng malayong replikasyon ng mga dataset.

May isang bagay sa ibabaw ngERDDAP™Upang gawin ang listahan upang subukang magdagdag ng suporta para sa mga serbisyong rsyncERDDAP  (marahil isang napakahirap na gawain) , upang ang sinumang kliyente ay makagamit ng rsync (o naiiba) Upang mapanatili ang up-to-date na kopya ng isang dataset. Kung may gustong gumawa nito, pakisuyong mag - emailerd.data at noaa.gov.

May iba pang mga programa na gumagawa ng humigit - kumulang ano ang ginagawa ng rsync, kung minsan ay nakatutok sa replikasyon ng dataset (bagaman madalas sa antas ng file-copy) , e.g.,Unidata'[IDD](https://www.unidata.ucar.edu/projects/index.html#idd).
    
#### Kuso Mula sa Url{#cache-from-url} 
[Ang Hache Mula sa Url](/docs/server-admin/datasets#cachefromurl)May lugar na mapaglalagyan (pasimula saERDDAP™v2.0.) sa lahatERDDAP'Mga dataset type na gumagawa ng mga dataset mula sa mga file (Karaniwan na, lahat ng subclass ng[EDDGridMula sa mga Labi](/docs/server-admin/datasets#eddgridfromfiles)at[Mapagkakatiwalaan Mula sa mga Bakod](/docs/server-admin/datasets#eddtablefromfiles)) . cache Ginagawang maliit ng FromUrl na kusang download at panatilihin ang lokal na mga data file sa pamamagitan ng pagkopya sa mga ito mula sa isang malayong pinagmulan sa pamamagitan ng cache Mula sa Url setting. Ang mga remote file ay maaaring nasa isang Web Accessable Folder o isang directory-tulad ng file list na inaalok ng THEDDS,Hyrax, timba, o timbaERDDAP'"files"sistema.
    
Kung ang pinagmulan ng mga remote file ay malayoERDDAP™datos na nag-aalok ng source files sa pamamagitan ngERDDAP™ "files"sistema, kung gayon ay magagawa mo[^](https://coastwatch.pfeg.noaa.gov/erddap/information.html#subscriptions)sa remote dataset, at gamitin ang[URL ng watawat](/docs/server-admin/additional-information#flag)para sa inyong lokal na dataset bilang aksiyon para sa suskrisyon. Pagkatapos, kailanma't magbago ang remote dataset, ito ay makikipag-ugnayan sa flag URL para sa iyong dataset, na magsasabi rito na i-reload muli ang ASAP, na makakadetek at mada-upload ang binagong remote data files. Ang lahat ng ito ay napakabilis na nangyayari (karaniwang ~5 segundo at ang panahong kinakailangan upang makuha ang binagong mga file) . Ang pamamaraang ito ay mabisa kung ang mga pagbabago sa source dataset ay mga bagong file na pana-panahong idinaragdag at kapag ang mga umiiral na file ay hindi kailanman nagbabago. Ang pamamaraang ito ay hindi gumaganang mabuti kung ang impormasyon ay madalas na ibinibigay sa lahat (o ang karamihan) ng mga source data file, dahil kung gayon ang inyong lokal na dataset ay madalas na nag - download ng buong remote dataset. (Dito kinakailangan ang isang rsync-tulad ng pamamaraan.) 
    
#### Archive{#archiveadataset} 
ERDDAP™'[Archive](/docs/server-admin/additional-information#archiveadataset)ay mabuting solusyon kapag ang datos ay madalas na idinagdag sa isang dataset, subalit ang mas lumang impormasyon ay hindi kailanman binabago. Pangunahin na, ang isangERDDAP™Maaaring patakbuhin ng administrador ang ArchiveADataset (Marahil sa isang iskrip, na marahil ay ginagamitan ng cron) at magtakda ng isang subset ng isang dataset na nais nilang kunin (marahil sa maraming files) at pakete sa loob ng isang.zipo.tgztalaksan, upang maipadala mo ang file sa mga interesadong tao o grupo (e.g., NCEI para sa pag-arkiving) o gamitin ito sa pag-download. Halimbawa, maaari mong patakbuhin ang ArchiveADataset araw - araw sa 12:10 am at ipatakbo ito.zipng lahat ng datos mula 12:00 ay ang nakaraang araw hanggang 12:00 ay ngayon. (O, gawin mo ito linggu - linggo, buwan - buwan, o taun - taon, kung kinakailangan.) Dahil sa ang paketeng talaksan ay nalilikha ng offline, walang panganib ng isang timeout o labis na datos, gaya ng magkakaroon ng isang pamantayanERDDAP™tanong.
     
#### ERDDAP™' s s standard request system{#erddaps-standard-request-system} 
ERDDAP™'Ang pamantayang request system ay isang alternatibong mabuting solusyon kapag ang data ay madalas na idinagdag sa isang dataset, ngunit ang mas lumang datos ay hindi kailanman binabago. Karaniwan na, ang sinuman ay maaaring gumamit ng pamantayang mga kahilingan upang makakuha ng impormasyon sa isang espesipikong haba ng panahon. Halimbawa, sa ganap na 12:10 ay araw - araw, maaari kang humiling ng lahat ng impormasyon mula sa isang malayong dataset mula sa 12:00 ay ang nakaraang araw hanggang sa 12:00 ngayon. Ang Hangganan (Kung ihahambing sa pamamaraang ArchiveADataset) ay ang panganib ng isang timeout o kaya ay sobrang dami ng datos para sa isang solong file. Maiiwasan mo ang limitasyon sa pamamagitan ng paggawa ng mas madalas na mga kahilingan para sa mas maliliit na yugto ng panahon.
     
#### NABAUTISAN NG EDDTTEGO{#eddtablefromhttpget} 
\\[Ang opsiyon na ito ay hindi pa umiiral, ngunit tila posible na magtayo sa malapit na hinaharap.\\]  
Ang bago[NABAUTISAN NG EDDTTEGO](/docs/server-admin/datasets#eddtablefromhttpget)uri ng datos sa loobERDDAP™Ginagawang posible ng v2.0 na gunigunihin ang isa pang solusyon. Ang mga nakapailalim na file na pinapanatili ng ganitong uri ng dataset ay mga pangunahing log file na nagtatala ng mga pagbabago sa dataset. Dapat na posibleng gumawa ng isang sistema na nagpapanatili ng isang lokal na dataset sa pana - panahon (o batay sa mitsa) Hiniling ang lahat ng pagbabago na ginawa sa remote dataset mula nang huling kahilingang iyon. Iyan ay dapat na maging mahusay (o higit pa) kaysa sa rsync at maghahawak ng maraming mahihirap na senaryo, ngunit magtatagumpay lamang kung ang mga remote at lokal na datasets ay EDDTable FromHttp Get datasets.

Kung nais ng sinuman na lutasin ito, pakisuyong makipag - ugnayanerd.data at noaa.gov.
    
#### Ipinamamahaging Data{#distributed-data} 
Walang isa man sa mga lunas sa itaas ang may malaking gawain na lutasin ang mahihirap na pagkakaiba ng problema sapagkat ang replikasyon ng halos tunay na panahon (NRT) Napakahirap ng mga dataset, dahil na rin sa lahat ng posibleng mga senaryo.

May malaking solusyon: Huwag man lamang gayahin ang impormasyon.
Sa halip, gamitin ang isa na may awtoridad (isang dataset sa isaERDDAP) , pinananatili ng data provider (e.g., isang tanggapang panrehiyon) . Lahat ng gumagamit na nagnanais ng datos mula sa dataset na iyon ay laging nakakakuha nito mula sa pinanggalingan. Halimbawa, ang browser-based apps ay kumukuha ng data mula sa isang URL-based request, kaya hindi dapat importante na ang kahilingan ay sa orihinal na source sa isang remote server (hindi ang parehong server na host ng ESM) . Itinataguyod ng maraming tao ang pamamahaging ito ng Data sa loob ng mahabang panahon (e.g., Roy Mendelssohn sa huling 20+ taon) .ERDDAP' s grid/federation model (ang nangungunang 80% ng dokumentong ito) ay salig sa pamamaraang ito. Ang solusyong ito ay tulad ng isang tabak sa isang Gordian Knot — ang buong problema ay nawawala.

* Ang solusyong ito ay napakasimple.
* Ang solusyong ito ay napakahusay yamang walang ginagawa upang panatilihin ang isang kopyang dataset (s) up-to-date.
* Maaaring makuha ng mga gumagamit nito ang pinakabagong impormasyon anumang oras (e.g., na may latency lamang na ~ 0.5 segundo) .
* Maganda ang kaliskis nito at may mga paraan upang mapabuti ang pag - ahon. (Tingnan ang talakayan sa nangungunang 80% ng dokumentong ito.)   
     

Hindi, hindi ito isang lunas para sa lahat ng posibleng kalagayan, subalit ito ay isang malaking lunas para sa karamihan. Kung may mga problema/kahinaan sa solusyong ito sa ilang mga sitwasyon, kadalasang sulit ang paggawa upang malutas ang mga problemang iyon o mamuhay na kasama ng mga kahinaang iyon dahil sa mga nakalululang kapakinabangan ng solusyong ito. Kung/kapag ang solusyong ito ay talagang hindi katanggap-tanggap para sa isang ibinigay na sitwasyon, e.g., kapag talagang dapat ay mayroon kang lokal na kopya ng datos, kung gayon isaalang-alang ang iba pang mga solusyon na tinalakay sa itaas.
     
### Pakikipagkompromiso{#conclusion} 
Bagaman walang iisa, simpleng solusyon na lubusang lulutas sa lahat ng problema sa lahat ng tagpo (bilang rsync at ipinamamahaging Data halos) , inaasahang may sapat na mga kagamitan at mapagpipilian upang makasumpong ka ng isang katanggap - tanggap na solusyon para sa iyong partikular na kalagayan.
